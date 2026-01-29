///| TextSpan - RLE-compatible text run with tombstone support

///|
/// A span of text that may be visible or deleted (tombstone).
/// Implements RLE traits for efficient compression and querying.
pub struct TextSpan {
  text : String
  deleted : Bool
} derive(Show, Eq)

///|
/// Create a visible text span.
pub fn TextSpan::visible(text : String) -> TextSpan {
  { text, deleted: false }
}

///|
/// Create a deleted (tombstone) text span.
pub fn TextSpan::tombstone(text : String) -> TextSpan {
  { text, deleted: true }
}

///|
/// Check if this span is visible (not deleted).
pub fn TextSpan::is_visible(self : TextSpan) -> Bool {
  not(self.deleted)
}

///|
/// Check if this span is a tombstone (deleted).
pub fn TextSpan::is_tombstone(self : TextSpan) -> Bool {
  self.deleted
}

///|
/// Get the text content.
pub fn TextSpan::content(self : TextSpan) -> String {
  self.text
}

///|
/// Mergeable: adjacent spans can merge only if both have same deleted status.
pub impl @rle.Mergeable for TextSpan with can_merge(a, b) {
  a.deleted == b.deleted
}

///|
/// Mergeable: merge by concatenating text.
pub impl @rle.Mergeable for TextSpan with merge(a, b) {
  { text: a.text + b.text, deleted: a.deleted }
}

///|
/// HasLength: basic length is character count.
pub impl @rle.HasLength for TextSpan with length(self) {
  self.text.iter().count()
}

///|
/// HasCausalLength: visible length is 0 for tombstones.
pub impl @rle.HasCausalLength for TextSpan with visible_len(self) {
  if self.deleted {
    0
  } else {
    self.text.iter().count()
  }
}

///|
/// Sliceable: extract sub-range of text, preserving deleted status.
pub impl @rle.Sliceable for TextSpan with slice(self, start~, end~) {
  let sliced = self.text
    .iter()
    .drop(start)
    .take(end - start)
    .fold(init=StringBuilder::new(), fn(sb, c) {
      sb.write_char(c)
      sb
    })
    .to_string()
  { text: sliced, deleted: self.deleted }
}
