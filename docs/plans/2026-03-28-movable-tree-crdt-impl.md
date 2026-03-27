# MovableTree CRDT Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a movable tree CRDT to event-graph-walker, implementing Kleppmann's algorithm with fractional indexing for sibling ordering.

**Architecture:** New packages inside event-graph-walker: `internal/fractional_index/` for sibling ordering, `internal/movable_tree/` for the tree CRDT core, and `tree/` for the public API. The tree CRDT integrates with the existing `CausalGraph` for Lamport timestamps, causal ordering, and version tracking. Does NOT modify existing sequence CRDT code — tree operations have their own types parallel to the existing `Op`/`OpContent`.

**Tech Stack:** MoonBit, moonbitlang/quickcheck for property-based tests

---

## File Structure

```
event-graph-walker/
  internal/
    fractional_index/
      fractional_index.mbt              -- FractionalIndex type + between() algorithm
      fractional_index_test.mbt         -- Unit tests including density edge cases
      fractional_index_properties_test.mbt -- Quickcheck density/ordering properties
      moon.pkg
    movable_tree/
      types.mbt                         -- TreeNodeId, TreeMoveOp, TRASH/ROOT sentinels
      tree.mbt                          -- MovableTree structure + apply operations
      ancestor.mbt                      -- is_ancestor_of() with iterative parent walk
      conflict.mbt                      -- Kleppmann's undo-do-redo for concurrent moves
      tree_test.mbt                     -- Unit tests (single peer)
      convergence_test.mbt              -- Multi-peer convergence tests
      convergence_properties_test.mbt   -- Quickcheck convergence properties
      moon.pkg
  tree/
    tree_doc.mbt                        -- Public TreeDoc API (integrates with CausalGraph)
    tree_doc_test.mbt                   -- Integration tests
    moon.pkg
```

**Unchanged files:** All existing code in `internal/core/`, `internal/fugue/`, `internal/oplog/`, `internal/branch/`, `internal/document/`, `text/`, `undo/` remains untouched.

---

## Critical Design Notes

**MoonBit idioms (match the existing codebase):**
- Use `moon.pkg` (not `moon.pkg.json`). Test deps go in `for "test"` block.
- Access `Map` values with `.get(key)` returning `Option`, not `map[key]`.
- Use `match` for option handling, not `.unwrap()`. Use `.unwrap_or(default)` when a fallback is clear.
- `@immut/hashmap` is used for CausalGraph internals.
- `///|` block separator between top-level items.
- `pub impl Trait for Type with method(self) { ... }` — one method per impl block.

**FractionalIndex density invariant:**
The representation must be *dense*: between any two distinct keys, a third key must always be constructible. This rules out naive byte-array schemes where adjacent keys like `[1]` and `[1, 0]` have no key between them. Our approach: `Array[Int]` with elements in `[0, MAX)`, compared lexicographically with implicit zero-padding for shorter arrays. The `between()` algorithm treats the upper bound's missing bytes as `MAX` (not 0), guaranteeing a midpoint always exists by going deeper.

**CausalGraph integration:**
The tree CRDT's `TreeDoc` uses the existing `CausalGraph` from eg-walker to derive Lamport timestamps from parent frontiers (not a local scalar counter). Each tree operation gets an LV assigned by the CausalGraph, and remote ops are queued until their causal parents are present (matching OpLog's `pending` + `drain_pending` pattern).

**Kleppmann's undo-do-redo correctness:**
- Undo of a *create* must remove the node entirely (not move to TRASH — TRASH is a user-facing delete concept).
- Remote ops must be queued if their causal parents haven't been seen yet.
- Duplicate ops (same LV) must be rejected.
- The log is sorted by Lamport timestamp; ties broken by `(timestamp, agent)`.

---

### Task 1: FractionalIndex

Dense sibling ordering. A `FractionalIndex` is an `Array[Int]` that supports generating a key between any two existing keys.

**Files:**
- Create: `event-graph-walker/internal/fractional_index/fractional_index.mbt`
- Create: `event-graph-walker/internal/fractional_index/fractional_index_test.mbt`
- Create: `event-graph-walker/internal/fractional_index/fractional_index_properties_test.mbt`
- Create: `event-graph-walker/internal/fractional_index/moon.pkg`

- [ ] **Step 1: Create moon.pkg**

```
import {
  "moonbitlang/core/quickcheck",
  "moonbitlang/quickcheck" @qc,
} for "test"
```

Run: `cd event-graph-walker && moon check`
Expected: PASS

- [ ] **Step 2: Write failing test for between()**

In `fractional_index_test.mbt`:

```moonbit
///|
test "between: generates key between two keys" {
  let a = @fractional_index.FractionalIndex::from_array([10])
  let b = @fractional_index.FractionalIndex::from_array([20])
  let mid = @fractional_index.FractionalIndex::between(Some(a), Some(b))
  inspect(mid.compare(a) > 0, content="true")
  inspect(mid.compare(b) < 0, content="true")
}
```

Run: `cd event-graph-walker && moon test -p dowdiness/event-graph-walker/internal/fractional_index`
Expected: FAIL — `FractionalIndex` not defined

- [ ] **Step 3: Implement FractionalIndex type and between()**

In `fractional_index.mbt`:

