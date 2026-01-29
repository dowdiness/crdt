// Benchmarks for Runs::range implementations
// Run with: moon bench --package rle --release

///|
pub(all) struct BenchRun {
  len : Int
} derive(Show, Eq)

///|
pub impl HasLength for BenchRun with length(self : BenchRun) -> Int {
  self.len
}

///|
pub impl HasCausalLength for BenchRun with visible_len(self : BenchRun) -> Int {
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

///|
fn make_string_runs(count : Int, segment_size : Int) -> Runs[String] {
  let arr : Array[String] = []
  for i = 0; i < count; i = i + 1 {
    let sb = StringBuilder::new()
    for j = 0; j < segment_size; j = j + 1 {
      sb.write_char('a')
    }
    arr.push(sb.to_string())
  }
  Runs::from_array(arr)
}

///|
/// Benchmark: batch concat of multiple runs
test "runs - concat batch" (b : @bench.T) {
  let runs_a = make_string_runs(500, 10)
  let runs_b = make_string_runs(500, 10)
  b.bench(fn() {
    let result = runs_a.concat(runs_b)
    b.keep(result.count())
  })
}

///|
/// Benchmark: batch extend of multiple runs
test "runs - extend batch" (b : @bench.T) {
  let runs_b = make_string_runs(500, 10)
  b.bench(fn() {
    let runs_a = make_string_runs(500, 10)
    runs_a.extend(runs_b)
    b.keep(runs_a.count())
  })
}

///|
/// Benchmark: from_array_batch construction
test "runs - from_array_batch" (b : @bench.T) {
  let arr : Array[String] = []
  for i = 0; i < 1000; i = i + 1 {
    arr.push("x")
  }
  b.bench(fn() {
    let runs = Runs::from_array_batch(arr)
    b.keep(runs.count())
  })
}
