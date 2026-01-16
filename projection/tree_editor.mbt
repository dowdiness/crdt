// Interactive Tree Editor: Data structures and operations for the unified tree editor
// Combines visualization + editing in one component

///|
/// Interactive tree node with editing state
pub struct InteractiveTreeNode {
  id : NodeId
  kind : @parser.TermKind
  label : String
  children : Array[InteractiveTreeNode]
  /// Currently selected
  selected : Bool
  /// Inline editing active
  editing : Bool
  /// Subtree collapsed
  collapsed : Bool
  /// Valid drop zone
  drop_target : Bool
  /// Corresponding text range
  text_range : Range
} derive(Show)

///|
/// Create an interactive tree node from a TermNode
pub fn InteractiveTreeNode::from_term_node(
  node : @parser.TermNode,
  source_map : SourceMap,
) -> InteractiveTreeNode {
  let node_id = NodeId(node.node_id)
  let text_range = match source_map.get_range(node_id) {
    Some(range) => range
    None => Range::new(node.start, node.end)
  }
  let children : Array[InteractiveTreeNode] = []
  for child in node.children {
    children.push(InteractiveTreeNode::from_term_node(child, source_map))
  }
  {
    id: node_id,
    kind: node.kind,
    label: get_node_label(node.kind),
    children,
    selected: false,
    editing: false,
    collapsed: false,
    drop_target: false,
    text_range,
  }
}

///|
/// Get display label for a node kind
fn get_node_label(kind : TermKind) -> String {
  match kind {
    Int(n) => n.to_string()
    Var(name) => name
    Lam(param) => "λ" + param
    App => "App"
    Bop(op) => op.to_string()
    If => "if"
    Error(msg) => "Error: " + msg
  }
}

///|
/// Editor state for the interactive tree
pub struct TreeEditorState {
  /// The interactive tree representation
  tree : InteractiveTreeNode?
  /// Currently selected nodes
  selection : Array[NodeId]
  /// Node being edited inline
  editing_node : NodeId?
  /// Current edit value for inline editing
  edit_value : String
  /// Node being dragged
  dragging : NodeId?
  /// Current drop target
  drop_target : NodeId?
  /// Drop position relative to target
  drop_position : DropPosition?
}

///|
/// Create a new tree editor state
pub fn TreeEditorState::new() -> TreeEditorState {
  {
    tree: None,
    selection: [],
    editing_node: None,
    edit_value: "",
    dragging: None,
    drop_target: None,
    drop_position: None,
  }
}

///|
/// Create tree editor state from a canonical model
pub fn TreeEditorState::from_model(model : CanonicalModel) -> TreeEditorState {
  let tree = match model.get_ast() {
    Some(ast) =>
      Some(InteractiveTreeNode::from_term_node(ast, model.get_source_map()))
    None => None
  }
  {
    tree,
    selection: [],
    editing_node: None,
    edit_value: "",
    dragging: None,
    drop_target: None,
    drop_position: None,
  }
}

///|
/// Apply a tree edit operation to the editor state
pub fn TreeEditorState::apply_edit(
  self : TreeEditorState,
  edit : TreeEditOp,
) -> TreeEditorState {
  match edit {
    Select(node_id~) => { ..self, selection: [node_id] }
    SelectRange(start~, end~) => {
      // TODO: Implement range selection
      let _ = (start, end)
      self
    }
    StartEdit(node_id~) => {
      // Get current value from tree
      let edit_value = match find_node(self.tree, node_id) {
        Some(node) => node.label
        None => ""
      }
      { ..self, editing_node: Some(node_id), edit_value }
    }
    CommitEdit(node_id~, new_value~) => {
      let _ = (node_id, new_value)
      { ..self, editing_node: None, edit_value: "" }
    }
    CancelEdit => { ..self, editing_node: None, edit_value: "" }
    Delete(node_id~) => {
      let _ = node_id
      // TODO: Implement deletion in tree
      self
    }
    WrapInLambda(node_id~, var_name~) => {
      let _ = (node_id, var_name)
      // TODO: Implement wrap
      self
    }
    WrapInApp(node_id~) => {
      let _ = node_id
      // TODO: Implement wrap
      self
    }
    InsertChild(parent~, index~, kind~) => {
      let _ = (parent, index, kind)
      // TODO: Implement insert
      self
    }
    StartDrag(node_id~) => { ..self, dragging: Some(node_id) }
    DragOver(target~, position~) =>
      { ..self, drop_target: Some(target), drop_position: Some(position) }
    Drop(source~, target~, position~) => {
      let _ = (source, target, position)
      // TODO: Implement drop
      { ..self, dragging: None, drop_target: None, drop_position: None }
    }
    Collapse(node_id~) => {
      // TODO: Update collapsed state in tree
      let _ = node_id
      self
    }
    Expand(node_id~) => {
      // TODO: Update collapsed state in tree
      let _ = node_id
      self
    }
  }
}

///|
/// Find a node by ID in the tree
fn find_node(
  tree : InteractiveTreeNode?,
  node_id : NodeId,
) -> InteractiveTreeNode? {
  match tree {
    None => None
    Some(node) =>
      if node.id == node_id {
        Some(node)
      } else {
        find_node_in_children(node.children, node_id)
      }
  }
}

///|
/// Find a node in a list of children
fn find_node_in_children(
  children : Array[InteractiveTreeNode],
  node_id : NodeId,
) -> InteractiveTreeNode? {
  for child in children {
    if child.id == node_id {
      return Some(child)
    }
    match find_node_in_children(child.children, node_id) {
      Some(found) => return Some(found)
      None => ()
    }
  }
  None
}

///|
/// Check if a node is a leaf (editable inline)
pub fn is_leaf_node(kind : @parser.TermKind) -> Bool {
  match kind {
    Int(_) => true
    Var(_) => true
    Bop(_) => true
    _ => false
  }
}

///|
/// Check if a drop is valid
pub fn is_valid_drop(
  source : @parser.TermKind,
  target : @parser.TermKind,
  position : DropPosition,
) -> Bool {
  // Prevent dropping a node into itself or its descendants
  // For now, allow most drops
  let _ = (source, target, position)
  true
}
