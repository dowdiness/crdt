# Container Phase 1: Document with Tree Ops — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create `container/` package in event-graph-walker with a `Document` struct that provides tree ops by composing internal packages directly, then switch the block editor to use it.

**Architecture:** Document composes CausalGraph + MovableTree + TreeOpLog + FractionalIndex directly (not through TreeState). Introduces the Op enum (TreeMove + TreeProperty variants for now) and Lv type alias as foundation for the unified oplog. Block editor switches from `@tree.TreeState` to `@container.Document`.

**Tech Stack:** MoonBit, event-graph-walker submodule (internal packages), canopy block-editor example

**Design reference:** `docs/plans/2026-03-29-container-design.md`

**Source reference:** `event-graph-walker/tree/tree_doc.mbt` — Document replicates TreeState's tree logic with s/TreeState/Document/g and s/TreeError/DocumentError/g. All private helpers (timestamp generation, op recording, dedup, property LWW, position computation) are copied verbatim.

---

## File Map

### New files (event-graph-walker/container/)

| File | Responsibility |
|------|---------------|
| `container/moon.pkg.json` | Package metadata, imports movable_tree, causal_graph, fractional_index, core |
| `container/types.mbt` | `Lv` type alias, `Op` enum, `LogEntry` struct, `PropertyKey` struct, comparison/dedup functions |
| `container/errors.mbt` | `DocumentError` suberror |
| `container/document.mbt` | `Document` struct, constructor, all tree mutation/query methods, re-exports |
| `container/document_test.mbt` | Tests (copy tree_doc_test.mbt, adapted for Document) |

### Modified files

| File | Change |
|------|--------|
| `examples/block-editor/main/block_doc.mbt` | `@tree.TreeState` → `@container.Document`, `@tree.TreeError` → `@container.DocumentError` |
| `examples/block-editor/main/block_import.mbt` | Error type in signatures |
| `examples/block-editor/main/block_init.mbt` | Error type references |
| `examples/block-editor/moon.mod.json` | May need deps update |

---

### Task 1: Create container/ package skeleton

**Files:**
- Create: `event-graph-walker/container/moon.pkg.json`
- Create: `event-graph-walker/container/errors.mbt`
- Create: `event-graph-walker/container/types.mbt`

- [ ] **Step 1: Create moon.pkg.json**

```json
{
  "import": [
    { "path": "dowdiness/event-graph-walker/internal/movable_tree", "alias": "mt" },
    { "path": "dowdiness/event-graph-walker/internal/fractional_index", "alias": "fi" },
    { "path": "dowdiness/event-graph-walker/internal/causal_graph", "alias": "cg" },
    { "path": "dowdiness/event-graph-walker/internal/core" }
  ]
}
```

- [ ] **Step 2: Create errors.mbt**

```moonbit
///| Document error types

///|
pub(all) suberror DocumentError {
  /// replica_id must be non-empty
  EmptyReplicaId
  /// Target node does not exist locally
  TargetNotFound
  /// Parent node does not exist locally or is not alive
  ParentNotFound
  /// Move would create a cycle in the tree
  CycleDetected
  /// Internal invariant violation
  Internal(detail~ : String)
}
```

- [ ] **Step 3: Create types.mbt**

```moonbit
///| Container types

///|
/// Global causal version — assigned by the shared CausalGraph.
pub type Lv = Int

///|
/// Unified operation type. Phase 1: tree ops only.
/// Phase 2 will add TextInsert/TextDelete variants.
pub(all) enum Op {
  TreeMove(@mt.TreeMoveOp)
  TreeProperty(@mt.TreePropertyOp)
}

///|
/// An entry in the unified oplog.
pub(all) struct LogEntry {
  lv : Lv
  op : Op
}

///|
/// Re-export TreeNodeId so consumers don't need the internal package.
pub using @mt { type TreeNodeId }

///|
pub let root_id : @mt.TreeNodeId = @mt.root_id

///|
pub let trash_id : @mt.TreeNodeId = @mt.trash_id

///|
pub fn tree_node_id_key(id : @mt.TreeNodeId) -> String {
  id.agent + ":" + id.counter.to_string()
}

///|
pub fn tree_node_id_eq(a : @mt.TreeNodeId, b : @mt.TreeNodeId) -> Bool {
  a.agent == b.agent && a.counter == b.counter
}

///|
pub fn tree_node_id_new(agent : String, counter : Int) -> @mt.TreeNodeId {
  { agent, counter }
}

///|
pub fn tree_node_id_agent(id : @mt.TreeNodeId) -> String {
  id.agent
}

///|
pub fn tree_node_id_counter(id : @mt.TreeNodeId) -> Int {
  id.counter
}
```

