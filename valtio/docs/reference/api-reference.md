# valtio-egwalker

Valtio integration for [event-graph-walker](../event-graph-walker) CRDT - synchronize reactive Valtio state with distributed text editing.

Inspired by [valtio-y](https://github.com/valtiojs/valtio-y) but designed specifically for the eg-walker sequence CRDT algorithm.

## Features

- 🔄 **Bidirectional Sync**: Valtio proxy ↔️ CRDT document
- 🚀 **Natural Mutations**: Change state like normal JavaScript objects
- 📦 **Operation Batching**: Efficient network sync with automatic batching
- ⏱️ **Undo/Redo**: Built-in undo/redo support
- 🌐 **Network Sync**: WebSocket integration for real-time collaboration
- ⚛️ **React Ready**: Works seamlessly with `useSnapshot`

## Installation

```bash
npm install valtio
# Add your compiled valtio-egwalker module
```

## Quick Start

### Basic Usage

```typescript
import { createEgWalkerProxy } from 'valtio-egwalker';
import { useSnapshot } from 'valtio';

// Create a synchronized proxy
const { proxy: state, undo, redo } = createEgWalkerProxy({
  agentId: 'user-123',
  undoManager: true,
});

// Mutate state naturally
state.text = 'Hello, world!';

// Use in React
function Editor() {
  const snap = useSnapshot(state);

  return (
    <div>
      <textarea
        value={snap.text}
        onChange={(e) => {
          state.text = e.target.value; // Just mutate!
        }}
      />
      <button onClick={undo}>Undo</button>
      <button onClick={redo}>Redo</button>
    </div>
  );
}
```

### Collaborative Editing

```typescript
const { proxy: state } = createEgWalkerProxy({
  agentId: 'user-123',
  undoManager: true,
  websocketUrl: 'ws://localhost:3000',
  roomId: 'my-document',
});

// All changes automatically sync across clients!
state.text = 'Collaborative editing just works!';
```

### Manual Operation Sync

For custom network setups:

```typescript
const { proxy: state, getPendingOps, applyRemoteOp } = createEgWalkerProxy({
  agentId: 'user-123',
});

// Get operations to send
const ops = getPendingOps();
sendToServer({ type: 'ops', data: ops });

// Apply received operations
socket.on('remote-ops', (ops) => {
  ops.forEach((op) => applyRemoteOp(op));
});
```

## API Reference

### `createEgWalkerProxy<T>(config)`

Create a Valtio proxy synchronized with eg-walker CRDT.

**Config:**

```typescript
interface EgWalkerProxyConfig {
  agentId: string; // Unique ID for this client
  undoManager?: boolean; // Enable undo/redo (default: false)
  websocketUrl?: string; // WebSocket URL for sync
  roomId?: string; // Room/document ID
}
```

**Returns:**

```typescript
interface EgWalkerProxyResult<T> {
  proxy: T; // The Valtio proxy - mutate this!
  undo: () => void; // Undo last operation
  redo: () => void; // Redo last undone operation
  getPendingOps: () => Operation[]; // Get ops for network sync
  applyRemoteOp: (op: Operation) => void; // Apply remote op
  getFrontier: () => number[]; // Get CRDT frontier
  dispose: () => void; // Clean up resources
}
```

### State Structure

```typescript
interface TextState {
  text: string; // The document text content
  cursor: number; // Current cursor position
  syncing: boolean; // Whether sync is in progress
}
```

## How It Works

### Mutation Flow

1. **Local Change**: User modifies `state.text`
2. **Diff Calculation**: Calculate changes from previous state
3. **CRDT Operations**: Convert diff to CRDT insert/delete ops
4. **Batch**: Buffer operations for efficient network sync
5. **Broadcast**: Send batched operations to peers
6. **Apply**: Peers apply operations and update their proxies

### Remote Operation Flow

1. **Receive**: Get operation from remote peer
2. **Apply to CRDT**: Process operation through eg-walker
3. **Update Proxy**: Sync new CRDT state to Valtio proxy
4. **React Re-render**: Components using `useSnapshot` update

### Conflict Resolution

The eg-walker CRDT automatically resolves conflicts using:

- **FugueMax**: Sequence CRDT for text editing
- **Causal ordering**: Operations applied in causal order
- **Frontier tracking**: Efficient dependency management

No manual conflict resolution needed!

## Examples

### Counter Example (Simple)

```typescript
const { proxy: state } = createEgWalkerProxy({
  agentId: 'user-1',
});

// Initialize with empty text
state.text = '';

// Insert "Hello"
state.text = 'Hello';

// Insert " World"
state.text = 'Hello World';

// All operations automatically tracked and synced
```

### Collaborative Todo List

```typescript
interface TodoState extends TextState {
  todos: string[];
}

const { proxy: state } = createEgWalkerProxy<TodoState>({
  agentId: 'user-1',
  websocketUrl: 'ws://localhost:3000',
  roomId: 'todos',
});

// Add todos
state.text = 'Todo 1\nTodo 2\nTodo 3';

// Parse todos from text
state.todos = state.text.split('\n').filter(Boolean);
```

### Rich Text Editor

```typescript
const { proxy: state, undo, redo } = createEgWalkerProxy({
  agentId: 'user-1',
  undoManager: true,
});

function insertAtCursor(text: string) {
  const cursor = state.cursor;
  state.text =
    state.text.slice(0, cursor) + text + state.text.slice(cursor);
  state.cursor = cursor + text.length;
}

function deleteRange(start: number, end: number) {
  state.text = state.text.slice(0, start) + state.text.slice(end);
  state.cursor = start;
}

// Use with rich text formatting
insertAtCursor('**bold text**');
```

## Performance

### Batching

Operations are automatically batched within the same event loop tick:

```typescript
// These 3 mutations create 1 network message
state.text = 'H';
state.text = 'He';
state.text = 'Hello';
// → Single batch with 5 character inserts
```

### Diff Algorithm

Uses an efficient longest-common-prefix/suffix algorithm:

- O(n) time complexity
- Minimal operations generated
- Smart handling of paste operations

### Memory

- WeakMap for proxy → instance mapping (no leaks)
- Automatic cleanup with `dispose()`
- Efficient CRDT data structures

## Comparison with valtio-y

| Feature                 | valtio-y (Yjs)      | valtio-egwalker (eg-walker) |
| ----------------------- | ------------------- | --------------------------- |
| CRDT Algorithm          | Yjs                 | FugueMax (eg-walker)        |
| Data Types              | Maps, Arrays, Text  | Text (sequence)             |
| Network Protocol        | Yjs sync protocol   | Custom operation sync       |
| Undo/Redo               | ✅ Y.UndoManager    | ✅ Built-in                 |
| React Integration       | ✅ useSnapshot      | ✅ useSnapshot              |
| TypeScript              | ✅                  | ✅                          |
| Natural Mutations       | ✅                  | ✅                          |
| Character-level ops     | Chunked             | Individual characters       |
| MoonBit Implementation  | ❌                  | ✅                          |

## Advanced Topics

### Custom Network Providers

Implement your own sync protocol:

```typescript
class CustomProvider {
  constructor(state, getPendingOps, applyRemoteOp) {
    this.state = state;
    this.getPendingOps = getPendingOps;
    this.applyRemoteOp = applyRemoteOp;

    subscribe(state, () => {
      this.broadcastOps();
    });
  }

  broadcastOps() {
    const ops = this.getPendingOps();
    // Your custom network logic
    this.transport.send(ops);
  }

  receiveOps(ops) {
    ops.forEach((op) => this.applyRemoteOp(op));
  }
}
```

### Persistence

Save and restore CRDT state:

```typescript
// Save frontier and operations
const frontier = getFrontier();
const ops = getAllOperations(); // Implement based on needs

localStorage.setItem('doc-frontier', JSON.stringify(frontier));
localStorage.setItem('doc-ops', JSON.stringify(ops));

// Restore on init
const savedFrontier = JSON.parse(localStorage.getItem('doc-frontier'));
// Apply saved operations through merge_remote
```

## Best Practices

1. **Read from snapshots, mutate proxies**

   ```typescript
   const snap = useSnapshot(state);
   <input value={snap.text} onChange={(e) => (state.text = e.target.value)} />;
   ```

2. **Use `{ sync: true }` for controlled inputs**

   ```typescript
   const snap = useSnapshot(state, { sync: true });
   ```

3. **Batch related changes**

   ```typescript
   // Good: Single event loop tick
   state.text = newText;
   state.cursor = newCursor;

   // Avoid: Async updates create separate batches
   await something();
   state.text = newText; // Separate batch
   ```

4. **Clean up on unmount**

   ```typescript
   useEffect(() => {
     return () => egwalker.dispose();
   }, [egwalker]);
   ```

5. **Character-level awareness**
   - eg-walker operates at character granularity
   - Large pastes split into individual char inserts
   - Consider debouncing for very rapid typing

## Troubleshooting

**Text not syncing?**

- Ensure `init()` was called (handled by `createEgWalkerProxy`)
- Check `is_applying_remote` flag isn't stuck
- Verify WebSocket connection

**Undo/redo not working?**

- Set `undoManager: true` in config
- Check undo stack isn't empty
- Ensure operations are being tracked

**Performance issues?**

- Use operation batching (automatic)
- Profile with React DevTools
- Consider debouncing rapid mutations

## See Also

- [event-graph-walker CRDT](../event-graph-walker)
- [valtio](https://github.com/pmndrs/valtio)
- [valtio-y (Yjs integration)](https://github.com/valtiojs/valtio-y)
- [eg-walker paper](https://arxiv.org/abs/2409.14252)

## License

Apache-2.0
