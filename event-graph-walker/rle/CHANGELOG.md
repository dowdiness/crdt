# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.0] - 2026-01-26

### Changed
- Replaced `RleVec`/`RleVecCached` with `Runs[T]` + cached `Rle[T]` wrapper. This simplifies the core logic and improves performance.
- Updated string slicing to use `StringBuilder` for better performance.

### Added
- Added `PrefixSums` for atom/content lengths and `Runs::find_fast` for O(log n) lookups.
- Added `RleCursor` for efficient sequential traversal.
- Standardized range errors via `RleError::InvalidRange` and `RangeIssue`.
