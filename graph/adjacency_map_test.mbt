///|
test "empty graph" {
  let g = @graph.AdjacencyMap::empty()
  assert_eq(g.vertex_count(), 0)
  assert_eq(g.edge_count(), 0)
}

///|
test "single vertex" {
  let g = @graph.AdjacencyMap::vertex(42)
  assert_eq(g.vertex_count(), 1)
  assert_eq(g.edge_count(), 0)
  assert_true(g.has_vertex(42))
  assert_true(not(g.has_vertex(0)))
}

///|
test "single edge" {
  let g = @graph.AdjacencyMap::edge(1, 2)
  assert_eq(g.vertex_count(), 2)
  assert_eq(g.edge_count(), 1)
  assert_true(g.has_vertex(1))
  assert_true(g.has_vertex(2))
  assert_true(g.has_edge(1, 2))
  assert_true(not(g.has_edge(2, 1)))
}

///|
test "from_edges" {
  let g = @graph.AdjacencyMap::from_edges([(1, 2), (2, 3), (1, 3)])
  assert_eq(g.vertex_count(), 3)
  assert_eq(g.edge_count(), 3)
  assert_true(g.has_edge(1, 2))
  assert_true(g.has_edge(2, 3))
  assert_true(g.has_edge(1, 3))
}

///|
test "overlay" {
  let a = @graph.AdjacencyMap::edge(1, 2)
  let b = @graph.AdjacencyMap::edge(3, 4)
  let g = a.overlay(b)
  assert_eq(g.vertex_count(), 4)
  assert_true(g.has_edge(1, 2))
  assert_true(g.has_edge(3, 4))
  assert_true(not(g.has_edge(1, 3)))
}

///|
test "connect" {
  let a = @graph.AdjacencyMap::vertex(1)
  let b = @graph.AdjacencyMap::vertex(2)
  let g = a.connect(b)
  assert_eq(g.vertex_count(), 2)
  assert_true(g.has_edge(1, 2))
  assert_true(not(g.has_edge(2, 1)))
}

///|
test "connect multiple" {
  let a = @graph.AdjacencyMap::from_edges([(1, 2)])
  let b = @graph.AdjacencyMap::from_edges([(3, 4)])
  let g = a.connect(b)
  assert_eq(g.vertex_count(), 4)
  assert_true(g.has_edge(1, 2))
  assert_true(g.has_edge(3, 4))
  assert_true(g.has_edge(1, 3))
  assert_true(g.has_edge(1, 4))
  assert_true(g.has_edge(2, 3))
  assert_true(g.has_edge(2, 4))
  assert_true(not(g.has_edge(3, 1)))
}

///|
test "transpose" {
  let g = @graph.AdjacencyMap::from_edges([(1, 2), (2, 3)])
  let t = g.transpose()
  assert_eq(t.vertex_count(), 3)
  assert_true(t.has_edge(2, 1))
  assert_true(t.has_edge(3, 2))
  assert_true(not(t.has_edge(1, 2)))
  assert_true(t.has_vertex(1))
  assert_true(t.has_vertex(2))
  assert_true(t.has_vertex(3))
}

///|
test "invariant: edge targets exist as keys" {
  let g = @graph.AdjacencyMap::edge(1, 2)
  assert_true(g.has_vertex(2))
  assert_eq(g.successors(2).length(), 0)
}

///|
test "vertex_list and edge_list" {
  let g = @graph.AdjacencyMap::from_edges([(1, 2), (2, 3)])
  let verts = g.vertex_list()
  assert_eq(verts.length(), 3)
  let edges = g.edge_list()
  assert_eq(edges.length(), 2)
}

///|
test "successors" {
  let g = @graph.AdjacencyMap::from_edges([(1, 2), (1, 3), (2, 3)])
  let s = g.successors(1)
  assert_eq(s.length(), 2)
  assert_true(@graph.array_contains(s, 2))
  assert_true(@graph.array_contains(s, 3))
}
