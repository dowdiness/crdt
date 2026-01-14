// Valtio FFI Bindings for MoonBit
//
// JavaScript Foreign Function Interface for Valtio state management library
// See: https://github.com/pmndrs/valtio

///| Core Valtio Functions
/// Primary APIs for creating and managing reactive proxy state

/// Create a self-aware proxy object that tracks mutations
///
/// # Example
/// ```moonbit
/// let state = proxy(js_object())
/// ```
pub fn proxy(initial_state : ValtioProxy) -> ValtioProxy = "valtio" "proxy"

/// Get an immutable snapshot of the current proxy state (vanilla)
///
/// Use this in non-React environments to read the current state.
/// In React, use `use_snapshot` instead.
///
/// # Example
/// ```moonbit
/// let state = proxy({ count: 0 })
/// let snap = snapshot(state)
/// ```
pub fn snapshot(proxy_state : ValtioProxy) -> ValtioSnapshot = "valtio/vanilla" "snapshot"

/// Subscribe to state changes with a callback
///
/// Returns a subscription handle that can be used to unsubscribe.
/// The callback is invoked whenever any part of the subscribed state changes.
///
/// # Example
/// ```moonbit
/// let state = proxy({ count: 0 })
/// let unsub = subscribe(state, fn() { println("State changed!") })
/// // Later: unsub() to unsubscribe
/// ```
pub fn subscribe(
  proxy_state : ValtioProxy,
  callback : SubscribeCallback
) -> ValtioSubscription = "valtio/vanilla" "subscribe"

/// Subscribe with operations parameter (advanced)
///
/// Similar to subscribe but the callback receives operations information
/// about what changed in the proxy.
pub fn subscribe_with_ops(
  proxy_state : ValtioProxy,
  callback : SubscribeOpsCallback
) -> ValtioSubscription = "valtio/vanilla" "subscribe"

///| Subscription Management
/// Functions for managing subscriptions

/// Unsubscribe from state changes
///
/// # Example
/// ```moonbit
/// let unsub = subscribe(state, callback)
/// unsubscribe(unsub)  // Stop listening to changes
/// ```
pub extern "js" fn unsubscribe(subscription : ValtioSubscription) -> Unit =
  #|(sub) => sub()

///| React Hooks (for use in React environments)
/// These are declared but require React context to use

/// React hook to create a snapshot for rendering
///
/// This should only be used within React components.
/// Returns an immutable snapshot that causes re-renders when accessed properties change.
pub fn use_snapshot(proxy_state : ValtioProxy) -> ValtioSnapshot = "valtio" "useSnapshot"

///| Utility Functions
/// Helper functions for working with proxies and snapshots

/// Check if an object is a Valtio proxy
pub extern "js" fn is_proxy(obj : ValtioProxy) -> Bool =
  #|(obj) => {
  #|  const valtio = require('valtio/vanilla');
  #|  return typeof valtio.getVersion === 'function' && valtio.getVersion(obj) !== undefined;
  #|}

/// Get the underlying proxy from a snapshot
pub fn get_proxy(snapshot : ValtioSnapshot) -> ValtioProxy = "valtio/vanilla" "proxy"

///| Advanced APIs
/// Lower-level functions for advanced use cases

/// Subscribe to changes of a specific property key
///
/// More efficient than general subscribe when you only care about
/// changes to a single primitive property.
pub fn subscribe_key(
  proxy_state : ValtioProxy,
  key : String,
  callback : SubscribeCallback
) -> ValtioSubscription = "valtio/vanilla" "subscribeKey"

/// Watch function with automatic dependency tracking
///
/// Automatically subscribes to any proxies accessed during callback execution.
pub fn watch(
  callback : () -> Unit,
  options : ValtioProxy
) -> ValtioSubscription = "valtio/vanilla" "watch"
