# Edge Case Tests for Lezer-style Incremental Parsing

## Overview

Comprehensive edge case test suite to validate the robustness of the Lezer-style incremental parsing implementation.

**Test Results:** 150/150 tests passing (19 new edge case tests added)
**Date:** 2025-12-28

## Test Categories

### 1. Position Boundary Tests

These tests verify correct behavior at critical positions in the document.

#### Insertion at Position 0
```moonbit
test "Edge case: insertion at position 0"
```
**Scenario:** Insert "λx." at the very beginning of "x"
**Expected:** Correctly parses "λx.x" with proper structure
**Validates:** Position adjustment for insertions at document start

#### Insertion at End of Document
```moonbit
test "Edge case: insertion at end of document"
```
**Scenario:** Append " + 1" to "x"
**Expected:** Correctly parses "x + 1"
**Validates:** Position adjustment for insertions at document end

#### Position Boundary at Node Start
```moonbit
test "Edge case: position boundary at node start"
```
**Scenario:** Insert space at inner lambda boundary in "λx.λy.x"
**Expected:** Correctly parses "λx. λy.x"
**Validates:** Boundary condition handling at node start

#### Position Boundary at Node End
```moonbit
test "Edge case: position boundary at node end"
```
**Scenario:** Insert " y" at end of inner lambda in "λx.λy.x"
**Expected:** Correctly parses "λx.λy.x y"
**Validates:** Boundary condition handling at node end

