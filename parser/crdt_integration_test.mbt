// Tests for CRDT integration

test "ast_to_crdt converts integer" {
  let ast = parse_positioned("42")
  let crdt = ast_to_crdt(ast)

  inspect(crdt.node_type, content="int_literal")
  inspect(crdt.text_value, content="42")
}

test "ast_to_crdt converts variable" {
  let ast = parse_positioned("x")
  let crdt = ast_to_crdt(ast)

  inspect(crdt.node_type, content="variable")
  inspect(crdt.text_value, content="x")
}

test "ast_to_crdt converts lambda" {
  let ast = parse_positioned("λx.x")
  let crdt = ast_to_crdt(ast)

  inspect(crdt.node_type, content="lambda")
  inspect(crdt.text_value, content="x")
  inspect(crdt.children.length(), content="1")
}

test "ast_to_crdt converts application" {
  let ast = parse_positioned("f x")
  let crdt = ast_to_crdt(ast)

  inspect(crdt.node_type, content="application")
  inspect(crdt.children.length(), content="2")
}

test "ast_to_crdt converts binary operation" {
  let ast = parse_positioned("1 + 2")
  let crdt = ast_to_crdt(ast)

  inspect(crdt.node_type, content="binary_op_plus")
  inspect(crdt.children.length(), content="2")
}

test "ast_to_crdt preserves positions" {
  let ast = parse_positioned("42")
  let crdt = ast_to_crdt(ast)

  let start_attr = crdt.attributes.get("start")
  let end_attr = crdt.attributes.get("end")

  inspect(start_attr is Some(_), content="true")
  inspect(end_attr is Some(_), content="true")
}

test "crdt_to_source reconstructs integer" {
  let ast = parse_positioned("42")
  let crdt = ast_to_crdt(ast)
  let source = crdt_to_source(crdt)

  inspect(source, content="42")
}

test "crdt_to_source reconstructs variable" {
  let ast = parse_positioned("x")
  let crdt = ast_to_crdt(ast)
  let source = crdt_to_source(crdt)

  inspect(source, content="x")
}

test "crdt_to_source reconstructs lambda" {
  let ast = parse_positioned("λx.x")
  let crdt = ast_to_crdt(ast)
  let source = crdt_to_source(crdt)

  inspect(source.contains("λx"), content="true")
}

test "crdt_to_source reconstructs application" {
  let ast = parse_positioned("f x")
  let crdt = ast_to_crdt(ast)
  let source = crdt_to_source(crdt)

  inspect(source.contains("f"), content="true")
  inspect(source.contains("x"), content="true")
}

test "crdt_to_source reconstructs binary operation" {
  let ast = parse_positioned("1 + 2")
  let crdt = ast_to_crdt(ast)
  let source = crdt_to_source(crdt)

  inspect(source.contains("1"), content="true")
  inspect(source.contains("+"), content="true")
  inspect(source.contains("2"), content="true")
}

test "ParsedDocument::new creates document" {
  let doc = ParsedDocument::new("42")
  inspect(doc.get_source(), content="42")
  inspect(doc.get_crdt_tree() is None, content="true")
}

test "ParsedDocument::parse creates CRDT tree" {
  let doc = ParsedDocument::new("42")
  doc.parse()

  let tree = doc.get_crdt_tree()
  inspect(tree is None, content="false")

  match tree {
    Some(t) => inspect(t.node_type, content="int_literal")
    None => inspect(false, content="true")
  }
}

test "ParsedDocument::edit updates tree" {
  let doc = ParsedDocument::new("x")
  doc.parse()

  // Edit: x -> x + 1
  let edit = Edit::insert(1, 4)
  doc.edit(edit, "x + 1")

  let tree = doc.get_crdt_tree()
  match tree {
    Some(t) => inspect(t.node_type, content="binary_op_plus")
    None => inspect(false, content="true")
  }
}

test "ParsedDocument::reconstruct_source" {
  let doc = ParsedDocument::new("λx.x")
  doc.parse()

  let reconstructed = doc.reconstruct_source()
  inspect(reconstructed.contains("λx"), content="true")
}

test "print_crdt_tree produces readable output" {
  let ast = parse_positioned("42")
  let crdt = ast_to_crdt(ast)
  let output = print_crdt_tree(crdt, 0)

  inspect(output.contains("int_literal"), content="true")
  inspect(output.contains("42"), content="true")
}

test "round trip: source -> AST -> CRDT -> source" {
  let original = "λf.λx.f x"
  let ast = parse_positioned(original)
  let crdt = ast_to_crdt(ast)
  let reconstructed = crdt_to_source(crdt)

  // Should preserve the essential structure
  inspect(reconstructed.contains("λf"), content="true")
  inspect(reconstructed.contains("λx"), content="true")
  inspect(reconstructed.contains("f"), content="true")
  inspect(reconstructed.contains("x"), content="true")
}

test "CRDT integration with incremental edits" {
  let doc = ParsedDocument::new("x")
  doc.parse()

  // First edit
  let edit1 = Edit::insert(1, 4)
  doc.edit(edit1, "x + 1")

  // Second edit
  let edit2 = Edit::replace(4, 5, 5)
  doc.edit(edit2, "x + 2")

  let source = doc.reconstruct_source()
  inspect(source.contains("2"), content="true")
}
