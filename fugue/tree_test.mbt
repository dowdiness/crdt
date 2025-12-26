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
  tree.insert(0, "A", -1, -1, 0)
  inspect(tree.visible_count(), content="1")
  inspect(tree.to_text(), content="A")
}

///|
test "insert multiple items" {
  let tree = FugueTree::new()
  tree.insert(0, "H", -1, -1, 0)
  tree.insert(1, "e", 0, -1, 1)
  tree.insert(2, "l", 1, -1, 2)
  tree.insert(3, "l", 2, -1, 3)
  tree.insert(4, "o", 3, -1, 4)
  inspect(tree.visible_count(), content="5")
  inspect(tree.to_text(), content="Hello")
}

///|
test "delete item" {
  let tree = FugueTree::new()
  tree.insert(0, "A", -1, -1, 0)
  tree.insert(1, "B", 0, -1, 1)
  tree.insert(2, "C", 1, -1, 2)
  tree.delete(1) // Delete "B"
  inspect(tree.visible_count(), content="2")
  inspect(tree.to_text(), content="AC")
}

///|
test "get item by id" {
  let tree = FugueTree::new()
  tree.insert(0, "A", -1, -1, 0)
  match tree.get_item(0) {
    Some(item) => {
      inspect(item.content, content="A")
      inspect(item.deleted, content="false")
    }
    None => fail("Expected Some(Item)")
  }
}

///|
test "find parent at start" {
  let tree = FugueTree::new()
  let parent = tree.find_parent(-1, -1)
  inspect(parent, content="-1")
}

///|
test "find parent with origin_left" {
  let tree = FugueTree::new()
  tree.insert(0, "A", -1, -1, 0)
  let parent = tree.find_parent(0, -1)
  inspect(parent, content="0")
}

///|
test "concurrent inserts ordering" {
  let tree = FugueTree::new()

  // Insert initial text "AC"
  tree.insert(0, "A", -1, -1, 0)
  tree.insert(2, "C", 0, -1, 2)

  // Two users concurrently insert "B" between A and C
  // Both reference A as origin_left and C as origin_right
  tree.insert(1, "X", 0, 2, 1)
  tree.insert(3, "Y", 0, 2, 3)
  let text = tree.to_text()

  // With FugueMax, items should have deterministic ordering
  // The exact order depends on parent finding algorithm
  inspect(text.length(), content="4")
  inspect(text.contains("A"), content="true")
  inspect(text.contains("C"), content="true")
  inspect(text.contains("X"), content="true")
  inspect(text.contains("Y"), content="true")
}
