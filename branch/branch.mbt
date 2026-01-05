///| Branch System - Efficient document snapshots at any frontier

///|

///| This module implements the branch/snapshot system for eg-walker,

///| allowing efficient checkout of document state at any frontier

///| and incremental updates.

///|
/// A Branch represents a document state at a specific frontier
///
/// This is a snapshot of the document that can be efficiently
/// advanced forward by applying new operations.
pub struct Branch {
  frontier : Array[Int] // Version frontier this branch represents
  tree : @fugue.FugueTree // CRDT tree state at this frontier
  oplog : @oplog.OpLog // Reference to the operation log
} derive(Show)

///|
/// Create a new empty branch
pub fn Branch::new(oplog : @oplog.OpLog) -> Branch {
  { frontier: [], tree: @fugue.FugueTree::new(), oplog }
}

///|
/// Checkout document state at a specific frontier
///
/// This reconstructs the document by walking the operation graph
/// from the beginning and applying all operations up to the frontier.
///
/// # Arguments
/// * `oplog` - The operation log containing all operations
/// * `frontier` - The frontier to checkout
///
/// # Returns
/// A Branch representing the document state at the frontier
pub fn Branch::checkout(oplog : @oplog.OpLog, frontier : Array[Int]) -> Branch {
  // Create empty tree
  let tree = @fugue.FugueTree::new()

  // Use walker to get all operations in causal order
  let ops = oplog.walk_and_collect(frontier)

  // Apply each operation to the tree
  for op in ops {
    apply_operation_to_tree(tree, op, oplog)
  }

  // Return branch with reconstructed state
  { frontier: frontier.copy(), tree, oplog }
}

///|
/// Advance a branch by applying new operations
///
/// This efficiently updates a branch by only applying operations
/// that are new (not in the current frontier).
///
/// # Arguments
/// * `target_frontier` - The new frontier to advance to
///
/// # Returns
/// A new Branch at the target frontier
pub fn Branch::advance(self : Branch, target_frontier : Array[Int]) -> Branch {
  // Calculate what operations to apply
  let (retreat_ops, advance_ops) = self.oplog.diff_and_collect(
    self.frontier,
    target_frontier,
  )

  // For now, we'll use a simple approach:
  // If there are retreat operations, do a full checkout
  // Otherwise, just apply advance operations incrementally
  if retreat_ops.length() > 0 {
    // Need to retreat - do full checkout
    Branch::checkout(self.oplog, target_frontier)
  } else {
    // Only advancing - apply new operations incrementally
    let tree = self.tree // Reuse existing tree (mutable)
    for op in advance_ops {
      apply_operation_to_tree(tree, op, self.oplog)
    }
    { frontier: target_frontier.copy(), tree, oplog: self.oplog }
  }
}

///|
/// Get the text content of this branch
pub fn Branch::to_text(self : Branch) -> String {
  self.tree.to_text()
}

///|
/// Get the frontier of this branch
pub fn Branch::get_frontier(self : Branch) -> Array[Int] {
  self.frontier.copy()
}

///|
/// Count visible characters in this branch
pub fn Branch::visible_count(self : Branch) -> Int {
  self.tree.visible_count()
}

///|
/// Check if this branch is at the given frontier
pub fn Branch::at_frontier(self : Branch, frontier : Array[Int]) -> Bool {
  if self.frontier.length() != frontier.length() {
    return false
  }

  // Check if all elements match (order doesn't matter for frontiers)
  for lv in self.frontier {
    if not(frontier.contains(lv)) {
      return false
    }
  }
  for lv in frontier {
    if not(self.frontier.contains(lv)) {
      return false
    }
  }
  true
}

///|
/// Apply an operation to a FugueTree
///
/// This is a helper function that applies either an Insert or Delete
/// operation to the tree, handling the FugueMax integration.
fn apply_operation_to_tree(
  tree : @fugue.FugueTree,
  op : @oplog.Op,
  oplog : @oplog.OpLog,
) -> Unit {
  match op.content {
    @oplog.Insert(text) => {
      // Get Lamport timestamp and agent from causal graph
      let (timestamp, agent) = match oplog.graph.get_entry(op.lv) {
        Some(entry) => (entry.lamport, entry.agent)
        None => (0, "unknown") // Fallback
      }

      // Insert into tree with FugueMax algorithm
      tree.insert(
        op.lv,
        text,
        op.origin_left,
        op.origin_right,
        timestamp,
        agent,
      )
    }
    @oplog.Delete =>
      // Mark item as deleted
      tree.delete(op.origin_left)
  }
}
