///|
/// Tests for user-friendly text API
test "TextDoc::new creates empty document" {
  let doc = TextDoc::new("alice")
  inspect(doc.text(), content="")
  inspect(doc.len(), content="0")
  inspect(doc.is_empty(), content="true")
}

///|
test "TextDoc::insert adds text" {
  let doc = TextDoc::new("alice")
  let _ = doc.insert(Pos::at(0), "Hello")
  inspect(doc.text(), content="Hello")
  inspect(doc.len(), content="5")
}

///|
test "TextDoc::insert at position" {
  let doc = TextDoc::new("alice")
  let _ = doc.insert(Pos::at(0), "W")
  let _ = doc.insert(Pos::at(1), "o")
  let _ = doc.insert(Pos::at(2), "r")
  let _ = doc.insert(Pos::at(3), "l")
  let _ = doc.insert(Pos::at(4), "d")
  inspect(doc.text(), content="World")
}

///|
test "TextDoc::delete removes character" {
  let doc = TextDoc::new("alice")
  let _ = doc.insert(Pos::at(0), "Hello")
  let _ = doc.delete(Pos::at(4))
  inspect(doc.text(), content="Hell")
}

///|
test "TextDoc::insert returns Change" {
  let doc = TextDoc::new("alice")
  let change = doc.insert(Pos::at(0), "H")
  inspect(change.is_insert(), content="true")
  inspect(change.is_delete(), content="false")
  inspect(change.get_text(), content="Some(\"H\")")
}

///|
test "TextDoc::delete returns Change" {
  let doc = TextDoc::new("alice")
  let _ = doc.insert(Pos::at(0), "Hi")
  let change = doc.delete(Pos::at(0))
  inspect(change.is_insert(), content="false")
  inspect(change.is_delete(), content="true")
}

///|
test "TextDoc::version changes after edit" {
  let doc = TextDoc::new("alice")
  let v1 = doc.version()
  let _ = doc.insert(Pos::at(0), "Hello")
  let v2 = doc.version()
  inspect(v1 == v2, content="false")
}

///|
test "Pos::at clamps negative values" {
  let pos = Pos::at(-5)
  inspect(pos.value(), content="0")
}

///|
test "Range::from_ints creates range" {
  let range = Range::from_ints(0, 5)
  inspect(range.start.value(), content="0")
  inspect(range.end.value(), content="5")
}

///|
test "TextError::message provides user message" {
  let err : TextError = TextError::InvalidPosition(pos=10, len=5)
  inspect(
    err.message(),
    content="Invalid position: 10 is out of bounds for text of length 5",
  )
}

///|
test "TextError::help provides guidance" {
  let err : TextError = TextError::InvalidPosition(pos=10, len=5)
  inspect(
    err.help(),
    content="Use a position between 0 and 5 (inclusive for insert, exclusive for delete)",
  )
}

///|
test "TextError::is_retryable for sync errors" {
  let retryable : TextError = TextError::SyncFailed(
    SyncFailure::MissingDependency(hint="test"),
  )
  let not_retryable : TextError = TextError::SyncFailed(
    SyncFailure::MalformedMessage(detail="test"),
  )
  inspect(retryable.is_retryable(), content="true")
  inspect(not_retryable.is_retryable(), content="false")
}

///|
test "SyncSession::export_all and apply" {
  let doc1 = TextDoc::new("alice")
  let doc2 = TextDoc::new("bob")
  let _ = doc1.insert(Pos::at(0), "H")
  let _ = doc1.insert(Pos::at(1), "i")
  let msg = doc1.sync().export_all()
  inspect(msg.is_empty(), content="false")
  inspect(msg.op_count(), content="2")
  doc2.sync().apply(msg)
  inspect(doc2.text(), content="Hi")
}

///|
test "SyncSession::export_since sends delta" {
  let doc1 = TextDoc::new("alice")
  let doc2 = TextDoc::new("bob")
  let _ = doc1.insert(Pos::at(0), "H")
  let _ = doc1.insert(Pos::at(1), "i")
  let msg1 = doc1.sync().export_all()
  doc2.sync().apply(msg1)
  let v2 = doc2.version()
  let _ = doc1.insert(Pos::at(2), "!")
  let msg2 = doc1.sync().export_since(v2)
  inspect(msg2.op_count(), content="1")
  doc2.sync().apply(msg2)
  inspect(doc2.text(), content="Hi!")
}

///|
test "TextDoc::checkout creates historical view" {
  let doc = TextDoc::new("alice")
  let _ = doc.insert(Pos::at(0), "Hello")
  let v1 = doc.version()
  let _ = doc.insert(Pos::at(5), " World")
  let view = doc.checkout(v1)
  inspect(view.text(), content="Hello")
  inspect(doc.text(), content="Hello World")
}

///|
test "TextDoc::advanced provides escape hatch" {
  let doc = TextDoc::new("alice")
  let _ = doc.insert(Pos::at(0), "Hello")
  let inner = doc.inner_document()
  inspect(inner.to_text(), content="Hello")
}

///|
test "Version::empty creates empty version" {
  let v = Version::empty()
  let f = v.to_frontier()
  inspect(f, content="Frontier([])")
}

///|
test "TextDoc insert at invalid position raises error" {
  let doc = TextDoc::new("alice")
  let result : Result[Change, TextError] = Ok(doc.insert(Pos::at(10), "Hello")) catch {
    e => Err(e)
  }
  match result {
    Err(InvalidPosition(pos~, len~)) => {
      inspect(pos, content="10")
      inspect(len, content="0")
    }
    _ => fail("Expected InvalidPosition error")
  }
}

///|
test "TextDoc delete at invalid position raises error" {
  let doc = TextDoc::new("alice")
  let _ = doc.insert(Pos::at(0), "Hi")
  let result : Result[Change, TextError] = Ok(doc.delete(Pos::at(5))) catch {
    e => Err(e)
  }
  match result {
    Err(InvalidPosition(pos~, len~)) => {
      inspect(pos, content="5")
      inspect(len, content="2")
    }
    _ => fail("Expected InvalidPosition error")
  }
}

///|
test "TextView::to_rle returns RLE view" {
  let doc = TextDoc::new("alice")
  let _ = doc.insert(Pos::at(0), "Hello")
  let view = doc.checkout(doc.version())
  let rle = view.to_rle()
  inspect(rle.run_count(), content="1")
  inspect(rle.total_atom_len(), content="5")
  inspect(rle.to_string(), content="Hello")
}

///|
test "TextView::runs iterates over runs" {
  let doc = TextDoc::new("alice")
  let _ = doc.insert(Pos::at(0), "Hello")
  let view = doc.checkout(doc.version())
  let runs = view.runs().collect()
  inspect(runs.length(), content="1")
  inspect(runs[0], content="Hello")
}
