// Projection pipeline benchmarks — measures to_flat_proj + reconcile + to_proj_node
// Uses single-char insert/delete to avoid CRDT set_text overhead.

///|
fn run_projection_incremental_bench(b : @bench.T, let_count : Int) -> Unit {
  let source = parser_bench_source(let_count, "0")
  let editor = SyncEditor::new_lambda("bench")
  editor.set_text(source)
  ignore(editor.get_proj_node()) // warm up — initial parse + project
  ignore(editor.get_source_map())
  let edit_pos = source.length() - 2
  editor.move_cursor(edit_pos)
  let mut inserted = false
  b.bench(() => {
    if inserted {
      ignore(editor.backspace())
    } else {
      editor.insert("1") catch {
        _ => ()
      }
    }
    b.keep(editor.get_proj_node())
    b.keep(editor.get_source_map())
    inserted = !inserted
  })
}

///|
test "projection pipeline - incremental keystroke (20 defs)" (b : @bench.T) {
  run_projection_incremental_bench(b, 20)
}

///|
test "projection pipeline - incremental keystroke (80 defs)" (b : @bench.T) {
  run_projection_incremental_bench(b, 80)
}

///|
test "projection pipeline - incremental keystroke (320 defs)" (b : @bench.T) {
  run_projection_incremental_bench(b, 320)
}

///|
test "projection pipeline - incremental keystroke (500 defs)" (b : @bench.T) {
  run_projection_incremental_bench(b, 500)
}

///|
test "projection pipeline - incremental keystroke (1000 defs)" (b : @bench.T) {
  run_projection_incremental_bench(b, 1000)
}

// Whitespace-keystroke benchmarks — exercises BackdateEq's backdate path.
//
// Each iteration inserts/deletes a trailing space (trivia-only edit).
// Whitespace is trivia in the lambda grammar, so the NodeInterner returns
// the same CstNode objects for all definitions and the final expression.
// to_flat_proj_incremental sees changed = [] → has_changes = false →
// proj_changed_at_ref stays stable → BackdateEq fires, skipping
// cached_proj_node, registry_memo, and source_map_memo recomputation.
//
// Measured (whitespace vs incremental, --release):
//                2026-03-28                  2026-04-06
//   20 defs:   ~678 µs vs ~715 µs        ~550 µs vs ~507 µs
//   80 defs:   ~875 µs vs ~941 µs        ~630 µs vs ~635 µs
//   320 defs:  ~3.0 ms vs ~3.2 ms        ~2.0 ms vs ~2.1 ms
//   500 defs:  ~4.7 ms vs ~5.0 ms        ~3.4 ms vs ~3.7 ms
//   1000 defs: ~10.1 ms vs ~11.0 ms      ~8.0 ms vs ~8.5 ms
//
// The dominant cost at all scales is the incremental parse + O(N)
// to_flat_proj_incremental scan, not the downstream projection memos.
// The BackdateEq savings (~0.4–0.5ms at 1000 defs) are real but modest
// with the current lightweight consumers. Wins compound when heavier
// downstream work (type checking, rendering) is added.
//
// Compare to "incremental keystroke" above which changes a definition value
// (no backdate, full downstream recomputation on every keystroke).
//
// Full historical comparison: docs/performance/2026-04-06-pipeline-decomposition.md

///|
fn run_whitespace_keystroke_bench(b : @bench.T, let_count : Int) -> Unit {
  let source = parser_bench_source(let_count, "0")
  let editor = SyncEditor::new_lambda("bench")
  editor.set_text(source)
  ignore(editor.get_proj_node()) // warm up — initial parse + project
  ignore(editor.get_source_map())
  editor.move_cursor(source.length()) // after last character (end of "x<N>")
  let mut inserted = false
  b.bench(() => {
    if inserted {
      ignore(editor.backspace())
    } else {
      editor.insert(" ") catch {
        _ => ()
      }
    }
    b.keep(editor.get_proj_node())
    b.keep(editor.get_source_map())
    inserted = !inserted
  })
}

