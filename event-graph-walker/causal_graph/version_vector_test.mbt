///| Tests for VersionVector

///|
test "create empty version vector" {
  let vv = VersionVector::new()
  inspect(vv.is_empty(), content="true")
  inspect(vv.size(), content="0")
  inspect(vv.to_string(), content="{}")
}

///|
test "set and get version" {
  let vv = VersionVector::new()
  let vv = vv.set("alice", 5)
  inspect(vv.get("alice"), content="Some(5)")
  inspect(vv.get("bob"), content="None")
}

///|
test "increment version" {
  let vv = VersionVector::new()
  let vv = vv.increment("alice")
  inspect(vv.get("alice"), content="Some(0)")
  let vv = vv.increment("alice")
  inspect(vv.get("alice"), content="Some(1)")
  let vv = vv.increment("alice")
  inspect(vv.get("alice"), content="Some(2)")
}

///|
test "multiple agents" {
  let vv = VersionVector::new()
  let vv = vv.set("alice", 3)
  let vv = vv.set("bob", 7)
  let vv = vv.set("charlie", 2)
  inspect(vv.size(), content="3")
  inspect(vv.get("alice"), content="Some(3)")
  inspect(vv.get("bob"), content="Some(7)")
  inspect(vv.get("charlie"), content="Some(2)")
}

///|
test "merge version vectors - no overlap" {
  let vv1 = VersionVector::new().set("alice", 5)
  let vv2 = VersionVector::new().set("bob", 3)
  let merged = vv1.merge(vv2)
  inspect(merged.get("alice"), content="Some(5)")
  inspect(merged.get("bob"), content="Some(3)")
}

///|
test "merge version vectors - with overlap" {
  let vv1 = VersionVector::new().set("alice", 5).set("bob", 2)
  let vv2 = VersionVector::new().set("alice", 3).set("bob", 7)
  let merged = vv1.merge(vv2)
  inspect(merged.get("alice"), content="Some(5)")
  inspect(merged.get("bob"), content="Some(7)")
}

///|
test "version vector equality - equal" {
  let vv1 = VersionVector::new().set("alice", 5).set("bob", 3)
  let vv2 = VersionVector::new().set("alice", 5).set("bob", 3)
  inspect(vv1 == vv2, content="true")
}

///|
test "version vector equality - not equal" {
  let vv1 = VersionVector::new().set("alice", 5).set("bob", 3)
  let vv2 = VersionVector::new().set("alice", 5).set("bob", 4)
  inspect(vv1 == vv2, content="false")
}

///|
test "version vector equality - different agents" {
  let vv1 = VersionVector::new().set("alice", 5)
  let vv2 = VersionVector::new().set("bob", 5)
  inspect(vv1 == vv2, content="false")
}

///|
test "version vector less than or equal - true" {
  let vv1 = VersionVector::new().set("alice", 3).set("bob", 2)
  let vv2 = VersionVector::new().set("alice", 5).set("bob", 4)
  inspect(vv1 <= vv2, content="true")
}

///|
test "version vector less than or equal - false" {
  let vv1 = VersionVector::new().set("alice", 6).set("bob", 2)
  let vv2 = VersionVector::new().set("alice", 5).set("bob", 4)
  inspect(vv1 <= vv2, content="false")
}

///|
test "version vector less than or equal - equal is le" {
  let vv1 = VersionVector::new().set("alice", 5).set("bob", 3)
  let vv2 = VersionVector::new().set("alice", 5).set("bob", 3)
  inspect(vv1 <= vv2, content="true")
}

///|
test "version vector less than or equal - missing agent" {
  let vv1 = VersionVector::new().set("alice", 5).set("bob", 3)
  let vv2 = VersionVector::new().set("alice", 5)
  inspect(vv1 <= vv2, content="false")
}

///|
test "version vector concurrent - true" {
  let vv1 = VersionVector::new().set("alice", 5).set("bob", 2)
  let vv2 = VersionVector::new().set("alice", 3).set("bob", 7)
  inspect(vv1.concurrent(vv2), content="true")
}

///|
test "version vector concurrent - false when one is ancestor" {
  let vv1 = VersionVector::new().set("alice", 3).set("bob", 2)
  let vv2 = VersionVector::new().set("alice", 5).set("bob", 4)
  inspect(vv1.concurrent(vv2), content="false")
}

///|
test "version vector includes version - true" {
  let vv = VersionVector::new().set("alice", 5).set("bob", 3)
  inspect(vv.includes("alice", 3), content="true")
  inspect(vv.includes("alice", 5), content="true")
  inspect(vv.includes("bob", 0), content="true")
}

///|
test "version vector includes version - false" {
  let vv = VersionVector::new().set("alice", 5).set("bob", 3)
  inspect(vv.includes("alice", 6), content="false")
  inspect(vv.includes("charlie", 0), content="false")
}

