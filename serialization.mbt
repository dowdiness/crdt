// Serialization utilities for JavaScript bindings
// Converts MoonBit types to JSON strings for JavaScript interop

/// Serialize OpContent to JSON
fn serialize_op_content(content : @oplog.OpContent) -> String {
  match content {
    Insert(text) => "{\"Insert\":\"" + escape_json(text) + "\"}"
    Delete => "{\"Delete\":null}"
  }
}

/// Serialize a single operation to JSON
pub fn serialize_op(op : @oplog.Op) -> String {
  let parents = serialize_int_array(op.parents)
  let agent = "\"" + escape_json(op.agent) + "\""
  let content = serialize_op_content(op.content)

  "{\"lv\":" + op.lv.to_string() +
  ",\"parents\":" + parents +
  ",\"agent\":" + agent +
  ",\"seq\":" + op.seq.to_string() +
  ",\"content\":" + content +
  ",\"origin_left\":" + op.origin_left.to_string() +
  ",\"origin_right\":" + op.origin_right.to_string() +
  "}"
}

/// Serialize array of operations to JSON
pub fn serialize_ops(ops : Array[@oplog.Op]) -> String {
  let parts : Array[String] = []
  parts.push("[")
  for i = 0; i < ops.length(); i = i + 1 {
    if i > 0 {
      parts.push(",")
    }
    parts.push(serialize_op(ops[i]))
  }
  parts.push("]")
  parts.join("")
}

/// Serialize array of integers to JSON
fn serialize_int_array(arr : Array[Int]) -> String {
  let parts : Array[String] = []
  parts.push("[")
  for i = 0; i < arr.length(); i = i + 1 {
    if i > 0 {
      parts.push(",")
    }
    parts.push(arr[i].to_string())
  }
  parts.push("]")
  parts.join("")
}

/// Serialize TermKind to JSON
fn serialize_term_kind(kind : @parser.TermKind) -> String {
  match kind {
    Int(n) => "{\"tag\":\"Int\",\"value\":" + n.to_string() + "}"
    Var(name) => "{\"tag\":\"Var\",\"value\":\"" + escape_json(name) + "\"}"
    Lam(param) => "{\"tag\":\"Lam\",\"value\":\"" + escape_json(param) + "\"}"
    App => "{\"tag\":\"App\"}"
    Bop(op) => {
      let op_str = match op {
        @parser.Plus => "Plus"
        @parser.Minus => "Minus"
      }
      "{\"tag\":\"Bop\",\"value\":\"" + op_str + "\"}"
    }
    If => "{\"tag\":\"If\"}"
    Error(msg) => "{\"tag\":\"Error\",\"value\":\"" + escape_json(msg) + "\"}"
  }
}

/// Serialize TermNode to JSON (recursive)
pub fn serialize_ast(node : @parser.TermNode) -> String {
  let kind = serialize_term_kind(node.kind)
  let children = serialize_ast_array(node.children)

  "{\"kind\":" + kind +
  ",\"start\":" + node.start.to_string() +
  ",\"end\":" + node.end.to_string() +
  ",\"node_id\":" + node.node_id.to_string() +
  ",\"children\":" + children +
  "}"
}

/// Serialize array of TermNode to JSON
fn serialize_ast_array(nodes : Array[@parser.TermNode]) -> String {
  let parts : Array[String] = []
  parts.push("[")
  for i = 0; i < nodes.length(); i = i + 1 {
    if i > 0 {
      parts.push(",")
    }
    parts.push(serialize_ast(nodes[i]))
  }
  parts.push("]")
  parts.join("")
}

/// Serialize array of error strings to JSON
pub fn serialize_errors(errors : Array[String]) -> String {
  let parts : Array[String] = []
  parts.push("[")
  for i = 0; i < errors.length(); i = i + 1 {
    if i > 0 {
      parts.push(",")
    }
    parts.push("\"")
    parts.push(escape_json(errors[i]))
    parts.push("\"")
  }
  parts.push("]")
  parts.join("")
}

/// Escape JSON special characters
fn escape_json(s : String) -> String {
  let parts : Array[String] = []
  let length = s.length()
  for i = 0; i < length; i = i + 1 {
    let code = s.code_unit_at(i).to_int()
    let c = Int::unsafe_to_char(code)
    match c {
      '"' => parts.push("\\\"")
      '\\' => parts.push("\\\\")
      '\n' => parts.push("\\n")
      '\r' => parts.push("\\r")
      '\t' => parts.push("\\t")
      _ => {
        // Use Char.to_string() which properly converts char to string
        parts.push(Char::to_string(c))
      }
    }
  }
  parts.join("")
}
