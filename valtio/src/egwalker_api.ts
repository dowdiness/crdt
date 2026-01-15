// TypeScript API for valtio-egwalker
//
// User-facing API similar to valtio-y's createYjsProxy

import { proxy, subscribe, snapshot } from 'valtio/vanilla';
import type { Snapshot } from 'valtio/vanilla';

/**
 * Configuration for creating an EgWalker proxy
 */
export interface EgWalkerProxyConfig {
  /**
   * Unique agent/site ID for this instance
   */
  agentId: string;

  /**
   * Enable undo/redo functionality
   * @default false
   */
  undoManager?: boolean;

  /**
   * WebSocket URL for network sync (optional)
   */
  websocketUrl?: string;

  /**
   * Room/document ID for collaboration (optional)
   */
  roomId?: string;
}

/**
 * Return value from createEgWalkerProxy
 */
export interface EgWalkerProxyResult<T> {
  /**
   * The Valtio proxy - mutate this for local changes
   */
  proxy: T;

  /**
   * Undo the last operation (if undoManager is enabled)
   */
  undo: () => void;

  /**
   * Redo the last undone operation (if undoManager is enabled)
   */
  redo: () => void;

  /**
   * Get pending operations for network sync
   */
  getPendingOps: () => Operation[];

  /**
   * Apply a remote operation from another client
   */
  applyRemoteOp: (op: Operation) => void;

  /**
   * Get the current CRDT frontier
   */
  getFrontier: () => number[];

  /**
   * Clean up resources and unsubscribe
   */
  dispose: () => void;
}

/**
 * Synchronous version that expects valtio_egwalker.js to be pre-loaded
 * Use this if you've already imported the module
 */
export function createEgWalkerProxySync<T extends TextState>(
  config: EgWalkerProxyConfig,
  valtioEgwalker: any
): EgWalkerProxyResult<T> {
  const {
    create_egwalker_proxy,
    apply_remote_op,
    get_pending_ops_json,
    get_frontier_json,
    undo: moonbitUndo,
    redo: moonbitRedo,
    dispose_proxy,
  } = valtioEgwalker;

  // Create the proxy through MoonBit FFI
  const proxyState = create_egwalker_proxy(
    config.agentId,
    config.undoManager || false
  );

  // Store instance for FFI callbacks
  instanceMap.set(proxyState, proxyState);

  // Set up WebSocket sync if configured
  let ws: WebSocket | null = null;
  if (config.websocketUrl && config.roomId) {
    ws = setupWebSocketSync(proxyState, config.websocketUrl, config.roomId, valtioEgwalker);
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

    dispose: () => {
      dispose_proxy(proxyState);
      if (ws) {
        ws.close();
      }
    },
  };
}

/**
 * CRDT operation structure
 */
export interface Operation {
  lv: number;
  agent_id: string;
  op_type: 'Insert' | 'Delete';
  content?: string;
  origin_left: number;
  origin_right: number;
  deps: number[];
}

/**
 * Text document state
 */
export interface TextState {
  text: string;
  cursor: number;
  syncing: boolean;
}

// Global instance map to track proxies
const instanceMap = new WeakMap();

// Make it globally accessible for MoonBit FFI
if (typeof globalThis !== 'undefined') {
  (globalThis as any).__egwalker_instances = instanceMap;
}

/**
 * Create a Valtio proxy synchronized with event-graph-walker CRDT
 *
 * @example
 * ```typescript
 * const { proxy: state, undo, redo } = createEgWalkerProxy<TextState>({
 *   agentId: 'user-123',
 *   undoManager: true,
 * });
 *
 * // Mutate state naturally
 * state.text = 'Hello, world!';
 *
 * // Use in React
 * const snap = useSnapshot(state);
 * ```
 */
export async function createEgWalkerProxy<T extends TextState>(
  config: EgWalkerProxyConfig
): Promise<EgWalkerProxyResult<T>> {
  // Import MoonBit compiled functions dynamically
  // Path points to the compiled output from moon build --target js
  const valtioEgwalker = await import('../target/js/release/build/valtio/valtio.js');

  const {
    create_egwalker_proxy,
    apply_remote_op,
    get_pending_ops_json,
    get_frontier_json,
    undo: moonbitUndo,
    redo: moonbitRedo,
    dispose_proxy,
  } = valtioEgwalker;

  // Create the proxy through MoonBit FFI
  const proxyState = create_egwalker_proxy(
    config.agentId,
    config.undoManager || false
  );

  // Store instance for FFI callbacks
  instanceMap.set(proxyState, proxyState);

  // Set up WebSocket sync if configured
  let ws: WebSocket | null = null;
  if (config.websocketUrl && config.roomId) {
    ws = setupWebSocketSync(proxyState, config.websocketUrl, config.roomId, valtioEgwalker);
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

    dispose: () => {
      dispose_proxy(proxyState);
      if (ws) {
        ws.close();
      }
    },
  };
}

/**
 * Set up WebSocket synchronization
 */
function setupWebSocketSync(
  proxyState: any,
  url: string,
  roomId: string,
  valtioEgwalker: any
): WebSocket {
  const ws = new WebSocket(url);

  ws.onopen = () => {
    // Join room
    ws.send(JSON.stringify({ type: 'join', room: roomId }));
  };

  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);

    if (message.type === 'operation') {
      // Apply remote operation
      valtioEgwalker.apply_remote_op(proxyState, JSON.stringify(message.op));
    }
  };

  // Subscribe to local changes and broadcast
  subscribe(proxyState, () => {
    const opsJson = valtioEgwalker.get_pending_ops_json(proxyState);
    const ops = JSON.parse(opsJson);

    // Broadcast pending operations
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
 * Utility: Create a text proxy without network sync
 */
export async function createTextProxy(
  agentId: string,
  options?: { undoManager?: boolean }
): Promise<EgWalkerProxyResult<TextState>> {
  return await createEgWalkerProxy<TextState>({
    agentId,
    undoManager: options?.undoManager,
  });
}
