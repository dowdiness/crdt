// Parser for Lambda Calculus expressions

///|
pub suberror ParseError (String, Token)

///|
priv struct Parser {
  tokens : Array[TokenInfo]
  mut position : Int
}

///|
fn make_parser(tokens : Array[TokenInfo]) -> Parser {
  { tokens, position: 0 }
}

///|
fn peek(parser : Parser) -> Token {
  if parser.position < parser.tokens.length() {
    parser.tokens[parser.position].token
  } else {
    EOF
  }
}

///|
fn advance(parser : Parser) -> Parser {
  parser.position = parser.position + 1
  parser
}

///|
fn expect(parser : Parser, expected : Token) -> Parser raise ParseError {
  let current = peek(parser)
  match (current, expected) {
    (a, b) if a == b => advance(parser)
    _ => raise ParseError(("Expected token", expected))
  }
}

///| Parse the input string into a Term
pub fn parse(input : String) -> Term raise {
  let tokens = tokenize(input)
  let parser = make_parser(tokens)
  letrec parse_expression = fn(parser : Parser) -> (Parser, Term) raise {
    parse_binary_op(parser)
  }
  and parse_binary_op = fn(parser : Parser) -> (Parser, Term) raise {
    let (parser, left) = parse_application(parser)
    loop (parser, left) {
      (parser, term) =>
        match peek(parser) {
          Plus => {
            let parser = advance(parser)
            let (parser, right) = parse_application(parser)
            continue (parser, Term::Bop(Bop::Plus, term, right))
          }
          Minus => {
            let parser = advance(parser)
            let (parser, right) = parse_application(parser)
            continue (parser, Term::Bop(Bop::Minus, term, right))
          }
          _ => break (parser, term)
        }
    }
  }
  and parse_application = fn(parser : Parser) -> (Parser, Term) raise {
    let (parser, first) = parse_atom(parser)
    loop (parser, first) {
      (parser, acc) =>
        match peek(parser) {
          LeftParen | Identifier(_) | Integer(_) | Lambda => {
            let (parser, next) = parse_atom(parser)
            continue (parser, Term::App(acc, next))
          }
          _ => break (parser, acc)
        }
    }
  }
  and parse_atom = fn(parser : Parser) -> (Parser, Term) raise {
    match peek(parser) {
      Integer(n) => (advance(parser), Term::Int(n))
      Identifier(name) => (advance(parser), Term::Var(name))
      Lambda => {
        let parser = advance(parser)
        match peek(parser) {
          Identifier(param) => {
            let parser = advance(parser)
            let parser = expect(parser, Dot)
            let (parser, body) = parse_expression(parser)
            (parser, Term::Lam(param, body))
          }
          token => raise ParseError(("Expected parameter after λ", token))
        }
      }
      If => {
        let parser = advance(parser)
        let (parser, condition) = parse_expression(parser)
        let parser = expect(parser, Then)
        let (parser, then_expr) = parse_expression(parser)
        let parser = expect(parser, Else)
        let (parser, else_expr) = parse_expression(parser)
        (parser, Term::If(condition, then_expr, else_expr))
      }
      LeftParen => {
        let parser = advance(parser)
        let (parser, expr) = parse_expression(parser)
        let parser = expect(parser, RightParen)
        (parser, expr)
      }
      token => raise ParseError(("Unexpected token", token))
    }
  }

  let (final_parser, expr) = parse_expression(parser)
  match peek(final_parser) {
    EOF => expr
    token => raise ParseError(("Unexpected tokens after expression", token))
  }
}

///| Parser state with node ID counter for positioned parsing
priv struct PositionedParser {
  tokens : Array[TokenInfo]
  mut position : Int
  mut node_id_counter : Int
}

///|
fn make_positioned_parser(tokens : Array[TokenInfo]) -> PositionedParser {
  { tokens, position: 0, node_id_counter: 0 }
}

///|
fn next_node_id(parser : PositionedParser) -> Int {
  let id = parser.node_id_counter
  parser.node_id_counter = parser.node_id_counter + 1
  id
}

///|
fn peek_positioned(parser : PositionedParser) -> Token {
  if parser.position < parser.tokens.length() {
    parser.tokens[parser.position].token
  } else {
    EOF
  }
}

///|
fn peek_info_positioned(parser : PositionedParser) -> TokenInfo {
  if parser.position < parser.tokens.length() {
    parser.tokens[parser.position]
  } else {
    TokenInfo::new(EOF, 0, 0)
  }
}

///|
fn advance_positioned(parser : PositionedParser) -> PositionedParser {
  parser.position = parser.position + 1
  parser
}

