// CRDT integration for incremental parser
// Demonstrates how to bridge AST with tree-based CRDT (conceptual)

///| Mapping from TermKind to CRDT node type
///
/// This defines how AST nodes map to CRDT tree nodes
fn term_kind_to_node_type(kind : TermKind) -> String {
  match kind {
    TermKind::Int(_) => "int_literal"
    TermKind::Var(_) => "variable"
    TermKind::Lam(_) => "lambda"
    TermKind::App => "application"
    TermKind::Bop(Plus) => "binary_op_plus"
    TermKind::Bop(Minus) => "binary_op_minus"
    TermKind::If => "if_expr"
    TermKind::Error(_) => "error"
  }
}

///| Get text value from TermKind
fn term_kind_to_text(kind : TermKind) -> String {
  match kind {
    TermKind::Int(n) => n.to_string()
    TermKind::Var(name) => name
    TermKind::Lam(param) => param
    TermKind::App => ""
    TermKind::Bop(_) => ""
    TermKind::If => ""
    TermKind::Error(msg) => msg
  }
}

///| Get attributes from TermNode
fn term_to_attributes(node : TermNode) -> @hashmap.HashMap[String, String] {
  let attrs = @hashmap.HashMap::new()

  // Store source positions
  attrs.set("start", node.start.to_string())
  attrs.set("end", node.end.to_string())
  attrs.set("node_id", node.node_id.to_string())

  // Store kind-specific attributes
  match node.kind {
    TermKind::Bop(Plus) => attrs.set("op", "plus")
    TermKind::Bop(Minus) => attrs.set("op", "minus")
    TermKind::Lam(param) => attrs.set("param", param)
    _ => ()
  }

  attrs
}

///| CRDT tree node representation (conceptual)
///
/// This represents what a CRDT tree node might look like
pub struct CRDTNode {
  node_type : String                          // Type of node
  text_value : String                         // Text content
  attributes : @hashmap.HashMap[String, String]  // Node attributes
  children : Array[CRDTNode]                  // Child nodes
}

///| Create a CRDT node from attributes
pub fn CRDTNode::new(
  node_type : String,
  text_value : String,
  attributes : @hashmap.HashMap[String, String],
  children : Array[CRDTNode]
) -> CRDTNode {
  { node_type, text_value, attributes, children }
}

///| Convert AST TermNode to CRDT tree structure
///
/// This demonstrates the AST → CRDT conversion that would be
/// used in a full CRDT TreeDocument implementation
pub fn ast_to_crdt(node : TermNode) -> CRDTNode {
  let node_type = term_kind_to_node_type(node.kind)
  let text_value = term_kind_to_text(node.kind)
  let attributes = term_to_attributes(node)

  // Recursively convert children
  let crdt_children = node.children.map(ast_to_crdt)

  CRDTNode::new(node_type, text_value, attributes, crdt_children)
}

///| Convert CRDT tree back to source text
///
/// Reconstructs source from CRDT tree structure
pub fn crdt_to_source(node : CRDTNode) -> String {
  match node.node_type {
    "int_literal" => node.text_value
    "variable" => node.text_value
    "lambda" => {
      let param = node.text_value
      let body = if node.children.length() > 0 {
        crdt_to_source(node.children[0])
      } else {
        ""
      }
      "λ" + param + "." + body
    }
    "application" => {
      if node.children.length() >= 2 {
        let left = crdt_to_source(node.children[0])
        let right = crdt_to_source(node.children[1])
        "(" + left + " " + right + ")"
      } else {
        ""
      }
    }
    "binary_op_plus" => {
      if node.children.length() >= 2 {
        let left = crdt_to_source(node.children[0])
        let right = crdt_to_source(node.children[1])
        left + " + " + right
      } else {
        ""
      }
    }
    "binary_op_minus" => {
      if node.children.length() >= 2 {
        let left = crdt_to_source(node.children[0])
        let right = crdt_to_source(node.children[1])
        left + " - " + right
      } else {
        ""
      }
    }
    "if_expr" => {
      if node.children.length() >= 3 {
        let cond = crdt_to_source(node.children[0])
        let then_expr = crdt_to_source(node.children[1])
        let else_expr = crdt_to_source(node.children[2])
        "if " + cond + " then " + then_expr + " else " + else_expr
      } else {
        ""
      }
    }
    "error" => "<error: " + node.text_value + ">"
    _ => ""
  }
}

///| Parsed document with CRDT integration (conceptual)
///
/// This demonstrates how an incremental parser would integrate
/// with a CRDT tree document for collaborative editing
pub struct ParsedDocument {
  mut source : String               // Current source text
  parser : IncrementalParser        // Incremental parser
  mut crdt_tree : CRDTNode?         // CRDT tree representation
}

///| Create a new parsed document
pub fn ParsedDocument::new(source : String) -> ParsedDocument {
  let parser = IncrementalParser::new(source)
  { source, parser, crdt_tree: None }
}

///| Parse and create CRDT tree
pub fn ParsedDocument::parse(self : ParsedDocument) -> Unit {
  // Parse source
  let ast = self.parser.parse()

  // Convert to CRDT tree
  let crdt_tree = ast_to_crdt(ast)
  self.crdt_tree = Some(crdt_tree)
}

///| Apply local edit and update CRDT tree
///
/// This demonstrates the workflow for local edits:
/// 1. Update source
/// 2. Incrementally reparse
/// 3. Convert to CRDT tree
pub fn ParsedDocument::edit(
  self : ParsedDocument,
  edit : Edit,
  new_source : String
) -> Unit {
  // Update source
  self.source = new_source

  // Incrementally reparse
  let new_ast = self.parser.edit(edit, new_source)

  // Convert to CRDT tree
  let crdt_tree = ast_to_crdt(new_ast)
  self.crdt_tree = Some(crdt_tree)
}

///| Get current CRDT tree
pub fn ParsedDocument::get_crdt_tree(self : ParsedDocument) -> CRDTNode? {
  self.crdt_tree
}

///| Get current source
pub fn ParsedDocument::get_source(self : ParsedDocument) -> String {
  self.source
}

///| Reconstruct source from CRDT tree
///
/// This would be used when applying remote edits:
/// the CRDT tree is updated, then we reconstruct source
pub fn ParsedDocument::reconstruct_source(self : ParsedDocument) -> String {
  match self.crdt_tree {
    Some(tree) => crdt_to_source(tree)
    None => self.source
  }
}

///| Print CRDT tree structure (for debugging)
pub fn print_crdt_tree(node : CRDTNode, indent : Int) -> String {
  let indent_str = " ".repeat(indent)
  let mut result = indent_str + node.node_type

  if node.text_value.length() > 0 {
    result = result + ": \"" + node.text_value + "\""
  }

  result = result + "\n"

  for child in node.children {
    result = result + print_crdt_tree(child, indent + 2)
  }

  result
}
