# Parser Module

A lexer and parser implementation for Lambda Calculus expressions with extensions for arithmetic operations and conditional expressions.

## Overview

This module provides a complete parsing pipeline for a Lambda Calculus-based language, transforming text input into an Abstract Syntax Tree (AST) representation. The implementation follows a traditional two-phase approach:

1. **Lexical Analysis (Lexer)**: Tokenizes input strings into a stream of tokens
2. **Syntactic Analysis (Parser)**: Parses token streams into typed AST terms

## Features

- **Lambda Calculus Core**: Variables, lambda abstractions, and function applications
- **Arithmetic Operations**: Binary operators (`+`, `-`)
- **Conditionals**: If-then-else expressions
- **Robust Error Handling**: Custom error types for tokenization and parsing failures
- **Pretty Printing**: Convert AST back to readable string representations

## Language Syntax

### Basic Elements

```
Integer    ::= [0-9]+
Identifier ::= [a-zA-Z][a-zA-Z0-9]*
Lambda     ::= λ | \
```

### Grammar

```
Expression  ::= BinaryOp

BinaryOp    ::= Application (('+' | '-') Application)*

Application ::= Atom Atom*

Atom        ::= Integer
              | Identifier
              | Lambda Identifier '.' Expression
              | 'if' Expression 'then' Expression 'else' Expression
              | '(' Expression ')'
```

### Operator Precedence (lowest to highest)

1. Binary operators (`+`, `-`) - left associative
2. Function application - left associative
3. Lambda abstraction - right associative

## Data Types

### Token

Represents lexical units in the input:

```moonbit
pub enum Token {
  Lambda        // λ or \
  Dot           // .
  LeftParen     // (
  RightParen    // )
  Plus          // +
  Minus         // -
  If            // if
  Then          // then
  Else          // else
  Identifier(String)  // variable names
  Integer(Int)        // integer literals
  EOF           // end of input
}
```

### Term

Represents parsed expressions as an AST:

```moonbit
pub enum Bop {
  Plus
  Minus
}

pub enum Term {
  Int(Int)                // Integer literal
  Var(VarName)           // Variable
  Lam(VarName, Term)     // Lambda abstraction
  App(Term, Term)        // Function application
  Bop(Bop, Term, Term)   // Binary operation
  If(Term, Term, Term)   // Conditional expression
}
```

## Public API

### Tokenization

```moonbit
pub fn tokenize(String) -> Array[Token] raise TokenizationError
```

Converts an input string into an array of tokens. Raises `TokenizationError` if the input contains invalid characters.

**Example:**
```moonbit
let tokens = tokenize("λx.x + 1")
// [Lambda, Identifier("x"), Dot, Identifier("x"), Plus, Integer(1), EOF]
```

### Parsing

```moonbit
pub fn parse(String) -> Term raise
```

Parses an input string directly into a Term AST. Raises errors if tokenization fails or if the input contains syntax errors.

**Example:**
```moonbit
let ast = parse("λx.x + 1")
// Lam("x", Bop(Plus, Var("x"), Int(1)))
```

### Pretty Printing

```moonbit
pub fn print_term(Term) -> String
```

Converts a Term AST back into a human-readable string representation.

**Example:**
```moonbit
let ast = parse("λx.x + 1")
let output = print_term(ast)
// "(λx. (x + 1))"
```

```moonbit
pub fn print_token(Token) -> String
```

Converts a single token to its string representation.

```moonbit
pub fn print_tokens(Array[Token]) -> String
```

Converts an array of tokens to a bracketed, comma-separated string.

## Usage Examples

### Simple Lambda Function

```moonbit
let identity = parse("λx.x")
print_term(identity)
// "(λx. x)"
```

### Function Application

```moonbit
let apply = parse("(λx.x) 42")
print_term(apply)
// "((λx. x) 42)"
```

### Arithmetic Operations

```moonbit
let arithmetic = parse("10 - 5 + 2")
print_term(arithmetic)
// "((10 - 5) + 2)"
```

### Conditional Expressions

```moonbit
let conditional = parse("if x then y else z")
print_term(conditional)
// "if x then y else z"
```

### Complex Nested Expression

