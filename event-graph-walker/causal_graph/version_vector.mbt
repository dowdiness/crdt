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

// Traits

///|
/// Converts the version vector to its string representation using the
/// underlying map format.
///
/// Parameters:
///
/// * `self` : The version vector to convert to string.
/// * `logger` : The output logger to write the string representation to.
///
/// Example:
///
/// ```moonbit
/// let vv = VersionVector::new().set("alice", 5).set("bob", 3)
/// println(vv) // Outputs the map representation showing agent-to-sequence mappings
/// ```
///
pub impl Show for VersionVector with output(self, logger) {
  logger.write_object(self.map)
}

///|
/// Compares two version vectors to determine their ordering relationship.
///
/// Parameters:
///
/// * `self` : The first version vector to compare.
/// * `other` : The second version vector to compare against.
///
/// Returns an integer indicating the comparison result: 0 if the version
/// vectors are equal, -1 if `self` is less than or equal to `other`, and 1 if
/// `self` is greater than `other`.
///
/// Example:
///
/// ```moonbit
/// let vv1 = VersionVector::new().set("alice", 1).set("bob", 2)
/// let vv2 = VersionVector::new().set("alice", 2).set("bob", 2)
/// let vv3 = VersionVector::new().set("alice", 1).set("bob", 2)
///
/// inspect(vv1.compare(vv2), content="-1")  // vv1 <= vv2
/// inspect(vv1.compare(vv3), content="0")   // vv1 == vv3
/// inspect(vv2.compare(vv1), content="1")   // vv2 > vv1
/// ```
///
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
/// Checks if this version vector is less than or equal to another version
/// vector.
///
/// Parameters:
///
/// * `self` : The first version vector to compare.
/// * `other` : The second version vector to compare against.
///
/// Returns `true` if this version vector is less than or equal to the other
/// version vector, meaning that for every agent in this version vector, its
/// sequence number is less than or equal to the corresponding sequence number
/// in the other version vector. If this version vector contains an agent that
/// is not present in the other version vector, returns `false`.
///
/// Example:
///
/// ```moonbit
/// let vv1 = @dowdiness/crdt/causal_graph.VersionVector::new().set("alice", 2).set("bob", 3)
/// let vv2 = @dowdiness/crdt/causal_graph.VersionVector::new().set("alice", 3).set("bob", 3).set("charlie", 1)
/// inspect(vv1 <= vv2, content="true")
///
/// let vv3 = @dowdiness/crdt/causal_graph.VersionVector::new().set("alice", 4).set("bob", 2)
/// inspect(vv1 <= vv3, content="false") // alice: 2 <= 4 but bob: 3 > 2
///
/// let vv4 = @dowdiness/crdt/causal_graph.VersionVector::new().set("alice", 1)
/// inspect(vv1 <= vv4, content="false") // vv1 has bob but vv4 doesn't
/// ```
///
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
/// Arbitrary instance for VersionVector - generates random version vectors
/// Uses a fixed set of agent names and random sequence numbers
pub impl @quickcheck.Arbitrary for VersionVector with arbitrary(
  size,
  random_state,
) {
  let agent_names = ["alice", "bob", "charlie", "dave", "eve"]
  // Use random_state to generate random integers
  let num_agents_seed = random_state.split().next_uint64().to_int().abs() % 5 +
    1 // 1-5 agents
  let mut vv = VersionVector::new()
  for i = 0; i < num_agents_seed && i < agent_names.length(); i = i + 1 {
    let seq_seed = random_state.split().next_uint64().to_int().abs() %
      (size + 1) // 0 to size
    vv = vv.set(agent_names[i], seq_seed)
  }
  vv
}

///| Shrink implementation for VersionVector

///|
/// Shrink instance for VersionVector - simplifies failing test cases
///
/// Shrinking strategies:
/// 1. Remove agents (fewer agents = simpler)
/// 2. Decrease sequence numbers for each agent (smaller numbers = simpler)
/// 3. Combination of both
pub impl @qc.Shrink for VersionVector with shrink(vv) {
  let agents = vv.agents()

  // Strategy 1: Shrink by removing agents
  let remove_variants = {
    let result = []
    if agents.length() > 1 {
      // Try removing each agent one at a time
      for i = 0; i < agents.length(); i = i + 1 {
        let mut smaller = VersionVector::new()
        for j = 0; j < agents.length(); j = j + 1 {
          if i != j {
            // Include all agents except the one at index i
            match vv.get(agents[j]) {
              Some(seq) => smaller = smaller.set(agents[j], seq)
              None => ()
            }
          }
        }
        result.push(smaller)
      }
    }
    result
  }

