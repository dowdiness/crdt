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
class $PanicError extends Error {}
function $panic() {
  throw new $PanicError();
}
function $bound_check(arr, index) {
  if (index < 0 || index >= arr.length) throw new Error("Index out of bounds");
}
function $make_array_len_and_init(a, b) {
  const arr = new Array(a);
  arr.fill(b);
  return arr;
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
Error$dowdiness$47$crdt$47$parser$46$TokenizationError$46$TokenizationError.prototype.$tag = 3;
function Error$dowdiness$47$crdt$47$parser$46$ParseError$46$ParseError(param0) {
  this._0 = param0;
}
Error$dowdiness$47$crdt$47$parser$46$ParseError$46$ParseError.prototype.$tag = 2;
const Error$moonbitlang$47$core$47$builtin$46$CreatingViewError$46$IndexOutOfBounds = { $tag: 1 };
const Error$moonbitlang$47$core$47$builtin$46$CreatingViewError$46$InvalidIndex = { $tag: 0 };
const moonbitlang$core$builtin$$int_to_string_js = (x, radix) => {
  return x.toString(radix);
};
const moonbitlang$core$builtin$$JSArray$push = (arr, val) => { arr.push(val); };
const $64$moonbitlang$47$core$47$builtin$46$ForeachResult$Continue$1$ = { $tag: 0 };
function $64$moonbitlang$47$core$47$builtin$46$ForeachResult$Break$1$(param0) {
  this._0 = param0;
}
$64$moonbitlang$47$core$47$builtin$46$ForeachResult$Break$1$.prototype.$tag = 1;
function $64$moonbitlang$47$core$47$builtin$46$ForeachResult$Return$1$(param0) {
  this._0 = param0;
}
$64$moonbitlang$47$core$47$builtin$46$ForeachResult$Return$1$.prototype.$tag = 2;
function $64$moonbitlang$47$core$47$builtin$46$ForeachResult$Error$1$(param0) {
  this._0 = param0;
}
$64$moonbitlang$47$core$47$builtin$46$ForeachResult$Error$1$.prototype.$tag = 3;
function $64$moonbitlang$47$core$47$builtin$46$ForeachResult$JumpOuter$1$(param0) {
  this._0 = param0;
}
$64$moonbitlang$47$core$47$builtin$46$ForeachResult$JumpOuter$1$.prototype.$tag = 4;
const $64$moonbitlang$47$core$47$builtin$46$ForeachResult$Continue$2$ = { $tag: 0 };
function $64$moonbitlang$47$core$47$builtin$46$ForeachResult$Break$2$(param0) {
  this._0 = param0;
}
$64$moonbitlang$47$core$47$builtin$46$ForeachResult$Break$2$.prototype.$tag = 1;
function $64$moonbitlang$47$core$47$builtin$46$ForeachResult$Return$2$(param0) {
  this._0 = param0;
}
$64$moonbitlang$47$core$47$builtin$46$ForeachResult$Return$2$.prototype.$tag = 2;
function $64$moonbitlang$47$core$47$builtin$46$ForeachResult$Error$2$(param0) {
  this._0 = param0;
}
$64$moonbitlang$47$core$47$builtin$46$ForeachResult$Error$2$.prototype.$tag = 3;
function $64$moonbitlang$47$core$47$builtin$46$ForeachResult$JumpOuter$2$(param0) {
  this._0 = param0;
}
$64$moonbitlang$47$core$47$builtin$46$ForeachResult$JumpOuter$2$.prototype.$tag = 4;
function $compare_int(a, b) {
  return (a >= b) - (a <= b);
}
const moonbitlang$core$builtin$$JSArray$copy = (arr) => arr.slice(0);
const moonbitlang$core$builtin$$JSArray$set_length = (arr, len) => { arr.length = len; };
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
const $64$moonbitlang$47$core$47$list$46$List$Empty$3$ = { $tag: 0 };
function $64$moonbitlang$47$core$47$list$46$List$More$3$(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
$64$moonbitlang$47$core$47$list$46$List$More$3$.prototype.$tag = 1;
const $64$moonbitlang$47$core$47$list$46$List$Empty$4$ = { $tag: 0 };
function $64$moonbitlang$47$core$47$list$46$List$More$4$(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
$64$moonbitlang$47$core$47$list$46$List$More$4$.prototype.$tag = 1;
const $64$moonbitlang$47$core$47$list$46$List$Empty$5$ = { $tag: 0 };
function $64$moonbitlang$47$core$47$list$46$List$More$5$(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
$64$moonbitlang$47$core$47$list$46$List$More$5$.prototype.$tag = 1;
const $64$moonbitlang$47$core$47$list$46$List$Empty$6$ = { $tag: 0 };
function $64$moonbitlang$47$core$47$list$46$List$More$6$(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
$64$moonbitlang$47$core$47$list$46$List$More$6$.prototype.$tag = 1;
function $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$7$(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
$64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$7$.prototype.$tag = 0;
function $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$7$(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
$64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$7$.prototype.$tag = 1;
function $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Branch$7$(param0) {
  this._0 = param0;
}
$64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Branch$7$.prototype.$tag = 2;
function $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$8$(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
$64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$8$.prototype.$tag = 0;
function $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$8$(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
$64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$8$.prototype.$tag = 1;
function $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Branch$8$(param0) {
  this._0 = param0;
}
$64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Branch$8$.prototype.$tag = 2;
function $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$9$(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
$64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$9$.prototype.$tag = 0;
function $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$9$(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
$64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$9$.prototype.$tag = 1;
function $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Branch$9$(param0) {
  this._0 = param0;
}
$64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Branch$9$.prototype.$tag = 2;
function $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$10$(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
$64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$10$.prototype.$tag = 0;
function $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$10$(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
$64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$10$.prototype.$tag = 1;
function $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Branch$10$(param0) {
  this._0 = param0;
}
$64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Branch$10$.prototype.$tag = 2;
function $64$dowdiness$47$crdt$47$oplog$46$OpContent$Insert(param0) {
  this._0 = param0;
}
$64$dowdiness$47$crdt$47$oplog$46$OpContent$Insert.prototype.$tag = 0;
const $64$dowdiness$47$crdt$47$oplog$46$OpContent$Delete = { $tag: 1 };
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
function Result$Err$11$(param0) {
  this._0 = param0;
}
Result$Err$11$.prototype.$tag = 0;
function Result$Ok$11$(param0) {
  this._0 = param0;
}
Result$Ok$11$.prototype.$tag = 1;
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
const $$$64$moonbitlang$47$core$47$builtin$46$StringBuilder$36$as$36$64$moonbitlang$47$core$47$builtin$46$Logger = { method_0: moonbitlang$core$builtin$$Logger$write_string$0$, method_1: moonbitlang$core$builtin$$Logger$write_substring$1$, method_2: moonbitlang$core$builtin$$Logger$write_view$0$, method_3: moonbitlang$core$builtin$$Logger$write_char$0$ };
function Error$$to_string(_e) {
  switch (_e.$tag) {
    case 0: {
      return moonbitlang$core$builtin$$Show$to_string$2$(_e);
    }
    case 1: {
      return moonbitlang$core$builtin$$Show$to_string$2$(_e);
    }
    case 2: {
      return "dowdiness/crdt/parser.ParseError.ParseError";
    }
    default: {
      return "dowdiness/crdt/parser.TokenizationError.TokenizationError";
    }
  }
}
const moonbitlang$core$builtin$$parse$46$42$bind$124$5354 = ":";
const moonbitlang$core$builtin$$parse$46$42$bind$124$5393 = ":";
const moonbitlang$core$builtin$$parse$46$42$bind$124$5387 = "-";
const moonbitlang$core$builtin$$parse$46$42$bind$124$5374 = ":";
const moonbitlang$core$builtin$$parse$46$42$bind$124$5368 = ":";
const moonbitlang$core$builtin$$output$46$42$bind$124$8198 = "/";
const moonbitlang$core$builtin$$output$46$42$bind$124$8192 = "/";
const moonbitlang$core$builtin$$boyer_moore_horspool_find$46$constr$47$98 = 0;
const moonbitlang$core$builtin$$brute_force_find$46$constr$47$112 = 0;
const dowdiness$crdt$fugue$$find_parent_and_side$46$tuple$47$1539 = { _0: -1, _1: 1 };
const dowdiness$crdt$parser$$parse_positioned$46$constr$47$1786 = new $64$dowdiness$47$crdt$47$parser$46$TermKind$Bop(0);
const dowdiness$crdt$parser$$parse_positioned$46$constr$47$1787 = new $64$dowdiness$47$crdt$47$parser$46$TermKind$Bop(1);
const dowdiness$crdt$editor$$insert$46$tuple$47$2028 = { _0: 0, _1: "unknown" };
const dowdiness$crdt$$editor = { val: undefined };
const moonbitlang$core$builtin$$seed = moonbitlang$core$builtin$$random_seed();
function moonbitlang$core$abort$$abort$3$(msg) {
  return $panic();
}
function moonbitlang$core$abort$$abort$4$(msg) {
  return $panic();
}
function moonbitlang$core$abort$$abort$5$(msg) {
  $panic();
}
function moonbitlang$core$abort$$abort$6$(msg) {
  return $panic();
}
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
function moonbitlang$core$builtin$$Show$output$11$(_x_5244, _x_5245) {
  if (_x_5244.$tag === 1) {
    _x_5245.method_table.method_0(_x_5245.self, "IndexOutOfBounds");
    return;
  } else {
    _x_5245.method_table.method_0(_x_5245.self, "InvalidIndex");
    return;
  }
}
function moonbitlang$core$builtin$$abort$3$(string, loc) {
  return moonbitlang$core$abort$$abort$3$(`${string}\n  at ${moonbitlang$core$builtin$$Show$to_string$12$(loc)}\n`);
}
function moonbitlang$core$builtin$$abort$4$(string, loc) {
  return moonbitlang$core$abort$$abort$4$(`${string}\n  at ${moonbitlang$core$builtin$$Show$to_string$12$(loc)}\n`);
}
function moonbitlang$core$builtin$$abort$5$(string, loc) {
  moonbitlang$core$abort$$abort$5$(`${string}\n  at ${moonbitlang$core$builtin$$Show$to_string$12$(loc)}\n`);
}
function moonbitlang$core$builtin$$abort$6$(string, loc) {
  return moonbitlang$core$abort$$abort$6$(`${string}\n  at ${moonbitlang$core$builtin$$Show$to_string$12$(loc)}\n`);
}
function moonbitlang$core$builtin$$abort$7$(string, loc) {
  return moonbitlang$core$abort$$abort$7$(`${string}\n  at ${moonbitlang$core$builtin$$Show$to_string$12$(loc)}\n`);
}
function moonbitlang$core$builtin$$abort$8$(string, loc) {
  return moonbitlang$core$abort$$abort$8$(`${string}\n  at ${moonbitlang$core$builtin$$Show$to_string$12$(loc)}\n`);
}
function moonbitlang$core$builtin$$abort$9$(string, loc) {
  return moonbitlang$core$abort$$abort$9$(`${string}\n  at ${moonbitlang$core$builtin$$Show$to_string$12$(loc)}\n`);
}
function moonbitlang$core$builtin$$abort$10$(string, loc) {
  return moonbitlang$core$abort$$abort$10$(`${string}\n  at ${moonbitlang$core$builtin$$Show$to_string$12$(loc)}\n`);
}
function moonbitlang$core$array$$FixedArray$unsafe_blit$13$(dst, dst_offset, src, src_offset, len) {
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
function moonbitlang$core$array$$FixedArray$unsafe_blit$14$(dst, dst_offset, src, src_offset, len) {
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
function moonbitlang$core$array$$FixedArray$unsafe_blit$15$(dst, dst_offset, src, src_offset, len) {
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
function moonbitlang$core$array$$FixedArray$unsafe_blit$16$(dst, dst_offset, src, src_offset, len) {
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
function moonbitlang$core$builtin$$op_notequal$17$(x, y) {
  return !(x === y);
}
function moonbitlang$core$array$$Array$at$18$(self, index) {
  const len = self.length;
  if (index >= 0 && index < len) {
    $bound_check(self, index);
    return self[index];
  } else {
    return $panic();
  }
}
function moonbitlang$core$array$$Array$at$19$(self, index) {
  const len = self.length;
  if (index >= 0 && index < len) {
    $bound_check(self, index);
    return self[index];
  } else {
    return $panic();
  }
}
function moonbitlang$core$array$$Array$at$20$(self, index) {
  const len = self.length;
  if (index >= 0 && index < len) {
    $bound_check(self, index);
    return self[index];
  } else {
    return $panic();
  }
}
function moonbitlang$core$array$$Array$at$3$(self, index) {
  const len = self.length;
  if (index >= 0 && index < len) {
    $bound_check(self, index);
    return self[index];
  } else {
    return $panic();
  }
}
function moonbitlang$core$array$$Array$at$9$(self, index) {
  const len = self.length;
  if (index >= 0 && index < len) {
    $bound_check(self, index);
    return self[index];
  } else {
    return $panic();
  }
}
function moonbitlang$core$array$$Array$at$10$(self, index) {
  const len = self.length;
  if (index >= 0 && index < len) {
    $bound_check(self, index);
    return self[index];
  } else {
    return $panic();
  }
}
function moonbitlang$core$array$$Array$at$21$(self, index) {
  const len = self.length;
  if (index >= 0 && index < len) {
    $bound_check(self, index);
    return self[index];
  } else {
    return $panic();
  }
}
function moonbitlang$core$builtin$$boyer_moore_horspool_find(haystack, needle) {
  const haystack_len = haystack.end - haystack.start | 0;
  const needle_len = needle.end - needle.start | 0;
  if (needle_len > 0) {
    if (haystack_len >= needle_len) {
      const skip_table = $make_array_len_and_init(256, needle_len);
      const _end4418 = needle_len - 1 | 0;
      let _tmp = 0;
      while (true) {
        const i = _tmp;
        if (i < _end4418) {
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
          const _end4424 = needle_len - 1 | 0;
          let _tmp$3 = 0;
          while (true) {
            const j = _tmp$3;
            if (j <= _end4424) {
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
    return moonbitlang$core$builtin$$boyer_moore_horspool_find$46$constr$47$98;
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
    return moonbitlang$core$builtin$$brute_force_find$46$constr$47$112;
  }
}
function moonbitlang$core$string$$StringView$find(self, str) {
  return (str.end - str.start | 0) <= 4 ? moonbitlang$core$builtin$$brute_force_find(self, str) : moonbitlang$core$builtin$$boyer_moore_horspool_find(self, str);
}
function moonbitlang$core$builtin$$boyer_moore_horspool_rev_find(haystack, needle) {
  const haystack_len = haystack.end - haystack.start | 0;
  const needle_len = needle.end - needle.start | 0;
  if (needle_len > 0) {
    if (haystack_len >= needle_len) {
      const skip_table = $make_array_len_and_init(256, needle_len);
      let _tmp = needle_len - 1 | 0;
      while (true) {
        const i = _tmp;
        if (i > 0) {
          const _tmp$2 = needle.str;
          const _tmp$3 = needle.start + i | 0;
          const _tmp$4 = _tmp$2.charCodeAt(_tmp$3) & 255;
          $bound_check(skip_table, _tmp$4);
          skip_table[_tmp$4] = i;
          _tmp = i - 1 | 0;
          continue;
        } else {
          break;
        }
      }
      let _tmp$2 = haystack_len - needle_len | 0;
      while (true) {
        const i = _tmp$2;
        if (i >= 0) {
          let _tmp$3 = 0;
          while (true) {
            const j = _tmp$3;
            if (j < needle_len) {
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
          const _tmp$4 = haystack.str;
          const _tmp$5 = haystack.start + i | 0;
          const _tmp$6 = _tmp$4.charCodeAt(_tmp$5) & 255;
          $bound_check(skip_table, _tmp$6);
          _tmp$2 = i - skip_table[_tmp$6] | 0;
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
    return haystack_len;
  }
}
function moonbitlang$core$builtin$$brute_force_rev_find(haystack, needle) {
  const haystack_len = haystack.end - haystack.start | 0;
  const needle_len = needle.end - needle.start | 0;
  if (needle_len > 0) {
    if (haystack_len >= needle_len) {
      const _p = 0;
      const _tmp = needle.str;
      const _tmp$2 = needle.start + _p | 0;
      const needle_first = _tmp.charCodeAt(_tmp$2);
      let i = haystack_len - needle_len | 0;
      while (true) {
        if (i >= 0) {
          while (true) {
            let _tmp$3;
            if (i >= 0) {
              const _p$2 = i;
              const _tmp$4 = haystack.str;
              const _tmp$5 = haystack.start + _p$2 | 0;
              _tmp$3 = _tmp$4.charCodeAt(_tmp$5) !== needle_first;
            } else {
              _tmp$3 = false;
            }
            if (_tmp$3) {
              i = i - 1 | 0;
              continue;
            } else {
              break;
            }
          }
          if (i >= 0) {
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
            i = i - 1 | 0;
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
    return haystack_len;
  }
}
function moonbitlang$core$string$$StringView$rev_find(self, str) {
  return (str.end - str.start | 0) <= 4 ? moonbitlang$core$builtin$$brute_force_rev_find(self, str) : moonbitlang$core$builtin$$boyer_moore_horspool_rev_find(self, str);
}
function moonbitlang$core$string$$StringView$view$46$inner(self, start_offset, end_offset) {
  let end_offset$2;
  if (end_offset === undefined) {
    end_offset$2 = self.end - self.start | 0;
  } else {
    const _Some = end_offset;
    end_offset$2 = _Some;
  }
  return start_offset >= 0 && (start_offset <= end_offset$2 && end_offset$2 <= (self.end - self.start | 0)) ? { str: self.str, start: self.start + start_offset | 0, end: self.start + end_offset$2 | 0 } : moonbitlang$core$builtin$$abort$4$("Invalid index for View", "@moonbitlang/core/builtin:stringview.mbt:111:5-111:36");
}
function moonbitlang$core$builtin$$parse$46$parse_loc$124$1093(view) {
  const _bind = moonbitlang$core$string$$StringView$find(view, { str: moonbitlang$core$builtin$$parse$46$42$bind$124$5354, start: 0, end: moonbitlang$core$builtin$$parse$46$42$bind$124$5354.length });
  if (_bind === undefined) {
    return undefined;
  } else {
    const _Some = _bind;
    const _i = _Some;
    return _i > 0 && (_i + 1 | 0) < (view.end - view.start | 0) ? { _0: moonbitlang$core$string$$StringView$view$46$inner(view, 0, _i), _1: moonbitlang$core$string$$StringView$view$46$inner(view, _i + 1 | 0, undefined) } : undefined;
  }
}
function moonbitlang$core$builtin$$SourceLocRepr$parse(repr) {
  _L: {
    if (moonbitlang$core$string$$String$char_length_ge$46$inner(repr, 1, 0, repr.length)) {
      const _x = repr.charCodeAt(0);
      if (_x === 64) {
        const _bind = moonbitlang$core$string$$String$offset_of_nth_char$46$inner(repr, 1, 0, repr.length);
        let _tmp;
        if (_bind === undefined) {
          _tmp = repr.length;
        } else {
          const _Some = _bind;
          _tmp = _Some;
        }
        const _x$2 = { str: repr, start: _tmp, end: repr.length };
        const _bind$2 = moonbitlang$core$string$$StringView$find(_x$2, { str: moonbitlang$core$builtin$$parse$46$42$bind$124$5393, start: 0, end: moonbitlang$core$builtin$$parse$46$42$bind$124$5393.length });
        if (_bind$2 === undefined) {
          return $panic();
        } else {
          const _Some = _bind$2;
          const _pkg_end = _Some;
          const pkg = moonbitlang$core$string$$StringView$view$46$inner(_x$2, 0, _pkg_end);
          const _bind$3 = moonbitlang$core$string$$StringView$rev_find(_x$2, { str: moonbitlang$core$builtin$$parse$46$42$bind$124$5387, start: 0, end: moonbitlang$core$builtin$$parse$46$42$bind$124$5387.length });
          if (_bind$3 === undefined) {
            return $panic();
          } else {
            const _Some$2 = _bind$3;
            const _start_loc_end = _Some$2;
            if ((_start_loc_end + 1 | 0) < (_x$2.end - _x$2.start | 0)) {
              const end_loc = moonbitlang$core$string$$StringView$view$46$inner(_x$2, _start_loc_end + 1 | 0, undefined);
              const _bind$4 = moonbitlang$core$builtin$$parse$46$parse_loc$124$1093(end_loc);
              if (_bind$4 === undefined) {
                return $panic();
              } else {
                const _Some$3 = _bind$4;
                const _x$3 = _Some$3;
                const _end_line = _x$3._0;
                const _end_column = _x$3._1;
                const rest = moonbitlang$core$string$$StringView$view$46$inner(_x$2, 0, _start_loc_end);
                _L$2: {
                  const _bind$5 = moonbitlang$core$string$$StringView$rev_find(rest, { str: moonbitlang$core$builtin$$parse$46$42$bind$124$5374, start: 0, end: moonbitlang$core$builtin$$parse$46$42$bind$124$5374.length });
                  if (_bind$5 === undefined) {
                    break _L$2;
                  } else {
                    const _Some$4 = _bind$5;
                    const _start_line_end = _Some$4;
                    const _bind$6 = moonbitlang$core$string$$StringView$rev_find(moonbitlang$core$string$$StringView$view$46$inner(rest, 0, _start_line_end), { str: moonbitlang$core$builtin$$parse$46$42$bind$124$5368, start: 0, end: moonbitlang$core$builtin$$parse$46$42$bind$124$5368.length });
                    if (_bind$6 === undefined) {
                      break _L$2;
                    } else {
                      const _Some$5 = _bind$6;
                      const _filename_end = _Some$5;
                      if ((_filename_end + 1 | 0) < (rest.end - rest.start | 0)) {
                        const start_loc = moonbitlang$core$string$$StringView$view$46$inner(rest, _filename_end + 1 | 0, undefined);
                        const _bind$7 = moonbitlang$core$builtin$$parse$46$parse_loc$124$1093(start_loc);
                        if (_bind$7 === undefined) {
                          return $panic();
                        } else {
                          const _Some$6 = _bind$7;
                          const _x$4 = _Some$6;
                          const _start_line = _x$4._0;
                          const _start_column = _x$4._1;
                          if (_filename_end > (_pkg_end + 1 | 0)) {
                            const filename = moonbitlang$core$string$$StringView$view$46$inner(rest, _pkg_end + 1 | 0, _filename_end);
                            return { pkg: pkg, filename: filename, start_line: _start_line, start_column: _start_column, end_line: _end_line, end_column: _end_column };
                          } else {
                            return $panic();
                          }
                        }
                      } else {
                        return $panic();
                      }
                    }
                  }
                }
                return $panic();
              }
            } else {
              return $panic();
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
  return $panic();
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
function moonbitlang$core$builtin$$Hasher$consume4(self, input) {
  const _p = (self.acc >>> 0) + ((Math.imul(input, -1028477379) | 0) >>> 0) | 0;
  const _p$2 = 17;
  self.acc = Math.imul(_p << _p$2 | (_p >>> (32 - _p$2 | 0) | 0), 668265263) | 0;
}
function moonbitlang$core$builtin$$Hasher$combine_uint(self, value) {
  self.acc = (self.acc >>> 0) + (4 >>> 0) | 0;
  moonbitlang$core$builtin$$Hasher$consume4(self, value);
}
function moonbitlang$core$builtin$$Hasher$combine_int(self, value) {
  moonbitlang$core$builtin$$Hasher$combine_uint(self, value);
}
function moonbitlang$core$builtin$$Hasher$combine$18$(self, value) {
  moonbitlang$core$builtin$$Hash$hash_combine$18$(value, self);
}
function moonbitlang$core$builtin$$Hasher$combine$19$(self, value) {
  moonbitlang$core$builtin$$Hash$hash_combine$19$(value, self);
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
function moonbitlang$core$builtin$$Hash$hash$22$(self) {
  const _self = moonbitlang$core$builtin$$Hasher$new(undefined);
  moonbitlang$core$builtin$$Hasher$combine$18$(_self, self);
  return moonbitlang$core$builtin$$Hasher$finalize(_self);
}
function moonbitlang$core$builtin$$Hash$hash$23$(self) {
  const _self = moonbitlang$core$builtin$$Hasher$new(undefined);
  moonbitlang$core$builtin$$Hasher$combine$19$(_self, self);
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
function moonbitlang$core$builtin$$Show$to_string$12$(self) {
  const logger = moonbitlang$core$builtin$$StringBuilder$new$46$inner(0);
  moonbitlang$core$builtin$$Show$output$24$(self, { self: logger, method_table: $$$64$moonbitlang$47$core$47$builtin$46$StringBuilder$36$as$36$64$moonbitlang$47$core$47$builtin$46$Logger });
  return logger.val;
}
function moonbitlang$core$builtin$$Show$to_string$25$(self) {
  const logger = moonbitlang$core$builtin$$StringBuilder$new$46$inner(0);
  moonbitlang$core$builtin$$Show$output$26$(self, { self: logger, method_table: $$$64$moonbitlang$47$core$47$builtin$46$StringBuilder$36$as$36$64$moonbitlang$47$core$47$builtin$46$Logger });
  return logger.val;
}
function moonbitlang$core$builtin$$Show$to_string$22$(self) {
  const logger = moonbitlang$core$builtin$$StringBuilder$new$46$inner(0);
  moonbitlang$core$builtin$$Show$output$18$(self, { self: logger, method_table: $$$64$moonbitlang$47$core$47$builtin$46$StringBuilder$36$as$36$64$moonbitlang$47$core$47$builtin$46$Logger });
  return logger.val;
}
function moonbitlang$core$builtin$$Show$to_string$2$(self) {
  const logger = moonbitlang$core$builtin$$StringBuilder$new$46$inner(0);
  moonbitlang$core$builtin$$Show$output$11$(self, { self: logger, method_table: $$$64$moonbitlang$47$core$47$builtin$46$StringBuilder$36$as$36$64$moonbitlang$47$core$47$builtin$46$Logger });
  return logger.val;
}
function moonbitlang$core$int$$Int$to_string$46$inner(self, radix) {
  return moonbitlang$core$builtin$$int_to_string_js(self, radix);
}
function moonbitlang$core$builtin$$Show$to_string$4$(self) {
  return self.str.substring(self.start, self.end);
}
function moonbitlang$core$builtin$$Iterator$next$27$(self) {
  const _func = self;
  return _func();
}
function moonbitlang$core$builtin$$Iterator$next$28$(self) {
  const _func = self;
  return _func();
}
function moonbitlang$core$builtin$$Iterator$next$9$(self) {
  const _func = self;
  return _func();
}
function moonbitlang$core$builtin$$Iterator$next$18$(self) {
  const _func = self;
  return _func();
}
function moonbitlang$core$builtin$$Iterator$iter$27$(self) {
  return (yield_) => {
    while (true) {
      const _bind = moonbitlang$core$builtin$$Iterator$next$27$(self);
      if (_bind === undefined) {
        return 1;
      } else {
        const _Some = _bind;
        const _x = _Some;
        const _bind$2 = yield_(_x);
        if (_bind$2 === 1) {
        } else {
          return 0;
        }
        continue;
      }
    }
  };
}
function moonbitlang$core$builtin$$Iterator$iter$28$(self) {
  return (yield_) => {
    while (true) {
      const _bind = moonbitlang$core$builtin$$Iterator$next$28$(self);
      if (_bind === undefined) {
        return 1;
      } else {
        const _Some = _bind;
        const _x = _Some;
        const _bind$2 = yield_(_x);
        if (_bind$2 === 1) {
        } else {
          return 0;
        }
        continue;
      }
    }
  };
}
function moonbitlang$core$builtin$$Iterator$iter$9$(self) {
  return (yield_) => {
    while (true) {
      const _bind = moonbitlang$core$builtin$$Iterator$next$9$(self);
      if (_bind === undefined) {
        return 1;
      } else {
        const _Some = _bind;
        const _x = _Some;
        const _bind$2 = yield_(_x);
        if (_bind$2 === 1) {
        } else {
          return 0;
        }
        continue;
      }
    }
  };
}
function moonbitlang$core$builtin$$Iterator$iter$18$(self) {
  return (yield_) => {
    while (true) {
      const _bind = moonbitlang$core$builtin$$Iterator$next$18$(self);
      if (_bind === undefined) {
        return 1;
      } else {
        const _Some = _bind;
        const _x = _Some;
        const _bind$2 = yield_(_x);
        if (_bind$2 === 1) {
        } else {
          return 0;
        }
        continue;
      }
    }
  };
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
          moonbitlang$core$builtin$$abort$5$("invalid surrogate pair", "@moonbitlang/core/builtin:string.mbt:491:9-491:40");
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
    return moonbitlang$core$builtin$$abort$8$("Invalid start index", "@moonbitlang/core/builtin:string.mbt:366:5-366:33");
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
  _bind.val = `${_bind.val}${moonbitlang$core$builtin$$Show$to_string$4$(str)}`;
}
function moonbitlang$core$array$$Array$new$46$inner$9$(capacity) {
  return [];
}
function moonbitlang$core$array$$Array$push$19$(self, value) {
  moonbitlang$core$builtin$$JSArray$push(self, value);
}
function moonbitlang$core$array$$Array$push$29$(self, value) {
  moonbitlang$core$builtin$$JSArray$push(self, value);
}
function moonbitlang$core$array$$Array$push$30$(self, value) {
  moonbitlang$core$builtin$$JSArray$push(self, value);
}
function moonbitlang$core$array$$Array$push$9$(self, value) {
  moonbitlang$core$builtin$$JSArray$push(self, value);
}
function moonbitlang$core$array$$Array$push$20$(self, value) {
  moonbitlang$core$builtin$$JSArray$push(self, value);
}
function moonbitlang$core$array$$Array$push$10$(self, value) {
  moonbitlang$core$builtin$$JSArray$push(self, value);
}
function moonbitlang$core$array$$Array$push$18$(self, value) {
  moonbitlang$core$builtin$$JSArray$push(self, value);
}
function moonbitlang$core$array$$Array$push$3$(self, value) {
  moonbitlang$core$builtin$$JSArray$push(self, value);
}
function moonbitlang$core$array$$Array$push$21$(self, value) {
  moonbitlang$core$builtin$$JSArray$push(self, value);
}
function moonbitlang$core$builtin$$Show$to_string$31$(self) {
  return String.fromCodePoint(self);
}
function moonbitlang$core$builtin$$Iter$each$32$(self, f) {
  const _foreach_result = { val: $64$moonbitlang$47$core$47$builtin$46$ForeachResult$Continue$2$ };
  self((a) => {
    f(a);
    return 1;
  });
  const _tmp = _foreach_result.val;
  switch (_tmp.$tag) {
    case 0: {
      return;
    }
    case 1: {
      const _break = _tmp;
      _break._0;
      return;
    }
    case 2: {
      const _return = _tmp;
      return _return._0;
    }
    case 3: {
      $panic();
      return;
    }
    default: {
      $panic();
      return;
    }
  }
}
function moonbitlang$core$builtin$$Iter$each$33$(self, f) {
  const _foreach_result = { val: $64$moonbitlang$47$core$47$builtin$46$ForeachResult$Continue$2$ };
  self((a) => {
    f(a);
    return 1;
  });
  const _tmp = _foreach_result.val;
  switch (_tmp.$tag) {
    case 0: {
      return;
    }
    case 1: {
      const _break = _tmp;
      _break._0;
      return;
    }
    case 2: {
      const _return = _tmp;
      return _return._0;
    }
    case 3: {
      $panic();
      return;
    }
    default: {
      $panic();
      return;
    }
  }
}
function moonbitlang$core$builtin$$Iter$each$34$(self, f) {
  const _foreach_result = { val: $64$moonbitlang$47$core$47$builtin$46$ForeachResult$Continue$2$ };
  self((a) => {
    f(a);
    return 1;
  });
  const _tmp = _foreach_result.val;
  switch (_tmp.$tag) {
    case 0: {
      return;
    }
    case 1: {
      const _break = _tmp;
      _break._0;
      return;
    }
    case 2: {
      const _return = _tmp;
      return _return._0;
    }
    case 3: {
      $panic();
      return;
    }
    default: {
      $panic();
      return;
    }
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
function moonbitlang$core$builtin$$Show$output$18$(self, logger) {
  logger.method_table.method_0(logger.self, moonbitlang$core$int$$Int$to_string$46$inner(self, 10));
}
function moonbitlang$core$array$$ArrayView$iterator$9$(self) {
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
function moonbitlang$core$array$$ArrayView$iterator$18$(self) {
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
function moonbitlang$core$array$$Array$iterator$9$(self) {
  return moonbitlang$core$array$$ArrayView$iterator$9$({ buf: self, start: 0, end: self.length });
}
function moonbitlang$core$array$$Array$iterator$18$(self) {
  return moonbitlang$core$array$$ArrayView$iterator$18$({ buf: self, start: 0, end: self.length });
}
function moonbitlang$core$array$$Array$iter$9$(self) {
  return moonbitlang$core$builtin$$Iterator$iter$9$(moonbitlang$core$array$$Array$iterator$9$(self));
}
function moonbitlang$core$array$$Array$iter$18$(self) {
  return moonbitlang$core$builtin$$Iterator$iter$18$(moonbitlang$core$array$$Array$iterator$18$(self));
}
function moonbitlang$core$array$$MutArrayView$at$9$(self, index) {
  if (index >= 0 && index < (self.end - self.start | 0)) {
    const _tmp = self.buf;
    const _tmp$2 = self.start + index | 0;
    $bound_check(_tmp, _tmp$2);
    return _tmp[_tmp$2];
  } else {
    return moonbitlang$core$builtin$$abort$9$(`index out of bounds: the len is from 0 to ${moonbitlang$core$builtin$$Show$to_string$22$(self.end - self.start | 0)} but the index is ${moonbitlang$core$builtin$$Show$to_string$22$(index)}`, "@moonbitlang/core/builtin:mutarrayview.mbt:91:5-93:6");
  }
}
function moonbitlang$core$array$$MutArrayView$at$10$(self, index) {
  if (index >= 0 && index < (self.end - self.start | 0)) {
    const _tmp = self.buf;
    const _tmp$2 = self.start + index | 0;
    $bound_check(_tmp, _tmp$2);
    return _tmp[_tmp$2];
  } else {
    return moonbitlang$core$builtin$$abort$10$(`index out of bounds: the len is from 0 to ${moonbitlang$core$builtin$$Show$to_string$22$(self.end - self.start | 0)} but the index is ${moonbitlang$core$builtin$$Show$to_string$22$(index)}`, "@moonbitlang/core/builtin:mutarrayview.mbt:91:5-93:6");
  }
}
function moonbitlang$core$array$$MutArrayView$set$9$(self, index, value) {
  if (index >= 0 && index < (self.end - self.start | 0)) {
    const _tmp = self.buf;
    const _tmp$2 = self.start + index | 0;
    $bound_check(_tmp, _tmp$2);
    _tmp[_tmp$2] = value;
    return;
  } else {
    moonbitlang$core$builtin$$abort$5$(`index out of bounds: the len is from 0 to ${moonbitlang$core$builtin$$Show$to_string$22$(self.end - self.start | 0)} but the index is ${moonbitlang$core$builtin$$Show$to_string$22$(index)}`, "@moonbitlang/core/builtin:mutarrayview.mbt:151:5-153:6");
    return;
  }
}
function moonbitlang$core$array$$MutArrayView$set$10$(self, index, value) {
  if (index >= 0 && index < (self.end - self.start | 0)) {
    const _tmp = self.buf;
    const _tmp$2 = self.start + index | 0;
    $bound_check(_tmp, _tmp$2);
    _tmp[_tmp$2] = value;
    return;
  } else {
    moonbitlang$core$builtin$$abort$5$(`index out of bounds: the len is from 0 to ${moonbitlang$core$builtin$$Show$to_string$22$(self.end - self.start | 0)} but the index is ${moonbitlang$core$builtin$$Show$to_string$22$(index)}`, "@moonbitlang/core/builtin:mutarrayview.mbt:151:5-153:6");
    return;
  }
}
function moonbitlang$core$array$$Array$mut_view$46$inner$9$(self, start, end) {
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
  return start$2 >= 0 && (start$2 <= end$2 && end$2 <= len) ? { buf: self, start: start$2, end: end$2 } : moonbitlang$core$builtin$$abort$6$("View index out of bounds", "@moonbitlang/core/builtin:mutarrayview.mbt:223:5-223:38");
}
function moonbitlang$core$array$$Array$mut_view$46$inner$10$(self, start, end) {
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
  return start$2 >= 0 && (start$2 <= end$2 && end$2 <= len) ? { buf: self, start: start$2, end: end$2 } : moonbitlang$core$builtin$$abort$7$("View index out of bounds", "@moonbitlang/core/builtin:mutarrayview.mbt:223:5-223:38");
}
function moonbitlang$core$array$$MutArrayView$mut_view$46$inner$9$(self, start, end) {
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
  return start$2 >= 0 && (start$2 <= end$2 && end$2 <= len) ? { buf: self.buf, start: self.start + start$2 | 0, end: (self.start + start$2 | 0) + (end$2 - start$2 | 0) | 0 } : moonbitlang$core$builtin$$abort$6$("View index out of bounds", "@moonbitlang/core/builtin:mutarrayview.mbt:270:5-270:38");
}
function moonbitlang$core$array$$MutArrayView$mut_view$46$inner$10$(self, start, end) {
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
  return start$2 >= 0 && (start$2 <= end$2 && end$2 <= len) ? { buf: self.buf, start: self.start + start$2 | 0, end: (self.start + start$2 | 0) + (end$2 - start$2 | 0) | 0 } : moonbitlang$core$builtin$$abort$7$("View index out of bounds", "@moonbitlang/core/builtin:mutarrayview.mbt:270:5-270:38");
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
function moonbitlang$core$builtin$$Hasher$combine_string(self, value) {
  const _end2438 = value.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _end2438) {
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
function moonbitlang$core$builtin$$Hash$hash_combine$18$(self, hasher) {
  moonbitlang$core$builtin$$Hasher$combine_int(hasher, self);
}
function moonbitlang$core$array$$FixedArray$blit_to$46$inner$13$(self, dst, len, src_offset, dst_offset) {
  if (dst_offset >= 0 && (src_offset >= 0 && ((dst_offset + len | 0) <= dst.length && (src_offset + len | 0) <= self.length))) {
    moonbitlang$core$array$$FixedArray$unsafe_blit$13$(dst, dst_offset, self, src_offset, len);
    return;
  } else {
    moonbitlang$core$builtin$$abort$5$(`bounds check failed: dst_offset = ${moonbitlang$core$builtin$$Show$to_string$22$(dst_offset)}, src_offset = ${moonbitlang$core$builtin$$Show$to_string$22$(src_offset)}, len = ${moonbitlang$core$builtin$$Show$to_string$22$(len)}, dst.length = ${moonbitlang$core$builtin$$Show$to_string$22$(dst.length)}, self.length = ${moonbitlang$core$builtin$$Show$to_string$22$(self.length)}`, "@moonbitlang/core/builtin:fixedarray_block.mbt:111:5-113:6");
    return;
  }
}
function moonbitlang$core$array$$FixedArray$blit_to$46$inner$14$(self, dst, len, src_offset, dst_offset) {
  if (dst_offset >= 0 && (src_offset >= 0 && ((dst_offset + len | 0) <= dst.length && (src_offset + len | 0) <= self.length))) {
    moonbitlang$core$array$$FixedArray$unsafe_blit$14$(dst, dst_offset, self, src_offset, len);
    return;
  } else {
    moonbitlang$core$builtin$$abort$5$(`bounds check failed: dst_offset = ${moonbitlang$core$builtin$$Show$to_string$22$(dst_offset)}, src_offset = ${moonbitlang$core$builtin$$Show$to_string$22$(src_offset)}, len = ${moonbitlang$core$builtin$$Show$to_string$22$(len)}, dst.length = ${moonbitlang$core$builtin$$Show$to_string$22$(dst.length)}, self.length = ${moonbitlang$core$builtin$$Show$to_string$22$(self.length)}`, "@moonbitlang/core/builtin:fixedarray_block.mbt:111:5-113:6");
    return;
  }
}
function moonbitlang$core$array$$FixedArray$blit_to$46$inner$15$(self, dst, len, src_offset, dst_offset) {
  if (dst_offset >= 0 && (src_offset >= 0 && ((dst_offset + len | 0) <= dst.length && (src_offset + len | 0) <= self.length))) {
    moonbitlang$core$array$$FixedArray$unsafe_blit$15$(dst, dst_offset, self, src_offset, len);
    return;
  } else {
    moonbitlang$core$builtin$$abort$5$(`bounds check failed: dst_offset = ${moonbitlang$core$builtin$$Show$to_string$22$(dst_offset)}, src_offset = ${moonbitlang$core$builtin$$Show$to_string$22$(src_offset)}, len = ${moonbitlang$core$builtin$$Show$to_string$22$(len)}, dst.length = ${moonbitlang$core$builtin$$Show$to_string$22$(dst.length)}, self.length = ${moonbitlang$core$builtin$$Show$to_string$22$(self.length)}`, "@moonbitlang/core/builtin:fixedarray_block.mbt:111:5-113:6");
    return;
  }
}
function moonbitlang$core$array$$FixedArray$blit_to$46$inner$16$(self, dst, len, src_offset, dst_offset) {
  if (dst_offset >= 0 && (src_offset >= 0 && ((dst_offset + len | 0) <= dst.length && (src_offset + len | 0) <= self.length))) {
    moonbitlang$core$array$$FixedArray$unsafe_blit$16$(dst, dst_offset, self, src_offset, len);
    return;
  } else {
    moonbitlang$core$builtin$$abort$5$(`bounds check failed: dst_offset = ${moonbitlang$core$builtin$$Show$to_string$22$(dst_offset)}, src_offset = ${moonbitlang$core$builtin$$Show$to_string$22$(src_offset)}, len = ${moonbitlang$core$builtin$$Show$to_string$22$(len)}, dst.length = ${moonbitlang$core$builtin$$Show$to_string$22$(dst.length)}, self.length = ${moonbitlang$core$builtin$$Show$to_string$22$(self.length)}`, "@moonbitlang/core/builtin:fixedarray_block.mbt:111:5-113:6");
    return;
  }
}
function moonbitlang$core$array$$FixedArray$copy$13$(self) {
  return moonbitlang$core$builtin$$JSArray$copy(self);
}
function moonbitlang$core$array$$FixedArray$copy$14$(self) {
  return moonbitlang$core$builtin$$JSArray$copy(self);
}
function moonbitlang$core$array$$FixedArray$copy$15$(self) {
  return moonbitlang$core$builtin$$JSArray$copy(self);
}
function moonbitlang$core$array$$FixedArray$copy$16$(self) {
  return moonbitlang$core$builtin$$JSArray$copy(self);
}
function moonbitlang$core$builtin$$Show$output$35$(self, logger) {
  const pkg = self.pkg;
  const _bind = moonbitlang$core$string$$StringView$find(pkg, { str: moonbitlang$core$builtin$$output$46$42$bind$124$8198, start: 0, end: moonbitlang$core$builtin$$output$46$42$bind$124$8198.length });
  let _bind$2;
  if (_bind === undefined) {
    _bind$2 = { _0: pkg, _1: undefined };
  } else {
    const _Some = _bind;
    const _first_slash = _Some;
    const _bind$3 = moonbitlang$core$string$$StringView$find(moonbitlang$core$string$$StringView$view$46$inner(pkg, _first_slash + 1 | 0, undefined), { str: moonbitlang$core$builtin$$output$46$42$bind$124$8192, start: 0, end: moonbitlang$core$builtin$$output$46$42$bind$124$8192.length });
    if (_bind$3 === undefined) {
      _bind$2 = { _0: pkg, _1: undefined };
    } else {
      const _Some$2 = _bind$3;
      const _second_slash = _Some$2;
      const module_name_end = (_first_slash + 1 | 0) + _second_slash | 0;
      _bind$2 = { _0: moonbitlang$core$string$$StringView$view$46$inner(pkg, 0, module_name_end), _1: moonbitlang$core$string$$StringView$view$46$inner(pkg, module_name_end + 1 | 0, undefined) };
    }
  }
  const _module_name = _bind$2._0;
  const _package_name = _bind$2._1;
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
function moonbitlang$core$builtin$$Show$output$24$(self, logger) {
  moonbitlang$core$builtin$$Show$output$35$(moonbitlang$core$builtin$$SourceLocRepr$parse(self), logger);
}
function moonbitlang$core$array$$Array$unsafe_truncate_to_length$10$(self, new_len) {
  moonbitlang$core$builtin$$JSArray$set_length(self, new_len);
}
function moonbitlang$core$array$$Array$copy$20$(self) {
  return moonbitlang$core$builtin$$JSArray$copy(self);
}
function moonbitlang$core$array$$Array$copy$18$(self) {
  return moonbitlang$core$builtin$$JSArray$copy(self);
}
function moonbitlang$core$array$$MutArrayView$swap$9$(arr, i, j) {
  const temp = moonbitlang$core$array$$MutArrayView$at$9$(arr, i);
  moonbitlang$core$array$$MutArrayView$set$9$(arr, i, moonbitlang$core$array$$MutArrayView$at$9$(arr, j));
  moonbitlang$core$array$$MutArrayView$set$9$(arr, j, temp);
}
function moonbitlang$core$array$$MutArrayView$swap$10$(arr, i, j) {
  const temp = moonbitlang$core$array$$MutArrayView$at$10$(arr, i);
  moonbitlang$core$array$$MutArrayView$set$10$(arr, i, moonbitlang$core$array$$MutArrayView$at$10$(arr, j));
  moonbitlang$core$array$$MutArrayView$set$10$(arr, j, temp);
}
function moonbitlang$core$array$$MutArrayView$slice$9$(arr, start, end) {
  return moonbitlang$core$array$$MutArrayView$mut_view$46$inner$9$(arr, start, end);
}
function moonbitlang$core$array$$MutArrayView$slice$10$(arr, start, end) {
  return moonbitlang$core$array$$MutArrayView$mut_view$46$inner$10$(arr, start, end);
}
function moonbitlang$core$array$$MutArrayView$rev_in_place$9$(arr) {
  const len = arr.end - arr.start | 0;
  const mid_len = len / 2 | 0;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < mid_len) {
      const j = (len - i | 0) - 1 | 0;
      const temp = moonbitlang$core$array$$MutArrayView$at$9$(arr, i);
      moonbitlang$core$array$$MutArrayView$set$9$(arr, i, moonbitlang$core$array$$MutArrayView$at$9$(arr, j));
      moonbitlang$core$array$$MutArrayView$set$9$(arr, j, temp);
      _tmp = i + 1 | 0;
      continue;
    } else {
      return;
    }
  }
}
function moonbitlang$core$array$$MutArrayView$rev_in_place$10$(arr) {
  const len = arr.end - arr.start | 0;
  const mid_len = len / 2 | 0;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < mid_len) {
      const j = (len - i | 0) - 1 | 0;
      const temp = moonbitlang$core$array$$MutArrayView$at$10$(arr, i);
      moonbitlang$core$array$$MutArrayView$set$10$(arr, i, moonbitlang$core$array$$MutArrayView$at$10$(arr, j));
      moonbitlang$core$array$$MutArrayView$set$10$(arr, j, temp);
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
function moonbitlang$core$builtin$$fixed_bubble_sort_by$9$(arr, cmp) {
  const _end561 = arr.end - arr.start | 0;
  let _tmp = 1;
  while (true) {
    const i = _tmp;
    if (i < _end561) {
      let _tmp$2 = i;
      while (true) {
        const j = _tmp$2;
        if (j > 0 && cmp(moonbitlang$core$array$$MutArrayView$at$9$(arr, j - 1 | 0), moonbitlang$core$array$$MutArrayView$at$9$(arr, j)) > 0) {
          moonbitlang$core$array$$MutArrayView$swap$9$(arr, j, j - 1 | 0);
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
function moonbitlang$core$builtin$$fixed_bubble_sort_by$10$(arr, cmp) {
  const _end561 = arr.end - arr.start | 0;
  let _tmp = 1;
  while (true) {
    const i = _tmp;
    if (i < _end561) {
      let _tmp$2 = i;
      while (true) {
        const j = _tmp$2;
        if (j > 0 && cmp(moonbitlang$core$array$$MutArrayView$at$10$(arr, j - 1 | 0), moonbitlang$core$array$$MutArrayView$at$10$(arr, j)) > 0) {
          moonbitlang$core$array$$MutArrayView$swap$10$(arr, j, j - 1 | 0);
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
function moonbitlang$core$builtin$$fixed_choose_pivot_by$46$sort_2$47$604(_env, a, b) {
  const cmp = _env._2;
  const arr = _env._1;
  const swaps = _env._0;
  if (cmp(moonbitlang$core$array$$MutArrayView$at$9$(arr, a), moonbitlang$core$array$$MutArrayView$at$9$(arr, b)) > 0) {
    moonbitlang$core$array$$MutArrayView$swap$9$(arr, a, b);
    swaps.val = swaps.val + 1 | 0;
    return;
  } else {
    return;
  }
}
function moonbitlang$core$builtin$$fixed_choose_pivot_by$46$sort_3$47$605(_env, a, b, c) {
  moonbitlang$core$builtin$$fixed_choose_pivot_by$46$sort_2$47$604(_env, a, b);
  moonbitlang$core$builtin$$fixed_choose_pivot_by$46$sort_2$47$604(_env, b, c);
  moonbitlang$core$builtin$$fixed_choose_pivot_by$46$sort_2$47$604(_env, a, b);
}
function moonbitlang$core$builtin$$fixed_choose_pivot_by$9$(arr, cmp) {
  const len = arr.end - arr.start | 0;
  const swaps = { val: 0 };
  const b = Math.imul(len / 4 | 0, 2) | 0;
  if (len >= 8) {
    const a = Math.imul(len / 4 | 0, 1) | 0;
    const c = Math.imul(len / 4 | 0, 3) | 0;
    const _env = { _0: swaps, _1: arr, _2: cmp };
    if (len > 50) {
      moonbitlang$core$builtin$$fixed_choose_pivot_by$46$sort_3$47$605(_env, a - 1 | 0, a, a + 1 | 0);
      moonbitlang$core$builtin$$fixed_choose_pivot_by$46$sort_3$47$605(_env, b - 1 | 0, b, b + 1 | 0);
      moonbitlang$core$builtin$$fixed_choose_pivot_by$46$sort_3$47$605(_env, c - 1 | 0, c, c + 1 | 0);
    }
    moonbitlang$core$builtin$$fixed_choose_pivot_by$46$sort_3$47$605(_env, a, b, c);
  }
  if (swaps.val === 12) {
    moonbitlang$core$array$$MutArrayView$rev_in_place$9$(arr);
    return { _0: (len - b | 0) - 1 | 0, _1: true };
  } else {
    return { _0: b, _1: swaps.val === 0 };
  }
}
function moonbitlang$core$builtin$$fixed_choose_pivot_by$46$sort_2$47$624(_env, a, b) {
  const cmp = _env._2;
  const arr = _env._1;
  const swaps = _env._0;
  if (cmp(moonbitlang$core$array$$MutArrayView$at$10$(arr, a), moonbitlang$core$array$$MutArrayView$at$10$(arr, b)) > 0) {
    moonbitlang$core$array$$MutArrayView$swap$10$(arr, a, b);
    swaps.val = swaps.val + 1 | 0;
    return;
  } else {
    return;
  }
}
function moonbitlang$core$builtin$$fixed_choose_pivot_by$46$sort_3$47$625(_env, a, b, c) {
  moonbitlang$core$builtin$$fixed_choose_pivot_by$46$sort_2$47$624(_env, a, b);
  moonbitlang$core$builtin$$fixed_choose_pivot_by$46$sort_2$47$624(_env, b, c);
  moonbitlang$core$builtin$$fixed_choose_pivot_by$46$sort_2$47$624(_env, a, b);
}
function moonbitlang$core$builtin$$fixed_choose_pivot_by$10$(arr, cmp) {
  const len = arr.end - arr.start | 0;
  const swaps = { val: 0 };
  const b = Math.imul(len / 4 | 0, 2) | 0;
  if (len >= 8) {
    const a = Math.imul(len / 4 | 0, 1) | 0;
    const c = Math.imul(len / 4 | 0, 3) | 0;
    const _env = { _0: swaps, _1: arr, _2: cmp };
    if (len > 50) {
      moonbitlang$core$builtin$$fixed_choose_pivot_by$46$sort_3$47$625(_env, a - 1 | 0, a, a + 1 | 0);
      moonbitlang$core$builtin$$fixed_choose_pivot_by$46$sort_3$47$625(_env, b - 1 | 0, b, b + 1 | 0);
      moonbitlang$core$builtin$$fixed_choose_pivot_by$46$sort_3$47$625(_env, c - 1 | 0, c, c + 1 | 0);
    }
    moonbitlang$core$builtin$$fixed_choose_pivot_by$46$sort_3$47$625(_env, a, b, c);
  }
  if (swaps.val === 12) {
    moonbitlang$core$array$$MutArrayView$rev_in_place$10$(arr);
    return { _0: (len - b | 0) - 1 | 0, _1: true };
  } else {
    return { _0: b, _1: swaps.val === 0 };
  }
}
function moonbitlang$core$builtin$$fixed_sift_down_by$9$(arr, index, cmp) {
  let index$2 = index;
  const len = arr.end - arr.start | 0;
  let child = (Math.imul(index$2, 2) | 0) + 1 | 0;
  while (true) {
    if (child < len) {
      if ((child + 1 | 0) < len && cmp(moonbitlang$core$array$$MutArrayView$at$9$(arr, child), moonbitlang$core$array$$MutArrayView$at$9$(arr, child + 1 | 0)) < 0) {
        child = child + 1 | 0;
      }
      if (cmp(moonbitlang$core$array$$MutArrayView$at$9$(arr, index$2), moonbitlang$core$array$$MutArrayView$at$9$(arr, child)) >= 0) {
        return undefined;
      }
      moonbitlang$core$array$$MutArrayView$swap$9$(arr, index$2, child);
      index$2 = child;
      child = (Math.imul(index$2, 2) | 0) + 1 | 0;
      continue;
    } else {
      return;
    }
  }
}
function moonbitlang$core$builtin$$fixed_sift_down_by$10$(arr, index, cmp) {
  let index$2 = index;
  const len = arr.end - arr.start | 0;
  let child = (Math.imul(index$2, 2) | 0) + 1 | 0;
  while (true) {
    if (child < len) {
      if ((child + 1 | 0) < len && cmp(moonbitlang$core$array$$MutArrayView$at$10$(arr, child), moonbitlang$core$array$$MutArrayView$at$10$(arr, child + 1 | 0)) < 0) {
        child = child + 1 | 0;
      }
      if (cmp(moonbitlang$core$array$$MutArrayView$at$10$(arr, index$2), moonbitlang$core$array$$MutArrayView$at$10$(arr, child)) >= 0) {
        return undefined;
      }
      moonbitlang$core$array$$MutArrayView$swap$10$(arr, index$2, child);
      index$2 = child;
      child = (Math.imul(index$2, 2) | 0) + 1 | 0;
      continue;
    } else {
      return;
    }
  }
}
function moonbitlang$core$builtin$$fixed_heap_sort_by$9$(arr, cmp) {
  const len = arr.end - arr.start | 0;
  let _tmp = (len / 2 | 0) - 1 | 0;
  while (true) {
    const i = _tmp;
    if (i >= 0) {
      moonbitlang$core$builtin$$fixed_sift_down_by$9$(arr, i, cmp);
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
      moonbitlang$core$array$$MutArrayView$swap$9$(arr, 0, i);
      moonbitlang$core$builtin$$fixed_sift_down_by$9$(moonbitlang$core$array$$MutArrayView$slice$9$(arr, 0, i), 0, cmp);
      _tmp$2 = i - 1 | 0;
      continue;
    } else {
      return;
    }
  }
}
function moonbitlang$core$builtin$$fixed_heap_sort_by$10$(arr, cmp) {
  const len = arr.end - arr.start | 0;
  let _tmp = (len / 2 | 0) - 1 | 0;
  while (true) {
    const i = _tmp;
    if (i >= 0) {
      moonbitlang$core$builtin$$fixed_sift_down_by$10$(arr, i, cmp);
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
      moonbitlang$core$array$$MutArrayView$swap$10$(arr, 0, i);
      moonbitlang$core$builtin$$fixed_sift_down_by$10$(moonbitlang$core$array$$MutArrayView$slice$10$(arr, 0, i), 0, cmp);
      _tmp$2 = i - 1 | 0;
      continue;
    } else {
      return;
    }
  }
}
function moonbitlang$core$builtin$$fixed_partition_by$9$(arr, cmp, pivot_index) {
  moonbitlang$core$array$$MutArrayView$swap$9$(arr, pivot_index, (arr.end - arr.start | 0) - 1 | 0);
  const pivot = moonbitlang$core$array$$MutArrayView$at$9$(arr, (arr.end - arr.start | 0) - 1 | 0);
  let i = 0;
  let partitioned = true;
  const _end550 = (arr.end - arr.start | 0) - 1 | 0;
  let _tmp = 0;
  while (true) {
    const j = _tmp;
    if (j < _end550) {
      if (cmp(moonbitlang$core$array$$MutArrayView$at$9$(arr, j), pivot) < 0) {
        if (i !== j) {
          moonbitlang$core$array$$MutArrayView$swap$9$(arr, i, j);
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
  moonbitlang$core$array$$MutArrayView$swap$9$(arr, i, (arr.end - arr.start | 0) - 1 | 0);
  return { _0: i, _1: partitioned };
}
function moonbitlang$core$builtin$$fixed_partition_by$10$(arr, cmp, pivot_index) {
  moonbitlang$core$array$$MutArrayView$swap$10$(arr, pivot_index, (arr.end - arr.start | 0) - 1 | 0);
  const pivot = moonbitlang$core$array$$MutArrayView$at$10$(arr, (arr.end - arr.start | 0) - 1 | 0);
  let i = 0;
  let partitioned = true;
  const _end550 = (arr.end - arr.start | 0) - 1 | 0;
  let _tmp = 0;
  while (true) {
    const j = _tmp;
    if (j < _end550) {
      if (cmp(moonbitlang$core$array$$MutArrayView$at$10$(arr, j), pivot) < 0) {
        if (i !== j) {
          moonbitlang$core$array$$MutArrayView$swap$10$(arr, i, j);
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
  moonbitlang$core$array$$MutArrayView$swap$10$(arr, i, (arr.end - arr.start | 0) - 1 | 0);
  return { _0: i, _1: partitioned };
}
function moonbitlang$core$builtin$$fixed_try_bubble_sort_by$9$(arr, cmp) {
  let tries = 0;
  const _end571 = arr.end - arr.start | 0;
  let _tmp = 1;
  while (true) {
    const i = _tmp;
    if (i < _end571) {
      let sorted = true;
      let _tmp$2 = i;
      while (true) {
        const j = _tmp$2;
        if (j > 0 && cmp(moonbitlang$core$array$$MutArrayView$at$9$(arr, j - 1 | 0), moonbitlang$core$array$$MutArrayView$at$9$(arr, j)) > 0) {
          sorted = false;
          moonbitlang$core$array$$MutArrayView$swap$9$(arr, j, j - 1 | 0);
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
function moonbitlang$core$builtin$$fixed_try_bubble_sort_by$10$(arr, cmp) {
  let tries = 0;
  const _end571 = arr.end - arr.start | 0;
  let _tmp = 1;
  while (true) {
    const i = _tmp;
    if (i < _end571) {
      let sorted = true;
      let _tmp$2 = i;
      while (true) {
        const j = _tmp$2;
        if (j > 0 && cmp(moonbitlang$core$array$$MutArrayView$at$10$(arr, j - 1 | 0), moonbitlang$core$array$$MutArrayView$at$10$(arr, j)) > 0) {
          sorted = false;
          moonbitlang$core$array$$MutArrayView$swap$10$(arr, j, j - 1 | 0);
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
function moonbitlang$core$builtin$$fixed_quick_sort_by$9$(arr, cmp, pred, limit) {
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
        moonbitlang$core$builtin$$fixed_bubble_sort_by$9$(arr$2, cmp);
      }
      return undefined;
    }
    if (limit$2 === 0) {
      moonbitlang$core$builtin$$fixed_heap_sort_by$9$(arr$2, cmp);
      return undefined;
    }
    const _bind = moonbitlang$core$builtin$$fixed_choose_pivot_by$9$(arr$2, cmp);
    const _pivot_index = _bind._0;
    const _likely_sorted = _bind._1;
    if (was_partitioned && (balanced && _likely_sorted)) {
      if (moonbitlang$core$builtin$$fixed_try_bubble_sort_by$9$(arr$2, cmp)) {
        return undefined;
      }
    }
    const _bind$2 = moonbitlang$core$builtin$$fixed_partition_by$9$(arr$2, cmp, _pivot_index);
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
      if (cmp(_pred, moonbitlang$core$array$$MutArrayView$at$9$(arr$2, _pivot)) === 0) {
        let i = _pivot;
        while (true) {
          if (i < len && cmp(_pred, moonbitlang$core$array$$MutArrayView$at$9$(arr$2, i)) === 0) {
            i = i + 1 | 0;
            continue;
          } else {
            break;
          }
        }
        arr$2 = moonbitlang$core$array$$MutArrayView$slice$9$(arr$2, i, len);
        continue;
      }
    }
    const left = moonbitlang$core$array$$MutArrayView$slice$9$(arr$2, 0, _pivot);
    const right = moonbitlang$core$array$$MutArrayView$slice$9$(arr$2, _pivot + 1 | 0, len);
    if ((left.end - left.start | 0) < (right.end - right.start | 0)) {
      moonbitlang$core$builtin$$fixed_quick_sort_by$9$(left, cmp, pred$2, limit$2);
      pred$2 = moonbitlang$core$array$$MutArrayView$at$9$(arr$2, _pivot);
      arr$2 = right;
    } else {
      moonbitlang$core$builtin$$fixed_quick_sort_by$9$(right, cmp, moonbitlang$core$array$$MutArrayView$at$9$(arr$2, _pivot), limit$2);
      arr$2 = left;
    }
    continue;
  }
}
function moonbitlang$core$builtin$$fixed_quick_sort_by$10$(arr, cmp, pred, limit) {
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
        moonbitlang$core$builtin$$fixed_bubble_sort_by$10$(arr$2, cmp);
      }
      return undefined;
    }
    if (limit$2 === 0) {
      moonbitlang$core$builtin$$fixed_heap_sort_by$10$(arr$2, cmp);
      return undefined;
    }
    const _bind = moonbitlang$core$builtin$$fixed_choose_pivot_by$10$(arr$2, cmp);
    const _pivot_index = _bind._0;
    const _likely_sorted = _bind._1;
    if (was_partitioned && (balanced && _likely_sorted)) {
      if (moonbitlang$core$builtin$$fixed_try_bubble_sort_by$10$(arr$2, cmp)) {
        return undefined;
      }
    }
    const _bind$2 = moonbitlang$core$builtin$$fixed_partition_by$10$(arr$2, cmp, _pivot_index);
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
      if (cmp(_pred, moonbitlang$core$array$$MutArrayView$at$10$(arr$2, _pivot)) === 0) {
        let i = _pivot;
        while (true) {
          if (i < len && cmp(_pred, moonbitlang$core$array$$MutArrayView$at$10$(arr$2, i)) === 0) {
            i = i + 1 | 0;
            continue;
          } else {
            break;
          }
        }
        arr$2 = moonbitlang$core$array$$MutArrayView$slice$10$(arr$2, i, len);
        continue;
      }
    }
    const left = moonbitlang$core$array$$MutArrayView$slice$10$(arr$2, 0, _pivot);
    const right = moonbitlang$core$array$$MutArrayView$slice$10$(arr$2, _pivot + 1 | 0, len);
    if ((left.end - left.start | 0) < (right.end - right.start | 0)) {
      moonbitlang$core$builtin$$fixed_quick_sort_by$10$(left, cmp, pred$2, limit$2);
      pred$2 = moonbitlang$core$array$$MutArrayView$at$10$(arr$2, _pivot);
      arr$2 = right;
    } else {
      moonbitlang$core$builtin$$fixed_quick_sort_by$10$(right, cmp, moonbitlang$core$array$$MutArrayView$at$10$(arr$2, _pivot), limit$2);
      arr$2 = left;
    }
    continue;
  }
}
function moonbitlang$core$array$$MutArrayView$sort_by_key$36$(self, map) {
  moonbitlang$core$builtin$$fixed_quick_sort_by$10$(self, (a, b) => $compare_int(map(a), map(b)), undefined, moonbitlang$core$builtin$$fixed_get_limit(self.end - self.start | 0));
}
function moonbitlang$core$array$$MutArrayView$sort_by$9$(self, cmp) {
  moonbitlang$core$builtin$$fixed_quick_sort_by$9$(self, cmp, undefined, moonbitlang$core$builtin$$fixed_get_limit(self.end - self.start | 0));
}
function moonbitlang$core$array$$Array$sort_by_key$36$(self, map) {
  moonbitlang$core$array$$MutArrayView$sort_by_key$36$(moonbitlang$core$array$$Array$mut_view$46$inner$10$(self, 0, undefined), map);
}
function moonbitlang$core$array$$Array$sort_by$9$(self, cmp) {
  moonbitlang$core$array$$MutArrayView$sort_by$9$(moonbitlang$core$array$$Array$mut_view$46$inner$9$(self, 0, undefined), cmp);
}
function moonbitlang$core$array$$Array$clear$10$(self) {
  moonbitlang$core$array$$Array$unsafe_truncate_to_length$10$(self, 0);
}
function moonbitlang$core$array$$Array$contains$18$(self, value) {
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
function moonbitlang$core$builtin$$Show$output$26$(self, logger) {
  logger.method_table.method_0(logger.self, Error$$to_string(self));
}
function moonbitlang$core$hashmap$$HashMap$iterator$37$(self) {
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
function moonbitlang$core$hashmap$$HashMap$iterator$38$(self) {
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
function moonbitlang$core$hashmap$$HashMap$iter$37$(self) {
  return moonbitlang$core$builtin$$Iterator$iter$27$(moonbitlang$core$hashmap$$HashMap$iterator$37$(self));
}
function moonbitlang$core$hashmap$$HashMap$iter$38$(self) {
  return moonbitlang$core$builtin$$Iterator$iter$28$(moonbitlang$core$hashmap$$HashMap$iterator$38$(self));
}
function moonbitlang$core$hashmap$$HashMap$new$46$inner$37$(capacity) {
  const capacity$2 = moonbitlang$core$int$$Int$next_power_of_two(capacity);
  const _bind = $make_array_len_and_init(capacity$2, undefined);
  const _bind$2 = capacity$2 - 1 | 0;
  return { entries: _bind, capacity: capacity$2, capacity_mask: _bind$2, size: 0 };
}
function moonbitlang$core$hashmap$$HashMap$new$46$inner$38$(capacity) {
  const capacity$2 = moonbitlang$core$int$$Int$next_power_of_two(capacity);
  const _bind = $make_array_len_and_init(capacity$2, undefined);
  const _bind$2 = capacity$2 - 1 | 0;
  return { entries: _bind, capacity: capacity$2, capacity_mask: _bind$2, size: 0 };
}
function moonbitlang$core$hashmap$$HashMap$shift_back$37$(self, idx) {
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
function moonbitlang$core$hashmap$$HashMap$shift_back$38$(self, idx) {
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
function moonbitlang$core$hashmap$$HashMap$remove_with_hash$37$(self, key, hash) {
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
        moonbitlang$core$hashmap$$HashMap$shift_back$37$(self, idx);
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
function moonbitlang$core$hashmap$$HashMap$remove_with_hash$38$(self, key, hash) {
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
        moonbitlang$core$hashmap$$HashMap$shift_back$38$(self, idx);
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
function moonbitlang$core$hashmap$$HashMap$remove$37$(self, key) {
  moonbitlang$core$hashmap$$HashMap$remove_with_hash$37$(self, key, moonbitlang$core$builtin$$Hash$hash$29$(key));
}
function moonbitlang$core$hashmap$$HashMap$remove$38$(self, key) {
  moonbitlang$core$hashmap$$HashMap$remove_with_hash$38$(self, key, moonbitlang$core$builtin$$Hash$hash$30$(key));
}
function moonbitlang$core$immut$internal$path$$of$18$(key) {
  return moonbitlang$core$builtin$$Hash$hash$22$(key) | -1073741824;
}
function moonbitlang$core$immut$internal$path$$of$19$(key) {
  return moonbitlang$core$builtin$$Hash$hash$23$(key) | -1073741824;
}
function moonbitlang$core$immut$internal$path$$of$39$(key) {
  return moonbitlang$core$builtin$$Hash$hash$39$(key) | -1073741824;
}
function moonbitlang$core$immut$internal$sparse_array$$singleton$13$(idx, value) {
  const _p = 0;
  return { elem_info: _p | 1 << idx, data: [value] };
}
function moonbitlang$core$immut$internal$sparse_array$$singleton$14$(idx, value) {
  const _p = 0;
  return { elem_info: _p | 1 << idx, data: [value] };
}
function moonbitlang$core$immut$internal$sparse_array$$singleton$15$(idx, value) {
  const _p = 0;
  return { elem_info: _p | 1 << idx, data: [value] };
}
function moonbitlang$core$immut$internal$sparse_array$$singleton$16$(idx, value) {
  const _p = 0;
  return { elem_info: _p | 1 << idx, data: [value] };
}
function moonbitlang$core$immut$internal$sparse_array$$SparseArray$get$13$(self, idx) {
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
function moonbitlang$core$immut$internal$sparse_array$$SparseArray$get$14$(self, idx) {
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
function moonbitlang$core$immut$internal$sparse_array$$SparseArray$get$16$(self, idx) {
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
function moonbitlang$core$immut$internal$sparse_array$$SparseArray$get$15$(self, idx) {
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
function moonbitlang$core$immut$internal$sparse_array$$SparseArray$unsafe_get$13$(self, idx) {
  const _tmp = self.data;
  const _p = self.elem_info;
  const _tmp$2 = $i32_popcnt(_p & ((1 << idx >>> 0) - (1 >>> 0) | 0));
  $bound_check(_tmp, _tmp$2);
  return _tmp[_tmp$2];
}
function moonbitlang$core$immut$internal$sparse_array$$doubleton$13$(idx1, value1, idx2, value2) {
  const _p = 0;
  const _p$2 = _p | 1 << idx1;
  return { elem_info: _p$2 | 1 << idx2, data: idx1 < idx2 ? [value1, value2] : [value2, value1] };
}
function moonbitlang$core$immut$internal$sparse_array$$doubleton$14$(idx1, value1, idx2, value2) {
  const _p = 0;
  const _p$2 = _p | 1 << idx1;
  return { elem_info: _p$2 | 1 << idx2, data: idx1 < idx2 ? [value1, value2] : [value2, value1] };
}
function moonbitlang$core$immut$internal$sparse_array$$doubleton$15$(idx1, value1, idx2, value2) {
  const _p = 0;
  const _p$2 = _p | 1 << idx1;
  return { elem_info: _p$2 | 1 << idx2, data: idx1 < idx2 ? [value1, value2] : [value2, value1] };
}
function moonbitlang$core$immut$internal$sparse_array$$doubleton$16$(idx1, value1, idx2, value2) {
  const _p = 0;
  const _p$2 = _p | 1 << idx1;
  return { elem_info: _p$2 | 1 << idx2, data: idx1 < idx2 ? [value1, value2] : [value2, value1] };
}
function moonbitlang$core$immut$internal$sparse_array$$SparseArray$add$13$(self, idx, value) {
  const old_data = self.data;
  const old_len = old_data.length;
  const new_len = old_len + 1 | 0;
  const _p = self.elem_info;
  const pos_of_new_item = $i32_popcnt(_p & ((1 << idx >>> 0) - (1 >>> 0) | 0));
  const new_data = $make_array_len_and_init(new_len, value);
  moonbitlang$core$array$$FixedArray$blit_to$46$inner$13$(old_data, new_data, pos_of_new_item, 0, 0);
  moonbitlang$core$array$$FixedArray$blit_to$46$inner$13$(old_data, new_data, old_len - pos_of_new_item | 0, pos_of_new_item, pos_of_new_item + 1 | 0);
  const _p$2 = self.elem_info;
  return { elem_info: _p$2 | 1 << idx, data: new_data };
}
function moonbitlang$core$immut$internal$sparse_array$$SparseArray$add$14$(self, idx, value) {
  const old_data = self.data;
  const old_len = old_data.length;
  const new_len = old_len + 1 | 0;
  const _p = self.elem_info;
  const pos_of_new_item = $i32_popcnt(_p & ((1 << idx >>> 0) - (1 >>> 0) | 0));
  const new_data = $make_array_len_and_init(new_len, value);
  moonbitlang$core$array$$FixedArray$blit_to$46$inner$14$(old_data, new_data, pos_of_new_item, 0, 0);
  moonbitlang$core$array$$FixedArray$blit_to$46$inner$14$(old_data, new_data, old_len - pos_of_new_item | 0, pos_of_new_item, pos_of_new_item + 1 | 0);
  const _p$2 = self.elem_info;
  return { elem_info: _p$2 | 1 << idx, data: new_data };
}
function moonbitlang$core$immut$internal$sparse_array$$SparseArray$add$15$(self, idx, value) {
  const old_data = self.data;
  const old_len = old_data.length;
  const new_len = old_len + 1 | 0;
  const _p = self.elem_info;
  const pos_of_new_item = $i32_popcnt(_p & ((1 << idx >>> 0) - (1 >>> 0) | 0));
  const new_data = $make_array_len_and_init(new_len, value);
  moonbitlang$core$array$$FixedArray$blit_to$46$inner$15$(old_data, new_data, pos_of_new_item, 0, 0);
  moonbitlang$core$array$$FixedArray$blit_to$46$inner$15$(old_data, new_data, old_len - pos_of_new_item | 0, pos_of_new_item, pos_of_new_item + 1 | 0);
  const _p$2 = self.elem_info;
  return { elem_info: _p$2 | 1 << idx, data: new_data };
}
function moonbitlang$core$immut$internal$sparse_array$$SparseArray$add$16$(self, idx, value) {
  const old_data = self.data;
  const old_len = old_data.length;
  const new_len = old_len + 1 | 0;
  const _p = self.elem_info;
  const pos_of_new_item = $i32_popcnt(_p & ((1 << idx >>> 0) - (1 >>> 0) | 0));
  const new_data = $make_array_len_and_init(new_len, value);
  moonbitlang$core$array$$FixedArray$blit_to$46$inner$16$(old_data, new_data, pos_of_new_item, 0, 0);
  moonbitlang$core$array$$FixedArray$blit_to$46$inner$16$(old_data, new_data, old_len - pos_of_new_item | 0, pos_of_new_item, pos_of_new_item + 1 | 0);
  const _p$2 = self.elem_info;
  return { elem_info: _p$2 | 1 << idx, data: new_data };
}
function $moonbitlang$core$immut$internal$sparse_array$$moonbitlang$core$array$$FixedArray$copy_prefix$13$(self, len) {
  $bound_check(self, 0);
  const res = $make_array_len_and_init(len, self[0]);
  moonbitlang$core$array$$FixedArray$unsafe_blit$13$(res, 0, self, 0, len);
  return res;
}
function moonbitlang$core$immut$internal$sparse_array$$SparseArray$filter$40$(self, pred) {
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
    if (moonbitlang$core$builtin$$op_notequal$17$(rest, 0)) {
      const idx = $i32_ctz(rest);
      const _bind = pred(moonbitlang$core$immut$internal$sparse_array$$SparseArray$unsafe_get$13$(self, idx));
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
        return elem_info === self_elem_info ? { elem_info: elem_info, data: data } : { elem_info: elem_info, data: $moonbitlang$core$immut$internal$sparse_array$$moonbitlang$core$array$$FixedArray$copy_prefix$13$(data, index) };
      }
    }
  }
}
function moonbitlang$core$immut$internal$sparse_array$$SparseArray$replace$13$(self, idx, value) {
  const new_data = moonbitlang$core$array$$FixedArray$copy$13$(self.data);
  const _p = self.elem_info;
  const _tmp = $i32_popcnt(_p & ((1 << idx >>> 0) - (1 >>> 0) | 0));
  $bound_check(new_data, _tmp);
  new_data[_tmp] = value;
  return { elem_info: self.elem_info, data: new_data };
}
function moonbitlang$core$immut$internal$sparse_array$$SparseArray$replace$14$(self, idx, value) {
  const new_data = moonbitlang$core$array$$FixedArray$copy$14$(self.data);
  const _p = self.elem_info;
  const _tmp = $i32_popcnt(_p & ((1 << idx >>> 0) - (1 >>> 0) | 0));
  $bound_check(new_data, _tmp);
  new_data[_tmp] = value;
  return { elem_info: self.elem_info, data: new_data };
}
function moonbitlang$core$immut$internal$sparse_array$$SparseArray$replace$15$(self, idx, value) {
  const new_data = moonbitlang$core$array$$FixedArray$copy$15$(self.data);
  const _p = self.elem_info;
  const _tmp = $i32_popcnt(_p & ((1 << idx >>> 0) - (1 >>> 0) | 0));
  $bound_check(new_data, _tmp);
  new_data[_tmp] = value;
  return { elem_info: self.elem_info, data: new_data };
}
function moonbitlang$core$immut$internal$sparse_array$$SparseArray$replace$16$(self, idx, value) {
  const new_data = moonbitlang$core$array$$FixedArray$copy$16$(self.data);
  const _p = self.elem_info;
  const _tmp = $i32_popcnt(_p & ((1 << idx >>> 0) - (1 >>> 0) | 0));
  $bound_check(new_data, _tmp);
  new_data[_tmp] = value;
  return { elem_info: self.elem_info, data: new_data };
}
function moonbitlang$core$immut$internal$sparse_array$$SparseArray$each$40$(self, f) {
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
function moonbitlang$core$list$$List$length$9$(self) {
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
function moonbitlang$core$list$$List$filter$34$(self, f) {
  let _tmp = self;
  while (true) {
    const _param = _tmp;
    if (_param.$tag === 0) {
      return $64$moonbitlang$47$core$47$list$46$List$Empty$3$;
    } else {
      const _More = _param;
      const _head = _More._0;
      const _tail = _More._1;
      if (!f(_head)) {
        _tmp = _tail;
        continue;
      } else {
        const dest = new $64$moonbitlang$47$core$47$list$46$List$More$3$(_head, $64$moonbitlang$47$core$47$list$46$List$Empty$3$);
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
                _More$2._1 = new $64$moonbitlang$47$core$47$list$46$List$More$3$(_hd, $64$moonbitlang$47$core$47$list$46$List$Empty$3$);
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
function moonbitlang$core$list$$List$lookup$41$(self, v) {
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
function moonbitlang$core$list$$List$lookup$42$(self, v) {
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
function moonbitlang$core$list$$List$lookup$43$(self, v) {
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
function moonbitlang$core$list$$List$find_index$34$(self, f) {
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
function moonbitlang$core$list$$List$find_index$44$(self, f) {
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
function moonbitlang$core$list$$List$find_index$45$(self, f) {
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
function moonbitlang$core$list$$List$find_index$46$(self, f) {
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
function moonbitlang$core$list$$List$remove_at$9$(self, index) {
  if (self.$tag === 0) {
    return $64$moonbitlang$47$core$47$list$46$List$Empty$3$;
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
        const dest = new $64$moonbitlang$47$core$47$list$46$List$More$3$(_head, $64$moonbitlang$47$core$47$list$46$List$Empty$3$);
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
                _More$2._1 = new $64$moonbitlang$47$core$47$list$46$List$More$3$(_x, $64$moonbitlang$47$core$47$list$46$List$Empty$3$);
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
function moonbitlang$core$list$$List$remove_at$47$(self, index) {
  if (self.$tag === 0) {
    return $64$moonbitlang$47$core$47$list$46$List$Empty$4$;
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
        const dest = new $64$moonbitlang$47$core$47$list$46$List$More$4$(_head, $64$moonbitlang$47$core$47$list$46$List$Empty$4$);
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
                _More$2._1 = new $64$moonbitlang$47$core$47$list$46$List$More$4$(_x, $64$moonbitlang$47$core$47$list$46$List$Empty$4$);
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
function moonbitlang$core$list$$List$remove_at$48$(self, index) {
  if (self.$tag === 0) {
    return $64$moonbitlang$47$core$47$list$46$List$Empty$5$;
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
        const dest = new $64$moonbitlang$47$core$47$list$46$List$More$5$(_head, $64$moonbitlang$47$core$47$list$46$List$Empty$5$);
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
                _More$2._1 = new $64$moonbitlang$47$core$47$list$46$List$More$5$(_x, $64$moonbitlang$47$core$47$list$46$List$Empty$5$);
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
function moonbitlang$core$list$$List$remove_at$49$(self, index) {
  if (self.$tag === 0) {
    return $64$moonbitlang$47$core$47$list$46$List$Empty$6$;
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
        const dest = new $64$moonbitlang$47$core$47$list$46$List$More$6$(_head, $64$moonbitlang$47$core$47$list$46$List$Empty$6$);
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
                _More$2._1 = new $64$moonbitlang$47$core$47$list$46$List$More$6$(_x, $64$moonbitlang$47$core$47$list$46$List$Empty$6$);
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
function moonbitlang$core$immut$hashmap$$Node$get_with_path$41$(self, key, path) {
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
        return key === _key1 ? _value1 : moonbitlang$core$list$$List$lookup$41$(_bucket, key);
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
        const _bind = moonbitlang$core$immut$internal$sparse_array$$SparseArray$get$14$(_children, idx);
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
function moonbitlang$core$immut$hashmap$$Node$get_with_path$42$(self, key, path) {
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
        return key === _key1 ? _value1 : moonbitlang$core$list$$List$lookup$42$(_bucket, key);
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
        const _bind = moonbitlang$core$immut$internal$sparse_array$$SparseArray$get$16$(_children, idx);
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
function moonbitlang$core$immut$hashmap$$Node$get_with_path$43$(self, key, path) {
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
        return key === _key1 ? _value1 : moonbitlang$core$list$$List$lookup$43$(_bucket, key);
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
        const _bind = moonbitlang$core$immut$internal$sparse_array$$SparseArray$get$13$(_children, idx);
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
function moonbitlang$core$immut$hashmap$$HashMap$get$41$(self, key) {
  const _bind = self;
  if (_bind === undefined) {
    return undefined;
  } else {
    const _Some = _bind;
    const _node = _Some;
    return moonbitlang$core$immut$hashmap$$Node$get_with_path$41$(_node, key, moonbitlang$core$immut$internal$path$$of$18$(key));
  }
}
function moonbitlang$core$immut$hashmap$$HashMap$get$42$(self, key) {
  const _bind = self;
  if (_bind === undefined) {
    return undefined;
  } else {
    const _Some = _bind;
    const _node = _Some;
    return moonbitlang$core$immut$hashmap$$Node$get_with_path$42$(_node, key, moonbitlang$core$immut$internal$path$$of$19$(key));
  }
}
function moonbitlang$core$immut$hashmap$$HashMap$get$43$(self, key) {
  const _bind = self;
  if (_bind === undefined) {
    return undefined;
  } else {
    const _Some = _bind;
    const _node = _Some;
    return moonbitlang$core$immut$hashmap$$Node$get_with_path$43$(_node, key, moonbitlang$core$immut$internal$path$$of$18$(key));
  }
}
function moonbitlang$core$immut$hashmap$$join_2$43$(key1, value1, path1, key2, value2, path2) {
  const _p = path1;
  const idx1 = _p & 31;
  const _p$2 = path2;
  const idx2 = _p$2 & 31;
  if (idx1 === idx2) {
    let node;
    const _p$3 = path1;
    if (_p$3 >>> 0 <= 127 >>> 0) {
      const _p$4 = { _0: key1, _1: value1 };
      node = new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$7$(key2, value2, new $64$moonbitlang$47$core$47$list$46$List$More$3$(_p$4, $64$moonbitlang$47$core$47$list$46$List$Empty$3$));
    } else {
      const _p$4 = path1;
      const _tmp = _p$4 >>> 5 | 0;
      const _p$5 = path2;
      node = moonbitlang$core$immut$hashmap$$join_2$43$(key1, value1, _tmp, key2, value2, _p$5 >>> 5 | 0);
    }
    return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Branch$7$(moonbitlang$core$immut$internal$sparse_array$$singleton$13$(idx1, node));
  } else {
    let node1;
    let node2;
    _L: {
      const _p$3 = path1;
      if (_p$3 >>> 0 <= 127 >>> 0) {
        const _tmp = new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$7$(key1, value1, $64$moonbitlang$47$core$47$list$46$List$Empty$3$);
        const _tmp$2 = new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$7$(key2, value2, $64$moonbitlang$47$core$47$list$46$List$Empty$3$);
        node1 = _tmp;
        node2 = _tmp$2;
        break _L;
      } else {
        const _p$4 = path1;
        const _tmp = new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$7$(key1, value1, _p$4 >>> 5 | 0);
        const _p$5 = path2;
        const _tmp$2 = new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$7$(key2, value2, _p$5 >>> 5 | 0);
        node1 = _tmp;
        node2 = _tmp$2;
        break _L;
      }
    }
    return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Branch$7$(moonbitlang$core$immut$internal$sparse_array$$doubleton$13$(idx1, node1, idx2, node2));
  }
}
function moonbitlang$core$immut$hashmap$$join_2$41$(key1, value1, path1, key2, value2, path2) {
  const _p = path1;
  const idx1 = _p & 31;
  const _p$2 = path2;
  const idx2 = _p$2 & 31;
  if (idx1 === idx2) {
    let node;
    const _p$3 = path1;
    if (_p$3 >>> 0 <= 127 >>> 0) {
      const _p$4 = { _0: key1, _1: value1 };
      node = new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$8$(key2, value2, new $64$moonbitlang$47$core$47$list$46$List$More$4$(_p$4, $64$moonbitlang$47$core$47$list$46$List$Empty$4$));
    } else {
      const _p$4 = path1;
      const _tmp = _p$4 >>> 5 | 0;
      const _p$5 = path2;
      node = moonbitlang$core$immut$hashmap$$join_2$41$(key1, value1, _tmp, key2, value2, _p$5 >>> 5 | 0);
    }
    return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Branch$8$(moonbitlang$core$immut$internal$sparse_array$$singleton$14$(idx1, node));
  } else {
    let node1;
    let node2;
    _L: {
      const _p$3 = path1;
      if (_p$3 >>> 0 <= 127 >>> 0) {
        const _tmp = new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$8$(key1, value1, $64$moonbitlang$47$core$47$list$46$List$Empty$4$);
        const _tmp$2 = new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$8$(key2, value2, $64$moonbitlang$47$core$47$list$46$List$Empty$4$);
        node1 = _tmp;
        node2 = _tmp$2;
        break _L;
      } else {
        const _p$4 = path1;
        const _tmp = new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$8$(key1, value1, _p$4 >>> 5 | 0);
        const _p$5 = path2;
        const _tmp$2 = new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$8$(key2, value2, _p$5 >>> 5 | 0);
        node1 = _tmp;
        node2 = _tmp$2;
        break _L;
      }
    }
    return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Branch$8$(moonbitlang$core$immut$internal$sparse_array$$doubleton$14$(idx1, node1, idx2, node2));
  }
}
function moonbitlang$core$immut$hashmap$$join_2$50$(key1, value1, path1, key2, value2, path2) {
  const _p = path1;
  const idx1 = _p & 31;
  const _p$2 = path2;
  const idx2 = _p$2 & 31;
  if (idx1 === idx2) {
    let node;
    const _p$3 = path1;
    if (_p$3 >>> 0 <= 127 >>> 0) {
      const _p$4 = { _0: key1, _1: value1 };
      node = new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$9$(key2, value2, new $64$moonbitlang$47$core$47$list$46$List$More$5$(_p$4, $64$moonbitlang$47$core$47$list$46$List$Empty$5$));
    } else {
      const _p$4 = path1;
      const _tmp = _p$4 >>> 5 | 0;
      const _p$5 = path2;
      node = moonbitlang$core$immut$hashmap$$join_2$50$(key1, value1, _tmp, key2, value2, _p$5 >>> 5 | 0);
    }
    return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Branch$9$(moonbitlang$core$immut$internal$sparse_array$$singleton$15$(idx1, node));
  } else {
    let node1;
    let node2;
    _L: {
      const _p$3 = path1;
      if (_p$3 >>> 0 <= 127 >>> 0) {
        const _tmp = new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$9$(key1, value1, $64$moonbitlang$47$core$47$list$46$List$Empty$5$);
        const _tmp$2 = new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$9$(key2, value2, $64$moonbitlang$47$core$47$list$46$List$Empty$5$);
        node1 = _tmp;
        node2 = _tmp$2;
        break _L;
      } else {
        const _p$4 = path1;
        const _tmp = new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$9$(key1, value1, _p$4 >>> 5 | 0);
        const _p$5 = path2;
        const _tmp$2 = new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$9$(key2, value2, _p$5 >>> 5 | 0);
        node1 = _tmp;
        node2 = _tmp$2;
        break _L;
      }
    }
    return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Branch$9$(moonbitlang$core$immut$internal$sparse_array$$doubleton$15$(idx1, node1, idx2, node2));
  }
}
function moonbitlang$core$immut$hashmap$$join_2$42$(key1, value1, path1, key2, value2, path2) {
  const _p = path1;
  const idx1 = _p & 31;
  const _p$2 = path2;
  const idx2 = _p$2 & 31;
  if (idx1 === idx2) {
    let node;
    const _p$3 = path1;
    if (_p$3 >>> 0 <= 127 >>> 0) {
      const _p$4 = { _0: key1, _1: value1 };
      node = new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$10$(key2, value2, new $64$moonbitlang$47$core$47$list$46$List$More$6$(_p$4, $64$moonbitlang$47$core$47$list$46$List$Empty$6$));
    } else {
      const _p$4 = path1;
      const _tmp = _p$4 >>> 5 | 0;
      const _p$5 = path2;
      node = moonbitlang$core$immut$hashmap$$join_2$42$(key1, value1, _tmp, key2, value2, _p$5 >>> 5 | 0);
    }
    return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Branch$10$(moonbitlang$core$immut$internal$sparse_array$$singleton$16$(idx1, node));
  } else {
    let node1;
    let node2;
    _L: {
      const _p$3 = path1;
      if (_p$3 >>> 0 <= 127 >>> 0) {
        const _tmp = new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$10$(key1, value1, $64$moonbitlang$47$core$47$list$46$List$Empty$6$);
        const _tmp$2 = new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$10$(key2, value2, $64$moonbitlang$47$core$47$list$46$List$Empty$6$);
        node1 = _tmp;
        node2 = _tmp$2;
        break _L;
      } else {
        const _p$4 = path1;
        const _tmp = new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$10$(key1, value1, _p$4 >>> 5 | 0);
        const _p$5 = path2;
        const _tmp$2 = new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$10$(key2, value2, _p$5 >>> 5 | 0);
        node1 = _tmp;
        node2 = _tmp$2;
        break _L;
      }
    }
    return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Branch$10$(moonbitlang$core$immut$internal$sparse_array$$doubleton$16$(idx1, node1, idx2, node2));
  }
}
function moonbitlang$core$immut$hashmap$$Node$add_with_path$43$(self, key, value, path) {
  switch (self.$tag) {
    case 1: {
      const _Leaf = self;
      const _key1 = _Leaf._0;
      const _value1 = _Leaf._1;
      const _bucket = _Leaf._2;
      if (key === _key1) {
        return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$7$(key, value, _bucket);
      } else {
        const _bind = moonbitlang$core$list$$List$find_index$34$(_bucket, (kv) => kv._0 === key);
        let new_bucket;
        if (_bind === undefined) {
          new_bucket = _bucket;
        } else {
          const _Some = _bind;
          const _index = _Some;
          new_bucket = moonbitlang$core$list$$List$remove_at$9$(_bucket, _index);
        }
        const _p = { _0: _key1, _1: _value1 };
        return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$7$(key, value, new $64$moonbitlang$47$core$47$list$46$List$More$3$(_p, new_bucket));
      }
    }
    case 0: {
      const _Flat = self;
      const _key1$2 = _Flat._0;
      const _value1$2 = _Flat._1;
      const _path1 = _Flat._2;
      return path === _path1 && key === _key1$2 ? new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$7$(_key1$2, value, _path1) : moonbitlang$core$immut$hashmap$$join_2$43$(_key1$2, _value1$2, _path1, key, value, path);
    }
    default: {
      const _Branch = self;
      const _children = _Branch._0;
      const _p = path;
      const idx = _p & 31;
      const _bind = moonbitlang$core$immut$internal$sparse_array$$SparseArray$get$13$(_children, idx);
      if (_bind === undefined) {
        const _p$2 = path;
        const child = new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$7$(key, value, _p$2 >>> 5 | 0);
        return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Branch$7$(moonbitlang$core$immut$internal$sparse_array$$SparseArray$add$13$(_children, idx, child));
      } else {
        const _Some = _bind;
        const _child = _Some;
        const _p$2 = path;
        const child = moonbitlang$core$immut$hashmap$$Node$add_with_path$43$(_child, key, value, _p$2 >>> 5 | 0);
        return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Branch$7$(moonbitlang$core$immut$internal$sparse_array$$SparseArray$replace$13$(_children, idx, child));
      }
    }
  }
}
function moonbitlang$core$immut$hashmap$$Node$add_with_path$41$(self, key, value, path) {
  switch (self.$tag) {
    case 1: {
      const _Leaf = self;
      const _key1 = _Leaf._0;
      const _value1 = _Leaf._1;
      const _bucket = _Leaf._2;
      if (key === _key1) {
        return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$8$(key, value, _bucket);
      } else {
        const _bind = moonbitlang$core$list$$List$find_index$44$(_bucket, (kv) => kv._0 === key);
        let new_bucket;
        if (_bind === undefined) {
          new_bucket = _bucket;
        } else {
          const _Some = _bind;
          const _index = _Some;
          new_bucket = moonbitlang$core$list$$List$remove_at$47$(_bucket, _index);
        }
        const _p = { _0: _key1, _1: _value1 };
        return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$8$(key, value, new $64$moonbitlang$47$core$47$list$46$List$More$4$(_p, new_bucket));
      }
    }
    case 0: {
      const _Flat = self;
      const _key1$2 = _Flat._0;
      const _value1$2 = _Flat._1;
      const _path1 = _Flat._2;
      return path === _path1 && key === _key1$2 ? new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$8$(_key1$2, value, _path1) : moonbitlang$core$immut$hashmap$$join_2$41$(_key1$2, _value1$2, _path1, key, value, path);
    }
    default: {
      const _Branch = self;
      const _children = _Branch._0;
      const _p = path;
      const idx = _p & 31;
      const _bind = moonbitlang$core$immut$internal$sparse_array$$SparseArray$get$14$(_children, idx);
      if (_bind === undefined) {
        const _p$2 = path;
        const child = new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$8$(key, value, _p$2 >>> 5 | 0);
        return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Branch$8$(moonbitlang$core$immut$internal$sparse_array$$SparseArray$add$14$(_children, idx, child));
      } else {
        const _Some = _bind;
        const _child = _Some;
        const _p$2 = path;
        const child = moonbitlang$core$immut$hashmap$$Node$add_with_path$41$(_child, key, value, _p$2 >>> 5 | 0);
        return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Branch$8$(moonbitlang$core$immut$internal$sparse_array$$SparseArray$replace$14$(_children, idx, child));
      }
    }
  }
}
function moonbitlang$core$immut$hashmap$$Node$add_with_path$50$(self, key, value, path) {
  switch (self.$tag) {
    case 1: {
      const _Leaf = self;
      const _key1 = _Leaf._0;
      const _value1 = _Leaf._1;
      const _bucket = _Leaf._2;
      if (key.agent === _key1.agent && key.seq === _key1.seq) {
        return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$9$(key, value, _bucket);
      } else {
        const _bind = moonbitlang$core$list$$List$find_index$45$(_bucket, (kv) => {
          const _p = kv._0;
          return _p.agent === key.agent && _p.seq === key.seq;
        });
        let new_bucket;
        if (_bind === undefined) {
          new_bucket = _bucket;
        } else {
          const _Some = _bind;
          const _index = _Some;
          new_bucket = moonbitlang$core$list$$List$remove_at$48$(_bucket, _index);
        }
        const _p = { _0: _key1, _1: _value1 };
        return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$9$(key, value, new $64$moonbitlang$47$core$47$list$46$List$More$5$(_p, new_bucket));
      }
    }
    case 0: {
      const _Flat = self;
      const _key1$2 = _Flat._0;
      const _value1$2 = _Flat._1;
      const _path1 = _Flat._2;
      return path === _path1 && (key.agent === _key1$2.agent && key.seq === _key1$2.seq) ? new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$9$(_key1$2, value, _path1) : moonbitlang$core$immut$hashmap$$join_2$50$(_key1$2, _value1$2, _path1, key, value, path);
    }
    default: {
      const _Branch = self;
      const _children = _Branch._0;
      const _p = path;
      const idx = _p & 31;
      const _bind = moonbitlang$core$immut$internal$sparse_array$$SparseArray$get$15$(_children, idx);
      if (_bind === undefined) {
        const _p$2 = path;
        const child = new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$9$(key, value, _p$2 >>> 5 | 0);
        return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Branch$9$(moonbitlang$core$immut$internal$sparse_array$$SparseArray$add$15$(_children, idx, child));
      } else {
        const _Some = _bind;
        const _child = _Some;
        const _p$2 = path;
        const child = moonbitlang$core$immut$hashmap$$Node$add_with_path$50$(_child, key, value, _p$2 >>> 5 | 0);
        return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Branch$9$(moonbitlang$core$immut$internal$sparse_array$$SparseArray$replace$15$(_children, idx, child));
      }
    }
  }
}
function moonbitlang$core$immut$hashmap$$Node$add_with_path$42$(self, key, value, path) {
  switch (self.$tag) {
    case 1: {
      const _Leaf = self;
      const _key1 = _Leaf._0;
      const _value1 = _Leaf._1;
      const _bucket = _Leaf._2;
      if (key === _key1) {
        return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$10$(key, value, _bucket);
      } else {
        const _bind = moonbitlang$core$list$$List$find_index$46$(_bucket, (kv) => kv._0 === key);
        let new_bucket;
        if (_bind === undefined) {
          new_bucket = _bucket;
        } else {
          const _Some = _bind;
          const _index = _Some;
          new_bucket = moonbitlang$core$list$$List$remove_at$49$(_bucket, _index);
        }
        const _p = { _0: _key1, _1: _value1 };
        return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$10$(key, value, new $64$moonbitlang$47$core$47$list$46$List$More$6$(_p, new_bucket));
      }
    }
    case 0: {
      const _Flat = self;
      const _key1$2 = _Flat._0;
      const _value1$2 = _Flat._1;
      const _path1 = _Flat._2;
      return path === _path1 && key === _key1$2 ? new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$10$(_key1$2, value, _path1) : moonbitlang$core$immut$hashmap$$join_2$42$(_key1$2, _value1$2, _path1, key, value, path);
    }
    default: {
      const _Branch = self;
      const _children = _Branch._0;
      const _p = path;
      const idx = _p & 31;
      const _bind = moonbitlang$core$immut$internal$sparse_array$$SparseArray$get$16$(_children, idx);
      if (_bind === undefined) {
        const _p$2 = path;
        const child = new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$10$(key, value, _p$2 >>> 5 | 0);
        return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Branch$10$(moonbitlang$core$immut$internal$sparse_array$$SparseArray$add$16$(_children, idx, child));
      } else {
        const _Some = _bind;
        const _child = _Some;
        const _p$2 = path;
        const child = moonbitlang$core$immut$hashmap$$Node$add_with_path$42$(_child, key, value, _p$2 >>> 5 | 0);
        return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Branch$10$(moonbitlang$core$immut$internal$sparse_array$$SparseArray$replace$16$(_children, idx, child));
      }
    }
  }
}
function moonbitlang$core$immut$hashmap$$HashMap$filter$51$(self, pred) {
  const go = (node) => {
    switch (node.$tag) {
      case 1: {
        const _Leaf = node;
        const _key1 = _Leaf._0;
        const _value1 = _Leaf._1;
        const _bucket = _Leaf._2;
        const new_bucket = moonbitlang$core$list$$List$filter$34$(_bucket, (kv) => pred(kv._0, kv._1));
        if (pred(_key1, _value1)) {
          return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$7$(_key1, _value1, new_bucket);
        } else {
          if (new_bucket.$tag === 0) {
            return undefined;
          } else {
            const _More = new_bucket;
            const _x = _More._0;
            const _k1 = _x._0;
            const _v1 = _x._1;
            const _tail = _More._1;
            return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Leaf$7$(_k1, _v1, _tail);
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
        const _bind = moonbitlang$core$immut$internal$sparse_array$$SparseArray$filter$40$(_children, go);
        if (_bind === undefined) {
          return undefined;
        } else {
          const _Some = _bind;
          const _new_children = _Some;
          return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Branch$7$(_new_children);
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
function moonbitlang$core$immut$hashmap$$HashMap$add$43$(self, key, value) {
  const _bind = self;
  if (_bind === undefined) {
    return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$7$(key, value, moonbitlang$core$immut$internal$path$$of$18$(key));
  } else {
    const _Some = _bind;
    const _node = _Some;
    return moonbitlang$core$immut$hashmap$$Node$add_with_path$43$(_node, key, value, moonbitlang$core$immut$internal$path$$of$18$(key));
  }
}
function moonbitlang$core$immut$hashmap$$HashMap$add$41$(self, key, value) {
  const _bind = self;
  if (_bind === undefined) {
    return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$8$(key, value, moonbitlang$core$immut$internal$path$$of$18$(key));
  } else {
    const _Some = _bind;
    const _node = _Some;
    return moonbitlang$core$immut$hashmap$$Node$add_with_path$41$(_node, key, value, moonbitlang$core$immut$internal$path$$of$18$(key));
  }
}
function moonbitlang$core$immut$hashmap$$HashMap$add$50$(self, key, value) {
  const _bind = self;
  if (_bind === undefined) {
    return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$9$(key, value, moonbitlang$core$immut$internal$path$$of$39$(key));
  } else {
    const _Some = _bind;
    const _node = _Some;
    return moonbitlang$core$immut$hashmap$$Node$add_with_path$50$(_node, key, value, moonbitlang$core$immut$internal$path$$of$39$(key));
  }
}
function moonbitlang$core$immut$hashmap$$HashMap$add$42$(self, key, value) {
  const _bind = self;
  if (_bind === undefined) {
    return new $64$moonbitlang$47$core$47$immut$47$hashmap$46$Node$Flat$10$(key, value, moonbitlang$core$immut$internal$path$$of$19$(key));
  } else {
    const _Some = _bind;
    const _node = _Some;
    return moonbitlang$core$immut$hashmap$$Node$add_with_path$42$(_node, key, value, moonbitlang$core$immut$internal$path$$of$19$(key));
  }
}
function moonbitlang$core$immut$hashmap$$length$46$node_size$47$1411(node) {
  switch (node.$tag) {
    case 1: {
      const _Leaf = node;
      const _bucket = _Leaf._2;
      return 1 + moonbitlang$core$list$$List$length$9$(_bucket) | 0;
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
          _tmp$2 = total_size + moonbitlang$core$immut$hashmap$$length$46$node_size$47$1411(_tmp$3[i]) | 0;
          continue;
        } else {
          return total_size;
        }
      }
    }
  }
}
function moonbitlang$core$immut$hashmap$$HashMap$length$43$(self) {
  const _bind = self;
  if (_bind === undefined) {
    return 0;
  } else {
    const _Some = _bind;
    const _node = _Some;
    return moonbitlang$core$immut$hashmap$$length$46$node_size$47$1411(_node);
  }
}
function moonbitlang$core$immut$hashmap$$HashMap$each$51$(self, f) {
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
        moonbitlang$core$immut$internal$sparse_array$$SparseArray$each$40$(_children, go);
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
function moonbitlang$core$immut$hashmap$$HashMap$to_array$43$(self) {
  const arr = moonbitlang$core$array$$Array$new$46$inner$9$(moonbitlang$core$immut$hashmap$$HashMap$length$43$(self));
  moonbitlang$core$immut$hashmap$$HashMap$each$51$(self, (k, v) => {
    moonbitlang$core$array$$Array$push$9$(arr, { _0: k, _1: v });
  });
  return arr;
}
function dowdiness$crdt$causal_graph$$RawVersion$new(agent, seq) {
  return { agent: agent, seq: seq };
}
function moonbitlang$core$builtin$$Hash$hash$39$(self) {
  return moonbitlang$core$builtin$$Hash$hash$23$(self.agent) + (Math.imul(moonbitlang$core$builtin$$Hash$hash$22$(self.seq), 31) | 0) | 0;
}
function dowdiness$crdt$causal_graph$$CausalGraph$new() {
  return { entries: undefined, version_map: undefined, next_lv: 0, frontier: [], agent_seqs: undefined };
}
function dowdiness$crdt$causal_graph$$CausalGraph$lv_to_raw(self, lv) {
  const _bind = moonbitlang$core$immut$hashmap$$HashMap$get$41$(self.entries, lv);
  if (_bind === undefined) {
    return undefined;
  } else {
    const _Some = _bind;
    const _entry = _Some;
    return dowdiness$crdt$causal_graph$$RawVersion$new(_entry.agent, _entry.seq);
  }
}
function dowdiness$crdt$causal_graph$$CausalGraph$get_entry(self, lv) {
  return moonbitlang$core$immut$hashmap$$HashMap$get$41$(self.entries, lv);
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
      if (!moonbitlang$core$array$$Array$contains$18$(parents, _p$5)) {
        moonbitlang$core$array$$Array$push$18$(_p$2, _p$5);
      }
      _tmp = _p$4 + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const frontier = _p$2;
  moonbitlang$core$array$$Array$push$18$(frontier, new_lv);
  self.frontier = frontier;
}
function dowdiness$crdt$causal_graph$$CausalGraph$add_version(self, parents, agent) {
  let lamport;
  if (parents.length === 0) {
    lamport = 0;
  } else {
    const _bind = moonbitlang$core$array$$Array$iter$18$(parents);
    const _p = (_p$2) => _bind((_p$3) => {
      const _bind$2 = moonbitlang$core$immut$hashmap$$HashMap$get$41$(self.entries, _p$3);
      let _tmp;
      if (_bind$2 === undefined) {
        _tmp = 0;
      } else {
        const _Some = _bind$2;
        const _entry = _Some;
        _tmp = _entry.lamport;
      }
      return _p$2(_tmp);
    });
    const _p$2 = 0;
    let max_parent_lamport;
    let _p$3;
    _L: {
      _L$2: {
        const _p$4 = { val: _p$2 };
        const _p$5 = { val: $64$moonbitlang$47$core$47$builtin$46$ForeachResult$Continue$1$ };
        _p((_p$6) => {
          const _p$7 = _p$4.val;
          _p$4.val = _p$6 > _p$7 ? _p$6 : _p$7;
          return 1;
        });
        const _tmp = _p$5.val;
        switch (_tmp.$tag) {
          case 0: {
            break;
          }
          case 1: {
            const _p$6 = _tmp;
            _p$6._0;
            break;
          }
          case 2: {
            const _p$7 = _tmp;
            const _tmp$2 = _p$7._0;
            _p$3 = _tmp$2;
            break _L$2;
          }
          case 3: {
            $panic();
            break;
          }
          default: {
            $panic();
          }
        }
        max_parent_lamport = _p$4.val;
        break _L;
      }
      max_parent_lamport = _p$3;
    }
    lamport = max_parent_lamport + 1 | 0;
  }
  const _bind = moonbitlang$core$immut$hashmap$$HashMap$get$42$(self.agent_seqs, agent);
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
  self.entries = moonbitlang$core$immut$hashmap$$HashMap$add$41$(self.entries, lv, entry);
  self.version_map = moonbitlang$core$immut$hashmap$$HashMap$add$50$(self.version_map, dowdiness$crdt$causal_graph$$RawVersion$new(agent, seq), lv);
  self.next_lv = lv + 1 | 0;
  self.agent_seqs = moonbitlang$core$immut$hashmap$$HashMap$add$42$(self.agent_seqs, agent, seq);
  dowdiness$crdt$causal_graph$$CausalGraph$update_frontier(self, lv, parents);
  return lv;
}
function dowdiness$crdt$causal_graph$$CausalGraph$get_frontier(self) {
  return moonbitlang$core$array$$Array$copy$18$(self.frontier);
}
function dowdiness$crdt$fugue$$Item$new(id, content, parent, side, timestamp, agent) {
  return { id: id, content: content, parent: parent, side: side, deleted: false, timestamp: timestamp, agent: agent };
}
function dowdiness$crdt$fugue$$FugueTree$new() {
  const root_item = dowdiness$crdt$fugue$$Item$new(-1, "", -1, 0, 0, "root");
  let items = undefined;
  items = moonbitlang$core$immut$hashmap$$HashMap$add$43$(items, -1, root_item);
  return { items: items, root: -1, length: 0 };
}
function dowdiness$crdt$fugue$$FugueTree$get_item(self, id) {
  return moonbitlang$core$immut$hashmap$$HashMap$get$43$(self.items, id);
}
function dowdiness$crdt$fugue$$FugueTree$add_item(self, item) {
  self.items = moonbitlang$core$immut$hashmap$$HashMap$add$43$(self.items, item.id, item);
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
  moonbitlang$core$builtin$$Iter$each$34$(moonbitlang$core$array$$Array$iter$9$(children), (child) => {
    const _id = child._0;
    const _item = child._1;
    const _bind = _item.side;
    if (_bind === 0) {
      moonbitlang$core$array$$Array$push$9$(left, { _0: _id, _1: _item });
      return;
    } else {
      moonbitlang$core$array$$Array$push$9$(right, { _0: _id, _1: _item });
      return;
    }
  });
  return { _0: left, _1: right };
}
function dowdiness$crdt$fugue$$FugueTree$get_children(self, parent_id) {
  return moonbitlang$core$immut$hashmap$$HashMap$to_array$43$(moonbitlang$core$immut$hashmap$$HashMap$filter$51$(self.items, (id, item) => item.parent === parent_id && id !== parent_id));
}
function dowdiness$crdt$fugue$$FugueTree$traverse_tree(self, node_id, result) {
  const children = dowdiness$crdt$fugue$$FugueTree$get_children(self, node_id);
  const _bind = dowdiness$crdt$fugue$$partition_children(children);
  const _left_children = _bind._0;
  const _right_children = _bind._1;
  moonbitlang$core$array$$Array$sort_by$9$(_left_children, dowdiness$crdt$fugue$$compare_children);
  moonbitlang$core$builtin$$Iter$each$34$(moonbitlang$core$array$$Array$iter$9$(_left_children), (child) => {
    const _child_id = child._0;
    if (_child_id !== node_id) {
      dowdiness$crdt$fugue$$FugueTree$traverse_tree(self, _child_id, result);
      return;
    } else {
      return;
    }
  });
  if (node_id !== -1) {
    const _bind$2 = dowdiness$crdt$fugue$$FugueTree$get_item(self, node_id);
    if (_bind$2 === undefined) {
    } else {
      const _Some = _bind$2;
      const _item = _Some;
      if (!_item.deleted) {
        moonbitlang$core$array$$Array$push$9$(result, { _0: node_id, _1: _item });
      }
    }
  }
  moonbitlang$core$array$$Array$sort_by$9$(_right_children, dowdiness$crdt$fugue$$compare_children);
  moonbitlang$core$builtin$$Iter$each$34$(moonbitlang$core$array$$Array$iter$9$(_right_children), (child) => {
    const _child_id = child._0;
    if (_child_id !== node_id) {
      dowdiness$crdt$fugue$$FugueTree$traverse_tree(self, _child_id, result);
      return;
    } else {
      return;
    }
  });
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
      const _p$5 = moonbitlang$core$array$$Array$at$9$(_p, _p$3);
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
    return dowdiness$crdt$fugue$$find_parent_and_side$46$tuple$47$1539;
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
    self.items = moonbitlang$core$immut$hashmap$$HashMap$add$43$(self.items, id, deleted_item);
    return;
  }
}
function dowdiness$crdt$oplog$$OpLog$new(agent_id) {
  return { operations: [], graph: dowdiness$crdt$causal_graph$$CausalGraph$new(), agent_id: agent_id };
}
function dowdiness$crdt$oplog$$OpLog$add_op(self, op) {
  const ops = self.operations;
  moonbitlang$core$array$$Array$push$20$(ops, op);
  self.operations = ops;
}
function dowdiness$crdt$oplog$$Op$new_insert(lv, parents, agent, seq, text, origin_left, origin_right) {
  return { lv: lv, parents: parents, agent: agent, seq: seq, content: new $64$dowdiness$47$crdt$47$oplog$46$OpContent$Insert(text), origin_left: origin_left, origin_right: origin_right };
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
function dowdiness$crdt$oplog$$OpLog$get_all_ops(self) {
  return moonbitlang$core$array$$Array$copy$20$(self.operations);
}
function dowdiness$crdt$oplog$$OpLog$get_frontier(self) {
  return dowdiness$crdt$causal_graph$$CausalGraph$get_frontier(self.graph);
}
function moonbitlang$core$builtin$$Eq$equal$52$(_x_867, _x_868) {
  if (_x_867 === 0) {
    if (_x_868 === 0) {
      return true;
    } else {
      return false;
    }
  } else {
    if (_x_868 === 1) {
      return true;
    } else {
      return false;
    }
  }
}
function moonbitlang$core$builtin$$Eq$equal$53$(_x_847, _x_848) {
  switch (_x_847.$tag) {
    case 0: {
      if (_x_848.$tag === 0) {
        return true;
      } else {
        return false;
      }
    }
    case 1: {
      if (_x_848.$tag === 1) {
        return true;
      } else {
        return false;
      }
    }
    case 2: {
      if (_x_848.$tag === 2) {
        return true;
      } else {
        return false;
      }
    }
    case 3: {
      if (_x_848.$tag === 3) {
        return true;
      } else {
        return false;
      }
    }
    case 4: {
      if (_x_848.$tag === 4) {
        return true;
      } else {
        return false;
      }
    }
    case 5: {
      if (_x_848.$tag === 5) {
        return true;
      } else {
        return false;
      }
    }
    case 6: {
      if (_x_848.$tag === 6) {
        return true;
      } else {
        return false;
      }
    }
    case 7: {
      if (_x_848.$tag === 7) {
        return true;
      } else {
        return false;
      }
    }
    case 8: {
      if (_x_848.$tag === 8) {
        return true;
      } else {
        return false;
      }
    }
    case 9: {
      const _Identifier = _x_847;
      const _$42$x0_849 = _Identifier._0;
      if (_x_848.$tag === 9) {
        const _Identifier$2 = _x_848;
        const _$42$y0_850 = _Identifier$2._0;
        return _$42$x0_849 === _$42$y0_850;
      } else {
        return false;
      }
    }
    case 10: {
      const _Integer = _x_847;
      const _$42$x0_851 = _Integer._0;
      if (_x_848.$tag === 10) {
        const _Integer$2 = _x_848;
        const _$42$y0_852 = _Integer$2._0;
        return _$42$x0_851 === _$42$y0_852;
      } else {
        return false;
      }
    }
    default: {
      if (_x_848.$tag === 11) {
        return true;
      } else {
        return false;
      }
    }
  }
}
function moonbitlang$core$builtin$$Hash$hash$29$(self) {
  let hasher = 0;
  hasher = (Math.imul(hasher, 31) | 0) + self.source_hash | 0;
  hasher = (Math.imul(hasher, 31) | 0) + self.start | 0;
  hasher = (Math.imul(hasher, 31) | 0) + self.end | 0;
  return hasher;
}
function dowdiness$crdt$parser$$TokenCache$new() {
  return { cache: moonbitlang$core$hashmap$$HashMap$new$46$inner$37$(8), version: 0, max_entries: 1000 };
}
function dowdiness$crdt$parser$$TokenCache$invalidate_range(self, start, end) {
  self.version = self.version + 1 | 0;
  const keys_to_remove = [];
  moonbitlang$core$builtin$$Iter$each$32$(moonbitlang$core$hashmap$$HashMap$iter$37$(self.cache), (entry) => {
    const _key = entry._0;
    if (_key.start < end && _key.end > start) {
      moonbitlang$core$array$$Array$push$29$(keys_to_remove, _key);
      return;
    } else {
      return;
    }
  });
  const _len = keys_to_remove.length;
  let _tmp = 0;
  while (true) {
    const _i = _tmp;
    if (_i < _len) {
      const key = keys_to_remove[_i];
      moonbitlang$core$hashmap$$HashMap$remove$37$(self.cache, key);
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
function dowdiness$crdt$parser$$TermNode$new(kind, start, end, node_id, children) {
  return { kind: kind, start: start, end: end, node_id: node_id, children: children };
}
function dowdiness$crdt$parser$$TermNode$error(message, position, node_id) {
  return dowdiness$crdt$parser$$TermNode$new(new $64$dowdiness$47$crdt$47$parser$46$TermKind$Error(message), position, position, node_id, []);
}
function dowdiness$crdt$parser$$advance_positioned(parser) {
  parser.position = parser.position + 1 | 0;
  return parser;
}
function dowdiness$crdt$parser$$expect_positioned(parser, expected) {
  const current = parser.position < parser.tokens.length ? moonbitlang$core$array$$Array$at$21$(parser.tokens, parser.position).token : $64$dowdiness$47$crdt$47$parser$46$Token$EOF;
  if (moonbitlang$core$builtin$$Eq$equal$53$(current, expected)) {
    return new Result$Ok$11$(dowdiness$crdt$parser$$advance_positioned(parser));
  } else {
    return new Result$Err$11$(new Error$dowdiness$47$crdt$47$parser$46$ParseError$46$ParseError({ _0: "Expected token", _1: expected }));
  }
}
function dowdiness$crdt$parser$$make_positioned_parser(tokens) {
  return { tokens: tokens, position: 0, node_id_counter: 0 };
}
function dowdiness$crdt$parser$$next_node_id(parser) {
  const id = parser.node_id_counter;
  parser.node_id_counter = parser.node_id_counter + 1 | 0;
  return id;
}
function dowdiness$crdt$parser$$peek_info_positioned(parser) {
  return parser.position < parser.tokens.length ? moonbitlang$core$array$$Array$at$21$(parser.tokens, parser.position) : dowdiness$crdt$parser$$TokenInfo$new($64$dowdiness$47$crdt$47$parser$46$Token$EOF, 0, 0);
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
          _tmp$2 = `${acc$2}${moonbitlang$core$builtin$$Show$to_string$31$(_ch)}`;
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
      moonbitlang$core$array$$Array$push$21$(acc, dowdiness$crdt$parser$$TokenInfo$new($64$dowdiness$47$crdt$47$parser$46$Token$EOF, pos$2, pos$2));
      return new Result$Ok$12$(acc);
    } else {
      $bound_check(input, pos$2);
      const c = moonbitlang$core$uint16$$UInt16$to_char(input.charCodeAt(pos$2));
      _L$2: {
        _L$3: {
          if (c === -1) {
            return new Result$Err$12$(new Error$dowdiness$47$crdt$47$parser$46$TokenizationError$46$TokenizationError(`Error to read character at position ${moonbitlang$core$int$$Int$to_string$46$inner(pos$2, 10)}`));
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
                moonbitlang$core$array$$Array$push$21$(acc, dowdiness$crdt$parser$$TokenInfo$new($64$dowdiness$47$crdt$47$parser$46$Token$Dot, pos$2, pos$2 + 1 | 0));
                _tmp = pos$2 + 1 | 0;
                continue _L;
              }
              case 40: {
                moonbitlang$core$array$$Array$push$21$(acc, dowdiness$crdt$parser$$TokenInfo$new($64$dowdiness$47$crdt$47$parser$46$Token$LeftParen, pos$2, pos$2 + 1 | 0));
                _tmp = pos$2 + 1 | 0;
                continue _L;
              }
              case 41: {
                moonbitlang$core$array$$Array$push$21$(acc, dowdiness$crdt$parser$$TokenInfo$new($64$dowdiness$47$crdt$47$parser$46$Token$RightParen, pos$2, pos$2 + 1 | 0));
                _tmp = pos$2 + 1 | 0;
                continue _L;
              }
              case 43: {
                moonbitlang$core$array$$Array$push$21$(acc, dowdiness$crdt$parser$$TokenInfo$new($64$dowdiness$47$crdt$47$parser$46$Token$Plus, pos$2, pos$2 + 1 | 0));
                _tmp = pos$2 + 1 | 0;
                continue _L;
              }
              case 45: {
                moonbitlang$core$array$$Array$push$21$(acc, dowdiness$crdt$parser$$TokenInfo$new($64$dowdiness$47$crdt$47$parser$46$Token$Minus, pos$2, pos$2 + 1 | 0));
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
                  moonbitlang$core$array$$Array$push$21$(acc, dowdiness$crdt$parser$$TokenInfo$new(token, pos$2, _new_pos));
                  _tmp = _new_pos;
                  continue _L;
                } else {
                  const _p = _x;
                  if (_p >= 48 && _p <= 57) {
                    const _bind = dowdiness$crdt$parser$$read_number(input, pos$2, 0);
                    const _new_pos = _bind._0;
                    const _number = _bind._1;
                    moonbitlang$core$array$$Array$push$21$(acc, dowdiness$crdt$parser$$TokenInfo$new(new $64$dowdiness$47$crdt$47$parser$46$Token$Integer(_number), pos$2, _new_pos));
                    _tmp = _new_pos;
                    continue _L;
                  } else {
                    return new Result$Err$12$(new Error$dowdiness$47$crdt$47$parser$46$TokenizationError$46$TokenizationError(moonbitlang$core$builtin$$Show$to_string$31$(_x)));
                  }
                }
              }
            }
          }
        }
        _tmp = pos$2 + 1 | 0;
        continue;
      }
      moonbitlang$core$array$$Array$push$21$(acc, dowdiness$crdt$parser$$TokenInfo$new($64$dowdiness$47$crdt$47$parser$46$Token$Lambda, pos$2, pos$2 + 1 | 0));
      _tmp = pos$2 + 1 | 0;
      continue;
    }
  }
}
function dowdiness$crdt$parser$$tokenize(input) {
  return dowdiness$crdt$parser$$tokenize_helper(input, 0, []);
}
function dowdiness$crdt$parser$$parse_positioned$46$parse_expression$124$405(_env, parser) {
  return dowdiness$crdt$parser$$parse_positioned$46$parse_binary_op$124$406(_env, parser);
}
function dowdiness$crdt$parser$$parse_positioned$46$parse_binary_op$124$406(_env, parser) {
  const constr = _env._1;
  const constr$2 = _env._0;
  const _bind = dowdiness$crdt$parser$$parse_positioned$46$parse_application$124$407(_env, parser);
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
    const _bind$3 = _param_0.position < _param_0.tokens.length ? moonbitlang$core$array$$Array$at$21$(_param_0.tokens, _param_0.position).token : $64$dowdiness$47$crdt$47$parser$46$Token$EOF;
    switch (_bind$3.$tag) {
      case 4: {
        const parser$2 = dowdiness$crdt$parser$$advance_positioned(_param_0);
        const _bind$4 = dowdiness$crdt$parser$$parse_positioned$46$parse_application$124$407(_env, parser$2);
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
        const node = dowdiness$crdt$parser$$TermNode$new(constr$2, start, end, node_id, [_param_1, _right]);
        _tmp$2 = _parser$2;
        _tmp$3 = node;
        continue _L;
      }
      case 5: {
        const parser$3 = dowdiness$crdt$parser$$advance_positioned(_param_0);
        const _bind$6 = dowdiness$crdt$parser$$parse_positioned$46$parse_application$124$407(_env, parser$3);
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
        const node$2 = dowdiness$crdt$parser$$TermNode$new(constr, start$2, end$2, node_id$2, [_param_1, _right$2]);
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
  return new Result$Ok$13$(_tmp);
}
function dowdiness$crdt$parser$$parse_positioned$46$parse_application$124$407(_env, parser) {
  const _bind = dowdiness$crdt$parser$$parse_positioned$46$parse_atom$124$408(_env, parser);
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
      const _bind$3 = _param_0.position < _param_0.tokens.length ? moonbitlang$core$array$$Array$at$21$(_param_0.tokens, _param_0.position).token : $64$dowdiness$47$crdt$47$parser$46$Token$EOF;
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
    const _bind$3 = dowdiness$crdt$parser$$parse_positioned$46$parse_atom$124$408(_env, _param_0);
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
  return new Result$Ok$13$(_tmp);
}
function dowdiness$crdt$parser$$parse_positioned$46$parse_atom$124$408(_env, parser) {
  const token_info = dowdiness$crdt$parser$$peek_info_positioned(parser);
  const _bind = token_info.token;
  switch (_bind.$tag) {
    case 10: {
      const _Integer = _bind;
      const _n = _Integer._0;
      const node_id = dowdiness$crdt$parser$$next_node_id(parser);
      const node = dowdiness$crdt$parser$$TermNode$new(new $64$dowdiness$47$crdt$47$parser$46$TermKind$Int(_n), token_info.start, token_info.end, node_id, []);
      return new Result$Ok$13$({ _0: dowdiness$crdt$parser$$advance_positioned(parser), _1: node });
    }
    case 9: {
      const _Identifier = _bind;
      const _name = _Identifier._0;
      const node_id$2 = dowdiness$crdt$parser$$next_node_id(parser);
      const node$2 = dowdiness$crdt$parser$$TermNode$new(new $64$dowdiness$47$crdt$47$parser$46$TermKind$Var(_name), token_info.start, token_info.end, node_id$2, []);
      return new Result$Ok$13$({ _0: dowdiness$crdt$parser$$advance_positioned(parser), _1: node$2 });
    }
    case 0: {
      const lambda_start = token_info.start;
      const parser$2 = dowdiness$crdt$parser$$advance_positioned(parser);
      const param_info = dowdiness$crdt$parser$$peek_info_positioned(parser$2);
      const _bind$2 = param_info.token;
      if (_bind$2.$tag === 9) {
        const _Identifier$2 = _bind$2;
        const _param = _Identifier$2._0;
        const parser$3 = dowdiness$crdt$parser$$advance_positioned(parser$2);
        const _bind$3 = dowdiness$crdt$parser$$expect_positioned(parser$3, $64$dowdiness$47$crdt$47$parser$46$Token$Dot);
        let parser$4;
        if (_bind$3.$tag === 1) {
          const _ok = _bind$3;
          parser$4 = _ok._0;
        } else {
          return _bind$3;
        }
        const _bind$4 = dowdiness$crdt$parser$$parse_positioned$46$parse_expression$124$405(_env, parser$4);
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
        return new Result$Ok$13$({ _0: _parser, _1: node$3 });
      } else {
        return new Result$Err$14$(new Error$dowdiness$47$crdt$47$parser$46$ParseError$46$ParseError({ _0: "Expected parameter after λ", _1: _bind$2 }));
      }
    }
    case 6: {
      const if_start = token_info.start;
      const parser$3 = dowdiness$crdt$parser$$advance_positioned(parser);
      const _bind$3 = dowdiness$crdt$parser$$parse_positioned$46$parse_expression$124$405(_env, parser$3);
      let _bind$4;
      if (_bind$3.$tag === 1) {
        const _ok = _bind$3;
        _bind$4 = _ok._0;
      } else {
        return _bind$3;
      }
      const _parser = _bind$4._0;
      const _condition = _bind$4._1;
      const _bind$5 = dowdiness$crdt$parser$$expect_positioned(_parser, $64$dowdiness$47$crdt$47$parser$46$Token$Then);
      let parser$4;
      if (_bind$5.$tag === 1) {
        const _ok = _bind$5;
        parser$4 = _ok._0;
      } else {
        return _bind$5;
      }
      const _bind$6 = dowdiness$crdt$parser$$parse_positioned$46$parse_expression$124$405(_env, parser$4);
      let _bind$7;
      if (_bind$6.$tag === 1) {
        const _ok = _bind$6;
        _bind$7 = _ok._0;
      } else {
        return _bind$6;
      }
      const _parser$2 = _bind$7._0;
      const _then_expr = _bind$7._1;
      const _bind$8 = dowdiness$crdt$parser$$expect_positioned(_parser$2, $64$dowdiness$47$crdt$47$parser$46$Token$Else);
      let parser$5;
      if (_bind$8.$tag === 1) {
        const _ok = _bind$8;
        parser$5 = _ok._0;
      } else {
        return _bind$8;
      }
      const _bind$9 = dowdiness$crdt$parser$$parse_positioned$46$parse_expression$124$405(_env, parser$5);
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
      return new Result$Ok$13$({ _0: _parser$3, _1: node$3 });
    }
    case 2: {
      const paren_start = token_info.start;
      const parser$6 = dowdiness$crdt$parser$$advance_positioned(parser);
      const _bind$11 = dowdiness$crdt$parser$$parse_positioned$46$parse_expression$124$405(_env, parser$6);
      let _bind$12;
      if (_bind$11.$tag === 1) {
        const _ok = _bind$11;
        _bind$12 = _ok._0;
      } else {
        return _bind$11;
      }
      const _parser$4 = _bind$12._0;
      const _expr = _bind$12._1;
      const close_info = dowdiness$crdt$parser$$peek_info_positioned(_parser$4);
      const _bind$13 = dowdiness$crdt$parser$$expect_positioned(_parser$4, $64$dowdiness$47$crdt$47$parser$46$Token$RightParen);
      let parser$7;
      if (_bind$13.$tag === 1) {
        const _ok = _bind$13;
        parser$7 = _ok._0;
      } else {
        return _bind$13;
      }
      const node_id$4 = dowdiness$crdt$parser$$next_node_id(parser$7);
      const node$4 = dowdiness$crdt$parser$$TermNode$new(_expr.kind, paren_start, close_info.end, node_id$4, _expr.children);
      return new Result$Ok$13$({ _0: parser$7, _1: node$4 });
    }
    default: {
      return new Result$Err$14$(new Error$dowdiness$47$crdt$47$parser$46$ParseError$46$ParseError({ _0: "Unexpected token", _1: _bind }));
    }
  }
}
function dowdiness$crdt$parser$$parse_positioned(input) {
  const _bind = dowdiness$crdt$parser$$tokenize(input);
  let tokens;
  if (_bind.$tag === 1) {
    const _ok = _bind;
    tokens = _ok._0;
  } else {
    return _bind;
  }
  const parser = dowdiness$crdt$parser$$make_positioned_parser(tokens);
  const _env = { _0: dowdiness$crdt$parser$$parse_positioned$46$constr$47$1786, _1: dowdiness$crdt$parser$$parse_positioned$46$constr$47$1787 };
  const _bind$2 = dowdiness$crdt$parser$$parse_positioned$46$parse_expression$124$405(_env, parser);
  let _bind$3;
  if (_bind$2.$tag === 1) {
    const _ok = _bind$2;
    _bind$3 = _ok._0;
  } else {
    return _bind$2;
  }
  const _final_parser = _bind$3._0;
  const _expr = _bind$3._1;
  const _bind$4 = _final_parser.position < _final_parser.tokens.length ? moonbitlang$core$array$$Array$at$21$(_final_parser.tokens, _final_parser.position).token : $64$dowdiness$47$crdt$47$parser$46$Token$EOF;
  if (_bind$4.$tag === 11) {
    return new Result$Ok$15$(_expr);
  } else {
    return new Result$Err$16$(new Error$dowdiness$47$crdt$47$parser$46$ParseError$46$ParseError({ _0: "Unexpected tokens after expression", _1: _bind$4 }));
  }
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
        moonbitlang$core$array$$Array$push$10$(new_ranges, existing);
      }
      _tmp = _i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  moonbitlang$core$array$$Array$push$10$(new_ranges, merged);
  moonbitlang$core$array$$Array$sort_by_key$36$(new_ranges, (r) => r.start);
  moonbitlang$core$array$$Array$clear$10$(self.damaged_ranges);
  const _len$2 = new_ranges.length;
  let _tmp$2 = 0;
  while (true) {
    const _i = _tmp$2;
    if (_i < _len$2) {
      const r = new_ranges[_i];
      moonbitlang$core$array$$Array$push$10$(self.damaged_ranges, r);
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
  let min_start = moonbitlang$core$array$$Array$at$10$(self.damaged_ranges, 0).start;
  let max_end = moonbitlang$core$array$$Array$at$10$(self.damaged_ranges, 0).end;
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
  if (tree.end <= edit.start) {
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
  return { tokens: tokens, position: 0, node_id_counter: 0, errors: [] };
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
      const _bind = dowdiness$crdt$parser$$parse_positioned(input);
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
    if (_try_err$2.$tag === 2) {
      const _ParseError = _try_err$2;
      const _x = _ParseError._0;
      const _msg = _x._0;
      const _token = _x._1;
      const error_msg = `Parse error: ${_msg} at token ${dowdiness$crdt$parser$$print_token(_token)}`;
      dowdiness$crdt$parser$$RecoveringParser$record_error(parser, error_msg);
      tree = dowdiness$crdt$parser$$TermNode$error(error_msg, 0, 0);
    } else {
      const error_msg = `Unexpected error: ${moonbitlang$core$builtin$$Show$to_string$25$(_try_err$2)}`;
      dowdiness$crdt$parser$$RecoveringParser$record_error(parser, error_msg);
      tree = dowdiness$crdt$parser$$TermNode$error(error_msg, 0, 0);
    }
  }
  return { _0: tree, _1: parser.errors };
}
function dowdiness$crdt$parser$$IncrementalParser$can_potentially_reuse_with_validation(_self, tree, _source, damaged_range) {
  if (tree.children.length === 0) {
    return false;
  }
  let has_undamaged_children = false;
  const _arr = tree.children;
  const _len = _arr.length;
  let _tmp = 0;
  while (true) {
    const _i = _tmp;
    if (_i < _len) {
      const child = _arr[_i];
      if (child.end < damaged_range.start || child.start > damaged_range.end) {
        has_undamaged_children = true;
        break;
      }
      _tmp = _i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return has_undamaged_children;
}
function dowdiness$crdt$parser$$IncrementalParser$collect_reusable_children(_self, children, damaged_range) {
  const reusable = [];
  const _len = children.length;
  let _tmp = 0;
  while (true) {
    const _i = _tmp;
    if (_i < _len) {
      const child = children[_i];
      if (child.end < damaged_range.start || child.start > damaged_range.end) {
        moonbitlang$core$array$$Array$push$3$(reusable, child);
      }
      _tmp = _i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return reusable;
}
function dowdiness$crdt$parser$$extract_substring(source, start, end) {
  if (start < 0 || (end > source.length || start >= end)) {
    return "";
  }
  let result = "";
  let _tmp = start;
  while (true) {
    const i = _tmp;
    if (i < end && i < source.length) {
      $bound_check(source, i);
      const code = source.charCodeAt(i);
      const ch = code;
      result = `${result}${moonbitlang$core$builtin$$Show$to_string$31$(ch)}`;
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return result;
}
function dowdiness$crdt$parser$$kinds_match(kind1, kind2) {
  switch (kind1.$tag) {
    case 0: {
      if (kind2.$tag === 0) {
        return true;
      } else {
        return false;
      }
    }
    case 1: {
      if (kind2.$tag === 1) {
        return true;
      } else {
        return false;
      }
    }
    case 2: {
      if (kind2.$tag === 2) {
        return true;
      } else {
        return false;
      }
    }
    case 3: {
      if (kind2.$tag === 3) {
        return true;
      } else {
        return false;
      }
    }
    case 4: {
      const _Bop = kind1;
      const _op1 = _Bop._0;
      if (kind2.$tag === 4) {
        const _Bop$2 = kind2;
        const _op2 = _Bop$2._0;
        return moonbitlang$core$builtin$$Eq$equal$52$(_op1, _op2);
      } else {
        return false;
      }
    }
    case 5: {
      if (kind2.$tag === 5) {
        return true;
      } else {
        return false;
      }
    }
    default: {
      if (kind2.$tag === 6) {
        return true;
      } else {
        return false;
      }
    }
  }
}
function dowdiness$crdt$parser$$nodes_have_same_structure(node1, node2) {
  if (!dowdiness$crdt$parser$$kinds_match(node1.kind, node2.kind)) {
    return false;
  }
  if (node1.children.length !== node2.children.length) {
    return false;
  }
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < node1.children.length) {
      if (!dowdiness$crdt$parser$$nodes_have_same_structure(moonbitlang$core$array$$Array$at$3$(node1.children, i), moonbitlang$core$array$$Array$at$3$(node2.children, i))) {
        return false;
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return true;
}
function dowdiness$crdt$parser$$IncrementalParser$validate_node_structure(_self, node, source) {
  const node_text = dowdiness$crdt$parser$$extract_substring(source, node.start, node.end);
  const _bind = dowdiness$crdt$parser$$parse_with_error_recovery(node_text);
  const _reparsed = _bind._0;
  return dowdiness$crdt$parser$$nodes_have_same_structure(node, _reparsed);
}
function dowdiness$crdt$parser$$IncrementalParser$try_validated_reuse(self, tree, source, damaged_range) {
  const reusable_children = dowdiness$crdt$parser$$IncrementalParser$collect_reusable_children(self, tree.children, damaged_range);
  if (reusable_children.length === 0) {
    return undefined;
  }
  const _len = reusable_children.length;
  let _tmp = 0;
  while (true) {
    const _i = _tmp;
    if (_i < _len) {
      const child = reusable_children[_i];
      if (!dowdiness$crdt$parser$$IncrementalParser$validate_node_structure(self, child, source)) {
        return undefined;
      }
      _tmp = _i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  if (!dowdiness$crdt$parser$$IncrementalParser$validate_node_structure(self, tree, source)) {
    return undefined;
  }
  return reusable_children.length === tree.children.length ? dowdiness$crdt$parser$$TermNode$new(tree.kind, tree.start, tree.end, tree.node_id, reusable_children) : undefined;
}
function dowdiness$crdt$parser$$IncrementalParser$incremental_reparse(self, source, damaged_range, adjusted_tree) {
  if ((adjusted_tree.end <= damaged_range.start || adjusted_tree.start >= damaged_range.end) && (adjusted_tree.start === 0 && adjusted_tree.end === source.length)) {
    return adjusted_tree;
  }
  if (damaged_range.start >= adjusted_tree.end && damaged_range.start === adjusted_tree.end) {
  }
  if (dowdiness$crdt$parser$$IncrementalParser$can_potentially_reuse_with_validation(self, adjusted_tree, source, damaged_range)) {
    const _bind = dowdiness$crdt$parser$$IncrementalParser$try_validated_reuse(self, adjusted_tree, source, damaged_range);
    if (_bind === undefined) {
    } else {
      const _Some = _bind;
      const _validated_tree = _Some;
      return _validated_tree;
    }
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
  moonbitlang$core$builtin$$Iter$each$33$(moonbitlang$core$hashmap$$HashMap$iter$38$(self.cache), (entry) => {
    const _key = entry._0;
    const _cached = entry._1;
    const node = _cached.node;
    if (node.start < range.end && node.end > range.start) {
      moonbitlang$core$array$$Array$push$30$(keys_to_remove, _key);
      return;
    } else {
      return;
    }
  });
  const _len = keys_to_remove.length;
  let _tmp = 0;
  while (true) {
    const _i = _tmp;
    if (_i < _len) {
      const key = keys_to_remove[_i];
      moonbitlang$core$hashmap$$HashMap$remove$38$(self.cache, key);
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
  return { cache: moonbitlang$core$hashmap$$HashMap$new$46$inner$38$(8), version: 0, max_entries: 500 };
}
function dowdiness$crdt$parser$$IncrementalParser$new(source) {
  return { source: source, tree: undefined, token_cache: dowdiness$crdt$parser$$TokenCache$new(), parse_cache: dowdiness$crdt$parser$$ParseCache$new(), node_id_counter: 0 };
}
function moonbitlang$core$builtin$$Hash$hash$30$(self) {
  let hasher = 0;
  hasher = (Math.imul(hasher, 31) | 0) + self.token_fingerprint | 0;
  hasher = (Math.imul(hasher, 31) | 0) + self.start_token | 0;
  hasher = (Math.imul(hasher, 31) | 0) + self.end_token | 0;
  return hasher;
}
function dowdiness$crdt$parser$$collect_errors$46$collect$124$197(node, acc) {
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
      dowdiness$crdt$parser$$collect_errors$46$collect$124$197(child, acc);
      _tmp = _i + 1 | 0;
      continue;
    } else {
      return;
    }
  }
}
function dowdiness$crdt$parser$$collect_errors(tree) {
  const errors = [];
  dowdiness$crdt$parser$$collect_errors$46$collect$124$197(tree, errors);
  return errors;
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
  if (old_text.length === 0 && new_text.length === 0) {
    const edit = dowdiness$crdt$parser$$Edit$new(0, 0, 0);
    const ast = dowdiness$crdt$parser$$IncrementalParser$edit(self.parser, edit, new_text);
    self.ast = ast;
  } else {
    if (old_text.length === 0) {
      const edit = dowdiness$crdt$parser$$Edit$new(0, 0, new_text.length);
      const ast = dowdiness$crdt$parser$$IncrementalParser$edit(self.parser, edit, new_text);
      self.ast = ast;
    } else {
      const edit = dowdiness$crdt$editor$$compute_edit(old_text, new_text);
      const ast = dowdiness$crdt$parser$$IncrementalParser$edit(self.parser, edit, new_text);
      self.ast = ast;
    }
  }
  self.cached_text = new_text;
  self.parse_dirty = false;
}
function dowdiness$crdt$editor$$ParsedEditor$get_ast(self) {
  if (self.parse_dirty) {
    dowdiness$crdt$editor$$ParsedEditor$reparse(self);
  }
  const _bind = self.ast;
  if (_bind === undefined) {
    return moonbitlang$core$builtin$$abort$3$("No valid parse tree", "@dowdiness/crdt/editor:parsed_editor.mbt:77:13-77:41");
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
      const _bind = moonbitlang$core$array$$Array$at$9$(items_list, items_list.length - 1 | 0);
      const _id = _bind._0;
      return _id;
    } else {
      return -1;
    }
  }
  const _bind = moonbitlang$core$array$$Array$at$9$(items_list, position - 1 | 0);
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
            ch = moonbitlang$core$builtin$$Show$to_string$4$(_tmp$2);
            break _L$2;
          }
          break _L;
        }
        const origin_left = dowdiness$crdt$editor$$Document$position_to_lv(self, current_pos);
        const items_list = dowdiness$crdt$fugue$$FugueTree$get_visible_items(self.tree);
        let origin_right;
        if (current_pos === 0) {
          if (items_list.length > 0) {
            const _bind = moonbitlang$core$array$$Array$at$9$(items_list, 0);
            origin_right = _bind._0;
          } else {
            origin_right = -1;
          }
        } else {
          if (current_pos < items_list.length) {
            const _bind = moonbitlang$core$array$$Array$at$9$(items_list, current_pos);
            origin_right = _bind._0;
          } else {
            origin_right = -1;
          }
        }
        const op = dowdiness$crdt$oplog$$OpLog$insert(self.oplog, ch, origin_left, origin_right);
        const _bind = dowdiness$crdt$causal_graph$$CausalGraph$get_entry(self.oplog.graph, op.lv);
        let _bind$2;
        if (_bind === undefined) {
          _bind$2 = dowdiness$crdt$editor$$insert$46$tuple$47$2028;
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
  return { editor: editor, parser: parser, ast: undefined, parse_dirty: true, cached_text: "" };
}
function dowdiness$crdt$editor$$Document$delete(self, position) {
  if (position < 0) {
    return undefined;
  }
  const items_list = dowdiness$crdt$fugue$$FugueTree$get_visible_items(self.tree);
  if (position >= items_list.length) {
    return undefined;
  }
  const _bind = moonbitlang$core$array$$Array$at$9$(items_list, position);
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
function dowdiness$crdt$$escape_json(s) {
  let result = "";
  const length = s.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < length) {
      $bound_check(s, i);
      const code = s.charCodeAt(i);
      const c = code;
      switch (c) {
        case 34: {
          result = `${result}\\\"`;
          break;
        }
        case 92: {
          result = `${result}\\\\`;
          break;
        }
        case 10: {
          result = `${result}\\n`;
          break;
        }
        case 13: {
          result = `${result}\\r`;
          break;
        }
        case 9: {
          result = `${result}\\t`;
          break;
        }
        default: {
          result = `${result}${moonbitlang$core$builtin$$Show$to_string$31$(c)}`;
        }
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return result;
}
function dowdiness$crdt$$serialize_errors(errors) {
  let result = "[";
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < errors.length) {
      if (i > 0) {
        result = `${result},`;
      }
      result = `${result}\"${dowdiness$crdt$$escape_json(moonbitlang$core$array$$Array$at$19$(errors, i))}\"`;
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return `${result}]`;
}
function dowdiness$crdt$$serialize_op_content(content) {
  if (content.$tag === 0) {
    const _Insert = content;
    const _text = _Insert._0;
    return `{\"Insert\":\"${dowdiness$crdt$$escape_json(_text)}\"}`;
  } else {
    return "{\"Delete\":null}";
  }
}
function dowdiness$crdt$$serialize_int_array(arr) {
  let result = "[";
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < arr.length) {
      if (i > 0) {
        result = `${result},`;
      }
      result = `${result}${moonbitlang$core$int$$Int$to_string$46$inner(moonbitlang$core$array$$Array$at$18$(arr, i), 10)}`;
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return `${result}]`;
}
function dowdiness$crdt$$serialize_op(op) {
  const parents = dowdiness$crdt$$serialize_int_array(op.parents);
  const agent = `\"${dowdiness$crdt$$escape_json(op.agent)}\"`;
  const content = dowdiness$crdt$$serialize_op_content(op.content);
  return `{\"lv\":${moonbitlang$core$int$$Int$to_string$46$inner(op.lv, 10)},\"parents\":${parents},\"agent\":${agent},\"seq\":${moonbitlang$core$int$$Int$to_string$46$inner(op.seq, 10)},\"content\":${content},\"origin_left\":${moonbitlang$core$int$$Int$to_string$46$inner(op.origin_left, 10)},\"origin_right\":${moonbitlang$core$int$$Int$to_string$46$inner(op.origin_right, 10)}}`;
}
function dowdiness$crdt$$serialize_ops(ops) {
  let result = "[";
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < ops.length) {
      if (i > 0) {
        result = `${result},`;
      }
      result = `${result}${dowdiness$crdt$$serialize_op(moonbitlang$core$array$$Array$at$20$(ops, i))}`;
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return `${result}]`;
}
function dowdiness$crdt$$serialize_term_kind(kind) {
  switch (kind.$tag) {
    case 0: {
      const _Int = kind;
      const _n = _Int._0;
      return `{\"tag\":\"Int\",\"value\":${moonbitlang$core$int$$Int$to_string$46$inner(_n, 10)}}`;
    }
    case 1: {
      const _Var = kind;
      const _name = _Var._0;
      return `{\"tag\":\"Var\",\"value\":\"${dowdiness$crdt$$escape_json(_name)}\"}`;
    }
    case 2: {
      const _Lam = kind;
      const _param = _Lam._0;
      return `{\"tag\":\"Lam\",\"value\":\"${dowdiness$crdt$$escape_json(_param)}\"}`;
    }
    case 3: {
      return "{\"tag\":\"App\"}";
    }
    case 4: {
      const _Bop = kind;
      const _op = _Bop._0;
      let op_str;
      if (_op === 0) {
        op_str = "Plus";
      } else {
        op_str = "Minus";
      }
      return `{\"tag\":\"Bop\",\"value\":\"${op_str}\"}`;
    }
    case 5: {
      return "{\"tag\":\"If\"}";
    }
    default: {
      const _Error = kind;
      const _msg = _Error._0;
      return `{\"tag\":\"Error\",\"value\":\"${dowdiness$crdt$$escape_json(_msg)}\"}`;
    }
  }
}
function dowdiness$crdt$$serialize_ast(node) {
  const kind = dowdiness$crdt$$serialize_term_kind(node.kind);
  const children = dowdiness$crdt$$serialize_ast_array(node.children);
  return `{\"kind\":${kind},\"start\":${moonbitlang$core$int$$Int$to_string$46$inner(node.start, 10)},\"end\":${moonbitlang$core$int$$Int$to_string$46$inner(node.end, 10)},\"node_id\":${moonbitlang$core$int$$Int$to_string$46$inner(node.node_id, 10)},\"children\":${children}}`;
}
function dowdiness$crdt$$serialize_ast_array(nodes) {
  let result = "[";
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < nodes.length) {
      if (i > 0) {
        result = `${result},`;
      }
      result = `${result}${dowdiness$crdt$$serialize_ast(moonbitlang$core$array$$Array$at$3$(nodes, i))}`;
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return `${result}]`;
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
    const ast = dowdiness$crdt$editor$$ParsedEditor$get_ast(_ed);
    return dowdiness$crdt$$serialize_ast(ast);
  }
}
function dowdiness$crdt$$get_errors_json(_handle) {
  const _bind = dowdiness$crdt$$editor.val;
  if (_bind === undefined) {
    return "[]";
  } else {
    const _Some = _bind;
    const _ed = _Some;
    const ast = dowdiness$crdt$editor$$ParsedEditor$get_ast(_ed);
    const errors = dowdiness$crdt$parser$$collect_errors(ast);
    return dowdiness$crdt$$serialize_errors(errors);
  }
}
function dowdiness$crdt$$get_operations_json(_handle) {
  const _bind = dowdiness$crdt$$editor.val;
  if (_bind === undefined) {
    return "[]";
  } else {
    const _Some = _bind;
    const _editor = _Some;
    const ops = dowdiness$crdt$editor$$ParsedEditor$get_operations(_editor);
    return dowdiness$crdt$$serialize_ops(ops);
  }
}
function dowdiness$crdt$$get_frontier_json(_handle) {
  const _bind = dowdiness$crdt$$editor.val;
  if (_bind === undefined) {
    return "[]";
  } else {
    const _Some = _bind;
    const _editor = _Some;
    const frontier = dowdiness$crdt$editor$$ParsedEditor$get_frontier(_editor);
    let result = "[";
    let _tmp = 0;
    while (true) {
      const i = _tmp;
      if (i < frontier.length) {
        if (i > 0) {
          result = `${result},`;
        }
        result = `${result}${moonbitlang$core$int$$Int$to_string$46$inner(moonbitlang$core$array$$Array$at$18$(frontier, i), 10)}`;
        _tmp = i + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    return `${result}]`;
  }
}
function dowdiness$crdt$$merge_operations(_handle, _ops_json, _frontier_json) {}
export { dowdiness$crdt$$create_editor as create_editor, dowdiness$crdt$$insert as insert, dowdiness$crdt$$delete_ as delete_, dowdiness$crdt$$backspace as backspace, dowdiness$crdt$$get_text as get_text, dowdiness$crdt$$set_text as set_text, dowdiness$crdt$$get_cursor as get_cursor, dowdiness$crdt$$set_cursor as set_cursor, dowdiness$crdt$$get_ast_json as get_ast_json, dowdiness$crdt$$get_errors_json as get_errors_json, dowdiness$crdt$$get_operations_json as get_operations_json, dowdiness$crdt$$get_frontier_json as get_frontier_json, dowdiness$crdt$$merge_operations as merge_operations }
