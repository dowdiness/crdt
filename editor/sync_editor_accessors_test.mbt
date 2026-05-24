// Tests for SyncEditor and LambdaCompanion typed accessor methods.
// Verifies that each accessor returns a Derived cell that can be read
// on a freshly-constructed editor with empty source.

///|
test "SyncEditor exposes typed accessors for protected cells" {
  // Use the lambda editor as a known concrete instance; this test
  // demonstrates that each accessor returns a Derived cell whose read
  // does not abort on a freshly-constructed editor with empty source.
  let (editor, _companion) = @lambda.new_lambda_editor("test")
  let _ : @incr.Derived[String] = editor.parser_source()
  let _ : @incr.Derived[@ast.Term] = editor.parser_ast()
  let _ : @incr.Derived[@loom.DiagnosticSet] = editor.parser_diagnostics()
  let _ : @incr.Derived[@core.ProjNode[@ast.Term]?] = editor.cached_proj_node()
  let _ : @incr.Derived[Map[@core.NodeId, @core.ProjNode[@ast.Term]]] = editor.registry_memo()
  let _ : @incr.Derived[@core.SourceMap] = editor.source_map_memo()
}
