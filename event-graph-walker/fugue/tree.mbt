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
  let root_item = Item::new(-1, "", -1, Left, 0, "root") // Virtual root
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
/// Get all visible (non-deleted) items in tree order
pub fn FugueTree::get_visible_items(self : FugueTree) -> Array[(Int, Item)] {
  let result = []
  self.traverse_tree(-1, result)
  result
}

///|
/// In-order tree traversal: Left children → Node → Right children
/// For nodes with same parent and side, sort by timestamp then ID
fn FugueTree::traverse_tree(
  self : FugueTree,
  node_id : Int,
  result : Array[(Int, Item)],
) -> Unit {
  // Get children of current node (excluding the node itself to prevent cycles)
  let children = self.get_children(node_id)

  // Split into left and right children
  let (left_children, right_children) = partition_children(children)

  // Traverse left children (sorted by timestamp, then ID)
  let sorted_left = left_children
  sorted_left.sort_by(compare_children)
  sorted_left
  .iter()
  .each(fn(child) {
    let (child_id, _) = child
    // Don't traverse back to parent (prevents cycles)
    if child_id != node_id {
      self.traverse_tree(child_id, result)
    }
  })

  // Visit current node (if not root and visible)
  if node_id != -1 {
    match self.get_item(node_id) {
      Some(item) => if item.is_visible() { result.push((node_id, item)) }
      None => ()
    }
  }

  // Traverse right children (sorted by timestamp, then ID)
  let sorted_right = right_children
  sorted_right.sort_by(compare_children)
  sorted_right
  .iter()
  .each(fn(child) {
    let (child_id, _) = child
    // Don't traverse back to parent (prevents cycles)
    if child_id != node_id {
      self.traverse_tree(child_id, result)
    }
  })
}

///|
/// Get all children of a node (excluding cycles)
fn FugueTree::get_children(
  self : FugueTree,
  parent_id : Int,
) -> Array[(Int, Item)] {
  self.items
  .filter(fn(id, item) { item.parent == parent_id && id != parent_id })
  .to_array()
}

///|
/// Partition children into left and right sides
fn partition_children(
  children : Array[(Int, Item)],
) -> (Array[(Int, Item)], Array[(Int, Item)]) {
  let left = []
  let right = []
  children
  .iter()
  .each(fn(child) {
    let (id, item) = child
    match item.side {
      Left => left.push((id, item))
      Right => right.push((id, item))
    }
  })
  (left, right)
}

///|
/// Compare children by Lamport timestamp (primary) and agent (tiebreaker)
fn compare_children(a : (Int, Item), b : (Int, Item)) -> Int {
  let (_, item_a) = a
  let (_, item_b) = b

  // First compare by Lamport timestamp for causal ordering
  let ts_cmp = item_a.timestamp.compare(item_b.timestamp)
  if ts_cmp != 0 {
    return ts_cmp
  }

  // If timestamps equal, compare by agent for deterministic tiebreaking
  let agent_cmp = item_a.agent.compare(item_b.agent)
  if agent_cmp != 0 {
    return agent_cmp
  }

  // If agents equal, compare by ID
  item_a.id.compare(item_b.id)
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
/// Find the correct parent and side for a new item using FugueMax algorithm
/// Returns (parent_id, side)
pub fn FugueTree::find_parent_and_side(
  self : FugueTree,
  origin_left : Int,
  origin_right : Int,
) -> (Int, Side) {
  // If inserting at start, parent is root, side is Right
  if origin_left == -1 {
    return (-1, Right)
  }

  // If no right constraint, parent is origin_left, side is Right
  if origin_right == -1 {
    return (origin_left, Right)
  }

  // FugueMax algorithm:
  // If origin_left is NOT an ancestor of origin_right → Right child of origin_left
  // If origin_left IS an ancestor of origin_right → Left child of origin_right
  if self.is_ancestor(origin_left, origin_right) {
    (origin_right, Left)
  } else {
    (origin_left, Right)
  }
}

///|
/// Check if ancestor_id is an ancestor of descendant_id in the tree
pub fn FugueTree::is_ancestor(
  self : FugueTree,
  ancestor_id : Int,
  descendant_id : Int,
) -> Bool {
  if ancestor_id == descendant_id {
    return true
  }
  loop self.get_item(descendant_id) {
    Some(item) => {
      if item.parent == ancestor_id {
        return true
      }
      if item.parent == -1 {
        return false // Reached root without finding ancestor
      }
      continue self.get_item(item.parent)
    }
    None => break false
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
  agent : String,
) -> Unit {
  // Find correct parent and side using FugueMax algorithm
  let (parent, side) = self.find_parent_and_side(origin_left, origin_right)

  // Create item with found parent and side
  let item = Item::new(id, content, parent, side, timestamp, agent)

  // Add to tree
  self.add_item(item)
}

///|
/// Delete an item (mark as deleted)
pub fn FugueTree::delete(self : FugueTree, id : Int) -> Unit raise FugueError {
  match self.get_item(id) {
    Some(item) => {
      let deleted_item = item.mark_deleted()
      self.items = self.items.add(id, deleted_item)
    }
    None => raise FugueError::MissingItem(id~)
  }
}
