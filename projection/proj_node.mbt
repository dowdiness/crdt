// ProjNode re-exported from framework/core.
// Lambda-specific projection builders moved to lang/lambda/proj/.

///|
pub using @core {type ProjNode}

///|
pub using @lambda_proj {
  syntax_to_proj_node,
  to_proj_node,
  parse_to_proj_node,
  rebuild_kind,
}
