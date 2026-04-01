// HTMLAdapter: Vanilla DOM renderer for ViewPatch streams.
// Renders a ViewNode tree as DOM elements using data-node-id attributes.

import type { EditorAdapter } from './adapter';
import type { ViewNode, ViewPatch, UserIntent, Diagnostic } from './types';

/** Extract object member keys from an Object ViewNode label like "{name, enabled, count}". */
function parseObjectKeys(label: string): string[] | null {
  if (!label.startsWith('{') || !label.endsWith('}')) return null;
  const inner = label.slice(1, -1).trim();
  if (!inner) return [];
  return inner.split(',').map(k => k.trim());
}

/** Compute edge label for a child of a given parent ViewNode. */
function edgeLabelFor(parent: ViewNode, childIndex: number): string {
  if (parent.kind_tag === 'Object') {
    const keys = parseObjectKeys(parent.label);
    if (keys && childIndex < keys.length) return keys[childIndex];
  }
  return String(childIndex);
}

export class HTMLAdapter implements EditorAdapter {
  private container: HTMLElement;
  private diagnosticsEl: HTMLElement | null;
  private intentCallback: ((intent: UserIntent) => void) | null = null;
  private selectedNodeId: number | null = null;
  private currentTree: ViewNode | null = null;

  constructor(container: HTMLElement, diagnosticsEl?: HTMLElement) {
    this.container = container;
    this.diagnosticsEl = diagnosticsEl ?? null;
  }

  applyPatches(patches: ViewPatch[]): void {
    for (const patch of patches) {
      this.applyPatch(patch);
    }
  }

  onIntent(callback: (intent: UserIntent) => void): void {
    this.intentCallback = callback;
  }

  destroy(): void {
    this.intentCallback = null;
    this.currentTree = null;
    this.container.replaceChildren();
    if (this.diagnosticsEl) this.diagnosticsEl.replaceChildren();
  }

  getSelectedNodeId(): number | null {
    return this.selectedNodeId;
  }

  /** Get the current ViewNode tree root (for querying node kind, etc.). */
  getTree(): ViewNode | null {
    return this.currentTree;
  }

  /** Find a ViewNode by ID in the current tree. */
  findNode(nodeId: number): ViewNode | null {
    if (!this.currentTree) return null;
    return findNodeInTree(this.currentTree, nodeId);
  }

  private applyPatch(patch: ViewPatch): void {
    switch (patch.type) {
      case 'FullTree':
        this.currentTree = patch.root;
        this.container.replaceChildren();
        if (patch.root) {
          this.container.appendChild(this.renderNode(patch.root, null, true));
        } else {
          const empty = document.createElement('div');
          empty.className = 'tree-empty';
          empty.textContent = 'No structure available';
          this.container.appendChild(empty);
        }
        break;

      case 'ReplaceNode': {
        const el = this.container.querySelector(`[data-node-id="${patch.node_id}"]`);
        if (el) {
          const parent = el.parentElement;
          const isRoot = el === this.container.firstElementChild;
          const newEl = this.renderNode(patch.node, null, isRoot);
          if (parent) parent.replaceChild(newEl, el);
        }
        break;
      }

      case 'InsertChild': {
        const parent = this.container.querySelector(`[data-node-id="${patch.parent_id}"]`);
        if (parent) {
          const childrenEl = parent.querySelector(':scope > .node-children') ?? parent;
          const newChild = this.renderNode(patch.child, null, false);
          const refChild = childrenEl.children[patch.index] ?? null;
          childrenEl.insertBefore(newChild, refChild);
        }
        break;
      }

      case 'RemoveChild': {
        const el = this.container.querySelector(`[data-node-id="${patch.child_id}"]`);
        if (el) el.remove();
        break;
      }

      case 'UpdateNode': {
        const el = this.container.querySelector(`[data-node-id="${patch.node_id}"]`);
        if (el) {
          const labelEl = el.querySelector(':scope > .node-row > .node-tag') ??
                          el.querySelector(':scope > .node-tag');
          if (labelEl) labelEl.textContent = patch.label;
          if (patch.css_class) {
            const classes = el.className.split(/\s+/).filter(c => !c.startsWith('kind-'));
            classes.push(`kind-${patch.css_class}`);
            el.className = classes.join(' ');
          }
        }
        break;
      }

      case 'SetDiagnostics':
        if (this.diagnosticsEl) this.renderDiagnostics(patch.diagnostics);
        break;

      // Ignored patch types (CM6/PM specific)
      case 'TextChange':
      case 'SetDecorations':
      case 'SetSelection':
      case 'SelectNode':
        break;
    }
  }

