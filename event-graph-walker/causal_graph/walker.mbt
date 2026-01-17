// Event Graph Walker - Core eg-walker algorithm
// Traverses the causal graph in topological order to replay operations

///|
/// Walk the event graph from a frontier, collecting all reachable operations
/// in topological (causal) order.
///
/// This is the core eg-walker algorithm that ensures operations are
/// replayed in an order that respects their causal dependencies.
///
/// # Arguments
/// * `frontier` - Starting frontier (versions to walk from)
///
/// # Returns
/// Array of LVs (local versions) in topological order, from oldest to newest
pub fn CausalGraph::walk_from_frontier(
  self : CausalGraph,
  frontier : Array[Int],
) -> Array[Int] {
  // Get all versions reachable from frontier
  let reachable = collect_reachable_versions(self, frontier)

  // Sort them in topological order (respecting causal dependencies)
  topological_sort(self, reachable)
}

///|
/// Collect all versions reachable from the given frontier
/// This includes the frontier versions themselves and all their ancestors
fn collect_reachable_versions(
  graph : CausalGraph,
  frontier : Array[Int],
) -> @immut/hashset.HashSet[Int] {
  let mut visited : @immut/hashset.HashSet[Int] = @immut/hashset.new()
  let queue = @queue.Queue::new()

  // Start from frontier
  for lv in frontier {
    queue.push(lv)
  }

  // BFS to collect all reachable versions
  while not(queue.is_empty()) {
    match queue.pop() {
      Some(current) => {
        // Skip if already visited
        if visited.contains(current) {
          continue
        }

        // Mark as visited
        visited = visited.add(current)

        // Add parents to queue
        match graph.get_entry(current) {
          Some(entry) =>
            for parent in entry.parents {
              if not(visited.contains(parent)) {
                queue.push(parent)
              }
            }
          None => ()
        }
      }
      None => break
    }
  }
  visited
}

///|
/// Topological sort of versions using Kahn's algorithm
/// Returns versions ordered from oldest to newest (respecting causality)
///
/// https://en.wikipedia.org/wiki/Topological_sorting
///
/// # Algorithm
/// 1. Build children map for O(1) lookups (avoids O(n²) scanning)
/// 2. Calculate in-degree for each version (number of unprocessed dependencies)
/// 3. Start with versions that have in-degree 0
/// 4. Process versions, decrementing in-degrees of their children
/// 5. Add newly-zero-in-degree versions to queue
fn topological_sort(
  graph : CausalGraph,
  versions : @immut/hashset.HashSet[Int],
) -> Array[Int] {
  // Build children map: parent -> [children]
  // This is O(n + edges) instead of O(n²) for repeated scanning
  let mut children : @immut/hashmap.HashMap[Int, Array[Int]] = @immut/hashmap.new()
  for lv in versions.iter() {
    match graph.get_entry(lv) {
      Some(entry) =>
        // For each parent, record this version as a child
        for parent in entry.parents {
          if versions.contains(parent) {
            let current_children = match children.get(parent) {
              Some(c) => c
              None => []
            }
            current_children.push(lv)
            children = children.add(parent, current_children)
          }
        }
      None => ()
    }
  }

  // Calculate in-degrees (number of parents in the reachable set)
  let mut in_degree : @immut/hashmap.HashMap[Int, Int] = @immut/hashmap.new()

  // Initialize in-degrees to 0
  for lv in versions.iter() {
    in_degree = in_degree.add(lv, 0)
  }

  // Count in-degrees
  for lv in versions.iter() {
    match graph.get_entry(lv) {
      Some(entry) =>
        // For each parent in the reachable set, increment this version's in-degree
        for parent in entry.parents {
          if versions.contains(parent) {
            let current_degree = match in_degree.get(lv) {
              Some(d) => d
              None => 0
            }
            in_degree = in_degree.add(lv, current_degree + 1)
          }
        }
      None => ()
    }
  }

  // Queue for versions with in-degree 0 (no dependencies)
  let queue = @queue.Queue::new()

  // Find initial versions with in-degree 0, enqueue in deterministic order
  let ready : Array[Int] = []
  for lv in versions.iter() {
    match in_degree.get(lv) {
      Some(0) | None => ready.push(lv)
      _ => ()
    }
  }
  ready.sort()
  for lv in ready {
    queue.push(lv)
  }

  // Result array
  let result : Array[Int] = []

  // Process versions in topological order
  while not(queue.is_empty()) {
    match queue.pop() {
      Some(current) => {
        // Add to result
        result.push(current)

        // Look up children directly from map (O(1) instead of O(n))
        match children.get(current) {
          Some(child_list) => {
            let sorted_children = child_list.copy()
            sorted_children.sort()
            for child in sorted_children {
              // Decrement in-degree
              match in_degree.get(child) {
                Some(degree) => {
                  let new_degree = degree - 1
                  in_degree = in_degree.add(child, new_degree)

                  // If in-degree reaches 0, add to queue
                  if new_degree == 0 {
                    queue.push(child)
                  }
                }
                None => ()
              }
            }
          }
          None => () // No children, continue
        }
      }
      None => break
    }
  }

  result
}

///|
/// Calculate the difference between two frontiers and return LVs to apply
/// This is useful for fast-forwarding from one frontier to another
///
/// # Returns
/// (retreat_lvs, advance_lvs) - LVs to undo and redo
///
/// Note: retreat_lvs are in reverse topological order (for undo)
///       advance_lvs are in topological order (for redo)
pub fn CausalGraph::diff_frontiers_lvs(
  self : CausalGraph,
  from_frontier : Array[Int],
  to_frontier : Array[Int],
) -> (Array[Int], Array[Int]) {
  // Use existing graph_diff to get the sets
  let (retreat_set, advance_set) = self.graph_diff(from_frontier, to_frontier)

  // Walk (topological sort) the retreat set
  let retreat_lvs = if retreat_set.length() > 0 {
    let reachable = @immut/hashset.from_array(retreat_set)
    topological_sort(self, reachable)
  } else {
    []
  }

  // Reverse the retreat LVs for undo order
  let reversed_retreat : Array[Int] = []
  for i = retreat_lvs.length() - 1; i >= 0; i = i - 1 {
    reversed_retreat.push(retreat_lvs[i])
  }

  // Walk (topological sort) the advance set
  let advance_lvs = if advance_set.length() > 0 {
    let reachable = @immut/hashset.from_array(advance_set)
    topological_sort(self, reachable)
  } else {
    []
  }
  (reversed_retreat, advance_lvs)
}
