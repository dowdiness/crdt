// WebSocket FFI — lambda editor ws client transport

///|
pub fn ws_on_open(handle : Int, ws : @editor.JsWebSocket) -> Unit {
  match lambda_handles.get(handle) {
    Some(h) => h.editor.ws_on_open(ws)
    None => ()
  }
}

///|
pub fn ws_on_message(handle : Int, data : Bytes) -> Unit {
  match lambda_handles.get(handle) {
    Some(h) => h.editor.ws_on_message(data)
    None => ()
  }
}

///|
pub fn ws_on_close(handle : Int) -> Unit {
  match lambda_handles.get(handle) {
    Some(h) => h.editor.ws_on_close()
    None => ()
  }
}

///|
pub fn ws_broadcast_edit(handle : Int) -> Unit {
  match lambda_handles.get(handle) {
    Some(h) => h.editor.ws_broadcast_edit()
    None => ()
  }
}

///|
pub fn ws_broadcast_cursor(handle : Int) -> Unit {
  match lambda_handles.get(handle) {
    Some(h) => h.editor.ws_broadcast_cursor()
    None => ()
  }
}
