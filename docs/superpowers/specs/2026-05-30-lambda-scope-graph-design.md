# Lambda Scope Graph — Binding-Logic Consolidation (Design)

**Date:** 2026-05-30
**Status:** Design approved, pending spec review
**Scope:** canopy-side only (`lang/lambda/`); the `loom` submodule is not touched.

## Motivation

Name-resolution / binding logic for the lambda language is duplicated and ad-hoc
across ~5 sites:

- `lang/lambda/edits/scope.mbt` (167 lines) — `resolve_binder`,
  `find_enclosing_lam_binder`, `find_usages`, `collect_lam_env`,
  `find_binding_for_init`.
- `lang/lambda/edits/free_vars.mbt` (31 lines) — capture analysis `FV(term, env)`.
- `lang/lambda/semantic/semantic_projection.mbt` (265 lines) — walks the AST
  threading an environment array, classifies each `Var` as bound/free.

Two concrete problems:

1. **O(N²) parent search.** `find_enclosing_lam_binder` and `collect_lam_env`
   full-scan `registry: Map[NodeId, ProjNode[Term]]` to find a node's parent —
   O(N) per step, O(N²) overall.
2. **No single source of truth.** Each site re-derives scoping, so a fix in one
   place (e.g. a shadowing edge case) does not propagate. There is no queryable
   "where is this name declared / referenced" facility, which blocks
   go-to-definition / find-references / capture-safe rename from sharing one
   correct implementation.

This design introduces a single **NodeId-keyed scope graph** that the binding
sites migrate onto, drawing on:

- *A Theory of Name Resolution* (Néron, Tolmach, Visser, Wachsmuth, 2015) — the
  Scope / Declaration / Reference graph model and resolution-by-path-search.
- *Incremental Type-Checking for Free* (Zwaan, van Antwerpen, Visser, OOPSLA
  2022) — query-confirmation + environment-diffing for incrementality. **Not
  built in v1**; its data shape is *reserved* (see §"Reserved extension points").

A small MoonBit reference implementation of the 2015 theory exists
(`caimeox/scope_graph`). We do **not** depend on it. It is BATCH
(non-incremental), uses position-dependent `Int` indices, and is hardcoded to
its own AST `LmProgram`. We use it only as a **correctness oracle** in
differential tests.

## Non-goals (v1)

- **Incremental rebuild.** v1 rebuilds the whole graph each time, but correctly.
  Incrementality is a reserved extension point, not v1 work.
- **Migrating all consumers.** v1 rewires exactly ONE consumer (`rename`'s
  `resolve_binder`) and proves equivalence. `free_vars`,
  `semantic_projection`, and `actions` migrate in later PRs.
- **loom generalization.** The language-agnostic core lives in its own file so a
  future loom sibling package can lift it, but v1 does not extract it.
- **Touching the loom submodule.** canopy `lang/lambda` already shares loom's
  AST type `@ast.Term`; the graph consumes it. No submodule PR.

## Architecture

New package `lang/lambda/scope/`, split into three files by responsibility:

### `graph.mbt` — data model (language-agnostic core)

```
ScopeGraph { scopes: Array[Scope], decls: Array[Decl], refs: Array[Ref] }
Scope { id: ScopeId, parent: ScopeId?, decl_ids: Array[DeclId], ref_ids: Array[RefId] }
Decl  { node_id: NodeId, name: String, scope: ScopeId }
Ref   { node_id: NodeId, name: String, scope: ScopeId, resolution: Resolution }
Resolution { decl: DeclId?, visited_scopes: Array[ScopeId] }
```

Everything is keyed by `core.NodeId` (stable across edits) rather than the
position-dependent `Int` indices that caimeox uses. `ScopeId`/`DeclId`/`RefId`
are internal compact indices into the graph's own arrays (graph-local, not
persistent identity — `NodeId` carries persistent identity).

`Resolution.decl: None` is a **negative observation** (an unresolved /
free reference). `visited_scopes` records the scopes that were checked and found
NOT to contain the name during resolution. Both are populated in v1 (the
resolution walk produces them as a by-product) but only `decl` is read by v1
queries. They exist so that incrementality (which depends on negative
observations) can later be layered on without a breaking change to `Resolution`.

### `builder.mbt` — lambda-specific construction

`build(flat_proj, registry, source_map) -> ScopeGraph`, run once per rebuild:

- **Pass 1:** build a `NodeId -> parent NodeId` map from `registry` in a single
  scan. This removes the O(N²) full-scan that `find_enclosing_lam_binder` /
  `collect_lam_env` perform today.
- **Pass 2:** create scopes and decls encoding the binding rules below.
- **Pass 3:** resolve each ref, storing its `Resolution` (decl + visited_scopes).

Binding rules of the lambda language (must be faithfully encoded):

1. `Lam(param, body)` opens a new lexical scope binding `param`; an inner `Lam`
   shadows an outer one.
2. `Module` defs are **sequential**: def `i` is in scope for defs `i+1..n` AND
   the body. A later def with the same name shadows an earlier one.
3. A `Var` resolves to the innermost enclosing `Lam` param matching the name,
   else the latest *preceding* `Module` def, else free/unbound.

**Sequential-scope encoding (Codex Q1).** A single module scope is used, but each
ref carries a **cutoff** (the def index it appears within, or a body sentinel),
and resolution only considers decls whose def-index is *strictly before* the
cutoff. Consequences that MUST hold:

- `def x = x` alone → the inner `x` is **unbound** (a def is not visible in its
  own init).
- `def x = 1; def x = x` → the second init's `x` binds to the **first** `x`.
- A def referencing a *later* def → unbound.

