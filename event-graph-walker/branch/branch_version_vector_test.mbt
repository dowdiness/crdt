///| Tests for Branch integration with VersionVector

///|
test "branch get_version_vector - empty" {
  let oplog = @oplog.OpLog::new("alice")
  let branch = Branch::new(oplog)
  let vv = branch.get_version_vector()
  inspect(vv.is_empty(), content="true")
}

///|
test "branch get_version_vector - single agent" {
  let oplog = @oplog.OpLog::new("alice")
  ignore(try! oplog.insert("x", -1, -1))
  ignore(try! oplog.insert("y", 0, -1))
  ignore(try! oplog.insert("z", 1, -1))
  let branch = Branch::from_tree_and_oplog(@fugue.FugueTree::new(), oplog)
  let vv = branch.get_version_vector()
  inspect(vv.get("alice"), content="Some(2)")
}

///|
test "branch get_version_vector - multiple agents" {
  let oplog = @oplog.OpLog::new("alice")
  ignore(try! oplog.insert("a", -1, -1))
  ignore(try! oplog.insert("c", 0, -1))

  // Simulate bob's operations
  let oplog_bob = @oplog.OpLog::new("bob")
  ignore(try! oplog_bob.insert("b", -1, -1))
  ignore(try! oplog_bob.insert("d", 0, -1))

  // Merge bob's operations into alice's oplog
  let bob_ops = oplog_bob.get_all_ops()
  let branch = Branch::from_tree_and_oplog(@fugue.FugueTree::new(), oplog)
  let branch = try! branch.merge_remote_ops(bob_ops)
  let vv = branch.get_version_vector()
  inspect(vv.get("alice"), content="Some(1)")
  inspect(vv.get("bob"), content="Some(1)")
}

///|
test "branch at_version_vector - true" {
  let oplog = @oplog.OpLog::new("alice")
  ignore(try! oplog.insert("a", -1, -1))
  let branch = Branch::from_tree_and_oplog(@fugue.FugueTree::new(), oplog)
  let vv = @causal_graph.VersionVector::new().set("alice", 0)
  inspect(branch.at_version_vector(vv), content="true")
}

///|
test "branch at_version_vector - false" {
  let oplog = @oplog.OpLog::new("alice")
  ignore(try! oplog.insert("a", -1, -1))
  let branch = Branch::from_tree_and_oplog(@fugue.FugueTree::new(), oplog)
  let vv = @causal_graph.VersionVector::new().set("alice", 1)
  inspect(branch.at_version_vector(vv), content="false")
}

///|
test "branch checkout_version_vector" {
  let oplog = @oplog.OpLog::new("alice")
  ignore(try! oplog.insert("h", -1, -1))
  ignore(try! oplog.insert("e", 0, -1))
  ignore(try! oplog.insert("l", 1, -1))
  ignore(try! oplog.insert("l", 2, -1))
  ignore(try! oplog.insert("o", 3, -1))

  // Checkout at alice:2 (should have "hel")
  let vv = @causal_graph.VersionVector::new().set("alice", 2)
  let branch = try! Branch::checkout_version_vector(oplog, vv)
  inspect(branch.to_text(), content="hel")
}

///|
test "branch advance_to_version_vector" {
  let oplog = @oplog.OpLog::new("alice")
  ignore(try! oplog.insert("h", -1, -1))
  ignore(try! oplog.insert("e", 0, -1))

  // Start with a branch at alice:1
  let vv1 = @causal_graph.VersionVector::new().set("alice", 1)
  let branch = try! Branch::checkout_version_vector(oplog, vv1)
  inspect(branch.to_text(), content="he")

  // Add more operations
  ignore(try! oplog.insert("l", 1, -1))
  ignore(try! oplog.insert("l", 2, -1))
  ignore(try! oplog.insert("o", 3, -1))

  // Advance to alice:4
  let vv2 = @causal_graph.VersionVector::new().set("alice", 4)
  let branch = try! branch.advance_to_version_vector(vv2)
  inspect(branch.to_text(), content="hello")
}

///|
test "version vector roundtrip with branch" {
  let oplog = @oplog.OpLog::new("alice")
  ignore(try! oplog.insert("a", -1, -1))
  ignore(try! oplog.insert("b", 0, -1))
  ignore(try! oplog.insert("c", 1, -1))

  // Checkout branch at current frontier
  let frontier = oplog.get_frontier()
  let branch = try! Branch::checkout(oplog, frontier)
  let vv = branch.get_version_vector()

  // Create new branch from version vector
  let branch2 = try! Branch::checkout_version_vector(oplog, vv)

  // Should have same text
  inspect(branch.to_text() == branch2.to_text(), content="true")
}

///|
test "version vector efficiency - many operations from same agent" {
  let oplog = @oplog.OpLog::new("alice")

  // Add 100 operations from same agent
  let mut last_lv = -1
  for i = 0; i < 100; i = i + 1 {
    let op = try! oplog.insert("x", last_lv, -1)
    last_lv = op.lv
  }
  let branch = Branch::from_tree_and_oplog(@fugue.FugueTree::new(), oplog)

  // Regular frontier would have 1 LV
  let frontier = branch.get_frontier()
  inspect(frontier.length(), content="1")

  // Version vector is even more compact - just one entry
  let vv = branch.get_version_vector()
  inspect(vv.size(), content="1")
  inspect(vv.get("alice"), content="Some(99)")
}

///|
test "version vector with concurrent operations" {
  let oplog = @oplog.OpLog::new("alice")

  // Alice makes some operations
  ignore(try! oplog.insert("a", -1, -1))
  ignore(try! oplog.insert("b", 0, -1))

  // Bob makes concurrent operations (starting from empty)
  let oplog2 = @oplog.OpLog::new("bob")
  ignore(try! oplog2.insert("x", -1, -1))
  ignore(try! oplog2.insert("y", 0, -1))

  // Merge bob's operations into alice's oplog
  let bob_ops = oplog2.get_all_ops()
  let branch = Branch::from_tree_and_oplog(@fugue.FugueTree::new(), oplog)
  let branch = try! branch.merge_remote_ops(bob_ops)

  // Version vector should have both agents at their latest seq
  let vv = branch.get_version_vector()
  inspect(vv.get("alice"), content="Some(1)")
  inspect(vv.get("bob"), content="Some(1)")
}
