# AST as Source of Truth: The Incremental Hylomorphism Pipeline

## Overview

This document summarizes the design principles that unify text editing, compilation, and collaborative editing into a single conceptual framework. The central thesis is:

> **Treat the AST as the source of truth. Unify construction from input (anamorphism) and projection to output (catamorphism) as a chain of incremental hylomorphisms.**

This principle provides a foundation for understanding and designing serde-style serialization/deserialization, parsers, incremental computation, CRDTs, and UI rendering within the same theoretical framework.

---

## 1. Fundamental Concepts: Construction and Destruction of Structure

### Catamorphism (Destruction / Fold)

An operation that collapses an existing recursive structure layer by layer according to an algebra `F A → A`.

```
cata : (F A → A) → μF → A
```

It produces an unstructured value from a structured one. Information flows in **one direction**, and the structure's holder possesses all necessary knowledge, making the operation straightforward.

Examples:
- AST → evaluation result
- AST → screen display
- data type → JSON bytes (serialization)

### Anamorphism (Construction / Unfold)

An operation that builds a recursive structure layer by layer from a seed according to a coalgebra `S → F S`.

```
ana : (S → F S) → S → νF
```

It produces a structured value from an unstructured one. Construction involves consuming external information (parsing) and the possibility of failure, making it inherently more complex than catamorphism.

Examples:
- text → AST (parsing)
- JSON bytes → data type (deserialization)
- user actions → internal state

### Hylomorphism (Construct Then Destroy)

A composite operation that builds structure via anamorphism and then tears it down via catamorphism.

```
hylo : (F B → B) → (A → F A) → A → B
        ^^^^^^^^    ^^^^^^^^^^
        algebra      coalgebra
        (cata)       (ana)
```

The intermediate structure μF is theoretically eliminable (deforestation), but in practice it is retained as an intermediate representation for optimization and inspection.

### The Asymmetry: Why Construction Is Harder Than Destruction

| Property | Catamorphism (Destruction) | Anamorphism (Construction) |
|----------|---------------------------|---------------------------|
| Knowledge location | Data type holds all knowledge | Knowledge is split between two parties |
| Failure | Cannot occur | Occurs when input is malformed |
| Polymorphism | One axis (output target) | Two axes (input source × target type) |
| Impact of local changes | Tends to remain local | Can cause global structural changes |

This asymmetry is the root cause of deserialization complexity. A parser (syntactic knowledge of input) and a target type (structural knowledge) are **two independent sources of knowledge** that must be coordinated. Serde's Visitor pattern is the mechanism that realizes this coordination protocol.

---

## 2. Finally Tagless: Unification via Church Encoding

### Serialize as Church Encoding

Church encoding represents a data type as "the function that accepts its fold."

```
Church Nat  = ∀r. (r → r) → r → r
Church List = ∀r. (a → r → r) → r → r
Serialize   = ∀S:SerializerSym. Self → S
```

A `Serialize` implementation declares: "Given any algebra (any `SerializerSym` implementation), I can fold myself using that algebra." The `serialize` method is the data type presenting its own Church encoding.

### SerializerSym: The Data Model as Protocol

```moonbit
trait SerializerSym {
  write_bool(Self, Bool) -> Self
  write_int(Self, Int) -> Self
  write_str(Self, String) -> Self
  seq_begin(Self, Int) -> Self
  seq_elem(Self, Self) -> Self
  seq_end(Self) -> Self
  struct_begin(Self, String, Int) -> Self
  struct_field(Self, String, Self) -> Self
  struct_end(Self) -> Self
}
```

This has the same structure as Finally Tagless's `ExprSym`. Each format (JSON, MsgPack, YAML, ...) provides a different "interpretation" of this trait. By writing directly to the output without going through an intermediate value type `Value`, zero-allocation serialization is achieved.

### Eliminating Deserialize

The complexity of Serde's Visitor arises because the **consumer** of the Church encoding needs an associated type to select the target type.

This complexity can be eliminated entirely by having each format's value type (JsonValue, MsgPackValue, etc.) implement `Serialize`.

