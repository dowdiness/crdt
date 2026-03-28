// Active runtime types for projection editing.

///|
/// Unique identifier for AST nodes (persistent across edits).
/// Construct via `NodeId::from_int(n)`.
pub struct NodeId(Int) derive(Show, Eq, Hash, Compare)

///|
pub fn NodeId::from_int(n : Int) -> NodeId {
  NodeId(n)
}
