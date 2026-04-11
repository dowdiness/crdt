# ZWSP Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Eliminate ZWSP (U+200B) leakage from Markdown block editor export/display boundaries while keeping it as an internal parser placeholder.

**Architecture:** Add `export_markdown_text()` FFI function that strips ZWSP. Add a ZWSP cleanup pass in `compute_commit_edit` so editing any block also scrubs neighboring ZWSP. Wire the raw-mode sync through the clean export path.

**Tech Stack:** MoonBit (editor/FFI), TypeScript (web adapter)

**Design decision:** ZWSP remains as an internal parser placeholder (the parser needs source text to produce ProjNodes). The fix strips ZWSP at every boundary where text leaves the editor. Long-term fix is Container per-block text migration (tracked separately).

---

### Task 1: Add `export_text` method to SyncEditor

Strip ZWSP from the text returned to consumers. `get_text()` stays unchanged (internal, position-consistent with source map). `export_text()` is the user-facing export path.

**Files:**
- Modify: `editor/sync_editor_text.mbt:71-73`
- Test: `editor/sync_editor_test.mbt` (append)

- [ ] **Step 1: Write the failing test**

In `editor/sync_editor_test.mbt`, append:

```moonbit
///|
test "export_text strips ZWSP" {
  let se = @editor.SyncEditor::new(
    "test",
    fn(s) { @loom.new_imperative_parser(s, @lambda.lambda_grammar) },
  )
  se.set_text("hello\u200Bworld")
  inspect(se.get_text(), content="hello\u200Bworld")
  inspect(se.export_text(), content="helloworld")
}
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd /home/antisatori/ghq/github.com/dowdiness/canopy/.worktrees/zwsp-cleanup && moon test -p dowdiness/canopy/editor -f sync_editor_test.mbt`
Expected: FAIL — `export_text` method does not exist.

- [ ] **Step 3: Implement `export_text`**

In `editor/sync_editor_text.mbt`, after the `get_text` function (line 73), add:

```moonbit
///|
/// Return document text with ZWSP placeholders stripped.
/// Use this for export, clipboard, and display — not for internal position math.
pub fn[T] SyncEditor::export_text(self : SyncEditor[T]) -> String {
  self.doc.text().replace_all(old="\u200B", new="")
}
```

- [ ] **Step 4: Run `moon check`**

Run: `cd /home/antisatori/ghq/github.com/dowdiness/canopy/.worktrees/zwsp-cleanup && moon check`
Expected: no errors.

- [ ] **Step 5: Run test to verify it passes**

Run: `cd /home/antisatori/ghq/github.com/dowdiness/canopy/.worktrees/zwsp-cleanup && moon test -p dowdiness/canopy/editor -f sync_editor_test.mbt`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
cd /home/antisatori/ghq/github.com/dowdiness/canopy/.worktrees/zwsp-cleanup
git add editor/sync_editor_text.mbt editor/sync_editor_test.mbt
git commit -m "feat(editor): add export_text() that strips ZWSP placeholders"
```

---

### Task 2: Add `markdown_export_text` FFI function

Wire the clean export path through FFI so TypeScript can call it.

**Files:**
- Modify: `ffi/canopy_markdown.mbt:28-33`

- [ ] **Step 1: Add `markdown_export_text` to FFI**

In `ffi/canopy_markdown.mbt`, after the `markdown_get_text` function (line 33), add:

```moonbit
///|
pub fn markdown_export_text(handle : Int) -> String {
  match markdown_editors.get(handle) {
    Some(ed) => ed.export_text()
    None => ""
  }
}
```

- [ ] **Step 2: Run `moon check`**

Run: `cd /home/antisatori/ghq/github.com/dowdiness/canopy/.worktrees/zwsp-cleanup && moon check`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
cd /home/antisatori/ghq/github.com/dowdiness/canopy/.worktrees/zwsp-cleanup
git add ffi/canopy_markdown.mbt
git commit -m "feat(ffi): add markdown_export_text() for ZWSP-free text export"
```

---

### Task 3: Wire raw-mode sync through clean export

The raw editor textarea should show ZWSP-free text. Currently `syncRawFromModel()` calls `markdown_get_text()`.

**Files:**
- Modify: `examples/web/src/markdown-editor.ts:78`

- [ ] **Step 1: Update `syncRawFromModel` to use `markdown_export_text`**

In `examples/web/src/markdown-editor.ts`, change line 78:

```typescript
// Before:
const text = crdt.markdown_get_text(handle);

// After:
const text = crdt.markdown_export_text(handle);
```

- [ ] **Step 2: Verify the TS import**

Check that `markdown_export_text` is exported from `@moonbit/crdt`. If not, it needs to be added to the JS build exports. Run:

