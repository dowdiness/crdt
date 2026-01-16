# Projectional Editing Architecture Plan

## Executive Summary

This plan outlines a **general theoretical architecture** for Projectional Editing that can be applied to any domain, with specific implementation guidance for the Lambda Calculus CRDT Editor. The core insight is treating **projections as lenses** over a canonical model, with **bidirectional transformations** maintaining semantic equivalence (bisimulation).

---

## Part 1: Theoretical Architecture for General Projectional Editing

### 1.1 Core Concepts

#### The Projection Triangle

```
                    ┌─────────────────────┐
                    │   Canonical Model   │
                    │  (Source of Truth)  │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
       ┌──────────┐     ┌──────────┐     ┌──────────┐
       │Projection│     │Projection│     │Projection│
       │  (Text)  │     │  (AST)   │     │(Diagram) │
       └──────────┘     └──────────┘     └──────────┘
```

**Key Principle**: All projections are *derived views* of a single canonical model. Edits in any projection are transformed back to model operations, then propagated to all other projections.

#### Three-Layer Architecture

| Layer | Responsibility | Examples |
|-------|---------------|----------|
| **Model Layer** | Canonical data structure, CRDT operations | AST with unique node IDs, operation log |
| **Lens Layer** | Bidirectional transformations | Text↔AST, Visual↔AST parsers/unparsers |
| **Projection Layer** | UI rendering, user interaction | Text editor, tree visualizer, block editor |

### 1.2 The Lens Abstraction

A **Lens** provides bidirectional transformation between Model and Projection:

```
Lens[M, P] = {
  get:    M → P                    // Model to Projection (render)
  put:    (P, M) → M               // Updated Projection + old Model → new Model
  create: P → M                    // Create Model from Projection
}
```

**Critical Property: Bisimulation**
- `get(put(p, m)) ≈ p` — Editing in projection, then rendering, preserves semantics
- `put(get(m), m) = m` — Rendering then "editing" with same value is identity

### 1.3 Handling Incomplete States

The five problems from Structural Editing require explicit handling:

| Problem | Solution |
|---------|----------|
| **Syntactic malformation** | Error nodes in AST, partial parse trees |
| **Static meaninglessness** | Type-level error markers, deferred validation |
| **Dynamic meaninglessness** | Runtime error annotations, optional validation |
| **Edit action calculus** | Formal operation algebra per projection |
| **Intelligent suggestions** | Context-aware completion based on grammar |

**Key Insight**: The Model must support **incomplete/error states** as first-class citizens.

### 1.4 Edit Action Calculus

Each projection defines its own **edit operations** that map to model operations:

```
Text Projection Operations:
  insert(pos, char) → Model.insertNode / Model.updateLeaf
  delete(pos)       → Model.deleteNode / Model.updateLeaf

AST Projection Operations:
  insertChild(parent, index, node) → Model.insertNode
  deleteNode(node)                 → Model.deleteNode
  replaceNode(old, new)            → Model.replaceNode
  moveNode(node, newParent, index) → Model.moveNode
```

### 1.5 EG-Walker as Bidirectional Transformation Engine

**Key Insight**: The eg-walker algorithm's event graph can be extended to track **transformations between projections**, not just text operations. Each projection edit becomes an event in the causal graph, with cross-projection transformations as derived events.

```
┌────────────────────────────────────────────────────────────────────┐
│              EG-Walker Extended Event Graph                        │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  Event Types:                                                      │
│  ├─ TextOp(insert/delete at position)      ← Text projection      │
│  ├─ ASTOp(insert/delete/replace node)      ← AST projection       │
│  └─ TransformOp(TextOp ↔ ASTOp mapping)    ← Bidirectional link   │
│                                                                    │
│  Causal Graph tracks:                                              │
│  ├─ Which projection originated the edit                          │
│  ├─ Derived operations in other projections                       │
│  └─ Causality across projections (AST edit → derived Text edit)   │
│                                                                    │
│  Benefits:                                                         │
│  ├─ Unified undo/redo across projections                          │
│  ├─ Conflict resolution at projection boundaries                  │
│  ├─ Time-travel debugging (see edit in any projection)            │
│  └─ Collaborative editing with projection awareness               │
└────────────────────────────────────────────────────────────────────┘
```

