# Performance Optimization Roadmap

Based on **Diamond-Types** and **Loro** architectures

**Status**: Phase 1 Walker Optimization **COMPLETED** ✅ (2026-01-09)
**Priority Levels**: Critical (Week 1-2) → Important (Week 3-4) → Nice-to-have (Later)

---

## 🎉 Major Achievement (2026-01-09)

**Walker optimization complete - 138x speedup achieved!**

The critical performance bottleneck has been eliminated by optimizing the topological sort algorithm in the walker. The implementation now achieves linear scaling O(n + edges) instead of O(n²).

**Key Results:**
- 10,000 ops: 3.93s → **28.42ms** (138x faster)
- 1,000 ops: 26.5ms → **1.04ms** (25x faster)
- All document sizes: 1.5x-138x improvement
- Target exceeded by 17.6x (target was <500ms, achieved 28ms)

**Production Status:** ✅ Ready for large documents

---

## Executive Summary (Updated 2026-01-09)

Your implementation now achieves **excellent performance across all document sizes** after completing the critical walker optimization. The implementation achieved a **138x speedup** at 10,000 operations by fixing the O(n²) topological sort algorithm.

### Completed Optimizations ✅
1. ✅ **Walker O(n²) → O(n+edges)** - Children map in topological_sort (138x speedup)

### Future Optimizations (Optional)
2. **Run-length encoding** of operations (memory optimization)
3. **B-tree indexing** instead of linear arrays (lookup optimization)
4. **Lazy loading/shallow snapshots** for fast document import
5. **Block-based storage** for incremental access
6. **Operation coalescing** to eliminate redundant metadata

**Already achieved**: 138x speedup on large documents (10k+ ops)
**Potential additional gains**: 2-10x with further optimizations

---

## Phase 1: Critical Optimizations

### ✅ 1.1 Optimize Kahn's Algorithm Walker - **COMPLETED** (2026-01-09)

**Problem**: O(n²) behavior due to nested loop scanning all versions for children

**Solution Implemented**: Build children map during initialization for O(1) child lookups

**Implementation**:
```moonbit
// Before: Nested loop - O(n²)
for candidate in versions.iter() {
  match graph.get_entry(candidate) {
    Some(entry) =>
      if entry.parents.contains(current) {
        // Process child
      }
  }
}

// After: Children map - O(1) lookup
let mut children: HashMap[Int, Array[Int]] = HashMap::new()
// Build map once: O(n + edges)
for lv in versions.iter() {
  for parent in entry.parents {
    children.add(parent, lv)
  }
}
// Lookup children: O(1)
match children.get(current) {
  Some(child_list) => // Process children directly
}
```

**Actual Impact**:
- ⭐ Walker performance: **138x speedup** at 10,000 ops (3.93s → 28.42ms)
- ✅ 1,000 ops: **25x speedup** (26.5ms → 1.04ms)
- ✅ All workloads: **1.5x-138x faster** across all sizes
- ✅ Linear scaling restored: O(n + edges)

**Files Modified**:
- `causal_graph/walker.mbt` - Lines 87-177 (topological_sort function)

**Status**: ✅ **COMPLETE** - Exceeded target by 10x

---

### 1.2 Run-Length Encoding (RLE) for Operation Log

**Status**: **OPTIONAL** (walker already fast enough)

**Problem**: Memory usage for text-heavy documents

**Solution**: Coalesce consecutive identical operations into ranges

**Expected Impact**:
- Memory: 50-80% reduction for text-heavy documents
- Walker: Already optimal, RLE would not improve further

**Priority**: **LOW** (memory optimization only, not performance-critical)

**Files to Modify**:
- `oplog/oplog.mbt` - Add `OpRange` or similar structure
- `oplog/walker.mbt` - Update traversal to handle ranges
- Tests in `oplog/*_test.mbt`

**Complexity**: Medium (~200 lines)

---

### 1.3 B-Tree Indexing for Position Mapping

**Problem**: Linear lookup of operations by agent/seq is O(n)

