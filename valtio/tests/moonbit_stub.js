import { proxy } from 'valtio/vanilla';

export function create_egwalker_proxy(_agent_id, _undo_enabled) {
  return proxy({
    text: '',
    cursor: 0,
    syncing: false,
    __pendingOps: [],
  });
}

export function apply_remote_op(_proxy, _op_json) {}

export function get_pending_ops_json(proxyState) {
  return JSON.stringify(proxyState.__pendingOps ?? []);
}

export function get_frontier_json(_proxy) {
  return '[]';
}

export function get_frontier_raw_json(_proxy) {
  return '[]';
}

export function undo(_proxy) {}

export function redo(_proxy) {}

export function dispose_proxy(_proxy) {}

export function set_suppress_undo_tracking(_proxy, _suppress) {}
