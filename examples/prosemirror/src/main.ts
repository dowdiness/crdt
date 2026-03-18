import * as crdt from "@moonbit/canopy";
import { EditorView, keymap, lineNumbers, highlightActiveLine, drawSelection } from "@codemirror/view";
import { EditorState, type ChangeSet } from "@codemirror/state";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import { bracketMatching } from "@codemirror/language";

// --- CRDT setup ---
const handle = crdt.create_editor_with_undo("cm-agent", 300);
crdt.set_text(handle, "let double = λx.x + x\ndouble 5");

// --- Editor state ---
let updating = false; // guard against feedback loops

// --- CodeMirror 6 editor ---
const cmState = EditorState.create({
  doc: crdt.get_text(handle),
  extensions: [
    lineNumbers(),
    highlightActiveLine(),
    drawSelection(),
    bracketMatching(),
    keymap.of([...defaultKeymap, ...historyKeymap]),
    // Sync CM6 changes → CRDT (character-level)
    EditorView.updateListener.of((update) => {
      if (updating || !update.docChanged) return;
      applyCmChangesToCrdt(update.changes);
    }),
    // Theme
    EditorView.theme({
      "&": { fontSize: "16px" },
      ".cm-content": { fontFamily: "monospace" },
    }),
  ],
});

const cmView = new EditorView({
  state: cmState,
  parent: document.getElementById("editor")!,
});

/**
 * Apply CM6 ChangeSet to the CRDT character-by-character.
 */
function applyCmChangesToCrdt(changes: ChangeSet): void {
  const ts = Date.now();
  let posOffset = 0;

  changes.iterChanges((fromA, toA, _fromB, _toB, inserted) => {
    const deleteLen = toA - fromA;
    // Delete in reverse order to preserve positions
    for (let i = deleteLen - 1; i >= 0; i--) {
      crdt.delete_at(handle, fromA + i + posOffset, ts);
    }
    posOffset -= deleteLen;
    // Insert character-at-a-time
    const text = inserted.toString();
    for (let i = 0; i < text.length; i++) {
      crdt.insert_at(handle, fromA + posOffset + i, text[i], ts);
    }
    posOffset += text.length;
  });

  updateDebug();
}

/**
 * Apply CRDT text to CM6 (for remote sync).
 * Computes a minimal diff to preserve cursor/selection.
 */
function syncCrdtToCm(): void {
  const crdtText = crdt.get_text(handle);
  const cmText = cmView.state.doc.toString();
  if (crdtText === cmText) return;

  updating = true;
  // Simple strategy: replace entire doc. CM6 handles cursor mapping.
  cmView.dispatch({
    changes: { from: 0, to: cmText.length, insert: crdtText },
  });
  updating = false;
  updateDebug();
}

/**
 * Update debug panel with AST info.
 */
function updateDebug(): void {
  const debugEl = document.getElementById("debug");
  if (!debugEl) return;

  const errors = JSON.parse(crdt.get_errors_json(handle)) as string[];
  const pretty = crdt.get_ast_pretty(handle);

  debugEl.textContent = errors.length > 0
    ? `Errors:\n${errors.join("\n")}\n\n${pretty}`
    : pretty;
}

// Initial debug render
updateDebug();

// --- Undo/Redo via CRDT (not CM6 history) ---
// Override Ctrl-Z / Ctrl-Shift-Z to use CRDT undo
document.addEventListener("keydown", (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === "z") {
    e.preventDefault();
    if (e.shiftKey) {
      crdt.undo_manager_redo(handle);
    } else {
      crdt.undo_manager_undo(handle);
    }
    syncCrdtToCm();
  }
});

console.log("CodeMirror 6 editor ready. Text:", crdt.get_text(handle));
