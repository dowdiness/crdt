// Tests for Range

///|
test "Range::new creates range" {
  let range = Range::new(5, 10)
  inspect(range.start, content="5")
  inspect(range.end, content="10")
}

///|
test "Range::contains" {
  let range = Range::new(5, 10)
  inspect(range.contains(4), content="false")
  inspect(range.contains(5), content="true")
  inspect(range.contains(7), content="true")
  inspect(range.contains(9), content="true")
  inspect(range.contains(10), content="false")
}

///|
test "Range::overlaps" {
  let range1 = Range::new(5, 10)
  let range2 = Range::new(8, 15)
  let range3 = Range::new(12, 20)
  inspect(range1.overlaps(range2), content="true")
  inspect(range1.overlaps(range3), content="false")
  inspect(range2.overlaps(range3), content="true")
}

///|
test "Range::merge" {
  let range1 = Range::new(5, 10)
  let range2 = Range::new(8, 15)
  let merged = range1.merge(range2)
  inspect(merged.start, content="5")
  inspect(merged.end, content="15")
}

///|
test "Range::length" {
  let range = Range::new(5, 15)
  inspect(range.length(), content="10")
}
