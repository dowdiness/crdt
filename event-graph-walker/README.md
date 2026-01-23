# Event Graph Walker

A MoonBit implementation of the **eg-walker** CRDT algorithm with **FugueMax** sequence CRDT for collaborative editing.

## Overview

This module provides a complete implementation of efficient collaborative editing with automatic conflict resolution. The event graph walker algorithm enables efficient replay of operations in causal order, while the Fugue tree maintains a CRDT-compliant ordered sequence of document content.

## Architecture

### Core Components

```
event-graph-walker/
├── text/             # User-friendly facade API (recommended)
├── document/         # Low-level document API
├── oplog/            # Operation log and walker
├── causal_graph/     # Causal graph and topological sorting
├── branch/           # Document snapshots at any frontier
├── fugue/            # FugueMax sequence CRDT tree
└── moon.mod.json     # Module metadata
```

### Package Layers

```
┌─────────────────────────────────────────┐
│  text (Facade - Recommended)            │
│  TextDoc, SyncMessage, Version, etc.    │
├─────────────────────────────────────────┤
│  document (Internal)                    │
│  Document, DocumentError                │
├──────────────┬──────────────────────────┤
│  branch      │  oplog                   │
│  Branch      │  OpLog, Op               │
├──────────────┴──────────────────────────┤
│  causal_graph                           │
│  CausalGraph, Frontier, VersionVector   │
├─────────────────────────────────────────┤
│  fugue                                  │
│  FugueTree, Item                        │
└─────────────────────────────────────────┘
```

### Key Data Structures

#### Document
The high-level API for collaborative editing. Manages text operations with position-based (cursor) API.

```moonbit
pub struct Document {
  tree: @fugue.FugueTree      // CRDT tree state
  oplog: @oplog.OpLog         // Operation log
  agent_id: String            // Unique peer identifier
}
```

**Operations:**
- `insert(position, text)` - Insert text at cursor position
- `delete(position)` - Delete character at cursor position
- `apply_remote(op)` - Apply operations from remote peers
- `merge_remote(ops, frontier)` - Merge multiple remote operations (frontier uses RawVersions)
- `to_text()` - Get current document text
- `get_frontier()` - Get local LVs for internal operations
- `get_frontier_raw()` - Get RawVersions for network sync

#### OpLog
Maintains append-only operation history with causal dependency tracking.

```moonbit
pub struct OpLog {
  operations: Array[Op]          // All operations in LV order
  graph: @causal_graph.CausalGraph  // Causal graph
  agent_id: String               // This agent's ID
}
```

**Note:** Operations should carry globally stable IDs (RawVersion) for
parents and FugueMax anchors; OpLog maps those IDs to local LVs on receipt.

#### CausalGraph
Tracks causality between operations using parents and version information.

```moonbit
pub struct CausalGraph {
  versions: Array[Version]       // Version info indexed by LV
  agents: Map[String, Int]       // Agent sequence counters
  // ... version vector tracking
}
```

#### FugueTree
CRDT tree implementing FugueMax algorithm for ordered sequences with conflict-free insertions.

```moonbit
pub struct FugueTree {
  items: HashMap[Int, Item]      // Items indexed by logical version
  root: Int                      // Virtual root (-1)
  length: Int                    // Item count
}
```

#### Branch
Document snapshot at a specific frontier. Enables efficient checkout and advance operations.

```moonbit
pub struct Branch {
  frontier: Array[Int]           // Version frontier
  tree: @fugue.FugueTree         // CRDT tree state
  oplog: @oplog.OpLog            // Reference to operation log
}
```

## Algorithm Components

### 1. Event Graph Walker
**Location:** `causal_graph/walker.mbt`, `oplog/walker.mbt`

The core algorithm that traverses the operation graph in topological (causal) order:

- `CausalGraph::walk_from_frontier(frontier)` - Returns operations reachable from frontier in causal order
- `OpLog::walk_and_collect(frontier)` - Collects actual operations at a frontier
- `OpLog::diff_and_collect(from, to)` - Computes diff between two frontiers

Uses topological sorting that preserves causal order without reordering by
local LV; the paper suggests a DFS-based ordering that keeps branches
consecutive when possible.

### 2. Branch System
**Location:** `branch/branch.mbt`

Efficient document state computation at any frontier:

- `Branch::checkout(oplog, frontier)` - Reconstruct document at frontier
- `Branch::advance(target_frontier)` - Efficiently move branch forward (incremental when possible)

The branch system uses the walker to replay operations, avoiding expensive full tree reconstructions when advancing forward.

