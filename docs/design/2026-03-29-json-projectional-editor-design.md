# JSON Projectional Editor — Design

**Date:** 2026-03-29
**Status:** Approved (revised after Codex review)

## Goal

Build a JSON projection pipeline (`lang/json/`) that proves `framework/core/` works with a second real language. Validate via tests, not UI. Compare JSON boilerplate against lambda's to inform loomgen code generator design.

## Non-Goals

- Web UI (deferred — can reuse Rabbita or ideal editor later)
- FlatProj / incremental per-member derivation (deferred)
- Full edit handler parity with lambda

## Architecture

```
loom/examples/json/src/     ← existing: parser, grammar, JsonValue AST
  ast.mbt                   ← MODIFY: add TreeNode + Renderable impls
  moon.pkg                  ← MODIFY: add @loomcore import

canopy/lang/json/
  proj/                     ← NEW: syntax_to_proj_node, populate_token_spans
  edits/                    ← NEW: JsonEditOp, text edit handlers, bridge

canopy/editor/
  sync_editor.mbt           ← MODIFY: generalize proj_memo to support non-FlatProj languages
```

Same three-layer pattern as lambda:
1. Trait impls in type owner (`loom/examples/json/src/ast.mbt`)
2. Projection builders in canopy (`lang/json/proj/`)
3. Edit handlers + editor bridge in canopy (`lang/json/edits/`)

## Prerequisite: Generalize SyncEditor proj_memo

**Blocker:** `SyncEditor[T]` currently hard-wires `proj_memo: Memo[VersionedFlatProj]` and the `build_memos` callback returns a 4-tuple including `Memo[VersionedFlatProj]`. JSON has no FlatProj.

**Fix:** Make the FlatProj memo optional in SyncEditor:
- Change `proj_memo` field type from `Memo[VersionedFlatProj]` to `Memo[VersionedFlatProj]?`
- Change `build_memos` callback to return `(Memo[VersionedFlatProj]?, Memo[ProjNode[T]?], Memo[Map[NodeId, ProjNode[T]]], Memo[SourceMap])`
- `get_flat_proj()` returns `None` when proj_memo is None
- `SyncEditor::new_lambda` passes `Some(flat_proj_memo)` (unchanged behavior)
- JSON's builder passes `None`

This is a minimal change (~10 lines in sync_editor.mbt + projection_memo.mbt). The lambda path is unchanged.

**Alternative (future):** Extract FlatProj memo entirely from SyncEditor into the language-specific bridge. This is Task 7 from the framework extraction plan — deferred.

## Component 1: TreeNode + Renderable for JsonValue

**Location:** `loom/examples/json/src/ast.mbt`
**Dep change:** Add `"dowdiness/loom/core" @loomcore` to `loom/examples/json/src/moon.pkg`. No `moon.mod.json` change needed — JSON module already depends on `dowdiness/loom` which includes loom/core.

### TreeNode

```
children:
  Null, Bool, Number, String, Error → []
  Array(items) → items
  Object(members) → members.map(m => m.1)   // values only

same_kind:
  constructor-tag equality (Null==Null, Bool==Bool, Array==Array, etc.)
```

**Design choice: values-only children for Object.** Object members are `(String, JsonValue)` tuples. Only the JsonValue part becomes a ProjNode child. Key names appear in the parent Object's label and are accessible via token spans for rename operations.

**Known limitation:** When an Object has multiple children of the same kind (e.g., `{"a": 1, "b": 2}` — two Numbers), `reconcile`'s LCS algorithm matches by `same_kind` and positional order. This preserves IDs correctly for in-order edits but may mis-assign IDs after reordering same-kind siblings. Lambda has the same limitation with multiple same-kind let-bindings. This is acceptable for framework validation.

**Future options:**
- (B) Add `Member(String, JsonValue)` variant to JsonValue — members become first-class nodes with distinct kinds
- (C) Create `JsonExpr` wrapper type in canopy — avoids modifying loom submodule

### Renderable

```
kind_tag:
  "Null", "Bool", "Number", "String", "Array", "Object", "Error"

label:
  Null → "null"
  Bool(b) → b.to_string()
  Number(n) → n.to_string()
  String(s) → "\"" + truncate(s, 20) + "\""
  Array(items) → "[" + items.length().to_string() + " items]"
  Object(members) → "{" + members.map(m => m.0).join(", ") + "}"
  Error(msg) → "Error: " + msg

placeholder (per-kind):
  Null → "null"
  Bool → "false"
  Number → "0"
  String → "\"\""
  Array → "[]"
  Object → "{}"
  Error → "null"

unparse: JSON serialization with proper escaping, indentation
```

