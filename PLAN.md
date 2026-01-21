# Plan: Fix Undo/Redo Issues in Collaborative Demo

## Problem Summary

Two related bugs in the per-agent undo/redo implementation:

### P2-1: Remote sync pollutes undo history
**File:** `demo-react/src/components/CollaborativeDemo.tsx:74-91`

The sync effect calls `applyRemoteOp()` then directly assigns `egwalker.proxy.text = sharedSnap.text`. The stub's `isApplyingUndo` flag is only `true` during `apply_remote_op`, so the subsequent direct assignment is tracked as a local edit and pushed to the undo stack.

**Result:** Remote changes (Bob typing) become undoable by the local agent (Alice), breaking per-agent undo.

### P2-2: Undo/redo replays stale positions after remote edits
**File:** `valtio/src/egwalker_api_stub.ts:100-118`

`LocalOperation` stores a fixed `position`. When another agent inserts/deletes before that position, `applyInverse`/`applyOperation` target the wrong substring.

**Example:** Alice types "X" at position 5, Bob inserts "AB" at position 0, Alice undoes → deletes at position 5 which is now Bob's content.

---

## Proposed Solution

### Fix 1: Add `suppressUndoTracking` API (Issue P2-1)

Add a method to temporarily disable undo tracking for a block of operations.

**Changes to `egwalker_api_stub.ts`:**

```typescript
// Add to mockValtioEgwalker
set_suppress_undo_tracking: (proxyState: any, suppress: boolean) => {
  const state = agentStateMap.get(proxyState);
  if (state) {
    state.isApplyingUndo = suppress;
    if (!suppress) {
      // When re-enabling, sync lastText to current
      state.lastText = proxyState.text;
    }
  }
}
```

**Changes to `createEgWalkerProxy` return object:**
```typescript
suppressUndoTracking: (suppress: boolean) => {
  set_suppress_undo_tracking(proxyState, suppress);
}
```

**Changes to `CollaborativeDemo.tsx`:**
```typescript
// In the sync effect
if (sharedSnap.text !== egwalker.proxy.text) {
  egwalker.suppressUndoTracking(true);
  egwalker.proxy.text = sharedSnap.text;
  egwalker.suppressUndoTracking(false);
}
```

This removes the need for `applyRemoteOp` workaround since we're directly syncing text.

### Fix 2: Switch to snapshot-based undo (Issue P2-2)

Replace position-based operations with full text snapshots. This is simpler and correct for collaborative editing in a stub/demo context.

**New interface:**
```typescript
interface UndoSnapshot {
  text: string;
  timestamp: number;
}

interface AgentUndoState {
  agentId: string;
  undoStack: UndoSnapshot[];
  redoStack: UndoSnapshot[];
  lastText: string;
  isApplyingUndo: boolean;
}
```

**Simplified undo/redo:**
```typescript
undo: (proxyState: any) => {
  const state = agentStateMap.get(proxyState);
  if (!state || state.undoStack.length === 0) return;

  state.isApplyingUndo = true;
  try {
    // Save current state to redo stack
    state.redoStack.push({ text: proxyState.text, timestamp: Date.now() });

    // Restore previous state
    const snapshot = state.undoStack.pop()!;
    proxyState.text = snapshot.text;
    state.lastText = snapshot.text;
  } finally {
    state.isApplyingUndo = false;
  }
}
```

**Trade-off:** Snapshot-based undo is simpler but uses more memory. For a demo/stub this is acceptable. The real MoonBit implementation will use CRDT identifiers.

---

## Implementation Steps

1. **Update `egwalker_api_stub.ts`:**
   - Change `LocalOperation` to `UndoSnapshot` (snapshot-based)
   - Remove `calculateDiff`, `applyInverse`, `applyOperation`
   - Simplify `undo`/`redo` to snapshot restore
   - Add `set_suppress_undo_tracking` function
   - Update `createEgWalkerProxy` to expose `suppressUndoTracking`

2. **Update `CollaborativeDemo.tsx`:**
   - Remove `applyRemoteOp` call (not needed for text sync)
   - Use `suppressUndoTracking` wrapper around remote text sync
   - Remove `isApplyingRemote` ref (no longer needed)

3. **Update TypeScript types** (if separate file exists):
   - Add `suppressUndoTracking` to `EgWalkerProxyResult` interface

4. **Test manually:**
   - Alice types "Hello", Bob types " World"
   - Alice undoes → should only remove Alice's last character
   - Bob's changes should remain intact

---

## Files to Modify

1. `valtio/src/egwalker_api_stub.ts` - Main fixes
2. `demo-react/src/components/CollaborativeDemo.tsx` - Use new API
3. `valtio/src/egwalker_api.ts` - Add type for `suppressUndoTracking` (if interface defined here)

---

## Alternative Considered

**Operation rebasing:** Transform stored operations when remote ops arrive. This is the academically correct approach but complex to implement correctly. Since this is a development stub and the real implementation uses MoonBit with proper CRDT identifiers, snapshot-based undo is the pragmatic choice.
