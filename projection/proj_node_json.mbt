// ToJson implementations for ProjNode and SourceMap.
// These enable the ProseMirror bridge to read AST structure
// and position mappings from JavaScript via FFI.

///|
pub impl ToJson for ProjNode with to_json(self) {
  let children_json : Array[Json] = self.children.map(fn(c) { c.to_json() })
  {
    "node_id": self.node_id,
    "kind": self.kind.to_json(),
    "children": children_json,
    "start": self.start,
    "end": self.end,
  }
}

///|
pub impl ToJson for SourceMap with to_json(self) {
  let entries : Array[Json] = []
  for node_id, range in self.node_to_range {
    entries.push({
      "node_id": node_id.0,
      "start": range.start,
      "end": range.end,
    })
  }
  Json::array(entries)
}
