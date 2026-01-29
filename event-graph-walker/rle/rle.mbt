///|
/// Runs with lazy prefix sums - convenience wrapper for O(log n) operations
pub struct Rle[T] {
  runs : Runs[T]
  mut prefix : PrefixSums? // None = stale, needs rebuild
  mut version : Int // Monotonically increasing mutation counter
} derive(Show, Eq)

///|
pub fn[T] Rle::new() -> Rle[T] {
  { runs: Runs::new(), prefix: None, version: 0 }
}

///|
pub fn[T : Mergeable + HasCausalLength] Rle::from_array(
  arr : Array[T],
) -> Rle[T] {
  { runs: Runs::from_array(arr), prefix: None, version: 0 }
}

///|
pub fn[T] Rle::from_runs(runs : Runs[T]) -> Rle[T] {
  { runs, prefix: None, version: 0 }
}

///|
pub fn[T] Rle::to_runs(self : Rle[T]) -> Runs[T] {
  self.runs
}

///|
/// Current mutation version (for cursor staleness detection)
pub fn[T] Rle::get_version(self : Rle[T]) -> Int {
  self.version
}

///|
/// Increment version on structural mutations
fn[T] Rle::bump_version(self : Rle[T]) -> Unit {
  self.version = self.version + 1
}

///|
/// Mark prefix sums as stale
fn[T] Rle::invalidate(self : Rle[T]) -> Unit {
  self.prefix = None
}

///|
/// Rebuild prefix sums if stale
fn[T : HasCausalLength] Rle::ensure_prefix(self : Rle[T]) -> PrefixSums {
  match self.prefix {
    Some(p) => p
    None => {
      let p = self.runs.prefix_sums()
      self.prefix = Some(p)
      p
    }
  }
}

///|
pub fn[T] Rle::is_empty(self : Rle[T]) -> Bool {
  self.runs.is_empty()
}

///|
pub fn[T] Rle::count(self : Rle[T]) -> Int {
  self.runs.count()
}

///|
pub fn[T] Rle::get(self : Rle[T], index : Int) -> T? {
  self.runs.get(index)
}

///|
pub fn[T] Rle::iter(self : Rle[T]) -> Iter[T] {
  self.runs.iter()
}

///|
/// Total causal length - O(1) with cache
pub fn[T : HasCausalLength] Rle::len(self : Rle[T]) -> Int {
  self.ensure_prefix().len()
}

///|
/// Total visible length - O(1) with cache
pub fn[T : HasCausalLength] Rle::visible_len(self : Rle[T]) -> Int {
  self.ensure_prefix().visible_len()
}

///|
/// Append element - invalidates cache and bumps version
pub fn[T : Mergeable + HasCausalLength] Rle::append(
  self : Rle[T],
  elem : T,
) -> Result[Unit, RleError] {
  match self.runs.append(elem) {
    Ok(_) => {
      self.bump_version()
      self.invalidate()
      Ok(())
    }
    Err(e) => Err(e)
  }
}

///|
/// Find position - O(log n) with cache
pub fn[T : HasCausalLength] Rle::find(self : Rle[T], pos : Int) -> RunPos? {
  let sums = self.ensure_prefix()
  self.runs.find_fast(sums, pos)
}

///|
/// Iterate slices in range [start, end) - uses cache
pub fn[T : HasCausalLength] Rle::range(
  self : Rle[T],
  start~ : Int,
  end~ : Int,
) -> Result[Iter[Slice[T]], RleError] {
  let sums = self.ensure_prefix()
  let total = sums.len()
  if start < 0 {
    return Err(
      RleError::InvalidRange(start~, end~, length=total, reason=NegativeStart),
    )
  }
  if end < 0 {
    return Err(
      RleError::InvalidRange(start~, end~, length=total, reason=NegativeEnd),
    )
  }
  if start > end {
    return Err(
      RleError::InvalidRange(start~, end~, length=total, reason=StartAfterEnd),
    )
  }
  if end > total {
    return Err(
      RleError::InvalidRange(start~, end~, length=total, reason=ExceedsLength),
    )
  }
  if start == end {
    return Ok(Iter::empty())
  }
  // Use binary search to find starting run
  let start_pos = self.runs.find_fast(sums, start)
  guard start_pos is Some(sp) else { return Ok(Iter::empty()) }
  let result : Array[Slice[T]] = []
  let mut i = sp.run
  while i < self.runs.0.length() {
    let item = self.runs.0[i]
    let prefix = sums.atom_before(i)
    let item_end = sums.atoms[i]
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
/// Iterate slices with clamped bounds
pub fn[T : HasCausalLength] Rle::range_clamped(
  self : Rle[T],
  start~ : Int,
  end~ : Int,
) -> Iter[Slice[T]] {
  let total = self.len()
  let s = if start < 0 { 0 } else { start }
  let e = if end > total { total } else { end }
  if s >= e {
    return Iter::empty()
  }
  match self.range(start=s, end=e) {
    Ok(it) => it
    Err(_) => Iter::empty()
  }
}

///|
/// Split at position - invalidates cache
pub fn[T : Sliceable + HasCausalLength + Mergeable] Rle::split(
  self : Rle[T],
  pos : Int,
) -> Result[(Rle[T], Rle[T]), RleError] {
  match self.runs.split(pos) {
    Ok((left, right)) => Ok((Rle::from_runs(left), Rle::from_runs(right)))
    Err(e) => Err(e)
  }
}

///|
/// Clear all runs - invalidates cache and bumps version
pub fn[T] Rle::clear(self : Rle[T]) -> Unit {
  self.runs.clear()
  self.bump_version()
  self.invalidate()
}

///|
/// Concatenate two Rle
pub fn[T : Mergeable + HasCausalLength] Rle::concat(
  self : Rle[T],
  other : Rle[T],
) -> Rle[T] {
  Rle::from_runs(self.runs.concat(other.runs))
}

///|
/// Extend in-place - invalidates cache and bumps version only if mutation occurs.
/// Note: bumps version if other is non-empty, even if all items are filtered
/// (causal_len <= 0). This is conservative; callers should pre-filter if needed.
pub fn[T : Mergeable + HasCausalLength] Rle::extend(
  self : Rle[T],
  other : Rle[T],
) -> Unit {
  if other.runs.is_empty() {
    return
  }
  let old_count = self.runs.count()
  self.runs.extend(other.runs)
  // Only bump version if actual mutation occurred
  if self.runs.count() != old_count || old_count > 0 {
    self.bump_version()
    self.invalidate()
  }
}
