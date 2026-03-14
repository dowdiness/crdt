///|
test "deferred_full_cycle_timed skips projection work on no-op input" {
  let source = "let x = 0 in x"
  let session = BenchmarkSession::new(source)
  let measurement = session.deferred_full_cycle_timed(source)
  inspect(session.projection_dirty(), content="false")
  inspect(measurement.phases[0].0, content="text_input_ms")
  inspect(measurement.phases[1], content="(\"get_proj_node_ms\", 0)")
  inspect(measurement.phases[2], content="(\"get_source_map_ms\", 0)")
  inspect(measurement.phases[3], content="(\"tree_refresh_ms\", 0)")
}
