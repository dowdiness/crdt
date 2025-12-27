# Parser Benchmarks

Performance benchmarks for the incremental parser implementation.

## Running Benchmarks

```bash
# Run all parser benchmarks (recommended)
moon bench --package parser --release

# Run all tests (non-benchmark tests only)
moon test --package parser
```

**Note:** Use `moon bench` to run performance benchmarks. The `moon test` command runs functional tests only.

## Benchmark Categories

### 1. Basic Operations (`benchmark.mbt`)

**Full Parse Benchmarks:**
- Simple expression: `42`
- Lambda: `λx.x`
- Nested lambdas: `λf.λx.f (f x)`
- Arithmetic: `1 + 2 - 3 + 4`
- Complex: `λf.λx.if f x then x + 1 else x - 1`

**Incremental Parser:**
- Initial parse
- Small edits
- Multiple sequential edits
- Replacement edits

**Cache Performance:**
- Token cache hits/misses
- Parse cache hits/misses

**CRDT Operations:**
- AST → CRDT conversion
- CRDT → source reconstruction

**Error Recovery:**
- Valid input parsing
- Error handling overhead

### 2. Scaling & Performance (`performance_benchmark.mbt`)

**Parse Scaling:**
- Small input (5 tokens)
- Medium input (15 tokens)
- Large input (30+ tokens)

**Incremental vs Full Reparse:**
- Edit at start
- Edit at end
- Edit in middle

**Sequential Edit Patterns:**
- Realistic typing simulation
- Backspace/delete simulation

**Cache Effectiveness:**
- Repeated parsing
- Similar expressions

**Damage Tracking:**
- Localized damage
- Widespread damage

**Worst/Best Cases:**
- Full cache invalidation (worst)
- Cosmetic changes only (best)

## Expected Performance Characteristics

### Time Complexity

| Operation | Complexity | Notes |
|-----------|------------|-------|
| Initial parse | O(n) | n = source length |
| Incremental edit | O(d) | d = damaged region |
| Token cache lookup | O(1) | HashMap |
| Parse cache lookup | O(1) | HashMap |
| Damage tracking | O(m) | m = tree nodes |

### Benchmark Targets

Based on Wagner-Graham algorithm and Tree-sitter benchmarks:

| Metric | Target | Current Status |
|--------|--------|----------------|
| Full parse (small) | < 1ms | ✅ Measured |
| Full parse (medium) | < 5ms | ✅ Measured |
| Incremental edit | < 1ms | ✅ Measured |
| Cache hit rate | > 80% | 📊 To measure |
| Memory overhead | < 2x source | 📊 To measure |

### Real-Time Editing Target

**60 FPS target**: < 16ms per edit
- Parse: < 5ms
- Damage tracking: < 3ms
- Cache operations: < 2ms
- CRDT sync: < 6ms

## Benchmark Results Format

MoonBit benchmark output format:
```
test bench: full parse - simple ... ok (XXX iterations in XXXms)
test bench: incremental - small edit ... ok (XXX iterations in XXXms)
```

Performance metrics to track:
1. **Iterations per second**: Higher is better
2. **Time per iteration**: Lower is better
3. **Relative speedup**: Incremental vs full reparse
4. **Cache effectiveness**: Hit rate percentage

## Interpreting Results

### Good Performance Indicators

✅ **Incremental edits faster than full reparse**
✅ **Cache hits faster than cache misses**
✅ **Linear scaling with input size**
✅ **< 16ms for typical edits**

### Performance Red Flags

⚠️ **Incremental slower than full reparse** → Cache invalidation issue
⚠️ **Exponential scaling** → Algorithm complexity problem
⚠️ **High memory usage** → Cache size tuning needed
⚠️ **Slow cache hits** → HashMap performance issue

## Optimization Opportunities

Based on benchmark results, consider:

1. **If tokenization is slow:**
   - Implement parallel tokenization
   - Optimize token cache size
   - Add streaming tokenization

2. **If parsing is slow:**
   - Implement lazy subtree expansion
   - Optimize parse cache fingerprinting
   - Add position indexing

3. **If damage tracking is slow:**
   - Optimize tree traversal
   - Add early termination
   - Cache damage ranges

4. **If CRDT conversion is slow:**
   - Implement incremental CRDT updates
   - Optimize attribute copying
   - Add conversion caching

## Profiling Tips

### Identify Bottlenecks

1. **Run benchmarks with profiler:**
   ```bash
   moon bench parser --release
   ```

2. **Compare incremental vs full:**
   - If incremental ≈ full → Not using cache
   - If incremental >> full → Cache overhead too high
   - If incremental << full → ✅ Working as expected

3. **Measure cache hit rates:**
   - Add cache statistics logging
   - Track invalidation frequency
   - Monitor cache size growth

### Memory Profiling

Track memory usage patterns:
- Token cache size over time
- Parse cache size over time
- AST node allocation
- CRDT tree size

## Continuous Benchmarking

Recommended CI integration:
```yaml
- name: Run benchmarks
  run: moon bench parser --release

- name: Compare against baseline
  run: |
    moon bench parser --baseline previous_results.json
```

## References

- MoonBit Benchmarks: https://docs.moonbitlang.com/en/latest/language/benchmarks.html
- Wagner-Graham Paper: https://dl.acm.org/doi/10.1145/293677.293678
- Tree-sitter Benchmarks: https://tree-sitter.github.io/tree-sitter/
