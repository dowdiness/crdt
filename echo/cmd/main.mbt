///|
fn print_usage() -> Unit {
  println("Usage:")
  println("  echo post <text>       — Post a memo, show similar posts")
  println("  echo similar <text>    — Find posts similar to text")
  println("  echo similar-to <id>   — Find posts similar to post #id")
  println("  echo list              — List all posts")
}

///|
fn truncate(text : String, max_len : Int) -> String {
  if text.length() > max_len {
    text[0:max_len].to_string() + "..."
  } else {
    text
  }
}

///|
/// Build a corpus from stored posts, using blended tokenizer.
fn build_corpus(posts : Array[StoredPost]) -> @echo.Corpus {
  let corpus = @echo.Corpus::new(tokenize=@tokenizer.blended)
  for post in posts {
    let _ = corpus.add_post(post.text)
  }
  corpus
}

///|
fn print_results(
  results : Array[(Int, Double)],
  posts : Array[StoredPost],
) -> Unit {
  if results.is_empty() {
    println("  (no similar posts found)")
    return
  }
  for result in results {
    let id = result.0
    let score = result.1
    let text = if id < posts.length() { posts[id].text } else { "???" }
    let display = truncate(text, 60)
    // Zero-pad so 0.05 displays as "0.05" not "0.5"
    let score_pct = (score * 100.0 + 0.5).to_int()
    let score_str = if score_pct < 10 {
      "0.0\{score_pct}"
    } else {
      "0.\{score_pct}"
    }
    println("  #\{id} (\{score_str}) \{display}")
  }
}

///|
fn main {
  let args = get_args()
  match args {
    ["post", text, ..] => cmd_post(text)
    ["similar", text, ..] => cmd_similar(text)
    ["similar-to", id_str, ..] => cmd_similar_to(id_str)
    ["list", ..] => cmd_list()
    _ => print_usage()
  }
}

///|
fn cmd_post(text : String) -> Unit {
  if text.length() == 0 {
    println("Error: text cannot be empty")
    return
  }
  let posts = load_posts()
  let id = posts.length()
  posts.push({ text, ts: now_iso() })
  save_posts(posts)
  println("Added post #\{id}")
  let corpus = build_corpus(posts)
  let results = corpus.query_similar(id, top_n=5)
  if !results.is_empty() {
    println("Similar:")
    print_results(results, posts)
  }
}

///|
fn cmd_similar(text : String) -> Unit {
  let posts = load_posts()
  if posts.is_empty() {
    println("No posts yet")
    return
  }
  let corpus = build_corpus(posts)
  let results = corpus.query_text(text, top_n=5)
  print_results(results, posts)
}

///|
fn cmd_similar_to(id_str : String) -> Unit {
  let posts = load_posts()
  if posts.is_empty() {
    println("No posts yet")
    return
  }
  let mut id = 0
  let mut valid = true
  if id_str.length() == 0 {
    valid = false
  } else {
    for i in 0..<id_str.length() {
      let c = id_str[i]
      if c >= '0' && c <= '9' {
        id = id * 10 + (c.to_int() - '0'.to_int())
      } else {
        valid = false
        break
      }
    }
  }
  if !valid || id >= posts.length() {
    println("Post not found: \{id_str}")
    return
  }
  let corpus = build_corpus(posts)
  let results = corpus.query_similar(id, top_n=5)
  print_results(results, posts)
}

///|
fn cmd_list() -> Unit {
  let posts = load_posts()
  if posts.is_empty() {
    println("No posts yet")
    return
  }
  for i in 0..<posts.length() {
    let post = posts[i]
    println("#\{i} \{post.ts} \{truncate(post.text, 60)}")
  }
}
