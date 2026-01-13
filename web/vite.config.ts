import { defineConfig } from 'vite';
import { moonbitPlugin } from './vite-plugin-moonbit';

export default defineConfig({
  plugins: [moonbitPlugin()],
  server: {
    fs: {
      // Allow serving wasm from parent directory
      allow: ['..']
    }
  },
  build: {
    target: 'esnext'
  },
  optimizeDeps: {
    exclude: ['*.wasm']
  }
});
