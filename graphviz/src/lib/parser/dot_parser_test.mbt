// Comprehensive DOT Parser Tests

// Basic graph parsing tests

///|
test "parse_simple_undirected_graph" {
  let input = "graph { }"
  match parse_dot(input) {
    Some(graph) => {
      assert_eq(graph.strict, false)
      assert_eq(graph.directed, false)
      assert_eq(graph.id, None)
      assert_eq(graph.statements.length(), 0)
    }
    None => abort("Failed to parse simple graph")
  }
}

///|
test "parse_simple_directed_graph" {
  let input = "digraph { }"
  match parse_dot(input) {
    Some(graph) => {
      assert_eq(graph.strict, false)
      assert_eq(graph.directed, true)
      assert_eq(graph.id, None)
      assert_eq(graph.statements.length(), 0)
    }
    None => abort("Failed to parse simple digraph")
  }
}

///|
test "parse_graph_with_id" {
  let input = "graph MyGraph { }"
  match parse_dot(input) {
    Some(graph) => {
      assert_eq(graph.id, Some("MyGraph"))
      assert_eq(graph.directed, false)
      assert_eq(graph.statements.length(), 0)
    }
    None => abort("Failed to parse graph with id")
  }
}

///|
test "parse_strict_graph" {
  let input = "strict graph { }"
  match parse_dot(input) {
    Some(graph) => {
      assert_eq(graph.strict, true)
      assert_eq(graph.directed, false)
    }
    None => abort("Failed to parse strict graph")
  }
}

///|
test "parse_strict_digraph_with_id" {
  let input = "strict digraph G { }"
  match parse_dot(input) {
    Some(graph) => {
      assert_eq(graph.strict, true)
      assert_eq(graph.directed, true)
      assert_eq(graph.id, Some("G"))
    }
    None => abort("Failed to parse strict digraph with id")
  }
}

// Node statement tests

///|
test "parse_simple_node" {
  let input = "graph { a }"
  match parse_dot(input) {
    Some(graph) => {
      assert_eq(graph.statements.length(), 1)
      match graph.statements[0] {
        NodeStmt(node_id, attr_list) => {
          assert_eq(node_id.id, "a")
          assert_eq(node_id.port, None)
          assert_eq(attr_list, None)
        }
        _ => abort("Expected NodeStmt")
      }
    }
    None => abort("Failed to parse node")
  }
}

///|
test "parse_node_with_attributes" {
  let input = "graph { a [color=red] }"
  match parse_dot(input) {
    Some(graph) => {
      assert_eq(graph.statements.length(), 1)
      match graph.statements[0] {
        NodeStmt(node_id, attr_list) => {
          assert_eq(node_id.id, "a")
          match attr_list {
            Some(attrs) => {
              assert_eq(attrs.attributes.length(), 1)
              assert_eq(attrs.attributes[0].key, "color")
              assert_eq(attrs.attributes[0].value, "red")
            }
            None => abort("Expected attribute list")
          }
        }
        _ => abort("Expected NodeStmt")
      }
    }
    None => abort("Failed to parse node with attributes")
  }
}

///|
test "parse_node_with_multiple_attributes" {
  let input = "graph { a [color=red, shape=box, style=filled] }"
  match parse_dot(input) {
    Some(graph) => {
      assert_eq(graph.statements.length(), 1)
      match graph.statements[0] {
        NodeStmt(_, attr_list) =>
          match attr_list {
            Some(attrs) => assert_eq(attrs.attributes.length(), 3)
            None => abort("Expected attribute list")
          }
        _ => abort("Expected NodeStmt")
      }
    }
    None => abort("Failed to parse node with multiple attributes")
  }
}

// Edge statement tests

///|
test "parse_simple_undirected_edge" {
  let input = "graph { a -- b }"
  match parse_dot(input) {
    Some(graph) => {
      assert_eq(graph.statements.length(), 1)
      match graph.statements[0] {
        EdgeStmt(start, edges, attr_list) => {
          assert_eq(start.id, "a")
          assert_eq(edges.length(), 1)
          assert_eq(attr_list, None)
        }
        _ => abort("Expected EdgeStmt")
      }
    }
    None => abort("Failed to parse undirected edge")
  }
}

///|
test "parse_simple_directed_edge" {
  let input = "digraph { a -> b }"
  match parse_dot(input) {
    Some(graph) => {
      assert_eq(graph.statements.length(), 1)
      match graph.statements[0] {
        EdgeStmt(start, edges, _) => {
          assert_eq(start.id, "a")
          assert_eq(edges.length(), 1)
        }
        _ => abort("Expected EdgeStmt")
      }
    }
    None => abort("Failed to parse directed edge")
  }
}

