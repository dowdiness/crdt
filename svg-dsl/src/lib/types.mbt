// SVG DSL - Core Types
// Type-safe representation of SVG elements and attributes

///|
/// Trait for types that can be converted to an SVG attribute
pub trait ToAttr {
  to_attr(Self) -> Attr
}

///|
/// Trait for types that can be rendered to an SVG string
pub trait Renderable {
  render(Self) -> String
}

///|
/// SVG element tree representation
/// Each variant represents an SVG element with its attributes and children
pub enum SvgElement {
  /// Root SVG element
  Svg(attrs~ : Array[Attr], children~ : Array[SvgElement])
  /// Group element for composing children
  G(attrs~ : Array[Attr], children~ : Array[SvgElement])
  /// Definitions element for reusable elements (markers, gradients, etc.)
  Defs(children~ : Array[SvgElement])
  /// Rectangle element
  Rect(attrs~ : Array[Attr])
  /// Circle element
  Circle(attrs~ : Array[Attr])
  /// Ellipse element
  Ellipse(attrs~ : Array[Attr])
  /// Line element
  Line(attrs~ : Array[Attr])
  /// Polyline element (series of connected points)
  Polyline(attrs~ : Array[Attr])
  /// Polygon element (closed polyline)
  Polygon(attrs~ : Array[Attr])
  /// Path element with path commands
  Path(attrs~ : Array[Attr])
  /// Text element
  Text(content~ : String, attrs~ : Array[Attr])
  /// Marker element for arrowheads and other markers
  Marker(attrs~ : Array[Attr], children~ : Array[SvgElement])
  /// Use element for referencing other elements
  Use(attrs~ : Array[Attr])
  /// Raw SVG content (escape hatch for unsupported elements)
  Raw(content~ : String)
} derive(Show, Eq)

///|
/// Attribute key-value pair
pub struct Attr {
  name : String
  value : String
} derive(Show, Eq)

///|
/// Path command for SVG path data
pub enum PathCmd {
  /// Move to (absolute)
  M(Double, Double)
  /// Move to (relative)
  M_rel(Double, Double)
  /// Line to (absolute)
  L(Double, Double)
  /// Line to (relative)
  L_rel(Double, Double)
  /// Horizontal line to (absolute)
  H(Double)
  /// Horizontal line to (relative)
  H_rel(Double)
  /// Vertical line to (absolute)
  V(Double)
  /// Vertical line to (relative)
  V_rel(Double)
  /// Cubic bezier curve (absolute)
  C(Double, Double, Double, Double, Double, Double)
  /// Cubic bezier curve (relative)
  C_rel(Double, Double, Double, Double, Double, Double)
  /// Smooth cubic bezier (absolute)
  S(Double, Double, Double, Double)
  /// Smooth cubic bezier (relative)
  S_rel(Double, Double, Double, Double)
  /// Quadratic bezier curve (absolute)
  Q(Double, Double, Double, Double)
  /// Quadratic bezier curve (relative)
  Q_rel(Double, Double, Double, Double)
  /// Smooth quadratic bezier (absolute)
  T(Double, Double)
  /// Smooth quadratic bezier (relative)
  T_rel(Double, Double)
  /// Arc (absolute)
  A(Double, Double, Double, Bool, Bool, Double, Double)
  /// Arc (relative)
  A_rel(Double, Double, Double, Bool, Bool, Double, Double)
  /// Close path
  Z
} derive(Eq)

///|
/// Custom Show implementation for PathCmd that outputs SVG path data format
pub impl Show for PathCmd with output(self, logger) {
  match self {
    M(x, y) => logger.write_string("M\{x} \{y}")
    M_rel(x, y) => logger.write_string("m\{x} \{y}")
    L(x, y) => logger.write_string("L\{x} \{y}")
    L_rel(x, y) => logger.write_string("l\{x} \{y}")
    H(x) => logger.write_string("H\{x}")
    H_rel(x) => logger.write_string("h\{x}")
    V(y) => logger.write_string("V\{y}")
    V_rel(y) => logger.write_string("v\{y}")
    C(x1, y1, x2, y2, x, y) =>
      logger.write_string("C\{x1} \{y1} \{x2} \{y2} \{x} \{y}")
    C_rel(x1, y1, x2, y2, x, y) =>
      logger.write_string("c\{x1} \{y1} \{x2} \{y2} \{x} \{y}")
    S(x2, y2, x, y) => logger.write_string("S\{x2} \{y2} \{x} \{y}")
    S_rel(x2, y2, x, y) => logger.write_string("s\{x2} \{y2} \{x} \{y}")
    Q(x1, y1, x, y) => logger.write_string("Q\{x1} \{y1} \{x} \{y}")
    Q_rel(x1, y1, x, y) => logger.write_string("q\{x1} \{y1} \{x} \{y}")
    T(x, y) => logger.write_string("T\{x} \{y}")
    T_rel(x, y) => logger.write_string("t\{x} \{y}")
    A(rx, ry, angle, large_arc, sweep, x, y) => {
      let large = if large_arc { "1" } else { "0" }
      let sw = if sweep { "1" } else { "0" }
      logger.write_string("A\{rx} \{ry} \{angle} \{large} \{sw} \{x} \{y}")
    }
    A_rel(rx, ry, angle, large_arc, sweep, x, y) => {
      let large = if large_arc { "1" } else { "0" }
      let sw = if sweep { "1" } else { "0" }
      logger.write_string("a\{rx} \{ry} \{angle} \{large} \{sw} \{x} \{y}")
    }
    Z => logger.write_string("Z")
  }
}

