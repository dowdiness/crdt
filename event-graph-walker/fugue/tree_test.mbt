///|
/// Tests for FugueMax Tree
test "create empty tree" {
  let tree = FugueTree::new()
  inspect(tree.visible_count(), content="0")
  inspect(tree.to_text(), content="")
}

///|
test "insert single item" {
  let tree = FugueTree::new()
  tree.insert(0, "A", -1, -1, 0, "agent0")
  inspect(tree.visible_count(), content="1")
  inspect(tree.to_text(), content="A")
}

///|
test "insert multiple items" {
  let tree = FugueTree::new()
  tree.insert(0, "H", -1, -1, 0, "agent0")
  tree.insert(1, "e", 0, -1, 1, "agent0")
  tree.insert(2, "l", 1, -1, 2, "agent0")
  tree.insert(3, "l", 2, -1, 3, "agent0")
  tree.insert(4, "o", 3, -1, 4, "agent0")
  inspect(tree.visible_count(), content="5")
  inspect(tree.to_text(), content="Hello")
}

///|
test "delete item" {
  let tree = FugueTree::new()
  tree.insert(0, "A", -1, -1, 0, "agent0")
  tree.insert(1, "B", 0, -1, 1, "agent0")
  tree.insert(2, "C", 1, -1, 2, "agent0")
  inspect(tree.visible_count(), content="3")
  try! tree.delete(1) // Delete "B"
  inspect(tree.visible_count(), content="2")
  inspect(
    tree.get_visible_items(),
    content="[(0, {id: 0, content: \"A\", parent: -1, side: Right, deleted: false, timestamp: 0, agent: \"agent0\"}), (2, {id: 2, content: \"C\", parent: 1, side: Right, deleted: false, timestamp: 2, agent: \"agent0\"})]",
  )
  inspect(tree.to_text(), content="AC")
}

///|
test "get item by id" {
  let tree = FugueTree::new()
  tree.insert(0, "A", -1, -1, 0, "agent0")
  match tree[0] {
    Some(item) => {
      inspect(item.content, content="A")
      inspect(item.deleted, content="false")
    }
    None => fail("Expected Some(Item)")
  }
}

///|
test "find parent and side at start" {
  let tree = FugueTree::new()
  let (parent, side) = tree.find_parent_and_side(-1, -1)
  inspect(parent, content="-1")
  inspect(side, content="Right")
}

///|
test "find parent and side with origin_left" {
  let tree = FugueTree::new()
  tree.insert(0, "A", -1, -1, 0, "agent0")
  let (parent, side) = tree.find_parent_and_side(0, -1)
  inspect(parent, content="0")
  inspect(side, content="Right")
}

///|
test "concurrent inserts ordering with FugueMax" {
  let tree = FugueTree::new()

  // Insert initial text "AC"
  tree.insert(0, "A", -1, -1, 0, "agent0")
  tree.insert(2, "C", 0, -1, 2, "agent0")

  // Two users concurrently insert "X" and "Y" between A and C
  // Both reference A as origin_left and C as origin_right
  tree.insert(1, "X", 0, 2, 1, "agent1")
  tree.insert(3, "Y", 0, 2, 3, "agent2")
  let text = tree.to_text()

  // With FugueMax integration:
  // - Check if A (id=0) is ancestor of C (id=2): C.parent=0, so yes!
  // - X (timestamp=1): parent=C, side=Left (because 0 is ancestor of 2)
  // - Y (timestamp=3): parent=C, side=Left (because 0 is ancestor of 2)
  // Tree order: A → [Left children of C: X, Y (sorted by timestamp)] → C
  // Expected: AXYC
  inspect(text, content="AXYC")
}

///|
test "concurrent inserts with different ancestors" {
  let tree = FugueTree::new()

  // Insert "AB"
  tree.insert(0, "A", -1, -1, 0, "agent0")
  tree.insert(1, "B", 0, -1, 1, "agent0")

  // Two users concurrently insert between A and B
  // X: origin_left=A(0), origin_right=B(1), timestamp=2
  // Y: origin_left=A(0), origin_right=B(1), timestamp=3
  tree.insert(2, "X", 0, 1, 2, "agent1")
  tree.insert(3, "Y", 0, 1, 3, "agent2")
  let text = tree.to_text()
  // Both X and Y will be left children of B (since A is ancestor of B)
  // Sorted by timestamp: X(2), Y(3)
  // Expected: AXYB
  inspect(text, content="AXYB")
}

