///|
/// Prefix sums for O(log n) position lookup
pub(all) struct PrefixSums {
  atoms : Array[Int] // cumulative atom lengths
  content : Array[Int] // cumulative content lengths
} derive(Show, Eq)

///|
pub fn PrefixSums::new() -> PrefixSums {
  { atoms: [], content: [] }
}

///|
/// Total atom length - O(1)
pub fn PrefixSums::len(self : PrefixSums) -> Int {
  match self.atoms.last() {
    Some(total) => total
    None => 0
  }
}

///|
/// Total content length - O(1)
pub fn PrefixSums::content_len(self : PrefixSums) -> Int {
  match self.content.last() {
    Some(total) => total
    None => 0
  }
}

///|
/// Number of runs
pub fn PrefixSums::count(self : PrefixSums) -> Int {
  self.atoms.length()
}

///|
/// Get atom offset at run index (end of run i)
pub fn PrefixSums::atom_at(self : PrefixSums, index : Int) -> Int? {
  if index < 0 || index >= self.atoms.length() {
    None
  } else {
    Some(self.atoms[index])
  }
}

///|
/// Get atom offset before run index (start of run i)
pub fn PrefixSums::atom_before(self : PrefixSums, index : Int) -> Int {
  if index <= 0 {
    0
  } else {
    self.atoms[index - 1]
  }
}
