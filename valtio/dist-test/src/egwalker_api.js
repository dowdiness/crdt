// TypeScript API for valtio-egwalker
//
// User-facing API similar to valtio-y's createYjsProxy
import { subscribe } from 'valtio/vanilla';
/**
 * Synchronous version that expects valtio_egwalker.js to be pre-loaded
 * Use this if you've already imported the module
 */
export function createEgWalkerProxySync(config, valtioEgwalker) {
    const { create_egwalker_proxy, apply_remote_op, get_pending_ops_json, get_frontier_json, get_frontier_raw_json, undo: moonbitUndo, redo: moonbitRedo, dispose_proxy, } = valtioEgwalker;
    // Create the proxy through MoonBit FFI
    const proxyState = create_egwalker_proxy(config.agentId, config.undoManager || false);
    // Store instance for FFI callbacks
    instanceMap.set(proxyState, proxyState);
    // Set up WebSocket sync if configured
    let ws = null;
    if (config.websocketUrl && config.roomId) {
        ws = setupWebSocketSync(proxyState, config.websocketUrl, config.roomId, valtioEgwalker);
    }
    return {
        proxy: proxyState,
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
        applyRemoteOp: (op) => {
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
// Global instance map to track proxies
const instanceMap = new WeakMap();
// Make it globally accessible for MoonBit FFI
if (typeof globalThis !== 'undefined') {
    globalThis.__egwalker_instances = instanceMap;
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
export async function createEgWalkerProxy(config) {
    // Import MoonBit compiled functions dynamically
    // Path points to the compiled output from moon build --target js
    const valtioEgwalker = await import('../target/js/release/build/valtio/valtio.js');
    const { create_egwalker_proxy, apply_remote_op, get_pending_ops_json, get_frontier_json, get_frontier_raw_json, undo: moonbitUndo, redo: moonbitRedo, dispose_proxy, } = valtioEgwalker;
    // Create the proxy through MoonBit FFI
    const proxyState = create_egwalker_proxy(config.agentId, config.undoManager || false);
    // Store instance for FFI callbacks
    instanceMap.set(proxyState, proxyState);
    // Set up WebSocket sync if configured
    let ws = null;
    if (config.websocketUrl && config.roomId) {
        ws = setupWebSocketSync(proxyState, config.websocketUrl, config.roomId, valtioEgwalker);
    }
    return {
        proxy: proxyState,
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
        applyRemoteOp: (op) => {
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
 * Set up WebSocket synchronization
 */
function setupWebSocketSync(proxyState, url, roomId, valtioEgwalker) {
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
            ws.send(JSON.stringify({
                type: 'operation',
                room: roomId,
                op,
            }));
        }
    });
    return ws;
}
/**
 * Utility: Create a text proxy without network sync
 */
export async function createTextProxy(agentId, options) {
    return await createEgWalkerProxy({
        agentId,
        undoManager: options?.undoManager,
    });
}
