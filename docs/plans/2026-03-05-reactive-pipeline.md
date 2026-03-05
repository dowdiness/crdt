# Reactive Pipeline Integration Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace `ParsedEditor`'s manual dirty-flag + string-diff caching with loom's `ReactiveParser`, eliminating `parse_dirty`, `cached_text`, `cached_errors`, and `reparse()`; then update the loom submodule and migrate from `AstNode` to `Term` throughout.

**Architecture:** Two phases. Phase 1 (Tasks 1–5): swap `ImperativeParser` for `ReactiveParser` using committed loom (`98b9e0b`), keeping `AstNode` as the return type — tests remain green throughout. Phase 2 (Tasks 6–13): advance loom to `b3b573a`, which removes `AstNode`/`AstKind` and `syntax_node_to_ast_node`; add `ToJson` to `Term`; update `to_dot` for `Term`; migrate `ParsedEditor`, `projection/tree_editor.mbt`, tests, and `crdt.mbt`.

**Tech Stack:** MoonBit, `dowdiness/loom` (`ReactiveParser`, `new_reactive_parser`), `dowdiness/lambda` (`lambda_grammar`, `SyntaxNode`, `syntax_node_to_term`), `dowdiness/lambda/ast` (`Term`)

**Note on prior work:** PR #15 already completed the `event-graph-walker` API hardening migration (SyncMessage/Version). The `editor.mbt` and `parsed_editor.mbt` already have `apply_sync`, `export_all`, `export_since`, `get_version`. This plan does NOT re-do that work.

---

## Reference: Key APIs

**Committed loom (`98b9e0b`) — `@parser` package:**
```moonbit
pub fn new_imperative_parser(String) -> @incremental.ImperativeParser[@seam.SyntaxNode]
pub fn new_reactive_parser(str, grammar) -> @pipeline.ReactiveParser[Ast]   // NEW in this loom
pub let lambda_grammar : @loom.Grammar[@token.Token, @syntax.SyntaxKind, @seam.SyntaxNode]
pub fn syntax_node_to_ast_node(@seam.SyntaxNode, Ref[Int]) -> @ast.AstNode   // still exists
pub fn syntax_node_to_term(@seam.SyntaxNode) -> @ast.Term                    // also exists
pub fn collect_errors(@ast.AstNode) -> Array[String]                         // still exists
pub fn has_errors(@ast.AstNode) -> Bool                                      // still exists
```

**New loom (`b3b573a`) — `@parser` package (after AstNode removal):**
```moonbit
pub fn new_reactive_parser(str, grammar) -> @pipeline.ReactiveParser[Ast]
pub let lambda_grammar : @loom.Grammar[@token.Token, @syntax.SyntaxKind, @seam.SyntaxNode]
pub fn syntax_node_to_term(@seam.SyntaxNode) -> @ast.Term   // only converter
// REMOVED: syntax_node_to_ast_node, collect_errors, has_errors, parse_with_error_recovery
```

**`@loom.ReactiveParser[Ast]`:**
```moonbit
pub fn[Ast : Eq] new_reactive_parser(source, grammar) -> ReactiveParser[Ast]
pub fn[Ast] ReactiveParser::set_source(self, source : String) -> Unit    // O(1) equality check
pub fn[Ast : Eq] ReactiveParser::term(self) -> Ast                       // memoized; O(1) on hit
pub fn[Ast] ReactiveParser::diagnostics(self) -> Array[String]           // memoized via cst_memo
```

**`@ast` package — committed loom:**
```moonbit
pub struct AstNode { kind: AstKind; ... } derive(ToJson, FromJson)
pub enum AstKind { ... }
pub enum Term { Int(Int); Var(String); Lam(String, Term); App(Term, Term); Bop(Bop, Term, Term);
                 If(Term, Term, Term); Let(String, Term, Term) }  // no ToJson yet
pub fn node_to_term(AstNode) -> Term
pub fn print_ast_node(AstNode) -> String
pub fn print_term(Term) -> String
```

**`@ast` package — new loom (AstNode removed):**
```moonbit
pub enum Term { Int(Int); Var(String); Lam(String, Term); App(Term, Term); Bop(Bop, Term, Term);
                If(Term, Term, Term); Let(String, Term, Term); Error(String) }  // Error added
pub fn print_term(Term) -> String
// REMOVED: AstNode, AstKind, print_ast_node, node_to_term
```

---

## Phase 1 — ReactiveParser (committed loom, AstNode preserved)

