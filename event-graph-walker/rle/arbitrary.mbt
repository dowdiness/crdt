///| Arbitrary and Shrink trait implementations for RLE types

///|
/// Arbitrary instance for Runs[String] - generates random run-length encoded strings
pub impl @quickcheck.Arbitrary for Runs[String] with arbitrary(
  size,
  random_state,
) {
  let chars : Array[Char] = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
    'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', ' ',
  ]
  let runs : Runs[String] = Runs::new()
  // Generate 1 to size+1 runs
  let num_runs = random_state.split().next_uint64().to_int().abs() % (size + 1) +
    1
  for _ in 0..<num_runs {
    // Each run has 1 to 5 characters
    let run_len = random_state.split().next_uint64().to_int().abs() % 5 + 1
    let sb = StringBuilder::new()
    for _ in 0..<run_len {
      let char_idx = random_state.split().next_uint64().to_int().abs() %
        chars.length()
      sb.write_char(chars[char_idx])
    }
    let s = sb.to_string()
    if not(s.is_empty()) {
      let _ = runs.append(s)

    }
  }
  runs
}

///|
/// Shrink instance for Runs[String] - simplifies failing test cases
///
/// Shrinking strategies:
/// 1. Remove runs (fewer runs = simpler)
/// 2. Shorten individual runs
/// 3. Simplify characters (later chars -> earlier chars)
pub impl @qc.Shrink for Runs[String] with shrink(runs) {
  let results : Array[Runs[String]] = []
  let items = runs.to_array()
  let len = items.length()
  // Empty case
  if len == 0 {
    return results.iter()
  }
  // Strategy 1: Try empty runs
  results.push(Runs::new())
  // Strategy 2: Remove one run at a time
  if len > 1 {
    for i = 0; i < len; i = i + 1 {
      let smaller : Runs[String] = Runs::new()
      for j = 0; j < len; j = j + 1 {
        if i != j {
          let _ = smaller.append(items[j])

        }
      }
      results.push(smaller)
    }
  }
  // Strategy 3: Take first half
  if len > 1 {
    let half = len / 2
    let first_half : Runs[String] = Runs::new()
    for i = 0; i < half; i = i + 1 {
      let _ = first_half.append(items[i])

    }
    results.push(first_half)
  }
  // Strategy 4: Shorten individual runs
  for i = 0; i < len; i = i + 1 {
    let item = items[i]
    let item_len = HasCausalLength::causal_len(item)
    if item_len > 1 {
      // Try with shortened run
      let shortened : Runs[String] = Runs::new()
      for j = 0; j < len; j = j + 1 {
        if i == j {
          let half = item_len / 2
          if half > 0 {
            let _ = shortened.append(Sliceable::slice(item, start=0, end=half))

          }
        } else {
          let _ = shortened.append(items[j])

        }
      }
      if not(shortened.is_empty()) {
        results.push(shortened)
      }
    }
  }
  results.iter()
}

///|
/// Arbitrary instance for Rle[String] - generates random cached RLE strings
pub impl @quickcheck.Arbitrary for Rle[String] with arbitrary(
  size,
  random_state,
) {
  let runs : Runs[String] = @quickcheck.Arbitrary::arbitrary(size, random_state)
  Rle::from_runs(runs)
}

///|
/// Shrink instance for Rle[String] - delegates to Runs shrinking
pub impl @qc.Shrink for Rle[String] with shrink(rle) {
  @qc.Shrink::shrink(rle.to_runs()).map(Rle::from_runs)
}

///|
/// Arbitrary instance for RunPos - generates valid run positions
pub impl @quickcheck.Arbitrary for RunPos with arbitrary(size, random_state) {
  let run = random_state.split().next_uint64().to_int().abs() % (size + 1)
  let offset = random_state.split().next_uint64().to_int().abs() % (size + 1)
  { run, offset }
}

///|
/// Shrink instance for RunPos - shrinks both run and offset toward 0
pub impl @qc.Shrink for RunPos with shrink(pos) {
  let results : Array[RunPos] = []
  // Try (0, 0)
  if pos.run > 0 || pos.offset > 0 {
    results.push({ run: 0, offset: 0 })
  }
  // Shrink run
  if pos.run > 0 {
    results.push({ run: pos.run - 1, offset: pos.offset })
    results.push({ run: pos.run / 2, offset: pos.offset })
  }
  // Shrink offset
  if pos.offset > 0 {
    results.push({ run: pos.run, offset: pos.offset - 1 })
    results.push({ run: pos.run, offset: pos.offset / 2 })
  }
  results.iter()
}

///|
/// Arbitrary instance for PrefixSums - generates valid prefix sum arrays
pub impl @quickcheck.Arbitrary for PrefixSums with arbitrary(size, random_state) {
  let num_runs = random_state.split().next_uint64().to_int().abs() % (size + 1) +
    1
  let atoms : Array[Int] = []
  let content : Array[Int] = []
  let mut atom_sum = 0
  let mut content_sum = 0
  for _ in 0..<num_runs {
    let run_len = random_state.split().next_uint64().to_int().abs() % 10 + 1
    atom_sum = atom_sum + run_len
    content_sum = content_sum + run_len
    atoms.push(atom_sum)
    content.push(content_sum)
  }
  { atoms, content }
}

///|
/// Shrink instance for PrefixSums - shrinks by removing entries
pub impl @qc.Shrink for PrefixSums with shrink(sums) {
  let results : Array[PrefixSums] = []
  let len = sums.atoms.length()
  // Try empty
  if len > 0 {
    results.push({ atoms: [], content: [] })
  }
  // Remove last entry
  if len > 1 {
    results.push({
      atoms: sums.atoms[:len - 1].to_array(),
      content: sums.content[:len - 1].to_array(),
    })
  }
  // Take first half
  if len > 2 {
    let half = len / 2
    results.push({
      atoms: sums.atoms[:half].to_array(),
      content: sums.content[:half].to_array(),
    })
  }
  results.iter()
}

///|
/// Arbitrary instance for Slice[String] - generates valid string slices
pub impl @quickcheck.Arbitrary for Slice[String] with arbitrary(
  size,
  random_state,
) {
  let chars : Array[Char] = ['a', 'b', 'c', 'd', 'e']
  let len = random_state.split().next_uint64().to_int().abs() % (size + 1) + 1
  let sb = StringBuilder::new()
  for _ in 0..<len {
    let char_idx = random_state.split().next_uint64().to_int().abs() %
      chars.length()
    sb.write_char(chars[char_idx])
  }
  let value = sb.to_string()
  let value_len = HasCausalLength::causal_len(value)
  let start = random_state.split().next_uint64().to_int().abs() % value_len
  let end = start +
    random_state.split().next_uint64().to_int().abs() % (value_len - start) +
    1
  { value, start, end }
}

///|
/// Shrink instance for Slice[String] - shrinks value and narrows range
pub impl @qc.Shrink for Slice[String] with shrink(slice) {
  let results : Array[Slice[String]] = []
  let value_len = HasCausalLength::causal_len(slice.value)
  // Shrink to smaller range
  if slice.end > slice.start + 1 {
    results.push({ ..slice, end: slice.start + 1 })
    results.push({ ..slice, end: (slice.start + slice.end) / 2 + 1 })
  }
  // Shrink start toward 0
  if slice.start > 0 {
    results.push({ ..slice, start: 0 })
  }
  // Shrink value (keep range valid)
  if value_len > slice.end {
    let new_value = Sliceable::slice(slice.value, start=0, end=slice.end)
    results.push({ value: new_value, start: slice.start, end: slice.end })
  }
  results.iter()
}
