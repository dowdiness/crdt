// Valtio + event-graph-walker Integration
//
// Synchronizes Valtio proxy state with event-graph-walker CRDT
// Similar to valtio-y but for eg-walker sequence CRDT

///|
/// Integration State
/// Manages bidirectional sync between Valtio and eg-walker Document
pub struct EgWalkerProxy {
  /// The Valtio proxy for reactive UI state
  proxy_state : ValtioProxy
  /// The underlying CRDT document
  doc : CRDTDocument
  /// Pending operations buffer for batching
  mut pending_ops : Array[CRDTOperation]
  /// Whether we're currently applying remote changes (prevent loops)
  mut is_applying_remote : Bool
  /// Subscription handle for cleanup
  mut subscription : ValtioSubscription?
  /// Undo stack for local operations
  undo_stack : Array[UndoEntry]
  /// Redo stack
  redo_stack : Array[UndoEntry]
  /// Whether undo/redo is enabled
  undo_enabled : Bool
}

///|
/// Entry in undo/redo stack
pub struct UndoEntry {
  op_type : OpType
  position : Int
  content : String
}

///|
pub enum OpType {
  Insert
  Delete
}

///|
/// Constructor
/// Create a new EgWalker proxy with optional undo support
pub fn EgWalkerProxy::new(
  agent_id : String,
  undo_enabled? : Bool = false,
) -> EgWalkerProxy {
  let doc = create_document(agent_id)
  let proxy_state = create_text_proxy("")
  {
    proxy_state,
    doc,
    pending_ops: [],
    is_applying_remote: false,
    subscription: None,
    undo_stack: [],
    redo_stack: [],
    undo_enabled,
  }
}

///|
/// Text Proxy Creation
/// Create a Valtio proxy with text state
fn create_text_proxy(initial_text : String) -> ValtioProxy {
  let state = js_object()
  set_string(state, "text", initial_text)
  set_int(state, "cursor", 0)
  set_bool(state, "syncing", false)
  proxy(state)
}

///|
/// Initialization
/// Set up bidirectional sync between proxy and document
pub fn EgWalkerProxy::init(self : EgWalkerProxy) -> Unit {
  // Subscribe to proxy changes
  let sub = subscribe(self.proxy_state, fn() {
    if not(self.is_applying_remote) {
      self.handle_proxy_change()
    }
  })
  self.subscription = Some(sub)
}

///|
/// Proxy Change Handler
/// Called when Valtio proxy is mutated
fn EgWalkerProxy::handle_proxy_change(self : EgWalkerProxy) -> Unit {
  let new_text = get_string(self.proxy_state, "text")
  let old_text = document_to_text(self.doc)
  if new_text == old_text {
    return
  }

  // Calculate diff and generate operations
  let ops = calculate_diff(old_text, new_text)

  // Apply operations to CRDT
  for op in ops {
    match op {
      DiffOp::Insert(pos, text) => {
        let crdt_op = document_insert(self.doc, pos, text)
        self.pending_ops.push(crdt_op)
        if self.undo_enabled {
          self.undo_stack.push({ op_type: Insert, position: pos, content: text })
          self.redo_stack.clear()
        }
      }
      DiffOp::Delete(pos, len) =>
        for i = 0; i < len; i = i + 1 {
          let crdt_op = document_delete(self.doc, pos)
          self.pending_ops.push(crdt_op)
          if self.undo_enabled && i == 0 {
            // Store deleted text for undo
            let deleted = old_text[pos:pos + len].to_string() catch { _ => "" }
            self.undo_stack.push({
              op_type: Delete,
              position: pos,
              content: deleted,
            })
            self.redo_stack.clear()
          }
        }
    }
  }

  // Update cursor position
  let cursor = get_int(self.proxy_state, "cursor")
  set_int(self.proxy_state, "cursor", cursor)
}

///|
/// Remote Operation Handler
/// Apply remote CRDT operations to the proxy
pub fn EgWalkerProxy::apply_remote(
  self : EgWalkerProxy,
  op : CRDTOperation,
) -> Unit {
  self.is_applying_remote = true

  // Apply to CRDT document
  document_apply_remote(self.doc, op)

  // Sync to Valtio proxy
  let new_text = document_to_text(self.doc)
  set_string(self.proxy_state, "text", new_text)
  self.is_applying_remote = false
}

///|
/// Batch Remote Operations
/// Apply multiple remote operations efficiently
pub fn EgWalkerProxy::apply_remote_batch(
  self : EgWalkerProxy,
  ops : Array[CRDTOperation],
) -> Unit {
  self.is_applying_remote = true

  // Apply each operation
  for op in ops {
    document_apply_remote(self.doc, op)
  }

  // Sync to Valtio proxy
  let new_text = document_to_text(self.doc)
  set_string(self.proxy_state, "text", new_text)
  self.is_applying_remote = false
}

