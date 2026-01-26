# RLE Design Plan (Runs + Rle)

## Goals
- Provide reusable run-length encoding (RLE) primitives for CRDT/text features.
- Support trait-based run payloads (text runs, op spans, tombstones).
- Keep invariants explicit: no runs with `atom_len() == 0`, no adjacent mergeable runs.
- Use half-open `[start, end)` intervals consistently.

## Non-Goals
- No change to external network or storage formats in this phase.
- No immediate replacement of all text storage with RLE.

## Tombstone Semantics

Tombstones are deleted elements that remain in the CRDT for causality tracking.

**Invariants:**
- Tombstones have `atom_len > 0` but `content_len == 0`.
- `can_merge` should return `false` when mixing tombstones with live content.
- `merge` preserves tombstone status: merging two tombstones yields a tombstone.
- `content_len(merge(a, b)) == content_len(a) + content_len(b)` when mergeable.

**Example:**
```moonbit
struct TextSpan {
  text : String
  deleted : Bool
}

impl Mergeable for TextSpan with can_merge(a, b) {
  a.deleted == b.deleted
}

impl HasLength for TextSpan with content_len(self) {
  if self.deleted { 0 } else { self.text.length() }
}
```

## Design Overview

The package provides two core layers:
- `Runs[T]`: the core run container (array of runs) with merge-on-append and
  strict invariants. All operations are O(n) without extra indexing.
- `Rle[T]`: a wrapper over `Runs[T]` with lazy `PrefixSums` caching for O(log n)
  find and O(1) total length queries. All mutating operations invalidate caches.

This keeps the core structure simple while enabling fast indexed access when
needed.

## Package and File Layout
```
event-graph-walker/rle/
├── moon.pkg.json
├── errors.mbt                # RleError, InternalError, RangeIssue
├── traits.mbt                # Mergeable, Sliceable, HasLength traits
├── slice.mbt                 # Slice[T] type
├── run_pos.mbt               # RunPos type (run index + offset)
├── prefix_sums.mbt           # PrefixSums for atoms/content
├── runs.mbt                  # Runs[T] core container
├── runs_string.mbt           # String trait impls + helpers
├── rle.mbt                   # Rle[T] cached wrapper
├── rle_cursor.mbt            # RleCursor for sequential traversal
├── arbitrary.mbt             # QuickCheck Arbitrary helpers
├── rle_test.mbt
├── runs_test.mbt
├── runs_wbtest.mbt
├── runs_properties_test.mbt
└── rle_benchmark.mbt
```

### moon.pkg.json
```json
{
  "import": [
    "moonbitlang/core/bench",
    "moonbitlang/core/quickcheck",
    { "path": "moonbitlang/quickcheck", "alias": "qc" }
  ]
}
```

## Core Traits

```moonbit
///|
pub(open) trait Mergeable {
  can_merge(Self, Self) -> Bool
  merge(Self, Self) -> Self
}

///|
pub(open) trait Sliceable {
  slice(Self, start~ : Int, end~ : Int) -> Self
}

///|
pub(open) trait HasLength {
  atom_len(Self) -> Int
  content_len(Self) -> Int
}
```

**Trait Laws (algebraic properties):**
- `atom_len(merge(a, b)) == atom_len(a) + atom_len(b)`
- `content_len(merge(a, b)) == content_len(a) + content_len(b)` when mergeable
- `slice(x, start=0, end=atom_len(x)) == x`
- `content_len(x) <= atom_len(x)` and both are non-negative

## Supporting Types

```moonbit
///|
pub struct Slice[T] {
  value : T
  start : Int
  end : Int
} derive(Show, Eq)

///|
pub(all) struct RunPos {
  run : Int
  offset : Int
} derive(Show, Eq)

///|
pub(all) struct PrefixSums {
  atoms : Array[Int]
  content : Array[Int]
} derive(Show, Eq)
```

## Error Types

```moonbit
///|
pub(all) suberror InternalError {
  EmptyElement
  InvalidState(detail~ : String)
} derive(Show)

///|
pub enum RangeIssue {
  NegativeStart
  NegativeEnd
  StartAfterEnd
  ExceedsLength
} derive(Show, Eq)

///|
pub(all) suberror RleError {
  PositionOutOfBounds(position~ : Int, length~ : Int)
  InvalidRange(start~ : Int, end~ : Int, length~ : Int, reason~ : RangeIssue)
  Internal(InternalError)
} derive(Show)
```

## Runs: Core Container

`Runs[T]` is the core structure that enforces RLE invariants.

**Invariants:**
- No runs with `atom_len() == 0`
- No adjacent runs where `can_merge` is true