- [ ] **Step 4: Run moon check**

```bash
cd event-graph-walker && moon check
```

Expected: 0 errors (types compile, no consumers yet).

- [ ] **Step 5: Commit**

```bash
cd event-graph-walker
git add container/
git commit -m "feat(container): add package skeleton with Op enum, Lv alias, DocumentError"
```

---

### Task 2: Implement Document struct with tree ops

**Files:**
- Create: `event-graph-walker/container/document.mbt`

The Document struct replicates TreeState's tree logic. Copy from `tree/tree_doc.mbt` with these substitutions:
- `TreeState` → `Document`
- `TreeError` → `DocumentError`
- All method signatures and logic are identical

- [ ] **Step 1: Create document.mbt with Document struct and all methods**

Read `event-graph-walker/tree/tree_doc.mbt` in full. Copy its entire content into `container/document.mbt` with the following changes:

1. Replace `pub struct TreeState` → `pub struct Document`
2. Replace every `TreeState::` → `Document::`
3. Replace every `self : TreeState` → `self : Document`
4. Replace every `-> TreeState` → `-> Document`
5. Replace every `raise TreeError` → `raise DocumentError`
6. Replace every `raise EmptyReplicaId` → `raise EmptyReplicaId` (same variant names, different suberror)
7. Replace every `raise TargetNotFound` → `raise TargetNotFound`
8. Replace every `raise ParentNotFound` → `raise ParentNotFound`
9. Replace every `raise CycleDetected` → `raise CycleDetected`
10. Replace every `raise Internal(` → `raise Internal(`

The private helpers (`PropertyKey`, `op_key`, `encode_field`, `compare_ops`, `compare_property_ops`) should also be copied — they're package-private and won't conflict with the ones in `tree/`.

Do NOT copy the `pub using`, `pub let root_id/trash_id`, or `tree_node_id_*` functions — those are already in `types.mbt`.

- [ ] **Step 2: Add move_node_after method**

Add after `move_node`, following the same pattern as `create_node_after`:

```moonbit
///|
/// Move a node to be a child of new_parent, positioned after a given sibling.
pub fn Document::move_node_after(
  self : Document,
  target~ : @mt.TreeNodeId,
  new_parent~ : @mt.TreeNodeId,
  after~ : @mt.TreeNodeId,
) -> Unit raise DocumentError {
  if not(self.tree.contains(target)) {
    raise TargetNotFound
  }
  if not(self.is_local_parent_valid(new_parent)) {
    raise ParentNotFound
  }
  if self.tree.would_create_cycle(target, new_parent) {
    raise CycleDetected
  }
  let timestamp = self.next_timestamp()
  let position = self.position_after_sibling(new_parent, after)
  let move_op : @mt.TreeMoveOp = {
    timestamp,
    target,
    new_parent,
    position,
    agent: self.agent_id,
  }
  self.apply_move_op(move_op)
  let _ = self.record_op(@mt.Move(move_op))
}
```

- [ ] **Step 3: Run moon check**

```bash
cd event-graph-walker && moon check
```

Expected: 0 errors.

- [ ] **Step 4: Commit**

```bash
cd event-graph-walker
git add container/document.mbt
git commit -m "feat(container): implement Document struct with tree ops + move_node_after"
```

---

### Task 3: Write tests for Document

**Files:**
- Create: `event-graph-walker/container/document_test.mbt`

Copy `tree/tree_doc_test.mbt` and adapt:
- `@tree.TreeState::new(` → `@container.Document::new(`
- `@tree.root_id` → `@container.root_id`
- `@tree.trash_id` → `@container.trash_id`
- `@mt.TreeNodeId` stays the same (same import)
- `@fi.FractionalIndex` stays the same

Add new tests for `move_node_after`:

