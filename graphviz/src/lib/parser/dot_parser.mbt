// DOT Language Parser in MoonBit
// Based on the grammar from https://graphviz.org/doc/info/lang.html

// Specification of the DOT language grammar:

//      graph : [ strict ] (graph | digraph) [ ID ] '{' stmt_list '}'
//  stmt_list : [ stmt [ ';' ] stmt_list ]
//       stmt : node_stmt
//            | edge_stmt
//            | attr_stmt
//            | ID '=' ID
//            | subgraph
//  attr_stmt : (graph | node | edge) attr_list
//  attr_list : '[' [ a_list ] ']' [ attr_list ]
//     a_list : ID '=' ID [ (';' | ',') ] [ a_list ]
//  edge_stmt : (node_id | subgraph) edgeRHS [ attr_list ]
//    edgeRHS : edgeop (node_id | subgraph) [ edgeRHS ]
//  node_stmt : node_id [ attr_list ]
//    node_id : ID [ port ]
//       port : ':' ID [ ':' compass_pt ]
//            | ':' compass_pt
//   subgraph : [ subgraph [ ID ] ] '{' stmt_list '}'
// compass_pt : n | ne | e | se | s | sw | w | nw | c | _

// Token types for the DOT language

///|
pub(all) enum Token {
  // Keywords
  Strict
  Graph
  Digraph
  Node
  Edge
  Subgraph

  // Identifiers and literals
  ID(String)
  LeftBrace

  // Operators and punctuation
  RightBrace // {
  LeftBracket // }
  RightBracket // [
  Colon // ]
  Semicolon // :
  Comma // ;
  Equals // ,
  Arrow // =
  Line // ->
  // --

  // Compass points
  CompassPt(String)
  EOF // n, ne, e, se, s, sw, w, nw, c, _

  // End of file
} derive(Eq, Show)

// AST node types

///|
pub(all) enum CompassPoint {
  N
  NE
  E
  SE
  S
  SW
  W
  NW
  C
  Underscore
} derive(Eq, Show)

///|
pub(all) struct Port {
  mut id : String?
  mut compass : CompassPoint?
} derive(Eq, Show)

///|
pub(all) struct NodeId {
  id : String
  port : Port?
} derive(Eq, Show)

///|
pub(all) enum EdgeOp {
  Directed
  Undirected // ->
} derive ( // --
  Eq,
  Show,
)

///|
pub(all) struct Attribute {
  key : String
  value : String
} derive(Eq, Show)

///|
pub(all) struct AttributeList {
  attributes : Array[Attribute]
} derive(Eq, Show)

///|
pub(all) enum Statement {
  NodeStmt(NodeId, AttributeList?)
  EdgeStmt(NodeId, Array[(EdgeOp, NodeId)], AttributeList?)
  AttrStmt(String, AttributeList) // "graph", "node", or "edge"
  Assignment(String, String)
  Subgraph(Subgraph)
} derive(Eq, Show)

///|
pub(all) struct Subgraph {
  id : String?
  statements : Array[Statement]
} derive(Eq, Show)

///|
pub(all) struct Graph {
  strict : Bool
  directed : Bool
  id : String?
  statements : Array[Statement]
} derive(Eq, Show)

// Lexer implementation

///|
struct Lexer {
  input : String
  mut position : Int
  mut current_char : Char?
}

///|
fn Lexer::new(input : String) -> Lexer {
  let lexer = { input, position: 0, current_char: None }
  lexer.advance()
  lexer
}

///|
fn Lexer::advance(self : Lexer) -> Unit {
  if self.position >= self.input.length() {
    self.current_char = None
  } else {
    match UInt16::to_char(self.input.at(self.position)) {
      Some(ch) => self.current_char = Some(ch)
      None => self.current_char = None
    }
    self.position += 1
  }
}

///|
fn Lexer::skip_whitespace(self : Lexer) -> Unit {
  match self.current_char {
    Some(' ') | Some('\t') | Some('\n') | Some('\r') => {
      self.advance()
      self.skip_whitespace()
    }
    _ => ()
  }
}

///|
fn Lexer::skip_comment(self : Lexer) -> Unit {
  match self.current_char {
    Some('/') => {
      self.advance()
      match self.current_char {
        Some('/') =>
          // Single line comment
          loop self.current_char {
            Some('\n') | None => break
            _ => {
              self.advance()
              continue self.current_char
            }
          }
        Some('*') => {
          // Multi-line comment
          self.advance()
          loop self.current_char {
            None => break
            Some('*') => {
              self.advance()
              loop self.current_char {
                Some('/') => {
                  self.advance()
                  break
                }
                _ => continue self.current_char
              }
            }
            _ => {
              self.advance()
              continue self.current_char
            }
          }
        }
        _ => {
          // Not a comment, backtrack
          self.position -= 1
          self.current_char = Some('/')
        }
      }
    }
    Some('#') =>
      // Hash comment
      loop self.current_char {
        Some('\n') | None => break
        _ => {
          self.advance()
          continue self.current_char
        }
      }
    _ => ()
  }
}

