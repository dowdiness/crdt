// JavaScript FFI Bridge for EgWalker Integration
//
// Exports EgWalkerProxy to JavaScript for use in web applications

///|
/// JavaScript API Export
/// Create a new EgWalker proxy from JavaScript
pub extern "js" fn create_egwalker_proxy(
  agent_id : String,
  undo_enabled : Bool,
) -> ValtioProxy =
  #|(agent_id, undo_enabled) => {
  #|  const proxy = new EgWalkerProxy(agent_id, undo_enabled);
  #|  proxy.init();
  #|  // Return the Valtio proxy for React/JS usage
  #|  return proxy.proxy_state;
  #|}

///|
/// Operation Handling
/// Apply a remote operation from JavaScript
pub extern "js" fn apply_remote_op(
  proxy_state : ValtioProxy,
  op_json : String,
) -> Unit =
  #|(proxy_state, op_json) => {
  #|  const instance = globalThis.__egwalker_instances.get(proxy_state);
  #|  const op = JSON.parse(op_json);
  #|  instance.apply_remote(op);
  #|}

///|
/// Get pending operations as JSON for network sync
pub extern "js" fn get_pending_ops_json(proxy_state : ValtioProxy) -> String =
  #|(proxy_state) => {
  #|  const instance = globalThis.__egwalker_instances.get(proxy_state);
  #|  const ops = instance.get_pending_ops();
  #|  return JSON.stringify(ops);
  #|}

///|
/// Get frontier as JSON
pub extern "js" fn get_frontier_json(proxy_state : ValtioProxy) -> String =
  #|(proxy_state) => {
  #|  const instance = globalThis.__egwalker_instances.get(proxy_state);
  #|  const frontier = instance.get_frontier();
  #|  return JSON.stringify(frontier);
  #|}

///|
/// Undo/Redo API
/// Undo the last operation
pub extern "js" fn undo(proxy_state : ValtioProxy) -> Unit =
  #|(proxy_state) => {
  #|  const instance = globalThis.__egwalker_instances.get(proxy_state);
  #|  instance.undo();
  #|}

///|
/// Redo the last undone operation
pub extern "js" fn redo(proxy_state : ValtioProxy) -> Unit =
  #|(proxy_state) => {
  #|  const instance = globalThis.__egwalker_instances.get(proxy_state);
  #|  instance.redo();
  #|}

///|
/// Cleanup
/// Dispose of the proxy and clean up resources
pub extern "js" fn dispose_proxy(proxy_state : ValtioProxy) -> Unit =
  #|(proxy_state) => {
  #|  const instance = globalThis.__egwalker_instances.get(proxy_state);
  #|  if (instance) {
  #|    instance.dispose();
  #|    globalThis.__egwalker_instances.delete(proxy_state);
  #|  }
  #|}
