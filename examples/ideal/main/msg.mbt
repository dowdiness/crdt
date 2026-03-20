///|
pub enum Msg {
  // Mode & layout
  SetMode(EditorMode)
  TogglePanel(PanelId)
  SelectBottomTab(BottomTab)
  // From Web Component events
  NodeSelected(String)
  StructuralEditRequested(op~ : String, node_id~ : String)
  // Projection
  RefreshProjection
  // Undo/redo
  Undo
  Redo
  // Tree editing (outline collapse/expand)
  TreeEdited(@proj.TreeEditOp)
  // UI
  LoadExample(String)
  OutlineNodeClicked(String)
  // Sync: CM6 text changed, need to pull from JS-side CRDT
  TextChangedFromEditor
}
