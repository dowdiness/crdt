///|
pub struct PrettyLayout {
  layout : @pretty.Layout[@pretty.Ann]
}

///|
fn tagged(
  cat : @pretty.SyntaxCategory,
  s : String,
) -> @pretty.Layout[@pretty.Ann] {
  @pretty.annotate({ category: cat, node_id: None }, @pretty.text(s))
}

///|
fn kw(s : String) -> @pretty.Layout[@pretty.Ann] {
  tagged(Keyword, s)
}

///|
fn ident(s : String) -> @pretty.Layout[@pretty.Ann] {
  tagged(Identifier, s)
}

///|
fn num(s : String) -> @pretty.Layout[@pretty.Ann] {
  tagged(Number, s)
}

///|
fn op(s : String) -> @pretty.Layout[@pretty.Ann] {
  tagged(Operator, s)
}

///|
fn punc(s : String) -> @pretty.Layout[@pretty.Ann] {
  tagged(Punctuation, s)
}

///|
fn err(s : String) -> @pretty.Layout[@pretty.Ann] {
  tagged(Error, s)
}

///|
pub impl @ast.TermSym for PrettyLayout with int_lit(n) {
  { layout: num(n.to_string()) }
}

///|
pub impl @ast.TermSym for PrettyLayout with var(name) {
  { layout: ident(name) }
}

///|
pub impl @ast.TermSym for PrettyLayout with unit() {
  { layout: punc("()") }
}

///|
pub impl @ast.TermSym for PrettyLayout with lam(x, body) {
  {
    layout: @pretty.group(
      kw("λ") +
      ident(x) +
      punc(".") +
      @pretty.nest(@pretty.line() + body.layout),
    ),
  }
}

///|
pub impl @ast.TermSym for PrettyLayout with app(f, arg) {
  {
    layout: @pretty.group(f.layout + @pretty.nest(@pretty.line() + arg.layout)),
  }
}

///|
pub impl @ast.TermSym for PrettyLayout with bop(b, l, r) {
  let sym = match b {
    @ast.Bop::Plus => "+"
    @ast.Bop::Minus => "-"
  }
  {
    layout: @pretty.group(
      l.layout +
      @pretty.text(" ") +
      op(sym) +
      @pretty.nest(@pretty.line() + r.layout),
    ),
  }
}

///|
pub impl @ast.TermSym for PrettyLayout with if_then_else(cond, then_, else_) {
  {
    layout: @pretty.group(
      kw("if") +
      @pretty.text(" ") +
      cond.layout +
      @pretty.nest(
        @pretty.line() +
        kw("then") +
        @pretty.text(" ") +
        then_.layout +
        @pretty.line() +
        kw("else") +
        @pretty.text(" ") +
        else_.layout,
      ),
    ),
  }
}

///|
pub impl @ast.TermSym for PrettyLayout with module(defs, body) {
  let def_layouts : Array[@pretty.Layout[@pretty.Ann]] = defs.map(fn(d) {
    let (name, val) = d
    kw("let") +
    @pretty.text(" ") +
    ident(name) +
    @pretty.text(" ") +
    op("=") +
    @pretty.text(" ") +
    @pretty.nest(val.layout)
  })
  let defs_doc = @pretty.separate(@pretty.hardline(), def_layouts)
  let result = if def_layouts.is_empty() {
    body.layout
  } else {
    defs_doc + @pretty.hardline() + body.layout
  }
  { layout: result }
}

///|
pub impl @ast.TermSym for PrettyLayout with unbound(name) {
  { layout: err("<unbound: " + name + ">") }
}

///|
pub impl @ast.TermSym for PrettyLayout with error_term(msg) {
  { layout: err("<error: " + msg + ">") }
}

///|
pub impl @ast.TermSym for PrettyLayout with hole(_n) {
  { layout: err("_") }
}