```
Serialization:       Point.serialize(json_writer)         -- Point → JSON bytes
Format conversion:   json_value.serialize(msgpack_writer)  -- JSON → MsgPack (no Value needed)
Deserialization:     json_value.serialize(value_builder)   -- JsonValue → Value → Point
```

Only three traits are needed:

```moonbit
trait SerializerSym { ... }  // Protocol (data model)
trait Serialize { ... }      // Self → describe via protocol (Church encoding)
trait FromValue { ... }      // Value → Self (Fixed-Type Projection)
```

The Deserialize trait, Visitor pattern, and MapAccess / SeqAccess all become unnecessary.

---

## 3. The Boundary Pattern: Hylomorphisms at Every System Boundary

```
External Representation₁ ←(ana)→ Internal Representation ←(cata)→ External Representation₂
```

This structure recurs at every system boundary.

| System | Input (ana) | Internal Rep | Output (cata) |
|--------|------------|--------------|---------------|
| Compiler | Source code → AST | IR | IR → Target code |
| serde | JSON bytes → JsonValue | Value / types | types → MsgPack bytes |
| UI (TEA) | User actions → Model | Model | Model → View |
| Editor | Text → AST | AST | AST → Screen display |
| Network | Packets → Message types | Message types | Message types → App logic |

A compiler is not a single hylomorphism but a **chain of hylomorphisms where the functor changes at each stage**.

```
ana₁ → μF₁ → cata₁/ana₂ → μF₂ → cata₂/ana₃ → μF₃ → cata₃
parse    AST    lowering      MIR    codegen       ...
```

---

## 4. The Full Pipeline: loom + incr + CRDT

### Pipeline Diagram

```
  User A's edits                User B's edits
        │                             │
        ▼                             ▼
  ┌───────────┐      sync      ┌───────────┐
  │ CRDT Ops  │◄──────────────►│ CRDT Ops  │
  └─────┬─────┘                └─────┬─────┘
        │ ① fold                     │ ① fold
        ▼                             ▼
  ┌───────────┐                ┌───────────┐
  │ Document  │                │ Document  │
  │  state    │                │  state    │
  └─────┬─────┘                └─────┬─────┘
        │ ② ana (loom)               │ ② ana (loom)
        ▼                             ▼
  ┌───────────┐                ┌───────────┐
  │    AST    │                │    AST    │
  │(holes +   │                │(holes +   │
  │ errors)   │                │ errors)   │
  └─────┬─────┘                └─────┬─────┘
        │ ③ cata (incr)              │ ③ cata (incr)
        ▼                             ▼
  ┌───────────┐                ┌───────────┐
  │  Typed    │                │  Typed    │
  │   AST     │                │   AST     │
  └─────┬─────┘                └─────┬─────┘
        │ ④ cata                     │ ④ cata
        ▼                             ▼
  ┌───────────┐                ┌───────────┐
  │  Screen   │                │  Screen   │
  │  display  │                │  display  │
  └───────────┘                └───────────┘
```

### Responsibilities at Each Boundary

**① CRDT Ops → Document State** (fold)
- Fold the operation sequence to obtain the document's text state
- eg-walker / FugueMax determines the ordering of concurrent insertions
- Output: text buffer + damage region of changes

**② Document State → AST** (anamorphism — loom)
- Tokenize and parse the text to construct an AST
- Error recovery (`expect`, `skip_until`, `skip_until_balanced`) maintains structure even from incomplete input
- Incremental parsing: only re-parse the damage region; reuse unchanged subtrees
- Output: AST that may contain holes and error nodes

**③ AST → Typed AST** (catamorphism — incr)
- Perform semantic analysis: name resolution, type checking, flow analysis
- Track dependencies via an incr/Salsa-style dependency graph for incremental recomputation
- Track cross-tree dependencies (name references, type propagation) that do not follow AST parent-child relationships
- Output: materialized views including type information, diagnostics, completion candidates

