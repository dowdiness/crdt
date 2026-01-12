# Architecture Documentation

Documentation for the CRDT collaborative editor architecture.

## Contents

- **[Module Structure](modules.md)** - Overview of the two-module organization (event-graph-walker + crdt)
- **[eg-walker Implementation](EG_WALKER_IMPLEMENTATION.md)** - Detailed implementation notes for the eg-walker CRDT algorithm
- **[Walker Usage](WALKER_USAGE.md)** - How to use the event graph walker API
- **[Network Sync](NETWORK_SYNC.md)** - Network synchronization protocols and version vectors

## Quick Overview

The project implements the **eg-walker CRDT algorithm** with the following key components:

1. **Causal graph** - Tracks dependencies between operations
2. **Event graph walker** - Traverses operations in topological (causal) order
3. **FugueMax tree** - CRDT data structure for the actual sequence
4. **Version vectors** - Compact frontier representation for efficient network synchronization
5. **Branch system** - Efficiently checkout document state at any frontier

## Key Concepts

### Character-Level Operations

Operations work at the character level. Multi-character inserts should be split into individual character operations:

```moonbit
// CORRECT: Split into individual characters
for i = 0; i < text.length(); i = i + 1 {
  let ch = text[i:i + 1].to_string()
  let op = doc.insert(position + i, ch)
}
```

See `event-graph-walker/branch/branch_test.mbt` for examples.

### Version Vectors for Sync

Version vectors provide O(agents) comparison instead of O(operations):

```moonbit
// Create version vector from frontier
let vv = VersionVector::from_frontier(graph, frontier)

// Compare to detect synchronization state
if local_vv <= remote_vv {
  // Local is behind, need to pull
} else if remote_vv <= local_vv {
  // Already synchronized
} else {
  // Concurrent edits, need to merge
}
```

## References

- [eg-walker paper](https://arxiv.org/abs/2409.14252) - Original algorithm description
- [event-graph-walker README](../../event-graph-walker/README.md) - Module documentation
