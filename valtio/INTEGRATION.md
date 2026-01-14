# Integrating Valtio with eg-walker CRDT

This guide shows how to integrate Valtio state management with the eg-walker CRDT implementation for building reactive collaborative editors.

## Architecture

```
┌─────────────────┐
│  React UI       │  ← useSnapshot(uiState)
│  (Components)   │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  Valtio Proxy   │  ← Reactive UI State
│  (uiState)      │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  CRDT Document  │  ← eg-walker Implementation
│  (FugueMax)     │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  Network Sync   │  ← WebSocket/WebRTC
│                 │
└─────────────────┘
```

## Setup

### 1. Install Dependencies

```bash
npm install valtio react
```

### 2. Create State Bridge

```moonbit
// state_bridge.mbt
struct EditorState {
  mut content : String
  mut cursor_pos : Int
  mut remote_cursors : @map.Map[String, Int]
  mut syncing : Bool
}

pub fn create_editor_state() -> ValtioProxy {
  let state = js_object()
  set_string(state, "content", "")
  set_int(state, "cursor_pos", 0)
  set_bool(state, "syncing", false)

  proxy(state)
}
```

### 3. Bridge CRDT to Valtio

```moonbit
pub struct CRDTValtioAdapter {
  crdt_doc : CRDTDocument
  ui_state : ValtioProxy
}

pub fn CRDTValtioAdapter::new(doc : CRDTDocument) -> CRDTValtioAdapter {
  let ui_state = create_editor_state()

  // Initialize UI state from CRDT
  let content = doc.to_string()
  set_string(ui_state, "content", content)

  { crdt_doc: doc, ui_state }
}

pub fn sync_to_ui(self : CRDTValtioAdapter) -> Unit {
  // Update UI state when CRDT changes
  let content = self.crdt_doc.to_string()
  set_string(self.ui_state, "content", content)
  set_bool(self.ui_state, "syncing", false)
}

pub fn handle_local_insert(
  self : CRDTValtioAdapter,
  text : String,
  pos : Int
) -> Unit {
  set_bool(self.ui_state, "syncing", true)

  // Insert into CRDT (character by character)
  for i = 0; i < text.length(); i = i + 1 {
    let char = text[i]
    self.crdt_doc.insert(pos + i, char)
  }

  // Sync back to UI
  self.sync_to_ui()

  // Update cursor
  set_int(self.ui_state, "cursor_pos", pos + text.length())
}

pub fn handle_local_delete(
  self : CRDTValtioAdapter,
  pos : Int,
  len : Int
) -> Unit {
  set_bool(self.ui_state, "syncing", true)

  // Delete from CRDT
  for i = 0; i < len; i = i + 1 {
    self.crdt_doc.delete(pos)
  }

  // Sync back to UI
  self.sync_to_ui()

  // Update cursor
  set_int(self.ui_state, "cursor_pos", pos)
}
```

## React Integration

### Editor Component

```jsx
// Editor.jsx
import { useSnapshot } from 'valtio';

export function Editor({ adapter }) {
  const state = useSnapshot(adapter.ui_state);

  const handleChange = (e) => {
    const newText = e.target.value;
    const oldText = state.content;

    // Calculate diff and send to MoonBit
    if (newText.length > oldText.length) {
      // Insertion
      const insertPos = findInsertPosition(oldText, newText);
      const inserted = newText.slice(insertPos, insertPos + (newText.length - oldText.length));
      adapter.handle_local_insert(inserted, insertPos);
    } else if (newText.length < oldText.length) {
      // Deletion
      const deletePos = findDeletePosition(oldText, newText);
      const deleteLen = oldText.length - newText.length;
      adapter.handle_local_delete(deletePos, deleteLen);
    }
  };

  return (
    <div>
      <textarea
        value={state.content}
        onChange={handleChange}
        disabled={state.syncing}
      />
      <div>Cursor: {state.cursor_pos}</div>
      {state.syncing && <div>Syncing...</div>}
    </div>
  );
}
```

## Collaborative Features

### Remote Cursor Tracking

