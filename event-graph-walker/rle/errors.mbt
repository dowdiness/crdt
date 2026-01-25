///| RLE error types

///|
pub(all) suberror RleError {
  EmptyElement // Attempted to push element with atom_len == 0
  IndexOutOfBounds(index~ : Int, len~ : Int)
} derive(Show)
