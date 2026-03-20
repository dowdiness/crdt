import { EditorState as PmState, NodeSelection } from "prosemirror-state";
import { EditorView as PmView } from "prosemirror-view";
import { Node as PmNode } from "prosemirror-model";
import { EditorView as CmView, keymap as cmKeymap } from "@codemirror/view";
import { EditorState as CmState } from "@codemirror/state";
import { defaultKeymap } from "@codemirror/commands";
import { editorSchema } from "./schema";
import { StructureCompoundView, StructureLeafView } from "./structure-nodeview";
import { structuralKeymap } from "./keymap";
import { CanopyEvents } from "./events";
import { CrdtBridge } from "./bridge";
import { projNodeToDoc } from "./convert";
import {
  peerCursorPlugin,
  errorDecoPlugin,
  evalGhostPlugin,
} from "./decorations";
import type { CrdtModule } from './types';

export class CanopyEditor extends HTMLElement {
  private shadow: ShadowRoot;
  private editorContainer: HTMLDivElement;
  // Text Mode: single CM6 editor showing raw source text
  private cmView: CmView | null = null;
  // Structure Mode: PM editor showing AST as blocks
  private pmView: PmView | null = null;
  private bridge: CrdtBridge | null = null;
  private crdtHandle: number | null = null;
  private crdt: CrdtModule | null = null;
  private mountAbortController: AbortController | null = null;
  private updating = false;

  static get observedAttributes() {
    return ['mode', 'readonly'];
  }

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.textContent = SHADOW_STYLES;
    this.shadow.appendChild(style);

