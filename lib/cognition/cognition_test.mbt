///|
test "FileSummary depends on FileText" {
  let store = CognitionStore::new()
  store.set_input(FileText("a.mbt"), Text("hello\nworld"))
  let _ = store.compute(FileSummary("a.mbt"))
  let deps = store.dependencies_of(FileSummary("a.mbt"))
  assert_true(deps.contains(FileText("a.mbt")))
}

///|
test "changing one FileText marks its FileSummary dirty" {
  let store = CognitionStore::new()
  store.set_input(FileText("a.mbt"), Text("hello"))
  let _ = store.compute(FileSummary("a.mbt"))
  store.set_input(FileText("a.mbt"), Text("hello again"))
  inspect(store.is_dirty(FileSummary("a.mbt")), content="true")
}

///|
test "RepoSummary becomes dirty when a FileSummary changes" {
  let store = CognitionStore::new()
  store.set_input(FileText("a.mbt"), Text("hello"))
  let _ = store.compute(FileSummary("a.mbt"))
  let _ = store.compute(RepoSummary)
  store.mark_dirty(FileSummary("a.mbt"))
  inspect(store.is_dirty(RepoSummary), content="true")
}

///|
test "unrelated FileSummary is not recomputed when another file changes" {
  let store = CognitionStore::new()
  store.set_input(FileText("a.mbt"), Text("one"))
  store.set_input(FileText("b.mbt"), Text("two"))
  let _ = store.compute(FileSummary("a.mbt"))
  let _ = store.compute(FileSummary("b.mbt"))
  let _ = store.compute(RepoSummary)
  let a_before = store.recompute_count(FileSummary("a.mbt"))
  let b_before = store.recompute_count(FileSummary("b.mbt"))

  store.set_input(FileText("a.mbt"), Text("one changed"))
  let recomputed = store.recompute_dirty()

  inspect(recomputed.contains(FileSummary("a.mbt")), content="true")
  inspect(recomputed.contains(FileSummary("b.mbt")), content="false")
  inspect(
    store.recompute_count(FileSummary("a.mbt")) == a_before + 1,
    content="true",
  )
  inspect(
    store.recompute_count(FileSummary("b.mbt")) == b_before,
    content="true",
  )
}

///|
test "QueryContext depends on RepoSummary" {
  let store = CognitionStore::new()
  store.set_input(FileText("a.mbt"), Text("hello"))
  let _ = store.compute(FileSummary("a.mbt"))
  let _ = store.compute(RepoSummary)
  let _ = store.compute(QueryContext("what changed?"))
  let deps = store.dependencies_of(QueryContext("what changed?"))
  assert_true(deps.contains(RepoSummary))
}

///|
test "demo trace shows selective recomputation" {
  inspect(
    demo_trace().join("\n"),
    content=(
      #|dirty after src/a.mbt edit: FileSummary(src/a.mbt), RepoSummary, QueryContext(what changed?)
      #|recomputed: FileSummary(src/a.mbt), RepoSummary, QueryContext(what changed?)
      #|FileSummary(src/a.mbt) count: 2
      #|FileSummary(src/b.mbt) count: 1
    ),
  )
}