///|
test "parse_edge_with_attributes" {
  let input = "digraph { a -> b [color=blue, weight=2] }"
  match parse_dot(input) {
    Some(graph) =>
      match graph.statements[0] {
        EdgeStmt(_, _, attr_list) =>
          match attr_list {
            Some(attrs) => assert_eq(attrs.attributes.length(), 2)
            None => abort("Expected attribute list")
          }
        _ => abort("Expected EdgeStmt")
      }
    None => abort("Failed to parse edge with attributes")
  }
}

///|
test "parse_edge_chain" {
  let input = "digraph { a -> b; b -> c }"
  match parse_dot(input) {
    Some(graph) => {
      assert_eq(graph.statements.length(), 2)
      match graph.statements[0] {
        EdgeStmt(start, edges, _) => {
          assert_eq(start.id, "a")
          assert_eq(edges.length(), 1)
        }
        _ => abort("Expected EdgeStmt")
      }
    }
    None => abort("Failed to parse edge chain")
  }
}

// Port specification tests

///|
test "parse_node_with_port" {
  let input = "digraph { a:port1 }"
  match parse_dot(input) {
    Some(graph) => {
      assert_eq(graph.statements.length(), 1)
      match graph.statements[0] {
        NodeStmt(node_id, _) => {
          assert_eq(node_id.id, "a")
          match node_id.port {
            Some(port) => {
              assert_eq(port.id, Some("port1"))
              assert_eq(port.compass, None)
            }
            None => abort("Expected port")
          }
        }
        _ => abort("Expected NodeStmt")
      }
    }
    None => abort("Failed to parse node with port")
  }
}

///|
test "parse_node_with_port_and_compass" {
  let input = "digraph { a:port:ne }"
  match parse_dot(input) {
    Some(graph) => {
      assert_eq(graph.statements.length(), 1)
      match graph.statements[0] {
        NodeStmt(node_id, _) =>
          match node_id.port {
            Some(port) => {
              assert_eq(port.id, Some("port"))
              match port.compass {
                Some(compass) => assert_eq(compass, NE)
                None => abort("Expected compass point")
              }
            }
            None => abort("Expected port")
          }
        _ => abort("Expected NodeStmt")
      }
    }
    None => abort("Failed to parse node with port and compass")
  }
}

///|
test "parse_edge_with_ports" {
  let input = "digraph { a:out -> b:in }"
  match parse_dot(input) {
    Some(graph) =>
      match graph.statements[0] {
        EdgeStmt(start, _edges, _) => {
          assert_eq(start.id, "a")
          match start.port {
            Some(port) => assert_eq(port.id, Some("out"))
            None => abort("Expected port on start node")
          }
        }
        _ => abort("Expected EdgeStmt")
      }
    None => abort("Failed to parse edge with ports")
  }
}

// Compass point tests

///|
test "parse_all_compass_points" {
  let compass_tests = [
    ("n", @parser.N),
    ("ne", @parser.NE),
    ("e", @parser.E),
    ("se", @parser.SE),
    ("s", @parser.S),
    ("sw", @parser.SW),
    ("w", @parser.W),
    ("nw", @parser.NW),
    ("c", @parser.C),
    ("_", @parser.Underscore),
  ]
  for point in compass_tests {
    let (name, expected) = point
    let input = "digraph { a:p:" + name + " }"
    match parse_dot(input) {
      Some(graph) =>
        match graph.statements[0] {
          NodeStmt(node_id, _) =>
            match node_id.port {
              Some(port) => assert_eq(port.compass, Some(expected))
              None => abort("Expected port")
            }
          _ => abort("Expected NodeStmt")
        }
      None => abort("Failed to parse compass point " + name)
    }
  }
}

// Attribute statement tests

///|
test "parse_graph_attribute" {
  let input = "digraph { graph [rankdir=LR] }"
  match parse_dot(input) {
    Some(graph) => {
      assert_eq(graph.statements.length(), 1)
      match graph.statements[0] {
        AttrStmt(attr_type, attr_list) => {
          assert_eq(attr_type, "graph")
          assert_eq(attr_list.attributes.length(), 1)
        }
        _ => abort("Expected AttrStmt")
      }
    }
    None => abort("Failed to parse graph attribute")
  }
}

///|
test "parse_node_attribute" {
  let input = "digraph { node [shape=box, style=filled] }"
  match parse_dot(input) {
    Some(graph) =>
      match graph.statements[0] {
        AttrStmt(attr_type, attr_list) => {
          assert_eq(attr_type, "node")
          assert_eq(attr_list.attributes.length(), 2)
        }
        _ => abort("Expected AttrStmt")
      }
    None => abort("Failed to parse node attribute")
  }
}

