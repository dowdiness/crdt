///| Extract token spans from the Markdown CST into the SourceMap.
///
/// Uses `find_token(raw_kind)` because `children()` returns only child nodes,
/// not tokens.

///|
pub fn populate_token_spans(
  source_map : @core.SourceMap,
  syntax_root : @seam.SyntaxNode,
  proj_root : @core.ProjNode[@markdown.Block],
) -> Unit {
  populate_block(source_map, syntax_root, proj_root)
}

///|
fn set_span(
  source_map : @core.SourceMap,
  syntax_node : @seam.SyntaxNode,
  proj_id : @core.NodeId,
  role : String,
  kind : @markdown.SyntaxKind,
) -> Unit {
  match syntax_node.find_token(kind.to_raw()) {
    Some(tok) =>
      source_map.set_token_span(
        proj_id,
        role,
        @loomcore.Range::new(tok.start(), tok.end()),
      )
    None => ()
  }
}

///|
fn populate_block(
  source_map : @core.SourceMap,
  syntax_node : @seam.SyntaxNode,
  proj_node : @core.ProjNode[@markdown.Block],
) -> Unit {
  let id = proj_node.id()
  match proj_node.kind {
    Document(_) => {
      let syntax_children = collect_block_children(syntax_node)
      let len = proj_node.children.length().min(syntax_children.length())
      for i in 0..<len {
        populate_block(source_map, syntax_children[i], proj_node.children[i])
      }
    }
    Heading(_, _) => {
      set_span(source_map, syntax_node, id, "marker", HeadingMarkerToken)
      set_span(source_map, syntax_node, id, "text", TextToken)
    }
    Paragraph(_) | ListItem(_) =>
      set_span(source_map, syntax_node, id, "text", TextToken)
    UnorderedList(_) => {
      let syntax_children = collect_syntax_children(
        syntax_node,
        @markdown.SyntaxKind::ListItemNode,
      )
      let len = proj_node.children.length().min(syntax_children.length())
      for i in 0..<len {
        populate_block(source_map, syntax_children[i], proj_node.children[i])
      }
    }
    CodeBlock(_, _) => {
      set_span(source_map, syntax_node, id, "fence_open", CodeFenceOpenToken)
      set_span(source_map, syntax_node, id, "code", CodeTextToken)
      set_span(source_map, syntax_node, id, "fence_close", CodeFenceCloseToken)
    }
    Error(_) => ()
  }
}

///|
fn collect_block_children(node : @seam.SyntaxNode) -> Array[@seam.SyntaxNode] {
  let result : Array[@seam.SyntaxNode] = []
  for child in node.children() {
    if is_block_node(@markdown.SyntaxKind::from_raw(child.kind())) {
      result.push(child)
    }
  }
  result
}

///|
fn collect_syntax_children(
  node : @seam.SyntaxNode,
  kind : @markdown.SyntaxKind,
) -> Array[@seam.SyntaxNode] {
  let result : Array[@seam.SyntaxNode] = []
  for child in node.children() {
    if @markdown.SyntaxKind::from_raw(child.kind()) == kind {
      result.push(child)
    }
  }
  result
}
