// SyncEditor: Unified facade composing TextDoc + UndoManager + incremental parser
// Replaces ParsedEditor + separate UndoManager global

///|
pub struct SyncEditor {
  priv doc : @text.TextDoc
  priv undo : @undo.UndoManager
  priv parser : @loom.ImperativeParser[@parser.SyntaxNode]
  priv parser_rt : @incr.Runtime
  priv source_text : @incr.Signal[String]
  priv syntax_tree : @incr.Signal[@seam.SyntaxNode?]
  priv mut cursor : Int
  priv prev_proj_node : Ref[@proj.ProjNode?]
  priv proj_memo : @incr.Memo[@proj.ProjNode?]
  priv registry_memo : @incr.Memo[Map[@proj.NodeId, @proj.ProjNode]]
  priv source_map_memo : @incr.Memo[@proj.SourceMap]
  priv next_node_id : Ref[Int]
  priv ephemeral : EphemeralStore
  priv cursor_view : PeerCursorView
  priv peer_id : String
}

///|
pub fn SyncEditor::new(
  agent_id : String,
  capture_timeout_ms? : Int = 500,
  ephemeral_timeout_ms? : UInt64 = 60000UL,
) -> SyncEditor {
  let parser = @loom.new_imperative_parser("", @parser.lambda_grammar)
  let parser_rt = @incr.Runtime::new()
  let source_text = @incr.Signal::new(parser_rt, "", label="editor_source_text")
  let syntax_tree = @incr.Signal::new(
    parser_rt,
    None,
    label="editor_syntax_tree",
  )
  let prev_proj_node : Ref[@proj.ProjNode?] = Ref::new(None)
  let next_node_id : Ref[Int] = Ref::new(0)
  let (proj_memo, registry_memo, source_map_memo) = build_projection_memos(
    parser_rt, source_text, syntax_tree, prev_proj_node, next_node_id,
  )
  let ephemeral = EphemeralStore::new(ephemeral_timeout_ms)
  let cursor_view = PeerCursorView::new()
  // Subscribe to ephemeral store events to update cursor_view
  ignore(
    ephemeral.subscribe(fn(event) {
      for key in event.added() {
        match ephemeral.get(key) {
          Some(value) => cursor_view.apply_raw_update(key, value)
          None => ()
        }
      }
      for key in event.updated() {
        match ephemeral.get(key) {
          Some(value) => cursor_view.apply_raw_update(key, value)
          None => ()
        }
      }
      for key in event.removed() {
        cursor_view.remove(key)
      }
      true
    }),
  )
  {
    doc: @text.TextDoc::new(agent_id),
    undo: @undo.UndoManager::new(agent_id, capture_timeout_ms~),
    parser,
    parser_rt,
    source_text,
    syntax_tree,
    cursor: 0,
    prev_proj_node,
    proj_memo,
    registry_memo,
    source_map_memo,
    next_node_id,
    ephemeral,
    cursor_view,
    peer_id: agent_id,
  }
}

// --- Editing methods ---

///|
fn SyncEditor::set_parser_signals(
  self : SyncEditor,
  source : String,
  syntax : @seam.SyntaxNode?,
) -> Unit {
  self.parser_rt.batch(fn() {
    self.source_text.set(source)
    self.syntax_tree.set(syntax)
  })
}

///|
fn SyncEditor::sync_parser_after_text_change(
  self : SyncEditor,
  old_source : String,
  new_source : String,
  known_edit : @parser.Edit?,
) -> Unit {
  if old_source == new_source {
    return
  }
  if new_source == "" {
    ignore(self.parser.reset(new_source))
    self.set_parser_signals(new_source, None)
    return
  }
  let edit = match known_edit {
    Some(edit) => edit
    None => compute_edit(old_source, new_source)
  }
  let syntax = self.parser.edit(edit, new_source)
  self.set_parser_signals(new_source, Some(syntax))
}

///|
fn SyncEditor::force_parser_reset(self : SyncEditor) -> @seam.SyntaxNode {
  let source = self.doc.text()
  let syntax = self.parser.reset(source)
  if source == "" {
    self.set_parser_signals(source, None)
  } else {
    self.set_parser_signals(source, Some(syntax))
  }
  syntax
}

///|
fn SyncEditor::current_syntax_tree(self : SyncEditor) -> @seam.SyntaxNode {
  match self.syntax_tree.get() {
    Some(tree) => tree
    None => self.force_parser_reset()
  }
}

///|
pub fn SyncEditor::insert(self : SyncEditor, text : String) -> Unit raise {
  let old_source = self.doc.text()
  let insert_start = self.cursor
  self.doc.insert(@text.Pos::at(self.cursor), text)
  self.cursor = self.cursor + text.length()
  self.sync_parser_after_text_change(
    old_source,
    self.doc.text(),
    Some(@parser.Edit::insert(insert_start, text.length())),
  )
}

///|
pub fn SyncEditor::delete(self : SyncEditor) -> Bool {
  let old_source = self.doc.text()
  try self.doc.delete(@text.Pos::at(self.cursor)) catch {
    _ => false
  } noraise {
    _ => {
      self.sync_parser_after_text_change(
        old_source,
        self.doc.text(),
        Some(@parser.Edit::delete(self.cursor, self.cursor + 1)),
      )
      true
    }
  }
}

