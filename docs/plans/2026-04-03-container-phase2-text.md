# Container Phase 2: Per-Block Text — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add per-block text operations to the Container `Document`, with dense per-block item IDs instead of sparse global LVs. Block editor drops its independent `TextState` map and uses `Document::insert_text` / `delete_text` directly.

**Architecture:** Rename `fugue::Lv` → `fugue::ItemId` throughout the internal text pipeline. Introduce `LvTable` for bidirectional global-LV ↔ per-block-ItemId translation. Create `TextBlock` (FugueTree + LvTable) in the container. Document dispatches text ops through LvTable translation at the container boundary, so all internal packages operate on dense ItemIds.

**Tech Stack:** MoonBit, event-graph-walker submodule (internal packages: fugue, branch, oplog, causal_graph, document), container package, canopy block-editor

**Design reference:** `docs/plans/2026-03-29-container-design.md`

**Standalone TextState compatibility:** TextState continues to work unchanged — it uses the identity mapping (global LV = ItemId), which is the default when no LvTable is involved.

---

## File Map

### Modified files (rename fugue::Lv → fugue::ItemId)

| File | Change |
|------|--------|
| `internal/fugue/item.mbt` | `pub struct Lv(Int)` → `pub struct ItemId(Int)`, `root_lv` → `root_item_id` |
| `internal/fugue/tree.mbt` | All `Lv` → `ItemId` in fields and signatures |
| `internal/fugue/errors.mbt` | `MissingItem(id: Lv)` → `MissingItem(id: ItemId)` |
| `internal/fugue/insert_op.mbt` | InsertOp fields: `Lv` → `ItemId` |
| `internal/fugue/*.mbt` | All remaining `Lv` references (~40 occurrences in fugue/) |
| `internal/branch/branch.mbt` | `@fugue.Lv(...)` → `@fugue.ItemId(...)` |
| `internal/branch/branch_merge.mbt` | Same rename (~15 occurrences) |
| `internal/document/document.mbt` | Same rename (~20 occurrences) |
| `internal/fugue/*_test.mbt` | Test references |
| `internal/branch/*_test.mbt` | Test references |

### New files

| File | Responsibility |
|------|---------------|
| `container/lv_table.mbt` | `LvTable` — bidirectional Int (global LV) ↔ `@fugue.ItemId` mapping |
| `container/text_block.mbt` | `TextBlock` — per-block text state: FugueTree + LvTable + text cache |
| `container/text_ops.mbt` | Document text methods: `insert_text`, `delete_text`, `get_text`, `text_len` |
| `container/lv_table_test.mbt` | LvTable tests |
| `container/text_block_test.mbt` | TextBlock + Document text API tests |

### Modified files (container integration)

| File | Change |
|------|--------|
| `container/document.mbt` | Add `blocks` field, TextBlock lifecycle, Op enum |
| `container/errors.mbt` | Add `TextBlockNotFound` variant |
| `container/moon.pkg` | Add fugue, oplog imports |

---

## Task 1: Rename fugue::Lv → fugue::ItemId

Mechanical rename. No logic changes. All existing tests must still pass.

**Files:**
- Modify: all `internal/fugue/*.mbt` files
- Modify: all `internal/branch/*.mbt` files that reference `@fugue.Lv`
- Modify: `internal/document/document.mbt`

- [ ] **Step 1: Rename in fugue/item.mbt**

```moonbit
// Before:
pub struct Lv(Int) derive(Show, Eq, Compare, Default, Hash)
pub let root_lv : Lv = Lv(-1)

// After:
pub struct ItemId(Int) derive(Show, Eq, Compare, Default, Hash)
pub let root_item_id : ItemId = ItemId(-1)
```

Also rename all `Lv` → `ItemId` in the `Item` struct fields (`id : ItemId`, `parent : ItemId?`), and all helper functions/methods that use `Lv`.

- [ ] **Step 2: Rename in all other fugue/ files**

Search and replace `Lv` → `ItemId` and `root_lv` → `root_item_id` in:
- `tree.mbt` (FugueTree fields: `root_children : Array[ItemId]`, `children : Array[Array[ItemId]]`, all method signatures)
- `errors.mbt` (`MissingItem(id: ItemId)`)
- `insert_op.mbt` (`InsertOp` fields)
- Any other fugue/ .mbt files

