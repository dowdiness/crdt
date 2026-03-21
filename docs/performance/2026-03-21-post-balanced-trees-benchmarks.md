# Post Balanced Trees Benchmark Results

**Date:** 2026-03-21
**Branch:** `feature/size-threshold-reuse-skip` (loom PR #42 merged)
**Runner:** `moon bench --release` on WSL2 Linux 6.6.87.2
**Changes:** Size-threshold reuse skip + balanced RepeatGroup trees

---

## Summary

Incremental parsing is now **faster than batch** for realistic typing sessions (50-edit). Single edits improved from 2.1x slower to 1.1x of batch. The imperative incremental parser at 80 defs is now **2.3x faster than reactive full reparse** (109µs vs 255µs).

---

## Projection Pipeline (end-to-end keystroke latency)

| Scenario | Pre-optimization | Post-optimization | Speedup | % of 16ms budget |
|----------|-----------------|-------------------|---------|-------------------|
| Incremental keystroke (20 defs) | 6.86 ms | **1.22 ms** | 5.6x | 8% |
| Incremental keystroke (80 defs) | 85.45 ms | **2.01 ms** | 43x | 13% |

### Parser (via editor benchmarks)

| Benchmark | Pre-optimization | Post-optimization | Change |
|-----------|-----------------|-------------------|--------|
| Reactive full reparse medium (80 defs) | 261.65 µs | 255.01 µs | ~same |
| Imperative incremental medium (80 defs) | 235.89 µs | **108.75 µs** | **2.2x faster** |
| Reactive full reparse large (320 defs) | 997.67 µs | 1.04 ms | ~same |
| Imperative incremental large (320 defs) | 1.00 ms | **451.10 µs** | **2.2x faster** |

### Tree Refresh (unchanged from pre-optimization)

| Scenario | Now |
|----------|-----|
| Unchanged (20 defs) | 4.43 µs |
| Unchanged (80 defs) | 16.02 µs |
| Unchanged (320 defs) | 71.22 µs |
| Unchanged (1000 defs) | 269.80 µs |
| 1 changed (20 defs) | 7.55 µs |
| 1 changed (80 defs) | 28.75 µs |
| 1 changed (320 defs) | 131.66 µs |
| 1 changed (1000 defs) | 434.76 µs |

---

## Let-Chain Benchmarks (incremental parser detail)

### Single edit

| Benchmark | Original | Now | Ratio vs batch |
|-----------|----------|-----|----------------|
| 80 lets — edit-only | 315 µs | **170.76 µs** | 1.13x batch |
| 320 lets — edit-only | 1.37 ms | **757.41 µs** | 1.13x batch |
| 80 lets — full reparse | 147 µs | 150.96 µs | — |
| 320 lets — full reparse | 623 µs | 672.54 µs | — |

### 50-edit session (realistic typing)

| Benchmark | Original | Now | Result |
|-----------|----------|-----|--------|
| 80 lets — incremental | 10.21 ms | **6.17 ms** | **1.38x faster than batch** |
| 80 lets — full reparse | 8.14 ms | 8.54 ms | — |
| 320 lets — incremental | 43.49 ms | **26.89 ms** | **1.25x faster than batch** |
| 320 lets — full reparse | 34.57 ms | 33.49 ms | — |

### Deep tree (regression guard)

| Benchmark | Now |
|-----------|-----|
| 20 lambda lets — edit-only | 179.17 µs |
| 20 lambda lets — full reparse | 148.43 µs |
| 20 lambda lets — ratio | 1.21x (no regression) |

---

## Key Improvements vs Pre-Optimization Baseline

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| 80 defs single edit | 2.1x slower than batch | **1.13x batch** | Fixed |
| 320 defs single edit | 2.2x slower than batch | **1.13x batch** | Fixed |
| 80 defs 50-edit session | 1.3x slower than batch | **1.38x faster** | Inverted |
| 320 defs 50-edit session | 1.3x slower than batch | **1.25x faster** | Inverted |
| Imperative incremental (80 defs) | 236 µs | **109 µs** | 2.2x faster |
| Full pipeline keystroke (80 defs) | 2.32 ms | **2.01 ms** | 13% of budget |

---

## What Changed

1. **Size-threshold reuse skip** — nodes below 64 bytes skip the reuse protocol (`LanguageSpec.reuse_size_threshold`)
2. **Balanced RepeatGroup trees** — `build_tree` auto-groups >8 consecutive same-kind siblings into balanced binary trees
3. **SyntaxNode transparent flattening** — all iteration methods unwrap RepeatGroup nodes
4. **RepeatGroup subtree reuse** — `ReuseCursor::try_reuse_repeat_group()` enables O(log n) reuse of undamaged groups
5. **Grammar integration** — lambda grammar calls `try_reuse_repeat_group()` in LetDef loop
