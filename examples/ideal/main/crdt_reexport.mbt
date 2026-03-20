///|
/// Re-export root canopy CRDT FFI functions so they appear in
/// the ideal-editor JS module exports. This eliminates the need
/// to load the separate @moonbit/canopy module (saves 7.6MB).

///|
pub fn create_editor_with_undo(agent_id : String, timeout_ms : Int) -> Int {
  @crdt.create_editor_with_undo(agent_id, timeout_ms)
}

///|
pub fn get_text(handle : Int) -> String {
  @crdt.get_text(handle)
}

///|
pub fn set_text(handle : Int, text : String) -> Unit {
  @crdt.set_text(handle, text)
}

///|
pub fn set_text_and_record(handle : Int, text : String, timestamp_ms : Int) -> Unit {
  @crdt.set_text_and_record(handle, text, timestamp_ms)
}

///|
pub fn get_proj_node_json(handle : Int) -> String {
  @crdt.get_proj_node_json(handle)
}

///|
pub fn get_source_map_json(handle : Int) -> String {
  @crdt.get_source_map_json(handle)
}

///|
pub fn get_errors_json(handle : Int) -> String {
  @crdt.get_errors_json(handle)
}

///|
pub fn get_version_json(handle : Int) -> String {
  @crdt.get_version_json(handle)
}

///|
pub fn insert_at(handle : Int, pos : Int, ch : String, ts : Int) -> Unit {
  @crdt.insert_at(handle, pos, ch, ts)
}

///|
pub fn delete_at(handle : Int, pos : Int, ts : Int) -> Bool {
  @crdt.delete_at(handle, pos, ts)
}

///|
pub fn export_all_json(handle : Int) -> String {
  @crdt.export_all_json(handle)
}

///|
pub fn export_since_json(handle : Int, peer_version : String) -> String {
  @crdt.export_since_json(handle, peer_version)
}

///|
pub fn apply_sync_json(handle : Int, sync_json : String) -> Unit {
  @crdt.apply_sync_json(handle, sync_json)
}

///|
pub fn apply_tree_edit_json(handle : Int, op_json : String, ts : Int) -> String {
  @crdt.apply_tree_edit_json(handle, op_json, ts)
}

///|
pub fn undo_manager_undo(handle : Int) -> Bool {
  @crdt.undo_manager_undo(handle)
}

///|
pub fn undo_manager_redo(handle : Int) -> Bool {
  @crdt.undo_manager_redo(handle)
}
