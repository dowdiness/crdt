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

///| Merge remote operations into local state

///|

///|
/// This is a convenience function for applying remote operations
pub fn merge_remote_ops(
  tree : @fugue.FugueTree,
  oplog : @oplog.OpLog,
  remote_ops : Array[@oplog.Op],
) -> Unit {
  // Save current frontier BEFORE adding remote ops
  let old_frontier = oplog.get_frontier()

  // Build a mapping from remote LVs to local LVs as we add operations
  let mut lv_map : @immut/hashmap.HashMap[Int, Int] = @immut/hashmap.new()

  // Add remote operations to oplog with LV translation
  for remote_op in remote_ops {
    // Check if we already have this operation (agent, seq)
    let raw_version = @causal_graph.RawVersion::new(
      remote_op.agent,
      remote_op.seq,
    )
    match oplog.graph.raw_to_lv(raw_version) {
      Some(existing_lv) => {
        // We already have this operation, just record the LV mapping and skip
        lv_map = lv_map.add(remote_op.lv, existing_lv)
        continue
      }
      None => () // New operation, proceed to add it
    }

    // Translate origin_left and origin_right from remote LV space to local LV space
    let local_origin_left = if remote_op.origin_left == -1 {
      -1
    } else {
      match lv_map.get(remote_op.origin_left) {
        Some(local_lv) => local_lv
        None => remote_op.origin_left // Fallback: use as-is (may cause issues)
      }
    }
    let local_origin_right = if remote_op.origin_right == -1 {
      -1
    } else {
      match lv_map.get(remote_op.origin_right) {
        Some(local_lv) => local_lv
        None => remote_op.origin_right // Fallback: use as-is (may cause issues)
      }
    }

    // Add version to graph
    let local_lv = oplog.graph.add_version(remote_op.parents, remote_op.agent)

    // Create operation with translated origins and local LV
    let local_op = match remote_op.content {
      @oplog.Insert(text) =>
        @oplog.Op::new_insert(
          local_lv,
          remote_op.parents,
          remote_op.agent,
          remote_op.seq,
          text,
          local_origin_left,
          local_origin_right,
        )
      @oplog.Delete =>
        @oplog.Op::new_delete(
          local_lv,
          remote_op.parents,
          remote_op.agent,
          remote_op.seq,
          local_origin_left,
        )
    }

    // Add to operations
    oplog.add_op(local_op)

    // Record the mapping from remote LV to local LV
    lv_map = lv_map.add(remote_op.lv, local_lv)
  }

  // Get the new frontier after adding remote ops
  let new_frontier = oplog.get_frontier()

  // Merge from old frontier to new frontier
  merge(tree, oplog, old_frontier, new_frontier)
}
