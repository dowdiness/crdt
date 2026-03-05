// ParsedEditor: Integration of CRDT text editor with reactive parser
// Combines Editor (CRDT text) and ReactiveParser (AST) using loom's Signal/Memo pipeline

///|
/// ParsedEditor wraps the CRDT editor and a ReactiveParser.
/// Lazy AST evaluation is handled by the Signal/Memo pipeline — no manual
/// dirty flags needed. Call set_source after any text mutation.
pub struct ParsedEditor {
  editor : Editor // CRDT text editor
  parser : @loom.ReactiveParser[@parser.SyntaxNode] // Reactive incremental parser
}

///|
/// Create a new ParsedEditor with the given agent ID
pub fn ParsedEditor::new(agent_id : String) -> ParsedEditor {
  let editor = Editor::new(agent_id)
  let parser = @loom.new_reactive_parser("", @parser.lambda_grammar)
  { editor, parser }
}

///|
pub fn ParsedEditor::insert(self : ParsedEditor, text : String) -> Unit raise {
  self.editor.insert(text)
  self.parser.set_source(self.editor.get_text())
}

///|
pub fn ParsedEditor::delete(self : ParsedEditor) -> Bool {
  let result = self.editor.delete()
  if result {
    self.parser.set_source(self.editor.get_text())
  }
  result
}

///|
pub fn ParsedEditor::backspace(self : ParsedEditor) -> Bool {
  let result = self.editor.backspace()
  if result {
    self.parser.set_source(self.editor.get_text())
  }
  result
}

///|
pub fn ParsedEditor::move_cursor(self : ParsedEditor, position : Int) -> Unit {
  self.editor.move_cursor(position)
}

///|
pub fn ParsedEditor::get_cursor(self : ParsedEditor) -> Int {
  self.editor.get_cursor()
}

///|
pub fn ParsedEditor::get_text(self : ParsedEditor) -> String {
  self.editor.get_text()
}

///|
/// Notify the parser that text changed (e.g. after undo/redo on the raw doc).
/// Calls set_source — a no-op if the text is unchanged.
pub fn ParsedEditor::mark_dirty(self : ParsedEditor) -> Unit {
  self.parser.set_source(self.editor.get_text())
}

///|
/// Get the AST (lazy evaluation - only reparses if dirty)
/// Raises an error if parsing fails
pub fn ParsedEditor::get_ast(self : ParsedEditor) -> @ast.AstNode {
  if self.parse_dirty {
    self.reparse()
  }
  match self.ast {
    Some(ast) => ast
    None => abort("No valid parse tree")
  }
}

///|
/// Incremental reparse using the Edit Bridge.
/// Converts old→new text via loom's TextDelta API and applies the resulting
/// edits to the incremental parser.
fn ParsedEditor::reparse(self : ParsedEditor) -> Unit {
  let old_text = self.cached_text
  let new_text = self.editor.get_text()
  let edits = merge_to_edits(old_text, new_text)
  // text_to_delta always produces at most one contiguous change, so edits
  // has length 0 (identical strings) or 1.
  let syntax_node = if edits.is_empty() {
    // No textual change (e.g., identical text or failed op).
    // Apply a no-op edit at position 0 to obtain the current SyntaxNode.
    self.parser.edit(@parser.Edit::new(0, 0, 0), new_text)
  } else {
    self.parser.edit(edits[0], new_text)
  }
  let counter = Ref::new(0)
  let ast = @parser.syntax_node_to_ast_node(syntax_node, counter)
  self.ast = Some(ast)
  self.cached_errors = @parser.collect_errors(ast)
  self.cached_text = new_text
  self.parse_dirty = false
}

///|
/// Get cached errors from the last parse
/// Ensures AST is up-to-date before returning errors
pub fn ParsedEditor::get_errors(self : ParsedEditor) -> Array[String] {
  // Ensure the AST is up-to-date (triggers reparse if dirty)
  let _ = self.get_ast()
  // Return the cached errors (collected during reparse)
  self.cached_errors
}

///|
/// Check if the current parse tree is valid (no errors)
pub fn ParsedEditor::is_parse_valid(self : ParsedEditor) -> Bool {
  match self.ast {
    Some(ast) => not(@parser.has_errors(ast))
    None => false
  }
}

///|
pub fn ParsedEditor::apply_sync(
  self : ParsedEditor,
  msg : @text.SyncMessage,
) -> Unit raise {
  self.editor.apply_sync(msg)
  self.parser.set_source(self.editor.get_text())
}

///|
/// Get the current version (for sync)
pub fn ParsedEditor::get_version(self : ParsedEditor) -> @text.Version {
  self.editor.get_version()
}

///|
/// Export all operations as a SyncMessage (for initial peer sync)
pub fn ParsedEditor::export_all(self : ParsedEditor) -> @text.SyncMessage raise {
  self.editor.export_all()
}

///|
/// Export operations since a peer's version (for delta sync)
pub fn ParsedEditor::export_since(
  self : ParsedEditor,
  peer_version : @text.Version,
) -> @text.SyncMessage raise {
  self.editor.export_since(peer_version)
}
