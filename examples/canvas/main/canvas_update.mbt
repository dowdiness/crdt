///|
fn update_pan_start(
  state    : CanvasState,
  screen_x : Double,
  screen_y : Double
) -> CanvasState {
  let pan : PanState = {
    start_screen_x: screen_x,
    start_screen_y: screen_y,
    start_pan_x:    state.viewport.x,
    start_pan_y:    state.viewport.y,
  }
  let new_interaction : InteractionState = {
    ..state.interaction,
    panning:      Some(pan),
    pointer_down: true,
    did_move:     false,
  }
  { ..state, interaction: new_interaction }
}

///|
/// Pan is computed as absolute offset from start_pan to avoid
/// float accumulation across multiple move events.
fn update_pan_move(
  state    : CanvasState,
  screen_x : Double,
  screen_y : Double
) -> CanvasState {
  match state.interaction.panning {
    None => state
    Some(pan) => {
      let new_viewport : Viewport = {
        ..state.viewport,
        x: pan.start_pan_x + (screen_x - pan.start_screen_x),
        y: pan.start_pan_y + (screen_y - pan.start_screen_y),
      }
      { ..state, viewport: new_viewport }
    }
  }
}

///|
/// Zoom the viewport toward the cursor position `(cx, cy)` in canvas-local
/// screen coords. Factor 0.9 = zoom out, 1/0.9 ≈ 1.111 = zoom in.
fn update_zoom(
  state : CanvasState,
  delta : Double,
  cx    : Double,
  cy    : Double
) -> CanvasState {
  let factor = if delta > 0.0 { 0.9 } else { 1.0 / 0.9 }
  let old_scale = state.viewport.scale
  let raw = old_scale * factor
  let new_scale = if raw < 0.1 {
    0.1
  } else if raw > 8.0 {
    8.0
  } else {
    raw
  }
  let ratio = new_scale / old_scale
  let new_viewport : Viewport = {
    scale: new_scale,
    x:     cx + (state.viewport.x - cx) * ratio,
    y:     cy + (state.viewport.y - cy) * ratio,
  }
  { ..state, viewport: new_viewport }
}