  // Strategy 2: Shrink by decreasing sequence numbers
  let seq_variants = {
    let result = []
    // For each agent, try smaller sequence numbers
    for agent in agents {
      match vv.get(agent) {
        Some(seq) =>
          if seq > 0 {
            // Try seq - 1, seq / 2, 0
            let candidates = [seq - 1, seq / 2, 0]
            for new_seq in candidates {
              if new_seq < seq && new_seq >= 0 {
                let mut smaller = VersionVector::new()
                // Copy all agents, but use new_seq for this agent
                for a in agents {
                  match vv.get(a) {
                    Some(s) =>
                      if a == agent {
                        smaller = smaller.set(a, new_seq)
                      } else {
                        smaller = smaller.set(a, s)
                      }
                    None => ()
                  }
                }
                result.push(smaller)
              }
            }
          }
        None => ()
      }
    }
    result
  }

  // Combine both strategies using external iterator
  remove_variants.iter().concat(seq_variants.iter()).filter(fn(v) { v != vv })
}

///|
/// Creates a new empty version vector with no agents.
///
/// Returns a new `VersionVector` instance with an empty mapping from agent IDs
/// to sequence numbers.
///
/// Example:
///
/// ```moonbit
/// let vv = @dowdiness/crdt/causal_graph.VersionVector::new()
/// inspect(vv.is_empty(), content="true")
/// inspect(vv.size(), content="0")
/// ```
///
pub fn VersionVector::new() -> VersionVector {
  { map: {} }
}

///|
/// Creates a new version vector from a map of agent names to sequence numbers.
///
/// Parameters:
///
/// * `map` : A map where keys are agent identifiers and values are their
///   corresponding sequence numbers.
///
/// Returns a new `VersionVector` containing the provided agent-to-sequence
/// mappings.
///
/// Example:
///
/// ```moonbit
/// let map = { "alice": 5, "bob": 3, "charlie": 10 }
/// let vv = VersionVector::from_map(map)
/// inspect(vv.get("alice"), content="Some(5)")
/// inspect(vv.get("bob"), content="Some(3)")
/// ```
///
pub fn VersionVector::from_map(map : Map[String, Int]) -> VersionVector {
  { map, }
}

///|
/// Retrieves the sequence number for a specific agent from the version vector.
///
/// Parameters:
///
/// * `self` : The version vector to query.
/// * `agent` : The agent identifier to look up.
///
/// Returns `Some(sequence_number)` if the agent exists in the version vector,
/// or `None` if the agent is not found.
///
/// Example:
///
/// ```moonbit
/// let vv = @dowdiness/crdt/causal_graph.VersionVector::new()
///   .set("alice", 5)
///   .set("bob", 3)
/// inspect(vv.get("alice"), content="Some(5)")
/// inspect(vv.get("charlie"), content="None")
/// ```
///
pub fn VersionVector::get(self : VersionVector, agent : String) -> Int? {
  self.map.get(agent)
}

///|
/// Sets the sequence number for a specific agent in the version vector.
///
/// Parameters:
///
/// * `self` : The version vector to modify.
/// * `agent` : The name of the agent whose sequence number should be set.
/// * `seq` : The sequence number to assign to the agent.
///
/// Returns a new `VersionVector` with the updated sequence number for the
/// specified agent.
///
/// Example:
///
/// ```moonbit
/// let vv = @dowdiness/crdt/causal_graph.VersionVector::new()
/// let updated = vv.set("alice", 5)
/// inspect(updated.get("alice"), content="Some(5)")
/// ```
///
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
/// ///
/// If the agent doesn't exist, set it to 0.
/// If the agent exists, increment its sequence number by 1
///
/// This is useful for creating a new version vector with the same agents as
/// the current one, but with the sequence number for the given agent incremented.
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
/// Gets all agent identifiers that have sequence numbers recorded in this
/// version vector.
///
/// Parameters:
///
/// * `self` : The version vector to extract agents from.
///
/// Returns an array containing all agent identifiers (as strings) that are
/// present in this version vector. The order of agents in the returned array is
/// not guaranteed.
///
/// Example:
///
/// ```moonbit
/// let vv = VersionVector::new().set("alice", 5).set("bob", 3).set("charlie", 7)
///
/// let agents = vv.agents()
/// // agents contains ["alice", "bob", "charlie"] in some order
/// ```
///
pub fn VersionVector::agents(self : VersionVector) -> Array[String] {
  self.map.keys().to_array()
}

