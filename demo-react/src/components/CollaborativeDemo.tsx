// CollaborativeDemo Component
//
// Demonstrates CRDT collaboration with per-agent undo/redo.
// Supports both local sync (default) and WebSocket sync (when server is running).
// Each editor has its own undo stack - undo only affects local changes.

import { useState, useEffect, useCallback, useRef } from 'react';
import { useSnapshot } from 'valtio';
import { proxy, subscribe } from 'valtio/vanilla';
import {
  createEgWalkerProxy,
  type TextState,
  type EgWalkerProxyResult,
} from 'valtio-egwalker/stub';

type ExtendedEgWalkerResult = EgWalkerProxyResult<TextState> & {
  getUndoStackSize?: () => number;
  getRedoStackSize?: () => number;
  suppressUndoTracking?: (suppress: boolean) => void;
};

interface OperationLog {
  agentId: string;
  type: 'insert' | 'delete' | 'undo' | 'redo' | 'sync';
  content?: string;
  timestamp: number;
}

const opsLog = proxy<{ operations: OperationLog[] }>({
  operations: [],
});

const sharedDoc = proxy<{ text: string }>({
  text: '',
});

const WS_URL = 'ws://localhost:8787';
const ROOM_ID = 'demo-room';

interface EditorPanelProps {
  agentId: string;
  color: string;
  useWebSocket?: boolean;
}

