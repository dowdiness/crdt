---
summary: "Complete design for Sugiyama hierarchical layout engine for DOT graphs. Includes 5-phase algorithm (cycle removal, layer assignment, crossing minimization, coordinate assignment, edge routing), data structures, module organization, and implementation sequence. MVP scope without DOT attributes."
created: 2026-01-09
status: in-progress
tags: [layout, sugiyama, graph-visualization, architecture, moonbit]
related: [src/lib/parser/dot_parser.mbt, CLAUDE.md]
---

# Sugiyama Layout Engine Design for DOT Language

## Context

This is a comprehensive design document for implementing a Sugiyama (hierarchical/layered) graph layout algorithm for the MoonBit DOT parser project. The design was created after thorough codebase exploration and clarification of requirements.

## Overview

The layout engine will take a parsed `Graph` AST from the existing DOT parser and compute coordinate data (node positions and edge waypoints) suitable for rendering. This follows a functional, non-invasive architecture that keeps the existing parser AST unchanged.

## Requirements

- **Algorithm**: Sugiyama 4-phase hierarchical layout
- **Output**: Coordinate data structure (`GraphLayout` with node positions, edge waypoints, bounds)
- **MVP Scope**: Ignore DOT attributes (no rankdir, nodesep, etc.) - use default spacing parameters
- **Architecture**: Functional, separates layout computation from rendering

## Module Structure

Create new layout subpackage at `src/lib/layout/`:

```
src/lib/layout/
├── moon.pkg.json                   # Package config (import parent lib)
├── types.mbt                       # Layout data structures
├── config.mbt                      # Default layout parameters
├── graph_builder.mbt               # AST -> internal graph conversion
├── cycle_removal.mbt               # Phase 1: Make graph acyclic
├── layer_assignment.mbt            # Phase 2: Topological layering
├── crossing_minimization.mbt       # Phase 3: Order nodes within layers
├── coordinate_assignment.mbt       # Phase 4: Assign (x,y) positions
├── edge_routing.mbt                # Phase 5: Edge waypoint generation
├── layout.mbt                      # Main API orchestrator
└── layout_test.mbt                 # Tests
```

**Package config** (`src/lib/layout/moon.pkg.json`):
```json
{
  "is_main": false,
  "import": ["antisatori/graphviz/lib/parser"]
}
```

## Data Structures

### Core Layout Types (`types.mbt`)

```moonbit
pub struct Point { x: Double, y: Double }
pub struct Size { width: Double, height: Double }
pub struct Bounds { min_x: Double, min_y: Double, max_x: Double, max_y: Double }

pub struct LayoutNode {
  id: String              // Node ID from AST
  position: Point         // Top-left corner
  size: Size              // Node dimensions
  layer: Int              // Vertical layer (0 = top)
  order: Int              // Horizontal position in layer
}

pub struct LayoutEdge {
  from: String            // Source node ID
  to: String              // Target node ID
  waypoints: Array[Point] // Polyline path
  reversed: Bool          // True if reversed for cycle removal
}

pub struct GraphLayout {
  nodes: Map[String, LayoutNode]      // Node ID -> layout
  edges: Array[LayoutEdge]            // All edges with routing
  bounds: Bounds                      // Overall dimensions
  layers: Array[Array[String]]        // Layer structure
}
```

### Internal Graph Representation

```moonbit
struct InternalGraph {
  nodes: Map[String, NodeInfo]
  edges: Array[Edge]
  directed: Bool
}

struct NodeInfo {
  id: String
  incoming: Array[String]
  outgoing: Array[String]
}

struct Edge {
  from: String
  to: String
  original_direction: EdgeDirection
}

enum EdgeDirection { Forward, Backward }
```

## Layout Configuration (`config.mbt`)

```moonbit
pub struct LayoutConfig {
  node_width: Double         // Default: 72.0
  node_height: Double        // Default: 36.0
  layer_spacing: Double      // Default: 80.0
  node_spacing: Double       // Default: 50.0
  edge_spacing: Double       // Default: 10.0
}

pub fn LayoutConfig::default() -> LayoutConfig {
  { node_width: 72.0, node_height: 36.0, layer_spacing: 80.0,
    node_spacing: 50.0, edge_spacing: 10.0 }
}
```

## Algorithm Phases

### Phase 1: Cycle Removal (`cycle_removal.mbt`)

Make graph acyclic using DFS-based detection:

```moonbit
pub fn remove_cycles(graph: InternalGraph) -> InternalGraph
```

**Algorithm:**
1. Perform DFS from each unvisited node
2. Track visited and on_stack states
3. Detect back edges (cycle indicators)
4. Reverse back edges to break cycles
5. Return graph with edges marked as Forward/Backward