### Task 1: Add `dowdiness/loom` dependency to `editor/moon.pkg`

**Files:**
- Modify: `editor/moon.pkg`

**Step 1: Read the current file**

**Step 2: Add `"dowdiness/loom" @loom` to the import block**

```moonbit
import {
  "dowdiness/event-graph-walker/text",
  "dowdiness/lambda" @parser,
  "dowdiness/lambda/ast" @ast,
  "dowdiness/loom" @loom,
  "dowdiness/loom/core" @loom_core,
  "moonbitlang/core/quickcheck",
}

options(
  is_main: false,
)
```

**Step 3: Run `moon check`**

```bash
moon check
```
Expected: `Finished.` — no errors (loom is a path dependency already in `moon.mod.json`).

**Step 4: Commit**

```bash
git add editor/moon.pkg
git commit -m "chore(editor): add dowdiness/loom dependency for ReactiveParser"
```

---

### Task 2: Write the failing test

**Files:**
- Modify: `editor/parsed_editor_test.mbt`

**Step 1: Add this test at the end of the file:**

```moonbit
///|
test "ReactiveParser: get_ast() twice without text change does not re-parse" {
  let pe = ParsedEditor::new("agent1")
  try! pe.insert("x + 1")
  let ast1 = pe.get_ast()
  let ast2 = pe.get_ast() // second call — must hit cache, not re-parse
  inspect(@ast.print_ast_node(ast1), content="(x + 1)")
  inspect(@ast.print_ast_node(ast2), content="(x + 1)")
}
```

**Step 2: Run the test to confirm it passes with the old implementation**

```bash
moon test --filter "ReactiveParser"
```

If it passes: note that this test documents the invariant and will be updated in Phase 2 when `print_term` replaces `print_ast_node`.

**Step 3: Commit the test**

```bash
git add editor/parsed_editor_test.mbt
git commit -m "test(editor): add ReactiveParser idempotency invariant test"
```

---

### Task 3: Replace the `ParsedEditor` struct and constructor

**Files:**
- Modify: `editor/parsed_editor.mbt` (lines 1–30)

**Step 1: Read `editor/parsed_editor.mbt`**

**Step 2: Replace the struct and `new` constructor**

Replace from `pub struct ParsedEditor` through the closing `}` of `ParsedEditor::new`:

```moonbit
// ParsedEditor: Integration of CRDT text editor with reactive parser
// Combines Editor (CRDT text) and ReactiveParser (AST) using loom's Signal/Memo pipeline

///|
/// ParsedEditor wraps the CRDT editor and a ReactiveParser.
/// Lazy AST evaluation is handled by the Signal/Memo pipeline — no manual
/// dirty flags needed. Call set_source after any text mutation.
pub struct ParsedEditor {
  editor : Editor // CRDT text editor
  parser : @loom.ReactiveParser[@parser.SyntaxNode] // Reactive incremental parser
}

///|
/// Create a new ParsedEditor with the given agent ID
pub fn ParsedEditor::new(agent_id : String) -> ParsedEditor {
  let editor = Editor::new(agent_id)
  let parser = @loom.new_reactive_parser("", @parser.lambda_grammar)
  { editor, parser }
}
```

**Step 3: Run `moon check`**

```bash
moon check
```
Expected: compilation errors in the methods that reference the removed fields — fixed in Tasks 4–5.

**Step 4: Commit**

```bash
git add editor/parsed_editor.mbt
git commit -m "refactor(editor): replace ImperativeParser struct with ReactiveParser"
```

---

### Task 4: Rewrite mutation methods

**Files:**
- Modify: `editor/parsed_editor.mbt`

**Pattern:** Every mutation that previously set `parse_dirty = true` now calls `self.parser.set_source(self.editor.get_text())`. `ReactiveParser.set_source` does an equality check — identical text is a no-op.

**Step 1: Replace all mutation methods** (insert, delete, backspace, move_cursor, get_cursor, get_text, mark_dirty, apply_sync):

