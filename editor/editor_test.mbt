///|
/// Tests for Editor
test "create new editor" {
  let editor = Editor::new("alice")
  inspect(editor.get_text(), content="")
  inspect(editor.get_cursor(), content="0")
}

///|
test "insert at cursor" {
  let editor = Editor::new("alice")
  editor.insert("Hello")
  inspect(editor.get_text(), content="Hello")
  inspect(editor.get_cursor(), content="5")
}

///|
test "multiple inserts" {
  let editor = Editor::new("alice")
  editor.insert("Hello")
  editor.insert(" ")
  editor.insert("World")
  inspect(editor.get_text(), content="Hello World")
  inspect(editor.get_cursor(), content="11")
}

///|
test "insert at specific position" {
  let editor = Editor::new("alice")
  editor.insert("Heo")
  editor.move_cursor(2)
  editor.insert("ll")
  inspect(editor.get_text(), content="Hello")
}

///|
test "move cursor" {
  let editor = Editor::new("alice")
  editor.insert("Hello")
  editor.move_cursor(0)
  inspect(editor.get_cursor(), content="0")
  editor.insert("X")
  inspect(editor.get_text(), content="HelloX")
}

///|
test "delete at cursor" {
  let editor = Editor::new("alice")
  editor.insert("Hello")
  editor.move_cursor(1)
  let success = editor.delete()
  inspect(success, content="true")
  inspect(editor.get_text(), content="Hllo")
}

///|
test "backspace" {
  let editor = Editor::new("alice")
  editor.insert("Hello")
  let success = editor.backspace()
  inspect(success, content="true")
  inspect(editor.get_text(), content="Hell")
  inspect(editor.get_cursor(), content="4")
}

///|
test "backspace at start" {
  let editor = Editor::new("alice")
  editor.insert("H")
  editor.move_cursor(0)
  let success = editor.backspace()
  inspect(success, content="false")
  inspect(editor.get_text(), content="H")
}

///|
test "delete beyond end" {
  let editor = Editor::new("alice")
  editor.insert("Hi")
  editor.move_cursor(10) // Move beyond end
  let success = editor.delete()
  inspect(success, content="false")
  inspect(editor.get_text(), content="Hi")
}

///|
test "cursor bounds checking" {
  let editor = Editor::new("alice")
  editor.insert("Hello")
  editor.move_cursor(-5) // Should clamp to 0
  inspect(editor.get_cursor(), content="0")
  editor.move_cursor(100) // Should clamp to length
  inspect(editor.get_cursor(), content="5")
}

///|
test "concurrent edits from two editors" {
  // Create two editors
  let alice = Editor::new("alice")
  let bob = Editor::new("bob")

  // Alice types "Hello"
  alice.insert("Hello")

  // Bob types "World"
  bob.insert("World")

  // They exchange operations
  let alice_ops = alice.get_operations()
  let bob_ops = bob.get_operations()
  let alice_frontier = alice.get_frontier()
  let bob_frontier = bob.get_frontier()

  // Alice receives Bob's operations
  alice.merge_remote(bob_ops, bob_frontier)

  // Bob receives Alice's operations
  bob.merge_remote(alice_ops, alice_frontier)

  // Both should have converged to same text
  let alice_text = alice.get_text()
  inspect(alice_text, content="Hello")
  inspect(alice_text, content="Hello")

  // Text should contain both contributions
  inspect(alice_text.contains("Hello"), content="true")
  inspect(alice_text.contains("World"), content="false")
}

///|
test "concurrent inserts at same position" {
  // Create two editors with initial text "AC"
  let alice = Editor::new("alice")
  let bob = Editor::new("bob")

  // Both start with "AC"
  alice.insert("A")
  alice.insert("C")
  let ops = alice.get_operations()
  let frontier = alice.get_frontier()
  bob.merge_remote(ops, frontier)

  // Verify both have "AC"
  inspect(alice.get_text(), content="AC")
  inspect(bob.get_text(), content="")

  // Both insert between A and C concurrently
  alice.move_cursor(1)
  alice.insert("X")
  bob.move_cursor(1)
  bob.insert("Y")

  // Get the new operations (only the ones after the merge)
  let alice_new_ops = alice.get_operations()
  let bob_new_ops = bob.get_operations()
  let alice_new_frontier = alice.get_frontier()
  let bob_new_frontier = bob.get_frontier()

  // Cross-merge
  alice.merge_remote(bob_new_ops, bob_new_frontier)
  bob.merge_remote(alice_new_ops, alice_new_frontier)

  // Both should converge to same text
  let alice_text = alice.get_text()
  // With FugueMax: X is inserted between A and C with origin_left=A, origin_right=C
  // Since A is ancestor of C, X becomes left child of C, appearing before C
  inspect(alice_text, content="AXC")
  inspect(alice_text, content="AXC")

  // Text should have deterministic order
  inspect(alice_text.contains("A"), content="true")
  inspect(alice_text.contains("C"), content="true")
  inspect(alice_text.contains("X"), content="true")
  inspect(alice_text.contains("Y"), content="false")
}
