///|
/// Array of mergeable runs - core RLE data structure
pub struct Runs[T](Array[T]) derive(Show, Eq)

///|
pub fn[T] Runs::new() -> Runs[T] {
  Runs([])
}

///|
/// Batch construction - single-pass stack merge, avoids repeated normalize_tail
pub fn[T : Mergeable + HasCausalLength] Runs::from_array_batch(
  arr : Array[T],
) -> Runs[T] {
  let out : Array[T] = []
  for item in arr {
    if T::causal_len(item) <= 0 {
      continue
    }
    if out.is_empty() {
      out.push(item)
      continue
    }
    // Stack-merge: fold into tail and cascade as needed
    let mut cur = item
    while not(out.is_empty()) {
      let last = out[out.length() - 1]
      if T::can_merge(last, cur) {
        let _ = out.pop()
        cur = T::merge(last, cur)
      } else {
        break
      }
    }
    out.push(cur)
  }
  Runs(out)
}

///|
pub fn[T : Mergeable + HasCausalLength] Runs::from_array(
  arr : Array[T],
) -> Runs[T] {
  Runs::from_array_batch(arr)
}

///|
pub fn[T] Runs::is_empty(self : Runs[T]) -> Bool {
  self.0.is_empty()
}

///|
pub fn[T] Runs::count(self : Runs[T]) -> Int {
  self.0.length()
}

///|
pub fn[T] Runs::get(self : Runs[T], index : Int) -> T? {
  if index < 0 || index >= self.0.length() {
    None
  } else {
    Some(self.0[index])
  }
}

///|
pub fn[T] Runs::iter(self : Runs[T]) -> Iter[T] {
  self.0.iter()
}

///|
pub fn[T] Runs::to_array(self : Runs[T]) -> Array[T] {
  self.0.copy()
}

///|
/// Total causal length - O(n)
pub fn[T : HasCausalLength] Runs::len(self : Runs[T]) -> Int {
  self.0.fold(init=0, fn(acc, item) { acc + T::causal_len(item) })
}

///|
/// Total visible length - O(n)
pub fn[T : HasCausalLength] Runs::visible_len(self : Runs[T]) -> Int {
  self.0.fold(init=0, fn(acc, item) { acc + T::visible_len(item) })
}

///|
/// Append element, merging with last run if possible
pub fn[T : Mergeable + HasCausalLength] Runs::append(
  self : Runs[T],
  elem : T,
) -> Result[Unit, RleError] {
  if T::causal_len(elem) <= 0 {
    return Err(RleError::Internal(InternalError::EmptyElement))
  }
  match self.0.last() {
    Some(last) =>
      if T::can_merge(last, elem) {
        self.0[self.0.length() - 1] = T::merge(last, elem)
        self.normalize_tail()
      } else {
        self.0.push(elem)
      }
    None => self.0.push(elem)
  }
  Ok(())
}

///|
/// Cascade merging leftward after append
fn[T : Mergeable] Runs::normalize_tail(self : Runs[T]) -> Unit {
  while self.0.length() >= 2 {
    let last = self.0.length() - 1
    let prev = last - 1
    let a = self.0[prev]
    let b = self.0[last]
    if T::can_merge(a, b) {
      self.0[prev] = T::merge(a, b)
      let _ = self.0.pop()

    } else {
      break
    }
  }
}

///|
/// Find position in runs - O(n) linear scan
/// Prefer `Runs::find_fast` with cached prefix sums for repeated lookups.
pub fn[T : HasCausalLength] Runs::find(self : Runs[T], pos : Int) -> RunPos? {
  if pos < 0 {
    return None
  }
  let mut prefix = 0
  for i = 0; i < self.0.length(); i = i + 1 {
    let run_len = T::causal_len(self.0[i])
    if pos < prefix + run_len {
      return Some({ run: i, offset: pos - prefix })
    }
    prefix = prefix + run_len
  }
  None
}

