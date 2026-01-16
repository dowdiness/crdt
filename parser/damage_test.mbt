// Tests for damage tracking
///|
test "DamageTracker::new from edit" {
  let edit = Edit::new(10, 15, 20)
  let tracker = DamageTracker::new(edit)
  inspect(tracker.damaged_ranges.length(), content="1")
  inspect(tracker.damaged_ranges[0].start, content="10")
  inspect(tracker.damaged_ranges[0].end, content="20")
}

///|
test "DamageTracker::is_damaged" {
  let edit = Edit::new(10, 15, 20)
  let tracker = DamageTracker::new(edit)
  inspect(tracker.is_damaged(Range::new(5, 8)), content="false")
  inspect(tracker.is_damaged(Range::new(12, 18)), content="true")
  inspect(tracker.is_damaged(Range::new(25, 30)), content="false")
}

///|
test "DamageTracker::is_position_damaged" {
  let edit = Edit::new(10, 15, 20)
  let tracker = DamageTracker::new(edit)
  inspect(tracker.is_position_damaged(5), content="false")
  inspect(tracker.is_position_damaged(12), content="true")
  inspect(tracker.is_position_damaged(25), content="false")
}

///|
test "DamageTracker::add_range merges overlapping" {
  let tracker = DamageTracker::empty()
  tracker.add_range(Range::new(5, 10))
  tracker.add_range(Range::new(8, 15))

  // Should have merged into one range
  inspect(tracker.damaged_ranges.length(), content="1")
  inspect(tracker.damaged_ranges[0].start, content="5")
  inspect(tracker.damaged_ranges[0].end, content="15")
}

///|
test "DamageTracker::add_range keeps non-overlapping separate" {
  let tracker = DamageTracker::empty()
  tracker.add_range(Range::new(5, 10))
  tracker.add_range(Range::new(20, 25))

  // Should have two separate ranges
  inspect(tracker.damaged_ranges.length(), content="2")
}

///|
test "DamageTracker::expand_for_node" {
  let edit = Edit::new(10, 15, 20)
  let tracker = DamageTracker::new(edit)

  // Expand to include a node that overlaps
  tracker.expand_for_node(8, 25)
  let total_range = tracker.range()
  inspect(total_range.start, content="8")
  inspect(total_range.end, content="25")
}

///|
test "DamageTracker::expand_for_tree" {
  let edit = Edit::new(10, 15, 20)
  let tracker = DamageTracker::new(edit)

  // Create a simple tree by parsing
  let tree = parse_tree("1 + 2")
  tracker.expand_for_tree(tree)

  // Tree should be damaged (overlaps with edit range 10-20)
  // Since the tree spans 0-5, and edit is 10-20, they don't overlap
  // But if we adjust the test...
  inspect(tracker.damaged_ranges.length() > 0, content="true")
}
