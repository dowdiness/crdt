# RLE Design Plan (Trait-Based)

## Goals
- Provide a reusable run-length encoding (RLE) core for CRDT/text features.
- Use trait-based run types to allow different payloads (text runs, op spans).
- Preserve existing public APIs; introduce RLE as an internal utility first.
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
- `content_len(merge(a, b)) == content_len(a) + content_len(b)` when `can_merge(a, b)`.

**Example:**
```moonbit
struct TextSpan {
  text : String
  deleted : Bool
}

impl Mergeable for TextSpan with can_merge(a, b) {
  a.deleted == b.deleted  // Only merge same-status spans
}

impl HasLength for TextSpan with content_len(self) {
  if self.deleted { 0 } else { self.text.iter().count() }
}
```

## Design Overview
Implement a new `event-graph-walker/rle` package providing a simple RLE vector
container (`RleVec`) with trait-based extensibility. The initial integration is
read-only adapters for text views, with optional future adoption in
`Document::to_text`.

## Package and File Layout
```
event-graph-walker/rle/
├── moon.pkg.json
├── errors.mbt               # RleError suberror type
├── traits.mbt               # Mergeable, Sliceable, HasLength traits
├── slice.mbt                # Slice[T] type
├── search_result.mbt        # SearchResult type
├── rle_vec.mbt              # RleVec[T] container
├── string_impl.mbt          # String trait implementations
├── rle_vec_test.mbt         # Blackbox tests
├── rle_vec_wbtest.mbt       # Whitebox tests
└── rle_vec_properties_test.mbt  # Property-based tests
```

### moon.pkg.json

```json
{
  "import": [
    "moonbitlang/core/builtin",
    "moonbitlang/core/string"
  ],
  "test-import": [
    "moonbitlang/quickcheck"
  ]
}
```

## Core Traits

Traits defined using MoonBit's trait system:

```moonbit
///|
/// **Mergeable** - "Can two adjacent things become one?"
///
/// Think of it like train cars coupling together. Two runs can merge only if:
/// - They are logically adjacent (e.g., consecutive characters from same author)
/// - Merging preserves meaning (the merged result equals the concatenation)
///
/// Example: "hel" + "lo" → "hello" (same author, consecutive positions)
/// Counter-example: "hello" + "world" from different authors → cannot merge
trait Mergeable {
  can_merge(Self, Self) -> Bool
  merge(Self, Self) -> Self
}

///|
/// **Sliceable** - "Can I cut a piece out of this?"
///
/// Like slicing a loaf of bread. Given a run, extract a sub-range without
/// needing to decompress the entire structure. Essential for RLE efficiency:
/// instead of storing each character separately, we store runs and slice
/// only when we need a specific portion.
///
/// Uses half-open interval [start, end) — start is inclusive, end is exclusive.
/// Example: slice("hello", start=1, end=4) → "ell"
trait Sliceable {
  slice(Self, start~ : Int, end~ : Int) -> Self
}

///|
/// **HasLength** - "How big is this thing?"
///
/// Two different notions of "length" matter for CRDTs:
///
/// - `atom_len`: The structural size used for indexing and slicing.
///   This is always positive, even for deleted content (tombstones).
///   Think: "how many slots does this occupy in the logical sequence?"
///
/// - `content_len`: The visible size shown to users.
///   Zero for tombstones (deleted content), positive otherwise.
///   Think: "how many characters would the user see?"
///
/// Example: A deleted "hello" has atom_len=5 (still occupies 5 slots for
/// causal ordering) but content_len=0 (user sees nothing).
trait HasLength {
  atom_len(Self) -> Int
  content_len(Self) -> Int
}
```

**Mergeable Contract:**
- `can_merge(a, b) == true` implies `merge(a, b)` is valid and preserves meaning.
- `merge(a, b)` represents `a` followed by `b` (concatenation semantics).
- For span-like types, `can_merge` must encode adjacency/contiguity (e.g., `a.global_end == b.global_start`).
- Algorithms only merge adjacent runs; they never attempt to merge non-adjacent spans.

**Sliceable Contract:**
- `slice(x, start, end)` is defined only for `0 <= start <= end <= atom_len(x)`.
- Invalid ranges are programmer error (panic/abort); all callers must guard.
- For run types with positional metadata (e.g., `HasGlobalIndex`), `slice` must
  update that metadata so the returned run's `global_start` reflects the new
  origin of the slice. Slices must preserve adjacency semantics used by
  `can_merge` and any search logic that depends on global indices.

**Trait Laws (Algebraic Properties):**

These laws should be verified with property-based tests:

