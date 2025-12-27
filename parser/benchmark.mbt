// Benchmarks for incremental parser performance
// Run with: moon bench --package parser --release

///| Benchmark: Full parse of simple expression
test "full parse - simple" (b : @bench.T) {
  b.bench(fn() {
    let result = try { parse_positioned("42") } catch { _ => abort("benchmark failed") }
    b.keep(result)
  })
}

///| Benchmark: Full parse of lambda expression
test "full parse - lambda" (b : @bench.T) {
  b.bench(fn() {
    let result = try { parse_positioned("λx.x") } catch { _ => abort("benchmark failed") }
    b.keep(result)
  })
}

///| Benchmark: Full parse of nested lambdas
test "full parse - nested lambdas" (b : @bench.T) {
  b.bench(fn() {
    let result = try { parse_positioned("λf.λx.f (f x)") } catch { _ => abort("benchmark failed") }
    b.keep(result)
  })
}

///| Benchmark: Full parse of arithmetic expression
test "full parse - arithmetic" (b : @bench.T) {
  b.bench(fn() {
    let result = try { parse_positioned("1 + 2 - 3 + 4") } catch { _ => abort("benchmark failed") }
    b.keep(result)
  })
}

///| Benchmark: Full parse of complex expression
test "full parse - complex" (b : @bench.T) {
  b.bench(fn() {
    let result = try { parse_positioned("λf.λx.if f x then x + 1 else x - 1") } catch { _ => abort("benchmark failed") }
    b.keep(result)
  })
}

///| Benchmark: Tokenization
test "tokenization" (b : @bench.T) {
  b.bench(fn() {
    let result = try { tokenize("λf.λx.f x") } catch { _ => abort("benchmark failed") }
    b.keep(result)
  })
}

///| Benchmark: Incremental parser - initial parse
test "incremental - initial parse" (b : @bench.T) {
  b.bench(fn() {
    let parser = IncrementalParser::new("x")
    let result = parser.parse()
    b.keep(result)
  })
}

///| Benchmark: Incremental parser - small edit
test "incremental - small edit" (b : @bench.T) {
  b.bench(fn() {
    let parser = IncrementalParser::new("x")
    let _ = parser.parse()
    let edit = Edit::insert(1, 4)
    let result = parser.edit(edit, "x + 1")
    b.keep(result)
  })
}

///| Benchmark: Incremental parser - multiple edits
test "incremental - multiple edits" (b : @bench.T) {
  b.bench(fn() {
    let parser = IncrementalParser::new("x")
    let _ = parser.parse()
    let edit1 = Edit::insert(1, 4)
    let _ = parser.edit(edit1, "x + 1")
    let edit2 = Edit::replace(4, 5, 5)
    let result = parser.edit(edit2, "x + 2")
    b.keep(result)
  })
}

///| Benchmark: Incremental parser - replacement edit
test "incremental - replacement" (b : @bench.T) {
  b.bench(fn() {
    let parser = IncrementalParser::new("λx.x")
    let _ = parser.parse()
    let edit = Edit::replace(0, 1, 1)
    let result = parser.edit(edit, "\\x.x")
    b.keep(result)
  })
}

///| Benchmark: Parse cache - get operation
test "parse cache - get" (b : @bench.T) {
  b.bench(fn() {
    let cache = ParseCache::new()
    let tokens = try { tokenize("42") } catch { _ => abort("benchmark failed") }
    let ast = try { parse_positioned("42") } catch { _ => abort("benchmark failed") }
    cache.insert(tokens, 0, tokens.length(), ast)
    let result = cache.get(tokens, 0, tokens.length())
    b.keep(result)
  })
}

///| Benchmark: Damage tracking
test "damage tracking" (b : @bench.T) {
  b.bench(fn() {
    let edit = Edit::insert(4, 4)
    let damage = DamageTracker::new(edit)
    let tree = try { parse_positioned("λx.x") } catch { _ => abort("benchmark failed") }
    damage.expand_for_tree(tree)
    b.keep(damage)
  })
}

///| Benchmark: AST to CRDT conversion
test "ast to crdt" (b : @bench.T) {
  b.bench(fn() {
    let ast = try { parse_positioned("λf.λx.f x") } catch { _ => abort("benchmark failed") }
    let result = ast_to_crdt(ast)
    b.keep(result)
  })
}

///| Benchmark: CRDT to source reconstruction
test "crdt to source" (b : @bench.T) {
  b.bench(fn() {
    let ast = try { parse_positioned("λf.λx.f x") } catch { _ => abort("benchmark failed") }
    let crdt = ast_to_crdt(ast)
    let result = crdt_to_source(crdt)
    b.keep(result)
  })
}

///| Benchmark: Error recovery - valid input
test "error recovery - valid" (b : @bench.T) {
  b.bench(fn() {
    let result = parse_with_error_recovery("λx.x")
    b.keep(result)
  })
}

///| Benchmark: Error recovery - error input
test "error recovery - error" (b : @bench.T) {
  b.bench(fn() {
    let result = parse_with_error_recovery("λ.x")
    b.keep(result)
  })
}

///| Benchmark: ParsedDocument - parse
test "parsed document - parse" (b : @bench.T) {
  b.bench(fn() {
    let doc = ParsedDocument::new("42")
    doc.parse()
    b.keep(doc)
  })
}

///| Benchmark: ParsedDocument - edit
test "parsed document - edit" (b : @bench.T) {
  b.bench(fn() {
    let doc = ParsedDocument::new("x")
    doc.parse()
    let edit = Edit::insert(1, 4)
    doc.edit(edit, "x + 1")
    b.keep(doc)
  })
}
