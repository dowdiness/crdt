test "StoredPost JSON round-trip" {
  let posts : Array[StoredPost] = [
    { text: "CRDTのmerge操作でバグ", ts: "2026-04-04T10:00:00Z" },
    { text: "カレーを作った", ts: "2026-04-04T11:30:00Z" },
  ]
  let json = posts_to_json(posts)
  let parsed = posts_from_json(json)
  inspect(parsed.length(), content="2")
  inspect(parsed[0].text, content="CRDTのmerge操作でバグ")
  inspect(parsed[0].ts, content="2026-04-04T10:00:00Z")
  inspect(parsed[1].text, content="カレーを作った")
}

test "posts_from_json - empty string returns empty" {
  inspect(posts_from_json(""), content="[]")
}

test "posts_from_json - invalid JSON returns empty" {
  inspect(posts_from_json("not json"), content="[]")
}

test "posts_from_json - empty array" {
  inspect(posts_from_json("[]"), content="[]")
}
