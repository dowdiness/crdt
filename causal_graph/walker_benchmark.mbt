// Benchmarks for event graph walker performance
// Run with: moon bench --package causal_graph --release

///|
/// Benchmark: Walk a linear history (10 operations)
test "walker - linear history (10 ops)" (b : @bench.T) {
  let graph = CausalGraph::new()
  let mut prev = -1
  for i = 0; i < 10; i = i + 1 {
    let parents = if prev == -1 { [] } else { [prev] }
    prev = graph.add_version(parents, "agent_a")
  }
  let frontier = [prev]
  b.bench(fn() {
    let result = graph.walk_from_frontier(frontier)
    b.keep(result)
  })
}

///|
/// Benchmark: Walk a linear history (100 operations)
test "walker - linear history (100 ops)" (b : @bench.T) {
  let graph = CausalGraph::new()
  let mut prev = -1
  for i = 0; i < 100; i = i + 1 {
    let parents = if prev == -1 { [] } else { [prev] }
    prev = graph.add_version(parents, "agent_a")
  }
  let frontier = [prev]
  b.bench(fn() {
    let result = graph.walk_from_frontier(frontier)
    b.keep(result)
  })
}

///|
/// Benchmark: Walk a linear history (1000 operations)
test "walker - linear history (1000 ops)" (b : @bench.T) {
  let graph = CausalGraph::new()
  let mut prev = -1
  for i = 0; i < 1000; i = i + 1 {
    let parents = if prev == -1 { [] } else { [prev] }
    prev = graph.add_version(parents, "agent_a")
  }
  let frontier = [prev]
  b.bench(fn() {
    let result = graph.walk_from_frontier(frontier)
    b.keep(result)
  })
}

///|
/// Benchmark: Walk with concurrent branches (2 agents, 50 ops each)
test "walker - concurrent branches (2 agents x 50)" (b : @bench.T) {
  let graph = CausalGraph::new()

  // Agent A: 50 operations
  let mut prev_a = -1
  for i = 0; i < 50; i = i + 1 {
    let parents = if prev_a == -1 { [] } else { [prev_a] }
    prev_a = graph.add_version(parents, "agent_a")
  }

  // Agent B: 50 operations (concurrent from root)
  let mut prev_b = -1
  for i = 0; i < 50; i = i + 1 {
    let parents = if prev_b == -1 { [] } else { [prev_b] }
    prev_b = graph.add_version(parents, "agent_b")
  }
  let frontier = [prev_a, prev_b]
  b.bench(fn() {
    let result = graph.walk_from_frontier(frontier)
    b.keep(result)
  })
}

///|
/// Benchmark: Walk with many concurrent branches (5 agents, 20 ops each)
test "walker - concurrent branches (5 agents x 20)" (b : @bench.T) {
  let graph = CausalGraph::new()
  let agents = ["agent_a", "agent_b", "agent_c", "agent_d", "agent_e"]
  let frontiers = []
  for agent in agents {
    let mut prev = -1
    for i = 0; i < 20; i = i + 1 {
      let parents = if prev == -1 { [] } else { [prev] }
      prev = graph.add_version(parents, agent)
    }
    frontiers.push(prev)
  }
  b.bench(fn() {
    let result = graph.walk_from_frontier(frontiers)
    b.keep(result)
  })
}

///|
/// Benchmark: Walk with diamond pattern (frequent merges)
test "walker - diamond pattern (50 diamonds)" (b : @bench.T) {
  let graph = CausalGraph::new()
  let mut base = graph.add_version([], "agent_a")

  // Create 50 diamond patterns
  for i = 0; i < 50; i = i + 1 {
    // Split: both agents branch from base
    let left = graph.add_version([base], "agent_a")
    let right = graph.add_version([base], "agent_b")

    // Merge: join both branches
    base = graph.add_version([left, right], "agent_a")
  }
  let frontier = [base]
  b.bench(fn() {
    let result = graph.walk_from_frontier(frontier)
    b.keep(result)
  })
}

///|
/// Benchmark: Diff between close frontiers (advance only)
test "walker - diff advance only (10 new ops)" (b : @bench.T) {
  let graph = CausalGraph::new()

  // Build base: 100 operations
  let mut prev = -1
  for i = 0; i < 100; i = i + 1 {
    let parents = if prev == -1 { [] } else { [prev] }
    prev = graph.add_version(parents, "agent_a")
  }
  let from_frontier = [prev]

  // Add 10 more operations
  for i = 0; i < 10; i = i + 1 {
    prev = graph.add_version([prev], "agent_a")
  }
  let to_frontier = [prev]
  b.bench(fn() {
    let result = graph.diff_frontiers_lvs(from_frontier, to_frontier)
    b.keep(result)
  })
}

///|
/// Benchmark: Diff with concurrent branches
test "walker - diff with concurrent branches" (b : @bench.T) {
  let graph = CausalGraph::new()

  // Common base
  let mut base = -1
  for i = 0; i < 50; i = i + 1 {
    let parents = if base == -1 { [] } else { [base] }
    base = graph.add_version(parents, "agent_a")
  }
  let from_frontier = [base]

  // Branch A: 30 more ops
  let mut branch_a = base
  for i = 0; i < 30; i = i + 1 {
    branch_a = graph.add_version([branch_a], "agent_a")
  }

  // Branch B: 30 concurrent ops
  let mut branch_b = base
  for i = 0; i < 30; i = i + 1 {
    branch_b = graph.add_version([branch_b], "agent_b")
  }
  let to_frontier = [branch_a, branch_b]
  b.bench(fn() {
    let result = graph.diff_frontiers_lvs(from_frontier, to_frontier)
    b.keep(result)
  })
}

///|
/// Benchmark: Walk very large history (10000 operations)
test "walker - large history (10000 ops)" (b : @bench.T) {
  let graph = CausalGraph::new()
  let mut prev = -1
  for i = 0; i < 10000; i = i + 1 {
    let parents = if prev == -1 { [] } else { [prev] }
    prev = graph.add_version(parents, "agent_a")
  }
  let frontier = [prev]
  b.bench(fn() {
    let result = graph.walk_from_frontier(frontier)
    b.keep(result)
  })
}
