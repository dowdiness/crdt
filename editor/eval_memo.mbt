// Eval Memo: Reactive evaluation of lambda terms with result rendering.

///|
pub(all) enum EvalResult {
  Value(String)
  Stuck(String)
  Suppressed
} derive(Debug, Eq)

///|
pub impl Show for EvalResult with output(self, logger) {
  logger.write_string(@debug.to_string(self))
}

///|
fn render_value(v : @eval.Value) -> String {
  match v {
    VInt(n) => n.to_string()
    VClosure(_, _, _) => "\u{2039}closure\u{203a}"
    VUnit => "()"
  }
}

///|
fn render_stuck(reason : @eval.StuckReason) -> EvalResult {
  match reason {
    Incomplete => Suppressed
    ParseError => Suppressed
    Unbound(name) => Stuck("\u{2039}unbound: " + name + "\u{203a}")
    TypeMismatch(msg) => Stuck("\u{2039}type error: " + msg + "\u{203a}")
    Divergence => Stuck("\u{2039}diverges\u{203a}")
  }
}

///|
/// Evaluate a term and return per-definition results.
/// For Module(defs, body): one result per def + one for body.
/// For non-Module: one result for the whole expression.
pub fn eval_term(term : @ast.Term) -> Array[EvalResult] {
  let results : Array[EvalResult] = []
  match term {
    Module(defs, body) => {
      let mut env = @eval.Env::empty()
      for i, def in defs {
        let (name, expr) = def
        try {
          let v = @eval.eval(env, expr)
          results.push(Value(render_value(v)))
          env = env.extend(name, v)
        } catch {
          reason => {
            results.push(render_stuck(reason))
            // Stop evaluating — env is incomplete
            for _ in (i + 1)..<defs.length() {
              results.push(Suppressed)
            }
            results.push(Suppressed) // body
            return results
          }
        }
      }
      // Evaluate body
      try {
        let v = @eval.eval(env, body)
        results.push(Value(render_value(v)))
      } catch {
        reason => results.push(render_stuck(reason))
      }
    }
    _ =>
      try {
        let v = @eval.eval(@eval.Env::empty(), term)
        results.push(Value(render_value(v)))
      } catch {
        reason => results.push(render_stuck(reason))
      }
  }
  results
}

///|
/// Build a reactive eval memo.
/// Reads `syntax_tree` signal to establish reactive dependency.
pub fn build_eval_memo(
  rt : @incr.Runtime,
  syntax_tree : @incr.Signal[@seam.SyntaxNode?],
  parser : @loom.ImperativeParser[@ast.Term],
) -> @incr.Memo[Array[EvalResult]] {
  @incr.Memo::new_no_backdate(
    rt,
    fn() -> Array[EvalResult] {
      let _ = syntax_tree.get()
      let ast = parser.get_tree().unwrap_or(@ast.Term::Unit)
      eval_term(ast)
    },
    label="eval_memo",
  )
}

///|
/// Get current eval results for a lambda editor.
pub fn SyncEditor::get_eval_results(
  self : SyncEditor[@ast.Term],
) -> Array[EvalResult] {
  match self.eval_memo {
    Some(memo) => memo.get()
    None => []
  }
}

///|
/// Build a NodeId -> ViewAnnotation map from eval results.
/// Maps each eval result to the corresponding ProjNode child in the module.
pub fn SyncEditor::get_eval_annotations(
  self : SyncEditor[@ast.Term],
) -> Map[@proj.NodeId, Array[@protocol.ViewAnnotation]] {
  let annotations : Map[@proj.NodeId, Array[@protocol.ViewAnnotation]] = {}
  let eval_results = self.get_eval_results()
  if eval_results.is_empty() {
    return annotations
  }
  let proj_node = match self.get_proj_node() {
    Some(p) => p
    None => return annotations
  }
  let children = proj_node.children
  for i, result in eval_results {
    match result {
      Suppressed => continue
      Value(s) => {
        let target_id = if i < children.length() {
          children[i].id()
        } else {
          proj_node.id()
        }
        annotations[target_id] = [
          @protocol.ViewAnnotation(kind="eval", label="\u{2192} " + s),
        ]
      }
      Stuck(s) => {
        let target_id = if i < children.length() {
          children[i].id()
        } else {
          proj_node.id()
        }
        annotations[target_id] = [
          @protocol.ViewAnnotation(
            kind="eval",
            label="\u{2192} " + s,
            severity="warning",
          ),
        ]
      }
    }
  }
  annotations
}

///|
/// Split a Layout at top-level HardLine boundaries.
/// Only descends into Concat nodes — Nest, Group, Annotate are opaque.
fn split_at_hardlines(
  layout : @pretty.Layout[@pretty.SyntaxCategory],
) -> Array[@pretty.Layout[@pretty.SyntaxCategory]] {
  let segments : Array[@pretty.Layout[@pretty.SyntaxCategory]] = []
  let parts : Array[@pretty.Layout[@pretty.SyntaxCategory]] = []
  fn flush() -> Unit {
    if parts.is_empty() {
      return
    }
    let mut combined = parts[0]
    for i = 1; i < parts.length(); i = i + 1 {
      combined = combined + parts[i]
    }
    segments.push(combined)
    parts.clear()
  }

  fn walk(l : @pretty.Layout[@pretty.SyntaxCategory]) -> Unit {
    match l {
      HardLine => flush()
      Concat(left, right) => {
        walk(left)
        walk(right)
      }
      Empty => ()
      other => parts.push(other)
    }
  }

  walk(layout)
  flush()
  segments
}

///|
fn eval_annotation_layout(
  result : EvalResult,
) -> @pretty.Layout[@pretty.SyntaxCategory]? {
  match result {
    Value(s) =>
      Some(
        @pretty.annotate(
          @pretty.SyntaxCategory::EvalAnnotation,
          @pretty.text("  \u{2192} " + s),
        ),
      )
    Stuck(s) =>
      Some(
        @pretty.annotate(
          @pretty.SyntaxCategory::EvalError,
          @pretty.text("  \u{2192} " + s),
        ),
      )
    Suppressed => None
  }
}

///|
/// Post-process a Layout to inject eval annotations after each segment.
/// Splits the canonical Layout at HardLine boundaries, appends annotation
/// to each segment, and rejoins with HardLine.
fn inject_eval_annotations(
  layout : @pretty.Layout[@pretty.SyntaxCategory],
  eval_results : Array[EvalResult],
) -> @pretty.Layout[@pretty.SyntaxCategory] {
  if eval_results.is_empty() {
    return layout
  }
  let segments = split_at_hardlines(layout)
  let annotated : Array[@pretty.Layout[@pretty.SyntaxCategory]] = []
  for i, seg in segments {
    match eval_results.get(i) {
      Some(result) =>
        match eval_annotation_layout(result) {
          Some(ann) => annotated.push(seg + ann)
          None => annotated.push(seg)
        }
      None => annotated.push(seg)
    }
  }
  @pretty.separate(@pretty.hardline(), annotated)
}
