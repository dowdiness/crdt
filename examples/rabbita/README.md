# Rabbita Projectional Editor Example

This directory is a Rabbita app scaffolded to follow the
[`moonbit-community/rabbita-template`](https://github.com/moonbit-community/rabbita-template)
layout:

- `moon.mod.json`
- `main/moon.pkg`
- `main/main.mbt`
- `index.html`
- `styles.css`
- `vite.config.js`
- `package.json`

The app is a frontend shell for the projectional editor architecture in this
repo. It is intentionally a UI-first prototype, not a fully wired editor yet.

## What is here

- `main/main.mbt` renders a Rabbita app with:
  - toolbar mode switching
  - a tree-first editor pane
  - a synchronized text pane
  - an inspector sidebar
- `app_sketch.mbt` keeps the larger AST-first integration sketch

## Getting started

From this directory:

```bash
moon add moonbit-community/rabbita
bun install
bun run dev
```

Then open the Vite URL in your browser.

## Notes

- This example is a separate MoonBit module under `examples/rabbita`.
- It is not wired into the root `dowdiness/crdt` module graph.
- The current UI demonstrates the intended Rabbita shape while the editor core
  is still converging on the `SyncEditor` facade described in
  `docs/design/03-unified-editor.md`.

## Cloudflare Pages

`bun run build` now bootstraps the MoonBit CLI when it is missing, initializes
required git submodules, and runs `moon update` in CI-style environments before
invoking Vite. That is the correct build command for Cloudflare Pages.

The example pins `bun@1.2.15` in `package.json` to match the Bun version
reported by Cloudflare for this project.

If you prefer an explicit CI command, `bun run build:deploy` runs the same flow
with `CI=true`.

The scripts remain package-manager neutral, so `npm run build` still works
locally if you already have npm set up.

Recommended Cloudflare Pages settings for this example:

- Root directory: `examples/rabbita`
- Install command: `bun install`
- Build command: `bun run build`
- Build output directory: `dist`

The Wrangler files under `web/` in this repo are for a different deployment
target and do not configure `examples/rabbita`.

If your Cloudflare project runs a deploy command such as `bunx wrangler deploy`,
this example now includes a local `wrangler.jsonc` that declares `dist` as the
static asset directory and enables SPA fallback routing.
