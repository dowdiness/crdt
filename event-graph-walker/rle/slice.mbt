///|
/// A slice view into a run, representing a sub-range [start, end)
pub(all) struct Slice[T] {
  value : T
  start : Int
  end : Int
} derive(Show, Eq)

///|
/// Extracts the actual sliced value from this view.
///
/// Returns the portion of `value` from `start` to `end`.
pub fn[T : Sliceable] Slice::to_inner(self : Slice[T]) -> T {
  T::slice(self.value, start=self.start, end=self.end)
}
