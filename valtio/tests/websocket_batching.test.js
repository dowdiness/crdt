import test from 'node:test';
import assert from 'node:assert/strict';

const BATCH_WAIT_MS = 250;

class FakeWebSocket {
  static CONNECTING = 0;
  static OPEN = 1;
  static CLOSING = 2;
  static CLOSED = 3;
  static instances = [];

  constructor(url) {
    this.url = url;
    this.readyState = FakeWebSocket.CONNECTING;
    this.sent = [];
    this.onopen = null;
    this.onmessage = null;
    this.onerror = null;
    this.onclose = null;
    FakeWebSocket.instances.push(this);
  }

  send(payload) {
    this.sent.push(payload);
  }

  open() {
    this.readyState = FakeWebSocket.OPEN;
    this.onopen?.();
  }

  close() {
    this.readyState = FakeWebSocket.CLOSED;
    this.onclose?.();
  }
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const makeOp = () => ({
  lv: 1,
  agent_id: 'agent-a',
  op_type: 'Insert',
  content: 'x',
  origin_left: 0,
  origin_right: 0,
  deps: [],
});

const installWebSocket = () => {
  FakeWebSocket.instances = [];
  globalThis.WebSocket = FakeWebSocket;
};

const expectJoinThenBatch = (ws) => {
  assert.equal(ws.sent.length, 2);
  assert.equal(JSON.parse(ws.sent[0]).type, 'join');
  assert.equal(JSON.parse(ws.sent[1]).type, 'batch');
};

test('sync flushes pending batch on socket open', async () => {
  installWebSocket();
  const { createEgWalkerProxy } = await import('../dist-test/src/egwalker_api_sync.js');

  const { proxy, dispose } = createEgWalkerProxy({
    agentId: 'agent-a',
    websocketUrl: 'ws://example.test',
    roomId: 'room-a',
  });

  const ws = FakeWebSocket.instances[0];
  proxy.__pendingOps = [makeOp()];
  proxy.text = 'hi';

  await delay(BATCH_WAIT_MS);
  assert.equal(ws.sent.length, 0);

  ws.open();
  expectJoinThenBatch(ws);

  dispose();
});

test('stub flushes pending batch on socket open', async () => {
  installWebSocket();
  const { createEgWalkerProxy } = await import('../dist-test/src/egwalker_api_stub.js');

  const { proxy, dispose } = createEgWalkerProxy({
    agentId: 'agent-a',
    websocketUrl: 'ws://example.test',
    roomId: 'room-a',
  });

  const ws = FakeWebSocket.instances[0];
  proxy.__pendingOps = [makeOp()];
  proxy.text = 'hi';

  await delay(BATCH_WAIT_MS);
  assert.equal(ws.sent.length, 0);

  ws.open();
  expectJoinThenBatch(ws);

  dispose();
});
