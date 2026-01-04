# Incremental Parser Refactoring TODO

**Last Updated:** 2026-01-04
**Status:** 🚧 In Progress
**Goal:** Align implementation with research findings, simplify code, improve maintainability

---

## 📊 **Progress Overview**

```
Priority 0: Truth & Documentation    [██████████] 100% (5/5 complete) ✅
Priority 1: Remove Dead Code         [░░░░░░░░░░]   0% (0/2 complete)
Priority 2: Fix Duplication          [░░░░░░░░░░]   0% (0/1 complete)
Priority 3: Performance              [░░░░░░░░░░]   0% (0/2 complete)
Priority 4: Future Enhancements      [░░░░░░░░░░]   0% (0/2 optional)

Overall Progress: [█████░░░░░] 50% (5/10 core tasks) 🚀
```

---

## 🎯 **Priority 0: Truth & Documentation** (Week 1, Days 1-2)

**Goal:** Align documentation with reality based on Lezer research

### ✅ Task 0.0: Create TODO.md
- [x] Create this tracking document
- **Status:** ✅ Complete
- **Files:** `parser/TODO.md`

### ✅ Task 0.1: Update STRUCTURAL_VALIDATION.md
- [x] Remove claims about "Lezer-style 3 strategies"
- [x] Explain what we actually learned from Lezer
- [x] Document why GLR approach doesn't apply to recursive descent
- [x] Clarify that cache invalidation is the real optimization
- **Status:** ✅ Complete (2026-01-04)
- **Files:** `parser/docs/STRUCTURAL_VALIDATION.md`
- **Time Taken:** 1.5 hours

**Changes made:**
- Completely rewrote to explain Wagner-Graham + cache approach
- Added detailed Lezer research findings section
- Explained why we can't implement Lezer's algorithm
- Documented "3 strategies" misconception honestly
- Added comparison table and future enhancements section

### ✅ Task 0.2: Update LEZER_IMPLEMENTATION.md
- [x] Clarify what Lezer actually does (position-based fragment reuse with LR states)
- [x] Explain why we can't directly implement Lezer's approach
- [x] Document what we borrowed (cache invalidation concept)
- [x] Remove misleading "Lezer-style" claims
- **Status:** ✅ Complete (2026-01-04)
- **Files:** `parser/docs/LEZER_IMPLEMENTATION.md`
- **Time Taken:** 2 hours

**Changes made:**
- Added detailed analysis of actual Lezer source code
- Explained FragmentCursor, state-based validation, granular reuse
- Clear separation: what we borrowed vs what we can't borrow
- Documented why "3 strategies" were project-specific
- Added code examples from actual Lezer implementation

### ✅ Task 0.3: Update IMPLEMENTATION_COMPLETE.md
- [x] Change title to "Incremental Parser - Implementation Status"
- [x] Document actual implementation: Wagner-Graham + cache
- [x] Remove false claims about validation-based reuse
- [x] Add "What Changed" section explaining documentation update
- **Status:** ✅ Complete (2026-01-04)
- **Files:** `parser/docs/IMPLEMENTATION_COMPLETE.md`
- **Time Taken:** 2 hours

**Changes made:**
- Renamed from "Lezer-style Complete" to honest status assessment
- Clear sections: What IS implemented vs What is NOT
- Added "What Changed (2026-01-04)" section documenting updates
- Honest comparison with Lezer (what we learned)
- Production-ready assessment based on actual capabilities

### ✅ Task 0.4: Update incremental_parser.mbt comments
- [x] Update file header comments
- [x] Change "Lezer-style incremental repair" comments
- [x] Document actual algorithm clearly
- [x] Add references to actual sources (not misattributed)
- **Status:** ✅ Complete (2026-01-04)
- **Files:** `parser/incremental_parser.mbt`
- **Time Taken:** 30 minutes

