# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a MoonBit implementation of a Graphviz DOT language parser. The project parses DOT graph description language according to the [DOT Language Specification](https://graphviz.org/doc/info/lang.html) and builds an Abstract Syntax Tree (AST) representation.

## Essential Commands

### Building and Running
```bash
# Build the project
moon build

# Run the main program
moon run src/main

# Check code without building
moon check
```

### Testing
```bash
# Run all tests
moon test

# Run tests in a specific package
moon test -p lib

# Run a specific test file
moon test -p lib -f dot_parser_text.mbt

# Run a specific test by index
moon test -p lib -f dot_parser_text.mbt -i 0

# Update test snapshots
moon test -u
```

### Code Quality
```bash
# Format all source files
moon fmt

# Build with warnings as errors
moon build -d
```

### Documentation
```bash
# Generate documentation
moon doc
```

## Architecture

### Module Structure

The project follows MoonBit's package system with two main packages:

- **`src/lib/`**: Core parser library (`antisatori/graphviz/lib`)
  - Contains the DOT language lexer, parser, and AST definitions
  - Exports public API through `parse_dot()` function

- **`src/main/`**: Main entry point
  - Imports and uses the library package
  - Demonstrates parser usage with example DOT graphs

### Parser Architecture

The parser follows a classic lexer-parser architecture:

1. **Lexer (`Lexer` struct)**: Tokenizes DOT language input
   - Handles identifiers, keywords, operators, quoted strings
   - Supports C-style comments (`//`, `/* */`) and hash comments (`#`)
   - Returns a stream of `Token` enum values

2. **Parser (`Parser` struct)**: Builds AST from tokens
   - Recursive descent parser following DOT grammar rules
   - Top-level entry: `parse_graph()` which parses the full graph structure
   - Parses statements recursively: nodes, edges, attributes, subgraphs

3. **AST Types**: Strongly-typed representation of DOT graphs
   - `Graph`: Top-level structure (strict/non-strict, directed/undirected)
   - `Statement`: Nodes, edges, attributes, assignments, subgraphs
   - `NodeId`: Node identifiers with optional ports
   - `EdgeOp`: Directed (`->`) vs undirected (`--`) edges
   - `AttributeList`: Key-value attribute pairs

### Key Design Patterns

- **Recursive descent parsing**: Each grammar rule maps to a parser method (e.g., `parse_statement()`, `parse_node_id()`, `parse_edge_rhs()`)
- **Token consumption**: `eat()` method verifies and consumes expected tokens
- **Optional elements**: Parser methods return `Option` types for optional grammar elements
- **Tail recursion**: Uses MoonBit's `loop` construct for iterative parsing (e.g., in `parse_stmt_list()`)

### Grammar Implementation

The parser implements the DOT language grammar as specified:

```
graph     : [ strict ] (graph | digraph) [ ID ] '{' stmt_list '}'
stmt_list : [ stmt [ ';' ] stmt_list ]
stmt      : node_stmt | edge_stmt | attr_stmt | ID '=' ID | subgraph
edge_stmt : (node_id | subgraph) edgeRHS [ attr_list ]
edgeRHS   : edgeop (node_id | subgraph) [ edgeRHS ]
```

Key parsing entry points in `src/lib/dot_parser.mbt`:
- `parse_graph()`: Parses the entire graph (line 672)
- `parse_statement()`: Parses individual statements (line 532)
- `parse_edge_rhs()`: Parses edge right-hand sides (line 505)
- `parse_node_id()`: Parses node identifiers with ports (line 434)

## MoonBit Language Specifics

### Function Syntax
Recent commits indicate a shift to method-style function syntax:
- Use method style: `fn Parser::parse_graph(self : Parser) -> Graph?`
- Not: `fn parse_graph(parser : Parser) -> Graph?`

### Type Aliases
Use `using` syntax for type aliases instead of deprecated `typealias`:
```moonbit
using Env = @map.Map[String, Value]
```

### Accessing Inner Types
Use direct access instead of deprecated `Complex::T` syntax:
```moonbit
Complex  // not Complex::T
```

### Pattern Matching on Streams
The codebase uses MoonBit's `loop` construct with pattern matching for stream processing and iterative operations.

## Testing

Tests are located in `src/lib/dot_parser_text.mbt`. The test file includes examples of:
- Basic directed graphs (`digraph { a -> b }`)
- Undirected graphs with attributes
- Complex subgraphs with clusters
- Automaton graphs with record-shaped nodes

The test demonstrates both parsing and formatting of DOT graphs using `parse_dot()` and `format_graph()`.
