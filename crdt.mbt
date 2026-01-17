// JavaScript bindings for CRDT Editor
// Exposes ParsedEditor API to JavaScript via FFI

// Global editor state (single editor for MVP)

///|
let editor : Ref[@editor.ParsedEditor?] = { val: None }

///|
/// Create a new ParsedEditor instance
/// Returns handle 1 (MVP: single editor only)
pub fn create_editor(agent_id : String) -> Int {
  editor.val = Some(@editor.ParsedEditor::new(agent_id))
  1
}

///|
/// Insert text at cursor position
pub fn insert(_handle : Int, text : String) -> Unit {
  match editor.val {
    Some(editor) => try! editor.insert(text)
    None => ()
  }
}

///|
/// Delete character at cursor (forward delete)
pub fn delete_(_handle : Int) -> Bool {
  match editor.val {
    Some(editor) => editor.delete()
    None => false
  }
}

///|
/// Delete character before cursor (backspace)
pub fn backspace(_handle : Int) -> Bool {
  match editor.val {
    Some(editor) => editor.backspace()
    None => false
  }
}

///|
/// Get current text content
pub fn get_text(_handle : Int) -> String {
  match editor.val {
    Some(editor) => editor.get_text()
    None => ""
  }
}

///|
/// Set text content directly (replaces entire document)
/// This is more efficient than delete+insert for syncing from DOM
pub fn set_text(_handle : Int, new_text : String) -> Unit {
  match editor.val {
    Some(ed) => {
      let old_text = ed.get_text()
      if old_text == new_text {
        return // Already synced
      }

      // Clear the document
      let old_len = old_text.length()
      ed.move_cursor(0) // Move to start
      for _i = 0; _i < old_len; _i = _i + 1 {
        let _ = ed.delete()
        // Delete at position 0
      }

      // Insert new text
      if new_text.length() > 0 {
        try! ed.insert(new_text)
      }
    }
    None => ()
  }
}

///|
/// Get cursor position
pub fn get_cursor(_handle : Int) -> Int {
  match editor.val {
    Some(editor) => editor.get_cursor()
    None => 0
  }
}

///|
/// Set cursor position
pub fn set_cursor(_handle : Int, position : Int) -> Unit {
  match editor.val {
    Some(editor) => editor.move_cursor(position)
    None => ()
  }
}

///|
/// Get AST as JSON string
/// Uses incremental parser for efficient reparsing
pub fn get_ast_json(_handle : Int) -> String {
  match editor.val {
    Some(ed) =>
      // Use the incremental parser from ParsedEditor
      // This triggers lazy evaluation and incremental reparse if needed
      ed.get_ast().to_json().stringify()
    None => "{}"
  }
}

///|
/// Get AST as DOT format for graphviz visualization
/// Returns a DOT language string that can be rendered by graphviz
pub fn get_ast_dot(_handle : Int) -> String {
  match editor.val {
    Some(ed) => {
      let ast = ed.get_ast()
      @parser.term_node_to_dot(ast)
    }
    None => "digraph { }"
  }
}

///|
/// Get parse errors as JSON array
/// Uses cached errors from ParsedEditor (O(1) after parse)
pub fn get_errors_json(_handle : Int) -> String {
  match editor.val {
    Some(ed) =>
      // Get cached errors (triggers reparse if dirty, then returns cached errors)
      ed.get_errors().to_json().stringify()
    None => "[]"
  }
}

///|
/// Get all operations as JSON
pub fn get_operations_json(_handle : Int) -> String {
  match editor.val {
    Some(editor) => editor.get_operations().to_json().stringify()
    None => "[]"
  }
}

///|
/// Get frontier as JSON
pub fn get_frontier_json(_handle : Int) -> String {
  match editor.val {
    Some(editor) => editor.get_frontier().to_json().stringify()
    None => "[]"
  }
}

///|
/// Get version vector as JSON
/// Returns a JSON object mapping agent IDs to sequence numbers
/// Example: {"alice": 5, "bob": 3}
pub fn get_version_vector_json(_handle : Int) -> String {
  match editor.val {
    Some(ed) => {
      // Get the document's oplog and create a branch view
      let oplog = ed.editor.doc.oplog
      let tree = ed.editor.doc.tree
      let branch = @branch.Branch::from_tree_and_oplog(tree, oplog)
      let vv = branch.get_version_vector()
      // Use ToJson trait to serialize
      vv.to_json().stringify()
    }
    None => "{}"
  }
}

///|
/// Parse operations from JSON
/// Uses @json.from_json with FromJson trait
fn parse_ops_from_json(json_str : String) -> Array[@oplog.Op] {
  try {
    let json_val = @json.parse(json_str)
    // Use FromJson trait - Op already derives FromJson
    @json.from_json(json_val)
  } catch {
    _ => [] // Return empty array on any error
  }
}

///|
/// Parse version vector from JSON
/// Uses @json.from_json with FromJson trait
fn parse_version_vector_from_json(
  json_str : String,
) -> @causal_graph.VersionVector? {
  try {
    let json_val = @json.parse(json_str)
    // Use FromJson trait - VersionVector implements FromJson
    Some(@json.from_json(json_val))
  } catch {
    _ => None // Return None on any error
  }
}

///|
/// Merge remote operations into local editor
/// This implements Phase 3 of the eg-walker algorithm
/// Optimized with version vector comparison to skip redundant merges
pub fn merge_operations(
  _handle : Int,
  ops_json : String,
  version_vector_json : String,
) -> Unit {
  match editor.val {
    Some(ed) => {
      // Get local version vector for comparison
      let oplog = ed.editor.doc.oplog
      let tree = ed.editor.doc.tree
      let local_branch = @branch.Branch::from_tree_and_oplog(tree, oplog)
      let local_vv = local_branch.get_version_vector()

      // Parse remote version vector
      match parse_version_vector_from_json(version_vector_json) {
        Some(remote_vv) =>
          // Optimization: If remote version vector is <= local, we already have
          // all those operations. Skip the merge to avoid redundant processing.
          if remote_vv <= local_vv {
            // Already synced - remote has no new operations for us
            return
          }
        None => () // If parsing fails, proceed with merge anyway
      }

      // Parse remote operations from JSON
      // Serialization uses ToJson trait (.to_json().to_string())
      // Deserialization uses @json.parse + manual field extraction
      let remote_ops = parse_ops_from_json(ops_json)

      // Use ParsedEditor's merge_remote which calls Editor::merge_remote
      // which calls Document::merge_remote which uses the merge module
      try! ed.merge_remote(remote_ops, [])

      // ParsedEditor::merge_remote already marks as dirty for reparsing
    }
    None => ()
  }
}