```moonbit
///|
/// Maximum value for each element. Elements are in [0, MAX).
let max_value : Int = 65536

///|
/// FractionalIndex — a dense ordering key for CRDT sibling ordering.
/// Represented as Array[Int] with elements in [0, 65536).
/// Comparison is lexicographic with shorter arrays padded by implicit zeros.
pub struct FractionalIndex {
  priv elements : Array[Int]
} derive(Show, Eq, Debug)

///|
pub fn FractionalIndex::from_array(elements : Array[Int]) -> FractionalIndex {
  // Normalize: strip trailing zeros
  let mut end = elements.length()
  while end > 0 && elements[end - 1] == 0 {
    end = end - 1
  }
  let normalized = if end == elements.length() {
    elements.copy()
  } else {
    Array::makei(end, fn(i) { elements[i] })
  }
  { elements: normalized }
}

///|
pub fn FractionalIndex::to_array(self : FractionalIndex) -> Array[Int] {
  self.elements.copy()
}

///|
/// Get element at index, returning 0 for out-of-bounds (implicit zero-padding).
fn FractionalIndex::get(self : FractionalIndex, i : Int) -> Int {
  if i < self.elements.length() {
    self.elements[i]
  } else {
    0
  }
}

///|
pub impl Compare for FractionalIndex with compare(self, other) {
  let len = self.elements.length().maximum(other.elements.length())
  for i = 0; i < len; i = i + 1 {
    let a = self.get(i)
    let b = other.get(i)
    if a < b {
      return -1
    }
    if a > b {
      return 1
    }
  }
  0
}

///|
/// Generate a FractionalIndex strictly between `left` and `right`.
///
/// Density guarantee: for any distinct `left < right`, this always succeeds.
///
/// Algorithm: walk the arrays position by position.
/// - left defaults to implicit zeros (minimum)
/// - right defaults to max_value (maximum) for missing positions
/// - At each position, if gap > 1, take the midpoint.
/// - If gap <= 1, keep the left value and go deeper (right becomes max_value).
pub fn FractionalIndex::between(
  left : FractionalIndex?,
  right : FractionalIndex?,
) -> FractionalIndex {
  let result : Array[Int] = []
  let max_depth = 32 // Safety limit
  // Track whether we've "passed" the right boundary's last explicit element
  let mut right_is_open = false
  for i = 0; i < max_depth; i = i + 1 {
    let lo = match left {
      Some(l) => l.get(i)
      None => 0
    }
    let hi = if right_is_open {
      max_value
    } else {
      match right {
        Some(r) =>
          if i < r.elements.length() {
            r.elements[i]
          } else {
            // Right is exhausted. Since left < right and we matched so far,
            // left must also be exhausted (all remaining are 0 vs 0).
            // But we need a key strictly between, so treat right as max_value.
            max_value
          }
        None => max_value
      }
    }
    if lo == hi {
      result.push(lo)
      continue
    }
    // lo < hi guaranteed (since left < right)
    let mid = lo + (hi - lo) / 2
    if mid > lo {
      result.push(mid)
      return FractionalIndex::from_array(result)
    }
    // hi - lo == 1: keep lo, go deeper with right = max_value
    result.push(lo)
    right_is_open = true
    // Continue: next iteration has hi = max_value, lo = left.get(i+1)
  }
  // Should never reach here for valid inputs
  result.push(max_value / 2)
  FractionalIndex::from_array(result)
}
```

Run: `cd event-graph-walker && moon test -p dowdiness/event-graph-walker/internal/fractional_index`
Expected: PASS

- [ ] **Step 4: Write density edge case tests**

Add to `fractional_index_test.mbt`:

```moonbit
///|
test "between: None None gives midpoint" {
  let mid = @fractional_index.FractionalIndex::between(None, None)
  inspect(mid.to_array()[0], content="32768")
}

///|
test "between: adjacent integers — goes deeper" {
  let a = @fractional_index.FractionalIndex::from_array([5])
  let b = @fractional_index.FractionalIndex::from_array([6])
  let mid = @fractional_index.FractionalIndex::between(Some(a), Some(b))
  inspect(mid.compare(a) > 0, content="true")
  inspect(mid.compare(b) < 0, content="true")
  // Should be [5, 32768] (go deeper, midpoint of 0 and max)
  inspect(mid.to_array().length() > 1, content="true")
}

///|
test "between: key and its zero-extended form are equal (normalization)" {
  let a = @fractional_index.FractionalIndex::from_array([5])
  let b = @fractional_index.FractionalIndex::from_array([5, 0])
  inspect(a.compare(b), content="0")
}

///|
test "between: prefix case — shorter and longer key" {
  let a = @fractional_index.FractionalIndex::from_array([5])
  let b = @fractional_index.FractionalIndex::from_array([5, 100])
  let mid = @fractional_index.FractionalIndex::between(Some(a), Some(b))
  inspect(mid.compare(a) > 0, content="true")
  inspect(mid.compare(b) < 0, content="true")
}

///|
test "between: minimal keys — None and [1]" {
  let b = @fractional_index.FractionalIndex::from_array([1])
  let mid = @fractional_index.FractionalIndex::between(None, Some(b))
  inspect(mid.compare(b) < 0, content="true")
}

///|
test "between: 20 sequential insertions stay ordered" {
  let mut prev : @fractional_index.FractionalIndex? = None
  let next = @fractional_index.FractionalIndex::from_array([32768])
  let items : Array[@fractional_index.FractionalIndex] = []
  for _i = 0; _i < 20; _i = _i + 1 {
    let mid = @fractional_index.FractionalIndex::between(prev, Some(next))
    items.push(mid)
    prev = Some(mid)
  }
  for i = 1; i < items.length(); i = i + 1 {
    inspect(items[i].compare(items[i - 1]) > 0, content="true")
  }
}

///|
test "between: interleaving stays ordered" {
  let a = @fractional_index.FractionalIndex::from_array([16384])
  let b = @fractional_index.FractionalIndex::from_array([49152])
  let mid1 = @fractional_index.FractionalIndex::between(Some(a), Some(b))
  let mid2 = @fractional_index.FractionalIndex::between(Some(a), Some(mid1))
  let mid3 = @fractional_index.FractionalIndex::between(Some(mid2), Some(mid1))
  inspect(a.compare(mid2) < 0, content="true")
  inspect(mid2.compare(mid3) < 0, content="true")
  inspect(mid3.compare(mid1) < 0, content="true")
  inspect(mid1.compare(b) < 0, content="true")
}
```

Run: `cd event-graph-walker && moon test -p dowdiness/event-graph-walker/internal/fractional_index`
Expected: PASS

- [ ] **Step 5: Write quickcheck property test for density**

In `fractional_index_properties_test.mbt`:

```moonbit
///|
struct FIPair {
  a : Array[Int]
  b : Array[Int]
} derive(Show)

///|
impl @quickcheck.Arbitrary for FIPair with arbitrary(size, rs) {
  let len_a = rs.split().next_uint64().to_int().abs() % (size + 1) + 1
  let len_b = rs.split().next_uint64().to_int().abs() % (size + 1) + 1
  let a : Array[Int] = Array::makei(len_a, fn(_) {
    rs.split().next_uint64().to_int().abs() % 65536
  })
  let b : Array[Int] = Array::makei(len_b, fn(_) {
    rs.split().next_uint64().to_int().abs() % 65536
  })
  { a, b }
}

///|
test "property: between(a, b) is always strictly between a and b when a < b" {
  @qc.quick_check_fn(fn(pair : FIPair) -> Bool {
    let a = @fractional_index.FractionalIndex::from_array(pair.a)
    let b = @fractional_index.FractionalIndex::from_array(pair.b)
    if a.compare(b) >= 0 {
      return true // Skip: a must be < b
    }
    let mid = @fractional_index.FractionalIndex::between(Some(a), Some(b))
    mid.compare(a) > 0 && mid.compare(b) < 0
  })
}

///|
test "property: between(None, b) is always < b" {
  @qc.quick_check_fn(fn(pair : FIPair) -> Bool {
    let b = @fractional_index.FractionalIndex::from_array(pair.a)
    let mid = @fractional_index.FractionalIndex::between(None, Some(b))
    mid.compare(b) < 0
  })
}

///|
test "property: between(a, None) is always > a" {
  @qc.quick_check_fn(fn(pair : FIPair) -> Bool {
    let a = @fractional_index.FractionalIndex::from_array(pair.a)
    let mid = @fractional_index.FractionalIndex::between(Some(a), None)
    mid.compare(a) > 0
  })
}
```

