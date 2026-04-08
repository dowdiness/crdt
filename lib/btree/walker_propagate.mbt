///|
fn[T] split_internal(
  children : Array[BTreeNode[T]],
  counts : Array[Int],
) -> (BTreeNode[T], BTreeNode[T]) {
  let mid = children.length() / 2
  let left_children : Array[BTreeNode[T]] = Array::new(capacity=mid)
  let left_counts : Array[Int] = Array::new(capacity=mid)
  let mut left_total = 0
  for i in 0..<mid {
    left_children.push(children[i])
    left_counts.push(counts[i])
    left_total = left_total + counts[i]
  }
  let right_children : Array[BTreeNode[T]] = Array::new(
    capacity=children.length() - mid,
  )
  let right_counts : Array[Int] = Array::new(capacity=children.length() - mid)
  let mut right_total = 0
  for i in mid..<children.length() {
    right_children.push(children[i])
    right_counts.push(counts[i])
    right_total = right_total + counts[i]
  }
  (
    Internal(children=left_children, counts=left_counts, total=left_total),
    Internal(children=right_children, counts=right_counts, total=right_total),
  )
}

///|
fn[T] apply_splice(
  children : Array[BTreeNode[T]],
  counts : Array[Int],
  splice : Splice[T],
) -> Unit {
  let remove_count = splice.end_idx - splice.start_idx
  for _ in 0..<remove_count {
    let _ = children.remove(splice.start_idx)
    let _ = counts.remove(splice.start_idx)
  }
  if splice.new_leaves.length() == 0 {
    return
  }
  for i in (splice.new_leaves.length() - 1)>=..0 {
    let (elem, span) = splice.new_leaves[i]
    children.insert(splice.start_idx, Leaf(elem~, span~))
    counts.insert(splice.start_idx, span)
  }
}

///|
fn[T] apply_node_splice(
  children : Array[BTreeNode[T]],
  counts : Array[Int],
  start_idx : Int,
  end_idx : Int,
  new_children : Array[BTreeNode[T]],
) -> Unit {
  let remove_count = end_idx - start_idx
  for _ in 0..<remove_count {
    let _ = children.remove(start_idx)
    let _ = counts.remove(start_idx)
  }
  if new_children.length() == 0 {
    return
  }
  for i in (new_children.length() - 1)>=..0 {
    let child = new_children[i]
    children.insert(start_idx, child)
    counts.insert(start_idx, child.total())
  }
}

///|
fn[T] maybe_split(
  children : Array[BTreeNode[T]],
  counts : Array[Int],
  min_degree : Int,
) -> (BTreeNode[T], BTreeNode[T]?) {
  let total = counts.sum()
  if children.length() > 2 * min_degree {
    let (left, right) = split_internal(children, counts)
    (left, Some(right))
  } else {
    (Internal(children~, counts~, total~), None)
  }
}

///|
pub fn[T] propagate(
  path : Array[PathFrame[T]],
  splice : Splice[T],
  min_degree : Int,
  leaf_delta : Int,
) -> PropagateResult[T] {
  guard path.length() > 0 else { abort("propagate: empty path") }
  let leaf_parent = path[path.length() - 1]
  apply_splice(leaf_parent.children, leaf_parent.counts, splice)
  let (initial_node, initial_overflow) = maybe_split(
    leaf_parent.children,
    leaf_parent.counts,
    min_degree,
  )
  let mut current_node = initial_node
  let mut overflow = initial_overflow
  for i in (path.length() - 2)>=..0 {
    let frame = path[i]
    frame.children[frame.child_idx] = current_node
    frame.counts[frame.child_idx] = current_node.total()
    match overflow {
      None => ()
      Some(sibling) => {
        frame.children.insert(frame.child_idx + 1, sibling)
        frame.counts.insert(frame.child_idx + 1, sibling.total())
      }
    }
    let (updated, next_overflow) = maybe_split(
      frame.children,
      frame.counts,
      min_degree,
    )
    current_node = updated
    overflow = next_overflow
  }
  { node: current_node, overflow, leaf_delta }
}

///|
pub fn[T] propagate_node_splice(
  splice : NodeSplice[T],
  min_degree : Int,
) -> PropagateResult[T] {
  apply_node_splice(
    splice.children,
    splice.counts,
    splice.start_idx,
    splice.end_idx,
    splice.new_children,
  )
  let (initial_node, initial_overflow) = maybe_split(
    splice.children,
    splice.counts,
    min_degree,
  )
  let mut current_node = initial_node
  let mut overflow = initial_overflow
  for i in (splice.prefix.length() - 1)>=..0 {
    let frame = splice.prefix[i]
    frame.children[frame.child_idx] = current_node
    frame.counts[frame.child_idx] = current_node.total()
    match overflow {
      None => ()
      Some(sibling) => {
        frame.children.insert(frame.child_idx + 1, sibling)
        frame.counts.insert(frame.child_idx + 1, sibling.total())
      }
    }
    let (updated, next_overflow) = maybe_split(
      frame.children,
      frame.counts,
      min_degree,
    )
    current_node = updated
    overflow = next_overflow
  }
  { node: current_node, overflow, leaf_delta: splice.leaf_delta }
}
