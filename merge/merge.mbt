///| Merge algorithm implementation

///|

///| Implements the three-phase retreat-advance-apply merge strategy

///|
/// MergeContext - state during merge operation
pub struct MergeContext {
  tree : @fugue.FugueTree // The FugueMax tree being merged
  oplog : @oplog.OpLog // Operation log
}

///|
/// Create a new merge context
pub fn MergeContext::new(
  tree : @fugue.FugueTree,
  oplog : @oplog.OpLog,
) -> MergeContext {
  { tree, oplog }
}

///| Apply operations from the advance set

///|

///|
/// This integrates operations into the tree in topological order
pub fn MergeContext::apply_operations(
  self : MergeContext,
  operations : Array[Int],
) -> Unit {
  // Sort operations by LV (which gives us topological order due to the way LVs are assigned)
  let sorted_ops = operations.copy()
  sorted_ops.sort()

  // Apply each operation in order
  for lv in sorted_ops {
    match self.oplog.get_op(lv) {
      Some(op) =>
        match op.content {
          @oplog.Insert(text) => {
            // Get Lamport timestamp and agent from causal graph for proper ordering
            let (timestamp, agent) = match self.oplog.graph.get_entry(op.lv) {
              Some(entry) => (entry.lamport, entry.agent)
              None => (0, "unknown") // Fallback
            }

            // Insert into tree with FugueMax algorithm
            self.tree.insert(
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
            self.tree.delete(op.origin_left)
        }
      None => () // Operation not found, skip
    }
  }
}

///| Remove operations from the retreat set

///|

///|
/// This removes items from the tree that are in the retreat set
pub fn MergeContext::retreat_operations(
  self : MergeContext,
  operations : Array[Int],
) -> Unit {
  // For simplicity, we mark retreated items as deleted
  // A more sophisticated implementation would actually remove them
  for lv in operations {
    self.tree.delete(lv)
  }
}

///| Perform a full merge operation

///|

///| This implements the three-phase retreat-advance-apply merge:

///| 1. Calculate diff between current frontier and target frontier

///| 2. Retreat operations not in target

///|
/// 3. Advance (apply) operations in target
pub fn merge(
  tree : @fugue.FugueTree,
  oplog : @oplog.OpLog,
  current_frontier : Array[Int],
  target_frontier : Array[Int],
) -> Unit {
  // Calculate retreat and advance sets
  let (retreat_ops, advance_ops) = oplog.graph.graph_diff(
    current_frontier, target_frontier,
  )
  let ctx = MergeContext::new(tree, oplog)

  // Phase 1: Retreat - remove operations not in target
  ctx.retreat_operations(retreat_ops)

  // Phase 2: Advance - apply operations in target
  ctx.apply_operations(advance_ops)
}

///| Merge remote operations into local state using Branch system

///|

///|
/// This properly uses the eg-walker Branch system:
/// 1. Creates a Branch representing current state
/// 2. Uses Branch::merge_remote_ops which leverages the walker
/// 3. Updates the tree to match the merged branch
///
/// This is a convenience function for applying remote operations
pub fn merge_remote_ops(
  tree : @fugue.FugueTree,
  oplog : @oplog.OpLog,
  remote_ops : Array[@oplog.Op],
) -> Unit {
  // Create a Branch representing the current state
  let branch = @branch.Branch::from_tree_and_oplog(tree, oplog)

  // Use Branch::merge_remote_ops which properly uses the walker
  // This leverages the eg-walker algorithm with causal ordering
  let _ = branch.merge_remote_ops(remote_ops)

  // The tree has been updated in-place through the branch
  // (since Branch reuses the same tree reference when only advancing)
}