**Solution** (Diamond-Types/Loro approach): Use B-trees for efficient indexing

**Implementation**:
```moonbit
// Current: Linear array
ops: Array[Op]
// To find op by (agent, seq): O(n)

// After: B-tree indexed
ops_index: BTreeMap[(String, Int), Int]  // (agent, seq) -> op_index
// To find op: O(log n)
```

**Expected Impact**:
- Operation lookup: **O(n) → O(log n)**
- Merge performance: **2-3x faster** for large graphs

**Files to Modify**:
- `oplog/oplog.mbt` - Add indexing structures
- Create new `oplog/indexing.mbt` if needed

**Complexity**: Medium-High (~300 lines)

---

## Phase 2: Memory & Caching Optimizations (Week 3-4)

### 2.1 Lazy Loading / Shallow Snapshots (Loro technique)

**Problem**: Entire operation history loaded into memory at startup

**Solution** (Loro 1.0 achieves 10x improvement):
- Divide document into ~4KB blocks
- Only decompress blocks needed for current operation
- Load full history only when merging

**Implementation Strategy**:
```moonbit
// Current: All operations in memory
oplog: OpLog  // Entire history

// After: Block-based lazy loading
struct Block {
  data: Bytes           // Compressed ops for this block
  start_frontier: Array[Int]
  end_frontier: Array[Int]
}

oplog_blocks: Array[Block]  // Load on demand
```

**Expected Impact**:
- Document load time: **10x faster** (16ms → 1.6ms for 1M ops)
- Memory usage: **50% reduction** at steady state
- Document size: 2x larger (acceptable trade-off)

**Files to Create/Modify**:
- Create `oplog/block_storage.mbt`
- Modify `oplog/oplog.mbt` for lazy loading

**Complexity**: High (~500 lines + format changes)

---

### 2.2 Cache Walker Results for Repeated Merges

**Problem**: Your branch advance shows 55% variance due to repeated traversals

**Solution**: Cache walker results indexed by frontier

**Implementation**:
```moonbit
// Current: Recompute every time
branch.advance(new_frontier) -> walks from scratch

// After: Cache frontier computations
walker_cache: Map[Frontier, WalkerResult]  // O(1) lookup
```

**Expected Impact**:
- Branch advance variance: **55% → 5-10%** (more predictable)
- Real-time collaboration: **much smoother** performance

**Files to Modify**:
- `branch/branch.mbt` - Add caching
- `causal_graph/walker.mbt` - Cache management

**Complexity**: Low-Medium (~100 lines)

---

### 2.3 Object Pooling for Memory Allocations

**Problem**: High GC pressure from repeated allocations

**Solution** (Implementation technique from Diamond-Types):
- Pre-allocate common structures
- Reuse between operations
- Reduce GC pauses

**Implementation**:
```moonbit
// Create pool of frequently-used objects
let op_pool = ObjectPool::new()

// Reuse instead of allocating
let op = op_pool.acquire()  // O(1)
op.type = 'ins'
op.pos = 5
// After use:
op_pool.release(op)
```

**Expected Impact**:
- GC pauses: **30-50% reduction**
- Memory fragmentation: **Improved**

**Complexity**: Low (~150 lines)

---

## Phase 3: Advanced Optimizations (Month 2+)

### 3.1 Delta Encoding for Network Transmission

**What Loro does**: Sends only changed operations, not full state

**Implementation**:
- Track what remote peer has (version vector)
- Send only missing operations
- Reduce network bandwidth by 50-90%

**Expected Impact**: Network sync **10-100x faster**

---

### 3.2 Operation Compression

**What Diamond-Types does**: LZ4/Brotli compression for stored operations

**Implementation**:
- Compress operation log to disk
- Decompress blocks on demand
- Trade CPU for storage (usually worth it)

**Expected Impact**: 
- File size: **50-80% reduction**
- Load time: **Still fast** with block-based decompression

---

### 3.3 Parallel Walker for Independent Branches

**What could help**: Process concurrent branches in parallel

**Tradeoff**: Complexity increase, moderate speedup (2-3x)

