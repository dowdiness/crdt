// Stub implementation for development/testing without MoonBit runtime
// This file provides the same API as egwalker_api.ts but with a mock implementation

import { proxy, subscribe } from 'valtio/vanilla';

export type {
  EgWalkerProxyConfig,
  EgWalkerProxyResult,
  Operation,
  TextState,
} from './egwalker_api.js';

import type {
  EgWalkerProxyConfig,
  EgWalkerProxyResult,
  TextState,
  Operation,
} from './egwalker_api.js';

/**
 * Snapshot for undo/redo tracking
 * Uses full text snapshots instead of positional operations to handle
 * concurrent edits correctly in collaborative scenarios.
 */
interface UndoSnapshot {
  text: string;
  timestamp: number;
}

/**
 * Per-agent undo/redo state
 * This is separate from the shared document state
 */
interface AgentUndoState {
  agentId: string;
  undoStack: UndoSnapshot[];
  redoStack: UndoSnapshot[];
  lastText: string;
  isSuppressed: boolean; // Prevent tracking during undo/redo or remote sync
}

// Map from proxy to agent-specific undo state
const agentStateMap = new WeakMap<object, AgentUndoState>();

// Snapshot-based undo/redo - no positional operations needed
// This approach handles concurrent edits correctly because we store
// full text states rather than positional transformations.

// Mock MoonBit functions for testing - using real Valtio proxy with per-agent undo
const mockValtioEgwalker = {
  create_egwalker_proxy: (agent_id: string, undo_enabled: boolean) => {
    console.info(
      `[STUB] Creating proxy for agent "${agent_id}" (undo: ${undo_enabled})`
    );

    // Create a real Valtio proxy so useSnapshot works
    const proxyState = proxy<TextState>({
      text: '',
      cursor: 0,
      syncing: false,
    });

    // Initialize per-agent undo state if enabled
    if (undo_enabled) {
      const agentState: AgentUndoState = {
        agentId: agent_id,
        undoStack: [],
        redoStack: [],
        lastText: '',
        isSuppressed: false,
      };
      agentStateMap.set(proxyState, agentState);

      // Track text changes for this agent's undo stack (snapshot-based)
      subscribe(proxyState, () => {
        const state = agentStateMap.get(proxyState);
        console.log(`[STUB ${agent_id}] Subscribe fired, isSuppressed:`, state?.isSuppressed);
        if (!state || state.isSuppressed) return;

        if (proxyState.text !== state.lastText) {
          // Save the previous text as a snapshot for undo
          console.log(`[STUB ${agent_id}] Text changed from "${state.lastText}" to "${proxyState.text}"`);
          state.undoStack.push({
            text: state.lastText,
            timestamp: Date.now(),
          });
          console.log(`[STUB ${agent_id}] Undo stack size:`, state.undoStack.length);

          // Clear redo stack on new changes (standard undo/redo behavior)
          state.redoStack.length = 0;
          state.lastText = proxyState.text;
        }
      });
    }

    return proxyState;
  },

  apply_remote_op: (proxyState: any, op_json: string) => {
    // When applying remote operations, we need to update lastText
    // but NOT add to the local undo stack (it's not our change)
    const state = agentStateMap.get(proxyState);
    if (state) {
      state.isSuppressed = true;
    }

    try {
      const op = JSON.parse(op_json) as Operation;
      console.info(`[STUB] Applying remote op from ${op.agent_id}:`, op.op_type);

      // Apply the operation to the text
      // In real CRDT, this would use origin_left/origin_right for positioning
      if (op.op_type === 'Insert' && op.content) {
        const pos = Math.min(op.origin_left, proxyState.text.length);
        proxyState.text =
          proxyState.text.slice(0, pos) + op.content + proxyState.text.slice(pos);
      } else if (op.op_type === 'Delete') {
        const pos = Math.min(op.origin_left, proxyState.text.length);
        if (pos < proxyState.text.length) {
          proxyState.text =
            proxyState.text.slice(0, pos) + proxyState.text.slice(pos + 1);
        }
      }
    } finally {
      if (state) {
        state.lastText = proxyState.text;
        state.isSuppressed = false;
      }
    }
  },

  get_pending_ops_json: (_proxy: any) => {
    return '[]';
  },

  get_frontier_json: (_proxy: any) => {
    return '[]';
  },

  get_frontier_raw_json: (_proxy: any) => {
    return '[]';
  },

  undo: (proxyState: any) => {
    const state = agentStateMap.get(proxyState);
    if (!state || state.undoStack.length === 0) {
      console.info(`[STUB] Nothing to undo for agent "${state?.agentId}"`);
      return;
    }

    state.isSuppressed = true;
    try {
      // Save current state to redo stack before undoing
      state.redoStack.push({
        text: proxyState.text,
        timestamp: Date.now(),
      });

      // Pop the last snapshot from undo stack and restore it
      const snapshot = state.undoStack.pop()!;
      console.info(`[STUB] Undo for agent "${state.agentId}": restoring to "${snapshot.text}"`);

      proxyState.text = snapshot.text;
      state.lastText = snapshot.text;
    } finally {
      state.isSuppressed = false;
    }
  },

  redo: (proxyState: any) => {
    const state = agentStateMap.get(proxyState);
    if (!state || state.redoStack.length === 0) {
      console.info(`[STUB] Nothing to redo for agent "${state?.agentId}"`);
      return;
    }

    state.isSuppressed = true;
    try {
      // Save current state to undo stack before redoing
      state.undoStack.push({
        text: proxyState.text,
        timestamp: Date.now(),
      });

      // Pop the last snapshot from redo stack and restore it
      const snapshot = state.redoStack.pop()!;
      console.info(`[STUB] Redo for agent "${state.agentId}": restoring to "${snapshot.text}"`);

      proxyState.text = snapshot.text;
      state.lastText = snapshot.text;
    } finally {
      state.isSuppressed = false;
    }
  },

  dispose_proxy: (proxyState: any) => {
    const state = agentStateMap.get(proxyState);
    console.info(`[STUB] Disposing proxy for agent "${state?.agentId}"`);
    // Don't delete from WeakMap - React Strict Mode may reuse the same proxy
    // after unmount/remount cycles. WeakMap will auto-cleanup on GC anyway.
  },

  // Helper to get undo/redo stack sizes (for UI)
  get_undo_stack_size: (proxyState: any): number => {
    const state = agentStateMap.get(proxyState);
    return state?.undoStack.length ?? 0;
  },

  get_redo_stack_size: (proxyState: any): number => {
    const state = agentStateMap.get(proxyState);
    return state?.redoStack.length ?? 0;
  },

  set_suppress_undo_tracking: (proxyState: any, suppress: boolean) => {
    const state = agentStateMap.get(proxyState);
    if (state) {
      state.isSuppressed = suppress;
      if (!suppress) {
        // When re-enabling tracking, sync lastText to current state
        // This prevents the next change from being diffed against old state
        state.lastText = proxyState.text;
      }
    }
  },
};

