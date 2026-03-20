import './canopy-editor';
import type { CanopyEditor } from './canopy-editor';

// Single module: includes Rabbita + CRDT FFI (no separate @moonbit/canopy needed).
// This runs MoonBit's main() which mounts Rabbita and renders <canopy-editor>.
import * as crdt from '@moonbit/ideal-editor';

// Expose CRDT module globally for MoonBit FFI bridge functions
(globalThis as any).__canopy_crdt = crdt;

function wireTextSync(el: CanopyEditor) {
  el.addEventListener('text-changed', () => {
    const btn = document.getElementById('canopy-text-sync-trigger');
    if (btn) btn.click();
  });
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
  const handle = crdt.create_editor_with_undo('local', 500);
  const text = 'let id = \\x.x\nlet apply = \\f.\\x.f x\napply id 42';
  crdt.set_text(handle, text);
  el.mount(handle, crdt);
  wireTextSync(el);
}

mountWhenReady();
