///| Blackbox tests for RleVec public API

///|
test "push merges adjacent runs" {
  let vec : @rle.RleVec[String] = @rle.RleVec::new()
  let _ = vec.push("hello")
  let _ = vec.push(" world")
  inspect(vec.run_count(), content="1")
  inspect(vec.to_string(), content="hello world")
}

///|
test "RleVec::from_string creates single run" {
  let vec = @rle.RleVec::from_string("hello")
  inspect(vec.run_count(), content="1")
  inspect(vec.to_string(), content="hello")
}

///|
test "RleVec::from_string with empty string" {
  let vec = @rle.RleVec::from_string("")
  inspect(vec.is_empty(), content="true")
  inspect(vec.run_count(), content="0")
}

///|
test "search finds correct position" {
  let vec = @rle.RleVec::from_string("abcdef")
  let result = vec.search(3)
  inspect(result, content="Some({run_index: 0, offset: 3})")
}

///|
test "search at start" {
  let vec = @rle.RleVec::from_string("hello")
  inspect(vec.search(0), content="Some({run_index: 0, offset: 0})")
}

///|
test "search at end - 1" {
  let vec = @rle.RleVec::from_string("hello")
  inspect(vec.search(4), content="Some({run_index: 0, offset: 4})")
}

///|
test "search out of bounds returns None" {
  let vec = @rle.RleVec::from_string("hello")
  inspect(vec.search(5), content="None")
  inspect(vec.search(10), content="None")
  inspect(vec.search(-1), content="None")
}

///|
test "total_atom_len" {
  let vec = @rle.RleVec::from_string("hello")
  inspect(vec.total_atom_len(), content="5")
}

///|
test "total_content_len" {
  let vec = @rle.RleVec::from_string("hello")
  inspect(vec.total_content_len(), content="5")
}

///|
test "push rejects empty element" {
  let vec : @rle.RleVec[String] = @rle.RleVec::new()
  let result = vec.push("")
  inspect(result, content="Err(EmptyElement)")
}

///|
test "split_at mid" {
  let vec = @rle.RleVec::from_string("hello")
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
test "split_at start" {
  let vec = @rle.RleVec::from_string("hello")
  let result = vec.split_at(0)
  match result {
    Ok((left, right)) => {
      inspect(left.to_string(), content="")
      inspect(right.to_string(), content="hello")
    }
    Err(_) => fail("split_at(0) should succeed")
  }
}

///|
test "split_at end" {
  let vec = @rle.RleVec::from_string("hello")
  let result = vec.split_at(5)
  match result {
    Ok((left, right)) => {
      inspect(left.to_string(), content="hello")
      inspect(right.to_string(), content="")
    }
    Err(_) => fail("split_at(total) should succeed")
  }
}

///|
test "split_at out of bounds" {
  let vec = @rle.RleVec::from_string("hello")
  let result = vec.split_at(10)
  inspect(result is Err(_), content="true")
}

///|
test "iter_slices full range" {
  let vec = @rle.RleVec::from_string("hello")
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
test "iter_slices partial range" {
  let vec = @rle.RleVec::from_string("hello")
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
test "iter_slices empty range" {
  let vec = @rle.RleVec::from_string("hello")
  match vec.iter_slices(start=2, end=2) {
    Ok(iter) => {
      let slices = iter.collect()
      inspect(slices.length(), content="0")
    }
    Err(_) => fail("iter_slices with start==end should succeed")
  }
}

///|
test "iter_slices out of bounds" {
  let vec = @rle.RleVec::from_string("hello")
  let result = vec.iter_slices(start=0, end=10)
  inspect(result is Err(_), content="true")
}

///|
test "iter_slices_clamped clamps bounds" {
  let vec = @rle.RleVec::from_string("hello")
  let iter = vec.iter_slices_clamped(start=-5, end=100)
  let slices = iter.collect()
  inspect(slices.length(), content="1")
  inspect(slices[0].to_inner(), content="hello")
}

///|
test "iter_chars" {
  let vec = @rle.RleVec::from_string("hello")
  let chars = vec.iter_chars().collect()
  inspect(chars, content="['h', 'e', 'l', 'l', 'o']")
}

///|
test "slice/merge coherence" {
  let text = "hello"
  let left = @rle.Sliceable::slice(text, start=0, end=2)
  let right = @rle.Sliceable::slice(text, start=2, end=5)
  inspect(@rle.Mergeable::merge(left, right) == text, content="true")
}

///|
test "unicode codepoint handling" {
  let vec = @rle.RleVec::from_string("こんにちは")
  inspect(vec.total_atom_len(), content="5")
  inspect(vec.search(2), content="Some({run_index: 0, offset: 2})")
}

///|
test "unicode split" {
  let vec = @rle.RleVec::from_string("日本語")
  let result = vec.split_at(1)
  match result {
    Ok((left, right)) => {
      inspect(left.to_string(), content="日")
      inspect(right.to_string(), content="本語")
    }
    Err(_) => fail("split should work with unicode")
  }
}

///|
test "RleVec::from_array" {
  let vec = @rle.RleVec::from_array(["hello", " ", "world"])
  inspect(vec.run_count(), content="1") // All merged
  inspect(vec.to_string(), content="hello world")
}

///|
test "RleVec::from_array skips empty strings" {
  let vec = @rle.RleVec::from_array(["a", "", "b", "", "c"])
  inspect(vec.run_count(), content="1") // All merged after skipping empty
  inspect(vec.to_string(), content="abc")
}
