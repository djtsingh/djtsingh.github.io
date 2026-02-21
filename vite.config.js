import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';
import { imagetools } from 'vite-imagetools';

export default defineConfig({
  plugins: [
    sveltekit(),
    imagetools({
      // Default transformations for responsive images
      defaultDirectives: (url) => {
        // Don't process already optimized images
        if (url.pathname.includes('/optimized/')) {
          return new URLSearchParams();
        }
        return new URLSearchParams({
          format: 'webp',
          quality: '80'
        });
      }
    })
  ],
  build: {
    cssMinify: 'lightningcss', // Faster CSS minification
    cssCodeSplit: false, // Prevent unused CSS preload warnings
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor libraries
          if (id.includes('node_modules')) {
            // Separate heavy dependencies
            if (id.includes('leaflet')) {
              return 'vendor-leaflet';
            }
            if (id.includes('lucide-svelte')) {
              return 'vendor-icons';
            }
            if (id.includes('svelte')) {
              return 'vendor-svelte';
            }
            if (id.includes('@sveltejs/kit')) {
              return 'vendor-sveltekit';
            }
            if (id.includes('@sentry')) {
              return 'vendor-sentry';
            }
            return 'vendor-other';
          }
          
          // Large components and utilities
          if (id.includes('components/LoadingState') || id.includes('components/SEO')) {
            return 'ui-components';
          }
          
          // Lazy-loaded widgets
          if (id.includes('components/Widgets') || id.includes('components/LazyMap') || id.includes('components/GitGraph')) {
            return 'widgets';
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
          open: false, // Don't auto-open browser during build
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
    include: ['lucide-svelte']
  },

  // Ensure packages with Svelte sources are pre-bundled for dev and not externalized for SSR
  ssr: {
    noExternal: ['lucide-svelte', 'leaflet']
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
