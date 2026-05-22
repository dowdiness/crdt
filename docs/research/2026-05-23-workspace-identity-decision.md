# Workspace Identity Probe — Decision Record

**Date:** 2026-05-23  
**Branch:** `worktree-research-from-main`  
**Probe package:** `workspace/probe/identity_probe_wbtest.mbt`  
**Research basis:** `docs/research/2026-05-22-spec-aware-workspace.md` §3.2, §3.5, Appendix B P0a #3, Appendix C #8–9

---

## Three Questions

### Q1 — Is (DocumentId, ReplicaId) separation required?

**Answer: YES. Single `agent_id` is unsafe for multi-document workspace.**

Evidence from three orthogonal failure modes when two editors share `agent_id = "shared_agent"`:

| Assertion | Failure mode | Code path |
|-----------|-------------|-----------|
| A1 | Transport broadcast skipped — B never receives A's messages | `InMemoryRoom::broadcast` skips sender's slot by `peer_id` equality |
| A2 | CRDT op dedup — A's seq-0 ops silently dropped when applied to B | `oplog.mbt:327-330` `raw_to_lv` dedup |
| A3 | Presence collision — last writer wins, only 1 slot per `wire_peer_id` | `EphemeralHub` keyed on `wire_peer_id = hash(agent_id)` |

All three failures are structural — they cannot be worked around without adding a separate per-document identity axis. The minimum safe model is `agent_id = doc_id + ":" + replica_id`.

### Q2 — Are two identity axes (DocumentId, ReplicaId) enough?

**Answer: NO. Two axes suffice ONLY for same-variant divergence; mixed-variant divergence breaks `(doc_id, node_id)` identity across replicas.**

Evidence from Part B assertions:

| Assertion | Finding |
|-----------|---------|
| B1 | After A→B sync from a common base, NodeId sets are identical on both replicas. Two axes suffice for the no-divergence case. |
| B1' | Divergent SAME-VARIANT edits (both replicas insert `Number` elements) converge to IDENTICAL `NodeId → JsonValue` maps on both replicas (`kind_mismatches = 0`, verified by byte-identical diagnostic snapshot). |
| B1'' | Divergent MIXED-VARIANT edits (A inserts `String`, B inserts `Bool` at the same cursor) **diverge**: `kind_mismatches = 2`. NodeIds 5 and 10 are *swapped* between replicas (A: 5=String, 10=Bool; B: 5=Bool, 10=String). |
| B2 | Standard multi-session convergence passes (text only — does not address NodeId identity). |

**B1' / B1'' juxtaposed.** B1' is a null finding that depends on a structural symmetry: when both replicas' old trees contain children of the SAME variant in matching positions, the right-biased LCS in `reconcile_children` (`core/reconcile.mbt`) preserves NodeIds symmetrically. The moment that symmetry breaks — and any mixed-variant divergence breaks it — each replica's old NodeId stays attached to the position its LOCAL old variant matched, leaving the *same logical post-merge node* with different NodeIds on each replica.

**Implication for Q2.** The workspace's `NodeIdQ { doc_id, node_id }` design assumes `(doc_id, n)` refers to the same logical node across replicas. B1'' refutes this for the realistic mixed-variant case. A third identity axis is required — concretely:

