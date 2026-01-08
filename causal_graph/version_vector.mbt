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
  map : @hashmap.HashMap[String, Int]
} derive(Show, Eq, ToJson)

///|
pub impl FromJson for VersionVector with from_json(
  json : Json,
  path : @json.JsonPath,
) -> VersionVector raise @json.JsonDecodeError {
  guard json is Object(map) else {
    raise @json.JsonDecodeError(
      (path, "VersionVector::from_json: expected object"),
    )
  }
  let result = @hashmap.new()
  map.each(fn(k, v) {
    // Extend path with key for better error messages
    let key_path = path.add_key(k)
    guard v is Number(n, ..) else {
      raise @json.JsonDecodeError((key_path, "Expected integer value"))
    }
    result.set(k, n.to_int())
  })
  { map: result }
}

///|
/// Create a new empty version vector
pub fn VersionVector::new() -> VersionVector {
  { map: @hashmap.new() }
}

///|
/// Create a version vector from agent-to-seq mappings
pub fn VersionVector::from_map(
  map : @hashmap.HashMap[String, Int],
) -> VersionVector {
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
  let new_map = @hashmap.new()
  self.map.each(fn(k, v) { new_map.set(k, v) })
  new_map.set(agent, seq)
  { map: new_map }
}

///|
/// Increment the sequence number for an agent
pub fn VersionVector::increment(
  self : VersionVector,
  agent : String,
) -> VersionVector {
  let new_seq = match self.map.get(agent) {
    Some(seq) => seq + 1
    None => 0
  }
  let new_map = @hashmap.new()
  self.map.each(fn(k, v) { new_map.set(k, v) })
  new_map.set(agent, new_seq)
  { map: new_map }
}

///|
/// Get all agents in this version vector
pub fn VersionVector::agents(self : VersionVector) -> Array[String] {
  let result = []
  self.map.each(fn(agent, _seq) { result.push(agent) })
  result
}

///|
/// Merge two version vectors (take max for each agent)
pub fn VersionVector::merge(
  self : VersionVector,
  other : VersionVector,
) -> VersionVector {
  let result = @hashmap.new()
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
/// Check if this version vector is <= other (all agents have seq <= other's seq)
pub fn VersionVector::le(self : VersionVector, other : VersionVector) -> Bool {
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
/// Check if version vectors are equal
pub fn VersionVector::equal(
  self : VersionVector,
  other : VersionVector,
) -> Bool {
  // Must have same agents with same sequences
  let self_agents = self.agents()
  let other_agents = other.agents()
  if self_agents.length() != other_agents.length() {
    return false
  }
  let mut is_equal = true
  self.map.each(fn(agent, seq) {
    match other.map.get(agent) {
      Some(other_seq) => if seq != other_seq { is_equal = false }
      None => is_equal = false
    }
  })
  is_equal
}

///|
/// Check if version vectors are concurrent (neither <= the other)
pub fn VersionVector::concurrent(
  self : VersionVector,
  other : VersionVector,
) -> Bool {
  not(self.le(other)) && not(other.le(self))
}

///|
/// Convert version vector to a readable string
pub fn VersionVector::to_string(self : VersionVector) -> String {
  let pairs = []
  self.map.each(fn(agent, seq) { pairs.push("\{agent}:\{seq}") })
  pairs.sort()
  "{" + pairs.join(", ") + "}"
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
  frontier : Array[Int],
) -> VersionVector {
  // For each agent, find the maximum sequence number in the frontier
  let agent_max_seq : @hashmap.HashMap[String, Int] = @hashmap.new()

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