const instanceMap = new WeakMap();

if (typeof globalThis !== 'undefined') {
  (globalThis as any).__egwalker_instances = instanceMap;
}

function setupWebSocketSync(
  proxyState: any,
  url: string,
  roomId: string
): WebSocket {
  const ws = new WebSocket(url);

  ws.onopen = () => {
    ws.send(JSON.stringify({ type: 'join', room: roomId }));
  };

  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);

    if (message.type === 'operation') {
      mockValtioEgwalker.apply_remote_op(
        proxyState,
        JSON.stringify(message.op)
      );
    }
  };

  subscribe(proxyState, () => {
    const opsJson = mockValtioEgwalker.get_pending_ops_json(proxyState);
    const ops = JSON.parse(opsJson);

    for (const op of ops) {
      ws.send(
        JSON.stringify({
          type: 'operation',
          room: roomId,
          op,
        })
      );
    }
  });

  return ws;
}

/**
 * Create a Valtio proxy synchronized with event-graph-walker CRDT (STUB)
 *
 * Each proxy instance has its own undo/redo stack per agent.
 * Undo/redo only affects this agent's local changes, not remote changes.
 *
 * @example
 * ```typescript
 * import { createEgWalkerProxy } from 'valtio-egwalker/stub';
 *
 * const { proxy: state, undo, redo } = createEgWalkerProxy({
 *   agentId: 'user-123',
 *   undoManager: true,
 * });
 * ```
 */
export function createEgWalkerProxy<T extends TextState>(
  config: EgWalkerProxyConfig
): EgWalkerProxyResult<T> {
  const {
    create_egwalker_proxy,
    apply_remote_op,
    get_pending_ops_json,
    get_frontier_json,
    get_frontier_raw_json,
    undo: moonbitUndo,
    redo: moonbitRedo,
    dispose_proxy,
    get_undo_stack_size,
    get_redo_stack_size,
    set_suppress_undo_tracking,
  } = mockValtioEgwalker;

  const proxyState = create_egwalker_proxy(
    config.agentId,
    config.undoManager || false
  );

  instanceMap.set(proxyState, proxyState);

  let ws: WebSocket | null = null;
  if (config.websocketUrl && config.roomId) {
    ws = setupWebSocketSync(proxyState, config.websocketUrl, config.roomId);
  }

  return {
    proxy: proxyState as T,

    undo: () => {
      if (config.undoManager) {
        moonbitUndo(proxyState);
      }
    },

    redo: () => {
      if (config.undoManager) {
        moonbitRedo(proxyState);
      }
    },

    getPendingOps: () => {
      const json = get_pending_ops_json(proxyState);
      return JSON.parse(json);
    },

    applyRemoteOp: (op: any) => {
      const json = JSON.stringify(op);
      apply_remote_op(proxyState, json);
    },

    getFrontier: () => {
      const json = get_frontier_json(proxyState);
      return JSON.parse(json);
    },

    getFrontierRaw: () => {
      const json = get_frontier_raw_json(proxyState);
      return JSON.parse(json);
    },

    dispose: () => {
      dispose_proxy(proxyState);
      if (ws) {
        ws.close();
      }
    },

    // Extended API for UI (not in production API yet)
    getUndoStackSize: () => get_undo_stack_size(proxyState),
    getRedoStackSize: () => get_redo_stack_size(proxyState),
    suppressUndoTracking: (suppress: boolean) => set_suppress_undo_tracking(proxyState, suppress),
  } as EgWalkerProxyResult<T> & {
    getUndoStackSize: () => number;
    getRedoStackSize: () => number;
    suppressUndoTracking: (suppress: boolean) => void;
  };
}

/**
 * Utility: Create a text proxy without network sync (STUB)
 */
export function createTextProxy(
  agentId: string,
  options?: { undoManager?: boolean }
): EgWalkerProxyResult<TextState> {
  return createEgWalkerProxy<TextState>({
    agentId,
    undoManager: options?.undoManager,
  });
}
