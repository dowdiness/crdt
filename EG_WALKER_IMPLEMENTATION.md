# Eg-walker Implementation Plan for MoonBit

## Current Architecture Analysis

### ✅ What You Already Have

Your implementation is **already very close** to eg-walker! You have:

1. **Causal Graph** (`/causal_graph/graph.mbt`)
   - ✅ Parent tracking (causal dependencies)
   - ✅ Agent/Seq identification (RawVersion)
   - ✅ Lamport timestamps
   - ✅ Frontier management
   - ✅ Transitive closure (`transitive_closure()`)
   - ✅ Graph diffing (`graph_diff()`)
   - ✅ Ancestry checks (`is_ancestor()`)

2. **Operation Log** (`/oplog/oplog.mbt`)
   - ✅ Append-only operation storage
   - ✅ Remote operation merging
   - ✅ Frontier-based versioning

3. **CRDT Data Structure** (`/fugue/tree.mbt`)
   - ✅ FugueMax tree for ordered sequences

## 🎯 Missing Pieces for Full Eg-walker

### 1. Event Graph Walker (Priority: HIGH)

**Location:** Create `/causal_graph/walker.mbt`

The core algorithm that traverses the operation graph in topological order.

```moonbit
/// Walk the event graph from a frontier, yielding operations in causal order
pub fn walk_from_frontier(
  graph: CausalGraph,
  oplog: OpLog,
  start_frontier: Array[Int]
) -> Array[Op] {
  // Topological sort of operations reachable from frontier
  // Returns operations in an order that respects causality
}
```

**Algorithm:**
- Start from frontier versions
- Traverse parents in topological order
- Ensure each operation is emitted after its dependencies

### 2. Branch/Snapshot System (Priority: HIGH)

**Location:** Create `/branch/branch.mbt`

Efficient document state computation from operations.

```moonbit
/// A branch represents a document state at a specific frontier
pub struct Branch {
  frontier: Array[Int]           // Version frontier
  text: String                   // Current document text
  tree: @fugue.FugueTree        // CRDT tree state
}

/// Checkout document state at a frontier
pub fn checkout(graph: CausalGraph, oplog: OpLog, frontier: Array[Int]) -> Branch

/// Fast-forward a branch by applying new operations
pub fn advance_branch(branch: Branch, new_ops: Array[Op]) -> Branch
```

### 3. Version Vectors (Priority: MEDIUM)

**Location:** `/causal_graph/version_vector.mbt`

Compact representation of known versions per agent.

```moonbit
/// Version vector - tracks max sequence per agent
pub struct VersionVector {
  agents: @immut/hashmap.HashMap[String, Int]  // agent -> max_seq
}

/// Check if a version is covered by this vector
pub fn contains(vv: VersionVector, version: RawVersion) -> Bool

/// Merge two version vectors (union)
pub fn merge(vv1: VersionVector, vv2: VersionVector) -> VersionVector
```

### 4. Efficient Merge (Priority: HIGH)

**Location:** `/merge/merge.mbt`

Merge concurrent branches efficiently.

```moonbit
/// Merge two branches that diverged from a common base
pub fn merge_branches(
  graph: CausalGraph,
  oplog: OpLog,
  base: Branch,
  branch_a: Branch,
  branch_b: Branch
) -> Branch {
  // 1. Find operations unique to each branch
  let (retreat_a, advance_a) = graph.graph_diff(base.frontier, branch_a.frontier)
  let (retreat_b, advance_b) = graph.graph_diff(base.frontier, branch_b.frontier)

  // 2. Apply operations in causal order
  // 3. Return merged branch
}
```

## 📋 Implementation Steps

### Phase 1: Event Graph Walker (1-2 days)

1. **Create `/causal_graph/walker.mbt`**
   ```moonbit
   /// Topological sort of operations
   pub fn topological_sort(
     graph: CausalGraph,
     start: Array[Int]
   ) -> Array[Int] {
     // Kahn's algorithm or DFS-based topological sort
   }

   /// Walk graph and collect operations
   pub fn walk_and_collect(
     graph: CausalGraph,
     oplog: OpLog,
     frontier: Array[Int]
   ) -> Array[Op]
   ```

2. **Add tests in `/causal_graph/walker_test.mbt`**

### Phase 2: Branch System (2-3 days)

1. **Create `/branch/` directory**
   ```bash
   mkdir -p branch
   ```

2. **Implement `Branch` struct and operations**
   ```moonbit
   // branch/branch.mbt
   pub struct Branch {
     frontier: Array[Int]
     tree: @fugue.FugueTree
   }

   pub fn Branch::new() -> Branch
   pub fn Branch::from_frontier(
     graph: CausalGraph,
     oplog: OpLog,
     frontier: Array[Int]
   ) -> Branch
   ```

