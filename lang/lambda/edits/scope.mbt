///|
/// Identity-based references to a module definition, delegated to the canonical
/// scope graph query. The old name-based usage scan could over-match a later
/// shadowing definition's body; this helper first locates the graph-local
/// `DeclId` for the requested module def, then asks `@scope.references` for only
/// refs resolved to that declaration.
fn module_def_references(
  g : @scope.ScopeGraph,
  def_index : Int,
) -> Result[Array[NodeId], String] {
  for decl in g.decls {
    match decl.kind {
      @scope.DeclKind::ModuleDef(def_index=i) if i == def_index =>
        return Ok(@scope.references(g, decl.id))
      _ => ()
    }
  }
  Err("No scope declaration for module def index " + def_index.to_string())
}

///|
/// Recursively collect Var nodes matching the given name, stopping at shadowing Lam params.
fn collect_var_usages(
  node : ProjNode[@ast.Term],
  name : String,
  results : Array[NodeId],
) -> Unit {
  match node.kind {
    @ast.Term::Var(x) => if x == name { results.push(node.id()) }
    @ast.Term::Lam(param, _) =>
      if param != name {
        for child in node.children {
          collect_var_usages(child, name, results)
        }
      }
    _ =>
      for child in node.children {
        collect_var_usages(child, name, results)
      }
  }
}

///|
fn name_captured_at_node(
  g : @scope.ScopeGraph,
  node_id : NodeId,
  name : String,
) -> Bool {
  @scope.enclosing_env(g, node_id).contains(name)
}

///|
fn free_names_captured_at_node(
  g : @scope.ScopeGraph,
  node_id : NodeId,
  free_names : @immut/hashset.HashSet[String],
) -> Bool {
  let env = @scope.enclosing_env(g, node_id)
  let mut captured = false
  free_names.each(fn(v) { if env.contains(v) { captured = true } })
  captured
}

///|
fn free_names_captured_at_use_sites(
  g : @scope.ScopeGraph,
  node : ProjNode[@ast.Term],
  free_names : @immut/hashset.HashSet[String],
) -> Bool {
  let mut captured = false
  free_names.each(fn(v) {
    let var_ids : Array[NodeId] = []
    collect_var_usages(node, v, var_ids)
    if var_ids.any(fn(vid) { name_captured_at_node(g, vid, v) }) {
      captured = true
    }
  })
  captured
}

///|
/// Look up the FlatProj binding NodeId for a given init expression NodeId.
/// The UI selects init expression ProjNodes (children of Module); this function
/// maps that to the corresponding binding NodeId needed by binding-level operations.
pub fn find_binding_for_init(
  init_node_id : NodeId,
  flat_proj : FlatProj,
) -> (NodeId, Int)? {
  for i, def in flat_proj.defs {
    if def.1.id() == init_node_id {
      return Some((def.3, i))
    }
  }
  None
}
