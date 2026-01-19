// SVG DSL - Renderer Tests

///|
test "render simple rect" {
  let r = @lib.rect(x=10.0, y=20.0, width=100.0, height=50.0)
  let svg_str = @lib.render_with_config(r, @lib.SvgConfig::compact())
  inspect(
    svg_str,
    content=(
      #|<rect x="10" y="20" width="100" height="50" />
      #|
    ),
  )
}

///|
test "render circle with style" {
  let c = @lib.circle(cx=50.0, cy=50.0, r=25.0).fill("red").stroke("black")
  let svg_str = @lib.render_with_config(c, @lib.SvgConfig::compact())
  inspect(
    svg_str,
    content=(
      #|<circle cx="50" cy="50" r="25" fill="red" stroke="black" />
      #|
    ),
  )
}

///|
test "render text with special characters" {
  let t = @lib.text("<Hello> & \"World\"", x=0.0, y=0.0)
  let svg_str = @lib.render_with_config(t, @lib.SvgConfig::compact())
  inspect(
    svg_str,
    content=(
      #|<text x="0" y="0">&lt;Hello&gt; &amp; "World"</text>
      #|
    ),
  )
}

///|
test "render group with children" {
  let g_elem = @lib.g(children=[
    @lib.circle(cx=0.0, cy=0.0, r=10.0).fill("blue"),
    @lib.rect(x=20.0, y=20.0, width=30.0, height=30.0).fill("green"),
  ])
  let svg_str = @lib.render_with_config(g_elem, @lib.SvgConfig::compact())
  inspect(
    svg_str,
    content=(
      #|<g>
      #|<circle cx="0" cy="0" r="10" fill="blue" />
      #|<rect x="20" y="20" width="30" height="30" fill="green" />
      #|</g>
      #|
    ),
  )
}

///|
test "render svg root with viewBox" {
  let s = @lib.svg_viewbox(0.0, 0.0, 100.0, 100.0, children=[
    @lib.circle(cx=50.0, cy=50.0, r=40.0),
  ])
  let svg_str = @lib.render_with_config(s, @lib.SvgConfig::compact())
  inspect(
    svg_str,
    content=(
      #|<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      #|<circle cx="50" cy="50" r="40" />
      #|</svg>
      #|
    ),
  )
}

///|
test "render with XML declaration" {
  let c = @lib.circle(cx=0.0, cy=0.0, r=10.0)
  let svg_str = @lib.render_with_config(
    c,
    @lib.SvgConfig::default().with_indent(0).with_xml_declaration(true),
  )
  inspect(
    svg_str,
    content=(
      #|<?xml version="1.0" encoding="UTF-8"?>
      #|<circle cx="0" cy="0" r="10" />
      #|
    ),
  )
}

///|
test "render path with commands" {
  let p = @lib.path_cmds([
    @lib.cmd_m(0.0, 0.0),
    @lib.cmd_l(100.0, 0.0),
    @lib.cmd_l(50.0, 100.0),
    @lib.cmd_z(),
  ])
  let svg_str = @lib.render_with_config(p, @lib.SvgConfig::compact())
  inspect(
    svg_str,
    content=(
      #|<path d="M0 0 L100 0 L50 100 Z" />
      #|
    ),
  )
}

///|
test "render polyline" {
  let p = @lib.polyline([(0.0, 0.0), (50.0, 25.0), (100.0, 0.0)])
    .fill("none")
    .stroke("black")
  let svg_str = @lib.render_with_config(p, @lib.SvgConfig::compact())
  inspect(
    svg_str,
    content=(
      #|<polyline points="0,0 50,25 100,0" fill="none" stroke="black" />
      #|
    ),
  )
}

