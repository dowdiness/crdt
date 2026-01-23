///| User-friendly error types with diagnostics

///|
/// Sync failure reasons
pub(all) enum SyncFailure {
  MissingDependency(hint~ : String)
  MalformedMessage(detail~ : String)
} derive(Show)

///|
/// User-facing error type for the text facade
pub(all) suberror TextError {
  InvalidPosition(pos~ : Int, len~ : Int)
  SyncFailed(SyncFailure)
  VersionNotFound
  Internal(detail~ : String)
}

///|
/// User-facing short message
pub fn TextError::message(self : TextError) -> String {
  match self {
    InvalidPosition(pos~, len~) =>
      "Invalid position: \{pos} is out of bounds for text of length \{len}"
    SyncFailed(MissingDependency(hint~)) =>
      "Sync failed: missing dependency - \{hint}"
    SyncFailed(MalformedMessage(detail~)) =>
      "Sync failed: malformed message - \{detail}"
    VersionNotFound => "Version not found in document history"
    Internal(detail~) => "Internal error: \{detail}"
  }
}

///|
/// Actionable guidance for the user
pub fn TextError::help(self : TextError) -> String {
  match self {
    InvalidPosition(pos=_, len~) =>
      "Use a position between 0 and \{len} (inclusive for insert, exclusive for delete)"
    SyncFailed(MissingDependency(_)) =>
      "Sync more operations from the peer and retry"
    SyncFailed(MalformedMessage(_)) =>
      "Discard this message and consider isolating the peer"
    VersionNotFound => "The version may not be synced yet. Try syncing first."
    Internal(_) => "Please report this bug with the debug output"
  }
}

///|
/// Full detail for logs/debugging
pub fn TextError::debug(self : TextError) -> String {
  match self {
    InvalidPosition(pos~, len~) =>
      "TextError::InvalidPosition { pos: \{pos}, len: \{len} }"
    SyncFailed(failure) => "TextError::SyncFailed { reason: \{failure} }"
    VersionNotFound => "TextError::VersionNotFound"
    Internal(detail~) => "TextError::Internal { detail: \{detail} }"
  }
}

///|
/// Whether this error can be retried
pub fn TextError::is_retryable(self : TextError) -> Bool {
  match self {
    InvalidPosition(_) => false
    SyncFailed(MissingDependency(_)) => true
    SyncFailed(MalformedMessage(_)) => false
    VersionNotFound => true
    Internal(_) => false
  }
}

///|
/// Convert from DocumentError to TextError
pub fn TextError::from_document_error(
  err : @document.DocumentError,
  doc_len : Int,
) -> TextError {
  match err {
    InvalidPosition(pos~) => TextError::InvalidPosition(pos~, len=doc_len)
    MissingOrigin(raw~) =>
      TextError::SyncFailed(
        SyncFailure::MissingDependency(hint="missing origin: \{raw}"),
      )
    OpLog(oplog_err) => TextError::from_oplog_error(oplog_err)
    Fugue(@fugue.FugueError::MissingItem(id~)) =>
      TextError::Internal(detail="fugue error: missing item id=\{id}")
    Branch(branch_err) => TextError::from_branch_error(branch_err)
  }
}

///|
/// Convert from OpLogError to TextError
pub fn TextError::from_oplog_error(err : @oplog.OpLogError) -> TextError {
  match err {
    MissingLocalVersion(lv~) =>
      TextError::Internal(detail="missing local version: \{lv}")
    MissingOrigin =>
      TextError::SyncFailed(
        SyncFailure::MalformedMessage(detail="delete operation missing origin"),
      )
    MissingRemoteParent(raw~) =>
      TextError::SyncFailed(
        SyncFailure::MissingDependency(hint="missing parent: \{raw}"),
      )
    MissingRemoteFrontier(raw~) =>
      TextError::SyncFailed(
        SyncFailure::MissingDependency(hint="missing frontier: \{raw}"),
      )
    CausalGraphError(error~) =>
      TextError::Internal(detail="causal graph error: \{error}")
  }
}

///|
/// Convert from BranchError to TextError
pub fn TextError::from_branch_error(err : @branch.BranchError) -> TextError {
  match err {
    MissingOp(lv~) => TextError::Internal(detail="missing op at lv: \{lv}")
    MissingOrigin(raw~) =>
      TextError::SyncFailed(
        SyncFailure::MissingDependency(hint="missing origin: \{raw}"),
      )
    OpLog(oplog_err) => TextError::from_oplog_error(oplog_err)
    Fugue(@fugue.FugueError::MissingItem(id~)) =>
      TextError::Internal(detail="fugue error: missing item id=\{id}")
  }
}
