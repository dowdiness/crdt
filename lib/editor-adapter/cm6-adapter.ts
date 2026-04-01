// CM6Adapter: CodeMirror 6 adapter for the EditorProtocol.
//
// Wraps a CM6 EditorView and applies ViewPatch commands (TextChange,
// SetDecorations, SetSelection). Captures user edits and selection
// changes as UserIntent.

import {
  EditorView,
  Decoration as CmDecoration,
  DecorationSet,
  ViewPlugin,
  ViewUpdate,
  WidgetType,
} from "@codemirror/view";
import { StateField, StateEffect, RangeSetBuilder } from "@codemirror/state";
import type { EditorAdapter } from './adapter';
import type { ViewPatch, UserIntent, Decoration } from './types';

// ── Decoration state ────────────────────────────────────────

const setDecorations = StateEffect.define<Decoration[]>();

class PeerCursorWidget extends WidgetType {
  constructor(
    readonly label: string,
    readonly cssClass: string,
  ) {
    super();
  }

  eq(other: PeerCursorWidget): boolean {
    return this.label === other.label && this.cssClass === other.cssClass;
  }

  toDOM(): HTMLElement {
    const wrapper = document.createElement("span");
    wrapper.className = this.cssClass;

    const labelEl = document.createElement("span");
    labelEl.className = `${this.cssClass}-label`;
    labelEl.textContent = this.label;
    wrapper.appendChild(labelEl);

    return wrapper;
  }

  ignoreEvent(): boolean {
    return true;
  }
}

function buildDecorationSet(
  decorations: Decoration[],
  docLength: number,
): DecorationSet {
  const widgets: { pos: number; deco: CmDecoration }[] = [];
  const marks: { from: number; to: number; deco: CmDecoration }[] = [];

  for (const d of decorations) {
    const from = Math.min(Math.max(0, d.from), docLength);
    const to = Math.min(Math.max(0, d.to), docLength);

    if (d.widget) {
      widgets.push({
        pos: from,
        deco: CmDecoration.widget({
          widget: new PeerCursorWidget(d.data ?? "", d.css_class),
          side: 1,
        }),
      });
    } else {
      if (from < to) {
        marks.push({
          from,
          to,
          deco: CmDecoration.mark({ class: d.css_class }),
        });
      }
    }
  }

  widgets.sort((a, b) => a.pos - b.pos);
  marks.sort((a, b) => a.from - b.from || a.to - b.to);

  const builder = new RangeSetBuilder<CmDecoration>();

  let wi = 0;
  let mi = 0;
  while (wi < widgets.length || mi < marks.length) {
    const wPos = wi < widgets.length ? widgets[wi].pos : Infinity;
    const mPos = mi < marks.length ? marks[mi].from : Infinity;

    if (mPos < wPos) {
      builder.add(marks[mi].from, marks[mi].to, marks[mi].deco);
      mi++;
    } else if (wPos < mPos) {
      builder.add(widgets[wi].pos, widgets[wi].pos, widgets[wi].deco);
      wi++;
    } else {
      // Same position: marks before widgets (marks have extent)
      if (mi < marks.length && marks[mi].from === mPos) {
        builder.add(marks[mi].from, marks[mi].to, marks[mi].deco);
        mi++;
      } else {
        builder.add(widgets[wi].pos, widgets[wi].pos, widgets[wi].deco);
        wi++;
      }
    }
  }

  return builder.finish();
}

const decorationField = StateField.define<Decoration[]>({
  create() {
    return [];
  },
  update(value, tr) {
    for (const effect of tr.effects) {
      if (effect.is(setDecorations)) {
        return effect.value;
      }
    }
    return value;
  },
});

const decorationPlugin = ViewPlugin.fromClass(
  class {
    decorations: DecorationSet;

    constructor(view: EditorView) {
      const decos = view.state.field(decorationField);
      this.decorations = buildDecorationSet(decos, view.state.doc.length);
    }

    update(update: ViewUpdate) {
      const oldDecos = update.startState.field(decorationField);
      const newDecos = update.state.field(decorationField);
      if (oldDecos !== newDecos || update.docChanged) {
        this.decorations = buildDecorationSet(
          newDecos,
          update.state.doc.length,
        );
      }
    }
  },
  {
    decorations: (v) => v.decorations,
  },
);

// ── CM6Adapter ──────────────────────────────────────────────

export class CM6Adapter implements EditorAdapter {
  private view: EditorView;
  private intentCallback: ((intent: UserIntent) => void) | null = null;
  private updating = false;

  constructor(view: EditorView) {
    this.view = view;
  }

  /**
   * CM6 extensions that must be included in the EditorView for this
   * adapter to function. Add these to the extensions array when
   * creating the CM6 EditorView.
   */
  static extensions(): [typeof decorationField, typeof decorationPlugin] {
    return [decorationField, decorationPlugin];
  }

  /**
   * Create a CM6 updateListener extension that feeds user intents
   * back to the adapter. Add this to extensions alongside `CM6Adapter.extensions()`.
   *
   * The adapter must be constructed first, then this listener added
   * (or the view reconfigured) so the adapter reference is captured.
   */
  createUpdateListener(): ReturnType<typeof EditorView.updateListener.of> {
    return EditorView.updateListener.of((update: ViewUpdate) => {
      if (this.updating || !this.intentCallback) return;

      if (update.docChanged) {
        update.changes.iterChanges((fromA, toA, _fromB, _toB, inserted) => {
          this.intentCallback!({
            type: "TextEdit",
            from: fromA,
            to: toA,
            insert: inserted.toString(),
          });
        });
      }

      if (update.selectionSet && !update.docChanged) {
        const sel = update.state.selection.main;
        this.intentCallback({
          type: "SetCursor",
          position: sel.anchor,
        });
      }
    });
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
  }

  private applyPatch(patch: ViewPatch): void {
    switch (patch.type) {
      case "TextChange": {
        this.updating = true;
        try {
          this.view.dispatch({
            changes: { from: patch.from, to: patch.to, insert: patch.insert },
          });
        } finally {
          this.updating = false;
        }
        break;
      }

      case "SetDecorations": {
        this.view.dispatch({
          effects: setDecorations.of(patch.decorations),
        });
        break;
      }

      case "SetSelection": {
        this.view.dispatch({
          selection: { anchor: patch.anchor, head: patch.head },
        });
        break;
      }

      case "SelectNode":
        // SelectNode in CM6 context: no-op unless the host resolves
        // node_id to a text range and sends SetSelection instead.
        break;

      case "SetDiagnostics":
        // Could integrate with CM6 lint panel in the future.
        break;

      // Tree patches are PM/HTML specific — ignored by CM6.
      case "FullTree":
      case "ReplaceNode":
      case "InsertChild":
      case "RemoveChild":
      case "UpdateNode":
        break;
    }
  }
}
