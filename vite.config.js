import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  build: {
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['svelte']
        }
      }
    }
  },
  css: {
    devSourcemap: true,
    // Exclude critical CSS from build since it's inlined
    preprocessorOptions: {
      scss: {
        additionalData: '@use "sass:math";'
      }
    }
  },
  // Exclude critical CSS file from processing since it's inlined
  optimizeDeps: {
    exclude: ['src/lib/assets/critical.css']
  }
});
