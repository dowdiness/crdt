///|
/// **Mergeable** - "Can two adjacent things become one?"
///
/// Think of it like train cars coupling together. Two runs can merge only if:
/// - They are logically adjacent (e.g., consecutive characters from same author)
/// - Merging preserves meaning (the merged result equals the concatenation)
///
/// Example: "hel" + "lo" → "hello" (same author, consecutive positions)
/// Counter-example: "hello" + "world" from different authors → cannot merge
pub(open) trait Mergeable {
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
pub(open) trait Sliceable {
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
pub(open) trait HasLength {
  atom_len(Self) -> Int
  content_len(Self) -> Int
}