| Trait | Property | Law |
|-------|----------|-----|
| `Mergeable` | Length preservation | `atom_len(merge(a, b)) == atom_len(a) + atom_len(b)` |
| `Mergeable` | Content preservation | `content_len(merge(a, b)) == content_len(a) + content_len(b)` when mergeable |
| `Mergeable` | Associativity | `merge(merge(a, b), c) == merge(a, merge(b, c))` |
| `Sliceable` | Content preservation | `slice(x, start=0, end=atom_len(x)) == x` |
| `Sliceable` | Round-trip | `merge(slice(x, end=k), slice(x, start=k)) == x` when mergeable |
| `HasLength` | Non-negative | `atom_len(x) >= 0` and `content_len(x) >= 0` |
| `HasLength` | Content bound | `content_len(x) <= atom_len(x)` |
| `HasLength` | Tombstone monotonicity | `content_len(x) == 0` implies `content_len(slice(x, ...)) == 0` |

**Why tombstone monotonicity matters:**
Tombstones preserve causal structure while hiding content. If slicing a tombstone could yield
nonzero `content_len`, then `total_content_len`, visibility calculations, and derived text views
become inconsistent with deletion semantics. Explicitly requiring monotonicity ensures "once
hidden, always hidden" across slicing, preventing subtle CRDT correctness bugs in range queries
and rendering.

**Composite Constraint:**
Functions requiring full RLE behavior use multiple trait bounds:
```moonbit
fn push[T : Mergeable + HasLength](self : RleVec[T], element : T) -> Result[Unit, RleError]
```

**Notes:**
- MoonBit structs are value types by default; no `Copy` trait needed.
- Use `Default` trait with `T::default()` for zero/empty elements when needed.

## Optional Traits (for op spans)

These are NOT required for basic `RleVec` usage:

```moonbit
///|
trait HasGlobalIndex {
  global_start(Self) -> Int
  // Derived: global_end = global_start + atom_len
  global_end(Self) -> Int
}
```

Used for op-id-based searching in CRDT operation spans.

**HasGlobalIndex Notes:**
- `slice` must keep `global_end = global_start + atom_len` true for sliced runs.
- If `can_merge` depends on `global_start/global_end`, those fields must be
  updated in `slice` so merged runs remain contiguous by index.

**Example: slicing a globally indexed span**
```moonbit
///|
struct OpSpan {
  global_start : Int
  len : Int
} derive(Show, Eq)

///|
impl HasLength for OpSpan with atom_len(self) { self.len }

///|
impl Mergeable for OpSpan with can_merge(a, b) {
  a.global_start + a.len == b.global_start
}

///|
impl Mergeable for OpSpan with merge(a, b) {
  { global_start: a.global_start, len: a.len + b.len }
}

///|
impl Sliceable for OpSpan with slice(self, start~, end~) {
  { global_start: self.global_start + start, len: end - start }
}

///|
impl HasGlobalIndex for OpSpan with global_start(self) { self.global_start }

///|
impl HasGlobalIndex for OpSpan with global_end(self) { self.global_start + self.len }
```

## Error Types

Follow project pattern using `suberror`:

```moonbit
///| RLE error types

///|
pub(all) suberror RleError {
  EmptyElement        // Attempted to push element with atom_len == 0
  IndexOutOfBounds(index~ : Int, len~ : Int)
}
```

## Supporting Types

```moonbit
///|
/// A slice view into a run, representing a sub-range [start, end)
struct Slice[T] {
  value : T
  start : Int
  end : Int
} derive(Show, Eq)

///|
/// Extracts the actual sliced value from this view.
///
/// Returns the portion of `value` from `start` to `end`.
fn to_inner[T : Sliceable](self : Slice[T]) -> T {
  self.value.slice(start=self.start, end=self.end)
}

///|
/// Result of searching for an index in an RleVec
struct SearchResult {
  run_index : Int  // Index into items array
  offset : Int     // Offset within the run
} derive(Show, Eq)
```

## RleVec Container

```moonbit
///|
/// A run-length encoded vector that automatically merges adjacent runs.
pub struct RleVec[T] {
  mut items : Array[T]
} derive(Show, Eq)

///|
/// Creates an empty RleVec.
pub fn RleVec::new[T]() -> RleVec[T] {
  { items: [] }
}

///|
/// Creates an RleVec from an existing array, merging adjacent runs.
/// Skips zero-length elements silently.
pub fn RleVec::from_array[T : Mergeable + HasLength](arr : Array[T]) -> RleVec[T] {
  let vec = RleVec::new()
  for item in arr {
    if T::atom_len(item) > 0 {
      // push only fails on EmptyElement, which we've excluded above
      guard vec.push(item) is Ok(_)
    }
  }
  vec
}

///|
/// Returns true if this RleVec contains no runs.
pub fn is_empty[T](self : RleVec[T]) -> Bool {
  self.items.is_empty()
}

///|
/// Returns the number of runs (not atoms).
pub fn run_count[T](self : RleVec[T]) -> Int {
  self.items.length()
}
```

