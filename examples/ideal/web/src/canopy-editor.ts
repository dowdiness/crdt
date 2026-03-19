import { EditorState, NodeSelection } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { Node as PmNode } from "prosemirror-model";
import { editorSchema } from "./schema";
import { TermLeafView } from "./leaf-editor";
import { LambdaView, LetDefView } from "./text-nodeview";
import { structuralKeymap } from "./keymap";
import { CanopyEvents } from "./events";
import { CrdtBridge } from "./bridge";
import { projNodeToDoc } from "./convert";
import type { CrdtModule, ProjNodeJson } from './types';

/** Extract a human-readable label from a PM node based on its type */
function getNodeLabel(node: PmNode): string {
  switch (node.type.name) {
    case 'int_literal': return String(node.attrs.value);
    case 'var_ref':
    case 'unbound_ref': return node.attrs.name ?? '';
    case 'lambda': return node.attrs.param ?? '';
    case 'let_def': return node.attrs.name ?? '';
    default: return node.type.name;
  }
}

export class CanopyEditor extends HTMLElement {
  private shadow: ShadowRoot;
  private editorContainer: HTMLDivElement;
  private pmView: EditorView | null = null;
  private bridge: CrdtBridge | null = null;
  private _crdtHandle: number | null = null;
  private _crdt: CrdtModule | null = null;

  static get observedAttributes() {
    return ['mode', 'readonly'];
  }

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });

    // Inject styles that read CSS custom properties from host
    const style = document.createElement('style');
    style.textContent = `
      :host {
        display: block;
        width: 100%;
        height: 100%;
        font-family: var(--canopy-font-mono, 'JetBrains Mono', monospace);
        background: var(--canopy-bg, #1a1a2e);
        color: var(--canopy-fg, #e8e8f0);
      }
      #editor-root {
        width: 100%;
        height: 100%;
        overflow: auto;
      }
    `;
    this.shadow.appendChild(style);

    this.editorContainer = document.createElement('div');
    this.editorContainer.id = 'editor-root';
    this.shadow.appendChild(this.editorContainer);
  }

  connectedCallback() {
    // PM + CM6 mounted later via mount() call
  }

  disconnectedCallback() {
    if (this.pmView) {
      this.pmView.destroy();
      this.pmView = null;
    }
  }

  attributeChangedCallback(_name: string, _old: string | null, _val: string | null) {
    // Mode is always read from the attribute via the getter; no internal state to sync.
  }

  // Called by Rabbita's raw_effect(AfterRender)
  mount(crdtHandle: number, crdt: CrdtModule): void {
    this._crdtHandle = crdtHandle;
    this._crdt = crdt;

    // Create the bridge
    this.bridge = new CrdtBridge(crdtHandle, crdt);

    // Get initial ProjNode from the CRDT and build PM doc from it
    let doc: PmNode;
    const projJsonStr = crdt.get_proj_node_json(crdtHandle);
    if (projJsonStr && projJsonStr !== "null") {
      const projJson: ProjNodeJson = JSON.parse(projJsonStr);
      doc = projNodeToDoc(projJson);
    } else {
      // Fallback: empty module
      doc = editorSchema.node("doc", null, [
        editorSchema.node("module", { nodeId: 0 }),
      ]);
    }

    const pmState = EditorState.create({
      doc,
      plugins: [
        structuralKeymap(this),
      ],
    });

    const bridge = this.bridge;

    this.pmView = new EditorView(this.editorContainer, {
      state: pmState,
      nodeViews: {
        int_literal: (node, view, getPos) => new TermLeafView(node, view, getPos, bridge),
        var_ref: (node, view, getPos) => new TermLeafView(node, view, getPos, bridge),
        unbound_ref: (node, view, getPos) => new TermLeafView(node, view, getPos, bridge),
        lambda: (node, view, getPos) => new LambdaView(node, view, getPos, bridge),
        let_def: (node, view, getPos) => new LetDefView(node, view, getPos, bridge),
      },
      dispatchTransaction: (tr) => {
        if (!this.pmView) return;
        this.pmView.updateState(this.pmView.state.apply(tr));
        // Loop prevention: suppress events for external reconciliation
        if (tr.getMeta('fromExternal')) return;
        // Node selection events
        if (tr.selectionSet) {
          const sel = tr.selection;
          if (sel instanceof NodeSelection) {
            this.dispatchEvent(new CustomEvent(CanopyEvents.NODE_SELECTED, {
              detail: {
                nodeId: String(sel.node.attrs.nodeId),
                kind: sel.node.type.name,
                label: getNodeLabel(sel.node),
              },
              bubbles: true, composed: true,
            }));
          }
        }
      },
    });

    this.bridge.setPmView(this.pmView);
  }

  // --- Properties (Rabbita -> PM) ---

  set projNode(json: string) {
    // Bridge reads ProjNode directly from CRDT — just trigger reconcile
    if (this.bridge) {
      this.bridge.reconcile();
    }
  }

  set sourceMap(_json: string) {
    // No-op: bridge reads source map from CRDT on demand
  }

  set peers(json: string) {
    // Task 12: update peer cursor decorations
  }

  set errors(json: string) {
    // Task 9: update error squiggly decorations
  }

  set selectedNode(id: string | null) {
    // Task 8: highlight/scroll to node in PM
  }

  get mode(): 'text' | 'structure' {
    return (this.getAttribute('mode') as 'text' | 'structure') || 'text';
  }

  set mode(m: 'text' | 'structure') {
    this.setAttribute('mode', m);
    // Task 10: re-render NodeViews in new style
  }

  /** Expose the bridge for external consumers (e.g. Rabbita host for sync) */
  getBridge(): CrdtBridge | null {
    return this.bridge;
  }
}

customElements.define('canopy-editor', CanopyEditor);
