///|
fn parse_syntax(text : String) -> @seam.SyntaxNode {
  let (cst, _) = @parser.parse_cst(text) catch { _ => abort("parse failed") }
  @seam.SyntaxNode::from_cst(cst)
}

///|
fn count_defs(fp : FlatProj) -> Int {
  let mut count = 0
  for item in fp.items {
    if item is Def(_, _, _, _) {
      count = count + 1
    }
  }
  count
}

///|
fn get_def(fp : FlatProj, idx : Int) -> (String, ProjNode, Int, NodeId) {
  let mut def_idx = 0
  for item in fp.items {
    match item {
      Def(name, init, start, id) => {
        if def_idx == idx {
          return (name, init, start, id)
        }
        def_idx = def_idx + 1
      }
      Expr(_) => ()
    }
  }
  abort("def index out of bounds")
}

///|
fn get_first_expr(fp : FlatProj) -> ProjNode? {
  for item in fp.items {
    match item {
      Expr(proj) => return Some(proj)
      _ => ()
    }
  }
  None
}

///|
test "to_flat_proj: single expression" {
  let syntax = parse_syntax("42")
  let fp = to_flat_proj(syntax, Ref::new(0))
  inspect(count_defs(fp), content="0")
  inspect(
    get_first_expr(fp).map(fn(n) { n.kind.to_string() }),
    content="Some(\"Int(42)\")",
  )
}

///|
test "to_flat_proj: single let def + expression" {
  let syntax = parse_syntax("let x = 1\nx")
  let fp = to_flat_proj(syntax, Ref::new(0))
  inspect(count_defs(fp), content="1")
  let (name, init, _, _) = get_def(fp, 0)
  inspect(name, content="x")
  inspect(init.kind, content="Int(1)")
  inspect(
    get_first_expr(fp).map(fn(n) { n.kind.to_string() }),
    content="Some(\"Var(\\\"x\\\")\")",
  )
}

///|
test "to_flat_proj: multiple let defs" {
  let syntax = parse_syntax("let x = 1\nlet y = 2\nx + y")
  let fp = to_flat_proj(syntax, Ref::new(0))
  inspect(count_defs(fp), content="2")
  inspect(get_def(fp, 0).0, content="x")
  inspect(get_def(fp, 1).0, content="y")
}

///|
test "to_flat_proj: no final expression defaults to empty items" {
  let syntax = parse_syntax("let x = 1\n")
  let fp = to_flat_proj(syntax, Ref::new(0))
  inspect(count_defs(fp), content="1")
  inspect(get_first_expr(fp), content="None")
}

///|
test "to_flat_proj: empty document" {
  let syntax = parse_syntax("")
  let fp = to_flat_proj(syntax, Ref::new(0))
  inspect(fp.items.length(), content="0")
}

///|
test "reconcile_flat_proj: unchanged defs preserve IDs" {
  let syntax = parse_syntax("let x = 1\nlet y = 2\nx")
  let counter = Ref::new(0)
  let old = to_flat_proj(syntax, counter)
  let old_id_0 = get_def(old, 0).3
  let old_id_1 = get_def(old, 1).3

  // Simulate reparse (same text, fresh IDs)
  let syntax2 = parse_syntax("let x = 1\nlet y = 2\nx")
  let new_fp = to_flat_proj(syntax2, counter)

  let reconciled = reconcile_flat_proj(old, new_fp, counter)
  let new_id_0 = get_def(reconciled, 0).3
  let new_id_1 = get_def(reconciled, 1).3
  inspect(new_id_0 == old_id_0, content="true")
  inspect(new_id_1 == old_id_1, content="true")
}

///|
test "reconcile_flat_proj: changed init gets reconciled children" {
  let counter = Ref::new(0)
  let old = to_flat_proj(parse_syntax("let x = 1\nx"), counter)
  let old_id = get_def(old, 0).3

  let new_fp = to_flat_proj(parse_syntax("let x = 2\nx"), counter)

  let reconciled = reconcile_flat_proj(old, new_fp, counter)
  // Def NodeId preserved (same name, same position)
  inspect(get_def(reconciled, 0).3 == old_id, content="true")
  // Init value changed
  inspect(get_def(reconciled, 0).1.kind, content="Int(2)")
}

///|
test "reconcile_flat_proj: insertion gets fresh ID" {
  let counter = Ref::new(0)
  let old = to_flat_proj(parse_syntax("let x = 1\nx"), counter)
  let old_x_id = get_def(old, 0).3

  let new_fp = to_flat_proj(parse_syntax("let x = 1\nlet y = 2\nx"), counter)
  let reconciled = reconcile_flat_proj(old, new_fp, counter)

  inspect(count_defs(reconciled), content="2")
  // x preserved
  inspect(get_def(reconciled, 0).3 == old_x_id, content="true")
  // y is new — different ID from old x
  inspect(get_def(reconciled, 1).3 != old_x_id, content="true")
}

