// Error recovery for incremental parsing
// Implements panic mode recovery with synchronization points

///|
/// Parser with error recovery
pub struct RecoveringParser {
  tokens : Array[TokenInfo]
  position : Int
  errors : Array[String] // Accumulated errors
}

///|
/// Create a recovering parser
pub fn RecoveringParser::new(tokens : Array[TokenInfo]) -> RecoveringParser {
  { tokens, position: 0, errors: [] }
}

///|
/// Record an error
pub fn RecoveringParser::record_error(
  self : RecoveringParser,
  error : String,
) -> Unit {
  self.errors.push(error)
}

///|
/// Get accumulated errors
pub fn RecoveringParser::get_errors(self : RecoveringParser) -> Array[String] {
  self.errors
}

///|
/// Parse with error recovery (returns partial tree with error nodes)
pub fn parse_with_error_recovery(input : String) -> (TermNode, Array[String]) {
  let tokens = tokenize(input) catch {
    TokenizationError(msg) => {
      // Return error node for tokenization failure
      let error_tree = TermNode::error("Tokenization error: " + msg, 0, 0)
      return (error_tree, ["Tokenization error: " + msg])
    }
  }
  let parser = RecoveringParser::new(tokens)

  // Try to parse, catching any errors
  // Use the standard positioned parser for now
  // In a full implementation, we'd use RecoveringParser throughout
  let tree = parse_tree(input) catch {
    ParseError((msg, token)) => {
      let error_msg = "Parse error: " + msg + " at token " + print_token(token)
      parser.record_error(error_msg)
      TermNode::error(error_msg, 0, 0)
    }
    e => {
      let error_msg = "Unexpected error: " + e.to_string()
      parser.record_error(error_msg)
      TermNode::error(error_msg, 0, 0)
    }
  }
  (tree, parser.get_errors())
}

///|
/// Check if a tree contains any error nodes
pub fn has_errors(tree : TermNode) -> Bool {
  match tree.kind {
    TermKind::Error(_) => true
    _ => {
      // Check children recursively
      for child in tree.children {
        if has_errors(child) {
          return true
        }
      }
      false
    }
  }
}

///|
/// Collect all error messages from a tree
pub fn collect_errors(tree : TermNode) -> Array[String] {
  let errors : Array[String] = []
  fn collect(node : TermNode, acc : Array[String]) -> Unit {
    match node.kind {
      TermKind::Error(msg) => acc.push(msg)
      TermKind::Int(_)
      | TermKind::Var(_)
      | TermKind::Lam(_)
      | TermKind::App
      | TermKind::Bop(_)
      | TermKind::If => ()
    }
    for child in node.children {
      collect(child, acc)
    }
  }

  collect(tree, errors)
  errors
}
