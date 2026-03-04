# Grand Design: Collaborative Projectional Editor

**Status:** Draft
**Updated:** 2026-03-04
**Goal:** A collaborative editor where multiple peers edit lambda calculus programs through multiple projections (text, AST tree) with real-time sync, incremental parsing, and undo — powered by eg-walker CRDT and loom incremental parser.

---

## Vision

Combine three independently developed systems into a unified collaborative editing experience:

| System | Role | Status |
|--------|------|--------|
| **eg-walker** | Source of truth for text, sync, undo | ✅ Stable |
| **loom** | Incremental parsing (CST → AST) | ✅ Stable |
| **projection** | Bidirectional views (text ↔ tree) | ⚠️ Partial |

The result is a **sync editor** where:
1. Any peer's keystroke produces a CRDT op
2. CRDT ops produce `Edit`s that drive incremental reparsing
3. The parser's CST/AST feeds multiple projections (text editor, tree editor)
4. All projections stay synchronized across peers

---

## Architectural Principles

1. **CRDT is the single source of truth.** All state derives from the eg-walker OpLog. No parallel history or undo stacks.

2. **Edits flow in one direction, views are derived.** User action → CRDT op → materialized text → incremental parse → projections. Never the reverse at the data layer.

3. **Bridge, don't diff.** CRDT ops carry enough information to produce loom `Edit`s directly. String diffing is a fallback, not the primary path.

4. **Reactive, not imperative.** Use loom's `Signal`/`Memo` pipeline so parsing happens lazily on access, not eagerly on every keystroke.

5. **Awareness is separate from data.** Peer cursors and selections travel over the network but are not CRDT operations.

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Per-Peer Architecture                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  User Input ──→ CRDT Ops ──→ Edit Bridge ──→ Reactive      │
│  (keystroke)    (eg-walker)   (ops→Edit)     Parser (loom)  │
│                                               │             │
│                                    ┌──────────┤             │
│                                    ▼          ▼             │
│                              CST/SyntaxNode  AST/Views     │
│                                    │          │             │
│                              ┌─────┴──────────┴──────┐     │
│                              │   Projection Layer     │     │
│                              │  (text, tree, etc.)    │     │
│                              └────────────────────────┘     │
│                                                             │
│  Network ←──→ SyncMessage (ops + frontier + awareness)      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Design Documents

The grand design is realized through five sub-designs, each addressing a specific integration gap:

| # | Document | What it solves |
|---|----------|---------------|
| 1 | [Edit Bridge](./01-edit-bridge.md) | CRDT ops → loom `Edit` without string diffing |
| 2 | [Reactive Pipeline Integration](./02-reactive-pipeline.md) | Replace manual dirty-flag with `Signal`/`Memo` |
| 3 | [Unified Editor Facade](./03-unified-editor.md) | Single `SyncEditor` replacing `ParsedEditor` + `CanonicalModel` |
| 4 | [Awareness Protocol](./04-awareness-protocol.md) | Peer cursors, selections, presence over network |
| 5 | [Tree Edit Roundtrip](./05-tree-edit-roundtrip.md) | Structural AST edits → text CRDT ops → reparse |

### Dependency Graph

```
[1] Edit Bridge
      │
      ▼
[2] Reactive Pipeline ──→ [3] Unified Editor
      │                          │
      │                    ┌─────┴──────┐
      │                    ▼            ▼
      │              [4] Awareness  [5] Tree Edit
      │                                 Roundtrip
      ▼
  Integration complete
```

Documents 1 and 2 are foundational — everything else builds on them.

---

## What Exists vs. What's Missing

### Exists (keep as-is)

