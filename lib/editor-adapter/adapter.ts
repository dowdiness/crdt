// EditorAdapter: Framework-agnostic interface for rendering ViewPatch streams.

import type { ViewPatch, UserIntent } from './types';

export interface EditorAdapter {
  /** Apply patches from MoonBit ViewUpdater */
  applyPatches(patches: ViewPatch[]): void;

  /** Register callback for user intents */
  onIntent(callback: (intent: UserIntent) => void): void;

  /** Clean up resources */
  destroy(): void;
}
