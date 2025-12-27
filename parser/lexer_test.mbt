// ===== Tokenizer Tests =====

test "tokenize simple integer" {
  let tokens = tokenize("42")
  let token_str = print_token_infos(tokens)
  inspect(token_str.contains("42"), content="true")
  inspect(token_str.contains("EOF"), content="true")
}

test "tokenize simple variable" {
  let tokens = tokenize("x")
  let token_str = print_token_infos(tokens)
  inspect(token_str.contains("x"), content="true")
  inspect(token_str.contains("EOF"), content="true")
}

test "tokenize lambda expression" {
  let tokens = tokenize("λx.x")
  let token_str = print_token_infos(tokens)
  inspect(token_str.contains("λ"), content="true")
  inspect(token_str.contains("x"), content="true")
  inspect(token_str.contains("."), content="true")
}

test "tokenize with backslash lambda" {
  let tokens = tokenize("\\x.x")
  let token_str = print_token_infos(tokens)
  inspect(token_str.contains("λ"), content="true")
}

test "tokenize plus binary operator" {
  let tokens = tokenize("1 + 2")
  let token_str = print_token_infos(tokens)
  inspect(token_str.contains("1"), content="true")
  inspect(token_str.contains("+"), content="true")
  inspect(token_str.contains("2"), content="true")
}

test "tokenize minus binary operator" {
  let tokens = tokenize("5 - 2")
  let token_str = print_token_infos(tokens)
  inspect(token_str.contains("5"), content="true")
  inspect(token_str.contains("-"), content="true")
}

test "tokenize if-then-else" {
  let tokens = tokenize("if x then y else z")
  let token_str = print_token_infos(tokens)
  inspect(token_str.contains("if"), content="true")
  inspect(token_str.contains("then"), content="true")
  inspect(token_str.contains("else"), content="true")
}

test "tokenize parentheses" {
  let tokens = tokenize("(x)")
  let token_str = print_token_infos(tokens)
  inspect(token_str.contains("("), content="true")
  inspect(token_str.contains("x"), content="true")
}

test "tokenize multi-digit integer" {
  let tokens = tokenize("12345")
  let token_str = print_token_infos(tokens)
  inspect(token_str.contains("12345"), content="true")
}

test "tokenize identifier with numbers" {
  let tokens = tokenize("x1y2")
  let token_str = print_token_infos(tokens)
  inspect(token_str.contains("x1y2"), content="true")
}

test "tokenize whitespace handling" {
  let tokens = tokenize("  x   y  ")
  let token_str = print_token_infos(tokens)
  inspect(token_str.contains("x"), content="true")
  inspect(token_str.contains("y"), content="true")
}

test "tokenize complex expression" {
  let tokens = tokenize("λf.λx.(f (f x))")
  inspect(tokens.length() > 0, content="true")
}

test "tokenize error - invalid character" {
  let should_error = try {
    let _tokens = tokenize("@")
    false
  } catch {
    TokenizationError(_) => true
  }
  inspect(should_error, content="true")
}
