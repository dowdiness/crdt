# Module Structure

The codebase is organized into **two MoonBit modules**:

## `event-graph-walker/` Module (Core CRDT Library)

A reusable CRDT library implementing the eg-walker algorithm. Contains 5 packages (103 tests):

### `causal_graph/`
Causal graph data structure for tracking operation dependencies.

- Maintains parent relationships and Lamport timestamps
- Implements transitive closure, graph diffing, and ancestry checks
- **Event graph walker** (`walker.mbt`) - Core eg-walker algorithm for topological traversal
- **Version vectors** (`version_vector.mbt`) - Compact representation of version frontiers for efficient network sync
  - Tracks maximum sequence number per agent
  - Supports comparison, merging, and conversion to/from frontiers
  - Includes property-based tests with Arbitrary/Shrink traits

### `oplog/`
Operation log for append-only storage of edit operations.

- Tracks insert/delete operations with version information
- Handles remote operation merging
- Walker integration (`walker.mbt`) for collecting operations in causal order

### `fugue/`
FugueMax tree implementation (ordered sequence CRDT).

- Tree-based structure for maintaining operation order
- Supports efficient insert/delete with causal ordering

### `branch/`
Branch/snapshot system for efficient document state reconstruction and merging.

- `Branch` - Document snapshot at a specific frontier
- `checkout()` - Reconstruct document state at any frontier using walker
- `advance()` - Efficiently update branch with incremental operations
- Merge operations (`branch_merge.mbt`) - Implements retreat-advance-apply merge strategy

### `document/`
CRDT document model (general-purpose text document).

- `Document` - Wraps FugueTree, OpLog, and CausalGraph together
- Position-based operations (insert/delete at cursor position)
- Remote operation merging
- Reusable for any collaborative text editor application

**See:** [event-graph-walker/README.md](../../event-graph-walker/README.md) for detailed documentation.

## `crdt/` Module (Lambda Calculus Editor Application)

Application layer that uses the event-graph-walker library. Contains 3 packages + root (226 tests):

### `/` (root)
JavaScript FFI bindings (`crdt.mbt`) that expose the editor API to JavaScript.

### `editor/`
High-level editor abstractions (application-specific).

- `Editor` - Text editor with cursor tracking (wraps Document from event-graph-walker)
- `ParsedEditor` - Editor with integrated incremental parsing for lambda calculus
- Text diff utilities for incremental parser integration

### `parser/`
Lambda calculus parser with incremental reparsing.

- Lexer and parser for lambda calculus with arithmetic and conditionals
- Error recovery for partial/invalid syntax
- Incremental parsing with damage tracking and parse caching
- CRDT integration for AST updates

**See:** [parser/README.md](../../parser/README.md) for detailed documentation.

### `cmd/main/`
Command-line entry points and REPL.

## Test Coverage

**Total: 329 tests** (103 in event-graph-walker + 226 in crdt)

- event-graph-walker: 103 tests (core CRDT library)
- crdt application: 226 tests (editor + parser)

Run tests:
```bash
moon test                           # crdt module
cd event-graph-walker && moon test # CRDT library
```

## Dependencies

- **crdt → event-graph-walker**: Application depends on CRDT library (via path reference)
- **Both → quickcheck**: Property-based testing (version 0.9.8)

## File Locations

**Core CRDT library (`event-graph-walker/`):**
- `causal_graph/graph.mbt` - Core graph operations
- `causal_graph/walker.mbt` - Topological traversal (eg-walker)
- `causal_graph/version_vector.mbt` - Version vector implementation
- `oplog/oplog.mbt` - Operation storage and retrieval
- `fugue/tree.mbt` - Sequence CRDT implementation
- `branch/branch.mbt` - Branch system
- `branch/branch_merge.mbt` - Merge operations
- `document/document.mbt` - Document model

**Application layer (crdt module):**
- `editor/editor.mbt` - Basic editor with cursor tracking
- `editor/parsed_editor.mbt` - Editor with incremental parser integration
- `editor/text_diff.mbt` - Text diffing utilities
- `parser/*` - Lambda calculus parser

## Design Rationale

### Why Two Modules?

1. **Separation of concerns**: Core CRDT logic is independent of lambda calculus
2. **Reusability**: event-graph-walker can be used by other collaborative editors
3. **Testing**: CRDT primitives tested separately from application logic
4. **Clarity**: Makes dependencies explicit

### Why `document/` is in event-graph-walker

The `document/` package provides a general-purpose CRDT document abstraction with position-based operations. It has no application-specific features (no lambda calculus logic), making it suitable for any collaborative text editor.