3. **Implement checkout**
   ```moonbit
   pub fn checkout(
     graph: CausalGraph,
     oplog: OpLog,
     frontier: Array[Int]
   ) -> Branch {
     // 1. Walk graph to get operations in order
     let ops = walk_and_collect(graph, oplog, frontier)

     // 2. Apply operations to empty tree
     let tree = @fugue.FugueTree::new()
     for op in ops {
       apply_to_tree(tree, op)
     }

     // 3. Return branch
     { frontier, tree }
   }
   ```

### Phase 3: Merge Algorithm (2-3 days)

1. **Create `/merge/merge.mbt`**
   ```moonbit
   pub fn merge_branches(
     graph: CausalGraph,
     oplog: OpLog,
     branch_a: Branch,
     branch_b: Branch
   ) -> Branch {
     // Use graph_diff to find operations to apply
     // Apply in topological order
   }
   ```

2. **Optimize with version vectors**

### Phase 4: Network Integration (TypeScript) (1-2 days)

1. **Create `/web/src/network.ts`**
   ```typescript
   import * as crdt from '../public/crdt';

   class NetworkSync {
     private handle: number;
     private peers: Map<string, WebRTCPeer> = new Map();

     // Send local operations to peers
     broadcastOps() {
       const ops = crdt.get_operations_json(this.handle);
       const frontier = crdt.get_frontier_json(this.handle);

       for (const peer of this.peers.values()) {
         peer.send({ ops, frontier });
       }
     }

     // Receive and merge remote operations
     onReceiveOps(data: { ops: string, frontier: string }) {
       crdt.merge_operations(this.handle, data.ops, data.frontier);
       this.updateUI();
     }
   }
   ```

2. **Add WebRTC/WebSocket transport layer**

## 🔧 MoonBit API Additions Needed

Update `/crdt.mbt` to expose new functions:

```moonbit
/// Checkout branch at frontier
pub fn checkout_branch(_handle: Int, frontier_json: String) -> String {
  match editor.val {
    Some(ed) => {
      let frontier = parse_frontier_json(frontier_json)
      let branch = checkout(ed.graph, ed.oplog, frontier)
      serialize_branch(branch)
    }
    None => "{}"
  }
}

/// Merge remote operations
pub fn merge_operations(_handle: Int, ops_json: String, frontier_json: String) -> Unit {
  match editor.val {
    Some(ed) => {
      let remote_ops = parse_ops_json(ops_json)
      let remote_frontier = parse_frontier_json(frontier_json)

      // Apply remote operations
      for op in remote_ops {
        ed.oplog.apply_remote(op)
      }

      // Mark as dirty for reparse
      ed.parse_dirty = true
    }
    None => ()
  }
}
```

## 📊 Performance Optimizations (Phase 5)

Based on eg-walker paper findings:

1. **Indexing by agent/seq** - fast lookup of operations
2. **Incremental checkout** - don't replay from scratch
3. **Delta encoding** - only send new operations
4. **Compressed frontiers** - version vectors instead of arrays

## 🧪 Testing Strategy

1. **Unit tests** for each component
2. **Integration tests** for merge scenarios:
   - Concurrent edits
   - Divergent branches
   - Complex causal chains
3. **Property tests** for CRDT properties:
   - Convergence
   - Commutativity
   - Idempotence

## 📝 Key Differences from Reference Implementation

Your architecture **improves** on basic eg-walker:

1. ✅ **Integrated parsing** - AST updates automatically
2. ✅ **Incremental parsing** - only reparse affected regions
3. ✅ **Type checking** - lambda calculus type inference (future)
4. ✅ **Lamport timestamps** - already in your CausalGraph

## 🎯 Minimal Viable Implementation (Start Here!)

**Priority 1: Make it work locally**

1. Implement `walk_and_collect()` in walker.mbt
2. Implement `checkout()` in branch.mbt
3. Test with local concurrent edits
4. Skip network/merge for now

**Priority 2: Add network sync**

5. Implement `merge_operations()` FFI
6. Add TypeScript WebSocket sync
7. Test with 2 peers

**Priority 3: Optimize**

8. Add version vectors
9. Optimize checkout with deltas
10. Add compression

## 📖 References

- [Eg-walker paper](https://arxiv.org/abs/2409.14252)
- [Reference implementation](https://github.com/josephg/eg-walker-reference)
- [Loro's eg-walker docs](https://loro.dev/docs/advanced/event_graph_walker)

---

## Next Steps

Want me to implement:
1. **walker.mbt** - Event graph traversal?
2. **branch.mbt** - Snapshot/checkout system?
3. **merge.mbt** - Branch merging?
4. **network.ts** - Browser integration?

Choose where to start!
