// Property-based tests for VersionVector using QuickCheck
//
// These tests verify fundamental algebraic properties of version vectors
// using Arbitrary and Shrink traits for automatic test generation and minimization.

///|
/// Property: Reflexivity - a version vector is always <= itself
fn prop_reflexivity(vv : VersionVector) -> Bool {
  vv <= vv
}

///|
test "property: version vector reflexivity (a <= a)" {
  @qc.quick_check_fn(prop_reflexivity)
}

///|
/// Property: Transitivity - if a <= b and b <= c, then a <= c
fn prop_transitivity(
  vvs : (VersionVector, VersionVector, VersionVector),
) -> Bool {
  let (vv_a, vv_b, vv_c) = vvs
  // Only check transitivity when the premise holds
  if vv_a <= vv_b && vv_b <= vv_c {
    vv_a <= vv_c
  } else {
    true // Premise doesn't hold, so property is vacuously true
  }
}

///|
test "property: version vector transitivity" {
  @qc.quick_check_fn(prop_transitivity)
}

///|
/// Property: Antisymmetry - if a <= b and b <= a, then a == b
fn prop_antisymmetry(pair : (VersionVector, VersionVector)) -> Bool {
  let (vv_a, vv_b) = pair
  if vv_a <= vv_b && vv_b <= vv_a {
    vv_a == vv_b
  } else {
    true
  }
}

///|
test "property: version vector antisymmetry" {
  @qc.quick_check_fn(prop_antisymmetry)
}

///|
/// Property: Merge commutativity - merge(a, b) == merge(b, a)
fn prop_merge_commutative(pair : (VersionVector, VersionVector)) -> Bool {
  let (vv_a, vv_b) = pair
  let merged_ab = vv_a.merge(vv_b)
  let merged_ba = vv_b.merge(vv_a)
  merged_ab == merged_ba
}

///|
test "property: merge is commutative" {
  @qc.quick_check_fn(prop_merge_commutative)
}

///|
/// Property: Merge idempotence - merge(a, a) == a
fn prop_merge_idempotent(vv : VersionVector) -> Bool {
  let merged = vv.merge(vv)
  merged == vv
}

///|
test "property: merge is idempotent" {
  @qc.quick_check_fn(prop_merge_idempotent)
}

///|
/// Property: Merge associativity - merge(merge(a, b), c) == merge(a, merge(b, c))
fn prop_merge_associative(
  triple : (VersionVector, VersionVector, VersionVector),
) -> Bool {
  let (vv_a, vv_b, vv_c) = triple
  let merged_abc = vv_a.merge(vv_b).merge(vv_c)
  let merged_bca = vv_a.merge(vv_b.merge(vv_c))
  merged_abc == merged_bca
}

///|
test "property: merge is associative" {
  @qc.quick_check_fn(prop_merge_associative)
}

///|
/// Property: Merge increases or maintains version numbers
fn prop_merge_preserves(pair : (VersionVector, VersionVector)) -> Bool {
  let (vv_a, vv_b) = pair
  let merged = vv_a.merge(vv_b)
  // Merged version should be >= both inputs
  vv_a <= merged && vv_b <= merged
}

///|
test "property: merge preserves or increases versions" {
  @qc.quick_check_fn(prop_merge_preserves)
}

///|
/// Property: Concurrent symmetry - concurrent(a, b) == concurrent(b, a)
fn prop_concurrent_symmetric(pair : (VersionVector, VersionVector)) -> Bool {
  let (vv_a, vv_b) = pair
  vv_a.concurrent(vv_b) == vv_b.concurrent(vv_a)
}

///|
test "property: concurrent is symmetric" {
  @qc.quick_check_fn(prop_concurrent_symmetric)
}

///|
/// Property: If not concurrent, one must be <= the other
fn prop_total_order_or_concurrent(
  pair : (VersionVector, VersionVector),
) -> Bool {
  let (vv_a, vv_b) = pair
  if not(vv_a.concurrent(vv_b)) {
    // One must be <= the other
    vv_a <= vv_b || vv_b <= vv_a
  } else {
    true
  }
}

///|
test "property: total order or concurrent" {
  @qc.quick_check_fn(prop_total_order_or_concurrent)
}

///|
/// Property: Empty version vector is <= any version vector
fn prop_empty_is_minimal(vv : VersionVector) -> Bool {
  let empty = VersionVector::new()
  empty <= vv
}

///|
test "property: empty is minimal" {
  @qc.quick_check_fn(prop_empty_is_minimal)
}

///|
/// Property: Set with larger value makes version vector larger
fn prop_set_increases(vv : VersionVector) -> Bool {
  // Pick first agent if any, otherwise use a new agent
  let agents = vv.agents()
  let agent = if agents.length() > 0 { agents[0] } else { "test" }
  let current_seq = match vv.get(agent) {
    Some(seq) => seq
    None => 0
  }
  let vv2 = vv.set(agent, current_seq + 5)
  // vv should be <= vv2 after increasing sequence
  vv <= vv2
}

///|
test "property: set with larger value increases version" {
  @qc.quick_check_fn(prop_set_increases)
}

///|
/// Property: Includes is consistent with <=
fn prop_includes_consistent(pair : (VersionVector, VersionVector)) -> Bool {
  let (vv_a, vv_b) = pair
  // If vv_a <= vv_b, then all versions in vv_a should be included in vv_b
  if vv_a <= vv_b {
    let mut all_included = true
    vv_a
    .agents()
    .each(fn(agent) {
      match vv_a.get(agent) {
        Some(seq) => if not(vv_b.includes(agent, seq)) { all_included = false }
        None => ()
      }
    })
    all_included
  } else {
    true
  }
}

///|
test "property: includes consistent with comparison" {
  @qc.quick_check_fn(prop_includes_consistent)
}

///|
/// Property: Size equals number of agents
fn prop_size_equals_agents(vv : VersionVector) -> Bool {
  vv.size() == vv.agents().length()
}

///|
test "property: size equals agent count" {
  @qc.quick_check_fn(prop_size_equals_agents)
}

///|
/// Property: Empty version vector has size 0
fn prop_empty_size_zero(_unit : Unit) -> Bool {
  let vv = VersionVector::new()
  vv.is_empty() && vv.size() == 0
}

///|
test "property: empty has size zero" {
  @qc.quick_check_fn(prop_empty_size_zero)
}

///|
/// Property: Equality is symmetric
fn prop_equality_symmetric(pair : (VersionVector, VersionVector)) -> Bool {
  let (vv_a, vv_b) = pair
  (vv_a == vv_b) == (vv_b == vv_a)
}

///|
test "property: equality is symmetric" {
  @qc.quick_check_fn(prop_equality_symmetric)
}

///|
/// Property: Equality is transitive
fn prop_equality_transitive(
  triple : (VersionVector, VersionVector, VersionVector),
) -> Bool {
  let (vv_a, vv_b, vv_c) = triple
  if vv_a == vv_b && vv_b == vv_c {
    vv_a == vv_c
  } else {
    true
  }
}

///|
test "property: equality is transitive" {
  @qc.quick_check_fn(prop_equality_transitive)
}

///|
/// Property: Agents returns all agent IDs correctly
fn prop_agents_correct(vv : VersionVector) -> Bool {
  let agents = vv.agents()
  // Every agent in agents() should have a value in the version vector
  let mut all_have_values = true
  agents.each(fn(agent) {
    match vv.get(agent) {
      Some(_) => ()
      None => all_have_values = false
    }
  })
  all_have_values
}

///|
test "property: agents returns all agent IDs" {
  @qc.quick_check_fn(prop_agents_correct)
}
