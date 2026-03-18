# Projectional Editor Framework Extraction

**Date:** 2026-03-18
**Status:** Approved

## Goal

Extract a general-purpose projectional editor framework from the current lambda calculus CRDT editor. The framework supports any grammar that provides a parser + AST structure. Target consumers: MoonBit library authors (primary) and web developers via JS FFI (secondary).

## Architecture

The framework is the catamorphism side of the incremental hylomorphism pipeline (see `docs/architecture/Incremental-Hylomorphism.md`). The anamorphism side (loom parser, CstNode) is already generic. The extraction parameterizes everything from the CST→AST boundary onward over a type `T` representing the AST node type.

```
CRDT Ops →(fold)→ Text →(ana/loom)→ CstNode →(cata)→ T →(cata)→ ProjNode[T] →(cata)→ Screen
                                               ↑                    ↑
                                          already generic      extraction scope
```

### Two-Layer Architecture (from Hylomorphism document)

- **Layer 1 (Concrete):** CstNode — position-independent, lossless, already generic via loom
- **Layer 2 (Abstract):** T → ProjNode[T] — parameterized over grammar, uses capability traits

The boundary between layers is `cst_to_ast: SyntaxNode → T?`, a grammar-specific catamorphism provided by each language package.

## Capability Traits

Three traits following MoonBit's Self-based pattern (see `moonbit-traits` patterns):

```moonbit
///| Tree structure — children and reconstruction (Pattern 1: Self-closed algebra)
pub trait TreeNode {
  children(Self) -> Array[Self]
  rebuild(Self, Array[Self]) -> Self
  same_kind(Self, Self) -> Bool
}

///| Rendering — how nodes appear in the projectional UI (Pattern 2: Fixed projection)
pub trait Renderable {
  kind_tag(Self) -> String
  label(Self) -> String
  placeholder(Self) -> String
}

///| Text roundtrip — parse/unparse at the hylomorphism boundary
pub trait Parseable {
  parse(String) -> Self?
  unparse(Self) -> String
}
```

**`same_kind`** is in `TreeNode` because reconciliation is a structural operation. It matches the current `same_kind_tag` behavior: constructor-tag comparison only, ignoring leaf data. `same_kind(Lam("x", _), Lam("y", _))` returns `true` — parameter renames preserve node IDs. This matches the current reconciliation semantics where `(Lam(_, _), Lam(_, _))` preserves the old node ID regardless of parameter name.

**Why traits, not record-of-functions:** MoonBit's Self-based traits naturally express catamorphism algebras (Finally Tagless pattern). `parse(String) -> Self?` works as a factory method (same pattern as `Monoid::empty() -> Self`). Traits provide compile-time checking that all methods are implemented. JS FFI consumers use a concrete wrapper type (`DynamicNode`) that implements the traits.

## Generic ProjNode[T]

```moonbit
pub struct ProjNode[T] {
  node_id : Int
  kind : T
  children : Array[ProjNode[T]]
  start : Int
  end : Int
}
```

`T` propagates through: `FlatProj[T]`, `ProjNode[T]`, `InteractiveTreeNode[T]`, `SyncEditor[T]`.

`SourceMap` does NOT gain `T` — it stores only `NodeId` and `Range` (where `Range` stays in loom as an external dep). `NodeId` moves to `framework/core/`.

### The kind-children invariant

`ProjNode[T]` stores `kind: T` and `children: Array[ProjNode[T]]`. For recursive AST types like `App(t1, t2)`, the children exist in TWO places: embedded in `kind` (as sub-Terms) and in `ProjNode.children` (as child ProjNodes). These must agree.

The framework maintains this invariant via `TreeNode::rebuild`: when modifying children, the framework extracts `Array[T]` from `ProjNode[T].children.map(fn(c) { c.kind })`, calls `T::rebuild(parent.kind, new_children_kinds)`, and updates both `kind` and `children` atomically. The `rebuild` implementation is responsible for placing the child `T` values into the correct positions of the parent `T` constructor.

### FlatProj[T]

`FlatProj[T]` is parameterized alongside `ProjNode[T]`:

```moonbit
pub struct FlatProj[T] {
  defs : Array[(String, ProjNode[T], Int, NodeId)]
  final_expr : ProjNode[T]?
}
```

**`to_flat_proj`** — currently calls `syntax_to_proj_node` which is lambda-specific. In the framework, this becomes a generic function that uses `cst_to_ast` (the hylomorphism boundary) plus `T::children` / `T::kind_tag` to extract the module structure:

```moonbit
fn[T : TreeNode + Renderable] to_flat_proj(ast : T, ...) -> FlatProj[T]?
```

The incremental fast-path (`to_flat_proj_incremental` using `physical_equal` CstNode comparison) is preserved: it operates at the CstNode level (Layer 1), before `T` is involved. Only changed CstNode subtrees trigger the `cst_to_ast` catamorphism. This is critical for performance.

**Unparse path:** Currently `print_flat_proj` calls `@ast.print_term`. In the framework:
1. `FlatProj[T]` → reconstruct `T` from `ProjNode[T].kind` values
2. Call `T::unparse()` on the reconstructed `T`

