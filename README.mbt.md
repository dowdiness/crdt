# Canopy

**Edit text. See the tree. Collaborate in real-time.**

Canopy is an incremental projectional editor where text and abstract syntax trees stay perfectly synchronized — powered by CRDTs for real-time collaboration. Built in [MoonBit](https://www.moonbitlang.com/), targeting WebAssembly.

The naming follows an organic metaphor: **loom** weaves structure, **seam** joins layers, and the **canopy** emerges above the trees as the surface you interact with.

[Try the demo](https://rabbita.koji-ishimoto.workers.dev/) · [Architecture](docs/architecture/) · [Paper (eg-walker)](https://arxiv.org/abs/2409.14252)

---

## Why Canopy?

Most editors treat source code as flat text. Canopy treats it as a living tree.

**Text and tree are two views of the same truth.** Type in the text editor and watch the AST update instantly. Restructure a node in the tree view and see the source code regenerate. Both directions, always consistent.

**Collaboration through CRDTs, not central servers.** Canopy uses the [eg-walker](https://arxiv.org/abs/2409.14252) algorithm with FugueMax — a sequence CRDT that preserves user intent even under concurrent edits. No operational transform, no conflict resolution hacks.

**Incremental by design.** The parser framework ([loom](loom/)) achieves O(1) subtree reuse through position-independent CST nodes. Edit one character, reparse one subtree — the rest is shared from the previous parse.

**Principled architecture.** The entire pipeline — parsing, projection, rendering — follows an [incremental hylomorphism](docs/architecture/Incremental-Hylomorphism.md) pattern: unfold text into trees, fold trees into views, and do it incrementally.

## Example Language

The demo language is lambda calculus with arithmetic — small enough to understand fully, rich enough to exercise every feature:

```
λx.x                  -- identity
(λf.λx.f x) 5         -- application
1 + 2 - 3             -- arithmetic
if x then 1 else 0    -- conditionals
let double = λx.x + x -- definitions
double 5
```

## Quick Start

**Prerequisites:** [MoonBit](https://www.moonbitlang.com/download/) and [Node.js](https://nodejs.org/)

```sh
git clone --recursive https://github.com/dowdiness/canopy.git
cd canopy
moon test
```

Run the projectional editor locally:

```sh
moon build --target js
cd examples/rabbita && npm install && npm run dev
```

Opens at `localhost:5173`.

## Project Overview

Monorepo with reusable libraries extracted as git submodules:

| Module | Description |
|--------|-------------|
| [event-graph-walker](event-graph-walker/) | CRDT library — eg-walker algorithm with FugueMax |
| [loom](loom/) | Incremental parser framework with position-independent CST |
| [editor](editor/) | Editor abstractions — SyncEditor, text/tree synchronization |
| [projection](projection/) | Projectional editing — ProjNode, TreeEditorState |

### Examples

| Example | Description |
|---------|-------------|
| [rabbita](examples/rabbita/) | Projectional editor with tree-first UI — the main demo |
| [ideal](examples/ideal/) | Extended rabbita with inspector panel and benchmark suite |
| [web](examples/web/) | Text-only CRDT editor with real-time syntax highlighting |
| [demo-react](examples/demo-react/) | React 19 + Valtio demo with undo/redo and collaboration |
| [prosemirror](examples/prosemirror/) | ProseMirror + CodeMirror integration example |

The [relay-server](examples/relay-server/) provides a Cloudflare Workers relay for peer-to-peer CRDT sync.

## Documentation

- [Architecture](docs/architecture/) — Incremental Hylomorphism, Anamorphism Discipline, Projectional Editing
- [Development](docs/development/) — Workflow, conventions, testing
- [Performance](docs/performance/) — Benchmarks and optimization notes

## Contributing

```sh
# Run all tests
moon test

# Format and update interfaces
moon info && moon fmt

# Benchmarks (always use --release)
moon bench --release
```

See [Development Guide](docs/development/) for the full workflow, including submodule management.

## References

- [Eg-walker: CRDTs for Truly Concurrent Sequence Editing](https://arxiv.org/abs/2409.14252)
- [MoonBit Language](https://www.moonbitlang.com/)

## License

[Apache-2.0](LICENSE)
