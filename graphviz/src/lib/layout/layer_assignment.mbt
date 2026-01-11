// Phase 2: Layer Assignment using topological sort

///|
pub fn assign_layers(graph : InternalGraph) -> Map[String, Int] {
  let sources = find_sources(graph)
  topological_layering(graph, sources)
}

///|
fn find_sources(graph : InternalGraph) -> Array[String] {
  let sources : Array[String] = []
  graph.nodes.each(fn(id, node_info) {
    if node_info.incoming.is_empty() {
      sources.push(id)
    }
  })
  sources
}

///|
fn topological_layering(
  graph : InternalGraph,
  sources : Array[String],
) -> Map[String, Int] {
  let layer_map : Map[String, Int] = Map::new()
  let in_degree : Map[String, Int] = Map::new()

  // Initialize in-degree for all nodes
  graph.nodes.each(fn(id, node_info) {
    in_degree.set(id, node_info.incoming.length())
  })

  // Initialize sources at layer 0
  let queue : Array[String] = []
  for source in sources {
    layer_map.set(source, 0)
    queue.push(source)
  }

  // Process nodes in topological order
  while not(queue.is_empty()) {
    let current = queue.pop().unwrap()
    let current_layer = layer_map.get(current).unwrap()

    // Process all outgoing neighbors
    match graph.nodes.get(current) {
      Some(node_info) =>
        for neighbor in node_info.outgoing {
          // Decrement in-degree
          let neighbor_degree = in_degree.get(neighbor).unwrap()
          in_degree.set(neighbor, neighbor_degree - 1)

          // Update neighbor's layer to max of all incoming layers + 1
          let new_layer = current_layer + 1
          match layer_map.get(neighbor) {
            Some(existing_layer) =>
              if new_layer > existing_layer {
                layer_map.set(neighbor, new_layer)
              }
            None => layer_map.set(neighbor, new_layer)
          }

          // If all incoming edges processed, add to queue
          if in_degree.get(neighbor).unwrap() == 0 {
            queue.push(neighbor)
          }
        }
      None => ()
    }
  }
  layer_map
}

///|
pub fn group_by_layer(layer_map : Map[String, Int]) -> Array[Array[String]] {
  // Find max layer
  let mut max_layer = 0
  layer_map.each(fn(_id, layer) { if layer > max_layer { max_layer = layer } })

  // Initialize layers array
  let layers : Array[Array[String]] = []
  for i = 0; i <= max_layer; i = i + 1 {
    layers.push([])
  }

  // Distribute nodes into layers
  layer_map.each(fn(id, layer) { layers[layer].push(id) })
  layers
}