- **Option a (Grove-level structural identity):** mint a content-/position-stable identity per logical node, separate from the per-editor counter. Costly but principled.
- **Option b (reconciliation-aware id scheme):** seed the per-editor counter from a canonical traversal of the post-merge tree, so all replicas mint identical NodeIds regardless of intermediate divergence. Cheaper but fragile under further edits.
- **Option c (don't claim cross-replica identity):** scope `NodeIdQ` to *local* references only; require a separate cross-replica anchor mechanism (e.g. text-position-based) for any cross-document link the workspace exposes to users.

**What B1'' did NOT test (named follow-ups, not blockers for the Q2 verdict above):**
- Asymmetric insertion positions (A inserts at start, B at end of array)
- Nested-array divergence (edits within a sub-array, both replicas mutate the same parent)
- Delete + insert combinations (one replica deletes a node the other replica modifies)

These cases can produce additional failure modes (e.g. divergence of structural NodeIds for the array itself, not just leaf children). Promote to P0a gate #4 alongside the option-a/b/c decision before any production workspace work.

### Q3 — What shape should DocumentId take?

**Answer: String; shape is irrelevant to current code paths.**

Evidence from Part C assertions:

| Assertion | Doc ID shape tested | Result |
|-----------|--------------------|-|
| C_uuid | `550e8400-e29b-41d4-a716-446655440000` | Accepted, text roundtrips correctly |
| C_hash | `sha256:abc123` | Accepted |
| C_path | `file:///workspace/doc.json` | Accepted |

The CRDT, transport, and presence layers treat `agent_id` as an opaque string. No current code path inspects the shape of the string. The workspace implementation can choose any stable string scheme — UUID, content hash, or path-derived — and the editor layer will accept it.

**Recommendation:** Use a simple scheme for now (e.g. `"<doc_path>:<replica_uuid>"`) and avoid over-engineering until the workspace concept is stable.

---

## Summary Table

| Question | Verdict | Confidence |
|----------|---------|------------|
| Q1: Separation required? | Yes — three independent failure modes | High (A1/A2/A3 all pass) |
| Q2: Two axes enough? | **No.** Two axes break under mixed-variant divergence (B1''). A third identity axis is required for cross-replica `NodeIdQ` references. | High (B1' null finding + B1'' positive divergence, byte-snapshot verified) |
| Q3: DocumentId shape? | Opaque string; any stable scheme works at the editor layer. (Persistence shape choice deferred to Phase 2.) | Medium (C×3 in-memory pass; serialization not exercised) |

---

## Assertion Verdicts

| ID | Test name | Result | Key finding |
|----|-----------|--------|-------------|
| A1 | `shared peer_id — broadcast is skipped` | PASS | Self-addressed messages dropped; transport layer requires distinct peer IDs |
| A2 | `shared agent_id — duplicate RawVersion is silently dropped` | PASS | CRDT dedup at oplog level; 3 ops (3-char insert) silently ignored |
| A3 | `shared agent_id — presence is silently overwritten` | PASS | Hash collision in EphemeralHub; only 1 presence slot per agent |
| B1 | `distinct agent_ids + sync — NodeIds are identical post-sync` | PASS | Synced replicas produce identical projection identity |
| B1' | `same-variant divergence — NodeId→kind mapping is stable` | PASS (null finding) | No kind mismatch after divergent number inserts; reconcile is deterministically right-biased |
| B1'' | `mixed-variant divergence — NodeId mapping diverges across replicas` | PASS (positive divergence) | `kind_mismatches = 2`. NodeIds 5 and 10 swap variants between A and B (A: 5=String, 10=Bool; B: 5=Bool, 10=String) |
| B2 | `multi-session convergence — text matches after B→A sync` | PASS | Standard Fugue convergence works with distinct replica IDs |
| C_uuid | `UUID-shaped DocumentId is shape-agnostic` | PASS | UUID string accepted without error |
| C_hash | `content-hash-shaped DocumentId is shape-agnostic` | PASS | Hash string accepted without error |
| C_path | `path-shaped DocumentId is shape-agnostic` | PASS | Path string accepted without error |

---

## Notable Finding: B1' / B1'' juxtaposition

`reconcile_children` (`core/reconcile.mbt`) uses an LCS over `same_kind()`, which for `JsonValue` compares variant only (`Number(x) ~ Number(y) = true` regardless of values), with a right-biased backtrack.

**B1' (same-variant, null finding).** When BOTH replicas' old trees contain children of the same variant, LCS preserves NodeIds symmetrically across replicas. Diagnostic snapshot showed A and B converge to byte-identical NodeId→JsonValue maps including the integer NodeId values.

**B1'' (mixed-variant, positive divergence).** When each replica's old tree contains a DIFFERENT variant at the divergent position, LCS preserves each replica's old NodeId at the structural position that matches its OWN local variant — leaving the same logical post-merge node with a *different* NodeId on each replica. Concrete observation for `A.insert(",\"abc\"")` + `B.insert(",true")` from base `[1]`, converging to `[1,"abc",true]`:

```
A's registry: 0 → Number(1), 1 → Array, 5 → String("abc"), 10 → Bool(true)
B's registry: 0 → Number(1), 1 → Array, 5 → Bool(true),    10 → String("abc")
                                          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                                          NodeId 5 and 10 swapped
```

**Implication.** NodeIds preserve structural-position identity *post-reconcile within one replica*, NOT cross-replica logical-node identity. A workspace design that exposes `NodeIdQ { doc_id, node_id }` as "the same node across replicas" cannot rest on the current per-editor counter + reconcile pipeline alone — it needs either a Grove-level structural id (mint a content/position-stable id separate from the counter), a deterministic-seed scheme (canonical traversal of the post-merge tree determines counter assignments), or a scope reduction (only intra-replica references are durable; cross-replica anchors use a different mechanism).
