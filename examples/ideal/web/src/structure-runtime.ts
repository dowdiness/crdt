import { EditorState as PmState, NodeSelection } from "prosemirror-state";
import { EditorView as PmView } from "prosemirror-view";
import { Node as PmNode } from "prosemirror-model";
import { editorSchema } from "./schema";
import { StructureCompoundView, StructureLeafView } from "./structure-nodeview";
import { structuralKeymap, actionKeyForwardPlugin } from "./keymap";
import { CanopyEvents } from "./events";
import { CrdtBridge } from "./bridge";
import { projNodeToDoc } from "./convert";
import {
  peerCursorPlugin,
  errorDecoPlugin,
  evalGhostPlugin,
} from "./decorations";
import type { CrdtModule } from "./types";

export type StructureModeSession = {
  applyRemote(syncJson: string): void;
  destroy(): void;
  notifyLocalChange(): void;
  reconcile(): void;
  setBroadcast(fn: (() => void) | null): void;
  setReadonly(readonly: boolean): void;
  setSelectedNode(id: string | null): void;
};

function buildDoc(crdtHandle: number, crdt: CrdtModule): PmNode {
  const projJsonStr = crdt.get_proj_node_json(crdtHandle);
  if (projJsonStr && projJsonStr !== "null") {
    try {
      return projNodeToDoc(JSON.parse(projJsonStr));
    } catch (error) {
      console.error("[canopy-editor] Failed to build PM doc:", error);
    }
  }
  return editorSchema.node("doc", null, [
    editorSchema.node("module", { nodeId: 0 }),
  ]);
}

function createStructureNodeViews() {
  return {
    module: (node: PmNode, view: PmView, getPos: () => number | undefined) =>
      new StructureCompoundView(node, view, getPos),
    let_def: (node: PmNode, view: PmView, getPos: () => number | undefined) =>
      new StructureCompoundView(node, view, getPos),
    lambda: (node: PmNode, view: PmView, getPos: () => number | undefined) =>
      new StructureCompoundView(node, view, getPos),
    application: (node: PmNode, view: PmView, getPos: () => number | undefined) =>
      new StructureCompoundView(node, view, getPos),
    binary_op: (node: PmNode, view: PmView, getPos: () => number | undefined) =>
      new StructureCompoundView(node, view, getPos),
    if_expr: (node: PmNode, view: PmView, getPos: () => number | undefined) =>
      new StructureCompoundView(node, view, getPos),
    int_literal: (node: PmNode) => new StructureLeafView(node),
    var_ref: (node: PmNode) => new StructureLeafView(node),
    unbound_ref: (node: PmNode) => new StructureLeafView(node),
    error_node: (node: PmNode) => new StructureLeafView(node),
    unit: (node: PmNode) => new StructureLeafView(node),
  };
}

function setSelectedNode(pmView: PmView, id: string | null): void {
  if (!id) return;
  let targetPos: number | null = null;
  pmView.state.doc.descendants((node, pos) => {
    if (String(node.attrs.nodeId) === id && NodeSelection.isSelectable(node)) {
      targetPos = pos;
      return false;
    }
    return true;
  });
  if (targetPos === null) return;
  let selectionUnchanged = false;
  const currentSelection = pmView.state.selection;
  if (currentSelection instanceof NodeSelection) {
    selectionUnchanged = currentSelection.from === targetPos;
  }
  if (selectionUnchanged) return;
  const tr = pmView.state.tr
    .setSelection(NodeSelection.create(pmView.state.doc, targetPos))
    .scrollIntoView();
  tr.setMeta("fromExternal", true);
  pmView.dispatch(tr);
  pmView.focus();
}

export function createStructureModeSession(
  parent: HTMLDivElement,
  host: HTMLElement,
  crdtHandle: number,
  crdt: CrdtModule,
): StructureModeSession {
  const bridge = new CrdtBridge(crdtHandle, crdt);
  const pmView = new PmView(parent, {
    state: PmState.create({
      doc: buildDoc(crdtHandle, crdt),
      plugins: [
        structuralKeymap(host),
        actionKeyForwardPlugin(host),
        peerCursorPlugin(),
        errorDecoPlugin(),
        evalGhostPlugin(),
      ],
    }),
    nodeViews: createStructureNodeViews(),
    dispatchTransaction: (tr) => {
      pmView.updateState(pmView.state.apply(tr));
      if (tr.getMeta("fromExternal")) return;
      if (tr.selectionSet) {
        const sel = tr.selection;
        if (sel instanceof NodeSelection) {
          host.dispatchEvent(new CustomEvent(CanopyEvents.NODE_SELECTED, {
            detail: {
              nodeId: String(sel.node.attrs.nodeId),
              kind: sel.node.type.name,
              label: sel.node.attrs.name ?? sel.node.attrs.param ?? String(sel.node.attrs.value ?? ""),
            },
            bubbles: true, composed: true,
          }));
        }
      }
    },
  });

  bridge.setPmView(pmView);

  // Long-press detection for touch devices
  let longPressTimer: ReturnType<typeof setTimeout> | null = null;

  parent.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'touch') return;
    const startX = e.clientX, startY = e.clientY;
    longPressTimer = setTimeout(() => {
      const sel = pmView.state.selection;
      if (sel instanceof NodeSelection) {
        host.dispatchEvent(new CustomEvent(CanopyEvents.LONG_PRESS, {
          detail: { nodeId: String(sel.node.attrs.nodeId) },
          bubbles: true, composed: true,
        }));
      }
    }, 500);
    const cancel = () => { if (longPressTimer) { clearTimeout(longPressTimer); longPressTimer = null; } };
    parent.addEventListener('pointerup', cancel, { once: true });
    parent.addEventListener('pointermove', (me) => {
      if (Math.abs(me.clientX - startX) > 10 || Math.abs(me.clientY - startY) > 10) cancel();
    }, { once: true });
  }, { passive: true });

  return {
    applyRemote(syncJson: string): void {
      bridge.applyRemote(syncJson);
    },
    destroy(): void {
      bridge.destroy();
      pmView.destroy();
    },
    notifyLocalChange(): void {
      bridge.notifyLocalChange();
    },
    reconcile(): void {
      bridge.reconcile();
    },
    setBroadcast(fn: (() => void) | null): void {
      bridge.setBroadcast(fn);
    },
    setReadonly(readonly: boolean): void {
      pmView.setProps({ editable: () => !readonly });
    },
    setSelectedNode(id: string | null): void {
      setSelectedNode(pmView, id);
    },
  };
}
