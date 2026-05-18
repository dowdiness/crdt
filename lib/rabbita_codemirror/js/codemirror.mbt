///|
/// Raw FFI layer for the CodeMirror–Rabbita binding.
///
/// Every `extern "js"` declaration targeting `@codemirror/*` lives here.
/// Opaque JS handles are wrapped as `struct T(@js_value.Value)` newtypes and
/// re-exported to the managed layer.

///|
pub struct CmView(@js_value.Value)

///|
#warnings("-unused_constructor")
pub struct CmState(@js_value.Value)

///|
#warnings("-unused_constructor")
pub struct Transaction(@js_value.Value)

///|
pub struct TransactionSpec(@js_value.Value)

///|
pub struct Compartment(@js_value.Value)

///|
pub struct Extension(@js_value.Value)

///|
pub struct Disposable(() -> Unit)

///|
pub fn Disposable::dispose(self : Disposable) -> Unit {
  (self.0)()
}

///|
/// Wrap an externally constructed CodeMirror extension.
///
/// This is the plug-in escape hatch for language packages and other advanced
/// CodeMirror extensions that are built on the JavaScript side.
pub fn raw_extension(value : @js_value.Value) -> Extension {
  Extension(value)
}

///|
pub extern "js" fn load_codemirror(
  source? : String = "https://esm.sh/codemirror@6",
) -> @js_value.Promise =
  #| async (source) => {
  #|   const key = Symbol.for("dowdiness.rabbita_codemirror");
  #|   const root = globalThis;
  #|   const slot = root[key] ?? (root[key] = {
  #|     modules: new Map(),
  #|     applying: new WeakMap(),
  #|   });
  #|   if (!slot.modules.has(source)) {
  #|     slot.modules.set(source, import(/* @vite-ignore */ source));
  #|   }
  #|   const cm = await slot.modules.get(source);
  #|   slot.current = cm;
  #|   return cm;
  #| }

///|
extern "js" fn js_create_view_raw(
  host_id : String,
  init_doc : String,
  extension : @js_value.Value,
) -> @js_value.Value =
  #| (hostId, initDoc, extension) => {
  #|   const key = Symbol.for("dowdiness.rabbita_codemirror");
  #|   const slot = globalThis[key];
  #|   const cm = slot?.current;
  #|   if (!cm) {
  #|     throw new Error("CodeMirror modules not loaded; call load_codemirror first");
  #|   }
  #|   const parent = document.getElementById(hostId);
  #|   if (!parent) {
  #|     throw new Error(`CodeMirror host not found: ${hostId}`);
  #|   }
  #|   parent.textContent = "";
  #|   const view = new cm.EditorView({
  #|     parent,
  #|     state: cm.EditorState.create({
  #|       doc: initDoc,
  #|       extensions: extension,
  #|     }),
  #|   });
  #|   if (!slot.applying.has(view)) {
  #|     slot.applying.set(view, { value: false });
  #|   }
  #|   return view;
  #| }

///|
pub fn js_create_view(
  host_id : String,
  init_doc : String,
  extension : Extension,
) -> CmView {
  CmView(js_create_view_raw(host_id, init_doc, extension.0))
}

///|
extern "js" fn js_dispatch_raw(
  view : @js_value.Value,
  spec : @js_value.Value,
) -> Unit =
  #| (view, spec) => {
  #|   const key = Symbol.for("dowdiness.rabbita_codemirror");
  #|   const slot = globalThis[key] ?? (globalThis[key] = {
  #|     modules: new Map(),
  #|     applying: new WeakMap(),
  #|   });
  #|   let cell = slot.applying.get(view);
  #|   if (!cell) {
  #|     cell = { value: false };
  #|     slot.applying.set(view, cell);
  #|   }
  #|   cell.value = true;
  #|   try {
  #|     view.dispatch(spec);
  #|   } finally {
  #|     cell.value = false;
  #|   }
  #| }

///|
pub fn js_dispatch(view : CmView, spec : TransactionSpec) -> Unit {
  js_dispatch_raw(view.0, spec.0)
}

///|
extern "js" fn js_view_destroy_raw(view : @js_value.Value) -> Unit =
  #| (view) => view.destroy()

///|
pub fn js_view_destroy(view : CmView) -> Unit {
  js_view_destroy_raw(view.0)
}

///|
extern "js" fn js_state_doc_raw(view : @js_value.Value) -> String =
  #| (view) => view.state.doc.toString()

///|
pub fn js_state_doc(view : CmView) -> String {
  js_state_doc_raw(view.0)
}

///|
extern "js" fn js_state_selection_main_raw(
  view : @js_value.Value,
) -> @js_value.Value =
  #| (view) => {
  #|   const sel = view.state.selection.main;
  #|   return {
  #|     from: sel.from,
  #|     to: sel.to,
  #|     anchor: sel.anchor,
  #|     head: sel.head,
  #|   };
  #| }

///|
pub fn js_state_selection_main(view : CmView) -> @js_value.Value {
  js_state_selection_main_raw(view.0)
}

///|
extern "js" fn js_compartment_new_raw() -> @js_value.Value =
  #| () => {
  #|   const key = Symbol.for("dowdiness.rabbita_codemirror");
  #|   const cm = globalThis[key]?.current;
  #|   if (!cm) {
  #|     throw new Error("CodeMirror modules not loaded; call load_codemirror first");
  #|   }
  #|   return new cm.Compartment();
  #| }

