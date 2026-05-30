# Scope-graph binder identity reconciliation, driven by go-to-definition

**Status:** Design — for review (no code yet). Needs a Codex design pass before implementation.
**Date:** 2026-05-30
**Supersedes the open work in:** docs/TODO.md §20 ("reconcile [the node_id divergence] here, or when a consumer first reads a module `node_id` as output").

This is a design document: it states *what* to build and *why this way*. It does not contain implementation code or an ordered task list — those belong in a follow-up implementation doc once the design is validated.

---

## 1. Problem

The scope graph resolves a `Var` reference to a `Decl`. A `Decl` carries a `node_id` whose documented invariant (`lang/lambda/scope/graph.mbt`) is that it **"occupies a projection node."** That invariant holds for lambda binders and is broken for module binders. The breakage has already metastasised into **three incompatible synthetic-id schemes** for the same conceptual thing — "where is `x` bound in `let x = …`":

| Site | Module-binder `node_id` | Real tree node? |
|------|-------------------------|-----------------|
| `lang/lambda/proj/flat_proj.mbt` `to_flat_proj` (production) | fresh positive counter id | **no** — occupies nothing |
| `lang/lambda/proj/flat_proj.mbt` `from_proj_node` (test/oracle) | reuses the def's *init* node id | yes, but it's the **value**, not the binder |
| `examples/ideal/main/scope_annotation.mbt` (binder highlighting) | `NodeId::from_int(-(child.node_id + 1))` — a **negative** id | no — fabricated |

The lambda binder, by contrast, is uniformly `node.id()` of the real `Lam` `ProjNode` (`lang/lambda/scope/builder.mbt:89`), and everything Just Works for lambdas.

### Why this is the high-leverage problem, not the cross-pipeline PBT

