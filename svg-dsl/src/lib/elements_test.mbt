// SVG DSL - Element Tests

///|
test "basic rect creation" {
  let r = @lib.rect(x=10.0, y=20.0, width=100.0, height=50.0)
  inspect(
    r,
    content="Rect(attrs=[{name: \"x\", value: \"10\"}, {name: \"y\", value: \"20\"}, {name: \"width\", value: \"100\"}, {name: \"height\", value: \"50\"}])",
  )
}

///|
test "rect with rounded corners" {
  let r = @lib.rect(
    x=0.0,
    y=0.0,
    width=100.0,
    height=100.0,
    rx=Some(5.0),
    ry=Some(5.0),
  )
  inspect(
    r,
    content="Rect(attrs=[{name: \"x\", value: \"0\"}, {name: \"y\", value: \"0\"}, {name: \"width\", value: \"100\"}, {name: \"height\", value: \"100\"}, {name: \"rx\", value: \"5\"}, {name: \"ry\", value: \"5\"}])",
  )
}

///|
test "basic circle creation" {
  let c = @lib.circle(cx=50.0, cy=50.0, r=25.0)
  inspect(
    c,
    content="Circle(attrs=[{name: \"cx\", value: \"50\"}, {name: \"cy\", value: \"50\"}, {name: \"r\", value: \"25\"}])",
  )
}

///|
test "basic line creation" {
  let l = @lib.line(x1=0.0, y1=0.0, x2=100.0, y2=100.0)
  inspect(
    l,
    content="Line(attrs=[{name: \"x1\", value: \"0\"}, {name: \"y1\", value: \"0\"}, {name: \"x2\", value: \"100\"}, {name: \"y2\", value: \"100\"}])",
  )
}

///|
test "text element" {
  let t = @lib.text("Hello", x=10.0, y=20.0)
  inspect(
    t,
    content="Text(content=\"Hello\", attrs=[{name: \"x\", value: \"10\"}, {name: \"y\", value: \"20\"}])",
  )
}

///|
test "polyline creation" {
  let p = @lib.polyline([(0.0, 0.0), (50.0, 25.0), (100.0, 0.0)])
  inspect(
    p,
    content="Polyline(attrs=[{name: \"points\", value: \"0,0 50,25 100,0\"}])",
  )
}

///|
test "path from commands" {
  let p = @lib.path_cmds([
    @lib.cmd_m(0.0, 0.0),
    @lib.cmd_l(100.0, 0.0),
    @lib.cmd_l(100.0, 100.0),
    @lib.cmd_z(),
  ])
  inspect(
    p,
    content="Path(attrs=[{name: \"d\", value: \"M0 0 L100 0 L100 100 Z\"}])",
  )
}

///|
test "fluent API - fill and stroke" {
  let r = @lib.rect(x=0.0, y=0.0, width=100.0, height=100.0)
    .fill("#3498db")
    .stroke("#2c3e50")
    .stroke_width(2.0)
  inspect(
    r,
    content="Rect(attrs=[{name: \"x\", value: \"0\"}, {name: \"y\", value: \"0\"}, {name: \"width\", value: \"100\"}, {name: \"height\", value: \"100\"}, {name: \"fill\", value: \"#3498db\"}, {name: \"stroke\", value: \"#2c3e50\"}, {name: \"stroke-width\", value: \"2\"}])",
  )
}

///|
test "group with children" {
  let group = @lib.g(children=[
    @lib.circle(cx=50.0, cy=50.0, r=25.0),
    @lib.rect(x=0.0, y=0.0, width=100.0, height=100.0),
  ])
  match group {
    @lib.SvgElement::G(children~, ..) => assert_eq(children.length(), 2)
    _ => fail("Expected G element")
  }
}

///|
test "add_child method" {
  let group = @lib.g()
    .add_child(@lib.circle(cx=0.0, cy=0.0, r=10.0))
    .add_child(@lib.rect())
  match group {
    @lib.SvgElement::G(children~, ..) => assert_eq(children.length(), 2)
    _ => fail("Expected G element")
  }
}

///|
test "svg root element" {
  let s = @lib.svg(
    width=800.0,
    height=600.0,
    view_box=Some((0.0, 0.0, 800.0, 600.0)),
    children=[@lib.rect()],
  )
  match s {
    @lib.SvgElement::Svg(attrs~, children~) => {
      assert_eq(children.length(), 1)
      // Check that xmlns is present
      let has_xmlns = attrs.iter().any(fn(a) { a.name == "xmlns" })
      assert_true(has_xmlns)
    }
    _ => fail("Expected Svg element")
  }
}

///|
test "transform attribute" {
  let r = @lib.rect().transform(@lib.translate(10.0, 20.0))
  match r {
    @lib.SvgElement::Rect(attrs~) => {
      let transform_attr = attrs
        .iter()
        .find_first(fn(a) { a.name == "transform" })
      match transform_attr {
        Some(a) => assert_eq(a.value, "translate(10, 20)")
        None => fail("Expected transform attribute")
      }
    }
    _ => fail("Expected Rect element")
  }
}

///|
test "marker element" {
  let m = @lib.marker(
    id="arrow",
    marker_width=10.0,
    marker_height=10.0,
    ref_x=9.0,
    ref_y=3.0,
    children=[@lib.polygon([(0.0, 0.0), (10.0, 3.0), (0.0, 6.0)])],
  )
  match m {
    @lib.SvgElement::Marker(attrs~, children~) => {
      assert_eq(children.length(), 1)
      let has_id = attrs
        .iter()
        .any(fn(a) { a.name == "id" && a.value == "arrow" })
      assert_true(has_id)
    }
    _ => fail("Expected Marker element")
  }
}
