///|
test "split_at_hardlines: separates module layout into segments" {
  let layout : @pretty.Layout[@pretty.SyntaxCategory] = @pretty.separate(
    @pretty.hardline(),
    [@pretty.text("def0"), @pretty.text("def1"), @pretty.text("body")],
  )
  let segments = split_at_hardlines(layout)
  inspect(segments.length(), content="3")
  inspect(@pretty.render_string(segments[0], width=80), content="def0")
  inspect(@pretty.render_string(segments[1], width=80), content="def1")
  inspect(@pretty.render_string(segments[2], width=80), content="body")
}

///|
test "split_at_hardlines: single segment (no hardlines)" {
  let layout : @pretty.Layout[@pretty.SyntaxCategory] = @pretty.text("hello")
  let segments = split_at_hardlines(layout)
  inspect(segments.length(), content="1")
}

///|
test "inject_eval_annotations: adds arrow to each segment" {
  let ast = @ast.Term::Module([("x", @ast.Term::Int(5))], @ast.Term::Var("x"))
  let layout = @pretty.Pretty::to_layout(ast)
  let results : Array[EvalResult] = [
    EvalResult::Value("5"),
    EvalResult::Value("5"),
  ]
  let annotated = inject_eval_annotations(layout, results)
  let text = @pretty.render_string(annotated, width=80)
  inspect(text.contains("\u{2192} 5"), content="true")
}

///|
test "inject_eval_annotations: suppressed results add nothing" {
  let ast = @ast.Term::Module([("x", @ast.Term::Hole(0))], @ast.Term::Hole(1))
  let layout = @pretty.Pretty::to_layout(ast)
  let results : Array[EvalResult] = [
    EvalResult::Suppressed,
    EvalResult::Suppressed,
  ]
  let annotated = inject_eval_annotations(layout, results)
  let text = @pretty.render_string(annotated, width=80)
  inspect(text.contains("\u{2192}"), content="false")
}

///|
test "inject_eval_annotations: error results have EvalError category" {
  let ast = @ast.Term::Var("x")
  let layout = @pretty.Pretty::to_layout(ast)
  let results : Array[EvalResult] = [
    EvalResult::Stuck("\u{2039}unbound: x\u{203a}"),
  ]
  let annotated = inject_eval_annotations(layout, results)
  let rendered = @pretty.render_spans(annotated, width=80)
  let has_eval_error = rendered
    .iter()
    .any(fn(pair) { pair.1 == @pretty.SyntaxCategory::EvalError })
  inspect(has_eval_error, content="true")
}

///|
test "pretty_view: eval annotations appear after edit" {
  let editor = SyncEditor::new_lambda("test-eval-pretty")
  editor.set_text("let x = 5\nx")
  let view = editor.get_pretty_view()
  let lines = view.children
  let has_eval_span = lines
    .iter()
    .any(fn(line) {
      line.token_spans.iter().any(fn(span) { span.role == "eval-annotation" })
    })
  inspect(has_eval_span, content="true")
}

///|
test "get_eval_annotations: module defs have annotations" {
  let editor = SyncEditor::new_lambda("test-struct-ann")
  editor.set_text("let x = 5\nx")
  let annotations = editor.get_eval_annotations()
  inspect(annotations.length() > 0, content="true")
}

///|
test "get_eval_annotations: empty for no text" {
  let editor = SyncEditor::new_lambda("test-struct-ann-empty")
  let annotations = editor.get_eval_annotations()
  inspect(annotations.length(), content="0")
}

///|
test "get_view_tree_with_eval: annotations attached to view nodes" {
  let editor = SyncEditor::new_lambda("test-view-eval")
  editor.set_text("let x = 5\nx")
  let view = editor.get_view_tree_with_eval()
  guard view is Some(root)
  // Check that at least one child node has annotations
  let has_annotation = root.children
    .iter()
    .any(fn(child) { child.annotations.length() > 0 })
  inspect(has_annotation, content="true")
}
