// Benchmarks for branch checkout and advance performance
// Run with: moon bench --package branch --release

///|
/// Benchmark: Checkout small document (10 operations)
test "branch - checkout (10 ops)" (b : @bench.T) {
  let oplog = @oplog.OpLog::new("agent_a")

  // Insert "Hello"
  let _op1 = oplog.insert("H", -1, -1)
  let _op2 = oplog.insert("e", 0, -1)
  let _op3 = oplog.insert("l", 1, -1)
  let _op4 = oplog.insert("l", 2, -1)
  let _op5 = oplog.insert("o", 3, -1)
  let _op6 = oplog.insert(" ", 4, -1)
  let _op7 = oplog.insert("W", 5, -1)
  let _op8 = oplog.insert("o", 6, -1)
  let _op9 = oplog.insert("r", 7, -1)
  let _op10 = oplog.insert("d", 8, -1)
  let frontier = oplog.get_frontier()
  b.bench(fn() {
    let result = Branch::checkout(oplog, frontier)
    b.keep(result)
  })
}

///|
/// Benchmark: Checkout medium document (100 operations)
test "branch - checkout (100 ops)" (b : @bench.T) {
  let oplog = @oplog.OpLog::new("agent_a")
  let mut prev = -1

  // Insert 100 characters
  for i = 0; i < 100; i = i + 1 {
    let op = oplog.insert("a", prev, -1)
    prev = op.lv
  }
  let frontier = oplog.get_frontier()
  b.bench(fn() {
    let result = Branch::checkout(oplog, frontier)
    b.keep(result)
  })
}

///|
/// Benchmark: Checkout large document (1000 operations)
test "branch - checkout (1000 ops)" (b : @bench.T) {
  let oplog = @oplog.OpLog::new("agent_a")
  let mut prev = -1

  // Insert 1000 characters
  for i = 0; i < 1000; i = i + 1 {
    let op = oplog.insert("a", prev, -1)
    prev = op.lv
  }
  let frontier = oplog.get_frontier()
  b.bench(fn() {
    let result = Branch::checkout(oplog, frontier)
    b.keep(result)
  })
}

///|
/// Benchmark: Advance with small delta (10 new ops)
test "branch - advance (10 new ops)" (b : @bench.T) {
  let oplog = @oplog.OpLog::new("agent_a")
  let mut prev = -1

  // Build base: 100 operations
  for i = 0; i < 100; i = i + 1 {
    let op = oplog.insert("a", prev, -1)
    prev = op.lv
  }
  let base_frontier = oplog.get_frontier()
  let base_branch = Branch::checkout(oplog, base_frontier)

  // Add 10 more operations
  for i = 0; i < 10; i = i + 1 {
    let op = oplog.insert("b", prev, -1)
    prev = op.lv
  }
  let new_frontier = oplog.get_frontier()
  b.bench(fn() {
    let result = base_branch.advance(new_frontier)
    b.keep(result)
  })
}

///|
/// Benchmark: Advance with large delta (100 new ops)
test "branch - advance (100 new ops)" (b : @bench.T) {
  let oplog = @oplog.OpLog::new("agent_a")
  let mut prev = -1

  // Build base: 100 operations
  for i = 0; i < 100; i = i + 1 {
    let op = oplog.insert("a", prev, -1)
    prev = op.lv
  }
  let base_frontier = oplog.get_frontier()
  let base_branch = Branch::checkout(oplog, base_frontier)

  // Add 100 more operations
  for i = 0; i < 100; i = i + 1 {
    let op = oplog.insert("b", prev, -1)
    prev = op.lv
  }
  let new_frontier = oplog.get_frontier()
  b.bench(fn() {
    let result = base_branch.advance(new_frontier)
    b.keep(result)
  })
}

///|
/// Benchmark: Checkout with concurrent branches (2 agents)
test "branch - checkout with concurrent branches" (b : @bench.T) {
  let oplog_a = @oplog.OpLog::new("agent_a")
  let oplog_b = @oplog.OpLog::new("agent_b")

  // Agent A: 50 operations
  let mut prev_a = -1
  for i = 0; i < 50; i = i + 1 {
    let op = oplog_a.insert("a", prev_a, -1)
    prev_a = op.lv
  }

  // Agent B: 50 operations (need to merge into A)
  let mut prev_b = -1
  for i = 0; i < 50; i = i + 1 {
    let op = oplog_b.insert("b", prev_b, -1)
    prev_b = op.lv
    // Apply to oplog_a
    oplog_a.apply_remote(op)
  }
  let frontier = oplog_a.get_frontier()
  b.bench(fn() {
    let result = Branch::checkout(oplog_a, frontier)
    b.keep(result)
  })
}

///|
/// Benchmark: Checkout with deletes (50% delete rate)
test "branch - checkout with deletes" (b : @bench.T) {
  let oplog = @oplog.OpLog::new("agent_a")
  let mut prev = -1
  let lvs = []

  // Insert 100 characters
  for i = 0; i < 100; i = i + 1 {
    let op = oplog.insert("a", prev, -1)
    lvs.push(op.lv)
    prev = op.lv
  }

  // Delete every other character
  for i = 0; i < lvs.length(); i = i + 2 {
    let _del = oplog.delete(lvs[i])

  }
  let frontier = oplog.get_frontier()
  b.bench(fn() {
    let result = Branch::checkout(oplog, frontier)
    b.keep(result)
  })
}

///|
/// Benchmark: Repeated advance (simulate real-time editing)
test "branch - repeated advance (10 iterations)" (b : @bench.T) {
  let oplog = @oplog.OpLog::new("agent_a")
  let mut prev = -1

  // Build base: 50 operations
  for i = 0; i < 50; i = i + 1 {
    let op = oplog.insert("a", prev, -1)
    prev = op.lv
  }
  b.bench(fn() {
    let mut branch = Branch::checkout(oplog, oplog.get_frontier())

    // Simulate 10 incremental edits
    for _iter = 0; _iter < 10; _iter = _iter + 1 {
      let op = oplog.insert("b", prev, -1)
      prev = op.lv
      branch = branch.advance(oplog.get_frontier())
    }
    b.keep(branch)
  })
}

///|
/// Benchmark: to_text conversion (100 characters)
test "branch - to_text (100 chars)" (b : @bench.T) {
  let oplog = @oplog.OpLog::new("agent_a")
  let mut prev = -1

  // Insert 100 characters
  for i = 0; i < 100; i = i + 1 {
    let op = oplog.insert("a", prev, -1)
    prev = op.lv
  }
  let branch = Branch::checkout(oplog, oplog.get_frontier())
  b.bench(fn() {
    let result = branch.to_text()
    b.keep(result)
  })
}

///|
/// Benchmark: to_text conversion (1000 characters)
test "branch - to_text (1000 chars)" (b : @bench.T) {
  let oplog = @oplog.OpLog::new("agent_a")
  let mut prev = -1

  // Insert 1000 characters
  for i = 0; i < 1000; i = i + 1 {
    let op = oplog.insert("a", prev, -1)
    prev = op.lv
  }
  let branch = Branch::checkout(oplog, oplog.get_frontier())
  b.bench(fn() {
    let result = branch.to_text()
    b.keep(result)
  })
}
