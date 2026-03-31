import * as crdt from '@moonbit/crdt';

type ProjNode = {
  id: number;
  tag: string;
  children: Array<[string, ProjNode]>;
};

type InlineMode = 'add-member' | 'wrap-object' | 'change-type' | null;

const EXAMPLE_FALLBACK = '{"hello": "world"}';
const VALID_TYPES = new Set(['null', 'bool', 'number', 'string', 'array', 'object']);

const agentId = `json-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
const handle = crdt.create_json_editor(agentId);

const editorEl = must<HTMLDivElement>('json-input');
const errorsEl = must<HTMLUListElement>('parse-errors');
const treeEl = must<HTMLDivElement>('tree-view');

const addMemberBtn = must<HTMLButtonElement>('add-member-btn');
const addElementBtn = must<HTMLButtonElement>('add-element-btn');
const wrapArrayBtn = must<HTMLButtonElement>('wrap-array-btn');
const wrapObjectBtn = must<HTMLButtonElement>('wrap-object-btn');
const changeTypeBtn = must<HTMLButtonElement>('change-type-btn');
const deleteBtn = must<HTMLButtonElement>('delete-btn');
const unwrapBtn = must<HTMLButtonElement>('unwrap-btn');

const inlineFormEl = must<HTMLDivElement>('toolbar-inline-form');
const inlineLabelEl = must<HTMLSpanElement>('inline-form-label');
const inlineInputEl = must<HTMLInputElement>('toolbar-inline-input');
const inlineSubmitEl = must<HTMLButtonElement>('toolbar-inline-submit');
const inlineCancelEl = must<HTMLButtonElement>('toolbar-inline-cancel');

let selectedNodeId: number | null = null;
let selectedNode: ProjNode | null = null;
let inlineMode: InlineMode = null;
let lastText = '';
let syncScheduled = false;
let suppressInput = false;

function must<T extends HTMLElement>(id: string): T {
  const element = document.getElementById(id);
  if (!element) {
    throw new Error(`Missing element #${id}`);
  }
  return element as T;
}

function getNodeKind(tag: string): 'object' | 'array' | 'string' | 'number' | 'bool' | 'null' | 'other' {
  if (tag === 'Object') return 'object';
  if (tag === 'Array') return 'array';
  if (tag === 'null') return 'null';
  if (tag === 'true' || tag === 'false') return 'bool';
  if (tag.startsWith('"') && tag.endsWith('"')) return 'string';
  if (/^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(tag)) return 'number';
  return 'other';
}

function parseProjNode(): ProjNode | null {
  try {
    const raw = crdt.json_get_proj_node_json(handle);
    if (!raw.trim()) return null;
    return JSON.parse(raw) as ProjNode;
  } catch {
    return null;
  }
}

function parseErrors(): string[] {
  try {
    const raw = crdt.json_get_errors(handle);
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : [];
  } catch (error) {
    return [`Failed to decode errors: ${String(error)}`];
  }
}

function scheduleTextSync() {
  if (syncScheduled || suppressInput) return;
  syncScheduled = true;
  requestAnimationFrame(() => {
    syncScheduled = false;
    syncTextToModel();
  });
}

function syncTextToModel() {
  if (suppressInput) return;
  const nextText = editorEl.textContent ?? '';
  if (nextText !== lastText) {
    crdt.json_set_text(handle, nextText);
    lastText = nextText;
  }
  refresh();
}

function setEditorText(text: string) {
  suppressInput = true;
  editorEl.textContent = text;
  suppressInput = false;
  lastText = text;
}

function syncTextFromModel() {
  const text = crdt.json_get_text(handle);
  if ((editorEl.textContent ?? '') !== text) {
    setEditorText(text);
  } else {
    lastText = text;
  }
}

