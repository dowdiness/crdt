# valtio-egwalker Docs

Valtio + event-graph-walker CRDT integration in MoonBit.

## Quick Start

**Development (stub):**
```typescript
import { createEgWalkerProxy } from 'valtio-egwalker/stub';
const { proxy, undo, redo } = createEgWalkerProxy({ agentId: 'user-1', undoManager: true });
```

**Production:**
```typescript
import { createEgWalkerProxy } from 'valtio-egwalker/sync';  // For bundlers
import { createEgWalkerProxy } from 'valtio-egwalker';       // For Node.js (async)
```

## Documentation

- **[Setup Guide](guides/SETUP.md)** - Installation, imports, TypeScript configuration
- **[Integration Guide](guides/INTEGRATION.md)** - Usage patterns, collaboration, testing
- **[API Reference](reference/api-reference.md)** - Types, methods, configuration
- **[Architecture](development/ARCHITECTURE.md)** - MoonBit library vs app
- **[Build Guide](development/BUILD.md)** - Compile to JavaScript

## Config

```typescript
createEgWalkerProxy({
  agentId: string,           // Required: client ID
  undoManager?: boolean,     // Enable undo/redo
  websocketUrl?: string,     // For collaboration
  roomId?: string            // Document ID
})
```

## Methods

```typescript
{
  proxy: T,                          // Mutate for changes
  undo: () => void,
  redo: () => void,
  getPendingOps: () => Operation[],
  applyRemoteOp: (op) => void,
  getFrontier: () => number[],
  dispose: () => void
}
```

## React

```typescript
import { useSnapshot } from 'valtio';
const snap = useSnapshot(state, { sync: true });
<input value={snap.text} onChange={e => state.text = e.target.value} />
```

## Build

Library: `moon build --target js` (creates .core files)
Application: Create app with dependencies, then build (creates .js)

See [Build Guide](development/BUILD.md) for details.

## See Also

- [Main README](../README.md) - Project overview
- [Project Summary](development/project-summary.md) - Development history