///|
pub fn SyncEditor::backspace(self : SyncEditor) -> Bool {
  if self.cursor > 0 {
    let old_source = self.doc.text()
    self.cursor = self.cursor - 1
    try self.doc.delete(@text.Pos::at(self.cursor)) catch {
      _ => {
        self.cursor = self.cursor + 1
        false
      }
    } noraise {
      _ => {
        self.sync_parser_after_text_change(
          old_source,
          self.doc.text(),
          Some(@parser.Edit::delete(self.cursor, self.cursor + 1)),
        )
        true
      }
    }
  } else {
    false
  }
}

///|
pub fn SyncEditor::move_cursor(self : SyncEditor, position : Int) -> Unit {
  let text_len = self.doc.len()
  if position < 0 {
    self.cursor = 0
  } else if position > text_len {
    self.cursor = text_len
  } else {
    self.cursor = position
  }
}

// --- Query methods ---

///|
pub fn SyncEditor::get_text(self : SyncEditor) -> String {
  self.doc.text()
}

///|
pub fn SyncEditor::get_cursor(self : SyncEditor) -> Int {
  self.cursor
}

///|
pub fn SyncEditor::mark_dirty(self : SyncEditor) -> Unit {
  ignore(self.force_parser_reset())
}

///|
pub fn SyncEditor::get_ast(self : SyncEditor) -> @ast.Term {
  let syntax_node = self.current_syntax_tree()
  @parser.syntax_node_to_term(syntax_node)
}

///|
pub fn SyncEditor::get_ast_pretty(self : SyncEditor) -> String {
  let ast = self.get_ast()
  "Expression: " + @ast.print_term(ast) + "\n\nAST:\n" + @debug.to_string(ast)
}

///|
pub fn SyncEditor::get_resolution(self : SyncEditor) -> @parser.Resolution {
  @parser.resolve(self.get_ast())
}

///|
pub fn SyncEditor::get_dot_resolved(self : SyncEditor) -> String {
  let ast = self.get_ast()
  let res = @parser.resolve(ast)
  @parser.term_to_dot_resolved(ast, res)
}

///|
pub fn SyncEditor::get_errors(self : SyncEditor) -> Array[String] {
  if self.doc.text() == "" {
    return []
  }
  self.parser.diagnostics()
}

///|
pub fn SyncEditor::is_parse_valid(self : SyncEditor) -> Bool {
  self.get_errors().is_empty()
}

// --- Sync methods ---

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
    let splice = compute_text_splice(old_source, new_source)
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

// --- Bulk text methods ---

///|
fn SyncEditor::apply_text_edit_internal(
  self : SyncEditor,
  start : Int,
  deleted_len : Int,
  inserted : String,
  timestamp_ms : Int,
  record_undo : Bool,
  move_cursor_to_edit_end : Bool,
) -> Unit {
  let old_source = self.doc.text()
  let text_len = self.doc.len()
  let safe_start = if start < 0 {
    0
  } else if start > text_len {
    text_len
  } else {
    start
  }
  let max_delete_len = text_len - safe_start
  let safe_delete_len = if deleted_len < 0 {
    0
  } else if deleted_len > max_delete_len {
    max_delete_len
  } else {
    deleted_len
  }
  for _i = 0; _i < safe_delete_len; _i = _i + 1 {
    if record_undo {
      self.doc.delete_and_record(
        @text.Pos::at(safe_start),
        self.undo,
        timestamp_ms~,
      ) catch {
        _ => ()
      }
    } else {
      self.doc.delete(@text.Pos::at(safe_start)) catch {
        _ => ()
      }
    }
  }
  if inserted.length() > 0 {
    if record_undo {
      self.doc.insert_and_record(
        @text.Pos::at(safe_start),
        inserted,
        self.undo,
        timestamp_ms~,
      ) catch {
        _ => ()
      }
    } else {
      self.doc.insert(@text.Pos::at(safe_start), inserted) catch {
        _ => ()
      }
    }
  }
  if move_cursor_to_edit_end {
    self.cursor = safe_start + inserted.length()
  } else {
    self.adjust_cursor()
  }
  self.sync_parser_after_text_change(
    old_source,
    self.doc.text(),
    Some(@parser.Edit::new(safe_start, safe_delete_len, inserted.length())),
  )
}

///|
pub fn SyncEditor::apply_text_edit(
  self : SyncEditor,
  start : Int,
  deleted_len : Int,
  inserted : String,
  timestamp_ms : Int,
) -> Unit {
  self.apply_text_edit_internal(
    start, deleted_len, inserted, timestamp_ms, true, true,
  )
}

///|
pub fn SyncEditor::set_text(self : SyncEditor, new_text : String) -> Unit {
  let old_text = self.doc.text()
  if old_text == new_text {
    return
  }
  let splice = compute_text_splice(old_text, new_text)
  self.apply_text_edit_internal(
    splice.start,
    splice.delete_len,
    splice.inserted,
    0,
    false,
    true,
  )
}

