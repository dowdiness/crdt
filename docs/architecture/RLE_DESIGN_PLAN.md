# RLE Design Plan (Trait-Based)

## Goals
- Provide a reusable run-length encoding (RLE) core for CRDT/text features.
- Use trait-based run types to allow different payloads (text runs, op spans).
- Preserve existing public APIs; introduce RLE as an internal utility first.
- Keep invariants explicit: no empty runs, no adjacent mergeable runs.

## Non-Goals
- No change to external network or storage formats in this phase.
- No immediate replacement of all text storage with RLE.

## Design Overview
Implement a new `event-graph-walker/rle` package that mirrors the Loro RLE
trait concepts (without a config parameter) and provides a simple RLE vector
container (`RleVec`). The initial integration is read-only adapters for text
views, with optional future adoption in `Document::to_text`.

## Package and File Layout
- `event-graph-walker/rle/moon.pkg.json`
- `event-graph-walker/rle/traits.mbt`
- `event-graph-walker/rle/slice.mbt`
- `event-graph-walker/rle/search_result.mbt`
- `event-graph-walker/rle/rle_vec.mbt`
- `event-graph-walker/rle/rle_vec_test.mbt`

## Core Traits
Traits correspond to the Loro RLE traits (without config):
- `Mergable`
  - `is_mergable(self, other) -> Bool`
  - `merge(self, other) -> Self`
- `Sliceable`
  - `slice(self, from:Int, to:Int) -> Self`
- `HasLength`
  - `content_len(self) -> Int`
  - `atom_len(self) -> Int` (default to `content_len` when appropriate)
- `Rle`
  - A trait alias for `HasLength + Sliceable + Mergable + Show + Clone`.
- `ZeroElement`
  - `zero_element() -> Self`, default impl for `Default`.
- `GlobalIndex`
  - Initial plan: use `Int` only for indexing.
- `HasIndex`
  - `get_start_index(self) -> Int`
  - `get_end_index(self) -> Int` (derived from `atom_len`).

## Supporting Types
- `Slice[T]`
  - `value : T`, `start : Int`, `end : Int`
  - `into_inner()` returns `value.slice(start, end)`.
- `SearchResult[T]`
  - `merged_index : Int`
  - `element : T`
  - `offset : Int`

## RleVec Container
`RleVec[T]` is a minimal run container:
- Storage: `mut items : Array[T]`.
- Invariants:
  - No empty runs (`content_len() == 0`).
  - No adjacent runs where `is_mergable` is `true`.
- Core operations:
  - `push_rle_element(element : T)`
  - `search_atom_index(index : Int) -> Int` (binary search by start index)
  - `get_by_atom_index(index : Int) -> SearchResult[T]?`
  - `start() -> Int`, `end() -> Int`, `sum_atom_len() -> Int`

## Algorithms
- `push_rle_element`:
  - If last run exists and `last.is_mergable(element)`, replace last with
    `last.merge(element)`; otherwise append.
- `search_atom_index`:
  - Binary search based on `get_start_index` and `get_end_index`.
- `get_by_atom_index`:
  - Return `None` when index is past end.
  - Compute offset using `index - run.get_start_index()`.

## Text Adapter (First Use Case)
- Define `TextRun` (string segment) or use `String` directly.
- Implement `Mergable` for text runs:
  - Merge only if both are same "kind" (plain text for now).
- Implement `Sliceable` for `String` via safe slicing.
- Provide helpers:
  - `RleVec::from_string(text : String) -> RleVec[String]`
  - `RleVec::to_string(self) -> String`

## Integration Points (Phase 1)
- Add optional RLE views in `event-graph-walker/text`:
  - `TextView::runs()` or `TextView::to_rle()`.
- Keep existing `TextView::text()` and `Document::to_text()` unchanged.

## Testing Plan
- Unit tests in `rle_vec_test.mbt`:
  - Merge behavior (adjacent mergeable runs collapse).
  - Slice/merge coherence: `slice(0,k).merge(slice(k,n)) == original`.
  - Search correctness for first/middle/last indices.
- Property tests (optional):
  - Random insert/merge/slice preserve invariants.

## Migration Plan
- Phase 1: Introduce RLE package and text adapters (read-only).
- Phase 2: Evaluate use in `FugueTree::to_text()` or cached text logic.
- Phase 3: Consider RLE-backed document representation if performance needs.

## Open Questions
- Final run type: `String` vs `TextRun` (for future styling/metadata).
- Index type: keep `Int` or introduce a dedicated index type later.
- Decide whether to expose `RleVec` publicly or keep internal.

## 📚 References

- [Loro rle](https://github.com/loro-dev/loro/tree/main/crates/rle)
- [Diamond Types](https://github.com/josephg/diamond-types/tree/master/crates/rle)