This replaces the direct `@ast.print_term` call with the generic trait method.

### Reconciliation

Currently pattern-matches on `@ast.Term` constructors. Changes to use `T::same_kind`:

```moonbit
fn[T : TreeNode + Renderable] reconcile_ast(
  old : ProjNode[T], new : ProjNode[T], counter : Ref[Int]
) -> ProjNode[T] {
  if T::same_kind(old.kind, new.kind) {
    // Preserve node_id, reconcile children via LCS
  } else {
    // Different kind — assign new ID
  }
}
```

### Position assignment

`build_proj_node` sets `start: 0, end: 0` as defaults. The memo chain in `SyncEditor` patches positions from the SyntaxNode traversal, since positions are a property of the concrete layer (CstNode), not the abstract layer (T).

## Three-Tier Tree Edit API

The current monolithic `TreeEditOp` enum splits into three tiers:

### Tier 1: UI State (no pipeline, O(1))

Methods on `TreeEditorState`, no type parameter:

```moonbit
pub fn TreeEditorState::select(self, NodeId) -> TreeEditorState
pub fn TreeEditorState::collapse(self, NodeId) -> TreeEditorState
pub fn TreeEditorState::expand(self, NodeId) -> TreeEditorState
pub fn TreeEditorState::start_edit(self, NodeId) -> TreeEditorState
pub fn TreeEditorState::cancel_edit(self) -> TreeEditorState
```

`TreeEditorState` is immutable — each method returns a new state. UI calls these directly without going through `SyncEditor`. This is Phase 3 (UI state separation).

### Tier 2: Generic Structural Edits (framework, triggers pipeline)

Methods on `SyncEditor[T]`:

```moonbit
pub fn[T : TreeNode + Renderable + Parseable] SyncEditor::delete_node(self, NodeId) -> Result[Unit, String]
pub fn[T : TreeNode + Renderable + Parseable] SyncEditor::move_child(self, source: NodeId, target: NodeId, index: Int) -> Result[Unit, String]
pub fn[T : TreeNode + Renderable + Parseable] SyncEditor::commit_edit(self, NodeId, String) -> Result[Unit, String]
pub fn[T : TreeNode + Renderable + Parseable] SyncEditor::insert_child(self, parent: NodeId, index: Int) -> Result[Unit, String]
```

These use trait methods: `T::rebuild()` for tree modification, `T::unparse()` for text roundtrip, `T::parse()` for reparsing, `T::placeholder()` for insertions.

### Tier 3: Language-Specific Transforms (closure-based)

```moonbit
pub fn[T : TreeNode + Renderable + Parseable] SyncEditor::apply_transform(
  self,
  target : NodeId,
  transform : (ProjNode[T], NodeId) -> Result[ProjNode[T], String],
  timestamp_ms : Int,
) -> Result[Unit, String]
```

Framework handles: find node → call transform → unparse → set_text → reparse → reconcile → undo group. Language provides the `transform` closure.

**UI discovery:**

```moonbit
pub struct EditAction[T] {
  label : String
  shortcut : String?
  applicable : (ProjNode[T], NodeId) -> Bool
  apply : (ProjNode[T], NodeId) -> Result[ProjNode[T], String]
}
```

Language packages export edit actions as data. UI renders as context menus. Not a framework extension mechanism — just a convention.

### TreeEditOp migration

| Current variant | New location |
|----------------|-------------|
| Select, Collapse, Expand | Tier 1: TreeEditorState methods |
| StartEdit, CancelEdit | Tier 1: TreeEditorState methods |
| CommitEdit | Tier 2: SyncEditor::commit_edit |
| Delete | Tier 2: SyncEditor::delete_node |
| InsertChild | Tier 2: SyncEditor::insert_child |
| DragOver, Drop | Tier 2: SyncEditor::move_child |
| WrapInLambda, WrapInApp | Tier 3: lang/lambda EditAction[Term] |

## Generic SyncEditor[T]

```moonbit
pub struct SyncEditor[T] {
  // CRDT layer (unchanged)
  priv doc : @text.TextDoc
  priv undo_mgr : @undo.UndoManager

  // Parser layer (parameterized)
  priv parser : @loom.ImperativeParser[T]
  priv parser_rt : @incr.Runtime

  // Reactive pipeline (parameterized)
  priv source_text : @incr.Signal[String]
  priv syntax_tree : @incr.Signal[@seam.SyntaxNode?]
  priv proj_memo : @incr.Memo[FlatProj[T]?]
  priv cached_proj_node : @incr.Memo[ProjNode[T]?]
  priv registry_memo : @incr.Memo[Map[NodeId, ProjNode[T]]]
  priv source_map_memo : @incr.Memo[SourceMap]

  // UI state (no T — Phase 3 separation)
  priv mut editor_state : TreeEditorState

  // Collaboration (not parameterized by T)
  priv ephemeral : EphemeralStore
  priv cursor_view : PeerCursorView
  priv peer_id : String

  // Performance (from CRDT optimization — InsertCursor lives in Document, not here)
}
```