```moonbit
///|
pub fn ParsedEditor::insert(self : ParsedEditor, text : String) -> Unit raise {
  self.editor.insert(text)
  self.parser.set_source(self.editor.get_text())
}

///|
pub fn ParsedEditor::delete(self : ParsedEditor) -> Bool {
  let result = self.editor.delete()
  if result {
    self.parser.set_source(self.editor.get_text())
  }
  result
}

///|
pub fn ParsedEditor::backspace(self : ParsedEditor) -> Bool {
  let result = self.editor.backspace()
  if result {
    self.parser.set_source(self.editor.get_text())
  }
  result
}

///|
pub fn ParsedEditor::move_cursor(self : ParsedEditor, position : Int) -> Unit {
  self.editor.move_cursor(position)
}

///|
pub fn ParsedEditor::get_cursor(self : ParsedEditor) -> Int {
  self.editor.get_cursor()
}

///|
pub fn ParsedEditor::get_text(self : ParsedEditor) -> String {
  self.editor.get_text()
}

///|
/// Notify the parser that text changed (e.g. after undo/redo on the raw doc).
/// Calls set_source — a no-op if the text is unchanged.
pub fn ParsedEditor::mark_dirty(self : ParsedEditor) -> Unit {
  self.parser.set_source(self.editor.get_text())
}

///|
pub fn ParsedEditor::apply_sync(
  self : ParsedEditor,
  msg : @text.SyncMessage,
) -> Unit raise {
  self.editor.apply_sync(msg)
  self.parser.set_source(self.editor.get_text())
}
```

**Step 2: Run `moon check`**

```bash
moon check
```
Expected: remaining errors only in the read methods (`get_ast`, `get_errors`, `is_parse_valid`, `reparse`) — fixed next.

**Step 3: Commit**

```bash
git add editor/parsed_editor.mbt
git commit -m "refactor(editor): replace dirty-flag mutations with set_source calls"
```

---

### Task 5: Rewrite read methods and delete `reparse`

**Files:**
- Modify: `editor/parsed_editor.mbt`

**Step 1: Delete `reparse()` entirely.**

**Step 2: Replace `get_ast`, `get_errors`, `is_parse_valid` with:**

```moonbit
///|
/// Get the AST (lazy — recomputes only if source changed since last call).
/// Returns @ast.AstNode for compatibility with current callsites.
pub fn ParsedEditor::get_ast(self : ParsedEditor) -> @ast.AstNode {
  let syntax_node = self.parser.term()
  let counter = Ref::new(0)
  @parser.syntax_node_to_ast_node(syntax_node, counter)
}

///|
/// Get parse errors from the current source (memoized via cst_memo).
pub fn ParsedEditor::get_errors(self : ParsedEditor) -> Array[String] {
  self.parser.diagnostics()
}

///|
/// Check if the current parse tree is valid (no errors).
pub fn ParsedEditor::is_parse_valid(self : ParsedEditor) -> Bool {
  self.parser.diagnostics().is_empty()
}
```

**Keep the sync wrappers** (`get_version`, `export_all`, `export_since`) unchanged — they were added by PR #15.

**Step 3: Run `moon check`**

```bash
moon check
```
Expected: `Finished.` — zero errors.

**Step 4: Run `moon test`**

```bash
moon test
```
Expected: `Total tests: N, passed: N, failed: 0`.

If snapshot tests fail, update them:
```bash
moon test --update
```

**Step 5: Verify no dirty-flag references remain**

```bash
grep -rn "parse_dirty\|cached_text\|cached_errors\|fn reparse\|ImperativeParser" editor/
```
Expected: no output.

**Step 6: Regenerate interfaces and format**

```bash
moon info && moon fmt
git diff editor/*.mbti  # verify: parse_dirty/cached_*/ast/reparse removed; parser field type changed
```

**Step 7: Commit**

```bash
git add editor/parsed_editor.mbt editor/*.mbti
git commit -m "refactor(editor): replace ImperativeParser dirty-flags with ReactiveParser Signal/Memo

Remove parse_dirty, cached_text, cached_errors, ast fields and reparse().
ReactiveParser.set_source() is called after each mutation; term() and
diagnostics() are memoized — no manual cache invalidation needed.

Implements Design §2 Strategy A."
```

---

## Phase 2 — AstNode→Term Migration (loom submodule update)

### Task 6: Advance loom submodule to `b3b573a`

**Files:**
- Modify: `loom` submodule (git pointer)

**Background:** Commit `b3b573a` ("feat(ast): replace Term::Var sentinels with Term::Error") is the latest loom commit. It builds on `6561d58` ("refactor(lambda): remove AstNode/AstKind"). After this update, the `@parser` package loses `syntax_node_to_ast_node`, `collect_errors`, `has_errors`; and `@ast` loses `AstNode`, `AstKind`, `print_ast_node`, `node_to_term`.

**Step 1: Advance loom to the target commit**

```bash
cd loom
git fetch origin main
git checkout b3b573a
cd ..
```

