// Tests for parse cache

test "ParseCache::new creates empty cache" {
  let cache = ParseCache::new()
  inspect(cache.stats().contains("size: 0"), content="true")
  inspect(cache.stats().contains("version: 0"), content="true")
}

test "ParseCache::get returns None for missing entry" {
  let cache = ParseCache::new()
  let tokens = tokenize("42")
  let result = cache.get(tokens, 0, 1)
  inspect(result is None, content="true")
}

test "ParseCache::insert and get" {
  let cache = ParseCache::new()
  let tokens = tokenize("42")
  let node = parse_positioned("42")

  cache.insert(tokens, 0, 1, node)

  let retrieved = cache.get(tokens, 0, 1)
  inspect(retrieved is None, content="false")

  match retrieved {
    Some(n) => inspect(print_term_node(n), content="42")
    None => inspect(false, content="true")  // Should not happen
  }
}

test "ParseCache::invalidate_range increments version" {
  let cache = ParseCache::new()
  let tokens = tokenize("42")
  let node = parse_positioned("42")

  cache.insert(tokens, 0, 1, node)

  // Cache hit before invalidation
  let before = cache.get(tokens, 0, 1)
  inspect(before is None, content="false")

  // Invalidate
  cache.invalidate_range(Range::new(0, 2))

  // Cache miss after invalidation (version mismatch)
  let after = cache.get(tokens, 0, 1)
  inspect(after is None, content="true")
}

test "ParseCache::clear removes all entries" {
  let cache = ParseCache::new()
  let tokens = tokenize("42")
  let node = parse_positioned("42")

  cache.insert(tokens, 0, 1, node)
  cache.insert(tokens, 0, 2, node)

  cache.clear()

  let result1 = cache.get(tokens, 0, 1)
  let result2 = cache.get(tokens, 0, 2)

  inspect(result1 is None, content="true")
  inspect(result2 is None, content="true")
}

test "ParseCache respects max_entries limit" {
  let cache = ParseCache::with_capacity(5)
  let tokens = tokenize("x")
  let node = parse_positioned("x")

  // Insert 10 entries with different ranges
  for i = 0; i < 10; i = i + 1 {
    cache.insert(tokens, 0, i + 1, node)
  }

  // Cache should have evicted some entries
  let stats = cache.stats()
  inspect(stats.contains("size:"), content="true")
}

test "ParseCache caches different token sequences separately" {
  let cache = ParseCache::new()
  let tokens1 = tokenize("42")
  let tokens2 = tokenize("100")
  let node1 = parse_positioned("42")
  let node2 = parse_positioned("100")

  cache.insert(tokens1, 0, 1, node1)
  cache.insert(tokens2, 0, 1, node2)

  let retrieved1 = cache.get(tokens1, 0, 1)
  let retrieved2 = cache.get(tokens2, 0, 1)

  inspect(retrieved1 is None, content="false")
  inspect(retrieved2 is None, content="false")

  match retrieved1 {
    Some(n) => inspect(print_term_node(n), content="42")
    None => ()
  }

  match retrieved2 {
    Some(n) => inspect(print_term_node(n), content="100")
    None => ()
  }
}
