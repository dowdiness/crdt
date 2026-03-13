///|
test "uvarint roundtrip" {
  let buf = @buffer.new()
  write_uvarint(buf, 0UL)
  write_uvarint(buf, 1UL)
  write_uvarint(buf, 127UL)
  write_uvarint(buf, 128UL)
  write_uvarint(buf, 300UL)
  write_uvarint(buf, 18446744073709551615UL)
  let reader = Reader::new(buf.to_bytes())
  inspect(read_uvarint(reader), content="0")
  inspect(read_uvarint(reader), content="1")
  inspect(read_uvarint(reader), content="127")
  inspect(read_uvarint(reader), content="128")
  inspect(read_uvarint(reader), content="300")
  inspect(read_uvarint(reader), content="18446744073709551615")
}

///|
test "ivarint roundtrip" {
  let buf = @buffer.new()
  write_ivarint(buf, 0L)
  write_ivarint(buf, 1L)
  write_ivarint(buf, -1L)
  write_ivarint(buf, 9223372036854775807L)
  write_ivarint(buf, -9223372036854775808L)
  let reader = Reader::new(buf.to_bytes())
  inspect(read_ivarint(reader), content="0")
  inspect(read_ivarint(reader), content="1")
  inspect(read_ivarint(reader), content="-1")
  inspect(read_ivarint(reader), content="9223372036854775807")
  inspect(read_ivarint(reader), content="-9223372036854775808")
}

///|
test "string roundtrip" {
  let buf = @buffer.new()
  write_string(buf, "hello")
  write_string(buf, "")
  write_string(buf, "日本語")
  let reader = Reader::new(buf.to_bytes())
  inspect(read_string(reader), content="hello")
  inspect(read_string(reader), content="")
  inspect(read_string(reader), content="日本語")
}

///|
test "LWW: higher clock wins" {
  let store = EphemeralStore::new(60000UL)
  store.set("1", EphemeralValue::I64(10L))
  let buf = @buffer.new()
  write_uvarint(buf, 1UL)
  write_uvarint(buf, 1UL)
  write_ivarint(buf, 5L)
  buf.write_byte(b'\x03')
  write_ivarint(buf, 99L)
  store.apply(buf.to_bytes())
  inspect(store.get("1"), content="Some(I64(99))")
}

///|
test "LWW: lower clock is discarded" {
  let store = EphemeralStore::new(60000UL)
  store.set("1", EphemeralValue::I64(1L))
  store.set("1", EphemeralValue::I64(2L))
  store.set("1", EphemeralValue::I64(3L))
  let buf = @buffer.new()
  write_uvarint(buf, 1UL)
  write_uvarint(buf, 1UL)
  write_ivarint(buf, 2L)
  buf.write_byte(b'\x03')
  write_ivarint(buf, 99L)
  store.apply(buf.to_bytes())
  inspect(store.get("1"), content="Some(I64(3))")
}

///|
test "remove_outdated_at removes expired entries" {
  let store = EphemeralStore::new(1000UL)
  store.set("1", EphemeralValue::I64(42L))
  store.set("2", EphemeralValue::I64(99L))
  // Both entries have updated_at=0 (native now_ms returns 0).
  // Calling remove_outdated_at with now=2000 means:
  //   is_expired(0, 2000, 1000) => 2000 > 0 && 2000-0 > 1000 => true
  // So both should expire.
  // First, backdate only key "1" so key "2" survives:
  // Set key "2" updated_at to 1500 so it won't be expired at now=2000
  match store.states.get("2") {
    Some(record) =>
      store.states["2"] = {
        value: record.value,
        clock: record.clock,
        updated_at: 1500UL,
      }
    None => ()
  }
  store.remove_outdated_at(2000UL)
  inspect(store.get("1"), content="None")
  inspect(store.get("2"), content="Some(I64(99))")
}

///|
test "remove_outdated_at triggers Timeout event" {
  let store = EphemeralStore::new(1000UL)
  store.set("1", EphemeralValue::I64(42L))
  let events : Array[EphemeralStoreEvent] = []
  let _sub = store.subscribe(fn(event) {
    events.push(event)
    true
  })
  // Expire key "1": updated_at=0, now=5000, timeout=1000 => expired
  store.remove_outdated_at(5000UL)
  inspect(events.length(), content="1")
  inspect(events[0].by, content="Timeout")
  inspect(events[0].removed, content="[\"1\"]")
  inspect(events[0].added.length(), content="0")
  inspect(events[0].updated.length(), content="0")
}

///|
test "remove_outdated_at skips tombstones in removed list" {
  let store = EphemeralStore::new(1000UL)
  store.set("1", EphemeralValue::I64(42L))
  store.delete("1") // creates tombstone: value=None
  let events : Array[EphemeralStoreEvent] = []
  let _sub = store.subscribe(fn(event) {
    events.push(event)
    true
  })
  // Expire the tombstone: updated_at=0, now=5000, timeout=1000 => expired
  // But since value is None (tombstone), it should NOT appear in removed list
  store.remove_outdated_at(5000UL)
  inspect(events.length(), content="0")
  // The tombstone entry should be cleaned up from states
  inspect(store.states.get("1") is None, content="true")
}

///|
test "timeout_ms=0 disables expiry" {
  let store = EphemeralStore::new(0UL)
  store.set("1", EphemeralValue::I64(42L))
  // Even with a huge now value, nothing should expire when timeout_ms=0
  store.remove_outdated_at(999999999UL)
  inspect(store.get("1"), content="Some(I64(42))")
}

///|
test "clock increments on each set" {
  let store = EphemeralStore::new(60000UL)
  store.set("1", EphemeralValue::I64(1L))
  let clock1 = store.states.get("1").unwrap().clock
  store.set("1", EphemeralValue::I64(2L))
  let clock2 = store.states.get("1").unwrap().clock
  store.set("1", EphemeralValue::I64(3L))
  let clock3 = store.states.get("1").unwrap().clock
  inspect(clock1, content="1")
  inspect(clock2, content="2")
  inspect(clock3, content="3")
}