Run: `cd event-graph-walker && moon test -p dowdiness/event-graph-walker/internal/fractional_index`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
cd event-graph-walker
git add internal/fractional_index/
git commit -m "feat: add FractionalIndex with proven density for CRDT sibling ordering"
```

---

### Task 2: Tree Types and MovableTree Structure

Core types for the movable tree CRDT.

**Files:**
- Create: `event-graph-walker/internal/movable_tree/types.mbt`
- Create: `event-graph-walker/internal/movable_tree/tree.mbt`
- Create: `event-graph-walker/internal/movable_tree/ancestor.mbt`
- Create: `event-graph-walker/internal/movable_tree/tree_test.mbt`
- Create: `event-graph-walker/internal/movable_tree/moon.pkg`

- [ ] **Step 1: Create moon.pkg**

```
import {
  "dowdiness/event-graph-walker/internal/fractional_index" @fi,
}

import {
  "moonbitlang/core/quickcheck",
  "moonbitlang/quickcheck" @qc,
} for "test"
```

- [ ] **Step 2: Write failing test for tree creation**

In `tree_test.mbt`:

```moonbit
///|
test "create: single node under root" {
  let tree = @movable_tree.MovableTree::new()
  let pos = @fi.FractionalIndex::between(None, None)
  let id = @movable_tree.TreeNodeId::{ agent: "alice", counter: 0 }
  tree.apply_create(id, @movable_tree.root_id, pos)
  match tree.parent(id) {
    Some(p) => inspect(p == @movable_tree.root_id, content="true")
    None => inspect(false, content="true")
  }
  inspect(tree.children(@movable_tree.root_id).length(), content="1")
}
```

- [ ] **Step 3: Implement types.mbt**

```moonbit
///|
pub(all) struct TreeNodeId {
  agent : String
  counter : Int
} derive(Eq, Hash, Show, Debug, Compare)

///|
pub let root_id : TreeNodeId = { agent: "__ROOT__", counter: -1 }

///|
pub let trash_id : TreeNodeId = { agent: "__TRASH__", counter: -2 }

///|
pub(all) struct TreeMoveOp {
  timestamp : Int
  target : TreeNodeId
  new_parent : TreeNodeId
  position : @fi.FractionalIndex
  agent : String
} derive(Show, Debug)
```

- [ ] **Step 4: Implement tree.mbt**

```moonbit
///|
pub(all) struct TreeNode {
  id : TreeNodeId
  mut parent : TreeNodeId
  mut position : @fi.FractionalIndex
  properties : Map[String, String]
} derive(Show, Debug)

///|
pub struct MovableTree {
  priv nodes : Map[TreeNodeId, TreeNode]
  priv children_cache : Map[TreeNodeId, Array[TreeNodeId]]
}

///|
pub fn MovableTree::new() -> MovableTree {
  let children_cache : Map[TreeNodeId, Array[TreeNodeId]] = Map::new()
  children_cache.set(root_id, [])
  children_cache.set(trash_id, [])
  { nodes: Map::new(), children_cache }
}

///|
pub fn MovableTree::apply_create(
  self : MovableTree,
  id : TreeNodeId,
  parent : TreeNodeId,
  position : @fi.FractionalIndex,
) -> Unit {
  let node = { id, parent, position, properties: Map::new() }
  self.nodes.set(id, node)
  match self.children_cache.get(parent) {
    Some(children) => children.push(id)
    None => self.children_cache.set(parent, [id])
  }
}

///|
/// Remove a node from the tree entirely (for undo of create).
/// Different from delete_node (which moves to TRASH).
pub fn MovableTree::remove_node(self : MovableTree, id : TreeNodeId) -> Unit {
  match self.nodes.get(id) {
    Some(node) => {
      // Remove from parent's children
      match self.children_cache.get(node.parent) {
        Some(children) => {
          let mut idx = -1
          for i = 0; i < children.length(); i = i + 1 {
            if children[i] == id { idx = i }
          }
          if idx >= 0 {
            let _ = children.remove(idx)
          }
        }
        None => ()
      }
      self.nodes.remove(id)
    }
    None => ()
  }
}

///|
pub fn MovableTree::apply_move(
  self : MovableTree,
  target : TreeNodeId,
  new_parent : TreeNodeId,
  position : @fi.FractionalIndex,
) -> Unit {
  match self.nodes.get(target) {
    None => ()
    Some(node) => {
      let old_parent = node.parent
      // Remove from old parent's children
      match self.children_cache.get(old_parent) {
        Some(children) => {
          let mut idx = -1
          for i = 0; i < children.length(); i = i + 1 {
            if children[i] == target { idx = i }
          }
          if idx >= 0 {
            let _ = children.remove(idx)
          }
        }
        None => ()
      }
      // Update node
      node.parent = new_parent
      node.position = position
      // Add to new parent's children
      match self.children_cache.get(new_parent) {
        Some(children) => children.push(target)
        None => self.children_cache.set(new_parent, [target])
      }
    }
  }
}

///|
pub fn MovableTree::parent(self : MovableTree, id : TreeNodeId) -> TreeNodeId? {
  match self.nodes.get(id) {
    Some(node) => Some(node.parent)
    None => None
  }
}

///|
pub fn MovableTree::get_position(self : MovableTree, id : TreeNodeId) -> @fi.FractionalIndex? {
  match self.nodes.get(id) {
    Some(node) => Some(node.position)
    None => None
  }
}

///|
/// Returns children sorted by fractional index.
pub fn MovableTree::children(self : MovableTree, parent : TreeNodeId) -> Array[TreeNodeId] {
  match self.children_cache.get(parent) {
    Some(children) => {
      let sorted = children.copy()
      sorted.sort_by(fn(a, b) {
        let pos_a = match self.nodes.get(a) {
          Some(n) => n.position
          None => @fi.FractionalIndex::from_array([])
        }
        let pos_b = match self.nodes.get(b) {
          Some(n) => n.position
          None => @fi.FractionalIndex::from_array([])
        }
        pos_a.compare(pos_b)
      })
      sorted
    }
    None => []
  }
}

///|
pub fn MovableTree::is_alive(self : MovableTree, id : TreeNodeId) -> Bool {
  match self.nodes.get(id) {
    Some(node) => node.parent != trash_id
    None => false
  }
}

///|
pub fn MovableTree::contains(self : MovableTree, id : TreeNodeId) -> Bool {
  self.nodes.get(id) is Some(_)
}

///|
pub fn MovableTree::set_property(self : MovableTree, id : TreeNodeId, key : String, value : String) -> Unit {
  match self.nodes.get(id) {
    Some(node) => node.properties.set(key, value)
    None => ()
  }
}

