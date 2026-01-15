# Architecture and Build System

## MoonBit Library vs Application

**Important:** This module is a **MoonBit library**, not a standalone application. The TypeScript files cannot directly import the compiled MoonBit output.

### How MoonBit JS Build Works

```
MoonBit Library Module (valtio/)
    ↓ moon build --target js
.core and .mi files (NOT standalone .js)
    ↓ Linked in a MoonBit application
Standalone JavaScript bundle
```

## Correct Integration Approach

### Option 1: MoonBit Application with Web Integration (Recommended)

Create a separate MoonBit application that uses this library:

```
project/
├── valtio/              # This library (MoonBit)
├── app/                 # MoonBit application
│   ├── moon.mod.json
│   ├── main/
│   │   └── main.mbt     # Entry point that exports to JS
│   └── web/
│       ├── index.html
│       ├── App.tsx      # React app
│       └── vite.config.ts
```

**app/moon.mod.json:**
```json
{
  "name": "my-app",
  "deps": {
    "antisatori/valtio": { "path": "../valtio" }
  },
  "link": {
    "js": {
      "exports": [
        "create_egwalker_proxy",
        "apply_remote_op",
        "get_pending_ops_json"
      ]
    }
  }
}
```

**app/main/main.mbt:**
```moonbit
fn init {
  // Initialize and export functions to JS
  let proxy = @valtio.EgWalkerProxy::new("user-1", undo_enabled=true)
  proxy.init()
}
```

Then `moon build --target js` in the app will create a standalone bundle.

### Option 2: Direct FFI Exports (Simpler)

Since the TypeScript needs to call MoonBit functions, define them as FFI exports:

**Create src/exports.mbt:**
```moonbit
// Export functions that JavaScript can call directly

pub fn js_create_proxy(agent_id : String, undo : Bool) -> ValtioProxy {
  let proxy = EgWalkerProxy::new(agent_id, undo_enabled=undo)
  proxy.init()
  proxy.proxy_state
}

pub fn js_undo(proxy : ValtioProxy) -> Unit {
  // Access the EgWalkerProxy instance and call undo
}

// Mark these for JS export
pub let _js_exports = {
  create_proxy: js_create_proxy,
  // ... other exports
}
```

### Option 3: Pure TypeScript with MoonBit CRDT Separate (Current Best)

Since direct import won't work, use the FFI interface we already created:

**Current setup:**
- `egwalker_interface.mbt` - Defines FFI stubs
- `egwalker_api.ts` - TypeScript API that calls the stubs
- Integration happens at runtime when MoonBit CRDT is loaded separately

**This means:**
1. Build the valtio library: `moon build --target js`
2. Build a separate CRDT application that uses valtio
3. The CRDT app links everything together

## Recommended Project Structure

```
til/crdt/
├── valtio/                    # This library (MoonBit FFI bindings)
│   ├── src/
│   │   ├── types.mbt
│   │   ├── valtio.mbt
│   │   ├── egwalker_interface.mbt  # FFI stubs
│   │   └── egwalker.mbt
│   └── moon.mod.json
│
├── event-graph-walker/        # CRDT library (MoonBit)
│   └── ...
│
└── example-app/               # Example application
    ├── moon.mod.json          # Depends on both valtio and event-graph-walker
    ├── main.mbt               # Glue code
    ├── web/
    │   ├── index.html
    │   ├── main.ts            # Uses createEgWalkerProxy
    │   └── vite.config.ts
    └── moon.pkg.json
```

**example-app/moon.mod.json:**
```json
{
  "name": "example-app",
  "deps": {
    "antisatori/valtio": { "path": "../valtio" },
    "dowdiness/event-graph-walker": { "path": "../event-graph-walker" }
  },
  "link": {
    "js": {
      "exports": [
        "main"
      ]
    }
  }
}
```

**example-app/main.mbt:**
```moonbit
// Bridge between event-graph-walker and valtio

pub fn main {
  // Initialize the integration
  println("Valtio + eg-walker initialized")
}

// Export factory function to JS
pub fn create_editor(agent_id : String) -> @valtio.ValtioProxy {
  let doc = @document.Document::new(agent_id)
  let proxy = @valtio.EgWalkerProxy::new(agent_id, undo_enabled=true)
  proxy.init()
  proxy.proxy_state
}
```

Then in **web/main.ts:**
```typescript
import { create_editor } from '../target/js/release/build/example-app/example-app.js';
import { useSnapshot } from 'valtio';

const editorProxy = create_editor('user-1');
const snap = useSnapshot(editorProxy);
```

## Current Status

The TypeScript files in this repo are **API demonstrations** showing how the integration WOULD work. To actually use them:

1. Create a MoonBit application (like `example-app/` above)
2. That application depends on both `valtio` and `event-graph-walker`
3. Build that application to JS
4. Import the resulting bundle in your web app

## Why This Architecture?

MoonBit's design philosophy:
- Libraries provide functionality
- Applications compose libraries and export to JS
- FFI is for calling JS from MoonBit OR calling MoonBit from JS (with explicit exports)

Our valtio module is a **library**, so it needs an **application** to be the entry point that links everything.

## Next Steps

To make this fully functional:

1. Create `example-app/` directory
2. Set up moon.mod.json with deps on valtio + event-graph-walker
3. Write main.mbt that bridges the two
4. Add link.js.exports in moon.mod.json
5. Build and get actual usable .js output
