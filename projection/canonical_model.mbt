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
/// Find the parent of a node by its ID
/// Returns (parent_node, index_in_parent) or None if node is root or not found
pub fn CanonicalModel::find_parent(
  self : CanonicalModel,
  node_id : NodeId,
) -> (TermNode, Int)? {
  match self.ast {
    None => None
    Some(root) =>
      if NodeId(root.node_id) == node_id {
        None // Root has no parent
      } else {
        find_parent_recursive(root, node_id)
      }
  }
}

///|
/// Recursive helper to find parent
fn find_parent_recursive(
  node : TermNode,
  target_id : NodeId,
) -> (TermNode, Int)? {
  for i, child in node.children {
    if NodeId(child.node_id) == target_id {
      return Some((node, i))
    }
    match find_parent_recursive(child, target_id) {
      Some(result) => return Some(result)
      None => continue
    }
  }
  None
}

///|
/// Update a node in the tree by its ID (returns new tree root)
fn update_node_in_tree(
  root : TermNode,
  target_id : NodeId,
  new_node : TermNode,
) -> TermNode {
  if NodeId(root.node_id) == target_id {
    new_node
  } else {
    let new_children : Array[TermNode] = []
    for child in root.children {
      new_children.push(update_node_in_tree(child, target_id, new_node))
    }
    @parser.TermNode::new(
      root.kind,
      root.start,
      root.end,
      root.node_id,
      new_children,
    )
  }
}

///|
/// Remove a child from a node's children by index
fn remove_child_at(node : TermNode, index : Int) -> TermNode {
  let new_children : Array[TermNode] = []
  for i, child in node.children {
    if i != index {
      new_children.push(child)
    }
  }
  @parser.TermNode::new(
    node.kind,
    node.start,
    node.end,
    node.node_id,
    new_children,
  )
}

///|
/// Insert a child into a node's children at index
fn insert_child_at(node : TermNode, index : Int, child : TermNode) -> TermNode {
  let new_children : Array[TermNode] = []
  for i, c in node.children {
    if i == index {
      new_children.push(child)
    }
    new_children.push(c)
  }
  // If index is at the end
  if index >= node.children.length() {
    new_children.push(child)
  }
  @parser.TermNode::new(
    node.kind,
    node.start,
    node.end,
    node.node_id,
    new_children,
  )
}

///|
/// Apply a model operation and record in history
pub fn CanonicalModel::apply_operation(
  self : CanonicalModel,
  op : ModelOperation,
) -> Result[Unit, String] {
  // Record in history first
  self.edit_history.push(op)
  self.history_position = self.edit_history.length()

  // Apply the operation
  match op {
    InsertNode(parent~, index~, node~) =>
      match self.get_node(parent) {
        None => return Err("Parent node not found: " + parent.to_string())
        Some(parent_node) => {
          let new_parent = insert_child_at(parent_node, index, node)
          match self.ast {
            None => return Err("No AST to modify")
            Some(root) => {
              let new_root = update_node_in_tree(root, parent, new_parent)
              self.set_ast(new_root)
            }
          }
        }
      }
    DeleteNode(node_id~) =>
      match self.find_parent(node_id) {
        None => return Err("Cannot delete root or node not found")
        Some((parent_node, index)) => {
          // Unregister the deleted node and its descendants
          match self.get_node(node_id) {
            Some(node) => unregister_node_tree_from_model(node, self)
            None => ()
          }
          let new_parent = remove_child_at(parent_node, index)
          match self.ast {
            None => return Err("No AST to modify")
            Some(root) => {
              let new_root = update_node_in_tree(
                root,
                NodeId(parent_node.node_id),
                new_parent,
              )
              self.set_ast(new_root)
            }
          }
        }
      }
    ReplaceNode(node_id~, new_node~) => {
      // Create a node with the same ID but new content
      let replacement = @parser.TermNode::new(
        new_node.kind,
        new_node.start,
        new_node.end,
        node_id.0,
        new_node.children,
      )
      match self.ast {
        None => return Err("No AST to modify")
        Some(root) => {
          let new_root = update_node_in_tree(root, node_id, replacement)
          self.set_ast(new_root)
        }
      }
    }
    UpdateLeaf(node_id~, new_value~) => {
      // UpdateLeaf requires creating TermKind values, but the constructors are
      // private to the parser module. Use ReplaceNode with a parsed node instead.
      // For now, we'll parse the value and extract the node.
      let value_str = match new_value {
        IntValue(n) => n.to_string()
        VarName(name) => name
        OpSymbol(op) => op
      }
      // Parse the value to get a TermNode
      let parser = @parser.IncrementalParser::new(value_str)
      let parsed = parser.parse()
      // The parsed node should have the right kind - use ReplaceNode logic
      match self.get_node(node_id) {
        None => return Err("Node not found: " + node_id.to_string())
        Some(existing) => {
          // Create replacement preserving the original node_id and position
          let replacement = @parser.TermNode::new(
            parsed.kind,
            existing.start,
            existing.end,
            existing.node_id,
            parsed.children,
          )
          match self.ast {
            None => return Err("No AST to modify")
            Some(root) => {
              let new_root = update_node_in_tree(root, node_id, replacement)
              self.set_ast(new_root)
            }
          }
        }
      }
    }
    MoveNode(node_id~, new_parent~, new_index~) =>
      // First, get the node to move
      match self.get_node(node_id) {
        None => return Err("Node to move not found: " + node_id.to_string())
        Some(node_to_move) =>
          // Find and remove from old parent
          match self.find_parent(node_id) {
            None => return Err("Cannot move root node")
            Some((old_parent, old_index)) => {
              let parent_after_remove = remove_child_at(old_parent, old_index)
              match self.ast {
                None => return Err("No AST to modify")
                Some(root) => {
                  // Update tree with removed node
                  let root_after_remove = update_node_in_tree(
                    root,
                    NodeId(old_parent.node_id),
                    parent_after_remove,
                  )
                  // Now insert into new parent
                  match get_node_in_tree(root_after_remove, new_parent) {
                    None =>
                      return Err(
                        "New parent not found: " + new_parent.to_string(),
                      )
                    Some(new_parent_node) => {
                      let parent_after_insert = insert_child_at(
                        new_parent_node, new_index, node_to_move,
                      )
                      let final_root = update_node_in_tree(
                        root_after_remove, new_parent, parent_after_insert,
                      )
                      self.set_ast(final_root)
                    }
                  }
                }
              }
            }
          }
      }
  }
  self.mark_all_dirty()
  Ok(())
}

///|
/// Helper to find a node in a tree by ID
fn get_node_in_tree(root : TermNode, target_id : NodeId) -> TermNode? {
  if NodeId(root.node_id) == target_id {
    Some(root)
  } else {
    for child in root.children {
      match get_node_in_tree(child, target_id) {
        Some(found) => return Some(found)
        None => continue
      }
    }
    None
  }
}

///|
/// Helper to unregister a node tree from the model
fn unregister_node_tree_from_model(
  node : TermNode,
  model : CanonicalModel,
) -> Unit {
  model.unregister_node(NodeId(node.node_id))
  for child in node.children {
    unregister_node_tree_from_model(child, model)
  }
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
