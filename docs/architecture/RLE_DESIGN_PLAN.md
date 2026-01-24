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
├── traits.mbt               # Mergable, Sliceable, HasLength traits
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
trait Mergable {
  can_merge(Self, Self) -> Bool
  merge(Self, Self) -> Self
}

///|
trait Sliceable {
  // Half-open [start, end), using labeled arguments
  slice(Self, start~ : Int, end~ : Int) -> Self
}

///|
trait HasLength {
  // Primary length for indexing/slicing (e.g., codepoints for text)
  atom_len(Self) -> Int
  // Visible length (may be 0 for tombstones while atom_len > 0)
  content_len(Self) -> Int
}
```

**Trait Laws (Algebraic Properties):**

These laws should be verified with property-based tests:

| Trait | Property | Law |
|-------|----------|-----|
| `Mergable` | Length preservation | `atom_len(merge(a, b)) == atom_len(a) + atom_len(b)` |
| `Mergable` | Associativity | `merge(merge(a, b), c) == merge(a, merge(b, c))` |
| `Sliceable` | Content preservation | `slice(x, start=0, end=atom_len(x)) == x` |
| `Sliceable` | Round-trip | `merge(slice(x, end=k), slice(x, start=k)) == x` when mergeable |
| `HasLength` | Non-negative | `atom_len(x) >= 0` and `content_len(x) >= 0` |
| `HasLength` | Content bound | `content_len(x) <= atom_len(x)` |

**Composite Constraint:**
Functions requiring full RLE behavior use multiple trait bounds:
```moonbit
fn push[T : Mergable + HasLength + Eq](self : RleVec[T], element : T) -> Unit
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
pub fn RleVec::from_array[T : Mergable + HasLength](arr : Array[T]) -> RleVec[T] {
  let vec = RleVec::new()
  for item in arr {
    if T::atom_len(item) > 0 {
      vec.push(item)
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

**Core Operations:**

```moonbit
///|
fn push[T : Mergable + HasLength](self : RleVec[T], element : T) -> Unit

///|
fn search[T : HasLength](self : RleVec[T], index : Int) -> SearchResult?

///|
fn total_atom_len[T : HasLength](self : RleVec[T]) -> Int

///|
fn total_content_len[T : HasLength](self : RleVec[T]) -> Int

///|
fn iter_slices[T : Sliceable + HasLength](
  self : RleVec[T],
  start~ : Int,
  end~ : Int
) -> Iter[Slice[T]]

///|
fn split_at[T : Sliceable + HasLength](
  self : RleVec[T],
  index : Int
) -> (RleVec[T], RleVec[T])
```

## Algorithms

### push

```moonbit
///|
fn push[T : Mergable + HasLength](self : RleVec[T], element : T) -> Unit {
  // Reject zero-length elements
  guard T::atom_len(element) > 0
  match self.items.last() {
    Some(last) =>
      if T::can_merge(last, element) {
        self.items[self.items.length() - 1] = T::merge(last, element)
      } else {
        self.items.push(element)
      }
    None => self.items.push(element)
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

///|
fn search_cached[T : HasLength](self : RleVecCached[T], index : Int) -> SearchResult? {
  if index < 0 || self.items.is_empty() {
    return None
  }
  self.rebuild_if_dirty()
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
impl Mergable for String with can_merge(_a, _b) {
  // For plain text, always mergeable (no styling to compare)
  true
}

///|
impl Mergable for String with merge(a, b) {
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
impl Mergable for TextRun with can_merge(a, b) {
  // Only merge if same style (for now, always true)
  true
  // Future: a.style == b.style
}

///|
impl Mergable for TextRun with merge(a, b) {
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
    vec.push(text)
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

```moonbit
///|
/// Iterates over slices of runs that overlap with [start, end).
///
/// Yields `Slice[T]` views that can be converted to actual values with `to_inner()`.
pub fn iter_slices[T : Sliceable + HasLength](
  self : RleVec[T],
  start~ : Int,
  end~ : Int
) -> Iter[Slice[T]] {
  Iter::new(fn(yield_) {
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
  })
}
```

### split_at

Split the RleVec at a given index:

```moonbit
///|
/// Splits this RleVec at the given index.
///
/// Returns two RleVecs: [0, index) and [index, total_len).
pub fn split_at[T : Sliceable + HasLength + Mergable](
  self : RleVec[T],
  index : Int
) -> (RleVec[T], RleVec[T]) {
  let left = RleVec::new()
  let right = RleVec::new()
  let mut pos = 0
  for item in self.items {
    let len = T::atom_len(item)
    let item_end = pos + len
    if item_end <= index {
      // Entirely in left
      left.push(item)
    } else if pos >= index {
      // Entirely in right
      right.push(item)
    } else {
      // Split point is within this item
      let split_offset = index - pos
      left.push(T::slice(item, start=0, end=split_offset))
      right.push(T::slice(item, start=split_offset, end=len))
    }
    pos = item_end
  }
  (left, right)
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
  vec.push("hello")
  vec.push(" world")
  inspect!(vec.items.length(), content="1")
  inspect!(vec.to_string(), content="hello world")
}

///|
test "search finds correct position" {
  let vec : RleVec[String] = RleVec::new()
  vec.push("abc")
  vec.push("def")  // Will merge
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

```moonbit
// Property-based tests for RleVec using QuickCheck
//
// These tests verify fundamental algebraic properties of RLE operations
// using Arbitrary and Shrink traits for automatic test generation.

///|
/// Property: Mergable associativity - merge(merge(a, b), c) == merge(a, merge(b, c))
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
      vec.push(s)
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
/// Property: No adjacent mergeable runs (invariant)
fn prop_no_adjacent_mergeable(strings : Array[String]) -> Bool {
  let vec : RleVec[String] = RleVec::new()
  for s in strings {
    if s.iter().count() > 0 {
      vec.push(s)
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
