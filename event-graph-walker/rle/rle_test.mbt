///| Blackbox tests for Rle (cached prefix sums) public API

///|
test "Rle::new creates empty" {
  let rle : @rle.Rle[String] = @rle.Rle::new()
  inspect(rle.is_empty(), content="true")
  inspect(rle.count(), content="0")
}

///|
test "Rle::from_string creates single run" {
  let rle = @rle.Rle::from_string("hello")
  inspect(rle.count(), content="1")
  inspect(rle.to_string(), content="hello")
}

///|
test "Rle::from_string with empty string" {
  let rle = @rle.Rle::from_string("")
  inspect(rle.is_empty(), content="true")
  inspect(rle.count(), content="0")
}

///|
test "Rle::append merges adjacent runs" {
  let rle : @rle.Rle[String] = @rle.Rle::new()
  let _ = rle.append("hello")
  let _ = rle.append(" world")
  inspect(rle.count(), content="1")
  inspect(rle.to_string(), content="hello world")
}

///|
test "Rle::append rejects empty element" {
  let rle : @rle.Rle[String] = @rle.Rle::new()
  let result = rle.append("")
  inspect(result, content="Err(Internal(EmptyElement))")
}

///|
test "Rle::len returns total atom length (cached)" {
  let rle = @rle.Rle::from_string("hello")
  inspect(rle.len(), content="5")
  // Second call uses cache
  inspect(rle.len(), content="5")
}

///|
test "Rle::content_len returns total content length (cached)" {
  let rle = @rle.Rle::from_string("hello")
  inspect(rle.content_len(), content="5")
}

///|
test "Rle::append invalidates cache" {
  let rle = @rle.Rle::from_string("hello")
  let _ = rle.len() // Build cache
  let _ = rle.append(" world")
  // Cache should be rebuilt
  inspect(rle.len(), content="11")
}

///|
test "Rle::find uses binary search" {
  let rle = @rle.Rle::from_string("abcdef")
  inspect(rle.find(3), content="Some({run: 0, offset: 3})")
}

///|
test "Rle::find at boundaries" {
  let rle = @rle.Rle::from_string("hello")
  inspect(rle.find(0), content="Some({run: 0, offset: 0})")
  inspect(rle.find(4), content="Some({run: 0, offset: 4})")
  inspect(rle.find(5), content="None")
  inspect(rle.find(-1), content="None")
}

///|
test "Rle::range full range" {
  let rle = @rle.Rle::from_string("hello")
  match rle.range(start=0, end=5) {
    Ok(iter) => {
      let slices = iter.collect()
      inspect(slices.length(), content="1")
      inspect(slices[0].to_inner(), content="hello")
    }
    Err(_) => fail("range should succeed")
  }
}

///|
test "Rle::range partial range" {
  let rle = @rle.Rle::from_string("hello")
  match rle.range(start=1, end=4) {
    Ok(iter) => {
      let slices = iter.collect()
      inspect(slices.length(), content="1")
      inspect(slices[0].to_inner(), content="ell")
    }
    Err(_) => fail("range should succeed")
  }
}

///|
test "Rle::range empty range" {
  let rle = @rle.Rle::from_string("hello")
  match rle.range(start=2, end=2) {
    Ok(iter) => {
      let slices = iter.collect()
      inspect(slices.length(), content="0")
    }
    Err(_) => fail("range with start==end should succeed")
  }
}

///|
test "Rle::range out of bounds" {
  let rle = @rle.Rle::from_string("hello")
  let result = rle.range(start=0, end=10)
  inspect(result is Err(_), content="true")
}

///|
test "Rle::range_clamped clamps bounds" {
  let rle = @rle.Rle::from_string("hello")
  let slices = rle.range_clamped(start=-5, end=100).collect()
  inspect(slices.length(), content="1")
  inspect(slices[0].to_inner(), content="hello")
}

///|
test "Rle::split at mid" {
  let rle = @rle.Rle::from_string("hello")
  match rle.split(2) {
    Ok((left, right)) => {
      inspect(left.to_string(), content="he")
      inspect(right.to_string(), content="llo")
    }
    Err(_) => fail("split should succeed")
  }
}

