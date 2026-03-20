import './canopy-editor';
import type { CanopyEditor } from './canopy-editor';
import { CanopyEvents } from './events';
import { SyncClient } from './sync';

// Single module: includes Rabbita + CRDT FFI (no separate @moonbit/canopy needed).
// This runs MoonBit's main() which mounts Rabbita and renders <canopy-editor>.
import * as crdt from '@moonbit/ideal-editor';

type NodeSelectedDetail = {
  nodeId?: string;
};

type StructuralEditDetail = {
  op?: string;
  nodeId?: string;
};

type CanopyGlobal = typeof globalThis & {
  __canopy_crdt?: typeof crdt;
  __canopy_crdt_handle?: number;
  __canopy_pending_node_selection?: string | null;
  __canopy_pending_structural_edit?: StructuralEditDetail | null;
};

const canopyGlobal = globalThis as CanopyGlobal;
const AGENT_ID_STORAGE_KEY = 'canopy-ideal-agent-id';
let activeSyncClient: SyncClient | null = null;
let beforeUnloadRegistered = false;

// Expose CRDT state globally for MoonBit FFI bridge functions.
canopyGlobal.__canopy_crdt = crdt;

function createAgentId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `ideal-${crypto.randomUUID()}`;
  }
  return `ideal-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

function getSessionAgentId(): string {
  try {
    const existing = window.sessionStorage.getItem(AGENT_ID_STORAGE_KEY);
    if (existing) return existing;
    const agentId = createAgentId();
    window.sessionStorage.setItem(AGENT_ID_STORAGE_KEY, agentId);
    return agentId;
  } catch {
    return createAgentId();
  }
}

function clickTrigger(id: string) {
  const btn = document.getElementById(id) as HTMLButtonElement | null;
  if (btn) btn.click();
}

function wireEditorEvents(el: CanopyEditor) {
  el.addEventListener(CanopyEvents.TEXT_CHANGE, () => {
    clickTrigger('canopy-text-sync-trigger');
  });
  el.addEventListener(CanopyEvents.NODE_SELECTED, ((event: Event) => {
    const { nodeId } = (event as CustomEvent<NodeSelectedDetail>).detail ?? {};
    canopyGlobal.__canopy_pending_node_selection = nodeId ?? null;
    clickTrigger('canopy-node-selected-trigger');
  }) as EventListener);
  el.addEventListener(CanopyEvents.STRUCTURAL_EDIT_REQUEST, ((event: Event) => {
    const { op, nodeId } = (event as CustomEvent<StructuralEditDetail>).detail ?? {};
    canopyGlobal.__canopy_pending_structural_edit =
      op && nodeId ? { op, nodeId } : null;
    clickTrigger('canopy-structural-edit-trigger');
  }) as EventListener);
  el.addEventListener(CanopyEvents.REQUEST_UNDO, () => {
    clickTrigger('canopy-undo-trigger');
  });
  el.addEventListener(CanopyEvents.REQUEST_REDO, () => {
    clickTrigger('canopy-redo-trigger');
  });
}

function startSync(el: CanopyEditor, handle: number) {
  activeSyncClient?.disconnect();

  const syncClient = new SyncClient(el, handle, crdt);
  activeSyncClient = syncClient;

  const bridge = el.getBridge();
  if (bridge) {
    bridge.setBroadcast(() => {
      syncClient.broadcast();
    });
  }

  syncClient.connect();

  if (!beforeUnloadRegistered) {
    beforeUnloadRegistered = true;
    window.addEventListener('beforeunload', () => {
      activeSyncClient?.disconnect();
    });
  }
}

function mountWhenReady() {
  const el = document.querySelector('canopy-editor') as CanopyEditor | null;
  if (el) {
    doMount(el);
    return;
  }
  const observer = new MutationObserver((_mutations, obs) => {
    const found = document.querySelector('canopy-editor') as CanopyEditor | null;
    if (found) {
      obs.disconnect();
      doMount(found);
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

function doMount(el: CanopyEditor) {
  const handle = crdt.create_editor_with_undo(getSessionAgentId(), 500);
  const text = 'let id = \\x.x\nlet apply = \\f.\\x.f x\napply id 42';
  canopyGlobal.__canopy_crdt_handle = handle;
  canopyGlobal.__canopy_pending_node_selection = null;
  canopyGlobal.__canopy_pending_structural_edit = null;
  crdt.set_text(handle, text);
  el.mount(handle, crdt);
  wireEditorEvents(el);
  startSync(el, handle);
}

mountWhenReady();
