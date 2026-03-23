///|
test "foldg vertex count" {
  let g = @graph.Overlay(
    @graph.Vertex(1),
    @graph.Connect(@graph.Vertex(2), @graph.Vertex(3)),
  )
  let am = g.to_adjacency_map()
  assert_eq(am.vertex_count(), 3)
  assert_eq(am.edge_count(), 1)
  assert_true(am.has_edge(2, 3))
}

///|
test "to_adjacency_map preserves structure" {
  let g = @graph.Connect(
    @graph.Vertex(1),
    @graph.Overlay(@graph.Vertex(2), @graph.Vertex(3)),
  )
  let am = g.to_adjacency_map()
  assert_eq(am.vertex_count(), 3)
  assert_true(am.has_edge(1, 2))
  assert_true(am.has_edge(1, 3))
  assert_true(not(am.has_edge(2, 3)))
}

///|
test "gmap relabeling" {
  let g = @graph.Graph::path([1, 2, 3])
  let mapped = g.gmap(fn(v) { v * 10 })
  let am = mapped.to_adjacency_map()
  assert_true(am.has_vertex(10))
  assert_true(am.has_vertex(20))
  assert_true(am.has_vertex(30))
  assert_true(am.has_edge(10, 20))
  assert_true(am.has_edge(20, 30))
}

///|
test "bind vertex expansion" {
  let g = @graph.Graph::path([1, 2])
  let expanded = g.bind(fn(v) {
    if v == 1 {
      @graph.Connect(@graph.Vertex(10), @graph.Vertex(11))
    } else {
      @graph.Vertex(v)
    }
  })
  let am = expanded.to_adjacency_map()
  assert_true(am.has_edge(10, 11))
  assert_true(am.has_edge(10, 2))
  assert_true(am.has_edge(11, 2))
}

///|
test "induce filtering" {
  let g = @graph.Graph::path([1, 2, 3, 4])
  let filtered = g.induce(fn(v) { v != 2 })
  let am = filtered.to_adjacency_map()
  assert_true(am.has_vertex(1))
  assert_true(not(am.has_vertex(2)))
  assert_true(am.has_vertex(3))
  assert_true(am.has_vertex(4))
}

///|
test "path combinator" {
  let g = @graph.Graph::path([1, 2, 3])
  let am = g.to_adjacency_map()
  assert_eq(am.edge_count(), 2)
  assert_true(am.has_edge(1, 2))
  assert_true(am.has_edge(2, 3))
  assert_true(not(am.has_edge(1, 3)))
}

///|
test "clique combinator" {
  let g = @graph.Graph::clique([1, 2, 3])
  let am = g.to_adjacency_map()
  assert_eq(am.vertex_count(), 3)
  // clique via connect chain: connect(connect(1, 2), 3)
  // = overlay(connect(1,2), connect(1,3), connect(2,3))
  assert_true(am.has_edge(1, 2))
  assert_true(am.has_edge(1, 3))
  assert_true(am.has_edge(2, 3))
  assert_eq(am.edge_count(), 3)
}

///|
test "circuit combinator" {
  let g = @graph.Graph::circuit([1, 2, 3])
  let am = g.to_adjacency_map()
  assert_true(am.has_edge(1, 2))
  assert_true(am.has_edge(2, 3))
  assert_true(am.has_edge(3, 1))
  assert_eq(am.edge_count(), 3)
}

///|
test "star combinator" {
  let g = @graph.Graph::star(1, [2, 3, 4])
  let am = g.to_adjacency_map()
  assert_true(am.has_edge(1, 2))
  assert_true(am.has_edge(1, 3))
  assert_true(am.has_edge(1, 4))
  assert_eq(am.vertex_count(), 4)
}

///|
test "roundtrip path to adjacency_map" {
  let g = @graph.Graph::path([1, 2, 3])
  let am = g.to_adjacency_map()
  assert_true(am.has_edge(1, 2))
  assert_true(am.has_edge(2, 3))
  assert_true(not(am.has_edge(3, 1)))
}

///|
test "empty graph expression" {
  let g : @graph.Graph = @graph.Empty
  let am = g.to_adjacency_map()
  assert_eq(am.vertex_count(), 0)
  assert_eq(am.edge_count(), 0)
}

///|
test "remove_vertex" {
  let g = @graph.Graph::path([1, 2, 3])
  let removed = g.remove_vertex(2)
  let am = removed.to_adjacency_map()
  assert_true(am.has_vertex(1))
  assert_true(not(am.has_vertex(2)))
  assert_true(am.has_vertex(3))
}

///|
test "vertices combinator" {
  let g = @graph.Graph::vertices([1, 2, 3])
  let am = g.to_adjacency_map()
  assert_eq(am.vertex_count(), 3)
  assert_eq(am.edge_count(), 0)
}

///|
test "edges combinator" {
  let g = @graph.Graph::edges([(1, 2), (3, 4)])
  let am = g.to_adjacency_map()
  assert_true(am.has_edge(1, 2))
  assert_true(am.has_edge(3, 4))
  assert_eq(am.edge_count(), 2)
}
