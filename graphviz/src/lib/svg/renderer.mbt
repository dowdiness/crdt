// SVG Renderer for GraphLayout
// Converts layout information into SVG markup

///|
pub struct SvgConfig {
  padding : Double // Padding around graph: 20.0
  node_stroke : String // Node border color: "#333"
  node_fill : String // Node fill color: "#fff"
  node_stroke_width : Double // Node border width: 2.0
  edge_stroke : String // Edge line color: "#666"
  edge_stroke_width : Double // Edge line width: 1.5
  text_color : String // Text color: "#000"
  font_size : Double // Font size: 14.0
  font_family : String // Font family: "Arial, sans-serif"
} derive(Show)

///|
pub fn SvgConfig::default() -> SvgConfig {
  {
    padding: 20.0,
    node_stroke: "#333",
    node_fill: "#fff",
    node_stroke_width: 2.0,
    edge_stroke: "#666",
    edge_stroke_width: 1.5,
    text_color: "#000",
    font_size: 14.0,
    font_family: "Arial, sans-serif",
  }
}

///|
/// Render a GraphLayout to SVG string
pub fn render_svg(layout : @layout.GraphLayout) -> String {
  render_svg_with_config(layout, SvgConfig::default())
}

///|
/// Render a GraphLayout to SVG string with custom configuration
pub fn render_svg_with_config(
  layout : @layout.GraphLayout,
  config : SvgConfig,
) -> String {
  let buf = StringBuilder::new()

  // Calculate viewBox with padding
  let vb_x = layout.bounds.min_x - config.padding
  let vb_y = layout.bounds.min_y - config.padding
  let vb_width = layout.bounds.max_x -
    layout.bounds.min_x +
    2.0 * config.padding
  let vb_height = layout.bounds.max_y -
    layout.bounds.min_y +
    2.0 * config.padding

  // SVG header
  buf.write_string("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n")
  buf.write_string("<svg xmlns=\"http://www.w3.org/2000/svg\" ")
  buf.write_string("viewBox=\"")
  buf.write_string(vb_x.to_string())
  buf.write_string(" ")
  buf.write_string(vb_y.to_string())
  buf.write_string(" ")
  buf.write_string(vb_width.to_string())
  buf.write_string(" ")
  buf.write_string(vb_height.to_string())
  buf.write_string("\">\n")

  // Add arrow marker for directed graphs
  if layout.directed {
    buf.write_string("  <defs>\n")
    buf.write_string(
      "    <marker id=\"arrowhead\" markerWidth=\"10\" markerHeight=\"10\" ",
    )
    buf.write_string("refX=\"9\" refY=\"3\" orient=\"auto\">\n")
    buf.write_string("      <polygon points=\"0 0, 10 3, 0 6\" fill=\"")
    buf.write_string(config.edge_stroke)
    buf.write_string("\" />\n")
    buf.write_string("    </marker>\n")
    buf.write_string("  </defs>\n")
  }

  // Render edges first (so they appear behind nodes)
  buf.write_string("\n  <!-- Edges -->\n")
  for edge in layout.edges {
    render_edge(buf, edge, layout.directed, config)
  }

  // Render nodes
  buf.write_string("\n  <!-- Nodes -->\n")
  layout.nodes.each(fn(_id, node) { render_node(buf, node, config) })

  // SVG footer
  buf.write_string("</svg>\n")
  buf.to_string()
}

///|
/// Render a single node as a rectangle with text label
fn render_node(
  buf : StringBuilder,
  node : @layout.LayoutNode,
  config : SvgConfig,
) -> Unit {
  buf.write_string("  <g>\n")

  // Rectangle
  buf.write_string("    <rect x=\"")
  buf.write_string(node.position.x.to_string())
  buf.write_string("\" y=\"")
  buf.write_string(node.position.y.to_string())
  buf.write_string("\" width=\"")
  buf.write_string(node.size.width.to_string())
  buf.write_string("\" height=\"")
  buf.write_string(node.size.height.to_string())
  buf.write_string("\" fill=\"")
  buf.write_string(config.node_fill)
  buf.write_string("\" stroke=\"")
  buf.write_string(config.node_stroke)
  buf.write_string("\" stroke-width=\"")
  buf.write_string(config.node_stroke_width.to_string())
  buf.write_string("\" rx=\"4\" />\n")

  // Text label (centered in node)
  let text_x = node.position.x + node.size.width / 2.0
  let text_y = node.position.y + node.size.height / 2.0 + config.font_size / 3.0
  buf.write_string("    <text x=\"")
  buf.write_string(text_x.to_string())
  buf.write_string("\" y=\"")
  buf.write_string(text_y.to_string())
  buf.write_string("\" text-anchor=\"middle\" fill=\"")
  buf.write_string(config.text_color)
  buf.write_string("\" font-size=\"")
  buf.write_string(config.font_size.to_string())
  buf.write_string("\" font-family=\"")
  buf.write_string(config.font_family)
  buf.write_string("\">")
  buf.write_string(escape_xml(node.id))
  buf.write_string("</text>\n")
  buf.write_string("  </g>\n")
}

