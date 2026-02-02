// EditorPanel — a single agent's editor within the collaborative demo.

import { useEffect, useCallback, useRef } from 'react';
import { useSnapshot } from 'valtio';
import { subscribe } from 'valtio/vanilla';
import { useEgWalker } from '../editor';
import { sharedDoc, logOperation, WS_URL, ROOM_ID } from './store';

interface EditorPanelProps {
  agentId: string;
  color: string;
  useWebSocket?: boolean;
}

export function EditorPanel({ agentId, color, useWebSocket = false }: EditorPanelProps) {
  const { snap, proxy: editorProxy, canUndo, canRedo, undo, redo, withoutUndo } = useEgWalker({
    agentId,
    ...(useWebSocket ? { websocketUrl: WS_URL, roomId: ROOM_ID } : {}),
  });

  const sharedSnap = useSnapshot(sharedDoc);

  // Use a counter instead of boolean flag to handle nested/concurrent updates
  const syncDepth = useRef(0);
  // Track the last text we synced to avoid redundant updates
  const lastSyncedText = useRef(editorProxy.text);

  // Sync shared doc -> local proxy (when other agent changes)
  useEffect(() => {
    if (useWebSocket) return;

    // Skip if we're in the middle of a sync operation
    if (syncDepth.current > 0) return;

    const remoteText = sharedSnap.text;
    // Only sync if text actually differs and isn't our last synced value
    if (remoteText !== editorProxy.text && remoteText !== lastSyncedText.current) {
      syncDepth.current++;
      try {
        withoutUndo(() => {
          editorProxy.text = remoteText;
        });
        lastSyncedText.current = remoteText;
      } finally {
        // Use queueMicrotask for more reliable async reset than setTimeout
        queueMicrotask(() => {
          syncDepth.current = Math.max(0, syncDepth.current - 1);
        });
      }
    }
  }, [sharedSnap.text, editorProxy, withoutUndo, useWebSocket]);

  // Sync local proxy -> shared doc (when this agent changes)
  useEffect(() => {
    if (useWebSocket) return;

    const unsubscribe = subscribe(editorProxy, () => {
      // Only propagate if not syncing and text actually changed
      if (syncDepth.current === 0 && editorProxy.text !== sharedDoc.text) {
        lastSyncedText.current = editorProxy.text;
        sharedDoc.text = editorProxy.text;
      }
    });
    return unsubscribe;
  }, [editorProxy, useWebSocket]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newText = e.target.value;
      const oldText = editorProxy.text;

      editorProxy.text = newText;
      editorProxy.cursor = e.target.selectionStart || 0;

      if (newText.length > oldText.length) {
        const diff = newText.length - oldText.length;
        logOperation({
          agentId,
          type: 'insert',
          content: diff <= 5 ? newText.slice(-diff) : `+${diff} chars`,
          timestamp: Date.now(),
        });
      } else if (newText.length < oldText.length) {
        logOperation({
          agentId,
          type: 'delete',
          content: `${oldText.length - newText.length} chars`,
          timestamp: Date.now(),
        });
      }
    },
    [agentId, editorProxy]
  );

  const handleSelect = useCallback(
    (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
      editorProxy.cursor = e.currentTarget.selectionStart || 0;
    },
    [editorProxy]
  );

  const handleUndo = useCallback(() => {
    undo();
    logOperation({ agentId, type: 'undo', timestamp: Date.now() });
  }, [agentId, undo]);

  const handleRedo = useCallback(() => {
    redo();
    logOperation({ agentId, type: 'redo', timestamp: Date.now() });
  }, [agentId, redo]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        handleUndo();
      }
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
            disabled={!canUndo}
            title={`Undo ${agentId}'s changes`}
          >
            Undo
          </button>
          <button
            className="panel-undo-btn"
            onClick={handleRedo}
            disabled={!canRedo}
            title={`Redo ${agentId}'s changes`}
          >
            Redo
          </button>
        </div>
      </div>
    </div>
  );
}
