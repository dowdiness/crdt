# Lezer-style Incremental Repair: Explanation

## Overview

This document explains what Lezer-style incremental repair is, based on the official Lezer documentation and how it compares to the Wagner-Graham approach currently implemented in this CRDT project.

## What is Lezer?

Lezer is an **incremental LR parser** designed specifically for code editors (developed for CodeMirror 6). It was created by Marijn Haverbeke and focuses on:
- Fast incremental parsing for real-time editor feedback
- Robust error recovery
- Efficient handling of large documents

## Core Concepts of Lezer-style Incremental Repair

### 1. Tree Fragment Caching and Reuse

**The Key Innovation:**
Lezer can "quickly re-parse documents that were slightly changed compared to a previously parsed version by **reusing nodes from the old parse**."

**How it Works:**
- When a document is edited, developers provide **tree fragments** from the previous parse
- These fragments are annotated with information about what changed
- The parser reuses nodes from the cache when they fall outside the changed regions
- Only the affected portions need to be re-parsed

**Example:**
```
Original: let x = 42 + y
Edit:     let x = 42 + z  (changed 'y' to 'z')

Reused:   [let] [x] [=] [42] [+]
Reparsed:                       [z]
```

### 2. Balanced Subtree Structure for Repetitions

**The Technique:**
Lezer represents repetition operators (`+` and `*` in grammar) as **balanced sub-trees** rather than flat lists.

**Why This Matters:**
- Keeps rematching unchanged portions computationally inexpensive
- Enables rapid tree regeneration even for large documents
- Balanced tree structure provides logarithmic access times

**Example:**
```
Traditional: [item1, item2, item3, ..., itemN]  // O(n) to traverse

Lezer:       Tree structure                     // O(log n) to navigate
            /    \
        Subtree  Subtree
        /  \      /  \
     item item  item item
```

### 3. LR Parsing with Selective GLR

**Base Algorithm:**
- Uses **LR (Left-to-Right) parsing**, developed by Donald Knuth (1965)
- Pre-analyzes grammars to create deterministic parsers
- Maps terminal symbols to actions for each parser state

**Handling Ambiguity:**
- When conflicts arise, switches to **GLR (Generalized LR) parsing**
- GLR runs multiple parse paths in parallel
- Requires explicit grammar annotations to prevent performance issues
- Used selectively only at marked ambiguous points

### 4. Error Recovery with Badness Scoring

**Default Behavior:**
Lezer proceeds through malformed text rather than failing strictly - "always keeps parsing, and does so in a way that remains tractable."

**Recovery Strategy:**
Uses GLR-style parallel parsing branches to explore multiple recovery paths simultaneously:
- **Skipping the next token**
- **Inventing valid tokens** for the current state
- **Forcing production completion**

**Badness Scoring:**
Each branch receives a "badness score" that:
- Increases with recovery actions taken
- Decreases asymptotically when consuming tokens normally
- Prunes branches exceeding a threshold multiple of the best branch's badness
- Prevents exponential explosion while maintaining parse continuation

**Result:**
Always produces a syntax tree, even for syntactically incorrect code.

### 5. Contextual Tokenization

**Feature:**
Supports context-dependent token matching, allowing overlapping tokens when they cannot appear in the same grammatical position.

**Implementation:**
Uses **bitsets** to efficiently determine valid tokens for each parse state, preventing wasteful exploration of incompatible token paths.

**Benefit:**
Addresses limitations of strict tokenizer/parser separation found in classical approaches.

### 6. Buffer Trees - Hybrid Memory Structure

**The Problem:**
Need to balance memory efficiency with incremental reuse capabilities.

**Lezer's Solution:**
A hybrid approach combining trees and flat arrays:
- **Coarse structure**: Classical tree for large nodes
- **Fine structure**: Flat typed arrays for smaller nodes (< few thousand characters)

**Buffer Format:**
Small nodes use typed arrays storing **4 sixteen-bit integers per node**:
1. Type
2. Start position
3. End position
4. Child count

Arranged in **pre-order** for efficient traversal.

**Benefits:**
- Optimizes memory overhead
- Improves cache locality
- Allows larger nodes to be effectively reused
- Minimizes copying during tree updates

### 7. Post-Order Parser Output

**The Technique:**
Instead of building tree structures immediately, Lezer's parser maintains **"a flat log of the nodes it created"** arranged in **post-order** (children precede parents).

**During GLR State Splits:**
- One branch retains the existing array
- Another receives a new empty array plus a pointer to the previous array's state and length
- **No node copying needed** - only the shallow state stack requires duplication

**Benefit:**
Extremely efficient state forking for parallel parsing branches.

## Limitations of Incremental Parsing

Even Lezer acknowledges that **"even a tiny document change...can require a big part of the document to be re-parsed"**, particularly with structural changes like:
- Adding/removing comment markers
- Changing bracket/brace nesting
- Modifying string delimiters