function refreshErrors() {
  const errors = parseErrors();
  errorsEl.replaceChildren();

  if (errors.length === 0) {
    const item = document.createElement('li');
    item.className = 'error-empty';
    item.textContent = 'No parse errors';
    errorsEl.appendChild(item);
    return;
  }

  for (const error of errors) {
    const item = document.createElement('li');
    item.className = 'error-item';
    item.textContent = error;
    errorsEl.appendChild(item);
  }
}

function renderTreeNode(node: ProjNode, edgeLabel: string | null, isRoot: boolean): HTMLDivElement {
  const container = document.createElement('div');
  container.className = isRoot ? 'tree-node root' : 'tree-node';

  const row = document.createElement('div');
  row.className = 'node-row';
  if (node.id === selectedNodeId) {
    row.classList.add('selected');
  }

  row.addEventListener('click', (event) => {
    event.stopPropagation();
    selectedNodeId = node.id;
    selectedNode = node;
    hideInlineForm();
    renderTree();
    updateToolbarState();
  });

  if (edgeLabel !== null) {
    const keyEl = document.createElement('span');
    keyEl.className = 'node-key';
    keyEl.textContent = `${edgeLabel}:`;
    row.appendChild(keyEl);
  }

  const tagEl = document.createElement('span');
  tagEl.className = `node-tag ${getNodeKind(node.tag)}`;
  tagEl.textContent = node.tag;
  row.appendChild(tagEl);

  const idEl = document.createElement('span');
  idEl.className = 'node-id';
  idEl.textContent = `#${node.id}`;
  row.appendChild(idEl);

  container.appendChild(row);

  for (const [childLabel, childNode] of node.children) {
    container.appendChild(renderTreeNode(childNode, childLabel, false));
  }

  return container;
}

function renderTree() {
  const root = parseProjNode();
  treeEl.replaceChildren();

  if (!root) {
    selectedNodeId = null;
    selectedNode = null;
    const empty = document.createElement('div');
    empty.className = 'tree-empty';
    empty.textContent = 'No structure available';
    treeEl.appendChild(empty);
    return;
  }

  const selected = findNodeById(root, selectedNodeId);
  selectedNode = selected ?? root;
  selectedNodeId = selectedNode.id;
  treeEl.appendChild(renderTreeNode(root, null, true));
}

function findNodeById(node: ProjNode, nodeId: number | null): ProjNode | null {
  if (nodeId === null) return null;
  if (node.id === nodeId) return node;
  for (const [, child] of node.children) {
    const found = findNodeById(child, nodeId);
    if (found) return found;
  }
  return null;
}

function updateToolbarState() {
  const kind = selectedNode ? getNodeKind(selectedNode.tag) : 'other';
  const hasSelection = selectedNode !== null;
  const isRoot = hasSelection && selectedNodeId === parseProjNode()?.id;

  addMemberBtn.disabled = kind !== 'object';
  addElementBtn.disabled = kind !== 'array';
  wrapArrayBtn.disabled = !hasSelection;
  wrapObjectBtn.disabled = !hasSelection;
  changeTypeBtn.disabled = !hasSelection;
  deleteBtn.disabled = !hasSelection || Boolean(isRoot);
  unwrapBtn.disabled = !(kind === 'object' || kind === 'array');
}

function showInlineForm(mode: InlineMode) {
  inlineMode = mode;
  inlineFormEl.classList.add('visible');

  if (mode === 'add-member') {
    inlineLabelEl.textContent = 'Member key:';
    inlineInputEl.placeholder = 'name';
    inlineInputEl.value = '';
  } else if (mode === 'wrap-object') {
    inlineLabelEl.textContent = 'Wrapper key:';
    inlineInputEl.placeholder = 'wrapper';
    inlineInputEl.value = 'wrapper';
  } else if (mode === 'change-type') {
    inlineLabelEl.textContent = 'New type:';
    inlineInputEl.placeholder = 'string | number | bool | null | array | object';
    inlineInputEl.value = '';
  }

  inlineInputEl.focus();
  inlineInputEl.select();
}