Per-def child-scope chaining (caimeox's `seqb` approach) is an equivalent
alternative but unnecessary; the cutoff index achieves the same visibility with
one module scope.

### `query.mbt` — query API

- `declaration(ref_node: NodeId) -> Decl?` — the binding site a reference
  resolves to (replaces `resolve_binder`).
- `references(decl_node: NodeId) -> Array[NodeId]` — **identity-based**: returns
  refs whose `resolution.decl` points at this decl, NOT a name match. (Codex Q2:
  a name-based `find_usages` over-renames when shadowing is present.)
- `enclosing_env(node: NodeId) -> Array[String]` — bound names in scope at a
  node (replaces `collect_lam_env`).

Dependency direction: `scope` depends on `core` (NodeId/SourceMap/ProjNode) and
`lang/lambda/proj` (FlatProj/Term). `edits` / `semantic` / `rename` will depend
on `scope` (no back-edge).

## Data flow (v1, non-incremental)

```
edit → projection rebuild (existing) → FlatProj + registry + SourceMap (existing)
     → ScopeGraph::build(...)              [new, once]
        ├─ pass 1: NodeId → parent map     (single registry scan)
        ├─ pass 2: scopes + decls          (Lam param scopes + sequential module scope)
        └─ pass 3: resolve refs            (store Resolution per ref)
     → query (declaration / references / enclosing_env) ← consumers
```

## Error handling

- The builder ALWAYS returns a graph, even on partial / broken ASTs
  (`Error` / `Hole` / `Unbound` nodes). A projectional editor is mid-edit
  constantly, so resolution never `raise`s on unresolved names — they become
  `Resolution{ decl: None, .. }` (a normal negative observation).
- The only invariant violation is a **parent-chain cycle**. The builder asserts
  the parent DAG is acyclic at construction (Codex Q5). This is structurally
  impossible for tree-nested Lam/Module, so it is a defect guard via `fail()`
  (not caught — catching would risk silently-wrong results; cf. memory
  `feedback_no_safe_recovery_abort_ok`).

## Testing strategy (three layers)

### Layer 1 — hand-written expected-value tests (primary safety net)

Pin the Codex Q1/Q2 edge cases by name, with values **derived by hand** (not by
re-running a formula; cf. memory `feedback_algorithm_process`):

- `def x = x` → unbound.
- `def x = 1; def x = x` → second init binds to first `x`.
- innermost `Lam` shadowing; `Module` def shadowing.
- body sentinel; "not visible in own init / preceding defs".

### Layer 2 — differential tests (caimeox oracle)

`source fixture → independent Term→LmProgram adapter → caimeox resolution →
compare via a NodeId side-table`.

- **Non-circularity (Codex Q3):** the adapter is an INDEPENDENT transform that
  does NOT route through the new builder/query code.
- **Fidelity (Codex Q3):** caimeox's AST lacks Canopy's `If` / `Unit` / `Hole` /
  `Error` / `Unbound` and has extra `Fix` / imports. Compare only the shared
  subset (Var / Lam / App / Module / let-equivalent); excluded constructs are
  covered by Layer 1.
- This is the operational form of design principle §6 ("make the discovered
  structure predict").

### Layer 3 — equivalence tests (migration safety net)

For the migrated `rename` consumer, pin that the new `declaration()` and the
current `resolve_binder()` return the SAME `BindingSite` across all fixtures.

- **Non-circularity (memory `feedback_drift_detector_non_circular`):** keep the
  old `resolve_binder` live and run BOTH during the test, comparing outputs.
  Delete the old implementation only after migration is proven, in the same PR.

This is the pass condition for the "structure + 1 consumer" PoC.

## Reserved extension points (NOT built in v1)

Per design principle §7 (reserving an extension point costs far less than a later
breaking change):

1. **Incremental rebuild** via query-confirmation + environment-diffing
   (OOPSLA 2022). The paper's hardest machinery is UNNEEDED here:
   - §7 scope-graph diffing (for non-deterministic scope identity) — unneeded
     because canopy has STABLE `NodeId`.
   - §6 multi-unit actor / deadlock detection — unneeded because canopy is
     currently a SINGLE compilation unit.
   What remains is query-confirmation over negative observations, which is why
   `Resolution` already carries `decl: DeclId?` + `visited_scopes` in v1.
   - **Cycle trap (Codex Q5):** if later layered on canopy's `loom/incr` Datalog
     substrate (`Relation` + `MemoMap`), a transitive-closure `MemoMap` compute
     fn MUST walk the base parent/def edges directly (iterative BFS or Datalog
     fixpoint), NOT recurse through the closure `MemoMap` itself — that creates a
     memo cycle the runtime aborts (cf. memory `project_incr_impact_bfs_cycle_trap`).
2. **loom generalization:** the language-agnostic `graph.mbt` core can be lifted
   into a loom sibling package; per-language builders supply rules. v1 keeps the
   core in its own file to make this a move, not a rewrite.

## Open questions

None blocking. Migration order for the remaining consumers
(`free_vars` / `semantic_projection` / `actions`) is decided per follow-up PR.

## References

- Néron, Tolmach, Visser, Wachsmuth. *A Theory of Name Resolution.* ESOP 2015.
- Zwaan, van Antwerpen, Visser. *Incremental Type-Checking for Free: Using Scope
  Graphs to Derive Incremental Type-Checkers.* OOPSLA 2022.
  <https://aronzwaan.github.io/assets/oopsla22.pdf>
- `caimeox/scope_graph` (MoonBit reference impl of the 2015 theory) — oracle only.
