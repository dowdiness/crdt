// Benchmarks for serialization performance optimizations
// Tests the O(n²) → O(n) improvements made in Priority 3

///| Benchmark: Serialize small AST
test "serialize ast - small" (b : @bench.T) {
  b.bench(fn() {
    let ast = try { @parser.parse_tree("42") } catch { _ => abort("parse failed") }
    let result = serialize_ast(ast)
    b.keep(result)
  })
}

///| Benchmark: Serialize medium AST
test "serialize ast - medium" (b : @bench.T) {
  b.bench(fn() {
    let ast = try { @parser.parse_tree("λf.λx.f (f (f x))") } catch { _ => abort("parse failed") }
    let result = serialize_ast(ast)
    b.keep(result)
  })
}

///| Benchmark: Serialize complex AST
test "serialize ast - complex" (b : @bench.T) {
  b.bench(fn() {
    let ast = try { @parser.parse_tree("λf.λx.if f x then f (x + 1) else f (x - 1)") } catch { _ => abort("parse failed") }
    let result = serialize_ast(ast)
    b.keep(result)
  })
}

///| Benchmark: Serialize large expression with many operations
test "serialize ast - large ops" (b : @bench.T) {
  b.bench(fn() {
    // Expression with 10 binary operations
    let ast = try { @parser.parse_tree("a + b + c + d + e + f + g + h + i + j") } catch { _ => abort("parse failed") }
    let result = serialize_ast(ast)
    b.keep(result)
  })
}

///| Benchmark: Serialize errors array - small
test "serialize errors - small" (b : @bench.T) {
  b.bench(fn() {
    let errors = ["Parse error at line 1"]
    let result = serialize_errors(errors)
    b.keep(result)
  })
}

///| Benchmark: Serialize errors array - medium
test "serialize errors - medium" (b : @bench.T) {
  b.bench(fn() {
    let errors = [
      "Parse error at line 1: unexpected token",
      "Parse error at line 2: missing semicolon",
      "Parse error at line 3: undefined variable",
      "Parse error at line 4: type mismatch",
      "Parse error at line 5: invalid syntax"
    ]
    let result = serialize_errors(errors)
    b.keep(result)
  })
}

///| Benchmark: Serialize integer array - small
test "serialize int array - small" (b : @bench.T) {
  b.bench(fn() {
    let arr = [1, 2, 3, 4, 5]
    let result = serialize_int_array(arr)
    b.keep(result)
  })
}

// Note: Skipping serialize_ops benchmark - requires proper Op construction

///| Benchmark: Escape JSON - simple string
test "escape json - simple" (b : @bench.T) {
  b.bench(fn() {
    let result = escape_json("hello world")
    b.keep(result)
  })
}

///| Benchmark: Escape JSON - string with special chars
test "escape json - special chars" (b : @bench.T) {
  b.bench(fn() {
    let result = escape_json("hello \"world\"\n\ttab\r\nline")
    b.keep(result)
  })
}

///| Benchmark: Error collection from AST - simple
test "collect errors - simple" (b : @bench.T) {
  b.bench(fn() {
    let ast = try { @parser.parse_tree("42") } catch { _ => abort("parse failed") }
    let result = @parser.collect_errors(ast)
    b.keep(result)
  })
}

///| Benchmark: Error collection from AST - complex
test "collect errors - complex" (b : @bench.T) {
  b.bench(fn() {
    let ast = try { @parser.parse_tree("λf.λx.if f x then f (x + 1) else f (x - 1)") } catch { _ => abort("parse failed") }
    let result = @parser.collect_errors(ast)
    b.keep(result)
  })
}

///| Benchmark: ParsedEditor get_errors (cached) - first call
test "parsed editor - get errors first" (b : @bench.T) {
  b.bench(fn() {
    let editor = @editor.ParsedEditor::new("agent1")
    editor.insert("λx.x")
    let result = editor.get_errors()
    b.keep(result)
  })
}

///| Benchmark: ParsedEditor get_errors (cached) - repeated call
test "parsed editor - get errors cached" (b : @bench.T) {
  b.bench(fn() {
    let editor = @editor.ParsedEditor::new("agent1")
    editor.insert("λx.x")
    let _ = editor.get_errors()  // First call caches
    let result = editor.get_errors()  // Second call should be O(1)
    b.keep(result)
  })
}