### Estimated size: ~60 lines

## Component 2: Projection Builder (`lang/json/proj/`)

### `proj_node.mbt` — CST → ProjNode[JsonValue]

`syntax_to_proj_node(node: SyntaxNode, counter: Ref[Int]) -> ProjNode[JsonValue]`

Mapping:

| SyntaxKind | JsonValue | Children |
|---|---|---|
| RootNode | recurse into single child | — |
| ObjectNode | `Object(members)` | recurse each MemberNode's value child |
| ArrayNode | `Array(items)` | recurse each value child |
| MemberNode | — (parent Object collects key+value) | — |
| StringValue | `String(text)` | leaf |
| NumberValue | `Number(parsed)` | leaf |
| BoolValue | `Bool(true/false)` | leaf |
| NullValue | `Null` | leaf |
| ErrorNode | `Error(message)` | leaf |

**MemberNode handling:** ObjectNode iterates its MemberNode children, extracts `(key_text, recurse(value_child))` tuples to build `Object(Array[(String, JsonValue)])`. Each value child becomes a ProjNode child of the Object ProjNode. Key text comes from the StringToken inside MemberNode.

**Error recovery:** The JSON parser produces ErrorNode for malformed input and synthesizes `Error("missing ...")` values for incomplete members. The projection builder must handle:
- MemberNode with missing value → `Error("missing value")` ProjNode child
- MemberNode with missing key → use `""` as key text
- ErrorNode at any position → `Error(message)` leaf ProjNode
- Intermediate invalid states during typing (e.g., `{"a": }` while user types)

### `populate_token_spans.mbt` — Token span extraction

Standalone function: `populate_token_spans(source_map, syntax_root, proj_root)`

Extracts key name spans from MemberNode's StringToken children. Stored with role `"key:0"`, `"key:1"`, etc. on the Object ProjNode.

**Span contract:** Key spans cover the **entire StringToken** including quotes (e.g., `"name"` → span [3, 9) for `{"name": 1}`). RenameKey replaces the entire token and must produce valid quoted JSON (handle escaping).

### Estimated size: ~180 lines

## Component 3: Edit Handlers (`lang/json/edits/`)

### `json_edit_op.mbt` — Edit operation enum

```moonbit
pub(all) enum JsonEditOp {
  // Generic UI ops
  Select(node_id~: NodeId)
  Collapse(node_id~: NodeId)
  Expand(node_id~: NodeId)
  StartEdit(node_id~: NodeId)
  CommitEdit(node_id~: NodeId, new_value~: String)
  CancelEdit
  // JSON structural ops
  Delete(node_id~: NodeId)
  AddMember(object_id~: NodeId, key~: String)
  AddElement(array_id~: NodeId)
  WrapInArray(node_id~: NodeId)
  WrapInObject(node_id~: NodeId, key~: String)
  Unwrap(node_id~: NodeId)
  ChangeType(node_id~: NodeId, new_type~: String)
  RenameKey(object_id~: NodeId, key_index~: Int, new_key~: String)
  DuplicateMember(object_id~: NodeId, key_index~: Int)
  ReorderUp(object_id~: NodeId, key_index~: Int)
  ReorderDown(object_id~: NodeId, key_index~: Int)
}
```

### `compute_json_edit.mbt` — Edit dispatch + bridge

```moonbit
pub fn compute_json_edit(
  op: JsonEditOp,
  source: String,
  proj: ProjNode[JsonValue],
  source_map: SourceMap,
) -> Result[(Array[SpanEdit], FocusHint)?, String]
```

Each handler computes text replacements via source map span lookup.

### `json_edit_bridge.mbt` — SyncEditor bridge

```moonbit
pub fn SyncEditor::apply_json_edit(
  self: SyncEditor[JsonValue],
  op: JsonEditOp,
  timestamp_ms: Int,
) -> Result[Unit, String]
```

Analogous to lambda's `apply_tree_edit`. Reads proj + source_map from memos, calls `compute_json_edit`, applies resulting text edits via `apply_text_edit_internal`. Lives in `lang/json/edits/` — **not** in `editor/`.

**Note:** This requires `apply_text_edit_internal` to be accessible from `lang/json/edits/`. Currently it's a private method on SyncEditor. Options:
- Make it `pub` (simplest, minor API surface increase)
- Use the public `apply_text_edit` method instead (slightly different semantics — records undo by default)
- Pass a closure from the bridge