**Transformation as Causal Events**:

```
User edits in AST projection:
  ASTOp[lv=5, parents=[4]] = InsertNode(λ, body, Var("y"))
                    │
                    ▼ (derived transformation)
  TextOp[lv=6, parents=[5]] = Insert(pos=3, "y")
                    │
                    ▼ (broadcast to peers)
  Remote peer applies TextOp, regenerates AST, reconciles
```

**Why eg-walker for bidirectional transformations?**

1. **Causality Tracking**: The CausalGraph already tracks operation dependencies. Extending it to track "this ASTOp caused this TextOp" is natural.

2. **Conflict Resolution**: When two users edit different projections simultaneously, the event graph can detect and resolve conflicts at the projection boundary.

3. **Time Travel**: The OpLog stores all operations. We can replay history in any projection, seeing how AST changes mapped to text changes.

4. **Undo/Redo**: Instead of per-projection undo, we can undo "logical operations" that span projections.

```moonbit
/// Extended operation for multi-projection CRDT
enum ProjectedOp {
  Text(TextOp)           // Insert/delete in text
  AST(ASTOp)             // Structural AST operation
  Transform {            // Bidirectional link
    source: OpId         // Original operation
    derived: OpId        // Derived operation
    projection: String   // Target projection
  }
}

/// Extended CausalGraph for projections
struct ProjectedCausalGraph {
  graph: CausalGraph                    // Existing eg-walker graph
  transforms: Map[OpId, Array[OpId]]    // source → derived ops
  projection_origins: Map[OpId, String] // Which projection created this op
}
```

### 1.6 CRDT Integration for Collaboration

For collaborative editing with multiple projections:

```
┌──────────────────────────────────────────────────────────────┐
│            EG-Walker Multi-Projection CRDT                   │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Unified OpLog                                       │    │
│  │  ├─ TextOps: FugueMax sequence operations           │    │
│  │  ├─ ASTOps: Structural tree operations              │    │
│  │  └─ TransformOps: Cross-projection links            │    │
│  └─────────────────────────────────────────────────────┘    │
│                           │                                  │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  CausalGraph (extended)                              │    │
│  │  ├─ Parents: causal dependencies                     │    │
│  │  ├─ Transforms: derived operation links              │    │
│  │  └─ Frontiers: per-projection version vectors        │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
└──────────────────────────────────────────────────────────────┘

Network Sync:
  1. Local AST edit → create ASTOp
  2. Derive TextOp via unparse diff
  3. Link with TransformOp
  4. Broadcast TextOp + TransformOp
  5. Remote: apply TextOp, use TransformOp hint for reconciliation
```

---

## Part 2: Architecture for Lambda Calculus Editor

### 2.1 Current State Analysis

The existing codebase has:

| Component | Status | Location |
|-----------|--------|----------|
| Text CRDT | ✅ Complete | `event-graph-walker/document/` |
| Lambda Parser | ✅ Complete | `parser/` |
| AST (TermNode) | ✅ Complete | `parser/term.mbt` |
| AST Visualization | ✅ DOT export | `parser/ast_to_dot.mbt` |
| AST↔CRDT Bridge | 🔶 Partial | `parser/crdt_integration.mbt` |
| Bidirectional Sync | ❌ Missing | — |