///|
test "parse_edge_attribute" {
  let input = "digraph { edge [color=red, penwidth=2] }"
  match parse_dot(input) {
    Some(graph) =>
      match graph.statements[0] {
        AttrStmt(attr_type, attr_list) => {
          assert_eq(attr_type, "edge")
          assert_eq(attr_list.attributes.length(), 2)
        }
        _ => abort("Expected AttrStmt")
      }
    None => abort("Failed to parse edge attribute")
  }
}

// Assignment statement tests

///|
test "parse_assignment" {
  let input = "digraph { rankdir = LR }"
  match parse_dot(input) {
    Some(graph) => {
      assert_eq(graph.statements.length(), 1)
      match graph.statements[0] {
        Assignment(key, value) => {
          assert_eq(key, "rankdir")
          assert_eq(value, "LR")
        }
        _ => abort("Expected Assignment")
      }
    }
    None => abort("Failed to parse assignment")
  }
}

// Subgraph tests

///|
test "parse_subgraph" {
  let input = "digraph { subgraph { a } }"
  match parse_dot(input) {
    Some(graph) => {
      assert_eq(graph.statements.length(), 1)
      match graph.statements[0] {
        Subgraph(subgraph) => {
          assert_eq(subgraph.id, None)
          assert_eq(subgraph.statements.length(), 1)
        }
        _ => abort("Expected Subgraph")
      }
    }
    None => abort("Failed to parse subgraph")
  }
}

///|
test "parse_named_subgraph" {
  let input = "digraph { subgraph cluster_0 { a } }"
  match parse_dot(input) {
    Some(graph) =>
      match graph.statements[0] {
        Subgraph(subgraph) => {
          assert_eq(subgraph.id, Some("cluster_0"))
          assert_eq(subgraph.statements.length(), 1)
        }
        _ => abort("Expected Subgraph")
      }
    None => abort("Failed to parse named subgraph")
  }
}

///|
test "parse_nested_subgraphs" {
  let input = "digraph { subgraph { subgraph { a } } }"
  match parse_dot(input) {
    Some(graph) => {
      assert_eq(graph.statements.length(), 1)
      match graph.statements[0] {
        Subgraph(outer) => {
          assert_eq(outer.statements.length(), 1)
          match outer.statements[0] {
            Subgraph(inner) => assert_eq(inner.statements.length(), 1)
            _ => abort("Expected nested subgraph")
          }
        }
        _ => abort("Expected Subgraph")
      }
    }
    None => abort("Failed to parse nested subgraphs")
  }
}

// Complex graph tests

///|
test "parse_complex_digraph" {
  let input =
    #|digraph G {
    #|  graph [rankdir=LR];
    #|  node [shape=box];
    #|  a [color=red];
    #|  b [color=blue];
    #|  a -> b [label=edge1];
    #|  b -> c;
    #|}
  match parse_dot(input) {
    Some(graph) => {
      assert_eq(graph.id, Some("G"))
      assert_eq(graph.directed, true)
      assert_eq(graph.statements.length(), 6)
    }
    None => abort("Failed to parse complex digraph")
  }
}

///|
test "parse_graph_with_multiple_edges" {
  let input = "graph { a -- b; b -- c; c -- d }"
  match parse_dot(input) {
    Some(graph) => assert_eq(graph.statements.length(), 3)
    None => abort("Failed to parse multiple edges")
  }
}

///|
test "parse_optional_semicolons" {
  let input = "digraph { a b c }"
  match parse_dot(input) {
    Some(graph) => assert_eq(graph.statements.length(), 3)
    None => abort("Failed to parse optional semicolons")
  }
}

///|
test "parse_mixed_statements" {
  let input =
    #|digraph {
    #|  a
    #|  a -> b
    #|  b [color=red]
    #|}
  match parse_dot(input) {
    Some(graph) => assert_eq(graph.statements.length(), 3)
    None => abort("Failed to parse mixed statements")
  }
}

// Real-world examples

///|
test "parse_automaton_graph" {
  let dot_automaton =
    #|digraph {
    #|  graph [rankdir=LR];
    #|  node [shape=record];
    #|  0 [label="0 | [&bull; S, $]"];
    #|  1 [label="1 | [S &bull;, $]"];
    #|  2 [label="2 | [S &rarr; a &bull; S b, $]"];
    #|  0 -> 1 [label=S];
    #|  0 -> 2 [label=a];
    #|  2 -> 1 [label=b];
    #|}
  match parse_dot(dot_automaton) {
    Some(graph) => {
      assert_eq(graph.directed, true)
      assert_true(graph.statements.length() >= 6)
    }
    None => abort("Failed to parse automaton graph")
  }
}

///|
test "parse_state_machine" {
  let input =
    #|digraph finite_state_machine {
    #|  rankdir=LR;
    #|  size="8,5"
    #|  node [shape = doublecircle]; S0 S1 S2;
    #|  node [shape = circle];
    #|  S0 -> S1 [ label = "a" ];
    #|  S1 -> S2 [ label = "a" ];
    #|  S0 -> S0 [ label = "b" ];
    #|}
  match parse_dot(input) {
    Some(graph) => {
      assert_eq(graph.id, Some("finite_state_machine"))
      assert_eq(graph.directed, true)
    }
    None => abort("Failed to parse state machine")
  }
}

