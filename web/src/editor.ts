// Lambda Calculus Editor — thin DOM bridge over MoonBit CRDT backend

import * as crdt from '@moonbit/crdt';
import * as graphviz from '@moonbit/graphviz';

export function createEditor(agentId: string) {
  const handle = crdt.create_editor(agentId);

  const editorEl = document.getElementById('editor') as HTMLDivElement;
  const astGraphEl = document.getElementById('ast-graph') as HTMLDivElement;
  const astOutputEl = document.getElementById('ast-output') as HTMLPreElement;
  const errorEl = document.getElementById('error-output') as HTMLUListElement;

  let lastText = '';
  let scheduled = false;

  function updateUI() {
    const text = editorEl.textContent || '';
    if (text !== lastText) {
      crdt.set_text(handle, text);
      lastText = text;
    }

    // AST visualization (DOT → SVG via graphviz module)
    try {
      const dot = crdt.get_ast_dot_resolved(handle);
      const svg = graphviz.render_dot_to_svg(dot);
      astGraphEl.innerHTML = svg;

      // Dark theme: remove white background from SVG
      const polygon = astGraphEl.querySelector('g.graph polygon');
      if (polygon) polygon.setAttribute('fill', 'transparent');
    } catch (e) {
      astGraphEl.innerHTML = `<p style="color:#f44">Error: ${e}</p>`;
    }

    // AST structure (pure MoonBit string via Debug trait)
    astOutputEl.textContent = crdt.get_ast_pretty(handle);

    // Errors
    const errors: string[] = JSON.parse(crdt.get_errors_json(handle));
    if (errors.length === 0) {
      errorEl.innerHTML = '<li>No errors</li>';
    } else {
      errorEl.innerHTML = errors
        .map(e => `<li class="error-item">${escapeHTML(e)}</li>`)
        .join('');
    }
  }

  editorEl.addEventListener('input', () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      updateUI();
    });
  });

  return {
    handle,
    agentId,
    updateUI,
    getText: () => crdt.get_text(handle),
    setText: (text: string) => {
      editorEl.textContent = text;
      editorEl.dispatchEvent(new Event('input', { bubbles: true }));
    },
  };
}

function escapeHTML(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
