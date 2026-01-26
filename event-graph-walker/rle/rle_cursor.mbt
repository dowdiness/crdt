///|
/// Cursor for efficient sequential traversal of Rle
pub struct RleCursor[T] {
  rle : Rle[T]
  mut run_index : Int
  mut offset_in_run : Int
  mut global_offset : Int
} derive(Show, Eq)

///|
/// Create cursor for Rle (starts at position 0)
pub fn[T] Rle::cursor(self : Rle[T]) -> RleCursor[T] {
  { rle: self, run_index: 0, offset_in_run: 0, global_offset: 0 }
}

///|
/// Current global position
pub fn[T] RleCursor::position(self : RleCursor[T]) -> Int {
  self.global_offset
}

///|
/// Current run and offset within it
pub fn[T] RleCursor::current(self : RleCursor[T]) -> (T, Int)? {
  if self.run_index >= self.rle.runs.0.length() {
    return None
  }
  Some((self.rle.runs.0[self.run_index], self.offset_in_run))
}

///|
/// Current item without offset
pub fn[T] RleCursor::current_item(self : RleCursor[T]) -> T? {
  if self.run_index >= self.rle.runs.0.length() {
    return None
  }
  Some(self.rle.runs.0[self.run_index])
}

///|
/// Check if at end
pub fn[T : HasCausalLength] RleCursor::at_end(self : RleCursor[T]) -> Bool {
  self.global_offset >= self.rle.len()
}

///|
/// Advance by n atoms
pub fn[T : HasCausalLength] RleCursor::advance(
  self : RleCursor[T],
  n : Int,
) -> Bool {
  if n <= 0 {
    return true
  }
  let total = self.rle.len()
  let target = self.global_offset + n
  if target > total {
    self.global_offset = total
    self.run_index = self.rle.runs.0.length()
    self.offset_in_run = 0
    return false
  }
  let mut remaining = n
  while remaining > 0 && self.run_index < self.rle.runs.0.length() {
    let run_len = HasCausalLength::causal_len(self.rle.runs.0[self.run_index])
    let available = run_len - self.offset_in_run
    if remaining < available {
      self.offset_in_run = self.offset_in_run + remaining
      self.global_offset = self.global_offset + remaining
      remaining = 0
    } else {
      self.global_offset = self.global_offset + available
      remaining = remaining - available
      self.run_index = self.run_index + 1
      self.offset_in_run = 0
    }
  }
  true
}

///|
/// Retreat by n atoms
pub fn[T : HasCausalLength] RleCursor::retreat(
  self : RleCursor[T],
  n : Int,
) -> Bool {
  if n <= 0 {
    return true
  }
  if n > self.global_offset {
    self.global_offset = 0
    self.run_index = 0
    self.offset_in_run = 0
    return false
  }
  let mut remaining = n
  while remaining > 0 {
    if self.offset_in_run >= remaining {
      self.offset_in_run = self.offset_in_run - remaining
      self.global_offset = self.global_offset - remaining
      remaining = 0
    } else {
      remaining = remaining - self.offset_in_run
      self.global_offset = self.global_offset - self.offset_in_run
      if self.run_index == 0 {
        self.offset_in_run = 0
        break
      }
      self.run_index = self.run_index - 1
      self.offset_in_run = HasCausalLength::causal_len(
        self.rle.runs.0[self.run_index],
      )
    }
  }
  true
}

///|
/// Seek to absolute position
pub fn[T : HasCausalLength] RleCursor::seek(
  self : RleCursor[T],
  pos : Int,
) -> Bool {
  if pos < 0 {
    self.global_offset = 0
    self.run_index = 0
    self.offset_in_run = 0
    return false
  }
  let total = self.rle.len()
  if pos >= total {
    self.global_offset = total
    self.run_index = self.rle.runs.0.length()
    self.offset_in_run = 0
    return pos == total
  }
  match self.rle.find(pos) {
    Some(found) => {
      self.run_index = found.run
      self.offset_in_run = found.offset
      self.global_offset = pos
      true
    }
    None => {
      self.global_offset = total
      self.run_index = self.rle.runs.0.length()
      self.offset_in_run = 0
      false
    }
  }
}

///|
/// Seek to start
pub fn[T] RleCursor::seek_start(self : RleCursor[T]) -> Unit {
  self.global_offset = 0
  self.run_index = 0
  self.offset_in_run = 0
}

///|
/// Seek to end
pub fn[T : HasCausalLength] RleCursor::seek_end(self : RleCursor[T]) -> Unit {
  self.global_offset = self.rle.len()
  self.run_index = self.rle.runs.0.length()
  self.offset_in_run = 0
}

///|
/// Get next item and advance
pub fn[T : HasCausalLength] RleCursor::next(self : RleCursor[T]) -> T? {
  if self.run_index >= self.rle.runs.0.length() {
    return None
  }
  let item = self.rle.runs.0[self.run_index]
  let _ = self.advance(1)
  Some(item)
}

///|
/// Retreat and get previous item
pub fn[T : HasCausalLength] RleCursor::prev(self : RleCursor[T]) -> T? {
  if self.global_offset == 0 {
    return None
  }
  let _ = self.retreat(1)
  if self.run_index < self.rle.runs.0.length() {
    Some(self.rle.runs.0[self.run_index])
  } else {
    None
  }
}

///|
/// Iterate forward from current position, yielding (item, offset_in_run, global_pos) per atom
pub fn[T : HasCausalLength] RleCursor::iter_forward(
  self : RleCursor[T],
) -> Iter[(T, Int, Int)] {
  let items = self.rle.runs.0
  let mut run_idx = self.run_index
  let mut offset = self.offset_in_run
  let mut global = self.global_offset
  Iter::new(fn() {
    if run_idx >= items.length() {
      return None
    }
    let item = items[run_idx]
    let item_len = HasCausalLength::causal_len(item)
    if offset >= item_len {
      run_idx = run_idx + 1
      offset = 0
      if run_idx >= items.length() {
        return None
      }
      let next_item = items[run_idx]
      let result = (next_item, 0, global)
      offset = 1
      global = global + 1
      return Some(result)
    }
    let result = (item, offset, global)
    offset = offset + 1
    global = global + 1
    Some(result)
  })
}