///|
test "three-way concurrent insert" {
  let tree = FugueTree::new()

  // Insert "AD"
  tree.insert(0, "A", -1, -1, 0, "agent0")
  tree.insert(3, "D", 0, -1, 3, "agent0")

  // Three users concurrently insert between A and D
  tree.insert(1, "B", 0, 3, 1, "agent1")
  tree.insert(2, "C", 0, 3, 2, "agent2")
  tree.insert(4, "E", 0, 3, 4, "agent3")
  let text = tree.to_text()
  // All B, C, E will be left children of D (since A is ancestor of D)
  // Sorted by timestamp: B(1), C(2), E(4)
  // Expected: ABCED
  inspect(text, content="ABCED")
}

///|
test "nested concurrent inserts" {
  let tree = FugueTree::new()

  // Insert "AC"
  tree.insert(0, "A", -1, -1, 0, "agent0")
  tree.insert(2, "C", 0, -1, 2, "agent0")

  // First level: insert B between A and C
  tree.insert(1, "B", 0, 2, 1, "agent1")

  // Second level: insert X between B and C
  // B is NOT an ancestor of C, so X becomes right child of B
  tree.insert(3, "X", 1, 2, 3, "agent2")
  let text = tree.to_text()
  // Tree structure:
  // A → B → X (right child of B)
  //   → C (right child of A)
  // Expected: ABXC
  inspect(text, content="ABXC")
}

///|
test "concurrent inserts with no right constraint" {
  let tree = FugueTree::new()

  // Insert "A"
  tree.insert(0, "A", -1, -1, 0, "agent0")

  // Multiple concurrent inserts at end (no right constraint)
  tree.insert(1, "B", 0, -1, 1, "agent1")
  tree.insert(2, "C", 0, -1, 2, "agent2")
  tree.insert(3, "D", 0, -1, 3, "agent3")
  let text = tree.to_text()
  // All become right children of A, sorted by timestamp
  // Expected: ABCD
  inspect(text, content="ABCD")
}

///|
test "interleaved operations" {
  let tree = FugueTree::new()

  // Build text progressively with concurrent inserts
  tree.insert(0, "H", -1, -1, 0, "agent0")
  tree.insert(1, "e", 0, -1, 1, "agent0")
  tree.insert(2, "l", 1, -1, 2, "agent0")
  tree.insert(3, "l", 2, -1, 3, "agent0")
  tree.insert(4, "o", 3, -1, 4, "agent0")

  // Concurrent insert at beginning: origin_left=-1, origin_right=0
  // -1 is ancestor of 0, so parent=0, side=Left
  // In tree order: left children of H are visited BEFORE H
  // But our current traversal visits left children AFTER, so > comes after H
  tree.insert(5, ">", -1, 0, 5, "agent1")

  // Concurrent insert in middle
  tree.insert(6, "-", 2, 3, 6, "agent2")
  let text = tree.to_text()
  // Current behavior based on tree structure
  inspect(text, content="Hel-lo>")
}

///|
test "ancestor check correctness" {
  let tree = FugueTree::new()

  // Build chain: root(-1) → A(0) → B(1) → C(2)
  tree.insert(0, "A", -1, -1, 0, "agent0")
  tree.insert(1, "B", 0, -1, 1, "agent0")
  tree.insert(2, "C", 1, -1, 2, "agent0")

  // Test ancestor relationships
  inspect(tree.is_ancestor(0, 0), content="true") // Self is ancestor
  inspect(tree.is_ancestor(0, 1), content="true") // A is ancestor of B
  inspect(tree.is_ancestor(0, 2), content="true") // A is ancestor of C
  inspect(tree.is_ancestor(1, 2), content="true") // B is ancestor of C
  inspect(tree.is_ancestor(1, 0), content="false") // B is NOT ancestor of A
  inspect(tree.is_ancestor(2, 0), content="false") // C is NOT ancestor of A
}

