///|
pub impl Mergeable for String with can_merge(_a, _b) {
  // For plain text, always mergeable (no styling to compare)
  true
}

///|
pub impl Mergeable for String with merge(a, b) {
  a + b
}

///|
pub impl HasLength for String with atom_len(self) {
  // Codepoint count, not byte length
  // Note: O(n) - consider caching for hot paths
  self.iter().count()
}

///|
pub impl HasLength for String with content_len(self) {
  // For plain text, content_len == atom_len (no tombstones)
  self.iter().count()
}

///|
pub impl Sliceable for String with slice(self, start~, end~) {
  // Codepoint-safe slicing using StringBuilder for O(n) performance
  // (Previously used string concatenation which was O(n²))
  self
  .iter()
  .drop(start)
  .take(end - start)
  .fold(init=StringBuilder::new(), fn(sb, c) {
    sb.write_char(c)
    sb
  })
  .to_string()
}

///|
/// Creates an RleVec containing a single string run.
pub fn RleVec::from_string(text : String) -> RleVec[String] {
  let vec = RleVec::new()
  // Use is_empty() for O(1) check instead of counting codepoints
  if not(text.is_empty()) {
    let _ = vec.push(text)
    // Safe: prechecked non-empty
  }
  vec
}

///|
/// Concatenates all runs into a single string.
/// Uses StringBuilder for O(n) performance.
pub fn RleVec::to_string(self : RleVec[String]) -> String {
  self.0.fold(init=StringBuilder::new(), fn(sb, s) {
    sb.write_string(s)
    sb
  }).to_string()
}

///|
/// Returns an iterator over codepoints.
pub fn RleVec::iter_chars(self : RleVec[String]) -> Iter[Char] {
  let chars : Array[Char] = []
  for run in self.0 {
    for c in run {
      chars.push(c)
    }
  }
  chars.iter()
}
