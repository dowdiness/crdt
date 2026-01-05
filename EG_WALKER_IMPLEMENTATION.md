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

### 1. ✅ Event Graph Walker (COMPLETED)

**Location:** `/causal_graph/walker.mbt` and `/oplog/walker.mbt`

The core algorithm that traverses the operation graph in topological order.

**Implemented:**
- `CausalGraph::walk_from_frontier(frontier)` - Topological sort in causal order
- `OpLog::walk_and_collect(frontier)` - Collect operations at frontier
- `OpLog::diff_and_collect(from, to)` - Diff two frontiers
- Multiple convenience methods (walk_all, walk_recent, walk_range, etc.)

All walker methods use method style (`self`) and have comprehensive tests.

### 2. ✅ Branch/Snapshot System (COMPLETED)

**Location:** `/branch/branch.mbt`

Efficient document state computation from operations.

**Implemented:**
```moonbit
pub struct Branch {
  frontier : Array[Int]       // Version frontier this branch represents
  tree : @fugue.FugueTree     // CRDT tree state at this frontier
  oplog : @oplog.OpLog        // Reference to the operation log
}

/// Checkout document state at a frontier
pub fn Branch::checkout(oplog : @oplog.OpLog, frontier : Array[Int]) -> Branch

/// Advance a branch by applying new operations
pub fn Branch::advance(self : Branch, target_frontier : Array[Int]) -> Branch
```

**Features:**
- Efficient checkout using walker to apply operations in causal order
- Incremental advance (only applies new operations when possible)
- Full test coverage (12 tests) including concurrent inserts and complex operations
- Character-level operations (multi-character strings must be split into individual operations)

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

### Phase 1: ✅ Event Graph Walker (COMPLETED)

**Completed:**
- ✅ Created `/causal_graph/walker.mbt` with topological sort
- ✅ Created `/oplog/walker.mbt` with operation collection
- ✅ Implemented all walker methods in method style
- ✅ Added comprehensive tests (8 tests in causal_graph, 7 tests in oplog)
- ✅ All 234+ tests passing

**Key implementations:**
- `CausalGraph::walk_from_frontier(frontier)` - Uses Kahn's algorithm
- `OpLog::walk_and_collect(frontier)` - Collects operations in causal order
- `OpLog::diff_and_collect(from, to)` - Computes diff between frontiers

### Phase 2: ✅ Branch System (COMPLETED)

**Completed:**
- ✅ Created `/branch/` directory with `moon.pkg.json`
- ✅ Implemented `Branch` struct and all operations
- ✅ Implemented checkout using walker
- ✅ Implemented incremental advance
- ✅ Added 12 comprehensive tests
- ✅ All 246 tests passing

**Key implementations:**
```moonbit
pub struct Branch {
  frontier : Array[Int]
  tree : @fugue.FugueTree
  oplog : @oplog.OpLog
}

pub fn Branch::checkout(oplog : @oplog.OpLog, frontier : Array[Int]) -> Branch
pub fn Branch::advance(self : Branch, target_frontier : Array[Int]) -> Branch
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

## 🎯 Implementation Status

**✅ Phase 1-2 Complete: Local CRDT is fully functional!**

1. ✅ Implemented `walk_and_collect()` in walker.mbt
2. ✅ Implemented `checkout()` in branch.mbt
3. ✅ Tested with concurrent edits (246 tests passing)
4. ✅ Full character-level operations support

**🚧 Next Priority: Network Sync**

5. ⏳ Implement complete `merge_operations()` FFI (currently stub in crdt.mbt:160-167)
6. ⏳ Add TypeScript WebSocket/WebRTC sync
7. ⏳ Test with 2+ peers in browser

**📋 Future Optimizations**

8. ⏳ Add version vectors for efficient frontier representation
9. ⏳ Optimize checkout with deltas
10. ⏳ Add compression for network sync

## 📖 References

- [Eg-walker paper](https://arxiv.org/abs/2409.14252)
- [Reference implementation](https://github.com/josephg/eg-walker-reference)
- [Loro's eg-walker docs](https://loro.dev/docs/advanced/event_graph_walker)

---

## ✅ Completed Components

1. ✅ **walker.mbt** - Event graph traversal (Phases 1-2)
2. ✅ **branch.mbt** - Snapshot/checkout system (Phase 2)

## 🚧 Next Steps

Next priorities for full network-enabled CRDT:
3. **merge.mbt** - Complete branch merging implementation
4. **network.ts** - Browser WebSocket/WebRTC integration
5. **version_vector.mbt** - Efficient frontier compression

The foundation is solid! The local CRDT with walker and branch system is complete and tested.