///|
/// Undo/Redo Support
/// Undo the last local operation
pub fn EgWalkerProxy::undo(self : EgWalkerProxy) -> Unit {
  if not(self.undo_enabled) || self.undo_stack.is_empty() {
    return
  }
  match self.undo_stack.pop() {
    Some(entry) => {
      self.is_applying_remote = true
      match entry.op_type {
        Insert => {
          // Undo insert by deleting
          let current_text = get_string(self.proxy_state, "text")
          let part1 = current_text[0:entry.position].to_string() catch {
            _ => ""
          }
          let part2 = current_text[entry.position + entry.content.length():].to_string() catch {
            _ => ""
          }
          set_string(self.proxy_state, "text", part1 + part2)
        }
        Delete => {
          // Undo delete by inserting
          let current_text = get_string(self.proxy_state, "text")
          let part1 = current_text[0:entry.position].to_string() catch {
            _ => ""
          }
          let part2 = current_text[entry.position:].to_string() catch {
            _ => ""
          }
          set_string(self.proxy_state, "text", part1 + entry.content + part2)
        }
      }

      // Move to redo stack
      self.redo_stack.push(entry)
      self.is_applying_remote = false
    }
    None => ()
  }
}

///|
/// Redo the last undone operation
pub fn EgWalkerProxy::redo(self : EgWalkerProxy) -> Unit {
  if not(self.undo_enabled) || self.redo_stack.is_empty() {
    return
  }
  match self.redo_stack.pop() {
    Some(entry) => {
      self.is_applying_remote = true
      match entry.op_type {
        Insert => {
          // Redo insert
          let current_text = get_string(self.proxy_state, "text")
          let part1 = current_text[0:entry.position].to_string() catch {
            _ => ""
          }
          let part2 = current_text[entry.position:].to_string() catch {
            _ => ""
          }
          set_string(self.proxy_state, "text", part1 + entry.content + part2)
        }
        Delete => {
          // Redo delete
          let current_text = get_string(self.proxy_state, "text")
          let part1 = current_text[0:entry.position].to_string() catch {
            _ => ""
          }
          let part2 = current_text[entry.position + entry.content.length():].to_string() catch {
            _ => ""
          }
          set_string(self.proxy_state, "text", part1 + part2)
        }
      }

      // Move back to undo stack
      self.undo_stack.push(entry)
      self.is_applying_remote = false
    }
    None => ()
  }
}

///|
/// Operation Access
/// Get pending operations for network sync
pub fn EgWalkerProxy::get_pending_ops(
  self : EgWalkerProxy,
) -> Array[CRDTOperation] {
  let ops = self.pending_ops
  self.pending_ops = []
  ops
}

///|
/// Get the current CRDT frontier as JSON
pub fn EgWalkerProxy::get_frontier_json(self : EgWalkerProxy) -> String {
  document_get_frontier(self.doc)
}

///|
/// Cleanup
/// Dispose of the proxy and clean up subscriptions
pub fn EgWalkerProxy::dispose(self : EgWalkerProxy) -> Unit {
  match self.subscription {
    Some(sub) => unsubscribe(sub)
    None => ()
  }
  self.subscription = None
}

///|
/// Diff Calculation
/// Calculate the difference between old and new text
priv enum DiffOp {
  Insert(Int, String)
  Delete(Int, Int) // position, length
}

///|
fn calculate_diff(old_text : String, new_text : String) -> Array[DiffOp] {
  let ops : Array[DiffOp] = []

  // Simple diff algorithm: find longest common prefix/suffix
  let mut i = 0
  let old_len = old_text.length()
  let new_len = new_text.length()

  // Find common prefix
  while i < old_len && i < new_len && old_text[i] == new_text[i] {
    i = i + 1
  }

  // Find common suffix
  let mut j = 0
  while j < old_len - i &&
        j < new_len - i &&
        old_text[old_len - 1 - j] == new_text[new_len - 1 - j] {
    j = j + 1
  }
  let old_middle_len = old_len - i - j
  let new_middle_len = new_len - i - j

  // Handle deletions
  if old_middle_len > 0 {
    ops.push(Delete(i, old_middle_len))
  }

  // Handle insertions
  if new_middle_len > 0 {
    let inserted = new_text[i:i + new_middle_len].to_string() catch { _ => "" }
    ops.push(Insert(i, inserted))
  }
  ops
}
