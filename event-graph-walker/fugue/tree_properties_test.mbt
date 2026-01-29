///|
/// Property-based tests for FugueTree

///|
/// Generated concurrent insert operations for determinism property test
pub(all) struct InsertOp {
  id : Int
  content : String
  ts : Int
  agent : String
} derive(Show)

///|
pub(all) struct InsertOpSet {
  ops : Array[InsertOp]
  shuffle_seed : UInt64
} derive(Show)

///|
/// Arbitrary instance for InsertOpSet
pub impl @quickcheck.Arbitrary for InsertOpSet with arbitrary(
  size,
  random_state,
) {
  let chars : Array[Char] = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
    'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  ]
  let size_cap = if size < 0 { 0 } else { size }
  let max_len = chars.length()
  let len = if max_len == 0 { 0 } else { @cmp.minimum(size_cap, max_len) }
  let ops : Array[InsertOp] = []
  let rs = random_state.split()
  for i = 0; i < len; i = i + 1 {
    let id = 10 + i
    let content = chars[i % chars.length()].to_string()
    let ts = rs.next_uint64().to_int().abs() % 1000
    let agent_id = rs.next_uint64().to_int().abs()
    let agent = "agent-\{agent_id}"
    ops.push({ id, content, ts, agent })
  }
  let shuffle_seed = rs.next_uint64()
  { ops, shuffle_seed }
}

///|
/// Shrink instance for InsertOpSet
pub impl @qc.Shrink for InsertOpSet with shrink(self) {
  let results : Array[InsertOpSet] = []
  let ops = self.ops
  let len = ops.length()
  if len > 0 {
    results.push({ ops: [], shuffle_seed: self.shuffle_seed })
    let half = len / 2
    if half > 0 {
      results.push({
        ops: ops[:half].to_array(),
        shuffle_seed: self.shuffle_seed,
      })
    }
    results.push({
      ops: ops[:len - 1].to_array(),
      shuffle_seed: self.shuffle_seed,
    })
  }
  results.iter()
}

///|
/// Compare insert ops using Fugue ordering (ts, agent, id).
fn compare_ops(a : InsertOp, b : InsertOp) -> Int {
  let ts_cmp = a.ts.compare(b.ts)
  if ts_cmp != 0 {
    return ts_cmp
  }
  let agent_cmp = a.agent.compare(b.agent)
  if agent_cmp != 0 {
    return agent_cmp
  }
  a.id.compare(b.id)
}

///|
/// Build expected text from ordered ops between L and R.
fn expected_text_from_ops(ops : Array[InsertOp]) -> String {
  let sorted = ops.map(fn(op) { op })
  sorted.sort_by(compare_ops)
  let sb = StringBuilder::new()
  sb.write_string("L")
  for op in sorted {
    sb.write_string(op.content)
  }
  sb.write_string("R")
  sb.to_string()
}

///|
/// Fisher-Yates shuffle for random permutation using seed.
fn shuffle_ops(ops : Array[InsertOp], seed : UInt64) -> Array[InsertOp] {
  let arr = ops.map(fn(op) { op })
  let len = arr.length()
  let mut s = seed
  for i = len - 1; i > 0; i = i - 1 {
    s = s * 6364136223846793005UL + 1442695040888963407UL
    let j = (s >> 33).to_int().abs() % (i + 1)
    let tmp = arr[i]
    arr[i] = arr[j]
    arr[j] = tmp
  }
  arr
}

