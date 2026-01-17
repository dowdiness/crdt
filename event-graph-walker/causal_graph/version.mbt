///| Version types for eg-walker CRDT

///|

///| We use plain Int for LV (Local Version) and String for AgentId

///| to avoid MoonBit type alias complications

///|
/// Local Version - monotonic counter for operations
pub type LV = Int

///|
/// Agent ID - identifies a replica
pub type AgentId = String

///|
/// Raw Version - globally unique operation identifier
pub struct RawVersion {
  agent : String
  seq : Int
} derive(Eq, Compare, Show, ToJson, FromJson)

///|
/// Create a new RawVersion
pub fn RawVersion::new(agent : String, seq : Int) -> RawVersion {
  { agent, seq }
}

///|
/// Convert RawVersion to string representation
pub fn RawVersion::to_string(self : RawVersion) -> String {
  "\{self.agent}:\{self.seq}"
}

///|
/// Implement Hash for RawVersion
pub impl Hash for RawVersion with hash(self) {
  self.agent.hash() + self.seq.hash() * 31
}

///|
/// Implement Hash for RawVersion with hash_combine
pub impl Hash for RawVersion with hash_combine(self, hasher) {
  hasher.combine_string(self.agent)
  hasher.combine_int(self.seq)
}
