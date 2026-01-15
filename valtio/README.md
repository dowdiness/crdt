# valtio-egwalker

Valtio integration for [event-graph-walker](../event-graph-walker) CRDT - reactive state management meets distributed text editing.

Inspired by [valtio-y](https://github.com/valtiojs/valtio-y) but designed specifically for the eg-walker sequence CRDT algorithm.

## Features

- 🔄 **Bidirectional Sync**: Valtio proxy ↔️ CRDT document
- 🚀 **Natural Mutations**: Change state like normal JavaScript objects  
- 📦 **Operation Batching**: Efficient network sync
- ⏱️ **Undo/Redo**: Built-in history management
- 🌐 **Network Sync**: WebSocket integration for collaboration
- ⚛️ **React Ready**: Works seamlessly with `useSnapshot`
- 📘 **TypeScript**: Full type safety
- 🎯 **ES Modules**: Modern import/export syntax

## Installation

```bash
npm install valtio valtio-egwalker
```

## Quick Start

### For Development/Testing (Stub)

Use this to develop your UI without building MoonBit:

```typescript
import { createEgWalkerProxy } from 'valtio-egwalker/stub';
import { useSnapshot } from 'valtio';

function Editor() {
  const [egwalker] = useState(() =>
    createEgWalkerProxy({
      agentId: 'user-123',
      undoManager: true,
    })
  );

  const snap = useSnapshot(egwalker.proxy);

  return (
    <textarea
      value={snap.text}
      onChange={(e) => (egwalker.proxy.text = e.target.value)}
    />
  );
}
```

⚠️ **Note:** The stub provides the API but no real CRDT functionality. For production, build a MoonBit application.

### For Production (MoonBit Application)

See [TypeScript Usage Guide](docs/guides/TYPESCRIPT_USAGE.md) for complete instructions on building with MoonBit.

## Documentation

📚 **[Complete Documentation](docs/)** - Guides, API reference, and development docs

### Quick Links

- **[API Reference](docs/reference/api-reference.md)** - Complete API documentation
- **[TypeScript Guide](docs/guides/TYPESCRIPT_USAGE.md)** - Setting up TypeScript
- **[ES Modules Guide](docs/guides/ES_MODULES.md)** - Using ES modules
- **[Integration Guide](docs/guides/INTEGRATION.md)** - Integration patterns
- **[Architecture](docs/development/ARCHITECTURE.md)** - How it works
- **[Build Guide](docs/development/BUILD.md)** - Building from source
- **[Examples](src/egwalker_example.tsx)** - React component examples

## API Overview

### Configuration

```typescript
interface EgWalkerProxyConfig {
  agentId: string;              // Unique client ID
  undoManager?: boolean;        // Enable undo/redo (default: false)
  websocketUrl?: string;        // WebSocket URL for sync
  roomId?: string;              // Room/document ID
}
```

### Return Value

```typescript
interface EgWalkerProxyResult<T> {
  proxy: T;                     // The Valtio proxy - mutate this!
  undo: () => void;             // Undo last operation
  redo: () => void;             // Redo last undone operation
  getPendingOps: () => Operation[];  // Get ops for network sync
  applyRemoteOp: (op: Operation) => void;  // Apply remote op
  getFrontier: () => number[];  // Get CRDT frontier
  dispose: () => void;          // Clean up resources
}
```

## Usage Patterns

### Basic Text Editing

```typescript
const { proxy: state } = await createEgWalkerProxy({
  agentId: 'user-1',
});

state.text = 'Hello';
state.text = 'Hello, world!';
```

### With Undo/Redo

```typescript
const { proxy: state, undo, redo } = await createEgWalkerProxy({
  agentId: 'user-1',
  undoManager: true,
});

state.text = 'Hello';
undo();  // Back to ""
redo();  // Forward to "Hello"
```

### Collaborative Editing

```typescript
const { proxy: state } = await createEgWalkerProxy({
  agentId: 'user-1',
  websocketUrl: 'ws://localhost:3000',
  roomId: 'document-id',
});

// Changes automatically sync across clients!
state.text = 'Collaborative editing!';
```

## Building from Source

**Important:** This is a MoonBit **library**, not a standalone application. It must be used within a MoonBit application that links it with the event-graph-walker CRDT.

### Quick Build (Library Only)

```bash
moon build --target js
```

This creates `.core` files but NOT standalone JavaScript.

### Full Application Build

To get usable JavaScript, create an application that uses this library:

1. **Create an application directory:**

```bash
mkdir -p example-app/main
```

2. **Set up dependencies:**

```json
// example-app/moon.mod.json
{
  "name": "example-app",
  "deps": {
    "antisatori/valtio": { "path": "../valtio" },
    "dowdiness/event-graph-walker": { "path": "../event-graph-walker" }
  }
}
```

3. **Write glue code:**

```moonbit
// example-app/main/main.mbt
pub fn create_editor(agent_id : String) -> @valtio.ValtioProxy {
  let proxy = @valtio.EgWalkerProxy::new(agent_id, undo_enabled=true)
  proxy.init()
  proxy.proxy_state
}
```

4. **Build the application:**

```bash
cd example-app
moon build --target js
```

Now you have a usable JavaScript bundle at `example-app/target/js/release/build/example-app/example-app.js`.

See [Architecture](docs/development/ARCHITECTURE.md) and [Build Guide](docs/development/BUILD.md) for complete details.

## Architecture

```
React Component
       ↓
Valtio Proxy (reactive state)
       ↓
EgWalkerProxy (MoonBit)
       ↓
event-graph-walker CRDT
       ↓
Network Layer
```

## Comparison with valtio-y

| Feature           | valtio-y (Yjs)  | valtio-egwalker         |
|-------------------|-----------------|-------------------------|
| CRDT Algorithm    | Yjs             | FugueMax (eg-walker)    |
| Data Types        | Maps, Arrays    | Text (sequence)         |
| Language          | JavaScript      | MoonBit + TypeScript    |
| Undo/Redo         | ✅              | ✅                      |
| React Integration | ✅              | ✅                      |
| Natural Mutations | ✅              | ✅                      |

## Best Practices

1. **Read from snapshots, mutate proxies**
   ```typescript
   const snap = useSnapshot(state);
   <input value={snap.text} onChange={(e) => (state.text = e.target.value)} />
   ```

2. **Use `{ sync: true }` for controlled inputs**
   ```typescript
   const snap = useSnapshot(state, { sync: true });
   ```

3. **Clean up on unmount**
   ```typescript
   useEffect(() => {
     return () => egwalker.dispose();
   }, [egwalker]);
   ```

## License

Apache-2.0

## Links

- [event-graph-walker CRDT](../event-graph-walker)
- [Valtio](https://github.com/pmndrs/valtio)
- [valtio-y](https://github.com/valtiojs/valtio-y)
- [eg-walker paper](https://arxiv.org/abs/2409.14252)
