///|
/// Topological sort via Kahn's algorithm.
/// Returns None if graph contains a cycle.
pub fn[G : DirectedGraph] toposort(graph : G) -> Array[Int]? {
  let in_degree : Map[Int, Int] = Map::new()
  G::for_each_vertex(graph, fn(v) { in_degree[v] = 0 })
  G::for_each_vertex(graph, fn(v) {
    G::for_each_successor(graph, v, fn(w) {
      let d = match in_degree.get(w) {
        Some(n) => n
        None => 0
      }
      in_degree[w] = d + 1
    })
  })
  let queue : Array[Int] = []
  in_degree.each(fn(v, d) { if d == 0 { queue.push(v) } })
  let result : Array[Int] = []
  let mut head = 0
  while head < queue.length() {
    let v = queue[head]
    head = head + 1
    result.push(v)
    G::for_each_successor(graph, v, fn(w) {
      let d = match in_degree.get(w) {
        Some(n) => n
        None => 0
      }
      in_degree[w] = d - 1
      if d - 1 == 0 {
        queue.push(w)
      }
    })
  }
  let vc = G::vertex_count(graph)
  if result.length() == vc {
    Some(result)
  } else {
    None
  }
}

///|
/// Returns true if the graph contains a cycle.
pub fn[G : DirectedGraph] has_cycle(graph : G) -> Bool {
  toposort(graph) is None
}
