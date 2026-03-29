# Unified Container for Block Editor

**Date:** 2026-03-29
**Status:** Design approved

## Problem

BlockDoc wraps one TreeDoc + N independent TextDoc instances. Each owns its own CausalGraph, Lamport clock, and oplog. They share no causal history. This breaks sync (no cross-type ordering), undo (can't group tree + text ops), and concurrent delete+edit (text CRDT doesn't know its block was trashed).

## Solution

A Container is a single causal history that multiplexes typed operations to typed state machines. One CausalGraph, one oplog, one version vector. All operations share causal ordering.

## What the Container Owns

```
Document
  CausalGraph              shared — one LV space for all ops
  ops: Array[Op]           unified oplog — all ops sorted by LV
  seen_ops: Map            dedup
  tree: MovableTree        tree state machine
  tree_log: TreeOpLog      Kleppmann conflict resolution
  texts: Map[TreeNodeId, TextBlock]  per-block text state machines
    TextBlock = { fugue: FugueTree, branch: Branch }
  property_state: Map      LWW resolution
  agent_id: String
  lamport_clock: Int
  next_counter: Int
```

## Op Enum

Closed enum. Adding a new data type means adding variants + match arms. Compiler-enforced exhaustive matching catches missing arms. No trait/registry abstraction — we control the entire codebase.

```moonbit
pub(all) enum Op {
  TreeMove(TreeMoveOp)
  TreeProperty(TreePropertyOp)
  TextInsert(target: TreeNodeId, pos: Int, content: String, agent: String, timestamp: Int)
  TextDelete(target: TreeNodeId, pos: Int, agent: String, timestamp: Int)
}
```

Each op carries its target. Tree ops target the singular tree. Text ops embed the TreeNodeId of their block.

## Text Container Lifecycle

Implicit. Creating a tree node auto-creates its TextBlock (empty FugueTree + Branch). Deleting a node trashes it but keeps the TextBlock for undo. Restoration finds the TextBlock intact.

## Public API

Lifecycle:
- `Document::new(replica_id) -> Document raise ContainerError`

Tree (structure):
- `create_node(parent~) -> TreeNodeId raise ContainerError`
- `create_node_after(parent~, after~) -> TreeNodeId raise ContainerError`
- `move_node(target~, new_parent~) raise ContainerError`
- `delete_node(target) raise ContainerError`
- `children(parent) -> Array[TreeNodeId]`
- `is_alive(id) -> Bool`

Properties (LWW on tree nodes):
- `set_property(id, key, value)`
- `get_property(id, key) -> String?`

Text (per-block):
- `insert_text(id, pos, text) raise ContainerError`
- `delete_text(id, pos) raise ContainerError`
- `replace_text(id, range, text) raise ContainerError`
- `get_text(id) -> String`
- `text_len(id) -> Int`

Sync:
- `export_ops(since?: Version) -> SyncMessage`
- `apply_remote(SyncMessage) raise ContainerError`
- `version() -> Version`

Transactions:
- `begin_transaction()`
- `commit_transaction()`

Undo:
- `undo() -> Array[Op]`
- `redo() -> Array[Op]`

## Dispatch

One match statement routes ops to state machines:

```moonbit
fn Document::apply_op(self, op: Op) {
  match op {
    TreeMove(m) => self.tree_log.apply(self.tree, m)
    TreeProperty(p) => self.apply_property_lww(p)
    TextInsert(target, ..) => self.get_or_create_text(target).insert(..)
    TextDelete(target, ..) => self.get_or_create_text(target).delete(..)
  }
}
```

## Error Type

```moonbit
pub(all) suberror ContainerError {
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
  document.mbt    Document struct, mutation methods, dispatch
  types.mbt       Op enum, SyncMessage, Version
  errors.mbt      ContainerError
  sync.mbt        export/import protocol
  undo.mbt        transactions, undo/redo
```

All in `event-graph-walker/container/`. Composes existing internal packages directly.

## Naming Changes

| Current | New | Reason |
|---------|-----|--------|
| `text/Document` | `text/TextState` | Mutable text CRDT state; Document is now the container concept |
| `tree/TreeDoc` | `tree/TreeState` | Same pattern |
| `tree/TreeDocError` | `tree/TreeError` | Follows from TreeState rename |

TextState and TreeState remain as public packages for standalone single-CRDT consumers.

## Block Editor Integration

No BlockDoc wrapper. The block-editor uses `@container.Document` directly. Domain logic (BlockType encoding, markdown import/export) lives as free functions in the block-editor package:

```moonbit
fn create_block(doc: @container.Document, block_type: BlockType, ..) -> TreeNodeId
fn block_doc_from_markdown(md: String, replica_id: String) -> @container.Document
fn block_doc_to_markdown(doc: @container.Document) -> String
```

The JS bridge holds `Map[Int, @container.Document]` directly.

## Implementation Phases

| Phase | Scope | Shippable independently |
|-------|-------|------------------------|
| 0 | Rename: Document -> TextState, TreeDoc -> TreeState, TreeDocError -> TreeError | Yes |
| 1 | Container with shared CausalGraph + tree ops | Yes |
| 2 | Per-block text containers through unified oplog | Yes |
| 3 | Unified sync protocol | Yes |
| 4 | Document-level undo with transactions | Yes |

## Future Consideration

SyncEditor (projectional editing) and the block editor share a structural pattern: Editor = Document + domain-specific concerns. If a shared editor base emerges from usage, extract it then. The Document API should be editor-agnostic.
