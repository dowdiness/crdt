///|
fn[T] BTreeNode::navigate(self : BTreeNode[T], pos : Int) -> FindResult[T]? {
  match descend(self, pos, 0, prepare_noop, find_slot, false) {
    Some(cursor) => Some({ elem: cursor.leaf_elem, offset: cursor.offset })
    None => None
  }
}