function EditorPanel({ agentId, color, useWebSocket = false }: EditorPanelProps) {
  const [egwalker] = useState<ExtendedEgWalkerResult>(() =>
    createEgWalkerProxy<TextState>({
      agentId,
      undoManager: true,
      ...(useWebSocket ? { websocketUrl: WS_URL, roomId: ROOM_ID } : {}),
    }) as ExtendedEgWalkerResult
  );

  const [undoSize, setUndoSize] = useState(0);
  const [redoSize, setRedoSize] = useState(0);

  const snap = useSnapshot(egwalker.proxy, { sync: true });
  const sharedSnap = useSnapshot(sharedDoc);

  const updateUndoRedoState = useCallback(() => {
    setUndoSize(egwalker.getUndoStackSize?.() ?? 0);
    setRedoSize(egwalker.getRedoStackSize?.() ?? 0);
  }, [egwalker]);

  useEffect(() => {
    updateUndoRedoState();
  }, [snap.text, updateUndoRedoState]);

  // Use a counter instead of boolean flag to handle nested/concurrent updates
  const syncDepth = useRef(0);
  // Track the last text we synced to avoid redundant updates
  const lastSyncedText = useRef(egwalker.proxy.text);

  // Sync shared doc -> local proxy (when other agent changes)
  useEffect(() => {
    if (useWebSocket) return;

    // Skip if we're in the middle of a sync operation
    if (syncDepth.current > 0) return;

    const remoteText = sharedSnap.text;
    // Only sync if text actually differs and isn't our last synced value
    if (remoteText !== egwalker.proxy.text && remoteText !== lastSyncedText.current) {
      syncDepth.current++;
      try {
        egwalker.suppressUndoTracking?.(true);
        egwalker.proxy.text = remoteText;
        lastSyncedText.current = remoteText;
      } finally {
        egwalker.suppressUndoTracking?.(false);
        // Use queueMicrotask for more reliable async reset than setTimeout
        queueMicrotask(() => {
          syncDepth.current = Math.max(0, syncDepth.current - 1);
        });
      }
    }
  }, [sharedSnap.text, egwalker, useWebSocket]);

  // Sync local proxy -> shared doc (when this agent changes)
  useEffect(() => {
    if (useWebSocket) return;

    const unsubscribe = subscribe(egwalker.proxy, () => {
      // Only propagate if not syncing and text actually changed
      if (syncDepth.current === 0 && egwalker.proxy.text !== sharedDoc.text) {
        lastSyncedText.current = egwalker.proxy.text;
        sharedDoc.text = egwalker.proxy.text;
      }
    });
    return unsubscribe;
  }, [egwalker, useWebSocket]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newText = e.target.value;
      const oldText = egwalker.proxy.text;

      egwalker.proxy.text = newText;
      egwalker.proxy.cursor = e.target.selectionStart || 0;

      if (newText.length > oldText.length) {
        const diff = newText.length - oldText.length;
        opsLog.operations.push({
          agentId,
          type: 'insert',
          content: diff <= 5 ? newText.slice(-diff) : `+${diff} chars`,
          timestamp: Date.now(),
        });
      } else if (newText.length < oldText.length) {
        opsLog.operations.push({
          agentId,
          type: 'delete',
          content: `${oldText.length - newText.length} chars`,
          timestamp: Date.now(),
        });
      }

      if (opsLog.operations.length > 15) {
        opsLog.operations.shift();
      }
    },
    [agentId, egwalker]
  );

  const handleSelect = useCallback(
    (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
      egwalker.proxy.cursor = e.currentTarget.selectionStart || 0;
    },
    [egwalker]
  );

  const handleUndo = useCallback(() => {
    egwalker.undo();
    updateUndoRedoState();
    opsLog.operations.push({
      agentId,
      type: 'undo',
      timestamp: Date.now(),
    });
    if (opsLog.operations.length > 15) {
      opsLog.operations.shift();
    }
  }, [agentId, egwalker, updateUndoRedoState]);

  const handleRedo = useCallback(() => {
    egwalker.redo();
    updateUndoRedoState();
    opsLog.operations.push({
      agentId,
      type: 'redo',
      timestamp: Date.now(),
    });
    if (opsLog.operations.length > 15) {
      opsLog.operations.shift();
    }
  }, [agentId, egwalker, updateUndoRedoState]);

  // Keyboard shortcuts for undo/redo
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      // Undo: Ctrl/Cmd + Z
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        handleUndo();
      }
      // Redo: Ctrl/Cmd + Shift + Z or Ctrl/Cmd + Y
      if (
        ((e.ctrlKey || e.metaKey) && e.key === 'z' && e.shiftKey) ||
        ((e.ctrlKey || e.metaKey) && e.key === 'y')
      ) {
        e.preventDefault();
        handleRedo();
      }
    },
    [handleUndo, handleRedo]
  );

  useEffect(() => {
    return () => egwalker.dispose();
  }, [egwalker]);

  return (
    <div className="editor-panel" style={{ borderColor: color }}>
      <div className="panel-header" style={{ backgroundColor: color }}>
        <span className="panel-title">{agentId}</span>
        <span className="panel-cursor">Cursor: {snap.cursor}</span>
      </div>
      <textarea
        className="panel-textarea"
        value={snap.text}
        onChange={handleChange}
        onSelect={handleSelect}
        onKeyDown={handleKeyDown}
        placeholder={`${agentId}'s editor - type here...`}
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
      />
      <div className="panel-status">
        <span>Chars: {snap.text.length}</span>
        <div className="panel-undo-controls">
          <button
            className="panel-undo-btn"
            onClick={handleUndo}
            disabled={undoSize === 0}
            title={`Undo ${agentId}'s changes (${undoSize})`}
          >
            Undo ({undoSize})
          </button>
          <button
            className="panel-undo-btn"
            onClick={handleRedo}
            disabled={redoSize === 0}
            title={`Redo ${agentId}'s changes (${redoSize})`}
          >
            Redo ({redoSize})
          </button>
        </div>
      </div>
    </div>
  );
}

