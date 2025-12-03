
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // IMPORTANT: Set base to './' for relative paths, essential for GitHub Pages (project site)
  // or set it to '/repo-name/' if you prefer absolute paths.
  base: './', 
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  server: {
    port: 3000,
  },
});
