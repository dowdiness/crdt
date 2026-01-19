// Main Layout Orchestrator - Public API

///|
pub fn compute_layout(graph : @parser.Graph) -> GraphLayout {
  compute_layout_with_config(graph, LayoutConfig::default())
}

///|
pub fn compute_layout_with_config(
  graph : @parser.Graph,
  config : LayoutConfig,
) -> GraphLayout {
  // 1. Extract internal graph from AST
  let internal = extract_graph(graph)
  let internal_with_adj = build_adjacency_lists(internal)

  // 2. Phase 1: Remove cycles
  let acyclic = remove_cycles(internal_with_adj)

  // 3. Phase 2: Assign layers
  let layer_map = assign_layers(acyclic)
  let layers = group_by_layer(layer_map)

  // 4. Phase 3: Minimize crossings
  let ordered_layers = minimize_crossings(acyclic, layers, 24)

  // 5. Phase 4: Assign coordinates
  let node_positions = assign_coordinates(
    ordered_layers,
    internal_with_adj.nodes,
    config,
  )

  // 6. Phase 5: Route edges
  let edges = route_edges(acyclic, node_positions, config)

  // 7. Calculate bounds
  let bounds = calculate_bounds(node_positions)

  // 8. Return complete layout
  {
    nodes: node_positions,
    edges,
    bounds,
    layers: ordered_layers,
    directed: graph.directed,
  }
}

///|
fn calculate_bounds(nodes : Map[String, LayoutNode]) -> Bounds {
  let mut min_x = 0.0
  let mut min_y = 0.0
  let mut max_x = 0.0
  let mut max_y = 0.0
  let mut first = true
  nodes.each(fn(_id, node) {
    let node_min_x = node.position.x
    let node_min_y = node.position.y
    let node_max_x = node.position.x + node.size.width
    let node_max_y = node.position.y + node.size.height
    if first {
      min_x = node_min_x
      min_y = node_min_y
      max_x = node_max_x
      max_y = node_max_y
      first = false
    } else {
      if node_min_x < min_x {
        min_x = node_min_x
      }
      if node_min_y < min_y {
        min_y = node_min_y
      }
      if node_max_x > max_x {
        max_x = node_max_x
      }
      if node_max_y > max_y {
        max_y = node_max_y
      }
    }
  })
  { min_x, min_y, max_x, max_y }
}
