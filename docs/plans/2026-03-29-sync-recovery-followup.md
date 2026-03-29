# SyncRequest / SyncResponse Recovery Follow-Up

## Status

Blocked.

Blocked on:
- container implementation / next sync mechanism

## Why

The current WebSocket recovery flow already has substantial implementation and
historical design work, but any further hardening should wait until the
container implementation defines the next sync boundary clearly.

Doing more now risks reinforcing pre-container recovery assumptions that may no
longer be the right abstraction once the new sync mechanism lands.

## Scope

In:
- `editor/sync_editor_ws.mbt`
- `editor/sync_editor_ws_wbtest.mbt`
- `editor/error_path_wbtest.mbt`
- relay-side message routing only if required by the post-container design

Out:
- broad transport redesign before the container boundary is settled
- unrelated WebSocket client glue work

## Current State

- `SyncEditor` already contains `SyncRequest` / `SyncResponse` handling and
  recovery state.
- Historical design and implementation context exists in the archived recovery
  docs from 2026-03-22.
- The remaining question is not "how to add recovery from scratch" but "what
  recovery behavior should survive the container-based sync redesign".

## Desired State

- Recovery behavior is re-evaluated against the post-container sync boundary.
- Retry, buffering, and failure semantics match the new design rather than the
  current pre-container assumptions.
- Tests and docs describe the supported recovery path clearly.

## Steps

1. Revisit the archived recovery design after container implementation lands.
2. Decide which parts of the current recovery flow remain valid.
3. Update implementation, tests, and docs to match the post-container design.
4. Remove or simplify any pre-container-only recovery behavior that no longer fits.

## Acceptance Criteria

- [ ] Recovery semantics are defined against the post-container sync boundary.
- [ ] Supported retry and failure behavior is covered by tests.
- [ ] Active docs describe the supported recovery path without relying on stale pre-container assumptions.

## Validation

```bash
moon test
moon check
```

## Risks

- The current partial implementation may bias future decisions if treated as
  fixed architecture instead of a candidate design.

## Notes

- Historical context: `docs/archive/completed-phases/2026-03-22-websocket-sync-recovery-design.md`
- Historical context: `docs/archive/completed-phases/2026-03-22-websocket-sync-recovery-impl.md`
