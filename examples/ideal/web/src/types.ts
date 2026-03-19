export interface ProjNodeJson {
  node_id: number;
  kind: any[];
  children: ProjNodeJson[];
  start: number;
  end: number;
}

export type TermKindTag =
  | "Int"
  | "Var"
  | "Lam"
  | "App"
  | "Bop"
  | "If"
  | "Module"
  | "Unit"
  | "Unbound"
  | "Error";

export function getKindTag(kind: any[]): TermKindTag {
  return kind[0] as TermKindTag;
}

export interface CrdtModule {
  create_editor_with_undo(agentId: string, timeoutMs: number): number;
  get_text(handle: number): string;
  set_text(handle: number, text: string): void;
  get_proj_node_json(handle: number): string;
  get_source_map_json(handle: number): string;
  get_errors_json(handle: number): string;
  get_version_json(handle: number): string;
  insert_at(handle: number, pos: number, char: string, timestamp: number): void;
  delete_at(handle: number, pos: number, timestamp: number): boolean;
  undo_manager_undo(handle: number): boolean;
  undo_manager_redo(handle: number): boolean;
  apply_sync_json(handle: number, json: string): void;
  export_all_json(handle: number): string;
  export_since_json(handle: number, peerVersionJson: string): string;
  apply_tree_edit_json(handle: number, opJson: string, timestampMs: number): string;
  [key: string]: any;
}
