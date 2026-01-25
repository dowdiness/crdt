///| FugueMax tree implementation
//  maximal non-interleaving list
// https://arxiv.org/abs/2305.00583

///|
/// FugueTree - maintains ordered sequence with CRDT properties
pub struct FugueTree {
  mut items : @immut/hashmap.HashMap[Int, Item] // Map from LV to Item
  root : Int // Root item ID (virtual start)
  mut length : Int // Total items (including deleted)
} derive(Show)

///|
/// Creates a default empty FugueTree with a virtual root node.
///
/// Returns a new `FugueTree` instance initialized with:
///
/// * An empty immutable hashmap containing only the virtual root item
/// * A root ID set to -1 (representing the virtual start of the sequence)
/// * A length of 0 (no actual content items)
///
/// The virtual root item serves as the anchor point for the tree structure and
/// has ID -1, empty content, no parent, Left side orientation, timestamp 0, and
/// agent "root".
///
/// Example:
///
/// ```moonbit
/// let tree = FugueTree::default()
/// inspect(tree.visible_count(), content="0")
/// inspect(tree.to_text(), content="")
/// ```
///
impl Default for FugueTree with default() -> FugueTree {
  let root_item = Item::new(-1, "", -1, Left, 0, "root") // Virtual root
  let mut items = @immut/hashmap.new()
  items = items.add(-1, root_item)
  { items, root: -1, length: 0 }
}

///|
/// Create a new empty FugueTree
pub fn FugueTree::new() -> FugueTree {
  FugueTree::default()
}

///|
/// Get item by ID
#alias("_[_]")
pub fn FugueTree::get(self : FugueTree, id : Int) -> Item? {
  self.items.get(id)
}

///|
/// Get all visible (non-deleted) items in tree order
pub fn FugueTree::get_visible_items(self : FugueTree) -> Array[(Int, Item)] {
  let result = []
  self.traverse_tree(-1, result)
  result
}

///|
/// Count visible (non-deleted) items
pub fn FugueTree::visible_count(self : FugueTree) -> Int {
  self.get_visible_items().length()
}

///|
/// Convert tree to text by traversing in order.
/// Uses StringBuilder for O(n) performance.
pub fn FugueTree::to_text(self : FugueTree) -> String {
  self
  .get_visible_items()
  .fold(init=StringBuilder::new(), fn(sb, entry) {
    let (_, item) = entry
    sb.write_string(item.content)
    sb
  })
  .to_string()
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
  match self[id] {
    Some(item) => {
      let deleted_item = item.mark_deleted()
      self.items = self.items.add(id, deleted_item)
    }
    None => raise FugueError::MissingItem(id~)
  }
}

///|
/// Add item to tree
fn FugueTree::add_item(self : FugueTree, item : Item) -> Unit {
  self.items = self.items.add(item.id, item)
  self.length = self.length + 1
}

///|
/// Compare children by Lamport timestamp (primary) and agent (tiebreaker)
fn compare_children(a : (Int, Item), b : (Int, Item)) -> Int {
  let (_, item_a) = a
  let (_, item_b) = b
  item_a.compare(item_b)
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
  loop self[descendant_id] {
    Some(item) => {
      if item.parent == ancestor_id {
        return true
      }
      if item.parent == -1 {
        return false // Reached root without finding ancestor
      }
      continue self[item.parent]
    }
    None => break false
  }
}

///|
test "ancestor check correctness" {
  let tree = FugueTree::new()

  // Build chain: root(-1) → A(0) → B(1) → C(2)
  tree.insert(0, "A", -1, -1, 0, "agent0")
  tree.insert(1, "B", 0, -1, 1, "agent0")
  tree.insert(2, "C", 1, -1, 2, "agent0")

  // Test ancestor relationships
  inspect(tree.is_ancestor(0, 0), content="true") // Self is ancestor
  inspect(tree.is_ancestor(0, 1), content="true") // A is ancestor of B
  inspect(tree.is_ancestor(0, 2), content="true") // A is ancestor of C
  inspect(tree.is_ancestor(1, 2), content="true") // B is ancestor of C
  inspect(tree.is_ancestor(1, 0), content="false") // B is NOT ancestor of A
  inspect(tree.is_ancestor(2, 0), content="false") // C is NOT ancestor of A
}

///|
/// Find the correct parent and side for a new item using FugueMax algorithm
/// Returns (parent_id, side)
fn FugueTree::find_parent_and_side(
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
test "find parent and side at start" {
  let tree = FugueTree::new()
  let (parent, side) = tree.find_parent_and_side(-1, -1)
  inspect(parent, content="-1")
  inspect(side, content="Right")
}

///|
test "find parent and side with origin_left" {
  let tree = FugueTree::new()
  tree.insert(0, "A", -1, -1, 0, "agent0")
  let (parent, side) = tree.find_parent_and_side(0, -1)
  inspect(parent, content="0")
  inspect(side, content="Right")
}

///|
/// Get all children of a node (excluding cycles)
fn FugueTree::get_children(
  self : FugueTree,
  parent_id : Int,
) -> @immut/hashmap.HashMap[Int, Item] {
  self.items.filter(fn(id, item) { item.parent == parent_id && id != parent_id })
}

///|
/// Partition children into left and right sides
fn partition_children(
  children : @immut/hashmap.HashMap[Int, Item],
) -> (Array[(Int, Item)], Array[(Int, Item)]) {
  let left = []
  let right = []
  children.each((id, item) => match item.side {
    Left => left.push((id, item))
    Right => right.push((id, item))
  })
  (left, right)
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
    match self[node_id] {
      Some(item) => if item.is_visible() { result.push((node_id, item)) }
      None => ()
    }
  }

  // Traverse right children (sorted by timestamp, then ID)
  let sorted_right = right_children
  sorted_right.sort_by(compare_children)
  sorted_right
  .iter()
  .each(child => {
    let (child_id, _) = child
    // Don't traverse back to parent (prevents cycles)
    if child_id != node_id {
      self.traverse_tree(child_id, result)
    }
  })
}
