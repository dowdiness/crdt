///|
/// Tests for CausalGraph
test "create empty graph" {
  let graph = CausalGraph::new()
  inspect(graph.get_frontier(), content="[]")
}

///|
test "add single version" {
  let graph = CausalGraph::new()
  let lv = try! graph.add_version([], "agent1")
  inspect(lv, content="0")
  inspect(graph.get_frontier(), content="[0]")
}

///|
test "add version with parent" {
  let graph = CausalGraph::new()
  let lv0 = try! graph.add_version([], "agent1")
  let lv1 = try! graph.add_version([lv0], "agent1")
  inspect(lv1, content="1")
  inspect(graph.get_frontier(), content="[1]")
}

///|
test "lv to raw version conversion" {
  let graph = CausalGraph::new()
  let lv = try! graph.add_version([], "agent1")
  match graph.lv_to_raw(lv) {
    Some(raw) => {
      inspect(raw.agent, content="agent1")
      inspect(raw.seq, content="0")
    }
    None => fail("Expected Some(RawVersion)")
  }
}

///|
test "raw to lv version conversion" {
  let graph = CausalGraph::new()
  ignore(try! graph.add_version([], "agent1"))
  let raw = RawVersion::new("agent1", 0)
  match graph.raw_to_lv(raw) {
    Some(lv_result) => inspect(lv_result, content="0")
    None => fail("Expected Some(LV)")
  }
}

///|
test "concurrent versions create two frontier heads" {
  let graph = CausalGraph::new()
  let lv0 = try! graph.add_version([], "agent1")
  let lv1 = try! graph.add_version([], "agent2") // Concurrent with lv0
  let frontier = graph.get_frontier()
  inspect(frontier.length(), content="2")
  inspect(frontier.contains(lv0), content="true")
  inspect(frontier.contains(lv1), content="true")
}

///|
test "is_ancestor simple case" {
  let graph = CausalGraph::new()
  let lv0 = try! graph.add_version([], "agent1")
  let lv1 = try! graph.add_version([lv0], "agent1")
  inspect(graph.is_ancestor(lv0, lv1), content="true")
  inspect(graph.is_ancestor(lv1, lv0), content="false")
}

///|
test "graph_diff with no overlap" {
  let graph = CausalGraph::new()
  let lv0 = try! graph.add_version([], "agent1")
  let lv1 = try! graph.add_version([lv0], "agent1")
  let lv2 = try! graph.add_version([lv0], "agent2") // Branch from lv0
  let (retreat, advance) = graph.graph_diff([lv1], [lv2])

  // lv1 should be in retreat (not reachable from lv2)
  inspect(retreat.contains(lv1), content="true")
  // lv2 should be in advance (not reachable from lv1)
  inspect(advance.contains(lv2), content="true")
  // lv0 should be in neither (reachable from both)
  inspect(retreat.contains(lv0), content="false")
  inspect(advance.contains(lv0), content="false")
}