    this.editorContainer = document.createElement('div');
    this.editorContainer.id = 'editor-root';
    this.shadow.appendChild(this.editorContainer);
  }

  connectedCallback() {}

  disconnectedCallback() {
    if (this.mountAbortController) {
      this.mountAbortController.abort();
      this.mountAbortController = null;
    }
    this.destroyCm();
    this.destroyPm();
    if (this.bridge) {
      this.bridge.destroy();
      this.bridge = null;
    }
  }

  attributeChangedCallback(name: string, _old: string | null, val: string | null) {
    if (name === 'mode' && val && this.crdt) {
      this.switchMode(val as 'text' | 'structure');
    }
    if (name === 'readonly') {
      const ro = val !== null && val !== 'false';
      if (this.pmView) {
        this.pmView.setProps({ editable: () => !ro });
      }
      if (this.cmView) {
        // Remount CM6 to apply readonly (no hot reconfigure API for editable)
        this.destroyCm();
        this.editorContainer.innerHTML = '';
        this.mountTextMode();
      }
    }
  }

  mount(crdtHandle: number, crdt: CrdtModule): void {
    if (this.mountAbortController) this.mountAbortController.abort();
    this.mountAbortController = new AbortController();

    this.destroyCm();
    this.destroyPm();
    if (this.bridge) { this.bridge.destroy(); this.bridge = null; }

    this.crdtHandle = crdtHandle;
    this.crdt = crdt;
    this.bridge = new CrdtBridge(crdtHandle, crdt);

    // Wire sync-received
    const { signal } = this.mountAbortController;
    this.addEventListener('sync-received', ((e: CustomEvent) => {
      if (!this.bridge) return;
      this.bridge.applyRemote(e.detail.data);
      this.syncCmFromCrdt();
      this.dispatchEvent(new CustomEvent(CanopyEvents.TEXT_CHANGE, {
        bubbles: true, composed: true,
      }));
    }) as EventListener, { signal });

    if (this.mode === 'text') {
      this.mountTextMode();
    } else {
      this.mountStructureMode();
    }
  }

  // ── Text Mode: single CM6 showing raw source text ──────

  private mountTextMode(): void {
    this.destroyPm();
    if (this.cmView) return; // already mounted

    const text = this.crdt!.get_text(this.crdtHandle!);

    this.cmView = new CmView({
      state: CmState.create({
        doc: text,
        extensions: [
          CmView.theme({
            "&": {
              backgroundColor: "transparent",
              color: "var(--canopy-fg, #e4e4f0)",
              fontFamily: "var(--canopy-font-mono, 'Iosevka', monospace)",
              fontSize: "18px",
              height: "100%",
            },
            ".cm-scroller": {
              overflow: "auto",
              height: "100%",
            },
            ".cm-content": {
              caretColor: "var(--canopy-fg, #e4e4f0)",
              padding: "16px",
              minHeight: "100%",
            },
            "&.cm-focused": {
              outline: "none",
            },
            ".cm-cursor": {
              borderLeftColor: "var(--canopy-fg, #e4e4f0)",
            },
            ".cm-gutters": {
              backgroundColor: "transparent",
              color: "var(--canopy-muted, #8888a8)",
              border: "none",
            },
            ".cm-activeLineGutter": {
              backgroundColor: "transparent",
              color: "var(--canopy-fg, #e4e4f0)",
            },
            ".cm-activeLine": {
              backgroundColor: "rgba(255,255,255,0.03)",
            },
          }),
          cmKeymap.of([
            // Keep undo/redo on the CRDT timeline instead of CM local history.
            {
              key: "Mod-z",
              run: () => {
                this.dispatchEvent(new CustomEvent(CanopyEvents.REQUEST_UNDO, {
                  bubbles: true, composed: true,
                }));
                return true;
              },
            },
            {
              key: "Mod-Shift-z",
              run: () => {
                this.dispatchEvent(new CustomEvent(CanopyEvents.REQUEST_REDO, {
                  bubbles: true, composed: true,
                }));
                return true;
              },
            },
            ...defaultKeymap,
          ]),
          CmView.lineWrapping,
          // Forward text changes to CRDT
          CmView.updateListener.of(update => {
            if (this.updating || !update.docChanged || !this.crdt || this.crdtHandle === null) return;
            // Get old and new text, compute diff, apply to CRDT
            const newText = update.state.doc.toString();
            // Use set_text_and_record so changes go into undo stack
            if (this.crdt.set_text_and_record) {
              this.crdt.set_text_and_record(this.crdtHandle, newText, Date.now());
            } else {
              this.crdt.set_text(this.crdtHandle, newText);
            }
            // Notify Rabbita
            this.bridge?.notifyLocalChange();
            this.dispatchEvent(new CustomEvent(CanopyEvents.TEXT_CHANGE, {
              bubbles: true, composed: true,
            }));
          }),
        ],
      }),
      parent: this.editorContainer,
      root: this.shadow,
    });
  }

  private destroyCm(): void {
    if (this.cmView) {
      this.cmView.destroy();
      this.cmView = null;
    }
  }

  /** Sync CM6 content from CRDT (after external changes) */
  private syncCmFromCrdt(): void {
    if (!this.cmView || !this.crdt || this.crdtHandle === null) return;
    this.updating = true;
    const newText = this.crdt.get_text(this.crdtHandle);
    const oldText = this.cmView.state.doc.toString();
    if (newText !== oldText) {
      this.cmView.dispatch({
        changes: { from: 0, to: oldText.length, insert: newText },
      });
    }
    this.updating = false;
  }

  // ── Structure Mode: PM with block NodeViews ────────────

  private mountStructureMode(): void {
    this.destroyCm();
    if (this.pmView) return;

    let doc: PmNode;
    const projJsonStr = this.crdt!.get_proj_node_json(this.crdtHandle!);
    if (projJsonStr && projJsonStr !== "null") {
      try {
        doc = projNodeToDoc(JSON.parse(projJsonStr));
      } catch (e) {
        console.error("[canopy-editor] Failed to build PM doc:", e);
        doc = editorSchema.node("doc", null, [
          editorSchema.node("module", { nodeId: 0 }),
        ]);
      }
    } else {
      doc = editorSchema.node("doc", null, [
        editorSchema.node("module", { nodeId: 0 }),
      ]);
    }

    const pmState = PmState.create({
      doc,
      plugins: [
        structuralKeymap(this),
        peerCursorPlugin(),
        errorDecoPlugin(),
        evalGhostPlugin(),
      ],
    });

    this.pmView = new PmView(this.editorContainer, {
      state: pmState,
      nodeViews: this.createStructureNodeViews(),
      dispatchTransaction: (tr) => {
        if (!this.pmView) return;
        this.pmView.updateState(this.pmView.state.apply(tr));
        if (tr.getMeta('fromExternal')) return;
        if (tr.selectionSet) {
          const sel = tr.selection;
          if (sel instanceof NodeSelection) {
            this.dispatchEvent(new CustomEvent(CanopyEvents.NODE_SELECTED, {
              detail: {
                nodeId: String(sel.node.attrs.nodeId),
                kind: sel.node.type.name,
                label: sel.node.attrs.name ?? sel.node.attrs.param ?? String(sel.node.attrs.value ?? ''),
              },
              bubbles: true, composed: true,
            }));
          }
        }
      },
    });

    if (this.bridge) this.bridge.setPmView(this.pmView);
  }

  private destroyPm(): void {
    if (this.pmView) {
      this.pmView.destroy();
      this.pmView = null;
    }
  }

  // ── Mode switching ─────────────────────────────────────

  private switchMode(m: 'text' | 'structure'): void {
    if (m === 'text') {
      this.destroyPm();
      this.editorContainer.innerHTML = '';
      this.mountTextMode();
    } else {
      this.destroyCm();
      this.editorContainer.innerHTML = '';
      this.mountStructureMode();
    }
  }

  // ── Properties (Rabbita → editor) ──────────────────────

  set projNode(_json: string) {
    if (this.mode === 'text') {
      this.syncCmFromCrdt();
    } else if (this.bridge && this.pmView) {
      this.bridge.reconcile();
    }
  }

  set sourceMap(_json: string) { /* bridge reads on demand */ }

  set peers(_json: string) { /* TODO: CM6 peer cursor decorations */ }
  set errors(_json: string) { /* TODO: CM6 lint decorations */ }
  set evalResults(_json: string) { /* TODO: CM6 eval ghost decorations */ }

  set selectedNode(id: string | null) {
    if (!id || !this.crdt || this.crdtHandle === null) return;
    if (this.cmView) {
      // Text mode: find node's span in source map and select it in CM6
      try {
        const smJson = JSON.parse(this.crdt.get_source_map_json(this.crdtHandle));
        const entry = smJson.find((r: any) => String(r.node_id) === id);
        if (entry) {
          const from = entry.start;
          const to = entry.end;
          this.cmView.dispatch({
            selection: { anchor: from, head: to },
            scrollIntoView: true,
          });
          this.cmView.focus();
        }
      } catch { /* source map parse failure — ignore */ }
    } else if (this.pmView) {
      let targetPos: number | null = null;
      this.pmView.state.doc.descendants((node, pos) => {
        if (String(node.attrs.nodeId) === id && NodeSelection.isSelectable(node)) {
          targetPos = pos;
          return false;
        }
        return true;
      });
      if (targetPos === null) return;
      let selectionUnchanged = false;
      const currentSelection = this.pmView.state.selection;
      if (currentSelection instanceof NodeSelection) {
        selectionUnchanged = currentSelection.from === targetPos;
      }
      if (selectionUnchanged) return;
      const tr = this.pmView.state.tr
        .setSelection(NodeSelection.create(this.pmView.state.doc, targetPos))
        .scrollIntoView();
      tr.setMeta('fromExternal', true);
      this.pmView.dispatch(tr);
      this.pmView.focus();
    }
  }

  get mode(): 'text' | 'structure' {
    return (this.getAttribute('mode') as 'text' | 'structure') || 'text';
  }

  set mode(m: 'text' | 'structure') {
    if (m === this.getAttribute('mode')) return;
    this.setAttribute('mode', m);
  }

  // ── Structure Mode NodeViews ───────────────────────────

  private createStructureNodeViews() {
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

  getBridge(): CrdtBridge | null {
    return this.bridge;
  }
}

