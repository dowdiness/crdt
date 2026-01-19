// SVG DSL - Element Constructors
// Functions for creating SVG elements with a fluent API

///|
/// Create an SVG root element
pub fn svg(
  width? : Double = 100.0,
  height? : Double = 100.0,
  view_box? : (Double, Double, Double, Double)? = None,
  children? : Array[SvgElement] = [],
) -> SvgElement {
  let attrs : Array[Attr] = [xmlns(), attr_width(width), attr_height(height)]
  match view_box {
    Some((min_x, min_y, vb_width, vb_height)) =>
      attrs.push(attr_view_box(min_x, min_y, vb_width, vb_height))
    None => ()
  }
  Svg(attrs~, children~)
}

///|
/// Create an SVG root element with viewBox only (responsive)
pub fn svg_viewbox(
  min_x : Double,
  min_y : Double,
  vb_width : Double,
  vb_height : Double,
  children? : Array[SvgElement] = [],
) -> SvgElement {
  let attrs : Array[Attr] = [
    xmlns(),
    attr_view_box(min_x, min_y, vb_width, vb_height),
  ]
  Svg(attrs~, children~)
}

///|
/// Create a group element
pub fn g(
  attrs? : Array[Attr] = [],
  children? : Array[SvgElement] = [],
) -> SvgElement {
  G(attrs~, children~)
}

///|
/// Create a defs element
pub fn defs(children? : Array[SvgElement] = []) -> SvgElement {
  Defs(children~)
}

///|
/// Create a rectangle element
pub fn rect(
  x? : Double = 0.0,
  y? : Double = 0.0,
  width? : Double = 100.0,
  height? : Double = 100.0,
  rx? : Double? = None,
  ry? : Double? = None,
) -> SvgElement {
  let attrs : Array[Attr] = [
    attr_x(x),
    attr_y(y),
    attr_width(width),
    attr_height(height),
  ]
  match rx {
    Some(v) => attrs.push(attr_rx(v))
    None => ()
  }
  match ry {
    Some(v) => attrs.push(attr_ry(v))
    None => ()
  }
  Rect(attrs~)
}

///|
/// Create a circle element
pub fn circle(
  cx? : Double = 0.0,
  cy? : Double = 0.0,
  r? : Double = 50.0,
) -> SvgElement {
  let attrs : Array[Attr] = [attr_cx(cx), attr_cy(cy), attr_r(r)]
  Circle(attrs~)
}

///|
/// Create an ellipse element
pub fn ellipse(
  cx? : Double = 0.0,
  cy? : Double = 0.0,
  rx? : Double = 50.0,
  ry? : Double = 25.0,
) -> SvgElement {
  let attrs : Array[Attr] = [attr_cx(cx), attr_cy(cy), attr_rx(rx), attr_ry(ry)]
  Ellipse(attrs~)
}

///|
/// Create a line element
pub fn line(
  x1? : Double = 0.0,
  y1? : Double = 0.0,
  x2? : Double = 100.0,
  y2? : Double = 100.0,
) -> SvgElement {
  let attrs : Array[Attr] = [attr_x1(x1), attr_y1(y1), attr_x2(x2), attr_y2(y2)]
  Line(attrs~)
}

///|
/// Create a polyline element
pub fn polyline(pts : Array[(Double, Double)]) -> SvgElement {
  let attrs : Array[Attr] = [points(pts)]
  Polyline(attrs~)
}

///|
/// Create a polygon element
pub fn polygon(pts : Array[(Double, Double)]) -> SvgElement {
  let attrs : Array[Attr] = [points(pts)]
  Polygon(attrs~)
}

///|
/// Create a path element from path data string
pub fn path(path_data : String) -> SvgElement {
  let attrs : Array[Attr] = [d(path_data)]
  Path(attrs~)
}

///|
/// Create a path element from path commands
pub fn path_cmds(commands : Array[PathCmd]) -> SvgElement {
  let attrs : Array[Attr] = [d_cmds(commands)]
  Path(attrs~)
}

///|
/// Create a text element
pub fn text(
  content : String,
  x? : Double = 0.0,
  y? : Double = 0.0,
) -> SvgElement {
  let attrs : Array[Attr] = [attr_x(x), attr_y(y)]
  Text(content~, attrs~)
}

///|
/// Create a marker element
pub fn marker(
  id~ : String,
  marker_width? : Double = 10.0,
  marker_height? : Double = 10.0,
  ref_x? : Double = 0.0,
  ref_y? : Double = 0.0,
  orient? : String = "auto",
  children? : Array[SvgElement] = [],
) -> SvgElement {
  let attrs : Array[Attr] = [
    attr_id(id),
    attr_marker_width(marker_width),
    attr_marker_height(marker_height),
    attr_ref_x(ref_x),
    attr_ref_y(ref_y),
    attr_orient(orient),
  ]
  Marker(attrs~, children~)
}

///|
/// Create a use element
pub fn use_(
  ref_id : String,
  x? : Double = 0.0,
  y? : Double = 0.0,
) -> SvgElement {
  let attrs : Array[Attr] = [href(ref_id), attr_x(x), attr_y(y)]
  Use(attrs~)
}

