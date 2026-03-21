// JSON parser for TreeEditOp — enables structural edits from JavaScript.
// Used by the apply_tree_edit_json FFI function in crdt.mbt.

///|
/// Extract a NodeId from a JSON map at the given key.
fn require_node_id(
  m : Map[String, Json],
  key : String,
) -> Result[@proj.NodeId, String] {
  match m.get(key) {
    Some(Json::Number(n, ..)) => Ok(@proj.NodeId::from_int(n.to_int()))
    _ => Err("missing " + key + " field")
  }
}

///|
/// Parse a binary operator name string into an ast Bop.
fn parse_bop_string(s : String) -> Result[@ast.Bop, String] {
  match s {
    "Plus" => Ok(@ast.Bop::Plus)
    "Minus" => Ok(@ast.Bop::Minus)
    _ => Err("unknown bop: " + s)
  }
}

///|
/// Extract a required Bop from a JSON map at the given key.
fn require_bop(
  m : Map[String, Json],
  key : String,
) -> Result[@ast.Bop, String] {
  match m.get(key) {
    Some(Json::String(s)) => parse_bop_string(s)
    _ => Err("missing " + key + " field")
  }
}

///|
/// Extract a required string from a JSON map at the given key.
fn require_string(
  m : Map[String, Json],
  key : String,
) -> Result[String, String] {
  match m.get(key) {
    Some(Json::String(s)) => Ok(s)
    _ => Err("missing " + key + " field")
  }
}

