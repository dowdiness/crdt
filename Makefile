.PHONY: help test test-all check check-all fmt build build-js build-web clean install-hooks

help: ## Show this help message
	@echo "Lambda Calculus CRDT Editor - Development Tasks"
	@echo ""
	@echo "Usage: make [target]"
	@echo ""
	@echo "Available targets:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  %-20s %s\n", $$1, $$2}'

test: ## Run tests for main module
	moon test --release

test-all: ## Run tests for all modules (including submodules)
	@./scripts/test-all.sh

check: ## Run moon check for main module
	moon check --deny-warn

check-all: ## Run moon check and fmt for all modules
	@./scripts/check-all.sh

fmt: ## Format code with moon fmt
	moon fmt
	moon info

build: ## Build main module (default target)
	moon build --release

build-js: ## Build for JavaScript target
	moon build --target js --release

build-web: ## Build web application (MoonBit + Vite)
	@./scripts/build-web.sh

web-dev: build-js ## Build JS and start web dev server
	@cp target/js/release/build/crdt.js web/public/
	@cd web && npm run dev

clean: ## Clean build artifacts
	moon clean
	rm -rf target _build
	rm -rf web/dist web/public/crdt.js

install-hooks: ## Install git pre-commit hooks
	@./scripts/install-hooks.sh

ci: check-all test-all ## Run all CI checks locally

update: ## Update MoonBit dependencies
	moon update
	cd event-graph-walker && moon update
	cd parser && moon update

bench: ## Run benchmarks
	moon bench --release
	cd event-graph-walker && moon bench --release

.DEFAULT_GOAL := help
