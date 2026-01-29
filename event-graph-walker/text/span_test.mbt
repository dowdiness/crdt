///| Tests for TextSpan RLE integration

///|
test "TextSpan::visible creates non-deleted span" {
  let span = @text.TextSpan::visible("hello")
  inspect(span.is_visible(), content="true")
  inspect(span.is_tombstone(), content="false")
  inspect(span.content(), content="hello")
}

///|
test "TextSpan::tombstone creates deleted span" {
  let span = @text.TextSpan::tombstone("deleted")
  inspect(span.is_visible(), content="false")
  inspect(span.is_tombstone(), content="true")
  inspect(span.content(), content="deleted")
}

///|
test "TextSpan HasLength" {
  let span = @text.TextSpan::visible("hello")
  inspect(@rle.HasLength::length(span), content="5")
}

///|
test "TextSpan HasCausalLength - visible span" {
  let span = @text.TextSpan::visible("hello")
  inspect(@rle.HasCausalLength::causal_len(span), content="5")
  inspect(@rle.HasCausalLength::visible_len(span), content="5")
}

///|
test "TextSpan HasCausalLength - tombstone" {
  let span = @text.TextSpan::tombstone("deleted")
  inspect(@rle.HasCausalLength::causal_len(span), content="7")
  inspect(@rle.HasCausalLength::visible_len(span), content="0")
}

///|
test "TextSpan Mergeable - same status can merge" {
  let a = @text.TextSpan::visible("hel")
  let b = @text.TextSpan::visible("lo")
  inspect(@rle.Mergeable::can_merge(a, b), content="true")
  let merged = @rle.Mergeable::merge(a, b)
  inspect(merged.content(), content="hello")
  inspect(merged.is_visible(), content="true")
}

///|
test "TextSpan Mergeable - different status cannot merge" {
  let visible = @text.TextSpan::visible("hello")
  let tombstone = @text.TextSpan::tombstone("world")
  inspect(@rle.Mergeable::can_merge(visible, tombstone), content="false")
}

///|
test "TextSpan Mergeable - tombstones can merge" {
  let a = @text.TextSpan::tombstone("ab")
  let b = @text.TextSpan::tombstone("cd")
  inspect(@rle.Mergeable::can_merge(a, b), content="true")
  let merged = @rle.Mergeable::merge(a, b)
  inspect(merged.content(), content="abcd")
  inspect(merged.is_tombstone(), content="true")
}

///|
test "TextSpan Sliceable" {
  let span = @text.TextSpan::visible("hello")
  let sliced = @rle.Sliceable::slice(span, start=1, end=4)
  inspect(sliced.content(), content="ell")
  inspect(sliced.is_visible(), content="true")
}

///|
test "TextSpan Sliceable - tombstone preserves status" {
  let span = @text.TextSpan::tombstone("deleted")
  let sliced = @rle.Sliceable::slice(span, start=0, end=3)
  inspect(sliced.content(), content="del")
  inspect(sliced.is_tombstone(), content="true")
}

///|
test "Runs[TextSpan] merges adjacent same-status spans" {
  let spans = [
    @text.TextSpan::visible("hel"),
    @text.TextSpan::visible("lo"),
    @text.TextSpan::tombstone("X"),
    @text.TextSpan::visible(" world"),
  ]
  let runs = @rle.Runs::from_array(spans)
  // "hello" merged, "X" separate, " world" separate = 3 runs
  inspect(runs.count(), content="3")
  inspect(runs.len(), content="12") // causal: 5 + 1 + 6
  inspect(runs.visible_len(), content="11") // visible: 5 + 0 + 6
}
