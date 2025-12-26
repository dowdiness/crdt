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
            // Get lamport timestamp from the graph
            let timestamp = match self.oplog.graph.lv_to_raw(op.lv) {
              Some(raw) =>
                // Use sequence number as timestamp (simplified)
                raw.seq
              None => op.lv
            }

            // Insert into tree with FugueMax algorithm
            self.tree.insert(
              op.lv,
              text,
              op.origin_left,
              op.origin_right,
              timestamp,
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
  target_frontier : Array[Int],
) -> Unit {
  let current_frontier = oplog.get_frontier()

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

///| Merge remote operations into local state

///|

///|
/// This is a convenience function for applying remote operations
pub fn merge_remote_ops(
  tree : @fugue.FugueTree,
  oplog : @oplog.OpLog,
  remote_ops : Array[@oplog.Op],
) -> Unit {
  // Add remote operations to oplog
  for op in remote_ops {
    oplog.apply_remote(op)
  }

  // Get the new frontier after adding remote ops
  let new_frontier = oplog.get_frontier()

  // Merge to the new frontier
  merge(tree, oplog, new_frontier)
}
