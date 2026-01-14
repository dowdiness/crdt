// Example tests demonstrating Valtio FFI usage
//
// Note: These tests require a JavaScript environment with Valtio installed

///| Basic Proxy Creation
test "create proxy from object" {
  let state = js_object()
  set_int(state, "count", 0)
  let proxy_state = proxy(state)

  let count = get_int(proxy_state, "count")
  inspect(count, content="0")
}

test "create proxy from JSON" {
  let json = "{\"count\": 42, \"text\": \"hello\"}"
  let state = from_json(json)
  let proxy_state = proxy(state)

  let count = get_int(proxy_state, "count")
  let text = get_string(proxy_state, "text")

  inspect(count, content="42")
  inspect(text, content="hello")
}

///| Property Mutations
test "mutate proxy properties" {
  let state = js_object()
  set_int(state, "count", 0)
  let proxy_state = proxy(state)

  // Mutate
  set_int(proxy_state, "count", 10)

  let count = get_int(proxy_state, "count")
  inspect(count, content="10")
}

test "multiple property types" {
  let state = js_object()
  let proxy_state = proxy(state)

  set_string(proxy_state, "name", "Alice")
  set_int(proxy_state, "age", 30)
  set_bool(proxy_state, "active", true)
  set_double(proxy_state, "score", 95.5)

  inspect(get_string(proxy_state, "name"), content="Alice")
  inspect(get_int(proxy_state, "age"), content="30")
  inspect(get_bool(proxy_state, "active"), content="true")
  inspect(get_double(proxy_state, "score"), content="95.5")
}

///| Snapshots
test "take snapshot of proxy" {
  let state = from_json("{\"count\": 5}")
  let proxy_state = proxy(state)

  let snap = snapshot(proxy_state)
  let json = to_json(snap)

  inspect(json, content="{\"count\":5}")
}

///| Nested State
test "nested proxy objects" {
  let user = js_object()
  set_string(user, "name", "Bob")
  set_int(user, "age", 25)

  let app = js_object()
  set_proxy(app, "user", user)
  set_string(app, "theme", "dark")

  let proxy_state = proxy(app)

  let theme = get_string(proxy_state, "theme")
  inspect(theme, content="dark")
}

///| JSON Round-trip
test "json round-trip" {
  let original = "{\"x\": 10, \"y\": 20, \"label\": \"point\"}"
  let state = from_json(original)
  let proxy_state = proxy(state)

  let snap = snapshot(proxy_state)
  let json = to_json(snap)

  // Parse again to verify
  let restored = from_json(json)
  inspect(get_int(restored, "x"), content="10")
  inspect(get_int(restored, "y"), content="20")
  inspect(get_string(restored, "label"), content="point")
}