  private renderNode(node: ViewNode, edgeLabel: string | null, isRoot: boolean): HTMLElement {
    const hasChildren = node.children.length > 0;
    const kindClass = node.kind_tag.toLowerCase();

    if (!hasChildren) {
      const wrapper = document.createElement('div');
      wrapper.className = isRoot ? 'tree-node root' : 'tree-node';

      const row = document.createElement('div');
      row.className = 'node-row';
      if (node.id === this.selectedNodeId) row.classList.add('selected');
      row.addEventListener('click', (e) => {
        e.stopPropagation();
        this.selectNode(node.id);
      });

      if (edgeLabel !== null) {
        const keyEl = document.createElement('span');
        keyEl.className = 'node-key';
        keyEl.textContent = `${edgeLabel}:`;
        row.appendChild(keyEl);
      }

      const tagEl = document.createElement('span');
      tagEl.className = `node-tag ${kindClass}`;
      tagEl.setAttribute('data-node-id', String(node.id));
      tagEl.textContent = node.label;
      row.appendChild(tagEl);

      const idEl = document.createElement('span');
      idEl.className = 'node-id';
      idEl.textContent = ` #${node.id}`;
      row.appendChild(idEl);

      wrapper.setAttribute('data-node-id', String(node.id));
      wrapper.appendChild(row);
      return wrapper;
    }

    const container = document.createElement('div');
    container.className = isRoot ? 'tree-node root' : 'tree-node';
    container.setAttribute('data-node-id', String(node.id));

    const row = document.createElement('div');
    row.className = 'node-row';
    if (node.id === this.selectedNodeId) row.classList.add('selected');

    row.addEventListener('click', (e) => {
      e.stopPropagation();
      this.selectNode(node.id);
    });

    if (edgeLabel !== null) {
      const keyEl = document.createElement('span');
      keyEl.className = 'node-key';
      keyEl.textContent = `${edgeLabel}:`;
      row.appendChild(keyEl);
    }

    // For objects/arrays: show the kind tag as the label instead of the full label
    const displayLabel = (node.kind_tag === 'Object' || node.kind_tag === 'Array')
      ? node.kind_tag
      : node.label;

    const tagEl = document.createElement('span');
    tagEl.className = `node-tag ${kindClass}`;
    tagEl.textContent = displayLabel;
    row.appendChild(tagEl);

    const countEl = document.createElement('span');
    countEl.className = 'node-id';
    countEl.textContent = ` (${node.children.length})`;
    row.appendChild(countEl);

    const idEl = document.createElement('span');
    idEl.className = 'node-id';
    idEl.textContent = ` #${node.id}`;
    row.appendChild(idEl);

    container.appendChild(row);

    for (let i = 0; i < node.children.length; i++) {
      const childEdge = edgeLabelFor(node, i);
      container.appendChild(this.renderNode(node.children[i], childEdge, false));
    }

    return container;
  }

  private renderDiagnostics(diagnostics: Diagnostic[]): void {
    if (!this.diagnosticsEl) return;
    this.diagnosticsEl.replaceChildren();

    if (diagnostics.length === 0) {
      const item = document.createElement('li');
      item.className = 'error-empty';
      item.textContent = 'No parse errors';
      this.diagnosticsEl.appendChild(item);
      return;
    }

    for (const d of diagnostics) {
      const item = document.createElement('li');
      item.className = `error-item severity-${d.severity}`;
      item.textContent = d.message;
      this.diagnosticsEl.appendChild(item);
    }
  }

  private selectNode(nodeId: number): void {
    // Deselect previous
    const prev = this.container.querySelector('.node-row.selected');
    if (prev) prev.classList.remove('selected');

    this.selectedNodeId = nodeId;

    // Select new
    const el = this.container.querySelector(`[data-node-id="${nodeId}"]`);
    if (el) {
      const row = el.querySelector(':scope > .node-row');
      if (row) row.classList.add('selected');
    }

    if (this.intentCallback) {
      this.intentCallback({ type: 'SelectNode', node_id: nodeId });
    }
  }
}

function findNodeInTree(node: ViewNode, nodeId: number): ViewNode | null {
  if (node.id === nodeId) return node;
  for (const child of node.children) {
    const found = findNodeInTree(child, nodeId);
    if (found) return found;
  }
  return null;
}
