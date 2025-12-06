<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  
  let visible = false;
  
  function checkScroll() {
    if (!browser) return;
    visible = window.scrollY > 400;
  }
  
  function scrollToTop() {
    if (!browser) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  onMount(() => {
    if (browser) {
      checkScroll();
      window.addEventListener('scroll', checkScroll, { passive: true });
      return () => window.removeEventListener('scroll', checkScroll);
    }
  });
</script>

{#if visible}
  <button class="back-to-top" on:click={scrollToTop} aria-label="Back to top">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m18 15-6-6-6 6"/>
    </svg>
  </button>
{/if}

<style>
  .back-to-top {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--surface0);
    color: var(--text);
    border: 1px solid var(--surface1);
    border-radius: var(--radius-full);
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    transition: all var(--duration-normal) var(--ease-smooth);
    z-index: 100;
    animation: slideIn var(--duration-normal) ease-out;
  }
  
  .back-to-top:hover {
    background: var(--surface1);
    border-color: var(--accent);
    color: var(--accent);
    transform: translateY(-4px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
  }
  
  .back-to-top:active {
    transform: translateY(-2px);
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @media (max-width: 768px) {
    .back-to-top {
      bottom: 1.5rem;
      right: 1.5rem;
      width: 44px;
      height: 44px;
    }
  }
</style>
