// Collaborative feature state — shared between EditorPanel and CollaborativeDemo.

import { proxy } from 'valtio/vanilla';

export interface OperationLog {
  agentId: string;
  type: 'insert' | 'delete' | 'undo' | 'redo' | 'sync';
  content?: string;
  timestamp: number;
}

export const opsLog = proxy<{ operations: OperationLog[] }>({
  operations: [],
});

export const sharedDoc = proxy<{ text: string }>({
  text: '',
});

export const WS_URL = 'ws://localhost:8787';
export const ROOM_ID = 'demo-room';

const MAX_LOG_ENTRIES = 15;

export function logOperation(entry: OperationLog) {
  opsLog.operations.push(entry);
  if (opsLog.operations.length > MAX_LOG_ENTRIES) {
    opsLog.operations.shift();
  }
}