customElements.define('canopy-editor', CanopyEditor);

// ── Shadow DOM Styles ─────────────────────────────────────

const SHADOW_STYLES = `
  :host {
    display: block;
    width: 100%;
    height: 100%;
    font-family: var(--canopy-font-mono, 'Iosevka', monospace);
    background: var(--canopy-bg, #161625);
    color: var(--canopy-fg, #e4e4f0);
  }
  #editor-root {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  /* ProseMirror base (structure mode) */
  .ProseMirror {
    position: relative;
    word-wrap: break-word;
    white-space: pre-wrap;
    font-family: var(--canopy-font-mono, 'Iosevka', monospace);
    font-size: var(--text-code, 1.125rem);
    line-height: 1.6;
    outline: none;
    min-height: 200px;
  }

  /* Structure mode blocks */
  .structure-block {
    border: 1px solid var(--canopy-border, #28283e);
    border-radius: 6px;
    margin: 4px 0;
    padding: 8px 12px;
    background: rgba(255, 255, 255, 0.02);
  }
  .structure-header {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .structure-grip {
    color: var(--canopy-muted, #8888a8);
    cursor: grab;
    font-size: 0.6875rem;
  }
  .structure-badge {
    font-size: 0.6875rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 1px 5px;
    border-radius: 3px;
    background: rgba(255, 255, 255, 0.04);
  }
  .structure-label {
    font-family: var(--canopy-font-mono, monospace);
    font-size: 13px;
    font-weight: 600;
    color: var(--canopy-fg, #e4e4f0);
  }
  .structure-children {
    margin-left: 20px;
    margin-top: 6px;
  }
  .structure-leaf {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 4px 8px;
  }
  .structure-value {
    font-family: var(--canopy-font-mono, monospace);
    font-size: 13px;
    color: var(--canopy-fg, #e4e4f0);
  }
`;
