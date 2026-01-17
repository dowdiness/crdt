# Build and Usage Guide

## MoonBit Compilation

The TypeScript code imports from the MoonBit compiled output. Here's how to build and use:

### 1. Build MoonBit to JavaScript

```bash
# From the valtio directory
moon build --target js
```

This creates the compiled output at:
```
target/js/release/build/valtio/valtio.js
```

### 2. Import Paths

The TypeScript files import from this location:

```typescript
// In egwalker_api.ts and egwalker_api_sync.ts
import * as valtioEgwalker from '../target/js/release/build/valtio/valtio.js';
```

**Important:** The TypeScript will show import errors until you run `moon build --target js` first.

## Development Workflow

### Option 1: Build Before TypeScript

```bash
# 1. Build MoonBit
moon build --target js

# 2. Now TypeScript can resolve imports
npm run build  # or use your bundler
```

### Option 2: Watch Mode

```bash
# Terminal 1: Watch MoonBit changes
moon build --target js --watch

# Terminal 2: Watch TypeScript/React
npm run dev
```

### Option 3: Build Script

Create a combined build script in `package.json`:

```json
{
  "scripts": {
    "prebuild": "moon build --target js",
    "build": "tsc",
    "predev": "moon build --target js",
    "dev": "vite"
  }
}
```

## Distribution

For distributing this as a package, you have several options:

### Option A: Include Compiled JS

Include the compiled MoonBit output in your package:

```json
{
  "files": [
    "src/",
    "target/js/release/build/valtio/"
  ]
}
```

### Option B: Post-Install Build

Add a postinstall script:

```json
{
  "scripts": {
    "postinstall": "moon build --target js"
  }
}
```

**Caveat:** Users need MoonBit installed.

### Option C: Pre-compiled Bundle

Commit the compiled output to git:

```bash
# Build once
moon build --target js

# Commit the output
git add target/js/release/build/
git commit -m "Add pre-compiled MoonBit output"
```

**Recommended for end users who don't have MoonBit installed.**

## Import Resolution

### For TypeScript Development

Create type declarations to suppress import errors during development:

```typescript
// src/valtio.d.ts
declare module '../target/js/release/build/valtio/valtio.js' {
  export function create_egwalker_proxy(
    agent_id: string,
    undo_enabled: boolean
  ): any;
  export function apply_remote_op(proxy: any, op_json: string): void;
  export function get_pending_ops_json(proxy: any): string;
  export function get_frontier_json(proxy: any): string;
  export function get_frontier_raw_json(proxy: any): string;
  export function undo(proxy: any): void;
  export function redo(proxy: any): void;
  export function dispose_proxy(proxy: any): void;
}
```

### For Bundlers (Vite, Webpack)

Most bundlers will resolve the relative path correctly if the file exists.

**Vite example:**

```typescript
// vite.config.ts
export default defineConfig({
  resolve: {
    alias: {
      '@moonbit': path.resolve(__dirname, 'target/js/release/build/valtio'),
    },
  },
});

// Then import as:
import * as valtio from '@moonbit/valtio.js';
```

## Recommended Setup for Projects

### 1. For Library Authors (Publishing to npm)

```bash
# Include pre-compiled output
moon build --target js
git add -f target/js/release/build/
npm publish
```

### 2. For Application Developers

```json
{
  "scripts": {
    "prebuild": "moon build --target js",
    "build": "vite build",
    "dev": "moon build --target js && vite"
  }
}
```

### 3. For Monorepos

```bash
# Root package.json
{
  "scripts": {
    "build:moonbit": "cd packages/valtio && moon build --target js",
    "build": "npm run build:moonbit && turbo run build"
  }
}
```

## CI/CD Setup

### GitHub Actions Example

```yaml
name: Build and Test

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Install MoonBit
        run: |
          curl -fsSL https://cli.moonbitlang.com/install/unix.sh | bash
          echo "$HOME/.moon/bin" >> $GITHUB_PATH

      - name: Build MoonBit
        run: moon build --target js
        working-directory: valtio

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build TypeScript
        run: npm run build
```

## Troubleshooting

### "Cannot find module '../target/js/release/build/valtio/valtio.js'"

**Solution:** Run `moon build --target js` first.

### "moon: command not found"

**Solution:** Install MoonBit:
```bash
curl -fsSL https://cli.moonbitlang.com/install/unix.sh | bash
```

### TypeScript errors before building

**Solution:** This is expected. TypeScript will complain until the MoonBit code is compiled. Add the type declarations file mentioned above to suppress errors during development.

### Import paths don't resolve in bundler

**Solution:** Check your bundler configuration. You may need to add an alias or adjust module resolution settings.

## Best Practices

1. **Always build MoonBit before TypeScript**
   - Use `prebuild` scripts
   - Document this in README

2. **For npm packages, include compiled output**
   - Don't require users to have MoonBit installed
   - Commit `target/js/release/build/` to git

3. **For development, use watch mode**
   - Run `moon build --target js --watch`
   - Faster iteration

4. **Add type declarations**
   - Create `.d.ts` files for the MoonBit output
   - Better IDE support during development

5. **Document the build requirement**
   - Clear instructions in README
   - Error messages that guide users
