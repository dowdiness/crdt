///| Whitebox tests for Markdown projection.

///|
test "projection: empty document" {
  let (proj, errors) = parse_to_proj_node("")
  inspect(errors.length(), content="0")
  inspect(proj.children.length(), content="0")
}

///|
test "projection: single paragraph" {
  let (proj, _) = parse_to_proj_node("Hello world")
  inspect(proj.children.length(), content="1")
}

///|
test "projection: heading levels" {
  let (proj, _) = parse_to_proj_node("# H1\n\n## H2\n\n### H3")
  inspect(proj.children.length(), content="3")
}

///|
test "projection: unordered list" {
  let (proj, _) = parse_to_proj_node("- first\n- second\n- third")
  inspect(proj.children.length(), content="1")
  let list = proj.children[0]
  inspect(list.children.length(), content="3")
}

///|
test "projection: code block" {
  let (proj, _) = parse_to_proj_node("```js\nconsole.log(42)\n```")
  inspect(proj.children.length(), content="1")
}

///|
test "projection: mixed blocks" {
  let source = "# Title\n\nSome text.\n\n- item one\n- item two\n\nMore text."
  let (proj, _) = parse_to_proj_node(source)
  inspect(proj.children.length(), content="4")
}

///|
test "projection: node positions span source text" {
  let source = "# Hello\n\nWorld"
  let (proj, _) = parse_to_proj_node(source)
  inspect(proj.start, content="0")
  inspect(proj.children[0].start, content="0")
}

///|
test "projection: IDs are unique" {
  let (proj, _) = parse_to_proj_node("# H1\n\n- a\n- b")
  let ids : Array[Int] = []
  fn collect(node : @core.ProjNode[@markdown.Block]) {
    ids.push(node.node_id)
    for child in node.children {
      collect(child)
    }
  }
  collect(proj)
  let unique : Map[Int, Bool] = {}
  let mut all_unique = true
  for id in ids {
    if unique.get(id) == Some(true) {
      all_unique = false
    }
    unique[id] = true
  }
  inspect(all_unique, content="true")
}
