import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Alias to the valtio-egwalker module's TypeScript sources
      'valtio-egwalker/stub': path.resolve(__dirname, '../valtio/src/egwalker_api_stub.ts'),
      'valtio-egwalker/sync': path.resolve(__dirname, '../valtio/src/egwalker_api_sync.ts'),
      'valtio-egwalker': path.resolve(__dirname, '../valtio/src/egwalker_api.ts'),
    },
  },
  server: {
    port: 5174,
  },
});
