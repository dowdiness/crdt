// Sync/export operations for SyncEditor.

///|
fn SyncEditor::adjust_cursor(self : SyncEditor) -> Unit {
  let text_len = self.doc.len()
  if self.cursor > text_len {
    self.cursor = text_len
  }
}

///|
pub fn SyncEditor::apply_sync(
  self : SyncEditor,
  msg : @text.SyncMessage,
) -> Unit raise {
  let old_source = self.doc.text()
  self.doc.sync().apply(msg)
  let new_source = self.doc.text()
  self.adjust_cursor()
  self.sync_parser_after_text_change(old_source, new_source, None)
  // Adjust derived cursor view for the text change
  if old_source != new_source {
    let splice = @text_change.compute_text_change(old_source, new_source)
    self.cursor_view.adjust_for_edit(
      splice.start,
      splice.delete_len,
      splice.inserted.length(),
    )
  }
}

///|
pub fn SyncEditor::get_version(self : SyncEditor) -> @text.Version {
  self.doc.version()
}

///|
pub fn SyncEditor::export_all(self : SyncEditor) -> @text.SyncMessage raise {
  self.doc.sync().export_all()
}

///|
pub fn SyncEditor::export_since(
  self : SyncEditor,
  peer_version : @text.Version,
) -> @text.SyncMessage raise {
  self.doc.sync().export_since(peer_version)
}
