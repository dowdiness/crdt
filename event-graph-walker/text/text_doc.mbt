///| TextDoc - Main entry point for user-friendly text CRDT API

///|
/// A collaborative text document with automatic conflict resolution
pub(all) struct TextDoc {
  priv inner : @document.Document
}

///|
/// Create a new empty document with the given agent ID
pub fn TextDoc::new(agent_id : String) -> TextDoc {
  TextDoc::{ inner: @document.Document::new(agent_id) }
}

///|
/// Get the current text content
pub fn TextDoc::text(self : TextDoc) -> String {
  self.inner.to_text()
}

///|
/// Get the current text length (number of visible characters).
/// This is O(1) as it uses cached count, not string reconstruction.
pub fn TextDoc::len(self : TextDoc) -> Int {
  self.inner.tree.visible_count()
}

///|
/// Check if document is empty
pub fn TextDoc::is_empty(self : TextDoc) -> Bool {
  self.len() == 0
}

///|
/// Insert text at the given position
pub fn TextDoc::insert(
  self : TextDoc,
  pos : Pos,
  text : String,
) -> Change raise TextError {
  let doc_len = self.len()
  let pos_val = pos.value()
  if pos_val > doc_len {
    raise TextError::InvalidPosition(pos=pos_val, len=doc_len)
  }
  try {
    let op = self.inner.insert(pos_val, text)
    Change::from_op(op)
  } catch {
    err => raise TextError::from_document_error(err, doc_len)
  }
}

///|
/// Delete a single character at the given position
pub fn TextDoc::delete(self : TextDoc, pos : Pos) -> Change raise TextError {
  let doc_len = self.len()
  let pos_val = pos.value()
  if pos_val >= doc_len {
    raise TextError::InvalidPosition(pos=pos_val, len=doc_len)
  }
  try {
    let op = self.inner.delete(pos_val)
    Change::from_op(op)
  } catch {
    err => raise TextError::from_document_error(err, doc_len)
  }
}

///|
/// Get the current version of the document
pub fn TextDoc::version(self : TextDoc) -> Version {
  Version::from_frontier(self.inner.get_frontier())
}

///|
/// Get a sync session for this document
pub fn TextDoc::sync(self : TextDoc) -> SyncSession {
  SyncSession::new(self)
}

///|
/// Checkout a historical view at a specific version
pub fn TextDoc::checkout(
  self : TextDoc,
  version : Version,
) -> TextView raise TextError {
  try {
    let branch = @branch.Branch::checkout(
      self.inner.oplog,
      version.to_frontier(),
    )
    TextView::from_branch(branch)
  } catch {
    err => raise TextError::from_branch_error(err)
  }
}

///|
/// Access the underlying Document for advanced operations
pub fn TextDoc::advanced(self : TextDoc) -> @document.Document {
  self.inner
}

///|
/// Create TextDoc from an existing Document (for migration/interop)
pub fn TextDoc::from_document(doc : @document.Document) -> TextDoc {
  TextDoc::{ inner: doc }
}

///|
pub impl Show for TextDoc with output(self, logger) {
  logger.write_string("TextDoc { text: \"")
  let text = self.text()
  let display_text = if text.length() > 50 {
    text
    .iter()
    .take(50)
    .fold(init=StringBuilder::new(), fn(sb, c) {
      sb.write_char(c)
      sb
    })
    .to_string() +
    "..."
  } else {
    text
  }
  logger.write_string(display_text)
  logger.write_string("\", version: ")
  self.version().to_frontier().output(logger)
  logger.write_string(" }")
}
