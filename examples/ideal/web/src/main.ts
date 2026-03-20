import './canopy-editor';
import type { CanopyEditor } from './canopy-editor';

// Import the compiled MoonBit CRDT module.
// This also runs MoonBit's main() which mounts Rabbita and renders <canopy-editor>.
import * as crdt from '@moonbit/canopy';

// Expose CRDT module globally for MoonBit FFI bridge functions
(globalThis as any).__canopy_crdt = crdt;

// After Rabbita renders <canopy-editor>, mount the PM editor.
// requestAnimationFrame ensures the custom element is in the DOM.
requestAnimationFrame(() => {
  const el = document.querySelector('canopy-editor') as CanopyEditor | null;
  if (!el) {
    console.warn('[main] canopy-editor element not found in DOM');
    return;
  }
  // Create a CRDT editor via the handle-based API (singleton handle = 1)
  const handle = crdt.create_editor_with_undo('local', 500);
  // Initialize with the same text as MoonBit's init_model
  const text = 'let id = \\x.x in let apply = \\f.\\x.f x in apply id 42';
  crdt.set_text(handle, text);
  el.mount(handle, crdt);
});
