///|
/// Returns empty string if file doesn't exist (graceful degradation).
extern "js" fn read_file(path : String) -> String =
  #|(path) => { try { return require('node:fs').readFileSync(path, 'utf8'); } catch(e) { return ''; } }

///|
extern "js" fn write_file(path : String, content : String) -> Unit =
  #|(path, content) => { require('node:fs').writeFileSync(path, content, 'utf8'); }

///|
extern "js" fn mkdir_p(path : String) -> Unit =
  #|(path) => { require('node:fs').mkdirSync(path, { recursive: true }); }

///|
extern "js" fn get_args() -> Array[String] =
  #|() => globalThis.process ? globalThis.process.argv.slice(2) : []

///|
extern "js" fn get_home_dir() -> String =
  #|() => require('node:os').homedir()

///|
extern "js" fn now_iso() -> String =
  #|() => new Date().toISOString()

///|
extern "js" fn path_join(a : String, b : String) -> String =
  #|(a, b) => require('node:path').join(a, b)
