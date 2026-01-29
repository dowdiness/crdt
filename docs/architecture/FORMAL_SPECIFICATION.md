# Formal Specification: eg-walker CRDT System

> Mathematical specification of the eg-walker collaborative editing system
> implemented in MoonBit. Every law is numbered, mapped to its property test,
> or marked **UNTESTED**.

## 0. Quick Overview (TL;DR)

**What this system is:** A layered CRDT for collaborative text editing. Each
layer provides a narrow, testable contract; higher layers rely on lower-layer
laws rather than re-implementing them.

### 0.1 System Dataflow (Mental Model)

```
User edits
  ↓
TextDoc / Editor
  ↓ emits ops
OpLog  +  CausalGraph
  ↓ topological order (Walker)
Branch / Document (merge/apply)
  ↓ apply inserts/deletes
FugueTree (sequence CRDT)
  ↓ in-order traversal
Visible text
```

### 0.2 Reading Guide (Where to Start)

- **Want the big picture & roles?** Read Sections **0–1**.
- **Want causal ordering & merge correctness?** Read Section **4** and **6**.
- **Want sequence ordering / non-interleaving?** Read Section **5**.
- **Want convergence & sync?** Read Section **7** and Theorems in **9**.

### 0.3 Key Invariants by Layer (One Line Each)

- **RLE / Span:** length + merge + normalization laws (L1.x, I3.x, L3.x).
- **FugueTree:** deterministic ordering + non-interleaving (L5.x).
- **CausalGraph / Walker:** partial order + topological traversal (L4.x).
- **Branch / Document merge:** retreat/advance correctness (L6.x).
- **Text sync / Editor:** convergence + user invariants (L7.x, L8.x).

## 1. Preamble

### 1.1 Purpose and Scope

This document provides a self-contained formal specification of the eg-walker
CRDT system. It covers:

- Element algebra (RLE traits)
- RLE container invariants
- Causal graph and version vectors
- FugueMax sequence CRDT
- eg-walker merge algorithm
- Document convergence
- Editor invariants
- Cross-layer correctness theorems

### 1.2 Notation

| Symbol | Meaning |
|--------|---------|
| `∀` | Universal quantification |
| `∃` | Existential quantification |
| `→` | Implies / maps to |
| `≤` | Less than or equal (partial order) |
| `⊥` | Bottom element (empty / initial) |
| `⊔` | Least upper bound (join) |
| `‖` | Concurrent (incomparable in partial order) |
| `[a, b)` | Half-open interval |
| `|x|` | Length of x |

### 1.3 References

