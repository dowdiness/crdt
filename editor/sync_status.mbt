// SyncStatus: observable state of the WebSocket sync recovery lifecycle.

///|
/// The current synchronization state of the editor's WebSocket connection.
/// Transitions are emitted via the on_status_change callback.
///
/// Contract: callbacks must not call back into SyncEditor synchronously —
/// re-entry could cause double emissions that the equality guard cannot absorb.
pub enum SyncStatus {
  /// No WebSocket connection established.
  Disconnected
  /// Connected and fully synchronized.
  Idle
  /// Actively recovering from a causal gap with a specific peer.
  Recovering(peer_id~ : String, attempt~ : Int)
  /// Recovery failed or aborted; last-known bad state.
  Error(reason~ : SyncErrorReason)
} derive(Debug, Eq)

///|
/// Reason for entering the Error state.
pub enum SyncErrorReason {
  /// All three retries were used with no successful response.
  Exhausted(peer_id~ : String)
  /// The target peer disconnected while recovery was in progress.
  TargetLeft(peer_id~ : String)
} derive(Debug, Eq)

///|
pub impl Show for SyncStatus with output(self, logger) {
  match self {
    Disconnected => logger.write_string("Disconnected")
    Idle => logger.write_string("Idle")
    Recovering(peer_id~, attempt~) =>
      logger.write_string("Recovering(\{peer_id}, \{attempt})")
    Error(reason~) => logger.write_string("Error(\{reason})")
  }
}

///|
pub impl Show for SyncErrorReason with output(self, logger) {
  match self {
    Exhausted(peer_id~) => logger.write_string("Exhausted(\{peer_id})")
    TargetLeft(peer_id~) => logger.write_string("TargetLeft(\{peer_id})")
  }
}