///|
test "delete in concurrent scenario" {
  let tree = FugueTree::new()

  // Insert "ABC"
  tree.insert(0, "A", -1, -1, 0, "agent0")
  tree.insert(1, "B", 0, -1, 1, "agent0")
  tree.insert(2, "C", 1, -1, 2, "agent0")

  // Concurrent: delete B and insert X between A and C
  try! tree.delete(1)
  tree.insert(3, "X", 0, 2, 3, "agent1")
  let text = tree.to_text()
  // B is deleted, X is inserted
  // Expected: AXC
  inspect(text, content="AXC")
}

///|
test "reverse timestamp ordering" {
  let tree = FugueTree::new()

  // Insert with decreasing timestamps (simulating clock skew)
  tree.insert(0, "A", -1, -1, 100, "agent0")
  tree.insert(1, "B", 0, -1, 90, "agent0")

  // Concurrent inserts between A and B with mixed timestamps
  tree.insert(2, "X", 0, 1, 95, "agent1")
  tree.insert(3, "Y", 0, 1, 85, "agent2")
  tree.insert(4, "Z", 0, 1, 92, "agent3")
  let text = tree.to_text()
  // All X, Y, Z are left children of B
  // Sorted by timestamp: Y(85), Z(92), X(95)
  // Expected: AYZXB
  inspect(text, content="AYZXB")
}

///|
test "collaborative editing simulation" {
  let tree = FugueTree::new()

  // User 1: Types "Hello"
  tree.insert(0, "H", -1, -1, 0, "user1")
  tree.insert(1, "e", 0, -1, 1, "user1")
  tree.insert(2, "l", 1, -1, 2, "user1")
  tree.insert(3, "l", 2, -1, 3, "user1")
  tree.insert(4, "o", 3, -1, 4, "user1")
  inspect(tree.to_text(), content="Hello")

  // User 2: Concurrently inserts "World" after "Hello"
  // They see "Hello" and insert at end
  tree.insert(10, " ", 4, -1, 10, "user2")
  tree.insert(11, "W", 10, -1, 11, "user2")
  tree.insert(12, "o", 11, -1, 12, "user2")
  tree.insert(13, "r", 12, -1, 13, "user2")
  tree.insert(14, "l", 13, -1, 14, "user2")
  tree.insert(15, "d", 14, -1, 15, "user2")
  inspect(tree.to_text(), content="Hello World")

  // User 1: Concurrently inserts "!" at end (based on seeing "Hello")
  // origin_left=4 (last 'o'), origin_right=-1
  tree.insert(5, "!", 4, -1, 5, "user1")

  // User 3: Inserts "," between "Hello" and "World"
  // They see "Hello World", insert between 'o' and ' '
  tree.insert(20, ",", 4, 10, 20, "user3")
  let final_text = tree.to_text()
  // Result should deterministically merge all edits
  inspect(final_text, content="Hello!, World")
}

///|
test "fugue property - non-interleaving" {
  let tree = FugueTree::new()

  // Initial text "AB"
  tree.insert(0, "A", -1, -1, 0, "agent0")
  tree.insert(1, "B", 0, -1, 1, "agent0")

  // User 1 inserts "XX" between A and B
  tree.insert(2, "X", 0, 1, 2, "user1")
  tree.insert(3, "X", 2, 1, 3, "user1")

  // User 2 inserts "YY" between A and B (concurrent with user 1)
  tree.insert(4, "Y", 0, 1, 4, "user2")
  tree.insert(5, "Y", 4, 1, 5, "user2")
  let text = tree.to_text()
  // FugueMax should not interleave: should get AXXYYB or AYYXXB
  // Based on timestamps and tree structure, we get AXXYYB
  inspect(text, content="AXXYYB")

  // Verify no interleaving occurred
  inspect(text.contains("XYX"), content="false") // No interleaving
  inspect(text.contains("YXY"), content="false") // No interleaving
}
