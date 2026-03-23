///|
test "scc dag - each vertex is its own component" {
  let g = @graph.AdjacencyMap::from_edges([(1, 2), (2, 3), (3, 4)])
  let components = g.scc()
  assert_eq(components.length(), 4)
  // Each component has exactly one vertex
  for i = 0; i < components.length(); i = i + 1 {
    assert_eq(components[i].length(), 1)
  }
}

///|
test "scc single cycle" {
  let g = @graph.AdjacencyMap::from_edges([(1, 2), (2, 3), (3, 1)])
  let components = g.scc()
  assert_eq(components.length(), 1)
  assert_eq(components[0].length(), 3)
  assert_true(@graph.array_contains(components[0], 1))
  assert_true(@graph.array_contains(components[0], 2))
  assert_true(@graph.array_contains(components[0], 3))
}

///|
test "scc two components connected" {
  // {1→2→1} → {3→4→3}
  let g = @graph.AdjacencyMap::from_edges([
    (1, 2),
    (2, 1),
    (2, 3),
    (3, 4),
    (4, 3),
  ])
  let components = g.scc()
  assert_eq(components.length(), 2)
  // Find which component has vertex 1
  let mut comp1_idx = 0
  for i = 0; i < components.length(); i = i + 1 {
    if @graph.array_contains(components[i], 1) {
      comp1_idx = i
    }
  }
  let mut comp2_idx = 0
  for i = 0; i < components.length(); i = i + 1 {
    if @graph.array_contains(components[i], 3) {
      comp2_idx = i
    }
  }
  assert_eq(components[comp1_idx].length(), 2)
  assert_true(@graph.array_contains(components[comp1_idx], 1))
  assert_true(@graph.array_contains(components[comp1_idx], 2))
  assert_eq(components[comp2_idx].length(), 2)
  assert_true(@graph.array_contains(components[comp2_idx], 3))
  assert_true(@graph.array_contains(components[comp2_idx], 4))
}

///|
test "scc self loop" {
  let g = @graph.AdjacencyMap::from_edges([(1, 1)])
  let components = g.scc()
  assert_eq(components.length(), 1)
  assert_eq(components[0].length(), 1)
  assert_eq(components[0][0], 1)
}

///|
test "scc disconnected acyclic" {
  let g = @graph.AdjacencyMap::from_edges([(1, 2), (3, 4)])
  let components = g.scc()
  assert_eq(components.length(), 4)
}
