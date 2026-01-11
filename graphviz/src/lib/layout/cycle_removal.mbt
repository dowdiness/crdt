// Phase 1: Cycle Removal using DFS-based detection

///|
priv struct DFSState {
  visited : Map[String, Bool]
  on_stack : Map[String, Bool]
  reversed_edges : Array[(String, String)]
}

///|
pub fn remove_cycles(graph : InternalGraph) -> InternalGraph {
  let state : DFSState = {
    visited: Map::new(),
    on_stack: Map::new(),
    reversed_edges: [],
  }

  // Initialize visited map
  graph.nodes.each(fn(id, _node) { state.visited.set(id, false) })

  // Run DFS from each unvisited node
  graph.nodes.each(fn(id, _node) {
    match state.visited.get(id) {
      Some(false) => dfs_visit(id, graph, state)
      _ => ()
    }
  })

  // Reverse detected back edges
  reverse_edges(graph, state.reversed_edges)
}

///|
fn dfs_visit(node : String, graph : InternalGraph, state : DFSState) -> Unit {
  state.visited.set(node, true)
  state.on_stack.set(node, true)

  // Visit all outgoing neighbors
  match graph.nodes.get(node) {
    Some(node_info) =>
      for neighbor in node_info.outgoing {
        match state.visited.get(neighbor) {
          Some(false) =>
            // Tree edge - continue DFS
            dfs_visit(neighbor, graph, state)
          Some(true) =>
            // Already visited - check if it's a back edge
            match state.on_stack.get(neighbor) {
              Some(true) =>
                // Back edge detected - mark for reversal
                state.reversed_edges.push((node, neighbor))
              _ => ()
            }
          None => ()
        }
      }
    None => ()
  }
  state.on_stack.set(node, false)
}

///|
fn reverse_edges(
  graph : InternalGraph,
  to_reverse : Array[(String, String)],
) -> InternalGraph {
  let new_edges : Array[Edge] = []
  for edge in graph.edges {
    // Check if this edge should be reversed
    let mut should_reverse = false
    for pair in to_reverse {
      let (from, to) = pair
      if edge.from == from && edge.to == to {
        should_reverse = true
        break
      }
    }
    if should_reverse {
      // Reverse the edge
      new_edges.push({
        from: edge.to,
        to: edge.from,
        original_direction: Backward,
      })
    } else {
      // Keep edge as is
      new_edges.push(edge)
    }
  }

  // Rebuild adjacency lists with new edges
  build_adjacency_lists({
    nodes: graph.nodes,
    edges: new_edges,
    directed: graph.directed,
  })
}
