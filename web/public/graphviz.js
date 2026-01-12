const $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$Strict = { $tag: 0 };
const $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$Graph = { $tag: 1 };
const $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$Digraph = { $tag: 2 };
const $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$Node = { $tag: 3 };
const $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$Edge = { $tag: 4 };
const $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$Subgraph = { $tag: 5 };
function $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$ID(param0) {
  this._0 = param0;
}
$64$antisatori$47$graphviz$47$lib$47$parser$46$Token$ID.prototype.$tag = 6;
const $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$LeftBrace = { $tag: 7 };
const $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$RightBrace = { $tag: 8 };
const $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$LeftBracket = { $tag: 9 };
const $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$RightBracket = { $tag: 10 };
const $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$Colon = { $tag: 11 };
const $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$Semicolon = { $tag: 12 };
const $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$Comma = { $tag: 13 };
const $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$Equals = { $tag: 14 };
const $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$Arrow = { $tag: 15 };
const $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$Line = { $tag: 16 };
function $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$CompassPt(param0) {
  this._0 = param0;
}
$64$antisatori$47$graphviz$47$lib$47$parser$46$Token$CompassPt.prototype.$tag = 17;
const $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$EOF = { $tag: 18 };
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
const Error$moonbitlang$47$core$47$builtin$46$CreatingViewError$46$IndexOutOfBounds = { $tag: 1 };
const Error$moonbitlang$47$core$47$builtin$46$CreatingViewError$46$InvalidIndex = { $tag: 0 };
function $make_array_len_and_init(a, b) {
  const arr = new Array(a);
  arr.fill(b);
  return arr;
}
const moonbitlang$core$builtin$$JSArray$push = (arr, val) => { arr.push(val); };
const Option$None$1$ = { $tag: 0 };
function Option$Some$1$(param0) {
  this._0 = param0;
}
Option$Some$1$.prototype.$tag = 1;
const moonbitlang$core$builtin$$JSArray$set_length = (arr, len) => { arr.length = len; };
const moonbitlang$core$builtin$$JSArray$pop = (arr) => arr.pop();
const moonbitlang$core$double$internal$ryu$$ryu_to_string = (number) => number.toString();
const Option$None$2$ = { $tag: 0 };
function Option$Some$2$(param0) {
  this._0 = param0;
}
Option$Some$2$.prototype.$tag = 1;
function $64$antisatori$47$graphviz$47$lib$47$parser$46$Statement$NodeStmt(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
$64$antisatori$47$graphviz$47$lib$47$parser$46$Statement$NodeStmt.prototype.$tag = 0;
function $64$antisatori$47$graphviz$47$lib$47$parser$46$Statement$EdgeStmt(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
$64$antisatori$47$graphviz$47$lib$47$parser$46$Statement$EdgeStmt.prototype.$tag = 1;
function $64$antisatori$47$graphviz$47$lib$47$parser$46$Statement$AttrStmt(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
$64$antisatori$47$graphviz$47$lib$47$parser$46$Statement$AttrStmt.prototype.$tag = 2;
function $64$antisatori$47$graphviz$47$lib$47$parser$46$Statement$Assignment(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
$64$antisatori$47$graphviz$47$lib$47$parser$46$Statement$Assignment.prototype.$tag = 3;
function $64$antisatori$47$graphviz$47$lib$47$parser$46$Statement$Subgraph(param0) {
  this._0 = param0;
}
$64$antisatori$47$graphviz$47$lib$47$parser$46$Statement$Subgraph.prototype.$tag = 4;
const $$$64$moonbitlang$47$core$47$builtin$46$StringBuilder$36$as$36$64$moonbitlang$47$core$47$builtin$46$Logger = { method_0: moonbitlang$core$builtin$$Logger$write_string$0$, method_1: moonbitlang$core$builtin$$Logger$write_substring$1$, method_2: moonbitlang$core$builtin$$Logger$write_view$0$, method_3: moonbitlang$core$builtin$$Logger$write_char$0$ };
const moonbitlang$core$builtin$$boyer_moore_horspool_find$46$constr$47$218 = 0;
const moonbitlang$core$builtin$$brute_force_find$46$constr$47$232 = 0;
const antisatori$graphviz$lib$parser$$skip_comment$46$constr$47$776 = 47;
const antisatori$graphviz$lib$parser$$next_token$46$constr$47$825 = new $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$ID("-");
const antisatori$graphviz$lib$parser$$parse_port$46$constr$47$851 = new $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$ID("");
const antisatori$graphviz$lib$parser$$parse_port$46$constr$47$852 = new $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$ID("");
const antisatori$graphviz$lib$parser$$parse_port$46$constr$47$853 = new $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$ID("");
const antisatori$graphviz$lib$parser$$parse_node_id$46$constr$47$862 = new $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$ID("");
const antisatori$graphviz$lib$parser$$parse_attribute$46$constr$47$868 = new $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$ID("");
const antisatori$graphviz$lib$parser$$parse_attribute$46$constr$47$869 = new $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$ID("");
const antisatori$graphviz$lib$parser$$parse_statement$46$constr$47$900 = new $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$ID("");
const antisatori$graphviz$lib$parser$$parse_subgraph$46$constr$47$927 = new $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$ID("");
const antisatori$graphviz$lib$parser$$parse_graph$46$constr$47$945 = new $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$ID("");
const antisatori$graphviz$lib$layout$$compact$46$record$47$1281 = { node_width: 50, node_height: 28, layer_spacing: 50, node_spacing: 35, edge_spacing: 10 };
const antisatori$graphviz$lib$svg$$escape_xml$46$42$bind$124$73 = "&";
const antisatori$graphviz$lib$svg$$escape_xml$46$42$bind$124$74 = "&amp;";
const antisatori$graphviz$lib$svg$$escape_xml$46$42$bind$124$75 = "<";
const antisatori$graphviz$lib$svg$$escape_xml$46$42$bind$124$76 = "&lt;";
const antisatori$graphviz$lib$svg$$escape_xml$46$42$bind$124$77 = ">";
const antisatori$graphviz$lib$svg$$escape_xml$46$42$bind$124$78 = "&gt;";
const antisatori$graphviz$lib$svg$$escape_xml$46$42$bind$124$79 = "\"";
const antisatori$graphviz$lib$svg$$escape_xml$46$42$bind$124$80 = "&quot;";
const antisatori$graphviz$lib$svg$$escape_xml$46$42$bind$124$81 = "'";
const antisatori$graphviz$lib$svg$$escape_xml$46$42$bind$124$82 = "&apos;";
const antisatori$graphviz$lib$svg$$dark_theme$46$record$47$1282 = { padding: 20, node_stroke: "#3c3c3c", node_fill: "#252526", node_stroke_width: 2, edge_stroke: "#858585", edge_stroke_width: 1.5, text_color: "#d4d4d4", font_size: 14, font_family: "Arial, sans-serif" };
const moonbitlang$core$builtin$$seed = moonbitlang$core$builtin$$random_seed();
function moonbitlang$core$abort$$abort$2$(msg) {
  return $panic();
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
function moonbitlang$core$builtin$$abort$2$(string, loc) {
  return moonbitlang$core$abort$$abort$2$(`${string}\n  at ${moonbitlang$core$builtin$$Show$to_string$3$(loc)}\n`);
}
function moonbitlang$core$array$$FixedArray$unsafe_blit$4$(dst, dst_offset, src, src_offset, len) {
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
function moonbitlang$core$builtin$$UninitializedArray$unsafe_blit$5$(dst, dst_offset, src, src_offset, len) {
  moonbitlang$core$array$$FixedArray$unsafe_blit$4$(dst, dst_offset, src, src_offset, len);
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
function moonbitlang$core$array$$Array$at$6$(self, index) {
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
function moonbitlang$core$array$$Array$at$8$(self, index) {
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
function moonbitlang$core$builtin$$Hasher$combine$8$(self, value) {
  moonbitlang$core$builtin$$Hash$hash_combine$8$(value, self);
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
function moonbitlang$core$builtin$$Hash$hash$10$(self) {
  const _self = moonbitlang$core$builtin$$Hasher$new(undefined);
  moonbitlang$core$builtin$$Hasher$combine$8$(_self, self);
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
function moonbitlang$core$builtin$$Show$to_string$3$(self) {
  const logger = moonbitlang$core$builtin$$StringBuilder$new$46$inner(0);
  moonbitlang$core$builtin$$Show$output$11$(self, { self: logger, method_table: $$$64$moonbitlang$47$core$47$builtin$46$StringBuilder$36$as$36$64$moonbitlang$47$core$47$builtin$46$Logger });
  return logger.val;
}
function moonbitlang$core$builtin$$Show$to_string$2$(self) {
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
function moonbitlang$core$string$$String$view$46$inner(self, start_offset, end_offset) {
  let end_offset$2;
  if (end_offset === undefined) {
    end_offset$2 = self.length;
  } else {
    const _Some = end_offset;
    end_offset$2 = _Some;
  }
  return start_offset >= 0 && (start_offset <= end_offset$2 && end_offset$2 <= self.length) ? { str: self, start: start_offset, end: end_offset$2 } : moonbitlang$core$builtin$$abort$2$("Invalid index for View", "@moonbitlang/core/builtin:stringview.mbt:382:5-382:36");
}
function moonbitlang$core$builtin$$StringBuilder$write_iter(self, iter) {
  while (true) {
    const _bind = moonbitlang$core$builtin$$Iter$next$12$(iter);
    if (_bind === -1) {
      return;
    } else {
      const _Some = _bind;
      const _ch = _Some;
      moonbitlang$core$builtin$$Logger$write_char$0$(self, _ch);
      continue;
    }
  }
}
function moonbitlang$core$builtin$$Logger$write_view$0$(self, str) {
  const _bind = self;
  _bind.val = `${_bind.val}${moonbitlang$core$builtin$$Show$to_string$2$(str)}`;
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
    return moonbitlang$core$builtin$$boyer_moore_horspool_find$46$constr$47$218;
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
    return moonbitlang$core$builtin$$brute_force_find$46$constr$47$232;
  }
}
function moonbitlang$core$string$$StringView$find(self, str) {
  return (str.end - str.start | 0) <= 4 ? moonbitlang$core$builtin$$brute_force_find(self, str) : moonbitlang$core$builtin$$boyer_moore_horspool_find(self, str);
}
function moonbitlang$core$string$$String$find(self, str) {
  return moonbitlang$core$string$$StringView$find({ str: self, start: 0, end: self.length }, str);
}
function moonbitlang$core$array$$Array$push$8$(self, value) {
  moonbitlang$core$builtin$$JSArray$push(self, value);
}
function moonbitlang$core$array$$Array$push$6$(self, value) {
  moonbitlang$core$builtin$$JSArray$push(self, value);
}
function moonbitlang$core$array$$Array$push$13$(self, value) {
  moonbitlang$core$builtin$$JSArray$push(self, value);
}
function moonbitlang$core$array$$Array$push$14$(self, value) {
  moonbitlang$core$builtin$$JSArray$push(self, value);
}
function moonbitlang$core$array$$Array$push$15$(self, value) {
  moonbitlang$core$builtin$$JSArray$push(self, value);
}
function moonbitlang$core$array$$Array$push$16$(self, value) {
  moonbitlang$core$builtin$$JSArray$push(self, value);
}
function moonbitlang$core$array$$Array$push$7$(self, value) {
  moonbitlang$core$builtin$$JSArray$push(self, value);
}
function moonbitlang$core$array$$Array$push$9$(self, value) {
  moonbitlang$core$builtin$$JSArray$push(self, value);
}
function moonbitlang$core$array$$Array$push$17$(self, value) {
  moonbitlang$core$builtin$$JSArray$push(self, value);
}
function moonbitlang$core$array$$Array$push$5$(self, value) {
  moonbitlang$core$builtin$$JSArray$push(self, value);
}
function moonbitlang$core$builtin$$Iter$next$12$(self) {
  const _func = self;
  return _func();
}
function moonbitlang$core$builtin$$Show$to_string$12$(self) {
  return String.fromCodePoint(self);
}
function moonbitlang$core$string$$String$replace(self, old, new_) {
  const _bind = moonbitlang$core$string$$String$find(self, old);
  if (_bind === undefined) {
    return self;
  } else {
    const _Some = _bind;
    const _end = _Some;
    const _self = moonbitlang$core$builtin$$StringBuilder$new$46$inner(0);
    moonbitlang$core$builtin$$StringBuilder$write_iter(_self, moonbitlang$core$string$$StringView$iter(moonbitlang$core$string$$String$view$46$inner(self, 0, _end)));
    moonbitlang$core$builtin$$StringBuilder$write_iter(_self, moonbitlang$core$string$$StringView$iter(new_));
    moonbitlang$core$builtin$$StringBuilder$write_iter(_self, moonbitlang$core$string$$StringView$iter(moonbitlang$core$string$$String$view$46$inner(self, _end + (old.end - old.start | 0) | 0, undefined)));
    const _p = _self;
    return _p.val;
  }
}
function moonbitlang$core$option$$Option$unwrap_or$18$(self, default_) {
  if (self.$tag === 0) {
    return default_;
  } else {
    const _Some = self;
    return _Some._0;
  }
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
function moonbitlang$core$builtin$$Map$new$46$inner$19$(capacity) {
  const capacity$2 = moonbitlang$core$int$$Int$next_power_of_two(capacity);
  const _bind = capacity$2 - 1 | 0;
  const _bind$2 = (Math.imul(capacity$2, 13) | 0) / 16 | 0;
  const _bind$3 = $make_array_len_and_init(capacity$2, undefined);
  const _bind$4 = undefined;
  return { entries: _bind$3, size: 0, capacity: capacity$2, capacity_mask: _bind, grow_at: _bind$2, head: _bind$4, tail: -1 };
}
function moonbitlang$core$builtin$$Map$new$46$inner$20$(capacity) {
  const capacity$2 = moonbitlang$core$int$$Int$next_power_of_two(capacity);
  const _bind = capacity$2 - 1 | 0;
  const _bind$2 = (Math.imul(capacity$2, 13) | 0) / 16 | 0;
  const _bind$3 = $make_array_len_and_init(capacity$2, undefined);
  const _bind$4 = undefined;
  return { entries: _bind$3, size: 0, capacity: capacity$2, capacity_mask: _bind, grow_at: _bind$2, head: _bind$4, tail: -1 };
}
function moonbitlang$core$builtin$$Map$new$46$inner$21$(capacity) {
  const capacity$2 = moonbitlang$core$int$$Int$next_power_of_two(capacity);
  const _bind = capacity$2 - 1 | 0;
  const _bind$2 = (Math.imul(capacity$2, 13) | 0) / 16 | 0;
  const _bind$3 = $make_array_len_and_init(capacity$2, undefined);
  const _bind$4 = undefined;
  return { entries: _bind$3, size: 0, capacity: capacity$2, capacity_mask: _bind, grow_at: _bind$2, head: _bind$4, tail: -1 };
}
function moonbitlang$core$builtin$$Map$new$46$inner$22$(capacity) {
  const capacity$2 = moonbitlang$core$int$$Int$next_power_of_two(capacity);
  const _bind = capacity$2 - 1 | 0;
  const _bind$2 = (Math.imul(capacity$2, 13) | 0) / 16 | 0;
  const _bind$3 = $make_array_len_and_init(capacity$2, undefined);
  const _bind$4 = undefined;
  return { entries: _bind$3, size: 0, capacity: capacity$2, capacity_mask: _bind, grow_at: _bind$2, head: _bind$4, tail: -1 };
}
function moonbitlang$core$builtin$$Map$new$46$inner$23$(capacity) {
  const capacity$2 = moonbitlang$core$int$$Int$next_power_of_two(capacity);
  const _bind = capacity$2 - 1 | 0;
  const _bind$2 = (Math.imul(capacity$2, 13) | 0) / 16 | 0;
  const _bind$3 = $make_array_len_and_init(capacity$2, undefined);
  const _bind$4 = undefined;
  return { entries: _bind$3, size: 0, capacity: capacity$2, capacity_mask: _bind, grow_at: _bind$2, head: _bind$4, tail: -1 };
}
function moonbitlang$core$builtin$$Map$add_entry_to_tail$19$(self, idx, entry) {
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
function moonbitlang$core$builtin$$Map$add_entry_to_tail$20$(self, idx, entry) {
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
function moonbitlang$core$builtin$$Map$add_entry_to_tail$21$(self, idx, entry) {
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
function moonbitlang$core$builtin$$Map$add_entry_to_tail$22$(self, idx, entry) {
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
function moonbitlang$core$builtin$$Map$add_entry_to_tail$23$(self, idx, entry) {
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
function moonbitlang$core$builtin$$Map$set_entry$19$(self, entry, new_idx) {
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
function moonbitlang$core$builtin$$Map$set_entry$20$(self, entry, new_idx) {
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
function moonbitlang$core$builtin$$Map$set_entry$21$(self, entry, new_idx) {
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
function moonbitlang$core$builtin$$Map$set_entry$22$(self, entry, new_idx) {
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
function moonbitlang$core$builtin$$Map$set_entry$23$(self, entry, new_idx) {
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
function moonbitlang$core$builtin$$Map$push_away$19$(self, idx, entry) {
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
      moonbitlang$core$builtin$$Map$set_entry$19$(self, entry$2, idx$2);
      break;
    } else {
      const _Some = _bind;
      const _curr_entry = _Some;
      if (psl > _curr_entry.psl) {
        entry$2.psl = psl;
        moonbitlang$core$builtin$$Map$set_entry$19$(self, entry$2, idx$2);
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
function moonbitlang$core$builtin$$Map$push_away$20$(self, idx, entry) {
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
      moonbitlang$core$builtin$$Map$set_entry$20$(self, entry$2, idx$2);
      break;
    } else {
      const _Some = _bind;
      const _curr_entry = _Some;
      if (psl > _curr_entry.psl) {
        entry$2.psl = psl;
        moonbitlang$core$builtin$$Map$set_entry$20$(self, entry$2, idx$2);
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
function moonbitlang$core$builtin$$Map$push_away$21$(self, idx, entry) {
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
      moonbitlang$core$builtin$$Map$set_entry$21$(self, entry$2, idx$2);
      break;
    } else {
      const _Some = _bind;
      const _curr_entry = _Some;
      if (psl > _curr_entry.psl) {
        entry$2.psl = psl;
        moonbitlang$core$builtin$$Map$set_entry$21$(self, entry$2, idx$2);
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
function moonbitlang$core$builtin$$Map$push_away$22$(self, idx, entry) {
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
      moonbitlang$core$builtin$$Map$set_entry$22$(self, entry$2, idx$2);
      break;
    } else {
      const _Some = _bind;
      const _curr_entry = _Some;
      if (psl > _curr_entry.psl) {
        entry$2.psl = psl;
        moonbitlang$core$builtin$$Map$set_entry$22$(self, entry$2, idx$2);
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
function moonbitlang$core$builtin$$Map$push_away$23$(self, idx, entry) {
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
      moonbitlang$core$builtin$$Map$set_entry$23$(self, entry$2, idx$2);
      break;
    } else {
      const _Some = _bind;
      const _curr_entry = _Some;
      if (psl > _curr_entry.psl) {
        entry$2.psl = psl;
        moonbitlang$core$builtin$$Map$set_entry$23$(self, entry$2, idx$2);
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
function moonbitlang$core$builtin$$Map$set_with_hash$19$(self, key, value, hash) {
  if (self.size >= self.grow_at) {
    moonbitlang$core$builtin$$Map$grow$19$(self);
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
        moonbitlang$core$builtin$$Map$push_away$19$(self, idx, _curr_entry);
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
  moonbitlang$core$builtin$$Map$add_entry_to_tail$19$(self, _idx, entry);
}
function moonbitlang$core$builtin$$Map$set_with_hash$20$(self, key, value, hash) {
  if (self.size >= self.grow_at) {
    moonbitlang$core$builtin$$Map$grow$20$(self);
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
        moonbitlang$core$builtin$$Map$push_away$20$(self, idx, _curr_entry);
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
  moonbitlang$core$builtin$$Map$add_entry_to_tail$20$(self, _idx, entry);
}
function moonbitlang$core$builtin$$Map$set_with_hash$21$(self, key, value, hash) {
  if (self.size >= self.grow_at) {
    moonbitlang$core$builtin$$Map$grow$21$(self);
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
        moonbitlang$core$builtin$$Map$push_away$21$(self, idx, _curr_entry);
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
  moonbitlang$core$builtin$$Map$add_entry_to_tail$21$(self, _idx, entry);
}
function moonbitlang$core$builtin$$Map$set_with_hash$22$(self, key, value, hash) {
  if (self.size >= self.grow_at) {
    moonbitlang$core$builtin$$Map$grow$22$(self);
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
        moonbitlang$core$builtin$$Map$push_away$22$(self, idx, _curr_entry);
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
  moonbitlang$core$builtin$$Map$add_entry_to_tail$22$(self, _idx, entry);
}
function moonbitlang$core$builtin$$Map$set_with_hash$23$(self, key, value, hash) {
  if (self.size >= self.grow_at) {
    moonbitlang$core$builtin$$Map$grow$23$(self);
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
        moonbitlang$core$builtin$$Map$push_away$23$(self, idx, _curr_entry);
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
  moonbitlang$core$builtin$$Map$add_entry_to_tail$23$(self, _idx, entry);
}
function moonbitlang$core$builtin$$Map$grow$19$(self) {
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
      moonbitlang$core$builtin$$Map$set_with_hash$19$(self, _key, _value, _hash);
      _tmp = _next;
      continue;
    }
  }
}
function moonbitlang$core$builtin$$Map$grow$20$(self) {
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
      moonbitlang$core$builtin$$Map$set_with_hash$20$(self, _key, _value, _hash);
      _tmp = _next;
      continue;
    }
  }
}
function moonbitlang$core$builtin$$Map$grow$21$(self) {
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
      moonbitlang$core$builtin$$Map$set_with_hash$21$(self, _key, _value, _hash);
      _tmp = _next;
      continue;
    }
  }
}
function moonbitlang$core$builtin$$Map$grow$22$(self) {
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
      moonbitlang$core$builtin$$Map$set_with_hash$22$(self, _key, _value, _hash);
      _tmp = _next;
      continue;
    }
  }
}
function moonbitlang$core$builtin$$Map$grow$23$(self) {
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
      moonbitlang$core$builtin$$Map$set_with_hash$23$(self, _key, _value, _hash);
      _tmp = _next;
      continue;
    }
  }
}
function moonbitlang$core$builtin$$Map$set$19$(self, key, value) {
  moonbitlang$core$builtin$$Map$set_with_hash$19$(self, key, value, moonbitlang$core$builtin$$Hash$hash$10$(key));
}
function moonbitlang$core$builtin$$Map$set$20$(self, key, value) {
  moonbitlang$core$builtin$$Map$set_with_hash$20$(self, key, value, moonbitlang$core$builtin$$Hash$hash$10$(key));
}
function moonbitlang$core$builtin$$Map$set$21$(self, key, value) {
  moonbitlang$core$builtin$$Map$set_with_hash$21$(self, key, value, moonbitlang$core$builtin$$Hash$hash$10$(key));
}
function moonbitlang$core$builtin$$Map$set$22$(self, key, value) {
  moonbitlang$core$builtin$$Map$set_with_hash$22$(self, key, value, moonbitlang$core$builtin$$Hash$hash$10$(key));
}
function moonbitlang$core$builtin$$Map$set$23$(self, key, value) {
  moonbitlang$core$builtin$$Map$set_with_hash$23$(self, key, value, moonbitlang$core$builtin$$Hash$hash$10$(key));
}
function moonbitlang$core$builtin$$Map$get$21$(self, key) {
  const hash = moonbitlang$core$builtin$$Hash$hash$10$(key);
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
function moonbitlang$core$builtin$$Map$get$19$(self, key) {
  const hash = moonbitlang$core$builtin$$Hash$hash$10$(key);
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const i = _tmp;
    const idx = _tmp$2;
    const _tmp$3 = self.entries;
    $bound_check(_tmp$3, idx);
    const _bind = _tmp$3[idx];
    if (_bind === undefined) {
      return -1;
    } else {
      const _Some = _bind;
      const _entry = _Some;
      if (_entry.hash === hash && _entry.key === key) {
        return _entry.value;
      }
      if (i > _entry.psl) {
        return -1;
      }
      _tmp = i + 1 | 0;
      _tmp$2 = idx + 1 & self.capacity_mask;
      continue;
    }
  }
}
function moonbitlang$core$builtin$$Map$get$20$(self, key) {
  const hash = moonbitlang$core$builtin$$Hash$hash$10$(key);
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
function moonbitlang$core$builtin$$Map$get$22$(self, key) {
  const hash = moonbitlang$core$builtin$$Hash$hash$10$(key);
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
function moonbitlang$core$builtin$$Map$get$23$(self, key) {
  const hash = moonbitlang$core$builtin$$Hash$hash$10$(key);
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const i = _tmp;
    const idx = _tmp$2;
    const _tmp$3 = self.entries;
    $bound_check(_tmp$3, idx);
    const _bind = _tmp$3[idx];
    if (_bind === undefined) {
      return Option$None$1$;
    } else {
      const _Some = _bind;
      const _entry = _Some;
      if (_entry.hash === hash && _entry.key === key) {
        return new Option$Some$1$(_entry.value);
      }
      if (i > _entry.psl) {
        return Option$None$1$;
      }
      _tmp = i + 1 | 0;
      _tmp$2 = idx + 1 & self.capacity_mask;
      continue;
    }
  }
}
function moonbitlang$core$builtin$$Map$contains$21$(self, key) {
  const hash = moonbitlang$core$builtin$$Hash$hash$10$(key);
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const i = _tmp;
    const idx = _tmp$2;
    const _tmp$3 = self.entries;
    $bound_check(_tmp$3, idx);
    const _bind = _tmp$3[idx];
    if (_bind === undefined) {
      return false;
    } else {
      const _Some = _bind;
      const _entry = _Some;
      if (_entry.hash === hash && _entry.key === key) {
        return true;
      }
      if (i > _entry.psl) {
        return false;
      }
      _tmp = i + 1 | 0;
      _tmp$2 = idx + 1 & self.capacity_mask;
      continue;
    }
  }
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
function moonbitlang$core$builtin$$Hash$hash_combine$8$(self, hasher) {
  moonbitlang$core$builtin$$Hasher$combine_string(hasher, self);
}
function moonbitlang$core$char$$Char$is_ascii_alphabetic(self) {
  return self >= 65 && self <= 90 ? true : self >= 97 && self <= 122;
}
function moonbitlang$core$char$$Char$is_numeric(self) {
  return self >= 48 && self <= 57 ? true : self === 178 ? true : self === 179 ? true : self === 185 ? true : self === 188 ? true : self === 189 ? true : self === 190 ? true : self >= 1632 && self <= 1641 ? true : self >= 1776 && self <= 1785 ? true : self >= 1984 && self <= 2041 ? true : self >= 2406 && self <= 2415 ? true : self >= 2534 && self <= 2543 ? true : self >= 2548 && self <= 2553 ? true : self >= 2662 && self <= 2671 ? true : self >= 2790 && self <= 2799 ? true : self >= 2918 && self <= 2927 ? true : self >= 2930 && self <= 2935 ? true : self >= 3046 && self <= 3055 ? true : self >= 3056 && self <= 3058 ? true : self >= 3174 && self <= 3183 ? true : self >= 3192 && self <= 3198 ? true : self >= 3302 && self <= 3311 ? true : self >= 3416 && self <= 3422 ? true : self >= 3430 && self <= 3439 ? true : self >= 3440 && self <= 3448 ? true : self >= 3558 && self <= 3567 ? true : self >= 3664 && self <= 3673 ? true : self >= 3792 && self <= 3801 ? true : self >= 3872 && self <= 3891 ? true : self >= 4160 && self <= 4169 ? true : self >= 4240 && self <= 4249 ? true : self >= 4969 && self <= 4988 ? true : self >= 5870 && self <= 5872 ? true : self >= 6112 && self <= 6121 ? true : self >= 6128 && self <= 6137 ? true : self >= 6160 && self <= 6169 ? true : self >= 6470 && self <= 6479 ? true : self >= 6608 && self <= 6618 ? true : self >= 6784 && self <= 6793 ? true : self >= 6800 && self <= 6809 ? true : self >= 6992 && self <= 7001 ? true : self >= 7088 && self <= 7097 ? true : self >= 7232 && self <= 7241 ? true : self >= 7248 && self <= 7257 ? true : self === 8304 ? true : self >= 8308 && self <= 8313 ? true : self >= 8320 && self <= 8329 ? true : self >= 8528 && self <= 8585 ? true : self >= 9312 && self <= 9371 ? true : self >= 9450 && self <= 9471 ? true : self >= 10102 && self <= 10131 ? true : self === 11517 ? true : self === 12295 ? true : self >= 12321 && self <= 12329 ? true : self >= 12344 && self <= 12346 ? true : self >= 12690 && self <= 12693 ? true : self >= 12832 && self <= 12841 ? true : self >= 12872 && self <= 12879 ? true : self >= 12881 && self <= 12895 ? true : self >= 12928 && self <= 12937 ? true : self >= 12977 && self <= 12991 ? true : self >= 42528 && self <= 42537 ? true : self >= 42726 && self <= 42735 ? true : self >= 43056 && self <= 43061 ? true : self >= 43216 && self <= 43225 ? true : self >= 43264 && self <= 43273 ? true : self >= 43472 && self <= 43481 ? true : self >= 43504 && self <= 43513 ? true : self >= 43600 && self <= 43609 ? true : self >= 44016 && self <= 44025 ? true : self >= 65296 && self <= 65305 ? true : self >= 65799 && self <= 65843 ? true : self >= 65856 && self <= 65912 ? true : self >= 65930 && self <= 65931 ? true : self >= 66273 && self <= 66299 ? true : self >= 66336 && self <= 66339 ? true : self === 66369 ? true : self === 66378 ? true : self >= 66513 && self <= 66517 ? true : self >= 66720 && self <= 66729 ? true : self >= 67672 && self <= 67679 ? true : self >= 67705 && self <= 67711 ? true : self >= 67751 && self <= 67759 ? true : self >= 67835 && self <= 67839 ? true : self >= 67862 && self <= 67867 ? true : self >= 68028 && self <= 68029 ? true : self >= 68032 && self <= 68047 ? true : self >= 68160 && self <= 68168 ? true : self >= 68221 && self <= 68222 ? true : self >= 68253 && self <= 68255 ? true : self >= 68331 && self <= 68335 ? true : self >= 68440 && self <= 68447 ? true : self >= 68472 && self <= 68479 ? true : self >= 68521 && self <= 68527 ? true : self >= 68858 && self <= 68863 ? true : self >= 68912 && self <= 68921 ? true : self >= 68928 && self <= 68937 ? true : self >= 69216 && self <= 69246 ? true : self >= 69405 && self <= 69414 ? true : self >= 69457 && self <= 69460 ? true : self >= 69573 && self <= 69579 ? true : self >= 69714 && self <= 69743 ? true : self >= 69872 && self <= 69881 ? true : self >= 69942 && self <= 69951 ? true : self >= 70096 && self <= 70105 ? true : self >= 70113 && self <= 70132 ? true : self >= 70384 && self <= 70393 ? true : self >= 70736 && self <= 70745 ? true : self >= 70864 && self <= 70873 ? true : self >= 71248 && self <= 71257 ? true : self >= 71360 && self <= 71369 ? true : self >= 71376 && self <= 71395 ? true : self >= 71472 && self <= 71483 ? true : self >= 71904 && self <= 71922 ? true : self >= 72016 && self <= 72025 ? true : self >= 72688 && self <= 72697 ? true : self >= 72784 && self <= 72812 ? true : self >= 73040 && self <= 73049 ? true : self >= 73120 && self <= 73129 ? true : self >= 73552 && self <= 73561 ? true : self >= 73664 && self <= 73684 ? true : self >= 74752 && self <= 74862 ? true : self >= 90416 && self <= 90425 ? true : self >= 92768 && self <= 92777 ? true : self >= 92864 && self <= 92873 ? true : self >= 93008 && self <= 93017 ? true : self >= 93019 && self <= 93025 ? true : self >= 93552 && self <= 93561 ? true : self >= 93568 && self <= 93846 ? true : self >= 118000 && self <= 118009 ? true : self >= 119488 && self <= 119539 ? true : self >= 119648 && self <= 119672 ? true : self >= 120782 && self <= 120831 ? true : self >= 123200 && self <= 123209 ? true : self >= 123632 && self <= 123641 ? true : self >= 124144 && self <= 124153 ? true : self >= 124401 && self <= 124410 ? true : self >= 125127 && self <= 125135 ? true : self >= 125264 && self <= 125273 ? true : self >= 126065 && self <= 126132 ? true : self >= 126209 && self <= 126269 ? true : self >= 127232 && self <= 127244 ? true : self >= 130032 && self <= 130041;
}
function moonbitlang$core$array$$Array$set$6$(self, index, value) {
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
function moonbitlang$core$array$$Array$set$9$(self, index, value) {
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
function moonbitlang$core$builtin$$Show$output$24$(self, logger) {
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
function moonbitlang$core$builtin$$Show$output$11$(self, logger) {
  moonbitlang$core$builtin$$Show$output$24$(moonbitlang$core$builtin$$SourceLocRepr$parse(self), logger);
}
function moonbitlang$core$array$$Array$unsafe_pop$8$(self) {
  return moonbitlang$core$builtin$$JSArray$pop(self);
}
function moonbitlang$core$array$$Array$pop$8$(self) {
  if (self.length === 0) {
    return undefined;
  } else {
    const v = moonbitlang$core$array$$Array$unsafe_pop$8$(self);
    return v;
  }
}
function moonbitlang$core$array$$Array$unsafe_grow_to_length$5$(self, new_len) {
  if (new_len >= self.length) {
    moonbitlang$core$builtin$$JSArray$set_length(self, new_len);
    return;
  } else {
    $panic();
    return;
  }
}
function moonbitlang$core$array$$ArrayView$blit_to$46$inner$5$(self, dst, dst_offset) {
  const len = self.end - self.start | 0;
  if (dst_offset >= 0 && dst_offset <= dst.length) {
    if ((dst_offset + len | 0) > dst.length) {
      moonbitlang$core$array$$Array$unsafe_grow_to_length$5$(dst, dst_offset + len | 0);
    }
    moonbitlang$core$builtin$$UninitializedArray$unsafe_blit$5$(dst, dst_offset, self.buf, self.start, len);
    return;
  } else {
    $panic();
    return;
  }
}
function moonbitlang$core$array$$Array$append$5$(self, other) {
  moonbitlang$core$array$$ArrayView$blit_to$46$inner$5$(other, self, self.length);
}
function moonbitlang$core$double$$Double$to_string(self) {
  return moonbitlang$core$double$internal$ryu$$ryu_to_string(self);
}
function moonbitlang$core$builtin$$Eq$equal$25$(_x_261, _x_262) {
  if (_x_261 === 0) {
    if (_x_262 === 0) {
      return true;
    } else {
      return false;
    }
  } else {
    if (_x_262 === 1) {
      return true;
    } else {
      return false;
    }
  }
}
function moonbitlang$core$builtin$$Eq$equal$26$(_x_169, _x_170) {
  switch (_x_169.$tag) {
    case 0: {
      if (_x_170.$tag === 0) {
        return true;
      } else {
        return false;
      }
    }
    case 1: {
      if (_x_170.$tag === 1) {
        return true;
      } else {
        return false;
      }
    }
    case 2: {
      if (_x_170.$tag === 2) {
        return true;
      } else {
        return false;
      }
    }
    case 3: {
      if (_x_170.$tag === 3) {
        return true;
      } else {
        return false;
      }
    }
    case 4: {
      if (_x_170.$tag === 4) {
        return true;
      } else {
        return false;
      }
    }
    case 5: {
      if (_x_170.$tag === 5) {
        return true;
      } else {
        return false;
      }
    }
    case 6: {
      const _ID = _x_169;
      const _$42$x0_171 = _ID._0;
      if (_x_170.$tag === 6) {
        const _ID$2 = _x_170;
        const _$42$y0_172 = _ID$2._0;
        return _$42$x0_171 === _$42$y0_172;
      } else {
        return false;
      }
    }
    case 7: {
      if (_x_170.$tag === 7) {
        return true;
      } else {
        return false;
      }
    }
    case 8: {
      if (_x_170.$tag === 8) {
        return true;
      } else {
        return false;
      }
    }
    case 9: {
      if (_x_170.$tag === 9) {
        return true;
      } else {
        return false;
      }
    }
    case 10: {
      if (_x_170.$tag === 10) {
        return true;
      } else {
        return false;
      }
    }
    case 11: {
      if (_x_170.$tag === 11) {
        return true;
      } else {
        return false;
      }
    }
    case 12: {
      if (_x_170.$tag === 12) {
        return true;
      } else {
        return false;
      }
    }
    case 13: {
      if (_x_170.$tag === 13) {
        return true;
      } else {
        return false;
      }
    }
    case 14: {
      if (_x_170.$tag === 14) {
        return true;
      } else {
        return false;
      }
    }
    case 15: {
      if (_x_170.$tag === 15) {
        return true;
      } else {
        return false;
      }
    }
    case 16: {
      if (_x_170.$tag === 16) {
        return true;
      } else {
        return false;
      }
    }
    case 17: {
      const _CompassPt = _x_169;
      const _$42$x0_173 = _CompassPt._0;
      if (_x_170.$tag === 17) {
        const _CompassPt$2 = _x_170;
        const _$42$y0_174 = _CompassPt$2._0;
        return _$42$x0_173 === _$42$y0_174;
      } else {
        return false;
      }
    }
    default: {
      if (_x_170.$tag === 18) {
        return true;
      } else {
        return false;
      }
    }
  }
}
function antisatori$graphviz$lib$parser$$Lexer$advance(self) {
  if (self.position >= self.input.length) {
    self.current_char = -1;
    return;
  } else {
    const _tmp = self.input;
    const _tmp$2 = self.position;
    $bound_check(_tmp, _tmp$2);
    const _bind = moonbitlang$core$uint16$$UInt16$to_char(_tmp.charCodeAt(_tmp$2));
    if (_bind === -1) {
      self.current_char = -1;
    } else {
      const _Some = _bind;
      const _ch = _Some;
      self.current_char = _ch;
    }
    self.position = self.position + 1 | 0;
    return;
  }
}
function antisatori$graphviz$lib$parser$$Lexer$new(input) {
  const lexer = { input: input, position: 0, current_char: -1 };
  antisatori$graphviz$lib$parser$$Lexer$advance(lexer);
  return lexer;
}
function antisatori$graphviz$lib$parser$$Lexer$skip_whitespace(self) {
  _L: while (true) {
    _L$2: {
      const _bind = self.current_char;
      if (_bind === -1) {
        return;
      } else {
        const _Some = _bind;
        const _x = _Some;
        switch (_x) {
          case 32: {
            break _L$2;
          }
          case 9: {
            break _L$2;
          }
          case 10: {
            break _L$2;
          }
          case 13: {
            break _L$2;
          }
          default: {
            return;
          }
        }
      }
    }
    antisatori$graphviz$lib$parser$$Lexer$advance(self);
    continue;
  }
}
function antisatori$graphviz$lib$parser$$Lexer$skip_comment(self) {
  const _bind = self.current_char;
  if (_bind === -1) {
    return;
  } else {
    const _Some = _bind;
    const _x = _Some;
    switch (_x) {
      case 47: {
        antisatori$graphviz$lib$parser$$Lexer$advance(self);
        _L: {
          const _bind$2 = self.current_char;
          if (_bind$2 === -1) {
            break _L;
          } else {
            const _Some$2 = _bind$2;
            const _x$2 = _Some$2;
            switch (_x$2) {
              case 47: {
                let _tmp = self.current_char;
                while (true) {
                  const _param = _tmp;
                  if (_param === -1) {
                    return;
                  } else {
                    const _Some$3 = _param;
                    const _x$3 = _Some$3;
                    if (_x$3 === 10) {
                      return;
                    } else {
                      antisatori$graphviz$lib$parser$$Lexer$advance(self);
                      _tmp = self.current_char;
                      continue;
                    }
                  }
                }
              }
              case 42: {
                antisatori$graphviz$lib$parser$$Lexer$advance(self);
                let _tmp$2 = self.current_char;
                _L$2: while (true) {
                  const _param = _tmp$2;
                  if (_param === -1) {
                    return;
                  } else {
                    const _Some$3 = _param;
                    const _x$3 = _Some$3;
                    if (_x$3 === 42) {
                      antisatori$graphviz$lib$parser$$Lexer$advance(self);
                      let _tmp$3 = self.current_char;
                      while (true) {
                        const _param$2 = _tmp$3;
                        _L$3: {
                          if (_param$2 === -1) {
                            break _L$3;
                          } else {
                            const _Some$4 = _param$2;
                            const _x$4 = _Some$4;
                            if (_x$4 === 47) {
                              antisatori$graphviz$lib$parser$$Lexer$advance(self);
                              return;
                            } else {
                              break _L$3;
                            }
                          }
                        }
                        _tmp$3 = self.current_char;
                        continue;
                      }
                    } else {
                      antisatori$graphviz$lib$parser$$Lexer$advance(self);
                      _tmp$2 = self.current_char;
                      continue;
                    }
                  }
                }
                break;
              }
              default: {
                break _L;
              }
            }
          }
        }
        self.position = self.position - 1 | 0;
        self.current_char = antisatori$graphviz$lib$parser$$skip_comment$46$constr$47$776;
        return;
      }
      case 35: {
        let _tmp = self.current_char;
        while (true) {
          const _param = _tmp;
          if (_param === -1) {
            return;
          } else {
            const _Some$2 = _param;
            const _x$2 = _Some$2;
            if (_x$2 === 10) {
              return;
            } else {
              antisatori$graphviz$lib$parser$$Lexer$advance(self);
              _tmp = self.current_char;
              continue;
            }
          }
        }
      }
      default: {
        return;
      }
    }
  }
}
function antisatori$graphviz$lib$parser$$Lexer$read_identifier(self) {
  let _tmp = self.current_char;
  let _tmp$2 = "";
  while (true) {
    const _param_0 = _tmp;
    const _param_1 = _tmp$2;
    if (_param_0 === -1) {
      return _param_1;
    } else {
      const _Some = _param_0;
      const _c = _Some;
      if (moonbitlang$core$char$$Char$is_numeric(_c) || (moonbitlang$core$char$$Char$is_ascii_alphabetic(_c) || _c === 95)) {
        antisatori$graphviz$lib$parser$$Lexer$advance(self);
        _tmp = self.current_char;
        _tmp$2 = `${_param_1}${moonbitlang$core$builtin$$Show$to_string$12$(_c)}`;
        continue;
      } else {
        return _param_1;
      }
    }
  }
}
function antisatori$graphviz$lib$parser$$Lexer$read_quoted_string(self) {
  const _p = self.current_char;
  const quote_char = _p === -1 ? $panic() : _p;
  antisatori$graphviz$lib$parser$$Lexer$advance(self);
  let result;
  let _tmp = self.current_char;
  let _tmp$2 = "";
  while (true) {
    const _param_0 = _tmp;
    const _param_1 = _tmp$2;
    if (_param_0 === -1) {
      result = _param_1;
      break;
    } else {
      const _Some = _param_0;
      const _c = _Some;
      if (_c === quote_char) {
        result = _param_1;
        break;
      } else {
        if (_c === 92) {
          antisatori$graphviz$lib$parser$$Lexer$advance(self);
          const _bind = self.current_char;
          if (_bind === -1) {
            result = _param_1;
            break;
          } else {
            const _Some$2 = _bind;
            const _escaped_char = _Some$2;
            antisatori$graphviz$lib$parser$$Lexer$advance(self);
            _tmp = self.current_char;
            _tmp$2 = `${_param_1}${moonbitlang$core$builtin$$Show$to_string$12$(_escaped_char)}`;
            continue;
          }
        } else {
          antisatori$graphviz$lib$parser$$Lexer$advance(self);
          _tmp = self.current_char;
          _tmp$2 = `${_param_1}${moonbitlang$core$builtin$$Show$to_string$12$(_c)}`;
          continue;
        }
      }
    }
  }
  const _bind = self.current_char;
  if (_bind === -1) {
  } else {
    const _Some = _bind;
    const _c = _Some;
    if (_c === quote_char) {
      antisatori$graphviz$lib$parser$$Lexer$advance(self);
    }
  }
  return result;
}
function antisatori$graphviz$lib$parser$$keyword_or_id(word) {
  switch (word) {
    case "strict": {
      return $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$Strict;
    }
    case "graph": {
      return $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$Graph;
    }
    case "digraph": {
      return $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$Digraph;
    }
    case "node": {
      return $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$Node;
    }
    case "edge": {
      return $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$Edge;
    }
    case "subgraph": {
      return $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$Subgraph;
    }
    default: {
      return new $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$ID(word);
    }
  }
}
function antisatori$graphviz$lib$parser$$Lexer$next_token(self) {
  while (true) {
    antisatori$graphviz$lib$parser$$Lexer$skip_whitespace(self);
    _L: {
      _L$2: {
        const _bind = self.current_char;
        if (_bind === -1) {
          return $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$EOF;
        } else {
          const _Some = _bind;
          const _x = _Some;
          switch (_x) {
            case 47: {
              break _L$2;
            }
            case 35: {
              break _L$2;
            }
            case 123: {
              antisatori$graphviz$lib$parser$$Lexer$advance(self);
              return $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$LeftBrace;
            }
            case 125: {
              antisatori$graphviz$lib$parser$$Lexer$advance(self);
              return $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$RightBrace;
            }
            case 91: {
              antisatori$graphviz$lib$parser$$Lexer$advance(self);
              return $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$LeftBracket;
            }
            case 93: {
              antisatori$graphviz$lib$parser$$Lexer$advance(self);
              return $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$RightBracket;
            }
            case 58: {
              antisatori$graphviz$lib$parser$$Lexer$advance(self);
              return $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$Colon;
            }
            case 59: {
              antisatori$graphviz$lib$parser$$Lexer$advance(self);
              return $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$Semicolon;
            }
            case 44: {
              antisatori$graphviz$lib$parser$$Lexer$advance(self);
              return $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$Comma;
            }
            case 61: {
              antisatori$graphviz$lib$parser$$Lexer$advance(self);
              return $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$Equals;
            }
            case 45: {
              antisatori$graphviz$lib$parser$$Lexer$advance(self);
              _L$3: {
                const _bind$2 = self.current_char;
                if (_bind$2 === -1) {
                  break _L$3;
                } else {
                  const _Some$2 = _bind$2;
                  const _x$2 = _Some$2;
                  switch (_x$2) {
                    case 45: {
                      antisatori$graphviz$lib$parser$$Lexer$advance(self);
                      return $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$Line;
                    }
                    case 62: {
                      antisatori$graphviz$lib$parser$$Lexer$advance(self);
                      return $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$Arrow;
                    }
                    default: {
                      break _L$3;
                    }
                  }
                }
              }
              return antisatori$graphviz$lib$parser$$next_token$46$constr$47$825;
            }
            case 34: {
              break _L;
            }
            case 39: {
              break _L;
            }
            default: {
              if (moonbitlang$core$char$$Char$is_numeric(_x) || (moonbitlang$core$char$$Char$is_ascii_alphabetic(_x) || _x === 95)) {
                const word = antisatori$graphviz$lib$parser$$Lexer$read_identifier(self);
                return antisatori$graphviz$lib$parser$$keyword_or_id(word);
              } else {
                if (moonbitlang$core$char$$Char$is_numeric(_x)) {
                  const word = antisatori$graphviz$lib$parser$$Lexer$read_identifier(self);
                  return new $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$ID(word);
                } else {
                  antisatori$graphviz$lib$parser$$Lexer$advance(self);
                  return new $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$ID(moonbitlang$core$builtin$$Show$to_string$12$(_x));
                }
              }
            }
          }
        }
      }
      antisatori$graphviz$lib$parser$$Lexer$skip_comment(self);
      continue;
    }
    const str = antisatori$graphviz$lib$parser$$Lexer$read_quoted_string(self);
    return new $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$ID(str);
  }
}
function antisatori$graphviz$lib$parser$$Parser$new(input) {
  const lexer = antisatori$graphviz$lib$parser$$Lexer$new(input);
  const current_token = antisatori$graphviz$lib$parser$$Lexer$next_token(lexer);
  return { lexer: lexer, current_token: current_token };
}
function antisatori$graphviz$lib$parser$$Parser$eat(self, expected) {
  let actual;
  let expected$2;
  _L: {
    const _bind = self.current_token;
    if (_bind.$tag === 6) {
      if (expected.$tag === 6) {
        self.current_token = antisatori$graphviz$lib$parser$$Lexer$next_token(self.lexer);
        return true;
      } else {
        if (moonbitlang$core$builtin$$Eq$equal$26$(_bind, expected)) {
          actual = _bind;
          expected$2 = expected;
          break _L;
        } else {
          return false;
        }
      }
    } else {
      if (moonbitlang$core$builtin$$Eq$equal$26$(_bind, expected)) {
        actual = _bind;
        expected$2 = expected;
        break _L;
      } else {
        return false;
      }
    }
  }
  self.current_token = antisatori$graphviz$lib$parser$$Lexer$next_token(self.lexer);
  return true;
}
function antisatori$graphviz$lib$parser$$is_compass_point(s) {
  switch (s) {
    case "n": {
      return true;
    }
    case "ne": {
      return true;
    }
    case "e": {
      return true;
    }
    case "se": {
      return true;
    }
    case "s": {
      return true;
    }
    case "sw": {
      return true;
    }
    case "w": {
      return true;
    }
    case "nw": {
      return true;
    }
    case "c": {
      return true;
    }
    case "_": {
      return true;
    }
    default: {
      return false;
    }
  }
}
function antisatori$graphviz$lib$parser$$parse_compass_point(compass_str) {
  switch (compass_str) {
    case "n": {
      return 0;
    }
    case "ne": {
      return 1;
    }
    case "e": {
      return 2;
    }
    case "se": {
      return 3;
    }
    case "s": {
      return 4;
    }
    case "sw": {
      return 5;
    }
    case "w": {
      return 6;
    }
    case "nw": {
      return 7;
    }
    case "c": {
      return 8;
    }
    case "_": {
      return 9;
    }
    default: {
      return 8;
    }
  }
}
function antisatori$graphviz$lib$parser$$Parser$parse_port(self) {
  if (!antisatori$graphviz$lib$parser$$Parser$eat(self, $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$Colon)) {
    return undefined;
  }
  const port = { id: undefined, compass: undefined };
  const _bind = self.current_token;
  if (_bind.$tag === 6) {
    const _ID = _bind;
    const _id = _ID._0;
    if (antisatori$graphviz$lib$parser$$is_compass_point(_id)) {
      port.compass = antisatori$graphviz$lib$parser$$parse_compass_point(_id);
      antisatori$graphviz$lib$parser$$Parser$eat(self, antisatori$graphviz$lib$parser$$parse_port$46$constr$47$851);
    } else {
      port.id = _id;
      antisatori$graphviz$lib$parser$$Parser$eat(self, antisatori$graphviz$lib$parser$$parse_port$46$constr$47$852);
      if (antisatori$graphviz$lib$parser$$Parser$eat(self, $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$Colon)) {
        const _bind$2 = self.current_token;
        if (_bind$2.$tag === 6) {
          const _ID$2 = _bind$2;
          const _compass_str = _ID$2._0;
          if (antisatori$graphviz$lib$parser$$is_compass_point(_compass_str)) {
            port.compass = antisatori$graphviz$lib$parser$$parse_compass_point(_compass_str);
            antisatori$graphviz$lib$parser$$Parser$eat(self, antisatori$graphviz$lib$parser$$parse_port$46$constr$47$853);
          }
        }
      }
    }
  }
  return port;
}
function antisatori$graphviz$lib$parser$$Parser$parse_node_id(self) {
  const _bind = self.current_token;
  if (_bind.$tag === 6) {
    const _ID = _bind;
    const _id = _ID._0;
    antisatori$graphviz$lib$parser$$Parser$eat(self, antisatori$graphviz$lib$parser$$parse_node_id$46$constr$47$862);
    const port = antisatori$graphviz$lib$parser$$Parser$parse_port(self);
    return { id: _id, port: port };
  } else {
    return undefined;
  }
}
function antisatori$graphviz$lib$parser$$Parser$parse_attribute(self) {
  const _bind = self.current_token;
  if (_bind.$tag === 6) {
    const _ID = _bind;
    const _key = _ID._0;
    antisatori$graphviz$lib$parser$$Parser$eat(self, antisatori$graphviz$lib$parser$$parse_attribute$46$constr$47$868);
    if (antisatori$graphviz$lib$parser$$Parser$eat(self, $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$Equals)) {
      const _bind$2 = self.current_token;
      if (_bind$2.$tag === 6) {
        const _ID$2 = _bind$2;
        const _value = _ID$2._0;
        antisatori$graphviz$lib$parser$$Parser$eat(self, antisatori$graphviz$lib$parser$$parse_attribute$46$constr$47$869);
        return { key: _key, value: _value };
      } else {
        return undefined;
      }
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
}
function antisatori$graphviz$lib$parser$$Parser$parse_a_list(self) {
  const attributes = [];
  while (true) {
    const _bind = antisatori$graphviz$lib$parser$$Parser$parse_attribute(self);
    if (_bind === undefined) {
      break;
    } else {
      const _Some = _bind;
      const _attr = _Some;
      moonbitlang$core$array$$Array$push$5$(attributes, _attr);
      _L: {
        _L$2: {
          const _bind$2 = self.current_token;
          switch (_bind$2.$tag) {
            case 12: {
              break _L$2;
            }
            case 13: {
              break _L$2;
            }
          }
          break _L;
        }
        antisatori$graphviz$lib$parser$$Parser$eat(self, self.current_token);
      }
    }
    continue;
  }
  return attributes;
}
function antisatori$graphviz$lib$parser$$Parser$parse_attr_list(self) {
  if (!antisatori$graphviz$lib$parser$$Parser$eat(self, $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$LeftBracket)) {
    return undefined;
  }
  const attributes = antisatori$graphviz$lib$parser$$Parser$parse_a_list(self);
  if (!antisatori$graphviz$lib$parser$$Parser$eat(self, $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$RightBracket)) {
    return undefined;
  }
  const attr_list = { attributes: attributes };
  const _bind = antisatori$graphviz$lib$parser$$Parser$parse_attr_list(self);
  if (_bind === undefined) {
  } else {
    const _Some = _bind;
    const _next_attr_list = _Some;
    const _bind$2 = _next_attr_list.attributes;
    moonbitlang$core$array$$Array$append$5$(attributes, { buf: _bind$2, start: 0, end: _bind$2.length });
  }
  return attr_list;
}
function antisatori$graphviz$lib$parser$$Parser$parse_edge_rhs(self) {
  const edges = [];
  _L: while (true) {
    const _bind = self.current_token;
    let edge_op;
    switch (_bind.$tag) {
      case 15: {
        antisatori$graphviz$lib$parser$$Parser$eat(self, $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$Arrow);
        edge_op = 0;
        break;
      }
      case 16: {
        antisatori$graphviz$lib$parser$$Parser$eat(self, $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$Line);
        edge_op = 1;
        break;
      }
      default: {
        break _L;
      }
    }
    const _bind$2 = antisatori$graphviz$lib$parser$$Parser$parse_node_id(self);
    if (_bind$2 === undefined) {
      break;
    } else {
      const _Some = _bind$2;
      const _node_id = _Some;
      moonbitlang$core$array$$Array$push$17$(edges, { _0: edge_op, _1: _node_id });
    }
    continue;
  }
  return edges.length === 0 ? Option$None$2$ : new Option$Some$2$(edges);
}
function antisatori$graphviz$lib$parser$$Parser$parse_statement(self) {
  _L: {
    _L$2: {
      const _bind = self.current_token;
      switch (_bind.$tag) {
        case 1: {
          break _L$2;
        }
        case 3: {
          break _L$2;
        }
        case 4: {
          break _L$2;
        }
        case 5: {
          const _bind$2 = antisatori$graphviz$lib$parser$$Parser$parse_subgraph(self);
          if (_bind$2 === undefined) {
            return undefined;
          } else {
            const _Some = _bind$2;
            const _subgraph = _Some;
            return new $64$antisatori$47$graphviz$47$lib$47$parser$46$Statement$Subgraph(_subgraph);
          }
        }
        case 2: {
          break _L;
        }
        case 0: {
          break _L;
        }
        case 7: {
          break _L;
        }
        case 8: {
          break _L;
        }
        case 9: {
          break _L;
        }
        case 10: {
          break _L;
        }
        case 12: {
          break _L;
        }
        case 13: {
          break _L;
        }
        case 14: {
          break _L;
        }
        case 17: {
          break _L;
        }
        case 15: {
          break _L;
        }
        case 11: {
          break _L;
        }
        case 16: {
          break _L;
        }
        case 18: {
          break _L;
        }
        default: {
          const _bind$3 = antisatori$graphviz$lib$parser$$Parser$parse_node_id(self);
          if (_bind$3 === undefined) {
            return undefined;
          } else {
            const _Some = _bind$3;
            const _node_id = _Some;
            const _bind$4 = antisatori$graphviz$lib$parser$$Parser$parse_edge_rhs(self);
            if (_bind$4.$tag === 1) {
              const _Some$2 = _bind$4;
              const _edges = _Some$2._0;
              const attr_list = antisatori$graphviz$lib$parser$$Parser$parse_attr_list(self);
              return new $64$antisatori$47$graphviz$47$lib$47$parser$46$Statement$EdgeStmt(_node_id, _edges, attr_list);
            } else {
              const _bind$5 = _node_id.port;
              if (_bind$5 === undefined) {
                const _bind$6 = self.current_token;
                if (_bind$6.$tag === 14) {
                  antisatori$graphviz$lib$parser$$Parser$eat(self, $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$Equals);
                  const _bind$7 = self.current_token;
                  if (_bind$7.$tag === 6) {
                    const _ID = _bind$7;
                    const _value = _ID._0;
                    antisatori$graphviz$lib$parser$$Parser$eat(self, antisatori$graphviz$lib$parser$$parse_statement$46$constr$47$900);
                    return new $64$antisatori$47$graphviz$47$lib$47$parser$46$Statement$Assignment(_node_id.id, _value);
                  } else {
                    return undefined;
                  }
                } else {
                  const attr_list = antisatori$graphviz$lib$parser$$Parser$parse_attr_list(self);
                  return new $64$antisatori$47$graphviz$47$lib$47$parser$46$Statement$NodeStmt(_node_id, attr_list);
                }
              } else {
                const attr_list = antisatori$graphviz$lib$parser$$Parser$parse_attr_list(self);
                return new $64$antisatori$47$graphviz$47$lib$47$parser$46$Statement$NodeStmt(_node_id, attr_list);
              }
            }
          }
        }
      }
    }
    const _bind = self.current_token;
    let attr_type;
    switch (_bind.$tag) {
      case 1: {
        antisatori$graphviz$lib$parser$$Parser$eat(self, $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$Graph);
        attr_type = "graph";
        break;
      }
      case 3: {
        antisatori$graphviz$lib$parser$$Parser$eat(self, $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$Node);
        attr_type = "node";
        break;
      }
      case 4: {
        antisatori$graphviz$lib$parser$$Parser$eat(self, $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$Edge);
        attr_type = "edge";
        break;
      }
      default: {
        attr_type = "";
      }
    }
    const _bind$2 = antisatori$graphviz$lib$parser$$Parser$parse_attr_list(self);
    if (_bind$2 === undefined) {
      return undefined;
    } else {
      const _Some = _bind$2;
      const _attr_list = _Some;
      return new $64$antisatori$47$graphviz$47$lib$47$parser$46$Statement$AttrStmt(attr_type, _attr_list);
    }
  }
  return undefined;
}
function antisatori$graphviz$lib$parser$$Parser$parse_subgraph(self) {
  let id;
  let _tmp = self.current_token;
  let _tmp$2 = undefined;
  while (true) {
    const _param_0 = _tmp;
    const _param_1 = _tmp$2;
    if (_param_0.$tag === 5) {
      antisatori$graphviz$lib$parser$$Parser$eat(self, $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$Subgraph);
      const _bind = self.current_token;
      if (_bind.$tag === 6) {
        const _ID = _bind;
        const _sub_id = _ID._0;
        antisatori$graphviz$lib$parser$$Parser$eat(self, antisatori$graphviz$lib$parser$$parse_subgraph$46$constr$47$927);
        _tmp = self.current_token;
        _tmp$2 = _sub_id;
        continue;
      } else {
        _tmp = self.current_token;
        continue;
      }
    } else {
      id = _param_1;
      break;
    }
  }
  if (!antisatori$graphviz$lib$parser$$Parser$eat(self, $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$LeftBrace)) {
    return undefined;
  }
  const statements = antisatori$graphviz$lib$parser$$Parser$parse_stmt_list(self);
  if (!antisatori$graphviz$lib$parser$$Parser$eat(self, $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$RightBrace)) {
    return undefined;
  }
  return { id: id, statements: statements };
}
function antisatori$graphviz$lib$parser$$Parser$parse_stmt_list(self) {
  const statements = [];
  while (true) {
    const _bind = antisatori$graphviz$lib$parser$$Parser$parse_statement(self);
    if (_bind === undefined) {
      break;
    } else {
      const _Some = _bind;
      const _stmt = _Some;
      moonbitlang$core$array$$Array$push$14$(statements, _stmt);
      let _tmp = self.current_token;
      while (true) {
        const _param = _tmp;
        if (_param.$tag === 12) {
          antisatori$graphviz$lib$parser$$Parser$eat(self, $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$Semicolon);
          _tmp = self.current_token;
          continue;
        } else {
          break;
        }
      }
    }
    continue;
  }
  return statements;
}
function antisatori$graphviz$lib$parser$$Parser$parse_graph(self) {
  const _bind = self.current_token;
  let strict;
  if (_bind.$tag === 0) {
    antisatori$graphviz$lib$parser$$Parser$eat(self, $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$Strict);
    strict = true;
  } else {
    strict = false;
  }
  const _bind$2 = self.current_token;
  let directed;
  switch (_bind$2.$tag) {
    case 1: {
      antisatori$graphviz$lib$parser$$Parser$eat(self, $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$Graph);
      directed = false;
      break;
    }
    case 2: {
      antisatori$graphviz$lib$parser$$Parser$eat(self, $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$Digraph);
      directed = true;
      break;
    }
    default: {
      return undefined;
    }
  }
  const _bind$3 = self.current_token;
  let id;
  if (_bind$3.$tag === 6) {
    const _ID = _bind$3;
    const _graph_id = _ID._0;
    antisatori$graphviz$lib$parser$$Parser$eat(self, antisatori$graphviz$lib$parser$$parse_graph$46$constr$47$945);
    id = _graph_id;
  } else {
    id = undefined;
  }
  if (!antisatori$graphviz$lib$parser$$Parser$eat(self, $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$LeftBrace)) {
    return undefined;
  }
  const statements = antisatori$graphviz$lib$parser$$Parser$parse_stmt_list(self);
  if (!antisatori$graphviz$lib$parser$$Parser$eat(self, $64$antisatori$47$graphviz$47$lib$47$parser$46$Token$RightBrace)) {
    return undefined;
  }
  return { strict: strict, directed: directed, id: id, statements: statements };
}
function antisatori$graphviz$lib$parser$$parse_dot(input) {
  const parser = antisatori$graphviz$lib$parser$$Parser$new(input);
  return antisatori$graphviz$lib$parser$$Parser$parse_graph(parser);
}
function moonbitlang$core$builtin$$Eq$equal$27$(_x_288, _x_289) {
  if (_x_288 === 0) {
    if (_x_289 === 0) {
      return true;
    } else {
      return false;
    }
  } else {
    if (_x_289 === 1) {
      return true;
    } else {
      return false;
    }
  }
}
function antisatori$graphviz$lib$layout$$compute_node_positions_in_layer(layer_nodes, nodes, layer_index, y, config) {
  const positions = [];
  const n = layer_nodes.length;
  if (n === 0) {
    return positions;
  }
  const total_width = ((n - 1 | 0) + 0) * config.node_spacing + (n + 0) * config.node_width;
  const start_x = -total_width / 2;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < n) {
      const node_id = moonbitlang$core$array$$Array$at$8$(layer_nodes, i);
      const x = start_x + (i + 0) * (config.node_width + config.node_spacing);
      const _bind = moonbitlang$core$builtin$$Map$get$21$(nodes, node_id);
      let label;
      if (_bind === undefined) {
        label = node_id;
      } else {
        const _Some = _bind;
        const _node_info = _Some;
        label = _node_info.label;
      }
      const layout_node = { id: node_id, label: label, position: { x: x, y: y }, size: { width: config.node_width, height: config.node_height }, layer: layer_index, order: i };
      moonbitlang$core$array$$Array$push$7$(positions, { _0: node_id, _1: layout_node });
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return positions;
}
function antisatori$graphviz$lib$layout$$assign_coordinates(layers, nodes, config) {
  const positions = moonbitlang$core$builtin$$Map$new$46$inner$20$(8);
  let _tmp = 0;
  while (true) {
    const layer_index = _tmp;
    if (layer_index < layers.length) {
      const layer = moonbitlang$core$array$$Array$at$6$(layers, layer_index);
      const y = (layer_index + 0) * (config.node_height + config.layer_spacing);
      const layer_positions = antisatori$graphviz$lib$layout$$compute_node_positions_in_layer(layer, nodes, layer_index, y, config);
      let _tmp$2 = 0;
      while (true) {
        const i = _tmp$2;
        if (i < layer_positions.length) {
          const _bind = moonbitlang$core$array$$Array$at$7$(layer_positions, i);
          const _node_id = _bind._0;
          const _layout_node = _bind._1;
          moonbitlang$core$builtin$$Map$set$20$(positions, _node_id, _layout_node);
          _tmp$2 = i + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      _tmp = layer_index + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return positions;
}
function antisatori$graphviz$lib$layout$$find_sources(graph) {
  const sources = [];
  const _p = graph.nodes;
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
      const _p$8 = _p$6.incoming;
      if (_p$8.length === 0) {
        moonbitlang$core$array$$Array$push$8$(sources, _p$5);
      }
      _tmp = _p$7;
      continue;
    }
  }
  return sources;
}
function antisatori$graphviz$lib$layout$$topological_layering(graph, sources) {
  const layer_map = moonbitlang$core$builtin$$Map$new$46$inner$22$(8);
  const in_degree = moonbitlang$core$builtin$$Map$new$46$inner$22$(8);
  const _p = graph.nodes;
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
      moonbitlang$core$builtin$$Map$set$22$(in_degree, _p$5, _p$6.incoming.length);
      _tmp = _p$7;
      continue;
    }
  }
  const queue = [];
  const _len = sources.length;
  let _tmp$2 = 0;
  while (true) {
    const _i = _tmp$2;
    if (_i < _len) {
      const source = sources[_i];
      moonbitlang$core$builtin$$Map$set$22$(layer_map, source, 0);
      moonbitlang$core$array$$Array$push$8$(queue, source);
      _tmp$2 = _i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  while (true) {
    if (!(queue.length === 0)) {
      const _p$2 = moonbitlang$core$array$$Array$pop$8$(queue);
      let current;
      if (_p$2 === undefined) {
        current = $panic();
      } else {
        const _p$3 = _p$2;
        current = _p$3;
      }
      const _p$3 = moonbitlang$core$builtin$$Map$get$22$(layer_map, current);
      let current_layer;
      if (_p$3 === undefined) {
        current_layer = $panic();
      } else {
        const _p$4 = _p$3;
        current_layer = _p$4;
      }
      const _bind = moonbitlang$core$builtin$$Map$get$21$(graph.nodes, current);
      if (_bind === undefined) {
      } else {
        const _Some = _bind;
        const _node_info = _Some;
        const _arr = _node_info.outgoing;
        const _len$2 = _arr.length;
        let _tmp$3 = 0;
        while (true) {
          const _i = _tmp$3;
          if (_i < _len$2) {
            const neighbor = _arr[_i];
            const _p$4 = moonbitlang$core$builtin$$Map$get$22$(in_degree, neighbor);
            let neighbor_degree;
            if (_p$4 === undefined) {
              neighbor_degree = $panic();
            } else {
              const _p$5 = _p$4;
              neighbor_degree = _p$5;
            }
            moonbitlang$core$builtin$$Map$set$22$(in_degree, neighbor, neighbor_degree - 1 | 0);
            const new_layer = current_layer + 1 | 0;
            const _bind$2 = moonbitlang$core$builtin$$Map$get$22$(layer_map, neighbor);
            if (_bind$2 === undefined) {
              moonbitlang$core$builtin$$Map$set$22$(layer_map, neighbor, new_layer);
            } else {
              const _Some$2 = _bind$2;
              const _existing_layer = _Some$2;
              if (new_layer > _existing_layer) {
                moonbitlang$core$builtin$$Map$set$22$(layer_map, neighbor, new_layer);
              }
            }
            const _p$5 = moonbitlang$core$builtin$$Map$get$22$(in_degree, neighbor);
            let _tmp$4;
            if (_p$5 === undefined) {
              _tmp$4 = $panic();
            } else {
              const _p$6 = _p$5;
              _tmp$4 = _p$6;
            }
            if (_tmp$4 === 0) {
              moonbitlang$core$array$$Array$push$8$(queue, neighbor);
            }
            _tmp$3 = _i + 1 | 0;
            continue;
          } else {
            break;
          }
        }
      }
      continue;
    } else {
      break;
    }
  }
  return layer_map;
}
function antisatori$graphviz$lib$layout$$assign_layers(graph) {
  const sources = antisatori$graphviz$lib$layout$$find_sources(graph);
  return antisatori$graphviz$lib$layout$$topological_layering(graph, sources);
}
function antisatori$graphviz$lib$layout$$build_adjacency_lists(graph) {
  const _arr = graph.edges;
  const _len = _arr.length;
  let _tmp = 0;
  while (true) {
    const _i = _tmp;
    if (_i < _len) {
      const edge = _arr[_i];
      const _bind = moonbitlang$core$builtin$$Map$get$21$(graph.nodes, edge.from);
      if (_bind === undefined) {
      } else {
        const _Some = _bind;
        const _from_node = _Some;
        moonbitlang$core$array$$Array$push$8$(_from_node.outgoing, edge.to);
      }
      const _bind$2 = moonbitlang$core$builtin$$Map$get$21$(graph.nodes, edge.to);
      if (_bind$2 === undefined) {
      } else {
        const _Some = _bind$2;
        const _to_node = _Some;
        moonbitlang$core$array$$Array$push$8$(_to_node.incoming, edge.from);
      }
      _tmp = _i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return graph;
}
function antisatori$graphviz$lib$layout$$calculate_bounds(nodes) {
  const min_x = { val: 0 };
  const min_y = { val: 0 };
  const max_x = { val: 0 };
  const max_y = { val: 0 };
  const first = { val: true };
  let _tmp = nodes.head;
  while (true) {
    const _p = _tmp;
    if (_p === undefined) {
      break;
    } else {
      const _p$2 = _p;
      const _p$3 = _p$2;
      _p$3.key;
      const _p$4 = _p$3.value;
      const _p$5 = _p$3.next;
      const _p$6 = _p$4.position.x;
      const _p$7 = _p$4.position.y;
      const _p$8 = _p$4.position.x + _p$4.size.width;
      const _p$9 = _p$4.position.y + _p$4.size.height;
      if (first.val) {
        min_x.val = _p$6;
        min_y.val = _p$7;
        max_x.val = _p$8;
        max_y.val = _p$9;
        first.val = false;
      } else {
        if (_p$6 < min_x.val) {
          min_x.val = _p$6;
        }
        if (_p$7 < min_y.val) {
          min_y.val = _p$7;
        }
        if (_p$8 > max_x.val) {
          max_x.val = _p$8;
        }
        if (_p$9 > max_y.val) {
          max_y.val = _p$9;
        }
      }
      _tmp = _p$5;
      continue;
    }
  }
  return { min_x: min_x.val, min_y: min_y.val, max_x: max_x.val, max_y: max_y.val };
}
function antisatori$graphviz$lib$layout$$collect_edges(statements, directed) {
  const edges = [];
  const _len = statements.length;
  let _tmp = 0;
  while (true) {
    const _i = _tmp;
    if (_i < _len) {
      const stmt = statements[_i];
      switch (stmt.$tag) {
        case 1: {
          const _EdgeStmt = stmt;
          const _start_node = _EdgeStmt._0;
          const _edge_list = _EdgeStmt._1;
          let current = _start_node.id;
          const _len$2 = _edge_list.length;
          let _tmp$2 = 0;
          while (true) {
            const _i$2 = _tmp$2;
            if (_i$2 < _len$2) {
              const edge_pair = _edge_list[_i$2];
              const _edge_op = edge_pair._0;
              const _target_node = edge_pair._1;
              moonbitlang$core$array$$Array$push$15$(edges, { from: current, to: _target_node.id, original_direction: 0 });
              if (!directed || moonbitlang$core$builtin$$Eq$equal$25$(_edge_op, 1)) {
                moonbitlang$core$array$$Array$push$15$(edges, { from: _target_node.id, to: current, original_direction: 0 });
              }
              current = _target_node.id;
              _tmp$2 = _i$2 + 1 | 0;
              continue;
            } else {
              break;
            }
          }
          break;
        }
        case 4: {
          const _Subgraph = stmt;
          const _subgraph = _Subgraph._0;
          const subgraph_edges = antisatori$graphviz$lib$layout$$collect_edges(_subgraph.statements, directed);
          const _len$3 = subgraph_edges.length;
          let _tmp$3 = 0;
          while (true) {
            const _i$2 = _tmp$3;
            if (_i$2 < _len$3) {
              const edge = subgraph_edges[_i$2];
              moonbitlang$core$array$$Array$push$15$(edges, edge);
              _tmp$3 = _i$2 + 1 | 0;
              continue;
            } else {
              break;
            }
          }
          break;
        }
        case 0: {
          break;
        }
        case 2: {
          break;
        }
      }
      _tmp = _i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return edges;
}
function antisatori$graphviz$lib$layout$$extract_label(node_id, attrs) {
  if (attrs === undefined) {
    return node_id;
  } else {
    const _Some = attrs;
    const _attr_list = _Some;
    const _arr = _attr_list.attributes;
    const _len = _arr.length;
    let _tmp = 0;
    while (true) {
      const _i = _tmp;
      if (_i < _len) {
        const attr = _arr[_i];
        if (attr.key === "label") {
          return attr.value;
        }
        _tmp = _i + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    return node_id;
  }
}
function antisatori$graphviz$lib$layout$$collect_nodes(statements) {
  const nodes = moonbitlang$core$builtin$$Map$new$46$inner$21$(8);
  const _len = statements.length;
  let _tmp = 0;
  while (true) {
    const _i = _tmp;
    if (_i < _len) {
      const stmt = statements[_i];
      switch (stmt.$tag) {
        case 0: {
          const _NodeStmt = stmt;
          const _node_id = _NodeStmt._0;
          const _attrs = _NodeStmt._1;
          const label = antisatori$graphviz$lib$layout$$extract_label(_node_id.id, _attrs);
          const _bind = moonbitlang$core$builtin$$Map$get$21$(nodes, _node_id.id);
          if (_bind === undefined) {
            moonbitlang$core$builtin$$Map$set$21$(nodes, _node_id.id, { id: _node_id.id, label: label, incoming: [], outgoing: [] });
          } else {
            const _Some = _bind;
            const _existing_node = _Some;
            _existing_node.label = label;
          }
          break;
        }
        case 1: {
          const _EdgeStmt = stmt;
          const _start_node = _EdgeStmt._0;
          const _edges = _EdgeStmt._1;
          if (!moonbitlang$core$builtin$$Map$contains$21$(nodes, _start_node.id)) {
            moonbitlang$core$builtin$$Map$set$21$(nodes, _start_node.id, { id: _start_node.id, label: _start_node.id, incoming: [], outgoing: [] });
          }
          const _len$2 = _edges.length;
          let _tmp$2 = 0;
          while (true) {
            const _i$2 = _tmp$2;
            if (_i$2 < _len$2) {
              const edge_pair = _edges[_i$2];
              const _target_node = edge_pair._1;
              if (!moonbitlang$core$builtin$$Map$contains$21$(nodes, _target_node.id)) {
                moonbitlang$core$builtin$$Map$set$21$(nodes, _target_node.id, { id: _target_node.id, label: _target_node.id, incoming: [], outgoing: [] });
              }
              _tmp$2 = _i$2 + 1 | 0;
              continue;
            } else {
              break;
            }
          }
          break;
        }
        case 4: {
          const _Subgraph = stmt;
          const _subgraph = _Subgraph._0;
          const subgraph_nodes = antisatori$graphviz$lib$layout$$collect_nodes(_subgraph.statements);
          let _tmp$3 = subgraph_nodes.head;
          while (true) {
            const _p = _tmp$3;
            if (_p === undefined) {
              break;
            } else {
              const _p$2 = _p;
              const _p$3 = _p$2;
              const _p$4 = _p$3.key;
              const _p$5 = _p$3.value;
              const _p$6 = _p$3.next;
              if (!moonbitlang$core$builtin$$Map$contains$21$(nodes, _p$4)) {
                moonbitlang$core$builtin$$Map$set$21$(nodes, _p$4, _p$5);
              }
              _tmp$3 = _p$6;
              continue;
            }
          }
          break;
        }
        case 2: {
          break;
        }
      }
      _tmp = _i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return nodes;
}
function antisatori$graphviz$lib$layout$$extract_graph(graph) {
  const nodes = antisatori$graphviz$lib$layout$$collect_nodes(graph.statements);
  const edges = antisatori$graphviz$lib$layout$$collect_edges(graph.statements, graph.directed);
  return { nodes: nodes, edges: edges, directed: graph.directed };
}
function antisatori$graphviz$lib$layout$$group_by_layer(layer_map) {
  const max_layer = { val: 0 };
  let _tmp = layer_map.head;
  while (true) {
    const _p = _tmp;
    if (_p === undefined) {
      break;
    } else {
      const _p$2 = _p;
      const _p$3 = _p$2;
      _p$3.key;
      const _p$4 = _p$3.value;
      const _p$5 = _p$3.next;
      if (_p$4 > max_layer.val) {
        max_layer.val = _p$4;
      }
      _tmp = _p$5;
      continue;
    }
  }
  const layers = [];
  let _tmp$2 = 0;
  while (true) {
    const i = _tmp$2;
    if (i <= max_layer.val) {
      moonbitlang$core$array$$Array$push$6$(layers, []);
      _tmp$2 = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  let _tmp$3 = layer_map.head;
  while (true) {
    const _p = _tmp$3;
    if (_p === undefined) {
      break;
    } else {
      const _p$2 = _p;
      const _p$3 = _p$2;
      const _p$4 = _p$3.key;
      const _p$5 = _p$3.value;
      const _p$6 = _p$3.next;
      moonbitlang$core$array$$Array$push$8$(moonbitlang$core$array$$Array$at$6$(layers, _p$5), _p$4);
      _tmp$3 = _p$6;
      continue;
    }
  }
  return layers;
}
function antisatori$graphviz$lib$layout$$copy_layers(layers) {
  const new_layers = [];
  const _len = layers.length;
  let _tmp = 0;
  while (true) {
    const _i = _tmp;
    if (_i < _len) {
      const layer = layers[_i];
      const new_layer = [];
      const _len$2 = layer.length;
      let _tmp$2 = 0;
      while (true) {
        const _i$2 = _tmp$2;
        if (_i$2 < _len$2) {
          const node = layer[_i$2];
          moonbitlang$core$array$$Array$push$8$(new_layer, node);
          _tmp$2 = _i$2 + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      moonbitlang$core$array$$Array$push$6$(new_layers, new_layer);
      _tmp = _i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return new_layers;
}
function antisatori$graphviz$lib$layout$$compute_barycenter(node, adjacent_layer, graph, use_incoming) {
  const _bind = moonbitlang$core$builtin$$Map$get$21$(graph.nodes, node);
  let connections;
  if (_bind === undefined) {
    connections = [];
  } else {
    const _Some = _bind;
    const _node_info = _Some;
    connections = use_incoming ? _node_info.incoming : _node_info.outgoing;
  }
  if (connections.length === 0) {
    return (adjacent_layer.length + 0) / 2;
  }
  let sum = 0;
  let count = 0;
  const _len = connections.length;
  let _tmp = 0;
  while (true) {
    const _i = _tmp;
    if (_i < _len) {
      const connected_node = connections[_i];
      let _tmp$2 = 0;
      while (true) {
        const i = _tmp$2;
        if (i < adjacent_layer.length) {
          if (moonbitlang$core$array$$Array$at$8$(adjacent_layer, i) === connected_node) {
            sum = sum + (i + 0);
            count = count + 1 | 0;
            break;
          }
          _tmp$2 = i + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      _tmp = _i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  if (count === 0) {
    return (adjacent_layer.length + 0) / 2;
  }
  return sum / (count + 0);
}
function antisatori$graphviz$lib$layout$$compute_layer_barycenters(current_layer, adjacent_layer, graph, use_incoming) {
  const barycenters = moonbitlang$core$builtin$$Map$new$46$inner$23$(8);
  const _len = current_layer.length;
  let _tmp = 0;
  while (true) {
    const _i = _tmp;
    if (_i < _len) {
      const node = current_layer[_i];
      const barycenter = antisatori$graphviz$lib$layout$$compute_barycenter(node, adjacent_layer, graph, use_incoming);
      moonbitlang$core$builtin$$Map$set$23$(barycenters, node, barycenter);
      _tmp = _i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return barycenters;
}
function antisatori$graphviz$lib$layout$$sort_by_barycenter(layer, barycenters) {
  const pairs = [];
  const _len = layer.length;
  let _tmp = 0;
  while (true) {
    const _i = _tmp;
    if (_i < _len) {
      const node = layer[_i];
      const barycenter = moonbitlang$core$option$$Option$unwrap_or$18$(moonbitlang$core$builtin$$Map$get$23$(barycenters, node), 0);
      moonbitlang$core$array$$Array$push$9$(pairs, { _0: node, _1: barycenter });
      _tmp = _i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  let _tmp$2 = 1;
  while (true) {
    const i = _tmp$2;
    if (i < pairs.length) {
      const key = moonbitlang$core$array$$Array$at$9$(pairs, i);
      let j = i - 1 | 0;
      while (true) {
        if (j >= 0 && moonbitlang$core$array$$Array$at$9$(pairs, j)._1 > key._1) {
          moonbitlang$core$array$$Array$set$9$(pairs, j + 1 | 0, moonbitlang$core$array$$Array$at$9$(pairs, j));
          j = j - 1 | 0;
          continue;
        } else {
          break;
        }
      }
      moonbitlang$core$array$$Array$set$9$(pairs, j + 1 | 0, key);
      _tmp$2 = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const sorted = [];
  const _len$2 = pairs.length;
  let _tmp$3 = 0;
  while (true) {
    const _i = _tmp$3;
    if (_i < _len$2) {
      const pair = pairs[_i];
      const _node = pair._0;
      moonbitlang$core$array$$Array$push$8$(sorted, _node);
      _tmp$3 = _i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return sorted;
}
function antisatori$graphviz$lib$layout$$sweep_down(graph, layers) {
  const new_layers = antisatori$graphviz$lib$layout$$copy_layers(layers);
  let _tmp = 1;
  while (true) {
    const i = _tmp;
    if (i < new_layers.length) {
      const current_layer = moonbitlang$core$array$$Array$at$6$(new_layers, i);
      const previous_layer = moonbitlang$core$array$$Array$at$6$(new_layers, i - 1 | 0);
      const barycenters = antisatori$graphviz$lib$layout$$compute_layer_barycenters(current_layer, previous_layer, graph, true);
      moonbitlang$core$array$$Array$set$6$(new_layers, i, antisatori$graphviz$lib$layout$$sort_by_barycenter(current_layer, barycenters));
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return new_layers;
}
function antisatori$graphviz$lib$layout$$sweep_up(graph, layers) {
  const new_layers = antisatori$graphviz$lib$layout$$copy_layers(layers);
  let _tmp = new_layers.length - 2 | 0;
  while (true) {
    const i = _tmp;
    if (i >= 0) {
      const current_layer = moonbitlang$core$array$$Array$at$6$(new_layers, i);
      const next_layer = moonbitlang$core$array$$Array$at$6$(new_layers, i + 1 | 0);
      const barycenters = antisatori$graphviz$lib$layout$$compute_layer_barycenters(current_layer, next_layer, graph, false);
      moonbitlang$core$array$$Array$set$6$(new_layers, i, antisatori$graphviz$lib$layout$$sort_by_barycenter(current_layer, barycenters));
      _tmp = i - 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return new_layers;
}
function antisatori$graphviz$lib$layout$$minimize_crossings(graph, layers, iterations) {
  let current_layers = antisatori$graphviz$lib$layout$$copy_layers(layers);
  let _tmp = 0;
  while (true) {
    const _iter = _tmp;
    if (_iter < iterations) {
      current_layers = antisatori$graphviz$lib$layout$$sweep_down(graph, current_layers);
      current_layers = antisatori$graphviz$lib$layout$$sweep_up(graph, current_layers);
      _tmp = _iter + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return current_layers;
}
function antisatori$graphviz$lib$layout$$dfs_visit(node, graph, state) {
  moonbitlang$core$builtin$$Map$set$19$(state.visited, node, true);
  moonbitlang$core$builtin$$Map$set$19$(state.on_stack, node, true);
  const _bind = moonbitlang$core$builtin$$Map$get$21$(graph.nodes, node);
  if (_bind === undefined) {
  } else {
    const _Some = _bind;
    const _node_info = _Some;
    const _arr = _node_info.outgoing;
    const _len = _arr.length;
    let _tmp = 0;
    while (true) {
      const _i = _tmp;
      if (_i < _len) {
        const neighbor = _arr[_i];
        const _bind$2 = moonbitlang$core$builtin$$Map$get$19$(state.visited, neighbor);
        if (_bind$2 === -1) {
        } else {
          const _Some$2 = _bind$2;
          const _x = _Some$2;
          if (_x === false) {
            antisatori$graphviz$lib$layout$$dfs_visit(neighbor, graph, state);
          } else {
            const _bind$3 = moonbitlang$core$builtin$$Map$get$19$(state.on_stack, neighbor);
            if (_bind$3 === -1) {
            } else {
              const _Some$3 = _bind$3;
              const _x$2 = _Some$3;
              if (_x$2 === true) {
                moonbitlang$core$array$$Array$push$16$(state.reversed_edges, { _0: node, _1: neighbor });
              }
            }
          }
        }
        _tmp = _i + 1 | 0;
        continue;
      } else {
        break;
      }
    }
  }
  moonbitlang$core$builtin$$Map$set$19$(state.on_stack, node, false);
}
function antisatori$graphviz$lib$layout$$reverse_edges(graph, to_reverse) {
  const new_edges = [];
  const _arr = graph.edges;
  const _len = _arr.length;
  let _tmp = 0;
  while (true) {
    const _i = _tmp;
    if (_i < _len) {
      const edge = _arr[_i];
      let should_reverse = false;
      const _len$2 = to_reverse.length;
      let _tmp$2 = 0;
      while (true) {
        const _i$2 = _tmp$2;
        if (_i$2 < _len$2) {
          const pair = to_reverse[_i$2];
          const _from = pair._0;
          const _to = pair._1;
          if (edge.from === _from && edge.to === _to) {
            should_reverse = true;
            break;
          }
          _tmp$2 = _i$2 + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      if (should_reverse) {
        moonbitlang$core$array$$Array$push$15$(new_edges, { from: edge.to, to: edge.from, original_direction: 1 });
      } else {
        moonbitlang$core$array$$Array$push$15$(new_edges, edge);
      }
      _tmp = _i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return antisatori$graphviz$lib$layout$$build_adjacency_lists({ nodes: graph.nodes, edges: new_edges, directed: graph.directed });
}
function antisatori$graphviz$lib$layout$$remove_cycles(graph) {
  const _bind = moonbitlang$core$builtin$$Map$new$46$inner$19$(8);
  const _bind$2 = moonbitlang$core$builtin$$Map$new$46$inner$19$(8);
  const _bind$3 = [];
  const state = { visited: _bind, on_stack: _bind$2, reversed_edges: _bind$3 };
  const _p = graph.nodes;
  let _tmp = _p.head;
  while (true) {
    const _p$2 = _tmp;
    if (_p$2 === undefined) {
      break;
    } else {
      const _p$3 = _p$2;
      const _p$4 = _p$3;
      const _p$5 = _p$4.key;
      _p$4.value;
      const _p$6 = _p$4.next;
      moonbitlang$core$builtin$$Map$set$19$(_bind, _p$5, false);
      _tmp = _p$6;
      continue;
    }
  }
  const _p$2 = graph.nodes;
  let _tmp$2 = _p$2.head;
  while (true) {
    const _p$3 = _tmp$2;
    if (_p$3 === undefined) {
      break;
    } else {
      const _p$4 = _p$3;
      const _p$5 = _p$4;
      const _p$6 = _p$5.key;
      _p$5.value;
      const _p$7 = _p$5.next;
      const _p$8 = moonbitlang$core$builtin$$Map$get$19$(_bind, _p$6);
      if (_p$8 === -1) {
      } else {
        const _p$9 = _p$8;
        const _p$10 = _p$9;
        if (_p$10 === false) {
          antisatori$graphviz$lib$layout$$dfs_visit(_p$6, graph, state);
        }
      }
      _tmp$2 = _p$7;
      continue;
    }
  }
  return antisatori$graphviz$lib$layout$$reverse_edges(graph, _bind$3);
}
function antisatori$graphviz$lib$layout$$compute_edge_endpoints(from_node, to_node) {
  const source_point = { x: from_node.position.x + from_node.size.width / 2, y: from_node.position.y + from_node.size.height };
  const target_point = { x: to_node.position.x + to_node.size.width / 2, y: to_node.position.y };
  return { _0: source_point, _1: target_point };
}
function antisatori$graphviz$lib$layout$$create_layout_edge(edge, from_node, to_node) {
  const _bind = antisatori$graphviz$lib$layout$$compute_edge_endpoints(from_node, to_node);
  const _source_point = _bind._0;
  const _target_point = _bind._1;
  return { from: edge.from, to: edge.to, waypoints: [_source_point, _target_point], reversed: moonbitlang$core$builtin$$Eq$equal$27$(edge.original_direction, 1) };
}
function antisatori$graphviz$lib$layout$$route_edges(graph, node_positions, _config) {
  const edges = [];
  const _arr = graph.edges;
  const _len = _arr.length;
  let _tmp = 0;
  while (true) {
    const _i = _tmp;
    if (_i < _len) {
      const edge = _arr[_i];
      const _bind = moonbitlang$core$builtin$$Map$get$20$(node_positions, edge.from);
      const _bind$2 = moonbitlang$core$builtin$$Map$get$20$(node_positions, edge.to);
      if (_bind === undefined) {
      } else {
        const _Some = _bind;
        const _from_node = _Some;
        if (_bind$2 === undefined) {
        } else {
          const _Some$2 = _bind$2;
          const _to_node = _Some$2;
          const layout_edge = antisatori$graphviz$lib$layout$$create_layout_edge(edge, _from_node, _to_node);
          moonbitlang$core$array$$Array$push$13$(edges, layout_edge);
        }
      }
      _tmp = _i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return edges;
}
function antisatori$graphviz$lib$layout$$compute_layout_with_config(graph, config) {
  const internal = antisatori$graphviz$lib$layout$$extract_graph(graph);
  const internal_with_adj = antisatori$graphviz$lib$layout$$build_adjacency_lists(internal);
  const acyclic = antisatori$graphviz$lib$layout$$remove_cycles(internal_with_adj);
  const layer_map = antisatori$graphviz$lib$layout$$assign_layers(acyclic);
  const layers = antisatori$graphviz$lib$layout$$group_by_layer(layer_map);
  const ordered_layers = antisatori$graphviz$lib$layout$$minimize_crossings(acyclic, layers, 24);
  const node_positions = antisatori$graphviz$lib$layout$$assign_coordinates(ordered_layers, internal_with_adj.nodes, config);
  const edges = antisatori$graphviz$lib$layout$$route_edges(acyclic, node_positions, config);
  const bounds = antisatori$graphviz$lib$layout$$calculate_bounds(node_positions);
  return { nodes: node_positions, edges: edges, bounds: bounds, layers: ordered_layers, directed: graph.directed };
}
function antisatori$graphviz$lib$svg$$render_edge(buf, edge, directed, config) {
  if (edge.waypoints.length < 2) {
    return undefined;
  }
  moonbitlang$core$builtin$$Logger$write_string$0$(buf, "  <polyline points=\"");
  const _arr = edge.waypoints;
  const _len = _arr.length;
  let _tmp = 0;
  while (true) {
    const _i = _tmp;
    if (_i < _len) {
      const point = _arr[_i];
      if (_i > 0) {
        moonbitlang$core$builtin$$Logger$write_string$0$(buf, " ");
      }
      moonbitlang$core$builtin$$Logger$write_string$0$(buf, moonbitlang$core$double$$Double$to_string(point.x));
      moonbitlang$core$builtin$$Logger$write_string$0$(buf, ",");
      moonbitlang$core$builtin$$Logger$write_string$0$(buf, moonbitlang$core$double$$Double$to_string(point.y));
      _tmp = _i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  moonbitlang$core$builtin$$Logger$write_string$0$(buf, "\" fill=\"none\" stroke=\"");
  moonbitlang$core$builtin$$Logger$write_string$0$(buf, config.edge_stroke);
  moonbitlang$core$builtin$$Logger$write_string$0$(buf, "\" stroke-width=\"");
  moonbitlang$core$builtin$$Logger$write_string$0$(buf, moonbitlang$core$double$$Double$to_string(config.edge_stroke_width));
  moonbitlang$core$builtin$$Logger$write_string$0$(buf, "\"");
  if (directed && !edge.reversed) {
    moonbitlang$core$builtin$$Logger$write_string$0$(buf, " marker-end=\"url(#arrowhead)\"");
  } else {
    if (directed && edge.reversed) {
      moonbitlang$core$builtin$$Logger$write_string$0$(buf, " marker-start=\"url(#arrowhead)\"");
    }
  }
  moonbitlang$core$builtin$$Logger$write_string$0$(buf, " />\n");
}
function antisatori$graphviz$lib$svg$$escape_xml(s) {
  let result = s;
  result = moonbitlang$core$string$$String$replace(result, { str: antisatori$graphviz$lib$svg$$escape_xml$46$42$bind$124$73, start: 0, end: antisatori$graphviz$lib$svg$$escape_xml$46$42$bind$124$73.length }, { str: antisatori$graphviz$lib$svg$$escape_xml$46$42$bind$124$74, start: 0, end: antisatori$graphviz$lib$svg$$escape_xml$46$42$bind$124$74.length });
  result = moonbitlang$core$string$$String$replace(result, { str: antisatori$graphviz$lib$svg$$escape_xml$46$42$bind$124$75, start: 0, end: antisatori$graphviz$lib$svg$$escape_xml$46$42$bind$124$75.length }, { str: antisatori$graphviz$lib$svg$$escape_xml$46$42$bind$124$76, start: 0, end: antisatori$graphviz$lib$svg$$escape_xml$46$42$bind$124$76.length });
  result = moonbitlang$core$string$$String$replace(result, { str: antisatori$graphviz$lib$svg$$escape_xml$46$42$bind$124$77, start: 0, end: antisatori$graphviz$lib$svg$$escape_xml$46$42$bind$124$77.length }, { str: antisatori$graphviz$lib$svg$$escape_xml$46$42$bind$124$78, start: 0, end: antisatori$graphviz$lib$svg$$escape_xml$46$42$bind$124$78.length });
  result = moonbitlang$core$string$$String$replace(result, { str: antisatori$graphviz$lib$svg$$escape_xml$46$42$bind$124$79, start: 0, end: antisatori$graphviz$lib$svg$$escape_xml$46$42$bind$124$79.length }, { str: antisatori$graphviz$lib$svg$$escape_xml$46$42$bind$124$80, start: 0, end: antisatori$graphviz$lib$svg$$escape_xml$46$42$bind$124$80.length });
  result = moonbitlang$core$string$$String$replace(result, { str: antisatori$graphviz$lib$svg$$escape_xml$46$42$bind$124$81, start: 0, end: antisatori$graphviz$lib$svg$$escape_xml$46$42$bind$124$81.length }, { str: antisatori$graphviz$lib$svg$$escape_xml$46$42$bind$124$82, start: 0, end: antisatori$graphviz$lib$svg$$escape_xml$46$42$bind$124$82.length });
  return result;
}
function antisatori$graphviz$lib$svg$$render_node(buf, node, config) {
  moonbitlang$core$builtin$$Logger$write_string$0$(buf, "  <g>\n");
  moonbitlang$core$builtin$$Logger$write_string$0$(buf, "    <rect x=\"");
  moonbitlang$core$builtin$$Logger$write_string$0$(buf, moonbitlang$core$double$$Double$to_string(node.position.x));
  moonbitlang$core$builtin$$Logger$write_string$0$(buf, "\" y=\"");
  moonbitlang$core$builtin$$Logger$write_string$0$(buf, moonbitlang$core$double$$Double$to_string(node.position.y));
  moonbitlang$core$builtin$$Logger$write_string$0$(buf, "\" width=\"");
  moonbitlang$core$builtin$$Logger$write_string$0$(buf, moonbitlang$core$double$$Double$to_string(node.size.width));
  moonbitlang$core$builtin$$Logger$write_string$0$(buf, "\" height=\"");
  moonbitlang$core$builtin$$Logger$write_string$0$(buf, moonbitlang$core$double$$Double$to_string(node.size.height));
  moonbitlang$core$builtin$$Logger$write_string$0$(buf, "\" fill=\"");
  moonbitlang$core$builtin$$Logger$write_string$0$(buf, config.node_fill);
  moonbitlang$core$builtin$$Logger$write_string$0$(buf, "\" stroke=\"");
  moonbitlang$core$builtin$$Logger$write_string$0$(buf, config.node_stroke);
  moonbitlang$core$builtin$$Logger$write_string$0$(buf, "\" stroke-width=\"");
  moonbitlang$core$builtin$$Logger$write_string$0$(buf, moonbitlang$core$double$$Double$to_string(config.node_stroke_width));
  moonbitlang$core$builtin$$Logger$write_string$0$(buf, "\" rx=\"4\" />\n");
  const text_x = node.position.x + node.size.width / 2;
  const text_y = node.position.y + node.size.height / 2 + config.font_size / 3;
  moonbitlang$core$builtin$$Logger$write_string$0$(buf, "    <text x=\"");
  moonbitlang$core$builtin$$Logger$write_string$0$(buf, moonbitlang$core$double$$Double$to_string(text_x));
  moonbitlang$core$builtin$$Logger$write_string$0$(buf, "\" y=\"");
  moonbitlang$core$builtin$$Logger$write_string$0$(buf, moonbitlang$core$double$$Double$to_string(text_y));
  moonbitlang$core$builtin$$Logger$write_string$0$(buf, "\" text-anchor=\"middle\" fill=\"");
  moonbitlang$core$builtin$$Logger$write_string$0$(buf, config.text_color);
  moonbitlang$core$builtin$$Logger$write_string$0$(buf, "\" font-size=\"");
  moonbitlang$core$builtin$$Logger$write_string$0$(buf, moonbitlang$core$double$$Double$to_string(config.font_size));
  moonbitlang$core$builtin$$Logger$write_string$0$(buf, "\" font-family=\"");
  moonbitlang$core$builtin$$Logger$write_string$0$(buf, config.font_family);
  moonbitlang$core$builtin$$Logger$write_string$0$(buf, "\">");
  moonbitlang$core$builtin$$Logger$write_string$0$(buf, antisatori$graphviz$lib$svg$$escape_xml(node.label));
  moonbitlang$core$builtin$$Logger$write_string$0$(buf, "</text>\n");
  moonbitlang$core$builtin$$Logger$write_string$0$(buf, "  </g>\n");
}
function antisatori$graphviz$lib$svg$$render_svg_with_config(layout, config) {
  const buf = moonbitlang$core$builtin$$StringBuilder$new$46$inner(0);
  const vb_x = layout.bounds.min_x - config.padding;
  const vb_y = layout.bounds.min_y - config.padding;
  const vb_width = layout.bounds.max_x - layout.bounds.min_x + 2 * config.padding;
  const vb_height = layout.bounds.max_y - layout.bounds.min_y + 2 * config.padding;
  moonbitlang$core$builtin$$Logger$write_string$0$(buf, "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n");
  moonbitlang$core$builtin$$Logger$write_string$0$(buf, "<svg xmlns=\"http://www.w3.org/2000/svg\" ");
  moonbitlang$core$builtin$$Logger$write_string$0$(buf, "viewBox=\"");
  moonbitlang$core$builtin$$Logger$write_string$0$(buf, moonbitlang$core$double$$Double$to_string(vb_x));
  moonbitlang$core$builtin$$Logger$write_string$0$(buf, " ");
  moonbitlang$core$builtin$$Logger$write_string$0$(buf, moonbitlang$core$double$$Double$to_string(vb_y));
  moonbitlang$core$builtin$$Logger$write_string$0$(buf, " ");
  moonbitlang$core$builtin$$Logger$write_string$0$(buf, moonbitlang$core$double$$Double$to_string(vb_width));
  moonbitlang$core$builtin$$Logger$write_string$0$(buf, " ");
  moonbitlang$core$builtin$$Logger$write_string$0$(buf, moonbitlang$core$double$$Double$to_string(vb_height));
  moonbitlang$core$builtin$$Logger$write_string$0$(buf, "\">\n");
  if (layout.directed) {
    moonbitlang$core$builtin$$Logger$write_string$0$(buf, "  <defs>\n");
    moonbitlang$core$builtin$$Logger$write_string$0$(buf, "    <marker id=\"arrowhead\" markerWidth=\"10\" markerHeight=\"10\" ");
    moonbitlang$core$builtin$$Logger$write_string$0$(buf, "refX=\"9\" refY=\"3\" orient=\"auto\">\n");
    moonbitlang$core$builtin$$Logger$write_string$0$(buf, "      <polygon points=\"0 0, 10 3, 0 6\" fill=\"");
    moonbitlang$core$builtin$$Logger$write_string$0$(buf, config.edge_stroke);
    moonbitlang$core$builtin$$Logger$write_string$0$(buf, "\" />\n");
    moonbitlang$core$builtin$$Logger$write_string$0$(buf, "    </marker>\n");
    moonbitlang$core$builtin$$Logger$write_string$0$(buf, "  </defs>\n");
  }
  moonbitlang$core$builtin$$Logger$write_string$0$(buf, "\n  <!-- Edges -->\n");
  const _arr = layout.edges;
  const _len = _arr.length;
  let _tmp = 0;
  while (true) {
    const _i = _tmp;
    if (_i < _len) {
      const edge = _arr[_i];
      antisatori$graphviz$lib$svg$$render_edge(buf, edge, layout.directed, config);
      _tmp = _i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  moonbitlang$core$builtin$$Logger$write_string$0$(buf, "\n  <!-- Nodes -->\n");
  const _p = layout.nodes;
  let _tmp$2 = _p.head;
  while (true) {
    const _p$2 = _tmp$2;
    if (_p$2 === undefined) {
      break;
    } else {
      const _p$3 = _p$2;
      const _p$4 = _p$3;
      _p$4.key;
      const _p$5 = _p$4.value;
      const _p$6 = _p$4.next;
      antisatori$graphviz$lib$svg$$render_node(buf, _p$5, config);
      _tmp$2 = _p$6;
      continue;
    }
  }
  moonbitlang$core$builtin$$Logger$write_string$0$(buf, "</svg>\n");
  return buf.val;
}
function antisatori$graphviz$browser$$render_dot_to_svg(dot_string) {
  const _bind = antisatori$graphviz$lib$parser$$parse_dot(dot_string);
  if (_bind === undefined) {
    return "";
  } else {
    const _Some = _bind;
    const _graph = _Some;
    const compact_config = antisatori$graphviz$lib$layout$$compact$46$record$47$1281;
    const layout = antisatori$graphviz$lib$layout$$compute_layout_with_config(_graph, compact_config);
    const dark_config = antisatori$graphviz$lib$svg$$dark_theme$46$record$47$1282;
    return antisatori$graphviz$lib$svg$$render_svg_with_config(layout, dark_config);
  }
}
export { antisatori$graphviz$browser$$render_dot_to_svg as render_dot_to_svg }
