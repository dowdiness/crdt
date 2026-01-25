///| Phase 2: Cached prefix-sum RleVec for O(log n) search
///
/// This provides the same API as RleVec but with cached prefix sums
/// for efficient binary search. Uses lazy rebuild with dirty flag
/// to amortize cache maintenance cost.

///|
/// A run-length encoded vector with cached prefix sums for O(log n) search.
///
/// Uses lazy rebuild: prefix sums are only recomputed when dirty and accessed.
/// All mutations set the dirty flag; read operations trigger rebuild if needed.
pub struct RleVecCached[T] {
  items : Array[T]
  mut prefix_sums : Array[Int] // prefix_sums[i] = cumulative atom_len through items[i]
  mut content_prefix_sums : Array[Int] // For O(1) total_content_len
  mut dirty : Bool
} derive(Show, Eq)

///|
/// Creates an empty RleVecCached.
pub fn[T] RleVecCached::new() -> RleVecCached[T] {
  { items: [], prefix_sums: [], content_prefix_sums: [], dirty: false }
}

///|
/// Creates an RleVecCached from an existing array, merging adjacent runs.
/// Skips zero-length elements silently.
pub fn[T : Mergeable + HasLength] RleVecCached::from_array(
  arr : Array[T],
) -> RleVecCached[T] {
  let vec = RleVecCached::new()
  for item in arr {
    if T::atom_len(item) > 0 {
      guard vec.push(item) is Ok(_)
    }
  }
  vec
}

///|
/// Returns true if this RleVecCached contains no runs.
pub fn[T] RleVecCached::is_empty(self : RleVecCached[T]) -> Bool {
  self.items.is_empty()
}

///|
/// Returns the number of runs (not atoms).
pub fn[T] RleVecCached::run_count(self : RleVecCached[T]) -> Int {
  self.items.length()
}

///|
/// Rebuilds prefix_sums if dirty flag is set.
/// Called lazily before any search operation.
fn[T : HasLength] RleVecCached::rebuild_if_dirty(
  self : RleVecCached[T],
) -> Unit {
  if not(self.dirty) {
    return
  }
  self.prefix_sums = []
  self.content_prefix_sums = []
  let mut atom_sum = 0
  let mut content_sum = 0
  for item in self.items {
    atom_sum = atom_sum + T::atom_len(item)
    content_sum = content_sum + T::content_len(item)
    self.prefix_sums.push(atom_sum)
    self.content_prefix_sums.push(content_sum)
  }
  self.dirty = false
}

///|
/// Marks cache as dirty. Called after any mutation.
fn[T] RleVecCached::invalidate(self : RleVecCached[T]) -> Unit {
  self.dirty = true
}

///|
/// Returns the total atom length (sum of all atom_len).
/// O(1) after rebuild; O(n) rebuild amortized over mutations.
pub fn[T : HasLength] RleVecCached::total_atom_len(
  self : RleVecCached[T],
) -> Int {
  self.rebuild_if_dirty()
  match self.prefix_sums.last() {
    Some(total) => total
    None => 0
  }
}

///|
/// Returns the total content length (sum of all content_len).
/// O(1) after rebuild; O(n) rebuild amortized over mutations.
pub fn[T : HasLength] RleVecCached::total_content_len(
  self : RleVecCached[T],
) -> Int {
  self.rebuild_if_dirty()
  match self.content_prefix_sums.last() {
    Some(total) => total
    None => 0
  }
}

///|
/// Adds an element to the end, merging with the last run if possible.
/// Returns `Err(EmptyElement)` if atom_len is 0.
/// Invalidates the cache.
pub fn[T : Mergeable + HasLength] RleVecCached::push(
  self : RleVecCached[T],
  element : T,
) -> Result[Unit, RleError] {
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
  self.invalidate()
  Ok(())
}

