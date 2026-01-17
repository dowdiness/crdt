// Lens: Bidirectional Transformation Abstraction for Projectional Editing
//
// A lens provides a bidirectional mapping between a Model (source of truth)
// and a Projection (view). The key properties are:
// - get: Extract a projection from the model
// - put: Update the model with changes from the projection
// - Laws: get(put(m, p)) ≈ p (PutGet), put(m, get(m)) = m (GetPut)
//
// Since MoonBit doesn't support traits with type parameters, we use a
// record-based lens representation (similar to van Laarhoven lenses).

///|
/// Lens record for bidirectional transformations
/// M = Model type (source of truth)
/// P = Projection type (view)
pub struct Lens[M, P] {
  /// Get the projection from the model (forward direction)
  /// Model → Projection
  get : (M) -> Result[P, String]
  /// Put the projection back into the model (backward direction)
  /// Updates the model to reflect changes in the projection
  /// (Model, Projection) → Model
  put : (M, P) -> Result[M, String]
}

///|
/// Create a lens from get and put functions
pub fn[M, P] Lens::new(
  get : (M) -> Result[P, String],
  put : (M, P) -> Result[M, String],
) -> Lens[M, P] {
  { get, put }
}

///|
/// LensDiff extends Lens with diff capability
/// This is useful for computing edits between projections
pub struct LensDiff[M, P, E] {
  /// The underlying lens
  lens : Lens[M, P]
  /// Compute the difference between two projections
  diff : (P, P) -> Array[E]
}

///|
/// Create a LensDiff from a lens and diff function
pub fn[M, P, E] LensDiff::new(
  lens : Lens[M, P],
  diff : (P, P) -> Array[E],
) -> LensDiff[M, P, E] {
  { lens, diff }
}

///|
/// A projection edit represents a change in a specific projection
pub enum ProjectionEdit {
  /// Text was inserted at a position
  TextInsert(position~ : Int, text~ : String)
  /// Text was deleted from a range
  TextDelete(start~ : Int, end~ : Int)
  /// A node was selected
  NodeSelect(node_id~ : NodeId)
  /// A node's value was changed
  NodeValueChange(node_id~ : NodeId, new_value~ : LeafValue)
  /// A structural change occurred
  StructuralChange(operation~ : ModelOperation)
} derive(Show)

///|
/// Compose two lenses: Lens[A, B] and Lens[B, C] → Lens[A, C]
pub fn[A, B, C] compose(first : Lens[A, B], second : Lens[B, C]) -> Lens[A, C] {
  {
    get: fn(model : A) -> Result[C, String] {
      match (first.get)(model) {
        Ok(intermediate) => (second.get)(intermediate)
        Err(e) => Err(e)
      }
    },
    put: fn(model : A, projection : C) -> Result[A, String] {
      match (first.get)(model) {
        Ok(intermediate) =>
          match (second.put)(intermediate, projection) {
            Ok(new_intermediate) => (first.put)(model, new_intermediate)
            Err(e) => Err(e)
          }
        Err(e) => Err(e)
      }
    },
  }
}

///|
/// Apply a function to the projection and put it back (the "over" operation)
pub fn[M, P] over(
  lens : Lens[M, P],
  model : M,
  f : (P) -> P,
) -> Result[M, String] {
  match (lens.get)(model) {
    Ok(projection) => (lens.put)(model, f(projection))
    Err(e) => Err(e)
  }
}

///|
/// View through a lens (alias for get)
pub fn[M, P] view(lens : Lens[M, P], model : M) -> Result[P, String] {
  (lens.get)(model)
}

///|
/// Set through a lens (alias for put)
pub fn[M, P] set(lens : Lens[M, P], model : M, value : P) -> Result[M, String] {
  (lens.put)(model, value)
}

///|
/// Identity lens: passes the value through unchanged
pub fn[M] identity() -> Lens[M, M] {
  {
    get: fn(m : M) -> Result[M, String] { Ok(m) },
    put: fn(_m : M, p : M) -> Result[M, String] { Ok(p) },
  }
}