function hideInlineForm() {
  inlineMode = null;
  inlineFormEl.classList.remove('visible');
  inlineLabelEl.textContent = '';
  inlineInputEl.value = '';
}

function applyEdit(op: Record<string, unknown>) {
  const result = crdt.json_apply_edit(handle, JSON.stringify(op), Date.now());
  syncTextFromModel();
  refresh();

  if (result !== 'ok') {
    const currentErrors = parseErrors();
    currentErrors.unshift(result);
    errorsEl.replaceChildren();
    for (const error of currentErrors) {
      const item = document.createElement('li');
      item.className = 'error-item';
      item.textContent = error;
      errorsEl.appendChild(item);
    }
  }
}

function submitInlineAction() {
  if (!selectedNode || !inlineMode) return;

  const value = inlineInputEl.value.trim();
  if (!value) {
    inlineInputEl.focus();
    return;
  }

  if (inlineMode === 'add-member') {
    applyEdit({ op: 'AddMember', object_id: selectedNode.id, key: value });
  } else if (inlineMode === 'wrap-object') {
    applyEdit({ op: 'WrapInObject', node_id: selectedNode.id, key: value });
  } else if (inlineMode === 'change-type') {
    if (!VALID_TYPES.has(value)) {
      inlineInputEl.focus();
      return;
    }
    applyEdit({ op: 'ChangeType', node_id: selectedNode.id, new_type: value });
  }

  hideInlineForm();
}

function refresh() {
  refreshErrors();
  renderTree();
  updateToolbarState();
}

editorEl.addEventListener('input', scheduleTextSync);

addMemberBtn.addEventListener('click', () => {
  if (!addMemberBtn.disabled) showInlineForm('add-member');
});

addElementBtn.addEventListener('click', () => {
  if (selectedNode && !addElementBtn.disabled) {
    hideInlineForm();
    applyEdit({ op: 'AddElement', array_id: selectedNode.id });
  }
});

wrapArrayBtn.addEventListener('click', () => {
  if (selectedNode && !wrapArrayBtn.disabled) {
    hideInlineForm();
    applyEdit({ op: 'WrapInArray', node_id: selectedNode.id });
  }
});

wrapObjectBtn.addEventListener('click', () => {
  if (!wrapObjectBtn.disabled) showInlineForm('wrap-object');
});

changeTypeBtn.addEventListener('click', () => {
  if (!changeTypeBtn.disabled) showInlineForm('change-type');
});

deleteBtn.addEventListener('click', () => {
  if (selectedNode && !deleteBtn.disabled) {
    hideInlineForm();
    applyEdit({ op: 'Delete', node_id: selectedNode.id });
  }
});

unwrapBtn.addEventListener('click', () => {
  if (selectedNode && !unwrapBtn.disabled) {
    hideInlineForm();
    applyEdit({ op: 'Unwrap', node_id: selectedNode.id });
  }
});

inlineSubmitEl.addEventListener('click', submitInlineAction);
inlineCancelEl.addEventListener('click', hideInlineForm);
inlineInputEl.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    submitInlineAction();
  } else if (event.key === 'Escape') {
    event.preventDefault();
    hideInlineForm();
  }
});

document.querySelectorAll<HTMLButtonElement>('.example-btn').forEach((button) => {
  button.addEventListener('click', () => {
    const example = button.dataset.example ?? EXAMPLE_FALLBACK;
    crdt.json_set_text(handle, example);
    syncTextFromModel();
    hideInlineForm();
    refresh();
  });
});

window.addEventListener('beforeunload', () => {
  crdt.destroy_json_editor(handle);
});

const initialText = crdt.json_get_text(handle);
if (initialText.trim()) {
  setEditorText(initialText);
} else {
  crdt.json_set_text(handle, EXAMPLE_FALLBACK);
  setEditorText(EXAMPLE_FALLBACK);
}

refresh();
