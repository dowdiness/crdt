# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an implementation of the **eg-walker CRDT algorithm** for collaborative text editing, written in **MoonBit**. The project implements a CRDT-based collaborative editor for lambda calculus expressions with integrated incremental parsing, using the FugueMax sequence CRDT and retreat-advance-apply merge strategy.

## Build Commands

### Build
```bash
# Build for JavaScript target (web)
moon build --target js

# Build for WebAssembly
moon build --target wasm-gc

# Build without specific target
moon build
```

### Testing
```bash
# Run all tests
moon test

# Run tests for specific package
moon test parser
moon test causal_graph
moon test editor

# Update test snapshots (MoonBit uses snapshot testing)
moon test --update

# Get test coverage analysis
moon coverage analyze > uncovered.log
```

### Formatting and Linting
```bash
# Format all code
moon fmt

# Check code quality
moon check

# Update generated interface files
moon info

# Recommended: update interfaces and format before committing
moon info && moon fmt
```

### Benchmarking
```bash
# Run benchmarks
moon bench
```

### Web Development
```bash
# From the web/ directory
cd web
npm install
npm run dev        # Start development server (http://localhost:5173)
npm run build      # Build for production
npm run preview    # Preview production build
```

### Updating Web JavaScript
After making changes to MoonBit code that affects the web interface:
```bash
# From the crdt/ directory
moon build --target js
cp target/js/release/build/crdt.js web/public/
cp target/js/release/build/crdt.d.ts web/public/
```

## Architecture

### Module Structure

The codebase is organized into several MoonBit packages (each directory with `moon.pkg.json`):

- **`/` (root)** - JavaScript FFI bindings (`crdt.mbt`) that expose the editor API to JavaScript
- **`causal_graph/`** - Causal graph data structure for tracking operation dependencies
  - Maintains parent relationships and Lamport timestamps
  - Implements transitive closure, graph diffing, and ancestry checks
  - **Event graph walker** (`walker.mbt`) - Core eg-walker algorithm for topological traversal
  - **Version vectors** (`version_vector.mbt`) - Compact representation of version frontiers for efficient network sync
    - Tracks maximum sequence number per agent
    - Supports comparison, merging, and conversion to/from frontiers
    - Includes property-based tests with Arbitrary/Shrink traits
- **`oplog/`** - Operation log for append-only storage of edit operations
  - Tracks insert/delete operations with version information
  - Handles remote operation merging
  - Walker integration (`walker.mbt`) for collecting operations in causal order
- **`fugue/`** - FugueMax tree implementation (ordered sequence CRDT)
  - Tree-based structure for maintaining operation order
  - Supports efficient insert/delete with causal ordering
- **`branch/`** - Branch/snapshot system for efficient document state reconstruction
  - `Branch` - Document snapshot at a specific frontier
  - `checkout()` - Reconstruct document state at any frontier using walker
  - `advance()` - Efficiently update branch with incremental operations
- **`editor/`** - High-level editor abstractions
  - `Editor` - Basic text editor with cursor and CRDT operations
  - `ParsedEditor` - Enhanced editor with integrated incremental parsing
  - Text diff utilities for DOM synchronization
- **`parser/`** - Lambda calculus parser with incremental reparsing
  - Lexer and parser for lambda calculus with arithmetic and conditionals
  - Error recovery for partial/invalid syntax
  - Incremental parsing with damage tracking and parse caching
  - CRDT integration for AST updates
- **`merge/`** - Branch merging functionality
- **`cmd/main/`** - Command-line entry points and REPL

### Key Architectural Concepts

