# Canopy

Incremental projectional editor with CRDT collaboration, built in MoonBit.

- [Repository](https://github.com/dowdiness/canopy)
- [Web App](https://lambda-editor.koji-ishimoto.workers.dev/)

## What is Canopy?

Canopy is a collaborative code editor where **text and tree views stay synchronized**. Edit source code as text, see the AST update in real-time. Edit the tree structure, see the text regenerate. Multiple users can collaborate via CRDTs.

The name follows the organic metaphor of its components: **loom** (parser framework) weaves the structure, **seam** (CST library) joins the layers, and the **canopy** emerges above the trees as the surface users interact with.

**Key technologies:**
- **Incremental parsing** — loom framework with O(1) subtree reuse via position-independent CstNodes
- **Projectional editing** — synchronized text and tree views via SyncEditor + ProjNode
- **CRDT collaboration** — eg-walker algorithm with FugueMax sequence CRDT
- **MoonBit** — systems language targeting WebAssembly

## Project Structure

Monorepo with git submodules. Reusable libraries live in their own repositories.

```
canopy/
├── event-graph-walker/   # Core CRDT library (submodule)
├── loom/                 # Incremental parser framework (submodule)
│   ├── loom/             #   Parser framework (dowdiness/loom)
│   ├── seam/             #   Language-agnostic CST (dowdiness/seam)
│   ├── incr/             #   Reactive signals (dowdiness/incr)
│   └── examples/lambda/  #   Lambda calculus parser (dowdiness/lambda)
├── svg-dsl/              # SVG DSL (submodule)
├── graphviz/             # Graphviz DOT renderer (submodule)
├── valtio/               # Valtio state management (submodule)
├── editor/               # Editor abstractions
├── projection/           # Projectional editing (ProjNode, TreeEditorState)
├── cmd/                  # CLI entry points
├── examples/web/         # Web frontend (Vite)
└── examples/demo-react/  # React demo
```

See [Monorepo & Submodule Guide](docs/development/monorepo.md) for the full workflow.

## Getting Started

```sh
git clone --recursive https://github.com/dowdiness/canopy.git
cd canopy
moon test
```

If you already cloned without `--recursive`:

```sh
git submodule update --init --recursive
```

## Building for Web

```sh
moon build --target js
cd examples/web
npm install
npm run dev
```

## Lambda Calculus Grammar

The example language is lambda calculus with arithmetic:

```ebnf
SourceFile   ::= (LetDef Newline)* Expression?
LetDef       ::= 'let' Identifier '=' Expression
Expression   ::= BinaryOp
BinaryOp     ::= Application (('+' | '-') Application)*
Application  ::= Atom+
Atom         ::= Integer | Variable | Lambda | IfThenElse | '(' Expression ')'
Lambda       ::= ('λ' | '\') Identifier '.' Expression
IfThenElse   ::= 'if' Expression 'then' Expression 'else' Expression
```

```
λx.x            -- identity function
(\f.\x.f x) 5   -- application
1 + 2 - 3       -- arithmetic (left-associative)
if x then 1 else 0
let double = λx.x + x
double 5
```

## Testing

```sh
moon test                                        # canopy module
cd event-graph-walker && moon test && cd ..       # CRDT library
cd loom/loom && moon test && cd ../..             # Parser framework
cd loom/seam && moon test && cd ../..             # CST library
cd loom/examples/lambda && moon test && cd ../..  # Lambda parser
```

## Performance

```sh
moon bench --release
cd event-graph-walker && moon bench --release && cd ..
cd loom/examples/lambda && moon bench --release && cd ../..
```

See [docs/performance/](docs/performance/) for detailed results.

## Documentation

- **[docs/](docs/)** — Full documentation index
- **[docs/architecture/](docs/architecture/)** — Architecture docs (Incremental Hylomorphism, Anamorphism Discipline, Projectional Editing)
- **[docs/development/](docs/development/)** — Development workflow and conventions
- **[event-graph-walker/](event-graph-walker/README.md)** — Core CRDT library
- **[loom/](loom/README.md)** — Incremental parser framework

## References

- [Eg-walker paper](https://arxiv.org/abs/2409.14252)
- [MoonBit documentation](https://docs.moonbitlang.com)