///|
fn expect_positioned(
  parser : PositionedParser,
  expected : Token
) -> PositionedParser raise ParseError {
  let current = peek_positioned(parser)
  match (current, expected) {
    (a, b) if a == b => advance_positioned(parser)
    _ => raise ParseError(("Expected token", expected))
  }
}

///| Parse the input string into a TermNode with position tracking
pub fn parse_positioned(input : String) -> TermNode raise {
  let tokens = tokenize(input)
  let parser = make_positioned_parser(tokens)

  letrec parse_expression = fn(
    parser : PositionedParser
  ) -> (PositionedParser, TermNode) raise {
    parse_binary_op(parser)
  }
  and parse_binary_op = fn(
    parser : PositionedParser
  ) -> (PositionedParser, TermNode) raise {
    let (parser, left) = parse_application(parser)
    loop (parser, left) {
      (parser, term) =>
        match peek_positioned(parser) {
          Plus => {
            let parser = advance_positioned(parser)
            let (parser, right) = parse_application(parser)
            let start = term.start
            let end = right.end
            let node_id = next_node_id(parser)
            let node = TermNode::new(TermKind::Bop(Bop::Plus), start, end, node_id, [
              term,
              right,
            ])
            continue (parser, node)
          }
          Minus => {
            let parser = advance_positioned(parser)
            let (parser, right) = parse_application(parser)
            let start = term.start
            let end = right.end
            let node_id = next_node_id(parser)
            let node = TermNode::new(TermKind::Bop(Bop::Minus), start, end, node_id, [
              term,
              right,
            ])
            continue (parser, node)
          }
          _ => break (parser, term)
        }
    }
  }
  and parse_application = fn(
    parser : PositionedParser
  ) -> (PositionedParser, TermNode) raise {
    let (parser, first) = parse_atom(parser)
    loop (parser, first) {
      (parser, acc) =>
        match peek_positioned(parser) {
          LeftParen | Identifier(_) | Integer(_) | Lambda => {
            let (parser, next) = parse_atom(parser)
            let start = acc.start
            let end = next.end
            let node_id = next_node_id(parser)
            let node = TermNode::new(TermKind::App, start, end, node_id, [acc, next])
            continue (parser, node)
          }
          _ => break (parser, acc)
        }
    }
  }
  and parse_atom = fn(
    parser : PositionedParser
  ) -> (PositionedParser, TermNode) raise {
    let token_info = peek_info_positioned(parser)
    match token_info.token {
      Integer(n) => {
        let node_id = next_node_id(parser)
        let node = TermNode::new(
          TermKind::Int(n),
          token_info.start,
          token_info.end,
          node_id,
          [],
        )
        (advance_positioned(parser), node)
      }
      Identifier(name) => {
        let node_id = next_node_id(parser)
        let node = TermNode::new(
          TermKind::Var(name),
          token_info.start,
          token_info.end,
          node_id,
          [],
        )
        (advance_positioned(parser), node)
      }
      Lambda => {
        let lambda_start = token_info.start
        let parser = advance_positioned(parser)
        let param_info = peek_info_positioned(parser)
        match param_info.token {
          Identifier(param) => {
            let parser = advance_positioned(parser)
            let parser = expect_positioned(parser, Dot)
            let (parser, body) = parse_expression(parser)
            let node_id = next_node_id(parser)
            let node = TermNode::new(
              TermKind::Lam(param),
              lambda_start,
              body.end,
              node_id,
              [body],
            )
            (parser, node)
          }
          token => raise ParseError(("Expected parameter after λ", token))
        }
      }
      If => {
        let if_start = token_info.start
        let parser = advance_positioned(parser)
        let (parser, condition) = parse_expression(parser)
        let parser = expect_positioned(parser, Then)
        let (parser, then_expr) = parse_expression(parser)
        let parser = expect_positioned(parser, Else)
        let (parser, else_expr) = parse_expression(parser)
        let node_id = next_node_id(parser)
        let node = TermNode::new(
          TermKind::If,
          if_start,
          else_expr.end,
          node_id,
          [condition, then_expr, else_expr],
        )
        (parser, node)
      }
      LeftParen => {
        let paren_start = token_info.start
        let parser = advance_positioned(parser)
        let (parser, expr) = parse_expression(parser)
        let close_info = peek_info_positioned(parser)
        let parser = expect_positioned(parser, RightParen)
        // Update the end position to include the closing paren
        let node_id = next_node_id(parser)
        let node = TermNode::new(
          expr.kind,
          paren_start,
          close_info.end,
          node_id,
          expr.children,
        )
        (parser, node)
      }
      token => raise ParseError(("Unexpected token", token))
    }
  }

  let (final_parser, expr) = parse_expression(parser)
  match peek_positioned(final_parser) {
    EOF => expr
    token => raise ParseError(("Unexpected tokens after expression", token))
  }
}
