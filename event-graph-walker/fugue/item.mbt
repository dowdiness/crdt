///| Item structure for FugueMax tree

///|
/// Side of parent node where item is attached
pub enum Side {
  Left
  Right
} derive(Show, Eq)

///|
/// Item in the sequence - represents a character or text chunk
pub struct Item {
  id : Int // LV that created this item
  content : String // The character(s)
  parent : Int // Parent item ID in tree (-1 for root)
  side : Side // Which side of parent (Left or Right)
  deleted : Bool // Is this item deleted (tombstone)
  timestamp : Int // Lamport timestamp for tie-breaking
  agent : String // Agent that created this item (for deterministic tiebreaking)
} derive(Show, Eq)

///|
/// Compares two items to establish their order in the FugueMax sequence.
///
/// Parameters:
///
/// * `self` : The first item to compare.
/// * `other` : The second item to compare against.
///
/// Returns an integer indicating the relative order: negative if `self` comes
/// before `other`, zero if they are equal, positive if `self` comes after
/// `other`.
///
/// Example:
///
/// ```moonbit
/// let item1 = Item::new(1, "a", -1, Left, 10, "agent1")
/// let item2 = Item::new(2, "b", -1, Left, 20, "agent2")
/// inspect(item1.compare(item2), content="-1") // item1 comes before item2 due to earlier timestamp
/// ```
///
impl Compare for Item with compare(self, other) -> Int {
  // First compare by Lamport timestamp for causal ordering
  let ts_cmp = self.timestamp.compare(other.timestamp)
  if ts_cmp != 0 {
    return ts_cmp
  }

  // If timestamps equal, compare by agent for deterministic tiebreaking
  let agent_cmp = self.agent.compare(other.agent)
  if agent_cmp != 0 {
    return agent_cmp
  }

  // If agents equal, compare by ID
  self.id.compare(other.id)
}

///|
/// Create a new item
fn Item::new(
  id : Int,
  content : String,
  parent : Int,
  side : Side,
  timestamp : Int,
  agent : String,
) -> Item {
  { id, content, parent, side, deleted: false, timestamp, agent }
}

///|
/// Mark item as deleted
fn Item::mark_deleted(self : Item) -> Item {
  { ..self, deleted: true }
}

///|
/// Check if item is visible (not deleted)
fn Item::is_visible(self : Item) -> Bool {
  not(self.deleted)
}
