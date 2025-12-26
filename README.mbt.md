# dowdiness/crdt

## Eg-Walker CRDT Editor in MoonBit

An implementation of the eg-walker CRDT algorithm for collaborative text editing, using the FugueMax sequence CRDT and retreat-advance-apply merge strategy.

## Project Status

### ✅ Completed Phases

- **Phase 1: CausalGraph Foundation** - Version tracking and causal dependencies
- **Phase 2: OpLog** - Operation storage with causal metadata
- **Phase 3: FugueMax Tree** - Sequence CRDT with deterministic concurrent insert ordering

### 🚧 Next Steps

- **Phase 4: Merge Algorithm** - Retreat-advance-apply merge implementation
- **Phase 5: Document & Editor** - User-facing API
- **Phase 6: CLI/REPL** - Terminal interface

## Current Status

- **Files**: 11 MoonBit source files
- **Tests**: 18 passing (100%)
- **Modules**: causal_graph ✓, oplog ✓, fugue ✓

## Testing

```bash
moon test --target wasm-gc
```

## References

- [Eg-walker paper](https://arxiv.org/abs/2409.14252)
- [Implementation plan](./EG_WALKER_PLAN.md)