**Invariants:**
- No runs with `atom_len() == 0` (tombstones with `content_len() == 0` are allowed).
- No adjacent runs where `can_merge` is `true`.
- These invariants are enforced by `push` and checked in whitebox tests.
  - `push` returns `Err(RleError::EmptyElement)` for zero-length runs.
  - `split_at` returns `Err(RleError::IndexOutOfBounds)` for invalid indices.

**Core Operations:**

```moonbit
///|
fn push[T : Mergeable + HasLength](self : RleVec[T], element : T) -> Result[Unit, RleError]

///|
fn search[T : HasLength](self : RleVec[T], index : Int) -> SearchResult?

///|
/// Returns the total atom length (sum of all atom_len).
/// Computed on each call; O(n) where n = run_count.
fn total_atom_len[T : HasLength](self : RleVec[T]) -> Int {
  self.items.fold(init=0, fn(acc, item) { acc + T::atom_len(item) })
}

///|
/// Returns the total content length (sum of all content_len).
/// Computed on each call; O(n) where n = run_count.
fn total_content_len[T : HasLength](self : RleVec[T]) -> Int {
  self.items.fold(init=0, fn(acc, item) { acc + T::content_len(item) })
}

///|
fn iter_slices[T : Sliceable + HasLength](
  self : RleVec[T],
  start~ : Int,
  end~ : Int
) -> Result[Iter[Slice[T]], RleError]

///|
fn iter_slices_clamped[T : Sliceable + HasLength](
  self : RleVec[T],
  start~ : Int,
  end~ : Int
) -> Iter[Slice[T]]

///|
fn split_at[T : Sliceable + HasLength + Mergeable](
  self : RleVec[T],
  index : Int
) -> Result[(RleVec[T], RleVec[T]), RleError]
```

## Algorithms

### push

```moonbit
///|
fn push[T : Mergeable + HasLength](self : RleVec[T], element : T) -> Result[Unit, RleError] {
  // Reject zero-length elements to preserve invariants.
  if T::atom_len(element) <= 0 {
    return Err(RleError::EmptyElement)
  }
  match self.items.last() {
    Some(last) =>
      if T::can_merge(last, element) {
        self.items[self.items.length() - 1] = T::merge(last, element)
        self.normalize_last()
      } else {
        self.items.push(element)
      }
    None => self.items.push(element)
  }
  Ok(())
}

///|
/// Cascades merging leftward after a push-merge changes mergeability.
///
/// **When is this needed?**
/// For types where `can_merge` depends on the merged result, not just adjacency.
/// Example: A run type that only merges same-category items, but merging
/// can change the category (e.g., based on accumulated length).
///
/// For simple types like String (where can_merge is always true), this
/// ensures the vector collapses to a single run.
fn normalize_last[T : Mergeable](self : RleVec[T]) -> Unit {
  // If merge behavior changes after merging, cascade to the left.
  while self.items.length() >= 2 {
    let last = self.items.length() - 1
    let prev = last - 1
    let a = self.items[prev]
    let b = self.items[last]
    if T::can_merge(a, b) {
      self.items[prev] = T::merge(a, b)
      self.items.pop()
    } else {
      break
    }
  }
}
```

### search

Linear search by prefix sums (O(n), simple and correct):

```moonbit
///|
/// Finds the run containing the given index.
///
/// Parameters:
///
/// * `self` : The RleVec to search in.
/// * `index` : The atom index to find (0-based).
///
/// Returns `Some(SearchResult)` with run index and offset, or `None` if out of bounds.
///
/// Example:
///
/// ```moonbit
/// let vec = RleVec::from_string("hello")
/// inspect!(vec.search(2), content="Some({run_index: 0, offset: 2})")
/// ```
fn search[T : HasLength](self : RleVec[T], index : Int) -> SearchResult? {
  if index < 0 {
    return None
  }
  let mut prefix = 0
  for i = 0; i < self.items.length(); i = i + 1 {
    let len = T::atom_len(self.items[i])
    if index < prefix + len {
      return Some({ run_index: i, offset: index - prefix })
    }
    prefix = prefix + len
  }
  None  // index >= total_atom_len
}
```

### search with cached prefix sums (O(log n))

For performance-critical use cases, cache prefix sums:

```moonbit
///|
struct RleVecCached[T] {
  mut items : Array[T]
  mut prefix_sums : Array[Int]  // prefix_sums[i] = sum of atom_len for items[0..i]
  mut dirty : Bool              // Invalidation flag
}

