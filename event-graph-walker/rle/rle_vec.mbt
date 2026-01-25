///|
/// A run-length encoded vector that automatically merges adjacent runs.
pub struct RleVec[T] {
  items : Array[T]
} derive(Show, Eq)

///|
/// Creates an empty RleVec.
pub fn[T] RleVec::new() -> RleVec[T] {
  { items: [] }
}

///|
/// Creates an RleVec from an existing array, merging adjacent runs.
/// Skips zero-length elements silently.
pub fn[T : Mergeable + HasLength] RleVec::from_array(
  arr : Array[T],
) -> RleVec[T] {
  let vec = RleVec::new()
  for item in arr {
    if T::atom_len(item) > 0 {
      // push only fails on EmptyElement, which we've excluded above
      guard vec.push(item) is Ok(_)
    }
  }
  vec
}

///|
/// Returns true if this RleVec contains no runs.
pub fn[T] RleVec::is_empty(self : RleVec[T]) -> Bool {
  self.items.is_empty()
}

///|
/// Returns the number of runs (not atoms).
pub fn[T] RleVec::run_count(self : RleVec[T]) -> Int {
  self.items.length()
}

///|
/// Returns the total atom length (sum of all atom_len).
/// Computed on each call; O(n) where n = run_count.
pub fn[T : HasLength] RleVec::total_atom_len(self : RleVec[T]) -> Int {
  self.items.fold(init=0, fn(acc, item) { acc + T::atom_len(item) })
}

///|
/// Returns the total content length (sum of all content_len).
/// Computed on each call; O(n) where n = run_count.
pub fn[T : HasLength] RleVec::total_content_len(self : RleVec[T]) -> Int {
  self.items.fold(init=0, fn(acc, item) { acc + T::content_len(item) })
}

///|
/// Adds an element to the end, merging with the last run if possible.
/// Returns `Err(EmptyElement)` if atom_len is 0.
pub fn[T : Mergeable + HasLength] RleVec::push(
  self : RleVec[T],
  element : T,
) -> Result[Unit, RleError] {
  // Reject zero-length elements to preserve invariants.
  if T::atom_len(element) <= 0 {
    return Err(RleError::EmptyElement)
  }
  match self.items.last() {
    Some(last) =>
      if T::can_merge(last, element) {
        self.items[self.items.length() - 1] = T::merge(last, element)
        self.normalize_last()
      } else {
        self.items.push(element)
      }
    None => self.items.push(element)
  }
  Ok(())
}

///|
/// Cascades merging leftward after a push-merge changes mergeability.
///
/// **When is this needed?**
/// For types where `can_merge` depends on the merged result, not just adjacency.
/// Example: A run type that only merges same-category items, but merging
/// can change the category (e.g., based on accumulated length).
///
/// For simple types like String (where can_merge is always true), this
/// ensures the vector collapses to a single run.
fn[T : Mergeable] RleVec::normalize_last(self : RleVec[T]) -> Unit {
  // If merge behavior changes after merging, cascade to the left.
  while self.items.length() >= 2 {
    let last = self.items.length() - 1
    let prev = last - 1
    let a = self.items[prev]
    let b = self.items[last]
    if T::can_merge(a, b) {
      self.items[prev] = T::merge(a, b)
      let _ = self.items.pop()

    } else {
      break
    }
  }
}

///|
/// Finds the run containing the given index.
///
/// Parameters:
///
/// * `self` : The RleVec to search in.
/// * `index` : The atom index to find (0-based).
///
/// Returns `Some(SearchResult)` with run index and offset, or `None` if out of bounds.
///
/// Example:
///
/// ```moonbit
/// let vec = RleVec::from_string("hello")
/// inspect!(vec.search(2), content="Some({run_index: 0, offset: 2})")
/// ```
pub fn[T : HasLength] RleVec::search(
  self : RleVec[T],
  index : Int,
) -> SearchResult? {
  if index < 0 {
    return None
  }
  let mut prefix = 0
  for i = 0; i < self.items.length(); i = i + 1 {
    let len = T::atom_len(self.items[i])
    if index < prefix + len {
      return Some({ run_index: i, offset: index - prefix })
    }
    prefix = prefix + len
  }
  None // index >= total_atom_len
}

