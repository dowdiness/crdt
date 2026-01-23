///| Editor - User-facing editor with cursor tracking

///|

///|
/// Wraps a TextDoc and maintains cursor position
pub struct Editor {
  doc : @text.TextDoc
  mut cursor : Int // Current cursor position (0-based)
} derive(Show)

///|
/// Create a new editor for an agent
pub fn Editor::new(agent_id : String) -> Editor {
  { doc: @text.TextDoc::new(agent_id), cursor: 0 }
}

///|
/// Get the current text content
pub fn Editor::get_text(self : Editor) -> String {
  self.doc.text()
}

///|
/// Get the current cursor position
pub fn Editor::get_cursor(self : Editor) -> Int {
  self.cursor
}

///|
/// Move cursor to a specific position
pub fn Editor::move_cursor(self : Editor, position : Int) -> Unit {
  let text_len = self.doc.len()
  if position < 0 {
    self.cursor = 0
  } else if position > text_len {
    self.cursor = text_len
  } else {
    self.cursor = position
  }
}

///| Insert text at current cursor position

///|

///|
/// After insertion, cursor moves to after the inserted text
pub fn Editor::insert(self : Editor, text : String) -> Unit raise {
  let _ = self.doc.insert(@text.Pos::at(self.cursor), text)
  self.cursor = self.cursor + text.length()
}

///| Insert text at a specific position

///|

///|
/// Cursor does not move
pub fn Editor::insert_at(
  self : Editor,
  position : Int,
  text : String,
) -> Unit raise {
  let _ = self.doc.insert(@text.Pos::at(position), text)

}

///| Delete character at current cursor position

///|

///|
/// Returns true if successful, false if nothing to delete
pub fn Editor::delete(self : Editor) -> Bool {
  try self.doc.delete(@text.Pos::at(self.cursor)) catch {
    @text.TextError::InvalidPosition(..) => false
    _ => false
  } noraise {
    _ => true
  }
}

///| Delete character before cursor (backspace)

///|

///|
/// Returns true if successful, false if at start
pub fn Editor::backspace(self : Editor) -> Bool {
  if self.cursor > 0 {
    self.cursor = self.cursor - 1
    try self.doc.delete(@text.Pos::at(self.cursor)) catch {
      @text.TextError::InvalidPosition(..) => {
        // Restore cursor if delete failed
        self.cursor = self.cursor + 1
        false
      }
      _ => {
        self.cursor = self.cursor + 1
        false
      }
    } noraise {
      _ => true
    }
  } else {
    false
  }
}

///|
/// Apply a remote operation to this editor
pub fn Editor::apply_remote(self : Editor, op : @oplog.Op) -> Unit raise {
  self.doc.inner_document().apply_remote(op)
  // Adjust cursor position if needed
  self.adjust_cursor()
}

///|
/// Merge remote operations into this editor.
/// Uses inner_document() to preserve frontier validation even when ops is empty.
pub fn Editor::merge_remote(
  self : Editor,
  remote_ops : Array[@oplog.Op],
  remote_frontier : Array[@causal_graph.RawVersion],
) -> Unit raise {
  // Use inner_document() directly to preserve frontier validation behavior.
  // SyncSession::apply skips validation when ops is empty, which could
  // allow inconsistent sync states to pass silently.
  self.doc.inner_document().merge_remote(remote_ops, remote_frontier)
  // Adjust cursor position if needed
  self.adjust_cursor()
}

///|
/// Get the current frontier
pub fn Editor::get_frontier(self : Editor) -> @causal_graph.Frontier {
  self.doc.version().to_frontier()
}

///|
/// Get frontier as RawVersions for network sync.
/// Uses inner_document() directly to avoid O(n) oplog materialization.
pub fn Editor::get_frontier_raw(
  self : Editor,
) -> Array[@causal_graph.RawVersion] raise {
  self.doc.inner_document().get_frontier_raw()
}

///|
/// Get all operations (for sending to remote)
pub fn Editor::get_operations(self : Editor) -> Array[@oplog.Op] {
  self.doc.inner_document().oplog.get_all_ops()
}

///|
/// Adjust cursor to stay within valid range after merge
fn Editor::adjust_cursor(self : Editor) -> Unit {
  let text_len = self.doc.len()
  if self.cursor > text_len {
    self.cursor = text_len
  }
}

///|
/// Get the current version (for sync)
pub fn Editor::get_version(self : Editor) -> @text.Version {
  self.doc.version()
}

///|
/// Sync: Export all operations as a SyncMessage
pub fn Editor::export_all(self : Editor) -> @text.SyncMessage raise {
  self.doc.sync().export_all()
}

///|
/// Sync: Export operations since a peer's version
pub fn Editor::export_since(
  self : Editor,
  peer_version : @text.Version,
) -> @text.SyncMessage raise {
  self.doc.sync().export_since(peer_version)
}

///|
/// Sync: Apply a SyncMessage from a peer
pub fn Editor::apply_sync(self : Editor, msg : @text.SyncMessage) -> Unit raise {
  self.doc.sync().apply(msg)
  self.adjust_cursor()
}
