// Projection accessor methods for SyncEditor.
// The lambda-specific memo builder lives in lang/lambda/flat/projection_memo.mbt.

///|
pub fn[T] SyncEditor::get_flat_proj(self : SyncEditor[T]) -> @lambda.FlatProj? {
  match self.proj_memo {
    Some(memo) => memo.get().proj
    None => None
  }
}

///|
/// Returns the cached ProjNode (converted from FlatProj once per invalidation).
pub fn[T] SyncEditor::get_proj_node(self : SyncEditor[T]) -> @proj.ProjNode[T]? {
  self.cached_proj_node.get()
}

///|
pub fn[T] SyncEditor::get_source_map(self : SyncEditor[T]) -> @proj.SourceMap {
  self.source_map_memo.get()
}

///|
pub fn[T] SyncEditor::get_node(
  self : SyncEditor[T],
  id : @proj.NodeId,
) -> @proj.ProjNode[T]? {
  self.registry_memo.get().get(id)
}

///|
pub fn[T] SyncEditor::node_at_position(
  self : SyncEditor[T],
  position : Int,
) -> @proj.NodeId? {
  self.source_map_memo.get().innermost_node_at(position)
}

///|
pub fn[T] SyncEditor::get_node_range(
  self : SyncEditor[T],
  id : @proj.NodeId,
) -> @loom_core.Range? {
  self.source_map_memo.get().get_range(id)
}
