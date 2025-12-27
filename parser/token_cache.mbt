// Token cache for incremental parsing
// Caches tokenization results by source ranges to avoid re-lexing unchanged text

///| Cache key based on source content and range
struct CacheKey {
  source_hash : Int  // Hash of source content
  start : Int        // Start position
  end : Int          // End position
} derive(Eq)

///| Hash implementation for CacheKey
pub impl Hash for CacheKey with hash(self) {
  let mut hasher = 0
  hasher = hasher * 31 + self.source_hash
  hasher = hasher * 31 + self.start
  hasher = hasher * 31 + self.end
  hasher
}

///| Hash implementation for CacheKey (alternative method)
pub impl Hash for CacheKey with hash_combine(self, hasher) {
  hasher.combine(self.source_hash)
  hasher.combine(self.start)
  hasher.combine(self.end)
}

///| Cached token array with version tracking
struct CachedTokens {
  tokens : Array[TokenInfo]
  version : Int  // Version when cached
}

///| Token cache for incremental parsing
pub struct TokenCache {
  cache : @hashmap.HashMap[CacheKey, CachedTokens]
  mut version : Int  // Incremented on each edit
  max_entries : Int  // Maximum cache size
}

///| Create a new token cache
pub fn TokenCache::new() -> TokenCache {
  {
    cache: @hashmap.HashMap::new(),
    version: 0,
    max_entries: 1000,  // Default max entries
  }
}

///| Create a token cache with custom max entries
pub fn TokenCache::with_capacity(max_entries : Int) -> TokenCache {
  {
    cache: @hashmap.HashMap::new(),
    version: 0,
    max_entries,
  }
}

///| Simple string hash function
fn hash_string(s : String) -> Int {
  let mut hash = 0
  let len = s.length()
  for i = 0; i < len; i = i + 1 {
    let code = s.code_unit_at(i).to_int()
    hash = hash * 31 + code
  }
  hash
}

///| Get cached tokens for a range if available and valid
pub fn TokenCache::get(
  self : TokenCache,
  source : String,
  start : Int,
  end : Int
) -> Array[TokenInfo]? {
  let source_hash = hash_string(source)
  let key : CacheKey = { source_hash, start, end }

  match self.cache.get(key) {
    Some(cached) =>
      if cached.version == self.version {
        Some(cached.tokens)
      } else {
        None  // Cache entry is stale
      }
    None => None
  }
}

///| Insert tokens into cache for a range
pub fn TokenCache::insert(
  self : TokenCache,
  source : String,
  start : Int,
  end : Int,
  tokens : Array[TokenInfo]
) -> Unit {
  // Evict old entries if cache is full
  if self.cache.length() >= self.max_entries {
    self.evict_oldest()
  }

  let source_hash = hash_string(source)
  let key : CacheKey = { source_hash, start, end }
  let cached : CachedTokens = { tokens, version: self.version }

  self.cache.set(key, cached)
}

///| Invalidate cache entries overlapping with the edit range
///
/// Implements Lezer-style selective invalidation:
/// Only invalidates cache entries that overlap with the damaged range,
/// preserving valid entries outside the damaged region for reuse.
pub fn TokenCache::invalidate_range(self : TokenCache, start : Int, end : Int) -> Unit {
  // Increment version for new entries
  self.version = self.version + 1

  // Collect keys that overlap with the damaged range
  let keys_to_remove : Array[CacheKey] = []
  self.cache.iter().each(fn(entry) {
    let (key, _cached) = entry
    // Check if this cache entry overlaps with the damaged range
    // Entry overlaps if: entry.start < damaged.end AND entry.end > damaged.start
    if key.start < end && key.end > start {
      keys_to_remove.push(key)
    }
  })

  // Remove overlapping entries
  for key in keys_to_remove {
    self.cache.remove(key)
  }
}

///| Clear the entire cache
pub fn TokenCache::clear(self : TokenCache) -> Unit {
  self.cache.clear()
  self.version = self.version + 1
}

///| Evict oldest cache entries (simple LRU approximation)
fn TokenCache::evict_oldest(self : TokenCache) -> Unit {
  // Simple eviction: remove entries from old version
  // In a more sophisticated implementation, we would track access times
  let old_version = self.version - 1

  // Collect keys to remove
  let keys_to_remove : Array[CacheKey] = []
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
    let keys_to_remove2 : Array[CacheKey] = []

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
pub fn TokenCache::stats(self : TokenCache) -> String {
  "TokenCache { size: " +
  self.cache.length().to_string() +
  ", version: " +
  self.version.to_string() +
  " }"
}