### 3. Version Vectors
**Location:** `causal_graph/version_vector.mbt`

Compact representation of known versions per agent:

```moonbit
pub struct VersionVector {
  map: Map[String, Int]  // Max sequence number per agent
}
```

- Enables efficient network sync optimization
- Compare: `vv1.op_le(vv2)` - Checks if vv1 ≤ vv2 (already synced)
- Merge: `vv1.merge(vv2)` - Combines knowledge from two peers

### 4. Merge Algorithm
**Location:** `branch/branch_merge.mbt`

Three-phase merge for concurrent edits:

1. **Retreat** - Remove operations from current frontier not in target
2. **Advance** - Apply new operations up to target frontier  
3. **Apply** - Final state at target frontier

```moonbit
pub fn merge_remote_ops(
  tree: @fugue.FugueTree,
  oplog: @oplog.OpLog,
  remote_ops: Array[@oplog.Op]
) -> Unit
```

## Usage

### Quick Start (Recommended API)

The `text` package provides a user-friendly facade over the CRDT internals:

```moonbit
import "dowdiness/event-graph-walker/text"

// Create a document
let doc = @text.TextDoc::new("alice")

// Edit with type-safe positions
doc.insert(@text.Pos::at(0), "Hello")
doc.insert(@text.Pos::at(5), " World")
println(doc.text())  // "Hello World"

// Delete a character
doc.delete(@text.Pos::at(5))
println(doc.text())  // "HelloWorld"
```

### Syncing Between Peers

```moonbit
// Alice's document
let alice_doc = @text.TextDoc::new("alice")
alice_doc.insert(@text.Pos::at(0), "Hello")

// Bob's document
let bob_doc = @text.TextDoc::new("bob")

// Alice sends her changes to Bob
let message = alice_doc.sync().export_all()
bob_doc.sync().apply(message)
println(bob_doc.text())  // "Hello"

// Incremental sync (only new changes since last sync)
let bob_version = bob_doc.version()
alice_doc.insert(@text.Pos::at(5), "!")
let delta = alice_doc.sync().export_since(bob_version)
bob_doc.sync().apply(delta)
println(bob_doc.text())  // "Hello!"
```

### Historical Checkout (Time Travel)

```moonbit
let doc = @text.TextDoc::new("alice")
doc.insert(@text.Pos::at(0), "Hello")
let v1 = doc.version()  // Save this version

doc.insert(@text.Pos::at(5), " World")
println(doc.text())  // "Hello World"

// View document at earlier version
let old_view = doc.checkout(v1)
println(old_view.text())  // "Hello"
println(doc.text())       // "Hello World" (unchanged)
```

### Error Handling

```moonbit
let doc = @text.TextDoc::new("alice")
try {
  doc.delete(@text.Pos::at(100))  // Invalid position
} catch {
  @text.TextError::InvalidPosition(pos~, len~) => {
    println("Error: position \{pos} out of bounds (doc length: \{len})")
    println("Help: " + err.help())
    if err.is_retryable() {
      // Retry logic
    }
  }
  err => println(err.message())
}
```

### Advanced Access

For power users who need direct access to internals:

```moonbit
let doc = @text.TextDoc::new("alice")
doc.insert(@text.Pos::at(0), "Hello")

// Access underlying Document
let inner = doc.inner_document()
let oplog = inner.oplog
let frontier = inner.get_frontier()

// Access underlying Branch from a view
let view = doc.checkout(doc.version())
let branch = view.inner_branch()
```

---

## Low-Level API (Advanced)

The following sections document the internal APIs. Most users should use the `text` package above.

### Basic Editing (Document API)

```moonbit
// Create document for an agent
let doc = @document.Document::new("user-1")

// Insert text at position
doc.insert(0, "Hello")

// Get current text
let text = doc.to_text()  // "Hello"

// Delete at position
doc.delete(0)
let text = doc.to_text()  // "ello"
```

### Network Collaboration (Low-Level)

```moonbit
// Get version vector for sending to peer
let vv = doc.oplog.graph.get_version_vector()

// Apply remote operation
let remote_op = ...  // From peer
doc.apply_remote(remote_op)

// Or merge multiple operations
let remote_ops = [...]  // From peer
let remote_frontier = [...]  // RawVersions from peer
doc.merge_remote(remote_ops, remote_frontier)
```

### Snapshotting/Branching (Low-Level)

