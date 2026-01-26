///|
/// Position within runs - result of find operations
pub(all) struct RunPos {
  run : Int // which run (0-indexed)
  offset : Int // offset within that run
} derive(Show, Eq)
