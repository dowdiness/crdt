///|
test "reachable linear" {
  let g = @graph.AdjacencyMap::from_edges([(1, 2), (2, 3), (3, 4)])
  let r = @graph.reachable(g, 1)
  assert_eq(r.length(), 4)
  assert_true(@graph.array_contains(r, 1))
  assert_true(@graph.array_contains(r, 2))
  assert_true(@graph.array_contains(r, 3))
  assert_true(@graph.array_contains(r, 4))
}

///|
test "reachable from middle" {
  let g = @graph.AdjacencyMap::from_edges([(1, 2), (2, 3), (3, 4)])
  let r = @graph.reachable(g, 3)
  assert_eq(r.length(), 2)
  assert_true(@graph.array_contains(r, 3))
  assert_true(@graph.array_contains(r, 4))
  assert_true(not(@graph.array_contains(r, 1)))
}

///|
test "reachable diamond" {
  let g = @graph.AdjacencyMap::from_edges([(1, 2), (1, 3), (2, 4), (3, 4)])
  let r = @graph.reachable(g, 1)
  assert_eq(r.length(), 4)
}

///|
test "reachable disconnected" {
  let g = @graph.AdjacencyMap::from_edges([(1, 2), (3, 4)])
  let r = @graph.reachable(g, 1)
  assert_eq(r.length(), 2)
  assert_true(@graph.array_contains(r, 1))
  assert_true(@graph.array_contains(r, 2))
  assert_true(not(@graph.array_contains(r, 3)))
}

///|
test "reachable single" {
  let g = @graph.AdjacencyMap::vertex(1)
  let r = @graph.reachable(g, 1)
  assert_eq(r.length(), 1)
  assert_eq(r[0], 1)
}

///|
test "dfs_fold early termination" {
  let g = @graph.AdjacencyMap::from_edges([(1, 2), (2, 3), (3, 4)])
  let mut count = 0
  let _ = @graph.dfs_fold(g, 1, 0, fn(acc, _v) {
    count = count + 1
    if count >= 2 {
      (acc + 1, false)
    } else {
      (acc + 1, true)
    }
  })
  assert_eq(count, 2)
}