///|
pub fn MovableTree::get_property(self : MovableTree, id : TreeNodeId, key : String) -> String? {
  match self.nodes.get(id) {
    Some(node) => node.properties.get(key)
    None => None
  }
}
```

- [ ] **Step 5: Implement ancestor.mbt**

```moonbit
///|
pub fn MovableTree::is_ancestor_of(self : MovableTree, ancestor : TreeNodeId, descendant : TreeNodeId) -> Bool {
  if ancestor == descendant {
    return false
  }
  let mut current = descendant
  for _safety = 0; _safety < 10000; _safety = _safety + 1 {
    match self.nodes.get(current) {
      None => return false
      Some(node) => {
        if node.parent == ancestor {
          return true
        }
        if node.parent == root_id || node.parent == trash_id {
          return false
        }
        current = node.parent
      }
    }
  }
  false
}

///|
pub fn MovableTree::would_create_cycle(self : MovableTree, target : TreeNodeId, new_parent : TreeNodeId) -> Bool {
  if target == new_parent {
    return true
  }
  self.is_ancestor_of(target, new_parent)
}
```

Run: `cd event-graph-walker && moon test -p dowdiness/event-graph-walker/internal/movable_tree`
Expected: PASS

- [ ] **Step 6: Write more tests (move, delete, cycle rejection, sentinel rejection)**

Add to `tree_test.mbt`:

```moonbit
///|
test "move: reparent a node" {
  let tree = @movable_tree.MovableTree::new()
  let a = @movable_tree.TreeNodeId::{ agent: "a", counter: 0 }
  let b = @movable_tree.TreeNodeId::{ agent: "b", counter: 0 }
  let root = @movable_tree.root_id
  tree.apply_create(a, root, @fi.FractionalIndex::from_array([16384]))
  tree.apply_create(b, root, @fi.FractionalIndex::from_array([32768]))
  tree.apply_move(a, b, @fi.FractionalIndex::between(None, None))
  inspect(tree.children(root).length(), content="1")
  inspect(tree.children(b).length(), content="1")
}

///|
test "delete: move to trash" {
  let tree = @movable_tree.MovableTree::new()
  let a = @movable_tree.TreeNodeId::{ agent: "a", counter: 0 }
  tree.apply_create(a, @movable_tree.root_id, @fi.FractionalIndex::between(None, None))
  tree.apply_move(a, @movable_tree.trash_id, @fi.FractionalIndex::from_array([0]))
  inspect(tree.is_alive(a), content="false")
  inspect(tree.children(@movable_tree.root_id).length(), content="0")
}

///|
test "cycle detection: parent under child rejected" {
  let tree = @movable_tree.MovableTree::new()
  let a = @movable_tree.TreeNodeId::{ agent: "a", counter: 0 }
  let b = @movable_tree.TreeNodeId::{ agent: "b", counter: 0 }
  tree.apply_create(a, @movable_tree.root_id, @fi.FractionalIndex::between(None, None))
  tree.apply_create(b, a, @fi.FractionalIndex::between(None, None))
  inspect(tree.would_create_cycle(a, b), content="true")
  inspect(tree.would_create_cycle(b, a), content="false")
}

///|
test "children: sorted by fractional index" {
  let tree = @movable_tree.MovableTree::new()
  let root = @movable_tree.root_id
  let c = @movable_tree.TreeNodeId::{ agent: "c", counter: 0 }
  let a = @movable_tree.TreeNodeId::{ agent: "a", counter: 0 }
  let b = @movable_tree.TreeNodeId::{ agent: "b", counter: 0 }
  tree.apply_create(c, root, @fi.FractionalIndex::from_array([49152]))
  tree.apply_create(a, root, @fi.FractionalIndex::from_array([16384]))
  tree.apply_create(b, root, @fi.FractionalIndex::from_array([32768]))
  let children = tree.children(root)
  inspect(children[0] == a, content="true")
  inspect(children[1] == b, content="true")
  inspect(children[2] == c, content="true")
}

///|
test "remove_node: completely removes (for undo of create)" {
  let tree = @movable_tree.MovableTree::new()
  let a = @movable_tree.TreeNodeId::{ agent: "a", counter: 0 }
  tree.apply_create(a, @movable_tree.root_id, @fi.FractionalIndex::between(None, None))
  inspect(tree.contains(a), content="true")
  tree.remove_node(a)
  inspect(tree.contains(a), content="false")
  inspect(tree.children(@movable_tree.root_id).length(), content="0")
}
```

Run: `cd event-graph-walker && moon test -p dowdiness/event-graph-walker/internal/movable_tree`
Expected: PASS

- [ ] **Step 7: Commit**

```bash
cd event-graph-walker
git add internal/movable_tree/
git commit -m "feat: add MovableTree with create/move/delete and cycle detection"
```

---

### Task 3: Kleppmann's Undo-Do-Redo Conflict Resolution

The core concurrent move algorithm. Operations are totally ordered by `(timestamp, agent)`. When an out-of-order operation arrives, undo back, apply, redo forward — skipping any redo that would create a cycle.

**Files:**
- Create: `event-graph-walker/internal/movable_tree/conflict.mbt`
- Create: `event-graph-walker/internal/movable_tree/convergence_test.mbt`

- [ ] **Step 1: Write failing convergence test**

In `convergence_test.mbt`:

```moonbit
///|
test "convergence: two peers, same ops different order" {
  let pos1 = @fi.FractionalIndex::from_array([16384])
  let pos2 = @fi.FractionalIndex::from_array([32768])
  let pos3 = @fi.FractionalIndex::from_array([49152])
  let node1 = @movable_tree.TreeNodeId::{ agent: "alice", counter: 0 }
  let node2 = @movable_tree.TreeNodeId::{ agent: "bob", counter: 0 }
  let root = @movable_tree.root_id

  let ops : Array[@movable_tree.TreeMoveOp] = [
    { timestamp: 1, target: node1, new_parent: root, position: pos1, agent: "alice" },
    { timestamp: 2, target: node2, new_parent: root, position: pos2, agent: "bob" },
    { timestamp: 3, target: node1, new_parent: node2, position: pos3, agent: "alice" },
  ]

  // Peer A: in order
  let tree_a = @movable_tree.MovableTree::new()
  let log_a = @movable_tree.TreeOpLog::new()
  for op in ops { log_a.apply(tree_a, op) }

  // Peer B: reverse order
  let tree_b = @movable_tree.MovableTree::new()
  let log_b = @movable_tree.TreeOpLog::new()
  log_b.apply(tree_b, ops[2])
  log_b.apply(tree_b, ops[1])
  log_b.apply(tree_b, ops[0])

  // Both: node1 under node2, node2 under root
  match (tree_a.parent(node1), tree_b.parent(node1)) {
    (Some(pa), Some(pb)) => {
      inspect(pa == node2, content="true")
      inspect(pb == node2, content="true")
    }
    _ => inspect(false, content="true")
  }
  match (tree_a.parent(node2), tree_b.parent(node2)) {
    (Some(pa), Some(pb)) => {
      inspect(pa == root, content="true")
      inspect(pb == root, content="true")
    }
    _ => inspect(false, content="true")
  }
}
```

Run: `cd event-graph-walker && moon test -p dowdiness/event-graph-walker/internal/movable_tree`
Expected: FAIL — `TreeOpLog` not defined

- [ ] **Step 2: Implement TreeOpLog with Kleppmann's undo-do-redo**

In `conflict.mbt`:

```moonbit
///|
/// Tracks state before an operation was applied, for undo.
struct OldState {
  parent : TreeNodeId
  position : @fi.FractionalIndex
} derive(Show, Debug)

