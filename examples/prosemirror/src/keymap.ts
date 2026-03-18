import { keymap } from "prosemirror-keymap";
import { NodeSelection } from "prosemirror-state";
import { CrdtBridge } from "./bridge";

/**
 * ProseMirror keymap plugin for structural operations on AST nodes.
 * Only active when a node is selected (NodeSelection).
 */
export function structuralKeymap(bridge: CrdtBridge) {
  return keymap({
    "Backspace": (state) => {
      if (!(state.selection instanceof NodeSelection)) return false;
      const nodeId = state.selection.node.attrs.nodeId;
      if (nodeId == null) return false;
      bridge.handleStructuralEdit("Delete", nodeId);
      return true;
    },
    "Mod-l": (state) => {
      if (!(state.selection instanceof NodeSelection)) return false;
      const nodeId = state.selection.node.attrs.nodeId;
      if (nodeId == null) return false;
      bridge.handleStructuralEdit("WrapInLambda", nodeId, { var_name: "x" });
      return true;
    },
  });
}