#### Eg-Walker CRDT
The implementation follows the eg-walker paper (https://arxiv.org/abs/2409.14252) with these components:
1. **Causal graph** - Tracks dependencies between operations
2. **Event graph walker** - Traverses operations in topological (causal) order
3. **FugueMax tree** - CRDT data structure for the actual sequence
4. **Version vectors** - Compact frontier representation for efficient network synchronization
   - Maps each agent to their maximum known sequence number
   - Enables O(agents) comparison instead of O(operations)
   - Used in network sync to detect if peers are already synchronized
5. **Branch system** - Efficiently checkout document state at any frontier
   - `Branch::checkout(oplog, frontier)` - Reconstruct document by walking operations in causal order
   - `branch.advance(new_frontier)` - Incrementally apply new operations to existing branch
   - **Important**: Operations represent character-level edits; multi-character inserts should be split into individual character operations

#### Incremental Parsing
The parser module features sophisticated incremental reparsing:
- **Damage tracking** - Identifies regions affected by edits
- **Token caching** - Reuses tokens from unchanged regions
- **Parse caching** - Reuses AST nodes when possible
- **Error recovery** - Continues parsing after syntax errors

#### Operation Model
- Operations are versioned with `RawVersion` (agent_id, sequence_number)
- Each operation has a Lamport timestamp and parent references
- Operations form a directed acyclic graph (DAG)
- The walker ensures operations are applied in causal order

### MoonBit Coding Conventions

1. **Block-style organization**: Code is organized in blocks separated by `///|`. The order of blocks is irrelevant, enabling independent refactoring.

2. **Deprecation**: Keep deprecated blocks in `deprecated.mbt` files within each package directory.

3. **Testing philosophy**:
   - Use `inspect` with snapshot testing (`moon test --update`)
   - Only use `assert_eq` in loops where snapshots vary
   - Tests end in `_test.mbt` (blackbox) or `_wbtest.mbt` (whitebox)

4. **Interface changes**: After refactoring, check `.mbti` generated interface files. If nothing changes, your refactoring didn't affect the public API.

5. **Format before committing**: Always run `moon info && moon fmt` before finalizing changes.

## Language Grammar (Lambda Calculus)

The parser supports lambda calculus with extensions:

```ebnf
Expression   ::= BinaryOp
BinaryOp     ::= Application (('+' | '-') Application)*
Application  ::= Atom+
Atom         ::= Integer
               | Variable
               | Lambda
               | IfThenElse
               | '(' Expression ')'
Lambda       ::= ('λ' | '\') Identifier '.' Expression
IfThenElse   ::= 'if' Expression 'then' Expression 'else' Expression
Integer      ::= [0-9]+
Variable     ::= [a-zA-Z_][a-zA-Z0-9_]*
```

Example expressions:
- `λx.x` or `\x.x` - Identity function
- `(\x.x) 42` - Function application
- `1 + 2 - 3` - Arithmetic (left-associative)
- `if x then y else z` - Conditionals

## Development Workflow

### Making Changes to MoonBit Code

1. Make your edits
2. Run `moon check` to lint
3. Run `moon test` to verify tests pass
4. If behavior changed intentionally: `moon test --update` to update snapshots
5. Run `moon info` to update `.mbti` interface files
6. Check git diff on `.mbti` files to verify expected changes
7. Run `moon fmt` to format
8. If web interface is affected, rebuild and copy JS files

### Working with the Parser

The parser has extensive documentation in `parser/README.md` and `parser/docs/`. When modifying:
- Check error recovery behavior with malformed input
- Update token/parse caches if lexer changes
- Test incremental parsing with `parser/incremental_parser_test.mbt`
- Benchmark performance with `parser/benchmark.mbt`

### Working with the CRDT

The CRDT implementation is split across multiple modules. Key files:
- `causal_graph/graph.mbt` - Core graph operations
- `causal_graph/walker.mbt` - Topological traversal (eg-walker)
- `causal_graph/version_vector.mbt` - Version vector implementation for efficient frontier tracking
- `causal_graph/version_vector_shrink.mbt` - Shrink trait for property-based testing
- `causal_graph/version_vector_properties_test.mbt` - Property-based tests (25 tests, 100 cases each)
- `oplog/oplog.mbt` - Operation storage and retrieval
- `oplog/walker.mbt` - Walker integration for collecting operations
- `fugue/tree.mbt` - Sequence CRDT implementation
- `branch/branch.mbt` - Branch system for efficient document snapshots
- `editor/editor.mbt` - High-level editor API

When adding features, consult `EG_WALKER_IMPLEMENTATION.md` and `WALKER_USAGE.md` for guidance on the eg-walker architecture.

#### Using the Branch System
The branch system provides efficient document state reconstruction:
```moonbit
// Checkout document at a specific frontier
let branch = Branch::checkout(oplog, frontier)
let text = branch.to_text()

// Advance branch to new frontier (incremental update)
let new_branch = branch.advance(new_frontier)

// Check if branch is at specific frontier
if branch.at_frontier(frontier) {
  // Branch is at this version
}
```

**Important**: The CRDT works at the character level. When inserting multi-character strings, split them into individual character operations (see `branch/branch_test.mbt` for examples).

#### Using Version Vectors
Version vectors provide compact frontier representation for network synchronization:
```moonbit
// Create version vector from frontier
let vv = VersionVector::from_frontier(graph, frontier)

// Compare version vectors
if local_vv <= remote_vv {
  // Local state is behind remote, need to sync
} else if remote_vv <= local_vv {
  // Already synced, remote has no new operations
} else {
  // Concurrent edits, need to merge
}

// Merge version vectors (take maximum sequence for each agent)
let merged_vv = local_vv.merge(remote_vv)

// Convert back to frontier for operations
let merged_frontier = merged_vv.to_frontier(graph)
```

**Network Sync Optimization**: The `merge_operations()` function uses version vector comparison to skip redundant merges when `remote_vv <= local_vv`.

## FFI and Web Integration

The root `crdt.mbt` file exports a JavaScript API:
- `create_editor(agent_id)` - Initialize editor
- `insert(handle, text)` - Insert text
- `delete_(handle)` / `backspace(handle)` - Delete operations
- `get_text(handle)` - Get document text
- `set_text(handle, text)` - Replace document
- `get_ast_json(handle)` - Get parsed AST
- `get_errors_json(handle)` - Get parse errors
- `get_frontier_json(handle)` - Get current version frontier
- `get_version_vector_json(handle)` - Get current version vector (used in network sync)
- `get_operations_json(handle)` - Get all operations as JSON
- `merge_operations(handle, ops_json, version_vector_json)` - Merge remote operations with version vector optimization
- `move_cursor(handle, position)` - Update cursor

The web interface (`web/`) uses these APIs to provide a collaborative lambda calculus editor with syntax highlighting.

## Testing and Quality

- All packages have test files (`*_test.mbt`)
- Tests use MoonBit's snapshot testing - inspect output and update with `--update`
- Property-based testing with QuickCheck (`@qc`) for algebraic properties:
  - Version vectors have 25 property tests with Arbitrary/Shrink traits (100 test cases each)
  - Parser has property-based tests for invariants
  - Editor has property tests for CRDT convergence
- Check coverage with `moon coverage analyze`
- Performance benchmarks in files ending with `_benchmark.mbt`
- Parser has comprehensive edge case tests in `parser/docs/EDGE_CASE_TESTS.md`
- Current test count: 329 tests, all passing

## References

- **Eg-walker paper**: https://arxiv.org/abs/2409.14252
- **MoonBit documentation**: https://docs.moonbitlang.com
- **FugueMax CRDT**: Part of the eg-walker family of CRDTs
- **Implementation guidance**: See `EG_WALKER_IMPLEMENTATION.md` and `WALKER_USAGE.md`
