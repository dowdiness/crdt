///| Editor - User-facing editor with cursor tracking

///|

///|
/// Wraps a Document and maintains cursor position
pub struct Editor {
  doc : @document.Document
  mut cursor : Int // Current cursor position (0-based)
} derive(Show)

///|
/// Create a new editor for an agent
pub fn Editor::new(agent_id : String) -> Editor {
  { doc: @document.Document::new(agent_id), cursor: 0 }
}

///|
/// Get the current text content
pub fn Editor::get_text(self : Editor) -> String {
  self.doc.to_text()
}

///|
/// Get the current cursor position
pub fn Editor::get_cursor(self : Editor) -> Int {
  self.cursor
}

///|
/// Move cursor to a specific position
pub fn Editor::move_cursor(self : Editor, position : Int) -> Unit {
  let text_len = self.doc.to_text().length()
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
pub fn Editor::insert(self : Editor, text : String) -> Unit {
  let _op = self.doc.insert(self.cursor, text)
  self.cursor = self.cursor + text.length()
}

///| Insert text at a specific position

///|

///|
/// Cursor does not move
pub fn Editor::insert_at(self : Editor, position : Int, text : String) -> Unit {
  let _op = self.doc.insert(position, text)

}

///| Delete character at current cursor position

///|

///|
/// Returns true if successful, false if nothing to delete
pub fn Editor::delete(self : Editor) -> Bool {
  match self.doc.delete(self.cursor) {
    Some(_op) => true
    None => false
  }
}

///| Delete character before cursor (backspace)

///|

///|
/// Returns true if successful, false if at start
pub fn Editor::backspace(self : Editor) -> Bool {
  if self.cursor > 0 {
    self.cursor = self.cursor - 1
    match self.doc.delete(self.cursor) {
      Some(_op) => true
      None => {
        // Restore cursor if delete failed
        self.cursor = self.cursor + 1
        false
      }
    }
  } else {
    false
  }
}

///|
/// Apply a remote operation to this editor
pub fn Editor::apply_remote(self : Editor, op : @oplog.Op) -> Unit {
  self.doc.apply_remote(op)
  // Adjust cursor position if needed
  self.adjust_cursor()
}

///|
/// Merge remote operations into this editor
pub fn Editor::merge_remote(
  self : Editor,
  remote_ops : Array[@oplog.Op],
  remote_frontier : Array[Int],
) -> Unit {
  self.doc.merge_remote(remote_ops, remote_frontier)
  // Adjust cursor position if needed
  self.adjust_cursor()
}

///|
/// Get the current frontier
pub fn Editor::get_frontier(self : Editor) -> Array[Int] {
  self.doc.get_frontier()
}

///|
/// Get all operations (for sending to remote)
pub fn Editor::get_operations(self : Editor) -> Array[@oplog.Op] {
  self.doc.oplog.get_all_ops()
}

///|
/// Adjust cursor to stay within valid range after merge
fn Editor::adjust_cursor(self : Editor) -> Unit {
  let text_len = self.doc.to_text().length()
  if self.cursor > text_len {
    self.cursor = text_len
  }
}
