// Type declarations for MoonBit compiled output
// This file provides types for the eventual compiled JavaScript

// Module declaration using wildcard to match the relative path
declare module '*/target/js/release/build/valtio/valtio.js' {
  /**
   * Create a new EgWalker proxy
   */
  export function create_egwalker_proxy(
    agent_id: string,
    undo_enabled: boolean
  ): any;

  /**
   * Apply a remote operation from JSON
   */
  export function apply_remote_op(proxy: any, op_json: string): void;

  /**
   * Get pending operations as JSON
   */
  export function get_pending_ops_json(proxy: any): string;

  /**
   * Get CRDT frontier as JSON
   */
  export function get_frontier_json(proxy: any): string;

  /**
   * Undo the last operation
   */
  export function undo(proxy: any): void;

  /**
   * Redo the last undone operation
   */
  export function redo(proxy: any): void;

  /**
   * Dispose of the proxy and clean up
   */
  export function dispose_proxy(proxy: any): void;
}

// Also declare with the exact relative path from src/
declare module '../target/js/release/build/valtio/valtio.js' {
  export * from '*/target/js/release/build/valtio/valtio.js';
}
