// LambdaEditor Component
//
// A React component that uses the MoonBit Valtio FFI module (valtio-egwalker).
// Uses useSnapshot for reactive updates from the Valtio proxy state.

import { useState, useEffect, useCallback, useRef } from 'react';
import { useSnapshot } from 'valtio';
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
import { Toolbar } from './Toolbar';
import { StatusBar } from './StatusBar';

// Example lambda expressions
const EXAMPLES = [
  { label: 'Identity', code: '(\\x.x) 42' },
  { label: 'Church 2', code: '(\\f.\\x.f (f x)) (\\n.n + 1) 0' },
  { label: 'Add', code: '(\\x.\\y.x + y) 10 5' },
  { label: 'Conditional', code: 'if 1 then 42 else 0' },
  { label: 'Apply', code: '(\\f.\\x.f x) (\\n.n - 1) 10' },
];

interface LambdaEditorProps {
  /** Initial text content */
  initialText?: string;
  /** Callback when text changes */
  onTextChange?: (text: string) => void;
  /** Custom agent ID */
  agentId?: string;
}

export function LambdaEditor({
  initialText = '',
  onTextChange,
  agentId,
}: LambdaEditorProps) {
  // Create egwalker proxy using the MoonBit Valtio FFI module
  const [egwalker] = useState<ExtendedEgWalkerResult>(() => {
    const id = agentId || `user-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    return createEgWalkerProxy<TextState>({
      agentId: id,
      undoManager: true,
    }) as ExtendedEgWalkerResult;
  });

  // Use snapshot for reactive rendering
  // This is the key Valtio pattern: read from snapshot, mutate proxy
  const snap = useSnapshot(egwalker.proxy, { sync: true });

  // Editor ref for focus management
  const editorRef = useRef<HTMLTextAreaElement>(null);

  // Track undo/redo availability using actual stack sizes
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  // Update undo/redo state from actual stack sizes
  const updateUndoRedoState = useCallback(() => {
    setCanUndo((egwalker.getUndoStackSize?.() ?? 0) > 0);
    setCanRedo((egwalker.getRedoStackSize?.() ?? 0) > 0);
  }, [egwalker]);

  // Initialize with initial text (suppressed from undo stack)
  useEffect(() => {
    if (initialText) {
      egwalker.suppressUndoTracking?.(true);
      egwalker.proxy.text = initialText;
      egwalker.suppressUndoTracking?.(false);
    }
  }, []); // Only on mount

  // Notify parent of text changes and update undo/redo state
  useEffect(() => {
    onTextChange?.(snap.text);
    updateUndoRedoState();
  }, [snap.text, onTextChange, updateUndoRedoState]);

  // Cleanup on unmount
  useEffect(() => {
    return () => egwalker.dispose();
  }, [egwalker]);

  // Handle text input
  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      egwalker.proxy.text = e.target.value;
      egwalker.proxy.cursor = e.target.selectionStart || 0;
    },
    [egwalker]
  );

  // Handle cursor position changes
  const handleSelect = useCallback(
    (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
      egwalker.proxy.cursor = e.currentTarget.selectionStart || 0;
    },
    [egwalker]
  );

  // Handle keyboard shortcuts
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      // Undo: Ctrl/Cmd + Z
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        egwalker.undo();
        updateUndoRedoState();
      }
      // Redo: Ctrl/Cmd + Shift + Z or Ctrl/Cmd + Y
      if (
        ((e.ctrlKey || e.metaKey) && e.key === 'z' && e.shiftKey) ||
        ((e.ctrlKey || e.metaKey) && e.key === 'y')
      ) {
        e.preventDefault();
        egwalker.redo();
        updateUndoRedoState();
      }
    },
    [egwalker, updateUndoRedoState]
  );

  // Load example (suppressed from undo stack - it's a preset, not user edit)
  const handleLoadExample = useCallback(
    (code: string) => {
      egwalker.suppressUndoTracking?.(true);
      egwalker.proxy.text = code;
      egwalker.proxy.cursor = code.length;
      egwalker.suppressUndoTracking?.(false);
      editorRef.current?.focus();
    },
    [egwalker]
  );

  // Clear editor (suppressed from undo stack)
  const handleClear = useCallback(() => {
    egwalker.suppressUndoTracking?.(true);
    egwalker.proxy.text = '';
    egwalker.proxy.cursor = 0;
    egwalker.suppressUndoTracking?.(false);
    editorRef.current?.focus();
  }, [egwalker]);

  // Get agent ID from config (stored in closure)
  const displayAgentId = agentId || 'local';

  return (
    <div className="lambda-editor">
      <Toolbar
        onUndo={() => {
          egwalker.undo();
          updateUndoRedoState();
        }}
        onRedo={() => {
          egwalker.redo();
          updateUndoRedoState();
        }}
        onClear={handleClear}
        canUndo={canUndo}
        canRedo={canRedo}
      />

      <div className="examples-bar">
        <span className="examples-label">Examples:</span>
        {EXAMPLES.map((example) => (
          <button
            key={example.label}
            className="example-btn"
            onClick={() => handleLoadExample(example.code)}
          >
            {example.label}
          </button>
        ))}
      </div>

      <div className="editor-container">
        <textarea
          ref={editorRef}
          className="editor-textarea"
          value={snap.text}
          onChange={handleTextChange}
          onSelect={handleSelect}
          onKeyDown={handleKeyDown}
          placeholder="Type lambda calculus expressions here... (e.g., (\x.x) 5)"
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
      </div>

      <StatusBar
        charCount={snap.text.length}
        cursorPosition={snap.cursor}
        agentId={displayAgentId}
        syncing={snap.syncing}
      />
    </div>
  );
}
