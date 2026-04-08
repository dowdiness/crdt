///|
fn Array::sum(self : Array[Int]) -> Int {
  self.iter().fold(init=0, fn(acc, x) { acc + x })
}

///|
pub fn[T] BTreeNode::total(self : BTreeNode[T]) -> Int {
  match self {
    Leaf(span~, ..) => span
    Internal(total~, ..) => total
  }
}

///|
fn[T] BTreeNode::is_full(self : BTreeNode[T], min_degree : Int) -> Bool {
  match self {
    Leaf(..) => false
    Internal(children~, ..) => children.length() >= 2 * min_degree
  }
}

///|
/// Slice positions are computed by the library — failure is an invariant violation.
fn[T : BTreeElem] must_slice(elem : T, start~ : Int, end~ : Int) -> T {
  @rle.Sliceable::slice(elem, start~, end~).unwrap()
}

///|
fn[R] ArrayView::find_by_sum(
  self : ArrayView[Int],
  pos : Int,
  f : (Int, Int) -> R?,
) -> R? {
  for view = self, remaining = pos, i = 0 {
    match (view, remaining, i) {
      ([], _, _) => break None
      ([count, ..], remaining, i) if remaining < count => break f(i, remaining)
      ([count, .. rest], remaining, i) =>
        continue rest, remaining - count, i + 1
    }
  }
}

///|
fn[R] ArrayView::find_by_sum_inclusive(
  self : ArrayView[Int],
  pos : Int,
  f : (Int, Int) -> R?,
) -> R? {
  for view = self, remaining = pos, i = 0 {
    match (view, remaining, i) {
      ([], _, _) => break None
      ([count, ..], remaining, i) if remaining <= count => break f(i, remaining)
      ([count, .. rest], remaining, i) =>
        continue rest, remaining - count, i + 1
    }
  }
}
