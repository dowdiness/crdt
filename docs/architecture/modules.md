## Module Structure

The codebase is organized as a **monorepo with git submodules**:

```mermaid
graph TD
    %% Core Libraries
    subgraph "Core Libraries (Submodules)"
        EGW[event-graph-walker]
        Loom[loom]
        TC[lib/text-change]
    end

    %% Application Layer
    subgraph "Application (crdt module)"
        Editor[editor]
        Proj[projection]
        Cmd[cmd]
        Bindings[crdt.mbt (JS FFI)]
    end

    %% External
    subgraph "Frontend"
        Web[examples/web]
    end

    %% Dependencies
    Editor --> EGW
    Editor --> Loom
    Editor --> TC

    Proj --> Editor
    Proj --> Loom

    Bindings --> Editor

    Cmd --> Editor
    Cmd --> Proj

    Web -.-> Bindings : WASM/JS Bridge

    %% Internal Library Deps
    Loom --> TC

    classDef core fill:#d4edda,stroke:#28a745,stroke-width:2px;
    classDef app fill:#e2e3e5,stroke:#6c757d,stroke-width:2px;
    classDef web fill:#fff3cd,stroke:#ffc107,stroke-width:2px;

    class EGW,Loom,TC core;
    class Editor,Proj,Cmd,Bindings app;
    class Web web;
```

## Git Submodules (Standalone Libraries)


| Submodule | GitHub Repo | MoonBit Module |
|---|---|---|
| `event-graph-walker/` | [dowdiness/event-graph-walker](https://github.com/dowdiness/event-graph-walker) | `dowdiness/event-graph-walker` |
| `loom/` | [dowdiness/loom](https://github.com/dowdiness/loom) | `dowdiness/lambda` (examples/lambda root pkg) |
| `svg-dsl/` | [dowdiness/svg-dsl](https://github.com/dowdiness/svg-dsl) | `antisatori/svg-dsl` |
| `graphviz/` | [dowdiness/graphviz](https://github.com/dowdiness/graphviz) | `antisatori/graphviz` |
| `valtio/` | [dowdiness/valtio](https://github.com/dowdiness/valtio) | `antisatori/valtio` |

## `event-graph-walker/` Module (Core CRDT Library)

A reusable CRDT library implementing the eg-walker algorithm. Contains 5 packages:

### `causal_graph/`
Causal graph data structure for tracking operation dependencies.

- Maintains parent relationships and Lamport timestamps
- Implements transitive closure, graph diffing, and ancestry checks
- **Event graph walker** (`walker.mbt`) - Core eg-walker algorithm for topological traversal
- **Version vectors** (`version_vector.mbt`) - Compact representation of version frontiers for efficient network sync

### `oplog/`
Operation log for append-only storage of edit operations.

### `fugue/`
FugueMax tree implementation (ordered sequence CRDT).

### `branch/`
Branch/snapshot system for efficient document state reconstruction and merging.

### `document/`
CRDT document model (general-purpose text document).

**See:** [event-graph-walker/README.md](../../event-graph-walker/README.md) for detailed documentation.

## `loom/` Module (Lambda Calculus Parser + Framework)

Rabbita-style monorepo containing the incremental parser framework and lambda calculus example.
The `crdt` module uses `dowdiness/lambda` (`loom/examples/lambda/`) — the root package is aliased `@parser` in pkg files for source compatibility.

- `loom/loom/` — `dowdiness/loom`: generic parser framework (core, bridge, pipeline, incremental, viz)
- `loom/seam/` — `dowdiness/seam`: language-agnostic CST (`CstNode`, `SyntaxNode`)
- `loom/incr/` — `dowdiness/incr`: reactive signals (`Signal`, `Memo`)
- `loom/examples/lambda/` — `dowdiness/lambda`: lambda calculus tokenizer, grammar, AST, benchmarks

**See:** [loom/README.md](../../loom/README.md) for detailed documentation.

## `crdt/` Module (Lambda Calculus Editor Application)

Application layer that uses event-graph-walker and parser as path dependencies.

### `/` (root)
JavaScript FFI bindings (`crdt.mbt`) that expose the editor API to JavaScript.

### `lib/text-change/`
Leaf MoonBit module with the pure contiguous `TextChange` algorithm shared by
`crdt`, `loom`, and `valtio`.
Inside this monorepo it is consumed via path dependencies; standalone packaging
is deferred until the shared API shape settles.

### `editor/`
High-level editor abstractions (application-specific).

- `SyncEditor` - Unified facade composing `TextDoc`, `UndoManager`, an edit-aware `ImperativeParser`, and memo-derived projection views
- `Editor` - Thin compatibility shim for CLI/tests; not the primary editor path

### `projection/`
Projectional editing support.

- Pure `ProjNode`/`SourceMap` derivation and reconciliation
- Interactive tree UI state (`TreeEditorState`)
- Functional tree-edit operations that round-trip through `SyncEditor`

### `cmd/main/`
Command-line entry points and REPL.

## Dependencies

```
svg-dsl (independent)
   ↑
graphviz (depends on svg-dsl via path ../svg-dsl)
   ↑
   ├── loom/viz (depends on graphviz via path ../../graphviz)

text-change (leaf module, independent)
   ↑
   ├── loom/core (depends on text-change via path ../../lib/text-change)
   ├── valtio (depends on text-change via path ../lib/text-change)
   └── crdt (depends on text-change via path ./lib/text-change)

event-graph-walker (independent, quickcheck only)

crdt (depends on event-graph-walker + dowdiness/lambda + dowdiness/loom + dowdiness/text_change via path deps)
```

## MoonBit Module Configuration

The root `moon.mod.json` declares path dependencies on the submodules:

```json
{
  "deps": {
    "dowdiness/event-graph-walker": { "path": "./event-graph-walker" },
    "dowdiness/text_change": { "path": "./lib/text-change" },
    "dowdiness/lambda": { "path": "./loom/examples/lambda" },
    "dowdiness/loom": { "path": "./loom/loom" }
  }
}
```

## Run Tests

```bash
cd lib/text-change && moon test               # Shared text-change leaf
moon test                                    # crdt module
cd event-graph-walker && moon test          # CRDT library
cd loom/loom && moon test                   # Parser framework
cd loom/examples/lambda && moon test        # Lambda example
```

## Design Rationale

### Why Submodules?

1. **Reusability**: Libraries can be used independently in other projects
2. **Separation of concerns**: Core CRDT logic is independent of lambda calculus
3. **Independent versioning**: Each library can be versioned and released separately
4. **Testing**: Each library tested independently
5. **Clarity**: Makes dependencies explicit
