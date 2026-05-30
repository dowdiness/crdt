///|
/// Build (proj, flat_proj, registry, source_map) from source.
fn build_fixture(
  text : String,
) -> (
  @core.ProjNode[@ast.Term],
  @lambda_proj.FlatProj,
  Map[@core.NodeId, @core.ProjNode[@ast.Term]],
  @core.SourceMap,
) raise {
  let (proj, _errs) = @lambda_proj.parse_to_proj_node(text)
  let flat_proj = @lambda_proj.FlatProj::from_proj_node(proj)
  let source_map = @core.SourceMap::from_ast(proj)
  let registry : Map[@core.NodeId, @core.ProjNode[@ast.Term]] = {}
  @core.collect_registry(proj, registry)
  (proj, flat_proj, registry, source_map)
}

///|
/// Find the first Var node with the given name anywhere in the tree.
fn find_var_node(
  root : @core.ProjNode[@ast.Term],
  name : String,
) -> @core.NodeId {
  let mut found : @core.NodeId? = None
  fn walk(n : @core.ProjNode[@ast.Term]) -> Unit {
    if found is Some(_) {
      return
    }
    if n.kind is @ast.Term::Var(x) && x == name {
      found = Some(n.id())
      return
    }
    for c in n.children {
      walk(c)
    }
  }

  walk(root)
  found.unwrap()
}

///|
test "build: module defs become ModuleDef decls in root scope" {
  let (_proj, flat_proj, registry, source_map) = build_fixture(
    "let a = 1\nlet b = 2\nb",
  )
  let g = build(flat_proj, registry, source_map)
  inspect(g.decls.length(), content="2")
  guard g.decls[0].kind is ModuleDef(def_index=d0)
  inspect(d0, content="0")
  guard g.decls[1].kind is ModuleDef(def_index=d1)
  inspect(d1, content="1")
  let ScopeId(s0) = g.decls[0].scope
  inspect(s0, content="0")
}

///|
test "build_parent_map: child maps to parent" {
  // Hand-built tree: root(id=0) Lam with one child Var(id=1).
  let child = @core.ProjNode::new(@ast.Term::Var("x"), 0, 1, 1, [])
  let root = @core.ProjNode::new(
    @ast.Term::Lam("x", @ast.Term::Var("x")),
    0,
    5,
    0,
    [child],
  )
  let registry : Map[@core.NodeId, @core.ProjNode[@ast.Term]] = {}
  @core.collect_registry(root, registry)
  let parents = build_parent_map(registry)
  inspect(parents.get(@core.NodeId::from_int(1)) is Some(_), content="true")
  guard parents.get(@core.NodeId::from_int(1)) is Some(p)
  inspect(p == @core.NodeId::from_int(0), content="true")
  inspect(parents.get(@core.NodeId::from_int(0)) is None, content="true")
}