### Estimated size: ~280 lines

## Component 4: SyncEditor Integration

### `SyncEditor::new_json`

Lives in `lang/json/edits/` (not `editor/`), analogous to how `new_lambda` could eventually move to `lang/lambda/`.

```moonbit
pub fn SyncEditor::new_json(
  agent_id: String,
  capture_timeout_ms?: Int,
) -> SyncEditor[JsonValue]
```

**Note:** `SyncEditor::new` is currently `fn` (package-private to editor/). To call it from `lang/json/edits/`, either:
- Make `SyncEditor::new` `pub` (opens the generic constructor to all packages)
- Add a `SyncEditor::new_generic` public constructor that takes the 3-memo builder (no FlatProj)

Wires `json_grammar` + `build_json_projection_memos`.

### `build_json_projection_memos`

Simpler than lambda's — no FlatProj, no incremental def tracking:

1. Syntax tree signal → ProjNode[JsonValue] via `syntax_to_proj_node`
2. Reconcile with previous ProjNode (preserve IDs)
3. Build registry (walk tree, collect NodeId → ProjNode)
4. Build SourceMap from ProjNode tree + `populate_token_spans`

Returns `(None, proj_node_memo, registry_memo, source_map_memo)` — first element is `None` (no FlatProj).

### Estimated size: ~120 lines

## Testing Strategy

Whitebox tests in `lang/json/proj/` and `lang/json/edits/`:

**Projection tests:**
- Parse `{"a": 1, "b": true}` → correct ProjNode tree (Object with 2 children)
- Parse `[1, "hello", null]` → correct Array children
- Parse nested `{"a": {"b": 1}}` → correct nesting
- Parse empty `{}` and `[]` → correct leaf nodes
- SourceMap positions match text spans
- Token spans for member keys cover quoted strings

**Error recovery tests:**
- `{"a": }` (missing value) → Error child node
- `{: 1}` (missing key) → handled gracefully
- `{"a": 1, }` (trailing comma) → parser recovers
- `{"a" 1}` (missing colon) → parser recovers

**Reconciliation tests:**
- Edit a value → reparse → reconcile preserves Object and sibling IDs
- Add member → reparse → new member gets fresh ID, others preserved
- Delete member → reparse → remaining members keep IDs
- **Duplicate-kind test:** `{"a": 1, "b": 2}` → edit "b" value → both Number children should reconcile correctly by position

**Edit handler tests:**
- Delete member from object → correct text with comma handling
- Add member to object → correct JSON with comma
- Wrap value in array → `[value]`
- Rename key → correct quoted replacement with escaping
- Change type (null → string) → kind-specific placeholder

**Integration tests:**
- SyncEditor::new_json round-trip: create → edit → get_text → verify
- reconcile + SourceMap consistent after edits

## Loomgen Comparison

By building JSON by hand alongside lambda, we identify which boilerplate is mechanical vs language-specific:

| Component | Generatable? | Pattern |
|---|---|---|
| TreeNode impl | Yes | Derivable from enum shape |
| Renderable (kind_tag, same_kind) | Yes | Constructor-tag mapping |
| Renderable (label, unparse) | Partial | Needs per-variant hints |
| Renderable (placeholder) | Yes | Annotation-driven |
| syntax_to_proj_node | Yes | Mechanical CST→ProjNode mapping |
| populate_token_spans | Yes | Token role extraction |
| Edit handlers | No | Language-specific logic |
| Memo builder | Partial | Presence/absence of FlatProj varies |

Actual line counts will be measured after implementation and compared against lambda's equivalents.

## Dependencies

```
loom/examples/json/src/
  moon.pkg: add "dowdiness/loom/core" @loomcore

canopy/lang/json/proj/
  moon.pkg: @core, @json, @loomcore, @seam

canopy/lang/json/edits/
  moon.pkg: @core, @json, @loomcore, lang/json/proj, editor (for SyncEditor access)
```

No circular dependencies. `lang/json/` imports from `framework/core/` and loom — not from `projection/` or `lang/lambda/`.

## Risks

1. **SyncEditor generalization** — Making proj_memo optional touches a core struct. Regression risk mitigated by existing 517+ tests.
2. **SyncEditor::new visibility** — Making the constructor public or adding a generic variant changes the editor package's API surface.
3. **apply_text_edit_internal access** — The JSON edit bridge needs to call private SyncEditor methods. May require making them public.
4. **Error recovery edge cases** — JSON parser has extensive recovery; projection must handle all recovered states without crashing.
