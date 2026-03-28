# AST Zipper for Tree Pane Navigation and Structural Editing

**Date:** 2026-03-28
**Status:** Draft

**Prerequisites (in order):**

1. **Two-layer architecture (TermSym)** (`docs/plans/2026-03-28-two-layer-architecture-impl.md`) — must land first. Adding `Hole(Int)` to `Term` triggers all exhaustive match sites. With TermSym in place, only `replay` and `TermSym` impls need updating; all `TermSym` consumers get compile errors that self-document what to fix.

2. **Framework Extraction Phase 1** (`docs/plans/2026-03-28-framework-extraction-impl.md`, Tasks 1–3) — additive API (`delete_node`, `commit_edit`, `apply_text_transform`, `EditAction[T]`) must be in place so `LambdaEditorState` can use the generic Tier-2 methods for text dispatch.

3. **Framework Extraction Phase 2** (`docs/plans/2026-03-28-framework-extraction-impl.md`, Task 4) — `FlatProj` must have moved to `lang/lambda/flat/` before zipper files are created, so zipper files land directly in their final location (`lang/lambda/zipper/`) without needing a second move.
**References:**
- Huet, "Functional Pearl: The Zipper" (1997) — core data structure
- McBride, "The Derivative of a Regular Type is its Type of One-Hole Contexts" (2001) — Zipper as type derivative
- Omar et al., "Hazelnut: a bidirectionally typed structure editor calculus" (POPL 2017) — edit action semantics, typed holes
- [tylr paper (TyDe 2022)](https://hazel.org/papers/tiny-tylr-tyde2022.pdf) — tile-based editing (reviewed, deferred)

## Goal

Add a Huet Zipper over `Term` to Canopy's tree pane with four properties:

1. **Structural cursor** — the focused node + path to root, with context-aware position information
2. **Edit actions as data** — structural operations are reified values, not just functions, enabling undo/redo, operation logging, and future collaborative structural editing
3. **Bidirectional text ↔ Zipper mapping** — text editing is never obstructed; text cursor position and Zipper position stay synchronized
4. **Hole-ready AST** — a dedicated `Hole` variant (not `Var("_")`) that reserves space for future type-aware editing

The design does not force a choice between text editing fluidity and structural editing semantics. Both coexist.

## Key Architectural Premise: Two Representations, One Truth

Text CRDT remains ground truth. The Zipper is a **structural lens** over the derived AST — it describes *where* the user is and *what* they are doing in structural terms, while all mutations flow through text:

```
Text edit:
  keystroke → CRDT op → loom reparse → new Term
  → sync Zipper to new Term (preserve structural position)

Structural edit:
  EditAction on Zipper → compute_text_edit (existing) → TextDelta
  → CRDT op → loom reparse → new Term
  → sync Zipper to new Term

Cursor sync:
  Text cursor at offset N → find deepest ProjNode → Zipper position
  Zipper at position P → find matching ProjNode → highlight text span
```

The Zipper does not bypass the text round-trip. It adds a structural interpretation layer that text editing alone cannot provide.

## The Actual AST

```moonbit
pub(all) enum Bop { Plus; Minus }

pub(all) enum Term {
  Int(Int)
  Var(VarName)
  Lam(VarName, Term)
  App(Term, Term)
  Bop(Bop, Term, Term)
  If(Term, Term, Term)
  Module(Array[(VarName, Term)], Term)
  Unit
  Unbound(VarName)
  Error(String)
  Hole(Int)             // NEW — dedicated hole with unique ID
}
```

**`Hole(Int)` replaces `Var("_")` as placeholder.** The `Int` is a hole ID, unique within a single edit session. Holes are **ephemeral** — they do not survive the text round-trip. `print_term` outputs `_` for all holes regardless of ID. After reparse, the parser reads `_` as a fresh `Hole` with a new ID. Hole metadata (creation context, position role) is managed via NodeId after reconciliation, not via hole IDs embedded in Term. See "Hole Lifecycle" for details.

---

## Data Types

### Context Type (the Derivative)

```moonbit
pub(all) enum TermCtx {
  CtxLamBody(VarName)

  CtxAppFunc(Term)
  CtxAppArg(Term)

  CtxBopLeft(Bop, Term)
  CtxBopRight(Bop, Term)

  CtxIfCond(Term, Term)
  CtxIfThen(Term, Term)
  CtxIfElse(Term, Term)

  CtxModuleDef(
    Array[(VarName, Term)],  // defs before hole
    VarName,                 // name at hole position
    Array[(VarName, Term)],  // defs after hole
    Term                     // body
  )
  CtxModuleBody(Array[(VarName, Term)])
}
```

### Zipper

```moonbit
pub(all) struct Zipper {
  focus : Term
  path : @immut/list.T[TermCtx]
}
```

### Position Role

Derived from the top of the Zipper path. Tells the UI and future tools **what kind of position** the cursor occupies.

```moonbit
pub(all) enum PositionRole {
  Root                    // path = Nil
  FunctionPosition        // App(□, _)
  ArgumentPosition        // App(_, □)
  BinderBody(VarName)     // Lam(x, □)
  Condition               // If(□, _, _)
  ThenBranch              // If(_, □, _)
  ElseBranch              // If(_, _, □)
  OperandLeft(Bop)        // Bop(op, □, _)
  OperandRight(Bop)       // Bop(op, _, □)
  LetDefinition(VarName)  // Module def value
  LetBody                 // Module body
}

pub fn position_role(z : Zipper) -> PositionRole {
  match z.path {
    Nil => Root
    Cons(ctx, _) =>
      match ctx {
        CtxLamBody(param) => BinderBody(param)
        CtxAppFunc(_) => FunctionPosition
        CtxAppArg(_) => ArgumentPosition
        CtxBopLeft(op, _) => OperandLeft(op)
        CtxBopRight(op, _) => OperandRight(op)
        CtxIfCond(..) => Condition
        CtxIfThen(..) => ThenBranch
        CtxIfElse(..) => ElseBranch
        CtxModuleDef(_, name, ..) => LetDefinition(name)
        CtxModuleBody(_) => LetBody
      }
  }
}
```

**Uses:**
- UI: context menu filters available actions by role (function position → suggest λ, condition → suggest boolean expressions)
- Future type checker: `PositionRole` → expected type constraint for the focused hole
- Accessibility: screen reader can announce "you are in the else branch of an if expression"

### Edit Action (Reified)

Structural operations are **data**, not just functions. Every edit action is a value that can be stored, inspected, inverted, and logged.

```moonbit
pub(all) enum EditAction {
  // Navigation (no AST change, recorded for undo cursor position)
  Move(Direction)

  // Structural modification
  Delete
  Replace(Term)
  WrapLam(VarName)
  WrapApp
  WrapBop(Bop)
  UnwrapKeeping(Int)   // which child index to keep (0 = first child)

  // Leaf editing
  CommitLeafEdit(String)   // new text for focused leaf
}

pub(all) enum Direction {
  Up
  Down
  Left
  Right
}
```

**`UnwrapKeeping(Int)` instead of `Unwrap`:** Plain unwrap silently discards siblings. `UnwrapKeeping(0)` on `App(f, arg)` keeps `f` and discards `arg`. `UnwrapKeeping(1)` keeps `arg` and discards `f`. The UI presents a choice when the node has multiple non-trivial children. If the non-kept children are all `Hole`s or trivial literals, no confirmation is needed.

**Why data, not functions:**

| Capability | Functions (`wrap_in_lambda(z, "x")`) | Data (`WrapLam("x")`) |
|---|---|---|
| Structural undo | ✗ must diff text | ✓ invert the action |
| Operation log | ✗ "some function was called" | ✓ `[Delete, Move(Up), WrapLam("f")]` |
| Collaborative conflict detection | ✗ compare text diffs | ✓ "A wrapped in λ, B deleted same node" |
| Serialization (eg-walker TransformOp) | ✗ | ✓ `EditAction` is serializable |
| Context menu rendering | redundant labels | `EditAction` → label + shortcut |

### Edit Result

Applying an action produces a result that couples the Zipper change with the data needed for the text round-trip and operation log:

```moonbit
pub(all) struct EditResult {
  zipper : Zipper               // new Zipper state
  action : EditAction           // the action that was applied (for logging)
  role : PositionRole           // position role before the edit
  tree_edit_op : TreeEditOp?    // None for navigation-only actions
}
```

Note: `EditResult` carries a `TreeEditOp`, not a raw `TextDelta`. Text delta computation is delegated to the existing `compute_text_edit` pipeline, which already handles source text preservation, formatting, and span lookup. The Zipper does not reimplement text delta logic.

---

## Hole Lifecycle

Holes are ephemeral markers. Their lifecycle is:

```
1. User performs Delete or Wrap → apply_action creates Hole(fresh_id)
   Hole metadata stored in HoleRegistry keyed by the hole's NodeId (assigned by reconcile)

2. print_term(Hole(_)) → outputs `_`

3. CRDT op → loom reparse → parser reads `_` → produces Hole(new_id)
   (new_id ≠ old_id — IDs do not survive text)

4. reconcile matches old ProjNode[Hole(old_id)] with new ProjNode[Hole(new_id)]
   via same_kind (both are Hole) → preserves NodeId

5. HoleRegistry is keyed by NodeId, not hole ID → metadata survives round-trip
```

**Key invariant:** Hole metadata lives in the projection layer (keyed by `NodeId`), not in `Term`. The `Int` inside `Hole(Int)` is only used for local identity between creation and the next reconcile pass.

```moonbit
pub(all) struct HoleInfo {
  created_by : EditAction
  role : PositionRole
  // Future: expected_type : Type?
}

/// HoleRegistry is keyed by NodeId (stable across round-trips),
/// not by the Int inside Hole(Int) (ephemeral).
pub(all) struct HoleRegistry {
  priv next_id : Ref[Int]
  priv holes : Map[NodeId, HoleInfo]
}

pub fn HoleRegistry::fresh_hole_id(self : HoleRegistry) -> Int {
  let id = self.next_id.val
  self.next_id.val = id + 1
  id
}

/// Register metadata after reconcile assigns a stable NodeId.
pub fn HoleRegistry::register(
  self : HoleRegistry,
  node_id : NodeId,
  info : HoleInfo,
) -> Unit {
  self.holes[node_id] = info
}

pub fn HoleRegistry::get(self : HoleRegistry, node_id : NodeId) -> HoleInfo? {
  self.holes.get(node_id)
}

/// Remove entries for NodeIds no longer in the tree.
pub fn HoleRegistry::prune(self : HoleRegistry, live_ids : @hashset.HashSet[NodeId]) -> Unit {
  let stale : Array[NodeId] = []
  for id in self.holes.keys() {
    if not(live_ids.contains(id)) { stale.push(id) }
  }
  for id in stale { self.holes.remove(id) }
}
```

`HoleRegistry::prune` is called during `TreeEditorState::refresh`, alongside the existing stale-ID pruning for collapsed\_nodes and selection.

---

## Navigation

Four directions. All return `Zipper?` — `None` means movement not possible.

### plug

```moonbit
fn plug(ctx : TermCtx, child : Term) -> Term {
  match ctx {
    CtxLamBody(param) => Lam(param, child)
    CtxAppFunc(arg) => App(child, arg)
    CtxAppArg(func) => App(func, child)
    CtxBopLeft(op, right) => Bop(op, child, right)
    CtxBopRight(op, left) => Bop(op, left, child)
    CtxIfCond(then_, else_) => If(child, then_, else_)
    CtxIfThen(cond, else_) => If(cond, child, else_)
    CtxIfElse(cond, then_) => If(cond, then_, child)
    CtxModuleDef(before, name, after, body) => {
      let defs = Array::new()
      for def in before { defs.push(def) }
      defs.push((name, child))
      for def in after { defs.push(def) }
      Module(defs, body)
    }
    CtxModuleBody(defs) => Module(defs, child)
  }
}
```

### go_down, go_up, go_left, go_right

```moonbit
pub fn go_down(z : Zipper) -> Zipper?
pub fn go_up(z : Zipper) -> Zipper?
pub fn go_right(z : Zipper) -> Zipper?
pub fn go_left(z : Zipper) -> Zipper?
```

Each function pattern-matches on `z.focus` (for `go_down`) or `z.path` (for `go_up`, `go_left`, `go_right`) and swaps the focus with the appropriate sibling/parent.

**Module navigation:** `go_right` from `CtxModuleDef` advances to next def or (if last) to body. `go_left` from `CtxModuleBody` moves to last def.

**Leaf nodes:** `go_down` on `Int`, `Var`, `Unit`, `Unbound`, `Error`, `Hole` returns `None`.

### Helpers

```moonbit
pub fn to_root(z : Zipper) -> Term
pub fn from_root(term : Term) -> Zipper
pub fn depth(z : Zipper) -> Int
```

---

## Applying Edit Actions

`apply_action` translates an `EditAction` into a `Zipper` change and a `TreeEditOp`. Text delta computation is **not** done here — it is delegated to the existing `compute_text_edit` pipeline which handles source text preservation and span lookup.

```moonbit
pub fn apply_action(
  z : Zipper,
  action : EditAction,
  holes : HoleRegistry,
) -> Result[EditResult, String] {
  let role = position_role(z)
  match action {
    Move(dir) => {
      let nav = match dir {
        Up => go_up(z)
        Down => go_down(z)
        Left => go_left(z)
        Right => go_right(z)
      }
      match nav {
        Some(z2) => Ok({ zipper: z2, action, role, tree_edit_op: None })
        None => Err("cannot move " + dir.to_string())
      }
    }

    Delete => {
      let hole_id = holes.fresh_hole_id()
      let z2 = { ..z, focus: Hole(hole_id) }
      Ok({ zipper: z2, action, role, tree_edit_op: Some(TreeEditOp::Delete(focus_node_id(z))) })
    }

    Replace(new_term) => {
      let z2 = { ..z, focus: new_term }
      Ok({ zipper: z2, action, role, tree_edit_op: Some(make_replace_op(z, new_term)) })
    }

    WrapLam(param) => {
      let z2 = { ..z, focus: Lam(param, z.focus) }
      Ok({ zipper: z2, action, role, tree_edit_op: Some(TreeEditOp::WrapInLambda(focus_node_id(z), param)) })
    }

    WrapApp => {
      let hole_id = holes.fresh_hole_id()
      let z2 = { ..z, focus: App(z.focus, Hole(hole_id)) }
      Ok({ zipper: z2, action, role, tree_edit_op: Some(TreeEditOp::WrapInApp(focus_node_id(z))) })
    }

    WrapBop(op) => {
      let hole_id = holes.fresh_hole_id()
      let z2 = { ..z, focus: Bop(op, z.focus, Hole(hole_id)) }
      Ok({ zipper: z2, action, role, tree_edit_op: Some(make_wrap_bop_op(z, op)) })
    }

    UnwrapKeeping(child_idx) => {
      match unwrap_keeping(z, child_idx) {
        Some(z2) => Ok({ zipper: z2, action, role, tree_edit_op: Some(make_unwrap_op(z, child_idx)) })
        None => Err("cannot unwrap: invalid child index or leaf node")
      }
    }

    CommitLeafEdit(new_text) => {
      Ok({ zipper: z, action, role, tree_edit_op: Some(TreeEditOp::CommitEdit(focus_node_id(z), new_text)) })
    }
  }
}
```

### UnwrapKeeping

```moonbit
fn unwrap_keeping(z : Zipper, child_idx : Int) -> Zipper? {
  let children = children_of(z.focus)
  if child_idx >= 0 && child_idx < children.length() {
    Some({ ..z, focus: children[child_idx] })
  } else {
    None
  }
}

fn children_of(term : Term) -> Array[Term] {
  match term {
    Lam(_, body) => [body]
    App(f, a) => [f, a]
    Bop(_, l, r) => [l, r]
    If(c, t, e) => [c, t, e]
    Module(defs, body) => {
      let result : Array[Term] = []
      for def in defs { result.push(def.1) }
      result.push(body)
      result
    }
    _ => []
  }
}
```

**UI behavior:** When the user triggers unwrap on a node with multiple non-trivial children, the UI presents choices. For `App(complex_f, complex_arg)`:
- "Keep function" → `UnwrapKeeping(0)`
- "Keep argument" → `UnwrapKeeping(1)`

If only one child is non-trivial (the rest are Holes or literals), the UI auto-selects the non-trivial child without prompting.

### Text Delta Delegation

`EditResult.tree_edit_op` is passed to the existing `compute_text_edit` pipeline:

```moonbit
// In the integration layer (see Integration section):
match result.tree_edit_op {
  Some(op) => {
    let delta = compute_text_edit(op, edit_context)  // existing function
    sync_editor.apply_text_edit(delta)
  }
  None => ()  // navigation only
}
```

This avoids reimplementing text delta logic. `compute_text_edit` already handles:
- Source text span lookup via SourceMap
- Original text preservation (no reformatting of unchanged subtrees)
- Placeholder text generation
- Error handling for missing spans

---

## Bidirectional Text ↔ Zipper Mapping

### Zipper → ProjNode (structural matching)

Path indices alone are unreliable because ProjNode children and Term children may not correspond 1:1 (error recovery nodes, parser-inserted wrappers). Instead, the bridge uses **structural matching**: walk the ProjNode tree using `same_kind` comparison between `ProjNode.kind` and the Zipper's focus/context siblings.

```moonbit
pub fn find_proj_node_for_focus(
  z : Zipper,
  proj_root : ProjNode[Term],
) -> ProjNode[Term]? {
  // Convert Zipper path to root→focus sequence of Term values
  let trail = zipper_to_trail(z)
  // Walk ProjNode tree, matching each level by same_kind
  walk_matching(proj_root, trail, 0)
}

/// Produces [(root_term, child_index), ..., (parent_term, child_index)]
/// describing the path from root to focus.
fn zipper_to_trail(z : Zipper) -> Array[(Term, Int)] {
  let entries = Array::new()
  let mut current = z
  while true {
    match current.path {
      Nil => break
      Cons(ctx, _) => {
        let idx = ctx_to_child_index(ctx)
        match go_up(current) {
          Some(parent) => {
            entries.push((parent.focus, idx))
            current = parent
          }
          None => break
        }
      }
    }
  }
  entries.rev()
  entries
}

fn walk_matching(
  node : ProjNode[Term],
  trail : Array[(Term, Int)],
  depth : Int,
) -> ProjNode[Term]? {
  if depth >= trail.length() {
    return Some(node)  // reached the target depth
  }
  let (expected_parent, child_idx) = trail[depth]
  // Verify this ProjNode matches the expected parent
  if not(Term::same_kind(node.kind, expected_parent)) {
    return None
  }
  if child_idx < node.children.length() {
    walk_matching(node.children[child_idx], trail, depth + 1)
  } else {
    None
  }
}
```

### Zipper → Text Range

```moonbit
pub fn text_range_from_zipper(
  z : Zipper,
  proj_root : ProjNode[Term],
  source_map : SourceMap,
) -> (Int, Int)? {
  match find_proj_node_for_focus(z, proj_root) {
    Some(proj_node) => source_map.get_range(proj_node.id())
    None => None
  }
}
```

### Text Offset → Zipper

When the user clicks or moves the cursor in the text pane, find the deepest AST node containing that offset, then construct a Zipper focused on it:

```moonbit
pub fn zipper_from_text_offset(
  root : Term,
  proj_root : ProjNode[Term],
  source_map : SourceMap,
  offset : Int,
) -> Zipper? {
  // 1. Find deepest ProjNode whose span contains offset
  let node_id = source_map.node_at_offset(offset)?
  // 2. Compute path from ProjNode root to target
  let indices = path_indices_to_node(proj_root, node_id)?
  // 3. Replay on Term to build Zipper
  focus_at(root, indices)
}
```

`path_indices_to_node` walks the ProjNode tree to find the child index sequence to a given NodeId. `focus_at` replays those indices on the Term via `go_down` + `go_right`.

**This enables:**
- Click in text pane → tree pane highlights corresponding node (Zipper focus)
- Arrow keys in tree pane → text pane highlights corresponding span
- Selection sync: select range in text → deepest containing node highlighted in tree

---

## Path Indices (for Zipper Persistence)

```moonbit
pub fn to_path_indices(z : Zipper) -> Array[Int]
pub fn focus_at(term : Term, indices : Array[Int]) -> Zipper?
pub fn sync_after_roundtrip(old_zipper : Zipper, new_term : Term) -> Zipper?
```

`sync_after_roundtrip` is best-effort: if the tree structure changed incompatibly (child count at some depth is different), it returns `None` and the integration layer clears the Zipper.

Index mapping per context:

| Context | Index |
|---------|-------|
| `CtxLamBody` | 0 |
| `CtxAppFunc` | 0 |
| `CtxAppArg` | 1 |
| `CtxBopLeft` | 0 |
| `CtxBopRight` | 1 |
| `CtxIfCond` | 0 |
| `CtxIfThen` | 1 |
| `CtxIfElse` | 2 |
| `CtxModuleDef(before, ..)` | `before.length()` |
| `CtxModuleBody(defs)` | `defs.length()` |

---

## Framework Boundary: Zipper is Language-Specific

The Zipper is **not** part of the generic framework (`framework/`). It lives in the language package (`lang/lambda/`). Reasons:

1. `TermCtx` is the derivative of `Term` — a different AST enum has a different derivative. There is no generic way to compute the derivative from `TreeNode + Renderable` alone.
2. `TreeEditorState[T]` is framework-level and must not depend on lambda-specific types.
3. `EditAction` variants like `WrapLam(VarName)` are lambda-specific.

The Zipper wraps `TreeEditorState[T]` from outside, rather than being embedded inside it:

```moonbit
/// Lambda-specific editor state that adds Zipper on top of the generic tree editor.
/// Lives in lang/lambda/, not in framework/.
pub struct LambdaEditorState {
  tree_state : TreeEditorState[Term]
  zipper : Zipper?
  hole_registry : HoleRegistry
  action_log : Array[(EditAction, PositionRole)]  // for undo/debugging
}
```

**Acid test:** `framework/` compiles with zero imports from `zipper.mbt` or `TermCtx`.

**Future generalization:** If multiple languages need Zippers, a `Zippable` trait or code generator (`loomgen`) can produce `TermCtx` and navigation functions from a grammar definition. This is out of scope for this plan.

---

## Integration with Existing Architecture

### Edit Dispatch

```moonbit
fn on_tree_key(
  state : LambdaEditorState,
  action : EditAction,
  sync_editor : SyncEditor[Term],
) -> LambdaEditorState {
  let zipper = match state.zipper {
    Some(z) => z
    None => return state
  }

  match apply_action(zipper, action, state.hole_registry) {
    Err(_) => state  // invalid action, no-op

    Ok(result) => {
      // 1. If structural edit, delegate to existing text-delta pipeline
      match result.tree_edit_op {
        Some(op) => {
          let edit_context = EditContext {
            source_text: sync_editor.get_text(),
            source_map: sync_editor.get_source_map(),
            registry: sync_editor.get_registry(),
            flat_proj: sync_editor.get_flat_proj(),
          }
          match compute_text_edit(op, edit_context) {
            Ok(delta) => sync_editor.apply_text_edit(delta.start, delta.old_end, delta.new_text, timestamp_ms)
            Err(_) => ()
          }
        }
        None => ()  // navigation only
      }

      // 2. Log the action
      let log = state.action_log.copy()
      log.push((result.action, result.role))

      // 3. Sync Zipper to reparsed AST
      let new_term = sync_editor.get_ast()
      let synced = match new_term {
        Some(term) => sync_after_roundtrip(result.zipper, term)
        None => None
      }

      // 4. Register hole metadata after reconcile (if a hole was created)
      match result.action {
        Delete | WrapApp | WrapBop(_) => {
          // The hole now has a stable NodeId from reconcile.
          // Find it via Zipper position in ProjNode tree and register.
          register_new_holes(state.hole_registry, synced, sync_editor)
        }
        _ => ()
      }

      {
        tree_state: state.tree_state,  // updated via TreeEditorState::refresh separately
        zipper: synced,
        hole_registry: state.hole_registry,
        action_log: log,
      }
    }
  }
}
```

### Collapsed Node Interaction

`Move(Down)` into a collapsed subtree: `LambdaEditorState` checks `tree_state.collapsed_nodes`, expands the node first, then applies the navigation.

### Keyboard Mapping (Phase 4)

```
↑  →  EditAction::Move(Up)
↓  →  EditAction::Move(Down)       — expand if collapsed
←  →  EditAction::Move(Left)
→  →  EditAction::Move(Right)

Enter       →  EditAction::CommitLeafEdit or start inline editing
Delete/Bksp →  EditAction::Delete
Escape      →  zipper = None
```

Context menu items are generated from `EditAction` values filtered by `position_role`:
```moonbit
fn available_actions(z : Zipper) -> Array[EditAction] {
  let role = position_role(z)
  let actions : Array[EditAction] = [Delete, WrapLam("x"), WrapApp]
  // Filter by role — e.g. WrapBop only if in expression position
  // Add UnwrapKeeping(i) for each child index if focus is non-leaf
  let n = children_of(z.focus).length()
  for i in 0..<n {
    actions.push(UnwrapKeeping(i))
  }
  actions
}
```

---

## What Changes

### Prerequisite change to Term

With TermSym already landed, adding `Hole(Int)` requires updating only the TermSym
boundary — not every exhaustive match site.

| File | Change |
|------|--------|
| `loom/examples/lambda/src/ast/term.mbt` | Add `Hole(Int)` variant to `Term` enum |
| `loom/examples/lambda/src/ast/sym.mbt` | Add `hole(Int) -> Self` to `TermSym` trait |
| `loom/examples/lambda/src/ast/sym.mbt` | Add `hole` arm to `replay` (one new match arm) |
| `loom/examples/lambda/src/ast/sym.mbt` | Add `Pretty::hole` impl: `{ repr: "_" }` |
| `loom/examples/lambda/src/ast/sym.mbt` | Add `Term::hole` impl: `Hole(n)` |
| `loom/examples/lambda/src/parser/` | Parser recognizes `_` as `Hole` token (fresh ID on each parse) |
| `lang/lambda/traits/traits_term.mbt` | Add `Hole` cases to `TreeNode` and `Renderable` impls |

**Note:** `print_term` in `ast.mbt` is already a one-liner wrapper over `replay` after the
TermSym migration — it picks up `Hole` for free once `Pretty::hole` is implemented.
All other `TermSym` implementations (e-graph builder, future type checker) get a
compile error on the missing `hole` method, self-documenting what to add.

### New files

All zipper files land directly in `lang/lambda/zipper/` — their final location after
framework extraction. No second move required.

| File | Purpose |
|------|---------|
| `lang/lambda/zipper/zipper.mbt` | `Zipper`, `TermCtx`, `plug`, navigation, path indices, `sync_after_roundtrip` |
| `lang/lambda/zipper/zipper_action.mbt` | `EditAction`, `Direction`, `EditResult`, `apply_action`, `unwrap_keeping`, `children_of` |
| `lang/lambda/zipper/zipper_role.mbt` | `PositionRole`, `position_role`, `available_actions` |
| `lang/lambda/zipper/zipper_hole.mbt` | `HoleInfo`, `HoleRegistry` (keyed by NodeId) |
| `lang/lambda/zipper/zipper_bridge.mbt` | `find_proj_node_for_focus`, `text_range_from_zipper`, `zipper_from_text_offset` |
| `lang/lambda/zipper/zipper_wbtest.mbt` | White-box tests |
| `lang/lambda/lambda_editor_state.mbt` | `LambdaEditorState` wrapper (Zipper + TreeEditorState[Term] + HoleRegistry) |

### Modified files

| File | Change |
|------|--------|
| (none in `TreeEditorState`) | Zipper is in `LambdaEditorState`, not in `TreeEditorState[T]` |

### Unchanged

- `framework/editor/tree_editor_model.mbt` — `TreeEditorState[T]` unchanged, no Zipper field
- `framework/editor/sync_editor*.mbt` — Zipper goes through existing `compute_text_edit` path
- `editor/tree_edit_bridge.mbt` — existing round-trip unchanged
- `framework/core/reconcile.mbt` — reconciliation unchanged
- `lang/lambda/flat/flat_proj.mbt` — FlatProj unchanged (already moved in Phase 2)
- `lang/lambda/edits/text_edit.mbt` — `compute_text_edit` reused, not reimplemented
- `event-graph-walker/` — CRDT untouched
- `loom/loom/` — parser framework untouched

### Dependencies

```
lang/lambda/zipper/zipper.mbt        → @ast.Term, @ast.Bop, @ast.VarName (only)
lang/lambda/zipper/zipper_action.mbt → zipper.mbt, @lambda_edits.TreeEditOp
lang/lambda/zipper/zipper_role.mbt   → zipper.mbt
lang/lambda/zipper/zipper_hole.mbt   → @framework_core.NodeId
lang/lambda/zipper/zipper_bridge.mbt → zipper.mbt, @framework_core.ProjNode[Term], @framework_core.SourceMap
lang/lambda/lambda_editor_state.mbt  → all of the above + @framework_editor.TreeEditorState[Term]
```

No dependency on `SyncEditor`, CRDT, or loom internals from zipper files. `LambdaEditorState` depends on `SyncEditor[Term]` for the integration dispatch only.

---

## Testing Strategy

### Navigation round-trips

```moonbit
test "go_down then go_up is identity" { ... }
test "go_right then go_left is identity" { ... }
test "traverse all children of If" { ... }
test "go_down on leaf returns None" { ... }
test "go_down on Hole returns None" { ... }
test "Module navigation: defs then body" { ... }
test "Module with empty defs: go_down focuses body" { ... }
```

### Position roles

```moonbit
test "root position" {
  let z = from_root(Int(42))
  inspect!(position_role(z), content="Root")
}

test "function position in App" {
  let z = from_root(App(Var("f"), Int(1)))
    |> go_down() |> Option::unwrap()
  inspect!(position_role(z), content="FunctionPosition")
}

test "else branch in If" {
  let z = from_root(If(Int(1), Int(2), Int(3)))
    |> go_down() |> Option::unwrap()
    |> go_right() |> Option::unwrap()
    |> go_right() |> Option::unwrap()
  inspect!(position_role(z), content="ElseBranch")
}

test "let definition role carries name" {
  let z = from_root(Module([("x", Int(1))], Var("x")))
    |> go_down() |> Option::unwrap()
  inspect!(position_role(z), content="LetDefinition(\"x\")")
}
```

### Edit actions

```moonbit
test "Delete creates Hole and produces TreeEditOp" {
  let holes = HoleRegistry::new()
  let z = from_root(Bop(Plus, Int(1), Int(2)))
    |> go_down() |> Option::unwrap()
  let result = apply_action(z, Delete, holes).unwrap()
  // focus is Hole(_)
  match result.zipper.focus { Hole(_) => (); _ => abort("expected Hole") }
  // role was OperandLeft(Plus)
  inspect!(result.role, content="OperandLeft(Plus)")
  // tree_edit_op is Some(Delete(...))
  inspect!(result.tree_edit_op.is_empty(), content="false")
}

test "WrapLam produces correct structure" {
  let holes = HoleRegistry::new()
  let z = from_root(Int(42))
  let result = apply_action(z, WrapLam("x"), holes).unwrap()
  inspect!(to_root(result.zipper), content="Lam(\"x\", Int(42))")
}

test "Move returns no tree_edit_op" {
  let holes = HoleRegistry::new()
  let z = from_root(App(Var("f"), Int(1)))
  let result = apply_action(z, Move(Down), holes).unwrap()
  inspect!(result.tree_edit_op.is_empty(), content="true")
}

test "UnwrapKeeping(0) keeps first child" {
  let holes = HoleRegistry::new()
  let z = from_root(App(Var("f"), Int(1)))
  let result = apply_action(z, UnwrapKeeping(0), holes).unwrap()
  inspect!(to_root(result.zipper), content="Var(\"f\")")
}

test "UnwrapKeeping(1) keeps second child" {
  let holes = HoleRegistry::new()
  let z = from_root(App(Var("f"), Int(1)))
  let result = apply_action(z, UnwrapKeeping(1), holes).unwrap()
  inspect!(to_root(result.zipper), content="Int(1)")
}

test "UnwrapKeeping on leaf returns Err" {
  let holes = HoleRegistry::new()
  let z = from_root(Int(42))
  inspect!(apply_action(z, UnwrapKeeping(0), holes).is_err(), content="true")
}
```

### Hole lifecycle

```moonbit
test "hole metadata survives round-trip via NodeId" {
  // 1. Create hole via Delete
  // 2. print_term → "_"
  // 3. Simulate reparse → new Hole(new_id)
  // 4. reconcile preserves NodeId
  // 5. HoleRegistry.get(node_id) returns original metadata
}
```

### Bidirectional mapping

```moonbit
test "find_proj_node_for_focus uses structural matching" { ... }
test "text_range_from_zipper returns correct span" { ... }
test "zipper_from_text_offset finds deepest node" { ... }
test "structural matching survives error recovery nodes" { ... }
```

### Path indices

```moonbit
test "to_path_indices and focus_at round-trip" { ... }
test "sync_after_roundtrip preserves position when structure unchanged" { ... }
test "sync_after_roundtrip returns None when structure changed incompatibly" { ... }
```

### Edge cases

- `apply_action` with `Move(Up)` at root → `Err`
- `UnwrapKeeping(5)` with only 2 children → `Err`
- `sync_after_roundtrip` when child count changed → `None`
- `zipper_from_text_offset` at whitespace between nodes → nearest enclosing node
- `find_proj_node_for_focus` when ProjNode has error recovery children not in Term → graceful fallback

---

## What's NOT in Scope

- **Tile/shard decomposition** — no text-like input in tree pane (reviewed tylr, deferred)
- **Structural undo implementation** — `EditAction` as data enables it, but the undo manager integration is a separate plan
- **Collaborative structural conflict resolution** — `EditAction` + `PositionRole` provide the data, but eg-walker TransformOp integration is a separate plan
- **Type checker** — `HoleRegistry` reserves space for expected types, but type inference is not part of this plan
- **Module-level list surgery** — `insert_def_after`, `remove_def`, `reorder_def` deferred
- **Generic Zipper[T]** — the Zipper is defined on `Term`. Each grammar needs its own context type. Generalization via codegen is a future concern
- **Reimplementing `compute_text_edit`** — the Zipper produces `TreeEditOp` values and delegates text delta computation to the existing pipeline

## Open Questions (To Resolve Before Implementation)

1. **Hole in parser:** Adding `Hole(Int)` to `Term` requires the parser to recognize `_` as a hole token. Should the parser assign sequential IDs or always use ID 0? **Recommendation:** always use 0. The parser doesn't have a global counter. The actual ID is irrelevant — `reconcile` will assign a stable `NodeId`, which is what `HoleRegistry` keys on.

2. **EditAction serialization format:** For eg-walker TransformOp integration (future), EditActions need a wire format. **Recommendation:** defer. Define `ToJson`/`FromJson` when the sync protocol needs it.

3. **SourceMap.node\_at\_offset:** The current SourceMap stores `NodeId → Range`. The inverse lookup (`offset → NodeId`) may need an interval tree or sorted array for O(log n) performance. **Recommendation:** check if this already exists in `source_map.mbt`. If not, add a sorted-span index during SourceMap construction.

4. **Hole rendering in tree pane:** How should `Hole(3)` appear in the tree editor? **Recommendation:** use role-specific placeholder from `HoleInfo.role` for tree pane (e.g. `<body>`, `<condition>`), plain `_` for text pane.

5. **LambdaEditorState location:** Should `lambda_editor_state.mbt` live in `projection/` or in `lang/lambda/` (after framework extraction)? **Recommendation:** `projection/` for now. Move to `lang/lambda/` during Phase 2 package extraction.

## Implementation Order

1. **Add `Hole(Int)` to Term** — prerequisite change to AST, parser, print\_term, trait impls
2. **`projection/zipper.mbt`** — `Zipper`, `TermCtx`, `plug`, navigation, path indices, `to_root`, `from_root`, `sync_after_roundtrip`
3. **`projection/zipper_role.mbt`** — `PositionRole`, `position_role`
4. **`projection/zipper_hole.mbt`** — `HoleInfo`, `HoleRegistry` (NodeId-keyed, with prune)
5. **`projection/zipper_action.mbt`** — `EditAction`, `Direction`, `EditResult`, `apply_action` (delegates to `TreeEditOp`, no `compute_text_edit` reimplementation)
6. **`projection/zipper_bridge.mbt`** — bidirectional text ↔ Zipper mapping (structural matching, not path-index-only)
7. **`projection/zipper_wbtest.mbt`** — all tests
8. **`projection/lambda_editor_state.mbt`** — `LambdaEditorState` wrapper
9. **Integration** — keyboard dispatch, collapsed-node interception, HoleRegistry pruning in refresh

Steps 1-8 are additive — no existing code modified except `Term` (step 1). Step 9 wires everything together.
