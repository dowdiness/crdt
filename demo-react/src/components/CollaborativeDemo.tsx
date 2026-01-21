// CollaborativeDemo Component
//
// Demonstrates CRDT collaboration with per-agent undo/redo.
// Each editor has its own undo stack - undo only affects local changes.

import { useState, useEffect, useCallback, useRef } from 'react';
import { useSnapshot } from 'valtio';
import { proxy, subscribe } from 'valtio/vanilla';
import {
  createEgWalkerProxy,
  type TextState,
  type EgWalkerProxyResult,
} from 'valtio-egwalker/stub';

/**
 * Operations log for visualization
 */
interface OperationLog {
  agentId: string;
  type: 'insert' | 'delete' | 'undo' | 'redo';
  content?: string;
  timestamp: number;
}

// Shared operations log (for visualization)
const opsLog = proxy<{ operations: OperationLog[] }>({
  operations: [],
});

// Shared document state (simulating CRDT sync layer)
const sharedDoc = proxy<{ text: string }>({
  text: '',
});

interface EditorPanelProps {
  agentId: string;
  color: string;
}

function EditorPanel({ agentId, color }: EditorPanelProps) {
  // Each editor has its own egwalker proxy with per-agent undo/redo
  const [egwalker] = useState<EgWalkerProxyResult<TextState> & {
    getUndoStackSize?: () => number;
    getRedoStackSize?: () => number;
    suppressUndoTracking?: (suppress: boolean) => void;
  }>(() =>
    createEgWalkerProxy<TextState>({
      agentId,
      undoManager: true,
    })
  );

  // Track undo/redo stack sizes in state for reactivity
  const [undoSize, setUndoSize] = useState(0);
  const [redoSize, setRedoSize] = useState(0);

  // Use snapshot for reactive rendering
  const snap = useSnapshot(egwalker.proxy, { sync: true });
  const sharedSnap = useSnapshot(sharedDoc);

  // Update stack sizes when text changes
  useEffect(() => {
    setUndoSize(egwalker.getUndoStackSize?.() ?? 0);
    setRedoSize(egwalker.getRedoStackSize?.() ?? 0);
  }, [snap.text, egwalker]);

  // Track if we're applying remote changes (to prevent sync loops)
  const isApplyingRemote = useRef(false);

  // Sync shared doc -> local proxy (when other agent changes)
  useEffect(() => {
    if (isApplyingRemote.current) return;

    // Only sync if text differs and this wasn't our change
    if (sharedSnap.text !== egwalker.proxy.text) {
      isApplyingRemote.current = true;

      // Apply remote text without adding to undo stack
      // suppressUndoTracking ensures this change isn't tracked as local
      egwalker.suppressUndoTracking?.(true);
      egwalker.proxy.text = sharedSnap.text;
      egwalker.suppressUndoTracking?.(false);

      setTimeout(() => {
        isApplyingRemote.current = false;
      }, 0);
    }
  }, [sharedSnap.text, egwalker]);

  // Sync local proxy -> shared doc (when this agent changes)
  useEffect(() => {
    const unsubscribe = subscribe(egwalker.proxy, () => {
      if (!isApplyingRemote.current && egwalker.proxy.text !== sharedDoc.text) {
        sharedDoc.text = egwalker.proxy.text;
      }
    });
    return unsubscribe;
  }, [egwalker]);

  // Handle text changes (local edits)
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newText = e.target.value;
      const oldText = egwalker.proxy.text;

      egwalker.proxy.text = newText;
      egwalker.proxy.cursor = e.target.selectionStart || 0;

      // Log operation
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

      // Keep log size manageable
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

  // Undo - only undoes THIS agent's changes
  const handleUndo = useCallback(() => {
    egwalker.undo();
    // Update stack sizes after undo
    setUndoSize(egwalker.getUndoStackSize?.() ?? 0);
    setRedoSize(egwalker.getRedoStackSize?.() ?? 0);
    opsLog.operations.push({
      agentId,
      type: 'undo',
      timestamp: Date.now(),
    });
    if (opsLog.operations.length > 15) {
      opsLog.operations.shift();
    }
  }, [agentId, egwalker]);

  // Redo - only redoes THIS agent's changes
  const handleRedo = useCallback(() => {
    egwalker.redo();
    // Update stack sizes after redo
    setUndoSize(egwalker.getUndoStackSize?.() ?? 0);
    setRedoSize(egwalker.getRedoStackSize?.() ?? 0);
    opsLog.operations.push({
      agentId,
      type: 'redo',
      timestamp: Date.now(),
    });
    if (opsLog.operations.length > 15) {
      opsLog.operations.shift();
    }
  }, [agentId, egwalker]);

  // Cleanup
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
        placeholder={`${agentId}'s editor - type here...`}
        spellCheck={false}
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
  const logSnap = useSnapshot(opsLog);
  const sharedSnap = useSnapshot(sharedDoc);

  // Reset
  const handleReset = useCallback(() => {
    sharedDoc.text = '';
    opsLog.operations = [];
  }, []);

  // Load example
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
        <span className="shared-label">Shared Document:</span>
        <code className="shared-text">
          {sharedSnap.text || '(empty)'}
        </code>
      </div>

      <div className="editors-container">
        <EditorPanel agentId="Alice" color="#4ec9b0" />
        <EditorPanel agentId="Bob" color="#ce9178" />
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
          In the real eg-walker CRDT, this is handled by tracking operations
          per-agent and selectively inverting only that agent's operations
          during undo, while preserving causally concurrent operations from
          other agents.
        </p>
      </div>
    </div>
  );
}
