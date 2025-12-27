// Tests for incremental parser

test "IncrementalParser::new creates parser" {
  let parser = IncrementalParser::new("42")
  inspect(parser.get_source(), content="42")
  inspect(parser.get_tree() is None, content="true")
}

test "IncrementalParser::parse initial parse" {
  let parser = IncrementalParser::new("λx.x")
  let tree = parser.parse()

  inspect(print_term_node(tree), content="(λx. x)")
  inspect(parser.get_tree() is None, content="false")
}

test "IncrementalParser::edit simple insertion" {
  let parser = IncrementalParser::new("42")
  let _ = parser.parse()

  // Insert " + 1" at the end
  let edit = Edit::insert(2, 4)  // Insert 4 chars at position 2
  let new_tree = parser.edit(edit, "42 + 1")

  inspect(print_term_node(new_tree).contains("42"), content="true")
  inspect(print_term_node(new_tree).contains("+"), content="true")
  inspect(print_term_node(new_tree).contains("1"), content="true")
}

test "IncrementalParser::edit simple deletion" {
  let parser = IncrementalParser::new("42 + 1")
  let _ = parser.parse()

  // Delete " + 1"
  let edit = Edit::delete(2, 6)
  let new_tree = parser.edit(edit, "42")

  inspect(print_term_node(new_tree), content="42")
}

test "IncrementalParser::edit replacement" {
  let parser = IncrementalParser::new("x")
  let _ = parser.parse()

  // Replace "x" with "y"
  let edit = Edit::replace(0, 1, 1)
  let new_tree = parser.edit(edit, "y")

  inspect(print_term_node(new_tree), content="y")
}

test "IncrementalParser::edit with no initial tree" {
  let parser = IncrementalParser::new("x")

  // Edit without parsing first
  let edit = Edit::replace(0, 1, 1)
  let tree = parser.edit(edit, "y")

  inspect(print_term_node(tree), content="y")
}

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

test "IncrementalParser::stats" {
  let parser = IncrementalParser::new("42")
  let _ = parser.parse()

  let stats = parser.stats()
  inspect(stats.contains("IncrementalParser"), content="true")
  inspect(stats.contains("source_length"), content="true")
}

test "IncrementalParser::edit result equals full reparse" {
  let parser = IncrementalParser::new("x")
  let _ = parser.parse()

  // Incremental edit
  let edit = Edit::insert(1, 4)
  let incremental_tree = parser.edit(edit, "x + 1")

  // Full reparse
  let full_tree = parse_positioned("x + 1")

  // Results should be equivalent (same printed form)
  inspect(
    print_term_node(incremental_tree),
    content=print_term_node(full_tree),
  )
}
