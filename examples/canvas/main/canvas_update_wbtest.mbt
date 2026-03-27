///|
fn make_test_state() -> CanvasState {
  {
    viewport: { x: 0.0, y: 0.0, scale: 1.0 },
    nodes: [
      { id: NodeId(1), x: 100.0, y: 100.0, w: 200.0, h: 100.0, kind: NodeKind::Shape("#8250df") },
      { id: NodeId(2), x: 400.0, y: 200.0, w: 150.0, h:  80.0, kind: NodeKind::Text("hello") },
    ],
    interaction: {
      dragging:     None,
      panning:      None,
      selected:     None,
      pointer_down: false,
      did_move:     false,
    },
  }
}

///|
test "pan_start records start screen position and current pan" {
  let state = make_test_state()
  let s = update_pan_start(state, 150.0, 250.0)
  guard s.interaction.panning is Some(p)
  inspect(p.start_screen_x, content="150")
  inspect(p.start_screen_y, content="250")
  inspect(p.start_pan_x, content="0")
  inspect(p.start_pan_y, content="0")
  inspect(s.interaction.pointer_down, content="true")
  inspect(s.interaction.did_move, content="false")
}

///|
test "pan_move translates viewport by delta from start" {
  let state = make_test_state()
  let s0 = update_pan_start(state, 100.0, 100.0)
  // Move pointer to (160, 140) → delta (60, 40)
  let s1 = update_pan_move(s0, 160.0, 140.0)
  inspect(s1.viewport.x, content="60")
  inspect(s1.viewport.y, content="40")
  inspect(s1.viewport.scale, content="1")
}

///|
test "pan_move is absolute not cumulative" {
  let state = make_test_state()
  let s0 = update_pan_start(state, 0.0, 0.0)
  let s1 = update_pan_move(s0, 50.0, 30.0)
  let s2 = update_pan_move(s1, 80.0, 50.0)
  // Second move uses original start_pan (0,0), not the intermediate position
  inspect(s2.viewport.x, content="80")
  inspect(s2.viewport.y, content="50")
}

///|
test "pan_move is no-op when not panning" {
  let state = make_test_state()
  let s = update_pan_move(state, 999.0, 999.0)
  inspect(s.viewport.x, content="0")
  inspect(s.viewport.y, content="0")
}

///|
test "zoom out (delta > 0) decreases scale" {
  let state = make_test_state()
  // cursor at (500, 400), scroll down → zoom out
  let s = update_zoom(state, 1.0, 500.0, 400.0)
  assert_true(s.viewport.scale < 1.0)
}

///|
test "zoom in (delta < 0) increases scale" {
  let state = make_test_state()
  let s = update_zoom(state, -1.0, 500.0, 400.0)
  assert_true(s.viewport.scale > 1.0)
}

///|
test "zoom clamps to min 0.1" {
  let state = { ..make_test_state(), viewport: { x: 0.0, y: 0.0, scale: 0.11 } }
  let s = update_zoom(state, 1.0, 0.0, 0.0)
  assert_eq(s.viewport.scale, 0.1)
}

///|
test "zoom clamps to max 8.0" {
  let state = { ..make_test_state(), viewport: { x: 0.0, y: 0.0, scale: 7.5 } }
  let s = update_zoom(state, -1.0, 0.0, 0.0)
  assert_eq(s.viewport.scale, 8.0)
}

///|
test "zoom keeps cursor world position fixed" {
  // World point under cursor before and after zoom must be identical.
  let state = make_test_state() // pan=(0,0), scale=1.0
  let cx = 300.0
  let cy = 200.0
  // world point under cursor before: (cx - pan.x) / scale = (300-0)/1 = 300
  let world_x_before = (cx - state.viewport.x) / state.viewport.scale
  let s = update_zoom(state, 1.0, cx, cy) // zoom out
  let world_x_after = (cx - s.viewport.x) / s.viewport.scale
  // Allow tiny float error
  assert_true((world_x_before - world_x_after).abs() < 1.0e-9)
}
