///| Public API for the eg-walker CRDT editor

///|

///|
/// This module re-exports the main types and functions from the editor package

// Re-export main editor types
pub type Editor = @editor.Editor

///|
pub type Document = @editor.Document

// Re-export operation types

///|
pub type Op = @oplog.Op

///|
pub type OpContent = @oplog.OpContent

// Re-export editor functions

///|
pub let new_editor : (String) -> Editor = @editor.Editor::new

///|
pub let insert : (Editor, String) -> Unit = @editor.Editor::insert

///|
pub let insert_at : (Editor, Int, String) -> Unit = @editor.Editor::insert_at

///|
pub let delete : (Editor) -> Bool = @editor.Editor::delete

///|
pub let backspace : (Editor) -> Bool = @editor.Editor::backspace

///|
pub let move_cursor : (Editor, Int) -> Unit = @editor.Editor::move_cursor

///|
pub let get_text : (Editor) -> String = @editor.Editor::get_text

///|
pub let get_cursor : (Editor) -> Int = @editor.Editor::get_cursor

///|
pub let get_frontier : (Editor) -> Array[Int] = @editor.Editor::get_frontier

///|
pub let get_operations : (Editor) -> Array[Op] = @editor.Editor::get_operations

///|
pub let apply_remote : (Editor, Op) -> Unit = @editor.Editor::apply_remote

///|
pub let merge_remote : (Editor, Array[Op], Array[Int]) -> Unit = @editor.Editor::merge_remote

// Re-export document functions

///|
pub let new_document : (String) -> Document = @editor.Document::new

///|
pub let doc_insert : (Document, Int, String) -> Op = @editor.Document::insert

///|
pub let doc_delete : (Document, Int) -> Op? = @editor.Document::delete

///|
pub let doc_to_text : (Document) -> String = @editor.Document::to_text

///|
pub let doc_get_frontier : (Document) -> Array[Int] = @editor.Document::get_frontier

///|
pub let doc_apply_remote : (Document, Op) -> Unit = @editor.Document::apply_remote

///|
pub let doc_merge_remote : (Document, Array[Op], Array[Int]) -> Unit = @editor.Document::merge_remote

// Re-export ParsedEditor types (CRDT editor with integrated incremental parser)

///|
pub type ParsedEditor = @editor.ParsedEditor

///|
pub type TermNode = @parser.TermNode

// Re-export ParsedEditor functions

///|
pub let new_parsed_editor : (String) -> ParsedEditor = @editor.ParsedEditor::new

///|
pub let parsed_insert : (ParsedEditor, String) -> Unit = @editor.ParsedEditor::insert

///|
pub let parsed_delete : (ParsedEditor) -> Bool = @editor.ParsedEditor::delete

///|
pub let parsed_backspace : (ParsedEditor) -> Bool = @editor.ParsedEditor::backspace

///|
pub let parsed_move_cursor : (ParsedEditor, Int) -> Unit = @editor.ParsedEditor::move_cursor

///|
pub let parsed_get_text : (ParsedEditor) -> String = @editor.ParsedEditor::get_text

///|
pub let parsed_get_cursor : (ParsedEditor) -> Int = @editor.ParsedEditor::get_cursor

///|
pub let parsed_get_ast : (ParsedEditor) -> TermNode = @editor.ParsedEditor::get_ast

///|
pub let parsed_is_parse_valid : (ParsedEditor) -> Bool = @editor.ParsedEditor::is_parse_valid

///|
pub let parsed_get_operations : (ParsedEditor) -> Array[Op] = @editor.ParsedEditor::get_operations

///|
pub let parsed_get_frontier : (ParsedEditor) -> Array[Int] = @editor.ParsedEditor::get_frontier

///|
pub let parsed_merge_remote : (ParsedEditor, Array[Op], Array[Int]) -> Unit = @editor.ParsedEditor::merge_remote
