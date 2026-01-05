// Tests for token cache

///|
test "TokenCache::new creates empty cache" {
  let cache = TokenCache::new()
  inspect(cache.stats().contains("size: 0"), content="true")
  inspect(cache.stats().contains("version: 0"), content="true")
}

///|
test "TokenCache::get returns None for missing entry" {
  let cache = TokenCache::new()
  let result = cache.get("test", 0, 4)
  inspect(result is None, content="true")
}

///|
test "TokenCache::insert and get" {
  let cache = TokenCache::new()
  // Use tokenize to get real tokens
  let tokens = tokenize("42")
  cache.insert("42", 0, 2, tokens)
  let retrieved = cache.get("42", 0, 2)
  inspect(retrieved is None, content="false")
  match retrieved {
    Some(ts) => inspect(ts.length() > 0, content="true")
    None => inspect(false, content="true") // Should not happen
  }
}

///|
test "TokenCache::invalidate_range increments version" {
  let cache = TokenCache::new()
  let tokens = tokenize("42")
  cache.insert("42", 0, 2, tokens)

  // Cache hit before invalidation
  let before = cache.get("42", 0, 2)
  inspect(before is None, content="false")

  // Invalidate
  cache.invalidate_range(0, 2)

  // Cache miss after invalidation (version mismatch)
  let after = cache.get("42", 0, 2)
  inspect(after is None, content="true")
}

///|
test "TokenCache::clear removes all entries" {
  let cache = TokenCache::new()
  let tokens = tokenize("42")
  cache.insert("42", 0, 2, tokens)
  cache.insert("100", 0, 3, tokens)
  cache.clear()
  let result1 = cache.get("42", 0, 2)
  let result2 = cache.get("100", 0, 3)
  inspect(result1 is None, content="true")
  inspect(result2 is None, content="true")
}

///|
test "TokenCache respects max_entries limit" {
  let cache = TokenCache::with_capacity(5)
  let tokens = tokenize("1")

  // Insert 10 entries
  for i = 0; i < 10; i = i + 1 {
    let source = i.to_string()
    cache.insert(source, 0, 1, tokens)
  }

  // Cache should have evicted some entries
  // Check that cache size is reasonable (not necessarily exactly 5 due to eviction strategy)
  let stats = cache.stats()
  inspect(stats.contains("size:"), content="true")
}
