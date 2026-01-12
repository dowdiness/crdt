// Phase 4: Coordinate Assignment

///|
pub fn assign_coordinates(
  layers : Array[Array[String]],
  nodes : Map[String, NodeInfo],
  config : LayoutConfig,
) -> Map[String, LayoutNode] {
  let positions : Map[String, LayoutNode] = Map::new()
  for layer_index = 0
      layer_index < layers.length()
      layer_index = layer_index + 1 {
    let layer = layers[layer_index]
    let y = compute_layer_y(layer_index, config)

    // Compute X positions for nodes in this layer
    let layer_positions = compute_node_positions_in_layer(
      layer, nodes, layer_index, y, config,
    )

    // Add to positions map
    for i = 0; i < layer_positions.length(); i = i + 1 {
      let (node_id, layout_node) = layer_positions[i]
      positions.set(node_id, layout_node)
    }
  }
  positions
}

///|
fn compute_layer_y(layer_index : Int, config : LayoutConfig) -> Double {
  layer_index.to_double() * (config.node_height + config.layer_spacing)
}

///|
fn compute_node_positions_in_layer(
  layer_nodes : Array[String],
  nodes : Map[String, NodeInfo],
  layer_index : Int,
  y : Double,
  config : LayoutConfig,
) -> Array[(String, LayoutNode)] {
  let positions : Array[(String, LayoutNode)] = []
  let n = layer_nodes.length()
  if n == 0 {
    return positions
  }

  // Calculate total width needed for this layer
  let total_width = (n - 1).to_double() * config.node_spacing +
    n.to_double() * config.node_width

  // Start X position (centered)
  let start_x = -total_width / 2.0

  // Position each node
  for i = 0; i < n; i = i + 1 {
    let node_id = layer_nodes[i]
    let x = start_x + i.to_double() * (config.node_width + config.node_spacing)

    // Get label from NodeInfo, default to node_id if not found
    let label = match nodes.get(node_id) {
      Some(node_info) => node_info.label
      None => node_id
    }

    let layout_node : LayoutNode = {
      id: node_id,
      label,
      position: { x, y },
      size: { width: config.node_width, height: config.node_height },
      layer: layer_index,
      order: i,
    }
    positions.push((node_id, layout_node))
  }
  positions
}
