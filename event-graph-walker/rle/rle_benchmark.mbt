// Benchmarks for RLE operations
// Run with: moon bench --package rle --release

///|
/// Benchmark: RleVecCached search (small - 100 runs)
test "rle - search (100 runs)" (b : @bench.T) {
  let vec : RleVecCached[String] = RleVecCached::new()
  // Create 100 runs of 10 chars each
  for i = 0; i < 100; i = i + 1 {
    let _ = vec.push("abcdefghij")
  }
  // Search for middle position
  let target = 500
  b.bench(fn() {
    let result = vec.search(target)
    b.keep(result)
  })
}

///|
/// Benchmark: RleVecCached search (medium - 1000 runs)
test "rle - search (1000 runs)" (b : @bench.T) {
  let vec : RleVecCached[String] = RleVecCached::new()
  for i = 0; i < 1000; i = i + 1 {
    let _ = vec.push("abcdefghij")
  }
  let target = 5000
  b.bench(fn() {
    let result = vec.search(target)
    b.keep(result)
  })
}

///|
/// Benchmark: RleVecCached search (large - 10000 runs)
test "rle - search (10000 runs)" (b : @bench.T) {
  let vec : RleVecCached[String] = RleVecCached::new()
  for i = 0; i < 10000; i = i + 1 {
    let _ = vec.push("abcdefghij")
  }
  let target = 50000
  b.bench(fn() {
    let result = vec.search(target)
    b.keep(result)
  })
}

///|
/// Benchmark: Cursor advance (1000 positions)
test "rle - cursor advance (1000 steps)" (b : @bench.T) {
  let vec : RleVecCached[String] = RleVecCached::new()
  for i = 0; i < 100; i = i + 1 {
    let _ = vec.push("abcdefghij")
  }
  b.bench(fn() {
    let cursor = vec.cursor()
    for j = 0; j < 1000; j = j + 1 {
      let _ = cursor.advance(1)
    }
    b.keep(cursor)
  })
}

///|
/// Benchmark: Cursor seek vs advance
test "rle - cursor seek (1000 seeks)" (b : @bench.T) {
  let vec : RleVecCached[String] = RleVecCached::new()
  for i = 0; i < 100; i = i + 1 {
    let _ = vec.push("abcdefghij")
  }
  b.bench(fn() {
    let cursor = vec.cursor()
    for i = 0; i < 1000; i = i + 1 {
      let _ = cursor.seek((i * 7) % 1000)
    }
    b.keep(cursor)
  })
}

///|
fn make_string(n : Int) -> String {
  let sb = StringBuilder::new()
  for i = 0; i < n; i = i + 1 {
    sb.write_char('a')
  }
  sb.to_string()
}

///|
/// Benchmark: String slice (short - 100 chars)
test "rle - string slice (100 chars)" (b : @bench.T) {
  let text = make_string(100)
  b.bench(fn() {
    let result = Sliceable::slice(text, start=25, end=75)
    b.keep(result)
  })
}

///|
/// Benchmark: String slice (medium - 1000 chars)
test "rle - string slice (1000 chars)" (b : @bench.T) {
  let text = make_string(1000)
  b.bench(fn() {
    let result = Sliceable::slice(text, start=250, end=750)
    b.keep(result)
  })
}

///|
/// Benchmark: String slice (large - 10000 chars)
test "rle - string slice (10000 chars)" (b : @bench.T) {
  let text = make_string(10000)
  b.bench(fn() {
    let result = Sliceable::slice(text, start=2500, end=7500)
    b.keep(result)
  })
}

///|
/// Benchmark: RleVecCached to_string (100 runs)
test "rle - to_string (100 runs)" (b : @bench.T) {
  let vec : RleVecCached[String] = RleVecCached::new()
  for i = 0; i < 100; i = i + 1 {
    let _ = vec.push("abcdefghij")
  }
  b.bench(fn() {
    let result = vec.to_string()
    b.keep(result)
  })
}

///|
/// Benchmark: RleVecCached to_string (1000 runs)
test "rle - to_string (1000 runs)" (b : @bench.T) {
  let vec : RleVecCached[String] = RleVecCached::new()
  for i = 0; i < 1000; i = i + 1 {
    let _ = vec.push("abcdefghij")
  }
  b.bench(fn() {
    let result = vec.to_string()
    b.keep(result)
  })
}

///|
/// Benchmark: iter_slices (small range)
test "rle - iter_slices (small)" (b : @bench.T) {
  let vec : RleVecCached[String] = RleVecCached::new()
  for i = 0; i < 100; i = i + 1 {
    let _ = vec.push("abcdefghij")
  }
  b.bench(fn() {
    match vec.iter_slices(start=100, end=200) {
      Ok(iter) => {
        let count = iter.count()
        b.keep(count)
      }
      Err(_) => ()
    }
  })
}

///|
/// Benchmark: split_at (middle)
test "rle - split_at (middle)" (b : @bench.T) {
  let vec : RleVecCached[String] = RleVecCached::new()
  for i = 0; i < 100; i = i + 1 {
    let _ = vec.push("abcdefghij")
  }
  b.bench(fn() {
    match vec.split_at(500) {
      Ok((left, right)) => {
        b.keep(left)
        b.keep(right)
      }
      Err(_) => ()
    }
  })
}

///|
/// Benchmark: push 10K sequential (target: < 10ms)
test "rle - push (10K sequential)" (b : @bench.T) {
  b.bench(fn() {
    let vec : RleVecCached[String] = RleVecCached::new()
    for i = 0; i < 10000; i = i + 1 {
      let _ = vec.push("a")
    }
    b.keep(vec)
  })
}

///|
/// Benchmark: iter_slices full doc (target: < 5ms)
test "rle - iter_slices (full 10K)" (b : @bench.T) {
  let vec : RleVecCached[String] = RleVecCached::new()
  for i = 0; i < 1000; i = i + 1 {
    let _ = vec.push("abcdefghij")
  }
  let total = vec.total_atom_len()
  b.bench(fn() {
    match vec.iter_slices(start=0, end=total) {
      Ok(iter) => {
        let count = iter.count()
        b.keep(count)
      }
      Err(_) => ()
    }
  })
}

///|
/// Benchmark: split_at 10K doc (target: < 1ms)
test "rle - split_at (10K doc)" (b : @bench.T) {
  let vec : RleVecCached[String] = RleVecCached::new()
  for i = 0; i < 1000; i = i + 1 {
    let _ = vec.push("abcdefghij")
  }
  b.bench(fn() {
    match vec.split_at(5000) {
      Ok((left, right)) => {
        b.keep(left)
        b.keep(right)
      }
      Err(_) => ()
    }
  })
}
