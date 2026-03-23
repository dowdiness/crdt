///|
/// Strongly connected components via Kosaraju's algorithm.
/// Returns components in reverse topological order of the component DAG.
/// SCC is an AdjacencyMap method because it requires transpose.
pub fn AdjacencyMap::scc(self : AdjacencyMap) -> Array[Array[Int]] {
  // Step 1: DFS on original graph, record finish order
  let visited : Map[Int, Bool] = Map::new()
  let finish_order : Array[Int] = []
  fn dfs1(v : Int) {
    if visited.get(v) == Some(true) {
      return
    }
    visited[v] = true
    match self.adjacency.get(v) {
      Some(succs) =>
        for i = 0; i < succs.length(); i = i + 1 {
          if visited.get(succs[i]) != Some(true) {
            dfs1(succs[i])
          }
        }
      None => ()
    }
    finish_order.push(v)
  }

  self.adjacency.each(fn(v, _) { dfs1(v) })
  // Step 2: Transpose the graph
  let transposed = self.transpose()
  // Step 3: DFS on transposed graph in reverse finish order
  let visited2 : Map[Int, Bool] = Map::new()
  let components : Array[Array[Int]] = []
  fn dfs2(v : Int, component : Array[Int]) {
    if visited2.get(v) == Some(true) {
      return
    }
    visited2[v] = true
    component.push(v)
    match transposed.adjacency.get(v) {
      Some(succs) =>
        for i = 0; i < succs.length(); i = i + 1 {
          if visited2.get(succs[i]) != Some(true) {
            dfs2(succs[i], component)
          }
        }
      None => ()
    }
  }

  // Process in reverse finish order
  for i = finish_order.length() - 1; i >= 0; i = i - 1 {
    let v = finish_order[i]
    if visited2.get(v) != Some(true) {
      let component : Array[Int] = []
      dfs2(v, component)
      components.push(component)
    }
  }
  components
}
