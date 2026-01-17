///| Operation types for CRDT

///|
/// Operation content - either insert or delete
pub enum OpContent {
  Insert(String) // Insert text
  Delete // Delete character
} derive(Eq, Show, FromJson, ToJson)

///|
/// Operation structure with causal and FugueMax metadata
pub struct Op {
  lv : Int // Local version when this op was created
  parents : Array[@causal_graph.RawVersion] // Causal dependencies (frontier)
  agent : String // Agent that created this operation
  seq : Int // Sequence number for this agent
  content : OpContent // Operation content
  origin_left : @causal_graph.RawVersion? // FugueMax: item to the left
  origin_right : @causal_graph.RawVersion? // FugueMax: item to the right
} derive(Show, FromJson, ToJson)

///|
/// Create a new insert operation
pub fn Op::new_insert(
  lv : Int,
  parents : Array[@causal_graph.RawVersion],
  agent : String,
  seq : Int,
  text : String,
  origin_left : @causal_graph.RawVersion?,
  origin_right : @causal_graph.RawVersion?,
) -> Op {
  { lv, parents, agent, seq, content: Insert(text), origin_left, origin_right }
}

///|
/// Create a new delete operation
pub fn Op::new_delete(
  lv : Int,
  parents : Array[@causal_graph.RawVersion],
  agent : String,
  seq : Int,
  origin_left : @causal_graph.RawVersion?,
) -> Op {
  { lv, parents, agent, seq, content: Delete, origin_left, origin_right: None }
}

///|
/// Check if operation is an insert
pub fn Op::is_insert(self : Op) -> Bool {
  match self.content {
    Insert(_) => true
    Delete => false
  }
}

///|
/// Check if operation is a delete
pub fn Op::is_delete(self : Op) -> Bool {
  match self.content {
    Insert(_) => false
    Delete => true
  }
}

///|
/// Get insert text if this is an insert operation
pub fn Op::get_insert_text(self : Op) -> String? {
  match self.content {
    Insert(text) => Some(text)
    Delete => None
  }
}
