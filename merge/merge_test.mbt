///| Tests for merge module

///|
test "merge_remote_ops - basic concurrent inserts" {
  // Create two agents
  let oplog_a = @oplog.OpLog::new("agent_a")
  let tree_a = @fugue.FugueTree::new()
  let oplog_b = @oplog.OpLog::new("agent_b")
  let tree_b = @fugue.FugueTree::new()

  // Agent A inserts "He"
  let op_a1 = oplog_a.insert("H", -1, -1)
  tree_a.insert(
    op_a1.lv,
    "H",
    op_a1.origin_left,
    op_a1.origin_right,
    0,
    "agent_a",
  )
  let op_a2 = oplog_a.insert("e", op_a1.lv, -1)
  tree_a.insert(
    op_a2.lv,
    "e",
    op_a2.origin_left,
    op_a2.origin_right,
    1,
    "agent_a",
  )

  // Agent B concurrently inserts "Wo" (starting from same state)
  let op_b1 = oplog_b.insert("W", -1, -1)
  tree_b.insert(
    op_b1.lv,
    "W",
    op_b1.origin_left,
    op_b1.origin_right,
    0,
    "agent_b",
  )
  let op_b2 = oplog_b.insert("o", op_b1.lv, -1)
  tree_b.insert(
    op_b2.lv,
    "o",
    op_b2.origin_left,
    op_b2.origin_right,
    1,
    "agent_b",
  )

  // Now merge B's operations into A
  let ops_from_b = [op_b1, op_b2]
  merge_remote_ops(tree_a, oplog_a, ops_from_b)

  // Both agents should converge
  let text_a = tree_a.to_text()
  inspect(text_a, content="HeWo") // FugueMax ordering: agent_a comes before agent_b

  // Merge A's operations into B
  let ops_from_a = [op_a1, op_a2]
  merge_remote_ops(tree_b, oplog_b, ops_from_a)
  let text_b = tree_b.to_text()
  inspect(text_b, content="HeWo") // Should converge to same result
}

///|
test "merge_remote_ops - insert and delete" {
  let oplog_a = @oplog.OpLog::new("agent_a")
  let tree_a = @fugue.FugueTree::new()
  let oplog_b = @oplog.OpLog::new("agent_b")
  let tree_b = @fugue.FugueTree::new()

  // Agent A inserts "ABC"
  let op_a1 = oplog_a.insert("A", -1, -1)
  tree_a.insert(
    op_a1.lv,
    "A",
    op_a1.origin_left,
    op_a1.origin_right,
    0,
    "agent_a",
  )
  let op_a2 = oplog_a.insert("B", op_a1.lv, -1)
  tree_a.insert(
    op_a2.lv,
    "B",
    op_a2.origin_left,
    op_a2.origin_right,
    1,
    "agent_a",
  )
  let op_a3 = oplog_a.insert("C", op_a2.lv, -1)
  tree_a.insert(
    op_a3.lv,
    "C",
    op_a3.origin_left,
    op_a3.origin_right,
    2,
    "agent_a",
  )

  // Agent B gets A's state
  let ops_from_a = [op_a1, op_a2, op_a3]
  merge_remote_ops(tree_b, oplog_b, ops_from_a)
  inspect(tree_b.to_text(), content="ABC")

  // Agent B deletes "B"
  let op_b1 = oplog_b.delete(op_a2.lv)
  tree_b.delete(op_b1.origin_left)
  inspect(tree_b.to_text(), content="AC")

  // Merge B's delete back to A
  let ops_from_b = [op_b1]
  merge_remote_ops(tree_a, oplog_a, ops_from_b)
  inspect(tree_a.to_text(), content="AC")

  // Verify both converged
  inspect(tree_b.to_text(), content="AC")
}

///|
test "merge - simple merge using graph_diff" {
  let oplog = @oplog.OpLog::new("agent_a")
  let tree = @fugue.FugueTree::new()

  // Insert "Hello"
  let op1 = oplog.insert("H", -1, -1)
  tree.insert(op1.lv, "H", op1.origin_left, op1.origin_right, 0, "agent_a")
  let op2 = oplog.insert("e", op1.lv, -1)
  tree.insert(op2.lv, "e", op2.origin_left, op2.origin_right, 1, "agent_a")
  let frontier_before = oplog.get_frontier()
  let text_before = tree.to_text()
  inspect(text_before, content="He")

  // Add more operations
  let op3 = oplog.insert("l", op2.lv, -1)
  tree.insert(op3.lv, "l", op3.origin_left, op3.origin_right, 2, "agent_a")
  let op4 = oplog.insert("l", op3.lv, -1)
  tree.insert(op4.lv, "l", op4.origin_left, op4.origin_right, 3, "agent_a")
  let op5 = oplog.insert("o", op4.lv, -1)
  tree.insert(op5.lv, "o", op5.origin_left, op5.origin_right, 4, "agent_a")
  let frontier_after = oplog.get_frontier()
  let text_after = tree.to_text()
  inspect(text_after, content="Hello")

  // Now use merge to go from frontier_before to frontier_after
  // This should give us the same result
  let tree2 = @fugue.FugueTree::new()

  // First apply operations up to frontier_before
  tree2.insert(op1.lv, "H", op1.origin_left, op1.origin_right, 0, "agent_a")
  tree2.insert(op2.lv, "e", op2.origin_left, op2.origin_right, 1, "agent_a")

  // Then merge to frontier_after
  merge(tree2, oplog, frontier_before, frontier_after)
  let merged_text = tree2.to_text()
  inspect(merged_text, content="Hello")
}
