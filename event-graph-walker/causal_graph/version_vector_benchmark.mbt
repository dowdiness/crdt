// Benchmarks for version vector performance
// Run with: moon bench --package causal_graph --release

///|
/// Benchmark: Create version vector with 1 agent
test "version_vector - create (1 agent)" (b : @bench.T) {
  b.bench(fn() {
    let result = VersionVector::new().set("agent_a", 100)
    b.keep(result)
  })
}

///|
/// Benchmark: Create version vector with 5 agents
test "version_vector - create (5 agents)" (b : @bench.T) {
  b.bench(fn() {
    let result = VersionVector::new()
      .set("agent_a", 100)
      .set("agent_b", 200)
      .set("agent_c", 150)
      .set("agent_d", 75)
      .set("agent_e", 300)
    b.keep(result)
  })
}

///|
/// Benchmark: Create version vector with 20 agents
test "version_vector - create (20 agents)" (b : @bench.T) {
  b.bench(fn() {
    let mut vv = VersionVector::new()
    for i = 0; i < 20; i = i + 1 {
      let agent = "agent_" + i.to_string()
      vv = vv.set(agent, i * 10)
    }
    b.keep(vv)
  })
}

///|
/// Benchmark: Compare version vectors (5 agents, equal)
test "version_vector - compare equal (5 agents)" (b : @bench.T) {
  let vv1 = VersionVector::new()
    .set("agent_a", 100)
    .set("agent_b", 200)
    .set("agent_c", 150)
    .set("agent_d", 75)
    .set("agent_e", 300)
  let vv2 = VersionVector::new()
    .set("agent_a", 100)
    .set("agent_b", 200)
    .set("agent_c", 150)
    .set("agent_d", 75)
    .set("agent_e", 300)
  b.bench(fn() {
    let result = vv1 == vv2
    b.keep(result)
  })
}

///|
/// Benchmark: Compare version vectors (5 agents, less than)
test "version_vector - compare <= (5 agents)" (b : @bench.T) {
  let vv1 = VersionVector::new()
    .set("agent_a", 100)
    .set("agent_b", 200)
    .set("agent_c", 150)
    .set("agent_d", 75)
    .set("agent_e", 300)
  let vv2 = VersionVector::new()
    .set("agent_a", 150)
    .set("agent_b", 250)
    .set("agent_c", 200)
    .set("agent_d", 100)
    .set("agent_e", 350)
  b.bench(fn() {
    let result = vv1 <= vv2
    b.keep(result)
  })
}

///|
/// Benchmark: Compare version vectors (20 agents)
test "version_vector - compare <= (20 agents)" (b : @bench.T) {
  let mut vv1 = VersionVector::new()
  let mut vv2 = VersionVector::new()
  for i = 0; i < 20; i = i + 1 {
    let agent = "agent_" + i.to_string()
    vv1 = vv1.set(agent, i * 10)
    vv2 = vv2.set(agent, i * 10 + 5)
  }
  b.bench(fn() {
    let result = vv1 <= vv2
    b.keep(result)
  })
}

///|
/// Benchmark: Merge version vectors (5 agents)
test "version_vector - merge (5 agents)" (b : @bench.T) {
  let vv1 = VersionVector::new()
    .set("agent_a", 100)
    .set("agent_b", 200)
    .set("agent_c", 150)
  let vv2 = VersionVector::new()
    .set("agent_b", 180)
    .set("agent_c", 200)
    .set("agent_d", 75)
    .set("agent_e", 300)
  b.bench(fn() {
    let result = vv1.merge(vv2)
    b.keep(result)
  })
}

///|
/// Benchmark: Merge version vectors (20 agents)
test "version_vector - merge (20 agents)" (b : @bench.T) {
  let mut vv1 = VersionVector::new()
  let mut vv2 = VersionVector::new()
  for i = 0; i < 20; i = i + 1 {
    let agent = "agent_" + i.to_string()
    vv1 = vv1.set(agent, i * 10)
    vv2 = vv2.set(agent, i * 10 + 5)
  }
  b.bench(fn() {
    let result = vv1.merge(vv2)
    b.keep(result)
  })
}

///|
/// Benchmark: Check includes (5 agents, frequent checks)
test "version_vector - includes (5 agents)" (b : @bench.T) {
  let vv = VersionVector::new()
    .set("agent_a", 100)
    .set("agent_b", 200)
    .set("agent_c", 150)
    .set("agent_d", 75)
    .set("agent_e", 300)
  b.bench(fn() {
    let result = vv.includes("agent_a", 50) &&
      vv.includes("agent_b", 100) &&
      vv.includes("agent_c", 150) &&
      vv.includes("agent_d", 75) &&
      vv.includes("agent_e", 250)
    b.keep(result)
  })
}