///|
fn Lexer::read_identifier(self : Lexer) -> String {
  loop (self.current_char, "") {
    (Some(c), acc) if c.is_numeric() || c.is_ascii_alphabetic() || c == '_' => {
      self.advance()
      continue (self.current_char, acc + c.to_string())
    }
    (_, acc) => break acc
  }
}

///|
fn Lexer::read_quoted_string(self : Lexer) -> String {
  let quote_char = self.current_char.unwrap()
  self.advance() // Skip opening quote
  let result = loop (self.current_char, "") {
    (Some(c), acc) if c == quote_char => break acc // End of string
    (Some('\\'), acc) => {
      self.advance() // Skip escape character
      match self.current_char {
        Some(escaped_char) => {
          self.advance()
          continue (self.current_char, acc + escaped_char.to_string())
        }
        None => break acc // Unexpected end of input
      }
    }
    (Some(c), acc) => {
      self.advance()
      continue (self.current_char, acc + c.to_string())
    }
    (None, acc) => break acc // End of input
  }

  // Skip closing quote
  match self.current_char {
    Some(c) if c == quote_char => self.advance()
    _ => ()
  }
  result
}

///|
fn keyword_or_id(word : String) -> Token {
  match word {
    "strict" => Strict
    "graph" => Graph
    "digraph" => Digraph
    "node" => Node
    "edge" => Edge
    "subgraph" => Subgraph
    _ => ID(word)
  }
}

///|
fn Lexer::next_token(self : Lexer) -> Token {
  while true {
    self.skip_whitespace()
    match self.current_char {
      None => return EOF
      Some('/') | Some('#') => {
        self.skip_comment()
        continue
      }
      Some('{') => {
        self.advance()
        return LeftBrace
      }
      Some('}') => {
        self.advance()
        return RightBrace
      }
      Some('[') => {
        self.advance()
        return LeftBracket
      }
      Some(']') => {
        self.advance()
        return RightBracket
      }
      Some(':') => {
        self.advance()
        return Colon
      }
      Some(';') => {
        self.advance()
        return Semicolon
      }
      Some(',') => {
        self.advance()
        return Comma
      }
      Some('=') => {
        self.advance()
        return Equals
      }
      Some('-') => {
        self.advance()
        match self.current_char {
          Some('-') => {
            self.advance()
            return Line
          }
          Some('>') => {
            self.advance()
            return Arrow
          }
          _ => return ID("-")
        }
      }
      Some('"') | Some('\'') => {
        let str = self.read_quoted_string()
        return ID(str)
      }
      Some(c) if c.is_numeric() || c.is_ascii_alphabetic() || c == '_' => {
        let word = self.read_identifier()
        return keyword_or_id(word)
      }
      Some(c) if c.is_numeric() => {
        let word = self.read_identifier()
        return ID(word)
      }
      Some(c) => {
        self.advance()
        return ID(c.to_string())
      }
    }
  }
  EOF
}

// Parser implementation

///|
pub(all) struct Parser {
  lexer : Lexer
  mut current_token : Token
}

///|
fn Parser::new(input : String) -> Parser {
  let lexer = Lexer::new(input)
  let current_token = lexer.next_token()
  { lexer, current_token }
}

///|
fn Parser::eat(self : Parser, expected : Token) -> Bool {
  match (self.current_token, expected) {
    (ID(_), ID(_)) => {
      self.current_token = self.lexer.next_token()
      true
    }
    (actual, expected) if actual == expected => {
      self.current_token = self.lexer.next_token()
      true
    }
    _ => false
  }
}

///|
fn is_compass_point(s : String) -> Bool {
  match s {
    "n" | "ne" | "e" | "se" | "s" | "sw" | "w" | "nw" | "c" | "_" => true
    _ => false
  }
}

///|
fn parse_compass_point(compass_str : String) -> CompassPoint {
  match compass_str {
    "n" => N
    "ne" => NE
    "e" => E
    "se" => SE
    "s" => S
    "sw" => SW
    "w" => W
    "nw" => NW
    "c" => C
    "_" => Underscore
    _ => C
  } // Default fallback
}

