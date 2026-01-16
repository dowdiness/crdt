// CanonicalModel: The single source of truth for projectional editing
// All projections are derived views of this model

///|
/// The canonical model containing the AST and metadata
pub struct CanonicalModel {
  /// Current AST root
  mut ast : TermNode?
  /// Fast lookup: NodeId → TermNode
  node_registry : Map[NodeId, TermNode]
  /// Bidirectional position mapping
  source_map : SourceMap
  /// Set of projections that need update
  dirty_projections : Map[ProjectionId, Bool]
  /// Counter for generating unique node IDs
  mut next_node_id : Int
  /// Edit history for undo/redo
  edit_history : Array[ModelOperation]
  /// Current position in edit history (for undo/redo)
  mut history_position : Int
}

///|
/// Create an empty CanonicalModel
pub fn CanonicalModel::new() -> CanonicalModel {
  {
    ast: None,
    node_registry: {},
    source_map: SourceMap::new(),
    dirty_projections: {},
    next_node_id: 0,
    edit_history: [],
    history_position: 0,
  }
}

///|
/// Create a CanonicalModel from an existing AST
pub fn CanonicalModel::from_ast(ast : TermNode) -> CanonicalModel {
  let model = CanonicalModel::new()
  model.set_ast(ast)
  model
}

///|
/// Get the current AST
pub fn CanonicalModel::get_ast(self : CanonicalModel) -> TermNode? {
  self.ast
}

///|
/// Set a new AST and rebuild all indices
pub fn CanonicalModel::set_ast(self : CanonicalModel, ast : TermNode) -> Unit {
  self.ast = Some(ast)
  self.rebuild_indices(ast)
  self.mark_all_dirty()
}

///|
/// Rebuild the node registry and source map from an AST
fn CanonicalModel::rebuild_indices(
  self : CanonicalModel,
  root : TermNode,
) -> Unit {
  self.node_registry.clear()
  self.register_node(root)
  self.source_map.rebuild(root)

  // Update next_node_id to be greater than any existing ID
  self.next_node_id = self.find_max_node_id(root) + 1
}

///|
/// Recursively register a node and its children
fn CanonicalModel::register_node(
  self : CanonicalModel,
  node : TermNode,
) -> Unit {
  let node_id = NodeId(node.node_id)
  self.node_registry[node_id] = node
  for child in node.children {
    self.register_node(child)
  }
}

///|
/// Find the maximum node_id in a tree
fn CanonicalModel::find_max_node_id(
  self : CanonicalModel,
  node : TermNode,
) -> Int {
  let mut max_id = node.node_id
  for child in node.children {
    let child_max = self.find_max_node_id(child)
    if child_max > max_id {
      max_id = child_max
    }
  }
  max_id
}

///|
/// Generate a new unique node ID
pub fn CanonicalModel::new_node_id(self : CanonicalModel) -> NodeId {
  let id = self.next_node_id
  self.next_node_id = self.next_node_id + 1
  NodeId(id)
}

///|
/// Get a node by its ID
pub fn CanonicalModel::get_node(
  self : CanonicalModel,
  node_id : NodeId,
) -> TermNode? {
  self.node_registry.get(node_id)
}

///|
/// Remove a node from the registry (used during reconciliation cleanup)
pub fn CanonicalModel::unregister_node(
  self : CanonicalModel,
  node_id : NodeId,
) -> Unit {
  self.node_registry.remove(node_id)
}

///|
/// Get the text range for a node
pub fn CanonicalModel::get_node_range(
  self : CanonicalModel,
  node_id : NodeId,
) -> Range? {
  self.source_map.get_range(node_id)
}

///|
/// Find the innermost node at a text position
pub fn CanonicalModel::node_at_position(
  self : CanonicalModel,
  position : Int,
) -> NodeId? {
  self.source_map.innermost_node_at(position)
}

///|
/// Mark a projection as needing update
pub fn CanonicalModel::mark_dirty(
  self : CanonicalModel,
  projection : ProjectionId,
) -> Unit {
  self.dirty_projections[projection] = true
}

///|
/// Mark all projections as needing update
pub fn CanonicalModel::mark_all_dirty(self : CanonicalModel) -> Unit {
  self.dirty_projections[ProjectionId::Text] = true
  self.dirty_projections[ProjectionId::Tree] = true
}

///|
/// Check if a projection needs update
pub fn CanonicalModel::is_dirty(
  self : CanonicalModel,
  projection : ProjectionId,
) -> Bool {
  match self.dirty_projections.get(projection) {
    Some(dirty) => dirty
    None => false
  }
}

///|
/// Mark a projection as clean (updated)
pub fn CanonicalModel::mark_clean(
  self : CanonicalModel,
  projection : ProjectionId,
) -> Unit {
  self.dirty_projections[projection] = false
}

///|
/// Apply a model operation and record in history
pub fn CanonicalModel::apply_operation(
  self : CanonicalModel,
  op : ModelOperation,
) -> Unit {
  // TODO: Implement operation application
  // For now, just record in history
  self.edit_history.push(op)
  self.history_position = self.edit_history.length()
  self.mark_all_dirty()
}

///|
/// Check if AST has any errors
pub fn CanonicalModel::has_errors(self : CanonicalModel) -> Bool {
  match self.ast {
    Some(ast) => @parser.has_errors(ast)
    None => true
  }
}

///|
/// Get all error messages from the AST
pub fn CanonicalModel::get_errors(self : CanonicalModel) -> Array[String] {
  match self.ast {
    Some(ast) => @parser.collect_errors(ast)
    None => ["No AST available"]
  }
}

///|
/// Get the source map for external use
pub fn CanonicalModel::get_source_map(self : CanonicalModel) -> SourceMap {
  self.source_map
}

///|
/// Get the number of nodes in the model
pub fn CanonicalModel::node_count(self : CanonicalModel) -> Int {
  self.node_registry.length()
}
