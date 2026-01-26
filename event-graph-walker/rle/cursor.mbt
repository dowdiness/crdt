///| Phase 2: Cursor API for efficient sequential access
///
/// RleCursor provides O(1) amortized sequential access by maintaining
/// position state. Avoids repeated O(log n) searches when iterating.
///
/// Note: Cursors are invalidated by mutations to the underlying RleVecCached.
/// After mutation, either discard the cursor or call seek() to reposition.

///|
/// A cursor into an RleVecCached for efficient sequential access.
///
/// Maintains position state to avoid repeated binary searches.
/// Use for editor cursor movement, rendering visible ranges,
/// or applying local edits.
pub struct RleCursor[T] {
  vec : RleVecCached[T]
  mut run_index : Int // Current run index
  mut offset_in_run : Int // Offset within current run
  mut global_offset : Int // Total offset from start
} derive(Show)

///|
/// Creates a cursor positioned at the start of the RleVecCached.
pub fn[T] RleVecCached::cursor(self : RleVecCached[T]) -> RleCursor[T] {
  { vec: self, run_index: 0, offset_in_run: 0, global_offset: 0 }
}

///|
/// Returns true if the cursor is at the end of the vector.
pub fn[T : HasLength] RleCursor::is_at_end(self : RleCursor[T]) -> Bool {
  self.global_offset >= self.vec.total_atom_len()
}

///|
/// Returns true if the cursor is at the start of the vector.
pub fn[T] RleCursor::is_at_start(self : RleCursor[T]) -> Bool {
  self.global_offset == 0
}

///|
/// Returns the current global position.
pub fn[T] RleCursor::position(self : RleCursor[T]) -> Int {
  self.global_offset
}

///|
/// Returns the current run and offset within it.
/// Returns None if at end of vector.
pub fn[T] RleCursor::current(self : RleCursor[T]) -> (T, Int)? {
  if self.run_index >= self.vec.vec.0.length() {
    return None
  }
  Some((self.vec.vec.0[self.run_index], self.offset_in_run))
}

///|
/// Returns the current item without offset.
/// Returns None if at end of vector.
pub fn[T] RleCursor::current_item(self : RleCursor[T]) -> T? {
  if self.run_index >= self.vec.vec.0.length() {
    return None
  }
  Some(self.vec.vec.0[self.run_index])
}

///|
/// Move cursor forward by n atoms.
/// Returns true if movement was successful (stayed within bounds).
/// O(k) where k = runs traversed.
pub fn[T : HasLength] RleCursor::advance(self : RleCursor[T], n : Int) -> Bool {
  if n < 0 {
    return self.retreat(-n)
  }
  if n == 0 {
    return true
  }
  let total = self.vec.total_atom_len()
  let target = self.global_offset + n
  if target > total {
    // Move to end
    self.global_offset = total
    self.run_index = self.vec.vec.0.length()
    self.offset_in_run = 0
    return false
  }
  let mut remaining = n
  while remaining > 0 && self.run_index < self.vec.vec.0.length() {
    let current_run_len = HasLength::atom_len(self.vec.vec.0[self.run_index])
    let available_in_run = current_run_len - self.offset_in_run
    if remaining < available_in_run {
      // Stay in current run
      self.offset_in_run = self.offset_in_run + remaining
      self.global_offset = self.global_offset + remaining
      remaining = 0
    } else {
      // Move to next run
      self.global_offset = self.global_offset + available_in_run
      remaining = remaining - available_in_run
      self.run_index = self.run_index + 1
      self.offset_in_run = 0
    }
  }
  true
}

///|
/// Move cursor backward by n atoms.
/// Returns true if movement was successful (stayed within bounds).
/// O(k) where k = runs traversed.
pub fn[T : HasLength] RleCursor::retreat(self : RleCursor[T], n : Int) -> Bool {
  if n < 0 {
    return self.advance(-n)
  }
  if n == 0 {
    return true
  }
  if n > self.global_offset {
    // Move to start
    self.global_offset = 0
    self.run_index = 0
    self.offset_in_run = 0
    return false
  }
  let mut remaining = n
  while remaining > 0 {
    if self.offset_in_run >= remaining {
      // Stay in current run
      self.offset_in_run = self.offset_in_run - remaining
      self.global_offset = self.global_offset - remaining
      remaining = 0
    } else {
      // Move to previous run
      self.global_offset = self.global_offset - self.offset_in_run
      remaining = remaining - self.offset_in_run
      if self.run_index == 0 {
        // At start
        self.offset_in_run = 0
        break
      }
      self.run_index = self.run_index - 1
      self.offset_in_run = HasLength::atom_len(self.vec.vec.0[self.run_index])
    }
  }
  true
}

