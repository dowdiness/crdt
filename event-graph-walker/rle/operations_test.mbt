///| Tests for concat, extend, and utility operations

///|
test "RleVec concat" {
  let a = @rle.RleVec::from_string("hello")
  let b = @rle.RleVec::from_string(" world")
  let result = a.concat(b)
  inspect(result.run_count(), content="1") // Should merge
  inspect(result.to_string(), content="hello world")
}

///|
test "RleVec concat preserves original" {
  let a = @rle.RleVec::from_string("hello")
  let b = @rle.RleVec::from_string(" world")
  let _ = a.concat(b)
  // Original should be unchanged
  inspect(a.to_string(), content="hello")
  inspect(b.to_string(), content=" world")
}

///|
test "RleVec concat empty left" {
  let a : @rle.RleVec[String] = @rle.RleVec::new()
  let b = @rle.RleVec::from_string("hello")
  let result = a.concat(b)
  inspect(result.to_string(), content="hello")
}

///|
test "RleVec concat empty right" {
  let a = @rle.RleVec::from_string("hello")
  let b : @rle.RleVec[String] = @rle.RleVec::new()
  let result = a.concat(b)
  inspect(result.to_string(), content="hello")
}

///|
test "RleVec concat both empty" {
  let a : @rle.RleVec[String] = @rle.RleVec::new()
  let b : @rle.RleVec[String] = @rle.RleVec::new()
  let result = a.concat(b)
  inspect(result.is_empty(), content="true")
}

///|
test "RleVec extend" {
  let a = @rle.RleVec::from_string("hello")
  let b = @rle.RleVec::from_string(" world")
  a.extend(b)
  inspect(a.run_count(), content="1")
  inspect(a.to_string(), content="hello world")
}

///|
test "RleVec extend with empty" {
  let a = @rle.RleVec::from_string("hello")
  let b : @rle.RleVec[String] = @rle.RleVec::new()
  a.extend(b)
  inspect(a.to_string(), content="hello")
}

///|
test "RleVec clear" {
  let vec = @rle.RleVec::from_string("hello")
  vec.clear()
  inspect(vec.is_empty(), content="true")
  inspect(vec.total_atom_len(), content="0")
}

///|
test "RleVec get_run" {
  let vec = @rle.RleVec::from_string("hello")
  inspect(vec.get_run(0), content="Some(\"hello\")")
  inspect(vec.get_run(1), content="None")
  inspect(vec.get_run(-1), content="None")
}

///|
test "RleVec items" {
  let vec = @rle.RleVec::from_string("hello")
  let items = vec.items()
  inspect(items.length(), content="1")
  inspect(items[0], content="hello")
}
