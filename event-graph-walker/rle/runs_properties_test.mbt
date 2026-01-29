///| Property-based tests for Runs and Rle

///|
/// Property: Mergeable associativity - merge(merge(a, b), c) == merge(a, merge(b, c))
fn prop_merge_associative(triple : (String, String, String)) -> Bool {
  let (a, b, c) = triple
  let left = @rle.Mergeable::merge(@rle.Mergeable::merge(a, b), c)
  let right = @rle.Mergeable::merge(a, @rle.Mergeable::merge(b, c))
  left == right
}

///|
test "property: merge is associative" {
  @qc.quick_check_fn(prop_merge_associative)
}

///|
/// Property: Slice/merge round-trip - merge(slice(x, end=k), slice(x, start=k)) == x
fn prop_slice_merge_roundtrip(text : String) -> Bool {
  let len = @rle.HasCausalLength::causal_len(text)
  if len == 0 {
    return true
  }
  let k = len / 2
  let left = @rle.Sliceable::slice(text, start=0, end=k)
  let right = @rle.Sliceable::slice(text, start=k, end=len)
  @rle.Mergeable::merge(left, right) == text
}

///|
test "property: slice/merge round-trip" {
  @qc.quick_check_fn(prop_slice_merge_roundtrip)
}

///|
/// Property: causal_len is non-negative
fn prop_causal_len_non_negative(text : String) -> Bool {
  @rle.HasCausalLength::causal_len(text) >= 0
}

///|
test "property: causal_len is non-negative" {
  @qc.quick_check_fn(prop_causal_len_non_negative)
}

///|
/// Property: visible_len <= causal_len
fn prop_visible_len_bounded(text : String) -> Bool {
  @rle.HasCausalLength::visible_len(text) <=
  @rle.HasCausalLength::causal_len(text)
}

///|
test "property: visible_len <= causal_len" {
  @qc.quick_check_fn(prop_visible_len_bounded)
}

///|
/// Property: full slice equals original
fn prop_full_slice_identity(text : String) -> Bool {
  let len = @rle.HasCausalLength::causal_len(text)
  @rle.Sliceable::slice(text, start=0, end=len) == text
}

///|
test "property: full slice equals original" {
  @qc.quick_check_fn(prop_full_slice_identity)
}

///|
/// Property: Runs len equals sum of pushed items
fn prop_runs_len_preserved(texts : Array[String]) -> Bool {
  let expected = texts.fold(init=0, fn(acc, s) {
    let len = @rle.HasCausalLength::causal_len(s)
    if len > 0 {
      acc + len
    } else {
      acc
    }
  })
  let runs = @rle.Runs::from_array(texts)
  runs.len() == expected
}

///|
test "property: Runs len preserved" {
  @qc.quick_check_fn(prop_runs_len_preserved)
}

///|
/// Property: split preserves total length
fn prop_split_preserves_len(text : String) -> Bool {
  let runs = @rle.Runs::from_string(text)
  let total = runs.len()
  if total == 0 {
    return true
  }
  let k = total / 2
  match runs.split(k) {
    Ok((left, right)) => left.len() + right.len() == total
    Err(_) => false
  }
}

///|
test "property: split preserves total length" {
  @qc.quick_check_fn(prop_split_preserves_len)
}

///|
/// Property: Rle find matches Runs find
fn prop_rle_find_matches_runs(text : String) -> Bool {
  let len = text.iter().count()
  if len == 0 {
    return true
  }
  let rle = @rle.Rle::from_string(text)
  let runs = @rle.Runs::from_string(text)
  for i = 0; i < len; i = i + 1 {
    if rle.find(i) != runs.find(i) {
      return false
    }
  }
  rle.find(len) == runs.find(len) && rle.find(-1) == runs.find(-1)
}

///|
test "property: Rle find matches Runs find" {
  @qc.quick_check_fn(prop_rle_find_matches_runs)
}

///|
/// Property: concat is associative
fn prop_concat_associative(triple : (String, String, String)) -> Bool {
  let (a, b, c) = triple
  let ra = @rle.Rle::from_string(a)
  let rb = @rle.Rle::from_string(b)
  let rc = @rle.Rle::from_string(c)
  let left = ra.concat(rb).concat(rc)
  let ra2 = @rle.Rle::from_string(a)
  let rb2 = @rle.Rle::from_string(b)
  let rc2 = @rle.Rle::from_string(c)
  let right = ra2.concat(rb2.concat(rc2))
  left.to_string() == right.to_string()
}

///|
test "property: concat is associative" {
  @qc.quick_check_fn(prop_concat_associative)
}

///|
/// Property: split and concat are inverses
fn prop_split_concat_roundtrip(text : String) -> Bool {
  let len = text.iter().count()
  if len == 0 {
    return true
  }
  let rle = @rle.Rle::from_string(text)
  let mid = len / 2
  match rle.split(mid) {
    Ok((left, right)) => left.concat(right).to_string() == text
    Err(_) => false
  }
}

///|
test "property: split and concat are inverses" {
  @qc.quick_check_fn(prop_split_concat_roundtrip)
}

///|
/// Property: No adjacent mergeable runs after append
fn prop_no_adjacent_mergeable(strings : Array[String]) -> Bool {
  let runs : @rle.Runs[String] = @rle.Runs::new()
  for s in strings {
    if s.iter().count() > 0 {
      let _ = runs.append(s)

    }
  }
  let items = runs.to_array()
  for i = 0; i < items.length() - 1; i = i + 1 {
    if @rle.Mergeable::can_merge(items[i], items[i + 1]) {
      return false
    }
  }
  true
}

///|
test "property: no adjacent mergeable runs" {
  @qc.quick_check_fn(prop_no_adjacent_mergeable)
}

///|
/// Property: range covers exactly the requested range
fn prop_range_coverage(text : String) -> Bool {
  let len = text.iter().count()
  if len < 2 {
    return true
  }
  let rle = @rle.Rle::from_string(text)
  let start = 1
  let end = len - 1
  match rle.range(start~, end~) {
    Ok(iter) => {
      let slices = iter.collect()
      let total_len = slices.fold(init=0, fn(acc, slice) {
        acc + @rle.HasCausalLength::causal_len(slice.to_inner())
      })
      total_len == end - start
    }
    Err(_) => false
  }
}

///|
test "property: range covers exactly the requested range" {
  @qc.quick_check_fn(prop_range_coverage)
}

///|
/// Property: extend produces same result as concat
fn prop_extend_equals_concat(pair : (Array[String], Array[String])) -> Bool {
  let (a, b) = pair
  let runs_a = @rle.Runs::from_array(a)
  let runs_b = @rle.Runs::from_array(b)
  let concatenated = runs_a.concat(runs_b)
  let runs_a2 = @rle.Runs::from_array(a)
  let runs_b2 = @rle.Runs::from_array(b)
  runs_a2.extend(runs_b2)
  runs_a2.to_array() == concatenated.to_array()
}

///|
test "property: extend equals concat" {
  @qc.quick_check_fn(prop_extend_equals_concat)
}

///|
/// Property: concat preserves total length
fn prop_concat_preserves_len(pair : (Array[String], Array[String])) -> Bool {
  let (a, b) = pair
  let runs_a = @rle.Runs::from_array(a)
  let runs_b = @rle.Runs::from_array(b)
  let len_a = runs_a.len()
  let len_b = runs_b.len()
  let concatenated = runs_a.concat(runs_b)
  concatenated.len() == len_a + len_b
}

///|
test "property: concat preserves total length" {
  @qc.quick_check_fn(prop_concat_preserves_len)
}
