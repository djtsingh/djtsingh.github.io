import { writable } from 'svelte/store';

// Performance metrics store - shared between components
export const performanceMetrics = writable({
  lcp: null, // Largest Contentful Paint
  fid: null, // First Input Delay
  cls: null, // Cumulative Layout Shift
  fcp: null, // First Contentful Paint
  ttfb: null, // Time to First Byte
  memoryUsage: null,
  loadTime: null
});