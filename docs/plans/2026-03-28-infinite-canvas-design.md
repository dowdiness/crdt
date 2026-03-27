# Infinite Canvas — Design Spec

**Date:** 2026-03-28
**Scope:** `examples/canvas/` demo package
**Status:** Draft

## Goal

Build a standalone infinite canvas demo in MoonBit that proves out the canvas primitive: pan, zoom, and node drag over a set of static shape and text nodes. No CRDT, no persistence, no editor integration yet.

This is the foundation for the long-term goal: bidirectional embedding of the block editor and canvas (editor-in-canvas and canvas-in-editor).

---

## Architecture

### Rendering approach: DOM + CSS transforms

The canvas viewport is a `<div id="world">` with a single CSS transform:

```
transform: translate(panX px, panY px) scale(scale)
transform-origin: 0 0
```

Nodes are `position: absolute` children of `#world`, positioned at their world coordinates. Pan and zoom change only the transform string on `#world` — no node styles touched during viewport movement.

This approach is chosen over Canvas 2D because Canopy's nodes will eventually be live editor blocks (rich DOM content). CSS-transformed DOM nodes are the natural substrate for that future. Canvas 2D would require a DOM overlay hack for every interactive block.

### Hybrid upgrade path (future)

A `<canvas id="overlay">` sits above `#world` with `pointer-events: none`. It is present as a stub from day one. When selection handles, arrows, or decorations are needed, the render loop gains a `drawOverlay(state)` step without restructuring the DOM or the MoonBit state machine. This is the "hybrid" path: DOM for node content, Canvas 2D for decorations.

---

## Package structure

```
examples/canvas/
├── moon.pkg.json          # MoonBit package, no editor dependencies
├── canvas_state.mbt       # Types: CanvasState, Viewport, CanvasNode, InteractionState
├── canvas_update.mbt      # Pure update functions: pan, zoom, drag, select
├── canvas_init.mbt        # Default state + hardcoded seed nodes for demo
├── ffi.mbt                # JS externs (minimal)
├── index.html
└── src/
    ├── main.ts            # Bootstrap, event wiring, DOM patch loop
    └── vite.config.ts     # Mirrors examples/web setup
```

MoonBit owns all state and logic. TypeScript is a thin shell: forwards events in, reads state out, applies DOM changes.

---

## Data model

```moonbit
typealias NodeId = Int  // sequential counter, assigned at init

struct Viewport {
  x     : Float  // pan x (world origin in screen space)
  y     : Float  // pan y
  scale : Float  // zoom level, clamped to [0.1, 8.0]
}

struct CanvasNode {
  id   : NodeId
  x    : Float   // world coordinates
  y    : Float
  w    : Float
  h    : Float
  kind : NodeKind
}

enum NodeKind {
  Shape(color : String)   // filled rect
  Text(content : String)  // label
}

struct DragState {
  node_id  : NodeId
  offset_x : Float  // cursor-to-node-origin offset in world coords
  offset_y : Float
}

struct PanState {
  start_screen_x : Float
  start_screen_y : Float
  start_pan_x    : Float
  start_pan_y    : Float
}

struct InteractionState {
  dragging : Option[DragState]
  panning  : Option[PanState]
  selected : Option[NodeId]
}

struct CanvasState {
  viewport    : Viewport
  nodes       : Array[CanvasNode]
  interaction : InteractionState
}
```

---

## Coordinate system

Two coordinate spaces:

- **World space** — where nodes live. Invariant to pan/zoom.
- **Screen space** — what the user sees. Affected by viewport.

Conversions:

```
screen = world * scale + pan
world  = (screen - pan) / scale
```

Zoom toward cursor (keeps the point under cursor fixed):

```
new_scale = clamp(old_scale * factor, 0.1, 8.0)
pan.x     = cx + (pan.x - cx) * (new_scale / old_scale)
pan.y     = cy + (pan.y - cy) * (new_scale / old_scale)
scale     = new_scale
```

TypeScript handles the screen-to-world conversion before passing coordinates to MoonBit.

---

## Interaction model

### Pan
- `pointerdown` on background (not a node) → enter `PanState`, record `start_screen` and `start_pan`
- `pointermove` → `viewport.x = start_pan.x + (current_screen.x - start_screen.x)`  (absolute, avoids float drift)
- `pointerup` → clear `PanState`

### Zoom
- `wheel` at cursor `(cx, cy)` → compute new scale → adjust pan per formula above

### Node drag
- `pointerdown` on a node (identified by `data-node-id` attribute — free hit testing via DOM)
- TypeScript converts pointer screen coords to world coords, passes both to MoonBit
- MoonBit records `DragState { node_id, offset = node_pos - cursor_world }`
- `pointermove` → `node.x = cursor_world.x + offset.x; node.y = cursor_world.y + offset.y`
- `pointerup` → clear `DragState`

### Selection
- `pointerdown` on a node with no drag movement → set `selected = Some(node_id)`
- Visual highlight only (border or shadow). No action attached in this demo.

---

## Render loop & JS bridge

**Event-driven, not RAF-based.** Each event triggers: update MoonBit state → read state → patch DOM.

MoonBit exports (FFI surface):

```
init() → Unit                              // called once, sets up state
pan(dx, dy : Float) → Unit
zoom(delta : Float, cx, cy : Float) → Unit // cx, cy in screen coords
node_drag_start(id : NodeId, wx, wy : Float) → Unit
node_drag_move(wx, wy : Float) → Unit
pointer_up() → Unit
get_render_state() → String                // JSON: { viewport, nodes, selected }
```

TypeScript DOM patch after each event:
1. Set `#world` CSS transform from `viewport`
2. For each node in state: update `left`, `top`, `width`, `height` on matching `div`
3. Add/remove node `div`s only when the node list changes
4. Apply selection class to the selected node

---

## Demo content

`canvas_init.mbt` provides hardcoded seed nodes: a mix of colored rectangles and text labels arranged around the origin. No add/delete UI. The demo loads, you can pan/zoom/drag, done.

---

## Scope

**In scope:**
- Pan, zoom (clamped), node drag
- Shape nodes (filled rect)
- Text nodes (label)
- Click-to-select (visual only)
- Hybrid overlay stub (`<canvas id="overlay">` + no-op `drawOverlay`)

**Out of scope for this demo:**
- Add/delete nodes
- Undo
- Persistence or CRDT
- Resize handles
- Multi-select
- Connectors / arrows
- Rabbita or block editor integration
