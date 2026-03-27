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