- **eg-walker paper:** [arXiv:2409.14252](https://arxiv.org/abs/2409.14252)
- **Fugue paper:** [arXiv:2305.00583](https://arxiv.org/abs/2305.00583)
- **MoonBit docs:** [docs.moonbitlang.com](https://docs.moonbitlang.com)

### 1.4 Mathematical Entities to MoonBit Types

| Mathematical Entity | MoonBit Type | File |
|---------------------|-------------|------|
| Element with length | `HasCausalLength` trait | `event-graph-walker/rle/traits.mbt` |
| Partial semigroup | `Mergeable` trait | `event-graph-walker/rle/traits.mbt` |
| Sliceable element | `Sliceable` trait | `event-graph-walker/rle/traits.mbt` |
| Normalized sequence | `Runs[T]` | `event-graph-walker/rle/runs.mbt` |
| Cached sequence | `Rle[T]` | `event-graph-walker/rle/rle.mbt` |
| Version vector | `VersionVector` | `event-graph-walker/causal_graph/version_vector.mbt` |
| Causal graph | `CausalGraph` | `event-graph-walker/causal_graph/graph.mbt` |
| Frontier | `Frontier` | `event-graph-walker/causal_graph/graph.mbt` |
| Tree node | `Item` | `event-graph-walker/fugue/item.mbt` |
| Ordered tree | `FugueTree` | `event-graph-walker/fugue/tree.mbt` |
| Document snapshot | `Branch` | `event-graph-walker/branch/branch.mbt` |
| User-facing document | `TextDoc` | `event-graph-walker/text/text_doc.mbt` |
| Editor with cursor | `Editor` | `editor/editor.mbt` |

---

## 1.5 Responsibility Map (Quick Reference)

This diagram shows which layer is responsible for satisfying which laws.
Upper layers rely on the guarantees of lower layers; they do not re-implement them.

```
Editor/TextDoc
  └─ sync + user API
     (L7.x, L8.x)
      |
Branch/Document
  └─ apply/merge orchestration
     (L6.x)
      |
OpLog + CausalGraph + Walker
  └─ causal ordering + topological walk
     (L4.x)
      |
FugueTree
  └─ sequence CRDT ordering + non-interleaving
     (L5.x)
      |
RLE/Span
  └─ element algebra + normalized runs
     (L1.x, I3.x, L3.x)
```

### 1.5.1 Layer-to-Law Mapping

| Layer | Laws it must satisfy | Primary files |
|------|----------------------|---------------|
| RLE / Span | L1.x, I3.x, L3.x | `event-graph-walker/rle/*`, `event-graph-walker/text/span.mbt` |
| FugueTree | L5.x | `event-graph-walker/fugue/item.mbt`, `event-graph-walker/fugue/tree.mbt` |
| CausalGraph + Walker | L4.x | `event-graph-walker/causal_graph/*` |
| Branch / Document merge | L6.x | `event-graph-walker/branch/branch_merge.mbt`, `event-graph-walker/causal_graph/graph.mbt` |
| Text sync | L7.x | `event-graph-walker/text/*` |
| Editor | L8.x | `editor/*` |

### 1.5.2 Delegation Notes

- **Ordering semantics** are owned by FugueTree (L5.x); higher layers treat it as deterministic.
- **Causal ordering** is owned by CausalGraph/Walker (L4.x); Branch applies in walker order.
- **Length/visibility** invariants are owned by RLE/Span (L1.x, I3.x, L3.x).
- **Convergence** (SEC, intention preservation) is a cross-layer consequence of the above.

---

## 2. Element Algebra

**Source:** `event-graph-walker/rle/traits.mbt`, `event-graph-walker/rle/runs_string.mbt`, `event-graph-walker/text/span.mbt`

An **element** `T` is a value equipped with up to four traits:

```
trait Mergeable {
  can_merge(Self, Self) -> Bool
  merge(Self, Self) -> Self
}

trait Sliceable {
  slice(Self, start~ : Int, end~ : Int) -> Self
}

trait HasLength {
  length(Self) -> Int
}

trait HasCausalLength : HasLength {
  causal_len(Self) -> Int    // defaults to length()
  visible_len(Self) -> Int
}
```

Together these form a **partial semigroup with length homomorphism**.
The `merge` operation is partial: it is only defined when `can_merge`
returns `true`.

### Laws

**L1.1 Merge Associativity.**
For all `a, b, c : T` where pairwise merges are defined:

```
merge(merge(a, b), c) == merge(a, merge(b, c))
```

- **Test:** `"property: merge is associative"` in `event-graph-walker/rle/runs_properties_test.mbt:13`
- **Property fn:** `prop_merge_associative` at `event-graph-walker/rle/runs_properties_test.mbt:5`

**L1.2 Causal Length Homomorphism.**
For all mergeable `a, b : T`:

```
causal_len(merge(a, b)) == causal_len(a) + causal_len(b)
```

- **Test:** `"property: Runs len preserved"` in `event-graph-walker/rle/runs_properties_test.mbt:86`
- **Property fn:** `prop_runs_len_preserved` at `event-graph-walker/rle/runs_properties_test.mbt:72`
  (validates sum of pushed items equals total causal length)

**L1.3 Visible Length Homomorphism.**
For all mergeable `a, b : T`:

```
visible_len(merge(a, b)) == visible_len(a) + visible_len(b)
```

- **Test:** `"property: concat preserves total length"` in `event-graph-walker/rle/runs_properties_test.mbt:254`
- **Property fn:** `prop_concat_preserves_len` at `event-graph-walker/rle/runs_properties_test.mbt:243`

**L1.4 Length Bounds.**
For all `x : T`:

```
causal_len(x) >= 0
visible_len(x) >= 0
visible_len(x) <= causal_len(x)
```

- **Test (non-negative):** `"property: causal_len is non-negative"` in `event-graph-walker/rle/runs_properties_test.mbt:42`
- **Property fn:** `prop_causal_len_non_negative` at `event-graph-walker/rle/runs_properties_test.mbt:37`
- **Test (bounded):** `"property: visible_len <= causal_len"` in `event-graph-walker/rle/runs_properties_test.mbt:54`
- **Property fn:** `prop_visible_len_bounded` at `event-graph-walker/rle/runs_properties_test.mbt:48`

**L1.5 Slice Identity.**
For all `x : T`:

```
slice(x, start=0, end=causal_len(x)) == x
```

- **Test:** `"property: full slice equals original"` in `event-graph-walker/rle/runs_properties_test.mbt:66`
- **Property fn:** `prop_full_slice_identity` at `event-graph-walker/rle/runs_properties_test.mbt:60`

**L1.6 Slice/Merge Round-trip.**
For all `x : T` and `0 <= k <= causal_len(x)`:

```
merge(slice(x, start=0, end=k), slice(x, start=k, end=causal_len(x))) == x
```

- **Test:** `"property: slice/merge round-trip"` in `event-graph-walker/rle/runs_properties_test.mbt:31`
- **Property fn:** `prop_slice_merge_roundtrip` at `event-graph-walker/rle/runs_properties_test.mbt:19`

**L1.7 Tombstone Characterization.** **UNTESTED**
An element `t` is a **tombstone** iff:

```
causal_len(t) > 0  AND  visible_len(t) == 0
```

- **Rationale:** Tombstones occupy causal position space but contribute
  no visible content. This is exemplified by `TextSpan` where
  `deleted == true` yields `visible_len == 0`.
- **Tested indirectly:** `"TextSpan HasCausalLength - tombstone"` in `event-graph-walker/text/span_test.mbt:33`

**L1.8 Tombstone Merge Guard.** **UNTESTED**
For elements `a, b : T`:

```
is_tombstone(a) != is_tombstone(b)  ->  can_merge(a, b) == false
```

- **Rationale:** Mixing tombstones with live content would violate the
  visible length homomorphism.
- **Tested indirectly:** `"TextSpan Mergeable - different status cannot merge"` in `event-graph-walker/text/span_test.mbt:50`

---

## 3. RLE Container Invariants

**Source:** `event-graph-walker/rle/runs.mbt`, `event-graph-walker/rle/rle.mbt`

A `Runs[T]` is a normalized sequence of elements `[r_0, r_1, ..., r_{n-1}]`.

### Structural Invariants

**I3.1 No Empty Elements.**
For all `i` in `0..n`:

```
causal_len(r_i) > 0
```

- **Test:** `"invariant: no zero-length runs after append"` in `event-graph-walker/rle/runs_wbtest.mbt:4`

**I3.2 No Adjacent Mergeable.**
For all `i` in `0..n-1`:

```
can_merge(r_i, r_{i+1}) == false
```

- **Test:** `"invariant: no adjacent mergeable runs"` in `event-graph-walker/rle/runs_wbtest.mbt:15`
- **Property test:** `"property: no adjacent mergeable runs"` in `event-graph-walker/rle/runs_properties_test.mbt:192`
- **Property fn:** `prop_no_adjacent_mergeable` at `event-graph-walker/rle/runs_properties_test.mbt:174`

### Laws

**L3.1 Length Preservation.**
For a `Runs[T]` with elements `[r_0, ..., r_{n-1}]`:

```
runs.len() == sum(causal_len(r_i) for i in 0..n)
```

- **Test:** `"property: Runs len preserved"` in `event-graph-walker/rle/runs_properties_test.mbt:86`
- **Property fn:** `prop_runs_len_preserved` at `event-graph-walker/rle/runs_properties_test.mbt:72`

**L3.2 Split/Concat Inverse.**
For all `runs : Runs[T]` and `0 <= k <= runs.len()`:

```
let (left, right) = runs.split(k)
left.concat(right) == runs
```

- **Test:** `"property: split and concat are inverses"` in `event-graph-walker/rle/runs_properties_test.mbt:168`
- **Property fn:** `prop_split_concat_roundtrip` at `event-graph-walker/rle/runs_properties_test.mbt:154`

**L3.3 Split Preserves Total Length.**
For all `runs : Runs[T]` and `0 <= k <= runs.len()`:

```
let (left, right) = runs.split(k)
left.len() + right.len() == runs.len()
```

- **Test:** `"property: split preserves total length"` in `event-graph-walker/rle/runs_properties_test.mbt:106`
- **Property fn:** `prop_split_preserves_len` at `event-graph-walker/rle/runs_properties_test.mbt:92`

**L3.4 Concat Associativity.**
For all `a, b, c : Runs[T]`:

```
a.concat(b).concat(c) == a.concat(b.concat(c))
```

- **Test:** `"property: concat is associative"` in `event-graph-walker/rle/runs_properties_test.mbt:148`
- **Property fn:** `prop_concat_associative` at `event-graph-walker/rle/runs_properties_test.mbt:134`

**L3.5 Extend Equivalence.**
For all `a, b : Runs[T]`:

```
a_copy.extend(b)  // a_copy is a copy of a
a_copy == a.concat(b)
```

- **Test:** `"property: extend equals concat"` in `event-graph-walker/rle/runs_properties_test.mbt:237`
- **Property fn:** `prop_extend_equals_concat` at `event-graph-walker/rle/runs_properties_test.mbt:225`

**L3.6 Concat Preserves Total Length.**
For all `a, b : Runs[T]`:

```
a.concat(b).len() == a.len() + b.len()
```

- **Test:** `"property: concat preserves total length"` in `event-graph-walker/rle/runs_properties_test.mbt:254`
- **Property fn:** `prop_concat_preserves_len` at `event-graph-walker/rle/runs_properties_test.mbt:243`

**L3.7 Range Coverage.**
For all `runs : Runs[T]` and valid `[start, end)`:

```
sum(causal_len(slice_i) for slice_i in runs.range(start, end)) == end - start
```

- **Test:** `"property: range covers exactly the requested range"` in `event-graph-walker/rle/runs_properties_test.mbt:219`
- **Property fn:** `prop_range_coverage` at `event-graph-walker/rle/runs_properties_test.mbt:198`

**L3.8 Find Consistency.**
For all `runs : Runs[T]` and `0 <= pos < runs.len()`:

```
runs.find(pos) == runs.find_fast(prefix_sums, pos)
```

- **Test:** `"property: Rle find matches Runs find"` in `event-graph-walker/rle/runs_properties_test.mbt:128`
- **Property fn:** `prop_rle_find_matches_runs` at `event-graph-walker/rle/runs_properties_test.mbt:112`

---

## 4. Causal Graph and Version Vectors

**Source:** `event-graph-walker/causal_graph/version_vector.mbt`, `event-graph-walker/causal_graph/graph.mbt`, `event-graph-walker/causal_graph/walker.mbt`

### 4.1 Version Vector: Partial Order

A **version vector** `VV : Map[AgentId, Int]` tracks the maximum known
sequence number per agent. The partial order `<=` is defined as:

```
vv1 <= vv2  iff  forall agent: vv1[agent] <= vv2[agent]
```

where `vv[agent] = 0` for agents not in the map.

**L4.1 Reflexivity.**

```
forall vv: vv <= vv
```

- **Test:** `"property: version vector reflexivity (a <= a)"` in `event-graph-walker/causal_graph/version_vector_properties_test.mbt:13`
- **Property fn:** `prop_reflexivity` at `event-graph-walker/causal_graph/version_vector_properties_test.mbt:8`

**L4.2 Transitivity.**

```
forall a, b, c: (a <= b AND b <= c) -> a <= c
```

- **Test:** `"property: version vector transitivity"` in `event-graph-walker/causal_graph/version_vector_properties_test.mbt:32`
- **Property fn:** `prop_transitivity` at `event-graph-walker/causal_graph/version_vector_properties_test.mbt:19`

**L4.3 Antisymmetry.**

```
forall a, b: (a <= b AND b <= a) -> a == b
```

- **Test:** `"property: version vector antisymmetry"` in `event-graph-walker/causal_graph/version_vector_properties_test.mbt:48`
- **Property fn:** `prop_antisymmetry` at `event-graph-walker/causal_graph/version_vector_properties_test.mbt:38`

### 4.2 Version Vector: Join Semilattice

The `merge` operation computes the least upper bound (join):

```
merge(vv1, vv2)[agent] = max(vv1[agent], vv2[agent])
```

**L4.4 Merge Commutativity.**

```
forall a, b: merge(a, b) == merge(b, a)
```

- **Test:** `"property: merge is commutative"` in `event-graph-walker/causal_graph/version_vector_properties_test.mbt:62`
- **Property fn:** `prop_merge_commutative` at `event-graph-walker/causal_graph/version_vector_properties_test.mbt:54`

**L4.5 Merge Idempotence.**

```
forall a: merge(a, a) == a
```

- **Test:** `"property: merge is idempotent"` in `event-graph-walker/causal_graph/version_vector_properties_test.mbt:74`
- **Property fn:** `prop_merge_idempotent` at `event-graph-walker/causal_graph/version_vector_properties_test.mbt:68`

**L4.6 Merge Associativity.**

```
forall a, b, c: merge(merge(a, b), c) == merge(a, merge(b, c))
```

- **Test:** `"property: merge is associative"` in `event-graph-walker/causal_graph/version_vector_properties_test.mbt:90`
- **Property fn:** `prop_merge_associative` at `event-graph-walker/causal_graph/version_vector_properties_test.mbt:80`

**L4.7 Merge Upper Bound.**

```
forall a, b: a <= merge(a, b) AND b <= merge(a, b)
```

- **Test:** `"property: merge preserves or increases versions"` in `event-graph-walker/causal_graph/version_vector_properties_test.mbt:104`
- **Property fn:** `prop_merge_preserves` at `event-graph-walker/causal_graph/version_vector_properties_test.mbt:96`

### 4.3 Concurrency

Two version vectors are **concurrent** when neither dominates:

```
concurrent(a, b) iff NOT(a <= b) AND NOT(b <= a)
```

**L4.8 Concurrent Symmetry.**

```
forall a, b: concurrent(a, b) == concurrent(b, a)
```

- **Test:** `"property: concurrent is symmetric"` in `event-graph-walker/causal_graph/version_vector_properties_test.mbt:116`
- **Property fn:** `prop_concurrent_symmetric` at `event-graph-walker/causal_graph/version_vector_properties_test.mbt:110`

**L4.9 Trichotomy.**

```
forall a, b: (a <= b) OR (b <= a) OR concurrent(a, b)
```

- **Test:** `"property: total order or concurrent"` in `event-graph-walker/causal_graph/version_vector_properties_test.mbt:135`
- **Property fn:** `prop_total_order_or_concurrent` at `event-graph-walker/causal_graph/version_vector_properties_test.mbt:122`

**L4.10 Bottom Element.**

```
forall vv: empty() <= vv
```

- **Test:** `"property: empty is minimal"` in `event-graph-walker/causal_graph/version_vector_properties_test.mbt:147`
- **Property fn:** `prop_empty_is_minimal` at `event-graph-walker/causal_graph/version_vector_properties_test.mbt:141`

**L4.11 Monotone Set.**

```
forall vv, agent, seq:
  seq > vv[agent] -> vv <= vv.set(agent, seq)
```

- **Test:** `"property: set with larger value increases version"` in `event-graph-walker/causal_graph/version_vector_properties_test.mbt:167`
- **Property fn:** `prop_set_increases` at `event-graph-walker/causal_graph/version_vector_properties_test.mbt:153`

**L4.12 Includes Consistency.**

```
forall vv1, vv2:
  (vv1 <= vv2) -> forall (agent, seq) in vv1: vv2.includes(agent, seq)
```

- **Test:** `"property: includes consistent with comparison"` in `event-graph-walker/causal_graph/version_vector_properties_test.mbt:193`
- **Property fn:** `prop_includes_consistent` at `event-graph-walker/causal_graph/version_vector_properties_test.mbt:173`

**L4.13 Equality Symmetry.**

```
forall a, b: (a == b) == (b == a)
```

- **Test:** `"property: equality is symmetric"` in `event-graph-walker/causal_graph/version_vector_properties_test.mbt:228`
- **Property fn:** `prop_equality_symmetric` at `event-graph-walker/causal_graph/version_vector_properties_test.mbt:222`

**L4.14 Equality Transitivity.**

```
forall a, b, c: (a == b AND b == c) -> a == c
```

- **Test:** `"property: equality is transitive"` in `event-graph-walker/causal_graph/version_vector_properties_test.mbt:246`
- **Property fn:** `prop_equality_transitive` at `event-graph-walker/causal_graph/version_vector_properties_test.mbt:234`

### 4.4 Causal Graph Structure

A **CausalGraph** maps logical versions (LV) to graph entries with parent
pointers, agent IDs, sequence numbers, and Lamport timestamps.

**L4.15 Lamport Clock.** **UNTESTED (standalone)**

```
forall entry with parents [p_1, ..., p_k]:
  entry.timestamp == max(p_i.timestamp for i in 1..k) + 1
```

- **Rationale:** Ensures total ordering respects causality.
- **Implemented at:** `event-graph-walker/causal_graph/graph.mbt:76-85`
- **Tested indirectly:** Through walker and merge tests that depend on
  correct timestamp ordering.

**L4.16 Topological Ordering.** **UNTESTED (standalone)**

```
forall lv_i, lv_j in walk_from_frontier(f):
  lv_i appears before lv_j -> NOT(is_ancestor(lv_j, lv_i))
```

- **Rationale:** Walker output respects causal dependencies.
- **Implemented at:** `event-graph-walker/causal_graph/walker.mbt:81-170` (Kahn's algorithm)
- **Tested indirectly:** `"topological sort determinism"` in `event-graph-walker/causal_graph/walker_test.mbt:195`
  and all merge tests depend on correct topological ordering.

---

## 5. FugueMax Sequence CRDT

**Source:** `event-graph-walker/fugue/tree.mbt`, `event-graph-walker/fugue/item.mbt`

### 5.1 Definitions

A **FugueTree** is a rooted ordered tree where each node (`Item`) has:

```
struct Item {
  id        : Int      // Logical version (LV)
  content   : String   // Character(s)
  parent    : Int      // Parent item ID (-1 for root)
  side      : Side     // Left or Right child
  deleted   : Bool     // Tombstone flag
  timestamp : Int      // Lamport timestamp
  agent     : String   // Creating agent
}
```

The **total order** on items is defined by (`event-graph-walker/fugue/item.mbt:42-57`):

```
compare(a, b) =
  1. Compare by timestamp (ascending)
  2. If equal, compare by agent (lexicographic)
  3. If equal, compare by id (ascending)
```

The **find_parent_and_side** algorithm (`event-graph-walker/fugue/tree.mbt:183-206`) determines
tree placement:

```
find_parent_and_side(origin_left, origin_right) =
  if origin_left == -1:          -> (root, Right)
  if origin_right == -1:         -> (origin_left, Right)
  if is_ancestor(origin_left, origin_right):
                                  -> (origin_right, Left)
  else:                           -> (origin_left, Right)
```

The document sequence is produced by **in-order traversal**:
left children (sorted) -> node -> right children (sorted).

### Laws

**L5.1 Insertion Determinism.**
Given the same `(origin_left, origin_right, timestamp, agent)` tuple,
`find_parent_and_side` always produces the same `(parent, side)`.

- **Test:** `"find parent and side at start"` in `event-graph-walker/fugue/tree.mbt:209`
- **Test:** `"find parent and side with origin_left"` in `event-graph-walker/fugue/tree.mbt:217`
- **Test:** `"concurrent inserts ordering with FugueMax"` in `event-graph-walker/fugue/tree_test.mbt:59`

**L5.2 Ancestor Reflexivity.**
For all items `x` in the tree:

```
is_ancestor(x, x) == true
```

- **Test:** `"ancestor check correctness"` in `event-graph-walker/fugue/tree.mbt:163`
  (tests self-ancestry: `inspect(tree.is_ancestor(lv0, lv0), content="true")`)

**L5.3 Ancestor Transitivity.** **UNTESTED (standalone)**

```
forall a, b, c:
  is_ancestor(a, b) AND is_ancestor(b, c) -> is_ancestor(a, c)
```

- **Rationale:** Follows from tree structure (parent pointer traversal).
- **Tested indirectly:** `"ancestor check correctness"` in `event-graph-walker/fugue/tree.mbt:163`
  tests a chain A -> B -> C and verifies `is_ancestor(A, C)`.

**L5.4 Strong List Specification (Insert).**
After `insert(id, content, origin_left, origin_right, ts, agent)`:

```
exists position p in visible sequence:
  visible_items()[p] == (id, Item{content, ...})
```

- **Test:** `"insert single item"` in `event-graph-walker/fugue/tree_test.mbt:10`
- **Test:** `"insert multiple items"` in `event-graph-walker/fugue/tree_test.mbt:18`
- **Test:** `"collaborative editing simulation"` in `event-graph-walker/fugue/tree_test.mbt:221`

**L5.5 Strong List Specification (Delete).**
After `delete(id)`:

```
item[id].deleted == true
visible_count decreases by 1
```

- **Test:** `"delete item"` in `event-graph-walker/fugue/tree_test.mbt:30`
- **Test:** `"delete in concurrent scenario"` in `event-graph-walker/fugue/tree_test.mbt:184`

**L5.6 Maximally Non-Interleaving.** **UNTESTED (standalone property test)**
If user A inserts sequence `[a_1, ..., a_n]` and user B concurrently
inserts `[b_1, ..., b_m]` at the same position, the result contains
A's items contiguously and B's items contiguously (no interleaving).

- **Test (snapshot):** `"fugue property - non-interleaving"` in `event-graph-walker/fugue/tree_test.mbt:255`
  Verifies `"AXXYYB"` (not `"AXYXB"` or `"AYXYB"`).

**L5.7 Deterministic Tie-Breaking.** **UNTESTED (standalone property test)**
For concurrent inserts at the same position with the same timestamp,
ordering is determined by lexicographic agent comparison.

- **Rationale:** Ensures all replicas produce identical sequences.
- **Test (snapshot):** `"reverse timestamp ordering"` in `event-graph-walker/fugue/tree_test.mbt:202`
  Tests ordering by decreasing timestamps.

---

## 6. eg-walker Merge Algorithm

**Source:** `event-graph-walker/branch/branch_merge.mbt`, `event-graph-walker/causal_graph/graph.mbt`

### 6.1 Definitions

The **graph_diff** function (`event-graph-walker/causal_graph/graph.mbt:247-262`) computes:

```
graph_diff(from_frontier, to_frontier) -> (retreat, advance)
where:
  retreat = transitive_closure(from) \ transitive_closure(to)
  advance = transitive_closure(to) \ transitive_closure(from)
```

The **merge procedure** (`event-graph-walker/branch/branch_merge.mbt:124-141`) performs a
three-phase state transition:

```
Phase 1: Retreat  - For each lv in retreat: tree.delete(lv)
Phase 2: Advance  - For each lv in advance (sorted by LV):
                     apply_operation_to_tree(lv)
Result:  Tree state represents target_frontier
```

### Laws

**L6.1 Retreat/Advance Partition.** **UNTESTED (standalone)**

```
forall from_f, to_f:
  let (retreat, advance) = graph_diff(from_f, to_f)
  retreat INTERSECT advance == empty
  retreat UNION advance == symmetric_difference(closure(from_f), closure(to_f))
```

- **Tested indirectly:** `"graph_diff with no overlap"` in `event-graph-walker/causal_graph/graph_test.mbt:70`
  verifies that retreat and advance are disjoint and the common ancestor
  appears in neither.

**L6.2 Coverage.** **UNTESTED (standalone)**

```
forall from_f, to_f:
  let (retreat, advance) = graph_diff(from_f, to_f)
  closure(from_f) \ retreat UNION advance == closure(to_f)
```

- **Rationale:** After retreating `retreat` and advancing `advance`,
  the tree represents exactly `to_f`.

**L6.3 Topological Apply Order.** **UNTESTED (standalone)**

```
Operations in advance are applied in topological (LV) order, ensuring
each operation's dependencies are present when it is applied.
```

- **Implemented at:** `event-graph-walker/branch/branch_merge.mbt:23-91` (sorts by LV)
- **Tested indirectly:** All merge tests depend on correct ordering:
  `"merge_remote_ops - basic concurrent inserts"` in `event-graph-walker/branch/branch_merge_test.mbt:21`
  `"merge_remote_ops - insert and delete"` in `event-graph-walker/branch/branch_merge_test.mbt:84`
  `"merge - simple merge using graph_diff"` in `event-graph-walker/branch/branch_merge_test.mbt:146`

---

## 7. Document Convergence

**Source:** `event-graph-walker/text/text_doc.mbt`, `event-graph-walker/text/sync.mbt`, `event-graph-walker/text/view.mbt`

A `TextDoc` wraps the lower layers into a state-based CRDT with
sync operations.

### Laws

**L7.1 Sync Convergence.**
If documents A and B receive the same set of operations (in any order),
they produce identical text.

```
forall ops:
  let a = TextDoc::new("a"); let b = TextDoc::new("b")
  apply(a, ops); apply(b, ops)
  a.text() == b.text()
```

- **Test:** `"property: sync convergence"` in `event-graph-walker/text/text_properties_test.mbt:108`
- **Property fn:** `prop_sync_convergence` at `event-graph-walker/text/text_properties_test.mbt:88`

**L7.2 Sync Idempotence.**
Applying the same sync message twice has no effect.

```
forall doc, msg:
  doc.sync().apply(msg)
  let text_after_first = doc.text()
  doc.sync().apply(msg)
  doc.text() == text_after_first
```

- **Test:** `"property: sync is idempotent"` in `event-graph-walker/text/text_properties_test.mbt:136`
- **Property fn:** `prop_sync_idempotent` at `event-graph-walker/text/text_properties_test.mbt:114`

**L7.3 Bidirectional Convergence.**
Two documents with different edits converge after exchanging messages.

```
forall edits_a, edits_b:
  let a = TextDoc::new("a"); let b = TextDoc::new("b")
  apply_edits(a, edits_a); apply_edits(b, edits_b)
  let msg_a = a.sync().export_all()
  let msg_b = b.sync().export_all()
  b.sync().apply(msg_a); a.sync().apply(msg_b)
  a.text() == b.text()
```

- **Test:** `"property: bidirectional sync converges"` in `event-graph-walker/text/text_properties_test.mbt:343`
- **Property fn:** `prop_bidirectional_sync_converges` at `event-graph-walker/text/text_properties_test.mbt:319`

**L7.4 Version Monotonicity.**
The version changes after every edit operation.

```
forall doc, edit:
  let v_before = doc.version()
  apply(doc, edit)
  doc.version() != v_before
```

- **Test:** `"property: version changes after edit"` in `event-graph-walker/text/text_properties_test.mbt:156`
- **Property fn:** `prop_version_changes_after_edit` at `event-graph-walker/text/text_properties_test.mbt:142`

**L7.5 Insert Length.**
Each single-character insert increases document length by exactly 1.

```
forall doc, pos, char:
  let len_before = doc.len()
  doc.insert(pos, char)
  doc.len() == len_before + 1
```

- **Test:** `"property: insert increases length"` in `event-graph-walker/text/text_properties_test.mbt:189`
- **Property fn:** `prop_insert_increases_length` at `event-graph-walker/text/text_properties_test.mbt:162`

**L7.6 Delete Length.**
Each delete decreases document length by exactly 1.

```
forall doc (non-empty), pos:
  let len_before = doc.len()
  doc.delete(pos)
  doc.len() == len_before - 1
```

- **Test:** `"property: delete decreases length"` in `event-graph-walker/text/text_properties_test.mbt:225`
- **Property fn:** `prop_delete_decreases_length` at `event-graph-walker/text/text_properties_test.mbt:195`

**L7.7 Checkout Consistency.**
Checking out at a saved version reproduces the text at that version.

```
forall doc:
  apply_edits(doc, edits_1)
  let v = doc.version()
  let text_at_v = doc.text()
  apply_edits(doc, edits_2)
  let view = doc.checkout(v)
  view.text() == text_at_v
```

- **Test:** `"property: checkout preserves text"` in `event-graph-walker/text/text_properties_test.mbt:259`
- **Property fn:** `prop_checkout_preserves_text` at `event-graph-walker/text/text_properties_test.mbt:231`

**L7.8 Empty Document.**
A new document has length zero and is empty.

```
forall agent:
  let doc = TextDoc::new(agent)
  doc.len() == 0 AND doc.is_empty() == true
```

- **Test:** `"property: empty document has length zero"` in `event-graph-walker/text/text_properties_test.mbt:272`
- **Property fn:** `prop_empty_doc_length_zero` at `event-graph-walker/text/text_properties_test.mbt:265`

**L7.9 Position Safety.**
`Pos::at` clamps negative values to zero.

```
forall n < 0: Pos::at(n).value() >= 0
```

- **Test:** `"property: Pos clamps negative values"` in `event-graph-walker/text/text_properties_test.mbt:284`
- **Property fn:** `prop_pos_clamps_negative` at `event-graph-walker/text/text_properties_test.mbt:278`

**L7.10 Version Reflexivity.**
Version equality is reflexive.

```
forall doc: doc.version() == doc.version()
```

- **Test:** `"property: version equality is reflexive"` in `event-graph-walker/text/text_properties_test.mbt:298`
- **Property fn:** `prop_version_reflexive` at `event-graph-walker/text/text_properties_test.mbt:290`

**L7.11 SyncMessage Consistency.**
`is_empty()` and `op_count()` are consistent.

```
forall msg: msg.is_empty() == (msg.op_count() == 0)
```

- **Test:** `"property: SyncMessage is_empty consistent with op_count"` in `event-graph-walker/text/text_properties_test.mbt:313`
- **Property fn:** `prop_sync_message_empty_consistent` at `event-graph-walker/text/text_properties_test.mbt:304`

**L7.12 Export Since Current Is Empty.**
Exporting since the current version produces an empty message.

```
forall doc:
  let msg = doc.sync().export_since(doc.version())
  msg.is_empty() == true
```

- **Test:** `"property: export_since current version is empty"` in `event-graph-walker/text/text_properties_test.mbt:358`
- **Property fn:** `prop_export_since_current_is_empty` at `event-graph-walker/text/text_properties_test.mbt:349`

---

## 8. Editor Invariants

**Source:** `editor/editor.mbt`, `editor/editor_properties_test.mbt`

An `Editor` wraps a `TextDoc` with a cursor position.

### Laws

**L8.1 Cursor Bounds.**
After any operation, the cursor is within valid bounds.

```
forall editor, op:
  apply(editor, op)
  0 <= editor.get_cursor() <= editor.get_text().length()
```

- **Test:** `"property: cursor bounds after insert"` in `editor/editor_properties_test.mbt:27`
- **Test:** `"property: cursor invariant holds after operations"` in `editor/editor_properties_test.mbt:240`

**L8.2 Insert Updates Length.**
Inserting non-empty text increases document length.

```
forall editor, text (non-empty):
  let len_before = editor.get_text().length()
  editor.insert(text)
  editor.get_text().length() == len_before + text.length()
```

- **Test:** `"property: insert updates length correctly"` in `editor/editor_properties_test.mbt:16`

**L8.3 Insert Empty Is No-Op.**
Inserting empty string does not change document.

```
forall editor:
  let text_before = editor.get_text()
  editor.insert("")
  editor.get_text() == text_before
```

- **Test:** `"property: inserting empty string is no-op"` in `editor/editor_properties_test.mbt:41`

**L8.4 Delete on Empty Is Safe.**
Deleting from an empty editor does not crash.

```
forall agent:
  let editor = Editor::new(agent)
  editor.delete()  // returns false, no crash
```

- **Test:** `"property: delete on empty editor is safe"` in `editor/editor_properties_test.mbt:52`

**L8.5 Backspace on Empty Is Safe.**
Backspacing from an empty editor does not crash.

```
forall agent:
  let editor = Editor::new(agent)
  editor.backspace()  // returns false, no crash
```

- **Test:** `"property: backspace on empty editor is safe"` in `editor/editor_properties_test.mbt:61`

**L8.6 Insert Then Delete All Gives Empty.**
Inserting text and deleting all characters returns to empty.

```
forall text:
  let editor = Editor::new(agent)
  editor.insert(text)
  delete_all(editor)
  editor.get_text() == ""
```

- **Test:** `"property: insert then delete all gives empty"` in `editor/editor_properties_test.mbt:70`

**L8.7 Text Length Non-Negative.**
Document length is never negative.

```
forall editor, ops: editor.get_text().length() >= 0
```

- **Test:** `"property: text length is never negative"` in `editor/editor_properties_test.mbt:91`

**L8.8 Cursor Clamp.**
Moving cursor to out-of-bounds position is clamped.

```
forall editor, pos:
  editor.move_cursor(pos)
  0 <= editor.get_cursor() <= editor.get_text().length()
```

- **Test:** `"property: cursor move clamps to bounds"` in `editor/editor_properties_test.mbt:111`

**L8.9 Multiple Inserts Accumulate.**
Multiple inserts accumulate total length.

```
forall texts:
  let editor = Editor::new(agent)
  for text in texts: editor.insert(text)
  editor.get_text().length() == sum(text.length() for text in texts)
```

- **Test:** `"property: multiple inserts accumulate length"` in `editor/editor_properties_test.mbt:145`

**L8.10 Cursor Advances After Insert.**
After inserting text, cursor advances by the inserted length.

```
forall editor, text:
  let cursor_before = editor.get_cursor()
  editor.insert(text)
  editor.get_cursor() == cursor_before + text.length()
```

- **Test:** `"property: cursor advances after insert"` in `editor/editor_properties_test.mbt:160`

**L8.11 Delete Reduces Length by At Most 1.**
Each delete operation reduces length by at most 1.

```
forall editor:
  let len_before = editor.get_text().length()
  editor.delete()
  editor.get_text().length() >= len_before - 1
```

- **Test:** `"property: delete reduces length by at most 1"` in `editor/editor_properties_test.mbt:175`

---

## 9. Cross-Layer Theorems

### Theorem 9.1: Strong Eventual Consistency (SEC)

**Statement.** If two replicas have received the same set of operations
(possibly in different orders), they have identical document state.

**Proof sketch.**

1. By **L7.1** (sync convergence), two `TextDoc` instances receiving the
   same operations produce identical text.
2. Operations are identified by `(agent, seq)` pairs via version vectors.
   By **L4.4-L4.7** (semilattice properties), `merge(vv_A, vv_B)` correctly
   captures the union of known operations.
3. The FugueMax tree (**L5.1**, **L5.4**, **L5.5**) is a deterministic
   function of the operation set: given the same items with the same
   `(origin_left, origin_right, timestamp, agent)` tuples, the tree
   structure and in-order traversal are identical.
4. By **L4.15** (Lamport clock) and **L5.7** (deterministic tie-breaking),
   concurrent operations are resolved identically on all replicas.

**Tested via:** L7.1, L7.2, L7.3 (convergence, idempotence, bidirectional).

### Theorem 9.2: Causal Consistency

**Statement.** If operation `b` causally depends on operation `a`
(i.e., `a` is in the causal past of `b`), then any replica that has
received `b` has also received `a`.

**Proof sketch.**

1. Each operation records its causal parents in the `CausalGraph`
   (**L4.15**, **L4.16**).
2. The `graph_diff` function (**L6.1**, **L6.2**) correctly partitions
   operations into retreat and advance sets.
3. The walker (**L4.16**) applies operations in topological order,
   ensuring dependencies are met before application.
4. The sync protocol (`export_since`, `apply`) transmits complete
   causal histories via frontier-based diffing.

**Tested via:** L4.1-L4.3 (partial order), L4.15-L4.16 (causal ordering),
L6.1-L6.3 (merge correctness).

### Theorem 9.3: Intention Preservation via Non-Interleaving

**Statement.** When two users concurrently type sequences of characters
at the same position, the result preserves each user's sequence
contiguously (no interleaving).

**Proof sketch.**

1. FugueMax's `find_parent_and_side` algorithm (**Section 5.1**) uses
   ancestry checking to determine whether a new item becomes a left
   child of `origin_right` or a right child of `origin_left`.
2. For a sequence typed by user A: `[a_1, a_2, ..., a_n]`, each `a_{i+1}`
   has `origin_left = a_i`, making `a_i` an ancestor of `a_{i+1}`.
3. When user B concurrently inserts at the same position, B's items
   have a different `origin_left` chain, so the ancestry check places
   B's items on the opposite side of the tree.
4. The in-order traversal then outputs A's sequence contiguously
   followed by (or preceded by) B's sequence.

**Tested via:** L5.6 (non-interleaving snapshot test), L5.1 (insertion
determinism), L5.4/L5.5 (strong list spec).

---

## 10. Summary Tables

### 10.1 All Laws with Test Coverage

| Law | Name | Test File | Line | Status |
|-----|------|-----------|------|--------|
| L1.1 | Merge associativity | `event-graph-walker/rle/runs_properties_test.mbt` | 13 | Tested |
| L1.2 | Causal length homomorphism | `event-graph-walker/rle/runs_properties_test.mbt` | 86 | Tested |
| L1.3 | Visible length homomorphism | `event-graph-walker/rle/runs_properties_test.mbt` | 254 | Tested |
| L1.4 | Length bounds | `event-graph-walker/rle/runs_properties_test.mbt` | 42, 54 | Tested |
| L1.5 | Slice identity | `event-graph-walker/rle/runs_properties_test.mbt` | 66 | Tested |
| L1.6 | Slice/merge round-trip | `event-graph-walker/rle/runs_properties_test.mbt` | 31 | Tested |
| L1.7 | Tombstone characterization | `event-graph-walker/text/span_test.mbt` | 33 | Indirect |
| L1.8 | Tombstone merge guard | `event-graph-walker/text/span_test.mbt` | 50 | Indirect |
| I3.1 | No empty elements | `event-graph-walker/rle/runs_wbtest.mbt` | 4 | Tested |
| I3.2 | No adjacent mergeable | `event-graph-walker/rle/runs_properties_test.mbt` | 192 | Tested |
| L3.1 | Length preservation | `event-graph-walker/rle/runs_properties_test.mbt` | 86 | Tested |
| L3.2 | Split/concat inverse | `event-graph-walker/rle/runs_properties_test.mbt` | 168 | Tested |
| L3.3 | Split preserves length | `event-graph-walker/rle/runs_properties_test.mbt` | 106 | Tested |
| L3.4 | Concat associativity | `event-graph-walker/rle/runs_properties_test.mbt` | 148 | Tested |
| L3.5 | Extend equivalence | `event-graph-walker/rle/runs_properties_test.mbt` | 237 | Tested |
| L3.6 | Concat preserves length | `event-graph-walker/rle/runs_properties_test.mbt` | 254 | Tested |
| L3.7 | Range coverage | `event-graph-walker/rle/runs_properties_test.mbt` | 219 | Tested |
| L3.8 | Find consistency | `event-graph-walker/rle/runs_properties_test.mbt` | 128 | Tested |
| L4.1 | Reflexivity | `event-graph-walker/causal_graph/version_vector_properties_test.mbt` | 13 | Tested |
| L4.2 | Transitivity | `event-graph-walker/causal_graph/version_vector_properties_test.mbt` | 32 | Tested |
| L4.3 | Antisymmetry | `event-graph-walker/causal_graph/version_vector_properties_test.mbt` | 48 | Tested |
| L4.4 | Merge commutativity | `event-graph-walker/causal_graph/version_vector_properties_test.mbt` | 62 | Tested |
| L4.5 | Merge idempotence | `event-graph-walker/causal_graph/version_vector_properties_test.mbt` | 74 | Tested |
| L4.6 | Merge associativity | `event-graph-walker/causal_graph/version_vector_properties_test.mbt` | 90 | Tested |
| L4.7 | Merge upper bound | `event-graph-walker/causal_graph/version_vector_properties_test.mbt` | 104 | Tested |
| L4.8 | Concurrent symmetry | `event-graph-walker/causal_graph/version_vector_properties_test.mbt` | 116 | Tested |
| L4.9 | Trichotomy | `event-graph-walker/causal_graph/version_vector_properties_test.mbt` | 135 | Tested |
| L4.10 | Bottom element | `event-graph-walker/causal_graph/version_vector_properties_test.mbt` | 147 | Tested |
| L4.11 | Monotone set | `event-graph-walker/causal_graph/version_vector_properties_test.mbt` | 167 | Tested |
| L4.12 | Includes consistency | `event-graph-walker/causal_graph/version_vector_properties_test.mbt` | 193 | Tested |
| L4.13 | Equality symmetry | `event-graph-walker/causal_graph/version_vector_properties_test.mbt` | 228 | Tested |
| L4.14 | Equality transitivity | `event-graph-walker/causal_graph/version_vector_properties_test.mbt` | 246 | Tested |
| L4.15 | Lamport clock | `event-graph-walker/causal_graph/graph.mbt` | 76 | Untested |
| L4.16 | Topological ordering | `event-graph-walker/causal_graph/walker_test.mbt` | 195 | Indirect |
| L5.1 | Insertion determinism | `event-graph-walker/fugue/tree.mbt` | 209, 217 | Tested |
| L5.2 | Ancestor reflexivity | `event-graph-walker/fugue/tree.mbt` | 163 | Tested |
| L5.3 | Ancestor transitivity | `event-graph-walker/fugue/tree.mbt` | 163 | Indirect |
| L5.4 | Strong list spec (insert) | `event-graph-walker/fugue/tree_test.mbt` | 10, 18, 221 | Tested |
| L5.5 | Strong list spec (delete) | `event-graph-walker/fugue/tree_test.mbt` | 30, 184 | Tested |
| L5.6 | Non-interleaving | `event-graph-walker/fugue/tree_test.mbt` | 255 | Snapshot |
| L5.7 | Deterministic tie-breaking | `event-graph-walker/fugue/tree_test.mbt` | 202 | Snapshot |
| L6.1 | Retreat/advance partition | `event-graph-walker/causal_graph/graph_test.mbt` | 70 | Indirect |
| L6.2 | Coverage | — | — | Untested |
| L6.3 | Topological apply order | `event-graph-walker/branch/branch_merge_test.mbt` | 21, 84, 146 | Indirect |
| L7.1 | Sync convergence | `event-graph-walker/text/text_properties_test.mbt` | 108 | Tested |
| L7.2 | Sync idempotence | `event-graph-walker/text/text_properties_test.mbt` | 136 | Tested |
| L7.3 | Bidirectional convergence | `event-graph-walker/text/text_properties_test.mbt` | 343 | Tested |
| L7.4 | Version monotonicity | `event-graph-walker/text/text_properties_test.mbt` | 156 | Tested |
| L7.5 | Insert length | `event-graph-walker/text/text_properties_test.mbt` | 189 | Tested |
| L7.6 | Delete length | `event-graph-walker/text/text_properties_test.mbt` | 225 | Tested |
| L7.7 | Checkout consistency | `event-graph-walker/text/text_properties_test.mbt` | 259 | Tested |
| L7.8 | Empty document | `event-graph-walker/text/text_properties_test.mbt` | 272 | Tested |
| L7.9 | Position safety | `event-graph-walker/text/text_properties_test.mbt` | 284 | Tested |
| L7.10 | Version reflexivity | `event-graph-walker/text/text_properties_test.mbt` | 298 | Tested |
| L7.11 | SyncMessage consistency | `event-graph-walker/text/text_properties_test.mbt` | 313 | Tested |
| L7.12 | Export since current empty | `event-graph-walker/text/text_properties_test.mbt` | 358 | Tested |
| L8.1 | Cursor bounds | `editor/editor_properties_test.mbt` | 27, 240 | Tested |
| L8.2 | Insert updates length | `editor/editor_properties_test.mbt` | 16 | Tested |
| L8.3 | Insert empty is no-op | `editor/editor_properties_test.mbt` | 41 | Tested |
| L8.4 | Delete on empty safe | `editor/editor_properties_test.mbt` | 52 | Tested |
| L8.5 | Backspace on empty safe | `editor/editor_properties_test.mbt` | 61 | Tested |
| L8.6 | Insert/delete round-trip | `editor/editor_properties_test.mbt` | 70 | Tested |
| L8.7 | Length non-negative | `editor/editor_properties_test.mbt` | 91 | Tested |
| L8.8 | Cursor clamp | `editor/editor_properties_test.mbt` | 111 | Tested |
| L8.9 | Multiple inserts accumulate | `editor/editor_properties_test.mbt` | 145 | Tested |
| L8.10 | Cursor advances after insert | `editor/editor_properties_test.mbt` | 160 | Tested |
| L8.11 | Delete reduces by at most 1 | `editor/editor_properties_test.mbt` | 175 | Tested |

### 10.2 Algebraic Structures

| Structure | Type | Properties | Section |
|-----------|------|------------|---------|
| Partial semigroup | `Mergeable` | Associativity (L1.1) | 2 |
| Length homomorphism | `HasCausalLength` | L1.2, L1.3, L1.4 | 2 |
| Normalized sequence | `Runs[T]` | I3.1, I3.2, L3.1-L3.8 | 3 |
| Partial order | `VersionVector` (<=) | L4.1-L4.3 | 4 |
| Join semilattice | `VersionVector` (merge) | L4.4-L4.7 | 4 |
| Ordered tree | `FugueTree` | L5.1-L5.7 | 5 |
| State-based CRDT | `TextDoc` | L7.1-L7.12 | 7 |

### 10.3 Untested Laws

Laws without standalone property-based tests:

| Law | Name | Reason | Indirect Coverage |
|-----|------|--------|-------------------|
| L1.7 | Tombstone characterization | Domain-specific definition | `event-graph-walker/text/span_test.mbt:33` |
| L1.8 | Tombstone merge guard | Domain-specific constraint | `event-graph-walker/text/span_test.mbt:50` |
| L4.15 | Lamport clock | Structural property of `add_version` | Walker/merge tests |
| L4.16 | Topological ordering | Walker correctness | `event-graph-walker/causal_graph/walker_test.mbt:195` |
| L5.3 | Ancestor transitivity | Structural property of tree | `event-graph-walker/fugue/tree.mbt:163` (chain test) |
| L5.6 | Non-interleaving | Snapshot test only, not QC property | `event-graph-walker/fugue/tree_test.mbt:255` |
| L5.7 | Deterministic tie-breaking | Snapshot test only, not QC property | `event-graph-walker/fugue/tree_test.mbt:202` |
| L6.1 | Retreat/advance partition | No standalone partition test | `event-graph-walker/causal_graph/graph_test.mbt:70` |
| L6.2 | Coverage | No standalone coverage test | Merge integration tests |
| L6.3 | Topological apply order | Tested via merge outcomes | `event-graph-walker/branch/branch_merge_test.mbt` |
