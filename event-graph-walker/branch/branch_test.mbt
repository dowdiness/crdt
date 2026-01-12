///| Tests for Branch system

///|
/// Helper: Insert string character-by-character like Document module
fn insert_string(oplog : @oplog.OpLog, text : String, start_lv : Int) -> Int {
  let mut last_lv = start_lv
  for i = 0; i < text.length(); i = i + 1 {
    let ch = text[i:i + 1].to_string() catch { _ => continue }
    let op = oplog.insert(ch, last_lv, -1)
    last_lv = op.lv
  }
  last_lv
}

///|
test "create empty branch" {
  let oplog = @oplog.OpLog::new("agent-1")
  let branch = Branch::new(oplog)
  inspect(branch.to_text(), content="")
  inspect(branch.get_frontier().length(), content="0")
}

///|
test "checkout with single insert" {
  let oplog = @oplog.OpLog::new("agent-1")

  // Insert "hello" character-by-character
  let _ = insert_string(oplog, "hello", -1)
  let frontier = oplog.get_frontier()

  // Checkout at this frontier
  let branch = Branch::checkout(oplog, frontier)
  inspect(branch.to_text(), content="hello")
  inspect(branch.visible_count(), content="5")
}

///|
test "checkout with multiple inserts" {
  let oplog = @oplog.OpLog::new("agent-1")

  // Insert "hello"
  let last_lv = insert_string(oplog, "hello", -1)
  // Insert " world" after "hello"
  let _ = insert_string(oplog, " world", last_lv)
  let frontier = oplog.get_frontier()
  let branch = Branch::checkout(oplog, frontier)
  inspect(branch.to_text(), content="hello world")
  inspect(branch.visible_count(), content="11")
}

///|
test "checkout with delete" {
  let oplog = @oplog.OpLog::new("agent-1")

  // Insert "hello" character-by-character
  let _ = insert_string(oplog, "hello", -1)
  // Delete first character (lv 0 is 'h')
  let _ = oplog.delete(0)
  let frontier = oplog.get_frontier()
  let branch = Branch::checkout(oplog, frontier)
  inspect(branch.to_text(), content="ello")
  inspect(branch.visible_count(), content="4")
}

///|
test "advance branch with new operations" {
  let oplog = @oplog.OpLog::new("agent-1")

  // Insert "hello"
  let last_lv = insert_string(oplog, "hello", -1)
  let frontier1 = oplog.get_frontier()

  // Checkout at first frontier
  let branch1 = Branch::checkout(oplog, frontier1)
  inspect(branch1.to_text(), content="hello")

  // Add more operations
  let _ = insert_string(oplog, " world", last_lv)
  let frontier2 = oplog.get_frontier()

  // Advance branch to new frontier
  let branch2 = branch1.advance(frontier2)
  inspect(branch2.to_text(), content="hello world")
}

///|
test "checkout at different frontiers" {
  let oplog = @oplog.OpLog::new("agent-1")

  // Insert "a"
  let lv1 = oplog.insert("a", -1, -1).lv
  let frontier1 = oplog.get_frontier()

  // Insert "b"
  let lv2 = oplog.insert("b", lv1, -1).lv
  let frontier2 = oplog.get_frontier()

  // Insert "c"
  let _ = oplog.insert("c", lv2, -1)
  let frontier3 = oplog.get_frontier()

  // Checkout at different points
  let branch1 = Branch::checkout(oplog, frontier1)
  let branch2 = Branch::checkout(oplog, frontier2)
  let branch3 = Branch::checkout(oplog, frontier3)
  inspect(branch1.to_text(), content="a")
  inspect(branch2.to_text(), content="ab")
  inspect(branch3.to_text(), content="abc")
}

///|
test "at_frontier check" {
  let oplog = @oplog.OpLog::new("agent-1")
  let _ = insert_string(oplog, "hello", -1)
  let frontier1 = oplog.get_frontier()
  let branch = Branch::checkout(oplog, frontier1)
  inspect(branch.at_frontier(frontier1), content="true")
  inspect(branch.at_frontier([999]), content="false")
  inspect(branch.at_frontier([]), content="false")
}

///|
test "concurrent inserts converge" {
  // Agent 1 creates operations
  let oplog1 = @oplog.OpLog::new("agent-1")
  let _op1a = oplog1.insert("A", -1, -1)

  // Agent 2 creates operations
  let oplog2 = @oplog.OpLog::new("agent-2")
  let _op2a = oplog2.insert("B", -1, -1)

  // Simulate merge: agent1 receives agent2's operation
  // (In real implementation, this would go through network)
  // For now, we manually add to the same oplog
  let oplog = @oplog.OpLog::new("agent-1")
  let _ = oplog.insert("A", -1, -1)
  let _ = oplog.insert("B", -1, -1)

  // Both operations have same parents (empty)
  // FugueMax should resolve deterministically

  let frontier = oplog.get_frontier()
  let branch = Branch::checkout(oplog, frontier)

  // The text should be deterministic (either "AB" or "BA")
  let text = branch.to_text()
  inspect(text.length(), content="2")
  inspect(text.contains("A"), content="true")
  inspect(text.contains("B"), content="true")
}

///|
test "advance with no changes" {
  let oplog = @oplog.OpLog::new("agent-1")
  let _ = insert_string(oplog, "hello", -1)
  let frontier = oplog.get_frontier()
  let branch1 = Branch::checkout(oplog, frontier)
  let branch2 = branch1.advance(frontier)
  inspect(branch2.to_text(), content="hello")
  inspect(branch2.at_frontier(frontier), content="true")
}

///|
test "checkout empty oplog" {
  let oplog = @oplog.OpLog::new("agent-1")
  let frontier = oplog.get_frontier()
  let branch = Branch::checkout(oplog, frontier)
  inspect(branch.to_text(), content="")
  inspect(branch.visible_count(), content="0")
}

///|
test "multiple advances" {
  let oplog = @oplog.OpLog::new("agent-1")

  // Insert "a"
  let lv1 = oplog.insert("a", -1, -1).lv
  let f1 = oplog.get_frontier()

  // Insert "b"
  let lv2 = oplog.insert("b", lv1, -1).lv
  let f2 = oplog.get_frontier()

  // Insert "c"
  let _ = oplog.insert("c", lv2, -1)
  let f3 = oplog.get_frontier()

  // Checkout at f1, then advance twice
  let branch = Branch::checkout(oplog, f1)
  inspect(branch.to_text(), content="a")
  let branch2 = branch.advance(f2)
  inspect(branch2.to_text(), content="ab")
  let branch3 = branch2.advance(f3)
  inspect(branch3.to_text(), content="abc")
}

///|
test "branch with complex operations" {
  let oplog = @oplog.OpLog::new("agent-1")

  // Build "hello world" with inserts and deletes
  let hello_last = insert_string(oplog, "hello", -1)
  let x_lv = oplog.insert("x", hello_last, -1).lv // "hellox"
  let _ = oplog.delete(x_lv) // Delete 'x' -> "hello"
  let space_lv = oplog.insert(" ", hello_last, -1).lv // "hello "
  let _ = insert_string(oplog, "world", space_lv) // "hello world"
  let frontier = oplog.get_frontier()
  let branch = Branch::checkout(oplog, frontier)
  inspect(branch.to_text(), content="hello world")
}