///|
test "reconcile_flat_proj: final_expr reconciled" {
  let counter = Ref::new(0)
  let old = to_flat_proj(parse_syntax("42"), counter)
  let old_final_id = get_first_expr(old).unwrap().node_id

  let new_fp = to_flat_proj(parse_syntax("99"), counter)

  let reconciled = reconcile_flat_proj(old, new_fp, counter)
  // Same kind (Int) → old ID preserved
  inspect(
    get_first_expr(reconciled).unwrap().node_id == old_final_id,
    content="true",
  )
  // Value changed
  inspect(get_first_expr(reconciled).unwrap().kind, content="Int(99)")
}

///|
test "print_flat_proj: single expression" {
  let fp = to_flat_proj(parse_syntax("42"), Ref::new(0))
  inspect(print_flat_proj(fp), content="42")
}

///|
test "print_flat_proj: single let + expression" {
  let fp = to_flat_proj(parse_syntax("let x = 1\nx"), Ref::new(0))
  inspect(print_flat_proj(fp), content="let x = 1\nx")
}

///|
test "print_flat_proj: multiple lets" {
  let fp = to_flat_proj(
    parse_syntax("let x = 1\nlet y = 2\nx + y"),
    Ref::new(0),
  )
  inspect(print_flat_proj(fp), content="let x = 1\nlet y = 2\n(x + y)")
}

///|
test "print_flat_proj: defs only (no final expression)" {
  let fp = to_flat_proj(parse_syntax("let x = 1\n"), Ref::new(0))
  inspect(print_flat_proj(fp), content="let x = 1")
}

///|
test "print_flat_proj: equivalence with print_term on nested spine" {
  let text = "let x = 1\nlet y = 2\nx + y"
  let syntax = parse_syntax(text)
  let counter = Ref::new(0)
  let nested = to_proj_node(syntax, counter)
  let counter2 = Ref::new(0)
  let flat = to_flat_proj(parse_syntax(text), counter2)
  inspect(print_flat_proj(flat) == @ast.print_term(nested.kind), content="true")
}

///|
test "FlatProj::to_proj_node: single expression" {
  let fp = to_flat_proj(parse_syntax("42"), Ref::new(0))
  let proj = fp.to_proj_node(Ref::new(100))
  inspect(proj.kind, content="Int(42)")
}

///|
test "FlatProj::to_proj_node: let defs reconstruct Module" {
  let fp = to_flat_proj(
    parse_syntax("let x = 1\nlet y = 2\nx + y"),
    Ref::new(0),
  )
  let proj = fp.to_proj_node(Ref::new(100))
  inspect(
    proj.kind,
    content=(
      #|Module([Def("x", Int(1)), Def("y", Int(2)), Expr(Bop(Plus, Var("x"), Var("y")))])
    ),
  )
}

///|
test "FlatProj::to_proj_node: Module node gets fresh ID (not def ID)" {
  let fp = to_flat_proj(parse_syntax("let x = 1\nx"), Ref::new(0))
  let def_id = get_def(fp, 0).3
  let proj = fp.to_proj_node(Ref::new(100))
  // Module node gets a fresh counter ID, not the first def's stored ID
  inspect(proj.node_id == def_id.0, content="false")
}

///|
test "FlatProj::from_proj_node: extracts Module items" {
  let (proj, _) = parse_to_proj_node("let x = 1\nlet y = 2\nx + y")
  let fp = FlatProj::from_proj_node(proj)
  inspect(count_defs(fp), content="2")
  inspect(get_def(fp, 0).0, content="x")
  inspect(get_def(fp, 1).0, content="y")
}

///|
test "FlatProj::from_proj_node: single expression (no Module)" {
  let (proj, _) = parse_to_proj_node("42")
  let fp = FlatProj::from_proj_node(proj)
  inspect(count_defs(fp), content="0")
}

///|
test "FlatProj roundtrip: to_flat_proj -> to_proj_node matches to_proj_node" {
  let text = "let x = 1\nlet y = 2\nx + y"
  let counter1 = Ref::new(0)
  let nested = to_proj_node(parse_syntax(text), counter1)

  let counter2 = Ref::new(0)
  let flat = to_flat_proj(parse_syntax(text), counter2)
  let roundtripped = flat.to_proj_node(Ref::new(100))

  // Same structure (kind matches)
  inspect(
    @ast.print_term(roundtripped.kind) == @ast.print_term(nested.kind),
    content="true",
  )
}

