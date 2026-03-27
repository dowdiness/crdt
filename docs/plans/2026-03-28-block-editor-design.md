# Block Editor: Project Vision

**Date:** 2026-03-28
**Status:** Conceptual design
**Reference:** Thymer (thymer.com) — IDE-like, keyboard-driven, local-first, real-time collaboration

## What We're Building

A block-based document editor for small teams. Local-first, real-time collaboration, no lock-in. Documents are Markdown files on disk, edited as structured blocks in the UI.

Built on Canopy's existing architecture: eg-walker CRDTs, Loom incremental parsing, projectional editing via ProjNode[T], Rabbita UI framework.

## Product Principles

These emerged from our brainstorming and should guide every implementation decision:

1. **Typing is the lowest-friction input.** Block structure emerges from typing (`# `, `- `, ``` ` ` ` ```), not from menus or mode switches. The flow state is sacred.

2. **Trust comes from transparency.** Documents are `.md` files. Open them in vim, grep across them, git diff them. No proprietary format, no lock-in anxiety.

3. **Non-text is additive, never subtractive.** Images, tables, embeds enhance the experience. They never add cognitive or mechanical debt. A user who only knows basic Markdown can use the app without learning anything new.

4. **Structure serves the user, not the architecture.** The user thinks in blocks. The architecture should make block operations (move, nest, convert, delete) feel instant and safe, even under concurrent editing.

## Architecture Direction

### Three layers

```
UI              Renders blocks, handles input, Markdown shortcuts, slash commands
                    |
Document Model  MovableTree CRDT (structure) + FugueMax CRDT (per-block text)
                    |
Serialization   Import/export Markdown files
```

**Document model is the runtime source of truth.** During editing and collaboration, the tree CRDT and per-block text CRDTs are authoritative. Markdown is a serialization format for storage and interchange.

### Why two CRDTs

**Block structure** needs a tree CRDT because block operations (reorder, nest, move) are fundamentally tree mutations. Text cut-and-paste can't safely handle concurrent block moves — Kleppmann's algorithm can. Sibling ordering uses fractional indexing (Loro-style) for conflict-free insertion between blocks.

**Block content** needs text CRDTs because inline editing is fundamentally character-level. Each text-bearing block owns a FugueMax instance from eg-walker. This is what Canopy already does well.

**The joint invariant problem** (what happens when one peer deletes a block while another edits its text?) is an open design question. Possible approaches: tombstone-with-content (preserve edits on deleted blocks), last-writer-wins for deletion, or undo-based conflict surfacing. This needs investigation before implementation.

### Why Markdown serialization

- **No lock-in:** `.md` files work everywhere
- **Interoperability:** Import from Obsidian, Typora, any Markdown tool
- **Git-friendly:** Diffs, history, branching all work naturally
- **Trust signal:** Users can verify their data is portable at any time

**Round-trip expectations:** We target `parse(export(model)) == model` — the model survives a round-trip through Markdown. We do NOT promise `export(import(md)) == md` byte-for-byte, because Markdown has too many equivalent representations (bullet style, fence style, whitespace, etc.). Unsupported syntax is preserved as opaque raw blocks until the user edits them.

### Inline formatting strategy

Start with **Markdown syntax in FugueMax text** — bold is `**text**` in the CRDT, hidden by the UI. This avoids building Peritext (a rich text CRDT) upfront.

Known limitation: concurrent formatting on overlapping ranges can produce syntactically broken Markdown. Loom's error recovery prevents crashes but doesn't preserve intent. This is acceptable for small team use (rare edge case) and can be upgraded to Peritext later if needed.

## Block Types

### Core (standard Markdown)

| Type | Markdown | Notes |
|---|---|---|
| Paragraph | Plain text | Default block type |
| Heading | `# ` through `###### ` | Levels 1-6 |
| List item | `- `, `1. `, `- [ ] ` | Bullet, numbered, todo |
| Quote | `> ` | Nestable |
| Code | ` ``` ` | With language tag; Loom parses for syntax highlighting |
| Divider | `---` | |

### Extended (need Markdown extensions or conventions)

| Type | Serialization | Notes |
|---|---|---|
| Image | `![alt](src)` | Standard Markdown, but rendered as visual block |
| Table | GFM pipe tables | Cell content in text CRDTs — structure TBD |
| Callout | `:::type ... :::` | Directive syntax (common extension) |
| Toggle | TBD | Collapsible — no standard Markdown |
| Embed | TBD | URL preview — no standard Markdown |

Block types without standard Markdown serialization need design decisions about their text representation. These should be deferred until the core block types work.

## How Canopy's Architecture Maps

The key insight: Canopy's incremental hylomorphism pipeline transfers directly. The type parameter changes from `@ast.Term` (lambda calculus) to `BlockType` (document blocks).

```
Document model
    | anamorphism (unfold block tree → ProjNode[BlockType])
ProjNode[BlockType]
    | catamorphism (fold ProjNode → rendered blocks)
UI
```

### What transfers

- **eg-walker / FugueMax** → per-block text CRDT (unchanged)
- **Loom** → incremental parsing for inline Markdown + code syntax highlighting
- **ProjNode[T]** → ProjNode[BlockType] (same generic, new type parameter)
- **TreeEditorState** → block selection, drag-drop, collapsed state
- **EphemeralHub** → peer cursors and presence
- **Rabbita** → block rendering (extend with new renderers)

### What's new

- **MovableTree CRDT** — Kleppmann's algorithm for block structure. This is the biggest new component.
- **FractionalIndex** — sibling ordering. Needs a concrete replicated indexing scheme, not just "insert between two floats."
- **Markdown grammar for Loom** — parse/serialize `.md` files
- **Block renderers** — per-block-type UI components
- **Document type** — unified wrapper coordinating tree CRDT + per-block text CRDTs
- **Cross-CRDT undo** — UndoManager needs to span tree ops + text ops atomically

## Open Questions

These need answers before or during implementation. They are not blockers for starting — they're the hard problems this project exists to solve.

1. **Joint CRDT invariants.** How do tree ops and text ops compose? What happens on concurrent block-delete + text-edit? What's the atomicity model for create-block-with-initial-text?

2. **Undo across CRDTs.** Current UndoManager is single-CRDT. Block-level operations (e.g., "convert paragraph to heading" = set_property + maybe text edit) need atomic undo. What's the transaction boundary?

3. **Split view authority.** Rabbita has a text view + tree view today. A Markdown source pane for the block editor is conceptually similar but mechanically different — it's a serialization of many CRDTs, not a single text CRDT. Is it read-only? Editable (implies a re-import path)? Deferred?

4. **Table data model.** Does a table own one text CRDT (pipe-delimited)? One per cell? Is the table structure part of the tree CRDT or a nested structure inside a single block?

5. **Extended block serialization.** Toggle, embed, and other non-standard blocks need a Markdown convention. Directive syntax (`:::`)? HTML comments? Custom fenced blocks?

6. **Fractional index scheme.** The concrete key representation, tie-break rules for concurrent inserts at the same position, and growth/compaction strategy.

## Non-Goals

- User accounts, permissions, workspaces
- Database/relational features (Notion-style databases)
- Plugin/extension system
- Mobile-native support
- Byte-exact Markdown round-trip

## References

- [Kleppmann — A highly-available move operation for replicated trees](https://martin.kleppmann.com/papers/move-op.pdf)
- [Loro — Movable tree CRDTs and Loro's implementation](https://loro.dev/blog/movable-tree)
- [Made by Evan — CRDT: Mutable Tree Hierarchy](https://madebyevan.com/algos/crdt-mutable-tree-hierarchy/)
- [Thymer](https://thymer.com/) — reference product
- [eg-walker paper](https://arxiv.org/abs/2409.14252)