**Mutation note:** `items` should be private in the concrete implementation.
All mutation entry points (push/split/clear/extend) must call `invalidate` to
avoid stale `prefix_sums` and incorrect `search_cached` results.

///|
/// Rebuilds prefix_sums if dirty flag is set.
/// Called before any search operation.
fn rebuild_if_dirty[T : HasLength](self : RleVecCached[T]) -> Unit {
  guard self.dirty
  self.prefix_sums = []
  let mut sum = 0
  for item in self.items {
    sum = sum + T::atom_len(item)
    self.prefix_sums.push(sum)
  }
  self.dirty = false
}

///|
/// Marks cache as dirty. Call after any mutation (push, split, etc).
fn invalidate[T](self : RleVecCached[T]) -> Unit {
  self.dirty = true
}

///|
fn search_cached[T : HasLength](self : RleVecCached[T], index : Int) -> SearchResult? {
  if index < 0 || self.items.is_empty() {
    return None
  }
  self.rebuild_if_dirty()
  let total = self.prefix_sums[self.prefix_sums.length() - 1]
  if index >= total {
    return None
  }
  // Binary search on prefix_sums
  let mut lo = 0
  let mut hi = self.items.length()
  while lo < hi {
    let mid = lo + (hi - lo) / 2
    if index < self.prefix_sums[mid] {
      hi = mid
    } else {
      lo = mid + 1
    }
  }
  if lo == 0 {
    Some({ run_index: 0, offset: index })
  } else {
    Some({ run_index: lo, offset: index - self.prefix_sums[lo - 1] })
  }
}
```

## Text Adapter (First Use Case)

**Atom unit:** Unicode codepoints (not bytes). All indexing/slicing uses codepoint offsets.

### String Trait Implementations

```moonbit
///|
impl Mergeable for String with can_merge(_a, _b) {
  // For plain text, always mergeable (no styling to compare)
  true
}

///|
impl Mergeable for String with merge(a, b) {
  a + b
}

///|
impl HasLength for String with atom_len(self) {
  // Codepoint count, not byte length
  // Note: O(n) - consider caching for hot paths
  self.iter().count()
}

///|
impl HasLength for String with content_len(self) {
  // For plain text, content_len == atom_len (no tombstones)
  self.iter().count()
}

///|
impl Sliceable for String with slice(self, start~, end~) {
  // Codepoint-safe slicing using iterator
  // Note: O(n) due to codepoint iteration
  self.iter()
    .drop(start)
    .take(end - start)
    .fold(init="", fn(acc, c) { acc + c.to_string() })
}
```

### Future: TextRun for Styled Text

```moonbit
///|
/// A text run with optional styling metadata
pub struct TextRun {
  content : String
  // Future: bold, italic, link, etc.
} derive(Show, Eq)

///|
pub fn TextRun::new(content : String) -> TextRun {
  { content }
}

///|
impl Mergeable for TextRun with can_merge(a, b) {
  // Only merge if same style (for now, always true)
  true
  // Future: a.style == b.style
}

///|
impl Mergeable for TextRun with merge(a, b) {
  { content: a.content + b.content }
}

///|
impl HasLength for TextRun with atom_len(self) {
  self.content.iter().count()
}

///|
impl HasLength for TextRun with content_len(self) {
  self.content.iter().count()
}

///|
impl Sliceable for TextRun with slice(self, start~, end~) {
  let sliced = self.content.iter()
    .drop(start)
    .take(end - start)
    .fold(init="", fn(acc, c) { acc + c.to_string() })
  { content: sliced }
}
```

### Helper Functions

```moonbit
///|
/// Creates an RleVec containing a single string run.
pub fn RleVec::from_string(text : String) -> RleVec[String] {
  let vec = RleVec::new()
  if text.iter().count() > 0 {
    let _ = vec.push(text)  // Safe: prechecked atom_len > 0
  }
  vec
}

///|
/// Concatenates all runs into a single string.
pub fn to_string(self : RleVec[String]) -> String {
  self.items.fold(init="", fn(acc, s) { acc + s })
}

