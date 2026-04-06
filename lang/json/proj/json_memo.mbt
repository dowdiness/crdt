// Memo builder for JSON projection pipeline.
// Returns 3 memos (no FlatProj) for SyncEditor::new_generic.

///|
pub fn build_json_projection_memos(
  rt : @incr.Runtime,
  _source_text : @incr.Signal[String],
  syntax_tree : @incr.Signal[@seam.SyntaxNode?],
  _parser : @loom.ImperativeParser[@json.JsonValue],
) -> (
  @incr.Memo[ProjNode[@json.JsonValue]?],
  @incr.Memo[Map[NodeId, ProjNode[@json.JsonValue]]],
  @incr.Memo[SourceMap],
) {
  @core.build_projection_memos(
    rt,
    syntax_tree,
    syntax_to_proj_node,
    populate_token_spans,
    label="json",
  )
}
