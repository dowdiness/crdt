// EgWalker CRDT Interface for Valtio Integration
//
// Defines the interface types needed for integration without direct dependency

///|
/// CRDT Operation Type
/// Represents a single CRDT operation
#external
pub type CRDTOperation

///|
/// CRDT Document Type
/// Represents the event-graph-walker Document
#external
pub type CRDTDocument

///|
/// Operation Creation
/// Create CRDT operations through JavaScript FFI
pub extern "js" fn create_document(agent_id : String) -> CRDTDocument =
  #|(agent_id) => {
  #|  const { Document } = require('./egwalker_crdt.js');
  #|  return new Document(agent_id);
  #|}

///|
pub extern "js" fn document_insert(
  doc : CRDTDocument,
  position : Int,
  text : String,
) -> CRDTOperation =
  #|(doc, position, text) => {
  #|  return doc.insert(position, text);
  #|}

///|
pub extern "js" fn document_delete(
  doc : CRDTDocument,
  position : Int,
) -> CRDTOperation =
  #|(doc, position) => {
  #|  return doc.delete(position);
  #|}

///|
pub extern "js" fn document_to_text(doc : CRDTDocument) -> String =
  #|(doc) => {
  #|  return doc.to_text();
  #|}

///|
pub extern "js" fn document_apply_remote(
  doc : CRDTDocument,
  op : CRDTOperation,
) -> Unit =
  #|(doc, op) => {
  #|  doc.apply_remote(op);
  #|}

///|
pub extern "js" fn document_get_frontier(doc : CRDTDocument) -> String =
  #|(doc) => {
  #|  return JSON.stringify(doc.get_frontier());
  #|}

///|
/// Operation Serialization
/// Convert operations to/from JSON for network sync
pub extern "js" fn operation_to_json(op : CRDTOperation) -> String =
  #|(op) => {
  #|  return JSON.stringify(op);
  #|}

///|
pub extern "js" fn operation_from_json(json : String) -> CRDTOperation =
  #|(json) => {
  #|  return JSON.parse(json);
  #|}
