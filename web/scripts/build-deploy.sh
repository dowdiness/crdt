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

echo "==> Building graphviz module..."
cd graphviz && moon build --target js --release && cd ..

cd web

# Build with Vite (modules should already exist)
npx vite build
