// OpLog-specific walker functions
// Wraps the generic causal graph walker with operation collection

///|
/// Walk the operation log from a frontier, collecting operations in causal order
///
/// # Arguments
/// * `frontier` - Starting frontier
///
/// # Returns
/// Array of operations in topological (causal) order
pub fn OpLog::walk_and_collect(
  self : OpLog,
  frontier : Array[Int],
) -> Array[Op] {
  // Use the causal graph walker
  let lvs = self.graph.walk_from_frontier(frontier)

  // Collect operations
  let result : Array[Op] = []
  for lv in lvs {
    match self.get_op(lv) {
      Some(op) => result.push(op)
      None => ()
    }
  }
  result
}

///|
/// Walk with a filtering predicate
/// Useful for replaying only specific types of operations
pub fn OpLog::walk_filtered(
  self : OpLog,
  frontier : Array[Int],
  predicate : (Op) -> Bool,
) -> Array[Op] {
  let all_ops = self.walk_and_collect(frontier)
  all_ops.filter(predicate)
}

///|
/// Calculate diff between two frontiers and return operations to apply
///
/// # Returns
/// (retreat_ops, advance_ops) - operations to undo and redo
///
/// retreat_ops are in reverse order (for undo)
/// advance_ops are in forward order (for redo)
pub fn OpLog::diff_and_collect(
  self : OpLog,
  from_frontier : Array[Int],
  to_frontier : Array[Int],
) -> (Array[Op], Array[Op]) {
  // Use the causal graph diff
  let (retreat_lvs, advance_lvs) = self.graph.diff_frontiers_lvs(
    from_frontier, to_frontier,
  )

  // Collect retreat operations (already in reverse order)
  let retreat_ops : Array[Op] = []
  for lv in retreat_lvs {
    match self.get_op(lv) {
      Some(op) => retreat_ops.push(op)
      None => ()
    }
  }

  // Collect advance operations (in forward order)
  let advance_ops : Array[Op] = []
  for lv in advance_lvs {
    match self.get_op(lv) {
      Some(op) => advance_ops.push(op)
      None => ()
    }
  }
  (retreat_ops, advance_ops)
}

///|
/// Get all insert operations in causal order
pub fn OpLog::walk_inserts(self : OpLog, frontier : Array[Int]) -> Array[Op] {
  self.walk_filtered(frontier, fn(op) { op.is_insert() })
}

///|
/// Get all delete operations in causal order
pub fn OpLog::walk_deletes(self : OpLog, frontier : Array[Int]) -> Array[Op] {
  self.walk_filtered(frontier, fn(op) { op.is_delete() })
}
