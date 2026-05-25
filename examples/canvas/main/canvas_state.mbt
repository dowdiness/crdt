///|
/// Opaque integer ID for canvas nodes.
/// Uses tuple-struct pattern from projection/types.mbt.
pub struct NodeId(Int) derive(Debug, Eq, ToJson)

///|
pub impl Show for NodeId with fn output(self, logger) {
  logger.write_string(@debug.to_string(self))
}

///|
pub struct EdgeId(Int) derive(Debug, Eq, ToJson)

///|
pub impl Show for EdgeId with fn output(self, logger) {
  logger.write_string(@debug.to_string(self))
}

///|
/// Logical data carried by workflow ports. `Any` is reserved for custom nodes
/// and future adapters; built-in workflow nodes use concrete types.
pub enum PortType {
  Flow
  Text
  Number
  Boolean
  Json
  Any
} derive(Debug, Eq, ToJson)

///|
pub impl Show for PortType with fn output(self, logger) {
  logger.write_string(@debug.to_string(self))
}

///|
pub(all) struct PortDef {
  id : String
  label : String
  port_type : PortType
} derive(Debug, Eq, ToJson)

///|
pub impl Show for PortDef with fn output(self, logger) {
  logger.write_string(@debug.to_string(self))
}

///|
/// Built-in workflow templates. `Custom` keeps the canvas extensible without
/// hard-coding application-specific integrations into the visual layer.
pub enum WorkflowNodeKind {
  TimerTrigger
  HttpRequest
  DataFormatter
  ConditionalBranch
  Loop
  Parallel
  Custom(String)
} derive(Debug, Eq, ToJson)

///|
pub impl Show for WorkflowNodeKind with fn output(self, logger) {
  logger.write_string(@debug.to_string(self))
}

///|
/// Visual kind of a node. The canvas stays generic by representing application
/// behavior through workflow metadata rather than embedding executor logic here.
pub enum NodeKind {
  /// Workflow step rendered with typed ports and validation state.
  Workflow(WorkflowNodeKind)
} derive(Debug, Eq, ToJson)

///|
pub impl Show for NodeKind with fn output(self, logger) {
  logger.write_string(@debug.to_string(self))
}

///|
/// Pan and zoom state of the canvas viewport.
/// `x` and `y` are the world origin in canvas-local screen space.
pub(all) struct Viewport {
  x : Double
  y : Double
  scale : Double
} derive(Debug, Eq, ToJson)

///|
pub impl Show for Viewport with fn output(self, logger) {
  logger.write_string(@debug.to_string(self))
}

///|
/// A single node on the canvas. Coordinates are in world space. The visual
/// editor owns layout and display state; executable behavior lives in a future
/// compiler/execution layer keyed by `kind` and ports.
pub(all) struct CanvasNode {
  id : NodeId
  x : Double
  y : Double
  w : Double
  h : Double
  kind : NodeKind
  title : String
  subtitle : String
  inputs : Array[PortDef]
  outputs : Array[PortDef]
  configured : Bool
} derive(Debug, Eq, ToJson)

///|
pub impl Show for CanvasNode with fn output(self, logger) {
  logger.write_string(@debug.to_string(self))
}

///|
pub(all) struct NodePosition {
  node_id : NodeId
  x : Double
  y : Double
} derive(Debug, Eq, ToJson)

///|
pub impl Show for NodePosition with fn output(self, logger) {
  logger.write_string(@debug.to_string(self))
}

///|
/// Serializable user operations. UI event handlers translate pointer/menu
/// events into these values before committing durable graph changes, which keeps
/// undo/redo, logging, persistence, and collaboration on the same path.
pub enum WorkflowAction {
  AddNode(CanvasNode)
  MoveNodes(Array[NodePosition])
  ConnectPorts(NodeId, String, NodeId, String)
  SelectNodes(Array[NodeId])
  SetViewport(Viewport)
} derive(Debug, Eq, ToJson)

