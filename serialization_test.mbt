// Test error serialization to ensure errors are human-readable

///|
test "Error serialization produces readable text" {
  let errors = ["Parse error: Expected token at token )"]
  let json = serialize_errors(errors)

  // Should be proper JSON array with string
  inspect(json.contains("Parse error"), content="true")
  inspect(json.contains("Expected"), content="true")
  inspect(json.contains("token"), content="true")
  inspect(json.contains(")"), content="true")

  // Should NOT be character codes
  inspect(json.contains("80971141"), content="false") // Not "Par" as codes
  inspect(json.contains("115101"), content="false") // Not "se" as codes
}

///|
test "Error serialization handles special characters" {
  let errors = [
    "Error with \"quotes\"", "Error with \\backslash", "Error with\nnewline",
  ]
  let json = serialize_errors(errors)

  // Quotes should be escaped
  inspect(json.contains("\\\"quotes\\\""), content="true")

  // Backslash should be escaped
  inspect(json.contains("\\\\backslash"), content="true")

  // Newline should be escaped
  inspect(json.contains("\\nnewline"), content="true")
}

///|
test "Actual parser error is readable" {
  let (_, errors) = @parser.parse_with_error_recovery("x+")
  if errors.length() > 0 {
    let json = serialize_errors(errors)
    println("Error JSON: " + json)

    // Should be readable text, not character codes
    inspect(json.contains("["), content="true") // JSON array
    inspect(json.contains("]"), content="true")
    inspect(json.contains("\""), content="true") // JSON string

    // Should NOT contain long sequences of digits (character codes)
    // If it was broken, we'd see patterns like "80971141151013210"
    let has_long_digit_sequence = json.contains("809711411510")
    inspect(has_long_digit_sequence, content="false")
  }
}