**④ Typed AST → Screen Display** (catamorphism)
- Compute syntax highlighting, indentation, error display, etc. from the typed AST
- Use virtual DOM / incremental rendering to redraw only the damage region

### The Role of incr: Memoizing Hylomorphisms

incr **memoizes** the hylomorphism at each boundary. When the input changes partially, only the affected nodes are recomputed.

```
Without incr: 1 char change → re-parse everything → re-typecheck everything → redraw everything
With incr:    1 char change → re-analyze 3 tokens → re-typecheck 2 functions → redraw affected lines
```

This is the same concept as incremental maintenance of materialized views. The AST corresponds to the base table; type information and screen display correspond to materialized views. Updates to the base table propagate incrementally to the views.

---

## 5. Technical Challenges at Each Boundary

### Boundary ①: CRDT → Document State

**Granularity mismatch.** CRDTs operate at the character level, but the parser needs to know "which tokens were affected." A single character change can alter the token type (e.g., `42` → `4.2` changes Int to Float).

**Non-deterministic arrival order.** In CRDTs, the order of operation arrival is not guaranteed. How concurrent edits from multiple users are ordered depends on FugueMax's ordering decisions, and the result can affect tokenization.

**Required solution:** An adapter that converts character-position diffs into token-level damage regions.

### Boundary ②: Document State → Token Stream

**Context-dependent lexer state.** Template literals, heredocs, nested comments, and similar constructs make lexer state depend on surrounding context. A single character change can fundamentally alter the lexer's state machine, potentially affecting all subsequent tokens.

**Required solution:** Retain a lexer state snapshot at each token so that re-tokenization propagation can stop when it reaches "the same state as last time."

### Boundary ③: Token Stream → AST (The Hardest Part)

**Local changes cause global structural impact.** A single character change in the text can fundamentally alter AST parent-child relationships (e.g., deleting the `e` from `else` collapses the entire if-else structure).

**Error recovery stability.** Parse results under error conditions must be stable with respect to user edits. The same error situation must always produce the same recovery strategy (idempotency) to guarantee that unrelated parts of the AST do not fluctuate.

**Construction is inherently less stable than destruction.** In catamorphisms, the impact of local changes tends to remain local. In anamorphisms, a local change to the input can trigger structural changes across the entire tree. This is the core difficulty of incremental parsing.

### Boundary ④: AST → Semantic Analysis

**Dependencies that cross tree structure.** The AST is a tree, but semantic dependencies form a DAG. Type-checking function `foo` may depend on the type of function `bar` — a dependency that has nothing to do with parent-child relationships in the AST.

**Damage propagation through semantics.** Changing one function's signature can invalidate type-checking results in another file. Damage can jump to physically distant locations.

**Required solution:** incr's dependency graph must be built based on name resolution and type dependencies rather than AST parent-child relationships (Salsa's query-based dependency tracking).

### Cross-Boundary Problem: Granularity Mismatch

The "unit of change" differs at each stage.

```
CRDT       → character level
Lexer      → token level
Parser     → AST node level
Type check → symbol / query level
Rendering  → pixel / line level
```

Converting "what changed" at one stage into "what to recompute" at the next stage has its own computational cost. The efficiency of each conversion is critical to completing the entire chain within 16ms.

---

## 6. Extensibility via Finally Tagless

### Representing Errors and Holes

Finally Tagless trait extension allows holes and errors to be added in an open fashion.

```moonbit
// Base language
trait ExprSym {
  lit(Int) -> Self
  add(Self, Self) -> Self
}

// Adding holes — no changes to existing code
trait HoleSym {
  hole(HoleId) -> Self
  error(ErrorInfo, Self) -> Self
}
```

This corresponds to "extending the functor F" in recursion scheme terms. Adding variants to an enum (μF) is a closed operation, but adding traits is an open operation. The Expression Problem solution applies here as well.

### Two-Layer Architecture

When structural observation (optimization, transformation) is needed, combine Finally Tagless with a concrete enum in a two-layer structure.