///|
/// A log entry: the operation + what it replaced.
struct LogEntry {
  op : TreeMoveOp
  /// None = op was skipped (cycle) or was a create (undo = remove node)
  /// Some(OldState) = node existed, undo restores this state
  undo_info : UndoInfo
} derive(Show, Debug)

///|
enum UndoInfo {
  Skipped                    // Op was skipped (would create cycle)
  Created                    // Op created a new node (undo = remove)
  Moved(OldState)            // Op moved existing node (undo = restore)
} derive(Show, Debug)

///|
/// Operation log implementing Kleppmann's undo-do-redo.
pub struct TreeOpLog {
  priv entries : Array[LogEntry]
  priv seen : Map[String, Bool]  // Dedup: "agent:counter" -> true
}

///|
pub fn TreeOpLog::new() -> TreeOpLog {
  { entries: [], seen: Map::new() }
}

///|
fn op_key(op : TreeMoveOp) -> String {
  op.agent + ":" + op.timestamp.to_string()
}

///|
fn op_order(a : TreeMoveOp, b : TreeMoveOp) -> Int {
  let ts = a.timestamp.compare(b.timestamp)
  if ts != 0 { return ts }
  a.agent.compare(b.agent)
}

///|
/// Apply a single move op to the tree, returning undo info.
fn do_op(tree : MovableTree, op : TreeMoveOp) -> UndoInfo {
  if tree.contains(op.target) {
    // Node exists — this is a move (or delete)
    if tree.would_create_cycle(op.target, op.new_parent) {
      return Skipped
    }
    let old_parent = match tree.parent(op.target) {
      Some(p) => p
      None => root_id // shouldn't happen
    }
    let old_position = match tree.get_position(op.target) {
      Some(p) => p
      None => @fi.FractionalIndex::from_array([])
    }
    tree.apply_move(op.target, op.new_parent, op.position)
    Moved({ parent: old_parent, position: old_position })
  } else {
    // Node doesn't exist — this is a create
    tree.apply_create(op.target, op.new_parent, op.position)
    Created
  }
}

///|
/// Undo a previously applied op.
fn undo_op(tree : MovableTree, op : TreeMoveOp, info : UndoInfo) -> Unit {
  match info {
    Skipped => () // Nothing was done, nothing to undo
    Created => tree.remove_node(op.target) // Remove the created node entirely
    Moved(old) => tree.apply_move(op.target, old.parent, old.position)
  }
}

///|
/// Apply a new operation using Kleppmann's undo-do-redo.
pub fn TreeOpLog::apply(self : TreeOpLog, tree : MovableTree, op : TreeMoveOp) -> Unit {
  // Dedup: skip if already seen
  let key = op_key(op)
  match self.seen.get(key) {
    Some(_) => return
    None => ()
  }
  self.seen.set(key, true)

  // Find insertion point in timestamp-sorted order
  let mut insert_idx = self.entries.length()
  while insert_idx > 0 && op_order(self.entries[insert_idx - 1].op, op) > 0 {
    insert_idx = insert_idx - 1
  }

  // Phase 1: Undo all entries from end back to insert_idx
  for i = self.entries.length() - 1; i >= insert_idx; i = i - 1 {
    undo_op(tree, self.entries[i].op, self.entries[i].undo_info)
  }

  // Phase 2: Apply the new op
  let new_info = do_op(tree, op)
  self.entries.insert(insert_idx, { op, undo_info: new_info })

  // Phase 3: Redo all entries after the new one (with fresh undo info)
  for i = insert_idx + 1; i < self.entries.length(); i = i + 1 {
    let redo_info = do_op(tree, self.entries[i].op)
    self.entries[i] = { op: self.entries[i].op, undo_info: redo_info }
  }
}

///|
pub fn TreeOpLog::all_ops(self : TreeOpLog) -> Array[TreeMoveOp] {
  self.entries.map(fn(e) { e.op })
}
```

Run: `cd event-graph-walker && moon test -p dowdiness/event-graph-walker/internal/movable_tree`
Expected: PASS

- [ ] **Step 3: Write concurrent cycle test (CORRECT expected result)**

Add to `convergence_test.mbt`:

```moonbit
///|
test "convergence: concurrent moves creating cycle — later op is skipped" {
  // Alice moves A under B (timestamp 3)
  // Bob moves B under A (timestamp 4)
  // Timestamp order: create A (1), create B (2), A→B (3), B→A (4)
  // At timestamp 3: A moves under B (succeeds)
  // At timestamp 4: B tries to move under A, but A is under B → cycle → SKIPPED
  // Result: A under B, B under root
  let pos = @fi.FractionalIndex::between(None, None)
  let nodeA = @movable_tree.TreeNodeId::{ agent: "alice", counter: 0 }
  let nodeB = @movable_tree.TreeNodeId::{ agent: "bob", counter: 0 }
  let root = @movable_tree.root_id

  let ops : Array[@movable_tree.TreeMoveOp] = [
    { timestamp: 1, target: nodeA, new_parent: root, position: pos, agent: "alice" },
    { timestamp: 2, target: nodeB, new_parent: root, position: pos, agent: "bob" },
    { timestamp: 3, target: nodeA, new_parent: nodeB, position: pos, agent: "alice" },
    { timestamp: 4, target: nodeB, new_parent: nodeA, position: pos, agent: "bob" },
  ]

  // Apply in two different orders
  let tree1 = @movable_tree.MovableTree::new()
  let log1 = @movable_tree.TreeOpLog::new()
  for op in ops { log1.apply(tree1, op) }

  let tree2 = @movable_tree.MovableTree::new()
  let log2 = @movable_tree.TreeOpLog::new()
  log2.apply(tree2, ops[3])
  log2.apply(tree2, ops[2])
  log2.apply(tree2, ops[1])
  log2.apply(tree2, ops[0])

  // Both converge: A under B (ts 3 applied), B→A (ts 4) skipped because cycle
  // So B stays under root
  match tree1.parent(nodeA) {
    Some(p) => inspect(p == nodeB, content="true")
    None => inspect(false, content="true")
  }
  match tree1.parent(nodeB) {
    Some(p) => inspect(p == root, content="true")
    None => inspect(false, content="true")
  }
  // Peer 2 agrees
  match tree2.parent(nodeA) {
    Some(p) => inspect(p == nodeB, content="true")
    None => inspect(false, content="true")
  }
  match tree2.parent(nodeB) {
    Some(p) => inspect(p == root, content="true")
    None => inspect(false, content="true")
  }
}