### 2.2 Proposed Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        Projection Layer (Web UI)                     │
├─────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────┐  ┌───────────────────────────────┐   │
│  │      Text Editor        │  │   Unified Tree Editor         │   │
│  │    (contenteditable)    │  │   (SVG/Canvas - edit+view)    │   │
│  └───────────┬─────────────┘  └───────────────┬───────────────┘   │
│              │                                │                    │
│              ▼                                ▼                    │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                   Lens Registry                              │   │
│  │  textLens: ProjectedEditor ↔ String                         │   │
│  │  treeLens: ProjectedEditor ↔ InteractiveTree                │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      Model Layer (MoonBit)                          │
├─────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                 ProjectedEditor                              │   │
│  │  ┌──────────────────────────────────────────────────────┐   │   │
│  │  │  CanonicalModel                                       │   │   │
│  │  │  ├─ ast: TermNode (with persistent node IDs)         │   │   │
│  │  │  ├─ source_map: NodeId → (start, end) positions      │   │   │
│  │  │  └─ edit_history: Array[ModelOperation]              │   │   │
│  │  └──────────────────────────────────────────────────────┘   │   │
│  │                                                              │   │
│  │  ┌──────────────────────────────────────────────────────┐   │   │
│  │  │  TextCRDT (event-graph-walker Document)              │   │   │
│  │  │  └─ Synchronized via TextLens                         │   │   │
│  │  └──────────────────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

### 2.3 Core Data Structures

#### CanonicalModel (New)

```moonbit
/// The single source of truth for the program
struct CanonicalModel {
  ast: TermNode                        // Current AST
  node_registry: Map[NodeId, TermNode] // Fast node lookup
  source_map: SourceMap                // NodeId ↔ text positions
  dirty_projections: Set[ProjectionId] // Which projections need update
}

/// Source position mapping
struct SourceMap {
  node_to_range: Map[NodeId, (Int, Int)]  // AST node → text range
  range_to_node: IntervalTree[NodeId]     // text range → AST nodes
}
```

#### ModelOperation (Edit Algebra)

```moonbit
/// Operations on the canonical model
enum ModelOperation {
  InsertNode(parent: NodeId, index: Int, node: TermNode)
  DeleteNode(node_id: NodeId)
  ReplaceNode(node_id: NodeId, new_node: TermNode)
  UpdateLeaf(node_id: NodeId, new_value: LeafValue)
  MoveNode(node_id: NodeId, new_parent: NodeId, new_index: Int)
}

/// Leaf values in AST nodes
enum LeafValue {
  IntValue(Int)
  VarName(String)
  OpSymbol(String)
}
```

#### Lens Trait (Bidirectional Transformation)

```moonbit
/// Generic lens for bidirectional sync
trait Lens[M, P] {
  get(model: M) -> P                    // Render model to projection
  put(projection: P, model: M) -> M     // Apply projection edits to model
  diff(old_p: P, new_p: P) -> Array[ProjectionEdit]  // Compute edits
}

/// Text lens: CanonicalModel ↔ String
struct TextLens { }

impl Lens[CanonicalModel, String] for TextLens {
  fn get(model: CanonicalModel) -> String {
    unparse(model.ast)  // AST → source text
  }

  fn put(text: String, model: CanonicalModel) -> CanonicalModel {
    let new_ast = parse(text)
    reconcile(model.ast, new_ast)  // Preserve node IDs where possible
  }
}

/// Tree lens: CanonicalModel ↔ InteractiveTree
struct TreeLens { }

impl Lens[CanonicalModel, InteractiveTree] for TreeLens {
  fn get(model: CanonicalModel) -> InteractiveTree {
    to_interactive_tree(model.ast, model.source_map)
  }

  fn put(tree: InteractiveTree, model: CanonicalModel) -> CanonicalModel {
    from_interactive_tree(tree)
  }
}
```

#### InteractiveTree (Unified Editor Data Structure)

