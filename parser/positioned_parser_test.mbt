// Tests for positioned parser with source tracking

test "parse_positioned simple integer" {
  let node = parse_positioned("42")
  let printed = print_term_node(node)
  inspect(printed, content="42")
  inspect(node.start, content="0")
  inspect(node.end, content="2")
}

test "parse_positioned simple variable" {
  let node = parse_positioned("x")
  let printed = print_term_node(node)
  inspect(printed, content="x")
  inspect(node.start, content="0")
  inspect(node.end, content="1")
}

test "parse_positioned identity function" {
  let node = parse_positioned("λx.x")
  let printed = print_term_node(node)
  inspect(printed, content="(λx. x)")
  inspect(node.start, content="0")
  // Should span from λ to the end of body
  inspect(node.end >= 3, content="true")
}

test "parse_positioned binary operator" {
  let node = parse_positioned("1 + 2")
  let printed = print_term_node(node)
  inspect(printed, content="(1 + 2)")
  inspect(node.children.length(), content="2")
  // Check left operand
  inspect(node.children[0].start, content="0")
  // Check right operand
  inspect(node.children[1].start, content="4")
}

test "parse_positioned application" {
  let node = parse_positioned("f x")
  let printed = print_term_node(node)
  inspect(printed, content="(f x)")
  inspect(node.children.length(), content="2")
}

test "parse_positioned if-then-else" {
  let node = parse_positioned("if x then y else z")
  let printed = print_term_node(node)
  inspect(printed, content="if x then y else z")
  inspect(node.children.length(), content="3")
}

test "parse_positioned complex expression" {
  let node = parse_positioned("λf.λx.f x")
  let printed = print_term_node(node)
  inspect(printed.contains("λf"), content="true")
  inspect(printed.contains("λx"), content="true")
  // Outer lambda should have one child (the inner lambda)
  inspect(node.children.length(), content="1")
}

test "parse_positioned node IDs are unique" {
  let node = parse_positioned("f x y")
  // Root node
  let root_id = node.node_id
  // Left child (f x)
  let left_id = node.children[0].node_id
  // Right child (y)
  let right_id = node.children[1].node_id
  // All IDs should be different
  inspect(root_id != left_id, content="true")
  inspect(root_id != right_id, content="true")
  inspect(left_id != right_id, content="true")
}

test "parse_positioned preserves source positions" {
  let node = parse_positioned("  x  +  y  ")
  // x should start around position 2
  let left_child = node.children[0]
  inspect(left_child.start >= 2, content="true")
  inspect(left_child.end >= 3, content="true")
  // y should start around position 8
  let right_child = node.children[1]
  inspect(right_child.start >= 7, content="true")
}
