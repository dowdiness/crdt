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
  const [egwalker] = useState<EgWalkerProxyResult<TextState>>(() => {
    const id = agentId || `user-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    return createEgWalkerProxy<TextState>({
      agentId: id,
      undoManager: true,
    });
  });

  // Use snapshot for reactive rendering
  // This is the key Valtio pattern: read from snapshot, mutate proxy
  const snap = useSnapshot(egwalker.proxy, { sync: true });

  // Editor ref for focus management
  const editorRef = useRef<HTMLTextAreaElement>(null);

  // Track undo/redo availability (simplified check)
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  // Initialize with initial text
  useEffect(() => {
    if (initialText) {
      egwalker.proxy.text = initialText;
    }
  }, []); // Only on mount

  // Notify parent of text changes
  useEffect(() => {
    onTextChange?.(snap.text);
    // Update undo/redo state (simplified - real impl would track stack sizes)
    setCanUndo(snap.text.length > 0);
  }, [snap.text, onTextChange]);

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
        setCanRedo(true);
      }
      // Redo: Ctrl/Cmd + Shift + Z or Ctrl/Cmd + Y
      if (
        ((e.ctrlKey || e.metaKey) && e.key === 'z' && e.shiftKey) ||
        ((e.ctrlKey || e.metaKey) && e.key === 'y')
      ) {
        e.preventDefault();
        egwalker.redo();
      }
    },
    [egwalker]
  );

  // Load example
  const handleLoadExample = useCallback(
    (code: string) => {
      egwalker.proxy.text = code;
      egwalker.proxy.cursor = code.length;
      editorRef.current?.focus();
    },
    [egwalker]
  );

  // Clear editor
  const handleClear = useCallback(() => {
    egwalker.proxy.text = '';
    egwalker.proxy.cursor = 0;
    editorRef.current?.focus();
  }, [egwalker]);

  // Get agent ID from config (stored in closure)
  const displayAgentId = agentId || 'local';

  return (
    <div className="lambda-editor">
      <Toolbar
        onUndo={() => {
          egwalker.undo();
          setCanRedo(true);
        }}
        onRedo={() => egwalker.redo()}
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
