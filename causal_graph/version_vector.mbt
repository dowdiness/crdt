///| Version Vector - Efficient frontier compression

///|
/// VersionVector represents a frontier as a mapping from agent IDs to sequence numbers
///
/// This is more compact than storing an array of LVs, especially when there are
/// many operations from the same agent. Instead of storing multiple LVs per agent,
/// we store just the maximum sequence number for each agent.
///
/// Example:
/// - Frontier as LVs: [0, 1, 2, 5, 6, 10, 11, 12]
/// - Version Vector: {"alice": 4, "bob": 8}
///
/// This provides O(1) comparison for common operations and reduces memory usage.
pub struct VersionVector {
  map : Map[String, Int]
} derive(Eq, ToJson, FromJson)

///|
pub impl Show for VersionVector with output(self, logger) {
  logger.write_object(self.map)
}

///|
pub impl Compare for VersionVector with compare(self, other) {
  if self == other {
    return 0
  }
  if self <= other {
    return -1
  }
  1
}

///|
/// Check if this version vector is <= other (all agents have seq <= other's seq)
pub impl Compare for VersionVector with op_le(self, other) {
  // For self <= other, every agent in self must have seq <= seq in other
  let mut is_le = true
  self.map.each(fn(agent, seq) {
    match other.map.get(agent) {
      Some(other_seq) => if seq > other_seq { is_le = false }
      None =>
        // self has agent but other doesn't - self is not <= other
        is_le = false
    }
  })
  is_le
}

///|
/// Create a new empty version vector
pub fn VersionVector::new() -> VersionVector {
  { map: {} }
}

///|
/// Create a version vector from agent-to-seq mappings
pub fn VersionVector::from_map(map : Map[String, Int]) -> VersionVector {
  { map, }
}

///|
/// Get the sequence number for an agent
pub fn VersionVector::get(self : VersionVector, agent : String) -> Int? {
  self.map.get(agent)
}

///|
/// Set the sequence number for an agent
pub fn VersionVector::set(
  self : VersionVector,
  agent : String,
  seq : Int,
) -> VersionVector {
  self.map.set(agent, seq)
  self
}

///|
/// Increment the sequence number for an agent
pub fn VersionVector::increment(
  self : VersionVector,
  agent : String,
) -> VersionVector {
  self.map.update(agent, fn(seq) {
    match seq {
      Some(n) => Some(n + 1)
      None => Some(0)
    }
  })
  self
}

///|
/// Get all agents in this version vector
pub fn VersionVector::agents(self : VersionVector) -> Array[String] {
  self.map.keys().to_array()
}

///|
/// Merge two version vectors (take max for each agent)
pub fn VersionVector::merge(
  self : VersionVector,
  other : VersionVector,
) -> VersionVector {
  let result = {}
  // Copy all entries from self
  self.map.each(fn(k, v) { result.set(k, v) })
  // Merge entries from other (take max)
  other.map.each(fn(agent, seq) {
    let max_seq = match result.get(agent) {
      Some(existing) => if seq > existing { seq } else { existing }
      None => seq
    }
    result.set(agent, max_seq)
  })
  { map: result }
}

///|
/// Check if version vectors are concurrent (neither <= the other)
pub fn VersionVector::concurrent(
  self : VersionVector,
  other : VersionVector,
) -> Bool {
  not(self <= other) && not(other <= self)
}

///|
/// Get the size (number of agents) in this version vector
pub fn VersionVector::size(self : VersionVector) -> Int {
  self.map.length()
}

///|
/// Check if version vector is empty
pub fn VersionVector::is_empty(self : VersionVector) -> Bool {
  self.map.length() == 0
}

///|
/// Convert frontier (array of LVs) to version vector using causal graph
pub fn VersionVector::from_frontier(
  graph : CausalGraph,
  frontier : Frontier,
) -> VersionVector {
  // For each agent, find the maximum sequence number in the frontier
  let agent_max_seq = {}

  // Get transitive closure of frontier to include all reachable versions
  let reachable = graph.transitive_closure(frontier)

  // Find max seq for each agent in reachable versions
  reachable.each(fn(lv) {
    match graph.get_entry(lv) {
      Some(entry) => {
        let current_max = match agent_max_seq.get(entry.agent) {
          Some(seq) => seq
          None => -1
        }
        if entry.seq > current_max {
          agent_max_seq.set(entry.agent, entry.seq)
        }
      }
      None => ()
    }
  })
  { map: agent_max_seq }
}

///|
/// Convert version vector to frontier (array of LVs) using causal graph
///
/// Returns the minimal set of LVs that represents this version vector.
/// For each agent, we include the LV corresponding to the sequence number
/// in the version vector.
pub fn VersionVector::to_frontier(
  self : VersionVector,
  graph : CausalGraph,
) -> Array[Int] {
  let result = []

  // For each agent in version vector, find the LV for that (agent, seq)
  self.map.each(fn(agent, seq) {
    let raw_version = RawVersion::new(agent, seq)
    match graph.raw_to_lv(raw_version) {
      Some(lv) => result.push(lv)
      None => () // Version not in graph yet
    }
  })
  result
}

///|
/// Check if a version (agent, seq) is included in this version vector
pub fn VersionVector::includes(
  self : VersionVector,
  agent : String,
  seq : Int,
) -> Bool {
  match self.map.get(agent) {
    Some(max_seq) => seq <= max_seq
    None => false
  }
}
