# Documentation Index

Documentation for the Lambda Calculus CRDT Editor project.

## Quick Start

- **[CLAUDE.md](../CLAUDE.md)** - Quick reference for Claude Code
- **[README.md](../README.md)** - Project overview

## Architecture

Understand the system design and CRDT implementation.

- [Module Structure](architecture/modules.md) - Two-module organization (event-graph-walker + crdt)
- [eg-walker Implementation](architecture/EG_WALKER_IMPLEMENTATION.md) - CRDT algorithm details
- [Walker Usage](architecture/WALKER_USAGE.md) - Event graph walker API
- [Network Sync](architecture/NETWORK_SYNC.md) - Synchronization protocols

## Development

Guides for contributing and developing.

- [Workflow](development/workflow.md) - Development process and common commands
- [Conventions](development/conventions.md) - MoonBit coding standards
- [Testing](development/testing.md) - Testing guide and best practices

## Performance

Benchmarking and optimization documentation.

- [Benchmarks](performance/BENCHMARKS.md) - Performance measurements
- [Optimization Roadmap](performance/OPTIMIZATION_ROADMAP.md) - Future improvements

## Module Documentation

Detailed documentation for each module:

- **[event-graph-walker](../event-graph-walker/README.md)** - Core CRDT library
- **[parser](../parser/README.md)** - Lambda calculus parser

## Archive

Historical documentation and investigations:

- [Investigation Index](archive/INVESTIGATION_INDEX.md)
- [Branch Variance Investigations](archive/investigations/branch-variance/)

## External Resources

- [eg-walker paper](https://arxiv.org/abs/2409.14252)
- [MoonBit documentation](https://docs.moonbitlang.com)
- [FugueMax CRDT](https://arxiv.org/abs/2305.00583)
