///| Blackbox tests for Runs public API

///|
test "Runs::new creates empty" {
  let runs : @rle.Runs[String] = @rle.Runs::new()
  inspect(runs.is_empty(), content="true")
  inspect(runs.count(), content="0")
}

///|
test "Runs::from_string creates single run" {
  let runs = @rle.Runs::from_string("hello")
  inspect(runs.count(), content="1")
  inspect(runs.to_string(), content="hello")
}

///|
test "Runs::from_string with empty string" {
  let runs = @rle.Runs::from_string("")
  inspect(runs.is_empty(), content="true")
  inspect(runs.count(), content="0")
}

///|
test "Runs::append merges adjacent runs" {
  let runs : @rle.Runs[String] = @rle.Runs::new()
  let _ = runs.append("hello")
  let _ = runs.append(" world")
  inspect(runs.count(), content="1")
  inspect(runs.to_string(), content="hello world")
}

///|
test "Runs::append rejects empty element" {
  let runs : @rle.Runs[String] = @rle.Runs::new()
  let result = runs.append("")
  inspect(result, content="Err(EmptyElement)")
}

///|
test "Runs::len returns total atom length" {
  let runs = @rle.Runs::from_string("hello")
  inspect(runs.len(), content="5")
}

///|
test "Runs::content_len returns total content length" {
  let runs = @rle.Runs::from_string("hello")
  inspect(runs.content_len(), content="5")
}

///|
test "Runs::find finds correct position" {
  let runs = @rle.Runs::from_string("abcdef")
  inspect(runs.find(3), content="Some({run: 0, offset: 3})")
}

///|
test "Runs::find at boundaries" {
  let runs = @rle.Runs::from_string("hello")
  inspect(runs.find(0), content="Some({run: 0, offset: 0})")
  inspect(runs.find(4), content="Some({run: 0, offset: 4})")
  inspect(runs.find(5), content="None")
  inspect(runs.find(-1), content="None")
}

///|
test "Runs::range full range" {
  let runs = @rle.Runs::from_string("hello")
  match runs.range(start=0, end=5) {
    Ok(iter) => {
      let slices = iter.collect()
      inspect(slices.length(), content="1")
      inspect(slices[0].to_inner(), content="hello")
    }
    Err(_) => fail("range should succeed")
  }
}

///|
test "Runs::range partial range" {
  let runs = @rle.Runs::from_string("hello")
  match runs.range(start=1, end=4) {
    Ok(iter) => {
      let slices = iter.collect()
      inspect(slices.length(), content="1")
      inspect(slices[0].to_inner(), content="ell")
    }
    Err(_) => fail("range should succeed")
  }
}

///|
test "Runs::range empty range" {
  let runs = @rle.Runs::from_string("hello")
  match runs.range(start=2, end=2) {
    Ok(iter) => {
      let slices = iter.collect()
      inspect(slices.length(), content="0")
    }
    Err(_) => fail("range with start==end should succeed")
  }
}

///|
test "Runs::range out of bounds" {
  let runs = @rle.Runs::from_string("hello")
  let result = runs.range(start=0, end=10)
  inspect(result is Err(_), content="true")
}

///|
test "Runs::range_clamped clamps bounds" {
  let runs = @rle.Runs::from_string("hello")
  let slices = runs.range_clamped(start=-5, end=100).collect()
  inspect(slices.length(), content="1")
  inspect(slices[0].to_inner(), content="hello")
}

///|
test "Runs::split at mid" {
  let runs = @rle.Runs::from_string("hello")
  match runs.split(2) {
    Ok((left, right)) => {
      inspect(left.to_string(), content="he")
      inspect(right.to_string(), content="llo")
    }
    Err(_) => fail("split should succeed")
  }
}

///|
test "Runs::split at start" {
  let runs = @rle.Runs::from_string("hello")
  match runs.split(0) {
    Ok((left, right)) => {
      inspect(left.to_string(), content="")
      inspect(right.to_string(), content="hello")
    }
    Err(_) => fail("split(0) should succeed")
  }
}

///|
test "Runs::split at end" {
  let runs = @rle.Runs::from_string("hello")
  match runs.split(5) {
    Ok((left, right)) => {
      inspect(left.to_string(), content="hello")
      inspect(right.to_string(), content="")
    }
    Err(_) => fail("split(total) should succeed")
  }
}

///|
test "Runs::split out of bounds" {
  let runs = @rle.Runs::from_string("hello")
  let result = runs.split(10)
  inspect(result is Err(_), content="true")
}

///|
test "Runs::concat merges adjacent" {
  let a = @rle.Runs::from_string("hello")
  let b = @rle.Runs::from_string(" world")
  let result = a.concat(b)
  inspect(result.count(), content="1")
  inspect(result.to_string(), content="hello world")
}

///|
test "Runs::extend merges in-place" {
  let a = @rle.Runs::from_string("hello")
  let b = @rle.Runs::from_string(" world")
  a.extend(b)
  inspect(a.count(), content="1")
  inspect(a.to_string(), content="hello world")
}

///|
test "Runs::clear empties the runs" {
  let runs = @rle.Runs::from_string("hello")
  runs.clear()
  inspect(runs.is_empty(), content="true")
  inspect(runs.len(), content="0")
}

///|
test "Runs::get retrieves run by index" {
  let runs = @rle.Runs::from_string("hello")
  inspect(runs.get(0), content="Some(\"hello\")")
  inspect(runs.get(1), content="None")
  inspect(runs.get(-1), content="None")
}

///|
test "Runs::iter_chars iterates codepoints" {
  let runs = @rle.Runs::from_string("hello")
  let chars = runs.iter_chars().collect()
  inspect(chars, content="['h', 'e', 'l', 'l', 'o']")
}

///|
test "Runs::from_array merges and skips empty" {
  let runs = @rle.Runs::from_array(["a", "", "b", "", "c"])
  inspect(runs.count(), content="1")
  inspect(runs.to_string(), content="abc")
}

///|
test "Runs unicode handling" {
  let runs = @rle.Runs::from_string("こんにちは")
  inspect(runs.len(), content="5")
  inspect(runs.find(2), content="Some({run: 0, offset: 2})")
}

///|
test "Runs unicode split" {
  let runs = @rle.Runs::from_string("日本語")
  match runs.split(1) {
    Ok((left, right)) => {
      inspect(left.to_string(), content="日")
      inspect(right.to_string(), content="本語")
    }
    Err(_) => fail("split should work with unicode")
  }
}

///|
test "Runs::prefix_sums builds correct sums" {
  let runs = @rle.Runs::from_string("hello")
  let sums = runs.prefix_sums()
  inspect(sums.atoms, content="[5]")
  inspect(sums.content, content="[5]")
}

///|
test "Runs::find_fast matches find" {
  let runs = @rle.Runs::from_string("hello world")
  let sums = runs.prefix_sums()
  for i = 0; i < 11; i = i + 1 {
    let slow = runs.find(i)
    let fast = runs.find_fast(sums, i)
    inspect(slow == fast, content="true")
  }
}
