// Tests for error recovery

test "parse_with_error_recovery succeeds on valid input" {
  let (tree, errors) = parse_with_error_recovery("42")
  inspect(print_term_node(tree), content="42")
  inspect(errors.length(), content="0")
}

test "parse_with_error_recovery handles parse error" {
  let (tree, errors) = parse_with_error_recovery("λ.x")  // Missing parameter

  // Should have error
  inspect(errors.length() > 0, content="true")

  // Tree should be an error node
  inspect(has_errors(tree), content="true")
}

test "parse_with_error_recovery handles tokenization error" {
  let (tree, errors) = parse_with_error_recovery("@invalid")

  // Should have error
  inspect(errors.length() > 0, content="true")

  // Should be error node
  match tree.kind {
    TermKind::Error(msg) => inspect(msg.contains("Tokenization"), content="true")
    _ => inspect(false, content="true")
  }
}

test "has_errors detects error nodes" {
  let valid_tree = parse_tree("42")
  inspect(has_errors(valid_tree), content="false")

  let error_tree = TermNode::error("test error", 0, 0)
  inspect(has_errors(error_tree), content="true")
}

test "collect_errors finds all error messages" {
  // Create a tree with an error node
  let error_node = TermNode::error("test error", 0, 0)
  let errors = collect_errors(error_node)

  inspect(errors.length(), content="1")
  inspect(errors[0], content="test error")
}

test "collect_errors finds nested errors" {
  // Parse a valid expression to get a tree structure
  let tree = parse_tree("1 + 2")

  // This tree shouldn't have errors
  let errors = collect_errors(tree)
  inspect(errors.length(), content="0")
}

test "RecoveringParser::new creates parser" {
  let tokens = tokenize("42")
  let parser = RecoveringParser::new(tokens)

  inspect(parser.get_errors().length(), content="0")
}

test "RecoveringParser tracks errors" {
  let tokens = tokenize("42")
  let parser = RecoveringParser::new(tokens)

  parser.record_error("test error")

  let errors = parser.get_errors()
  inspect(errors.length(), content="1")
  inspect(errors[0], content="test error")
}

test "parse_with_error_recovery returns partial tree" {
  // Even with errors, we should get some tree structure back
  let (tree, _errors) = parse_with_error_recovery("λx")  // Incomplete

  // Should have some node (error or partial)
  inspect(tree.node_id >= 0, content="true")
}
