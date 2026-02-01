#!/usr/bin/env bash
# Build script for web deployment
# Automates: moon build --target js && cp target/js/release/build/crdt.js web/public/

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_ROOT"

echo "🔨 Building MoonBit for JavaScript target..."
moon build --target js --release

echo "📦 Copying JS build to web/public/..."
mkdir -p web/public
cp target/js/release/build/crdt.js web/public/

echo "✅ MoonBit build copied successfully!"
echo ""
echo "Next steps:"
echo "  cd web"
echo "  npm run build    # Build for production"
echo "  npm run dev      # Start dev server"
