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

///|
/// Count visible (non-deleted) items
pub fn FugueTree::visible_count(self : FugueTree) -> Int {
  let mut count = 0
  let items_iter = self.items.iter()
  for entry in items_iter {
    let (_, item) = entry
    if item.is_visible() {
      count = count + 1
    }
  }
  count - 1 // Exclude root
}

///|
/// Convert tree to text by traversing in order
pub fn FugueTree::to_text(self : FugueTree) -> String {
  // Build list of items with their parents for sorting
  let items_list : Array[(Int, Item)] = []
  let items_iter = self.items.iter()
  for entry in items_iter {
    let (id, item) = entry
    if id != -1 && item.is_visible() { // Skip root and deleted items
      items_list.push((id, item))
    }
  }

  // Sort by ID (which corresponds to insertion order with FugueMax)
  // This is a simplified version - proper FugueMax needs tree traversal
  items_list.sort_by(fn(a, b) { a.0.compare(b.0) })
  let mut result = ""
  for entry in items_list {
    let (_, item) = entry
    result = result + item.content
  }
  result
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
  let mut current = origin_left
  while true {
    match self.get_item(current) {
      Some(item) => {
        // Check if current is a valid parent
        if self.is_valid_parent(current, origin_right) {
          return current
        }

        // Move up to parent
        if item.parent == -1 {
          return -1 // Reached root
        }
        current = item.parent
        continue
      }
      None => return -1 // Item not found, use root
    }
  }
  -1 // Fallback
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
  let mut current = descendant_id
  while true {
    match self.get_item(current) {
      Some(item) => {
        if item.parent == ancestor_id {
          return true
        }
        if item.parent == -1 {
          return false // Reached root without finding ancestor
        }
        current = item.parent
        continue
      }
      None => return false
    }
  }
  false // Fallback
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
