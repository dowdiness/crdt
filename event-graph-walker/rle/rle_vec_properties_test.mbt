///| Property-based tests for RleVec using QuickCheck

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
  let len = @rle.HasLength::atom_len(text)
  if len == 0 {
    return true // Skip empty strings
  }
  // Test at midpoint
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
/// Property: atom_len is non-negative
fn prop_atom_len_non_negative(text : String) -> Bool {
  @rle.HasLength::atom_len(text) >= 0
}

///|
test "property: atom_len is non-negative" {
  @qc.quick_check_fn(prop_atom_len_non_negative)
}

///|
/// Property: content_len <= atom_len
fn prop_content_len_bounded(text : String) -> Bool {
  @rle.HasLength::content_len(text) <= @rle.HasLength::atom_len(text)
}

///|
test "property: content_len <= atom_len" {
  @qc.quick_check_fn(prop_content_len_bounded)
}

///|
/// Property: full slice equals original
fn prop_full_slice_identity(text : String) -> Bool {
  let len = @rle.HasLength::atom_len(text)
  @rle.Sliceable::slice(text, start=0, end=len) == text
}

///|
test "property: full slice equals original" {
  @qc.quick_check_fn(prop_full_slice_identity)
}

///|
/// Property: RleVec total_atom_len equals sum of pushed items
fn prop_rlevec_total_len_preserved(texts : Array[String]) -> Bool {
  let expected_len = texts.fold(init=0, fn(acc, s) {
    let len = @rle.HasLength::atom_len(s)
    if len > 0 {
      acc + len
    } else {
      acc
    }
  })
  let vec = @rle.RleVec::from_array(texts)
  vec.total_atom_len() == expected_len
}

///|
test "property: RleVec total_atom_len preserved" {
  @qc.quick_check_fn(prop_rlevec_total_len_preserved)
}

///|
/// Property: split_at preserves total length
fn prop_split_preserves_len(text : String) -> Bool {
  let vec = @rle.RleVec::from_string(text)
  let total = vec.total_atom_len()
  if total == 0 {
    return true
  }
  // Split at midpoint
  let k = total / 2
  match vec.split_at(k) {
    Ok((left, right)) => left.total_atom_len() + right.total_atom_len() == total
    Err(_) => false
  }
}

///|
test "property: split_at preserves total length" {
  @qc.quick_check_fn(prop_split_preserves_len)
}
