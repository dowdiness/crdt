///| Document error types

///|
pub(all) suberror DocumentError {
  /// Invalid cursor position for operation
  InvalidPosition(pos~ : Int)
  /// RawVersion could not be resolved to local version
  MissingOrigin(raw~ : @causal_graph.RawVersion)
  /// Wrapped error from oplog operations
  OpLog(@oplog.OpLogError)
  /// Wrapped error from fugue tree operations
  Fugue(@fugue.FugueError)
  /// Wrapped error from branch operations
  Branch(@branch.BranchError)
}