///|
test "render defs with marker" {
  let d = @lib.defs(children=[
    @lib.marker(
      id="arrow",
      marker_width=10.0,
      marker_height=10.0,
      ref_x=9.0,
      ref_y=3.0,
      orient="auto",
      children=[
        @lib.polygon([(0.0, 0.0), (10.0, 3.0), (0.0, 6.0)]).fill("black"),
      ],
    ),
  ])
  let svg_str = @lib.render_with_config(d, @lib.SvgConfig::compact())
  inspect(
    svg_str,
    content=(
      #|<defs>
      #|<marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      #|<polygon points="0,0 10,3 0,6" fill="black" />
      #|</marker>
      #|</defs>
      #|
    ),
  )
}

///|
test "render with indentation" {
  let s = @lib.svg_viewbox(0.0, 0.0, 100.0, 100.0, children=[
    @lib.circle(cx=50.0, cy=50.0, r=40.0),
  ])
  let svg_str = @lib.render_with_config(
    s,
    @lib.SvgConfig::default().with_xml_declaration(false),
  )
  inspect(
    svg_str,
    content=(
      #|<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      #|  <circle cx="50" cy="50" r="40" />
      #|</svg>
      #|
    ),
  )
}

///|
test "render raw content" {
  let r = @lib.raw("<custom-element attr=\"value\" />")
  let svg_str = @lib.render_with_config(r, @lib.SvgConfig::compact())
  inspect(
    svg_str,
    content=(
      #|<custom-element attr="value" />
      #|
    ),
  )
}

///|
test "render line with marker" {
  let l = @lib.line(x1=0.0, y1=0.0, x2=100.0, y2=100.0)
    .stroke("black")
    .with_attr(@lib.marker_end("arrow"))
  let svg_str = @lib.render_with_config(l, @lib.SvgConfig::compact())
  inspect(
    svg_str,
    content=(
      #|<line x1="0" y1="0" x2="100" y2="100" stroke="black" marker-end="url(#arrow)" />
      #|
    ),
  )
}

///|
test "render use element" {
  let u = @lib.use_("my-shape", x=100.0, y=100.0)
  let svg_str = @lib.render_with_config(u, @lib.SvgConfig::compact())
  inspect(
    svg_str,
    content=(
      #|<use href="#my-shape" x="100" y="100" />
      #|
    ),
  )
}

///|
test "render ellipse" {
  let e = @lib.ellipse(cx=100.0, cy=50.0, rx=80.0, ry=40.0)
    .fill("yellow")
    .stroke("orange")
  let svg_str = @lib.render_with_config(e, @lib.SvgConfig::compact())
  inspect(
    svg_str,
    content=(
      #|<ellipse cx="100" cy="50" rx="80" ry="40" fill="yellow" stroke="orange" />
      #|
    ),
  )
}

///|
test "render complete diagram" {
  let diagram = @lib.svg(width=200.0, height=200.0, children=[
    @lib.defs(children=[
      @lib.marker(
        id="arrow",
        marker_width=10.0,
        marker_height=10.0,
        ref_x=9.0,
        ref_y=3.0,
        children=[
          @lib.polygon([(0.0, 0.0), (10.0, 3.0), (0.0, 6.0)]).fill("#666"),
        ],
      ),
    ]),
    @lib.rect(x=10.0, y=10.0, width=80.0, height=40.0)
    .fill("#fff")
    .stroke("#333")
    .stroke_width(2.0),
    @lib.text("Node A", x=50.0, y=35.0),
    @lib.line(x1=50.0, y1=50.0, x2=50.0, y2=100.0)
    .stroke("#666")
    .with_attr(@lib.marker_end("arrow")),
    @lib.rect(x=10.0, y=110.0, width=80.0, height=40.0)
    .fill("#fff")
    .stroke("#333")
    .stroke_width(2.0),
    @lib.text("Node B", x=50.0, y=135.0),
  ])
  let svg_str = @lib.render_for_html(diagram)
  // Just verify it renders without error and contains expected elements
  assert_true(svg_str.contains("<svg"))
  assert_true(svg_str.contains("</svg>"))
  assert_true(svg_str.contains("Node A"))
  assert_true(svg_str.contains("Node B"))
  assert_true(svg_str.contains("<marker"))
}
