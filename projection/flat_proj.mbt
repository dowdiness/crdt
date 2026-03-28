// FlatProj re-exported from lang/lambda/proj.
// Lambda-specific flat projection builders moved to lang/lambda/proj/.

///|
pub using @lambda_proj {
  type FlatProj,
  to_flat_proj,
  to_flat_proj_incremental,
  reconcile_flat_proj,
  print_flat_proj,
}
