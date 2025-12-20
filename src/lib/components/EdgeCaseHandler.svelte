<script>
  import { onMount } from 'svelte';
  import NetworkStatus from './NetworkStatus.svelte';
  import LoadingState from './LoadingState.svelte';
  import Accessibility from './Accessibility.svelte';
  import PerformanceMonitor from './PerformanceMonitor.svelte';

  // Global edge case handlers
  let globalErrorHandler = null;
  let unhandledRejectionHandler = null;

  // Browser compatibility checks (simplified)
  function checkBrowserCompatibility() {
    const issues = [];

    // Only check for critical features
    if (!window.fetch) {
      issues.push('Fetch API not supported');
    }

    if (!('IntersectionObserver' in window)) {
      issues.push('IntersectionObserver not supported');
    }

    if (issues.length > 0) {
      console.warn('Browser compatibility issues:', issues);
    }

    return issues.length === 0;
  }

  // Simplified memory management
  function setupMemoryManagement() {
    // Basic cleanup on page unload
    window.addEventListener('beforeunload', () => {
      // Clear any global timers
      const highestId = window.setTimeout(() => {}, 0);
      for (let i = 0; i < highestId; i++) {
        window.clearTimeout(i);
        window.clearInterval(i);
      }
    });
  }

  // Handle unhandled promise rejections
  function setupUnhandledRejectionHandler() {
    unhandledRejectionHandler = (event) => {
      console.error('Unhandled promise rejection:', {
        reason: event.reason,
        promise: event.promise,
        type: event.type
      });

      // Prevent the default browser behavior (logging to console)
      event.preventDefault();

      // Could send to error tracking service
      // sendErrorToService(event.reason, 'unhandled-rejection');
    };

    window.addEventListener('unhandledrejection', unhandledRejectionHandler);
  }

  // Handle global errors
  function setupGlobalErrorHandler() {
    globalErrorHandler = (message, source, lineno, colno, error) => {
      console.error('Global error:', {
        message: message || 'Unknown error',
        source: source || 'Unknown source',
        lineno: lineno || 'Unknown line',
        colno: colno || 'Unknown column',
        error: error ? {
          name: error.name,
          message: error.message,
          stack: error.stack
        } : null
      });

      // Could send to error tracking service
      // sendErrorToService(error || message, 'global-error');

      // For debugging, don't prevent default browser error handling
      // Return false to allow default browser error handling
      return false;
    };

    window.onerror = globalErrorHandler;
  }

  // Emergency error handler that shows fallback UI
  function setupEmergencyErrorHandler() {
    window.addEventListener('error', (event) => {
      // Only show emergency fallback for critical errors
      if (event.error && event.error.message.includes('Loading')) {
        return; // Ignore loading errors
      }

      const fallback = document.getElementById('emergency-fallback');
      if (fallback && fallback.style.display !== 'block') {
        fallback.style.display = 'block';
        document.body.style.overflow = 'hidden';
      }
    });

    // Handle unrecoverable errors
    window.addEventListener('unhandledrejection', (event) => {
      const fallback = document.getElementById('emergency-fallback');
      if (fallback && event.reason && event.reason.message &&
          (event.reason.message.includes('fetch') || event.reason.message.includes('network'))) {
        // For network errors, don't show emergency fallback immediately
        return;
      }

      if (fallback && fallback.style.display !== 'block') {
        fallback.style.display = 'block';
        document.body.style.overflow = 'hidden';
      }
    });
  }

  // Simplified print styles
  function setupPrintStyles() {
    const printStyles = `
      @media print {
        * { background: transparent !important; color: black !important; }
        a, a:visited { text-decoration: underline; }
        .no-print { display: none !important; }
      }
    `;

    const style = document.createElement('style');
    style.textContent = printStyles;
    document.head.appendChild(style);
  }

  onMount(() => {
    // Initialize all edge case handlers
    checkBrowserCompatibility();
    setupMemoryManagement();
    setupUnhandledRejectionHandler();
    setupGlobalErrorHandler();
    setupEmergencyErrorHandler();
    setupPrintStyles();

    // Cleanup on component destroy
    return () => {
      if (globalErrorHandler) {
        window.onerror = null;
      }

      if (unhandledRejectionHandler) {
        window.removeEventListener('unhandledrejection', unhandledRejectionHandler);
      }
    };
  });
</script>

<!-- Include all edge case handling components -->
<NetworkStatus />
<Accessibility />
<PerformanceMonitor />

<slot />

<!-- Emergency fallback for critical errors -->
<div class="emergency-fallback" id="emergency-fallback" style="display: none;">
  <div style="padding: 2rem; text-align: center; font-family: system-ui;">
    <h1>⚠️ Something went wrong</h1>
    <p>This page encountered an unexpected error. Please try refreshing the page.</p>
    <button on:click={() => window.location.reload()} style="padding: 0.5rem 1rem; margin-top: 1rem;">
      Refresh Page
    </button>
  </div>
</div>