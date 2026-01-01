<script>
  import { page } from '$app/stores';
  import { fade } from 'svelte/transition';
  import '../app.css';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import SEO from '$lib/components/SEO.svelte';
  import EdgeCaseHandler from '$lib/components/EdgeCaseHandler.svelte';
  import PerformanceDashboard from '$lib/components/PerformanceDashboard.svelte';
  import PageWrapper from '$lib/components/PageWrapper.svelte';
  import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals';
  
  const IS_PROD = import.meta.env.PROD;
  
  // Web Vitals Performance Monitoring
  if (IS_PROD && typeof window !== 'undefined') {
    function sendToGoogleAnalytics({ name, delta, value, id }) {
      // Send to Google Analytics
      window.gtag('event', name, {
        event_category: 'Web Vitals',
        event_label: id,
        value: Math.round(name === 'CLS' ? delta * 1000 : delta),
        custom_map: { metric_value: value }
      });
    }

    // Track all Core Web Vitals (INP replaces deprecated FID)
    onCLS(sendToGoogleAnalytics);
    onINP(sendToGoogleAnalytics);
    onFCP(sendToGoogleAnalytics);
    onLCP(sendToGoogleAnalytics);
    onTTFB(sendToGoogleAnalytics);
  }
</script>

<svelte:head>
  {#if IS_PROD}
    <!-- Google tag (gtag.js) - async + defer for non-blocking -->
    <script async defer src="https://www.googletagmanager.com/gtag/js?id=G-84DNZR8VET"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);} 
      gtag('js', new Date());
      gtag('config', 'G-84DNZR8VET');
    </script>
  {/if}
  
  <!-- Performance optimizations -->
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
</svelte:head>

<SEO />

<EdgeCaseHandler>
  <div class="app">
    <Header />
    
    <main class="main" id="main-content" tabindex="-1">
      <PageWrapper>
        <div class="page-transition" in:fade={{ duration: 200 }} out:fade={{ duration: 200 }}>
          <slot />
        </div>
      </PageWrapper>
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
  
  /* Page wrapper handled by src/lib/components/PageWrapper.svelte */
</style>
