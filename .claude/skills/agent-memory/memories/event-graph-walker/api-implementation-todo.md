---
summary: "TODO tracker for event-graph-walker user-friendly API implementation"
created: 2026-01-23
status: in-progress
tags: [todo, api-design, event-graph-walker]
related: [event-graph-walker/text/, .claude/skills/agent-memory/memories/event-graph-walker/user-friendly-api-plan.md]
---

# Event Graph Walker API Implementation TODO

## Phase 1: Package Setup
- [x] Create `event-graph-walker/text/` package
- [x] Add `moon.pkg.json` with dependencies

## Phase 2: Core Types
- [x] `types.mbt` - Opaque types (Pos, Range, Version, Change)
- [x] `errors.mbt` - TextError enum with diagnostic methods

## Phase 3: TextDoc
- [x] `text_doc.mbt` - Main entry point wrapper
  - [x] `new(agent_id)`
  - [x] `text()`, `len()`
  - [x] `insert()`, `delete()`
  - [x] `version()`
  - [x] `advanced()`

## Phase 4: Sync
- [x] `sync.mbt` - SyncSession and SyncMessage
  - [x] `SyncMessage` struct
  - [x] `SyncSession::export_all()`
  - [x] `SyncSession::export_since()`
  - [x] `SyncSession::apply()`

## Phase 5: TextView
- [x] `view.mbt` - Historical checkout
  - [x] `checkout(version)`
  - [x] `TextView::text()`
  - [x] `TextView::version()`

## Phase 6: Tests & Docs
- [x] Unit tests for all public API (19 tests)
- [ ] Property tests with quickcheck
- [ ] Update README.md with new usage examples
- [ ] Add migration guide from direct Document usage

## Current Progress

**Status**: Phase 5 complete - Core implementation done, 122 tests passing (19 new text API tests)
