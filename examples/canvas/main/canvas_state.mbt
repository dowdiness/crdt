///|
/// Opaque integer ID for canvas nodes.
/// Uses tuple-struct pattern from projection/types.mbt.
pub struct NodeId(Int) derive(Show, Eq, ToJson)

///|
/// Visual kind of a node.
pub enum NodeKind {
  /// Filled rectangle. `color` is a CSS color string (e.g. "#8250df").
  Shape(String)
  /// Text label. `content` is the displayed string.
  Text(String)
} derive(Show, Eq, ToJson)

///|
/// Pan and zoom state of the canvas viewport.
/// `x` and `y` are the world origin in canvas-local screen space.
pub(all) struct Viewport {
  x     : Double
  y     : Double
  scale : Double
} derive(Show, Eq, ToJson)

///|
/// A single node on the canvas. Coordinates are in world space.
pub(all) struct CanvasNode {
  id   : NodeId
  x    : Double
  y    : Double
  w    : Double
  h    : Double
  kind : NodeKind
} derive(Show, Eq)

///|
/// State captured at the start of a node drag gesture.
pub(all) struct DragState {
  node_id  : NodeId
  /// Offset from cursor world position to node origin (node.x - cursor.x at drag start).
  offset_x : Double
  offset_y : Double
} derive(Show, Eq)

///|
/// State captured at the start of a pan gesture.
pub(all) struct PanState {
  start_screen_x : Double
  start_screen_y : Double
  start_pan_x    : Double
  start_pan_y    : Double
} derive(Show, Eq)

///|
pub(all) struct InteractionState {
  dragging     : DragState?
  panning      : PanState?
  selected     : NodeId?
  /// True from pointerdown until pointerup.
  pointer_down : Bool
  /// True once pointermove fires during the current pointer session.
  did_move     : Bool
} derive(Show, Eq)

///|
pub(all) struct CanvasState {
  viewport    : Viewport
  nodes       : Array[CanvasNode]
  interaction : InteractionState
} derive(Show)
