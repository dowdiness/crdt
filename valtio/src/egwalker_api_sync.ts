// Synchronous API for valtio-egwalker (for bundlers)
//
// Use this if you're using a bundler that handles imports

import { subscribe } from 'valtio/vanilla';

// Re-export types
export type {
  EgWalkerProxyConfig,
  EgWalkerProxyResult,
  Operation,
  TextState,
} from './egwalker_api.js';

import type {
  EgWalkerProxyConfig,
  EgWalkerProxyResult,
  Operation,
  TextState,
} from './egwalker_api.js';

// Import MoonBit compiled module
// Path points to the compiled output from moon build --target js
import * as valtioEgwalker from '../target/js/release/build/valtio/valtio.js';

// Extended module interface for undo stack tracking
interface ValtioEgwalkerModule {
  create_egwalker_proxy: (agent_id: string, undo_enabled: boolean) => any;
  apply_remote_op: (proxy: any, op_json: string) => void;
  get_pending_ops_json: (proxy: any) => string;
  get_frontier_json: (proxy: any) => string;
  get_frontier_raw_json: (proxy: any) => string;
  undo: (proxy: any) => void;
  redo: (proxy: any) => void;
  dispose_proxy: (proxy: any) => void;
  get_undo_stack_size?: (proxy: any) => number;
  get_redo_stack_size?: (proxy: any) => number;
  set_suppress_undo_tracking?: (proxy: any, suppress: boolean) => void;
}

const moonbit = valtioEgwalker as unknown as ValtioEgwalkerModule;

// Global instance map
const instanceMap = new WeakMap();

// Make it globally accessible for MoonBit FFI
if (typeof globalThis !== 'undefined') {
  (globalThis as any).__egwalker_instances = instanceMap;
}

/**
 * Set up WebSocket synchronization
 */
function setupWebSocketSync(
  proxyState: any,
  url: string,
  roomId: string,
  suppressUndoTracking?: (suppress: boolean) => void
): WebSocket {
  const ws = new WebSocket(url);
  const sentOps = new Set<string>();
  const SENT_OPS_LIMIT = 10000; // Match server's history limit

  ws.onopen = () => {
    ws.send(JSON.stringify({ type: 'join', room: roomId }));
  };

  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);

    if (message.type === 'operation') {
      try {
        suppressUndoTracking?.(true);
        moonbit.apply_remote_op(proxyState, JSON.stringify(message.op));
      } finally {
        suppressUndoTracking?.(false);
      }
    } else if (message.type === 'sync') {
      try {
        suppressUndoTracking?.(true);
        for (const op of message.ops || []) {
          moonbit.apply_remote_op(proxyState, JSON.stringify(op));
        }
      } finally {
        suppressUndoTracking?.(false);
      }
    }
  };

  subscribe(proxyState, () => {
    const opsJson = moonbit.get_pending_ops_json(proxyState);
    const ops = JSON.parse(opsJson);

    for (const op of ops) {
      const opKey = `${op.agent_id}:${op.lv}`;
      if (sentOps.has(opKey)) continue;
      sentOps.add(opKey);

      // Evict oldest entries when limit exceeded (FIFO via Set iteration order)
      if (sentOps.size > SENT_OPS_LIMIT) {
        const oldest = sentOps.values().next().value;
        if (oldest) sentOps.delete(oldest);
      }

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
 * Create a Valtio proxy synchronized with event-graph-walker CRDT
 *
 * @example
 * ```typescript
 * import { createEgWalkerProxy } from 'valtio-egwalker/sync';
 *
 * const { proxy: state, undo, redo } = createEgWalkerProxy({
 *   agentId: 'user-123',
 *   undoManager: true,
 * });
 *
 * state.text = 'Hello, world!';
 * ```
 */
export function createEgWalkerProxy<T extends TextState>(
  config: EgWalkerProxyConfig
): EgWalkerProxyResult<T> {
  const proxyState = moonbit.create_egwalker_proxy(
    config.agentId,
    config.undoManager || false
  );

  instanceMap.set(proxyState, proxyState);

  const suppressUndoTracking = moonbit.set_suppress_undo_tracking
    ? (suppress: boolean) => moonbit.set_suppress_undo_tracking!(proxyState, suppress)
    : undefined;

  let ws: WebSocket | null = null;
  if (config.websocketUrl && config.roomId) {
    ws = setupWebSocketSync(proxyState, config.websocketUrl, config.roomId, suppressUndoTracking);
  }

  return {
    proxy: proxyState as T,

    undo: () => {
      if (config.undoManager) {
        moonbit.undo(proxyState);
      }
    },

    redo: () => {
      if (config.undoManager) {
        moonbit.redo(proxyState);
      }
    },

    getPendingOps: () => {
      const json = moonbit.get_pending_ops_json(proxyState);
      return JSON.parse(json);
    },

    applyRemoteOp: (op: Operation) => {
      const json = JSON.stringify(op);
      moonbit.apply_remote_op(proxyState, json);
    },

    getFrontier: () => {
      const json = moonbit.get_frontier_json(proxyState);
      return JSON.parse(json);
    },

    getFrontierRaw: () => {
      const json = moonbit.get_frontier_raw_json(proxyState);
      return JSON.parse(json);
    },

    dispose: () => {
      moonbit.dispose_proxy(proxyState);
      if (ws) {
        ws.close();
      }
    },

    getUndoStackSize: moonbit.get_undo_stack_size
      ? () => moonbit.get_undo_stack_size!(proxyState)
      : () => 0,

    getRedoStackSize: moonbit.get_redo_stack_size
      ? () => moonbit.get_redo_stack_size!(proxyState)
      : () => 0,

    suppressUndoTracking,
  } as EgWalkerProxyResult<T> & {
    getUndoStackSize: () => number;
    getRedoStackSize: () => number;
    suppressUndoTracking?: (suppress: boolean) => void;
  };
}

/**
 * Utility: Create a text proxy without network sync
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
