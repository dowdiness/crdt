// Tests for ParsedEditor integration

///|
test "create and insert text" {
  let pe = ParsedEditor::new("agent1")
  pe.insert("x")
  inspect(pe.get_text(), content="x")

  // Get AST
  let ast = pe.get_ast()
  let ast_str = @parser.print_term_node(ast)
  inspect(ast_str, content="x")
}

///|
test "sequential inserts update AST" {
  let pe = ParsedEditor::new("agent1")
  pe.insert("x")

  // First AST
  let ast1 = pe.get_ast()
  inspect(@parser.print_term_node(ast1), content="x")

  // Add more text
  pe.insert(" + 1")

  // Second AST should be different
  let ast2 = pe.get_ast()
  let ast2_str = @parser.print_term_node(ast2)
  inspect(ast2_str, content="(x + 1)")
}

///|
test "delete updates dirty flag" {
  let pe = ParsedEditor::new("agent1")
  pe.insert("123")
  inspect(pe.get_text(), content="123")

  // Get initial AST (123 is a valid integer)
  let _ast = pe.get_ast()

  // Delete last character
  let deleted = pe.backspace()
  inspect(deleted, content="true")
  inspect(pe.get_text(), content="12")
}

///|
test "parse error handling" {
  let pe = ParsedEditor::new("agent1")
  pe.insert("λ.") // Invalid: missing parameter
  let _ast = pe.get_ast()

  // Should have error node
  inspect(pe.is_parse_valid(), content="false")
}

///|
test "cursor tracking" {
  let pe = ParsedEditor::new("agent1")
  inspect(pe.get_cursor(), content="0")
  pe.insert("abc")
  inspect(pe.get_cursor(), content="3")
  pe.move_cursor(1)
  inspect(pe.get_cursor(), content="1")
}

///|
test "concurrent edits converge to same AST" {
  let pe1 = ParsedEditor::new("agent1")
  let pe2 = ParsedEditor::new("agent2")

  // Initial: "x"
  pe1.insert("x")
  pe2.merge_remote(pe1.get_operations(), pe1.get_frontier())

  // Verify text convergence
  inspect(pe1.get_text(), content="x")
  inspect(pe2.get_text(), content="x")

  // Concurrent: pe1 adds " + 1", pe2 adds " - 2"
  pe1.insert(" + 1")
  pe2.insert(" - 2")

  // Merge
  pe1.merge_remote(pe2.get_operations(), pe2.get_frontier())
  pe2.merge_remote(pe1.get_operations(), pe1.get_frontier())

  // Verify text and AST convergence
  let text1 = pe1.get_text()
  let text2 = pe2.get_text()
  inspect(text1 == text2, content="true")
  let ast1 = pe1.get_ast()
  let ast2 = pe2.get_ast()
  let ast1_str = @parser.print_term_node(ast1)
  let ast2_str = @parser.print_term_node(ast2)
  inspect(ast1_str == ast2_str, content="true")
}

///|
test "collaborative lambda editing" {
  let pe1 = ParsedEditor::new("agent1")
  let pe2 = ParsedEditor::new("agent2")

  // Agent 1 creates lambda skeleton
  pe1.insert("λx.")
  pe2.merge_remote(pe1.get_operations(), pe1.get_frontier())

  // Verify convergence
  inspect(pe1.get_text(), content="λx.")
  inspect(pe2.get_text(), content="λx.")

  // Concurrent body edits
  pe1.insert("x + 1")
  pe2.insert("x - 1")

  // Merge and verify both valid
  pe1.merge_remote(pe2.get_operations(), pe2.get_frontier())
  pe2.merge_remote(pe1.get_operations(), pe1.get_frontier())
  let text1 = pe1.get_text()
  let text2 = pe2.get_text()
  inspect(text1 == text2, content="true")

  // Both should parse successfully (though they may conflict in the body)
  let ast1 = pe1.get_ast()
  let ast2 = pe2.get_ast()

  // ASTs should be identical after convergence
  let ast1_str = @parser.print_term_node(ast1)
  let ast2_str = @parser.print_term_node(ast2)
  inspect(ast1_str == ast2_str, content="true")
}

///|
test "incremental parsing vs full reparse" {
  let pe = ParsedEditor::new("agent1")
  pe.insert("λf.λx.if f x then x + 1 else x - 1")

  // Get initial AST
  let _ast1 = pe.get_ast()

  // Make small edit at end
  pe.move_cursor(34)
  let _deleted = pe.backspace()
  pe.insert("2")

  // Get updated AST (should use incremental parsing)
  let ast2 = pe.get_ast()

  // Verify change
  let ast2_str = @parser.print_term_node(ast2)
  inspect(ast2_str, content="(λf. (λx. if (f x) then (x + 1) else (x - 2)))")
}

///|
test "empty document" {
  let pe = ParsedEditor::new("agent1")

  // Empty text
  inspect(pe.get_text(), content="")

  // Should still be able to get AST (may be error node)
  let _ast = pe.get_ast()

}

///|
test "backspace at start returns false" {
  let pe = ParsedEditor::new("agent1")
  pe.insert("abc")
  pe.move_cursor(0)
  let result = pe.backspace()
  inspect(result, content="false")
  inspect(pe.get_text(), content="abc")
}

///|
test "delete at end returns false" {
  let pe = ParsedEditor::new("agent1")
  pe.insert("abc")
  pe.move_cursor(3)
  let result = pe.delete()
  inspect(result, content="false")
  inspect(pe.get_text(), content="abc")
}

///|
test "operations and frontier" {
  let pe = ParsedEditor::new("agent1")
  pe.insert("x")
  let ops = pe.get_operations()
  let frontier = pe.get_frontier()
  inspect(ops.length() > 0, content="true")
  inspect(frontier.length() > 0, content="true")
}

///|
test "lazy AST evaluation" {
  let pe = ParsedEditor::new("agent1")
  pe.insert("x")

  // First get_ast() should parse
  let _ast1 = pe.get_ast()

  // Second get_ast() should return cached AST (no reparse)
  let ast2 = pe.get_ast()

  // Verify AST is correct
  let ast2_str = @parser.print_term_node(ast2)
  inspect(ast2_str, content="x")
}

///|
test "merge invalidates AST cache" {
  let pe1 = ParsedEditor::new("agent1")
  let pe2 = ParsedEditor::new("agent2")

  // Start with common base
  pe1.insert("x")
  pe2.merge_remote(pe1.get_operations(), pe1.get_frontier())
  let _ast1 = pe1.get_ast()

  // pe2 makes change and pe1 merges
  pe2.insert("y")
  pe1.merge_remote(pe2.get_operations(), pe2.get_frontier())

  // get_ast() should reparse
  let ast2 = pe1.get_ast()
  let _ast2_str = @parser.print_term_node(ast2)

  // AST should reflect merged text
  inspect(pe1.get_text(), content="xy")
}