///|
/// Merges two version vectors by taking the maximum sequence number for each
/// agent.
///
/// Parameters:
///
/// * `self` : The first version vector to merge.
/// * `other` : The second version vector to merge.
///
/// Returns a new version vector containing all agents from both input vectors,
/// where each agent's sequence number is the maximum of their sequence numbers
/// from the input vectors.
///
/// Example:
///
/// ```moonbit
/// let vv1 = VersionVector::new().set("alice", 5).set("bob", 3)
///
/// let vv2 = VersionVector::new().set("alice", 2).set("charlie", 8)
///
/// let merged = vv1.merge(vv2)
/// // merged contains: {"alice": 5, "bob": 3, "charlie": 8}
/// ```
///
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
/// Determines whether two version vectors are concurrent (incomparable in the
/// causal ordering).
///
/// Two version vectors are concurrent when neither is causally before or equal
/// to the other. This means that the changes represented by these version
/// vectors happened independently without one necessarily preceding the other
/// in the causal chain.
///
/// Parameters:
///
/// * `self` : The first version vector to compare.
/// * `other` : The second version vector to compare.
///
/// Returns `true` if the version vectors are concurrent (neither `self <=
/// other` nor `other <= self`), `false` otherwise.
///
/// Example:
///
/// ```moonbit
/// let vv1 = @dowdiness/crdt/causal_graph.VersionVector::from_map({"alice": 2, "bob": 1})
/// let vv2 = @dowdiness/crdt/causal_graph.VersionVector::from_map({"alice": 1, "bob": 2})
/// inspect(vv1.concurrent(vv2), content="true")
///
/// let vv3 = @dowdiness/crdt/causal_graph.VersionVector::from_map({"alice": 1, "bob": 1})
/// let vv4 = @dowdiness/crdt/causal_graph.VersionVector::from_map({"alice": 2, "bob": 2})
/// inspect(vv3.concurrent(vv4), content="false")
/// ```
///
pub fn VersionVector::concurrent(
  self : VersionVector,
  other : VersionVector,
) -> Bool {
  not(self <= other) && not(other <= self)
}

///|
/// Returns the number of agents tracked in this version vector.
///
/// Parameters:
///
/// * `self` : The version vector to get the size of.
///
/// Returns the count of agents as an integer.
///
/// Example:
///
/// ```moonbit
/// let vv = @dowdiness/crdt/causal_graph.VersionVector::new()
///   .set("alice", 5)
///   .set("bob", 3)
/// inspect(vv.size(), content="2")
/// ```
///
pub fn VersionVector::size(self : VersionVector) -> Int {
  self.map.length()
}

///|
/// Checks whether the version vector contains any agent entries.
///
/// Parameters:
///
/// * `self` : The version vector to check.
///
/// Returns `true` if the version vector has no agents, `false` otherwise.
///
/// Example:
///
/// ```moonbit
/// let empty_vv = @dowdiness/crdt/causal_graph.VersionVector::new()
/// inspect(empty_vv.is_empty(), content="true")
///
/// let vv = @dowdiness/crdt/causal_graph.VersionVector::new().set("alice", 5)
/// inspect(vv.is_empty(), content="false")
/// ```
///
pub fn VersionVector::is_empty(self : VersionVector) -> Bool {
  self.map.length() == 0
}

///|
/// Converts a frontier (array of logical version numbers) to a compact version
/// vector representation using the causal graph.
///
/// Parameters:
///
/// * `graph` : The causal graph containing version entries and their
///   relationships.
/// * `frontier` : An array of logical version numbers representing the current
///   frontier.
///
/// Returns a `VersionVector` that compactly represents the same frontier by
/// mapping each agent to their maximum sequence number reachable from the
/// frontier.
///
/// Example:
///
/// ```moonbit
/// // Assuming we have a causal graph with some entries
/// let graph = CausalGraph::new()
/// // ... populate graph with entries ...
///
/// let frontier = [5, 8, 12] // Some logical version numbers
///
/// let vv = VersionVector::from_frontier(graph, frontier)
/// // vv now contains the maximum sequence number for each agent
/// // reachable from the frontier
/// ```
///
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
) -> Frontier {
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
/// Checks if a specific version is included within this version vector's
/// coverage.
///
/// Parameters:
///
/// * `self` : The version vector to check against.
/// * `agent` : The agent identifier to look up.
/// * `seq` : The sequence number to check for inclusion.
///
/// Returns `true` if the agent exists in the version vector and the specified
/// sequence number is less than or equal to the agent's maximum sequence
/// number, `false` otherwise.
///
/// Examples:
///
/// ```moonbit
/// let vv = @dowdiness/crdt/causal_graph.VersionVector::new()
///   |> @dowdiness/crdt/causal_graph.VersionVector::set("alice", 5)
///   |> @dowdiness/crdt/causal_graph.VersionVector::set("bob", 3)
///
/// inspect(vv.includes("alice", 3), content="true")  // 3 <= 5
/// inspect(vv.includes("alice", 5), content="true")  // 5 <= 5
/// inspect(vv.includes("alice", 7), content="false") // 7 > 5
/// inspect(vv.includes("charlie", 1), content="false") // charlie not in vector
/// ```
///
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
