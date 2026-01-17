// Benchmarks for branch checkout and advance performance
// Run with: moon bench --package branch --release

///|
/// Benchmark: Checkout small document (10 operations)
test "branch - checkout (10 ops)" (b : @bench.T) {
  let oplog = @oplog.OpLog::new("agent_a")

  // Insert "Hello"
  let _op1 = try! oplog.insert("H", -1, -1)
  let _op2 = try! oplog.insert("e", 0, -1)
  let _op3 = try! oplog.insert("l", 1, -1)
  let _op4 = try! oplog.insert("l", 2, -1)
  let _op5 = try! oplog.insert("o", 3, -1)
  let _op6 = try! oplog.insert(" ", 4, -1)
  let _op7 = try! oplog.insert("W", 5, -1)
  let _op8 = try! oplog.insert("o", 6, -1)
  let _op9 = try! oplog.insert("r", 7, -1)
  let _op10 = try! oplog.insert("d", 8, -1)
  let frontier = oplog.get_frontier()
  b.bench(fn() {
    let result = try! Branch::checkout(oplog, frontier)
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
    let op = try! oplog.insert("a", prev, -1)
    prev = op.lv
  }
  let frontier = oplog.get_frontier()
  b.bench(fn() {
    let result = try! Branch::checkout(oplog, frontier)
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
    let op = try! oplog.insert("a", prev, -1)
    prev = op.lv
  }
  let frontier = oplog.get_frontier()
  b.bench(fn() {
    let result = try! Branch::checkout(oplog, frontier)
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
    let op = try! oplog.insert("a", prev, -1)
    prev = op.lv
  }
  let base_frontier = oplog.get_frontier()
  let base_branch = try! Branch::checkout(oplog, base_frontier)

  // Add 10 more operations
  for i = 0; i < 10; i = i + 1 {
    let op = try! oplog.insert("b", prev, -1)
    prev = op.lv
  }
  let new_frontier = oplog.get_frontier()
  b.bench(fn() {
    let result = try! base_branch.advance(new_frontier)
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
    let op = try! oplog.insert("a", prev, -1)
    prev = op.lv
  }
  let base_frontier = oplog.get_frontier()
  let base_branch = try! Branch::checkout(oplog, base_frontier)

  // Add 100 more operations
  for i = 0; i < 100; i = i + 1 {
    let op = try! oplog.insert("b", prev, -1)
    prev = op.lv
  }
  let new_frontier = oplog.get_frontier()
  b.bench(fn() {
    let result = try! base_branch.advance(new_frontier)
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
    let op = try! oplog_a.insert("a", prev_a, -1)
    prev_a = op.lv
  }

  // Agent B: 50 operations (need to merge into A)
  let mut prev_b = -1
  for i = 0; i < 50; i = i + 1 {
    let op = try! oplog_b.insert("b", prev_b, -1)
    prev_b = op.lv
    // Apply to oplog_a
    ignore(try! oplog_a.apply_remote(op))
  }
  let frontier = oplog_a.get_frontier()
  b.bench(fn() {
    let result = try! Branch::checkout(oplog_a, frontier)
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
    let op = try! oplog.insert("a", prev, -1)
    lvs.push(op.lv)
    prev = op.lv
  }

  // Delete every other character
  for i = 0; i < lvs.length(); i = i + 2 {
    let _del = try! oplog.delete(lvs[i])

  }
  let frontier = oplog.get_frontier()
  b.bench(fn() {
    let result = try! Branch::checkout(oplog, frontier)
    b.keep(result)
  })
}

///|
/// Benchmark: Repeated advance - STEADY STATE (10 iterations)
/// 
/// This measures true steady-state performance by pre-computing all operations
/// and frontiers before the benchmark starts. This gives stable, reproducible
/// results without GC artifacts or memory allocation variance.
///
/// Expected: Low variance (< 10%), stable performance across iterations
test "branch - repeated advance steady-state (10 iterations)" (b : @bench.T) {
  let oplog = @oplog.OpLog::new("agent_a")
  let mut prev = -1

  // Build base: 50 operations BEFORE benchmark
  for i = 0; i < 50; i = i + 1 {
    let op = try! oplog.insert("a", prev, -1)
    prev = op.lv
  }
  let base_frontier = oplog.get_frontier()
  let base_branch = try! Branch::checkout(oplog, base_frontier)

  // Pre-create all future operations and their frontiers BEFORE benchmark
  let future_frontiers = []
  for i = 0; i < 10; i = i + 1 {
    let op = try! oplog.insert("b", prev, -1)
    prev = op.lv
    future_frontiers.push(oplog.get_frontier())
  }

  // Now benchmark: steady-state advancing through pre-computed frontiers
  // No oplog modifications, no branch creation, just pure advance() calls
  b.bench(fn() {
    let mut branch = base_branch // Start from same fixed point

    // Advance through 10 pre-computed frontiers
    for frontier in future_frontiers {
      branch = try! branch.advance(frontier)
    }
    b.keep(branch)
  })
}

///|
/// Benchmark: Repeated advance - ORIGINAL (with oplog mutations)
///
/// This is the original benchmark that modifies oplog inside the loop.
/// Kept for comparison to understand the difference between steady-state
/// and dynamic operation. This benchmark has higher variance due to:
/// - New branch creation each iteration
/// - Oplog modifications during benchmark
/// - Frontier computation overhead
///
/// Expected: High variance (40-60%), shows cost of dynamic operations
test "branch - repeated advance with oplog mutations (10 iterations)" (
  b : @bench.T,
) {
  let oplog = @oplog.OpLog::new("agent_a")
  let mut prev = -1

  // Build base: 50 operations
  for i = 0; i < 50; i = i + 1 {
    let op = try! oplog.insert("a", prev, -1)
    prev = op.lv
  }
  b.bench(fn() {
    let mut branch = try! Branch::checkout(oplog, oplog.get_frontier())

    // Simulate 10 incremental edits with oplog mutations
    for _iter = 0; _iter < 10; _iter = _iter + 1 {
      let op = try! oplog.insert("b", prev, -1) // ← Modifies oplog
      prev = op.lv
      branch = try! branch.advance(oplog.get_frontier()) // ← Dynamic frontier
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
    let op = try! oplog.insert("a", prev, -1)
    prev = op.lv
  }
  let branch = try! Branch::checkout(oplog, oplog.get_frontier())
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
    let op = try! oplog.insert("a", prev, -1)
    prev = op.lv
  }
  let branch = try! Branch::checkout(oplog, oplog.get_frontier())
  b.bench(fn() {
    let result = branch.to_text()
    b.keep(result)
  })
}

///|
/// Benchmark: Single advance operation (small delta)
///
/// Measures the cost of a single advance() operation with small delta (1 new op).
/// This is closer to real-time typing performance.
test "branch - single advance (1 new op)" (b : @bench.T) {
  let oplog = @oplog.OpLog::new("agent_a")
  let mut prev = -1

  // Build base: 100 operations
  for i = 0; i < 100; i = i + 1 {
    let op = try! oplog.insert("a", prev, -1)
    prev = op.lv
  }
  let base_frontier = oplog.get_frontier()
  let base_branch = try! Branch::checkout(oplog, base_frontier)

  // Add 1 operation
  let _op = try! oplog.insert("b", prev, -1)
  let new_frontier = oplog.get_frontier()
  b.bench(fn() {
    let _result = try! base_branch.advance(new_frontier)
    b.keep(_result)
  })
}

///|
/// Benchmark: Single advance operation (large delta)
///
/// Measures the cost of a single advance() operation with large delta (50 new ops).
/// This tests performance for batch updates.
test "branch - single advance (50 new ops)" (b : @bench.T) {
  let oplog = @oplog.OpLog::new("agent_a")
  let mut prev = -1

  // Build base: 100 operations
  for i = 0; i < 100; i = i + 1 {
    let op = try! oplog.insert("a", prev, -1)
    prev = op.lv
  }
  let base_frontier = oplog.get_frontier()
  let base_branch = try! Branch::checkout(oplog, base_frontier)

  // Add 50 operations
  for i = 0; i < 50; i = i + 1 {
    let op = try! oplog.insert("b", prev, -1)
    prev = op.lv
  }
  let new_frontier = oplog.get_frontier()
  b.bench(fn() {
    let _result = try! base_branch.advance(new_frontier)
    b.keep(_result)
  })
}

///|
/// Benchmark: Realistic typing simulation - FAST
///
/// Simulates a user typing one character at a time, advancing branch after each char.
/// This is a realistic steady-state workload with minimal operations per iteration.
///
/// Measures: Average time per character insertion in editing workflow
test "branch - realistic typing (50 chars)" (b : @bench.T) {
  let oplog = @oplog.OpLog::new("user_alice")
  let mut branch = Branch::new(oplog)
  let mut prev = -1

  // Pre-create base document (not part of benchmark)
  for i = 0; i < 20; i = i + 1 {
    let op = try! oplog.insert("x", prev, -1)
    prev = op.lv
  }
  branch = try! Branch::checkout(oplog, oplog.get_frontier())

  // Benchmark: Type 50 characters one at a time
  // This is realistic because:
  // - Each iteration is a single character
  // - Frontier advances incrementally
  // - Branch state persists across iterations
  b.bench(fn() {
    for i = 0; i < 50; i = i + 1 {
      let op = try! oplog.insert("c", prev, -1)
      prev = op.lv
      let new_frontier = oplog.get_frontier()
      branch = try! branch.advance(new_frontier)
    }
    b.keep(branch)
  })
}

///|
/// Benchmark: Concurrent merge scenario
///
/// Simulates two users typing concurrently and then merging branches.
/// Measures performance of advance() with complex frontier transitions.
test "branch - concurrent merge scenario" (b : @bench.T) {
  let oplog = @oplog.OpLog::new("user_alice")
  let mut branch = Branch::new(oplog)
  let mut prev_alice = -1

  // User Alice types 30 chars
  for i = 0; i < 30; i = i + 1 {
    let op = try! oplog.insert("a", prev_alice, -1)
    prev_alice = op.lv
  }
  let alice_frontier = oplog.get_frontier()
  branch = try! Branch::checkout(oplog, alice_frontier)

  // User Bob simulates typing concurrently (via separate oplog simulation)
  // In real scenario, these would come from network as remote operations
  let mut prev_bob = -1
  for i = 0; i < 20; i = i + 1 {
    let op = try! oplog.insert("b", prev_bob, -1)
    prev_bob = op.lv
  }
  let merged_frontier = oplog.get_frontier()
  b.bench(fn() {
    // Advance branch to merged state
    let _merged_branch = try! branch.advance(merged_frontier)
    b.keep(_merged_branch)
  })
}