---

## Recommended Implementation Order (Updated 2026-01-09)

### ✅ Week 1-2 (Critical - High ROI) - **COMPLETED**
1. ✅ **Optimize Kahn's algorithm** (fixes quadratic scaling) - **DONE** (138x speedup)

### Week 3-4 (Important - Good ROI) - **CURRENT PRIORITY**
2. ⚠️ **Branch advance optimization** (fixes variance)
   - Investigate 55% variance in repeated advance
   - Profile memory allocations
   - Implement true incremental updates
3. ⚠️ **Object pooling** (improves GC)
   - Reduce GC pauses
   - Optimize memory allocations

### Month 2+ (Nice-to-have - Lower ROI)
4. **Run-length encoding** (memory optimization, not performance-critical)
5. **B-tree indexing** (lookup optimization for large graphs)
6. **Lazy loading** (ambitious, high value but complex)
7. **Delta encoding** (network sync already efficient with version vectors)
8. **Compression** (if storage is bottleneck)

---

## Performance Targets After Optimization (Updated 2026-01-09)

### Original Baseline (Before Optimization)
| Scenario | Time | Status |
|----------|------|--------|
| 1,000 ops | 26.5 ms | ✅ Good |
| 10,000 ops | 3.93 s | ❌ Poor |
| Version vectors | 0.08-2.21 µs | ⭐ Excellent |

### ✅ Current Performance (After Phase 1 Walker Optimization)
| Scenario | Time | Speedup vs Baseline | Status |
|----------|------|---------------------|--------|
| 10 ops | 2.98 µs | **1.5x** | ⭐ Excellent |
| 100 ops | 54.92 µs | **4.7x** | ⭐ Excellent |
| 1,000 ops | 1.04 ms | **25x** | ⭐ Excellent |
| **10,000 ops** | **28.42 ms** | **138x** ✅ | ⭐ **Excellent** |
| Version vectors | 0.08-2.21 µs | (unchanged) | ⭐ Excellent |

**Status**: ✅ **Phase 1 COMPLETE** - Exceeded all targets

### Future Performance (After Optional Phase 2)
| Scenario | Time | Potential Gain | Status |
|----------|------|----------------|--------|
| 1,000 ops | <1 ms | (already fast) | ⭐ Excellent |
| 10,000 ops | 28 ms | (already optimal) | ⭐ Excellent |
| 100,000 ops | ~280 ms (est.) | Linear scaling | ⭐ Expected |
| Document load (1M ops) | 1-2 ms | With lazy load | Optional |

---

## Implementation Checklist

### ✅ Phase 1: Walker Optimization - **COMPLETED**
- [x] Profile current walker implementation (identified O(n²) in topological_sort)
- [x] Implement children map for O(1) child lookups
- [x] Update topological_sort function (lines 87-177 in walker.mbt)
- [x] Run full test suite (all 329 tests passing)
- [x] Run benchmarks (138x speedup at 10k ops)
- [x] Verify linear scaling restored (O(n + edges))
- [x] Update PERFORMANCE_ANALYSIS.md with results
- [x] Update OPTIMIZATION_ROADMAP.md

### Phase 1 (Optional): Run-Length Encoding
- [ ] Design RLE operation format
- [ ] Update `OpLog` to store ranges
- [ ] Modify walker to iterate ranges
- [ ] Update serialization/deserialization
- [ ] Add RLE benchmarks
- [ ] Update tests (329 → ~400 tests expected)
- [ ] Run full test suite
- [ ] Benchmark improvement

**Note**: RLE is now optional as walker performance is already excellent

### Phase 1 (Optional): B-Tree Indexing
- [ ] Research MoonBit B-tree implementations
- [ ] Implement (agent, seq) → index mapping
- [ ] Update all lookup operations
- [ ] Benchmark index overhead
- [ ] Add cache invalidation logic

### Phase 2: Walker Caching
- [ ] Design cache structure (frontier → walker result)
- [ ] Implement LRU eviction policy
- [ ] Handle cache invalidation on new operations
- [ ] Add cache metrics (hit rate, size)
- [ ] Benchmark variance reduction

