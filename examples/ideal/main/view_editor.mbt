///|
using @html {node}

///|
fn view_editor(
  dispatch : @rabbita.Dispatch[Msg],
  _model : Model,
) -> @rabbita.Html {
  // Setup: wire the text-changed event to click a hidden button.
  // This works around Rabbita's handler API not exposing Scheduler.add().
  js_wire_text_changed_to_button()
  let attrs = @html.Attrs::build()
    .class("editor-container")
    .id("canopy-editor")
  div(class="editor-wrapper", [
    node("canopy-editor", attrs, [@html.text("")]),
    // Hidden button that JS clicks when text-changed fires.
    // This triggers the Rabbita update loop via on_click.
    button(
      id="canopy-text-sync-trigger",
      class="hidden-trigger",
      on_click=dispatch(TextChangedFromEditor),
      [@html.text("")],
    ),
  ])
}
