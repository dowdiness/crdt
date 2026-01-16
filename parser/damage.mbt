// Damage tracking for incremental parsing
// Identifies which parts of the parse tree need reparsing after edits
///|
/// Damage tracker that maintains damaged ranges
pub struct DamageTracker {
  damaged_ranges : Array[Range] // Sorted, non-overlapping ranges
}

///|
/// Create a new damage tracker from an edit
pub fn DamageTracker::new(edit : Edit) -> DamageTracker {
  // Initial damaged range is the edit range (adjusted for new source)
  let initial_range = Range::new(edit.start, edit.new_end)
  { damaged_ranges: [initial_range] }
}

///|
/// Create an empty damage tracker
pub fn DamageTracker::empty() -> DamageTracker {
  { damaged_ranges: [] }
}

///|
/// Add a range to the damaged regions
pub fn DamageTracker::add_range(self : DamageTracker, range : Range) -> Unit {
  if range.length() == 0 {
    return
  }

  // Find overlapping ranges and merge them
  let mut merged = range
  let new_ranges : Array[Range] = []
  for existing in self.damaged_ranges {
    if existing.overlaps(merged) {
      merged = merged.merge(existing)
    } else {
      new_ranges.push(existing)
    }
  }
  new_ranges.push(merged)

  // Sort ranges by start position using sort_by_key
  new_ranges.sort_by_key(fn(r) { r.start })

  // Update damaged ranges
  self.damaged_ranges.clear()
  for r in new_ranges {
    self.damaged_ranges.push(r)
  }
}

///|
/// Check if a range is damaged
pub fn DamageTracker::is_damaged(self : DamageTracker, range : Range) -> Bool {
  for damaged in self.damaged_ranges {
    if damaged.overlaps(range) {
      return true
    }
  }
  false
}

///|
/// Check if a position is damaged
pub fn DamageTracker::is_position_damaged(
  self : DamageTracker,
  pos : Int,
) -> Bool {
  for damaged in self.damaged_ranges {
    if damaged.contains(pos) {
      return true
    }
  }
  false
}

///|
/// Expand damage to include a node's range
///
/// This is part of the Wagner-Graham algorithm:
/// If a node overlaps the damaged region, mark it as damaged
pub fn DamageTracker::expand_for_node(
  self : DamageTracker,
  node_start : Int,
  node_end : Int,
) -> Unit {
  let node_range = Range::new(node_start, node_end)

  // Check if this node overlaps any damaged range
  for damaged in self.damaged_ranges {
    if damaged.overlaps(node_range) {
      // Expand damage to include this entire node
      self.add_range(node_range)
      return
    }
  }
}

///|
/// Expand damage for an entire tree
///
/// Wagner-Graham damage expansion:
/// Walk the tree and mark nodes that overlap damaged regions
pub fn DamageTracker::expand_for_tree(
  self : DamageTracker,
  tree : TermNode,
) -> Unit {
  // Check if this node overlaps any damaged range
  let node_range = Range::new(tree.start, tree.end)
  let mut overlaps_damage = false
  for damaged in self.damaged_ranges {
    if damaged.overlaps(node_range) {
      overlaps_damage = true
      break
    }
  }
  if overlaps_damage {
    // This node overlaps damage, expand damage to include entire node
    self.add_range(node_range)

    // Recursively expand damage for children
    for child in tree.children {
      self.expand_for_tree(child)
    }
  } else {
    // Node doesn't overlap damage, but children might
    for child in tree.children {
      self.expand_for_tree(child)
    }
  }
}

///|
/// Get the total damaged range (union of all ranges)
pub fn DamageTracker::range(self : DamageTracker) -> Range {
  if self.damaged_ranges.length() == 0 {
    return Range::new(0, 0)
  }
  let mut min_start = self.damaged_ranges[0].start
  let mut max_end = self.damaged_ranges[0].end
  for range in self.damaged_ranges {
    if range.start < min_start {
      min_start = range.start
    }
    if range.end > max_end {
      max_end = range.end
    }
  }
  Range::new(min_start, max_end)
}

///|
/// Get damage statistics
pub fn DamageTracker::stats(self : DamageTracker) -> String {
  "DamageTracker { ranges: " +
  self.damaged_ranges.length().to_string() +
  ", total_damaged: " +
  self.range().length().to_string() +
  " }"
}