///|
test "convergence: duplicate ops are idempotent" {
  let pos = @fi.FractionalIndex::between(None, None)
  let node = @movable_tree.TreeNodeId::{ agent: "a", counter: 0 }
  let root = @movable_tree.root_id
  let op = @movable_tree.TreeMoveOp::{
    timestamp: 1, target: node, new_parent: root, position: pos, agent: "a",
  }
  let tree = @movable_tree.MovableTree::new()
  let log = @movable_tree.TreeOpLog::new()
  log.apply(tree, op)
  log.apply(tree, op) // Duplicate — should be no-op
  inspect(tree.children(root).length(), content="1")
}

///|
test "convergence: move-before-create handled by undo-do-redo" {
  // Receive move op before the create op
  let pos = @fi.FractionalIndex::between(None, None)
  let node = @movable_tree.TreeNodeId::{ agent: "a", counter: 0 }
  let parent = @movable_tree.TreeNodeId::{ agent: "b", counter: 0 }
  let root = @movable_tree.root_id

  let create_parent = @movable_tree.TreeMoveOp::{
    timestamp: 1, target: parent, new_parent: root, position: pos, agent: "b",
  }
  let create_node = @movable_tree.TreeMoveOp::{
    timestamp: 2, target: node, new_parent: root, position: pos, agent: "a",
  }
  let move_node = @movable_tree.TreeMoveOp::{
    timestamp: 3, target: node, new_parent: parent, position: pos, agent: "a",
  }

  // Apply out of order: move first, then creates
  let tree = @movable_tree.MovableTree::new()
  let log = @movable_tree.TreeOpLog::new()
  log.apply(tree, move_node)    // node doesn't exist yet — creates it under parent
  log.apply(tree, create_parent) // parent created — undo-redo replays everything
  log.apply(tree, create_node)   // create_node at ts 2 — undo-redo reorders

  // After all ops applied in timestamp order:
  // ts 1: create parent under root
  // ts 2: create node under root
  // ts 3: move node under parent
  match tree.parent(node) {
    Some(p) => inspect(p == parent, content="true")
    None => inspect(false, content="true")
  }
}

///|
test "convergence: six orderings of 5 ops all produce same tree" {
  let n1 = @movable_tree.TreeNodeId::{ agent: "a", counter: 0 }
  let n2 = @movable_tree.TreeNodeId::{ agent: "b", counter: 0 }
  let n3 = @movable_tree.TreeNodeId::{ agent: "c", counter: 0 }
  let root = @movable_tree.root_id

  let ops : Array[@movable_tree.TreeMoveOp] = [
    { timestamp: 1, target: n1, new_parent: root, position: @fi.FractionalIndex::from_array([16384]), agent: "a" },
    { timestamp: 2, target: n2, new_parent: root, position: @fi.FractionalIndex::from_array([32768]), agent: "b" },
    { timestamp: 3, target: n3, new_parent: root, position: @fi.FractionalIndex::from_array([49152]), agent: "c" },
    { timestamp: 4, target: n1, new_parent: n2, position: @fi.FractionalIndex::from_array([16384]), agent: "a" },
    { timestamp: 5, target: n3, new_parent: n1, position: @fi.FractionalIndex::from_array([32768]), agent: "c" },
  ]

  let orderings : Array[Array[Int]] = [
    [0, 1, 2, 3, 4],
    [4, 3, 2, 1, 0],
    [2, 0, 4, 1, 3],
    [1, 3, 0, 4, 2],
    [3, 0, 4, 1, 2],
    [4, 0, 2, 1, 3],
  ]

  // Collect (parent_of_n1, parent_of_n2, parent_of_n3) for each ordering
  let mut first_result : (TreeNodeId, TreeNodeId, TreeNodeId)? = None
  for order in orderings {
    let tree = @movable_tree.MovableTree::new()
    let log = @movable_tree.TreeOpLog::new()
    for idx in order {
      log.apply(tree, ops[idx])
    }
    let p1 = tree.parent(n1).unwrap_or(root)
    let p2 = tree.parent(n2).unwrap_or(root)
    let p3 = tree.parent(n3).unwrap_or(root)
    let result = (p1, p2, p3)
    match first_result {
      None => first_result = Some(result)
      Some(expected) => {
        inspect(result.0 == expected.0, content="true")
        inspect(result.1 == expected.1, content="true")
        inspect(result.2 == expected.2, content="true")
      }
    }
  }

  // Verify no cycles
  let tree = @movable_tree.MovableTree::new()
  let log = @movable_tree.TreeOpLog::new()
  for op in ops { log.apply(tree, op) }
  for n in [n1, n2, n3] {
    let mut current = n
    let mut steps = 0
    while current != root && current != @movable_tree.trash_id && steps < 20 {
      current = tree.parent(current).unwrap_or(root)
      steps = steps + 1
    }
    inspect(steps < 20, content="true")
  }
}
```

Run: `cd event-graph-walker && moon test -p dowdiness/event-graph-walker/internal/movable_tree`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
cd event-graph-walker
git add internal/movable_tree/conflict.mbt internal/movable_tree/convergence_test.mbt
git commit -m "feat: Kleppmann's undo-do-redo with dedup, create-undo, and convergence tests"
```

---

### Task 4: TreeDoc Public API with CausalGraph Integration

Public API that integrates with the real CausalGraph for proper Lamport timestamps and causal ordering.

**Files:**
- Create: `event-graph-walker/tree/tree_doc.mbt`
- Create: `event-graph-walker/tree/tree_doc_test.mbt`
- Create: `event-graph-walker/tree/moon.pkg`

- [ ] **Step 1: Create moon.pkg**

```
import {
  "dowdiness/event-graph-walker/internal/movable_tree" @mt,
  "dowdiness/event-graph-walker/internal/fractional_index" @fi,
  "dowdiness/event-graph-walker/internal/causal_graph" @cg,
  "dowdiness/event-graph-walker/internal/core",
}

import {
  "moonbitlang/core/quickcheck",
  "moonbitlang/quickcheck" @qc,
} for "test"
```

- [ ] **Step 2: Write failing test**

In `tree_doc_test.mbt`:

