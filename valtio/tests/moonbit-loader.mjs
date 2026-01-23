import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const stubUrl = pathToFileURL(
  path.join(path.dirname(fileURLToPath(import.meta.url)), 'moonbit_stub.js')
).href;

export async function resolve(specifier, context, nextResolve) {
  if (specifier.endsWith('/target/js/release/build/valtio/valtio.js')) {
    return { url: stubUrl, shortCircuit: true };
  }

  return nextResolve(specifier, context);
}