///|
/// Create raw SVG content
pub fn raw(content : String) -> SvgElement {
  Raw(content~)
}

// Fluent API - Methods for modifying elements

///|
/// Add an attribute to an element
pub fn SvgElement::with_attr(self : SvgElement, attr : Attr) -> SvgElement {
  match self {
    Svg(attrs~, children~) => {
      let new_attrs = attrs.copy()
      new_attrs.push(attr)
      Svg(attrs=new_attrs, children~)
    }
    G(attrs~, children~) => {
      let new_attrs = attrs.copy()
      new_attrs.push(attr)
      G(attrs=new_attrs, children~)
    }
    Defs(children~) => Defs(children~) // Defs doesn't have attrs
    Rect(attrs~) => {
      let new_attrs = attrs.copy()
      new_attrs.push(attr)
      Rect(attrs=new_attrs)
    }
    Circle(attrs~) => {
      let new_attrs = attrs.copy()
      new_attrs.push(attr)
      Circle(attrs=new_attrs)
    }
    Ellipse(attrs~) => {
      let new_attrs = attrs.copy()
      new_attrs.push(attr)
      Ellipse(attrs=new_attrs)
    }
    Line(attrs~) => {
      let new_attrs = attrs.copy()
      new_attrs.push(attr)
      Line(attrs=new_attrs)
    }
    Polyline(attrs~) => {
      let new_attrs = attrs.copy()
      new_attrs.push(attr)
      Polyline(attrs=new_attrs)
    }
    Polygon(attrs~) => {
      let new_attrs = attrs.copy()
      new_attrs.push(attr)
      Polygon(attrs=new_attrs)
    }
    Path(attrs~) => {
      let new_attrs = attrs.copy()
      new_attrs.push(attr)
      Path(attrs=new_attrs)
    }
    Text(content~, attrs~) => {
      let new_attrs = attrs.copy()
      new_attrs.push(attr)
      Text(content~, attrs=new_attrs)
    }
    Marker(attrs~, children~) => {
      let new_attrs = attrs.copy()
      new_attrs.push(attr)
      Marker(attrs=new_attrs, children~)
    }
    Use(attrs~) => {
      let new_attrs = attrs.copy()
      new_attrs.push(attr)
      Use(attrs=new_attrs)
    }
    Raw(content~) => Raw(content~) // Raw doesn't have attrs
  }
}

///|
/// Add multiple attributes to an element
pub fn SvgElement::with_attrs(
  self : SvgElement,
  new_attrs : Array[Attr],
) -> SvgElement {
  let mut result = self
  for attr in new_attrs {
    result = result.with_attr(attr)
  }
  result
}

///|
/// Set fill color
pub fn SvgElement::fill(self : SvgElement, color : String) -> SvgElement {
  self.with_attr(fill(color))
}

///|
/// Set stroke color
pub fn SvgElement::stroke(self : SvgElement, color : String) -> SvgElement {
  self.with_attr(stroke(color))
}

///|
/// Set stroke width
pub fn SvgElement::stroke_width(
  self : SvgElement,
  width_val : Double,
) -> SvgElement {
  self.with_attr(stroke_width(width_val))
}

///|
/// Set opacity
pub fn SvgElement::opacity(self : SvgElement, value : Double) -> SvgElement {
  self.with_attr(opacity(value))
}

///|
/// Set transform using the ToAttr trait
pub fn SvgElement::transform(self : SvgElement, t : Transform) -> SvgElement {
  self.with_attr(t.to_attr())
}

///|
/// Set multiple transforms
pub fn SvgElement::transforms(
  self : SvgElement,
  ts : Array[Transform],
) -> SvgElement {
  self.with_attr(transforms(ts))
}

///|
/// Set id attribute
pub fn SvgElement::id(self : SvgElement, value : String) -> SvgElement {
  self.with_attr(attr_id(value))
}

///|
/// Set class attribute
pub fn SvgElement::class_(self : SvgElement, value : String) -> SvgElement {
  self.with_attr(class_(value))
}

///|
/// Add a child element to a container element
pub fn SvgElement::add_child(
  self : SvgElement,
  child : SvgElement,
) -> SvgElement {
  match self {
    Svg(attrs~, children~) => {
      let new_children = children.copy()
      new_children.push(child)
      Svg(attrs~, children=new_children)
    }
    G(attrs~, children~) => {
      let new_children = children.copy()
      new_children.push(child)
      G(attrs~, children=new_children)
    }
    Defs(children~) => {
      let new_children = children.copy()
      new_children.push(child)
      Defs(children=new_children)
    }
    Marker(attrs~, children~) => {
      let new_children = children.copy()
      new_children.push(child)
      Marker(attrs~, children=new_children)
    }
    _ => self // Non-container elements ignore children
  }
}

///|
/// Add multiple children to a container element
pub fn SvgElement::add_children(
  self : SvgElement,
  new_children : Array[SvgElement],
) -> SvgElement {
  let mut result = self
  for child in new_children {
    result = result.add_child(child)
  }
  result
}
