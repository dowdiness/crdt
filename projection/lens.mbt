// Lens: Bidirectional transformation abstraction for projectional editing
// Based on the functional lens pattern for view ↔ model synchronization

///|
/// A projection edit represents a change in a specific projection
pub enum ProjectionEdit {
  /// Text was inserted at a position
  TextInsert(position~ : Int, text~ : String)
  /// Text was deleted from a range
  TextDelete(start~ : Int, end~ : Int)
  /// A node was selected
  NodeSelect(node_id~ : NodeId)
  /// A node's value was changed
  NodeValueChange(node_id~ : NodeId, new_value~ : LeafValue)
  /// A structural change occurred
  StructuralChange(operation~ : ModelOperation)
} derive(Show)

// Note: Using built-in Result[T, String] for lens transformation results
// MoonBit doesn't have traits with type parameters like Rust/Haskell
// So we implement lens operations as functions that take the model and projection

///|
/// Text lens operations: CanonicalModel ↔ String
/// These functions provide bidirectional transformation between the model and text

///|
/// Get text from the canonical model (render AST to source code)
pub fn text_lens_get(model : CanonicalModel) -> Result[String, String] {
  match model.get_ast() {
    Some(ast) => Ok(@parser.print_term_node(ast))
    None => Ok("")
  }
}

///|
/// Put text into the canonical model (parse text and reconcile with existing AST)
/// Returns the updated model (or error if parsing completely fails)
pub fn text_lens_put(
  model : CanonicalModel,
  text : String,
) -> Result[CanonicalModel, String] {
  // Parse the new text
  let parser = @parser.IncrementalParser::new(text)
  let new_ast = parser.parse()

  // Reconcile with existing AST to preserve node IDs where possible
  match model.get_ast() {
    Some(old_ast) => {
      let reconciled = reconcile_ast(old_ast, new_ast, model)
      model.set_ast(reconciled)
      Ok(model)
    }
    None => {
      model.set_ast(new_ast)
      Ok(model)
    }
  }
}

///|
/// Compute the difference between two text representations
pub fn text_lens_diff(
  old_text : String,
  new_text : String,
) -> Array[ProjectionEdit] {
  let edits : Array[ProjectionEdit] = []
  if old_text == new_text {
    return edits
  }

  // Find common prefix length
  let old_chars = old_text.to_array()
  let new_chars = new_text.to_array()
  let min_len = @cmp.minimum(old_chars.length(), new_chars.length())
  let mut prefix_len = 0
  while prefix_len < min_len && old_chars[prefix_len] == new_chars[prefix_len] {
    prefix_len = prefix_len + 1
  }

  // Find common suffix length (but don't overlap with prefix)
  let mut suffix_len = 0
  let old_remaining = old_chars.length() - prefix_len
  let new_remaining = new_chars.length() - prefix_len
  let max_suffix = @cmp.minimum(old_remaining, new_remaining)
  while suffix_len < max_suffix &&
        old_chars[old_chars.length() - 1 - suffix_len] ==
        new_chars[new_chars.length() - 1 - suffix_len] {
    suffix_len = suffix_len + 1
  }

  // Calculate the changed region
  let delete_start = prefix_len
  let delete_end = old_chars.length() - suffix_len
  let insert_start = prefix_len
  let insert_end = new_chars.length() - suffix_len

  // Generate edits for the changed region only
  // Insert first, then delete - this keeps positions valid during application
  if insert_end > insert_start {
    let inserted_text = new_chars[insert_start:insert_end]
      .iter()
      .fold(init=StringBuilder::new(), fn(sb, c) {
        sb.write_char(c)
        sb
      })
    edits.push(
      TextInsert(position=insert_start, text=inserted_text.to_string()),
    )
  }
  if delete_end > delete_start {
    // Adjust delete positions to account for the insert that happened first
    let insert_len = insert_end - insert_start
    edits.push(
      TextDelete(start=delete_start + insert_len, end=delete_end + insert_len),
    )
  }
  edits
}

///|
/// Tree lens operations: CanonicalModel ↔ InteractiveTree
/// For now, we work directly with TermNode as the tree representation

///|
/// Get the interactive tree from the canonical model
pub fn tree_lens_get(
  model : CanonicalModel,
) -> Result[@parser.TermNode?, String] {
  Ok(model.get_ast())
}

///|
/// Apply a tree edit operation to the canonical model
pub fn tree_lens_apply_edit(
  model : CanonicalModel,
  edit : TreeEditOp,
) -> Result[CanonicalModel, String] {
  match edit {
    TreeEditOp::Select(node_id~) => {
      // Selection doesn't modify the model
      let _ = node_id
      Ok(model)
    }
    TreeEditOp::CommitEdit(node_id~, new_value~) => {
      // Update the leaf value
      let _ = (node_id, new_value)
      // TODO: Implement leaf value update
      Ok(model)
    }
    _ =>
      // TODO: Implement other operations
      Ok(model)
  }
}

///|
/// Tree edit operations for the interactive tree editor
pub enum TreeEditOp {
  // Selection
  Select(node_id~ : NodeId)
  SelectRange(start~ : NodeId, end~ : NodeId)

