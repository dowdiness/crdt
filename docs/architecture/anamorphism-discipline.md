# Anamorphism Discipline Guide

Actionable design principles for intermediate representations at pipeline boundaries.

Companion to [Incremental Hylomorphism](./Incremental-Hylomorphism.md) (theory). Referenced when designing new boundaries or auditing existing ones.

---

## 1. The Four Laws

These laws apply at boundaries where the intermediate structure will be incrementally reused or where partial results must be consumed by downstream stages. At one-shot or terminal boundaries (batch compiler, final display output), they are guidelines, not requirements.

A good anamorphism produces structure where each part is a complete, context-free, transparent record of a local construction decision, including the decision that construction failed.

### Completeness

The intermediate structure preserves everything any downstream catamorphism could need.

**Test:** Can every downstream consumer be written using only this structure, without reaching back to the original input?

**Violation signal:** A consumer imports or accesses the input source directly instead of going through the intermediate structure.

### Context-Freedom

Each fragment's identity is independent of its position in the larger structure.

**Test:** Can a fragment of this structure be moved to a different position without changing any of its internal data?

**Violation signal:** Absolute positions, parent pointers, or global indices stored inside nodes.

### Uniform Error Representation

Malformed input produces the same kind of structure as well-formed input.

**Test:** Does the construction always produce the output type, with errors represented as values within the structure?

**Violation signal:** A separate error channel (exceptions, `Result` where `Err` means "no structure produced", `Option` where `None` means "parse failed") as the only path, with no recovery alternative that produces partial structure.

A strict/raising convenience wrapper alongside a structure-preserving recovery path is acceptable. The discipline requires that the recovery path exists, not that it is the only path.

### Transparent Structure

The representation's shape is its meaning. No hidden invariants, no internal state that consumers must understand to use the structure correctly.

**Test:** Can a new consumer be written by inspecting the structure's public fields alone, without knowing how it was constructed?

**Violation signal:** Invariants documented in comments rather than enforced by the type, or consumers needing to call methods in a specific order.

### Correspondence to the Asymmetry

Each law addresses one way anamorphisms are harder than catamorphisms:

| Anamorphism difficulty | Law |
|---|---|
| Knowledge split between producer and consumer | Completeness |
| Local input changes cause global structural changes | Context-freedom |
| Construction can fail | Uniform error representation |
| Two axes of polymorphism (source x target) | Transparent structure |

---

## 2. Boundary Audit

### Template

```
Boundary:     [name]
Producer:     [what constructs the structure]
Consumer:     [what folds/interprets the structure]
Intermediate: [the type]

Completeness:     [ ] evidence
Context-freedom:  [ ] evidence
Uniform errors:   [ ] evidence
Transparency:     [ ] evidence

Gaps:
```

### Current State (2026-03-08)

**Boundary ①: CRDT Ops → Text Buffer**

```
Producer:     eg-walker Document (FugueTree + OpLog)
Consumer:     loom lexer/parser
Intermediate: String (document text)

Completeness:     partial — text content complete, but damage information
                  (what changed) is lost. Consumer must rediscover via
                  O(n) text diff (compute_edit).
Context-freedom:  partial — text is inherently positional (characters have
                  absolute indices). Not a problem here because there is
                  no incremental reuse of text fragments.
Uniform errors:   pass — concurrent conflicts resolved deterministically
                  by FugueMax. Never surfaced as errors.
Transparency:     pass — it is a string.

Gaps: No damage region output. Strategy C in 02-reactive-pipeline.md
      would have the CRDT carry edit position directly, eliminating
      the retrospective diff.
```

**Boundary ②: Text → CST (loom)**

```
Producer:     loom lexer + parser with ReuseCursor
Consumer:     SyntaxNode views, Term conversion, display
Intermediate: CstNode { kind: RawKind, children: Array[CstNode], width: Int }

Completeness:     pass — every byte of source represented. Whitespace,
                  comments, error tokens all preserved.
Context-freedom:  pass — relative widths, no absolute positions. Subtrees
                  are pure values. ReuseCursor reuses them at O(1).
Uniform errors:   pass — ErrorNode is a CstNode with a different kind.
                  Same type. parse_cst_recover always produces structure.
Transparency:     pass — kind, children, width. Shape is meaning.

Gaps: none. Reference implementation of the four laws.
```

**Boundary ③: CST → Typed AST (aspirational)**

```
Producer:     semantic analyzer (not yet built)
Consumer:     renderer, completion engine, diagnostics
Intermediate: not yet designed

Completeness:     not designed — name resolution exists as a single-pass
                  fold, not an incremental structure.
Context-freedom:  not designed — no node identity scheme chosen.
                  See design-concerns.md for options (arena, span, hash).
                  Arena-based interning recommended for context-free identity.
Uniform errors:   partial — Term::Error(msg) exists for parse errors.
                  Semantic errors (unbound variables, type mismatches)
                  have no uniform representation yet.
Transparency:     not designed.

Gaps: This boundary needs design. This audit becomes the requirements spec:
      the typed AST must satisfy all four laws for incremental semantic
      analysis to work.
```