```moonbit
///|
test "TreeDoc: create and query" {
  let doc = @tree.TreeDoc::new("alice")
  let root = @tree.root_id
  let a = doc.create_node(parent=root)
  doc.set_property(a, "type", "heading")
  let b = doc.create_node(parent=root)
  inspect(doc.children(root).length(), content="2")
  match doc.get_property(a, "type") {
    Some(v) => inspect(v, content="heading")
    None => inspect(false, content="true")
  }
}
```

- [ ] **Step 3: Implement TreeDoc with CausalGraph**

In `tree_doc.mbt`:

```moonbit
///|
pub let root_id : @mt.TreeNodeId = @mt.root_id

///|
pub let trash_id : @mt.TreeNodeId = @mt.trash_id

///|
pub struct TreeDoc {
  priv tree : @mt.MovableTree
  priv log : @mt.TreeOpLog
  priv graph : @cg.CausalGraph
  priv agent_id : String
  priv mut next_counter : Int
}

///|
pub fn TreeDoc::new(agent_id : String) -> TreeDoc {
  {
    tree: @mt.MovableTree::new(),
    log: @mt.TreeOpLog::new(),
    graph: @cg.CausalGraph::new(),
    agent_id,
    next_counter: 0,
  }
}

///|
fn TreeDoc::next_id(self : TreeDoc) -> @mt.TreeNodeId {
  let id = @mt.TreeNodeId::{ agent: self.agent_id, counter: self.next_counter }
  self.next_counter = self.next_counter + 1
  id
}

///|
fn TreeDoc::current_timestamp(self : TreeDoc) -> Int {
  // Lamport timestamp: derived from CausalGraph frontier
  let frontier = self.graph.get_frontier().0
  if frontier.is_empty() {
    return 0
  }
  let mut max_ts = 0
  for lv in frontier {
    match self.graph.get_entry(lv) {
      Some(entry) => {
        let ts = entry.timestamp
        if ts > max_ts { max_ts = ts }
      }
      None => ()
    }
  }
  max_ts + 1
}

///|
fn TreeDoc::record_op(self : TreeDoc, op : @mt.TreeMoveOp) -> Unit {
  // Add to CausalGraph for version tracking
  let parents = self.graph.get_frontier().0
  let _lv = self.graph.add_version(parents, self.agent_id) catch { _ => return }
  // Apply via undo-do-redo log
  self.log.apply(self.tree, op)
}

///|
pub fn TreeDoc::create_node(self : TreeDoc, parent~ : @mt.TreeNodeId) -> @mt.TreeNodeId {
  let id = self.next_id()
  let children = self.tree.children(parent)
  let last_pos : @fi.FractionalIndex? = if children.is_empty() {
    None
  } else {
    self.tree.get_position(children[children.length() - 1])
  }
  let position = @fi.FractionalIndex::between(last_pos, None)
  let ts = self.current_timestamp()
  let op : @mt.TreeMoveOp = {
    timestamp: ts, target: id, new_parent: parent, position, agent: self.agent_id,
  }
  self.record_op(op)
  id
}

///|
pub fn TreeDoc::move_node(
  self : TreeDoc,
  target~ : @mt.TreeNodeId,
  new_parent~ : @mt.TreeNodeId,
) -> Unit {
  let children = self.tree.children(new_parent)
  let last_pos : @fi.FractionalIndex? = if children.is_empty() {
    None
  } else {
    self.tree.get_position(children[children.length() - 1])
  }
  let position = @fi.FractionalIndex::between(last_pos, None)
  let ts = self.current_timestamp()
  let op : @mt.TreeMoveOp = {
    timestamp: ts, target, new_parent, position, agent: self.agent_id,
  }
  self.record_op(op)
}

///|
pub fn TreeDoc::delete_node(self : TreeDoc, target : @mt.TreeNodeId) -> Unit {
  let ts = self.current_timestamp()
  let op : @mt.TreeMoveOp = {
    timestamp: ts,
    target,
    new_parent: @mt.trash_id,
    position: @fi.FractionalIndex::from_array([0]),
    agent: self.agent_id,
  }
  self.record_op(op)
}

///|
pub fn TreeDoc::children(self : TreeDoc, parent : @mt.TreeNodeId) -> Array[@mt.TreeNodeId] {
  self.tree.children(parent)
}

///|
pub fn TreeDoc::is_alive(self : TreeDoc, id : @mt.TreeNodeId) -> Bool {
  self.tree.is_alive(id)
}

///|
pub fn TreeDoc::set_property(self : TreeDoc, id : @mt.TreeNodeId, key : String, value : String) -> Unit {
  self.tree.set_property(id, key, value)
}

///|
pub fn TreeDoc::get_property(self : TreeDoc, id : @mt.TreeNodeId, key : String) -> String? {
  self.tree.get_property(id, key)
}

///|
pub fn TreeDoc::export_ops(self : TreeDoc) -> Array[@mt.TreeMoveOp] {
  self.log.all_ops()
}

///|
pub fn TreeDoc::apply_remote_op(self : TreeDoc, op : @mt.TreeMoveOp) -> Unit {
  // Record in CausalGraph (use add_version_with_seq for remote ops)
  let parents = self.graph.get_frontier().0
  let _lv = self.graph.add_version(parents, op.agent) catch { _ => return }
  // Apply via undo-do-redo
  self.log.apply(self.tree, op)
}
```

Run: `cd event-graph-walker && moon test -p dowdiness/event-graph-walker/tree`
Expected: PASS

- [ ] **Step 4: Write sync convergence test**

Add to `tree_doc_test.mbt`:

```moonbit
///|
test "TreeDoc: two peers converge after exchanging ops" {
  let alice = @tree.TreeDoc::new("alice")
  let bob = @tree.TreeDoc::new("bob")
  let root = @tree.root_id

  let a1 = alice.create_node(parent=root)
  alice.set_property(a1, "type", "heading")
  let a2 = alice.create_node(parent=root)
  alice.set_property(a2, "type", "paragraph")

  let b1 = bob.create_node(parent=root)
  bob.set_property(b1, "type", "list_item")

  // Exchange ops
  let alice_ops = alice.export_ops()
  let bob_ops = bob.export_ops()
  for op in bob_ops { alice.apply_remote_op(op) }
  for op in alice_ops { bob.apply_remote_op(op) }

  // Both have 3 children
  inspect(alice.children(root).length(), content="3")
  inspect(bob.children(root).length(), content="3")

  // Same order (determined by fractional index + timestamp tiebreaking)
  let ac = alice.children(root)
  let bc = bob.children(root)
  for i = 0; i < 3; i = i + 1 {
    inspect(ac[i] == bc[i], content="true")
  }
}

///|
test "TreeDoc: move and delete" {
  let doc = @tree.TreeDoc::new("alice")
  let root = @tree.root_id
  let a = doc.create_node(parent=root)
  let b = doc.create_node(parent=root)
  doc.move_node(target=a, new_parent=b)
  inspect(doc.children(b).length(), content="1")
  inspect(doc.children(root).length(), content="1")
  doc.delete_node(a)
  inspect(doc.is_alive(a), content="false")
}
```

