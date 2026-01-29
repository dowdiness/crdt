# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.3.0] - 2026-01-29

### Added
- `Runs::from_array_batch` - single-pass stack merge for batch construction
- `Runs::concat` and `Runs::extend` - batch-optimized with stack-merge approach
- `Rle::extend` - in-place extension with version tracking
- Versioned cursor staleness detection via `Rle.version` counter and `RleCursor::is_stale()`

### Changed
- `Runs::from_array` now delegates to `from_array_batch` for consistent behavior
- `concat` delegates to `from_array_batch` when self is empty (eliminates code duplication)
- `Rle::extend` only bumps version when actual mutation occurs

### Documentation
- Clarified trait semantics in RLE_DESIGN_PLAN.md
- Defined package boundaries: RLE is compression + query, not editing
- Resolved open questions on cursor invalidation and batch normalize API

## [0.2.0] - 2026-01-26

### Changed
- Replaced `RleVec`/`RleVecCached` with `Runs[T]` + cached `Rle[T]` wrapper. This simplifies the core logic and improves performance.
- Updated string slicing to use `StringBuilder` for better performance.

### Added
- Added `PrefixSums` for atom/visible lengths and `Runs::find_fast` for O(log n) lookups.
- Added `RleCursor` for efficient sequential traversal.
- Standardized range errors via `RleError::InvalidRange` and `RangeIssue`.
