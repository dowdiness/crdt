# Design 01: Edit Bridge

**Parent:** [Grand Design](./GRAND_DESIGN.md)
**Status:** Draft
**Updated:** 2026-03-04

---

## Problem

Every time the CRDT text changes, `ParsedEditor` materializes the full text string, then runs `compute_edit(old_text, new_text)` — a prefix/suffix string diff — to produce a loom `Edit`. This is wasteful because the CRDT operation already knows _exactly_ what changed and where.

```
CURRENT (O(n) per edit):
  Op::Insert(pos=5, "x") → doc.text() → compute_edit(old, new) → Edit{5, 0, 1}

IDEAL (O(1) per edit):
  Op::Insert(pos=5, "x") → Edit{5, 0, 1}   // direct conversion
```

---

## Design

### 1. Use existing `TextDelta` API (in loom)

`TextDelta` already exists in loom and should be reused directly:

- `TextDelta::{Retain, Insert, Delete}`
- `to_edits(deltas : Array[TextDelta]) -> Array[Edit]`
- `text_to_delta(old : String, new : String) -> Array[TextDelta]`

**Location:** `loom/loom/src/core/delta.mbt` (existing)

This design should consume the existing API rather than introducing a new
`text_delta.mbt` file or a duplicate `deltas_to_edits()` function.

### 2. `Op → TextDelta` Converter (in bridge package)

Each eg-walker `Op` maps trivially to a `TextDelta`:

```moonbit
/// Convert a CRDT Op (applied at a known visible position) to a TextDelta
fn op_to_delta(op : @core.Op, visible_position : Int) -> Array[TextDelta] {
  match op.content() {
    @core.OpContent::Insert(text) =>
      [TextDelta::Retain(visible_position), TextDelta::Insert(text)]
    @core.OpContent::Delete =>
      [TextDelta::Retain(visible_position), TextDelta::Delete(1)]
    @core.OpContent::Undelete =>
      [] // handled by fallback path until undelete text is exposed
  }
}
```

**Key constraint:** The CRDT op contains a logical version (LV), not a visible
position. The internal `Document` provides `lv_to_position()`, but `TextDoc`
does not currently expose it publicly. Direct `Op → Edit` conversion therefore
requires a small `event-graph-walker/text` API addition.

### 3. Batch Conversion for Remote Ops

When merging remote ops, multiple ops arrive together. The bridge converts them as a batch:

```moonbit
/// Convert a batch change by diffing whole strings (fallback path)
fn merge_to_edits(old_text : String, new_text : String) -> Array[@loom.Edit] {
  @loom.to_edits(@loom.text_to_delta(old_text, new_text))
}
```

**Design decision:** For single local ops, target O(1) direct conversion. For
batch remote merges (multiple concurrent ops), use a string-based fallback
(`text_to_delta`/`compute_edit`) since ops may interleave in complex ways.

### 4. Integration Point

The bridge sits between `TextDoc` and loom's parser.

Current implementation path (works with today's APIs):

```
TextDoc.insert()
  → parser.set_source(doc.text())
  // optional: fallback diff old/new text
```

Target path (after small API additions in `event-graph-walker/text`):

```
TextDoc.insert_with_op()
  → Op created, applied to FugueTree, returned to caller
  → doc.lv_to_position(op.lv()) → visible_position
  → op_to_delta(op, visible_position)
  → @loom.to_edits(...)
  → parser.edit(edit, new_source)
```

---

## Location

| File | Package | Content |
|------|---------|---------|
| `loom/loom/src/core/delta.mbt` | `dowdiness/loom/core` | Existing `TextDelta`, `to_edits`, `text_to_delta` |
| `editor/edit_bridge.mbt` | `dowdiness/crdt/editor` | `op_to_delta()`, `merge_to_edits()` |
| `editor/edit_bridge_test.mbt` | `dowdiness/crdt/editor` | Property tests: direct == string-diff |
| `event-graph-walker/text/text_doc.mbt` | `dowdiness/event-graph-walker/text` | Optional API additions for direct path (`insert_with_op`, `delete_with_op`, `lv_to_position`) |

---

## Verification

1. **Fallback parity:** `to_edits(text_to_delta(...))` produces parser-equivalent edits vs `compute_edit(old, new)`.
2. **Direct-path parity (after API addition):** For local insert/delete ops, `op_to_delta → to_edits` matches string-diff baseline.
3. **Benchmark:** Direct conversion vs string diff on 10K-character document (single-char edits).
4. **Integration test:** insert via editor → bridge → loom edit path → incremental reparse → AST parity.

---

## Open Questions

1. **Multi-character inserts:** `TextDoc.insert(pos, "hello")` creates 5 individual CRDT ops (one per char). Should the bridge batch them into a single `Edit{pos, 0, 5}` or emit 5 separate `Edit`s? Batching is better for parser performance (one reparse instead of five).

2. **Undelete mapping:** Should `OpContent::Undelete` map to `Insert(1-char)` in direct mode, or be handled as a sync-only operation that bypasses parser edit generation?

---

## Dependencies

- **Depends on:** Existing loom `TextDelta` API (`to_edits`, `text_to_delta`)
- **Depends on:** Exported `TextDoc` op/position APIs for the fully direct path (to be added)
- **Depended on by:** [§2 Reactive Pipeline](./02-reactive-pipeline.md), [§3 Unified Editor](./03-unified-editor.md)