///|
test "Rle::split at boundaries" {
  let rle = @rle.Rle::from_string("hello")
  match rle.split(0) {
    Ok((left, right)) => {
      inspect(left.to_string(), content="")
      inspect(right.to_string(), content="hello")
    }
    Err(_) => fail("split(0) should succeed")
  }
}

///|
test "Rle::split out of bounds" {
  let rle = @rle.Rle::from_string("hello")
  let result = rle.split(10)
  inspect(result is Err(_), content="true")
}

///|
test "Rle::concat merges adjacent" {
  let a = @rle.Rle::from_string("hello")
  let b = @rle.Rle::from_string(" world")
  let result = a.concat(b)
  inspect(result.count(), content="1")
  inspect(result.to_string(), content="hello world")
}

///|
test "Rle::extend merges in-place" {
  let a = @rle.Rle::from_string("hello")
  let b = @rle.Rle::from_string(" world")
  a.extend(b)
  inspect(a.count(), content="1")
  inspect(a.to_string(), content="hello world")
}

///|
test "Rle::clear empties and invalidates cache" {
  let rle = @rle.Rle::from_string("hello")
  let _ = rle.len() // Build cache
  rle.clear()
  inspect(rle.is_empty(), content="true")
  inspect(rle.len(), content="0")
}

///|
test "Rle::get retrieves run by index" {
  let rle = @rle.Rle::from_string("hello")
  inspect(rle.get(0), content="Some(\"hello\")")
  inspect(rle.get(1), content="None")
}

///|
test "Rle::iter_chars iterates codepoints" {
  let rle = @rle.Rle::from_string("hello")
  let chars = rle.iter_chars().collect()
  inspect(chars, content="['h', 'e', 'l', 'l', 'o']")
}

///|
test "Rle::from_array merges and skips empty" {
  let rle = @rle.Rle::from_array(["a", "", "b", "", "c"])
  inspect(rle.count(), content="1")
  inspect(rle.to_string(), content="abc")
}

///|
test "Rle unicode handling" {
  let rle = @rle.Rle::from_string("こんにちは")
  inspect(rle.len(), content="5")
  inspect(rle.find(2), content="Some({run: 0, offset: 2})")
}

///|
test "Rle to_runs and from_runs roundtrip" {
  let rle = @rle.Rle::from_string("hello")
  let runs = rle.to_runs()
  let back = @rle.Rle::from_runs(runs)
  inspect(back.to_string(), content="hello")
}

///|
test "RleError::message for PositionOutOfBounds" {
  let rle = @rle.Rle::from_string("hello")
  match rle.split(10) {
    Ok(_) => fail("should fail")
    Err(e) =>
      inspect(
        e.message(),
        content="Position 10 is outside the document (length: 5)",
      )
  }
}

///|
test "RleError::message for InvalidRange NegativeStart" {
  let rle = @rle.Rle::from_string("hello")
  match rle.range(start=-1, end=3) {
    Ok(_) => fail("should fail")
    Err(e) =>
      inspect(e.message(), content="Range start (-1) cannot be negative")
  }
}

///|
test "RleError::message for InvalidRange StartAfterEnd" {
  let rle = @rle.Rle::from_string("hello")
  match rle.range(start=4, end=2) {
    Ok(_) => fail("should fail")
    Err(e) =>
      inspect(e.message(), content="Range start (4) must come before end (2)")
  }
}

///|
test "RleError::message for InvalidRange ExceedsLength" {
  let rle = @rle.Rle::from_string("hello")
  match rle.range(start=0, end=10) {
    Ok(_) => fail("should fail")
    Err(e) =>
      inspect(e.message(), content="Range end (10) exceeds document length (5)")
  }
}

///|
test "RleError::message for Internal EmptyElement" {
  let rle : @rle.Rle[String] = @rle.Rle::new()
  match rle.append("") {
    Ok(_) => fail("should fail")
    Err(e) =>
      inspect(
        e.message(),
        content="An internal error occurred. Please report this as a bug.",
      )
  }
}
