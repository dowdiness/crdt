// JSON Helper Functions for Valtio FFI
//
// Utilities for converting MoonBit data to JavaScript objects for Valtio

///| JavaScript Object Creation
/// Helpers for creating JavaScript objects from MoonBit data

///|
/// Create an empty JavaScript object
pub extern "js" fn js_object() -> ValtioProxy =
  #|() => ({})

///|
/// Create a JavaScript object from a JSON string
pub extern "js" fn from_json(json : String) -> ValtioProxy =
  #|(json) => JSON.parse(json)

///|
/// Convert a snapshot to a JSON string
pub extern "js" fn to_json(snapshot : ValtioSnapshot) -> String =
  #|(snap) => JSON.stringify(snap)

///| Property Access
/// Functions for getting and setting properties on proxies

///|
/// Get a property from a proxy as a string
pub extern "js" fn get_string(proxy : ValtioProxy, key : String) -> String =
  #|(proxy, key) => proxy[key]

///|
/// Get a property from a proxy as an integer
pub extern "js" fn get_int(proxy : ValtioProxy, key : String) -> Int =
  #|(proxy, key) => proxy[key]

///|
/// Get a property from a proxy as a double
pub extern "js" fn get_double(proxy : ValtioProxy, key : String) -> Double =
  #|(proxy, key) => proxy[key]

///|
/// Get a property from a proxy as a boolean
pub extern "js" fn get_bool(proxy : ValtioProxy, key : String) -> Bool =
  #|(proxy, key) => proxy[key]

///|
/// Set a string property on a proxy
pub extern "js" fn set_string(
  proxy : ValtioProxy,
  key : String,
  value : String,
) -> Unit =
  #|(proxy, key, value) => { proxy[key] = value; }

///|
/// Set an integer property on a proxy
pub extern "js" fn set_int(
  proxy : ValtioProxy,
  key : String,
  value : Int,
) -> Unit =
  #|(proxy, key, value) => { proxy[key] = value; }

///|
/// Set a double property on a proxy
pub extern "js" fn set_double(
  proxy : ValtioProxy,
  key : String,
  value : Double,
) -> Unit =
  #|(proxy, key, value) => { proxy[key] = value; }

///|
/// Set a boolean property on a proxy
pub extern "js" fn set_bool(
  proxy : ValtioProxy,
  key : String,
  value : Bool,
) -> Unit =
  #|(proxy, key, value) => { proxy[key] = value; }

///|
/// Set a nested proxy property
pub extern "js" fn set_proxy(
  proxy : ValtioProxy,
  key : String,
  value : ValtioProxy,
) -> Unit =
  #|(proxy, key, value) => { proxy[key] = value; }
