// Tests for ViewNode JSON serialization and proj_to_view_node conversion.

///|
test "TokenSpan to_json produces object-based JSON" {
  let span = @protocol.TokenSpan(role="param", start=2, end=5)
  let json = span.to_json()
  let s = json.stringify()
  inspect(s, content="{\"role\":\"param\",\"start\":2,\"end\":5}")
}

///|
test "ViewNode to_json produces object-based JSON" {
  let node = @protocol.ViewNode(
    id=@core.NodeId::from_int(42),
    kind_tag="Lam",
    label="\u{03BB}x",
    text_range=(0, 5),
    css_class="Lam",
  )
  let json = node.to_json()
  let s = json.stringify()
  // Verify it's an object, not an array (derive(ToJson) would produce array-based)
  assert_true(s.has_prefix("{"))
  // Verify key fields are present
  assert_true(s.contains("\"id\":42"))
  assert_true(s.contains("\"kind_tag\":\"Lam\""))
  assert_true(s.contains("\"text\":null"))
  assert_true(s.contains("\"text_range\":[0,5]"))
  assert_true(s.contains("\"children\":[]"))
}

///|
test "proj_to_view_node converts a simple ProjNode tree" {
  let editor = @editor.SyncEditor::new_lambda("test")
  editor.set_text("\\x.x")
  let proj_node = editor.get_proj_node().unwrap()
  let source_map = editor.get_source_map()
  let view_node = @protocol.proj_to_view_node(proj_node, source_map)
  // Root should be Lam
  inspect(view_node.kind_tag, content="Lam")
  // Should have a child (the body Var)
  assert_true(view_node.children.length() > 0)
  // JSON serialization should work
  let json_str = view_node.to_json().stringify()
  assert_true(json_str.has_prefix("{"))
}

///|
test "proj_to_view_node node_count for 10 defs" {
  let editor = @editor.SyncEditor::new_lambda("test")
  let segments : Array[String] = []
  for i = 0; i < 10; i = i + 1 {
    segments.push("let f\{i} = \\x.x + \{i}")
  }
  segments.push("f0")
  editor.set_text(segments.join("\n"))
  let proj_node = editor.get_proj_node().unwrap()
  let source_map = editor.get_source_map()
  let view_node = @protocol.proj_to_view_node(proj_node, source_map)
  let count = view_node.node_count()
  // Reasonable node count for 10 defs with lambda/bop structure
  assert_true(count >= 30)
  assert_true(count <= 200)
}
