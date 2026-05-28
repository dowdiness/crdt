---
summary: "Canopy cognition/provider-boundary state: PR #379 merged, active docs, validation, and remaining unrelated dirty files"
created: 2026-05-28
status: resolved
tags: [canopy, cognition, provider-boundary, incr, handoff]
related: [docs/plans/2026-05-26-cognition-provider-boundary-design.md, lib/cognition]
---

# Canopy Cognition Provider Boundary

The active design/implementation plan is `docs/plans/2026-05-26-cognition-provider-boundary-design.md`. The active backlog entry is `docs/TODO.md` section 19. The architecture overview is `docs/architecture/cognition-runtime.md`, and package-facing examples live in `lib/cognition/README.mbt.md`.

Core rule: keep `CognitionStore` synchronous and deterministic. It may plan provider work, store request/result/status data, and reject stale completions, but real provider clients, credentials, HTTP, retry loops, timers, and async scheduling stay outside the store. Do not run provider transport inside `@incr.Derived` bodies.

PR #379 merged the first reactive driver slice:

- URL: https://github.com/dowdiness/canopy/pull/379
- Branch: `feat/cognition-provider-boundary-reactive-driver`
- PR head before merge: `5157847 feat: add reactive provider boundary driver`
- Squash merge commit on `main`: `e4a25fa`
- State: merged on 2026-05-28

PR #379 changes:

- Adds `lib/cognition/provider_boundary_reactive.mbt`, an internal `@incr` planning/status graph with request intent, provider state records, fake time, derived status/retry/next-driver-action cells, and persistent `Watch` roots.
- Wires `lib/cognition/reactive.mbt` and `provider_boundary_store.mbt` so planning, cancellation, and completion record provider events in that graph while preserving the public request/completion contract as ordinary domain values.
- Adds wbtests for reactive planning/status, retry timing, cancellation priority, rooted watch lifecycle across `Runtime::gc()`, and a deterministic scripted provider driver with no network.
- Extends store boundary tests for request-scoped cancellation, driver shutdown, stale file removal, stale ranker/budget context, and dependency-edge preservation.

Validation run before merging PR #379:

- `NEW_MOON_MOD=0 moon check lib/cognition`
- `NEW_MOON_MOD=0 moon test lib/cognition` -> 91 passed
- `NEW_MOON_MOD=0 moon fmt`
- `NEW_MOON_MOD=0 moon info`
- `NEW_MOON_MOD=0 moon check`
- `NEW_MOON_MOD=0 moon test` -> 1217 JS passed, 237 wasm-gc passed
- `NEW_MOON_MOD=0 moon check --deny-warn`
- `git diff --cached --check`

Do not start incr Tier 2 `ReadError` widening unless there is a real Canopy consumer that needs `Err(Disposed)` instead of current abort/fail-closed behavior.

Unrelated dirty files intentionally left out of PR #379:

- `docs/research/2026-05-23-runtime-safety-decision.md`
- `docs/research/2026-05-23-workspace-identity-decision.md`
- `docs/research/2026-05-24-shared-runtime-call-flow-grounding.md`
- `workspace/probe/gate1_runtime_safety_wbtest.mbt`
- `workspace/probe/identity_probe_wbtest.mbt`
- `docs/superpowers/specs/2026-05-24-loom-147-migration-design.md`
- `loom` nested dirtiness from `loom/incr`

Nested `loom/incr` dirty files:

- `loom/incr/docs/README.md`
- `loom/incr/docs/plans/2026-05-28-typed-spreadsheet-boundary.md`
- `loom/incr/tests/typed_spreadsheet_spikes_test.mbt`

Next likely actions:

1. Handle the unrelated runtime/probe comment refresh separately, if still wanted.
2. Keep the loom #147 migration design and nested `loom/incr` spreadsheet work separate from cognition.
3. Do not add real provider clients, credentials, HTTP, timers, or async runtime integration until a separate provider-client plan exists.
