// SVG Renderer for GraphLayout
// Converts layout information into SVG markup using svg-dsl

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
/// Dark theme configuration for browser rendering
pub fn SvgConfig::dark_theme() -> SvgConfig {
  {
    padding: 20.0,
    node_stroke: "#3c3c3c", // Dark border
    node_fill: "#252526", // Dark background
    node_stroke_width: 2.0,
    edge_stroke: "#858585", // Light gray edges
    edge_stroke_width: 1.5,
    text_color: "#d4d4d4", // Light text
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
  let svg_element = build_svg_element(layout, config)
  @svg.render(svg_element)
}

///|
/// Build the SVG element tree from layout
fn build_svg_element(
  layout : @layout.GraphLayout,
  config : SvgConfig,
) -> @svg.SvgElement {
  // Calculate viewBox with padding
  let vb_x = layout.bounds.min_x - config.padding
  let vb_y = layout.bounds.min_y - config.padding
  let vb_width = layout.bounds.max_x -
    layout.bounds.min_x +
    2.0 * config.padding
  let vb_height = layout.bounds.max_y -
    layout.bounds.min_y +
    2.0 * config.padding

  // Build children elements
  let children : Array[@svg.SvgElement] = []

  // Add arrow marker for directed graphs
  if layout.directed {
    let arrow_polygon = @svg.polygon([(0.0, 0.0), (10.0, 3.0), (0.0, 6.0)]).fill(
      config.edge_stroke,
    )
    let arrow_marker = @svg.marker(
      id="arrowhead",
      marker_width=10.0,
      marker_height=10.0,
      ref_x=9.0,
      ref_y=3.0,
      orient="auto",
      children=[arrow_polygon],
    )
    children.push(@svg.defs(children=[arrow_marker]))
  }

  // Render edges first (so they appear behind nodes)
  for edge in layout.edges {
    match build_edge_element(edge, layout.directed, config) {
      Some(elem) => children.push(elem)
      None => ()
    }
  }

  // Render nodes
  layout.nodes.each(fn(_id, node) {
    children.push(build_node_element(node, config))
  })

  // Create SVG root with viewBox
  @svg.svg_viewbox(vb_x, vb_y, vb_width, vb_height, children~)
}

///|
/// Build a single node element as a group with rectangle and text label
fn build_node_element(
  node : @layout.LayoutNode,
  config : SvgConfig,
) -> @svg.SvgElement {
  // Rectangle
  let node_rect = @svg.rect(
      x=node.position.x,
      y=node.position.y,
      width=node.size.width,
      height=node.size.height,
      rx=Some(4.0),
    )
    .fill(config.node_fill)
    .stroke(config.node_stroke)
    .stroke_width(config.node_stroke_width)

  // Text label (centered in node)
  let text_x = node.position.x + node.size.width / 2.0
  let text_y = node.position.y + node.size.height / 2.0 + config.font_size / 3.0
  let node_text = @svg.text(node.label, x=text_x, y=text_y)
    .with_attr(@svg.text_anchor("middle"))
    .fill(config.text_color)
    .with_attr(@svg.font_size(config.font_size))
    .with_attr(@svg.font_family(config.font_family))

  // Group containing rect and text
  @svg.g(children=[node_rect, node_text])
}

///|
/// Build a single edge element as a polyline
fn build_edge_element(
  edge : @layout.LayoutEdge,
  directed : Bool,
  config : SvgConfig,
) -> @svg.SvgElement? {
  if edge.waypoints.length() < 2 {
    return None
  }

  // Convert waypoints to points array
  let pts : Array[(Double, Double)] = []
  for point in edge.waypoints {
    pts.push((point.x, point.y))
  }

  // Build polyline with attributes
  let mut polyline_elem = @svg.polyline(pts)
    .fill("none")
    .stroke(config.edge_stroke)
    .stroke_width(config.edge_stroke_width)

  // Add arrow marker for directed graphs
  if directed && not(edge.reversed) {
    polyline_elem = polyline_elem.with_attr(@svg.marker_end("arrowhead"))
  } else if directed && edge.reversed {
    polyline_elem = polyline_elem.with_attr(@svg.marker_start("arrowhead"))
  }
  Some(polyline_elem)
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
  let svg_element = build_svg_element(layout, config)
  @svg.render_for_html(svg_element)
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
  let escaped_title = @svg.escape_xml(title)

  // HTML header
  buf.write_string("<!DOCTYPE html>\n")
  buf.write_string("<html lang=\"en\">\n")
  buf.write_string("<head>\n")
  buf.write_string("  <meta charset=\"UTF-8\">\n")
  buf.write_string(
    "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n",
  )
  buf.write_string("  <title>")
  buf.write_string(escaped_title)
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
  buf.write_string(escaped_title)
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
