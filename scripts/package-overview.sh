#!/usr/bin/env bash
# Compact package overview for SessionStart hook.
# Outputs package paths, pub symbol counts, key public types, and submodule deps.
set -euo pipefail
cd "$(git -C "$(dirname "$0")" rev-parse --show-toplevel)"

# Capture outline once per package; reuse for both count and type extraction.
declare -A pkg_types

echo "=== Package Map (live) ==="
for dir in . core editor protocol projection relay ffi \
  lang/lambda lang/lambda/proj lang/lambda/flat lang/lambda/eval lang/lambda/edits \
  lang/json lang/json/proj lang/json/edits cmd/main; do
  outline=$(NEW_MOON_MOD=0 moon ide outline "$dir" 2>/dev/null || true)
  count=$(printf '%s\n' "$outline" | grep -c "pub" || true)
  printf "  %-30s %s pub symbols\n" "$dir/" "${count:-0}"
  case "$dir" in core|editor|protocol|projection|relay)
    # Extract structural definitions only (not pub type aliases)
    pkg_types[$dir]=$(printf '%s\n' "$outline" \
      | grep -E '[|] pub (struct|enum|trait) ' \
      | sed -E 's/.*[|] pub (struct|enum|trait) ([^ ]+).*/\2/' \
      || true)
    ;;
  esac
done

echo ""
echo "=== Key Public Types (struct/enum/trait) ==="
for pkg in core editor protocol projection relay; do
  raw=${pkg_types[$pkg]:-}
  if [ -n "$raw" ]; then
    total=$(printf '%s\n' "$raw" | wc -l | tr -d ' ')
    displayed=$(printf '%s\n' "$raw" | head -8 | tr '\n' ' ')
    suffix=""
    [ "$total" -gt 8 ] && suffix="..."
    printf "  %-14s %s%s\n" "$pkg:" "$displayed" "$suffix"
  fi
done

echo ""
echo "=== Submodule deps ==="
grep 'path = ' .gitmodules 2>/dev/null | sed 's/.*= /  /' || echo "  (none)"

echo ""
echo "=== Use 'NEW_MOON_MOD=0 moon ide outline <path>' for package details ==="
echo "=== See 'docs/api-map.md' for task→API index ==="
