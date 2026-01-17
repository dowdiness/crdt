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
  roomId: string
): WebSocket {
  const ws = new WebSocket(url);

  ws.onopen = () => {
    ws.send(JSON.stringify({ type: 'join', room: roomId }));
  };

  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);

    if (message.type === 'operation') {
      valtioEgwalker.apply_remote_op(
        proxyState,
        JSON.stringify(message.op)
      );
    }
  };

  subscribe(proxyState, () => {
    const opsJson = valtioEgwalker.get_pending_ops_json(proxyState);
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
  const {
    create_egwalker_proxy,
    apply_remote_op,
    get_pending_ops_json,
    get_frontier_json,
    get_frontier_raw_json,
    undo: moonbitUndo,
    redo: moonbitRedo,
    dispose_proxy,
  } = valtioEgwalker;

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

    applyRemoteOp: (op: Operation) => {
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
