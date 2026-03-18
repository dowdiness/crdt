import { EditorView as PmView, NodeView } from "prosemirror-view";
import { Node as PmNode } from "prosemirror-model";
import { EditorView as CmView } from "@codemirror/view";
import { EditorState as CmState } from "@codemirror/state";

export class LetDefView implements NodeView {
  dom: HTMLElement;
  contentDOM: HTMLElement;
  nameCm: CmView;
  node: PmNode;
  updating = false;

  constructor(node: PmNode, _pmView: PmView, _getPos: () => number | undefined) {
    this.node = node;
    this.dom = document.createElement("div");
    this.dom.className = "pm-let-def";

    // "let" keyword
    const keyword = document.createElement("span");
    keyword.textContent = "let ";
    keyword.className = "pm-let-keyword";
    this.dom.appendChild(keyword);

    // CM6 for binding name
    const nameWrap = document.createElement("span");
    nameWrap.className = "pm-let-name";
    this.nameCm = new CmView({
      state: CmState.create({
        doc: node.attrs.name,
        extensions: [
          CmView.theme({
            "&": { display: "inline-block", padding: "0 2px" },
            ".cm-content": { padding: "0" },
            ".cm-line": { padding: "0" },
            "&.cm-focused": { outline: "1px solid #66f" },
          }),
          CmState.transactionFilter.of(tr => {
            if (tr.newDoc.lines > 1) return [];
            return tr;
          }),
        ],
      }),
      parent: nameWrap,
    });
    this.dom.appendChild(nameWrap);

    // " = " separator
    const eq = document.createElement("span");
    eq.textContent = " = ";
    eq.className = "pm-let-eq";
    this.dom.appendChild(eq);

    // contentDOM -- PM manages the init expression child
    this.contentDOM = document.createElement("span");
    this.contentDOM.className = "pm-let-init";
    this.dom.appendChild(this.contentDOM);
  }

  update(node: PmNode): boolean {
    if (node.type.name !== "let_def") return false;
    this.updating = true;
    const newName = node.attrs.name;
    const oldName = this.nameCm.state.doc.toString();
    if (newName !== oldName) {
      this.nameCm.dispatch({
        changes: { from: 0, to: oldName.length, insert: newName },
      });
    }
    this.node = node;
    this.updating = false;
    return true;
  }

  ignoreMutation() { return true; }
  destroy() { this.nameCm.destroy(); }
}
