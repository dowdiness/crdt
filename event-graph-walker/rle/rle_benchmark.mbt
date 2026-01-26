// Benchmarks for Runs::range implementations
// Run with: moon bench --package rle --release

///|
pub(all) struct BenchRun {
  len : Int
} derive(Show, Eq)

///|
pub impl HasLength for BenchRun with atom_len(self : BenchRun) -> Int {
  self.len
}

///|
pub impl HasLength for BenchRun with content_len(self : BenchRun) -> Int {
  self.len
}

///|
fn make_runs(count : Int, run_len : Int) -> Runs[BenchRun] {
  let arr : Array[BenchRun] = []
  for _i = 0; _i < count; _i = _i + 1 {
    arr.push({ len: run_len })
  }
  Runs(arr)
}

///|
fn count_slices(it : Iter[Slice[BenchRun]]) -> Int {
  let mut count = 0
  for _ in it {
    count = count + 1
  }
  count
}

///|
/// Benchmark: range with small span near start
/// Uses early break for short ranges.
test "runs - range iter (small)" (b : @bench.T) {
  let runs = make_runs(10000, 4)
  let start = 0
  let end = 400
  b.bench(fn() {
    let it = match runs.range(start~, end~) {
      Ok(it) => it
      Err(_) => abort("range failed")
    }
    let count = count_slices(it)
    b.keep(count)
  })
}

///|
/// Benchmark: range with span near middle
/// Forces scanning about half of the runs.
test "runs - range iter (middle)" (b : @bench.T) {
  let runs = make_runs(10000, 4)
  let total = 10000 * 4
  let start = total / 2
  let end = start + 400
  b.bench(fn() {
    let it = match runs.range(start~, end~) {
      Ok(it) => it
      Err(_) => abort("range failed")
    }
    let count = count_slices(it)
    b.keep(count)
  })
}
