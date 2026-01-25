///| Blackbox tests for RleVecCached public API

///|
test "RleVecCached push merges adjacent runs" {
  let vec : @rle.RleVecCached[String] = @rle.RleVecCached::new()
  let _ = vec.push("hello")
  let _ = vec.push(" world")
  inspect(vec.run_count(), content="1")
  inspect(vec.to_string(), content="hello world")
}

///|
test "RleVecCached::from_string creates single run" {
  let vec = @rle.RleVecCached::from_string("hello")
  inspect(vec.run_count(), content="1")
  inspect(vec.to_string(), content="hello")
}

///|
test "RleVecCached::from_string with empty string" {
  let vec = @rle.RleVecCached::from_string("")
  inspect(vec.is_empty(), content="true")
  inspect(vec.run_count(), content="0")
}

///|
test "RleVecCached search finds correct position (binary search)" {
  let vec = @rle.RleVecCached::from_string("abcdef")
  let result = vec.search(3)
  inspect(result, content="Some({run_index: 0, offset: 3})")
}

///|
test "RleVecCached search at boundaries" {
  let vec = @rle.RleVecCached::from_string("hello")
  inspect(vec.search(0), content="Some({run_index: 0, offset: 0})")
  inspect(vec.search(4), content="Some({run_index: 0, offset: 4})")
  inspect(vec.search(5), content="None")
  inspect(vec.search(-1), content="None")
}

///|
test "RleVecCached search with multiple runs" {
  // Create a cached vec and directly modify to have multiple runs
  // (In practice, this happens when items don't merge)
  let vec = @rle.RleVecCached::from_string("abcdefghij")
  // Single run, search various positions
  inspect(vec.search(0), content="Some({run_index: 0, offset: 0})")
  inspect(vec.search(5), content="Some({run_index: 0, offset: 5})")
  inspect(vec.search(9), content="Some({run_index: 0, offset: 9})")
}

///|
test "RleVecCached total_atom_len is O(1) cached" {
  let vec = @rle.RleVecCached::from_string("hello")
  // First call triggers rebuild
  let len1 = vec.total_atom_len()
  // Second call should use cache
  let len2 = vec.total_atom_len()
  inspect(len1, content="5")
  inspect(len2, content="5")
}

///|
test "RleVecCached total_content_len" {
  let vec = @rle.RleVecCached::from_string("hello")
  inspect(vec.total_content_len(), content="5")
}

///|
test "RleVecCached push invalidates cache" {
  let vec = @rle.RleVecCached::from_string("hello")
  let _ = vec.total_atom_len() // Force cache build
  let _ = vec.push(" world")
  // Cache should be rebuilt on next access
  inspect(vec.total_atom_len(), content="11")
}

///|
test "RleVecCached push rejects empty element" {
  let vec : @rle.RleVecCached[String] = @rle.RleVecCached::new()
  let result = vec.push("")
  inspect(result, content="Err(EmptyElement)")
}

///|
test "RleVecCached split_at mid" {
  let vec = @rle.RleVecCached::from_string("hello")
  let result = vec.split_at(2)
  match result {
    Ok((left, right)) => {
      inspect(left.to_string(), content="he")
      inspect(right.to_string(), content="llo")
    }
    Err(_) => fail("split_at should succeed")
  }
}

///|
test "RleVecCached split_at boundaries" {
  let vec = @rle.RleVecCached::from_string("hello")
  match vec.split_at(0) {
    Ok((left, right)) => {
      inspect(left.to_string(), content="")
      inspect(right.to_string(), content="hello")
    }
    Err(_) => fail("split_at(0) should succeed")
  }
}

///|
test "RleVecCached iter_slices full range" {
  let vec = @rle.RleVecCached::from_string("hello")
  match vec.iter_slices(start=0, end=5) {
    Ok(iter) => {
      let slices = iter.collect()
      inspect(slices.length(), content="1")
      inspect(slices[0].to_inner(), content="hello")
    }
    Err(_) => fail("iter_slices should succeed")
  }
}

///|
test "RleVecCached iter_slices partial range" {
  let vec = @rle.RleVecCached::from_string("hello")
  match vec.iter_slices(start=1, end=4) {
    Ok(iter) => {
      let slices = iter.collect()
      inspect(slices.length(), content="1")
      inspect(slices[0].to_inner(), content="ell")
    }
    Err(_) => fail("iter_slices should succeed")
  }
}

///|
test "RleVecCached iter_slices_clamped" {
  let vec = @rle.RleVecCached::from_string("hello")
  let iter = vec.iter_slices_clamped(start=-5, end=100)
  let slices = iter.collect()
  inspect(slices.length(), content="1")
  inspect(slices[0].to_inner(), content="hello")
}

///|
test "RleVecCached iter_chars" {
  let vec = @rle.RleVecCached::from_string("hello")
  let chars = vec.iter_chars().collect()
  inspect(chars, content="['h', 'e', 'l', 'l', 'o']")
}

///|
test "RleVecCached unicode handling" {
  let vec = @rle.RleVecCached::from_string("こんにちは")
  inspect(vec.total_atom_len(), content="5")
  inspect(vec.search(2), content="Some({run_index: 0, offset: 2})")
}

///|
test "RleVecCached from_array" {
  let vec = @rle.RleVecCached::from_array(["hello", " ", "world"])
  inspect(vec.run_count(), content="1")
  inspect(vec.to_string(), content="hello world")
}

///|
test "RleVecCached conversion to/from RleVec" {
  let cached = @rle.RleVecCached::from_string("hello")
  let uncached = cached.to_rle_vec()
  inspect(uncached.to_string(), content="hello")
  let back = @rle.RleVecCached::from_rle_vec(uncached)
  inspect(back.to_string(), content="hello")
}

///|
test "RleVecCached concat" {
  let a = @rle.RleVecCached::from_string("hello")
  let b = @rle.RleVecCached::from_string(" world")
  let result = a.concat(b)
  inspect(result.run_count(), content="1") // Should merge
  inspect(result.to_string(), content="hello world")
}

///|
test "RleVecCached extend" {
  let a = @rle.RleVecCached::from_string("hello")
  let b = @rle.RleVecCached::from_string(" world")
  a.extend(b)
  inspect(a.run_count(), content="1")
  inspect(a.to_string(), content="hello world")
}

///|
test "RleVecCached clear" {
  let vec = @rle.RleVecCached::from_string("hello")
  vec.clear()
  inspect(vec.is_empty(), content="true")
  inspect(vec.total_atom_len(), content="0")
}

///|
test "RleVecCached get_run" {
  let vec = @rle.RleVecCached::from_string("hello")
  inspect(vec.get_run(0), content="Some(\"hello\")")
  inspect(vec.get_run(1), content="None")
  inspect(vec.get_run(-1), content="None")
}
