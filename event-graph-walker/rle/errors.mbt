///| RLE error types

///|
/// Internal invariant violations - indicates bugs, not user errors
pub(all) suberror InternalError {
  EmptyElement // Attempted to add element with causal_len == 0
  InvalidState(detail~ : String)
} derive(Show)

///|
/// Why a range is invalid
pub enum RangeIssue {
  NegativeStart
  NegativeEnd
  StartAfterEnd
  ExceedsLength
} derive(Show, Eq)

///|
/// User-facing errors with context for friendly messages
pub(all) suberror RleError {
  PositionOutOfBounds(position~ : Int, length~ : Int)
  InvalidRange(start~ : Int, end~ : Int, length~ : Int, reason~ : RangeIssue)
  Internal(InternalError)
} derive(Show)

///|
/// Rust style wrapper struct for user-friendly error display
///
/// https://doc.rust-lang.org/stable/std/path/struct.Display.html
pub struct ErrorMessage {
  priv error : RleError
}

///|
/// Get a user-friendly message wrapper for this error
pub fn RleError::message(self : RleError) -> ErrorMessage {
  { error: self }
}

///|
/// Display user-friendly error message
pub impl Show for ErrorMessage with output(self, logger) {
  match self.error {
    PositionOutOfBounds(position~, length~) =>
      logger.write_string(
        "Position \{position} is outside the document (length: \{length})",
      )
    InvalidRange(start~, end~, length~, reason~) =>
      match reason {
        NegativeStart =>
          logger.write_string("Range start (\{start}) cannot be negative")
        NegativeEnd =>
          logger.write_string("Range end (\{end}) cannot be negative")
        StartAfterEnd =>
          logger.write_string(
            "Range start (\{start}) must come before end (\{end})",
          )
        ExceedsLength =>
          logger.write_string(
            "Range end (\{end}) exceeds document length (\{length})",
          )
      }
    Internal(_) =>
      logger.write_string(
        "An internal error occurred. Please report this as a bug.",
      )
  }
}