///|
test "parse_record_shaped_node" {
  let input = "digraph { a [shape=record, label=\"field1|field2\"] }"
  match parse_dot(input) {
    Some(graph) =>
      match graph.statements[0] {
        NodeStmt(_, attr_list) =>
          match attr_list {
            Some(attrs) => assert_eq(attrs.attributes.length(), 2)
            None => abort("Expected attributes")
          }
        _ => abort("Expected NodeStmt")
      }
    None => abort("Failed to parse record shaped node")
  }
}

// Whitespace and comment tests

///|
test "parse_with_extra_whitespace" {
  let input = "digraph   {   a  ->  b   }"
  match parse_dot(input) {
    Some(graph) => assert_eq(graph.statements.length(), 1)
    None => abort("Failed to parse with extra whitespace")
  }
}

///|
test "parse_with_newlines" {
  let input =
    #|digraph {
    #|  a ->
    #|    b
    #|}
  match parse_dot(input) {
    Some(graph) => assert_eq(graph.statements.length(), 1)
    None => abort("Failed to parse with newlines")
  }
}

///|
test "parse_with_line_comments" {
  let input =
    #|digraph {
    #|  // This is a comment
    #|  a -> b
    #|}
  match parse_dot(input) {
    Some(graph) => assert_eq(graph.statements.length(), 1)
    None => abort("Failed to parse with line comments")
  }
}

///|
test "parse_with_block_comments" {
  let input =
    #|digraph {
    #|  /* This is a
    #|     block comment */
    #|  a -> b
    #|}
  match parse_dot(input) {
    Some(graph) => assert_eq(graph.statements.length(), 1)
    None => abort("Failed to parse with block comments")
  }
}

///|
test "parse_with_hash_comments" {
  let input =
    #|digraph {
    #|  # This is a hash comment
    #|  a -> b
    #|}
  match parse_dot(input) {
    Some(graph) => assert_eq(graph.statements.length(), 1)
    None => abort("Failed to parse with hash comments")
  }
}

// Identifier variations

///|
test "parse_numeric_identifiers" {
  let input = "digraph { 0; 1; 123 }"
  match parse_dot(input) {
    Some(graph) => assert_eq(graph.statements.length(), 3)
    None => abort("Failed to parse numeric identifiers")
  }
}

///|
test "parse_quoted_identifiers" {
  let input = "digraph { \"hello world\" -> \"goodbye world\" }"
  match parse_dot(input) {
    Some(graph) => assert_eq(graph.statements.length(), 1)
    None => abort("Failed to parse quoted identifiers")
  }
}

///|
test "parse_identifiers_with_underscores" {
  let input = "digraph { node_1 -> node_2 }"
  match parse_dot(input) {
    Some(graph) => assert_eq(graph.statements.length(), 1)
    None => abort("Failed to parse identifiers with underscores")
  }
}

// Error cases (should return None)

///|
test "parse_missing_braces" {
  let input = "digraph"
  match parse_dot(input) {
    Some(_) => abort("Should fail on missing braces")
    None => () // Expected
  }
}

///|
test "parse_missing_closing_brace" {
  let input = "digraph { a ->"
  match parse_dot(input) {
    Some(_) => abort("Should fail on missing closing brace")
    None => () // Expected
  }
}

///|
test "parse_invalid_graph_type" {
  let input = "invalid { a }"
  match parse_dot(input) {
    Some(_) => abort("Should fail on invalid graph type")
    None => () // Expected
  }
}

///|
test "parse_empty_input" {
  let input = ""
  match parse_dot(input) {
    Some(_) => abort("Should fail on empty input")
    None => () // Expected
  }
}

// Formatting tests

///|
test "format_simple_graph" {
  let input = "graph { a }"
  match parse_dot(input) {
    Some(graph) => {
      let formatted = format_graph(graph)
      assert_true(formatted.contains("graph"))
      assert_true(formatted.contains("a"))
    }
    None => abort("Failed to parse simple graph")
  }
}

///|
test "format_digraph" {
  let input = "digraph { a -> b }"
  match parse_dot(input) {
    Some(graph) => {
      let formatted = format_graph(graph)
      assert_true(formatted.contains("digraph"))
    }
    None => abort("Failed to parse digraph")
  }
}

///|
test "format_strict_graph" {
  let input = "strict graph { a }"
  match parse_dot(input) {
    Some(graph) => {
      let formatted = format_graph(graph)
      assert_true(formatted.contains("strict"))
    }
    None => abort("Failed to parse strict graph")
  }
}
