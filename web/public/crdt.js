const $64$moonbitlang$47$core$47$builtin$46$Json$Null = { $tag: 0 };
const $64$moonbitlang$47$core$47$builtin$46$Json$True = { $tag: 1 };
const $64$moonbitlang$47$core$47$builtin$46$Json$False = { $tag: 2 };
function $64$moonbitlang$47$core$47$builtin$46$Json$Number(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
$64$moonbitlang$47$core$47$builtin$46$Json$Number.prototype.$tag = 3;
function $64$moonbitlang$47$core$47$builtin$46$Json$String(param0) {
  this._0 = param0;
}
$64$moonbitlang$47$core$47$builtin$46$Json$String.prototype.$tag = 4;
function $64$moonbitlang$47$core$47$builtin$46$Json$Array(param0) {
  this._0 = param0;
}
$64$moonbitlang$47$core$47$builtin$46$Json$Array.prototype.$tag = 5;
function $64$moonbitlang$47$core$47$builtin$46$Json$Object(param0) {
  this._0 = param0;
}
$64$moonbitlang$47$core$47$builtin$46$Json$Object.prototype.$tag = 6;
const $_1L = { hi: -1, lo: -1 };
const $1000000000000000000L = { hi: 232830643, lo: -1486618624 };
const $0L = { hi: 0, lo: 0 };
const $1L = { hi: 0, lo: 1 };
const $10L = { hi: 0, lo: 10 };
const $100L = { hi: 0, lo: 100 };
const $1000L = { hi: 0, lo: 1000 };
const $10000L = { hi: 0, lo: 10000 };
const $100000L = { hi: 0, lo: 100000 };
const $1000000L = { hi: 0, lo: 1000000 };
const $10000000L = { hi: 0, lo: 10000000 };
const $100000000L = { hi: 0, lo: 100000000 };
const $1000000000L = { hi: 0, lo: 1000000000 };
const $10000000000L = { hi: 2, lo: 1410065408 };
const $100000000000L = { hi: 23, lo: 1215752192 };
const $1000000000000L = { hi: 232, lo: -727379968 };
const $10000000000000L = { hi: 2328, lo: 1316134912 };
const $100000000000000L = { hi: 23283, lo: 276447232 };
const $1000000000000000L = { hi: 232830, lo: -1530494976 };
const $22L = { hi: 0, lo: 22 };
const $37L = { hi: 0, lo: 37 };
const $_22L = { hi: -1, lo: -22 };
function $64$dowdiness$47$crdt$47$parser$46$TermKind$Int(param0) {
  this._0 = param0;
}
$64$dowdiness$47$crdt$47$parser$46$TermKind$Int.prototype.$tag = 0;
function $64$dowdiness$47$crdt$47$parser$46$TermKind$Var(param0) {
  this._0 = param0;
}
$64$dowdiness$47$crdt$47$parser$46$TermKind$Var.prototype.$tag = 1;
function $64$dowdiness$47$crdt$47$parser$46$TermKind$Lam(param0) {
  this._0 = param0;
}
$64$dowdiness$47$crdt$47$parser$46$TermKind$Lam.prototype.$tag = 2;
const $64$dowdiness$47$crdt$47$parser$46$TermKind$App = { $tag: 3 };
function $64$dowdiness$47$crdt$47$parser$46$TermKind$Bop(param0) {
  this._0 = param0;
}
$64$dowdiness$47$crdt$47$parser$46$TermKind$Bop.prototype.$tag = 4;
const $64$dowdiness$47$crdt$47$parser$46$TermKind$If = { $tag: 5 };
function $64$dowdiness$47$crdt$47$parser$46$TermKind$Error(param0) {
  this._0 = param0;
}
$64$dowdiness$47$crdt$47$parser$46$TermKind$Error.prototype.$tag = 6;
const $_4503599627370496L = { hi: -1048576, lo: 0 };
const $9218868437227405312L = { hi: 2146435072, lo: 0 };
const $9221120237041090561L = { hi: 2146959360, lo: 1 };
const $2L = { hi: 0, lo: 2 };
class $PanicError extends Error {}
function $panic() {
  throw new $PanicError();
}
function $bound_check(arr, index) {
  if (index < 0 || index >= arr.length) throw new Error("Index out of bounds");
}
const moonbitlang$core$builtin$$random_seed = () => {
  if (globalThis.crypto?.getRandomValues) {
    const array = new Uint32Array(1);
    globalThis.crypto.getRandomValues(array);
    return array[0] | 0; // Convert to signed 32
  } else {
    return Math.floor(Math.random() * 0x100000000) | 0; // Fallback to Math.random
  }
};
function Result$Err$0$(param0) {
  this._0 = param0;
}
Result$Err$0$.prototype.$tag = 0;
function Result$Ok$0$(param0) {
  this._0 = param0;
}
Result$Ok$0$.prototype.$tag = 1;
function Error$dowdiness$47$crdt$47$parser$46$TokenizationError$46$TokenizationError(param0) {
  this._0 = param0;
}
Error$dowdiness$47$crdt$47$parser$46$TokenizationError$46$TokenizationError.prototype.$tag = 10;
function Error$dowdiness$47$crdt$47$parser$46$ParseError$46$ParseError(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
Error$dowdiness$47$crdt$47$parser$46$ParseError$46$ParseError.prototype.$tag = 9;
function Error$moonbitlang$47$core$47$strconv$46$StrConvError$46$StrConvError(param0) {
  this._0 = param0;
}
Error$moonbitlang$47$core$47$strconv$46$StrConvError$46$StrConvError.prototype.$tag = 8;
function Error$moonbitlang$47$core$47$json$46$ParseError$46$InvalidChar(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
Error$moonbitlang$47$core$47$json$46$ParseError$46$InvalidChar.prototype.$tag = 7;
const Error$moonbitlang$47$core$47$json$46$ParseError$46$InvalidEof = { $tag: 6 };
function Error$moonbitlang$47$core$47$json$46$ParseError$46$InvalidNumber(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
Error$moonbitlang$47$core$47$json$46$ParseError$46$InvalidNumber.prototype.$tag = 5;
function Error$moonbitlang$47$core$47$json$46$ParseError$46$InvalidIdentEscape(param0) {
  this._0 = param0;
}
Error$moonbitlang$47$core$47$json$46$ParseError$46$InvalidIdentEscape.prototype.$tag = 4;
const Error$moonbitlang$47$core$47$json$46$ParseError$46$DepthLimitExceeded = { $tag: 3 };
function Error$moonbitlang$47$core$47$json$46$JsonDecodeError$46$JsonDecodeError(param0) {
  this._0 = param0;
}
Error$moonbitlang$47$core$47$json$46$JsonDecodeError$46$JsonDecodeError.prototype.$tag = 2;
const Error$moonbitlang$47$core$47$builtin$46$CreatingViewError$46$IndexOutOfBounds = { $tag: 1 };
const Error$moonbitlang$47$core$47$builtin$46$CreatingViewError$46$InvalidIndex = { $tag: 0 };
const moonbitlang$core$builtin$$int_to_string_js = (x, radix) => {
  return x.toString(radix);
};
function $makebytes(a, b) {
  const arr = new Uint8Array(a);
  if (b !== 0) {
    arr.fill(b);
  }
  return arr;
}
function $make_array_len_and_init(a, b) {
  const arr = new Array(a);
  arr.fill(b);
  return arr;
}
const moonbitlang$core$builtin$$JSArray$push = (arr, val) => { arr.push(val); };
function $compare_int(a, b) {
  return (a >= b) - (a <= b);
}
const moonbitlang$core$builtin$$MyInt64$convert_to_double_u = (a) => (a.hi >>> 0) * 4294967296.0 + (a.lo >>> 0);
const moonbitlang$core$builtin$$MyInt64$reinterpret_as_double = function f(a) {
  let view = f._view;
  if (view === undefined) {
    view = f._view = new DataView(new ArrayBuffer(8));
  }
  view.setUint32(0, a.hi);
  view.setUint32(4, a.lo);
  return view.getFloat64(0);
};
const moonbitlang$core$builtin$$try_init_wasm_helper = function() {
  try {
    return new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 13, 2, 96, 0, 1, 127, 96, 4, 127, 127, 127, 127, 1, 127, 3, 7, 6, 0, 1, 1, 1, 1, 1, 6, 6, 1, 127, 1, 65, 0, 11, 7, 50, 6, 3, 109, 117, 108, 0, 1, 5, 100, 105, 118, 95, 115, 0, 2, 5, 100, 105, 118, 95, 117, 0, 3, 5, 114, 101, 109, 95, 115, 0, 4, 5, 114, 101, 109, 95, 117, 0, 5, 8, 103, 101, 116, 95, 104, 105, 103, 104, 0, 0, 10, 191, 1, 6, 4, 0, 35, 0, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 126, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 127, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 128, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 129, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 130, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11])), {}).exports;
  } catch (e) {
    return undefined;
  }
};
const moonbitlang$core$builtin$$MyInt64$div_bigint = (a, b) => {
  const aVal = (BigInt(a.hi) << 32n) | BigInt(a.lo >>> 0);
  const bVal = (BigInt(b.hi) << 32n) | BigInt(b.lo >>> 0);
  const result = aVal / bVal;
  const lo = Number(result & 0xFFFFFFFFn);
  const hi = Number((result >> 32n) & 0xFFFFFFFFn);
  return { hi: hi | 0, lo: lo | 0 };
};
const moonbitlang$core$builtin$$MyInt64$div_u_bigint = (a, b) => {
  const aVal = (BigInt(a.hi >>> 0) << 32n) | BigInt(a.lo >>> 0);
  const bVal = (BigInt(b.hi >>> 0) << 32n) | BigInt(b.lo >>> 0);
  const result = aVal / bVal;
  const lo = Number(result & 0xFFFFFFFFn);
  const hi = Number((result >> 32n) & 0xFFFFFFFFn);
  return { hi: hi | 0, lo: lo | 0 };
};
const moonbitlang$core$builtin$$MyInt64$compare = (a, b) => {
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
};
const moonbitlang$core$builtin$$MyInt64$compare_u = (a, b) => {
  const ahi = a.hi >>> 0;
  const bhi = b.hi >>> 0;
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
};
const moonbitlang$core$builtin$$MyInt64$convert_to_double = (a) => a.hi * 4294967296.0 + (a.lo >>> 0);
const moonbitlang$core$builtin$$JSArray$copy = (arr) => arr.slice(0);
const moonbitlang$core$builtin$$JSArray$set_length = (arr, len) => { arr.length = len; };
const moonbitlang$core$builtin$$JSArray$pop = (arr) => arr.pop();
function Result$Err$1$(param0) {
  this._0 = param0;
}
Result$Err$1$.prototype.$tag = 0;
function Result$Ok$1$(param0) {
  this._0 = param0;
}
Result$Ok$1$.prototype.$tag = 1;
function Result$Err$2$(param0) {
  this._0 = param0;
}
Result$Err$2$.prototype.$tag = 0;
function Result$Ok$2$(param0) {
  this._0 = param0;
}
Result$Ok$2$.prototype.$tag = 1;
const moonbitlang$core$double$internal$ryu$$ryu_to_string = (number) => number.toString();
function Result$Err$3$(param0) {
  this._0 = param0;
}
Result$Err$3$.prototype.$tag = 0;
function Result$Ok$3$(param0) {
  this._0 = param0;
}
Result$Ok$3$.prototype.$tag = 1;
function Result$Err$4$(param0) {
  this._0 = param0;
}
Result$Err$4$.prototype.$tag = 0;
function Result$Ok$4$(param0) {
  this._0 = param0;
}
Result$Ok$4$.prototype.$tag = 1;
function Result$Err$5$(param0) {
  this._0 = param0;
}
Result$Err$5$.prototype.$tag = 0;
function Result$Ok$5$(param0) {
  this._0 = param0;
}
Result$Ok$5$.prototype.$tag = 1;
function Result$Err$6$(param0) {
  this._0 = param0;
}
Result$Err$6$.prototype.$tag = 0;
function Result$Ok$6$(param0) {
  this._0 = param0;
}
Result$Ok$6$.prototype.$tag = 1;
function Result$Err$7$(param0) {
  this._0 = param0;
}
Result$Err$7$.prototype.$tag = 0;
function Result$Ok$7$(param0) {
  this._0 = param0;
}
Result$Ok$7$.prototype.$tag = 1;
function Result$Err$8$(param0) {
  this._0 = param0;
}
Result$Err$8$.prototype.$tag = 0;
function Result$Ok$8$(param0) {
  this._0 = param0;
}
Result$Ok$8$.prototype.$tag = 1;
function Result$Err$9$(param0) {
  this._0 = param0;
}
Result$Err$9$.prototype.$tag = 0;
function Result$Ok$9$(param0) {
  this._0 = param0;
}
Result$Ok$9$.prototype.$tag = 1;
function Result$Err$10$(param0) {
  this._0 = param0;
}
Result$Err$10$.prototype.$tag = 0;
function Result$Ok$10$(param0) {
  this._0 = param0;
}
Result$Ok$10$.prototype.$tag = 1;
const $9223372036854775807L = { hi: 2147483647, lo: -1 };
const $16L = { hi: 0, lo: 16 };
const $_9223372036854775808L = { hi: -2147483648, lo: 0 };
const $65536L = { hi: 0, lo: 65536 };
const Option$None$11$ = { $tag: 0 };
function Option$Some$11$(param0) {
  this._0 = param0;
}
Option$Some$11$.prototype.$tag = 1;
function Result$Err$12$(param0) {
  this._0 = param0;
}
Result$Err$12$.prototype.$tag = 0;
function Result$Ok$12$(param0) {
  this._0 = param0;
}
Result$Ok$12$.prototype.$tag = 1;
function Result$Err$13$(param0) {
  this._0 = param0;
}
Result$Err$13$.prototype.$tag = 0;
function Result$Ok$13$(param0) {
  this._0 = param0;
}
Result$Ok$13$.prototype.$tag = 1;
function Result$Err$14$(param0) {
  this._0 = param0;
}
Result$Err$14$.prototype.$tag = 0;
function Result$Ok$14$(param0) {
  this._0 = param0;
}
Result$Ok$14$.prototype.$tag = 1;
function Result$Err$15$(param0) {
  this._0 = param0;
}
Result$Err$15$.prototype.$tag = 0;
function Result$Ok$15$(param0) {
  this._0 = param0;
}
Result$Ok$15$.prototype.$tag = 1;
function Result$Err$16$(param0) {
  this._0 = param0;
}
Result$Err$16$.prototype.$tag = 0;
function Result$Ok$16$(param0) {
  this._0 = param0;
}
Result$Ok$16$.prototype.$tag = 1;
function Result$Err$17$(param0) {
  this._0 = param0;
}
Result$Err$17$.prototype.$tag = 0;
function Result$Ok$17$(param0) {
  this._0 = param0;
}
Result$Ok$17$.prototype.$tag = 1;
function Result$Err$18$(param0) {
  this._0 = param0;
}
Result$Err$18$.prototype.$tag = 0;
function Result$Ok$18$(param0) {
  this._0 = param0;
}
Result$Ok$18$.prototype.$tag = 1;
function Result$Err$19$(param0) {
  this._0 = param0;
}
Result$Err$19$.prototype.$tag = 0;
function Result$Ok$19$(param0) {
  this._0 = param0;
}
Result$Ok$19$.prototype.$tag = 1;
const $64$moonbitlang$47$core$47$json$46$JsonPath$Root = { $tag: 0 };
function $64$moonbitlang$47$core$47$json$46$JsonPath$Key(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
$64$moonbitlang$47$core$47$json$46$JsonPath$Key.prototype.$tag = 1;
function $64$moonbitlang$47$core$47$json$46$JsonPath$Index(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
$64$moonbitlang$47$core$47$json$46$JsonPath$Index.prototype.$tag = 2;
const $9007199254740991L = { hi: 2097151, lo: -1 };
const $_9007199254740991L = { hi: -2097152, lo: 1 };
function Result$Err$20$(param0) {
  this._0 = param0;
}
Result$Err$20$.prototype.$tag = 0;
function Result$Ok$20$(param0) {
  this._0 = param0;
}
Result$Ok$20$.prototype.$tag = 1;
function Result$Err$21$(param0) {
  this._0 = param0;
}
Result$Err$21$.prototype.$tag = 0;
function Result$Ok$21$(param0) {
  this._0 = param0;
}
Result$Ok$21$.prototype.$tag = 1;
const $64$moonbitlang$47$core$47$json$46$Token$Null = { $tag: 0 };
const $64$moonbitlang$47$core$47$json$46$Token$True = { $tag: 1 };
const $64$moonbitlang$47$core$47$json$46$Token$False = { $tag: 2 };
function $64$moonbitlang$47$core$47$json$46$Token$Number(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
$64$moonbitlang$47$core$47$json$46$Token$Number.prototype.$tag = 3;
function $64$moonbitlang$47$core$47$json$46$Token$String(param0) {
  this._0 = param0;
}
$64$moonbitlang$47$core$47$json$46$Token$String.prototype.$tag = 4;
const $64$moonbitlang$47$core$47$json$46$Token$LBrace = { $tag: 5 };
const $64$moonbitlang$47$core$47$json$46$Token$RBrace = { $tag: 6 };
const $64$moonbitlang$47$core$47$json$46$Token$LBracket = { $tag: 7 };
const $64$moonbitlang$47$core$47$json$46$Token$RBracket = { $tag: 8 };
const $64$moonbitlang$47$core$47$json$46$Token$Comma = { $tag: 9 };
function $64$moonbitlang$47$core$47$json$46$WriteFrame$Array(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
$64$moonbitlang$47$core$47$json$46$WriteFrame$Array.prototype.$tag = 0;
function $64$moonbitlang$47$core$47$json$46$WriteFrame$Object(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
$64$moonbitlang$47$core$47$json$46$WriteFrame$Object.prototype.$tag = 1;
function $i32_popcnt(a) {
  a = a - ((a >>> 1) & 0x55555555);
  a = (a & 0x33333333) + ((a >>> 2) & 0x33333333);
  a = (a + (a >>> 4)) & 0x0f0f0f0f;
  a = a + (a >>> 8);
  a = a + (a >>> 16);
  return a & 0x3f;
}
function $i32_ctz(a) {
  a >>>= 0;
  if (a === 0) return 32;
  a &= -a;
  return 31 - Math.clz32(a);
}
const $64$moonbitlang$47$core$47$list$46$List$Empty$22$ = { $tag: 0 };
function $64$moonbitlang$47$core$47$list$46$List$More$22$(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
$64$moonbitlang$47$core$47$list$46$List$More$22$.prototype.$tag = 1;
const $64$moonbitlang$47$core$47$list$46$List$Empty$23$ = { $tag: 0 };
function $64$moonbitlang$47$core$47$list$46$List$More$23$(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
$64$moonbitlang$47$core$47$list$46$List$More$23$.prototype.$tag = 1;
const $64$moonbitlang$47$core$47$list$46$List$Empty$24$ = { $tag: 0 };
function $64$moonbitlang$47$core$47$list$46$List$More$24$(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
$64$moonbitlang$47$core$47$list$46$List$More$24$.prototype.$tag = 1;
const $64$moonbitlang$47$core$47$list$46$List$Empty$25$ = { $tag: 0 };
function $64$moonbitlang$47$core$47$list$46$List$More$25$(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
$64$moonbitlang$47$core$47$list$46$List$More$25$.prototype.$tag = 1;
const $64$moonbitlang$47$core$47$list$46$List$Empty$26$ = { $tag: 0 };
function $64$moonbitlang$47$core$47$list$46$List$More$26$(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
$64$moonbitlang$47$core$47$list$46$List$More$26$.prototype.$tag = 1;
const $64$moonbitlang$47$core$47$list$46$List$Empty$27$ = { $tag: 0 };
function $64$moonbitlang$47$core$47$list$46$List$More$27$(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
$64$moonbitlang$47$core$47$list$46$List$More$27$.prototype.$tag = 1;
const $64$moonbitlang$47$core$47$list$46$List$Empty$28$ = { $tag: 0 };
function $64$moonbitlang$47$core$47$list$46$List$More$28$(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
$64$moonbitlang$47$core$47$list$46$List$More$28$.prototype.$tag = 1;
const Option$None$29$ = { $tag: 0 };
function Option$Some$29$(param0) {
  this._0 = param0;
}
Option$Some$29$.prototype.$tag = 1;
function $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$30$(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
$64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$30$.prototype.$tag = 0;
function $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$30$(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
$64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$30$.prototype.$tag = 1;
function $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Branch$30$(param0) {
  this._0 = param0;
}
$64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Branch$30$.prototype.$tag = 2;
function $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$31$(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
$64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$31$.prototype.$tag = 0;
function $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$31$(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
$64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$31$.prototype.$tag = 1;
function $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Branch$31$(param0) {
  this._0 = param0;
}
$64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Branch$31$.prototype.$tag = 2;
function $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$32$(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
$64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$32$.prototype.$tag = 0;
function $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$32$(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
$64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$32$.prototype.$tag = 1;
function $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Branch$32$(param0) {
  this._0 = param0;
}
$64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Branch$32$.prototype.$tag = 2;
function $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$33$(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
$64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$33$.prototype.$tag = 0;
function $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$33$(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
$64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$33$.prototype.$tag = 1;
function $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Branch$33$(param0) {
  this._0 = param0;
}
$64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Branch$33$.prototype.$tag = 2;
function $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$34$(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
$64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$34$.prototype.$tag = 0;
function $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$34$(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
$64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$34$.prototype.$tag = 1;
function $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Branch$34$(param0) {
  this._0 = param0;
}
$64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Branch$34$.prototype.$tag = 2;
function $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$35$(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
$64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$35$.prototype.$tag = 0;
function $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$35$(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
$64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$35$.prototype.$tag = 1;
function $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Branch$35$(param0) {
  this._0 = param0;
}
$64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Branch$35$.prototype.$tag = 2;
function $64$moonbitlang$47$core$47$immut$47$hashset$46$Node$Flat$22$(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
$64$moonbitlang$47$core$47$immut$47$hashset$46$Node$Flat$22$.prototype.$tag = 0;
function $64$moonbitlang$47$core$47$immut$47$hashset$46$Node$Leaf$22$(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
$64$moonbitlang$47$core$47$immut$47$hashset$46$Node$Leaf$22$.prototype.$tag = 1;
function $64$moonbitlang$47$core$47$immut$47$hashset$46$Node$Branch$22$(param0) {
  this._0 = param0;
}
$64$moonbitlang$47$core$47$immut$47$hashset$46$Node$Branch$22$.prototype.$tag = 2;
function $64$moonbitlang$47$core$47$immut$47$hashset$46$HashSet$58$58$iter$46$CurrNode$Tree$22$(param0) {
  this._0 = param0;
}
$64$moonbitlang$47$core$47$immut$47$hashset$46$HashSet$58$58$iter$46$CurrNode$Tree$22$.prototype.$tag = 0;
function $64$moonbitlang$47$core$47$immut$47$hashset$46$HashSet$58$58$iter$46$CurrNode$Bucket$22$(param0) {
  this._0 = param0;
}
$64$moonbitlang$47$core$47$immut$47$hashset$46$HashSet$58$58$iter$46$CurrNode$Bucket$22$.prototype.$tag = 1;
function Result$Err$36$(param0) {
  this._0 = param0;
}
Result$Err$36$.prototype.$tag = 0;
function Result$Ok$36$(param0) {
  this._0 = param0;
}
Result$Ok$36$.prototype.$tag = 1;
function Result$Err$37$(param0) {
  this._0 = param0;
}
Result$Err$37$.prototype.$tag = 0;
function Result$Ok$37$(param0) {
  this._0 = param0;
}
Result$Ok$37$.prototype.$tag = 1;
function $64$dowdiness$47$crdt$47$oplog$46$OpContent$Insert(param0) {
  this._0 = param0;
}
$64$dowdiness$47$crdt$47$oplog$46$OpContent$Insert.prototype.$tag = 0;
const $64$dowdiness$47$crdt$47$oplog$46$OpContent$Delete = { $tag: 1 };
function Result$Err$38$(param0) {
  this._0 = param0;
}
Result$Err$38$.prototype.$tag = 0;
function Result$Ok$38$(param0) {
  this._0 = param0;
}
Result$Ok$38$.prototype.$tag = 1;
const $64$dowdiness$47$crdt$47$parser$46$Token$Lambda = { $tag: 0 };
const $64$dowdiness$47$crdt$47$parser$46$Token$Dot = { $tag: 1 };
const $64$dowdiness$47$crdt$47$parser$46$Token$LeftParen = { $tag: 2 };
const $64$dowdiness$47$crdt$47$parser$46$Token$RightParen = { $tag: 3 };
const $64$dowdiness$47$crdt$47$parser$46$Token$Plus = { $tag: 4 };
const $64$dowdiness$47$crdt$47$parser$46$Token$Minus = { $tag: 5 };
const $64$dowdiness$47$crdt$47$parser$46$Token$If = { $tag: 6 };
const $64$dowdiness$47$crdt$47$parser$46$Token$Then = { $tag: 7 };
const $64$dowdiness$47$crdt$47$parser$46$Token$Else = { $tag: 8 };
function $64$dowdiness$47$crdt$47$parser$46$Token$Identifier(param0) {
  this._0 = param0;
}
$64$dowdiness$47$crdt$47$parser$46$Token$Identifier.prototype.$tag = 9;
function $64$dowdiness$47$crdt$47$parser$46$Token$Integer(param0) {
  this._0 = param0;
}
$64$dowdiness$47$crdt$47$parser$46$Token$Integer.prototype.$tag = 10;
const $64$dowdiness$47$crdt$47$parser$46$Token$EOF = { $tag: 11 };
function Result$Err$39$(param0) {
  this._0 = param0;
}
Result$Err$39$.prototype.$tag = 0;
function Result$Ok$39$(param0) {
  this._0 = param0;
}
Result$Ok$39$.prototype.$tag = 1;
function Result$Err$40$(param0) {
  this._0 = param0;
}
Result$Err$40$.prototype.$tag = 0;
function Result$Ok$40$(param0) {
  this._0 = param0;
}
Result$Ok$40$.prototype.$tag = 1;
function Result$Err$41$(param0) {
  this._0 = param0;
}
Result$Err$41$.prototype.$tag = 0;
function Result$Ok$41$(param0) {
  this._0 = param0;
}
Result$Ok$41$.prototype.$tag = 1;
function Result$Err$42$(param0) {
  this._0 = param0;
}
Result$Err$42$.prototype.$tag = 0;
function Result$Ok$42$(param0) {
  this._0 = param0;
}
Result$Ok$42$.prototype.$tag = 1;
function Result$Err$43$(param0) {
  this._0 = param0;
}
Result$Err$43$.prototype.$tag = 0;
function Result$Ok$43$(param0) {
  this._0 = param0;
}
Result$Ok$43$.prototype.$tag = 1;
function Result$Err$44$(param0) {
  this._0 = param0;
}
Result$Err$44$.prototype.$tag = 0;
function Result$Ok$44$(param0) {
  this._0 = param0;
}
Result$Ok$44$.prototype.$tag = 1;
const $$$64$moonbitlang$47$core$47$builtin$46$StringBuilder$36$as$36$64$moonbitlang$47$core$47$builtin$46$Logger = { method_0: moonbitlang$core$builtin$$Logger$write_string$0$, method_1: moonbitlang$core$builtin$$Logger$write_substring$1$, method_2: moonbitlang$core$builtin$$Logger$write_view$0$, method_3: moonbitlang$core$builtin$$Logger$write_char$0$ };
function Error$$to_string(_e) {
  switch (_e.$tag) {
    case 0: {
      return moonbitlang$core$builtin$$Show$to_string$2$(_e);
    }
    case 1: {
      return moonbitlang$core$builtin$$Show$to_string$2$(_e);
    }
    case 9: {
      return "dowdiness/crdt/parser.ParseError.ParseError";
    }
    case 3: {
      return moonbitlang$core$builtin$$Show$to_string$3$(_e);
    }
    case 5: {
      return moonbitlang$core$builtin$$Show$to_string$3$(_e);
    }
    case 6: {
      return moonbitlang$core$builtin$$Show$to_string$3$(_e);
    }
    case 10: {
      return "dowdiness/crdt/parser.TokenizationError.TokenizationError";
    }
    case 4: {
      return moonbitlang$core$builtin$$Show$to_string$3$(_e);
    }
    case 2: {
      return moonbitlang$core$builtin$$Show$to_string$4$(_e);
    }
    case 7: {
      return moonbitlang$core$builtin$$Show$to_string$3$(_e);
    }
    default: {
      return moonbitlang$core$builtin$$Show$to_string$5$(_e);
    }
  }
}
const moonbitlang$core$builtin$$null = $64$moonbitlang$47$core$47$builtin$46$Json$Null;
const moonbitlang$core$builtin$$wasm_helper_cache = { tried: false, exports: undefined };
const moonbitlang$core$builtin$$boyer_moore_horspool_find$46$constr$47$458 = 0;
const moonbitlang$core$builtin$$brute_force_find$46$constr$47$472 = 0;
const moonbitlang$core$uint64$$max_value = $_1L;
const moonbitlang$core$strconv$$base_err_str = "invalid base";
const moonbitlang$core$strconv$$range_err_str = "value out of range";
const moonbitlang$core$strconv$$syntax_err_str = "invalid syntax";
const moonbitlang$core$strconv$$parse_int64$46$inner$46$42$bind$124$600 = "";
const moonbitlang$core$strconv$$min_19digit_int = $1000000000000000000L;
const moonbitlang$core$strconv$$parse_scientific$46$exp_num$124$306 = $0L;
const moonbitlang$core$strconv$$parse_number$46$exp_number$124$287 = $0L;
const moonbitlang$core$strconv$$double_info = { mantissa_bits: 52, exponent_bits: 11, bias: -1023 };
const moonbitlang$core$strconv$$powtab = [1, 3, 6, 9, 13, 16, 19, 23, 26, 29, 33, 36, 39, 43, 46, 49, 53, 56, 59];
const moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1593 = { _0: 0, _1: "" };
const moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1594 = { _0: 1, _1: "5" };
const moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1595 = { _0: 1, _1: "25" };
const moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1596 = { _0: 1, _1: "125" };
const moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1597 = { _0: 2, _1: "625" };
const moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1598 = { _0: 2, _1: "3125" };
const moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1599 = { _0: 2, _1: "15625" };
const moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1600 = { _0: 3, _1: "78125" };
const moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1601 = { _0: 3, _1: "390625" };
const moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1602 = { _0: 3, _1: "1953125" };
const moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1603 = { _0: 4, _1: "9765625" };
const moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1604 = { _0: 4, _1: "48828125" };
const moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1605 = { _0: 4, _1: "244140625" };
const moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1606 = { _0: 4, _1: "1220703125" };
const moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1607 = { _0: 5, _1: "6103515625" };
const moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1608 = { _0: 5, _1: "30517578125" };
const moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1609 = { _0: 5, _1: "152587890625" };
const moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1610 = { _0: 6, _1: "762939453125" };
const moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1611 = { _0: 6, _1: "3814697265625" };
const moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1612 = { _0: 6, _1: "19073486328125" };
const moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1613 = { _0: 7, _1: "95367431640625" };
const moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1614 = { _0: 7, _1: "476837158203125" };
const moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1615 = { _0: 7, _1: "2384185791015625" };
const moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1616 = { _0: 7, _1: "11920928955078125" };
const moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1617 = { _0: 8, _1: "59604644775390625" };
const moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1618 = { _0: 8, _1: "298023223876953125" };
const moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1619 = { _0: 8, _1: "1490116119384765625" };
const moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1620 = { _0: 9, _1: "7450580596923828125" };
const moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1621 = { _0: 9, _1: "37252902984619140625" };
const moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1622 = { _0: 9, _1: "186264514923095703125" };
const moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1623 = { _0: 10, _1: "931322574615478515625" };
const moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1624 = { _0: 10, _1: "4656612873077392578125" };
const moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1625 = { _0: 10, _1: "23283064365386962890625" };
const moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1626 = { _0: 10, _1: "116415321826934814453125" };
const moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1627 = { _0: 11, _1: "582076609134674072265625" };
const moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1628 = { _0: 11, _1: "2910383045673370361328125" };
const moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1629 = { _0: 11, _1: "14551915228366851806640625" };
const moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1630 = { _0: 12, _1: "72759576141834259033203125" };
const moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1631 = { _0: 12, _1: "363797880709171295166015625" };
const moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1632 = { _0: 12, _1: "1818989403545856475830078125" };
const moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1633 = { _0: 13, _1: "9094947017729282379150390625" };
const moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1634 = { _0: 13, _1: "45474735088646411895751953125" };
const moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1635 = { _0: 13, _1: "227373675443232059478759765625" };
const moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1636 = { _0: 13, _1: "1136868377216160297393798828125" };
const moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1637 = { _0: 14, _1: "5684341886080801486968994140625" };
const moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1638 = { _0: 14, _1: "28421709430404007434844970703125" };
const moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1639 = { _0: 14, _1: "142108547152020037174224853515625" };
const moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1640 = { _0: 15, _1: "710542735760100185871124267578125" };
const moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1641 = { _0: 15, _1: "3552713678800500929355621337890625" };
const moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1642 = { _0: 15, _1: "17763568394002504646778106689453125" };
const moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1643 = { _0: 16, _1: "88817841970012523233890533447265625" };
const moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1644 = { _0: 16, _1: "444089209850062616169452667236328125" };
const moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1645 = { _0: 16, _1: "2220446049250313080847263336181640625" };
const moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1646 = { _0: 16, _1: "11102230246251565404236316680908203125" };
const moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1647 = { _0: 17, _1: "55511151231257827021181583404541015625" };
const moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1648 = { _0: 17, _1: "277555756156289135105907917022705078125" };
const moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1649 = { _0: 17, _1: "1387778780781445675529539585113525390625" };
const moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1650 = { _0: 18, _1: "6938893903907228377647697925567626953125" };
const moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1651 = { _0: 18, _1: "34694469519536141888238489627838134765625" };
const moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1652 = { _0: 18, _1: "173472347597680709441192448139190673828125" };
const moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1653 = { _0: 19, _1: "867361737988403547205962240695953369140625" };
const moonbitlang$core$strconv$$left_shift_cheats = [moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1593, moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1594, moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1595, moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1596, moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1597, moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1598, moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1599, moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1600, moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1601, moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1602, moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1603, moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1604, moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1605, moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1606, moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1607, moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1608, moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1609, moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1610, moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1611, moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1612, moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1613, moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1614, moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1615, moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1616, moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1617, moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1618, moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1619, moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1620, moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1621, moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1622, moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1623, moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1624, moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1625, moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1626, moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1627, moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1628, moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1629, moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1630, moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1631, moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1632, moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1633, moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1634, moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1635, moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1636, moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1637, moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1638, moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1639, moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1640, moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1641, moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1642, moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1643, moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1644, moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1645, moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1646, moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1647, moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1648, moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1649, moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1650, moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1651, moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1652, moonbitlang$core$strconv$$left_shift_cheats$46$tuple$47$1653];
const moonbitlang$core$strconv$$int_pow10 = [$1L, $10L, $100L, $1000L, $10000L, $100000L, $1000000L, $10000000L, $100000000L, $1000000000L, $10000000000L, $100000000000L, $1000000000000L, $10000000000000L, $100000000000000L, $1000000000000000L];
const moonbitlang$core$strconv$$max_exponent_fast_path = $22L;
const moonbitlang$core$strconv$$table = [1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000, 10000000000, 100000000000, 1e+12, 1e+13, 1e+14, 1e+15, 1e+16, 1e+17, 1e+18, 1e+19, 1e+20, 1e+21, 1e+22, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const moonbitlang$core$strconv$$max_exponent_disguised_fast_path = $37L;
const moonbitlang$core$strconv$$min_exponent_fast_path = $_22L;
const moonbitlang$core$strconv$$checked_mul$46$constr$47$2138 = $0L;
const moonbitlang$core$json$$lex_number_end$46$42$bind$124$1058 = ".";
const moonbitlang$core$json$$lex_number_end$46$42$bind$124$1059 = "e";
const moonbitlang$core$json$$lex_number_end$46$42$bind$124$1060 = "E";
const moonbitlang$core$json$$output$46$42$bind$124$1378 = "~/";
const dowdiness$crdt$fugue$$find_parent_and_side$46$tuple$47$3901 = { _0: -1, _1: 1 };
const dowdiness$crdt$branch$$apply_operation_to_tree$46$tuple$47$4074 = { _0: 0, _1: "unknown" };
const dowdiness$crdt$parser$$parse_tree$46$constr$47$4334 = new $64$dowdiness$47$crdt$47$parser$46$TermKind$Bop(0);
const dowdiness$crdt$parser$$parse_tree$46$constr$47$4335 = new $64$dowdiness$47$crdt$47$parser$46$TermKind$Bop(1);
const dowdiness$crdt$editor$$insert$46$tuple$47$4547 = { _0: 0, _1: "unknown" };
const dowdiness$crdt$$editor = { val: undefined };
const moonbitlang$core$builtin$$seed = moonbitlang$core$builtin$$random_seed();
const moonbitlang$core$double$$neg_infinity = moonbitlang$core$int64$$Int64$reinterpret_as_double($_4503599627370496L);
const moonbitlang$core$double$$infinity = moonbitlang$core$int64$$Int64$reinterpret_as_double($9218868437227405312L);
const moonbitlang$core$double$$not_a_number = moonbitlang$core$int64$$Int64$reinterpret_as_double($9221120237041090561L);
const moonbitlang$core$strconv$$max_mantissa_fast_path = moonbitlang$core$builtin$$Shl$shl$6$($2L, 52);
function moonbitlang$core$abort$$abort$7$(msg) {
  return $panic();
}
function moonbitlang$core$abort$$abort$8$(msg) {
  return $panic();
}
function moonbitlang$core$abort$$abort$9$(msg) {
  return $panic();
}
function moonbitlang$core$abort$$abort$10$(msg) {
  return $panic();
}
function moonbitlang$core$abort$$abort$11$(msg) {
  $panic();
}
function moonbitlang$core$abort$$abort$12$(msg) {
  return $panic();
}
function moonbitlang$core$abort$$abort$13$(msg) {
  return $panic();
}
function moonbitlang$core$abort$$abort$14$(msg) {
  return $panic();
}
function moonbitlang$core$abort$$abort$15$(msg) {
  return $panic();
}
function moonbitlang$core$abort$$abort$16$(msg) {
  return $panic();
}
function moonbitlang$core$abort$$abort$17$(msg) {
  return $panic();
}
function moonbitlang$core$builtin$$Logger$write_object$18$(self, obj) {
  moonbitlang$core$builtin$$Show$output$18$(obj, self);
}
function moonbitlang$core$builtin$$Logger$write_object$19$(self, obj) {
  moonbitlang$core$builtin$$Show$output$19$(obj, self);
}
function moonbitlang$core$builtin$$Logger$write_object$16$(self, obj) {
  moonbitlang$core$builtin$$Show$output$16$(obj, self);
}
function moonbitlang$core$builtin$$Show$output$20$(_x_5001, _x_5002) {
  if (_x_5001.$tag === 1) {
    _x_5002.method_table.method_0(_x_5002.self, "IndexOutOfBounds");
    return;
  } else {
    _x_5002.method_table.method_0(_x_5002.self, "InvalidIndex");
    return;
  }
}
function moonbitlang$core$builtin$$Hasher$consume4(self, input) {
  const _p = (self.acc >>> 0) + ((Math.imul(input, -1028477379) | 0) >>> 0) | 0;
  const _p$2 = 17;
  self.acc = Math.imul(_p << _p$2 | (_p >>> (32 - _p$2 | 0) | 0), 668265263) | 0;
}
function moonbitlang$core$builtin$$Hasher$combine_uint(self, value) {
  self.acc = (self.acc >>> 0) + (4 >>> 0) | 0;
  moonbitlang$core$builtin$$Hasher$consume4(self, value);
}
function moonbitlang$core$builtin$$abort$7$(string, loc) {
  return moonbitlang$core$abort$$abort$7$(`${string}\n  at ${moonbitlang$core$builtin$$Show$to_string$21$(loc)}\n`);
}
function moonbitlang$core$builtin$$abort$8$(string, loc) {
  return moonbitlang$core$abort$$abort$8$(`${string}\n  at ${moonbitlang$core$builtin$$Show$to_string$21$(loc)}\n`);
}
function moonbitlang$core$builtin$$abort$9$(string, loc) {
  return moonbitlang$core$abort$$abort$9$(`${string}\n  at ${moonbitlang$core$builtin$$Show$to_string$21$(loc)}\n`);
}
function moonbitlang$core$builtin$$abort$10$(string, loc) {
  return moonbitlang$core$abort$$abort$10$(`${string}\n  at ${moonbitlang$core$builtin$$Show$to_string$21$(loc)}\n`);
}
function moonbitlang$core$builtin$$abort$11$(string, loc) {
  moonbitlang$core$abort$$abort$11$(`${string}\n  at ${moonbitlang$core$builtin$$Show$to_string$21$(loc)}\n`);
}
function moonbitlang$core$builtin$$abort$12$(string, loc) {
  return moonbitlang$core$abort$$abort$12$(`${string}\n  at ${moonbitlang$core$builtin$$Show$to_string$21$(loc)}\n`);
}
function moonbitlang$core$builtin$$abort$13$(string, loc) {
  return moonbitlang$core$abort$$abort$13$(`${string}\n  at ${moonbitlang$core$builtin$$Show$to_string$21$(loc)}\n`);
}
function moonbitlang$core$builtin$$abort$14$(string, loc) {
  return moonbitlang$core$abort$$abort$14$(`${string}\n  at ${moonbitlang$core$builtin$$Show$to_string$21$(loc)}\n`);
}
function moonbitlang$core$builtin$$abort$15$(string, loc) {
  return moonbitlang$core$abort$$abort$15$(`${string}\n  at ${moonbitlang$core$builtin$$Show$to_string$21$(loc)}\n`);
}
function moonbitlang$core$builtin$$abort$16$(string, loc) {
  return moonbitlang$core$abort$$abort$16$(`${string}\n  at ${moonbitlang$core$builtin$$Show$to_string$21$(loc)}\n`);
}
function moonbitlang$core$builtin$$abort$17$(string, loc) {
  return moonbitlang$core$abort$$abort$17$(`${string}\n  at ${moonbitlang$core$builtin$$Show$to_string$21$(loc)}\n`);
}
function moonbitlang$core$array$$FixedArray$unsafe_blit$22$(dst, dst_offset, src, src_offset, len) {
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
function moonbitlang$core$array$$FixedArray$unsafe_blit$23$(dst, dst_offset, src, src_offset, len) {
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
function moonbitlang$core$array$$FixedArray$unsafe_blit$24$(dst, dst_offset, src, src_offset, len) {
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
function moonbitlang$core$array$$FixedArray$unsafe_blit$25$(dst, dst_offset, src, src_offset, len) {
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
function moonbitlang$core$array$$FixedArray$unsafe_blit$26$(dst, dst_offset, src, src_offset, len) {
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
function moonbitlang$core$array$$FixedArray$unsafe_blit$27$(dst, dst_offset, src, src_offset, len) {
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
function moonbitlang$core$array$$FixedArray$unsafe_blit$28$(dst, dst_offset, src, src_offset, len) {
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
function moonbitlang$core$builtin$$StringBuilder$new$46$inner(size_hint) {
  return { val: "" };
}
function moonbitlang$core$builtin$$Logger$write_char$0$(self, ch) {
  const _bind = self;
  _bind.val = `${_bind.val}${String.fromCodePoint(ch)}`;
}
function moonbitlang$core$builtin$$code_point_of_surrogate_pair(leading, trailing) {
  return (((Math.imul(leading - 55296 | 0, 1024) | 0) + trailing | 0) - 56320 | 0) + 65536 | 0;
}
function moonbitlang$core$string$$String$unsafe_char_at(self, index) {
  const c1 = self.charCodeAt(index);
  if (55296 <= c1 && c1 <= 56319) {
    const _tmp = index + 1 | 0;
    const c2 = self.charCodeAt(_tmp);
    return moonbitlang$core$builtin$$code_point_of_surrogate_pair(c1, c2);
  } else {
    return c1;
  }
}
function moonbitlang$core$array$$Array$at$8$(self, index) {
  const len = self.length;
  if (index >= 0 && index < len) {
    $bound_check(self, index);
    return self[index];
  } else {
    return $panic();
  }
}
function moonbitlang$core$array$$Array$at$7$(self, index) {
  const len = self.length;
  if (index >= 0 && index < len) {
    $bound_check(self, index);
    return self[index];
  } else {
    return $panic();
  }
}
function moonbitlang$core$array$$Array$at$14$(self, index) {
  const len = self.length;
  if (index >= 0 && index < len) {
    $bound_check(self, index);
    return self[index];
  } else {
    return $panic();
  }
}
function moonbitlang$core$array$$Array$at$15$(self, index) {
  const len = self.length;
  if (index >= 0 && index < len) {
    $bound_check(self, index);
    return self[index];
  } else {
    return $panic();
  }
}
function moonbitlang$core$array$$Array$at$29$(self, index) {
  const len = self.length;
  if (index >= 0 && index < len) {
    $bound_check(self, index);
    return self[index];
  } else {
    return $panic();
  }
}
function moonbitlang$core$array$$Array$at$16$(self, index) {
  const len = self.length;
  if (index >= 0 && index < len) {
    $bound_check(self, index);
    return self[index];
  } else {
    return $panic();
  }
}
function moonbitlang$core$array$$Array$at$30$(self, index) {
  const len = self.length;
  if (index >= 0 && index < len) {
    $bound_check(self, index);
    return self[index];
  } else {
    return $panic();
  }
}
function moonbitlang$core$builtin$$SourceLocRepr$parse(repr) {
  const _bind = { str: repr, start: 0, end: repr.length };
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
    let join_dispatch_19;
    _L$2: {
      if (_cursor < _end) {
        const _p = _cursor;
        const next_char = _data.charCodeAt(_p);
        _cursor = _cursor + 1 | 0;
        if (next_char < 65) {
          if (next_char < 64) {
            break _L;
          } else {
            while (true) {
              tag_0 = _cursor;
              if (_cursor < _end) {
                _L$3: {
                  const _p$2 = _cursor;
                  const next_char$2 = _data.charCodeAt(_p$2);
                  _cursor = _cursor + 1 | 0;
                  if (next_char$2 < 55296) {
                    if (next_char$2 < 58) {
                      break _L$3;
                    } else {
                      if (next_char$2 > 58) {
                        break _L$3;
                      } else {
                        if (_cursor < _end) {
                          _L$4: {
                            const _p$3 = _cursor;
                            const next_char$3 = _data.charCodeAt(_p$3);
                            _cursor = _cursor + 1 | 0;
                            if (next_char$3 < 56319) {
                              if (next_char$3 < 55296) {
                                break _L$4;
                              } else {
                                join_dispatch_19 = 7;
                                break _L$2;
                              }
                            } else {
                              if (next_char$3 > 56319) {
                                if (next_char$3 < 65536) {
                                  break _L$4;
                                } else {
                                  break _L;
                                }
                              } else {
                                join_dispatch_19 = 8;
                                break _L$2;
                              }
                            }
                          }
                          join_dispatch_19 = 0;
                          break _L$2;
                        } else {
                          break _L;
                        }
                      }
                    }
                  } else {
                    if (next_char$2 > 56318) {
                      if (next_char$2 < 57344) {
                        if (_cursor < _end) {
                          const _p$3 = _cursor;
                          const next_char$3 = _data.charCodeAt(_p$3);
                          _cursor = _cursor + 1 | 0;
                          if (next_char$3 < 56320) {
                            break _L;
                          } else {
                            if (next_char$3 > 57343) {
                              break _L;
                            } else {
                              continue;
                            }
                          }
                        } else {
                          break _L;
                        }
                      } else {
                        if (next_char$2 > 65535) {
                          break _L;
                        } else {
                          break _L$3;
                        }
                      }
                    } else {
                      if (_cursor < _end) {
                        const _p$3 = _cursor;
                        const next_char$3 = _data.charCodeAt(_p$3);
                        _cursor = _cursor + 1 | 0;
                        if (next_char$3 < 56320) {
                          break _L;
                        } else {
                          if (next_char$3 > 65535) {
                            break _L;
                          } else {
                            continue;
                          }
                        }
                      } else {
                        break _L;
                      }
                    }
                  }
                }
                continue;
              } else {
                break _L;
              }
            }
          }
        } else {
          break _L;
        }
      } else {
        break _L;
      }
    }
    let _tmp = join_dispatch_19;
    _L$3: while (true) {
      const dispatch_19 = _tmp;
      _L$4: {
        _L$5: {
          switch (dispatch_19) {
            case 3: {
              tag_1_2 = tag_1_1;
              tag_1_1 = tag_1;
              tag_1 = _cursor;
              if (_cursor < _end) {
                _L$6: {
                  const _p = _cursor;
                  const next_char = _data.charCodeAt(_p);
                  _cursor = _cursor + 1 | 0;
                  if (next_char < 55296) {
                    if (next_char < 58) {
                      if (next_char < 48) {
                        break _L$6;
                      } else {
                        tag_1 = _cursor;
                        tag_2_1 = tag_2;
                        tag_2 = _cursor;
                        tag_3 = _cursor;
                        if (_cursor < _end) {
                          _L$7: {
                            const _p$2 = _cursor;
                            const next_char$2 = _data.charCodeAt(_p$2);
                            _cursor = _cursor + 1 | 0;
                            if (next_char$2 < 59) {
                              if (next_char$2 < 46) {
                                if (next_char$2 < 45) {
                                  break _L$7;
                                } else {
                                  break _L$4;
                                }
                              } else {
                                if (next_char$2 > 47) {
                                  if (next_char$2 < 58) {
                                    _tmp = 6;
                                    continue _L$3;
                                  } else {
                                    _tmp = 3;
                                    continue _L$3;
                                  }
                                } else {
                                  break _L$7;
                                }
                              }
                            } else {
                              if (next_char$2 > 55295) {
                                if (next_char$2 < 57344) {
                                  if (next_char$2 < 56319) {
                                    _tmp = 7;
                                    continue _L$3;
                                  } else {
                                    _tmp = 8;
                                    continue _L$3;
                                  }
                                } else {
                                  if (next_char$2 > 65535) {
                                    break _L;
                                  } else {
                                    break _L$7;
                                  }
                                }
                              } else {
                                break _L$7;
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
                      if (next_char > 58) {
                        break _L$6;
                      } else {
                        _tmp = 1;
                        continue _L$3;
                      }
                    }
                  } else {
                    if (next_char > 56318) {
                      if (next_char < 57344) {
                        _tmp = 8;
                        continue _L$3;
                      } else {
                        if (next_char > 65535) {
                          break _L;
                        } else {
                          break _L$6;
                        }
                      }
                    } else {
                      _tmp = 7;
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
                  const _p = _cursor;
                  const next_char = _data.charCodeAt(_p);
                  _cursor = _cursor + 1 | 0;
                  if (next_char < 55296) {
                    if (next_char < 58) {
                      if (next_char < 48) {
                        break _L$6;
                      } else {
                        _tmp = 2;
                        continue _L$3;
                      }
                    } else {
                      if (next_char > 58) {
                        break _L$6;
                      } else {
                        _tmp = 3;
                        continue _L$3;
                      }
                    }
                  } else {
                    if (next_char > 56318) {
                      if (next_char < 57344) {
                        _tmp = 8;
                        continue _L$3;
                      } else {
                        if (next_char > 65535) {
                          break _L;
                        } else {
                          break _L$6;
                        }
                      }
                    } else {
                      _tmp = 7;
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
                _L$6: {
                  const _p = _cursor;
                  const next_char = _data.charCodeAt(_p);
                  _cursor = _cursor + 1 | 0;
                  if (next_char < 55296) {
                    if (next_char < 58) {
                      break _L$6;
                    } else {
                      if (next_char > 58) {
                        break _L$6;
                      } else {
                        _tmp = 1;
                        continue _L$3;
                      }
                    }
                  } else {
                    if (next_char > 56318) {
                      if (next_char < 57344) {
                        _tmp = 8;
                        continue _L$3;
                      } else {
                        if (next_char > 65535) {
                          break _L;
                        } else {
                          break _L$6;
                        }
                      }
                    } else {
                      _tmp = 7;
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
            case 8: {
              if (_cursor < _end) {
                const _p = _cursor;
                const next_char = _data.charCodeAt(_p);
                _cursor = _cursor + 1 | 0;
                if (next_char < 56320) {
                  break _L;
                } else {
                  if (next_char > 57343) {
                    break _L;
                  } else {
                    _tmp = 0;
                    continue _L$3;
                  }
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
                  const _p = _cursor;
                  const next_char = _data.charCodeAt(_p);
                  _cursor = _cursor + 1 | 0;
                  if (next_char < 55296) {
                    if (next_char < 58) {
                      if (next_char < 48) {
                        break _L$6;
                      } else {
                        _tmp = 4;
                        continue _L$3;
                      }
                    } else {
                      if (next_char > 58) {
                        break _L$6;
                      } else {
                        tag_1_2 = tag_1_1;
                        tag_1_1 = tag_1;
                        tag_1 = _cursor;
                        if (_cursor < _end) {
                          _L$7: {
                            const _p$2 = _cursor;
                            const next_char$2 = _data.charCodeAt(_p$2);
                            _cursor = _cursor + 1 | 0;
                            if (next_char$2 < 55296) {
                              if (next_char$2 < 58) {
                                if (next_char$2 < 48) {
                                  break _L$7;
                                } else {
                                  tag_1 = _cursor;
                                  tag_2_1 = tag_2;
                                  tag_2 = _cursor;
                                  if (_cursor < _end) {
                                    _L$8: {
                                      const _p$3 = _cursor;
                                      const next_char$3 = _data.charCodeAt(_p$3);
                                      _cursor = _cursor + 1 | 0;
                                      if (next_char$3 < 55296) {
                                        if (next_char$3 < 58) {
                                          if (next_char$3 < 48) {
                                            break _L$8;
                                          } else {
                                            _tmp = 5;
                                            continue _L$3;
                                          }
                                        } else {
                                          if (next_char$3 > 58) {
                                            break _L$8;
                                          } else {
                                            _tmp = 3;
                                            continue _L$3;
                                          }
                                        }
                                      } else {
                                        if (next_char$3 > 56318) {
                                          if (next_char$3 < 57344) {
                                            _tmp = 8;
                                            continue _L$3;
                                          } else {
                                            if (next_char$3 > 65535) {
                                              break _L;
                                            } else {
                                              break _L$8;
                                            }
                                          }
                                        } else {
                                          _tmp = 7;
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
                                if (next_char$2 > 58) {
                                  break _L$7;
                                } else {
                                  _tmp = 1;
                                  continue _L$3;
                                }
                              }
                            } else {
                              if (next_char$2 > 56318) {
                                if (next_char$2 < 57344) {
                                  _tmp = 8;
                                  continue _L$3;
                                } else {
                                  if (next_char$2 > 65535) {
                                    break _L;
                                  } else {
                                    break _L$7;
                                  }
                                }
                              } else {
                                _tmp = 7;
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
                  } else {
                    if (next_char > 56318) {
                      if (next_char < 57344) {
                        _tmp = 8;
                        continue _L$3;
                      } else {
                        if (next_char > 65535) {
                          break _L;
                        } else {
                          break _L$6;
                        }
                      }
                    } else {
                      _tmp = 7;
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
            case 5: {
              tag_1 = _cursor;
              tag_2 = _cursor;
              if (_cursor < _end) {
                _L$6: {
                  const _p = _cursor;
                  const next_char = _data.charCodeAt(_p);
                  _cursor = _cursor + 1 | 0;
                  if (next_char < 55296) {
                    if (next_char < 58) {
                      if (next_char < 48) {
                        break _L$6;
                      } else {
                        _tmp = 5;
                        continue _L$3;
                      }
                    } else {
                      if (next_char > 58) {
                        break _L$6;
                      } else {
                        _tmp = 3;
                        continue _L$3;
                      }
                    }
                  } else {
                    if (next_char > 56318) {
                      if (next_char < 57344) {
                        _tmp = 8;
                        continue _L$3;
                      } else {
                        if (next_char > 65535) {
                          break _L;
                        } else {
                          break _L$6;
                        }
                      }
                    } else {
                      _tmp = 7;
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
                  const _p = _cursor;
                  const next_char = _data.charCodeAt(_p);
                  _cursor = _cursor + 1 | 0;
                  if (next_char < 59) {
                    if (next_char < 46) {
                      if (next_char < 45) {
                        break _L$6;
                      } else {
                        break _L$4;
                      }
                    } else {
                      if (next_char > 47) {
                        if (next_char < 58) {
                          _tmp = 6;
                          continue _L$3;
                        } else {
                          _tmp = 3;
                          continue _L$3;
                        }
                      } else {
                        break _L$6;
                      }
                    }
                  } else {
                    if (next_char > 55295) {
                      if (next_char < 57344) {
                        if (next_char < 56319) {
                          _tmp = 7;
                          continue _L$3;
                        } else {
                          _tmp = 8;
                          continue _L$3;
                        }
                      } else {
                        if (next_char > 65535) {
                          break _L;
                        } else {
                          break _L$6;
                        }
                      }
                    } else {
                      break _L$6;
                    }
                  }
                }
                _tmp = 0;
                continue _L$3;
              } else {
                break _L;
              }
            }
            case 7: {
              if (_cursor < _end) {
                const _p = _cursor;
                const next_char = _data.charCodeAt(_p);
                _cursor = _cursor + 1 | 0;
                if (next_char < 56320) {
                  break _L;
                } else {
                  if (next_char > 65535) {
                    break _L;
                  } else {
                    _tmp = 0;
                    continue _L$3;
                  }
                }
              } else {
                break _L;
              }
            }
            case 1: {
              tag_1_1 = tag_1;
              tag_1 = _cursor;
              if (_cursor < _end) {
                _L$6: {
                  const _p = _cursor;
                  const next_char = _data.charCodeAt(_p);
                  _cursor = _cursor + 1 | 0;
                  if (next_char < 55296) {
                    if (next_char < 58) {
                      if (next_char < 48) {
                        break _L$6;
                      } else {
                        _tmp = 2;
                        continue _L$3;
                      }
                    } else {
                      if (next_char > 58) {
                        break _L$6;
                      } else {
                        _tmp = 1;
                        continue _L$3;
                      }
                    }
                  } else {
                    if (next_char > 56318) {
                      if (next_char < 57344) {
                        _tmp = 8;
                        continue _L$3;
                      } else {
                        if (next_char > 65535) {
                          break _L;
                        } else {
                          break _L$6;
                        }
                      }
                    } else {
                      _tmp = 7;
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
          const _p = _cursor;
          const next_char = _data.charCodeAt(_p);
          _cursor = _cursor + 1 | 0;
          if (next_char < 55296) {
            if (next_char < 58) {
              if (next_char < 48) {
                break _L$5;
              } else {
                _tmp = 4;
                continue;
              }
            } else {
              if (next_char > 58) {
                break _L$5;
              } else {
                _tmp = 1;
                continue;
              }
            }
          } else {
            if (next_char > 56318) {
              if (next_char < 57344) {
                _tmp = 8;
                continue;
              } else {
                if (next_char > 65535) {
                  break _L;
                } else {
                  break _L$5;
                }
              }
            } else {
              _tmp = 7;
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
  }
  if (accept_state === 0) {
    let start_line;
    let _try_err;
    _L$2: {
      _L$3: {
        const _bind$2 = moonbitlang$core$string$$String$sub(_data, match_tag_saver_1 + 1 | 0, match_tag_saver_2);
        if (_bind$2.$tag === 1) {
          const _ok = _bind$2;
          start_line = _ok._0;
        } else {
          const _err = _bind$2;
          const _tmp = _err._0;
          _try_err = _tmp;
          break _L$3;
        }
        break _L$2;
      }
      start_line = $panic();
    }
    let start_column;
    let _try_err$2;
    _L$3: {
      _L$4: {
        const _bind$2 = moonbitlang$core$string$$String$sub(_data, match_tag_saver_2 + 1 | 0, match_tag_saver_3);
        if (_bind$2.$tag === 1) {
          const _ok = _bind$2;
          start_column = _ok._0;
        } else {
          const _err = _bind$2;
          const _tmp = _err._0;
          _try_err$2 = _tmp;
          break _L$4;
        }
        break _L$3;
      }
      start_column = $panic();
    }
    let pkg;
    let _try_err$3;
    _L$4: {
      _L$5: {
        const _bind$2 = moonbitlang$core$string$$String$sub(_data, _start + 1 | 0, match_tag_saver_0);
        if (_bind$2.$tag === 1) {
          const _ok = _bind$2;
          pkg = _ok._0;
        } else {
          const _err = _bind$2;
          const _tmp = _err._0;
          _try_err$3 = _tmp;
          break _L$5;
        }
        break _L$4;
      }
      pkg = $panic();
    }
    let filename;
    let _try_err$4;
    _L$5: {
      _L$6: {
        const _bind$2 = moonbitlang$core$string$$String$sub(_data, match_tag_saver_0 + 1 | 0, match_tag_saver_1);
        if (_bind$2.$tag === 1) {
          const _ok = _bind$2;
          filename = _ok._0;
        } else {
          const _err = _bind$2;
          const _tmp = _err._0;
          _try_err$4 = _tmp;
          break _L$6;
        }
        break _L$5;
      }
      filename = $panic();
    }
    let end_line;
    let _try_err$5;
    _L$6: {
      _L$7: {
        const _bind$2 = moonbitlang$core$string$$String$sub(_data, match_tag_saver_3 + 1 | 0, match_tag_saver_4);
        if (_bind$2.$tag === 1) {
          const _ok = _bind$2;
          end_line = _ok._0;
        } else {
          const _err = _bind$2;
          const _tmp = _err._0;
          _try_err$5 = _tmp;
          break _L$7;
        }
        break _L$6;
      }
      end_line = $panic();
    }
    let end_column;
    let _try_err$6;
    _L$7: {
      _L$8: {
        const _bind$2 = moonbitlang$core$string$$String$sub(_data, match_tag_saver_4 + 1 | 0, match_end);
        if (_bind$2.$tag === 1) {
          const _ok = _bind$2;
          end_column = _ok._0;
        } else {
          const _err = _bind$2;
          const _tmp = _err._0;
          _try_err$6 = _tmp;
          break _L$8;
        }
        break _L$7;
      }
      end_column = $panic();
    }
    return { pkg: pkg, filename: filename, start_line: start_line, start_column: start_column, end_line: end_line, end_column: end_column };
  } else {
    return $panic();
  }
}
function moonbitlang$core$builtin$$StringBuilder$write_object$31$(self, obj) {
  moonbitlang$core$builtin$$Show$output$31$(obj, { self: self, method_table: $$$64$moonbitlang$47$core$47$builtin$46$StringBuilder$36$as$36$64$moonbitlang$47$core$47$builtin$46$Logger });
}
function moonbitlang$core$builtin$$Logger$write_string$0$(self, str) {
  const _bind = self;
  _bind.val = `${_bind.val}${str}`;
}
function moonbitlang$core$uint16$$UInt16$to_char(self) {
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
function moonbitlang$core$builtin$$Hasher$combine_int(self, value) {
  moonbitlang$core$builtin$$Hasher$combine_uint(self, value);
}
function moonbitlang$core$builtin$$MyInt64$from_int(value) {
  return { hi: value >> 31 & -1, lo: value | 0 };
}
function moonbitlang$core$int$$Int$to_int64(self) {
  return moonbitlang$core$builtin$$MyInt64$from_int(self);
}
function moonbitlang$core$builtin$$Hasher$combine$19$(self, value) {
  moonbitlang$core$builtin$$Hash$hash_combine$19$(value, self);
}
function moonbitlang$core$builtin$$Hasher$combine$16$(self, value) {
  moonbitlang$core$builtin$$Hash$hash_combine$16$(value, self);
}
function moonbitlang$core$builtin$$Eq$not_equal$32$(x, y) {
  return !moonbitlang$core$builtin$$Eq$equal$12$(x, y);
}
function moonbitlang$core$builtin$$Eq$not_equal$33$(x, y) {
  return !(x === y);
}
function moonbitlang$core$builtin$$Compare$op_lt$34$(x, y) {
  return moonbitlang$core$builtin$$Compare$compare$35$(x, y) < 0;
}
function moonbitlang$core$builtin$$Compare$op_lt$36$(x, y) {
  return moonbitlang$core$builtin$$Compare$compare$6$(x, y) < 0;
}
function moonbitlang$core$builtin$$Compare$op_gt$36$(x, y) {
  return moonbitlang$core$builtin$$Compare$compare$6$(x, y) > 0;
}
function moonbitlang$core$builtin$$Compare$op_gt$34$(x, y) {
  return moonbitlang$core$builtin$$Compare$compare$35$(x, y) > 0;
}
function moonbitlang$core$builtin$$Compare$op_le$34$(x, y) {
  return moonbitlang$core$builtin$$Compare$compare$35$(x, y) <= 0;
}
function moonbitlang$core$builtin$$Compare$op_le$36$(x, y) {
  return moonbitlang$core$builtin$$Compare$compare$6$(x, y) <= 0;
}
function moonbitlang$core$builtin$$Compare$op_ge$34$(x, y) {
  return moonbitlang$core$builtin$$Compare$compare$35$(x, y) >= 0;
}
function moonbitlang$core$builtin$$Compare$op_ge$36$(x, y) {
  return moonbitlang$core$builtin$$Compare$compare$6$(x, y) >= 0;
}
function moonbitlang$core$builtin$$Hasher$avalanche(self) {
  let acc = self.acc;
  acc = acc ^ (acc >>> 15 | 0);
  acc = Math.imul(acc, -2048144777) | 0;
  acc = acc ^ (acc >>> 13 | 0);
  acc = Math.imul(acc, -1028477379) | 0;
  acc = acc ^ (acc >>> 16 | 0);
  return acc;
}
function moonbitlang$core$builtin$$Hasher$finalize(self) {
  return moonbitlang$core$builtin$$Hasher$avalanche(self);
}
function moonbitlang$core$builtin$$Hasher$new$46$inner(seed) {
  return { acc: (seed >>> 0) + (374761393 >>> 0) | 0 };
}
function moonbitlang$core$builtin$$Hasher$new(seed$46$opt) {
  let seed;
  if (seed$46$opt === undefined) {
    seed = moonbitlang$core$builtin$$seed;
  } else {
    const _Some = seed$46$opt;
    seed = _Some;
  }
  return moonbitlang$core$builtin$$Hasher$new$46$inner(seed);
}
function moonbitlang$core$builtin$$Hash$hash$37$(self) {
  const _self = moonbitlang$core$builtin$$Hasher$new(undefined);
  moonbitlang$core$builtin$$Hasher$combine$19$(_self, self);
  return moonbitlang$core$builtin$$Hasher$finalize(_self);
}
function moonbitlang$core$builtin$$Hash$hash$38$(self) {
  const _self = moonbitlang$core$builtin$$Hasher$new(undefined);
  moonbitlang$core$builtin$$Hasher$combine$16$(_self, self);
  return moonbitlang$core$builtin$$Hasher$finalize(_self);
}
function moonbitlang$core$string$$String$sub$46$inner(self, start, end) {
  const len = self.length;
  let end$2;
  if (end === undefined) {
    end$2 = len;
  } else {
    const _Some = end;
    const _end = _Some;
    end$2 = _end < 0 ? len + _end | 0 : _end;
  }
  const start$2 = start < 0 ? len + start | 0 : start;
  if (start$2 >= 0 && (start$2 <= end$2 && end$2 <= len)) {
    let _tmp;
    if (start$2 < len) {
      const _p = self.charCodeAt(start$2);
      _tmp = 56320 <= _p && _p <= 57343;
    } else {
      _tmp = false;
    }
    if (_tmp) {
      return new Result$Err$0$(Error$moonbitlang$47$core$47$builtin$46$CreatingViewError$46$InvalidIndex);
    }
    let _tmp$2;
    if (end$2 < len) {
      const _p = self.charCodeAt(end$2);
      _tmp$2 = 56320 <= _p && _p <= 57343;
    } else {
      _tmp$2 = false;
    }
    if (_tmp$2) {
      return new Result$Err$0$(Error$moonbitlang$47$core$47$builtin$46$CreatingViewError$46$InvalidIndex);
    }
    return new Result$Ok$0$({ str: self, start: start$2, end: end$2 });
  } else {
    return new Result$Err$0$(Error$moonbitlang$47$core$47$builtin$46$CreatingViewError$46$IndexOutOfBounds);
  }
}
function moonbitlang$core$string$$String$sub(self, start$46$opt, end) {
  let start;
  if (start$46$opt === undefined) {
    start = 0;
  } else {
    const _Some = start$46$opt;
    start = _Some;
  }
  return moonbitlang$core$string$$String$sub$46$inner(self, start, end);
}
function moonbitlang$core$builtin$$Logger$write_substring$1$(self, value, start, len) {
  let _tmp;
  let _try_err;
  _L: {
    _L$2: {
      const _bind = moonbitlang$core$string$$String$sub$46$inner(value, start, start + len | 0);
      if (_bind.$tag === 1) {
        const _ok = _bind;
        _tmp = _ok._0;
      } else {
        const _err = _bind;
        const _tmp$2 = _err._0;
        _try_err = _tmp$2;
        break _L$2;
      }
      break _L;
    }
    _tmp = $panic();
  }
  moonbitlang$core$builtin$$Logger$write_view$0$(self, _tmp);
}
function moonbitlang$core$builtin$$Show$to_string$21$(self) {
  const logger = moonbitlang$core$builtin$$StringBuilder$new$46$inner(0);
  moonbitlang$core$builtin$$Show$output$39$(self, { self: logger, method_table: $$$64$moonbitlang$47$core$47$builtin$46$StringBuilder$36$as$36$64$moonbitlang$47$core$47$builtin$46$Logger });
  return logger.val;
}
function moonbitlang$core$builtin$$Show$to_string$40$(self) {
  const logger = moonbitlang$core$builtin$$StringBuilder$new$46$inner(0);
  moonbitlang$core$builtin$$Show$output$41$(self, { self: logger, method_table: $$$64$moonbitlang$47$core$47$builtin$46$StringBuilder$36$as$36$64$moonbitlang$47$core$47$builtin$46$Logger });
  return logger.val;
}
function moonbitlang$core$builtin$$Show$to_string$38$(self) {
  const logger = moonbitlang$core$builtin$$StringBuilder$new$46$inner(0);
  moonbitlang$core$builtin$$Show$output$16$(self, { self: logger, method_table: $$$64$moonbitlang$47$core$47$builtin$46$StringBuilder$36$as$36$64$moonbitlang$47$core$47$builtin$46$Logger });
  return logger.val;
}
function moonbitlang$core$builtin$$Show$to_string$4$(self) {
  const logger = moonbitlang$core$builtin$$StringBuilder$new$46$inner(0);
  moonbitlang$core$builtin$$Show$output$42$(self, { self: logger, method_table: $$$64$moonbitlang$47$core$47$builtin$46$StringBuilder$36$as$36$64$moonbitlang$47$core$47$builtin$46$Logger });
  return logger.val;
}
function moonbitlang$core$builtin$$Show$to_string$2$(self) {
  const logger = moonbitlang$core$builtin$$StringBuilder$new$46$inner(0);
  moonbitlang$core$builtin$$Show$output$20$(self, { self: logger, method_table: $$$64$moonbitlang$47$core$47$builtin$46$StringBuilder$36$as$36$64$moonbitlang$47$core$47$builtin$46$Logger });
  return logger.val;
}
function moonbitlang$core$builtin$$Show$to_string$3$(self) {
  const logger = moonbitlang$core$builtin$$StringBuilder$new$46$inner(0);
  moonbitlang$core$builtin$$Show$output$43$(self, { self: logger, method_table: $$$64$moonbitlang$47$core$47$builtin$46$StringBuilder$36$as$36$64$moonbitlang$47$core$47$builtin$46$Logger });
  return logger.val;
}
function moonbitlang$core$builtin$$Show$to_string$5$(self) {
  const logger = moonbitlang$core$builtin$$StringBuilder$new$46$inner(0);
  moonbitlang$core$builtin$$Show$output$44$(self, { self: logger, method_table: $$$64$moonbitlang$47$core$47$builtin$46$StringBuilder$36$as$36$64$moonbitlang$47$core$47$builtin$46$Logger });
  return logger.val;
}
function moonbitlang$core$builtin$$repr$45$(t) {
  const logger = moonbitlang$core$builtin$$StringBuilder$new$46$inner(0);
  moonbitlang$core$builtin$$Show$output$45$(t, { self: logger, method_table: $$$64$moonbitlang$47$core$47$builtin$46$StringBuilder$36$as$36$64$moonbitlang$47$core$47$builtin$46$Logger });
  return logger.val;
}
function moonbitlang$core$int$$Int$to_string$46$inner(self, radix) {
  return moonbitlang$core$builtin$$int_to_string_js(self, radix);
}
function moonbitlang$core$string$$StringView$view$46$inner(self, start_offset, end_offset) {
  let end_offset$2;
  if (end_offset === undefined) {
    end_offset$2 = self.end - self.start | 0;
  } else {
    const _Some = end_offset;
    end_offset$2 = _Some;
  }
  return start_offset >= 0 && (start_offset <= end_offset$2 && end_offset$2 <= (self.end - self.start | 0)) ? { str: self.str, start: self.start + start_offset | 0, end: self.start + end_offset$2 | 0 } : moonbitlang$core$builtin$$abort$12$("Invalid index for View", "@moonbitlang/core/builtin:stringview.mbt:111:5-111:36");
}
function moonbitlang$core$builtin$$to_hex$46$to_hex_digit$124$3717(i) {
  if (i < 10) {
    const _p = 48;
    const _p$2 = (i + _p | 0) & 255;
    return _p$2;
  } else {
    const _p = 97;
    const _p$2 = (i + _p | 0) & 255;
    const _p$3 = 10;
    const _p$4 = (_p$2 - _p$3 | 0) & 255;
    return _p$4;
  }
}
function moonbitlang$core$byte$$Byte$to_hex(b) {
  const _self = moonbitlang$core$builtin$$StringBuilder$new$46$inner(0);
  const _p = 16;
  moonbitlang$core$builtin$$Logger$write_char$0$(_self, moonbitlang$core$builtin$$to_hex$46$to_hex_digit$124$3717((b / _p | 0) & 255));
  const _p$2 = 16;
  moonbitlang$core$builtin$$Logger$write_char$0$(_self, moonbitlang$core$builtin$$to_hex$46$to_hex_digit$124$3717((b % _p$2 | 0) & 255));
  const _p$3 = _self;
  return _p$3.val;
}
function moonbitlang$core$builtin$$output$46$flush_segment$124$3707(_env, seg, i) {
  const self = _env._1;
  const logger = _env._0;
  if (i > seg) {
    logger.method_table.method_1(logger.self, self, seg, i - seg | 0);
    return;
  } else {
    return;
  }
}
function moonbitlang$core$builtin$$Show$output$19$(self, logger) {
  logger.method_table.method_3(logger.self, 34);
  const _env = { _0: logger, _1: self };
  const len = self.length;
  let _tmp = 0;
  let _tmp$2 = 0;
  _L: while (true) {
    const i = _tmp;
    const seg = _tmp$2;
    if (i >= len) {
      moonbitlang$core$builtin$$output$46$flush_segment$124$3707(_env, seg, i);
      break;
    }
    const code = self.charCodeAt(i);
    let c;
    _L$2: {
      switch (code) {
        case 34: {
          c = code;
          break _L$2;
        }
        case 92: {
          c = code;
          break _L$2;
        }
        case 10: {
          moonbitlang$core$builtin$$output$46$flush_segment$124$3707(_env, seg, i);
          logger.method_table.method_0(logger.self, "\\n");
          _tmp = i + 1 | 0;
          _tmp$2 = i + 1 | 0;
          continue _L;
        }
        case 13: {
          moonbitlang$core$builtin$$output$46$flush_segment$124$3707(_env, seg, i);
          logger.method_table.method_0(logger.self, "\\r");
          _tmp = i + 1 | 0;
          _tmp$2 = i + 1 | 0;
          continue _L;
        }
        case 8: {
          moonbitlang$core$builtin$$output$46$flush_segment$124$3707(_env, seg, i);
          logger.method_table.method_0(logger.self, "\\b");
          _tmp = i + 1 | 0;
          _tmp$2 = i + 1 | 0;
          continue _L;
        }
        case 9: {
          moonbitlang$core$builtin$$output$46$flush_segment$124$3707(_env, seg, i);
          logger.method_table.method_0(logger.self, "\\t");
          _tmp = i + 1 | 0;
          _tmp$2 = i + 1 | 0;
          continue _L;
        }
        default: {
          if (code < 32) {
            moonbitlang$core$builtin$$output$46$flush_segment$124$3707(_env, seg, i);
            logger.method_table.method_0(logger.self, "\\u{");
            logger.method_table.method_0(logger.self, moonbitlang$core$byte$$Byte$to_hex(code & 255));
            logger.method_table.method_3(logger.self, 125);
            _tmp = i + 1 | 0;
            _tmp$2 = i + 1 | 0;
            continue _L;
          } else {
            _tmp = i + 1 | 0;
            continue _L;
          }
        }
      }
    }
    moonbitlang$core$builtin$$output$46$flush_segment$124$3707(_env, seg, i);
    logger.method_table.method_3(logger.self, 92);
    logger.method_table.method_3(logger.self, c);
    _tmp = i + 1 | 0;
    _tmp$2 = i + 1 | 0;
    continue;
  }
  logger.method_table.method_3(logger.self, 34);
}
function moonbitlang$core$builtin$$Show$to_string$12$(self) {
  return self.str.substring(self.start, self.end);
}
function moonbitlang$core$string$$StringView$iter(self) {
  const start = self.start;
  const end = self.end;
  const index = { val: start };
  const _p = () => {
    if (index.val < end) {
      const _tmp = self.str;
      const _tmp$2 = index.val;
      const c1 = _tmp.charCodeAt(_tmp$2);
      if (55296 <= c1 && c1 <= 56319 && (index.val + 1 | 0) < self.end) {
        const _tmp$3 = self.str;
        const _tmp$4 = index.val + 1 | 0;
        const c2 = _tmp$3.charCodeAt(_tmp$4);
        if (56320 <= c2 && c2 <= 57343) {
          index.val = index.val + 2 | 0;
          return moonbitlang$core$builtin$$code_point_of_surrogate_pair(c1, c2);
        }
      }
      index.val = index.val + 1 | 0;
      return c1;
    } else {
      return -1;
    }
  };
  return _p;
}
function moonbitlang$core$builtin$$Eq$equal$12$(self, other) {
  const len = self.end - self.start | 0;
  if (len === (other.end - other.start | 0)) {
    if (self.str === other.str && self.start === other.start) {
      return true;
    }
    let _tmp = 0;
    while (true) {
      const i = _tmp;
      if (i < len) {
        const _tmp$2 = self.str;
        const _tmp$3 = self.start + i | 0;
        const _tmp$4 = _tmp$2.charCodeAt(_tmp$3);
        const _tmp$5 = other.str;
        const _tmp$6 = other.start + i | 0;
        if (_tmp$4 === _tmp$5.charCodeAt(_tmp$6)) {
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
function moonbitlang$core$string$$StringView$sub$46$inner(self, start, end) {
  const str_len = self.str.length;
  let abs_end;
  if (end === undefined) {
    abs_end = self.end;
  } else {
    const _Some = end;
    const _end = _Some;
    abs_end = _end < 0 ? self.end + _end | 0 : self.start + _end | 0;
  }
  const abs_start = start < 0 ? self.end + start | 0 : self.start + start | 0;
  if (abs_start >= self.start && (abs_start <= abs_end && abs_end <= self.end)) {
    let _tmp;
    if (abs_start < str_len) {
      const _tmp$2 = self.str;
      const _p = _tmp$2.charCodeAt(abs_start);
      _tmp = 56320 <= _p && _p <= 57343;
    } else {
      _tmp = false;
    }
    if (_tmp) {
      return new Result$Err$0$(Error$moonbitlang$47$core$47$builtin$46$CreatingViewError$46$InvalidIndex);
    }
    let _tmp$2;
    if (abs_end < str_len) {
      const _tmp$3 = self.str;
      const _p = _tmp$3.charCodeAt(abs_end);
      _tmp$2 = 56320 <= _p && _p <= 57343;
    } else {
      _tmp$2 = false;
    }
    if (_tmp$2) {
      return new Result$Err$0$(Error$moonbitlang$47$core$47$builtin$46$CreatingViewError$46$InvalidIndex);
    }
    return new Result$Ok$0$({ str: self.str, start: abs_start, end: abs_end });
  } else {
    return new Result$Err$0$(Error$moonbitlang$47$core$47$builtin$46$CreatingViewError$46$IndexOutOfBounds);
  }
}
function moonbitlang$core$string$$String$char_length_eq$46$inner(self, len, start_offset, end_offset) {
  let end_offset$2;
  if (end_offset === undefined) {
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
      if (55296 <= c1 && c1 <= 56319 && (index + 1 | 0) < end_offset$2) {
        const _tmp$3 = index + 1 | 0;
        const c2 = self.charCodeAt(_tmp$3);
        if (56320 <= c2 && c2 <= 57343) {
          _tmp = index + 2 | 0;
          _tmp$2 = count + 1 | 0;
          continue;
        } else {
          moonbitlang$core$builtin$$abort$11$("invalid surrogate pair", "@moonbitlang/core/builtin:string.mbt:426:9-426:40");
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
function moonbitlang$core$string$$String$char_length_ge$46$inner(self, len, start_offset, end_offset) {
  let end_offset$2;
  if (end_offset === undefined) {
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
      if (55296 <= c1 && c1 <= 56319 && (index + 1 | 0) < end_offset$2) {
        const _tmp$3 = index + 1 | 0;
        const c2 = self.charCodeAt(_tmp$3);
        if (56320 <= c2 && c2 <= 57343) {
          _tmp = index + 2 | 0;
          _tmp$2 = count + 1 | 0;
          continue;
        } else {
          moonbitlang$core$builtin$$abort$11$("invalid surrogate pair", "@moonbitlang/core/builtin:string.mbt:454:9-454:40");
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
function moonbitlang$core$string$$String$offset_of_nth_char_backward(self, n, start_offset, end_offset) {
  let char_count = 0;
  let utf16_offset = end_offset;
  while (true) {
    if ((utf16_offset - 1 | 0) >= start_offset && char_count < n) {
      const _tmp = utf16_offset - 1 | 0;
      const c = self.charCodeAt(_tmp);
      if (56320 <= c && c <= 57343) {
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
  return char_count < n || utf16_offset < start_offset ? undefined : utf16_offset;
}
function moonbitlang$core$string$$String$offset_of_nth_char_forward(self, n, start_offset, end_offset) {
  if (start_offset >= 0 && start_offset <= end_offset) {
    let utf16_offset = start_offset;
    let char_count = 0;
    while (true) {
      if (utf16_offset < end_offset && char_count < n) {
        const _tmp = utf16_offset;
        const c = self.charCodeAt(_tmp);
        if (55296 <= c && c <= 56319) {
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
    return char_count < n || utf16_offset >= end_offset ? undefined : utf16_offset;
  } else {
    return moonbitlang$core$builtin$$abort$13$("Invalid start index", "@moonbitlang/core/builtin:string.mbt:329:5-329:33");
  }
}
function moonbitlang$core$string$$String$offset_of_nth_char$46$inner(self, i, start_offset, end_offset) {
  let end_offset$2;
  if (end_offset === undefined) {
    end_offset$2 = self.length;
  } else {
    const _Some = end_offset;
    end_offset$2 = _Some;
  }
  return i >= 0 ? moonbitlang$core$string$$String$offset_of_nth_char_forward(self, i, start_offset, end_offset$2) : moonbitlang$core$string$$String$offset_of_nth_char_backward(self, -i | 0, start_offset, end_offset$2);
}
function moonbitlang$core$builtin$$Logger$write_view$0$(self, str) {
  const _bind = self;
  _bind.val = `${_bind.val}${moonbitlang$core$builtin$$Show$to_string$12$(str)}`;
}
function moonbitlang$core$builtin$$boyer_moore_horspool_find(haystack, needle) {
  const haystack_len = haystack.end - haystack.start | 0;
  const needle_len = needle.end - needle.start | 0;
  if (needle_len > 0) {
    if (haystack_len >= needle_len) {
      const skip_table = $make_array_len_and_init(256, needle_len);
      const _end4174 = needle_len - 1 | 0;
      let _tmp = 0;
      while (true) {
        const i = _tmp;
        if (i < _end4174) {
          const _tmp$2 = needle.str;
          const _tmp$3 = needle.start + i | 0;
          const _tmp$4 = _tmp$2.charCodeAt(_tmp$3) & 255;
          $bound_check(skip_table, _tmp$4);
          skip_table[_tmp$4] = (needle_len - 1 | 0) - i | 0;
          _tmp = i + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      let _tmp$2 = 0;
      while (true) {
        const i = _tmp$2;
        if (i <= (haystack_len - needle_len | 0)) {
          const _end4180 = needle_len - 1 | 0;
          let _tmp$3 = 0;
          while (true) {
            const j = _tmp$3;
            if (j <= _end4180) {
              const _p = i + j | 0;
              const _tmp$4 = haystack.str;
              const _tmp$5 = haystack.start + _p | 0;
              const _tmp$6 = _tmp$4.charCodeAt(_tmp$5);
              const _tmp$7 = needle.str;
              const _tmp$8 = needle.start + j | 0;
              if (_tmp$6 !== _tmp$7.charCodeAt(_tmp$8)) {
                break;
              }
              _tmp$3 = j + 1 | 0;
              continue;
            } else {
              return i;
            }
          }
          const _p = (i + needle_len | 0) - 1 | 0;
          const _tmp$4 = haystack.str;
          const _tmp$5 = haystack.start + _p | 0;
          const _tmp$6 = _tmp$4.charCodeAt(_tmp$5) & 255;
          $bound_check(skip_table, _tmp$6);
          _tmp$2 = i + skip_table[_tmp$6] | 0;
          continue;
        } else {
          break;
        }
      }
      return undefined;
    } else {
      return undefined;
    }
  } else {
    return moonbitlang$core$builtin$$boyer_moore_horspool_find$46$constr$47$458;
  }
}
function moonbitlang$core$builtin$$brute_force_find(haystack, needle) {
  const haystack_len = haystack.end - haystack.start | 0;
  const needle_len = needle.end - needle.start | 0;
  if (needle_len > 0) {
    if (haystack_len >= needle_len) {
      const _p = 0;
      const _tmp = needle.str;
      const _tmp$2 = needle.start + _p | 0;
      const needle_first = _tmp.charCodeAt(_tmp$2);
      const forward_len = haystack_len - needle_len | 0;
      let i = 0;
      while (true) {
        if (i <= forward_len) {
          while (true) {
            let _tmp$3;
            if (i <= forward_len) {
              const _p$2 = i;
              const _tmp$4 = haystack.str;
              const _tmp$5 = haystack.start + _p$2 | 0;
              _tmp$3 = _tmp$4.charCodeAt(_tmp$5) !== needle_first;
            } else {
              _tmp$3 = false;
            }
            if (_tmp$3) {
              i = i + 1 | 0;
              continue;
            } else {
              break;
            }
          }
          if (i <= forward_len) {
            let _tmp$3 = 1;
            while (true) {
              const j = _tmp$3;
              if (j < needle_len) {
                const _p$2 = i + j | 0;
                const _tmp$4 = haystack.str;
                const _tmp$5 = haystack.start + _p$2 | 0;
                const _tmp$6 = _tmp$4.charCodeAt(_tmp$5);
                const _tmp$7 = needle.str;
                const _tmp$8 = needle.start + j | 0;
                if (_tmp$6 !== _tmp$7.charCodeAt(_tmp$8)) {
                  break;
                }
                _tmp$3 = j + 1 | 0;
                continue;
              } else {
                return i;
              }
            }
            i = i + 1 | 0;
          }
          continue;
        } else {
          break;
        }
      }
      return undefined;
    } else {
      return undefined;
    }
  } else {
    return moonbitlang$core$builtin$$brute_force_find$46$constr$47$472;
  }
}
function moonbitlang$core$string$$StringView$find(self, str) {
  return (str.end - str.start | 0) <= 4 ? moonbitlang$core$builtin$$brute_force_find(self, str) : moonbitlang$core$builtin$$boyer_moore_horspool_find(self, str);
}
function moonbitlang$core$string$$String$repeat(self, n) {
  if (n <= 0) {
    return "";
  } else {
    if (n === 1) {
      return self;
    } else {
      const len = self.length;
      const buf = moonbitlang$core$builtin$$StringBuilder$new$46$inner(Math.imul(len, n) | 0);
      const str = self;
      let _tmp = 0;
      while (true) {
        const _ = _tmp;
        if (_ < n) {
          moonbitlang$core$builtin$$Logger$write_string$0$(buf, str);
          _tmp = _ + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      return buf.val;
    }
  }
}
function moonbitlang$core$array$$Array$new$46$inner$14$(capacity) {
  return [];
}
function moonbitlang$core$array$$Array$push$46$(self, value) {
  moonbitlang$core$builtin$$JSArray$push(self, value);
}
function moonbitlang$core$array$$Array$push$47$(self, value) {
  moonbitlang$core$builtin$$JSArray$push(self, value);
}
function moonbitlang$core$array$$Array$push$48$(self, value) {
  moonbitlang$core$builtin$$JSArray$push(self, value);
}
function moonbitlang$core$array$$Array$push$19$(self, value) {
  moonbitlang$core$builtin$$JSArray$push(self, value);
}
function moonbitlang$core$array$$Array$push$14$(self, value) {
  moonbitlang$core$builtin$$JSArray$push(self, value);
}
function moonbitlang$core$array$$Array$push$30$(self, value) {
  moonbitlang$core$builtin$$JSArray$push(self, value);
}
function moonbitlang$core$array$$Array$push$15$(self, value) {
  moonbitlang$core$builtin$$JSArray$push(self, value);
}
function moonbitlang$core$array$$Array$push$8$(self, value) {
  moonbitlang$core$builtin$$JSArray$push(self, value);
}
function moonbitlang$core$array$$Array$push$16$(self, value) {
  moonbitlang$core$builtin$$JSArray$push(self, value);
}
function moonbitlang$core$array$$Array$push$29$(self, value) {
  moonbitlang$core$builtin$$JSArray$push(self, value);
}
function moonbitlang$core$array$$Array$push$49$(self, value) {
  moonbitlang$core$builtin$$JSArray$push(self, value);
}
function moonbitlang$core$builtin$$Iter$next$50$(self) {
  const _func = self;
  return _func();
}
function moonbitlang$core$builtin$$Iter$next$45$(self) {
  const _func = self;
  return _func();
}
function moonbitlang$core$builtin$$Iter$next$51$(self) {
  const _func = self;
  return _func();
}
function moonbitlang$core$builtin$$Iter$next$52$(self) {
  const _func = self;
  return _func();
}
function moonbitlang$core$builtin$$Iter$next$53$(self) {
  const _func = self;
  return _func();
}
function moonbitlang$core$builtin$$Iter$next$14$(self) {
  const _func = self;
  return _func();
}
function moonbitlang$core$builtin$$Iter$next$16$(self) {
  const _func = self;
  return _func();
}
function moonbitlang$core$string$$StringView$contains(self, str) {
  const _bind = moonbitlang$core$string$$StringView$find(self, str);
  return !(_bind === undefined);
}
function moonbitlang$core$string$$StringView$contains_char(self, c) {
  const len = self.end - self.start | 0;
  if (len > 0) {
    const c$2 = c;
    if (c$2 <= 65535) {
      let _tmp = 0;
      while (true) {
        const i = _tmp;
        if (i < len) {
          const _tmp$2 = self.str;
          const _tmp$3 = self.start + i | 0;
          if (_tmp$2.charCodeAt(_tmp$3) === c$2) {
            return true;
          }
          _tmp = i + 1 | 0;
          continue;
        } else {
          break;
        }
      }
    } else {
      if (len >= 2) {
        const adj = c$2 - 65536 | 0;
        const high = 55296 + (adj >> 10) | 0;
        const low = 56320 + (adj & 1023) | 0;
        let i = 0;
        while (true) {
          if (i < (len - 1 | 0)) {
            const _p = i;
            const _tmp = self.str;
            const _tmp$2 = self.start + _p | 0;
            if (_tmp.charCodeAt(_tmp$2) === high) {
              i = i + 1 | 0;
              const _p$2 = i;
              const _tmp$3 = self.str;
              const _tmp$4 = self.start + _p$2 | 0;
              if (_tmp$3.charCodeAt(_tmp$4) === low) {
                return true;
              }
            }
            i = i + 1 | 0;
            continue;
          } else {
            break;
          }
        }
      } else {
        return false;
      }
    }
    return false;
  } else {
    return false;
  }
}
function moonbitlang$core$string$$StringView$contains_any(self, chars) {
  if (moonbitlang$core$string$$String$char_length_eq$46$inner(chars.str, 0, chars.start, chars.end)) {
    return false;
  } else {
    if (moonbitlang$core$string$$String$char_length_eq$46$inner(chars.str, 1, chars.start, chars.end)) {
      const _c = moonbitlang$core$string$$String$unsafe_char_at(chars.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(chars.str, 0, chars.start, chars.end));
      return moonbitlang$core$string$$StringView$contains_char(self, _c);
    } else {
      const _it = moonbitlang$core$string$$StringView$iter(self);
      while (true) {
        const _bind = moonbitlang$core$builtin$$Iter$next$45$(_it);
        if (_bind === -1) {
          return false;
        } else {
          const _Some = _bind;
          const _c = _Some;
          if (moonbitlang$core$string$$StringView$contains_char(chars, _c)) {
            return true;
          }
          continue;
        }
      }
    }
  }
}
function moonbitlang$core$string$$String$contains_any(self, chars) {
  return moonbitlang$core$string$$StringView$contains_any({ str: self, start: 0, end: self.length }, chars);
}
function moonbitlang$core$string$$StringView$is_empty(self) {
  return (self.end - self.start | 0) === 0;
}
function moonbitlang$core$string$$String$iter(self) {
  const len = self.length;
  const index = { val: 0 };
  const _p = () => {
    if (index.val < len) {
      const _tmp = index.val;
      const c1 = self.charCodeAt(_tmp);
      if (55296 <= c1 && c1 <= 56319 && (index.val + 1 | 0) < len) {
        const _tmp$2 = index.val + 1 | 0;
        const c2 = self.charCodeAt(_tmp$2);
        if (56320 <= c2 && c2 <= 57343) {
          const c = moonbitlang$core$builtin$$code_point_of_surrogate_pair(c1, c2);
          index.val = index.val + 2 | 0;
          return c;
        }
      }
      index.val = index.val + 1 | 0;
      return c1;
    } else {
      return -1;
    }
  };
  return _p;
}
function moonbitlang$core$builtin$$Iter$map$54$(self, f) {
  return () => {
    const _bind = moonbitlang$core$builtin$$Iter$next$16$(self);
    if (_bind === undefined) {
      return undefined;
    } else {
      const _Some = _bind;
      const _x = _Some;
      return f(_x);
    }
  };
}
function moonbitlang$core$builtin$$Show$to_string$45$(self) {
  return String.fromCodePoint(self);
}
function moonbitlang$core$builtin$$Iter$to_array$16$(self) {
  const result = [];
  while (true) {
    const _bind = moonbitlang$core$builtin$$Iter$next$16$(self);
    if (_bind === undefined) {
      break;
    } else {
      const _Some = _bind;
      const _x = _Some;
      moonbitlang$core$array$$Array$push$16$(result, _x);
      continue;
    }
  }
  return result;
}
function moonbitlang$core$string$$StringView$get_char(self, idx) {
  if (idx >= 0 && idx < (self.end - self.start | 0)) {
    const _tmp = self.str;
    const _tmp$2 = self.start + idx | 0;
    const c = _tmp.charCodeAt(_tmp$2);
    if (55296 <= c && c <= 56319) {
      if ((idx + 1 | 0) < (self.end - self.start | 0)) {
        const _p = idx + 1 | 0;
        const _tmp$3 = self.str;
        const _tmp$4 = self.start + _p | 0;
        const next = _tmp$3.charCodeAt(_tmp$4);
        return 56320 <= next && next <= 57343 ? moonbitlang$core$builtin$$code_point_of_surrogate_pair(c, next) : -1;
      } else {
        return -1;
      }
    } else {
      return 56320 <= c && c <= 57343 ? -1 : c;
    }
  } else {
    return -1;
  }
}
function moonbitlang$core$builtin$$Compare$compare$19$(self, other) {
  const len = self.length;
  const _bind = $compare_int(len, other.length);
  if (_bind === 0) {
    let _tmp = 0;
    while (true) {
      const i = _tmp;
      if (i < len) {
        const order = $compare_int(self.charCodeAt(i), other.charCodeAt(i));
        if (order !== 0) {
          return order;
        }
        _tmp = i + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    return 0;
  } else {
    return _bind;
  }
}
function moonbitlang$core$builtin$$Show$output$16$(self, logger) {
  logger.method_table.method_0(logger.self, moonbitlang$core$int$$Int$to_string$46$inner(self, 10));
}
function moonbitlang$core$array$$ArrayView$iter$14$(self) {
  const i = { val: 0 };
  const _p = () => {
    if (i.val < (self.end - self.start | 0)) {
      const elem = self.buf[self.start + i.val | 0];
      i.val = i.val + 1 | 0;
      return elem;
    } else {
      return undefined;
    }
  };
  return _p;
}
function moonbitlang$core$array$$ArrayView$iter$16$(self) {
  const i = { val: 0 };
  const _p = () => {
    if (i.val < (self.end - self.start | 0)) {
      const elem = self.buf[self.start + i.val | 0];
      i.val = i.val + 1 | 0;
      return elem;
    } else {
      return undefined;
    }
  };
  return _p;
}
function moonbitlang$core$array$$Array$iter$14$(self) {
  return moonbitlang$core$array$$ArrayView$iter$14$({ buf: self, start: 0, end: self.length });
}
function moonbitlang$core$array$$Array$iter$16$(self) {
  return moonbitlang$core$array$$ArrayView$iter$16$({ buf: self, start: 0, end: self.length });
}
function moonbitlang$core$array$$ArrayView$at$16$(self, index) {
  if (index >= 0 && index < (self.end - self.start | 0)) {
    const _tmp = self.buf;
    const _tmp$2 = self.start + index | 0;
    $bound_check(_tmp, _tmp$2);
    return _tmp[_tmp$2];
  } else {
    return moonbitlang$core$builtin$$abort$16$(`index out of bounds: the len is from 0 to ${moonbitlang$core$builtin$$Show$to_string$38$(self.end - self.start | 0)} but the index is ${moonbitlang$core$builtin$$Show$to_string$38$(index)}`, "@moonbitlang/core/builtin:arrayview.mbt:124:5-126:6");
  }
}
function moonbitlang$core$option$$Option$map$55$(self, f) {
  if (self === undefined) {
    return undefined;
  } else {
    const _Some = self;
    const _t = _Some;
    return f(_t);
  }
}
function moonbitlang$core$array$$MutArrayView$at$14$(self, index) {
  if (index >= 0 && index < (self.end - self.start | 0)) {
    const _tmp = self.buf;
    const _tmp$2 = self.start + index | 0;
    $bound_check(_tmp, _tmp$2);
    return _tmp[_tmp$2];
  } else {
    return moonbitlang$core$builtin$$abort$14$(`index out of bounds: the len is from 0 to ${moonbitlang$core$builtin$$Show$to_string$38$(self.end - self.start | 0)} but the index is ${moonbitlang$core$builtin$$Show$to_string$38$(index)}`, "@moonbitlang/core/builtin:mutarrayview.mbt:97:5-99:6");
  }
}
function moonbitlang$core$array$$MutArrayView$at$15$(self, index) {
  if (index >= 0 && index < (self.end - self.start | 0)) {
    const _tmp = self.buf;
    const _tmp$2 = self.start + index | 0;
    $bound_check(_tmp, _tmp$2);
    return _tmp[_tmp$2];
  } else {
    return moonbitlang$core$builtin$$abort$15$(`index out of bounds: the len is from 0 to ${moonbitlang$core$builtin$$Show$to_string$38$(self.end - self.start | 0)} but the index is ${moonbitlang$core$builtin$$Show$to_string$38$(index)}`, "@moonbitlang/core/builtin:mutarrayview.mbt:97:5-99:6");
  }
}
function moonbitlang$core$array$$MutArrayView$at$16$(self, index) {
  if (index >= 0 && index < (self.end - self.start | 0)) {
    const _tmp = self.buf;
    const _tmp$2 = self.start + index | 0;
    $bound_check(_tmp, _tmp$2);
    return _tmp[_tmp$2];
  } else {
    return moonbitlang$core$builtin$$abort$16$(`index out of bounds: the len is from 0 to ${moonbitlang$core$builtin$$Show$to_string$38$(self.end - self.start | 0)} but the index is ${moonbitlang$core$builtin$$Show$to_string$38$(index)}`, "@moonbitlang/core/builtin:mutarrayview.mbt:97:5-99:6");
  }
}
function moonbitlang$core$array$$MutArrayView$set$14$(self, index, value) {
  if (index >= 0 && index < (self.end - self.start | 0)) {
    const _tmp = self.buf;
    const _tmp$2 = self.start + index | 0;
    $bound_check(_tmp, _tmp$2);
    _tmp[_tmp$2] = value;
    return;
  } else {
    moonbitlang$core$builtin$$abort$11$(`index out of bounds: the len is from 0 to ${moonbitlang$core$builtin$$Show$to_string$38$(self.end - self.start | 0)} but the index is ${moonbitlang$core$builtin$$Show$to_string$38$(index)}`, "@moonbitlang/core/builtin:mutarrayview.mbt:161:5-163:6");
    return;
  }
}
function moonbitlang$core$array$$MutArrayView$set$15$(self, index, value) {
  if (index >= 0 && index < (self.end - self.start | 0)) {
    const _tmp = self.buf;
    const _tmp$2 = self.start + index | 0;
    $bound_check(_tmp, _tmp$2);
    _tmp[_tmp$2] = value;
    return;
  } else {
    moonbitlang$core$builtin$$abort$11$(`index out of bounds: the len is from 0 to ${moonbitlang$core$builtin$$Show$to_string$38$(self.end - self.start | 0)} but the index is ${moonbitlang$core$builtin$$Show$to_string$38$(index)}`, "@moonbitlang/core/builtin:mutarrayview.mbt:161:5-163:6");
    return;
  }
}
function moonbitlang$core$array$$MutArrayView$set$16$(self, index, value) {
  if (index >= 0 && index < (self.end - self.start | 0)) {
    const _tmp = self.buf;
    const _tmp$2 = self.start + index | 0;
    $bound_check(_tmp, _tmp$2);
    _tmp[_tmp$2] = value;
    return;
  } else {
    moonbitlang$core$builtin$$abort$11$(`index out of bounds: the len is from 0 to ${moonbitlang$core$builtin$$Show$to_string$38$(self.end - self.start | 0)} but the index is ${moonbitlang$core$builtin$$Show$to_string$38$(index)}`, "@moonbitlang/core/builtin:mutarrayview.mbt:161:5-163:6");
    return;
  }
}
function moonbitlang$core$array$$Array$mut_view$46$inner$14$(self, start, end) {
  const len = self.length;
  let end$2;
  if (end === undefined) {
    end$2 = len;
  } else {
    const _Some = end;
    const _end = _Some;
    end$2 = _end < 0 ? len + _end | 0 : _end;
  }
  const start$2 = start < 0 ? len + start | 0 : start;
  return start$2 >= 0 && (start$2 <= end$2 && end$2 <= len) ? { buf: self, start: start$2, end: end$2 } : moonbitlang$core$builtin$$abort$9$("View index out of bounds", "@moonbitlang/core/builtin:mutarrayview.mbt:237:5-237:38");
}
function moonbitlang$core$array$$Array$mut_view$46$inner$15$(self, start, end) {
  const len = self.length;
  let end$2;
  if (end === undefined) {
    end$2 = len;
  } else {
    const _Some = end;
    const _end = _Some;
    end$2 = _end < 0 ? len + _end | 0 : _end;
  }
  const start$2 = start < 0 ? len + start | 0 : start;
  return start$2 >= 0 && (start$2 <= end$2 && end$2 <= len) ? { buf: self, start: start$2, end: end$2 } : moonbitlang$core$builtin$$abort$10$("View index out of bounds", "@moonbitlang/core/builtin:mutarrayview.mbt:237:5-237:38");
}
function moonbitlang$core$array$$Array$mut_view$46$inner$16$(self, start, end) {
  const len = self.length;
  let end$2;
  if (end === undefined) {
    end$2 = len;
  } else {
    const _Some = end;
    const _end = _Some;
    end$2 = _end < 0 ? len + _end | 0 : _end;
  }
  const start$2 = start < 0 ? len + start | 0 : start;
  return start$2 >= 0 && (start$2 <= end$2 && end$2 <= len) ? { buf: self, start: start$2, end: end$2 } : moonbitlang$core$builtin$$abort$17$("View index out of bounds", "@moonbitlang/core/builtin:mutarrayview.mbt:237:5-237:38");
}
function moonbitlang$core$array$$MutArrayView$mut_view$46$inner$14$(self, start, end) {
  const len = self.end - self.start | 0;
  let end$2;
  if (end === undefined) {
    end$2 = len;
  } else {
    const _Some = end;
    const _end = _Some;
    end$2 = _end < 0 ? len + _end | 0 : _end;
  }
  const start$2 = start < 0 ? len + start | 0 : start;
  return start$2 >= 0 && (start$2 <= end$2 && end$2 <= len) ? { buf: self.buf, start: self.start + start$2 | 0, end: (self.start + start$2 | 0) + (end$2 - start$2 | 0) | 0 } : moonbitlang$core$builtin$$abort$9$("View index out of bounds", "@moonbitlang/core/builtin:mutarrayview.mbt:286:5-286:38");
}
function moonbitlang$core$array$$MutArrayView$mut_view$46$inner$15$(self, start, end) {
  const len = self.end - self.start | 0;
  let end$2;
  if (end === undefined) {
    end$2 = len;
  } else {
    const _Some = end;
    const _end = _Some;
    end$2 = _end < 0 ? len + _end | 0 : _end;
  }
  const start$2 = start < 0 ? len + start | 0 : start;
  return start$2 >= 0 && (start$2 <= end$2 && end$2 <= len) ? { buf: self.buf, start: self.start + start$2 | 0, end: (self.start + start$2 | 0) + (end$2 - start$2 | 0) | 0 } : moonbitlang$core$builtin$$abort$10$("View index out of bounds", "@moonbitlang/core/builtin:mutarrayview.mbt:286:5-286:38");
}
function moonbitlang$core$array$$MutArrayView$mut_view$46$inner$16$(self, start, end) {
  const len = self.end - self.start | 0;
  let end$2;
  if (end === undefined) {
    end$2 = len;
  } else {
    const _Some = end;
    const _end = _Some;
    end$2 = _end < 0 ? len + _end | 0 : _end;
  }
  const start$2 = start < 0 ? len + start | 0 : start;
  return start$2 >= 0 && (start$2 <= end$2 && end$2 <= len) ? { buf: self.buf, start: self.start + start$2 | 0, end: (self.start + start$2 | 0) + (end$2 - start$2 | 0) | 0 } : moonbitlang$core$builtin$$abort$17$("View index out of bounds", "@moonbitlang/core/builtin:mutarrayview.mbt:286:5-286:38");
}
function moonbitlang$core$int$$Int$next_power_of_two(self) {
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
function moonbitlang$core$builtin$$Map$new$46$inner$56$(capacity) {
  const capacity$2 = moonbitlang$core$int$$Int$next_power_of_two(capacity);
  const _bind = capacity$2 - 1 | 0;
  const _bind$2 = (Math.imul(capacity$2, 13) | 0) / 16 | 0;
  const _bind$3 = $make_array_len_and_init(capacity$2, undefined);
  const _bind$4 = undefined;
  return { entries: _bind$3, size: 0, capacity: capacity$2, capacity_mask: _bind, grow_at: _bind$2, head: _bind$4, tail: -1 };
}
function moonbitlang$core$builtin$$Map$new$46$inner$57$(capacity) {
  const capacity$2 = moonbitlang$core$int$$Int$next_power_of_two(capacity);
  const _bind = capacity$2 - 1 | 0;
  const _bind$2 = (Math.imul(capacity$2, 13) | 0) / 16 | 0;
  const _bind$3 = $make_array_len_and_init(capacity$2, undefined);
  const _bind$4 = undefined;
  return { entries: _bind$3, size: 0, capacity: capacity$2, capacity_mask: _bind, grow_at: _bind$2, head: _bind$4, tail: -1 };
}
function moonbitlang$core$builtin$$Map$add_entry_to_tail$56$(self, idx, entry) {
  const _bind = self.tail;
  if (_bind === -1) {
    self.head = entry;
  } else {
    const _tmp = self.entries;
    $bound_check(_tmp, _bind);
    const _p = _tmp[_bind];
    let _tmp$2;
    if (_p === undefined) {
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
function moonbitlang$core$builtin$$Map$add_entry_to_tail$57$(self, idx, entry) {
  const _bind = self.tail;
  if (_bind === -1) {
    self.head = entry;
  } else {
    const _tmp = self.entries;
    $bound_check(_tmp, _bind);
    const _p = _tmp[_bind];
    let _tmp$2;
    if (_p === undefined) {
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
function moonbitlang$core$builtin$$Map$set_entry$56$(self, entry, new_idx) {
  const _tmp = self.entries;
  $bound_check(_tmp, new_idx);
  _tmp[new_idx] = entry;
  const _bind = entry.next;
  if (_bind === undefined) {
    self.tail = new_idx;
    return;
  } else {
    const _Some = _bind;
    const _next = _Some;
    _next.prev = new_idx;
    return;
  }
}
function moonbitlang$core$builtin$$Map$set_entry$57$(self, entry, new_idx) {
  const _tmp = self.entries;
  $bound_check(_tmp, new_idx);
  _tmp[new_idx] = entry;
  const _bind = entry.next;
  if (_bind === undefined) {
    self.tail = new_idx;
    return;
  } else {
    const _Some = _bind;
    const _next = _Some;
    _next.prev = new_idx;
    return;
  }
}
function moonbitlang$core$builtin$$Map$push_away$56$(self, idx, entry) {
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
    if (_bind === undefined) {
      entry$2.psl = psl;
      moonbitlang$core$builtin$$Map$set_entry$56$(self, entry$2, idx$2);
      break;
    } else {
      const _Some = _bind;
      const _curr_entry = _Some;
      if (psl > _curr_entry.psl) {
        entry$2.psl = psl;
        moonbitlang$core$builtin$$Map$set_entry$56$(self, entry$2, idx$2);
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
function moonbitlang$core$builtin$$Map$push_away$57$(self, idx, entry) {
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
    if (_bind === undefined) {
      entry$2.psl = psl;
      moonbitlang$core$builtin$$Map$set_entry$57$(self, entry$2, idx$2);
      break;
    } else {
      const _Some = _bind;
      const _curr_entry = _Some;
      if (psl > _curr_entry.psl) {
        entry$2.psl = psl;
        moonbitlang$core$builtin$$Map$set_entry$57$(self, entry$2, idx$2);
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
function moonbitlang$core$builtin$$Map$set_with_hash$56$(self, key, value, hash) {
  if (self.size >= self.grow_at) {
    moonbitlang$core$builtin$$Map$grow$56$(self);
  }
  let _bind;
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const psl = _tmp;
    const idx = _tmp$2;
    const _tmp$3 = self.entries;
    $bound_check(_tmp$3, idx);
    const _bind$2 = _tmp$3[idx];
    if (_bind$2 === undefined) {
      _bind = { _0: idx, _1: psl };
      break;
    } else {
      const _Some = _bind$2;
      const _curr_entry = _Some;
      if (_curr_entry.hash === hash && _curr_entry.key === key) {
        _curr_entry.value = value;
        return undefined;
      }
      if (psl > _curr_entry.psl) {
        moonbitlang$core$builtin$$Map$push_away$56$(self, idx, _curr_entry);
        _bind = { _0: idx, _1: psl };
        break;
      }
      _tmp = psl + 1 | 0;
      _tmp$2 = idx + 1 & self.capacity_mask;
      continue;
    }
  }
  const _idx = _bind._0;
  const _psl = _bind._1;
  const _bind$2 = self.tail;
  const _bind$3 = undefined;
  const entry = { prev: _bind$2, next: _bind$3, psl: _psl, hash: hash, key: key, value: value };
  moonbitlang$core$builtin$$Map$add_entry_to_tail$56$(self, _idx, entry);
}
function moonbitlang$core$builtin$$Map$set_with_hash$57$(self, key, value, hash) {
  if (self.size >= self.grow_at) {
    moonbitlang$core$builtin$$Map$grow$57$(self);
  }
  let _bind;
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const psl = _tmp;
    const idx = _tmp$2;
    const _tmp$3 = self.entries;
    $bound_check(_tmp$3, idx);
    const _bind$2 = _tmp$3[idx];
    if (_bind$2 === undefined) {
      _bind = { _0: idx, _1: psl };
      break;
    } else {
      const _Some = _bind$2;
      const _curr_entry = _Some;
      if (_curr_entry.hash === hash && _curr_entry.key === key) {
        _curr_entry.value = value;
        return undefined;
      }
      if (psl > _curr_entry.psl) {
        moonbitlang$core$builtin$$Map$push_away$57$(self, idx, _curr_entry);
        _bind = { _0: idx, _1: psl };
        break;
      }
      _tmp = psl + 1 | 0;
      _tmp$2 = idx + 1 & self.capacity_mask;
      continue;
    }
  }
  const _idx = _bind._0;
  const _psl = _bind._1;
  const _bind$2 = self.tail;
  const _bind$3 = undefined;
  const entry = { prev: _bind$2, next: _bind$3, psl: _psl, hash: hash, key: key, value: value };
  moonbitlang$core$builtin$$Map$add_entry_to_tail$57$(self, _idx, entry);
}
function moonbitlang$core$builtin$$Map$grow$56$(self) {
  const old_head = self.head;
  const new_capacity = self.capacity << 1;
  self.entries = $make_array_len_and_init(new_capacity, undefined);
  self.capacity = new_capacity;
  self.capacity_mask = new_capacity - 1 | 0;
  const _p = self.capacity;
  self.grow_at = (Math.imul(_p, 13) | 0) / 16 | 0;
  self.size = 0;
  self.head = undefined;
  self.tail = -1;
  let _tmp = old_head;
  while (true) {
    const _param = _tmp;
    if (_param === undefined) {
      return;
    } else {
      const _Some = _param;
      const _x = _Some;
      const _next = _x.next;
      const _key = _x.key;
      const _value = _x.value;
      const _hash = _x.hash;
      moonbitlang$core$builtin$$Map$set_with_hash$56$(self, _key, _value, _hash);
      _tmp = _next;
      continue;
    }
  }
}
function moonbitlang$core$builtin$$Map$grow$57$(self) {
  const old_head = self.head;
  const new_capacity = self.capacity << 1;
  self.entries = $make_array_len_and_init(new_capacity, undefined);
  self.capacity = new_capacity;
  self.capacity_mask = new_capacity - 1 | 0;
  const _p = self.capacity;
  self.grow_at = (Math.imul(_p, 13) | 0) / 16 | 0;
  self.size = 0;
  self.head = undefined;
  self.tail = -1;
  let _tmp = old_head;
  while (true) {
    const _param = _tmp;
    if (_param === undefined) {
      return;
    } else {
      const _Some = _param;
      const _x = _Some;
      const _next = _x.next;
      const _key = _x.key;
      const _value = _x.value;
      const _hash = _x.hash;
      moonbitlang$core$builtin$$Map$set_with_hash$57$(self, _key, _value, _hash);
      _tmp = _next;
      continue;
    }
  }
}
function moonbitlang$core$builtin$$Map$set$56$(self, key, value) {
  moonbitlang$core$builtin$$Map$set_with_hash$56$(self, key, value, moonbitlang$core$builtin$$Hash$hash$37$(key));
}
function moonbitlang$core$builtin$$Map$set$57$(self, key, value) {
  moonbitlang$core$builtin$$Map$set_with_hash$57$(self, key, value, moonbitlang$core$builtin$$Hash$hash$37$(key));
}
function moonbitlang$core$builtin$$Map$from_array$56$(arr) {
  const length = arr.end - arr.start | 0;
  let capacity = moonbitlang$core$int$$Int$next_power_of_two(length);
  const _p = capacity;
  if (length > ((Math.imul(_p, 13) | 0) / 16 | 0)) {
    capacity = Math.imul(capacity, 2) | 0;
  }
  const m = moonbitlang$core$builtin$$Map$new$46$inner$56$(capacity);
  const _len = arr.end - arr.start | 0;
  let _tmp = 0;
  while (true) {
    const _i = _tmp;
    if (_i < _len) {
      const e = arr.buf[arr.start + _i | 0];
      moonbitlang$core$builtin$$Map$set$56$(m, e._0, e._1);
      _tmp = _i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return m;
}
function moonbitlang$core$builtin$$Map$from_array$57$(arr) {
  const length = arr.end - arr.start | 0;
  let capacity = moonbitlang$core$int$$Int$next_power_of_two(length);
  const _p = capacity;
  if (length > ((Math.imul(_p, 13) | 0) / 16 | 0)) {
    capacity = Math.imul(capacity, 2) | 0;
  }
  const m = moonbitlang$core$builtin$$Map$new$46$inner$57$(capacity);
  const _len = arr.end - arr.start | 0;
  let _tmp = 0;
  while (true) {
    const _i = _tmp;
    if (_i < _len) {
      const e = arr.buf[arr.start + _i | 0];
      moonbitlang$core$builtin$$Map$set$57$(m, e._0, e._1);
      _tmp = _i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return m;
}
function moonbitlang$core$builtin$$Map$get$57$(self, key) {
  const hash = moonbitlang$core$builtin$$Hash$hash$37$(key);
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const i = _tmp;
    const idx = _tmp$2;
    const _tmp$3 = self.entries;
    $bound_check(_tmp$3, idx);
    const _bind = _tmp$3[idx];
    if (_bind === undefined) {
      return undefined;
    } else {
      const _Some = _bind;
      const _entry = _Some;
      if (_entry.hash === hash && _entry.key === key) {
        return _entry.value;
      }
      if (i > _entry.psl) {
        return undefined;
      }
      _tmp = i + 1 | 0;
      _tmp$2 = idx + 1 & self.capacity_mask;
      continue;
    }
  }
}
function moonbitlang$core$builtin$$Map$get$56$(self, key) {
  const hash = moonbitlang$core$builtin$$Hash$hash$37$(key);
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const i = _tmp;
    const idx = _tmp$2;
    const _tmp$3 = self.entries;
    $bound_check(_tmp$3, idx);
    const _bind = _tmp$3[idx];
    if (_bind === undefined) {
      return undefined;
    } else {
      const _Some = _bind;
      const _entry = _Some;
      if (_entry.hash === hash && _entry.key === key) {
        return _entry.value;
      }
      if (i > _entry.psl) {
        return undefined;
      }
      _tmp = i + 1 | 0;
      _tmp$2 = idx + 1 & self.capacity_mask;
      continue;
    }
  }
}
function moonbitlang$core$builtin$$Map$iter$56$(self) {
  const curr_entry = { val: self.head };
  const _p = () => {
    const _bind = curr_entry.val;
    if (_bind === undefined) {
      return undefined;
    } else {
      const _Some = _bind;
      const _x = _Some;
      const _key = _x.key;
      const _value = _x.value;
      const _next = _x.next;
      curr_entry.val = _next;
      return { _0: _key, _1: _value };
    }
  };
  return _p;
}
function moonbitlang$core$builtin$$Map$iter$57$(self) {
  const curr_entry = { val: self.head };
  const _p = () => {
    const _bind = curr_entry.val;
    if (_bind === undefined) {
      return undefined;
    } else {
      const _Some = _bind;
      const _x = _Some;
      const _key = _x.key;
      const _value = _x.value;
      const _next = _x.next;
      curr_entry.val = _next;
      return { _0: _key, _1: _value };
    }
  };
  return _p;
}
function moonbitlang$core$builtin$$Map$iter2$57$(self) {
  return moonbitlang$core$builtin$$Map$iter$57$(self);
}
function moonbitlang$core$builtin$$Map$iter2$56$(self) {
  return moonbitlang$core$builtin$$Map$iter$56$(self);
}
function moonbitlang$core$builtin$$ToJson$to_json$16$(self) {
  const _p = self + 0;
  const _p$2 = undefined;
  return new $64$moonbitlang$47$core$47$builtin$46$Json$Number(_p, _p$2);
}
function moonbitlang$core$builtin$$MyInt64$extend_i32_u(value) {
  return { hi: 0, lo: value };
}
function moonbitlang$core$uint64$$UInt64$extend_uint(value) {
  return moonbitlang$core$builtin$$MyInt64$extend_i32_u(value);
}
function moonbitlang$core$double$$Double$convert_uint64(value) {
  return moonbitlang$core$builtin$$MyInt64$convert_to_double_u(value);
}
function moonbitlang$core$int64$$Int64$reinterpret_as_double(self) {
  return moonbitlang$core$builtin$$MyInt64$reinterpret_as_double(self);
}
function moonbitlang$core$builtin$$ToJson$to_json$58$(self) {
  const _p = new Array(self.length);
  const _p$2 = self.length;
  let _tmp = 0;
  while (true) {
    const _p$3 = _tmp;
    if (_p$3 < _p$2) {
      const _p$4 = self[_p$3];
      _p[_p$3] = new $64$moonbitlang$47$core$47$builtin$46$Json$String(_p$4);
      _tmp = _p$3 + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return new $64$moonbitlang$47$core$47$builtin$46$Json$Array(_p);
}
function moonbitlang$core$builtin$$ToJson$to_json$59$(self) {
  const _p = new Array(self.length);
  const _p$2 = self.length;
  let _tmp = 0;
  while (true) {
    const _p$3 = _tmp;
    if (_p$3 < _p$2) {
      const _p$4 = self[_p$3];
      _p[_p$3] = moonbitlang$core$builtin$$ToJson$to_json$30$(_p$4);
      _tmp = _p$3 + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return new $64$moonbitlang$47$core$47$builtin$46$Json$Array(_p);
}
function moonbitlang$core$builtin$$ToJson$to_json$60$(self) {
  const _p = new Array(self.length);
  const _p$2 = self.length;
  let _tmp = 0;
  while (true) {
    const _p$3 = _tmp;
    if (_p$3 < _p$2) {
      const _p$4 = self[_p$3];
      _p[_p$3] = moonbitlang$core$builtin$$ToJson$to_json$16$(_p$4);
      _tmp = _p$3 + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return new $64$moonbitlang$47$core$47$builtin$46$Json$Array(_p);
}
function moonbitlang$core$builtin$$ToJson$to_json$61$(self) {
  const _p = new Array(self.length);
  const _p$2 = self.length;
  let _tmp = 0;
  while (true) {
    const _p$3 = _tmp;
    if (_p$3 < _p$2) {
      const _p$4 = self[_p$3];
      _p[_p$3] = moonbitlang$core$builtin$$ToJson$to_json$7$(_p$4);
      _tmp = _p$3 + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return new $64$moonbitlang$47$core$47$builtin$46$Json$Array(_p);
}
function moonbitlang$core$builtin$$ToJson$to_json$62$(self) {
  const object = moonbitlang$core$builtin$$Map$new$46$inner$56$(self.capacity);
  const _it = moonbitlang$core$builtin$$Map$iter2$57$(self);
  while (true) {
    const _bind = moonbitlang$core$builtin$$Iter2$next$57$(_it);
    if (_bind === undefined) {
      break;
    } else {
      const _Some = _bind;
      const _x = _Some;
      const _k = _x._0;
      const _v = _x._1;
      moonbitlang$core$builtin$$Map$set$56$(object, _k, moonbitlang$core$builtin$$ToJson$to_json$16$(_v));
      continue;
    }
  }
  return new $64$moonbitlang$47$core$47$builtin$46$Json$Object(object);
}
function moonbitlang$core$builtin$$Iter$filter$16$(self, f) {
  return () => {
    while (true) {
      const _bind = moonbitlang$core$builtin$$Iter$next$16$(self);
      if (_bind === undefined) {
        return undefined;
      } else {
        const _Some = _bind;
        const _x = _Some;
        if (f(_x)) {
          return _x;
        }
        continue;
      }
    }
  };
}
function moonbitlang$core$builtin$$Iter2$next$57$(self) {
  return moonbitlang$core$builtin$$Iter$next$51$(self);
}
function moonbitlang$core$builtin$$Iter2$next$56$(self) {
  return moonbitlang$core$builtin$$Iter$next$50$(self);
}
function moonbitlang$core$int$$Int$to_char(self) {
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
function moonbitlang$core$uint64$$UInt64$to_int(self) {
  const _p = self;
  return _p.lo;
}
function moonbitlang$core$uint64$$UInt64$to_byte(self) {
  return moonbitlang$core$uint64$$UInt64$to_int(self) & 255;
}
function moonbitlang$core$byte$$Byte$to_int64(self) {
  return moonbitlang$core$int$$Int$to_int64(self);
}
function moonbitlang$core$builtin$$Neg$neg$63$(self) {
  return self.lo === 0 ? { hi: ~self.hi + 1 | 0, lo: 0 } : { hi: ~self.hi, lo: ~self.lo + 1 | 0 };
}
function moonbitlang$core$builtin$$MyInt64$add_hi_lo(self, bhi, blo) {
  const _ahi = self.hi;
  const _alo = self.lo;
  const lo = _alo + blo | 0;
  const s = lo >> 31;
  const as_ = _alo >> 31;
  const bs = blo >> 31;
  const c = (as_ & bs | ~s & (as_ ^ bs)) & 1;
  const hi = (_ahi + bhi | 0) + c | 0;
  return { hi: hi, lo: lo };
}
function moonbitlang$core$builtin$$Add$add$63$(self, other) {
  return moonbitlang$core$builtin$$MyInt64$add_hi_lo(self, other.hi, other.lo);
}
function moonbitlang$core$builtin$$Sub$sub$63$(self, other) {
  return other.lo === 0 ? { hi: self.hi - other.hi | 0, lo: self.lo } : moonbitlang$core$builtin$$MyInt64$add_hi_lo(self, ~other.hi, ~other.lo + 1 | 0);
}
function moonbitlang$core$builtin$$Mul$mul$63$(self, other) {
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
  return { hi: c48$5 << 16 | c32$8, lo: c16$5 << 16 | c00$2 };
}
function moonbitlang$core$builtin$$try_get_int64_wasm_helper() {
  if (moonbitlang$core$builtin$$wasm_helper_cache.tried) {
    const _bind = moonbitlang$core$builtin$$wasm_helper_cache.exports;
    return !(_bind === undefined);
  }
  moonbitlang$core$builtin$$wasm_helper_cache.tried = true;
  moonbitlang$core$builtin$$wasm_helper_cache.exports = moonbitlang$core$builtin$$try_init_wasm_helper();
  const _bind = moonbitlang$core$builtin$$wasm_helper_cache.exports;
  return !(_bind === undefined);
}
function moonbitlang$core$builtin$$Div$div$63$(self, other) {
  if (!(other.hi === 0 && other.lo === 0)) {
    if (!moonbitlang$core$builtin$$try_get_int64_wasm_helper()) {
      return moonbitlang$core$builtin$$MyInt64$div_bigint(self, other);
    }
    const _bind = moonbitlang$core$builtin$$wasm_helper_cache.exports;
    if (_bind === undefined) {
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
      return { hi: hi, lo: lo };
    }
  } else {
    return $panic();
  }
}
function moonbitlang$core$builtin$$MyInt64$div_u(self, other) {
  if (!(other.hi === 0 && other.lo === 0)) {
    if (!moonbitlang$core$builtin$$try_get_int64_wasm_helper()) {
      return moonbitlang$core$builtin$$MyInt64$div_u_bigint(self, other);
    }
    const _bind = moonbitlang$core$builtin$$wasm_helper_cache.exports;
    if (_bind === undefined) {
      return $panic();
    } else {
      const _Some = _bind;
      const _exports = _Some;
      const _ahi = self.hi;
      const _alo = self.lo;
      const _bhi = other.hi;
      const _blo = other.lo;
      const _func = _exports.div_u;
      const lo = _func(_alo, _ahi, _blo, _bhi);
      const _func$2 = _exports.get_high;
      const hi = _func$2();
      return { hi: hi, lo: lo };
    }
  } else {
    return $panic();
  }
}
function moonbitlang$core$builtin$$MyInt64$land(self, other) {
  return { hi: self.hi & other.hi, lo: self.lo & other.lo };
}
function moonbitlang$core$builtin$$MyInt64$lor(self, other) {
  return { hi: self.hi | other.hi, lo: self.lo | other.lo };
}
function moonbitlang$core$builtin$$MyInt64$lsl(self, shift) {
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
      return { hi: hi$2, lo: lo$2 };
    } else {
      return { hi: self.lo << (shift$2 - 32 | 0), lo: 0 };
    }
  }
}
function moonbitlang$core$builtin$$MyInt64$lsr(self, shift) {
  const shift$2 = shift & 63;
  return shift$2 === 0 ? self : shift$2 < 32 ? { hi: self.hi >>> shift$2 | 0, lo: self.lo >>> shift$2 | self.hi << (32 - shift$2 | 0) } : { hi: 0, lo: self.hi >>> (shift$2 - 32 | 0) | 0 };
}
function moonbitlang$core$builtin$$MyInt64$asr(self, shift) {
  const shift$2 = shift & 63;
  return shift$2 === 0 ? self : shift$2 < 32 ? { hi: self.hi >> shift$2, lo: self.lo >>> shift$2 | self.hi << (32 - shift$2 | 0) } : { hi: self.hi >> 31, lo: self.hi >> (shift$2 - 32 | 0) };
}
function moonbitlang$core$builtin$$Neg$neg$35$(self) {
  return moonbitlang$core$builtin$$Neg$neg$63$(self);
}
function moonbitlang$core$builtin$$Add$add$35$(self, other) {
  return moonbitlang$core$builtin$$Add$add$63$(self, other);
}
function moonbitlang$core$builtin$$Sub$sub$35$(self, other) {
  return moonbitlang$core$builtin$$Sub$sub$63$(self, other);
}
function moonbitlang$core$builtin$$Mul$mul$35$(self, other) {
  return moonbitlang$core$builtin$$Mul$mul$63$(self, other);
}
function moonbitlang$core$builtin$$Div$div$35$(self, other) {
  return moonbitlang$core$builtin$$Div$div$63$(self, other);
}
function moonbitlang$core$builtin$$BitAnd$land$35$(self, other) {
  return moonbitlang$core$builtin$$MyInt64$land(self, other);
}
function moonbitlang$core$builtin$$BitOr$lor$35$(self, other) {
  return moonbitlang$core$builtin$$MyInt64$lor(self, other);
}
function moonbitlang$core$builtin$$Shr$shr$35$(self, other) {
  return moonbitlang$core$builtin$$MyInt64$asr(self, other);
}
function moonbitlang$core$builtin$$Shl$shl$35$(self, other) {
  return moonbitlang$core$builtin$$MyInt64$lsl(self, other);
}
function moonbitlang$core$builtin$$Eq$equal$35$(self, other) {
  const _p = self;
  const _p$2 = other;
  return _p.hi === _p$2.hi && _p.lo === _p$2.lo;
}
function moonbitlang$core$builtin$$Compare$compare$35$(self, other) {
  return moonbitlang$core$builtin$$MyInt64$compare(self, other);
}
function moonbitlang$core$int64$$Int64$to_int(self) {
  const _p = self;
  return _p.lo;
}
function moonbitlang$core$double$$Double$convert_int64(value) {
  return moonbitlang$core$builtin$$MyInt64$convert_to_double(value);
}
function moonbitlang$core$int64$$Int64$to_double(self) {
  return moonbitlang$core$double$$Double$convert_int64(self);
}
function moonbitlang$core$builtin$$Add$add$6$(self, other) {
  return moonbitlang$core$builtin$$Add$add$63$(self, other);
}
function moonbitlang$core$builtin$$Sub$sub$6$(self, other) {
  return moonbitlang$core$builtin$$Sub$sub$63$(self, other);
}
function moonbitlang$core$builtin$$Mul$mul$6$(self, other) {
  return moonbitlang$core$builtin$$Mul$mul$63$(self, other);
}
function moonbitlang$core$builtin$$Div$div$6$(self, other) {
  return moonbitlang$core$builtin$$MyInt64$div_u(self, other);
}
function moonbitlang$core$builtin$$Compare$compare$6$(self, other) {
  return moonbitlang$core$builtin$$MyInt64$compare_u(self, other);
}
function moonbitlang$core$builtin$$Eq$equal$6$(self, other) {
  const _p = self;
  const _p$2 = other;
  return _p.hi === _p$2.hi && _p.lo === _p$2.lo;
}
function moonbitlang$core$builtin$$BitAnd$land$6$(self, other) {
  return moonbitlang$core$builtin$$MyInt64$land(self, other);
}
function moonbitlang$core$builtin$$Shl$shl$6$(self, shift) {
  return moonbitlang$core$builtin$$MyInt64$lsl(self, shift);
}
function moonbitlang$core$builtin$$Shr$shr$6$(self, shift) {
  return moonbitlang$core$builtin$$MyInt64$lsr(self, shift);
}
function moonbitlang$core$uint64$$UInt64$clz(self) {
  const _p = self;
  return _p.hi !== 0 ? Math.clz32(_p.hi) : 32 + Math.clz32(_p.lo) | 0;
}
function moonbitlang$core$builtin$$Hasher$combine_string(self, value) {
  const _end2373 = value.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _end2373) {
      moonbitlang$core$builtin$$Hasher$combine_uint(self, value.charCodeAt(i));
      _tmp = i + 1 | 0;
      continue;
    } else {
      return;
    }
  }
}
function moonbitlang$core$builtin$$Hash$hash_combine$19$(self, hasher) {
  moonbitlang$core$builtin$$Hasher$combine_string(hasher, self);
}
function moonbitlang$core$builtin$$Hash$hash_combine$16$(self, hasher) {
  moonbitlang$core$builtin$$Hasher$combine_int(hasher, self);
}
function moonbitlang$core$array$$FixedArray$blit_to$46$inner$22$(self, dst, len, src_offset, dst_offset) {
  if (dst_offset >= 0 && (src_offset >= 0 && ((dst_offset + len | 0) <= dst.length && (src_offset + len | 0) <= self.length))) {
    moonbitlang$core$array$$FixedArray$unsafe_blit$22$(dst, dst_offset, self, src_offset, len);
    return;
  } else {
    moonbitlang$core$builtin$$abort$11$(`bounds check failed: dst_offset = ${moonbitlang$core$builtin$$Show$to_string$38$(dst_offset)}, src_offset = ${moonbitlang$core$builtin$$Show$to_string$38$(src_offset)}, len = ${moonbitlang$core$builtin$$Show$to_string$38$(len)}, dst.length = ${moonbitlang$core$builtin$$Show$to_string$38$(dst.length)}, self.length = ${moonbitlang$core$builtin$$Show$to_string$38$(self.length)}`, "@moonbitlang/core/builtin:fixedarray_block.mbt:115:5-117:6");
    return;
  }
}
function moonbitlang$core$array$$FixedArray$blit_to$46$inner$23$(self, dst, len, src_offset, dst_offset) {
  if (dst_offset >= 0 && (src_offset >= 0 && ((dst_offset + len | 0) <= dst.length && (src_offset + len | 0) <= self.length))) {
    moonbitlang$core$array$$FixedArray$unsafe_blit$23$(dst, dst_offset, self, src_offset, len);
    return;
  } else {
    moonbitlang$core$builtin$$abort$11$(`bounds check failed: dst_offset = ${moonbitlang$core$builtin$$Show$to_string$38$(dst_offset)}, src_offset = ${moonbitlang$core$builtin$$Show$to_string$38$(src_offset)}, len = ${moonbitlang$core$builtin$$Show$to_string$38$(len)}, dst.length = ${moonbitlang$core$builtin$$Show$to_string$38$(dst.length)}, self.length = ${moonbitlang$core$builtin$$Show$to_string$38$(self.length)}`, "@moonbitlang/core/builtin:fixedarray_block.mbt:115:5-117:6");
    return;
  }
}
function moonbitlang$core$array$$FixedArray$blit_to$46$inner$24$(self, dst, len, src_offset, dst_offset) {
  if (dst_offset >= 0 && (src_offset >= 0 && ((dst_offset + len | 0) <= dst.length && (src_offset + len | 0) <= self.length))) {
    moonbitlang$core$array$$FixedArray$unsafe_blit$24$(dst, dst_offset, self, src_offset, len);
    return;
  } else {
    moonbitlang$core$builtin$$abort$11$(`bounds check failed: dst_offset = ${moonbitlang$core$builtin$$Show$to_string$38$(dst_offset)}, src_offset = ${moonbitlang$core$builtin$$Show$to_string$38$(src_offset)}, len = ${moonbitlang$core$builtin$$Show$to_string$38$(len)}, dst.length = ${moonbitlang$core$builtin$$Show$to_string$38$(dst.length)}, self.length = ${moonbitlang$core$builtin$$Show$to_string$38$(self.length)}`, "@moonbitlang/core/builtin:fixedarray_block.mbt:115:5-117:6");
    return;
  }
}
function moonbitlang$core$array$$FixedArray$blit_to$46$inner$25$(self, dst, len, src_offset, dst_offset) {
  if (dst_offset >= 0 && (src_offset >= 0 && ((dst_offset + len | 0) <= dst.length && (src_offset + len | 0) <= self.length))) {
    moonbitlang$core$array$$FixedArray$unsafe_blit$25$(dst, dst_offset, self, src_offset, len);
    return;
  } else {
    moonbitlang$core$builtin$$abort$11$(`bounds check failed: dst_offset = ${moonbitlang$core$builtin$$Show$to_string$38$(dst_offset)}, src_offset = ${moonbitlang$core$builtin$$Show$to_string$38$(src_offset)}, len = ${moonbitlang$core$builtin$$Show$to_string$38$(len)}, dst.length = ${moonbitlang$core$builtin$$Show$to_string$38$(dst.length)}, self.length = ${moonbitlang$core$builtin$$Show$to_string$38$(self.length)}`, "@moonbitlang/core/builtin:fixedarray_block.mbt:115:5-117:6");
    return;
  }
}
function moonbitlang$core$array$$FixedArray$blit_to$46$inner$26$(self, dst, len, src_offset, dst_offset) {
  if (dst_offset >= 0 && (src_offset >= 0 && ((dst_offset + len | 0) <= dst.length && (src_offset + len | 0) <= self.length))) {
    moonbitlang$core$array$$FixedArray$unsafe_blit$26$(dst, dst_offset, self, src_offset, len);
    return;
  } else {
    moonbitlang$core$builtin$$abort$11$(`bounds check failed: dst_offset = ${moonbitlang$core$builtin$$Show$to_string$38$(dst_offset)}, src_offset = ${moonbitlang$core$builtin$$Show$to_string$38$(src_offset)}, len = ${moonbitlang$core$builtin$$Show$to_string$38$(len)}, dst.length = ${moonbitlang$core$builtin$$Show$to_string$38$(dst.length)}, self.length = ${moonbitlang$core$builtin$$Show$to_string$38$(self.length)}`, "@moonbitlang/core/builtin:fixedarray_block.mbt:115:5-117:6");
    return;
  }
}
function moonbitlang$core$array$$FixedArray$blit_to$46$inner$27$(self, dst, len, src_offset, dst_offset) {
  if (dst_offset >= 0 && (src_offset >= 0 && ((dst_offset + len | 0) <= dst.length && (src_offset + len | 0) <= self.length))) {
    moonbitlang$core$array$$FixedArray$unsafe_blit$27$(dst, dst_offset, self, src_offset, len);
    return;
  } else {
    moonbitlang$core$builtin$$abort$11$(`bounds check failed: dst_offset = ${moonbitlang$core$builtin$$Show$to_string$38$(dst_offset)}, src_offset = ${moonbitlang$core$builtin$$Show$to_string$38$(src_offset)}, len = ${moonbitlang$core$builtin$$Show$to_string$38$(len)}, dst.length = ${moonbitlang$core$builtin$$Show$to_string$38$(dst.length)}, self.length = ${moonbitlang$core$builtin$$Show$to_string$38$(self.length)}`, "@moonbitlang/core/builtin:fixedarray_block.mbt:115:5-117:6");
    return;
  }
}
function moonbitlang$core$array$$FixedArray$blit_to$46$inner$28$(self, dst, len, src_offset, dst_offset) {
  if (dst_offset >= 0 && (src_offset >= 0 && ((dst_offset + len | 0) <= dst.length && (src_offset + len | 0) <= self.length))) {
    moonbitlang$core$array$$FixedArray$unsafe_blit$28$(dst, dst_offset, self, src_offset, len);
    return;
  } else {
    moonbitlang$core$builtin$$abort$11$(`bounds check failed: dst_offset = ${moonbitlang$core$builtin$$Show$to_string$38$(dst_offset)}, src_offset = ${moonbitlang$core$builtin$$Show$to_string$38$(src_offset)}, len = ${moonbitlang$core$builtin$$Show$to_string$38$(len)}, dst.length = ${moonbitlang$core$builtin$$Show$to_string$38$(dst.length)}, self.length = ${moonbitlang$core$builtin$$Show$to_string$38$(self.length)}`, "@moonbitlang/core/builtin:fixedarray_block.mbt:115:5-117:6");
    return;
  }
}
function moonbitlang$core$array$$FixedArray$copy$22$(self) {
  return moonbitlang$core$builtin$$JSArray$copy(self);
}
function moonbitlang$core$array$$FixedArray$copy$23$(self) {
  return moonbitlang$core$builtin$$JSArray$copy(self);
}
function moonbitlang$core$array$$FixedArray$copy$24$(self) {
  return moonbitlang$core$builtin$$JSArray$copy(self);
}
function moonbitlang$core$array$$FixedArray$copy$25$(self) {
  return moonbitlang$core$builtin$$JSArray$copy(self);
}
function moonbitlang$core$array$$FixedArray$copy$26$(self) {
  return moonbitlang$core$builtin$$JSArray$copy(self);
}
function moonbitlang$core$array$$FixedArray$copy$27$(self) {
  return moonbitlang$core$builtin$$JSArray$copy(self);
}
function moonbitlang$core$array$$FixedArray$copy$28$(self) {
  return moonbitlang$core$builtin$$JSArray$copy(self);
}
function moonbitlang$core$double$$Double$to_int(self) {
  return self !== self ? 0 : self >= 2147483647 ? 2147483647 : self <= -2147483648 ? -2147483648 : self | 0;
}
function moonbitlang$core$char$$Char$to_hex(char) {
  const code = char;
  return code >= 0 && code <= 255 ? moonbitlang$core$byte$$Byte$to_hex(code & 255) : code <= 65535 ? `${moonbitlang$core$byte$$Byte$to_hex(code >> 8 & 255)}${moonbitlang$core$byte$$Byte$to_hex(code & 255)}` : `${moonbitlang$core$byte$$Byte$to_hex(code >> 16 & 255)}${moonbitlang$core$byte$$Byte$to_hex(code >> 8 & 255)}${moonbitlang$core$byte$$Byte$to_hex(code & 255)}`;
}
function moonbitlang$core$char$$Char$is_control(self) {
  return self >= 0 && self <= 31 ? true : self >= 127 && self <= 159;
}
function moonbitlang$core$char$$Char$is_printable(self) {
  if (moonbitlang$core$char$$Char$is_control(self)) {
    return false;
  }
  const self$2 = self;
  _L: {
    _L$2: {
      if (self$2 >= 57344 && self$2 <= 63743) {
        break _L$2;
      } else {
        if (self$2 >= 983040 && self$2 <= 1048573) {
          break _L$2;
        } else {
          if (self$2 >= 1048576 && self$2 <= 1114109) {
            break _L$2;
          }
        }
      }
      break _L;
    }
    return false;
  }
  _L$2: {
    _L$3: {
      if (self$2 === 173) {
        break _L$3;
      } else {
        if (self$2 >= 1536 && self$2 <= 1541) {
          break _L$3;
        } else {
          if (self$2 === 1564) {
            break _L$3;
          } else {
            if (self$2 === 1757) {
              break _L$3;
            } else {
              if (self$2 === 1807) {
                break _L$3;
              } else {
                if (self$2 >= 2192 && self$2 <= 2193) {
                  break _L$3;
                } else {
                  if (self$2 === 2274) {
                    break _L$3;
                  } else {
                    if (self$2 === 6158) {
                      break _L$3;
                    } else {
                      if (self$2 >= 8203 && self$2 <= 8207) {
                        break _L$3;
                      } else {
                        if (self$2 >= 8234 && self$2 <= 8238) {
                          break _L$3;
                        } else {
                          if (self$2 >= 8288 && self$2 <= 8292) {
                            break _L$3;
                          } else {
                            if (self$2 >= 8294 && self$2 <= 8303) {
                              break _L$3;
                            } else {
                              if (self$2 === 65279) {
                                break _L$3;
                              } else {
                                if (self$2 >= 65529 && self$2 <= 65531) {
                                  break _L$3;
                                } else {
                                  if (self$2 === 69821) {
                                    break _L$3;
                                  } else {
                                    if (self$2 === 69837) {
                                      break _L$3;
                                    } else {
                                      if (self$2 >= 78896 && self$2 <= 78911) {
                                        break _L$3;
                                      } else {
                                        if (self$2 >= 113824 && self$2 <= 113827) {
                                          break _L$3;
                                        } else {
                                          if (self$2 >= 119155 && self$2 <= 119162) {
                                            break _L$3;
                                          } else {
                                            if (self$2 === 917505) {
                                              break _L$3;
                                            } else {
                                              if (self$2 >= 917536 && self$2 <= 917631) {
                                                break _L$3;
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      break _L$2;
    }
    return false;
  }
  if (55296 <= self$2 && self$2 <= 57343) {
    return false;
  }
  if (self$2 === 8232 || self$2 === 8233) {
    return false;
  }
  _L$3: {
    _L$4: {
      if (self$2 >= 64976 && self$2 <= 65007) {
        break _L$4;
      } else {
        if (self$2 >= 65534 && self$2 <= 65535) {
          break _L$4;
        } else {
          if (self$2 >= 131070 && self$2 <= 131071) {
            break _L$4;
          } else {
            if (self$2 >= 196606 && self$2 <= 196607) {
              break _L$4;
            } else {
              if (self$2 >= 262142 && self$2 <= 262143) {
                break _L$4;
              } else {
                if (self$2 >= 327678 && self$2 <= 327679) {
                  break _L$4;
                } else {
                  if (self$2 >= 393214 && self$2 <= 393215) {
                    break _L$4;
                  } else {
                    if (self$2 >= 458750 && self$2 <= 458751) {
                      break _L$4;
                    } else {
                      if (self$2 >= 524286 && self$2 <= 524287) {
                        break _L$4;
                      } else {
                        if (self$2 >= 589822 && self$2 <= 589823) {
                          break _L$4;
                        } else {
                          if (self$2 >= 655358 && self$2 <= 655359) {
                            break _L$4;
                          } else {
                            if (self$2 >= 720894 && self$2 <= 720895) {
                              break _L$4;
                            } else {
                              if (self$2 >= 786430 && self$2 <= 786431) {
                                break _L$4;
                              } else {
                                if (self$2 >= 851966 && self$2 <= 851967) {
                                  break _L$4;
                                } else {
                                  if (self$2 >= 917502 && self$2 <= 917503) {
                                    break _L$4;
                                  } else {
                                    if (self$2 >= 983038 && self$2 <= 983039) {
                                      break _L$4;
                                    } else {
                                      if (self$2 >= 1048574 && self$2 <= 1048575) {
                                        break _L$4;
                                      } else {
                                        if (self$2 >= 1114110 && self$2 <= 1114111) {
                                          break _L$4;
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      break _L$3;
    }
    return false;
  }
  return true;
}
function moonbitlang$core$builtin$$Show$output$45$(self, logger) {
  logger.method_table.method_3(logger.self, 39);
  _L: {
    _L$2: {
      if (self === 39) {
        break _L$2;
      } else {
        if (self === 92) {
          break _L$2;
        } else {
          if (self === 10) {
            logger.method_table.method_0(logger.self, "\\n");
          } else {
            if (self === 13) {
              logger.method_table.method_0(logger.self, "\\r");
            } else {
              if (self === 8) {
                logger.method_table.method_0(logger.self, "\\b");
              } else {
                if (self === 9) {
                  logger.method_table.method_0(logger.self, "\\t");
                } else {
                  if (self >= 32 && self <= 126) {
                    logger.method_table.method_3(logger.self, self);
                  } else {
                    if (!moonbitlang$core$char$$Char$is_printable(self)) {
                      logger.method_table.method_0(logger.self, "\\u{");
                      logger.method_table.method_0(logger.self, moonbitlang$core$char$$Char$to_hex(self));
                      logger.method_table.method_3(logger.self, 125);
                    } else {
                      logger.method_table.method_3(logger.self, self);
                    }
                  }
                }
              }
            }
          }
        }
      }
      break _L;
    }
    logger.method_table.method_3(logger.self, 92);
    logger.method_table.method_3(logger.self, self);
  }
  logger.method_table.method_3(logger.self, 39);
}
function moonbitlang$core$builtin$$Show$output$64$(self, logger) {
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
      _L$3: while (true) {
        if (_cursor < _end) {
          _L$4: {
            _L$5: {
              const _p = _cursor;
              const next_char = _data.charCodeAt(_p);
              _cursor = _cursor + 1 | 0;
              if (next_char < 55296) {
                if (next_char < 47) {
                  break _L$5;
                } else {
                  if (next_char > 47) {
                    break _L$5;
                  } else {
                    _L$6: while (true) {
                      tag_0 = _cursor;
                      if (_cursor < _end) {
                        _L$7: {
                          const _p$2 = _cursor;
                          const next_char$2 = _data.charCodeAt(_p$2);
                          _cursor = _cursor + 1 | 0;
                          if (next_char$2 < 55296) {
                            if (next_char$2 < 47) {
                              break _L$7;
                            } else {
                              if (next_char$2 > 47) {
                                break _L$7;
                              } else {
                                while (true) {
                                  if (_cursor < _end) {
                                    _L$8: {
                                      const _p$3 = _cursor;
                                      const next_char$3 = _data.charCodeAt(_p$3);
                                      _cursor = _cursor + 1 | 0;
                                      if (next_char$3 < 56319) {
                                        if (next_char$3 < 55296) {
                                          break _L$8;
                                        } else {
                                          if (_cursor < _end) {
                                            const _p$4 = _cursor;
                                            const next_char$4 = _data.charCodeAt(_p$4);
                                            _cursor = _cursor + 1 | 0;
                                            if (next_char$4 < 56320) {
                                              break _L$2;
                                            } else {
                                              if (next_char$4 > 65535) {
                                                break _L$2;
                                              } else {
                                                continue;
                                              }
                                            }
                                          } else {
                                            break _L$2;
                                          }
                                        }
                                      } else {
                                        if (next_char$3 > 56319) {
                                          if (next_char$3 < 65536) {
                                            break _L$8;
                                          } else {
                                            break _L$2;
                                          }
                                        } else {
                                          if (_cursor < _end) {
                                            const _p$4 = _cursor;
                                            const next_char$4 = _data.charCodeAt(_p$4);
                                            _cursor = _cursor + 1 | 0;
                                            if (next_char$4 < 56320) {
                                              break _L$2;
                                            } else {
                                              if (next_char$4 > 57343) {
                                                break _L$2;
                                              } else {
                                                continue;
                                              }
                                            }
                                          } else {
                                            break _L$2;
                                          }
                                        }
                                      }
                                    }
                                    continue;
                                  } else {
                                    match_tag_saver_0 = tag_0;
                                    accept_state = 0;
                                    match_end = _cursor;
                                    break _L$2;
                                  }
                                }
                              }
                            }
                          } else {
                            if (next_char$2 > 56318) {
                              if (next_char$2 < 57344) {
                                if (_cursor < _end) {
                                  const _p$3 = _cursor;
                                  const next_char$3 = _data.charCodeAt(_p$3);
                                  _cursor = _cursor + 1 | 0;
                                  if (next_char$3 < 56320) {
                                    break _L$2;
                                  } else {
                                    if (next_char$3 > 57343) {
                                      break _L$2;
                                    } else {
                                      continue;
                                    }
                                  }
                                } else {
                                  break _L$2;
                                }
                              } else {
                                if (next_char$2 > 65535) {
                                  break _L$2;
                                } else {
                                  break _L$7;
                                }
                              }
                            } else {
                              if (_cursor < _end) {
                                const _p$3 = _cursor;
                                const next_char$3 = _data.charCodeAt(_p$3);
                                _cursor = _cursor + 1 | 0;
                                if (next_char$3 < 56320) {
                                  break _L$2;
                                } else {
                                  if (next_char$3 > 65535) {
                                    break _L$2;
                                  } else {
                                    continue;
                                  }
                                }
                              } else {
                                break _L$2;
                              }
                            }
                          }
                        }
                        continue;
                      } else {
                        break _L$2;
                      }
                    }
                  }
                }
              } else {
                if (next_char > 56318) {
                  if (next_char < 57344) {
                    if (_cursor < _end) {
                      const _p$2 = _cursor;
                      const next_char$2 = _data.charCodeAt(_p$2);
                      _cursor = _cursor + 1 | 0;
                      if (next_char$2 < 56320) {
                        break _L$2;
                      } else {
                        if (next_char$2 > 57343) {
                          break _L$2;
                        } else {
                          continue;
                        }
                      }
                    } else {
                      break _L$2;
                    }
                  } else {
                    if (next_char > 65535) {
                      break _L$2;
                    } else {
                      break _L$5;
                    }
                  }
                } else {
                  if (_cursor < _end) {
                    const _p$2 = _cursor;
                    const next_char$2 = _data.charCodeAt(_p$2);
                    _cursor = _cursor + 1 | 0;
                    if (next_char$2 < 56320) {
                      break _L$2;
                    } else {
                      if (next_char$2 > 65535) {
                        break _L$2;
                      } else {
                        continue;
                      }
                    }
                  } else {
                    break _L$2;
                  }
                }
              }
              break _L$4;
            }
            continue;
          }
        } else {
          break _L$2;
        }
      }
      break _L;
    }
    if (accept_state === 0) {
      let package_name;
      let _try_err;
      _L$3: {
        _L$4: {
          const _bind$2 = moonbitlang$core$string$$String$sub(_data, match_tag_saver_0 + 1 | 0, match_end);
          if (_bind$2.$tag === 1) {
            const _ok = _bind$2;
            package_name = _ok._0;
          } else {
            const _err = _bind$2;
            const _tmp = _err._0;
            _try_err = _tmp;
            break _L$4;
          }
          break _L$3;
        }
        package_name = $panic();
      }
      let module_name;
      let _try_err$2;
      _L$4: {
        _L$5: {
          const _bind$2 = moonbitlang$core$string$$String$sub(_data, _start, match_tag_saver_0);
          if (_bind$2.$tag === 1) {
            const _ok = _bind$2;
            module_name = _ok._0;
          } else {
            const _err = _bind$2;
            const _tmp = _err._0;
            _try_err$2 = _tmp;
            break _L$5;
          }
          break _L$4;
        }
        module_name = $panic();
      }
      _bind = { _0: module_name, _1: package_name };
    } else {
      _bind = { _0: pkg, _1: undefined };
    }
  }
  const _module_name = _bind._0;
  const _package_name = _bind._1;
  if (_package_name === undefined) {
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
function moonbitlang$core$builtin$$Show$output$39$(self, logger) {
  moonbitlang$core$builtin$$Show$output$64$(moonbitlang$core$builtin$$SourceLocRepr$parse(self), logger);
}
function moonbitlang$core$array$$Array$unsafe_truncate_to_length$15$(self, new_len) {
  moonbitlang$core$builtin$$JSArray$set_length(self, new_len);
}
function moonbitlang$core$array$$Array$unsafe_pop$46$(self) {
  return moonbitlang$core$builtin$$JSArray$pop(self);
}
function moonbitlang$core$array$$Array$unsafe_pop$49$(self) {
  return moonbitlang$core$builtin$$JSArray$pop(self);
}
function moonbitlang$core$array$$Array$pop$46$(self) {
  if (self.length === 0) {
    return undefined;
  } else {
    const v = moonbitlang$core$array$$Array$unsafe_pop$46$(self);
    return v;
  }
}
function moonbitlang$core$array$$Array$pop$49$(self) {
  if (self.length === 0) {
    return undefined;
  } else {
    const v = moonbitlang$core$array$$Array$unsafe_pop$49$(self);
    return v;
  }
}
function moonbitlang$core$array$$Array$copy$30$(self) {
  return moonbitlang$core$builtin$$JSArray$copy(self);
}
function moonbitlang$core$array$$Array$copy$16$(self) {
  return moonbitlang$core$builtin$$JSArray$copy(self);
}
function moonbitlang$core$array$$MutArrayView$swap$14$(arr, i, j) {
  const temp = moonbitlang$core$array$$MutArrayView$at$14$(arr, i);
  moonbitlang$core$array$$MutArrayView$set$14$(arr, i, moonbitlang$core$array$$MutArrayView$at$14$(arr, j));
  moonbitlang$core$array$$MutArrayView$set$14$(arr, j, temp);
}
function moonbitlang$core$array$$MutArrayView$swap$15$(arr, i, j) {
  const temp = moonbitlang$core$array$$MutArrayView$at$15$(arr, i);
  moonbitlang$core$array$$MutArrayView$set$15$(arr, i, moonbitlang$core$array$$MutArrayView$at$15$(arr, j));
  moonbitlang$core$array$$MutArrayView$set$15$(arr, j, temp);
}
function moonbitlang$core$array$$MutArrayView$swap$16$(arr, i, j) {
  const temp = moonbitlang$core$array$$MutArrayView$at$16$(arr, i);
  moonbitlang$core$array$$MutArrayView$set$16$(arr, i, moonbitlang$core$array$$MutArrayView$at$16$(arr, j));
  moonbitlang$core$array$$MutArrayView$set$16$(arr, j, temp);
}
function moonbitlang$core$array$$MutArrayView$slice$14$(arr, start, end) {
  return moonbitlang$core$array$$MutArrayView$mut_view$46$inner$14$(arr, start, end);
}
function moonbitlang$core$array$$MutArrayView$slice$15$(arr, start, end) {
  return moonbitlang$core$array$$MutArrayView$mut_view$46$inner$15$(arr, start, end);
}
function moonbitlang$core$array$$MutArrayView$slice$16$(arr, start, end) {
  return moonbitlang$core$array$$MutArrayView$mut_view$46$inner$16$(arr, start, end);
}
function moonbitlang$core$array$$MutArrayView$rev_in_place$14$(arr) {
  const len = arr.end - arr.start | 0;
  const mid_len = len / 2 | 0;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < mid_len) {
      const j = (len - i | 0) - 1 | 0;
      const temp = moonbitlang$core$array$$MutArrayView$at$14$(arr, i);
      moonbitlang$core$array$$MutArrayView$set$14$(arr, i, moonbitlang$core$array$$MutArrayView$at$14$(arr, j));
      moonbitlang$core$array$$MutArrayView$set$14$(arr, j, temp);
      _tmp = i + 1 | 0;
      continue;
    } else {
      return;
    }
  }
}
function moonbitlang$core$array$$MutArrayView$rev_in_place$15$(arr) {
  const len = arr.end - arr.start | 0;
  const mid_len = len / 2 | 0;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < mid_len) {
      const j = (len - i | 0) - 1 | 0;
      const temp = moonbitlang$core$array$$MutArrayView$at$15$(arr, i);
      moonbitlang$core$array$$MutArrayView$set$15$(arr, i, moonbitlang$core$array$$MutArrayView$at$15$(arr, j));
      moonbitlang$core$array$$MutArrayView$set$15$(arr, j, temp);
      _tmp = i + 1 | 0;
      continue;
    } else {
      return;
    }
  }
}
function moonbitlang$core$array$$MutArrayView$rev_in_place$16$(arr) {
  const len = arr.end - arr.start | 0;
  const mid_len = len / 2 | 0;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < mid_len) {
      const j = (len - i | 0) - 1 | 0;
      const temp = moonbitlang$core$array$$MutArrayView$at$16$(arr, i);
      moonbitlang$core$array$$MutArrayView$set$16$(arr, i, moonbitlang$core$array$$MutArrayView$at$16$(arr, j));
      moonbitlang$core$array$$MutArrayView$set$16$(arr, j, temp);
      _tmp = i + 1 | 0;
      continue;
    } else {
      return;
    }
  }
}
function moonbitlang$core$builtin$$fixed_get_limit(len) {
  let len$2 = len;
  let limit = 0;
  while (true) {
    if (len$2 > 0) {
      len$2 = len$2 / 2 | 0;
      limit = limit + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return limit;
}
function moonbitlang$core$builtin$$fixed_bubble_sort$16$(arr) {
  const _end679 = arr.end - arr.start | 0;
  let _tmp = 1;
  while (true) {
    const i = _tmp;
    if (i < _end679) {
      let _tmp$2 = i;
      while (true) {
        const j = _tmp$2;
        if (j > 0 && moonbitlang$core$array$$MutArrayView$at$16$(arr, j - 1 | 0) > moonbitlang$core$array$$MutArrayView$at$16$(arr, j)) {
          moonbitlang$core$array$$MutArrayView$swap$16$(arr, j, j - 1 | 0);
          _tmp$2 = j - 1 | 0;
          continue;
        } else {
          break;
        }
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      return;
    }
  }
}
function moonbitlang$core$builtin$$fixed_choose_pivot$46$sort_2$47$1304(_env, a, b) {
  const swaps = _env._1;
  const arr = _env._0;
  if (moonbitlang$core$array$$MutArrayView$at$16$(arr, a) > moonbitlang$core$array$$MutArrayView$at$16$(arr, b)) {
    moonbitlang$core$array$$MutArrayView$swap$16$(arr, a, b);
    swaps.val = swaps.val + 1 | 0;
    return;
  } else {
    return;
  }
}
function moonbitlang$core$builtin$$fixed_choose_pivot$46$sort_3$47$1305(_env, a, b, c) {
  moonbitlang$core$builtin$$fixed_choose_pivot$46$sort_2$47$1304(_env, a, b);
  moonbitlang$core$builtin$$fixed_choose_pivot$46$sort_2$47$1304(_env, b, c);
  moonbitlang$core$builtin$$fixed_choose_pivot$46$sort_2$47$1304(_env, a, b);
}
function moonbitlang$core$builtin$$fixed_choose_pivot$16$(arr) {
  const len = arr.end - arr.start | 0;
  const swaps = { val: 0 };
  const b = Math.imul(len / 4 | 0, 2) | 0;
  if (len >= 8) {
    const a = Math.imul(len / 4 | 0, 1) | 0;
    const c = Math.imul(len / 4 | 0, 3) | 0;
    const _env = { _0: arr, _1: swaps };
    if (len > 50) {
      moonbitlang$core$builtin$$fixed_choose_pivot$46$sort_3$47$1305(_env, a - 1 | 0, a, a + 1 | 0);
      moonbitlang$core$builtin$$fixed_choose_pivot$46$sort_3$47$1305(_env, b - 1 | 0, b, b + 1 | 0);
      moonbitlang$core$builtin$$fixed_choose_pivot$46$sort_3$47$1305(_env, c - 1 | 0, c, c + 1 | 0);
    }
    moonbitlang$core$builtin$$fixed_choose_pivot$46$sort_3$47$1305(_env, a, b, c);
  }
  if (swaps.val === 12) {
    moonbitlang$core$array$$MutArrayView$rev_in_place$16$(arr);
    return { _0: (len - b | 0) - 1 | 0, _1: true };
  } else {
    return { _0: b, _1: swaps.val === 0 };
  }
}
function moonbitlang$core$builtin$$fixed_sift_down$16$(arr, index) {
  let index$2 = index;
  const len = arr.end - arr.start | 0;
  let child = (Math.imul(index$2, 2) | 0) + 1 | 0;
  while (true) {
    if (child < len) {
      if ((child + 1 | 0) < len && moonbitlang$core$array$$MutArrayView$at$16$(arr, child) < moonbitlang$core$array$$MutArrayView$at$16$(arr, child + 1 | 0)) {
        child = child + 1 | 0;
      }
      if (moonbitlang$core$array$$MutArrayView$at$16$(arr, index$2) >= moonbitlang$core$array$$MutArrayView$at$16$(arr, child)) {
        return undefined;
      }
      moonbitlang$core$array$$MutArrayView$swap$16$(arr, index$2, child);
      index$2 = child;
      child = (Math.imul(index$2, 2) | 0) + 1 | 0;
      continue;
    } else {
      return;
    }
  }
}
function moonbitlang$core$builtin$$fixed_heap_sort$16$(arr) {
  const len = arr.end - arr.start | 0;
  let _tmp = (len / 2 | 0) - 1 | 0;
  while (true) {
    const i = _tmp;
    if (i >= 0) {
      moonbitlang$core$builtin$$fixed_sift_down$16$(arr, i);
      _tmp = i - 1 | 0;
      continue;
    } else {
      break;
    }
  }
  let _tmp$2 = len - 1 | 0;
  while (true) {
    const i = _tmp$2;
    if (i > 0) {
      moonbitlang$core$array$$MutArrayView$swap$16$(arr, 0, i);
      moonbitlang$core$builtin$$fixed_sift_down$16$(moonbitlang$core$array$$MutArrayView$slice$16$(arr, 0, i), 0);
      _tmp$2 = i - 1 | 0;
      continue;
    } else {
      return;
    }
  }
}
function moonbitlang$core$builtin$$fixed_partition$16$(arr, pivot_index) {
  moonbitlang$core$array$$MutArrayView$swap$16$(arr, pivot_index, (arr.end - arr.start | 0) - 1 | 0);
  const pivot = moonbitlang$core$array$$MutArrayView$at$16$(arr, (arr.end - arr.start | 0) - 1 | 0);
  let i = 0;
  let partitioned = true;
  const _end671 = (arr.end - arr.start | 0) - 1 | 0;
  let _tmp = 0;
  while (true) {
    const j = _tmp;
    if (j < _end671) {
      if (moonbitlang$core$array$$MutArrayView$at$16$(arr, j) < pivot) {
        if (i !== j) {
          moonbitlang$core$array$$MutArrayView$swap$16$(arr, i, j);
          partitioned = false;
        }
        i = i + 1 | 0;
      }
      _tmp = j + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  moonbitlang$core$array$$MutArrayView$swap$16$(arr, i, (arr.end - arr.start | 0) - 1 | 0);
  return { _0: i, _1: partitioned };
}
function moonbitlang$core$builtin$$fixed_try_bubble_sort$16$(arr) {
  let tries = 0;
  const _end688 = arr.end - arr.start | 0;
  let _tmp = 1;
  while (true) {
    const i = _tmp;
    if (i < _end688) {
      let sorted = true;
      let _tmp$2 = i;
      while (true) {
        const j = _tmp$2;
        if (j > 0 && moonbitlang$core$array$$MutArrayView$at$16$(arr, j - 1 | 0) > moonbitlang$core$array$$MutArrayView$at$16$(arr, j)) {
          sorted = false;
          moonbitlang$core$array$$MutArrayView$swap$16$(arr, j, j - 1 | 0);
          _tmp$2 = j - 1 | 0;
          continue;
        } else {
          break;
        }
      }
      if (!sorted) {
        tries = tries + 1 | 0;
        if (tries > 8) {
          return false;
        }
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return true;
}
function moonbitlang$core$builtin$$fixed_quick_sort$16$(arr, pred, limit) {
  let limit$2 = limit;
  let arr$2 = arr;
  let pred$2 = pred;
  let was_partitioned = true;
  let balanced = true;
  while (true) {
    const _p = arr$2;
    const len = _p.end - _p.start | 0;
    if (len <= 16) {
      if (len >= 2) {
        moonbitlang$core$builtin$$fixed_bubble_sort$16$(arr$2);
      }
      return undefined;
    }
    if (limit$2 === 0) {
      moonbitlang$core$builtin$$fixed_heap_sort$16$(arr$2);
      return undefined;
    }
    const _bind = moonbitlang$core$builtin$$fixed_choose_pivot$16$(arr$2);
    const _pivot_index = _bind._0;
    const _likely_sorted = _bind._1;
    if (was_partitioned && (balanced && _likely_sorted)) {
      if (moonbitlang$core$builtin$$fixed_try_bubble_sort$16$(arr$2)) {
        return undefined;
      }
    }
    const _bind$2 = moonbitlang$core$builtin$$fixed_partition$16$(arr$2, _pivot_index);
    const _pivot = _bind$2._0;
    const _partitioned = _bind$2._1;
    was_partitioned = _partitioned;
    const _p$2 = len - _pivot | 0;
    balanced = (_pivot > _p$2 ? _p$2 : _pivot) >= (len / 8 | 0);
    if (!balanced) {
      limit$2 = limit$2 - 1 | 0;
    }
    const _bind$3 = pred$2;
    if (_bind$3 === undefined) {
    } else {
      const _Some = _bind$3;
      const _pred = _Some;
      if (_pred === moonbitlang$core$array$$MutArrayView$at$16$(arr$2, _pivot)) {
        let i = _pivot;
        while (true) {
          if (i < len && _pred === moonbitlang$core$array$$MutArrayView$at$16$(arr$2, i)) {
            i = i + 1 | 0;
            continue;
          } else {
            break;
          }
        }
        arr$2 = moonbitlang$core$array$$MutArrayView$slice$16$(arr$2, i, len);
        continue;
      }
    }
    const left = moonbitlang$core$array$$MutArrayView$slice$16$(arr$2, 0, _pivot);
    const right = moonbitlang$core$array$$MutArrayView$slice$16$(arr$2, _pivot + 1 | 0, len);
    if ((left.end - left.start | 0) < (right.end - right.start | 0)) {
      moonbitlang$core$builtin$$fixed_quick_sort$16$(left, pred$2, limit$2);
      pred$2 = moonbitlang$core$array$$MutArrayView$at$16$(arr$2, _pivot);
      arr$2 = right;
    } else {
      moonbitlang$core$builtin$$fixed_quick_sort$16$(right, moonbitlang$core$array$$MutArrayView$at$16$(arr$2, _pivot), limit$2);
      arr$2 = left;
    }
    continue;
  }
}
function moonbitlang$core$array$$MutArrayView$sort$16$(self) {
  moonbitlang$core$builtin$$fixed_quick_sort$16$(self, undefined, moonbitlang$core$builtin$$fixed_get_limit(self.end - self.start | 0));
}
function moonbitlang$core$builtin$$fixed_bubble_sort_by$14$(arr, cmp) {
  const _end538 = arr.end - arr.start | 0;
  let _tmp = 1;
  while (true) {
    const i = _tmp;
    if (i < _end538) {
      let _tmp$2 = i;
      while (true) {
        const j = _tmp$2;
        if (j > 0 && cmp(moonbitlang$core$array$$MutArrayView$at$14$(arr, j - 1 | 0), moonbitlang$core$array$$MutArrayView$at$14$(arr, j)) > 0) {
          moonbitlang$core$array$$MutArrayView$swap$14$(arr, j, j - 1 | 0);
          _tmp$2 = j - 1 | 0;
          continue;
        } else {
          break;
        }
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      return;
    }
  }
}
function moonbitlang$core$builtin$$fixed_bubble_sort_by$15$(arr, cmp) {
  const _end538 = arr.end - arr.start | 0;
  let _tmp = 1;
  while (true) {
    const i = _tmp;
    if (i < _end538) {
      let _tmp$2 = i;
      while (true) {
        const j = _tmp$2;
        if (j > 0 && cmp(moonbitlang$core$array$$MutArrayView$at$15$(arr, j - 1 | 0), moonbitlang$core$array$$MutArrayView$at$15$(arr, j)) > 0) {
          moonbitlang$core$array$$MutArrayView$swap$15$(arr, j, j - 1 | 0);
          _tmp$2 = j - 1 | 0;
          continue;
        } else {
          break;
        }
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      return;
    }
  }
}
function moonbitlang$core$builtin$$fixed_choose_pivot_by$46$sort_2$47$1394(_env, a, b) {
  const arr = _env._2;
  const swaps = _env._1;
  const cmp = _env._0;
  if (cmp(moonbitlang$core$array$$MutArrayView$at$14$(arr, a), moonbitlang$core$array$$MutArrayView$at$14$(arr, b)) > 0) {
    moonbitlang$core$array$$MutArrayView$swap$14$(arr, a, b);
    swaps.val = swaps.val + 1 | 0;
    return;
  } else {
    return;
  }
}
function moonbitlang$core$builtin$$fixed_choose_pivot_by$46$sort_3$47$1395(_env, a, b, c) {
  moonbitlang$core$builtin$$fixed_choose_pivot_by$46$sort_2$47$1394(_env, a, b);
  moonbitlang$core$builtin$$fixed_choose_pivot_by$46$sort_2$47$1394(_env, b, c);
  moonbitlang$core$builtin$$fixed_choose_pivot_by$46$sort_2$47$1394(_env, a, b);
}
function moonbitlang$core$builtin$$fixed_choose_pivot_by$14$(arr, cmp) {
  const len = arr.end - arr.start | 0;
  const swaps = { val: 0 };
  const b = Math.imul(len / 4 | 0, 2) | 0;
  if (len >= 8) {
    const a = Math.imul(len / 4 | 0, 1) | 0;
    const c = Math.imul(len / 4 | 0, 3) | 0;
    const _env = { _0: cmp, _1: swaps, _2: arr };
    if (len > 50) {
      moonbitlang$core$builtin$$fixed_choose_pivot_by$46$sort_3$47$1395(_env, a - 1 | 0, a, a + 1 | 0);
      moonbitlang$core$builtin$$fixed_choose_pivot_by$46$sort_3$47$1395(_env, b - 1 | 0, b, b + 1 | 0);
      moonbitlang$core$builtin$$fixed_choose_pivot_by$46$sort_3$47$1395(_env, c - 1 | 0, c, c + 1 | 0);
    }
    moonbitlang$core$builtin$$fixed_choose_pivot_by$46$sort_3$47$1395(_env, a, b, c);
  }
  if (swaps.val === 12) {
    moonbitlang$core$array$$MutArrayView$rev_in_place$14$(arr);
    return { _0: (len - b | 0) - 1 | 0, _1: true };
  } else {
    return { _0: b, _1: swaps.val === 0 };
  }
}
function moonbitlang$core$builtin$$fixed_choose_pivot_by$46$sort_2$47$1414(_env, a, b) {
  const arr = _env._2;
  const swaps = _env._1;
  const cmp = _env._0;
  if (cmp(moonbitlang$core$array$$MutArrayView$at$15$(arr, a), moonbitlang$core$array$$MutArrayView$at$15$(arr, b)) > 0) {
    moonbitlang$core$array$$MutArrayView$swap$15$(arr, a, b);
    swaps.val = swaps.val + 1 | 0;
    return;
  } else {
    return;
  }
}
function moonbitlang$core$builtin$$fixed_choose_pivot_by$46$sort_3$47$1415(_env, a, b, c) {
  moonbitlang$core$builtin$$fixed_choose_pivot_by$46$sort_2$47$1414(_env, a, b);
  moonbitlang$core$builtin$$fixed_choose_pivot_by$46$sort_2$47$1414(_env, b, c);
  moonbitlang$core$builtin$$fixed_choose_pivot_by$46$sort_2$47$1414(_env, a, b);
}
function moonbitlang$core$builtin$$fixed_choose_pivot_by$15$(arr, cmp) {
  const len = arr.end - arr.start | 0;
  const swaps = { val: 0 };
  const b = Math.imul(len / 4 | 0, 2) | 0;
  if (len >= 8) {
    const a = Math.imul(len / 4 | 0, 1) | 0;
    const c = Math.imul(len / 4 | 0, 3) | 0;
    const _env = { _0: cmp, _1: swaps, _2: arr };
    if (len > 50) {
      moonbitlang$core$builtin$$fixed_choose_pivot_by$46$sort_3$47$1415(_env, a - 1 | 0, a, a + 1 | 0);
      moonbitlang$core$builtin$$fixed_choose_pivot_by$46$sort_3$47$1415(_env, b - 1 | 0, b, b + 1 | 0);
      moonbitlang$core$builtin$$fixed_choose_pivot_by$46$sort_3$47$1415(_env, c - 1 | 0, c, c + 1 | 0);
    }
    moonbitlang$core$builtin$$fixed_choose_pivot_by$46$sort_3$47$1415(_env, a, b, c);
  }
  if (swaps.val === 12) {
    moonbitlang$core$array$$MutArrayView$rev_in_place$15$(arr);
    return { _0: (len - b | 0) - 1 | 0, _1: true };
  } else {
    return { _0: b, _1: swaps.val === 0 };
  }
}
function moonbitlang$core$builtin$$fixed_sift_down_by$14$(arr, index, cmp) {
  let index$2 = index;
  const len = arr.end - arr.start | 0;
  let child = (Math.imul(index$2, 2) | 0) + 1 | 0;
  while (true) {
    if (child < len) {
      if ((child + 1 | 0) < len && cmp(moonbitlang$core$array$$MutArrayView$at$14$(arr, child), moonbitlang$core$array$$MutArrayView$at$14$(arr, child + 1 | 0)) < 0) {
        child = child + 1 | 0;
      }
      if (cmp(moonbitlang$core$array$$MutArrayView$at$14$(arr, index$2), moonbitlang$core$array$$MutArrayView$at$14$(arr, child)) >= 0) {
        return undefined;
      }
      moonbitlang$core$array$$MutArrayView$swap$14$(arr, index$2, child);
      index$2 = child;
      child = (Math.imul(index$2, 2) | 0) + 1 | 0;
      continue;
    } else {
      return;
    }
  }
}
function moonbitlang$core$builtin$$fixed_sift_down_by$15$(arr, index, cmp) {
  let index$2 = index;
  const len = arr.end - arr.start | 0;
  let child = (Math.imul(index$2, 2) | 0) + 1 | 0;
  while (true) {
    if (child < len) {
      if ((child + 1 | 0) < len && cmp(moonbitlang$core$array$$MutArrayView$at$15$(arr, child), moonbitlang$core$array$$MutArrayView$at$15$(arr, child + 1 | 0)) < 0) {
        child = child + 1 | 0;
      }
      if (cmp(moonbitlang$core$array$$MutArrayView$at$15$(arr, index$2), moonbitlang$core$array$$MutArrayView$at$15$(arr, child)) >= 0) {
        return undefined;
      }
      moonbitlang$core$array$$MutArrayView$swap$15$(arr, index$2, child);
      index$2 = child;
      child = (Math.imul(index$2, 2) | 0) + 1 | 0;
      continue;
    } else {
      return;
    }
  }
}
function moonbitlang$core$builtin$$fixed_heap_sort_by$14$(arr, cmp) {
  const len = arr.end - arr.start | 0;
  let _tmp = (len / 2 | 0) - 1 | 0;
  while (true) {
    const i = _tmp;
    if (i >= 0) {
      moonbitlang$core$builtin$$fixed_sift_down_by$14$(arr, i, cmp);
      _tmp = i - 1 | 0;
      continue;
    } else {
      break;
    }
  }
  let _tmp$2 = len - 1 | 0;
  while (true) {
    const i = _tmp$2;
    if (i > 0) {
      moonbitlang$core$array$$MutArrayView$swap$14$(arr, 0, i);
      moonbitlang$core$builtin$$fixed_sift_down_by$14$(moonbitlang$core$array$$MutArrayView$slice$14$(arr, 0, i), 0, cmp);
      _tmp$2 = i - 1 | 0;
      continue;
    } else {
      return;
    }
  }
}
function moonbitlang$core$builtin$$fixed_heap_sort_by$15$(arr, cmp) {
  const len = arr.end - arr.start | 0;
  let _tmp = (len / 2 | 0) - 1 | 0;
  while (true) {
    const i = _tmp;
    if (i >= 0) {
      moonbitlang$core$builtin$$fixed_sift_down_by$15$(arr, i, cmp);
      _tmp = i - 1 | 0;
      continue;
    } else {
      break;
    }
  }
  let _tmp$2 = len - 1 | 0;
  while (true) {
    const i = _tmp$2;
    if (i > 0) {
      moonbitlang$core$array$$MutArrayView$swap$15$(arr, 0, i);
      moonbitlang$core$builtin$$fixed_sift_down_by$15$(moonbitlang$core$array$$MutArrayView$slice$15$(arr, 0, i), 0, cmp);
      _tmp$2 = i - 1 | 0;
      continue;
    } else {
      return;
    }
  }
}
function moonbitlang$core$builtin$$fixed_partition_by$14$(arr, cmp, pivot_index) {
  moonbitlang$core$array$$MutArrayView$swap$14$(arr, pivot_index, (arr.end - arr.start | 0) - 1 | 0);
  const pivot = moonbitlang$core$array$$MutArrayView$at$14$(arr, (arr.end - arr.start | 0) - 1 | 0);
  let i = 0;
  let partitioned = true;
  const _end527 = (arr.end - arr.start | 0) - 1 | 0;
  let _tmp = 0;
  while (true) {
    const j = _tmp;
    if (j < _end527) {
      if (cmp(moonbitlang$core$array$$MutArrayView$at$14$(arr, j), pivot) < 0) {
        if (i !== j) {
          moonbitlang$core$array$$MutArrayView$swap$14$(arr, i, j);
          partitioned = false;
        }
        i = i + 1 | 0;
      }
      _tmp = j + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  moonbitlang$core$array$$MutArrayView$swap$14$(arr, i, (arr.end - arr.start | 0) - 1 | 0);
  return { _0: i, _1: partitioned };
}
function moonbitlang$core$builtin$$fixed_partition_by$15$(arr, cmp, pivot_index) {
  moonbitlang$core$array$$MutArrayView$swap$15$(arr, pivot_index, (arr.end - arr.start | 0) - 1 | 0);
  const pivot = moonbitlang$core$array$$MutArrayView$at$15$(arr, (arr.end - arr.start | 0) - 1 | 0);
  let i = 0;
  let partitioned = true;
  const _end527 = (arr.end - arr.start | 0) - 1 | 0;
  let _tmp = 0;
  while (true) {
    const j = _tmp;
    if (j < _end527) {
      if (cmp(moonbitlang$core$array$$MutArrayView$at$15$(arr, j), pivot) < 0) {
        if (i !== j) {
          moonbitlang$core$array$$MutArrayView$swap$15$(arr, i, j);
          partitioned = false;
        }
        i = i + 1 | 0;
      }
      _tmp = j + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  moonbitlang$core$array$$MutArrayView$swap$15$(arr, i, (arr.end - arr.start | 0) - 1 | 0);
  return { _0: i, _1: partitioned };
}
function moonbitlang$core$builtin$$fixed_try_bubble_sort_by$14$(arr, cmp) {
  let tries = 0;
  const _end548 = arr.end - arr.start | 0;
  let _tmp = 1;
  while (true) {
    const i = _tmp;
    if (i < _end548) {
      let sorted = true;
      let _tmp$2 = i;
      while (true) {
        const j = _tmp$2;
        if (j > 0 && cmp(moonbitlang$core$array$$MutArrayView$at$14$(arr, j - 1 | 0), moonbitlang$core$array$$MutArrayView$at$14$(arr, j)) > 0) {
          sorted = false;
          moonbitlang$core$array$$MutArrayView$swap$14$(arr, j, j - 1 | 0);
          _tmp$2 = j - 1 | 0;
          continue;
        } else {
          break;
        }
      }
      if (!sorted) {
        tries = tries + 1 | 0;
        if (tries > 8) {
          return false;
        }
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return true;
}
function moonbitlang$core$builtin$$fixed_try_bubble_sort_by$15$(arr, cmp) {
  let tries = 0;
  const _end548 = arr.end - arr.start | 0;
  let _tmp = 1;
  while (true) {
    const i = _tmp;
    if (i < _end548) {
      let sorted = true;
      let _tmp$2 = i;
      while (true) {
        const j = _tmp$2;
        if (j > 0 && cmp(moonbitlang$core$array$$MutArrayView$at$15$(arr, j - 1 | 0), moonbitlang$core$array$$MutArrayView$at$15$(arr, j)) > 0) {
          sorted = false;
          moonbitlang$core$array$$MutArrayView$swap$15$(arr, j, j - 1 | 0);
          _tmp$2 = j - 1 | 0;
          continue;
        } else {
          break;
        }
      }
      if (!sorted) {
        tries = tries + 1 | 0;
        if (tries > 8) {
          return false;
        }
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return true;
}
function moonbitlang$core$builtin$$fixed_quick_sort_by$14$(arr, cmp, pred, limit) {
  let limit$2 = limit;
  let arr$2 = arr;
  let pred$2 = pred;
  let was_partitioned = true;
  let balanced = true;
  while (true) {
    const _p = arr$2;
    const len = _p.end - _p.start | 0;
    if (len <= 16) {
      if (len >= 2) {
        moonbitlang$core$builtin$$fixed_bubble_sort_by$14$(arr$2, cmp);
      }
      return undefined;
    }
    if (limit$2 === 0) {
      moonbitlang$core$builtin$$fixed_heap_sort_by$14$(arr$2, cmp);
      return undefined;
    }
    const _bind = moonbitlang$core$builtin$$fixed_choose_pivot_by$14$(arr$2, cmp);
    const _pivot_index = _bind._0;
    const _likely_sorted = _bind._1;
    if (was_partitioned && (balanced && _likely_sorted)) {
      if (moonbitlang$core$builtin$$fixed_try_bubble_sort_by$14$(arr$2, cmp)) {
        return undefined;
      }
    }
    const _bind$2 = moonbitlang$core$builtin$$fixed_partition_by$14$(arr$2, cmp, _pivot_index);
    const _pivot = _bind$2._0;
    const _partitioned = _bind$2._1;
    was_partitioned = _partitioned;
    const _p$2 = len - _pivot | 0;
    balanced = (_pivot > _p$2 ? _p$2 : _pivot) >= (len / 8 | 0);
    if (!balanced) {
      limit$2 = limit$2 - 1 | 0;
    }
    const _bind$3 = pred$2;
    if (_bind$3 === undefined) {
    } else {
      const _Some = _bind$3;
      const _pred = _Some;
      if (cmp(_pred, moonbitlang$core$array$$MutArrayView$at$14$(arr$2, _pivot)) === 0) {
        let i = _pivot;
        while (true) {
          if (i < len && cmp(_pred, moonbitlang$core$array$$MutArrayView$at$14$(arr$2, i)) === 0) {
            i = i + 1 | 0;
            continue;
          } else {
            break;
          }
        }
        arr$2 = moonbitlang$core$array$$MutArrayView$slice$14$(arr$2, i, len);
        continue;
      }
    }
    const left = moonbitlang$core$array$$MutArrayView$slice$14$(arr$2, 0, _pivot);
    const right = moonbitlang$core$array$$MutArrayView$slice$14$(arr$2, _pivot + 1 | 0, len);
    if ((left.end - left.start | 0) < (right.end - right.start | 0)) {
      moonbitlang$core$builtin$$fixed_quick_sort_by$14$(left, cmp, pred$2, limit$2);
      pred$2 = moonbitlang$core$array$$MutArrayView$at$14$(arr$2, _pivot);
      arr$2 = right;
    } else {
      moonbitlang$core$builtin$$fixed_quick_sort_by$14$(right, cmp, moonbitlang$core$array$$MutArrayView$at$14$(arr$2, _pivot), limit$2);
      arr$2 = left;
    }
    continue;
  }
}
function moonbitlang$core$builtin$$fixed_quick_sort_by$15$(arr, cmp, pred, limit) {
  let limit$2 = limit;
  let arr$2 = arr;
  let pred$2 = pred;
  let was_partitioned = true;
  let balanced = true;
  while (true) {
    const _p = arr$2;
    const len = _p.end - _p.start | 0;
    if (len <= 16) {
      if (len >= 2) {
        moonbitlang$core$builtin$$fixed_bubble_sort_by$15$(arr$2, cmp);
      }
      return undefined;
    }
    if (limit$2 === 0) {
      moonbitlang$core$builtin$$fixed_heap_sort_by$15$(arr$2, cmp);
      return undefined;
    }
    const _bind = moonbitlang$core$builtin$$fixed_choose_pivot_by$15$(arr$2, cmp);
    const _pivot_index = _bind._0;
    const _likely_sorted = _bind._1;
    if (was_partitioned && (balanced && _likely_sorted)) {
      if (moonbitlang$core$builtin$$fixed_try_bubble_sort_by$15$(arr$2, cmp)) {
        return undefined;
      }
    }
    const _bind$2 = moonbitlang$core$builtin$$fixed_partition_by$15$(arr$2, cmp, _pivot_index);
    const _pivot = _bind$2._0;
    const _partitioned = _bind$2._1;
    was_partitioned = _partitioned;
    const _p$2 = len - _pivot | 0;
    balanced = (_pivot > _p$2 ? _p$2 : _pivot) >= (len / 8 | 0);
    if (!balanced) {
      limit$2 = limit$2 - 1 | 0;
    }
    const _bind$3 = pred$2;
    if (_bind$3 === undefined) {
    } else {
      const _Some = _bind$3;
      const _pred = _Some;
      if (cmp(_pred, moonbitlang$core$array$$MutArrayView$at$15$(arr$2, _pivot)) === 0) {
        let i = _pivot;
        while (true) {
          if (i < len && cmp(_pred, moonbitlang$core$array$$MutArrayView$at$15$(arr$2, i)) === 0) {
            i = i + 1 | 0;
            continue;
          } else {
            break;
          }
        }
        arr$2 = moonbitlang$core$array$$MutArrayView$slice$15$(arr$2, i, len);
        continue;
      }
    }
    const left = moonbitlang$core$array$$MutArrayView$slice$15$(arr$2, 0, _pivot);
    const right = moonbitlang$core$array$$MutArrayView$slice$15$(arr$2, _pivot + 1 | 0, len);
    if ((left.end - left.start | 0) < (right.end - right.start | 0)) {
      moonbitlang$core$builtin$$fixed_quick_sort_by$15$(left, cmp, pred$2, limit$2);
      pred$2 = moonbitlang$core$array$$MutArrayView$at$15$(arr$2, _pivot);
      arr$2 = right;
    } else {
      moonbitlang$core$builtin$$fixed_quick_sort_by$15$(right, cmp, moonbitlang$core$array$$MutArrayView$at$15$(arr$2, _pivot), limit$2);
      arr$2 = left;
    }
    continue;
  }
}
function moonbitlang$core$array$$MutArrayView$sort_by_key$65$(self, map) {
  moonbitlang$core$builtin$$fixed_quick_sort_by$15$(self, (a, b) => $compare_int(map(a), map(b)), undefined, moonbitlang$core$builtin$$fixed_get_limit(self.end - self.start | 0));
}
function moonbitlang$core$array$$MutArrayView$sort_by$14$(self, cmp) {
  moonbitlang$core$builtin$$fixed_quick_sort_by$14$(self, cmp, undefined, moonbitlang$core$builtin$$fixed_get_limit(self.end - self.start | 0));
}
function moonbitlang$core$array$$Array$sort$16$(self) {
  moonbitlang$core$array$$MutArrayView$sort$16$(moonbitlang$core$array$$Array$mut_view$46$inner$16$(self, 0, undefined));
}
function moonbitlang$core$array$$Array$sort_by_key$65$(self, map) {
  moonbitlang$core$array$$MutArrayView$sort_by_key$65$(moonbitlang$core$array$$Array$mut_view$46$inner$15$(self, 0, undefined), map);
}
function moonbitlang$core$array$$Array$sort_by$14$(self, cmp) {
  moonbitlang$core$array$$MutArrayView$sort_by$14$(moonbitlang$core$array$$Array$mut_view$46$inner$14$(self, 0, undefined), cmp);
}
function moonbitlang$core$array$$Array$get$8$(self, index) {
  const len = self.length;
  return index >= 0 && index < len ? self[index] : undefined;
}
function moonbitlang$core$array$$Array$clear$15$(self) {
  moonbitlang$core$array$$Array$unsafe_truncate_to_length$15$(self, 0);
}
function moonbitlang$core$array$$Array$contains$16$(self, value) {
  const _len = self.length;
  let _tmp = 0;
  while (true) {
    const _i = _tmp;
    if (_i < _len) {
      const v = self[_i];
      if (v === value) {
        return true;
      }
      _tmp = _i + 1 | 0;
      continue;
    } else {
      return false;
    }
  }
}
function moonbitlang$core$double$$Double$to_string(self) {
  return moonbitlang$core$double$internal$ryu$$ryu_to_string(self);
}
function moonbitlang$core$builtin$$Show$output$31$(self, logger) {
  logger.method_table.method_0(logger.self, moonbitlang$core$double$$Double$to_string(self));
}
function moonbitlang$core$strconv$$base_err$66$() {
  return new Result$Err$3$(new Error$moonbitlang$47$core$47$strconv$46$StrConvError$46$StrConvError(moonbitlang$core$strconv$$base_err_str));
}
function moonbitlang$core$strconv$$check_and_consume_base(view, base) {
  if (base === 0) {
    _L: {
      let rest;
      _L$2: {
        let rest$2;
        _L$3: {
          let rest$3;
          _L$4: {
            if (moonbitlang$core$string$$String$char_length_ge$46$inner(view.str, 2, view.start, view.end)) {
              const _x = moonbitlang$core$string$$String$unsafe_char_at(view.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(view.str, 0, view.start, view.end));
              if (_x === 48) {
                const _x$2 = moonbitlang$core$string$$String$unsafe_char_at(view.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(view.str, 1, view.start, view.end));
                switch (_x$2) {
                  case 120: {
                    const _tmp = view.str;
                    const _bind = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(view.str, 2, view.start, view.end);
                    let _tmp$2;
                    if (_bind === undefined) {
                      _tmp$2 = view.end;
                    } else {
                      const _Some = _bind;
                      _tmp$2 = _Some;
                    }
                    const _tmp$3 = _tmp$2;
                    const _x$3 = { str: _tmp, start: _tmp$3, end: view.end };
                    rest$3 = _x$3;
                    break _L$4;
                  }
                  case 88: {
                    const _tmp$4 = view.str;
                    const _bind$2 = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(view.str, 2, view.start, view.end);
                    let _tmp$5;
                    if (_bind$2 === undefined) {
                      _tmp$5 = view.end;
                    } else {
                      const _Some = _bind$2;
                      _tmp$5 = _Some;
                    }
                    const _tmp$6 = _tmp$5;
                    const _x$4 = { str: _tmp$4, start: _tmp$6, end: view.end };
                    rest$3 = _x$4;
                    break _L$4;
                  }
                  case 111: {
                    const _tmp$7 = view.str;
                    const _bind$3 = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(view.str, 2, view.start, view.end);
                    let _tmp$8;
                    if (_bind$3 === undefined) {
                      _tmp$8 = view.end;
                    } else {
                      const _Some = _bind$3;
                      _tmp$8 = _Some;
                    }
                    const _tmp$9 = _tmp$8;
                    const _x$5 = { str: _tmp$7, start: _tmp$9, end: view.end };
                    rest$2 = _x$5;
                    break _L$3;
                  }
                  case 79: {
                    const _tmp$10 = view.str;
                    const _bind$4 = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(view.str, 2, view.start, view.end);
                    let _tmp$11;
                    if (_bind$4 === undefined) {
                      _tmp$11 = view.end;
                    } else {
                      const _Some = _bind$4;
                      _tmp$11 = _Some;
                    }
                    const _tmp$12 = _tmp$11;
                    const _x$6 = { str: _tmp$10, start: _tmp$12, end: view.end };
                    rest$2 = _x$6;
                    break _L$3;
                  }
                  case 98: {
                    const _tmp$13 = view.str;
                    const _bind$5 = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(view.str, 2, view.start, view.end);
                    let _tmp$14;
                    if (_bind$5 === undefined) {
                      _tmp$14 = view.end;
                    } else {
                      const _Some = _bind$5;
                      _tmp$14 = _Some;
                    }
                    const _tmp$15 = _tmp$14;
                    const _x$7 = { str: _tmp$13, start: _tmp$15, end: view.end };
                    rest = _x$7;
                    break _L$2;
                  }
                  case 66: {
                    const _tmp$16 = view.str;
                    const _bind$6 = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(view.str, 2, view.start, view.end);
                    let _tmp$17;
                    if (_bind$6 === undefined) {
                      _tmp$17 = view.end;
                    } else {
                      const _Some = _bind$6;
                      _tmp$17 = _Some;
                    }
                    const _tmp$18 = _tmp$17;
                    const _x$8 = { str: _tmp$16, start: _tmp$18, end: view.end };
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
          return new Result$Ok$3$({ _0: 16, _1: rest$3, _2: true });
        }
        return new Result$Ok$3$({ _0: 8, _1: rest$2, _2: true });
      }
      return new Result$Ok$3$({ _0: 2, _1: rest, _2: true });
    }
    return new Result$Ok$3$({ _0: 10, _1: view, _2: false });
  } else {
    _L: {
      let rest;
      _L$2: {
        let rest$2;
        _L$3: {
          let rest$3;
          _L$4: {
            if (moonbitlang$core$string$$String$char_length_ge$46$inner(view.str, 2, view.start, view.end)) {
              const _x = moonbitlang$core$string$$String$unsafe_char_at(view.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(view.str, 0, view.start, view.end));
              if (_x === 48) {
                const _x$2 = moonbitlang$core$string$$String$unsafe_char_at(view.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(view.str, 1, view.start, view.end));
                switch (_x$2) {
                  case 120: {
                    const _tmp = view.str;
                    const _bind = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(view.str, 2, view.start, view.end);
                    let _tmp$2;
                    if (_bind === undefined) {
                      _tmp$2 = view.end;
                    } else {
                      const _Some = _bind;
                      _tmp$2 = _Some;
                    }
                    const _tmp$3 = _tmp$2;
                    const _x$3 = { str: _tmp, start: _tmp$3, end: view.end };
                    if (base === 16) {
                      rest$3 = _x$3;
                      break _L$4;
                    } else {
                      break _L;
                    }
                  }
                  case 88: {
                    const _tmp$4 = view.str;
                    const _bind$2 = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(view.str, 2, view.start, view.end);
                    let _tmp$5;
                    if (_bind$2 === undefined) {
                      _tmp$5 = view.end;
                    } else {
                      const _Some = _bind$2;
                      _tmp$5 = _Some;
                    }
                    const _tmp$6 = _tmp$5;
                    const _x$4 = { str: _tmp$4, start: _tmp$6, end: view.end };
                    if (base === 16) {
                      rest$3 = _x$4;
                      break _L$4;
                    } else {
                      break _L;
                    }
                  }
                  case 111: {
                    const _tmp$7 = view.str;
                    const _bind$3 = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(view.str, 2, view.start, view.end);
                    let _tmp$8;
                    if (_bind$3 === undefined) {
                      _tmp$8 = view.end;
                    } else {
                      const _Some = _bind$3;
                      _tmp$8 = _Some;
                    }
                    const _tmp$9 = _tmp$8;
                    const _x$5 = { str: _tmp$7, start: _tmp$9, end: view.end };
                    if (base === 8) {
                      rest$2 = _x$5;
                      break _L$3;
                    } else {
                      break _L;
                    }
                  }
                  case 79: {
                    const _tmp$10 = view.str;
                    const _bind$4 = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(view.str, 2, view.start, view.end);
                    let _tmp$11;
                    if (_bind$4 === undefined) {
                      _tmp$11 = view.end;
                    } else {
                      const _Some = _bind$4;
                      _tmp$11 = _Some;
                    }
                    const _tmp$12 = _tmp$11;
                    const _x$6 = { str: _tmp$10, start: _tmp$12, end: view.end };
                    if (base === 8) {
                      rest$2 = _x$6;
                      break _L$3;
                    } else {
                      break _L;
                    }
                  }
                  case 98: {
                    const _tmp$13 = view.str;
                    const _bind$5 = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(view.str, 2, view.start, view.end);
                    let _tmp$14;
                    if (_bind$5 === undefined) {
                      _tmp$14 = view.end;
                    } else {
                      const _Some = _bind$5;
                      _tmp$14 = _Some;
                    }
                    const _tmp$15 = _tmp$14;
                    const _x$7 = { str: _tmp$13, start: _tmp$15, end: view.end };
                    if (base === 2) {
                      rest = _x$7;
                      break _L$2;
                    } else {
                      break _L;
                    }
                  }
                  case 66: {
                    const _tmp$16 = view.str;
                    const _bind$6 = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(view.str, 2, view.start, view.end);
                    let _tmp$17;
                    if (_bind$6 === undefined) {
                      _tmp$17 = view.end;
                    } else {
                      const _Some = _bind$6;
                      _tmp$17 = _Some;
                    }
                    const _tmp$18 = _tmp$17;
                    const _x$8 = { str: _tmp$16, start: _tmp$18, end: view.end };
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
          return new Result$Ok$3$({ _0: 16, _1: rest$3, _2: true });
        }
        return new Result$Ok$3$({ _0: 8, _1: rest$2, _2: true });
      }
      return new Result$Ok$3$({ _0: 2, _1: rest, _2: true });
    }
    return base >= 2 && base <= 36 ? new Result$Ok$3$({ _0: base, _1: view, _2: false }) : moonbitlang$core$strconv$$base_err$66$();
  }
}
function moonbitlang$core$strconv$$range_err$35$() {
  return new Result$Err$4$(new Error$moonbitlang$47$core$47$strconv$46$StrConvError$46$StrConvError(moonbitlang$core$strconv$$range_err_str));
}
function moonbitlang$core$strconv$$range_err$11$() {
  return new Result$Err$5$(new Error$moonbitlang$47$core$47$strconv$46$StrConvError$46$StrConvError(moonbitlang$core$strconv$$range_err_str));
}
function moonbitlang$core$strconv$$syntax_err$16$() {
  return new Result$Err$6$(new Error$moonbitlang$47$core$47$strconv$46$StrConvError$46$StrConvError(moonbitlang$core$strconv$$syntax_err_str));
}
function moonbitlang$core$strconv$$syntax_err$35$() {
  return new Result$Err$4$(new Error$moonbitlang$47$core$47$strconv$46$StrConvError$46$StrConvError(moonbitlang$core$strconv$$syntax_err_str));
}
function moonbitlang$core$strconv$$syntax_err$31$() {
  return new Result$Err$7$(new Error$moonbitlang$47$core$47$strconv$46$StrConvError$46$StrConvError(moonbitlang$core$strconv$$syntax_err_str));
}
function moonbitlang$core$strconv$$syntax_err$67$() {
  return new Result$Err$8$(new Error$moonbitlang$47$core$47$strconv$46$StrConvError$46$StrConvError(moonbitlang$core$strconv$$syntax_err_str));
}
function moonbitlang$core$strconv$$syntax_err$12$() {
  return new Result$Err$9$(new Error$moonbitlang$47$core$47$strconv$46$StrConvError$46$StrConvError(moonbitlang$core$strconv$$syntax_err_str));
}
function moonbitlang$core$strconv$$syntax_err$68$() {
  return new Result$Err$10$(new Error$moonbitlang$47$core$47$strconv$46$StrConvError$46$StrConvError(moonbitlang$core$strconv$$syntax_err_str));
}
function moonbitlang$core$strconv$$overflow_threshold(base, neg) {
  return !neg ? (base === 10 ? moonbitlang$core$builtin$$Add$add$35$(moonbitlang$core$builtin$$Div$div$35$($9223372036854775807L, $10L), $1L) : base === 16 ? moonbitlang$core$builtin$$Add$add$35$(moonbitlang$core$builtin$$Div$div$35$($9223372036854775807L, $16L), $1L) : moonbitlang$core$builtin$$Add$add$35$(moonbitlang$core$builtin$$Div$div$35$($9223372036854775807L, moonbitlang$core$int$$Int$to_int64(base)), $1L)) : base === 10 ? moonbitlang$core$builtin$$Div$div$35$($_9223372036854775808L, $10L) : base === 16 ? moonbitlang$core$builtin$$Div$div$35$($_9223372036854775808L, $16L) : moonbitlang$core$builtin$$Div$div$35$($_9223372036854775808L, moonbitlang$core$int$$Int$to_int64(base));
}
function moonbitlang$core$strconv$$parse_int64$46$inner(str, base) {
  if (moonbitlang$core$builtin$$Eq$not_equal$32$(str, { str: moonbitlang$core$strconv$$parse_int64$46$inner$46$42$bind$124$600, start: 0, end: moonbitlang$core$strconv$$parse_int64$46$inner$46$42$bind$124$600.length })) {
    let _bind;
    let rest;
    _L: {
      _L$2: {
        const _bind$2 = moonbitlang$core$string$$StringView$view$46$inner(str, 0, undefined);
        if (moonbitlang$core$string$$String$char_length_ge$46$inner(_bind$2.str, 1, _bind$2.start, _bind$2.end)) {
          const _x = moonbitlang$core$string$$String$unsafe_char_at(_bind$2.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_bind$2.str, 0, _bind$2.start, _bind$2.end));
          switch (_x) {
            case 43: {
              const _tmp = _bind$2.str;
              const _bind$3 = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_bind$2.str, 1, _bind$2.start, _bind$2.end);
              let _tmp$2;
              if (_bind$3 === undefined) {
                _tmp$2 = _bind$2.end;
              } else {
                const _Some = _bind$3;
                _tmp$2 = _Some;
              }
              const _tmp$3 = _tmp$2;
              const _x$2 = { str: _tmp, start: _tmp$3, end: _bind$2.end };
              _bind = { _0: false, _1: _x$2 };
              break;
            }
            case 45: {
              const _tmp$4 = _bind$2.str;
              const _bind$4 = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_bind$2.str, 1, _bind$2.start, _bind$2.end);
              let _tmp$5;
              if (_bind$4 === undefined) {
                _tmp$5 = _bind$2.end;
              } else {
                const _Some = _bind$4;
                _tmp$5 = _Some;
              }
              const _tmp$6 = _tmp$5;
              const _x$3 = { str: _tmp$4, start: _tmp$6, end: _bind$2.end };
              _bind = { _0: true, _1: _x$3 };
              break;
            }
            default: {
              rest = _bind$2;
              break _L$2;
            }
          }
        } else {
          rest = _bind$2;
          break _L$2;
        }
        break _L;
      }
      _bind = { _0: false, _1: rest };
    }
    const _neg = _bind._0;
    const _rest = _bind._1;
    const _bind$2 = moonbitlang$core$strconv$$check_and_consume_base(_rest, base);
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
    const overflow_threshold = moonbitlang$core$strconv$$overflow_threshold(_num_base, _neg);
    let has_digit;
    if (moonbitlang$core$string$$String$char_length_ge$46$inner(_rest$2.str, 1, _rest$2.start, _rest$2.end)) {
      const _x = moonbitlang$core$string$$String$unsafe_char_at(_rest$2.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_rest$2.str, 0, _rest$2.start, _rest$2.end));
      if (_x >= 48 && _x <= 57) {
        has_digit = true;
      } else {
        if (_x >= 97 && _x <= 122) {
          has_digit = true;
        } else {
          if (_x >= 65 && _x <= 90) {
            has_digit = true;
          } else {
            if (moonbitlang$core$string$$String$char_length_ge$46$inner(_rest$2.str, 2, _rest$2.start, _rest$2.end)) {
              if (_x === 95) {
                const _x$2 = moonbitlang$core$string$$String$unsafe_char_at(_rest$2.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_rest$2.str, 1, _rest$2.start, _rest$2.end));
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
          if (moonbitlang$core$string$$String$char_length_eq$46$inner(_param_0.str, 1, _param_0.start, _param_0.end)) {
            const _x = moonbitlang$core$string$$String$unsafe_char_at(_param_0.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_param_0.str, 0, _param_0.start, _param_0.end));
            if (_x === 95) {
              const _bind$4 = moonbitlang$core$strconv$$syntax_err$35$();
              if (_bind$4.$tag === 1) {
                const _ok = _bind$4;
                _tmp = _ok._0;
                break;
              } else {
                return _bind$4;
              }
            } else {
              const _tmp$5 = _param_0.str;
              const _bind$4 = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_param_0.str, 1, _param_0.start, _param_0.end);
              let _tmp$6;
              if (_bind$4 === undefined) {
                _tmp$6 = _param_0.end;
              } else {
                const _Some = _bind$4;
                _tmp$6 = _Some;
              }
              const _tmp$7 = _tmp$6;
              const _x$2 = { str: _tmp$5, start: _tmp$7, end: _param_0.end };
              acc = _param_1;
              rest$2 = _x$2;
              c = _x;
              break _L$2;
            }
          } else {
            if (moonbitlang$core$string$$String$char_length_ge$46$inner(_param_0.str, 1, _param_0.start, _param_0.end)) {
              const _x = moonbitlang$core$string$$String$unsafe_char_at(_param_0.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_param_0.str, 0, _param_0.start, _param_0.end));
              if (_x === 95) {
                if (_param_2 === false) {
                  const _bind$4 = moonbitlang$core$strconv$$syntax_err$35$();
                  if (_bind$4.$tag === 1) {
                    const _ok = _bind$4;
                    _tmp = _ok._0;
                    break;
                  } else {
                    return _bind$4;
                  }
                } else {
                  const _tmp$5 = _param_0.str;
                  const _bind$4 = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_param_0.str, 1, _param_0.start, _param_0.end);
                  let _tmp$6;
                  if (_bind$4 === undefined) {
                    _tmp$6 = _param_0.end;
                  } else {
                    const _Some = _bind$4;
                    _tmp$6 = _Some;
                  }
                  const _tmp$7 = _tmp$6;
                  const _x$2 = { str: _tmp$5, start: _tmp$7, end: _param_0.end };
                  _tmp$2 = _x$2;
                  _tmp$4 = false;
                  continue;
                }
              } else {
                const _tmp$5 = _param_0.str;
                const _bind$4 = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_param_0.str, 1, _param_0.start, _param_0.end);
                let _tmp$6;
                if (_bind$4 === undefined) {
                  _tmp$6 = _param_0.end;
                } else {
                  const _Some = _bind$4;
                  _tmp$6 = _Some;
                }
                const _tmp$7 = _tmp$6;
                const _x$2 = { str: _tmp$5, start: _tmp$7, end: _param_0.end };
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
              const _bind$4 = moonbitlang$core$strconv$$syntax_err$16$();
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
            if (moonbitlang$core$builtin$$Compare$op_ge$34$(acc, overflow_threshold)) {
              const next_acc = moonbitlang$core$builtin$$Sub$sub$35$(moonbitlang$core$builtin$$Mul$mul$35$(acc, moonbitlang$core$int$$Int$to_int64(_num_base)), moonbitlang$core$int$$Int$to_int64(d));
              if (moonbitlang$core$builtin$$Compare$op_le$34$(next_acc, acc)) {
                _tmp$2 = rest$2;
                _tmp$3 = next_acc;
                _tmp$4 = true;
                continue;
              } else {
                const _bind$4 = moonbitlang$core$strconv$$range_err$35$();
                if (_bind$4.$tag === 1) {
                  const _ok = _bind$4;
                  _tmp = _ok._0;
                  break;
                } else {
                  return _bind$4;
                }
              }
            } else {
              const _bind$4 = moonbitlang$core$strconv$$range_err$35$();
              if (_bind$4.$tag === 1) {
                const _ok = _bind$4;
                _tmp = _ok._0;
                break;
              } else {
                return _bind$4;
              }
            }
          } else {
            if (moonbitlang$core$builtin$$Compare$op_lt$34$(acc, overflow_threshold)) {
              const next_acc = moonbitlang$core$builtin$$Add$add$35$(moonbitlang$core$builtin$$Mul$mul$35$(acc, moonbitlang$core$int$$Int$to_int64(_num_base)), moonbitlang$core$int$$Int$to_int64(d));
              if (moonbitlang$core$builtin$$Compare$op_ge$34$(next_acc, acc)) {
                _tmp$2 = rest$2;
                _tmp$3 = next_acc;
                _tmp$4 = true;
                continue;
              } else {
                const _bind$4 = moonbitlang$core$strconv$$range_err$35$();
                if (_bind$4.$tag === 1) {
                  const _ok = _bind$4;
                  _tmp = _ok._0;
                  break;
                } else {
                  return _bind$4;
                }
              }
            } else {
              const _bind$4 = moonbitlang$core$strconv$$range_err$35$();
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
          const _bind$4 = moonbitlang$core$strconv$$syntax_err$35$();
          if (_bind$4.$tag === 1) {
            const _ok = _bind$4;
            _tmp = _ok._0;
            break;
          } else {
            return _bind$4;
          }
        }
      }
      return new Result$Ok$4$(_tmp);
    } else {
      return moonbitlang$core$strconv$$syntax_err$35$();
    }
  } else {
    return moonbitlang$core$strconv$$syntax_err$35$();
  }
}
function moonbitlang$core$strconv$$check_underscore(str) {
  let rest;
  if (moonbitlang$core$string$$String$char_length_ge$46$inner(str.str, 1, str.start, str.end)) {
    const _x = moonbitlang$core$string$$String$unsafe_char_at(str.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(str.str, 0, str.start, str.end));
    switch (_x) {
      case 43: {
        const _tmp = str.str;
        const _bind = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(str.str, 1, str.start, str.end);
        let _tmp$2;
        if (_bind === undefined) {
          _tmp$2 = str.end;
        } else {
          const _Some = _bind;
          _tmp$2 = _Some;
        }
        const _tmp$3 = _tmp$2;
        const _x$2 = { str: _tmp, start: _tmp$3, end: str.end };
        rest = _x$2;
        break;
      }
      case 45: {
        const _tmp$4 = str.str;
        const _bind$2 = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(str.str, 1, str.start, str.end);
        let _tmp$5;
        if (_bind$2 === undefined) {
          _tmp$5 = str.end;
        } else {
          const _Some = _bind$2;
          _tmp$5 = _Some;
        }
        const _tmp$6 = _tmp$5;
        const _x$3 = { str: _tmp$4, start: _tmp$6, end: str.end };
        rest = _x$3;
        break;
      }
      default: {
        rest = str;
      }
    }
  } else {
    rest = str;
  }
  let _bind;
  let rest$2;
  _L: {
    _L$2: {
      let rest$3;
      _L$3: {
        _L$4: {
          let rest$4;
          _L$5: {
            _L$6: {
              let rest$5;
              _L$7: {
                if (moonbitlang$core$string$$String$char_length_ge$46$inner(rest.str, 2, rest.start, rest.end)) {
                  const _x = moonbitlang$core$string$$String$unsafe_char_at(rest.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(rest.str, 0, rest.start, rest.end));
                  if (_x === 48) {
                    const _x$2 = moonbitlang$core$string$$String$unsafe_char_at(rest.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(rest.str, 1, rest.start, rest.end));
                    switch (_x$2) {
                      case 120: {
                        const _tmp = rest.str;
                        const _bind$2 = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(rest.str, 2, rest.start, rest.end);
                        let _tmp$2;
                        if (_bind$2 === undefined) {
                          _tmp$2 = rest.end;
                        } else {
                          const _Some = _bind$2;
                          _tmp$2 = _Some;
                        }
                        const _tmp$3 = _tmp$2;
                        const _x$3 = { str: _tmp, start: _tmp$3, end: rest.end };
                        rest$5 = _x$3;
                        break _L$7;
                      }
                      case 88: {
                        const _tmp$4 = rest.str;
                        const _bind$3 = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(rest.str, 2, rest.start, rest.end);
                        let _tmp$5;
                        if (_bind$3 === undefined) {
                          _tmp$5 = rest.end;
                        } else {
                          const _Some = _bind$3;
                          _tmp$5 = _Some;
                        }
                        const _tmp$6 = _tmp$5;
                        const _x$4 = { str: _tmp$4, start: _tmp$6, end: rest.end };
                        rest$5 = _x$4;
                        break _L$7;
                      }
                      case 111: {
                        const _tmp$7 = rest.str;
                        const _bind$4 = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(rest.str, 2, rest.start, rest.end);
                        let _tmp$8;
                        if (_bind$4 === undefined) {
                          _tmp$8 = rest.end;
                        } else {
                          const _Some = _bind$4;
                          _tmp$8 = _Some;
                        }
                        const _tmp$9 = _tmp$8;
                        const _x$5 = { str: _tmp$7, start: _tmp$9, end: rest.end };
                        rest$4 = _x$5;
                        break _L$6;
                      }
                      case 79: {
                        const _tmp$10 = rest.str;
                        const _bind$5 = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(rest.str, 2, rest.start, rest.end);
                        let _tmp$11;
                        if (_bind$5 === undefined) {
                          _tmp$11 = rest.end;
                        } else {
                          const _Some = _bind$5;
                          _tmp$11 = _Some;
                        }
                        const _tmp$12 = _tmp$11;
                        const _x$6 = { str: _tmp$10, start: _tmp$12, end: rest.end };
                        rest$4 = _x$6;
                        break _L$6;
                      }
                      case 98: {
                        const _tmp$13 = rest.str;
                        const _bind$6 = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(rest.str, 2, rest.start, rest.end);
                        let _tmp$14;
                        if (_bind$6 === undefined) {
                          _tmp$14 = rest.end;
                        } else {
                          const _Some = _bind$6;
                          _tmp$14 = _Some;
                        }
                        const _tmp$15 = _tmp$14;
                        const _x$7 = { str: _tmp$13, start: _tmp$15, end: rest.end };
                        rest$3 = _x$7;
                        break _L$4;
                      }
                      case 66: {
                        const _tmp$16 = rest.str;
                        const _bind$7 = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(rest.str, 2, rest.start, rest.end);
                        let _tmp$17;
                        if (_bind$7 === undefined) {
                          _tmp$17 = rest.end;
                        } else {
                          const _Some = _bind$7;
                          _tmp$17 = _Some;
                        }
                        const _tmp$18 = _tmp$17;
                        const _x$8 = { str: _tmp$16, start: _tmp$18, end: rest.end };
                        rest$3 = _x$8;
                        break _L$4;
                      }
                      default: {
                        rest$2 = rest;
                        break _L$2;
                      }
                    }
                  } else {
                    rest$2 = rest;
                    break _L$2;
                  }
                } else {
                  rest$2 = rest;
                  break _L$2;
                }
              }
              _bind = { _0: rest$5, _1: true, _2: true };
              break _L$5;
            }
            _bind = { _0: rest$4, _1: true, _2: false };
          }
          break _L$3;
        }
        _bind = { _0: rest$3, _1: true, _2: false };
      }
      break _L;
    }
    _bind = { _0: rest$2, _1: false, _2: false };
  }
  const _rest = _bind._0;
  const _allow_underscore = _bind._1;
  const _hex = _bind._2;
  let _tmp = _rest;
  let _tmp$2 = _allow_underscore;
  let _tmp$3 = false;
  while (true) {
    const _param_0 = _tmp;
    const _param_1 = _tmp$2;
    const _param_2 = _tmp$3;
    let rest$3;
    let c;
    let follow_underscore;
    _L$2: {
      if (moonbitlang$core$string$$String$char_length_eq$46$inner(_param_0.str, 0, _param_0.start, _param_0.end)) {
        return true;
      } else {
        if (moonbitlang$core$string$$String$char_length_eq$46$inner(_param_0.str, 1, _param_0.start, _param_0.end)) {
          const _x = moonbitlang$core$string$$String$unsafe_char_at(_param_0.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_param_0.str, 0, _param_0.start, _param_0.end));
          if (_x === 95) {
            return false;
          } else {
            const _tmp$4 = _param_0.str;
            const _bind$2 = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_param_0.str, 1, _param_0.start, _param_0.end);
            let _tmp$5;
            if (_bind$2 === undefined) {
              _tmp$5 = _param_0.end;
            } else {
              const _Some = _bind$2;
              _tmp$5 = _Some;
            }
            const _tmp$6 = _tmp$5;
            const _x$2 = { str: _tmp$4, start: _tmp$6, end: _param_0.end };
            rest$3 = _x$2;
            c = _x;
            follow_underscore = _param_2;
            break _L$2;
          }
        } else {
          const _x = moonbitlang$core$string$$String$unsafe_char_at(_param_0.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_param_0.str, 0, _param_0.start, _param_0.end));
          if (_x === 95) {
            if (_param_1 === false) {
              return false;
            } else {
              const _tmp$4 = _param_0.str;
              const _bind$2 = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_param_0.str, 1, _param_0.start, _param_0.end);
              let _tmp$5;
              if (_bind$2 === undefined) {
                _tmp$5 = _param_0.end;
              } else {
                const _Some = _bind$2;
                _tmp$5 = _Some;
              }
              const _tmp$6 = _tmp$5;
              const _x$2 = { str: _tmp$4, start: _tmp$6, end: _param_0.end };
              _tmp = _x$2;
              _tmp$2 = false;
              _tmp$3 = true;
              continue;
            }
          } else {
            const _tmp$4 = _param_0.str;
            const _bind$2 = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_param_0.str, 1, _param_0.start, _param_0.end);
            let _tmp$5;
            if (_bind$2 === undefined) {
              _tmp$5 = _param_0.end;
            } else {
              const _Some = _bind$2;
              _tmp$5 = _Some;
            }
            const _tmp$6 = _tmp$5;
            const _x$2 = { str: _tmp$4, start: _tmp$6, end: _param_0.end };
            rest$3 = _x$2;
            c = _x;
            follow_underscore = _param_2;
            break _L$2;
          }
        }
      }
    }
    if (c >= 48 && c <= 57 ? true : _hex && (c >= 97 && c <= 102 ? true : c >= 65 && c <= 70)) {
      _tmp = rest$3;
      _tmp$2 = true;
      _tmp$3 = false;
      continue;
    } else {
      if (follow_underscore) {
        return false;
      } else {
        _tmp = rest$3;
        _tmp$2 = false;
        _tmp$3 = false;
        continue;
      }
    }
  }
}
function moonbitlang$core$strconv$$Decimal$new_priv() {
  return { digits: $makebytes(800, 0), digits_num: 0, decimal_point: 0, negative: false, truncated: false };
}
function moonbitlang$core$strconv$$Decimal$trim(self) {
  while (true) {
    let _tmp;
    if (self.digits_num > 0) {
      const _tmp$2 = self.digits;
      const _tmp$3 = self.digits_num - 1 | 0;
      $bound_check(_tmp$2, _tmp$3);
      const _p = _tmp$2[_tmp$3];
      const _p$2 = 0;
      _tmp = _p === _p$2;
    } else {
      _tmp = false;
    }
    if (_tmp) {
      self.digits_num = self.digits_num - 1 | 0;
      continue;
    } else {
      break;
    }
  }
  if (self.digits_num === 0) {
    self.decimal_point = 0;
    return;
  } else {
    return;
  }
}
function moonbitlang$core$strconv$$parse_decimal_from_view(str) {
  const d = moonbitlang$core$strconv$$Decimal$new_priv();
  let has_dp = false;
  let has_digits = false;
  let rest;
  _L: {
    _L$2: {
      if (moonbitlang$core$string$$String$char_length_ge$46$inner(str.str, 1, str.start, str.end)) {
        const _x = moonbitlang$core$string$$String$unsafe_char_at(str.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(str.str, 0, str.start, str.end));
        switch (_x) {
          case 45: {
            const _tmp = str.str;
            const _bind = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(str.str, 1, str.start, str.end);
            let _tmp$2;
            if (_bind === undefined) {
              _tmp$2 = str.end;
            } else {
              const _Some = _bind;
              _tmp$2 = _Some;
            }
            const _tmp$3 = _tmp$2;
            const _x$2 = { str: _tmp, start: _tmp$3, end: str.end };
            d.negative = true;
            rest = _x$2;
            break;
          }
          case 43: {
            const _tmp$4 = str.str;
            const _bind$2 = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(str.str, 1, str.start, str.end);
            let _tmp$5;
            if (_bind$2 === undefined) {
              _tmp$5 = str.end;
            } else {
              const _Some = _bind$2;
              _tmp$5 = _Some;
            }
            const _tmp$6 = _tmp$5;
            rest = { str: _tmp$4, start: _tmp$6, end: str.end };
            break;
          }
          default: {
            break _L$2;
          }
        }
      } else {
        break _L$2;
      }
      break _L;
    }
    rest = str;
  }
  let rest$2;
  let _tmp = rest;
  while (true) {
    const _param = _tmp;
    if (moonbitlang$core$string$$String$char_length_ge$46$inner(_param.str, 1, _param.start, _param.end)) {
      const _x = moonbitlang$core$string$$String$unsafe_char_at(_param.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_param.str, 0, _param.start, _param.end));
      if (_x === 95) {
        const _tmp$2 = _param.str;
        const _bind = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_param.str, 1, _param.start, _param.end);
        let _tmp$3;
        if (_bind === undefined) {
          _tmp$3 = _param.end;
        } else {
          const _Some = _bind;
          _tmp$3 = _Some;
        }
        const _tmp$4 = _tmp$3;
        const _x$2 = { str: _tmp$2, start: _tmp$4, end: _param.end };
        _tmp = _x$2;
        continue;
      } else {
        if (_x === 46) {
          const _tmp$2 = _param.str;
          const _bind = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_param.str, 1, _param.start, _param.end);
          let _tmp$3;
          if (_bind === undefined) {
            _tmp$3 = _param.end;
          } else {
            const _Some = _bind;
            _tmp$3 = _Some;
          }
          const _tmp$4 = _tmp$3;
          const _x$2 = { str: _tmp$2, start: _tmp$4, end: _param.end };
          if (!has_dp) {
            has_dp = true;
            d.decimal_point = d.digits_num;
            _tmp = _x$2;
            continue;
          } else {
            const _bind$2 = moonbitlang$core$strconv$$syntax_err$12$();
            if (_bind$2.$tag === 1) {
              const _ok = _bind$2;
              rest$2 = _ok._0;
              break;
            } else {
              return _bind$2;
            }
          }
        } else {
          if (_x >= 48 && _x <= 57) {
            const _tmp$2 = _param.str;
            const _bind = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_param.str, 1, _param.start, _param.end);
            let _tmp$3;
            if (_bind === undefined) {
              _tmp$3 = _param.end;
            } else {
              const _Some = _bind;
              _tmp$3 = _Some;
            }
            const _tmp$4 = _tmp$3;
            const _x$2 = { str: _tmp$2, start: _tmp$4, end: _param.end };
            has_digits = true;
            if (_x === 48 && d.digits_num === 0) {
              d.decimal_point = d.decimal_point - 1 | 0;
              _tmp = _x$2;
              continue;
            }
            if (d.digits_num < d.digits.length) {
              const _tmp$5 = d.digits;
              const _tmp$6 = d.digits_num;
              $bound_check(_tmp$5, _tmp$6);
              _tmp$5[_tmp$6] = (_x - 48 | 0) & 255;
              d.digits_num = d.digits_num + 1 | 0;
            } else {
              if (_x !== 48) {
                d.truncated = true;
              }
            }
            _tmp = _x$2;
            continue;
          } else {
            rest$2 = _param;
            break;
          }
        }
      }
    } else {
      rest$2 = _param;
      break;
    }
  }
  if (has_digits) {
    if (!has_dp) {
      d.decimal_point = d.digits_num;
    }
    let rest$3;
    let rest$4;
    _L$2: {
      _L$3: {
        if (moonbitlang$core$string$$String$char_length_ge$46$inner(rest$2.str, 1, rest$2.start, rest$2.end)) {
          const _x = moonbitlang$core$string$$String$unsafe_char_at(rest$2.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(rest$2.str, 0, rest$2.start, rest$2.end));
          switch (_x) {
            case 101: {
              const _tmp$2 = rest$2.str;
              const _bind = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(rest$2.str, 1, rest$2.start, rest$2.end);
              let _tmp$3;
              if (_bind === undefined) {
                _tmp$3 = rest$2.end;
              } else {
                const _Some = _bind;
                _tmp$3 = _Some;
              }
              const _tmp$4 = _tmp$3;
              const _x$2 = { str: _tmp$2, start: _tmp$4, end: rest$2.end };
              rest$4 = _x$2;
              break _L$3;
            }
            case 69: {
              const _tmp$5 = rest$2.str;
              const _bind$2 = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(rest$2.str, 1, rest$2.start, rest$2.end);
              let _tmp$6;
              if (_bind$2 === undefined) {
                _tmp$6 = rest$2.end;
              } else {
                const _Some = _bind$2;
                _tmp$6 = _Some;
              }
              const _tmp$7 = _tmp$6;
              const _x$3 = { str: _tmp$5, start: _tmp$7, end: rest$2.end };
              rest$4 = _x$3;
              break _L$3;
            }
            default: {
              rest$3 = rest$2;
            }
          }
        } else {
          rest$3 = rest$2;
        }
        break _L$2;
      }
      let exp_sign = 1;
      let rest$5;
      if (moonbitlang$core$string$$String$char_length_ge$46$inner(rest$4.str, 1, rest$4.start, rest$4.end)) {
        const _x = moonbitlang$core$string$$String$unsafe_char_at(rest$4.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(rest$4.str, 0, rest$4.start, rest$4.end));
        switch (_x) {
          case 43: {
            const _tmp$2 = rest$4.str;
            const _bind = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(rest$4.str, 1, rest$4.start, rest$4.end);
            let _tmp$3;
            if (_bind === undefined) {
              _tmp$3 = rest$4.end;
            } else {
              const _Some = _bind;
              _tmp$3 = _Some;
            }
            const _tmp$4 = _tmp$3;
            rest$5 = { str: _tmp$2, start: _tmp$4, end: rest$4.end };
            break;
          }
          case 45: {
            const _tmp$5 = rest$4.str;
            const _bind$2 = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(rest$4.str, 1, rest$4.start, rest$4.end);
            let _tmp$6;
            if (_bind$2 === undefined) {
              _tmp$6 = rest$4.end;
            } else {
              const _Some = _bind$2;
              _tmp$6 = _Some;
            }
            const _tmp$7 = _tmp$6;
            const _x$2 = { str: _tmp$5, start: _tmp$7, end: rest$4.end };
            exp_sign = -1;
            rest$5 = _x$2;
            break;
          }
          default: {
            rest$5 = rest$4;
          }
        }
      } else {
        rest$5 = rest$4;
      }
      _L$4: {
        _L$5: {
          if (moonbitlang$core$string$$String$char_length_ge$46$inner(rest$5.str, 1, rest$5.start, rest$5.end)) {
            const _x = moonbitlang$core$string$$String$unsafe_char_at(rest$5.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(rest$5.str, 0, rest$5.start, rest$5.end));
            if (_x >= 48 && _x <= 57) {
              let exp = 0;
              let rest$6;
              let _tmp$2 = rest$5;
              while (true) {
                const _param = _tmp$2;
                if (moonbitlang$core$string$$String$char_length_ge$46$inner(_param.str, 1, _param.start, _param.end)) {
                  const _x$2 = moonbitlang$core$string$$String$unsafe_char_at(_param.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_param.str, 0, _param.start, _param.end));
                  if (_x$2 === 95) {
                    const _tmp$3 = _param.str;
                    const _bind = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_param.str, 1, _param.start, _param.end);
                    let _tmp$4;
                    if (_bind === undefined) {
                      _tmp$4 = _param.end;
                    } else {
                      const _Some = _bind;
                      _tmp$4 = _Some;
                    }
                    const _tmp$5 = _tmp$4;
                    const _x$3 = { str: _tmp$3, start: _tmp$5, end: _param.end };
                    _tmp$2 = _x$3;
                    continue;
                  } else {
                    if (_x$2 >= 48 && _x$2 <= 57) {
                      const _tmp$3 = _param.str;
                      const _bind = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_param.str, 1, _param.start, _param.end);
                      let _tmp$4;
                      if (_bind === undefined) {
                        _tmp$4 = _param.end;
                      } else {
                        const _Some = _bind;
                        _tmp$4 = _Some;
                      }
                      const _tmp$5 = _tmp$4;
                      const _x$3 = { str: _tmp$3, start: _tmp$5, end: _param.end };
                      exp = (Math.imul(exp, 10) | 0) + (_x$2 - 48 | 0) | 0;
                      _tmp$2 = _x$3;
                      continue;
                    } else {
                      rest$6 = _param;
                      break;
                    }
                  }
                } else {
                  rest$6 = _param;
                  break;
                }
              }
              d.decimal_point = d.decimal_point + (Math.imul(exp_sign, exp) | 0) | 0;
              rest$3 = rest$6;
            } else {
              break _L$5;
            }
          } else {
            break _L$5;
          }
          break _L$4;
        }
        const _bind = moonbitlang$core$strconv$$syntax_err$12$();
        if (_bind.$tag === 1) {
          const _ok = _bind;
          rest$3 = _ok._0;
        } else {
          return _bind;
        }
      }
    }
    if (moonbitlang$core$string$$String$char_length_eq$46$inner(rest$3.str, 0, rest$3.start, rest$3.end)) {
      moonbitlang$core$strconv$$Decimal$trim(d);
      return new Result$Ok$10$(d);
    } else {
      return moonbitlang$core$strconv$$syntax_err$68$();
    }
  } else {
    return moonbitlang$core$strconv$$syntax_err$68$();
  }
}
function moonbitlang$core$strconv$$parse_decimal_priv(str) {
  return moonbitlang$core$strconv$$parse_decimal_from_view(str);
}
function moonbitlang$core$strconv$$parse_inf_nan(rest) {
  let _bind;
  let rest$2;
  _L: {
    _L$2: {
      if (moonbitlang$core$string$$String$char_length_ge$46$inner(rest.str, 1, rest.start, rest.end)) {
        const _x = moonbitlang$core$string$$String$unsafe_char_at(rest.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(rest.str, 0, rest.start, rest.end));
        switch (_x) {
          case 45: {
            const _tmp = rest.str;
            const _bind$2 = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(rest.str, 1, rest.start, rest.end);
            let _tmp$2;
            if (_bind$2 === undefined) {
              _tmp$2 = rest.end;
            } else {
              const _Some = _bind$2;
              _tmp$2 = _Some;
            }
            const _tmp$3 = _tmp$2;
            const _x$2 = { str: _tmp, start: _tmp$3, end: rest.end };
            _bind = { _0: false, _1: _x$2 };
            break;
          }
          case 43: {
            const _tmp$4 = rest.str;
            const _bind$3 = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(rest.str, 1, rest.start, rest.end);
            let _tmp$5;
            if (_bind$3 === undefined) {
              _tmp$5 = rest.end;
            } else {
              const _Some = _bind$3;
              _tmp$5 = _Some;
            }
            const _tmp$6 = _tmp$5;
            const _x$3 = { str: _tmp$4, start: _tmp$6, end: rest.end };
            rest$2 = _x$3;
            break _L$2;
          }
          default: {
            rest$2 = rest;
            break _L$2;
          }
        }
      } else {
        rest$2 = rest;
        break _L$2;
      }
      break _L;
    }
    _bind = { _0: true, _1: rest$2 };
  }
  const _pos = _bind._0;
  const _rest = _bind._1;
  _L$2: {
    let rest$3;
    _L$3: {
      _L$4: {
        if (moonbitlang$core$string$$String$char_length_eq$46$inner(_rest.str, 3, _rest.start, _rest.end)) {
          const _x = moonbitlang$core$string$$String$unsafe_char_at(_rest.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_rest.str, 0, _rest.start, _rest.end));
          switch (_x) {
            case 110: {
              const _x$2 = moonbitlang$core$string$$String$unsafe_char_at(_rest.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_rest.str, 1, _rest.start, _rest.end));
              switch (_x$2) {
                case 97: {
                  const _x$3 = moonbitlang$core$string$$String$unsafe_char_at(_rest.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_rest.str, 2, _rest.start, _rest.end));
                  switch (_x$3) {
                    case 110: {
                      break _L$4;
                    }
                    case 78: {
                      break _L$4;
                    }
                    default: {
                      break _L$2;
                    }
                  }
                }
                case 65: {
                  const _x$4 = moonbitlang$core$string$$String$unsafe_char_at(_rest.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_rest.str, 2, _rest.start, _rest.end));
                  switch (_x$4) {
                    case 110: {
                      break _L$4;
                    }
                    case 78: {
                      break _L$4;
                    }
                    default: {
                      break _L$2;
                    }
                  }
                }
                default: {
                  break _L$2;
                }
              }
            }
            case 78: {
              const _x$5 = moonbitlang$core$string$$String$unsafe_char_at(_rest.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_rest.str, 1, _rest.start, _rest.end));
              switch (_x$5) {
                case 97: {
                  const _x$6 = moonbitlang$core$string$$String$unsafe_char_at(_rest.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_rest.str, 2, _rest.start, _rest.end));
                  switch (_x$6) {
                    case 110: {
                      break _L$4;
                    }
                    case 78: {
                      break _L$4;
                    }
                    default: {
                      break _L$2;
                    }
                  }
                }
                case 65: {
                  const _x$7 = moonbitlang$core$string$$String$unsafe_char_at(_rest.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_rest.str, 2, _rest.start, _rest.end));
                  switch (_x$7) {
                    case 110: {
                      break _L$4;
                    }
                    case 78: {
                      break _L$4;
                    }
                    default: {
                      break _L$2;
                    }
                  }
                }
                default: {
                  break _L$2;
                }
              }
            }
            case 105: {
              const _x$8 = moonbitlang$core$string$$String$unsafe_char_at(_rest.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_rest.str, 1, _rest.start, _rest.end));
              switch (_x$8) {
                case 110: {
                  const _x$9 = moonbitlang$core$string$$String$unsafe_char_at(_rest.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_rest.str, 2, _rest.start, _rest.end));
                  switch (_x$9) {
                    case 102: {
                      const _tmp = _rest.str;
                      const _bind$2 = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_rest.str, 3, _rest.start, _rest.end);
                      let _tmp$2;
                      if (_bind$2 === undefined) {
                        _tmp$2 = _rest.end;
                      } else {
                        const _Some = _bind$2;
                        _tmp$2 = _Some;
                      }
                      const _tmp$3 = _tmp$2;
                      const _x$10 = { str: _tmp, start: _tmp$3, end: _rest.end };
                      rest$3 = _x$10;
                      break _L$3;
                    }
                    case 70: {
                      const _tmp$4 = _rest.str;
                      const _bind$3 = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_rest.str, 3, _rest.start, _rest.end);
                      let _tmp$5;
                      if (_bind$3 === undefined) {
                        _tmp$5 = _rest.end;
                      } else {
                        const _Some = _bind$3;
                        _tmp$5 = _Some;
                      }
                      const _tmp$6 = _tmp$5;
                      const _x$11 = { str: _tmp$4, start: _tmp$6, end: _rest.end };
                      rest$3 = _x$11;
                      break _L$3;
                    }
                    default: {
                      break _L$2;
                    }
                  }
                }
                case 78: {
                  const _x$12 = moonbitlang$core$string$$String$unsafe_char_at(_rest.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_rest.str, 2, _rest.start, _rest.end));
                  switch (_x$12) {
                    case 102: {
                      const _tmp$7 = _rest.str;
                      const _bind$4 = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_rest.str, 3, _rest.start, _rest.end);
                      let _tmp$8;
                      if (_bind$4 === undefined) {
                        _tmp$8 = _rest.end;
                      } else {
                        const _Some = _bind$4;
                        _tmp$8 = _Some;
                      }
                      const _tmp$9 = _tmp$8;
                      const _x$13 = { str: _tmp$7, start: _tmp$9, end: _rest.end };
                      rest$3 = _x$13;
                      break _L$3;
                    }
                    case 70: {
                      const _tmp$10 = _rest.str;
                      const _bind$5 = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_rest.str, 3, _rest.start, _rest.end);
                      let _tmp$11;
                      if (_bind$5 === undefined) {
                        _tmp$11 = _rest.end;
                      } else {
                        const _Some = _bind$5;
                        _tmp$11 = _Some;
                      }
                      const _tmp$12 = _tmp$11;
                      const _x$14 = { str: _tmp$10, start: _tmp$12, end: _rest.end };
                      rest$3 = _x$14;
                      break _L$3;
                    }
                    default: {
                      break _L$2;
                    }
                  }
                }
                default: {
                  break _L$2;
                }
              }
            }
            case 73: {
              const _x$15 = moonbitlang$core$string$$String$unsafe_char_at(_rest.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_rest.str, 1, _rest.start, _rest.end));
              switch (_x$15) {
                case 110: {
                  const _x$16 = moonbitlang$core$string$$String$unsafe_char_at(_rest.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_rest.str, 2, _rest.start, _rest.end));
                  switch (_x$16) {
                    case 102: {
                      const _tmp$13 = _rest.str;
                      const _bind$6 = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_rest.str, 3, _rest.start, _rest.end);
                      let _tmp$14;
                      if (_bind$6 === undefined) {
                        _tmp$14 = _rest.end;
                      } else {
                        const _Some = _bind$6;
                        _tmp$14 = _Some;
                      }
                      const _tmp$15 = _tmp$14;
                      const _x$17 = { str: _tmp$13, start: _tmp$15, end: _rest.end };
                      rest$3 = _x$17;
                      break _L$3;
                    }
                    case 70: {
                      const _tmp$16 = _rest.str;
                      const _bind$7 = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_rest.str, 3, _rest.start, _rest.end);
                      let _tmp$17;
                      if (_bind$7 === undefined) {
                        _tmp$17 = _rest.end;
                      } else {
                        const _Some = _bind$7;
                        _tmp$17 = _Some;
                      }
                      const _tmp$18 = _tmp$17;
                      const _x$18 = { str: _tmp$16, start: _tmp$18, end: _rest.end };
                      rest$3 = _x$18;
                      break _L$3;
                    }
                    default: {
                      break _L$2;
                    }
                  }
                }
                case 78: {
                  const _x$19 = moonbitlang$core$string$$String$unsafe_char_at(_rest.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_rest.str, 2, _rest.start, _rest.end));
                  switch (_x$19) {
                    case 102: {
                      const _tmp$19 = _rest.str;
                      const _bind$8 = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_rest.str, 3, _rest.start, _rest.end);
                      let _tmp$20;
                      if (_bind$8 === undefined) {
                        _tmp$20 = _rest.end;
                      } else {
                        const _Some = _bind$8;
                        _tmp$20 = _Some;
                      }
                      const _tmp$21 = _tmp$20;
                      const _x$20 = { str: _tmp$19, start: _tmp$21, end: _rest.end };
                      rest$3 = _x$20;
                      break _L$3;
                    }
                    case 70: {
                      const _tmp$22 = _rest.str;
                      const _bind$9 = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_rest.str, 3, _rest.start, _rest.end);
                      let _tmp$23;
                      if (_bind$9 === undefined) {
                        _tmp$23 = _rest.end;
                      } else {
                        const _Some = _bind$9;
                        _tmp$23 = _Some;
                      }
                      const _tmp$24 = _tmp$23;
                      const _x$21 = { str: _tmp$22, start: _tmp$24, end: _rest.end };
                      rest$3 = _x$21;
                      break _L$3;
                    }
                    default: {
                      break _L$2;
                    }
                  }
                }
                default: {
                  break _L$2;
                }
              }
            }
            default: {
              break _L$2;
            }
          }
        } else {
          if (moonbitlang$core$string$$String$char_length_ge$46$inner(_rest.str, 3, _rest.start, _rest.end)) {
            const _x = moonbitlang$core$string$$String$unsafe_char_at(_rest.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_rest.str, 0, _rest.start, _rest.end));
            switch (_x) {
              case 105: {
                const _x$2 = moonbitlang$core$string$$String$unsafe_char_at(_rest.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_rest.str, 1, _rest.start, _rest.end));
                switch (_x$2) {
                  case 110: {
                    const _x$3 = moonbitlang$core$string$$String$unsafe_char_at(_rest.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_rest.str, 2, _rest.start, _rest.end));
                    switch (_x$3) {
                      case 102: {
                        const _tmp = _rest.str;
                        const _bind$2 = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_rest.str, 3, _rest.start, _rest.end);
                        let _tmp$2;
                        if (_bind$2 === undefined) {
                          _tmp$2 = _rest.end;
                        } else {
                          const _Some = _bind$2;
                          _tmp$2 = _Some;
                        }
                        const _tmp$3 = _tmp$2;
                        const _x$4 = { str: _tmp, start: _tmp$3, end: _rest.end };
                        rest$3 = _x$4;
                        break _L$3;
                      }
                      case 70: {
                        const _tmp$4 = _rest.str;
                        const _bind$3 = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_rest.str, 3, _rest.start, _rest.end);
                        let _tmp$5;
                        if (_bind$3 === undefined) {
                          _tmp$5 = _rest.end;
                        } else {
                          const _Some = _bind$3;
                          _tmp$5 = _Some;
                        }
                        const _tmp$6 = _tmp$5;
                        const _x$5 = { str: _tmp$4, start: _tmp$6, end: _rest.end };
                        rest$3 = _x$5;
                        break _L$3;
                      }
                      default: {
                        break _L$2;
                      }
                    }
                  }
                  case 78: {
                    const _x$6 = moonbitlang$core$string$$String$unsafe_char_at(_rest.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_rest.str, 2, _rest.start, _rest.end));
                    switch (_x$6) {
                      case 102: {
                        const _tmp$7 = _rest.str;
                        const _bind$4 = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_rest.str, 3, _rest.start, _rest.end);
                        let _tmp$8;
                        if (_bind$4 === undefined) {
                          _tmp$8 = _rest.end;
                        } else {
                          const _Some = _bind$4;
                          _tmp$8 = _Some;
                        }
                        const _tmp$9 = _tmp$8;
                        const _x$7 = { str: _tmp$7, start: _tmp$9, end: _rest.end };
                        rest$3 = _x$7;
                        break _L$3;
                      }
                      case 70: {
                        const _tmp$10 = _rest.str;
                        const _bind$5 = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_rest.str, 3, _rest.start, _rest.end);
                        let _tmp$11;
                        if (_bind$5 === undefined) {
                          _tmp$11 = _rest.end;
                        } else {
                          const _Some = _bind$5;
                          _tmp$11 = _Some;
                        }
                        const _tmp$12 = _tmp$11;
                        const _x$8 = { str: _tmp$10, start: _tmp$12, end: _rest.end };
                        rest$3 = _x$8;
                        break _L$3;
                      }
                      default: {
                        break _L$2;
                      }
                    }
                  }
                  default: {
                    break _L$2;
                  }
                }
              }
              case 73: {
                const _x$9 = moonbitlang$core$string$$String$unsafe_char_at(_rest.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_rest.str, 1, _rest.start, _rest.end));
                switch (_x$9) {
                  case 110: {
                    const _x$10 = moonbitlang$core$string$$String$unsafe_char_at(_rest.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_rest.str, 2, _rest.start, _rest.end));
                    switch (_x$10) {
                      case 102: {
                        const _tmp$13 = _rest.str;
                        const _bind$6 = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_rest.str, 3, _rest.start, _rest.end);
                        let _tmp$14;
                        if (_bind$6 === undefined) {
                          _tmp$14 = _rest.end;
                        } else {
                          const _Some = _bind$6;
                          _tmp$14 = _Some;
                        }
                        const _tmp$15 = _tmp$14;
                        const _x$11 = { str: _tmp$13, start: _tmp$15, end: _rest.end };
                        rest$3 = _x$11;
                        break _L$3;
                      }
                      case 70: {
                        const _tmp$16 = _rest.str;
                        const _bind$7 = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_rest.str, 3, _rest.start, _rest.end);
                        let _tmp$17;
                        if (_bind$7 === undefined) {
                          _tmp$17 = _rest.end;
                        } else {
                          const _Some = _bind$7;
                          _tmp$17 = _Some;
                        }
                        const _tmp$18 = _tmp$17;
                        const _x$12 = { str: _tmp$16, start: _tmp$18, end: _rest.end };
                        rest$3 = _x$12;
                        break _L$3;
                      }
                      default: {
                        break _L$2;
                      }
                    }
                  }
                  case 78: {
                    const _x$13 = moonbitlang$core$string$$String$unsafe_char_at(_rest.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_rest.str, 2, _rest.start, _rest.end));
                    switch (_x$13) {
                      case 102: {
                        const _tmp$19 = _rest.str;
                        const _bind$8 = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_rest.str, 3, _rest.start, _rest.end);
                        let _tmp$20;
                        if (_bind$8 === undefined) {
                          _tmp$20 = _rest.end;
                        } else {
                          const _Some = _bind$8;
                          _tmp$20 = _Some;
                        }
                        const _tmp$21 = _tmp$20;
                        const _x$14 = { str: _tmp$19, start: _tmp$21, end: _rest.end };
                        rest$3 = _x$14;
                        break _L$3;
                      }
                      case 70: {
                        const _tmp$22 = _rest.str;
                        const _bind$9 = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_rest.str, 3, _rest.start, _rest.end);
                        let _tmp$23;
                        if (_bind$9 === undefined) {
                          _tmp$23 = _rest.end;
                        } else {
                          const _Some = _bind$9;
                          _tmp$23 = _Some;
                        }
                        const _tmp$24 = _tmp$23;
                        const _x$15 = { str: _tmp$22, start: _tmp$24, end: _rest.end };
                        rest$3 = _x$15;
                        break _L$3;
                      }
                      default: {
                        break _L$2;
                      }
                    }
                  }
                  default: {
                    break _L$2;
                  }
                }
              }
              default: {
                break _L$2;
              }
            }
          } else {
            break _L$2;
          }
        }
      }
      return new Result$Ok$7$(moonbitlang$core$double$$not_a_number);
    }
    _L$4: {
      _L$5: {
        if (moonbitlang$core$string$$String$char_length_eq$46$inner(rest$3.str, 0, rest$3.start, rest$3.end)) {
          break _L$5;
        } else {
          if (moonbitlang$core$string$$String$char_length_eq$46$inner(rest$3.str, 5, rest$3.start, rest$3.end)) {
            const _x = moonbitlang$core$string$$String$unsafe_char_at(rest$3.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(rest$3.str, 0, rest$3.start, rest$3.end));
            switch (_x) {
              case 105: {
                const _x$2 = moonbitlang$core$string$$String$unsafe_char_at(rest$3.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(rest$3.str, 1, rest$3.start, rest$3.end));
                switch (_x$2) {
                  case 110: {
                    const _x$3 = moonbitlang$core$string$$String$unsafe_char_at(rest$3.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(rest$3.str, 2, rest$3.start, rest$3.end));
                    switch (_x$3) {
                      case 105: {
                        const _x$4 = moonbitlang$core$string$$String$unsafe_char_at(rest$3.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(rest$3.str, 3, rest$3.start, rest$3.end));
                        switch (_x$4) {
                          case 116: {
                            const _x$5 = moonbitlang$core$string$$String$unsafe_char_at(rest$3.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(rest$3.str, 4, rest$3.start, rest$3.end));
                            switch (_x$5) {
                              case 121: {
                                break _L$5;
                              }
                              case 89: {
                                break _L$5;
                              }
                              default: {
                                break _L$4;
                              }
                            }
                          }
                          case 84: {
                            const _x$6 = moonbitlang$core$string$$String$unsafe_char_at(rest$3.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(rest$3.str, 4, rest$3.start, rest$3.end));
                            switch (_x$6) {
                              case 121: {
                                break _L$5;
                              }
                              case 89: {
                                break _L$5;
                              }
                              default: {
                                break _L$4;
                              }
                            }
                          }
                          default: {
                            break _L$4;
                          }
                        }
                      }
                      case 73: {
                        const _x$7 = moonbitlang$core$string$$String$unsafe_char_at(rest$3.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(rest$3.str, 3, rest$3.start, rest$3.end));
                        switch (_x$7) {
                          case 116: {
                            const _x$8 = moonbitlang$core$string$$String$unsafe_char_at(rest$3.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(rest$3.str, 4, rest$3.start, rest$3.end));
                            switch (_x$8) {
                              case 121: {
                                break _L$5;
                              }
                              case 89: {
                                break _L$5;
                              }
                              default: {
                                break _L$4;
                              }
                            }
                          }
                          case 84: {
                            const _x$9 = moonbitlang$core$string$$String$unsafe_char_at(rest$3.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(rest$3.str, 4, rest$3.start, rest$3.end));
                            switch (_x$9) {
                              case 121: {
                                break _L$5;
                              }
                              case 89: {
                                break _L$5;
                              }
                              default: {
                                break _L$4;
                              }
                            }
                          }
                          default: {
                            break _L$4;
                          }
                        }
                      }
                      default: {
                        break _L$4;
                      }
                    }
                  }
                  case 78: {
                    const _x$10 = moonbitlang$core$string$$String$unsafe_char_at(rest$3.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(rest$3.str, 2, rest$3.start, rest$3.end));
                    switch (_x$10) {
                      case 105: {
                        const _x$11 = moonbitlang$core$string$$String$unsafe_char_at(rest$3.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(rest$3.str, 3, rest$3.start, rest$3.end));
                        switch (_x$11) {
                          case 116: {
                            const _x$12 = moonbitlang$core$string$$String$unsafe_char_at(rest$3.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(rest$3.str, 4, rest$3.start, rest$3.end));
                            switch (_x$12) {
                              case 121: {
                                break _L$5;
                              }
                              case 89: {
                                break _L$5;
                              }
                              default: {
                                break _L$4;
                              }
                            }
                          }
                          case 84: {
                            const _x$13 = moonbitlang$core$string$$String$unsafe_char_at(rest$3.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(rest$3.str, 4, rest$3.start, rest$3.end));
                            switch (_x$13) {
                              case 121: {
                                break _L$5;
                              }
                              case 89: {
                                break _L$5;
                              }
                              default: {
                                break _L$4;
                              }
                            }
                          }
                          default: {
                            break _L$4;
                          }
                        }
                      }
                      case 73: {
                        const _x$14 = moonbitlang$core$string$$String$unsafe_char_at(rest$3.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(rest$3.str, 3, rest$3.start, rest$3.end));
                        switch (_x$14) {
                          case 116: {
                            const _x$15 = moonbitlang$core$string$$String$unsafe_char_at(rest$3.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(rest$3.str, 4, rest$3.start, rest$3.end));
                            switch (_x$15) {
                              case 121: {
                                break _L$5;
                              }
                              case 89: {
                                break _L$5;
                              }
                              default: {
                                break _L$4;
                              }
                            }
                          }
                          case 84: {
                            const _x$16 = moonbitlang$core$string$$String$unsafe_char_at(rest$3.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(rest$3.str, 4, rest$3.start, rest$3.end));
                            switch (_x$16) {
                              case 121: {
                                break _L$5;
                              }
                              case 89: {
                                break _L$5;
                              }
                              default: {
                                break _L$4;
                              }
                            }
                          }
                          default: {
                            break _L$4;
                          }
                        }
                      }
                      default: {
                        break _L$4;
                      }
                    }
                  }
                  default: {
                    break _L$4;
                  }
                }
              }
              case 73: {
                const _x$17 = moonbitlang$core$string$$String$unsafe_char_at(rest$3.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(rest$3.str, 1, rest$3.start, rest$3.end));
                switch (_x$17) {
                  case 110: {
                    const _x$18 = moonbitlang$core$string$$String$unsafe_char_at(rest$3.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(rest$3.str, 2, rest$3.start, rest$3.end));
                    switch (_x$18) {
                      case 105: {
                        const _x$19 = moonbitlang$core$string$$String$unsafe_char_at(rest$3.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(rest$3.str, 3, rest$3.start, rest$3.end));
                        switch (_x$19) {
                          case 116: {
                            const _x$20 = moonbitlang$core$string$$String$unsafe_char_at(rest$3.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(rest$3.str, 4, rest$3.start, rest$3.end));
                            switch (_x$20) {
                              case 121: {
                                break _L$5;
                              }
                              case 89: {
                                break _L$5;
                              }
                              default: {
                                break _L$4;
                              }
                            }
                          }
                          case 84: {
                            const _x$21 = moonbitlang$core$string$$String$unsafe_char_at(rest$3.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(rest$3.str, 4, rest$3.start, rest$3.end));
                            switch (_x$21) {
                              case 121: {
                                break _L$5;
                              }
                              case 89: {
                                break _L$5;
                              }
                              default: {
                                break _L$4;
                              }
                            }
                          }
                          default: {
                            break _L$4;
                          }
                        }
                      }
                      case 73: {
                        const _x$22 = moonbitlang$core$string$$String$unsafe_char_at(rest$3.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(rest$3.str, 3, rest$3.start, rest$3.end));
                        switch (_x$22) {
                          case 116: {
                            const _x$23 = moonbitlang$core$string$$String$unsafe_char_at(rest$3.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(rest$3.str, 4, rest$3.start, rest$3.end));
                            switch (_x$23) {
                              case 121: {
                                break _L$5;
                              }
                              case 89: {
                                break _L$5;
                              }
                              default: {
                                break _L$4;
                              }
                            }
                          }
                          case 84: {
                            const _x$24 = moonbitlang$core$string$$String$unsafe_char_at(rest$3.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(rest$3.str, 4, rest$3.start, rest$3.end));
                            switch (_x$24) {
                              case 121: {
                                break _L$5;
                              }
                              case 89: {
                                break _L$5;
                              }
                              default: {
                                break _L$4;
                              }
                            }
                          }
                          default: {
                            break _L$4;
                          }
                        }
                      }
                      default: {
                        break _L$4;
                      }
                    }
                  }
                  case 78: {
                    const _x$25 = moonbitlang$core$string$$String$unsafe_char_at(rest$3.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(rest$3.str, 2, rest$3.start, rest$3.end));
                    switch (_x$25) {
                      case 105: {
                        const _x$26 = moonbitlang$core$string$$String$unsafe_char_at(rest$3.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(rest$3.str, 3, rest$3.start, rest$3.end));
                        switch (_x$26) {
                          case 116: {
                            const _x$27 = moonbitlang$core$string$$String$unsafe_char_at(rest$3.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(rest$3.str, 4, rest$3.start, rest$3.end));
                            switch (_x$27) {
                              case 121: {
                                break _L$5;
                              }
                              case 89: {
                                break _L$5;
                              }
                              default: {
                                break _L$4;
                              }
                            }
                          }
                          case 84: {
                            const _x$28 = moonbitlang$core$string$$String$unsafe_char_at(rest$3.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(rest$3.str, 4, rest$3.start, rest$3.end));
                            switch (_x$28) {
                              case 121: {
                                break _L$5;
                              }
                              case 89: {
                                break _L$5;
                              }
                              default: {
                                break _L$4;
                              }
                            }
                          }
                          default: {
                            break _L$4;
                          }
                        }
                      }
                      case 73: {
                        const _x$29 = moonbitlang$core$string$$String$unsafe_char_at(rest$3.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(rest$3.str, 3, rest$3.start, rest$3.end));
                        switch (_x$29) {
                          case 116: {
                            const _x$30 = moonbitlang$core$string$$String$unsafe_char_at(rest$3.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(rest$3.str, 4, rest$3.start, rest$3.end));
                            switch (_x$30) {
                              case 121: {
                                break _L$5;
                              }
                              case 89: {
                                break _L$5;
                              }
                              default: {
                                break _L$4;
                              }
                            }
                          }
                          case 84: {
                            const _x$31 = moonbitlang$core$string$$String$unsafe_char_at(rest$3.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(rest$3.str, 4, rest$3.start, rest$3.end));
                            switch (_x$31) {
                              case 121: {
                                break _L$5;
                              }
                              case 89: {
                                break _L$5;
                              }
                              default: {
                                break _L$4;
                              }
                            }
                          }
                          default: {
                            break _L$4;
                          }
                        }
                      }
                      default: {
                        break _L$4;
                      }
                    }
                  }
                  default: {
                    break _L$4;
                  }
                }
              }
              default: {
                break _L$4;
              }
            }
          } else {
            break _L$4;
          }
        }
      }
      return _pos ? new Result$Ok$7$(moonbitlang$core$double$$infinity) : new Result$Ok$7$(moonbitlang$core$double$$neg_infinity);
    }
    return moonbitlang$core$strconv$$syntax_err$31$();
  }
  return moonbitlang$core$strconv$$syntax_err$31$();
}
function $moonbitlang$core$strconv$$moonbitlang$core$string$$StringView$fold_digits$6$(self, init, f) {
  let ret = init;
  let len = 0;
  let str = self;
  while (true) {
    const _bind = str;
    if (moonbitlang$core$string$$String$char_length_ge$46$inner(_bind.str, 1, _bind.start, _bind.end)) {
      const _ch = moonbitlang$core$string$$String$unsafe_char_at(_bind.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_bind.str, 0, _bind.start, _bind.end));
      const _tmp = _bind.str;
      const _bind$2 = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_bind.str, 1, _bind.start, _bind.end);
      let _tmp$2;
      if (_bind$2 === undefined) {
        _tmp$2 = _bind.end;
      } else {
        const _Some = _bind$2;
        _tmp$2 = _Some;
      }
      const _tmp$3 = _tmp$2;
      const _x = { str: _tmp, start: _tmp$3, end: _bind.end };
      if (_ch >= 48 && _ch <= 57) {
        len = len + 1 | 0;
        ret = f(_ch - 48 | 0, ret);
      } else {
        if (_ch !== 95) {
          break;
        }
      }
      str = _x;
      continue;
    } else {
      break;
    }
  }
  return { _0: str, _1: ret, _2: len };
}
function $moonbitlang$core$strconv$$moonbitlang$core$string$$StringView$fold_digits$35$(self, init, f) {
  let ret = init;
  let len = 0;
  let str = self;
  while (true) {
    const _bind = str;
    if (moonbitlang$core$string$$String$char_length_ge$46$inner(_bind.str, 1, _bind.start, _bind.end)) {
      const _ch = moonbitlang$core$string$$String$unsafe_char_at(_bind.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_bind.str, 0, _bind.start, _bind.end));
      const _tmp = _bind.str;
      const _bind$2 = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_bind.str, 1, _bind.start, _bind.end);
      let _tmp$2;
      if (_bind$2 === undefined) {
        _tmp$2 = _bind.end;
      } else {
        const _Some = _bind$2;
        _tmp$2 = _Some;
      }
      const _tmp$3 = _tmp$2;
      const _x = { str: _tmp, start: _tmp$3, end: _bind.end };
      if (_ch >= 48 && _ch <= 57) {
        len = len + 1 | 0;
        ret = f(_ch - 48 | 0, ret);
      } else {
        if (_ch !== 95) {
          break;
        }
      }
      str = _x;
      continue;
    } else {
      break;
    }
  }
  return { _0: str, _1: ret, _2: len };
}
function moonbitlang$core$strconv$$parse_digits(s, x) {
  return $moonbitlang$core$strconv$$moonbitlang$core$string$$StringView$fold_digits$6$(s, x, (digit, acc) => moonbitlang$core$builtin$$Add$add$6$(moonbitlang$core$builtin$$Mul$mul$6$(acc, $10L), moonbitlang$core$uint64$$UInt64$extend_uint(digit)));
}
function moonbitlang$core$strconv$$parse_scientific(s) {
  let s$2 = s;
  let neg_exp = false;
  let rest;
  let ch;
  _L: {
    _L$2: {
      const _bind = s$2;
      if (moonbitlang$core$string$$String$char_length_ge$46$inner(_bind.str, 1, _bind.start, _bind.end)) {
        const _x = moonbitlang$core$string$$String$unsafe_char_at(_bind.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_bind.str, 0, _bind.start, _bind.end));
        switch (_x) {
          case 43: {
            const _tmp = _bind.str;
            const _bind$2 = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_bind.str, 1, _bind.start, _bind.end);
            let _tmp$2;
            if (_bind$2 === undefined) {
              _tmp$2 = _bind.end;
            } else {
              const _Some = _bind$2;
              _tmp$2 = _Some;
            }
            const _tmp$3 = _tmp$2;
            const _x$2 = { str: _tmp, start: _tmp$3, end: _bind.end };
            rest = _x$2;
            ch = _x;
            break _L$2;
          }
          case 45: {
            const _tmp$4 = _bind.str;
            const _bind$3 = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_bind.str, 1, _bind.start, _bind.end);
            let _tmp$5;
            if (_bind$3 === undefined) {
              _tmp$5 = _bind.end;
            } else {
              const _Some = _bind$3;
              _tmp$5 = _Some;
            }
            const _tmp$6 = _tmp$5;
            const _x$3 = { str: _tmp$4, start: _tmp$6, end: _bind.end };
            rest = _x$3;
            ch = _x;
            break _L$2;
          }
        }
      }
      break _L;
    }
    neg_exp = ch === 45;
    s$2 = rest;
  }
  _L$2: {
    const _bind = s$2;
    if (moonbitlang$core$string$$String$char_length_ge$46$inner(_bind.str, 1, _bind.start, _bind.end)) {
      const _x = moonbitlang$core$string$$String$unsafe_char_at(_bind.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_bind.str, 0, _bind.start, _bind.end));
      if (_x >= 48 && _x <= 57) {
        const _bind$2 = $moonbitlang$core$strconv$$moonbitlang$core$string$$StringView$fold_digits$35$(s$2, moonbitlang$core$strconv$$parse_scientific$46$exp_num$124$306, (digit, exp_num) => moonbitlang$core$builtin$$Compare$op_lt$34$(exp_num, $65536L) ? moonbitlang$core$builtin$$Add$add$35$(moonbitlang$core$builtin$$Mul$mul$35$($10L, exp_num), moonbitlang$core$int$$Int$to_int64(digit)) : exp_num);
        const _s = _bind$2._0;
        const _exp_num = _bind$2._1;
        return neg_exp ? { _0: _s, _1: moonbitlang$core$builtin$$Neg$neg$35$(_exp_num) } : { _0: _s, _1: _exp_num };
      } else {
        break _L$2;
      }
    } else {
      break _L$2;
    }
  }
  return undefined;
}
function moonbitlang$core$strconv$$try_parse_19digits(s, x) {
  let x$2 = x;
  let len = 0;
  let _tmp = s;
  while (true) {
    const _param = _tmp;
    let s$2;
    _L: {
      if (moonbitlang$core$string$$String$char_length_ge$46$inner(_param.str, 1, _param.start, _param.end)) {
        const _x = moonbitlang$core$string$$String$unsafe_char_at(_param.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_param.str, 0, _param.start, _param.end));
        if (_x >= 48 && _x <= 57) {
          const _tmp$2 = _param.str;
          const _bind = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_param.str, 1, _param.start, _param.end);
          let _tmp$3;
          if (_bind === undefined) {
            _tmp$3 = _param.end;
          } else {
            const _Some = _bind;
            _tmp$3 = _Some;
          }
          const _tmp$4 = _tmp$3;
          const _x$2 = { str: _tmp$2, start: _tmp$4, end: _param.end };
          if (moonbitlang$core$builtin$$Compare$op_lt$36$(x$2, moonbitlang$core$strconv$$min_19digit_int)) {
            len = len + 1 | 0;
            x$2 = moonbitlang$core$builtin$$Add$add$6$(moonbitlang$core$builtin$$Mul$mul$6$(x$2, $10L), moonbitlang$core$uint64$$UInt64$extend_uint(_x - 48 | 0));
            _tmp = _x$2;
            continue;
          } else {
            s$2 = _param;
            break _L;
          }
        } else {
          if (_x === 95) {
            const _tmp$2 = _param.str;
            const _bind = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_param.str, 1, _param.start, _param.end);
            let _tmp$3;
            if (_bind === undefined) {
              _tmp$3 = _param.end;
            } else {
              const _Some = _bind;
              _tmp$3 = _Some;
            }
            const _tmp$4 = _tmp$3;
            const _x$2 = { str: _tmp$2, start: _tmp$4, end: _param.end };
            _tmp = _x$2;
            continue;
          } else {
            s$2 = _param;
            break _L;
          }
        }
      } else {
        s$2 = _param;
        break _L;
      }
    }
    return { _0: s$2, _1: x$2, _2: len };
  }
}
function moonbitlang$core$strconv$$parse_number(s) {
  let _bind;
  let rest;
  _L: {
    _L$2: {
      if (moonbitlang$core$string$$String$char_length_ge$46$inner(s.str, 1, s.start, s.end)) {
        const _x = moonbitlang$core$string$$String$unsafe_char_at(s.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(s.str, 0, s.start, s.end));
        switch (_x) {
          case 45: {
            const _tmp = s.str;
            const _bind$2 = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(s.str, 1, s.start, s.end);
            let _tmp$2;
            if (_bind$2 === undefined) {
              _tmp$2 = s.end;
            } else {
              const _Some = _bind$2;
              _tmp$2 = _Some;
            }
            const _tmp$3 = _tmp$2;
            const _x$2 = { str: _tmp, start: _tmp$3, end: s.end };
            _bind = { _0: _x$2, _1: true };
            break;
          }
          case 43: {
            const _tmp$4 = s.str;
            const _bind$3 = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(s.str, 1, s.start, s.end);
            let _tmp$5;
            if (_bind$3 === undefined) {
              _tmp$5 = s.end;
            } else {
              const _Some = _bind$3;
              _tmp$5 = _Some;
            }
            const _tmp$6 = _tmp$5;
            const _x$3 = { str: _tmp$4, start: _tmp$6, end: s.end };
            rest = _x$3;
            break _L$2;
          }
          default: {
            rest = s;
            break _L$2;
          }
        }
      } else {
        rest = s;
        break _L$2;
      }
      break _L;
    }
    _bind = { _0: rest, _1: false };
  }
  const _s = _bind._0;
  const _negative = _bind._1;
  if (moonbitlang$core$string$$StringView$is_empty(_s)) {
    return new Result$Ok$8$(undefined);
  }
  const _bind$2 = moonbitlang$core$strconv$$parse_digits(_s, $0L);
  const _s$2 = _bind$2._0;
  const _mantissa = _bind$2._1;
  const _consumed = _bind$2._2;
  let mantissa = _mantissa;
  let s$2 = _s$2;
  let n_digits = _consumed;
  let n_after_dot = 0;
  let exponent = $0L;
  const _bind$3 = s$2;
  if (moonbitlang$core$string$$String$char_length_ge$46$inner(_bind$3.str, 1, _bind$3.start, _bind$3.end)) {
    const _x = moonbitlang$core$string$$String$unsafe_char_at(_bind$3.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_bind$3.str, 0, _bind$3.start, _bind$3.end));
    if (_x === 46) {
      const _tmp = _bind$3.str;
      const _bind$4 = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_bind$3.str, 1, _bind$3.start, _bind$3.end);
      let _tmp$2;
      if (_bind$4 === undefined) {
        _tmp$2 = _bind$3.end;
      } else {
        const _Some = _bind$4;
        _tmp$2 = _Some;
      }
      const _tmp$3 = _tmp$2;
      const _x$2 = { str: _tmp, start: _tmp$3, end: _bind$3.end };
      s$2 = _x$2;
      const _bind$5 = moonbitlang$core$strconv$$parse_digits(s$2, mantissa);
      const _new_s = _bind$5._0;
      const _new_mantissa = _bind$5._1;
      const _consumed_digit = _bind$5._2;
      s$2 = _new_s;
      mantissa = _new_mantissa;
      n_after_dot = _consumed_digit;
      exponent = moonbitlang$core$builtin$$Neg$neg$35$(moonbitlang$core$int$$Int$to_int64(n_after_dot));
    }
  }
  n_digits = n_digits + n_after_dot | 0;
  if (n_digits === 0) {
    return new Result$Ok$8$(undefined);
  }
  let rest$2;
  _L$2: {
    _L$3: {
      const _bind$4 = s$2;
      if (moonbitlang$core$string$$String$char_length_ge$46$inner(_bind$4.str, 1, _bind$4.start, _bind$4.end)) {
        const _x = moonbitlang$core$string$$String$unsafe_char_at(_bind$4.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_bind$4.str, 0, _bind$4.start, _bind$4.end));
        switch (_x) {
          case 101: {
            const _tmp = _bind$4.str;
            const _bind$5 = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_bind$4.str, 1, _bind$4.start, _bind$4.end);
            let _tmp$2;
            if (_bind$5 === undefined) {
              _tmp$2 = _bind$4.end;
            } else {
              const _Some = _bind$5;
              _tmp$2 = _Some;
            }
            const _tmp$3 = _tmp$2;
            const _x$2 = { str: _tmp, start: _tmp$3, end: _bind$4.end };
            rest$2 = _x$2;
            break _L$3;
          }
          case 69: {
            const _tmp$4 = _bind$4.str;
            const _bind$6 = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_bind$4.str, 1, _bind$4.start, _bind$4.end);
            let _tmp$5;
            if (_bind$6 === undefined) {
              _tmp$5 = _bind$4.end;
            } else {
              const _Some = _bind$6;
              _tmp$5 = _Some;
            }
            const _tmp$6 = _tmp$5;
            const _x$3 = { str: _tmp$4, start: _tmp$6, end: _bind$4.end };
            rest$2 = _x$3;
            break _L$3;
          }
        }
      }
      break _L$2;
    }
    const _bind$4 = moonbitlang$core$strconv$$parse_scientific(rest$2);
    let _bind$5;
    if (_bind$4 === undefined) {
      return new Result$Ok$8$(undefined);
    } else {
      const _Some = _bind$4;
      _bind$5 = _Some;
    }
    const _new_s = _bind$5._0;
    const _exp_number = _bind$5._1;
    s$2 = _new_s;
    exponent = moonbitlang$core$builtin$$Add$add$35$(exponent, _exp_number);
  }
  const _bind$4 = s$2;
  if (moonbitlang$core$string$$String$char_length_eq$46$inner(_bind$4.str, 0, _bind$4.start, _bind$4.end)) {
    if (n_digits <= 19) {
      return new Result$Ok$8$({ exponent: exponent, mantissa: mantissa, negative: _negative, many_digits: false });
    }
    n_digits = n_digits - 19 | 0;
    let many_digits = false;
    let _tmp = s.str;
    let _tmp$2 = s.start;
    let _tmp$3 = s.end;
    _L$3: while (true) {
      const _param_str = _tmp;
      const _param_start = _tmp$2;
      const _param_end = _tmp$3;
      let rest$3;
      let ch;
      _L$4: {
        if (moonbitlang$core$string$$String$char_length_ge$46$inner(_param_str, 1, _param_start, _param_end)) {
          const _x = moonbitlang$core$string$$String$unsafe_char_at(_param_str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_param_str, 0, _param_start, _param_end));
          switch (_x) {
            case 48: {
              const _bind$5 = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_param_str, 1, _param_start, _param_end);
              let _tmp$4;
              if (_bind$5 === undefined) {
                _tmp$4 = _param_end;
              } else {
                const _Some = _bind$5;
                _tmp$4 = _Some;
              }
              const _x$2 = { str: _param_str, start: _tmp$4, end: _param_end };
              rest$3 = _x$2;
              ch = _x;
              break _L$4;
            }
            case 46: {
              const _bind$6 = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_param_str, 1, _param_start, _param_end);
              let _tmp$5;
              if (_bind$6 === undefined) {
                _tmp$5 = _param_end;
              } else {
                const _Some = _bind$6;
                _tmp$5 = _Some;
              }
              const _x$3 = { str: _param_str, start: _tmp$5, end: _param_end };
              rest$3 = _x$3;
              ch = _x;
              break _L$4;
            }
            default: {
              break _L$3;
            }
          }
        } else {
          break;
        }
      }
      n_digits = n_digits - ((ch - 46 | 0) / 2 | 0) | 0;
      _tmp = rest$3.str;
      _tmp$2 = rest$3.start;
      _tmp$3 = rest$3.end;
      continue;
    }
    let mantissa$2 = mantissa;
    if (n_digits > 0) {
      many_digits = true;
      mantissa$2 = $0L;
      const _bind$5 = moonbitlang$core$strconv$$try_parse_19digits(s, mantissa$2);
      const _s$3 = _bind$5._0;
      const _new_mantissa = _bind$5._1;
      const _consumed_digit = _bind$5._2;
      mantissa$2 = _new_mantissa;
      let _tmp$4;
      if (moonbitlang$core$builtin$$Compare$op_ge$36$(mantissa$2, moonbitlang$core$strconv$$min_19digit_int)) {
        _tmp$4 = _consumed_digit;
      } else {
        if (moonbitlang$core$string$$String$char_length_ge$46$inner(_s$3.str, 1, _s$3.start, _s$3.end)) {
          const _tmp$5 = _s$3.str;
          const _bind$6 = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(_s$3.str, 1, _s$3.start, _s$3.end);
          let _tmp$6;
          if (_bind$6 === undefined) {
            _tmp$6 = _s$3.end;
          } else {
            const _Some = _bind$6;
            _tmp$6 = _Some;
          }
          const _tmp$7 = _tmp$6;
          const _x = { str: _tmp$5, start: _tmp$7, end: _s$3.end };
          const _bind$7 = moonbitlang$core$strconv$$try_parse_19digits(_x, mantissa$2);
          const _new_mantissa$2 = _bind$7._1;
          const _consumed_digit$2 = _bind$7._2;
          mantissa$2 = _new_mantissa$2;
          _tmp$4 = _consumed_digit$2;
        } else {
          return new Result$Ok$8$(undefined);
        }
      }
      exponent = moonbitlang$core$int$$Int$to_int64(_tmp$4);
      exponent = moonbitlang$core$builtin$$Add$add$35$(exponent, moonbitlang$core$strconv$$parse_number$46$exp_number$124$287);
    }
    return new Result$Ok$8$({ exponent: exponent, mantissa: mantissa$2, negative: _negative, many_digits: many_digits });
  } else {
    return moonbitlang$core$strconv$$syntax_err$67$();
  }
}
function moonbitlang$core$strconv$$assemble_bits(mantissa, exponent, negative) {
  const biased_exp = exponent - moonbitlang$core$strconv$$double_info.bias | 0;
  let bits = moonbitlang$core$builtin$$BitAnd$land$35$(mantissa, moonbitlang$core$builtin$$Sub$sub$35$(moonbitlang$core$builtin$$Shl$shl$35$($1L, moonbitlang$core$strconv$$double_info.mantissa_bits), $1L));
  const exp_bits = moonbitlang$core$int$$Int$to_int64(biased_exp & ((1 << moonbitlang$core$strconv$$double_info.exponent_bits) - 1 | 0));
  bits = moonbitlang$core$builtin$$BitOr$lor$35$(bits, moonbitlang$core$builtin$$Shl$shl$35$(exp_bits, moonbitlang$core$strconv$$double_info.mantissa_bits));
  if (negative) {
    bits = moonbitlang$core$builtin$$BitOr$lor$35$(bits, moonbitlang$core$builtin$$Shl$shl$35$(moonbitlang$core$builtin$$Shl$shl$35$($1L, moonbitlang$core$strconv$$double_info.mantissa_bits), moonbitlang$core$strconv$$double_info.exponent_bits));
  }
  return bits;
}
function moonbitlang$core$strconv$$Decimal$should_round_up(self, d) {
  if (d < 0 || d >= self.digits_num) {
    return false;
  }
  let _tmp;
  const _tmp$2 = self.digits;
  $bound_check(_tmp$2, d);
  if (_tmp$2[d] === 5) {
    _tmp = (d + 1 | 0) === self.digits_num;
  } else {
    _tmp = false;
  }
  if (_tmp) {
    if (self.truncated) {
      return true;
    }
    let _tmp$3;
    if (d > 0) {
      const _tmp$4 = self.digits;
      const _tmp$5 = d - 1 | 0;
      $bound_check(_tmp$4, _tmp$5);
      _tmp$3 = (_tmp$4[_tmp$5] % 2 | 0) !== 0;
    } else {
      _tmp$3 = false;
    }
    return _tmp$3;
  }
  const _tmp$3 = self.digits;
  $bound_check(_tmp$3, d);
  return _tmp$3[d] >= 5;
}
function moonbitlang$core$strconv$$Decimal$rounded_integer(self) {
  if (self.decimal_point > 20) {
    return $_1L;
  }
  let n = $0L;
  let i = 0;
  while (true) {
    if (i < self.decimal_point && i < self.digits_num) {
      const _tmp = moonbitlang$core$builtin$$Mul$mul$35$(n, $10L);
      const _tmp$2 = self.digits;
      const _tmp$3 = i;
      $bound_check(_tmp$2, _tmp$3);
      n = moonbitlang$core$builtin$$Add$add$35$(_tmp, moonbitlang$core$byte$$Byte$to_int64(_tmp$2[_tmp$3]));
      i = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  while (true) {
    if (i < self.decimal_point) {
      n = moonbitlang$core$builtin$$Mul$mul$35$(n, $10L);
      i = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  if (moonbitlang$core$strconv$$Decimal$should_round_up(self, self.decimal_point)) {
    n = moonbitlang$core$builtin$$Add$add$35$(n, $1L);
  }
  return n;
}
function moonbitlang$core$strconv$$Decimal$new_digits(self, s) {
  $bound_check(moonbitlang$core$strconv$$left_shift_cheats, s);
  const new_digits = moonbitlang$core$strconv$$left_shift_cheats[s]._0;
  $bound_check(moonbitlang$core$strconv$$left_shift_cheats, s);
  const cheat_num = moonbitlang$core$strconv$$left_shift_cheats[s]._1;
  let less = false;
  const _end73 = cheat_num.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _end73) {
      if (i >= self.digits_num) {
        less = true;
        break;
      }
      const d = cheat_num.charCodeAt(i) - 48 | 0;
      const _tmp$2 = self.digits;
      $bound_check(_tmp$2, i);
      if (_tmp$2[i] !== d) {
        const _tmp$3 = self.digits;
        $bound_check(_tmp$3, i);
        less = _tmp$3[i] < d;
        break;
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return less ? new_digits - 1 | 0 : new_digits;
}
function moonbitlang$core$strconv$$Decimal$left_shift(self, s) {
  const new_digits = moonbitlang$core$strconv$$Decimal$new_digits(self, s);
  let read_index = self.digits_num;
  let write_index = self.digits_num + new_digits | 0;
  let acc = $0L;
  read_index = read_index - 1 | 0;
  while (true) {
    if (read_index >= 0) {
      const _tmp = self.digits;
      const _tmp$2 = read_index;
      $bound_check(_tmp, _tmp$2);
      const d = moonbitlang$core$byte$$Byte$to_int64(_tmp[_tmp$2]);
      acc = moonbitlang$core$builtin$$Add$add$35$(acc, moonbitlang$core$builtin$$Shl$shl$35$(d, s));
      const quo = moonbitlang$core$builtin$$Div$div$35$(acc, $10L);
      const rem = moonbitlang$core$int64$$Int64$to_int(moonbitlang$core$builtin$$Sub$sub$35$(acc, moonbitlang$core$builtin$$Mul$mul$35$(quo, $10L)));
      write_index = write_index - 1 | 0;
      if (write_index < self.digits.length) {
        const _tmp$3 = self.digits;
        const _tmp$4 = write_index;
        $bound_check(_tmp$3, _tmp$4);
        _tmp$3[_tmp$4] = rem & 255;
      } else {
        if (rem !== 0) {
          self.truncated = true;
        }
      }
      acc = quo;
      read_index = read_index - 1 | 0;
      continue;
    } else {
      break;
    }
  }
  while (true) {
    if (moonbitlang$core$builtin$$Compare$op_gt$34$(acc, $0L)) {
      const quo = moonbitlang$core$builtin$$Div$div$35$(acc, $10L);
      const rem = moonbitlang$core$int64$$Int64$to_int(moonbitlang$core$builtin$$Sub$sub$35$(acc, moonbitlang$core$builtin$$Mul$mul$35$($10L, quo)));
      write_index = write_index - 1 | 0;
      if (write_index < self.digits.length) {
        const _tmp = self.digits;
        const _tmp$2 = write_index;
        $bound_check(_tmp, _tmp$2);
        _tmp[_tmp$2] = rem & 255;
      } else {
        if (rem !== 0) {
          self.truncated = true;
        }
      }
      acc = quo;
      continue;
    } else {
      break;
    }
  }
  self.digits_num = self.digits_num + new_digits | 0;
  if (self.digits_num > self.digits.length) {
    self.digits_num = self.digits.length;
  }
  self.decimal_point = self.decimal_point + new_digits | 0;
  moonbitlang$core$strconv$$Decimal$trim(self);
}
function moonbitlang$core$strconv$$Decimal$right_shift(self, s) {
  let read_index = 0;
  let write_index = 0;
  let acc = $0L;
  while (true) {
    if (moonbitlang$core$builtin$$Eq$equal$6$(moonbitlang$core$builtin$$Shr$shr$6$(acc, s), $0L)) {
      if (read_index >= self.digits_num) {
        while (true) {
          if (moonbitlang$core$builtin$$Eq$equal$6$(moonbitlang$core$builtin$$Shr$shr$6$(acc, s), $0L)) {
            acc = moonbitlang$core$builtin$$Mul$mul$6$(acc, $10L);
            read_index = read_index + 1 | 0;
            continue;
          } else {
            break;
          }
        }
        break;
      }
      const _tmp = self.digits;
      const _tmp$2 = read_index;
      $bound_check(_tmp, _tmp$2);
      const d = _tmp[_tmp$2];
      acc = moonbitlang$core$builtin$$Add$add$6$(moonbitlang$core$builtin$$Mul$mul$6$(acc, $10L), moonbitlang$core$byte$$Byte$to_int64(d));
      read_index = read_index + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  self.decimal_point = self.decimal_point - (read_index - 1 | 0) | 0;
  const mask = moonbitlang$core$builtin$$Sub$sub$6$(moonbitlang$core$builtin$$Shl$shl$6$($1L, s), $1L);
  while (true) {
    if (read_index < self.digits_num) {
      const out = moonbitlang$core$builtin$$Shr$shr$6$(acc, s);
      const _tmp = self.digits;
      const _tmp$2 = write_index;
      $bound_check(_tmp, _tmp$2);
      _tmp[_tmp$2] = moonbitlang$core$uint64$$UInt64$to_byte(out);
      write_index = write_index + 1 | 0;
      acc = moonbitlang$core$builtin$$BitAnd$land$6$(acc, mask);
      const _tmp$3 = self.digits;
      const _tmp$4 = read_index;
      $bound_check(_tmp$3, _tmp$4);
      const d = _tmp$3[_tmp$4];
      acc = moonbitlang$core$builtin$$Add$add$6$(moonbitlang$core$builtin$$Mul$mul$6$(acc, $10L), moonbitlang$core$byte$$Byte$to_int64(d));
      read_index = read_index + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  while (true) {
    if (moonbitlang$core$builtin$$Compare$op_gt$36$(acc, $0L)) {
      const out = moonbitlang$core$builtin$$Shr$shr$6$(acc, s);
      if (write_index < self.digits.length) {
        const _tmp = self.digits;
        const _tmp$2 = write_index;
        $bound_check(_tmp, _tmp$2);
        _tmp[_tmp$2] = moonbitlang$core$uint64$$UInt64$to_byte(out);
        write_index = write_index + 1 | 0;
      } else {
        if (moonbitlang$core$builtin$$Compare$op_gt$36$(out, $0L)) {
          self.truncated = true;
        }
      }
      acc = moonbitlang$core$builtin$$BitAnd$land$6$(acc, mask);
      acc = moonbitlang$core$builtin$$Mul$mul$6$(acc, $10L);
      continue;
    } else {
      break;
    }
  }
  self.digits_num = write_index;
  moonbitlang$core$strconv$$Decimal$trim(self);
}
function moonbitlang$core$strconv$$Decimal$shift_priv(self, s) {
  if (self.digits_num === 0) {
    return undefined;
  }
  let s$2 = s;
  if (s$2 > 0) {
    while (true) {
      if (s$2 > 59) {
        moonbitlang$core$strconv$$Decimal$left_shift(self, 59);
        s$2 = s$2 - 59 | 0;
        continue;
      } else {
        break;
      }
    }
    moonbitlang$core$strconv$$Decimal$left_shift(self, s$2);
  }
  if (s$2 < 0) {
    while (true) {
      if (s$2 < -59) {
        moonbitlang$core$strconv$$Decimal$right_shift(self, 59);
        s$2 = s$2 + 59 | 0;
        continue;
      } else {
        break;
      }
    }
    moonbitlang$core$strconv$$Decimal$right_shift(self, -s$2 | 0);
    return;
  } else {
    return;
  }
}
function moonbitlang$core$strconv$$Decimal$to_double_priv(self) {
  let exponent = 0;
  let mantissa = $0L;
  if (self.digits_num === 0 || self.decimal_point < -330) {
    mantissa = $0L;
    exponent = moonbitlang$core$strconv$$double_info.bias;
    const bits = moonbitlang$core$strconv$$assemble_bits(mantissa, exponent, self.negative);
    return new Result$Ok$7$(moonbitlang$core$int64$$Int64$reinterpret_as_double(bits));
  }
  if (self.decimal_point > 310) {
    const _bind = moonbitlang$core$strconv$$range_err$11$();
    if (_bind.$tag === 1) {
      const _ok = _bind;
      _ok._0;
    } else {
      return _bind;
    }
  }
  while (true) {
    if (self.decimal_point > 0) {
      let n = 0;
      if (self.decimal_point >= moonbitlang$core$strconv$$powtab.length) {
        n = 60;
      } else {
        const _p = self.decimal_point;
        $bound_check(moonbitlang$core$strconv$$powtab, _p);
        n = moonbitlang$core$strconv$$powtab[_p];
      }
      moonbitlang$core$strconv$$Decimal$shift_priv(self, -n | 0);
      exponent = exponent + n | 0;
      continue;
    } else {
      break;
    }
  }
  while (true) {
    let _tmp;
    if (self.decimal_point < 0) {
      _tmp = true;
    } else {
      let _tmp$2;
      if (self.decimal_point === 0) {
        const _tmp$3 = self.digits;
        $bound_check(_tmp$3, 0);
        _tmp$2 = _tmp$3[0] < 5;
      } else {
        _tmp$2 = false;
      }
      _tmp = _tmp$2;
    }
    if (_tmp) {
      let n = 0;
      if ((-self.decimal_point | 0) >= moonbitlang$core$strconv$$powtab.length) {
        n = 60;
      } else {
        const _p = -self.decimal_point | 0;
        $bound_check(moonbitlang$core$strconv$$powtab, _p);
        n = moonbitlang$core$strconv$$powtab[_p];
      }
      moonbitlang$core$strconv$$Decimal$shift_priv(self, n);
      exponent = exponent - n | 0;
      continue;
    } else {
      break;
    }
  }
  exponent = exponent - 1 | 0;
  if (exponent < (moonbitlang$core$strconv$$double_info.bias + 1 | 0)) {
    const n = (moonbitlang$core$strconv$$double_info.bias + 1 | 0) - exponent | 0;
    moonbitlang$core$strconv$$Decimal$shift_priv(self, -n | 0);
    exponent = exponent + n | 0;
  }
  if ((exponent - moonbitlang$core$strconv$$double_info.bias | 0) >= ((1 << moonbitlang$core$strconv$$double_info.exponent_bits) - 1 | 0)) {
    const _bind = moonbitlang$core$strconv$$range_err$11$();
    if (_bind.$tag === 1) {
      const _ok = _bind;
      _ok._0;
    } else {
      return _bind;
    }
  }
  moonbitlang$core$strconv$$Decimal$shift_priv(self, moonbitlang$core$strconv$$double_info.mantissa_bits + 1 | 0);
  mantissa = moonbitlang$core$strconv$$Decimal$rounded_integer(self);
  if (moonbitlang$core$builtin$$Eq$equal$35$(mantissa, moonbitlang$core$builtin$$Shl$shl$35$($2L, moonbitlang$core$strconv$$double_info.mantissa_bits))) {
    mantissa = moonbitlang$core$builtin$$Shr$shr$35$(mantissa, 1);
    exponent = exponent + 1 | 0;
    if ((exponent - moonbitlang$core$strconv$$double_info.bias | 0) >= ((1 << moonbitlang$core$strconv$$double_info.exponent_bits) - 1 | 0)) {
      const _bind = moonbitlang$core$strconv$$range_err$11$();
      if (_bind.$tag === 1) {
        const _ok = _bind;
        _ok._0;
      } else {
        return _bind;
      }
    }
  }
  if (moonbitlang$core$builtin$$Eq$equal$35$(moonbitlang$core$builtin$$BitAnd$land$35$(mantissa, moonbitlang$core$builtin$$Shl$shl$35$($1L, moonbitlang$core$strconv$$double_info.mantissa_bits)), $0L)) {
    exponent = moonbitlang$core$strconv$$double_info.bias;
  }
  const bits = moonbitlang$core$strconv$$assemble_bits(mantissa, exponent, self.negative);
  return new Result$Ok$7$(moonbitlang$core$int64$$Int64$reinterpret_as_double(bits));
}
function moonbitlang$core$strconv$$checked_mul(a, b) {
  if (moonbitlang$core$builtin$$Eq$equal$6$(a, $0L) || moonbitlang$core$builtin$$Eq$equal$6$(b, $0L)) {
    return moonbitlang$core$strconv$$checked_mul$46$constr$47$2138;
  }
  if (moonbitlang$core$builtin$$Eq$equal$6$(a, $1L)) {
    return b;
  }
  if (moonbitlang$core$builtin$$Eq$equal$6$(b, $1L)) {
    return a;
  }
  if (moonbitlang$core$uint64$$UInt64$clz(b) === 0 || moonbitlang$core$uint64$$UInt64$clz(a) === 0) {
    return undefined;
  }
  const quotient = moonbitlang$core$builtin$$Div$div$6$(moonbitlang$core$uint64$$max_value, b);
  if (moonbitlang$core$builtin$$Compare$op_gt$36$(a, quotient)) {
    return undefined;
  }
  return moonbitlang$core$builtin$$Mul$mul$6$(a, b);
}
function moonbitlang$core$strconv$$pow10_fast_path(exponent) {
  const _p = exponent & 31;
  $bound_check(moonbitlang$core$strconv$$table, _p);
  return moonbitlang$core$strconv$$table[_p];
}
function moonbitlang$core$strconv$$Number$is_fast_path(self) {
  return moonbitlang$core$builtin$$Compare$op_le$34$(moonbitlang$core$strconv$$min_exponent_fast_path, self.exponent) && (moonbitlang$core$builtin$$Compare$op_le$34$(self.exponent, moonbitlang$core$strconv$$max_exponent_disguised_fast_path) && (moonbitlang$core$builtin$$Compare$op_le$36$(self.mantissa, moonbitlang$core$strconv$$max_mantissa_fast_path) && !self.many_digits));
}
function moonbitlang$core$strconv$$Number$try_fast_path(self) {
  if (moonbitlang$core$strconv$$Number$is_fast_path(self)) {
    let value;
    if (moonbitlang$core$builtin$$Compare$op_le$34$(self.exponent, moonbitlang$core$strconv$$max_exponent_fast_path)) {
      const value$2 = moonbitlang$core$double$$Double$convert_uint64(self.mantissa);
      value = moonbitlang$core$builtin$$Compare$op_lt$34$(self.exponent, $0L) ? value$2 / moonbitlang$core$strconv$$pow10_fast_path(-moonbitlang$core$int64$$Int64$to_int(self.exponent) | 0) : value$2 * moonbitlang$core$strconv$$pow10_fast_path(moonbitlang$core$int64$$Int64$to_int(self.exponent));
    } else {
      const shift = moonbitlang$core$builtin$$Sub$sub$35$(self.exponent, moonbitlang$core$strconv$$max_exponent_fast_path);
      const _tmp = self.mantissa;
      const _p = moonbitlang$core$int64$$Int64$to_int(shift);
      $bound_check(moonbitlang$core$strconv$$int_pow10, _p);
      const _bind = moonbitlang$core$strconv$$checked_mul(_tmp, moonbitlang$core$strconv$$int_pow10[_p]);
      let mantissa;
      if (_bind === undefined) {
        return Option$None$11$;
      } else {
        const _Some = _bind;
        mantissa = _Some;
      }
      if (moonbitlang$core$builtin$$Compare$op_gt$36$(mantissa, moonbitlang$core$strconv$$max_mantissa_fast_path)) {
        return Option$None$11$;
      }
      value = moonbitlang$core$double$$Double$convert_uint64(mantissa) * moonbitlang$core$strconv$$pow10_fast_path(moonbitlang$core$int64$$Int64$to_int(moonbitlang$core$strconv$$max_exponent_fast_path));
    }
    if (self.negative) {
      value = -value;
    }
    return new Option$Some$11$(value);
  } else {
    return Option$None$11$;
  }
}
function moonbitlang$core$strconv$$parse_double(str) {
  if ((str.end - str.start | 0) > 0) {
    if (moonbitlang$core$strconv$$check_underscore(str)) {
      const _bind = moonbitlang$core$strconv$$parse_number(str);
      let _bind$2;
      if (_bind.$tag === 1) {
        const _ok = _bind;
        _bind$2 = _ok._0;
      } else {
        return _bind;
      }
      if (_bind$2 === undefined) {
        return moonbitlang$core$strconv$$parse_inf_nan(str);
      } else {
        const _Some = _bind$2;
        const _num = _Some;
        const _bind$3 = moonbitlang$core$strconv$$Number$try_fast_path(_num);
        if (_bind$3.$tag === 1) {
          const _Some$2 = _bind$3;
          const _value = _Some$2._0;
          return new Result$Ok$7$(_value);
        } else {
          const _bind$4 = moonbitlang$core$strconv$$parse_decimal_priv(str);
          let _tmp;
          if (_bind$4.$tag === 1) {
            const _ok = _bind$4;
            _tmp = _ok._0;
          } else {
            return _bind$4;
          }
          return moonbitlang$core$strconv$$Decimal$to_double_priv(_tmp);
        }
      }
    } else {
      return moonbitlang$core$strconv$$syntax_err$31$();
    }
  } else {
    return moonbitlang$core$strconv$$syntax_err$31$();
  }
}
function moonbitlang$core$builtin$$Show$output$44$(self, logger) {
  const _StrConvError = self;
  const _err = _StrConvError._0;
  logger.method_table.method_0(logger.self, _err);
}
function moonbitlang$core$builtin$$Show$output$42$(_x_643, _x_644) {
  const _JsonDecodeError = _x_643;
  const _$42$err_payload_645 = _JsonDecodeError._0;
  _x_644.method_table.method_0(_x_644.self, "JsonDecodeError(");
  const _$42$x0_646 = _$42$err_payload_645._0;
  const _$42$x1_647 = _$42$err_payload_645._1;
  _x_644.method_table.method_0(_x_644.self, "(");
  moonbitlang$core$builtin$$Logger$write_object$18$(_x_644, _$42$x0_646);
  _x_644.method_table.method_0(_x_644.self, ", ");
  moonbitlang$core$builtin$$Logger$write_object$19$(_x_644, _$42$x1_647);
  _x_644.method_table.method_0(_x_644.self, ")");
  _x_644.method_table.method_0(_x_644.self, ")");
}
function moonbitlang$core$json$$offset_to_position(input, offset) {
  let line = 1;
  let column = 0;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < offset) {
      const _tmp$2 = input.str;
      const _tmp$3 = input.start + i | 0;
      if (_tmp$2.charCodeAt(_tmp$3) === 10) {
        line = line + 1 | 0;
        column = 0;
      } else {
        column = column + 1 | 0;
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return { line: line, column: column };
}
function moonbitlang$core$json$$ParseContext$invalid_char$46$inner$8$(ctx, shift) {
  const offset = ctx.offset + shift | 0;
  const _p = moonbitlang$core$string$$StringView$get_char(ctx.input, offset);
  const _p$2 = 65533;
  return new Result$Err$12$(new Error$moonbitlang$47$core$47$json$46$ParseError$46$InvalidChar(moonbitlang$core$json$$offset_to_position(ctx.input, offset), _p === -1 ? _p$2 : _p));
}
function moonbitlang$core$json$$ParseContext$invalid_char$46$inner$11$(ctx, shift) {
  const offset = ctx.offset + shift | 0;
  const _p = moonbitlang$core$string$$StringView$get_char(ctx.input, offset);
  const _p$2 = 65533;
  return new Result$Err$13$(new Error$moonbitlang$47$core$47$json$46$ParseError$46$InvalidChar(moonbitlang$core$json$$offset_to_position(ctx.input, offset), _p === -1 ? _p$2 : _p));
}
function moonbitlang$core$json$$ParseContext$invalid_char$46$inner$69$(ctx, shift) {
  const offset = ctx.offset + shift | 0;
  const _p = moonbitlang$core$string$$StringView$get_char(ctx.input, offset);
  const _p$2 = 65533;
  return new Result$Err$14$(new Error$moonbitlang$47$core$47$json$46$ParseError$46$InvalidChar(moonbitlang$core$json$$offset_to_position(ctx.input, offset), _p === -1 ? _p$2 : _p));
}
function moonbitlang$core$json$$ParseContext$invalid_char$46$inner$70$(ctx, shift) {
  const offset = ctx.offset + shift | 0;
  const _p = moonbitlang$core$string$$StringView$get_char(ctx.input, offset);
  const _p$2 = 65533;
  return new Result$Err$15$(new Error$moonbitlang$47$core$47$json$46$ParseError$46$InvalidChar(moonbitlang$core$json$$offset_to_position(ctx.input, offset), _p === -1 ? _p$2 : _p));
}
function moonbitlang$core$builtin$$Show$output$43$(self, logger) {
  switch (self.$tag) {
    case 7: {
      const _InvalidChar = self;
      const _x = _InvalidChar._0;
      const _line = _x.line;
      const _column = _x.column;
      const _c = _InvalidChar._1;
      logger.method_table.method_0(logger.self, "Invalid character ");
      logger.method_table.method_0(logger.self, moonbitlang$core$builtin$$repr$45$(_c));
      logger.method_table.method_0(logger.self, " at line ");
      moonbitlang$core$builtin$$Logger$write_object$16$(logger, _line);
      logger.method_table.method_0(logger.self, ", column ");
      moonbitlang$core$builtin$$Logger$write_object$16$(logger, _column);
      return;
    }
    case 6: {
      logger.method_table.method_0(logger.self, "Unexpected end of file");
      return;
    }
    case 5: {
      const _InvalidNumber = self;
      const _x$2 = _InvalidNumber._0;
      const _line$2 = _x$2.line;
      const _column$2 = _x$2.column;
      const _s = _InvalidNumber._1;
      logger.method_table.method_0(logger.self, "Invalid number ");
      logger.method_table.method_0(logger.self, _s);
      logger.method_table.method_0(logger.self, " at line ");
      moonbitlang$core$builtin$$Logger$write_object$16$(logger, _line$2);
      logger.method_table.method_0(logger.self, ", column ");
      moonbitlang$core$builtin$$Logger$write_object$16$(logger, _column$2);
      return;
    }
    case 4: {
      const _InvalidIdentEscape = self;
      const _x$3 = _InvalidIdentEscape._0;
      const _line$3 = _x$3.line;
      const _column$3 = _x$3.column;
      logger.method_table.method_0(logger.self, "Invalid escape sequence in identifier at line ");
      moonbitlang$core$builtin$$Logger$write_object$16$(logger, _line$3);
      logger.method_table.method_0(logger.self, ", column ");
      moonbitlang$core$builtin$$Logger$write_object$16$(logger, _column$3);
      return;
    }
    default: {
      logger.method_table.method_0(logger.self, "Depth limit exceeded, please increase the max_nesting_depth parameter");
      return;
    }
  }
}
function moonbitlang$core$json$$decode_error$71$(path, msg) {
  return new Result$Err$1$(new Error$moonbitlang$47$core$47$json$46$JsonDecodeError$46$JsonDecodeError({ _0: path, _1: msg }));
}
function moonbitlang$core$json$$decode_error$72$(path, msg) {
  return new Result$Err$16$(new Error$moonbitlang$47$core$47$json$46$JsonDecodeError$46$JsonDecodeError({ _0: path, _1: msg }));
}
function moonbitlang$core$json$$decode_error$16$(path, msg) {
  return new Result$Err$17$(new Error$moonbitlang$47$core$47$json$46$JsonDecodeError$46$JsonDecodeError({ _0: path, _1: msg }));
}
function moonbitlang$core$json$$decode_error$11$(path, msg) {
  return new Result$Err$18$(new Error$moonbitlang$47$core$47$json$46$JsonDecodeError$46$JsonDecodeError({ _0: path, _1: msg }));
}
function moonbitlang$core$json$$decode_error$73$(path, msg) {
  return new Result$Err$2$(new Error$moonbitlang$47$core$47$json$46$JsonDecodeError$46$JsonDecodeError({ _0: path, _1: msg }));
}
function moonbitlang$core$json$$decode_error$19$(path, msg) {
  return new Result$Err$19$(new Error$moonbitlang$47$core$47$json$46$JsonDecodeError$46$JsonDecodeError({ _0: path, _1: msg }));
}
function moonbitlang$core$json$$ParseContext$read_char(ctx) {
  if (ctx.offset < ctx.end_offset) {
    const _p = ctx.input;
    const _p$2 = ctx.offset;
    const _tmp = _p.str;
    const _tmp$2 = _p.start + _p$2 | 0;
    const c1 = _tmp.charCodeAt(_tmp$2);
    ctx.offset = ctx.offset + 1 | 0;
    if (c1 >= 55296 && c1 <= 56319) {
      if (ctx.offset < ctx.end_offset) {
        const _p$3 = ctx.input;
        const _p$4 = ctx.offset;
        const _tmp$3 = _p$3.str;
        const _tmp$4 = _p$3.start + _p$4 | 0;
        const c2 = _tmp$3.charCodeAt(_tmp$4);
        if (c2 >= 56320 && c2 <= 57343) {
          ctx.offset = ctx.offset + 1 | 0;
          const c3 = ((c1 << 10) + c2 | 0) - 56613888 | 0;
          return c3;
        }
      }
    }
    return c1;
  } else {
    return -1;
  }
}
function moonbitlang$core$json$$ParseContext$lex_skip_whitespace(ctx) {
  _L: while (true) {
    _L$2: {
      _L$3: {
        const _bind = moonbitlang$core$json$$ParseContext$read_char(ctx);
        if (_bind === -1) {
          break;
        } else {
          const _Some = _bind;
          const _x = _Some;
          switch (_x) {
            case 9: {
              break _L$3;
            }
            case 32: {
              break _L$3;
            }
            case 10: {
              break _L$3;
            }
            case 13: {
              break _L$3;
            }
            default: {
              ctx.offset = ctx.offset - 1 | 0;
              break _L;
            }
          }
        }
      }
      break _L$2;
    }
    continue;
  }
}
function moonbitlang$core$json$$ParseContext$make(input, max_nesting_depth) {
  return { offset: 0, input: input, end_offset: input.end - input.start | 0, remaining_available_depth: max_nesting_depth };
}
function moonbitlang$core$json$$ParseContext$expect_ascii_char(ctx, c) {
  if (ctx.offset < ctx.end_offset) {
    const _p = ctx.input;
    const _p$2 = ctx.offset;
    const _tmp = _p.str;
    const _tmp$2 = _p.start + _p$2 | 0;
    const c1 = _tmp.charCodeAt(_tmp$2);
    ctx.offset = ctx.offset + 1 | 0;
    return c !== c1 ? moonbitlang$core$json$$ParseContext$invalid_char$46$inner$11$(ctx, -1) : new Result$Ok$13$(undefined);
  } else {
    return new Result$Err$13$(Error$moonbitlang$47$core$47$json$46$ParseError$46$InvalidEof);
  }
}
function moonbitlang$core$json$$ParseContext$lex_number_end(ctx, start, end) {
  const s = moonbitlang$core$string$$StringView$view$46$inner(ctx.input, start, end);
  if (!moonbitlang$core$string$$StringView$contains(s, { str: moonbitlang$core$json$$lex_number_end$46$42$bind$124$1058, start: 0, end: moonbitlang$core$json$$lex_number_end$46$42$bind$124$1058.length }) && (!moonbitlang$core$string$$StringView$contains(s, { str: moonbitlang$core$json$$lex_number_end$46$42$bind$124$1059, start: 0, end: moonbitlang$core$json$$lex_number_end$46$42$bind$124$1059.length }) && !moonbitlang$core$string$$StringView$contains(s, { str: moonbitlang$core$json$$lex_number_end$46$42$bind$124$1060, start: 0, end: moonbitlang$core$json$$lex_number_end$46$42$bind$124$1060.length }))) {
    let parsed_int;
    let _try_err;
    _L: {
      _L$2: {
        const _bind = moonbitlang$core$strconv$$parse_int64$46$inner(s, 0);
        let _tmp;
        if (_bind.$tag === 1) {
          const _ok = _bind;
          _tmp = _ok._0;
        } else {
          const _err = _bind;
          const _tmp$2 = _err._0;
          _try_err = _tmp$2;
          break _L$2;
        }
        parsed_int = new Result$Ok$4$(_tmp);
        break _L;
      }
      parsed_int = new Result$Err$4$(_try_err);
    }
    _L$2: {
      if (parsed_int.$tag === 1) {
        const _Ok = parsed_int;
        const _i = _Ok._0;
        if (moonbitlang$core$builtin$$Compare$op_le$34$(_i, $9007199254740991L) && moonbitlang$core$builtin$$Compare$op_ge$34$(_i, $_9007199254740991L)) {
          return { _0: moonbitlang$core$int64$$Int64$to_double(_i), _1: undefined };
        } else {
          break _L$2;
        }
      } else {
        break _L$2;
      }
    }
    _L$3: {
      if (moonbitlang$core$string$$String$char_length_ge$46$inner(s.str, 1, s.start, s.end)) {
        const _x = moonbitlang$core$string$$String$unsafe_char_at(s.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(s.str, 0, s.start, s.end));
        if (_x === 45) {
          return { _0: moonbitlang$core$double$$neg_infinity, _1: s };
        } else {
          break _L$3;
        }
      } else {
        break _L$3;
      }
    }
    return { _0: moonbitlang$core$double$$infinity, _1: s };
  } else {
    let parsed_double;
    let _try_err;
    _L: {
      _L$2: {
        const _bind = moonbitlang$core$strconv$$parse_double(s);
        let _tmp;
        if (_bind.$tag === 1) {
          const _ok = _bind;
          _tmp = _ok._0;
        } else {
          const _err = _bind;
          const _tmp$2 = _err._0;
          _try_err = _tmp$2;
          break _L$2;
        }
        parsed_double = new Result$Ok$7$(_tmp);
        break _L;
      }
      parsed_double = new Result$Err$7$(_try_err);
    }
    if (parsed_double.$tag === 1) {
      const _Ok = parsed_double;
      const _d = _Ok._0;
      return { _0: _d, _1: undefined };
    } else {
      _L$2: {
        if (moonbitlang$core$string$$String$char_length_ge$46$inner(s.str, 1, s.start, s.end)) {
          const _x = moonbitlang$core$string$$String$unsafe_char_at(s.str, moonbitlang$core$string$$String$offset_of_nth_char$46$inner(s.str, 0, s.start, s.end));
          if (_x === 45) {
            return { _0: moonbitlang$core$double$$neg_infinity, _1: s };
          } else {
            break _L$2;
          }
        } else {
          break _L$2;
        }
      }
      return { _0: moonbitlang$core$double$$infinity, _1: s };
    }
  }
}
function moonbitlang$core$json$$ParseContext$lex_decimal_exponent_integer(ctx, start) {
  while (true) {
    _L: {
      const _bind = moonbitlang$core$json$$ParseContext$read_char(ctx);
      if (_bind === -1) {
        return moonbitlang$core$json$$ParseContext$lex_number_end(ctx, start, ctx.offset);
      } else {
        const _Some = _bind;
        const _c = _Some;
        if (_c >= 48 && _c <= 57) {
          break _L;
        }
        ctx.offset = ctx.offset - 1 | 0;
        return moonbitlang$core$json$$ParseContext$lex_number_end(ctx, start, ctx.offset);
      }
    }
    continue;
  }
}
function moonbitlang$core$json$$ParseContext$lex_decimal_exponent_sign(ctx, start) {
  const _bind = moonbitlang$core$json$$ParseContext$read_char(ctx);
  if (_bind === -1) {
    return new Result$Err$14$(Error$moonbitlang$47$core$47$json$46$ParseError$46$InvalidEof);
  } else {
    const _Some = _bind;
    const _c = _Some;
    if (_c >= 48 && _c <= 57) {
      return new Result$Ok$14$(moonbitlang$core$json$$ParseContext$lex_decimal_exponent_integer(ctx, start));
    }
    ctx.offset = ctx.offset - 1 | 0;
    return moonbitlang$core$json$$ParseContext$invalid_char$46$inner$69$(ctx, 0);
  }
}
function moonbitlang$core$json$$ParseContext$lex_decimal_exponent(ctx, start) {
  _L: {
    const _bind = moonbitlang$core$json$$ParseContext$read_char(ctx);
    if (_bind === -1) {
      return new Result$Err$14$(Error$moonbitlang$47$core$47$json$46$ParseError$46$InvalidEof);
    } else {
      const _Some = _bind;
      const _x = _Some;
      switch (_x) {
        case 43: {
          break _L;
        }
        case 45: {
          break _L;
        }
        default: {
          if (_x >= 48 && _x <= 57) {
            return new Result$Ok$14$(moonbitlang$core$json$$ParseContext$lex_decimal_exponent_integer(ctx, start));
          }
          ctx.offset = ctx.offset - 1 | 0;
          return moonbitlang$core$json$$ParseContext$invalid_char$46$inner$69$(ctx, 0);
        }
      }
    }
  }
  const _bind = moonbitlang$core$json$$ParseContext$lex_decimal_exponent_sign(ctx, start);
  let _tmp;
  if (_bind.$tag === 1) {
    const _ok = _bind;
    _tmp = _ok._0;
  } else {
    return _bind;
  }
  return new Result$Ok$14$(_tmp);
}
function moonbitlang$core$json$$ParseContext$lex_decimal_fraction(ctx, start) {
  while (true) {
    _L: {
      _L$2: {
        const _bind = moonbitlang$core$json$$ParseContext$read_char(ctx);
        if (_bind === -1) {
          return new Result$Ok$14$(moonbitlang$core$json$$ParseContext$lex_number_end(ctx, start, ctx.offset));
        } else {
          const _Some = _bind;
          const _x = _Some;
          switch (_x) {
            case 101: {
              break _L$2;
            }
            case 69: {
              break _L$2;
            }
            default: {
              if (_x >= 48 && _x <= 57) {
                break _L;
              }
              ctx.offset = ctx.offset - 1 | 0;
              return new Result$Ok$14$(moonbitlang$core$json$$ParseContext$lex_number_end(ctx, start, ctx.offset));
            }
          }
        }
      }
      const _bind = moonbitlang$core$json$$ParseContext$lex_decimal_exponent(ctx, start);
      let _tmp;
      if (_bind.$tag === 1) {
        const _ok = _bind;
        _tmp = _ok._0;
      } else {
        return _bind;
      }
      return new Result$Ok$14$(_tmp);
    }
    continue;
  }
}
function moonbitlang$core$json$$ParseContext$lex_decimal_point(ctx, start) {
  const _bind = moonbitlang$core$json$$ParseContext$read_char(ctx);
  if (_bind === -1) {
    return new Result$Err$14$(Error$moonbitlang$47$core$47$json$46$ParseError$46$InvalidEof);
  } else {
    const _Some = _bind;
    const _c = _Some;
    return _c >= 48 && _c <= 57 ? moonbitlang$core$json$$ParseContext$lex_decimal_fraction(ctx, start) : moonbitlang$core$json$$ParseContext$invalid_char$46$inner$69$(ctx, -1);
  }
}
function moonbitlang$core$json$$ParseContext$lex_decimal_integer(ctx, start) {
  while (true) {
    _L: {
      _L$2: {
        const _bind = moonbitlang$core$json$$ParseContext$read_char(ctx);
        if (_bind === -1) {
          return new Result$Ok$14$(moonbitlang$core$json$$ParseContext$lex_number_end(ctx, start, ctx.offset));
        } else {
          const _Some = _bind;
          const _x = _Some;
          switch (_x) {
            case 46: {
              const _bind$2 = moonbitlang$core$json$$ParseContext$lex_decimal_point(ctx, start);
              let _tmp;
              if (_bind$2.$tag === 1) {
                const _ok = _bind$2;
                _tmp = _ok._0;
              } else {
                return _bind$2;
              }
              return new Result$Ok$14$(_tmp);
            }
            case 101: {
              break _L$2;
            }
            case 69: {
              break _L$2;
            }
            default: {
              if (_x >= 48 && _x <= 57) {
                break _L;
              }
              ctx.offset = ctx.offset - 1 | 0;
              return new Result$Ok$14$(moonbitlang$core$json$$ParseContext$lex_number_end(ctx, start, ctx.offset));
            }
          }
        }
      }
      const _bind = moonbitlang$core$json$$ParseContext$lex_decimal_exponent(ctx, start);
      let _tmp;
      if (_bind.$tag === 1) {
        const _ok = _bind;
        _tmp = _ok._0;
      } else {
        return _bind;
      }
      return new Result$Ok$14$(_tmp);
    }
    continue;
  }
}
function moonbitlang$core$json$$ParseContext$lex_hex_digits(ctx, n) {
  let r = 0;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < n) {
      const _bind = moonbitlang$core$json$$ParseContext$read_char(ctx);
      if (_bind === -1) {
        return new Result$Err$20$(Error$moonbitlang$47$core$47$json$46$ParseError$46$InvalidEof);
      } else {
        const _Some = _bind;
        const _c = _Some;
        if (_c >= 65) {
          const d = ((_c & ~32) - 65 | 0) + 10 | 0;
          if (d > 15) {
            const _bind$2 = moonbitlang$core$json$$ParseContext$invalid_char$46$inner$11$(ctx, -1);
            if (_bind$2.$tag === 1) {
              const _ok = _bind$2;
              _ok._0;
            } else {
              return _bind$2;
            }
          }
          r = r << 4 | d;
        } else {
          if (_c >= 48) {
            const d = _c - 48 | 0;
            if (d > 9) {
              const _bind$2 = moonbitlang$core$json$$ParseContext$invalid_char$46$inner$11$(ctx, -1);
              if (_bind$2.$tag === 1) {
                const _ok = _bind$2;
                _ok._0;
              } else {
                return _bind$2;
              }
            }
            r = r << 4 | d;
          } else {
            const _bind$2 = moonbitlang$core$json$$ParseContext$invalid_char$46$inner$11$(ctx, -1);
            if (_bind$2.$tag === 1) {
              const _ok = _bind$2;
              _ok._0;
            } else {
              return _bind$2;
            }
          }
        }
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return new Result$Ok$20$(r);
}
function moonbitlang$core$json$$lex_string$46$flush$124$284(_env, end) {
  const start = _env._2;
  const buf = _env._1;
  const ctx = _env._0;
  if (start.val > 0 && end > start.val) {
    let _tmp;
    let _try_err;
    _L: {
      _L$2: {
        const _bind = moonbitlang$core$string$$StringView$sub$46$inner(ctx.input, start.val, end);
        if (_bind.$tag === 1) {
          const _ok = _bind;
          _tmp = _ok._0;
        } else {
          const _err = _bind;
          const _tmp$2 = _err._0;
          _try_err = _tmp$2;
          break _L$2;
        }
        break _L;
      }
      _tmp = $panic();
    }
    moonbitlang$core$builtin$$Logger$write_view$0$(buf, _tmp);
    return;
  } else {
    return;
  }
}
function moonbitlang$core$json$$ParseContext$lex_string(ctx) {
  const buf = moonbitlang$core$builtin$$StringBuilder$new$46$inner(0);
  const start = { val: ctx.offset };
  const _env = { _0: ctx, _1: buf, _2: start };
  _L: while (true) {
    _L$2: {
      _L$3: {
        _L$4: {
          const _bind = moonbitlang$core$json$$ParseContext$read_char(ctx);
          if (_bind === -1) {
            return new Result$Err$21$(Error$moonbitlang$47$core$47$json$46$ParseError$46$InvalidEof);
          } else {
            const _Some = _bind;
            const _x = _Some;
            switch (_x) {
              case 34: {
                moonbitlang$core$json$$lex_string$46$flush$124$284(_env, ctx.offset - 1 | 0);
                break _L;
              }
              case 10: {
                break _L$4;
              }
              case 13: {
                break _L$4;
              }
              case 92: {
                moonbitlang$core$json$$lex_string$46$flush$124$284(_env, ctx.offset - 1 | 0);
                const _bind$2 = moonbitlang$core$json$$ParseContext$read_char(ctx);
                if (_bind$2 === -1) {
                  return new Result$Err$21$(Error$moonbitlang$47$core$47$json$46$ParseError$46$InvalidEof);
                } else {
                  const _Some$2 = _bind$2;
                  const _x$2 = _Some$2;
                  switch (_x$2) {
                    case 98: {
                      moonbitlang$core$builtin$$Logger$write_char$0$(buf, 8);
                      break;
                    }
                    case 102: {
                      moonbitlang$core$builtin$$Logger$write_char$0$(buf, 12);
                      break;
                    }
                    case 110: {
                      moonbitlang$core$builtin$$Logger$write_char$0$(buf, 10);
                      break;
                    }
                    case 114: {
                      moonbitlang$core$builtin$$Logger$write_char$0$(buf, 13);
                      break;
                    }
                    case 116: {
                      moonbitlang$core$builtin$$Logger$write_char$0$(buf, 9);
                      break;
                    }
                    case 34: {
                      moonbitlang$core$builtin$$Logger$write_char$0$(buf, 34);
                      break;
                    }
                    case 92: {
                      moonbitlang$core$builtin$$Logger$write_char$0$(buf, 92);
                      break;
                    }
                    case 47: {
                      moonbitlang$core$builtin$$Logger$write_char$0$(buf, 47);
                      break;
                    }
                    case 117: {
                      const _bind$3 = moonbitlang$core$json$$ParseContext$lex_hex_digits(ctx, 4);
                      let c;
                      if (_bind$3.$tag === 1) {
                        const _ok = _bind$3;
                        c = _ok._0;
                      } else {
                        return _bind$3;
                      }
                      moonbitlang$core$builtin$$Logger$write_char$0$(buf, c);
                      break;
                    }
                    default: {
                      const _bind$4 = moonbitlang$core$json$$ParseContext$invalid_char$46$inner$11$(ctx, -1);
                      if (_bind$4.$tag === 1) {
                        const _ok = _bind$4;
                        _ok._0;
                      } else {
                        return _bind$4;
                      }
                    }
                  }
                }
                start.val = ctx.offset;
                break;
              }
              default: {
                if (_x < 32) {
                  const _bind$3 = moonbitlang$core$json$$ParseContext$invalid_char$46$inner$11$(ctx, -1);
                  if (_bind$3.$tag === 1) {
                    const _ok = _bind$3;
                    _ok._0;
                  } else {
                    return _bind$3;
                  }
                } else {
                  break _L$2;
                }
              }
            }
          }
          break _L$3;
        }
        const _bind = moonbitlang$core$json$$ParseContext$invalid_char$46$inner$11$(ctx, -1);
        if (_bind.$tag === 1) {
          const _ok = _bind;
          _ok._0;
        } else {
          return _bind;
        }
      }
      break _L$2;
    }
    continue;
  }
  return new Result$Ok$21$(buf.val);
}
function moonbitlang$core$json$$ParseContext$lex_zero(ctx, start) {
  _L: {
    const _bind = moonbitlang$core$json$$ParseContext$read_char(ctx);
    if (_bind === -1) {
      return new Result$Ok$14$(moonbitlang$core$json$$ParseContext$lex_number_end(ctx, start, ctx.offset));
    } else {
      const _Some = _bind;
      const _x = _Some;
      switch (_x) {
        case 46: {
          return moonbitlang$core$json$$ParseContext$lex_decimal_point(ctx, start);
        }
        case 101: {
          break _L;
        }
        case 69: {
          break _L;
        }
        default: {
          if (_x >= 48 && _x <= 57) {
            ctx.offset = ctx.offset - 1 | 0;
            const _bind$2 = moonbitlang$core$json$$ParseContext$invalid_char$46$inner$11$(ctx, 0);
            if (_bind$2.$tag === 1) {
              const _ok = _bind$2;
              _ok._0;
            } else {
              return _bind$2;
            }
          }
          ctx.offset = ctx.offset - 1 | 0;
          return new Result$Ok$14$(moonbitlang$core$json$$ParseContext$lex_number_end(ctx, start, ctx.offset));
        }
      }
    }
  }
  return moonbitlang$core$json$$ParseContext$lex_decimal_exponent(ctx, start);
}
function moonbitlang$core$json$$ParseContext$lex_value(ctx, allow_rbracket) {
  while (true) {
    _L: {
      _L$2: {
        _L$3: {
          const _bind = moonbitlang$core$json$$ParseContext$read_char(ctx);
          if (_bind === -1) {
            return new Result$Err$15$(Error$moonbitlang$47$core$47$json$46$ParseError$46$InvalidEof);
          } else {
            const _Some = _bind;
            const _x = _Some;
            if (_x === 9) {
              break _L$3;
            } else {
              if (_x === 32) {
                break _L$3;
              } else {
                if (_x === 10) {
                  break _L$3;
                } else {
                  if (_x === 13) {
                    break _L$3;
                  } else {
                    if (_x === 123) {
                      return new Result$Ok$15$($64$moonbitlang$47$core$47$json$46$Token$LBrace);
                    } else {
                      if (_x === 91) {
                        return new Result$Ok$15$($64$moonbitlang$47$core$47$json$46$Token$LBracket);
                      } else {
                        if (_x === 93) {
                          if (allow_rbracket) {
                            return new Result$Ok$15$($64$moonbitlang$47$core$47$json$46$Token$RBracket);
                          } else {
                            const _bind$2 = moonbitlang$core$json$$ParseContext$invalid_char$46$inner$11$(ctx, -1);
                            if (_bind$2.$tag === 1) {
                              const _ok = _bind$2;
                              _ok._0;
                            } else {
                              return _bind$2;
                            }
                          }
                        } else {
                          if (_x === 110) {
                            const _bind$2 = moonbitlang$core$json$$ParseContext$expect_ascii_char(ctx, 117);
                            if (_bind$2.$tag === 1) {
                              const _ok = _bind$2;
                              _ok._0;
                            } else {
                              return _bind$2;
                            }
                            const _bind$3 = moonbitlang$core$json$$ParseContext$expect_ascii_char(ctx, 108);
                            if (_bind$3.$tag === 1) {
                              const _ok = _bind$3;
                              _ok._0;
                            } else {
                              return _bind$3;
                            }
                            const _bind$4 = moonbitlang$core$json$$ParseContext$expect_ascii_char(ctx, 108);
                            if (_bind$4.$tag === 1) {
                              const _ok = _bind$4;
                              _ok._0;
                            } else {
                              return _bind$4;
                            }
                            return new Result$Ok$15$($64$moonbitlang$47$core$47$json$46$Token$Null);
                          } else {
                            if (_x === 116) {
                              const _bind$2 = moonbitlang$core$json$$ParseContext$expect_ascii_char(ctx, 114);
                              if (_bind$2.$tag === 1) {
                                const _ok = _bind$2;
                                _ok._0;
                              } else {
                                return _bind$2;
                              }
                              const _bind$3 = moonbitlang$core$json$$ParseContext$expect_ascii_char(ctx, 117);
                              if (_bind$3.$tag === 1) {
                                const _ok = _bind$3;
                                _ok._0;
                              } else {
                                return _bind$3;
                              }
                              const _bind$4 = moonbitlang$core$json$$ParseContext$expect_ascii_char(ctx, 101);
                              if (_bind$4.$tag === 1) {
                                const _ok = _bind$4;
                                _ok._0;
                              } else {
                                return _bind$4;
                              }
                              return new Result$Ok$15$($64$moonbitlang$47$core$47$json$46$Token$True);
                            } else {
                              if (_x === 102) {
                                const _bind$2 = moonbitlang$core$json$$ParseContext$expect_ascii_char(ctx, 97);
                                if (_bind$2.$tag === 1) {
                                  const _ok = _bind$2;
                                  _ok._0;
                                } else {
                                  return _bind$2;
                                }
                                const _bind$3 = moonbitlang$core$json$$ParseContext$expect_ascii_char(ctx, 108);
                                if (_bind$3.$tag === 1) {
                                  const _ok = _bind$3;
                                  _ok._0;
                                } else {
                                  return _bind$3;
                                }
                                const _bind$4 = moonbitlang$core$json$$ParseContext$expect_ascii_char(ctx, 115);
                                if (_bind$4.$tag === 1) {
                                  const _ok = _bind$4;
                                  _ok._0;
                                } else {
                                  return _bind$4;
                                }
                                const _bind$5 = moonbitlang$core$json$$ParseContext$expect_ascii_char(ctx, 101);
                                if (_bind$5.$tag === 1) {
                                  const _ok = _bind$5;
                                  _ok._0;
                                } else {
                                  return _bind$5;
                                }
                                return new Result$Ok$15$($64$moonbitlang$47$core$47$json$46$Token$False);
                              } else {
                                if (_x === 45) {
                                  const _bind$2 = moonbitlang$core$json$$ParseContext$read_char(ctx);
                                  if (_bind$2 === -1) {
                                    return new Result$Err$15$(Error$moonbitlang$47$core$47$json$46$ParseError$46$InvalidEof);
                                  } else {
                                    const _Some$2 = _bind$2;
                                    const _x$2 = _Some$2;
                                    if (_x$2 === 48) {
                                      const _bind$3 = moonbitlang$core$json$$ParseContext$lex_zero(ctx, ctx.offset - 2 | 0);
                                      let _bind$4;
                                      if (_bind$3.$tag === 1) {
                                        const _ok = _bind$3;
                                        _bind$4 = _ok._0;
                                      } else {
                                        return _bind$3;
                                      }
                                      const _n = _bind$4._0;
                                      const _repr = _bind$4._1;
                                      return new Result$Ok$15$(new $64$moonbitlang$47$core$47$json$46$Token$Number(_n, moonbitlang$core$option$$Option$map$55$(_repr, (_hole200) => moonbitlang$core$builtin$$Show$to_string$12$(_hole200))));
                                    } else {
                                      if (_x$2 >= 49 && _x$2 <= 57) {
                                        const _bind$3 = moonbitlang$core$json$$ParseContext$lex_decimal_integer(ctx, ctx.offset - 2 | 0);
                                        let _bind$4;
                                        if (_bind$3.$tag === 1) {
                                          const _ok = _bind$3;
                                          _bind$4 = _ok._0;
                                        } else {
                                          return _bind$3;
                                        }
                                        const _n = _bind$4._0;
                                        const _repr = _bind$4._1;
                                        return new Result$Ok$15$(new $64$moonbitlang$47$core$47$json$46$Token$Number(_n, moonbitlang$core$option$$Option$map$55$(_repr, (_hole205) => moonbitlang$core$builtin$$Show$to_string$12$(_hole205))));
                                      }
                                      const _bind$3 = moonbitlang$core$json$$ParseContext$invalid_char$46$inner$11$(ctx, -1);
                                      if (_bind$3.$tag === 1) {
                                        const _ok = _bind$3;
                                        _ok._0;
                                      } else {
                                        return _bind$3;
                                      }
                                    }
                                  }
                                } else {
                                  if (_x === 48) {
                                    const _bind$2 = moonbitlang$core$json$$ParseContext$lex_zero(ctx, ctx.offset - 1 | 0);
                                    let _bind$3;
                                    if (_bind$2.$tag === 1) {
                                      const _ok = _bind$2;
                                      _bind$3 = _ok._0;
                                    } else {
                                      return _bind$2;
                                    }
                                    const _n = _bind$3._0;
                                    const _repr = _bind$3._1;
                                    return new Result$Ok$15$(new $64$moonbitlang$47$core$47$json$46$Token$Number(_n, moonbitlang$core$option$$Option$map$55$(_repr, (_hole209) => moonbitlang$core$builtin$$Show$to_string$12$(_hole209))));
                                  } else {
                                    if (_x >= 49 && _x <= 57) {
                                      const _bind$2 = moonbitlang$core$json$$ParseContext$lex_decimal_integer(ctx, ctx.offset - 1 | 0);
                                      let _bind$3;
                                      if (_bind$2.$tag === 1) {
                                        const _ok = _bind$2;
                                        _bind$3 = _ok._0;
                                      } else {
                                        return _bind$2;
                                      }
                                      const _n = _bind$3._0;
                                      const _repr = _bind$3._1;
                                      return new Result$Ok$15$(new $64$moonbitlang$47$core$47$json$46$Token$Number(_n, moonbitlang$core$option$$Option$map$55$(_repr, (_hole213) => moonbitlang$core$builtin$$Show$to_string$12$(_hole213))));
                                    } else {
                                      if (_x === 34) {
                                        const _bind$2 = moonbitlang$core$json$$ParseContext$lex_string(ctx);
                                        let s;
                                        if (_bind$2.$tag === 1) {
                                          const _ok = _bind$2;
                                          s = _ok._0;
                                        } else {
                                          return _bind$2;
                                        }
                                        return new Result$Ok$15$(new $64$moonbitlang$47$core$47$json$46$Token$String(s));
                                      } else {
                                        const _p = _x;
                                        const shift = -(_p <= 65535 ? 1 : 2) | 0;
                                        const _bind$2 = moonbitlang$core$json$$ParseContext$invalid_char$46$inner$11$(ctx, shift);
                                        if (_bind$2.$tag === 1) {
                                          const _ok = _bind$2;
                                          _ok._0;
                                        } else {
                                          return _bind$2;
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          break _L$2;
        }
        break _L;
      }
      break _L;
    }
    continue;
  }
}
function moonbitlang$core$json$$ParseContext$lex_after_array_value(ctx) {
  moonbitlang$core$json$$ParseContext$lex_skip_whitespace(ctx);
  const _bind = moonbitlang$core$json$$ParseContext$read_char(ctx);
  if (_bind === -1) {
    return new Result$Err$15$(Error$moonbitlang$47$core$47$json$46$ParseError$46$InvalidEof);
  } else {
    const _Some = _bind;
    const _x = _Some;
    switch (_x) {
      case 93: {
        return new Result$Ok$15$($64$moonbitlang$47$core$47$json$46$Token$RBracket);
      }
      case 44: {
        return new Result$Ok$15$($64$moonbitlang$47$core$47$json$46$Token$Comma);
      }
      default: {
        return moonbitlang$core$json$$ParseContext$invalid_char$46$inner$70$(ctx, -1);
      }
    }
  }
}
function moonbitlang$core$json$$ParseContext$lex_after_object_value(ctx) {
  moonbitlang$core$json$$ParseContext$lex_skip_whitespace(ctx);
  const _bind = moonbitlang$core$json$$ParseContext$read_char(ctx);
  if (_bind === -1) {
    return new Result$Err$15$(Error$moonbitlang$47$core$47$json$46$ParseError$46$InvalidEof);
  } else {
    const _Some = _bind;
    const _x = _Some;
    switch (_x) {
      case 125: {
        return new Result$Ok$15$($64$moonbitlang$47$core$47$json$46$Token$RBrace);
      }
      case 44: {
        return new Result$Ok$15$($64$moonbitlang$47$core$47$json$46$Token$Comma);
      }
      default: {
        return moonbitlang$core$json$$ParseContext$invalid_char$46$inner$70$(ctx, -1);
      }
    }
  }
}
function moonbitlang$core$json$$ParseContext$lex_after_property_name(ctx) {
  moonbitlang$core$json$$ParseContext$lex_skip_whitespace(ctx);
  const _bind = moonbitlang$core$json$$ParseContext$read_char(ctx);
  if (_bind === -1) {
    return new Result$Err$13$(Error$moonbitlang$47$core$47$json$46$ParseError$46$InvalidEof);
  } else {
    const _Some = _bind;
    const _x = _Some;
    if (_x === 58) {
      return new Result$Ok$13$(undefined);
    } else {
      return moonbitlang$core$json$$ParseContext$invalid_char$46$inner$11$(ctx, -1);
    }
  }
}
function moonbitlang$core$json$$ParseContext$lex_property_name(ctx) {
  moonbitlang$core$json$$ParseContext$lex_skip_whitespace(ctx);
  const _bind = moonbitlang$core$json$$ParseContext$read_char(ctx);
  if (_bind === -1) {
    return new Result$Err$15$(Error$moonbitlang$47$core$47$json$46$ParseError$46$InvalidEof);
  } else {
    const _Some = _bind;
    const _x = _Some;
    switch (_x) {
      case 125: {
        return new Result$Ok$15$($64$moonbitlang$47$core$47$json$46$Token$RBrace);
      }
      case 34: {
        const _bind$2 = moonbitlang$core$json$$ParseContext$lex_string(ctx);
        let s;
        if (_bind$2.$tag === 1) {
          const _ok = _bind$2;
          s = _ok._0;
        } else {
          return _bind$2;
        }
        return new Result$Ok$15$(new $64$moonbitlang$47$core$47$json$46$Token$String(s));
      }
      default: {
        return moonbitlang$core$json$$ParseContext$invalid_char$46$inner$70$(ctx, -1);
      }
    }
  }
}
function moonbitlang$core$json$$ParseContext$lex_property_name2(ctx) {
  moonbitlang$core$json$$ParseContext$lex_skip_whitespace(ctx);
  const _bind = moonbitlang$core$json$$ParseContext$read_char(ctx);
  if (_bind === -1) {
    return new Result$Err$15$(Error$moonbitlang$47$core$47$json$46$ParseError$46$InvalidEof);
  } else {
    const _Some = _bind;
    const _x = _Some;
    if (_x === 34) {
      const _bind$2 = moonbitlang$core$json$$ParseContext$lex_string(ctx);
      let s;
      if (_bind$2.$tag === 1) {
        const _ok = _bind$2;
        s = _ok._0;
      } else {
        return _bind$2;
      }
      return new Result$Ok$15$(new $64$moonbitlang$47$core$47$json$46$Token$String(s));
    } else {
      return moonbitlang$core$json$$ParseContext$invalid_char$46$inner$70$(ctx, -1);
    }
  }
}
function moonbitlang$core$json$$ParseContext$parse_value(ctx) {
  const _bind = moonbitlang$core$json$$ParseContext$lex_value(ctx, false);
  let tok;
  if (_bind.$tag === 1) {
    const _ok = _bind;
    tok = _ok._0;
  } else {
    return _bind;
  }
  return moonbitlang$core$json$$ParseContext$parse_value2(ctx, tok);
}
function moonbitlang$core$json$$ParseContext$parse_value2(ctx, tok) {
  _L: {
    switch (tok.$tag) {
      case 0: {
        return new Result$Ok$12$(moonbitlang$core$builtin$$null);
      }
      case 1: {
        const _p = true;
        return new Result$Ok$12$(_p ? $64$moonbitlang$47$core$47$builtin$46$Json$True : $64$moonbitlang$47$core$47$builtin$46$Json$False);
      }
      case 2: {
        const _p$2 = false;
        return new Result$Ok$12$(_p$2 ? $64$moonbitlang$47$core$47$builtin$46$Json$True : $64$moonbitlang$47$core$47$builtin$46$Json$False);
      }
      case 3: {
        const _Number = tok;
        const _n = _Number._0;
        const _repr = _Number._1;
        return new Result$Ok$12$(new $64$moonbitlang$47$core$47$builtin$46$Json$Number(_n, _repr));
      }
      case 4: {
        const _String = tok;
        const _s = _String._0;
        return new Result$Ok$12$(new $64$moonbitlang$47$core$47$builtin$46$Json$String(_s));
      }
      case 5: {
        return moonbitlang$core$json$$ParseContext$parse_object(ctx);
      }
      case 7: {
        return moonbitlang$core$json$$ParseContext$parse_array(ctx);
      }
      case 8: {
        break _L;
      }
      case 6: {
        break _L;
      }
      default: {
        break _L;
      }
    }
  }
  return new Result$Ok$12$(moonbitlang$core$builtin$$abort$8$("unreachable", "@moonbitlang/core/json:parse.mbt:61:34-61:54"));
}
function moonbitlang$core$json$$ParseContext$parse_array(ctx) {
  if (ctx.remaining_available_depth <= 0) {
    return new Result$Err$12$(Error$moonbitlang$47$core$47$json$46$ParseError$46$DepthLimitExceeded);
  }
  ctx.remaining_available_depth = ctx.remaining_available_depth - 1 | 0;
  const vec = [];
  let _tmp;
  const _bind = moonbitlang$core$json$$ParseContext$lex_value(ctx, true);
  let _tmp$2;
  if (_bind.$tag === 1) {
    const _ok = _bind;
    _tmp$2 = _ok._0;
  } else {
    return _bind;
  }
  let _tmp$3 = _tmp$2;
  _L: while (true) {
    const _param = _tmp$3;
    if (_param.$tag === 8) {
      ctx.remaining_available_depth = ctx.remaining_available_depth + 1 | 0;
      _tmp = new $64$moonbitlang$47$core$47$builtin$46$Json$Array(vec);
      break;
    } else {
      const _bind$2 = moonbitlang$core$json$$ParseContext$parse_value2(ctx, _param);
      let _tmp$4;
      if (_bind$2.$tag === 1) {
        const _ok = _bind$2;
        _tmp$4 = _ok._0;
      } else {
        return _bind$2;
      }
      moonbitlang$core$array$$Array$push$8$(vec, _tmp$4);
      const _bind$3 = moonbitlang$core$json$$ParseContext$lex_after_array_value(ctx);
      let tok2;
      if (_bind$3.$tag === 1) {
        const _ok = _bind$3;
        tok2 = _ok._0;
      } else {
        return _bind$3;
      }
      switch (tok2.$tag) {
        case 9: {
          const _bind$4 = moonbitlang$core$json$$ParseContext$lex_value(ctx, false);
          if (_bind$4.$tag === 1) {
            const _ok = _bind$4;
            _tmp$3 = _ok._0;
          } else {
            return _bind$4;
          }
          continue _L;
        }
        case 8: {
          ctx.remaining_available_depth = ctx.remaining_available_depth + 1 | 0;
          _tmp = new $64$moonbitlang$47$core$47$builtin$46$Json$Array(vec);
          break _L;
        }
        default: {
          _tmp = moonbitlang$core$builtin$$abort$8$("unreachable", "@moonbitlang/core/json:parse.mbt:114:14-114:34");
          break _L;
        }
      }
    }
  }
  return new Result$Ok$12$(_tmp);
}
function moonbitlang$core$json$$ParseContext$parse_object(ctx) {
  if (ctx.remaining_available_depth <= 0) {
    return new Result$Err$12$(Error$moonbitlang$47$core$47$json$46$ParseError$46$DepthLimitExceeded);
  }
  ctx.remaining_available_depth = ctx.remaining_available_depth - 1 | 0;
  const map = moonbitlang$core$builtin$$Map$new$46$inner$56$(8);
  let _tmp;
  const _bind = moonbitlang$core$json$$ParseContext$lex_property_name(ctx);
  let _tmp$2;
  if (_bind.$tag === 1) {
    const _ok = _bind;
    _tmp$2 = _ok._0;
  } else {
    return _bind;
  }
  let _tmp$3 = _tmp$2;
  _L: while (true) {
    const _param = _tmp$3;
    switch (_param.$tag) {
      case 6: {
        ctx.remaining_available_depth = ctx.remaining_available_depth + 1 | 0;
        _tmp = new $64$moonbitlang$47$core$47$builtin$46$Json$Object(map);
        break _L;
      }
      case 4: {
        const _String = _param;
        const _name = _String._0;
        const _bind$2 = moonbitlang$core$json$$ParseContext$lex_after_property_name(ctx);
        if (_bind$2.$tag === 1) {
          const _ok = _bind$2;
          _ok._0;
        } else {
          return _bind$2;
        }
        const _bind$3 = moonbitlang$core$json$$ParseContext$parse_value(ctx);
        let _tmp$4;
        if (_bind$3.$tag === 1) {
          const _ok = _bind$3;
          _tmp$4 = _ok._0;
        } else {
          return _bind$3;
        }
        moonbitlang$core$builtin$$Map$set$56$(map, _name, _tmp$4);
        const _bind$4 = moonbitlang$core$json$$ParseContext$lex_after_object_value(ctx);
        let _bind$5;
        if (_bind$4.$tag === 1) {
          const _ok = _bind$4;
          _bind$5 = _ok._0;
        } else {
          return _bind$4;
        }
        switch (_bind$5.$tag) {
          case 9: {
            const _bind$6 = moonbitlang$core$json$$ParseContext$lex_property_name2(ctx);
            if (_bind$6.$tag === 1) {
              const _ok = _bind$6;
              _tmp$3 = _ok._0;
            } else {
              return _bind$6;
            }
            continue _L;
          }
          case 6: {
            ctx.remaining_available_depth = ctx.remaining_available_depth + 1 | 0;
            _tmp = new $64$moonbitlang$47$core$47$builtin$46$Json$Object(map);
            break _L;
          }
          default: {
            _tmp = moonbitlang$core$builtin$$abort$8$("unreachable", "@moonbitlang/core/json:parse.mbt:86:14-86:34");
            break _L;
          }
        }
      }
      default: {
        _tmp = moonbitlang$core$builtin$$abort$8$("unreachable", "@moonbitlang/core/json:parse.mbt:89:10-89:30");
        break _L;
      }
    }
  }
  return new Result$Ok$12$(_tmp);
}
function moonbitlang$core$json$$parse$46$inner(input, max_nesting_depth) {
  const ctx = moonbitlang$core$json$$ParseContext$make(input, max_nesting_depth);
  const _bind = moonbitlang$core$json$$ParseContext$parse_value(ctx);
  let val;
  if (_bind.$tag === 1) {
    const _ok = _bind;
    val = _ok._0;
  } else {
    return _bind;
  }
  moonbitlang$core$json$$ParseContext$lex_skip_whitespace(ctx);
  return ctx.offset >= ctx.end_offset ? new Result$Ok$12$(val) : moonbitlang$core$json$$ParseContext$invalid_char$46$inner$8$(ctx, 0);
}
function moonbitlang$core$json$$escape(str, escape_slash) {
  const buf = moonbitlang$core$builtin$$StringBuilder$new$46$inner(str.length);
  const _it = moonbitlang$core$string$$String$iter(str);
  while (true) {
    const _bind = moonbitlang$core$builtin$$Iter$next$45$(_it);
    if (_bind === -1) {
      break;
    } else {
      const _Some = _bind;
      const _c = _Some;
      switch (_c) {
        case 34: {
          moonbitlang$core$builtin$$Logger$write_string$0$(buf, "\\\"");
          break;
        }
        case 92: {
          moonbitlang$core$builtin$$Logger$write_string$0$(buf, "\\\\");
          break;
        }
        case 47: {
          if (escape_slash) {
            moonbitlang$core$builtin$$Logger$write_string$0$(buf, "\\/");
          } else {
            moonbitlang$core$builtin$$Logger$write_char$0$(buf, _c);
          }
          break;
        }
        case 10: {
          moonbitlang$core$builtin$$Logger$write_string$0$(buf, "\\n");
          break;
        }
        case 13: {
          moonbitlang$core$builtin$$Logger$write_string$0$(buf, "\\r");
          break;
        }
        case 8: {
          moonbitlang$core$builtin$$Logger$write_string$0$(buf, "\\b");
          break;
        }
        case 9: {
          moonbitlang$core$builtin$$Logger$write_string$0$(buf, "\\t");
          break;
        }
        default: {
          const code = _c;
          if (code === 12) {
            moonbitlang$core$builtin$$Logger$write_string$0$(buf, "\\f");
          } else {
            if (code < 32) {
              moonbitlang$core$builtin$$Logger$write_string$0$(buf, "\\u00");
              moonbitlang$core$builtin$$Logger$write_string$0$(buf, moonbitlang$core$byte$$Byte$to_hex(code & 255));
            } else {
              moonbitlang$core$builtin$$Logger$write_char$0$(buf, _c);
            }
          }
        }
      }
      continue;
    }
  }
  return buf.val;
}
function moonbitlang$core$json$$indent_str(level, indent) {
  if (indent === 0) {
    return "";
  } else {
    const spaces = Math.imul(indent, level) | 0;
    switch (spaces) {
      case 0: {
        return "\n";
      }
      case 1: {
        return "\n ";
      }
      case 2: {
        return "\n  ";
      }
      case 3: {
        return "\n   ";
      }
      case 4: {
        return "\n    ";
      }
      case 5: {
        return "\n     ";
      }
      case 6: {
        return "\n      ";
      }
      case 7: {
        return "\n       ";
      }
      case 8: {
        return "\n        ";
      }
      default: {
        return `\n${moonbitlang$core$string$$String$repeat(" ", spaces)}`;
      }
    }
  }
}
function moonbitlang$core$json$$Json$stringify$46$inner(self, escape_slash, indent, replacer) {
  const buf = moonbitlang$core$builtin$$StringBuilder$new$46$inner(0);
  const stack = [];
  let depth = 0;
  let _tmp = self;
  while (true) {
    const _param = _tmp;
    if (_param === undefined) {
      if (stack.length === 0) {
        break;
      } else {
        const _x = stack[stack.length - 1 | 0];
        if (_x.$tag === 0) {
          const _Array = _x;
          const _arr = _Array._0;
          const _i = _Array._1;
          if (_i < _arr.length) {
            const element = moonbitlang$core$array$$Array$at$8$(_arr, _i);
            _Array._1 = _i + 1 | 0;
            if (_i > 0) {
              moonbitlang$core$builtin$$Logger$write_char$0$(buf, 44);
              moonbitlang$core$builtin$$Logger$write_string$0$(buf, moonbitlang$core$json$$indent_str(depth, indent));
            }
            _tmp = element;
            continue;
          } else {
            depth = depth - 1 | 0;
            moonbitlang$core$array$$Array$pop$46$(stack);
            moonbitlang$core$builtin$$Logger$write_string$0$(buf, moonbitlang$core$json$$indent_str(depth, indent));
            moonbitlang$core$builtin$$Logger$write_char$0$(buf, 93);
            _tmp = undefined;
            continue;
          }
        } else {
          const _Object = _x;
          const _iterator = _Object._0;
          const _first = _Object._1;
          const _bind = moonbitlang$core$builtin$$Iter$next$50$(_iterator);
          if (_bind === undefined) {
            depth = depth - 1 | 0;
            moonbitlang$core$array$$Array$pop$46$(stack);
            moonbitlang$core$builtin$$Logger$write_string$0$(buf, moonbitlang$core$json$$indent_str(depth, indent));
            moonbitlang$core$builtin$$Logger$write_char$0$(buf, 125);
            _tmp = undefined;
            continue;
          } else {
            const _Some = _bind;
            const _x$2 = _Some;
            const _k = _x$2._0;
            const _v = _x$2._1;
            let v2 = _v;
            if (replacer === undefined) {
            } else {
              const _Some$2 = replacer;
              const _replacer = _Some$2;
              const _func = _replacer;
              const _bind$2 = _func(_k, _v);
              if (_bind$2 === undefined) {
                _tmp = undefined;
                continue;
              } else {
                const _Some$3 = _bind$2;
                const _v$2 = _Some$3;
                v2 = _v$2;
              }
            }
            if (!_first) {
              moonbitlang$core$builtin$$Logger$write_char$0$(buf, 44);
              moonbitlang$core$builtin$$Logger$write_string$0$(buf, moonbitlang$core$json$$indent_str(depth, indent));
            }
            moonbitlang$core$builtin$$Logger$write_char$0$(buf, 34);
            moonbitlang$core$builtin$$Logger$write_string$0$(buf, moonbitlang$core$json$$escape(_k, escape_slash));
            moonbitlang$core$builtin$$Logger$write_char$0$(buf, 34);
            moonbitlang$core$builtin$$Logger$write_char$0$(buf, 58);
            if (indent > 0) {
              moonbitlang$core$builtin$$Logger$write_char$0$(buf, 32);
            }
            _Object._1 = false;
            _tmp = v2;
            continue;
          }
        }
      }
    } else {
      const _Some = _param;
      const _value = _Some;
      switch (_value.$tag) {
        case 6: {
          const _Object = _value;
          const _members = _Object._0;
          if (_members.size === 0) {
            moonbitlang$core$builtin$$Logger$write_string$0$(buf, "{}");
          } else {
            depth = depth + 1 | 0;
            moonbitlang$core$builtin$$Logger$write_char$0$(buf, 123);
            moonbitlang$core$builtin$$Logger$write_string$0$(buf, moonbitlang$core$json$$indent_str(depth, indent));
            moonbitlang$core$array$$Array$push$46$(stack, new $64$moonbitlang$47$core$47$json$46$WriteFrame$Object(moonbitlang$core$builtin$$Map$iter$56$(_members), true));
          }
          break;
        }
        case 5: {
          const _Array = _value;
          const _arr = _Array._0;
          if (_arr.length === 0) {
            moonbitlang$core$builtin$$Logger$write_string$0$(buf, "[]");
          } else {
            depth = depth + 1 | 0;
            moonbitlang$core$builtin$$Logger$write_char$0$(buf, 91);
            moonbitlang$core$builtin$$Logger$write_string$0$(buf, moonbitlang$core$json$$indent_str(depth, indent));
            moonbitlang$core$array$$Array$push$46$(stack, new $64$moonbitlang$47$core$47$json$46$WriteFrame$Array(_arr, 0));
          }
          break;
        }
        case 4: {
          const _String = _value;
          const _s = _String._0;
          moonbitlang$core$builtin$$Logger$write_char$0$(buf, 34);
          moonbitlang$core$builtin$$Logger$write_string$0$(buf, moonbitlang$core$json$$escape(_s, escape_slash));
          moonbitlang$core$builtin$$Logger$write_char$0$(buf, 34);
          break;
        }
        case 3: {
          const _Number = _value;
          const _n = _Number._0;
          const _repr = _Number._1;
          if (_repr === undefined) {
            moonbitlang$core$builtin$$StringBuilder$write_object$31$(buf, _n);
          } else {
            const _Some$2 = _repr;
            const _r = _Some$2;
            moonbitlang$core$builtin$$Logger$write_string$0$(buf, _r);
          }
          break;
        }
        case 1: {
          moonbitlang$core$builtin$$Logger$write_string$0$(buf, "true");
          break;
        }
        case 2: {
          moonbitlang$core$builtin$$Logger$write_string$0$(buf, "false");
          break;
        }
        default: {
          moonbitlang$core$builtin$$Logger$write_string$0$(buf, "null");
        }
      }
      _tmp = undefined;
      continue;
    }
  }
  return buf.val;
}
function moonbitlang$core$json$$output$46$build_path$124$182(path, logger) {
  switch (path.$tag) {
    case 0: {
      return;
    }
    case 1: {
      const _Key = path;
      const _parent = _Key._0;
      const _key = _Key._1;
      moonbitlang$core$json$$output$46$build_path$124$182(_parent, logger);
      logger.method_table.method_3(logger.self, 47);
      if (!moonbitlang$core$string$$String$contains_any(_key, { str: moonbitlang$core$json$$output$46$42$bind$124$1378, start: 0, end: moonbitlang$core$json$$output$46$42$bind$124$1378.length })) {
        logger.method_table.method_0(logger.self, _key);
        return;
      }
      const _it = moonbitlang$core$string$$String$iter(_key);
      while (true) {
        const _bind = moonbitlang$core$builtin$$Iter$next$45$(_it);
        if (_bind === -1) {
          return;
        } else {
          const _Some = _bind;
          const _ch = _Some;
          switch (_ch) {
            case 126: {
              logger.method_table.method_0(logger.self, "~0");
              break;
            }
            case 47: {
              logger.method_table.method_0(logger.self, "~1");
              break;
            }
            default: {
              logger.method_table.method_3(logger.self, _ch);
            }
          }
          continue;
        }
      }
    }
    default: {
      const _Index = path;
      const _parent$2 = _Index._0;
      const _index = _Index._1;
      moonbitlang$core$json$$output$46$build_path$124$182(_parent$2, logger);
      logger.method_table.method_3(logger.self, 47);
      moonbitlang$core$builtin$$Logger$write_object$16$(logger, _index);
      return;
    }
  }
}
function moonbitlang$core$builtin$$Show$output$18$(self, logger) {
  moonbitlang$core$json$$output$46$build_path$124$182(self, logger);
}
function moonbitlang$core$json$$from_json$46$inner$74$(json, path) {
  return moonbitlang$core$json$$FromJson$from_json$74$(json, path);
}
function moonbitlang$core$json$$from_json$46$inner$71$(json, path) {
  return moonbitlang$core$json$$FromJson$from_json$59$(json, path);
}
function moonbitlang$core$json$$from_json$74$(json, path$46$opt) {
  let path;
  if (path$46$opt === undefined) {
    path = $64$moonbitlang$47$core$47$json$46$JsonPath$Root;
  } else {
    const _Some = path$46$opt;
    path = _Some;
  }
  return moonbitlang$core$json$$from_json$46$inner$74$(json, path);
}
function moonbitlang$core$json$$from_json$71$(json, path$46$opt) {
  let path;
  if (path$46$opt === undefined) {
    path = $64$moonbitlang$47$core$47$json$46$JsonPath$Root;
  } else {
    const _Some = path$46$opt;
    path = _Some;
  }
  return moonbitlang$core$json$$from_json$46$inner$71$(json, path);
}
function moonbitlang$core$json$$FromJson$from_json$16$(json, path) {
  _L: {
    if (json.$tag === 3) {
      const _Number = json;
      const _n = _Number._0;
      if (_n !== moonbitlang$core$double$$infinity) {
        if (_n !== moonbitlang$core$double$$neg_infinity) {
          if (_n > 2147483647 || _n < -2147483648) {
            const _bind = moonbitlang$core$json$$decode_error$11$(path, "Int::from_json: overflow");
            if (_bind.$tag === 1) {
              const _ok = _bind;
              _ok._0;
            } else {
              return _bind;
            }
          }
          return new Result$Ok$17$(moonbitlang$core$double$$Double$to_int(_n));
        } else {
          break _L;
        }
      } else {
        break _L;
      }
    } else {
      break _L;
    }
  }
  return moonbitlang$core$json$$decode_error$16$(path, "Int::from_json: expected number");
}
function moonbitlang$core$json$$FromJson$from_json$19$(json, path) {
  if (json.$tag === 4) {
    const _String = json;
    const _a = _String._0;
    return new Result$Ok$19$(_a);
  } else {
    return moonbitlang$core$json$$decode_error$19$(path, "String::from_json: expected string");
  }
}
function moonbitlang$core$json$$FromJson$from_json$59$(json, path) {
  if (json.$tag === 5) {
    const _Array = json;
    const _a = _Array._0;
    const _bind = new $64$moonbitlang$47$core$47$json$46$JsonPath$Index(path, 0);
    if (_bind.$tag === 2) {
      const _Index = _bind;
      let _p;
      _L: {
        let _p$2;
        _L$2: {
          if (_a.length === 0) {
            const _tmp = [];
            _p = _tmp;
            break _L;
          }
          const _p$3 = new Array(_a.length);
          const _p$4 = _a.length;
          let _tmp = 0;
          while (true) {
            const _p$5 = _tmp;
            if (_p$5 < _p$4) {
              const _p$6 = _a[_p$5];
              _Index._1 = _p$5;
              const _bind$2 = moonbitlang$core$json$$FromJson$from_json$30$(_p$6, _Index);
              let _tmp$2;
              if (_bind$2.$tag === 1) {
                const _ok = _bind$2;
                _tmp$2 = _ok._0;
              } else {
                const _err = _bind$2;
                const _tmp$3 = _err._0;
                _p$2 = _tmp$3;
                break _L$2;
              }
              _p$3[_p$5] = _tmp$2;
              _tmp = _p$5 + 1 | 0;
              continue;
            } else {
              break;
            }
          }
          return new Result$Ok$1$(_p$3);
        }
        return new Result$Err$1$(_p$2);
      }
      return new Result$Ok$1$(_p);
    } else {
      return new Result$Ok$1$($panic());
    }
  } else {
    return moonbitlang$core$json$$decode_error$71$(path, "Array::from_json: expected array");
  }
}
function moonbitlang$core$json$$FromJson$from_json$60$(json, path) {
  if (json.$tag === 5) {
    const _Array = json;
    const _a = _Array._0;
    const _bind = new $64$moonbitlang$47$core$47$json$46$JsonPath$Index(path, 0);
    if (_bind.$tag === 2) {
      const _Index = _bind;
      let _p;
      _L: {
        let _p$2;
        _L$2: {
          if (_a.length === 0) {
            const _tmp = [];
            _p = _tmp;
            break _L;
          }
          const _p$3 = new Array(_a.length);
          const _p$4 = _a.length;
          let _tmp = 0;
          while (true) {
            const _p$5 = _tmp;
            if (_p$5 < _p$4) {
              const _p$6 = _a[_p$5];
              _Index._1 = _p$5;
              const _bind$2 = moonbitlang$core$json$$FromJson$from_json$16$(_p$6, _Index);
              let _tmp$2;
              if (_bind$2.$tag === 1) {
                const _ok = _bind$2;
                _tmp$2 = _ok._0;
              } else {
                const _err = _bind$2;
                const _tmp$3 = _err._0;
                _p$2 = _tmp$3;
                break _L$2;
              }
              _p$3[_p$5] = _tmp$2;
              _tmp = _p$5 + 1 | 0;
              continue;
            } else {
              break;
            }
          }
          return new Result$Ok$2$(_p$3);
        }
        return new Result$Err$2$(_p$2);
      }
      return new Result$Ok$2$(_p);
    } else {
      return new Result$Ok$2$($panic());
    }
  } else {
    return moonbitlang$core$json$$decode_error$73$(path, "Array::from_json: expected array");
  }
}
function moonbitlang$core$json$$FromJson$from_json$75$(json, path) {
  if (json.$tag === 6) {
    const _Object = json;
    const _obj = _Object._0;
    const _bind = [];
    const res = moonbitlang$core$builtin$$Map$from_array$57$({ buf: _bind, start: 0, end: 0 });
    const _bind$2 = new $64$moonbitlang$47$core$47$json$46$JsonPath$Key(path, "");
    if (_bind$2.$tag === 1) {
      const _Key = _bind$2;
      const _it = moonbitlang$core$builtin$$Map$iter2$56$(_obj);
      while (true) {
        const _bind$3 = moonbitlang$core$builtin$$Iter2$next$56$(_it);
        if (_bind$3 === undefined) {
          break;
        } else {
          const _Some = _bind$3;
          const _x = _Some;
          const _k = _x._0;
          const _v = _x._1;
          _Key._1 = _k;
          const _bind$4 = moonbitlang$core$json$$FromJson$from_json$16$(_v, _Key);
          let _tmp;
          if (_bind$4.$tag === 1) {
            const _ok = _bind$4;
            _tmp = _ok._0;
          } else {
            return _bind$4;
          }
          moonbitlang$core$builtin$$Map$set$57$(res, _k, _tmp);
          continue;
        }
      }
      return new Result$Ok$16$(res);
    } else {
      return new Result$Ok$16$($panic());
    }
  } else {
    return moonbitlang$core$json$$decode_error$72$(path, "Map::from_json: expected object");
  }
}
function moonbitlang$core$hashmap$$HashMap$iter$76$(self) {
  const i = { val: 0 };
  const len = self.entries.length;
  const _p = () => {
    while (true) {
      if (i.val < len) {
        const entry = self.entries[i.val];
        i.val = i.val + 1 | 0;
        if (entry === undefined) {
        } else {
          const _Some = entry;
          const _x = _Some;
          const _key = _x.key;
          const _value = _x.value;
          return { _0: _key, _1: _value };
        }
        continue;
      } else {
        return undefined;
      }
    }
  };
  return _p;
}
function moonbitlang$core$hashmap$$HashMap$iter$77$(self) {
  const i = { val: 0 };
  const len = self.entries.length;
  const _p = () => {
    while (true) {
      if (i.val < len) {
        const entry = self.entries[i.val];
        i.val = i.val + 1 | 0;
        if (entry === undefined) {
        } else {
          const _Some = entry;
          const _x = _Some;
          const _key = _x.key;
          const _value = _x.value;
          return { _0: _key, _1: _value };
        }
        continue;
      } else {
        return undefined;
      }
    }
  };
  return _p;
}
function moonbitlang$core$hashmap$$HashMap$new$46$inner$76$(capacity) {
  const capacity$2 = moonbitlang$core$int$$Int$next_power_of_two(capacity);
  const _bind = $make_array_len_and_init(capacity$2, undefined);
  const _bind$2 = capacity$2 - 1 | 0;
  return { entries: _bind, capacity: capacity$2, capacity_mask: _bind$2, size: 0 };
}
function moonbitlang$core$hashmap$$HashMap$new$46$inner$77$(capacity) {
  const capacity$2 = moonbitlang$core$int$$Int$next_power_of_two(capacity);
  const _bind = $make_array_len_and_init(capacity$2, undefined);
  const _bind$2 = capacity$2 - 1 | 0;
  return { entries: _bind, capacity: capacity$2, capacity_mask: _bind$2, size: 0 };
}
function moonbitlang$core$hashmap$$HashMap$shift_back$76$(self, idx) {
  let _tmp = idx;
  while (true) {
    const idx$2 = _tmp;
    const next = idx$2 + 1 & self.capacity_mask;
    _L: {
      const _tmp$2 = self.entries;
      $bound_check(_tmp$2, next);
      const _bind = _tmp$2[next];
      if (_bind === undefined) {
        break _L;
      } else {
        const _Some = _bind;
        const _x = _Some;
        const _x$2 = _x.psl;
        if (_x$2 === 0) {
          break _L;
        } else {
          _x.psl = _x.psl - 1 | 0;
          const _tmp$3 = self.entries;
          $bound_check(_tmp$3, idx$2);
          _tmp$3[idx$2] = _x;
          _tmp = next;
          continue;
        }
      }
    }
    const _tmp$2 = self.entries;
    $bound_check(_tmp$2, idx$2);
    _tmp$2[idx$2] = undefined;
    return;
  }
}
function moonbitlang$core$hashmap$$HashMap$shift_back$77$(self, idx) {
  let _tmp = idx;
  while (true) {
    const idx$2 = _tmp;
    const next = idx$2 + 1 & self.capacity_mask;
    _L: {
      const _tmp$2 = self.entries;
      $bound_check(_tmp$2, next);
      const _bind = _tmp$2[next];
      if (_bind === undefined) {
        break _L;
      } else {
        const _Some = _bind;
        const _x = _Some;
        const _x$2 = _x.psl;
        if (_x$2 === 0) {
          break _L;
        } else {
          _x.psl = _x.psl - 1 | 0;
          const _tmp$3 = self.entries;
          $bound_check(_tmp$3, idx$2);
          _tmp$3[idx$2] = _x;
          _tmp = next;
          continue;
        }
      }
    }
    const _tmp$2 = self.entries;
    $bound_check(_tmp$2, idx$2);
    _tmp$2[idx$2] = undefined;
    return;
  }
}
function moonbitlang$core$hashmap$$HashMap$remove_with_hash$76$(self, key, hash) {
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const i = _tmp;
    const idx = _tmp$2;
    const _tmp$3 = self.entries;
    $bound_check(_tmp$3, idx);
    const _bind = _tmp$3[idx];
    if (_bind === undefined) {
      break;
    } else {
      const _Some = _bind;
      const _entry = _Some;
      let _tmp$4;
      if (_entry.hash === hash) {
        const _p = _entry.key;
        _tmp$4 = _p.source_hash === key.source_hash && _p.start === key.start && _p.end === key.end;
      } else {
        _tmp$4 = false;
      }
      if (_tmp$4) {
        moonbitlang$core$hashmap$$HashMap$shift_back$76$(self, idx);
        self.size = self.size - 1 | 0;
        break;
      }
      if (i > _entry.psl) {
        break;
      }
      _tmp = i + 1 | 0;
      _tmp$2 = idx + 1 & self.capacity_mask;
      continue;
    }
  }
}
function moonbitlang$core$hashmap$$HashMap$remove_with_hash$77$(self, key, hash) {
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const i = _tmp;
    const idx = _tmp$2;
    const _tmp$3 = self.entries;
    $bound_check(_tmp$3, idx);
    const _bind = _tmp$3[idx];
    if (_bind === undefined) {
      break;
    } else {
      const _Some = _bind;
      const _entry = _Some;
      let _tmp$4;
      if (_entry.hash === hash) {
        const _p = _entry.key;
        _tmp$4 = _p.token_fingerprint === key.token_fingerprint && _p.start_token === key.start_token && _p.end_token === key.end_token;
      } else {
        _tmp$4 = false;
      }
      if (_tmp$4) {
        moonbitlang$core$hashmap$$HashMap$shift_back$77$(self, idx);
        self.size = self.size - 1 | 0;
        break;
      }
      if (i > _entry.psl) {
        break;
      }
      _tmp = i + 1 | 0;
      _tmp$2 = idx + 1 & self.capacity_mask;
      continue;
    }
  }
}
function moonbitlang$core$hashmap$$HashMap$remove$76$(self, key) {
  moonbitlang$core$hashmap$$HashMap$remove_with_hash$76$(self, key, moonbitlang$core$builtin$$Hash$hash$47$(key));
}
function moonbitlang$core$hashmap$$HashMap$remove$77$(self, key) {
  moonbitlang$core$hashmap$$HashMap$remove_with_hash$77$(self, key, moonbitlang$core$builtin$$Hash$hash$48$(key));
}
function moonbitlang$core$immut$internal$path$$of$16$(key) {
  return moonbitlang$core$builtin$$Hash$hash$38$(key) | -1073741824;
}
function moonbitlang$core$immut$internal$path$$of$19$(key) {
  return moonbitlang$core$builtin$$Hash$hash$37$(key) | -1073741824;
}
function moonbitlang$core$immut$internal$path$$of$78$(key) {
  return moonbitlang$core$builtin$$Hash$hash$78$(key) | -1073741824;
}
function moonbitlang$core$immut$internal$sparse_array$$singleton$22$(idx, value) {
  const _p = 0;
  return { elem_info: _p | 1 << idx, data: [value] };
}
function moonbitlang$core$immut$internal$sparse_array$$singleton$23$(idx, value) {
  const _p = 0;
  return { elem_info: _p | 1 << idx, data: [value] };
}
function moonbitlang$core$immut$internal$sparse_array$$singleton$24$(idx, value) {
  const _p = 0;
  return { elem_info: _p | 1 << idx, data: [value] };
}
function moonbitlang$core$immut$internal$sparse_array$$singleton$25$(idx, value) {
  const _p = 0;
  return { elem_info: _p | 1 << idx, data: [value] };
}
function moonbitlang$core$immut$internal$sparse_array$$singleton$26$(idx, value) {
  const _p = 0;
  return { elem_info: _p | 1 << idx, data: [value] };
}
function moonbitlang$core$immut$internal$sparse_array$$singleton$27$(idx, value) {
  const _p = 0;
  return { elem_info: _p | 1 << idx, data: [value] };
}
function moonbitlang$core$immut$internal$sparse_array$$singleton$28$(idx, value) {
  const _p = 0;
  return { elem_info: _p | 1 << idx, data: [value] };
}
function moonbitlang$core$immut$internal$sparse_array$$SparseArray$get$22$(self, idx) {
  const _p = self.elem_info;
  if ((_p & 1 << idx) !== 0) {
    const _tmp = self.data;
    const _p$2 = self.elem_info;
    const _tmp$2 = $i32_popcnt(_p$2 & ((1 << idx >>> 0) - (1 >>> 0) | 0));
    $bound_check(_tmp, _tmp$2);
    return _tmp[_tmp$2];
  } else {
    return undefined;
  }
}
function moonbitlang$core$immut$internal$sparse_array$$SparseArray$get$24$(self, idx) {
  const _p = self.elem_info;
  if ((_p & 1 << idx) !== 0) {
    const _tmp = self.data;
    const _p$2 = self.elem_info;
    const _tmp$2 = $i32_popcnt(_p$2 & ((1 << idx >>> 0) - (1 >>> 0) | 0));
    $bound_check(_tmp, _tmp$2);
    return _tmp[_tmp$2];
  } else {
    return undefined;
  }
}
function moonbitlang$core$immut$internal$sparse_array$$SparseArray$get$23$(self, idx) {
  const _p = self.elem_info;
  if ((_p & 1 << idx) !== 0) {
    const _tmp = self.data;
    const _p$2 = self.elem_info;
    const _tmp$2 = $i32_popcnt(_p$2 & ((1 << idx >>> 0) - (1 >>> 0) | 0));
    $bound_check(_tmp, _tmp$2);
    return _tmp[_tmp$2];
  } else {
    return undefined;
  }
}
function moonbitlang$core$immut$internal$sparse_array$$SparseArray$get$26$(self, idx) {
  const _p = self.elem_info;
  if ((_p & 1 << idx) !== 0) {
    const _tmp = self.data;
    const _p$2 = self.elem_info;
    const _tmp$2 = $i32_popcnt(_p$2 & ((1 << idx >>> 0) - (1 >>> 0) | 0));
    $bound_check(_tmp, _tmp$2);
    return _tmp[_tmp$2];
  } else {
    return undefined;
  }
}
function moonbitlang$core$immut$internal$sparse_array$$SparseArray$get$25$(self, idx) {
  const _p = self.elem_info;
  if ((_p & 1 << idx) !== 0) {
    const _tmp = self.data;
    const _p$2 = self.elem_info;
    const _tmp$2 = $i32_popcnt(_p$2 & ((1 << idx >>> 0) - (1 >>> 0) | 0));
    $bound_check(_tmp, _tmp$2);
    return _tmp[_tmp$2];
  } else {
    return undefined;
  }
}
function moonbitlang$core$immut$internal$sparse_array$$SparseArray$get$27$(self, idx) {
  const _p = self.elem_info;
  if ((_p & 1 << idx) !== 0) {
    const _tmp = self.data;
    const _p$2 = self.elem_info;
    const _tmp$2 = $i32_popcnt(_p$2 & ((1 << idx >>> 0) - (1 >>> 0) | 0));
    $bound_check(_tmp, _tmp$2);
    return _tmp[_tmp$2];
  } else {
    return undefined;
  }
}
function moonbitlang$core$immut$internal$sparse_array$$SparseArray$get$28$(self, idx) {
  const _p = self.elem_info;
  if ((_p & 1 << idx) !== 0) {
    const _tmp = self.data;
    const _p$2 = self.elem_info;
    const _tmp$2 = $i32_popcnt(_p$2 & ((1 << idx >>> 0) - (1 >>> 0) | 0));
    $bound_check(_tmp, _tmp$2);
    return _tmp[_tmp$2];
  } else {
    return undefined;
  }
}
function moonbitlang$core$immut$internal$sparse_array$$SparseArray$unsafe_get$23$(self, idx) {
  const _tmp = self.data;
  const _p = self.elem_info;
  const _tmp$2 = $i32_popcnt(_p & ((1 << idx >>> 0) - (1 >>> 0) | 0));
  $bound_check(_tmp, _tmp$2);
  return _tmp[_tmp$2];
}
function moonbitlang$core$immut$internal$sparse_array$$doubleton$22$(idx1, value1, idx2, value2) {
  const _p = 0;
  const _p$2 = _p | 1 << idx1;
  return { elem_info: _p$2 | 1 << idx2, data: idx1 < idx2 ? [value1, value2] : [value2, value1] };
}
function moonbitlang$core$immut$internal$sparse_array$$doubleton$23$(idx1, value1, idx2, value2) {
  const _p = 0;
  const _p$2 = _p | 1 << idx1;
  return { elem_info: _p$2 | 1 << idx2, data: idx1 < idx2 ? [value1, value2] : [value2, value1] };
}
function moonbitlang$core$immut$internal$sparse_array$$doubleton$24$(idx1, value1, idx2, value2) {
  const _p = 0;
  const _p$2 = _p | 1 << idx1;
  return { elem_info: _p$2 | 1 << idx2, data: idx1 < idx2 ? [value1, value2] : [value2, value1] };
}
function moonbitlang$core$immut$internal$sparse_array$$doubleton$25$(idx1, value1, idx2, value2) {
  const _p = 0;
  const _p$2 = _p | 1 << idx1;
  return { elem_info: _p$2 | 1 << idx2, data: idx1 < idx2 ? [value1, value2] : [value2, value1] };
}
function moonbitlang$core$immut$internal$sparse_array$$doubleton$26$(idx1, value1, idx2, value2) {
  const _p = 0;
  const _p$2 = _p | 1 << idx1;
  return { elem_info: _p$2 | 1 << idx2, data: idx1 < idx2 ? [value1, value2] : [value2, value1] };
}
function moonbitlang$core$immut$internal$sparse_array$$doubleton$27$(idx1, value1, idx2, value2) {
  const _p = 0;
  const _p$2 = _p | 1 << idx1;
  return { elem_info: _p$2 | 1 << idx2, data: idx1 < idx2 ? [value1, value2] : [value2, value1] };
}
function moonbitlang$core$immut$internal$sparse_array$$doubleton$28$(idx1, value1, idx2, value2) {
  const _p = 0;
  const _p$2 = _p | 1 << idx1;
  return { elem_info: _p$2 | 1 << idx2, data: idx1 < idx2 ? [value1, value2] : [value2, value1] };
}
function moonbitlang$core$immut$internal$sparse_array$$SparseArray$add$22$(self, idx, value) {
  const old_data = self.data;
  const old_len = old_data.length;
  const new_len = old_len + 1 | 0;
  const _p = self.elem_info;
  const pos_of_new_item = $i32_popcnt(_p & ((1 << idx >>> 0) - (1 >>> 0) | 0));
  const new_data = $make_array_len_and_init(new_len, value);
  moonbitlang$core$array$$FixedArray$blit_to$46$inner$22$(old_data, new_data, pos_of_new_item, 0, 0);
  moonbitlang$core$array$$FixedArray$blit_to$46$inner$22$(old_data, new_data, old_len - pos_of_new_item | 0, pos_of_new_item, pos_of_new_item + 1 | 0);
  const _p$2 = self.elem_info;
  return { elem_info: _p$2 | 1 << idx, data: new_data };
}
function moonbitlang$core$immut$internal$sparse_array$$SparseArray$add$23$(self, idx, value) {
  const old_data = self.data;
  const old_len = old_data.length;
  const new_len = old_len + 1 | 0;
  const _p = self.elem_info;
  const pos_of_new_item = $i32_popcnt(_p & ((1 << idx >>> 0) - (1 >>> 0) | 0));
  const new_data = $make_array_len_and_init(new_len, value);
  moonbitlang$core$array$$FixedArray$blit_to$46$inner$23$(old_data, new_data, pos_of_new_item, 0, 0);
  moonbitlang$core$array$$FixedArray$blit_to$46$inner$23$(old_data, new_data, old_len - pos_of_new_item | 0, pos_of_new_item, pos_of_new_item + 1 | 0);
  const _p$2 = self.elem_info;
  return { elem_info: _p$2 | 1 << idx, data: new_data };
}
function moonbitlang$core$immut$internal$sparse_array$$SparseArray$add$24$(self, idx, value) {
  const old_data = self.data;
  const old_len = old_data.length;
  const new_len = old_len + 1 | 0;
  const _p = self.elem_info;
  const pos_of_new_item = $i32_popcnt(_p & ((1 << idx >>> 0) - (1 >>> 0) | 0));
  const new_data = $make_array_len_and_init(new_len, value);
  moonbitlang$core$array$$FixedArray$blit_to$46$inner$24$(old_data, new_data, pos_of_new_item, 0, 0);
  moonbitlang$core$array$$FixedArray$blit_to$46$inner$24$(old_data, new_data, old_len - pos_of_new_item | 0, pos_of_new_item, pos_of_new_item + 1 | 0);
  const _p$2 = self.elem_info;
  return { elem_info: _p$2 | 1 << idx, data: new_data };
}
function moonbitlang$core$immut$internal$sparse_array$$SparseArray$add$25$(self, idx, value) {
  const old_data = self.data;
  const old_len = old_data.length;
  const new_len = old_len + 1 | 0;
  const _p = self.elem_info;
  const pos_of_new_item = $i32_popcnt(_p & ((1 << idx >>> 0) - (1 >>> 0) | 0));
  const new_data = $make_array_len_and_init(new_len, value);
  moonbitlang$core$array$$FixedArray$blit_to$46$inner$25$(old_data, new_data, pos_of_new_item, 0, 0);
  moonbitlang$core$array$$FixedArray$blit_to$46$inner$25$(old_data, new_data, old_len - pos_of_new_item | 0, pos_of_new_item, pos_of_new_item + 1 | 0);
  const _p$2 = self.elem_info;
  return { elem_info: _p$2 | 1 << idx, data: new_data };
}
function moonbitlang$core$immut$internal$sparse_array$$SparseArray$add$26$(self, idx, value) {
  const old_data = self.data;
  const old_len = old_data.length;
  const new_len = old_len + 1 | 0;
  const _p = self.elem_info;
  const pos_of_new_item = $i32_popcnt(_p & ((1 << idx >>> 0) - (1 >>> 0) | 0));
  const new_data = $make_array_len_and_init(new_len, value);
  moonbitlang$core$array$$FixedArray$blit_to$46$inner$26$(old_data, new_data, pos_of_new_item, 0, 0);
  moonbitlang$core$array$$FixedArray$blit_to$46$inner$26$(old_data, new_data, old_len - pos_of_new_item | 0, pos_of_new_item, pos_of_new_item + 1 | 0);
  const _p$2 = self.elem_info;
  return { elem_info: _p$2 | 1 << idx, data: new_data };
}
function moonbitlang$core$immut$internal$sparse_array$$SparseArray$add$27$(self, idx, value) {
  const old_data = self.data;
  const old_len = old_data.length;
  const new_len = old_len + 1 | 0;
  const _p = self.elem_info;
  const pos_of_new_item = $i32_popcnt(_p & ((1 << idx >>> 0) - (1 >>> 0) | 0));
  const new_data = $make_array_len_and_init(new_len, value);
  moonbitlang$core$array$$FixedArray$blit_to$46$inner$27$(old_data, new_data, pos_of_new_item, 0, 0);
  moonbitlang$core$array$$FixedArray$blit_to$46$inner$27$(old_data, new_data, old_len - pos_of_new_item | 0, pos_of_new_item, pos_of_new_item + 1 | 0);
  const _p$2 = self.elem_info;
  return { elem_info: _p$2 | 1 << idx, data: new_data };
}
function moonbitlang$core$immut$internal$sparse_array$$SparseArray$add$28$(self, idx, value) {
  const old_data = self.data;
  const old_len = old_data.length;
  const new_len = old_len + 1 | 0;
  const _p = self.elem_info;
  const pos_of_new_item = $i32_popcnt(_p & ((1 << idx >>> 0) - (1 >>> 0) | 0));
  const new_data = $make_array_len_and_init(new_len, value);
  moonbitlang$core$array$$FixedArray$blit_to$46$inner$28$(old_data, new_data, pos_of_new_item, 0, 0);
  moonbitlang$core$array$$FixedArray$blit_to$46$inner$28$(old_data, new_data, old_len - pos_of_new_item | 0, pos_of_new_item, pos_of_new_item + 1 | 0);
  const _p$2 = self.elem_info;
  return { elem_info: _p$2 | 1 << idx, data: new_data };
}
function $moonbitlang$core$immut$internal$sparse_array$$moonbitlang$core$array$$FixedArray$copy_prefix$23$(self, len) {
  $bound_check(self, 0);
  const res = $make_array_len_and_init(len, self[0]);
  moonbitlang$core$array$$FixedArray$unsafe_blit$23$(res, 0, self, 0, len);
  return res;
}
function moonbitlang$core$immut$internal$sparse_array$$SparseArray$filter$79$(self, pred) {
  const self_elem_info = self.elem_info;
  const _p = self_elem_info;
  const _tmp = $i32_popcnt(_p);
  const _tmp$2 = self.data;
  $bound_check(_tmp$2, 0);
  const data = $make_array_len_and_init(_tmp, _tmp$2[0]);
  let _tmp$3 = self_elem_info;
  let _tmp$4 = 0;
  let _tmp$5 = self_elem_info;
  while (true) {
    const rest = _tmp$3;
    const index = _tmp$4;
    const elem_info = _tmp$5;
    if (moonbitlang$core$builtin$$Eq$not_equal$33$(rest, 0)) {
      const idx = $i32_ctz(rest);
      const _bind = pred(moonbitlang$core$immut$internal$sparse_array$$SparseArray$unsafe_get$23$(self, idx));
      if (_bind === undefined) {
        _tmp$3 = rest ^ 1 << idx;
        _tmp$5 = elem_info ^ 1 << idx;
        continue;
      } else {
        const _Some = _bind;
        const _v = _Some;
        $bound_check(data, index);
        data[index] = _v;
        _tmp$3 = rest ^ 1 << idx;
        _tmp$4 = index + 1 | 0;
        continue;
      }
    } else {
      const _p$2 = 0;
      if (elem_info === _p$2) {
        return undefined;
      } else {
        return elem_info === self_elem_info ? { elem_info: elem_info, data: data } : { elem_info: elem_info, data: $moonbitlang$core$immut$internal$sparse_array$$moonbitlang$core$array$$FixedArray$copy_prefix$23$(data, index) };
      }
    }
  }
}
function moonbitlang$core$immut$internal$sparse_array$$SparseArray$replace$22$(self, idx, value) {
  const new_data = moonbitlang$core$array$$FixedArray$copy$22$(self.data);
  const _p = self.elem_info;
  const _tmp = $i32_popcnt(_p & ((1 << idx >>> 0) - (1 >>> 0) | 0));
  $bound_check(new_data, _tmp);
  new_data[_tmp] = value;
  return { elem_info: self.elem_info, data: new_data };
}
function moonbitlang$core$immut$internal$sparse_array$$SparseArray$replace$23$(self, idx, value) {
  const new_data = moonbitlang$core$array$$FixedArray$copy$23$(self.data);
  const _p = self.elem_info;
  const _tmp = $i32_popcnt(_p & ((1 << idx >>> 0) - (1 >>> 0) | 0));
  $bound_check(new_data, _tmp);
  new_data[_tmp] = value;
  return { elem_info: self.elem_info, data: new_data };
}
function moonbitlang$core$immut$internal$sparse_array$$SparseArray$replace$24$(self, idx, value) {
  const new_data = moonbitlang$core$array$$FixedArray$copy$24$(self.data);
  const _p = self.elem_info;
  const _tmp = $i32_popcnt(_p & ((1 << idx >>> 0) - (1 >>> 0) | 0));
  $bound_check(new_data, _tmp);
  new_data[_tmp] = value;
  return { elem_info: self.elem_info, data: new_data };
}
function moonbitlang$core$immut$internal$sparse_array$$SparseArray$replace$25$(self, idx, value) {
  const new_data = moonbitlang$core$array$$FixedArray$copy$25$(self.data);
  const _p = self.elem_info;
  const _tmp = $i32_popcnt(_p & ((1 << idx >>> 0) - (1 >>> 0) | 0));
  $bound_check(new_data, _tmp);
  new_data[_tmp] = value;
  return { elem_info: self.elem_info, data: new_data };
}
function moonbitlang$core$immut$internal$sparse_array$$SparseArray$replace$26$(self, idx, value) {
  const new_data = moonbitlang$core$array$$FixedArray$copy$26$(self.data);
  const _p = self.elem_info;
  const _tmp = $i32_popcnt(_p & ((1 << idx >>> 0) - (1 >>> 0) | 0));
  $bound_check(new_data, _tmp);
  new_data[_tmp] = value;
  return { elem_info: self.elem_info, data: new_data };
}
function moonbitlang$core$immut$internal$sparse_array$$SparseArray$replace$27$(self, idx, value) {
  const new_data = moonbitlang$core$array$$FixedArray$copy$27$(self.data);
  const _p = self.elem_info;
  const _tmp = $i32_popcnt(_p & ((1 << idx >>> 0) - (1 >>> 0) | 0));
  $bound_check(new_data, _tmp);
  new_data[_tmp] = value;
  return { elem_info: self.elem_info, data: new_data };
}
function moonbitlang$core$immut$internal$sparse_array$$SparseArray$replace$28$(self, idx, value) {
  const new_data = moonbitlang$core$array$$FixedArray$copy$28$(self.data);
  const _p = self.elem_info;
  const _tmp = $i32_popcnt(_p & ((1 << idx >>> 0) - (1 >>> 0) | 0));
  $bound_check(new_data, _tmp);
  new_data[_tmp] = value;
  return { elem_info: self.elem_info, data: new_data };
}
function moonbitlang$core$immut$internal$sparse_array$$SparseArray$each$80$(self, f) {
  const _p = self.elem_info;
  const _p$2 = _p;
  const _end37 = $i32_popcnt(_p$2);
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _end37) {
      const _tmp$2 = self.data;
      $bound_check(_tmp$2, i);
      f(_tmp$2[i]);
      _tmp = i + 1 | 0;
      continue;
    } else {
      return;
    }
  }
}
function moonbitlang$core$immut$internal$sparse_array$$SparseArray$each$79$(self, f) {
  const _p = self.elem_info;
  const _p$2 = _p;
  const _end37 = $i32_popcnt(_p$2);
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _end37) {
      const _tmp$2 = self.data;
      $bound_check(_tmp$2, i);
      f(_tmp$2[i]);
      _tmp = i + 1 | 0;
      continue;
    } else {
      return;
    }
  }
}
function moonbitlang$core$list$$List$length$14$(self) {
  let _tmp = self;
  let _tmp$2 = 0;
  while (true) {
    const _param_0 = _tmp;
    const _param_1 = _tmp$2;
    if (_param_0.$tag === 0) {
      return _param_1;
    } else {
      const _More = _param_0;
      const _rest = _More._1;
      _tmp = _rest;
      _tmp$2 = _param_1 + 1 | 0;
      continue;
    }
  }
}
function moonbitlang$core$list$$List$filter$81$(self, f) {
  let _tmp = self;
  while (true) {
    const _param = _tmp;
    if (_param.$tag === 0) {
      return $64$moonbitlang$47$core$47$list$46$List$Empty$23$;
    } else {
      const _More = _param;
      const _head = _More._0;
      const _tail = _More._1;
      if (!f(_head)) {
        _tmp = _tail;
        continue;
      } else {
        const dest = new $64$moonbitlang$47$core$47$list$46$List$More$23$(_head, $64$moonbitlang$47$core$47$list$46$List$Empty$23$);
        let _tmp$2 = dest;
        let _tmp$3 = _tail;
        while (true) {
          const _param_0 = _tmp$2;
          const _param_1 = _tmp$3;
          if (_param_1.$tag === 0) {
            break;
          } else {
            if (_param_0.$tag === 1) {
              const _More$2 = _param_0;
              const _More$3 = _param_1;
              const _hd = _More$3._0;
              const _tail$2 = _More$3._1;
              if (f(_hd)) {
                _More$2._1 = new $64$moonbitlang$47$core$47$list$46$List$More$23$(_hd, $64$moonbitlang$47$core$47$list$46$List$Empty$23$);
                _tmp$2 = _More$2._1;
                _tmp$3 = _tail$2;
                continue;
              } else {
                _tmp$2 = _More$2;
                _tmp$3 = _tail$2;
                continue;
              }
            } else {
              $panic();
              break;
            }
          }
        }
        return dest;
      }
    }
  }
}
function moonbitlang$core$list$$List$contains$16$(self, value) {
  let _tmp = self;
  while (true) {
    const _param = _tmp;
    if (_param.$tag === 0) {
      return false;
    } else {
      const _More = _param;
      const _x = _More._0;
      const _xs = _More._1;
      if (_x === value) {
        return true;
      } else {
        _tmp = _xs;
        continue;
      }
    }
  }
}
function moonbitlang$core$list$$List$lookup$82$(self, v) {
  let _tmp = self;
  while (true) {
    const _param = _tmp;
    if (_param.$tag === 0) {
      return undefined;
    } else {
      const _More = _param;
      const _x = _More._0;
      const _x$2 = _x._0;
      const _y = _x._1;
      const _xs = _More._1;
      if (_x$2 === v) {
        return _y;
      } else {
        _tmp = _xs;
        continue;
      }
    }
  }
}
function moonbitlang$core$list$$List$lookup$57$(self, v) {
  let _tmp = self;
  while (true) {
    const _param = _tmp;
    if (_param.$tag === 0) {
      return undefined;
    } else {
      const _More = _param;
      const _x = _More._0;
      const _x$2 = _x._0;
      const _y = _x._1;
      const _xs = _More._1;
      if (_x$2 === v) {
        return _y;
      } else {
        _tmp = _xs;
        continue;
      }
    }
  }
}
function moonbitlang$core$list$$List$lookup$83$(self, v) {
  let _tmp = self;
  while (true) {
    const _param = _tmp;
    if (_param.$tag === 0) {
      return undefined;
    } else {
      const _More = _param;
      const _x = _More._0;
      const _x$2 = _x._0;
      const _y = _x._1;
      const _xs = _More._1;
      if (_x$2 === v) {
        return _y;
      } else {
        _tmp = _xs;
        continue;
      }
    }
  }
}
function moonbitlang$core$list$$List$lookup$54$(self, v) {
  let _tmp = self;
  while (true) {
    const _param = _tmp;
    if (_param.$tag === 0) {
      return undefined;
    } else {
      const _More = _param;
      const _x = _More._0;
      const _x$2 = _x._0;
      const _y = _x._1;
      const _xs = _More._1;
      if (_x$2 === v) {
        return _y;
      } else {
        _tmp = _xs;
        continue;
      }
    }
  }
}
function moonbitlang$core$list$$List$lookup$84$(self, v) {
  let _tmp = self;
  while (true) {
    const _param = _tmp;
    if (_param.$tag === 0) {
      return undefined;
    } else {
      const _More = _param;
      const _x = _More._0;
      const _x$2 = _x._0;
      const _y = _x._1;
      const _xs = _More._1;
      if (_x$2.agent === v.agent && _x$2.seq === v.seq) {
        return _y;
      } else {
        _tmp = _xs;
        continue;
      }
    }
  }
}
function moonbitlang$core$list$$List$lookup$85$(self, v) {
  let _tmp = self;
  while (true) {
    const _param = _tmp;
    if (_param.$tag === 0) {
      return Option$None$29$;
    } else {
      const _More = _param;
      const _x = _More._0;
      const _x$2 = _x._0;
      const _y = _x._1;
      const _xs = _More._1;
      if (_x$2 === v) {
        return new Option$Some$29$(_y);
      } else {
        _tmp = _xs;
        continue;
      }
    }
  }
}
function moonbitlang$core$list$$List$find_index$81$(self, f) {
  let _tmp = self;
  let _tmp$2 = 0;
  while (true) {
    const _param_0 = _tmp;
    const _param_1 = _tmp$2;
    if (_param_0.$tag === 0) {
      return undefined;
    } else {
      const _More = _param_0;
      const _element = _More._0;
      const _list = _More._1;
      if (f(_element)) {
        return _param_1;
      } else {
        _tmp = _list;
        _tmp$2 = _param_1 + 1 | 0;
        continue;
      }
    }
  }
}
function moonbitlang$core$list$$List$find_index$86$(self, f) {
  let _tmp = self;
  let _tmp$2 = 0;
  while (true) {
    const _param_0 = _tmp;
    const _param_1 = _tmp$2;
    if (_param_0.$tag === 0) {
      return undefined;
    } else {
      const _More = _param_0;
      const _element = _More._0;
      const _list = _More._1;
      if (f(_element)) {
        return _param_1;
      } else {
        _tmp = _list;
        _tmp$2 = _param_1 + 1 | 0;
        continue;
      }
    }
  }
}
function moonbitlang$core$list$$List$find_index$87$(self, f) {
  let _tmp = self;
  let _tmp$2 = 0;
  while (true) {
    const _param_0 = _tmp;
    const _param_1 = _tmp$2;
    if (_param_0.$tag === 0) {
      return undefined;
    } else {
      const _More = _param_0;
      const _element = _More._0;
      const _list = _More._1;
      if (f(_element)) {
        return _param_1;
      } else {
        _tmp = _list;
        _tmp$2 = _param_1 + 1 | 0;
        continue;
      }
    }
  }
}
function moonbitlang$core$list$$List$find_index$88$(self, f) {
  let _tmp = self;
  let _tmp$2 = 0;
  while (true) {
    const _param_0 = _tmp;
    const _param_1 = _tmp$2;
    if (_param_0.$tag === 0) {
      return undefined;
    } else {
      const _More = _param_0;
      const _element = _More._0;
      const _list = _More._1;
      if (f(_element)) {
        return _param_1;
      } else {
        _tmp = _list;
        _tmp$2 = _param_1 + 1 | 0;
        continue;
      }
    }
  }
}
function moonbitlang$core$list$$List$find_index$89$(self, f) {
  let _tmp = self;
  let _tmp$2 = 0;
  while (true) {
    const _param_0 = _tmp;
    const _param_1 = _tmp$2;
    if (_param_0.$tag === 0) {
      return undefined;
    } else {
      const _More = _param_0;
      const _element = _More._0;
      const _list = _More._1;
      if (f(_element)) {
        return _param_1;
      } else {
        _tmp = _list;
        _tmp$2 = _param_1 + 1 | 0;
        continue;
      }
    }
  }
}
function moonbitlang$core$list$$List$find_index$90$(self, f) {
  let _tmp = self;
  let _tmp$2 = 0;
  while (true) {
    const _param_0 = _tmp;
    const _param_1 = _tmp$2;
    if (_param_0.$tag === 0) {
      return undefined;
    } else {
      const _More = _param_0;
      const _element = _More._0;
      const _list = _More._1;
      if (f(_element)) {
        return _param_1;
      } else {
        _tmp = _list;
        _tmp$2 = _param_1 + 1 | 0;
        continue;
      }
    }
  }
}
function moonbitlang$core$list$$List$remove_at$14$(self, index) {
  if (self.$tag === 0) {
    return $64$moonbitlang$47$core$47$list$46$List$Empty$23$;
  } else {
    if (index < 0) {
      return self;
    } else {
      if (index === 0) {
        const _More = self;
        return _More._1;
      } else {
        const _More = self;
        const _head = _More._0;
        const _tail = _More._1;
        const dest = new $64$moonbitlang$47$core$47$list$46$List$More$23$(_head, $64$moonbitlang$47$core$47$list$46$List$Empty$23$);
        let _tmp = dest;
        let _tmp$2 = _tail;
        let _tmp$3 = index - 1 | 0;
        while (true) {
          const _param_0 = _tmp;
          const _param_1 = _tmp$2;
          const _param_2 = _tmp$3;
          if (_param_1.$tag === 0) {
            break;
          } else {
            if (_param_0.$tag === 1) {
              const _More$2 = _param_0;
              const _More$3 = _param_1;
              const _x = _More$3._0;
              const _tail$2 = _More$3._1;
              if (_param_2 === 0) {
                _More$2._1 = _tail$2;
                break;
              } else {
                _More$2._1 = new $64$moonbitlang$47$core$47$list$46$List$More$23$(_x, $64$moonbitlang$47$core$47$list$46$List$Empty$23$);
                _tmp = _More$2._1;
                _tmp$2 = _tail$2;
                _tmp$3 = _param_2 - 1 | 0;
                continue;
              }
            } else {
              $panic();
              break;
            }
          }
        }
        return dest;
      }
    }
  }
}
function moonbitlang$core$list$$List$remove_at$91$(self, index) {
  if (self.$tag === 0) {
    return $64$moonbitlang$47$core$47$list$46$List$Empty$24$;
  } else {
    if (index < 0) {
      return self;
    } else {
      if (index === 0) {
        const _More = self;
        return _More._1;
      } else {
        const _More = self;
        const _head = _More._0;
        const _tail = _More._1;
        const dest = new $64$moonbitlang$47$core$47$list$46$List$More$24$(_head, $64$moonbitlang$47$core$47$list$46$List$Empty$24$);
        let _tmp = dest;
        let _tmp$2 = _tail;
        let _tmp$3 = index - 1 | 0;
        while (true) {
          const _param_0 = _tmp;
          const _param_1 = _tmp$2;
          const _param_2 = _tmp$3;
          if (_param_1.$tag === 0) {
            break;
          } else {
            if (_param_0.$tag === 1) {
              const _More$2 = _param_0;
              const _More$3 = _param_1;
              const _x = _More$3._0;
              const _tail$2 = _More$3._1;
              if (_param_2 === 0) {
                _More$2._1 = _tail$2;
                break;
              } else {
                _More$2._1 = new $64$moonbitlang$47$core$47$list$46$List$More$24$(_x, $64$moonbitlang$47$core$47$list$46$List$Empty$24$);
                _tmp = _More$2._1;
                _tmp$2 = _tail$2;
                _tmp$3 = _param_2 - 1 | 0;
                continue;
              }
            } else {
              $panic();
              break;
            }
          }
        }
        return dest;
      }
    }
  }
}
function moonbitlang$core$list$$List$remove_at$92$(self, index) {
  if (self.$tag === 0) {
    return $64$moonbitlang$47$core$47$list$46$List$Empty$25$;
  } else {
    if (index < 0) {
      return self;
    } else {
      if (index === 0) {
        const _More = self;
        return _More._1;
      } else {
        const _More = self;
        const _head = _More._0;
        const _tail = _More._1;
        const dest = new $64$moonbitlang$47$core$47$list$46$List$More$25$(_head, $64$moonbitlang$47$core$47$list$46$List$Empty$25$);
        let _tmp = dest;
        let _tmp$2 = _tail;
        let _tmp$3 = index - 1 | 0;
        while (true) {
          const _param_0 = _tmp;
          const _param_1 = _tmp$2;
          const _param_2 = _tmp$3;
          if (_param_1.$tag === 0) {
            break;
          } else {
            if (_param_0.$tag === 1) {
              const _More$2 = _param_0;
              const _More$3 = _param_1;
              const _x = _More$3._0;
              const _tail$2 = _More$3._1;
              if (_param_2 === 0) {
                _More$2._1 = _tail$2;
                break;
              } else {
                _More$2._1 = new $64$moonbitlang$47$core$47$list$46$List$More$25$(_x, $64$moonbitlang$47$core$47$list$46$List$Empty$25$);
                _tmp = _More$2._1;
                _tmp$2 = _tail$2;
                _tmp$3 = _param_2 - 1 | 0;
                continue;
              }
            } else {
              $panic();
              break;
            }
          }
        }
        return dest;
      }
    }
  }
}
function moonbitlang$core$list$$List$remove_at$51$(self, index) {
  if (self.$tag === 0) {
    return $64$moonbitlang$47$core$47$list$46$List$Empty$26$;
  } else {
    if (index < 0) {
      return self;
    } else {
      if (index === 0) {
        const _More = self;
        return _More._1;
      } else {
        const _More = self;
        const _head = _More._0;
        const _tail = _More._1;
        const dest = new $64$moonbitlang$47$core$47$list$46$List$More$26$(_head, $64$moonbitlang$47$core$47$list$46$List$Empty$26$);
        let _tmp = dest;
        let _tmp$2 = _tail;
        let _tmp$3 = index - 1 | 0;
        while (true) {
          const _param_0 = _tmp;
          const _param_1 = _tmp$2;
          const _param_2 = _tmp$3;
          if (_param_1.$tag === 0) {
            break;
          } else {
            if (_param_0.$tag === 1) {
              const _More$2 = _param_0;
              const _More$3 = _param_1;
              const _x = _More$3._0;
              const _tail$2 = _More$3._1;
              if (_param_2 === 0) {
                _More$2._1 = _tail$2;
                break;
              } else {
                _More$2._1 = new $64$moonbitlang$47$core$47$list$46$List$More$26$(_x, $64$moonbitlang$47$core$47$list$46$List$Empty$26$);
                _tmp = _More$2._1;
                _tmp$2 = _tail$2;
                _tmp$3 = _param_2 - 1 | 0;
                continue;
              }
            } else {
              $panic();
              break;
            }
          }
        }
        return dest;
      }
    }
  }
}
function moonbitlang$core$list$$List$remove_at$93$(self, index) {
  if (self.$tag === 0) {
    return $64$moonbitlang$47$core$47$list$46$List$Empty$27$;
  } else {
    if (index < 0) {
      return self;
    } else {
      if (index === 0) {
        const _More = self;
        return _More._1;
      } else {
        const _More = self;
        const _head = _More._0;
        const _tail = _More._1;
        const dest = new $64$moonbitlang$47$core$47$list$46$List$More$27$(_head, $64$moonbitlang$47$core$47$list$46$List$Empty$27$);
        let _tmp = dest;
        let _tmp$2 = _tail;
        let _tmp$3 = index - 1 | 0;
        while (true) {
          const _param_0 = _tmp;
          const _param_1 = _tmp$2;
          const _param_2 = _tmp$3;
          if (_param_1.$tag === 0) {
            break;
          } else {
            if (_param_0.$tag === 1) {
              const _More$2 = _param_0;
              const _More$3 = _param_1;
              const _x = _More$3._0;
              const _tail$2 = _More$3._1;
              if (_param_2 === 0) {
                _More$2._1 = _tail$2;
                break;
              } else {
                _More$2._1 = new $64$moonbitlang$47$core$47$list$46$List$More$27$(_x, $64$moonbitlang$47$core$47$list$46$List$Empty$27$);
                _tmp = _More$2._1;
                _tmp$2 = _tail$2;
                _tmp$3 = _param_2 - 1 | 0;
                continue;
              }
            } else {
              $panic();
              break;
            }
          }
        }
        return dest;
      }
    }
  }
}
function moonbitlang$core$list$$List$remove_at$94$(self, index) {
  if (self.$tag === 0) {
    return $64$moonbitlang$47$core$47$list$46$List$Empty$28$;
  } else {
    if (index < 0) {
      return self;
    } else {
      if (index === 0) {
        const _More = self;
        return _More._1;
      } else {
        const _More = self;
        const _head = _More._0;
        const _tail = _More._1;
        const dest = new $64$moonbitlang$47$core$47$list$46$List$More$28$(_head, $64$moonbitlang$47$core$47$list$46$List$Empty$28$);
        let _tmp = dest;
        let _tmp$2 = _tail;
        let _tmp$3 = index - 1 | 0;
        while (true) {
          const _param_0 = _tmp;
          const _param_1 = _tmp$2;
          const _param_2 = _tmp$3;
          if (_param_1.$tag === 0) {
            break;
          } else {
            if (_param_0.$tag === 1) {
              const _More$2 = _param_0;
              const _More$3 = _param_1;
              const _x = _More$3._0;
              const _tail$2 = _More$3._1;
              if (_param_2 === 0) {
                _More$2._1 = _tail$2;
                break;
              } else {
                _More$2._1 = new $64$moonbitlang$47$core$47$list$46$List$More$28$(_x, $64$moonbitlang$47$core$47$list$46$List$Empty$28$);
                _tmp = _More$2._1;
                _tmp$2 = _tail$2;
                _tmp$3 = _param_2 - 1 | 0;
                continue;
              }
            } else {
              $panic();
              break;
            }
          }
        }
        return dest;
      }
    }
  }
}
function moonbitlang$core$immut$hashmap$$Node$get_with_path$82$(self, key, path) {
  let _tmp = self;
  let _tmp$2 = path;
  _L: while (true) {
    const _param_0 = _tmp;
    const _param_1 = _tmp$2;
    switch (_param_0.$tag) {
      case 1: {
        const _Leaf = _param_0;
        const _key1 = _Leaf._0;
        const _value1 = _Leaf._1;
        const _bucket = _Leaf._2;
        return key === _key1 ? _value1 : moonbitlang$core$list$$List$lookup$82$(_bucket, key);
      }
      case 0: {
        const _Flat = _param_0;
        const _key1$2 = _Flat._0;
        const _value1$2 = _Flat._1;
        const _path1 = _Flat._2;
        return _param_1 === _path1 && key === _key1$2 ? _value1$2 : undefined;
      }
      default: {
        const _Branch = _param_0;
        const _children = _Branch._0;
        const _p = _param_1;
        const idx = _p & 31;
        const _bind = moonbitlang$core$immut$internal$sparse_array$$SparseArray$get$24$(_children, idx);
        if (_bind === undefined) {
        } else {
          const _Some = _bind;
          const _child = _Some;
          _tmp = _child;
          const _p$2 = _param_1;
          _tmp$2 = _p$2 >>> 5 | 0;
          continue _L;
        }
        return undefined;
      }
    }
  }
}
function moonbitlang$core$immut$hashmap$$Node$get_with_path$57$(self, key, path) {
  let _tmp = self;
  let _tmp$2 = path;
  _L: while (true) {
    const _param_0 = _tmp;
    const _param_1 = _tmp$2;
    switch (_param_0.$tag) {
      case 1: {
        const _Leaf = _param_0;
        const _key1 = _Leaf._0;
        const _value1 = _Leaf._1;
        const _bucket = _Leaf._2;
        return key === _key1 ? _value1 : moonbitlang$core$list$$List$lookup$57$(_bucket, key);
      }
      case 0: {
        const _Flat = _param_0;
        const _key1$2 = _Flat._0;
        const _value1$2 = _Flat._1;
        const _path1 = _Flat._2;
        return _param_1 === _path1 && key === _key1$2 ? _value1$2 : undefined;
      }
      default: {
        const _Branch = _param_0;
        const _children = _Branch._0;
        const _p = _param_1;
        const idx = _p & 31;
        const _bind = moonbitlang$core$immut$internal$sparse_array$$SparseArray$get$26$(_children, idx);
        if (_bind === undefined) {
        } else {
          const _Some = _bind;
          const _child = _Some;
          _tmp = _child;
          const _p$2 = _param_1;
          _tmp$2 = _p$2 >>> 5 | 0;
          continue _L;
        }
        return undefined;
      }
    }
  }
}
function moonbitlang$core$immut$hashmap$$Node$get_with_path$83$(self, key, path) {
  let _tmp = self;
  let _tmp$2 = path;
  _L: while (true) {
    const _param_0 = _tmp;
    const _param_1 = _tmp$2;
    switch (_param_0.$tag) {
      case 1: {
        const _Leaf = _param_0;
        const _key1 = _Leaf._0;
        const _value1 = _Leaf._1;
        const _bucket = _Leaf._2;
        return key === _key1 ? _value1 : moonbitlang$core$list$$List$lookup$83$(_bucket, key);
      }
      case 0: {
        const _Flat = _param_0;
        const _key1$2 = _Flat._0;
        const _value1$2 = _Flat._1;
        const _path1 = _Flat._2;
        return _param_1 === _path1 && key === _key1$2 ? _value1$2 : undefined;
      }
      default: {
        const _Branch = _param_0;
        const _children = _Branch._0;
        const _p = _param_1;
        const idx = _p & 31;
        const _bind = moonbitlang$core$immut$internal$sparse_array$$SparseArray$get$23$(_children, idx);
        if (_bind === undefined) {
        } else {
          const _Some = _bind;
          const _child = _Some;
          _tmp = _child;
          const _p$2 = _param_1;
          _tmp$2 = _p$2 >>> 5 | 0;
          continue _L;
        }
        return undefined;
      }
    }
  }
}
function moonbitlang$core$immut$hashmap$$Node$get_with_path$54$(self, key, path) {
  let _tmp = self;
  let _tmp$2 = path;
  _L: while (true) {
    const _param_0 = _tmp;
    const _param_1 = _tmp$2;
    switch (_param_0.$tag) {
      case 1: {
        const _Leaf = _param_0;
        const _key1 = _Leaf._0;
        const _value1 = _Leaf._1;
        const _bucket = _Leaf._2;
        return key === _key1 ? _value1 : moonbitlang$core$list$$List$lookup$54$(_bucket, key);
      }
      case 0: {
        const _Flat = _param_0;
        const _key1$2 = _Flat._0;
        const _value1$2 = _Flat._1;
        const _path1 = _Flat._2;
        return _param_1 === _path1 && key === _key1$2 ? _value1$2 : undefined;
      }
      default: {
        const _Branch = _param_0;
        const _children = _Branch._0;
        const _p = _param_1;
        const idx = _p & 31;
        const _bind = moonbitlang$core$immut$internal$sparse_array$$SparseArray$get$27$(_children, idx);
        if (_bind === undefined) {
        } else {
          const _Some = _bind;
          const _child = _Some;
          _tmp = _child;
          const _p$2 = _param_1;
          _tmp$2 = _p$2 >>> 5 | 0;
          continue _L;
        }
        return undefined;
      }
    }
  }
}
function moonbitlang$core$immut$hashmap$$Node$get_with_path$84$(self, key, path) {
  let _tmp = self;
  let _tmp$2 = path;
  _L: while (true) {
    const _param_0 = _tmp;
    const _param_1 = _tmp$2;
    switch (_param_0.$tag) {
      case 1: {
        const _Leaf = _param_0;
        const _key1 = _Leaf._0;
        const _value1 = _Leaf._1;
        const _bucket = _Leaf._2;
        return key.agent === _key1.agent && key.seq === _key1.seq ? _value1 : moonbitlang$core$list$$List$lookup$84$(_bucket, key);
      }
      case 0: {
        const _Flat = _param_0;
        const _key1$2 = _Flat._0;
        const _value1$2 = _Flat._1;
        const _path1 = _Flat._2;
        return _param_1 === _path1 && (key.agent === _key1$2.agent && key.seq === _key1$2.seq) ? _value1$2 : undefined;
      }
      default: {
        const _Branch = _param_0;
        const _children = _Branch._0;
        const _p = _param_1;
        const idx = _p & 31;
        const _bind = moonbitlang$core$immut$internal$sparse_array$$SparseArray$get$25$(_children, idx);
        if (_bind === undefined) {
        } else {
          const _Some = _bind;
          const _child = _Some;
          _tmp = _child;
          const _p$2 = _param_1;
          _tmp$2 = _p$2 >>> 5 | 0;
          continue _L;
        }
        return undefined;
      }
    }
  }
}
function moonbitlang$core$immut$hashmap$$Node$get_with_path$85$(self, key, path) {
  let _tmp = self;
  let _tmp$2 = path;
  _L: while (true) {
    const _param_0 = _tmp;
    const _param_1 = _tmp$2;
    switch (_param_0.$tag) {
      case 1: {
        const _Leaf = _param_0;
        const _key1 = _Leaf._0;
        const _value1 = _Leaf._1;
        const _bucket = _Leaf._2;
        return key === _key1 ? new Option$Some$29$(_value1) : moonbitlang$core$list$$List$lookup$85$(_bucket, key);
      }
      case 0: {
        const _Flat = _param_0;
        const _key1$2 = _Flat._0;
        const _value1$2 = _Flat._1;
        const _path1 = _Flat._2;
        return _param_1 === _path1 && key === _key1$2 ? new Option$Some$29$(_value1$2) : Option$None$29$;
      }
      default: {
        const _Branch = _param_0;
        const _children = _Branch._0;
        const _p = _param_1;
        const idx = _p & 31;
        const _bind = moonbitlang$core$immut$internal$sparse_array$$SparseArray$get$28$(_children, idx);
        if (_bind === undefined) {
        } else {
          const _Some = _bind;
          const _child = _Some;
          _tmp = _child;
          const _p$2 = _param_1;
          _tmp$2 = _p$2 >>> 5 | 0;
          continue _L;
        }
        return Option$None$29$;
      }
    }
  }
}
function moonbitlang$core$immut$hashmap$$HashMap$get$82$(self, key) {
  const _bind = self;
  if (_bind === undefined) {
    return undefined;
  } else {
    const _Some = _bind;
    const _node = _Some;
    return moonbitlang$core$immut$hashmap$$Node$get_with_path$82$(_node, key, moonbitlang$core$immut$internal$path$$of$16$(key));
  }
}
function moonbitlang$core$immut$hashmap$$HashMap$get$57$(self, key) {
  const _bind = self;
  if (_bind === undefined) {
    return undefined;
  } else {
    const _Some = _bind;
    const _node = _Some;
    return moonbitlang$core$immut$hashmap$$Node$get_with_path$57$(_node, key, moonbitlang$core$immut$internal$path$$of$19$(key));
  }
}
function moonbitlang$core$immut$hashmap$$HashMap$get$83$(self, key) {
  const _bind = self;
  if (_bind === undefined) {
    return undefined;
  } else {
    const _Some = _bind;
    const _node = _Some;
    return moonbitlang$core$immut$hashmap$$Node$get_with_path$83$(_node, key, moonbitlang$core$immut$internal$path$$of$16$(key));
  }
}
function moonbitlang$core$immut$hashmap$$HashMap$get$54$(self, key) {
  const _bind = self;
  if (_bind === undefined) {
    return undefined;
  } else {
    const _Some = _bind;
    const _node = _Some;
    return moonbitlang$core$immut$hashmap$$Node$get_with_path$54$(_node, key, moonbitlang$core$immut$internal$path$$of$16$(key));
  }
}
function moonbitlang$core$immut$hashmap$$HashMap$get$84$(self, key) {
  const _bind = self;
  if (_bind === undefined) {
    return undefined;
  } else {
    const _Some = _bind;
    const _node = _Some;
    return moonbitlang$core$immut$hashmap$$Node$get_with_path$84$(_node, key, moonbitlang$core$immut$internal$path$$of$78$(key));
  }
}
function moonbitlang$core$immut$hashmap$$HashMap$get$85$(self, key) {
  const _bind = self;
  if (_bind === undefined) {
    return Option$None$29$;
  } else {
    const _Some = _bind;
    const _node = _Some;
    return moonbitlang$core$immut$hashmap$$Node$get_with_path$85$(_node, key, moonbitlang$core$immut$internal$path$$of$16$(key));
  }
}
function moonbitlang$core$immut$hashmap$$join_2$83$(key1, value1, path1, key2, value2, path2) {
  const _p = path1;
  const idx1 = _p & 31;
  const _p$2 = path2;
  const idx2 = _p$2 & 31;
  if (idx1 === idx2) {
    let node;
    const _p$3 = path1;
    if (_p$3 >>> 0 <= 127 >>> 0) {
      const _p$4 = { _0: key1, _1: value1 };
      node = new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$30$(key2, value2, new $64$moonbitlang$47$core$47$list$46$List$More$23$(_p$4, $64$moonbitlang$47$core$47$list$46$List$Empty$23$));
    } else {
      const _p$4 = path1;
      const _tmp = _p$4 >>> 5 | 0;
      const _p$5 = path2;
      node = moonbitlang$core$immut$hashmap$$join_2$83$(key1, value1, _tmp, key2, value2, _p$5 >>> 5 | 0);
    }
    return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Branch$30$(moonbitlang$core$immut$internal$sparse_array$$singleton$23$(idx1, node));
  } else {
    let node1;
    let node2;
    _L: {
      const _p$3 = path1;
      if (_p$3 >>> 0 <= 127 >>> 0) {
        const _tmp = new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$30$(key1, value1, $64$moonbitlang$47$core$47$list$46$List$Empty$23$);
        const _tmp$2 = new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$30$(key2, value2, $64$moonbitlang$47$core$47$list$46$List$Empty$23$);
        node1 = _tmp;
        node2 = _tmp$2;
        break _L;
      } else {
        const _p$4 = path1;
        const _tmp = new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$30$(key1, value1, _p$4 >>> 5 | 0);
        const _p$5 = path2;
        const _tmp$2 = new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$30$(key2, value2, _p$5 >>> 5 | 0);
        node1 = _tmp;
        node2 = _tmp$2;
        break _L;
      }
    }
    return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Branch$30$(moonbitlang$core$immut$internal$sparse_array$$doubleton$23$(idx1, node1, idx2, node2));
  }
}
function moonbitlang$core$immut$hashmap$$join_2$82$(key1, value1, path1, key2, value2, path2) {
  const _p = path1;
  const idx1 = _p & 31;
  const _p$2 = path2;
  const idx2 = _p$2 & 31;
  if (idx1 === idx2) {
    let node;
    const _p$3 = path1;
    if (_p$3 >>> 0 <= 127 >>> 0) {
      const _p$4 = { _0: key1, _1: value1 };
      node = new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$31$(key2, value2, new $64$moonbitlang$47$core$47$list$46$List$More$24$(_p$4, $64$moonbitlang$47$core$47$list$46$List$Empty$24$));
    } else {
      const _p$4 = path1;
      const _tmp = _p$4 >>> 5 | 0;
      const _p$5 = path2;
      node = moonbitlang$core$immut$hashmap$$join_2$82$(key1, value1, _tmp, key2, value2, _p$5 >>> 5 | 0);
    }
    return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Branch$31$(moonbitlang$core$immut$internal$sparse_array$$singleton$24$(idx1, node));
  } else {
    let node1;
    let node2;
    _L: {
      const _p$3 = path1;
      if (_p$3 >>> 0 <= 127 >>> 0) {
        const _tmp = new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$31$(key1, value1, $64$moonbitlang$47$core$47$list$46$List$Empty$24$);
        const _tmp$2 = new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$31$(key2, value2, $64$moonbitlang$47$core$47$list$46$List$Empty$24$);
        node1 = _tmp;
        node2 = _tmp$2;
        break _L;
      } else {
        const _p$4 = path1;
        const _tmp = new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$31$(key1, value1, _p$4 >>> 5 | 0);
        const _p$5 = path2;
        const _tmp$2 = new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$31$(key2, value2, _p$5 >>> 5 | 0);
        node1 = _tmp;
        node2 = _tmp$2;
        break _L;
      }
    }
    return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Branch$31$(moonbitlang$core$immut$internal$sparse_array$$doubleton$24$(idx1, node1, idx2, node2));
  }
}
function moonbitlang$core$immut$hashmap$$join_2$84$(key1, value1, path1, key2, value2, path2) {
  const _p = path1;
  const idx1 = _p & 31;
  const _p$2 = path2;
  const idx2 = _p$2 & 31;
  if (idx1 === idx2) {
    let node;
    const _p$3 = path1;
    if (_p$3 >>> 0 <= 127 >>> 0) {
      const _p$4 = { _0: key1, _1: value1 };
      node = new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$32$(key2, value2, new $64$moonbitlang$47$core$47$list$46$List$More$25$(_p$4, $64$moonbitlang$47$core$47$list$46$List$Empty$25$));
    } else {
      const _p$4 = path1;
      const _tmp = _p$4 >>> 5 | 0;
      const _p$5 = path2;
      node = moonbitlang$core$immut$hashmap$$join_2$84$(key1, value1, _tmp, key2, value2, _p$5 >>> 5 | 0);
    }
    return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Branch$32$(moonbitlang$core$immut$internal$sparse_array$$singleton$25$(idx1, node));
  } else {
    let node1;
    let node2;
    _L: {
      const _p$3 = path1;
      if (_p$3 >>> 0 <= 127 >>> 0) {
        const _tmp = new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$32$(key1, value1, $64$moonbitlang$47$core$47$list$46$List$Empty$25$);
        const _tmp$2 = new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$32$(key2, value2, $64$moonbitlang$47$core$47$list$46$List$Empty$25$);
        node1 = _tmp;
        node2 = _tmp$2;
        break _L;
      } else {
        const _p$4 = path1;
        const _tmp = new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$32$(key1, value1, _p$4 >>> 5 | 0);
        const _p$5 = path2;
        const _tmp$2 = new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$32$(key2, value2, _p$5 >>> 5 | 0);
        node1 = _tmp;
        node2 = _tmp$2;
        break _L;
      }
    }
    return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Branch$32$(moonbitlang$core$immut$internal$sparse_array$$doubleton$25$(idx1, node1, idx2, node2));
  }
}
function moonbitlang$core$immut$hashmap$$join_2$57$(key1, value1, path1, key2, value2, path2) {
  const _p = path1;
  const idx1 = _p & 31;
  const _p$2 = path2;
  const idx2 = _p$2 & 31;
  if (idx1 === idx2) {
    let node;
    const _p$3 = path1;
    if (_p$3 >>> 0 <= 127 >>> 0) {
      const _p$4 = { _0: key1, _1: value1 };
      node = new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$33$(key2, value2, new $64$moonbitlang$47$core$47$list$46$List$More$26$(_p$4, $64$moonbitlang$47$core$47$list$46$List$Empty$26$));
    } else {
      const _p$4 = path1;
      const _tmp = _p$4 >>> 5 | 0;
      const _p$5 = path2;
      node = moonbitlang$core$immut$hashmap$$join_2$57$(key1, value1, _tmp, key2, value2, _p$5 >>> 5 | 0);
    }
    return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Branch$33$(moonbitlang$core$immut$internal$sparse_array$$singleton$26$(idx1, node));
  } else {
    let node1;
    let node2;
    _L: {
      const _p$3 = path1;
      if (_p$3 >>> 0 <= 127 >>> 0) {
        const _tmp = new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$33$(key1, value1, $64$moonbitlang$47$core$47$list$46$List$Empty$26$);
        const _tmp$2 = new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$33$(key2, value2, $64$moonbitlang$47$core$47$list$46$List$Empty$26$);
        node1 = _tmp;
        node2 = _tmp$2;
        break _L;
      } else {
        const _p$4 = path1;
        const _tmp = new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$33$(key1, value1, _p$4 >>> 5 | 0);
        const _p$5 = path2;
        const _tmp$2 = new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$33$(key2, value2, _p$5 >>> 5 | 0);
        node1 = _tmp;
        node2 = _tmp$2;
        break _L;
      }
    }
    return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Branch$33$(moonbitlang$core$immut$internal$sparse_array$$doubleton$26$(idx1, node1, idx2, node2));
  }
}
function moonbitlang$core$immut$hashmap$$join_2$54$(key1, value1, path1, key2, value2, path2) {
  const _p = path1;
  const idx1 = _p & 31;
  const _p$2 = path2;
  const idx2 = _p$2 & 31;
  if (idx1 === idx2) {
    let node;
    const _p$3 = path1;
    if (_p$3 >>> 0 <= 127 >>> 0) {
      const _p$4 = { _0: key1, _1: value1 };
      node = new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$34$(key2, value2, new $64$moonbitlang$47$core$47$list$46$List$More$27$(_p$4, $64$moonbitlang$47$core$47$list$46$List$Empty$27$));
    } else {
      const _p$4 = path1;
      const _tmp = _p$4 >>> 5 | 0;
      const _p$5 = path2;
      node = moonbitlang$core$immut$hashmap$$join_2$54$(key1, value1, _tmp, key2, value2, _p$5 >>> 5 | 0);
    }
    return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Branch$34$(moonbitlang$core$immut$internal$sparse_array$$singleton$27$(idx1, node));
  } else {
    let node1;
    let node2;
    _L: {
      const _p$3 = path1;
      if (_p$3 >>> 0 <= 127 >>> 0) {
        const _tmp = new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$34$(key1, value1, $64$moonbitlang$47$core$47$list$46$List$Empty$27$);
        const _tmp$2 = new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$34$(key2, value2, $64$moonbitlang$47$core$47$list$46$List$Empty$27$);
        node1 = _tmp;
        node2 = _tmp$2;
        break _L;
      } else {
        const _p$4 = path1;
        const _tmp = new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$34$(key1, value1, _p$4 >>> 5 | 0);
        const _p$5 = path2;
        const _tmp$2 = new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$34$(key2, value2, _p$5 >>> 5 | 0);
        node1 = _tmp;
        node2 = _tmp$2;
        break _L;
      }
    }
    return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Branch$34$(moonbitlang$core$immut$internal$sparse_array$$doubleton$27$(idx1, node1, idx2, node2));
  }
}
function moonbitlang$core$immut$hashmap$$join_2$85$(key1, value1, path1, key2, value2, path2) {
  const _p = path1;
  const idx1 = _p & 31;
  const _p$2 = path2;
  const idx2 = _p$2 & 31;
  if (idx1 === idx2) {
    let node;
    const _p$3 = path1;
    if (_p$3 >>> 0 <= 127 >>> 0) {
      const _p$4 = { _0: key1, _1: value1 };
      node = new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$35$(key2, value2, new $64$moonbitlang$47$core$47$list$46$List$More$28$(_p$4, $64$moonbitlang$47$core$47$list$46$List$Empty$28$));
    } else {
      const _p$4 = path1;
      const _tmp = _p$4 >>> 5 | 0;
      const _p$5 = path2;
      node = moonbitlang$core$immut$hashmap$$join_2$85$(key1, value1, _tmp, key2, value2, _p$5 >>> 5 | 0);
    }
    return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Branch$35$(moonbitlang$core$immut$internal$sparse_array$$singleton$28$(idx1, node));
  } else {
    let node1;
    let node2;
    _L: {
      const _p$3 = path1;
      if (_p$3 >>> 0 <= 127 >>> 0) {
        const _tmp = new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$35$(key1, value1, $64$moonbitlang$47$core$47$list$46$List$Empty$28$);
        const _tmp$2 = new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$35$(key2, value2, $64$moonbitlang$47$core$47$list$46$List$Empty$28$);
        node1 = _tmp;
        node2 = _tmp$2;
        break _L;
      } else {
        const _p$4 = path1;
        const _tmp = new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$35$(key1, value1, _p$4 >>> 5 | 0);
        const _p$5 = path2;
        const _tmp$2 = new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$35$(key2, value2, _p$5 >>> 5 | 0);
        node1 = _tmp;
        node2 = _tmp$2;
        break _L;
      }
    }
    return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Branch$35$(moonbitlang$core$immut$internal$sparse_array$$doubleton$28$(idx1, node1, idx2, node2));
  }
}
function moonbitlang$core$immut$hashmap$$Node$add_with_path$83$(self, key, value, path) {
  switch (self.$tag) {
    case 1: {
      const _Leaf = self;
      const _key1 = _Leaf._0;
      const _value1 = _Leaf._1;
      const _bucket = _Leaf._2;
      if (key === _key1) {
        return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$30$(key, value, _bucket);
      } else {
        const _bind = moonbitlang$core$list$$List$find_index$81$(_bucket, (kv) => kv._0 === key);
        let new_bucket;
        if (_bind === undefined) {
          new_bucket = _bucket;
        } else {
          const _Some = _bind;
          const _index = _Some;
          new_bucket = moonbitlang$core$list$$List$remove_at$14$(_bucket, _index);
        }
        const _p = { _0: _key1, _1: _value1 };
        return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$30$(key, value, new $64$moonbitlang$47$core$47$list$46$List$More$23$(_p, new_bucket));
      }
    }
    case 0: {
      const _Flat = self;
      const _key1$2 = _Flat._0;
      const _value1$2 = _Flat._1;
      const _path1 = _Flat._2;
      return path === _path1 && key === _key1$2 ? new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$30$(_key1$2, value, _path1) : moonbitlang$core$immut$hashmap$$join_2$83$(_key1$2, _value1$2, _path1, key, value, path);
    }
    default: {
      const _Branch = self;
      const _children = _Branch._0;
      const _p = path;
      const idx = _p & 31;
      const _bind = moonbitlang$core$immut$internal$sparse_array$$SparseArray$get$23$(_children, idx);
      if (_bind === undefined) {
        const _p$2 = path;
        const child = new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$30$(key, value, _p$2 >>> 5 | 0);
        return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Branch$30$(moonbitlang$core$immut$internal$sparse_array$$SparseArray$add$23$(_children, idx, child));
      } else {
        const _Some = _bind;
        const _child = _Some;
        const _p$2 = path;
        const child = moonbitlang$core$immut$hashmap$$Node$add_with_path$83$(_child, key, value, _p$2 >>> 5 | 0);
        return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Branch$30$(moonbitlang$core$immut$internal$sparse_array$$SparseArray$replace$23$(_children, idx, child));
      }
    }
  }
}
function moonbitlang$core$immut$hashmap$$Node$add_with_path$82$(self, key, value, path) {
  switch (self.$tag) {
    case 1: {
      const _Leaf = self;
      const _key1 = _Leaf._0;
      const _value1 = _Leaf._1;
      const _bucket = _Leaf._2;
      if (key === _key1) {
        return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$31$(key, value, _bucket);
      } else {
        const _bind = moonbitlang$core$list$$List$find_index$86$(_bucket, (kv) => kv._0 === key);
        let new_bucket;
        if (_bind === undefined) {
          new_bucket = _bucket;
        } else {
          const _Some = _bind;
          const _index = _Some;
          new_bucket = moonbitlang$core$list$$List$remove_at$91$(_bucket, _index);
        }
        const _p = { _0: _key1, _1: _value1 };
        return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$31$(key, value, new $64$moonbitlang$47$core$47$list$46$List$More$24$(_p, new_bucket));
      }
    }
    case 0: {
      const _Flat = self;
      const _key1$2 = _Flat._0;
      const _value1$2 = _Flat._1;
      const _path1 = _Flat._2;
      return path === _path1 && key === _key1$2 ? new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$31$(_key1$2, value, _path1) : moonbitlang$core$immut$hashmap$$join_2$82$(_key1$2, _value1$2, _path1, key, value, path);
    }
    default: {
      const _Branch = self;
      const _children = _Branch._0;
      const _p = path;
      const idx = _p & 31;
      const _bind = moonbitlang$core$immut$internal$sparse_array$$SparseArray$get$24$(_children, idx);
      if (_bind === undefined) {
        const _p$2 = path;
        const child = new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$31$(key, value, _p$2 >>> 5 | 0);
        return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Branch$31$(moonbitlang$core$immut$internal$sparse_array$$SparseArray$add$24$(_children, idx, child));
      } else {
        const _Some = _bind;
        const _child = _Some;
        const _p$2 = path;
        const child = moonbitlang$core$immut$hashmap$$Node$add_with_path$82$(_child, key, value, _p$2 >>> 5 | 0);
        return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Branch$31$(moonbitlang$core$immut$internal$sparse_array$$SparseArray$replace$24$(_children, idx, child));
      }
    }
  }
}
function moonbitlang$core$immut$hashmap$$Node$add_with_path$84$(self, key, value, path) {
  switch (self.$tag) {
    case 1: {
      const _Leaf = self;
      const _key1 = _Leaf._0;
      const _value1 = _Leaf._1;
      const _bucket = _Leaf._2;
      if (key.agent === _key1.agent && key.seq === _key1.seq) {
        return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$32$(key, value, _bucket);
      } else {
        const _bind = moonbitlang$core$list$$List$find_index$87$(_bucket, (kv) => {
          const _p = kv._0;
          return _p.agent === key.agent && _p.seq === key.seq;
        });
        let new_bucket;
        if (_bind === undefined) {
          new_bucket = _bucket;
        } else {
          const _Some = _bind;
          const _index = _Some;
          new_bucket = moonbitlang$core$list$$List$remove_at$92$(_bucket, _index);
        }
        const _p = { _0: _key1, _1: _value1 };
        return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$32$(key, value, new $64$moonbitlang$47$core$47$list$46$List$More$25$(_p, new_bucket));
      }
    }
    case 0: {
      const _Flat = self;
      const _key1$2 = _Flat._0;
      const _value1$2 = _Flat._1;
      const _path1 = _Flat._2;
      return path === _path1 && (key.agent === _key1$2.agent && key.seq === _key1$2.seq) ? new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$32$(_key1$2, value, _path1) : moonbitlang$core$immut$hashmap$$join_2$84$(_key1$2, _value1$2, _path1, key, value, path);
    }
    default: {
      const _Branch = self;
      const _children = _Branch._0;
      const _p = path;
      const idx = _p & 31;
      const _bind = moonbitlang$core$immut$internal$sparse_array$$SparseArray$get$25$(_children, idx);
      if (_bind === undefined) {
        const _p$2 = path;
        const child = new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$32$(key, value, _p$2 >>> 5 | 0);
        return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Branch$32$(moonbitlang$core$immut$internal$sparse_array$$SparseArray$add$25$(_children, idx, child));
      } else {
        const _Some = _bind;
        const _child = _Some;
        const _p$2 = path;
        const child = moonbitlang$core$immut$hashmap$$Node$add_with_path$84$(_child, key, value, _p$2 >>> 5 | 0);
        return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Branch$32$(moonbitlang$core$immut$internal$sparse_array$$SparseArray$replace$25$(_children, idx, child));
      }
    }
  }
}
function moonbitlang$core$immut$hashmap$$Node$add_with_path$57$(self, key, value, path) {
  switch (self.$tag) {
    case 1: {
      const _Leaf = self;
      const _key1 = _Leaf._0;
      const _value1 = _Leaf._1;
      const _bucket = _Leaf._2;
      if (key === _key1) {
        return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$33$(key, value, _bucket);
      } else {
        const _bind = moonbitlang$core$list$$List$find_index$88$(_bucket, (kv) => kv._0 === key);
        let new_bucket;
        if (_bind === undefined) {
          new_bucket = _bucket;
        } else {
          const _Some = _bind;
          const _index = _Some;
          new_bucket = moonbitlang$core$list$$List$remove_at$51$(_bucket, _index);
        }
        const _p = { _0: _key1, _1: _value1 };
        return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$33$(key, value, new $64$moonbitlang$47$core$47$list$46$List$More$26$(_p, new_bucket));
      }
    }
    case 0: {
      const _Flat = self;
      const _key1$2 = _Flat._0;
      const _value1$2 = _Flat._1;
      const _path1 = _Flat._2;
      return path === _path1 && key === _key1$2 ? new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$33$(_key1$2, value, _path1) : moonbitlang$core$immut$hashmap$$join_2$57$(_key1$2, _value1$2, _path1, key, value, path);
    }
    default: {
      const _Branch = self;
      const _children = _Branch._0;
      const _p = path;
      const idx = _p & 31;
      const _bind = moonbitlang$core$immut$internal$sparse_array$$SparseArray$get$26$(_children, idx);
      if (_bind === undefined) {
        const _p$2 = path;
        const child = new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$33$(key, value, _p$2 >>> 5 | 0);
        return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Branch$33$(moonbitlang$core$immut$internal$sparse_array$$SparseArray$add$26$(_children, idx, child));
      } else {
        const _Some = _bind;
        const _child = _Some;
        const _p$2 = path;
        const child = moonbitlang$core$immut$hashmap$$Node$add_with_path$57$(_child, key, value, _p$2 >>> 5 | 0);
        return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Branch$33$(moonbitlang$core$immut$internal$sparse_array$$SparseArray$replace$26$(_children, idx, child));
      }
    }
  }
}
function moonbitlang$core$immut$hashmap$$Node$add_with_path$54$(self, key, value, path) {
  switch (self.$tag) {
    case 1: {
      const _Leaf = self;
      const _key1 = _Leaf._0;
      const _value1 = _Leaf._1;
      const _bucket = _Leaf._2;
      if (key === _key1) {
        return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$34$(key, value, _bucket);
      } else {
        const _bind = moonbitlang$core$list$$List$find_index$89$(_bucket, (kv) => kv._0 === key);
        let new_bucket;
        if (_bind === undefined) {
          new_bucket = _bucket;
        } else {
          const _Some = _bind;
          const _index = _Some;
          new_bucket = moonbitlang$core$list$$List$remove_at$93$(_bucket, _index);
        }
        const _p = { _0: _key1, _1: _value1 };
        return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$34$(key, value, new $64$moonbitlang$47$core$47$list$46$List$More$27$(_p, new_bucket));
      }
    }
    case 0: {
      const _Flat = self;
      const _key1$2 = _Flat._0;
      const _value1$2 = _Flat._1;
      const _path1 = _Flat._2;
      return path === _path1 && key === _key1$2 ? new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$34$(_key1$2, value, _path1) : moonbitlang$core$immut$hashmap$$join_2$54$(_key1$2, _value1$2, _path1, key, value, path);
    }
    default: {
      const _Branch = self;
      const _children = _Branch._0;
      const _p = path;
      const idx = _p & 31;
      const _bind = moonbitlang$core$immut$internal$sparse_array$$SparseArray$get$27$(_children, idx);
      if (_bind === undefined) {
        const _p$2 = path;
        const child = new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$34$(key, value, _p$2 >>> 5 | 0);
        return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Branch$34$(moonbitlang$core$immut$internal$sparse_array$$SparseArray$add$27$(_children, idx, child));
      } else {
        const _Some = _bind;
        const _child = _Some;
        const _p$2 = path;
        const child = moonbitlang$core$immut$hashmap$$Node$add_with_path$54$(_child, key, value, _p$2 >>> 5 | 0);
        return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Branch$34$(moonbitlang$core$immut$internal$sparse_array$$SparseArray$replace$27$(_children, idx, child));
      }
    }
  }
}
function moonbitlang$core$immut$hashmap$$Node$add_with_path$85$(self, key, value, path) {
  switch (self.$tag) {
    case 1: {
      const _Leaf = self;
      const _key1 = _Leaf._0;
      const _value1 = _Leaf._1;
      const _bucket = _Leaf._2;
      if (key === _key1) {
        return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$35$(key, value, _bucket);
      } else {
        const _bind = moonbitlang$core$list$$List$find_index$90$(_bucket, (kv) => kv._0 === key);
        let new_bucket;
        if (_bind === undefined) {
          new_bucket = _bucket;
        } else {
          const _Some = _bind;
          const _index = _Some;
          new_bucket = moonbitlang$core$list$$List$remove_at$94$(_bucket, _index);
        }
        const _p = { _0: _key1, _1: _value1 };
        return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$35$(key, value, new $64$moonbitlang$47$core$47$list$46$List$More$28$(_p, new_bucket));
      }
    }
    case 0: {
      const _Flat = self;
      const _key1$2 = _Flat._0;
      const _value1$2 = _Flat._1;
      const _path1 = _Flat._2;
      return path === _path1 && key === _key1$2 ? new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$35$(_key1$2, value, _path1) : moonbitlang$core$immut$hashmap$$join_2$85$(_key1$2, _value1$2, _path1, key, value, path);
    }
    default: {
      const _Branch = self;
      const _children = _Branch._0;
      const _p = path;
      const idx = _p & 31;
      const _bind = moonbitlang$core$immut$internal$sparse_array$$SparseArray$get$28$(_children, idx);
      if (_bind === undefined) {
        const _p$2 = path;
        const child = new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$35$(key, value, _p$2 >>> 5 | 0);
        return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Branch$35$(moonbitlang$core$immut$internal$sparse_array$$SparseArray$add$28$(_children, idx, child));
      } else {
        const _Some = _bind;
        const _child = _Some;
        const _p$2 = path;
        const child = moonbitlang$core$immut$hashmap$$Node$add_with_path$85$(_child, key, value, _p$2 >>> 5 | 0);
        return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Branch$35$(moonbitlang$core$immut$internal$sparse_array$$SparseArray$replace$28$(_children, idx, child));
      }
    }
  }
}
function moonbitlang$core$immut$hashmap$$HashMap$filter$95$(self, pred) {
  const go = (node) => {
    switch (node.$tag) {
      case 1: {
        const _Leaf = node;
        const _key1 = _Leaf._0;
        const _value1 = _Leaf._1;
        const _bucket = _Leaf._2;
        const new_bucket = moonbitlang$core$list$$List$filter$81$(_bucket, (kv) => pred(kv._0, kv._1));
        if (pred(_key1, _value1)) {
          return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$30$(_key1, _value1, new_bucket);
        } else {
          if (new_bucket.$tag === 0) {
            return undefined;
          } else {
            const _More = new_bucket;
            const _x = _More._0;
            const _k1 = _x._0;
            const _v1 = _x._1;
            const _tail = _More._1;
            return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$30$(_k1, _v1, _tail);
          }
        }
      }
      case 0: {
        const _Flat = node;
        const _key1$2 = _Flat._0;
        const _value1$2 = _Flat._1;
        return pred(_key1$2, _value1$2) ? node : undefined;
      }
      default: {
        const _Branch = node;
        const _children = _Branch._0;
        const _bind = moonbitlang$core$immut$internal$sparse_array$$SparseArray$filter$79$(_children, go);
        if (_bind === undefined) {
          return undefined;
        } else {
          const _Some = _bind;
          const _new_children = _Some;
          return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Branch$30$(_new_children);
        }
      }
    }
  };
  const _bind = self;
  if (_bind === undefined) {
    return undefined;
  } else {
    const _Some = _bind;
    const _node = _Some;
    return go(_node);
  }
}
function moonbitlang$core$immut$hashmap$$HashMap$add$83$(self, key, value) {
  const _bind = self;
  if (_bind === undefined) {
    return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$30$(key, value, moonbitlang$core$immut$internal$path$$of$16$(key));
  } else {
    const _Some = _bind;
    const _node = _Some;
    return moonbitlang$core$immut$hashmap$$Node$add_with_path$83$(_node, key, value, moonbitlang$core$immut$internal$path$$of$16$(key));
  }
}
function moonbitlang$core$immut$hashmap$$HashMap$add$82$(self, key, value) {
  const _bind = self;
  if (_bind === undefined) {
    return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$31$(key, value, moonbitlang$core$immut$internal$path$$of$16$(key));
  } else {
    const _Some = _bind;
    const _node = _Some;
    return moonbitlang$core$immut$hashmap$$Node$add_with_path$82$(_node, key, value, moonbitlang$core$immut$internal$path$$of$16$(key));
  }
}
function moonbitlang$core$immut$hashmap$$HashMap$add$84$(self, key, value) {
  const _bind = self;
  if (_bind === undefined) {
    return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$32$(key, value, moonbitlang$core$immut$internal$path$$of$78$(key));
  } else {
    const _Some = _bind;
    const _node = _Some;
    return moonbitlang$core$immut$hashmap$$Node$add_with_path$84$(_node, key, value, moonbitlang$core$immut$internal$path$$of$78$(key));
  }
}
function moonbitlang$core$immut$hashmap$$HashMap$add$57$(self, key, value) {
  const _bind = self;
  if (_bind === undefined) {
    return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$33$(key, value, moonbitlang$core$immut$internal$path$$of$19$(key));
  } else {
    const _Some = _bind;
    const _node = _Some;
    return moonbitlang$core$immut$hashmap$$Node$add_with_path$57$(_node, key, value, moonbitlang$core$immut$internal$path$$of$19$(key));
  }
}
function moonbitlang$core$immut$hashmap$$HashMap$add$54$(self, key, value) {
  const _bind = self;
  if (_bind === undefined) {
    return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$34$(key, value, moonbitlang$core$immut$internal$path$$of$16$(key));
  } else {
    const _Some = _bind;
    const _node = _Some;
    return moonbitlang$core$immut$hashmap$$Node$add_with_path$54$(_node, key, value, moonbitlang$core$immut$internal$path$$of$16$(key));
  }
}
function moonbitlang$core$immut$hashmap$$HashMap$add$85$(self, key, value) {
  const _bind = self;
  if (_bind === undefined) {
    return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$35$(key, value, moonbitlang$core$immut$internal$path$$of$16$(key));
  } else {
    const _Some = _bind;
    const _node = _Some;
    return moonbitlang$core$immut$hashmap$$Node$add_with_path$85$(_node, key, value, moonbitlang$core$immut$internal$path$$of$16$(key));
  }
}
function moonbitlang$core$immut$hashmap$$length$46$node_size$47$3478(node) {
  switch (node.$tag) {
    case 1: {
      const _Leaf = node;
      const _bucket = _Leaf._2;
      return 1 + moonbitlang$core$list$$List$length$14$(_bucket) | 0;
    }
    case 0: {
      return 1;
    }
    default: {
      const _Branch = node;
      const _children = _Branch._0;
      let _tmp = 0;
      let _tmp$2 = 0;
      while (true) {
        const i = _tmp;
        const total_size = _tmp$2;
        if (i < _children.data.length) {
          _tmp = i + 1 | 0;
          const _tmp$3 = _children.data;
          $bound_check(_tmp$3, i);
          _tmp$2 = total_size + moonbitlang$core$immut$hashmap$$length$46$node_size$47$3478(_tmp$3[i]) | 0;
          continue;
        } else {
          return total_size;
        }
      }
    }
  }
}
function moonbitlang$core$immut$hashmap$$HashMap$length$83$(self) {
  const _bind = self;
  if (_bind === undefined) {
    return 0;
  } else {
    const _Some = _bind;
    const _node = _Some;
    return moonbitlang$core$immut$hashmap$$length$46$node_size$47$3478(_node);
  }
}
function moonbitlang$core$immut$hashmap$$HashMap$each$95$(self, f) {
  const go = (node) => {
    switch (node.$tag) {
      case 1: {
        const _Leaf = node;
        const _k = _Leaf._0;
        const _v = _Leaf._1;
        const _bucket = _Leaf._2;
        f(_k, _v);
        let _tmp = _bucket;
        while (true) {
          const _p = _tmp;
          if (_p.$tag === 0) {
            return;
          } else {
            const _p$2 = _p;
            const _p$3 = _p$2._0;
            const _p$4 = _p$2._1;
            f(_p$3._0, _p$3._1);
            _tmp = _p$4;
            continue;
          }
        }
      }
      case 0: {
        const _Flat = node;
        const _k$2 = _Flat._0;
        const _v$2 = _Flat._1;
        f(_k$2, _v$2);
        return;
      }
      default: {
        const _Branch = node;
        const _children = _Branch._0;
        moonbitlang$core$immut$internal$sparse_array$$SparseArray$each$79$(_children, go);
        return;
      }
    }
  };
  const _bind = self;
  if (_bind === undefined) {
    return;
  } else {
    const _Some = _bind;
    const _node = _Some;
    go(_node);
    return;
  }
}
function moonbitlang$core$immut$hashmap$$HashMap$to_array$83$(self) {
  const arr = moonbitlang$core$array$$Array$new$46$inner$14$(moonbitlang$core$immut$hashmap$$HashMap$length$83$(self));
  moonbitlang$core$immut$hashmap$$HashMap$each$95$(self, (k, v) => {
    moonbitlang$core$array$$Array$push$14$(arr, { _0: k, _1: v });
  });
  return arr;
}
function moonbitlang$core$immut$hashset$$Node$contains$16$(self, key, path) {
  let _tmp = self;
  let _tmp$2 = path;
  _L: while (true) {
    const _param_0 = _tmp;
    const _param_1 = _tmp$2;
    switch (_param_0.$tag) {
      case 1: {
        const _Leaf = _param_0;
        const _key1 = _Leaf._0;
        const _bucket = _Leaf._1;
        return key === _key1 || moonbitlang$core$list$$List$contains$16$(_bucket, key);
      }
      case 0: {
        const _Flat = _param_0;
        const _key1$2 = _Flat._0;
        const _path1 = _Flat._1;
        return _param_1 === _path1 && key === _key1$2;
      }
      default: {
        const _Branch = _param_0;
        const _children = _Branch._0;
        const _p = _param_1;
        const idx = _p & 31;
        const _bind = moonbitlang$core$immut$internal$sparse_array$$SparseArray$get$22$(_children, idx);
        if (_bind === undefined) {
        } else {
          const _Some = _bind;
          const _child = _Some;
          _tmp = _child;
          const _p$2 = _param_1;
          _tmp$2 = _p$2 >>> 5 | 0;
          continue _L;
        }
        return false;
      }
    }
  }
}
function moonbitlang$core$immut$hashset$$HashSet$contains$16$(self, key) {
  const _bind = self;
  if (_bind === undefined) {
    return false;
  } else {
    const _Some = _bind;
    const _node = _Some;
    return moonbitlang$core$immut$hashset$$Node$contains$16$(_node, key, moonbitlang$core$immut$internal$path$$of$16$(key));
  }
}
function moonbitlang$core$immut$hashset$$join_2$16$(key1, path1, key2, path2) {
  const _p = path1;
  const idx1 = _p & 31;
  const _p$2 = path2;
  const idx2 = _p$2 & 31;
  if (idx1 === idx2) {
    let node;
    const _p$3 = path1;
    if (_p$3 >>> 0 <= 127 >>> 0) {
      node = new $64$moonbitlang$47$core$47$immut$47$hashset$46$Node$Leaf$22$(key2, new $64$moonbitlang$47$core$47$list$46$List$More$22$(key1, $64$moonbitlang$47$core$47$list$46$List$Empty$22$));
    } else {
      const _p$4 = path1;
      const _tmp = _p$4 >>> 5 | 0;
      const _p$5 = path2;
      node = moonbitlang$core$immut$hashset$$join_2$16$(key1, _tmp, key2, _p$5 >>> 5 | 0);
    }
    return new $64$moonbitlang$47$core$47$immut$47$hashset$46$Node$Branch$22$(moonbitlang$core$immut$internal$sparse_array$$singleton$22$(idx1, node));
  } else {
    let node1;
    let node2;
    _L: {
      const _p$3 = path1;
      if (_p$3 >>> 0 <= 127 >>> 0) {
        const _tmp = new $64$moonbitlang$47$core$47$immut$47$hashset$46$Node$Leaf$22$(key1, $64$moonbitlang$47$core$47$list$46$List$Empty$22$);
        const _tmp$2 = new $64$moonbitlang$47$core$47$immut$47$hashset$46$Node$Leaf$22$(key2, $64$moonbitlang$47$core$47$list$46$List$Empty$22$);
        node1 = _tmp;
        node2 = _tmp$2;
        break _L;
      } else {
        const _p$4 = path1;
        const _tmp = new $64$moonbitlang$47$core$47$immut$47$hashset$46$Node$Flat$22$(key1, _p$4 >>> 5 | 0);
        const _p$5 = path2;
        const _tmp$2 = new $64$moonbitlang$47$core$47$immut$47$hashset$46$Node$Flat$22$(key2, _p$5 >>> 5 | 0);
        node1 = _tmp;
        node2 = _tmp$2;
        break _L;
      }
    }
    return new $64$moonbitlang$47$core$47$immut$47$hashset$46$Node$Branch$22$(moonbitlang$core$immut$internal$sparse_array$$doubleton$22$(idx1, node1, idx2, node2));
  }
}
function moonbitlang$core$immut$hashset$$Node$add_with_path$16$(self, key, path) {
  switch (self.$tag) {
    case 1: {
      const _Leaf = self;
      const _key1 = _Leaf._0;
      const _bucket = _Leaf._1;
      return key === _key1 || moonbitlang$core$list$$List$contains$16$(_bucket, key) ? self : new $64$moonbitlang$47$core$47$immut$47$hashset$46$Node$Leaf$22$(key, new $64$moonbitlang$47$core$47$list$46$List$More$22$(_key1, _bucket));
    }
    case 0: {
      const _Flat = self;
      const _key1$2 = _Flat._0;
      const _path1 = _Flat._1;
      return path === _path1 && key === _key1$2 ? self : moonbitlang$core$immut$hashset$$join_2$16$(_key1$2, _path1, key, path);
    }
    default: {
      const _Branch = self;
      const _children = _Branch._0;
      const _p = path;
      const idx = _p & 31;
      const _bind = moonbitlang$core$immut$internal$sparse_array$$SparseArray$get$22$(_children, idx);
      if (_bind === undefined) {
        const _p$2 = path;
        const child = new $64$moonbitlang$47$core$47$immut$47$hashset$46$Node$Flat$22$(key, _p$2 >>> 5 | 0);
        return new $64$moonbitlang$47$core$47$immut$47$hashset$46$Node$Branch$22$(moonbitlang$core$immut$internal$sparse_array$$SparseArray$add$22$(_children, idx, child));
      } else {
        const _Some = _bind;
        const _child = _Some;
        const _p$2 = path;
        const child = moonbitlang$core$immut$hashset$$Node$add_with_path$16$(_child, key, _p$2 >>> 5 | 0);
        return new $64$moonbitlang$47$core$47$immut$47$hashset$46$Node$Branch$22$(moonbitlang$core$immut$internal$sparse_array$$SparseArray$replace$22$(_children, idx, child));
      }
    }
  }
}
function moonbitlang$core$immut$hashset$$HashSet$add$16$(self, key) {
  const _bind = self;
  if (_bind === undefined) {
    return new $64$moonbitlang$47$core$47$immut$47$hashset$46$Node$Flat$22$(key, moonbitlang$core$immut$internal$path$$of$16$(key));
  } else {
    const _Some = _bind;
    const _node = _Some;
    return moonbitlang$core$immut$hashset$$Node$add_with_path$16$(_node, key, moonbitlang$core$immut$internal$path$$of$16$(key));
  }
}
function moonbitlang$core$immut$hashset$$HashSet$each$96$(self, f) {
  const go = (node) => {
    switch (node.$tag) {
      case 1: {
        const _Leaf = node;
        const _k = _Leaf._0;
        const _bucket = _Leaf._1;
        f(_k);
        let _tmp = _bucket;
        while (true) {
          const _p = _tmp;
          if (_p.$tag === 0) {
            return;
          } else {
            const _p$2 = _p;
            const _p$3 = _p$2._0;
            const _p$4 = _p$2._1;
            f(_p$3);
            _tmp = _p$4;
            continue;
          }
        }
      }
      case 0: {
        const _Flat = node;
        const _k$2 = _Flat._0;
        f(_k$2);
        return;
      }
      default: {
        const _Branch = node;
        const _children = _Branch._0;
        moonbitlang$core$immut$internal$sparse_array$$SparseArray$each$80$(_children, go);
        return;
      }
    }
  };
  const _bind = self;
  if (_bind === undefined) {
    return;
  } else {
    const _Some = _bind;
    const _node = _Some;
    go(_node);
    return;
  }
}
function moonbitlang$core$immut$hashset$$HashSet$iter$16$(self) {
  const empty = new $64$moonbitlang$47$core$47$immut$47$hashset$46$HashSet$58$58$iter$46$CurrNode$Bucket$22$($64$moonbitlang$47$core$47$list$46$List$Empty$22$);
  const _bind = self;
  let _tmp;
  if (_bind === undefined) {
    _tmp = empty;
  } else {
    const _Some = _bind;
    const _tree = _Some;
    _tmp = new $64$moonbitlang$47$core$47$immut$47$hashset$46$HashSet$58$58$iter$46$CurrNode$Tree$22$(_tree);
  }
  const curr_node = { val: _tmp };
  const curr_index = { val: 0 };
  const parents = [];
  const _p = () => {
    let _tmp$2 = curr_node.val;
    _L: while (true) {
      const _param = _tmp$2;
      _L$2: {
        let parent;
        let parent_index;
        _L$3: {
          if (_param.$tag === 0) {
            const _Tree = _param;
            const _x = _Tree._0;
            switch (_x.$tag) {
              case 0: {
                const _Flat = _x;
                const _x$2 = _Flat._0;
                curr_node.val = empty;
                return _x$2;
              }
              case 1: {
                const _Leaf = _x;
                const _x$3 = _Leaf._0;
                const _bucket = _Leaf._1;
                curr_node.val = new $64$moonbitlang$47$core$47$immut$47$hashset$46$HashSet$58$58$iter$46$CurrNode$Bucket$22$(_bucket);
                return _x$3;
              }
              default: {
                const _Branch = _x;
                const _children = _Branch._0;
                if (curr_index.val < _children.data.length) {
                  const _tmp$3 = _children.data;
                  const _tmp$4 = curr_index.val;
                  $bound_check(_tmp$3, _tmp$4);
                  const child = _tmp$3[_tmp$4];
                  moonbitlang$core$array$$Array$push$49$(parents, { _0: _Tree, _1: curr_index.val + 1 | 0 });
                  curr_index.val = 0;
                  _tmp$2 = new $64$moonbitlang$47$core$47$immut$47$hashset$46$HashSet$58$58$iter$46$CurrNode$Tree$22$(child);
                  continue _L;
                } else {
                  const _bind$2 = moonbitlang$core$array$$Array$pop$49$(parents);
                  if (_bind$2 === undefined) {
                    break _L$2;
                  } else {
                    const _Some = _bind$2;
                    const _x$4 = _Some;
                    const _parent = _x$4._0;
                    const _parent_index = _x$4._1;
                    parent = _parent;
                    parent_index = _parent_index;
                    break _L$3;
                  }
                }
              }
            }
          } else {
            const _Bucket = _param;
            const _x = _Bucket._0;
            if (_x.$tag === 1) {
              const _More = _x;
              const _x$2 = _More._0;
              const _tail = _More._1;
              curr_node.val = new $64$moonbitlang$47$core$47$immut$47$hashset$46$HashSet$58$58$iter$46$CurrNode$Bucket$22$(_tail);
              return _x$2;
            } else {
              const _bind$2 = moonbitlang$core$array$$Array$pop$49$(parents);
              if (_bind$2 === undefined) {
                break _L$2;
              } else {
                const _Some = _bind$2;
                const _x$2 = _Some;
                const _parent = _x$2._0;
                const _parent_index = _x$2._1;
                parent = _parent;
                parent_index = _parent_index;
                break _L$3;
              }
            }
          }
        }
        curr_node.val = parent;
        curr_index.val = parent_index;
        _tmp$2 = parent;
        continue;
      }
      return undefined;
    }
  };
  return _p;
}
function moonbitlang$core$immut$hashset$$HashSet$from_array$16$(arr) {
  let _tmp = arr.end - arr.start | 0;
  let _tmp$2 = undefined;
  while (true) {
    const _param_0 = _tmp;
    const _param_1 = _tmp$2;
    if (_param_0 === 0) {
      return _param_1;
    } else {
      const k = moonbitlang$core$array$$ArrayView$at$16$(arr, _param_0 - 1 | 0);
      _tmp = _param_0 - 1 | 0;
      _tmp$2 = moonbitlang$core$immut$hashset$$HashSet$add$16$(_param_1, k);
      continue;
    }
  }
}
function moonbitlang$core$queue$$Queue$new$16$() {
  return { length: 0, first: undefined, last: undefined };
}
function moonbitlang$core$queue$$Queue$clear$16$(self) {
  self.length = 0;
  self.first = undefined;
  self.last = undefined;
}
function moonbitlang$core$queue$$Queue$push$16$(self, x) {
  const cell = { content: x, next: undefined };
  const _bind = self.last;
  if (_bind === undefined) {
    self.length = 1;
    self.first = cell;
    self.last = cell;
    return;
  } else {
    const _Some = _bind;
    const _last = _Some;
    _last.next = cell;
    self.length = self.length + 1 | 0;
    self.last = cell;
    return;
  }
}
function moonbitlang$core$queue$$Queue$pop$16$(self) {
  const _bind = self.first;
  if (_bind === undefined) {
    return undefined;
  } else {
    const _Some = _bind;
    const _x = _Some;
    const _content = _x.content;
    const _x$2 = _x.next;
    if (_x$2 === undefined) {
      moonbitlang$core$queue$$Queue$clear$16$(self);
      return _content;
    } else {
      self.length = self.length - 1 | 0;
      self.first = _x$2;
      return _content;
    }
  }
}
function moonbitlang$core$builtin$$Show$output$41$(self, logger) {
  logger.method_table.method_0(logger.self, Error$$to_string(self));
}
function moonbitlang$core$builtin$$ToJson$to_json$74$(_x_403) {
  const _bind = [];
  const $36$map = moonbitlang$core$builtin$$Map$from_array$56$({ buf: _bind, start: 0, end: 0 });
  moonbitlang$core$builtin$$Map$set$56$($36$map, "map", moonbitlang$core$builtin$$ToJson$to_json$62$(_x_403.map));
  return new $64$moonbitlang$47$core$47$builtin$46$Json$Object($36$map);
}
function moonbitlang$core$json$$FromJson$from_json$74$(_x_393, _x_394) {
  let _de_map_395 = undefined;
  if (_x_393.$tag === 6) {
    const _Object = _x_393;
    const __map = _Object._0;
    const _bind = moonbitlang$core$builtin$$Map$get$56$(__map, "map");
    if (_bind === undefined) {
    } else {
      const _Some = _bind;
      const __v = _Some;
      const _p = "map";
      const _bind$2 = moonbitlang$core$json$$FromJson$from_json$75$(__v, new $64$moonbitlang$47$core$47$json$46$JsonPath$Key(_x_394, _p));
      let _tmp;
      if (_bind$2.$tag === 1) {
        const _ok = _bind$2;
        _tmp = _ok._0;
      } else {
        return _bind$2;
      }
      _de_map_395 = _tmp;
    }
  } else {
    return new Result$Err$36$(new Error$moonbitlang$47$core$47$json$46$JsonDecodeError$46$JsonDecodeError({ _0: _x_394, _1: "Expected object to deserialize VersionVector" }));
  }
  const _bind = _de_map_395;
  let _de_map_395$2;
  if (_bind === undefined) {
    return new Result$Err$36$(new Error$moonbitlang$47$core$47$json$46$JsonDecodeError$46$JsonDecodeError({ _0: _x_394, _1: "Missing field map" }));
  } else {
    const _Some = _bind;
    _de_map_395$2 = _Some;
  }
  return new Result$Ok$36$({ map: _de_map_395$2 });
}
function dowdiness$crdt$causal_graph$$CausalGraph$update_frontier(self, new_lv, parents) {
  const _p = self.frontier;
  const _p$2 = [];
  const _p$3 = _p.length;
  let _tmp = 0;
  while (true) {
    const _p$4 = _tmp;
    if (_p$4 < _p$3) {
      const _p$5 = _p[_p$4];
      if (!moonbitlang$core$array$$Array$contains$16$(parents, _p$5)) {
        moonbitlang$core$array$$Array$push$16$(_p$2, _p$5);
      }
      _tmp = _p$4 + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const frontier = _p$2;
  moonbitlang$core$array$$Array$push$16$(frontier, new_lv);
  self.frontier = frontier;
}
function dowdiness$crdt$causal_graph$$RawVersion$new(agent, seq) {
  return { agent: agent, seq: seq };
}
function dowdiness$crdt$causal_graph$$CausalGraph$add_version(self, parents, agent) {
  let lamport;
  if (parents.length === 0) {
    lamport = 0;
  } else {
    const _p = moonbitlang$core$builtin$$Iter$map$54$(moonbitlang$core$array$$Array$iter$16$(parents), (lv) => {
      const _bind = moonbitlang$core$immut$hashmap$$HashMap$get$82$(self.entries, lv);
      if (_bind === undefined) {
        return 0;
      } else {
        const _Some = _bind;
        const _entry = _Some;
        return _entry.lamport;
      }
    });
    const _p$2 = 0;
    let _p$3 = _p$2;
    while (true) {
      const _p$4 = moonbitlang$core$builtin$$Iter$next$16$(_p);
      if (_p$4 === undefined) {
        break;
      } else {
        const _p$5 = _p$4;
        const _p$6 = _p$5;
        const _p$7 = _p$3;
        _p$3 = _p$6 > _p$7 ? _p$6 : _p$7;
        continue;
      }
    }
    const max_parent_lamport = _p$3;
    lamport = max_parent_lamport + 1 | 0;
  }
  const _bind = moonbitlang$core$immut$hashmap$$HashMap$get$57$(self.agent_seqs, agent);
  let seq;
  if (_bind === undefined) {
    seq = 0;
  } else {
    const _Some = _bind;
    const _s = _Some;
    seq = _s + 1 | 0;
  }
  const lv = self.next_lv;
  const entry = { parents: parents, agent: agent, seq: seq, lamport: lamport };
  self.entries = moonbitlang$core$immut$hashmap$$HashMap$add$82$(self.entries, lv, entry);
  self.version_map = moonbitlang$core$immut$hashmap$$HashMap$add$84$(self.version_map, dowdiness$crdt$causal_graph$$RawVersion$new(agent, seq), lv);
  self.next_lv = lv + 1 | 0;
  self.agent_seqs = moonbitlang$core$immut$hashmap$$HashMap$add$57$(self.agent_seqs, agent, seq);
  dowdiness$crdt$causal_graph$$CausalGraph$update_frontier(self, lv, parents);
  return lv;
}
function dowdiness$crdt$causal_graph$$CausalGraph$new() {
  return { entries: undefined, version_map: undefined, next_lv: 0, frontier: [], agent_seqs: undefined };
}
function dowdiness$crdt$causal_graph$$CausalGraph$get_entry(self, lv) {
  return moonbitlang$core$immut$hashmap$$HashMap$get$82$(self.entries, lv);
}
function dowdiness$crdt$causal_graph$$collect_reachable_versions(graph, frontier) {
  let visited = undefined;
  const queue = moonbitlang$core$queue$$Queue$new$16$();
  const _len = frontier.length;
  let _tmp = 0;
  while (true) {
    const _i = _tmp;
    if (_i < _len) {
      const lv = frontier[_i];
      moonbitlang$core$queue$$Queue$push$16$(queue, lv);
      _tmp = _i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  while (true) {
    if (!(queue.length === 0)) {
      const _bind = moonbitlang$core$queue$$Queue$pop$16$(queue);
      if (_bind === undefined) {
        break;
      } else {
        const _Some = _bind;
        const _current = _Some;
        if (moonbitlang$core$immut$hashset$$HashSet$contains$16$(visited, _current)) {
          continue;
        }
        visited = moonbitlang$core$immut$hashset$$HashSet$add$16$(visited, _current);
        const _bind$2 = dowdiness$crdt$causal_graph$$CausalGraph$get_entry(graph, _current);
        if (_bind$2 === undefined) {
        } else {
          const _Some$2 = _bind$2;
          const _entry = _Some$2;
          const _arr = _entry.parents;
          const _len$2 = _arr.length;
          let _tmp$2 = 0;
          while (true) {
            const _i = _tmp$2;
            if (_i < _len$2) {
              const parent = _arr[_i];
              if (!moonbitlang$core$immut$hashset$$HashSet$contains$16$(visited, parent)) {
                moonbitlang$core$queue$$Queue$push$16$(queue, parent);
              }
              _tmp$2 = _i + 1 | 0;
              continue;
            } else {
              break;
            }
          }
        }
      }
      continue;
    } else {
      break;
    }
  }
  return visited;
}
function dowdiness$crdt$causal_graph$$topological_sort(graph, versions) {
  let children = undefined;
  const _it = moonbitlang$core$immut$hashset$$HashSet$iter$16$(versions);
  while (true) {
    const _bind = moonbitlang$core$builtin$$Iter$next$16$(_it);
    if (_bind === undefined) {
      break;
    } else {
      const _Some = _bind;
      const _lv = _Some;
      const _bind$2 = dowdiness$crdt$causal_graph$$CausalGraph$get_entry(graph, _lv);
      if (_bind$2 === undefined) {
      } else {
        const _Some$2 = _bind$2;
        const _entry = _Some$2;
        const _arr = _entry.parents;
        const _len = _arr.length;
        let _tmp = 0;
        while (true) {
          const _i = _tmp;
          if (_i < _len) {
            const parent = _arr[_i];
            if (moonbitlang$core$immut$hashset$$HashSet$contains$16$(versions, parent)) {
              const _bind$3 = moonbitlang$core$immut$hashmap$$HashMap$get$85$(children, parent);
              let current_children;
              if (_bind$3.$tag === 1) {
                const _Some$3 = _bind$3;
                current_children = _Some$3._0;
              } else {
                current_children = [];
              }
              moonbitlang$core$array$$Array$push$16$(current_children, _lv);
              children = moonbitlang$core$immut$hashmap$$HashMap$add$85$(children, parent, current_children);
            }
            _tmp = _i + 1 | 0;
            continue;
          } else {
            break;
          }
        }
      }
      continue;
    }
  }
  let in_degree = undefined;
  const _it$2 = moonbitlang$core$immut$hashset$$HashSet$iter$16$(versions);
  while (true) {
    const _bind = moonbitlang$core$builtin$$Iter$next$16$(_it$2);
    if (_bind === undefined) {
      break;
    } else {
      const _Some = _bind;
      const _lv = _Some;
      in_degree = moonbitlang$core$immut$hashmap$$HashMap$add$54$(in_degree, _lv, 0);
      continue;
    }
  }
  const _it$3 = moonbitlang$core$immut$hashset$$HashSet$iter$16$(versions);
  while (true) {
    const _bind = moonbitlang$core$builtin$$Iter$next$16$(_it$3);
    if (_bind === undefined) {
      break;
    } else {
      const _Some = _bind;
      const _lv = _Some;
      const _bind$2 = dowdiness$crdt$causal_graph$$CausalGraph$get_entry(graph, _lv);
      if (_bind$2 === undefined) {
      } else {
        const _Some$2 = _bind$2;
        const _entry = _Some$2;
        const _arr = _entry.parents;
        const _len = _arr.length;
        let _tmp = 0;
        while (true) {
          const _i = _tmp;
          if (_i < _len) {
            const parent = _arr[_i];
            if (moonbitlang$core$immut$hashset$$HashSet$contains$16$(versions, parent)) {
              const _bind$3 = moonbitlang$core$immut$hashmap$$HashMap$get$54$(in_degree, _lv);
              let current_degree;
              if (_bind$3 === undefined) {
                current_degree = 0;
              } else {
                const _Some$3 = _bind$3;
                current_degree = _Some$3;
              }
              in_degree = moonbitlang$core$immut$hashmap$$HashMap$add$54$(in_degree, _lv, current_degree + 1 | 0);
            }
            _tmp = _i + 1 | 0;
            continue;
          } else {
            break;
          }
        }
      }
      continue;
    }
  }
  const queue = moonbitlang$core$queue$$Queue$new$16$();
  const _it$4 = moonbitlang$core$immut$hashset$$HashSet$iter$16$(versions);
  while (true) {
    const _bind = moonbitlang$core$builtin$$Iter$next$16$(_it$4);
    if (_bind === undefined) {
      break;
    } else {
      const _Some = _bind;
      const _lv = _Some;
      _L: {
        _L$2: {
          const _bind$2 = moonbitlang$core$immut$hashmap$$HashMap$get$54$(in_degree, _lv);
          if (_bind$2 === undefined) {
            break _L$2;
          } else {
            const _Some$2 = _bind$2;
            const _x = _Some$2;
            if (_x === 0) {
              break _L$2;
            }
          }
          break _L;
        }
        moonbitlang$core$queue$$Queue$push$16$(queue, _lv);
      }
      continue;
    }
  }
  const result = [];
  while (true) {
    if (!(queue.length === 0)) {
      const _bind = moonbitlang$core$queue$$Queue$pop$16$(queue);
      if (_bind === undefined) {
        break;
      } else {
        const _Some = _bind;
        const _current = _Some;
        moonbitlang$core$array$$Array$push$16$(result, _current);
        const _bind$2 = moonbitlang$core$immut$hashmap$$HashMap$get$85$(children, _current);
        if (_bind$2.$tag === 1) {
          const _Some$2 = _bind$2;
          const _child_list = _Some$2._0;
          const _len = _child_list.length;
          let _tmp = 0;
          while (true) {
            const _i = _tmp;
            if (_i < _len) {
              const child = _child_list[_i];
              const _bind$3 = moonbitlang$core$immut$hashmap$$HashMap$get$54$(in_degree, child);
              if (_bind$3 === undefined) {
              } else {
                const _Some$3 = _bind$3;
                const _degree = _Some$3;
                const new_degree = _degree - 1 | 0;
                in_degree = moonbitlang$core$immut$hashmap$$HashMap$add$54$(in_degree, child, new_degree);
                if (new_degree === 0) {
                  moonbitlang$core$queue$$Queue$push$16$(queue, child);
                }
              }
              _tmp = _i + 1 | 0;
              continue;
            } else {
              break;
            }
          }
        }
      }
      continue;
    } else {
      break;
    }
  }
  moonbitlang$core$array$$Array$sort$16$(result);
  return result;
}
function dowdiness$crdt$causal_graph$$CausalGraph$walk_from_frontier(self, frontier) {
  const reachable = dowdiness$crdt$causal_graph$$collect_reachable_versions(self, frontier);
  return dowdiness$crdt$causal_graph$$topological_sort(self, reachable);
}
function dowdiness$crdt$causal_graph$$CausalGraph$transitive_closure(self, frontiers) {
  let result = undefined;
  const queue = moonbitlang$core$queue$$Queue$new$16$();
  const _len = frontiers.length;
  let _tmp = 0;
  while (true) {
    const _i = _tmp;
    if (_i < _len) {
      const lv = frontiers[_i];
      moonbitlang$core$queue$$Queue$push$16$(queue, lv);
      _tmp = _i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  while (true) {
    if (!(queue.length === 0)) {
      const _bind = moonbitlang$core$queue$$Queue$pop$16$(queue);
      if (_bind === undefined) {
        break;
      } else {
        const _Some = _bind;
        const _current = _Some;
        if (moonbitlang$core$immut$hashset$$HashSet$contains$16$(result, _current)) {
          continue;
        }
        result = moonbitlang$core$immut$hashset$$HashSet$add$16$(result, _current);
        const _bind$2 = moonbitlang$core$immut$hashmap$$HashMap$get$82$(self.entries, _current);
        if (_bind$2 === undefined) {
        } else {
          const _Some$2 = _bind$2;
          const _entry = _Some$2;
          const _arr = _entry.parents;
          const _len$2 = _arr.length;
          let _tmp$2 = 0;
          while (true) {
            const _i = _tmp$2;
            if (_i < _len$2) {
              const parent = _arr[_i];
              moonbitlang$core$queue$$Queue$push$16$(queue, parent);
              _tmp$2 = _i + 1 | 0;
              continue;
            } else {
              break;
            }
          }
        }
      }
      continue;
    } else {
      break;
    }
  }
  return result;
}
function dowdiness$crdt$causal_graph$$CausalGraph$graph_diff(self, from, to) {
  const from_set = dowdiness$crdt$causal_graph$$CausalGraph$transitive_closure(self, from);
  const to_set = dowdiness$crdt$causal_graph$$CausalGraph$transitive_closure(self, to);
  const retreat = moonbitlang$core$builtin$$Iter$to_array$16$(moonbitlang$core$builtin$$Iter$filter$16$(moonbitlang$core$immut$hashset$$HashSet$iter$16$(from_set), (lv) => !moonbitlang$core$immut$hashset$$HashSet$contains$16$(to_set, lv)));
  const advance = moonbitlang$core$builtin$$Iter$to_array$16$(moonbitlang$core$builtin$$Iter$filter$16$(moonbitlang$core$immut$hashset$$HashSet$iter$16$(to_set), (lv) => !moonbitlang$core$immut$hashset$$HashSet$contains$16$(from_set, lv)));
  return { _0: retreat, _1: advance };
}
function dowdiness$crdt$causal_graph$$CausalGraph$diff_frontiers_lvs(self, from_frontier, to_frontier) {
  const _bind = dowdiness$crdt$causal_graph$$CausalGraph$graph_diff(self, from_frontier, to_frontier);
  const _retreat_set = _bind._0;
  const _advance_set = _bind._1;
  let retreat_lvs;
  if (_retreat_set.length > 0) {
    const reachable = moonbitlang$core$immut$hashset$$HashSet$from_array$16$({ buf: _retreat_set, start: 0, end: _retreat_set.length });
    retreat_lvs = dowdiness$crdt$causal_graph$$topological_sort(self, reachable);
  } else {
    retreat_lvs = [];
  }
  const reversed_retreat = [];
  let _tmp = retreat_lvs.length - 1 | 0;
  while (true) {
    const i = _tmp;
    if (i >= 0) {
      moonbitlang$core$array$$Array$push$16$(reversed_retreat, moonbitlang$core$array$$Array$at$16$(retreat_lvs, i));
      _tmp = i - 1 | 0;
      continue;
    } else {
      break;
    }
  }
  let advance_lvs;
  if (_advance_set.length > 0) {
    const reachable = moonbitlang$core$immut$hashset$$HashSet$from_array$16$({ buf: _advance_set, start: 0, end: _advance_set.length });
    advance_lvs = dowdiness$crdt$causal_graph$$topological_sort(self, reachable);
  } else {
    advance_lvs = [];
  }
  return { _0: reversed_retreat, _1: advance_lvs };
}
function dowdiness$crdt$causal_graph$$VersionVector$from_frontier(graph, frontier) {
  const _bind = [];
  const agent_max_seq = moonbitlang$core$builtin$$Map$from_array$57$({ buf: _bind, start: 0, end: 0 });
  const reachable = dowdiness$crdt$causal_graph$$CausalGraph$transitive_closure(graph, frontier);
  moonbitlang$core$immut$hashset$$HashSet$each$96$(reachable, (lv) => {
    const _bind$2 = dowdiness$crdt$causal_graph$$CausalGraph$get_entry(graph, lv);
    if (_bind$2 === undefined) {
      return;
    } else {
      const _Some = _bind$2;
      const _entry = _Some;
      const _bind$3 = moonbitlang$core$builtin$$Map$get$57$(agent_max_seq, _entry.agent);
      let current_max;
      if (_bind$3 === undefined) {
        current_max = -1;
      } else {
        const _Some$2 = _bind$3;
        current_max = _Some$2;
      }
      if (_entry.seq > current_max) {
        moonbitlang$core$builtin$$Map$set$57$(agent_max_seq, _entry.agent, _entry.seq);
        return;
      } else {
        return;
      }
    }
  });
  return { map: agent_max_seq };
}
function dowdiness$crdt$causal_graph$$CausalGraph$raw_to_lv(self, raw) {
  return moonbitlang$core$immut$hashmap$$HashMap$get$84$(self.version_map, raw);
}
function moonbitlang$core$builtin$$Compare$op_le$74$(self, other) {
  const is_le = { val: true };
  const _p = self.map;
  let _tmp = _p.head;
  while (true) {
    const _p$2 = _tmp;
    if (_p$2 === undefined) {
      break;
    } else {
      const _p$3 = _p$2;
      const _p$4 = _p$3;
      const _p$5 = _p$4.key;
      const _p$6 = _p$4.value;
      const _p$7 = _p$4.next;
      const _p$8 = moonbitlang$core$builtin$$Map$get$57$(other.map, _p$5);
      if (_p$8 === undefined) {
        is_le.val = false;
      } else {
        const _p$9 = _p$8;
        const _p$10 = _p$9;
        if (_p$6 > _p$10) {
          is_le.val = false;
        }
      }
      _tmp = _p$7;
      continue;
    }
  }
  return is_le.val;
}
function moonbitlang$core$builtin$$Hash$hash$78$(self) {
  return moonbitlang$core$builtin$$Hash$hash$37$(self.agent) + (Math.imul(moonbitlang$core$builtin$$Hash$hash$38$(self.seq), 31) | 0) | 0;
}
function dowdiness$crdt$causal_graph$$CausalGraph$lv_to_raw(self, lv) {
  const _bind = moonbitlang$core$immut$hashmap$$HashMap$get$82$(self.entries, lv);
  if (_bind === undefined) {
    return undefined;
  } else {
    const _Some = _bind;
    const _entry = _Some;
    return dowdiness$crdt$causal_graph$$RawVersion$new(_entry.agent, _entry.seq);
  }
}
function dowdiness$crdt$causal_graph$$CausalGraph$get_frontier(self) {
  return moonbitlang$core$array$$Array$copy$16$(self.frontier);
}
function dowdiness$crdt$fugue$$Item$new(id, content, parent, side, timestamp, agent) {
  return { id: id, content: content, parent: parent, side: side, deleted: false, timestamp: timestamp, agent: agent };
}
function dowdiness$crdt$fugue$$FugueTree$new() {
  const root_item = dowdiness$crdt$fugue$$Item$new(-1, "", -1, 0, 0, "root");
  let items = undefined;
  items = moonbitlang$core$immut$hashmap$$HashMap$add$83$(items, -1, root_item);
  return { items: items, root: -1, length: 0 };
}
function dowdiness$crdt$fugue$$FugueTree$get_item(self, id) {
  return moonbitlang$core$immut$hashmap$$HashMap$get$83$(self.items, id);
}
function dowdiness$crdt$fugue$$FugueTree$add_item(self, item) {
  self.items = moonbitlang$core$immut$hashmap$$HashMap$add$83$(self.items, item.id, item);
  self.length = self.length + 1 | 0;
}
function dowdiness$crdt$fugue$$compare_children(a, b) {
  const _item_a = a._1;
  const _item_b = b._1;
  const ts_cmp = $compare_int(_item_a.timestamp, _item_b.timestamp);
  if (ts_cmp !== 0) {
    return ts_cmp;
  }
  const agent_cmp = moonbitlang$core$builtin$$Compare$compare$19$(_item_a.agent, _item_b.agent);
  if (agent_cmp !== 0) {
    return agent_cmp;
  }
  return $compare_int(_item_a.id, _item_b.id);
}
function dowdiness$crdt$fugue$$partition_children(children) {
  const left = [];
  const right = [];
  const _p = moonbitlang$core$array$$Array$iter$14$(children);
  while (true) {
    const _p$2 = moonbitlang$core$builtin$$Iter$next$14$(_p);
    if (_p$2 === undefined) {
      break;
    } else {
      const _p$3 = _p$2;
      const _p$4 = _p$3;
      const _p$5 = _p$4._0;
      const _p$6 = _p$4._1;
      const _p$7 = _p$6.side;
      if (_p$7 === 0) {
        moonbitlang$core$array$$Array$push$14$(left, { _0: _p$5, _1: _p$6 });
      } else {
        moonbitlang$core$array$$Array$push$14$(right, { _0: _p$5, _1: _p$6 });
      }
      continue;
    }
  }
  return { _0: left, _1: right };
}
function dowdiness$crdt$fugue$$FugueTree$get_children(self, parent_id) {
  return moonbitlang$core$immut$hashmap$$HashMap$to_array$83$(moonbitlang$core$immut$hashmap$$HashMap$filter$95$(self.items, (id, item) => item.parent === parent_id && id !== parent_id));
}
function dowdiness$crdt$fugue$$FugueTree$traverse_tree(self, node_id, result) {
  const children = dowdiness$crdt$fugue$$FugueTree$get_children(self, node_id);
  const _bind = dowdiness$crdt$fugue$$partition_children(children);
  const _left_children = _bind._0;
  const _right_children = _bind._1;
  moonbitlang$core$array$$Array$sort_by$14$(_left_children, dowdiness$crdt$fugue$$compare_children);
  const _p = moonbitlang$core$array$$Array$iter$14$(_left_children);
  while (true) {
    const _p$2 = moonbitlang$core$builtin$$Iter$next$14$(_p);
    if (_p$2 === undefined) {
      break;
    } else {
      const _p$3 = _p$2;
      const _p$4 = _p$3;
      const _p$5 = _p$4._0;
      if (_p$5 !== node_id) {
        dowdiness$crdt$fugue$$FugueTree$traverse_tree(self, _p$5, result);
      }
      continue;
    }
  }
  if (node_id !== -1) {
    const _bind$2 = dowdiness$crdt$fugue$$FugueTree$get_item(self, node_id);
    if (_bind$2 === undefined) {
    } else {
      const _Some = _bind$2;
      const _item = _Some;
      if (!_item.deleted) {
        moonbitlang$core$array$$Array$push$14$(result, { _0: node_id, _1: _item });
      }
    }
  }
  moonbitlang$core$array$$Array$sort_by$14$(_right_children, dowdiness$crdt$fugue$$compare_children);
  const _p$2 = moonbitlang$core$array$$Array$iter$14$(_right_children);
  while (true) {
    const _p$3 = moonbitlang$core$builtin$$Iter$next$14$(_p$2);
    if (_p$3 === undefined) {
      return;
    } else {
      const _p$4 = _p$3;
      const _p$5 = _p$4;
      const _p$6 = _p$5._0;
      if (_p$6 !== node_id) {
        dowdiness$crdt$fugue$$FugueTree$traverse_tree(self, _p$6, result);
      }
      continue;
    }
  }
}
function dowdiness$crdt$fugue$$FugueTree$get_visible_items(self) {
  const result = [];
  dowdiness$crdt$fugue$$FugueTree$traverse_tree(self, -1, result);
  return result;
}
function dowdiness$crdt$fugue$$FugueTree$to_text(self) {
  const _p = dowdiness$crdt$fugue$$FugueTree$get_visible_items(self);
  const _p$2 = "";
  let _tmp = 0;
  let _tmp$2 = _p$2;
  while (true) {
    const _p$3 = _tmp;
    const _p$4 = _tmp$2;
    if (_p$3 < _p.length) {
      _tmp = _p$3 + 1 | 0;
      const _p$5 = moonbitlang$core$array$$Array$at$14$(_p, _p$3);
      const _p$6 = _p$5._1;
      _tmp$2 = `${_p$4}${_p$6.content}`;
      continue;
    } else {
      return _p$4;
    }
  }
}
function dowdiness$crdt$fugue$$FugueTree$is_ancestor(self, ancestor_id, descendant_id) {
  if (ancestor_id === descendant_id) {
    return true;
  }
  let _tmp = dowdiness$crdt$fugue$$FugueTree$get_item(self, descendant_id);
  while (true) {
    const _param = _tmp;
    if (_param === undefined) {
      return false;
    } else {
      const _Some = _param;
      const _item = _Some;
      if (_item.parent === ancestor_id) {
        return true;
      }
      if (_item.parent === -1) {
        return false;
      }
      _tmp = dowdiness$crdt$fugue$$FugueTree$get_item(self, _item.parent);
      continue;
    }
  }
}
function dowdiness$crdt$fugue$$FugueTree$find_parent_and_side(self, origin_left, origin_right) {
  if (origin_left === -1) {
    return dowdiness$crdt$fugue$$find_parent_and_side$46$tuple$47$3901;
  }
  if (origin_right === -1) {
    return { _0: origin_left, _1: 1 };
  }
  return dowdiness$crdt$fugue$$FugueTree$is_ancestor(self, origin_left, origin_right) ? { _0: origin_right, _1: 0 } : { _0: origin_left, _1: 1 };
}
function dowdiness$crdt$fugue$$FugueTree$insert(self, id, content, origin_left, origin_right, timestamp, agent) {
  const _bind = dowdiness$crdt$fugue$$FugueTree$find_parent_and_side(self, origin_left, origin_right);
  const _parent = _bind._0;
  const _side = _bind._1;
  const item = dowdiness$crdt$fugue$$Item$new(id, content, _parent, _side, timestamp, agent);
  dowdiness$crdt$fugue$$FugueTree$add_item(self, item);
}
function dowdiness$crdt$fugue$$Item$mark_deleted(self) {
  return { ...self, deleted: true };
}
function dowdiness$crdt$fugue$$FugueTree$delete(self, id) {
  const _bind = dowdiness$crdt$fugue$$FugueTree$get_item(self, id);
  if (_bind === undefined) {
    return;
  } else {
    const _Some = _bind;
    const _item = _Some;
    const deleted_item = dowdiness$crdt$fugue$$Item$mark_deleted(_item);
    self.items = moonbitlang$core$immut$hashmap$$HashMap$add$83$(self.items, id, deleted_item);
    return;
  }
}
function moonbitlang$core$json$$FromJson$from_json$97$(_x_240, _x_241) {
  let _bind;
  switch (_x_240.$tag) {
    case 4: {
      const _String = _x_240;
      _bind = _String._0;
      break;
    }
    case 5: {
      const _Array = _x_240;
      const _arr = _Array._0;
      const _bind$2 = moonbitlang$core$array$$Array$get$8$(_arr, 0);
      if (_bind$2 === undefined) {
        return new Result$Err$37$(new Error$moonbitlang$47$core$47$json$46$JsonDecodeError$46$JsonDecodeError({ _0: _x_241, _1: "Missing tag in array[0] when derserializing OpContent" }));
      } else {
        const _Some = _bind$2;
        const _x = _Some;
        if (_x.$tag === 4) {
          const _String$2 = _x;
          _bind = _String$2._0;
        } else {
          return new Result$Err$37$(new Error$moonbitlang$47$core$47$json$46$JsonDecodeError$46$JsonDecodeError({ _0: _x_241, _1: "Expected string tag at array[0] when derserializing OpContent" }));
        }
      }
      break;
    }
    default: {
      return new Result$Err$37$(new Error$moonbitlang$47$core$47$json$46$JsonDecodeError$46$JsonDecodeError({ _0: _x_241, _1: "Expected string or array for tag in enum when derserializing OpContent" }));
    }
  }
  switch (_bind) {
    case "Insert": {
      let _de_arg_242 = undefined;
      _L: {
        _L$2: {
          if (_x_240.$tag === 5) {
            const _Array$2 = _x_240;
            const _x = _Array$2._0;
            if (_x.length === 2) {
              _x[0];
              const _$42$arg_244 = _x[1];
              const _p = 1;
              const _bind$3 = moonbitlang$core$json$$FromJson$from_json$19$(_$42$arg_244, new $64$moonbitlang$47$core$47$json$46$JsonPath$Index(_x_241, _p));
              let _tmp;
              if (_bind$3.$tag === 1) {
                const _ok = _bind$3;
                _tmp = _ok._0;
              } else {
                return _bind$3;
              }
              _de_arg_242 = _tmp;
            } else {
              break _L$2;
            }
          } else {
            break _L$2;
          }
          break _L;
        }
        return new Result$Err$37$(new Error$moonbitlang$47$core$47$json$46$JsonDecodeError$46$JsonDecodeError({ _0: _x_241, _1: "Expected array to deserialize enum OpContent constructor Insert when derserializing OpContent" }));
      }
      const _bind$3 = _de_arg_242;
      let _de_arg_242$2;
      if (_bind$3 === undefined) {
        return new Result$Err$37$(new Error$moonbitlang$47$core$47$json$46$JsonDecodeError$46$JsonDecodeError({ _0: _x_241, _1: "Missing positional field 0 when derserializing OpContent" }));
      } else {
        const _Some = _bind$3;
        _de_arg_242$2 = _Some;
      }
      return new Result$Ok$37$(new $64$dowdiness$47$crdt$47$oplog$46$OpContent$Insert(_de_arg_242$2));
    }
    case "Delete": {
      return new Result$Ok$37$($64$dowdiness$47$crdt$47$oplog$46$OpContent$Delete);
    }
    default: {
      return new Result$Err$37$(new Error$moonbitlang$47$core$47$json$46$JsonDecodeError$46$JsonDecodeError({ _0: _x_241, _1: `Unknown enum constructor ${_bind} when deserializing OpContent` }));
    }
  }
}
function moonbitlang$core$builtin$$ToJson$to_json$97$(_x_236) {
  if (_x_236.$tag === 0) {
    const _Insert = _x_236;
    const _$42$arg_237 = _Insert._0;
    const _p = "Insert";
    const _tmp = new $64$moonbitlang$47$core$47$builtin$46$Json$String(_p);
    const _p$2 = [_tmp, new $64$moonbitlang$47$core$47$builtin$46$Json$String(_$42$arg_237)];
    return new $64$moonbitlang$47$core$47$builtin$46$Json$Array(_p$2);
  } else {
    const _p = "Delete";
    return new $64$moonbitlang$47$core$47$builtin$46$Json$String(_p);
  }
}
function moonbitlang$core$json$$FromJson$from_json$30$(_x_192, _x_193) {
  let _de_seq_200 = undefined;
  let _de_parents_199 = Option$None$29$;
  let _de_origin_right_198 = undefined;
  let _de_origin_left_197 = undefined;
  let _de_lv_196 = undefined;
  let _de_content_195 = undefined;
  let _de_agent_194 = undefined;
  if (_x_192.$tag === 6) {
    const _Object = _x_192;
    const __map = _Object._0;
    const _bind = moonbitlang$core$builtin$$Map$get$56$(__map, "lv");
    if (_bind === undefined) {
    } else {
      const _Some = _bind;
      const __v = _Some;
      const _p = "lv";
      const _bind$2 = moonbitlang$core$json$$FromJson$from_json$16$(__v, new $64$moonbitlang$47$core$47$json$46$JsonPath$Key(_x_193, _p));
      let _tmp;
      if (_bind$2.$tag === 1) {
        const _ok = _bind$2;
        _tmp = _ok._0;
      } else {
        return _bind$2;
      }
      _de_lv_196 = _tmp;
    }
    const _bind$2 = moonbitlang$core$builtin$$Map$get$56$(__map, "parents");
    if (_bind$2 === undefined) {
    } else {
      const _Some = _bind$2;
      const __v = _Some;
      const _p = "parents";
      const _bind$3 = moonbitlang$core$json$$FromJson$from_json$60$(__v, new $64$moonbitlang$47$core$47$json$46$JsonPath$Key(_x_193, _p));
      let _tmp;
      if (_bind$3.$tag === 1) {
        const _ok = _bind$3;
        _tmp = _ok._0;
      } else {
        return _bind$3;
      }
      _de_parents_199 = new Option$Some$29$(_tmp);
    }
    const _bind$3 = moonbitlang$core$builtin$$Map$get$56$(__map, "agent");
    if (_bind$3 === undefined) {
    } else {
      const _Some = _bind$3;
      const __v = _Some;
      const _p = "agent";
      const _bind$4 = moonbitlang$core$json$$FromJson$from_json$19$(__v, new $64$moonbitlang$47$core$47$json$46$JsonPath$Key(_x_193, _p));
      let _tmp;
      if (_bind$4.$tag === 1) {
        const _ok = _bind$4;
        _tmp = _ok._0;
      } else {
        return _bind$4;
      }
      _de_agent_194 = _tmp;
    }
    const _bind$4 = moonbitlang$core$builtin$$Map$get$56$(__map, "seq");
    if (_bind$4 === undefined) {
    } else {
      const _Some = _bind$4;
      const __v = _Some;
      const _p = "seq";
      const _bind$5 = moonbitlang$core$json$$FromJson$from_json$16$(__v, new $64$moonbitlang$47$core$47$json$46$JsonPath$Key(_x_193, _p));
      let _tmp;
      if (_bind$5.$tag === 1) {
        const _ok = _bind$5;
        _tmp = _ok._0;
      } else {
        return _bind$5;
      }
      _de_seq_200 = _tmp;
    }
    const _bind$5 = moonbitlang$core$builtin$$Map$get$56$(__map, "content");
    if (_bind$5 === undefined) {
    } else {
      const _Some = _bind$5;
      const __v = _Some;
      const _p = "content";
      const _bind$6 = moonbitlang$core$json$$FromJson$from_json$97$(__v, new $64$moonbitlang$47$core$47$json$46$JsonPath$Key(_x_193, _p));
      let _tmp;
      if (_bind$6.$tag === 1) {
        const _ok = _bind$6;
        _tmp = _ok._0;
      } else {
        return _bind$6;
      }
      _de_content_195 = _tmp;
    }
    const _bind$6 = moonbitlang$core$builtin$$Map$get$56$(__map, "origin_left");
    if (_bind$6 === undefined) {
    } else {
      const _Some = _bind$6;
      const __v = _Some;
      const _p = "origin_left";
      const _bind$7 = moonbitlang$core$json$$FromJson$from_json$16$(__v, new $64$moonbitlang$47$core$47$json$46$JsonPath$Key(_x_193, _p));
      let _tmp;
      if (_bind$7.$tag === 1) {
        const _ok = _bind$7;
        _tmp = _ok._0;
      } else {
        return _bind$7;
      }
      _de_origin_left_197 = _tmp;
    }
    const _bind$7 = moonbitlang$core$builtin$$Map$get$56$(__map, "origin_right");
    if (_bind$7 === undefined) {
    } else {
      const _Some = _bind$7;
      const __v = _Some;
      const _p = "origin_right";
      const _bind$8 = moonbitlang$core$json$$FromJson$from_json$16$(__v, new $64$moonbitlang$47$core$47$json$46$JsonPath$Key(_x_193, _p));
      let _tmp;
      if (_bind$8.$tag === 1) {
        const _ok = _bind$8;
        _tmp = _ok._0;
      } else {
        return _bind$8;
      }
      _de_origin_right_198 = _tmp;
    }
  } else {
    return new Result$Err$38$(new Error$moonbitlang$47$core$47$json$46$JsonDecodeError$46$JsonDecodeError({ _0: _x_193, _1: "Expected object to deserialize Op" }));
  }
  const _bind = _de_seq_200;
  let _de_seq_200$2;
  if (_bind === undefined) {
    return new Result$Err$38$(new Error$moonbitlang$47$core$47$json$46$JsonDecodeError$46$JsonDecodeError({ _0: _x_193, _1: "Missing field seq" }));
  } else {
    const _Some = _bind;
    _de_seq_200$2 = _Some;
  }
  const _bind$2 = _de_parents_199;
  let _de_parents_199$2;
  if (_bind$2.$tag === 1) {
    const _Some = _bind$2;
    _de_parents_199$2 = _Some._0;
  } else {
    return new Result$Err$38$(new Error$moonbitlang$47$core$47$json$46$JsonDecodeError$46$JsonDecodeError({ _0: _x_193, _1: "Missing field parents" }));
  }
  const _bind$3 = _de_origin_right_198;
  let _de_origin_right_198$2;
  if (_bind$3 === undefined) {
    return new Result$Err$38$(new Error$moonbitlang$47$core$47$json$46$JsonDecodeError$46$JsonDecodeError({ _0: _x_193, _1: "Missing field origin_right" }));
  } else {
    const _Some = _bind$3;
    _de_origin_right_198$2 = _Some;
  }
  const _bind$4 = _de_origin_left_197;
  let _de_origin_left_197$2;
  if (_bind$4 === undefined) {
    return new Result$Err$38$(new Error$moonbitlang$47$core$47$json$46$JsonDecodeError$46$JsonDecodeError({ _0: _x_193, _1: "Missing field origin_left" }));
  } else {
    const _Some = _bind$4;
    _de_origin_left_197$2 = _Some;
  }
  const _bind$5 = _de_lv_196;
  let _de_lv_196$2;
  if (_bind$5 === undefined) {
    return new Result$Err$38$(new Error$moonbitlang$47$core$47$json$46$JsonDecodeError$46$JsonDecodeError({ _0: _x_193, _1: "Missing field lv" }));
  } else {
    const _Some = _bind$5;
    _de_lv_196$2 = _Some;
  }
  const _bind$6 = _de_content_195;
  let _de_content_195$2;
  if (_bind$6 === undefined) {
    return new Result$Err$38$(new Error$moonbitlang$47$core$47$json$46$JsonDecodeError$46$JsonDecodeError({ _0: _x_193, _1: "Missing field content" }));
  } else {
    const _Some = _bind$6;
    _de_content_195$2 = _Some;
  }
  const _bind$7 = _de_agent_194;
  let _de_agent_194$2;
  if (_bind$7 === undefined) {
    return new Result$Err$38$(new Error$moonbitlang$47$core$47$json$46$JsonDecodeError$46$JsonDecodeError({ _0: _x_193, _1: "Missing field agent" }));
  } else {
    const _Some = _bind$7;
    _de_agent_194$2 = _Some;
  }
  return new Result$Ok$38$({ lv: _de_lv_196$2, parents: _de_parents_199$2, agent: _de_agent_194$2, seq: _de_seq_200$2, content: _de_content_195$2, origin_left: _de_origin_left_197$2, origin_right: _de_origin_right_198$2 });
}
function moonbitlang$core$builtin$$ToJson$to_json$30$(_x_189) {
  const _bind = [];
  const $36$map = moonbitlang$core$builtin$$Map$from_array$56$({ buf: _bind, start: 0, end: 0 });
  moonbitlang$core$builtin$$Map$set$56$($36$map, "lv", moonbitlang$core$builtin$$ToJson$to_json$16$(_x_189.lv));
  moonbitlang$core$builtin$$Map$set$56$($36$map, "parents", moonbitlang$core$builtin$$ToJson$to_json$60$(_x_189.parents));
  const _p = _x_189.agent;
  moonbitlang$core$builtin$$Map$set$56$($36$map, "agent", new $64$moonbitlang$47$core$47$builtin$46$Json$String(_p));
  moonbitlang$core$builtin$$Map$set$56$($36$map, "seq", moonbitlang$core$builtin$$ToJson$to_json$16$(_x_189.seq));
  moonbitlang$core$builtin$$Map$set$56$($36$map, "content", moonbitlang$core$builtin$$ToJson$to_json$97$(_x_189.content));
  moonbitlang$core$builtin$$Map$set$56$($36$map, "origin_left", moonbitlang$core$builtin$$ToJson$to_json$16$(_x_189.origin_left));
  moonbitlang$core$builtin$$Map$set$56$($36$map, "origin_right", moonbitlang$core$builtin$$ToJson$to_json$16$(_x_189.origin_right));
  return new $64$moonbitlang$47$core$47$builtin$46$Json$Object($36$map);
}
function dowdiness$crdt$oplog$$OpLog$get_op(self, lv) {
  return lv >= 0 && lv < self.operations.length ? moonbitlang$core$array$$Array$at$30$(self.operations, lv) : undefined;
}
function dowdiness$crdt$oplog$$OpLog$walk_and_collect(self, frontier) {
  const lvs = dowdiness$crdt$causal_graph$$CausalGraph$walk_from_frontier(self.graph, frontier);
  const result = [];
  const _len = lvs.length;
  let _tmp = 0;
  while (true) {
    const _i = _tmp;
    if (_i < _len) {
      const lv = lvs[_i];
      const _bind = dowdiness$crdt$oplog$$OpLog$get_op(self, lv);
      if (_bind === undefined) {
      } else {
        const _Some = _bind;
        const _op = _Some;
        moonbitlang$core$array$$Array$push$30$(result, _op);
      }
      _tmp = _i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return result;
}
function dowdiness$crdt$oplog$$OpLog$diff_and_collect(self, from_frontier, to_frontier) {
  const _bind = dowdiness$crdt$causal_graph$$CausalGraph$diff_frontiers_lvs(self.graph, from_frontier, to_frontier);
  const _retreat_lvs = _bind._0;
  const _advance_lvs = _bind._1;
  const retreat_ops = [];
  const _len = _retreat_lvs.length;
  let _tmp = 0;
  while (true) {
    const _i = _tmp;
    if (_i < _len) {
      const lv = _retreat_lvs[_i];
      const _bind$2 = dowdiness$crdt$oplog$$OpLog$get_op(self, lv);
      if (_bind$2 === undefined) {
      } else {
        const _Some = _bind$2;
        const _op = _Some;
        moonbitlang$core$array$$Array$push$30$(retreat_ops, _op);
      }
      _tmp = _i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const advance_ops = [];
  const _len$2 = _advance_lvs.length;
  let _tmp$2 = 0;
  while (true) {
    const _i = _tmp$2;
    if (_i < _len$2) {
      const lv = _advance_lvs[_i];
      const _bind$2 = dowdiness$crdt$oplog$$OpLog$get_op(self, lv);
      if (_bind$2 === undefined) {
      } else {
        const _Some = _bind$2;
        const _op = _Some;
        moonbitlang$core$array$$Array$push$30$(advance_ops, _op);
      }
      _tmp$2 = _i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return { _0: retreat_ops, _1: advance_ops };
}
function dowdiness$crdt$oplog$$Op$new_insert(lv, parents, agent, seq, text, origin_left, origin_right) {
  return { lv: lv, parents: parents, agent: agent, seq: seq, content: new $64$dowdiness$47$crdt$47$oplog$46$OpContent$Insert(text), origin_left: origin_left, origin_right: origin_right };
}
function dowdiness$crdt$oplog$$OpLog$add_op(self, op) {
  const ops = self.operations;
  moonbitlang$core$array$$Array$push$30$(ops, op);
  self.operations = ops;
}
function dowdiness$crdt$oplog$$OpLog$insert(self, text, origin_left, origin_right) {
  const parents = dowdiness$crdt$causal_graph$$CausalGraph$get_frontier(self.graph);
  const lv = dowdiness$crdt$causal_graph$$CausalGraph$add_version(self.graph, parents, self.agent_id);
  const _bind = dowdiness$crdt$causal_graph$$CausalGraph$lv_to_raw(self.graph, lv);
  let seq;
  if (_bind === undefined) {
    seq = 0;
  } else {
    const _Some = _bind;
    const _raw = _Some;
    seq = _raw.seq;
  }
  const op = dowdiness$crdt$oplog$$Op$new_insert(lv, parents, self.agent_id, seq, text, origin_left, origin_right);
  dowdiness$crdt$oplog$$OpLog$add_op(self, op);
  return op;
}
function dowdiness$crdt$oplog$$OpLog$new(agent_id) {
  return { operations: [], graph: dowdiness$crdt$causal_graph$$CausalGraph$new(), agent_id: agent_id };
}
function dowdiness$crdt$oplog$$Op$new_delete(lv, parents, agent, seq, origin_left) {
  return { lv: lv, parents: parents, agent: agent, seq: seq, content: $64$dowdiness$47$crdt$47$oplog$46$OpContent$Delete, origin_left: origin_left, origin_right: -1 };
}
function dowdiness$crdt$oplog$$OpLog$delete(self, origin_left) {
  const parents = dowdiness$crdt$causal_graph$$CausalGraph$get_frontier(self.graph);
  const lv = dowdiness$crdt$causal_graph$$CausalGraph$add_version(self.graph, parents, self.agent_id);
  const _bind = dowdiness$crdt$causal_graph$$CausalGraph$lv_to_raw(self.graph, lv);
  let seq;
  if (_bind === undefined) {
    seq = 0;
  } else {
    const _Some = _bind;
    const _raw = _Some;
    seq = _raw.seq;
  }
  const op = dowdiness$crdt$oplog$$Op$new_delete(lv, parents, self.agent_id, seq, origin_left);
  dowdiness$crdt$oplog$$OpLog$add_op(self, op);
  return op;
}
function dowdiness$crdt$oplog$$OpLog$get_frontier(self) {
  return dowdiness$crdt$causal_graph$$CausalGraph$get_frontier(self.graph);
}
function dowdiness$crdt$oplog$$OpLog$get_all_ops(self) {
  return moonbitlang$core$array$$Array$copy$30$(self.operations);
}
function dowdiness$crdt$branch$$apply_operation_to_tree(tree, op, oplog) {
  const _bind = op.content;
  if (_bind.$tag === 0) {
    const _Insert = _bind;
    const _text = _Insert._0;
    const _bind$2 = dowdiness$crdt$causal_graph$$CausalGraph$get_entry(oplog.graph, op.lv);
    let _bind$3;
    if (_bind$2 === undefined) {
      _bind$3 = dowdiness$crdt$branch$$apply_operation_to_tree$46$tuple$47$4074;
    } else {
      const _Some = _bind$2;
      const _entry = _Some;
      _bind$3 = { _0: _entry.lamport, _1: _entry.agent };
    }
    const _timestamp = _bind$3._0;
    const _agent = _bind$3._1;
    dowdiness$crdt$fugue$$FugueTree$insert(tree, op.lv, _text, op.origin_left, op.origin_right, _timestamp, _agent);
    return;
  } else {
    dowdiness$crdt$fugue$$FugueTree$delete(tree, op.origin_left);
    return;
  }
}
function dowdiness$crdt$branch$$Branch$checkout(oplog, frontier) {
  const tree = dowdiness$crdt$fugue$$FugueTree$new();
  const ops = dowdiness$crdt$oplog$$OpLog$walk_and_collect(oplog, frontier);
  const _len = ops.length;
  let _tmp = 0;
  while (true) {
    const _i = _tmp;
    if (_i < _len) {
      const op = ops[_i];
      dowdiness$crdt$branch$$apply_operation_to_tree(tree, op, oplog);
      _tmp = _i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return { frontier: moonbitlang$core$array$$Array$copy$16$(frontier), tree: tree, oplog: oplog };
}
function dowdiness$crdt$branch$$Branch$advance(self, target_frontier) {
  const _bind = dowdiness$crdt$oplog$$OpLog$diff_and_collect(self.oplog, self.frontier, target_frontier);
  const _retreat_ops = _bind._0;
  const _advance_ops = _bind._1;
  if (_retreat_ops.length > 0) {
    return dowdiness$crdt$branch$$Branch$checkout(self.oplog, target_frontier);
  } else {
    const tree = self.tree;
    const _len = _advance_ops.length;
    let _tmp = 0;
    while (true) {
      const _i = _tmp;
      if (_i < _len) {
        const op = _advance_ops[_i];
        dowdiness$crdt$branch$$apply_operation_to_tree(tree, op, self.oplog);
        _tmp = _i + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    return { frontier: moonbitlang$core$array$$Array$copy$16$(target_frontier), tree: tree, oplog: self.oplog };
  }
}
function dowdiness$crdt$branch$$Branch$from_tree_and_oplog(tree, oplog) {
  const frontier = dowdiness$crdt$oplog$$OpLog$get_frontier(oplog);
  return { frontier: frontier, tree: tree, oplog: oplog };
}
function dowdiness$crdt$branch$$Branch$get_version_vector(self) {
  return dowdiness$crdt$causal_graph$$VersionVector$from_frontier(self.oplog.graph, self.frontier);
}
function dowdiness$crdt$branch$$Branch$merge_remote_ops(self, remote_ops) {
  let lv_map = undefined;
  const _len = remote_ops.length;
  let _tmp = 0;
  while (true) {
    const _i = _tmp;
    if (_i < _len) {
      _L: {
        const remote_op = remote_ops[_i];
        const raw_version = dowdiness$crdt$causal_graph$$RawVersion$new(remote_op.agent, remote_op.seq);
        const _bind = dowdiness$crdt$causal_graph$$CausalGraph$raw_to_lv(self.oplog.graph, raw_version);
        if (_bind === undefined) {
        } else {
          const _Some = _bind;
          const _existing_lv = _Some;
          lv_map = moonbitlang$core$immut$hashmap$$HashMap$add$54$(lv_map, remote_op.lv, _existing_lv);
          break _L;
        }
        let local_origin_left;
        if (remote_op.origin_left === -1) {
          local_origin_left = -1;
        } else {
          const _bind$2 = moonbitlang$core$immut$hashmap$$HashMap$get$54$(lv_map, remote_op.origin_left);
          if (_bind$2 === undefined) {
            local_origin_left = remote_op.origin_left;
          } else {
            const _Some = _bind$2;
            local_origin_left = _Some;
          }
        }
        let local_origin_right;
        if (remote_op.origin_right === -1) {
          local_origin_right = -1;
        } else {
          const _bind$2 = moonbitlang$core$immut$hashmap$$HashMap$get$54$(lv_map, remote_op.origin_right);
          if (_bind$2 === undefined) {
            local_origin_right = remote_op.origin_right;
          } else {
            const _Some = _bind$2;
            local_origin_right = _Some;
          }
        }
        const local_lv = dowdiness$crdt$causal_graph$$CausalGraph$add_version(self.oplog.graph, remote_op.parents, remote_op.agent);
        const _bind$2 = remote_op.content;
        let local_op;
        if (_bind$2.$tag === 0) {
          const _Insert = _bind$2;
          const _text = _Insert._0;
          local_op = dowdiness$crdt$oplog$$Op$new_insert(local_lv, remote_op.parents, remote_op.agent, remote_op.seq, _text, local_origin_left, local_origin_right);
        } else {
          local_op = dowdiness$crdt$oplog$$Op$new_delete(local_lv, remote_op.parents, remote_op.agent, remote_op.seq, local_origin_left);
        }
        dowdiness$crdt$oplog$$OpLog$add_op(self.oplog, local_op);
        lv_map = moonbitlang$core$immut$hashmap$$HashMap$add$54$(lv_map, remote_op.lv, local_lv);
        break _L;
      }
      _tmp = _i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const new_frontier = dowdiness$crdt$oplog$$OpLog$get_frontier(self.oplog);
  return dowdiness$crdt$branch$$Branch$advance(self, new_frontier);
}
function dowdiness$crdt$merge$$merge_remote_ops(tree, oplog, remote_ops) {
  const branch = dowdiness$crdt$branch$$Branch$from_tree_and_oplog(tree, oplog);
  dowdiness$crdt$branch$$Branch$merge_remote_ops(branch, remote_ops);
}
function moonbitlang$core$builtin$$ToJson$to_json$98$(_x_839) {
  switch (_x_839.$tag) {
    case 0: {
      const _Int = _x_839;
      const _$42$arg_840 = _Int._0;
      const _p = "Int";
      const _p$2 = [new $64$moonbitlang$47$core$47$builtin$46$Json$String(_p), moonbitlang$core$builtin$$ToJson$to_json$16$(_$42$arg_840)];
      return new $64$moonbitlang$47$core$47$builtin$46$Json$Array(_p$2);
    }
    case 1: {
      const _Var = _x_839;
      const _$42$arg_841 = _Var._0;
      const _p$3 = "Var";
      const _tmp = new $64$moonbitlang$47$core$47$builtin$46$Json$String(_p$3);
      const _p$4 = [_tmp, new $64$moonbitlang$47$core$47$builtin$46$Json$String(_$42$arg_841)];
      return new $64$moonbitlang$47$core$47$builtin$46$Json$Array(_p$4);
    }
    case 2: {
      const _Lam = _x_839;
      const _$42$arg_842 = _Lam._0;
      const _p$5 = "Lam";
      const _tmp$2 = new $64$moonbitlang$47$core$47$builtin$46$Json$String(_p$5);
      const _p$6 = [_tmp$2, new $64$moonbitlang$47$core$47$builtin$46$Json$String(_$42$arg_842)];
      return new $64$moonbitlang$47$core$47$builtin$46$Json$Array(_p$6);
    }
    case 3: {
      const _p$7 = "App";
      return new $64$moonbitlang$47$core$47$builtin$46$Json$String(_p$7);
    }
    case 4: {
      const _Bop = _x_839;
      const _$42$arg_843 = _Bop._0;
      const _p$8 = "Bop";
      const _p$9 = [new $64$moonbitlang$47$core$47$builtin$46$Json$String(_p$8), moonbitlang$core$builtin$$ToJson$to_json$99$(_$42$arg_843)];
      return new $64$moonbitlang$47$core$47$builtin$46$Json$Array(_p$9);
    }
    case 5: {
      const _p$10 = "If";
      return new $64$moonbitlang$47$core$47$builtin$46$Json$String(_p$10);
    }
    default: {
      const _Error = _x_839;
      const _$42$arg_844 = _Error._0;
      const _p$11 = "Error";
      const _tmp$3 = new $64$moonbitlang$47$core$47$builtin$46$Json$String(_p$11);
      const _p$12 = [_tmp$3, new $64$moonbitlang$47$core$47$builtin$46$Json$String(_$42$arg_844)];
      return new $64$moonbitlang$47$core$47$builtin$46$Json$Array(_p$12);
    }
  }
}
function moonbitlang$core$builtin$$ToJson$to_json$99$(_x_817) {
  if (_x_817 === 0) {
    const _p = "Plus";
    return new $64$moonbitlang$47$core$47$builtin$46$Json$String(_p);
  } else {
    const _p = "Minus";
    return new $64$moonbitlang$47$core$47$builtin$46$Json$String(_p);
  }
}
function moonbitlang$core$builtin$$Eq$equal$100$(_x_797, _x_798) {
  switch (_x_797.$tag) {
    case 0: {
      if (_x_798.$tag === 0) {
        return true;
      } else {
        return false;
      }
    }
    case 1: {
      if (_x_798.$tag === 1) {
        return true;
      } else {
        return false;
      }
    }
    case 2: {
      if (_x_798.$tag === 2) {
        return true;
      } else {
        return false;
      }
    }
    case 3: {
      if (_x_798.$tag === 3) {
        return true;
      } else {
        return false;
      }
    }
    case 4: {
      if (_x_798.$tag === 4) {
        return true;
      } else {
        return false;
      }
    }
    case 5: {
      if (_x_798.$tag === 5) {
        return true;
      } else {
        return false;
      }
    }
    case 6: {
      if (_x_798.$tag === 6) {
        return true;
      } else {
        return false;
      }
    }
    case 7: {
      if (_x_798.$tag === 7) {
        return true;
      } else {
        return false;
      }
    }
    case 8: {
      if (_x_798.$tag === 8) {
        return true;
      } else {
        return false;
      }
    }
    case 9: {
      const _Identifier = _x_797;
      const _$42$x0_799 = _Identifier._0;
      if (_x_798.$tag === 9) {
        const _Identifier$2 = _x_798;
        const _$42$y0_800 = _Identifier$2._0;
        return _$42$x0_799 === _$42$y0_800;
      } else {
        return false;
      }
    }
    case 10: {
      const _Integer = _x_797;
      const _$42$x0_801 = _Integer._0;
      if (_x_798.$tag === 10) {
        const _Integer$2 = _x_798;
        const _$42$y0_802 = _Integer$2._0;
        return _$42$x0_801 === _$42$y0_802;
      } else {
        return false;
      }
    }
    default: {
      if (_x_798.$tag === 11) {
        return true;
      } else {
        return false;
      }
    }
  }
}
function moonbitlang$core$builtin$$ToJson$to_json$7$(_x_760) {
  const _bind = [];
  const $36$map = moonbitlang$core$builtin$$Map$from_array$56$({ buf: _bind, start: 0, end: 0 });
  moonbitlang$core$builtin$$Map$set$56$($36$map, "kind", moonbitlang$core$builtin$$ToJson$to_json$98$(_x_760.kind));
  moonbitlang$core$builtin$$Map$set$56$($36$map, "start", moonbitlang$core$builtin$$ToJson$to_json$16$(_x_760.start));
  moonbitlang$core$builtin$$Map$set$56$($36$map, "end", moonbitlang$core$builtin$$ToJson$to_json$16$(_x_760.end));
  moonbitlang$core$builtin$$Map$set$56$($36$map, "node_id", moonbitlang$core$builtin$$ToJson$to_json$16$(_x_760.node_id));
  moonbitlang$core$builtin$$Map$set$56$($36$map, "children", moonbitlang$core$builtin$$ToJson$to_json$61$(_x_760.children));
  return new $64$moonbitlang$47$core$47$builtin$46$Json$Object($36$map);
}
function moonbitlang$core$builtin$$Hash$hash$47$(self) {
  let hasher = 0;
  hasher = (Math.imul(hasher, 31) | 0) + self.source_hash | 0;
  hasher = (Math.imul(hasher, 31) | 0) + self.start | 0;
  hasher = (Math.imul(hasher, 31) | 0) + self.end | 0;
  return hasher;
}
function dowdiness$crdt$parser$$TokenCache$new() {
  return { cache: moonbitlang$core$hashmap$$HashMap$new$46$inner$76$(8), version: 0, max_entries: 1000 };
}
function dowdiness$crdt$parser$$TokenCache$invalidate_range(self, start, end) {
  self.version = self.version + 1 | 0;
  const keys_to_remove = [];
  const _p = moonbitlang$core$hashmap$$HashMap$iter$76$(self.cache);
  while (true) {
    const _p$2 = moonbitlang$core$builtin$$Iter$next$52$(_p);
    if (_p$2 === undefined) {
      break;
    } else {
      const _p$3 = _p$2;
      const _p$4 = _p$3;
      const _p$5 = _p$4._0;
      if (_p$5.start < end && _p$5.end > start) {
        moonbitlang$core$array$$Array$push$47$(keys_to_remove, _p$5);
      }
      continue;
    }
  }
  const _len = keys_to_remove.length;
  let _tmp = 0;
  while (true) {
    const _i = _tmp;
    if (_i < _len) {
      const key = keys_to_remove[_i];
      moonbitlang$core$hashmap$$HashMap$remove$76$(self.cache, key);
      _tmp = _i + 1 | 0;
      continue;
    } else {
      return;
    }
  }
}
function dowdiness$crdt$parser$$TokenInfo$new(token, start, end) {
  return { token: token, start: start, end: end };
}
function dowdiness$crdt$parser$$print_token(token) {
  switch (token.$tag) {
    case 0: {
      return "λ";
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
      const _Identifier = token;
      return _Identifier._0;
    }
    case 10: {
      const _Integer = token;
      const _n = _Integer._0;
      return moonbitlang$core$int$$Int$to_string$46$inner(_n, 10);
    }
    default: {
      return "EOF";
    }
  }
}
function dowdiness$crdt$parser$$advance(parser) {
  parser.position = parser.position + 1 | 0;
  return parser;
}
function dowdiness$crdt$parser$$expect(parser, expected) {
  const current = parser.position < parser.tokens.length ? moonbitlang$core$array$$Array$at$29$(parser.tokens, parser.position).token : $64$dowdiness$47$crdt$47$parser$46$Token$EOF;
  if (moonbitlang$core$builtin$$Eq$equal$100$(current, expected)) {
    return new Result$Ok$39$(dowdiness$crdt$parser$$advance(parser));
  } else {
    return new Result$Err$39$(new Error$dowdiness$47$crdt$47$parser$46$ParseError$46$ParseError("Expected token", expected));
  }
}
function dowdiness$crdt$parser$$make_parser(tokens) {
  return { tokens: tokens, position: 0, node_id_counter: 0 };
}
function dowdiness$crdt$parser$$next_node_id(parser) {
  const id = parser.node_id_counter;
  parser.node_id_counter = parser.node_id_counter + 1 | 0;
  return id;
}
function dowdiness$crdt$parser$$peek_info(parser) {
  return parser.position < parser.tokens.length ? moonbitlang$core$array$$Array$at$29$(parser.tokens, parser.position) : dowdiness$crdt$parser$$TokenInfo$new($64$dowdiness$47$crdt$47$parser$46$Token$EOF, 0, 0);
}
function dowdiness$crdt$parser$$is_alphabet(code) {
  return code >= 65 && code <= 90 || code >= 97 && code <= 122;
}
function dowdiness$crdt$parser$$read_identifier(input, pos, acc) {
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
      if (dowdiness$crdt$parser$$is_alphabet(code) || code >= 48 && code <= 57) {
        const _bind = moonbitlang$core$int$$Int$to_char(code);
        if (_bind === -1) {
          return { _0: pos$2, _1: acc$2 };
        } else {
          const _Some = _bind;
          const _ch = _Some;
          _tmp = pos$2 + 1 | 0;
          _tmp$2 = `${acc$2}${moonbitlang$core$builtin$$Show$to_string$45$(_ch)}`;
          continue;
        }
      } else {
        return { _0: pos$2, _1: acc$2 };
      }
    }
  }
}
function dowdiness$crdt$parser$$read_number(input, pos, acc) {
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
function dowdiness$crdt$parser$$tokenize_helper(input, pos, acc) {
  let _tmp = pos;
  _L: while (true) {
    const pos$2 = _tmp;
    if (pos$2 >= input.length) {
      moonbitlang$core$array$$Array$push$29$(acc, dowdiness$crdt$parser$$TokenInfo$new($64$dowdiness$47$crdt$47$parser$46$Token$EOF, pos$2, pos$2));
      return new Result$Ok$40$(acc);
    } else {
      $bound_check(input, pos$2);
      const c = moonbitlang$core$uint16$$UInt16$to_char(input.charCodeAt(pos$2));
      _L$2: {
        _L$3: {
          if (c === -1) {
            return new Result$Err$40$(new Error$dowdiness$47$crdt$47$parser$46$TokenizationError$46$TokenizationError(`Error to read character at position ${moonbitlang$core$int$$Int$to_string$46$inner(pos$2, 10)}`));
          } else {
            const _Some = c;
            const _x = _Some;
            switch (_x) {
              case 32: {
                break _L$3;
              }
              case 9: {
                break _L$3;
              }
              case 10: {
                break _L$3;
              }
              case 13: {
                break _L$3;
              }
              case 955: {
                break _L$2;
              }
              case 92: {
                break _L$2;
              }
              case 46: {
                moonbitlang$core$array$$Array$push$29$(acc, dowdiness$crdt$parser$$TokenInfo$new($64$dowdiness$47$crdt$47$parser$46$Token$Dot, pos$2, pos$2 + 1 | 0));
                _tmp = pos$2 + 1 | 0;
                continue _L;
              }
              case 40: {
                moonbitlang$core$array$$Array$push$29$(acc, dowdiness$crdt$parser$$TokenInfo$new($64$dowdiness$47$crdt$47$parser$46$Token$LeftParen, pos$2, pos$2 + 1 | 0));
                _tmp = pos$2 + 1 | 0;
                continue _L;
              }
              case 41: {
                moonbitlang$core$array$$Array$push$29$(acc, dowdiness$crdt$parser$$TokenInfo$new($64$dowdiness$47$crdt$47$parser$46$Token$RightParen, pos$2, pos$2 + 1 | 0));
                _tmp = pos$2 + 1 | 0;
                continue _L;
              }
              case 43: {
                moonbitlang$core$array$$Array$push$29$(acc, dowdiness$crdt$parser$$TokenInfo$new($64$dowdiness$47$crdt$47$parser$46$Token$Plus, pos$2, pos$2 + 1 | 0));
                _tmp = pos$2 + 1 | 0;
                continue _L;
              }
              case 45: {
                moonbitlang$core$array$$Array$push$29$(acc, dowdiness$crdt$parser$$TokenInfo$new($64$dowdiness$47$crdt$47$parser$46$Token$Minus, pos$2, pos$2 + 1 | 0));
                _tmp = pos$2 + 1 | 0;
                continue _L;
              }
              default: {
                if (dowdiness$crdt$parser$$is_alphabet(_x)) {
                  const _bind = dowdiness$crdt$parser$$read_identifier(input, pos$2, "");
                  const _new_pos = _bind._0;
                  const _identifier = _bind._1;
                  let token;
                  switch (_identifier) {
                    case "if": {
                      token = $64$dowdiness$47$crdt$47$parser$46$Token$If;
                      break;
                    }
                    case "then": {
                      token = $64$dowdiness$47$crdt$47$parser$46$Token$Then;
                      break;
                    }
                    case "else": {
                      token = $64$dowdiness$47$crdt$47$parser$46$Token$Else;
                      break;
                    }
                    default: {
                      token = new $64$dowdiness$47$crdt$47$parser$46$Token$Identifier(_identifier);
                    }
                  }
                  moonbitlang$core$array$$Array$push$29$(acc, dowdiness$crdt$parser$$TokenInfo$new(token, pos$2, _new_pos));
                  _tmp = _new_pos;
                  continue _L;
                } else {
                  const _p = _x;
                  if (_p >= 48 && _p <= 57) {
                    const _bind = dowdiness$crdt$parser$$read_number(input, pos$2, 0);
                    const _new_pos = _bind._0;
                    const _number = _bind._1;
                    moonbitlang$core$array$$Array$push$29$(acc, dowdiness$crdt$parser$$TokenInfo$new(new $64$dowdiness$47$crdt$47$parser$46$Token$Integer(_number), pos$2, _new_pos));
                    _tmp = _new_pos;
                    continue _L;
                  } else {
                    return new Result$Err$40$(new Error$dowdiness$47$crdt$47$parser$46$TokenizationError$46$TokenizationError(moonbitlang$core$builtin$$Show$to_string$45$(_x)));
                  }
                }
              }
            }
          }
        }
        _tmp = pos$2 + 1 | 0;
        continue;
      }
      moonbitlang$core$array$$Array$push$29$(acc, dowdiness$crdt$parser$$TokenInfo$new($64$dowdiness$47$crdt$47$parser$46$Token$Lambda, pos$2, pos$2 + 1 | 0));
      _tmp = pos$2 + 1 | 0;
      continue;
    }
  }
}
function dowdiness$crdt$parser$$tokenize(input) {
  return dowdiness$crdt$parser$$tokenize_helper(input, 0, []);
}
function dowdiness$crdt$parser$$TermNode$new(kind, start, end, node_id, children) {
  return { kind: kind, start: start, end: end, node_id: node_id, children: children };
}
function dowdiness$crdt$parser$$parse_tree$46$parse_expression$124$362(_env, parser) {
  return dowdiness$crdt$parser$$parse_tree$46$parse_binary_op$124$363(_env, parser);
}
function dowdiness$crdt$parser$$parse_tree$46$parse_binary_op$124$363(_env, parser) {
  const constr = _env._1;
  const constr$2 = _env._0;
  const _bind = dowdiness$crdt$parser$$parse_tree$46$parse_application$124$364(_env, parser);
  let _bind$2;
  if (_bind.$tag === 1) {
    const _ok = _bind;
    _bind$2 = _ok._0;
  } else {
    return _bind;
  }
  const _parser = _bind$2._0;
  const _left = _bind$2._1;
  let _tmp;
  let _tmp$2 = _parser;
  let _tmp$3 = _left;
  _L: while (true) {
    const _param_0 = _tmp$2;
    const _param_1 = _tmp$3;
    const _bind$3 = _param_0.position < _param_0.tokens.length ? moonbitlang$core$array$$Array$at$29$(_param_0.tokens, _param_0.position).token : $64$dowdiness$47$crdt$47$parser$46$Token$EOF;
    switch (_bind$3.$tag) {
      case 4: {
        const parser$2 = dowdiness$crdt$parser$$advance(_param_0);
        const _bind$4 = dowdiness$crdt$parser$$parse_tree$46$parse_application$124$364(_env, parser$2);
        let _bind$5;
        if (_bind$4.$tag === 1) {
          const _ok = _bind$4;
          _bind$5 = _ok._0;
        } else {
          return _bind$4;
        }
        const _parser$2 = _bind$5._0;
        const _right = _bind$5._1;
        const start = _param_1.start;
        const end = _right.end;
        const node_id = dowdiness$crdt$parser$$next_node_id(_parser$2);
        const node = dowdiness$crdt$parser$$TermNode$new(constr, start, end, node_id, [_param_1, _right]);
        _tmp$2 = _parser$2;
        _tmp$3 = node;
        continue _L;
      }
      case 5: {
        const parser$3 = dowdiness$crdt$parser$$advance(_param_0);
        const _bind$6 = dowdiness$crdt$parser$$parse_tree$46$parse_application$124$364(_env, parser$3);
        let _bind$7;
        if (_bind$6.$tag === 1) {
          const _ok = _bind$6;
          _bind$7 = _ok._0;
        } else {
          return _bind$6;
        }
        const _parser$3 = _bind$7._0;
        const _right$2 = _bind$7._1;
        const start$2 = _param_1.start;
        const end$2 = _right$2.end;
        const node_id$2 = dowdiness$crdt$parser$$next_node_id(_parser$3);
        const node$2 = dowdiness$crdt$parser$$TermNode$new(constr$2, start$2, end$2, node_id$2, [_param_1, _right$2]);
        _tmp$2 = _parser$3;
        _tmp$3 = node$2;
        continue _L;
      }
      default: {
        _tmp = { _0: _param_0, _1: _param_1 };
        break _L;
      }
    }
  }
  return new Result$Ok$41$(_tmp);
}
function dowdiness$crdt$parser$$parse_tree$46$parse_application$124$364(_env, parser) {
  const _bind = dowdiness$crdt$parser$$parse_tree$46$parse_atom$124$365(_env, parser);
  let _bind$2;
  if (_bind.$tag === 1) {
    const _ok = _bind;
    _bind$2 = _ok._0;
  } else {
    return _bind;
  }
  const _parser = _bind$2._0;
  const _first = _bind$2._1;
  let _tmp;
  let _tmp$2 = _parser;
  let _tmp$3 = _first;
  _L: while (true) {
    const _param_0 = _tmp$2;
    const _param_1 = _tmp$3;
    _L$2: {
      const _bind$3 = _param_0.position < _param_0.tokens.length ? moonbitlang$core$array$$Array$at$29$(_param_0.tokens, _param_0.position).token : $64$dowdiness$47$crdt$47$parser$46$Token$EOF;
      switch (_bind$3.$tag) {
        case 2: {
          break _L$2;
        }
        case 9: {
          break _L$2;
        }
        case 10: {
          break _L$2;
        }
        case 0: {
          break _L$2;
        }
        default: {
          _tmp = { _0: _param_0, _1: _param_1 };
          break _L;
        }
      }
    }
    const _bind$3 = dowdiness$crdt$parser$$parse_tree$46$parse_atom$124$365(_env, _param_0);
    let _bind$4;
    if (_bind$3.$tag === 1) {
      const _ok = _bind$3;
      _bind$4 = _ok._0;
    } else {
      return _bind$3;
    }
    const _parser$2 = _bind$4._0;
    const _next = _bind$4._1;
    const start = _param_1.start;
    const end = _next.end;
    const node_id = dowdiness$crdt$parser$$next_node_id(_parser$2);
    const node = dowdiness$crdt$parser$$TermNode$new($64$dowdiness$47$crdt$47$parser$46$TermKind$App, start, end, node_id, [_param_1, _next]);
    _tmp$2 = _parser$2;
    _tmp$3 = node;
    continue;
  }
  return new Result$Ok$41$(_tmp);
}
function dowdiness$crdt$parser$$parse_tree$46$parse_atom$124$365(_env, parser) {
  const token_info = dowdiness$crdt$parser$$peek_info(parser);
  const _bind = token_info.token;
  switch (_bind.$tag) {
    case 10: {
      const _Integer = _bind;
      const _n = _Integer._0;
      const node_id = dowdiness$crdt$parser$$next_node_id(parser);
      const node = dowdiness$crdt$parser$$TermNode$new(new $64$dowdiness$47$crdt$47$parser$46$TermKind$Int(_n), token_info.start, token_info.end, node_id, []);
      return new Result$Ok$41$({ _0: dowdiness$crdt$parser$$advance(parser), _1: node });
    }
    case 9: {
      const _Identifier = _bind;
      const _name = _Identifier._0;
      const node_id$2 = dowdiness$crdt$parser$$next_node_id(parser);
      const node$2 = dowdiness$crdt$parser$$TermNode$new(new $64$dowdiness$47$crdt$47$parser$46$TermKind$Var(_name), token_info.start, token_info.end, node_id$2, []);
      return new Result$Ok$41$({ _0: dowdiness$crdt$parser$$advance(parser), _1: node$2 });
    }
    case 0: {
      const lambda_start = token_info.start;
      const parser$2 = dowdiness$crdt$parser$$advance(parser);
      const param_info = dowdiness$crdt$parser$$peek_info(parser$2);
      const _bind$2 = param_info.token;
      if (_bind$2.$tag === 9) {
        const _Identifier$2 = _bind$2;
        const _param = _Identifier$2._0;
        const parser$3 = dowdiness$crdt$parser$$advance(parser$2);
        const _bind$3 = dowdiness$crdt$parser$$expect(parser$3, $64$dowdiness$47$crdt$47$parser$46$Token$Dot);
        let parser$4;
        if (_bind$3.$tag === 1) {
          const _ok = _bind$3;
          parser$4 = _ok._0;
        } else {
          return _bind$3;
        }
        const _bind$4 = dowdiness$crdt$parser$$parse_tree$46$parse_expression$124$362(_env, parser$4);
        let _bind$5;
        if (_bind$4.$tag === 1) {
          const _ok = _bind$4;
          _bind$5 = _ok._0;
        } else {
          return _bind$4;
        }
        const _parser = _bind$5._0;
        const _body = _bind$5._1;
        const node_id$3 = dowdiness$crdt$parser$$next_node_id(_parser);
        const node$3 = dowdiness$crdt$parser$$TermNode$new(new $64$dowdiness$47$crdt$47$parser$46$TermKind$Lam(_param), lambda_start, _body.end, node_id$3, [_body]);
        return new Result$Ok$41$({ _0: _parser, _1: node$3 });
      } else {
        return new Result$Err$42$(new Error$dowdiness$47$crdt$47$parser$46$ParseError$46$ParseError("Expected parameter after λ", _bind$2));
      }
    }
    case 6: {
      const if_start = token_info.start;
      const parser$3 = dowdiness$crdt$parser$$advance(parser);
      const _bind$3 = dowdiness$crdt$parser$$parse_tree$46$parse_expression$124$362(_env, parser$3);
      let _bind$4;
      if (_bind$3.$tag === 1) {
        const _ok = _bind$3;
        _bind$4 = _ok._0;
      } else {
        return _bind$3;
      }
      const _parser = _bind$4._0;
      const _condition = _bind$4._1;
      const _bind$5 = dowdiness$crdt$parser$$expect(_parser, $64$dowdiness$47$crdt$47$parser$46$Token$Then);
      let parser$4;
      if (_bind$5.$tag === 1) {
        const _ok = _bind$5;
        parser$4 = _ok._0;
      } else {
        return _bind$5;
      }
      const _bind$6 = dowdiness$crdt$parser$$parse_tree$46$parse_expression$124$362(_env, parser$4);
      let _bind$7;
      if (_bind$6.$tag === 1) {
        const _ok = _bind$6;
        _bind$7 = _ok._0;
      } else {
        return _bind$6;
      }
      const _parser$2 = _bind$7._0;
      const _then_expr = _bind$7._1;
      const _bind$8 = dowdiness$crdt$parser$$expect(_parser$2, $64$dowdiness$47$crdt$47$parser$46$Token$Else);
      let parser$5;
      if (_bind$8.$tag === 1) {
        const _ok = _bind$8;
        parser$5 = _ok._0;
      } else {
        return _bind$8;
      }
      const _bind$9 = dowdiness$crdt$parser$$parse_tree$46$parse_expression$124$362(_env, parser$5);
      let _bind$10;
      if (_bind$9.$tag === 1) {
        const _ok = _bind$9;
        _bind$10 = _ok._0;
      } else {
        return _bind$9;
      }
      const _parser$3 = _bind$10._0;
      const _else_expr = _bind$10._1;
      const node_id$3 = dowdiness$crdt$parser$$next_node_id(_parser$3);
      const node$3 = dowdiness$crdt$parser$$TermNode$new($64$dowdiness$47$crdt$47$parser$46$TermKind$If, if_start, _else_expr.end, node_id$3, [_condition, _then_expr, _else_expr]);
      return new Result$Ok$41$({ _0: _parser$3, _1: node$3 });
    }
    case 2: {
      const paren_start = token_info.start;
      const parser$6 = dowdiness$crdt$parser$$advance(parser);
      const _bind$11 = dowdiness$crdt$parser$$parse_tree$46$parse_expression$124$362(_env, parser$6);
      let _bind$12;
      if (_bind$11.$tag === 1) {
        const _ok = _bind$11;
        _bind$12 = _ok._0;
      } else {
        return _bind$11;
      }
      const _parser$4 = _bind$12._0;
      const _expr = _bind$12._1;
      const close_info = dowdiness$crdt$parser$$peek_info(_parser$4);
      const _bind$13 = dowdiness$crdt$parser$$expect(_parser$4, $64$dowdiness$47$crdt$47$parser$46$Token$RightParen);
      let parser$7;
      if (_bind$13.$tag === 1) {
        const _ok = _bind$13;
        parser$7 = _ok._0;
      } else {
        return _bind$13;
      }
      const node_id$4 = dowdiness$crdt$parser$$next_node_id(parser$7);
      const node$4 = dowdiness$crdt$parser$$TermNode$new(_expr.kind, paren_start, close_info.end, node_id$4, _expr.children);
      return new Result$Ok$41$({ _0: parser$7, _1: node$4 });
    }
    default: {
      return new Result$Err$42$(new Error$dowdiness$47$crdt$47$parser$46$ParseError$46$ParseError("Unexpected token", _bind));
    }
  }
}
function dowdiness$crdt$parser$$parse_tree(input) {
  const _bind = dowdiness$crdt$parser$$tokenize(input);
  let tokens;
  if (_bind.$tag === 1) {
    const _ok = _bind;
    tokens = _ok._0;
  } else {
    return _bind;
  }
  const parser = dowdiness$crdt$parser$$make_parser(tokens);
  const _env = { _0: dowdiness$crdt$parser$$parse_tree$46$constr$47$4335, _1: dowdiness$crdt$parser$$parse_tree$46$constr$47$4334 };
  const _bind$2 = dowdiness$crdt$parser$$parse_tree$46$parse_expression$124$362(_env, parser);
  let _bind$3;
  if (_bind$2.$tag === 1) {
    const _ok = _bind$2;
    _bind$3 = _ok._0;
  } else {
    return _bind$2;
  }
  const _final_parser = _bind$3._0;
  const _expr = _bind$3._1;
  const _bind$4 = _final_parser.position < _final_parser.tokens.length ? moonbitlang$core$array$$Array$at$29$(_final_parser.tokens, _final_parser.position).token : $64$dowdiness$47$crdt$47$parser$46$Token$EOF;
  if (_bind$4.$tag === 11) {
    return new Result$Ok$43$(_expr);
  } else {
    return new Result$Err$44$(new Error$dowdiness$47$crdt$47$parser$46$ParseError$46$ParseError("Unexpected tokens after expression", _bind$4));
  }
}
function dowdiness$crdt$parser$$TermNode$error(message, position, node_id) {
  return dowdiness$crdt$parser$$TermNode$new(new $64$dowdiness$47$crdt$47$parser$46$TermKind$Error(message), position, position, node_id, []);
}
function dowdiness$crdt$parser$$Edit$new(start, old_end, new_end) {
  return { start: start, old_end: old_end, new_end: new_end };
}
function dowdiness$crdt$parser$$Range$new(start, end) {
  return { start: start, end: end };
}
function dowdiness$crdt$parser$$Range$merge(self, other) {
  return dowdiness$crdt$parser$$Range$new(self.start < other.start ? self.start : other.start, self.end > other.end ? self.end : other.end);
}
function dowdiness$crdt$parser$$DamageTracker$add_range(self, range) {
  if ((range.end - range.start | 0) === 0) {
    return undefined;
  }
  let merged = range;
  const new_ranges = [];
  const _arr = self.damaged_ranges;
  const _len = _arr.length;
  let _tmp = 0;
  while (true) {
    const _i = _tmp;
    if (_i < _len) {
      const existing = _arr[_i];
      const _p = merged;
      if (existing.start < _p.end && _p.start < existing.end) {
        merged = dowdiness$crdt$parser$$Range$merge(merged, existing);
      } else {
        moonbitlang$core$array$$Array$push$15$(new_ranges, existing);
      }
      _tmp = _i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  moonbitlang$core$array$$Array$push$15$(new_ranges, merged);
  moonbitlang$core$array$$Array$sort_by_key$65$(new_ranges, (r) => r.start);
  moonbitlang$core$array$$Array$clear$15$(self.damaged_ranges);
  const _len$2 = new_ranges.length;
  let _tmp$2 = 0;
  while (true) {
    const _i = _tmp$2;
    if (_i < _len$2) {
      const r = new_ranges[_i];
      moonbitlang$core$array$$Array$push$15$(self.damaged_ranges, r);
      _tmp$2 = _i + 1 | 0;
      continue;
    } else {
      return;
    }
  }
}
function dowdiness$crdt$parser$$DamageTracker$expand_for_tree(self, tree) {
  const node_range = dowdiness$crdt$parser$$Range$new(tree.start, tree.end);
  let overlaps_damage = false;
  const _arr = self.damaged_ranges;
  const _len = _arr.length;
  let _tmp = 0;
  while (true) {
    const _i = _tmp;
    if (_i < _len) {
      const damaged = _arr[_i];
      if (damaged.start < node_range.end && node_range.start < damaged.end) {
        overlaps_damage = true;
        break;
      }
      _tmp = _i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  if (overlaps_damage) {
    dowdiness$crdt$parser$$DamageTracker$add_range(self, node_range);
    const _arr$2 = tree.children;
    const _len$2 = _arr$2.length;
    let _tmp$2 = 0;
    while (true) {
      const _i = _tmp$2;
      if (_i < _len$2) {
        const child = _arr$2[_i];
        dowdiness$crdt$parser$$DamageTracker$expand_for_tree(self, child);
        _tmp$2 = _i + 1 | 0;
        continue;
      } else {
        return;
      }
    }
  } else {
    const _arr$2 = tree.children;
    const _len$2 = _arr$2.length;
    let _tmp$2 = 0;
    while (true) {
      const _i = _tmp$2;
      if (_i < _len$2) {
        const child = _arr$2[_i];
        dowdiness$crdt$parser$$DamageTracker$expand_for_tree(self, child);
        _tmp$2 = _i + 1 | 0;
        continue;
      } else {
        return;
      }
    }
  }
}
function dowdiness$crdt$parser$$DamageTracker$new(edit) {
  const initial_range = dowdiness$crdt$parser$$Range$new(edit.start, edit.new_end);
  return { damaged_ranges: [initial_range] };
}
function dowdiness$crdt$parser$$DamageTracker$range(self) {
  if (self.damaged_ranges.length === 0) {
    return dowdiness$crdt$parser$$Range$new(0, 0);
  }
  let min_start = moonbitlang$core$array$$Array$at$15$(self.damaged_ranges, 0).start;
  let max_end = moonbitlang$core$array$$Array$at$15$(self.damaged_ranges, 0).end;
  const _arr = self.damaged_ranges;
  const _len = _arr.length;
  let _tmp = 0;
  while (true) {
    const _i = _tmp;
    if (_i < _len) {
      const range = _arr[_i];
      if (range.start < min_start) {
        min_start = range.start;
      }
      if (range.end > max_end) {
        max_end = range.end;
      }
      _tmp = _i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return dowdiness$crdt$parser$$Range$new(min_start, max_end);
}
function dowdiness$crdt$parser$$Edit$delta(self) {
  return (self.new_end - self.start | 0) - (self.old_end - self.start | 0) | 0;
}
function dowdiness$crdt$parser$$IncrementalParser$adjust_tree_positions(self, tree, edit) {
  const delta = dowdiness$crdt$parser$$Edit$delta(edit);
  if (tree.end < edit.start) {
    return tree;
  } else {
    if (tree.start > edit.old_end) {
      const _p = tree.children;
      const _p$2 = new Array(_p.length);
      const _p$3 = _p.length;
      let _tmp = 0;
      while (true) {
        const _p$4 = _tmp;
        if (_p$4 < _p$3) {
          const _p$5 = _p[_p$4];
          _p$2[_p$4] = dowdiness$crdt$parser$$IncrementalParser$adjust_tree_positions(self, _p$5, edit);
          _tmp = _p$4 + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      const adjusted_children = _p$2;
      return dowdiness$crdt$parser$$TermNode$new(tree.kind, tree.start + delta | 0, tree.end + delta | 0, tree.node_id, adjusted_children);
    } else {
      const _p = tree.children;
      const _p$2 = new Array(_p.length);
      const _p$3 = _p.length;
      let _tmp = 0;
      while (true) {
        const _p$4 = _tmp;
        if (_p$4 < _p$3) {
          const _p$5 = _p[_p$4];
          _p$2[_p$4] = dowdiness$crdt$parser$$IncrementalParser$adjust_tree_positions(self, _p$5, edit);
          _tmp = _p$4 + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      const adjusted_children = _p$2;
      return dowdiness$crdt$parser$$TermNode$new(tree.kind, tree.start, tree.end, tree.node_id, adjusted_children);
    }
  }
}
function dowdiness$crdt$parser$$RecoveringParser$new(tokens) {
  return { tokens: tokens, position: 0, errors: [] };
}
function dowdiness$crdt$parser$$RecoveringParser$record_error(self, error) {
  moonbitlang$core$array$$Array$push$19$(self.errors, error);
}
function dowdiness$crdt$parser$$parse_with_error_recovery(input) {
  let tokens;
  let _try_err;
  _L: {
    _L$2: {
      const _bind = dowdiness$crdt$parser$$tokenize(input);
      if (_bind.$tag === 1) {
        const _ok = _bind;
        tokens = _ok._0;
      } else {
        const _err = _bind;
        const _tmp = _err._0;
        _try_err = _tmp;
        break _L$2;
      }
      break _L;
    }
    const _TokenizationError = _try_err;
    const _msg = _TokenizationError._0;
    const error_tree = dowdiness$crdt$parser$$TermNode$error(`Tokenization error: ${_msg}`, 0, 0);
    return { _0: error_tree, _1: [`Tokenization error: ${_msg}`] };
  }
  const parser = dowdiness$crdt$parser$$RecoveringParser$new(tokens);
  let tree;
  let _try_err$2;
  _L$2: {
    _L$3: {
      const _bind = dowdiness$crdt$parser$$parse_tree(input);
      if (_bind.$tag === 1) {
        const _ok = _bind;
        tree = _ok._0;
      } else {
        const _err = _bind;
        const _tmp = _err._0;
        _try_err$2 = _tmp;
        break _L$3;
      }
      break _L$2;
    }
    if (_try_err$2.$tag === 9) {
      const _ParseError = _try_err$2;
      const _msg = _ParseError._0;
      const _token = _ParseError._1;
      const error_msg = `Parse error: ${_msg} at token ${dowdiness$crdt$parser$$print_token(_token)}`;
      dowdiness$crdt$parser$$RecoveringParser$record_error(parser, error_msg);
      tree = dowdiness$crdt$parser$$TermNode$error(error_msg, 0, 0);
    } else {
      const error_msg = `Unexpected error: ${moonbitlang$core$builtin$$Show$to_string$40$(_try_err$2)}`;
      dowdiness$crdt$parser$$RecoveringParser$record_error(parser, error_msg);
      tree = dowdiness$crdt$parser$$TermNode$error(error_msg, 0, 0);
    }
  }
  return { _0: tree, _1: parser.errors };
}
function dowdiness$crdt$parser$$IncrementalParser$incremental_reparse(self, source, damaged_range, adjusted_tree) {
  if ((adjusted_tree.end <= damaged_range.start || adjusted_tree.start >= damaged_range.end) && (adjusted_tree.start === 0 && adjusted_tree.end === source.length)) {
    return adjusted_tree;
  }
  const _bind = dowdiness$crdt$parser$$parse_with_error_recovery(source);
  return _bind._0;
}
function dowdiness$crdt$parser$$IncrementalParser$parse(self) {
  const _bind = dowdiness$crdt$parser$$parse_with_error_recovery(self.source);
  const _tree = _bind._0;
  self.tree = _tree;
  return _tree;
}
function dowdiness$crdt$parser$$ParseCache$invalidate_range(self, range) {
  self.version = self.version + 1 | 0;
  const keys_to_remove = [];
  const _p = moonbitlang$core$hashmap$$HashMap$iter$77$(self.cache);
  while (true) {
    const _p$2 = moonbitlang$core$builtin$$Iter$next$53$(_p);
    if (_p$2 === undefined) {
      break;
    } else {
      const _p$3 = _p$2;
      const _p$4 = _p$3;
      const _p$5 = _p$4._0;
      const _p$6 = _p$4._1;
      const _p$7 = _p$6.node;
      if (_p$7.start < range.end && _p$7.end > range.start) {
        moonbitlang$core$array$$Array$push$48$(keys_to_remove, _p$5);
      }
      continue;
    }
  }
  const _len = keys_to_remove.length;
  let _tmp = 0;
  while (true) {
    const _i = _tmp;
    if (_i < _len) {
      const key = keys_to_remove[_i];
      moonbitlang$core$hashmap$$HashMap$remove$77$(self.cache, key);
      _tmp = _i + 1 | 0;
      continue;
    } else {
      return;
    }
  }
}
function dowdiness$crdt$parser$$IncrementalParser$edit(self, edit, new_source) {
  self.source = new_source;
  const _bind = self.tree;
  let old_tree;
  if (_bind === undefined) {
    return dowdiness$crdt$parser$$IncrementalParser$parse(self);
  } else {
    const _Some = _bind;
    old_tree = _Some;
  }
  const adjusted_tree = dowdiness$crdt$parser$$IncrementalParser$adjust_tree_positions(self, old_tree, edit);
  const damage = dowdiness$crdt$parser$$DamageTracker$new(edit);
  dowdiness$crdt$parser$$DamageTracker$expand_for_tree(damage, adjusted_tree);
  const damaged_range = dowdiness$crdt$parser$$DamageTracker$range(damage);
  dowdiness$crdt$parser$$TokenCache$invalidate_range(self.token_cache, damaged_range.start, damaged_range.end);
  dowdiness$crdt$parser$$ParseCache$invalidate_range(self.parse_cache, damaged_range);
  const new_tree = dowdiness$crdt$parser$$IncrementalParser$incremental_reparse(self, new_source, damaged_range, adjusted_tree);
  self.tree = new_tree;
  return new_tree;
}
function dowdiness$crdt$parser$$ParseCache$new() {
  return { cache: moonbitlang$core$hashmap$$HashMap$new$46$inner$77$(8), version: 0, max_entries: 500 };
}
function dowdiness$crdt$parser$$IncrementalParser$new(source) {
  return { source: source, tree: undefined, token_cache: dowdiness$crdt$parser$$TokenCache$new(), parse_cache: dowdiness$crdt$parser$$ParseCache$new() };
}
function moonbitlang$core$builtin$$Hash$hash$48$(self) {
  let hasher = 0;
  hasher = (Math.imul(hasher, 31) | 0) + self.token_fingerprint | 0;
  hasher = (Math.imul(hasher, 31) | 0) + self.start_token | 0;
  hasher = (Math.imul(hasher, 31) | 0) + self.end_token | 0;
  return hasher;
}
function dowdiness$crdt$parser$$collect_errors$46$collect$124$213(node, acc) {
  const _bind = node.kind;
  switch (_bind.$tag) {
    case 6: {
      const _Error = _bind;
      const _msg = _Error._0;
      moonbitlang$core$array$$Array$push$19$(acc, _msg);
      break;
    }
    case 0: {
      break;
    }
    case 1: {
      break;
    }
    case 2: {
      break;
    }
    case 3: {
      break;
    }
    case 4: {
      break;
    }
  }
  const _arr = node.children;
  const _len = _arr.length;
  let _tmp = 0;
  while (true) {
    const _i = _tmp;
    if (_i < _len) {
      const child = _arr[_i];
      dowdiness$crdt$parser$$collect_errors$46$collect$124$213(child, acc);
      _tmp = _i + 1 | 0;
      continue;
    } else {
      return;
    }
  }
}
function dowdiness$crdt$parser$$collect_errors(tree) {
  const errors = [];
  dowdiness$crdt$parser$$collect_errors$46$collect$124$213(tree, errors);
  return errors;
}
function dowdiness$crdt$parser$$escape_label(s) {
  const buf = moonbitlang$core$builtin$$StringBuilder$new$46$inner(0);
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < s.length) {
      $bound_check(s, i);
      const _bind = moonbitlang$core$uint16$$UInt16$to_char(s.charCodeAt(i));
      if (_bind === -1) {
      } else {
        const _Some = _bind;
        const _x = _Some;
        switch (_x) {
          case 34: {
            moonbitlang$core$builtin$$Logger$write_string$0$(buf, "\\\"");
            break;
          }
          case 92: {
            moonbitlang$core$builtin$$Logger$write_string$0$(buf, "\\\\");
            break;
          }
          case 10: {
            moonbitlang$core$builtin$$Logger$write_string$0$(buf, "\\n");
            break;
          }
          default: {
            moonbitlang$core$builtin$$Logger$write_char$0$(buf, _x);
          }
        }
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return buf.val;
}
function dowdiness$crdt$parser$$write_node_definition(buf, node) {
  moonbitlang$core$builtin$$Logger$write_string$0$(buf, "  node");
  moonbitlang$core$builtin$$Logger$write_string$0$(buf, moonbitlang$core$int$$Int$to_string$46$inner(node.node_id, 10));
  moonbitlang$core$builtin$$Logger$write_string$0$(buf, " [label=\"");
  const _bind = node.kind;
  switch (_bind.$tag) {
    case 0: {
      const _Int = _bind;
      const _n = _Int._0;
      moonbitlang$core$builtin$$Logger$write_string$0$(buf, moonbitlang$core$int$$Int$to_string$46$inner(_n, 10));
      break;
    }
    case 1: {
      const _Var = _bind;
      const _name = _Var._0;
      moonbitlang$core$builtin$$Logger$write_string$0$(buf, dowdiness$crdt$parser$$escape_label(_name));
      break;
    }
    case 2: {
      const _Lam = _bind;
      const _param = _Lam._0;
      moonbitlang$core$builtin$$Logger$write_string$0$(buf, "λ");
      moonbitlang$core$builtin$$Logger$write_string$0$(buf, dowdiness$crdt$parser$$escape_label(_param));
      break;
    }
    case 3: {
      moonbitlang$core$builtin$$Logger$write_string$0$(buf, "App");
      break;
    }
    case 4: {
      const _Bop = _bind;
      const _x = _Bop._0;
      if (_x === 0) {
        moonbitlang$core$builtin$$Logger$write_string$0$(buf, "+");
      } else {
        moonbitlang$core$builtin$$Logger$write_string$0$(buf, "-");
      }
      break;
    }
    case 5: {
      moonbitlang$core$builtin$$Logger$write_string$0$(buf, "If");
      break;
    }
    default: {
      moonbitlang$core$builtin$$Logger$write_string$0$(buf, "Error");
    }
  }
  moonbitlang$core$builtin$$Logger$write_string$0$(buf, "\"]");
  const _bind$2 = node.kind;
  switch (_bind$2.$tag) {
    case 6: {
      moonbitlang$core$builtin$$Logger$write_string$0$(buf, " [color=\"#ff0000\", fillcolor=\"#ff000022\", fontcolor=\"#ff6b6b\"]");
      break;
    }
    case 2: {
      moonbitlang$core$builtin$$Logger$write_string$0$(buf, " [color=\"#c586c0\", fillcolor=\"#c586c022\", fontcolor=\"#c586c0\"]");
      break;
    }
    case 1: {
      moonbitlang$core$builtin$$Logger$write_string$0$(buf, " [color=\"#9cdcfe\", fillcolor=\"#9cdcfe22\", fontcolor=\"#9cdcfe\"]");
      break;
    }
    case 0: {
      moonbitlang$core$builtin$$Logger$write_string$0$(buf, " [color=\"#b5cea8\", fillcolor=\"#b5cea822\", fontcolor=\"#b5cea8\"]");
      break;
    }
    case 4: {
      moonbitlang$core$builtin$$Logger$write_string$0$(buf, " [color=\"#d4d4d4\", fillcolor=\"#d4d4d422\", fontcolor=\"#d4d4d4\"]");
      break;
    }
  }
  moonbitlang$core$builtin$$Logger$write_string$0$(buf, ";\n");
}
function dowdiness$crdt$parser$$write_node_and_edges(buf, node) {
  dowdiness$crdt$parser$$write_node_definition(buf, node);
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < node.children.length) {
      const child = moonbitlang$core$array$$Array$at$7$(node.children, i);
      moonbitlang$core$builtin$$Logger$write_string$0$(buf, "  node");
      moonbitlang$core$builtin$$Logger$write_string$0$(buf, moonbitlang$core$int$$Int$to_string$46$inner(node.node_id, 10));
      moonbitlang$core$builtin$$Logger$write_string$0$(buf, " -> node");
      moonbitlang$core$builtin$$Logger$write_string$0$(buf, moonbitlang$core$int$$Int$to_string$46$inner(child.node_id, 10));
      const _bind = node.kind;
      switch (_bind.$tag) {
        case 2: {
          if (i === 0) {
            moonbitlang$core$builtin$$Logger$write_string$0$(buf, " [label=\"body\"]");
          }
          break;
        }
        case 3: {
          if (i === 0) {
            moonbitlang$core$builtin$$Logger$write_string$0$(buf, " [label=\"func\"]");
          } else {
            if (i === 1) {
              moonbitlang$core$builtin$$Logger$write_string$0$(buf, " [label=\"arg\"]");
            }
          }
          break;
        }
        case 4: {
          if (i === 0) {
            moonbitlang$core$builtin$$Logger$write_string$0$(buf, " [label=\"left\"]");
          } else {
            if (i === 1) {
              moonbitlang$core$builtin$$Logger$write_string$0$(buf, " [label=\"right\"]");
            }
          }
          break;
        }
        case 5: {
          if (i === 0) {
            moonbitlang$core$builtin$$Logger$write_string$0$(buf, " [label=\"cond\"]");
          } else {
            if (i === 1) {
              moonbitlang$core$builtin$$Logger$write_string$0$(buf, " [label=\"then\"]");
            } else {
              if (i === 2) {
                moonbitlang$core$builtin$$Logger$write_string$0$(buf, " [label=\"else\"]");
              }
            }
          }
          break;
        }
      }
      moonbitlang$core$builtin$$Logger$write_string$0$(buf, ";\n");
      dowdiness$crdt$parser$$write_node_and_edges(buf, child);
      _tmp = i + 1 | 0;
      continue;
    } else {
      return;
    }
  }
}
function dowdiness$crdt$parser$$term_node_to_dot(node) {
  const buf = moonbitlang$core$builtin$$StringBuilder$new$46$inner(0);
  moonbitlang$core$builtin$$Logger$write_string$0$(buf, "digraph {\n");
  moonbitlang$core$builtin$$Logger$write_string$0$(buf, "  bgcolor=\"transparent\";\n");
  moonbitlang$core$builtin$$Logger$write_string$0$(buf, "  node [shape=box, style=\"rounded,filled\", fillcolor=\"#252526\", fontname=\"Arial\", fontcolor=\"#d4d4d4\", color=\"#3c3c3c\"];\n");
  moonbitlang$core$builtin$$Logger$write_string$0$(buf, "  edge [fontname=\"Arial\", fontcolor=\"#858585\", color=\"#3c3c3c\"];\n\n");
  dowdiness$crdt$parser$$write_node_and_edges(buf, node);
  moonbitlang$core$builtin$$Logger$write_string$0$(buf, "}\n");
  return buf.val;
}
function dowdiness$crdt$editor$$find_common_prefix(s1, s2) {
  let i = 0;
  const min_len = s1.length < s2.length ? s1.length : s2.length;
  while (true) {
    let _tmp;
    if (i < min_len) {
      const _tmp$2 = i;
      $bound_check(s1, _tmp$2);
      const _p = s1.charCodeAt(_tmp$2);
      const _tmp$3 = i;
      $bound_check(s2, _tmp$3);
      const _p$2 = s2.charCodeAt(_tmp$3);
      _tmp = _p === _p$2;
    } else {
      _tmp = false;
    }
    if (_tmp) {
      i = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return i;
}
function dowdiness$crdt$editor$$find_common_suffix_after_prefix(s1, s2, s1_start, s2_start, s1_len, s2_len) {
  let i = 0;
  const s1_remaining = s1_len - s1_start | 0;
  const s2_remaining = s2_len - s2_start | 0;
  const min_remaining = s1_remaining < s2_remaining ? s1_remaining : s2_remaining;
  while (true) {
    let _tmp;
    if (i < min_remaining) {
      const _tmp$2 = (s1_len - 1 | 0) - i | 0;
      $bound_check(s1, _tmp$2);
      const _p = s1.charCodeAt(_tmp$2);
      const _tmp$3 = (s2_len - 1 | 0) - i | 0;
      $bound_check(s2, _tmp$3);
      const _p$2 = s2.charCodeAt(_tmp$3);
      _tmp = _p === _p$2;
    } else {
      _tmp = false;
    }
    if (_tmp) {
      i = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return i;
}
function dowdiness$crdt$editor$$compute_edit(old_text, new_text) {
  const prefix_len = dowdiness$crdt$editor$$find_common_prefix(old_text, new_text);
  const old_len = old_text.length;
  const new_len = new_text.length;
  const suffix_len = dowdiness$crdt$editor$$find_common_suffix_after_prefix(old_text, new_text, prefix_len, prefix_len, old_len, new_len);
  const old_end = old_len - suffix_len | 0;
  const new_end = new_len - suffix_len | 0;
  return dowdiness$crdt$parser$$Edit$new(prefix_len, old_end, new_end);
}
function dowdiness$crdt$editor$$Document$to_text(self) {
  return dowdiness$crdt$fugue$$FugueTree$to_text(self.tree);
}
function dowdiness$crdt$editor$$Editor$get_text(self) {
  return dowdiness$crdt$editor$$Document$to_text(self.doc);
}
function dowdiness$crdt$editor$$ParsedEditor$reparse(self) {
  const old_text = self.cached_text;
  const new_text = dowdiness$crdt$editor$$Editor$get_text(self.editor);
  let ast;
  if (old_text.length === 0 && new_text.length === 0) {
    const edit = dowdiness$crdt$parser$$Edit$new(0, 0, 0);
    ast = dowdiness$crdt$parser$$IncrementalParser$edit(self.parser, edit, new_text);
  } else {
    if (old_text.length === 0) {
      const edit = dowdiness$crdt$parser$$Edit$new(0, 0, new_text.length);
      ast = dowdiness$crdt$parser$$IncrementalParser$edit(self.parser, edit, new_text);
    } else {
      const edit = dowdiness$crdt$editor$$compute_edit(old_text, new_text);
      ast = dowdiness$crdt$parser$$IncrementalParser$edit(self.parser, edit, new_text);
    }
  }
  self.ast = ast;
  self.cached_errors = dowdiness$crdt$parser$$collect_errors(ast);
  self.cached_text = new_text;
  self.parse_dirty = false;
}
function dowdiness$crdt$editor$$ParsedEditor$get_ast(self) {
  if (self.parse_dirty) {
    dowdiness$crdt$editor$$ParsedEditor$reparse(self);
  }
  const _bind = self.ast;
  if (_bind === undefined) {
    return moonbitlang$core$builtin$$abort$7$("No valid parse tree", "@dowdiness/crdt/editor:parsed_editor.mbt:88:13-88:41");
  } else {
    const _Some = _bind;
    return _Some;
  }
}
function dowdiness$crdt$editor$$Document$position_to_lv(self, position) {
  if (position === 0) {
    return -1;
  }
  const items_list = dowdiness$crdt$fugue$$FugueTree$get_visible_items(self.tree);
  if (position > items_list.length) {
    if (items_list.length > 0) {
      const _bind = moonbitlang$core$array$$Array$at$14$(items_list, items_list.length - 1 | 0);
      const _id = _bind._0;
      return _id;
    } else {
      return -1;
    }
  }
  const _bind = moonbitlang$core$array$$Array$at$14$(items_list, position - 1 | 0);
  return _bind._0;
}
function dowdiness$crdt$editor$$Document$insert(self, position, text) {
  let current_pos = position;
  let last_op = undefined;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < text.length) {
      _L: {
        let ch;
        let _try_err;
        _L$2: {
          _L$3: {
            const _bind = moonbitlang$core$string$$String$sub$46$inner(text, i, i + 1 | 0);
            let _tmp$2;
            if (_bind.$tag === 1) {
              const _ok = _bind;
              _tmp$2 = _ok._0;
            } else {
              const _err = _bind;
              const _tmp$3 = _err._0;
              _try_err = _tmp$3;
              break _L$3;
            }
            ch = moonbitlang$core$builtin$$Show$to_string$12$(_tmp$2);
            break _L$2;
          }
          break _L;
        }
        const origin_left = dowdiness$crdt$editor$$Document$position_to_lv(self, current_pos);
        const items_list = dowdiness$crdt$fugue$$FugueTree$get_visible_items(self.tree);
        let origin_right;
        if (current_pos === 0) {
          if (items_list.length > 0) {
            const _bind = moonbitlang$core$array$$Array$at$14$(items_list, 0);
            origin_right = _bind._0;
          } else {
            origin_right = -1;
          }
        } else {
          if (current_pos < items_list.length) {
            const _bind = moonbitlang$core$array$$Array$at$14$(items_list, current_pos);
            origin_right = _bind._0;
          } else {
            origin_right = -1;
          }
        }
        const op = dowdiness$crdt$oplog$$OpLog$insert(self.oplog, ch, origin_left, origin_right);
        const _bind = dowdiness$crdt$causal_graph$$CausalGraph$get_entry(self.oplog.graph, op.lv);
        let _bind$2;
        if (_bind === undefined) {
          _bind$2 = dowdiness$crdt$editor$$insert$46$tuple$47$4547;
        } else {
          const _Some = _bind;
          const _entry = _Some;
          _bind$2 = { _0: _entry.lamport, _1: _entry.agent };
        }
        const _timestamp = _bind$2._0;
        const _agent = _bind$2._1;
        dowdiness$crdt$fugue$$FugueTree$insert(self.tree, op.lv, ch, origin_left, origin_right, _timestamp, _agent);
        last_op = op;
        current_pos = current_pos + 1 | 0;
        break _L;
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const _bind = last_op;
  if (_bind === undefined) {
    return dowdiness$crdt$oplog$$OpLog$insert(self.oplog, "", -1, -1);
  } else {
    const _Some = _bind;
    return _Some;
  }
}
function dowdiness$crdt$editor$$Editor$insert(self, text) {
  dowdiness$crdt$editor$$Document$insert(self.doc, self.cursor, text);
  self.cursor = self.cursor + text.length | 0;
}
function dowdiness$crdt$editor$$ParsedEditor$insert(self, text) {
  dowdiness$crdt$editor$$Editor$insert(self.editor, text);
  self.parse_dirty = true;
}
function dowdiness$crdt$editor$$Document$new(agent_id) {
  const oplog = dowdiness$crdt$oplog$$OpLog$new(agent_id);
  const tree = dowdiness$crdt$fugue$$FugueTree$new();
  return { tree: tree, oplog: oplog, agent_id: agent_id };
}
function dowdiness$crdt$editor$$Editor$new(agent_id) {
  return { doc: dowdiness$crdt$editor$$Document$new(agent_id), cursor: 0 };
}
function dowdiness$crdt$editor$$ParsedEditor$new(agent_id) {
  const editor = dowdiness$crdt$editor$$Editor$new(agent_id);
  const parser = dowdiness$crdt$parser$$IncrementalParser$new("");
  return { editor: editor, parser: parser, ast: undefined, parse_dirty: true, cached_text: "", cached_errors: [] };
}
function dowdiness$crdt$editor$$Document$delete(self, position) {
  if (position < 0) {
    return undefined;
  }
  const items_list = dowdiness$crdt$fugue$$FugueTree$get_visible_items(self.tree);
  if (position >= items_list.length) {
    return undefined;
  }
  const _bind = moonbitlang$core$array$$Array$at$14$(items_list, position);
  const _target_lv = _bind._0;
  const op = dowdiness$crdt$oplog$$OpLog$delete(self.oplog, _target_lv);
  dowdiness$crdt$fugue$$FugueTree$delete(self.tree, _target_lv);
  return op;
}
function dowdiness$crdt$editor$$Editor$delete(self) {
  const _bind = dowdiness$crdt$editor$$Document$delete(self.doc, self.cursor);
  return !(_bind === undefined);
}
function dowdiness$crdt$editor$$ParsedEditor$delete(self) {
  const result = dowdiness$crdt$editor$$Editor$delete(self.editor);
  if (result) {
    self.parse_dirty = true;
  }
  return result;
}
function dowdiness$crdt$editor$$ParsedEditor$get_text(self) {
  return dowdiness$crdt$editor$$Editor$get_text(self.editor);
}
function dowdiness$crdt$editor$$Editor$move_cursor(self, position) {
  const text_len = dowdiness$crdt$editor$$Document$to_text(self.doc).length;
  if (position < 0) {
    self.cursor = 0;
    return;
  } else {
    if (position > text_len) {
      self.cursor = text_len;
      return;
    } else {
      self.cursor = position;
      return;
    }
  }
}
function dowdiness$crdt$editor$$ParsedEditor$move_cursor(self, position) {
  dowdiness$crdt$editor$$Editor$move_cursor(self.editor, position);
}
function dowdiness$crdt$editor$$Editor$backspace(self) {
  if (self.cursor > 0) {
    self.cursor = self.cursor - 1 | 0;
    const _bind = dowdiness$crdt$editor$$Document$delete(self.doc, self.cursor);
    if (_bind === undefined) {
      self.cursor = self.cursor + 1 | 0;
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
}
function dowdiness$crdt$editor$$ParsedEditor$backspace(self) {
  const result = dowdiness$crdt$editor$$Editor$backspace(self.editor);
  if (result) {
    self.parse_dirty = true;
  }
  return result;
}
function dowdiness$crdt$editor$$ParsedEditor$get_cursor(self) {
  const _p = self.editor;
  return _p.cursor;
}
function dowdiness$crdt$editor$$ParsedEditor$get_errors(self) {
  dowdiness$crdt$editor$$ParsedEditor$get_ast(self);
  return self.cached_errors;
}
function dowdiness$crdt$editor$$Document$merge_remote(self, remote_ops, _remote_frontier) {
  dowdiness$crdt$merge$$merge_remote_ops(self.tree, self.oplog, remote_ops);
}
function dowdiness$crdt$editor$$Editor$adjust_cursor(self) {
  const text_len = dowdiness$crdt$editor$$Document$to_text(self.doc).length;
  if (self.cursor > text_len) {
    self.cursor = text_len;
    return;
  } else {
    return;
  }
}
function dowdiness$crdt$editor$$Editor$merge_remote(self, remote_ops, remote_frontier) {
  dowdiness$crdt$editor$$Document$merge_remote(self.doc, remote_ops, remote_frontier);
  dowdiness$crdt$editor$$Editor$adjust_cursor(self);
}
function dowdiness$crdt$editor$$ParsedEditor$merge_remote(self, ops, frontier) {
  dowdiness$crdt$editor$$Editor$merge_remote(self.editor, ops, frontier);
  self.parse_dirty = true;
}
function dowdiness$crdt$editor$$Editor$get_operations(self) {
  return dowdiness$crdt$oplog$$OpLog$get_all_ops(self.doc.oplog);
}
function dowdiness$crdt$editor$$ParsedEditor$get_operations(self) {
  return dowdiness$crdt$editor$$Editor$get_operations(self.editor);
}
function dowdiness$crdt$editor$$Document$get_frontier(self) {
  return dowdiness$crdt$oplog$$OpLog$get_frontier(self.oplog);
}
function dowdiness$crdt$editor$$Editor$get_frontier(self) {
  return dowdiness$crdt$editor$$Document$get_frontier(self.doc);
}
function dowdiness$crdt$editor$$ParsedEditor$get_frontier(self) {
  return dowdiness$crdt$editor$$Editor$get_frontier(self.editor);
}
function dowdiness$crdt$$create_editor(agent_id) {
  dowdiness$crdt$$editor.val = dowdiness$crdt$editor$$ParsedEditor$new(agent_id);
  return 1;
}
function dowdiness$crdt$$insert(_handle, text) {
  const _bind = dowdiness$crdt$$editor.val;
  if (_bind === undefined) {
    return;
  } else {
    const _Some = _bind;
    const _editor = _Some;
    dowdiness$crdt$editor$$ParsedEditor$insert(_editor, text);
    return;
  }
}
function dowdiness$crdt$$delete_(_handle) {
  const _bind = dowdiness$crdt$$editor.val;
  if (_bind === undefined) {
    return false;
  } else {
    const _Some = _bind;
    const _editor = _Some;
    return dowdiness$crdt$editor$$ParsedEditor$delete(_editor);
  }
}
function dowdiness$crdt$$backspace(_handle) {
  const _bind = dowdiness$crdt$$editor.val;
  if (_bind === undefined) {
    return false;
  } else {
    const _Some = _bind;
    const _editor = _Some;
    return dowdiness$crdt$editor$$ParsedEditor$backspace(_editor);
  }
}
function dowdiness$crdt$$get_text(_handle) {
  const _bind = dowdiness$crdt$$editor.val;
  if (_bind === undefined) {
    return "";
  } else {
    const _Some = _bind;
    const _editor = _Some;
    return dowdiness$crdt$editor$$ParsedEditor$get_text(_editor);
  }
}
function dowdiness$crdt$$set_text(_handle, new_text) {
  const _bind = dowdiness$crdt$$editor.val;
  if (_bind === undefined) {
    return;
  } else {
    const _Some = _bind;
    const _ed = _Some;
    const old_text = dowdiness$crdt$editor$$ParsedEditor$get_text(_ed);
    if (old_text === new_text) {
      return undefined;
    }
    const old_len = old_text.length;
    dowdiness$crdt$editor$$ParsedEditor$move_cursor(_ed, 0);
    let _tmp = 0;
    while (true) {
      const _i = _tmp;
      if (_i < old_len) {
        dowdiness$crdt$editor$$ParsedEditor$delete(_ed);
        _tmp = _i + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    if (new_text.length > 0) {
      dowdiness$crdt$editor$$ParsedEditor$insert(_ed, new_text);
      return;
    } else {
      return;
    }
  }
}
function dowdiness$crdt$$get_cursor(_handle) {
  const _bind = dowdiness$crdt$$editor.val;
  if (_bind === undefined) {
    return 0;
  } else {
    const _Some = _bind;
    const _editor = _Some;
    return dowdiness$crdt$editor$$ParsedEditor$get_cursor(_editor);
  }
}
function dowdiness$crdt$$set_cursor(_handle, position) {
  const _bind = dowdiness$crdt$$editor.val;
  if (_bind === undefined) {
    return;
  } else {
    const _Some = _bind;
    const _editor = _Some;
    dowdiness$crdt$editor$$ParsedEditor$move_cursor(_editor, position);
    return;
  }
}
function dowdiness$crdt$$get_ast_json(_handle) {
  const _bind = dowdiness$crdt$$editor.val;
  if (_bind === undefined) {
    return "{}";
  } else {
    const _Some = _bind;
    const _ed = _Some;
    return moonbitlang$core$json$$Json$stringify$46$inner(moonbitlang$core$builtin$$ToJson$to_json$7$(dowdiness$crdt$editor$$ParsedEditor$get_ast(_ed)), false, 0, undefined);
  }
}
function dowdiness$crdt$$get_ast_dot(_handle) {
  const _bind = dowdiness$crdt$$editor.val;
  if (_bind === undefined) {
    return "digraph { }";
  } else {
    const _Some = _bind;
    const _ed = _Some;
    const ast = dowdiness$crdt$editor$$ParsedEditor$get_ast(_ed);
    return dowdiness$crdt$parser$$term_node_to_dot(ast);
  }
}
function dowdiness$crdt$$get_errors_json(_handle) {
  const _bind = dowdiness$crdt$$editor.val;
  if (_bind === undefined) {
    return "[]";
  } else {
    const _Some = _bind;
    const _ed = _Some;
    return moonbitlang$core$json$$Json$stringify$46$inner(moonbitlang$core$builtin$$ToJson$to_json$58$(dowdiness$crdt$editor$$ParsedEditor$get_errors(_ed)), false, 0, undefined);
  }
}
function dowdiness$crdt$$get_operations_json(_handle) {
  const _bind = dowdiness$crdt$$editor.val;
  if (_bind === undefined) {
    return "[]";
  } else {
    const _Some = _bind;
    const _editor = _Some;
    return moonbitlang$core$json$$Json$stringify$46$inner(moonbitlang$core$builtin$$ToJson$to_json$59$(dowdiness$crdt$editor$$ParsedEditor$get_operations(_editor)), false, 0, undefined);
  }
}
function dowdiness$crdt$$get_frontier_json(_handle) {
  const _bind = dowdiness$crdt$$editor.val;
  if (_bind === undefined) {
    return "[]";
  } else {
    const _Some = _bind;
    const _editor = _Some;
    return moonbitlang$core$json$$Json$stringify$46$inner(moonbitlang$core$builtin$$ToJson$to_json$60$(dowdiness$crdt$editor$$ParsedEditor$get_frontier(_editor)), false, 0, undefined);
  }
}
function dowdiness$crdt$$get_version_vector_json(_handle) {
  const _bind = dowdiness$crdt$$editor.val;
  if (_bind === undefined) {
    return "{}";
  } else {
    const _Some = _bind;
    const _ed = _Some;
    const oplog = _ed.editor.doc.oplog;
    const tree = _ed.editor.doc.tree;
    const branch = dowdiness$crdt$branch$$Branch$from_tree_and_oplog(tree, oplog);
    const vv = dowdiness$crdt$branch$$Branch$get_version_vector(branch);
    return moonbitlang$core$json$$Json$stringify$46$inner(moonbitlang$core$builtin$$ToJson$to_json$74$(vv), false, 0, undefined);
  }
}
function dowdiness$crdt$$parse_ops_from_json(json_str) {
  let _try_err;
  _L: {
    const _bind = moonbitlang$core$json$$parse$46$inner({ str: json_str, start: 0, end: json_str.length }, 1024);
    let json_val;
    if (_bind.$tag === 1) {
      const _ok = _bind;
      json_val = _ok._0;
    } else {
      const _err = _bind;
      const _tmp = _err._0;
      _try_err = _tmp;
      break _L;
    }
    const _bind$2 = moonbitlang$core$json$$from_json$71$(json_val, undefined);
    if (_bind$2.$tag === 1) {
      const _ok = _bind$2;
      return _ok._0;
    } else {
      const _err = _bind$2;
      const _tmp = _err._0;
      _try_err = _tmp;
      break _L;
    }
  }
  return [];
}
function dowdiness$crdt$$parse_version_vector_from_json(json_str) {
  let _try_err;
  _L: {
    const _bind = moonbitlang$core$json$$parse$46$inner({ str: json_str, start: 0, end: json_str.length }, 1024);
    let json_val;
    if (_bind.$tag === 1) {
      const _ok = _bind;
      json_val = _ok._0;
    } else {
      const _err = _bind;
      const _tmp = _err._0;
      _try_err = _tmp;
      break _L;
    }
    const _bind$2 = moonbitlang$core$json$$from_json$74$(json_val, undefined);
    if (_bind$2.$tag === 1) {
      const _ok = _bind$2;
      return _ok._0;
    } else {
      const _err = _bind$2;
      const _tmp = _err._0;
      _try_err = _tmp;
      break _L;
    }
  }
  return undefined;
}
function dowdiness$crdt$$merge_operations(_handle, ops_json, version_vector_json) {
  const _bind = dowdiness$crdt$$editor.val;
  if (_bind === undefined) {
    return;
  } else {
    const _Some = _bind;
    const _ed = _Some;
    const oplog = _ed.editor.doc.oplog;
    const tree = _ed.editor.doc.tree;
    const local_branch = dowdiness$crdt$branch$$Branch$from_tree_and_oplog(tree, oplog);
    const local_vv = dowdiness$crdt$branch$$Branch$get_version_vector(local_branch);
    const _bind$2 = dowdiness$crdt$$parse_version_vector_from_json(version_vector_json);
    if (_bind$2 === undefined) {
    } else {
      const _Some$2 = _bind$2;
      const _remote_vv = _Some$2;
      if (moonbitlang$core$builtin$$Compare$op_le$74$(_remote_vv, local_vv)) {
        return undefined;
      }
    }
    const remote_ops = dowdiness$crdt$$parse_ops_from_json(ops_json);
    dowdiness$crdt$editor$$ParsedEditor$merge_remote(_ed, remote_ops, []);
    return;
  }
}
export { dowdiness$crdt$$create_editor as create_editor, dowdiness$crdt$$insert as insert, dowdiness$crdt$$delete_ as delete_, dowdiness$crdt$$backspace as backspace, dowdiness$crdt$$get_text as get_text, dowdiness$crdt$$set_text as set_text, dowdiness$crdt$$get_cursor as get_cursor, dowdiness$crdt$$set_cursor as set_cursor, dowdiness$crdt$$get_ast_json as get_ast_json, dowdiness$crdt$$get_ast_dot as get_ast_dot, dowdiness$crdt$$get_errors_json as get_errors_json, dowdiness$crdt$$get_operations_json as get_operations_json, dowdiness$crdt$$get_frontier_json as get_frontier_json, dowdiness$crdt$$get_version_vector_json as get_version_vector_json, dowdiness$crdt$$merge_operations as merge_operations }