///|
/// Render a single edge as a polyline
fn render_edge(
  buf : StringBuilder,
  edge : @layout.LayoutEdge,
  directed : Bool,
  config : SvgConfig,
) -> Unit {
  if edge.waypoints.length() < 2 {
    return
  }
  buf.write_string("  <polyline points=\"")

  // Build points string
  for i, point in edge.waypoints {
    if i > 0 {
      buf.write_string(" ")
    }
    buf.write_string(point.x.to_string())
    buf.write_string(",")
    buf.write_string(point.y.to_string())
  }
  buf.write_string("\" fill=\"none\" stroke=\"")
  buf.write_string(config.edge_stroke)
  buf.write_string("\" stroke-width=\"")
  buf.write_string(config.edge_stroke_width.to_string())
  buf.write_string("\"")

  // Add arrow marker for directed graphs (unless edge was reversed in layout)
  if directed && not(edge.reversed) {
    buf.write_string(" marker-end=\"url(#arrowhead)\"")
  } else if directed && edge.reversed {
    buf.write_string(" marker-start=\"url(#arrowhead)\"")
  }
  buf.write_string(" />\n")
}

///|
/// Escape XML special characters
fn escape_xml(s : String) -> String {
  // Use replace operations for XML escaping
  let mut result = s
  result = result.replace(old="&", new="&amp;")
  result = result.replace(old="<", new="&lt;")
  result = result.replace(old=">", new="&gt;")
  result = result.replace(old="\"", new="&quot;")
  result = result.replace(old="'", new="&apos;")
  result
}

///|
/// Save GraphLayout as SVG file
pub fn save_svg(
  layout : @layout.GraphLayout,
  filename : String,
) -> Result[Unit, String] {
  save_svg_with_config(layout, filename, SvgConfig::default())
}

///|
/// Save GraphLayout as SVG file with custom configuration
pub fn save_svg_with_config(
  layout : @layout.GraphLayout,
  filename : String,
  config : SvgConfig,
) -> Result[Unit, String] {
  let svg_content = render_svg_with_config(layout, config)
  try {
    @fs.write_string_to_file(filename, svg_content)
    Ok(())
  } catch {
    e => Err(e.to_string())
  }
}

///|
/// Render a GraphLayout as an HTML page with embedded SVG
pub fn render_html(layout : @layout.GraphLayout, title : String) -> String {
  render_html_with_config(layout, title, SvgConfig::default())
}

///|
/// Render SVG without XML declaration (for embedding in HTML)
fn render_svg_for_html(
  layout : @layout.GraphLayout,
  config : SvgConfig,
) -> String {
  let buf = StringBuilder::new()

  // Calculate viewBox with padding
  let vb_x = layout.bounds.min_x - config.padding
  let vb_y = layout.bounds.min_y - config.padding
  let vb_width = layout.bounds.max_x -
    layout.bounds.min_x +
    2.0 * config.padding
  let vb_height = layout.bounds.max_y -
    layout.bounds.min_y +
    2.0 * config.padding

  // SVG header (without XML declaration)
  buf.write_string("<svg xmlns=\"http://www.w3.org/2000/svg\" ")
  buf.write_string("viewBox=\"")
  buf.write_string(vb_x.to_string())
  buf.write_string(" ")
  buf.write_string(vb_y.to_string())
  buf.write_string(" ")
  buf.write_string(vb_width.to_string())
  buf.write_string(" ")
  buf.write_string(vb_height.to_string())
  buf.write_string("\">\n")

  // Add arrow marker for directed graphs
  if layout.directed {
    buf.write_string("  <defs>\n")
    buf.write_string(
      "    <marker id=\"arrowhead\" markerWidth=\"10\" markerHeight=\"10\" ",
    )
    buf.write_string("refX=\"9\" refY=\"3\" orient=\"auto\">\n")
    buf.write_string("      <polygon points=\"0 0, 10 3, 0 6\" fill=\"")
    buf.write_string(config.edge_stroke)
    buf.write_string("\" />\n")
    buf.write_string("    </marker>\n")
    buf.write_string("  </defs>\n")
  }

  // Render edges first (so they appear behind nodes)
  buf.write_string("\n  <!-- Edges -->\n")
  for edge in layout.edges {
    render_edge(buf, edge, layout.directed, config)
  }

  // Render nodes
  buf.write_string("\n  <!-- Nodes -->\n")
  layout.nodes.each(fn(_id, node) { render_node(buf, node, config) })

  // SVG footer
  buf.write_string("</svg>\n")
  buf.to_string()
}

