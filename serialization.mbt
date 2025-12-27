// Serialization utilities for WebAssembly bindings
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
  let mut result = "["
  for i = 0; i < ops.length(); i = i + 1 {
    if i > 0 {
      result = result + ","
    }
    result = result + serialize_op(ops[i])
  }
  result + "]"
}

/// Serialize array of integers to JSON
fn serialize_int_array(arr : Array[Int]) -> String {
  let mut result = "["
  for i = 0; i < arr.length(); i = i + 1 {
    if i > 0 {
      result = result + ","
    }
    result = result + arr[i].to_string()
  }
  result + "]"
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
  let mut result = "["
  for i = 0; i < nodes.length(); i = i + 1 {
    if i > 0 {
      result = result + ","
    }
    result = result + serialize_ast(nodes[i])
  }
  result + "]"
}

/// Serialize array of error strings to JSON
pub fn serialize_errors(errors : Array[String]) -> String {
  let mut result = "["
  for i = 0; i < errors.length(); i = i + 1 {
    if i > 0 {
      result = result + ","
    }
    result = result + "\"" + escape_json(errors[i]) + "\""
  }
  result + "]"
}

/// Escape JSON special characters
fn escape_json(s : String) -> String {
  let mut result = ""
  let length = s.length()
  for i = 0; i < length; i = i + 1 {
    let c = s[i]
    match c {
      '"' => result = result + "\\\""
      '\\' => result = result + "\\\\"
      '\n' => result = result + "\\n"
      '\r' => result = result + "\\r"
      '\t' => result = result + "\\t"
      _ => result = result + c.to_string()
    }
  }
  result
}
