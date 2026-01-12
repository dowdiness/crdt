# Development Workflow

## Making Changes to MoonBit Code

1. Make your edits
2. Run `moon check` to lint
3. Run `moon test` to verify tests pass
4. If behavior changed intentionally: `moon test --update` to update snapshots
5. Run `moon info` to update `.mbti` interface files
6. Check git diff on `.mbti` files to verify expected changes
7. Run `moon fmt` to format
8. If web interface is affected, rebuild and copy JS files

## Working with the Parser

The parser has extensive documentation in `parser/README.md` and `parser/docs/`. When modifying:

- Check error recovery behavior with malformed input
- Update token/parse caches if lexer changes
- Test incremental parsing with `parser/incremental_parser_test.mbt`
- Benchmark performance with `parser/benchmark.mbt`

## Working with the CRDT

The CRDT implementation is split across two modules:

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

When adding features, consult:
- [EG_WALKER_IMPLEMENTATION.md](../architecture/EG_WALKER_IMPLEMENTATION.md)
- [WALKER_USAGE.md](../architecture/WALKER_USAGE.md)

## Web Development

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

## Git Commit Process

Only create commits when requested by the user. When asked to commit:

1. Run `git status` and `git diff` to see changes
2. Review changes and draft commit message
3. Add relevant files to staging area
4. Create commit with message ending in:
   ```
   Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
   ```
5. Run `git status` after commit to verify

**Important:**
- Never use `git commit --amend` unless user explicitly requests it
- Never push unless explicitly requested
- Never use `-i` flag (interactive mode not supported)

## Pull Request Process

When creating a pull request:

1. Run `git status` and `git diff` to understand changes
2. Check branch divergence from main with `git log`
3. Draft PR summary based on all commits (not just latest)
4. Push to remote with `-u` flag if needed
5. Create PR using `gh pr create` with HEREDOC format
6. Return PR URL

## Common Commands

### Build & Test
```bash
moon build                  # Build all
moon build --target js      # JavaScript build
moon build --target wasm-gc # WebAssembly build

moon test                   # Test crdt module
cd event-graph-walker && moon test  # Test CRDT library
moon test --update          # Update test snapshots
moon coverage analyze > uncovered.log  # Coverage
```

### Formatting & Linting
```bash
moon fmt                    # Format code
moon check                  # Lint code
moon info                   # Update .mbti interfaces
moon info && moon fmt       # Recommended before commit
```

### Benchmarking
```bash
# Always use --release for accurate measurements
moon bench --release
cd event-graph-walker && moon bench --release

# Specific packages
moon bench --package parser --release
cd event-graph-walker
moon bench --package causal_graph --release
moon bench --package branch --release
```

See [benchmarks documentation](../performance/BENCHMARKS.md) for details.
