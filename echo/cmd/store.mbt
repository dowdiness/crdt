///|
struct StoredPost {
  text : String
  ts : String
} derive(Show, ToJson, FromJson)

///| Serialize posts to JSON string.
fn posts_to_json(posts : Array[StoredPost]) -> String {
  posts.to_json().stringify()
}

///| Deserialize posts from JSON string. Returns empty array on any error.
fn posts_from_json(json_str : String) -> Array[StoredPost] {
  if json_str.is_empty() {
    return []
  }
  try {
    let json = @json.parse(json_str)
    let posts : Array[StoredPost] = @json.from_json(json)
    posts
  } catch {
    _ => []
  }
}

///| Get the posts file path: ~/.echo/posts.json
fn get_posts_path() -> String {
  let home = get_home_dir()
  let dir = path_join(home, ".echo")
  mkdir_p(dir)
  path_join(dir, "posts.json")
}

///| Load posts from disk.
fn load_posts() -> Array[StoredPost] {
  let path = get_posts_path()
  let content = read_file(path)
  posts_from_json(content)
}

///| Save posts to disk.
fn save_posts(posts : Array[StoredPost]) -> Unit {
  let path = get_posts_path()
  write_file(path, posts_to_json(posts))
}
