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
