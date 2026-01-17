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
} derive(Show)

///|
/// Create a new item
pub fn Item::new(
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
pub fn Item::mark_deleted(self : Item) -> Item {
  { ..self, deleted: true }
}

///|
/// Check if item is visible (not deleted)
pub fn Item::is_visible(self : Item) -> Bool {
  not(self.deleted)
}
