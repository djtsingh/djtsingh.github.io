<script>
  import { onMount } from 'svelte';
  import { performanceMetrics } from '$lib/stores/performance.js';

  let metrics = {
    lcp: null,
    fid: null,
    cls: null,
    fcp: null,
    ttfb: null,
    memoryUsage: null,
    loadTime: null
  };

  // Send performance data to Google Analytics
  function sendToAnalytics(metric, value, additionalData = {}) {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'performance_metric', {
        event_category: 'Performance',
        event_label: metric,
        value: Math.round(value),
        custom_map: {
          metric_value: value,
          ...additionalData
        }
      });
    }
  }

  // Enhanced Web Vitals monitoring with GA tracking
  function initWebVitals() {
    // Largest Contentful Paint
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      metrics.lcp = lastEntry.startTime;
      performanceMetrics.update(m => ({ ...m, lcp: metrics.lcp }));
      sendToAnalytics('LCP', metrics.lcp, { element: lastEntry.element?.tagName });
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.processingStart > 0) {
          metrics.fid = entry.processingStart - entry.startTime;
          performanceMetrics.update(m => ({ ...m, fid: metrics.fid }));
          sendToAnalytics('FID', metrics.fid);
        }
      });
    }).observe({ entryTypes: ['first-input'] });

    // Cumulative Layout Shift
    let clsValue = 0;
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      metrics.cls = clsValue;
      performanceMetrics.update(m => ({ ...m, cls: metrics.cls }));
      sendToAnalytics('CLS', metrics.cls * 1000); // Convert to milliseconds for GA
    }).observe({ entryTypes: ['layout-shift'] });

    // First Contentful Paint
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.name === 'first-contentful-paint') {
          metrics.fcp = entry.startTime;
          performanceMetrics.update(m => ({ ...m, fcp: metrics.fcp }));
          sendToAnalytics('FCP', metrics.fcp);
        }
      });
    }).observe({ entryTypes: ['paint'] });
  }

  // Memory usage monitoring
  function monitorMemoryUsage() {
    if ('memory' in performance) {
      setInterval(() => {
        const memInfo = performance.memory;
        metrics.memoryUsage = {
          used: memInfo.usedJSHeapSize,
          total: memInfo.totalJSHeapSize,
          limit: memInfo.jsHeapSizeLimit,
          percentage: (memInfo.usedJSHeapSize / memInfo.jsHeapSizeLimit) * 100
        };
        performanceMetrics.update(m => ({ ...m, memoryUsage: metrics.memoryUsage }));
      }, 5000);
    }
  }

  // Page load time
  function measureLoadTime() {
    const navigation = performance.getEntriesByType('navigation')[0];
    if (navigation) {
      metrics.loadTime = navigation.loadEventEnd - navigation.fetchStart;
      metrics.ttfb = navigation.responseStart - navigation.requestStart;
      performanceMetrics.update(m => ({
        ...m,
        loadTime: metrics.loadTime,
        ttfb: metrics.ttfb
      }));

      // Send to analytics
      sendToAnalytics('Page_Load_Time', metrics.loadTime);
      sendToAnalytics('TTFB', metrics.ttfb);
    }
  }

  // Performance issue detection
  function detectPerformanceIssues() {
    // Check for large layout shifts (only warn about significant ones without recent input)
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        // Only warn about layout shifts > 0.25 without recent user input (Core Web Vitals relevant)
        if (entry.value > 0.25 && !entry.hadRecentInput) {
          console.warn('Significant layout shift (no recent input):', entry);
        }
        // For shifts with recent input, only log if they're very large (> 0.5)
        else if (entry.value > 0.5 && entry.hadRecentInput) {
          console.debug('Large layout shift with recent input:', entry.value, entry);
        }
      });
    }).observe({ entryTypes: ['layout-shift'] });
  }

  onMount(() => {
    // Initialize all monitoring
    initWebVitals();
    monitorMemoryUsage();
    measureLoadTime();
    detectPerformanceIssues();

    // Log performance summary after page load
    window.addEventListener('load', () => {
      setTimeout(() => {
        console.log('Performance Metrics:', metrics);
      }, 1000);
    });
  });
</script>

<!-- Performance monitoring component (no UI) -->