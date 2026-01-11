// Layout configuration parameters

///|
pub struct LayoutConfig {
  node_width : Double // Default: 72.0 (1 inch at 72 DPI)
  node_height : Double // Default: 36.0
  layer_spacing : Double // Vertical space between layers: 80.0
  node_spacing : Double // Horizontal space between nodes: 50.0
  edge_spacing : Double // Clearance for edge routing: 10.0
} derive(Show)

///|
pub fn LayoutConfig::default() -> LayoutConfig {
  {
    node_width: 72.0,
    node_height: 36.0,
    layer_spacing: 80.0,
    node_spacing: 50.0,
    edge_spacing: 10.0,
  }
}
