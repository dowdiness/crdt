// Benchmarks for operation log performance
// Run with: moon bench --package oplog --release

///|
/// Benchmark: Insert operations (linear, 100 ops)
test "oplog - insert (100 ops)" (b : @bench.T) {
  b.bench(fn() {
    let oplog = OpLog::new("agent_a")
    let mut prev = -1
    for i = 0; i < 100; i = i + 1 {
      let op = oplog.insert("a", prev, -1)
      prev = op.lv
    }
    b.keep(oplog)
  })
}

///|
/// Benchmark: Insert operations (linear, 1000 ops)
test "oplog - insert (1000 ops)" (b : @bench.T) {
  b.bench(fn() {
    let oplog = OpLog::new("agent_a")
    let mut prev = -1
    for i = 0; i < 1000; i = i + 1 {
      let op = oplog.insert("a", prev, -1)
      prev = op.lv
    }
    b.keep(oplog)
  })
}

///|
/// Benchmark: Insert and delete mix (50% delete rate)
test "oplog - insert and delete mix (100 ops)" (b : @bench.T) {
  b.bench(fn() {
    let oplog = OpLog::new("agent_a")
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
    b.keep(oplog)
  })
}

///|
/// Benchmark: Apply remote operations (50 ops)
test "oplog - apply_remote (50 ops)" (b : @bench.T) {
  // Pre-create remote operations
  let remote_oplog = OpLog::new("agent_b")
  let mut prev = -1
  let remote_ops = []
  for i = 0; i < 50; i = i + 1 {
    let op = remote_oplog.insert("b", prev, -1)
    remote_ops.push(op)
    prev = op.lv
  }
  b.bench(fn() {
    let oplog = OpLog::new("agent_a")
    for op in remote_ops {
      ignore(oplog.apply_remote(op))
    }
    b.keep(oplog)
  })
}

///|
/// Benchmark: Get operation by LV (from 1000 ops)
test "oplog - get_op (1000 ops)" (b : @bench.T) {
  let oplog = OpLog::new("agent_a")
  let mut prev = -1
  for i = 0; i < 1000; i = i + 1 {
    let op = oplog.insert("a", prev, -1)
    prev = op.lv
  }
  b.bench(fn() {
    // Get operations at various positions
    let op1 = oplog.get_op(0)
    let op2 = oplog.get_op(500)
    let op3 = oplog.get_op(999)
    b.keep((op1, op2, op3))
  })
}

///|
/// Benchmark: Get frontier (single agent)
test "oplog - get_frontier (single agent)" (b : @bench.T) {
  let oplog = OpLog::new("agent_a")
  let mut prev = -1
  for i = 0; i < 100; i = i + 1 {
    let op = oplog.insert("a", prev, -1)
    prev = op.lv
  }
  b.bench(fn() {
    let result = oplog.get_frontier()
    b.keep(result)
  })
}

///|
/// Benchmark: Get frontier (multiple agents merged)
test "oplog - get_frontier (5 agents)" (b : @bench.T) {
  let oplog = OpLog::new("agent_main")

  // Merge operations from 5 agents
  let agents = ["agent_a", "agent_b", "agent_c", "agent_d", "agent_e"]
  for agent in agents {
    let remote_oplog = OpLog::new(agent)
    let mut prev = -1
    for i = 0; i < 20; i = i + 1 {
      let op = remote_oplog.insert(agent, prev, -1)
      ignore(oplog.apply_remote(op))
      prev = op.lv
    }
  }
  b.bench(fn() {
    let result = oplog.get_frontier()
    b.keep(result)
  })
}

///|
/// Benchmark: Walk and collect operations (100 ops)
test "oplog - walk_and_collect (100 ops)" (b : @bench.T) {
  let oplog = OpLog::new("agent_a")
  let mut prev = -1
  for i = 0; i < 100; i = i + 1 {
    let op = oplog.insert("a", prev, -1)
    prev = op.lv
  }
  let frontier = oplog.get_frontier()
  b.bench(fn() {
    let result = oplog.walk_and_collect(frontier)
    b.keep(result)
  })
}

///|
/// Benchmark: Walk and collect with concurrent branches
test "oplog - walk_and_collect (concurrent)" (b : @bench.T) {
  let oplog = OpLog::new("agent_main")

  // Create two concurrent branches
  let oplog_a = OpLog::new("agent_a")
  let mut prev_a = -1
  for i = 0; i < 50; i = i + 1 {
    let op = oplog_a.insert("a", prev_a, -1)
    ignore(oplog.apply_remote(op))
    prev_a = op.lv
  }
  let oplog_b = OpLog::new("agent_b")
  let mut prev_b = -1
  for i = 0; i < 50; i = i + 1 {
    let op = oplog_b.insert("b", prev_b, -1)
    ignore(oplog.apply_remote(op))
    prev_b = op.lv
  }
  let frontier = oplog.get_frontier()
  b.bench(fn() {
    let result = oplog.walk_and_collect(frontier)
    b.keep(result)
  })
}

///|
/// Benchmark: Diff and collect (advance 20 ops)
test "oplog - diff_and_collect (advance 20)" (b : @bench.T) {
  let oplog = OpLog::new("agent_a")
  let mut prev = -1

  // Build base: 100 operations
  for i = 0; i < 100; i = i + 1 {
    let op = oplog.insert("a", prev, -1)
    prev = op.lv
  }
  let from_frontier = oplog.get_frontier()

  // Add 20 more operations
  for i = 0; i < 20; i = i + 1 {
    let op = oplog.insert("b", prev, -1)
    prev = op.lv
  }
  let to_frontier = oplog.get_frontier()
  b.bench(fn() {
    let result = oplog.diff_and_collect(from_frontier, to_frontier)
    b.keep(result)
  })
}

///|
/// Benchmark: Walk filtered (filter inserts only)
test "oplog - walk_filtered (inserts only)" (b : @bench.T) {
  let oplog = OpLog::new("agent_a")
  let mut prev = -1
  let lvs = []

  // Insert 50 characters
  for i = 0; i < 50; i = i + 1 {
    let op = oplog.insert("a", prev, -1)
    lvs.push(op.lv)
    prev = op.lv
  }

  // Delete 25 characters
  for i = 0; i < 25; i = i + 1 {
    let _del = oplog.delete(lvs[i])

  }
  let frontier = oplog.get_frontier()
  b.bench(fn() {
    let result = oplog.walk_filtered(frontier, fn(op) {
      match op.content {
        Insert(_) => true
        Delete => false
      }
    })
    b.keep(result)
  })
}

///|
/// Benchmark: Sequential inserts (simulate typing, 500 chars)
test "oplog - sequential typing (500 chars)" (b : @bench.T) {
  b.bench(fn() {
    let oplog = OpLog::new("agent_a")
    let mut prev = -1

    // Simulate typing a 500-character document
    for i = 0; i < 500; i = i + 1 {
      let op = oplog.insert("x", prev, -1)
      prev = op.lv
    }
    b.keep(oplog)
  })
}

///|
/// Benchmark: Random position inserts (simulate editing)
test "oplog - random position inserts (100 ops)" (b : @bench.T) {
  b.bench(fn() {
    let oplog = OpLog::new("agent_a")
    let lvs = []

    // Insert at various positions
    for i = 0; i < 100; i = i + 1 {
      let pos = if lvs.length() == 0 { -1 } else { lvs[i % lvs.length()] }
      let op = oplog.insert("x", pos, -1)
      lvs.push(op.lv)
    }
    b.keep(oplog)
  })
}