///|
pub fn SyncEditor::set_text_and_record(
  self : SyncEditor,
  new_text : String,
  timestamp_ms : Int,
) -> Unit {
  let old_text = self.doc.text()
  if old_text == new_text {
    return
  }
  let splice = compute_text_splice(old_text, new_text)
  self.apply_text_edit_internal(
    splice.start,
    splice.delete_len,
    splice.inserted,
    timestamp_ms,
    true,
    false,
  )
}

// --- Undo methods ---

///|
pub fn SyncEditor::insert_and_record(
  self : SyncEditor,
  text : String,
  timestamp_ms : Int,
) -> Unit raise {
  let old_source = self.doc.text()
  let insert_start = self.cursor
  self.doc.insert_and_record(
    @text.Pos::at(self.cursor),
    text,
    self.undo,
    timestamp_ms~,
  )
  self.cursor = self.cursor + text.length()
  self.sync_parser_after_text_change(
    old_source,
    self.doc.text(),
    Some(@parser.Edit::insert(insert_start, text.length())),
  )
}

///|
pub fn SyncEditor::delete_and_record(
  self : SyncEditor,
  timestamp_ms : Int,
) -> Bool {
  let old_source = self.doc.text()
  try {
    self.doc.delete_and_record(
      @text.Pos::at(self.cursor),
      self.undo,
      timestamp_ms~,
    )
    self.sync_parser_after_text_change(
      old_source,
      self.doc.text(),
      Some(@parser.Edit::delete(self.cursor, self.cursor + 1)),
    )
    true
  } catch {
    _ => false
  }
}

///|
pub fn SyncEditor::backspace_and_record(
  self : SyncEditor,
  timestamp_ms : Int,
) -> Bool {
  if self.cursor > 0 {
    let old_source = self.doc.text()
    let new_pos = self.cursor - 1
    try {
      self.doc.delete_and_record(
        @text.Pos::at(new_pos),
        self.undo,
        timestamp_ms~,
      )
      self.cursor = new_pos
      self.sync_parser_after_text_change(
        old_source,
        self.doc.text(),
        Some(@parser.Edit::delete(new_pos, new_pos + 1)),
      )
      true
    } catch {
      _ => false
    }
  } else {
    false
  }
}

///|
pub fn SyncEditor::undo(self : SyncEditor) -> Bool {
  try {
    self.undo.undo(self.doc)
    self.adjust_cursor()
    self.mark_dirty()
    true
  } catch {
    _ => false
  }
}

///|
pub fn SyncEditor::redo(self : SyncEditor) -> Bool {
  try {
    self.undo.redo(self.doc)
    self.adjust_cursor()
    self.mark_dirty()
    true
  } catch {
    _ => false
  }
}

///|
pub fn SyncEditor::can_undo(self : SyncEditor) -> Bool {
  self.undo.can_undo()
}

///|
pub fn SyncEditor::can_redo(self : SyncEditor) -> Bool {
  self.undo.can_redo()
}

///|
pub fn SyncEditor::set_tracking(self : SyncEditor, enabled : Bool) -> Unit {
  self.undo.set_tracking(enabled)
}

///|
pub fn SyncEditor::clear_undo(self : SyncEditor) -> Unit {
  self.undo.clear()
}

// --- Ephemeral presence methods ---

///|
pub fn SyncEditor::set_local_presence(
  self : SyncEditor,
  name : String,
  color : String,
  selection? : (Int, Int)? = None,
) -> Unit {
  let map : Map[String, EphemeralValue] = {}
  map["cursor"] = EphemeralValue::I64(self.cursor.to_int64())
  map["name"] = EphemeralValue::String(name)
  map["color"] = EphemeralValue::String(color)
  match selection {
    Some((start, end)) =>
      map["selection"] = EphemeralValue::List([
        EphemeralValue::I64(start.to_int64()),
        EphemeralValue::I64(end.to_int64()),
      ])
    None => ()
  }
  self.ephemeral.set(self.peer_id, EphemeralValue::Map(map)) catch {
    _ => ()
  }
}

///|
pub fn SyncEditor::apply_ephemeral(self : SyncEditor, data : Bytes) -> Unit {
  self.ephemeral.apply(data) catch {
    _ => ()
  }
}

///|
pub fn SyncEditor::encode_ephemeral_all(self : SyncEditor) -> Bytes {
  self.ephemeral.encode_all()
}

///|
pub fn SyncEditor::remove_ephemeral_outdated(self : SyncEditor) -> Unit {
  self.ephemeral.remove_outdated()
}

///|
pub fn SyncEditor::get_peer_cursors(
  self : SyncEditor,
) -> Map[String, PeerCursor] {
  self.cursor_view.all_cursors()
}

///|
pub fn SyncEditor::get_peer_id(self : SyncEditor) -> String {
  self.peer_id
}

///|
pub fn SyncEditor::subscribe_ephemeral_local(
  self : SyncEditor,
  callback : (Bytes) -> Bool,
) -> EphemeralSubscription {
  self.ephemeral.subscribe_local_updates(callback)
}
