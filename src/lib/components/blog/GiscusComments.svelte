<script>
  /**
   * GiscusComments - GitHub Discussions powered comments
   * Features: Theme syncing, lazy loading, elegant styling
   */
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  
  export let repo = 'djtsingh/djtsingh.github.io';
  export let repoId = ''; // Get from giscus.app
  export let category = 'Blog Comments';
  export let categoryId = ''; // Get from giscus.app
  
  let container;
  let isLoaded = false;
  let isVisible = false;
  
  onMount(() => {
    if (!browser) return;
    
    // Intersection observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !isLoaded) {
            isVisible = true;
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '100px' }
    );
    
    if (container) observer.observe(container);
    
    return () => observer.disconnect();
  });
  
  function loadGiscus() {
    if (isLoaded || !container) return;
    
    // Detect current theme
    const theme = document.documentElement.classList.contains('latte') 
      ? 'light' 
      : 'dark_dimmed';
    
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', repo);
    script.setAttribute('data-repo-id', repoId || 'R_placeholder');
    script.setAttribute('data-category', category);
    script.setAttribute('data-category-id', categoryId || 'DIC_placeholder');
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', theme);
    script.setAttribute('data-lang', 'en');
    script.setAttribute('data-loading', 'lazy');
    script.crossOrigin = 'anonymous';
    script.async = true;
    
    container.appendChild(script);
    isLoaded = true;
  }
  
  $: if (isVisible && browser) {
    loadGiscus();
  }
</script>

<section class="comments-section" aria-labelledby="comments-heading">
  <div class="comments-header">
    <h2 id="comments-heading" class="comments-title">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
      Comments
    </h2>
    <p class="comments-subtitle">
      Join the discussion • Powered by <a href="https://giscus.app" target="_blank" rel="noopener noreferrer">Giscus</a>
    </p>
  </div>
  
  <div class="giscus-container" bind:this={container}>
    {#if !isLoaded}
      <div class="loading-placeholder">
        <div class="loading-spinner"></div>
        <p>Loading comments...</p>
      </div>
    {/if}
  </div>
</section>

<style>
  .comments-section {
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid var(--surface1);
  }
  
  .comments-header {
    margin-bottom: 1.5rem;
  }
  
  .comments-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0 0 0.5rem;
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text);
  }
  
  .comments-title svg {
    color: var(--accent);
  }
  
  .comments-subtitle {
    margin: 0;
    font-size: 0.85rem;
    color: var(--subtext1);
  }
  
  .comments-subtitle a {
    color: var(--accent);
    text-decoration: none;
  }
  
  .comments-subtitle a:hover {
    text-decoration: underline;
  }
  
  .giscus-container {
    min-height: 200px;
  }
  
  .loading-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem;
    background: var(--surface0);
    border: 1px solid var(--surface1);
    border-radius: var(--radius-md);
    text-align: center;
  }
  
  .loading-spinner {
    width: 32px;
    height: 32px;
    border: 3px solid var(--surface1);
    border-top-color: var(--accent);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin-bottom: 1rem;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  .loading-placeholder p {
    margin: 0;
    font-size: 0.9rem;
    color: var(--subtext1);
  }
  
  /* Giscus styling overrides */
  .giscus-container :global(.giscus) {
    max-width: 100%;
  }
  
  .giscus-container :global(.giscus-frame) {
    border: none;
    width: 100%;
  }
</style>