///|
/// Render a GraphLayout as an HTML page with embedded SVG and custom config
pub fn render_html_with_config(
  layout : @layout.GraphLayout,
  title : String,
  config : SvgConfig,
) -> String {
  let buf = StringBuilder::new()
  let svg_content = render_svg_for_html(layout, config)

  // HTML header
  buf.write_string("<!DOCTYPE html>\n")
  buf.write_string("<html lang=\"en\">\n")
  buf.write_string("<head>\n")
  buf.write_string("  <meta charset=\"UTF-8\">\n")
  buf.write_string(
    "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n",
  )
  buf.write_string("  <title>")
  buf.write_string(escape_xml(title))
  buf.write_string("</title>\n")
  buf.write_string("  <style>\n")
  buf.write_string("    body {\n")
  buf.write_string("      margin: 0;\n")
  buf.write_string("      padding: 20px;\n")
  buf.write_string("      display: flex;\n")
  buf.write_string("      justify-content: center;\n")
  buf.write_string("      align-items: center;\n")
  buf.write_string("      min-height: 100vh;\n")
  buf.write_string("      background-color: #f5f5f5;\n")
  buf.write_string(
    "      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;\n",
  )
  buf.write_string("    }\n")
  buf.write_string("    .container {\n")
  buf.write_string("      background: white;\n")
  buf.write_string("      padding: 30px;\n")
  buf.write_string("      border-radius: 8px;\n")
  buf.write_string("      box-shadow: 0 2px 8px rgba(0,0,0,0.1);\n")
  buf.write_string("      max-width: 90vw;\n")
  buf.write_string("    }\n")
  buf.write_string("    h1 {\n")
  buf.write_string("      margin-top: 0;\n")
  buf.write_string("      color: #333;\n")
  buf.write_string("      font-size: 24px;\n")
  buf.write_string("    }\n")
  buf.write_string("    svg {\n")
  buf.write_string("      max-width: 100%;\n")
  buf.write_string("      height: auto;\n")
  buf.write_string("      display: block;\n")
  buf.write_string("    }\n")
  buf.write_string("  </style>\n")
  buf.write_string("</head>\n")
  buf.write_string("<body>\n")
  buf.write_string("  <div class=\"container\">\n")
  buf.write_string("    <h1>")
  buf.write_string(escape_xml(title))
  buf.write_string("</h1>\n")
  buf.write_string("    ")
  buf.write_string(svg_content)
  buf.write_string("  </div>\n")
  buf.write_string("</body>\n")
  buf.write_string("</html>\n")
  buf.to_string()
}

///|
/// Save GraphLayout as HTML file
pub fn save_html(
  layout : @layout.GraphLayout,
  filename : String,
  title : String,
) -> Result[Unit, String] {
  save_html_with_config(layout, filename, title, SvgConfig::default())
}

///|
/// Save GraphLayout as HTML file with custom configuration
pub fn save_html_with_config(
  layout : @layout.GraphLayout,
  filename : String,
  title : String,
  config : SvgConfig,
) -> Result[Unit, String] {
  let html_content = render_html_with_config(layout, title, config)
  try {
    @fs.write_string_to_file(filename, html_content)
    Ok(())
  } catch {
    e => Err(e.to_string())
  }
}