- **Layer 1 (Abstract):** Finally Tagless traits — extensible syntax definitions
- **Layer 2 (Concrete):** Enum — structural observation, pattern matching, optimization

```moonbit
// Apply optimizations on the concrete AST, then reinterpret through the tagless API
fn replay[T : ExprSym + HoleSym](e : ConcreteAst) -> T { ... }
```

---

## 7. Limits of Recursion Schemes

It is important to recognize what recursion schemes can and cannot capture.

### What They Capture

- **Structural transformation:** Conversion from one representation to another (parsing, code generation, serialization)
- **Structural traversal:** Aggregation and projection over existing structures (evaluation, display, type information extraction)
- **Incremental structural updates:** Incremental computation as memoization of hylomorphisms

### What They Do Not Capture

- **Bidirectional information flow:** When information flows up, down, and sideways through a structure — as in type inference with unification — a separate paradigm of constraint solving is required
- **Integration of causally ordered operations:** CRDT operation integration requires causal graph traversal, not simple folds
- **Reuse across time:** Incremental computation can be framed as memoized hylomorphisms, but the decision of what to reuse and what to invalidate lies outside the recursion scheme framework

### Three Axes of Complexity

Structural construction becomes harder along three independent axes:

1. **More axes of polymorphism:** format × type, plus grammar rules
2. **Bidirectional information flow:** Constraints propagate mutually, as in type inference
3. **Time enters the picture:** Past results must be reused

If only the first axis is involved, a Serde-style Visitor suffices. When the second axis enters, constraint solving is needed. When the third enters, incremental computation is needed. loom + incr addresses axes one and three simultaneously.

---

## 8. Structural Construction Use Cases: From Simple to Complex

| Complexity | Use Case | Polymorphism | Solution Paradigm |
|------------|----------|--------------|-------------------|
| Lowest | Literal parsing (`"42" → Int`) | None | Simple function |
| Low | Fixed-schema parsing (`CSV → Point`) | None | Dedicated parser |
| Medium | Single format × multiple types | Type axis only | Intermediate value + FromValue |
| Medium-High | Multiple formats × multiple types | Both axes | SerializerSym three-stage decomposition |
| High | Recursive AST construction | Both axes + recursion | Parser combinators (loom) |
| High | Type inference | Bidirectional | Constraint solving / unification |
| Highest | CRDT + incremental reconstruction | Both axes + time | Dependency graph tracking (incr) |

---

## 9. Design Decision Guide

### Protocol Design: Trait or Value?

```
Is structural destruction needed?
├─ Yes → Finally Tagless (Church encoding)
│        SerializerSym-style trait for zero allocation
└─ No
   └─ Is structural construction needed?
      ├─ One axis (format fixed OR type fixed)
      │  → Dedicated parser / dedicated FromValue
      └─ Two axes (format × type)
         ├─ Performance critical → Visitor (dual of Church encoding)
         └─ Simplicity critical → Three-stage decomposition via Value
```

### Incrementalization Decision

```
How frequent are changes?
├─ Batch (one-shot processing) → No incrementalization needed; simple hylo
└─ Interactive (must complete within 16ms)
   ├─ Is the impact of changes local?
   │  ├─ Yes → Damage-region-based partial recomputation
   │  └─ No  → incr / Salsa-style dependency graph tracking
   └─ Are there concurrent edits from multiple users?
      ├─ Yes → CRDT + damage propagation
      └─ No  → Single-user incremental computation
```

---

## References

- Meijer, E., Fokkinga, M., & Paterson, R. (1991). *Functional Programming with Bananas, Lenses, Envelopes and Barbed Wire.*
- Carette, J., Kiselyov, O., & Shan, C. (2009). *Finally Tagless, Partially Evaluated.* JFP.
- Omar, C. et al. (2019). *Hazel: A Live Functional Programming Environment with Typed Holes.*
- Arvo, J. et al. (2022). *Grove: A Collaborative Structure Editor.*
- Matklad. (2023). *Resilient LL Parsing Tutorial.*
- Rust Serde documentation. https://serde.rs/