**Boundary ④: Typed AST → Display**

```
Producer:     projection layer (DOT renderer, error list builder)
Consumer:     DOM (terminal — no further reuse)
Intermediate: String (DOT/HTML/text)

Completeness:     partial — AST carries enough for current display.
                  No styling or layout metadata.
Context-freedom:  N/A — terminal output, no incremental reuse.
Uniform errors:   pass — error nodes render as entries in the error list,
                  red nodes in the DOT graph.
Transparency:     pass — strings.

Gaps: Full re-render on every change. No incremental rendering.
      Projection module (lenses, tree editor state) exists in MoonBit
      but is not wired to the web frontend.
```

---

## 3. Anti-Patterns

### The Retrospective Diff (completeness violation)

The producer outputs a flat value. The consumer diffs against a cached previous value to discover what changed.

**Where it appears:** Boundary 1 — `compute_edit()` diffs old and new text strings to find the damage region after a CRDT operation.

**Cost:** O(n) on text length per edit instead of O(1) from the operation.

**Fix:** Have the producer carry the change information directly. The CRDT operation already knows what position was affected — surface that information in the intermediate output instead of discarding it and rediscovering it.

### The Position Fixup (context-freedom violation)

The structure stores absolute positions. Moving or reusing a subtree requires recursively updating all positions within it.

**Where it would appear:** If CstNode stored `(start, end)` instead of `width`.

**Cost:** O(subtree size) per reuse instead of O(1). Makes incremental parsing infeasible for large files.

**Prevention:** Store only intrinsic properties (kind, relative width, children). Compute absolute context lazily in a wrapper layer (SyntaxNode computes positions from accumulated widths on traversal).

### The Type Split (uniform error violation)

Success and failure produce different types, forcing every consumer to handle two separate code paths.

**Example:** `parse() → Result[AST, Error]` as the only API, with no way to obtain partial structure on failure.

**Cost:** Error-tolerant operations (display partial AST, offer completions at error site) become impossible. Every consumer must handle the error branch even when it could work with partial structure.

**Prevention:** Make error a variant of the output type, not a separate channel. The construction always produces the output type; errors are values within the structure (ErrorNode in the CST, Error variant in Term). A strict/raising wrapper for convenience is acceptable as long as the recovery path also exists.

### The Construction Protocol (transparency violation)

The structure requires methods to be called in a specific order, or has invariants that are not enforced by the type system.

**Example:** "You must call `finalize()` after building the tree" or "children must be sorted by kind" documented in a comment.

**Cost:** Every new consumer must understand how the structure was built in order to use it correctly. The producer's construction logic leaks into the consumer.

**Prevention:** Make the structure self-describing. If an invariant matters, enforce it in the type (sorted collection type, builder pattern that returns the final type only on completion). If a consumer can misuse the structure by reading its public fields naively, the structure is not transparent.

---

## 4. Design Decision Guide

When designing a new boundary or evaluating a proposed intermediate representation:

**Step 1 — Identify producer and consumer.**
What constructs the structure? What folds or interprets it? Are there multiple consumers?

**Step 2 — Test completeness.**
Can every consumer be written using only this structure? If a consumer needs to access the original input or a sibling boundary's output, the structure is missing information. Add it.

**Step 3 — Assess reuse requirements.**
Will this structure be incrementally reused (updated when input changes partially)? If yes, fragments must be context-free — no absolute positions, no parent pointers, no global indices. If the boundary is batch (one-shot), context-freedom is a guideline, not a requirement.

**Step 4 — Design the failure mode.**
What happens when input is malformed? If the answer is "return an error and no structure," redesign. The construction should always produce the output type, with errors represented as values within the structure. This ensures downstream consumers always receive something to work with.

**Step 5 — Verify transparency.**
Can a new consumer be written by reading the type definition alone? If the consumer needs to understand construction order, call methods in sequence, or respect undocumented invariants, the structure is opaque.

### Complexity Calibration

Not every boundary needs the same investment. Match the solution to the complexity:

| Complexity | Characteristics | Appropriate solution |
|---|---|---|
| Lowest | No polymorphism, no failure | Simple function |
| Low | Fixed schema, no recursion | Dedicated parser |
| Medium | One axis of polymorphism | Intermediate value + projection |
| High | Recursion + failure | Parser combinators with error recovery |
| Highest | Both axes + incremental reuse | Full four-law compliance, dependency tracking |

---

## References

- [Incremental Hylomorphism](./Incremental-Hylomorphism.md) — theoretical foundations
- [Grand Design](../design/GRAND_DESIGN.md) — system architecture and integration plan
- [Design Concerns](../design/design-concerns.md) — open problems (AST node identity)
- [Reactive Pipeline](../design/02-reactive-pipeline.md) — Strategy C for damage propagation