**Viewport Optimization:**
The complexity of re-tokenization is bounded by the distance between the change and the visible viewport. Since changes typically occur within the visible area, most edits remain tractable.

## Architecture Details

### Parser Generation

**Offline Compilation:**
- Parser tables are generated offline
- Compiled into JavaScript modules
- Separates expensive compilation from runtime parsing

**Runtime:**
- Lightweight runtime handles actual parsing operations
- Pre-computed tables enable fast state transitions

**Benefits:**
- Parser table compression and deduplication keep generated parsers comparably sized to hand-written alternatives
- Startup cost is minimal for editors

### Performance Optimizations

1. **Balanced Subtrees**: Repetition operators (`*`, `+`) maintain shallow, well-balanced syntax trees enabling efficient searching and reuse

2. **Skipped Content Handling**: Whitespace and comments rarely require special handling except when appearing immediately before reductions

3. **Compactness**: Prioritizes both memory efficiency and parsing speed

## Comparison: Lezer vs. Wagner-Graham (This Project)

| Aspect | Lezer | Wagner-Graham (This Project) |
|--------|-------|------------------------------|
| **Algorithm** | LR with selective GLR | Recursive descent |
| **Node Reuse** | Tree fragment caching | Cache-based (token + parse) |
| **Damage Tracking** | Implicit via fragments | Explicit DamageTracker |
| **Structure** | Buffer trees + balanced subtrees | Standard AST |
| **Memory Layout** | Hybrid (tree + flat arrays) | Traditional tree nodes |
| **Error Recovery** | GLR parallel with badness scoring | Panic mode synchronization |
| **Parser Output** | Post-order flat log | Direct tree construction |
| **Grammar** | Configurable via grammar files | Lambda Calculus hardcoded |
| **Generation** | Offline table generation | Runtime parser |
| **Primary Use** | Code editors (CodeMirror 6) | CRDT collaborative editing |

## Key Takeaways

### What Makes Lezer's Incremental Repair Efficient:

1. **Smart Reuse**: Only re-parses damaged regions, reuses everything else via tree fragment caching
2. **Balanced Trees**: Logarithmic navigation for large repeated structures
3. **Buffer Trees**: Hybrid memory layout optimizes both compactness and reuse
4. **Post-Order Output**: Efficient state forking without node copying
5. **Fragment Annotations**: Explicit change information guides reuse decisions
6. **Badness Scoring**: Prunes inefficient error recovery branches
7. **Viewport Optimization**: Bounds re-tokenization by visible area distance
8. **Robust Recovery**: Always produces a tree, never fails completely
9. **Selective Complexity**: Uses expensive GLR only where explicitly needed
10. **Offline Generation**: Pre-computed parser tables for fast runtime

### Similar Concepts in This CRDT Project:

✅ **Already Implemented:**
- Damage tracking to identify what needs reparsing
- Cache-based node reuse (token cache + parse cache)
- Error recovery producing partial trees
- Position adjustment after edits

🔲 **Different Approach:**
- Wagner-Graham algorithm instead of LR
- Explicit damage tracker instead of fragment annotations
- Currently full reparse (TODO at [incremental_parser.mbt:76](parser/incremental_parser.mbt#L76))

## References

- Official Lezer Documentation: https://lezer.codemirror.net/
- Lezer Guide: https://lezer.codemirror.net/docs/guide/
- Lezer Announcement Blog: https://marijnhaverbeke.nl/blog/lezer.html
- Lezer GitHub: https://github.com/lezer-parser/lezer
- Wagner-Graham Paper (1998): "Efficient and Flexible Incremental Parsing" - ACM TOPLAS
- Tree-sitter (similar algorithm): https://tree-sitter.github.io/

## Summary

**Lezer-style incremental repair** is a sophisticated approach to parsing that minimizes the computational cost of keeping a syntax tree up-to-date as a document is edited. It achieves this through:

### Core Mechanisms:

1. **Tree Fragment Reuse**: Caches the syntax tree from previous parses and reuses unaffected nodes
2. **Damage Identification**: Identifies which parts of the tree are affected by edits
3. **Selective Reparsing**: Only re-parses the damaged regions
4. **Balanced Trees**: Uses balanced tree structures for efficient large-document handling
5. **Buffer Trees**: Hybrid memory layout combining trees and flat arrays for optimal performance
6. **Post-Order Output**: Flat log structure enabling zero-copy state forking
7. **Badness-Scored Error Recovery**: Parallel recovery strategies with branch pruning
8. **Viewport Optimization**: Bounds re-tokenization complexity by visible area distance

### Design Philosophy:

- **Always produces a tree** - Never fails on syntax errors
- **Compactness** - Optimizes both memory and speed
- **Selective complexity** - Uses expensive techniques (GLR) only where needed
- **Editor-first** - Designed specifically for the code editor use case

This makes Lezer ideal for real-time code editors where fast, incremental updates and robust error handling are essential for a smooth user experience.