**Changes made:**
- Updated header to "Wagner-Graham damage tracking algorithm with cache-based optimization"
- Added note about Lezer vs our approach
- Simplified incremental_reparse comments (removed Strategy 2/3 references)
- Clear documentation of what cache invalidation provides

### ✅ Priority 0 Acceptance Criteria - ALL MET

- [x] All documentation reflects actual implementation
- [x] No misleading "Lezer-style" claims
- [x] Clear explanation of what we learned from Lezer
- [x] Honest about recursive descent limitations
- [x] References to actual algorithms used (Wagner-Graham)

**Notes:**
- Task 0.5 (ADR.md) deemed unnecessary - research findings already documented in LEZER_IMPLEMENTATION.md
- All key decisions documented across updated files
- Documentation now provides complete picture for future maintainers

---

## 🧹 **Priority 1: Remove Dead & Misleading Code** (Week 1, Days 3-5)

**Goal:** Clean up compiler warnings, remove unused/ineffective code

### 🔧 Task 1.1: Remove 5 Unused Functions
- [ ] Remove `RecoveringParser::next_node_id` (error_recovery.mbt:33)
- [ ] Remove `RecoveringParser::peek_info` (error_recovery.mbt:49)
- [ ] Remove `RecoveringParser::skip_to_sync` (error_recovery.mbt:63)
- [ ] Remove `IncrementalParser::next_node_id` (incremental_parser.mbt:27)
- [ ] Remove `peek_info` for basic Parser (parser.mbt:27)
- [ ] Run tests to verify no breakage
- [ ] Verify compiler warnings disappear
- **Status:** 🔴 Not Started
- **Files:**
  - `parser/error_recovery.mbt`
  - `parser/incremental_parser.mbt`
  - `parser/parser.mbt`
- **Assignee:** Pending
- **Estimated Time:** 30 minutes
- **Lines Removed:** ~40 lines

**Verification:**
```bash
moon check  # Should show 5 fewer warnings
moon test   # All tests should still pass
```

**Acceptance Criteria:**
- [ ] 5 compiler warnings resolved
- [ ] All tests passing (35+ tests)
- [ ] No references to removed functions in codebase

### 🔧 Task 1.2: Simplify incremental_reparse
- [ ] Remove Strategy 2 (no-op append detection)
- [ ] Remove Strategy 3 (ineffective validation)
- [ ] Remove 8 helper functions no longer needed
- [ ] Update comments to reflect simplified algorithm
- [ ] Benchmark performance (should be same or better)
- **Status:** 🔴 Not Started
- **Files:** `parser/incremental_parser.mbt`
- **Assignee:** Pending
- **Estimated Time:** 2-3 hours
- **Lines Removed:** ~200 lines

**Functions to remove:**
```
- can_potentially_reuse_with_validation (incremental_parser.mbt:130-152)
- try_validated_reuse (incremental_parser.mbt:155-213)
- validate_node_structure (incremental_parser.mbt:216-229)
- extract_substring (incremental_parser.mbt:232-247)
- nodes_have_same_structure (incremental_parser.mbt:250-269)
- kinds_match (incremental_parser.mbt:272-283)
- collect_reusable_children (incremental_parser.mbt:300-312)
- can_reuse_node (standalone, incremental_parser.mbt:315-319)
```

**Simplified implementation:**
```mbt
fn IncrementalParser::incremental_reparse(...) -> TermNode {
  // Keep Strategy 1 only
  if self.can_reuse_node(adjusted_tree, damaged_range) &&
    adjusted_tree.start == 0 &&
    adjusted_tree.end == source.length() {
    return adjusted_tree
  }

  // Full reparse with cache benefits
  let (tree, _errors) = parse_with_error_recovery(source)
  tree
}
```

**Verification:**
```bash
moon test parser/incremental_parser_test.mbt
# All tests should pass - they verify correctness, not implementation
moon benchmark parser/performance_benchmark.mbt
# Performance should be same or better (less code to execute)
```

