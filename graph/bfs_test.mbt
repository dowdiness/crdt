///|
test "bfs_fold diamond order" {
  let g = @graph.AdjacencyMap::from_edges([(1, 2), (1, 3), (2, 4), (3, 4)])
  let order : Array[Int] = @graph.bfs_fold(g, 1, [], fn(arr : Array[Int], v) {
    arr.push(v)
    (arr, true)
  })
  assert_eq(order.length(), 4)
  assert_eq(order[0], 1)
  assert_eq(order[3], 4)
  assert_true(
    (order[1] == 2 && order[2] == 3) || (order[1] == 3 && order[2] == 2),
  )
}

///|
test "bfs_fold reachability" {
  let g = @graph.AdjacencyMap::from_edges([(1, 2), (2, 3), (3, 4)])
  let visited : Array[Int] = @graph.bfs_fold(g, 1, [], fn(arr : Array[Int], v) {
    arr.push(v)
    (arr, true)
  })
  assert_eq(visited.length(), 4)
}

///|
test "bfs_fold early termination" {
  let g = @graph.AdjacencyMap::from_edges([(1, 2), (2, 3), (3, 4)])
  let mut count = 0
  let _ = @graph.bfs_fold(g, 1, 0, fn(acc, _v) {
    count = count + 1
    if count >= 2 {
      (acc + 1, false)
    } else {
      (acc + 1, true)
    }
  })
  assert_eq(count, 2)
}
