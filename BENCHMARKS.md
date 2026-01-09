# Performance Benchmarks for eg-walker CRDT

This document describes the performance benchmarks for the eg-walker CRDT implementation and provides guidance for performance profiling and optimization.

## Running Benchmarks

```bash
# Run all benchmarks
moon bench --release

# Run benchmarks for specific package
moon bench --package causal_graph --release
moon bench --package branch --release
moon bench --package merge --release
moon bench --package oplog --release

# Run specific benchmark test
moon bench --package causal_graph --release -f "walker - linear history"
```

**Important**: Always use `--release` flag for accurate performance measurements!

## Benchmark Categories

### 1. Walker Performance (`causal_graph/walker_benchmark.mbt`)

Tests the event graph walker's ability to traverse operations in topological order.

**Benchmarks:**
- **Linear history**: 10, 100, 1000, 10000 operations
  - *Purpose*: Baseline performance for sequential edits
  - *Optimization target*: Should scale linearly O(n)

- **Concurrent branches**: 2 agents × 50 ops, 5 agents × 20 ops
  - *Purpose*: Multi-agent collaboration performance
  - *Optimization target*: Should handle concurrent branches efficiently

- **Diamond pattern**: 50 merges
  - *Purpose*: Frequent merge performance (common in real-time collaboration)
  - *Optimization target*: Efficient merge point detection

- **Diff operations**: Advance-only, concurrent branches
  - *Purpose*: Incremental sync performance
  - *Optimization target*: Fast diff computation for network sync

**Key Metrics:**
- Throughput: operations/second for walker traversal
- Scalability: performance with increasing operation count
- Merge overhead: cost of handling concurrent branches

**Optimization Opportunities:**
- [ ] Cache topological sort results
- [ ] Incremental diff computation
- [ ] Batch operation processing
- [ ] Parallel walking of independent branches

### 2. Branch Performance (`branch/branch_benchmark.mbt`)

Tests branch checkout and advance operations for document state reconstruction.

**Benchmarks:**
- **Checkout**: 10, 100, 1000 operations
  - *Purpose*: Full document reconstruction performance
  - *Optimization target*: Fast initial load

- **Advance**: 10, 100 new operations
  - *Purpose*: Incremental update performance (critical for real-time editing)
  - *Optimization target*: Should be much faster than full checkout

- **Concurrent branches**: 2 agents concurrent edits
  - *Purpose*: Merge performance
  - *Optimization target*: Efficient handling of conflicts

- **With deletes**: 50% delete rate
  - *Purpose*: Performance with tombstones
  - *Optimization target*: Efficient tombstone handling

- **Repeated advance**: 10 iterations (simulates real-time editing)
  - *Purpose*: Real-world usage pattern
  - *Optimization target*: Consistent performance across iterations

- **to_text conversion**: 100, 1000 characters
  - *Purpose*: Text extraction performance
  - *Optimization target*: Fast UI updates

**Key Metrics:**
- Checkout latency: time to reconstruct document at frontier
- Advance speedup: advance vs full checkout performance ratio
- Text conversion throughput: characters/second

**Optimization Opportunities:**
- [x] Incremental advance (already implemented)
- [ ] Delta encoding for advance
- [ ] Lazy text materialization
- [ ] Character buffer pooling
- [ ] Parallel operation application

### 3. Version Vector Performance (`causal_graph/version_vector_benchmark.mbt`)

Tests version vector operations for efficient frontier representation.

**Benchmarks:**
- **Creation**: 1, 5, 20 agents
  - *Purpose*: Version vector construction cost
  - *Optimization target*: Fast initialization

- **Comparison**: ==, <=, concurrent checks (5, 20 agents)
  - *Purpose*: Network sync decision performance
  - *Optimization target*: O(agents) comparison

- **Merge**: 5, 20 agents
  - *Purpose*: Version vector union performance
  - *Optimization target*: Fast merge for network sync

- **Conversion**: from_frontier, to_frontier, roundtrip
  - *Purpose*: Frontier ↔ version vector conversion cost
  - *Optimization target*: Minimize conversion overhead

