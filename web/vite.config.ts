import { defineConfig } from 'vite';

export default defineConfig({
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
