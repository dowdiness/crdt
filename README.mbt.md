# dowdiness/crdt

## Eg-Walker CRDT Editor in MoonBit

An implementation of the eg-walker CRDT algorithm for collaborative text editing, using the FugueMax sequence CRDT and retreat-advance-apply merge strategy.

## Building

```sh
moon build --target js
cd web
npm install
npm run dev
```

## EBNF Grammar

```ebnf
Expression   ::= BinaryOp

BinaryOp     ::= Application (('+' | '-') Application)*

Application  ::= Atom+

Atom         ::= Integer
               | Variable
               | Lambda
               | IfThenElse
               | '(' Expression ')'

Lambda       ::= ('λ' | '\') Identifier '.' Expression

IfThenElse   ::= 'if' Expression 'then' Expression 'else' Expression

Integer      ::= [0-9]+

Variable     ::= [a-zA-Z_][a-zA-Z0-9_]*

Identifier   ::= Variable
```

## Basic Syntax

### Literals

```
42          // Integer
x           // Variable
```

### Lambda Functions

```
λx.x        // Identity function (using λ symbol)
\x.x        // Identity function (using backslash)
λf.λx.f x   // Nested lambdas
```

### Arithmetic

```
1 + 2       // Addition
5 - 3       // Subtraction
a + b - c   // Chained operations (left-associative)
```

### Function Application

```
f x         // Apply f to x
f x y       // Apply (f x) to y
(λx.x) 5    // Apply identity to 5
```

### Conditionals

```
if x then 1 else 0
if x then y + 1 else y - 1
```

## References

- [Eg-walker paper](https://arxiv.org/abs/2409.14252)
