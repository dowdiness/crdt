// JSON language facade — unified entry point for JSON editor types.

///|
pub using @json_proj {
  parse_to_proj_node,
  syntax_to_proj_node,
  populate_token_spans,
  build_json_projection_memos,
}

///|
pub using @json_edits {
  type JsonEditOp,
  type JsonType,
  apply_json_edit,
  compute_json_edit,
  new_json_editor,
}
