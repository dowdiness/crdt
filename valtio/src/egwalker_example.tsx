// React Example: Collaborative Text Editor with valtio-egwalker
//
// Similar to valtio-y examples but using event-graph-walker CRDT

import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import { createEgWalkerProxy as createEgWalkerProxyStub, type TextState } from './egwalker_api_stub';

/**
 * Basic text editor with CRDT synchronization (using stub)
 *
 * To use the real implementation, await the async version:
 * ```tsx
 * import { createEgWalkerProxy } from './egwalker_api';
 *
 * const [egwalker, setEgwalker] = useState(null);
 * useEffect(() => {
 *   createEgWalkerProxy({...}).then(setEgwalker);
 * }, []);
 * ```
 */
export function CollaborativeTextEditor() {
  const [egwalker] = useState(() =>
    createEgWalkerProxyStub<TextState>({
      agentId: `user-${Math.random().toString(36).slice(2)}`,
      undoManager: true,
      websocketUrl: 'ws://localhost:3000',
      roomId: 'demo-room',
    })
  );

  // Read from snapshot, mutate proxy
  const snap = useSnapshot(egwalker.proxy, { sync: true });

  // Cleanup on unmount
  useEffect(() => {
    return () => egwalker.dispose();
  }, [egwalker]);

  return (
    <div className="editor">
      <div className="toolbar">
        <button onClick={() => egwalker.undo()}>Undo</button>
        <button onClick={() => egwalker.redo()}>Redo</button>
        {snap.syncing && <span className="syncing">Syncing...</span>}
      </div>

      <textarea
        value={snap.text}
        onChange={(e) => {
          // Mutate the proxy naturally
          egwalker.proxy.text = e.target.value;
          egwalker.proxy.cursor = e.target.selectionStart || 0;
        }}
        placeholder="Start typing..."
        rows={20}
        cols={80}
      />

      <div className="status">
        <p>Characters: {snap.text.length}</p>
        <p>Cursor: {snap.cursor}</p>
      </div>
    </div>
  );
}

/**
 * Simple example without network sync
 */
export function LocalTextEditor() {
  const [egwalker] = useState(() =>
    createEgWalkerProxyStub<TextState>({
      agentId: 'local-user',
      undoManager: true,
    })
  );

  const snap = useSnapshot(egwalker.proxy);

  return (
    <div>
      <textarea
        value={snap.text}
        onChange={(e) => {
          egwalker.proxy.text = e.target.value;
        }}
      />
      <div>
        <button onClick={() => egwalker.undo()}>Undo</button>
        <button onClick={() => egwalker.redo()}>Redo</button>
      </div>
    </div>
  );
}

/**
 * Advanced example with custom operations
 */
export function AdvancedEditor() {
  const [egwalker] = useState(() =>
    createEgWalkerProxyStub<TextState>({
      agentId: 'advanced-user',
      undoManager: true,
    })
  );

  const snap = useSnapshot(egwalker.proxy);

  // Insert text at cursor
  const insertAtCursor = (text: string) => {
    const cursor = egwalker.proxy.cursor;
    const current = egwalker.proxy.text;
    egwalker.proxy.text =
      current.slice(0, cursor) + text + current.slice(cursor);
    egwalker.proxy.cursor = cursor + text.length;
  };

  // Delete selection
  const deleteSelection = (start: number, end: number) => {
    const current = egwalker.proxy.text;
    egwalker.proxy.text = current.slice(0, start) + current.slice(end);
    egwalker.proxy.cursor = start;
  };

  return (
    <div>
      <div>
        <button onClick={() => insertAtCursor('Hello, ')}>
          Insert "Hello, "
        </button>
        <button onClick={() => insertAtCursor('World!')}>
          Insert "World!"
        </button>
        <button onClick={() => egwalker.undo()}>Undo</button>
        <button onClick={() => egwalker.redo()}>Redo</button>
      </div>

      <textarea
        value={snap.text}
        onChange={(e) => {
          egwalker.proxy.text = e.target.value;
        }}
        onSelect={(e) => {
          egwalker.proxy.cursor = e.currentTarget.selectionStart || 0;
        }}
      />

      <div>
        <p>Text: {snap.text}</p>
        <p>Cursor: {snap.cursor}</p>
      </div>
    </div>
  );
}

/**
 * Example with manual operation sync (no WebSocket)
 */
export function ManualSyncEditor() {
  const [egwalker] = useState(() =>
    createEgWalkerProxyStub<TextState>({
      agentId: 'manual-user',
    })
  );

  const snap = useSnapshot(egwalker.proxy);

  // Manually broadcast operations
  const broadcastChanges = () => {
    const ops = egwalker.getPendingOps();
    const frontier = egwalker.getFrontier();

    console.log('Broadcasting operations:', ops);
    console.log('Current frontier:', frontier);

    // Send ops to server/peers
    // fetch('/api/broadcast', {
    //   method: 'POST',
    //   body: JSON.stringify({ ops, frontier })
    // });
  };

  // Manually apply remote operation
  const applyRemoteOp = (op: any) => {
    egwalker.applyRemoteOp(op);
  };

  return (
    <div>
      <textarea
        value={snap.text}
        onChange={(e) => {
          egwalker.proxy.text = e.target.value;
        }}
      />
      <button onClick={broadcastChanges}>Broadcast Changes</button>
    </div>
  );
}