### Construction

```moonbit
pub fn[T : TreeNode + Renderable + Parseable] SyncEditor::new(
  agent_id : String,
  grammar : @loom.Grammar,
  cst_to_ast : (SyntaxNode) -> T?,
) -> SyncEditor[T]
```

`cst_to_ast` is the hylomorphism boundary — the grammar-specific catamorphism from concrete layer to abstract layer.

### Refresh boundary (Phase 4)

```moonbit
pub fn[T] SyncEditor::is_dirty(self) -> Bool
pub fn[T] SyncEditor::refresh(self) -> Unit
pub fn[T] SyncEditor::get_proj_node(self) -> ProjNode[T]?  // reads cached, does NOT refresh
```

Consumers call `refresh()` when ready to re-render. Multiple edits between refreshes accumulate as a single dirty flag.

## Package Structure

```
framework/
  framework/traits/     # TreeNode, Renderable, Parseable (no deps)
  framework/core/       # ProjNode[T], FlatProj[T], SourceMap, NodeId, reconciliation
  framework/editor/     # SyncEditor[T], TreeEditorState, generic structural edits, apply_transform

lang/lambda/
  lang/lambda/ast/      # Term enum (from loom/examples/lambda/)
  lang/lambda/projection/  # impl TreeNode/Renderable/Parseable for Term
  lang/lambda/edits/    # EditAction[Term] — wrap-in-lambda, etc.
  lang/lambda/bridge/   # cst_to_ast: SyntaxNode → Term

editor/                 # Application (framework + lang/lambda)
examples/web/           # Web frontend
```

**Dependency graph:**
```
framework/traits  →  framework/core  →  framework/editor
                                              ↓
                     lang/lambda  ────────→  editor/  →  examples/web/
```

**Acid test:** `framework/` compiles with zero imports from `lambda` or `@ast`.

## Extraction Approach: Bottom-Up

Each step is a standalone change that passes all tests:

1. Parameterize `ProjNode[T]` — replace `kind: @ast.Term` with generic `T`
2. Add capability traits, implement for `Term`
3. Separate UI state from model pipeline (Phase 3)
4. Parameterize `SyncEditor[T]`
5. Add refresh boundary (Phase 4)
6. Extract framework packages, move lambda code to language package

## Testing Strategy

**Framework tests:** Use a minimal `TestExpr` enum (not lambda) to prove the framework works independently:
- ProjNode[TestExpr] construction and reconciliation
- TreeEditorState UI operations without pipeline
- SyncEditor[TestExpr] roundtrip
- Generic structural edits and apply_transform
- Refresh boundary protocol

**TestExpr definition:**
```moonbit
enum TestExpr {
  Leaf(String)
  Node(String, Array[TestExpr])
}
impl TreeNode for TestExpr with children(self) {
  match self { Leaf(_) => []; Node(_, cs) => cs }
}
impl TreeNode for TestExpr with rebuild(self, cs) {
  match self { Leaf(_) => self; Node(tag, _) => Node(tag, cs) }
}
impl TreeNode for TestExpr with same_kind(self, other) {
  match (self, other) { (Leaf(_), Leaf(_)) => true; (Node(_, _), Node(_, _)) => true; _ => false }
}
impl Renderable for TestExpr with kind_tag(self) {
  match self { Leaf(_) => "Leaf"; Node(_, _) => "Node" }
}
impl Renderable for TestExpr with label(self) {
  match self { Leaf(s) => s; Node(tag, _) => tag }
}
impl Renderable for TestExpr with placeholder(self) {
  match self { Leaf(_) => "?"; Node(_, _) => "node(?)" }
}
impl Parseable for TestExpr with parse(s) { Some(Leaf(s)) }
impl Parseable for TestExpr with unparse(self) {
  match self { Leaf(s) => s; Node(tag, cs) => tag + "(" + cs.map(Parseable::unparse).join(", ") + ")" }
}
```

**Edge case tests:**
- Empty tree reconciliation (no children)
- Roundtrip property: `parse(unparse(t))` produces structurally equivalent result
- Error handling in structural edits (delete root, move to invalid position)

**Lambda tests:** Existing 232 tests continue to pass as a framework consumer.

**Lambda-specific SyncEditor methods** (`get_ast`, `get_resolution`, `get_dot_resolved`) move to `lang/lambda/` as extension functions or a thin wrapper around `SyncEditor[Term]`. They are NOT part of the framework API.

**Acid test:** `framework/` compiles with zero imports from `lambda` or `@ast`.

## JS FFI

JS consumers use a concrete wrapper type:

```moonbit
struct DynamicNode {
  tag : String
  text : String
  child_nodes : Array[DynamicNode]
  source : String
}

impl TreeNode for DynamicNode with children(self) { self.child_nodes }
impl Renderable for DynamicNode with kind_tag(self) { self.tag }
impl Parseable for DynamicNode with parse(s) { /* JS callback */ }
impl Parseable for DynamicNode with unparse(self) { self.source }
```

JS constructs `DynamicNode` instances via FFI. The framework works with trait bounds — same code path as MoonBit consumers.
