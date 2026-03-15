///|
test "compat compute_text_change maps the shared change shape" {
  let change = compute_text_change("abc", "aXYc")
  inspect(change.start, content="1")
  inspect(change.delete_len, content="1")
  inspect(change.inserted, content="XY")
}

///|
test "compat compute_text_change preserves no-op" {
  let change = compute_text_change("abc", "abc")
  inspect(change.start, content="3")
  inspect(change.delete_len, content="0")
  inspect(change.inserted, content="")
  inspect(change.is_noop(), content="true")
}

///|
test "TextChange::to_parser_edit preserves coordinates" {
  let edit = compute_text_change("hello", "heXllo").to_parser_edit()
  inspect(edit.start, content="2")
  inspect(edit.old_len, content="0")
  inspect(edit.new_len, content="1")
}
