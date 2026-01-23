# Claude Code Quick Reference

Lambda Calculus CRDT Editor - eg-walker implementation in MoonBit

## Project Structure

**Two modules:**
- `event-graph-walker/` - Reusable CRDT library (5 packages, 103 tests)
- `crdt/` - Lambda calculus editor app (3 packages, 226 tests)

**Total:** 329 tests, ~11,600 LOC

## Quick Commands

### Test & Build
```bash
moon test                           # crdt module (226 tests)
cd event-graph-walker && moon test # CRDT library (103 tests)
moon info && moon fmt               # Format & update interfaces
moon check                          # Lint
```

### Web Development
```bash
cd web && npm run dev               # Dev server (localhost:5173)
moon build --target js              # Build for web
cp target/js/release/build/crdt.js web/public/
```

### Benchmarks
```bash
moon bench --release                # Always use --release
cd event-graph-walker && moon bench --release
```

## Documentation

**Main docs:** [docs/](docs/)

- **Architecture:** [docs/architecture/](docs/architecture/)
  - [Module Structure](docs/architecture/modules.md)
  - [eg-walker Algorithm](docs/architecture/EG_WALKER_IMPLEMENTATION.md)
  - [Network Sync](docs/architecture/NETWORK_SYNC.md)

- **Development:** [docs/development/](docs/development/)
  - [Workflow](docs/development/workflow.md)
  - [Conventions](docs/development/conventions.md)
  - [Testing](docs/development/testing.md)
  - [grepai usage](docs/development/grepai.md)

- **Performance:** [docs/performance/](docs/performance/)
  - [Benchmarks](docs/performance/BENCHMARKS.md)
  - [Optimization](docs/performance/OPTIMIZATION_ROADMAP.md)

**Module docs:**
- [event-graph-walker](event-graph-walker/README.md) - CRDT library
- [parser](parser/README.md) - Lambda calculus parser

## Key Facts

**CRDT:** eg-walker algorithm with FugueMax sequence CRDT
**Language:** MoonBit
**Parser:** Lambda calculus with arithmetic (`λx.x`, `1+2`, `if-then-else`)
**Tests:** 329 (103 library + 226 app)
**Modules:** 2 (event-graph-walker library + crdt app)

## Development Workflow

1. Make edits
2. `moon check` - Lint
3. `moon test` - Run tests
4. `moon test --update` - Update snapshots (if behavior changed)
5. `moon info` - Update `.mbti` interfaces
6. Check `git diff *.mbti` - Verify API changes
7. `moon fmt` - Format
8. Rebuild JS if web affected

## MoonBit Conventions

- **Block-style:** Code organized in `///|` separated blocks
- **Testing:** Use `inspect` for snapshots, `@qc` for properties
- **Files:** `*_test.mbt` (blackbox), `*_wbtest.mbt` (whitebox), `*_benchmark.mbt`
- **Format:** Always `moon info && moon fmt` before committing

## Important Notes

- **Character-level ops:** Split multi-char inserts into individual chars
- **Test both modules:** Run tests in both crdt/ and event-graph-walker/
- **Snapshots:** Use `moon test --update` when behavior changes
- **Interfaces:** Check `.mbti` files after refactoring
- **Benchmarks:** Always use `--release` flag

## References

- [eg-walker paper](https://arxiv.org/abs/2409.14252)
- [MoonBit docs](https://docs.moonbitlang.com)
- [Full documentation](docs/)
