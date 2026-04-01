// Editor adapter library — re-exports all public types and implementations.

export type {
  ViewNode,
  ViewPatch,
  UserIntent,
  Decoration,
  Diagnostic,
} from './types';

export type { EditorAdapter } from './adapter';

export { HTMLAdapter } from './html-adapter';
