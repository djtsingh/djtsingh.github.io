<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { performanceMetrics } from '$lib/stores/performance.js';
  import SEO from '$lib/components/SEO.svelte';

  let metrics = {
    lcp: null,
    fid: null,
    cls: null,
    fcp: null,
    ttfb: null,
    memoryUsage: null,
    loadTime: null
  };

  let systemStatus = {
    network: 'nominal',
    performance: 'nominal',
    memory: 'nominal',
    accessibility: 'nominal'
  };

  // Subscribe to performance metrics
  onMount(() => {
    if (!browser) return;

    const unsubscribe = performanceMetrics.subscribe((data) => {
      metrics = { ...data };
      updateSystemStatus();
    });

    // Initial status check
    updateSystemStatus();

    return unsubscribe;
  });

  function updateSystemStatus() {
    if (!browser) return;

    // Network status
    if (navigator.onLine === false) {
      systemStatus.network = 'offline';
    } else if (navigator.connection) {
      const connection = navigator.connection;
      if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
        systemStatus.network = 'slow';
      } else {
        systemStatus.network = 'nominal';
      }
    }

    // Performance status
    if (metrics.lcp && metrics.lcp > 2500) {
      systemStatus.performance = 'degraded';
    } else if (metrics.cls && metrics.cls > 0.1) {
      systemStatus.performance = 'degraded';
    } else {
      systemStatus.performance = 'nominal';
    }

    // Memory status
    if (metrics.memoryUsage && metrics.memoryUsage.percentage > 80) {
      systemStatus.memory = 'high';
    } else {
      systemStatus.memory = 'nominal';
    }

    // Accessibility status (simplified)
    systemStatus.accessibility = 'nominal';
  }

  function getStatusColor(status) {
    switch (status) {
      case 'nominal': return '#10b981'; // green
      case 'degraded': return '#f59e0b'; // yellow
      case 'high': return '#ef4444'; // red
      case 'slow': return '#f59e0b'; // yellow
      case 'offline': return '#ef4444'; // red
      default: return '#6b7280'; // gray
    }
  }

  function getStatusIcon(status) {
    switch (status) {
      case 'nominal':
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22,4 12,14.01 9,11.01"/></svg>`;
      case 'degraded':
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`;
      case 'high':
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6"/><path d="M9 9l6 6"/></svg>`;
      case 'slow':
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>`;
      case 'offline':
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" y1="2" x2="12" y2="12"/><line x1="8" y1="6" x2="16" y2="6"/></svg>`;
      default:
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>`;
    }
  }

  function getMetricIcon(metricType) {
    switch (metricType) {
      case 'lcp':
        return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>`;
      case 'fid':
        return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`;
      case 'cls':
        return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 7h10"/><path d="M7 12h10"/><path d="M7 17h7"/></svg>`;
      case 'fcp':
        return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
      case 'loadTime':
        return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>`;
      case 'memory':
        return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><rect x="7" y="7" width="3" height="3"/><rect x="14" y="7" width="3" height="3"/><rect x="7" y="14" width="3" height="3"/><rect x="14" y="14" width="3" height="3"/></svg>`;
      default:
        return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>`;
    }
  }
</script>

<svelte:head>
  <title>System Status & Performance Metrics</title>
</svelte:head>

<SEO />

{#if browser}
  <div class="status-page">
    <div class="container">
      <header class="page-header">
        <h1>System Status & Performance Metrics</h1>
        <p>Real-time monitoring of website performance and system health</p>
      </header>

      <!-- System Status Overview -->
      <section class="status-overview">
        <h2>All Services Status</h2>
        <div class="status-grid">
          <div class="status-card">
            <div class="status-icon" style="color: {getStatusColor(systemStatus.network)}">
              {@html getStatusIcon(systemStatus.network)}
            </div>
            <h3>Network</h3>
            <p class="status-text" style="color: {getStatusColor(systemStatus.network)}">
              {systemStatus.network.toUpperCase()}
            </p>
          </div>

          <div class="status-card">
            <div class="status-icon" style="color: {getStatusColor(systemStatus.performance)}">
              {@html getStatusIcon(systemStatus.performance)}
            </div>
            <h3>Performance</h3>
            <p class="status-text" style="color: {getStatusColor(systemStatus.performance)}">
              {systemStatus.performance.toUpperCase()}
            </p>
          </div>

          <div class="status-card">
            <div class="status-icon" style="color: {getStatusColor(systemStatus.memory)}">
              {@html getStatusIcon(systemStatus.memory)}
            </div>
            <h3>Memory</h3>
            <p class="status-text" style="color: {getStatusColor(systemStatus.memory)}">
              {systemStatus.memory.toUpperCase()}
            </p>
          </div>

          <div class="status-card">
            <div class="status-icon" style="color: {getStatusColor(systemStatus.accessibility)}">
              {@html getStatusIcon(systemStatus.accessibility)}
            </div>
            <h3>Accessibility</h3>
            <p class="status-text" style="color: {getStatusColor(systemStatus.accessibility)}">
              {systemStatus.accessibility.toUpperCase()}
            </p>
          </div>
        </div>
      </section>

      <!-- Performance Metrics -->
      <section class="metrics-section">
        <h2>Performance Metrics</h2>
        <div class="metrics-grid">
          {#if metrics.lcp !== null}
            <div class="metric-card">
              <div class="metric-icon">
                {@html getMetricIcon('lcp')}
              </div>
              <h3>Largest Contentful Paint</h3>
              <div class="metric-value">{Math.round(metrics.lcp)}ms</div>
              <p class="metric-desc">Time until largest content element is visible</p>
              <div class="metric-status" style="color: {metrics.lcp < 2500 ? '#10b981' : '#ef4444'}">
                {metrics.lcp < 2500 ? 'Good' : 'Needs Improvement'}
              </div>
            </div>
          {/if}

          {#if metrics.fid !== null}
            <div class="metric-card">
              <div class="metric-icon">
                {@html getMetricIcon('fid')}
              </div>
              <h3>First Input Delay</h3>
              <div class="metric-value">{Math.round(metrics.fid)}ms</div>
              <p class="metric-desc">Time until page responds to user input</p>
              <div class="metric-status" style="color: {metrics.fid < 100 ? '#10b981' : '#ef4444'}">
                {metrics.fid < 100 ? 'Good' : 'Needs Improvement'}
              </div>
            </div>
          {/if}

          {#if metrics.cls !== null}
            <div class="metric-card">
              <div class="metric-icon">
                {@html getMetricIcon('cls')}
              </div>
              <h3>Cumulative Layout Shift</h3>
              <div class="metric-value">{metrics.cls.toFixed(3)}</div>
              <p class="metric-desc">Visual stability of page layout</p>
              <div class="metric-status" style="color: {metrics.cls < 0.1 ? '#10b981' : '#ef4444'}">
                {metrics.cls < 0.1 ? 'Good' : 'Needs Improvement'}
              </div>
            </div>
          {/if}

          {#if metrics.fcp !== null}
            <div class="metric-card">
              <div class="metric-icon">
                {@html getMetricIcon('fcp')}
              </div>
              <h3>First Contentful Paint</h3>
              <div class="metric-value">{Math.round(metrics.fcp)}ms</div>
              <p class="metric-desc">Time until first content is painted</p>
              <div class="metric-status" style="color: {metrics.fcp < 1800 ? '#10b981' : '#ef4444'}">
                {metrics.fcp < 1800 ? 'Good' : 'Needs Improvement'}
              </div>
            </div>
          {/if}

          {#if metrics.loadTime !== null}
            <div class="metric-card">
              <div class="metric-icon">
                {@html getMetricIcon('loadTime')}
              </div>
              <h3>Page Load Time</h3>
              <div class="metric-value">{Math.round(metrics.loadTime)}ms</div>
              <p class="metric-desc">Total time to load the page</p>
              <div class="metric-status" style="color: {metrics.loadTime < 3000 ? '#10b981' : '#ef4444'}">
                {metrics.loadTime < 3000 ? 'Good' : 'Needs Improvement'}
              </div>
            </div>
          {/if}

          {#if metrics.memoryUsage}
            <div class="metric-card">
              <div class="metric-icon">
                {@html getMetricIcon('memory')}
              </div>
              <h3>Memory Usage</h3>
              <div class="metric-value">{Math.round(metrics.memoryUsage.percentage)}%</div>
              <p class="metric-desc">JavaScript heap memory usage</p>
              <div class="metric-status" style="color: {metrics.memoryUsage.percentage < 80 ? '#10b981' : '#ef4444'}">
                {metrics.memoryUsage.percentage < 80 ? 'Good' : 'High'}
              </div>
            </div>
          {/if}
        </div>
      </section>

      <!-- System Information -->
      <section class="system-info">
        <h2>System Information</h2>
        <div class="info-grid">
          <div class="info-item">
            <h3>Browser</h3>
            <p>{window.navigator.userAgent.split(' ').pop()}</p>
          </div>
          <div class="info-item">
            <h3>Connection</h3>
            <p>{navigator.connection ? navigator.connection.effectiveType : 'Unknown'}</p>
          </div>
          <div class="info-item">
            <h3>Screen Size</h3>
            <p>{`${window.innerWidth} × ${window.innerHeight}`}</p>
          </div>
          <div class="info-item">
            <h3>Last Updated</h3>
            <p>{new Date().toLocaleString()}</p>
          </div>
        </div>
      </section>
    </div>
  </div>
{:else}
  <div class="status-page">
    <div class="container">
      <header class="page-header">
        <h1>System Status & Performance Metrics</h1>
        <p>Loading system information...</p>
      </header>
    </div>
  </div>
{/if}

<style>
  .status-page {
    min-height: 100vh;
    background: var(--base);
    color: var(--text);
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem var(--gutter);
  }

  .page-header {
    text-align: center;
    margin-bottom: 3rem;
  }

  .page-header h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, var(--accent), var(--text));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .page-header p {
    color: var(--subtext0);
    font-size: 1.1rem;
  }

  .status-overview, .metrics-section, .system-info {
    margin-bottom: 3rem;
  }

  .status-overview h2, .metrics-section h2, .system-info h2 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    color: var(--text);
  }

  .status-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  .status-card {
    background: var(--surface0);
    padding: 1.5rem;
    border-radius: var(--radius-lg);
    text-align: center;
    border: 1px solid var(--surface1);
  }

  .status-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  .status-card h3 {
    margin: 0.5rem 0;
    color: var(--text);
  }

  .status-text {
    font-weight: var(--font-weight-semibold);
    font-size: 1.1rem;
  }

  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .metric-card {
    background: var(--surface0);
    padding: 1.5rem;
    border-radius: var(--radius-lg);
    border: 1px solid var(--surface1);
  }

  .metric-icon {
    color: var(--accent);
    margin-bottom: 0.75rem;
    opacity: 0.8;
  }

  .metric-card h3 {
    margin: 0 0 0.5rem 0;
    color: var(--text);
    font-size: 1.1rem;
  }

  .metric-value {
    font-size: 2rem;
    font-weight: var(--font-weight-bold);
    color: var(--accent);
    margin: 0.5rem 0;
  }

  .metric-desc {
    color: var(--subtext0);
    font-size: 0.9rem;
    margin: 0.5rem 0;
  }

  .metric-status {
    font-weight: var(--font-weight-semibold);
    font-size: 0.9rem;
  }

  .info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  .info-item {
    background: var(--surface0);
    padding: 1.5rem;
    border-radius: var(--radius-lg);
    border: 1px solid var(--surface1);
  }

  .info-item h3 {
    margin: 0 0 0.5rem 0;
    color: var(--text);
    font-size: 1.1rem;
  }

  .info-item p {
    color: var(--subtext0);
    margin: 0;
  }

  @media (max-width: 768px) {
    .container {
      padding: 1rem var(--gutter);
    }

    .page-header h1 {
      font-size: 2rem;
    }

    .status-grid, .metrics-grid, .info-grid {
      grid-template-columns: 1fr;
    }

    .status-card, .metric-card, .info-item {
      padding: 1rem;
    }
  }
</style>