  // Inline editing
  StartEdit(node_id~ : NodeId)
  CommitEdit(node_id~ : NodeId, new_value~ : String)
  CancelEdit

  // Structural operations
  Delete(node_id~ : NodeId)
  WrapInLambda(node_id~ : NodeId, var_name~ : String)
  WrapInApp(node_id~ : NodeId)
  InsertChild(parent~ : NodeId, index~ : Int, kind~ : @parser.TermKind)

  // Drag and drop
  StartDrag(node_id~ : NodeId)
  DragOver(target~ : NodeId, position~ : DropPosition)
  Drop(source~ : NodeId, target~ : NodeId, position~ : DropPosition)

  // Navigation
  Collapse(node_id~ : NodeId)
  Expand(node_id~ : NodeId)
} derive(Show)

///|
/// AST reconciliation: Preserve node IDs where possible when AST changes
/// This is crucial for maintaining cursor stability and projection sync
fn reconcile_ast(
  old : TermNode,
  new : TermNode,
  model : CanonicalModel,
) -> TermNode {
  // If structurally identical (same kind), keep old node ID
  match (old.kind, new.kind) {
    // Same kinds - try to reconcile
    (Int(a), Int(b)) =>
      if a == b {
        old // Completely identical
      } else {
        // Value changed, keep old ID but update value
        @parser.TermNode::new(new.kind, new.start, new.end, old.node_id, [])
      }
    (Var(a), Var(b)) =>
      if a == b {
        old
      } else {
        @parser.TermNode::new(new.kind, new.start, new.end, old.node_id, [])
      }
    (Lam(param_old), Lam(param_new)) => {
      // Reconcile body
      let old_body = if old.children.length() > 0 {
        Some(old.children[0])
      } else {
        None
      }
      let new_body = if new.children.length() > 0 {
        Some(new.children[0])
      } else {
        None
      }
      let reconciled_body : Array[TermNode] = match (old_body, new_body) {
        (Some(o), Some(n)) => [reconcile_ast(o, n, model)]
        (None, Some(n)) => [assign_fresh_ids(n, model)]
        (Some(_), None) => []
        (None, None) => []
      }
      let new_kind = if param_old == param_new { old.kind } else { new.kind }
      @parser.TermNode::new(
        new_kind,
        new.start,
        new.end,
        old.node_id,
        reconciled_body,
      )
    }
    (App, App) => {
      // Reconcile both children
      let reconciled_children = reconcile_children(
        old.children,
        new.children,
        model,
      )
      @parser.TermNode::new(
        old.kind,
        new.start,
        new.end,
        old.node_id,
        reconciled_children,
      )
    }
    (Bop(op_old), Bop(op_new)) => {
      let reconciled_children = reconcile_children(
        old.children,
        new.children,
        model,
      )
      let new_kind = if op_old == op_new { old.kind } else { new.kind }
      @parser.TermNode::new(
        new_kind,
        new.start,
        new.end,
        old.node_id,
        reconciled_children,
      )
    }
    (If, If) => {
      let reconciled_children = reconcile_children(
        old.children,
        new.children,
        model,
      )
      @parser.TermNode::new(
        old.kind,
        new.start,
        new.end,
        old.node_id,
        reconciled_children,
      )
    }
    // Different kinds - use new node with fresh ID
    _ => assign_fresh_ids(new, model)
  }
}

///|
/// Reconcile arrays of children using LCS-like matching
fn reconcile_children(
  old_children : Array[TermNode],
  new_children : Array[TermNode],
  model : CanonicalModel,
) -> Array[TermNode] {
  // Simple approach: match by position for now
  // TODO: Use LCS for better matching
  let result : Array[TermNode] = []
  let min_len = @cmp.minimum(old_children.length(), new_children.length())
  for i = 0; i < min_len; i = i + 1 {
    result.push(reconcile_ast(old_children[i], new_children[i], model))
  }

  // Add any extra new children with fresh IDs
  for i = min_len; i < new_children.length(); i = i + 1 {
    result.push(assign_fresh_ids(new_children[i], model))
  }

  // Explicitly unregister removed old children from the model's registry
  // to prevent orphaned entries before set_ast rebuilds the indices
  for i = min_len; i < old_children.length(); i = i + 1 {
    unregister_node_tree(old_children[i], model)
  }
  result
}

///|
/// Recursively unregister a node and all its children from the model's registry
fn unregister_node_tree(node : TermNode, model : CanonicalModel) -> Unit {
  model.unregister_node(NodeId(node.node_id))
  for child in node.children {
    unregister_node_tree(child, model)
  }
}

///|
/// Assign fresh node IDs to a tree
fn assign_fresh_ids(node : TermNode, model : CanonicalModel) -> TermNode {
  let new_id = model.new_node_id()
  let new_children : Array[TermNode] = []
  for child in node.children {
    new_children.push(assign_fresh_ids(child, model))
  }
  @parser.TermNode::new(node.kind, node.start, node.end, new_id.0, new_children)
}