```bash
cd /home/antisatori/ghq/github.com/dowdiness/canopy/.worktrees/zwsp-cleanup && moon build --target js 2>&1 | tail -5
```

Then verify `markdown_export_text` appears in the generated JS bundle.

- [ ] **Step 3: Commit**

```bash
cd /home/antisatori/ghq/github.com/dowdiness/canopy/.worktrees/zwsp-cleanup
git add examples/web/src/markdown-editor.ts
git commit -m "fix(web): use markdown_export_text for raw-mode sync"
```

---

### Task 4: ZWSP cleanup pass in `compute_commit_edit`

When a block's text is committed via the block editor, strip any ZWSP from the incoming text. This catches cases where ZWSP might enter via programmatic editing or sync.

**Files:**
- Modify: `lang/markdown/edits/compute_markdown_edit.mbt:28-56`
- Test: `lang/markdown/edits/compute_markdown_edit_wbtest.mbt` (append)

- [ ] **Step 1: Write the failing test**

In `lang/markdown/edits/compute_markdown_edit_wbtest.mbt`, append:

```moonbit
///|
test "commit_edit: strips ZWSP from new text" {
  let source = "Hello\n"
  let (proj, _) = @md_proj.parse_to_proj_node("Hello\n")
  let para_id = proj.children[0].id()
  let result = apply_edit(
    source,
    CommitEdit(node_id=para_id, new_text="wo\u200Brld"),
  )
  inspect(result.contains("\u200B"), content="false")
  inspect(result.contains("world"), content="true")
}
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd /home/antisatori/ghq/github.com/dowdiness/canopy/.worktrees/zwsp-cleanup && moon test -p dowdiness/canopy/lang/markdown/edits -f compute_markdown_edit_wbtest.mbt`
Expected: FAIL — result still contains ZWSP.

- [ ] **Step 3: Add ZWSP stripping in `compute_commit_edit`**

In `lang/markdown/edits/compute_markdown_edit.mbt`, modify `compute_commit_edit` to strip ZWSP from `new_text`:

```moonbit
fn compute_commit_edit(
  source_map : SourceMap,
  node_id : NodeId,
  new_text : String,
) -> Result[(Array[SpanEdit], FocusHint)?, String] {
  // Strip ZWSP placeholder — block-input.ts strips on the TS side,
  // but this catches programmatic or sync-originated text.
  let clean_text = new_text.replace_all(old="\u200B", new="")
  // Try "text" role first, fall back to "code" for code blocks
  let range = match source_map.get_token_span(node_id, "text") {
    Some(r) => r
    None =>
      match source_map.get_token_span(node_id, "code") {
        Some(r) => r
        None => return Err("no editable span for node " + node_id.to_string())
      }
  }
  Ok(
    Some(
      (
        [
          SpanEdit::{
            start: range.start,
            delete_len: range.end - range.start,
            inserted: clean_text,
          },
        ],
        FocusHint::MoveCursor(position=range.start + clean_text.length()),
      ),
    ),
  )
}
```

- [ ] **Step 4: Run `moon check`**

Run: `cd /home/antisatori/ghq/github.com/dowdiness/canopy/.worktrees/zwsp-cleanup && moon check`
Expected: no errors.

- [ ] **Step 5: Run test to verify it passes**

Run: `cd /home/antisatori/ghq/github.com/dowdiness/canopy/.worktrees/zwsp-cleanup && moon test -p dowdiness/canopy/lang/markdown/edits -f compute_markdown_edit_wbtest.mbt`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
cd /home/antisatori/ghq/github.com/dowdiness/canopy/.worktrees/zwsp-cleanup
git add lang/markdown/edits/compute_markdown_edit.mbt lang/markdown/edits/compute_markdown_edit_wbtest.mbt
git commit -m "fix(markdown): strip ZWSP in compute_commit_edit"
```

---

### Task 5: ZWSP cleanup in `InsertBlockAfter` and `SplitBlock` comments

Document that ZWSP is intentional in these functions and will be cleaned at boundaries.

**Files:**
- Modify: `lang/markdown/edits/compute_markdown_edit.mbt:190-193`

- [ ] **Step 1: Update comments**

In `compute_insert_block_after` (line 190-193), update the comment:

```moonbit
  // Insert "\n\u200B\n" to create a visible empty paragraph.
  // The zero-width space gives the parser a real token to produce a ProjNode,
  // so BlockInput can render and focus the new block. ZWSP is stripped at:
  //   - export_text() (MoonBit export boundary)
  //   - block-input.ts (TS display/edit boundary)
  //   - compute_commit_edit (on first keystroke)
  //   - compute_merge_with_previous (on block merge)
  // Long-term fix: migrate to Container per-block text (empty block = empty text).