///|
/// Returns an iterator over codepoints.
pub fn iter_chars(self : RleVec[String]) -> Iter[Char] {
  Iter::new(fn(yield_) {
    for run in self.items {
      for c in run {
        guard yield_(c) is IterContinue
      }
    }
    IterContinue
  })
}
```

### iter_slices

Iterate over sliced runs within a range:

**Boundary behavior:**
- `start < 0` or `end > total_atom_len` → `Err(IndexOutOfBounds)`
- `start > end` → `Err(IndexOutOfBounds)`
- `start == end` → yields empty iterator (no slices)
- Empty vector → `start == end == 0` yields empty iterator; any other range is `Err`
 - For permissive behavior, use `iter_slices_clamped` (see below)

**Rationale:** `iter_slices` is strict by default to surface invalid indices and
stay consistent with `split_at` error signaling; `iter_slices_clamped` exists
for callers that prefer best-effort bounds handling.

```moonbit
///|
/// Iterates over slices of runs that overlap with [start, end).
///
/// Yields `Slice[T]` views that can be converted to actual values with `to_inner()`.
/// Returns `Err(IndexOutOfBounds)` for invalid ranges; returns empty iterator if start == end.
pub fn iter_slices[T : Sliceable + HasLength](
  self : RleVec[T],
  start~ : Int,
  end~ : Int
) -> Result[Iter[Slice[T]], RleError] {
  let total = self.total_atom_len()
  if start < 0 || end < 0 || start > end || end > total {
    let bad_index =
      if start < 0 { start }
      else if end < 0 { end }
      else if start > end { start }
      else { end }
    return Err(RleError::IndexOutOfBounds(index=bad_index, len=total))
  }
  if start == end {
    return Ok(Iter::empty())
  }
  Ok(Iter::new(fn(yield_) {
    let mut pos = 0
    for i = 0; i < self.items.length(); i = i + 1 {
      let item = self.items[i]
      let len = T::atom_len(item)
      let item_end = pos + len
      // Check if this run overlaps with [start, end)
      if item_end > start && pos < end {
        let slice_start = if pos < start { start - pos } else { 0 }
        let slice_end = if item_end > end { end - pos } else { len }
        guard yield_({ value: item, start: slice_start, end: slice_end }) is IterContinue
      }
      pos = item_end
      if pos >= end {
        break
      }
    }
    IterContinue
  }))
}
```

### iter_slices_clamped

Permissive wrapper that clamps bounds to `[0, total_atom_len]` and returns an
empty iterator when `start >= end`.

```moonbit
///|
pub fn iter_slices_clamped[T : Sliceable + HasLength](
  self : RleVec[T],
  start~ : Int,
  end~ : Int
) -> Iter[Slice[T]] {
  let total = self.total_atom_len()
  let clamped_start = if start < 0 { 0 } else { start }
  let clamped_end = if end > total { total } else { end }
  if clamped_start >= clamped_end {
    return Iter::empty()
  }
  match self.iter_slices(start=clamped_start, end=clamped_end) {
    Ok(it) => it
    Err(_) => Iter::empty()
  }
}
```

### split_at

Split the RleVec at a given index:

**Boundary behavior:**
- `index < 0` or `index > total_atom_len` → `Err(IndexOutOfBounds)`
- `index == 0` → returns `(empty, self)` (no copy needed)
- `index == total_atom_len` → returns `(self, empty)` (no copy needed)
- Split at run boundary → no slicing, whole runs move
- Empty vector → index `0` is ok, any other index is `Err`

**Note on aliasing:** Boundary cases return `self` directly without copying.
This is safe because `RleVec` follows a builder pattern: mutable during
construction (via `push`), then read-only during use. If the caller needs
an independent copy for mutation, they can explicitly copy `self.items`.

```moonbit
///|
/// Splits this RleVec at the given index.
///
/// Returns two RleVecs: [0, index) and [index, total_len).
/// Handles boundary cases to avoid zero-length slices.
pub fn split_at[T : Sliceable + HasLength + Mergeable](
  self : RleVec[T],
  index : Int
) -> Result[(RleVec[T], RleVec[T]), RleError] {
  let total = self.total_atom_len()
  // Handle boundary cases
  if index < 0 || index > total {
    return Err(RleError::IndexOutOfBounds(index=index, len=total))
  }
  if index == 0 {
    return Ok((RleVec::new(), self))
  }
  if index == total {
    return Ok((self, RleVec::new()))
  }
  let left = RleVec::new()
  let right = RleVec::new()
  let mut pos = 0
  for item in self.items {
    let len = T::atom_len(item)
    let item_end = pos + len
    if item_end <= index {
      // Entirely in left
      match left.push(item) {
        Ok(_) => ()
        Err(e) => return Err(e)
      }
    } else if pos >= index {
      // Entirely in right
      match right.push(item) {
        Ok(_) => ()
        Err(e) => return Err(e)
      }
    } else {
      // Split point is within this item (not at boundary)
      let split_offset = index - pos
      if split_offset == 0 {
        match right.push(item) {
          Ok(_) => ()
          Err(e) => return Err(e)
        }
      } else if split_offset == len {
        match left.push(item) {
          Ok(_) => ()
          Err(e) => return Err(e)
        }
      } else {
        match left.push(T::slice(item, start=0, end=split_offset)) {
          Ok(_) => ()
          Err(e) => return Err(e)
        }
        match right.push(T::slice(item, start=split_offset, end=len)) {
          Ok(_) => ()
          Err(e) => return Err(e)
        }
      }
    }
    pos = item_end
  }
  Ok((left, right))
}
```

## Integration Points (Phase 1)

### Text Package Integration

Add optional RLE views in `event-graph-walker/text`:

```moonbit
///|
/// Returns an RLE view of the text content.
pub fn to_rle(self : TextView) -> RleVec[String] {
  RleVec::from_string(self.text())
}

