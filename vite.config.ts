
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // 'base' must be './' for GitHub Pages to find assets (js/css) correctly
  // regardless of whether it's a user page or project page.
  base: './', 
  build: {
    outDir: 'dist',
    sourcemap: false, // Disabled for production to save size
  },
  server: {
    port: 3000,
    host: true // Expose to network for mobile testing if needed
  },
});
