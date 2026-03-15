// Compatibility adapter over the shared dowdiness/text_change leaf module.
// Keep parser-facing helpers here only for existing callers; the pure diff
// owner now lives outside the root crdt module.

///|
pub struct TextChange {
  start : Int
  delete_len : Int
  inserted : String
} derive(Eq, Show)

///|
fn TextChange::from_shared(
  change : @shared_text_change.TextChange,
) -> TextChange {
  {
    start: change.start,
    delete_len: change.delete_len,
    inserted: change.inserted,
  }
}

///|
/// Compute the minimal contiguous text change between two strings.
pub fn compute_text_change(old_text : String, new_text : String) -> TextChange {
  TextChange::from_shared(
    @shared_text_change.compute_text_change(old_text, new_text),
  )
}

///|
pub fn TextChange::is_noop(self : TextChange) -> Bool {
  self.delete_len == 0 && self.inserted == ""
}

///|
pub fn TextChange::to_parser_edit(self : TextChange) -> @loom_core.Edit {
  @loom_core.Edit::new(self.start, self.delete_len, self.inserted.length())
}
