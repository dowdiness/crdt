// Convert AST (TermNode) to DOT format for graphviz visualization

///|
/// Convert a TermNode to DOT format for graphviz visualization
pub fn term_node_to_dot(node : TermNode) -> String {
  let buf = StringBuilder::new()

  // DOT header with dark theme styling
  buf.write_string("digraph {\n")
  buf.write_string("  bgcolor=\"transparent\";\n")
  buf.write_string(
    "  node [shape=box, style=\"rounded,filled\", fillcolor=\"#252526\", fontname=\"Arial\", fontcolor=\"#d4d4d4\", color=\"#3c3c3c\"];\n",
  )
  buf.write_string(
    "  edge [fontname=\"Arial\", fontcolor=\"#858585\", color=\"#3c3c3c\"];\n\n",
  )

  // Generate nodes and edges
  write_node_and_edges(buf, node)

  // DOT footer
  buf.write_string("}\n")
  buf.to_string()
}

///|
/// Recursively write node definitions and edges
fn write_node_and_edges(buf : StringBuilder, node : TermNode) -> Unit {
  // Write this node's definition
  write_node_definition(buf, node)

  // Write edges to children and recursively process children
  for i = 0; i < node.children.length(); i = i + 1 {
    let child = node.children[i]

    // Write edge
    buf.write_string("  node")
    buf.write_string(node.node_id.to_string())
    buf.write_string(" -> node")
    buf.write_string(child.node_id.to_string())

    // Add edge label for clarity (optional, based on position)
    match node.kind {
      TermKind::Lam(_) => if i == 0 { buf.write_string(" [label=\"body\"]") }
      TermKind::App =>
        if i == 0 {
          buf.write_string(" [label=\"func\"]")
        } else if i == 1 {
          buf.write_string(" [label=\"arg\"]")
        }
      TermKind::Bop(_) =>
        if i == 0 {
          buf.write_string(" [label=\"left\"]")
        } else if i == 1 {
          buf.write_string(" [label=\"right\"]")
        }
      TermKind::If =>
        if i == 0 {
          buf.write_string(" [label=\"cond\"]")
        } else if i == 1 {
          buf.write_string(" [label=\"then\"]")
        } else if i == 2 {
          buf.write_string(" [label=\"else\"]")
        }
      _ => ()
    }
    buf.write_string(";\n")

    // Recursively process child
    write_node_and_edges(buf, child)
  }
}

///|
/// Write a single node definition
fn write_node_definition(buf : StringBuilder, node : TermNode) -> Unit {
  buf.write_string("  node")
  buf.write_string(node.node_id.to_string())
  buf.write_string(" [label=\"")

  // Generate label based on kind
  match node.kind {
    TermKind::Int(n) =>
      // buf.write_string("Int\\n")
      buf.write_string(n.to_string())
    TermKind::Var(name) =>
      // buf.write_string("Var\\n")
      buf.write_string(escape_label(name))
    TermKind::Lam(param) => {
      buf.write_string("λ")
      buf.write_string(escape_label(param))
    }
    TermKind::App => buf.write_string("App")
    TermKind::Bop(Plus) => buf.write_string("+")
    TermKind::Bop(Minus) => buf.write_string("-")
    TermKind::If => buf.write_string("If")
    TermKind::Error(_msg) => buf.write_string("Error")
    // buf.write_string(escape_label(msg))
  }
  buf.write_string("\"]")

  // Add styling based on kind (color for border, fillcolor for background, fontcolor for text)
  match node.kind {
    TermKind::Error(_) =>
      buf.write_string(
        " [color=\"#ff0000\", fillcolor=\"#ff000022\", fontcolor=\"#ff6b6b\"]",
      )
    TermKind::Lam(_) =>
      buf.write_string(
        " [color=\"#c586c0\", fillcolor=\"#c586c022\", fontcolor=\"#c586c0\"]",
      )
    TermKind::Var(_) =>
      buf.write_string(
        " [color=\"#9cdcfe\", fillcolor=\"#9cdcfe22\", fontcolor=\"#9cdcfe\"]",
      )
    TermKind::Int(_) =>
      buf.write_string(
        " [color=\"#b5cea8\", fillcolor=\"#b5cea822\", fontcolor=\"#b5cea8\"]",
      )
    TermKind::Bop(_) =>
      buf.write_string(
        " [color=\"#d4d4d4\", fillcolor=\"#d4d4d422\", fontcolor=\"#d4d4d4\"]",
      )
    _ => ()
  }
  buf.write_string(";\n")
}

///|
/// Escape special characters in DOT labels
fn escape_label(s : String) -> String {
  let buf = StringBuilder::new()
  for i = 0; i < s.length(); i = i + 1 {
    match s.code_unit_at(i).to_char() {
      Some('"') => buf.write_string("\\\"")
      Some('\\') => buf.write_string("\\\\")
      Some('\n') => buf.write_string("\\n")
      Some(c) => buf.write_char(c)
      None => () // Skip invalid code units
    }
  }
  buf.to_string()
}