```moonbit
// Get current frontier
let frontier = doc.oplog.get_frontier()

// Create snapshot at current state
let branch = @branch.Branch::from_tree_and_oplog(doc.tree, doc.oplog)

// Checkout state at previous frontier
let old_branch = @branch.Branch::checkout(doc.oplog, previous_frontier)

// Advance to new frontier
let new_branch = branch.advance(target_frontier)
```

---

## Migration Guide

### From Document to TextDoc

If you're using the low-level `Document` API, here's how to migrate to `TextDoc`:

| Old (Document) | New (TextDoc) |
|---------------|---------------|
| `Document::new(agent)` | `TextDoc::new(agent)` |
| `doc.insert(pos, text)` | `doc.insert(Pos::at(pos), text)` |
| `doc.delete(pos)` | `doc.delete(Pos::at(pos))` |
| `doc.to_text()` | `doc.text()` |
| `doc.get_frontier()` | `doc.version().to_frontier()` |
| `doc.merge_remote(ops, heads)` | `doc.sync().apply(SyncMessage::new(ops, heads))` |

**Gradual Migration:**

```moonbit
// Wrap existing Document
let old_doc = @document.Document::new("alice")
let new_doc = @text.TextDoc::from_document(old_doc)

// Use new API
new_doc.insert(@text.Pos::at(0), "Hello")

// Access old API when needed
let inner = new_doc.inner_document()
```

**Key Benefits of TextDoc:**

1. **Type-safe positions** - `Pos` prevents accidental misuse of raw integers
2. **Cleaner sync** - `SyncMessage` bundles ops and heads together
3. **Better errors** - `TextError` provides `message()`, `help()`, `is_retryable()`
4. **Historical views** - `checkout()` returns read-only `TextView`
5. **Escape hatch** - `inner_document()`/`inner_branch()` gives full access when needed

**Remote ops:** When applying remote operations, buffer ops whose parents
are missing until all parent RawVersions are present, then map RawVersion
parents and anchors to local LVs before inserting into the causal graph.

## Key Features

- ✅ **Causal Consistency** - Operations ordered by causal dependencies
- ✅ **Conflict-Free** - FugueMax ensures deterministic ordering of concurrent inserts
- ✅ **Efficient** - Walker and branch systems avoid full tree reconstruction
- ✅ **Network Optimized** - Version vectors minimize sync overhead
- ✅ **Peer-to-Peer** - Works with any number of collaborators
- ✅ **Incremental** - Branch advance only applies new operations when possible

## Properties

The implementation guarantees CRDT properties:

- **Convergence** - All peers reach same state given same operation set
- **Commutativity** - Operation order in network doesn't matter
- **Idempotence** - Replaying operations multiple times is safe
- **Causality** - Operations respect causal dependencies

## Testing

Run tests with:

```bash
moon test
```

The module includes:
- 100+ unit tests for each component
- Property-based tests with Arbitrary/Shrink traits
- Benchmarks for performance profiling

## Performance

- **Small documents** (≤1000 ops) - Excellent performance
- **Walker** - O(n) for topological sort on DAG
- **Version vectors** - O(m) where m = number of agents
- **Branch advance** - O(k) where k = new operations

See [PERFORMANCE_ANALYSIS.md](../PERFORMANCE_ANALYSIS.md) for detailed benchmarks.

## Integration

This module is designed to be used with:

- **Parser** - Integrates with incremental parser
- **Web UI** - Exposed via MoonBit FFI to JavaScript
- **Network** - Handles WebRTC/WebSocket sync via JavaScript bridge

## References

- [Eg-walker paper](https://arxiv.org/abs/2409.14252)
- [Reference implementation](https://github.com/josephg/eg-walker-reference)
- [Loro eg-walker docs](https://loro.dev/docs/advanced/event_graph_walker)

## Design Decisions

### Character-Level Operations
Each insert/delete operates on a single character. This ensures:
- Minimal conflicts in collaborative editing
- Clear dependency tracking
- Simpler merge semantics

### Logical Versions (LV)
Operations indexed by LV (array index) rather than agent/sequence pairs for:
- O(1) operation lookup
- Simple frontier representation
- Efficient walker traversal

### Immutable Collections
Uses immutable HashMaps and Arrays for:
- Thread-safe concurrent access
- Easier reasoning about state
- Functional composition

## Contributing

When modifying this module:

1. Keep components independent (document, oplog, causal_graph, fugue, branch)
2. Update tests alongside implementation changes
3. Run `moon test` to verify CRDT properties
4. Use `moon benchmark` for performance-critical changes

## License

Apache 2.0 - See LICENSE file in repository root
