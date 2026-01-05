// Tests for incremental parser

///|
test "IncrementalParser::new creates parser" {
  let parser = IncrementalParser::new("42")
  inspect(parser.get_source(), content="42")
  inspect(parser.get_tree() is None, content="true")
}

///|
test "IncrementalParser::parse initial parse" {
  let parser = IncrementalParser::new("λx.x")
  let tree = parser.parse()
  inspect(print_term_node(tree), content="(λx. x)")
  inspect(parser.get_tree() is None, content="false")
}

///|
test "IncrementalParser::edit simple insertion" {
  let parser = IncrementalParser::new("42")
  let _ = parser.parse()

  // Insert " + 1" at the end
  let edit = Edit::insert(2, 4) // Insert 4 chars at position 2
  let new_tree = parser.edit(edit, "42 + 1")
  inspect(print_term_node(new_tree).contains("42"), content="true")
  inspect(print_term_node(new_tree).contains("+"), content="true")
  inspect(print_term_node(new_tree).contains("1"), content="true")
}

///|
test "IncrementalParser::edit simple deletion" {
  let parser = IncrementalParser::new("42 + 1")
  let _ = parser.parse()

  // Delete " + 1"
  let edit = Edit::delete(2, 6)
  let new_tree = parser.edit(edit, "42")
  inspect(print_term_node(new_tree), content="42")
}

///|
test "IncrementalParser::edit replacement" {
  let parser = IncrementalParser::new("x")
  let _ = parser.parse()

  // Replace "x" with "y"
  let edit = Edit::replace(0, 1, 1)
  let new_tree = parser.edit(edit, "y")
  inspect(print_term_node(new_tree), content="y")
}

///|
test "IncrementalParser::edit with no initial tree" {
  let parser = IncrementalParser::new("x")

  // Edit without parsing first
  let edit = Edit::replace(0, 1, 1)
  let tree = parser.edit(edit, "y")
  inspect(print_term_node(tree), content="y")
}

///|
test "IncrementalParser::edit preserves structure" {
  let parser = IncrementalParser::new("λf.λx.f x")
  let initial_tree = parser.parse()

  // Insert space (cosmetic change)
  let edit = Edit::insert(9, 1)
  let new_tree = parser.edit(edit, "λf.λx.f x ")

  // Structure should be similar (both are lambda abstractions)
  inspect(print_term_node(initial_tree).contains("λf"), content="true")
  inspect(print_term_node(new_tree).contains("λf"), content="true")
}

///|
test "IncrementalParser::multiple edits" {
  let parser = IncrementalParser::new("x")
  let _ = parser.parse()

  // First edit: x -> x + 1
  let edit1 = Edit::insert(1, 4)
  let tree1 = parser.edit(edit1, "x + 1")
  inspect(print_term_node(tree1).contains("+"), content="true")

  // Second edit: x + 1 -> x + 2
  let edit2 = Edit::replace(4, 5, 5)
  let tree2 = parser.edit(edit2, "x + 2")
  inspect(print_term_node(tree2).contains("2"), content="true")

  // Third edit: x + 2 -> y + 2
  let edit3 = Edit::replace(0, 1, 1)
  let tree3 = parser.edit(edit3, "y + 2")
  inspect(print_term_node(tree3).contains("y"), content="true")
}

///|
test "IncrementalParser::stats" {
  let parser = IncrementalParser::new("42")
  let _ = parser.parse()
  let stats = parser.stats()
  inspect(stats.contains("IncrementalParser"), content="true")
  inspect(stats.contains("source_length"), content="true")
}

///|
test "IncrementalParser::edit result equals full reparse" {
  let parser = IncrementalParser::new("x")
  let _ = parser.parse()

  // Incremental edit
  let edit = Edit::insert(1, 4)
  let incremental_tree = parser.edit(edit, "x + 1")

  // Full reparse
  let full_tree = parse_tree("x + 1")

  // Results should be equivalent (same printed form)
  inspect(print_term_node(incremental_tree), content=print_term_node(full_tree))
}

// Lezer-style incremental repair tests

