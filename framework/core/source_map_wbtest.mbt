///|
test "get_all_token_spans returns sorted pairs" {
  let sm = SourceMap::new()
  let nid = NodeId::from_int(1)
  sm.set_token_span(nid, "param", @loomcore.Range::new(5, 8))
  sm.set_token_span(nid, "name", @loomcore.Range::new(1, 3))
  let spans = sm.get_all_token_spans(nid)
  // Should be sorted by range start: name(1..3) before param(5..8)
  inspect(spans.length(), content="2")
  inspect(spans[0].0, content="name")
  inspect(spans[0].1.start, content="1")
  inspect(spans[1].0, content="param")
  inspect(spans[1].1.start, content="5")
}

///|
test "get_all_token_spans returns empty for unknown node" {
  let sm = SourceMap::new()
  let nid = NodeId::from_int(99)
  let spans = sm.get_all_token_spans(nid)
  inspect(spans.length(), content="0")
}
