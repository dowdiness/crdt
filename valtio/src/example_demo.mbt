// Example demonstrations of Valtio FFI usage
//
// Note: These examples require a JavaScript environment with Valtio installed.
// They are provided as documentation and cannot run in the MoonBit test suite.
// To use these, you need to build a MoonBit application that depends on this library
// and run it in a JavaScript environment with Valtio available.

///|
/// Basic Proxy Creation
/// Create a proxy from an object
pub fn example_create_proxy_from_object() -> Unit {
  let state = js_object()
  set_int(state, "count", 0)
  let proxy_state = proxy(state)
  let count = get_int(proxy_state, "count")
  println("Count: \{count}")  // Should print: Count: 0
}

///|
/// Create a proxy from JSON
pub fn example_create_proxy_from_json() -> Unit {
  let json = "{\"count\": 42, \"text\": \"hello\"}"
  let state = from_json(json)
  let proxy_state = proxy(state)
  let count = get_int(proxy_state, "count")
  let text = get_string(proxy_state, "text")
  println("Count: \{count}, Text: \{text}")  // Should print: Count: 42, Text: hello
}

///|
/// Property Mutations
/// Mutate proxy properties
pub fn example_mutate_proxy_properties() -> Unit {
  let state = js_object()
  set_int(state, "count", 0)
  let proxy_state = proxy(state)

  // Mutate
  set_int(proxy_state, "count", 10)
  let count = get_int(proxy_state, "count")
  println("Updated count: \{count}")  // Should print: Updated count: 10
}

///|
/// Multiple property types
pub fn example_multiple_property_types() -> Unit {
  let state = js_object()
  let proxy_state = proxy(state)
  set_string(proxy_state, "name", "Alice")
  set_int(proxy_state, "age", 30)
  set_bool(proxy_state, "active", true)
  set_double(proxy_state, "score", 95.5)

  let name = get_string(proxy_state, "name")
  let age = get_int(proxy_state, "age")
  let active = get_bool(proxy_state, "active")
  let score = get_double(proxy_state, "score")
  println("Name: \{name}")
  println("Age: \{age}")
  println("Active: \{active}")
  println("Score: \{score}")
}

///|
/// Snapshots
/// Take a snapshot of proxy state
pub fn example_take_snapshot() -> Unit {
  let state = from_json("{\"count\": 5}")
  let proxy_state = proxy(state)
  let snap = snapshot(proxy_state)
  let json = to_json(snap)
  println("Snapshot: \{json}")  // Should print: Snapshot: {"count":5}
}

///|
/// Nested State
/// Work with nested proxy objects
pub fn example_nested_proxy_objects() -> Unit {
  let user = js_object()
  set_string(user, "name", "Bob")
  set_int(user, "age", 25)
  let app = js_object()
  set_proxy(app, "user", user)
  set_string(app, "theme", "dark")
  let proxy_state = proxy(app)
  let theme = get_string(proxy_state, "theme")
  println("Theme: \{theme}")  // Should print: Theme: dark
}

///|
/// JSON Round-trip
/// Test JSON serialization and deserialization
pub fn example_json_round_trip() -> Unit {
  let original = "{\"x\": 10, \"y\": 20, \"label\": \"point\"}"
  let state = from_json(original)
  let proxy_state = proxy(state)
  let snap = snapshot(proxy_state)
  let json = to_json(snap)

  // Parse again to verify
  let restored = from_json(json)
  let x = get_int(restored, "x")
  let y = get_int(restored, "y")
  let label = get_string(restored, "label")
  println("X: \{x}")
  println("Y: \{y}")
  println("Label: \{label}")
}

///|
/// Run all examples
pub fn run_all_examples() -> Unit {
  println("=== Valtio FFI Examples ===\n")

  println("1. Create proxy from object:")
  example_create_proxy_from_object()

  println("\n2. Create proxy from JSON:")
  example_create_proxy_from_json()

  println("\n3. Mutate proxy properties:")
  example_mutate_proxy_properties()

  println("\n4. Multiple property types:")
  example_multiple_property_types()

  println("\n5. Take snapshot:")
  example_take_snapshot()

  println("\n6. Nested proxy objects:")
  example_nested_proxy_objects()

  println("\n7. JSON round-trip:")
  example_json_round_trip()
}