**Critical Bug Prevented:** The boundary fix at [incremental_parser.mbt:335](incremental_parser.mbt#L335) (changing `>=` to `>`) ensures these cases work correctly.

### 2. Structural Change Tests

These tests verify correct handling when the AST structure changes.

#### Leaf to Compound
```moonbit
test "Edge case: structural change from leaf to compound"
```
**Scenario:** "42" → "42 + 1"
**Expected:** Correctly changes from Int node to Bop node
**Validates:** Detection of structural expansion

#### Compound to Leaf
```moonbit
test "Edge case: structural change from compound to leaf"
```
**Scenario:** "x + y" → "z"
**Expected:** Correctly changes from Bop node to Var node
**Validates:** Detection of structural simplification

#### Nested Lambda Insertion
```moonbit
test "Edge case: nested lambda insertion at start"
```
**Scenario:** "λx.x + 1" → "λy.λx.x + 1"
**Expected:** Correctly wraps with outer lambda
**Validates:** Parent structure validation prevents incorrect reuse

#### Operator Precedence Change
```moonbit
test "Edge case: edit that changes operator precedence"
```
**Scenario:** "a + b * c" → "a + b + c"
**Expected:** Correctly handles precedence structure change
**Validates:** Full structural re-evaluation

### 3. Document Modification Tests

These tests verify handling of extreme document changes.

#### Delete Entire Document
```moonbit
test "Edge case: delete entire document"
```
**Scenario:** "x + y" → ""
**Expected:** Handles empty document gracefully
**Validates:** Edge case of total deletion

#### Replace with Longer Text
```moonbit
test "Edge case: replace with longer text"
```
**Scenario:** "x" → "λf.λx.f (f (x))" (1 → 15 chars)
**Expected:** Correctly parses complex replacement
**Validates:** Large positive delta handling

#### Replace with Shorter Text
```moonbit
test "Edge case: replace with shorter text"
```
**Scenario:** "λf.λx.f (f (x))" → "y" (15 → 1 chars)
**Expected:** Correctly parses simple replacement
**Validates:** Large negative delta handling

#### Zero-Length Edit (No-op)
```moonbit
test "Edge case: zero-length edit (no-op)"
```
**Scenario:** Insert 0 characters (no actual change)
**Expected:** Produces identical result
**Validates:** Handling of degenerate edits

### 4. Sequential Edit Tests

These tests verify correct state management across multiple edits.

#### Consecutive Insertions at Same Position
```moonbit
test "Edge case: consecutive insertions at same position"
```
**Scenario:** "x" → "x y" → "x y z"
**Expected:** Each edit builds on previous state correctly
**Validates:** State consistency across edits

#### Multiple Rapid Edits in Sequence
```moonbit
test "Edge case: multiple rapid edits in sequence"
```
**Scenario:** "a" → "a b" → "a b c" → "a b c d"
**Expected:** Final result matches full reparse
**Validates:** Cumulative edit handling

### 5. Token Boundary Tests

These tests verify correct handling of edits at token boundaries.

#### Insertion in Middle of Lambda Parameter
```moonbit
test "Edge case: insertion in middle of lambda parameter"
```
**Scenario:** "λx.x" → "λxy.x" (insert 'y' in middle of parameter)
**Expected:** Correctly parses new parameter name
**Validates:** Token boundary detection

#### Deletion at Boundary Between Nodes
```moonbit
test "Edge case: deletion at boundary between nodes"
```
**Scenario:** "x + y" → "x y" (delete operator)
**Expected:** Correctly parses result (application)
**Validates:** Critical boundary handling

#### Whitespace-Only Insertion
```moonbit
test "Edge case: whitespace-only insertion"
```
**Scenario:** "λx.x" → "λx.x " (append space)
**Expected:** Structure preserved, whitespace handled
**Validates:** Non-structural edits

### 6. Validation Tests

These tests verify the structural validation system.

#### Identical Structure, Different Content
```moonbit
test "Edge case: validation with identical structure but different content"
```
**Scenario:** "λx.x" → "λy.x" (change parameter name)
**Expected:** Correctly parses with new variable name
**Validates:** Content vs. structure distinction

### 7. Error Recovery Tests

These tests verify robust error handling.

#### Insertion Creating Error Node
```moonbit
test "Edge case: insertion that creates error node"
```
**Scenario:** "x" → "x+" (invalid syntax)
**Expected:** Produces tree with error recovery
**Validates:** Error recovery in incremental mode

## Test Coverage Summary

### Position Boundaries
- ✅ Insertion at position 0
- ✅ Insertion at document end
- ✅ Boundary at node start
- ✅ Boundary at node end

### Structural Changes
- ✅ Leaf → Compound transformation
- ✅ Compound → Leaf transformation
- ✅ Nested structure insertion
- ✅ Precedence changes

### Document Modifications
- ✅ Complete deletion
- ✅ Large expansion (1 → 15 chars)
- ✅ Large contraction (15 → 1 chars)
- ✅ Zero-length edit

### Sequential Edits
- ✅ Consecutive insertions
- ✅ Rapid edit sequences

### Token Boundaries
- ✅ Mid-token insertion
- ✅ Inter-token deletion
- ✅ Whitespace handling

### Validation
- ✅ Structure vs. content validation

### Error Recovery
- ✅ Invalid syntax handling

## Critical Edge Cases Discovered

### 1. Position 0 Insertion Boundary Bug

**Issue:** Inserting at position 0 was incorrectly shifting the entire tree instead of marking it as damaged.

**Root Cause:** Condition `tree.start >= edit.old_end` treated position 0 as "after" the edit.

**Fix:** Changed to `tree.start > edit.old_end` at [incremental_parser.mbt:335](incremental_parser.mbt#L335)

**Tests That Caught This:**
- "Edge case: insertion at position 0"
- "Edge case: nested lambda insertion at start"
- "Lezer-style: multiple incremental edits preserve correctness"

### 2. Parent Structure Validation

**Issue:** Even when all children validate, the parent structure might have changed.

**Root Cause:** Initial implementation only validated children, not parent.

**Fix:** Added parent validation in `try_validated_reuse()` at [incremental_parser.mbt:185](incremental_parser.mbt#L185)

**Tests That Caught This:**
- "Edge case: nested lambda insertion at start"
- "Edge case: structural change from leaf to compound"

## Test Statistics

| Category | Tests | Coverage |
|----------|-------|----------|
| **Original Tests** | 131 | Basic incremental parsing |
| **Edge Case Tests** | 19 | Boundary conditions |
| **Total** | **150** | Comprehensive coverage |
| **Pass Rate** | **100%** | All passing |

## Testing Strategy

### Boundary Conditions
1. **Position 0** - Start of document
2. **End of document** - Maximum position
3. **Node boundaries** - Start and end of AST nodes
4. **Token boundaries** - Mid-token, inter-token

### Transformation Types
1. **Structure-preserving** - Whitespace, variable names
2. **Structure-changing** - Type changes, nesting changes
3. **Size changes** - Expansion, contraction, deletion

### Sequential Operations
1. **Single edits** - Isolated changes
2. **Consecutive edits** - Same position
3. **Sequential edits** - Different positions
4. **Rapid sequences** - Multiple quick changes

## Performance Impact

The edge case tests add minimal overhead:
- **Test count:** +14.5% (131 → 150)
- **Test time:** Negligible increase
- **Coverage:** Significantly improved boundary handling

## Recommendations for Future Tests

### Additional Edge Cases to Consider

1. **Unicode Handling**
   - Multi-byte characters
   - Emoji in identifiers
   - Non-ASCII whitespace

2. **Very Large Documents**
   - 10,000+ character documents
   - Deep nesting (50+ levels)
   - Wide trees (100+ children)

3. **Concurrent Edits**
   - Overlapping damage ranges
   - Non-monotonic position sequences

4. **Memory Limits**
   - Cache eviction scenarios
   - Very large cached trees

## Conclusion

The edge case test suite provides comprehensive coverage of boundary conditions, structural changes, and error scenarios. All 150 tests pass, validating the robustness of the Lezer-style incremental parsing implementation.

**Key Achievements:**
- ✅ 100% test pass rate maintained
- ✅ Critical boundary bugs caught and fixed
- ✅ Structural validation verified
- ✅ Error recovery tested
- ✅ Sequential edit handling validated

The implementation is production-ready with comprehensive edge case coverage.