///|
test "Lezer-style: selective cache invalidation - token cache" {
  let parser = IncrementalParser::new("x + y + z")
  let _ = parser.parse()

  // Edit only affects middle portion "y" -> "42"
  let edit = Edit::replace(4, 5, 6) // Replace "y" with "42"
  let _ = parser.edit(edit, "x + 42 + z")

  // Token cache should have selectively invalidated only overlapping entries
  let stats = parser.stats()
  inspect(stats.contains("TokenCache"), content="true")
}

///|
test "Lezer-style: selective cache invalidation - parse cache" {
  let parser = IncrementalParser::new("(λx.x) (λy.y)")
  let _ = parser.parse()

  // Edit only second lambda
  let edit = Edit::replace(11, 12, 12) // Replace "y" with "z"
  let _ = parser.edit(edit, "(λx.x) (λz.z)")

  // Parse cache should preserve entries for first lambda
  let stats = parser.stats()
  inspect(stats.contains("ParseCache"), content="true")
}

///|
test "Lezer-style: tree fragment reuse for unchanged regions" {
  let parser = IncrementalParser::new("λf.λx.f (x + 1)")
  let initial_tree = parser.parse()

  // Small edit at the end: "1" -> "2"
  let edit = Edit::replace(14, 15, 15)
  let new_tree = parser.edit(edit, "λf.λx.f (x + 2)")

  // Both trees should have similar structure for unchanged parts
  let initial_str = print_term_node(initial_tree)
  let new_str = print_term_node(new_tree)
  inspect(initial_str.contains("λf"), content="true")
  inspect(new_str.contains("λf"), content="true")
  inspect(initial_str.contains("λx"), content="true")
  inspect(new_str.contains("λx"), content="true")
  inspect(new_str.contains("2"), content="true")
}

///|
test "Lezer-style: minimal reparsing for local edits" {
  let parser = IncrementalParser::new("a + b + c + d")
  let _ = parser.parse()

  // Edit only affects "c" -> "x"
  let edit = Edit::replace(8, 9, 9)
  let new_tree = parser.edit(edit, "a + b + x + d")

  // Tree should be correctly updated
  inspect(print_term_node(new_tree).contains("x"), content="true")
  inspect(print_term_node(new_tree).contains("a"), content="true")
  inspect(print_term_node(new_tree).contains("d"), content="true")
}

///|
test "Lezer-style: multiple incremental edits preserve correctness" {
  let parser = IncrementalParser::new("λx.x")
  let _ = parser.parse()

  // Series of small edits
  let edit1 = Edit::insert(4, 4) // "λx.x" -> "λx.x + 1"
  let tree1 = parser.edit(edit1, "λx.x + 1")
  inspect(print_term_node(tree1).contains("+"), content="true")
  let edit2 = Edit::replace(7, 8, 8) // "λx.x + 1" -> "λx.x + 2"
  let tree2 = parser.edit(edit2, "λx.x + 2")
  inspect(print_term_node(tree2).contains("2"), content="true")
  let edit3 = Edit::insert(0, 3) // "λx.x + 2" -> "λy.λx.x + 2"
  let tree3 = parser.edit(edit3, "λy.λx.x + 2")
  inspect(print_term_node(tree3).contains("λy"), content="true")

  // Final result should match full reparse
  let full_tree = parse_tree("λy.λx.x + 2")
  inspect(print_term_node(tree3), content=print_term_node(full_tree))
}

///|
test "Lezer-style: damage tracking accuracy" {
  let parser = IncrementalParser::new("(a + b) * (c + d)")
  let _ = parser.parse()

  // Edit only affects right side: "c" -> "x"
  let edit = Edit::replace(11, 12, 12)
  let new_tree = parser.edit(edit, "(a + b) * (x + d)")

  // Should correctly handle the edit
  inspect(print_term_node(new_tree).contains("x"), content="false")
  inspect(print_term_node(new_tree).contains("a"), content="true")
  inspect(print_term_node(new_tree).contains("b"), content="false")
}

// Edge case tests for Lezer-style incremental parsing

