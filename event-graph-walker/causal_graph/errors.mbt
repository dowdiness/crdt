///| Causal graph error types

///|
pub(all) suberror CausalGraphError {
  MissingParent(lv~ : Int)
  MissingEntry(lv~ : Int)
} derive(Show)