```moonbit
///|
test "Document: move_node_after positions correctly" {
  let doc = @container.Document::new("alice")
  let a = doc.create_node(parent=@container.root_id)
  let b = doc.create_node(parent=@container.root_id)
  let c = doc.create_node(parent=@container.root_id)
  // Move c to be after a (between a and b)
  doc.move_node_after(target=c, new_parent=@container.root_id, after=a)
  let children = doc.children(@container.root_id)
  inspect(children.length(), content="3")
  inspect(children[0] == a, content="true")
  inspect(children[1] == c, content="true")
  inspect(children[2] == b, content="true")
}
```

- [ ] **Step 1: Create document_test.mbt**

Copy all 25 tests from `tree/tree_doc_test.mbt`, adapting the imports as described above. Add the `move_node_after` test.

- [ ] **Step 2: Run tests**

```bash
cd event-graph-walker && moon test -p container
```

Expected: All 26 tests pass (25 from TreeState + 1 new).

- [ ] **Step 3: Run full test suite**

```bash
cd event-graph-walker && moon test
```

Expected: All pass (existing tests unchanged + new container tests).

- [ ] **Step 4: Format and update interfaces**

```bash
cd event-graph-walker && moon info && moon fmt
```

- [ ] **Step 5: Commit**

```bash
cd event-graph-walker
git add container/
git commit -m "test(container): add Document tests (25 from TreeState + move_node_after)"
```

---

### Task 4: Switch block editor to @container.Document

**Files:**
- Modify: `examples/block-editor/main/block_doc.mbt`
- Modify: `examples/block-editor/main/block_import.mbt`
- Modify: `examples/block-editor/main/block_init.mbt`
- Modify: `examples/block-editor/main/block_init_wbtest.mbt`
- Modify: `examples/block-editor/moon.mod.json` (if container not already accessible)
- Modify: `examples/block-editor/main/moon.pkg.json` (add container import)

- [ ] **Step 1: Update block-editor package imports**

In `examples/block-editor/main/moon.pkg.json`, change the tree import to container (or add container alongside):

The block-editor's `moon.mod.json` depends on `dowdiness/event-graph-walker` via path. The `container/` package is part of that module, so it should be accessible as `@container` once imported in moon.pkg.json.

- [ ] **Step 2: Replace @tree references in block_doc.mbt**

- `@tree.TreeState` → `@container.Document`
- `@tree.TreeError` → `@container.DocumentError`
- `@tree.TreeNodeId` → `@container.TreeNodeId`
- `@tree.root_id` → `@container.root_id`
- `@tree.tree_node_id_key(` → `@container.tree_node_id_key(`
- `@tree.tree_node_id_eq(` → `@container.tree_node_id_eq(`

- [ ] **Step 3: Replace @tree references in block_import.mbt**

- `@tree.TreeError` → `@container.DocumentError`

- [ ] **Step 4: Replace @tree references in block_init.mbt and block_init_wbtest.mbt**

- `@tree.tree_node_id_new(` → `@container.tree_node_id_new(`
- `@tree.tree_node_id_agent(` → `@container.tree_node_id_agent(`
- `@tree.tree_node_id_counter(` → `@container.tree_node_id_counter(`
- `@tree.root_id` → `@container.root_id`

- [ ] **Step 5: Run moon check**

```bash
cd examples/block-editor && moon check
```

Expected: 0 errors (only pre-existing id_eq unused warning).

- [ ] **Step 6: Run moon test**

```bash
cd examples/block-editor && moon test
```

Expected: All 44 tests pass.

- [ ] **Step 7: Format and update interfaces**

```bash
cd examples/block-editor && moon info && moon fmt
```

- [ ] **Step 8: Commit**

Stage submodule pointer + block-editor changes:

```bash
cd /path/to/canopy
git add event-graph-walker examples/block-editor/
git commit -m "feat(block-editor): switch from TreeState to container Document

Block editor now uses @container.Document instead of @tree.TreeState.
This is Container Phase 1 — the foundation for unified tree+text ops."
```

---

### Task 5: Verify full test suite

- [ ] **Step 1: Run all tests**

```bash
cd event-graph-walker && moon test
cd .. && moon test
cd examples/block-editor && moon test
```

Expected: All pass.

- [ ] **Step 2: Verify no stale @tree references in block-editor**

```bash
grep -rn "@tree\." examples/block-editor/main/*.mbt
```

Expected: Zero matches.

- [ ] **Step 3: Push submodule (ask user first)**

Before pushing, ask the user: "Can I push event-graph-walker container/ changes to main, or should I create a PR?"
