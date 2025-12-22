<script>
  import { page } from '$app/stores';
  import { fade } from 'svelte/transition';
  import '../app.css';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import SEO from '$lib/components/SEO.svelte';
  import EdgeCaseHandler from '$lib/components/EdgeCaseHandler.svelte';
  
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
  {/if}
</svelte:head>

<SEO />

<EdgeCaseHandler>
  <div class="app">
    <Header />
    
    <main class="main" id="main-content">
      <div class="page-transition" in:fade={{ duration: 200 }} out:fade={{ duration: 200 }}>
        <slot />
      </div>
    </main>
    
    <Footer />
  </div>
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
