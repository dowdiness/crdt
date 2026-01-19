// SVG DSL - Configuration
// Rendering configuration and theme presets

///|
/// Configuration for SVG rendering
pub struct SvgConfig {
  /// Indentation spaces for pretty printing (0 for compact)
  indent : Int
  /// Decimal precision for coordinates
  precision : Int
  /// Include XML declaration header
  xml_declaration : Bool
  /// Default stroke color
  default_stroke : String
  /// Default fill color
  default_fill : String
  /// Default stroke width
  default_stroke_width : Double
  /// Default font size
  default_font_size : Double
} derive(Show, Eq)

///|
/// Implement Default trait for SvgConfig
pub impl Default for SvgConfig with default() {
  {
    indent: 2,
    precision: 2,
    xml_declaration: true,
    default_stroke: "#333",
    default_fill: "none",
    default_stroke_width: 1.0,
    default_font_size: 14.0,
  }
}

///|
/// Default configuration with pretty printing (alias for Default::default())
pub fn SvgConfig::default() -> SvgConfig {
  Default::default()
}

///|
/// Compact configuration without pretty printing
pub fn SvgConfig::compact() -> SvgConfig {
  {
    indent: 0,
    precision: 2,
    xml_declaration: false,
    default_stroke: "#333",
    default_fill: "none",
    default_stroke_width: 1.0,
    default_font_size: 14.0,
  }
}

///|
/// Dark theme configuration
pub fn SvgConfig::dark_theme() -> SvgConfig {
  {
    indent: 2,
    precision: 2,
    xml_declaration: true,
    default_stroke: "#858585",
    default_fill: "#252526",
    default_stroke_width: 1.0,
    default_font_size: 14.0,
  }
}

///|
/// Configuration for embedding in HTML (no XML declaration)
pub fn SvgConfig::for_html() -> SvgConfig {
  {
    indent: 2,
    precision: 2,
    xml_declaration: false,
    default_stroke: "#333",
    default_fill: "none",
    default_stroke_width: 1.0,
    default_font_size: 14.0,
  }
}

///|
/// Builder-style configuration modification
pub fn SvgConfig::with_indent(self : SvgConfig, indent : Int) -> SvgConfig {
  { ..self, indent, }
}

///|
pub fn SvgConfig::with_precision(
  self : SvgConfig,
  precision : Int,
) -> SvgConfig {
  { ..self, precision, }
}

///|
pub fn SvgConfig::with_xml_declaration(
  self : SvgConfig,
  xml_declaration : Bool,
) -> SvgConfig {
  { ..self, xml_declaration, }
}

///|
pub fn SvgConfig::with_default_stroke(
  self : SvgConfig,
  default_stroke : String,
) -> SvgConfig {
  { ..self, default_stroke, }
}

///|
pub fn SvgConfig::with_default_fill(
  self : SvgConfig,
  default_fill : String,
) -> SvgConfig {
  { ..self, default_fill, }
}
