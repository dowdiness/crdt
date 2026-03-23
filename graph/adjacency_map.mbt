///|
pub struct AdjacencyMap {
  adjacency : Map[Int, Array[Int]]
}

///|
pub fn AdjacencyMap::empty() -> AdjacencyMap {
  { adjacency: Map::new() }
}

///|
pub fn AdjacencyMap::vertex(v : Int) -> AdjacencyMap {
  let m : Map[Int, Array[Int]] = Map::new()
  m[v] = []
  { adjacency: m }
}

///|
pub fn AdjacencyMap::edge(u : Int, v : Int) -> AdjacencyMap {
  let m : Map[Int, Array[Int]] = Map::new()
  m[u] = [v]
  if not(m.contains(u) && u == v) {
    if not(m.contains(v)) {
      m[v] = []
    }
  }
  { adjacency: m }
}

///|
pub fn AdjacencyMap::from_edges(edges : Array[(Int, Int)]) -> AdjacencyMap {
  let m : Map[Int, Array[Int]] = Map::new()
  for i = 0; i < edges.length(); i = i + 1 {
    let u = edges[i].0
    let v = edges[i].1
    match m.get(u) {
      Some(arr) => if not(array_contains(arr, v)) { arr.push(v) }
      None => m[u] = [v]
    }
    if not(m.contains(v)) {
      m[v] = []
    }
  }
  { adjacency: m }
}

///|
pub fn array_contains(arr : Array[Int], val : Int) -> Bool {
  for i = 0; i < arr.length(); i = i + 1 {
    if arr[i] == val {
      return true
    }
  }
  false
}

///|
pub fn AdjacencyMap::overlay(
  self : AdjacencyMap,
  other : AdjacencyMap,
) -> AdjacencyMap {
  let m : Map[Int, Array[Int]] = Map::new()
  self.adjacency.each(fn(k, v) { m[k] = v.copy() })
  other.adjacency.each(fn(k, v) {
    match m.get(k) {
      Some(existing) =>
        for i = 0; i < v.length(); i = i + 1 {
          if not(array_contains(existing, v[i])) {
            existing.push(v[i])
          }
        }
      None => m[k] = v.copy()
    }
  })
  { adjacency: m }
}

///|
pub fn AdjacencyMap::connect(
  self : AdjacencyMap,
  other : AdjacencyMap,
) -> AdjacencyMap {
  let base = self.overlay(other)
  let m = base.adjacency
  let other_vertices : Array[Int] = []
  other.adjacency.each(fn(k, _v) { other_vertices.push(k) })
  self.adjacency.each(fn(u, _v) {
    let current = match m.get(u) {
      Some(s) => s
      None => []
    }
    for i = 0; i < other_vertices.length(); i = i + 1 {
      if not(array_contains(current, other_vertices[i])) {
        current.push(other_vertices[i])
      }
    }
    m[u] = current
  })
  { adjacency: m }
}

///|
pub fn AdjacencyMap::vertex_list(self : AdjacencyMap) -> Array[Int] {
  let result : Array[Int] = []
  self.adjacency.each(fn(k, _v) { result.push(k) })
  result
}

///|
pub fn AdjacencyMap::edge_list(self : AdjacencyMap) -> Array[(Int, Int)] {
  let result : Array[(Int, Int)] = []
  self.adjacency.each(fn(u, succs) {
    for i = 0; i < succs.length(); i = i + 1 {
      result.push((u, succs[i]))
    }
  })
  result
}

///|
pub fn AdjacencyMap::successors(self : AdjacencyMap, v : Int) -> Array[Int] {
  match self.adjacency.get(v) {
    Some(s) => s.copy()
    None => []
  }
}

///|
pub fn AdjacencyMap::has_vertex(self : AdjacencyMap, v : Int) -> Bool {
  self.adjacency.contains(v)
}

///|
pub fn AdjacencyMap::has_edge(self : AdjacencyMap, u : Int, v : Int) -> Bool {
  match self.adjacency.get(u) {
    Some(s) => array_contains(s, v)
    None => false
  }
}

///|
pub fn AdjacencyMap::vertex_count(self : AdjacencyMap) -> Int {
  self.adjacency.length()
}

///|
pub fn AdjacencyMap::edge_count(self : AdjacencyMap) -> Int {
  let mut count = 0
  self.adjacency.each(fn(_k, v) { count = count + v.length() })
  count
}

///|
pub fn AdjacencyMap::transpose(self : AdjacencyMap) -> AdjacencyMap {
  let m : Map[Int, Array[Int]] = Map::new()
  self.adjacency.each(fn(k, _v) { if not(m.contains(k)) { m[k] = [] } })
  self.adjacency.each(fn(u, succs) {
    for i = 0; i < succs.length(); i = i + 1 {
      let v = succs[i]
      match m.get(v) {
        Some(arr) => if not(array_contains(arr, u)) { arr.push(u) }
        None => m[v] = [u]
      }
    }
  })
  { adjacency: m }
}

///|
pub impl DirectedGraph for AdjacencyMap with vertex_count(self) {
  self.adjacency.length()
}

///|
pub impl DirectedGraph for AdjacencyMap with for_each_vertex(self, f) {
  self.adjacency.each(fn(k, _v) { f(k) })
}

///|
pub impl DirectedGraph for AdjacencyMap with for_each_successor(self, v, f) {
  match self.adjacency.get(v) {
    Some(s) => s.each(fn(x) { f(x) })
    None => ()
  }
}
