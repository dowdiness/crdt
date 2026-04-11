// Tier 3: EGraph-based algebraic optimization.
// Wraps @lambda_opt.optimize for use in the eval annotation pipeline.

///|
/// Optimize a term via equality saturation.
/// Returns the simplified form if it differs from the input,
/// or None if the optimizer produces the same expression.
pub fn optimize_term(term : @ast.Term) -> @ast.Term? {
  let result = @lambda_opt.optimize(term)
  if result == term {
    None
  } else {
    Some(result)
  }
}
