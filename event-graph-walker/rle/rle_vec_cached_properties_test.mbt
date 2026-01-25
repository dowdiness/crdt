///| Property-based tests for RleVecCached

///|
/// Property: Search in cached version matches linear search
fn prop_cached_search_matches_linear(text : String) -> Bool {
  let len = text.iter().count()
  if len == 0 {
    return true
  }
  let cached = @rle.RleVecCached::from_string(text)
  let uncached = @rle.RleVec::from_string(text)
  // Check all valid indices
  for i = 0; i < len; i = i + 1 {
    let cached_result = cached.search(i)
    let uncached_result = uncached.search(i)
    if cached_result != uncached_result {
      return false
    }
  }
  // Check out-of-bounds
  cached.search(len) == uncached.search(len) &&
  cached.search(-1) == uncached.search(-1)
}

///|
test "property: cached search matches linear search" {
  @qc.quick_check_fn(prop_cached_search_matches_linear)
}

///|
/// Property: total_atom_len is consistent after mutations
fn prop_cached_len_consistent_after_mutation(strings : Array[String]) -> Bool {
  let cached = @rle.RleVecCached::new()
  let uncached = @rle.RleVec::new()
  for s in strings {
    if s.iter().count() > 0 {
      let _ = cached.push(s)
      let _ = uncached.push(s)

    }
  }
  cached.total_atom_len() == uncached.total_atom_len()
}

///|
test "property: cached length matches uncached after mutations" {
  @qc.quick_check_fn(prop_cached_len_consistent_after_mutation)
}

///|
/// Property: concat is associative
fn prop_concat_associative(triple : (String, String, String)) -> Bool {
  let (a, b, c) = triple
  let va = @rle.RleVecCached::from_string(a)
  let vb = @rle.RleVecCached::from_string(b)
  let vc = @rle.RleVecCached::from_string(c)
  // (va + vb) + vc
  let left = va.concat(vb).concat(vc)
  // va + (vb + vc)
  let va2 = @rle.RleVecCached::from_string(a)
  let vb2 = @rle.RleVecCached::from_string(b)
  let vc2 = @rle.RleVecCached::from_string(c)
  let right = va2.concat(vb2.concat(vc2))
  left.to_string() == right.to_string()
}

///|
test "property: concat is associative" {
  @qc.quick_check_fn(prop_concat_associative)
}

///|
/// Property: split_at and concat are inverses
fn prop_split_concat_roundtrip(text : String) -> Bool {
  let len = text.iter().count()
  if len == 0 {
    return true
  }
  let vec = @rle.RleVecCached::from_string(text)
  let mid = len / 2
  match vec.split_at(mid) {
    Ok((left, right)) => {
      let rejoined = left.concat(right)
      rejoined.to_string() == text
    }
    Err(_) => false
  }
}

///|
test "property: split_at and concat are inverses" {
  @qc.quick_check_fn(prop_split_concat_roundtrip)
}

///|
/// Property: No adjacent mergeable runs in cached vec
fn prop_cached_no_adjacent_mergeable(strings : Array[String]) -> Bool {
  let vec = @rle.RleVecCached::new()
  for s in strings {
    if s.iter().count() > 0 {
      let _ = vec.push(s)

    }
  }
  let items = vec.items()
  for i = 0; i < items.length() - 1; i = i + 1 {
    if @rle.Mergeable::can_merge(items[i], items[i + 1]) {
      return false
    }
  }
  true
}

///|
test "property: no adjacent mergeable runs in cached vec" {
  @qc.quick_check_fn(prop_cached_no_adjacent_mergeable)
}

///|
/// Property: Cursor position is always valid
fn prop_cursor_position_valid(text : String) -> Bool {
  let len = text.iter().count()
  if len < 2 {
    // Need at least 2 chars to test advance/retreat by 1
    return true
  }
  let vec = @rle.RleVecCached::from_string(text)
  let cursor = vec.cursor()
  // Test various movements
  let mid = len / 2
  let _ = cursor.advance(mid)
  if cursor.position() != mid {
    return false
  }
  let _ = cursor.retreat(1)
  if cursor.position() != mid - 1 {
    return false
  }
  let _ = cursor.seek(0)
  cursor.position() == 0
}

///|
test "property: cursor position is always valid" {
  @qc.quick_check_fn(prop_cursor_position_valid)
}

///|
/// Property: iter_slices covers exactly the requested range
fn prop_iter_slices_coverage(text : String) -> Bool {
  let len = text.iter().count()
  if len < 2 {
    return true
  }
  let vec = @rle.RleVecCached::from_string(text)
  let start = 1
  let end = len - 1
  match vec.iter_slices(start~, end~) {
    Ok(iter) => {
      let slices = iter.collect()
      // Sum of slice lengths should equal end - start
      let total_len = slices.fold(init=0, fn(acc, slice) {
        acc + @rle.HasLength::atom_len(slice.to_inner())
      })
      total_len == end - start
    }
    Err(_) => false
  }
}

///|
test "property: iter_slices covers exactly the requested range" {
  @qc.quick_check_fn(prop_iter_slices_coverage)
}
