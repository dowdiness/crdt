# Cognition Runtime

This is the first minimal runtime layer for AI-native cognition in Canopy. It is
not an IDE feature yet and does not change the existing editor, CRDT, parser,
projection, or rendering pipeline.

The runtime models an incremental cognition graph:

```text
Workspace inputs → derived cognition artifacts → AI context artifacts
```

The first goal is dependency tracking and selective recomputation for AI coding
context. Quality of generated summaries is deliberately out of scope; current
recomputation uses deterministic mock functions.

## Minimal model

The initial package is `lib/cognition`.

- `CognitionKey` names inputs and derived artifacts:
  - `FileText(path)`
  - `FileSummary(path)`
  - `RepoSummary`
  - `QueryContext(query)`
- `CognitionValue` stores simple artifact values:
  - `Text(value)`
  - `Summary(value)`
  - `ContextBundle(items)`
- `Revision` is a store-local monotonic integer.
- `Dependency` is a directed edge from a derived key to the input key it reads.
- `CognitionStore` stores values, revisions, dependency edges, reverse edges,
  dirty keys, and recomputation counts for tests/demo traces.

## Mock recomputation rules

- `FileSummary(path)` depends on `FileText(path)`.
- `RepoSummary` depends on all known `FileSummary(path)` values.
- `QueryContext(query)` depends on `RepoSummary`.

When an input changes, the store marks transitive dependents dirty. Calling
`recompute_dirty()` recomputes dirty artifacts whose dependencies are clean, so
unrelated summaries are not recomputed when another file changes.

## Non-goals for this milestone

- No real LLM calls.
- No vector database.
- No network sync.
- No CRDT changes.
- No frontend UI.
- No VSCode/Cursor integration.
- No full IDE or agent framework.

## Future artifact shapes

Future cognition keys may include `SymbolSummary`, `DecisionLog`,
`AgentMemory`, `BranchMemory`, and `StaleMemory`. Those should build on the
same graph discipline: explicit inputs, explicit dependencies, revisions, and
selective invalidation before any expensive AI work is introduced.