**Step 2: Run `moon check` — expect failures**

```bash
moon check 2>&1 | grep "not found\|Value\|Type" | head -20
```
Expected failures:
- `syntax_node_to_ast_node` → no longer in `@parser`
- `collect_errors` → no longer in `@parser`
- `has_errors` → no longer in `@parser`
- `@ast.AstNode` → no longer in `@ast`
- `@ast.AstKind` → no longer in `@ast`
- `@ast.print_ast_node` → no longer in `@ast`
- `@parser.to_dot` → still takes `AstNode` but `AstNode` is gone

These are fixed in Tasks 7–12.

**Note:** Do NOT commit the submodule pointer yet — wait until all errors are fixed (Task 13).

---

### Task 7: Add `ToJson` to `Term` in loom

**Files:**
- Modify: `loom/examples/lambda/src/ast/` (find the file defining `Term`)

**Step 1: Find where `Term` is defined**

```bash
grep -rn "pub.*enum Term" loom/examples/lambda/src/
```

**Step 2: Add `derive(ToJson)` to the `Term` enum**

Find the line:
```moonbit
pub(all) enum Term {
```
and add `derive(ToJson)` (the existing `derive` may already have `Eq, Show`):
```moonbit
pub(all) enum Term {
  Int(Int)
  Var(String)
  Lam(String, Term)
  App(Term, Term)
  Bop(Bop, Term, Term)
  If(Term, Term, Term)
  Let(String, Term, Term)
  Error(String)
} derive(Eq, Show, ToJson)
```

**Step 3: Run `moon check` inside loom**

```bash
cd loom && moon check && cd ..
```
Expected: no errors in loom itself.

**Step 4: Regenerate loom interfaces**

```bash
cd loom && moon info && cd ..
```

**Step 5: Commit inside the loom submodule**

```bash
cd loom
git add examples/lambda/src/ast/
git commit -m "feat(ast): add ToJson to Term for crdt JSON bridge"
cd ..
```

---

### Task 8: Update `@parser` to add `to_dot` for `Term`

**Files:**
- Modify: `loom/examples/lambda/src/dot_node.mbt` (or wherever `to_dot` is defined)

**Step 1: Find `to_dot` in loom**

```bash
grep -rn "pub fn to_dot\|fn to_dot" loom/examples/lambda/src/
```

**Step 2: Read the current `to_dot` implementation**

The current implementation takes `@ast.AstNode`. Read it to understand the pattern.

**Step 3: Add a `term_to_dot` function that accepts `@ast.Term`**

Pattern-match on `Term` variants and recursively build DOT graph nodes. Use the same DOT format as the existing `to_dot`.

```moonbit
///|
/// Render a Term as a GraphViz DOT string.
pub fn term_to_dot(term : @ast.Term) -> String {
  let nodes = Buffer::new()
  let edges = Buffer::new()
  let counter = Ref::new(0)
  fn node_id() -> Int {
    let id = counter.val
    counter.val = counter.val + 1
    id
  }
  fn render(t : @ast.Term, parent_id : Int?) -> Int {
    let id = node_id()
    let label = match t {
      Int(n) => "Int(\{n})"
      Var(s) => "Var(\{s})"
      Lam(s, _) => "Lam(\{s})"
      App(..) => "App"
      Bop(op, ..) => "Bop(\{op})"
      If(..) => "If"
      Let(s, ..) => "Let(\{s})"
      Error(msg) => "Error(\{msg})"
    }
    nodes.write_string("  n\{id} [label=\"\{label}\"];\n")
    match parent_id {
      Some(pid) => edges.write_string("  n\{pid} -> n\{id};\n")
      None => ()
    }
    match t {
      Lam(_, body) => { let _ = render(body, Some(id)); () }
      App(f, a) => { let _ = render(f, Some(id)); let _ = render(a, Some(id)); () }
      Bop(_, l, r) => { let _ = render(l, Some(id)); let _ = render(r, Some(id)); () }
      If(c, t2, e) => {
        let _ = render(c, Some(id))
        let _ = render(t2, Some(id))
        let _ = render(e, Some(id))
        ()
      }
      Let(_, v, body) => { let _ = render(v, Some(id)); let _ = render(body, Some(id)); () }
      _ => ()
    }
    id
  }
  let _ = render(term, None)
  "digraph \{\n\{nodes.to_string()}\{edges.to_string()}\}"
}
```

Adjust the exact DOT format to match whatever the existing `to_dot` produces (so JS rendering still works).

