# Setup Guide

## Installation

```bash
npm install valtio valtio-egwalker
```

## Import Options

### Stub (Development)
```typescript
import { createEgWalkerProxy } from 'valtio-egwalker/stub';
```
- No MoonBit build needed
- Same API, no CRDT functionality
- Logs warnings

### Sync (Bundlers)
```typescript
import { createEgWalkerProxy } from 'valtio-egwalker/sync';
```
- For Vite, Webpack, etc.
- Requires MoonBit build

### Async (Node.js)
```typescript
import { createEgWalkerProxy } from 'valtio-egwalker';
const result = await createEgWalkerProxy({ ... });
```
- Dynamic import
- Requires MoonBit build

## TypeScript Errors

**Error:** `Cannot find module '../target/js/release/build/valtio/valtio.js'`

**Solution:** Use stub for development, or build MoonBit application:

```bash
# Create app
mkdir example-app && cd example-app

# Add moon.mod.json with dependencies:
{
  "name": "example-app",
  "deps": {
    "antisatori/valtio": { "path": "../valtio" },
    "dowdiness/event-graph-walker": { "path": "../event-graph-walker" }
  }
}

# Build
moon build --target js
```

Output: `target/js/release/build/example-app/example-app.js`

## Type Declarations

The `src/moonbit-runtime.d.ts` suppresses module errors during development. TypeScript will compile successfully even without the MoonBit runtime.

## React Setup

```typescript
import { createEgWalkerProxy } from 'valtio-egwalker/stub';
import { useSnapshot } from 'valtio';
import { useState, useEffect } from 'react';

function Editor() {
  const [egwalker] = useState(() =>
    createEgWalkerProxy({ agentId: 'user-1', undoManager: true })
  );
  const snap = useSnapshot(egwalker.proxy, { sync: true });

  useEffect(() => () => egwalker.dispose(), [egwalker]);

  return (
    <>
      <textarea
        value={snap.text}
        onChange={e => egwalker.proxy.text = e.target.value}
      />
      <button onClick={egwalker.undo}>Undo</button>
      <button onClick={egwalker.redo}>Redo</button>
    </>
  );
}
```

## Choosing an Import

| Scenario | Use |
|----------|-----|
| UI development | `stub` |
| Vite/Webpack | `sync` |
| Node.js | default (async) |
| Testing | `stub` |
| Production | `sync` or async |

## Next Steps

- See [API Reference](../reference/api-reference.md) for full API
- See [Build Guide](../development/BUILD.md) for MoonBit compilation