///|
test "FlatProj roundtrip: from_proj_node -> to_proj_node preserves text" {
  let text = "let x = 1\nlet y = 2\nx + y"
  let (proj, _) = parse_to_proj_node(text)
  let fp = FlatProj::from_proj_node(proj)
  let roundtripped = fp.to_proj_node(Ref::new(100))
  inspect(
    @ast.print_term(roundtripped.kind) == @ast.print_term(proj.kind),
    content="true",
  )
}

///|
test "reconcile_flat_proj: duplicate/shadowed names preserve correct IDs" {
  // old: let x = 1, let x = 2, x  →  new: let x = 1, let x = 2, x
  let counter = Ref::new(0)
  let old = to_flat_proj(parse_syntax("let x = 1\nlet x = 2\nx"), counter)
  let old_id_0 = get_def(old, 0).3 // first x
  let old_id_1 = get_def(old, 1).3 // second x

  let new_fp = to_flat_proj(parse_syntax("let x = 1\nlet x = 2\nx"), counter)
  let reconciled = reconcile_flat_proj(old, new_fp, counter)

  // Both IDs preserved in correct positions
  inspect(get_def(reconciled, 0).3 == old_id_0, content="true")
  inspect(get_def(reconciled, 1).3 == old_id_1, content="true")
}

///|
test "reconcile_flat_proj: shadow with insertion preserves first x ID" {
  // old: [x=1], x  →  new: [x=1, x=2], x
  let counter = Ref::new(0)
  let old = to_flat_proj(parse_syntax("let x = 1\nx"), counter)
  let old_x_id = get_def(old, 0).3

  let new_fp = to_flat_proj(parse_syntax("let x = 1\nlet x = 2\nx"), counter)
  let reconciled = reconcile_flat_proj(old, new_fp, counter)

  inspect(count_defs(reconciled), content="2")
  // First x preserves old ID
  inspect(get_def(reconciled, 0).3 == old_x_id, content="true")
  // Second x gets a fresh ID (different from first)
  inspect(get_def(reconciled, 1).3 != old_x_id, content="true")
}

///|
test "reconcile_flat_proj: empty old defs" {
  let counter = Ref::new(0)
  let old = to_flat_proj(parse_syntax("42"), counter)

  let new_fp = to_flat_proj(parse_syntax("let x = 1\n42"), counter)
  let reconciled = reconcile_flat_proj(old, new_fp, counter)

  inspect(count_defs(reconciled), content="1")
  inspect(get_def(reconciled, 0).0, content="x")
}

///|
test "reconcile_flat_proj: empty new defs" {
  let counter = Ref::new(0)
  let old = to_flat_proj(parse_syntax("let x = 1\n42"), counter)

  let new_fp = to_flat_proj(parse_syntax("42"), counter)
  let reconciled = reconcile_flat_proj(old, new_fp, counter)

  inspect(count_defs(reconciled), content="0")
}

///|
test "print_flat_proj: defs-only roundtrips through tree edit" {
  let text = "let x = 1\nlet y = 2\n"
  let fp = to_flat_proj(parse_syntax(text), Ref::new(0))
  let printed = print_flat_proj(fp)
  // Reconstruct via nested spine and verify equivalence
  let proj = fp.to_proj_node(Ref::new(100))
  inspect(printed == @ast.print_term(proj.kind), content="true")
}

///|
test "FlatProj::to_proj_node: Module node_id is stable across rebuilds" {
  let text = "let x = 1\nlet y = 2\nx + y"
  let counter = Ref::new(0)
  let fp1 = to_flat_proj(parse_syntax(text), counter)
  let proj1 = fp1.to_proj_node(counter)
  let module_id_1 = proj1.node_id

  // Rebuild with same text — should preserve Module node_id when seeded
  let counter2 = Ref::new(counter.val)
  let fp2 = to_flat_proj(parse_syntax(text), counter2)
  let proj2 = fp2.to_proj_node_with_prev_module_id(counter2, Some(module_id_1))
  let module_id_2 = proj2.node_id

  inspect(module_id_1 == module_id_2, content="true")
}

///|
test "FlatProj::to_proj_node: Module node_id seeded None still allocates fresh" {
  let text = "let x = 1\nx"
  let counter = Ref::new(0)
  let fp = to_flat_proj(parse_syntax(text), counter)
  let proj = fp.to_proj_node_with_prev_module_id(counter, None)
  // Without seed: fresh ID allocated from counter (>=0, valid)
  inspect(proj.node_id >= 0, content="true")
}

///|
test "to_flat_proj: interleaved let and expression" {
  let syntax = parse_syntax("let x = 1\nx\nlet y = 2\ny")
  let fp = to_flat_proj(syntax, Ref::new(0))
  inspect(
    fp.items.length(),
    content=(
      #|3
    ),
  )
  inspect(
    count_defs(fp),
    content=(
      #|1
    ),
  )
}
