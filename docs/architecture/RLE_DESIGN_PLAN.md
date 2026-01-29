# RLE Design Plan (Runs + Rle)

## Goals
- Provide reusable run-length encoding (RLE) primitives for CRDT/text features.
- Support trait-based run payloads (text runs, op spans, tombstones).
- Keep invariants explicit: no runs with `causal_len() == 0`, no adjacent mergeable runs.
- Use half-open `[start, end)` intervals consistently.

## Non-Goals
- No change to external network or storage formats in this phase.
- No immediate replacement of all text storage with RLE.

## Tombstone Semantics

Tombstones are deleted elements that remain in the CRDT for causality tracking.

**Invariants:**
- Tombstones have `causal_len > 0` but `visible_len == 0`.
- `can_merge` should return `false` when mixing tombstones with live content.
- `merge` preserves tombstone status: merging two tombstones yields a tombstone.
- `visible_len(merge(a, b)) == visible_len(a) + visible_len(b)` when mergeable.

**Example:**
```moonbit
struct TextSpan {
  text : String
  deleted : Bool
}

impl Mergeable for TextSpan with can_merge(a, b) {
  a.deleted == b.deleted
}

impl HasLength for TextSpan with length(self) {
  self.text.length()
}

impl HasCausalLength for TextSpan with visible_len(self) {
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
├── traits.mbt                # Mergeable, Sliceable, HasLength, HasCausalLength
├── slice.mbt                 # Slice[T] type
├── run_pos.mbt               # RunPos type (run index + offset)
├── prefix_sums.mbt           # PrefixSums for causal/visible
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
/// **HasLength** - "Plain size"
///
/// Basic, non-CRDT length for a value.
pub(open) trait HasLength {
  length(Self) -> Int
}

///|
/// **HasCausalLength** - "CRDT position space"
///
/// Two different notions of "length" matter for CRDTs:
///
/// - `causal_len`: The causal/structural length including tombstones.
///   This represents the position space for causal ordering.
///   Always positive, even for deleted content.
///   Think: "how many slots does this occupy in the causal sequence?"
///
/// - `visible_len`: The visible length excluding tombstones.
///   This is what users see and interact with.
///   Zero for tombstones, positive otherwise.
///   Think: "how many characters would the user see?"
pub(open) trait HasCausalLength {
  causal_len(Self) -> Int = _
  visible_len(Self) -> Int
}
```

**Trait Laws (algebraic properties):**
- `causal_len(merge(a, b)) == causal_len(a) + causal_len(b)`
- `visible_len(merge(a, b)) == visible_len(a) + visible_len(b)` when mergeable
- `slice(x, start=0, end=causal_len(x)) == x`
- `visible_len(x) <= causal_len(x)` and both are non-negative

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
- No runs with `causal_len() == 0`
- No adjacent runs where `can_merge` is true

**Key operations:**
- `Runs::append` merges with last run when possible.
- `Runs::find` (linear) and `Runs::find_fast` (binary with `PrefixSums`).
- `Runs::range` and `Runs::range_clamped` return `Slice[T]` views.
- `Runs::split` returns `(left, right)` using `Sliceable`.
- `Runs::concat` and `Runs::extend` handle boundary merges.

```moonbit
///|
pub fn[T : Mergeable + HasCausalLength] Runs::append(
  self : Runs[T],
  elem : T,
) -> Result[Unit, RleError]

///|
pub fn[T : HasCausalLength] Runs::find(self : Runs[T], pos : Int) -> RunPos?

///|
pub fn[T : HasCausalLength] Runs::range(
  self : Runs[T],
  start~ : Int,
  end~ : Int,
) -> Result[Iter[Slice[T]], RleError]

///|
pub fn[T : Sliceable + HasCausalLength + Mergeable] Runs::split(
  self : Runs[T],
  pos : Int,
) -> Result[(Runs[T], Runs[T]), RleError]
```

## Rle: Cached Wrapper

`Rle[T]` wraps `Runs[T]` with lazy `PrefixSums` for fast indexed access.
All mutations invalidate the cache.

**Why trait bounds are on methods, not the struct:**

`Rle[T]` is generic with no trait bounds on the struct itself. Bounds are
declared per-method based on what each operation actually requires. This is
deliberate:

- `Runs[T]` is the plain RLE container — no bounds needed.
- `Rle[T]` adds prefix sum caching (requires `HasCausalLength`) and version
  tracking. The `prefix: PrefixSums?` field cannot be populated without
  `HasCausalLength`, so `Rle` without that bound is effectively just `Runs`
  with unused fields.
