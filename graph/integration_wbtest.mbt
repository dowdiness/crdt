///|
/// A simple adjacency-list graph using Array[Array[Int]] for testing.
/// Proves that an external data structure can implement DirectedGraph
/// and use all algorithms without modification.
struct ArrayGraph {
  successors : Array[Array[Int]]
}

///|
impl DirectedGraph for ArrayGraph with vertex_count(self) {
  self.successors.length()
}

///|
impl DirectedGraph for ArrayGraph with for_each_vertex(self, f) {
  for i = 0; i < self.successors.length(); i = i + 1 {
    f(i)
  }
}

///|
impl DirectedGraph for ArrayGraph with for_each_successor(self, v, f) {
  if v >= 0 && v < self.successors.length() {
    let succs = self.successors[v]
    for i = 0; i < succs.length(); i = i + 1 {
      f(succs[i])
    }
  }
}

///|
test "external impl: reachable" {
  // 0 → 1 → 2 → 3
  let g : ArrayGraph = { successors: [[1], [2], [3], []] }
  let r = reachable(g, 0)
  assert_eq(r.length(), 4)
}

///|
test "external impl: toposort" {
  let g : ArrayGraph = { successors: [[1], [2], [3], []] }
  let result = toposort(g)
  assert_true(result is Some(_))
  match result {
    Some(order) => assert_eq(order.length(), 4)
    None => assert_true(false)
  }
}

///|
test "external impl: has_cycle" {
  // Acyclic
  let g : ArrayGraph = { successors: [[1], [2], [3], []] }
  assert_true(not(has_cycle(g)))
}

///|
test "external impl: has_cycle true" {
  // 0 → 1 → 2 → 0 (cycle)
  let g : ArrayGraph = { successors: [[1], [2], [0]] }
  assert_true(has_cycle(g))
}

///|
test "external impl: bfs_fold" {
  let g : ArrayGraph = { successors: [[1, 2], [3], [3], []] }
  let order : Array[Int] = bfs_fold(g, 0, [], fn(arr : Array[Int], v) {
    arr.push(v)
    (arr, true)
  })
  assert_eq(order.length(), 4)
  assert_eq(order[0], 0)
  // 3 should be last
  assert_eq(order[3], 3)
}

///|
test "external impl: dfs_fold" {
  let g : ArrayGraph = { successors: [[1], [2], [3], []] }
  let visited = dfs_fold(g, 0, [], fn(arr : Array[Int], v) {
    arr.push(v)
    (arr, true)
  })
  assert_eq(visited.length(), 4)
}