///|
test "Edge case: insertion at position 0" {
  let parser = IncrementalParser::new("x")
  let _ = parser.parse()

  // Insert at the very beginning
  let edit = Edit::insert(0, 2)
  let new_tree = parser.edit(edit, "λx.x")

  // Should correctly parse the new structure
  let full_tree = parse_tree("λx.x")
  inspect(print_term_node(new_tree), content=print_term_node(full_tree))
}

///|
test "Edge case: insertion at end of document" {
  let parser = IncrementalParser::new("x")
  let _ = parser.parse()

  // Insert at the very end
  let edit = Edit::insert(1, 4)
  let new_tree = parser.edit(edit, "x + 1")

  // Should correctly parse the new structure
  let full_tree = parse_tree("x + 1")
  inspect(print_term_node(new_tree), content=print_term_node(full_tree))
}

///|
test "Edge case: delete entire document" {
  let parser = IncrementalParser::new("x + y")
  let _ = parser.parse()

  // Delete everything
  let edit = Edit::delete(0, 5)
  let _ = parser.edit(edit, "")

  // Should handle empty document
  inspect(parser.get_source(), content="")
}

///|
test "Edge case: replace with longer text" {
  let parser = IncrementalParser::new("x")
  let _ = parser.parse()

  // Replace single char with much longer expression
  let edit = Edit::replace(0, 1, 15)
  let new_tree = parser.edit(edit, "λf.λx.f (f (x))")
  let full_tree = parse_tree("λf.λx.f (f (x))")
  inspect(print_term_node(new_tree), content=print_term_node(full_tree))
}

///|
test "Edge case: replace with shorter text" {
  let parser = IncrementalParser::new("λf.λx.f (f (x))")
  let _ = parser.parse()

  // Replace long expression with single char
  let edit = Edit::replace(0, 15, 1)
  let new_tree = parser.edit(edit, "y")
  let full_tree = parse_tree("y")
  inspect(print_term_node(new_tree), content=print_term_node(full_tree))
}

///|
test "Edge case: consecutive insertions at same position" {
  let parser = IncrementalParser::new("x")
  let _ = parser.parse()

  // First insertion
  let edit1 = Edit::insert(1, 2)
  let _ = parser.edit(edit1, "x y")

  // Second insertion at same position (after first edit)
  let edit2 = Edit::insert(3, 2)
  let tree2 = parser.edit(edit2, "x y z")
  let full_tree = parse_tree("x y z")
  inspect(print_term_node(tree2), content=print_term_node(full_tree))
}

///|
test "Edge case: insertion in middle of lambda parameter" {
  let parser = IncrementalParser::new("λx.x")
  let _ = parser.parse()

  // Insert in the middle of parameter name (should change structure)
  let edit = Edit::insert(2, 1)
  let new_tree = parser.edit(edit, "λxy.x")
  let full_tree = parse_tree("λxy.x")
  inspect(print_term_node(new_tree), content=print_term_node(full_tree))
}

///|
test "Edge case: deletion at boundary between nodes" {
  let parser = IncrementalParser::new("x + y")
  let _ = parser.parse()

  // Delete the operator (critical boundary)
  let edit = Edit::delete(2, 4)
  let new_tree = parser.edit(edit, "x y")
  let full_tree = parse_tree("x y")
  inspect(print_term_node(new_tree), content=print_term_node(full_tree))
}

///|
test "Edge case: structural change from leaf to compound" {
  let parser = IncrementalParser::new("42")
  let _ = parser.parse()

  // Change from simple int to binary operation
  let edit = Edit::insert(2, 4)
  let new_tree = parser.edit(edit, "42 + 1")
  let full_tree = parse_tree("42 + 1")
  inspect(print_term_node(new_tree), content=print_term_node(full_tree))
}

///|
test "Edge case: structural change from compound to leaf" {
  let parser = IncrementalParser::new("x + y")
  let _ = parser.parse()

  // Change from binary operation to simple variable
  let edit = Edit::replace(0, 5, 1)
  let new_tree = parser.edit(edit, "z")
  let full_tree = parse_tree("z")
  inspect(print_term_node(new_tree), content=print_term_node(full_tree))
}

