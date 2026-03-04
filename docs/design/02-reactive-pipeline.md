# Design 02: Reactive Pipeline Integration

**Parent:** [Grand Design](./GRAND_DESIGN.md)
**Status:** Draft
**Updated:** 2026-03-04

---

## Problem

`ParsedEditor` uses loom's `ImperativeParser` with manual dirty-flag tracking:

```moonbit
// Current: manual cache invalidation
pub struct ParsedEditor {
  mut parse_dirty : Bool       // ← manual flag
  mut cached_text : String     // ← manual cache
  mut ast : AstNode?           // ← manual cache
}
```

Every mutation sets `parse_dirty = true`. On access, `reparse()` diffs
`cached_text` against `editor.get_text()` to compute an `Edit`. This is:

1. **Potentially redundant** — the Edit Bridge (§1) can know the edit once op-level APIs are exposed
2. **Imperative** — manual flag management is error-prone
3. **Ignoring loom's reactive layer** — `Signal`/`Memo` already solve this

---

## Design

### Replace `ParsedEditor` with Reactive Pipeline

Loom's `ReactiveParser` provides exactly the right abstraction:

```
Signal[String]  →  Memo[CstStage]  →  Memo[Ast]
(source text)      (incremental       (typed syntax
                    CST parse)         node views)
```

The reactive pipeline:
- Automatically tracks dependencies via `Signal`/`Memo`
- Only recomputes when inputs change (equality check via `Eq`)
- Lazy evaluation — nothing recomputes until `.get()` is called
- No manual dirty flags

### Architecture

```
┌──────────────────────────────────────────────────────────┐
│                   Reactive Wiring                        │
│                                                          │
│  TextDoc ──op──→ Edit Bridge ──edit──→ source_signal     │
│                                          │               │
│                                    ┌─────▼──────┐        │
│                                    │ Memo[Cst]  │        │
│                                    │ (auto)     │        │
│                                    └─────┬──────┘        │
│                                          │               │
│                               ┌──────────┼──────────┐    │
│                               ▼          ▼          ▼    │
│                          Memo[Ast]  diagnostics  SourceMap│
│                               │                          │
│                          (accessed                       │
│                           on demand)                     │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

### Three Integration Strategies

#### Strategy A: `ReactiveParser` with `set_source` (Simple)

Use loom's `ReactiveParser` as-is. After each CRDT op, set the new source text:

```moonbit
let parser = @loom.new_reactive_parser(initial_text, lambda_language)

// On each CRDT op:
parser.set_source(doc.text())  // Signal.set triggers memo invalidation

// On access (lazy):
let ast = parser.term()        // Recomputes only if source changed
let errors = parser.diagnostics()
```

**Pros:** Uses loom's public API. No changes to loom.
**Cons:** Still materializes full text string per edit. `Signal.set` does equality check so it won't re-parse identical text, but string construction is O(n).

#### Strategy B: `ImperativeParser` with Edit Bridge (Optimal)

Use loom's `ImperativeParser` directly with `Edit`s from the bridge:

```moonbit
let parser = @loom.new_imperative_parser(initial_text, lambda_language)

// On each local CRDT op:
let edit = edit_bridge.op_to_edit(op)
let ast = parser.edit(edit, doc.text())  // Incremental reparse with known edit

// On batch remote merge:
let edits = edit_bridge.merge_to_edits(old_text, new_text)
for edit in edits {
  let _ = parser.edit(edit, doc.text())
}
```

**Pros:** O(1) edit production for local ops. No redundant string diff.
**Cons:** Still imperative. Must manually manage when to call `.edit()`.
Requires op-level APIs that are not currently exported by `TextDoc`.

#### Strategy C: Hybrid (Recommended)

Use `ReactiveParser` for the **lazy evaluation / caching semantics**, but feed it `Edit`s via a custom signal that carries both the new text and the `Edit`:

```moonbit
// Future loom API extension:
// ReactiveParser::apply_edit(edit : Edit, new_source : String)
//   Sets source signal AND passes edit to incremental engine
```

This requires a small loom API addition: a method that accepts both the new source and the `Edit` that produced it, avoiding the need to rediff inside the reactive pipeline.

**For Phase 1:** Use Strategy A (simplest, no loom changes). Upgrade to Strategy C when the loom API extension is ready.

### Current API Constraints

1. `TextDoc` currently does not expose `insert/delete` return ops or
`lv_to_position`, so Strategy B/C need small `event-graph-walker/text` API
extensions from §1.
2. The current `editor` package depends on `dowdiness/lambda`; using
`@loom.ReactiveParser` directly may require package dependency reshaping.

---

## Memo-derived Views

With the reactive pipeline, all downstream computations become `Memo`s:

```moonbit
// All of these are automatically invalidated when source changes:
let cst : Memo[CstStage] = ...    // Incremental CST parse
let ast : Memo[Ast] = ...         // CST → AST conversion
let errors : Memo[Array[String]]  // Error collection
let source_map : Memo[SourceMap]  // Position mapping (new)
```

The `SourceMap` can be computed as a derived `Memo` from the AST, eliminating the need for `CanonicalModel`'s manual `rebuild_indices()`.

---

## What Gets Removed

| Current code | Replacement |
|---|---|
| `ParsedEditor.parse_dirty : Bool` | `Memo` auto-invalidation |
| `ParsedEditor.cached_text : String` | `Signal[String]` inside `ReactiveParser` |
| `ParsedEditor.ast : AstNode?` | `Memo[Ast]` inside `ReactiveParser` |
| `ParsedEditor.cached_errors` | `Memo` derived from AST |
| `ParsedEditor.reparse()` | `ReactiveParser` internal pipeline |
| `compute_edit()` in `text_diff.mbt` | Keep as fallback until op-aware bridge is available |
| `CanonicalModel.dirty_projections` | `Memo` dependency tracking |

---

## Migration Path

### Step 1: Wire ReactiveParser (Strategy A)

```moonbit
// New field in SyncEditor (§3):
parser : @loom.ReactiveParser[Ast]

// On text change:
fn on_text_change(self : SyncEditor) {
  self.parser.set_source(self.doc.text())
}

// On access:
fn get_ast(self : SyncEditor) -> Ast {
  self.parser.term()
}
```

### Step 2: Add Edit-aware Signal (Strategy C, later)

Extend loom's `ReactiveParser` with:

```moonbit
pub fn ReactiveParser::apply_edit[Ast](
  self : ReactiveParser[Ast],
  edit : Edit,
  new_source : String,
) -> Unit {
  // Set source signal with known edit (avoids internal diff)
  self.source_text.set(new_source)
  self.record_pending_edit(edit) // internal hook for incremental reuse
}
```

### Step 3: Derived SourceMap

```moonbit
// Create a Memo that derives SourceMap from the AST
let source_map_memo = create_memo(db, fn() {
  let ast = parser.term()
  SourceMap::from_ast(ast)
})
```

---

## Verification

1. **Correctness:** `parser.term()` produces identical AST before/after Strategy A migration.
If Strategy B is implemented later, keep an A-vs-B parity test.
2. **Laziness:** Calling `.term()` twice without text change does zero work (memo cache hit).
3. **No manual flags:** Grep for `parse_dirty` — should be zero occurrences after migration.
4. **Performance:** Benchmark single-char edit: reactive pipeline should match or beat current `ParsedEditor.reparse()`.

---

## Dependencies

- **Depends on:** [§1 Edit Bridge](./01-edit-bridge.md) (for Strategy B/C)
- **Depends on:** `loom/ReactiveParser` (exists)
- **Depended on by:** [§3 Unified Editor](./03-unified-editor.md)
