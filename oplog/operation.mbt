///| Operation types for CRDT

///|
/// Operation content - either insert or delete
pub enum OpContent {
  Insert(String) // Insert text
  Delete // Delete character
} derive(Eq, Show)

///|
/// Operation structure with causal and FugueMax metadata
pub struct Op {
  lv : Int // Local version when this op was created
  parents : Array[Int] // Causal dependencies (frontier)
  content : OpContent // Operation content
  origin_left : Int // FugueMax: LV of item to the left (-1 for start)
  origin_right : Int // FugueMax: LV of item to the right (-1 for end)
} derive(Show)

///|
/// Create a new insert operation
pub fn Op::new_insert(
  lv : Int,
  parents : Array[Int],
  text : String,
  origin_left : Int,
  origin_right : Int,
) -> Op {
  { lv, parents, content: Insert(text), origin_left, origin_right }
}

///|
/// Create a new delete operation
pub fn Op::new_delete(lv : Int, parents : Array[Int], origin_left : Int) -> Op {
  { lv, parents, content: Delete, origin_left, origin_right: -1 }
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
