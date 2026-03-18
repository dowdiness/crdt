// Tree Edit Bridge: Apply structural projection edits through the text CRDT.
// TreeEditOp -> ProjNode -> unparse -> set_text_and_record -> memo reconcile
// Debt rule: tree edits must route back through authoritative text state.
// Do not introduce a second persistent AST/editor model alongside SyncEditor.

///|
/// Apply a tree edit by round-tripping through the text CRDT.
///
/// Dual-path strategy:
/// 1. **New path** — try `compute_text_edit` first; if it returns span edits,
///    apply them directly via `apply_text_edit_internal` (incremental-parser-aware).
/// 2. **Old path** — fall back to apply_edit_to_proj → from_proj_node → print_flat_proj
///    for any ops not yet handled by `compute_text_edit`.
pub fn SyncEditor::apply_tree_edit(
  self : SyncEditor,
  op : @proj.TreeEditOp,
  timestamp_ms : Int,
) -> Result[Unit, String] {
  let old_text = self.get_text()
  let old_cursor = self.get_cursor()

  // New path: try compute_text_edit first
  let source_map = self.get_source_map()
  let registry = self.registry_memo.get()
  let flat_proj = match self.get_flat_proj() {
    Some(fp) => fp
    None => return Err("No FlatProj available")
  }
  match @proj.compute_text_edit(op, old_text, source_map, registry, flat_proj) {
    Ok(Some(edits)) => {
      if edits.is_empty() {
        return Ok(()) // no-op
      }
      // Apply span edits in reverse document order to avoid position shifts.
      // IMPORTANT: use apply_text_edit_internal (not apply_replace_span)
      // because it calls apply_local_text_change to notify the incremental parser.
      let sorted = edits.copy()
      sorted.sort_by(fn(a, b) { b.start.compare(a.start) })
      for edit in sorted {
        self.apply_text_edit_internal(
          edit.start,
          edit.delete_len,
          edit.inserted,
          timestamp_ms,
          true, // record_undo
          false, // move_cursor_to_edit_end
        )
      }
      self.move_cursor(old_cursor)
      return Ok(())
    }
    Ok(None) => () // fall through to old path
    Err(msg) => return Err(msg)
  }

  // Old path: apply_edit_to_proj → from_proj_node → print_flat_proj
  let proj = match self.get_proj_node() {
    Some(p) => p
    None => return Err("No ProjNode available")
  }
  let new_proj = match
    @proj.apply_edit_to_proj(proj, op, registry, self.next_node_id) {
    Ok(updated) => updated
    Err(msg) => return Err(msg)
  }
  let new_fp = @proj.FlatProj::from_proj_node(new_proj)
  let new_text = @proj.print_flat_proj(new_fp)
  if old_text == new_text {
    return Ok(())
  }
  self.seed_flat_proj(Some(new_fp))
  self.set_text_and_record(new_text, timestamp_ms)
  self.move_cursor(old_cursor)
  Ok(())
}
