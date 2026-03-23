///|
/// DirectedGraph trait — the observation layer.
/// Vertices are always Int (fixed-type projection).
/// Iteration uses callback/CPS style to avoid associated types.
pub(open) trait DirectedGraph {
  vertex_count(Self) -> Int
  for_each_vertex(Self, (Int) -> Unit) -> Unit
  for_each_successor(Self, Int, (Int) -> Unit) -> Unit
}
