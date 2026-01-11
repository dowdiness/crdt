// SVG Renderer Tests

///|
test "save_svg_creates_file" {
  let dot = "digraph { a -> b }"
  match @parser.parse_dot(dot) {
    Some(graph) => {
      let layout = @layout.compute_layout(graph)
      let filename = "test_output.svg"

      // Save to file
      match save_svg(layout, filename) {
        Ok(_) =>
          // File should be created successfully
          inspect(true, content="true")
        Err(e) => {
          println("Error saving file: \{e}")
          inspect(false, content="true")
        }
      }
    }
    None => {
      println("Parse failed")
      inspect(false, content="true")
    }
  }
}

///|
test "render_svg_produces_valid_xml_header" {
  let dot = "digraph { x -> y }"
  match @parser.parse_dot(dot) {
    Some(graph) => {
      let layout = @layout.compute_layout(graph)
      let svg = render_svg(layout)

      // Check for XML declaration
      let has_xml_header = svg.contains(
        "<?xml version=\"1.0\" encoding=\"UTF-8\"?>",
      )
      inspect(has_xml_header, content="true")

      // Check for SVG root element
      let has_svg_element = svg.contains(
        "<svg xmlns=\"http://www.w3.org/2000/svg\"",
      )
      inspect(has_svg_element, content="true")
    }
    None => {
      println("Parse failed")
      inspect(false, content="true")
    }
  }
}

///|
test "render_svg_includes_arrowhead_for_directed_graph" {
  let dot = "digraph { a -> b }"
  match @parser.parse_dot(dot) {
    Some(graph) => {
      let layout = @layout.compute_layout(graph)
      let svg = render_svg(layout)

      // Should have arrow marker definition
      let has_arrowhead = svg.contains("<marker id=\"arrowhead\"")
      inspect(has_arrowhead, content="true")
    }
    None => {
      println("Parse failed")
      inspect(false, content="true")
    }
  }
}

///|
test "render_svg_no_arrowhead_for_undirected_graph" {
  let dot = "graph { a -- b }"
  match @parser.parse_dot(dot) {
    Some(graph) => {
      let layout = @layout.compute_layout(graph)
      let svg = render_svg(layout)

      // Should NOT have arrow marker definition
      let has_arrowhead = svg.contains("<marker id=\"arrowhead\"")
      inspect(has_arrowhead, content="false")
    }
    None => {
      println("Parse failed")
      inspect(false, content="true")
    }
  }
}

///|
test "render_html_produces_valid_html_structure" {
  let dot = "digraph { x -> y }"
  match @parser.parse_dot(dot) {
    Some(graph) => {
      let layout = @layout.compute_layout(graph)
      let html = render_html(layout, "Test Graph")

      // Check for HTML structure
      let has_doctype = html.contains("<!DOCTYPE html>")
      inspect(has_doctype, content="true")
      let has_title = html.contains("<title>Test Graph</title>")
      inspect(has_title, content="true")
      let has_svg = html.contains("<svg xmlns=\"http://www.w3.org/2000/svg\"")
      inspect(has_svg, content="true")

      // Should NOT have XML declaration in HTML
      let has_xml_declaration = html.contains("<?xml version")
      inspect(has_xml_declaration, content="false")
    }
    None => {
      println("Parse failed")
      inspect(false, content="true")
    }
  }
}

///|
test "save_html_creates_file" {
  let dot = "digraph { a -> b }"
  match @parser.parse_dot(dot) {
    Some(graph) => {
      let layout = @layout.compute_layout(graph)
      let filename = "test_output.html"

      // Save to file
      match save_html(layout, filename, "Test") {
        Ok(_) =>
          // File should be created successfully
          inspect(true, content="true")
        Err(e) => {
          println("Error saving file: \{e}")
          inspect(false, content="true")
        }
      }
    }
    None => {
      println("Parse failed")
      inspect(false, content="true")
    }
  }
}
