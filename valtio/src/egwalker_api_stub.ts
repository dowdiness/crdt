// Stub implementation for development/testing without MoonBit runtime
// This file provides the same API as egwalker_api.ts but with a mock implementation

import { subscribe } from 'valtio/vanilla';

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
} from './egwalker_api.js';

// Mock MoonBit functions for testing
const mockValtioEgwalker = {
  create_egwalker_proxy: (_agent_id: string, _undo_enabled: boolean) => {
    console.warn(
      '[STUB] Using stub implementation. Build MoonBit for production.'
    );
    return {
      text: '',
      cursor: 0,
      syncing: false,
    };
  },
  apply_remote_op: (_proxy: any, op_json: string) => {
    console.warn('[STUB] apply_remote_op called with:', op_json);
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
  undo: (_proxy: any) => {
    console.warn('[STUB] undo called');
  },
  redo: (_proxy: any) => {
    console.warn('[STUB] redo called');
  },
  dispose_proxy: (_proxy: any) => {
    console.warn('[STUB] dispose_proxy called');
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
 * ⚠️ This is a stub implementation for development/testing.
 * Build the MoonBit code for production use.
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