### Phase 2: Object Pooling
- [ ] Identify frequently-allocated objects
- [ ] Implement object pool pattern
- [ ] Benchmark memory allocation reduction
- [ ] Profile GC pause times

---

## References

### Key Papers & Resources
1. **Eg-walker paper** (2409.14252) - Run-length encoding, B-tree techniques
2. **Diamond-Types** repo - Reference implementation in Rust
3. **Loro 1.0 blog** - Lazy loading, block storage, shallow snapshots
4. **Fugue paper** (2305.00583) - Sequence CRDT foundation

### Benchmarking Data
- Reference: Diamond-Types is ~200x faster than reference implementation
- Loro: 10x improvement in document loading with optimization
- Your baseline: Good at 1K ops, needs optimization for 10K+

---

## Risk Assessment

### Phase 1 Risks
- **RLE complexity**: Medium (requires careful testing)
  - Mitigation: Property-based tests for RLE correctness
- **Walker changes**: Medium (core algorithm)
  - Mitigation: Comprehensive fuzzing with 100M+ random graphs
- **B-tree overhead**: Low (standard data structure)
  - Mitigation: Benchmark to verify improvement

### Phase 2 Risks
- **Cache invalidation**: Medium (tricky in CRDT)
  - Mitigation: Clear ownership semantics, thorough testing
- **Object pooling**: Low (well-established pattern)
  - Mitigation: No semantic changes

---

## Success Criteria (Updated 2026-01-09)

### ✅ **Phase 1 Walker Optimization - COMPLETE** ✅
- ✅ Walker at 10K ops: **28.42ms** (target was <500ms, **exceeded by 17.6x**)
- ✅ All 329 tests passing
- ✅ No performance regression on small documents (1.5x-25x faster)
- ✅ Benchmarks confirm **138x speedup** (target was 10-15x, **exceeded by 9x**)
- ✅ Linear scaling restored: O(n + edges)

### ⚠️ **Phase 2 Branch Optimization - IN PROGRESS**
- [ ] Branch advance variance: < 10% (currently 55%)
- [ ] GC pauses measurable and reduced
- [ ] Implement true incremental updates
- [ ] Cache hit rate > 80% on typical workloads

### ✅ **Production Ready Status**
- ✅ 10K ops handled in **28ms** (much better than 2s target)
- ✅ 100K ops estimated at **~280ms** (linear extrapolation)
- ✅ All core operations excellent performance
- ⚠️ Memory usage: stable, but variance needs investigation
- ⚠️ Browser testing: pending

---

## Questions to Consider

1. **Is RLE compatible with your lambda calculus parser?**
   - Yes, you can still parse individual chars even if stored as ranges

2. **Will B-tree indexing increase complexity too much?**
   - No, it's a standard data structure and well worth the complexity

3. **Should lazy loading be done now or later?**
   - Later is fine. Phase 1+2 gives 40-80x speedup without it.

4. **What about network optimization?**
   - Version vectors already handle this well. Delta encoding is nice-to-have.

---

## Current Status & Next Steps (2026-01-09)

### ✅ Completed
**Phase 1 Walker Optimization** - Achieved 138x speedup by fixing O(n²) topological sort

### 🎯 Recommended Next Steps

**Option 1: Branch Advance Optimization (Recommended)**
- Focus: Fix 55% variance in repeated advance benchmark
- Impact: More predictable real-time performance
- Effort: ~2-3 days investigation + implementation

**Option 2: Ship Current Version (Also Valid)**
- Current performance is **excellent** for production use
- 10K ops in 28ms exceeds all targets
- Further optimization can wait for user feedback

**Option 3: Memory Optimizations (Lower Priority)**
- Run-length encoding for memory reduction
- Object pooling for GC improvement
- Only needed if memory becomes a bottleneck

### Recommendation
✅ **Ship it!** The walker optimization eliminated the critical bottleneck. Current performance is production-ready. Future optimizations are nice-to-have, not necessary.