///|
/// Benchmark: Concurrent detection (5 agents)
test "version_vector - concurrent (5 agents)" (b : @bench.T) {
  let vv1 = VersionVector::new()
    .set("agent_a", 100)
    .set("agent_b", 200)
    .set("agent_c", 150)
  let vv2 = VersionVector::new()
    .set("agent_b", 180)
    .set("agent_c", 200)
    .set("agent_d", 75)
  b.bench(fn() {
    let result = vv1.concurrent(vv2)
    b.keep(result)
  })
}

///|
/// Benchmark: Convert from frontier (10 operations)
test "version_vector - from_frontier (10 ops)" (b : @bench.T) {
  let graph = CausalGraph::new()
  let mut prev = -1
  for i = 0; i < 10; i = i + 1 {
    let parents = if prev == -1 { [] } else { [prev] }
    prev = try! graph.add_version(parents, "agent_a")
  }
  let frontier = [prev]
  b.bench(fn() {
    let result = VersionVector::from_frontier(graph, frontier)
    b.keep(result)
  })
}

///|
/// Benchmark: Convert from frontier (100 operations, 5 agents)
test "version_vector - from_frontier (100 ops, 5 agents)" (b : @bench.T) {
  let graph = CausalGraph::new()
  let agents = ["agent_a", "agent_b", "agent_c", "agent_d", "agent_e"]
  let frontiers = []
  for agent in agents {
    let mut prev = -1
    for i = 0; i < 20; i = i + 1 {
      let parents = if prev == -1 { [] } else { [prev] }
      prev = try! graph.add_version(parents, agent)
    }
    frontiers.push(prev)
  }
  b.bench(fn() {
    let result = VersionVector::from_frontier(graph, frontiers)
    b.keep(result)
  })
}

///|
/// Benchmark: Convert to frontier (5 agents)
test "version_vector - to_frontier (5 agents)" (b : @bench.T) {
  let graph = CausalGraph::new()
  let agents = ["agent_a", "agent_b", "agent_c", "agent_d", "agent_e"]
  for agent in agents {
    let mut prev = -1
    for i = 0; i < 20; i = i + 1 {
      let parents = if prev == -1 { [] } else { [prev] }
      prev = try! graph.add_version(parents, agent)
    }
  }
  let vv = VersionVector::new()
    .set("agent_a", 19)
    .set("agent_b", 19)
    .set("agent_c", 19)
    .set("agent_d", 19)
    .set("agent_e", 19)
  b.bench(fn() {
    let result = vv.to_frontier(graph)
    b.keep(result)
  })
}

///|
/// Benchmark: Roundtrip conversion (frontier -> vv -> frontier)
test "version_vector - roundtrip (5 agents)" (b : @bench.T) {
  let graph = CausalGraph::new()
  let agents = ["agent_a", "agent_b", "agent_c", "agent_d", "agent_e"]
  let frontiers = []
  for agent in agents {
    let mut prev = -1
    for i = 0; i < 20; i = i + 1 {
      let parents = if prev == -1 { [] } else { [prev] }
      prev = try! graph.add_version(parents, agent)
    }
    frontiers.push(prev)
  }
  b.bench(fn() {
    let vv = VersionVector::from_frontier(graph, frontiers)
    let result = vv.to_frontier(graph)
    b.keep(result)
  })
}

///|
/// Benchmark: Get agents list (5 agents)
test "version_vector - agents (5 agents)" (b : @bench.T) {
  let vv = VersionVector::new()
    .set("agent_a", 100)
    .set("agent_b", 200)
    .set("agent_c", 150)
    .set("agent_d", 75)
    .set("agent_e", 300)
  b.bench(fn() {
    let result = vv.agents()
    b.keep(result)
  })
}

///|
/// Benchmark: Length calculation (20 agents)
test "version_vector - length (20 agents)" (b : @bench.T) {
  let mut vv = VersionVector::new()
  for i = 0; i < 20; i = i + 1 {
    let agent = "agent_" + i.to_string()
    vv = vv.set(agent, i * 10)
  }
  b.bench(fn() {
    let result = vv.0.length()
    b.keep(result)
  })
}
