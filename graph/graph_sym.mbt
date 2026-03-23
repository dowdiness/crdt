///|
/// Finally Tagless trait for algebraic graph construction.
/// This is the "construction" layer — dual to DirectedGraph which is the "observation" layer.
pub(open) trait GraphSym {
  empty() -> Self
  vertex(Int) -> Self
  overlay(Self, Self) -> Self
  connect(Self, Self) -> Self
}

///|
pub impl GraphSym for AdjacencyMap with empty() {
  AdjacencyMap::empty()
}

///|
pub impl GraphSym for AdjacencyMap with vertex(v) {
  AdjacencyMap::vertex(v)
}

///|
pub impl GraphSym for AdjacencyMap with overlay(a, b) {
  a.overlay(b)
}

///|
pub impl GraphSym for AdjacencyMap with connect(a, b) {
  a.connect(b)
}
