///| Branch error types

///|
pub(all) suberror BranchError {
  /// Operation not found in oplog (branch-specific lookup failure)
  MissingOp(lv~ : Int)
  /// RawVersion could not be resolved to local version
  MissingOrigin(raw~ : @causal_graph.RawVersion)
  /// Wrapped error from oplog operations
  OpLog(@oplog.OpLogError)
  /// Wrapped error from fugue tree operations
  Fugue(@fugue.FugueError)
}