///|
/// Transform operation for SVG transform attribute
pub enum Transform {
  /// Translate by (tx, ty)
  Translate(Double, Double)
  /// Scale by (sx, sy)
  Scale(Double, Double)
  /// Rotate by angle (degrees) around optional center point
  Rotate(Double, (Double, Double)?)
  /// Skew along X axis
  SkewX(Double)
  /// Skew along Y axis
  SkewY(Double)
  /// General matrix transform
  Matrix(Double, Double, Double, Double, Double, Double)
} derive(Eq)

///|
/// Custom Show implementation for Transform that outputs SVG transform format
pub impl Show for Transform with output(self, logger) {
  match self {
    Translate(tx, ty) => logger.write_string("translate(\{tx}, \{ty})")
    Scale(sx, sy) => logger.write_string("scale(\{sx}, \{sy})")
    Rotate(angle, None) => logger.write_string("rotate(\{angle})")
    Rotate(angle, Some((cx, cy))) =>
      logger.write_string("rotate(\{angle}, \{cx}, \{cy})")
    SkewX(angle) => logger.write_string("skewX(\{angle})")
    SkewY(angle) => logger.write_string("skewY(\{angle})")
    Matrix(a, b, c, d, e, f) =>
      logger.write_string("matrix(\{a}, \{b}, \{c}, \{d}, \{e}, \{f})")
  }
}

///|
/// ToAttr implementation for Transform - creates a "transform" attribute
pub impl ToAttr for Transform with to_attr(self) {
  { name: "transform", value: self.to_string() }
}

///|
/// Build path data string from array of commands
pub fn path_data(commands : Array[PathCmd]) -> String {
  commands.map(fn(cmd) { cmd.to_string() }).join(" ")
}

///|
/// Build transform string from array of transforms
pub fn transform_list(transforms : Array[Transform]) -> String {
  transforms.map(fn(t) { t.to_string() }).join(" ")
}

// Path command constructors

///|
pub fn cmd_m(x : Double, y : Double) -> PathCmd {
  M(x, y)
}

///|
pub fn cmd_m_rel(x : Double, y : Double) -> PathCmd {
  M_rel(x, y)
}

///|
pub fn cmd_l(x : Double, y : Double) -> PathCmd {
  L(x, y)
}

///|
pub fn cmd_l_rel(x : Double, y : Double) -> PathCmd {
  L_rel(x, y)
}

///|
pub fn cmd_h(x : Double) -> PathCmd {
  H(x)
}

///|
pub fn cmd_h_rel(x : Double) -> PathCmd {
  H_rel(x)
}

///|
pub fn cmd_v(y : Double) -> PathCmd {
  V(y)
}

///|
pub fn cmd_v_rel(y : Double) -> PathCmd {
  V_rel(y)
}

///|
pub fn cmd_c(
  x1 : Double,
  y1 : Double,
  x2 : Double,
  y2 : Double,
  x : Double,
  y : Double,
) -> PathCmd {
  C(x1, y1, x2, y2, x, y)
}

///|
pub fn cmd_c_rel(
  x1 : Double,
  y1 : Double,
  x2 : Double,
  y2 : Double,
  x : Double,
  y : Double,
) -> PathCmd {
  C_rel(x1, y1, x2, y2, x, y)
}

///|
pub fn cmd_s(x2 : Double, y2 : Double, x : Double, y : Double) -> PathCmd {
  S(x2, y2, x, y)
}

///|
pub fn cmd_s_rel(x2 : Double, y2 : Double, x : Double, y : Double) -> PathCmd {
  S_rel(x2, y2, x, y)
}

///|
pub fn cmd_q(x1 : Double, y1 : Double, x : Double, y : Double) -> PathCmd {
  Q(x1, y1, x, y)
}

///|
pub fn cmd_q_rel(x1 : Double, y1 : Double, x : Double, y : Double) -> PathCmd {
  Q_rel(x1, y1, x, y)
}

///|
pub fn cmd_t(x : Double, y : Double) -> PathCmd {
  T(x, y)
}

///|
pub fn cmd_t_rel(x : Double, y : Double) -> PathCmd {
  T_rel(x, y)
}

///|
pub fn cmd_a(
  rx : Double,
  ry : Double,
  angle : Double,
  large_arc : Bool,
  sweep : Bool,
  x : Double,
  y : Double,
) -> PathCmd {
  A(rx, ry, angle, large_arc, sweep, x, y)
}

///|
pub fn cmd_a_rel(
  rx : Double,
  ry : Double,
  angle : Double,
  large_arc : Bool,
  sweep : Bool,
  x : Double,
  y : Double,
) -> PathCmd {
  A_rel(rx, ry, angle, large_arc, sweep, x, y)
}

///|
pub fn cmd_z() -> PathCmd {
  Z
}

// Transform constructors

///|
pub fn translate(tx : Double, ty : Double) -> Transform {
  Translate(tx, ty)
}

///|
pub fn scale(sx : Double, sy : Double) -> Transform {
  Scale(sx, sy)
}

///|
pub fn rotate(angle : Double) -> Transform {
  Rotate(angle, None)
}

///|
pub fn rotate_around(angle : Double, cx : Double, cy : Double) -> Transform {
  Rotate(angle, Some((cx, cy)))
}

///|
pub fn skew_x(angle : Double) -> Transform {
  SkewX(angle)
}

///|
pub fn skew_y(angle : Double) -> Transform {
  SkewY(angle)
}

///|
pub fn matrix(
  a : Double,
  b : Double,
  c : Double,
  d : Double,
  e : Double,
  f : Double,
) -> Transform {
  Matrix(a, b, c, d, e, f)
}
