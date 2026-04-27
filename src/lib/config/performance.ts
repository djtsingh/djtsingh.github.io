/**
 * Performance configuration
 * Settings for Web Vitals monitoring and performance thresholds
 */

export const PERFORMANCE_CONFIG = {
  // Web Vitals thresholds (in milliseconds)
  thresholds: {
    // Largest Contentful Paint - target: < 2.5s
    lcp: {
      good: 2500,
      needsImprovement: 4000
    },
    // First Input Delay - target: < 100ms
    fid: {
      good: 100,
      needsImprovement: 300
    },
    // Cumulative Layout Shift - target: < 0.1
    cls: {
      good: 0.1,
      needsImprovement: 0.25
    },
    // First Contentful Paint - target: < 1.8s
    fcp: {
      good: 1800,
      needsImprovement: 3000
    },
    // Time to First Byte - target: < 600ms
    ttfb: {
      good: 600,
      needsImprovement: 1800
    }
  },

  // Memory monitoring
  memory: {
    checkInterval: 5000, // Check every 5 seconds
    warningThreshold: 0.85, // Warn when heap usage > 85%
    criticalThreshold: 0.95 // Critical when > 95%
  },

  // Analytics
  analytics: {
    enabled: typeof window !== 'undefined' && typeof gtag !== 'undefined',
    sampleRate: 1.0, // Track 100% of visitors
    sendMetricsOnPageHide: true
  },

  // Monitoring
  monitoring: {
    verbose: false, // Set to true for detailed console logs
    reportErrors: true,
    logMetricsOnLoad: true
  }
} as const;

/**
 * Determine performance rating
 */
export function getPerformanceRating(metric: string, value: number): 'good' | 'needsImprovement' | 'poor' {
  const threshold = PERFORMANCE_CONFIG.thresholds[metric as keyof typeof PERFORMANCE_CONFIG.thresholds];
  
  if (!threshold) return 'poor';
  
  if (value <= threshold.good) return 'good';
  if (value <= threshold.needsImprovement) return 'needsImprovement';
  return 'poor';
}

/**
 * Format metric value for display
 */
export function formatMetricValue(metric: string, value: number): string {
  switch (metric) {
    case 'cls':
      return value.toFixed(3);
    case 'lcp':
    case 'fcp':
    case 'fid':
    case 'ttfb':
    case 'loadTime':
      return `${Math.round(value)}ms`;
    default:
      return String(value);
  }
}
