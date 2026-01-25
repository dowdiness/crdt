///| Tests for RleCursor API

///|
test "cursor starts at position 0" {
  let vec = @rle.RleVecCached::from_string("hello")
  let cursor = vec.cursor()
  inspect(cursor.position(), content="0")
  inspect(cursor.is_at_start(), content="true")
  inspect(cursor.is_at_end(), content="false")
}

///|
test "cursor current returns item and offset" {
  let vec = @rle.RleVecCached::from_string("hello")
  let cursor = vec.cursor()
  match cursor.current() {
    Some((item, offset)) => {
      inspect(item, content="hello")
      inspect(offset, content="0")
    }
    None => fail("cursor should have current item")
  }
}

///|
test "cursor advance" {
  let vec = @rle.RleVecCached::from_string("hello")
  let cursor = vec.cursor()
  let success = cursor.advance(3)
  inspect(success, content="true")
  inspect(cursor.position(), content="3")
  match cursor.current() {
    Some((_, offset)) => inspect(offset, content="3")
    None => fail("should have current")
  }
}

///|
test "cursor advance beyond end" {
  let vec = @rle.RleVecCached::from_string("hello")
  let cursor = vec.cursor()
  let success = cursor.advance(10)
  inspect(success, content="false")
  inspect(cursor.position(), content="5")
  inspect(cursor.is_at_end(), content="true")
}

///|
test "cursor retreat" {
  let vec = @rle.RleVecCached::from_string("hello")
  let cursor = vec.cursor()
  let _ = cursor.advance(4)
  let success = cursor.retreat(2)
  inspect(success, content="true")
  inspect(cursor.position(), content="2")
}

///|
test "cursor retreat beyond start" {
  let vec = @rle.RleVecCached::from_string("hello")
  let cursor = vec.cursor()
  let _ = cursor.advance(2)
  let success = cursor.retreat(10)
  inspect(success, content="false")
  inspect(cursor.position(), content="0")
  inspect(cursor.is_at_start(), content="true")
}

///|
test "cursor seek" {
  let vec = @rle.RleVecCached::from_string("hello")
  let cursor = vec.cursor()
  let success = cursor.seek(3)
  inspect(success, content="true")
  inspect(cursor.position(), content="3")
}

///|
test "cursor seek to invalid position" {
  let vec = @rle.RleVecCached::from_string("hello")
  let cursor = vec.cursor()
  let success = cursor.seek(10)
  inspect(success, content="false")
  inspect(cursor.position(), content="5") // Clamped to end
}

///|
test "cursor seek_start and seek_end" {
  let vec = @rle.RleVecCached::from_string("hello")
  let cursor = vec.cursor()
  let _ = cursor.advance(3)
  cursor.seek_end()
  inspect(cursor.position(), content="5")
  inspect(cursor.is_at_end(), content="true")
  cursor.seek_start()
  inspect(cursor.position(), content="0")
  inspect(cursor.is_at_start(), content="true")
}

///|
test "cursor next" {
  let vec = @rle.RleVecCached::from_string("hello")
  let cursor = vec.cursor()
  let item1 = cursor.next()
  inspect(item1, content="Some(\"hello\")")
  inspect(cursor.position(), content="1")
  // Continue to end
  let _ = cursor.seek(4)
  let item2 = cursor.next()
  inspect(item2, content="Some(\"hello\")")
  inspect(cursor.position(), content="5")
  // At end
  let item3 = cursor.next()
  inspect(item3, content="None")
}

///|
test "cursor prev" {
  let vec = @rle.RleVecCached::from_string("hello")
  let cursor = vec.cursor()
  let _ = cursor.seek(3)
  let item1 = cursor.prev()
  inspect(item1, content="Some(\"hello\")")
  inspect(cursor.position(), content="2")
  // Go to start
  let _ = cursor.seek(0)
  let item2 = cursor.prev()
  inspect(item2, content="None")
}

///|
test "cursor clone" {
  let vec = @rle.RleVecCached::from_string("hello")
  let cursor1 = vec.cursor()
  let _ = cursor1.advance(3)
  let cursor2 = cursor1.clone()
  inspect(cursor2.position(), content="3")
  // Modifying one doesn't affect the other
  let _ = cursor1.advance(1)
  inspect(cursor1.position(), content="4")
  inspect(cursor2.position(), content="3")
}

///|
test "cursor distance_to" {
  let vec = @rle.RleVecCached::from_string("hello")
  let cursor1 = vec.cursor()
  let cursor2 = vec.cursor()
  let _ = cursor2.seek(4)
  inspect(cursor1.distance_to(cursor2), content="4")
  inspect(cursor2.distance_to(cursor1), content="-4")
}

///|
test "cursor iter_forward" {
  let vec = @rle.RleVecCached::from_string("hi")
  let cursor = vec.cursor()
  let items = cursor.iter_forward().collect()
  inspect(items.length(), content="2")
  // Each item is (run, offset_in_run, global_offset)
  match items[0] {
    (_, offset, global) => {
      inspect(offset, content="0")
      inspect(global, content="0")
    }
  }
  match items[1] {
    (_, offset, global) => {
      inspect(offset, content="1")
      inspect(global, content="1")
    }
  }
}

///|
test "cursor iter_forward from middle" {
  let vec = @rle.RleVecCached::from_string("hello")
  let cursor = vec.cursor()
  let _ = cursor.seek(2)
  let items = cursor.iter_forward().collect()
  inspect(items.length(), content="3") // "llo" = 3 chars
}

///|
test "cursor on empty vec" {
  let vec : @rle.RleVecCached[String] = @rle.RleVecCached::new()
  let cursor = vec.cursor()
  inspect(cursor.is_at_start(), content="true")
  inspect(cursor.is_at_end(), content="true")
  inspect(cursor.current(), content="None")
  inspect(cursor.next(), content="None")
}

///|
test "cursor current_item" {
  let vec = @rle.RleVecCached::from_string("hello")
  let cursor = vec.cursor()
  inspect(cursor.current_item(), content="Some(\"hello\")")
  cursor.seek_end()
  inspect(cursor.current_item(), content="None")
}

///|
test "cursor advance by 0" {
  let vec = @rle.RleVecCached::from_string("hello")
  let cursor = vec.cursor()
  let _ = cursor.advance(2)
  let success = cursor.advance(0)
  inspect(success, content="true")
  inspect(cursor.position(), content="2")
}

///|
test "cursor retreat by 0" {
  let vec = @rle.RleVecCached::from_string("hello")
  let cursor = vec.cursor()
  let _ = cursor.advance(2)
  let success = cursor.retreat(0)
  inspect(success, content="true")
  inspect(cursor.position(), content="2")
}

///|
test "cursor advance negative" {
  let vec = @rle.RleVecCached::from_string("hello")
  let cursor = vec.cursor()
  let _ = cursor.advance(4)
  let success = cursor.advance(-2)
  inspect(success, content="true")
  inspect(cursor.position(), content="2")
}

///|
test "cursor retreat negative" {
  let vec = @rle.RleVecCached::from_string("hello")
  let cursor = vec.cursor()
  let success = cursor.retreat(-3)
  inspect(success, content="true")
  inspect(cursor.position(), content="3")
}