///|
fn Parser::parse_port(self : Parser) -> Port? {
  if not(self.eat(Colon)) {
    return None
  }
  let port = { id: None, compass: None }
  match self.current_token {
    ID(id) =>
      // Check if this ID is a compass point
      if is_compass_point(id) {
        port.compass = Some(parse_compass_point(id))
        ignore(self.eat(ID("")))
      } else {
        port.id = Some(id)
        ignore(self.eat(ID("")))
        if self.eat(Colon) {
          match self.current_token {
            ID(compass_str) if is_compass_point(compass_str) => {
              port.compass = Some(parse_compass_point(compass_str))
              ignore(self.eat(ID("")))
            }
            _ => ()
          }
        }
      }
    _ => ()
  }
  Some(port)
}

///|
fn Parser::parse_node_id(self : Parser) -> NodeId? {
  match self.current_token {
    ID(id) => {
      ignore(self.eat(ID("")))
      let port = self.parse_port()
      Some({ id, port })
    }
    _ => None
  }
}

///|
fn Parser::parse_attribute(self : Parser) -> Attribute? {
  match self.current_token {
    ID(key) => {
      ignore(self.eat(ID("")))
      if self.eat(Equals) {
        match self.current_token {
          ID(value) => {
            ignore(self.eat(ID("")))
            Some({ key, value })
          }
          _ => None
        }
      } else {
        None
      }
    }
    _ => None
  }
}

///|
fn Parser::parse_a_list(self : Parser) -> Array[Attribute] {
  let attributes = []
  while true {
    match self.parse_attribute() {
      Some(attr) => {
        attributes.push(attr)
        match self.current_token {
          Semicolon | Comma => ignore(self.eat(self.current_token))
          _ => ()
        }
      }
      None => break
    }
  }
  attributes
}

///|
fn Parser::parse_attr_list(self : Parser) -> AttributeList? {
  if not(self.eat(LeftBracket)) {
    return None
  }
  let attributes = self.parse_a_list()
  if not(self.eat(RightBracket)) {
    return None
  }
  let attr_list = { attributes, }

  // Handle multiple attribute lists
  match self.parse_attr_list() {
    Some(next_attr_list) =>
      attr_list.attributes.append(next_attr_list.attributes)
    None => ()
  }
  Some(attr_list)
}

///|
fn Parser::parse_edge_rhs(self : Parser) -> Array[(EdgeOp, NodeId)]? {
  let edges = []
  while true {
    let edge_op = match self.current_token {
      Arrow => {
        ignore(self.eat(Arrow))
        Directed
      }
      Line => {
        ignore(self.eat(Line))
        Undirected
      }
      _ => break
    }
    match self.parse_node_id() {
      Some(node_id) => edges.push((edge_op, node_id))
      None => break
    }
  }
  if edges.is_empty() {
    None
  } else {
    Some(edges)
  }
}

///|
fn Parser::parse_statement(self : Parser) -> Statement? {
  match self.current_token {
    // Attribute statement
    Graph | Node | Edge => {
      let attr_type = match self.current_token {
        Graph => {
          ignore(self.eat(Graph))
          "graph"
        }
        Node => {
          ignore(self.eat(Node))
          "node"
        }
        Edge => {
          ignore(self.eat(Edge))
          "edge"
        }
        _ => ""
      }
      match self.parse_attr_list() {
        Some(attr_list) => Some(AttrStmt(attr_type, attr_list))
        None => None
      }
    }

    // Subgraph
    Subgraph =>
      match self.parse_subgraph() {
        Some(subgraph) => Some(Subgraph(subgraph))
        None => None
      }

    // Unhandled tokens
    Digraph
    | Strict
    | LeftBrace
    | RightBrace
    | LeftBracket
    | RightBracket
    | Semicolon
    | Comma
    | Equals
    | CompassPt(_)
    | Arrow
    | Colon
    | Line
    | EOF => None
    ID(_) =>
      match self.parse_node_id() {
        Some(node_id) =>
          // Check if this is an edge or node statement
          match self.parse_edge_rhs() {
            Some(edges) => {
              let attr_list = self.parse_attr_list()
              Some(EdgeStmt(node_id, edges, attr_list))
            }
            None =>
              // Check for assignment
              match node_id.port {
                Some(_) => {
                  // Node statement with port
                  let attr_list = self.parse_attr_list()
                  Some(NodeStmt(node_id, attr_list))
                }
                None =>
                  match self.current_token {
                    Equals => {
                      self.eat(Equals) |> ignore
                      match self.current_token {
                        ID(value) => {
                          self.eat(ID("")) |> ignore
                          Some(Assignment(node_id.id, value))
                        }
                        _ => None
                      }
                    }
                    _ => {
                      // Node statement
                      let attr_list = self.parse_attr_list()
                      Some(NodeStmt(node_id, attr_list))
                    }
                  }
              }
          }
        None => None
      }
  }
}