///|
/// Iterates over text runs.
pub fn runs(self : TextView) -> Iter[String] {
  self.to_rle().items.iter()
}
```

### Unchanged APIs

Keep existing APIs unchanged:
- `TextView::text() -> String`
- `Document::to_text() -> String`
- `FugueTree::to_text() -> String`

## Testing Plan

### File Structure
- `rle_vec_test.mbt` — Blackbox tests (public API)
- `rle_vec_wbtest.mbt` — Whitebox tests (internal invariants)

### Unit Tests

```moonbit
///|
test "push merges adjacent runs" {
  let vec : RleVec[String] = RleVec::new()
  let _ = vec.push("hello")
  let _ = vec.push(" world")
  inspect!(vec.items.length(), content="1")
  inspect!(vec.to_string(), content="hello world")
}

///|
test "search finds correct position" {
  let vec : RleVec[String] = RleVec::new()
  let _ = vec.push("abc")
  let _ = vec.push("def")  // Will merge
  let result = vec.search(3)
  inspect!(result, content="Some({run_index: 0, offset: 3})")
}

///|
test "slice/merge coherence" {
  let text = "hello"
  let left = String::slice(text, start=0, end=2)
  let right = String::slice(text, start=2, end=5)
  inspect!(String::merge(left, right) == text, content="true")
}
```

### Property Tests

Follow project pattern: separate property functions from test blocks.

Note: The tombstone monotonicity property is a future/pseudo-test and should be enabled
once a tombstone-bearing run type (e.g., TextSpan) has Arbitrary/Shrink implementations.

```moonbit
// Property-based tests for RleVec using QuickCheck
//
// These tests verify fundamental algebraic properties of RLE operations
// using Arbitrary and Shrink traits for automatic test generation.

///|
/// Property: Mergeable associativity - merge(merge(a, b), c) == merge(a, merge(b, c))
fn prop_merge_associative(triple : (String, String, String)) -> Bool {
  let (a, b, c) = triple
  let left = String::merge(String::merge(a, b), c)
  let right = String::merge(a, String::merge(b, c))
  left == right
}

///|
test "property: merge is associative" {
  @qc.quick_check_fn(prop_merge_associative)
}

///|
/// Property: Slice/merge round-trip - merge(slice(x, end=k), slice(x, start=k)) == x
fn prop_slice_merge_roundtrip(text : String) -> Bool {
  let len = text.iter().count()
  if len == 0 {
    return true  // Vacuously true for empty strings
  }
  let k = len / 2
  let left = String::slice(text, start=0, end=k)
  let right = String::slice(text, start=k, end=len)
  String::merge(left, right) == text
}

///|
test "property: slice/merge round-trip" {
  @qc.quick_check_fn(prop_slice_merge_roundtrip)
}

///|
/// Property: Push preserves total atom length
fn prop_push_preserves_length(strings : Array[String]) -> Bool {
  let vec : RleVec[String] = RleVec::new()
  let mut expected_len = 0
  for s in strings {
    let len = s.iter().count()
    if len > 0 {
      let _ = vec.push(s)
      expected_len = expected_len + len
    }
  }
  vec.total_atom_len() == expected_len
}

///|
test "property: push preserves total length" {
  @qc.quick_check_fn(prop_push_preserves_length)
}

///|
/// Property: content_len is additive when mergeable
fn prop_content_len_additive(pair : (String, String)) -> Bool {
  let (a, b) = pair
  if String::can_merge(a, b) {
    String::content_len(String::merge(a, b)) == String::content_len(a) + String::content_len(b)
  } else {
    true
  }
}

///|
test "property: content_len additive when mergeable" {
  @qc.quick_check_fn(prop_content_len_additive)
}

