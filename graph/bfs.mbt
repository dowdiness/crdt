///|
/// BFS fold. Same signature as dfs_fold but breadth-first order.
pub fn[G : DirectedGraph, Acc] bfs_fold(
  graph : G,
  start : Int,
  init : Acc,
  f : (Acc, Int) -> (Acc, Bool),
) -> Acc {
  let visited : Map[Int, Bool] = Map::new()
  let queue : Array[Int] = [start]
  visited[start] = true
  let mut acc = init
  let mut head = 0
  while head < queue.length() {
    let v = queue[head]
    head = head + 1
    let result = f(acc, v)
    acc = result.0
    if not(result.1) {
      break
    }
    G::for_each_successor(graph, v, fn(w) {
      if visited.get(w) != Some(true) {
        visited[w] = true
        queue.push(w)
      }
    })
  }
  acc
}
