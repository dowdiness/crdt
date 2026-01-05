// Term types for Lambda Calculus

///|
pub type VarName = String

///|
pub(all) enum Bop {
  Plus
  Minus
} derive(Show, Eq)

///|
pub(all) enum Term {
  // Integer
  Int(Int)
  // Variable
  Var(VarName)
  // Lambda abstraction
  Lam(VarName, Term)
  // Application
  App(Term, Term)
  // Binary operation
  Bop(Bop, Term, Term)
  // If-then-else
  If(Term, Term, Term)
} derive(Show, Eq)

///|
/// Term kind for positioned nodes
pub enum TermKind {
  Int(Int) // Integer literal
  Var(String) // Variable
  Lam(String) // Lambda abstraction (parameter name, body is children[0])
  App // Application (left is children[0], right is children[1])
  Bop(Bop) // Binary operation (operands in children[0] and children[1])
  If // If-then-else (condition, then, else in children)
  Error(String) // Error node for recovery
} derive(Show)

///|
/// AST node with source position and unique identity
pub struct TermNode {
  kind : TermKind // Kind of term
  start : Int // Start byte offset in source
  end : Int // End byte offset in source
  node_id : Int // Unique node identifier
  children : Array[TermNode] // Child nodes
} derive(Show)

///|
/// Create a new TermNode
pub fn TermNode::new(
  kind : TermKind,
  start : Int,
  end : Int,
  node_id : Int,
  children : Array[TermNode],
) -> TermNode {
  { kind, start, end, node_id, children }
}

///|
/// Create an error node
pub fn TermNode::error(
  message : String,
  position : Int,
  node_id : Int,
) -> TermNode {
  TermNode::new(TermKind::Error(message), position, position, node_id, [])
}

///|
/// Print a TermNode
pub fn print_term_node(node : TermNode) -> String {
  fn go(n : TermNode) -> String {
    match n.kind {
      TermKind::Int(i) => i.to_string()
      TermKind::Var(x) => x
      TermKind::Lam(param) => {
        let body = if n.children.length() > 0 { go(n.children[0]) } else { "?" }
        "(λ" + param + ". " + body + ")"
      }
      TermKind::App => {
        let left = if n.children.length() > 0 { go(n.children[0]) } else { "?" }
        let right = if n.children.length() > 1 {
          go(n.children[1])
        } else {
          "?"
        }
        "(" + left + " " + right + ")"
      }
      TermKind::Bop(Plus) => {
        let left = if n.children.length() > 0 { go(n.children[0]) } else { "?" }
        let right = if n.children.length() > 1 {
          go(n.children[1])
        } else {
          "?"
        }
        "(" + left + " + " + right + ")"
      }
      TermKind::Bop(Minus) => {
        let left = if n.children.length() > 0 { go(n.children[0]) } else { "?" }
        let right = if n.children.length() > 1 {
          go(n.children[1])
        } else {
          "?"
        }
        "(" + left + " - " + right + ")"
      }
      TermKind::If => {
        let cond = if n.children.length() > 0 { go(n.children[0]) } else { "?" }
        let then_expr = if n.children.length() > 1 {
          go(n.children[1])
        } else {
          "?"
        }
        let else_expr = if n.children.length() > 2 {
          go(n.children[2])
        } else {
          "?"
        }
        "if " + cond + " then " + then_expr + " else " + else_expr
      }
      TermKind::Error(msg) => "<error: " + msg + ">"
    }
  }

  go(node)
}

///|
pub fn print_term(term : Term) -> String {
  fn go(t : Term) -> String {
    match t {
      Int(i) => i.to_string()
      Var(x) => x
      Lam(x, t) => "(λ" + x + ". " + go(t) + ")"
      App(t1, t2) => "(" + go(t1) + " " + go(t2) + ")"
      Bop(Plus, t1, t2) => "(" + go(t1) + " + " + go(t2) + ")"
      Bop(Minus, t1, t2) => "(" + go(t1) + " - " + go(t2) + ")"
      If(t1, t2, t3) => "if " + go(t1) + " then " + go(t2) + " else " + go(t3)
    }
  }

  go(term)
}

///|
/// Convert a TermNode to a Term (discarding position information)
pub fn node_to_term(node : TermNode) -> Term {
  match node.kind {
    TermKind::Int(n) => Term::Int(n)
    TermKind::Var(name) => Term::Var(name)
    TermKind::Lam(param) => {
      let body = if node.children.length() > 0 {
        node_to_term(node.children[0])
      } else {
        abort("Lambda node missing body child")
      }
      Term::Lam(param, body)
    }
    TermKind::App => {
      let left = if node.children.length() > 0 {
        node_to_term(node.children[0])
      } else {
        abort("App node missing left child")
      }
      let right = if node.children.length() > 1 {
        node_to_term(node.children[1])
      } else {
        abort("App node missing right child")
      }
      Term::App(left, right)
    }
    TermKind::Bop(op) => {
      let left = if node.children.length() > 0 {
        node_to_term(node.children[0])
      } else {
        abort("Bop node missing left child")
      }
      let right = if node.children.length() > 1 {
        node_to_term(node.children[1])
      } else {
        abort("Bop node missing right child")
      }
      Term::Bop(op, left, right)
    }
    TermKind::If => {
      let cond = if node.children.length() > 0 {
        node_to_term(node.children[0])
      } else {
        abort("If node missing condition child")
      }
      let then_expr = if node.children.length() > 1 {
        node_to_term(node.children[1])
      } else {
        abort("If node missing then child")
      }
      let else_expr = if node.children.length() > 2 {
        node_to_term(node.children[2])
      } else {
        abort("If node missing else child")
      }
      Term::If(cond, then_expr, else_expr)
    }
    TermKind::Error(msg) => abort("Cannot convert error node to Term: " + msg)
  }
}
