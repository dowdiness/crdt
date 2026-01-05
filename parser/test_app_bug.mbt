// Test for function application parsing bug

///|
test "parse function application (\\x.x) 5" {
  let input = "(\\x.x) 5"
  let result = parse_tree(input)
  println("Input: \{input}")
  println("AST: \{result}")
  println("AST kind: \{result.kind}")
  println("AST range: [\{result.start}:\{result.end}]")
  println("AST children count: \{result.children.length()}")

  // The AST should be an App node with Lam and Int children
  let expected_kind =
    #|App
  inspect(result.kind, content=expected_kind)
  inspect(result.children.length(), content="2")
}

///|
test "parse simple application x 5" {
  let input = "x 5"
  let result = parse_tree(input)
  println("Input: \{input}")
  println("AST: \{result}")
  println("AST kind: \{result.kind}")
  println("AST range: [\{result.start}:\{result.end}]")

  // The AST should be an App node
  let expected_kind =
    #|App
  inspect(result.kind, content=expected_kind)
}

///|
test "parse parenthesized lambda (\\x.x)" {
  let input = "(\\x.x)"
  let result = parse_tree(input)
  println("Input: \{input}")
  println("AST: \{result}")
  println("AST kind: \{result.kind}")
  println("AST range: [\{result.start}:\{result.end}]")

  // Should be a Lam node
  match result.kind {
    TermKind::Lam(_) => ()
    _ => abort("Expected Lam node, got \{result.kind}")
  }
}
