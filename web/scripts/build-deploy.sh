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
ls -la target/js/release/build/crdt.js 2>&1 || echo "WARNING: crdt.js not found at expected path"
find target -name "crdt.js" 2>/dev/null || echo "WARNING: crdt.js not found anywhere in target/"

echo "==> Building graphviz module..."
cd graphviz
moon build --target js --release
echo "==> graphviz build exit code: $?"
ls -la target/js/release/build/browser/browser.js 2>&1 || echo "WARNING: browser.js not found at expected path"
find target -name "browser.js" 2>/dev/null || echo "WARNING: browser.js not found anywhere in target/"
cd ..

cd web

# Build with Vite (modules should already exist)
npx vite build