///|
/// Property (L5.1): insertion order does not affect final text.
/// Guarantees determinism of sequence ordering for a fixed op set.
/// Tests forward, reverse, and random shuffle permutations.
fn prop_fugue_insertion_determinism(set : InsertOpSet) -> Bool {
  let expected = expected_text_from_ops(set.ops)
  let tree1 = FugueTree::new()
  tree1.insert(0, "L", -1, -1, 0, "base")
  tree1.insert(1, "R", 0, -1, 1, "base")
  for op in set.ops {
    tree1.insert(op.id, op.content, 0, 1, op.ts, op.agent)
  }
  let text1 = tree1.to_text()
  if text1 != expected {
    return false
  }
  let tree2 = FugueTree::new()
  tree2.insert(0, "L", -1, -1, 0, "base")
  tree2.insert(1, "R", 0, -1, 1, "base")
  for i = set.ops.length() - 1; i >= 0; i = i - 1 {
    let op = set.ops[i]
    tree2.insert(op.id, op.content, 0, 1, op.ts, op.agent)
  }
  let text2 = tree2.to_text()
  if text2 != expected {
    return false
  }
  let shuffled = shuffle_ops(set.ops, set.shuffle_seed)
  let tree3 = FugueTree::new()
  tree3.insert(0, "L", -1, -1, 0, "base")
  tree3.insert(1, "R", 0, -1, 1, "base")
  for op in shuffled {
    tree3.insert(op.id, op.content, 0, 1, op.ts, op.agent)
  }
  let text3 = tree3.to_text()
  text3 == expected
}

///|
test "property: fugue insertion determinism (order independence)" {
  @qc.quick_check_fn(prop_fugue_insertion_determinism)
}

///|
/// Generated chain length for ancestor properties
pub(all) struct ChainLen {
  len : Int
} derive(Show)

///|
pub impl @quickcheck.Arbitrary for ChainLen with arbitrary(size, _random_state) {
  let size_cap = if size < 0 { 0 } else { size }
  let len = if size_cap < 3 { 3 } else { 3 + size_cap % 10 }
  { len, }
}

///|
pub impl @qc.Shrink for ChainLen with shrink(self) {
  let results : Array[ChainLen] = []
  if self.len > 3 {
    results.push({ len: 3 })
    results.push({ len: self.len / 2 })
    results.push({ len: self.len - 1 })
  }
  results.iter()
}

///|
/// Property (L5.2): ancestor is reflexive for all items.
/// Guarantees is_ancestor(x, x) is true for every node.
fn prop_fugue_ancestor_reflexive(chain : ChainLen) -> Bool {
  let tree = FugueTree::new()
  tree.insert(0, "A", -1, -1, 0, "agent0")
  for i = 1; i < chain.len; i = i + 1 {
    tree.insert(i, "A", i - 1, -1, i, "agent0")
  }
  for i = 0; i < chain.len; i = i + 1 {
    if not(tree.is_ancestor(i, i)) {
      return false
    }
  }
  true
}

///|
test "property: fugue ancestor reflexive" {
  @qc.quick_check_fn(prop_fugue_ancestor_reflexive)
}

///|
/// Property (L5.3): ancestor transitivity holds along a chain.
/// Guarantees ancestry is a transitive relation over the tree.
fn prop_fugue_ancestor_transitivity(chain : ChainLen) -> Bool {
  let tree = FugueTree::new()
  tree.insert(0, "A", -1, -1, 0, "agent0")
  for i = 1; i < chain.len; i = i + 1 {
    tree.insert(i, "A", i - 1, -1, i, "agent0")
  }
  let a = 0
  let b = chain.len / 2
  let c = chain.len - 1
  tree.is_ancestor(a, b) && tree.is_ancestor(b, c) && tree.is_ancestor(a, c)
}

///|
test "property: fugue ancestor transitivity (chain)" {
  @qc.quick_check_fn(prop_fugue_ancestor_transitivity)
}

///|
/// Generated inserts for strong list and delete properties
pub(all) struct InsertSetWithDeletes {
  inserts : Array[InsertOp]
  delete_count : Int
} derive(Show)

