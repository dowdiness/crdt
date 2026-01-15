// Example: Counter Application with Valtio
//
// Demonstrates a simple counter with subscriptions

///|
/// Counter State Management
/// Example showing reactive counter with Valtio
pub fn counter_example() -> Unit {
  // Create initial state
  let state = js_object()
  set_int(state, "count", 0)
  set_string(state, "status", "idle")

  // Create proxy
  let proxy_state = proxy(state)

  // Subscribe to changes
  let unsub = subscribe(proxy_state, fn() {
    let snap = snapshot(proxy_state)
    println("State changed: \{to_json(snap)}")
  })

  // Increment counter
  fn increment() {
    let current = get_int(proxy_state, "count")
    set_int(proxy_state, "count", current + 1)
    set_string(proxy_state, "status", "incremented")
  }

  // Decrement counter
  fn decrement() {
    let current = get_int(proxy_state, "count")
    set_int(proxy_state, "count", current - 1)
    set_string(proxy_state, "status", "decremented")
  }

  // Simulate some operations
  increment() // count: 1
  increment() // count: 2
  decrement() // count: 1

  // Clean up
  unsubscribe(unsub)
}

///|
/// Todo List Example
/// More complex example with nested objects
/// (Using ValtioProxy directly instead of typed structs)
pub fn todo_example() -> Unit {
  // Create todos array-like state
  let state = js_object()
  set_int(state, "next_id", 1)
  let proxy_state = proxy(state)

  // Add todo
  fn add_todo(text : String) {
    let id = get_int(proxy_state, "next_id")
    let todo = js_object()
    set_int(todo, "id", id)
    set_string(todo, "text", text)
    set_bool(todo, "completed", false)
    set_proxy(proxy_state, "todo_\{id}", todo)
    set_int(proxy_state, "next_id", id + 1)
  }

  // Subscribe to changes
  let unsub = subscribe(proxy_state, fn() {
    let snap = snapshot(proxy_state)
    println("Todos updated: \{to_json(snap)}")
  })

  // Add some todos
  add_todo("Learn MoonBit")
  add_todo("Build CRDT editor")
  add_todo("Integrate Valtio")
  unsubscribe(unsub)
}

///|
/// CRDT Integration Example
/// Example showing how to integrate Valtio with CRDT state
pub fn crdt_valtio_example() -> Unit {
  // Create UI state
  let ui_state = js_object()
  set_string(ui_state, "content", "")
  set_int(ui_state, "cursor", 0)
  set_bool(ui_state, "syncing", false)
  let proxy_state = proxy(ui_state)

  // Subscribe for UI updates
  let unsub = subscribe(proxy_state, fn() {
    let snap = snapshot(proxy_state)
    // In a real app, this would trigger React re-render
    println("UI state: \{to_json(snap)}")
  })

  // Simulate CRDT operations updating UI
  fn handle_crdt_insert(text : String, pos : Int) {
    set_bool(proxy_state, "syncing", true)
    let current = get_string(proxy_state, "content")
    // In real implementation, properly insert at position
    set_string(proxy_state, "content", current + text)
    set_int(proxy_state, "cursor", pos + text.length())
    set_bool(proxy_state, "syncing", false)
  }

  // Simulate edits
  handle_crdt_insert("Hello", 0)
  handle_crdt_insert(" World", 5)
  unsubscribe(unsub)
}
