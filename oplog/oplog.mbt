///| Operation log implementation

///|
/// OpLog - stores operations with causal graph
pub struct OpLog {
  mut operations : Array[Op] // All operations in LV order
  graph : @causal_graph.CausalGraph // The causal graph
  agent_id : String // This agent's ID
} derive(Show)

///|
/// Create a new OpLog
pub fn OpLog::new(agent_id : String) -> OpLog {
  { operations: [], graph: @causal_graph.CausalGraph::new(), agent_id }
}

///|
/// Add a new operation to the log
pub fn OpLog::add_op(self : OpLog, op : Op) -> Unit {
  let ops = self.operations
  ops.push(op)
  self.operations = ops
}

///|
/// Create and add an insert operation
pub fn OpLog::insert(
  self : OpLog,
  text : String,
  origin_left : Int,
  origin_right : Int,
) -> Op {
  let parents = self.graph.get_frontier()
  let lv = self.graph.add_version(parents, self.agent_id)
  let op = Op::new_insert(lv, parents, text, origin_left, origin_right)
  self.add_op(op)
  op
}

///|
/// Create and add a delete operation
pub fn OpLog::delete(self : OpLog, origin_left : Int) -> Op {
  let parents = self.graph.get_frontier()
  let lv = self.graph.add_version(parents, self.agent_id)
  let op = Op::new_delete(lv, parents, origin_left)
  self.add_op(op)
  op
}

///|
/// Get operation by LV
pub fn OpLog::get_op(self : OpLog, lv : Int) -> Op? {
  if lv >= 0 && lv < self.operations.length() {
    Some(self.operations[lv])
  } else {
    None
  }
}

///|
/// Get all operations
pub fn OpLog::get_all_ops(self : OpLog) -> Array[Op] {
  self.operations.copy()
}

///|
/// Get operation count
pub fn OpLog::op_count(self : OpLog) -> Int {
  self.operations.length()
}

///|
/// Get current frontier
pub fn OpLog::get_frontier(self : OpLog) -> Array[Int] {
  self.graph.get_frontier()
}

///|
/// Apply a remote operation
pub fn OpLog::apply_remote(self : OpLog, op : Op) -> Unit {
  // Add version to graph
  let _lv = self.graph.add_version(op.parents, "remote")

  // Add operation
  self.add_op(op)
}
