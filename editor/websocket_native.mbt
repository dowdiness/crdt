///|
pub struct JsWebSocket(Int)

///|
pub fn JsWebSocket::send_bytes(self : JsWebSocket, _data : Bytes) -> Unit {
  ignore(self)
}

///|
pub fn JsWebSocket::close(self : JsWebSocket) -> Unit {
  ignore(self)
}
