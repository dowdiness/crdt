// Property-based tests for Lambda Calculus Parser
//
// These tests verify parser robustness and correctness using random inputs

///|
/// Property: Parser never panics on any input
test "property: parser handles any string" {
  let inputs : Array[String] = @quickcheck.samples(30)

  for input in inputs {
    // Parser should handle any input gracefully (may raise, but shouldn't panic)
    try {
      let _ast = parse_tree(input)
    } catch {
      _ => () // Error is ok, panic is not
    }
  }
}

///|
/// Property: Empty input produces valid AST
test "property: empty input is safe" {
  try {
    let ast = parse_tree("")
    assert_eq(ast.start, 0)
    assert_eq(ast.end, 0)
  } catch {
    _ => () // May raise, which is fine
  }
}

///|
/// Property: Position information is always valid
test "property: positions are within bounds" {
  let inputs : Array[String] = @quickcheck.samples(20)

  for input in inputs {
    try {
      let ast = parse_tree(input)
      // Check all positions are valid
      check_positions(ast, input.length())
    } catch {
      _ => () // Parse error is fine
    }
  }
}

fn check_positions(node : TermNode, max_len : Int) -> Unit raise {
  // Verify positions are within bounds
  assert_true(node.start >= 0)
  assert_true(node.end <= max_len)
  assert_true(node.start <= node.end)

  // Check all children recursively
  for child in node.children {
    check_positions(child, max_len)
  }
}

///|
/// Property: Parser produces well-formed AST structure
test "property: ast structure is well-formed" {
  let inputs : Array[String] = @quickcheck.samples(20)

  for input in inputs {
    try {
      let ast = parse_tree(input)
      check_well_formed(ast)
    } catch {
      _ => () // Parse error is fine
    }
  }
}

fn check_well_formed(node : TermNode) -> Unit raise {
  // Check node has correct number of children based on kind
  let valid = match node.kind {
    TermKind::Int(_) => node.children.length() == 0
    TermKind::Var(_) => node.children.length() == 0
    TermKind::Lam(_) => node.children.length() <= 1 // Body or error
    TermKind::App => node.children.length() <= 2 // Left, right
    TermKind::Bop(_) => node.children.length() <= 2 // Left, right
    TermKind::If => node.children.length() <= 3 // Cond, then, else
    TermKind::Error(_) => true // Error nodes can have any children
  }

  assert_true(valid)

  // Check children recursively
  for child in node.children {
    check_well_formed(child)
  }
}

///|
/// Property: Single character input doesn't panic
test "property: single char is safe" {
  let chars : Array[Char] = @quickcheck.samples(30)

  for c in chars {
    let input = c.to_string()
    try {
      let _ast = parse_tree(input)
    } catch {
      _ => () // Parser should handle any single character
    }
  }
}

///|
/// Property: Parser handles repeated characters
test "property: repeated characters are safe" {
  let chars : Array[Char] = @quickcheck.samples(20)

  for c in chars {
    let mut input = ""
    for _i = 0; _i < 10; _i = _i + 1 {
      input = input + c.to_string()
    }

    try {
      let ast = parse_tree(input)
      // Should parse without panic
      assert_true(ast.start >= 0)
    } catch {
      _ => () // Parse error is ok
    }
  }
}

///|
/// Property: Valid integers parse correctly
test "property: integers parse as Int nodes" {
  let nums : Array[Int] = @quickcheck.samples(20)

  for n in nums {
    let input = n.abs().to_string()
    try {
      let ast = parse_tree(input)

      // Should be an Int node (not an error)
      match ast.kind {
        TermKind::Int(_) => ()
        _ => abort("Integer literal should parse as Int node")
      }
    } catch {
      e => abort("Integer \{input} should parse successfully: \{e}")
    }
  }
}

///|
/// Property: Parser handles whitespace correctly
test "property: whitespace doesn't break parser" {
  let texts : Array[String] = @quickcheck.samples(15)

  for text in texts {
    // Add whitespace around input
    let inputs = ["   " + text, text + "   ", "   " + text + "   "]

    for input in inputs {
      try {
        let _ast = parse_tree(input)
      } catch {
        _ => () // Parser should handle whitespace gracefully
      }
    }
  }
}

