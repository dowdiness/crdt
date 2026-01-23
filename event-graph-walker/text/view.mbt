///| TextView - Read-only historical view of a document

///|
/// A read-only view of the document at a specific version
pub(all) struct TextView {
  priv branch : @branch.Branch
}

///|
pub fn TextView::from_branch(branch : @branch.Branch) -> TextView {
  TextView::{ branch, }
}

///|
/// Get the text content at this version
pub fn TextView::text(self : TextView) -> String {
  self.branch.to_text()
}

///|
/// Get the version of this view
pub fn TextView::version(self : TextView) -> Version {
  Version::from_frontier(self.branch.get_frontier())
}

///|
/// Get the number of visible characters at this version
pub fn TextView::len(self : TextView) -> Int {
  self.branch.visible_count()
}

///|
/// Access the underlying Branch for advanced operations
pub fn TextView::inner_branch(self : TextView) -> @branch.Branch {
  self.branch
}

///|
pub impl Show for TextView with output(self, logger) {
  logger.write_string("TextView { text: \"")
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
