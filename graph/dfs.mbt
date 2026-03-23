///|
/// DFS fold. Visits each reachable vertex exactly once.
/// f returns (new_accumulator, should_continue).
/// If should_continue is false, traversal stops early.
pub fn[G : DirectedGraph, Acc] dfs_fold(
  graph : G,
  start : Int,
  init : Acc,
  f : (Acc, Int) -> (Acc, Bool),
) -> Acc {
  let visited : Map[Int, Bool] = Map::new()
  let mut acc = init
  let mut cont = true
  fn dfs(v : Int) {
    if not(cont) {
      return
    }
    if visited.get(v) == Some(true) {
      return
    }
    visited[v] = true
    let result = f(acc, v)
    acc = result.0
    cont = result.1
    if not(cont) {
      return
    }
    G::for_each_successor(graph, v, fn(w) {
      if cont && visited.get(w) != Some(true) {
        dfs(w)
      }
    })
  }

  dfs(start)
  acc
}

///|
/// All vertices reachable from start, in DFS order.
pub fn[G : DirectedGraph] reachable(graph : G, start : Int) -> Array[Int] {
  dfs_fold(graph, start, [], fn(arr, v) {
    arr.push(v)
    (arr, true)
  })
}