///|
pub impl @quickcheck.Arbitrary for InsertSetWithDeletes with arbitrary(
  size,
  random_state,
) {
  let chars : Array[Char] = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
    'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
  ]
  let size_cap = if size < 0 { 0 } else { size }
  let max_len = chars.length()
  let len = if max_len == 0 { 0 } else { @cmp.minimum(size_cap, max_len) }
  let inserts : Array[InsertOp] = []
  let rs = random_state.split()
  for i = 0; i < len; i = i + 1 {
    let id = 100 + i
    let content = chars[i % chars.length()].to_string()
    let ts = rs.next_uint64().to_int().abs() % 1000
    let agent_id = rs.next_uint64().to_int().abs()
    let agent = "agent-\{agent_id}"
    inserts.push({ id, content, ts, agent })
  }
  let mut delete_count = 0
  if len > 0 {
    delete_count = rs.next_uint64().to_int().abs() % (len + 1)
  }
  { inserts, delete_count }
}

///|
pub impl @qc.Shrink for InsertSetWithDeletes with shrink(self) {
  let results : Array[InsertSetWithDeletes] = []
  let len = self.inserts.length()
  if len > 0 {
    results.push({ inserts: [], delete_count: 0 })
    let half = len / 2
    if half > 0 {
      let trimmed = self.inserts[:half].to_array()
      let dc = if self.delete_count > half { half } else { self.delete_count }
      results.push({ inserts: trimmed, delete_count: dc })
    }
    let trimmed = self.inserts[:len - 1].to_array()
    let dc = if self.delete_count > len - 1 {
      len - 1
    } else {
      self.delete_count
    }
    results.push({ inserts: trimmed, delete_count: dc })
  }
  results.iter()
}

///|
/// Return visible IDs from the tree.
fn visible_ids(tree : FugueTree) -> Array[Int] {
  let items = tree.get_visible_items()
  let ids : Array[Int] = []
  for item in items {
    let (id, _) = item
    ids.push(id)
  }
  ids
}

///|
/// Check if ids contains a target id.
fn ids_contains(ids : Array[Int], target : Int) -> Bool {
  for id in ids {
    if id == target {
      return true
    }
  }
  false
}

///|
/// Property (L5.4): insert places every item into the visible list (strong list spec).
/// Guarantees each inserted id is visible exactly once.
fn prop_fugue_insert_visibility(set : InsertOpSet) -> Bool {
  let tree = FugueTree::new()
  tree.insert(0, "L", -1, -1, 0, "base")
  tree.insert(1, "R", 0, -1, 1, "base")
  for op in set.ops {
    tree.insert(op.id, op.content, 0, 1, op.ts, op.agent)
  }
  let ids = visible_ids(tree)
  let mut count_found = 0
  for op in set.ops {
    if ids_contains(ids, op.id) {
      count_found = count_found + 1
    }
  }
  ids.length() == set.ops.length() + 2 && count_found == set.ops.length()
}

///|
test "property: fugue insert appears in visible list" {
  @qc.quick_check_fn(prop_fugue_insert_visibility)
}

///|
/// Property (L5.5): delete removes items from visible list and reduces count.
/// Guarantees tombstoned items are not visible and count decreases.
/// Asserts that deletes succeed (no silent failures).
fn prop_fugue_delete_visibility(set : InsertSetWithDeletes) -> Bool {
  let tree = FugueTree::new()
  tree.insert(0, "L", -1, -1, 0, "base")
  tree.insert(1, "R", 0, -1, 1, "base")
  for op in set.inserts {
    tree.insert(op.id, op.content, 0, 1, op.ts, op.agent)
  }
  let delete_count = set.delete_count
  for i = 0; i < delete_count; i = i + 1 {
    let op = set.inserts[i]
    let result : Result[Unit, FugueError] = try? tree.delete(op.id)
    match result {
      Ok(_) => ()
      Err(_) => return false
    }
  }
  let ids = visible_ids(tree)
  if ids.length() != set.inserts.length() - delete_count + 2 {
    return false
  }
  for i = 0; i < delete_count; i = i + 1 {
    let op = set.inserts[i]
    if ids_contains(ids, op.id) {
      return false
    }
  }
  true
}

///|
test "property: fugue delete removes from visible list" {
  @qc.quick_check_fn(prop_fugue_delete_visibility)
}

