///|
/// Raw FFI layer for the CodeMirror–Rabbita binding.
///
/// Every `extern "js"` declaration targeting `@codemirror/*` lives here.
/// Opaque JS handles are wrapped as `struct T(@js.Value)` newtypes and
/// re-exported to the managed layer.
