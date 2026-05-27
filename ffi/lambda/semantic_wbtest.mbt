///|
test "get_semantic_projection_json exposes free-variable overlay" {
  let handle = create_editor("semantic-ffi")
  set_text(handle, "λx. y")
  let json = get_semantic_projection_json(handle)
  assert_true(json.contains("\"semantic-free\""))
  assert_true(json.contains("Free variable 'y'"))
  destroy_editor(handle)
}
