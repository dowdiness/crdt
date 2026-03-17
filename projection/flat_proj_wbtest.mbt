///|
test "to_flat_proj: single expression" {
  let ip = @loom.new_imperative_parser("42", @parser.lambda_grammar)
  let syntax = ip.parse()
  let fp = to_flat_proj(syntax, Ref::new(0))
  inspect(fp.defs.length(), content="0")
  inspect(fp.final_expr.map(fn(n) { n.kind.to_string() }), content="Some(\"Int(42)\")")
}

///|
test "to_flat_proj: single let def + expression" {
  let ip = @loom.new_imperative_parser("let x = 1\nx", @parser.lambda_grammar)
  let syntax = ip.parse()
  let fp = to_flat_proj(syntax, Ref::new(0))
  inspect(fp.defs.length(), content="1")
  inspect(fp.defs[0].0, content="x")
  inspect(fp.defs[0].1.kind, content="Int(1)")
  inspect(fp.final_expr.map(fn(n) { n.kind.to_string() }), content="Some(\"Var(\\\"x\\\")\")")
}

///|
test "to_flat_proj: multiple let defs" {
  let ip = @loom.new_imperative_parser(
    "let x = 1\nlet y = 2\nx + y", @parser.lambda_grammar,
  )
  let syntax = ip.parse()
  let fp = to_flat_proj(syntax, Ref::new(0))
  inspect(fp.defs.length(), content="2")
  inspect(fp.defs[0].0, content="x")
  inspect(fp.defs[1].0, content="y")
}

///|
test "to_flat_proj: no final expression defaults to None" {
  let ip = @loom.new_imperative_parser("let x = 1\n", @parser.lambda_grammar)
  let syntax = ip.parse()
  let fp = to_flat_proj(syntax, Ref::new(0))
  inspect(fp.defs.length(), content="1")
  inspect(fp.final_expr, content="None")
}

///|
test "to_flat_proj: empty document" {
  let ip = @loom.new_imperative_parser("", @parser.lambda_grammar)
  let syntax = ip.parse()
  let fp = to_flat_proj(syntax, Ref::new(0))
  inspect(fp.defs.length(), content="0")
  inspect(fp.final_expr, content="None")
}
