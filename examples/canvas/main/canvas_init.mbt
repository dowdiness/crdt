///|
/// Global handle registry. Index = handle (Int returned by create_canvas).
let _registry : Array[CanvasState] = []

///|
pub fn create_canvas() -> Int {
  _registry.push(CanvasState::default())
  _registry.length() - 1
}

///|
/// Handle pointer-down. `node_id` is the canvas node id under the pointer,
/// or 0 for background. Dispatches to pan or drag start internally.
pub fn pointer_down(
  handle : Int,
  node_id : Int,
  sx : Double,
  sy : Double,
) -> Unit {
  let id : NodeId? = if node_id <= 0 { None } else { Some(NodeId(node_id)) }
  _registry[handle] = update_pointer_down(_registry[handle], id, sx, sy)
}

///|
/// Pointer-down on an output handle: start an edge-creation gesture.
pub fn pointer_down_handle(
  handle : Int,
  node_id : Int,
  port_id : String,
  sx : Double,
  sy : Double,
) -> Unit {
  let state = _registry[handle]
  let (wx, wy) = screen_to_world(state.viewport, sx, sy)
  _registry[handle] = update_connect_start(
    state,
    NodeId(node_id),
    port_id,
    wx,
    wy,
  )
}

///|
/// Handle pointer-move in canvas-local screen coordinates.
/// Routes to the active gesture (pan, drag, or connect) internally.
pub fn pointer_move(handle : Int, sx : Double, sy : Double) -> Unit {
  _registry[handle] = update_pointer_move(_registry[handle], sx, sy)
}

///|
pub fn zoom(handle : Int, delta : Double, cx : Double, cy : Double) -> Unit {
  _registry[handle] = update_zoom(_registry[handle], delta, cx, cy)
}

///|
pub fn pointer_up(
  handle : Int,
  node_id : Int,
  target_port_id : String,
  additive : Bool,
) -> Unit {
  _registry[handle] = update_pointer_up(
    _registry[handle],
    node_id,
    target_port_id,
    additive,
  )
}

///|
/// Add a workflow node from the library/context menu at canvas-local screen
/// coordinates. `kind_key` is intentionally string-based at the FFI boundary;
/// MoonBit converts it to an extensible `WorkflowNodeKind` inside the model.
pub fn add_node(
  handle : Int,
  kind_key : String,
  sx : Double,
  sy : Double,
) -> Unit {
  let state = _registry[handle]
  let (wx, wy) = screen_to_world(state.viewport, sx, sy)
  _registry[handle] = workflow_add_node(state, kind_key, wx, wy)
}

///|
/// Serializable node snapshot. Uses plain Int for `id` to avoid
/// the NodeId newtype wrapper appearing in JSON output.
struct NodeJson {
  id : Int
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
} derive(ToJson)

///|
struct EdgeJson {
  id : Int
  source : Int
  source_port : String
  target : Int
  target_port : String
} derive(ToJson)

///|
/// Serialized in-flight connection. `from` is the source node id;
/// `cursor_x`/`cursor_y` are world coordinates of the pointer.
struct ConnectingJson {
  from : Int
  from_port : String
  cursor_x : Double
  cursor_y : Double
} derive(ToJson)

///|
struct ValidationJson {
  severity : String
  message : String
  node_id : Int?
} derive(ToJson)

///|
/// Serializable render snapshot sent to TypeScript each RAF frame.
/// `selected`/`connecting` are absent (key omitted) when not active — MoonBit derive(ToJson) omits None keys.
/// TypeScript: use `rs.selected != null` (loose equality) not `rs.selected !== null`.
struct RenderStateJson {
  viewport : Viewport
  nodes : Array[NodeJson]
  edges : Array[EdgeJson]
  selected : Int?
  selected_nodes : Array[Int]
  connecting : ConnectingJson?
  validation : Array[ValidationJson]
  action_count : Int
} derive(ToJson)

///|
fn node_id_to_int(id : NodeId) -> Int {
  let NodeId(n) = id
  n
}

///|
fn input_has_edge(
  node : CanvasNode,
  input : PortDef,
  edges : Array[Edge],
) -> Bool {
  edges
  .iter()
  .any(fn(edge) { edge.target == node.id && edge.target_port == input.id })
}

///|
fn append_node_validation(
  messages : Array[ValidationJson],
  node : CanvasNode,
  edges : Array[Edge],
) -> Unit {
  let NodeId(id) = node.id
  if !node.configured {
    messages.push({
      severity: "warning",
      message: "Configure “\{node.title}” before running the workflow.",
      node_id: Some(id),
    })
  }
  for input in node.inputs {
    if !input_has_edge(node, input, edges) {
      messages.push({
        severity: "warning",
        message: "“\{node.title}” is waiting for input “\{input.label}”.",
        node_id: Some(id),
      })
    }
  }
}

///|
fn validate_workflow(state : CanvasState) -> Array[ValidationJson] {
  let messages : Array[ValidationJson] = []
  if state.nodes.length() == 0 {
    messages.push({
      severity: "error",
      message: "Add at least one workflow node.",
      node_id: None,
    })
  }
  for node in state.nodes {
    append_node_validation(messages, node, state.edges)
  }
  messages
}

///|
pub fn get_render_state(handle : Int) -> String {
  let state = _registry[handle]
  let selected : Int? = match state.interaction.selected {
    None => None
    Some(id) => Some(node_id_to_int(id))
  }
  let selected_nodes = state.interaction.selected_nodes.map(fn(id) {
    node_id_to_int(id)
  })
  let connecting : ConnectingJson? = match state.interaction.connecting {
    None => None
    Some(c) => {
      let NodeId(from) = c.from_node
      Some({
        from,
        from_port: c.from_port,
        cursor_x: c.cursor_x,
        cursor_y: c.cursor_y,
      })
    }
  }
  let nodes = state.nodes.map(fn(n) {
    let NodeId(id) = n.id
    (
      {
        id,
        x: n.x,
        y: n.y,
        w: n.w,
        h: n.h,
        kind: n.kind,
        title: n.title,
        subtitle: n.subtitle,
        inputs: n.inputs,
        outputs: n.outputs,
        configured: n.configured,
      } : NodeJson)
  })
  let edges = state.edges.map(fn(e) {
    let EdgeId(id) = e.id
    let NodeId(s) = e.source
    let NodeId(t) = e.target
    (
      {
        id,
        source: s,
        source_port: e.source_port,
        target: t,
        target_port: e.target_port,
      } : EdgeJson)
  })
  let rs : RenderStateJson = {
    viewport: state.viewport,
    nodes,
    edges,
    selected,
    selected_nodes,
    connecting,
    validation: validate_workflow(state),
    action_count: state.action_log.length(),
  }
  rs.to_json().stringify()
}

///|
pub fn get_action_log(handle : Int) -> String {
  _registry[handle].action_log.to_json().stringify()
}