```moonbit
/// Tree node with editing state for unified editor
struct InteractiveTreeNode {
  id: NodeId                      // Persistent ID from AST
  kind: TermKind                  // Node type
  label: String                   // Display label
  children: Array[InteractiveTreeNode]

  // Editing state
  selected: Bool                  // Currently selected
  editing: Bool                   // Inline editing active
  collapsed: Bool                 // Subtree collapsed
  drop_target: Bool               // Valid drop zone

  // Layout (computed by renderer)
  bounds: Option[Rect]            // Bounding box in canvas
  text_range: (Int, Int)          // Corresponding text range
}

/// Operations available in unified tree editor
enum TreeEditOp {
  // Selection
  Select(node_id: NodeId)
  SelectRange(start: NodeId, end: NodeId)

  // Inline editing
  StartEdit(node_id: NodeId)
  CommitEdit(node_id: NodeId, new_value: String)
  CancelEdit

  // Structural operations
  Delete(node_id: NodeId)
  WrapInLambda(node_id: NodeId, var_name: String)
  WrapInApp(node_id: NodeId)
  InsertChild(parent: NodeId, index: Int, kind: TermKind)

  // Drag and drop
  StartDrag(node_id: NodeId)
  DragOver(target: NodeId, position: DropPosition)
  Drop(source: NodeId, target: NodeId, position: DropPosition)

  // Navigation
  Collapse(node_id: NodeId)
  Expand(node_id: NodeId)
}

enum DropPosition {
  Before      // Insert before target
  After       // Insert after target
  Inside      // Insert as child of target
}
```

### 2.4 Key Algorithms

#### Algorithm 1: Text Edit → Model Update

```
TextEditToModel(old_text, new_text, model):
  1. Compute text diff: edits = diff(old_text, new_text)

  2. For each edit in edits:
     a. Find affected AST nodes via source_map
     b. If edit is within a leaf node (Int, Var):
        - Update leaf value
     c. If edit crosses node boundaries:
        - Reparse affected region
        - Reconcile new AST with old AST (preserve unchanged node IDs)

  3. Update source_map with new positions
  4. Mark AST projection as dirty
  5. Return new model
```

#### Algorithm 2: AST Edit → Model Update

```
ASTEditToModel(ast_operation, model):
  1. Apply operation to model.ast:
     - InsertNode: Add child to parent at index
     - DeleteNode: Remove node and descendants
     - ReplaceNode: Substitute node preserving ID
     - MoveNode: Reparent node

  2. Regenerate source text: new_text = unparse(model.ast)

  3. Compute text diff for CRDT sync

  4. Update source_map

  5. Mark Text projection as dirty

  6. Return new model
```

#### Algorithm 3: AST Reconciliation (Preserve Node IDs)

```
Reconcile(old_ast, new_ast):
  1. If structurally identical:
     - Return old_ast (preserve all IDs)

  2. If same node kind:
     - Keep old node ID
     - Recursively reconcile children
     - Use LCS (Longest Common Subsequence) for child matching

  3. If different structure:
     - Generate new IDs for new nodes
     - Return new_ast with fresh IDs
```

### 2.5 Projection Synchronization Protocol

```
┌──────────┐     edit      ┌──────────────┐    ops     ┌──────────┐
│  Text    │──────────────▶│   Model      │───────────▶│   AST    │
│  Editor  │               │   Layer      │            │  Editor  │
└──────────┘               └──────────────┘            └──────────┘
     ▲                           │                          │
     │                           │                          │
     │      render               │        render            │
     └───────────────────────────┴──────────────────────────┘
```

**Synchronization Rules**:
1. Only ONE projection can be "editing" at a time (focus-based)
2. When projection P₁ edits:
   - Transform edit to ModelOperation
   - Apply to CanonicalModel
   - Mark other projections dirty
3. When projection P₂ renders:
   - Apply lens.get() to get current view
   - Diff with previous view for incremental update

### 2.6 Handling Incomplete States

```moonbit
/// Extended TermKind for incomplete states
enum TermKind {
  // ... existing kinds ...

  // Incomplete states
  Hole                         // Empty placeholder: _
  Error(message: String)       // Parse error
  Partial(expected: String)    // Incomplete input
}

/// Validation levels
enum ValidationLevel {
  Syntactic   // Is it parseable?
  Semantic    // Does it type-check?
  Dynamic     // Will it run without errors?
}
```

