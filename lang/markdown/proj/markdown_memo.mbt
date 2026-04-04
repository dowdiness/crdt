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
  let counter : Ref[Int] = Ref::new(0)
  let prev_proj_ref : Ref[@core.ProjNode[@markdown.Block]?] = Ref::new(None)
  let proj_memo : @incr.Memo[@core.ProjNode[@markdown.Block]?] = @incr.Memo::new_no_backdate(
    rt,
    fn() -> @core.ProjNode[@markdown.Block]? {
      match syntax_tree.get() {
        None => {
          prev_proj_ref.val = None
          None
        }
        Some(syntax_root) => {
          let new_proj = syntax_to_proj_node(syntax_root, counter)
          let result = match prev_proj_ref.val {
            Some(old) => @core.reconcile(old, new_proj, counter)
            None => new_proj
          }
          prev_proj_ref.val = Some(result)
          Some(result)
        }
      }
    },
    label="markdown_proj",
  )
  let registry_memo : @incr.Memo[
    Map[@core.NodeId, @core.ProjNode[@markdown.Block]],
  ] = @incr.Memo::new_no_backdate(
    rt,
    fn() -> Map[@core.NodeId, @core.ProjNode[@markdown.Block]] {
      let reg : Map[@core.NodeId, @core.ProjNode[@markdown.Block]] = {}
      match proj_memo.get() {
        Some(root) => @core.collect_registry(root, reg)
        None => ()
      }
      reg
    },
    label="markdown_registry",
  )
  let source_map_memo : @incr.Memo[@core.SourceMap] = @incr.Memo::new_no_backdate(
    rt,
    fn() -> @core.SourceMap {
      match (proj_memo.get(), syntax_tree.get()) {
        (Some(proj_root), Some(syntax_root)) => {
          let sm = @core.SourceMap::from_ast(proj_root)
          populate_token_spans(sm, syntax_root, proj_root)
          sm
        }
        _ => @core.SourceMap::new()
      }
    },
    label="markdown_source_map",
  )
  (proj_memo, registry_memo, source_map_memo)
}
