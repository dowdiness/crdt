// Protocol-based intent handlers.
// These provide typed entry points for the EditorProtocol, replacing
// the global-state bridge pattern (globals + hidden button clicks).

///|
/// Apply a text edit intent directly to the editor.
/// Uses apply_text_edit which records for undo and updates the parser.
pub fn handle_text_intent(
  handle : Int,
  from : Int,
  deleted_len : Int,
  insert : String,
  timestamp_ms : Int,
) -> Unit {
  match editors.get(handle) {
    Some(ed) => ed.apply_text_edit(from, deleted_len, insert, timestamp_ms)
    None => ()
  }
}

///|
/// Undo on the MoonBit editor directly.
/// Returns true if undo was performed.
pub fn handle_undo(handle : Int) -> Bool {
  match editors.get(handle) {
    Some(ed) => ed.undo()
    None => false
  }
}

///|
/// Redo on the MoonBit editor directly.
/// Returns true if redo was performed.
pub fn handle_redo(handle : Int) -> Bool {
  match editors.get(handle) {
    Some(ed) => ed.redo()
    None => false
  }
}

///|
/// Apply a structural edit intent.
/// Delegates to apply_tree_edit_json for JSON-based op dispatch.
/// Returns "ok" on success, or an error message on failure.
pub fn handle_structural_intent(
  handle : Int,
  op : String,
  node_id_str : String,
  timestamp_ms : Int,
) -> String {
  let op_json = "{\"type\":\"\{op}\",\"node_id\":\{node_id_str}}"
  apply_tree_edit_json(handle, op_json, timestamp_ms)
}
