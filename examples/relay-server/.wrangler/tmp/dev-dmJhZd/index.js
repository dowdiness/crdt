var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// .wrangler/tmp/bundle-SmbUAf/checked-fetch.js
var urls = /* @__PURE__ */ new Set();
function checkURL(request, init) {
  const url = request instanceof URL ? request : new URL(
    (typeof request === "string" ? new Request(request, init) : request).url
  );
  if (url.port && url.port !== "443" && url.protocol === "https:") {
    if (!urls.has(url.toString())) {
      urls.add(url.toString());
      console.warn(
        `WARNING: known issue with \`fetch()\` requests to custom HTTPS ports in published Workers:
 - ${url.toString()} - the custom port will be ignored when the Worker is published using the \`wrangler deploy\` command.
`
      );
    }
  }
}
__name(checkURL, "checkURL");
globalThis.fetch = new Proxy(globalThis.fetch, {
  apply(target, thisArg, argArray) {
    const [request, init] = argArray;
    checkURL(request, init);
    return Reflect.apply(target, thisArg, argArray);
  }
});

// .wrangler/tmp/bundle-SmbUAf/strip-cf-connecting-ip-header.js
function stripCfConnectingIPHeader(input, init) {
  const request = new Request(input, init);
  request.headers.delete("CF-Connecting-IP");
  return request;
}
__name(stripCfConnectingIPHeader, "stripCfConnectingIPHeader");
globalThis.fetch = new Proxy(globalThis.fetch, {
  apply(target, thisArg, argArray) {
    return Reflect.apply(target, thisArg, [
      stripCfConnectingIPHeader.apply(null, argArray)
    ]);
  }
});

// ../../_build/js/release/build/canopy.js
function _M0DTPB4Json4Null() {
}
__name(_M0DTPB4Json4Null, "_M0DTPB4Json4Null");
_M0DTPB4Json4Null.prototype.$tag = 0;
var _M0DTPB4Json4Null__ = new _M0DTPB4Json4Null();
function _M0DTPB4Json4True() {
}
__name(_M0DTPB4Json4True, "_M0DTPB4Json4True");
_M0DTPB4Json4True.prototype.$tag = 1;
var _M0DTPB4Json4True__ = new _M0DTPB4Json4True();
function _M0DTPB4Json5False() {
}
__name(_M0DTPB4Json5False, "_M0DTPB4Json5False");
_M0DTPB4Json5False.prototype.$tag = 2;
var _M0DTPB4Json5False__ = new _M0DTPB4Json5False();
function _M0DTPB4Json6Number(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
__name(_M0DTPB4Json6Number, "_M0DTPB4Json6Number");
_M0DTPB4Json6Number.prototype.$tag = 3;
function _M0DTPB4Json6String(param0) {
  this._0 = param0;
}
__name(_M0DTPB4Json6String, "_M0DTPB4Json6String");
_M0DTPB4Json6String.prototype.$tag = 4;
function _M0DTPB4Json5Array(param0) {
  this._0 = param0;
}
__name(_M0DTPB4Json5Array, "_M0DTPB4Json5Array");
_M0DTPB4Json5Array.prototype.$tag = 5;
function _M0DTPB4Json6Object(param0) {
  this._0 = param0;
}
__name(_M0DTPB4Json6Object, "_M0DTPB4Json6Object");
_M0DTPB4Json6Object.prototype.$tag = 6;
function _M0TPB15WasmHelperCache(param0, param1) {
  this.tried = param0;
  this.exports = param1;
}
__name(_M0TPB15WasmHelperCache, "_M0TPB15WasmHelperCache");
var $0L = { hi: 0, lo: 0 };
function _M0TPC17strconv9FloatInfo(param0, param1, param2) {
  this.mantissa_bits = param0;
  this.exponent_bits = param1;
  this.bias = param2;
}
__name(_M0TPC17strconv9FloatInfo, "_M0TPC17strconv9FloatInfo");
var $1L = { hi: 0, lo: 1 };
var $10L = { hi: 0, lo: 10 };
function _M0TPC13ref3RefGiE(param0) {
  this.val = param0;
}
__name(_M0TPC13ref3RefGiE, "_M0TPC13ref3RefGiE");
function _M0DTP39dowdiness6lambda3ast4Term3Int(param0) {
  this._0 = param0;
}
__name(_M0DTP39dowdiness6lambda3ast4Term3Int, "_M0DTP39dowdiness6lambda3ast4Term3Int");
_M0DTP39dowdiness6lambda3ast4Term3Int.prototype.$tag = 0;
function _M0DTP39dowdiness6lambda3ast4Term3Var(param0) {
  this._0 = param0;
}
__name(_M0DTP39dowdiness6lambda3ast4Term3Var, "_M0DTP39dowdiness6lambda3ast4Term3Var");
_M0DTP39dowdiness6lambda3ast4Term3Var.prototype.$tag = 1;
function _M0DTP39dowdiness6lambda3ast4Term3Lam(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
__name(_M0DTP39dowdiness6lambda3ast4Term3Lam, "_M0DTP39dowdiness6lambda3ast4Term3Lam");
_M0DTP39dowdiness6lambda3ast4Term3Lam.prototype.$tag = 2;
function _M0DTP39dowdiness6lambda3ast4Term3App(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
__name(_M0DTP39dowdiness6lambda3ast4Term3App, "_M0DTP39dowdiness6lambda3ast4Term3App");
_M0DTP39dowdiness6lambda3ast4Term3App.prototype.$tag = 3;
function _M0DTP39dowdiness6lambda3ast4Term3Bop(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
__name(_M0DTP39dowdiness6lambda3ast4Term3Bop, "_M0DTP39dowdiness6lambda3ast4Term3Bop");
_M0DTP39dowdiness6lambda3ast4Term3Bop.prototype.$tag = 4;
function _M0DTP39dowdiness6lambda3ast4Term2If(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
__name(_M0DTP39dowdiness6lambda3ast4Term2If, "_M0DTP39dowdiness6lambda3ast4Term2If");
_M0DTP39dowdiness6lambda3ast4Term2If.prototype.$tag = 5;
function _M0DTP39dowdiness6lambda3ast4Term6Module(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
__name(_M0DTP39dowdiness6lambda3ast4Term6Module, "_M0DTP39dowdiness6lambda3ast4Term6Module");
_M0DTP39dowdiness6lambda3ast4Term6Module.prototype.$tag = 6;
function _M0DTP39dowdiness6lambda3ast4Term4Unit() {
}
__name(_M0DTP39dowdiness6lambda3ast4Term4Unit, "_M0DTP39dowdiness6lambda3ast4Term4Unit");
_M0DTP39dowdiness6lambda3ast4Term4Unit.prototype.$tag = 7;
var _M0DTP39dowdiness6lambda3ast4Term4Unit__ = new _M0DTP39dowdiness6lambda3ast4Term4Unit();
function _M0DTP39dowdiness6lambda3ast4Term7Unbound(param0) {
  this._0 = param0;
}
__name(_M0DTP39dowdiness6lambda3ast4Term7Unbound, "_M0DTP39dowdiness6lambda3ast4Term7Unbound");
_M0DTP39dowdiness6lambda3ast4Term7Unbound.prototype.$tag = 8;
function _M0DTP39dowdiness6lambda3ast4Term5Error(param0) {
  this._0 = param0;
}
__name(_M0DTP39dowdiness6lambda3ast4Term5Error, "_M0DTP39dowdiness6lambda3ast4Term5Error");
_M0DTP39dowdiness6lambda3ast4Term5Error.prototype.$tag = 9;
var $_9223372036854775808L = { hi: -2147483648, lo: 0 };
var $9223372036854775807L = { hi: 2147483647, lo: -1 };
function _M0TPC13ref3RefGORP39dowdiness6canopy6editor10SyncEditorE(param0) {
  this.val = param0;
}
__name(_M0TPC13ref3RefGORP39dowdiness6canopy6editor10SyncEditorE, "_M0TPC13ref3RefGORP39dowdiness6canopy6editor10SyncEditorE");
function _M0DTP39dowdiness6lambda5token5Token6Lambda() {
}
__name(_M0DTP39dowdiness6lambda5token5Token6Lambda, "_M0DTP39dowdiness6lambda5token5Token6Lambda");
_M0DTP39dowdiness6lambda5token5Token6Lambda.prototype.$tag = 0;
var _M0DTP39dowdiness6lambda5token5Token6Lambda__ = new _M0DTP39dowdiness6lambda5token5Token6Lambda();
function _M0DTP39dowdiness6lambda5token5Token3Dot() {
}
__name(_M0DTP39dowdiness6lambda5token5Token3Dot, "_M0DTP39dowdiness6lambda5token5Token3Dot");
_M0DTP39dowdiness6lambda5token5Token3Dot.prototype.$tag = 1;
var _M0DTP39dowdiness6lambda5token5Token3Dot__ = new _M0DTP39dowdiness6lambda5token5Token3Dot();
function _M0DTP39dowdiness6lambda5token5Token9LeftParen() {
}
__name(_M0DTP39dowdiness6lambda5token5Token9LeftParen, "_M0DTP39dowdiness6lambda5token5Token9LeftParen");
_M0DTP39dowdiness6lambda5token5Token9LeftParen.prototype.$tag = 2;
var _M0DTP39dowdiness6lambda5token5Token9LeftParen__ = new _M0DTP39dowdiness6lambda5token5Token9LeftParen();
function _M0DTP39dowdiness6lambda5token5Token10RightParen() {
}
__name(_M0DTP39dowdiness6lambda5token5Token10RightParen, "_M0DTP39dowdiness6lambda5token5Token10RightParen");
_M0DTP39dowdiness6lambda5token5Token10RightParen.prototype.$tag = 3;
var _M0DTP39dowdiness6lambda5token5Token10RightParen__ = new _M0DTP39dowdiness6lambda5token5Token10RightParen();
function _M0DTP39dowdiness6lambda5token5Token4Plus() {
}
__name(_M0DTP39dowdiness6lambda5token5Token4Plus, "_M0DTP39dowdiness6lambda5token5Token4Plus");
_M0DTP39dowdiness6lambda5token5Token4Plus.prototype.$tag = 4;
var _M0DTP39dowdiness6lambda5token5Token4Plus__ = new _M0DTP39dowdiness6lambda5token5Token4Plus();
function _M0DTP39dowdiness6lambda5token5Token5Minus() {
}
__name(_M0DTP39dowdiness6lambda5token5Token5Minus, "_M0DTP39dowdiness6lambda5token5Token5Minus");
_M0DTP39dowdiness6lambda5token5Token5Minus.prototype.$tag = 5;
var _M0DTP39dowdiness6lambda5token5Token5Minus__ = new _M0DTP39dowdiness6lambda5token5Token5Minus();
function _M0DTP39dowdiness6lambda5token5Token2If() {
}
__name(_M0DTP39dowdiness6lambda5token5Token2If, "_M0DTP39dowdiness6lambda5token5Token2If");
_M0DTP39dowdiness6lambda5token5Token2If.prototype.$tag = 6;
var _M0DTP39dowdiness6lambda5token5Token2If__ = new _M0DTP39dowdiness6lambda5token5Token2If();
function _M0DTP39dowdiness6lambda5token5Token4Then() {
}
__name(_M0DTP39dowdiness6lambda5token5Token4Then, "_M0DTP39dowdiness6lambda5token5Token4Then");
_M0DTP39dowdiness6lambda5token5Token4Then.prototype.$tag = 7;
var _M0DTP39dowdiness6lambda5token5Token4Then__ = new _M0DTP39dowdiness6lambda5token5Token4Then();
function _M0DTP39dowdiness6lambda5token5Token4Else() {
}
__name(_M0DTP39dowdiness6lambda5token5Token4Else, "_M0DTP39dowdiness6lambda5token5Token4Else");
_M0DTP39dowdiness6lambda5token5Token4Else.prototype.$tag = 8;
var _M0DTP39dowdiness6lambda5token5Token4Else__ = new _M0DTP39dowdiness6lambda5token5Token4Else();
function _M0DTP39dowdiness6lambda5token5Token3Let() {
}
__name(_M0DTP39dowdiness6lambda5token5Token3Let, "_M0DTP39dowdiness6lambda5token5Token3Let");
_M0DTP39dowdiness6lambda5token5Token3Let.prototype.$tag = 9;
var _M0DTP39dowdiness6lambda5token5Token3Let__ = new _M0DTP39dowdiness6lambda5token5Token3Let();
function _M0DTP39dowdiness6lambda5token5Token2In() {
}
__name(_M0DTP39dowdiness6lambda5token5Token2In, "_M0DTP39dowdiness6lambda5token5Token2In");
_M0DTP39dowdiness6lambda5token5Token2In.prototype.$tag = 10;
var _M0DTP39dowdiness6lambda5token5Token2In__ = new _M0DTP39dowdiness6lambda5token5Token2In();
function _M0DTP39dowdiness6lambda5token5Token2Eq() {
}
__name(_M0DTP39dowdiness6lambda5token5Token2Eq, "_M0DTP39dowdiness6lambda5token5Token2Eq");
_M0DTP39dowdiness6lambda5token5Token2Eq.prototype.$tag = 11;
var _M0DTP39dowdiness6lambda5token5Token2Eq__ = new _M0DTP39dowdiness6lambda5token5Token2Eq();
function _M0DTP39dowdiness6lambda5token5Token10Identifier(param0) {
  this._0 = param0;
}
__name(_M0DTP39dowdiness6lambda5token5Token10Identifier, "_M0DTP39dowdiness6lambda5token5Token10Identifier");
_M0DTP39dowdiness6lambda5token5Token10Identifier.prototype.$tag = 12;
function _M0DTP39dowdiness6lambda5token5Token7Integer(param0) {
  this._0 = param0;
}
__name(_M0DTP39dowdiness6lambda5token5Token7Integer, "_M0DTP39dowdiness6lambda5token5Token7Integer");
_M0DTP39dowdiness6lambda5token5Token7Integer.prototype.$tag = 13;
function _M0DTP39dowdiness6lambda5token5Token10Whitespace() {
}
__name(_M0DTP39dowdiness6lambda5token5Token10Whitespace, "_M0DTP39dowdiness6lambda5token5Token10Whitespace");
_M0DTP39dowdiness6lambda5token5Token10Whitespace.prototype.$tag = 14;
var _M0DTP39dowdiness6lambda5token5Token10Whitespace__ = new _M0DTP39dowdiness6lambda5token5Token10Whitespace();
function _M0DTP39dowdiness6lambda5token5Token7Newline() {
}
__name(_M0DTP39dowdiness6lambda5token5Token7Newline, "_M0DTP39dowdiness6lambda5token5Token7Newline");
_M0DTP39dowdiness6lambda5token5Token7Newline.prototype.$tag = 15;
var _M0DTP39dowdiness6lambda5token5Token7Newline__ = new _M0DTP39dowdiness6lambda5token5Token7Newline();
function _M0DTP39dowdiness6lambda5token5Token5Error(param0) {
  this._0 = param0;
}
__name(_M0DTP39dowdiness6lambda5token5Token5Error, "_M0DTP39dowdiness6lambda5token5Token5Error");
_M0DTP39dowdiness6lambda5token5Token5Error.prototype.$tag = 16;
function _M0DTP39dowdiness6lambda5token5Token3EOF() {
}
__name(_M0DTP39dowdiness6lambda5token5Token3EOF, "_M0DTP39dowdiness6lambda5token5Token3EOF");
_M0DTP39dowdiness6lambda5token5Token3EOF.prototype.$tag = 17;
var _M0DTP39dowdiness6lambda5token5Token3EOF__ = new _M0DTP39dowdiness6lambda5token5Token3EOF();
function _M0DTP39dowdiness22event_2dgraph_2dwalker4text11SyncFailure17MissingDependency(param0) {
  this._0 = param0;
}
__name(_M0DTP39dowdiness22event_2dgraph_2dwalker4text11SyncFailure17MissingDependency, "_M0DTP39dowdiness22event_2dgraph_2dwalker4text11SyncFailure17MissingDependency");
_M0DTP39dowdiness22event_2dgraph_2dwalker4text11SyncFailure17MissingDependency.prototype.$tag = 0;
function _M0DTP39dowdiness22event_2dgraph_2dwalker4text11SyncFailure16MalformedMessage(param0) {
  this._0 = param0;
}
__name(_M0DTP39dowdiness22event_2dgraph_2dwalker4text11SyncFailure16MalformedMessage, "_M0DTP39dowdiness22event_2dgraph_2dwalker4text11SyncFailure16MalformedMessage");
_M0DTP39dowdiness22event_2dgraph_2dwalker4text11SyncFailure16MalformedMessage.prototype.$tag = 1;
function _M0DTP39dowdiness22event_2dgraph_2dwalker4text11SyncFailure7Timeout(param0) {
  this._0 = param0;
}
__name(_M0DTP39dowdiness22event_2dgraph_2dwalker4text11SyncFailure7Timeout, "_M0DTP39dowdiness22event_2dgraph_2dwalker4text11SyncFailure7Timeout");
_M0DTP39dowdiness22event_2dgraph_2dwalker4text11SyncFailure7Timeout.prototype.$tag = 2;
function _M0DTP39dowdiness22event_2dgraph_2dwalker4text11SyncFailure9Cancelled(param0) {
  this._0 = param0;
}
__name(_M0DTP39dowdiness22event_2dgraph_2dwalker4text11SyncFailure9Cancelled, "_M0DTP39dowdiness22event_2dgraph_2dwalker4text11SyncFailure9Cancelled");
_M0DTP39dowdiness22event_2dgraph_2dwalker4text11SyncFailure9Cancelled.prototype.$tag = 3;
function _M0DTP410antisatori8graphviz3lib6parser5Token6Strict() {
}
__name(_M0DTP410antisatori8graphviz3lib6parser5Token6Strict, "_M0DTP410antisatori8graphviz3lib6parser5Token6Strict");
_M0DTP410antisatori8graphviz3lib6parser5Token6Strict.prototype.$tag = 0;
var _M0DTP410antisatori8graphviz3lib6parser5Token6Strict__ = new _M0DTP410antisatori8graphviz3lib6parser5Token6Strict();
function _M0DTP410antisatori8graphviz3lib6parser5Token5Graph() {
}
__name(_M0DTP410antisatori8graphviz3lib6parser5Token5Graph, "_M0DTP410antisatori8graphviz3lib6parser5Token5Graph");
_M0DTP410antisatori8graphviz3lib6parser5Token5Graph.prototype.$tag = 1;
var _M0DTP410antisatori8graphviz3lib6parser5Token5Graph__ = new _M0DTP410antisatori8graphviz3lib6parser5Token5Graph();
function _M0DTP410antisatori8graphviz3lib6parser5Token7Digraph() {
}
__name(_M0DTP410antisatori8graphviz3lib6parser5Token7Digraph, "_M0DTP410antisatori8graphviz3lib6parser5Token7Digraph");
_M0DTP410antisatori8graphviz3lib6parser5Token7Digraph.prototype.$tag = 2;
var _M0DTP410antisatori8graphviz3lib6parser5Token7Digraph__ = new _M0DTP410antisatori8graphviz3lib6parser5Token7Digraph();
function _M0DTP410antisatori8graphviz3lib6parser5Token4Node() {
}
__name(_M0DTP410antisatori8graphviz3lib6parser5Token4Node, "_M0DTP410antisatori8graphviz3lib6parser5Token4Node");
_M0DTP410antisatori8graphviz3lib6parser5Token4Node.prototype.$tag = 3;
var _M0DTP410antisatori8graphviz3lib6parser5Token4Node__ = new _M0DTP410antisatori8graphviz3lib6parser5Token4Node();
function _M0DTP410antisatori8graphviz3lib6parser5Token4Edge() {
}
__name(_M0DTP410antisatori8graphviz3lib6parser5Token4Edge, "_M0DTP410antisatori8graphviz3lib6parser5Token4Edge");
_M0DTP410antisatori8graphviz3lib6parser5Token4Edge.prototype.$tag = 4;
var _M0DTP410antisatori8graphviz3lib6parser5Token4Edge__ = new _M0DTP410antisatori8graphviz3lib6parser5Token4Edge();
function _M0DTP410antisatori8graphviz3lib6parser5Token8Subgraph() {
}
__name(_M0DTP410antisatori8graphviz3lib6parser5Token8Subgraph, "_M0DTP410antisatori8graphviz3lib6parser5Token8Subgraph");
_M0DTP410antisatori8graphviz3lib6parser5Token8Subgraph.prototype.$tag = 5;
var _M0DTP410antisatori8graphviz3lib6parser5Token8Subgraph__ = new _M0DTP410antisatori8graphviz3lib6parser5Token8Subgraph();
function _M0DTP410antisatori8graphviz3lib6parser5Token2ID(param0) {
  this._0 = param0;
}
__name(_M0DTP410antisatori8graphviz3lib6parser5Token2ID, "_M0DTP410antisatori8graphviz3lib6parser5Token2ID");
_M0DTP410antisatori8graphviz3lib6parser5Token2ID.prototype.$tag = 6;
function _M0DTP410antisatori8graphviz3lib6parser5Token9LeftBrace() {
}
__name(_M0DTP410antisatori8graphviz3lib6parser5Token9LeftBrace, "_M0DTP410antisatori8graphviz3lib6parser5Token9LeftBrace");
_M0DTP410antisatori8graphviz3lib6parser5Token9LeftBrace.prototype.$tag = 7;
var _M0DTP410antisatori8graphviz3lib6parser5Token9LeftBrace__ = new _M0DTP410antisatori8graphviz3lib6parser5Token9LeftBrace();
function _M0DTP410antisatori8graphviz3lib6parser5Token10RightBrace() {
}
__name(_M0DTP410antisatori8graphviz3lib6parser5Token10RightBrace, "_M0DTP410antisatori8graphviz3lib6parser5Token10RightBrace");
_M0DTP410antisatori8graphviz3lib6parser5Token10RightBrace.prototype.$tag = 8;
var _M0DTP410antisatori8graphviz3lib6parser5Token10RightBrace__ = new _M0DTP410antisatori8graphviz3lib6parser5Token10RightBrace();
function _M0DTP410antisatori8graphviz3lib6parser5Token11LeftBracket() {
}
__name(_M0DTP410antisatori8graphviz3lib6parser5Token11LeftBracket, "_M0DTP410antisatori8graphviz3lib6parser5Token11LeftBracket");
_M0DTP410antisatori8graphviz3lib6parser5Token11LeftBracket.prototype.$tag = 9;
var _M0DTP410antisatori8graphviz3lib6parser5Token11LeftBracket__ = new _M0DTP410antisatori8graphviz3lib6parser5Token11LeftBracket();
function _M0DTP410antisatori8graphviz3lib6parser5Token12RightBracket() {
}
__name(_M0DTP410antisatori8graphviz3lib6parser5Token12RightBracket, "_M0DTP410antisatori8graphviz3lib6parser5Token12RightBracket");
_M0DTP410antisatori8graphviz3lib6parser5Token12RightBracket.prototype.$tag = 10;
var _M0DTP410antisatori8graphviz3lib6parser5Token12RightBracket__ = new _M0DTP410antisatori8graphviz3lib6parser5Token12RightBracket();
function _M0DTP410antisatori8graphviz3lib6parser5Token5Colon() {
}
__name(_M0DTP410antisatori8graphviz3lib6parser5Token5Colon, "_M0DTP410antisatori8graphviz3lib6parser5Token5Colon");
_M0DTP410antisatori8graphviz3lib6parser5Token5Colon.prototype.$tag = 11;
var _M0DTP410antisatori8graphviz3lib6parser5Token5Colon__ = new _M0DTP410antisatori8graphviz3lib6parser5Token5Colon();
function _M0DTP410antisatori8graphviz3lib6parser5Token9Semicolon() {
}
__name(_M0DTP410antisatori8graphviz3lib6parser5Token9Semicolon, "_M0DTP410antisatori8graphviz3lib6parser5Token9Semicolon");
_M0DTP410antisatori8graphviz3lib6parser5Token9Semicolon.prototype.$tag = 12;
var _M0DTP410antisatori8graphviz3lib6parser5Token9Semicolon__ = new _M0DTP410antisatori8graphviz3lib6parser5Token9Semicolon();
function _M0DTP410antisatori8graphviz3lib6parser5Token5Comma() {
}
__name(_M0DTP410antisatori8graphviz3lib6parser5Token5Comma, "_M0DTP410antisatori8graphviz3lib6parser5Token5Comma");
_M0DTP410antisatori8graphviz3lib6parser5Token5Comma.prototype.$tag = 13;
var _M0DTP410antisatori8graphviz3lib6parser5Token5Comma__ = new _M0DTP410antisatori8graphviz3lib6parser5Token5Comma();
function _M0DTP410antisatori8graphviz3lib6parser5Token6Equals() {
}
__name(_M0DTP410antisatori8graphviz3lib6parser5Token6Equals, "_M0DTP410antisatori8graphviz3lib6parser5Token6Equals");
_M0DTP410antisatori8graphviz3lib6parser5Token6Equals.prototype.$tag = 14;
var _M0DTP410antisatori8graphviz3lib6parser5Token6Equals__ = new _M0DTP410antisatori8graphviz3lib6parser5Token6Equals();
function _M0DTP410antisatori8graphviz3lib6parser5Token5Arrow() {
}
__name(_M0DTP410antisatori8graphviz3lib6parser5Token5Arrow, "_M0DTP410antisatori8graphviz3lib6parser5Token5Arrow");
_M0DTP410antisatori8graphviz3lib6parser5Token5Arrow.prototype.$tag = 15;
var _M0DTP410antisatori8graphviz3lib6parser5Token5Arrow__ = new _M0DTP410antisatori8graphviz3lib6parser5Token5Arrow();
function _M0DTP410antisatori8graphviz3lib6parser5Token4Line() {
}
__name(_M0DTP410antisatori8graphviz3lib6parser5Token4Line, "_M0DTP410antisatori8graphviz3lib6parser5Token4Line");
_M0DTP410antisatori8graphviz3lib6parser5Token4Line.prototype.$tag = 16;
var _M0DTP410antisatori8graphviz3lib6parser5Token4Line__ = new _M0DTP410antisatori8graphviz3lib6parser5Token4Line();
function _M0DTP410antisatori8graphviz3lib6parser5Token3EOF() {
}
__name(_M0DTP410antisatori8graphviz3lib6parser5Token3EOF, "_M0DTP410antisatori8graphviz3lib6parser5Token3EOF");
_M0DTP410antisatori8graphviz3lib6parser5Token3EOF.prototype.$tag = 17;
var _M0DTP410antisatori8graphviz3lib6parser5Token3EOF__ = new _M0DTP410antisatori8graphviz3lib6parser5Token3EOF();
function _M0DTP410antisatori8graphviz3lib6parser9Statement8NodeStmt(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
__name(_M0DTP410antisatori8graphviz3lib6parser9Statement8NodeStmt, "_M0DTP410antisatori8graphviz3lib6parser9Statement8NodeStmt");
_M0DTP410antisatori8graphviz3lib6parser9Statement8NodeStmt.prototype.$tag = 0;
function _M0DTP410antisatori8graphviz3lib6parser9Statement8EdgeStmt(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
__name(_M0DTP410antisatori8graphviz3lib6parser9Statement8EdgeStmt, "_M0DTP410antisatori8graphviz3lib6parser9Statement8EdgeStmt");
_M0DTP410antisatori8graphviz3lib6parser9Statement8EdgeStmt.prototype.$tag = 1;
function _M0DTP410antisatori8graphviz3lib6parser9Statement8AttrStmt(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
__name(_M0DTP410antisatori8graphviz3lib6parser9Statement8AttrStmt, "_M0DTP410antisatori8graphviz3lib6parser9Statement8AttrStmt");
_M0DTP410antisatori8graphviz3lib6parser9Statement8AttrStmt.prototype.$tag = 2;
function _M0DTP410antisatori8graphviz3lib6parser9Statement10Assignment(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
__name(_M0DTP410antisatori8graphviz3lib6parser9Statement10Assignment, "_M0DTP410antisatori8graphviz3lib6parser9Statement10Assignment");
_M0DTP410antisatori8graphviz3lib6parser9Statement10Assignment.prototype.$tag = 3;
function _M0DTP410antisatori8graphviz3lib6parser9Statement8Subgraph(param0) {
  this._0 = param0;
}
__name(_M0DTP410antisatori8graphviz3lib6parser9Statement8Subgraph, "_M0DTP410antisatori8graphviz3lib6parser9Statement8Subgraph");
_M0DTP410antisatori8graphviz3lib6parser9Statement8Subgraph.prototype.$tag = 4;
function _M0TP410antisatori8graphviz3lib6parser9Attribute(param0, param1) {
  this.key = param0;
  this.value = param1;
}
__name(_M0TP410antisatori8graphviz3lib6parser9Attribute, "_M0TP410antisatori8graphviz3lib6parser9Attribute");
var $_4503599627370496L = { hi: -1048576, lo: 0 };
var $9221120237041090561L = { hi: 2146959360, lo: 1 };
var $9218868437227405312L = { hi: 2146435072, lo: 0 };
var $2L = { hi: 0, lo: 2 };
function _M0DTP39dowdiness6canopy6editor14EphemeralValue4Null() {
}
__name(_M0DTP39dowdiness6canopy6editor14EphemeralValue4Null, "_M0DTP39dowdiness6canopy6editor14EphemeralValue4Null");
_M0DTP39dowdiness6canopy6editor14EphemeralValue4Null.prototype.$tag = 0;
var _M0DTP39dowdiness6canopy6editor14EphemeralValue4Null__ = new _M0DTP39dowdiness6canopy6editor14EphemeralValue4Null();
function _M0DTP39dowdiness6canopy6editor14EphemeralValue4Bool(param0) {
  this._0 = param0;
}
__name(_M0DTP39dowdiness6canopy6editor14EphemeralValue4Bool, "_M0DTP39dowdiness6canopy6editor14EphemeralValue4Bool");
_M0DTP39dowdiness6canopy6editor14EphemeralValue4Bool.prototype.$tag = 1;
function _M0DTP39dowdiness6canopy6editor14EphemeralValue3I64(param0) {
  this._0 = param0;
}
__name(_M0DTP39dowdiness6canopy6editor14EphemeralValue3I64, "_M0DTP39dowdiness6canopy6editor14EphemeralValue3I64");
_M0DTP39dowdiness6canopy6editor14EphemeralValue3I64.prototype.$tag = 2;
function _M0DTP39dowdiness6canopy6editor14EphemeralValue3F64(param0) {
  this._0 = param0;
}
__name(_M0DTP39dowdiness6canopy6editor14EphemeralValue3F64, "_M0DTP39dowdiness6canopy6editor14EphemeralValue3F64");
_M0DTP39dowdiness6canopy6editor14EphemeralValue3F64.prototype.$tag = 3;
function _M0DTP39dowdiness6canopy6editor14EphemeralValue6String(param0) {
  this._0 = param0;
}
__name(_M0DTP39dowdiness6canopy6editor14EphemeralValue6String, "_M0DTP39dowdiness6canopy6editor14EphemeralValue6String");
_M0DTP39dowdiness6canopy6editor14EphemeralValue6String.prototype.$tag = 4;
function _M0DTP39dowdiness6canopy6editor14EphemeralValue5Bytes(param0) {
  this._0 = param0;
}
__name(_M0DTP39dowdiness6canopy6editor14EphemeralValue5Bytes, "_M0DTP39dowdiness6canopy6editor14EphemeralValue5Bytes");
_M0DTP39dowdiness6canopy6editor14EphemeralValue5Bytes.prototype.$tag = 5;
function _M0DTP39dowdiness6canopy6editor14EphemeralValue4List(param0) {
  this._0 = param0;
}
__name(_M0DTP39dowdiness6canopy6editor14EphemeralValue4List, "_M0DTP39dowdiness6canopy6editor14EphemeralValue4List");
_M0DTP39dowdiness6canopy6editor14EphemeralValue4List.prototype.$tag = 6;
function _M0DTP39dowdiness6canopy6editor14EphemeralValue3Map(param0) {
  this._0 = param0;
}
__name(_M0DTP39dowdiness6canopy6editor14EphemeralValue3Map, "_M0DTP39dowdiness6canopy6editor14EphemeralValue3Map");
_M0DTP39dowdiness6canopy6editor14EphemeralValue3Map.prototype.$tag = 7;
function _M0DTPC16result6ResultGORPB5ArrayGRP39dowdiness6canopy10projection8SpanEditEsE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGORPB5ArrayGRP39dowdiness6canopy10projection8SpanEditEsE3Err, "_M0DTPC16result6ResultGORPB5ArrayGRP39dowdiness6canopy10projection8SpanEditEsE3Err");
_M0DTPC16result6ResultGORPB5ArrayGRP39dowdiness6canopy10projection8SpanEditEsE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGORPB5ArrayGRP39dowdiness6canopy10projection8SpanEditEsE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGORPB5ArrayGRP39dowdiness6canopy10projection8SpanEditEsE2Ok, "_M0DTPC16result6ResultGORPB5ArrayGRP39dowdiness6canopy10projection8SpanEditEsE2Ok");
_M0DTPC16result6ResultGORPB5ArrayGRP39dowdiness6canopy10projection8SpanEditEsE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGusE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGusE3Err, "_M0DTPC16result6ResultGusE3Err");
_M0DTPC16result6ResultGusE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGusE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGusE2Ok, "_M0DTPC16result6ResultGusE2Ok");
_M0DTPC16result6ResultGusE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGRP39dowdiness6canopy10projection10TreeEditOpsE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGRP39dowdiness6canopy10projection10TreeEditOpsE3Err, "_M0DTPC16result6ResultGRP39dowdiness6canopy10projection10TreeEditOpsE3Err");
_M0DTPC16result6ResultGRP39dowdiness6canopy10projection10TreeEditOpsE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRP39dowdiness6canopy10projection10TreeEditOpsE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGRP39dowdiness6canopy10projection10TreeEditOpsE2Ok, "_M0DTPC16result6ResultGRP39dowdiness6canopy10projection10TreeEditOpsE2Ok");
_M0DTPC16result6ResultGRP39dowdiness6canopy10projection10TreeEditOpsE2Ok.prototype.$tag = 1;
var $PanicError = class extends Error {
};
__name($PanicError, "$PanicError");
function $panic() {
  throw new $PanicError();
}
__name($panic, "$panic");
function $bound_check(arr, index) {
  if (index < 0 || index >= arr.length)
    throw new Error("Index out of bounds");
}
__name($bound_check, "$bound_check");
function _M0TPB13StringBuilder(param0) {
  this.val = param0;
}
__name(_M0TPB13StringBuilder, "_M0TPB13StringBuilder");
function _M0TPC16string10StringView(param0, param1, param2) {
  this.str = param0;
  this.start = param1;
  this.end = param2;
}
__name(_M0TPC16string10StringView, "_M0TPC16string10StringView");
function _M0TPB13SourceLocRepr(param0, param1, param2, param3, param4, param5) {
  this.pkg = param0;
  this.filename = param1;
  this.start_line = param2;
  this.start_column = param3;
  this.end_line = param4;
  this.end_column = param5;
}
__name(_M0TPB13SourceLocRepr, "_M0TPB13SourceLocRepr");
function _M0TPB7MyInt64(param0, param1) {
  this.hi = param0;
  this.lo = param1;
}
__name(_M0TPB7MyInt64, "_M0TPB7MyInt64");
function $compare_int(a, b) {
  return (a >= b) - (a <= b);
}
__name($compare_int, "$compare_int");
var _M0FPB12random__seed = /* @__PURE__ */ __name(() => {
  if (globalThis.crypto?.getRandomValues) {
    const array = new Uint32Array(1);
    globalThis.crypto.getRandomValues(array);
    return array[0] | 0;
  } else {
    return Math.floor(Math.random() * 4294967296) | 0;
  }
}, "_M0FPB12random__seed");
function _M0TPB6Hasher(param0) {
  this.acc = param0;
}
__name(_M0TPB6Hasher, "_M0TPB6Hasher");
var _M0FPB19int__to__string__js = /* @__PURE__ */ __name((x, radix) => {
  return x.toString(radix);
}, "_M0FPB19int__to__string__js");
function $makebytes(a, b) {
  const arr = new Uint8Array(a);
  if (b !== 0) {
    arr.fill(b);
  }
  return arr;
}
__name($makebytes, "$makebytes");
function $make_array_len_and_init(a, b) {
  const arr = new Array(a);
  arr.fill(b);
  return arr;
}
__name($make_array_len_and_init, "$make_array_len_and_init");
var _M0MPB7JSArray4push = /* @__PURE__ */ __name((arr, val) => {
  arr.push(val);
}, "_M0MPB7JSArray4push");
function _M0TPB9ArrayViewGRP49dowdiness22event_2dgraph_2dwalker8internal4core5OpRunE(param0, param1, param2) {
  this.buf = param0;
  this.start = param1;
  this.end = param2;
}
__name(_M0TPB9ArrayViewGRP49dowdiness22event_2dgraph_2dwalker8internal4core5OpRunE, "_M0TPB9ArrayViewGRP49dowdiness22event_2dgraph_2dwalker8internal4core5OpRunE");
function _M0TPB9ArrayViewGyE(param0, param1, param2) {
  this.buf = param0;
  this.start = param1;
  this.end = param2;
}
__name(_M0TPB9ArrayViewGyE, "_M0TPB9ArrayViewGyE");
function _M0TPB3MapGsRP39dowdiness6canopy5relay9RelayRoomE(param0, param1, param2, param3, param4, param5, param6) {
  this.entries = param0;
  this.size = param1;
  this.capacity = param2;
  this.capacity_mask = param3;
  this.grow_at = param4;
  this.head = param5;
  this.tail = param6;
}
__name(_M0TPB3MapGsRP39dowdiness6canopy5relay9RelayRoomE, "_M0TPB3MapGsRP39dowdiness6canopy5relay9RelayRoomE");
function _M0TPB5EntryGsRP39dowdiness6canopy5relay9RelayRoomE(param0, param1, param2, param3, param4, param5) {
  this.prev = param0;
  this.next = param1;
  this.psl = param2;
  this.hash = param3;
  this.key = param4;
  this.value = param5;
}
__name(_M0TPB5EntryGsRP39dowdiness6canopy5relay9RelayRoomE, "_M0TPB5EntryGsRP39dowdiness6canopy5relay9RelayRoomE");
function _M0DTPC16option6OptionGRPB5ArrayGiEE4None() {
}
__name(_M0DTPC16option6OptionGRPB5ArrayGiEE4None, "_M0DTPC16option6OptionGRPB5ArrayGiEE4None");
_M0DTPC16option6OptionGRPB5ArrayGiEE4None.prototype.$tag = 0;
var _M0DTPC16option6OptionGRPB5ArrayGiEE4None__ = new _M0DTPC16option6OptionGRPB5ArrayGiEE4None();
function _M0DTPC16option6OptionGRPB5ArrayGiEE4Some(param0) {
  this._0 = param0;
}
__name(_M0DTPC16option6OptionGRPB5ArrayGiEE4Some, "_M0DTPC16option6OptionGRPB5ArrayGiEE4Some");
_M0DTPC16option6OptionGRPB5ArrayGiEE4Some.prototype.$tag = 1;
var _M0MPB7MyInt6423reinterpret__as__double = /* @__PURE__ */ __name(function f(a) {
  let view = f._view;
  if (view === void 0) {
    view = f._view = new DataView(new ArrayBuffer(8));
  }
  view.setUint32(0, a.hi);
  view.setUint32(4, a.lo);
  return view.getFloat64(0);
}, "f");
var $bytes_literal$0 = new Uint8Array();
var _M0FPB23try__init__wasm__helper = /* @__PURE__ */ __name(function() {
  try {
    return new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 13, 2, 96, 0, 1, 127, 96, 4, 127, 127, 127, 127, 1, 127, 3, 7, 6, 0, 1, 1, 1, 1, 1, 6, 6, 1, 127, 1, 65, 0, 11, 7, 50, 6, 3, 109, 117, 108, 0, 1, 5, 100, 105, 118, 95, 115, 0, 2, 5, 100, 105, 118, 95, 117, 0, 3, 5, 114, 101, 109, 95, 115, 0, 4, 5, 114, 101, 109, 95, 117, 0, 5, 8, 103, 101, 116, 95, 104, 105, 103, 104, 0, 0, 10, 191, 1, 6, 4, 0, 35, 0, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 126, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 127, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 128, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 129, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 130, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11])), {}).exports;
  } catch (e) {
    return void 0;
  }
}, "_M0FPB23try__init__wasm__helper");
var _M0MPB7MyInt6411div__bigint = /* @__PURE__ */ __name((a, b) => {
  const aVal = BigInt(a.hi) << 32n | BigInt(a.lo >>> 0);
  const bVal = BigInt(b.hi) << 32n | BigInt(b.lo >>> 0);
  const result = aVal / bVal;
  const lo = Number(result & 0xFFFFFFFFn);
  const hi = Number(result >> 32n & 0xFFFFFFFFn);
  return { hi: hi | 0, lo: lo | 0 };
}, "_M0MPB7MyInt6411div__bigint");
var _M0MPB7MyInt647compare = /* @__PURE__ */ __name((a, b) => {
  const ahi = a.hi;
  const bhi = b.hi;
  if (ahi < bhi) {
    return -1;
  }
  if (ahi > bhi) {
    return 1;
  }
  const alo = a.lo >>> 0;
  const blo = b.lo >>> 0;
  if (alo < blo) {
    return -1;
  }
  if (alo > blo) {
    return 1;
  }
  return 0;
}, "_M0MPB7MyInt647compare");
var _M0MPB7JSArray3pop = /* @__PURE__ */ __name((arr) => arr.pop(), "_M0MPB7JSArray3pop");
var _M0MPB7JSArray6splice = /* @__PURE__ */ __name((arr, idx, cnt) => arr.splice(idx, cnt), "_M0MPB7JSArray6splice");
function _M0DTPC16option6OptionGRPB5ArrayGRP29dowdiness4seam10CstElementEE4None() {
}
__name(_M0DTPC16option6OptionGRPB5ArrayGRP29dowdiness4seam10CstElementEE4None, "_M0DTPC16option6OptionGRPB5ArrayGRP29dowdiness4seam10CstElementEE4None");
_M0DTPC16option6OptionGRPB5ArrayGRP29dowdiness4seam10CstElementEE4None.prototype.$tag = 0;
var _M0DTPC16option6OptionGRPB5ArrayGRP29dowdiness4seam10CstElementEE4None__ = new _M0DTPC16option6OptionGRPB5ArrayGRP29dowdiness4seam10CstElementEE4None();
function _M0DTPC16option6OptionGRPB5ArrayGRP29dowdiness4seam10CstElementEE4Some(param0) {
  this._0 = param0;
}
__name(_M0DTPC16option6OptionGRPB5ArrayGRP29dowdiness4seam10CstElementEE4Some, "_M0DTPC16option6OptionGRPB5ArrayGRP29dowdiness4seam10CstElementEE4Some");
_M0DTPC16option6OptionGRPB5ArrayGRP29dowdiness4seam10CstElementEE4Some.prototype.$tag = 1;
function _M0TPB9ArrayViewGRP39dowdiness4loom4core10DiagnosticGRP39dowdiness6lambda5token5TokenEE(param0, param1, param2) {
  this.buf = param0;
  this.start = param1;
  this.end = param2;
}
__name(_M0TPB9ArrayViewGRP39dowdiness4loom4core10DiagnosticGRP39dowdiness6lambda5token5TokenEE, "_M0TPB9ArrayViewGRP39dowdiness4loom4core10DiagnosticGRP39dowdiness6lambda5token5TokenEE");
function _M0TPC16buffer6Buffer(param0, param1) {
  this.data = param0;
  this.len = param1;
}
__name(_M0TPC16buffer6Buffer, "_M0TPC16buffer6Buffer");
function _M0DTPC16result6ResultGUiRPC16string10StringViewbERPC17strconv12StrConvErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGUiRPC16string10StringViewbERPC17strconv12StrConvErrorE3Err, "_M0DTPC16result6ResultGUiRPC16string10StringViewbERPC17strconv12StrConvErrorE3Err");
_M0DTPC16result6ResultGUiRPC16string10StringViewbERPC17strconv12StrConvErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGUiRPC16string10StringViewbERPC17strconv12StrConvErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGUiRPC16string10StringViewbERPC17strconv12StrConvErrorE2Ok, "_M0DTPC16result6ResultGUiRPC16string10StringViewbERPC17strconv12StrConvErrorE2Ok");
_M0DTPC16result6ResultGUiRPC16string10StringViewbERPC17strconv12StrConvErrorE2Ok.prototype.$tag = 1;
function _M0DTPC15error5Error48moonbitlang_2fcore_2fbuiltin_2eFailure_2eFailure(param0) {
  this._0 = param0;
}
__name(_M0DTPC15error5Error48moonbitlang_2fcore_2fbuiltin_2eFailure_2eFailure, "_M0DTPC15error5Error48moonbitlang_2fcore_2fbuiltin_2eFailure_2eFailure");
_M0DTPC15error5Error48moonbitlang_2fcore_2fbuiltin_2eFailure_2eFailure.prototype.$tag = 41;
function _M0DTPC15error5Error71dowdiness_2fevent_2dgraph_2dwalker_2ftext_2eTextError_2eInvalidPosition(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
__name(_M0DTPC15error5Error71dowdiness_2fevent_2dgraph_2dwalker_2ftext_2eTextError_2eInvalidPosition, "_M0DTPC15error5Error71dowdiness_2fevent_2dgraph_2dwalker_2ftext_2eTextError_2eInvalidPosition");
_M0DTPC15error5Error71dowdiness_2fevent_2dgraph_2dwalker_2ftext_2eTextError_2eInvalidPosition.prototype.$tag = 40;
function _M0DTPC15error5Error66dowdiness_2fevent_2dgraph_2dwalker_2ftext_2eTextError_2eSyncFailed(param0) {
  this._0 = param0;
}
__name(_M0DTPC15error5Error66dowdiness_2fevent_2dgraph_2dwalker_2ftext_2eTextError_2eSyncFailed, "_M0DTPC15error5Error66dowdiness_2fevent_2dgraph_2dwalker_2ftext_2eTextError_2eSyncFailed");
_M0DTPC15error5Error66dowdiness_2fevent_2dgraph_2dwalker_2ftext_2eTextError_2eSyncFailed.prototype.$tag = 39;
function _M0DTPC15error5Error71dowdiness_2fevent_2dgraph_2dwalker_2ftext_2eTextError_2eVersionNotFound() {
}
__name(_M0DTPC15error5Error71dowdiness_2fevent_2dgraph_2dwalker_2ftext_2eTextError_2eVersionNotFound, "_M0DTPC15error5Error71dowdiness_2fevent_2dgraph_2dwalker_2ftext_2eTextError_2eVersionNotFound");
_M0DTPC15error5Error71dowdiness_2fevent_2dgraph_2dwalker_2ftext_2eTextError_2eVersionNotFound.prototype.$tag = 38;
function _M0DTPC15error5Error64dowdiness_2fevent_2dgraph_2dwalker_2ftext_2eTextError_2eInternal(param0) {
  this._0 = param0;
}
__name(_M0DTPC15error5Error64dowdiness_2fevent_2dgraph_2dwalker_2ftext_2eTextError_2eInternal, "_M0DTPC15error5Error64dowdiness_2fevent_2dgraph_2dwalker_2ftext_2eTextError_2eInternal");
_M0DTPC15error5Error64dowdiness_2fevent_2dgraph_2dwalker_2ftext_2eTextError_2eInternal.prototype.$tag = 37;
function _M0DTPC15error5Error68dowdiness_2fevent_2dgraph_2dwalker_2fundo_2eUndoError_2eItemNotFound() {
}
__name(_M0DTPC15error5Error68dowdiness_2fevent_2dgraph_2dwalker_2fundo_2eUndoError_2eItemNotFound, "_M0DTPC15error5Error68dowdiness_2fevent_2dgraph_2dwalker_2fundo_2eUndoError_2eItemNotFound");
_M0DTPC15error5Error68dowdiness_2fevent_2dgraph_2dwalker_2fundo_2eUndoError_2eItemNotFound.prototype.$tag = 36;
var _M0DTPC15error5Error68dowdiness_2fevent_2dgraph_2dwalker_2fundo_2eUndoError_2eItemNotFound__ = new _M0DTPC15error5Error68dowdiness_2fevent_2dgraph_2dwalker_2fundo_2eUndoError_2eItemNotFound();
function _M0DTPC15error5Error64dowdiness_2fevent_2dgraph_2dwalker_2fundo_2eUndoError_2eInternal(param0) {
  this._0 = param0;
}
__name(_M0DTPC15error5Error64dowdiness_2fevent_2dgraph_2dwalker_2fundo_2eUndoError_2eInternal, "_M0DTPC15error5Error64dowdiness_2fevent_2dgraph_2dwalker_2fundo_2eUndoError_2eInternal");
_M0DTPC15error5Error64dowdiness_2fevent_2dgraph_2dwalker_2fundo_2eUndoError_2eInternal.prototype.$tag = 35;
function _M0DTPC15error5Error90dowdiness_2fevent_2dgraph_2dwalker_2finternal_2fdocument_2eDocumentError_2eInvalidPosition(param0) {
  this._0 = param0;
}
__name(_M0DTPC15error5Error90dowdiness_2fevent_2dgraph_2dwalker_2finternal_2fdocument_2eDocumentError_2eInvalidPosition, "_M0DTPC15error5Error90dowdiness_2fevent_2dgraph_2dwalker_2finternal_2fdocument_2eDocumentError_2eInvalidPosition");
_M0DTPC15error5Error90dowdiness_2fevent_2dgraph_2dwalker_2finternal_2fdocument_2eDocumentError_2eInvalidPosition.prototype.$tag = 34;
function _M0DTPC15error5Error88dowdiness_2fevent_2dgraph_2dwalker_2finternal_2fdocument_2eDocumentError_2eMissingOrigin(param0) {
  this._0 = param0;
}
__name(_M0DTPC15error5Error88dowdiness_2fevent_2dgraph_2dwalker_2finternal_2fdocument_2eDocumentError_2eMissingOrigin, "_M0DTPC15error5Error88dowdiness_2fevent_2dgraph_2dwalker_2finternal_2fdocument_2eDocumentError_2eMissingOrigin");
_M0DTPC15error5Error88dowdiness_2fevent_2dgraph_2dwalker_2finternal_2fdocument_2eDocumentError_2eMissingOrigin.prototype.$tag = 33;
function _M0DTPC15error5Error80dowdiness_2fevent_2dgraph_2dwalker_2finternal_2fdocument_2eDocumentError_2eOpLog(param0) {
  this._0 = param0;
}
__name(_M0DTPC15error5Error80dowdiness_2fevent_2dgraph_2dwalker_2finternal_2fdocument_2eDocumentError_2eOpLog, "_M0DTPC15error5Error80dowdiness_2fevent_2dgraph_2dwalker_2finternal_2fdocument_2eDocumentError_2eOpLog");
_M0DTPC15error5Error80dowdiness_2fevent_2dgraph_2dwalker_2finternal_2fdocument_2eDocumentError_2eOpLog.prototype.$tag = 32;
function _M0DTPC15error5Error80dowdiness_2fevent_2dgraph_2dwalker_2finternal_2fdocument_2eDocumentError_2eFugue(param0) {
  this._0 = param0;
}
__name(_M0DTPC15error5Error80dowdiness_2fevent_2dgraph_2dwalker_2finternal_2fdocument_2eDocumentError_2eFugue, "_M0DTPC15error5Error80dowdiness_2fevent_2dgraph_2dwalker_2finternal_2fdocument_2eDocumentError_2eFugue");
_M0DTPC15error5Error80dowdiness_2fevent_2dgraph_2dwalker_2finternal_2fdocument_2eDocumentError_2eFugue.prototype.$tag = 31;
function _M0DTPC15error5Error81dowdiness_2fevent_2dgraph_2dwalker_2finternal_2fdocument_2eDocumentError_2eBranch(param0) {
  this._0 = param0;
}
__name(_M0DTPC15error5Error81dowdiness_2fevent_2dgraph_2dwalker_2finternal_2fdocument_2eDocumentError_2eBranch, "_M0DTPC15error5Error81dowdiness_2fevent_2dgraph_2dwalker_2finternal_2fdocument_2eDocumentError_2eBranch");
_M0DTPC15error5Error81dowdiness_2fevent_2dgraph_2dwalker_2finternal_2fdocument_2eDocumentError_2eBranch.prototype.$tag = 30;
function _M0DTPC15error5Error80dowdiness_2fevent_2dgraph_2dwalker_2finternal_2fbranch_2eBranchError_2eMissingOp(param0) {
  this._0 = param0;
}
__name(_M0DTPC15error5Error80dowdiness_2fevent_2dgraph_2dwalker_2finternal_2fbranch_2eBranchError_2eMissingOp, "_M0DTPC15error5Error80dowdiness_2fevent_2dgraph_2dwalker_2finternal_2fbranch_2eBranchError_2eMissingOp");
_M0DTPC15error5Error80dowdiness_2fevent_2dgraph_2dwalker_2finternal_2fbranch_2eBranchError_2eMissingOp.prototype.$tag = 29;
function _M0DTPC15error5Error84dowdiness_2fevent_2dgraph_2dwalker_2finternal_2fbranch_2eBranchError_2eMissingOrigin(param0) {
  this._0 = param0;
}
__name(_M0DTPC15error5Error84dowdiness_2fevent_2dgraph_2dwalker_2finternal_2fbranch_2eBranchError_2eMissingOrigin, "_M0DTPC15error5Error84dowdiness_2fevent_2dgraph_2dwalker_2finternal_2fbranch_2eBranchError_2eMissingOrigin");
_M0DTPC15error5Error84dowdiness_2fevent_2dgraph_2dwalker_2finternal_2fbranch_2eBranchError_2eMissingOrigin.prototype.$tag = 28;
function _M0DTPC15error5Error76dowdiness_2fevent_2dgraph_2dwalker_2finternal_2fbranch_2eBranchError_2eOpLog(param0) {
  this._0 = param0;
}
__name(_M0DTPC15error5Error76dowdiness_2fevent_2dgraph_2dwalker_2finternal_2fbranch_2eBranchError_2eOpLog, "_M0DTPC15error5Error76dowdiness_2fevent_2dgraph_2dwalker_2finternal_2fbranch_2eBranchError_2eOpLog");
_M0DTPC15error5Error76dowdiness_2fevent_2dgraph_2dwalker_2finternal_2fbranch_2eBranchError_2eOpLog.prototype.$tag = 27;
function _M0DTPC15error5Error76dowdiness_2fevent_2dgraph_2dwalker_2finternal_2fbranch_2eBranchError_2eFugue(param0) {
  this._0 = param0;
}
__name(_M0DTPC15error5Error76dowdiness_2fevent_2dgraph_2dwalker_2finternal_2fbranch_2eBranchError_2eFugue, "_M0DTPC15error5Error76dowdiness_2fevent_2dgraph_2dwalker_2finternal_2fbranch_2eBranchError_2eFugue");
_M0DTPC15error5Error76dowdiness_2fevent_2dgraph_2dwalker_2finternal_2fbranch_2eBranchError_2eFugue.prototype.$tag = 26;
function _M0DTPC15error5Error88dowdiness_2fevent_2dgraph_2dwalker_2finternal_2foplog_2eOpLogError_2eMissingLocalVersion(param0) {
  this._0 = param0;
}
__name(_M0DTPC15error5Error88dowdiness_2fevent_2dgraph_2dwalker_2finternal_2foplog_2eOpLogError_2eMissingLocalVersion, "_M0DTPC15error5Error88dowdiness_2fevent_2dgraph_2dwalker_2finternal_2foplog_2eOpLogError_2eMissingLocalVersion");
_M0DTPC15error5Error88dowdiness_2fevent_2dgraph_2dwalker_2finternal_2foplog_2eOpLogError_2eMissingLocalVersion.prototype.$tag = 25;
function _M0DTPC15error5Error82dowdiness_2fevent_2dgraph_2dwalker_2finternal_2foplog_2eOpLogError_2eMissingOrigin() {
}
__name(_M0DTPC15error5Error82dowdiness_2fevent_2dgraph_2dwalker_2finternal_2foplog_2eOpLogError_2eMissingOrigin, "_M0DTPC15error5Error82dowdiness_2fevent_2dgraph_2dwalker_2finternal_2foplog_2eOpLogError_2eMissingOrigin");
_M0DTPC15error5Error82dowdiness_2fevent_2dgraph_2dwalker_2finternal_2foplog_2eOpLogError_2eMissingOrigin.prototype.$tag = 24;
var _M0DTPC15error5Error82dowdiness_2fevent_2dgraph_2dwalker_2finternal_2foplog_2eOpLogError_2eMissingOrigin__ = new _M0DTPC15error5Error82dowdiness_2fevent_2dgraph_2dwalker_2finternal_2foplog_2eOpLogError_2eMissingOrigin();
function _M0DTPC15error5Error88dowdiness_2fevent_2dgraph_2dwalker_2finternal_2foplog_2eOpLogError_2eMissingRemoteParent(param0) {
  this._0 = param0;
}
__name(_M0DTPC15error5Error88dowdiness_2fevent_2dgraph_2dwalker_2finternal_2foplog_2eOpLogError_2eMissingRemoteParent, "_M0DTPC15error5Error88dowdiness_2fevent_2dgraph_2dwalker_2finternal_2foplog_2eOpLogError_2eMissingRemoteParent");
_M0DTPC15error5Error88dowdiness_2fevent_2dgraph_2dwalker_2finternal_2foplog_2eOpLogError_2eMissingRemoteParent.prototype.$tag = 23;
function _M0DTPC15error5Error90dowdiness_2fevent_2dgraph_2dwalker_2finternal_2foplog_2eOpLogError_2eMissingRemoteFrontier(param0) {
  this._0 = param0;
}
__name(_M0DTPC15error5Error90dowdiness_2fevent_2dgraph_2dwalker_2finternal_2foplog_2eOpLogError_2eMissingRemoteFrontier, "_M0DTPC15error5Error90dowdiness_2fevent_2dgraph_2dwalker_2finternal_2foplog_2eOpLogError_2eMissingRemoteFrontier");
_M0DTPC15error5Error90dowdiness_2fevent_2dgraph_2dwalker_2finternal_2foplog_2eOpLogError_2eMissingRemoteFrontier.prototype.$tag = 22;
function _M0DTPC15error5Error87dowdiness_2fevent_2dgraph_2dwalker_2finternal_2foplog_2eOpLogError_2eDuplicateOperation(param0) {
  this._0 = param0;
}
__name(_M0DTPC15error5Error87dowdiness_2fevent_2dgraph_2dwalker_2finternal_2foplog_2eOpLogError_2eDuplicateOperation, "_M0DTPC15error5Error87dowdiness_2fevent_2dgraph_2dwalker_2finternal_2foplog_2eOpLogError_2eDuplicateOperation");
_M0DTPC15error5Error87dowdiness_2fevent_2dgraph_2dwalker_2finternal_2foplog_2eOpLogError_2eDuplicateOperation.prototype.$tag = 21;
function _M0DTPC15error5Error85dowdiness_2fevent_2dgraph_2dwalker_2finternal_2foplog_2eOpLogError_2eCausalGraphError(param0) {
  this._0 = param0;
}
__name(_M0DTPC15error5Error85dowdiness_2fevent_2dgraph_2dwalker_2finternal_2foplog_2eOpLogError_2eCausalGraphError, "_M0DTPC15error5Error85dowdiness_2fevent_2dgraph_2dwalker_2finternal_2foplog_2eOpLogError_2eCausalGraphError");
_M0DTPC15error5Error85dowdiness_2fevent_2dgraph_2dwalker_2finternal_2foplog_2eOpLogError_2eCausalGraphError.prototype.$tag = 20;
function _M0DTPC15error5Error80dowdiness_2fevent_2dgraph_2dwalker_2finternal_2ffugue_2eFugueError_2eMissingItem(param0) {
  this._0 = param0;
}
__name(_M0DTPC15error5Error80dowdiness_2fevent_2dgraph_2dwalker_2finternal_2ffugue_2eFugueError_2eMissingItem, "_M0DTPC15error5Error80dowdiness_2fevent_2dgraph_2dwalker_2finternal_2ffugue_2eFugueError_2eMissingItem");
_M0DTPC15error5Error80dowdiness_2fevent_2dgraph_2dwalker_2finternal_2ffugue_2eFugueError_2eMissingItem.prototype.$tag = 19;
function _M0DTPC15error5Error96dowdiness_2fevent_2dgraph_2dwalker_2finternal_2fcausal__graph_2eCausalGraphError_2eMissingParent(param0) {
  this._0 = param0;
}
__name(_M0DTPC15error5Error96dowdiness_2fevent_2dgraph_2dwalker_2finternal_2fcausal__graph_2eCausalGraphError_2eMissingParent, "_M0DTPC15error5Error96dowdiness_2fevent_2dgraph_2dwalker_2finternal_2fcausal__graph_2eCausalGraphError_2eMissingParent");
_M0DTPC15error5Error96dowdiness_2fevent_2dgraph_2dwalker_2finternal_2fcausal__graph_2eCausalGraphError_2eMissingParent.prototype.$tag = 18;
function _M0DTPC15error5Error95dowdiness_2fevent_2dgraph_2dwalker_2finternal_2fcausal__graph_2eCausalGraphError_2eMissingEntry(param0) {
  this._0 = param0;
}
__name(_M0DTPC15error5Error95dowdiness_2fevent_2dgraph_2dwalker_2finternal_2fcausal__graph_2eCausalGraphError_2eMissingEntry, "_M0DTPC15error5Error95dowdiness_2fevent_2dgraph_2dwalker_2finternal_2fcausal__graph_2eCausalGraphError_2eMissingEntry");
_M0DTPC15error5Error95dowdiness_2fevent_2dgraph_2dwalker_2finternal_2fcausal__graph_2eCausalGraphError_2eMissingEntry.prototype.$tag = 17;
function _M0DTPC15error5Error48dowdiness_2frle_2eRleError_2ePositionOutOfBounds(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
__name(_M0DTPC15error5Error48dowdiness_2frle_2eRleError_2ePositionOutOfBounds, "_M0DTPC15error5Error48dowdiness_2frle_2eRleError_2ePositionOutOfBounds");
_M0DTPC15error5Error48dowdiness_2frle_2eRleError_2ePositionOutOfBounds.prototype.$tag = 16;
function _M0DTPC15error5Error41dowdiness_2frle_2eRleError_2eInvalidRange(param0, param1, param2, param3) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
  this._3 = param3;
}
__name(_M0DTPC15error5Error41dowdiness_2frle_2eRleError_2eInvalidRange, "_M0DTPC15error5Error41dowdiness_2frle_2eRleError_2eInvalidRange");
_M0DTPC15error5Error41dowdiness_2frle_2eRleError_2eInvalidRange.prototype.$tag = 15;
function _M0DTPC15error5Error41dowdiness_2frle_2eRleError_2eInvalidSlice(param0) {
  this._0 = param0;
}
__name(_M0DTPC15error5Error41dowdiness_2frle_2eRleError_2eInvalidSlice, "_M0DTPC15error5Error41dowdiness_2frle_2eRleError_2eInvalidSlice");
_M0DTPC15error5Error41dowdiness_2frle_2eRleError_2eInvalidSlice.prototype.$tag = 12;
function _M0DTPC15error5Error37dowdiness_2frle_2eRleError_2eInternal(param0) {
  this._0 = param0;
}
__name(_M0DTPC15error5Error37dowdiness_2frle_2eRleError_2eInternal, "_M0DTPC15error5Error37dowdiness_2frle_2eRleError_2eInternal");
_M0DTPC15error5Error37dowdiness_2frle_2eRleError_2eInternal.prototype.$tag = 11;
function _M0DTPC15error5Error47dowdiness_2frle_2eSliceError_2eIndexOutOfBounds() {
}
__name(_M0DTPC15error5Error47dowdiness_2frle_2eSliceError_2eIndexOutOfBounds, "_M0DTPC15error5Error47dowdiness_2frle_2eSliceError_2eIndexOutOfBounds");
_M0DTPC15error5Error47dowdiness_2frle_2eSliceError_2eIndexOutOfBounds.prototype.$tag = 14;
function _M0DTPC15error5Error43dowdiness_2frle_2eSliceError_2eInvalidIndex() {
}
__name(_M0DTPC15error5Error43dowdiness_2frle_2eSliceError_2eInvalidIndex, "_M0DTPC15error5Error43dowdiness_2frle_2eSliceError_2eInvalidIndex");
_M0DTPC15error5Error43dowdiness_2frle_2eSliceError_2eInvalidIndex.prototype.$tag = 13;
function _M0DTPC15error5Error46dowdiness_2frle_2eInternalError_2eEmptyElement() {
}
__name(_M0DTPC15error5Error46dowdiness_2frle_2eInternalError_2eEmptyElement, "_M0DTPC15error5Error46dowdiness_2frle_2eInternalError_2eEmptyElement");
_M0DTPC15error5Error46dowdiness_2frle_2eInternalError_2eEmptyElement.prototype.$tag = 10;
var _M0DTPC15error5Error46dowdiness_2frle_2eInternalError_2eEmptyElement__ = new _M0DTPC15error5Error46dowdiness_2frle_2eInternalError_2eEmptyElement();
function _M0DTPC15error5Error46dowdiness_2frle_2eInternalError_2eInvalidState(param0) {
  this._0 = param0;
}
__name(_M0DTPC15error5Error46dowdiness_2frle_2eInternalError_2eInvalidState, "_M0DTPC15error5Error46dowdiness_2frle_2eInternalError_2eInvalidState");
_M0DTPC15error5Error46dowdiness_2frle_2eInternalError_2eInvalidState.prototype.$tag = 9;
function _M0DTPC15error5Error52moonbitlang_2fcore_2fjson_2eParseError_2eInvalidChar(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
__name(_M0DTPC15error5Error52moonbitlang_2fcore_2fjson_2eParseError_2eInvalidChar, "_M0DTPC15error5Error52moonbitlang_2fcore_2fjson_2eParseError_2eInvalidChar");
_M0DTPC15error5Error52moonbitlang_2fcore_2fjson_2eParseError_2eInvalidChar.prototype.$tag = 8;
function _M0DTPC15error5Error51moonbitlang_2fcore_2fjson_2eParseError_2eInvalidEof() {
}
__name(_M0DTPC15error5Error51moonbitlang_2fcore_2fjson_2eParseError_2eInvalidEof, "_M0DTPC15error5Error51moonbitlang_2fcore_2fjson_2eParseError_2eInvalidEof");
_M0DTPC15error5Error51moonbitlang_2fcore_2fjson_2eParseError_2eInvalidEof.prototype.$tag = 7;
var _M0DTPC15error5Error51moonbitlang_2fcore_2fjson_2eParseError_2eInvalidEof__ = new _M0DTPC15error5Error51moonbitlang_2fcore_2fjson_2eParseError_2eInvalidEof();
function _M0DTPC15error5Error54moonbitlang_2fcore_2fjson_2eParseError_2eInvalidNumber(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
__name(_M0DTPC15error5Error54moonbitlang_2fcore_2fjson_2eParseError_2eInvalidNumber, "_M0DTPC15error5Error54moonbitlang_2fcore_2fjson_2eParseError_2eInvalidNumber");
_M0DTPC15error5Error54moonbitlang_2fcore_2fjson_2eParseError_2eInvalidNumber.prototype.$tag = 6;
function _M0DTPC15error5Error59moonbitlang_2fcore_2fjson_2eParseError_2eInvalidIdentEscape(param0) {
  this._0 = param0;
}
__name(_M0DTPC15error5Error59moonbitlang_2fcore_2fjson_2eParseError_2eInvalidIdentEscape, "_M0DTPC15error5Error59moonbitlang_2fcore_2fjson_2eParseError_2eInvalidIdentEscape");
_M0DTPC15error5Error59moonbitlang_2fcore_2fjson_2eParseError_2eInvalidIdentEscape.prototype.$tag = 5;
function _M0DTPC15error5Error59moonbitlang_2fcore_2fjson_2eParseError_2eDepthLimitExceeded() {
}
__name(_M0DTPC15error5Error59moonbitlang_2fcore_2fjson_2eParseError_2eDepthLimitExceeded, "_M0DTPC15error5Error59moonbitlang_2fcore_2fjson_2eParseError_2eDepthLimitExceeded");
_M0DTPC15error5Error59moonbitlang_2fcore_2fjson_2eParseError_2eDepthLimitExceeded.prototype.$tag = 4;
var _M0DTPC15error5Error59moonbitlang_2fcore_2fjson_2eParseError_2eDepthLimitExceeded__ = new _M0DTPC15error5Error59moonbitlang_2fcore_2fjson_2eParseError_2eDepthLimitExceeded();
function _M0DTPC15error5Error58moonbitlang_2fcore_2fstrconv_2eStrConvError_2eStrConvError(param0) {
  this._0 = param0;
}
__name(_M0DTPC15error5Error58moonbitlang_2fcore_2fstrconv_2eStrConvError_2eStrConvError, "_M0DTPC15error5Error58moonbitlang_2fcore_2fstrconv_2eStrConvError_2eStrConvError");
_M0DTPC15error5Error58moonbitlang_2fcore_2fstrconv_2eStrConvError_2eStrConvError.prototype.$tag = 3;
function _M0DTPC15error5Error61moonbitlang_2fcore_2fjson_2eJsonDecodeError_2eJsonDecodeError(param0) {
  this._0 = param0;
}
__name(_M0DTPC15error5Error61moonbitlang_2fcore_2fjson_2eJsonDecodeError_2eJsonDecodeError, "_M0DTPC15error5Error61moonbitlang_2fcore_2fjson_2eJsonDecodeError_2eJsonDecodeError");
_M0DTPC15error5Error61moonbitlang_2fcore_2fjson_2eJsonDecodeError_2eJsonDecodeError.prototype.$tag = 2;
function _M0DTPC15error5Error45dowdiness_2floom_2fcore_2eLexError_2eLexError(param0) {
  this._0 = param0;
}
__name(_M0DTPC15error5Error45dowdiness_2floom_2fcore_2eLexError_2eLexError, "_M0DTPC15error5Error45dowdiness_2floom_2fcore_2eLexError_2eLexError");
_M0DTPC15error5Error45dowdiness_2floom_2fcore_2eLexError_2eLexError.prototype.$tag = 1;
function _M0DTPC15error5Error53dowdiness_2fincr_2fcells_2eCycleError_2eCycleDetected(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
__name(_M0DTPC15error5Error53dowdiness_2fincr_2fcells_2eCycleError_2eCycleDetected, "_M0DTPC15error5Error53dowdiness_2fincr_2fcells_2eCycleError_2eCycleDetected");
_M0DTPC15error5Error53dowdiness_2fincr_2fcells_2eCycleError_2eCycleDetected.prototype.$tag = 0;
function _M0DTPC16result6ResultGmRPC17strconv12StrConvErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGmRPC17strconv12StrConvErrorE3Err, "_M0DTPC16result6ResultGmRPC17strconv12StrConvErrorE3Err");
_M0DTPC16result6ResultGmRPC17strconv12StrConvErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGmRPC17strconv12StrConvErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGmRPC17strconv12StrConvErrorE2Ok, "_M0DTPC16result6ResultGmRPC17strconv12StrConvErrorE2Ok");
_M0DTPC16result6ResultGmRPC17strconv12StrConvErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGuRPC17strconv12StrConvErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGuRPC17strconv12StrConvErrorE3Err, "_M0DTPC16result6ResultGuRPC17strconv12StrConvErrorE3Err");
_M0DTPC16result6ResultGuRPC17strconv12StrConvErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGuRPC17strconv12StrConvErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGuRPC17strconv12StrConvErrorE2Ok, "_M0DTPC16result6ResultGuRPC17strconv12StrConvErrorE2Ok");
_M0DTPC16result6ResultGuRPC17strconv12StrConvErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGiRPC17strconv12StrConvErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGiRPC17strconv12StrConvErrorE3Err, "_M0DTPC16result6ResultGiRPC17strconv12StrConvErrorE3Err");
_M0DTPC16result6ResultGiRPC17strconv12StrConvErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGiRPC17strconv12StrConvErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGiRPC17strconv12StrConvErrorE2Ok, "_M0DTPC16result6ResultGiRPC17strconv12StrConvErrorE2Ok");
_M0DTPC16result6ResultGiRPC17strconv12StrConvErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGdRPC17strconv12StrConvErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGdRPC17strconv12StrConvErrorE3Err, "_M0DTPC16result6ResultGdRPC17strconv12StrConvErrorE3Err");
_M0DTPC16result6ResultGdRPC17strconv12StrConvErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGdRPC17strconv12StrConvErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGdRPC17strconv12StrConvErrorE2Ok, "_M0DTPC16result6ResultGdRPC17strconv12StrConvErrorE2Ok");
_M0DTPC16result6ResultGdRPC17strconv12StrConvErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGORPC17strconv6NumberRPC17strconv12StrConvErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGORPC17strconv6NumberRPC17strconv12StrConvErrorE3Err, "_M0DTPC16result6ResultGORPC17strconv6NumberRPC17strconv12StrConvErrorE3Err");
_M0DTPC16result6ResultGORPC17strconv6NumberRPC17strconv12StrConvErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGORPC17strconv6NumberRPC17strconv12StrConvErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGORPC17strconv6NumberRPC17strconv12StrConvErrorE2Ok, "_M0DTPC16result6ResultGORPC17strconv6NumberRPC17strconv12StrConvErrorE2Ok");
_M0DTPC16result6ResultGORPC17strconv6NumberRPC17strconv12StrConvErrorE2Ok.prototype.$tag = 1;
var $16L = { hi: 0, lo: 16 };
function _M0DTPC16result6ResultGlRPC17strconv12StrConvErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGlRPC17strconv12StrConvErrorE3Err, "_M0DTPC16result6ResultGlRPC17strconv12StrConvErrorE3Err");
_M0DTPC16result6ResultGlRPC17strconv12StrConvErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGlRPC17strconv12StrConvErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGlRPC17strconv12StrConvErrorE2Ok, "_M0DTPC16result6ResultGlRPC17strconv12StrConvErrorE2Ok");
_M0DTPC16result6ResultGlRPC17strconv12StrConvErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGRPC17strconv7DecimalRPC17strconv12StrConvErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGRPC17strconv7DecimalRPC17strconv12StrConvErrorE3Err, "_M0DTPC16result6ResultGRPC17strconv7DecimalRPC17strconv12StrConvErrorE3Err");
_M0DTPC16result6ResultGRPC17strconv7DecimalRPC17strconv12StrConvErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRPC17strconv7DecimalRPC17strconv12StrConvErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGRPC17strconv7DecimalRPC17strconv12StrConvErrorE2Ok, "_M0DTPC16result6ResultGRPC17strconv7DecimalRPC17strconv12StrConvErrorE2Ok");
_M0DTPC16result6ResultGRPC17strconv7DecimalRPC17strconv12StrConvErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16option6OptionGdE4None() {
}
__name(_M0DTPC16option6OptionGdE4None, "_M0DTPC16option6OptionGdE4None");
_M0DTPC16option6OptionGdE4None.prototype.$tag = 0;
var _M0DTPC16option6OptionGdE4None__ = new _M0DTPC16option6OptionGdE4None();
function _M0DTPC16option6OptionGdE4Some(param0) {
  this._0 = param0;
}
__name(_M0DTPC16option6OptionGdE4Some, "_M0DTPC16option6OptionGdE4Some");
_M0DTPC16option6OptionGdE4Some.prototype.$tag = 1;
function _M0DTPC16result6ResultGRPB4JsonRPC14json10ParseErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGRPB4JsonRPC14json10ParseErrorE3Err, "_M0DTPC16result6ResultGRPB4JsonRPC14json10ParseErrorE3Err");
_M0DTPC16result6ResultGRPB4JsonRPC14json10ParseErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRPB4JsonRPC14json10ParseErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGRPB4JsonRPC14json10ParseErrorE2Ok, "_M0DTPC16result6ResultGRPB4JsonRPC14json10ParseErrorE2Ok");
_M0DTPC16result6ResultGRPB4JsonRPC14json10ParseErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGuRPC14json10ParseErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGuRPC14json10ParseErrorE3Err, "_M0DTPC16result6ResultGuRPC14json10ParseErrorE3Err");
_M0DTPC16result6ResultGuRPC14json10ParseErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGuRPC14json10ParseErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGuRPC14json10ParseErrorE2Ok, "_M0DTPC16result6ResultGuRPC14json10ParseErrorE2Ok");
_M0DTPC16result6ResultGuRPC14json10ParseErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionERPC14json15JsonDecodeErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionERPC14json15JsonDecodeErrorE3Err, "_M0DTPC16result6ResultGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionERPC14json15JsonDecodeErrorE3Err");
_M0DTPC16result6ResultGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionERPC14json15JsonDecodeErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionERPC14json15JsonDecodeErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionERPC14json15JsonDecodeErrorE2Ok, "_M0DTPC16result6ResultGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionERPC14json15JsonDecodeErrorE2Ok");
_M0DTPC16result6ResultGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionERPC14json15JsonDecodeErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGiRPC14json15JsonDecodeErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGiRPC14json15JsonDecodeErrorE3Err, "_M0DTPC16result6ResultGiRPC14json15JsonDecodeErrorE3Err");
_M0DTPC16result6ResultGiRPC14json15JsonDecodeErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGiRPC14json15JsonDecodeErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGiRPC14json15JsonDecodeErrorE2Ok, "_M0DTPC16result6ResultGiRPC14json15JsonDecodeErrorE2Ok");
_M0DTPC16result6ResultGiRPC14json15JsonDecodeErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGuRPC14json15JsonDecodeErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGuRPC14json15JsonDecodeErrorE3Err, "_M0DTPC16result6ResultGuRPC14json15JsonDecodeErrorE3Err");
_M0DTPC16result6ResultGuRPC14json15JsonDecodeErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGuRPC14json15JsonDecodeErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGuRPC14json15JsonDecodeErrorE2Ok, "_M0DTPC16result6ResultGuRPC14json15JsonDecodeErrorE2Ok");
_M0DTPC16result6ResultGuRPC14json15JsonDecodeErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGsRPC14json15JsonDecodeErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGsRPC14json15JsonDecodeErrorE3Err, "_M0DTPC16result6ResultGsRPC14json15JsonDecodeErrorE3Err");
_M0DTPC16result6ResultGsRPC14json15JsonDecodeErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGsRPC14json15JsonDecodeErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGsRPC14json15JsonDecodeErrorE2Ok, "_M0DTPC16result6ResultGsRPC14json15JsonDecodeErrorE2Ok");
_M0DTPC16result6ResultGsRPC14json15JsonDecodeErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGUdORPC16string10StringViewERPC14json10ParseErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGUdORPC16string10StringViewERPC14json10ParseErrorE3Err, "_M0DTPC16result6ResultGUdORPC16string10StringViewERPC14json10ParseErrorE3Err");
_M0DTPC16result6ResultGUdORPC16string10StringViewERPC14json10ParseErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGUdORPC16string10StringViewERPC14json10ParseErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGUdORPC16string10StringViewERPC14json10ParseErrorE2Ok, "_M0DTPC16result6ResultGUdORPC16string10StringViewERPC14json10ParseErrorE2Ok");
_M0DTPC16result6ResultGUdORPC16string10StringViewERPC14json10ParseErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGiRPC14json10ParseErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGiRPC14json10ParseErrorE3Err, "_M0DTPC16result6ResultGiRPC14json10ParseErrorE3Err");
_M0DTPC16result6ResultGiRPC14json10ParseErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGiRPC14json10ParseErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGiRPC14json10ParseErrorE2Ok, "_M0DTPC16result6ResultGiRPC14json10ParseErrorE2Ok");
_M0DTPC16result6ResultGiRPC14json10ParseErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGsRPC14json10ParseErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGsRPC14json10ParseErrorE3Err, "_M0DTPC16result6ResultGsRPC14json10ParseErrorE3Err");
_M0DTPC16result6ResultGsRPC14json10ParseErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGsRPC14json10ParseErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGsRPC14json10ParseErrorE2Ok, "_M0DTPC16result6ResultGsRPC14json10ParseErrorE2Ok");
_M0DTPC16result6ResultGsRPC14json10ParseErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGRPC14json5TokenRPC14json10ParseErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGRPC14json5TokenRPC14json10ParseErrorE3Err, "_M0DTPC16result6ResultGRPC14json5TokenRPC14json10ParseErrorE3Err");
_M0DTPC16result6ResultGRPC14json5TokenRPC14json10ParseErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRPC14json5TokenRPC14json10ParseErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGRPC14json5TokenRPC14json10ParseErrorE2Ok, "_M0DTPC16result6ResultGRPC14json5TokenRPC14json10ParseErrorE2Ok");
_M0DTPC16result6ResultGRPC14json5TokenRPC14json10ParseErrorE2Ok.prototype.$tag = 1;
function _M0DTPC14json5Token4Null() {
}
__name(_M0DTPC14json5Token4Null, "_M0DTPC14json5Token4Null");
_M0DTPC14json5Token4Null.prototype.$tag = 0;
var _M0DTPC14json5Token4Null__ = new _M0DTPC14json5Token4Null();
function _M0DTPC14json5Token4True() {
}
__name(_M0DTPC14json5Token4True, "_M0DTPC14json5Token4True");
_M0DTPC14json5Token4True.prototype.$tag = 1;
var _M0DTPC14json5Token4True__ = new _M0DTPC14json5Token4True();
function _M0DTPC14json5Token5False() {
}
__name(_M0DTPC14json5Token5False, "_M0DTPC14json5Token5False");
_M0DTPC14json5Token5False.prototype.$tag = 2;
var _M0DTPC14json5Token5False__ = new _M0DTPC14json5Token5False();
function _M0DTPC14json5Token6Number(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
__name(_M0DTPC14json5Token6Number, "_M0DTPC14json5Token6Number");
_M0DTPC14json5Token6Number.prototype.$tag = 3;
function _M0DTPC14json5Token6String(param0) {
  this._0 = param0;
}
__name(_M0DTPC14json5Token6String, "_M0DTPC14json5Token6String");
_M0DTPC14json5Token6String.prototype.$tag = 4;
function _M0DTPC14json5Token6LBrace() {
}
__name(_M0DTPC14json5Token6LBrace, "_M0DTPC14json5Token6LBrace");
_M0DTPC14json5Token6LBrace.prototype.$tag = 5;
var _M0DTPC14json5Token6LBrace__ = new _M0DTPC14json5Token6LBrace();
function _M0DTPC14json5Token6RBrace() {
}
__name(_M0DTPC14json5Token6RBrace, "_M0DTPC14json5Token6RBrace");
_M0DTPC14json5Token6RBrace.prototype.$tag = 6;
var _M0DTPC14json5Token6RBrace__ = new _M0DTPC14json5Token6RBrace();
function _M0DTPC14json5Token8LBracket() {
}
__name(_M0DTPC14json5Token8LBracket, "_M0DTPC14json5Token8LBracket");
_M0DTPC14json5Token8LBracket.prototype.$tag = 7;
var _M0DTPC14json5Token8LBracket__ = new _M0DTPC14json5Token8LBracket();
function _M0DTPC14json5Token8RBracket() {
}
__name(_M0DTPC14json5Token8RBracket, "_M0DTPC14json5Token8RBracket");
_M0DTPC14json5Token8RBracket.prototype.$tag = 8;
var _M0DTPC14json5Token8RBracket__ = new _M0DTPC14json5Token8RBracket();
function _M0DTPC14json5Token5Comma() {
}
__name(_M0DTPC14json5Token5Comma, "_M0DTPC14json5Token5Comma");
_M0DTPC14json5Token5Comma.prototype.$tag = 9;
var _M0DTPC14json5Token5Comma__ = new _M0DTPC14json5Token5Comma();
function _M0DTPC14json10WriteFrame5Array(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
__name(_M0DTPC14json10WriteFrame5Array, "_M0DTPC14json10WriteFrame5Array");
_M0DTPC14json10WriteFrame5Array.prototype.$tag = 0;
function _M0DTPC14json10WriteFrame6Object(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
__name(_M0DTPC14json10WriteFrame6Object, "_M0DTPC14json10WriteFrame6Object");
_M0DTPC14json10WriteFrame6Object.prototype.$tag = 1;
function _M0DTPC14json8JsonPath4Root() {
}
__name(_M0DTPC14json8JsonPath4Root, "_M0DTPC14json8JsonPath4Root");
_M0DTPC14json8JsonPath4Root.prototype.$tag = 0;
var _M0DTPC14json8JsonPath4Root__ = new _M0DTPC14json8JsonPath4Root();
function _M0DTPC14json8JsonPath3Key(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
__name(_M0DTPC14json8JsonPath3Key, "_M0DTPC14json8JsonPath3Key");
_M0DTPC14json8JsonPath3Key.prototype.$tag = 1;
function _M0DTPC14json8JsonPath5Index(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
__name(_M0DTPC14json8JsonPath5Index, "_M0DTPC14json8JsonPath5Index");
_M0DTPC14json8JsonPath5Index.prototype.$tag = 2;
function _M0DTPC16result6ResultGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal4core5OpRunERPC14json15JsonDecodeErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal4core5OpRunERPC14json15JsonDecodeErrorE3Err, "_M0DTPC16result6ResultGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal4core5OpRunERPC14json15JsonDecodeErrorE3Err");
_M0DTPC16result6ResultGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal4core5OpRunERPC14json15JsonDecodeErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal4core5OpRunERPC14json15JsonDecodeErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal4core5OpRunERPC14json15JsonDecodeErrorE2Ok, "_M0DTPC16result6ResultGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal4core5OpRunERPC14json15JsonDecodeErrorE2Ok");
_M0DTPC16result6ResultGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal4core5OpRunERPC14json15JsonDecodeErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal4core2OpERPC14json15JsonDecodeErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal4core2OpERPC14json15JsonDecodeErrorE3Err, "_M0DTPC16result6ResultGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal4core2OpERPC14json15JsonDecodeErrorE3Err");
_M0DTPC16result6ResultGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal4core2OpERPC14json15JsonDecodeErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal4core2OpERPC14json15JsonDecodeErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal4core2OpERPC14json15JsonDecodeErrorE2Ok, "_M0DTPC16result6ResultGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal4core2OpERPC14json15JsonDecodeErrorE2Ok");
_M0DTPC16result6ResultGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal4core2OpERPC14json15JsonDecodeErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGRPB5ArrayGiERPC14json15JsonDecodeErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGRPB5ArrayGiERPC14json15JsonDecodeErrorE3Err, "_M0DTPC16result6ResultGRPB5ArrayGiERPC14json15JsonDecodeErrorE3Err");
_M0DTPC16result6ResultGRPB5ArrayGiERPC14json15JsonDecodeErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRPB5ArrayGiERPC14json15JsonDecodeErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGRPB5ArrayGiERPC14json15JsonDecodeErrorE2Ok, "_M0DTPC16result6ResultGRPB5ArrayGiERPC14json15JsonDecodeErrorE2Ok");
_M0DTPC16result6ResultGRPB5ArrayGiERPC14json15JsonDecodeErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGORP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionRPC14json15JsonDecodeErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGORP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionRPC14json15JsonDecodeErrorE3Err, "_M0DTPC16result6ResultGORP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionRPC14json15JsonDecodeErrorE3Err");
_M0DTPC16result6ResultGORP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionRPC14json15JsonDecodeErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGORP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionRPC14json15JsonDecodeErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGORP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionRPC14json15JsonDecodeErrorE2Ok, "_M0DTPC16result6ResultGORP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionRPC14json15JsonDecodeErrorE2Ok");
_M0DTPC16result6ResultGORP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionRPC14json15JsonDecodeErrorE2Ok.prototype.$tag = 1;
function _M0TPC17hashmap7HashMapGRP29dowdiness4seam7RawKindRPC17hashmap7HashMapGsRP29dowdiness4seam8CstTokenEE(param0, param1, param2, param3) {
  this.entries = param0;
  this.capacity = param1;
  this.capacity_mask = param2;
  this.size = param3;
}
__name(_M0TPC17hashmap7HashMapGRP29dowdiness4seam7RawKindRPC17hashmap7HashMapGsRP29dowdiness4seam8CstTokenEE, "_M0TPC17hashmap7HashMapGRP29dowdiness4seam7RawKindRPC17hashmap7HashMapGsRP29dowdiness4seam8CstTokenEE");
function _M0DTPC14list4ListGiE5Empty() {
}
__name(_M0DTPC14list4ListGiE5Empty, "_M0DTPC14list4ListGiE5Empty");
_M0DTPC14list4ListGiE5Empty.prototype.$tag = 0;
var _M0DTPC14list4ListGiE5Empty__ = new _M0DTPC14list4ListGiE5Empty();
function _M0DTPC14list4ListGiE4More(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
__name(_M0DTPC14list4ListGiE4More, "_M0DTPC14list4ListGiE4More");
_M0DTPC14list4ListGiE4More.prototype.$tag = 1;
function _M0DTPC16option6OptionGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvEE4None() {
}
__name(_M0DTPC16option6OptionGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvEE4None, "_M0DTPC16option6OptionGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvEE4None");
_M0DTPC16option6OptionGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvEE4None.prototype.$tag = 0;
var _M0DTPC16option6OptionGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvEE4None__ = new _M0DTPC16option6OptionGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvEE4None();
function _M0DTPC16option6OptionGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvEE4Some(param0) {
  this._0 = param0;
}
__name(_M0DTPC16option6OptionGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvEE4Some, "_M0DTPC16option6OptionGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvEE4Some");
_M0DTPC16option6OptionGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvEE4Some.prototype.$tag = 1;
function _M0DTPC14list4ListGURP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvRP49dowdiness22event_2dgraph_2dwalker8internal5fugue4ItemGsEEE5Empty() {
}
__name(_M0DTPC14list4ListGURP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvRP49dowdiness22event_2dgraph_2dwalker8internal5fugue4ItemGsEEE5Empty, "_M0DTPC14list4ListGURP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvRP49dowdiness22event_2dgraph_2dwalker8internal5fugue4ItemGsEEE5Empty");
_M0DTPC14list4ListGURP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvRP49dowdiness22event_2dgraph_2dwalker8internal5fugue4ItemGsEEE5Empty.prototype.$tag = 0;
var _M0DTPC14list4ListGURP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvRP49dowdiness22event_2dgraph_2dwalker8internal5fugue4ItemGsEEE5Empty__ = new _M0DTPC14list4ListGURP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvRP49dowdiness22event_2dgraph_2dwalker8internal5fugue4ItemGsEEE5Empty();
function _M0DTPC14list4ListGURP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvRP49dowdiness22event_2dgraph_2dwalker8internal5fugue4ItemGsEEE4More(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
__name(_M0DTPC14list4ListGURP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvRP49dowdiness22event_2dgraph_2dwalker8internal5fugue4ItemGsEEE4More, "_M0DTPC14list4ListGURP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvRP49dowdiness22event_2dgraph_2dwalker8internal5fugue4ItemGsEEE4More");
_M0DTPC14list4ListGURP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvRP49dowdiness22event_2dgraph_2dwalker8internal5fugue4ItemGsEEE4More.prototype.$tag = 1;
function _M0DTPC25immut7hashmap4NodeGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvRP49dowdiness22event_2dgraph_2dwalker8internal5fugue4ItemGsEE4Flat(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
__name(_M0DTPC25immut7hashmap4NodeGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvRP49dowdiness22event_2dgraph_2dwalker8internal5fugue4ItemGsEE4Flat, "_M0DTPC25immut7hashmap4NodeGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvRP49dowdiness22event_2dgraph_2dwalker8internal5fugue4ItemGsEE4Flat");
_M0DTPC25immut7hashmap4NodeGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvRP49dowdiness22event_2dgraph_2dwalker8internal5fugue4ItemGsEE4Flat.prototype.$tag = 0;
function _M0DTPC25immut7hashmap4NodeGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvRP49dowdiness22event_2dgraph_2dwalker8internal5fugue4ItemGsEE4Leaf(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
__name(_M0DTPC25immut7hashmap4NodeGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvRP49dowdiness22event_2dgraph_2dwalker8internal5fugue4ItemGsEE4Leaf, "_M0DTPC25immut7hashmap4NodeGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvRP49dowdiness22event_2dgraph_2dwalker8internal5fugue4ItemGsEE4Leaf");
_M0DTPC25immut7hashmap4NodeGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvRP49dowdiness22event_2dgraph_2dwalker8internal5fugue4ItemGsEE4Leaf.prototype.$tag = 1;
function _M0DTPC25immut7hashmap4NodeGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvRP49dowdiness22event_2dgraph_2dwalker8internal5fugue4ItemGsEE6Branch(param0) {
  this._0 = param0;
}
__name(_M0DTPC25immut7hashmap4NodeGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvRP49dowdiness22event_2dgraph_2dwalker8internal5fugue4ItemGsEE6Branch, "_M0DTPC25immut7hashmap4NodeGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvRP49dowdiness22event_2dgraph_2dwalker8internal5fugue4ItemGsEE6Branch");
_M0DTPC25immut7hashmap4NodeGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvRP49dowdiness22event_2dgraph_2dwalker8internal5fugue4ItemGsEE6Branch.prototype.$tag = 2;
function _M0DTPC25immut7hashmap4NodeGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvEE4Flat(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
__name(_M0DTPC25immut7hashmap4NodeGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvEE4Flat, "_M0DTPC25immut7hashmap4NodeGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvEE4Flat");
_M0DTPC25immut7hashmap4NodeGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvEE4Flat.prototype.$tag = 0;
function _M0DTPC25immut7hashmap4NodeGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvEE4Leaf(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
__name(_M0DTPC25immut7hashmap4NodeGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvEE4Leaf, "_M0DTPC25immut7hashmap4NodeGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvEE4Leaf");
_M0DTPC25immut7hashmap4NodeGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvEE4Leaf.prototype.$tag = 1;
function _M0DTPC25immut7hashmap4NodeGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvEE6Branch(param0) {
  this._0 = param0;
}
__name(_M0DTPC25immut7hashmap4NodeGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvEE6Branch, "_M0DTPC25immut7hashmap4NodeGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvEE6Branch");
_M0DTPC25immut7hashmap4NodeGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvEE6Branch.prototype.$tag = 2;
function _M0DTPC14list4ListGURP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvEEE5Empty() {
}
__name(_M0DTPC14list4ListGURP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvEEE5Empty, "_M0DTPC14list4ListGURP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvEEE5Empty");
_M0DTPC14list4ListGURP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvEEE5Empty.prototype.$tag = 0;
var _M0DTPC14list4ListGURP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvEEE5Empty__ = new _M0DTPC14list4ListGURP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvEEE5Empty();
function _M0DTPC14list4ListGURP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvEEE4More(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
__name(_M0DTPC14list4ListGURP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvEEE4More, "_M0DTPC14list4ListGURP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvEEE4More");
_M0DTPC14list4ListGURP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LvEEE4More.prototype.$tag = 1;
function _M0DTPC25immut7hashmap4NodeGiRP49dowdiness22event_2dgraph_2dwalker8internal4core10GraphEntryE4Flat(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
__name(_M0DTPC25immut7hashmap4NodeGiRP49dowdiness22event_2dgraph_2dwalker8internal4core10GraphEntryE4Flat, "_M0DTPC25immut7hashmap4NodeGiRP49dowdiness22event_2dgraph_2dwalker8internal4core10GraphEntryE4Flat");
_M0DTPC25immut7hashmap4NodeGiRP49dowdiness22event_2dgraph_2dwalker8internal4core10GraphEntryE4Flat.prototype.$tag = 0;
function _M0DTPC25immut7hashmap4NodeGiRP49dowdiness22event_2dgraph_2dwalker8internal4core10GraphEntryE4Leaf(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
__name(_M0DTPC25immut7hashmap4NodeGiRP49dowdiness22event_2dgraph_2dwalker8internal4core10GraphEntryE4Leaf, "_M0DTPC25immut7hashmap4NodeGiRP49dowdiness22event_2dgraph_2dwalker8internal4core10GraphEntryE4Leaf");
_M0DTPC25immut7hashmap4NodeGiRP49dowdiness22event_2dgraph_2dwalker8internal4core10GraphEntryE4Leaf.prototype.$tag = 1;
function _M0DTPC25immut7hashmap4NodeGiRP49dowdiness22event_2dgraph_2dwalker8internal4core10GraphEntryE6Branch(param0) {
  this._0 = param0;
}
__name(_M0DTPC25immut7hashmap4NodeGiRP49dowdiness22event_2dgraph_2dwalker8internal4core10GraphEntryE6Branch, "_M0DTPC25immut7hashmap4NodeGiRP49dowdiness22event_2dgraph_2dwalker8internal4core10GraphEntryE6Branch");
_M0DTPC25immut7hashmap4NodeGiRP49dowdiness22event_2dgraph_2dwalker8internal4core10GraphEntryE6Branch.prototype.$tag = 2;
function _M0DTPC14list4ListGUiRP49dowdiness22event_2dgraph_2dwalker8internal4core10GraphEntryEE5Empty() {
}
__name(_M0DTPC14list4ListGUiRP49dowdiness22event_2dgraph_2dwalker8internal4core10GraphEntryEE5Empty, "_M0DTPC14list4ListGUiRP49dowdiness22event_2dgraph_2dwalker8internal4core10GraphEntryEE5Empty");
_M0DTPC14list4ListGUiRP49dowdiness22event_2dgraph_2dwalker8internal4core10GraphEntryEE5Empty.prototype.$tag = 0;
var _M0DTPC14list4ListGUiRP49dowdiness22event_2dgraph_2dwalker8internal4core10GraphEntryEE5Empty__ = new _M0DTPC14list4ListGUiRP49dowdiness22event_2dgraph_2dwalker8internal4core10GraphEntryEE5Empty();
function _M0DTPC14list4ListGUiRP49dowdiness22event_2dgraph_2dwalker8internal4core10GraphEntryEE4More(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
__name(_M0DTPC14list4ListGUiRP49dowdiness22event_2dgraph_2dwalker8internal4core10GraphEntryEE4More, "_M0DTPC14list4ListGUiRP49dowdiness22event_2dgraph_2dwalker8internal4core10GraphEntryEE4More");
_M0DTPC14list4ListGUiRP49dowdiness22event_2dgraph_2dwalker8internal4core10GraphEntryEE4More.prototype.$tag = 1;
function _M0DTPC25immut7hashmap4NodeGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersioniE4Flat(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
__name(_M0DTPC25immut7hashmap4NodeGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersioniE4Flat, "_M0DTPC25immut7hashmap4NodeGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersioniE4Flat");
_M0DTPC25immut7hashmap4NodeGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersioniE4Flat.prototype.$tag = 0;
function _M0DTPC25immut7hashmap4NodeGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersioniE4Leaf(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
__name(_M0DTPC25immut7hashmap4NodeGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersioniE4Leaf, "_M0DTPC25immut7hashmap4NodeGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersioniE4Leaf");
_M0DTPC25immut7hashmap4NodeGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersioniE4Leaf.prototype.$tag = 1;
function _M0DTPC25immut7hashmap4NodeGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersioniE6Branch(param0) {
  this._0 = param0;
}
__name(_M0DTPC25immut7hashmap4NodeGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersioniE6Branch, "_M0DTPC25immut7hashmap4NodeGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersioniE6Branch");
_M0DTPC25immut7hashmap4NodeGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersioniE6Branch.prototype.$tag = 2;
function _M0DTPC14list4ListGURP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersioniEE5Empty() {
}
__name(_M0DTPC14list4ListGURP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersioniEE5Empty, "_M0DTPC14list4ListGURP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersioniEE5Empty");
_M0DTPC14list4ListGURP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersioniEE5Empty.prototype.$tag = 0;
var _M0DTPC14list4ListGURP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersioniEE5Empty__ = new _M0DTPC14list4ListGURP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersioniEE5Empty();
function _M0DTPC14list4ListGURP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersioniEE4More(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
__name(_M0DTPC14list4ListGURP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersioniEE4More, "_M0DTPC14list4ListGURP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersioniEE4More");
_M0DTPC14list4ListGURP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersioniEE4More.prototype.$tag = 1;
function _M0DTPC25immut7hashmap4NodeGsiE4Flat(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
__name(_M0DTPC25immut7hashmap4NodeGsiE4Flat, "_M0DTPC25immut7hashmap4NodeGsiE4Flat");
_M0DTPC25immut7hashmap4NodeGsiE4Flat.prototype.$tag = 0;
function _M0DTPC25immut7hashmap4NodeGsiE4Leaf(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
__name(_M0DTPC25immut7hashmap4NodeGsiE4Leaf, "_M0DTPC25immut7hashmap4NodeGsiE4Leaf");
_M0DTPC25immut7hashmap4NodeGsiE4Leaf.prototype.$tag = 1;
function _M0DTPC25immut7hashmap4NodeGsiE6Branch(param0) {
  this._0 = param0;
}
__name(_M0DTPC25immut7hashmap4NodeGsiE6Branch, "_M0DTPC25immut7hashmap4NodeGsiE6Branch");
_M0DTPC25immut7hashmap4NodeGsiE6Branch.prototype.$tag = 2;
function _M0DTPC14list4ListGUsiEE5Empty() {
}
__name(_M0DTPC14list4ListGUsiEE5Empty, "_M0DTPC14list4ListGUsiEE5Empty");
_M0DTPC14list4ListGUsiEE5Empty.prototype.$tag = 0;
var _M0DTPC14list4ListGUsiEE5Empty__ = new _M0DTPC14list4ListGUsiEE5Empty();
function _M0DTPC14list4ListGUsiEE4More(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
__name(_M0DTPC14list4ListGUsiEE4More, "_M0DTPC14list4ListGUsiEE4More");
_M0DTPC14list4ListGUsiEE4More.prototype.$tag = 1;
function _M0DTPC25immut7hashmap4NodeGiRPB5ArrayGiEE4Flat(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
__name(_M0DTPC25immut7hashmap4NodeGiRPB5ArrayGiEE4Flat, "_M0DTPC25immut7hashmap4NodeGiRPB5ArrayGiEE4Flat");
_M0DTPC25immut7hashmap4NodeGiRPB5ArrayGiEE4Flat.prototype.$tag = 0;
function _M0DTPC25immut7hashmap4NodeGiRPB5ArrayGiEE4Leaf(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
__name(_M0DTPC25immut7hashmap4NodeGiRPB5ArrayGiEE4Leaf, "_M0DTPC25immut7hashmap4NodeGiRPB5ArrayGiEE4Leaf");
_M0DTPC25immut7hashmap4NodeGiRPB5ArrayGiEE4Leaf.prototype.$tag = 1;
function _M0DTPC25immut7hashmap4NodeGiRPB5ArrayGiEE6Branch(param0) {
  this._0 = param0;
}
__name(_M0DTPC25immut7hashmap4NodeGiRPB5ArrayGiEE6Branch, "_M0DTPC25immut7hashmap4NodeGiRPB5ArrayGiEE6Branch");
_M0DTPC25immut7hashmap4NodeGiRPB5ArrayGiEE6Branch.prototype.$tag = 2;
function _M0DTPC14list4ListGUiRPB5ArrayGiEEE5Empty() {
}
__name(_M0DTPC14list4ListGUiRPB5ArrayGiEEE5Empty, "_M0DTPC14list4ListGUiRPB5ArrayGiEEE5Empty");
_M0DTPC14list4ListGUiRPB5ArrayGiEEE5Empty.prototype.$tag = 0;
var _M0DTPC14list4ListGUiRPB5ArrayGiEEE5Empty__ = new _M0DTPC14list4ListGUiRPB5ArrayGiEEE5Empty();
function _M0DTPC14list4ListGUiRPB5ArrayGiEEE4More(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
__name(_M0DTPC14list4ListGUiRPB5ArrayGiEEE4More, "_M0DTPC14list4ListGUiRPB5ArrayGiEEE4More");
_M0DTPC14list4ListGUiRPB5ArrayGiEEE4More.prototype.$tag = 1;
function _M0DTPC25immut7hashmap4NodeGiiE4Flat(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
__name(_M0DTPC25immut7hashmap4NodeGiiE4Flat, "_M0DTPC25immut7hashmap4NodeGiiE4Flat");
_M0DTPC25immut7hashmap4NodeGiiE4Flat.prototype.$tag = 0;
function _M0DTPC25immut7hashmap4NodeGiiE4Leaf(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
__name(_M0DTPC25immut7hashmap4NodeGiiE4Leaf, "_M0DTPC25immut7hashmap4NodeGiiE4Leaf");
_M0DTPC25immut7hashmap4NodeGiiE4Leaf.prototype.$tag = 1;
function _M0DTPC25immut7hashmap4NodeGiiE6Branch(param0) {
  this._0 = param0;
}
__name(_M0DTPC25immut7hashmap4NodeGiiE6Branch, "_M0DTPC25immut7hashmap4NodeGiiE6Branch");
_M0DTPC25immut7hashmap4NodeGiiE6Branch.prototype.$tag = 2;
function _M0DTPC14list4ListGUiiEE5Empty() {
}
__name(_M0DTPC14list4ListGUiiEE5Empty, "_M0DTPC14list4ListGUiiEE5Empty");
_M0DTPC14list4ListGUiiEE5Empty.prototype.$tag = 0;
var _M0DTPC14list4ListGUiiEE5Empty__ = new _M0DTPC14list4ListGUiiEE5Empty();
function _M0DTPC14list4ListGUiiEE4More(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
__name(_M0DTPC14list4ListGUiiEE4More, "_M0DTPC14list4ListGUiiEE4More");
_M0DTPC14list4ListGUiiEE4More.prototype.$tag = 1;
function _M0DTPC25immut7hashmap4NodeGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LviE4Flat(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
__name(_M0DTPC25immut7hashmap4NodeGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LviE4Flat, "_M0DTPC25immut7hashmap4NodeGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LviE4Flat");
_M0DTPC25immut7hashmap4NodeGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LviE4Flat.prototype.$tag = 0;
function _M0DTPC25immut7hashmap4NodeGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LviE4Leaf(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
__name(_M0DTPC25immut7hashmap4NodeGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LviE4Leaf, "_M0DTPC25immut7hashmap4NodeGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LviE4Leaf");
_M0DTPC25immut7hashmap4NodeGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LviE4Leaf.prototype.$tag = 1;
function _M0DTPC25immut7hashmap4NodeGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LviE6Branch(param0) {
  this._0 = param0;
}
__name(_M0DTPC25immut7hashmap4NodeGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LviE6Branch, "_M0DTPC25immut7hashmap4NodeGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LviE6Branch");
_M0DTPC25immut7hashmap4NodeGRP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LviE6Branch.prototype.$tag = 2;
function _M0DTPC14list4ListGURP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LviEE5Empty() {
}
__name(_M0DTPC14list4ListGURP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LviEE5Empty, "_M0DTPC14list4ListGURP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LviEE5Empty");
_M0DTPC14list4ListGURP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LviEE5Empty.prototype.$tag = 0;
var _M0DTPC14list4ListGURP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LviEE5Empty__ = new _M0DTPC14list4ListGURP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LviEE5Empty();
function _M0DTPC14list4ListGURP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LviEE4More(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
__name(_M0DTPC14list4ListGURP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LviEE4More, "_M0DTPC14list4ListGURP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LviEE4More");
_M0DTPC14list4ListGURP49dowdiness22event_2dgraph_2dwalker8internal5fugue2LviEE4More.prototype.$tag = 1;
function _M0DTPC25immut7hashset4NodeGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionE4Flat(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
__name(_M0DTPC25immut7hashset4NodeGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionE4Flat, "_M0DTPC25immut7hashset4NodeGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionE4Flat");
_M0DTPC25immut7hashset4NodeGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionE4Flat.prototype.$tag = 0;
function _M0DTPC25immut7hashset4NodeGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionE4Leaf(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
__name(_M0DTPC25immut7hashset4NodeGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionE4Leaf, "_M0DTPC25immut7hashset4NodeGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionE4Leaf");
_M0DTPC25immut7hashset4NodeGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionE4Leaf.prototype.$tag = 1;
function _M0DTPC25immut7hashset4NodeGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionE6Branch(param0) {
  this._0 = param0;
}
__name(_M0DTPC25immut7hashset4NodeGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionE6Branch, "_M0DTPC25immut7hashset4NodeGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionE6Branch");
_M0DTPC25immut7hashset4NodeGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionE6Branch.prototype.$tag = 2;
function _M0DTPC14list4ListGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionE5Empty() {
}
__name(_M0DTPC14list4ListGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionE5Empty, "_M0DTPC14list4ListGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionE5Empty");
_M0DTPC14list4ListGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionE5Empty.prototype.$tag = 0;
var _M0DTPC14list4ListGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionE5Empty__ = new _M0DTPC14list4ListGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionE5Empty();
function _M0DTPC14list4ListGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionE4More(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
__name(_M0DTPC14list4ListGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionE4More, "_M0DTPC14list4ListGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionE4More");
_M0DTPC14list4ListGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionE4More.prototype.$tag = 1;
function _M0DTPC25immut7hashset4NodeGiE4Flat(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
__name(_M0DTPC25immut7hashset4NodeGiE4Flat, "_M0DTPC25immut7hashset4NodeGiE4Flat");
_M0DTPC25immut7hashset4NodeGiE4Flat.prototype.$tag = 0;
function _M0DTPC25immut7hashset4NodeGiE4Leaf(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
__name(_M0DTPC25immut7hashset4NodeGiE4Leaf, "_M0DTPC25immut7hashset4NodeGiE4Leaf");
_M0DTPC25immut7hashset4NodeGiE4Leaf.prototype.$tag = 1;
function _M0DTPC25immut7hashset4NodeGiE6Branch(param0) {
  this._0 = param0;
}
__name(_M0DTPC25immut7hashset4NodeGiE6Branch, "_M0DTPC25immut7hashset4NodeGiE6Branch");
_M0DTPC25immut7hashset4NodeGiE6Branch.prototype.$tag = 2;
function _M0DTPC25immut7hashset59_40moonbitlang_2fcore_2fimmut_2fhashset_2eHashSet_3a_3aiterL8CurrNodeGiE4Tree(param0) {
  this._0 = param0;
}
__name(_M0DTPC25immut7hashset59_40moonbitlang_2fcore_2fimmut_2fhashset_2eHashSet_3a_3aiterL8CurrNodeGiE4Tree, "_M0DTPC25immut7hashset59_40moonbitlang_2fcore_2fimmut_2fhashset_2eHashSet_3a_3aiterL8CurrNodeGiE4Tree");
_M0DTPC25immut7hashset59_40moonbitlang_2fcore_2fimmut_2fhashset_2eHashSet_3a_3aiterL8CurrNodeGiE4Tree.prototype.$tag = 0;
function _M0DTPC25immut7hashset59_40moonbitlang_2fcore_2fimmut_2fhashset_2eHashSet_3a_3aiterL8CurrNodeGiE6Bucket(param0) {
  this._0 = param0;
}
__name(_M0DTPC25immut7hashset59_40moonbitlang_2fcore_2fimmut_2fhashset_2eHashSet_3a_3aiterL8CurrNodeGiE6Bucket, "_M0DTPC25immut7hashset59_40moonbitlang_2fcore_2fimmut_2fhashset_2eHashSet_3a_3aiterL8CurrNodeGiE6Bucket");
_M0DTPC25immut7hashset59_40moonbitlang_2fcore_2fimmut_2fhashset_2eHashSet_3a_3aiterL8CurrNodeGiE6Bucket.prototype.$tag = 1;
function _M0DTPC15debug4Repr7UnitLit() {
}
__name(_M0DTPC15debug4Repr7UnitLit, "_M0DTPC15debug4Repr7UnitLit");
_M0DTPC15debug4Repr7UnitLit.prototype.$tag = 0;
function _M0DTPC15debug4Repr7Integer(param0) {
  this._0 = param0;
}
__name(_M0DTPC15debug4Repr7Integer, "_M0DTPC15debug4Repr7Integer");
_M0DTPC15debug4Repr7Integer.prototype.$tag = 1;
function _M0DTPC15debug4Repr9DoubleLit(param0) {
  this._0 = param0;
}
__name(_M0DTPC15debug4Repr9DoubleLit, "_M0DTPC15debug4Repr9DoubleLit");
_M0DTPC15debug4Repr9DoubleLit.prototype.$tag = 2;
function _M0DTPC15debug4Repr8FloatLit(param0) {
  this._0 = param0;
}
__name(_M0DTPC15debug4Repr8FloatLit, "_M0DTPC15debug4Repr8FloatLit");
_M0DTPC15debug4Repr8FloatLit.prototype.$tag = 3;
function _M0DTPC15debug4Repr7BoolLit(param0) {
  this._0 = param0;
}
__name(_M0DTPC15debug4Repr7BoolLit, "_M0DTPC15debug4Repr7BoolLit");
_M0DTPC15debug4Repr7BoolLit.prototype.$tag = 4;
function _M0DTPC15debug4Repr7CharLit(param0) {
  this._0 = param0;
}
__name(_M0DTPC15debug4Repr7CharLit, "_M0DTPC15debug4Repr7CharLit");
_M0DTPC15debug4Repr7CharLit.prototype.$tag = 5;
function _M0DTPC15debug4Repr9StringLit(param0) {
  this._0 = param0;
}
__name(_M0DTPC15debug4Repr9StringLit, "_M0DTPC15debug4Repr9StringLit");
_M0DTPC15debug4Repr9StringLit.prototype.$tag = 6;
function _M0DTPC15debug4Repr5Tuple(param0) {
  this._0 = param0;
}
__name(_M0DTPC15debug4Repr5Tuple, "_M0DTPC15debug4Repr5Tuple");
_M0DTPC15debug4Repr5Tuple.prototype.$tag = 7;
function _M0DTPC15debug4Repr5Array(param0) {
  this._0 = param0;
}
__name(_M0DTPC15debug4Repr5Array, "_M0DTPC15debug4Repr5Array");
_M0DTPC15debug4Repr5Array.prototype.$tag = 8;
function _M0DTPC15debug4Repr6Record(param0) {
  this._0 = param0;
}
__name(_M0DTPC15debug4Repr6Record, "_M0DTPC15debug4Repr6Record");
_M0DTPC15debug4Repr6Record.prototype.$tag = 9;
function _M0DTPC15debug4Repr4Enum(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
__name(_M0DTPC15debug4Repr4Enum, "_M0DTPC15debug4Repr4Enum");
_M0DTPC15debug4Repr4Enum.prototype.$tag = 10;
function _M0DTPC15debug4Repr3Map(param0) {
  this._0 = param0;
}
__name(_M0DTPC15debug4Repr3Map, "_M0DTPC15debug4Repr3Map");
_M0DTPC15debug4Repr3Map.prototype.$tag = 11;
function _M0DTPC15debug4Repr11RecordField(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
__name(_M0DTPC15debug4Repr11RecordField, "_M0DTPC15debug4Repr11RecordField");
_M0DTPC15debug4Repr11RecordField.prototype.$tag = 12;
function _M0DTPC15debug4Repr14EnumLabeledArg(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
__name(_M0DTPC15debug4Repr14EnumLabeledArg, "_M0DTPC15debug4Repr14EnumLabeledArg");
_M0DTPC15debug4Repr14EnumLabeledArg.prototype.$tag = 13;
function _M0DTPC15debug4Repr6Opaque(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
__name(_M0DTPC15debug4Repr6Opaque, "_M0DTPC15debug4Repr6Opaque");
_M0DTPC15debug4Repr6Opaque.prototype.$tag = 14;
function _M0DTPC15debug4Repr7Literal(param0) {
  this._0 = param0;
}
__name(_M0DTPC15debug4Repr7Literal, "_M0DTPC15debug4Repr7Literal");
_M0DTPC15debug4Repr7Literal.prototype.$tag = 15;
function _M0DTPC15debug4Repr8MapEntry(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
__name(_M0DTPC15debug4Repr8MapEntry, "_M0DTPC15debug4Repr8MapEntry");
_M0DTPC15debug4Repr8MapEntry.prototype.$tag = 16;
function _M0DTPC15debug4Repr7Omitted() {
}
__name(_M0DTPC15debug4Repr7Omitted, "_M0DTPC15debug4Repr7Omitted");
_M0DTPC15debug4Repr7Omitted.prototype.$tag = 17;
var _M0DTPC15debug4Repr7Omitted__ = new _M0DTPC15debug4Repr7Omitted();
function _M0TP29dowdiness4seam11SyntaxToken(param0, param1) {
  this.cst = param0;
  this.offset = param1;
}
__name(_M0TP29dowdiness4seam11SyntaxToken, "_M0TP29dowdiness4seam11SyntaxToken");
function _M0TP29dowdiness4seam10SyntaxNode(param0, param1, param2) {
  this.cst = param0;
  this.parent = param1;
  this.offset = param2;
}
__name(_M0TP29dowdiness4seam10SyntaxNode, "_M0TP29dowdiness4seam10SyntaxNode");
function _M0TP29dowdiness4seam8Interner(param0) {
  this.tokens = param0;
}
__name(_M0TP29dowdiness4seam8Interner, "_M0TP29dowdiness4seam8Interner");
function _M0DTP29dowdiness4seam10CstElement5Token(param0) {
  this._0 = param0;
}
__name(_M0DTP29dowdiness4seam10CstElement5Token, "_M0DTP29dowdiness4seam10CstElement5Token");
_M0DTP29dowdiness4seam10CstElement5Token.prototype.$tag = 0;
function _M0DTP29dowdiness4seam10CstElement4Node(param0) {
  this._0 = param0;
}
__name(_M0DTP29dowdiness4seam10CstElement4Node, "_M0DTP29dowdiness4seam10CstElement4Node");
_M0DTP29dowdiness4seam10CstElement4Node.prototype.$tag = 1;
function _M0DTP29dowdiness4seam10ParseEvent9StartNode(param0) {
  this._0 = param0;
}
__name(_M0DTP29dowdiness4seam10ParseEvent9StartNode, "_M0DTP29dowdiness4seam10ParseEvent9StartNode");
_M0DTP29dowdiness4seam10ParseEvent9StartNode.prototype.$tag = 0;
function _M0DTP29dowdiness4seam10ParseEvent10FinishNode() {
}
__name(_M0DTP29dowdiness4seam10ParseEvent10FinishNode, "_M0DTP29dowdiness4seam10ParseEvent10FinishNode");
_M0DTP29dowdiness4seam10ParseEvent10FinishNode.prototype.$tag = 1;
var _M0DTP29dowdiness4seam10ParseEvent10FinishNode__ = new _M0DTP29dowdiness4seam10ParseEvent10FinishNode();
function _M0DTP29dowdiness4seam10ParseEvent5Token(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
__name(_M0DTP29dowdiness4seam10ParseEvent5Token, "_M0DTP29dowdiness4seam10ParseEvent5Token");
_M0DTP29dowdiness4seam10ParseEvent5Token.prototype.$tag = 2;
function _M0DTP29dowdiness4seam10ParseEvent9Tombstone() {
}
__name(_M0DTP29dowdiness4seam10ParseEvent9Tombstone, "_M0DTP29dowdiness4seam10ParseEvent9Tombstone");
_M0DTP29dowdiness4seam10ParseEvent9Tombstone.prototype.$tag = 3;
var _M0DTP29dowdiness4seam10ParseEvent9Tombstone__ = new _M0DTP29dowdiness4seam10ParseEvent9Tombstone();
function _M0DTP29dowdiness4seam10ParseEvent9ReuseNode(param0) {
  this._0 = param0;
}
__name(_M0DTP29dowdiness4seam10ParseEvent9ReuseNode, "_M0DTP29dowdiness4seam10ParseEvent9ReuseNode");
_M0DTP29dowdiness4seam10ParseEvent9ReuseNode.prototype.$tag = 4;
function _M0DTPC16result6ResultGURPB5ArrayGRP39dowdiness4loom4core9TokenInfoGRP39dowdiness6lambda5token5TokenEERPB5ArrayGiEERP39dowdiness4loom4core8LexErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGURPB5ArrayGRP39dowdiness4loom4core9TokenInfoGRP39dowdiness6lambda5token5TokenEERPB5ArrayGiEERP39dowdiness4loom4core8LexErrorE3Err, "_M0DTPC16result6ResultGURPB5ArrayGRP39dowdiness4loom4core9TokenInfoGRP39dowdiness6lambda5token5TokenEERPB5ArrayGiEERP39dowdiness4loom4core8LexErrorE3Err");
_M0DTPC16result6ResultGURPB5ArrayGRP39dowdiness4loom4core9TokenInfoGRP39dowdiness6lambda5token5TokenEERPB5ArrayGiEERP39dowdiness4loom4core8LexErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGURPB5ArrayGRP39dowdiness4loom4core9TokenInfoGRP39dowdiness6lambda5token5TokenEERPB5ArrayGiEERP39dowdiness4loom4core8LexErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGURPB5ArrayGRP39dowdiness4loom4core9TokenInfoGRP39dowdiness6lambda5token5TokenEERPB5ArrayGiEERP39dowdiness4loom4core8LexErrorE2Ok, "_M0DTPC16result6ResultGURPB5ArrayGRP39dowdiness4loom4core9TokenInfoGRP39dowdiness6lambda5token5TokenEERPB5ArrayGiEERP39dowdiness4loom4core8LexErrorE2Ok");
_M0DTPC16result6ResultGURPB5ArrayGRP39dowdiness4loom4core9TokenInfoGRP39dowdiness6lambda5token5TokenEERPB5ArrayGiEERP39dowdiness4loom4core8LexErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGRP39dowdiness4loom4core11TokenBufferGRP39dowdiness6lambda5token5TokenERP39dowdiness4loom4core8LexErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGRP39dowdiness4loom4core11TokenBufferGRP39dowdiness6lambda5token5TokenERP39dowdiness4loom4core8LexErrorE3Err, "_M0DTPC16result6ResultGRP39dowdiness4loom4core11TokenBufferGRP39dowdiness6lambda5token5TokenERP39dowdiness4loom4core8LexErrorE3Err");
_M0DTPC16result6ResultGRP39dowdiness4loom4core11TokenBufferGRP39dowdiness6lambda5token5TokenERP39dowdiness4loom4core8LexErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRP39dowdiness4loom4core11TokenBufferGRP39dowdiness6lambda5token5TokenERP39dowdiness4loom4core8LexErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGRP39dowdiness4loom4core11TokenBufferGRP39dowdiness6lambda5token5TokenERP39dowdiness4loom4core8LexErrorE2Ok, "_M0DTPC16result6ResultGRP39dowdiness4loom4core11TokenBufferGRP39dowdiness6lambda5token5TokenERP39dowdiness4loom4core8LexErrorE2Ok");
_M0DTPC16result6ResultGRP39dowdiness4loom4core11TokenBufferGRP39dowdiness6lambda5token5TokenERP39dowdiness4loom4core8LexErrorE2Ok.prototype.$tag = 1;
function _M0TP39dowdiness4loom4core9TokenInfoGRP39dowdiness6lambda5token5TokenE(param0, param1) {
  this.token = param0;
  this.len = param1;
}
__name(_M0TP39dowdiness4loom4core9TokenInfoGRP39dowdiness6lambda5token5TokenE, "_M0TP39dowdiness4loom4core9TokenInfoGRP39dowdiness6lambda5token5TokenE");
function _M0DTPC16result6ResultGRPB5ArrayGRP39dowdiness4loom4core9TokenInfoGRP39dowdiness6lambda5token5TokenEERP39dowdiness4loom4core8LexErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGRPB5ArrayGRP39dowdiness4loom4core9TokenInfoGRP39dowdiness6lambda5token5TokenEERP39dowdiness4loom4core8LexErrorE3Err, "_M0DTPC16result6ResultGRPB5ArrayGRP39dowdiness4loom4core9TokenInfoGRP39dowdiness6lambda5token5TokenEERP39dowdiness4loom4core8LexErrorE3Err");
_M0DTPC16result6ResultGRPB5ArrayGRP39dowdiness4loom4core9TokenInfoGRP39dowdiness6lambda5token5TokenEERP39dowdiness4loom4core8LexErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRPB5ArrayGRP39dowdiness4loom4core9TokenInfoGRP39dowdiness6lambda5token5TokenEERP39dowdiness4loom4core8LexErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGRPB5ArrayGRP39dowdiness4loom4core9TokenInfoGRP39dowdiness6lambda5token5TokenEERP39dowdiness4loom4core8LexErrorE2Ok, "_M0DTPC16result6ResultGRPB5ArrayGRP39dowdiness4loom4core9TokenInfoGRP39dowdiness6lambda5token5TokenEERP39dowdiness4loom4core8LexErrorE2Ok");
_M0DTPC16result6ResultGRPB5ArrayGRP39dowdiness4loom4core9TokenInfoGRP39dowdiness6lambda5token5TokenEERP39dowdiness4loom4core8LexErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGuRP39dowdiness4loom4core8LexErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGuRP39dowdiness4loom4core8LexErrorE3Err, "_M0DTPC16result6ResultGuRP39dowdiness4loom4core8LexErrorE3Err");
_M0DTPC16result6ResultGuRP39dowdiness4loom4core8LexErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGuRP39dowdiness4loom4core8LexErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGuRP39dowdiness4loom4core8LexErrorE2Ok, "_M0DTPC16result6ResultGuRP39dowdiness4loom4core8LexErrorE2Ok");
_M0DTPC16result6ResultGuRP39dowdiness4loom4core8LexErrorE2Ok.prototype.$tag = 1;
function _M0TP39dowdiness4loom4core8OldToken(param0, param1, param2) {
  this.kind = param0;
  this.text = param1;
  this.start = param2;
}
__name(_M0TP39dowdiness4loom4core8OldToken, "_M0TP39dowdiness4loom4core8OldToken");
function _M0TP39dowdiness4loom4core11CursorFrame(param0, param1, param2, param3) {
  this.node = param0;
  this.child_index = param1;
  this.start_offset = param2;
  this.current_child_offset = param3;
}
__name(_M0TP39dowdiness4loom4core11CursorFrame, "_M0TP39dowdiness4loom4core11CursorFrame");
function _M0DTPC16option6OptionGRPB5ArrayGRP39dowdiness4loom4core8OldTokenEE4None() {
}
__name(_M0DTPC16option6OptionGRPB5ArrayGRP39dowdiness4loom4core8OldTokenEE4None, "_M0DTPC16option6OptionGRPB5ArrayGRP39dowdiness4loom4core8OldTokenEE4None");
_M0DTPC16option6OptionGRPB5ArrayGRP39dowdiness4loom4core8OldTokenEE4None.prototype.$tag = 0;
var _M0DTPC16option6OptionGRPB5ArrayGRP39dowdiness4loom4core8OldTokenEE4None__ = new _M0DTPC16option6OptionGRPB5ArrayGRP39dowdiness4loom4core8OldTokenEE4None();
function _M0DTPC16option6OptionGRPB5ArrayGRP39dowdiness4loom4core8OldTokenEE4Some(param0) {
  this._0 = param0;
}
__name(_M0DTPC16option6OptionGRPB5ArrayGRP39dowdiness4loom4core8OldTokenEE4Some, "_M0DTPC16option6OptionGRPB5ArrayGRP39dowdiness4loom4core8OldTokenEE4Some");
_M0DTPC16option6OptionGRPB5ArrayGRP39dowdiness4loom4core8OldTokenEE4Some.prototype.$tag = 1;
function _M0TP39dowdiness4loom4core10DiagnosticGRP39dowdiness6lambda5token5TokenE(param0, param1, param2, param3) {
  this.message = param0;
  this.start = param1;
  this.end = param2;
  this.got_token = param3;
}
__name(_M0TP39dowdiness4loom4core10DiagnosticGRP39dowdiness6lambda5token5TokenE, "_M0TP39dowdiness4loom4core10DiagnosticGRP39dowdiness6lambda5token5TokenE");
function _M0TP39dowdiness4loom4core15ReusedErrorSpan(param0, param1) {
  this.start = param0;
  this.end = param1;
}
__name(_M0TP39dowdiness4loom4core15ReusedErrorSpan, "_M0TP39dowdiness4loom4core15ReusedErrorSpan");
function _M0TP39dowdiness4loom4core12LanguageSpecGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(param0, param1, param2, param3, param4, param5, param6) {
  this.whitespace_kind = param0;
  this.error_kind = param1;
  this.incomplete_kind = param2;
  this.root_kind = param3;
  this.eof_token = param4;
  this.cst_token_matches = param5;
  this.parse_root = param6;
}
__name(_M0TP39dowdiness4loom4core12LanguageSpecGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE, "_M0TP39dowdiness4loom4core12LanguageSpecGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE");
function _M0DTPC16option6OptionGRPB5ArrayGRP39dowdiness4loom4core10DiagnosticGRP39dowdiness6lambda5token5TokenEEE4None() {
}
__name(_M0DTPC16option6OptionGRPB5ArrayGRP39dowdiness4loom4core10DiagnosticGRP39dowdiness6lambda5token5TokenEEE4None, "_M0DTPC16option6OptionGRPB5ArrayGRP39dowdiness4loom4core10DiagnosticGRP39dowdiness6lambda5token5TokenEEE4None");
_M0DTPC16option6OptionGRPB5ArrayGRP39dowdiness4loom4core10DiagnosticGRP39dowdiness6lambda5token5TokenEEE4None.prototype.$tag = 0;
var _M0DTPC16option6OptionGRPB5ArrayGRP39dowdiness4loom4core10DiagnosticGRP39dowdiness6lambda5token5TokenEEE4None__ = new _M0DTPC16option6OptionGRPB5ArrayGRP39dowdiness4loom4core10DiagnosticGRP39dowdiness6lambda5token5TokenEEE4None();
function _M0DTPC16option6OptionGRPB5ArrayGRP39dowdiness4loom4core10DiagnosticGRP39dowdiness6lambda5token5TokenEEE4Some(param0) {
  this._0 = param0;
}
__name(_M0DTPC16option6OptionGRPB5ArrayGRP39dowdiness4loom4core10DiagnosticGRP39dowdiness6lambda5token5TokenEEE4Some, "_M0DTPC16option6OptionGRPB5ArrayGRP39dowdiness4loom4core10DiagnosticGRP39dowdiness6lambda5token5TokenEEE4Some");
_M0DTPC16option6OptionGRPB5ArrayGRP39dowdiness4loom4core10DiagnosticGRP39dowdiness6lambda5token5TokenEEE4Some.prototype.$tag = 1;
function _M0TP39dowdiness4loom4core11PrefixLexerGRP39dowdiness6lambda5token5TokenE(param0) {
  this.lex_step = param0;
}
__name(_M0TP39dowdiness4loom4core11PrefixLexerGRP39dowdiness6lambda5token5TokenE, "_M0TP39dowdiness4loom4core11PrefixLexerGRP39dowdiness6lambda5token5TokenE");
function _M0DTP39dowdiness4loom4core7LexStepGRP39dowdiness6lambda5token5TokenE8Produced(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
__name(_M0DTP39dowdiness4loom4core7LexStepGRP39dowdiness6lambda5token5TokenE8Produced, "_M0DTP39dowdiness4loom4core7LexStepGRP39dowdiness6lambda5token5TokenE8Produced");
_M0DTP39dowdiness4loom4core7LexStepGRP39dowdiness6lambda5token5TokenE8Produced.prototype.$tag = 0;
function _M0DTP39dowdiness4loom4core7LexStepGRP39dowdiness6lambda5token5TokenE7Invalid(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
__name(_M0DTP39dowdiness4loom4core7LexStepGRP39dowdiness6lambda5token5TokenE7Invalid, "_M0DTP39dowdiness4loom4core7LexStepGRP39dowdiness6lambda5token5TokenE7Invalid");
_M0DTP39dowdiness4loom4core7LexStepGRP39dowdiness6lambda5token5TokenE7Invalid.prototype.$tag = 1;
function _M0DTP39dowdiness4loom4core7LexStepGRP39dowdiness6lambda5token5TokenE10Incomplete(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
__name(_M0DTP39dowdiness4loom4core7LexStepGRP39dowdiness6lambda5token5TokenE10Incomplete, "_M0DTP39dowdiness4loom4core7LexStepGRP39dowdiness6lambda5token5TokenE10Incomplete");
_M0DTP39dowdiness4loom4core7LexStepGRP39dowdiness6lambda5token5TokenE10Incomplete.prototype.$tag = 2;
function _M0DTP39dowdiness4loom4core7LexStepGRP39dowdiness6lambda5token5TokenE4Done() {
}
__name(_M0DTP39dowdiness4loom4core7LexStepGRP39dowdiness6lambda5token5TokenE4Done, "_M0DTP39dowdiness4loom4core7LexStepGRP39dowdiness6lambda5token5TokenE4Done");
_M0DTP39dowdiness4loom4core7LexStepGRP39dowdiness6lambda5token5TokenE4Done.prototype.$tag = 3;
var _M0DTP39dowdiness4loom4core7LexStepGRP39dowdiness6lambda5token5TokenE4Done__ = new _M0DTP39dowdiness4loom4core7LexStepGRP39dowdiness6lambda5token5TokenE4Done();
function _M0DTPC16result6ResultGuRP39dowdiness4incr5cells10CycleErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGuRP39dowdiness4incr5cells10CycleErrorE3Err, "_M0DTPC16result6ResultGuRP39dowdiness4incr5cells10CycleErrorE3Err");
_M0DTPC16result6ResultGuRP39dowdiness4incr5cells10CycleErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGuRP39dowdiness4incr5cells10CycleErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGuRP39dowdiness4incr5cells10CycleErrorE2Ok, "_M0DTPC16result6ResultGuRP39dowdiness4incr5cells10CycleErrorE2Ok");
_M0DTPC16result6ResultGuRP39dowdiness4incr5cells10CycleErrorE2Ok.prototype.$tag = 1;
function _M0DTP39dowdiness4incr5cells7CellRef10PullSignal(param0) {
  this._0 = param0;
}
__name(_M0DTP39dowdiness4incr5cells7CellRef10PullSignal, "_M0DTP39dowdiness4incr5cells7CellRef10PullSignal");
_M0DTP39dowdiness4incr5cells7CellRef10PullSignal.prototype.$tag = 0;
function _M0DTP39dowdiness4incr5cells7CellRef8PullMemo(param0) {
  this._0 = param0;
}
__name(_M0DTP39dowdiness4incr5cells7CellRef8PullMemo, "_M0DTP39dowdiness4incr5cells7CellRef8PullMemo");
_M0DTP39dowdiness4incr5cells7CellRef8PullMemo.prototype.$tag = 1;
function _M0DTP39dowdiness4incr5cells7CellRef12PushReactive(param0) {
  this._0 = param0;
}
__name(_M0DTP39dowdiness4incr5cells7CellRef12PushReactive, "_M0DTP39dowdiness4incr5cells7CellRef12PushReactive");
_M0DTP39dowdiness4incr5cells7CellRef12PushReactive.prototype.$tag = 2;
function _M0DTP39dowdiness4incr5cells7CellRef10PushEffect(param0) {
  this._0 = param0;
}
__name(_M0DTP39dowdiness4incr5cells7CellRef10PushEffect, "_M0DTP39dowdiness4incr5cells7CellRef10PushEffect");
_M0DTP39dowdiness4incr5cells7CellRef10PushEffect.prototype.$tag = 3;
function _M0DTP39dowdiness4incr5cells7CellRef10HybridMemo(param0) {
  this._0 = param0;
}
__name(_M0DTP39dowdiness4incr5cells7CellRef10HybridMemo, "_M0DTP39dowdiness4incr5cells7CellRef10HybridMemo");
_M0DTP39dowdiness4incr5cells7CellRef10HybridMemo.prototype.$tag = 4;
function _M0DTP39dowdiness4incr5cells7CellRef8Disposed() {
}
__name(_M0DTP39dowdiness4incr5cells7CellRef8Disposed, "_M0DTP39dowdiness4incr5cells7CellRef8Disposed");
_M0DTP39dowdiness4incr5cells7CellRef8Disposed.prototype.$tag = 5;
function _M0DTP39dowdiness4incr5cells7CellRef8Relation(param0) {
  this._0 = param0;
}
__name(_M0DTP39dowdiness4incr5cells7CellRef8Relation, "_M0DTP39dowdiness4incr5cells7CellRef8Relation");
_M0DTP39dowdiness4incr5cells7CellRef8Relation.prototype.$tag = 6;
function _M0DTP39dowdiness4incr5cells7CellRef4Rule(param0) {
  this._0 = param0;
}
__name(_M0DTP39dowdiness4incr5cells7CellRef4Rule, "_M0DTP39dowdiness4incr5cells7CellRef4Rule");
_M0DTP39dowdiness4incr5cells7CellRef4Rule.prototype.$tag = 7;
function _M0DTPC16option6OptionGORP29dowdiness4seam10SyntaxNodeE4None() {
}
__name(_M0DTPC16option6OptionGORP29dowdiness4seam10SyntaxNodeE4None, "_M0DTPC16option6OptionGORP29dowdiness4seam10SyntaxNodeE4None");
_M0DTPC16option6OptionGORP29dowdiness4seam10SyntaxNodeE4None.prototype.$tag = 0;
var _M0DTPC16option6OptionGORP29dowdiness4seam10SyntaxNodeE4None__ = new _M0DTPC16option6OptionGORP29dowdiness4seam10SyntaxNodeE4None();
function _M0DTPC16option6OptionGORP29dowdiness4seam10SyntaxNodeE4Some(param0) {
  this._0 = param0;
}
__name(_M0DTPC16option6OptionGORP29dowdiness4seam10SyntaxNodeE4Some, "_M0DTPC16option6OptionGORP29dowdiness4seam10SyntaxNodeE4Some");
_M0DTPC16option6OptionGORP29dowdiness4seam10SyntaxNodeE4Some.prototype.$tag = 1;
function _M0DTPC16result6ResultGORP39dowdiness6canopy10projection8ProjNodeRP39dowdiness4incr5cells10CycleErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGORP39dowdiness6canopy10projection8ProjNodeRP39dowdiness4incr5cells10CycleErrorE3Err, "_M0DTPC16result6ResultGORP39dowdiness6canopy10projection8ProjNodeRP39dowdiness4incr5cells10CycleErrorE3Err");
_M0DTPC16result6ResultGORP39dowdiness6canopy10projection8ProjNodeRP39dowdiness4incr5cells10CycleErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGORP39dowdiness6canopy10projection8ProjNodeRP39dowdiness4incr5cells10CycleErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGORP39dowdiness6canopy10projection8ProjNodeRP39dowdiness4incr5cells10CycleErrorE2Ok, "_M0DTPC16result6ResultGORP39dowdiness6canopy10projection8ProjNodeRP39dowdiness4incr5cells10CycleErrorE2Ok");
_M0DTPC16result6ResultGORP39dowdiness6canopy10projection8ProjNodeRP39dowdiness4incr5cells10CycleErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGRP39dowdiness6canopy10projection9SourceMapRP39dowdiness4incr5cells10CycleErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGRP39dowdiness6canopy10projection9SourceMapRP39dowdiness4incr5cells10CycleErrorE3Err, "_M0DTPC16result6ResultGRP39dowdiness6canopy10projection9SourceMapRP39dowdiness4incr5cells10CycleErrorE3Err");
_M0DTPC16result6ResultGRP39dowdiness6canopy10projection9SourceMapRP39dowdiness4incr5cells10CycleErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRP39dowdiness6canopy10projection9SourceMapRP39dowdiness4incr5cells10CycleErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGRP39dowdiness6canopy10projection9SourceMapRP39dowdiness4incr5cells10CycleErrorE2Ok, "_M0DTPC16result6ResultGRP39dowdiness6canopy10projection9SourceMapRP39dowdiness4incr5cells10CycleErrorE2Ok");
_M0DTPC16result6ResultGRP39dowdiness6canopy10projection9SourceMapRP39dowdiness4incr5cells10CycleErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16option6OptionGORP39dowdiness6canopy10projection8ProjNodeE4None() {
}
__name(_M0DTPC16option6OptionGORP39dowdiness6canopy10projection8ProjNodeE4None, "_M0DTPC16option6OptionGORP39dowdiness6canopy10projection8ProjNodeE4None");
_M0DTPC16option6OptionGORP39dowdiness6canopy10projection8ProjNodeE4None.prototype.$tag = 0;
var _M0DTPC16option6OptionGORP39dowdiness6canopy10projection8ProjNodeE4None__ = new _M0DTPC16option6OptionGORP39dowdiness6canopy10projection8ProjNodeE4None();
function _M0DTPC16option6OptionGORP39dowdiness6canopy10projection8ProjNodeE4Some(param0) {
  this._0 = param0;
}
__name(_M0DTPC16option6OptionGORP39dowdiness6canopy10projection8ProjNodeE4Some, "_M0DTPC16option6OptionGORP39dowdiness6canopy10projection8ProjNodeE4Some");
_M0DTPC16option6OptionGORP39dowdiness6canopy10projection8ProjNodeE4Some.prototype.$tag = 1;
function _M0DTPC16result6ResultGRPB3MapGRP39dowdiness6canopy10projection6NodeIdRP39dowdiness6canopy10projection8ProjNodeERP39dowdiness4incr5cells10CycleErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGRPB3MapGRP39dowdiness6canopy10projection6NodeIdRP39dowdiness6canopy10projection8ProjNodeERP39dowdiness4incr5cells10CycleErrorE3Err, "_M0DTPC16result6ResultGRPB3MapGRP39dowdiness6canopy10projection6NodeIdRP39dowdiness6canopy10projection8ProjNodeERP39dowdiness4incr5cells10CycleErrorE3Err");
_M0DTPC16result6ResultGRPB3MapGRP39dowdiness6canopy10projection6NodeIdRP39dowdiness6canopy10projection8ProjNodeERP39dowdiness4incr5cells10CycleErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRPB3MapGRP39dowdiness6canopy10projection6NodeIdRP39dowdiness6canopy10projection8ProjNodeERP39dowdiness4incr5cells10CycleErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGRPB3MapGRP39dowdiness6canopy10projection6NodeIdRP39dowdiness6canopy10projection8ProjNodeERP39dowdiness4incr5cells10CycleErrorE2Ok, "_M0DTPC16result6ResultGRPB3MapGRP39dowdiness6canopy10projection6NodeIdRP39dowdiness6canopy10projection8ProjNodeERP39dowdiness4incr5cells10CycleErrorE2Ok");
_M0DTPC16result6ResultGRPB3MapGRP39dowdiness6canopy10projection6NodeIdRP39dowdiness6canopy10projection8ProjNodeERP39dowdiness4incr5cells10CycleErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16option6OptionGORP39dowdiness6canopy10projection8FlatProjE4None() {
}
__name(_M0DTPC16option6OptionGORP39dowdiness6canopy10projection8FlatProjE4None, "_M0DTPC16option6OptionGORP39dowdiness6canopy10projection8FlatProjE4None");
_M0DTPC16option6OptionGORP39dowdiness6canopy10projection8FlatProjE4None.prototype.$tag = 0;
var _M0DTPC16option6OptionGORP39dowdiness6canopy10projection8FlatProjE4None__ = new _M0DTPC16option6OptionGORP39dowdiness6canopy10projection8FlatProjE4None();
function _M0DTPC16option6OptionGORP39dowdiness6canopy10projection8FlatProjE4Some(param0) {
  this._0 = param0;
}
__name(_M0DTPC16option6OptionGORP39dowdiness6canopy10projection8FlatProjE4Some, "_M0DTPC16option6OptionGORP39dowdiness6canopy10projection8FlatProjE4Some");
_M0DTPC16option6OptionGORP39dowdiness6canopy10projection8FlatProjE4Some.prototype.$tag = 1;
function _M0DTPC16result6ResultGORP39dowdiness6canopy10projection8FlatProjRP39dowdiness4incr5cells10CycleErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGORP39dowdiness6canopy10projection8FlatProjRP39dowdiness4incr5cells10CycleErrorE3Err, "_M0DTPC16result6ResultGORP39dowdiness6canopy10projection8FlatProjRP39dowdiness4incr5cells10CycleErrorE3Err");
_M0DTPC16result6ResultGORP39dowdiness6canopy10projection8FlatProjRP39dowdiness4incr5cells10CycleErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGORP39dowdiness6canopy10projection8FlatProjRP39dowdiness4incr5cells10CycleErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGORP39dowdiness6canopy10projection8FlatProjRP39dowdiness4incr5cells10CycleErrorE2Ok, "_M0DTPC16result6ResultGORP39dowdiness6canopy10projection8FlatProjRP39dowdiness4incr5cells10CycleErrorE2Ok");
_M0DTPC16result6ResultGORP39dowdiness6canopy10projection8FlatProjRP39dowdiness4incr5cells10CycleErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGbRP39dowdiness4incr5cells10CycleErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGbRP39dowdiness4incr5cells10CycleErrorE3Err, "_M0DTPC16result6ResultGbRP39dowdiness4incr5cells10CycleErrorE3Err");
_M0DTPC16result6ResultGbRP39dowdiness4incr5cells10CycleErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGbRP39dowdiness4incr5cells10CycleErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGbRP39dowdiness4incr5cells10CycleErrorE2Ok, "_M0DTPC16result6ResultGbRP39dowdiness4incr5cells10CycleErrorE2Ok");
_M0DTPC16result6ResultGbRP39dowdiness4incr5cells10CycleErrorE2Ok.prototype.$tag = 1;
function _M0TP29dowdiness4loom7GrammarGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindRP39dowdiness6lambda3ast4TermE(param0, param1, param2, param3, param4, param5) {
  this.spec = param0;
  this.tokenize = param1;
  this.fold_node = param2;
  this.on_lex_error = param3;
  this.error_token = param4;
  this.prefix_lexer = param5;
}
__name(_M0TP29dowdiness4loom7GrammarGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindRP39dowdiness6lambda3ast4TermE, "_M0TP29dowdiness4loom7GrammarGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindRP39dowdiness6lambda3ast4TermE");
function _M0DTP39dowdiness4loom11incremental12ParseOutcome4Tree(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
__name(_M0DTP39dowdiness4loom11incremental12ParseOutcome4Tree, "_M0DTP39dowdiness4loom11incremental12ParseOutcome4Tree");
_M0DTP39dowdiness4loom11incremental12ParseOutcome4Tree.prototype.$tag = 0;
function _M0DTP39dowdiness4loom11incremental12ParseOutcome8LexError(param0) {
  this._0 = param0;
}
__name(_M0DTP39dowdiness4loom11incremental12ParseOutcome8LexError, "_M0DTP39dowdiness4loom11incremental12ParseOutcome8LexError");
_M0DTP39dowdiness4loom11incremental12ParseOutcome8LexError.prototype.$tag = 1;
function _M0DTPC16option6OptionGORP39dowdiness4loom4core11ReuseCursorGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindEE4None() {
}
__name(_M0DTPC16option6OptionGORP39dowdiness4loom4core11ReuseCursorGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindEE4None, "_M0DTPC16option6OptionGORP39dowdiness4loom4core11ReuseCursorGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindEE4None");
_M0DTPC16option6OptionGORP39dowdiness4loom4core11ReuseCursorGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindEE4None.prototype.$tag = 0;
var _M0DTPC16option6OptionGORP39dowdiness4loom4core11ReuseCursorGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindEE4None__ = new _M0DTPC16option6OptionGORP39dowdiness4loom4core11ReuseCursorGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindEE4None();
function _M0DTPC16option6OptionGORP39dowdiness4loom4core11ReuseCursorGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindEE4Some(param0) {
  this._0 = param0;
}
__name(_M0DTPC16option6OptionGORP39dowdiness4loom4core11ReuseCursorGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindEE4Some, "_M0DTPC16option6OptionGORP39dowdiness4loom4core11ReuseCursorGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindEE4Some");
_M0DTPC16option6OptionGORP39dowdiness4loom4core11ReuseCursorGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindEE4Some.prototype.$tag = 1;
function _M0TP29dowdiness6lambda14LambdaExprView(param0) {
  this.node = param0;
}
__name(_M0TP29dowdiness6lambda14LambdaExprView, "_M0TP29dowdiness6lambda14LambdaExprView");
function _M0TP29dowdiness6lambda11AppExprView(param0) {
  this.node = param0;
}
__name(_M0TP29dowdiness6lambda11AppExprView, "_M0TP29dowdiness6lambda11AppExprView");
function _M0DTPC16option6OptionGORP29dowdiness4seam7RawKindE4None() {
}
__name(_M0DTPC16option6OptionGORP29dowdiness4seam7RawKindE4None, "_M0DTPC16option6OptionGORP29dowdiness4seam7RawKindE4None");
_M0DTPC16option6OptionGORP29dowdiness4seam7RawKindE4None.prototype.$tag = 0;
var _M0DTPC16option6OptionGORP29dowdiness4seam7RawKindE4None__ = new _M0DTPC16option6OptionGORP29dowdiness4seam7RawKindE4None();
function _M0DTPC16option6OptionGORP29dowdiness4seam7RawKindE4Some(param0) {
  this._0 = param0;
}
__name(_M0DTPC16option6OptionGORP29dowdiness4seam7RawKindE4Some, "_M0DTPC16option6OptionGORP29dowdiness4seam7RawKindE4Some");
_M0DTPC16option6OptionGORP29dowdiness4seam7RawKindE4Some.prototype.$tag = 1;
function _M0TP29dowdiness6lambda10IfExprView(param0) {
  this.node = param0;
}
__name(_M0TP29dowdiness6lambda10IfExprView, "_M0TP29dowdiness6lambda10IfExprView");
function _M0TP29dowdiness6lambda13ParenExprView(param0) {
  this.node = param0;
}
__name(_M0TP29dowdiness6lambda13ParenExprView, "_M0TP29dowdiness6lambda13ParenExprView");
function _M0TP29dowdiness6lambda14IntLiteralView(param0) {
  this.node = param0;
}
__name(_M0TP29dowdiness6lambda14IntLiteralView, "_M0TP29dowdiness6lambda14IntLiteralView");
function _M0TP29dowdiness6lambda10VarRefView(param0) {
  this.node = param0;
}
__name(_M0TP29dowdiness6lambda10VarRefView, "_M0TP29dowdiness6lambda10VarRefView");
function _M0TP29dowdiness6lambda10LetDefView(param0) {
  this.node = param0;
}
__name(_M0TP29dowdiness6lambda10LetDefView, "_M0TP29dowdiness6lambda10LetDefView");
function _M0DTP29dowdiness6lambda9VarStatus5Bound(param0) {
  this._0 = param0;
}
__name(_M0DTP29dowdiness6lambda9VarStatus5Bound, "_M0DTP29dowdiness6lambda9VarStatus5Bound");
_M0DTP29dowdiness6lambda9VarStatus5Bound.prototype.$tag = 0;
function _M0DTP29dowdiness6lambda9VarStatus4Free() {
}
__name(_M0DTP29dowdiness6lambda9VarStatus4Free, "_M0DTP29dowdiness6lambda9VarStatus4Free");
_M0DTP29dowdiness6lambda9VarStatus4Free.prototype.$tag = 1;
var _M0DTP29dowdiness6lambda9VarStatus4Free__ = new _M0DTP29dowdiness6lambda9VarStatus4Free();
function _M0DTPC16option6OptionGRPB5ArrayGRP39dowdiness6canopy10projection8SpanEditEE4None() {
}
__name(_M0DTPC16option6OptionGRPB5ArrayGRP39dowdiness6canopy10projection8SpanEditEE4None, "_M0DTPC16option6OptionGRPB5ArrayGRP39dowdiness6canopy10projection8SpanEditEE4None");
_M0DTPC16option6OptionGRPB5ArrayGRP39dowdiness6canopy10projection8SpanEditEE4None.prototype.$tag = 0;
function _M0DTPC16option6OptionGRPB5ArrayGRP39dowdiness6canopy10projection8SpanEditEE4Some(param0) {
  this._0 = param0;
}
__name(_M0DTPC16option6OptionGRPB5ArrayGRP39dowdiness6canopy10projection8SpanEditEE4Some, "_M0DTPC16option6OptionGRPB5ArrayGRP39dowdiness6canopy10projection8SpanEditEE4Some");
_M0DTPC16option6OptionGRPB5ArrayGRP39dowdiness6canopy10projection8SpanEditEE4Some.prototype.$tag = 1;
function _M0DTPC16result6ResultGuRP29dowdiness3rle8RleErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGuRP29dowdiness3rle8RleErrorE3Err, "_M0DTPC16result6ResultGuRP29dowdiness3rle8RleErrorE3Err");
_M0DTPC16result6ResultGuRP29dowdiness3rle8RleErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGuRP29dowdiness3rle8RleErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGuRP29dowdiness3rle8RleErrorE2Ok, "_M0DTPC16result6ResultGuRP29dowdiness3rle8RleErrorE2Ok");
_M0DTPC16result6ResultGuRP29dowdiness3rle8RleErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionRPC14json15JsonDecodeErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionRPC14json15JsonDecodeErrorE3Err, "_M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionRPC14json15JsonDecodeErrorE3Err");
_M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionRPC14json15JsonDecodeErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionRPC14json15JsonDecodeErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionRPC14json15JsonDecodeErrorE2Ok, "_M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionRPC14json15JsonDecodeErrorE2Ok");
_M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionRPC14json15JsonDecodeErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal4core9OpContentRPC14json15JsonDecodeErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal4core9OpContentRPC14json15JsonDecodeErrorE3Err, "_M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal4core9OpContentRPC14json15JsonDecodeErrorE3Err");
_M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal4core9OpContentRPC14json15JsonDecodeErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal4core9OpContentRPC14json15JsonDecodeErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal4core9OpContentRPC14json15JsonDecodeErrorE2Ok, "_M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal4core9OpContentRPC14json15JsonDecodeErrorE2Ok");
_M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal4core9OpContentRPC14json15JsonDecodeErrorE2Ok.prototype.$tag = 1;
function _M0DTP49dowdiness22event_2dgraph_2dwalker8internal4core9OpContent6Insert(param0) {
  this._0 = param0;
}
__name(_M0DTP49dowdiness22event_2dgraph_2dwalker8internal4core9OpContent6Insert, "_M0DTP49dowdiness22event_2dgraph_2dwalker8internal4core9OpContent6Insert");
_M0DTP49dowdiness22event_2dgraph_2dwalker8internal4core9OpContent6Insert.prototype.$tag = 0;
function _M0DTP49dowdiness22event_2dgraph_2dwalker8internal4core9OpContent6Delete() {
}
__name(_M0DTP49dowdiness22event_2dgraph_2dwalker8internal4core9OpContent6Delete, "_M0DTP49dowdiness22event_2dgraph_2dwalker8internal4core9OpContent6Delete");
_M0DTP49dowdiness22event_2dgraph_2dwalker8internal4core9OpContent6Delete.prototype.$tag = 1;
var _M0DTP49dowdiness22event_2dgraph_2dwalker8internal4core9OpContent6Delete__ = new _M0DTP49dowdiness22event_2dgraph_2dwalker8internal4core9OpContent6Delete();
function _M0DTP49dowdiness22event_2dgraph_2dwalker8internal4core9OpContent8Undelete() {
}
__name(_M0DTP49dowdiness22event_2dgraph_2dwalker8internal4core9OpContent8Undelete, "_M0DTP49dowdiness22event_2dgraph_2dwalker8internal4core9OpContent8Undelete");
_M0DTP49dowdiness22event_2dgraph_2dwalker8internal4core9OpContent8Undelete.prototype.$tag = 2;
var _M0DTP49dowdiness22event_2dgraph_2dwalker8internal4core9OpContent8Undelete__ = new _M0DTP49dowdiness22event_2dgraph_2dwalker8internal4core9OpContent8Undelete();
function _M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal4core8FrontierRPC14json15JsonDecodeErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal4core8FrontierRPC14json15JsonDecodeErrorE3Err, "_M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal4core8FrontierRPC14json15JsonDecodeErrorE3Err");
_M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal4core8FrontierRPC14json15JsonDecodeErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal4core8FrontierRPC14json15JsonDecodeErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal4core8FrontierRPC14json15JsonDecodeErrorE2Ok, "_M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal4core8FrontierRPC14json15JsonDecodeErrorE2Ok");
_M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal4core8FrontierRPC14json15JsonDecodeErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16option6OptionGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionEE4None() {
}
__name(_M0DTPC16option6OptionGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionEE4None, "_M0DTPC16option6OptionGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionEE4None");
_M0DTPC16option6OptionGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionEE4None.prototype.$tag = 0;
var _M0DTPC16option6OptionGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionEE4None__ = new _M0DTPC16option6OptionGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionEE4None();
function _M0DTPC16option6OptionGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionEE4Some(param0) {
  this._0 = param0;
}
__name(_M0DTPC16option6OptionGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionEE4Some, "_M0DTPC16option6OptionGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionEE4Some");
_M0DTPC16option6OptionGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionEE4Some.prototype.$tag = 1;
function _M0DTPC16option6OptionGORP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionE4None() {
}
__name(_M0DTPC16option6OptionGORP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionE4None, "_M0DTPC16option6OptionGORP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionE4None");
_M0DTPC16option6OptionGORP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionE4None.prototype.$tag = 0;
var _M0DTPC16option6OptionGORP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionE4None__ = new _M0DTPC16option6OptionGORP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionE4None();
function _M0DTPC16option6OptionGORP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionE4Some(param0) {
  this._0 = param0;
}
__name(_M0DTPC16option6OptionGORP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionE4Some, "_M0DTPC16option6OptionGORP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionE4Some");
_M0DTPC16option6OptionGORP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionE4Some.prototype.$tag = 1;
function _M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal4core2OpRPC14json15JsonDecodeErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal4core2OpRPC14json15JsonDecodeErrorE3Err, "_M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal4core2OpRPC14json15JsonDecodeErrorE3Err");
_M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal4core2OpRPC14json15JsonDecodeErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal4core2OpRPC14json15JsonDecodeErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal4core2OpRPC14json15JsonDecodeErrorE2Ok, "_M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal4core2OpRPC14json15JsonDecodeErrorE2Ok");
_M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal4core2OpRPC14json15JsonDecodeErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal4core12OpRunContentRPC14json15JsonDecodeErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal4core12OpRunContentRPC14json15JsonDecodeErrorE3Err, "_M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal4core12OpRunContentRPC14json15JsonDecodeErrorE3Err");
_M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal4core12OpRunContentRPC14json15JsonDecodeErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal4core12OpRunContentRPC14json15JsonDecodeErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal4core12OpRunContentRPC14json15JsonDecodeErrorE2Ok, "_M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal4core12OpRunContentRPC14json15JsonDecodeErrorE2Ok");
_M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal4core12OpRunContentRPC14json15JsonDecodeErrorE2Ok.prototype.$tag = 1;
function _M0DTP49dowdiness22event_2dgraph_2dwalker8internal4core12OpRunContent7Inserts(param0) {
  this._0 = param0;
}
__name(_M0DTP49dowdiness22event_2dgraph_2dwalker8internal4core12OpRunContent7Inserts, "_M0DTP49dowdiness22event_2dgraph_2dwalker8internal4core12OpRunContent7Inserts");
_M0DTP49dowdiness22event_2dgraph_2dwalker8internal4core12OpRunContent7Inserts.prototype.$tag = 0;
function _M0DTP49dowdiness22event_2dgraph_2dwalker8internal4core12OpRunContent7Deletes() {
}
__name(_M0DTP49dowdiness22event_2dgraph_2dwalker8internal4core12OpRunContent7Deletes, "_M0DTP49dowdiness22event_2dgraph_2dwalker8internal4core12OpRunContent7Deletes");
_M0DTP49dowdiness22event_2dgraph_2dwalker8internal4core12OpRunContent7Deletes.prototype.$tag = 1;
var _M0DTP49dowdiness22event_2dgraph_2dwalker8internal4core12OpRunContent7Deletes__ = new _M0DTP49dowdiness22event_2dgraph_2dwalker8internal4core12OpRunContent7Deletes();
function _M0DTP49dowdiness22event_2dgraph_2dwalker8internal4core12OpRunContent9Undeletes() {
}
__name(_M0DTP49dowdiness22event_2dgraph_2dwalker8internal4core12OpRunContent9Undeletes, "_M0DTP49dowdiness22event_2dgraph_2dwalker8internal4core12OpRunContent9Undeletes");
_M0DTP49dowdiness22event_2dgraph_2dwalker8internal4core12OpRunContent9Undeletes.prototype.$tag = 2;
var _M0DTP49dowdiness22event_2dgraph_2dwalker8internal4core12OpRunContent9Undeletes__ = new _M0DTP49dowdiness22event_2dgraph_2dwalker8internal4core12OpRunContent9Undeletes();
function _M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal4core5OpRunRPC14json15JsonDecodeErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal4core5OpRunRPC14json15JsonDecodeErrorE3Err, "_M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal4core5OpRunRPC14json15JsonDecodeErrorE3Err");
_M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal4core5OpRunRPC14json15JsonDecodeErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal4core5OpRunRPC14json15JsonDecodeErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal4core5OpRunRPC14json15JsonDecodeErrorE2Ok, "_M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal4core5OpRunRPC14json15JsonDecodeErrorE2Ok");
_M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal4core5OpRunRPC14json15JsonDecodeErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGiRP49dowdiness22event_2dgraph_2dwalker8internal13causal__graph16CausalGraphErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGiRP49dowdiness22event_2dgraph_2dwalker8internal13causal__graph16CausalGraphErrorE3Err, "_M0DTPC16result6ResultGiRP49dowdiness22event_2dgraph_2dwalker8internal13causal__graph16CausalGraphErrorE3Err");
_M0DTPC16result6ResultGiRP49dowdiness22event_2dgraph_2dwalker8internal13causal__graph16CausalGraphErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGiRP49dowdiness22event_2dgraph_2dwalker8internal13causal__graph16CausalGraphErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGiRP49dowdiness22event_2dgraph_2dwalker8internal13causal__graph16CausalGraphErrorE2Ok, "_M0DTPC16result6ResultGiRP49dowdiness22event_2dgraph_2dwalker8internal13causal__graph16CausalGraphErrorE2Ok");
_M0DTPC16result6ResultGiRP49dowdiness22event_2dgraph_2dwalker8internal13causal__graph16CausalGraphErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGuRP49dowdiness22event_2dgraph_2dwalker8internal5fugue10FugueErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGuRP49dowdiness22event_2dgraph_2dwalker8internal5fugue10FugueErrorE3Err, "_M0DTPC16result6ResultGuRP49dowdiness22event_2dgraph_2dwalker8internal5fugue10FugueErrorE3Err");
_M0DTPC16result6ResultGuRP49dowdiness22event_2dgraph_2dwalker8internal5fugue10FugueErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGuRP49dowdiness22event_2dgraph_2dwalker8internal5fugue10FugueErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGuRP49dowdiness22event_2dgraph_2dwalker8internal5fugue10FugueErrorE2Ok, "_M0DTPC16result6ResultGuRP49dowdiness22event_2dgraph_2dwalker8internal5fugue10FugueErrorE2Ok");
_M0DTPC16result6ResultGuRP49dowdiness22event_2dgraph_2dwalker8internal5fugue10FugueErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGORP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionRP49dowdiness22event_2dgraph_2dwalker8internal5oplog10OpLogErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGORP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionRP49dowdiness22event_2dgraph_2dwalker8internal5oplog10OpLogErrorE3Err, "_M0DTPC16result6ResultGORP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionRP49dowdiness22event_2dgraph_2dwalker8internal5oplog10OpLogErrorE3Err");
_M0DTPC16result6ResultGORP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionRP49dowdiness22event_2dgraph_2dwalker8internal5oplog10OpLogErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGORP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionRP49dowdiness22event_2dgraph_2dwalker8internal5oplog10OpLogErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGORP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionRP49dowdiness22event_2dgraph_2dwalker8internal5oplog10OpLogErrorE2Ok, "_M0DTPC16result6ResultGORP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionRP49dowdiness22event_2dgraph_2dwalker8internal5oplog10OpLogErrorE2Ok");
_M0DTPC16result6ResultGORP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionRP49dowdiness22event_2dgraph_2dwalker8internal5oplog10OpLogErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal4core2OpRP49dowdiness22event_2dgraph_2dwalker8internal5oplog10OpLogErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal4core2OpRP49dowdiness22event_2dgraph_2dwalker8internal5oplog10OpLogErrorE3Err, "_M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal4core2OpRP49dowdiness22event_2dgraph_2dwalker8internal5oplog10OpLogErrorE3Err");
_M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal4core2OpRP49dowdiness22event_2dgraph_2dwalker8internal5oplog10OpLogErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal4core2OpRP49dowdiness22event_2dgraph_2dwalker8internal5oplog10OpLogErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal4core2OpRP49dowdiness22event_2dgraph_2dwalker8internal5oplog10OpLogErrorE2Ok, "_M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal4core2OpRP49dowdiness22event_2dgraph_2dwalker8internal5oplog10OpLogErrorE2Ok");
_M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal4core2OpRP49dowdiness22event_2dgraph_2dwalker8internal5oplog10OpLogErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGUbORP49dowdiness22event_2dgraph_2dwalker8internal4core2OpERP49dowdiness22event_2dgraph_2dwalker8internal5oplog10OpLogErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGUbORP49dowdiness22event_2dgraph_2dwalker8internal4core2OpERP49dowdiness22event_2dgraph_2dwalker8internal5oplog10OpLogErrorE3Err, "_M0DTPC16result6ResultGUbORP49dowdiness22event_2dgraph_2dwalker8internal4core2OpERP49dowdiness22event_2dgraph_2dwalker8internal5oplog10OpLogErrorE3Err");
_M0DTPC16result6ResultGUbORP49dowdiness22event_2dgraph_2dwalker8internal4core2OpERP49dowdiness22event_2dgraph_2dwalker8internal5oplog10OpLogErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGUbORP49dowdiness22event_2dgraph_2dwalker8internal4core2OpERP49dowdiness22event_2dgraph_2dwalker8internal5oplog10OpLogErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGUbORP49dowdiness22event_2dgraph_2dwalker8internal4core2OpERP49dowdiness22event_2dgraph_2dwalker8internal5oplog10OpLogErrorE2Ok, "_M0DTPC16result6ResultGUbORP49dowdiness22event_2dgraph_2dwalker8internal4core2OpERP49dowdiness22event_2dgraph_2dwalker8internal5oplog10OpLogErrorE2Ok");
_M0DTPC16result6ResultGUbORP49dowdiness22event_2dgraph_2dwalker8internal4core2OpERP49dowdiness22event_2dgraph_2dwalker8internal5oplog10OpLogErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal4core2OpERP49dowdiness22event_2dgraph_2dwalker8internal5oplog10OpLogErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal4core2OpERP49dowdiness22event_2dgraph_2dwalker8internal5oplog10OpLogErrorE3Err, "_M0DTPC16result6ResultGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal4core2OpERP49dowdiness22event_2dgraph_2dwalker8internal5oplog10OpLogErrorE3Err");
_M0DTPC16result6ResultGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal4core2OpERP49dowdiness22event_2dgraph_2dwalker8internal5oplog10OpLogErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal4core2OpERP49dowdiness22event_2dgraph_2dwalker8internal5oplog10OpLogErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal4core2OpERP49dowdiness22event_2dgraph_2dwalker8internal5oplog10OpLogErrorE2Ok, "_M0DTPC16result6ResultGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal4core2OpERP49dowdiness22event_2dgraph_2dwalker8internal5oplog10OpLogErrorE2Ok");
_M0DTPC16result6ResultGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal4core2OpERP49dowdiness22event_2dgraph_2dwalker8internal5oplog10OpLogErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionERP49dowdiness22event_2dgraph_2dwalker8internal5oplog10OpLogErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionERP49dowdiness22event_2dgraph_2dwalker8internal5oplog10OpLogErrorE3Err, "_M0DTPC16result6ResultGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionERP49dowdiness22event_2dgraph_2dwalker8internal5oplog10OpLogErrorE3Err");
_M0DTPC16result6ResultGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionERP49dowdiness22event_2dgraph_2dwalker8internal5oplog10OpLogErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionERP49dowdiness22event_2dgraph_2dwalker8internal5oplog10OpLogErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionERP49dowdiness22event_2dgraph_2dwalker8internal5oplog10OpLogErrorE2Ok, "_M0DTPC16result6ResultGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionERP49dowdiness22event_2dgraph_2dwalker8internal5oplog10OpLogErrorE2Ok");
_M0DTPC16result6ResultGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionERP49dowdiness22event_2dgraph_2dwalker8internal5oplog10OpLogErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGuRP49dowdiness22event_2dgraph_2dwalker8internal5oplog10OpLogErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGuRP49dowdiness22event_2dgraph_2dwalker8internal5oplog10OpLogErrorE3Err, "_M0DTPC16result6ResultGuRP49dowdiness22event_2dgraph_2dwalker8internal5oplog10OpLogErrorE3Err");
_M0DTPC16result6ResultGuRP49dowdiness22event_2dgraph_2dwalker8internal5oplog10OpLogErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGuRP49dowdiness22event_2dgraph_2dwalker8internal5oplog10OpLogErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGuRP49dowdiness22event_2dgraph_2dwalker8internal5oplog10OpLogErrorE2Ok, "_M0DTPC16result6ResultGuRP49dowdiness22event_2dgraph_2dwalker8internal5oplog10OpLogErrorE2Ok");
_M0DTPC16result6ResultGuRP49dowdiness22event_2dgraph_2dwalker8internal5oplog10OpLogErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGuRP49dowdiness22event_2dgraph_2dwalker8internal6branch11BranchErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGuRP49dowdiness22event_2dgraph_2dwalker8internal6branch11BranchErrorE3Err, "_M0DTPC16result6ResultGuRP49dowdiness22event_2dgraph_2dwalker8internal6branch11BranchErrorE3Err");
_M0DTPC16result6ResultGuRP49dowdiness22event_2dgraph_2dwalker8internal6branch11BranchErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGuRP49dowdiness22event_2dgraph_2dwalker8internal6branch11BranchErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGuRP49dowdiness22event_2dgraph_2dwalker8internal6branch11BranchErrorE2Ok, "_M0DTPC16result6ResultGuRP49dowdiness22event_2dgraph_2dwalker8internal6branch11BranchErrorE2Ok");
_M0DTPC16result6ResultGuRP49dowdiness22event_2dgraph_2dwalker8internal6branch11BranchErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal6branch6BranchRP49dowdiness22event_2dgraph_2dwalker8internal6branch11BranchErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal6branch6BranchRP49dowdiness22event_2dgraph_2dwalker8internal6branch11BranchErrorE3Err, "_M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal6branch6BranchRP49dowdiness22event_2dgraph_2dwalker8internal6branch11BranchErrorE3Err");
_M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal6branch6BranchRP49dowdiness22event_2dgraph_2dwalker8internal6branch11BranchErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal6branch6BranchRP49dowdiness22event_2dgraph_2dwalker8internal6branch11BranchErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal6branch6BranchRP49dowdiness22event_2dgraph_2dwalker8internal6branch11BranchErrorE2Ok, "_M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal6branch6BranchRP49dowdiness22event_2dgraph_2dwalker8internal6branch11BranchErrorE2Ok");
_M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal6branch6BranchRP49dowdiness22event_2dgraph_2dwalker8internal6branch11BranchErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionERP49dowdiness22event_2dgraph_2dwalker8internal8document13DocumentErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionERP49dowdiness22event_2dgraph_2dwalker8internal8document13DocumentErrorE3Err, "_M0DTPC16result6ResultGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionERP49dowdiness22event_2dgraph_2dwalker8internal8document13DocumentErrorE3Err");
_M0DTPC16result6ResultGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionERP49dowdiness22event_2dgraph_2dwalker8internal8document13DocumentErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionERP49dowdiness22event_2dgraph_2dwalker8internal8document13DocumentErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionERP49dowdiness22event_2dgraph_2dwalker8internal8document13DocumentErrorE2Ok, "_M0DTPC16result6ResultGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionERP49dowdiness22event_2dgraph_2dwalker8internal8document13DocumentErrorE2Ok");
_M0DTPC16result6ResultGRPB5ArrayGRP49dowdiness22event_2dgraph_2dwalker8internal4core10RawVersionERP49dowdiness22event_2dgraph_2dwalker8internal8document13DocumentErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal4core2OpRP49dowdiness22event_2dgraph_2dwalker8internal8document13DocumentErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal4core2OpRP49dowdiness22event_2dgraph_2dwalker8internal8document13DocumentErrorE3Err, "_M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal4core2OpRP49dowdiness22event_2dgraph_2dwalker8internal8document13DocumentErrorE3Err");
_M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal4core2OpRP49dowdiness22event_2dgraph_2dwalker8internal8document13DocumentErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal4core2OpRP49dowdiness22event_2dgraph_2dwalker8internal8document13DocumentErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal4core2OpRP49dowdiness22event_2dgraph_2dwalker8internal8document13DocumentErrorE2Ok, "_M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal4core2OpRP49dowdiness22event_2dgraph_2dwalker8internal8document13DocumentErrorE2Ok");
_M0DTPC16result6ResultGRP49dowdiness22event_2dgraph_2dwalker8internal4core2OpRP49dowdiness22event_2dgraph_2dwalker8internal8document13DocumentErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGuRP49dowdiness22event_2dgraph_2dwalker8internal8document13DocumentErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGuRP49dowdiness22event_2dgraph_2dwalker8internal8document13DocumentErrorE3Err, "_M0DTPC16result6ResultGuRP49dowdiness22event_2dgraph_2dwalker8internal8document13DocumentErrorE3Err");
_M0DTPC16result6ResultGuRP49dowdiness22event_2dgraph_2dwalker8internal8document13DocumentErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGuRP49dowdiness22event_2dgraph_2dwalker8internal8document13DocumentErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGuRP49dowdiness22event_2dgraph_2dwalker8internal8document13DocumentErrorE2Ok, "_M0DTPC16result6ResultGuRP49dowdiness22event_2dgraph_2dwalker8internal8document13DocumentErrorE2Ok");
_M0DTPC16result6ResultGuRP49dowdiness22event_2dgraph_2dwalker8internal8document13DocumentErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGuRP39dowdiness22event_2dgraph_2dwalker4undo9UndoErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGuRP39dowdiness22event_2dgraph_2dwalker4undo9UndoErrorE3Err, "_M0DTPC16result6ResultGuRP39dowdiness22event_2dgraph_2dwalker4undo9UndoErrorE3Err");
_M0DTPC16result6ResultGuRP39dowdiness22event_2dgraph_2dwalker4undo9UndoErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGuRP39dowdiness22event_2dgraph_2dwalker4undo9UndoErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGuRP39dowdiness22event_2dgraph_2dwalker4undo9UndoErrorE2Ok, "_M0DTPC16result6ResultGuRP39dowdiness22event_2dgraph_2dwalker4undo9UndoErrorE2Ok");
_M0DTPC16result6ResultGuRP39dowdiness22event_2dgraph_2dwalker4undo9UndoErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGuRP39dowdiness22event_2dgraph_2dwalker4text9TextErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGuRP39dowdiness22event_2dgraph_2dwalker4text9TextErrorE3Err, "_M0DTPC16result6ResultGuRP39dowdiness22event_2dgraph_2dwalker4text9TextErrorE3Err");
_M0DTPC16result6ResultGuRP39dowdiness22event_2dgraph_2dwalker4text9TextErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGuRP39dowdiness22event_2dgraph_2dwalker4text9TextErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGuRP39dowdiness22event_2dgraph_2dwalker4text9TextErrorE2Ok, "_M0DTPC16result6ResultGuRP39dowdiness22event_2dgraph_2dwalker4text9TextErrorE2Ok");
_M0DTPC16result6ResultGuRP39dowdiness22event_2dgraph_2dwalker4text9TextErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGUiiERP39dowdiness22event_2dgraph_2dwalker4text9TextErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGUiiERP39dowdiness22event_2dgraph_2dwalker4text9TextErrorE3Err, "_M0DTPC16result6ResultGUiiERP39dowdiness22event_2dgraph_2dwalker4text9TextErrorE3Err");
_M0DTPC16result6ResultGUiiERP39dowdiness22event_2dgraph_2dwalker4text9TextErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGUiiERP39dowdiness22event_2dgraph_2dwalker4text9TextErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGUiiERP39dowdiness22event_2dgraph_2dwalker4text9TextErrorE2Ok, "_M0DTPC16result6ResultGUiiERP39dowdiness22event_2dgraph_2dwalker4text9TextErrorE2Ok");
_M0DTPC16result6ResultGUiiERP39dowdiness22event_2dgraph_2dwalker4text9TextErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGRP39dowdiness22event_2dgraph_2dwalker4text7VersionRP39dowdiness22event_2dgraph_2dwalker4text9TextErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGRP39dowdiness22event_2dgraph_2dwalker4text7VersionRP39dowdiness22event_2dgraph_2dwalker4text9TextErrorE3Err, "_M0DTPC16result6ResultGRP39dowdiness22event_2dgraph_2dwalker4text7VersionRP39dowdiness22event_2dgraph_2dwalker4text9TextErrorE3Err");
_M0DTPC16result6ResultGRP39dowdiness22event_2dgraph_2dwalker4text7VersionRP39dowdiness22event_2dgraph_2dwalker4text9TextErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRP39dowdiness22event_2dgraph_2dwalker4text7VersionRP39dowdiness22event_2dgraph_2dwalker4text9TextErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGRP39dowdiness22event_2dgraph_2dwalker4text7VersionRP39dowdiness22event_2dgraph_2dwalker4text9TextErrorE2Ok, "_M0DTPC16result6ResultGRP39dowdiness22event_2dgraph_2dwalker4text7VersionRP39dowdiness22event_2dgraph_2dwalker4text9TextErrorE2Ok");
_M0DTPC16result6ResultGRP39dowdiness22event_2dgraph_2dwalker4text7VersionRP39dowdiness22event_2dgraph_2dwalker4text9TextErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGRP39dowdiness22event_2dgraph_2dwalker4text11SyncMessageRP39dowdiness22event_2dgraph_2dwalker4text9TextErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGRP39dowdiness22event_2dgraph_2dwalker4text11SyncMessageRP39dowdiness22event_2dgraph_2dwalker4text9TextErrorE3Err, "_M0DTPC16result6ResultGRP39dowdiness22event_2dgraph_2dwalker4text11SyncMessageRP39dowdiness22event_2dgraph_2dwalker4text9TextErrorE3Err");
_M0DTPC16result6ResultGRP39dowdiness22event_2dgraph_2dwalker4text11SyncMessageRP39dowdiness22event_2dgraph_2dwalker4text9TextErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRP39dowdiness22event_2dgraph_2dwalker4text11SyncMessageRP39dowdiness22event_2dgraph_2dwalker4text9TextErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGRP39dowdiness22event_2dgraph_2dwalker4text11SyncMessageRP39dowdiness22event_2dgraph_2dwalker4text9TextErrorE2Ok, "_M0DTPC16result6ResultGRP39dowdiness22event_2dgraph_2dwalker4text11SyncMessageRP39dowdiness22event_2dgraph_2dwalker4text9TextErrorE2Ok");
_M0DTPC16result6ResultGRP39dowdiness22event_2dgraph_2dwalker4text11SyncMessageRP39dowdiness22event_2dgraph_2dwalker4text9TextErrorE2Ok.prototype.$tag = 1;
function _M0DTP39dowdiness6canopy10projection10TreeEditOp6Select(param0) {
  this._0 = param0;
}
__name(_M0DTP39dowdiness6canopy10projection10TreeEditOp6Select, "_M0DTP39dowdiness6canopy10projection10TreeEditOp6Select");
_M0DTP39dowdiness6canopy10projection10TreeEditOp6Select.prototype.$tag = 0;
function _M0DTP39dowdiness6canopy10projection10TreeEditOp11SelectRange(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
__name(_M0DTP39dowdiness6canopy10projection10TreeEditOp11SelectRange, "_M0DTP39dowdiness6canopy10projection10TreeEditOp11SelectRange");
_M0DTP39dowdiness6canopy10projection10TreeEditOp11SelectRange.prototype.$tag = 1;
function _M0DTP39dowdiness6canopy10projection10TreeEditOp9StartEdit(param0) {
  this._0 = param0;
}
__name(_M0DTP39dowdiness6canopy10projection10TreeEditOp9StartEdit, "_M0DTP39dowdiness6canopy10projection10TreeEditOp9StartEdit");
_M0DTP39dowdiness6canopy10projection10TreeEditOp9StartEdit.prototype.$tag = 2;
function _M0DTP39dowdiness6canopy10projection10TreeEditOp10CommitEdit(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
__name(_M0DTP39dowdiness6canopy10projection10TreeEditOp10CommitEdit, "_M0DTP39dowdiness6canopy10projection10TreeEditOp10CommitEdit");
_M0DTP39dowdiness6canopy10projection10TreeEditOp10CommitEdit.prototype.$tag = 3;
function _M0DTP39dowdiness6canopy10projection10TreeEditOp10CancelEdit() {
}
__name(_M0DTP39dowdiness6canopy10projection10TreeEditOp10CancelEdit, "_M0DTP39dowdiness6canopy10projection10TreeEditOp10CancelEdit");
_M0DTP39dowdiness6canopy10projection10TreeEditOp10CancelEdit.prototype.$tag = 4;
function _M0DTP39dowdiness6canopy10projection10TreeEditOp6Delete(param0) {
  this._0 = param0;
}
__name(_M0DTP39dowdiness6canopy10projection10TreeEditOp6Delete, "_M0DTP39dowdiness6canopy10projection10TreeEditOp6Delete");
_M0DTP39dowdiness6canopy10projection10TreeEditOp6Delete.prototype.$tag = 5;
function _M0DTP39dowdiness6canopy10projection10TreeEditOp12WrapInLambda(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
__name(_M0DTP39dowdiness6canopy10projection10TreeEditOp12WrapInLambda, "_M0DTP39dowdiness6canopy10projection10TreeEditOp12WrapInLambda");
_M0DTP39dowdiness6canopy10projection10TreeEditOp12WrapInLambda.prototype.$tag = 6;
function _M0DTP39dowdiness6canopy10projection10TreeEditOp9WrapInApp(param0) {
  this._0 = param0;
}
__name(_M0DTP39dowdiness6canopy10projection10TreeEditOp9WrapInApp, "_M0DTP39dowdiness6canopy10projection10TreeEditOp9WrapInApp");
_M0DTP39dowdiness6canopy10projection10TreeEditOp9WrapInApp.prototype.$tag = 7;
function _M0DTP39dowdiness6canopy10projection10TreeEditOp11InsertChild(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
__name(_M0DTP39dowdiness6canopy10projection10TreeEditOp11InsertChild, "_M0DTP39dowdiness6canopy10projection10TreeEditOp11InsertChild");
_M0DTP39dowdiness6canopy10projection10TreeEditOp11InsertChild.prototype.$tag = 8;
function _M0DTP39dowdiness6canopy10projection10TreeEditOp9StartDrag(param0) {
  this._0 = param0;
}
__name(_M0DTP39dowdiness6canopy10projection10TreeEditOp9StartDrag, "_M0DTP39dowdiness6canopy10projection10TreeEditOp9StartDrag");
_M0DTP39dowdiness6canopy10projection10TreeEditOp9StartDrag.prototype.$tag = 9;
function _M0DTP39dowdiness6canopy10projection10TreeEditOp8DragOver(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
__name(_M0DTP39dowdiness6canopy10projection10TreeEditOp8DragOver, "_M0DTP39dowdiness6canopy10projection10TreeEditOp8DragOver");
_M0DTP39dowdiness6canopy10projection10TreeEditOp8DragOver.prototype.$tag = 10;
function _M0DTP39dowdiness6canopy10projection10TreeEditOp4Drop(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
__name(_M0DTP39dowdiness6canopy10projection10TreeEditOp4Drop, "_M0DTP39dowdiness6canopy10projection10TreeEditOp4Drop");
_M0DTP39dowdiness6canopy10projection10TreeEditOp4Drop.prototype.$tag = 11;
function _M0DTP39dowdiness6canopy10projection10TreeEditOp8Collapse(param0) {
  this._0 = param0;
}
__name(_M0DTP39dowdiness6canopy10projection10TreeEditOp8Collapse, "_M0DTP39dowdiness6canopy10projection10TreeEditOp8Collapse");
_M0DTP39dowdiness6canopy10projection10TreeEditOp8Collapse.prototype.$tag = 12;
function _M0DTP39dowdiness6canopy10projection10TreeEditOp6Expand(param0) {
  this._0 = param0;
}
__name(_M0DTP39dowdiness6canopy10projection10TreeEditOp6Expand, "_M0DTP39dowdiness6canopy10projection10TreeEditOp6Expand");
_M0DTP39dowdiness6canopy10projection10TreeEditOp6Expand.prototype.$tag = 13;
function _M0DTPC16option6OptionGRP39dowdiness6canopy6editor11JsWebSocketE4None() {
}
__name(_M0DTPC16option6OptionGRP39dowdiness6canopy6editor11JsWebSocketE4None, "_M0DTPC16option6OptionGRP39dowdiness6canopy6editor11JsWebSocketE4None");
_M0DTPC16option6OptionGRP39dowdiness6canopy6editor11JsWebSocketE4None.prototype.$tag = 0;
var _M0DTPC16option6OptionGRP39dowdiness6canopy6editor11JsWebSocketE4None__ = new _M0DTPC16option6OptionGRP39dowdiness6canopy6editor11JsWebSocketE4None();
function _M0DTPC16option6OptionGRP39dowdiness6canopy6editor11JsWebSocketE4Some(param0) {
  this._0 = param0;
}
__name(_M0DTPC16option6OptionGRP39dowdiness6canopy6editor11JsWebSocketE4Some, "_M0DTPC16option6OptionGRP39dowdiness6canopy6editor11JsWebSocketE4Some");
_M0DTPC16option6OptionGRP39dowdiness6canopy6editor11JsWebSocketE4Some.prototype.$tag = 1;
function _M0DTPC16result6ResultGyRPB7FailureE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGyRPB7FailureE3Err, "_M0DTPC16result6ResultGyRPB7FailureE3Err");
_M0DTPC16result6ResultGyRPB7FailureE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGyRPB7FailureE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGyRPB7FailureE2Ok, "_M0DTPC16result6ResultGyRPB7FailureE2Ok");
_M0DTPC16result6ResultGyRPB7FailureE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGyRPC15error5ErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGyRPC15error5ErrorE3Err, "_M0DTPC16result6ResultGyRPC15error5ErrorE3Err");
_M0DTPC16result6ResultGyRPC15error5ErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGyRPC15error5ErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGyRPC15error5ErrorE2Ok, "_M0DTPC16result6ResultGyRPC15error5ErrorE2Ok");
_M0DTPC16result6ResultGyRPC15error5ErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGmRPC15error5ErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGmRPC15error5ErrorE3Err, "_M0DTPC16result6ResultGmRPC15error5ErrorE3Err");
_M0DTPC16result6ResultGmRPC15error5ErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGmRPC15error5ErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGmRPC15error5ErrorE2Ok, "_M0DTPC16result6ResultGmRPC15error5ErrorE2Ok");
_M0DTPC16result6ResultGmRPC15error5ErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGmRPB7FailureE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGmRPB7FailureE3Err, "_M0DTPC16result6ResultGmRPB7FailureE3Err");
_M0DTPC16result6ResultGmRPB7FailureE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGmRPB7FailureE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGmRPB7FailureE2Ok, "_M0DTPC16result6ResultGmRPB7FailureE2Ok");
_M0DTPC16result6ResultGmRPB7FailureE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGiRPB7FailureE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGiRPB7FailureE3Err, "_M0DTPC16result6ResultGiRPB7FailureE3Err");
_M0DTPC16result6ResultGiRPB7FailureE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGiRPB7FailureE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGiRPB7FailureE2Ok, "_M0DTPC16result6ResultGiRPB7FailureE2Ok");
_M0DTPC16result6ResultGiRPB7FailureE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGiRPC15error5ErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGiRPC15error5ErrorE3Err, "_M0DTPC16result6ResultGiRPC15error5ErrorE3Err");
_M0DTPC16result6ResultGiRPC15error5ErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGiRPC15error5ErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGiRPC15error5ErrorE2Ok, "_M0DTPC16result6ResultGiRPC15error5ErrorE2Ok");
_M0DTPC16result6ResultGiRPC15error5ErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGzRPB7FailureE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGzRPB7FailureE3Err, "_M0DTPC16result6ResultGzRPB7FailureE3Err");
_M0DTPC16result6ResultGzRPB7FailureE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGzRPB7FailureE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGzRPB7FailureE2Ok, "_M0DTPC16result6ResultGzRPB7FailureE2Ok");
_M0DTPC16result6ResultGzRPB7FailureE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGzRPC15error5ErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGzRPC15error5ErrorE3Err, "_M0DTPC16result6ResultGzRPC15error5ErrorE3Err");
_M0DTPC16result6ResultGzRPC15error5ErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGzRPC15error5ErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGzRPC15error5ErrorE2Ok, "_M0DTPC16result6ResultGzRPC15error5ErrorE2Ok");
_M0DTPC16result6ResultGzRPC15error5ErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGsRPC15error5ErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGsRPC15error5ErrorE3Err, "_M0DTPC16result6ResultGsRPC15error5ErrorE3Err");
_M0DTPC16result6ResultGsRPC15error5ErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGsRPC15error5ErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGsRPC15error5ErrorE2Ok, "_M0DTPC16result6ResultGsRPC15error5ErrorE2Ok");
_M0DTPC16result6ResultGsRPC15error5ErrorE2Ok.prototype.$tag = 1;
function _M0DTP39dowdiness6canopy6editor11SyncMessage7CrdtOps(param0) {
  this._0 = param0;
}
__name(_M0DTP39dowdiness6canopy6editor11SyncMessage7CrdtOps, "_M0DTP39dowdiness6canopy6editor11SyncMessage7CrdtOps");
_M0DTP39dowdiness6canopy6editor11SyncMessage7CrdtOps.prototype.$tag = 0;
function _M0DTP39dowdiness6canopy6editor11SyncMessage15EphemeralUpdate(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
__name(_M0DTP39dowdiness6canopy6editor11SyncMessage15EphemeralUpdate, "_M0DTP39dowdiness6canopy6editor11SyncMessage15EphemeralUpdate");
_M0DTP39dowdiness6canopy6editor11SyncMessage15EphemeralUpdate.prototype.$tag = 1;
function _M0DTP39dowdiness6canopy6editor11SyncMessage11SyncRequest(param0) {
  this._0 = param0;
}
__name(_M0DTP39dowdiness6canopy6editor11SyncMessage11SyncRequest, "_M0DTP39dowdiness6canopy6editor11SyncMessage11SyncRequest");
_M0DTP39dowdiness6canopy6editor11SyncMessage11SyncRequest.prototype.$tag = 2;
function _M0DTP39dowdiness6canopy6editor11SyncMessage12SyncResponse(param0) {
  this._0 = param0;
}
__name(_M0DTP39dowdiness6canopy6editor11SyncMessage12SyncResponse, "_M0DTP39dowdiness6canopy6editor11SyncMessage12SyncResponse");
_M0DTP39dowdiness6canopy6editor11SyncMessage12SyncResponse.prototype.$tag = 3;
function _M0DTP39dowdiness6canopy6editor11SyncMessage10PeerJoined(param0) {
  this._0 = param0;
}
__name(_M0DTP39dowdiness6canopy6editor11SyncMessage10PeerJoined, "_M0DTP39dowdiness6canopy6editor11SyncMessage10PeerJoined");
_M0DTP39dowdiness6canopy6editor11SyncMessage10PeerJoined.prototype.$tag = 4;
function _M0DTP39dowdiness6canopy6editor11SyncMessage8PeerLeft(param0) {
  this._0 = param0;
}
__name(_M0DTP39dowdiness6canopy6editor11SyncMessage8PeerLeft, "_M0DTP39dowdiness6canopy6editor11SyncMessage8PeerLeft");
_M0DTP39dowdiness6canopy6editor11SyncMessage8PeerLeft.prototype.$tag = 5;
function _M0DTPC16result6ResultGdRPC15error5ErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGdRPC15error5ErrorE3Err, "_M0DTPC16result6ResultGdRPC15error5ErrorE3Err");
_M0DTPC16result6ResultGdRPC15error5ErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGdRPC15error5ErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGdRPC15error5ErrorE2Ok, "_M0DTPC16result6ResultGdRPC15error5ErrorE2Ok");
_M0DTPC16result6ResultGdRPC15error5ErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGlRPC15error5ErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGlRPC15error5ErrorE3Err, "_M0DTPC16result6ResultGlRPC15error5ErrorE3Err");
_M0DTPC16result6ResultGlRPC15error5ErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGlRPC15error5ErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGlRPC15error5ErrorE2Ok, "_M0DTPC16result6ResultGlRPC15error5ErrorE2Ok");
_M0DTPC16result6ResultGlRPC15error5ErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGRP39dowdiness6canopy6editor14EphemeralValueRPC15error5ErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGRP39dowdiness6canopy6editor14EphemeralValueRPC15error5ErrorE3Err, "_M0DTPC16result6ResultGRP39dowdiness6canopy6editor14EphemeralValueRPC15error5ErrorE3Err");
_M0DTPC16result6ResultGRP39dowdiness6canopy6editor14EphemeralValueRPC15error5ErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRP39dowdiness6canopy6editor14EphemeralValueRPC15error5ErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGRP39dowdiness6canopy6editor14EphemeralValueRPC15error5ErrorE2Ok, "_M0DTPC16result6ResultGRP39dowdiness6canopy6editor14EphemeralValueRPC15error5ErrorE2Ok");
_M0DTPC16result6ResultGRP39dowdiness6canopy6editor14EphemeralValueRPC15error5ErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGRP39dowdiness6canopy6editor14EphemeralValueRPB7FailureE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGRP39dowdiness6canopy6editor14EphemeralValueRPB7FailureE3Err, "_M0DTPC16result6ResultGRP39dowdiness6canopy6editor14EphemeralValueRPB7FailureE3Err");
_M0DTPC16result6ResultGRP39dowdiness6canopy6editor14EphemeralValueRPB7FailureE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRP39dowdiness6canopy6editor14EphemeralValueRPB7FailureE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGRP39dowdiness6canopy6editor14EphemeralValueRPB7FailureE2Ok, "_M0DTPC16result6ResultGRP39dowdiness6canopy6editor14EphemeralValueRPB7FailureE2Ok");
_M0DTPC16result6ResultGRP39dowdiness6canopy6editor14EphemeralValueRPB7FailureE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGRPB5ArrayGUsRP39dowdiness6canopy6editor15EphemeralRecordEERPC15error5ErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGRPB5ArrayGUsRP39dowdiness6canopy6editor15EphemeralRecordEERPC15error5ErrorE3Err, "_M0DTPC16result6ResultGRPB5ArrayGUsRP39dowdiness6canopy6editor15EphemeralRecordEERPC15error5ErrorE3Err");
_M0DTPC16result6ResultGRPB5ArrayGUsRP39dowdiness6canopy6editor15EphemeralRecordEERPC15error5ErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRPB5ArrayGUsRP39dowdiness6canopy6editor15EphemeralRecordEERPC15error5ErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGRPB5ArrayGUsRP39dowdiness6canopy6editor15EphemeralRecordEERPC15error5ErrorE2Ok, "_M0DTPC16result6ResultGRPB5ArrayGUsRP39dowdiness6canopy6editor15EphemeralRecordEERPC15error5ErrorE2Ok");
_M0DTPC16result6ResultGRPB5ArrayGUsRP39dowdiness6canopy6editor15EphemeralRecordEERPC15error5ErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGuRPC15error5ErrorE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGuRPC15error5ErrorE3Err, "_M0DTPC16result6ResultGuRPC15error5ErrorE3Err");
_M0DTPC16result6ResultGuRPC15error5ErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGuRPC15error5ErrorE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGuRPC15error5ErrorE2Ok, "_M0DTPC16result6ResultGuRPC15error5ErrorE2Ok");
_M0DTPC16result6ResultGuRPC15error5ErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGuRPB7FailureE3Err(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGuRPB7FailureE3Err, "_M0DTPC16result6ResultGuRPB7FailureE3Err");
_M0DTPC16result6ResultGuRPB7FailureE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGuRPB7FailureE2Ok(param0) {
  this._0 = param0;
}
__name(_M0DTPC16result6ResultGuRPB7FailureE2Ok, "_M0DTPC16result6ResultGuRPB7FailureE2Ok");
_M0DTPC16result6ResultGuRPB7FailureE2Ok.prototype.$tag = 1;
function _M0TP39dowdiness6canopy5relay9RelayRoom(param0) {
  this.peers = param0;
}
__name(_M0TP39dowdiness6canopy5relay9RelayRoom, "_M0TP39dowdiness6canopy5relay9RelayRoom");
function _M0TP39dowdiness6canopy5relay9RelayPeer(param0, param1) {
  this.peer_id = param0;
  this.send_fn = param1;
}
__name(_M0TP39dowdiness6canopy5relay9RelayPeer, "_M0TP39dowdiness6canopy5relay9RelayPeer");
function _M0DTPC16option6OptionGOUiiEE4None() {
}
__name(_M0DTPC16option6OptionGOUiiEE4None, "_M0DTPC16option6OptionGOUiiEE4None");
_M0DTPC16option6OptionGOUiiEE4None.prototype.$tag = 0;
var _M0DTPC16option6OptionGOUiiEE4None__ = new _M0DTPC16option6OptionGOUiiEE4None();
function _M0DTPC16option6OptionGOUiiEE4Some(param0) {
  this._0 = param0;
}
__name(_M0DTPC16option6OptionGOUiiEE4Some, "_M0DTPC16option6OptionGOUiiEE4Some");
_M0DTPC16option6OptionGOUiiEE4Some.prototype.$tag = 1;
var _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger = { method_0: _M0IPB13StringBuilderPB6Logger13write__string, method_1: _M0IP016_24default__implPB6Logger16write__substringGRPB13StringBuilderE, method_2: _M0IPB13StringBuilderPB6Logger11write__view, method_3: _M0IPB13StringBuilderPB6Logger11write__char };
var _M0FPB19wasm__helper__cache = new _M0TPB15WasmHelperCache(false, void 0);
var _M0FPC17strconv14base__err__str = "invalid base";
var _M0FPC17strconv15range__err__str = "value out of range";
var _M0FPC17strconv16syntax__err__str = "invalid syntax";
var _M0FPC17strconv20parse__int64_2einnerN7_2abindS543 = "";
var _M0FPC17strconv12double__info = new _M0TPC17strconv9FloatInfo(52, 11, -1023);
var _M0FP39dowdiness4incr5cells31current__computing__runtime__id = new _M0TPC13ref3RefGiE(-1);
var _M0FP39dowdiness4incr5cells17next__runtime__id = new _M0TPC13ref3RefGiE(0);
var _M0FP39dowdiness6canopy10projection44placeholder__term__for__kind_2econstr_2f9930 = new _M0DTP39dowdiness6lambda3ast4Term3Int(0);
var _M0FP39dowdiness6canopy10projection44placeholder__term__for__kind_2econstr_2f9931 = new _M0DTP39dowdiness6lambda3ast4Term3Var("a");
var _M0FP39dowdiness6canopy10projection44placeholder__term__for__kind_2econstr_2f9932 = new _M0DTP39dowdiness6lambda3ast4Term3Var("x");
var _M0FP39dowdiness6canopy10projection44placeholder__term__for__kind_2econstr_2f9933 = new _M0DTP39dowdiness6lambda3ast4Term3Lam("x", _M0FP39dowdiness6canopy10projection44placeholder__term__for__kind_2econstr_2f9932);
var _M0FP39dowdiness6canopy10projection44placeholder__term__for__kind_2econstr_2f9934 = new _M0DTP39dowdiness6lambda3ast4Term3Var("f");
var _M0FP39dowdiness6canopy10projection44placeholder__term__for__kind_2econstr_2f9935 = new _M0DTP39dowdiness6lambda3ast4Term3Var("x");
var _M0FP39dowdiness6canopy10projection44placeholder__term__for__kind_2econstr_2f9936 = new _M0DTP39dowdiness6lambda3ast4Term3App(_M0FP39dowdiness6canopy10projection44placeholder__term__for__kind_2econstr_2f9934, _M0FP39dowdiness6canopy10projection44placeholder__term__for__kind_2econstr_2f9935);
var _M0FP39dowdiness6canopy10projection44placeholder__term__for__kind_2econstr_2f9937 = new _M0DTP39dowdiness6lambda3ast4Term3Int(0);
var _M0FP39dowdiness6canopy10projection44placeholder__term__for__kind_2econstr_2f9938 = new _M0DTP39dowdiness6lambda3ast4Term3Int(0);
var _M0FP39dowdiness6canopy10projection44placeholder__term__for__kind_2econstr_2f9939 = new _M0DTP39dowdiness6lambda3ast4Term3Bop(0, _M0FP39dowdiness6canopy10projection44placeholder__term__for__kind_2econstr_2f9937, _M0FP39dowdiness6canopy10projection44placeholder__term__for__kind_2econstr_2f9938);
var _M0FP39dowdiness6canopy10projection44placeholder__term__for__kind_2econstr_2f9940 = new _M0DTP39dowdiness6lambda3ast4Term3Int(0);
var _M0FP39dowdiness6canopy10projection44placeholder__term__for__kind_2econstr_2f9941 = new _M0DTP39dowdiness6lambda3ast4Term3Int(0);
var _M0FP39dowdiness6canopy10projection44placeholder__term__for__kind_2econstr_2f9942 = new _M0DTP39dowdiness6lambda3ast4Term3Int(0);
var _M0FP39dowdiness6canopy10projection44placeholder__term__for__kind_2econstr_2f9943 = new _M0DTP39dowdiness6lambda3ast4Term2If(_M0FP39dowdiness6canopy10projection44placeholder__term__for__kind_2econstr_2f9940, _M0FP39dowdiness6canopy10projection44placeholder__term__for__kind_2econstr_2f9941, _M0FP39dowdiness6canopy10projection44placeholder__term__for__kind_2econstr_2f9942);
var _M0FP39dowdiness6canopy10projection44placeholder__term__for__kind_2econstr_2f9944 = new _M0DTP39dowdiness6lambda3ast4Term3Var("a");
var _M0FP29dowdiness6canopy6editor = new _M0TPC13ref3RefGORP39dowdiness6canopy6editor10SyncEditorE(void 0);
var _M0FPB4seed = _M0FPB12random__seed();
var _M0FP39dowdiness4loom4core14core__interner = _M0MP29dowdiness4seam8Interner3new();
var _M0FP29dowdiness6lambda19cst__token__matches = /* @__PURE__ */ __name((raw, text, tok) => {
  const _bind = _M0IP39dowdiness6lambda6syntax10SyntaxKindP29dowdiness4seam11FromRawKind9from__raw(raw);
  switch (_bind) {
    case 10: {
      if (tok.$tag === 13) {
        const _Integer = tok;
        const _i = _Integer._0;
        return text === _M0MPC13int3Int18to__string_2einner(_i, 10);
      } else {
        return false;
      }
    }
    case 9: {
      if (tok.$tag === 12) {
        const _Identifier = tok;
        const _name = _Identifier._0;
        return _name === text;
      } else {
        return false;
      }
    }
    default: {
      const _bind$2 = _M0FP29dowdiness6lambda29syntax__kind__to__token__kind(raw);
      if (_bind$2 === void 0) {
        return false;
      } else {
        const _Some = _bind$2;
        const _expected = _Some;
        return _M0IP39dowdiness6lambda5token5TokenPB2Eq5equal(_expected, tok);
      }
    }
  }
}, "_M0FP29dowdiness6lambda19cst__token__matches");
var _M0FP29dowdiness6lambda28lambda__spec_2econstr_2f9557 = _M0FP29dowdiness6lambda19parse__lambda__root;
var _M0FP29dowdiness6lambda12lambda__spec = _M0MP39dowdiness4loom4core12LanguageSpec3newGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(11, 12, 22, _M0DTP39dowdiness6lambda5token5Token3EOF__, void 0, _M0FP29dowdiness6lambda19cst__token__matches, _M0FP29dowdiness6lambda28lambda__spec_2econstr_2f9557);
var _M0FP29dowdiness6lambda33fold__node__inner_2econstr_2f9597 = new _M0DTP39dowdiness6lambda3ast4Term5Error("missing lambda body");
var _M0FP29dowdiness6lambda33fold__node__inner_2econstr_2f9598 = new _M0DTP39dowdiness6lambda3ast4Term5Error("missing function in application");
var _M0FP29dowdiness6lambda33fold__node__inner_2econstr_2f9599 = new _M0DTP39dowdiness6lambda3ast4Term5Error("empty BinaryExpr");
var _M0FP29dowdiness6lambda33fold__node__inner_2econstr_2f9600 = new _M0DTP39dowdiness6lambda3ast4Term5Error("missing if condition");
var _M0FP29dowdiness6lambda33fold__node__inner_2econstr_2f9601 = new _M0DTP39dowdiness6lambda3ast4Term5Error("missing then branch");
var _M0FP29dowdiness6lambda33fold__node__inner_2econstr_2f9602 = new _M0DTP39dowdiness6lambda3ast4Term5Error("missing else branch");
var _M0FP29dowdiness6lambda33fold__node__inner_2econstr_2f9603 = new _M0DTP39dowdiness6lambda3ast4Term5Error("empty parentheses");
var _M0FP29dowdiness6lambda33fold__node__inner_2econstr_2f9604 = new _M0DTP39dowdiness6lambda3ast4Term5Error("ErrorNode");
var _M0FP29dowdiness6lambda34lambda__fold__node_2econstr_2f9654 = new _M0DTP39dowdiness6lambda3ast4Term5Error("missing LetDef init");
var _M0FP39dowdiness6lambda5lexer25step__lex_2econstr_2f8317 = 10;
var _M0FP29dowdiness6lambda31lambda__grammar_2econstr_2f9558 = new _M0DTP39dowdiness6lambda5token5Token5Error("");
var _M0FP29dowdiness6lambda31lambda__grammar_2econstr_2f9559 = _M0FP29dowdiness6lambda31lambda__grammar_2econstr_2f9558;
var _M0FP29dowdiness6lambda15lambda__grammar = _M0MP29dowdiness4loom7Grammar11new_2einnerGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindRP39dowdiness6lambda3ast4TermE(_M0FP29dowdiness6lambda12lambda__spec, _M0FP39dowdiness6lambda5lexer8tokenize, _M0FP29dowdiness6lambda18lambda__fold__node, (msg) => new _M0DTP39dowdiness6lambda3ast4Term5Error(`lex error: ${msg}`), _M0FP29dowdiness6lambda31lambda__grammar_2econstr_2f9559, _M0MP39dowdiness4loom4core11PrefixLexer3newGRP39dowdiness6lambda5token5TokenE(_M0FP39dowdiness6lambda5lexer19lambda__step__lexer));
var _M0FP39dowdiness6canopy10projection29rebuild__kind_2econstr_2f9899 = new _M0DTP39dowdiness6lambda3ast4Term5Error("missing");
var _M0FP39dowdiness22event_2dgraph_2dwalker4text35from__oplog__error_2econstr_2f11841 = new _M0DTP39dowdiness22event_2dgraph_2dwalker4text11SyncFailure16MalformedMessage("delete operation missing origin");
var _M0FP410antisatori8graphviz3lib6parser27next__token_2econstr_2f9452 = new _M0DTP410antisatori8graphviz3lib6parser5Token2ID("/");
var _M0FP410antisatori8graphviz3lib6parser27next__token_2econstr_2f9453 = new _M0DTP410antisatori8graphviz3lib6parser5Token2ID("-");
var _M0FP410antisatori8graphviz3lib6parser27next__token_2econstr_2f9454 = new _M0DTP410antisatori8graphviz3lib6parser5Token2ID(".");
var _M0FP410antisatori8graphviz3lib6parser32parse__attribute_2econstr_2f9489 = new _M0DTP410antisatori8graphviz3lib6parser5Token2ID("");
var _M0FP410antisatori8graphviz3lib6parser32parse__attribute_2econstr_2f9490 = new _M0DTP410antisatori8graphviz3lib6parser5Token2ID("");
var _M0FP39dowdiness4loom3viz25to__graph_2econstr_2f9533 = new _M0DTP410antisatori8graphviz3lib6parser9Statement10Assignment("bgcolor", "transparent");
var _M0FP39dowdiness4loom3viz25to__graph_2erecord_2f9534 = new _M0TP410antisatori8graphviz3lib6parser9Attribute("shape", "box");
var _M0FP39dowdiness4loom3viz25to__graph_2erecord_2f9535 = new _M0TP410antisatori8graphviz3lib6parser9Attribute("style", "rounded,filled");
var _M0FP39dowdiness4loom3viz25to__graph_2erecord_2f9536 = new _M0TP410antisatori8graphviz3lib6parser9Attribute("fillcolor", "#252526");
var _M0FP39dowdiness4loom3viz25to__graph_2erecord_2f9537 = new _M0TP410antisatori8graphviz3lib6parser9Attribute("fontname", "Arial");
var _M0FP39dowdiness4loom3viz25to__graph_2erecord_2f9538 = new _M0TP410antisatori8graphviz3lib6parser9Attribute("fontcolor", "#d4d4d4");
var _M0FP39dowdiness4loom3viz25to__graph_2erecord_2f9539 = new _M0TP410antisatori8graphviz3lib6parser9Attribute("color", "#3c3c3c");
var _M0FP39dowdiness4loom3viz25to__graph_2erecord_2f9540 = new _M0TP410antisatori8graphviz3lib6parser9Attribute("fontname", "Arial");
var _M0FP39dowdiness4loom3viz25to__graph_2erecord_2f9541 = new _M0TP410antisatori8graphviz3lib6parser9Attribute("fontcolor", "#858585");
var _M0FP39dowdiness4loom3viz25to__graph_2erecord_2f9542 = new _M0TP410antisatori8graphviz3lib6parser9Attribute("color", "#3c3c3c");
var _M0FPC16double13neg__infinity = _M0MPC15int645Int6423reinterpret__as__double($_4503599627370496L);
var _M0FPC16double14not__a__number = _M0MPC15int645Int6423reinterpret__as__double($9221120237041090561L);
var _M0FPC16double8infinity = _M0MPC15int645Int6423reinterpret__as__double($9218868437227405312L);
var _M0FPC17strconv25max__mantissa__fast__path = _M0IPC16uint646UInt64PB3Shl3shl($2L, 52);
var _M0FP39dowdiness6canopy6editor39read__ephemeral__value_2econstr_2f12537 = new _M0DTP39dowdiness6canopy6editor14EphemeralValue4Bool(false);
var _M0FP39dowdiness6canopy6editor39read__ephemeral__value_2econstr_2f12538 = new _M0DTP39dowdiness6canopy6editor14EphemeralValue4Bool(true);
var _M0FP39dowdiness6canopy10projection35compute__text__edit_2econstr_2f9946 = new _M0DTPC16result6ResultGORPB5ArrayGRP39dowdiness6canopy10projection8SpanEditEsE3Err("Node not found in registry");
var _M0FP39dowdiness6canopy10projection35compute__text__edit_2econstr_2f9947 = new _M0DTPC16result6ResultGORPB5ArrayGRP39dowdiness6canopy10projection8SpanEditEsE3Err("Node not found in registry");
var _M0FP39dowdiness6canopy10projection35compute__text__edit_2econstr_2f9948 = new _M0DTP39dowdiness6lambda3ast4Term3Var("a");
var _M0FP39dowdiness6canopy10projection35compute__text__edit_2econstr_2f9949 = new _M0DTPC16result6ResultGORPB5ArrayGRP39dowdiness6canopy10projection8SpanEditEsE3Err("Parent not in source map");
var _M0FP39dowdiness6canopy10projection35compute__text__edit_2econstr_2f9950 = new _M0DTPC16result6ResultGORPB5ArrayGRP39dowdiness6canopy10projection8SpanEditEsE3Err("Source node not found");
var _M0FP39dowdiness6canopy10projection35compute__text__edit_2econstr_2f9951 = new _M0DTPC16result6ResultGORPB5ArrayGRP39dowdiness6canopy10projection8SpanEditEsE3Err("Target node not found");
var _M0FP39dowdiness6canopy6editor34apply__tree__edit_2econstr_2f12247 = new _M0DTPC16result6ResultGusE3Err("No FlatProj available");
var _M0FP39dowdiness6canopy6editor38parse__tree__edit__op_2econstr_2f12063 = new _M0DTPC16result6ResultGRP39dowdiness6canopy10projection10TreeEditOpsE3Err("expected JSON object");
var _M0FP39dowdiness6canopy6editor38parse__tree__edit__op_2econstr_2f12064 = new _M0DTPC16result6ResultGRP39dowdiness6canopy10projection10TreeEditOpsE3Err("missing type field");
var _M0FP39dowdiness6canopy6editor38parse__tree__edit__op_2econstr_2f12065 = new _M0DTPC16result6ResultGRP39dowdiness6canopy10projection10TreeEditOpsE3Err("missing node_id field");
var _M0FP39dowdiness6canopy6editor38parse__tree__edit__op_2econstr_2f12066 = new _M0DTPC16result6ResultGRP39dowdiness6canopy10projection10TreeEditOpsE3Err("var_name must be a string");
var _M0FP29dowdiness6canopy12relay__rooms = _M0MPB3Map11new_2einnerGsRP39dowdiness6canopy5relay9RelayRoomE(8);
function _M0FPC15abort5abortGORP39dowdiness6canopy10projection8ProjNodeE(msg) {
  return $panic();
}
__name(_M0FPC15abort5abortGORP39dowdiness6canopy10projection8ProjNodeE, "_M0FPC15abort5abortGORP39dowdiness6canopy10projection8ProjNodeE");
function _M0FPC15abort5abortGRP39dowdiness6canopy10projection9SourceMapE(msg) {
  return $panic();
}
__name(_M0FPC15abort5abortGRP39dowdiness6canopy10projection9SourceMapE, "_M0FPC15abort5abortGRP39dowdiness6canopy10projection9SourceMapE");
function _M0FPC15abort5abortGuE(msg) {
  $panic();
}
__name(_M0FPC15abort5abortGuE, "_M0FPC15abort5abortGuE");
function _M0FPC15abort5abortGyE(msg) {
  return $panic();
}
__name(_M0FPC15abort5abortGyE, "_M0FPC15abort5abortGyE");
function _M0FPC15abort5abortGOiE(msg) {
  return $panic();
}
__name(_M0FPC15abort5abortGOiE, "_M0FPC15abort5abortGOiE");
function _M0MPB6Hasher8consume4(self, input) {
  const _p = (self.acc >>> 0) + ((Math.imul(input, -1028477379) | 0) >>> 0) | 0;
  const _p$2 = 17;
  self.acc = Math.imul(_p << _p$2 | (_p >>> (32 - _p$2 | 0) | 0), 668265263) | 0;
}
__name(_M0MPB6Hasher8consume4, "_M0MPB6Hasher8consume4");
function _M0MPB6Hasher13combine__uint(self, value) {
  self.acc = (self.acc >>> 0) + (4 >>> 0) | 0;
  _M0MPB6Hasher8consume4(self, value);
}
__name(_M0MPB6Hasher13combine__uint, "_M0MPB6Hasher13combine__uint");
function _M0FPB5abortGORP39dowdiness6canopy10projection8ProjNodeE(string, loc) {
  return _M0FPC15abort5abortGORP39dowdiness6canopy10projection8ProjNodeE(`${string}
  at ${_M0IP016_24default__implPB4Show10to__stringGRPB9SourceLocE(loc)}
`);
}
__name(_M0FPB5abortGORP39dowdiness6canopy10projection8ProjNodeE, "_M0FPB5abortGORP39dowdiness6canopy10projection8ProjNodeE");
function _M0FPB5abortGRP39dowdiness6canopy10projection9SourceMapE(string, loc) {
  return _M0FPC15abort5abortGRP39dowdiness6canopy10projection9SourceMapE(`${string}
  at ${_M0IP016_24default__implPB4Show10to__stringGRPB9SourceLocE(loc)}
`);
}
__name(_M0FPB5abortGRP39dowdiness6canopy10projection9SourceMapE, "_M0FPB5abortGRP39dowdiness6canopy10projection9SourceMapE");
function _M0FPB5abortGuE(string, loc) {
  _M0FPC15abort5abortGuE(`${string}
  at ${_M0IP016_24default__implPB4Show10to__stringGRPB9SourceLocE(loc)}
`);
}
__name(_M0FPB5abortGuE, "_M0FPB5abortGuE");
function _M0FPB5abortGyE(string, loc) {
  return _M0FPC15abort5abortGyE(`${string}
  at ${_M0IP016_24default__implPB4Show10to__stringGRPB9SourceLocE(loc)}
`);
}
__name(_M0FPB5abortGyE, "_M0FPB5abortGyE");
function _M0FPB5abortGOiE(string, loc) {
  return _M0FPC15abort5abortGOiE(`${string}
  at ${_M0IP016_24default__implPB4Show10to__stringGRPB9SourceLocE(loc)}
`);
}
__name(_M0FPB5abortGOiE, "_M0FPB5abortGOiE");
function _M0MPC15array10FixedArray12unsafe__blitGyE(dst, dst_offset, src, src_offset, len) {
  if (dst === src && dst_offset < src_offset) {
    let _tmp = 0;
    while (true) {
      const i = _tmp;
      if (i < len) {
        const _tmp$2 = dst_offset + i | 0;
        const _tmp$3 = src_offset + i | 0;
        $bound_check(src, _tmp$3);
        $bound_check(dst, _tmp$2);
        dst[_tmp$2] = src[_tmp$3];
        _tmp = i + 1 | 0;
        continue;
      } else {
        return;
      }
    }
  } else {
    let _tmp = len - 1 | 0;
    while (true) {
      const i = _tmp;
      if (i >= 0) {
        const _tmp$2 = dst_offset + i | 0;
        const _tmp$3 = src_offset + i | 0;
        $bound_check(src, _tmp$3);
        $bound_check(dst, _tmp$2);
        dst[_tmp$2] = src[_tmp$3];
        _tmp = i - 1 | 0;
        continue;
      } else {
        return;
      }
    }
  }
}
__name(_M0MPC15array10FixedArray12unsafe__blitGyE, "_M0MPC15array10FixedArray12unsafe__blitGyE");
function _M0MPB13StringBuilder11new_2einner(size_hint) {
  return new _M0TPB13StringBuilder("");
}
__name(_M0MPB13StringBuilder11new_2einner, "_M0MPB13StringBuilder11new_2einner");
function _M0IPB13StringBuilderPB6Logger11write__char(self, ch) {
  self.val = `${self.val}${String.fromCodePoint(ch)}`;
}
__name(_M0IPB13StringBuilderPB6Logger11write__char, "_M0IPB13StringBuilderPB6Logger11write__char");
function _M0MPC16uint166UInt1622is__leading__surrogate(self) {
  return _M0IP016_24default__implPB7Compare6op__geGkE(self, 55296) && _M0IP016_24default__implPB7Compare6op__leGkE(self, 56319);
}
__name(_M0MPC16uint166UInt1622is__leading__surrogate, "_M0MPC16uint166UInt1622is__leading__surrogate");
function _M0MPC16uint166UInt1623is__trailing__surrogate(self) {
  return _M0IP016_24default__implPB7Compare6op__geGkE(self, 56320) && _M0IP016_24default__implPB7Compare6op__leGkE(self, 57343);
}
__name(_M0MPC16uint166UInt1623is__trailing__surrogate, "_M0MPC16uint166UInt1623is__trailing__surrogate");
function _M0FPB32code__point__of__surrogate__pair(leading, trailing) {
  return (((Math.imul(leading - 55296 | 0, 1024) | 0) + trailing | 0) - 56320 | 0) + 65536 | 0;
}
__name(_M0FPB32code__point__of__surrogate__pair, "_M0FPB32code__point__of__surrogate__pair");
function _M0MPC16string6String16unsafe__char__at(self, index) {
  const c1 = self.charCodeAt(index);
  if (_M0MPC16uint166UInt1622is__leading__surrogate(c1)) {
    const c2 = self.charCodeAt(index + 1 | 0);
    return _M0FPB32code__point__of__surrogate__pair(c1, c2);
  } else {
    return c1;
  }
}
__name(_M0MPC16string6String16unsafe__char__at, "_M0MPC16string6String16unsafe__char__at");
function _M0MPC15array5Array2atGRPB4JsonE(self, index) {
  const len = self.length;
  if (index >= 0 && index < len) {
    $bound_check(self, index);
    return self[index];
  } else {
    return $panic();
  }
}
__name(_M0MPC15array5Array2atGRPB4JsonE, "_M0MPC15array5Array2atGRPB4JsonE");
function _M0MPC15array5Array2atGRP39dowdiness6lambda3ast3BopE(self, index) {
  const len = self.length;
  if (index >= 0 && index < len) {
    $bound_check(self, index);
    return self[index];
  } else {
    return $panic();
  }
}
__name(_M0MPC15array5Array2atGRP39dowdiness6lambda3ast3BopE, "_M0MPC15array5Array2atGRP39dowdiness6lambda3ast3BopE");
function _M0MPB13SourceLocRepr5parse(repr) {
  const _bind = new _M0TPC16string10StringView(repr, 0, repr.length);
  const _data = _bind.str;
  const _start = _bind.start;
  const _end = _start + (_bind.end - _bind.start | 0) | 0;
  let _cursor = _start;
  let accept_state = -1;
  let match_end = -1;
  let match_tag_saver_0 = -1;
  let match_tag_saver_1 = -1;
  let match_tag_saver_2 = -1;
  let match_tag_saver_3 = -1;
  let match_tag_saver_4 = -1;
  let tag_0 = -1;
  let tag_1 = -1;
  let tag_1_1 = -1;
  let tag_1_2 = -1;
  let tag_3 = -1;
  let tag_2 = -1;
  let tag_2_1 = -1;
  let tag_4 = -1;
  _L: {
    if (_cursor < _end) {
      const _p = _cursor;
      if (_data.charCodeAt(_p) === 64) {
        _cursor = _cursor + 1 | 0;
        _L$2:
          while (true) {
            tag_0 = _cursor;
            if (_cursor < _end) {
              const _p$2 = _cursor;
              const next_char = _data.charCodeAt(_p$2);
              _cursor = _cursor + 1 | 0;
              if (next_char === 58) {
                if (_cursor < _end) {
                  _cursor = _cursor + 1 | 0;
                  let _tmp = 0;
                  _L$3:
                    while (true) {
                      const dispatch_15 = _tmp;
                      _L$4: {
                        _L$5: {
                          switch (dispatch_15) {
                            case 3: {
                              tag_1_2 = tag_1_1;
                              tag_1_1 = tag_1;
                              tag_1 = _cursor;
                              if (_cursor < _end) {
                                _L$6: {
                                  const _p$3 = _cursor;
                                  const next_char$2 = _data.charCodeAt(_p$3);
                                  _cursor = _cursor + 1 | 0;
                                  if (next_char$2 < 58) {
                                    if (next_char$2 < 48) {
                                      break _L$6;
                                    } else {
                                      tag_1 = _cursor;
                                      tag_2_1 = tag_2;
                                      tag_2 = _cursor;
                                      tag_3 = _cursor;
                                      if (_cursor < _end) {
                                        _L$7: {
                                          const _p$4 = _cursor;
                                          const next_char$3 = _data.charCodeAt(_p$4);
                                          _cursor = _cursor + 1 | 0;
                                          if (next_char$3 < 48) {
                                            if (next_char$3 === 45) {
                                              break _L$4;
                                            } else {
                                              break _L$7;
                                            }
                                          } else {
                                            if (next_char$3 > 57) {
                                              if (next_char$3 < 59) {
                                                _tmp = 3;
                                                continue _L$3;
                                              } else {
                                                break _L$7;
                                              }
                                            } else {
                                              _tmp = 6;
                                              continue _L$3;
                                            }
                                          }
                                        }
                                        _tmp = 0;
                                        continue _L$3;
                                      } else {
                                        break _L;
                                      }
                                    }
                                  } else {
                                    if (next_char$2 > 58) {
                                      break _L$6;
                                    } else {
                                      _tmp = 1;
                                      continue _L$3;
                                    }
                                  }
                                }
                                _tmp = 0;
                                continue _L$3;
                              } else {
                                break _L;
                              }
                            }
                            case 2: {
                              tag_1 = _cursor;
                              tag_2 = _cursor;
                              if (_cursor < _end) {
                                _L$6: {
                                  const _p$3 = _cursor;
                                  const next_char$2 = _data.charCodeAt(_p$3);
                                  _cursor = _cursor + 1 | 0;
                                  if (next_char$2 < 58) {
                                    if (next_char$2 < 48) {
                                      break _L$6;
                                    } else {
                                      _tmp = 2;
                                      continue _L$3;
                                    }
                                  } else {
                                    if (next_char$2 > 58) {
                                      break _L$6;
                                    } else {
                                      _tmp = 3;
                                      continue _L$3;
                                    }
                                  }
                                }
                                _tmp = 0;
                                continue _L$3;
                              } else {
                                break _L;
                              }
                            }
                            case 0: {
                              tag_1 = _cursor;
                              if (_cursor < _end) {
                                const _p$3 = _cursor;
                                const next_char$2 = _data.charCodeAt(_p$3);
                                _cursor = _cursor + 1 | 0;
                                if (next_char$2 === 58) {
                                  _tmp = 1;
                                  continue _L$3;
                                } else {
                                  _tmp = 0;
                                  continue _L$3;
                                }
                              } else {
                                break _L;
                              }
                            }
                            case 4: {
                              tag_1 = _cursor;
                              tag_4 = _cursor;
                              if (_cursor < _end) {
                                _L$6: {
                                  const _p$3 = _cursor;
                                  const next_char$2 = _data.charCodeAt(_p$3);
                                  _cursor = _cursor + 1 | 0;
                                  if (next_char$2 < 58) {
                                    if (next_char$2 < 48) {
                                      break _L$6;
                                    } else {
                                      _tmp = 4;
                                      continue _L$3;
                                    }
                                  } else {
                                    if (next_char$2 > 58) {
                                      break _L$6;
                                    } else {
                                      tag_1_2 = tag_1_1;
                                      tag_1_1 = tag_1;
                                      tag_1 = _cursor;
                                      if (_cursor < _end) {
                                        _L$7: {
                                          const _p$4 = _cursor;
                                          const next_char$3 = _data.charCodeAt(_p$4);
                                          _cursor = _cursor + 1 | 0;
                                          if (next_char$3 < 58) {
                                            if (next_char$3 < 48) {
                                              break _L$7;
                                            } else {
                                              tag_1 = _cursor;
                                              tag_2_1 = tag_2;
                                              tag_2 = _cursor;
                                              if (_cursor < _end) {
                                                _L$8: {
                                                  const _p$5 = _cursor;
                                                  const next_char$4 = _data.charCodeAt(_p$5);
                                                  _cursor = _cursor + 1 | 0;
                                                  if (next_char$4 < 58) {
                                                    if (next_char$4 < 48) {
                                                      break _L$8;
                                                    } else {
                                                      _tmp = 5;
                                                      continue _L$3;
                                                    }
                                                  } else {
                                                    if (next_char$4 > 58) {
                                                      break _L$8;
                                                    } else {
                                                      _tmp = 3;
                                                      continue _L$3;
                                                    }
                                                  }
                                                }
                                                _tmp = 0;
                                                continue _L$3;
                                              } else {
                                                break _L$5;
                                              }
                                            }
                                          } else {
                                            if (next_char$3 > 58) {
                                              break _L$7;
                                            } else {
                                              _tmp = 1;
                                              continue _L$3;
                                            }
                                          }
                                        }
                                        _tmp = 0;
                                        continue _L$3;
                                      } else {
                                        break _L;
                                      }
                                    }
                                  }
                                }
                                _tmp = 0;
                                continue _L$3;
                              } else {
                                break _L;
                              }
                            }
                            case 5: {
                              tag_1 = _cursor;
                              tag_2 = _cursor;
                              if (_cursor < _end) {
                                _L$6: {
                                  const _p$3 = _cursor;
                                  const next_char$2 = _data.charCodeAt(_p$3);
                                  _cursor = _cursor + 1 | 0;
                                  if (next_char$2 < 58) {
                                    if (next_char$2 < 48) {
                                      break _L$6;
                                    } else {
                                      _tmp = 5;
                                      continue _L$3;
                                    }
                                  } else {
                                    if (next_char$2 > 58) {
                                      break _L$6;
                                    } else {
                                      _tmp = 3;
                                      continue _L$3;
                                    }
                                  }
                                }
                                _tmp = 0;
                                continue _L$3;
                              } else {
                                break _L$5;
                              }
                            }
                            case 6: {
                              tag_1 = _cursor;
                              tag_2 = _cursor;
                              tag_3 = _cursor;
                              if (_cursor < _end) {
                                _L$6: {
                                  const _p$3 = _cursor;
                                  const next_char$2 = _data.charCodeAt(_p$3);
                                  _cursor = _cursor + 1 | 0;
                                  if (next_char$2 < 48) {
                                    if (next_char$2 === 45) {
                                      break _L$4;
                                    } else {
                                      break _L$6;
                                    }
                                  } else {
                                    if (next_char$2 > 57) {
                                      if (next_char$2 < 59) {
                                        _tmp = 3;
                                        continue _L$3;
                                      } else {
                                        break _L$6;
                                      }
                                    } else {
                                      _tmp = 6;
                                      continue _L$3;
                                    }
                                  }
                                }
                                _tmp = 0;
                                continue _L$3;
                              } else {
                                break _L;
                              }
                            }
                            case 1: {
                              tag_1_1 = tag_1;
                              tag_1 = _cursor;
                              if (_cursor < _end) {
                                _L$6: {
                                  const _p$3 = _cursor;
                                  const next_char$2 = _data.charCodeAt(_p$3);
                                  _cursor = _cursor + 1 | 0;
                                  if (next_char$2 < 58) {
                                    if (next_char$2 < 48) {
                                      break _L$6;
                                    } else {
                                      _tmp = 2;
                                      continue _L$3;
                                    }
                                  } else {
                                    if (next_char$2 > 58) {
                                      break _L$6;
                                    } else {
                                      _tmp = 1;
                                      continue _L$3;
                                    }
                                  }
                                }
                                _tmp = 0;
                                continue _L$3;
                              } else {
                                break _L;
                              }
                            }
                            default: {
                              break _L;
                            }
                          }
                        }
                        tag_1 = tag_1_2;
                        tag_2 = tag_2_1;
                        match_tag_saver_0 = tag_0;
                        match_tag_saver_1 = tag_1;
                        match_tag_saver_2 = tag_2;
                        match_tag_saver_3 = tag_3;
                        match_tag_saver_4 = tag_4;
                        accept_state = 0;
                        match_end = _cursor;
                        break _L;
                      }
                      tag_1_1 = tag_1_2;
                      tag_1 = _cursor;
                      tag_2 = tag_2_1;
                      if (_cursor < _end) {
                        _L$5: {
                          const _p$3 = _cursor;
                          const next_char$2 = _data.charCodeAt(_p$3);
                          _cursor = _cursor + 1 | 0;
                          if (next_char$2 < 58) {
                            if (next_char$2 < 48) {
                              break _L$5;
                            } else {
                              _tmp = 4;
                              continue;
                            }
                          } else {
                            if (next_char$2 > 58) {
                              break _L$5;
                            } else {
                              _tmp = 1;
                              continue;
                            }
                          }
                        }
                        _tmp = 0;
                        continue;
                      } else {
                        break _L;
                      }
                    }
                } else {
                  break _L;
                }
              } else {
                continue;
              }
            } else {
              break _L;
            }
          }
      } else {
        break _L;
      }
    } else {
      break _L;
    }
  }
  if (accept_state === 0) {
    const start_line = _M0MPC16string6String4view(_data, match_tag_saver_1 + 1 | 0, match_tag_saver_2);
    const start_column = _M0MPC16string6String4view(_data, match_tag_saver_2 + 1 | 0, match_tag_saver_3);
    const pkg = _M0MPC16string6String4view(_data, _start + 1 | 0, match_tag_saver_0);
    const filename = _M0MPC16string6String4view(_data, match_tag_saver_0 + 1 | 0, match_tag_saver_1);
    const end_line = _M0MPC16string6String4view(_data, match_tag_saver_3 + 1 | 0, match_tag_saver_4);
    const end_column = _M0MPC16string6String4view(_data, match_tag_saver_4 + 1 | 0, match_end);
    return new _M0TPB13SourceLocRepr(pkg, filename, start_line, start_column, end_line, end_column);
  } else {
    return $panic();
  }
}
__name(_M0MPB13SourceLocRepr5parse, "_M0MPB13SourceLocRepr5parse");
function _M0IPB13StringBuilderPB6Logger13write__string(self, str) {
  self.val = `${self.val}${str}`;
}
__name(_M0IPB13StringBuilderPB6Logger13write__string, "_M0IPB13StringBuilderPB6Logger13write__string");
function _M0MPC16uint166UInt168to__char(self) {
  _L: {
    if (self >= 0 && self <= 55295) {
      break _L;
    } else {
      if (self >= 57344) {
        break _L;
      } else {
        return -1;
      }
    }
  }
  return self;
}
__name(_M0MPC16uint166UInt168to__char, "_M0MPC16uint166UInt168to__char");
function _M0MPB7MyInt649from__int(value) {
  return new _M0TPB7MyInt64(value >> 31 & -1, value | 0);
}
__name(_M0MPB7MyInt649from__int, "_M0MPB7MyInt649from__int");
function _M0MPC13int3Int9to__int64(self) {
  return _M0MPB7MyInt649from__int(self);
}
__name(_M0MPC13int3Int9to__int64, "_M0MPC13int3Int9to__int64");
function _M0MPB6Hasher7combineGsE(self, value) {
  _M0IPC16string6StringPB4Hash13hash__combine(value, self);
}
__name(_M0MPB6Hasher7combineGsE, "_M0MPB6Hasher7combineGsE");
function _M0IPC15tuple6Tuple2PB2Eq5equalGsRP39dowdiness6lambda3ast4TermE(self, other) {
  return self._0 === other._0 && _M0IP39dowdiness6lambda3ast4TermPB2Eq5equal(self._1, other._1);
}
__name(_M0IPC15tuple6Tuple2PB2Eq5equalGsRP39dowdiness6lambda3ast4TermE, "_M0IPC15tuple6Tuple2PB2Eq5equalGsRP39dowdiness6lambda3ast4TermE");
function _M0IP016_24default__implPB2Eq10not__equalGRP39dowdiness6lambda5token5TokenE(x, y) {
  return !_M0IP39dowdiness6lambda5token5TokenPB2Eq5equal(x, y);
}
__name(_M0IP016_24default__implPB2Eq10not__equalGRP39dowdiness6lambda5token5TokenE, "_M0IP016_24default__implPB2Eq10not__equalGRP39dowdiness6lambda5token5TokenE");
function _M0IP016_24default__implPB2Eq10not__equalGRPC16string10StringViewE(x, y) {
  return !_M0IPC16string10StringViewPB2Eq5equal(x, y);
}
__name(_M0IP016_24default__implPB2Eq10not__equalGRPC16string10StringViewE, "_M0IP016_24default__implPB2Eq10not__equalGRPC16string10StringViewE");
function _M0IP016_24default__implPB2Eq10not__equalGRP29dowdiness4seam7RawKindE(x, y) {
  return !(x === y);
}
__name(_M0IP016_24default__implPB2Eq10not__equalGRP29dowdiness4seam7RawKindE, "_M0IP016_24default__implPB2Eq10not__equalGRP29dowdiness4seam7RawKindE");
function _M0IP016_24default__implPB7Compare6op__ltGlE(x, y) {
  return _M0IPC15int645Int64PB7Compare7compare(x, y) < 0;
}
__name(_M0IP016_24default__implPB7Compare6op__ltGlE, "_M0IP016_24default__implPB7Compare6op__ltGlE");
function _M0IP016_24default__implPB7Compare6op__gtGlE(x, y) {
  return _M0IPC15int645Int64PB7Compare7compare(x, y) > 0;
}
__name(_M0IP016_24default__implPB7Compare6op__gtGlE, "_M0IP016_24default__implPB7Compare6op__gtGlE");
function _M0IP016_24default__implPB7Compare6op__leGkE(x, y) {
  return $compare_int(x, y) <= 0;
}
__name(_M0IP016_24default__implPB7Compare6op__leGkE, "_M0IP016_24default__implPB7Compare6op__leGkE");
function _M0IP016_24default__implPB7Compare6op__leGlE(x, y) {
  return _M0IPC15int645Int64PB7Compare7compare(x, y) <= 0;
}
__name(_M0IP016_24default__implPB7Compare6op__leGlE, "_M0IP016_24default__implPB7Compare6op__leGlE");
function _M0IP016_24default__implPB7Compare6op__geGlE(x, y) {
  return _M0IPC15int645Int64PB7Compare7compare(x, y) >= 0;
}
__name(_M0IP016_24default__implPB7Compare6op__geGlE, "_M0IP016_24default__implPB7Compare6op__geGlE");
function _M0IP016_24default__implPB7Compare6op__geGkE(x, y) {
  return $compare_int(x, y) >= 0;
}
__name(_M0IP016_24default__implPB7Compare6op__geGkE, "_M0IP016_24default__implPB7Compare6op__geGkE");
function _M0MPB6Hasher9avalanche(self) {
  let acc = self.acc;
  acc = acc ^ (acc >>> 15 | 0);
  acc = Math.imul(acc, -2048144777) | 0;
  acc = acc ^ (acc >>> 13 | 0);
  acc = Math.imul(acc, -1028477379) | 0;
  acc = acc ^ (acc >>> 16 | 0);
  return acc;
}
__name(_M0MPB6Hasher9avalanche, "_M0MPB6Hasher9avalanche");
function _M0MPB6Hasher8finalize(self) {
  return _M0MPB6Hasher9avalanche(self);
}
__name(_M0MPB6Hasher8finalize, "_M0MPB6Hasher8finalize");
function _M0MPB6Hasher11new_2einner(seed) {
  return new _M0TPB6Hasher((seed >>> 0) + (374761393 >>> 0) | 0);
}
__name(_M0MPB6Hasher11new_2einner, "_M0MPB6Hasher11new_2einner");
function _M0MPB6Hasher3new(seed$46$opt) {
  let seed;
  if (seed$46$opt === void 0) {
    seed = _M0FPB4seed;
  } else {
    const _Some = seed$46$opt;
    seed = _Some;
  }
  return _M0MPB6Hasher11new_2einner(seed);
}
__name(_M0MPB6Hasher3new, "_M0MPB6Hasher3new");
function _M0IP016_24default__implPB4Hash4hashGsE(self) {
  const h = _M0MPB6Hasher3new(void 0);
  _M0MPB6Hasher7combineGsE(h, self);
  return _M0MPB6Hasher8finalize(h);
}
__name(_M0IP016_24default__implPB4Hash4hashGsE, "_M0IP016_24default__implPB4Hash4hashGsE");
function _M0MPC16string6String11sub_2einner(self, start, end) {
  const len = self.length;
  let end$2;
  if (end === void 0) {
    end$2 = len;
  } else {
    const _Some = end;
    const _end = _Some;
    end$2 = _end < 0 ? len + _end | 0 : _end;
  }
  const start$2 = start < 0 ? len + start | 0 : start;
  if (start$2 >= 0 && (start$2 <= end$2 && end$2 <= len)) {
    if (start$2 < len) {
      if (!_M0MPC16uint166UInt1623is__trailing__surrogate(self.charCodeAt(start$2))) {
      } else {
        $panic();
      }
    }
    if (end$2 < len) {
      if (!_M0MPC16uint166UInt1623is__trailing__surrogate(self.charCodeAt(end$2))) {
      } else {
        $panic();
      }
    }
    return new _M0TPC16string10StringView(self, start$2, end$2);
  } else {
    return $panic();
  }
}
__name(_M0MPC16string6String11sub_2einner, "_M0MPC16string6String11sub_2einner");
function _M0IP016_24default__implPB6Logger16write__substringGRPB13StringBuilderE(self, value, start, len) {
  _M0IPB13StringBuilderPB6Logger11write__view(self, _M0MPC16string6String11sub_2einner(value, start, start + len | 0));
}
__name(_M0IP016_24default__implPB6Logger16write__substringGRPB13StringBuilderE, "_M0IP016_24default__implPB6Logger16write__substringGRPB13StringBuilderE");
function _M0IP016_24default__implPB4Show10to__stringGRPB9SourceLocE(self) {
  const logger = _M0MPB13StringBuilder11new_2einner(0);
  _M0IPB9SourceLocPB4Show6output(self, { self: logger, method_table: _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger });
  return logger.val;
}
__name(_M0IP016_24default__implPB4Show10to__stringGRPB9SourceLocE, "_M0IP016_24default__implPB4Show10to__stringGRPB9SourceLocE");
function _M0IP016_24default__implPB4Show10to__stringGRP39dowdiness6lambda6syntax10SyntaxKindE(self) {
  const logger = _M0MPB13StringBuilder11new_2einner(0);
  _M0IP39dowdiness6lambda6syntax10SyntaxKindPB4Show6output(self, { self: logger, method_table: _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger });
  return logger.val;
}
__name(_M0IP016_24default__implPB4Show10to__stringGRP39dowdiness6lambda6syntax10SyntaxKindE, "_M0IP016_24default__implPB4Show10to__stringGRP39dowdiness6lambda6syntax10SyntaxKindE");
function _M0IP016_24default__implPB4Show10to__stringGiE(self) {
  const logger = _M0MPB13StringBuilder11new_2einner(0);
  _M0IPC13int3IntPB4Show6output(self, { self: logger, method_table: _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger });
  return logger.val;
}
__name(_M0IP016_24default__implPB4Show10to__stringGiE, "_M0IP016_24default__implPB4Show10to__stringGiE");
function _M0MPB4Iter4nextGUsRPB4JsonEE(self) {
  const _func = self;
  return _func();
}
__name(_M0MPB4Iter4nextGUsRPB4JsonEE, "_M0MPB4Iter4nextGUsRPB4JsonEE");
function _M0MPC13int3Int18to__string_2einner(self, radix) {
  return _M0FPB19int__to__string__js(self, radix);
}
__name(_M0MPC13int3Int18to__string_2einner, "_M0MPC13int3Int18to__string_2einner");
function _M0MPC16string10StringView12view_2einner(self, start_offset, end_offset) {
  let end_offset$2;
  if (end_offset === void 0) {
    end_offset$2 = self.end - self.start | 0;
  } else {
    const _Some = end_offset;
    end_offset$2 = _Some;
  }
  return start_offset >= 0 && (start_offset <= end_offset$2 && end_offset$2 <= (self.end - self.start | 0)) ? new _M0TPC16string10StringView(self.str, self.start + start_offset | 0, self.start + end_offset$2 | 0) : _M0FPB5abortGRP39dowdiness6canopy10projection9SourceMapE("Invalid index for View", "@moonbitlang/core/builtin:stringview.mbt:113:5-113:36");
}
__name(_M0MPC16string10StringView12view_2einner, "_M0MPC16string10StringView12view_2einner");
function _M0MPC15array10FixedArray18blit__from__string(self, bytes_offset, str, str_offset, length) {
  const e1 = (bytes_offset + (Math.imul(length, 2) | 0) | 0) - 1 | 0;
  const e2 = (str_offset + length | 0) - 1 | 0;
  const len1 = self.length;
  const len2 = str.length;
  if (length >= 0 && (bytes_offset >= 0 && (e1 < len1 && (str_offset >= 0 && e2 < len2)))) {
    const end_str_offset = str_offset + length | 0;
    let _tmp = str_offset;
    let _tmp$2 = bytes_offset;
    while (true) {
      const i = _tmp;
      const j = _tmp$2;
      if (i < end_str_offset) {
        const c = str.charCodeAt(i);
        const _p = c & 255;
        $bound_check(self, j);
        self[j] = _p & 255;
        const _tmp$3 = j + 1 | 0;
        const _p$2 = c >>> 8 | 0;
        $bound_check(self, _tmp$3);
        self[_tmp$3] = _p$2 & 255;
        _tmp = i + 1 | 0;
        _tmp$2 = j + 2 | 0;
        continue;
      } else {
        return;
      }
    }
  } else {
    $panic();
    return;
  }
}
__name(_M0MPC15array10FixedArray18blit__from__string, "_M0MPC15array10FixedArray18blit__from__string");
function _M0IPC16string10StringViewPB4Show10to__string(self) {
  return self.str.substring(self.start, self.end);
}
__name(_M0IPC16string10StringViewPB4Show10to__string, "_M0IPC16string10StringViewPB4Show10to__string");
function _M0MPB5Iter23newGiRP39dowdiness4loom4core10DiagnosticGRP39dowdiness6lambda5token5TokenEE(f2) {
  return f2;
}
__name(_M0MPB5Iter23newGiRP39dowdiness4loom4core10DiagnosticGRP39dowdiness6lambda5token5TokenEE, "_M0MPB5Iter23newGiRP39dowdiness4loom4core10DiagnosticGRP39dowdiness6lambda5token5TokenEE");
function _M0IPC16string10StringViewPB2Eq5equal(self, other) {
  const len = self.end - self.start | 0;
  if (len === (other.end - other.start | 0)) {
    if (self.str === other.str && self.start === other.start) {
      return true;
    }
    let _tmp = 0;
    while (true) {
      const i = _tmp;
      if (i < len) {
        const _p = self.str.charCodeAt(self.start + i | 0);
        const _p$2 = other.str.charCodeAt(other.start + i | 0);
        if (_p === _p$2) {
        } else {
          return false;
        }
        _tmp = i + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    return true;
  } else {
    return false;
  }
}
__name(_M0IPC16string10StringViewPB2Eq5equal, "_M0IPC16string10StringViewPB2Eq5equal");
function _M0MPC16string6String12view_2einner(self, start_offset, end_offset) {
  let end_offset$2;
  if (end_offset === void 0) {
    end_offset$2 = self.length;
  } else {
    const _Some = end_offset;
    end_offset$2 = _Some;
  }
  return start_offset >= 0 && (start_offset <= end_offset$2 && end_offset$2 <= self.length) ? new _M0TPC16string10StringView(self, start_offset, end_offset$2) : _M0FPB5abortGRP39dowdiness6canopy10projection9SourceMapE("Invalid index for View", "@moonbitlang/core/builtin:stringview.mbt:399:5-399:36");
}
__name(_M0MPC16string6String12view_2einner, "_M0MPC16string6String12view_2einner");
function _M0MPC16string6String4view(self, start_offset$46$opt, end_offset) {
  let start_offset;
  if (start_offset$46$opt === void 0) {
    start_offset = 0;
  } else {
    const _Some = start_offset$46$opt;
    start_offset = _Some;
  }
  return _M0MPC16string6String12view_2einner(self, start_offset, end_offset);
}
__name(_M0MPC16string6String4view, "_M0MPC16string6String4view");
function _M0MPC16string6String24char__length__eq_2einner(self, len, start_offset, end_offset) {
  let end_offset$2;
  if (end_offset === void 0) {
    end_offset$2 = self.length;
  } else {
    const _Some = end_offset;
    end_offset$2 = _Some;
  }
  let _tmp = start_offset;
  let _tmp$2 = 0;
  while (true) {
    const index = _tmp;
    const count = _tmp$2;
    if (index < end_offset$2 && count < len) {
      const c1 = self.charCodeAt(index);
      if (_M0MPC16uint166UInt1622is__leading__surrogate(c1) && (index + 1 | 0) < end_offset$2) {
        const c2 = self.charCodeAt(index + 1 | 0);
        if (_M0MPC16uint166UInt1623is__trailing__surrogate(c2)) {
          _tmp = index + 2 | 0;
          _tmp$2 = count + 1 | 0;
          continue;
        } else {
          _M0FPB5abortGuE("invalid surrogate pair", "@moonbitlang/core/builtin:string.mbt:426:9-426:40");
        }
      }
      _tmp = index + 1 | 0;
      _tmp$2 = count + 1 | 0;
      continue;
    } else {
      return count === len && index === end_offset$2;
    }
  }
}
__name(_M0MPC16string6String24char__length__eq_2einner, "_M0MPC16string6String24char__length__eq_2einner");
function _M0MPC16string6String24char__length__ge_2einner(self, len, start_offset, end_offset) {
  let end_offset$2;
  if (end_offset === void 0) {
    end_offset$2 = self.length;
  } else {
    const _Some = end_offset;
    end_offset$2 = _Some;
  }
  let _tmp = start_offset;
  let _tmp$2 = 0;
  while (true) {
    const index = _tmp;
    const count = _tmp$2;
    if (index < end_offset$2 && count < len) {
      const c1 = self.charCodeAt(index);
      if (_M0MPC16uint166UInt1622is__leading__surrogate(c1) && (index + 1 | 0) < end_offset$2) {
        const c2 = self.charCodeAt(index + 1 | 0);
        if (_M0MPC16uint166UInt1623is__trailing__surrogate(c2)) {
          _tmp = index + 2 | 0;
          _tmp$2 = count + 1 | 0;
          continue;
        } else {
          _M0FPB5abortGuE("invalid surrogate pair", "@moonbitlang/core/builtin:string.mbt:454:9-454:40");
        }
      }
      _tmp = index + 1 | 0;
      _tmp$2 = count + 1 | 0;
      continue;
    } else {
      return count >= len;
    }
  }
}
__name(_M0MPC16string6String24char__length__ge_2einner, "_M0MPC16string6String24char__length__ge_2einner");
function _M0MPC16string6String31offset__of__nth__char__backward(self, n, start_offset, end_offset) {
  let char_count = 0;
  let utf16_offset = end_offset;
  while (true) {
    if ((utf16_offset - 1 | 0) >= start_offset && char_count < n) {
      const c = self.charCodeAt(utf16_offset - 1 | 0);
      if (_M0MPC16uint166UInt1623is__trailing__surrogate(c)) {
        utf16_offset = utf16_offset - 2 | 0;
      } else {
        utf16_offset = utf16_offset - 1 | 0;
      }
      char_count = char_count + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return char_count < n || utf16_offset < start_offset ? void 0 : utf16_offset;
}
__name(_M0MPC16string6String31offset__of__nth__char__backward, "_M0MPC16string6String31offset__of__nth__char__backward");
function _M0MPC16string6String30offset__of__nth__char__forward(self, n, start_offset, end_offset) {
  if (start_offset >= 0 && start_offset <= end_offset) {
    let utf16_offset = start_offset;
    let char_count = 0;
    while (true) {
      if (utf16_offset < end_offset && char_count < n) {
        const c = self.charCodeAt(utf16_offset);
        if (_M0MPC16uint166UInt1622is__leading__surrogate(c)) {
          utf16_offset = utf16_offset + 2 | 0;
        } else {
          utf16_offset = utf16_offset + 1 | 0;
        }
        char_count = char_count + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    return char_count < n || utf16_offset >= end_offset ? void 0 : utf16_offset;
  } else {
    return _M0FPB5abortGOiE("Invalid start index", "@moonbitlang/core/builtin:string.mbt:329:5-329:33");
  }
}
__name(_M0MPC16string6String30offset__of__nth__char__forward, "_M0MPC16string6String30offset__of__nth__char__forward");
function _M0MPC16string6String29offset__of__nth__char_2einner(self, i, start_offset, end_offset) {
  let end_offset$2;
  if (end_offset === void 0) {
    end_offset$2 = self.length;
  } else {
    const _Some = end_offset;
    end_offset$2 = _Some;
  }
  return i >= 0 ? _M0MPC16string6String30offset__of__nth__char__forward(self, i, start_offset, end_offset$2) : _M0MPC16string6String31offset__of__nth__char__backward(self, -i | 0, start_offset, end_offset$2);
}
__name(_M0MPC16string6String29offset__of__nth__char_2einner, "_M0MPC16string6String29offset__of__nth__char_2einner");
function _M0IPB13StringBuilderPB6Logger11write__view(self, str) {
  self.val = `${self.val}${_M0IPC16string10StringViewPB4Show10to__string(str)}`;
}
__name(_M0IPB13StringBuilderPB6Logger11write__view, "_M0IPB13StringBuilderPB6Logger11write__view");
function _M0MPC15array5Array4pushGsE(self, value) {
  _M0MPB7JSArray4push(self, value);
}
__name(_M0MPC15array5Array4pushGsE, "_M0MPC15array5Array4pushGsE");
function _M0MPC15array5Array4pushGRP39dowdiness6lambda3ast3BopE(self, value) {
  _M0MPB7JSArray4push(self, value);
}
__name(_M0MPC15array5Array4pushGRP39dowdiness6lambda3ast3BopE, "_M0MPC15array5Array4pushGRP39dowdiness6lambda3ast3BopE");
function _M0IPC14char4CharPB4Show10to__string(self) {
  return String.fromCodePoint(self);
}
__name(_M0IPC14char4CharPB4Show10to__string, "_M0IPC14char4CharPB4Show10to__string");
function _M0IPC13int3IntPB4Show6output(self, logger) {
  logger.method_table.method_0(logger.self, _M0MPC13int3Int18to__string_2einner(self, 10));
}
__name(_M0IPC13int3IntPB4Show6output, "_M0IPC13int3IntPB4Show6output");
function _M0MPC15array9ArrayView4iterGRP49dowdiness22event_2dgraph_2dwalker8internal4core5OpRunE(self) {
  const i = new _M0TPC13ref3RefGiE(0);
  const _p = /* @__PURE__ */ __name(() => {
    if (i.val < (self.end - self.start | 0)) {
      const elem = self.buf[self.start + i.val | 0];
      i.val = i.val + 1 | 0;
      return elem;
    } else {
      return void 0;
    }
  }, "_p");
  return _p;
}
__name(_M0MPC15array9ArrayView4iterGRP49dowdiness22event_2dgraph_2dwalker8internal4core5OpRunE, "_M0MPC15array9ArrayView4iterGRP49dowdiness22event_2dgraph_2dwalker8internal4core5OpRunE");
function _M0MPC15array5Array4iterGRP49dowdiness22event_2dgraph_2dwalker8internal4core5OpRunE(self) {
  return _M0MPC15array9ArrayView4iterGRP49dowdiness22event_2dgraph_2dwalker8internal4core5OpRunE(new _M0TPB9ArrayViewGRP49dowdiness22event_2dgraph_2dwalker8internal4core5OpRunE(self, 0, self.length));
}
__name(_M0MPC15array5Array4iterGRP49dowdiness22event_2dgraph_2dwalker8internal4core5OpRunE, "_M0MPC15array5Array4iterGRP49dowdiness22event_2dgraph_2dwalker8internal4core5OpRunE");
function _M0MPC15array9ArrayView5iter2GRP39dowdiness4loom4core10DiagnosticGRP39dowdiness6lambda5token5TokenEE(self) {
  const i = new _M0TPC13ref3RefGiE(0);
  return _M0MPB5Iter23newGiRP39dowdiness4loom4core10DiagnosticGRP39dowdiness6lambda5token5TokenEE(() => {
    if (i.val < (self.end - self.start | 0)) {
      const result = { _0: i.val, _1: self.buf[self.start + i.val | 0] };
      i.val = i.val + 1 | 0;
      return result;
    } else {
      return void 0;
    }
  });
}
__name(_M0MPC15array9ArrayView5iter2GRP39dowdiness4loom4core10DiagnosticGRP39dowdiness6lambda5token5TokenEE, "_M0MPC15array9ArrayView5iter2GRP39dowdiness4loom4core10DiagnosticGRP39dowdiness6lambda5token5TokenEE");
function _M0MPC15array9ArrayView2atGyE(self, index) {
  if (index >= 0 && index < (self.end - self.start | 0)) {
    const _tmp = self.buf;
    const _tmp$2 = self.start + index | 0;
    $bound_check(_tmp, _tmp$2);
    return _tmp[_tmp$2];
  } else {
    return _M0FPB5abortGyE(`index out of bounds: the len is from 0 to ${_M0IP016_24default__implPB4Show10to__stringGiE(self.end - self.start | 0)} but the index is ${_M0IP016_24default__implPB4Show10to__stringGiE(index)}`, "@moonbitlang/core/builtin:arrayview.mbt:135:5-137:6");
  }
}
__name(_M0MPC15array9ArrayView2atGyE, "_M0MPC15array9ArrayView2atGyE");
function _M0MPC15array10FixedArray12view_2einnerGyE(self, start, end) {
  const len = self.length;
  let end$2;
  if (end === void 0) {
    end$2 = len;
  } else {
    const _Some = end;
    const _end = _Some;
    end$2 = _end < 0 ? len + _end | 0 : _end;
  }
  const start$2 = start < 0 ? len + start | 0 : start;
  if (start$2 >= 0 && (start$2 <= end$2 && end$2 <= len)) {
    const _bind = self;
    const _bind$2 = end$2 - start$2 | 0;
    return new _M0TPB9ArrayViewGyE(_bind, start$2, start$2 + _bind$2 | 0);
  } else {
    return _M0FPB5abortGRP39dowdiness6canopy10projection9SourceMapE("View index out of bounds", "@moonbitlang/core/builtin:arrayview.mbt:451:5-451:38");
  }
}
__name(_M0MPC15array10FixedArray12view_2einnerGyE, "_M0MPC15array10FixedArray12view_2einnerGyE");
function _M0IPC16option6OptionPB2Eq5equalGcE(self, other) {
  if (self === -1) {
    return other === -1;
  } else {
    const _Some = self;
    const _x = _Some;
    if (other === -1) {
      return false;
    } else {
      const _Some$2 = other;
      const _y = _Some$2;
      return _x === _y;
    }
  }
}
__name(_M0IPC16option6OptionPB2Eq5equalGcE, "_M0IPC16option6OptionPB2Eq5equalGcE");
function _M0MPC15array5Array3setGRP49dowdiness22event_2dgraph_2dwalker8internal4core5OpRunE(self, index, value) {
  const len = self.length;
  if (index >= 0 && index < len) {
    $bound_check(self, index);
    self[index] = value;
    return;
  } else {
    $panic();
    return;
  }
}
__name(_M0MPC15array5Array3setGRP49dowdiness22event_2dgraph_2dwalker8internal4core5OpRunE, "_M0MPC15array5Array3setGRP49dowdiness22event_2dgraph_2dwalker8internal4core5OpRunE");
function _M0MPC13int3Int20next__power__of__two(self) {
  if (self >= 0) {
    if (self <= 1) {
      return 1;
    }
    if (self > 1073741824) {
      return 1073741824;
    }
    return (2147483647 >> (Math.clz32(self - 1 | 0) - 1 | 0)) + 1 | 0;
  } else {
    return $panic();
  }
}
__name(_M0MPC13int3Int20next__power__of__two, "_M0MPC13int3Int20next__power__of__two");
function _M0MPB3Map11new_2einnerGsRP39dowdiness6canopy5relay9RelayRoomE(capacity) {
  const capacity$2 = _M0MPC13int3Int20next__power__of__two(capacity);
  const _bind = capacity$2 - 1 | 0;
  const _bind$2 = (Math.imul(capacity$2, 13) | 0) / 16 | 0;
  const _bind$3 = $make_array_len_and_init(capacity$2, void 0);
  const _bind$4 = void 0;
  return new _M0TPB3MapGsRP39dowdiness6canopy5relay9RelayRoomE(_bind$3, 0, capacity$2, _bind, _bind$2, _bind$4, -1);
}
__name(_M0MPB3Map11new_2einnerGsRP39dowdiness6canopy5relay9RelayRoomE, "_M0MPB3Map11new_2einnerGsRP39dowdiness6canopy5relay9RelayRoomE");
function _M0MPB3Map20add__entry__to__tailGsRP39dowdiness6canopy6editor14EphemeralValueE(self, idx, entry) {
  const _bind = self.tail;
  if (_bind === -1) {
    self.head = entry;
  } else {
    const _tmp2 = self.entries;
    $bound_check(_tmp2, _bind);
    const _p = _tmp2[_bind];
    let _tmp$2;
    if (_p === void 0) {
      _tmp$2 = $panic();
    } else {
      const _p$2 = _p;
      _tmp$2 = _p$2;
    }
    _tmp$2.next = entry;
  }
  self.tail = idx;
  const _tmp = self.entries;
  $bound_check(_tmp, idx);
  _tmp[idx] = entry;
  self.size = self.size + 1 | 0;
}
__name(_M0MPB3Map20add__entry__to__tailGsRP39dowdiness6canopy6editor14EphemeralValueE, "_M0MPB3Map20add__entry__to__tailGsRP39dowdiness6canopy6editor14EphemeralValueE");
function _M0MPB3Map10set__entryGsRP39dowdiness6canopy5relay9RelayRoomE(self, entry, new_idx) {
  const _tmp = self.entries;
  $bound_check(_tmp, new_idx);
  _tmp[new_idx] = entry;
  const _bind = entry.next;
  if (_bind === void 0) {
    self.tail = new_idx;
    return;
  } else {
    const _Some = _bind;
    const _next = _Some;
    _next.prev = new_idx;
    return;
  }
}
__name(_M0MPB3Map10set__entryGsRP39dowdiness6canopy5relay9RelayRoomE, "_M0MPB3Map10set__entryGsRP39dowdiness6canopy5relay9RelayRoomE");
function _M0MPB3Map10push__awayGsRP39dowdiness6canopy6editor14EphemeralValueE(self, idx, entry) {
  let _tmp = entry.psl + 1 | 0;
  let _tmp$2 = idx + 1 & self.capacity_mask;
  let _tmp$3 = entry;
  while (true) {
    const psl = _tmp;
    const idx$2 = _tmp$2;
    const entry$2 = _tmp$3;
    const _tmp$4 = self.entries;
    $bound_check(_tmp$4, idx$2);
    const _bind = _tmp$4[idx$2];
    if (_bind === void 0) {
      entry$2.psl = psl;
      _M0MPB3Map10set__entryGsRP39dowdiness6canopy5relay9RelayRoomE(self, entry$2, idx$2);
      return;
    } else {
      const _Some = _bind;
      const _curr_entry = _Some;
      if (psl > _curr_entry.psl) {
        entry$2.psl = psl;
        _M0MPB3Map10set__entryGsRP39dowdiness6canopy5relay9RelayRoomE(self, entry$2, idx$2);
        _tmp = _curr_entry.psl + 1 | 0;
        _tmp$2 = idx$2 + 1 & self.capacity_mask;
        _tmp$3 = _curr_entry;
        continue;
      } else {
        _tmp = psl + 1 | 0;
        _tmp$2 = idx$2 + 1 & self.capacity_mask;
        continue;
      }
    }
  }
}
__name(_M0MPB3Map10push__awayGsRP39dowdiness6canopy6editor14EphemeralValueE, "_M0MPB3Map10push__awayGsRP39dowdiness6canopy6editor14EphemeralValueE");
function _M0MPB3Map15set__with__hashGsRP39dowdiness6canopy5relay9RelayRoomE(self, key, value, hash) {
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const psl = _tmp;
    const idx = _tmp$2;
    const _tmp$3 = self.entries;
    $bound_check(_tmp$3, idx);
    const _bind = _tmp$3[idx];
    if (_bind === void 0) {
      if (self.size >= self.grow_at) {
        _M0MPB3Map4growGsRP39dowdiness6canopy5relay9RelayRoomE(self);
        _tmp = 0;
        _tmp$2 = hash & self.capacity_mask;
        continue;
      }
      const _bind$2 = self.tail;
      const _bind$3 = void 0;
      const entry = new _M0TPB5EntryGsRP39dowdiness6canopy5relay9RelayRoomE(_bind$2, _bind$3, psl, hash, key, value);
      _M0MPB3Map20add__entry__to__tailGsRP39dowdiness6canopy6editor14EphemeralValueE(self, idx, entry);
      return void 0;
    } else {
      const _Some = _bind;
      const _curr_entry = _Some;
      if (_curr_entry.hash === hash && _curr_entry.key === key) {
        _curr_entry.value = value;
        return void 0;
      }
      if (psl > _curr_entry.psl) {
        if (self.size >= self.grow_at) {
          _M0MPB3Map4growGsRP39dowdiness6canopy5relay9RelayRoomE(self);
          _tmp = 0;
          _tmp$2 = hash & self.capacity_mask;
          continue;
        }
        _M0MPB3Map10push__awayGsRP39dowdiness6canopy6editor14EphemeralValueE(self, idx, _curr_entry);
        const _bind$2 = self.tail;
        const _bind$3 = void 0;
        const entry = new _M0TPB5EntryGsRP39dowdiness6canopy5relay9RelayRoomE(_bind$2, _bind$3, psl, hash, key, value);
        _M0MPB3Map20add__entry__to__tailGsRP39dowdiness6canopy6editor14EphemeralValueE(self, idx, entry);
        return void 0;
      }
      _tmp = psl + 1 | 0;
      _tmp$2 = idx + 1 & self.capacity_mask;
      continue;
    }
  }
}
__name(_M0MPB3Map15set__with__hashGsRP39dowdiness6canopy5relay9RelayRoomE, "_M0MPB3Map15set__with__hashGsRP39dowdiness6canopy5relay9RelayRoomE");
function _M0MPB3Map4growGsRP39dowdiness6canopy5relay9RelayRoomE(self) {
  const old_head = self.head;
  const new_capacity = self.capacity << 1;
  self.entries = $make_array_len_and_init(new_capacity, void 0);
  self.capacity = new_capacity;
  self.capacity_mask = new_capacity - 1 | 0;
  const _p = self.capacity;
  self.grow_at = (Math.imul(_p, 13) | 0) / 16 | 0;
  self.size = 0;
  self.head = void 0;
  self.tail = -1;
  let _tmp = old_head;
  while (true) {
    const _param = _tmp;
    if (_param === void 0) {
      return;
    } else {
      const _Some = _param;
      const _x = _Some;
      const _next = _x.next;
      const _key = _x.key;
      const _value = _x.value;
      const _hash = _x.hash;
      _M0MPB3Map15set__with__hashGsRP39dowdiness6canopy5relay9RelayRoomE(self, _key, _value, _hash);
      _tmp = _next;
      continue;
    }
  }
}
__name(_M0MPB3Map4growGsRP39dowdiness6canopy5relay9RelayRoomE, "_M0MPB3Map4growGsRP39dowdiness6canopy5relay9RelayRoomE");
function _M0MPB3Map3setGsRP39dowdiness6canopy5relay9RelayRoomE(self, key, value) {
  _M0MPB3Map15set__with__hashGsRP39dowdiness6canopy5relay9RelayRoomE(self, key, value, _M0IP016_24default__implPB4Hash4hashGsE(key));
}
__name(_M0MPB3Map3setGsRP39dowdiness6canopy5relay9RelayRoomE, "_M0MPB3Map3setGsRP39dowdiness6canopy5relay9RelayRoomE");
function _M0MPB3Map3getGsRP39dowdiness6canopy5relay9RelayRoomE(self, key) {
  const hash = _M0IP016_24default__implPB4Hash4hashGsE(key);
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const i = _tmp;
    const idx = _tmp$2;
    const _tmp$3 = self.entries;
    $bound_check(_tmp$3, idx);
    const _bind = _tmp$3[idx];
    if (_bind === void 0) {
      return void 0;
    } else {
      const _Some = _bind;
      const _entry = _Some;
      if (_entry.hash === hash && _entry.key === key) {
        return _entry.value;
      }
      if (i > _entry.psl) {
        return void 0;
      }
      _tmp = i + 1 | 0;
      _tmp$2 = idx + 1 & self.capacity_mask;
      continue;
    }
  }
}
__name(_M0MPB3Map3getGsRP39dowdiness6canopy5relay9RelayRoomE, "_M0MPB3Map3getGsRP39dowdiness6canopy5relay9RelayRoomE");
function _M0MPB3Map13remove__entryGsRP39dowdiness6canopy5relay9RelayRoomE(self, entry) {
  const _bind = entry.prev;
  if (_bind === -1) {
    self.head = entry.next;
  } else {
    const _tmp = self.entries;
    $bound_check(_tmp, _bind);
    const _p = _tmp[_bind];
    let _tmp$2;
    if (_p === void 0) {
      _tmp$2 = $panic();
    } else {
      const _p$2 = _p;
      _tmp$2 = _p$2;
    }
    _tmp$2.next = entry.next;
  }
  const _bind$2 = entry.next;
  if (_bind$2 === void 0) {
    self.tail = entry.prev;
    return;
  } else {
    const _Some = _bind$2;
    const _next = _Some;
    _next.prev = entry.prev;
    return;
  }
}
__name(_M0MPB3Map13remove__entryGsRP39dowdiness6canopy5relay9RelayRoomE, "_M0MPB3Map13remove__entryGsRP39dowdiness6canopy5relay9RelayRoomE");
function _M0MPB3Map11shift__backGsRP39dowdiness6canopy5relay9RelayRoomE(self, idx) {
  let _tmp = idx;
  while (true) {
    const idx$2 = _tmp;
    const next = idx$2 + 1 & self.capacity_mask;
    _L: {
      const _tmp$22 = self.entries;
      $bound_check(_tmp$22, next);
      const _bind = _tmp$22[next];
      if (_bind === void 0) {
        break _L;
      } else {
        const _Some = _bind;
        const _x = _Some;
        const _x$2 = _x.psl;
        if (_x$2 === 0) {
          break _L;
        } else {
          _x.psl = _x.psl - 1 | 0;
          _M0MPB3Map10set__entryGsRP39dowdiness6canopy5relay9RelayRoomE(self, _x, idx$2);
          _tmp = next;
          continue;
        }
      }
    }
    const _tmp$2 = self.entries;
    $bound_check(_tmp$2, idx$2);
    _tmp$2[idx$2] = void 0;
    return;
  }
}
__name(_M0MPB3Map11shift__backGsRP39dowdiness6canopy5relay9RelayRoomE, "_M0MPB3Map11shift__backGsRP39dowdiness6canopy5relay9RelayRoomE");
function _M0MPB3Map18remove__with__hashGsRP39dowdiness6canopy5relay9RelayRoomE(self, key, hash) {
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const i = _tmp;
    const idx = _tmp$2;
    const _tmp$3 = self.entries;
    $bound_check(_tmp$3, idx);
    const _bind = _tmp$3[idx];
    if (_bind === void 0) {
      return;
    } else {
      const _Some = _bind;
      const _entry = _Some;
      if (_entry.hash === hash && _entry.key === key) {
        _M0MPB3Map13remove__entryGsRP39dowdiness6canopy5relay9RelayRoomE(self, _entry);
        _M0MPB3Map11shift__backGsRP39dowdiness6canopy5relay9RelayRoomE(self, idx);
        self.size = self.size - 1 | 0;
        return;
      }
      if (i > _entry.psl) {
        return;
      }
      _tmp = i + 1 | 0;
      _tmp$2 = idx + 1 & self.capacity_mask;
      continue;
    }
  }
}
__name(_M0MPB3Map18remove__with__hashGsRP39dowdiness6canopy5relay9RelayRoomE, "_M0MPB3Map18remove__with__hashGsRP39dowdiness6canopy5relay9RelayRoomE");
function _M0MPB3Map6removeGsRP39dowdiness6canopy5relay9RelayRoomE(self, key) {
  _M0MPB3Map18remove__with__hashGsRP39dowdiness6canopy5relay9RelayRoomE(self, key, _M0IP016_24default__implPB4Hash4hashGsE(key));
}
__name(_M0MPB3Map6removeGsRP39dowdiness6canopy5relay9RelayRoomE, "_M0MPB3Map6removeGsRP39dowdiness6canopy5relay9RelayRoomE");
function _M0MPC15int645Int6423reinterpret__as__double(self) {
  return _M0MPB7MyInt6423reinterpret__as__double(self);
}
__name(_M0MPC15int645Int6423reinterpret__as__double, "_M0MPC15int645Int6423reinterpret__as__double");
function _M0MPB5Iter24nextGiRP39dowdiness4loom4core10DiagnosticGRP39dowdiness6lambda5token5TokenEE(self) {
  return _M0MPB4Iter4nextGUsRPB4JsonEE(self);
}
__name(_M0MPB5Iter24nextGiRP39dowdiness4loom4core10DiagnosticGRP39dowdiness6lambda5token5TokenEE, "_M0MPB5Iter24nextGiRP39dowdiness4loom4core10DiagnosticGRP39dowdiness6lambda5token5TokenEE");
function _M0MPC13int3Int8to__char(self) {
  _L: {
    if (self >= 0 && self <= 55295) {
      break _L;
    } else {
      if (self >= 57344 && self <= 1114111) {
        break _L;
      } else {
        return -1;
      }
    }
  }
  return self;
}
__name(_M0MPC13int3Int8to__char, "_M0MPC13int3Int8to__char");
function _M0MPB7MyInt6411add__hi__lo(self, bhi, blo) {
  const _ahi = self.hi;
  const _alo = self.lo;
  const lo = _alo + blo | 0;
  const s = lo >> 31;
  const as_ = _alo >> 31;
  const bs = blo >> 31;
  const c = (as_ & bs | ~s & (as_ ^ bs)) & 1;
  const hi = (_ahi + bhi | 0) + c | 0;
  return new _M0TPB7MyInt64(hi, lo);
}
__name(_M0MPB7MyInt6411add__hi__lo, "_M0MPB7MyInt6411add__hi__lo");
function _M0IPB7MyInt64PB3Add3add(self, other) {
  return _M0MPB7MyInt6411add__hi__lo(self, other.hi, other.lo);
}
__name(_M0IPB7MyInt64PB3Add3add, "_M0IPB7MyInt64PB3Add3add");
function _M0IPB7MyInt64PB3Sub3sub(self, other) {
  return other.lo === 0 ? new _M0TPB7MyInt64(self.hi - other.hi | 0, self.lo) : _M0MPB7MyInt6411add__hi__lo(self, ~other.hi, ~other.lo + 1 | 0);
}
__name(_M0IPB7MyInt64PB3Sub3sub, "_M0IPB7MyInt64PB3Sub3sub");
function _M0IPB7MyInt64PB3Mul3mul(self, other) {
  const _ahi = self.hi;
  const _alo = self.lo;
  const _bhi = other.hi;
  const _blo = other.lo;
  const ahi = _ahi;
  const alo = _alo;
  const bhi = _bhi;
  const blo = _blo;
  const a48 = ahi >>> 16 | 0;
  const a32 = ahi & 65535;
  const a16 = alo >>> 16 | 0;
  const a00 = alo & 65535;
  const b48 = bhi >>> 16 | 0;
  const b32 = bhi & 65535;
  const b16 = blo >>> 16 | 0;
  const b00 = blo & 65535;
  const c00 = Math.imul(a00, b00) | 0;
  const c16 = c00 >>> 16 | 0;
  const c00$2 = c00 & 65535;
  const c16$2 = (c16 >>> 0) + ((Math.imul(a16, b00) | 0) >>> 0) | 0;
  const c32 = c16$2 >>> 16 | 0;
  const c16$3 = c16$2 & 65535;
  const c16$4 = (c16$3 >>> 0) + ((Math.imul(a00, b16) | 0) >>> 0) | 0;
  const c32$2 = (c32 >>> 0) + ((c16$4 >>> 16 | 0) >>> 0) | 0;
  const c16$5 = c16$4 & 65535;
  const c32$3 = (c32$2 >>> 0) + ((Math.imul(a32, b00) | 0) >>> 0) | 0;
  const c48 = c32$3 >>> 16 | 0;
  const c32$4 = c32$3 & 65535;
  const c32$5 = (c32$4 >>> 0) + ((Math.imul(a16, b16) | 0) >>> 0) | 0;
  const c48$2 = (c48 >>> 0) + ((c32$5 >>> 16 | 0) >>> 0) | 0;
  const c32$6 = c32$5 & 65535;
  const c32$7 = (c32$6 >>> 0) + ((Math.imul(a00, b32) | 0) >>> 0) | 0;
  const c48$3 = (c48$2 >>> 0) + ((c32$7 >>> 16 | 0) >>> 0) | 0;
  const c32$8 = c32$7 & 65535;
  const c48$4 = (((((((c48$3 >>> 0) + ((Math.imul(a48, b00) | 0) >>> 0) | 0) >>> 0) + ((Math.imul(a32, b16) | 0) >>> 0) | 0) >>> 0) + ((Math.imul(a16, b32) | 0) >>> 0) | 0) >>> 0) + ((Math.imul(a00, b48) | 0) >>> 0) | 0;
  const c48$5 = c48$4 & 65535;
  return new _M0TPB7MyInt64(c48$5 << 16 | c32$8, c16$5 << 16 | c00$2);
}
__name(_M0IPB7MyInt64PB3Mul3mul, "_M0IPB7MyInt64PB3Mul3mul");
function _M0FPB29try__get__int64__wasm__helper() {
  if (_M0FPB19wasm__helper__cache.tried) {
    const _bind2 = _M0FPB19wasm__helper__cache.exports;
    return !(_bind2 === void 0);
  }
  _M0FPB19wasm__helper__cache.tried = true;
  _M0FPB19wasm__helper__cache.exports = _M0FPB23try__init__wasm__helper();
  const _bind = _M0FPB19wasm__helper__cache.exports;
  return !(_bind === void 0);
}
__name(_M0FPB29try__get__int64__wasm__helper, "_M0FPB29try__get__int64__wasm__helper");
function _M0IPB7MyInt64PB3Div3div(self, other) {
  if (!(other.hi === 0 && other.lo === 0)) {
    if (!_M0FPB29try__get__int64__wasm__helper()) {
      return _M0MPB7MyInt6411div__bigint(self, other);
    }
    const _bind = _M0FPB19wasm__helper__cache.exports;
    if (_bind === void 0) {
      return $panic();
    } else {
      const _Some = _bind;
      const _exports = _Some;
      const _ahi = self.hi;
      const _alo = self.lo;
      const _bhi = other.hi;
      const _blo = other.lo;
      const _func = _exports.div_s;
      const lo = _func(_alo, _ahi, _blo, _bhi);
      const _func$2 = _exports.get_high;
      const hi = _func$2();
      return new _M0TPB7MyInt64(hi, lo);
    }
  } else {
    return $panic();
  }
}
__name(_M0IPB7MyInt64PB3Div3div, "_M0IPB7MyInt64PB3Div3div");
function _M0MPB7MyInt643lsl(self, shift) {
  const shift$2 = shift & 63;
  if (shift$2 === 0) {
    return self;
  } else {
    if (shift$2 < 32) {
      const _hi = self.hi;
      const _lo = self.lo;
      const hi = _hi;
      const lo = _lo;
      const hi$2 = hi << shift$2 | (lo >>> (32 - shift$2 | 0) | 0);
      const lo$2 = lo << shift$2;
      return new _M0TPB7MyInt64(hi$2, lo$2);
    } else {
      return new _M0TPB7MyInt64(self.lo << (shift$2 - 32 | 0), 0);
    }
  }
}
__name(_M0MPB7MyInt643lsl, "_M0MPB7MyInt643lsl");
function _M0IPC15int645Int64PB3Add3add(self, other) {
  return _M0IPB7MyInt64PB3Add3add(self, other);
}
__name(_M0IPC15int645Int64PB3Add3add, "_M0IPC15int645Int64PB3Add3add");
function _M0IPC15int645Int64PB3Sub3sub(self, other) {
  return _M0IPB7MyInt64PB3Sub3sub(self, other);
}
__name(_M0IPC15int645Int64PB3Sub3sub, "_M0IPC15int645Int64PB3Sub3sub");
function _M0IPC15int645Int64PB3Mul3mul(self, other) {
  return _M0IPB7MyInt64PB3Mul3mul(self, other);
}
__name(_M0IPC15int645Int64PB3Mul3mul, "_M0IPC15int645Int64PB3Mul3mul");
function _M0IPC15int645Int64PB3Div3div(self, other) {
  return _M0IPB7MyInt64PB3Div3div(self, other);
}
__name(_M0IPC15int645Int64PB3Div3div, "_M0IPC15int645Int64PB3Div3div");
function _M0IPC15int645Int64PB7Compare7compare(self, other) {
  return _M0MPB7MyInt647compare(self, other);
}
__name(_M0IPC15int645Int64PB7Compare7compare, "_M0IPC15int645Int64PB7Compare7compare");
function _M0MPC15int645Int647to__int(self) {
  const _p = self;
  return _p.lo;
}
__name(_M0MPC15int645Int647to__int, "_M0MPC15int645Int647to__int");
function _M0IPC16uint646UInt64PB3Shl3shl(self, shift) {
  return _M0MPB7MyInt643lsl(self, shift);
}
__name(_M0IPC16uint646UInt64PB3Shl3shl, "_M0IPC16uint646UInt64PB3Shl3shl");
function _M0MPB6Hasher15combine__string(self, value) {
  const _bind = value.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind) {
      _M0MPB6Hasher13combine__uint(self, value.charCodeAt(i));
      _tmp = i + 1 | 0;
      continue;
    } else {
      return;
    }
  }
}
__name(_M0MPB6Hasher15combine__string, "_M0MPB6Hasher15combine__string");
function _M0IPC16string6StringPB4Hash13hash__combine(self, hasher) {
  _M0MPB6Hasher15combine__string(hasher, self);
}
__name(_M0IPC16string6StringPB4Hash13hash__combine, "_M0IPC16string6StringPB4Hash13hash__combine");
function _M0MPC15bytes5Bytes5makei(length, value) {
  if (length <= 0) {
    return $bytes_literal$0;
  }
  const arr = $makebytes(length, value(0));
  let _tmp = 1;
  while (true) {
    const i = _tmp;
    if (i < length) {
      $bound_check(arr, i);
      arr[i] = value(i);
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return arr;
}
__name(_M0MPC15bytes5Bytes5makei, "_M0MPC15bytes5Bytes5makei");
function _M0MPC15array10FixedArray17blit__from__bytes(self, bytes_offset, src, src_offset, length) {
  const e1 = (bytes_offset + length | 0) - 1 | 0;
  const e2 = (src_offset + length | 0) - 1 | 0;
  const len1 = self.length;
  const len2 = src.length;
  if (length >= 0 && (bytes_offset >= 0 && (e1 < len1 && (src_offset >= 0 && e2 < len2)))) {
    _M0MPC15array10FixedArray12unsafe__blitGyE(self, bytes_offset, src, src_offset, length);
    return;
  } else {
    $panic();
    return;
  }
}
__name(_M0MPC15array10FixedArray17blit__from__bytes, "_M0MPC15array10FixedArray17blit__from__bytes");
function _M0MPC15bytes5Bytes11from__array(arr) {
  return _M0MPC15bytes5Bytes5makei(arr.end - arr.start | 0, (i) => _M0MPC15array9ArrayView2atGyE(arr, i));
}
__name(_M0MPC15bytes5Bytes11from__array, "_M0MPC15bytes5Bytes11from__array");
function _M0IPB13SourceLocReprPB4Show6output(self, logger) {
  const pkg = self.pkg;
  const _data = pkg.str;
  const _start = pkg.start;
  const _end = _start + (pkg.end - pkg.start | 0) | 0;
  let _cursor = _start;
  let accept_state = -1;
  let match_end = -1;
  let match_tag_saver_0 = -1;
  let tag_0 = -1;
  let _bind;
  _L: {
    _L$2: {
      _L$3:
        while (true) {
          if (_cursor < _end) {
            const _p = _cursor;
            const next_char = _data.charCodeAt(_p);
            _cursor = _cursor + 1 | 0;
            if (next_char === 47) {
              _L$4:
                while (true) {
                  tag_0 = _cursor;
                  if (_cursor < _end) {
                    const _p$2 = _cursor;
                    const next_char$2 = _data.charCodeAt(_p$2);
                    _cursor = _cursor + 1 | 0;
                    if (next_char$2 === 47) {
                      while (true) {
                        if (_cursor < _end) {
                          _cursor = _cursor + 1 | 0;
                          continue;
                        } else {
                          match_tag_saver_0 = tag_0;
                          accept_state = 0;
                          match_end = _cursor;
                          break _L$2;
                        }
                      }
                    } else {
                      continue;
                    }
                  } else {
                    break _L$2;
                  }
                }
            } else {
              continue;
            }
          } else {
            break _L$2;
          }
        }
      break _L;
    }
    if (accept_state === 0) {
      const package_name = _M0MPC16string6String4view(_data, match_tag_saver_0 + 1 | 0, match_end);
      const module_name = _M0MPC16string6String4view(_data, _start, match_tag_saver_0);
      _bind = { _0: module_name, _1: package_name };
    } else {
      _bind = { _0: pkg, _1: void 0 };
    }
  }
  const _module_name = _bind._0;
  const _package_name = _bind._1;
  if (_package_name === void 0) {
  } else {
    const _Some = _package_name;
    const _pkg_name = _Some;
    logger.method_table.method_2(logger.self, _pkg_name);
    logger.method_table.method_3(logger.self, 47);
  }
  logger.method_table.method_2(logger.self, self.filename);
  logger.method_table.method_3(logger.self, 58);
  logger.method_table.method_2(logger.self, self.start_line);
  logger.method_table.method_3(logger.self, 58);
  logger.method_table.method_2(logger.self, self.start_column);
  logger.method_table.method_3(logger.self, 45);
  logger.method_table.method_2(logger.self, self.end_line);
  logger.method_table.method_3(logger.self, 58);
  logger.method_table.method_2(logger.self, self.end_column);
  logger.method_table.method_3(logger.self, 64);
  logger.method_table.method_2(logger.self, _module_name);
}
__name(_M0IPB13SourceLocReprPB4Show6output, "_M0IPB13SourceLocReprPB4Show6output");
function _M0IPB9SourceLocPB4Show6output(self, logger) {
  _M0IPB13SourceLocReprPB4Show6output(_M0MPB13SourceLocRepr5parse(self), logger);
}
__name(_M0IPB9SourceLocPB4Show6output, "_M0IPB9SourceLocPB4Show6output");
function _M0MPC15array5Array11unsafe__popGRPC14json10WriteFrameE(self) {
  return _M0MPB7JSArray3pop(self);
}
__name(_M0MPC15array5Array11unsafe__popGRPC14json10WriteFrameE, "_M0MPC15array5Array11unsafe__popGRPC14json10WriteFrameE");
function _M0MPC15array5Array3popGRPC14json10WriteFrameE(self) {
  if (self.length === 0) {
    return void 0;
  } else {
    const v = _M0MPC15array5Array11unsafe__popGRPC14json10WriteFrameE(self);
    return v;
  }
}
__name(_M0MPC15array5Array3popGRPC14json10WriteFrameE, "_M0MPC15array5Array3popGRPC14json10WriteFrameE");
function _M0MPC15array5Array5drainGRP39dowdiness4loom4core11CursorFrameE(self, begin, end) {
  return begin >= 0 && (end <= self.length && begin <= end) ? _M0MPB7JSArray6splice(self, begin, end - begin | 0) : _M0FPB5abortGORP39dowdiness6canopy10projection8ProjNodeE(`index out of bounds: the len is ${_M0IP016_24default__implPB4Show10to__stringGiE(self.length)} but the index is (${_M0IP016_24default__implPB4Show10to__stringGiE(begin)}, ${_M0IP016_24default__implPB4Show10to__stringGiE(end)})`, "@moonbitlang/core/builtin:arraycore_js.mbt:278:5-280:6");
}
__name(_M0MPC15array5Array5drainGRP39dowdiness4loom4core11CursorFrameE, "_M0MPC15array5Array5drainGRP39dowdiness4loom4core11CursorFrameE");
function _M0IPC15array5ArrayPB2Eq5equalGUsRP39dowdiness6lambda3ast4TermEE(self, other) {
  const self_len = self.length;
  const other_len = other.length;
  if (self_len === other_len) {
    let _tmp = 0;
    while (true) {
      const i = _tmp;
      if (i < self_len) {
        if (_M0IPC15tuple6Tuple2PB2Eq5equalGsRP39dowdiness6lambda3ast4TermE(self[i], other[i])) {
        } else {
          return false;
        }
        _tmp = i + 1 | 0;
        continue;
      } else {
        return true;
      }
    }
  } else {
    return false;
  }
}
__name(_M0IPC15array5ArrayPB2Eq5equalGUsRP39dowdiness6lambda3ast4TermEE, "_M0IPC15array5ArrayPB2Eq5equalGUsRP39dowdiness6lambda3ast4TermEE");
function _M0MPC15array5Array5iter2GRP39dowdiness4loom4core10DiagnosticGRP39dowdiness6lambda5token5TokenEE(self) {
  return _M0MPC15array9ArrayView5iter2GRP39dowdiness4loom4core10DiagnosticGRP39dowdiness6lambda5token5TokenEE(new _M0TPB9ArrayViewGRP39dowdiness4loom4core10DiagnosticGRP39dowdiness6lambda5token5TokenEE(self, 0, self.length));
}
__name(_M0MPC15array5Array5iter2GRP39dowdiness4loom4core10DiagnosticGRP39dowdiness6lambda5token5TokenEE, "_M0MPC15array5Array5iter2GRP39dowdiness4loom4core10DiagnosticGRP39dowdiness6lambda5token5TokenEE");
function _M0MPC16buffer6Buffer19grow__if__necessary(self, required) {
  const start = self.data.length <= 0 ? 1 : self.data.length;
  let enough_space;
  let _tmp = start;
  while (true) {
    const space = _tmp;
    if (space >= required) {
      enough_space = space;
      break;
    }
    _tmp = Math.imul(space, 2) | 0;
    continue;
  }
  if (enough_space !== self.data.length) {
    const new_data = $makebytes(enough_space, 0);
    _M0MPC15array10FixedArray12unsafe__blitGyE(new_data, 0, self.data, 0, self.len);
    self.data = new_data;
    return;
  } else {
    return;
  }
}
__name(_M0MPC16buffer6Buffer19grow__if__necessary, "_M0MPC16buffer6Buffer19grow__if__necessary");
function _M0MPC16buffer6Buffer11write__byte(self, value) {
  _M0MPC16buffer6Buffer19grow__if__necessary(self, self.len + 1 | 0);
  const _tmp = self.data;
  const _tmp$2 = self.len;
  $bound_check(_tmp, _tmp$2);
  _tmp[_tmp$2] = value;
  self.len = self.len + 1 | 0;
}
__name(_M0MPC16buffer6Buffer11write__byte, "_M0MPC16buffer6Buffer11write__byte");
function _M0FPC16buffer11new_2einner(size_hint) {
  const initial = size_hint < 1 ? 1 : size_hint;
  const data = $makebytes(initial, 0);
  return new _M0TPC16buffer6Buffer(data, 0);
}
__name(_M0FPC16buffer11new_2einner, "_M0FPC16buffer11new_2einner");
function _M0IPC16buffer6BufferPB6Logger13write__string(self, value) {
  _M0MPC16buffer6Buffer19grow__if__necessary(self, self.len + (Math.imul(value.length, 2) | 0) | 0);
  _M0MPC15array10FixedArray18blit__from__string(self.data, self.len, value, 0, value.length);
  self.len = self.len + (Math.imul(value.length, 2) | 0) | 0;
}
__name(_M0IPC16buffer6BufferPB6Logger13write__string, "_M0IPC16buffer6BufferPB6Logger13write__string");
function _M0MPC16buffer6Buffer12write__bytes(self, value) {
  const val_len = value.length;
  _M0MPC16buffer6Buffer19grow__if__necessary(self, self.len + val_len | 0);
  _M0MPC15array10FixedArray17blit__from__bytes(self.data, self.len, value, 0, val_len);
  self.len = self.len + val_len | 0;
}
__name(_M0MPC16buffer6Buffer12write__bytes, "_M0MPC16buffer6Buffer12write__bytes");
function _M0MPC16buffer6Buffer9to__bytes(self) {
  return _M0MPC15bytes5Bytes11from__array(_M0MPC15array10FixedArray12view_2einnerGyE(self.data, 0, self.len));
}
__name(_M0MPC16buffer6Buffer9to__bytes, "_M0MPC16buffer6Buffer9to__bytes");
function _M0FPC17strconv9base__errGUiRPC16string10StringViewbEE() {
  return new _M0DTPC16result6ResultGUiRPC16string10StringViewbERPC17strconv12StrConvErrorE3Err(new _M0DTPC15error5Error58moonbitlang_2fcore_2fstrconv_2eStrConvError_2eStrConvError(_M0FPC17strconv14base__err__str));
}
__name(_M0FPC17strconv9base__errGUiRPC16string10StringViewbEE, "_M0FPC17strconv9base__errGUiRPC16string10StringViewbEE");
function _M0FPC17strconv25check__and__consume__base(view, base) {
  if (base === 0) {
    _L: {
      let rest;
      _L$2: {
        let rest$2;
        _L$3: {
          let rest$3;
          _L$4: {
            if (_M0MPC16string6String24char__length__ge_2einner(view.str, 2, view.start, view.end)) {
              const _x = _M0MPC16string6String16unsafe__char__at(view.str, _M0MPC16string6String29offset__of__nth__char_2einner(view.str, 0, view.start, view.end));
              if (_x === 48) {
                const _x$2 = _M0MPC16string6String16unsafe__char__at(view.str, _M0MPC16string6String29offset__of__nth__char_2einner(view.str, 1, view.start, view.end));
                switch (_x$2) {
                  case 120: {
                    const _tmp = view.str;
                    const _bind = _M0MPC16string6String29offset__of__nth__char_2einner(view.str, 2, view.start, view.end);
                    let _tmp$2;
                    if (_bind === void 0) {
                      _tmp$2 = view.end;
                    } else {
                      const _Some = _bind;
                      _tmp$2 = _Some;
                    }
                    const _x$3 = new _M0TPC16string10StringView(_tmp, _tmp$2, view.end);
                    rest$3 = _x$3;
                    break _L$4;
                  }
                  case 88: {
                    const _tmp$3 = view.str;
                    const _bind$2 = _M0MPC16string6String29offset__of__nth__char_2einner(view.str, 2, view.start, view.end);
                    let _tmp$4;
                    if (_bind$2 === void 0) {
                      _tmp$4 = view.end;
                    } else {
                      const _Some = _bind$2;
                      _tmp$4 = _Some;
                    }
                    const _x$4 = new _M0TPC16string10StringView(_tmp$3, _tmp$4, view.end);
                    rest$3 = _x$4;
                    break _L$4;
                  }
                  case 111: {
                    const _tmp$5 = view.str;
                    const _bind$3 = _M0MPC16string6String29offset__of__nth__char_2einner(view.str, 2, view.start, view.end);
                    let _tmp$6;
                    if (_bind$3 === void 0) {
                      _tmp$6 = view.end;
                    } else {
                      const _Some = _bind$3;
                      _tmp$6 = _Some;
                    }
                    const _x$5 = new _M0TPC16string10StringView(_tmp$5, _tmp$6, view.end);
                    rest$2 = _x$5;
                    break _L$3;
                  }
                  case 79: {
                    const _tmp$7 = view.str;
                    const _bind$4 = _M0MPC16string6String29offset__of__nth__char_2einner(view.str, 2, view.start, view.end);
                    let _tmp$8;
                    if (_bind$4 === void 0) {
                      _tmp$8 = view.end;
                    } else {
                      const _Some = _bind$4;
                      _tmp$8 = _Some;
                    }
                    const _x$6 = new _M0TPC16string10StringView(_tmp$7, _tmp$8, view.end);
                    rest$2 = _x$6;
                    break _L$3;
                  }
                  case 98: {
                    const _tmp$9 = view.str;
                    const _bind$5 = _M0MPC16string6String29offset__of__nth__char_2einner(view.str, 2, view.start, view.end);
                    let _tmp$10;
                    if (_bind$5 === void 0) {
                      _tmp$10 = view.end;
                    } else {
                      const _Some = _bind$5;
                      _tmp$10 = _Some;
                    }
                    const _x$7 = new _M0TPC16string10StringView(_tmp$9, _tmp$10, view.end);
                    rest = _x$7;
                    break _L$2;
                  }
                  case 66: {
                    const _tmp$11 = view.str;
                    const _bind$6 = _M0MPC16string6String29offset__of__nth__char_2einner(view.str, 2, view.start, view.end);
                    let _tmp$12;
                    if (_bind$6 === void 0) {
                      _tmp$12 = view.end;
                    } else {
                      const _Some = _bind$6;
                      _tmp$12 = _Some;
                    }
                    const _x$8 = new _M0TPC16string10StringView(_tmp$11, _tmp$12, view.end);
                    rest = _x$8;
                    break _L$2;
                  }
                  default: {
                    break _L;
                  }
                }
              } else {
                break _L;
              }
            } else {
              break _L;
            }
          }
          return new _M0DTPC16result6ResultGUiRPC16string10StringViewbERPC17strconv12StrConvErrorE2Ok({ _0: 16, _1: rest$3, _2: true });
        }
        return new _M0DTPC16result6ResultGUiRPC16string10StringViewbERPC17strconv12StrConvErrorE2Ok({ _0: 8, _1: rest$2, _2: true });
      }
      return new _M0DTPC16result6ResultGUiRPC16string10StringViewbERPC17strconv12StrConvErrorE2Ok({ _0: 2, _1: rest, _2: true });
    }
    return new _M0DTPC16result6ResultGUiRPC16string10StringViewbERPC17strconv12StrConvErrorE2Ok({ _0: 10, _1: view, _2: false });
  } else {
    _L: {
      let rest;
      _L$2: {
        let rest$2;
        _L$3: {
          let rest$3;
          _L$4: {
            if (_M0MPC16string6String24char__length__ge_2einner(view.str, 2, view.start, view.end)) {
              const _x = _M0MPC16string6String16unsafe__char__at(view.str, _M0MPC16string6String29offset__of__nth__char_2einner(view.str, 0, view.start, view.end));
              if (_x === 48) {
                const _x$2 = _M0MPC16string6String16unsafe__char__at(view.str, _M0MPC16string6String29offset__of__nth__char_2einner(view.str, 1, view.start, view.end));
                switch (_x$2) {
                  case 120: {
                    const _tmp = view.str;
                    const _bind = _M0MPC16string6String29offset__of__nth__char_2einner(view.str, 2, view.start, view.end);
                    let _tmp$2;
                    if (_bind === void 0) {
                      _tmp$2 = view.end;
                    } else {
                      const _Some = _bind;
                      _tmp$2 = _Some;
                    }
                    const _x$3 = new _M0TPC16string10StringView(_tmp, _tmp$2, view.end);
                    if (base === 16) {
                      rest$3 = _x$3;
                      break _L$4;
                    } else {
                      break _L;
                    }
                  }
                  case 88: {
                    const _tmp$3 = view.str;
                    const _bind$2 = _M0MPC16string6String29offset__of__nth__char_2einner(view.str, 2, view.start, view.end);
                    let _tmp$4;
                    if (_bind$2 === void 0) {
                      _tmp$4 = view.end;
                    } else {
                      const _Some = _bind$2;
                      _tmp$4 = _Some;
                    }
                    const _x$4 = new _M0TPC16string10StringView(_tmp$3, _tmp$4, view.end);
                    if (base === 16) {
                      rest$3 = _x$4;
                      break _L$4;
                    } else {
                      break _L;
                    }
                  }
                  case 111: {
                    const _tmp$5 = view.str;
                    const _bind$3 = _M0MPC16string6String29offset__of__nth__char_2einner(view.str, 2, view.start, view.end);
                    let _tmp$6;
                    if (_bind$3 === void 0) {
                      _tmp$6 = view.end;
                    } else {
                      const _Some = _bind$3;
                      _tmp$6 = _Some;
                    }
                    const _x$5 = new _M0TPC16string10StringView(_tmp$5, _tmp$6, view.end);
                    if (base === 8) {
                      rest$2 = _x$5;
                      break _L$3;
                    } else {
                      break _L;
                    }
                  }
                  case 79: {
                    const _tmp$7 = view.str;
                    const _bind$4 = _M0MPC16string6String29offset__of__nth__char_2einner(view.str, 2, view.start, view.end);
                    let _tmp$8;
                    if (_bind$4 === void 0) {
                      _tmp$8 = view.end;
                    } else {
                      const _Some = _bind$4;
                      _tmp$8 = _Some;
                    }
                    const _x$6 = new _M0TPC16string10StringView(_tmp$7, _tmp$8, view.end);
                    if (base === 8) {
                      rest$2 = _x$6;
                      break _L$3;
                    } else {
                      break _L;
                    }
                  }
                  case 98: {
                    const _tmp$9 = view.str;
                    const _bind$5 = _M0MPC16string6String29offset__of__nth__char_2einner(view.str, 2, view.start, view.end);
                    let _tmp$10;
                    if (_bind$5 === void 0) {
                      _tmp$10 = view.end;
                    } else {
                      const _Some = _bind$5;
                      _tmp$10 = _Some;
                    }
                    const _x$7 = new _M0TPC16string10StringView(_tmp$9, _tmp$10, view.end);
                    if (base === 2) {
                      rest = _x$7;
                      break _L$2;
                    } else {
                      break _L;
                    }
                  }
                  case 66: {
                    const _tmp$11 = view.str;
                    const _bind$6 = _M0MPC16string6String29offset__of__nth__char_2einner(view.str, 2, view.start, view.end);
                    let _tmp$12;
                    if (_bind$6 === void 0) {
                      _tmp$12 = view.end;
                    } else {
                      const _Some = _bind$6;
                      _tmp$12 = _Some;
                    }
                    const _x$8 = new _M0TPC16string10StringView(_tmp$11, _tmp$12, view.end);
                    if (base === 2) {
                      rest = _x$8;
                      break _L$2;
                    } else {
                      break _L;
                    }
                  }
                  default: {
                    break _L;
                  }
                }
              } else {
                break _L;
              }
            } else {
              break _L;
            }
          }
          return new _M0DTPC16result6ResultGUiRPC16string10StringViewbERPC17strconv12StrConvErrorE2Ok({ _0: 16, _1: rest$3, _2: true });
        }
        return new _M0DTPC16result6ResultGUiRPC16string10StringViewbERPC17strconv12StrConvErrorE2Ok({ _0: 8, _1: rest$2, _2: true });
      }
      return new _M0DTPC16result6ResultGUiRPC16string10StringViewbERPC17strconv12StrConvErrorE2Ok({ _0: 2, _1: rest, _2: true });
    }
    return base >= 2 && base <= 36 ? new _M0DTPC16result6ResultGUiRPC16string10StringViewbERPC17strconv12StrConvErrorE2Ok({ _0: base, _1: view, _2: false }) : _M0FPC17strconv9base__errGUiRPC16string10StringViewbEE();
  }
}
__name(_M0FPC17strconv25check__and__consume__base, "_M0FPC17strconv25check__and__consume__base");
function _M0FPC17strconv10range__errGmE() {
  return new _M0DTPC16result6ResultGmRPC17strconv12StrConvErrorE3Err(new _M0DTPC15error5Error58moonbitlang_2fcore_2fstrconv_2eStrConvError_2eStrConvError(_M0FPC17strconv15range__err__str));
}
__name(_M0FPC17strconv10range__errGmE, "_M0FPC17strconv10range__errGmE");
function _M0FPC17strconv10range__errGuE() {
  return new _M0DTPC16result6ResultGuRPC17strconv12StrConvErrorE3Err(new _M0DTPC15error5Error58moonbitlang_2fcore_2fstrconv_2eStrConvError_2eStrConvError(_M0FPC17strconv15range__err__str));
}
__name(_M0FPC17strconv10range__errGuE, "_M0FPC17strconv10range__errGuE");
function _M0FPC17strconv11syntax__errGiE() {
  return new _M0DTPC16result6ResultGiRPC17strconv12StrConvErrorE3Err(new _M0DTPC15error5Error58moonbitlang_2fcore_2fstrconv_2eStrConvError_2eStrConvError(_M0FPC17strconv16syntax__err__str));
}
__name(_M0FPC17strconv11syntax__errGiE, "_M0FPC17strconv11syntax__errGiE");
function _M0FPC17strconv11syntax__errGmE() {
  return new _M0DTPC16result6ResultGmRPC17strconv12StrConvErrorE3Err(new _M0DTPC15error5Error58moonbitlang_2fcore_2fstrconv_2eStrConvError_2eStrConvError(_M0FPC17strconv16syntax__err__str));
}
__name(_M0FPC17strconv11syntax__errGmE, "_M0FPC17strconv11syntax__errGmE");
function _M0FPC17strconv19overflow__threshold(base, neg) {
  return !neg ? base === 10 ? _M0IPC15int645Int64PB3Add3add(_M0IPC15int645Int64PB3Div3div($9223372036854775807L, $10L), $1L) : base === 16 ? _M0IPC15int645Int64PB3Add3add(_M0IPC15int645Int64PB3Div3div($9223372036854775807L, $16L), $1L) : _M0IPC15int645Int64PB3Add3add(_M0IPC15int645Int64PB3Div3div($9223372036854775807L, _M0MPC13int3Int9to__int64(base)), $1L) : base === 10 ? _M0IPC15int645Int64PB3Div3div($_9223372036854775808L, $10L) : base === 16 ? _M0IPC15int645Int64PB3Div3div($_9223372036854775808L, $16L) : _M0IPC15int645Int64PB3Div3div($_9223372036854775808L, _M0MPC13int3Int9to__int64(base));
}
__name(_M0FPC17strconv19overflow__threshold, "_M0FPC17strconv19overflow__threshold");
function _M0FPC17strconv20parse__int64_2einner(str, base) {
  if (_M0IP016_24default__implPB2Eq10not__equalGRPC16string10StringViewE(str, new _M0TPC16string10StringView(_M0FPC17strconv20parse__int64_2einnerN7_2abindS543, 0, _M0FPC17strconv20parse__int64_2einnerN7_2abindS543.length))) {
    let _bind;
    let rest;
    _L: {
      _L$2: {
        const _bind$22 = _M0MPC16string10StringView12view_2einner(str, 0, void 0);
        if (_M0MPC16string6String24char__length__ge_2einner(_bind$22.str, 1, _bind$22.start, _bind$22.end)) {
          const _x = _M0MPC16string6String16unsafe__char__at(_bind$22.str, _M0MPC16string6String29offset__of__nth__char_2einner(_bind$22.str, 0, _bind$22.start, _bind$22.end));
          switch (_x) {
            case 43: {
              const _tmp = _bind$22.str;
              const _bind$32 = _M0MPC16string6String29offset__of__nth__char_2einner(_bind$22.str, 1, _bind$22.start, _bind$22.end);
              let _tmp$2;
              if (_bind$32 === void 0) {
                _tmp$2 = _bind$22.end;
              } else {
                const _Some = _bind$32;
                _tmp$2 = _Some;
              }
              const _x$2 = new _M0TPC16string10StringView(_tmp, _tmp$2, _bind$22.end);
              _bind = { _0: false, _1: _x$2 };
              break;
            }
            case 45: {
              const _tmp$3 = _bind$22.str;
              const _bind$4 = _M0MPC16string6String29offset__of__nth__char_2einner(_bind$22.str, 1, _bind$22.start, _bind$22.end);
              let _tmp$4;
              if (_bind$4 === void 0) {
                _tmp$4 = _bind$22.end;
              } else {
                const _Some = _bind$4;
                _tmp$4 = _Some;
              }
              const _x$3 = new _M0TPC16string10StringView(_tmp$3, _tmp$4, _bind$22.end);
              _bind = { _0: true, _1: _x$3 };
              break;
            }
            default: {
              rest = _bind$22;
              break _L$2;
            }
          }
        } else {
          rest = _bind$22;
          break _L$2;
        }
        break _L;
      }
      _bind = { _0: false, _1: rest };
    }
    const _neg = _bind._0;
    const _rest = _bind._1;
    const _bind$2 = _M0FPC17strconv25check__and__consume__base(_rest, base);
    let _bind$3;
    if (_bind$2.$tag === 1) {
      const _ok = _bind$2;
      _bind$3 = _ok._0;
    } else {
      return _bind$2;
    }
    const _num_base = _bind$3._0;
    const _rest$2 = _bind$3._1;
    const _allow_underscore = _bind$3._2;
    const overflow_threshold = _M0FPC17strconv19overflow__threshold(_num_base, _neg);
    let has_digit;
    if (_M0MPC16string6String24char__length__ge_2einner(_rest$2.str, 1, _rest$2.start, _rest$2.end)) {
      const _x = _M0MPC16string6String16unsafe__char__at(_rest$2.str, _M0MPC16string6String29offset__of__nth__char_2einner(_rest$2.str, 0, _rest$2.start, _rest$2.end));
      if (_x >= 48 && _x <= 57) {
        has_digit = true;
      } else {
        if (_x >= 97 && _x <= 122) {
          has_digit = true;
        } else {
          if (_x >= 65 && _x <= 90) {
            has_digit = true;
          } else {
            if (_M0MPC16string6String24char__length__ge_2einner(_rest$2.str, 2, _rest$2.start, _rest$2.end)) {
              if (_x === 95) {
                const _x$2 = _M0MPC16string6String16unsafe__char__at(_rest$2.str, _M0MPC16string6String29offset__of__nth__char_2einner(_rest$2.str, 1, _rest$2.start, _rest$2.end));
                has_digit = _x$2 >= 48 && _x$2 <= 57 ? true : _x$2 >= 97 && _x$2 <= 122 ? true : _x$2 >= 65 && _x$2 <= 90;
              } else {
                has_digit = false;
              }
            } else {
              has_digit = false;
            }
          }
        }
      }
    } else {
      has_digit = false;
    }
    if (has_digit) {
      let _tmp;
      let _tmp$2 = _rest$2;
      let _tmp$3 = $0L;
      let _tmp$4 = _allow_underscore;
      while (true) {
        const _param_0 = _tmp$2;
        const _param_1 = _tmp$3;
        const _param_2 = _tmp$4;
        let acc;
        let rest$2;
        let c;
        _L$2: {
          if (_M0MPC16string6String24char__length__eq_2einner(_param_0.str, 1, _param_0.start, _param_0.end)) {
            const _x = _M0MPC16string6String16unsafe__char__at(_param_0.str, _M0MPC16string6String29offset__of__nth__char_2einner(_param_0.str, 0, _param_0.start, _param_0.end));
            if (_x === 95) {
              const _bind$4 = _M0FPC17strconv11syntax__errGmE();
              if (_bind$4.$tag === 1) {
                const _ok = _bind$4;
                _tmp = _ok._0;
                break;
              } else {
                return _bind$4;
              }
            } else {
              const _tmp$5 = _param_0.str;
              const _bind$4 = _M0MPC16string6String29offset__of__nth__char_2einner(_param_0.str, 1, _param_0.start, _param_0.end);
              let _tmp$6;
              if (_bind$4 === void 0) {
                _tmp$6 = _param_0.end;
              } else {
                const _Some = _bind$4;
                _tmp$6 = _Some;
              }
              const _x$2 = new _M0TPC16string10StringView(_tmp$5, _tmp$6, _param_0.end);
              acc = _param_1;
              rest$2 = _x$2;
              c = _x;
              break _L$2;
            }
          } else {
            if (_M0MPC16string6String24char__length__ge_2einner(_param_0.str, 1, _param_0.start, _param_0.end)) {
              const _x = _M0MPC16string6String16unsafe__char__at(_param_0.str, _M0MPC16string6String29offset__of__nth__char_2einner(_param_0.str, 0, _param_0.start, _param_0.end));
              if (_x === 95) {
                if (_param_2 === false) {
                  const _bind$4 = _M0FPC17strconv11syntax__errGmE();
                  if (_bind$4.$tag === 1) {
                    const _ok = _bind$4;
                    _tmp = _ok._0;
                    break;
                  } else {
                    return _bind$4;
                  }
                } else {
                  const _tmp$5 = _param_0.str;
                  const _bind$4 = _M0MPC16string6String29offset__of__nth__char_2einner(_param_0.str, 1, _param_0.start, _param_0.end);
                  let _tmp$6;
                  if (_bind$4 === void 0) {
                    _tmp$6 = _param_0.end;
                  } else {
                    const _Some = _bind$4;
                    _tmp$6 = _Some;
                  }
                  const _x$2 = new _M0TPC16string10StringView(_tmp$5, _tmp$6, _param_0.end);
                  _tmp$2 = _x$2;
                  _tmp$4 = false;
                  continue;
                }
              } else {
                const _tmp$5 = _param_0.str;
                const _bind$4 = _M0MPC16string6String29offset__of__nth__char_2einner(_param_0.str, 1, _param_0.start, _param_0.end);
                let _tmp$6;
                if (_bind$4 === void 0) {
                  _tmp$6 = _param_0.end;
                } else {
                  const _Some = _bind$4;
                  _tmp$6 = _Some;
                }
                const _x$2 = new _M0TPC16string10StringView(_tmp$5, _tmp$6, _param_0.end);
                acc = _param_1;
                rest$2 = _x$2;
                c = _x;
                break _L$2;
              }
            } else {
              _tmp = _param_1;
              break;
            }
          }
        }
        const c$2 = c;
        let d;
        if (c$2 >= 48 && c$2 <= 57) {
          d = c$2 - 48 | 0;
        } else {
          if (c$2 >= 97 && c$2 <= 122) {
            d = c$2 + -87 | 0;
          } else {
            if (c$2 >= 65 && c$2 <= 90) {
              d = c$2 + -55 | 0;
            } else {
              const _bind$4 = _M0FPC17strconv11syntax__errGiE();
              if (_bind$4.$tag === 1) {
                const _ok = _bind$4;
                d = _ok._0;
              } else {
                return _bind$4;
              }
            }
          }
        }
        if (d < _num_base) {
          if (_neg) {
            if (_M0IP016_24default__implPB7Compare6op__geGlE(acc, overflow_threshold)) {
              const next_acc = _M0IPC15int645Int64PB3Sub3sub(_M0IPC15int645Int64PB3Mul3mul(acc, _M0MPC13int3Int9to__int64(_num_base)), _M0MPC13int3Int9to__int64(d));
              if (_M0IP016_24default__implPB7Compare6op__leGlE(next_acc, acc)) {
                _tmp$2 = rest$2;
                _tmp$3 = next_acc;
                _tmp$4 = true;
                continue;
              } else {
                const _bind$4 = _M0FPC17strconv10range__errGmE();
                if (_bind$4.$tag === 1) {
                  const _ok = _bind$4;
                  _tmp = _ok._0;
                  break;
                } else {
                  return _bind$4;
                }
              }
            } else {
              const _bind$4 = _M0FPC17strconv10range__errGmE();
              if (_bind$4.$tag === 1) {
                const _ok = _bind$4;
                _tmp = _ok._0;
                break;
              } else {
                return _bind$4;
              }
            }
          } else {
            if (_M0IP016_24default__implPB7Compare6op__ltGlE(acc, overflow_threshold)) {
              const next_acc = _M0IPC15int645Int64PB3Add3add(_M0IPC15int645Int64PB3Mul3mul(acc, _M0MPC13int3Int9to__int64(_num_base)), _M0MPC13int3Int9to__int64(d));
              if (_M0IP016_24default__implPB7Compare6op__geGlE(next_acc, acc)) {
                _tmp$2 = rest$2;
                _tmp$3 = next_acc;
                _tmp$4 = true;
                continue;
              } else {
                const _bind$4 = _M0FPC17strconv10range__errGmE();
                if (_bind$4.$tag === 1) {
                  const _ok = _bind$4;
                  _tmp = _ok._0;
                  break;
                } else {
                  return _bind$4;
                }
              }
            } else {
              const _bind$4 = _M0FPC17strconv10range__errGmE();
              if (_bind$4.$tag === 1) {
                const _ok = _bind$4;
                _tmp = _ok._0;
                break;
              } else {
                return _bind$4;
              }
            }
          }
        } else {
          const _bind$4 = _M0FPC17strconv11syntax__errGmE();
          if (_bind$4.$tag === 1) {
            const _ok = _bind$4;
            _tmp = _ok._0;
            break;
          } else {
            return _bind$4;
          }
        }
      }
      return new _M0DTPC16result6ResultGlRPC17strconv12StrConvErrorE2Ok(_tmp);
    } else {
      return _M0FPC17strconv11syntax__errGmE();
    }
  } else {
    return _M0FPC17strconv11syntax__errGmE();
  }
}
__name(_M0FPC17strconv20parse__int64_2einner, "_M0FPC17strconv20parse__int64_2einner");
function _M0FPC17strconv18parse__int_2einner(str, base) {
  const _bind = _M0FPC17strconv20parse__int64_2einner(str, base);
  let n;
  if (_bind.$tag === 1) {
    const _ok = _bind;
    n = _ok._0;
  } else {
    return _bind;
  }
  if (_M0IP016_24default__implPB7Compare6op__ltGlE(n, _M0MPC13int3Int9to__int64(-2147483648)) || _M0IP016_24default__implPB7Compare6op__gtGlE(n, _M0MPC13int3Int9to__int64(2147483647))) {
    const _bind$2 = _M0FPC17strconv10range__errGuE();
    if (_bind$2.$tag === 1) {
      const _ok = _bind$2;
      _ok._0;
    } else {
      return _bind$2;
    }
  }
  return new _M0DTPC16result6ResultGiRPC17strconv12StrConvErrorE2Ok(_M0MPC15int645Int647to__int(n));
}
__name(_M0FPC17strconv18parse__int_2einner, "_M0FPC17strconv18parse__int_2einner");
function _M0MPC17hashmap7HashMap11new_2einnerGRP29dowdiness4seam7RawKindRPC17hashmap7HashMapGsRP29dowdiness4seam8CstTokenEE(capacity) {
  const capacity$2 = _M0MPC13int3Int20next__power__of__two(capacity);
  const _bind = $make_array_len_and_init(capacity$2, void 0);
  const _bind$2 = capacity$2 - 1 | 0;
  return new _M0TPC17hashmap7HashMapGRP29dowdiness4seam7RawKindRPC17hashmap7HashMapGsRP29dowdiness4seam8CstTokenEE(_bind, capacity$2, _bind$2, 0);
}
__name(_M0MPC17hashmap7HashMap11new_2einnerGRP29dowdiness4seam7RawKindRPC17hashmap7HashMapGsRP29dowdiness4seam8CstTokenEE, "_M0MPC17hashmap7HashMap11new_2einnerGRP29dowdiness4seam7RawKindRPC17hashmap7HashMapGsRP29dowdiness4seam8CstTokenEE");
function _M0IP39dowdiness6lambda3ast3BopPB2Eq5equal(_x_207, _x_208) {
  if (_x_207 === 0) {
    if (_x_208 === 0) {
      return true;
    } else {
      return false;
    }
  } else {
    if (_x_208 === 1) {
      return true;
    } else {
      return false;
    }
  }
}
__name(_M0IP39dowdiness6lambda3ast3BopPB2Eq5equal, "_M0IP39dowdiness6lambda3ast3BopPB2Eq5equal");
function _M0IP39dowdiness6lambda3ast4TermPB2Eq5equal(_x_91, _x_92) {
  let _tmp = _x_91;
  let _tmp$2 = _x_92;
  _L:
    while (true) {
      const _x_91$2 = _tmp;
      const _x_92$2 = _tmp$2;
      switch (_x_91$2.$tag) {
        case 0: {
          const _Int = _x_91$2;
          const _$42$x0_93 = _Int._0;
          if (_x_92$2.$tag === 0) {
            const _Int$2 = _x_92$2;
            const _$42$y0_94 = _Int$2._0;
            return _$42$x0_93 === _$42$y0_94;
          } else {
            return false;
          }
        }
        case 1: {
          const _Var = _x_91$2;
          const _$42$x0_95 = _Var._0;
          if (_x_92$2.$tag === 1) {
            const _Var$2 = _x_92$2;
            const _$42$y0_96 = _Var$2._0;
            return _$42$x0_95 === _$42$y0_96;
          } else {
            return false;
          }
        }
        case 2: {
          const _Lam = _x_91$2;
          const _$42$x0_97 = _Lam._0;
          const _$42$x1_98 = _Lam._1;
          if (_x_92$2.$tag === 2) {
            const _Lam$2 = _x_92$2;
            const _$42$y0_99 = _Lam$2._0;
            const _$42$y1_100 = _Lam$2._1;
            if (_$42$x0_97 === _$42$y0_99) {
              _tmp = _$42$x1_98;
              _tmp$2 = _$42$y1_100;
              continue _L;
            } else {
              return false;
            }
          } else {
            return false;
          }
        }
        case 3: {
          const _App = _x_91$2;
          const _$42$x0_101 = _App._0;
          const _$42$x1_102 = _App._1;
          if (_x_92$2.$tag === 3) {
            const _App$2 = _x_92$2;
            const _$42$y0_103 = _App$2._0;
            const _$42$y1_104 = _App$2._1;
            if (_M0IP39dowdiness6lambda3ast4TermPB2Eq5equal(_$42$x0_101, _$42$y0_103)) {
              _tmp = _$42$x1_102;
              _tmp$2 = _$42$y1_104;
              continue _L;
            } else {
              return false;
            }
          } else {
            return false;
          }
        }
        case 4: {
          const _Bop = _x_91$2;
          const _$42$x0_105 = _Bop._0;
          const _$42$x1_106 = _Bop._1;
          const _$42$x2_107 = _Bop._2;
          if (_x_92$2.$tag === 4) {
            const _Bop$2 = _x_92$2;
            const _$42$y0_108 = _Bop$2._0;
            const _$42$y1_109 = _Bop$2._1;
            const _$42$y2_110 = _Bop$2._2;
            if (_M0IP39dowdiness6lambda3ast3BopPB2Eq5equal(_$42$x0_105, _$42$y0_108)) {
              let _tmp$3;
              if (_M0IP39dowdiness6lambda3ast4TermPB2Eq5equal(_$42$x1_106, _$42$y1_109)) {
                _tmp = _$42$x2_107;
                _tmp$2 = _$42$y2_110;
                continue _L;
              } else {
                _tmp$3 = false;
              }
              return _tmp$3;
            } else {
              return false;
            }
          } else {
            return false;
          }
        }
        case 5: {
          const _If = _x_91$2;
          const _$42$x0_111 = _If._0;
          const _$42$x1_112 = _If._1;
          const _$42$x2_113 = _If._2;
          if (_x_92$2.$tag === 5) {
            const _If$2 = _x_92$2;
            const _$42$y0_114 = _If$2._0;
            const _$42$y1_115 = _If$2._1;
            const _$42$y2_116 = _If$2._2;
            if (_M0IP39dowdiness6lambda3ast4TermPB2Eq5equal(_$42$x0_111, _$42$y0_114)) {
              let _tmp$3;
              if (_M0IP39dowdiness6lambda3ast4TermPB2Eq5equal(_$42$x1_112, _$42$y1_115)) {
                _tmp = _$42$x2_113;
                _tmp$2 = _$42$y2_116;
                continue _L;
              } else {
                _tmp$3 = false;
              }
              return _tmp$3;
            } else {
              return false;
            }
          } else {
            return false;
          }
        }
        case 6: {
          const _Module = _x_91$2;
          const _$42$x0_117 = _Module._0;
          const _$42$x1_118 = _Module._1;
          if (_x_92$2.$tag === 6) {
            const _Module$2 = _x_92$2;
            const _$42$y0_119 = _Module$2._0;
            const _$42$y1_120 = _Module$2._1;
            if (_M0IPC15array5ArrayPB2Eq5equalGUsRP39dowdiness6lambda3ast4TermEE(_$42$x0_117, _$42$y0_119)) {
              _tmp = _$42$x1_118;
              _tmp$2 = _$42$y1_120;
              continue _L;
            } else {
              return false;
            }
          } else {
            return false;
          }
        }
        case 7: {
          if (_x_92$2.$tag === 7) {
            return true;
          } else {
            return false;
          }
        }
        case 8: {
          const _Unbound = _x_91$2;
          const _$42$x0_121 = _Unbound._0;
          if (_x_92$2.$tag === 8) {
            const _Unbound$2 = _x_92$2;
            const _$42$y0_122 = _Unbound$2._0;
            return _$42$x0_121 === _$42$y0_122;
          } else {
            return false;
          }
        }
        default: {
          const _Error = _x_91$2;
          const _$42$x0_123 = _Error._0;
          if (_x_92$2.$tag === 9) {
            const _Error$2 = _x_92$2;
            const _$42$y0_124 = _Error$2._0;
            return _$42$x0_123 === _$42$y0_124;
          } else {
            return false;
          }
        }
      }
    }
}
__name(_M0IP39dowdiness6lambda3ast4TermPB2Eq5equal, "_M0IP39dowdiness6lambda3ast4TermPB2Eq5equal");
function _M0MP29dowdiness4seam11SyntaxToken3new(cst, offset) {
  return new _M0TP29dowdiness4seam11SyntaxToken(cst, offset);
}
__name(_M0MP29dowdiness4seam11SyntaxToken3new, "_M0MP29dowdiness4seam11SyntaxToken3new");
function _M0MP29dowdiness4seam10SyntaxNode3new(cst, parent, offset) {
  return new _M0TP29dowdiness4seam10SyntaxNode(cst, parent, offset);
}
__name(_M0MP29dowdiness4seam10SyntaxNode3new, "_M0MP29dowdiness4seam10SyntaxNode3new");
function _M0MP29dowdiness4seam10SyntaxNode10nth__child(self, n) {
  let count = 0;
  let offset = self.offset;
  const _bind = self.cst.children;
  const _bind$2 = _bind.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$2) {
      const elem = _bind[_];
      if (elem.$tag === 1) {
        const _Node = elem;
        const _child_cst = _Node._0;
        if (count === n) {
          return _M0MP29dowdiness4seam10SyntaxNode3new(_child_cst, self, offset);
        }
        count = count + 1 | 0;
        offset = offset + _child_cst.text_len | 0;
      } else {
        const _Token = elem;
        const _tok = _Token._0;
        offset = offset + _tok.text.length | 0;
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return void 0;
}
__name(_M0MP29dowdiness4seam10SyntaxNode10nth__child, "_M0MP29dowdiness4seam10SyntaxNode10nth__child");
function _M0MP29dowdiness4seam10SyntaxNode14children__from(self, start) {
  const result = [];
  let _tmp = self.offset;
  let _tmp$2 = 0;
  let _tmp$3 = 0;
  while (true) {
    const offset = _tmp;
    const i = _tmp$2;
    const count = _tmp$3;
    if (i < self.cst.children.length) {
      const _bind = _M0MPC15array5Array2atGRPB4JsonE(self.cst.children, i);
      if (_bind.$tag === 1) {
        const _Node = _bind;
        const _cst_child = _Node._0;
        if (count >= start) {
          _M0MPC15array5Array4pushGsE(result, _M0MP29dowdiness4seam10SyntaxNode3new(_cst_child, self, offset));
        }
        _tmp = offset + _cst_child.text_len | 0;
        _tmp$2 = i + 1 | 0;
        _tmp$3 = count + 1 | 0;
        continue;
      } else {
        const _Token = _bind;
        const _token = _Token._0;
        _tmp = offset + _token.text.length | 0;
        _tmp$2 = i + 1 | 0;
        continue;
      }
    } else {
      break;
    }
  }
  return result;
}
__name(_M0MP29dowdiness4seam10SyntaxNode14children__from, "_M0MP29dowdiness4seam10SyntaxNode14children__from");
function _M0MP29dowdiness4seam10SyntaxNode8children(self) {
  return _M0MP29dowdiness4seam10SyntaxNode14children__from(self, 0);
}
__name(_M0MP29dowdiness4seam10SyntaxNode8children, "_M0MP29dowdiness4seam10SyntaxNode8children");
function _M0MP29dowdiness4seam10SyntaxNode26nodes__and__tokens_2einner(self, trivia_kind) {
  const nodes = [];
  const tokens = [];
  let offset = self.offset;
  const _bind = self.cst.children;
  const _bind$2 = _bind.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$2) {
      const elem = _bind[_];
      if (elem.$tag === 1) {
        const _Node = elem;
        const _child_cst = _Node._0;
        _M0MPC15array5Array4pushGsE(nodes, _M0MP29dowdiness4seam10SyntaxNode3new(_child_cst, self, offset));
        offset = offset + _child_cst.text_len | 0;
      } else {
        const _Token = elem;
        const _tok = _Token._0;
        let keep;
        if (trivia_kind === void 0) {
          keep = true;
        } else {
          const _Some = trivia_kind;
          const _tk = _Some;
          keep = _M0IP016_24default__implPB2Eq10not__equalGRP29dowdiness4seam7RawKindE(_tok.kind, _tk);
        }
        if (keep) {
          _M0MPC15array5Array4pushGsE(tokens, _M0MP29dowdiness4seam11SyntaxToken3new(_tok, offset));
        }
        offset = offset + _tok.text.length | 0;
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return { _0: nodes, _1: tokens };
}
__name(_M0MP29dowdiness4seam10SyntaxNode26nodes__and__tokens_2einner, "_M0MP29dowdiness4seam10SyntaxNode26nodes__and__tokens_2einner");
function _M0MP29dowdiness4seam10SyntaxNode18nodes__and__tokens(self, trivia_kind$46$opt) {
  let trivia_kind;
  if (trivia_kind$46$opt.$tag === 1) {
    const _Some = trivia_kind$46$opt;
    trivia_kind = _Some._0;
  } else {
    trivia_kind = void 0;
  }
  return _M0MP29dowdiness4seam10SyntaxNode26nodes__and__tokens_2einner(self, trivia_kind);
}
__name(_M0MP29dowdiness4seam10SyntaxNode18nodes__and__tokens, "_M0MP29dowdiness4seam10SyntaxNode18nodes__and__tokens");
function _M0MP29dowdiness4seam10SyntaxNode11find__token(self, kind) {
  let offset = self.offset;
  const _bind = self.cst.children;
  const _bind$2 = _bind.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$2) {
      const elem = _bind[_];
      if (elem.$tag === 0) {
        const _Token = elem;
        const _tok = _Token._0;
        const _p = _tok.kind;
        if (_p === kind) {
          return _M0MP29dowdiness4seam11SyntaxToken3new(_tok, offset);
        }
        offset = offset + _tok.text.length | 0;
      } else {
        const _Node = elem;
        const _child = _Node._0;
        offset = offset + _child.text_len | 0;
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return void 0;
}
__name(_M0MP29dowdiness4seam10SyntaxNode11find__token, "_M0MP29dowdiness4seam10SyntaxNode11find__token");
function _M0MP29dowdiness4seam10SyntaxNode11token__text(self, kind) {
  const _bind = _M0MP29dowdiness4seam10SyntaxNode11find__token(self, kind);
  if (_bind === void 0) {
    return "";
  } else {
    const _Some = _bind;
    const _t = _Some;
    return _t.cst.text;
  }
}
__name(_M0MP29dowdiness4seam10SyntaxNode11token__text, "_M0MP29dowdiness4seam10SyntaxNode11token__text");
function _M0MP29dowdiness4seam8Interner3new() {
  return new _M0TP29dowdiness4seam8Interner(_M0MPC17hashmap7HashMap11new_2einnerGRP29dowdiness4seam7RawKindRPC17hashmap7HashMapGsRP29dowdiness4seam8CstTokenEE(8));
}
__name(_M0MP29dowdiness4seam8Interner3new, "_M0MP29dowdiness4seam8Interner3new");
function _M0MP29dowdiness4seam10CstElement9text__len(self) {
  if (self.$tag === 0) {
    const _Token = self;
    const _t = _Token._0;
    return _t.text.length;
  } else {
    const _Node = self;
    const _n = _Node._0;
    return _n.text_len;
  }
}
__name(_M0MP29dowdiness4seam10CstElement9text__len, "_M0MP29dowdiness4seam10CstElement9text__len");
function _M0MP29dowdiness4seam11EventBuffer4push(self, event) {
  _M0MPC15array5Array4pushGsE(self.events, event);
}
__name(_M0MP29dowdiness4seam11EventBuffer4push, "_M0MP29dowdiness4seam11EventBuffer4push");
function _M0MP29dowdiness4seam11EventBuffer4mark(self) {
  const index = self.events.length;
  _M0MPC15array5Array4pushGsE(self.events, _M0DTP29dowdiness4seam10ParseEvent9Tombstone__);
  return index;
}
__name(_M0MP29dowdiness4seam11EventBuffer4mark, "_M0MP29dowdiness4seam11EventBuffer4mark");
function _M0MP29dowdiness4seam11EventBuffer9start__at(self, mark, kind) {
  if (mark < 0 || mark >= self.events.length) {
    _M0FPB5abortGuE(`EventBuffer::start_at: mark out of bounds, mark=${_M0MPC13int3Int18to__string_2einner(mark, 10)}, len=${_M0MPC13int3Int18to__string_2einner(self.events.length, 10)}`, "@dowdiness/seam:event.mbt:143:5-148:6");
  }
  const _bind = _M0MPC15array5Array2atGRPB4JsonE(self.events, mark);
  if (_bind.$tag === 3) {
    _M0MPC15array5Array3setGRP49dowdiness22event_2dgraph_2dwalker8internal4core5OpRunE(self.events, mark, new _M0DTP29dowdiness4seam10ParseEvent9StartNode(kind));
    return;
  } else {
    _M0FPB5abortGuE(`EventBuffer::start_at: mark does not point to Tombstone, mark=${_M0MPC13int3Int18to__string_2einner(mark, 10)}`, "@dowdiness/seam:event.mbt:153:7-156:8");
    return;
  }
}
__name(_M0MP29dowdiness4seam11EventBuffer9start__at, "_M0MP29dowdiness4seam11EventBuffer9start__at");
function _M0MP29dowdiness4seam7CstNode12first__token(self, is_trivia) {
  const _bind = self.children;
  const _bind$2 = _bind.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$2) {
      const child = _bind[_];
      if (child.$tag === 0) {
        const _Token = child;
        const _t = _Token._0;
        if (!is_trivia(_t.kind)) {
          return _t;
        }
      } else {
        const _Node = child;
        const _n = _Node._0;
        const _bind$3 = _M0MP29dowdiness4seam7CstNode12first__token(_n, is_trivia);
        if (_bind$3 === void 0) {
        } else {
          const _Some = _bind$3;
          return _Some;
        }
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return void 0;
}
__name(_M0MP29dowdiness4seam7CstNode12first__token, "_M0MP29dowdiness4seam7CstNode12first__token");
function _M0MP39dowdiness4loom4core9TokenInfo3newGRP39dowdiness6lambda5token5TokenE(token, len) {
  return new _M0TP39dowdiness4loom4core9TokenInfoGRP39dowdiness6lambda5token5TokenE(token, len);
}
__name(_M0MP39dowdiness4loom4core9TokenInfo3newGRP39dowdiness6lambda5token5TokenE, "_M0MP39dowdiness4loom4core9TokenInfo3newGRP39dowdiness6lambda5token5TokenE");
function _M0FP39dowdiness4loom4core20collect__old__tokens(node, node_start, out, ws_raw, err_raw, incomplete_raw) {
  let offset = node_start;
  const _bind = node.children;
  const _bind$2 = _bind.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$2) {
      const child = _bind[_];
      if (child.$tag === 0) {
        const _Token = child;
        const _t = _Token._0;
        if (_M0IP016_24default__implPB2Eq10not__equalGRP29dowdiness4seam7RawKindE(_t.kind, ws_raw) && (_M0IP016_24default__implPB2Eq10not__equalGRP29dowdiness4seam7RawKindE(_t.kind, err_raw) && _M0IP016_24default__implPB2Eq10not__equalGRP29dowdiness4seam7RawKindE(_t.kind, incomplete_raw))) {
          _M0MPC15array5Array4pushGsE(out, new _M0TP39dowdiness4loom4core8OldToken(_t.kind, _t.text, offset));
        }
        offset = offset + _t.text.length | 0;
      } else {
        const _Node = child;
        const _n = _Node._0;
        _M0FP39dowdiness4loom4core20collect__old__tokens(_n, offset, out, ws_raw, err_raw, incomplete_raw);
        offset = offset + _n.text_len | 0;
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      return;
    }
  }
}
__name(_M0FP39dowdiness4loom4core20collect__old__tokens, "_M0FP39dowdiness4loom4core20collect__old__tokens");
function _M0FP39dowdiness4loom4core23leading__token__matchesGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(node, cursor, token_pos) {
  if (token_pos >= cursor.token_count) {
    return false;
  }
  const _func = cursor.get_token;
  const expected_token = _func(token_pos);
  const ws_raw = _M0IP39dowdiness6lambda6syntax10SyntaxKindP29dowdiness4seam9ToRawKind7to__raw(cursor.spec.whitespace_kind);
  const _bind = _M0MP29dowdiness4seam7CstNode12first__token(node, (r) => r === ws_raw);
  if (_bind === void 0) {
    return false;
  } else {
    const _Some = _bind;
    const _tok = _Some;
    const _func$2 = cursor.spec.cst_token_matches;
    return _func$2(_tok.kind, _tok.text, expected_token);
  }
}
__name(_M0FP39dowdiness4loom4core23leading__token__matchesGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE, "_M0FP39dowdiness4loom4core23leading__token__matchesGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE");
function _M0MP39dowdiness4loom4core11ReuseCursor19ensure__old__tokensGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self) {
  const _bind = self.cache.tokens;
  if (_bind.$tag === 1) {
    const _Some = _bind;
    return _Some._0;
  } else {
    const tokens = [];
    _M0FP39dowdiness4loom4core20collect__old__tokens(self.old_root, 0, tokens, self.ws_raw, self.err_raw, self.incomplete_raw);
    self.cache.tokens = new _M0DTPC16option6OptionGRPB5ArrayGRP39dowdiness4loom4core8OldTokenEE4Some(tokens);
    return tokens;
  }
}
__name(_M0MP39dowdiness4loom4core11ReuseCursor19ensure__old__tokensGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE, "_M0MP39dowdiness4loom4core11ReuseCursor19ensure__old__tokensGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE");
function _M0FP39dowdiness4loom4core12lower__boundGRPB5ArrayGRP39dowdiness4loom4core8OldTokenEE(source, target) {
  let lo = 0;
  let hi = source.length;
  while (true) {
    if (lo < hi) {
      const mid = lo + ((hi - lo | 0) / 2 | 0) | 0;
      if (_M0MPC15array5Array2atGRPB4JsonE(source, mid).start < target) {
        lo = mid + 1 | 0;
      } else {
        hi = mid;
      }
      continue;
    } else {
      break;
    }
  }
  return lo;
}
__name(_M0FP39dowdiness4loom4core12lower__boundGRPB5ArrayGRP39dowdiness4loom4core8OldTokenEE, "_M0FP39dowdiness4loom4core12lower__boundGRPB5ArrayGRP39dowdiness4loom4core8OldTokenEE");
function _M0FP39dowdiness4loom4core12lower__boundGRP39dowdiness4loom4core11ReuseCursorGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindEE(source, target) {
  let lo = 0;
  let hi = source.token_count;
  while (true) {
    if (lo < hi) {
      const mid = lo + ((hi - lo | 0) / 2 | 0) | 0;
      if (_M0IP39dowdiness4loom4core11ReuseCursorP39dowdiness4loom4core13OffsetIndexed10offset__atGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(source, mid) < target) {
        lo = mid + 1 | 0;
      } else {
        hi = mid;
      }
      continue;
    } else {
      break;
    }
  }
  return lo;
}
__name(_M0FP39dowdiness4loom4core12lower__boundGRP39dowdiness4loom4core11ReuseCursorGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindEE, "_M0FP39dowdiness4loom4core12lower__boundGRP39dowdiness4loom4core11ReuseCursorGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindEE");
function _M0FP39dowdiness4loom4core24old__follow__token__lazyGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(cursor, offset) {
  const old_tokens = _M0MP39dowdiness4loom4core11ReuseCursor19ensure__old__tokensGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(cursor);
  const lo = _M0FP39dowdiness4loom4core12lower__boundGRPB5ArrayGRP39dowdiness4loom4core8OldTokenEE(old_tokens, offset);
  return lo < old_tokens.length ? _M0MPC15array5Array2atGRPB4JsonE(old_tokens, lo) : void 0;
}
__name(_M0FP39dowdiness4loom4core24old__follow__token__lazyGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE, "_M0FP39dowdiness4loom4core24old__follow__token__lazyGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE");
function _M0IP39dowdiness4loom4core11ReuseCursorP39dowdiness4loom4core13OffsetIndexed10offset__atGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self, i) {
  const _func = self.get_start;
  return _func(i);
}
__name(_M0IP39dowdiness4loom4core11ReuseCursorP39dowdiness4loom4core13OffsetIndexed10offset__atGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE, "_M0IP39dowdiness4loom4core11ReuseCursorP39dowdiness4loom4core13OffsetIndexed10offset__atGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE");
function _M0FP39dowdiness4loom4core18new__follow__tokenGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(cursor, byte_offset) {
  let lo = _M0FP39dowdiness4loom4core12lower__boundGRP39dowdiness4loom4core11ReuseCursorGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindEE(cursor, byte_offset);
  while (true) {
    if (lo < cursor.token_count) {
      const _func = cursor.get_token;
      const t = _func(lo);
      if (_M0IP39dowdiness6lambda5token5TokenP29dowdiness4seam5IsEof7is__eof(t)) {
        break;
      }
      if (_M0IP39dowdiness6lambda5token5TokenP29dowdiness4seam8IsTrivia10is__trivia(t)) {
        lo = lo + 1 | 0;
        continue;
      }
      return t;
    } else {
      break;
    }
  }
  return void 0;
}
__name(_M0FP39dowdiness4loom4core18new__follow__tokenGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE, "_M0FP39dowdiness4loom4core18new__follow__tokenGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE");
function _M0FP39dowdiness4loom4core26trailing__context__matchesGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(cursor, node_end) {
  const old_follow = _M0FP39dowdiness4loom4core24old__follow__token__lazyGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(cursor, node_end);
  const new_follow = _M0FP39dowdiness4loom4core18new__follow__tokenGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(cursor, node_end);
  if (old_follow === void 0) {
    return new_follow === void 0;
  } else {
    const _Some = old_follow;
    const _old = _Some;
    if (new_follow === void 0) {
      return false;
    } else {
      const _Some$2 = new_follow;
      const _new_tok = _Some$2;
      const _func = cursor.spec.cst_token_matches;
      return _func(_old.kind, _old.text, _new_tok);
    }
  }
}
__name(_M0FP39dowdiness4loom4core26trailing__context__matchesGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE, "_M0FP39dowdiness4loom4core26trailing__context__matchesGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE");
function _M0MP39dowdiness4loom4core11ReuseCursor10pop__frameGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self) {
  const frame = _M0MPC15array5Array2atGRPB4JsonE(self.stack, self.stack.length - 1 | 0);
  const frame_end = frame.start_offset + frame.node.text_len | 0;
  _M0MPC15array5Array3popGRPC14json10WriteFrameE(self.stack);
  if (self.stack.length > 0) {
    const parent = _M0MPC15array5Array2atGRPB4JsonE(self.stack, self.stack.length - 1 | 0);
    parent.child_index = parent.child_index + 1 | 0;
    parent.current_child_offset = frame_end;
    return;
  } else {
    return;
  }
}
__name(_M0MP39dowdiness4loom4core11ReuseCursor10pop__frameGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE, "_M0MP39dowdiness4loom4core11ReuseCursor10pop__frameGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE");
function _M0MP39dowdiness4loom4core11ReuseCursor14seek__node__atGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self, target_offset, expected_kind) {
  if (target_offset < self.current_offset) {
    const root_frame = _M0MPC15array5Array2atGRPB4JsonE(self.stack, 0);
    _M0MPC15array5Array5drainGRP39dowdiness4loom4core11CursorFrameE(self.stack, 1, self.stack.length);
    root_frame.child_index = 0;
    root_frame.current_child_offset = 0;
    self.current_offset = 0;
  }
  while (true) {
    if (self.stack.length > 0) {
      const frame = _M0MPC15array5Array2atGRPB4JsonE(self.stack, self.stack.length - 1 | 0);
      const node = frame.node;
      let _tmp;
      if (frame.start_offset === target_offset) {
        const _p = node.kind;
        _tmp = _p === expected_kind;
      } else {
        _tmp = false;
      }
      if (_tmp) {
        return { _0: node, _1: frame.start_offset };
      }
      const node_end = frame.start_offset + node.text_len | 0;
      if (target_offset < frame.start_offset || target_offset >= node_end) {
        _M0MP39dowdiness4loom4core11ReuseCursor10pop__frameGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self);
        continue;
      }
      let child_offset = frame.current_child_offset;
      let found_child = false;
      while (true) {
        if (frame.child_index < node.children.length) {
          const child = _M0MPC15array5Array2atGRPB4JsonE(node.children, frame.child_index);
          const child_width = _M0MP29dowdiness4seam10CstElement9text__len(child);
          const child_end = child_offset + child_width | 0;
          if (target_offset < child_offset) {
            break;
          }
          if (target_offset < child_end) {
            if (child.$tag === 1) {
              const _Node = child;
              const _child_node = _Node._0;
              let _tmp$2;
              if (child_offset === target_offset) {
                const _p = _child_node.kind;
                _tmp$2 = _p === expected_kind;
              } else {
                _tmp$2 = false;
              }
              if (_tmp$2) {
                self.current_offset = child_offset;
                return { _0: _child_node, _1: child_offset };
              }
              _M0MPC15array5Array4pushGsE(self.stack, new _M0TP39dowdiness4loom4core11CursorFrame(_child_node, 0, child_offset, child_offset));
              found_child = true;
              break;
            } else {
              self.current_offset = child_offset;
              return void 0;
            }
          }
          child_offset = child_end;
          frame.current_child_offset = child_end;
          frame.child_index = frame.child_index + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      if (!found_child) {
        _M0MP39dowdiness4loom4core11ReuseCursor10pop__frameGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self);
      }
      continue;
    } else {
      break;
    }
  }
  return void 0;
}
__name(_M0MP39dowdiness4loom4core11ReuseCursor14seek__node__atGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE, "_M0MP39dowdiness4loom4core11ReuseCursor14seek__node__atGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE");
function _M0MP39dowdiness4loom4core11ReuseCursor10try__reuseGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self, expected_kind, byte_offset, token_pos) {
  if (self.reuse_globally_disabled || byte_offset >= self.damage_start && byte_offset < self.damage_end) {
    return void 0;
  }
  const result = _M0MP39dowdiness4loom4core11ReuseCursor14seek__node__atGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self, byte_offset, expected_kind);
  if (result === void 0) {
    return void 0;
  } else {
    const _Some = result;
    const _x = _Some;
    const _node = _x._0;
    const _node_offset = _x._1;
    const node_end = _node_offset + _node.text_len | 0;
    const _p = self.damage_start;
    const _p$2 = self.damage_end;
    if (!(node_end < _p || _node_offset >= _p$2)) {
      return void 0;
    } else {
      return !_M0FP39dowdiness4loom4core23leading__token__matchesGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(_node, self, token_pos) ? void 0 : !_M0FP39dowdiness4loom4core26trailing__context__matchesGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self, node_end) ? void 0 : _node;
    }
  }
}
__name(_M0MP39dowdiness4loom4core11ReuseCursor10try__reuseGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE, "_M0MP39dowdiness4loom4core11ReuseCursor10try__reuseGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE");
function _M0MP39dowdiness4loom4core11ReuseCursor25next__sibling__has__errorGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self) {
  if (self.stack.length === 0) {
    return false;
  }
  const frame = _M0MPC15array5Array2atGRPB4JsonE(self.stack, self.stack.length - 1 | 0);
  const next_idx = frame.child_index + 1 | 0;
  if (next_idx >= frame.node.children.length) {
    return false;
  }
  const _bind = _M0MPC15array5Array2atGRPB4JsonE(frame.node.children, next_idx);
  if (_bind.$tag === 1) {
    const _Node = _bind;
    const _n = _Node._0;
    return _n.has_any_error;
  } else {
    const _Token = _bind;
    const _t = _Token._0;
    const _p = _t.kind;
    const _p$2 = self.err_raw;
    if (_p === _p$2) {
      return true;
    } else {
      const _p$3 = _t.kind;
      const _p$4 = self.incomplete_raw;
      return _p$3 === _p$4;
    }
  }
}
__name(_M0MP39dowdiness4loom4core11ReuseCursor25next__sibling__has__errorGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE, "_M0MP39dowdiness4loom4core11ReuseCursor25next__sibling__has__errorGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE");
function _M0MP39dowdiness4loom4core11ReuseCursor13advance__pastGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self, node) {
  self.current_offset = self.current_offset + node.text_len | 0;
}
__name(_M0MP39dowdiness4loom4core11ReuseCursor13advance__pastGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE, "_M0MP39dowdiness4loom4core11ReuseCursor13advance__pastGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE");
function _M0MP39dowdiness4loom4core13ParserContext4peekGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self) {
  return _M0MP39dowdiness4loom4core13ParserContext9peek__nthGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self, 0);
}
__name(_M0MP39dowdiness4loom4core13ParserContext4peekGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE, "_M0MP39dowdiness4loom4core13ParserContext4peekGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE");
function _M0MP39dowdiness4loom4core13ParserContext9peek__nthGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self, n) {
  if (n < 0) {
    return _M0MP39dowdiness4loom4core13ParserContext4peekGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self);
  }
  let pos = self.position;
  let count = 0;
  while (true) {
    if (pos < self.token_count) {
      const _func = self.get_token;
      const t = _func(pos);
      if (_M0IP39dowdiness6lambda5token5TokenP29dowdiness4seam8IsTrivia10is__trivia(t)) {
        pos = pos + 1 | 0;
      } else {
        if (count === n) {
          return t;
        }
        count = count + 1 | 0;
        pos = pos + 1 | 0;
      }
      continue;
    } else {
      break;
    }
  }
  return self.spec.eof_token;
}
__name(_M0MP39dowdiness4loom4core13ParserContext9peek__nthGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE, "_M0MP39dowdiness4loom4core13ParserContext9peek__nthGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE");
function _M0MP39dowdiness4loom4core13ParserContext7at__eofGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self) {
  return _M0IP39dowdiness6lambda5token5TokenP29dowdiness4seam5IsEof7is__eof(_M0MP39dowdiness4loom4core13ParserContext4peekGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self));
}
__name(_M0MP39dowdiness4loom4core13ParserContext7at__eofGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE, "_M0MP39dowdiness4loom4core13ParserContext7at__eofGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE");
function _M0MP39dowdiness4loom4core13ParserContext17emit__zero__widthGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self, kind) {
  _M0MP29dowdiness4seam11EventBuffer4push(self.events, new _M0DTP29dowdiness4seam10ParseEvent5Token(_M0IP39dowdiness6lambda6syntax10SyntaxKindP29dowdiness4seam9ToRawKind7to__raw(kind), ""));
}
__name(_M0MP39dowdiness4loom4core13ParserContext17emit__zero__widthGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE, "_M0MP39dowdiness4loom4core13ParserContext17emit__zero__widthGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE");
function _M0MP39dowdiness4loom4core13ParserContext24emit__error__placeholderGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self) {
  _M0MP39dowdiness4loom4core13ParserContext17emit__zero__widthGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self, self.spec.error_kind);
}
__name(_M0MP39dowdiness4loom4core13ParserContext24emit__error__placeholderGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE, "_M0MP39dowdiness4loom4core13ParserContext24emit__error__placeholderGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE");
function _M0MP39dowdiness4loom4core13ParserContext24push__diagnostic__uniqueGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self, diag) {
  const _it = _M0MPC15array5Array5iter2GRP39dowdiness4loom4core10DiagnosticGRP39dowdiness6lambda5token5TokenEE(self.errors);
  while (true) {
    const _bind = _M0MPB5Iter24nextGiRP39dowdiness4loom4core10DiagnosticGRP39dowdiness6lambda5token5TokenEE(_it);
    if (_bind === void 0) {
      break;
    } else {
      const _Some = _bind;
      const _x = _Some;
      const _i = _x._0;
      const _existing = _x._1;
      if (_existing.message === diag.message && (_existing.start === diag.start && _existing.end === diag.end)) {
        _M0MPC15array5Array3setGRP49dowdiness22event_2dgraph_2dwalker8internal4core5OpRunE(self.errors, _i, diag);
        return false;
      }
      continue;
    }
  }
  _M0MPC15array5Array4pushGsE(self.errors, diag);
  self.error_count = self.error_count + 1 | 0;
  return true;
}
__name(_M0MP39dowdiness4loom4core13ParserContext24push__diagnostic__uniqueGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE, "_M0MP39dowdiness4loom4core13ParserContext24push__diagnostic__uniqueGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE");
function _M0MP39dowdiness4loom4core13ParserContext5errorGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self, msg) {
  let pos = self.position;
  while (true) {
    if (pos < self.token_count) {
      const _func = self.get_token;
      const token = _func(pos);
      if (_M0IP39dowdiness6lambda5token5TokenP29dowdiness4seam8IsTrivia10is__trivia(token)) {
        pos = pos + 1 | 0;
      } else {
        const _func$2 = self.get_start;
        const start = _func$2(pos);
        const _func$3 = self.get_end;
        const end = _func$3(pos);
        _M0MP39dowdiness4loom4core13ParserContext24push__diagnostic__uniqueGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self, new _M0TP39dowdiness4loom4core10DiagnosticGRP39dowdiness6lambda5token5TokenE(msg, start, end, token));
        return void 0;
      }
      continue;
    } else {
      break;
    }
  }
  const eof = self.source.length;
  _M0MP39dowdiness4loom4core13ParserContext24push__diagnostic__uniqueGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self, new _M0TP39dowdiness4loom4core10DiagnosticGRP39dowdiness6lambda5token5TokenE(msg, eof, eof, self.spec.eof_token));
}
__name(_M0MP39dowdiness4loom4core13ParserContext5errorGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE, "_M0MP39dowdiness4loom4core13ParserContext5errorGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE");
function _M0MP39dowdiness4loom4core13ParserContext15token__text__atGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self, pos) {
  if (pos < 0 || pos >= self.token_count) {
    return "";
  }
  const _func = self.get_start;
  const start = _func(pos);
  const _func$2 = self.get_end;
  const end = _func$2(pos);
  const slice = _M0MPC16string6String11sub_2einner(self.source, start, end);
  return _M0IPC16string10StringViewPB4Show10to__string(slice);
}
__name(_M0MP39dowdiness4loom4core13ParserContext15token__text__atGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE, "_M0MP39dowdiness4loom4core13ParserContext15token__text__atGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE");
function _M0MP39dowdiness4loom4core13ParserContext8text__atGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self, pos) {
  return _M0MP39dowdiness4loom4core13ParserContext15token__text__atGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self, pos);
}
__name(_M0MP39dowdiness4loom4core13ParserContext8text__atGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE, "_M0MP39dowdiness4loom4core13ParserContext8text__atGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE");
function _M0MP39dowdiness4loom4core13ParserContext13flush__triviaGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self) {
  while (true) {
    if (self.position < self.token_count) {
      const _func = self.get_token;
      const token = _func(self.position);
      if (_M0IP39dowdiness6lambda5token5TokenP29dowdiness4seam8IsTrivia10is__trivia(token)) {
        const text = _M0MP39dowdiness4loom4core13ParserContext8text__atGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self, self.position);
        _M0MP29dowdiness4seam11EventBuffer4push(self.events, new _M0DTP29dowdiness4seam10ParseEvent5Token(_M0IP39dowdiness6lambda6syntax10SyntaxKindP29dowdiness4seam9ToRawKind7to__raw(self.spec.whitespace_kind), text));
        self.position = self.position + 1 | 0;
      } else {
        return;
      }
      continue;
    } else {
      return;
    }
  }
}
__name(_M0MP39dowdiness4loom4core13ParserContext13flush__triviaGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE, "_M0MP39dowdiness4loom4core13ParserContext13flush__triviaGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE");
function _M0MP39dowdiness4loom4core13ParserContext11emit__tokenGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self, kind) {
  _M0MP39dowdiness4loom4core13ParserContext13flush__triviaGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self);
  if (_M0MP39dowdiness4loom4core13ParserContext7at__eofGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self)) {
    _M0MP39dowdiness4loom4core13ParserContext5errorGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self, "emit_token: unexpected EOF");
    _M0MP29dowdiness4seam11EventBuffer4push(self.events, new _M0DTP29dowdiness4seam10ParseEvent5Token(_M0IP39dowdiness6lambda6syntax10SyntaxKindP29dowdiness4seam9ToRawKind7to__raw(kind), ""));
    return void 0;
  }
  const text = _M0MP39dowdiness4loom4core13ParserContext8text__atGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self, self.position);
  _M0MP29dowdiness4seam11EventBuffer4push(self.events, new _M0DTP29dowdiness4seam10ParseEvent5Token(_M0IP39dowdiness6lambda6syntax10SyntaxKindP29dowdiness4seam9ToRawKind7to__raw(kind), text));
  self.position = self.position + 1 | 0;
}
__name(_M0MP39dowdiness4loom4core13ParserContext11emit__tokenGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE, "_M0MP39dowdiness4loom4core13ParserContext11emit__tokenGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE");
function _M0MP39dowdiness4loom4core13ParserContext11bump__errorGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self) {
  _M0MP39dowdiness4loom4core13ParserContext13flush__triviaGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self);
  const text = _M0MP39dowdiness4loom4core13ParserContext8text__atGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self, self.position);
  _M0MP29dowdiness4seam11EventBuffer4push(self.events, new _M0DTP29dowdiness4seam10ParseEvent5Token(_M0IP39dowdiness6lambda6syntax10SyntaxKindP29dowdiness4seam9ToRawKind7to__raw(self.spec.error_kind), text));
  self.position = self.position + 1 | 0;
}
__name(_M0MP39dowdiness4loom4core13ParserContext11bump__errorGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE, "_M0MP39dowdiness4loom4core13ParserContext11bump__errorGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE");
function _M0MP39dowdiness4loom4core13ParserContext12finish__nodeGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self) {
  if (self.open_nodes <= 0) {
    return void 0;
  }
  self.open_nodes = self.open_nodes - 1 | 0;
  _M0MP29dowdiness4seam11EventBuffer4push(self.events, _M0DTP29dowdiness4seam10ParseEvent10FinishNode__);
}
__name(_M0MP39dowdiness4loom4core13ParserContext12finish__nodeGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE, "_M0MP39dowdiness4loom4core13ParserContext12finish__nodeGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE");
function _M0MP39dowdiness4loom4core13ParserContext11start__nodeGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self, kind) {
  self.open_nodes = self.open_nodes + 1 | 0;
  _M0MP29dowdiness4seam11EventBuffer4push(self.events, new _M0DTP29dowdiness4seam10ParseEvent9StartNode(_M0IP39dowdiness6lambda6syntax10SyntaxKindP29dowdiness4seam9ToRawKind7to__raw(kind)));
}
__name(_M0MP39dowdiness4loom4core13ParserContext11start__nodeGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE, "_M0MP39dowdiness4loom4core13ParserContext11start__nodeGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE");
function _M0MP39dowdiness4loom4core13ParserContext11skip__untilGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self, is_sync) {
  let count = 0;
  const needs_wrap = !_M0MP39dowdiness4loom4core13ParserContext7at__eofGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self) && !is_sync(_M0MP39dowdiness4loom4core13ParserContext4peekGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self));
  if (needs_wrap) {
    _M0MP39dowdiness4loom4core13ParserContext11start__nodeGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self, self.spec.error_kind);
  }
  while (true) {
    if (!_M0MP39dowdiness4loom4core13ParserContext7at__eofGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self) && !is_sync(_M0MP39dowdiness4loom4core13ParserContext4peekGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self))) {
      _M0MP39dowdiness4loom4core13ParserContext11bump__errorGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self);
      count = count + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  if (needs_wrap) {
    _M0MP39dowdiness4loom4core13ParserContext12finish__nodeGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self);
  }
  return count;
}
__name(_M0MP39dowdiness4loom4core13ParserContext11skip__untilGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE, "_M0MP39dowdiness4loom4core13ParserContext11skip__untilGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE");
function _M0FP39dowdiness4loom4core29collect__reused__error__spansGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(node, node_start, spec, out) {
  const error_raw = _M0IP39dowdiness6lambda6syntax10SyntaxKindP29dowdiness4seam9ToRawKind7to__raw(spec.error_kind);
  const incomplete_raw = _M0IP39dowdiness6lambda6syntax10SyntaxKindP29dowdiness4seam9ToRawKind7to__raw(spec.incomplete_kind);
  let offset = node_start;
  let added = 0;
  const _bind = node.children;
  const _bind$2 = _bind.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$2) {
      const child = _bind[_];
      if (child.$tag === 0) {
        const _Token = child;
        const _t = _Token._0;
        const end = offset + _t.text.length | 0;
        let _tmp$2;
        const _p = _t.kind;
        if (_p === error_raw) {
          _tmp$2 = true;
        } else {
          const _p$2 = _t.kind;
          _tmp$2 = _p$2 === incomplete_raw;
        }
        if (_tmp$2) {
          _M0MPC15array5Array4pushGsE(out, new _M0TP39dowdiness4loom4core15ReusedErrorSpan(offset, end));
          added = added + 1 | 0;
        }
        offset = end;
      } else {
        const _Node = child;
        const _n = _Node._0;
        const child_added = _M0FP39dowdiness4loom4core29collect__reused__error__spansGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(_n, offset, spec, out);
        let _tmp$2;
        if (child_added === 0) {
          let _tmp$3;
          const _p = _n.kind;
          if (_p === error_raw) {
            _tmp$3 = true;
          } else {
            const _p$2 = _n.kind;
            _tmp$3 = _p$2 === incomplete_raw;
          }
          _tmp$2 = _tmp$3;
        } else {
          _tmp$2 = false;
        }
        if (_tmp$2) {
          _M0MPC15array5Array4pushGsE(out, new _M0TP39dowdiness4loom4core15ReusedErrorSpan(offset, offset + _n.text_len | 0));
          added = added + 1 | 0;
        } else {
          added = added + child_added | 0;
        }
        offset = offset + _n.text_len | 0;
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return added;
}
__name(_M0FP39dowdiness4loom4core29collect__reused__error__spansGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE, "_M0FP39dowdiness4loom4core29collect__reused__error__spansGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE");
function _M0MP39dowdiness4loom4core13ParserContext21advance__past__reusedGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self, node) {
  if (self.position >= self.token_count) {
    return void 0;
  }
  const _func = self.get_start;
  const node_end = _func(self.position) + node.text_len | 0;
  while (true) {
    let _tmp;
    if (self.position < self.token_count) {
      const _func$2 = self.get_start;
      _tmp = _func$2(self.position) < node_end;
    } else {
      _tmp = false;
    }
    if (_tmp) {
      self.position = self.position + 1 | 0;
      continue;
    } else {
      return;
    }
  }
}
__name(_M0MP39dowdiness4loom4core13ParserContext21advance__past__reusedGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE, "_M0MP39dowdiness4loom4core13ParserContext21advance__past__reusedGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE");
function _M0MP39dowdiness4loom4core13ParserContext27replay__reused__diagnosticsGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self, node_start, node_end, owns_right_boundary_zero_width_error, allow_eof_boundary) {
  let replayed_any = false;
  const _bind = self.reuse_diagnostics;
  if (_bind.$tag === 0) {
  } else {
    const _Some = _bind;
    const _prev = _Some._0;
    const _bind$2 = _prev.length;
    let _tmp = 0;
    while (true) {
      const _ = _tmp;
      if (_ < _bind$2) {
        const d = _prev[_];
        const keep_right_boundary = d.start === node_end && (d.end === node_end && (owns_right_boundary_zero_width_error || allow_eof_boundary && node_end >= self.source.length));
        if (d.start >= node_start && (d.end <= node_end && (d.start < node_end || keep_right_boundary))) {
          if (_M0MP39dowdiness4loom4core13ParserContext24push__diagnostic__uniqueGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self, d)) {
            replayed_any = true;
          }
        }
        _tmp = _ + 1 | 0;
        continue;
      } else {
        break;
      }
    }
  }
  return replayed_any;
}
__name(_M0MP39dowdiness4loom4core13ParserContext27replay__reused__diagnosticsGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE, "_M0MP39dowdiness4loom4core13ParserContext27replay__reused__diagnosticsGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE");
function _M0MP39dowdiness4loom4core13ParserContext26token__info__at__or__afterGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self, from_pos, byte_offset) {
  let pos = from_pos;
  while (true) {
    if (pos < self.token_count) {
      const _func = self.get_start;
      const start = _func(pos);
      const _func$2 = self.get_end;
      const end = _func$2(pos);
      if (start >= byte_offset || end > byte_offset) {
        const _func$3 = self.get_token;
        return new _M0TP39dowdiness4loom4core9TokenInfoGRP39dowdiness6lambda5token5TokenE(_func$3(pos), end - start | 0);
      }
      pos = pos + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return new _M0TP39dowdiness4loom4core9TokenInfoGRP39dowdiness6lambda5token5TokenE(self.spec.eof_token, 0);
}
__name(_M0MP39dowdiness4loom4core13ParserContext26token__info__at__or__afterGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE, "_M0MP39dowdiness4loom4core13ParserContext26token__info__at__or__afterGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE");
function _M0MP39dowdiness4loom4core13ParserContext31synthesize__reused__diagnosticsGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self, spans) {
  const _bind = spans.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const span = spans[_];
      const info = _M0MP39dowdiness4loom4core13ParserContext26token__info__at__or__afterGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self, self.position, span.start);
      _M0MP39dowdiness4loom4core13ParserContext24push__diagnostic__uniqueGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self, new _M0TP39dowdiness4loom4core10DiagnosticGRP39dowdiness6lambda5token5TokenE("reused syntax error", span.start, span.end, info.token));
      _tmp = _ + 1 | 0;
      continue;
    } else {
      return;
    }
  }
}
__name(_M0MP39dowdiness4loom4core13ParserContext31synthesize__reused__diagnosticsGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE, "_M0MP39dowdiness4loom4core13ParserContext31synthesize__reused__diagnosticsGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE");
function _M0MP39dowdiness4loom4core13ParserContext12emit__reusedGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self, node) {
  let node_start;
  if (self.position < self.token_count) {
    const _func = self.get_start;
    node_start = _func(self.position);
  } else {
    node_start = self.source.length;
  }
  const node_end = node_start + node.text_len | 0;
  _M0MP29dowdiness4seam11EventBuffer4push(self.events, new _M0DTP29dowdiness4seam10ParseEvent9ReuseNode(node));
  const _bind = self.reuse_cursor;
  let allow_eof_boundary;
  if (_bind === void 0) {
    allow_eof_boundary = true;
  } else {
    const _Some = _bind;
    const _cursor = _Some;
    allow_eof_boundary = !_M0MP39dowdiness4loom4core11ReuseCursor25next__sibling__has__errorGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(_cursor);
  }
  if (node.has_any_error) {
    const error_spans = [];
    _M0FP39dowdiness4loom4core29collect__reused__error__spansGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(node, node_start, self.spec, error_spans);
    const _p = _M0MPC15array5Array4iterGRP49dowdiness22event_2dgraph_2dwalker8internal4core5OpRunE(error_spans);
    let owns_right_boundary;
    while (true) {
      const _p$2 = _M0MPB4Iter4nextGUsRPB4JsonEE(_p);
      if (_p$2 === void 0) {
        owns_right_boundary = false;
        break;
      } else {
        const _p$3 = _p$2;
        const _p$4 = _p$3;
        if (_p$4.start === node_end && _p$4.end === node_end) {
          owns_right_boundary = true;
          break;
        }
        continue;
      }
    }
    if (!_M0MP39dowdiness4loom4core13ParserContext27replay__reused__diagnosticsGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self, node_start, node_end, owns_right_boundary, allow_eof_boundary)) {
      _M0MP39dowdiness4loom4core13ParserContext31synthesize__reused__diagnosticsGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self, error_spans);
    }
  } else {
    _M0MP39dowdiness4loom4core13ParserContext27replay__reused__diagnosticsGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self, node_start, node_end, false, allow_eof_boundary);
  }
  _M0MP39dowdiness4loom4core13ParserContext21advance__past__reusedGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self, node);
  const _bind$2 = self.reuse_cursor;
  if (_bind$2 === void 0) {
  } else {
    const _Some = _bind$2;
    const _cursor = _Some;
    _M0MP39dowdiness4loom4core11ReuseCursor13advance__pastGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(_cursor, node);
  }
  self.reuse_count = self.reuse_count + 1 | 0;
}
__name(_M0MP39dowdiness4loom4core13ParserContext12emit__reusedGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE, "_M0MP39dowdiness4loom4core13ParserContext12emit__reusedGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE");
function _M0MP39dowdiness4loom4core13ParserContext10try__reuseGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self, kind) {
  if (self.position >= self.token_count) {
    return void 0;
  }
  const _func = self.get_start;
  const byte_offset = _func(self.position);
  let token_pos = self.position;
  while (true) {
    let _tmp;
    if (token_pos < self.token_count) {
      const _func$2 = self.get_token;
      _tmp = _M0IP39dowdiness6lambda5token5TokenP29dowdiness4seam8IsTrivia10is__trivia(_func$2(token_pos));
    } else {
      _tmp = false;
    }
    if (_tmp) {
      token_pos = token_pos + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const _bind = self.reuse_cursor;
  if (_bind === void 0) {
    return void 0;
  } else {
    const _Some = _bind;
    const _cursor = _Some;
    return _M0MP39dowdiness4loom4core11ReuseCursor10try__reuseGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(_cursor, _M0IP39dowdiness6lambda6syntax10SyntaxKindP29dowdiness4seam9ToRawKind7to__raw(kind), byte_offset, token_pos);
  }
}
__name(_M0MP39dowdiness4loom4core13ParserContext10try__reuseGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE, "_M0MP39dowdiness4loom4core13ParserContext10try__reuseGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE");
function _M0MP39dowdiness4loom4core13ParserContext20node__with__recoveryGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self, kind, body, is_sync) {
  const _bind = _M0MP39dowdiness4loom4core13ParserContext10try__reuseGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self, kind);
  if (_bind === void 0) {
  } else {
    const _Some = _bind;
    const _reuse = _Some;
    _M0MP39dowdiness4loom4core13ParserContext12emit__reusedGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self, _reuse);
    return void 0;
  }
  _M0MP39dowdiness4loom4core13ParserContext11start__nodeGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self, kind);
  const ok = body();
  if (!ok) {
    _M0MP39dowdiness4loom4core13ParserContext11skip__untilGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self, is_sync);
  }
  _M0MP39dowdiness4loom4core13ParserContext12finish__nodeGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self);
}
__name(_M0MP39dowdiness4loom4core13ParserContext20node__with__recoveryGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE, "_M0MP39dowdiness4loom4core13ParserContext20node__with__recoveryGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE");
function _M0MP39dowdiness4loom4core12LanguageSpec11new_2einnerGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(whitespace_kind, error_kind, root_kind, eof_token, incomplete_kind, cst_token_matches, parse_root) {
  return new _M0TP39dowdiness4loom4core12LanguageSpecGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(whitespace_kind, error_kind, incomplete_kind, root_kind, eof_token, cst_token_matches, parse_root);
}
__name(_M0MP39dowdiness4loom4core12LanguageSpec11new_2einnerGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE, "_M0MP39dowdiness4loom4core12LanguageSpec11new_2einnerGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE");
function _M0MP39dowdiness4loom4core12LanguageSpec3newGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(whitespace_kind, error_kind, root_kind, eof_token, incomplete_kind$46$opt, cst_token_matches$46$opt, parse_root$46$opt) {
  let incomplete_kind;
  if (incomplete_kind$46$opt === void 0) {
    incomplete_kind = error_kind;
  } else {
    const _Some = incomplete_kind$46$opt;
    incomplete_kind = _Some;
  }
  let cst_token_matches;
  if (cst_token_matches$46$opt === void 0) {
    cst_token_matches = /* @__PURE__ */ __name((_discard_, _discard_$2, _discard_$3) => false, "cst_token_matches");
  } else {
    const _Some = cst_token_matches$46$opt;
    cst_token_matches = _Some;
  }
  let parse_root;
  if (parse_root$46$opt === void 0) {
    parse_root = /* @__PURE__ */ __name((_discard_) => {
    }, "parse_root");
  } else {
    const _Some = parse_root$46$opt;
    parse_root = _Some;
  }
  return _M0MP39dowdiness4loom4core12LanguageSpec11new_2einnerGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(whitespace_kind, error_kind, root_kind, eof_token, incomplete_kind, cst_token_matches, parse_root);
}
__name(_M0MP39dowdiness4loom4core12LanguageSpec3newGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE, "_M0MP39dowdiness4loom4core12LanguageSpec3newGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE");
function _M0MP39dowdiness4loom4core13ParserContext4markGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self) {
  return _M0MP29dowdiness4seam11EventBuffer4mark(self.events);
}
__name(_M0MP39dowdiness4loom4core13ParserContext4markGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE, "_M0MP39dowdiness4loom4core13ParserContext4markGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE");
function _M0MP39dowdiness4loom4core13ParserContext9start__atGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self, mark, kind) {
  _M0MP29dowdiness4seam11EventBuffer9start__at(self.events, mark, _M0IP39dowdiness6lambda6syntax10SyntaxKindP29dowdiness4seam9ToRawKind7to__raw(kind));
  self.open_nodes = self.open_nodes + 1 | 0;
}
__name(_M0MP39dowdiness4loom4core13ParserContext9start__atGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE, "_M0MP39dowdiness4loom4core13ParserContext9start__atGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE");
function _M0MP39dowdiness4loom4core13ParserContext4nodeGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self, kind, body) {
  const _bind = _M0MP39dowdiness4loom4core13ParserContext10try__reuseGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self, kind);
  if (_bind === void 0) {
    _M0MP39dowdiness4loom4core13ParserContext11start__nodeGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self, kind);
    body();
    _M0MP39dowdiness4loom4core13ParserContext12finish__nodeGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self);
    return;
  } else {
    const _Some = _bind;
    const _reuse = _Some;
    _M0MP39dowdiness4loom4core13ParserContext12emit__reusedGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self, _reuse);
    return;
  }
}
__name(_M0MP39dowdiness4loom4core13ParserContext4nodeGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE, "_M0MP39dowdiness4loom4core13ParserContext4nodeGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE");
function _M0MP39dowdiness4loom4core13ParserContext8wrap__atGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self, mark, kind, body) {
  _M0MP39dowdiness4loom4core13ParserContext9start__atGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self, mark, kind);
  body();
  _M0MP39dowdiness4loom4core13ParserContext12finish__nodeGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(self);
}
__name(_M0MP39dowdiness4loom4core13ParserContext8wrap__atGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE, "_M0MP39dowdiness4loom4core13ParserContext8wrap__atGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE");
function _M0MP39dowdiness4loom4core11PrefixLexer3newGRP39dowdiness6lambda5token5TokenE(lex_step) {
  return new _M0TP39dowdiness4loom4core11PrefixLexerGRP39dowdiness6lambda5token5TokenE(lex_step);
}
__name(_M0MP39dowdiness4loom4core11PrefixLexer3newGRP39dowdiness6lambda5token5TokenE, "_M0MP39dowdiness4loom4core11PrefixLexer3newGRP39dowdiness6lambda5token5TokenE");
function _M0IP39dowdiness6lambda5token5TokenPB2Eq5equal(_x_26, _x_27) {
  switch (_x_26.$tag) {
    case 0: {
      if (_x_27.$tag === 0) {
        return true;
      } else {
        return false;
      }
    }
    case 1: {
      if (_x_27.$tag === 1) {
        return true;
      } else {
        return false;
      }
    }
    case 2: {
      if (_x_27.$tag === 2) {
        return true;
      } else {
        return false;
      }
    }
    case 3: {
      if (_x_27.$tag === 3) {
        return true;
      } else {
        return false;
      }
    }
    case 4: {
      if (_x_27.$tag === 4) {
        return true;
      } else {
        return false;
      }
    }
    case 5: {
      if (_x_27.$tag === 5) {
        return true;
      } else {
        return false;
      }
    }
    case 6: {
      if (_x_27.$tag === 6) {
        return true;
      } else {
        return false;
      }
    }
    case 7: {
      if (_x_27.$tag === 7) {
        return true;
      } else {
        return false;
      }
    }
    case 8: {
      if (_x_27.$tag === 8) {
        return true;
      } else {
        return false;
      }
    }
    case 9: {
      if (_x_27.$tag === 9) {
        return true;
      } else {
        return false;
      }
    }
    case 10: {
      if (_x_27.$tag === 10) {
        return true;
      } else {
        return false;
      }
    }
    case 11: {
      if (_x_27.$tag === 11) {
        return true;
      } else {
        return false;
      }
    }
    case 12: {
      const _Identifier = _x_26;
      const _$42$x0_28 = _Identifier._0;
      if (_x_27.$tag === 12) {
        const _Identifier$2 = _x_27;
        const _$42$y0_29 = _Identifier$2._0;
        return _$42$x0_28 === _$42$y0_29;
      } else {
        return false;
      }
    }
    case 13: {
      const _Integer = _x_26;
      const _$42$x0_30 = _Integer._0;
      if (_x_27.$tag === 13) {
        const _Integer$2 = _x_27;
        const _$42$y0_31 = _Integer$2._0;
        return _$42$x0_30 === _$42$y0_31;
      } else {
        return false;
      }
    }
    case 14: {
      if (_x_27.$tag === 14) {
        return true;
      } else {
        return false;
      }
    }
    case 15: {
      if (_x_27.$tag === 15) {
        return true;
      } else {
        return false;
      }
    }
    case 16: {
      const _Error = _x_26;
      const _$42$x0_32 = _Error._0;
      if (_x_27.$tag === 16) {
        const _Error$2 = _x_27;
        const _$42$y0_33 = _Error$2._0;
        return _$42$x0_32 === _$42$y0_33;
      } else {
        return false;
      }
    }
    default: {
      if (_x_27.$tag === 17) {
        return true;
      } else {
        return false;
      }
    }
  }
}
__name(_M0IP39dowdiness6lambda5token5TokenPB2Eq5equal, "_M0IP39dowdiness6lambda5token5TokenPB2Eq5equal");
function _M0IP39dowdiness6lambda5token5TokenP29dowdiness4seam8IsTrivia10is__trivia(self) {
  return _M0IP39dowdiness6lambda5token5TokenPB2Eq5equal(self, _M0DTP39dowdiness6lambda5token5Token10Whitespace__);
}
__name(_M0IP39dowdiness6lambda5token5TokenP29dowdiness4seam8IsTrivia10is__trivia, "_M0IP39dowdiness6lambda5token5TokenP29dowdiness4seam8IsTrivia10is__trivia");
function _M0IP39dowdiness6lambda5token5TokenP29dowdiness4seam5IsEof7is__eof(self) {
  return _M0IP39dowdiness6lambda5token5TokenPB2Eq5equal(self, _M0DTP39dowdiness6lambda5token5Token3EOF__);
}
__name(_M0IP39dowdiness6lambda5token5TokenP29dowdiness4seam5IsEof7is__eof, "_M0IP39dowdiness6lambda5token5TokenP29dowdiness4seam5IsEof7is__eof");
function _M0FP39dowdiness6lambda5token12print__token(token) {
  switch (token.$tag) {
    case 0: {
      return "\u03BB";
    }
    case 1: {
      return ".";
    }
    case 2: {
      return "(";
    }
    case 3: {
      return ")";
    }
    case 4: {
      return "+";
    }
    case 5: {
      return "-";
    }
    case 6: {
      return "if";
    }
    case 7: {
      return "then";
    }
    case 8: {
      return "else";
    }
    case 9: {
      return "let";
    }
    case 10: {
      return "in";
    }
    case 11: {
      return "=";
    }
    case 12: {
      const _Identifier = token;
      return _Identifier._0;
    }
    case 13: {
      const _Integer = token;
      const _n = _Integer._0;
      return _M0MPC13int3Int18to__string_2einner(_n, 10);
    }
    case 14: {
      return "whitespace";
    }
    case 15: {
      return "newline";
    }
    case 16: {
      const _Error = token;
      const _msg = _Error._0;
      return `<error: ${_msg}>`;
    }
    default: {
      return "EOF";
    }
  }
}
__name(_M0FP39dowdiness6lambda5token12print__token, "_M0FP39dowdiness6lambda5token12print__token");
function _M0FP39dowdiness6lambda5lexer12is__alphabet(code) {
  return code >= 65 && code <= 90 || code >= 97 && code <= 122;
}
__name(_M0FP39dowdiness6lambda5lexer12is__alphabet, "_M0FP39dowdiness6lambda5lexer12is__alphabet");
function _M0FP39dowdiness6lambda5lexer16read__identifier(input, pos, acc) {
  let _tmp = pos;
  let _tmp$2 = acc;
  while (true) {
    const pos$2 = _tmp;
    const acc$2 = _tmp$2;
    if (pos$2 >= input.length) {
      return { _0: pos$2, _1: acc$2 };
    } else {
      $bound_check(input, pos$2);
      const code = input.charCodeAt(pos$2);
      if (_M0FP39dowdiness6lambda5lexer12is__alphabet(code) || code >= 48 && code <= 57) {
        const _bind = _M0MPC13int3Int8to__char(code);
        if (_bind === -1) {
          return { _0: pos$2, _1: acc$2 };
        } else {
          const _Some = _bind;
          const _ch = _Some;
          _tmp = pos$2 + 1 | 0;
          _tmp$2 = `${acc$2}${_M0IPC14char4CharPB4Show10to__string(_ch)}`;
          continue;
        }
      } else {
        return { _0: pos$2, _1: acc$2 };
      }
    }
  }
}
__name(_M0FP39dowdiness6lambda5lexer16read__identifier, "_M0FP39dowdiness6lambda5lexer16read__identifier");
function _M0FP39dowdiness6lambda5lexer12read__number(input, pos, acc) {
  let _tmp = pos;
  let _tmp$2 = acc;
  while (true) {
    const pos$2 = _tmp;
    const acc$2 = _tmp$2;
    if (pos$2 >= input.length) {
      return { _0: pos$2, _1: acc$2 };
    } else {
      $bound_check(input, pos$2);
      const code = input.charCodeAt(pos$2);
      if (code >= 48 && code <= 57) {
        const digit = code - 48 | 0;
        _tmp = pos$2 + 1 | 0;
        _tmp$2 = (Math.imul(acc$2, 10) | 0) + digit | 0;
        continue;
      } else {
        return { _0: pos$2, _1: acc$2 };
      }
    }
  }
}
__name(_M0FP39dowdiness6lambda5lexer12read__number, "_M0FP39dowdiness6lambda5lexer12read__number");
function _M0FP39dowdiness6lambda5lexer9step__lex(input, pos, layout) {
  if (pos >= input.length) {
    return _M0DTP39dowdiness4loom4core7LexStepGRP39dowdiness6lambda5token5TokenE4Done__;
  }
  $bound_check(input, pos);
  const c = _M0MPC16uint166UInt168to__char(input.charCodeAt(pos));
  _L: {
    _L$2: {
      if (c === -1) {
        return new _M0DTP39dowdiness4loom4core7LexStepGRP39dowdiness6lambda5token5TokenE7Invalid(pos, 1, `Error to read character at position ${_M0IP016_24default__implPB4Show10to__stringGiE(pos)}`);
      } else {
        const _Some = c;
        const _x = _Some;
        switch (_x) {
          case 10: {
            if (layout) {
              return new _M0DTP39dowdiness4loom4core7LexStepGRP39dowdiness6lambda5token5TokenE8Produced(_M0MP39dowdiness4loom4core9TokenInfo3newGRP39dowdiness6lambda5token5TokenE(_M0DTP39dowdiness6lambda5token5Token7Newline__, 1), pos + 1 | 0);
            } else {
              break _L$2;
            }
          }
          case 13: {
            if (layout) {
              let end;
              let _tmp;
              if ((pos + 1 | 0) < input.length) {
                const _tmp$2 = pos + 1 | 0;
                $bound_check(input, _tmp$2);
                _tmp = _M0IPC16option6OptionPB2Eq5equalGcE(_M0MPC16uint166UInt168to__char(input.charCodeAt(_tmp$2)), _M0FP39dowdiness6lambda5lexer25step__lex_2econstr_2f8317);
              } else {
                _tmp = false;
              }
              if (_tmp) {
                end = pos + 2 | 0;
              } else {
                end = pos + 1 | 0;
              }
              return new _M0DTP39dowdiness4loom4core7LexStepGRP39dowdiness6lambda5token5TokenE8Produced(_M0MP39dowdiness4loom4core9TokenInfo3newGRP39dowdiness6lambda5token5TokenE(_M0DTP39dowdiness6lambda5token5Token7Newline__, end - pos | 0), end);
            } else {
              break _L$2;
            }
          }
          case 32: {
            break _L$2;
          }
          case 9: {
            break _L$2;
          }
          case 955: {
            break _L;
          }
          case 92: {
            break _L;
          }
          case 46: {
            return new _M0DTP39dowdiness4loom4core7LexStepGRP39dowdiness6lambda5token5TokenE8Produced(_M0MP39dowdiness4loom4core9TokenInfo3newGRP39dowdiness6lambda5token5TokenE(_M0DTP39dowdiness6lambda5token5Token3Dot__, 1), pos + 1 | 0);
          }
          case 40: {
            return new _M0DTP39dowdiness4loom4core7LexStepGRP39dowdiness6lambda5token5TokenE8Produced(_M0MP39dowdiness4loom4core9TokenInfo3newGRP39dowdiness6lambda5token5TokenE(_M0DTP39dowdiness6lambda5token5Token9LeftParen__, 1), pos + 1 | 0);
          }
          case 41: {
            return new _M0DTP39dowdiness4loom4core7LexStepGRP39dowdiness6lambda5token5TokenE8Produced(_M0MP39dowdiness4loom4core9TokenInfo3newGRP39dowdiness6lambda5token5TokenE(_M0DTP39dowdiness6lambda5token5Token10RightParen__, 1), pos + 1 | 0);
          }
          case 43: {
            return new _M0DTP39dowdiness4loom4core7LexStepGRP39dowdiness6lambda5token5TokenE8Produced(_M0MP39dowdiness4loom4core9TokenInfo3newGRP39dowdiness6lambda5token5TokenE(_M0DTP39dowdiness6lambda5token5Token4Plus__, 1), pos + 1 | 0);
          }
          case 45: {
            return new _M0DTP39dowdiness4loom4core7LexStepGRP39dowdiness6lambda5token5TokenE8Produced(_M0MP39dowdiness4loom4core9TokenInfo3newGRP39dowdiness6lambda5token5TokenE(_M0DTP39dowdiness6lambda5token5Token5Minus__, 1), pos + 1 | 0);
          }
          case 61: {
            return new _M0DTP39dowdiness4loom4core7LexStepGRP39dowdiness6lambda5token5TokenE8Produced(_M0MP39dowdiness4loom4core9TokenInfo3newGRP39dowdiness6lambda5token5TokenE(_M0DTP39dowdiness6lambda5token5Token2Eq__, 1), pos + 1 | 0);
          }
          default: {
            if (_M0FP39dowdiness6lambda5lexer12is__alphabet(_x)) {
              const _bind = _M0FP39dowdiness6lambda5lexer16read__identifier(input, pos, "");
              const _new_pos = _bind._0;
              const _identifier = _bind._1;
              let token;
              switch (_identifier) {
                case "if": {
                  token = _M0DTP39dowdiness6lambda5token5Token2If__;
                  break;
                }
                case "then": {
                  token = _M0DTP39dowdiness6lambda5token5Token4Then__;
                  break;
                }
                case "else": {
                  token = _M0DTP39dowdiness6lambda5token5Token4Else__;
                  break;
                }
                case "let": {
                  token = _M0DTP39dowdiness6lambda5token5Token3Let__;
                  break;
                }
                case "in": {
                  token = _M0DTP39dowdiness6lambda5token5Token2In__;
                  break;
                }
                default: {
                  token = new _M0DTP39dowdiness6lambda5token5Token10Identifier(_identifier);
                }
              }
              return new _M0DTP39dowdiness4loom4core7LexStepGRP39dowdiness6lambda5token5TokenE8Produced(_M0MP39dowdiness4loom4core9TokenInfo3newGRP39dowdiness6lambda5token5TokenE(token, _new_pos - pos | 0), _new_pos);
            } else {
              const _p = _x;
              if (_p >= 48 && _p <= 57) {
                const _bind = _M0FP39dowdiness6lambda5lexer12read__number(input, pos, 0);
                const _new_pos = _bind._0;
                const _number = _bind._1;
                return new _M0DTP39dowdiness4loom4core7LexStepGRP39dowdiness6lambda5token5TokenE8Produced(_M0MP39dowdiness4loom4core9TokenInfo3newGRP39dowdiness6lambda5token5TokenE(new _M0DTP39dowdiness6lambda5token5Token7Integer(_number), _new_pos - pos | 0), _new_pos);
              } else {
                return new _M0DTP39dowdiness4loom4core7LexStepGRP39dowdiness6lambda5token5TokenE7Invalid(pos, 1, `unexpected character: ${_M0IPC14char4CharPB4Show10to__string(_x)} at position ${_M0IP016_24default__implPB4Show10to__stringGiE(pos)}`);
              }
            }
          }
        }
      }
    }
    let ws_end = pos + 1 | 0;
    while (true) {
      if (ws_end < input.length) {
        _L$3: {
          _L$4: {
            _L$5: {
              _L$6: {
                _L$7: {
                  const _tmp = ws_end;
                  $bound_check(input, _tmp);
                  const _bind = _M0MPC16uint166UInt168to__char(input.charCodeAt(_tmp));
                  if (_bind === -1) {
                    break _L$4;
                  } else {
                    const _Some = _bind;
                    const _x = _Some;
                    switch (_x) {
                      case 32: {
                        if (!layout) {
                          break _L$7;
                        } else {
                          if (layout) {
                            break _L$6;
                          } else {
                            break _L$4;
                          }
                        }
                      }
                      case 9: {
                        if (!layout) {
                          break _L$7;
                        } else {
                          if (layout) {
                            break _L$6;
                          } else {
                            break _L$4;
                          }
                        }
                      }
                      case 10: {
                        if (!layout) {
                          break _L$7;
                        } else {
                          break _L$4;
                        }
                      }
                      case 13: {
                        if (!layout) {
                          break _L$7;
                        } else {
                          break _L$4;
                        }
                      }
                      default: {
                        break _L$4;
                      }
                    }
                  }
                }
                ws_end = ws_end + 1 | 0;
                break _L$5;
              }
              ws_end = ws_end + 1 | 0;
            }
            break _L$3;
          }
          break;
        }
        continue;
      } else {
        break;
      }
    }
    return new _M0DTP39dowdiness4loom4core7LexStepGRP39dowdiness6lambda5token5TokenE8Produced(_M0MP39dowdiness4loom4core9TokenInfo3newGRP39dowdiness6lambda5token5TokenE(_M0DTP39dowdiness6lambda5token5Token10Whitespace__, ws_end - pos | 0), ws_end);
  }
  return new _M0DTP39dowdiness4loom4core7LexStepGRP39dowdiness6lambda5token5TokenE8Produced(_M0MP39dowdiness4loom4core9TokenInfo3newGRP39dowdiness6lambda5token5TokenE(_M0DTP39dowdiness6lambda5token5Token6Lambda__, 1), pos + 1 | 0);
}
__name(_M0FP39dowdiness6lambda5lexer9step__lex, "_M0FP39dowdiness6lambda5lexer9step__lex");
function _M0FP39dowdiness6lambda5lexer20tokenize__via__steps(input, layout) {
  const tokens = [];
  let pos = 0;
  _L:
    while (true) {
      const _bind = _M0FP39dowdiness6lambda5lexer9step__lex(input, pos, layout);
      switch (_bind.$tag) {
        case 0: {
          const _Produced = _bind;
          const _tok = _Produced._0;
          const _next_offset = _Produced._1;
          _M0MPC15array5Array4pushGsE(tokens, _tok);
          pos = _next_offset;
          break;
        }
        case 1: {
          const _Invalid = _bind;
          const _message = _Invalid._2;
          return new _M0DTPC16result6ResultGRPB5ArrayGRP39dowdiness4loom4core9TokenInfoGRP39dowdiness6lambda5token5TokenEERP39dowdiness4loom4core8LexErrorE3Err(new _M0DTPC15error5Error45dowdiness_2floom_2fcore_2eLexError_2eLexError(_message));
        }
        case 2: {
          const _Incomplete = _bind;
          const _expected = _Incomplete._1;
          return new _M0DTPC16result6ResultGRPB5ArrayGRP39dowdiness4loom4core9TokenInfoGRP39dowdiness6lambda5token5TokenEERP39dowdiness4loom4core8LexErrorE3Err(new _M0DTPC15error5Error45dowdiness_2floom_2fcore_2eLexError_2eLexError(_expected));
        }
        default: {
          _M0MPC15array5Array4pushGsE(tokens, _M0MP39dowdiness4loom4core9TokenInfo3newGRP39dowdiness6lambda5token5TokenE(_M0DTP39dowdiness6lambda5token5Token3EOF__, 0));
          break _L;
        }
      }
      continue;
    }
  return new _M0DTPC16result6ResultGRPB5ArrayGRP39dowdiness4loom4core9TokenInfoGRP39dowdiness6lambda5token5TokenEERP39dowdiness4loom4core8LexErrorE2Ok(tokens);
}
__name(_M0FP39dowdiness6lambda5lexer20tokenize__via__steps, "_M0FP39dowdiness6lambda5lexer20tokenize__via__steps");
function _M0FP39dowdiness6lambda5lexer19lambda__step__lexer(source, start) {
  return _M0FP39dowdiness6lambda5lexer9step__lex(source, start, true);
}
__name(_M0FP39dowdiness6lambda5lexer19lambda__step__lexer, "_M0FP39dowdiness6lambda5lexer19lambda__step__lexer");
function _M0FP39dowdiness6lambda5lexer8tokenize(input) {
  return _M0FP39dowdiness6lambda5lexer20tokenize__via__steps(input, true);
}
__name(_M0FP39dowdiness6lambda5lexer8tokenize, "_M0FP39dowdiness6lambda5lexer8tokenize");
function _M0IP39dowdiness6lambda6syntax10SyntaxKindPB4Show6output(_x_12, _x_13) {
  switch (_x_12) {
    case 0: {
      _x_13.method_table.method_0(_x_13.self, "LambdaToken");
      return;
    }
    case 1: {
      _x_13.method_table.method_0(_x_13.self, "DotToken");
      return;
    }
    case 2: {
      _x_13.method_table.method_0(_x_13.self, "LeftParenToken");
      return;
    }
    case 3: {
      _x_13.method_table.method_0(_x_13.self, "RightParenToken");
      return;
    }
    case 4: {
      _x_13.method_table.method_0(_x_13.self, "PlusToken");
      return;
    }
    case 5: {
      _x_13.method_table.method_0(_x_13.self, "MinusToken");
      return;
    }
    case 6: {
      _x_13.method_table.method_0(_x_13.self, "IfKeyword");
      return;
    }
    case 7: {
      _x_13.method_table.method_0(_x_13.self, "ThenKeyword");
      return;
    }
    case 8: {
      _x_13.method_table.method_0(_x_13.self, "ElseKeyword");
      return;
    }
    case 9: {
      _x_13.method_table.method_0(_x_13.self, "IdentToken");
      return;
    }
    case 10: {
      _x_13.method_table.method_0(_x_13.self, "IntToken");
      return;
    }
    case 11: {
      _x_13.method_table.method_0(_x_13.self, "WhitespaceToken");
      return;
    }
    case 12: {
      _x_13.method_table.method_0(_x_13.self, "ErrorToken");
      return;
    }
    case 13: {
      _x_13.method_table.method_0(_x_13.self, "EofToken");
      return;
    }
    case 14: {
      _x_13.method_table.method_0(_x_13.self, "LambdaExpr");
      return;
    }
    case 15: {
      _x_13.method_table.method_0(_x_13.self, "AppExpr");
      return;
    }
    case 16: {
      _x_13.method_table.method_0(_x_13.self, "BinaryExpr");
      return;
    }
    case 17: {
      _x_13.method_table.method_0(_x_13.self, "IfExpr");
      return;
    }
    case 18: {
      _x_13.method_table.method_0(_x_13.self, "ParenExpr");
      return;
    }
    case 19: {
      _x_13.method_table.method_0(_x_13.self, "IntLiteral");
      return;
    }
    case 20: {
      _x_13.method_table.method_0(_x_13.self, "VarRef");
      return;
    }
    case 21: {
      _x_13.method_table.method_0(_x_13.self, "ErrorNode");
      return;
    }
    case 22: {
      _x_13.method_table.method_0(_x_13.self, "SourceFile");
      return;
    }
    case 23: {
      _x_13.method_table.method_0(_x_13.self, "LetKeyword");
      return;
    }
    case 24: {
      _x_13.method_table.method_0(_x_13.self, "EqToken");
      return;
    }
    case 25: {
      _x_13.method_table.method_0(_x_13.self, "LetDef");
      return;
    }
    default: {
      _x_13.method_table.method_0(_x_13.self, "NewlineToken");
      return;
    }
  }
}
__name(_M0IP39dowdiness6lambda6syntax10SyntaxKindPB4Show6output, "_M0IP39dowdiness6lambda6syntax10SyntaxKindPB4Show6output");
function _M0IP39dowdiness6lambda6syntax10SyntaxKindP29dowdiness4seam9ToRawKind7to__raw(self) {
  let n;
  switch (self) {
    case 0: {
      n = 0;
      break;
    }
    case 1: {
      n = 1;
      break;
    }
    case 2: {
      n = 2;
      break;
    }
    case 3: {
      n = 3;
      break;
    }
    case 4: {
      n = 4;
      break;
    }
    case 5: {
      n = 5;
      break;
    }
    case 6: {
      n = 6;
      break;
    }
    case 7: {
      n = 7;
      break;
    }
    case 8: {
      n = 8;
      break;
    }
    case 9: {
      n = 9;
      break;
    }
    case 10: {
      n = 10;
      break;
    }
    case 11: {
      n = 11;
      break;
    }
    case 12: {
      n = 12;
      break;
    }
    case 13: {
      n = 13;
      break;
    }
    case 14: {
      n = 14;
      break;
    }
    case 15: {
      n = 15;
      break;
    }
    case 16: {
      n = 16;
      break;
    }
    case 17: {
      n = 17;
      break;
    }
    case 18: {
      n = 18;
      break;
    }
    case 19: {
      n = 19;
      break;
    }
    case 20: {
      n = 20;
      break;
    }
    case 21: {
      n = 21;
      break;
    }
    case 22: {
      n = 22;
      break;
    }
    case 23: {
      n = 23;
      break;
    }
    case 24: {
      n = 25;
      break;
    }
    case 25: {
      n = 27;
      break;
    }
    default: {
      n = 28;
    }
  }
  return n;
}
__name(_M0IP39dowdiness6lambda6syntax10SyntaxKindP29dowdiness4seam9ToRawKind7to__raw, "_M0IP39dowdiness6lambda6syntax10SyntaxKindP29dowdiness4seam9ToRawKind7to__raw");
function _M0IP39dowdiness6lambda6syntax10SyntaxKindP29dowdiness4seam11FromRawKind9from__raw(raw) {
  const _n = raw;
  switch (_n) {
    case 0: {
      return 0;
    }
    case 1: {
      return 1;
    }
    case 2: {
      return 2;
    }
    case 3: {
      return 3;
    }
    case 4: {
      return 4;
    }
    case 5: {
      return 5;
    }
    case 6: {
      return 6;
    }
    case 7: {
      return 7;
    }
    case 8: {
      return 8;
    }
    case 9: {
      return 9;
    }
    case 10: {
      return 10;
    }
    case 11: {
      return 11;
    }
    case 12: {
      return 12;
    }
    case 13: {
      return 13;
    }
    case 14: {
      return 14;
    }
    case 15: {
      return 15;
    }
    case 16: {
      return 16;
    }
    case 17: {
      return 17;
    }
    case 18: {
      return 18;
    }
    case 19: {
      return 19;
    }
    case 20: {
      return 20;
    }
    case 21: {
      return 21;
    }
    case 22: {
      return 22;
    }
    case 23: {
      return 23;
    }
    case 25: {
      return 24;
    }
    case 27: {
      return 25;
    }
    case 28: {
      return 26;
    }
    default: {
      return 21;
    }
  }
}
__name(_M0IP39dowdiness6lambda6syntax10SyntaxKindP29dowdiness4seam11FromRawKind9from__raw, "_M0IP39dowdiness6lambda6syntax10SyntaxKindP29dowdiness4seam11FromRawKind9from__raw");
function _M0MP29dowdiness4loom7Grammar11new_2einnerGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindRP39dowdiness6lambda3ast4TermE(spec, tokenize, fold_node, on_lex_error, error_token, prefix_lexer) {
  return new _M0TP29dowdiness4loom7GrammarGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindRP39dowdiness6lambda3ast4TermE(spec, tokenize, fold_node, on_lex_error, error_token, prefix_lexer);
}
__name(_M0MP29dowdiness4loom7Grammar11new_2einnerGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindRP39dowdiness6lambda3ast4TermE, "_M0MP29dowdiness4loom7Grammar11new_2einnerGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindRP39dowdiness6lambda3ast4TermE");
function _M0MP29dowdiness6lambda14LambdaExprView5param(self) {
  return _M0MP29dowdiness4seam10SyntaxNode11token__text(self.node, _M0IP39dowdiness6lambda6syntax10SyntaxKindP29dowdiness4seam9ToRawKind7to__raw(9));
}
__name(_M0MP29dowdiness6lambda14LambdaExprView5param, "_M0MP29dowdiness6lambda14LambdaExprView5param");
function _M0MP29dowdiness6lambda14LambdaExprView4body(self) {
  return _M0MP29dowdiness4seam10SyntaxNode10nth__child(self.node, 0);
}
__name(_M0MP29dowdiness6lambda14LambdaExprView4body, "_M0MP29dowdiness6lambda14LambdaExprView4body");
function _M0MP29dowdiness6lambda11AppExprView4func(self) {
  return _M0MP29dowdiness4seam10SyntaxNode10nth__child(self.node, 0);
}
__name(_M0MP29dowdiness6lambda11AppExprView4func, "_M0MP29dowdiness6lambda11AppExprView4func");
function _M0MP29dowdiness6lambda11AppExprView4args(self) {
  return _M0MP29dowdiness4seam10SyntaxNode14children__from(self.node, 1);
}
__name(_M0MP29dowdiness6lambda11AppExprView4args, "_M0MP29dowdiness6lambda11AppExprView4args");
function _M0MP29dowdiness6lambda10IfExprView9condition(self) {
  return _M0MP29dowdiness4seam10SyntaxNode10nth__child(self.node, 0);
}
__name(_M0MP29dowdiness6lambda10IfExprView9condition, "_M0MP29dowdiness6lambda10IfExprView9condition");
function _M0MP29dowdiness6lambda10IfExprView12then__branch(self) {
  return _M0MP29dowdiness4seam10SyntaxNode10nth__child(self.node, 1);
}
__name(_M0MP29dowdiness6lambda10IfExprView12then__branch, "_M0MP29dowdiness6lambda10IfExprView12then__branch");
function _M0MP29dowdiness6lambda10IfExprView12else__branch(self) {
  return _M0MP29dowdiness4seam10SyntaxNode10nth__child(self.node, 2);
}
__name(_M0MP29dowdiness6lambda10IfExprView12else__branch, "_M0MP29dowdiness6lambda10IfExprView12else__branch");
function _M0MP29dowdiness6lambda13ParenExprView5inner(self) {
  return _M0MP29dowdiness4seam10SyntaxNode10nth__child(self.node, 0);
}
__name(_M0MP29dowdiness6lambda13ParenExprView5inner, "_M0MP29dowdiness6lambda13ParenExprView5inner");
function _M0MP29dowdiness6lambda14IntLiteralView5value(self) {
  const _bind = _M0MP29dowdiness4seam10SyntaxNode11find__token(self.node, _M0IP39dowdiness6lambda6syntax10SyntaxKindP29dowdiness4seam9ToRawKind7to__raw(10));
  if (_bind === void 0) {
    return void 0;
  } else {
    const _Some = _bind;
    const _t = _Some;
    let n;
    let _try_err;
    _L: {
      _L$2: {
        const _bind$2 = _t.cst.text;
        const _bind$3 = _M0FPC17strconv18parse__int_2einner(new _M0TPC16string10StringView(_bind$2, 0, _bind$2.length), 0);
        if (_bind$3.$tag === 1) {
          const _ok = _bind$3;
          n = _ok._0;
        } else {
          const _err = _bind$3;
          _try_err = _err._0;
          break _L$2;
        }
        break _L;
      }
      return void 0;
    }
    return n;
  }
}
__name(_M0MP29dowdiness6lambda14IntLiteralView5value, "_M0MP29dowdiness6lambda14IntLiteralView5value");
function _M0MP29dowdiness6lambda10VarRefView4name(self) {
  return _M0MP29dowdiness4seam10SyntaxNode11token__text(self.node, _M0IP39dowdiness6lambda6syntax10SyntaxKindP29dowdiness4seam9ToRawKind7to__raw(9));
}
__name(_M0MP29dowdiness6lambda10VarRefView4name, "_M0MP29dowdiness6lambda10VarRefView4name");
function _M0MP29dowdiness6lambda10LetDefView4name(self) {
  return _M0MP29dowdiness4seam10SyntaxNode11token__text(self.node, _M0IP39dowdiness6lambda6syntax10SyntaxKindP29dowdiness4seam9ToRawKind7to__raw(9));
}
__name(_M0MP29dowdiness6lambda10LetDefView4name, "_M0MP29dowdiness6lambda10LetDefView4name");
function _M0MP29dowdiness6lambda10LetDefView4init(self) {
  return _M0MP29dowdiness4seam10SyntaxNode10nth__child(self.node, 0);
}
__name(_M0MP29dowdiness6lambda10LetDefView4init, "_M0MP29dowdiness6lambda10LetDefView4init");
function _M0FP29dowdiness6lambda17fold__node__inner(node, recurse) {
  const _bind = _M0IP39dowdiness6lambda6syntax10SyntaxKindP29dowdiness4seam11FromRawKind9from__raw(node.cst.kind);
  switch (_bind) {
    case 19: {
      const v = new _M0TP29dowdiness6lambda14IntLiteralView(node);
      const _p = _M0MP29dowdiness6lambda14IntLiteralView5value(v);
      const _p$2 = 0;
      let _tmp;
      if (_p === void 0) {
        _tmp = _p$2;
      } else {
        const _p$3 = _p;
        _tmp = _p$3;
      }
      return new _M0DTP39dowdiness6lambda3ast4Term3Int(_tmp);
    }
    case 20: {
      const v$2 = new _M0TP29dowdiness6lambda10VarRefView(node);
      return new _M0DTP39dowdiness6lambda3ast4Term3Var(_M0MP29dowdiness6lambda10VarRefView4name(v$2));
    }
    case 14: {
      const v$3 = new _M0TP29dowdiness6lambda14LambdaExprView(node);
      const _bind$2 = _M0MP29dowdiness6lambda14LambdaExprView4body(v$3);
      let body;
      if (_bind$2 === void 0) {
        body = _M0FP29dowdiness6lambda33fold__node__inner_2econstr_2f9597;
      } else {
        const _Some = _bind$2;
        const _b = _Some;
        body = recurse(_b);
      }
      return new _M0DTP39dowdiness6lambda3ast4Term3Lam(_M0MP29dowdiness6lambda14LambdaExprView5param(v$3), body);
    }
    case 15: {
      const v$4 = new _M0TP29dowdiness6lambda11AppExprView(node);
      const _bind$3 = _M0MP29dowdiness6lambda11AppExprView4func(v$4);
      if (_bind$3 === void 0) {
        return _M0FP29dowdiness6lambda33fold__node__inner_2econstr_2f9598;
      } else {
        const _Some = _bind$3;
        const _func_node = _Some;
        let result = recurse(_func_node);
        const _bind$4 = _M0MP29dowdiness6lambda11AppExprView4args(v$4);
        const _bind$5 = _bind$4.length;
        let _tmp$2 = 0;
        while (true) {
          const _ = _tmp$2;
          if (_ < _bind$5) {
            const arg = _bind$4[_];
            result = new _M0DTP39dowdiness6lambda3ast4Term3App(result, recurse(arg));
            _tmp$2 = _ + 1 | 0;
            continue;
          } else {
            break;
          }
        }
        return result;
      }
    }
    case 16: {
      const _bind$4 = _M0MP29dowdiness4seam10SyntaxNode18nodes__and__tokens(node, _M0DTPC16option6OptionGORP29dowdiness4seam7RawKindE4None__);
      const _children = _bind$4._0;
      const _all_tokens = _bind$4._1;
      const ops = [];
      const _bind$5 = _all_tokens.length;
      let _tmp$2 = 0;
      while (true) {
        const _ = _tmp$2;
        if (_ < _bind$5) {
          const t = _all_tokens[_];
          const _p$3 = t.cst.kind;
          const _p$4 = _M0IP39dowdiness6lambda6syntax10SyntaxKindP29dowdiness4seam9ToRawKind7to__raw(4);
          if (_p$3 === _p$4) {
            _M0MPC15array5Array4pushGRP39dowdiness6lambda3ast3BopE(ops, 0);
          } else {
            const _p$5 = t.cst.kind;
            const _p$6 = _M0IP39dowdiness6lambda6syntax10SyntaxKindP29dowdiness4seam9ToRawKind7to__raw(5);
            if (_p$5 === _p$6) {
              _M0MPC15array5Array4pushGRP39dowdiness6lambda3ast3BopE(ops, 1);
            }
          }
          _tmp$2 = _ + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      if (_children.length >= 2) {
        let result = recurse(_M0MPC15array5Array2atGRPB4JsonE(_children, 0));
        let _tmp$3 = 1;
        while (true) {
          const i = _tmp$3;
          if (i < _children.length) {
            const op = (i - 1 | 0) < ops.length ? _M0MPC15array5Array2atGRP39dowdiness6lambda3ast3BopE(ops, i - 1 | 0) : 0;
            result = new _M0DTP39dowdiness6lambda3ast4Term3Bop(op, result, recurse(_M0MPC15array5Array2atGRPB4JsonE(_children, i)));
            _tmp$3 = i + 1 | 0;
            continue;
          } else {
            break;
          }
        }
        return result;
      } else {
        return _children.length === 1 ? recurse(_M0MPC15array5Array2atGRPB4JsonE(_children, 0)) : _M0FP29dowdiness6lambda33fold__node__inner_2econstr_2f9599;
      }
    }
    case 17: {
      const v$5 = new _M0TP29dowdiness6lambda10IfExprView(node);
      const _bind$6 = _M0MP29dowdiness6lambda10IfExprView9condition(v$5);
      let cond;
      if (_bind$6 === void 0) {
        cond = _M0FP29dowdiness6lambda33fold__node__inner_2econstr_2f9600;
      } else {
        const _Some = _bind$6;
        const _n = _Some;
        cond = recurse(_n);
      }
      const _bind$7 = _M0MP29dowdiness6lambda10IfExprView12then__branch(v$5);
      let then_;
      if (_bind$7 === void 0) {
        then_ = _M0FP29dowdiness6lambda33fold__node__inner_2econstr_2f9601;
      } else {
        const _Some = _bind$7;
        const _n = _Some;
        then_ = recurse(_n);
      }
      const _bind$8 = _M0MP29dowdiness6lambda10IfExprView12else__branch(v$5);
      let else_;
      if (_bind$8 === void 0) {
        else_ = _M0FP29dowdiness6lambda33fold__node__inner_2econstr_2f9602;
      } else {
        const _Some = _bind$8;
        const _n = _Some;
        else_ = recurse(_n);
      }
      return new _M0DTP39dowdiness6lambda3ast4Term2If(cond, then_, else_);
    }
    case 18: {
      const v$6 = new _M0TP29dowdiness6lambda13ParenExprView(node);
      const _bind$9 = _M0MP29dowdiness6lambda13ParenExprView5inner(v$6);
      if (_bind$9 === void 0) {
        return _M0FP29dowdiness6lambda33fold__node__inner_2econstr_2f9603;
      } else {
        const _Some = _bind$9;
        const _inner = _Some;
        return recurse(_inner);
      }
    }
    case 21: {
      return _M0FP29dowdiness6lambda33fold__node__inner_2econstr_2f9604;
    }
    default: {
      return new _M0DTP39dowdiness6lambda3ast4Term5Error(`unknown node kind: ${_M0IP016_24default__implPB4Show10to__stringGRP39dowdiness6lambda6syntax10SyntaxKindE(_M0IP39dowdiness6lambda6syntax10SyntaxKindP29dowdiness4seam11FromRawKind9from__raw(node.cst.kind))}`);
    }
  }
}
__name(_M0FP29dowdiness6lambda17fold__node__inner, "_M0FP29dowdiness6lambda17fold__node__inner");
function _M0FP29dowdiness6lambda18lambda__fold__node(node, recurse) {
  const _bind = _M0IP39dowdiness6lambda6syntax10SyntaxKindP29dowdiness4seam11FromRawKind9from__raw(node.cst.kind);
  if (_bind === 22) {
    const defs = [];
    let final_term = _M0DTP39dowdiness6lambda3ast4Term4Unit__;
    const _bind$2 = _M0MP29dowdiness4seam10SyntaxNode8children(node);
    const _bind$3 = _bind$2.length;
    let _tmp = 0;
    while (true) {
      const _ = _tmp;
      if (_ < _bind$3) {
        const child = _bind$2[_];
        const _bind$4 = _M0IP39dowdiness6lambda6syntax10SyntaxKindP29dowdiness4seam11FromRawKind9from__raw(child.cst.kind);
        if (_bind$4 === 25) {
          const v = new _M0TP29dowdiness6lambda10LetDefView(child);
          const _bind$5 = _M0MP29dowdiness6lambda10LetDefView4init(v);
          let init;
          if (_bind$5 === void 0) {
            init = _M0FP29dowdiness6lambda34lambda__fold__node_2econstr_2f9654;
          } else {
            const _Some = _bind$5;
            const _expr_node = _Some;
            init = recurse(_expr_node);
          }
          _M0MPC15array5Array4pushGsE(defs, { _0: _M0MP29dowdiness6lambda10LetDefView4name(v), _1: init });
        } else {
          if (_M0IP39dowdiness6lambda3ast4TermPB2Eq5equal(final_term, _M0DTP39dowdiness6lambda3ast4Term4Unit__)) {
            final_term = recurse(child);
          }
        }
        _tmp = _ + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    return defs.length === 0 ? final_term : new _M0DTP39dowdiness6lambda3ast4Term6Module(defs, final_term);
  } else {
    return _M0FP29dowdiness6lambda17fold__node__inner(node, recurse);
  }
}
__name(_M0FP29dowdiness6lambda18lambda__fold__node, "_M0FP29dowdiness6lambda18lambda__fold__node");
function _M0FP29dowdiness6lambda29syntax__kind__to__token__kind(kind) {
  const _bind = _M0IP39dowdiness6lambda6syntax10SyntaxKindP29dowdiness4seam11FromRawKind9from__raw(kind);
  switch (_bind) {
    case 0: {
      return _M0DTP39dowdiness6lambda5token5Token6Lambda__;
    }
    case 1: {
      return _M0DTP39dowdiness6lambda5token5Token3Dot__;
    }
    case 2: {
      return _M0DTP39dowdiness6lambda5token5Token9LeftParen__;
    }
    case 3: {
      return _M0DTP39dowdiness6lambda5token5Token10RightParen__;
    }
    case 4: {
      return _M0DTP39dowdiness6lambda5token5Token4Plus__;
    }
    case 5: {
      return _M0DTP39dowdiness6lambda5token5Token5Minus__;
    }
    case 6: {
      return _M0DTP39dowdiness6lambda5token5Token2If__;
    }
    case 7: {
      return _M0DTP39dowdiness6lambda5token5Token4Then__;
    }
    case 8: {
      return _M0DTP39dowdiness6lambda5token5Token4Else__;
    }
    case 23: {
      return _M0DTP39dowdiness6lambda5token5Token3Let__;
    }
    case 24: {
      return _M0DTP39dowdiness6lambda5token5Token2Eq__;
    }
    case 26: {
      return _M0DTP39dowdiness6lambda5token5Token7Newline__;
    }
    default: {
      return void 0;
    }
  }
}
__name(_M0FP29dowdiness6lambda29syntax__kind__to__token__kind, "_M0FP29dowdiness6lambda29syntax__kind__to__token__kind");
function _M0FP29dowdiness6lambda24consume__newline__tokens(ctx) {
  let count = 0;
  while (true) {
    if (_M0IP39dowdiness6lambda5token5TokenPB2Eq5equal(_M0MP39dowdiness4loom4core13ParserContext4peekGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx), _M0DTP39dowdiness6lambda5token5Token7Newline__)) {
      _M0MP39dowdiness4loom4core13ParserContext11emit__tokenGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx, 26);
      count = count + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return count;
}
__name(_M0FP29dowdiness6lambda24consume__newline__tokens, "_M0FP29dowdiness6lambda24consume__newline__tokens");
function _M0FP29dowdiness6lambda21peek__after__newlines(ctx) {
  let pos = ctx.position;
  while (true) {
    if (pos < ctx.token_count) {
      const _func = ctx.get_token;
      const token = _func(pos);
      if (token.$tag === 15) {
        pos = pos + 1 | 0;
      } else {
        return token;
      }
      continue;
    } else {
      break;
    }
  }
  return _M0DTP39dowdiness6lambda5token5Token3EOF__;
}
__name(_M0FP29dowdiness6lambda21peek__after__newlines, "_M0FP29dowdiness6lambda21peek__after__newlines");
function _M0FP29dowdiness6lambda25token__starts__expression(token) {
  switch (token.$tag) {
    case 9: {
      return true;
    }
    case 6: {
      return true;
    }
    case 2: {
      return true;
    }
    case 0: {
      return true;
    }
    case 12: {
      return true;
    }
    case 13: {
      return true;
    }
    default: {
      return false;
    }
  }
}
__name(_M0FP29dowdiness6lambda25token__starts__expression, "_M0FP29dowdiness6lambda25token__starts__expression");
function _M0FP29dowdiness6lambda43consume__soft__newlines__before__expression(ctx) {
  if (_M0IP39dowdiness6lambda5token5TokenPB2Eq5equal(_M0MP39dowdiness4loom4core13ParserContext4peekGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx), _M0DTP39dowdiness6lambda5token5Token7Newline__) && _M0FP29dowdiness6lambda25token__starts__expression(_M0FP29dowdiness6lambda21peek__after__newlines(ctx))) {
    _M0FP29dowdiness6lambda24consume__newline__tokens(ctx);
    return;
  } else {
    return;
  }
}
__name(_M0FP29dowdiness6lambda43consume__soft__newlines__before__expression, "_M0FP29dowdiness6lambda43consume__soft__newlines__before__expression");
function _M0FP29dowdiness6lambda27token__is__binary__operator(token) {
  switch (token.$tag) {
    case 4: {
      return true;
    }
    case 5: {
      return true;
    }
    default: {
      return false;
    }
  }
}
__name(_M0FP29dowdiness6lambda27token__is__binary__operator, "_M0FP29dowdiness6lambda27token__is__binary__operator");
function _M0FP29dowdiness6lambda49consume__soft__newlines__before__binary__operator(ctx) {
  if (_M0IP39dowdiness6lambda5token5TokenPB2Eq5equal(_M0MP39dowdiness4loom4core13ParserContext4peekGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx), _M0DTP39dowdiness6lambda5token5Token7Newline__) && _M0FP29dowdiness6lambda27token__is__binary__operator(_M0FP29dowdiness6lambda21peek__after__newlines(ctx))) {
    _M0FP29dowdiness6lambda24consume__newline__tokens(ctx);
    return;
  } else {
    return;
  }
}
__name(_M0FP29dowdiness6lambda49consume__soft__newlines__before__binary__operator, "_M0FP29dowdiness6lambda49consume__soft__newlines__before__binary__operator");
function _M0FP29dowdiness6lambda32token__starts__application__atom(token) {
  switch (token.$tag) {
    case 2: {
      return true;
    }
    case 12: {
      return true;
    }
    case 13: {
      return true;
    }
    case 0: {
      return true;
    }
    default: {
      return false;
    }
  }
}
__name(_M0FP29dowdiness6lambda32token__starts__application__atom, "_M0FP29dowdiness6lambda32token__starts__application__atom");
function _M0FP29dowdiness6lambda50consume__soft__newlines__before__application__atom(ctx) {
  if (_M0IP39dowdiness6lambda5token5TokenPB2Eq5equal(_M0MP39dowdiness4loom4core13ParserContext4peekGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx), _M0DTP39dowdiness6lambda5token5Token7Newline__) && _M0FP29dowdiness6lambda32token__starts__application__atom(_M0FP29dowdiness6lambda21peek__after__newlines(ctx))) {
    _M0FP29dowdiness6lambda24consume__newline__tokens(ctx);
    return;
  } else {
    return;
  }
}
__name(_M0FP29dowdiness6lambda50consume__soft__newlines__before__application__atom, "_M0FP29dowdiness6lambda50consume__soft__newlines__before__application__atom");
function _M0FP29dowdiness6lambda15is__sync__point(t) {
  switch (t.$tag) {
    case 15: {
      return true;
    }
    case 3: {
      return true;
    }
    case 0: {
      return true;
    }
    case 9: {
      return true;
    }
    case 6: {
      return true;
    }
    case 7: {
      return true;
    }
    case 8: {
      return true;
    }
    case 17: {
      return true;
    }
    default: {
      return false;
    }
  }
}
__name(_M0FP29dowdiness6lambda15is__sync__point, "_M0FP29dowdiness6lambda15is__sync__point");
function _M0FP29dowdiness6lambda41consume__soft__newlines__before__expected(ctx, expected) {
  if (_M0IP39dowdiness6lambda5token5TokenPB2Eq5equal(_M0MP39dowdiness4loom4core13ParserContext4peekGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx), _M0DTP39dowdiness6lambda5token5Token7Newline__) && _M0IP39dowdiness6lambda5token5TokenPB2Eq5equal(_M0FP29dowdiness6lambda21peek__after__newlines(ctx), expected)) {
    _M0FP29dowdiness6lambda24consume__newline__tokens(ctx);
    return;
  } else {
    return;
  }
}
__name(_M0FP29dowdiness6lambda41consume__soft__newlines__before__expected, "_M0FP29dowdiness6lambda41consume__soft__newlines__before__expected");
function _M0FP29dowdiness6lambda14lambda__expect(ctx, expected, kind) {
  _M0FP29dowdiness6lambda41consume__soft__newlines__before__expected(ctx, expected);
  const current = _M0MP39dowdiness4loom4core13ParserContext4peekGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx);
  if (_M0IP39dowdiness6lambda5token5TokenPB2Eq5equal(current, expected)) {
    _M0MP39dowdiness4loom4core13ParserContext11emit__tokenGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx, kind);
    return true;
  } else {
    _M0MP39dowdiness4loom4core13ParserContext5errorGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx, `Expected ${_M0FP39dowdiness6lambda5token12print__token(expected)}`);
    _M0MP39dowdiness4loom4core13ParserContext24emit__error__placeholderGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx);
    return false;
  }
}
__name(_M0FP29dowdiness6lambda14lambda__expect, "_M0FP29dowdiness6lambda14lambda__expect");
function _M0FP29dowdiness6lambda35skip__until__paren__close__or__sync(ctx) {
  let depth = 0;
  let skipped = 0;
  let wrapped = false;
  while (true) {
    if (_M0IP016_24default__implPB2Eq10not__equalGRP39dowdiness6lambda5token5TokenE(_M0MP39dowdiness4loom4core13ParserContext4peekGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx), _M0DTP39dowdiness6lambda5token5Token3EOF__)) {
      const token = _M0MP39dowdiness4loom4core13ParserContext4peekGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx);
      if (_M0IP39dowdiness6lambda5token5TokenPB2Eq5equal(token, _M0DTP39dowdiness6lambda5token5Token10RightParen__)) {
        if (depth === 0) {
          break;
        }
        depth = depth - 1 | 0;
      } else {
        if (_M0IP39dowdiness6lambda5token5TokenPB2Eq5equal(token, _M0DTP39dowdiness6lambda5token5Token9LeftParen__)) {
          depth = depth + 1 | 0;
        } else {
          if (depth === 0 && _M0FP29dowdiness6lambda15is__sync__point(token)) {
            break;
          }
        }
      }
      if (!wrapped) {
        _M0MP39dowdiness4loom4core13ParserContext11start__nodeGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx, 21);
        wrapped = true;
      }
      _M0MP39dowdiness4loom4core13ParserContext11bump__errorGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx);
      skipped = skipped + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  if (wrapped) {
    _M0MP39dowdiness4loom4core13ParserContext12finish__nodeGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx);
  }
  return skipped;
}
__name(_M0FP29dowdiness6lambda35skip__until__paren__close__or__sync, "_M0FP29dowdiness6lambda35skip__until__paren__close__or__sync");
function _M0FP29dowdiness6lambda29parse__expression__with__mode(ctx, allow_newline_application) {
  _M0FP29dowdiness6lambda43consume__soft__newlines__before__expression(ctx);
  _M0FP29dowdiness6lambda17parse__binary__op(ctx, allow_newline_application);
}
__name(_M0FP29dowdiness6lambda29parse__expression__with__mode, "_M0FP29dowdiness6lambda29parse__expression__with__mode");
function _M0FP29dowdiness6lambda17parse__binary__op(ctx, allow_newline_application) {
  const mark = _M0MP39dowdiness4loom4core13ParserContext4markGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx);
  _M0FP29dowdiness6lambda18parse__application(ctx, allow_newline_application);
  _M0FP29dowdiness6lambda49consume__soft__newlines__before__binary__operator(ctx);
  _L: {
    const _bind = _M0MP39dowdiness4loom4core13ParserContext4peekGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx);
    switch (_bind.$tag) {
      case 4: {
        break _L;
      }
      case 5: {
        break _L;
      }
      default: {
        return;
      }
    }
  }
  _M0MP39dowdiness4loom4core13ParserContext8wrap__atGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx, mark, 16, () => {
    _L$2:
      while (true) {
        if (ctx.error_count < 50) {
          _M0FP29dowdiness6lambda49consume__soft__newlines__before__binary__operator(ctx);
          const _bind = _M0MP39dowdiness4loom4core13ParserContext4peekGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx);
          switch (_bind.$tag) {
            case 4: {
              _M0MP39dowdiness4loom4core13ParserContext11emit__tokenGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx, 4);
              _M0FP29dowdiness6lambda18parse__application(ctx, allow_newline_application);
              break;
            }
            case 5: {
              _M0MP39dowdiness4loom4core13ParserContext11emit__tokenGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx, 5);
              _M0FP29dowdiness6lambda18parse__application(ctx, allow_newline_application);
              break;
            }
            default: {
              return;
            }
          }
          continue;
        } else {
          return;
        }
      }
  });
}
__name(_M0FP29dowdiness6lambda17parse__binary__op, "_M0FP29dowdiness6lambda17parse__binary__op");
function _M0FP29dowdiness6lambda18parse__application(ctx, allow_newline_application) {
  const mark = _M0MP39dowdiness4loom4core13ParserContext4markGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx);
  if (allow_newline_application) {
    _M0FP29dowdiness6lambda50consume__soft__newlines__before__application__atom(ctx);
  }
  _M0FP29dowdiness6lambda11parse__atom(ctx, allow_newline_application);
  if (allow_newline_application) {
    _M0FP29dowdiness6lambda50consume__soft__newlines__before__application__atom(ctx);
  }
  _L: {
    const _bind = _M0MP39dowdiness4loom4core13ParserContext4peekGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx);
    switch (_bind.$tag) {
      case 2: {
        break _L;
      }
      case 12: {
        break _L;
      }
      case 13: {
        break _L;
      }
      case 0: {
        break _L;
      }
      default: {
        return;
      }
    }
  }
  _M0MP39dowdiness4loom4core13ParserContext8wrap__atGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx, mark, 15, () => {
    _L$2:
      while (true) {
        if (ctx.error_count < 50) {
          if (allow_newline_application) {
            _M0FP29dowdiness6lambda50consume__soft__newlines__before__application__atom(ctx);
          }
          _L$3: {
            const _bind = _M0MP39dowdiness4loom4core13ParserContext4peekGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx);
            switch (_bind.$tag) {
              case 2: {
                break _L$3;
              }
              case 12: {
                break _L$3;
              }
              case 13: {
                break _L$3;
              }
              case 0: {
                break _L$3;
              }
              default: {
                return;
              }
            }
          }
          _M0FP29dowdiness6lambda11parse__atom(ctx, allow_newline_application);
          continue;
        } else {
          return;
        }
      }
  });
}
__name(_M0FP29dowdiness6lambda18parse__application, "_M0FP29dowdiness6lambda18parse__application");
function _M0FP29dowdiness6lambda11parse__atom(ctx, allow_newline_application) {
  if (ctx.error_count >= 50) {
    return void 0;
  }
  const _bind = _M0MP39dowdiness4loom4core13ParserContext4peekGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx);
  switch (_bind.$tag) {
    case 13: {
      _M0MP39dowdiness4loom4core13ParserContext4nodeGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx, 19, () => {
        _M0MP39dowdiness4loom4core13ParserContext11emit__tokenGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx, 10);
      });
      return;
    }
    case 12: {
      _M0MP39dowdiness4loom4core13ParserContext4nodeGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx, 20, () => {
        _M0MP39dowdiness4loom4core13ParserContext11emit__tokenGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx, 9);
      });
      return;
    }
    case 0: {
      _M0MP39dowdiness4loom4core13ParserContext20node__with__recoveryGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx, 14, () => {
        _M0MP39dowdiness4loom4core13ParserContext11emit__tokenGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx, 0);
        const _bind$2 = _M0MP39dowdiness4loom4core13ParserContext4peekGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx);
        if (_bind$2.$tag === 12) {
          _M0MP39dowdiness4loom4core13ParserContext11emit__tokenGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx, 9);
        } else {
          _M0MP39dowdiness4loom4core13ParserContext5errorGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx, "Expected parameter after \u03BB");
          _M0MP39dowdiness4loom4core13ParserContext24emit__error__placeholderGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx);
        }
        if (!_M0FP29dowdiness6lambda14lambda__expect(ctx, _M0DTP39dowdiness6lambda5token5Token3Dot__, 1)) {
          return false;
        }
        _M0FP29dowdiness6lambda29parse__expression__with__mode(ctx, allow_newline_application);
        return true;
      }, _M0FP29dowdiness6lambda15is__sync__point);
      return;
    }
    case 6: {
      _M0MP39dowdiness4loom4core13ParserContext20node__with__recoveryGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx, 17, () => {
        _M0MP39dowdiness4loom4core13ParserContext11emit__tokenGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx, 6);
        _M0FP29dowdiness6lambda29parse__expression__with__mode(ctx, allow_newline_application);
        if (!_M0FP29dowdiness6lambda14lambda__expect(ctx, _M0DTP39dowdiness6lambda5token5Token4Then__, 7)) {
          return false;
        }
        _M0FP29dowdiness6lambda29parse__expression__with__mode(ctx, allow_newline_application);
        if (!_M0FP29dowdiness6lambda14lambda__expect(ctx, _M0DTP39dowdiness6lambda5token5Token4Else__, 8)) {
          return false;
        }
        _M0FP29dowdiness6lambda29parse__expression__with__mode(ctx, allow_newline_application);
        return true;
      }, _M0FP29dowdiness6lambda15is__sync__point);
      return;
    }
    case 2: {
      _M0MP39dowdiness4loom4core13ParserContext4nodeGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx, 18, () => {
        _M0MP39dowdiness4loom4core13ParserContext11emit__tokenGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx, 2);
        _M0FP29dowdiness6lambda29parse__expression__with__mode(ctx, allow_newline_application);
        if (!_M0FP29dowdiness6lambda14lambda__expect(ctx, _M0DTP39dowdiness6lambda5token5Token10RightParen__, 3)) {
          _M0FP29dowdiness6lambda35skip__until__paren__close__or__sync(ctx);
          if (_M0IP39dowdiness6lambda5token5TokenPB2Eq5equal(_M0MP39dowdiness4loom4core13ParserContext4peekGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx), _M0DTP39dowdiness6lambda5token5Token10RightParen__)) {
            _M0MP39dowdiness4loom4core13ParserContext11emit__tokenGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx, 3);
            return;
          } else {
            return;
          }
        } else {
          return;
        }
      });
      return;
    }
    default: {
      _M0MP39dowdiness4loom4core13ParserContext5errorGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx, "Unexpected token");
      if (_M0FP29dowdiness6lambda15is__sync__point(_M0MP39dowdiness4loom4core13ParserContext4peekGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx))) {
        _M0MP39dowdiness4loom4core13ParserContext11start__nodeGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx, 21);
        _M0MP39dowdiness4loom4core13ParserContext24emit__error__placeholderGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx);
        _M0MP39dowdiness4loom4core13ParserContext12finish__nodeGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx);
        return;
      } else {
        _M0MP39dowdiness4loom4core13ParserContext11skip__untilGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx, _M0FP29dowdiness6lambda15is__sync__point);
        return;
      }
    }
  }
}
__name(_M0FP29dowdiness6lambda11parse__atom, "_M0FP29dowdiness6lambda11parse__atom");
function _M0FP29dowdiness6lambda17parse__expression(ctx) {
  _M0FP29dowdiness6lambda29parse__expression__with__mode(ctx, true);
}
__name(_M0FP29dowdiness6lambda17parse__expression, "_M0FP29dowdiness6lambda17parse__expression");
function _M0FP29dowdiness6lambda16parse__let__item(ctx) {
  const mark = _M0MP39dowdiness4loom4core13ParserContext4markGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx);
  _M0MP39dowdiness4loom4core13ParserContext11emit__tokenGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx, 23);
  const _bind = _M0MP39dowdiness4loom4core13ParserContext4peekGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx);
  if (_bind.$tag === 12) {
    _M0MP39dowdiness4loom4core13ParserContext11emit__tokenGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx, 9);
  } else {
    _M0MP39dowdiness4loom4core13ParserContext5errorGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx, "Expected variable name after 'let'");
    _M0MP39dowdiness4loom4core13ParserContext24emit__error__placeholderGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx);
  }
  _M0FP29dowdiness6lambda14lambda__expect(ctx, _M0DTP39dowdiness6lambda5token5Token2Eq__, 24);
  _M0FP29dowdiness6lambda29parse__expression__with__mode(ctx, false);
  _M0MP39dowdiness4loom4core13ParserContext9start__atGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx, mark, 25);
  _M0MP39dowdiness4loom4core13ParserContext12finish__nodeGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx);
}
__name(_M0FP29dowdiness6lambda16parse__let__item, "_M0FP29dowdiness6lambda16parse__let__item");
function _M0FP29dowdiness6lambda19parse__lambda__root(ctx) {
  _M0FP29dowdiness6lambda24consume__newline__tokens(ctx);
  while (true) {
    if (_M0IP39dowdiness6lambda5token5TokenPB2Eq5equal(_M0MP39dowdiness4loom4core13ParserContext4peekGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx), _M0DTP39dowdiness6lambda5token5Token3Let__)) {
      _M0FP29dowdiness6lambda16parse__let__item(ctx);
      const delimiter_count = _M0FP29dowdiness6lambda24consume__newline__tokens(ctx);
      if (delimiter_count === 0 && _M0IP39dowdiness6lambda5token5TokenPB2Eq5equal(_M0MP39dowdiness4loom4core13ParserContext4peekGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx), _M0DTP39dowdiness6lambda5token5Token3Let__)) {
        _M0MP39dowdiness4loom4core13ParserContext5errorGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx, "Expected newline between top-level definitions");
      }
      continue;
    } else {
      break;
    }
  }
  _M0FP29dowdiness6lambda24consume__newline__tokens(ctx);
  const _bind = _M0MP39dowdiness4loom4core13ParserContext4peekGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx);
  if (_bind.$tag === 17) {
  } else {
    _M0FP29dowdiness6lambda17parse__expression(ctx);
  }
  _M0FP29dowdiness6lambda24consume__newline__tokens(ctx);
  const _bind$2 = _M0MP39dowdiness4loom4core13ParserContext4peekGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx);
  if (_bind$2.$tag === 17) {
  } else {
    _M0MP39dowdiness4loom4core13ParserContext5errorGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx, "Unexpected tokens after expression");
    _M0MP39dowdiness4loom4core13ParserContext11start__nodeGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx, 21);
    while (true) {
      if (_M0IP016_24default__implPB2Eq10not__equalGRP39dowdiness6lambda5token5TokenE(_M0MP39dowdiness4loom4core13ParserContext4peekGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx), _M0DTP39dowdiness6lambda5token5Token3EOF__)) {
        _M0MP39dowdiness4loom4core13ParserContext11bump__errorGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx);
        continue;
      } else {
        break;
      }
    }
    _M0MP39dowdiness4loom4core13ParserContext12finish__nodeGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx);
  }
  _M0MP39dowdiness4loom4core13ParserContext13flush__triviaGRP39dowdiness6lambda5token5TokenRP39dowdiness6lambda6syntax10SyntaxKindE(ctx);
}
__name(_M0FP29dowdiness6lambda19parse__lambda__root, "_M0FP29dowdiness6lambda19parse__lambda__root");
function _M0FP39dowdiness6canopy5relay21write__relay__uvarint(buf, value) {
  let v = value;
  while (true) {
    if (v >= 128) {
      _M0MPC16buffer6Buffer11write__byte(buf, (v & 127 | 128) & 255);
      v = v >> 7;
      continue;
    } else {
      break;
    }
  }
  _M0MPC16buffer6Buffer11write__byte(buf, v & 255);
}
__name(_M0FP39dowdiness6canopy5relay21write__relay__uvarint, "_M0FP39dowdiness6canopy5relay21write__relay__uvarint");
function _M0FP39dowdiness6canopy5relay21encode__peer__control(sub_type, peer_id) {
  const buf = _M0FPC16buffer11new_2einner(0);
  _M0MPC16buffer6Buffer11write__byte(buf, 1);
  _M0MPC16buffer6Buffer11write__byte(buf, 5);
  _M0MPC16buffer6Buffer11write__byte(buf, 0);
  _M0MPC16buffer6Buffer11write__byte(buf, sub_type);
  const tmp = _M0FPC16buffer11new_2einner(0);
  _M0IPC16buffer6BufferPB6Logger13write__string(tmp, peer_id);
  const peer_bytes = _M0MPC16buffer6Buffer9to__bytes(tmp);
  _M0FP39dowdiness6canopy5relay21write__relay__uvarint(buf, peer_bytes.length);
  _M0MPC16buffer6Buffer12write__bytes(buf, peer_bytes);
  return _M0MPC16buffer6Buffer9to__bytes(buf);
}
__name(_M0FP39dowdiness6canopy5relay21encode__peer__control, "_M0FP39dowdiness6canopy5relay21encode__peer__control");
function _M0FP39dowdiness6canopy5relay20encode__peer__joined(peer_id) {
  return _M0FP39dowdiness6canopy5relay21encode__peer__control(1, peer_id);
}
__name(_M0FP39dowdiness6canopy5relay20encode__peer__joined, "_M0FP39dowdiness6canopy5relay20encode__peer__joined");
function _M0FP39dowdiness6canopy5relay18encode__peer__left(peer_id) {
  return _M0FP39dowdiness6canopy5relay21encode__peer__control(2, peer_id);
}
__name(_M0FP39dowdiness6canopy5relay18encode__peer__left, "_M0FP39dowdiness6canopy5relay18encode__peer__left");
function _M0MP39dowdiness6canopy5relay9RelayRoom3new() {
  return new _M0TP39dowdiness6canopy5relay9RelayRoom([]);
}
__name(_M0MP39dowdiness6canopy5relay9RelayRoom3new, "_M0MP39dowdiness6canopy5relay9RelayRoom3new");
function _M0MP39dowdiness6canopy5relay9RelayRoom9broadcast(self, exclude, data) {
  const _bind = self.peers;
  const _bind$2 = _bind.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$2) {
      const peer = _bind[_];
      const _p = peer.peer_id;
      if (!(_p === exclude)) {
        const _func = peer.send_fn;
        _func(data);
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      return;
    }
  }
}
__name(_M0MP39dowdiness6canopy5relay9RelayRoom9broadcast, "_M0MP39dowdiness6canopy5relay9RelayRoom9broadcast");
function _M0MP39dowdiness6canopy5relay9RelayRoom11on__connect(self, peer_id, send_fn) {
  const join_msg = _M0FP39dowdiness6canopy5relay20encode__peer__joined(peer_id);
  _M0MP39dowdiness6canopy5relay9RelayRoom9broadcast(self, peer_id, join_msg);
  _M0MPC15array5Array4pushGsE(self.peers, new _M0TP39dowdiness6canopy5relay9RelayPeer(peer_id, send_fn));
}
__name(_M0MP39dowdiness6canopy5relay9RelayRoom11on__connect, "_M0MP39dowdiness6canopy5relay9RelayRoom11on__connect");
function _M0MP39dowdiness6canopy5relay9RelayRoom11on__message(self, sender, data) {
  _M0MP39dowdiness6canopy5relay9RelayRoom9broadcast(self, sender, data);
}
__name(_M0MP39dowdiness6canopy5relay9RelayRoom11on__message, "_M0MP39dowdiness6canopy5relay9RelayRoom11on__message");
function _M0MP39dowdiness6canopy5relay9RelayRoom14on__disconnect(self, peer_id) {
  const _p = self.peers;
  const _p$2 = [];
  const _p$3 = _p.length;
  let _tmp = 0;
  while (true) {
    const _p$4 = _tmp;
    if (_p$4 < _p$3) {
      const _p$5 = _p[_p$4];
      const _p$6 = _p$5.peer_id;
      if (!(_p$6 === peer_id)) {
        _M0MPC15array5Array4pushGsE(_p$2, _p$5);
      }
      _tmp = _p$4 + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  self.peers = _p$2;
  const leave_msg = _M0FP39dowdiness6canopy5relay18encode__peer__left(peer_id);
  _M0MP39dowdiness6canopy5relay9RelayRoom9broadcast(self, peer_id, leave_msg);
}
__name(_M0MP39dowdiness6canopy5relay9RelayRoom14on__disconnect, "_M0MP39dowdiness6canopy5relay9RelayRoom14on__disconnect");
function _M0FP29dowdiness6canopy21get__or__create__room(room_id) {
  const _bind = _M0MPB3Map3getGsRP39dowdiness6canopy5relay9RelayRoomE(_M0FP29dowdiness6canopy12relay__rooms, room_id);
  if (_bind === void 0) {
    const room = _M0MP39dowdiness6canopy5relay9RelayRoom3new();
    _M0MPB3Map3setGsRP39dowdiness6canopy5relay9RelayRoomE(_M0FP29dowdiness6canopy12relay__rooms, room_id, room);
    return room;
  } else {
    const _Some = _bind;
    return _Some;
  }
}
__name(_M0FP29dowdiness6canopy21get__or__create__room, "_M0FP29dowdiness6canopy21get__or__create__room");
function _M0FP29dowdiness6canopy18relay__on__connect(room_id, peer_id, send_fn) {
  _M0MP39dowdiness6canopy5relay9RelayRoom11on__connect(_M0FP29dowdiness6canopy21get__or__create__room(room_id), peer_id, send_fn);
}
__name(_M0FP29dowdiness6canopy18relay__on__connect, "_M0FP29dowdiness6canopy18relay__on__connect");
function _M0FP29dowdiness6canopy18relay__on__message(room_id, peer_id, data) {
  const _bind = _M0MPB3Map3getGsRP39dowdiness6canopy5relay9RelayRoomE(_M0FP29dowdiness6canopy12relay__rooms, room_id);
  if (_bind === void 0) {
    return;
  } else {
    const _Some = _bind;
    const _room = _Some;
    _M0MP39dowdiness6canopy5relay9RelayRoom11on__message(_room, peer_id, data);
    return;
  }
}
__name(_M0FP29dowdiness6canopy18relay__on__message, "_M0FP29dowdiness6canopy18relay__on__message");
function _M0FP29dowdiness6canopy21relay__on__disconnect(room_id, peer_id) {
  const _bind = _M0MPB3Map3getGsRP39dowdiness6canopy5relay9RelayRoomE(_M0FP29dowdiness6canopy12relay__rooms, room_id);
  if (_bind === void 0) {
    return;
  } else {
    const _Some = _bind;
    const _room = _Some;
    _M0MP39dowdiness6canopy5relay9RelayRoom14on__disconnect(_room, peer_id);
    if (_room.peers.length === 0) {
      _M0MPB3Map6removeGsRP39dowdiness6canopy5relay9RelayRoomE(_M0FP29dowdiness6canopy12relay__rooms, room_id);
      return;
    } else {
      return;
    }
  }
}
__name(_M0FP29dowdiness6canopy21relay__on__disconnect, "_M0FP29dowdiness6canopy21relay__on__disconnect");

// src/index.ts
var src_default = {
  async fetch(request, env) {
    const url = new URL(request.url);
    const room = url.searchParams.get("room") ?? "main";
    const id = env.RELAY.idFromName(room);
    return env.RELAY.get(id).fetch(request);
  }
};
var RelayRoom = class {
  roomId;
  constructor(state) {
    this.roomId = state.id.toString();
  }
  async fetch(request) {
    if (request.headers.get("Upgrade") !== "websocket") {
      return new Response("Expected WebSocket", { status: 426 });
    }
    const url = new URL(request.url);
    const peerId = url.searchParams.get("peer_id") ?? crypto.randomUUID();
    const pair = new WebSocketPair();
    const [client, server] = [pair[0], pair[1]];
    server.accept();
    _M0FP29dowdiness6canopy18relay__on__connect(this.roomId, peerId, (data) => {
      if (server.readyState === 1) {
        server.send(data);
      }
    });
    server.addEventListener("message", (e) => {
      const data = e.data instanceof ArrayBuffer ? new Uint8Array(e.data) : new TextEncoder().encode(e.data);
      _M0FP29dowdiness6canopy18relay__on__message(this.roomId, peerId, data);
    });
    server.addEventListener("close", () => {
      _M0FP29dowdiness6canopy21relay__on__disconnect(this.roomId, peerId);
    });
    server.addEventListener("error", () => {
      _M0FP29dowdiness6canopy21relay__on__disconnect(this.roomId, peerId);
    });
    return new Response(null, { status: 101, webSocket: client });
  }
};
__name(RelayRoom, "RelayRoom");

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-SmbUAf/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = src_default;

// node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-SmbUAf/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
__name(__Facade_ScheduledController__, "__Facade_ScheduledController__");
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = (request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    };
    #dispatcher = (type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    };
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  RelayRoom,
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=index.js.map