| Component | Location | Role in grand design |
|-----------|----------|---------------------|
| `TextDoc` / `SyncSession` | `event-graph-walker/text/` | CRDT façade, sync protocol |
| `OpLog` / `CausalGraph` / `FugueTree` | `event-graph-walker/internal/` | Core CRDT data structures |
| `UndoManager` | `event-graph-walker/undo/` | Undo/redo on CRDT ops |
| `ImperativeParser` / `ReactiveParser` | `loom/loom/src/` | Incremental parsing engines |
| `Signal` / `Memo` | `loom/incr/` | Reactive computation primitives |
| `CstNode` / `SyntaxNode` | `loom/seam/` | Green/red tree CST |
| `Lens` / `SourceMap` | `projection/` | Bidirectional transforms |
| `InteractiveTreeNode` / `TreeEditorState` | `projection/tree_editor.mbt` | Tree editor UI state |
| `Editor` | `editor/editor.mbt` | Cursor-tracking wrapper |

### Missing (to be built)

| Component | Design doc | Description |
|-----------|-----------|-------------|
| **Edit Bridge** | [§1](./01-edit-bridge.md) | `Op → Edit` converter using existing loom `TextDelta` |
| **Reactive wiring** | [§2](./02-reactive-pipeline.md) | Connect CRDT text output to loom `Signal[String]` |
| **`SyncEditor`** | [§3](./03-unified-editor.md) | Unified facade replacing `ParsedEditor` |
| **Awareness transport** | [§4](./04-awareness-protocol.md) | Cursor/selection broadcast |
| **Tree → text roundtrip** | [§5](./05-tree-edit-roundtrip.md) | `ModelOperation` → text diff → CRDT ops |

### Required API Additions (for direct-path optimization)

The direct `Op → Edit` hot path needs small additions in
`event-graph-walker/text`:

1. `insert_with_op` / `delete_with_op` (or equivalent) so callers can observe
the concrete applied op.
2. `lv_to_position(lv : Int) -> Int?` on `TextDoc` (or another public mapping
API) for op-to-visible-position conversion.

Without these additions, Phase 1 still works via `parser.set_source(doc.text())`
and string-based diff fallback.

### To be retired

| Component | Reason | Replaced by |
|-----------|--------|-------------|
| `ParsedEditor.parse_dirty` flag | Manual cache invalidation | `Memo` auto-invalidation |
| `ParsedEditor.cached_text` + `compute_edit` | Redundant string diff | Edit Bridge direct conversion |
| `CanonicalModel.edit_history` | Duplicates CRDT OpLog | eg-walker `UndoManager` |
| `CanonicalModel.dirty_projections` | Manual dirty tracking | `Memo` dependency tracking |

---

## Implementation Order

### Phase 1: Edit Bridge + Reactive Pipeline (foundational)

1. Reuse existing loom `TextDelta` API (`Retain|Insert|Delete`, `to_edits`, `text_to_delta`)
2. Implement `Op → Edit` direct conversion in a bridge package
3. Wire `TextDoc` text output into `ReactiveParser` via `Signal`
4. Verify: single-peer editing with incremental reparse, no string diff

### Phase 2: Unified Editor Facade

5. Create `SyncEditor` combining `TextDoc` + `ReactiveParser` + `Lens`
6. Expose FFI surface matching current `crdt.mbt` API
7. Retire `ParsedEditor`, keep `Editor` as thin cursor wrapper
8. Verify: all existing tests pass, web demo works unchanged

### Phase 3: Awareness + Tree Editing

9. Define awareness message format and transport
10. Implement tree edit → text CRDT roundtrip via loom unparser
11. Integrate into `SyncEditor` and FFI
12. Verify: two-peer editing with cursor awareness, tree edits sync

---

## Success Criteria

1. **Single-character edit latency** < 1ms for a 1000-char document (CRDT op + incremental reparse)
2. **No string diffing** on the hot path once op-level APIs are exposed — `Op → Edit` conversion is O(1)
3. **Convergence** — all peers reach identical text and AST given the same op set
4. **Zero manual cache invalidation** — all derived state recomputed via `Memo`
5. **Backward compatible FFI** — web demo works without JS changes during Phase 1-2

---

## References

- [eg-walker paper](https://arxiv.org/abs/2409.14252)
- [loom ROADMAP](../../loom/ROADMAP.md)
- [Projectional Editing Architecture](../architecture/PROJECTIONAL_EDITING.md)
- [Module Structure](../architecture/modules.md)
- [event-graph-walker README](../../event-graph-walker/README.md)
