///| Wrapper enum to provide a single RLE surface without parametric traits.
pub enum Rle[T] {
  Vec(RleVec[T])
  VecCached(RleVecCached[T])
}

///| Constructors for explicit wrapping.
pub fn[T] Rle::from_vec(vec : RleVec[T]) -> Rle[T] {
  Vec(vec)
}

///| Constructors for explicit wrapping.
pub fn[T] Rle::from_cached(vec : RleVecCached[T]) -> Rle[T] {
  VecCached(vec)
}

///| Creates an RLE from an array, merging adjacent runs.
pub fn[T : Mergeable + HasLength] Rle::from_array(arr : Array[T]) -> Rle[T] {
  Vec(RleVec::from_array(arr))
}

///| Creates an RLE from an array using cached storage.
pub fn[T : Mergeable + HasLength] Rle::from_array_cached(
  arr : Array[T],
) -> Rle[T] {
  VecCached(RleVecCached::from_array(arr))
}

///| Converts to uncached RleVec, preserving items.
pub fn[T] Rle::to_rle_vec(self : Rle[T]) -> RleVec[T] {
  match self {
    Vec(v) => v
    VecCached(v) => v.to_rle_vec()
  }
}

///| Converts to cached RleVecCached, preserving items.
pub fn[T] Rle::to_cached(self : Rle[T]) -> RleVecCached[T] {
  match self {
    Vec(v) => RleVecCached::from_rle_vec(v)
    VecCached(v) => v
  }
}

///| Returns true if this RLE contains no runs.
pub fn[T] Rle::is_empty(self : Rle[T]) -> Bool {
  match self {
    Vec(v) => v.is_empty()
    VecCached(v) => v.is_empty()
  }
}

///| Returns the number of runs (not atoms).
pub fn[T] Rle::run_count(self : Rle[T]) -> Int {
  match self {
    Vec(v) => v.run_count()
    VecCached(v) => v.run_count()
  }
}

///| Returns a copy of the underlying items array.
pub fn[T] Rle::items(self : Rle[T]) -> Array[T] {
  match self {
    Vec(v) => v.items()
    VecCached(v) => v.items()
  }
}

///| Get item at run index (not atom index).
pub fn[T] Rle::get_run(self : Rle[T], index : Int) -> T? {
  match self {
    Vec(v) => v.get_run(index)
    VecCached(v) => v.get_run(index)
  }
}

///| Returns the total atom length.
pub fn[T : HasLength] Rle::total_atom_len(self : Rle[T]) -> Int {
  match self {
    Vec(v) => v.total_atom_len()
    VecCached(v) => v.total_atom_len()
  }
}

///| Returns the total content length.
pub fn[T : HasLength] Rle::total_content_len(self : Rle[T]) -> Int {
  match self {
    Vec(v) => v.total_content_len()
    VecCached(v) => v.total_content_len()
  }
}

///| Finds the run containing the given index.
pub fn[T : HasLength] Rle::search(self : Rle[T], index : Int) -> SearchResult? {
  match self {
    Vec(v) => v.search(index)
    VecCached(v) => v.search(index)
  }
}

///| Iterates over slices of runs that overlap with [start, end).
pub fn[T : HasLength] Rle::iter_slices(
  self : Rle[T],
  start~ : Int,
  end~ : Int,
) -> Result[Iter[Slice[T]], RleError] {
  match self {
    Vec(v) => v.iter_slices(start~, end~)
    VecCached(v) => v.iter_slices(start~, end~)
  }
}

///| Permissive wrapper that clamps bounds to [0, total_atom_len].
pub fn[T : HasLength] Rle::iter_slices_clamped(
  self : Rle[T],
  start~ : Int,
  end~ : Int,
) -> Iter[Slice[T]] {
  match self {
    Vec(v) => v.iter_slices_clamped(start~, end~)
    VecCached(v) => v.iter_slices_clamped(start~, end~)
  }
}

///| Splits this RLE at the given index.
pub fn[T : Sliceable + HasLength + Mergeable] Rle::split_at(
  self : Rle[T],
  index : Int,
) -> Result[(Rle[T], Rle[T]), RleError] {
  match self {
    Vec(v) =>
      match v.split_at(index) {
        Ok((left, right)) => Ok((Vec(left), Vec(right)))
        Err(e) => Err(e)
      }
    VecCached(v) =>
      match v.split_at(index) {
        Ok((left, right)) => Ok((VecCached(left), VecCached(right)))
        Err(e) => Err(e)
      }
  }
}

///| Adds an element to the end, merging if possible.
pub fn[T : Mergeable + HasLength] Rle::push(
  self : Rle[T],
  element : T,
) -> Result[Unit, RleError] {
  match self {
    Vec(v) => v.push(element)
    VecCached(v) => v.push(element)
  }
}

///| Clear all items from the RLE.
pub fn[T] Rle::clear(self : Rle[T]) -> Unit {
  match self {
    Vec(v) => v.clear()
    VecCached(v) => v.clear()
  }
}

///| Concatenate two RLEs, preserving the left variant.
pub fn[T : Mergeable + HasLength] Rle::concat(
  self : Rle[T],
  other : Rle[T],
) -> Rle[T] {
  match (self, other) {
    (Vec(a), Vec(b)) => Vec(a.concat(b))
    (Vec(a), VecCached(b)) => Vec(a.concat(b.to_rle_vec()))
    (VecCached(a), Vec(b)) => VecCached(a.concat(RleVecCached::from_rle_vec(b)))
    (VecCached(a), VecCached(b)) => VecCached(a.concat(b))
  }
}

///| Extend in-place from another RLE, preserving the left variant.
pub fn[T : Mergeable + HasLength] Rle::extend(
  self : Rle[T],
  other : Rle[T],
) -> Unit {
  match (self, other) {
    (Vec(a), Vec(b)) => a.extend(b)
    (Vec(a), VecCached(b)) => a.extend(b.to_rle_vec())
    (VecCached(a), Vec(b)) =>
      a.extend(RleVecCached::from_rle_vec(b))
    (VecCached(a), VecCached(b)) => a.extend(b)
  }
}

///| Returns an iterator over all items.
pub fn[T] Rle::iter(self : Rle[T]) -> Iter[T] {
  match self {
    Vec(v) => v.iter()
    VecCached(v) => v.iter()
  }
}

///| Creates an RLE containing a single string run.
pub fn Rle::from_string(text : String) -> Rle[String] {
  Vec(RleVec::from_string(text))
}

///| Creates a cached RLE containing a single string run.
pub fn Rle::from_string_cached(text : String) -> Rle[String] {
  VecCached(RleVecCached::from_string(text))
}

///| Concatenates all runs into a single string.
pub fn Rle::to_string(self : Rle[String]) -> String {
  match self {
    Vec(v) => v.to_string()
    VecCached(v) => v.to_string()
  }
}

///| Returns an iterator over codepoints.
pub fn Rle::iter_chars(self : Rle[String]) -> Iter[Char] {
  match self {
    Vec(v) => v.iter_chars()
    VecCached(v) => v.iter_chars()
  }
}

///| Returns a cursor when cached, otherwise None.
pub fn[T] Rle::cursor(self : Rle[T]) -> RleCursor[T]? {
  match self {
    VecCached(v) => Some(v.cursor())
    Vec(_) => None
  }
}
