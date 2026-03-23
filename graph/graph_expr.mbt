///|
pub(all) enum Graph {
  Empty
  Vertex(Int)
  Overlay(Graph, Graph)
  Connect(Graph, Graph)
}

///|
/// The catamorphism over Graph.
pub fn[B] foldg(
  graph : Graph,
  empty : B,
  vertex : (Int) -> B,
  overlay : (B, B) -> B,
  connect : (B, B) -> B,
) -> B {
  match graph {
    Empty => empty
    Vertex(v) => vertex(v)
    Overlay(a, b) =>
      overlay(
        foldg(a, empty, vertex, overlay, connect),
        foldg(b, empty, vertex, overlay, connect),
      )
    Connect(a, b) =>
      connect(
        foldg(a, empty, vertex, overlay, connect),
        foldg(b, empty, vertex, overlay, connect),
      )
  }
}

///|
/// Convert Graph expression to AdjacencyMap — the key bridge function.
pub fn Graph::to_adjacency_map(self : Graph) -> AdjacencyMap {
  foldg(
    self,
    AdjacencyMap::empty(),
    fn(v) { AdjacencyMap::vertex(v) },
    fn(a, b) { a.overlay(b) },
    fn(a, b) { a.connect(b) },
  )
}

///|
/// Vertex transformation.
pub fn Graph::gmap(self : Graph, f : (Int) -> Int) -> Graph {
  foldg(self, Empty, fn(v) { Vertex(f(v)) }, fn(a, b) { Overlay(a, b) }, fn(
    a,
    b,
  ) {
    Connect(a, b)
  })
}

///|
/// Monadic substitution — replace each vertex with a subgraph.
pub fn Graph::bind(self : Graph, f : (Int) -> Graph) -> Graph {
  foldg(self, Empty, f, fn(a, b) { Overlay(a, b) }, fn(a, b) { Connect(a, b) })
}

///|
/// Subgraph induced by a predicate.
pub fn Graph::induce(self : Graph, pred : (Int) -> Bool) -> Graph {
  self.bind(fn(v) { if pred(v) { Vertex(v) } else { Empty } })
}

///|
/// Remove a vertex.
pub fn Graph::remove_vertex(self : Graph, target : Int) -> Graph {
  self.induce(fn(v) { v != target })
}

///|
/// Construct from array of vertices (overlay of all).
pub fn Graph::vertices(vs : Array[Int]) -> Graph {
  if vs.length() == 0 {
    return Empty
  }
  let mut result : Graph = Vertex(vs[0])
  for i = 1; i < vs.length(); i = i + 1 {
    result = Overlay(result, Vertex(vs[i]))
  }
  result
}

///|
/// Construct from array of edges.
pub fn Graph::edges(es : Array[(Int, Int)]) -> Graph {
  if es.length() == 0 {
    return Empty
  }
  let mut result : Graph = Connect(Vertex(es[0].0), Vertex(es[0].1))
  for i = 1; i < es.length(); i = i + 1 {
    result = Overlay(result, Connect(Vertex(es[i].0), Vertex(es[i].1)))
  }
  result
}

///|
/// Complete graph on given vertices (all directed edges).
pub fn Graph::clique(vs : Array[Int]) -> Graph {
  if vs.length() == 0 {
    return Empty
  }
  let mut result : Graph = Vertex(vs[0])
  for i = 1; i < vs.length(); i = i + 1 {
    result = Connect(result, Vertex(vs[i]))
  }
  result
}

///|
/// Star graph: center connected to all satellites.
pub fn Graph::star(center : Int, satellites : Array[Int]) -> Graph {
  if satellites.length() == 0 {
    return Vertex(center)
  }
  Connect(Vertex(center), Graph::vertices(satellites))
}

///|
/// Path through given vertices.
pub fn Graph::path(vs : Array[Int]) -> Graph {
  if vs.length() == 0 {
    return Empty
  }
  if vs.length() == 1 {
    return Vertex(vs[0])
  }
  let mut result : Graph = Connect(Vertex(vs[0]), Vertex(vs[1]))
  for i = 1; i < vs.length() - 1; i = i + 1 {
    result = Overlay(result, Connect(Vertex(vs[i]), Vertex(vs[i + 1])))
  }
  result
}

///|
/// Circuit: path that closes back to the first vertex.
pub fn Graph::circuit(vs : Array[Int]) -> Graph {
  if vs.length() == 0 {
    return Empty
  }
  if vs.length() == 1 {
    return Connect(Vertex(vs[0]), Vertex(vs[0]))
  }
  let p = Graph::path(vs)
  Overlay(p, Connect(Vertex(vs[vs.length() - 1]), Vertex(vs[0])))
}

///|
pub impl GraphSym for Graph with empty() {
  Empty
}

///|
pub impl GraphSym for Graph with vertex(v) {
  Vertex(v)
}

///|
pub impl GraphSym for Graph with overlay(a, b) {
  Overlay(a, b)
}

///|
pub impl GraphSym for Graph with connect(a, b) {
  Connect(a, b)
}