///|
pub impl Show for WorkflowAction with fn output(self, logger) {
  logger.write_string(@debug.to_string(self))
}

///|
pub(all) struct DragOrigin {
  node_id : NodeId
  offset_x : Double
  offset_y : Double
} derive(Debug, Eq)

///|
pub impl Show for DragOrigin with fn output(self, logger) {
  logger.write_string(@debug.to_string(self))
}

///|
/// State captured at the start of a node drag gesture.
pub(all) struct DragState {
  node_id : NodeId
  origins : Array[DragOrigin]
} derive(Debug, Eq)

///|
pub impl Show for DragState with fn output(self, logger) {
  logger.write_string(@debug.to_string(self))
}

///|
/// State captured at the start of a pan gesture.
pub(all) struct PanState {
  start_screen_x : Double
  start_screen_y : Double
  start_pan_x : Double
  start_pan_y : Double
} derive(Debug, Eq)

///|
pub impl Show for PanState with fn output(self, logger) {
  logger.write_string(@debug.to_string(self))
}

///|
/// A typed connection between two workflow ports.
pub(all) struct Edge {
  id : EdgeId
  source : NodeId
  source_port : String
  target : NodeId
  target_port : String
} derive(Debug, Eq, ToJson)

///|
pub impl Show for Edge with fn output(self, logger) {
  logger.write_string(@debug.to_string(self))
}

///|
/// In-flight connection started from a node's output handle.
/// `cursor_x`/`cursor_y` are world coordinates of the pointer.
pub(all) struct ConnectState {
  from_node : NodeId
  from_port : String
  cursor_x : Double
  cursor_y : Double
} derive(Debug, Eq)

///|
pub impl Show for ConnectState with fn output(self, logger) {
  logger.write_string(@debug.to_string(self))
}

///|
pub(all) struct InteractionState {
  dragging : DragState?
  panning : PanState?
  connecting : ConnectState?
  selected : NodeId?
  selected_nodes : Array[NodeId]
  /// True from pointerdown until pointerup.
  pointer_down : Bool
  /// True once pointermove fires during the current pointer session.
  did_move : Bool
} derive(Debug, Eq)

///|
pub impl Show for InteractionState with fn output(self, logger) {
  logger.write_string(@debug.to_string(self))
}

///|
pub(all) struct CanvasState {
  viewport : Viewport
  nodes : Array[CanvasNode]
  edges : Array[Edge]
  next_node_id : Int
  /// Monotonic counter used to mint EdgeIds for newly-created connections.
  next_edge_id : Int
  interaction : InteractionState
  action_log : Array[WorkflowAction]
} derive(Debug)

///|
pub impl Show for CanvasState with fn output(self, logger) {
  logger.write_string(@debug.to_string(self))
}

///|
fn port(id : String, label : String, port_type : PortType) -> PortDef {
  { id, label, port_type }
}

