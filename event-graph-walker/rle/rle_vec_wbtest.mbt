///| Whitebox tests for RleVec internal invariants

///|
test "invariant: no zero-length runs after push" {
  let vec : RleVec[String] = RleVec::new()
  let _ = vec.push("a")
  let _ = vec.push("b")
  let _ = vec.push("c")
  for item in vec.items {
    inspect(HasLength::atom_len(item) > 0, content="true")
  }
}

///|
test "invariant: no adjacent mergeable runs" {
  let vec : RleVec[String] = RleVec::new()
  let _ = vec.push("hello")
  let _ = vec.push(" ")
  let _ = vec.push("world")
  // String always merges, so should be single run
  inspect(vec.items.length(), content="1")
}

///|
test "normalize_last cascades properly" {
  let vec : RleVec[String] = RleVec::new()
  // Push multiple items - they should all cascade merge
  let _ = vec.push("a")
  let _ = vec.push("b")
  let _ = vec.push("c")
  let _ = vec.push("d")
  inspect(vec.items.length(), content="1")
  inspect(vec.items[0], content="abcd")
}

///|
test "items array direct access" {
  let vec = RleVec::from_string("test")
  inspect(vec.items.length(), content="1")
  inspect(vec.items[0], content="test")
}

///|
test "split_at preserves invariants" {
  let vec = RleVec::from_string("hello world")
  let result = vec.split_at(5)
  match result {
    Ok((left, right)) => {
      // Both halves should maintain invariants
      for item in left.items {
        inspect(HasLength::atom_len(item) > 0, content="true")
      }
      for item in right.items {
        inspect(HasLength::atom_len(item) > 0, content="true")
      }
    }
    Err(_) => fail("split_at should succeed")
  }
}

///|
test "iter_slices internal slice bounds" {
  let vec = RleVec::from_string("abcdefgh")
  match vec.iter_slices(start=2, end=6) {
    Ok(iter) =>
      for slice in iter {
        // slice.start and slice.end should be valid
        inspect(slice.start >= 0, content="true")
        inspect(slice.end > slice.start, content="true")
      }
    Err(_) => fail("iter_slices should succeed")
  }
}