**Step 4: Regenerate loom interfaces and run tests**

```bash
cd loom && moon info && moon test && cd ..
```

**Step 5: Commit inside loom**

```bash
cd loom
git add examples/lambda/src/dot_node.mbt
git commit -m "feat(lambda): add term_to_dot for Term-based AST visualization"
cd ..
```

---

### Task 9: Update `editor/parsed_editor.mbt` — switch to `Term`

**Files:**
- Modify: `editor/parsed_editor.mbt`

**Changes:**
- `get_ast()`: change return type from `@ast.AstNode` to `@ast.Term`; use `syntax_node_to_term` instead of `syntax_node_to_ast_node`
- `get_errors()` and `is_parse_valid()`: already use `parser.diagnostics()` — no change needed

**Step 1: Replace `get_ast`**

```moonbit
///|
/// Get the AST as a Term (lazy — recomputes only if source changed since last call).
pub fn ParsedEditor::get_ast(self : ParsedEditor) -> @ast.Term {
  let syntax_node = self.parser.term()
  @parser.syntax_node_to_term(syntax_node)
}
```

**Step 2: Run `moon check`**

```bash
moon check 2>&1 | head -30
```
Expected: errors in callers of `get_ast()` that expected `@ast.AstNode` — `parsed_editor_test.mbt`, `crdt.mbt`, `projection/`. Fixed in Tasks 10–12.

**Step 3: Commit**

```bash
git add editor/parsed_editor.mbt
git commit -m "refactor(editor): switch get_ast() to return Term via syntax_node_to_term"
```

---

### Task 10: Update `editor/parsed_editor_test.mbt`

**Files:**
- Modify: `editor/parsed_editor_test.mbt`

**Changes:** Every call to `@ast.print_ast_node(ast)` → `@ast.print_term(ast)`. The snapshot content strings need updating.

**Step 1: Replace all `@ast.print_ast_node` calls with `@ast.print_term`**

```bash
# Confirm scope
grep -n "print_ast_node\|print_term" editor/parsed_editor_test.mbt
```

Do a global replacement in the file: `@ast.print_ast_node` → `@ast.print_term`.

**Step 2: Run tests and update snapshots**

```bash
moon test --filter editor 2>&1 | head -40
moon test --update
```

Verify the snapshot content strings match `print_term` output format (e.g., `"(x + 1)"` becomes the `Term` show format — confirm by reading `@ast.print_term` for a few cases).

**Step 3: Commit**

```bash
git add editor/parsed_editor_test.mbt
git commit -m "test(editor): update parsed_editor tests to use print_term (Term API)"
```

---

### Task 11: Update `crdt.mbt` — switch to `Term`

**Files:**
- Modify: `crdt.mbt`

**Changes:**
- `get_ast_json`: `ast.to_json()` now works since `Term` has `ToJson` (added in Task 7)
- `get_ast_dot`: `@parser.to_dot(ast)` → `@parser.term_to_dot(ast)` (added in Task 8)

**Step 1: Read `crdt.mbt` and find the two affected functions**

**Step 2: Update `get_ast_json`**

The call `ed.get_ast().to_json().stringify()` now works since `Term` derives `ToJson`.
No code change needed here — just verify it compiles.

**Step 3: Update `get_ast_dot`**

```moonbit
pub fn get_ast_dot(_handle : Int) -> String {
  match editor.val {
    Some(ed) => {
      let ast = ed.get_ast()
      @parser.term_to_dot(ast)
    }
    None => "digraph { }"
  }
}
```

**Step 4: Run `moon check`**

```bash
moon check
```
Expected: remaining errors only in `projection/` — fixed next.

**Step 5: Commit**

```bash
git add crdt.mbt
git commit -m "refactor: switch get_ast_dot to term_to_dot after AstNode removal"
```

---

### Task 12: Migrate `projection/` from `AstNode`/`AstKind` to `Term`

**Files:**
- Modify: `projection/types.mbt`
- Modify: `projection/tree_editor.mbt`
- Modify: `projection/canonical_model_wbtest.mbt`
- Read: `projection/lens.mbt`, `projection/canonical_model.mbt`

**Background:** `projection/tree_editor.mbt` uses `AstNode { kind: AstKind, children: Array[AstNode] }` as a tree to build `InteractiveTree`. With `Term`, the tree IS the `Term` enum — a recursive algebraic type.

**Step 1: Read all projection files**