- **Includes**: Frequent checks
  - *Purpose*: Operation coverage checks
  - *Optimization target*: O(1) or O(log n) lookup

**Key Metrics:**
- Comparison speed: comparisons/second
- Merge overhead: cost vs naive frontier merge
- Conversion latency: time to convert frontier ↔ version vector

**Optimization Opportunities:**
- [x] Operator overloading for comparisons (already implemented)
- [ ] Sparse representation for many agents
- [ ] Bloom filters for quick includes checks
- [ ] Cached frontier conversions

### 4. Merge Performance (`merge/merge_benchmark.mbt`)

Tests the three-phase retreat-advance-apply merge algorithm.

**Benchmarks:**
- **Concurrent edits**: 2 agents × 10/50/200 ops
  - *Purpose*: Multi-peer collaboration performance
  - *Optimization target*: Fast conflict resolution

- **Many agents**: 5 agents × 20 ops
  - *Purpose*: Scalability with peer count
  - *Optimization target*: Efficient multi-way merge

- **With deletes**: 50 inserts, 25 deletes
  - *Purpose*: Delete operation cost
  - *Optimization target*: Efficient tombstone handling

- **Graph diff merge**: Advance 20 ops
  - *Purpose*: Incremental merge using diff
  - *Optimization target*: Fast forward merge

- **Repeated small merges**: 10 iterations × 5 ops
  - *Purpose*: Real-time collaboration simulation
  - *Optimization target*: Low latency per merge

- **Context operations**: Apply 50 ops
  - *Purpose*: Operation application overhead
  - *Optimization target*: Batch processing efficiency

**Key Metrics:**
- Merge latency: time to merge remote operations
- Throughput: operations merged/second
- Scalability: performance with agent count

**Optimization Opportunities:**
- [ ] Parallel operation application
- [ ] Operation batching
- [ ] Delta compression for network
- [ ] Lazy conflict resolution
- [ ] Smart retreat (avoid unnecessary undo)

### 5. OpLog Performance (`oplog/oplog_benchmark.mbt`)

Tests operation log storage and retrieval performance.

**Benchmarks:**
- **Insert**: 100, 1000, 500 sequential ops
  - *Purpose*: Write throughput
  - *Optimization target*: Fast append-only storage

- **Insert/delete mix**: 50% delete rate
  - *Purpose*: Mixed workload performance
  - *Optimization target*: Efficient delete handling

- **apply_remote**: 50 ops
  - *Purpose*: Network operation ingestion
  - *Optimization target*: Fast remote merge

- **get_op**: Random access from 1000 ops
  - *Purpose*: Lookup performance
  - *Optimization target*: O(1) or O(log n) access

- **get_frontier**: Single agent, 5 agents
  - *Purpose*: Version tracking overhead
  - *Optimization target*: Fast frontier computation

- **walk_and_collect**: 100 ops, concurrent branches
  - *Purpose*: Operation collection for replay
  - *Optimization target*: Efficient traversal

- **diff_and_collect**: Advance 20 ops
  - *Purpose*: Incremental sync
  - *Optimization target*: Fast diff computation

- **walk_filtered**: Filter inserts only
  - *Purpose*: Selective operation replay
  - *Optimization target*: Efficient filtering

- **Random position inserts**: 100 ops
  - *Purpose*: Non-sequential editing
  - *Optimization target*: Maintain fast insert regardless of position

**Key Metrics:**
- Insert throughput: operations/second
- Lookup latency: time to retrieve operation by LV
- Walk throughput: operations traversed/second

**Optimization Opportunities:**
- [ ] Index by agent + sequence for fast lookup
- [ ] Compressed operation storage
- [ ] Memory-mapped oplog for large documents
- [ ] Operation pooling/reuse
- [ ] Lazy operation materialization

## Expected Performance Characteristics

### Scalability Targets

