// Parse cache for incremental parsing
// Caches parse results by token ranges to avoid re-parsing unchanged subtrees

///| Cache key based on token sequence fingerprint
struct ParseCacheKey {
  token_fingerprint : Int  // Hash of token sequence
  start_token : Int        // Token array index
  end_token : Int          // Token array index
} derive(Eq)

///| Hash implementation for ParseCacheKey
pub impl Hash for ParseCacheKey with hash(self) {
  let mut hasher = 0
  hasher = hasher * 31 + self.token_fingerprint
  hasher = hasher * 31 + self.start_token
  hasher = hasher * 31 + self.end_token
  hasher
}

///| Hash implementation for ParseCacheKey (alternative method)
pub impl Hash for ParseCacheKey with hash_combine(self, hasher) {
  hasher.combine(self.token_fingerprint)
  hasher.combine(self.start_token)
  hasher.combine(self.end_token)
}

///| Cached parse node with version tracking
struct CachedNode {
  node : TermNode
  version : Int  // Version when cached
}

///| Parse result cache for incremental parsing
pub struct ParseCache {
  cache : @hashmap.HashMap[ParseCacheKey, CachedNode]
  mut version : Int  // Incremented on each edit
  max_entries : Int  // Maximum cache size
}

///| Create a new parse cache
pub fn ParseCache::new() -> ParseCache {
  {
    cache: @hashmap.HashMap::new(),
    version: 0,
    max_entries: 500,  // Default max entries
  }
}

///| Create a parse cache with custom max entries
pub fn ParseCache::with_capacity(max_entries : Int) -> ParseCache {
  {
    cache: @hashmap.HashMap::new(),
    version: 0,
    max_entries,
  }
}

///| Hash a token sequence
fn hash_tokens(tokens : Array[TokenInfo], start : Int, end : Int) -> Int {
  let mut hash = 0
  for i = start; i < end && i < tokens.length(); i = i + 1 {
    let token_info = tokens[i]
    // Hash the token type and position
    hash = hash * 31 + print_token(token_info.token).length()
    hash = hash * 31 + token_info.start
    hash = hash * 31 + token_info.end
  }
  hash
}

///| Get cached parse result for a token range if available
pub fn ParseCache::get(
  self : ParseCache,
  tokens : Array[TokenInfo],
  start_token : Int,
  end_token : Int
) -> TermNode? {
  let token_fingerprint = hash_tokens(tokens, start_token, end_token)
  let key : ParseCacheKey = { token_fingerprint, start_token, end_token }

  match self.cache.get(key) {
    Some(cached) =>
      if cached.version == self.version {
        Some(cached.node)
      } else {
        None  // Cache entry is stale
      }
    None => None
  }
}

///| Insert a parse result into cache
pub fn ParseCache::insert(
  self : ParseCache,
  tokens : Array[TokenInfo],
  start_token : Int,
  end_token : Int,
  node : TermNode
) -> Unit {
  // Evict old entries if cache is full
  if self.cache.length() >= self.max_entries {
    self.evict_oldest()
  }

  let token_fingerprint = hash_tokens(tokens, start_token, end_token)
  let key : ParseCacheKey = { token_fingerprint, start_token, end_token }
  let cached : CachedNode = { node, version: self.version }

  self.cache.set(key, cached)
}

///| Invalidate cache entries within a source range
pub fn ParseCache::invalidate_range(self : ParseCache, _range : Range) -> Unit {
  // Simple approach: increment version to invalidate all entries
  // A more sophisticated approach would selectively invalidate based on source positions
  self.version = self.version + 1

  // TODO: Implement selective invalidation based on range overlap
  // For now, we rely on version checking to invalidate stale entries
}

///| Clear the entire cache
pub fn ParseCache::clear(self : ParseCache) -> Unit {
  self.cache.clear()
  self.version = self.version + 1
}

///| Evict oldest cache entries (simple LRU approximation)
fn ParseCache::evict_oldest(self : ParseCache) -> Unit {
  // Simple eviction: remove entries from old version
  let old_version = self.version - 1

  // Collect keys to remove
  let keys_to_remove : Array[ParseCacheKey] = []
  self.cache.iter().each(fn(entry) {
    let (key, cached) = entry
    if cached.version < old_version {
      keys_to_remove.push(key)
    }
  })

  // Remove old entries
  for key in keys_to_remove {
    self.cache.remove(key)
  }

  // If still too full, remove 10% of entries arbitrarily
  if self.cache.length() >= self.max_entries {
    let mut count = 0
    let to_remove = self.cache.length() / 10
    let keys_to_remove2 : Array[ParseCacheKey] = []

    self.cache.iter().each(fn(entry) {
      let (key, _cached) = entry
      if count < to_remove {
        keys_to_remove2.push(key)
        count = count + 1
      }
    })

    for key in keys_to_remove2 {
      self.cache.remove(key)
    }
  }
}

///| Get cache statistics
pub fn ParseCache::stats(self : ParseCache) -> String {
  "ParseCache { size: " +
  self.cache.length().to_string() +
  ", version: " +
  self.version.to_string() +
  " }"
}
