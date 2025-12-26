///|
/// Basic API test for the CRDT editor
test "create editor and insert text" {
  let editor = new_editor("alice")
  insert(editor, "Hello")
  inspect(get_text(editor), content="Hello")
  inspect(get_cursor(editor), content="5")
}

///|
/// Test document API
test "create document" {
  let doc = new_document("alice")
  let _op = doc_insert(doc, 0, "World")
  inspect(doc_to_text(doc), content="World")
}
