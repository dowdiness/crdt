// Synchronous API for valtio-egwalker (for bundlers)
//
// Use this if you're using a bundler that handles imports
import { subscribe } from 'valtio/vanilla';
// Import MoonBit compiled module
// Path points to the compiled output from moon build --target js
import * as valtioEgwalker from '../target/js/release/build/valtio/valtio.js';
const moonbit = valtioEgwalker;
// Global instance map
const instanceMap = new WeakMap();
// Make it globally accessible for MoonBit FFI
if (typeof globalThis !== 'undefined') {
    globalThis.__egwalker_instances = instanceMap;
}
/**
 * Configuration for operation batching
 */
const BATCH_DELAY_MS = 200; // Collect operations for 200ms before sending
const SENT_OPS_LIMIT = 10000; // Match server's history limit
/**
 * Set up WebSocket synchronization with operation batching
 *
 * Operations are batched for BATCH_DELAY_MS to reduce network overhead
 * and improve performance during rapid typing.
 */
function setupWebSocketSync(proxyState, url, roomId, suppressUndoTracking) {
    const ws = new WebSocket(url);
    const sentOps = new Set();
    // Batching state
    let pendingBatch = [];
    let batchTimeout = null;
    let isProcessingRemote = false;
    const flushBatch = () => {
        if (pendingBatch.length === 0 || ws.readyState !== WebSocket.OPEN) {
            batchTimeout = null;
            return;
        }
        // Send batched operations
        ws.send(JSON.stringify({
            type: 'batch',
            room: roomId,
            ops: pendingBatch,
        }));
        pendingBatch = [];
        batchTimeout = null;
    };
    const queueOperation = (op) => {
        const opKey = `${op.agent_id}:${op.lv}`;
        if (sentOps.has(opKey))
            return;
        sentOps.add(opKey);
        pendingBatch.push(op);
        // Evict oldest entries when limit exceeded
        if (sentOps.size > SENT_OPS_LIMIT) {
            const oldest = sentOps.values().next().value;
            if (oldest)
                sentOps.delete(oldest);
        }
        // Schedule batch send if not already scheduled
        if (!batchTimeout) {
            batchTimeout = setTimeout(flushBatch, BATCH_DELAY_MS);
        }
    };
    ws.onopen = () => {
        ws.send(JSON.stringify({ type: 'join', room: roomId }));
        flushBatch();
    };
    ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.type === 'operation') {
            isProcessingRemote = true;
            try {
                suppressUndoTracking?.(true);
                moonbit.apply_remote_op(proxyState, JSON.stringify(message.op));
            }
            finally {
                suppressUndoTracking?.(false);
                isProcessingRemote = false;
            }
        }
        else if (message.type === 'batch') {
            // Handle batched operations from other clients
            isProcessingRemote = true;
            try {
                suppressUndoTracking?.(true);
                for (const op of message.ops || []) {
                    moonbit.apply_remote_op(proxyState, JSON.stringify(op));
                }
            }
            finally {
                suppressUndoTracking?.(false);
                isProcessingRemote = false;
            }
        }
        else if (message.type === 'sync') {
            isProcessingRemote = true;
            try {
                suppressUndoTracking?.(true);
                for (const op of message.ops || []) {
                    moonbit.apply_remote_op(proxyState, JSON.stringify(op));
                }
            }
            finally {
                suppressUndoTracking?.(false);
                isProcessingRemote = false;
            }
        }
    };
    const unsubscribe = subscribe(proxyState, () => {
        // Skip if we're processing remote operations to avoid echo
        if (isProcessingRemote)
            return;
        const opsJson = moonbit.get_pending_ops_json(proxyState);
        const ops = JSON.parse(opsJson);
        for (const op of ops) {
            queueOperation(op);
        }
    });
    const cleanup = () => {
        unsubscribe();
        if (batchTimeout) {
            clearTimeout(batchTimeout);
            flushBatch(); // Send any remaining operations
        }
    };
    return { ws, cleanup };
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
export function createEgWalkerProxy(config) {
    const proxyState = moonbit.create_egwalker_proxy(config.agentId, config.undoManager || false);
    instanceMap.set(proxyState, proxyState);
    const suppressUndoTracking = moonbit.set_suppress_undo_tracking
        ? (suppress) => moonbit.set_suppress_undo_tracking(proxyState, suppress)
        : undefined;
    let wsConnection = null;
    if (config.websocketUrl && config.roomId) {
        wsConnection = setupWebSocketSync(proxyState, config.websocketUrl, config.roomId, suppressUndoTracking);
    }
    return {
        proxy: proxyState,
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
        applyRemoteOp: (op) => {
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
            // Clean up WebSocket and subscriptions
            if (wsConnection) {
                wsConnection.cleanup();
                wsConnection.ws.close();
            }
            moonbit.dispose_proxy(proxyState);
        },
        getUndoStackSize: moonbit.get_undo_stack_size
            ? () => moonbit.get_undo_stack_size(proxyState)
            : () => 0,
        getRedoStackSize: moonbit.get_redo_stack_size
            ? () => moonbit.get_redo_stack_size(proxyState)
            : () => 0,
        suppressUndoTracking,
    };
}
/**
 * Utility: Create a text proxy without network sync
 */
export function createTextProxy(agentId, options) {
    return createEgWalkerProxy({
        agentId,
        undoManager: options?.undoManager,
    });
}
