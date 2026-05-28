---
summary: "Canopy cognition/provider-boundary state: PR #379 merged; next is a provider-client integration plan before real network/LLM code"
created: 2026-05-28
status: resolved
tags: [canopy, cognition, provider-boundary, incr, handoff]
related: [docs/plans/2026-05-26-cognition-provider-boundary-design.md, lib/cognition]
---

# Canopy Cognition Provider Boundary

The shipped provider-boundary design/implementation record is `docs/plans/2026-05-26-cognition-provider-boundary-design.md`. The active backlog entry is `docs/TODO.md` section 19: plan a real provider-client integration before adding LLM/network calls. The architecture overview is `docs/architecture/cognition-runtime.md`, and package-facing examples live in `lib/cognition/README.mbt.md`.

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

Follow-up docs after PR #379 were pushed to `main` on 2026-05-28:

- `b8f2aec docs: document cognition provider boundary follow-ups`
- `92760db docs: refresh p0b runtime threading notes`
- `66bfcb7 docs: add loom 147 migration design`

Current dirty state after those commits: only the parent `loom` submodule is dirty because nested `loom/incr` is checked out at a different commit than `loom` records. That is unrelated to cognition and should be handled or preserved separately.

Do not start incr Tier 2 `ReadError` widening unless there is a real Canopy consumer that needs `Err(Disposed)` instead of current abort/fail-closed behavior.

Next likely actions:

1. Write a provider-client integration plan before adding real provider clients, credentials, HTTP, timers, retry loops, or async runtime integration.
2. Keep the loom #147 migration design and nested `loom/incr` spreadsheet work separate from cognition.
3. Do not put provider transport in `CognitionStore` or in `@incr.Derived` compute closures; the driver/client layer owns wall-clock time, scheduling, credentials, and network effects.
