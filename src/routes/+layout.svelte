<script>
  import { page } from '$app/stores';
  import { fade, fly } from 'svelte/transition';
  import '../app.css';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import SEO from '$lib/components/SEO.svelte';
  
  $: pageKey = $page.url.pathname;
</script>

<SEO />

<div class="app">
  <Header />
  
  <main class="main">
    {#key pageKey}
      <div class="page-transition" in:fly={{ y: 20, duration: 400, delay: 200 }} out:fade={{ duration: 200 }}>
        <slot />
      </div>
    {/key}
  </main>
  
  <Footer />
</div>

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
