// Tests for Event Graph Walker

///|
test "walk empty frontier" {
  let graph = CausalGraph::new()
  let frontier : Array[Int] = []
  let result = graph.walk_from_frontier(frontier)
  inspect(result.length(), content="0")
}

///|
test "walk single operation" {
  let graph = CausalGraph::new()

  // Add single operation with no parents
  let lv0 = graph.add_version([], "agent-1")
  let result = graph.walk_from_frontier([lv0])
  inspect(result.length(), content="1")
  inspect(result[0], content="0")
}

///|
test "walk linear history" {
  let graph = CausalGraph::new()

  // Create linear chain: 0 -> 1 -> 2 -> 3
  let lv0 = graph.add_version([], "agent-1")
  let lv1 = graph.add_version([lv0], "agent-1")
  let lv2 = graph.add_version([lv1], "agent-1")
  let lv3 = graph.add_version([lv2], "agent-1")
  let result = graph.walk_from_frontier([lv3])

  // Should get all operations in order
  inspect(result.length(), content="4")
  inspect(result[0], content="0")
  inspect(result[1], content="1")
  inspect(result[2], content="2")
  inspect(result[3], content="3")
}

///|
test "walk diamond pattern (concurrent operations)" {
  let graph = CausalGraph::new()

  // Create diamond:
  //     0
  //    / \
  //   1   2
  //    \ /
  //     3
  let lv0 = graph.add_version([], "agent-1")
  let lv1 = graph.add_version([lv0], "agent-1")
  let lv2 = graph.add_version([lv0], "agent-2")
  let lv3 = graph.add_version([lv1, lv2], "agent-1")
  let result = graph.walk_from_frontier([lv3])

  // Should get all 4 operations
  inspect(result.length(), content="4")

  // lv0 must come first
  inspect(result[0], content="0")

  // lv1 and lv2 can be in any order (concurrent)
  // but both must come after lv0 and before lv3
  let has_lv1 = result.contains(1)
  let has_lv2 = result.contains(2)
  if not(has_lv1) {
    abort("Result should contain lv1")
  }
  if not(has_lv2) {
    abort("Result should contain lv2")
  }

  // lv3 must come last
  inspect(result[3], content="3")
}

///|
test "walk complex branching" {
  let graph = CausalGraph::new()

  // Create complex graph:
  //       0
  //      / \
  //     1   2
  //     |   |\
  //     3   4 5
  //      \ /
  //       6
  let lv0 = graph.add_version([], "agent-1")
  let lv1 = graph.add_version([lv0], "agent-1")
  let lv2 = graph.add_version([lv0], "agent-2")
  let lv3 = graph.add_version([lv1], "agent-1")
  let lv4 = graph.add_version([lv2], "agent-2")
  let _lv5 = graph.add_version([lv2], "agent-3")
  let lv6 = graph.add_version([lv3, lv4], "agent-1")
  let result = graph.walk_from_frontier([lv6])

  // Should get operations 0,1,2,3,4,6 (not 5, as it's not in the path to 6)
  inspect(result.length(), content="6")

  // Verify lv0 is first
  inspect(result[0], content="0")

  // Verify lv6 is last
  inspect(result[5], content="6")

  // Verify all expected versions are present
  if not(result.contains(0)) {
    abort("Should contain lv0")
  }
  if not(result.contains(1)) {
    abort("Should contain lv1")
  }
  if not(result.contains(2)) {
    abort("Should contain lv2")
  }
  if not(result.contains(3)) {
    abort("Should contain lv3")
  }
  if not(result.contains(4)) {
    abort("Should contain lv4")
  }

  // lv5 should NOT be present (not in path to lv6)
  if result.contains(5) {
    abort("Should NOT contain lv5")
  }
}

///|
test "walk with multiple frontier versions" {
  let graph = CausalGraph::new()

  // Create divergent branches:
  //     0
  //    / \
  //   1   2
  //   |   |
  //   3   4
  let lv0 = graph.add_version([], "agent-1")
  let lv1 = graph.add_version([lv0], "agent-1")
  let lv2 = graph.add_version([lv0], "agent-2")
  let lv3 = graph.add_version([lv1], "agent-1")
  let lv4 = graph.add_version([lv2], "agent-2")

  // Walk from frontier [3, 4] (both branches)
  let result = graph.walk_from_frontier([lv3, lv4])

  // Should get all operations
  inspect(result.length(), content="5")

  // lv0 should be first
  inspect(result[0], content="0")

  // All versions should be present
  for i = 0; i < 5; i = i + 1 {
    if not(result.contains(i)) {
      abort("Should contain lv\{i}")
    }
  }
}

///|
test "diff_frontiers_lvs for incremental update" {
  let graph = CausalGraph::new()

  // Create initial operations
  let _lv0 = graph.add_version([], "agent-1")
  let _lv1 = graph.add_version([0], "agent-1")
  let frontier1 = graph.get_frontier()

  // Add more operations
  let _lv2 = graph.add_version([1], "agent-1")
  let _lv3 = graph.add_version([2], "agent-1")
  let frontier2 = graph.get_frontier()

  // Calculate diff
  let (retreat_lvs, advance_lvs) = graph.diff_frontiers_lvs(
    frontier1, frontier2,
  )

  // No retreat LVs (moving forward)
  inspect(retreat_lvs.length(), content="0")

  // Should have 2 advance LVs
  inspect(advance_lvs.length(), content="2")

  // Verify advance LVs are correct (2 and 3)
  inspect(advance_lvs[0], content="2")
  inspect(advance_lvs[1], content="3")
}

///|
test "topological sort determinism" {
  // Test that concurrent operations have deterministic ordering
  let graph = CausalGraph::new()

  // Create concurrent operations with same parent
  let lv0 = graph.add_version([], "agent-1")
  let lv1 = graph.add_version([lv0], "agent-2")
  let lv2 = graph.add_version([lv0], "agent-3")
  let lv3 = graph.add_version([lv0], "agent-1")
  let result = graph.walk_from_frontier([lv1, lv2, lv3])

  // lv0 must be first
  inspect(result[0], content="0")

  // Concurrent operations (1, 2, 3) should be sorted by LV for determinism
  inspect(result[1], content="1")
  inspect(result[2], content="2")
  inspect(result[3], content="3")
}
