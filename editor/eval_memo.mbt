// Eval accessor methods for SyncEditor.

///|
/// Get current eval results for a lambda editor.
pub fn SyncEditor::get_eval_results(
  self : SyncEditor[@ast.Term],
) -> Array[@lambda.EvalResult] {
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
