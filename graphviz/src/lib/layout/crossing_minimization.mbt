// Phase 3: Crossing Minimization using barycenter heuristic

///|
pub fn minimize_crossings(
  graph : InternalGraph,
  layers : Array[Array[String]],
  iterations : Int,
) -> Array[Array[String]] {
  let mut current_layers = copy_layers(layers)

  // Perform multiple sweeps (down and up)
  for _iter = 0; _iter < iterations; _iter = _iter + 1 {
    // Sweep down
    current_layers = sweep_down(graph, current_layers)
    // Sweep up
    current_layers = sweep_up(graph, current_layers)
  }
  current_layers
}

///|
fn copy_layers(layers : Array[Array[String]]) -> Array[Array[String]] {
  let new_layers : Array[Array[String]] = []
  for layer in layers {
    let new_layer : Array[String] = []
    for node in layer {
      new_layer.push(node)
    }
    new_layers.push(new_layer)
  }
  new_layers
}

///|
fn sweep_down(
  graph : InternalGraph,
  layers : Array[Array[String]],
) -> Array[Array[String]] {
  let new_layers = copy_layers(layers)

  // For each layer (except first), order based on previous layer
  for i = 1; i < new_layers.length(); i = i + 1 {
    let current_layer = new_layers[i]
    let previous_layer = new_layers[i - 1]

    // Compute barycenters for nodes in current layer based on previous layer
    let barycenters = compute_layer_barycenters(
      current_layer, previous_layer, graph, true,
    )

    // Sort current layer by barycenter
    new_layers[i] = sort_by_barycenter(current_layer, barycenters)
  }
  new_layers
}

///|
fn sweep_up(
  graph : InternalGraph,
  layers : Array[Array[String]],
) -> Array[Array[String]] {
  let new_layers = copy_layers(layers)

  // For each layer (except last), order based on next layer
  for i = new_layers.length() - 2; i >= 0; i = i - 1 {
    let current_layer = new_layers[i]
    let next_layer = new_layers[i + 1]

    // Compute barycenters for nodes in current layer based on next layer
    let barycenters = compute_layer_barycenters(
      current_layer, next_layer, graph, false,
    )

    // Sort current layer by barycenter
    new_layers[i] = sort_by_barycenter(current_layer, barycenters)
  }
  new_layers
}

///|
fn compute_layer_barycenters(
  current_layer : Array[String],
  adjacent_layer : Array[String],
  graph : InternalGraph,
  use_incoming : Bool,
) -> Map[String, Double] {
  let barycenters : Map[String, Double] = Map::new()
  for node in current_layer {
    let barycenter = compute_barycenter(
      node, adjacent_layer, graph, use_incoming,
    )
    barycenters.set(node, barycenter)
  }
  barycenters
}

///|
fn compute_barycenter(
  node : String,
  adjacent_layer : Array[String],
  graph : InternalGraph,
  use_incoming : Bool,
) -> Double {
  // Get connections (incoming or outgoing)
  let connections = match graph.nodes.get(node) {
    Some(node_info) =>
      if use_incoming {
        node_info.incoming
      } else {
        node_info.outgoing
      }
    None => []
  }
  if connections.is_empty() {
    // No connections - use middle position
    return adjacent_layer.length().to_double() / 2.0
  }

  // Find positions of connected nodes in adjacent layer
  let mut sum = 0.0
  let mut count = 0
  for connected_node in connections {
    // Find position of connected node in adjacent layer
    for i = 0; i < adjacent_layer.length(); i = i + 1 {
      if adjacent_layer[i] == connected_node {
        sum = sum + i.to_double()
        count = count + 1
        break
      }
    }
  }
  if count == 0 {
    return adjacent_layer.length().to_double() / 2.0
  }
  sum / count.to_double()
}

///|
fn sort_by_barycenter(
  layer : Array[String],
  barycenters : Map[String, Double],
) -> Array[String] {
  // Create array of (node, barycenter) pairs
  let pairs : Array[(String, Double)] = []
  for node in layer {
    let barycenter = barycenters.get(node).unwrap_or(0.0)
    pairs.push((node, barycenter))
  }

  // Sort by barycenter using insertion sort
  for i = 1; i < pairs.length(); i = i + 1 {
    let key = pairs[i]
    let mut j = i - 1
    while j >= 0 && pairs[j].1 > key.1 {
      pairs[j + 1] = pairs[j]
      j = j - 1
    }
    pairs[j + 1] = key
  }

  // Extract sorted nodes
  let sorted : Array[String] = []
  for pair in pairs {
    let (node, _barycenter) = pair
    sorted.push(node)
  }
  sorted
}
