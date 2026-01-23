// Stub implementation for development/testing without MoonBit runtime
// This file provides the same API as egwalker_api.ts but with a mock implementation
// Types are duplicated here to avoid importing from egwalker_api.ts (which imports MoonBit)
import { proxy, subscribe } from 'valtio/vanilla';
// Map from proxy to agent-specific undo state
const agentStateMap = new WeakMap();
// Snapshot-based undo/redo - no positional operations needed
// This approach handles concurrent edits correctly because we store
// full text states rather than positional transformations.
// Mock MoonBit functions for testing - using real Valtio proxy with per-agent undo
const mockValtioEgwalker = {
    create_egwalker_proxy: (agent_id, undo_enabled) => {
        console.info(`[STUB] Creating proxy for agent "${agent_id}" (undo: ${undo_enabled})`);
        // Create a real Valtio proxy so useSnapshot works
        const proxyState = proxy({
            text: '',
            cursor: 0,
            syncing: false,
        });
        // Initialize per-agent undo state if enabled
        if (undo_enabled) {
            const agentState = {
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
                if (!state || state.isSuppressed)
                    return;
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
    apply_remote_op: (proxyState, op_json) => {
        // When applying remote operations, we need to update lastText
        // but NOT add to the local undo stack (it's not our change)
        const state = agentStateMap.get(proxyState);
        if (state) {
            state.isSuppressed = true;
        }
        try {
            const op = JSON.parse(op_json);
            console.info(`[STUB] Applying remote op from ${op.agent_id}:`, op.op_type);
            // Apply the operation to the text
            // In real CRDT, this would use origin_left/origin_right for positioning
            if (op.op_type === 'Insert' && op.content) {
                const pos = Math.min(op.origin_left, proxyState.text.length);
                proxyState.text =
                    proxyState.text.slice(0, pos) + op.content + proxyState.text.slice(pos);
            }
            else if (op.op_type === 'Delete') {
                const pos = Math.min(op.origin_left, proxyState.text.length);
                if (pos < proxyState.text.length) {
                    proxyState.text =
                        proxyState.text.slice(0, pos) + proxyState.text.slice(pos + 1);
                }
            }
        }
        finally {
            if (state) {
                state.lastText = proxyState.text;
                state.isSuppressed = false;
            }
        }
    },
    get_pending_ops_json: (proxyState) => {
        return JSON.stringify(proxyState.__pendingOps ?? []);
    },
    get_frontier_json: (_proxy) => {
        return '[]';
    },
    get_frontier_raw_json: (_proxy) => {
        return '[]';
    },
    undo: (proxyState) => {
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
            const snapshot = state.undoStack.pop();
            console.info(`[STUB] Undo for agent "${state.agentId}": restoring to "${snapshot.text}"`);
            proxyState.text = snapshot.text;
            state.lastText = snapshot.text;
        }
        finally {
            state.isSuppressed = false;
        }
    },
    redo: (proxyState) => {
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
            const snapshot = state.redoStack.pop();
            console.info(`[STUB] Redo for agent "${state.agentId}": restoring to "${snapshot.text}"`);
            proxyState.text = snapshot.text;
            state.lastText = snapshot.text;
        }
        finally {
            state.isSuppressed = false;
        }
    },
    dispose_proxy: (proxyState) => {
        const state = agentStateMap.get(proxyState);
        console.info(`[STUB] Disposing proxy for agent "${state?.agentId}"`);
        // Don't delete from WeakMap - React Strict Mode may reuse the same proxy
        // after unmount/remount cycles. WeakMap will auto-cleanup on GC anyway.
    },
    // Helper to get undo/redo stack sizes (for UI)
    get_undo_stack_size: (proxyState) => {
        const state = agentStateMap.get(proxyState);
        return state?.undoStack.length ?? 0;
    },
    get_redo_stack_size: (proxyState) => {
        const state = agentStateMap.get(proxyState);
        return state?.redoStack.length ?? 0;
    },
    set_suppress_undo_tracking: (proxyState, suppress) => {
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
    globalThis.__egwalker_instances = instanceMap;
}
/**
 * Configuration for operation batching and reconnection
 */
const BATCH_DELAY_MS = 200; // Collect operations for 200ms before sending
const SENT_OPS_LIMIT = 10000; // Match server's history limit
const RECONNECT_BASE_DELAY_MS = 1000; // Initial reconnection delay
const RECONNECT_MAX_DELAY_MS = 30000; // Maximum reconnection delay
const RECONNECT_MAX_ATTEMPTS = 10; // Maximum reconnection attempts
/**
 * Set up WebSocket synchronization with operation batching and auto-reconnect
 */
function setupWebSocketSync(proxyState, url, roomId) {
    const sentOps = new Set();
    let pendingBatch = [];
    let batchTimeout = null;
    let isProcessingRemote = false;
    let reconnectAttempts = 0;
    let reconnectTimeout = null;
    let unsubscribe = null;
    let isDisposed = false;
    // Connection state management
    let connectionState = 'connecting';
    const stateCallbacks = new Set();
    const setState = (state) => {
        connectionState = state;
        stateCallbacks.forEach(cb => cb(state));
    };
    let ws = null;
    const flushBatch = () => {
        if (pendingBatch.length === 0 || !ws || ws.readyState !== WebSocket.OPEN) {
            batchTimeout = null;
            return;
        }
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
        if (sentOps.size > SENT_OPS_LIMIT) {
            const oldest = sentOps.values().next().value;
            if (oldest)
                sentOps.delete(oldest);
        }
        if (!batchTimeout) {
            batchTimeout = setTimeout(flushBatch, BATCH_DELAY_MS);
        }
    };
    const handleMessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.type === 'operation') {
            isProcessingRemote = true;
            mockValtioEgwalker.apply_remote_op(proxyState, JSON.stringify(message.op));
            isProcessingRemote = false;
        }
        else if (message.type === 'batch') {
            isProcessingRemote = true;
            for (const op of message.ops || []) {
                mockValtioEgwalker.apply_remote_op(proxyState, JSON.stringify(op));
            }
            isProcessingRemote = false;
        }
        else if (message.type === 'sync') {
            isProcessingRemote = true;
            for (const op of message.ops || []) {
                mockValtioEgwalker.apply_remote_op(proxyState, JSON.stringify(op));
            }
            isProcessingRemote = false;
        }
    };
    const connect = () => {
        if (isDisposed)
            return;
        setState('connecting');
        ws = new WebSocket(url);
        ws.onopen = () => {
            setState('connected');
            reconnectAttempts = 0;
            ws.send(JSON.stringify({ type: 'join', room: roomId }));
            flushBatch();
        };
        ws.onmessage = handleMessage;
        ws.onerror = () => {
            // Error handling is done in onclose
        };
        ws.onclose = () => {
            if (isDisposed) {
                setState('disconnected');
                return;
            }
            // Attempt reconnection with exponential backoff
            if (reconnectAttempts < RECONNECT_MAX_ATTEMPTS) {
                setState('reconnecting');
                const delay = Math.min(RECONNECT_BASE_DELAY_MS * Math.pow(2, reconnectAttempts), RECONNECT_MAX_DELAY_MS);
                reconnectAttempts++;
                console.info(`[STUB] WebSocket disconnected, reconnecting in ${delay}ms (attempt ${reconnectAttempts})`);
                reconnectTimeout = setTimeout(connect, delay);
            }
            else {
                setState('disconnected');
                console.warn('[STUB] WebSocket max reconnection attempts reached');
            }
        };
    };
    // Initial connection
    connect();
    // Subscribe to proxy changes
    unsubscribe = subscribe(proxyState, () => {
        if (isProcessingRemote)
            return;
        const opsJson = mockValtioEgwalker.get_pending_ops_json(proxyState);
        const ops = JSON.parse(opsJson);
        for (const op of ops) {
            queueOperation(op);
        }
    });
    const cleanup = () => {
        isDisposed = true;
        if (unsubscribe)
            unsubscribe();
        if (batchTimeout) {
            clearTimeout(batchTimeout);
            flushBatch();
        }
        if (reconnectTimeout) {
            clearTimeout(reconnectTimeout);
        }
        if (ws) {
            ws.close();
        }
        stateCallbacks.clear();
    };
    return {
        ws,
        cleanup,
        getState: () => connectionState,
        onStateChange: (callback) => {
            stateCallbacks.add(callback);
            return () => stateCallbacks.delete(callback);
        },
    };
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
export function createEgWalkerProxy(config) {
    const { create_egwalker_proxy, apply_remote_op, get_pending_ops_json, get_frontier_json, get_frontier_raw_json, undo: moonbitUndo, redo: moonbitRedo, dispose_proxy, get_undo_stack_size, get_redo_stack_size, set_suppress_undo_tracking, } = mockValtioEgwalker;
    const proxyState = create_egwalker_proxy(config.agentId, config.undoManager || false);
    instanceMap.set(proxyState, proxyState);
    let wsConnection = null;
    if (config.websocketUrl && config.roomId) {
        wsConnection = setupWebSocketSync(proxyState, config.websocketUrl, config.roomId);
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
            if (wsConnection) {
                wsConnection.cleanup();
            }
            dispose_proxy(proxyState);
        },
        // Extended API for UI
        getUndoStackSize: () => get_undo_stack_size(proxyState),
        getRedoStackSize: () => get_redo_stack_size(proxyState),
        suppressUndoTracking: (suppress) => set_suppress_undo_tracking(proxyState, suppress),
        getConnectionState: () => wsConnection?.getState() ?? 'offline',
        onConnectionStateChange: wsConnection
            ? (callback) => wsConnection.onStateChange(callback)
            : undefined,
    };
}
/**
 * Utility: Create a text proxy without network sync (STUB)
 */
export function createTextProxy(agentId, options) {
    return createEgWalkerProxy({
        agentId,
        undoManager: options?.undoManager,
    });
}
