// ViewNode: Serializable view tree for the editor protocol.
// Flattens ProjNode[T] + SourceMap into a language-agnostic representation
// suitable for JSON transport to the UI layer.

///|
pub(all) struct TokenSpan {
  role : String
  start : Int
  end : Int

  fn new(role~ : String, start~ : Int, end~ : Int) -> TokenSpan
} derive(Show, Eq)

///|
pub fn TokenSpan::new(role~ : String, start~ : Int, end~ : Int) -> TokenSpan {
  { role, start, end }
}

///|
pub(all) struct ViewNode {
  id : @core.NodeId
  kind_tag : String
  label : String
  text : String?
  text_range : (Int, Int)
  token_spans : Array[TokenSpan]
  editable : Bool
  css_class : String
  children : Array[ViewNode]

  fn new(
    id~ : @core.NodeId,
    kind_tag~ : String,
    label~ : String,
    text? : String,
    text_range~ : (Int, Int),
    token_spans? : Array[TokenSpan],
    editable? : Bool,
    css_class? : String,
    children? : Array[ViewNode],
  ) -> ViewNode
} derive(Show, Eq)

///|
pub fn ViewNode::new(
  id~ : @core.NodeId,
  kind_tag~ : String,
  label~ : String,
  text? : String,
  text_range~ : (Int, Int),
  token_spans? : Array[TokenSpan] = [],
  editable? : Bool = false,
  css_class? : String = "",
  children? : Array[ViewNode] = [],
) -> ViewNode {
  {
    id,
    kind_tag,
    label,
    text,
    text_range,
    token_spans,
    editable,
    css_class,
    children,
  }
}

///|
pub impl ToJson for TokenSpan with to_json(self) {
  let m : Map[String, Json] = {}
  m["role"] = self.role.to_json()
  m["start"] = self.start.to_json()
  m["end"] = self.end.to_json()
  Json::object(m)
}

///|
pub impl ToJson for ViewNode with to_json(self) {
  let m : Map[String, Json] = {}
  let NodeId(id_int) = self.id
  m["id"] = id_int.to_json()
  m["kind_tag"] = self.kind_tag.to_json()
  m["label"] = self.label.to_json()
  m["text"] = match self.text {
    Some(t) => t.to_json()
    None => Json::null()
  }
  let (range_start, range_end) = self.text_range
  m["text_range"] = Json::array([range_start.to_json(), range_end.to_json()])
  m["token_spans"] = Json::array(self.token_spans.map(fn(ts) { ts.to_json() }))
  m["editable"] = self.editable.to_json()
  m["css_class"] = self.css_class.to_json()
  m["children"] = Json::array(self.children.map(fn(c) { c.to_json() }))
  Json::object(m)
}