### Phase 2: Layer Assignment (`layer_assignment.mbt`)

Assign nodes to vertical layers via topological sort:

```moonbit
pub fn assign_layers(graph: InternalGraph) -> Map[String, Int]
pub fn group_by_layer(layer_map: Map[String, Int]) -> Array[Array[String]]
```

**Algorithm:**
1. Find source nodes (no incoming edges in DAG)
2. Use BFS/topological sort to assign layers
3. Layer(v) = max(Layer(u) + 1) for all edges u → v
4. Sources get layer 0

### Phase 3: Crossing Minimization (`crossing_minimization.mbt`)

Order nodes within layers using barycenter heuristic:

```moonbit
pub fn minimize_crossings(
  graph: InternalGraph,
  layers: Array[Array[String]],
  iterations: Int  // Default: 24
) -> Array[Array[String]]
```

**Algorithm:**
1. Iterate sweeping down then up through layers
2. For each layer, compute barycenter positions based on adjacent layer
3. Sort nodes in layer by barycenter value
4. Repeat for multiple iterations (default: 24 = 12 up/down passes)

**Barycenter:** Average position of connected nodes in adjacent layer

### Phase 4: Coordinate Assignment (`coordinate_assignment.mbt`)

Assign actual pixel coordinates:

```moonbit
pub fn assign_coordinates(
  layers: Array[Array[String]],
  config: LayoutConfig
) -> Map[String, LayoutNode]
```

**Algorithm:**
1. Y-coordinate: `layer_index × (node_height + layer_spacing)`
2. X-coordinate: distribute evenly with node_spacing, center horizontally
   - Total width = `(n-1) × node_spacing + n × node_width`
   - Start X = `-(total_width / 2)` for centering
   - Position each: `start_x + i × (node_width + node_spacing)`

### Phase 5: Edge Routing (`edge_routing.mbt`)

Generate edge waypoints:

```moonbit
pub fn route_edges(
  graph: InternalGraph,
  node_positions: Map[String, LayoutNode],
  config: LayoutConfig
) -> Array[LayoutEdge]
```

**Algorithm (MVP):**
- Straight line from source bottom-center to target top-center
- Source point: `(x + width/2, y + height)`
- Target point: `(x + width/2, y)`
- Waypoints: `[source_point, target_point]`

## Main API (`layout.mbt`)

Public entry point:

```moonbit
pub fn compute_layout(graph: Graph) -> GraphLayout {
  compute_layout_with_config(graph, LayoutConfig::default())
}

pub fn compute_layout_with_config(
  graph: Graph,
  config: LayoutConfig
) -> GraphLayout {
  // 1. Extract internal graph
  let internal = extract_graph(graph)

  // 2. Remove cycles
  let acyclic = remove_cycles(internal)

  // 3. Assign layers
  let layer_map = assign_layers(acyclic)
  let layers = group_by_layer(layer_map)

  // 4. Minimize crossings
  let ordered_layers = minimize_crossings(acyclic, layers, 24)

  // 5. Assign coordinates
  let nodes = assign_coordinates(ordered_layers, config)

  // 6. Route edges
  let edges = route_edges(acyclic, nodes, config)

  // 7. Calculate bounds
  let bounds = calculate_bounds(nodes)

  { nodes, edges, bounds, layers: ordered_layers }
}
```

## Graph Builder (`graph_builder.mbt`)

Converts DOT AST to internal graph:

```moonbit
pub fn extract_graph(graph: Graph) -> InternalGraph

fn collect_nodes(statements: Array[Statement]) -> Map[String, NodeInfo]
  // Pattern match on Statement enum
  // NodeStmt -> add node
  // EdgeStmt -> add all referenced nodes
  // Subgraph -> recurse and flatten (MVP)

fn collect_edges(statements: Array[Statement], directed: Bool) -> Array[Edge]
  // Extract from EdgeStmt
  // Handle edge chains: a -> b -> c becomes [(a,b), (b,c)]
  // For undirected graphs: create bidirectional edges
```

## Implementation Sequence

1. **Setup** (15 min)
   - Create `src/lib/layout/` directory
   - Add package config files
   - Create stub files

2. **Data Structures** (30 min)
   - Implement `types.mbt` completely
   - Implement `config.mbt` completely
   - Add basic tests

3. **Graph Building** (1 hour)
   - Implement `graph_builder.mbt`
   - Test node/edge extraction
   - Handle subgraphs

4. **Phase 1: Cycle Removal** (1 hour)
   - Implement DFS-based cycle detection
   - Test with cyclic graphs

5. **Phase 2: Layer Assignment** (1 hour)
   - Implement topological layering
   - Test with chains, diamonds, trees