///|
test "version vector to string" {
  let vv = VersionVector::new().set("alice", 5).set("bob", 3).set("charlie", 7)
  // Note: order may vary, so we just check it contains the right format
  let str = vv.to_string()
  inspect(str.contains("\"alice\": 5"), content="true")
  inspect(str.contains("\"bob\": 3"), content="true")
  inspect(str.contains("\"charlie\": 7"), content="true")
}

///|
test "from_frontier - simple linear history" {
  let graph = CausalGraph::new()
  let lv0 = try! graph.add_version([], "alice")
  let lv1 = try! graph.add_version([lv0], "alice")
  let lv2 = try! graph.add_version([lv1], "alice")
  let frontier = [lv2]
  let vv = VersionVector::from_frontier(graph, frontier)
  inspect(vv.get("alice"), content="Some(2)")
}

///|
test "from_frontier - multiple agents" {
  let graph = CausalGraph::new()
  let lv0 = try! graph.add_version([], "alice")
  let lv1 = try! graph.add_version([lv0], "alice")
  let lv2 = try! graph.add_version([], "bob")
  let lv3 = try! graph.add_version([lv2], "bob")
  let frontier = [lv1, lv3]
  let vv = VersionVector::from_frontier(graph, frontier)
  inspect(vv.get("alice"), content="Some(1)")
  inspect(vv.get("bob"), content="Some(1)")
}

///|
test "from_frontier - concurrent branches" {
  let graph = CausalGraph::new()
  let lv0 = try! graph.add_version([], "alice")
  let lv1 = try! graph.add_version([lv0], "alice")
  let lv2 = try! graph.add_version([lv0], "bob")
  let lv3 = try! graph.add_version([lv2], "bob")
  let frontier = [lv1, lv3]
  let vv = VersionVector::from_frontier(graph, frontier)
  inspect(vv.get("alice"), content="Some(1)")
  inspect(vv.get("bob"), content="Some(1)")
}

///|
test "to_frontier - single agent" {
  let graph = CausalGraph::new()
  let lv0 = try! graph.add_version([], "alice")
  let lv1 = try! graph.add_version([lv0], "alice")
  let lv2 = try! graph.add_version([lv1], "alice")
  let vv = VersionVector::new().set("alice", 2)
  let frontier = vv.to_frontier(graph)
  inspect(frontier.length(), content="1")
  inspect(frontier.contains(lv2), content="true")
}

///|
test "to_frontier - multiple agents" {
  let graph = CausalGraph::new()
  let lv0 = try! graph.add_version([], "alice")
  let lv1 = try! graph.add_version([lv0], "alice")
  let lv2 = try! graph.add_version([], "bob")
  let lv3 = try! graph.add_version([lv2], "bob")
  let vv = VersionVector::new().set("alice", 1).set("bob", 1)
  let frontier = vv.to_frontier(graph)
  inspect(frontier.length(), content="2")
  inspect(frontier.contains(lv1), content="true")
  inspect(frontier.contains(lv3), content="true")
}

///|
test "roundtrip - frontier to version vector and back" {
  let graph = CausalGraph::new()
  let lv0 = try! graph.add_version([], "alice")
  let lv1 = try! graph.add_version([lv0], "alice")
  let lv2 = try! graph.add_version([], "bob")
  let lv3 = try! graph.add_version([lv2], "bob")
  let lv4 = try! graph.add_version([lv1, lv3], "charlie")
  let original_frontier = [lv4]
  let vv = VersionVector::from_frontier(graph, original_frontier)
  let recovered_frontier = vv.to_frontier(graph)

  // The recovered frontier should be equivalent to the original
  // (it might be a different LV set, but represents the same version vector)
  let vv2 = VersionVector::from_frontier(graph, recovered_frontier)
  inspect(vv == vv2, content="true")
}

///|
test "version vector agents" {
  let vv = VersionVector::new().set("alice", 5).set("bob", 3).set("charlie", 7)
  let agents = vv.agents()
  inspect(agents.length(), content="3")
  inspect(agents.contains("alice"), content="true")
  inspect(agents.contains("bob"), content="true")
  inspect(agents.contains("charlie"), content="true")
}

///|
test "version vector to_json" {
  let vv = VersionVector::new().set("alice", 5).set("bob", 3)
  let json = vv.to_json()
  // Should be a JSON object with string keys and int values
  // Note: order may vary, so we check it contains the expected data
  let json_str = json.stringify()
  inspect(json_str.contains("alice"), content="true")
  inspect(json_str.contains("bob"), content="true")
}

///|
test "version vector json stringify" {
  let original = VersionVector::new()
    .set("alice", 5)
    .set("bob", 3)
    .set("charlie", 7)
  let json = original.to_json()
  let json_str = json.stringify()
  // Check that the JSON contains all the expected agents and values
  inspect(json_str.contains("alice"), content="true")
  inspect(json_str.contains("bob"), content="true")
  inspect(json_str.contains("charlie"), content="true")
}
