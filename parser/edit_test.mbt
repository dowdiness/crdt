// Tests for Edit

///|
test "Edit::new creates edit" {
  let edit = Edit::new(5, 10, 12)
  inspect(edit.start, content="5")
  inspect(edit.old_end, content="10")
  inspect(edit.new_end, content="12")
}

///|
test "Edit::deleted_length" {
  let edit = Edit::new(5, 10, 8)
  inspect(edit.deleted_length(), content="5")
}

///|
test "Edit::inserted_length" {
  let edit = Edit::new(5, 10, 12)
  inspect(edit.inserted_length(), content="7")
}

///|
test "Edit::delta for insertion" {
  let edit = Edit::insert(5, 3)
  inspect(edit.delta(), content="3")
}

///|
test "Edit::delta for deletion" {
  let edit = Edit::delete(5, 10)
  inspect(edit.delta(), content="-5")
}

///|
test "Edit::delta for replacement" {
  let edit = Edit::replace(5, 10, 12)
  inspect(edit.delta(), content="2")
}

///|
test "Edit::apply_to_position before edit" {
  let edit = Edit::new(10, 15, 20)
  let new_pos = edit.apply_to_position(5)
  inspect(new_pos, content="5") // Unchanged
}

///|
test "Edit::apply_to_position within edit" {
  let edit = Edit::new(10, 15, 20)
  let new_pos = edit.apply_to_position(12)
  inspect(new_pos, content="10") // Mapped to start
}

///|
test "Edit::apply_to_position after edit" {
  let edit = Edit::new(10, 15, 20)
  let new_pos = edit.apply_to_position(20)
  inspect(new_pos, content="25") // Shifted by delta (+5)
}

///|
test "Edit::affects_position" {
  let edit = Edit::new(10, 15, 20)
  inspect(edit.affects_position(5), content="false")
  inspect(edit.affects_position(12), content="true")
  inspect(edit.affects_position(20), content="false")
}

///|
test "Edit::overlaps_range" {
  let edit = Edit::new(10, 15, 20)
  inspect(edit.overlaps_range(5, 8), content="false")
  inspect(edit.overlaps_range(5, 12), content="true")
  inspect(edit.overlaps_range(12, 18), content="true")
  inspect(edit.overlaps_range(20, 25), content="false")
}