---

## Part 3: Implementation Roadmap

### Phase 1: Foundation (Core Infrastructure)

**Files to create/modify**:
- `src/canonical_model.mbt` — CanonicalModel, SourceMap, ModelOperation
- `src/lens.mbt` — Lens trait definition
- `src/text_lens.mbt` — TextLens implementation
- `src/reconcile.mbt` — AST reconciliation algorithm

**Deliverables**:
1. CanonicalModel data structure with node registry
2. SourceMap for bidirectional position mapping
3. ModelOperation enum and application logic
4. TextLens with unparse function

### Phase 2: AST Editing (Structural Operations)

**Files to create/modify**:
- `src/ast_lens.mbt` — ASTLens implementation
- `src/ast_operations.mbt` — AST edit operations
- `parser/unparser.mbt` — AST → source text generation
- `src/projected_editor.mbt` — Unified editor interface

**Deliverables**:
1. ASTLens with interactive AST structure
2. AST operations: insert, delete, replace, move
3. Pretty-printer (unparser) with formatting
4. ProjectedEditor coordinating multiple projections

### Phase 3: Unified Tree Editor (Interactive Visualization)

**Files to create/modify**:
- `crdt/src/crdt.mbt` — Extended FFI for tree operations
- `web/src/tree-editor.ts` — Unified tree editor component
- `web/src/tree-renderer.ts` — SVG/Canvas tree rendering
- `web/src/projection-manager.ts` — Projection synchronization
- `web/src/editor.ts` — Integrate with projection system

**Deliverables**:
1. JavaScript API for tree operations
2. **Unified Tree Editor** that combines visualization + editing:
   - Click node to select/focus
   - Double-click to edit leaf values inline
   - Drag nodes to reorder/reparent
   - Context menu for structural operations (wrap in λ, delete, etc.)
   - Visual feedback during edits (highlight affected regions)
3. Projection manager handling focus and sync
4. Side-by-side Text ↔ Tree view with synchronized cursors

**Unified Tree Editor Design**:
```
┌────────────────────────────────────────────────────────────┐
│  Unified Tree Editor                                        │
├────────────────────────────────────────────────────────────┤
│                                                            │
│              ┌─────┐                                       │
│              │ App │ ← click to select                     │
│              └──┬──┘                                       │
│         ┌──────┴──────┐                                    │
│         ▼             ▼                                    │
│      ┌─────┐      ┌─────┐                                  │
│      │ Lam │      │ Var │ ← double-click to rename         │
│      │ x   │      │  y  │                                  │
│      └──┬──┘      └─────┘                                  │
│         ▼                                                  │
│      ┌─────┐                                               │
│      │ Bop │ ← right-click for context menu                │
│      │  +  │   [Wrap in λ] [Delete] [Copy]                 │
│      └──┬──┘                                               │
│    ┌────┴────┐                                             │
│    ▼         ▼                                             │
│ ┌─────┐  ┌─────┐                                           │
│ │ Var │  │ Int │ ← drag to reorder                         │
│ │  x  │  │  1  │                                           │
│ └─────┘  └─────┘                                           │
│                                                            │
│ [+ Add λ] [+ Add If] [+ Add Op]  ← insertion palette       │
└────────────────────────────────────────────────────────────┘
```

### Phase 4: Advanced Features (Polish)

**Features**:
- Keyboard navigation in tree (arrow keys, Enter to edit)
- Drag-and-drop with drop-zone highlighting
- Selection synchronization (select in text ↔ highlight in tree)
- Undo/redo across projections via eg-walker TransformOps
- Zoom/pan for large trees
- Collapse/expand subtrees

---

## Part 4: Verification Strategy

### Unit Tests

