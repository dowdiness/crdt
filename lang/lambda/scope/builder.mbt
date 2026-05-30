///|
/// Pass 1: build a `NodeId -> parent NodeId` map by walking the registry's
/// ProjNode tree. Each node appears in exactly one parent's `children`
/// array, so the map is acyclic by construction. O(N).
pub fn build_parent_map(
  registry : Map[@core.NodeId, @core.ProjNode[@ast.Term]],
) -> Map[@core.NodeId, @core.NodeId] {
  let parents : Map[@core.NodeId, @core.NodeId] = {}
  for _id, node in registry {
    for child in node.children {
      parents[child.id()] = node.id()
    }
  }
  parents
}

///|
/// Mutable builder state accumulated across passes.
priv struct Builder {
  scopes : Array[Scope]
  decls : Array[Decl]
  refs : Array[Ref]
  node_scope : Map[@core.NodeId, ScopeId]
}

///|
fn Builder::new() -> Builder {
  { scopes: [], decls: [], refs: [], node_scope: {} }
}

///|
fn Builder::add_scope(self : Builder, parent : ScopeId?) -> ScopeId {
  let id = ScopeId(self.scopes.length())
  self.scopes.push({ id, parent, decl_ids: [], ref_ids: [] })
  id
}

///|
fn Builder::add_decl(
  self : Builder,
  scope : ScopeId,
  node_id : @core.NodeId,
  name : String,
  kind : DeclKind,
) -> DeclId {
  let ScopeId(si) = scope
  let id = DeclId(self.decls.length())
  self.decls.push({ id, node_id, name, scope, kind })
  self.scopes[si].decl_ids.push(id)
  id
}

///|
/// The registry's root is the node that is no other node's child.
fn root_node(
  registry : Map[@core.NodeId, @core.ProjNode[@ast.Term]],
) -> @core.ProjNode[@ast.Term] {
  let parents = build_parent_map(registry)
  let mut root : @core.ProjNode[@ast.Term]? = None
  for id, node in registry {
    if parents.get(id) is None {
      root = Some(node)
    }
  }
  root.unwrap()
}

///|
/// Pass 2: root module scope, ModuleDef decls (one per flat def), and a child
/// LamParam scope per Lam node. Records node→scope membership.
fn Builder::pass2(
  self : Builder,
  flat_proj : @lambda_proj.FlatProj,
  registry : Map[@core.NodeId, @core.ProjNode[@ast.Term]],
) -> Unit {
  let root_scope = self.add_scope(None)
  for i, def in flat_proj.defs {
    let (name, _init, _start, binder_id) = def
    let _ = self.add_decl(root_scope, binder_id, name, ModuleDef(def_index=i))
  }
  fn walk(node : @core.ProjNode[@ast.Term], current : ScopeId) -> Unit {
    self.node_scope[node.id()] = current
    match node.kind {
      @ast.Term::Lam(param, _) => {
        let lam_scope = self.add_scope(Some(current))
        let _ = self.add_decl(
          lam_scope, node.id(), param, LamParam(lam_id=node.id()),
        )
        for child in node.children {
          walk(child, lam_scope)
        }
      }
      _ =>
        for child in node.children {
          walk(child, current)
        }
    }
  }

  walk(root_node(registry), root_scope)
}

///|
/// Build the scope graph (Pass 2 only for now; Pass 3 added next task).
pub fn build(
  flat_proj : @lambda_proj.FlatProj,
  registry : Map[@core.NodeId, @core.ProjNode[@ast.Term]],
  source_map : @core.SourceMap,
) -> ScopeGraph {
  let _ = source_map // used in Pass 3
  let b = Builder::new()
  b.pass2(flat_proj, registry)
  { scopes: b.scopes, decls: b.decls, refs: b.refs }
}
