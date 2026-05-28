// Coordinator-owned workspace-memo lifecycle API — §P0b Phase 1b.
// See docs/superpowers/specs/2026-05-28-p0b-workspace-memo-lifecycle-api-design.md.
//
// Collapses the smoke test's manual `watch` + N×`register_dep` +
// N×`unregister_dep` + `dispose` choreography into two calls, with
// register/unregister symmetry owned by the handle.

///|
/// Owns a registered workspace memo's `Watch` (the GC root) and the exact
/// deduplicated edge list it registered. `dispose` replays those edges through
/// `unregister_dep` so register/unregister symmetry is structurally guaranteed
/// — the consumer never names the edges twice.
pub struct WorkspaceMemoHandle[T] {
  coordinator : Coordinator
  memo_id : @incr.CellId
  watch : @incr.Watch[T]
  deps : Array[(EditorId, @incr.CellId)]
}

///|
/// Validates every declared dep (editor alive + cell in that editor's
/// protected surface), then watches+primes `memo` and registers each edge.
/// All-or-nothing: a rejected dep leaves zero coordinator-state delta.
///
/// Both guards `abort` because they signal programming defects, not runtime
/// conditions (mirroring `register_editor`'s stance):
/// - empty `deps` — a workspace memo with no cross-editor dependency has no
///   gateway role; watch a plain `@incr.Derived` directly instead.
/// - double-registration — `register_dep` is set-like, so a second handle over
///   the same memo id would have its gateway protection stripped by the first
///   handle's dispose.
pub fn[T] Coordinator::register_workspace_memo(
  self : Coordinator,
  memo : @incr.Derived[T],
  deps : Array[(EditorId, @incr.CellId)],
) -> Result[WorkspaceMemoHandle[T], AbortReport] {
  guard !deps.is_empty() else {
    abort(
      "Coordinator::register_workspace_memo: a workspace memo needs at least one dep — watch a plain @incr.Derived directly instead",
    )
  }
  let memo_id = memo.id()
  guard self.deps.get(memo_id) is None else {
    abort(
      "Coordinator::register_workspace_memo: memo already registered — a memo may be registered at most once",
    )
  }
  let distinct : Array[(EditorId, @incr.CellId)] = []
  for d in deps {
    if !distinct.contains(d) {
      distinct.push(d)
    }
  }
  // Validate all, mutate nothing. P1: the not-in-surface case has no surface
  // entry to read a label from, so `cell_label` stays unset — do not invent one.
  for d in distinct {
    let editor_id = d.0
    let cell_id = d.1
    let reg = match self.editors.get(editor_id.0) {
      Some(r) => r
      None =>
        return Err(
          AbortReport(
            kind=EditorDestroyed,
            editor_id~,
            agent_id="<unknown>",
            cell_id~,
          ),
        )
    }
    guard reg.alive.val else {
      return Err(
        AbortReport(
          kind=EditorDestroyed,
          editor_id~,
          agent_id=reg.agent_id,
          cell_id~,
        ),
      )
    }
    guard reg.protected_reads.any(fn(p) { p.cell_id == cell_id }) else {
      return Err(
        AbortReport(
          kind=CellNotInProtectedSurface,
          editor_id~,
          agent_id=reg.agent_id,
          cell_id~,
        ),
      )
    }
  }
  // Establish the GC root. P2: `Watch::read` has no `raise` clause — a cycle is
  // surfaced as `Err`, not a throw — so there is nothing to dispose-on-raise.
  let w = memo.watch()
  let _ = w.read()
  for d in distinct {
    self.register_dep(memo_id, d.0, d.1)
  }
  Ok({ coordinator: self, memo_id, watch: w, deps: distinct })
}

///|
/// Delegates to the underlying watch. A cycle surfaces as `Err(CycleError)`.
pub fn[T] WorkspaceMemoHandle::read(
  self : WorkspaceMemoHandle[T],
) -> Result[T, @incr.CycleError] {
  self.watch.read()
}

///|
/// The memo's `@incr.CellId` — the id `register_dep` keyed the edges under.
pub fn[T] WorkspaceMemoHandle::id(
  self : WorkspaceMemoHandle[T],
) -> @incr.CellId {
  self.memo_id
}

///|
/// Unregisters every edge this handle registered, then disposes the watch.
/// Idempotent: a second call is a no-op (guarded by `watch.is_disposed()`).
pub fn[T] WorkspaceMemoHandle::dispose(self : WorkspaceMemoHandle[T]) -> Unit {
  guard !self.watch.is_disposed() else { return }
  for d in self.deps {
    self.coordinator.unregister_dep(self.memo_id, d.0, d.1)
  }
  self.watch.dispose()
}