///|
/// Seek to absolute position.
/// Returns true if position is valid.
/// O(log n) via binary search.
pub fn[T : HasLength] RleCursor::seek(
  self : RleCursor[T],
  position : Int,
) -> Bool {
  if position < 0 {
    self.global_offset = 0
    self.run_index = 0
    self.offset_in_run = 0
    return false
  }
  let total = self.vec.total_atom_len()
  if position >= total {
    self.global_offset = total
    self.run_index = self.vec.vec.0.length()
    self.offset_in_run = 0
    return position == total
  }
  // Use binary search
  match self.vec.search(position) {
    Some(result) => {
      self.run_index = result.run_index
      self.offset_in_run = result.offset
      self.global_offset = position
      true
    }
    None => {
      // Should not happen if position < total
      self.global_offset = total
      self.run_index = self.vec.vec.0.length()
      self.offset_in_run = 0
      false
    }
  }
}

///|
/// Move to the start of the vector.
pub fn[T] RleCursor::seek_start(self : RleCursor[T]) -> Unit {
  self.global_offset = 0
  self.run_index = 0
  self.offset_in_run = 0
}

///|
/// Move to the end of the vector.
pub fn[T : HasLength] RleCursor::seek_end(self : RleCursor[T]) -> Unit {
  self.global_offset = self.vec.total_atom_len()
  self.run_index = self.vec.vec.0.length()
  self.offset_in_run = 0
}

///|
/// Move to the next atom. Returns the current item before moving, or None if at end.
pub fn[T : HasLength] RleCursor::next(self : RleCursor[T]) -> T? {
  if self.run_index >= self.vec.vec.0.length() {
    return None
  }
  let item = self.vec.vec.0[self.run_index]
  let _ = self.advance(1)
  Some(item)
}

///|
/// Move to the previous atom. Returns the item at the new position, or None if at start.
pub fn[T : HasLength] RleCursor::prev(self : RleCursor[T]) -> T? {
  if self.global_offset == 0 {
    return None
  }
  let _ = self.retreat(1)
  if self.run_index < self.vec.vec.0.length() {
    Some(self.vec.vec.0[self.run_index])
  } else {
    None
  }
}

///|
/// Iterate from current position to end, yielding (item, offset_in_item, global_offset).
/// Does not modify cursor position. Uses lazy iteration - elements produced on demand.
pub fn[T : HasLength] RleCursor::iter_forward(
  self : RleCursor[T],
) -> Iter[(T, Int, Int)] {
  let items = self.vec.vec.0
  let mut run_idx = self.run_index
  let mut offset = self.offset_in_run
  let mut global = self.global_offset
  Iter::new(fn() {
    if run_idx >= items.length() {
      return None
    }
    let item = items[run_idx]
    let item_len = HasLength::atom_len(item)
    if offset >= item_len {
      // Move to next run
      run_idx = run_idx + 1
      offset = 0
      if run_idx >= items.length() {
        return None
      }
      let next_item = items[run_idx]
      let result = (next_item, 0, global)
      offset = 1
      global = global + 1
      return Some(result)
    }
    let result = (item, offset, global)
    offset = offset + 1
    global = global + 1
    result |> Some
  })
}

///|
/// Creates a clone of this cursor at the same position.
pub fn[T] RleCursor::clone(self : RleCursor[T]) -> RleCursor[T] {
  {
    vec: self.vec,
    run_index: self.run_index,
    offset_in_run: self.offset_in_run,
    global_offset: self.global_offset,
  }
}

///|
/// Returns the distance between two cursor positions.
pub fn[T] RleCursor::distance_to(
  self : RleCursor[T],
  other : RleCursor[T],
) -> Int {
  other.global_offset - self.global_offset
}
