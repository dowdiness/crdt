#!/bin/sh
set -e

# Install MoonBit CLI
curl -fsSL https://cli.moonbitlang.com/install/unix.sh | bash
export PATH="$HOME/.moon/bin:$PATH"
moon version --all

# Move to repo root
cd ..

# Initialize git submodules
echo "==> Initializing submodules..."
git submodule update --init --recursive
echo "==> Submodules initialized"

# Install MoonBit package dependencies
echo "==> Running moon update (root)..."
moon update
echo "==> Running moon update (graphviz)..."
cd graphviz && moon update && cd ..

# Pre-build MoonBit modules explicitly
echo "==> Building crdt module..."
moon build --target js --release
echo "==> crdt build exit code: $?"

# Debug: find where moon actually put the output
echo "==> Searching for crdt.js output..."
find . -name "crdt.js" -not -path "*/node_modules/*" -not -path "*/web/*" 2>/dev/null
echo "==> Listing build directories..."
ls -la target 2>/dev/null || echo "no target/"
ls -la _build 2>/dev/null || echo "no _build/"
ls -R target/js/ 2>/dev/null || echo "no target/js/"
ls -R _build/js/ 2>/dev/null || echo "no _build/js/"

echo "==> Building graphviz module..."
cd graphviz
moon build --target js --release
echo "==> graphviz build exit code: $?"
find . -name "browser.js" -not -path "*/node_modules/*" 2>/dev/null
ls -R target/js/ 2>/dev/null || echo "no target/js/"
ls -R _build/js/ 2>/dev/null || echo "no _build/js/"
cd ..

cd web

# Build with Vite (modules should already exist)
npx vite build
