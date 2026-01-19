# svg-dsl

SVG DSL for programmatic SVG generation in MoonBit.

## Install

Add the package to your `moon.pkg.json` imports:

```json
{
  "import": [
    { "path": "antisatori/svg-dsl/lib", "alias": "svg" }
  ]
}
```

## Usage

Build an element tree and render it to a string:

```mbt
let logo =
  @svg.svg_viewbox(0.0, 0.0, 200.0, 120.0, children=[
    @svg.rect(x=10.0, y=10.0, width=180.0, height=100.0)
      .stroke("#222")
      .stroke_width(2.0)
      .fill("none"),
    @svg.circle(cx=60.0, cy=60.0, r=30.0).fill("#e74c3c"),
    @svg.text("SVG DSL", x=110.0, y=70.0).with_attrs([
      @svg.font_family("Georgia"),
      @svg.font_size(20.0),
      @svg.text_anchor("middle"),
    ]),
  ])

let svg_str = @svg.render_for_html(logo)
```

## Highlights

- Element constructors for common SVG tags (`svg`, `g`, `rect`, `path`, `text`, ...)
- Typed attribute helpers (`fill`, `stroke`, `transform`, `marker_end`, ...)
- Path commands via `PathCmd` helpers (`cmd_m`, `cmd_l`, `cmd_c`, ...)
- Renderers for pretty/compact/HTML-safe output
- XML escaping built into text and attributes

## Rendering Options

Use the convenience helpers or pass a custom `SvgConfig`:

```mbt
let svg_compact = @svg.render_compact(logo)
let svg_pretty = @svg.render_with_config(logo, @svg.SvgConfig::default())
```

## Escape Hatch

If you need an unsupported element or raw markup:

```mbt
let node = @svg.raw("<custom-tag data=\"1\" />")
```
