///| Sync operations for TextDoc

///| A message containing operations and version info for syncing between peers.

///|
/// This is an opaque container - use accessor methods to inspect contents.
pub(all) struct SyncMessage {
  priv ops : Array[@oplog.Op]
  priv heads : Array[@causal_graph.RawVersion]
} derive(Show)

///|
/// Create a SyncMessage from internal types (for advanced use/deserialization).
pub fn SyncMessage::new(
  ops : Array[@oplog.Op],
  heads : Array[@causal_graph.RawVersion],
) -> SyncMessage {
  { ops, heads }
}

///|
/// Get the operations in this message (for advanced use/serialization).
pub fn SyncMessage::get_ops(self : SyncMessage) -> Array[@oplog.Op] {
  self.ops
}

///|
/// Get the heads (version frontier) in this message (for advanced use/serialization).
pub fn SyncMessage::get_heads(
  self : SyncMessage,
) -> Array[@causal_graph.RawVersion] {
  self.heads
}

///|
/// Check if this message contains no operations.
pub fn SyncMessage::is_empty(self : SyncMessage) -> Bool {
  self.ops.is_empty()
}

///|
/// Get the number of operations in this message.
pub fn SyncMessage::op_count(self : SyncMessage) -> Int {
  self.ops.length()
}

///| A sync session providing methods to synchronize a TextDoc with peers.

///|
/// Obtain via `TextDoc::sync()`.
pub(all) struct SyncSession {
  priv doc : TextDoc
}

///|
/// Create a sync session for a document (typically use TextDoc::sync() instead).
pub fn SyncSession::new(doc : TextDoc) -> SyncSession {
  { doc, }
}

///|
/// Export all operations as a sync message
pub fn SyncSession::export_all(
  self : SyncSession,
) -> SyncMessage raise TextError {
  let inner = self.doc.inner
  let ops = inner.oplog.get_all_ops()
  try {
    let heads = inner.get_frontier_raw()
    SyncMessage::{ ops, heads }
  } catch {
    err => raise TextError::from_document_error(err, self.doc.len())
  }
}

///|
/// Export operations since a peer's version
pub fn SyncSession::export_since(
  self : SyncSession,
  peer_version : Version,
) -> SyncMessage raise TextError {
  let inner = self.doc.inner
  let peer_frontier = peer_version.to_frontier()
  let current_frontier = inner.get_frontier()
  let (_, advance_ops) = inner.oplog.diff_and_collect(
    peer_frontier, current_frontier,
  )
  try {
    let heads = inner.get_frontier_raw()
    SyncMessage::{ ops: advance_ops, heads }
  } catch {
    err => raise TextError::from_document_error(err, self.doc.len())
  }
}

///|
/// Apply a sync message from a peer
pub fn SyncSession::apply(
  self : SyncSession,
  message : SyncMessage,
) -> Unit raise TextError {
  if message.is_empty() {
    return
  }
  self.doc.inner.merge_remote(message.ops, message.heads) catch {
    err => raise TextError::from_document_error(err, self.doc.len())
  }
}

///|
/// Get the current version after sync operations
pub fn SyncSession::current_version(self : SyncSession) -> Version {
  self.doc.version()
}