| Component | Small (≤100 ops) | Medium (≤1000 ops) | Large (≤10000 ops) |
|-----------|------------------|--------------------|--------------------|
| Walker | < 1ms | < 10ms | < 100ms |
| Checkout | < 5ms | < 50ms | < 500ms |
| Advance (10 ops) | < 1ms | < 1ms | < 2ms |
| Merge (2 agents) | < 2ms | < 20ms | < 200ms |
| Version Vector Compare | < 0.01ms | < 0.01ms | < 0.01ms |

### Memory Usage Targets

| Component | Per Operation | Per Agent | Notes |
|-----------|---------------|-----------|-------|
| OpLog Entry | ~64 bytes | - | Operation + metadata |
| CausalGraph Entry | ~48 bytes | - | Parents + timestamp |
| FugueTree Node | ~80 bytes | - | Character + tree pointers |
| VersionVector | - | ~40 bytes | Agent ID + sequence |

## Performance Profiling Guide

### 1. Identify Bottlenecks

```bash
# Run benchmarks with detailed output
moon bench --release > benchmark_results.txt

# Look for slow operations (> 10ms for small documents)
grep -A 2 "time:" benchmark_results.txt | grep -E "ms|s"
```

### 2. Profile Specific Operations

```moonbit
// Add timing to critical paths
let start = @time.now()
// ... operation ...
let elapsed = @time.now() - start
println("Operation took: \{elapsed}ms")
```

### 3. Memory Profiling

```bash
# Build with debug symbols
moon build --debug

# Profile with system tools
# valgrind, heaptrack, or platform-specific memory profilers
```

### 4. Benchmark Regressions

```bash
# Run benchmarks before changes
moon bench --release > before.txt

# Make changes...

# Run benchmarks after changes
moon bench --release > after.txt

# Compare results
diff before.txt after.txt
```

## Future Optimization Roadmap

### Phase 1: Low-Hanging Fruit (Current)
- [x] Version vectors for frontier compression
- [x] Incremental branch advance
- [ ] Operation batching in merge
- [ ] Cached topological sorts

### Phase 2: Algorithmic Improvements
- [ ] Delta encoding for network sync
- [ ] Parallel operation application
- [ ] Lazy conflict resolution
- [ ] Smart retreat algorithm

### Phase 3: Data Structure Optimizations
- [ ] Compressed operation storage
- [ ] Memory-mapped oplog for large documents
- [ ] Sparse version vectors
- [ ] Bloom filters for includes checks

### Phase 4: Advanced Optimizations
- [ ] Incremental diff computation
- [ ] SIMD for batch operations
- [ ] Lock-free concurrent data structures
- [ ] GPU acceleration for large merges

## Benchmark Interpretation

### Good Performance Indicators
- ✅ Linear scaling with operation count (O(n))
- ✅ Sub-millisecond version vector comparisons
- ✅ Advance 10x faster than full checkout
- ✅ Constant-time frontier lookups
- ✅ Merge time proportional to delta size, not document size

### Performance Red Flags
- ⚠️ Quadratic scaling (O(n²))
- ⚠️ Merge time proportional to total document size
- ⚠️ Memory growth beyond expected operation count
- ⚠️ Slow version vector operations (> 1ms)
- ⚠️ Checkout slower than 100 ops/ms

## Contributing Benchmarks

When adding new features:

1. **Add benchmark** - Create test in appropriate `*_benchmark.mbt` file
2. **Baseline** - Record performance before optimization
3. **Optimize** - Implement improvements
4. **Validate** - Ensure performance improves without breaking tests
5. **Document** - Update this file with results and insights

**Benchmark Naming Convention:**
```moonbit
test "component - operation (size)" (b : @bench.T) {
  // e.g., "walker - linear history (1000 ops)"
}
```

## References

- [MoonBit Benchmark Documentation](https://docs.moonbitlang.com)
- [Eg-walker Paper](https://arxiv.org/abs/2409.14252) - Performance characteristics
- [Performance Testing Best Practices](https://github.com/moonbitlang/moonbit-docs)

---

**Last Updated**: 2026-01-09
**Total Benchmarks**: 60+ across 5 modules
**Status**: Ready for profiling and optimization