///|
fn make_workflow_node(
  id : NodeId,
  kind : WorkflowNodeKind,
  x : Double,
  y : Double,
) -> CanvasNode {
  match kind {
    TimerTrigger =>
      {
        id,
        x,
        y,
        w: 244.0,
        h: 132.0,
        kind: NodeKind::Workflow(TimerTrigger),
        title: "Timer trigger",
        subtitle: "Starts a workflow on a schedule",
        inputs: [],
        outputs: [port("tick", "tick", Flow)],
        configured: true,
      }
    HttpRequest =>
      {
        id,
        x,
        y,
        w: 260.0,
        h: 148.0,
        kind: NodeKind::Workflow(HttpRequest),
        title: "HTTP request",
        subtitle: "Call an API and emit JSON",
        inputs: [port("in", "flow", Flow)],
        outputs: [port("json", "JSON", Json)],
        configured: false,
      }
    DataFormatter =>
      {
        id,
        x,
        y,
        w: 260.0,
        h: 148.0,
        kind: NodeKind::Workflow(DataFormatter),
        title: "Format data",
        subtitle: "Map JSON fields into text",
        inputs: [port("json", "JSON", Json)],
        outputs: [port("text", "text", Text)],
        configured: true,
      }
    ConditionalBranch =>
      {
        id,
        x,
        y,
        w: 270.0,
        h: 156.0,
        kind: NodeKind::Workflow(ConditionalBranch),
        title: "Condition",
        subtitle: "Route items by a boolean rule",
        inputs: [port("text", "text", Text), port("rule", "rule", Boolean)],
        outputs: [port("true", "true", Flow), port("false", "false", Flow)],
        configured: true,
      }
    Loop =>
      {
        id,
        x,
        y,
        w: 244.0,
        h: 132.0,
        kind: NodeKind::Workflow(Loop),
        title: "Loop",
        subtitle: "Repeat work over a collection",
        inputs: [port("items", "items", Json)],
        outputs: [port("each", "each", Json), port("count", "count", Number)],
        configured: true,
      }
    Parallel =>
      {
        id,
        x,
        y,
        w: 244.0,
        h: 132.0,
        kind: NodeKind::Workflow(Parallel),
        title: "Parallel split",
        subtitle: "Run independent branches together",
        inputs: [port("in", "flow", Flow)],
        outputs: [port("a", "A", Flow), port("b", "B", Flow)],
        configured: true,
      }
    Custom(name) =>
      {
        id,
        x,
        y,
        w: 250.0,
        h: 138.0,
        kind: NodeKind::Workflow(Custom(name)),
        title: name,
        subtitle: "Custom workflow step",
        inputs: [port("in", "any", Any)],
        outputs: [port("out", "any", Any)],
        configured: false,
      }
  }
}

///|
fn workflow_node_kind_from_key(key : String) -> WorkflowNodeKind {
  if key == "timer" {
    TimerTrigger
  } else if key == "http" {
    HttpRequest
  } else if key == "formatter" {
    DataFormatter
  } else if key == "condition" {
    ConditionalBranch
  } else if key == "loop" {
    Loop
  } else if key == "parallel" {
    Parallel
  } else {
    Custom("Custom step")
  }
}

///|
fn empty_interaction() -> InteractionState {
  {
    dragging: None,
    panning: None,
    connecting: None,
    selected: None,
    selected_nodes: [],
    pointer_down: false,
    did_move: false,
  }
}

///|
/// Default state centers the world origin in a 1440×800 browser viewport
/// and seeds a typed workflow that exercises sequence, transformation, branch,
/// loop, and parallel-flow concepts.
pub impl Default for CanvasState with fn default() -> CanvasState {
  let nodes = [
    make_workflow_node(NodeId(1), TimerTrigger, -520.0, -190.0),
    make_workflow_node(NodeId(2), HttpRequest, -190.0, -190.0),
    make_workflow_node(NodeId(3), DataFormatter, 155.0, -190.0),
    make_workflow_node(NodeId(4), ConditionalBranch, 500.0, -190.0),
    make_workflow_node(NodeId(5), Loop, 150.0, 60.0),
    make_workflow_node(NodeId(6), Parallel, 500.0, 70.0),
  ]
  {
    viewport: { x: 760.0, y: 330.0, scale: 0.75 },
    nodes,
    edges: [
      {
        id: EdgeId(1),
        source: NodeId(1),
        source_port: "tick",
        target: NodeId(2),
        target_port: "in",
      },
      {
        id: EdgeId(2),
        source: NodeId(2),
        source_port: "json",
        target: NodeId(3),
        target_port: "json",
      },
      {
        id: EdgeId(3),
        source: NodeId(3),
        source_port: "text",
        target: NodeId(4),
        target_port: "text",
      },
    ],
    next_node_id: 7,
    next_edge_id: 4,
    interaction: empty_interaction(),
    action_log: [],
  }
}