///|
/// Property: tombstone monotonicity across slice (future/pseudo-test)
///
/// Enable once a tombstone-bearing run type (e.g., TextSpan) has Arbitrary/Shrink.
fn prop_tombstone_slice_monotonic(run : TextSpan) -> Bool {
  if TextSpan::content_len(run) != 0 {
    return true
  }
  let len = TextSpan::atom_len(run)
  let mid = len / 2
  TextSpan::content_len(TextSpan::slice(run, start=0, end=mid)) == 0
    && TextSpan::content_len(TextSpan::slice(run, start=mid, end=len)) == 0
}

///|
/// Property: No adjacent mergeable runs (invariant)
fn prop_no_adjacent_mergeable(strings : Array[String]) -> Bool {
  let vec : RleVec[String] = RleVec::new()
  for s in strings {
    if s.iter().count() > 0 {
      let _ = vec.push(s)
    }
  }
  // Check invariant: no adjacent mergeable pairs
  for i = 0; i < vec.items.length() - 1; i = i + 1 {
    if String::can_merge(vec.items[i], vec.items[i + 1]) {
      return false
    }
  }
  true
}

///|
test "property: no adjacent mergeable runs" {
  @qc.quick_check_fn(prop_no_adjacent_mergeable)
}

///|
/// Property: Search finds correct offset
fn prop_search_correct(text : String) -> Bool {
  let len = text.iter().count()
  if len == 0 {
    return true
  }
  let vec = RleVec::from_string(text)
  // Check all valid indices
  for i = 0; i < len; i = i + 1 {
    match vec.search(i) {
      Some(result) =>
        if result.run_index != 0 || result.offset != i {
          return false
        }
      None => return false
    }
  }
  // Check out-of-bounds returns None
  vec.search(len).is_empty() && vec.search(-1).is_empty()
}

///|
test "property: search returns correct results" {
  @qc.quick_check_fn(prop_search_correct)
}
```

### Edge Case Tests

```moonbit
///|
test "empty vector operations" {
  let vec : RleVec[String] = RleVec::new()
  inspect!(vec.is_empty(), content="true")
  inspect!(vec.total_atom_len(), content="0")
  inspect!(vec.total_content_len(), content="0")
  inspect!(vec.search(0), content="None")
  inspect!(vec.search(-1), content="None")
  match vec.split_at(0) {
    Ok((left, right)) => inspect!(left.is_empty() && right.is_empty(), content="true")
    Err(_) => inspect!(false, content="true")
  }
}

///|
test "negative index handling" {
  let vec = RleVec::from_string("hello")
  inspect!(vec.search(-1), content="None")
  inspect!(vec.search(-100), content="None")
  inspect!(vec.split_at(-5).is_err(), content="true")
}

///|
test "overflow index handling" {
  let vec = RleVec::from_string("hello")
  inspect!(vec.search(5), content="None")  // index == len
  inspect!(vec.search(100), content="None")
  inspect!(vec.split_at(100).is_err(), content="true")
}

///|
test "iter_slices boundary cases" {
  let vec = RleVec::from_string("hello")
  // start > end is error
  inspect!(vec.iter_slices(start=3, end=2).is_err(), content="true")
  // start == end yields empty
  match vec.iter_slices(start=2, end=2) {
    Ok(it) => inspect!(it.count(), content="0")
    Err(_) => inspect!(false, content="true")
  }
  // negative start is error
  inspect!(vec.iter_slices(start=-5, end=3).is_err(), content="true")
  // end > total is error
  inspect!(vec.iter_slices(start=0, end=100).is_err(), content="true")
}

///|
test "iter_slices_clamped boundary cases" {
  let vec = RleVec::from_string("hello")
  // start > end yields empty
  inspect!(vec.iter_slices_clamped(start=3, end=2).count(), content="0")
  // negative start clamped
  inspect!(vec.iter_slices_clamped(start=-5, end=3).count(), content="1")
  // end > total clamped
  inspect!(vec.iter_slices_clamped(start=0, end=100).count(), content="1")
}

///|
test "split_at boundary cases" {
  let vec = RleVec::from_string("hello")
  // Split at 0
  match vec.split_at(0) {
    Ok((l0, r0)) => {
      inspect!(l0.is_empty(), content="true")
      inspect!(r0.total_atom_len(), content="5")
    }
    Err(_) => inspect!(false, content="true")
  }
  // Split at total
  match vec.split_at(5) {
    Ok((l5, r5)) => {
      inspect!(l5.total_atom_len(), content="5")
      inspect!(r5.is_empty(), content="true")
    }
    Err(_) => inspect!(false, content="true")
  }
}