///|
pub fn js_compartment_new() -> Compartment {
  Compartment(js_compartment_new_raw())
}

///|
extern "js" fn js_compartment_of_raw(
  compartment : @js_value.Value,
  extension : @js_value.Value,
) -> @js_value.Value =
  #| (compartment, extension) => compartment.of(extension)

///|
pub fn js_compartment_of(
  compartment : Compartment,
  extension : Extension,
) -> Extension {
  Extension(js_compartment_of_raw(compartment.0, extension.0))
}

///|
extern "js" fn js_compartment_reconfigure_raw(
  compartment : @js_value.Value,
  extension : @js_value.Value,
) -> @js_value.Value =
  #| (compartment, extension) => ({
  #|   effects: compartment.reconfigure(extension),
  #| })

///|
pub fn js_compartment_reconfigure(
  compartment : Compartment,
  extension : Extension,
) -> TransactionSpec {
  TransactionSpec(js_compartment_reconfigure_raw(compartment.0, extension.0))
}

///|
extern "js" fn js_extension_combine_raw(
  extensions : Array[@js_value.Value],
) -> @js_value.Value =
  #| (extensions) => extensions

///|
pub fn js_extension_combine(extensions : Array[Extension]) -> Extension {
  js_extension_combine_raw(extensions.map(fn(extension) { extension.0 }))
  |> Extension
}

///|
extern "js" fn js_view_set_applying_raw(
  view : @js_value.Value,
  applying : Bool,
) -> Unit =
  #| (view, applying) => {
  #|   const key = Symbol.for("dowdiness.rabbita_codemirror");
  #|   const slot = globalThis[key] ?? (globalThis[key] = {
  #|     modules: new Map(),
  #|     applying: new WeakMap(),
  #|   });
  #|   let cell = slot.applying.get(view);
  #|   if (!cell) {
  #|     cell = { value: false };
  #|     slot.applying.set(view, cell);
  #|   }
  #|   cell.value = !!applying;
  #| }

///|
#warnings("-unused_value")
fn js_view_set_applying(view : CmView, applying : Bool) -> Unit {
  js_view_set_applying_raw(view.0, applying)
}

///|
extern "js" fn js_view_is_applying_raw(view : @js_value.Value) -> Bool =
  #| (view) => {
  #|   const key = Symbol.for("dowdiness.rabbita_codemirror");
  #|   const cell = globalThis[key]?.applying?.get(view);
  #|   return !!cell?.value;
  #| }

///|
#warnings("-unused_value")
fn js_view_is_applying(view : CmView) -> Bool {
  js_view_is_applying_raw(view.0)
}

///|
extern "js" fn js_add_update_listener_raw(
  view : @js_value.Value,
  on_doc : (@js_value.Value) -> Unit,
  on_selection : (@js_value.Value) -> Unit,
  on_focus_change : (@js_value.Value) -> Unit,
) -> () -> Unit =
  #| (view, onDoc, onSelection, onFocusChange) => {
  #|   const key = Symbol.for("dowdiness.rabbita_codemirror");
  #|   const slot = globalThis[key];
  #|   const cm = slot?.current;
  #|   if (!cm) {
  #|     throw new Error("CodeMirror modules not loaded; call load_codemirror first");
  #|   }
  #|   const isApplying = () => !!slot.applying.get(view)?.value;
  #|   const compartment = new cm.Compartment();
  #|   const listener = cm.EditorView.updateListener.of(update => {
  #|     if (update.docChanged && !isApplying()) {
  #|       onDoc(update.state.doc.toString());
  #|     }
  #|     if ((update.selectionSet || update.docChanged) && !isApplying()) {
  #|       const sel = update.state.selection.main;
  #|       onSelection({
  #|         from: sel.from,
  #|         to: sel.to,
  #|         anchor: sel.anchor,
  #|         head: sel.head,
  #|       });
  #|     }
  #|     if (update.focusChanged && !isApplying()) {
  #|       onFocusChange(!!update.view.hasFocus);
  #|     }
  #|   });
  #|   js_apply_guarded(view, () => {
  #|     view.dispatch({
  #|       effects: cm.StateEffect.appendConfig.of([compartment.of(listener)]),
  #|     });
  #|   });
  #|   let disposed = false;
  #|   return () => {
  #|     if (disposed) return;
  #|     disposed = true;
  #|     js_apply_guarded(view, () => {
  #|       view.dispatch({ effects: compartment.reconfigure([]) });
  #|     });
  #|   };
  #|
  #|   function js_apply_guarded(view, run) {
  #|     let cell = slot.applying.get(view);
  #|     if (!cell) {
  #|       cell = { value: false };
  #|       slot.applying.set(view, cell);
  #|     }
  #|     cell.value = true;
  #|     try {
  #|       run();
  #|     } finally {
  #|       cell.value = false;
  #|     }
  #|   }
  #| }

///|
pub fn js_add_update_listener(
  view : CmView,
  on_doc : (@js_value.Value) -> Unit,
  on_selection : (@js_value.Value) -> Unit,
  on_focus_change : (@js_value.Value) -> Unit,
) -> Disposable {
  Disposable(
    js_add_update_listener_raw(view.0, on_doc, on_selection, on_focus_change),
  )
}
