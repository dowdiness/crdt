// Edit representation for incremental parsing
// Represents a change to the source text

///|
/// Represents an edit to the source
pub struct Edit {
  start : Int // Start position in old source
  old_end : Int // End position in old source
  new_end : Int // End position in new source
} derive(Show, Eq)

///|
/// Create a new edit
pub fn Edit::new(start : Int, old_end : Int, new_end : Int) -> Edit {
  { start, old_end, new_end }
}

///|
/// Get the length of deleted text
pub fn Edit::deleted_length(self : Edit) -> Int {
  self.old_end - self.start
}

///|
/// Get the length of inserted text
pub fn Edit::inserted_length(self : Edit) -> Int {
  self.new_end - self.start
}

///|
/// Get the delta (change in length)
pub fn Edit::delta(self : Edit) -> Int {
  self.inserted_length() - self.deleted_length()
}

///|
/// Apply edit to a position, returning the new position
pub fn Edit::apply_to_position(self : Edit, pos : Int) -> Int {
  if pos < self.start {
    // Position is before the edit
    pos
  } else if pos <= self.old_end {
    // Position is within the edited range
    // Map to start of new text
    self.start
  } else {
    // Position is after the edit
    pos + self.delta()
  }
}

///|
/// Check if a position is affected by this edit
pub fn Edit::affects_position(self : Edit, pos : Int) -> Bool {
  pos >= self.start && pos <= self.old_end
}

///|
/// Check if a range overlaps with this edit
pub fn Edit::overlaps_range(self : Edit, start : Int, end : Int) -> Bool {
  // Ranges overlap if one starts before the other ends
  self.start < end && start < self.old_end
}

///|
/// Create an edit for inserting text
pub fn Edit::insert(position : Int, length : Int) -> Edit {
  Edit::new(position, position, position + length)
}

///|
/// Create an edit for deleting text
pub fn Edit::delete(start : Int, end : Int) -> Edit {
  Edit::new(start, end, start)
}

///|
/// Create an edit for replacing text
pub fn Edit::replace(start : Int, old_end : Int, new_end : Int) -> Edit {
  Edit::new(start, old_end, new_end)
}

///|
/// Print edit as a string
pub fn Edit::to_string(self : Edit) -> String {
  "Edit { start: " +
  self.start.to_string() +
  ", old_end: " +
  self.old_end.to_string() +
  ", new_end: " +
  self.new_end.to_string() +
  ", delta: " +
  self.delta().to_string() +
  " }"
}