///|
/// Find position using prefix sums - O(log n) binary search
/// Caller manages `PrefixSums` (use `Runs::prefix_sums()` and keep it in sync).
pub fn[T] Runs::find_fast(
  self : Runs[T],
  sums : PrefixSums,
  pos : Int,
) -> RunPos? {
  if pos < 0 || self.is_empty() {
    return None
  }
  let total = match sums.atoms.last() {
    Some(t) => t
    None => return None
  }
  if pos >= total {
    return None
  }
  // Binary search: find smallest i where atoms[i] > pos
  let mut lo = 0
  let mut hi = self.0.length()
  while lo < hi {
    let mid = lo + (hi - lo) / 2
    if sums.atoms[mid] <= pos {
      lo = mid + 1
    } else {
      hi = mid
    }
  }
  if lo == 0 {
    Some({ run: 0, offset: pos })
  } else {
    Some({ run: lo, offset: pos - sums.atoms[lo - 1] })
  }
}

///|
/// Build prefix sums from runs
pub fn[T : HasCausalLength] Runs::prefix_sums(self : Runs[T]) -> PrefixSums {
  let atoms : Array[Int] = []
  let content : Array[Int] = []
  let mut atom_sum = 0
  let mut content_sum = 0
  for item in self.0 {
    atom_sum = atom_sum + T::causal_len(item)
    content_sum = content_sum + T::visible_len(item)
    atoms.push(atom_sum)
    content.push(content_sum)
  }
  { atoms, content }
}

///|
/// Iterate slices in range [start, end)
pub fn[T : HasCausalLength] Runs::range(
  self : Runs[T],
  start~ : Int,
  end~ : Int,
) -> Result[Iter[Slice[T]], RleError] {
  let total = self.len()
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
  let result : Array[Slice[T]] = []
  let mut pos = 0
  for item in self.0 {
    let run_len = T::causal_len(item)
    let item_end = pos + run_len
    if item_end > start && pos < end {
      let slice_start = if pos < start { start - pos } else { 0 }
      let slice_end = if item_end > end { end - pos } else { run_len }
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
/// Iterate slices with clamped bounds
pub fn[T : HasCausalLength] Runs::range_clamped(
  self : Runs[T],
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
/// Split at position into two Runs
pub fn[T : Sliceable + HasCausalLength + Mergeable] Runs::split(
  self : Runs[T],
  pos : Int,
) -> Result[(Runs[T], Runs[T]), RleError] {
  let total = self.len()
  if pos < 0 || pos > total {
    return Err(RleError::PositionOutOfBounds(position=pos, length=total))
  }
  if pos == 0 {
    return Ok((Runs::new(), self))
  }
  if pos == total {
    return Ok((self, Runs::new()))
  }
  let left : Runs[T] = Runs::new()
  let right : Runs[T] = Runs::new()
  let mut cur = 0
  for item in self.0 {
    let run_len = T::causal_len(item)
    let item_end = cur + run_len
    if item_end <= pos {
      guard left.append(item) is Ok(_)
    } else if cur >= pos {
      guard right.append(item) is Ok(_)
    } else {
      let offset = pos - cur
      if offset > 0 {
        guard left.append(T::slice(item, start=0, end=offset)) is Ok(_)
      }
      if offset < run_len {
        guard right.append(T::slice(item, start=offset, end=run_len)) is Ok(_)
      }
    }
    cur = item_end
  }
  Ok((left, right))
}

///|
/// Clear all runs
pub fn[T] Runs::clear(self : Runs[T]) -> Unit {
  self.0.clear()
}

///|
/// Concatenate two Runs
pub fn[T : Mergeable + HasCausalLength] Runs::concat(
  self : Runs[T],
  other : Runs[T],
) -> Runs[T] {
  let result : Runs[T] = Runs::new()
  for item in self.0 {
    let _ = result.append(item)

  }
  for item in other.0 {
    let _ = result.append(item)

  }
  result
}

///|
/// Extend in-place from another Runs
pub fn[T : Mergeable + HasCausalLength] Runs::extend(
  self : Runs[T],
  other : Runs[T],
) -> Unit {
  for item in other.0 {
    let _ = self.append(item)

  }
}
