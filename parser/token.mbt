///|
pub enum Token {
  Lambda // λ or \
  Dot // .
  LeftParen // (
  RightParen // )
  Plus // +
  Minus // -
  If // if
  Then // then
  Else // else
  Identifier(String) // variable names
  Integer(Int) // integer literals
  EOF // end of input
} derive(Show, Eq)

///| Token with source position information
pub struct TokenInfo {
  token : Token
  start : Int  // Start byte offset in source
  end : Int    // End byte offset in source
} derive(Show, Eq)

///| Create a new TokenInfo
pub fn TokenInfo::new(token : Token, start : Int, end : Int) -> TokenInfo {
  { token, start, end }
}

///| Print a TokenInfo
pub fn print_token_info(token_info : TokenInfo) -> String {
  let token_str = print_token(token_info.token)
  token_str + "@" + token_info.start.to_string() + "-" + token_info.end.to_string()
}

///| Print an array of TokenInfo
pub fn print_token_infos(tokens : Array[TokenInfo]) -> String {
  let token_strs = tokens.map(print_token_info)
  "[" + token_strs.join(", ") + "]"
}

///|
pub fn print_token(token : Token) -> String {
  match token {
    Lambda => "λ"
    Dot => "."
    LeftParen => "("
    RightParen => ")"
    Plus => "+"
    Minus => "-"
    If => "if"
    Then => "then"
    Else => "else"
    Identifier(name) => name
    Integer(n) => n.to_string()
    EOF => "EOF"
  }
}

///|
pub fn print_tokens(tokens : Array[Token]) -> String {
  let token_strs = tokens.map(print_token)
  "[" + token_strs.join(", ") + "]"
}
