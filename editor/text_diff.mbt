// Text diffing utilities for computing parser Edits from the shared
// dowdiness/text_change leaf module.

///|
/// Compute the minimal single-span splice between two strings.
pub fn compute_text_splice(
  old_text : String,
  new_text : String,
) -> @text_change.TextChange {
  @text_change.compute_text_change(old_text, new_text)
}

///|
/// Compute an Edit from the difference between old and new text
/// using the shared text_change adapter.
pub fn compute_edit(old_text : String, new_text : String) -> @parser.Edit {
  let change = @text_change.compute_text_change(old_text, new_text)
  @parser.Edit::new(change.start, change.delete_len, change.inserted.length())
}
