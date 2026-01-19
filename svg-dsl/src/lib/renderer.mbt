// SVG DSL - Renderer
// Convert SvgElement tree to SVG string

///|
/// Implement Renderable trait for SvgElement
pub impl Renderable for SvgElement with render(self) {
  render_with_config(self, SvgConfig::default())
}

///|
/// Render an SvgElement to SVG string with default configuration
pub fn render(element : SvgElement) -> String {
  render_with_config(element, SvgConfig::default())
}

///|
/// Render an SvgElement to SVG string with custom configuration
pub fn render_with_config(element : SvgElement, config : SvgConfig) -> String {
  let buf = StringBuilder::new()
  if config.xml_declaration {
    buf.write_string("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n")
  }
  render_element(buf, element, 0, config)
  buf.to_string()
}

///|
/// Internal: render a single element
fn render_element(
  buf : StringBuilder,
  element : SvgElement,
  depth : Int,
  config : SvgConfig,
) -> Unit {
  let indent_str = make_indent(depth, config.indent)
  match element {
    Svg(attrs~, children~) => {
      buf.write_string(indent_str)
      buf.write_string("<svg")
      render_attrs(buf, attrs)
      if children.length() == 0 {
        buf.write_string(" />\n")
      } else {
        buf.write_string(">\n")
        render_children(buf, children, depth + 1, config)
        buf.write_string(indent_str)
        buf.write_string("</svg>\n")
      }
    }
    G(attrs~, children~) => {
      buf.write_string(indent_str)
      buf.write_string("<g")
      render_attrs(buf, attrs)
      if children.length() == 0 {
        buf.write_string(" />\n")
      } else {
        buf.write_string(">\n")
        render_children(buf, children, depth + 1, config)
        buf.write_string(indent_str)
        buf.write_string("</g>\n")
      }
    }
    Defs(children~) => {
      buf.write_string(indent_str)
      buf.write_string("<defs>\n")
      render_children(buf, children, depth + 1, config)
      buf.write_string(indent_str)
      buf.write_string("</defs>\n")
    }
    Rect(attrs~) => {
      buf.write_string(indent_str)
      buf.write_string("<rect")
      render_attrs(buf, attrs)
      buf.write_string(" />\n")
    }
    Circle(attrs~) => {
      buf.write_string(indent_str)
      buf.write_string("<circle")
      render_attrs(buf, attrs)
      buf.write_string(" />\n")
    }
    Ellipse(attrs~) => {
      buf.write_string(indent_str)
      buf.write_string("<ellipse")
      render_attrs(buf, attrs)
      buf.write_string(" />\n")
    }
    Line(attrs~) => {
      buf.write_string(indent_str)
      buf.write_string("<line")
      render_attrs(buf, attrs)
      buf.write_string(" />\n")
    }
    Polyline(attrs~) => {
      buf.write_string(indent_str)
      buf.write_string("<polyline")
      render_attrs(buf, attrs)
      buf.write_string(" />\n")
    }
    Polygon(attrs~) => {
      buf.write_string(indent_str)
      buf.write_string("<polygon")
      render_attrs(buf, attrs)
      buf.write_string(" />\n")
    }
    Path(attrs~) => {
      buf.write_string(indent_str)
      buf.write_string("<path")
      render_attrs(buf, attrs)
      buf.write_string(" />\n")
    }
    Text(content~, attrs~) => {
      buf.write_string(indent_str)
      buf.write_string("<text")
      render_attrs(buf, attrs)
      buf.write_string(">")
      buf.write_string(escape_xml(content))
      buf.write_string("</text>\n")
    }
    Marker(attrs~, children~) => {
      buf.write_string(indent_str)
      buf.write_string("<marker")
      render_attrs(buf, attrs)
      if children.length() == 0 {
        buf.write_string(" />\n")
      } else {
        buf.write_string(">\n")
        render_children(buf, children, depth + 1, config)
        buf.write_string(indent_str)
        buf.write_string("</marker>\n")
      }
    }
    Use(attrs~) => {
      buf.write_string(indent_str)
      buf.write_string("<use")
      render_attrs(buf, attrs)
      buf.write_string(" />\n")
    }
    Raw(content~) => {
      buf.write_string(indent_str)
      buf.write_string(content)
      buf.write_string("\n")
    }
  }
}

///|
/// Internal: render children
fn render_children(
  buf : StringBuilder,
  children : Array[SvgElement],
  depth : Int,
  config : SvgConfig,
) -> Unit {
  for child in children {
    render_element(buf, child, depth, config)
  }
}

///|
/// Internal: render attributes
fn render_attrs(buf : StringBuilder, attrs : Array[Attr]) -> Unit {
  for attr in attrs {
    buf.write_string(" ")
    buf.write_string(attr.name)
    buf.write_string("=\"")
    buf.write_string(escape_xml_attr(attr.value))
    buf.write_string("\"")
  }
}

///|
/// Internal: create indentation string
fn make_indent(depth : Int, indent_size : Int) -> String {
  if indent_size <= 0 {
    return ""
  }
  let total = depth * indent_size
  let buf = StringBuilder::new()
  for _ in 0..<total {
    buf.write_char(' ')
  }
  buf.to_string()
}

///|
/// Escape XML text content
pub fn escape_xml(s : String) -> String {
  let mut result = s
  result = result.replace(old="&", new="&amp;")
  result = result.replace(old="<", new="&lt;")
  result = result.replace(old=">", new="&gt;")
  result
}

///|
/// Escape XML attribute value
pub fn escape_xml_attr(s : String) -> String {
  let mut result = s
  result = result.replace(old="&", new="&amp;")
  result = result.replace(old="<", new="&lt;")
  result = result.replace(old=">", new="&gt;")
  result = result.replace(old="\"", new="&quot;")
  result = result.replace(old="'", new="&apos;")
  result
}

///|
/// Render SVG to a string suitable for embedding in HTML
pub fn render_for_html(element : SvgElement) -> String {
  render_with_config(element, SvgConfig::for_html())
}

///|
/// Render SVG as a compact string (no indentation, no XML declaration)
pub fn render_compact(element : SvgElement) -> String {
  render_with_config(element, SvgConfig::compact())
}
