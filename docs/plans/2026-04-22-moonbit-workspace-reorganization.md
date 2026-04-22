# MoonBit Workspace Reorganization — Analysis & Staged Plan

**Date:** 2026-04-22
**Status:** Stages 0, 1, 2, 3, 5 complete (Stage 1 shipped in PR #TBD; prior stages in PR #210). Stages 4, 6 optional — not pursued.
**Scope:** Propose a `moon.work`-based workspace layout for the Canopy monorepo, with a low-risk staged migration. No full rewrite.

**Revision note:** This doc was reviewed by codex against the actual repo on 2026-04-22 and corrected. The Facts/Interpretations/Rules sections now reflect verified imports, not guesses.

## Stage 0 findings (2026-04-22)

Stage 0 executed: `scripts/dump-deps.sh` was written and its output saved to `docs/architecture/dep-graph-2026-04-22.txt` (580 lines, 482 package-level import edges across 92 packages, 62 module-level dep edges). Key findings from the dump:

- **26 canopy packages**, not "~27" (the earlier approximation): `./`, `core`, `editor`, `projection`, `protocol`, `relay`, `llm`, `echo`, `echo/tokenizer`, `echo/cmd`, `cmd/main`, `ffi/{json,lambda,markdown}`, `lang/{json,lambda}/`, `lang/{json,lambda,markdown}/{companion,edits,proj}`, `lang/lambda/{eval,flat}`.
- **`lang/markdown/` has no facade package** — only `companion`, `edits`, `proj`. By contrast `lang/json/` and `lang/lambda/` each have a top-level facade `moon.pkg`. `lang/json` is an **orphan facade** — nothing internal imports it (internal consumers go straight to `lang/json/companion`).
- **Real canopy bases** (packages that import no `dowdiness/canopy/*`): `core`, `llm`, `relay`, `lang/lambda/eval`, `echo/tokenizer`. Not just `core`.
- **Canopy apex consumers** (nothing internal imports them): `cmd/main`, `echo/cmd`, `ffi/{json,lambda,markdown}`, `lang/json` (the orphan facade). `lang/lambda` is imported by `editor` (test/wbtest) and `ffi/lambda`, so it's not apex.
- **`lib/*` libraries are NOT cleanly at the bottom.** Two surprise path-deps *from libs into submodules*:
  - `lib/btree → rle` (submodule).
  - `lib/semantic → loom/examples/markdown` (a submodule's *example* tree — unusual contract).
- **Bidirectional `lib/*` coupling is confirmed and broader than first thought.** Packages reaching back into `lib/*`:
  - `event-graph-walker` → `lib/btree`
  - `order-tree` → `lib/btree`
  - `loom/loom` → `lib/text-change`
  - `valtio` → `lib/text-change`
  - `examples/ideal` → `lib/text-change` (new — wasn't in earlier enumeration)
- **No `lib/*` module imports `dowdiness/canopy/*`** in any scope. The aspirational rule "libs must not reach into canopy" already holds.
- **No `moon.pkg`-level cycles detected** within canopy or across its boundaries. There is a long diamond (canopy → event-graph-walker → lib/btree → rle; canopy → rle directly does not exist; canopy → lib/btree does not exist at root either), but it is acyclic.
- **Cross-module canopy consumption is dominated by `examples/ideal`**, which imports `canopy/{core, editor, projection, ffi/lambda, lang/lambda, lang/lambda/edits}`. Other external canopy consumers are minimal (`examples/block-editor` imports only `canopy/core`).
- **Stage 4 blocker confirmed.** All three `lang/*/companion` packages import `canopy/editor` in normal scope. Lift-candidates that have **no** editor dep and can become standalone modules: `lang/lambda/{proj, edits, eval, flat}`, `lang/json/{proj, edits}`, `lang/markdown/{proj, edits}`.

**Stage 0 status:** complete. Migration can proceed to Stage 1.

## Facts

- Root `moon.mod.json` declares **one module** `dowdiness/canopy` with **13 path-deps** and 3 registry deps (`moonbitlang/{quickcheck,x,async}`). `preferred-target: js`.
  - Path-deps into `loom/*` (9): `incr`, `loom`, `seam`, `pretty`, `egglog`, `egraph`, `examples/lambda` (as `lambda`), `examples/json` (as `json`), `examples/markdown` (as `markdown`).
  - Path-deps into submodules outside loom (3): `event-graph-walker`, `order-tree`, via their own dir names.
  - Path-deps into in-repo `lib/*` (2 only): `text_change` → `lib/text-change`, `zipper` → `lib/zipper`. **`lib/btree`, `lib/semantic`, `lib/semantic/proof` are not root deps.**
- No `moon.work` exists.
- `.gitmodules` lists 8 git submodules pointing at separate GitHub repos under `dowdiness/`: `alga`, `event-graph-walker`, `graphviz`, `loom`, `order-tree`, `rle`, `svg-dsl`, `valtio`.
- `loom/` itself contains **10** nested modules (its own `moon.mod.json` files), not 7: `cst-transform`, `egglog`, `egraph`, `incr`, `loom`, `pretty`, `seam`, `examples/json`, `examples/lambda`, `examples/markdown`.
- **Submodules depend back into the parent repo's `lib/*`** (critical bidirectional coupling):
  - `event-graph-walker/moon.mod.json`: path-deps `../lib/btree`, `../rle`, `../order-tree`, `../alga`.
  - `order-tree/moon.mod.json`: path-deps `../lib/btree`, `../rle`.
  - `loom/loom/moon.mod.json`: path-dep `../../lib/text-change`.
  - `valtio/moon.mod.json`: path-dep `../lib/text-change`.
  - `examples/ideal/moon.mod.json`: path-dep `../../lib/text-change` (example → lib).
- **`lib/*` modules also reach out across the repo boundary:**
  - `lib/btree/moon.mod.json`: path-dep `../../rle` (a submodule).
  - `lib/semantic/moon.mod.json`: path-dep `../../loom/examples/markdown` (a submodule's *example*).
- In-repo **modules** (own `moon.mod.json`, not submodules):
  - `lib/btree`, `lib/text-change`, `lib/semantic` (+ `lib/semantic/proof`), `lib/zipper`.
  - `examples/ideal`, `examples/block-editor`, `examples/canvas`.
- In-repo **packages of the canopy module** (have `moon.pkg`, no `moon.mod.json`) — **26 packages total** (confirmed by Stage 0 dump):
  - Top-tier: root `./moon.pkg`, `core/`, `editor/`, `projection/`, `protocol/`, `relay/`, `llm/`, `echo/` (+ `echo/tokenizer`, `echo/cmd`), `cmd/main/`.
  - Language layer: `lang/json/`, `lang/lambda/` (facade packages); `lang/{json,lambda,markdown}/{companion,edits,proj}/`; `lang/lambda/{eval,flat}/`. **Note: `lang/markdown/` has no facade — only sub-packages.**
  - FFI boundary: `ffi/{json,lambda,markdown}/`.
- `lib/editor-adapter` is **not** a MoonBit module — it is TypeScript (`.ts`, `.css` only).
- `examples/{demo-react, prosemirror, web, relay-server, block-editor/*-web variants}` are JS/Node demos. `examples/rabbita` is **not** in the active tree — it only appears in `docs/archive/` and as an external dep (`moonbit-community/rabbita`) consumed by `examples/ideal`.
- Root `moon.pkg` imports `canopy/{editor,core,projection,protocol,relay}`.
- Selected verified intra-canopy imports (normal scope unless noted):
  - `editor → core, protocol, text_change, incr, loom, loom/core, seam, pretty, egw/{text,undo}, canopy/protocol`. Test-scope: `lang/lambda` + `lambda` + `lambda/ast`. Wbtest-scope: `lang/lambda`.
  - `cmd/main → editor, egw/text, lambda, pretty`. **No `ffi/*` or `lang/*` imports.**
  - `ffi/lambda → editor, lang/lambda, llm, relay, lambda/ast, lambda/typecheck, seam, incr/cells, egw/text, js_async`.
  - `lang/lambda/companion → editor, protocol, core, lang/lambda/{proj,flat,eval,edits}, incr, lambda, lambda/ast, loom, pretty, seam`.
  - `echo → echo/tokenizer, moonbitlang/core/math`.
  - Root `./moon.pkg` → `canopy/{editor,core,projection,protocol,relay}`.

## Interpretations

Cautious, not confirmed beyond the sample above:

- **The canopy module is a multi-package mega-module** (~27 `moon.pkg`). Whether this is a *problem* is contextual: it's a supported MoonBit convention, it works today, but it ties release/publish/visibility to one module boundary. The downside is visibility leakage (every internal package is `dowdiness/canopy/...` and can be reached by every other), not compilation — MoonBit already compiles packages independently within a module.
- **There is no single "graph root" in canopy.** Stage 0 confirms bases (packages that import no `dowdiness/canopy/*`) are exactly: `core`, `llm`, `relay`, `lang/lambda/eval`, `echo/tokenizer`. `core` is one of five, not the only one.
- **App/editor and lang layers are entangled, not stacked.** `lang/*/companion` imports `editor` — so `lang/*` can't be cleanly lifted below `editor`. Only the lower lang sublayers (`proj/`, `edits/`, `eval/`, `flat/`) look independent enough to split.
- **Submodules are independently released** (tags: `alga@v0.2.0`, `svg-dsl@v0.1.0`, `graphviz@v0.1.0`, `incr@v0.5.0` from this session) **but not independently located** — four of them path-dep back into the parent repo's `lib/*`. Treating them as cleanly external is wrong.
- **`loom` is a multi-module mini-workspace** (10 members, its own `CLAUDE.md` says "monorepo, no root moon.mod.json"). Bringing it into canopy's workspace would flatten two levels of boundary.
- **Test-scope imports are first-class.** Several packages only import other canopy/lang/lambda packages under `for "test"` or `for "wbtest"`. Any dependency-direction rule must distinguish normal/test/wbtest scopes — grep alone will over-report violations.
- **Examples-as-modules are likely stale risk.** `ci.yml` does not PR-gate `examples/{ideal,block-editor,canvas}`; they run in Cloudflare deploy on `main` / manual only. (Codex confirmed this on 2026-04-22.)

## Recommended classification

| Category | Directories |
|---|---|
| **Main application module (multi-package, ~27 packages)** | root (`dowdiness/canopy`), containing `core/`, `editor/`, `projection/`, `protocol/`, `relay/`, `llm/`, `echo/`, `cmd/main/`, `lang/*/**`, `ffi/*` |
| **In-repo reusable libraries (own `moon.mod.json`)** | `lib/btree`, `lib/text-change`, `lib/semantic` (+ `proof`), `lib/zipper` |
| **Independently released but bidirectionally coupled (git submodules)** | `alga`, `event-graph-walker` (deps into `lib/btree`, `rle`, `order-tree`, `alga`), `graphviz`, `loom/*` (10 members; `loom/loom` deps into `lib/text-change`), `order-tree` (deps into `lib/btree`, `rle`), `rle`, `svg-dsl`, `valtio` (deps into `lib/text-change`) |
| **MoonBit example modules** | `examples/ideal`, `examples/block-editor`, `examples/canvas` (not PR-gated) |
| **Non-MoonBit siblings** | `lib/editor-adapter` (TS), `examples/{demo-react, prosemirror, web, relay-server}` (JS/Node) |
| **Noise (exclude from any workspace decision)** | `_build/`, `_build_test_dir/`, `.mooncakes/`, `.worktrees/`, `.claude/worktrees/`, `node_modules/`, `dist/`, `playwright-report/`, `test-results/`, `.vite/`, `.playwright/` |

## Recommended workspace member set (phase 1)

Narrower than my first proposal. Start with the modules that are (a) authored here, and (b) actually path-dep'd from the root `moon.mod.json` today:

```
moon work init
moon work use .                  # dowdiness/canopy (root)
moon work use lib/text-change    # path-dep'd from root AND from submodules
moon work use lib/zipper         # path-dep'd from root
```

Phase 1 rationale — corrected:

- These are the only `lib/*` modules consumed by the root module today. Adding them makes `moon work sync` scope-appropriate.
- **`lib/btree` is deliberately excluded** from phase 1. Its primary consumers are the submodules (`event-graph-walker`, `order-tree`) — not canopy root. Pulling `lib/btree` into canopy's workspace while `event-graph-walker` (a separate repo) path-deps into it creates a governance split: whose workspace owns `lib/btree`'s version? Defer until the bidirectional coupling is addressed (stages 2–3).
- **`lib/semantic` and `lib/semantic/proof`** have no current consumer in root. Include only if/when a canopy package actually depends on them; don't build a workspace around aspirational members.
- **Do NOT remove the current `cd X && moon test` fanout in `CLAUDE.md` as part of phase 1.** `moon check --target all` at the root will *not* cover the submodules (egw, loom/*) — submodules aren't workspace members and never will be in this plan. Keep the fanout for submodule coverage, add workspace-root commands for lib/* coverage. Document both.

## Should NOT be initial workspace members

- **All 8 git submodules** — independent release cycles confirmed, but note also: they already path-dep back into `lib/*`. Making them workspace members would create circular ownership (canopy workspace includes lib/btree which is consumed by submodule egw which is also a workspace member — workspace sync semantics here are undefined).
- **`lib/editor-adapter`** — TypeScript.
- **`examples/{demo-react, prosemirror, web, relay-server}`** — not MoonBit.
- **`examples/{ideal, block-editor, canvas}`** — defer to phase 3. Adding them compiles demo code on every root check.
- **`lib/btree`, `lib/semantic`, `lib/semantic/proof`** — defer; see phase-1 rationale.

## Recommended dependency rules

Scoping: rules apply to **normal imports only** unless noted. `for "test"` and `for "wbtest"` scopes are exempt unless they are currently forbidden for product reasons. Any checker must parse the scope header, not match on strings.

Allowed (grounded in the verified imports in Facts):

- `canopy/*` (internal) → `lib/*` → `moonbitlang/*` / submodule modules.
- `canopy/cmd/main` → `canopy/editor` + parser libs (current state).
- `canopy/ffi/*` → `canopy/{editor, lang/*, llm, relay}` + parser libs (current state — ffi is a thick integration layer, not a thin boundary).
- `canopy/lang/*/companion` → `canopy/{editor, protocol, core}` + lower `lang/*/{proj,edits,eval,flat}` (current state).
- `examples/*` → `canopy/*` (including `canopy/ffi/*`) + `lib/*` + submodules.
- Submodules path-dep into `lib/*`; `lib/*` does **not** path-dep into submodules.

Forbidden (aspirational — some require cleanup to hold today):

- `lib/*` **must not** import `dowdiness/canopy/*` (aspirational: verified-candidate, needs a full scan to confirm no violations already exist).
- `lib/*` **must not** import `examples/*`.
- Submodules **must not** path-dep into `dowdiness/canopy/*` (only into `lib/*` or each other).
- No cycles among submodules path-dep'ing into each other + the parent's `lib/*`. (Currently clean, but fragile: if `lib/text-change` grew a dep on `loom/loom`, a cycle forms instantly.)
- `core` must not import any higher-layer canopy package. Verify with full scan before enforcing.

Rules explicitly **withdrawn** from the first draft because they contradict current code:

- ~~"`ffi/*` must not be imported by anything other than `cmd/main`"~~ — false. `examples/ideal` imports `canopy/ffi/lambda`; web demos consume compiled `ffi/*` artifacts.
- ~~"`cmd/main` → `ffi/*` → `editor`"~~ — false. `cmd/main` imports `editor` directly, not via `ffi`.
- ~~"`projection` must not import `lang/*`"~~ — `projection` imports `lang/lambda/proj` under test/wbtest scope. Rule would need scope exemption.

Enforcement: add `scripts/check-deps.sh` that parses every `moon.pkg` *with scope awareness* (`import { … } for "test"`). Grep-based enforcement is insufficient.

## Risks in the current structure

1. **Bidirectional submodule ↔ parent coupling** (new risk, was missed in first draft). Four submodules path-dep into `lib/{btree,text-change}`. This means:
   - Submodules cannot be checked out / built in isolation from this parent repo without supplying `lib/*` out-of-band.
   - Any `lib/btree` or `lib/text-change` API change propagates to submodule CI.
   - If you ever promote `lib/btree` to mooncakes, the submodules need to switch from path-dep to registry-dep before a release skew becomes painful.
2. **Loom path-dep fan-out.** Root has **9** path-deps into `loom/*`. A single loom pointer bump can move 9 declared deps simultaneously. Risk is highest for `loom/examples/*` — shipping canopy against an external repo's *example* trees is an unusual contract to maintain.
3. **Mega-module visibility surface.** Every internal canopy package is reachable as `dowdiness/canopy/<path>` by every other package. This isn't a compile-time problem, but it makes "internal vs public" invisible to tooling — nothing stops a new `lib/*` from importing `dowdiness/canopy/core` once the coupling rules lapse.
4. **No workspace → no `moon -C <member> <cmd>` ergonomics.** Path-deps already support cross-module checking locally; the workspace benefit is *command ergonomics* (one place to run `moon test --target all` over canopy + lib/text-change + lib/zipper) and *version alignment for registry-released members*. It is not a prerequisite for catching cross-module breakage — that's already caught by the current fanout, though more slowly.
5. **Examples not PR-gated.** `ci.yml` doesn't build `examples/{ideal,block-editor,canvas}` on PRs. Rot is plausible. Cloudflare deploys catch it on `main` only.
6. **`lib/editor-adapter` miscategorized.** TypeScript lives in `lib/` as if it were a MoonBit lib. Category confusion for contributors.
7. **Duplicate path-deps at every consumer.** Several modules declare their own `{ "path": "../../..." }` into the same target (e.g., both `valtio` and `loom/loom` into `lib/text-change`). No tool currently verifies these paths resolve consistently.
8. **Intra-canopy DAG unverified.** The sample of imports checked so far is consistent with "`core` is a base", but not with "core is the only base". `llm`, `relay`, `echo/tokenizer`, `lang/lambda/eval` also look like bases. Before codifying forbidden imports among canopy packages, a full `moon.pkg` scan with scope awareness is mandatory.

## Migration plan

Staged, each stage = its own PR, repo stays green.

### Stage 0 — observe (done 2026-04-22)

- ✅ Wrote `scripts/dump-deps.sh` (scope-aware Python parser of `moon.pkg` + `moon.mod.json`).
- ✅ Committed output at `docs/architecture/dep-graph-2026-04-22.txt` (580 lines, 482 package edges, 62 module edges).
- ✅ Confirmed: `lib/*` does not import `dowdiness/canopy/*` in any scope; no `moon.pkg`-level cycles detected.
- ✅ Falsified prior assumption: `lib/*` is not cleanly at the bottom (`lib/btree → rle`, `lib/semantic → loom/examples/markdown`).
- ✅ Catalogued `lang/*/companion → editor` edges (all three companions depend on editor; see Stage 0 findings above).

See "Stage 0 findings" section above for details.

### Stage 1 — introduce `moon.work` (done 2026-04-22 in follow-up PR)

- ✅ Recreated `moon.work` with 4 members: `./`, `./lib/text-change`, `./lib/zipper`, `./lib/btree`.
- ✅ `moon work sync` added explicit `version` pins on every path-dep in root `moon.mod.json` (13 deps) and `lib/btree/moon.mod.json` (1 dep).
- ✅ Rewrote all 14 hard-coded JS-artifact-path consumers: `scripts/build-js.sh`, `scripts/package-release.sh`, `.github/workflows/ci.yml`, `examples/web/{vite.config.ts,vite-plugin-moonbit.ts,tsconfig.json}`, `examples/demo-react/{vite.config.ts,vitest.config.ts,tsconfig.json}`, `examples/prosemirror/{vite.config.ts,tsconfig.json}`, `examples/relay-server/{src/index.ts,tsconfig.json}`, `docs/development/JS_INTEGRATION.md`.
- ✅ Verified: `moon check`, `moon test` (1029 passed), `moon fmt`, `make build-js`, `npx tsc --noEmit` in `examples/web` and `examples/prosemirror` (prosemirror down from 28 → 27 pre-existing errors).
- ✅ Updated `AGENTS.md` to describe workspace commands and submodule/example fanout distinction.

Stages 2, 3 (non-workspace parts), and 5 landed earlier in PR #210.

**Follow-up PR execution checklist:**

1. Recreate `moon.work` with `./`, `./lib/text-change`, `./lib/zipper`, `./lib/btree` (4 members).
2. Run `moon work sync` — expect version-pinning diffs in `moon.mod.json` + `lib/btree/moon.mod.json` (same as before; keep them).
3. Update build-artifact path `_build/js/release/build/ffi/...` → `_build/js/release/build/dowdiness/canopy/ffi/...` in:
   - `scripts/build-js.sh` (4 artifact paths)
   - `scripts/package-release.sh`
   - `.github/workflows/ci.yml` → `build-js` job's `upload-artifact` path list (lambda.js/d.ts, json.js/d.ts, markdown.js/d.ts, moonbit.d.ts triples)
   - `examples/web/vite-plugin-moonbit.ts`, `examples/web/vite.config.ts`, `examples/web/tsconfig.json`
   - `examples/demo-react/vite.config.ts`, `examples/demo-react/vitest.config.ts`, `examples/demo-react/tsconfig.json`
   - `examples/prosemirror/vite.config.ts`, `examples/prosemirror/tsconfig.json`
   - `examples/relay-server/src/index.ts` (runtime dynamic import), `examples/relay-server/tsconfig.json`
   - `docs/development/JS_INTEGRATION.md` (doc example)
4. `npm ci` + `npx tsc --noEmit` in `examples/web` and `examples/prosemirror` to verify TS paths resolve BEFORE pushing.
5. Run `make build-js`, `make build-web`, `make test-web-e2e`, `make test-demo-react-e2e` locally.
6. `moon check`, `moon test`, `moon fmt` from workspace root — expect test count ~1029.
7. Update `AGENTS.md` to describe workspace commands (reinstate the workspace-members block that was reverted in the `defer moon.work` commit).
8. Push, verify all CI jobs that consume the artifact path pass.

### Stage 2 — write and enforce the dependency rules (done 2026-04-22)

- ✅ Wrote `scripts/check-deps.sh` (scope-aware, exits non-zero on violations).
- ✅ Rules enforced: [A] lib→canopy, [B] lib→example, [C] submodule→canopy, [D] submodule→example, [E] submodule module-level path-dep into canopy.
- ✅ Report-mode cycle was implicit: Stage 0 already confirmed all five rules hold. No fixes needed.
- ✅ Self-test: synthetic violation (lib/text-change import of canopy/core) correctly produced `[A]` violation and exit 1.
- ✅ Wired into CI as `dep-check` job; added to `all-checks-passed` gate.
- Skipped: cycle detection among known couplings (drift tracking) — future enhancement; dep-graph.txt serves as current baseline.

### Stage 3 — decide on examples + lib/btree handling (done 2026-04-22, minus workspace parts)

- ✅ `examples/{ideal, block-editor, canvas}`: audited. Found `examples/ideal` broken by stale rename (`antisatori/graphviz` → `dowdiness/graphviz` never propagated after graphviz submodule rename). Fixed mechanically (12 tests pass). Added new `test-examples` matrix job in `.github/workflows/ci.yml` gating all three.
- ✅ `lib/btree` format drift caught and fixed. When `lib/btree` was briefly added to the workspace during Stage 1, `moon fmt --check` revealed pre-existing canonical-format drift in 4 files (`btree_wbtest.mbt`, `walker_propagate.mbt`, `walker_range_delete.mbt`, `walker_repair.mbt`). Ran `moon fmt` to reformat; keeping the fixes even though the workspace was reverted — they are canonical moon fmt output.
- ⏸️ `lib/btree` workspace membership: deferred with Stage 1.
- ✅ `lib/semantic` stays out (cross-dep into `loom/examples/markdown` yellow flag persists).
- Example modules are **not** workspace members — gated via per-module CI matrix instead, consistent with the submodule pattern.

### Stage 4 — narrow splits in `lang/*` (only if warranted)

- Do **not** wholesale-promote `lang/{json, lambda, markdown}` to standalone modules — `companion/` imports `editor`, so they can't live below the editor layer without a larger refactor.
- Valid narrow split candidates (each becomes its own `moon.mod.json`):
  - `lang/lambda/proj`, `lang/lambda/edits`, `lang/lambda/eval`, `lang/lambda/flat` (base layer, no editor dep in sample).
  - `lang/json/proj`, `lang/json/edits`.
  - `lang/markdown/proj`, `lang/markdown/edits`.
- `companion/` stays inside the canopy module (it's app-tier).
- Each split: introduce `moon.mod.json`, add to `moon.work`, path-dep from canopy root, `moon check --target all`.

### Stage 5 — clarify `lib/editor-adapter` (done 2026-04-22)

- ✅ Moved `lib/editor-adapter/` → `adapters/editor-adapter/` via `git mv` (history preserved).
- ✅ Updated 6 TypeScript consumers in `examples/{prosemirror,web}/...` (pure path rewrite, same depth).
- ✅ Updated `docs/development/ADDING_A_LANGUAGE.md`.
- Historical plan docs (2026-04-01, 2026-04-18) kept unchanged — they describe the state at that time.
- `lib/` now contains only MoonBit modules: `btree`, `text-change`, `semantic`, `zipper` (+ `semantic/proof`). Category confusion resolved.

### Stage 6 (optional) — reduce submodule coupling

- For each submodule that path-deps into `lib/*`, decide: (a) publish `lib/*` to mooncakes and migrate, (b) absorb the submodule back into the canopy repo as a workspace member, or (c) accept the coupling. Not urgent; only do this when independence is actually valuable.

## Optional target layout

If stages 1–5 happen:

```
canopy/
  moon.work                      # ./ + lib/text-change + lib/zipper initially
  moon.mod.json                  # dowdiness/canopy (app-tier module)
  moon.pkg                       # root aggregator package
  core/ editor/ projection/ protocol/ relay/ llm/ cmd/ ffi/
  lang/
    lambda/ json/ markdown/      # each has companion/ (app-tier) inside canopy
                                 # and proj/, edits/, eval/, flat/ possibly lifted out
                                 # as sibling dirs in stage 4

  lib/                           # MoonBit-only reusable libs
    btree/      (moon.mod.json)  # governance decided in stage 3
    text-change/(moon.mod.json)  # workspace member (stage 1)
    semantic/   (moon.mod.json)  # joins workspace when consumed
    zipper/     (moon.mod.json)  # workspace member (stage 1)

  adapters/                      # stage 5: editor-adapter moved here
    editor-adapter/              # TypeScript — not a workspace member

  echo/                          # (candidate to become its own module — low priority)

  examples/
    ideal/ block-editor/ canvas/ # MoonBit modules; CI gating decided in stage 3
    web/ demo-react/ prosemirror/ relay-server/   # JS/Node demos

  # Git submodules — unchanged, NOT workspace members:
  alga/ event-graph-walker/ graphviz/ loom/ order-tree/ rle/ svg-dsl/ valtio/
```

No full rewrite required. Biggest structural change: `lib/editor-adapter` out of `lib/` (stage 5) + narrow `lang/*` lifts (stage 4). Everything else is metadata.

## Sample `moon.work`

After `moon work init` + `moon work use` for the corrected phase-1 set, the file should look like:

```
members = [
  "./",
  "./lib/text-change",
  "./lib/zipper",
]
```

(No `[workspace]` table. Exact syntax: follow whatever `moon work init` emits; the format above matches the MoonBit docs excerpt.)

## What to verify before committing to the rules

1. Run the Stage 0 scope-aware `moon.pkg` dump. Confirm the claims about bases (`core`, `llm`, `relay`, `echo/tokenizer`, `lang/lambda/eval`) and falsify the "core is the only root" assumption.
2. Confirm whether `ci.yml` PR-gates `examples/{ideal,block-editor,canvas}`. Codex says no; a one-line grep confirms.
3. Confirm `lib/editor-adapter`'s TypeScript consumers (grep web/prosemirror/demo-react imports) before moving it.
4. Confirm `moon work sync` behavior: MoonBit docs say it updates member `moon.mod.json` files when one workspace member depends on another with a stale version. It does **not** automatically rewrite `{ "path": "..." }` deps. Don't sell `moon.work` as a cure for the 13 path-deps in root's `moon.mod.json`.
5. Before any Stage 4 split of `lang/*`: re-verify that `proj`, `edits`, `eval`, `flat` genuinely have no upward imports in *any* scope (including test/wbtest).
