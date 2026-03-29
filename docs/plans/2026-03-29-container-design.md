# Unified Container for Block Editor

**Date:** 2026-03-29
**Status:** Design approved
**References:** Loro (global ID space + per-container state), Diamond Types (causal graph separated from content), Yjs (single StructStore), Automerge (per-object OpTree within global OpSet)

## Problem

BlockDoc wraps one TreeDoc + N independent TextDoc instances. Each owns its own CausalGraph, Lamport clock, and oplog. They share no causal history. This breaks sync (no cross-type ordering), undo (can't group tree + text ops), and concurrent delete+edit (text CRDT doesn't know its block was trashed).

## Core Principle

A Container is a single causal history that multiplexes typed operations to typed state machines. One CausalGraph, one VersionVector, one oplog. Every operation — tree move, property set, text insert, text delete — gets one LV from one shared graph.

## Design Principle: New Concerns in New Code

The mapping between global LVs and per-block local indices is inherent in multi-container architecture. It belongs in the Container (the new layer that introduces the concept), not in the primitives (FugueTree, Branch, OpLog — well-tested, correct as-is).

## Architecture

```
Document
├── CausalGraph                         shared, one LV space, unchanged
├── ops: Array[LogEntry]                unified oplog, all ops, global LVs
│   └── LogEntry = { lv: Int, op: Op }
├── seen_ops: Map                       dedup
├── tree: MovableTree                   global LVs directly (one tree, no sparseness)
├── tree_log: TreeOpLog                 Kleppmann conflict resolution
├── blocks: Map[TreeNodeId, TextBlock]  per-block text state machines
│   └── TextBlock
│       ├── oplog: OpLog                local ops, local indices (0, 1, 2...)
│       ├── branch: Branch              local state, uses shared CausalGraph for causal queries
│       ├── fugue: FugueTree            local indices, unchanged
│       └── lv_table: LvTable           global_lv ↔ local_index bidirectional mapping
├── property_state: Map                 LWW resolution
├── agent_id: String
├── lamport_clock: Int
└── next_counter: Int
```

### Why per-block local indices?

FugueTree stores items as `items: Array[Item[T]?]` where index = LV. With a shared LV space, a block's text ops have sparse LVs like [3, 7, 12, 45]. At scale (1000 tree ops + 100 blocks × 100 text ops = 11,000 total), each block's array would be 11,000 slots for ~100 items — 110× overhead. Not acceptable.

Each block keeps its own dense 0-based local index space. FugueTree, OpLog, and Branch work on local indices unchanged. The Container maintains a `LvTable` per block for bidirectional global↔local translation.

### Why tree uses global LVs directly

There is exactly one tree. Its ops are not interleaved with another tree's ops. MovableTree and TreeOpLog use global LVs without sparseness or translation.

## The One Refactoring: Branch

Branch currently gets its CausalGraph from OpLog. For multi-container use, it needs to accept an external shared CausalGraph for causal queries while using the per-block OpLog for op data.

```
Current:  Branch uses oplog.causal_graph for everything
New:      Branch accepts external CausalGraph + LV filter/translation
```

Branch.merge becomes:
1. Query shared CausalGraph: `diff_frontiers_lvs(old, new)` → global LVs
2. Filter: keep only this block's LVs (Container provides the filter via LvTable)
3. Translate: global LV → local index (Container provides via LvTable)
4. Retreat/advance on per-block FugueTree using local indices — algorithm unchanged

For standalone TextState (lambda editor): TextState owns its own CausalGraph and passes it to Branch with identity translation (global LV = local index). Same behavior as today. No regression.

## Op Enum

Closed enum. No trait/registry — we control the entire codebase. Adding a new data type means adding variants + match arms; compiler-enforced exhaustive matching catches missing arms.

```moonbit
pub(all) enum Op {
  TreeMove(TreeMoveOp)
  TreeProperty(TreePropertyOp)
  TextInsert(target: TreeNodeId, origin_left: Int, origin_right: Int, content: String)
  TextDelete(target: TreeNodeId, item_lv: Int)
}
```

Text ops use **Fugue-native data** (origin_left, origin_right as global LVs), not cursor positions. A cursor position from one replica is meaningless after concurrent edits. The Container translates origin LVs to local indices when dispatching to FugueTree.

LogEntry wraps Op with metadata:
```moonbit
pub(all) struct LogEntry {
  lv: Int
  op: Op
}
```

Transaction grouping for undo is tracked separately as `(agent, start_lv, end_lv)` ranges in the LogEntry stream — not a field on Op. Local ops from one agent within a transaction have contiguous LVs.

## Text Container Lifecycle

- **Creation:** Implicit. `create_node` auto-creates a TextBlock (empty FugueTree + Branch + OpLog + LvTable).
- **Deletion:** Tree node moves to trash. TextBlock is kept — text edits on trashed blocks are preserved in the oplog for undo.
- **Restoration:** If a trashed block is restored (undo or concurrent move), its TextBlock has full history intact.
- **Remote text on unknown block:** If a remote text op arrives for a block not yet created locally (out-of-order delivery), the Container creates the TextBlock eagerly. The block creation op will arrive later via causal delivery.
- **Local text on trashed block:** Rejected with `DocumentError::TargetNotFound`. Local UI should not allow editing trashed blocks.

## Public API

Lifecycle:
- `Document::new(replica_id) -> Document raise DocumentError`