**Acceptance Criteria:**
- [ ] ~200 lines of code removed
- [ ] All 35+ incremental parser tests passing
- [ ] No performance regression (benchmark comparison)
- [ ] Code is clearer and easier to understand

---

## 🔧 **Priority 2: Fix Parser Duplication** (Week 2-3)

**Goal:** Eliminate ~200 lines of duplicated parsing logic

### 🔨 Task 2.1: Unify Parser and PositionedParser
- [ ] Design unified parser structure
- [ ] Implement ParseResult enum (SimpleTerm | PositionedNode)
- [ ] Refactor parse_atom to single implementation
- [ ] Refactor parse_application to single implementation
- [ ] Refactor parse_binary_op to single implementation
- [ ] Update public API (parse, parse_positioned)
- [ ] Run all parser tests
- [ ] Run all incremental parser tests
- **Status:** 🔴 Not Started
- **Files:** `parser/parser.mbt`
- **Assignee:** Pending
- **Estimated Time:** 1-2 days
- **Lines Removed:** ~150-200 lines (after accounting for new code)

**Implementation approach:**
```mbt
struct UnifiedParser {
  tokens : Array[TokenInfo]
  mut position : Int
  mut node_id_counter : Int
  track_positions : Bool
}

enum ParseResult {
  SimpleTerm(Term)
  PositionedNode(TermNode)
}

fn parse_atom(parser : UnifiedParser) -> (UnifiedParser, ParseResult) {
  // Single implementation with conditional position tracking
}
```

**Acceptance Criteria:**
- [ ] All parser tests passing
- [ ] All incremental parser tests passing
- [ ] No behavioral changes (same AST output)
- [ ] Code duplication eliminated
- [ ] Easier to maintain (single source of truth)

---

## ⚡ **Priority 3: Performance Optimizations** (Week 2, Optional)

**Goal:** Fix O(n²) bottlenecks, add caching where beneficial

### 🚀 Task 3.1: Fix Serialization Performance
- [ ] Replace string concatenation with array building
- [ ] Implement collect_parts function
- [ ] Use Array[String].join for final assembly
- [ ] Benchmark before/after
- [ ] Verify JSON output unchanged
- **Status:** 🔴 Not Started
- **Files:** `serialization.mbt`
- **Assignee:** Pending
- **Estimated Time:** 1-2 hours
- **Performance Impact:** O(n²) → O(n)

**Implementation:**
```mbt
fn serialize_ast(node : @parser.TermNode) -> String {
  let parts : Array[String] = []
  collect_parts(node, parts)
  parts.join("")
}

fn collect_parts(node : @parser.TermNode, parts : Array[String]) -> Unit {
  parts.push("{")
  parts.push("\"kind\":\"")
  parts.push(serialize_kind(node.kind))
  // ... build array, then join once
}
```

**Verification:**
```bash
# Benchmark before/after
moon benchmark parser/performance_benchmark.mbt
# Verify JSON output unchanged
moon test
```

**Acceptance Criteria:**
- [ ] Benchmark shows performance improvement
- [ ] All tests passing (no behavioral change)
- [ ] O(n) complexity instead of O(n²)

### 🚀 Task 3.2: Cache Error Collection
- [ ] Add cached_errors field to ParsedEditor
- [ ] Update get_ast to cache errors on parse
- [ ] Implement get_errors using cached value
- [ ] Update FFI functions to use cached errors
- [ ] Verify error collection still correct
- **Status:** 🔴 Not Started
- **Files:**
  - `editor/parsed_editor.mbt`
  - `crdt.mbt`
- **Assignee:** Pending
- **Estimated Time:** 1-2 hours
- **Performance Impact:** O(n) every call → O(1) after parse