```bash
cat projection/types.mbt
cat projection/tree_editor.mbt
cat projection/canonical_model.mbt
cat projection/lens.mbt
```

**Step 2: Update `projection/types.mbt`**

The `using @ast {type AstNode, type AstKind}` line uses removed types. Replace with `using @ast {type Term}`:

```moonbit
using @ast { type Term }
```

Update any type aliases or re-exports that referenced `AstNode`/`AstKind` to use `Term`.

**Step 3: Rewrite `tree_editor.mbt`**

Key structural changes:
- `TreeNode { kind: AstKind; ... }` → `TreeNode { term: Term; ... }` (or keep `kind` but express it via `Term` variant)
- `from_ast_node(node: AstNode)` → `from_term(term: Term)`
- `get_node_label(kind: AstKind)` → `get_node_label(term: Term)` using match
- `collect_all_ids_from_ast(node: AstNode)` → `collect_all_ids_from_term(term: Term)`
- `is_leaf_node(kind: AstKind)` → `is_leaf_node(term: Term)` — leaf nodes are `Int`, `Var`, `Error`
- `can_merge_node(source: AstKind, target: AstKind)` → `can_merge_node(source: Term, target: Term)`

The label mapping (replacing `get_node_label`):
```moonbit
fn get_node_label(term : @ast.Term) -> String {
  match term {
    Int(n) => "Int(\{n})"
    Var(s) => s
    Lam(s, _) => "λ\{s}"
    App(..) => "App"
    Bop(op, ..) => "\{op}"
    If(..) => "if"
    Let(s, ..) => "let \{s}"
    Error(msg) => "Error"
  }
}
```

The `is_leaf_node` replacement:
```moonbit
pub fn is_leaf_node(term : @ast.Term) -> Bool {
  match term {
    Int(_) | Var(_) | Error(_) => true
    _ => false
  }
}
```

**Step 4: Update `projection/canonical_model_wbtest.mbt`**

Replace `@ast.AstKind::Int(_)` pattern matches with `@ast.Term::Int(_)`, etc.

**Step 5: Run `moon check` and `moon test`**

```bash
moon check && moon test
```
Expected: all tests pass. Update snapshots if needed:
```bash
moon test --update
```

**Step 6: Commit**

```bash
git add projection/
git commit -m "refactor(projection): migrate from AstNode/AstKind to Term

Replace all AstNode/AstKind usage with Term pattern matching.
Leaf nodes are Int/Var/Error; labels derived directly from Term variants."
```

---

### Task 13: Commit submodule pointer, interfaces, and final cleanup

**Files:**
- Modify: `moon.pkg` (if needed — `editor/moon.pkg` was already updated in Task 1)
- Modify: `editor/*.mbti`, `crdt/*.mbti` (auto-generated)

**Step 1: Verify all tests pass**

```bash
moon check --deny-warn && moon test
```
Expected: zero warnings, all tests pass.

**Step 2: Verify zero legacy references**

```bash
grep -rn "AstNode\|AstKind\|syntax_node_to_ast_node\|collect_errors\|has_errors\|print_ast_node\|node_to_term\|parse_with_error_recovery" editor/ crdt.mbt projection/ cmd/
```
Expected: no output.

**Step 3: Regenerate interfaces and format**

```bash
moon info && moon fmt
```

**Step 4: Stage submodule pointer**

```bash
git add loom
git status  # should show: modified: loom (new commits)
```

**Step 5: Commit everything**

```bash
git add editor/ projection/ crdt.mbt loom
git commit -m "feat: advance loom submodule and complete AstNode→Term migration

- Loom advanced to b3b573a (Term::Error variant; AstNode removed)
- Term gains ToJson for JSON bridge
- ParsedEditor.get_ast() returns Term via syntax_node_to_term
- projection/ tree_editor rewritten for Term pattern matching
- All tests pass"
```

---

## Success Criteria

**Phase 1:**
1. `grep -rn "parse_dirty\|cached_text\|cached_errors\|fn reparse\|ImperativeParser" editor/` → zero results
2. `moon test` → all tests pass

**Phase 2:**
1. `grep -rn "AstNode\|AstKind\|syntax_node_to_ast_node\|collect_errors\|has_errors" editor/ crdt.mbt projection/ cmd/` → zero results
2. `moon check --deny-warn` → no warnings
3. `moon test` → all tests pass
4. Loom submodule at `b3b573a`

## Dependencies

- **Depends on:** PR #15 Edit Bridge (merged) ✅
- **Depended on by:** Design §3 Unified Editor