6. **Phase 4: Coordinate Assignment** (45 min)
   - Implement grid positioning
   - Test coordinate generation
   - (Skip Phase 3 initially for faster iteration)

7. **Phase 5: Edge Routing** (30 min)
   - Implement straight-line routing
   - Test edge waypoints

8. **Phase 3: Crossing Minimization** (1.5 hours)
   - Implement barycenter heuristic
   - Test crossing reduction

9. **Integration** (30 min)
   - Implement `layout.mbt` orchestrator
   - End-to-end tests

10. **Documentation** (30 min)
    - Doc comments
    - Usage examples

**Total estimated time: 7-8 hours**

## Testing Strategy

Create tests in `layout_test.mbt`:

```moonbit
test "graph_extraction" { /* verify node/edge extraction */ }
test "cycle_removal" { /* verify cycle detection */ }
test "layer_assignment" { /* verify topological layers */ }
test "coordinate_assignment" { /* verify positions */ }
test "full_layout_simple_chain" { /* a -> b -> c */ }
test "full_layout_diamond" { /* a -> b,c; b,c -> d */ }
test "full_layout_automaton" { /* use existing test graph */ }
```

## Verification

After implementation:

```bash
# Run all tests
moon test

# Test layout computation
moon run src/main
```

**Manual test** (add to `src/main/main.mbt`):
```moonbit
fn main {
  let dot = #|digraph {
    #|  a -> b -> c;
    #|  a -> c;
    #|}

  match parse_dot(dot) {
    Some(graph) => {
      let layout = @layout.compute_layout(graph)
      println("Nodes: \{layout.nodes.size()}")
      println("Edges: \{layout.edges.length()}")
      println("Bounds: \{layout.bounds}")

      layout.nodes.iter().each(fn(id, node) {
        println("\{id}: (\{node.position.x}, \{node.position.y})")
      })
    }
    None => println("Parse error")
  }
}
```

## MoonBit Conventions to Follow

Based on codebase analysis:

1. **Method-style syntax**: `fn Type::method(self: Type) -> ReturnType`
2. **Pattern matching** for Statement enum traversal
3. **Map** for node lookups, **Array** for layers
4. **Functional approach** (don't mutate Graph AST)
5. **derive(Eq, Show)** for public types

## Critical Files

- **`src/lib/parser/dot_parser.mbt`** (existing) - Reference for AST types
- **`src/lib/layout/types.mbt`** (new) - Layout output structures
- **`src/lib/layout/graph_builder.mbt`** (new) - AST conversion
- **`src/lib/layout/layer_assignment.mbt`** (new) - Core ranking algorithm
- **`src/lib/layout/layout.mbt`** (new) - Public API

## Future Enhancements (Out of MVP Scope)

- **DOT attribute support**: rankdir, nodesep, ranksep, shape, width, height
- **Subgraph clustering**: Treat subgraphs as compound nodes
- **Port-based routing**: Use NodeId.port for precise connection points
- **Orthogonal routing**: Rectilinear edge paths
- **Network simplex**: Optimal layer assignment (replace longest-path)
- **Edge bundling**: Reduce visual clutter
- **Rendering layer**: SVG/Canvas/Terminal renderers

## Algorithm References

1. **Sugiyama et al. (1981)**: "Methods for Visual Understanding of Hierarchical System Structures" - Original four-phase approach
2. **Gansner et al. (1993)**: "A Technique for Drawing Directed Graphs" - Network simplex, barycenter heuristic
3. **Graphviz dot**: Reference implementation for pragmatic choices

## Design Decisions

### Why Sugiyama?

- Best for directed graphs with clear hierarchy
- Produces readable top-to-bottom or left-to-right layouts
- Well-documented with proven implementations
- Natural fit for DOT language's directed graph focus

### Why Separate Layout from Rendering?

- **Flexibility**: Same layout can drive multiple renderers (SVG, Canvas, Terminal)
- **Testability**: Can verify layout correctness without visual inspection
- **Composability**: Users can customize rendering without touching layout
- **Future-proof**: Easy to swap or add layout algorithms

### Why Ignore Attributes in MVP?

- **Simplicity**: Get core algorithm working first
- **Incremental**: Attributes can be added later without redesign
- **Testing**: Easier to verify with consistent parameters
- **Focus**: Concentrate on algorithm correctness

## Integration Pattern

The layout engine is designed as a pure function pipeline:

```
DOT source → parse_dot() → Graph AST → compute_layout() → GraphLayout → render()
```

Each stage is independent and testable. The Graph AST remains immutable throughout.

## Next Steps

If implementing this design:

1. Start with data structures (types, config)
2. Build graph extraction layer
3. Implement phases incrementally with tests
4. Integrate into main API
5. Create comprehensive test suite
6. Document usage patterns
