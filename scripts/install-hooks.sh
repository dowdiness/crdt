#!/usr/bin/env bash
# Install git pre-commit hook

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

HOOK_FILE="$PROJECT_ROOT/.git/hooks/pre-commit"

echo "Installing pre-commit hook..."

cat > "$HOOK_FILE" << 'EOF'
#!/usr/bin/env bash
# Pre-commit hook: Run moon check and moon fmt --check

set -e

echo "Running pre-commit checks..."

# Check if moon is available
if ! command -v moon &> /dev/null; then
    echo "❌ moon command not found. Please install MoonBit."
    exit 1
fi

# Run moon check
echo "🔍 Running moon check..."
if ! moon check --deny-warn; then
    echo "❌ moon check failed. Please fix the issues and try again."
    exit 1
fi

# Run moon fmt and check for changes
echo "📝 Running moon fmt..."
moon fmt

if ! git diff --exit-code --quiet; then
    echo "❌ Code is not formatted. Changes have been made by moon fmt."
    echo "   Please review the changes and commit again."
    exit 1
fi

echo "✅ Pre-commit checks passed!"
EOF

chmod +x "$HOOK_FILE"

echo "✅ Pre-commit hook installed successfully!"
echo ""
echo "The hook will run 'moon check --deny-warn' and 'moon fmt' before each commit."
echo ""
echo "To bypass the hook (not recommended), use: git commit --no-verify"
