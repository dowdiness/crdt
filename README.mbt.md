# dowdiness/crdt

- [Repository](https://github.com/dowdiness/crdt)
- [Web App](https://lambda-editor.koji-ishimoto.workers.dev/)

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

## Performance

Comprehensive benchmarks available:
- **56 benchmarks** across 5 modules
- Baseline performance established
- Small-medium documents (≤1000 ops): **Good performance**
- Large documents (10,000 ops): Optimization needed

Run benchmarks:
```sh
moon bench --release
```

See [PERFORMANCE_ANALYSIS.md](./PERFORMANCE_ANALYSIS.md) for detailed results and [BENCHMARKS.md](./BENCHMARKS.md) for benchmark documentation.

## Documentation

- **[CLAUDE.md](./CLAUDE.md)** - Complete project guide and development workflow
- **[EG_WALKER_IMPLEMENTATION.md](./EG_WALKER_IMPLEMENTATION.md)** - Implementation status and architecture
- **[WALKER_USAGE.md](./WALKER_USAGE.md)** - Event graph walker usage guide
- **[NETWORK_SYNC.md](./NETWORK_SYNC.md)** - Network synchronization guide
- **[BENCHMARKS.md](./BENCHMARKS.md)** - Benchmark documentation
- **[PERFORMANCE_ANALYSIS.md](./PERFORMANCE_ANALYSIS.md)** - Performance baseline and optimization roadmap

## Testing

```sh
moon test                    # Run all tests (329 passing)
moon test --update          # Update test snapshots
moon coverage analyze       # Analyze test coverage
```

## References

- [Eg-walker paper](https://arxiv.org/abs/2409.14252)
- [MoonBit documentation](https://docs.moonbitlang.com)
