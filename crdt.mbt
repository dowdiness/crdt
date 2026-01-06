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
    Some(editor) => editor.insert(text)
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
        ed.insert(new_text)
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
    Some(ed) => {
      // Use the incremental parser from ParsedEditor
      // This triggers lazy evaluation and incremental reparse if needed
      ed.get_ast().to_json().stringify()
    }
    None => "{}"
  }
}

///|
/// Get parse errors as JSON array
/// Uses cached errors from ParsedEditor (O(1) after parse)
pub fn get_errors_json(_handle : Int) -> String {
  match editor.val {
    Some(ed) => {
      // Get cached errors (triggers reparse if dirty, then returns cached errors)
      ed.get_errors().to_json().stringify()
    }
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
/// Parse operations from JSON
/// Uses @json package for basic parsing, then extracts fields manually
fn parse_ops_from_json(json_str : String) -> Array[@oplog.Op] {
  let result : Array[@oplog.Op] = []
  try {
    let json_val = @json.parse(json_str)
    match json_val {
      Array(arr) =>
        for elem in arr {
          match elem {
            Object(obj_map) => {
              // Extract fields by direct matching on Map getters
              let lv = match obj_map.get("lv") {
                Some(Number(n, ..)) => n.to_int()
                _ => -1
              }
              let agent = match obj_map.get("agent") {
                Some(String(s)) => s
                _ => ""
              }
              let seq = match obj_map.get("seq") {
                Some(Number(n, ..)) => n.to_int()
                _ => -1
              }
              let origin_left = match obj_map.get("origin_left") {
                Some(Number(n, ..)) => n.to_int()
                _ => -1
              }
              let origin_right = match obj_map.get("origin_right") {
                Some(Number(n, ..)) => n.to_int()
                _ => -1
              }

              // Parse parents array
              let parents : Array[Int] = []
              match obj_map.get("parents") {
                Some(Array(p_arr)) =>
                  for p in p_arr {
                    match p {
                      Number(n, ..) => parents.push(n.to_int())
                      _ => ()
                    }
                  }
                _ => ()
              }

              // Parse content (Insert or Delete)
              // Insert: ["Insert", "text"] - array
              // Delete: "Delete" - string
              match obj_map.get("content") {
                Some(json_content) =>
                  match json_content {
                    // Insert is an array ["Insert", "text"]
                    Array(arr) =>
                      if arr.length() > 1 {
                        match arr[1] {
                          String(text) => {
                            let op = @oplog.Op::new_insert(
                              lv, parents, agent, seq, text, origin_left, origin_right,
                            )
                            result.push(op)
                          }
                          _ => ()
                        }
                      }
                    // Delete is just the string "Delete"
                    String(s) =>
                      if s == "Delete" {
                        let op = @oplog.Op::new_delete(
                          lv, parents, agent, seq, origin_left,
                        )
                        result.push(op)
                      }
                    _ => ()
                  }
                _ => ()
              }
            }
            _ => ()
          }
        }
      _ => ()
    }
  } catch {
    _ => () // Return empty array on any parse error
  }
  result
}

///|
/// Merge remote operations into local editor
/// This implements Phase 3 of the eg-walker algorithm
pub fn merge_operations(
  _handle : Int,
  ops_json : String,
  _frontier_json : String,
) -> Unit {
  match editor.val {
    Some(ed) => {
      // Parse remote operations from JSON
      // Serialization uses ToJson trait (.to_json().to_string())
      // Deserialization uses @json.parse + manual field extraction
      let remote_ops = parse_ops_from_json(ops_json)

      // Use ParsedEditor's merge_remote which calls Editor::merge_remote
      // which calls Document::merge_remote which uses the merge module
      ed.merge_remote(remote_ops, [])

      // ParsedEditor::merge_remote already marks as dirty for reparsing
    }
    None => ()
  }
}
