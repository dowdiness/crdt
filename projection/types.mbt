// Re-export generic types from framework/core for backward compatibility.
// NodeId (struct) can be re-exported via pub using.
// DropPosition and FocusHint (enums) are kept here as local typedefs
// because pub using makes enums abstract (no constructor access, no derives).

///|
using @loomcore {type Range}

///|
pub using @core {type NodeId}

///|
/// Drop position for drag-and-drop operations
pub(all) enum DropPosition {
  /// Insert before the target
  Before
  /// Insert after the target
  After
  /// Insert as a child of the target
  Inside
} derive(Show, Eq)

///|
/// Hint for where to place the cursor after a structural edit.
/// MoveCursor(position~) uses post-edit coordinates — the bridge applies them directly.
pub(all) enum FocusHint {
  RestoreCursor
  MoveCursor(position~ : Int)
} derive(Show, Eq)