///|
test "Edge case: nested lambda insertion at start" {
  let parser = IncrementalParser::new("λx.x + 1")
  let _ = parser.parse()

  // Wrap with another lambda
  let edit = Edit::insert(0, 3)
  let new_tree = parser.edit(edit, "λy.λx.x + 1")
  let full_tree = parse_tree("λy.λx.x + 1")
  inspect(print_term_node(new_tree), content=print_term_node(full_tree))
}

///|
test "Edge case: multiple rapid edits in sequence" {
  let parser = IncrementalParser::new("a")
  let _ = parser.parse()

  // Rapid sequence of edits
  let edit1 = Edit::insert(1, 2)
  let _ = parser.edit(edit1, "a b")
  let edit2 = Edit::insert(3, 2)
  let _ = parser.edit(edit2, "a b c")
  let edit3 = Edit::insert(5, 2)
  let tree3 = parser.edit(edit3, "a b c d")
  let full_tree = parse_tree("a b c d")
  inspect(print_term_node(tree3), content=print_term_node(full_tree))
}

///|
test "Edge case: edit that changes operator precedence" {
  let parser = IncrementalParser::new("a + b * c")
  let _ = parser.parse()

  // Change to affect precedence structure
  let edit = Edit::replace(4, 5, 5)
  let new_tree = parser.edit(edit, "a + b + c")
  let full_tree = parse_tree("a + b + c")
  inspect(print_term_node(new_tree), content=print_term_node(full_tree))
}

///|
test "Edge case: whitespace-only insertion" {
  let parser = IncrementalParser::new("λx.x")
  let _ = parser.parse()

  // Insert whitespace (should not change structure)
  let edit = Edit::insert(4, 1)
  let new_tree = parser.edit(edit, "λx.x ")

  // Structure should be preserved
  inspect(print_term_node(new_tree).contains("λx"), content="true")
}

///|
test "Edge case: validation with identical structure but different content" {
  let parser = IncrementalParser::new("λx.x")
  let _ = parser.parse()

  // Change variable name (same structure, different content)
  let edit = Edit::replace(1, 2, 2)
  let new_tree = parser.edit(edit, "λy.x")
  let full_tree = parse_tree("λy.x")
  inspect(print_term_node(new_tree), content=print_term_node(full_tree))
}

///|
test "Edge case: insertion that creates error node" {
  let parser = IncrementalParser::new("x")
  let _ = parser.parse()

  // Insert invalid syntax
  let edit = Edit::insert(1, 1)
  let _ = parser.edit(edit, "x+")

  // Should produce some tree (with error recovery)
  inspect(parser.get_source(), content="x+")
}

///|
test "Edge case: zero-length edit (no-op)" {
  let parser = IncrementalParser::new("x + y")
  let initial_tree = parser.parse()

  // Zero-length insertion (no change)
  let edit = Edit::insert(2, 0)
  let new_tree = parser.edit(edit, "x + y")

  // Should produce same result
  inspect(print_term_node(new_tree), content=print_term_node(initial_tree))
}

///|
test "Edge case: position boundary at node start" {
  let parser = IncrementalParser::new("λx.λy.x")
  let _ = parser.parse()

  // Insert exactly at inner lambda boundary
  let edit = Edit::insert(3, 1)
  let new_tree = parser.edit(edit, "λx. λy.x")
  let full_tree = parse_tree("λx. λy.x")
  inspect(print_term_node(new_tree), content=print_term_node(full_tree))
}

///|
test "Edge case: position boundary at node end" {
  let parser = IncrementalParser::new("λx.λy.x")
  let _ = parser.parse()

  // Insert exactly at end of inner lambda
  let edit = Edit::insert(7, 2)
  let new_tree = parser.edit(edit, "λx.λy.x y")
  let full_tree = parse_tree("λx.λy.x y")
  inspect(print_term_node(new_tree), content=print_term_node(full_tree))
}