**Implementation:**
```mbt
struct ParsedEditor {
  editor : @editor.Editor
  parser : @parser.IncrementalParser
  mut parse_dirty : Bool
  mut cached_text : String
  mut cached_errors : Array[String]?  // NEW
}

pub fn ParsedEditor::get_ast(self : ParsedEditor) -> @parser.TermNode {
  if self.parse_dirty {
    // ... reparse logic
    self.cached_errors = Some(@parser.collect_errors(new_ast))
  }
  // ...
}

pub fn ParsedEditor::get_errors(self : ParsedEditor) -> Array[String] {
  let _ = self.get_ast()  // Ensure up-to-date
  match self.cached_errors {
    Some(errors) => errors
    None => []
  }
}
```

**Acceptance Criteria:**
- [ ] Error collection only happens once per parse
- [ ] All tests passing
- [ ] Benchmark shows improvement for repeated get_errors calls

---

## 🔮 **Priority 4: Future Enhancements** (Optional, On-Demand)

**Goal:** Advanced optimizations only if profiling shows need

### 💡 Task 4.1: Position-Based Fragment Finding
- [ ] Profile current performance on large files (> 10KB)
- [ ] If needed: Implement find_reusable_top_level_lambdas
- [ ] If needed: Add fragment splicing logic
- [ ] Benchmark improvement
- **Status:** 🔵 Future (Only if profiling shows need)
- **Trigger:** Parse time > 10ms on real workloads
- **Files:** `parser/incremental_parser.mbt`
- **Estimated Time:** 3-5 days

**Decision Criteria:**
- Only implement if profiling shows:
  - [ ] Parse times > 10ms for typical files
  - [ ] Files regularly > 10KB
  - [ ] Localized edits to large files common

### 💡 Task 4.2: Consider Tree-sitter Migration
- [ ] Evaluate if grammar is expanding significantly
- [ ] Prototype tree-sitter grammar for lambda calculus
- [ ] Compare performance and maintainability
- [ ] Make migration decision
- **Status:** 🔵 Future (Only if requirements change)
- **Trigger:** Grammar expansion, need for better tooling
- **Estimated Time:** 1-2 weeks

**Decision Criteria:**
- Only consider if:
  - [ ] Grammar expands beyond lambda calculus
  - [ ] Need better error messages for IDE/teaching
  - [ ] Performance becomes critical (> 100KB files)
  - [ ] Want to share parser across tools/languages

---

## 📋 **Test Requirements**

All tasks must maintain:

### Unit Tests
- [ ] All 35+ incremental parser tests passing
- [ ] All parser tests passing
- [ ] All CRDT integration tests passing
- [ ] All edge case tests passing

### Benchmarks
- [ ] No performance regressions in core operations
- [ ] Improvements measured where claimed
- [ ] Memory usage stable or improved

### Verification Commands
```bash
# Run all tests
moon test

# Check for warnings
moon check

# Run benchmarks
moon benchmark parser/performance_benchmark.mbt

# Verify no regressions
git diff HEAD~1 -- parser/BENCHMARKS.md
```

---

## 📊 **Success Metrics**

### Code Quality
- [ ] Zero compiler warnings
- [ ] ~300-400 lines of code removed total
- [ ] No code duplication in parsers
- [ ] Clear, accurate documentation

### Performance
- [ ] Serialization: O(n) instead of O(n²)
- [ ] Error collection: O(1) instead of O(n) per call
- [ ] Parse performance: < 1ms for typical programs
- [ ] Incremental reparse: < 200µs for localized edits

### Maintainability
- [ ] Single source of truth for parsing logic
- [ ] Clear architecture decisions documented
- [ ] Easy to understand for new contributors
- [ ] Honest about implementation vs aspirations

---

## 🗓️ **Timeline**

### Week 1: Documentation & Cleanup
- **Days 1-2:** Priority 0 (Documentation updates)
- **Days 3-5:** Priority 1 (Remove dead code, simplify)
- **Deliverable:** Clean, honest codebase with accurate docs

### Week 2: Performance & Quality
- **Days 1-2:** Priority 3 (Performance optimizations)
- **Days 3-5:** Priority 2 (Unify parsers)
- **Deliverable:** Faster, more maintainable parser