///|
/// Parse a JSON value into a TreeEditOp.
/// Expected formats:
///   {"type": "Delete", "node_id": 5}
///   {"type": "WrapInLambda", "node_id": 5, "var_name": "x"}
///   {"type": "Select", "node_id": 5}
pub fn parse_tree_edit_op(json : Json) -> Result[@proj.TreeEditOp, String] {
  let m = match json {
    Json::Object(m) => m
    _ => return Err("expected JSON object")
  }
  let op_type = match m.get("type") {
    Some(Json::String(s)) => s
    _ => return Err("missing type field")
  }
  match op_type {
    "Delete" => {
      let node_id = match require_node_id(m, "node_id") {
        Ok(id) => id
        Err(e) => return Err(e)
      }
      Ok(@proj.TreeEditOp::Delete(node_id~))
    }
    "WrapInLambda" => {
      let node_id = match require_node_id(m, "node_id") {
        Ok(id) => id
        Err(e) => return Err(e)
      }
      let var_name = match m.get("var_name") {
        Some(Json::String(s)) => s
        None => "x"
        Some(_) => return Err("var_name must be a string")
      }
      Ok(@proj.TreeEditOp::WrapInLambda(node_id~, var_name~))
    }
    "WrapInApp" => {
      let node_id = match require_node_id(m, "node_id") {
        Ok(id) => id
        Err(e) => return Err(e)
      }
      Ok(@proj.TreeEditOp::WrapInApp(node_id~))
    }
    "Select" => {
      let node_id = match require_node_id(m, "node_id") {
        Ok(id) => id
        Err(e) => return Err(e)
      }
      Ok(@proj.TreeEditOp::Select(node_id~))
    }
    "Collapse" => {
      let node_id = match require_node_id(m, "node_id") {
        Ok(id) => id
        Err(e) => return Err(e)
      }
      Ok(@proj.TreeEditOp::Collapse(node_id~))
    }
    "Expand" => {
      let node_id = match require_node_id(m, "node_id") {
        Ok(id) => id
        Err(e) => return Err(e)
      }
      Ok(@proj.TreeEditOp::Expand(node_id~))
    }
    "Unwrap" => {
      let node_id = match require_node_id(m, "node_id") {
        Ok(id) => id
        Err(e) => return Err(e)
      }
      let keep_child_index = match m.get("keep_child_index") {
        Some(Json::Number(n, ..)) => n.to_int()
        _ => return Err("missing keep_child_index field")
      }
      Ok(@proj.TreeEditOp::Unwrap(node_id~, keep_child_index~))
    }
    "SwapChildren" => {
      let node_id = match require_node_id(m, "node_id") {
        Ok(id) => id
        Err(e) => return Err(e)
      }
      Ok(@proj.TreeEditOp::SwapChildren(node_id~))
    }
    "WrapInIf" => {
      let node_id = match require_node_id(m, "node_id") {
        Ok(id) => id
        Err(e) => return Err(e)
      }
      Ok(@proj.TreeEditOp::WrapInIf(node_id~))
    }
    "WrapInBop" => {
      let node_id = match require_node_id(m, "node_id") {
        Ok(id) => id
        Err(e) => return Err(e)
      }
      let op = match require_bop(m, "op") {
        Ok(bop) => bop
        Err(e) => return Err(e)
      }
      Ok(@proj.TreeEditOp::WrapInBop(node_id~, op~))
    }
    "ChangeOperator" => {
      let node_id = match require_node_id(m, "node_id") {
        Ok(id) => id
        Err(e) => return Err(e)
      }
      let new_op = match require_bop(m, "new_op") {
        Ok(bop) => bop
        Err(e) => return Err(e)
      }
      Ok(@proj.TreeEditOp::ChangeOperator(node_id~, new_op~))
    }
    "ExtractToLet" => {
      let node_id = match require_node_id(m, "node_id") {
        Ok(id) => id
        Err(e) => return Err(e)
      }
      let var_name = match require_string(m, "var_name") {
        Ok(s) => s
        Err(e) => return Err(e)
      }
      Ok(@proj.TreeEditOp::ExtractToLet(node_id~, var_name~))
    }
    "InlineDefinition" => {
      let node_id = match require_node_id(m, "node_id") {
        Ok(id) => id
        Err(e) => return Err(e)
      }
      Ok(@proj.TreeEditOp::InlineDefinition(node_id~))
    }
    "Rename" => {
      let node_id = match require_node_id(m, "node_id") {
        Ok(id) => id
        Err(e) => return Err(e)
      }
      let new_name = match require_string(m, "new_name") {
        Ok(s) => s
        Err(e) => return Err(e)
      }
      Ok(@proj.TreeEditOp::Rename(node_id~, new_name~))
    }
    "DeleteBinding" => {
      let binding_node_id = match require_node_id(m, "binding_node_id") {
        Ok(id) => id
        Err(e) => return Err(e)
      }
      Ok(@proj.TreeEditOp::DeleteBinding(binding_node_id~))
    }
    "InlineAllUsages" => {
      let binding_node_id = match require_node_id(m, "binding_node_id") {
        Ok(id) => id
        Err(e) => return Err(e)
      }
      Ok(@proj.TreeEditOp::InlineAllUsages(binding_node_id~))
    }
    "DuplicateBinding" => {
      let binding_node_id = match require_node_id(m, "binding_node_id") {
        Ok(id) => id
        Err(e) => return Err(e)
      }
      Ok(@proj.TreeEditOp::DuplicateBinding(binding_node_id~))
    }
    "MoveBindingUp" => {
      let binding_node_id = match require_node_id(m, "binding_node_id") {
        Ok(id) => id
        Err(e) => return Err(e)
      }
      Ok(@proj.TreeEditOp::MoveBindingUp(binding_node_id~))
    }
    "MoveBindingDown" => {
      let binding_node_id = match require_node_id(m, "binding_node_id") {
        Ok(id) => id
        Err(e) => return Err(e)
      }
      Ok(@proj.TreeEditOp::MoveBindingDown(binding_node_id~))
    }
    "AddBinding" => {
      let module_node_id = match require_node_id(m, "module_node_id") {
        Ok(id) => id
        Err(e) => return Err(e)
      }
      Ok(@proj.TreeEditOp::AddBinding(module_node_id~))
    }
    _ => Err("unknown op type: " + op_type)
  }
}
