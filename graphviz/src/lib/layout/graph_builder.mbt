// Convert DOT AST to internal graph representation

///|
pub fn extract_graph(graph : @parser.Graph) -> InternalGraph {
  let nodes = collect_nodes(graph.statements)
  let edges = collect_edges(graph.statements, graph.directed)
  { nodes, edges, directed: graph.directed }
}

///|
///|
/// Extract label from attribute list, defaulting to node ID
fn extract_label(node_id : String, attrs : @parser.AttributeList?) -> String {
  match attrs {
    Some(attr_list) => {
      // Search for "label" attribute
      for attr in attr_list.attributes {
        if attr.key == "label" {
          return attr.value
        }
      }
      // No label found, use node ID
      node_id
    }
    None => node_id
  }
}

///|
fn collect_nodes(
  statements : Array[@parser.Statement],
) -> Map[String, NodeInfo] {
  let nodes : Map[String, NodeInfo] = Map::new()
  for stmt in statements {
    match stmt {
      @parser.NodeStmt(node_id, attrs) => {
        let label = extract_label(node_id.id, attrs)
        // Update node if it exists (might have been added from EdgeStmt without label)
        // or create new node with label
        match nodes.get(node_id.id) {
          Some(existing_node) => {
            // Update the existing node's label
            existing_node.label = label
          }
          None => {
            // Create new node
            nodes.set(node_id.id, {
              id: node_id.id,
              label,
              incoming: [],
              outgoing: [],
            })
          }
        }
      }
      @parser.EdgeStmt(start_node, edges, _attrs) => {
        // Add start node
        if not(nodes.contains(start_node.id)) {
          nodes.set(start_node.id, {
            id: start_node.id,
            label: start_node.id,
            incoming: [],
            outgoing: [],
          })
        }
        // Add all target nodes from edge chain
        for edge_pair in edges {
          let (_edge_op, target_node) = edge_pair
          if not(nodes.contains(target_node.id)) {
            nodes.set(target_node.id, {
              id: target_node.id,
              label: target_node.id,
              incoming: [],
              outgoing: [],
            })
          }
        }
      }
      @parser.Subgraph(subgraph) => {
        // Recursively collect nodes from subgraph
        let subgraph_nodes = collect_nodes(subgraph.statements)
        subgraph_nodes.each(fn(id, node_info) {
          if not(nodes.contains(id)) {
            nodes.set(id, node_info)
          }
        })
      }
      @parser.AttrStmt(_attr_type, _attr_list) => ()
      @parser.Assignment(_key, _value) => ()
    }
  }
  nodes
}

///|
fn collect_edges(
  statements : Array[@parser.Statement],
  directed : Bool,
) -> Array[Edge] {
  let edges : Array[Edge] = []
  for stmt in statements {
    match stmt {
      @parser.EdgeStmt(start_node, edge_list, _attrs) => {
        // Handle edge chains: a -> b -> c becomes [(a,b), (b,c)]
        let mut current = start_node.id
        for edge_pair in edge_list {
          let (edge_op, target_node) = edge_pair
          // Create edge
          edges.push({
            from: current,
            to: target_node.id,
            original_direction: Forward,
          })

          // For undirected graphs, create reverse edge too
          if not(directed) || edge_op == @parser.Undirected {
            edges.push({
              from: target_node.id,
              to: current,
              original_direction: Forward,
            })
          }

          // Move to next in chain
          current = target_node.id
        }
      }
      @parser.Subgraph(subgraph) => {
        // Recursively collect edges from subgraph
        let subgraph_edges = collect_edges(subgraph.statements, directed)
        for edge in subgraph_edges {
          edges.push(edge)
        }
      }
      @parser.NodeStmt(_node_id, _attrs) => ()
      @parser.AttrStmt(_attr_type, _attr_list) => ()
      @parser.Assignment(_key, _value) => ()
    }
  }
  edges
}

///|
pub fn build_adjacency_lists(graph : InternalGraph) -> InternalGraph {
  // Build incoming/outgoing lists for each node
  for edge in graph.edges {
    match graph.nodes.get(edge.from) {
      Some(from_node) => from_node.outgoing.push(edge.to)
      None => ()
    }
    match graph.nodes.get(edge.to) {
      Some(to_node) => to_node.incoming.push(edge.from)
      None => ()
    }
  }
  graph
}
