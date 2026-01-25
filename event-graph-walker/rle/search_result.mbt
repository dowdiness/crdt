///|
/// Result of searching for an index in an RleVec
pub(all) struct SearchResult {
  run_index : Int // Index into items array
  offset : Int // Offset within the run
} derive(Show, Eq)
