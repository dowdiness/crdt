///| Demo - CRDT Editor demonstration

///|

///| Demonstrates the CRDT editor capabilities

///|
/// Print a separator
fn print_separator() -> Unit {
  println("================================================")
}

///|
/// Show editor state with agent name
fn show_editor(agent_name : String, editor : @editor.Editor) -> Unit {
  let text = editor.get_text()
  let cursor = editor.get_cursor()
  println("[\{agent_name}] Text: \"\{text}\" (cursor: \{cursor})")
}

///|
/// Show operations
fn show_operations(editor : @editor.Editor) -> Unit {
  let ops = editor.get_operations()
  println("Operations (\{ops.length()} total):")
  for i = 0; i < ops.length(); i = i + 1 {
    let op = ops[i]
    let mut line = "  [\{op.lv}] "
    match op.content {
      @oplog.Insert(text) =>
        line = line +
          "Insert(\"\{text}\") left=\{op.origin_left} right=\{op.origin_right}"
      @oplog.Delete => line = line + "Delete() left=\{op.origin_left}"
    }
    println(line)
  }
}

///|
/// Run CRDT editor demo
pub fn run_convergence_demo() -> Unit {
  println("Eg-walker CRDT Editor - Feature Demo")
  print_separator()
  println("")

  // Demonstration of basic editing
  println("Demo: Text editing with CRDT operations")
  print_separator()
  println("")
  let alice = @editor.Editor::new("alice")
  println("1. Alice types 'Hello'")
  alice.insert("Hello")
  show_editor("Alice", alice)
  println("")
  println("2. Alice types ' World'")
  alice.insert(" World")
  show_editor("Alice", alice)
  println("")
  println("3. Alice moves cursor to position 6 and inserts 'CRDT '")
  alice.move_cursor(6)
  alice.insert("CRDT ")
  show_editor("Alice", alice)
  println("")
  println("4. View operation log:")
  show_operations(alice)
  println("")
  println("5. Alice moves cursor to position 0 and inserts 'Hey! '")
  alice.move_cursor(0)
  alice.insert("Hey! ")
  show_editor("Alice", alice)
  println("")
  println("6. Final operation log:")
  show_operations(alice)
  println("")
  let frontier = alice.get_frontier()
  let mut frontier_str = "Frontier: ["
  for i = 0; i < frontier.length(); i = i + 1 {
    if i > 0 {
      frontier_str = frontier_str + ", "
    }
    frontier_str = frontier_str + frontier[i].to_string()
  }
  frontier_str = frontier_str + "]"
  println(frontier_str)
  println("")
  print_separator()
  println("Key features demonstrated:")
  println("  • Position-based editing with cursor tracking")
  println("  • Operation log captures all edits")
  println("  • Each operation has causal metadata (LV, origin)")
  println("  • Frontier tracks the latest operations")
  println("")
}
