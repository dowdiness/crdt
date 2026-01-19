// SVG DSL - Attribute Builders
// Type-safe attribute construction functions

///|
/// Create a generic attribute
pub fn attr(name : String, value : String) -> Attr {
  { name, value }
}

// Presentation Attributes

///|
/// Fill color attribute
pub fn fill(color : String) -> Attr {
  { name: "fill", value: color }
}

///|
/// Stroke color attribute
pub fn stroke(color : String) -> Attr {
  { name: "stroke", value: color }
}

///|
/// Stroke width attribute
pub fn stroke_width(width : Double) -> Attr {
  { name: "stroke-width", value: width.to_string() }
}

///|
/// Stroke linecap attribute
pub fn stroke_linecap(cap : String) -> Attr {
  { name: "stroke-linecap", value: cap }
}

///|
/// Stroke linejoin attribute
pub fn stroke_linejoin(join : String) -> Attr {
  { name: "stroke-linejoin", value: join }
}

///|
/// Stroke dasharray attribute
pub fn stroke_dasharray(values : Array[Double]) -> Attr {
  let value = values.map(fn(v) { v.to_string() }).join(" ")
  { name: "stroke-dasharray", value }
}

///|
/// Opacity attribute
pub fn opacity(value : Double) -> Attr {
  { name: "opacity", value: value.to_string() }
}

///|
/// Fill opacity attribute
pub fn fill_opacity(value : Double) -> Attr {
  { name: "fill-opacity", value: value.to_string() }
}

///|
/// Stroke opacity attribute
pub fn stroke_opacity(value : Double) -> Attr {
  { name: "stroke-opacity", value: value.to_string() }
}

// Geometry Attributes

///|
/// x coordinate attribute
pub fn attr_x(value : Double) -> Attr {
  { name: "x", value: value.to_string() }
}

///|
/// y coordinate attribute
pub fn attr_y(value : Double) -> Attr {
  { name: "y", value: value.to_string() }
}

///|
/// cx (center x) attribute
pub fn attr_cx(value : Double) -> Attr {
  { name: "cx", value: value.to_string() }
}

///|
/// cy (center y) attribute
pub fn attr_cy(value : Double) -> Attr {
  { name: "cy", value: value.to_string() }
}

///|
/// r (radius) attribute
pub fn attr_r(value : Double) -> Attr {
  { name: "r", value: value.to_string() }
}

///|
/// rx (x radius) attribute
pub fn attr_rx(value : Double) -> Attr {
  { name: "rx", value: value.to_string() }
}

///|
/// ry (y radius) attribute
pub fn attr_ry(value : Double) -> Attr {
  { name: "ry", value: value.to_string() }
}

///|
/// width attribute
pub fn attr_width(value : Double) -> Attr {
  { name: "width", value: value.to_string() }
}

///|
/// height attribute
pub fn attr_height(value : Double) -> Attr {
  { name: "height", value: value.to_string() }
}

///|
/// x1 attribute (line start x)
pub fn attr_x1(value : Double) -> Attr {
  { name: "x1", value: value.to_string() }
}

///|
/// y1 attribute (line start y)
pub fn attr_y1(value : Double) -> Attr {
  { name: "y1", value: value.to_string() }
}

///|
/// x2 attribute (line end x)
pub fn attr_x2(value : Double) -> Attr {
  { name: "x2", value: value.to_string() }
}

///|
/// y2 attribute (line end y)
pub fn attr_y2(value : Double) -> Attr {
  { name: "y2", value: value.to_string() }
}

///|
/// points attribute for polyline/polygon
pub fn points(pts : Array[(Double, Double)]) -> Attr {
  let value = pts.map(fn(p) { "\{p.0},\{p.1}" }).join(" ")
  { name: "points", value }
}

///|
/// d attribute for path data
pub fn d(path_data : String) -> Attr {
  { name: "d", value: path_data }
}

///|
/// d attribute from path commands
pub fn d_cmds(commands : Array[PathCmd]) -> Attr {
  { name: "d", value: path_data(commands) }
}

// Text Attributes

///|
/// Font family attribute
pub fn font_family(family : String) -> Attr {
  { name: "font-family", value: family }
}

///|
/// Font size attribute
pub fn font_size(size : Double) -> Attr {
  { name: "font-size", value: size.to_string() }
}

///|
/// Font weight attribute
pub fn font_weight(weight : String) -> Attr {
  { name: "font-weight", value: weight }
}

///|
/// Text anchor attribute
pub fn text_anchor(anchor : String) -> Attr {
  { name: "text-anchor", value: anchor }
}

///|
/// Dominant baseline attribute
pub fn dominant_baseline(baseline : String) -> Attr {
  { name: "dominant-baseline", value: baseline }
}

// Transform Attribute

///|
/// Transform attribute from single transform
pub fn transform(t : Transform) -> Attr {
  { name: "transform", value: t.to_string() }
}

///|
/// Transform attribute from array of transforms
pub fn transforms(ts : Array[Transform]) -> Attr {
  { name: "transform", value: transform_list(ts) }
}

// SVG Container Attributes

///|
/// viewBox attribute
pub fn attr_view_box(
  min_x : Double,
  min_y : Double,
  vb_width : Double,
  vb_height : Double,
) -> Attr {
  { name: "viewBox", value: "\{min_x} \{min_y} \{vb_width} \{vb_height}" }
}

///|
/// xmlns attribute (SVG namespace)
pub fn xmlns() -> Attr {
  { name: "xmlns", value: "http://www.w3.org/2000/svg" }
}

///|
/// preserveAspectRatio attribute
pub fn preserve_aspect_ratio(value : String) -> Attr {
  { name: "preserveAspectRatio", value }
}

// Marker Attributes

///|
/// id attribute
pub fn attr_id(value : String) -> Attr {
  { name: "id", value }
}

///|
/// markerWidth attribute
pub fn attr_marker_width(value : Double) -> Attr {
  { name: "markerWidth", value: value.to_string() }
}

///|
/// markerHeight attribute
pub fn attr_marker_height(value : Double) -> Attr {
  { name: "markerHeight", value: value.to_string() }
}

///|
/// refX attribute
pub fn attr_ref_x(value : Double) -> Attr {
  { name: "refX", value: value.to_string() }
}

///|
/// refY attribute
pub fn attr_ref_y(value : Double) -> Attr {
  { name: "refY", value: value.to_string() }
}

///|
/// orient attribute
pub fn attr_orient(value : String) -> Attr {
  { name: "orient", value }
}

///|
/// marker-end attribute
pub fn marker_end(url : String) -> Attr {
  { name: "marker-end", value: "url(#\{url})" }
}

///|
/// marker-start attribute
pub fn marker_start(url : String) -> Attr {
  { name: "marker-start", value: "url(#\{url})" }
}

///|
/// marker-mid attribute
pub fn marker_mid(url : String) -> Attr {
  { name: "marker-mid", value: "url(#\{url})" }
}

// Use Element Attributes

///|
/// href attribute for use element
pub fn href(value : String) -> Attr {
  { name: "href", value: "#\{value}" }
}

// Class and Style

///|
/// class attribute
pub fn class_(value : String) -> Attr {
  { name: "class", value }
}

///|
/// style attribute
pub fn style(value : String) -> Attr {
  { name: "style", value }
}