export function CollaborativeDemo() {
  const [useWebSocket, setUseWebSocket] = useState(false);
  const [wsStatus, setWsStatus] = useState<'unknown' | 'connected' | 'disconnected'>('unknown');
  const logSnap = useSnapshot(opsLog);
  const sharedSnap = useSnapshot(sharedDoc);

  // Check WebSocket server availability with timeout
  useEffect(() => {
    let ws: WebSocket | null = null;
    let timeoutId: ReturnType<typeof setTimeout>;

    const checkServer = () => {
      ws = new WebSocket(WS_URL);

      // Timeout after 2 seconds if no response
      timeoutId = setTimeout(() => {
        if (ws && ws.readyState !== WebSocket.OPEN) {
          ws.close();
          setWsStatus('disconnected');
        }
      }, 2000);

      ws.onopen = () => {
        clearTimeout(timeoutId);
        setWsStatus('connected');
        ws?.close();
      };

      ws.onerror = () => {
        clearTimeout(timeoutId);
        setWsStatus('disconnected');
      };
    };

    checkServer();

    return () => {
      clearTimeout(timeoutId);
      ws?.close();
    };
  }, []);

  const handleReset = useCallback(() => {
    sharedDoc.text = '';
    opsLog.operations = [];
  }, []);

  const handleLoadExample = useCallback(() => {
    sharedDoc.text = '(\\x.\\y.x + y) 10 5';
    opsLog.operations = [];
  }, []);

  return (
    <div className="collaborative-demo">
      <div className="demo-header">
        <h2>Per-Agent Undo/Redo Demo</h2>
        <p className="demo-description">
          Each editor has its own undo/redo stack. Alice's undo only undoes
          Alice's changes, not Bob's. This is how real collaborative editors work.
        </p>

        <div className="sync-mode-toggle">
          <label>
            <input
              type="checkbox"
              checked={useWebSocket}
              onChange={(e) => setUseWebSocket(e.target.checked)}
              disabled={wsStatus === 'disconnected'}
            />
            {' '}Use WebSocket Sync
            {wsStatus === 'connected' && <span className="ws-status connected"> (Server Online)</span>}
            {wsStatus === 'disconnected' && <span className="ws-status disconnected"> (Server Offline - run `npm run server`)</span>}
          </label>
        </div>

        <div className="demo-controls">
          <button className="demo-btn" onClick={handleLoadExample}>
            Load Example
          </button>
          <button className="demo-btn demo-btn-secondary" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>

      <div className="shared-doc-info">
        <span className="shared-label">
          {useWebSocket ? 'Sync Mode: WebSocket' : 'Sync Mode: Local Valtio'}
        </span>
        <code className="shared-text">
          {sharedSnap.text || '(empty)'}
        </code>
      </div>

      <div className="editors-container" key={useWebSocket ? 'ws' : 'local'}>
        <EditorPanel agentId="Alice" color="#4ec9b0" useWebSocket={useWebSocket} />
        <EditorPanel agentId="Bob" color="#ce9178" useWebSocket={useWebSocket} />
      </div>

      <div className="operations-log">
        <h3>Operations Log</h3>
        <div className="log-container">
          {logSnap.operations.length === 0 ? (
            <p className="log-empty">No operations yet. Start typing!</p>
          ) : (
            <ul className="log-list">
              {logSnap.operations.slice(-10).map((op, i) => (
                <li key={i} className={`log-item log-${op.type}`}>
                  <span className="log-agent">{op.agentId}</span>
                  <span className="log-type">{op.type}</span>
                  {op.content && (
                    <span className="log-content">{op.content}</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="demo-info">
        <h3>How Per-Agent Undo Works</h3>
        <ol className="demo-steps">
          <li>Alice types "Hello" → Alice's undo stack: [H, e, l, l, o]</li>
          <li>Bob types " World" → Bob's undo stack: [ , W, o, r, l, d]</li>
          <li>Alice presses Undo → Removes "o" (Alice's last change)</li>
          <li>Document shows "Hell World" (Bob's changes preserved)</li>
        </ol>
        <p className="demo-note">
          {useWebSocket
            ? 'WebSocket mode: Operations sync via ws://localhost:8787 relay server.'
            : 'Local mode: Operations sync via shared Valtio proxy (same browser tab only).'}
        </p>
      </div>
    </div>
  );
}
