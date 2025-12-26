///| Item structure for FugueMax tree

///|
/// Item in the sequence - represents a character or text chunk
pub struct Item {
  id : Int // LV that created this item
  content : String // The character(s)
  parent : Int // Parent item ID in tree (-1 for root)
  deleted : Bool // Is this item deleted (tombstone)
  timestamp : Int // Lamport timestamp for tie-breaking
} derive(Show)

///|
/// Create a new item
pub fn Item::new(
  id : Int,
  content : String,
  parent : Int,
  timestamp : Int,
) -> Item {
  { id, content, parent, deleted: false, timestamp }
}

///|
/// Create a deleted item
pub fn Item::new_deleted(
  id : Int,
  content : String,
  parent : Int,
  timestamp : Int,
) -> Item {
  { id, content, parent, deleted: true, timestamp }
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
