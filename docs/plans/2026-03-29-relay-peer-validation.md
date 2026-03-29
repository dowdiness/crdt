# Relay Peer ID Validation

## Why

`RelayRoom` currently trusts caller-supplied peer IDs and membership state.
That keeps the room implementation simple, but it leaves duplicate IDs and
invalid disconnect/message cases dependent on external glue rather than the room
API itself.

## Scope

In:
- `relay/relay_room.mbt`
- `relay/relay_room_wbtest.mbt`
- `relay/error_path_wbtest.mbt`
- `crdt_relay.mbt` if API adaptation is required

Out:
- changes to the wire protocol
- auth or identity issuance

## Current State

- `RelayRoom` documents that peer IDs are trusted and that there is no duplicate
  or membership validation.
- The active backlog calls out duplicate/invalid peer rejection as unfinished.

## Desired State

- The room API has explicit, tested behavior for duplicate peer IDs and invalid
  membership operations.
- Invalid room operations do not silently rely on caller discipline.

## Steps

1. Define the desired API behavior for duplicate connect, invalid disconnect,
   and invalid sender/message cases.
2. Implement validation in `RelayRoom`.
3. Update tests for both happy-path and error-path behavior.
4. Adjust any FFI adapter behavior if needed.

## Acceptance Criteria

- [ ] Duplicate peer IDs are rejected or ignored by defined, tested behavior.
- [ ] Invalid disconnects and invalid sender message cases have defined behavior.
- [ ] Relay tests cover the new validation rules.

## Validation

```bash
moon test
moon check
```

## Risks

- Tightening validation may require small adapter changes if existing callers
  depended on silent no-op behavior.

## Notes

- Relevant code: `relay/relay_room.mbt`
