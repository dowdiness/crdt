// WebAssembly bindings for CRDT Editor
// Exposes ParsedEditor API to JavaScript via FFI

// Global editor state (single editor for MVP)
let editor : Ref[@editor.ParsedEditor?] = { val: None }

/// Create a new ParsedEditor instance
/// Returns handle 1 (MVP: single editor only)
pub fn create_editor(agent_id : String) -> Int {
  editor.val = Some(@editor.ParsedEditor::new(agent_id))
  1
}

/// Insert text at cursor position
pub fn insert(_handle : Int, text : String) -> Unit {
  match editor.val {
    Some(editor) => editor.insert(text)
    None => ()
  }
}

/// Delete character at cursor (forward delete)
pub fn delete_(_handle : Int) -> Bool {
  match editor.val {
    Some(editor) => editor.delete()
    None => false
  }
}

/// Delete character before cursor (backspace)
pub fn backspace(_handle : Int) -> Bool {
  match editor.val {
    Some(editor) => editor.backspace()
    None => false
  }
}

/// Get current text content
pub fn get_text(_handle : Int) -> String {
  match editor.val {
    Some(editor) => editor.get_text()
    None => ""
  }
}

/// Get cursor position
pub fn get_cursor(_handle : Int) -> Int {
  match editor.val {
    Some(editor) => editor.get_cursor()
    None => 0
  }
}

/// Set cursor position
pub fn set_cursor(_handle : Int, position : Int) -> Unit {
  match editor.val {
    Some(editor) => editor.move_cursor(position)
    None => ()
  }
}

/// Get AST as JSON string
pub fn get_ast_json(_handle : Int) -> String {
  match editor.val {
    Some(editor) => {
      let text = editor.get_text()
      let (ast, _errors) = @parser.parse_with_error_recovery(text)
      serialize_ast(ast)
    }
    None => "{}"
  }
}

/// Get parse errors as JSON array
pub fn get_errors_json(_handle : Int) -> String {
  match editor.val {
    Some(editor) => {
      let text = editor.get_text()
      let (_ast, errors) = @parser.parse_with_error_recovery(text)
      serialize_errors(errors)
    }
    None => "[]"
  }
}

/// Get all operations as JSON
pub fn get_operations_json(_handle : Int) -> String {
  match editor.val {
    Some(editor) => {
      let ops = editor.get_operations()
      serialize_ops(ops)
    }
    None => "[]"
  }
}

/// Get frontier as JSON
pub fn get_frontier_json(_handle : Int) -> String {
  match editor.val {
    Some(editor) => {
      let frontier = editor.get_frontier()
      let mut result = "["
      for i = 0; i < frontier.length(); i = i + 1 {
        if i > 0 {
          result = result + ","
        }
        result = result + frontier[i].to_string()
      }
      result + "]"
    }
    None => "[]"
  }
}

/// Merge remote operations (placeholder for Phase 3)
pub fn merge_operations(_handle : Int, _ops_json : String, _frontier_json : String) -> Unit {
  // TODO: Implement in Phase 3
  ()
}
