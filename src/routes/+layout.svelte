<script>
  import { page } from '$app/stores';
  import { fade } from 'svelte/transition';
  import '../app.css';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import SEO from '$lib/components/SEO.svelte';
  import EdgeCaseHandler from '$lib/components/EdgeCaseHandler.svelte';
  import PerformanceDashboard from '$lib/components/PerformanceDashboard.svelte';
  
  const IS_PROD = import.meta.env.PROD;
</script>

<svelte:head>
  {#if IS_PROD}
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-84DNZR8VET"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);} 
      gtag('js', new Date());
      gtag('config', 'G-84DNZR8VET');
    </script>
    
    <!-- Web Vitals Performance Monitoring -->
    <script>
      import { onCLS, onFID, onFCP, onLCP, onTTFB } from 'web-vitals';

      function sendToGoogleAnalytics({ name, delta, value, id }) {
        // Send to Google Analytics
        gtag('event', name, {
          event_category: 'Web Vitals',
          event_label: id,
          value: Math.round(name === 'CLS' ? delta * 1000 : delta),
          custom_map: { metric_value: value }
        });
      }

      // Track all Core Web Vitals
      onCLS(sendToGoogleAnalytics);
      onFID(sendToGoogleAnalytics);
      onFCP(sendToGoogleAnalytics);
      onLCP(sendToGoogleAnalytics);
      onTTFB(sendToGoogleAnalytics);
    </script>
  {/if}
  
  <!-- Performance optimizations -->
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
</svelte:head>

<SEO />

<EdgeCaseHandler>
  <div class="app">
    <Header />
    
    <main class="main" id="main-content" tabindex="-1">
      <div class="page-transition" in:fade={{ duration: 200 }} out:fade={{ duration: 200 }}>
        <slot />
      </div>
    </main>
    
    <Footer />
  </div>

  <PerformanceDashboard />
</EdgeCaseHandler>

<style>
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  .main {
    flex: 1;
    width: 100%;
    padding-top: 4.5rem;
  }
  
  .page-transition {
    width: 100%;
    max-width: var(--container-max);
    margin: 0 auto;
    padding: 1rem var(--gutter);
  }
  
  @media (min-width: 768px) {
    .page-transition {
      padding: 1.5rem 2rem;
    }
  }
</style>
