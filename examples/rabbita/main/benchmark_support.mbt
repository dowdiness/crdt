///|
pub struct BenchmarkSession {
  priv mut model : Model
}

///|
fn benchmark_dispatch(_msg : Msg) -> @rabbita.Cmd {
  @rabbita.none
}

///|
fn benchmark_model(source : String) -> Model {
  let editor = @editor.SyncEditor::new("bench")
  editor.set_text(source)
  {
    editor,
    tree_state: @proj.TreeEditorState::from_projection(
      editor.get_proj_node(),
      editor.get_source_map(),
    ),
    text_view: source,
    workspace_mode: Split,
    diagnostics_open: false,
    peers: [],
    next_timestamp: 1,
    projection_dirty: false,
    refresh_scheduled: false,
  }
}

///|
pub fn BenchmarkSession::new(source : String) -> BenchmarkSession {
  { model: benchmark_model(source) }
}

///|
pub fn BenchmarkSession::legacy_set_text_refresh(
  self : BenchmarkSession,
  new_text : String,
) -> Unit {
  self.model.editor.set_text(new_text)
  self.model = refresh({
    ..self.model,
    text_view: new_text,
    next_timestamp: self.model.next_timestamp + 1,
  })
}

///|
pub fn BenchmarkSession::incremental_eager_refresh(
  self : BenchmarkSession,
  new_text : String,
) -> Unit {
  let splice = @editor.compute_text_splice(
    self.model.editor.get_text(),
    new_text,
  )
  self.model.editor.apply_text_edit(
    splice.start,
    splice.delete_len,
    splice.inserted,
    self.model.next_timestamp,
  )
  self.model = refresh({
    ..self.model,
    text_view: new_text,
    next_timestamp: self.model.next_timestamp + 1,
    projection_dirty: true,
  })
}

///|
pub fn BenchmarkSession::deferred_text_input(
  self : BenchmarkSession,
  new_text : String,
) -> Unit {
  let (_, updated) = update(benchmark_dispatch, TextInput(new_text), self.model)
  self.model = updated
}

///|
pub fn BenchmarkSession::refresh_projection(self : BenchmarkSession) -> Unit {
  let (_, updated) = update(benchmark_dispatch, RefreshProjection, self.model)
  self.model = updated
}

///|
pub fn BenchmarkSession::deferred_full_cycle(
  self : BenchmarkSession,
  new_text : String,
) -> Unit {
  self.deferred_text_input(new_text)
  self.refresh_projection()
}

///|
pub fn BenchmarkSession::has_tree(self : BenchmarkSession) -> Bool {
  self.model.tree_state.tree is Some(_)
}

///|
pub fn BenchmarkSession::projection_dirty(self : BenchmarkSession) -> Bool {
  self.model.projection_dirty
}