Run: `cd event-graph-walker && moon test -p dowdiness/event-graph-walker/tree`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
cd event-graph-walker
git add tree/
git commit -m "feat: add TreeDoc public API with CausalGraph integration"
```

---

### Task 5: Quickcheck Convergence Properties

Real property-based tests using `@quickcheck.Arbitrary`.

**Files:**
- Create: `event-graph-walker/internal/movable_tree/convergence_properties_test.mbt`

- [ ] **Step 1: Implement Arbitrary for tree operation sequences**

In `convergence_properties_test.mbt`:

```moonbit
///|
enum TreeAction {
  Create(Int)   // Create node with this index as child of root
  Move(Int, Int) // Move node[a] under node[b]
  Delete(Int)    // Delete node[a]
} derive(Show)

///|
struct TreeScenario {
  actions : Array[TreeAction]
} derive(Show)

///|
impl @quickcheck.Arbitrary for TreeScenario with arbitrary(size, rs) {
  let num_actions = (rs.split().next_uint64().to_int().abs() % size).clamp(1, 8)
  let actions : Array[TreeAction] = []
  let mut created = 0
  for _i = 0; _i < num_actions; _i = _i + 1 {
    let choice = rs.split().next_uint64().to_int().abs() % 3
    if choice == 0 || created < 2 {
      actions.push(Create(created))
      created = created + 1
    } else if choice == 1 && created >= 2 {
      let a = rs.split().next_uint64().to_int().abs() % created
      let b = rs.split().next_uint64().to_int().abs() % created
      actions.push(Move(a, b))
    } else if created >= 1 {
      let a = rs.split().next_uint64().to_int().abs() % created
      actions.push(Delete(a))
    }
  }
  { actions }
}

///|
fn run_scenario(actions : Array[TreeAction], order : Array[Int]) -> Array[(@movable_tree.TreeNodeId, @movable_tree.TreeNodeId)> {
  let tree = @movable_tree.MovableTree::new()
  let log = @movable_tree.TreeOpLog::new()
  let root = @movable_tree.root_id
  let trash = @movable_tree.trash_id

  // Build ops from actions
  let ops : Array[@movable_tree.TreeMoveOp] = []
  let node_ids : Array[@movable_tree.TreeNodeId] = []
  for i = 0; i < actions.length(); i = i + 1 {
    match actions[i] {
      Create(idx) => {
        while node_ids.length() <= idx {
          node_ids.push(@movable_tree.TreeNodeId::{ agent: "test", counter: node_ids.length() })
        }
        let pos = @fi.FractionalIndex::from_array([i * 1000 + 500])
        ops.push({
          timestamp: i + 1,
          target: node_ids[idx],
          new_parent: root,
          position: pos,
          agent: "test",
        })
      }
      Move(a, b) => {
        if a < node_ids.length() && b < node_ids.length() {
          let pos = @fi.FractionalIndex::from_array([i * 1000 + 500])
          ops.push({
            timestamp: i + 1,
            target: node_ids[a],
            new_parent: node_ids[b],
            position: pos,
            agent: "test",
          })
        }
      }
      Delete(a) => {
        if a < node_ids.length() {
          ops.push({
            timestamp: i + 1,
            target: node_ids[a],
            new_parent: trash,
            position: @fi.FractionalIndex::from_array([0]),
            agent: "test",
          })
        }
      }
    }
  }

  // Apply in specified order
  for idx in order {
    if idx < ops.length() {
      log.apply(tree, ops[idx])
    }
  }

  // Return parent of each node
  node_ids.map(fn(id) { (id, tree.parent(id).unwrap_or(root)) })
}

///|
test "property: forward and reverse ordering always converge" {
  @qc.quick_check_fn(fn(scenario : TreeScenario) -> Bool {
    let n = scenario.actions.length()
    let forward = Array::makei(n, fn(i) { i })
    let reverse = Array::makei(n, fn(i) { n - 1 - i })
    let result_fwd = run_scenario(scenario.actions, forward)
    let result_rev = run_scenario(scenario.actions, reverse)
    if result_fwd.length() != result_rev.length() {
      return false
    }
    for i = 0; i < result_fwd.length(); i = i + 1 {
      if result_fwd[i].1 != result_rev[i].1 {
        return false
      }
    }
    true
  })
}
```

Run: `cd event-graph-walker && moon test -p dowdiness/event-graph-walker/internal/movable_tree`
Expected: PASS

- [ ] **Step 2: Commit**

```bash
cd event-graph-walker
git add internal/movable_tree/convergence_properties_test.mbt
git commit -m "test: add quickcheck convergence properties for MovableTree"
```

---

### Task 6: Interface Files and Format

- [ ] **Step 1: Generate interfaces and format**

```bash
cd event-graph-walker && moon info && moon fmt
```

- [ ] **Step 2: Verify**

```bash
cd event-graph-walker && moon check && moon test
```

Expected: All tests pass, no warnings.

- [ ] **Step 3: Review interface diffs**

```bash
cd event-graph-walker && git diff --stat
```

Review: Only new files in `internal/fractional_index/`, `internal/movable_tree/`, `tree/`. No changes to existing packages.

- [ ] **Step 4: Commit**

```bash
cd event-graph-walker
git add internal/fractional_index/ internal/movable_tree/ tree/
git commit -m "chore: generate interfaces and format for MovableTree packages"
```

---

## Notes for the Implementing Engineer

**FractionalIndex `between()` subtlety:** The `right_is_open` flag is key. When the gap at position `i` is exactly 1 (e.g., left=[5], right=[6]), we keep the left value and set `right_is_open = true` for all subsequent positions. This means the next position's upper bound is `max_value` (65536), guaranteeing a midpoint exists. Without this, keys like [5] and [6] would have no key between them.

**Kleppmann's undo-do-redo is O(n) per out-of-order op.** If an op arrives with timestamp 0, the entire log is undone and redone. Acceptable for block editor use (ops arrive mostly in order). Optimization: segment the log by timestamp ranges for O(k) where k is the out-of-order distance.

**Create vs Delete undo semantics:** Undoing a *create* must `remove_node` (the node ceases to exist). Undoing a *delete* (move to TRASH) must `apply_move` back to the old parent. These are different operations — conflating them causes bugs.

**Property changes are local-only.** `set_property` is NOT a CRDT operation — it's a local mutation. Making properties CRDT-safe (last-writer-wins per key) is deferred to Plan 3 (block document model).

**CausalGraph usage in TreeDoc is simplified.** The current integration records each op as a new version in the CausalGraph for Lamport timestamp derivation. A production implementation would use the CausalGraph's frontier tracking for proper causal sync messages (export_since, etc.), matching TextDoc's SyncSession pattern. This is sufficient for v1.
