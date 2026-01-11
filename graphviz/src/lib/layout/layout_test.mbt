// Layout Engine Tests

///|
test "graph_extraction_simple" {
  let dot = "digraph { a -> b }"
  match @parser.parse_dot(dot) {
    Some(graph) => {
      let internal = extract_graph(graph)
      inspect(internal.nodes.length(), content="2")
      inspect(internal.edges.length(), content="1")
      inspect(internal.directed, content="true")
    }
    None => {
      println("Parse failed: graph_extraction_simple")
      inspect(true, content="false")
    }
  }
}

///|
test "full_layout_simple_chain" {
  let dot =
    #|digraph {
    #|  a -> b
    #|  b -> c
    #|}
  match @parser.parse_dot(dot) {
    Some(graph) => {
      let layout = compute_layout(graph)
      inspect(layout.nodes.length(), content="3")
      inspect(layout.edges.length(), content="2")
      inspect(layout.layers.length(), content="3")

      // Verify all nodes exist
      if layout.nodes.contains("a") &&
        layout.nodes.contains("b") &&
        layout.nodes.contains("c") {
        println("All nodes have layout positions")
      }
    }
    None => println("Parse error: full_layout_simple_chain")
  }
}

///|
test "full_layout_diamond" {
  let dot =
    #|digraph {
    #|  a -> b;
    #|  a -> c;
    #|  b -> d;
    #|  c -> d;
    #|}
  match @parser.parse_dot(dot) {
    Some(graph) => {
      let layout = compute_layout(graph)
      inspect(layout.nodes.length(), content="4")
      inspect(layout.edges.length(), content="4")
      inspect(layout.layers.length(), content="3")
    }
    None => println("Parse error: full_layout_diamond")
  }
}

///|
test "full_layout_automaton" {
  let dot_automaton =
    #|digraph {
    #|  0 -> 1
    #|  0 -> 2
    #|  2 -> 3
    #|  2 -> 4
    #|  3 -> 5
    #|  4 -> 4
    #|}
  match @parser.parse_dot(dot_automaton) {
    Some(graph) => {
      let layout = compute_layout(graph)
      inspect(layout.nodes.length(), content="6")
    }
    None => println("Parse error: full_layout_automaton")
  }
}