**Key operations:**
- `Runs::append` merges with last run when possible.
- `Runs::find` (linear) and `Runs::find_fast` (binary with `PrefixSums`).
- `Runs::range` and `Runs::range_clamped` return `Slice[T]` views.
- `Runs::split` returns `(left, right)` using `Sliceable`.
- `Runs::concat` and `Runs::extend` handle boundary merges.

```moonbit
///|
pub fn[T : Mergeable + HasLength] Runs::append(
  self : Runs[T],
  elem : T,
) -> Result[Unit, RleError]

///|
pub fn[T : HasLength] Runs::find(self : Runs[T], pos : Int) -> RunPos?

///|
pub fn[T : HasLength] Runs::range(
  self : Runs[T],
  start~ : Int,
  end~ : Int,
) -> Result[Iter[Slice[T]], RleError]

///|
pub fn[T : Sliceable + HasLength + Mergeable] Runs::split(
  self : Runs[T],
  pos : Int,
) -> Result[(Runs[T], Runs[T]), RleError]
```

## Rle: Cached Wrapper

`Rle[T]` wraps `Runs[T]` with lazy `PrefixSums` for fast indexed access.
All mutations invalidate the cache.

**Key operations:**
- `Rle::len()` and `Rle::content_len()` are O(1) after cache rebuild.
- `Rle::find()` uses `Runs::find_fast` with prefix sums (O(log n)).
- `Rle::range()` uses prefix sums for the starting run; still linear in runs
  over the sliced span.

```moonbit
///|
pub struct Rle[T] {
  runs : Runs[T]
  mut prefix : PrefixSums?
} derive(Show, Eq)

///|
pub fn[T : Mergeable + HasLength] Rle::append(
  self : Rle[T],
  elem : T,
) -> Result[Unit, RleError]

///|
pub fn[T : HasLength] Rle::find(self : Rle[T], pos : Int) -> RunPos?
```

## Algorithms (Current)

### Append with normalization
`Runs::append` merges with the tail, then cascades leftward if needed. This
handles types where mergeability depends on the merged state.

### find_fast
`Runs::find_fast` uses `PrefixSums.atoms` to locate a run in O(log n) time.

### range/range_clamped
`Runs::range` validates bounds and yields `Slice[T]`. `range_clamped` clamps
to `[0, len]` and returns empty iterators for invalid or empty ranges.

## String Adapter

`String` is used as the default run type for text:
```moonbit
pub impl Mergeable for String with can_merge(_a, _b) { true }
pub impl Mergeable for String with merge(a, b) { a + b }
pub impl HasLength for String with atom_len(self) { self.length() }
pub impl HasLength for String with content_len(self) { self.length() }
pub impl Sliceable for String with slice(self, start~, end~) {
  self
  .iter()
  .drop(start)
  .take(end - start)
  .fold(init=StringBuilder::new(), fn(sb, c) {
    sb.write_char(c)
    sb
  })
  .to_string()
}
```

Helpers:
- `Runs::from_string`, `Runs::to_string`, `Runs::iter_chars`
- `Rle::from_string`, `Rle::to_string`, `Rle::iter_chars`

## Cursor API

`RleCursor[T]` provides efficient sequential traversal:
- `advance`, `retreat`, `seek`, `seek_start`, `seek_end`
- `current`, `current_item`, `iter_forward`

**Invalidation note:** cursors should be treated as stale after any mutation
to the underlying `Rle`. A versioning check could be added if needed.

## Tests and Benchmarks

Current coverage:
- `runs_test.mbt`, `runs_wbtest.mbt`, `runs_properties_test.mbt`
- `rle_test.mbt`
- `rle_benchmark.mbt`

QuickCheck helpers live in `arbitrary.mbt`.

## Performance Notes

| Operation | Runs | Rle | Notes |
|-----------|------|-----|------|
| `len()` | O(n) | O(1)* | *after cache rebuild |
| `content_len()` | O(n) | O(1)* | *after cache rebuild |
| `find()` | O(n) | O(log n) | binary search on prefix sums |
| `range()` | O(n) | O(k) | k = runs in range |
| `append()` | O(1) avg | O(1) avg | may cascade leftward |

## Roadmap

### Phase 1 (done)
- Core traits and `Runs[T]`.
- String adapter helpers.
- Range validation and split behavior.

### Phase 2 (done)
- `Rle[T]` with cached `PrefixSums`.
- `RleCursor` for sequential access.
- String slicing via `StringBuilder`.

### Phase 3 (planned)
- Batch construction to avoid `normalize_tail` cascades.
- Chunked or rope-like RLE for large documents.
- Optional versioned cursors for mutation safety.

## Open Questions

1. Cursor invalidation strategy: versioning vs doc-only contract.
2. Best chunk size if chunked RLE is introduced.
3. Batch normalize API for large append workloads.
