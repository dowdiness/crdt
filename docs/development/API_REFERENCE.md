# API Reference

This document provides a high-level reference for the core MoonBit APIs in the `crdt` project.

## SyncEditor (`@editor.SyncEditor`)

The `SyncEditor` is the primary facade for the editor application, integrating the CRDT document, incremental parser, and undo manager.

### Construction
- `SyncEditor::new(agent_id : String, capture_timeout_ms? : Int = 500, ephemeral_timeout_ms? : UInt64 = 60000UL) -> SyncEditor`
  Creates a new editor instance for the given agent.

### Text Operations
- `insert(text : String) -> Unit raise`
  Inserts text at the current cursor position.
- `delete() -> Bool`
  Deletes the character at the current cursor position (forward delete).
- `backspace() -> Bool`
  Deletes the character before the current cursor position.
- `move_cursor(position : Int) -> Unit`
  Moves the cursor to the specified absolute position.
- `get_text() -> String`
  Returns the full document text.
- `get_cursor() -> Int`
  Returns the current cursor position.
- `set_text(new_text : String) -> Unit`
  Replaces the entire document text (useful for initialization).

### Undo/Redo
- `insert_and_record(text : String, timestamp_ms : Int) -> Unit raise`
- `delete_and_record(timestamp_ms : Int) -> Bool`
- `backspace_and_record(timestamp_ms : Int) -> Bool`
- `undo() -> Bool`
- `redo() -> Bool`
- `can_undo() -> Bool`
- `can_redo() -> Bool`

### Synchronization
- `export_all() -> @text.SyncMessage`
  Exports all operations for initial synchronization.
- `export_since(peer_version : @text.Version) -> @text.SyncMessage`
  Exports operations created since the specified peer version.
- `apply_sync(msg : @text.SyncMessage) -> Unit`
  Applies a synchronization message received from a peer.
- `get_version() -> @text.Version`
  Returns the current document version.

### AST & Parsing
- `get_ast() -> @ast.Term`
  Returns the current parsed AST.
- `get_ast_pretty() -> String`
  Returns a pretty-printed string of the AST.
- `get_errors() -> Array[String]`
  Returns a list of parse errors.
- `is_parse_valid() -> Bool`
  Returns true if the current text parses without errors.

### Projectional Editing
- `apply_tree_edit(op : @proj.TreeEditOp, timestamp_ms : Int) -> Result[Unit, String]`
  Applies a structural tree edit by round-tripping through the text CRDT.

## EphemeralStore (`@editor.EphemeralStore`)

Manages transient state like peer cursors and presence information.

- `set(key : String, value : EphemeralValue) -> Unit raise`
  Sets a value for a specific key (usually a peer ID).
- `get(key : String) -> EphemeralValue?`
  Retrieves a value for a key.
- `delete(key : String) -> Unit raise`
  Removes a key from the store.
- `encode_all() -> Bytes`
  Encodes all non-expired state for broadcasting.
- `apply(data : Bytes) -> Unit raise`
  Applies an encoded update from a peer.
- `remove_outdated() -> Unit`
  Prunes expired entries based on `timeout_ms`.
