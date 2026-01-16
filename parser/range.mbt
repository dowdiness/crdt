// Text range for tracking editing part

///|
/// A range in the source
pub struct Range {
  start : Int
  end : Int
} derive(Show, Eq, Hash, Compare)

///|
/// Create a new range
pub fn Range::new(start : Int, end : Int) -> Range {
  { start, end }
}

///|
/// Check if this range contains a position
pub fn Range::contains(self : Range, pos : Int) -> Bool {
  pos >= self.start && pos < self.end
}

///|
/// Check if this range overlaps with another
pub fn Range::overlaps(self : Range, other : Range) -> Bool {
  self.start < other.end && other.start < self.end
}

///|
/// Merge two ranges
pub fn Range::merge(self : Range, other : Range) -> Range {
  Range::new(
    if self.start < other.start {
      self.start
    } else {
      other.start
    },
    if self.end > other.end {
      self.end
    } else {
      other.end
    },
  )
}

///|
/// Get the length of the range
pub fn Range::length(self : Range) -> Int {
  self.end - self.start
}

///|
/// Get the range with the minimum length
pub fn Range::minimum_by_length(self : Range, other : Range) -> Range {
  @cmp.minimum_by_key(self, other, Range::length)
}
