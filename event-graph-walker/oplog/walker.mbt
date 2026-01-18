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
  frontier : @causal_graph.Frontier,
) -> Array[Op] {
  // Use the causal graph walker
  self.get_ops(self.graph.walk_from_frontier(frontier))
}

///|
/// Walk with a filtering predicate
/// Useful for replaying only specific types of operations
pub fn OpLog::walk_filtered(
  self : OpLog,
  frontier : @causal_graph.Frontier,
  predicate : (Op) -> Bool,
) -> Array[Op] {
  self.walk_and_collect(frontier).filter(predicate)
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
  from_frontier : @causal_graph.Frontier,
  to_frontier : @causal_graph.Frontier,
) -> (Array[Op], Array[Op]) {
  // Use the causal graph diff
  let (retreat_lvs, advance_lvs) = self.graph.diff_frontiers_lvs(
    from_frontier, to_frontier,
  )

  // (in reverse order, in forward order)
  (self.get_ops(retreat_lvs), self.get_ops(advance_lvs))
}
