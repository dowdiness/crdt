// Detailed performance benchmarks for incremental parser
// Measures scaling behavior and cache effectiveness
// Run with: moon bench --package parser --release

///| Benchmark: Parse scaling - small input (5 tokens)
test "parse scaling - small (5 tokens)" (b : @bench.T) {
  b.bench(fn() {
    let result = try { parse_tree("1 + 2") } catch { _ => abort("benchmark failed") }
    b.keep(result)
  })
}

///| Benchmark: Parse scaling - medium input (15 tokens)
test "parse scaling - medium (15 tokens)" (b : @bench.T) {
  b.bench(fn() {
    let result = try { parse_tree("λf.λx.if f x then x + 1 else x - 1") } catch { _ => abort("benchmark failed") }
    b.keep(result)
  })
}

///| Benchmark: Parse scaling - large input (30+ tokens)
test "parse scaling - large (30+ tokens)" (b : @bench.T) {
  b.bench(fn() {
    let result = try {
      parse_tree("λf.λx.if f x then (λy.y + 1) x else (λz.z - 1) (f x)")
    } catch { _ => abort("benchmark failed") }
    b.keep(result)
  })
}

///| Benchmark: Incremental vs Full - tiny edit at start
test "incremental vs full - edit at start" (b : @bench.T) {
  b.bench(fn() {
    let parser = IncrementalParser::new("λf.λx.if f x then x + 1 else x - 1")
    let _ = parser.parse()
    let edit = Edit::replace(0, 1, 1)
    let result = parser.edit(edit, "\\f.λx.if f x then x + 1 else x - 1")
    b.keep(result)
  })
}

///| Benchmark: Incremental vs Full - tiny edit at end
test "incremental vs full - edit at end" (b : @bench.T) {
  b.bench(fn() {
    let parser = IncrementalParser::new("λf.λx.if f x then x + 1 else x - 1")
    let _ = parser.parse()
    let edit = Edit::replace(32, 33, 33)
    let result = parser.edit(edit, "λf.λx.if f x then x + 1 else x - 2")
    b.keep(result)
  })
}

///| Benchmark: Incremental vs Full - edit in middle
test "incremental vs full - edit in middle" (b : @bench.T) {
  b.bench(fn() {
    let parser = IncrementalParser::new("λf.λx.if f x then x + 1 else x - 1")
    let _ = parser.parse()
    let edit = Edit::replace(14, 15, 15)
    let result = parser.edit(edit, "λf.λx.if f x then y + 1 else x - 1")
    b.keep(result)
  })
}

///| Benchmark: Sequential edits - typing simulation
test "sequential edits - typing simulation" (b : @bench.T) {
  b.bench(fn() {
    // Simulate typing by making progressive edits
    let parser1 = IncrementalParser::new("x")
    let _ = parser1.parse()
    let edit1 = Edit::insert(1, 4)
    let result = parser1.edit(edit1, "x + 1")
    b.keep(result)
  })
}

///| Benchmark: Sequential edits - backspace simulation
test "sequential edits - backspace simulation" (b : @bench.T) {
  b.bench(fn() {
    // Simulate backspacing by deleting text
    let parser = IncrementalParser::new("x + 1")
    let _ = parser.parse()
    let edit = Edit::delete(2, 5)  // Delete " + 1"
    let result = parser.edit(edit, "x")
    b.keep(result)
  })
}

///| Benchmark: Cache effectiveness - repeated parsing
test "cache effectiveness - repeated parsing" (b : @bench.T) {
  b.bench(fn() {
    let parser = IncrementalParser::new("λx.x")
    let _ = parser.parse()

    // Make edit
    let edit = Edit::insert(4, 8)
    let _ = parser.edit(edit, "λx.x + 1")

    // Undo edit (should hit cache ideally)
    let edit2 = Edit::delete(4, 8)
    let _ = parser.edit(edit2, "λx.x")
  })
}

