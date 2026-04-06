///| Reactive memo wrapper for Markdown projection.

///|
pub fn build_markdown_projection_memos(
  rt : @incr.Runtime,
  _source_text : @incr.Signal[String],
  syntax_tree : @incr.Signal[@seam.SyntaxNode?],
  _parser : @loom.ImperativeParser[@markdown.Block],
) -> (
  @incr.Memo[@core.ProjNode[@markdown.Block]?],
  @incr.Memo[Map[@core.NodeId, @core.ProjNode[@markdown.Block]]],
  @incr.Memo[@core.SourceMap],
) {
  @core.build_projection_memos(
    rt,
    syntax_tree,
    syntax_to_proj_node,
    populate_token_spans,
    label="markdown",
  )
}