///|
/// Cascades merging leftward after a push-merge changes mergeability.
fn[T : Mergeable] RleVecCached::normalize_last(self : RleVecCached[T]) -> Unit {
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
/// Finds the run containing the given index using O(log n) binary search.
///
/// Parameters:
///
/// * `self` : The RleVecCached to search in.
/// * `index` : The atom index to find (0-based).
///
/// Returns `Some(SearchResult)` with run index and offset, or `None` if out of bounds.
pub fn[T : HasLength] RleVecCached::search(
  self : RleVecCached[T],
  index : Int,
) -> SearchResult? {
  if index < 0 || self.items.is_empty() {
    return None
  }
  self.rebuild_if_dirty()
  let total = match self.prefix_sums.last() {
    Some(t) => t
    None => return None
  }
  if index >= total {
    return None
  }
  // Binary search: find smallest i where prefix_sums[i] > index
  let mut lo = 0
  let mut hi = self.items.length()
  while lo < hi {
    let mid = lo + (hi - lo) / 2
    if self.prefix_sums[mid] <= index {
      lo = mid + 1
    } else {
      hi = mid
    }
  }
  // lo is now the run index containing the target
  if lo == 0 {
    Some({ run_index: 0, offset: index })
  } else {
    Some({ run_index: lo, offset: index - self.prefix_sums[lo - 1] })
  }
}

///|
/// Iterates over slices of runs that overlap with [start, end).
///
/// Yields `Slice[T]` views that can be converted to actual values with `to_inner()`.
/// Returns `Err(IndexOutOfBounds)` for invalid ranges; returns empty iterator if start == end.
pub fn[T : HasLength] RleVecCached::iter_slices(
  self : RleVecCached[T],
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
  // Find the starting run using binary search
  let start_result = self.search(start)
  guard start_result is Some(start_pos) else { return Ok(Iter::empty()) }
  let items = self.items
  let prefix_sums = self.prefix_sums
  let result : Array[Slice[T]] = []
  // Start from the run containing 'start'
  let mut i = start_pos.run_index
  while i < items.length() {
    let item = items[i]
    let prefix = if i == 0 { 0 } else { prefix_sums[i - 1] }
    let item_end = prefix_sums[i]
    // Check if this run overlaps with [start, end)
    if item_end > start && prefix < end {
      let slice_start = if prefix < start { start - prefix } else { 0 }
      let slice_end = if item_end > end {
        end - prefix
      } else {
        item_end - prefix
      }
      result.push({ value: item, start: slice_start, end: slice_end })
    }
    if item_end >= end {
      break
    }
    i = i + 1
  }
  Ok(result.iter())
}

///|
/// Permissive wrapper that clamps bounds to [0, total_atom_len] and returns an
/// empty iterator when start >= end.
pub fn[T : HasLength] RleVecCached::iter_slices_clamped(
  self : RleVecCached[T],
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
/// Splits this RleVecCached at the given index.
///
/// Returns two RleVecCacheds: [0, index) and [index, total_len).
/// Handles boundary cases to avoid zero-length slices.
pub fn[T : Sliceable + HasLength + Mergeable] RleVecCached::split_at(
  self : RleVecCached[T],
  index : Int,
) -> Result[(RleVecCached[T], RleVecCached[T]), RleError] {
  let total = self.total_atom_len()
  if index < 0 || index > total {
    return Err(RleError::IndexOutOfBounds(index~, len=total))
  }
  if index == 0 {
    return Ok((RleVecCached::new(), self))
  }
  if index == total {
    return Ok((self, RleVecCached::new()))
  }
  let left : RleVecCached[T] = RleVecCached::new()
  let right : RleVecCached[T] = RleVecCached::new()
  // Use binary search to find the split point
  let split_result = self.search(index)
  match split_result {
    None => return Err(RleError::IndexOutOfBounds(index~, len=total))
    Some(split_pos) => {
      // Copy items before the split run to left
      for i = 0; i < split_pos.run_index; i = i + 1 {
        match left.push(self.items[i]) {
          Ok(_) => ()
          Err(e) => return Err(e)
        }
      }
      // Handle the split run
      let split_item = self.items[split_pos.run_index]
      if split_pos.offset > 0 {
        // Need to slice the run
        match left.push(T::slice(split_item, start=0, end=split_pos.offset)) {
          Ok(_) => ()
          Err(e) => return Err(e)
        }
        let item_len = T::atom_len(split_item)
        if split_pos.offset < item_len {
          match
            right.push(
              T::slice(split_item, start=split_pos.offset, end=item_len),
            ) {
            Ok(_) => ()
            Err(e) => return Err(e)
          }
        }
      } else {
        // Split at run boundary, whole run goes to right
        match right.push(split_item) {
          Ok(_) => ()
          Err(e) => return Err(e)
        }
      }
      // Copy remaining items to right
      for i = split_pos.run_index + 1; i < self.items.length(); i = i + 1 {
        match right.push(self.items[i]) {
          Ok(_) => ()
          Err(e) => return Err(e)
        }
      }
    }
  }
  Ok((left, right))
}

///|
/// Returns an iterator over all items.
pub fn[T] RleVecCached::iter(self : RleVecCached[T]) -> Iter[T] {
  self.items.iter()
}

///|
/// Converts to uncached RleVec.
/// The returned vec uses a shallow copy of items, so T should be treated as immutable.
/// TODO: Consider a deep-copy variant or an immutability wrapper for T.
pub fn[T] RleVecCached::to_rle_vec(self : RleVecCached[T]) -> RleVec[T] {
  { items: self.items.copy() }
}

///|
/// Creates from uncached RleVec.
/// The returned cache uses a shallow copy of items, so T should be treated as immutable.
/// TODO: Consider a deep-copy variant or an immutability wrapper for T.
pub fn[T] RleVecCached::from_rle_vec(vec : RleVec[T]) -> RleVecCached[T] {
  {
    items: vec.items.copy(),
    prefix_sums: [],
    content_prefix_sums: [],
    dirty: true,
  }
}