///|
/// Generated concurrent insert sizes for non-interleaving property test
pub(all) struct ConcurrentInsertSeq {
  len_a : Int
  len_b : Int
  ts_a : Int
  ts_b : Int
} derive(Show)

///|
/// Arbitrary instance for ConcurrentInsertSeq
pub impl @quickcheck.Arbitrary for ConcurrentInsertSeq with arbitrary(
  size,
  random_state,
) {
  let size_cap = if size < 0 { 0 } else { size }
  let max_len = @cmp.minimum(size_cap, 20)
  let rs = random_state.split()
  let len_a = rs.next_uint64().to_int().abs() % (max_len + 1)
  let len_b = rs.next_uint64().to_int().abs() % (max_len + 1)
  let ts_a = rs.next_uint64().to_int().abs() % 1000
  let ts_b = rs.next_uint64().to_int().abs() % 1000
  { len_a, len_b, ts_a, ts_b }
}

///|
/// Shrink instance for ConcurrentInsertSeq
pub impl @qc.Shrink for ConcurrentInsertSeq with shrink(self) {
  let results : Array[ConcurrentInsertSeq] = []
  if self.len_a > 0 || self.len_b > 0 || self.ts_a > 0 || self.ts_b > 0 {
    results.push({ len_a: 0, len_b: 0, ts_a: 0, ts_b: 0 })
  }
  if self.len_a > 0 {
    results.push({
      len_a: self.len_a / 2,
      len_b: self.len_b,
      ts_a: self.ts_a,
      ts_b: self.ts_b,
    })
    results.push({
      len_a: self.len_a - 1,
      len_b: self.len_b,
      ts_a: self.ts_a,
      ts_b: self.ts_b,
    })
  }
  if self.len_b > 0 {
    results.push({
      len_a: self.len_a,
      len_b: self.len_b / 2,
      ts_a: self.ts_a,
      ts_b: self.ts_b,
    })
    results.push({
      len_a: self.len_a,
      len_b: self.len_b - 1,
      ts_a: self.ts_a,
      ts_b: self.ts_b,
    })
  }
  if self.ts_a > 0 || self.ts_b > 0 {
    results.push({
      len_a: self.len_a,
      len_b: self.len_b,
      ts_a: self.ts_a / 2,
      ts_b: self.ts_b / 2,
    })
  }
  results.iter()
}

///|
/// Convert a string to an array of chars
fn collect_chars(text : String) -> Array[Char] {
  let chars : Array[Char] = []
  for c in text {
    chars.push(c)
  }
  chars
}

///|
/// Check that X and Y appear in contiguous blocks (no interleaving).
fn is_non_interleaving(chars : Array[Char]) -> Bool {
  if chars.length() <= 2 {
    return true
  }
  let mut last : Char? = None
  let mut switches = 0
  for i = 1; i < chars.length() - 1; i = i + 1 {
    let c = chars[i]
    if c != 'X' && c != 'Y' {
      return false
    }
    match last {
      None => last = Some(c)
      Some(prev) =>
        if prev != c {
          switches = switches + 1
          last = Some(c)
        }
    }
  }
  switches <= 1
}

