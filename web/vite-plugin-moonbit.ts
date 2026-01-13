import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Plugin, ViteDevServer } from 'vite';

const execAsync = promisify(exec);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function moonbitPlugin(): Plugin {
  let isBuilding = false;

  return {
    name: 'vite-plugin-moonbit',

    async buildStart() {
      // Build MoonBit code when Vite starts
      console.log('Building MoonBit code...');
      await buildMoonBit();
    },

    configureServer(server: ViteDevServer) {
      // Watch MoonBit source files
      const moonbitRoot = path.resolve(__dirname, '..');
      const watchPatterns = [
        'parser/**/*.mbt',
        'editor/**/*.mbt',
        'event-graph-walker/**/*.mbt',
        'graphviz/**/*.mbt'
      ];

      server.watcher.add(watchPatterns.map(p => path.join(moonbitRoot, p)));

      server.watcher.on('change', async (file: string) => {
        if (file.endsWith('.mbt') && !isBuilding) {
          isBuilding = true;
          console.log('MoonBit file changed, rebuilding...');

          try {
            await buildMoonBit();
            // Trigger HMR by touching the output file
            server.ws.send({
              type: 'full-reload',
              path: '*'
            });
            console.log('MoonBit rebuild complete');
          } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            console.error('MoonBit build failed:', message);
          } finally {
            isBuilding = false;
          }
        }
      });
    }
  };
}

async function buildMoonBit(): Promise<void> {
  const projectRoot = path.resolve(__dirname, '..');
  const graphvizRoot = path.join(projectRoot, 'graphviz');

  try {
    // Build crdt module
    console.log('[MoonBit] Building crdt module...');
    await execAsync('moon build --target js', { cwd: projectRoot });

    // Build graphviz module
    console.log('[MoonBit] Building graphviz module...');
    await execAsync('moon build --target js', { cwd: graphvizRoot });

    // Copy crdt files
    console.log('[MoonBit] Copying crdt.js and crdt.d.ts...');
    await execAsync('cp target/js/release/build/crdt.js target/js/release/build/crdt.d.ts web/public/', { cwd: projectRoot });

    // Copy graphviz files (rename browser.* to graphviz.*)
    console.log('[MoonBit] Copying graphviz.js and graphviz.d.ts...');
    await execAsync('cp graphviz/target/js/release/build/browser/browser.js web/public/graphviz.js', { cwd: projectRoot });
    await execAsync('cp graphviz/target/js/release/build/browser/browser.d.ts web/public/graphviz.d.ts', { cwd: projectRoot });

    // Copy moonbit.d.ts (shared type definitions)
    console.log('[MoonBit] Copying moonbit.d.ts...');
    await execAsync('cp target/js/release/build/moonbit.d.ts web/public/', { cwd: projectRoot });

    console.log('[MoonBit] Build complete!');
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`MoonBit build failed: ${message}`);
  }
}