The recently-merged cross-pipeline PBT (#401, trimmed in #402) and the #399 contract fixture both **pin this gap as a known gap** — they document the breakage, they do not close it. Meanwhile the gap imposes a concrete, shipped cost:

- **A whole consumer bypasses `@scope`.** `examples/ideal/main/scope_annotation.mbt` does not call `@scope.declaration`/`references` at all. It **re-implements scope resolution from scratch** (`walk_scope`, a second scope-stack walk that duplicates the binding rules already encoded in `lang/lambda/scope/builder.mbt`), specifically because the scope graph's module binder id cannot be mapped to a tree node it can highlight (see its own comment, lines 139–141). It then invents the third synthetic-id scheme above to key its highlight map.
- **Rename/refactor already depend on `@scope`** (`lang/lambda/edits/text_edit_rename.mbt:109`, `text_edit_refactor.mbt:144`) and work only because they re-derive the def site via `find_usages`/`def_index`, never trusting `Decl.node_id` to point anywhere.
- **Go-to-definition cannot be built at all** on top of `Decl.node_id` today: for a module def there is no node to jump to.

So the gap is not academic. It is why one feature was built twice and another can't be built once.

### What the consumer actually needs

Trace it from the feature backward (design principle §1: problem first). Go-to-definition, binder highlighting, and rename all need the same primitive: **"given a reference, where in the source is its binder?"** That is a *source range*, not a node id. The "occupies a `ProjNode`" invariant was only ever a *proxy* for "you can locate the binder." For lambdas the proxy happens to coincide with a real node; for module defs it never did, because the binding occurrence (`x` in `let x = …`) is not currently a `ProjNode` — only its init *value* is.

The cross-pipeline PBT already proved the relevant fact: **source ranges are the pipeline-independent coordinate** (both pipelines derive identical ranges from the same `syntax_to_proj_node`; only node-id *values* differ). The fix should lean on that same fact rather than fabricate node identities that then disagree.

---

## 2. Goal / Non-goals

**Goal.** Make "where is this binder?" answerable uniformly for module defs and lambda params, from a single source of truth (`@scope`), so that (a) go-to-definition can be built, (b) `scope_annotation.mbt` can delete `walk_scope` and consume `@scope`, and (c) the §20/#399 "occupies a node" gap is *resolved*, not pinned.

**Non-goals.**
- Not changing resolution *semantics* (shadowing, cutoff, sequential module scope). Those are correct and covered by `scope_equivalence_wbtest.mbt`.
- Not making the binding occurrence a structurally-editable node unless an option requires it (see Option B). Structural editing *of* a binder (drag/drop, wrap) is out of scope.
- Not touching the `@incr` incremental memo wiring beyond what id/range stability requires.

---

## 3. The crux design question

**What is a module binder's identity, and how does a consumer locate it?**

Three candidate answers, evaluated against five criteria: restores a coherent locate-the-binder contract; lets go-to-definition jump to the **name** (not the value); lets `scope_annotation.mbt` collapse onto `@scope`; survives incremental edits with stable identity; blast radius.

### Option A — Reuse the init node id everywhere

Make `to_flat_proj` reuse the def's init node id (what `from_proj_node` already does), so both pipelines agree and `node_id` points at a real node.

- Locate contract: coherent, but the node is the **init value** (`0` in `let x = 0`), not the binder. Go-to-definition would jump to the value expression, not the name. Rename-at-definition cannot target the name token.
- `scope_annotation` collapse: partial — it could key on the init node, but its negative-id hack exists precisely to *avoid* colliding with the init node (which may itself be a `Lam` with its own annotation). So this reintroduces the collision it was avoiding.
- Incremental: init node id is already reconciled across edits (`reconcile_flat_proj` preserves it). OK.
- Blast radius: small. But it cements a semantically wrong target.
- **Verdict: rejected.** Cheapest, but it locks in "the binder is its value," which blocks name-level go-to-def and rename and re-creates the collision.

### Option B — Give the binding occurrence its own `ProjNode`

Insert a dedicated binder node (carrying the name token's span) into the Module `ProjNode`, so `Decl.node_id` points at a first-class binder node in both pipelines.

- Locate contract: ideal — restores "occupies a node" literally, target is the name.
- `scope_annotation` collapse: yes.
- Incremental: needs a new id-stability story for the binder node in `reconcile_flat_proj`.
- Blast radius: **large.** It changes the Module child layout (`children = [init₀…initₙ, body]`), which is assumed by `from_proj_node`, `to_proj_node`/`to_proj_node_with_prev_module_id`, `scope_annotation.walk_scope`, the cross-pipeline PBT's `def_init_ranges`, `find_binding_for_init`, and likely SourceMap/outline rendering. Every "first N children are inits" site breaks.
- **Verdict: viable but heavy.** Justified only if a future need makes the binder a structural citizen (e.g. drag-drop a binding, structural rename UI). Record as the eventual endpoint, not the first step.

### Option C — `Decl` carries the binder's source range (recommended)

Add the binder's **source range** to the scope graph's `Decl` (the name token's span for module defs; the `λx` / `Lam` head span for lambda params). Consumers (go-to-def, highlighting) use the range to locate/move the cursor; `node_id` is demoted to an internal dedup detail (or removed from the public contract).

- Locate contract: replaces the *proxy* invariant ("occupies a node") with the *real* one ("carries the binder's source range"). Go-to-def jumps to the name. Rename targets the name span.
- `scope_annotation` collapse: yes — it can key its highlight map on binder ranges (binders have distinct spans) and call `@scope`, deleting `walk_scope` and the negative-id hack.
- Incremental: ranges shift with edits but track the source; the binder’s *identity for dedup* can stay the existing reconciled id while the *range* is recomputed. No new tree-shape stability problem.
- Blast radius: **medium.** No Module child-layout change, so `from_proj_node`/`def_init_ranges`/`to_proj_node` keep working structurally. The change is: `Decl` gains a range field; the builder must obtain the binder range; the parser must expose the name token's span (see feasibility gate §4).
- **Verdict: recommended.** Smallest change that gives consumers what they actually need (a locatable binder), retires the §20 framing by fixing the *right* invariant, and converges the pipelines on the coordinate the PBT already validated (ranges).

> Design note (principle §2, question binary framings): the original framing was "make `node_id` a real node (B) vs. leave it synthetic (status quo)." Option C widens the frame: the consumer never needed a *node*, it needed a *location*. C is the design neither original option contained.

---

## 4. Feasibility gate — parser must expose the binder name's span

Both B and C require the binder's source range. Today `LetDefView` (`loom/examples/lambda/src/views.mbt:413`) exposes the name *text* via `token_text(IdentToken)` and the whole-LetDef `start()`, but **no span for the name token**. So a prerequisite, small, parser-side addition is required: a way to get the `IdentToken`'s range (e.g. a `LetDefView::name_range()` that locates the first `IdentToken` element and returns its seam token span, the same span data `SourceMap.populate_token_spans` already consumes).

This lives in the loom submodule (`dowdiness/lambda`). Per the submodule workflow it is its own PR, merged and pointer-bumped before the canopy-side change. **This gate must be confirmed feasible before committing to B or C** — if seam does not retain the name token's span through the CST→Syntax facade, the design changes.

---

## 5. Driving consumer: go-to-definition

Build go-to-definition as the thin end-to-end consumer that *forces* the fix and proves it:

1. Editor receives a "go to definition" request at a cursor position.
2. Map position → reference `NodeId` (existing SourceMap `innermost_node_at` / `nodes_at_position`).
3. `@scope.declaration(graph, ref_id)` → `Decl`.
4. Read the binder range off the `Decl` (Option C) and move the cursor / select it.

The same `Decl`-range primitive then lets `scope_annotation.mbt` delete `walk_scope` + `backfill_usages` + the negative-id scheme and rebuild its highlight set from `@scope.declaration` + `@scope.references`, keying on binder ranges. That deletion is the leverage: one resolver instead of two, one binder-identity scheme instead of three.

---

## 6. Blast radius (Option C)

- **`lang/lambda/scope/graph.mbt`** — `Decl` gains a binder-range field; the "occupies a node" doc note is rewritten to "carries the binder's source range." `node_id` either stays as an internal key or is dropped from the public `Decl`.
- **`lang/lambda/scope/builder.mbt`** — `add_decl` must supply the binder range (module: from the new parser name-span threaded through `FlatProj`; lambda: from the `Lam` node range it already has). `containing_def_index`/`resolve` unaffected (they don't read it).
- **`lang/lambda/proj/flat_proj.mbt`** — `FlatProj.defs` tuple likely carries the binder range alongside (or instead of) the synthetic id; `to_flat_proj`, `from_proj_node`, `reconcile_flat_proj` updated. **Verify cross-package construction** (`pub(all)` / named constructor) before changing the tuple shape.
- **`examples/ideal/main/scope_annotation.mbt`** — `walk_scope`/`backfill_usages` deleted; rebuilt on `@scope`. Net code *removed*.
- **Tests that pin the gap** — the #399 module-`node_id`-is-synthetic fixture and the cross-pipeline PBT's `assert_production_node_id_invariants` flip or retire: their `is None` assertion is *designed* to fail when the gap closes (that failure is the intended signal). Update them to assert the new contract (binder range present and pipeline-equal) rather than the old gap.
- **Rename/refactor** (`text_edit_rename.mbt`, `text_edit_refactor.mbt`) — can be simplified to use the binder range directly, but that simplification is optional and can follow.

`from_proj_node`'s and the PBT's "first N children are inits" assumption is **preserved** under C (no tree-shape change) — a key reason to prefer C over B.

---

## 7. Test strategy

1. **Go-to-definition behavioral tests** — cursor on a `Var` lands on the right binder name span: module def, shadowed module def (later wins), lambda param, nested-lambda shadowing, free var (no jump). These replace the gap-pinning fixtures with contract-affirming ones.
2. **Incremental ↔ full differential resolution test (high-leverage, currently missing).** Apply a sequence of edits to an editor, then assert that the incrementally-maintained scope graph resolves every reference *identically to a fresh full parse + build of the final text* — including the binder ranges. This is the analog of `loom/examples/lambda/src/imperative_differential_fuzz_test.mbt` and covers the `@incr`/`to_flat_proj_incremental` path the cross-pipeline PBT explicitly excludes. This is where the real, untested staleness bugs live; the binder-range work is the natural moment to add it.
3. **Retain** `scope_equivalence_wbtest.mbt` (the hand-derived semantic oracle) unchanged — it remains the guard against a shared bug in `@scope.build` that any equivalence/differential test is blind to.

---

## 8. Open questions for Codex design review

1. **Feasibility gate (§4):** does seam retain the `IdentToken` span through the `SyntaxNode` facade so `LetDefView::name_range()` is implementable? If not, the binder range must come from elsewhere — where?
2. **Option C vs B:** is demoting `node_id` to "internal/derived" acceptable, or does any current/near-term consumer (structural editing, CRDT identity, the inspector traceability workstream) actually need the binder to be a first-class `ProjNode` (forcing B)? Specifically: does CRDT/projection identity ever key on a binder node id?
3. **`FlatProj` tuple change:** add the range as a 5th tuple element, or replace the synthetic `NodeId`? What does `reconcile_flat_proj` need so the binder's *dedup identity* stays stable across edits while its *range* is recomputed?
4. **Range source for lambda binders:** use the whole `Lam` node range (status quo proxy) or specifically the `λx` head / param-name span, for symmetry with the module name-span? Does go-to-def want to land on `λ` or on `x`?
5. **Retiring the gap tests:** confirm the #399 fixture + PBT `node_id` invariants should be *rewritten* to affirm the new contract rather than deleted, so the regression coverage survives the reconciliation.

---

## 9. Sequencing (once design is validated)

1. Confirm §4 feasibility gate in loom; land `LetDefView::name_range()` (loom PR + pointer bump).
2. Canopy: thread the binder range through `FlatProj` → `builder` → `Decl` (Option C).
3. Build go-to-definition as the driving consumer; add its behavioral tests.
4. Collapse `scope_annotation.mbt` onto `@scope`; delete `walk_scope` + negative-id scheme.
5. Rewrite the #399 fixture + PBT `node_id` invariants to affirm the binder-range contract.
6. Add the incremental ↔ full differential resolution test.
7. Mark docs/TODO.md §20 resolved; archive this plan per the docs protocol.

Each of 2–6 is independently reviewable; 3 and 4 are the visible payoff.