///|
/// Property (L5.6): concurrent sequences are maximally non-interleaving.
/// Guarantees FugueMax places each user's run contiguously (no interleaving).
/// Tests with interleaved arrival order to stress the algorithm.
fn prop_fugue_non_interleaving(seq : ConcurrentInsertSeq) -> Bool {
  let tree = FugueTree::new()

  // Base text "LR"
  tree.insert(0, "L", -1, -1, 0, "base")
  tree.insert(1, "R", 0, -1, 1, "base")

  // Collect all ops from both users
  let ops_a : Array[(Int, Int, Int, String)] = []
  for i = 0; i < seq.len_a; i = i + 1 {
    let id = 10 + i
    let origin_left = if i == 0 { 0 } else { id - 1 }
    ops_a.push((id, origin_left, seq.ts_a + i, "userA"))
  }
  let ops_b : Array[(Int, Int, Int, String)] = []
  for i = 0; i < seq.len_b; i = i + 1 {
    let id = 1000 + i
    let origin_left = if i == 0 { 0 } else { id - 1 }
    ops_b.push((id, origin_left, seq.ts_b + i, "userB"))
  }

  // Interleave ops: alternate between A and B to stress ordering
  let mut i_a = 0
  let mut i_b = 0
  while i_a < ops_a.length() || i_b < ops_b.length() {
    if i_a < ops_a.length() {
      let (id, origin_left, ts, agent) = ops_a[i_a]
      let content = if agent == "userA" { "X" } else { "Y" }
      tree.insert(id, content, origin_left, 1, ts, agent)
      i_a = i_a + 1
    }
    if i_b < ops_b.length() {
      let (id, origin_left, ts, agent) = ops_b[i_b]
      let content = if agent == "userA" { "X" } else { "Y" }
      tree.insert(id, content, origin_left, 1, ts, agent)
      i_b = i_b + 1
    }
  }
  let text = tree.to_text()
  let chars = collect_chars(text)
  if chars.length() != seq.len_a + seq.len_b + 2 {
    return false
  }
  if chars[0] != 'L' || chars[chars.length() - 1] != 'R' {
    return false
  }
  let mut count_x = 0
  let mut count_y = 0
  for c in chars {
    if c == 'X' {
      count_x = count_x + 1
    } else if c == 'Y' {
      count_y = count_y + 1
    }
  }
  if count_x != seq.len_a || count_y != seq.len_b {
    return false
  }
  is_non_interleaving(chars)
}

///|
test "property: fugue non-interleaving (concurrent sequences)" {
  @qc.quick_check_fn(prop_fugue_non_interleaving)
}

///|
/// Generated agent/ID pairs for tie-break property test
pub(all) struct TieBreakCase {
  agent_a : String
  agent_b : String
  id_a : Int
  id_b : Int
} derive(Show)

///|
pub impl @quickcheck.Arbitrary for TieBreakCase with arbitrary(
  _size,
  random_state,
) {
  let rs = random_state.split()
  let force_same_agent = rs.next_uint64().to_int().abs() % 3 == 0
  let agent_a = "agent-\{rs.next_uint64().to_int().abs()}"
  let agent_b = if force_same_agent {
    agent_a
  } else {
    "agent-\{rs.next_uint64().to_int().abs()}"
  }
  let id_a = 10 + rs.next_uint64().to_int().abs() % 1000
  let mut id_b = 10 + rs.next_uint64().to_int().abs() % 1000
  if id_b == id_a {
    id_b = id_b + 1
  }
  { agent_a, agent_b, id_a, id_b }
}

///|
pub impl @qc.Shrink for TieBreakCase with shrink(_self) {
  let results : Array[TieBreakCase] = []
  results.push({ agent_a: "agent-0", agent_b: "agent-1", id_a: 10, id_b: 11 })
  results.iter()
}

///|
/// Property (L5.7): deterministic tie-breaking by agent then id when timestamps equal.
/// Guarantees total order for concurrent inserts with identical timestamps.
fn prop_fugue_tie_breaking(case : TieBreakCase) -> Bool {
  let tree = FugueTree::new()
  tree.insert(0, "L", -1, -1, 0, "base")
  tree.insert(1, "R", 0, -1, 1, "base")
  let ts = 42
  tree.insert(case.id_a, "X", 0, 1, ts, case.agent_a)
  tree.insert(case.id_b, "Y", 0, 1, ts, case.agent_b)
  let first = if case.agent_a.compare(case.agent_b) < 0 {
    "X"
  } else if case.agent_a.compare(case.agent_b) > 0 {
    "Y"
  } else if case.id_a <= case.id_b {
    "X"
  } else {
    "Y"
  }
  let second = if first == "X" { "Y" } else { "X" }
  let expected = "L" + first + second + "R"
  tree.to_text() == expected
}

///|
test "property: fugue tie-breaking (agent then id)" {
  @qc.quick_check_fn(prop_fugue_tie_breaking)
}
