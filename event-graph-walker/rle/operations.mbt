///| Phase 2: Additional operations for RleVec and RleVecCached
///
/// Includes concat, extend, and utility operations.

///|
/// Concatenate two RleVecs, merging at the boundary if possible.
/// O(n + m) where n, m are run counts.
pub fn[T : Mergeable + HasLength] RleVec::concat(
  self : RleVec[T],
  other : RleVec[T],
) -> RleVec[T] {
  let result : RleVec[T] = RleVec::new()
  for item in self.items {
    let _ = result.push(item)

  }
  for item in other.items {
    // First push may merge with last of self
    let _ = result.push(item)

  }
  result
}

///|
/// Extend in-place from another RleVec.
pub fn[T : Mergeable + HasLength] RleVec::extend(
  self : RleVec[T],
  other : RleVec[T],
) -> Unit {
  for item in other.items {
    let _ = self.push(item)

  }
}

///|
/// Clear all items from the RleVec.
pub fn[T] RleVec::clear(self : RleVec[T]) -> Unit {
  self.items.clear()
}

///|
/// Get a copy of the underlying items array.
/// Returns a shallow copy - if T contains mutable references, they are shared.
pub fn[T] RleVec::items(self : RleVec[T]) -> Array[T] {
  self.items.copy()
}

///|
/// Get item at run index (not atom index).
pub fn[T] RleVec::get_run(self : RleVec[T], index : Int) -> T? {
  if index < 0 || index >= self.items.length() {
    None
  } else {
    Some(self.items[index])
  }
}

///|
/// Concatenate two RleVecCacheds, merging at the boundary if possible.
/// O(n + m) where n, m are run counts.
pub fn[T : Mergeable + HasLength] RleVecCached::concat(
  self : RleVecCached[T],
  other : RleVecCached[T],
) -> RleVecCached[T] {
  let result : RleVecCached[T] = RleVecCached::new()
  for item in self.items {
    let _ = result.push(item)

  }
  for item in other.items {
    let _ = result.push(item)

  }
  result
}

///|
/// Extend in-place from another RleVecCached.
/// Note: push() already invalidates the cache, so no explicit invalidate() needed.
pub fn[T : Mergeable + HasLength] RleVecCached::extend(
  self : RleVecCached[T],
  other : RleVecCached[T],
) -> Unit {
  for item in other.items {
    let _ = self.push(item)

  }
}

///|
/// Clear all items from the RleVecCached.
pub fn[T] RleVecCached::clear(self : RleVecCached[T]) -> Unit {
  self.items.clear()
  self.prefix_sums.clear()
  self.content_prefix_sums.clear()
  self.dirty = false
}

///|
/// Get a copy of the underlying items array.
/// Returns a shallow copy - if T contains mutable references, they are shared.
pub fn[T] RleVecCached::items(self : RleVecCached[T]) -> Array[T] {
  self.items.copy()
}

///|
/// Get item at run index (not atom index).
pub fn[T] RleVecCached::get_run(self : RleVecCached[T], index : Int) -> T? {
  if index < 0 || index >= self.items.length() {
    None
  } else {
    Some(self.items[index])
  }
}

///|
/// Creates an RleVecCached containing a single string run.
pub fn RleVecCached::from_string(text : String) -> RleVecCached[String] {
  let vec = RleVecCached::new()
  if not(text.is_empty()) {
    let _ = vec.push(text)

  }
  vec
}

///|
/// Concatenates all runs into a single string.
pub fn RleVecCached::to_string(self : RleVecCached[String]) -> String {
  self.items.fold(init="", fn(acc, s) { acc + s })
}

///|
/// Returns an iterator over codepoints.
pub fn RleVecCached::iter_chars(self : RleVecCached[String]) -> Iter[Char] {
  let chars : Array[Char] = []
  for run in self.items {
    for c in run {
      chars.push(c)
    }
  }
  chars.iter()
}
