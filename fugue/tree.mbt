///| FugueMax tree implementation

///|
/// FugueTree - maintains ordered sequence with CRDT properties
pub struct FugueTree {
  mut items : @immut/hashmap.HashMap[Int, Item] // Map from LV to Item
  root : Int // Root item ID (virtual start)
  mut length : Int // Total items (including deleted)
} derive(Show)

///|
/// Create a new empty FugueTree
pub fn FugueTree::new() -> FugueTree {
  let root_item = Item::new(-1, "", -1, 0) // Virtual root
  let mut items = @immut/hashmap.new()
  items = items.add(-1, root_item)
  { items, root: -1, length: 0 }
}

///|
/// Get item by ID
pub fn FugueTree::get_item(self : FugueTree, id : Int) -> Item? {
  self.items.get(id)
}

///|
/// Add item to tree
pub fn FugueTree::add_item(self : FugueTree, item : Item) -> Unit {
  self.items = self.items.add(item.id, item)
  self.length = self.length + 1
}

///|
/// Get all items in order (for traversal)
pub fn FugueTree::get_all_items(self : FugueTree) -> Array[(Int, Item)] {
  self.items.iter().collect()
}

///| Get all visible (non-deleted) items
pub fn FugueTree::get_visible_items(self : FugueTree) -> Array[(Int, Item)] {
  let items_list : Array[(Int, Item)] = self.items
    .filter(is_visible_child)
    .to_array()
  // Sort by ID (which corresponds to insertion order with FugueMax)
  // This is a simplified version - proper FugueMax needs tree traversal
  items_list.sort_by(compare_by_id)
  items_list
}

///|
/// Count visible (non-deleted) items
pub fn FugueTree::visible_count(self : FugueTree) -> Int {
  self.get_visible_items().length()
}
///|
/// Convert tree to text by traversing in order
pub fn FugueTree::to_text(self : FugueTree) -> String {
  self
  .get_visible_items()
  .fold(init="", fn(acc, entry) {
    let (_, item) = entry
    acc + item.content
  })
}

///|
/// Find the correct parent for a new item using FugueMax algorithm
pub fn FugueTree::find_parent(
  self : FugueTree,
  origin_left : Int,
  origin_right : Int,
) -> Int {
  // If inserting at start, parent is root
  if origin_left == -1 {
    return -1
  }

  // If no right constraint, parent is origin_left
  if origin_right == -1 {
    return origin_left
  }

  // Navigate up from origin_left to find valid parent
  // Valid parent = ancestor of origin_left that is also left of origin_right
  loop (origin_left, self.get_item(origin_left)) {
    (current, Some(item)) => {
      // Check if current is a valid parent
      if self.is_valid_parent(current, origin_right) {
        return current
      } else if item.parent == -1 {
        return -1 // Reached root without finding valid parent
      }
      // Move up to parent
      continue(item.parent, self.get_item(item.parent))
    }
    (_, None) => break(-1) // Item not found, use root
  }
}

///|
/// Check if candidate parent is valid for given right constraint
fn FugueTree::is_valid_parent(
  self : FugueTree,
  candidate : Int,
  origin_right : Int,
) -> Bool {
  // Candidate is valid if it's an ancestor of origin_right
  // or origin_right doesn't exist yet

  match self.get_item(origin_right) {
    None => true // Right item doesn't exist yet, candidate is valid
    Some(_) => self.is_ancestor(candidate, origin_right)
  }
}

///|
/// Check if ancestor_id is an ancestor of descendant_id in the tree
fn FugueTree::is_ancestor(
  self : FugueTree,
  ancestor_id : Int,
  descendant_id : Int,
) -> Bool {
  if ancestor_id == descendant_id {
    return true
  }
  loop (self.get_item(descendant_id)) {
    Some(item) => {
      if item.parent == ancestor_id {
        return true
      }
      if item.parent == -1 {
        return false // Reached root without finding ancestor
      }
      continue(self.get_item(item.parent))
    }
    None => break(false)
  }
}

///|
/// Insert an item using FugueMax integration algorithm
pub fn FugueTree::insert(
  self : FugueTree,
  id : Int,
  content : String,
  origin_left : Int,
  origin_right : Int,
  timestamp : Int,
) -> Unit {
  // Find correct parent
  let parent = self.find_parent(origin_left, origin_right)

  // Create item with found parent
  let item = Item::new(id, content, parent, timestamp)

  // Add to tree
  self.add_item(item)
}

///|
/// Delete an item (mark as deleted)
pub fn FugueTree::delete(self : FugueTree, id : Int) -> Unit {
  match self.get_item(id) {
    Some(item) => {
      let deleted_item = item.mark_deleted()
      self.items = self.items.add(id, deleted_item)
    }
    None => () // Item doesn't exist, nothing to delete
  }
}

///|
fn is_visible_child(id : Int, item : Item) -> Bool {
  // id -1 is the root, so we skip it
  id != -1 && item.is_visible()
}

///|
fn compare_by_id(a : (Int, Item), b : (Int, Item)) -> Int {
  a.0.compare(b.0)
}
