// Test error recovery in ParsedEditor
// Verifies that errors clear when syntax is corrected

///|
test "ParsedEditor: error recovery - invalid to valid syntax" {
  let editor = ParsedEditor::new("agent1")

  // Start with valid syntax
  editor.insert("x")
  let ast1 = editor.get_ast()
  let errors1 = @parser.collect_errors(ast1)
  inspect(errors1.length(), content="0") // No errors

  // Add invalid syntax
  editor.insert("+") // "x+"
  let ast2 = editor.get_ast()
  let errors2 = @parser.collect_errors(ast2)
  inspect(errors2.length() > 0, content="true") // Should have errors

  // Fix the syntax
  editor.insert(" 1") // "x+ 1"
  let ast3 = editor.get_ast()
  let errors3 = @parser.collect_errors(ast3)
  inspect(errors3.length(), content="0") // Errors should be cleared!
}

///|
test "ParsedEditor: error recovery - multiple edits" {
  let editor = ParsedEditor::new("agent2")

  // Type: λx.
  editor.insert("λx.")
  let ast1 = editor.get_ast()
  let errors1 = @parser.collect_errors(ast1)
  inspect(errors1.length() > 0, content="true") // Incomplete lambda - error

  // Complete it: λx.x
  editor.insert("x")
  let ast2 = editor.get_ast()
  let errors2 = @parser.collect_errors(ast2)
  inspect(errors2.length(), content="0") // Complete - no errors

  // Break it again: λx.x+
  editor.insert("+")
  let ast3 = editor.get_ast()
  let errors3 = @parser.collect_errors(ast3)
  inspect(errors3.length() > 0, content="true") // Invalid - error

  // Fix it: λx.x+ 1
  editor.insert(" 1")
  let ast4 = editor.get_ast()
  let errors4 = @parser.collect_errors(ast4)
  inspect(errors4.length(), content="0") // Valid - no errors
}

///|
test "ParsedEditor: incremental parser is used" {
  let editor = ParsedEditor::new("agent3")

  // Insert some text
  editor.insert("λf.λx.f x")
  let ast1 = editor.get_ast()
  let errors1 = @parser.collect_errors(ast1)
  inspect(errors1.length(), content="0") // Valid

  // Make a small change at the end - change x to y
  let text_len = editor.get_text().length()
  editor.move_cursor(text_len - 1) // Move to 'x'
  let _ = editor.delete() // Delete 'x'
  editor.insert("y") // Add 'y'

  // Get AST again - should use incremental parser
  let ast2 = editor.get_ast()
  let errors2 = @parser.collect_errors(ast2)
  inspect(errors2.length(), content="0") // Should still be valid

  // Verify text is correct
  let text = editor.get_text()
  inspect(text, content="λf.λx.f y")
}
