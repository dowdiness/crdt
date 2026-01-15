# Integration Patterns

## Architecture

```
React UI → Valtio Proxy → EgWalkerProxy → CRDT Document → Network
```

## Basic Pattern

```typescript
import { createEgWalkerProxy } from 'valtio-egwalker/stub';
import { useSnapshot } from 'valtio';

const { proxy: state, undo, redo, dispose } = createEgWalkerProxy({
  agentId: 'user-1',
  undoManager: true,
});

function Editor() {
  const snap = useSnapshot(state, { sync: true });
  return <textarea value={snap.text} onChange={e => state.text = e.target.value} />;
}
```

## Collaboration

```typescript
const { proxy, getPendingOps, applyRemoteOp } = createEgWalkerProxy({
  agentId: 'user-1',
  websocketUrl: 'ws://localhost:3000',
  roomId: 'doc-id',
});

// Manual sync (if not using websocketUrl):
subscribe(proxy, () => {
  const ops = getPendingOps();
  ws.send(JSON.stringify(ops));
});

ws.onmessage = (e) => {
  const op = JSON.parse(e.data);
  applyRemoteOp(op);
};
```

## Cursor Sync

```typescript
interface ExtendedState extends TextState {
  remoteCursors: Record<string, number>;
}

const { proxy } = createEgWalkerProxy<ExtendedState>({ ... });

// Track local cursor
proxy.cursor = textarea.selectionStart;

// Display remote cursors
snap.remoteCursors[userId] // → cursor position
```

## Presence

```typescript
// Broadcast presence
const presence = {
  userId: 'user-1',
  cursor: proxy.cursor,
  selection: { start: 0, end: 5 },
};
ws.send(JSON.stringify({ type: 'presence', ...presence }));
```

## Error Handling

```typescript
try {
  applyRemoteOp(remoteOp);
} catch (err) {
  console.error('Failed to apply remote op:', err);
  // Optionally re-sync from server
}
```

## Performance

**Batch updates:**
```typescript
startTransition(() => {
  for (const op of operations) {
    applyRemoteOp(op);
  }
});
```

**Throttle network sync:**
```typescript
const throttledSync = throttle(() => {
  const ops = getPendingOps();
  ws.send(JSON.stringify(ops));
}, 100);

subscribe(proxy, throttledSync);
```

## Testing

```typescript
import { createEgWalkerProxy } from 'valtio-egwalker/stub';

test('text editing', () => {
  const { proxy } = createEgWalkerProxy({ agentId: 'test' });
  proxy.text = 'hello';
  expect(proxy.text).toBe('hello');
});
```

## See Also

- [Setup Guide](SETUP.md) - Installation and imports
- [API Reference](../reference/api-reference.md) - Full API
