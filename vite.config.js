import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [sveltekit()],
  build: {
    // cssCodeSplit: true, // Disabled to fix preload issues
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor libraries
          if (id.includes('node_modules')) {
            if (id.includes('svelte')) {
              return 'vendor-svelte';
            }
            if (id.includes('@sveltejs/kit')) {
              return 'vendor-sveltekit';
            }
            return 'vendor-other';
          }
          
          // Large components and utilities
          if (id.includes('components/LoadingState') || id.includes('components/SEO')) {
            return 'ui-components';
          }
          
          // Project pages (split large ones)
          if (id.includes('routes/projects/')) {
            return 'projects-pages';
          }
          
          // Keep app logic together
          if (id.includes('lib/stores') || id.includes('lib/data')) {
            return 'app-logic';
          }
        }
      },
      plugins: [
        visualizer({
          filename: 'dist/bundle-analysis.html',
          open: true,
          gzipSize: true,
          brotliSize: true
        })
      ]
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
  // Performance optimizations
  optimizeDeps: {
    exclude: ['src/lib/assets/critical.css'],
    include: ['phosphor-svelte']
  },

  // Ensure packages with Svelte sources are pre-bundled for dev and not externalized for SSR
  ssr: {
    noExternal: ['phosphor-svelte']
  },
  esbuild: {
    // Minimize bundle size
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true,
    // Remove console logs in production
    drop: ['console', 'debugger']
  }
});
