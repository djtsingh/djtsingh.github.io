<script>
  import '../app.css';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import SEO from '$lib/components/SEO.svelte';
</script>

<SEO />

<div class="app">
  <Header />
  
  <main class="main">
    <slot />
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
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }
  
  @media (min-width: 768px) {
    .main {
      padding: 3rem 2rem;
    }
  }
</style>
