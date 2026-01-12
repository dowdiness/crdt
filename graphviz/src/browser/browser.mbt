///|
/// Render DOT string to SVG (for JavaScript FFI, browser-safe)
/// Returns SVG string with dark theme, or empty string on error
/// This version has no file I/O and no main function that auto-executes
pub fn render_dot_to_svg(dot_string : String) -> String {
  match @parser.parse_dot(dot_string) {
    Some(graph) => {
      let layout = @layout.compute_layout(graph)
      // Use dark theme configuration
      let dark_config = @svg.SvgConfig::dark_theme()
      @svg.render_svg_with_config(layout, dark_config)
    }
    None => ""
  }
}
