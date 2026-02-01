# Project TODO

Improvement proposals for the eg-walker CRDT Lambda Calculus Editor.

## Priority Legend

- **Impact:** High / Medium / Low
- **Effort:** High / Medium / Low
- **Status:** Not Started / In Progress / Done

---

## 1. CI/CD & Automation

**Impact:** High | **Effort:** Low-Medium | **Status:** ✅ Done

- [x] Add GitHub Actions workflow to run `moon test` for both modules on push/PR
- [x] Add `moon check` and `moon fmt --check` to CI pipeline
- [x] Add benchmark regression detection (store baselines, compare on PR)
- [x] Automate JS build verification (`moon build --target js`)
- [x] Add deployment workflow for GitHub Pages
- [x] Add release automation workflow
- [x] Add Dependabot configuration for dependency updates
- [x] Add Makefile for common development tasks
- [x] Add helper scripts (build-web.sh, test-all.sh, check-all.sh)
- [x] Add pre-commit hook installation script

---

## 2. Collaboration Features

**Impact:** High | **Effort:** High

- [ ] Complete WebSocket client integration (sync protocol designed in `NETWORK_SYNC.md`, TypeScript API stub exists)
- [ ] Fix P2-1: Remote sync pollutes undo history — add `suppressUndoTracking` for remote changes (see `valtio/PLAN.md`)
- [ ] Fix P2-2: Position-based undo replays stale positions after concurrent edits — switch to snapshot-based undo (see `valtio/PLAN.md`)
- [ ] Add remote cursor/selection tracking

---

## 3. Incremental Parsing Optimization

**Impact:** Medium | **Effort:** Medium

- [ ] Implement selective cache invalidation by range instead of full reparse fallback (`parser/incremental_parser.mbt:76`)
- [ ] Implement LCS matching for AST child reconciliation instead of positional matching (`projection/text_lens.mbt:219`)

---

## 4. Memory & Scalability

**Impact:** Medium | **Effort:** High

- [ ] Apply RLE memory optimization across full pipeline (estimated 50-80% reduction, Phase 2 TextSpan done)
- [ ] Implement lazy loading for 100k+ operation documents (load causal graph skeleton, hydrate on demand)
- [ ] Add B-tree indexing for FugueTree (O(n) → O(log n) random-access character lookup)

---

## 5. Testing Gaps

**Impact:** Medium | **Effort:** Low-Medium

- [ ] Add fuzz testing — random byte streams to parser, random operation sequences to CRDT
- [ ] Add E2E browser tests with Playwright (already a devDependency, no automated tests yet)
- [ ] Add error path tests — malformed sync messages, corrupted operation logs, network interruptions
- [ ] Add multi-agent stress tests in MoonBit — property-test N concurrent agents with random interleaving

---

## 6. Code Cleanup

**Impact:** Low | **Effort:** Low

- [ ] Remove commented-out code in `parser/ast_to_dot.mbt` (lines 84, 87, 98)
- [ ] Convert `abort()` calls in test files to proper assertions (`assert_true` / `inspect`) for better error messages

---

## 7. Developer Experience

**Impact:** Low-Medium | **Effort:** Low | **Status:** ✅ Done

- [x] Add top-level `Makefile` or `justfile` wrapping both-module test commands into a single invocation
- [x] Add pre-commit hook running `moon check && moon fmt --check`
- [x] Script the web build workflow (`moon build --target js && cp target/js/release/build/crdt.js web/public/`)

---

## Priority Ranking

| # | Proposal | Effort | Impact |
|---|----------|--------|--------|
| 1 | CI test automation | Low | High |
| 2 | Fix undo/redo (P2-1, P2-2) | Medium | High |
| 3 | Complete WebSocket collaboration | High | High |
| 4 | E2E browser tests | Low | Medium |
| 5 | Benchmark regression CI | Medium | Medium |
| 6 | Incremental parsing TODOs | Medium | Medium |
| 7 | Single-command test runner | Low | Low-Med |
| 8 | Code cleanup | Low | Low |
| 9 | Memory optimization | High | Medium |
| 10 | Fuzz testing | Medium | Medium |
