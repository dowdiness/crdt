// LambdaEditor Component
//
// A React component that uses the MoonBit Valtio FFI module (valtio-egwalker).
// Uses useSnapshot for reactive updates from the Valtio proxy state.

import { useEffect, useCallback, useRef } from 'react';
import { useEgWalker, Toolbar, StatusBar } from '../editor';

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
  const id = agentId || `user-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  const { snap, proxy, canUndo, canRedo, undo, redo, withoutUndo } = useEgWalker({
    agentId: id,
    initialText,
  });

  const editorRef = useRef<HTMLTextAreaElement>(null);

  // Notify parent of text changes
  useEffect(() => {
    onTextChange?.(snap.text);
  }, [snap.text, onTextChange]);

  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      proxy.text = e.target.value;
      proxy.cursor = e.target.selectionStart || 0;
    },
    [proxy]
  );

  const handleSelect = useCallback(
    (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
      proxy.cursor = e.currentTarget.selectionStart || 0;
    },
    [proxy]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      }
      if (
        ((e.ctrlKey || e.metaKey) && e.key === 'z' && e.shiftKey) ||
        ((e.ctrlKey || e.metaKey) && e.key === 'y')
      ) {
        e.preventDefault();
        redo();
      }
    },
    [undo, redo]
  );

  const handleLoadExample = useCallback(
    (code: string) => {
      withoutUndo(() => {
        proxy.text = code;
        proxy.cursor = code.length;
      });
      editorRef.current?.focus();
    },
    [proxy, withoutUndo]
  );

  const handleClear = useCallback(() => {
    withoutUndo(() => {
      proxy.text = '';
      proxy.cursor = 0;
    });
    editorRef.current?.focus();
  }, [proxy, withoutUndo]);

  const displayAgentId = agentId || 'local';

  return (
    <div className="lambda-editor">
      <Toolbar
        onUndo={undo}
        onRedo={redo}
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