```moonbit
// Test lens laws
test "TextLens roundtrip" {
  let model = create_model("λx.x+1")
  let text = TextLens::get(model)
  let model2 = TextLens::put(text, model)
  assert_eq!(model.ast, model2.ast)
}

test "ASTLens roundtrip" {
  let model = create_model("λx.x+1")
  let ast = ASTLens::get(model)
  let model2 = ASTLens::put(ast, model)
  assert_eq!(TextLens::get(model), TextLens::get(model2))
}

// Test reconciliation preserves IDs
test "reconcile preserves node IDs" {
  let model1 = create_model("λx.x")
  let model2 = edit_text(model1, "λx.x+1")
  // λ and x nodes should keep same IDs
  assert_eq!(model1.node_registry["lam_id"], model2.node_registry["lam_id"])
}
```

### Integration Tests

1. **Text → AST sync**: Edit text, verify AST updates correctly
2. **AST → Text sync**: Edit AST node, verify text regenerates correctly
3. **Roundtrip**: Edit text → view AST → edit AST → view text
4. **CRDT collaboration**: Two users edit different projections simultaneously

### Manual Testing

**Basic Flow**:
1. Open app in browser
2. Type `λx.x+1` in text editor
3. Verify tree visualization updates in real-time
4. Click on a node in tree → verify text cursor moves to corresponding position
5. Double-click on `x` variable → edit inline to `y`
6. Verify text updates to `λy.y+1`

**Structural Editing**:
7. Right-click on `+` node → select "Wrap in λ"
8. Verify tree shows new lambda, text updates to `λy.(λz.y+1)`
9. Drag the `1` node before the `y` node
10. Verify text updates to `λy.(λz.1+y)`

**Error Handling**:
11. Delete text partially: `λx.x+`
12. Verify tree shows Error node for incomplete expression
13. Complete the expression: `λx.x+2`
14. Verify Error node resolves to Int node

**Collaboration Simulation**:
15. Open two browser windows
16. Edit text in window 1 → verify tree updates in window 2
17. Edit tree in window 2 → verify text updates in window 1

---

## Key Design Decisions Summary

| Decision | Rationale |
|----------|-----------|
| **AST as canonical model** | Richer than text, enables structural operations |
| **Text CRDT for collaboration** | Leverage existing FugueMax implementation |
| **Lens abstraction** | Clean separation, extensible to new projections |
| **Node ID preservation** | Enables AST-level collaboration, cursor stability |
| **Lazy projection updates** | Performance: only render visible projections |
| **Error nodes in AST** | First-class incomplete states, no invalid states |

---

## Confirmed Design Decisions

Based on user input:

| Decision | Choice | Implication |
|----------|--------|-------------|
| **Canonical model** | AST-first | AST is truth, text is derived via unparser |
| **CRDT granularity** | Text CRDT only | Keep existing FugueMax, regenerate AST per-peer |
| **Error handling** | Error nodes | Invalid regions become `TermKind::Error` nodes |

### Architecture Consequence

```
┌─────────────────────────────────────────────────────────────┐
│                   AST (Canonical Model)                     │
│  TermNode with persistent NodeIds, supports Error nodes     │
└────────────────────────┬────────────────────────────────────┘
                         │
         ┌───────────────┴───────────────┐
         │                               │
         ▼                               ▼
┌─────────────────┐             ┌─────────────────┐
│   TextLens      │             │   TreeLens      │
│   (unparse)     │             │   (identity+)   │
└────────┬────────┘             └────────┬────────┘
         │                               │
         ▼                               ▼
┌─────────────────┐             ┌─────────────────────────┐
│   Text CRDT     │◀───sync────▶│   Unified Tree Editor   │
│   (FugueMax)    │             │   (View + Edit in one)  │
└─────────────────┘             └─────────────────────────┘
```

**Data flow**:
1. AST edit → unparse → text diff → CRDT ops → broadcast
2. Remote CRDT ops → apply → reparse → reconcile AST (preserve IDs)
3. Text edit → parse → reconcile AST → update AST editor
