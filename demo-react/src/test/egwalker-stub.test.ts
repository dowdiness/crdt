import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { createEgWalkerProxy, type TextState } from 'valtio-egwalker/stub';

describe('createEgWalkerProxy', () => {
  let proxy: ReturnType<typeof createEgWalkerProxy<TextState>>;

  beforeEach(() => {
    proxy = createEgWalkerProxy<TextState>({
      agentId: 'test-agent',
      undoManager: true,
    });
  });

  afterEach(() => {
    proxy.dispose();
  });

  describe('basic operations', () => {
    it('should create a proxy with initial empty state', () => {
      expect(proxy.proxy.text).toBe('');
      expect(proxy.proxy.cursor).toBe(0);
      expect(proxy.proxy.syncing).toBe(false);
    });

    it('should update text when mutating proxy', () => {
      proxy.proxy.text = 'Hello';
      expect(proxy.proxy.text).toBe('Hello');
    });

    it('should update cursor when mutating proxy', () => {
      proxy.proxy.cursor = 5;
      expect(proxy.proxy.cursor).toBe(5);
    });
  });

  describe('undo/redo', () => {
    it('should track changes in undo stack', async () => {
      expect(proxy.getUndoStackSize?.()).toBe(0);

      proxy.proxy.text = 'a';
      // Wait for subscription to fire
      await new Promise(resolve => setTimeout(resolve, 10));

      expect(proxy.getUndoStackSize?.()).toBe(1);
    });

    it('should undo changes', async () => {
      proxy.proxy.text = 'Hello';
      await new Promise(resolve => setTimeout(resolve, 10));

      proxy.undo();
      expect(proxy.proxy.text).toBe('');
    });

    it('should redo undone changes', async () => {
      proxy.proxy.text = 'Hello';
      await new Promise(resolve => setTimeout(resolve, 10));

      proxy.undo();
      expect(proxy.proxy.text).toBe('');

      proxy.redo();
      expect(proxy.proxy.text).toBe('Hello');
    });

    it('should clear redo stack on new changes', async () => {
      proxy.proxy.text = 'Hello';
      await new Promise(resolve => setTimeout(resolve, 10));

      proxy.undo();
      expect(proxy.getRedoStackSize?.()).toBe(1);

      proxy.proxy.text = 'World';
      await new Promise(resolve => setTimeout(resolve, 10));

      expect(proxy.getRedoStackSize?.()).toBe(0);
    });

    it('should not track changes when suppressed', async () => {
      proxy.suppressUndoTracking?.(true);
      proxy.proxy.text = 'Hello';
      proxy.suppressUndoTracking?.(false);

      await new Promise(resolve => setTimeout(resolve, 10));

      expect(proxy.getUndoStackSize?.()).toBe(0);
    });
  });

  describe('multiple undo/redo', () => {
    it('should handle multiple undos', async () => {
      proxy.proxy.text = 'a';
      await new Promise(resolve => setTimeout(resolve, 10));

      proxy.proxy.text = 'ab';
      await new Promise(resolve => setTimeout(resolve, 10));

      proxy.proxy.text = 'abc';
      await new Promise(resolve => setTimeout(resolve, 10));

      expect(proxy.getUndoStackSize?.()).toBe(3);

      proxy.undo();
      expect(proxy.proxy.text).toBe('ab');

      proxy.undo();
      expect(proxy.proxy.text).toBe('a');

      proxy.undo();
      expect(proxy.proxy.text).toBe('');
    });
  });
});

describe('createEgWalkerProxy without undo manager', () => {
  it('should not track undo when disabled', async () => {
    const proxy = createEgWalkerProxy<TextState>({
      agentId: 'test-agent',
      undoManager: false,
    });

    proxy.proxy.text = 'Hello';
    await new Promise(resolve => setTimeout(resolve, 10));

    // Undo should be a no-op
    proxy.undo();
    expect(proxy.proxy.text).toBe('Hello');

    proxy.dispose();
  });
});

describe('connection state', () => {
  it('should report offline when no WebSocket configured', () => {
    const proxy = createEgWalkerProxy<TextState>({
      agentId: 'test-agent',
    });

    expect(proxy.getConnectionState?.()).toBe('offline');
    proxy.dispose();
  });

  it('should start connecting when WebSocket configured', async () => {
    const proxy = createEgWalkerProxy<TextState>({
      agentId: 'test-agent',
      websocketUrl: 'ws://localhost:8787',
      roomId: 'test-room',
    });

    // Initial state should be connecting
    expect(proxy.getConnectionState?.()).toBe('connecting');

    // Wait for mock WebSocket to connect
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(proxy.getConnectionState?.()).toBe('connected');

    proxy.dispose();
  });
});
