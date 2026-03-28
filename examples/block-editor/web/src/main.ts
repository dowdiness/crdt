import * as ed from '@moonbit/canopy-block-editor';

// ── Types ──────────────────────────────────────────────────────────────
interface Block {
  id: string;
  block_type: string;
  level: string;
  list_style: string;
  checked: boolean;
  text: string;
}

// ── State ──────────────────────────────────────────────────────────────
const handle = ed.create_editor('local');
const container = document.getElementById('editor-blocks')!;
const blockDivs = new Map<string, HTMLDivElement>();
let suppressNextInput = false;

// Seed
ed.editor_import_markdown(handle, '# Welcome\n\nStart typing here.\n');

// ── Render ─────────────────────────────────────────────────────────────
function render() {
  const state: { blocks: Block[] } = JSON.parse(ed.get_render_state(handle));
  const liveIds = new Set<string>();

  for (const block of state.blocks) {
    liveIds.add(block.id);
    let div = blockDivs.get(block.id);

    if (!div) {
      div = document.createElement('div');
      div.contentEditable = 'true';
      div.dataset.blockId = block.id;
      div.style.minHeight = '1.4em';
      div.style.padding = '4px 0';
      wireEvents(div);
      container.appendChild(div);
      blockDivs.set(block.id, div);
    }

    // Update attributes and ARIA roles
    div.dataset.type = block.block_type;
    div.dataset.level = block.level;
    div.dataset.listStyle = block.list_style;
    div.dataset.checked = String(block.checked);
    applyAriaRoles(div, block);
    styleBlock(div, block);

    // Only update text if not focused (avoid clobbering cursor)
    if (document.activeElement !== div && div.textContent !== block.text) {
      div.textContent = block.text;
    }
  }

  // Remove stale divs
  for (const [id, div] of blockDivs) {
    if (!liveIds.has(id)) {
      div.remove();
      blockDivs.delete(id);
    }
  }

  // Reorder divs to match state order
  let prev: Element | null = null;
  for (const block of state.blocks) {
    const div = blockDivs.get(block.id);
    if (!div) continue;
    const expected = prev ? prev.nextElementSibling : container.firstElementChild;
    if (div !== expected) {
      if (prev) {
        prev.after(div);
      } else {
        container.prepend(div);
      }
    }
    prev = div;
  }
}

// ── ARIA roles ─────────────────────────────────────────────────────────
function applyAriaRoles(div: HTMLDivElement, block: Block) {
  // Clear previous roles
  div.removeAttribute('role');
  div.removeAttribute('aria-level');

  switch (block.block_type) {
    case 'heading':
      div.setAttribute('role', 'heading');
      div.setAttribute('aria-level', block.level || '1');
      break;
    case 'list_item':
      div.setAttribute('role', 'listitem');
      break;
    case 'quote':
      div.setAttribute('role', 'blockquote');
      break;
    case 'divider':
      div.setAttribute('role', 'separator');
      break;
  }
}

// ── Block styling ──────────────────────────────────────────────────────

// Type scale (1.25 ratio): body 1rem, each heading level steps up
const HEADING_SCALE: Record<string, { size: string; weight: string; lineHeight: string; letterSpacing: string }> = {
  '1': { size: '1.953rem', weight: '700', lineHeight: '1.15', letterSpacing: '-0.02em' },
  '2': { size: '1.563rem', weight: '600', lineHeight: '1.2',  letterSpacing: '-0.015em' },
  '3': { size: '1.25rem',  weight: '600', lineHeight: '1.3',  letterSpacing: '-0.01em' },
  '4': { size: '1.1rem',   weight: '600', lineHeight: '1.35', letterSpacing: '0' },
  '5': { size: '1rem',     weight: '600', lineHeight: '1.4',  letterSpacing: '0.01em' },
  '6': { size: '0.875rem', weight: '600', lineHeight: '1.4',  letterSpacing: '0.02em' },
};