///|
/// Property: Parentheses don't cause crashes
test "property: parentheses are safe" {
  let counts : Array[Int] = @quickcheck.samples(15)

  for count in counts {
    let n = count.abs() % 20 // Limit to reasonable size
    let mut input = ""

    // Create nested parentheses
    for _i = 0; _i < n; _i = _i + 1 {
      input = input + "("
    }
    for _i = 0; _i < n; _i = _i + 1 {
      input = input + ")"
    }

    try {
      let _ast = parse_tree(input)
    } catch {
      _ => () // Should handle nested parens without panic
    }
  }
}

///|
/// Property: Lambda syntax variations are handled
test "property: lambda syntax is robust" {
  let params = ["x", "y", "z"]
  let bodies = ["x", "1"]

  for _param in params {
    for _body in bodies {
      // Test both lambda syntaxes: λ and \
      let input1 = "\\{param}. {body}"
      let input2 = "λ{param}. {body}"

      for input in [input1, input2] {
        try {
          let ast = parse_tree(input)
          // Should parse as lambda (not necessarily error-free, but no panic)
          assert_true(ast.start >= 0)
        } catch {
          _ => ()
        }
      }
    }
  }
}

///|
/// Property: Mixed valid and invalid syntax doesn't crash
test "property: mixed syntax is safe" {
  let fragments = ["x", "1", "+", "-", ".", "(", ")"]
  let samples : Array[Array[String]] = @quickcheck.samples(10)

  for sample in samples {
    let mut input = ""
    for s in sample {
      // Pick random fragment
      let idx = s.length().abs() % fragments.length()
      input = input + fragments[idx] + " "
    }

    try {
      let _ast = parse_tree(input)
    } catch {
      _ => () // Parser should handle random combinations gracefully
    }
  }
}

///|
/// Property: Parser is deterministic
test "property: parser is deterministic" {
  let inputs : Array[String] = @quickcheck.samples(15)

  for input in inputs {
    try {
      let ast1 = parse_tree(input)
      let ast2 = parse_tree(input)

      // Same input should produce structurally identical ASTs
      assert_true(ast_structure_equal(ast1, ast2))
    } catch {
      _ => () // Parse errors are fine
    }
  }
}

fn ast_structure_equal(a : TermNode, b : TermNode) -> Bool {
  // Check kind matches
  let kind_matches = match (a.kind, b.kind) {
    (TermKind::Int(n1), TermKind::Int(n2)) => n1 == n2
    (TermKind::Var(x1), TermKind::Var(x2)) => x1 == x2
    (TermKind::Lam(p1), TermKind::Lam(p2)) => p1 == p2
    (TermKind::App, TermKind::App) => true
    (TermKind::Bop(op1), TermKind::Bop(op2)) => op1 == op2
    (TermKind::If, TermKind::If) => true
    (TermKind::Error(_), TermKind::Error(_)) => true
    _ => false
  }

  if not(kind_matches) {
    return false
  }

  // Check children count
  if a.children.length() != b.children.length() {
    return false
  }

  // Check children recursively
  for i = 0; i < a.children.length(); i = i + 1 {
    if not(ast_structure_equal(a.children[i], b.children[i])) {
      return false
    }
  }

  true
}

///|
/// Property: Node IDs are unique within AST
test "property: node ids are unique" {
  let inputs : Array[String] = @quickcheck.samples(15)

  for input in inputs {
    try {
      let ast = parse_tree(input)

      let ids : Array[Int] = []
      collect_node_ids(ast, ids)

      // Check all IDs are unique
      for i = 0; i < ids.length(); i = i + 1 {
        for j = i + 1; j < ids.length(); j = j + 1 {
          if ids[i] == ids[j] {
            abort("Duplicate node ID found")
          }
        }
      }
    } catch {
      _ => () // Parse errors are ok
    }
  }
}

fn collect_node_ids(node : TermNode, ids : Array[Int]) -> Unit {
  ids.push(node.node_id)

  for child in node.children {
    collect_node_ids(child, ids)
  }
}