```moonbit
let complex = parse("(λf.λx.if f x then x + 1 else x - 1)")
print_term(complex)
// "(λf. (λx. if (f x) then (x + 1) else (x - 1)))"
```

### Church Numerals

```moonbit
// Church encoding of number 2
let two = parse("λf.λx.f (f x)")
print_term(two)
// "(λf. (λx. (f (f x))))"
```

## Error Handling

The module provides two custom error types:

### TokenizationError

Raised when the lexer encounters an invalid character or encoding issue.

```moonbit
pub suberror TokenizationError String
```

**Example:**
```moonbit
try {
  let result = tokenize("@invalid")
} catch {
  TokenizationError(msg) => println("Tokenization failed: " + msg)
}
```

### ParseError

Raised when the parser encounters unexpected tokens or malformed syntax.

```moonbit
pub suberror ParseError (String, Token)
```

**Example:**
```moonbit
try {
  let result = parse("λ.x")  // Missing parameter name
} catch {
  ParseError((msg, token)) => {
    println("Parse error: " + msg)
    println("At token: " + print_token(token))
  }
}
```

## Implementation Details

### Lexer ([lexer.mbt](lexer.mbt))

The lexer performs character-by-character scanning with:
- **Whitespace handling**: Automatically skips spaces, tabs, and newlines
- **Keyword recognition**: Identifies reserved words (`if`, `then`, `else`)
- **Number parsing**: Reads multi-digit integers
- **Identifier reading**: Supports alphanumeric variable names
- **Unicode support**: Accepts both `λ` (U+03BB) and `\` for lambda

### Parser ([parser.mbt](parser.mbt))

The parser uses recursive descent with mutual recursion:

1. **`parse_expression`**: Entry point, delegates to binary operations
2. **`parse_binary_op`**: Handles left-associative `+` and `-` operators
3. **`parse_application`**: Handles left-associative function application
4. **`parse_atom`**: Parses terminals and parenthesized expressions

**Key Features:**
- **Left-associative application**: `f x y` parses as `((f x) y)`
- **Left-associative operators**: `1 + 2 - 3` parses as `((1 + 2) - 3)`
- **Right-associative lambda**: `λx.λy.x` parses with nested abstractions
- **Lookahead parsing**: Uses `peek()` to inspect next token without consuming

### Pretty Printer ([term.mbt](term.mbt))

The `print_term` function traverses the AST and reconstructs expressions with:
- Parentheses for clarity (may add extra parens for unambiguous output)
- Lambda notation using `λ` character
- Infix notation for binary operations
- Natural formatting for conditionals

## Testing

The module includes comprehensive tests ([parser_test.mbt](parser_test.mbt)) covering:

- **Basic parsing**: Integers, variables, simple lambdas
- **Complex expressions**: Nested lambdas, multiple applications, mixed operators
- **Error cases**: Missing tokens, unmatched parentheses, malformed syntax
- **Edge cases**: Single characters, large numbers, operator chains
- **Integration**: Complete expressions using all language features

Run tests with:
```bash
moon test parser
```

## Relation to CRDT

While this parser module is currently a standalone Lambda Calculus parser, it can serve as a foundation for future CST (Concrete Syntax Tree) integration with the CRDT module. The AST representation in this module demonstrates how tree-structured data can be represented and manipulated, which aligns with the planned CST support for the CRDT implementation.

Potential integration points:
- The `Term` enum could be adapted as a CST node representation
- The parser could generate CRDT operations for incremental parsing
- The AST could be stored in a CRDT TreeDocument for collaborative editing

## References

- **Lambda Calculus**: Church's λ-calculus formal system for computation
- **Recursive Descent Parsing**: Top-down parsing technique used in implementation
- **Abstract Syntax Trees**: Tree representation of program structure

## Future Enhancements

Possible extensions for the parser:

1. **Type System**: Add type annotations and type checking
2. **More Operators**: Multiplication, division, comparison operators
3. **Let Bindings**: Local variable definitions
4. **Pattern Matching**: Advanced lambda parameter patterns
5. **Source Locations**: Track line/column information for better error messages
6. **Incremental Parsing**: Support for parsing partial/updated input (for CRDT integration)
