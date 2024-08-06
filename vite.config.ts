import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
const path = require('path');

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3000,
  },
});