- Despite this, we keep the struct unconstrained because the concrete element
  type `T` will evolve. Currently only `String` is used, but future phases
  will introduce multiple data representations (lists, trees) likely via an
  enum. All of these will implement the CRDT traits (`Mergeable`,
  `HasCausalLength`, `Sliceable`), so the bound would always be satisfied —
  but we avoid premature coupling to a specific trait set.
- Method-level bounds give graduated constraints: read-only operations need
  only `HasCausalLength`, mutations add `Mergeable`, and `split` requires all
  three. This lets callers depend on exactly the capabilities they use.
- If all future concrete types always satisfy the same set of bounds, that is
  the signal to promote them to struct-level bounds.

**Key operations:**
- `Rle::len()` and `Rle::visible_len()` are O(1) after cache rebuild.
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
pub fn[T : Mergeable + HasCausalLength] Rle::append(
  self : Rle[T],
  elem : T,
) -> Result[Unit, RleError]

///|
pub fn[T : HasCausalLength] Rle::find(self : Rle[T], pos : Int) -> RunPos?
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
pub impl HasLength for String with length(self) { self.length() }
pub impl HasCausalLength for String with visible_len(self) { self.length() }
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
| `visible_len()` | O(n) | O(1)* | *after cache rebuild |
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

### Phase 3 (done)
- `Runs::from_array_batch` - single-pass stack merge avoiding `normalize_tail` cascades.
- Versioned cursors via `Rle.version` counter and `RleCursor.is_stale()`.
- Stale cursors return safe defaults (None/false/empty) on all operations.

### Phase 4 (done)
- Batch `concat`/`extend` optimization - uses stack-merge approach avoiding
  repeated `normalize_tail` calls. Early exit for empty inputs.
- Bug fixes from oracle review:
  - `concat` now delegates to `from_array_batch` when self is empty (eliminates code duplication)
  - `Rle::extend` tracks mutation via count comparison before bumping version
- Note: `concat` always copies to preserve pure semantics (no aliasing)
- Chunked or rope-like RLE for large documents (deferred until profiling shows need).

### Phase 5 (documentation)
**Goal:** Clarify trait semantics and package boundaries.

RLE is a **compression + query** package, not an editing package:
- ✅ Append-only construction (append, extend, concat)
- ✅ Fast queries (find, range, prefix sums)
- ✅ Read-only traversal (RleCursor)
- ❌ NOT editing operations (insert/delete belong in domain modules)

**Trait semantics:**

| Trait | Question it answers | RLE uses it for |
|-------|---------------------|-----------------|
| `Mergeable` | Can adjacent items combine? | Compression invariant |
| `Sliceable` | Can we extract a sub-range? | Split, range queries |
| `HasLength` | What is the basic size? | Foundation trait |
| `HasCausalLength` | Position space vs visible content? | Dual prefix sums |

**Why `HasCausalLength` belongs in RLE:**
- RLE must track positions for find/range operations
- Some runs have different "structural" vs "visible" lengths (e.g., tombstones)
- Prefix sums track both `atoms` (causal) and `content` (visible)
- This is a generic RLE concern, not CRDT-specific

**Package boundaries:**
- `rle/` - compression, queries, traversal
- `oplog/` - owns `Op`, `OpSpan` types (may use RLE internally)
- `text/` - owns `TextView`, text rendering, `TextSpan` (uses RLE for output)
- `fugue/` - owns CRDT merge semantics

### Phase 5 Implementation (done)
**TextSpan integration** - domain-specific RLE usage in `text/` package.

Added `text/span.mbt`:
```moonbit
pub struct TextSpan {
  text : String
  deleted : Bool  // tombstone tracking
}

impl Mergeable for TextSpan    // merge if same deleted status
impl HasLength for TextSpan    // character count
impl HasCausalLength for TextSpan  // visible_len = 0 for tombstones
impl Sliceable for TextSpan    // preserves deleted status
```

Added `TextView::to_spans() -> Runs[TextSpan]`:
- Returns all items (including tombstones) in tree order
- Adjacent spans with same deleted status are merged
- Enables `causal_len` vs `visible_len` queries on output

Supporting changes:
- `FugueTree::get_all_items()` - traversal including tombstones
- `Branch::inner_tree()` - accessor for advanced operations

## Open Questions

1. ~~Cursor invalidation strategy: versioning vs doc-only contract.~~
   **RESOLVED:** Versioning implemented in Phase 3 (`Rle.version` counter, `RleCursor.is_stale()`).
2. Best chunk size if chunked RLE is introduced.
   **DEFERRED:** Until profiling shows need for chunked/rope-like structures.
3. ~~Batch normalize API for large append workloads.~~
   **RESOLVED:** `from_array_batch`, `concat`, and `extend` use stack-merge approach, avoiding repeated `normalize_tail` calls.
