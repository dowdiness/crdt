///| Document - User-facing CRDT document API

///|

///| Manages the FugueTree, OpLog, and CausalGraph together

///|
/// Provides position-based operations (insert/delete at cursor position)
pub struct Document {
  tree : @fugue.FugueTree
  oplog : @oplog.OpLog
  agent_id : String
} derive(Show)

///|
/// Create a new document for an agent
pub fn Document::new(agent_id : String) -> Document {
  let oplog = @oplog.OpLog::new(agent_id)
  let tree = @fugue.FugueTree::new()
  { tree, oplog, agent_id }
}

///|
/// Get the current text content
pub fn Document::to_text(self : Document) -> String {
  self.tree.to_text()
}

///|
/// Get the current frontier
pub fn Document::get_frontier(self : Document) -> Array[Int] {
  self.oplog.get_frontier()
}

///| Map a user position (0-based cursor position) to the LV at that position

///|

///| Returns the LV of the item before the cursor position

///|
/// Returns -1 if at the start of the document
fn Document::position_to_lv(self : Document, position : Int) -> Int {
  if position == 0 {
    return -1
  }

  // Get all visible items in proper tree order
  let items_list = self.tree.get_visible_items()

  // Find the LV at position - 1
  if position > items_list.length() {
    // Position beyond end, use last item
    if items_list.length() > 0 {
      let (id, _) = items_list[items_list.length() - 1]
      return id
    } else {
      return -1
    }
  }
  let (id, _) = items_list[position - 1]
  id
}

///| Insert text at a cursor position

///|

///|
/// Returns the operation that was created
pub fn Document::insert(
  self : Document,
  position : Int,
  text : String,
) -> @oplog.Op {
  // Map position to LV
  let origin_left = self.position_to_lv(position)

  // Find origin_right (the item after the cursor)
  let items_list : Array[(Int, @fugue.Item)] = self.tree.get_visible_items()
  let origin_right = if position == 0 {
    // At start, find first visible item
    if items_list.length() > 0 {
      let (id, _) = items_list[0]
      id
    } else {
      -1
    }
  } else {
    // Find item at position
    if position < items_list.length() {
      let (id, _) = items_list[position]
      id
    } else {
      -1
    }
  }

  // Create and apply the operation
  let op = self.oplog.insert(text, origin_left, origin_right)

  // Get lamport timestamp from graph
  let timestamp = match self.oplog.graph.lv_to_raw(op.lv) {
    Some(raw) => raw.seq
    None => op.lv
  }

  // Apply to tree
  self.tree.insert(op.lv, text, origin_left, origin_right, timestamp)
  op
}

///| Delete character at a cursor position

///|

///|
/// Returns Some(operation) if successful, None if position is invalid
pub fn Document::delete(self : Document, position : Int) -> @oplog.Op? {
  if position < 0 {
    return None
  }

  // Get all visible items in proper tree order
  let items_list = self.tree.get_visible_items()

  if position >= items_list.length() {
    return None
  }

  // Get the LV of the item to delete
  let (target_lv, _) = items_list[position]

  // Create and apply delete operation
  let op = self.oplog.delete(target_lv)
  self.tree.delete(target_lv)
  Some(op)
}

///|
/// Apply a remote operation to this document
pub fn Document::apply_remote(self : Document, op : @oplog.Op) -> Unit {
  // Add to oplog
  self.oplog.apply_remote(op)

  // Apply to tree based on operation type
  match op.content {
    @oplog.Insert(text) => {
      // Get lamport timestamp from graph
      let timestamp = match self.oplog.graph.lv_to_raw(op.lv) {
        Some(raw) => raw.seq
        None => op.lv
      }
      self.tree.insert(op.lv, text, op.origin_left, op.origin_right, timestamp)
    }
    @oplog.Delete => self.tree.delete(op.origin_left)
  }
}

///|
/// Merge remote operations into this document
pub fn Document::merge_remote(
  self : Document,
  remote_ops : Array[@oplog.Op],
  _remote_frontier : Array[Int],
) -> Unit {
  // Use the merge module's convenience function
  @merge.merge_remote_ops(self.tree, self.oplog, remote_ops)
}