- [ ] **Step 3: Rename @fugue.Lv → @fugue.ItemId in branch/**

In `branch.mbt` and `branch_merge.mbt`, replace all `@fugue.Lv(...)` with `@fugue.ItemId(...)` and `@fugue.Lv?` with `@fugue.ItemId?`.

~31 occurrences across these files.

- [ ] **Step 4: Rename in internal/document/document.mbt**

Replace all `@fugue.Lv(...)` → `@fugue.ItemId(...)` and `@fugue.Lv?` → `@fugue.ItemId?`.

~20 occurrences.

- [ ] **Step 5: Rename in test files**

Update all `_test.mbt` and `_wbtest.mbt` files in fugue/, branch/, document/.

- [ ] **Step 6: Run moon check**

```bash
cd event-graph-walker && moon check
```

Expected: 0 errors.

- [ ] **Step 7: Run full test suite**

```bash
cd event-graph-walker && moon test
```

Expected: All tests pass (no logic changed).

- [ ] **Step 8: moon info && moon fmt**

```bash
cd event-graph-walker && moon info && moon fmt
```

- [ ] **Step 9: Commit**

```bash
cd event-graph-walker
git add -A
git commit -m "refactor(fugue): rename Lv → ItemId throughout text pipeline

Mechanical rename preparing for Container Phase 2. No logic changes.
Standalone TextState uses ItemId as identity-mapped global LV."
```

---

## Task 2: Create LvTable

New struct for bidirectional global-LV ↔ per-block-ItemId mapping.

**Files:**
- Create: `container/lv_table.mbt`
- Create: `container/lv_table_test.mbt`
- Modify: `container/moon.pkg` (add fugue import)

- [ ] **Step 1: Update moon.pkg**

Add fugue import:

```
import {
  "dowdiness/event-graph-walker/internal/movable_tree" @mt,
  "dowdiness/event-graph-walker/internal/fractional_index" @fi,
  "dowdiness/event-graph-walker/internal/causal_graph" @cg,
  "dowdiness/event-graph-walker/internal/core",
  "dowdiness/event-graph-walker/internal/fugue" @fugue,
}
```

- [ ] **Step 2: Create lv_table.mbt**

```moonbit
///| Bidirectional mapping between global LVs and per-block ItemIds.
///
/// Each TextBlock has its own LvTable. ItemIds are dense (0, 1, 2, ...)
/// within each block. Global LVs come from the shared CausalGraph.
///
/// For standalone TextState (no container), LvTable is not used —
/// the identity mapping (global LV = ItemId value) is implicit.
pub struct LvTable {
  /// Global LV → ItemId. Sparse lookup.
  priv lv_to_item : Map[Int, @fugue.ItemId]
  /// ItemId → Global LV. Dense array indexed by ItemId value.
  priv item_to_lv : Array[Int]
  /// Next dense ItemId to assign.
  priv mut next_id : Int
}

///|
pub fn LvTable::new() -> LvTable {
  { lv_to_item: {}, item_to_lv: [], next_id: 0 }
}

///|
/// Register a global LV and assign it the next dense ItemId.
/// Returns the assigned ItemId.
pub fn LvTable::register(self : LvTable, lv : Int) -> @fugue.ItemId {
  let id = @fugue.ItemId(self.next_id)
  self.lv_to_item[lv] = id
  self.item_to_lv.push(lv)
  self.next_id = self.next_id + 1
  id
}

///|
/// Translate a global LV to a per-block ItemId.
/// Returns None if the LV has not been registered in this block.
pub fn LvTable::to_item_id(self : LvTable, lv : Int) -> @fugue.ItemId? {
  self.lv_to_item.get(lv)
}

///|
/// Translate an optional global LV to an optional ItemId.
/// None input (document boundary sentinel) maps to None output.
pub fn LvTable::to_item_id_opt(
  self : LvTable,
  lv : Int?,
) -> @fugue.ItemId? {
  match lv {
    None => None
    Some(lv) => self.lv_to_item.get(lv)
  }
}

///|
/// Translate a per-block ItemId back to its global LV.
pub fn LvTable::to_lv(self : LvTable, id : @fugue.ItemId) -> Int {
  self.item_to_lv[id.0]
}

///|
/// Number of registered mappings.
pub fn LvTable::len(self : LvTable) -> Int {
  self.next_id
}
```

- [ ] **Step 3: Write LvTable tests**

```moonbit
///|
test "lv_table: register and lookup" {
  let table = LvTable::new()
  let id0 = table.register(100) // global LV 100 → ItemId(0)
  let id1 = table.register(200) // global LV 200 → ItemId(1)
  let id2 = table.register(105) // global LV 105 → ItemId(2)
  inspect(id0, content="ItemId(0)")
  inspect(id1, content="ItemId(1)")
  inspect(id2, content="ItemId(2)")
  // Forward lookup
  inspect(table.to_item_id(100), content="Some(ItemId(0))")
  inspect(table.to_item_id(200), content="Some(ItemId(1))")
  inspect(table.to_item_id(999), content="None")
  // Reverse lookup
  inspect(table.to_lv(id0), content="100")
  inspect(table.to_lv(id1), content="200")
  inspect(table.to_lv(id2), content="105")
}

///|
test "lv_table: to_item_id_opt" {
  let table = LvTable::new()
  let _ = table.register(42)
  inspect(table.to_item_id_opt(None), content="None")
  inspect(table.to_item_id_opt(Some(42)), content="Some(ItemId(0))")
  inspect(table.to_item_id_opt(Some(99)), content="None")
}
```

- [ ] **Step 4: Run tests**

```bash
cd event-graph-walker && moon check && moon test -p dowdiness/event-graph-walker/container
```

- [ ] **Step 5: Commit**

```bash
cd event-graph-walker
git add container/
git commit -m "feat(container): add LvTable for global-LV ↔ per-block-ItemId mapping"
```

---

## Task 3: Create TextBlock

TextBlock composes a FugueTree with a LvTable. It handles local text insertion/deletion using dense ItemIds.

**Files:**
- Create: `container/text_block.mbt`
- Modify: `container/errors.mbt`

- [ ] **Step 1: Add TextBlockNotFound to errors.mbt**

```moonbit
pub(all) suberror DocumentError {
  EmptyReplicaId
  TargetNotFound
  ParentNotFound
  CycleDetected
  TextBlockNotFound(id~ : @mt.TreeNodeId)
  Internal(detail~ : String)
}
```

- [ ] **Step 2: Create text_block.mbt**

```moonbit
///| Per-block text state machine.
///
/// Each tree node that has text content gets a TextBlock. The FugueTree
/// uses dense per-block ItemIds (not global LVs), so a 100-item block
/// allocates exactly 100 slots regardless of total document history.
pub struct TextBlock {
  priv tree : @fugue.FugueTree[String]
  priv lv_table : LvTable
  priv mut text_cache : String?
}

///|
pub fn TextBlock::new() -> TextBlock {
  { tree: @fugue.FugueTree::new(), lv_table: LvTable::new(), text_cache: None }
}

///|
/// Insert a character into this block's text.
///
/// Parameters:
/// - `lv`: global LV from the shared CausalGraph
/// - `origin_left_lv`: global LV of the left origin (None = document start)
/// - `origin_right_lv`: global LV of the right origin (None = document end)
/// - `content`: the character to insert
/// - `timestamp`: Lamport timestamp for ordering
/// - `agent`: replica ID for tiebreaking
pub fn TextBlock::insert(
  self : TextBlock,
  lv : Int,
  origin_left_lv : Int?,
  origin_right_lv : Int?,
  content : String,
  timestamp : Int,
  agent : String,
) -> Unit raise DocumentError {
  let item_id = self.lv_table.register(lv)
  let origin_left = self.lv_table.to_item_id_opt(origin_left_lv)
  let origin_right = self.lv_table.to_item_id_opt(origin_right_lv)
  // FugueTree::insert takes InsertOp with origin_left/origin_right.
  // It calls find_parent_and_side internally — caller does NOT compute parent/side.
  self.tree.insert(
    {
      id: item_id,
      content,
      origin_left,
      origin_right,
      timestamp: @fugue.Timestamp(timestamp),
      agent: @fugue.ReplicaId(agent),
    },
  )
  self.text_cache = None
}

///|
/// Delete a character in this block's text by its global LV.
pub fn TextBlock::delete(
  self : TextBlock,
  item_lv : Int,
  del_timestamp : Int,
  del_agent : String,
) -> Unit raise DocumentError {
  let item_id = match self.lv_table.to_item_id(item_lv) {
    Some(id) => id
    None =>
      raise DocumentError::Internal(
        detail="TextBlock delete: unknown LV " + item_lv.to_string(),
      )
  }
  try {
    self.tree.delete_with_ts(item_id, del_timestamp, del_agent)
  } catch {
    @fugue.FugueError(err) =>
      raise DocumentError::Internal(
        detail="TextBlock delete: " + err.to_string(),
      )
  }
  self.text_cache = None
}

///|
/// Get the current visible text of this block.
pub fn TextBlock::text(self : TextBlock) -> String {
  match self.text_cache {
    Some(cached) => cached
    None => {
      let text = self.tree.to_text()
      self.text_cache = Some(text)
      text
    }
  }
}

///|
/// Get the visible character count.
pub fn TextBlock::len(self : TextBlock) -> Int {
  self.tree.visible_count()
}

///|
/// Get the LvTable for external translation queries.
pub fn TextBlock::lv_table(self : TextBlock) -> LvTable {
  self.lv_table
}
```

Note: `FugueTree::insert` takes an `InsertOp` with `origin_left`/`origin_right` and calls `find_parent_and_side` internally. The caller does NOT compute parent/side — just pass the translated ItemId origins. This matches how `internal/document/document.mbt:201-216` constructs its InsertOp.

- [ ] **Step 3: Run moon check**

```bash
cd event-graph-walker && moon check
```

- [ ] **Step 4: Commit**

```bash
cd event-graph-walker
git add container/
git commit -m "feat(container): add TextBlock with per-block dense ItemIds"
```

---

## Task 4: Add text ops to Document

Wire TextBlock into the container Document. Add text mutation methods.

**Files:**
- Modify: `container/document.mbt`
- Create: `container/text_ops.mbt`

- [ ] **Step 1: Add blocks field to Document**

In `container/document.mbt`, add to the Document struct:

```moonbit
pub struct Document {
  // ... existing tree fields ...
  priv blocks : Map[@mt.TreeNodeId, TextBlock]  // NEW
}
```

Update `Document::new` to initialize `blocks: {}`.

- [ ] **Step 2: Create text_ops.mbt with text methods**

```moonbit
///| Text operations on Document.

///|
/// Get or create the TextBlock for a tree node.
fn Document::get_or_create_text(
  self : Document,
  id : @mt.TreeNodeId,
) -> TextBlock {
  match self.blocks.get(id) {
    Some(block) => block
    None => {
      let block = TextBlock::new()
      self.blocks[id] = block
      block
    }
  }
}

///|
/// Insert text at the given character position in a block's text content.
pub fn Document::insert_text(
  self : Document,
  id : @mt.TreeNodeId,
  pos : Int,
  text : String,
) -> Unit raise DocumentError {
  if !self.is_alive(id) {
    raise DocumentError::TargetNotFound
  }
  let block = self.get_or_create_text(id)
  for i = 0; i < text.length(); i = i + 1 {
    let ch = text[i:i + 1].to_string()
    let insert_pos = pos + i
    // Determine Fugue origins from current document position
    let (origin_left, origin_right) = block_position_to_origins(
      block, insert_pos,
    )
    // Allocate global LV
    let lv = self.graph.add_local_op(self.agent_id, self.next_counter)
    self.next_counter = self.next_counter + 1
    self.lamport_clock = self.lamport_clock + 1
    // Insert into the block
    block.insert(
      lv, origin_left, origin_right, ch, self.lamport_clock, self.agent_id,
    )!
  }
}

///|
/// Delete a character at the given position in a block's text content.
pub fn Document::delete_text(
  self : Document,
  id : @mt.TreeNodeId,
  pos : Int,
) -> Unit raise DocumentError {
  if !self.is_alive(id) {
    raise DocumentError::TargetNotFound
  }
  let block = match self.blocks.get(id) {
    Some(b) => b
    None => raise DocumentError::TextBlockNotFound(id~)
  }
  if pos >= block.len() {
    raise DocumentError::Internal(
      detail="delete_text: position " +
        pos.to_string() +
        " out of bounds (len=" +
        block.len().to_string() +
        ")",
    )
  }
  // Find the ItemId at this visible position, translate to global LV
  let item_lv = block_position_to_item_lv(block, pos)
  self.lamport_clock = self.lamport_clock + 1
  block.delete(item_lv, self.lamport_clock, self.agent_id)!
}

///|
/// Get the text content of a block.
pub fn Document::get_text(
  self : Document,
  id : @mt.TreeNodeId,
) -> String {
  match self.blocks.get(id) {
    Some(block) => block.text()
    None => ""
  }
}

///|
/// Get the text length of a block.
pub fn Document::text_len(
  self : Document,
  id : @mt.TreeNodeId,
) -> Int {
  match self.blocks.get(id) {
    Some(block) => block.len()
    None => 0
  }
}
```

Note: `block_position_to_origins` and `block_position_to_item_lv` are helper functions that map a visible character position to the Fugue tree's origin references. **Read how `internal/document/document.mbt` implements `position_to_origins` (the `find_at_position` / `position_to_lv` pattern) and replicate the same logic using the FugueTree's traversal API.** These helpers need to walk the FugueTree's visible items to find the item at a given position.

- [ ] **Step 3: Run moon check**

```bash
cd event-graph-walker && moon check
```

Fix any compilation errors.

- [ ] **Step 4: Commit**

```bash
cd event-graph-walker
git add container/
git commit -m "feat(container): add Document text ops (insert_text, delete_text, get_text)"
```

---

## Task 5: Write text integration tests

**Files:**
- Create: `container/text_block_test.mbt`

- [ ] **Step 1: Write TextBlock unit tests**

```moonbit
///|
test "text_block: insert and read" {
  let block = TextBlock::new()
  block.insert(0, None, None, "H", 1, "alice")!
  block.insert(1, Some(0), None, "i", 2, "alice")!
  inspect(block.text(), content="Hi")
  inspect(block.len(), content="2")
}

///|
test "text_block: delete" {
  let block = TextBlock::new()
  block.insert(0, None, None, "A", 1, "alice")!
  block.insert(1, Some(0), None, "B", 2, "alice")!
  block.insert(2, Some(1), None, "C", 3, "alice")!
  inspect(block.text(), content="ABC")
  block.delete(1, 4, "alice")! // delete "B" (LV=1)
  inspect(block.text(), content="AC")
  inspect(block.len(), content="2")
}
```

- [ ] **Step 2: Write Document text integration tests**

```moonbit
///|
test "document: insert and read text" {
  let doc = Document::new("alice")!
  let node = doc.create_node(parent=@mt.root_id)!
  doc.insert_text(node, 0, "Hello")!
  inspect(doc.get_text(node), content="Hello")
  inspect(doc.text_len(node), content="5")
}

///|
test "document: delete text" {
  let doc = Document::new("alice")!
  let node = doc.create_node(parent=@mt.root_id)!
  doc.insert_text(node, 0, "Hello")!
  doc.delete_text(node, 1)! // delete "e"
  inspect(doc.get_text(node), content="Hllo")
}

///|
test "document: text on deleted node fails" {
  let doc = Document::new("alice")!
  let node = doc.create_node(parent=@mt.root_id)!
  doc.delete_node(node)!
  let result = try { doc.insert_text(node, 0, "x") } catch { _ => Err(()) }
  inspect(result is Err(_), content="true")
}

///|
test "document: multiple blocks independent" {
  let doc = Document::new("alice")!
  let n1 = doc.create_node(parent=@mt.root_id)!
  let n2 = doc.create_node(parent=@mt.root_id)!
  doc.insert_text(n1, 0, "AAA")!
  doc.insert_text(n2, 0, "BBB")!
  inspect(doc.get_text(n1), content="AAA")
  inspect(doc.get_text(n2), content="BBB")
}

///|
test "document: get_text on node without text returns empty" {
  let doc = Document::new("alice")!
  let node = doc.create_node(parent=@mt.root_id)!
  inspect(doc.get_text(node), content="")
  inspect(doc.text_len(node), content="0")
}
```

- [ ] **Step 3: Run tests**

```bash
cd event-graph-walker && moon test -p dowdiness/event-graph-walker/container
```

Expected: All container tests pass (25 existing tree + new text tests).

- [ ] **Step 4: Run full suite**

```bash
cd event-graph-walker && moon test
```

Expected: All pass.

- [ ] **Step 5: moon info && moon fmt**

```bash
cd event-graph-walker && moon info && moon fmt
```

- [ ] **Step 6: Commit**

```bash
cd event-graph-walker
git add container/
git commit -m "test(container): add TextBlock and Document text integration tests"
```

---

## Task 6: Wire block editor to Document text ops

Replace the block editor's independent `TextState` map with `Document::insert_text` / `delete_text`.

**Files:**
- Modify: `examples/block-editor/main/block_doc.mbt`
- Modify: `examples/block-editor/main/moon.pkg`

- [ ] **Step 1: Remove @text import from moon.pkg**

Replace `@text` import with just `@container` (which now provides text ops):

```
import {
  "dowdiness/event-graph-walker/container" @container,
}
```

- [ ] **Step 2: Replace TextState usage in block_doc.mbt**

The block editor currently maintains a `Map[TreeNodeId, @text.TextState]` for per-block text. Replace all `@text.TextState` operations with `@container.Document` text methods:

- `text_states[id].insert(pos, text)` → `self.doc.insert_text(id, pos, text)`
- `text_states[id].delete(pos)` → `self.doc.delete_text(id, pos)`
- `text_states[id].text()` → `self.doc.get_text(id)`
- `text_states[id].len()` → `self.doc.text_len(id)`
- Remove the `text_states` map field entirely

Read `block_doc.mbt` in full to find all TextState references. The exact changes depend on the current API surface.

- [ ] **Step 3: Run moon check**

```bash
cd examples/block-editor && moon check
```

- [ ] **Step 4: Run tests**

```bash
cd examples/block-editor && moon test
```

Expected: All 44 block editor tests pass.

- [ ] **Step 5: moon info && moon fmt**

- [ ] **Step 6: Commit (in canopy repo)**

```bash
git add event-graph-walker examples/block-editor/
git commit -m "feat(block-editor): use Document text ops instead of per-block TextState

Block editor now uses @container.Document for both tree and text ops.
Per-block TextState map removed. Dense per-block ItemIds via LvTable."
```

---

## Task 7: Verify and finalize

- [ ] **Step 1: Run all test suites**

```bash
cd event-graph-walker && moon test
cd .. && moon test
cd examples/block-editor && moon test
```

Expected: All pass.

- [ ] **Step 2: Verify no stale @text references in block-editor**

```bash
grep -rn "@text\." examples/block-editor/main/*.mbt
```

Expected: Zero matches.

- [ ] **Step 3: Check mbti interface changes**

```bash
cd event-graph-walker && git diff -- '*.mbti'
```

Review: `fugue/` should show `Lv` → `ItemId` rename. `container/` should show new public API methods.

- [ ] **Step 4: Ask user about submodule push**

Before pushing event-graph-walker, ask: "Push to event-graph-walker main, or create a PR?"

---

## Acceptance Criteria

- [ ] `fugue::Lv` renamed to `fugue::ItemId` across all internal packages
- [ ] `LvTable` provides bidirectional Int ↔ ItemId mapping
- [ ] `TextBlock` stores text with dense per-block ItemIds
- [ ] `Document::insert_text` / `delete_text` / `get_text` / `text_len` work
- [ ] Block editor uses Document text ops (no independent TextState)
- [ ] All existing tests pass (no regression)
- [ ] `moon check` passes across event-graph-walker and canopy
- [ ] Per-block item storage is O(block_size), not O(total_ops)

## Validation

```bash
cd event-graph-walker && moon check && moon test
cd .. && moon check && moon test
cd examples/block-editor && moon check && moon test
```

## Risks

- **Position-to-origins mapping**: Converting a visible character position to Fugue origin LVs requires walking the FugueTree's visible items. The existing `internal/document/document.mbt` uses `position_to_lv` (get LV of item before cursor) and `lv_at_position` (get LV of item at cursor) via an OrderTree position cache. TextBlock needs the same logic — either replicate the position cache or use `FugueTree::get_visible_items()` directly (simpler, O(n) per insert instead of O(log n), acceptable for Phase 2).
- **CausalGraph interaction**: This plan covers local ops only. `Document::insert_text` allocates LVs from the shared CausalGraph via `graph.add_local_op`. Verify this method exists on CausalGraph and returns an Int (global LV). If the API differs, adapt the call.
- **Standalone TextState**: Verify TextState still works after the fugue rename by running `cd event-graph-walker && moon test -p dowdiness/event-graph-walker/text`.

## Notes

- Remote text sync (merge/retreat/advance through the container) is deferred to Phase 3.
- Transaction grouping and undo are deferred to Phase 4.
- The Op enum (`TextInsert`, `TextDelete` variants) from the design doc is deferred — local ops go directly to TextBlock without oplog serialization. The Op enum is needed for sync (Phase 3).
