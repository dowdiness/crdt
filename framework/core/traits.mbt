// EditAction[T]: Language-specific structural edit action for UI discovery.
// TreeNode and Renderable traits remain in projection/ due to orphan rule
// constraints (impl for @ast.Term requires owning the trait).

///|
/// A language-specific structural edit action for UI discovery (context menus, palette).
/// Language packages export these as data; the UI renders them without knowing their semantics.
pub struct EditAction[T] {
  /// Display label for the action
  label : String
  /// Optional keyboard shortcut (e.g., "Ctrl+D")
  shortcut : String?
  /// Predicate: is this action applicable to the given node?
  applicable : (ProjNode[T], NodeId) -> Bool
  /// Compute replacement text given (source_text, span_start, span_end).
  /// Returns Ok(replacement) or Err(reason).
  compute_replacement : (String, Int, Int) -> Result[String, String]
}
