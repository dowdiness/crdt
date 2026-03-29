# JSON Projectional Editor — Design

**Date:** 2026-03-29
**Status:** Approved

## Goal

Build a JSON projection pipeline (`lang/json/`) that proves `framework/core/` works with a second real language. Validate via tests, not UI. Compare JSON boilerplate against lambda's to inform loomgen code generator design.

## Non-Goals

- Web UI (deferred — can reuse Rabbita or ideal editor later)
- FlatProj / incremental per-member derivation (deferred — framework's generic reconcile + loom block reparse is sufficient)
- Full edit handler parity with lambda (no scope analysis, no middleware pipeline)

## Architecture

```
loom/examples/json/src/     ← existing: parser, grammar, JsonValue AST
  ast.mbt                   ← MODIFY: add TreeNode + Renderable impls

canopy/lang/json/
  proj/                     ← NEW: syntax_to_proj_node, populate_token_spans
  edits/                    ← NEW: JsonEditOp, text edit handlers

canopy/editor/
  sync_editor.mbt           ← MODIFY: add SyncEditor::new_json constructor
  projection_memo.mbt       ← MODIFY: add build_json_projection_memos
```

Same three-layer pattern as lambda:
1. Trait impls in type owner (`loom/examples/json/src/ast.mbt`)
2. Projection builders in canopy (`lang/json/proj/`)
3. Edit handlers in canopy (`lang/json/edits/`)

## Component 1: TreeNode + Renderable for JsonValue

**Location:** `loom/examples/json/src/ast.mbt`
**Dep change:** Add `"dowdiness/loom/core"` to `loom/examples/json/moon.mod.json` deps.

### TreeNode

```
children:
  Null, Bool, Number, String, Error → []
  Array(items) → items
  Object(members) → members.map(m => m.1)   // values only; keys are metadata

same_kind:
  constructor-tag equality (Null==Null, Bool==Bool, Array==Array, etc.)
```

**Design choice: values-only children for Object.** Object members are `(String, JsonValue)` tuples. Only the JsonValue part becomes a ProjNode child. Key names appear in the parent Object's label and are accessible via `populate_token_spans` for rename operations. This matches lambda's treatment of let-binding names in Module.

**Future possibility:** Add a `Member(String, JsonValue)` variant to JsonValue (option B) or create a `JsonExpr` wrapper type (option C) to make members first-class projection nodes. This would enable per-member tree nodes with separate key/value children. Deferred because option A is sufficient for framework validation and loomgen comparison.

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

placeholder: "null"

unparse: JSON serialization with proper escaping
```

### Estimated size: ~50 lines

## Component 2: Projection Builder (`lang/json/proj/`)

### `proj_node.mbt` — CST → ProjNode[JsonValue]

`syntax_to_proj_node(node: SyntaxNode, counter: Ref[Int]) -> ProjNode[JsonValue]`

Mapping:

| SyntaxKind | JsonValue | Children |
|---|---|---|
| RootNode | recurse into single child | — |
| ObjectNode | `Object(members)` | recurse each MemberNode's value child |
| ArrayNode | `Array(items)` | recurse each value child |
| MemberNode | skip — parent Object collects key+value | — |
| StringValue | `String(text)` | leaf |
| NumberValue | `Number(parsed)` | leaf |
| BoolValue | `Bool(true/false)` | leaf |
| NullValue | `Null` | leaf |
| ErrorNode | `Error(message)` | leaf |

**MemberNode handling:** ObjectNode iterates its MemberNode children, extracts `(key_text, recurse(value_child))` tuples to build `Object(Array[(String, JsonValue)])`. Each value child becomes a ProjNode child of the Object ProjNode. Key text comes from the StringToken inside MemberNode.

### `populate_token_spans.mbt` — Token span extraction

Standalone function: `populate_token_spans(source_map, syntax_root, proj_root)`

Extracts key name spans from MemberNode's StringToken children. Stored with role `"key:0"`, `"key:1"`, etc. on the Object ProjNode (same pattern as lambda's `"name:0"` for let-binding names).

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

### `compute_json_edit.mbt` — Edit dispatch

```moonbit
pub fn compute_json_edit(
  op: JsonEditOp,
  source: String,
  proj: ProjNode[JsonValue],
  source_map: SourceMap,
) -> Result[(Array[SpanEdit], FocusHint)?, String]
```

Each handler computes text replacements via source map span lookup. JSON structural edits are simpler than lambda because there are no bindings, scope, or operator precedence.

### Estimated size: ~250 lines

## Component 4: SyncEditor Integration

### `SyncEditor::new_json`

```moonbit
pub fn SyncEditor::new_json(
  agent_id: String,
  capture_timeout_ms?: Int,
) -> SyncEditor[JsonValue]
```

Wires `json_grammar` + `build_json_projection_memos`.

### `build_json_projection_memos`

Simpler than lambda's — no FlatProj, no incremental def tracking:

1. Syntax tree signal → ProjNode[JsonValue] via `syntax_to_proj_node`
2. Reconcile with previous ProjNode (preserve IDs)
3. Build registry (walk tree, collect NodeId → ProjNode)
4. Build SourceMap from ProjNode tree + `populate_token_spans`

Three memos (vs lambda's four): ProjNode, registry, SourceMap.

### Estimated size: ~120 lines

## Testing Strategy

Whitebox tests in `lang/json/proj/` and `lang/json/edits/`:

**Projection tests:**
- Parse `{"a": 1, "b": true}` → correct ProjNode tree shape
- Parse `[1, "hello", null]` → correct Array children
- Parse nested `{"a": {"b": 1}}` → correct nesting
- SourceMap positions match text spans
- Token spans for member keys are correct
- Empty object/array handled

**Reconciliation tests:**
- Edit a value → reparse → reconcile preserves Object and sibling IDs
- Add member → reparse → new member gets fresh ID, others preserved
- Delete member → reparse → remaining members keep IDs

**Edit handler tests:**
- Delete member from object → correct text
- Add member to object → correct JSON with comma handling
- Wrap value in array → `[value]`
- Rename key → correct text replacement
- Change type (null → string) → correct placeholder

**Integration tests:**
- SyncEditor::new_json round-trip: create → edit → get_text → verify
- reconcile + SourceMap consistent after edits

## Loomgen Comparison

Building JSON by hand alongside lambda reveals which boilerplate is mechanical:

| Component | Lambda (lines) | JSON (est.) | Generatable? |
|---|---|---|---|
| TreeNode impl | 35 | 15 | Yes — derivable from enum shape |
| Renderable impl | 60 | 35 | Partial — label/unparse need hints |
| syntax_to_proj_node | 160 | 120 | Yes — mechanical CST→ProjNode mapping |
| populate_token_spans | 220 | 40 | Yes — token role extraction |
| Edit handlers | 800 | 250 | No — language-specific logic |
| FlatProj | 300 | 0 | Optional per language |
| Memo builder | 340 | 120 | Partial — FlatProj presence varies |
| **Total** | **~1,900** | **~580** | |

~210 lines (TreeNode + Renderable + syntax_to_proj_node + populate_token_spans) are mechanical and should be generatable by loomgen. ~370 lines (edit handlers + memo builder) are language-specific.

## Dependencies

```
loom/examples/json/src/
  moon.pkg: add "dowdiness/loom/core" @loomcore

canopy/lang/json/proj/
  moon.pkg: @core, @json (loom json module), @loomcore, @seam

canopy/lang/json/edits/
  moon.pkg: @core, @json, @loomcore, lang/json/proj

canopy/editor/
  moon.pkg: add @json, lang/json/proj (for new_json constructor)
```

No circular dependencies. `lang/json/` imports from `framework/core/` and loom — never from `projection/` or `editor/`.