///|
/// Iterates over slices of runs that overlap with [start, end).
///
/// Yields `Slice[T]` views that can be converted to actual values with `to_inner()`.
/// Returns `Err(IndexOutOfBounds)` for invalid ranges; returns empty iterator if start == end.
pub fn[T : HasLength] RleVec::iter_slices(
  self : RleVec[T],
  start~ : Int,
  end~ : Int,
) -> Result[Iter[Slice[T]], RleError] {
  let total = self.total_atom_len()
  if start < 0 || end < 0 || start > end || end > total {
    let bad_index = if start < 0 {
      start
    } else if end < 0 {
      end
    } else if start > end {
      start
    } else {
      end
    }
    return Err(RleError::IndexOutOfBounds(index=bad_index, len=total))
  }
  if start == end {
    return Ok(Iter::empty())
  }
  let items = self.items
  let result : Array[Slice[T]] = []
  let mut pos = 0
  for i = 0; i < items.length(); i = i + 1 {
    let item = items[i]
    let len = T::atom_len(item)
    let item_end = pos + len
    // Check if this run overlaps with [start, end)
    if item_end > start && pos < end {
      let slice_start = if pos < start { start - pos } else { 0 }
      let slice_end = if item_end > end { end - pos } else { len }
      result.push({ value: item, start: slice_start, end: slice_end })
    }
    pos = item_end
    if pos >= end {
      break
    }
  }
  Ok(result.iter())
}

///|
/// Permissive wrapper that clamps bounds to [0, total_atom_len] and returns an
/// empty iterator when start >= end.
pub fn[T : HasLength] RleVec::iter_slices_clamped(
  self : RleVec[T],
  start~ : Int,
  end~ : Int,
) -> Iter[Slice[T]] {
  let total = self.total_atom_len()
  let clamped_start = if start < 0 { 0 } else { start }
  let clamped_end = if end > total { total } else { end }
  if clamped_start >= clamped_end {
    return Iter::empty()
  }
  match self.iter_slices(start=clamped_start, end=clamped_end) {
    Ok(it) => it
    Err(_) => Iter::empty()
  }
}

///|
/// Splits this RleVec at the given index.
///
/// Returns two RleVecs: [0, index) and [index, total_len).
/// Handles boundary cases to avoid zero-length slices.
pub fn[T : Sliceable + HasLength + Mergeable] RleVec::split_at(
  self : RleVec[T],
  index : Int,
) -> Result[(RleVec[T], RleVec[T]), RleError] {
  let total = self.total_atom_len()
  // Handle boundary cases
  if index < 0 || index > total {
    return Err(RleError::IndexOutOfBounds(index~, len=total))
  }
  if index == 0 {
    return Ok((RleVec::new(), self))
  }
  if index == total {
    return Ok((self, RleVec::new()))
  }
  let left : RleVec[T] = RleVec::new()
  let right : RleVec[T] = RleVec::new()
  let mut pos = 0
  for item in self.items {
    let len = T::atom_len(item)
    let item_end = pos + len
    if item_end <= index {
      // Entirely in left
      match left.push(item) {
        Ok(_) => ()
        Err(e) => return Err(e)
      }
    } else if pos >= index {
      // Entirely in right
      match right.push(item) {
        Ok(_) => ()
        Err(e) => return Err(e)
      }
    } else {
      // Split point is within this item (not at boundary)
      let split_offset = index - pos
      if split_offset == 0 {
        match right.push(item) {
          Ok(_) => ()
          Err(e) => return Err(e)
        }
      } else if split_offset == len {
        match left.push(item) {
          Ok(_) => ()
          Err(e) => return Err(e)
        }
      } else {
        match left.push(T::slice(item, start=0, end=split_offset)) {
          Ok(_) => ()
          Err(e) => return Err(e)
        }
        match right.push(T::slice(item, start=split_offset, end=len)) {
          Ok(_) => ()
          Err(e) => return Err(e)
        }
      }
    }
    pos = item_end
  }
  Ok((left, right))
}

///|
/// Returns an iterator over all items.
pub fn[T] RleVec::iter(self : RleVec[T]) -> Iter[T] {
  self.items.iter()
}