///|
test "normalize_last cascades merges (whitebox)" {
  // For String, can_merge is always true, so all pushes should
  // cascade into a single run regardless of push order.
  let vec : RleVec[String] = RleVec::new()
  let _ = vec.push("a")
  let _ = vec.push("b")
  let _ = vec.push("c")
  // All three should merge into one run
  inspect!(vec.run_count(), content="1")
  inspect!(vec.total_atom_len(), content="3")

  // Verify the merged content
  inspect!(vec.items[0], content="\"abc\"")
}

///|
/// Example type demonstrating when normalize_last cascade is essential.
/// Runs only merge if they have the same parity (odd/even length).
/// Merging changes the length, potentially enabling further merges.
struct ParityRun {
  text : String
}

///|
impl Mergeable for ParityRun with can_merge(a, b) {
  // Only merge if both have same length parity
  let a_len = a.text.iter().count()
  let b_len = b.text.iter().count()
  (a_len % 2) == (b_len % 2)
}

///|
impl Mergeable for ParityRun with merge(a, b) {
  { text: a.text + b.text }
}

///|
impl HasLength for ParityRun with atom_len(self) {
  self.text.iter().count()
}

///|
impl HasLength for ParityRun with content_len(self) {
  self.text.iter().count()
}

///|
test "normalize_last cascade with parity-dependent merging" {
  // Demonstrates cascade: merging can change parity, enabling further merges.
  // Start: [odd, odd, even] - first two can merge
  // After first merge: [even, even] - now these can merge too!
  // Final: [even] - single run

  let vec : RleVec[ParityRun] = RleVec::new()
  // "a" (len=1, odd)
  let _ = vec.push({ text: "a" })
  inspect!(vec.run_count(), content="1")

  // "b" (len=1, odd) - merges with "a" -> "ab" (len=2, even)
  let _ = vec.push({ text: "b" })
  inspect!(vec.run_count(), content="1")  // merged

  // "cd" (len=2, even) - merges with "ab" (both even) -> "abcd"
  let _ = vec.push({ text: "cd" })
  inspect!(vec.run_count(), content="1")  // cascade merged
  inspect!(vec.items[0].text, content="\"abcd\"")

  // Now push "e" (len=1, odd) - cannot merge with "abcd" (len=4, even)
  let _ = vec.push({ text: "e" })
  inspect!(vec.run_count(), content="2")  // separate run
}
```

## Migration Plan
- Phase 1: Introduce RLE package and text adapters (read-only).
- Phase 2: Evaluate use in `FugueTree::to_text()` or cached text logic.
- Phase 3: Consider RLE-backed document representation if performance needs.

## Open Questions

1. **Run type for text:** Use `String` directly vs custom `TextRun` struct?
   - `String`: Simpler, works for plain text.
   - `TextRun`: Extensible for styling/metadata (e.g., bold, links).

2. **Index type:** Keep `Int` or introduce newtype?
   - Consider `type AtomIndex Int` for type safety if mixing with byte indices.

3. **Visibility:** Expose `RleVec` publicly or keep internal?
   - Start internal, expose if useful for downstream packages.

4. **Prefix-sum caching:** Cache cumulative lengths?
   - Trade-off: O(1) search vs O(n) update on mutation.
   - Consider lazy caching with invalidation flag.

## MoonBit Implementation Notes

### Block Style
Follow project conventions with `///|` block separators:
```moonbit
///|
fn function_one() -> Unit { ... }

///|
fn function_two() -> Unit { ... }
```

### Trait Method Dispatch
MoonBit uses explicit trait dispatch for polymorphic calls:
```moonbit
// Use T::method_name(value) syntax
T::atom_len(element)
T::can_merge(a, b)
```

### Error Handling
Use `Option` for expected missing values, consider `Result` for errors:
```moonbit
fn search(...) -> SearchResult?       // Option for "not found"
fn parse(...) -> Result[T, String]    // Result for parse errors
```

### Performance Considerations
- `String` iteration uses codepoints, not bytes — be aware of O(n) access.
- For hot paths, consider `@string.Iter` or `Bytes` with explicit encoding.
- Use `guard` for early returns instead of nested `if` statements.

## References

### Conceptual References (Rust implementations for algorithm reference)
- [Loro RLE](https://github.com/loro-dev/loro/tree/main/crates/rle) — Trait-based RLE design
- [Diamond Types RLE](https://github.com/josephg/diamond-types/tree/master/crates/rle) — Minimal RLE implementation

### MoonBit Resources
- [MoonBit Docs](https://docs.moonbitlang.com) — Language reference
- [MoonBit Trait System](https://docs.moonbitlang.com/en/latest/language/traits.html) — Trait definitions and implementations
- [MoonBit Core Library](https://mooncakes.io/docs/#/moonbitlang/core/) — Standard library reference
