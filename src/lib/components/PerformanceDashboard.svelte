<script>
  import { performanceMetrics } from '$lib/stores/performance.js';
  import { dev } from '$app/environment';

  $: metrics = $performanceMetrics;

  // Only show in development
  if (!dev) {
    // Component returns nothing in production
  }
</script>

{#if dev}
<div class="performance-dashboard">
  <h3>Performance Metrics</h3>
  <div class="metrics-grid">
    <div class="metric">
      <span class="label">LCP</span>
      <span class="value">{metrics.lcp ? `${Math.round(metrics.lcp)}ms` : '...'}</span>
      <span class="status" class:good={metrics.lcp && metrics.lcp < 2500} class:needs-improvement={metrics.lcp && metrics.lcp >= 2500 && metrics.lcp < 4000} class:poor={metrics.lcp && metrics.lcp >= 4000}>
        {metrics.lcp && metrics.lcp < 2500 ? 'Good' : metrics.lcp && metrics.lcp < 4000 ? 'Needs Work' : metrics.lcp ? 'Poor' : '...'}
      </span>
    </div>

    <div class="metric">
      <span class="label">FID</span>
      <span class="value">{metrics.fid ? `${Math.round(metrics.fid)}ms` : '...'}</span>
      <span class="status" class:good={metrics.fid && metrics.fid < 100} class:needs-improvement={metrics.fid && metrics.fid >= 100 && metrics.fid < 300} class:poor={metrics.fid && metrics.fid >= 300}>
        {metrics.fid && metrics.fid < 100 ? 'Good' : metrics.fid && metrics.fid < 300 ? 'Needs Work' : metrics.fid ? 'Poor' : '...'}
      </span>
    </div>

    <div class="metric">
      <span class="label">CLS</span>
      <span class="value">{metrics.cls ? metrics.cls.toFixed(3) : '...'}</span>
      <span class="status" class:good={metrics.cls && metrics.cls < 0.1} class:needs-improvement={metrics.cls && metrics.cls >= 0.1 && metrics.cls < 0.25} class:poor={metrics.cls && metrics.cls >= 0.25}>
        {metrics.cls && metrics.cls < 0.1 ? 'Good' : metrics.cls && metrics.cls < 0.25 ? 'Needs Work' : metrics.cls ? 'Poor' : '...'}
      </span>
    </div>

    <div class="metric">
      <span class="label">FCP</span>
      <span class="value">{metrics.fcp ? `${Math.round(metrics.fcp)}ms` : '...'}</span>
    </div>

    <div class="metric">
      <span class="label">TTFB</span>
      <span class="value">{metrics.ttfb ? `${Math.round(metrics.ttfb)}ms` : '...'}</span>
    </div>

    {#if metrics.memoryUsage}
      <div class="metric">
        <span class="label">Memory</span>
        <span class="value">{Math.round(metrics.memoryUsage.percentage)}%</span>
      </div>
    {/if}
  </div>
</div>
{/if}

<style>
  .performance-dashboard {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: var(--base);
    border: 1px solid var(--surface0);
    border-radius: var(--radius-md);
    padding: 1rem;
    max-width: 300px;
    font-size: 0.875rem;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .performance-dashboard h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1rem;
    font-weight: var(--font-weight-semibold);
    color: var(--text);
  }

  .metrics-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
  }

  .metric {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 0.5rem;
    background: var(--surface0);
    border-radius: var(--radius-sm);
  }

  .label {
    font-weight: var(--font-weight-medium);
    color: var(--subtext0);
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .value {
    font-weight: var(--font-weight-semibold);
    color: var(--text);
    font-size: 0.875rem;
  }

  .status {
    font-size: 0.75rem;
    padding: 0.125rem 0.25rem;
    border-radius: var(--radius-sm);
    text-align: center;
  }

  .status.good {
    background: #a6e3a1;
    color: #1e1e2e;
  }

  .status.needs-improvement {
    background: #f9e2af;
    color: #1e1e2e;
  }

  .status.poor {
    background: #f38ba8;
    color: #1e1e2e;
  }
</style>