<script>
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
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

  // Store references for cleanup
  let observers = [];
  let memoryInterval = null;
  let loadListener = null;

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

  // Create and track observer
  function createObserver(callback, entryTypes) {
    const observer = new PerformanceObserver(callback);
    observer.observe({ entryTypes });
    observers.push(observer);
    return observer;
  }

  // Enhanced Web Vitals monitoring with GA tracking
  function initWebVitals() {
    // Largest Contentful Paint
    createObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      metrics.lcp = lastEntry.startTime;
      performanceMetrics.update(m => ({ ...m, lcp: metrics.lcp }));
      sendToAnalytics('LCP', metrics.lcp, { element: lastEntry.element?.tagName });
    }, ['largest-contentful-paint']);

    // First Input Delay
    createObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.processingStart > 0) {
          metrics.fid = entry.processingStart - entry.startTime;
          performanceMetrics.update(m => ({ ...m, fid: metrics.fid }));
          sendToAnalytics('FID', metrics.fid);
        }
      });
    }, ['first-input']);

    // Cumulative Layout Shift
    let clsValue = 0;
    createObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      metrics.cls = clsValue;
      performanceMetrics.update(m => ({ ...m, cls: metrics.cls }));
      sendToAnalytics('CLS', metrics.cls * 1000); // Convert to milliseconds for GA
    }, ['layout-shift']);

    // First Contentful Paint
    createObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.name === 'first-contentful-paint') {
          metrics.fcp = entry.startTime;
          performanceMetrics.update(m => ({ ...m, fcp: metrics.fcp }));
          sendToAnalytics('FCP', metrics.fcp);
        }
      });
    }, ['paint']);
  }

  // Memory usage monitoring
  function monitorMemoryUsage() {
    if ('memory' in performance) {
      memoryInterval = setInterval(() => {
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

  onMount(() => {
    if (!browser) return;

    // Initialize all monitoring
    initWebVitals();
    monitorMemoryUsage();
    measureLoadTime();

    // Log performance summary after page load
    loadListener = () => {
      setTimeout(() => {
        console.log('Performance Metrics:', metrics);
      }, 1000);
    };
    window.addEventListener('load', loadListener);
  });

  onDestroy(() => {
    // Clean up all observers
    observers.forEach(observer => observer.disconnect());
    observers = [];

    // Clear memory monitoring interval
    if (memoryInterval) {
      clearInterval(memoryInterval);
      memoryInterval = null;
    }

    // Remove event listener
    if (loadListener) {
      window.removeEventListener('load', loadListener);
      loadListener = null;
    }
  });
</script>

<!-- Performance monitoring component (no UI) -->