Tree (structure):
- `create_node(parent~) -> TreeNodeId raise DocumentError`
- `create_node_after(parent~, after~) -> TreeNodeId raise DocumentError`
- `move_node(target~, new_parent~) raise DocumentError`
- `move_node_after(target~, new_parent~, after~) raise DocumentError`
- `delete_node(target) raise DocumentError`
- `children(parent) -> Array[TreeNodeId]`
- `is_alive(id) -> Bool`

Properties (LWW on tree nodes):
- `set_property(id, key, value)`
- `get_property(id, key) -> String?`

Text (per-block):
- `insert_text(id, pos, text) raise DocumentError`
- `delete_text(id, pos) raise DocumentError`
- `replace_text(id, range, text) raise DocumentError`
- `get_text(id) -> String`
- `text_len(id) -> Int`

Sync:
- `export_ops(since?: Version) -> SyncMessage`
- `apply_remote(SyncMessage) raise DocumentError`
- `version() -> Version`

Transactions:
- `begin_transaction()`
- `commit_transaction()`

Undo:
- `undo() -> Array[Op]`
- `redo() -> Array[Op]`

## Dispatch

```moonbit
fn Document::dispatch_op(self, lv: Int, op: Op) raise DocumentError {
  match op {
    TreeMove(m) => self.tree_log.apply(self.tree, m)
    TreeProperty(p) => self.apply_property_lww(p)
    TextInsert(target, origin_left, origin_right, content) => {
      let block = self.get_or_create_text(target)
      let local_left = block.lv_table.to_local(origin_left)
      let local_right = block.lv_table.to_local(origin_right)
      let local_lv = block.lv_table.register(lv)
      block.fugue.insert(local_lv, local_left, local_right, content)
    }
    TextDelete(target, item_lv) => {
      let block = self.get_or_create_text(target)
      let local_item = block.lv_table.to_local(item_lv)
      block.fugue.delete(local_item)
    }
  }
}
```

## Error Type

```moonbit
pub(all) suberror DocumentError {
  EmptyReplicaId
  TargetNotFound
  ParentNotFound
  CycleDetected
  TextBlockNotFound(id: TreeNodeId)
  Internal(detail~: String)
}
```

## Package Structure

```
container/
  document.mbt    Document struct, all mutation methods, dispatch
  types.mbt       Op, LogEntry, LvTable, SyncMessage, Version
  errors.mbt      DocumentError
  sync.mbt        export/import protocol
  undo.mbt        transactions, undo/redo
```

All in `event-graph-walker/container/`. Composes existing internal packages.

## Naming Changes

| Current | New | Reason |
|---------|-----|--------|
| `text/Document` | `text/TextState` | Mutable text CRDT state; Document is now the container concept |
| `tree/TreeDoc` | `tree/TreeState` | Same pattern |
| `tree/TreeDocError` | `tree/TreeError` | Follows from TreeState rename |

TextState and TreeState remain as public packages for standalone single-CRDT consumers.

## Block Editor Integration

No BlockDoc wrapper. The block-editor uses `@container.Document` directly. Domain logic (BlockType, markdown) lives as free functions:

```moonbit
fn create_block(doc: @container.Document, block_type: BlockType, ..) -> TreeNodeId
fn block_doc_from_markdown(md: String, replica_id: String) -> @container.Document
fn block_doc_to_markdown(doc: @container.Document) -> String
```

The JS bridge holds `Map[Int, @container.Document]` directly.

## Implementation Phases

Each phase delivers a working increment. Refactoring happens inside the phase that needs it.

| Phase | Delivers | Includes |
|-------|----------|----------|
| **0** | Rename: Document→TextState, TreeDoc→TreeState, TreeDocError→TreeError | Mechanical find-and-replace across event-graph-walker + canopy consumers |
| **1** | Container + tree ops. Block editor switches to `@container.Document`. | Document struct, shared CausalGraph, Op enum (TreeMove + TreeProperty), DocumentError, `move_node_after` |
| **2** | Per-block text in Container. Block editor drops TextDoc map. | Refactor Branch (accept external CausalGraph + LV filter/translation). Add TextInsert/TextDelete to Op with Fugue-native data. TextBlock lifecycle. LvTable. |
| **3** | Unified sync. Two peers converge on a block document. | One export/import protocol. Fix tree causal parents (currently fabricated from frontier). Document-wide VersionVector diff. |
| **4** | Document-level undo. Undo spans tree + text. | Transaction boundaries as (agent, start_lv, end_lv) ranges. Reverse delegation to TreeOpLog and per-block UndoManager. |

Phase 2 is the hardest — it requires the Branch refactoring and the LvTable translation layer. Phases 3 and 4 build on the foundation from 1 and 2.

## What Changes in Existing Code

| Package | Change | Risk |
|---------|--------|------|
| CausalGraph | None | None |
| FugueTree | None | None |
| OpLog | None (per-block OpLogs use local indices) | None |
| MovableTree / TreeOpLog | None (uses global LVs) | None |
| **Branch** | Accept external CausalGraph + LV filter/translation | **Medium** — focused change, algorithm unchanged |
| TextState (standalone) | Pass own CausalGraph to Branch with identity translation | Low |

## Future Consideration

SyncEditor (projectional editing) and the block editor share a structural pattern: Editor = Document + domain-specific concerns. If a shared editor base emerges from usage, extract it then. The Document API should be editor-agnostic.
