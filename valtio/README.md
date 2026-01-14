# Valtio FFI Bindings for MoonBit

JavaScript Foreign Function Interface bindings for [Valtio](https://github.com/pmndrs/valtio), a proxy-based state management library.

## Overview

This module provides MoonBit bindings to Valtio's core APIs, enabling reactive state management in MoonBit applications targeting JavaScript.

## Features

- ✅ Core proxy/snapshot API
- ✅ Subscription system
- ✅ React hooks (useSnapshot)
- ✅ Vanilla mode (no React dependency)
- ✅ Type-safe property accessors
- ✅ JSON conversion helpers

## Installation

Add to your `moon.mod.json`:

```json
{
  "deps": {
    "antisatori/valtio": "0.1.0"
  }
}
```

Install Valtio via npm/yarn:

```bash
npm install valtio
```

## Quick Start

### Basic Usage (Vanilla)

```moonbit
let state = from_json("{\"count\": 0, \"text\": \"hello\"}")
let proxy_state = proxy(state)

// Subscribe to changes
let unsub = subscribe(proxy_state, fn() {
  let snap = snapshot(proxy_state)
  println(to_json(snap))
})

// Mutate state (triggers subscription)
set_int(proxy_state, "count", 1)

// Clean up
unsubscribe(unsub)
```

### With Property Helpers

```moonbit
let state = js_object()
set_int(state, "count", 0)
set_string(state, "text", "hello")

let proxy_state = proxy(state)

let count = get_int(proxy_state, "count")
println(count)  // 0

set_int(proxy_state, "count", count + 1)
```

### React Integration

```moonbit
// In a React component context
let proxy_state = proxy(initial_state)

// In render function
let snap = use_snapshot(proxy_state)
// Use snap for rendering - component re-renders on changes
```

### Subscriptions

```moonbit
// Subscribe to all changes
let unsub = subscribe(proxy_state, fn() {
  println("State changed!")
})

// Subscribe to specific key (primitive values only)
let unsub_key = subscribe_key(proxy_state, "count", fn() {
  println("Count changed!")
})

// Watch with auto-tracking
let watch_unsub = watch(
  fn() {
    let count = get_int(proxy_state, "count")
    println("Count is now: \{count}")
  },
  js_object()
)
```

## API Reference

### Core Functions

#### `proxy[T](initial_state: T) -> ValtioProxy`
Create a reactive proxy that tracks mutations.

#### `snapshot(proxy_state: ValtioProxy) -> ValtioSnapshot`
Get an immutable snapshot of current state (vanilla mode).

#### `use_snapshot(proxy_state: ValtioProxy) -> ValtioSnapshot`
React hook for creating render-optimized snapshots.

#### `subscribe(proxy_state: ValtioProxy, callback: SubscribeCallback) -> ValtioSubscription`
Subscribe to any state changes.

#### `unsubscribe(subscription: ValtioSubscription) -> Unit`
Cancel a subscription.

### Property Accessors

- `get_string/int/double/bool(proxy, key)`
- `set_string/int/double/bool(proxy, key, value)`
- `set_proxy(proxy, key, value)`

### JSON Helpers

- `js_object() -> ValtioProxy` - Create empty object
- `from_json(json: String) -> ValtioProxy` - Parse JSON
- `to_json(snapshot: ValtioSnapshot) -> String` - Serialize to JSON

### Advanced APIs

- `subscribe_key(proxy, key, callback)` - Subscribe to single property
- `watch(callback, options)` - Auto-tracking watcher
- `is_proxy(obj)` - Check if object is a proxy

## Types

```moonbit
pub type ValtioProxy        // Mutable proxy object
pub type ValtioSnapshot     // Immutable snapshot
pub type ValtioSubscription // Subscription handle
```

## Examples

### Counter Example

```moonbit
let state = from_json("{\"count\": 0}")
let proxy_state = proxy(state)

subscribe(proxy_state, fn() {
  let count = get_int(proxy_state, "count")
  println("Count: \{count}")
})

// Increment
let current = get_int(proxy_state, "count")
set_int(proxy_state, "count", current + 1)
```

### Nested State

```moonbit
let user = js_object()
set_string(user, "name", "Alice")
set_int(user, "age", 30)

let app_state = js_object()
set_proxy(app_state, "user", user)

let proxy_state = proxy(app_state)
```

## Integration with CRDT

This module can be used alongside the eg-walker CRDT implementation:

```moonbit
// Create Valtio state for UI
let ui_state = proxy(js_object())

// Sync CRDT changes to Valtio
fn sync_to_ui(doc: CRDTDocument) -> Unit {
  let text = doc.to_string()
  set_string(ui_state, "content", text)
}

// Subscribe for React rendering
let snap = use_snapshot(ui_state)
```

## MoonBit FFI Reference

- [MoonBit FFI Documentation](https://docs.moonbitlang.com/en/latest/language/ffi.html)
- [Valtio Documentation](https://github.com/pmndrs/valtio)

## License

Apache-2.0
