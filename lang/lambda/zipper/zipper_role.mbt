///|
pub(all) enum PositionRole {
  Root
  FunctionPosition
  ArgumentPosition
  BinderBody(@ast.VarName)
  Condition
  ThenBranch
  ElseBranch
  OperandLeft(@ast.Bop)
  OperandRight(@ast.Bop)
  LetDefinition(@ast.VarName)
  LetBody
} derive(Show)

///|
pub fn position_role(z : Zipper) -> PositionRole {
  match z.path {
    Empty => Root
    More(ctx, tail=_) =>
      match ctx {
        CtxLamBody(param) => BinderBody(param)
        CtxAppFunc(_) => FunctionPosition
        CtxAppArg(_) => ArgumentPosition
        CtxBopLeft(op, _) => OperandLeft(op)
        CtxBopRight(op, _) => OperandRight(op)
        CtxIfCond(_, _) => Condition
        CtxIfThen(_, _) => ThenBranch
        CtxIfElse(_, _) => ElseBranch
        CtxModuleDef(_, name, _, _) => LetDefinition(name)
        CtxModuleBody(_) => LetBody
      }
  }
}
