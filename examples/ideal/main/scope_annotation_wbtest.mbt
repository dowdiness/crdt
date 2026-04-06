// Whitebox tests for ScopeAnnotation and scope_map utilities.

///|
test "color_index is stable across calls" {
  let idx1 = binder_color_index("x")
  let idx2 = binder_color_index("x")
  inspect(idx1 == idx2, content="true")
  let idx3 = binder_color_index("add")
  inspect(idx1 >= 0 && idx1 < 8, content="true")
  inspect(idx3 >= 0 && idx3 < 8, content="true")
}

///|
test "compute_highlight_set for variable returns binder + usages" {
  let scope_map : Map[@proj.NodeId, ScopeAnnotation] = {}
  let var_id = @proj.NodeId::from_int(10)
  let binder_id = @proj.NodeId::from_int(1)
  let usage1 = @proj.NodeId::from_int(10)
  let usage2 = @proj.NodeId::from_int(20)
  scope_map[var_id] = {
    binder_id: Some(binder_id),
    is_definition: false,
    color_index: 0,
    usage_ids: [],
  }
  scope_map[binder_id] = {
    binder_id: Some(binder_id),
    is_definition: true,
    color_index: 0,
    usage_ids: [usage1, usage2],
  }
  let hs = compute_highlight_set(var_id, scope_map)
  inspect(hs.contains(binder_id), content="true")
  inspect(hs.contains(usage1), content="true")
  inspect(hs.contains(usage2), content="true")
}

///|
test "compute_highlight_set for non-identifier returns empty set" {
  let scope_map : Map[@proj.NodeId, ScopeAnnotation] = {}
  let unknown_id = @proj.NodeId::from_int(99)
  let hs = compute_highlight_set(unknown_id, scope_map)
  inspect(hs.length(), content="0")
}

///|
test "clicking f does not highlight apply var (no module/lambda ID collision)" {
  let editor = @editor.SyncEditor::new_lambda("test")
  editor.set_text(
    "let id = \\x. { x }\nlet apply = \\f. \\x. { f x }\napply id 42",
  )
  let scope_map = build_scope_map(editor)
  let proj_root = editor.get_proj_node().unwrap()
  let f_var_id = find_var_node_id(proj_root, "f")
  let apply_var_id = find_var_node_id(proj_root, "apply")
  // f should resolve to a Lam binder
  let f_ann = scope_map.get(f_var_id).unwrap()
  inspect(f_ann.binder_id is None, content="false")
  // apply should have binder_id=None (module-bound, no link to init node)
  let apply_ann = scope_map.get(apply_var_id).unwrap()
  inspect(apply_ann.binder_id is None, content="true")
  // Highlight set for f should NOT contain apply_var_id
  let hs = compute_highlight_set(f_var_id, scope_map)
  inspect(hs.contains(f_var_id), content="true")
  inspect(hs.contains(apply_var_id), content="false")
}

///|
fn find_var_node_id(
  node : @canopy_core.ProjNode[@ast.Term],
  name : String,
) -> @proj.NodeId {
  match node.kind {
    Var(n) => if n == name { return node.id() }
    _ => ()
  }
  for child in node.children {
    let result = find_var_node_id(child, name)
    if result != @proj.NodeId::from_int(-1) {
      return result
    }
  }
  @proj.NodeId::from_int(-1)
}
