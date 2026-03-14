///|
test "source_file_to_proj_node: single expression" {
  let ip = @loom.new_imperative_parser("42", @parser.source_file_grammar)
  let syntax = ip.parse()
  let proj = source_file_to_proj_node(syntax, Ref::new(0))
  inspect(proj.kind, content="Int(42)")
}

///|
test "source_file_to_proj_node: single let def + expression" {
  let ip = @loom.new_imperative_parser(
    "let x = 1\nx", @parser.source_file_grammar,
  )
  let syntax = ip.parse()
  let proj = source_file_to_proj_node(syntax, Ref::new(0))
  inspect(proj.kind, content="Let(\"x\", Int(1), Var(\"x\"))")
  inspect(proj.children.length(), content="2")
}

///|
test "source_file_to_proj_node: multiple let defs" {
  let ip = @loom.new_imperative_parser(
    "let x = 1\nlet y = 2\nx + y", @parser.source_file_grammar,
  )
  let syntax = ip.parse()
  let proj = source_file_to_proj_node(syntax, Ref::new(0))
  inspect(
    proj.kind,
    content="Let(\"x\", Int(1), Let(\"y\", Int(2), Bop(Plus, Var(\"x\"), Var(\"y\"))))",
  )
}

///|
test "source_file_to_proj_node: no final expression defaults to Unit" {
  let ip = @loom.new_imperative_parser(
    "let x = 1\n", @parser.source_file_grammar,
  )
  let syntax = ip.parse()
  let proj = source_file_to_proj_node(syntax, Ref::new(0))
  inspect(proj.kind, content="Let(\"x\", Int(1), Unit)")
}

///|
test "source_file_to_proj_node: empty document" {
  let ip = @loom.new_imperative_parser("", @parser.source_file_grammar)
  let syntax = ip.parse()
  let proj = source_file_to_proj_node(syntax, Ref::new(0))
  inspect(proj.kind, content="Unit")
}

///|
test "source_file_to_proj_node: inline let-in falls back to LetExpr" {
  let ip = @loom.new_imperative_parser(
    "let x = 1 in x", @parser.source_file_grammar,
  )
  let syntax = ip.parse()
  let proj = source_file_to_proj_node(syntax, Ref::new(0))
  inspect(proj.kind, content="Let(\"x\", Int(1), Var(\"x\"))")
}
