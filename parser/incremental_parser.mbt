// Incremental parser based on Wagner-Graham algorithm
// Efficiently reparses only damaged regions after edits

///| Incremental parser state
pub struct IncrementalParser {
  mut source : String                // Current source text
  mut tree : TermNode?               // Current parse tree
  token_cache : TokenCache           // Token cache
  parse_cache : ParseCache           // Parse cache
  mut node_id_counter : Int          // Node ID counter
}

///| Create a new incremental parser
pub fn IncrementalParser::new(source : String) -> IncrementalParser {
  {
    source,
    tree: None,
    token_cache: TokenCache::new(),
    parse_cache: ParseCache::new(),
    node_id_counter: 0,
  }
}

///| Get next node ID
fn IncrementalParser::next_node_id(self : IncrementalParser) -> Int {
  let id = self.node_id_counter
  self.node_id_counter = self.node_id_counter + 1
  id
}

///| Perform initial full parse
pub fn IncrementalParser::parse(self : IncrementalParser) -> TermNode {
  let (tree, _errors) = parse_with_error_recovery(self.source)
  self.tree = Some(tree)
  tree
}

///| Apply an edit and incrementally reparse
///
/// This implements the Wagner-Graham incremental parsing algorithm:
/// 1. Update source text
/// 2. Identify damaged region (edit range)
/// 3. Invalidate caches in damaged region
/// 4. Reparse damaged region, reusing cached subtrees where possible
pub fn IncrementalParser::edit(
  self : IncrementalParser,
  edit : Edit,
  new_source : String
) -> TermNode {
  // Step 1: Update source
  self.source = new_source

  // Step 2: Get old tree (if any)
  let old_tree = match self.tree {
    Some(t) => t
    None => {
      // No existing tree, do full parse
      return self.parse()
    }
  }

  // Step 3: Adjust old tree positions based on edit
  let adjusted_tree = self.adjust_tree_positions(old_tree, edit)

  // Step 4: Identify damaged range using Wagner-Graham algorithm
  let damage = DamageTracker::new(edit)
  damage.expand_for_tree(adjusted_tree)

  // Step 5: Invalidate caches in damaged range
  let damaged_range = damage.range()
  self.token_cache.invalidate_range(damaged_range.start, damaged_range.end)
  self.parse_cache.invalidate_range(damaged_range)

  // Step 6: Reparse (for now, do full reparse) with error recovery
  // TODO: Implement partial reparsing with cache reuse
  let (new_tree, _errors) = parse_with_error_recovery(new_source)
  self.tree = Some(new_tree)
  new_tree
}

///| Adjust tree positions after an edit
///
/// Wagner-Graham position adjustment:
/// - Nodes before edit: unchanged
/// - Nodes overlapping edit: marked as damaged
/// - Nodes after edit: shifted by delta
fn IncrementalParser::adjust_tree_positions(
  self : IncrementalParser,
  tree : TermNode,
  edit : Edit
) -> TermNode {
  let delta = edit.delta()

  if tree.end <= edit.start {
    // Node is entirely before edit, no change needed
    tree
  } else if tree.start >= edit.old_end {
    // Node is entirely after edit, shift positions
    let adjusted_children = tree.children.map(
      fn(child) { self.adjust_tree_positions(child, edit) },
    )
    TermNode::new(
      tree.kind,
      tree.start + delta,
      tree.end + delta,
      tree.node_id,
      adjusted_children,
    )
  } else {
    // Node overlaps edit range - will need reparsing
    // For now, just adjust children and mark range as needing update
    let adjusted_children = tree.children.map(
      fn(child) { self.adjust_tree_positions(child, edit) },
    )
    TermNode::new(tree.kind, tree.start, tree.end, tree.node_id, adjusted_children)
  }
}

///| Get the current parse tree
pub fn IncrementalParser::get_tree(self : IncrementalParser) -> TermNode? {
  self.tree
}

///| Get the current source
pub fn IncrementalParser::get_source(self : IncrementalParser) -> String {
  self.source
}

///| Get cache statistics
pub fn IncrementalParser::stats(self : IncrementalParser) -> String {
  "IncrementalParser {\n" +
  "  source_length: " +
  self.source.length().to_string() +
  ",\n" +
  "  " +
  self.token_cache.stats() +
  ",\n" +
  "  " +
  self.parse_cache.stats() +
  "\n}"
}