```moonbit
pub fn update_remote_cursor(
  self : CRDTValtioAdapter,
  user_id : String,
  pos : Int
) -> Unit {
  // Store remote cursor positions
  let cursors = get_proxy(self.ui_state, "remote_cursors")
  set_int(cursors, user_id, pos)
}

pub fn remove_remote_cursor(
  self : CRDTValtioAdapter,
  user_id : String
) -> Unit {
  // Remove cursor when user disconnects
  // (Would need a delete helper in json_helpers.mbt)
}
```

### Network Sync

```moonbit
pub fn handle_remote_operation(
  self : CRDTValtioAdapter,
  op : RemoteOperation
) -> Unit {
  match op {
    Insert(pos, char, timestamp, site_id) => {
      // Apply remote insert to CRDT
      self.crdt_doc.apply_remote_insert(pos, char, timestamp, site_id)
      self.sync_to_ui()
    }
    Delete(pos, timestamp, site_id) => {
      // Apply remote delete to CRDT
      self.crdt_doc.apply_remote_delete(pos, timestamp, site_id)
      self.sync_to_ui()
    }
  }
}
```

## Performance Considerations

### Batching Updates

```moonbit
pub struct UpdateBatcher {
  adapter : CRDTValtioAdapter
  mut pending_ops : @array.Array[Operation]
  mut timer : Option[Timer]
}

pub fn queue_operation(self : UpdateBatcher, op : Operation) -> Unit {
  self.pending_ops.push(op)

  // Debounce UI updates
  match self.timer {
    None => {
      // Set timer to flush after 16ms (60fps)
      self.timer = Some(set_timeout(fn() {
        self.flush()
      }, 16))
    }
    Some(_) => ()  // Already scheduled
  }
}

pub fn flush(self : UpdateBatcher) -> Unit {
  // Apply all pending operations
  for op in self.pending_ops {
    // Apply to CRDT
  }

  // Single UI sync
  self.adapter.sync_to_ui()

  // Clear
  self.pending_ops.clear()
  self.timer = None
}
```

### Selective Updates

```moonbit
// Only update parts of UI that changed
pub fn sync_content_only(self : CRDTValtioAdapter) -> Unit {
  let content = self.crdt_doc.to_string()
  set_string(self.ui_state, "content", content)
  // Don't update cursor or other fields
}

pub fn sync_cursor_only(self : CRDTValtioAdapter, pos : Int) -> Unit {
  set_int(self.ui_state, "cursor_pos", pos)
  // Don't update content
}
```

## Testing

```moonbit
test "valtio crdt integration" {
  let doc = CRDTDocument::new("site1")
  let adapter = CRDTValtioAdapter::new(doc)

  // Subscribe to changes
  let mut changed = false
  let unsub = subscribe(adapter.ui_state, fn() {
    changed = true
  })

  // Insert text
  adapter.handle_local_insert("Hello", 0)

  // Verify UI updated
  let content = get_string(adapter.ui_state, "content")
  inspect!(content, content="Hello")
  inspect!(changed, content="true")

  unsubscribe(unsub)
}
```

## Best Practices

1. **Character-level operations**: Always split multi-char inserts into individual characters for CRDT
2. **Debounce UI updates**: Batch rapid changes to avoid excessive re-renders
3. **Immutable snapshots**: Use `useSnapshot` in React, never mutate snapshots
4. **Subscription cleanup**: Always unsubscribe when components unmount
5. **Type safety**: Use helper functions (get_*/set_*) instead of raw JS access

## Example Project Structure

```
project/
├── moonbit/
│   ├── crdt/              # CRDT implementation
│   ├── valtio/            # Valtio FFI bindings
│   └── editor/
│       ├── adapter.mbt    # CRDT-Valtio adapter
│       └── state.mbt      # State management
├── web/
│   ├── src/
│   │   ├── Editor.jsx     # React component
│   │   └── main.jsx
│   └── package.json
└── moon.mod.json
```

## See Also

- [eg-walker CRDT Documentation](../event-graph-walker/README.md)
- [Valtio Documentation](https://github.com/pmndrs/valtio)
- [MoonBit FFI Guide](https://docs.moonbitlang.com/en/latest/language/ffi.html)
