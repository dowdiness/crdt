///|
test "parse_step_measurement parses subprocess output" {
  let parsed = parse_step_measurement(
    "MEASUREMENT total_ms=12\nPHASE text_input_ms=3\nPHASE tree_refresh_ms=9",
  )
  inspect(parsed.total_ms, content="12")
  inspect(
    parsed.phases,
    content="[(\"text_input_ms\", 3), (\"tree_refresh_ms\", 9)]",
  )
}

///|
test "run_case times out before warmup when no budget remains" {
  let result = run_case(
    {
      scenario: "large",
      label: "deferred text input only",
      operation: DeferredTextInput,
      iterations: 1,
      timeout_ms: Some(0),
    },
    benchmark_source(80, "0"),
    benchmark_source(80, "1"),
  )
  inspect(result.timed_out, content="true")
  inspect(result.completed, content="0")
}