///|
test "projection pipeline - whitespace keystroke (20 defs)" (b : @bench.T) {
  run_whitespace_keystroke_bench(b, 20)
}

///|
test "projection pipeline - whitespace keystroke (80 defs)" (b : @bench.T) {
  run_whitespace_keystroke_bench(b, 80)
}

///|
test "projection pipeline - whitespace keystroke (320 defs)" (b : @bench.T) {
  run_whitespace_keystroke_bench(b, 320)
}

///|
test "projection pipeline - whitespace keystroke (500 defs)" (b : @bench.T) {
  run_whitespace_keystroke_bench(b, 500)
}

///|
test "projection pipeline - whitespace keystroke (1000 defs)" (b : @bench.T) {
  run_whitespace_keystroke_bench(b, 1000)
}

// Parser-only benchmarks — measures parse layer without projection

///|
priv struct ParserBenchScenario {
  source : String
  edited_source : String
  forward_edit : @parser.Edit
  backward_edit : @parser.Edit
}

///|
fn parser_bench_source(let_count : Int, tail_literal : String) -> String {
  let segments : Array[String] = []
  for i = 0; i < let_count - 1; i = i + 1 {
    segments.push("let x\{i} = 0")
  }
  segments.push("let x\{let_count - 1} = \{tail_literal}")
  segments.push("x\{let_count - 1}")
  segments.join("\n")
}

///|
fn parser_bench_scenario(let_count : Int) -> ParserBenchScenario {
  let source = parser_bench_source(let_count, "0")
  let edited_source = parser_bench_source(let_count, "1")
  {
    source,
    edited_source,
    forward_edit: compute_edit(source, edited_source),
    backward_edit: compute_edit(edited_source, source),
  }
}

///|
test "parser benchmark - reactive full reparse medium" (b : @bench.T) {
  let scenario = parser_bench_scenario(80)
  let parser = @loom.new_reactive_parser(
    scenario.source,
    @parser.lambda_grammar,
  )
  ignore(parser.term())
  let mut use_edited = true
  b.bench(() => {
    let next_source = if use_edited {
      scenario.edited_source
    } else {
      scenario.source
    }
    parser.set_source(next_source)
    b.keep(parser.term())
    use_edited = !use_edited
  })
}

///|
test "parser benchmark - imperative incremental medium" (b : @bench.T) {
  let scenario = parser_bench_scenario(80)
  let parser = @loom.new_imperative_parser(
    scenario.source,
    @parser.lambda_grammar,
  )
  ignore(parser.parse())
  let mut use_edited = true
  b.bench(() => {
    let edit = if use_edited {
      scenario.forward_edit
    } else {
      scenario.backward_edit
    }
    let next_source = if use_edited {
      scenario.edited_source
    } else {
      scenario.source
    }
    b.keep(parser.edit(edit, next_source))
    use_edited = !use_edited
  })
}

///|
test "parser benchmark - reactive full reparse large" (b : @bench.T) {
  let scenario = parser_bench_scenario(320)
  let parser = @loom.new_reactive_parser(
    scenario.source,
    @parser.lambda_grammar,
  )
  ignore(parser.term())
  let mut use_edited = true
  b.bench(() => {
    let next_source = if use_edited {
      scenario.edited_source
    } else {
      scenario.source
    }
    parser.set_source(next_source)
    b.keep(parser.term())
    use_edited = !use_edited
  })
}

///|
test "parser benchmark - imperative incremental large" (b : @bench.T) {
  let scenario = parser_bench_scenario(320)
  let parser = @loom.new_imperative_parser(
    scenario.source,
    @parser.lambda_grammar,
  )
  ignore(parser.parse())
  let mut use_edited = true
  b.bench(() => {
    let edit = if use_edited {
      scenario.forward_edit
    } else {
      scenario.backward_edit
    }
    let next_source = if use_edited {
      scenario.edited_source
    } else {
      scenario.source
    }
    b.keep(parser.edit(edit, next_source))
    use_edited = !use_edited
  })
}
