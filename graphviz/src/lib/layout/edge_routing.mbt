// Phase 5: Edge Routing

///|
pub fn route_edges(
  graph : InternalGraph,
  node_positions : Map[String, LayoutNode],
  _config : LayoutConfig,
) -> Array[LayoutEdge] {
  let edges : Array[LayoutEdge] = []
  for edge in graph.edges {
    match (node_positions.get(edge.from), node_positions.get(edge.to)) {
      (Some(from_node), Some(to_node)) => {
        let layout_edge = create_layout_edge(edge, from_node, to_node)
        edges.push(layout_edge)
      }
      _ => ()
    }
  }
  edges
}

///|
fn create_layout_edge(
  edge : Edge,
  from_node : LayoutNode,
  to_node : LayoutNode,
) -> LayoutEdge {
  let (source_point, target_point) = compute_edge_endpoints(from_node, to_node)
  {
    from: edge.from,
    to: edge.to,
    waypoints: [source_point, target_point],
    reversed: edge.original_direction == Backward,
  }
}

///|
fn compute_edge_endpoints(
  from_node : LayoutNode,
  to_node : LayoutNode,
) -> (Point, Point) {
  // Source point: bottom center of from_node
  let source_point : Point = {
    x: from_node.position.x + from_node.size.width / 2.0,
    y: from_node.position.y + from_node.size.height,
  }

  // Target point: top center of to_node
  let target_point : Point = {
    x: to_node.position.x + to_node.size.width / 2.0,
    y: to_node.position.y,
  }
  (source_point, target_point)
}