///|
fn Parser::parse_stmt_list(self : Parser) -> Array[Statement] {
  let statements = []
  while true {
    match self.parse_statement() {
      Some(stmt) => {
        statements.push(stmt)
        // Optional semicolon
        loop self.current_token {
          Semicolon => {
            self.eat(Semicolon) |> ignore
            continue self.current_token
          }
          _ => break
        }
      }
      None => break
    }
  }
  statements
}

///|
fn Parser::parse_subgraph(self : Parser) -> Subgraph? {
  // Optional "subgraph" keyword
  let id = loop (self.current_token, None) {
    (Subgraph, id) => {
      self.eat(Subgraph) |> ignore
      // Optional ID after subgraph
      match self.current_token {
        ID(sub_id) => {
          self.eat(ID("")) |> ignore
          continue (self.current_token, Some(sub_id))
        }
        _ => continue (self.current_token, id)
      }
    }
    (_, id) => break id
  }
  if (self.eat(LeftBrace) |> not) {
    return None
  }
  let statements = self.parse_stmt_list()
  if (self.eat(RightBrace) |> not) {
    return None
  }
  Some({ id, statements })
}

// graph : [ strict ] (graph | digraph) [ ID ] '{' stmt_list '}'

///|
fn Parser::parse_graph(self : Parser) -> Graph? {
  // Optional "strict" [ strict ]
  let strict = match self.current_token {
    Strict => {
      self.eat(Strict) |> ignore
      true
    }
    _ => false
  }

  // "graph" or "digraph" (graph | digraph)
  let directed = match self.current_token {
    Graph => {
      self.eat(Graph) |> ignore
      false
    }
    Digraph => {
      self.eat(Digraph) |> ignore
      true
    }
    _ => return None
  }

  // Optional ID [ ID ]
  let id = match self.current_token {
    ID(graph_id) => {
      self.eat(ID("")) |> ignore
      Some(graph_id)
    }
    _ => None
  }

  // '{'
  if not(self.eat(LeftBrace)) {
    return None
  }

  // statements list stmt_list '}'
  let statements = self.parse_stmt_list()

  // '}'
  if not(self.eat(RightBrace)) {
    return None
  }
  Some({ strict, directed, id, statements })
}

// Public API

///|
pub fn parse_dot(input : String) -> Graph? {
  let parser = Parser::new(input)
  parser.parse_graph()
}

// Helper function to format the AST for debugging

///|
pub fn format_graph(graph : Graph) -> String {
  let mut result = ""
  if graph.strict {
    result = result + "strict "
  }
  if graph.directed {
    result = result + "digraph"
  } else {
    result = result + "graph"
  }
  match graph.id {
    Some(id) => result = result + " " + id
    None => ()
  }
  result = result + " {\n"
  for stmt in graph.statements {
    result = result + "  " + format_statement(stmt) + "\n"
  }
  result = result + "}"
  result
}

///|
fn format_statement(stmt : Statement) -> String {
  match stmt {
    NodeStmt(node_id, attr_list) => {
      let mut result = node_id.id
      match node_id.port {
        Some(port) => {
          result = result + ":"
          match port.id {
            Some(port_id) => result = result + port_id
            None => ()
          }
          match port.compass {
            Some(compass) => result = result + ":" + format_compass(compass)
            None => ()
          }
        }
        None => ()
      }
      match attr_list {
        Some(attrs) => result = result + " " + format_attr_list(attrs)
        None => ()
      }
      result
    }
    EdgeStmt(start_node, edges, attr_list) => {
      let mut result = loop (edges[:], start_node.id) {
        ([], acc) => break acc
        ([(edge_op, node_id), .. rest], acc) => {
          let op_str = match edge_op {
            Directed => " -> "
            Undirected => " -- "
          }
          continue (rest, acc + op_str + node_id.id)
        }
      }
      match attr_list {
        Some(attrs) => result = result + " " + format_attr_list(attrs)
        None => ()
      }
      result
    }
    AttrStmt(attr_type, attr_list) =>
      attr_type + " " + format_attr_list(attr_list)
    Assignment(key, value) => key + " = " + value
    Subgraph(subgraph) => {
      let mut result = "subgraph"
      match subgraph.id {
        Some(id) => result = result + " " + id
        None => ()
      }
      result = result + " { ... }"
      result
    }
  }
}

///|
fn format_compass(compass : CompassPoint) -> String {
  match compass {
    N => "n"
    NE => "ne"
    E => "e"
    SE => "se"
    S => "s"
    SW => "sw"
    W => "w"
    NW => "nw"
    C => "c"
    Underscore => "_"
  }
}

///|
fn format_attr_list(attr_list : AttributeList) -> String {
  let mut result = "["
  let mut first = true
  for attr in attr_list.attributes {
    if not(first) {
      result = result + ", "
    }
    result = result + attr.key + "=" + attr.value
    first = false
  }
  result = result + "]"
  result
}
