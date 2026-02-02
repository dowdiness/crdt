// useEgWalker — custom hook for egwalker CRDT proxy lifecycle and operations.
//
// Owns: proxy creation, snapshot subscription, undo/redo state, cleanup.
// Components consume the returned primitives and compose DOM-specific handlers.

import { useState, useEffect, useCallback } from 'react';
import { useSnapshot } from 'valtio';
import {
  createEgWalkerProxy,
  type TextState,
  type EgWalkerProxyResult,
} from 'valtio-egwalker/stub';

interface UseEgWalkerOptions {
  agentId: string;
  initialText?: string;
  undoManager?: boolean;
  websocketUrl?: string;
  roomId?: string;
}

export function useEgWalker(options: UseEgWalkerOptions) {
  const [result] = useState<EgWalkerProxyResult<TextState>>(() => {
    const r = createEgWalkerProxy<TextState>({
      agentId: options.agentId,
      undoManager: options.undoManager ?? true,
      ...(options.websocketUrl
        ? { websocketUrl: options.websocketUrl, roomId: options.roomId }
        : {}),
    });
    if (options.initialText) {
      r.suppressUndoTracking?.(true);
      r.proxy.text = options.initialText;
      r.suppressUndoTracking?.(false);
    }
    return r;
  });

  const snap = useSnapshot(result.proxy, { sync: true });

  // Derived — recomputed each render triggered by snap.text
  const canUndo = result.canUndo();
  const canRedo = result.canRedo();

  useEffect(() => () => result.dispose(), [result]);

  const undo = useCallback(() => result.undo(), [result]);
  const redo = useCallback(() => result.redo(), [result]);

  // Run a mutation without recording it in the undo stack
  const withoutUndo = useCallback(
    (fn: () => void) => {
      result.suppressUndoTracking?.(true);
      try {
        fn();
      } finally {
        result.suppressUndoTracking?.(false);
      }
    },
    [result]
  );

  return {
    snap,
    proxy: result.proxy,
    canUndo,
    canRedo,
    undo,
    redo,
    withoutUndo,
  };
}
