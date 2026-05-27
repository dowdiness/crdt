// Lambda semantic overlay FFI.

///|
/// Get the read-only semantic projection as JSON.
/// Returns `{annotations, decorations, diagnostics}` and never mutates editor
/// state; semantic edits still lower through text/CRDT edit paths.
pub fn get_semantic_projection_json(handle : Int) -> String {
  match lambda_handles.get(handle) {
    Some(h) =>
      match h.editor.get_proj_node() {
        Some(root) =>
          @lambda_semantic.build_semantic_projection(
            root,
            h.editor.get_source_map(),
          )
          .to_json()
          .stringify()
        None =>
          @lambda_semantic.SemanticProjection::empty().to_json().stringify()
      }
    None => @lambda_semantic.SemanticProjection::empty().to_json().stringify()
  }
}