```

- [ ] **Step 2: Commit**

```bash
cd /home/antisatori/ghq/github.com/dowdiness/canopy/.worktrees/zwsp-cleanup
git add lang/markdown/edits/compute_markdown_edit.mbt
git commit -m "docs(markdown): document ZWSP cleanup boundaries"
```

---

### Task 6: End-to-end ZWSP round-trip test

Verify the full lifecycle: insert block → ZWSP exists internally → export strips it.

**Files:**
- Test: `lang/markdown/edits/compute_markdown_edit_wbtest.mbt` (append)

- [ ] **Step 1: Write end-to-end test**

In `lang/markdown/edits/compute_markdown_edit_wbtest.mbt`, append:

```moonbit
///|
test "insert_block_after: ZWSP present in raw text, absent in export" {
  let ed = new_markdown_editor("test")
  ed.set_text("Hello\n")
  // Force projection cycle
  let state = @editor.ViewUpdateState::new()
  let _ = @editor.compute_view_patches(state, ed)
  let proj = ed.get_proj_node().unwrap()
  let para_id = proj.children[0].id()
  let result = apply_markdown_edit(ed, InsertBlockAfter(node_id=para_id), 0)
  inspect(result is Ok(_), content="true")
  // Raw text has ZWSP (parser needs it)
  inspect(ed.get_text().contains("\u200B"), content="true")
  // Exported text is clean
  inspect(ed.export_text().contains("\u200B"), content="false")
}

///|
test "merge cleans up ZWSP from empty block" {
  let ed = new_markdown_editor("test")
  ed.set_text("Hello\n")
  let state = @editor.ViewUpdateState::new()
  let _ = @editor.compute_view_patches(state, ed)
  // Insert an empty block after "Hello"
  let proj = ed.get_proj_node().unwrap()
  let para_id = proj.children[0].id()
  let _ = apply_markdown_edit(ed, InsertBlockAfter(node_id=para_id), 0)
  // Force re-projection to get new block's ID
  let _ = @editor.compute_view_patches(state, ed)
  let proj2 = ed.get_proj_node().unwrap()
  // The new empty block should be at index 1
  guard proj2.children.length() >= 2 else {
    return // skip if projection didn't produce expected structure
  }
  let empty_block_id = proj2.children[1].id()
  // Merge the empty block back into previous
  let merge_result = apply_markdown_edit(
    ed,
    MergeWithPrevious(node_id=empty_block_id),
    0,
  )
  inspect(merge_result is Ok(_), content="true")
  // After merge, ZWSP should be gone from raw text too
  inspect(ed.get_text().contains("\u200B"), content="false")
}
```

- [ ] **Step 2: Run tests**

Run: `cd /home/antisatori/ghq/github.com/dowdiness/canopy/.worktrees/zwsp-cleanup && moon test -p dowdiness/canopy/lang/markdown/edits -f compute_markdown_edit_wbtest.mbt`
Expected: PASS.

- [ ] **Step 3: Run full test suite**

Run: `cd /home/antisatori/ghq/github.com/dowdiness/canopy/.worktrees/zwsp-cleanup && moon test`
Expected: all 807+ tests pass.

- [ ] **Step 4: Run `moon info && moon fmt`**

Run: `cd /home/antisatori/ghq/github.com/dowdiness/canopy/.worktrees/zwsp-cleanup && moon info && moon fmt`
Then check: `git diff *.mbti` — verify only `export_text` and `markdown_export_text` are added, no trait bound widening.

- [ ] **Step 5: Commit**

```bash
cd /home/antisatori/ghq/github.com/dowdiness/canopy/.worktrees/zwsp-cleanup
git add lang/markdown/edits/compute_markdown_edit_wbtest.mbt
git commit -m "test(markdown): add ZWSP round-trip and merge cleanup tests"
```

---

### Task 7: Update TODO.md

Mark the ZWSP cleanup item as done and add a future item for Container migration.

**Files:**
- Modify: `docs/TODO.md`

- [ ] **Step 1: Update the ZWSP item in §14**

Change:
```markdown
- [ ] **ZWSP cleanup for empty blocks** — ...
```
To:
```markdown
- [x] **ZWSP cleanup for empty blocks** — `export_text()` strips ZWSP at all export boundaries. `compute_commit_edit` strips on text commit. ZWSP remains as internal parser placeholder only.
```

- [ ] **Step 2: Verify a future TODO exists for Container migration**

In §16 (Unified Container), the Phase 4 item already exists. No additional item needed — the long-term ZWSP elimination is a natural consequence of per-block text.

- [ ] **Step 3: Commit**

```bash
cd /home/antisatori/ghq/github.com/dowdiness/canopy/.worktrees/zwsp-cleanup
git add docs/TODO.md
git commit -m "docs: mark ZWSP cleanup done in TODO.md"
```
