import type * as MoonBit from "./moonbit.d.ts";

export function merge_operations(_handle: MoonBit.Int,
                                 ops_json: MoonBit.String,
                                 version_vector_json: MoonBit.String): MoonBit.Unit;

export function get_version_vector_json(_handle: MoonBit.Int): MoonBit.String;

export function get_frontier_json(_handle: MoonBit.Int): MoonBit.String;

export function get_operations_json(_handle: MoonBit.Int): MoonBit.String;

export function get_errors_json(_handle: MoonBit.Int): MoonBit.String;

export function get_ast_json(_handle: MoonBit.Int): MoonBit.String;

export function set_cursor(_handle: MoonBit.Int,
                           position: MoonBit.Int): MoonBit.Unit;

export function get_cursor(_handle: MoonBit.Int): MoonBit.Int;

export function set_text(_handle: MoonBit.Int,
                         new_text: MoonBit.String): MoonBit.Unit;

export function get_text(_handle: MoonBit.Int): MoonBit.String;

export function backspace(_handle: MoonBit.Int): MoonBit.Bool;

export function delete_(_handle: MoonBit.Int): MoonBit.Bool;

export function insert(_handle: MoonBit.Int,
                       text: MoonBit.String): MoonBit.Unit;

export function create_editor(agent_id: MoonBit.String): MoonBit.Int;
