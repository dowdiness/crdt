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
///
/// Note: `causal_len` defaults to `HasLength::length` unless overridden.
pub(open) trait HasCausalLength : HasLength {
  causal_len(Self) -> Int = _
  visible_len(Self) -> Int
}

///|
/// Default causal length delegates to plain length.
impl HasCausalLength with causal_len(self) {
  HasLength::length(self)
}
