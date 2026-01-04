# Lambda Calculus CRDT Editor - Web Interface

A collaborative lambda calculus editor built with MoonBit CRDT and JavaScript.

## Features

- **Real-time syntax highlighting** for lambda calculus
- **Error recovery** with inline error display
- **CRDT-based** text editing for future collaboration
- **JavaScript-powered** for performance

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MoonBit compiler (for rebuilding Wasm)

### Installation

```bash
# Install dependencies
cd web
npm install
```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:5173
```

### Building

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Rebuilding JavaScript

When you make changes to the MoonBit code:

```bash
# From the crdt/ directory
moon build

# Copy the js file
cp target/js/release/build/crdt.js web/public/
cp target/js/release/build/crdt.d.ts web/public/
```

## Usage

1. Open the editor in your browser
2. Start typing lambda calculus expressions
3. See real-time syntax highlighting and error detection

### Example Expressions

```
(\x. x + 1) 5
(\f. \x. f (f x)) (\y. y * 2) 3
if 1 then 2 else 3
```

## Architecture

- **Frontend**: TypeScript + Vite
- **Backend**: MoonBit CRDT compiled to JavaScript
- **Parser**: Error-recovering lambda calculus parser
- **Editor**: contenteditable-based with AST-driven highlighting

## Next Steps

- [ ] Add WebSocket client for collaboration
- [ ] Implement operation synchronization
- [ ] Add remote cursor tracking
- [ ] Improve syntax highlighting
