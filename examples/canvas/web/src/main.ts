type CanvasModule = {
  create_canvas:   () => number;
  pan_start:       (h: number, sx: number, sy: number) => void;
  pan_move:        (h: number, sx: number, sy: number) => void;
  zoom:            (h: number, delta: number, cx: number, cy: number) => void;
  node_drag_start: (h: number, id: number, wx: number, wy: number) => void;
  node_drag_move:  (h: number, wx: number, wy: number) => void;
  pointer_up:      (h: number, nodeId: number) => void;
  get_render_state:(h: number) => string;
};

type Viewport   = { x: number; y: number; scale: number };
type NodeKind   = ['Shape', string] | ['Text', string];
type NodeData   = { id: number; x: number; y: number; w: number; h: number; kind: NodeKind };
type RenderState = { viewport: Viewport; nodes: NodeData[]; selected?: number };

let mb: CanvasModule;
let handle = -1;
let rafPending = false;
// Cached viewport — used by screenToWorld without re-parsing JSON
let lastViewport: Viewport = { x: 0, y: 0, scale: 1 };

const root     = document.getElementById('canvas-root') as HTMLDivElement;
const world    = document.getElementById('world') as HTMLDivElement;
const nodeDivs = new Map<number, HTMLDivElement>();

// ─── RAF render loop ─────────────────────────────────────────────────────────

function scheduleRender(): void {
  if (rafPending) return;
  rafPending = true;
  requestAnimationFrame(render);
}

function render(): void {
  rafPending = false;
  const state: RenderState = JSON.parse(mb.get_render_state(handle));
  lastViewport = state.viewport;

  // 1. Update world transform (pan + zoom — only #world touched, not node divs)
  const { x, y, scale } = state.viewport;
  world.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;

  // 2. Sync node divs (only meaningful changes during node drag)
  const seen = new Set<number>();
  for (const node of state.nodes) {
    seen.add(node.id);
    let div = nodeDivs.get(node.id);
    if (!div) {
      div = document.createElement('div');
      div.className = 'canvas-node';
      div.dataset.nodeId = String(node.id);
      world.appendChild(div);
      nodeDivs.set(node.id, div);
    }
    div.style.left   = `${node.x}px`;
    div.style.top    = `${node.y}px`;
    div.style.width  = `${node.w}px`;
    div.style.height = `${node.h}px`;

    const [kind, value] = node.kind;
    if (kind === 'Shape') {
      div.style.backgroundColor = value;
      div.dataset.kind = 'Shape';
      div.textContent = '';
    } else {
      div.style.backgroundColor = '';
      div.dataset.kind = 'Text';
      div.textContent = value;
    }
    // selected is absent (not null) when nothing is selected — use loose equality
    div.classList.toggle('selected', state.selected != null && state.selected === node.id);
  }

  // 3. Remove divs for deleted nodes (future: add/delete support)
  for (const [id, div] of nodeDivs) {
    if (!seen.has(id)) { div.remove(); nodeDivs.delete(id); }
  }

  // 4. (Future) drawOverlay(state);
}

// ─── Coordinate helpers ───────────────────────────────────────────────────────

/** Pointer/wheel position in canvas-local screen space.
 *  Accepts MouseEvent so it works for both PointerEvent and WheelEvent. */
function localCoords(e: MouseEvent): [number, number] {
  const rect = root.getBoundingClientRect();
  return [e.clientX - rect.left, e.clientY - rect.top];
}

/** Convert canvas-local screen coords to world coords. */
function screenToWorld(sx: number, sy: number): [number, number] {
  const { x, y, scale } = lastViewport;
  return [(sx - x) / scale, (sy - y) / scale];
}

/** Walk up the DOM from event target to find data-node-id. Returns 0 for background. */
function nodeIdFromTarget(target: EventTarget | null): number {
  let el = target as HTMLElement | null;
  while (el && el !== world) {
    if (el.dataset?.nodeId) return parseInt(el.dataset.nodeId);
    el = el.parentElement;
  }
  return 0;
}

// ─── Event wiring ─────────────────────────────────────────────────────────────

type Interaction = 'none' | 'pan' | 'drag';
let activeInteraction: Interaction = 'none';
let activePointerId = -1;

root.addEventListener('pointerdown', (e: PointerEvent) => {
  root.setPointerCapture(e.pointerId);
  activePointerId = e.pointerId;
  const [sx, sy] = localCoords(e);
  const nodeId = nodeIdFromTarget(e.target);

  if (nodeId !== 0) {
    const [wx, wy] = screenToWorld(sx, sy);
    mb.node_drag_start(handle, nodeId, wx, wy);
    activeInteraction = 'drag';
  } else {
    mb.pan_start(handle, sx, sy);
    activeInteraction = 'pan';
    root.classList.add('panning');
  }
  scheduleRender();
});

root.addEventListener('pointermove', (e: PointerEvent) => {
  if (e.pointerId !== activePointerId) return;
  const [sx, sy] = localCoords(e);
  if (activeInteraction === 'pan') {
    mb.pan_move(handle, sx, sy);
  } else if (activeInteraction === 'drag') {
    const [wx, wy] = screenToWorld(sx, sy);
    mb.node_drag_move(handle, wx, wy);
  }
  scheduleRender();
});

root.addEventListener('pointerup', (e: PointerEvent) => {
  if (e.pointerId !== activePointerId) return;
  const nodeId = nodeIdFromTarget(e.target);
  mb.pointer_up(handle, nodeId);
  activeInteraction = 'none';
  activePointerId = -1;
  root.classList.remove('panning');
  scheduleRender();
});

root.addEventListener('pointercancel', () => {
  if (activePointerId === -1) return;
  mb.pointer_up(handle, 0);
  activeInteraction = 'none';
  activePointerId = -1;
  root.classList.remove('panning');
  scheduleRender();
});

root.addEventListener('wheel', (e: WheelEvent) => {
  e.preventDefault();
  const [cx, cy] = localCoords(e); // WheelEvent extends MouseEvent ✓
  mb.zoom(handle, e.deltaY, cx, cy);
  scheduleRender();
}, { passive: false });

// ─── Bootstrap ────────────────────────────────────────────────────────────────

async function init(): Promise<void> {
  const mod = await import('@moonbit/canopy-canvas') as CanvasModule;
  mb = mod;
  handle = mb.create_canvas();
  render(); // initial render
}

init();
