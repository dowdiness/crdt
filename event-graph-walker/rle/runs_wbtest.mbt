///| Whitebox tests for Runs internal invariants

///|
test "invariant: no zero-length runs after append" {
  let runs : Runs[String] = Runs::new()
  let _ = runs.append("a")
  let _ = runs.append("b")
  let _ = runs.append("c")
  for item in runs.0 {
    inspect(HasLength::atom_len(item) > 0, content="true")
  }
}

///|
test "invariant: no adjacent mergeable runs" {
  let runs : Runs[String] = Runs::new()
  let _ = runs.append("hello")
  let _ = runs.append(" ")
  let _ = runs.append("world")
  // String always merges, so should be single run
  inspect(runs.0.length(), content="1")
}

///|
test "normalize_tail cascades properly" {
  let runs : Runs[String] = Runs::new()
  let _ = runs.append("a")
  let _ = runs.append("b")
  let _ = runs.append("c")
  let _ = runs.append("d")
  inspect(runs.0.length(), content="1")
  inspect(runs.0[0], content="abcd")
}

///|
test "items array direct access" {
  let runs = Runs::from_string("test")
  inspect(runs.0.length(), content="1")
  inspect(runs.0[0], content="test")
}

///|
test "split preserves invariants" {
  let runs = Runs::from_string("hello world")
  let result = runs.split(5)
  match result {
    Ok((left, right)) => {
      for item in left.0 {
        inspect(HasLength::atom_len(item) > 0, content="true")
      }
      for item in right.0 {
        inspect(HasLength::atom_len(item) > 0, content="true")
      }
    }
    Err(_) => fail("split should succeed")
  }
}

///|
test "range internal slice bounds" {
  let runs = Runs::from_string("abcdefgh")
  match runs.range(start=2, end=6) {
    Ok(iter) =>
      for slice in iter {
        inspect(slice.start >= 0, content="true")
        inspect(slice.end > slice.start, content="true")
      }
    Err(_) => fail("range should succeed")
  }
}

///|
test "prefix_sums internal structure" {
  let runs : Runs[String] = Runs::new()
  let _ = runs.append("abc")
  // Since strings always merge, still one run
  let sums = runs.prefix_sums()
  inspect(sums.atoms.length(), content="1")
  inspect(sums.atoms[0], content="3")
  inspect(sums.content[0], content="3")
}

///|
test "Rle cache invalidation" {
  let rle : Rle[String] = Rle::new()
  let _ = rle.append("hello")
  // Access to trigger cache build
  let _ = rle.len()
  inspect(rle.prefix is Some(_), content="true")
  // Mutation should invalidate
  let _ = rle.append(" world")
  inspect(rle.prefix is None, content="true")
  // Access rebuilds
  let _ = rle.len()
  inspect(rle.prefix is Some(_), content="true")
}

///|
test "Rle clear invalidates cache" {
  let rle = Rle::from_string("hello")
  let _ = rle.len()
  inspect(rle.prefix is Some(_), content="true")
  rle.clear()
  inspect(rle.prefix is None, content="true")
}

///|
test "Rle extend invalidates cache" {
  let a = Rle::from_string("hello")
  let b = Rle::from_string(" world")
  let _ = a.len()
  inspect(a.prefix is Some(_), content="true")
  a.extend(b)
  inspect(a.prefix is None, content="true")
}