function styleBlock(div: HTMLDivElement, block: Block) {
  // Reset
  div.style.fontWeight = '';
  div.style.fontSize = '';
  div.style.fontFamily = '';
  div.style.lineHeight = '';
  div.style.letterSpacing = '';
  div.style.borderLeft = '';
  div.style.paddingLeft = '';
  div.style.color = '';
  div.style.background = '';
  div.style.borderTop = '';
  div.contentEditable = 'true';

  switch (block.block_type) {
    case 'heading': {
      const scale = HEADING_SCALE[block.level] || HEADING_SCALE['2'];
      div.style.fontSize = scale.size;
      div.style.fontWeight = scale.weight;
      div.style.lineHeight = scale.lineHeight;
      div.style.letterSpacing = scale.letterSpacing;
      break;
    }
    case 'list_item':
      div.style.paddingLeft = '24px';
      break;
    case 'quote':
      div.style.borderLeft = '3px solid rgba(130, 80, 223, 0.4)';
      div.style.paddingLeft = '16px';
      div.style.color = '#c8c8e0';
      break;
    case 'code':
      div.style.fontFamily = "'Iosevka', 'Iosevka Variable', monospace";
      div.style.fontSize = '0.9rem';
      div.style.lineHeight = '1.5';
      div.style.background = 'rgba(130, 80, 223, 0.05)';
      div.style.paddingLeft = '12px';
      break;
    case 'divider':
      div.contentEditable = 'false';
      div.style.borderTop = '1px solid #2a2a48';
      div.style.minHeight = '0';
      div.style.padding = '8px 0';
      break;
  }
}

// ── Events ─────────────────────────────────────────────────────────────
function wireEvents(div: HTMLDivElement) {
  div.addEventListener('input', () => {
    if (suppressNextInput) {
      suppressNextInput = false;
      return;
    }
    const id = div.dataset.blockId!;
    ed.editor_set_block_text(handle, id, div.textContent || '');
  });

  div.addEventListener('keydown', (e: KeyboardEvent) => {
    const id = div.dataset.blockId!;

    // Enter → insert block after
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const newId = ed.editor_insert_block_after(handle, id, 'paragraph');
      render();
      const newDiv = blockDivs.get(newId);
      if (newDiv) newDiv.focus();
      return;
    }

    // Backspace on empty → delete block, focus previous (keep at least one block)
    if (e.key === 'Backspace' && (div.textContent || '') === '') {
      const prev = div.previousElementSibling as HTMLDivElement | null;
      if (!prev) return; // Don't delete the first/only block
      e.preventDefault();
      ed.editor_delete_block(handle, id);
      render();
      prev.focus();
      const sel = window.getSelection();
      if (sel && prev.childNodes.length > 0) {
        sel.selectAllChildren(prev);
        sel.collapseToEnd();
      }
      return;
    }

    // Space → check autoformat
    if (e.key === ' ') {
      const text = div.textContent || '';
      const fmt = detectAutoformat(text);
      if (fmt) {
        e.preventDefault();
        ed.editor_set_block_type(handle, id, fmt.type, fmt.level, fmt.listStyle);
        ed.editor_set_block_text(handle, id, '');
        suppressNextInput = true;
        div.textContent = '';
        render();
        const updated = blockDivs.get(id);
        if (updated) updated.focus();
      }
    }
  });
}

// ── Autoformat ─────────────────────────────────────────────────────────
function detectAutoformat(
  text: string,
): { type: string; level: number; listStyle: string } | null {
  const headingMatch = text.match(/^(#{1,6})$/);
  if (headingMatch)
    return { type: 'heading', level: headingMatch[1].length, listStyle: '' };

  if (text === '- [ ]' || text === '- [x]')
    return { type: 'list_item', level: 0, listStyle: 'todo' };

  if (text === '-' || text === '*')
    return { type: 'list_item', level: 0, listStyle: 'bullet' };

  if (/^\d+\.$/.test(text))
    return { type: 'list_item', level: 0, listStyle: 'numbered' };

  if (text === '>')
    return { type: 'quote', level: 0, listStyle: '' };

  return null;
}

// ── Toolbar ────────────────────────────────────────────────────────────
document.getElementById('btn-download')!.addEventListener('click', () => {
  const md = ed.editor_export_markdown(handle);
  const blob = new Blob([md], { type: 'text/markdown' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'document.md';
  a.click();
  URL.revokeObjectURL(a.href);
});

document.getElementById('btn-upload')!.addEventListener('click', () => {
  document.getElementById('file-input')!.click();
});

document.getElementById('file-input')!.addEventListener('change', (e) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    ed.editor_import_markdown(handle, reader.result as string);
    blockDivs.clear();
    container.innerHTML = '';
    render();
  };
  reader.readAsText(file);
});

// ── Boot ───────────────────────────────────────────────────────────────
render();
