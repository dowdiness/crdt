// ToJson implementation for ProjNode.
// ToJson for SourceMap stays in projection/ (SourceMap is defined there).

///|
pub impl[T : ToJson] ToJson for ProjNode[T] with to_json(self) {
  let children_json : Array[Json] = self.children.map(fn(c) { c.to_json() })
  {
    "node_id": self.node_id,
    "kind": self.kind.to_json(),
    "children": children_json,
    "start": self.start,
    "end": self.end,
  }
}
