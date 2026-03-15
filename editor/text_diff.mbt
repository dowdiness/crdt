// Text diffing utility for computing parser Edits from the shared
// dowdiness/text_change leaf module.

///|
/// Compute a parser Edit from the difference between old and new text.
pub fn compute_edit(old_text : String, new_text : String) -> @parser.Edit {
  let change = @text_change.compute_text_change(old_text, new_text)
  @parser.Edit::new(change.start, change.delete_len, change.inserted.length())
}
