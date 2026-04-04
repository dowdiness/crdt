///| Read a file as UTF-8 string. Returns empty string if file doesn't exist.
extern "js" fn read_file(path : String) -> String =
  #|(path) => { try { return require('node:fs').readFileSync(path, 'utf8'); } catch(e) { return ''; } }

///| Write a string to a file (overwrites).
extern "js" fn write_file(path : String, content : String) -> Unit =
  #|(path, content) => { require('node:fs').writeFileSync(path, content, 'utf8'); }

///| Create directory recursively (like mkdir -p).
extern "js" fn mkdir_p(path : String) -> Unit =
  #|(path) => { require('node:fs').mkdirSync(path, { recursive: true }); }

///| Get command-line arguments (everything after the script path).
extern "js" fn get_args() -> Array[String] =
  #|() => globalThis.process ? globalThis.process.argv.slice(2) : []

///| Get user's home directory.
extern "js" fn get_home_dir() -> String =
  #|() => require('node:os').homedir()

///| Get current ISO 8601 timestamp.
extern "js" fn now_iso() -> String =
  #|() => new Date().toISOString()

///| Join path segments with OS separator.
extern "js" fn path_join(a : String, b : String) -> String =
  #|(a, b) => require('node:path').join(a, b)