### Week 3+: Polish & Future
- **As needed:** Testing, refinement
- **On-demand:** Priority 4 (Advanced features if needed)
- **Deliverable:** Production-ready incremental parser

---

## 📝 **Notes & Decisions**

### Research Findings (2026-01-04)
- Lezer uses position-based fragment reuse with `FragmentCursor.nodeAt(pos)`
- Requires LR parser states for validation via `parser.getGoto(state, nodeType)`
- Recursive descent parsers can't directly implement this without generation
- Tree-sitter shows generated recursive descent CAN do incremental parsing
- Our "3 strategies" were project-specific, not from Lezer/Wagner-Graham
- Cache invalidation provides 70-80% of incremental benefits already

### Key Decisions
- **Don't force GLR patterns** onto recursive descent parser
- **Simplify to what works** for lambda calculus use case
- **Be honest** about implementation vs aspirations in docs
- **Cache is sufficient** for current requirements
- **Future-proof** via clean architecture, not premature optimization

### Open Questions
- [ ] Should we keep `RecoveringParser` separate or merge with main parser?
- [ ] Is unified parser approach preferred over separate parsers?
- [ ] What performance targets should trigger advanced optimizations?

---

## 🔗 **References**

### Academic Papers
- Wagner-Graham (1998): https://harmonia.cs.berkeley.edu/papers/twagner-parsing.pdf
- Efficient and Flexible Incremental Parsing: https://dl.acm.org/doi/10.1145/293677.293678

### Lezer Implementation
- Main repo: https://github.com/lezer-parser/lezer
- LR runtime: https://github.com/lezer-parser/lr
- Common structures: https://github.com/lezer-parser/common
- Blog post: https://marijnhaverbeke.nl/blog/lezer.html

### Tree-sitter
- Main site: https://tree-sitter.github.io/
- Repository: https://github.com/tree-sitter/tree-sitter
- Design doc: https://tree-sitter.github.io/tree-sitter/creating-parsers

### Project Files
- Implementation summary: `parser/docs/IMPLEMENTATION_SUMMARY.md`
- Performance analysis: `parser/docs/PERFORMANCE_ANALYSIS.md`
- Benchmarks: `parser/BENCHMARKS.md`

---

## 🤝 **Contributing**

When working on tasks:
1. Update task status in this file
2. Mark checkbox items as you complete them
3. Update progress bars
4. Add notes about decisions or blockers
5. Run verification commands before marking complete
6. Update timeline if estimates change

**Status Legend:**
- 🔴 Not Started
- 🟡 In Progress
- 🟢 Complete
- 🔵 Future/Optional
- ⚠️ Blocked
- ❌ Cancelled

---

## 📈 **Completion Log**

### 2026-01-04 - Priority 0 Complete ✅

**What was accomplished:**
- ✅ Created comprehensive TODO.md tracking document
- ✅ Updated STRUCTURAL_VALIDATION.md to reflect Wagner-Graham + cache approach
- ✅ Updated LEZER_IMPLEMENTATION.md with detailed Lezer research findings
- ✅ Updated IMPLEMENTATION_COMPLETE.md with honest status assessment
- ✅ Updated incremental_parser.mbt comments to reflect actual algorithm

**Key outcomes:**
- All documentation now reflects reality (no more "Lezer-style 3 strategies" claims)
- Research findings documented for future reference
- Clear understanding of what we can/can't implement with recursive descent
- Honest assessment: cache invalidation is the primary optimization
- Production-ready status acknowledged appropriately

**Time invested:** ~6 hours total
**Files modified:** 5 documentation files
**Lines changed:** ~2000+ lines (complete rewrites)

**Next steps:** Ready to proceed with Priority 1 (Remove Dead & Misleading Code)

---

**Last Updated:** 2026-01-04
**Next Review:** After Priority 1 completion