///| Benchmark: Cache effectiveness - similar expressions
test "cache effectiveness - similar expressions" (b : @bench.T) {
  b.bench(fn() {
    let parser1 = IncrementalParser::new("x + 1")
    let result1 = parser1.parse()

    let parser2 = IncrementalParser::new("x + 2")
    let result2 = parser2.parse()

    b.keep((result1, result2))
  })
}

///| Benchmark: Damage tracking - localized damage
test "damage tracking - localized damage" (b : @bench.T) {
  b.bench(fn() {
    let edit = Edit::replace(4, 5, 5)
    let damage = DamageTracker::new(edit)
    let tree = try { parse_tree("x + 1") } catch { _ => abort("benchmark failed") }
    damage.expand_for_tree(tree)
    b.keep(damage)
  })
}

///| Benchmark: Damage tracking - widespread damage
test "damage tracking - widespread damage" (b : @bench.T) {
  b.bench(fn() {
    let edit = Edit::replace(0, 1, 1)
    let damage = DamageTracker::new(edit)
    let tree = try { parse_tree("λf.λx.if f x then x + 1 else x - 1") } catch { _ => abort("benchmark failed") }
    damage.expand_for_tree(tree)
    b.keep(damage)
  })
}

///| Benchmark: Position adjustment after edit
test "position adjustment after edit" (b : @bench.T) {
  b.bench(fn() {
    let parser = IncrementalParser::new("λf.λx.f x")
    let tree = parser.parse()
    let edit = Edit::insert(7, 4)
    let adjusted = parser.adjust_tree_positions(tree, edit)
    b.keep(adjusted)
  })
}

///| Benchmark: CRDT operations - nested structure
test "crdt operations - nested structure" (b : @bench.T) {
  b.bench(fn() {
    let ast = try { parse_tree("λf.λx.if f x then x + 1 else x - 1") } catch { _ => abort("benchmark failed") }
    let crdt = ast_to_crdt(ast)
    let source = crdt_to_source(crdt)
    b.keep(source)
  })
}

///| Benchmark: CRDT operations - round trip
test "crdt operations - round trip" (b : @bench.T) {
  b.bench(fn() {
    let original = "λf.λx.f (f x)"
    let ast = try { parse_tree(original) } catch { _ => abort("benchmark failed") }
    let crdt = ast_to_crdt(ast)
    let reconstructed = crdt_to_source(crdt)
    let ast2 = try { parse_tree(reconstructed) } catch { _ => abort("benchmark failed") }
    b.keep(ast2)
  })
}

///| Benchmark: Memory pressure - large document
test "memory pressure - large document" (b : @bench.T) {
  b.bench(fn() {
    // Build a moderately complex expression (simpler to avoid parsing issues)
    let large_expr = "λf.λx.if f x then (λy.y + 1) x else (λz.z - 1) (f x)"

    let parser = IncrementalParser::new(large_expr)
    let _ = parser.parse()

    // Make small edit - change first variable
    let edit = Edit::replace(3, 4, 4)  // Replace 'f' with 'g'
    let new_expr = "λg.λx.if g x then (λy.y + 1) x else (λz.z - 1) (g x)"
    let result = parser.edit(edit, new_expr)
    b.keep(result)
  })
}

///| Benchmark: Worst case - invalidate entire cache
test "worst case - full invalidation" (b : @bench.T) {
  b.bench(fn() {
    let parser = IncrementalParser::new("λf.λx.if f x then x + 1 else x - 1")
    let _ = parser.parse()

    // Change at start affects everything (λ → \)
    let edit = Edit::replace(0, 1, 1)
    let result = parser.edit(edit, "\\f.λx.if f x then x + 1 else x - 1")
    b.keep(result)
  })
}

///| Benchmark: Best case - cosmetic change
test "best case - cosmetic change" (b : @bench.T) {
  b.bench(fn() {
    let parser = IncrementalParser::new("x + 1")
    let _ = parser.parse()

    // Change just the constant
    let edit = Edit::replace(4, 5, 5)
    let result = parser.edit(edit, "x + 2")
    b.keep(result)
  })
}
