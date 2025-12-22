<script>
  import { page } from '$app/stores';
  import ThemeSelector from './ThemeSelector.svelte';

  export let menuOpen = false;
  export let toggleMenu = () => {};
  export let closeMenu = () => {};
  export let mainNavItems = [];
  export let moreNavItems = [];

  // Handle ESC key
  function handleKeydown(event) {
    if (event.key === 'Escape' && menuOpen) {
      closeMenu();
    }
  }

  // Focus management
  let menuElement;
  let firstFocusableElement;
  let lastFocusableElement;

  $: if (menuOpen && menuElement) {
    // Get all focusable elements
    const focusableElements = menuElement.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    firstFocusableElement = focusableElements[0];
    lastFocusableElement = focusableElements[focusableElements.length - 1];

    // Focus first element when menu opens
    setTimeout(() => {
      if (firstFocusableElement) {
        firstFocusableElement.focus();
      }
    }, 100);
  }

  // Handle tab navigation within menu
  function handleTabKey(event) {
    if (!menuOpen) return;

    if (event.key === 'Tab') {
      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstFocusableElement) {
          event.preventDefault();
          lastFocusableElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastFocusableElement) {
          event.preventDefault();
          firstFocusableElement.focus();
        }
      }
    }
  }

  // Get current page for active states
  $: currentPath = $page.url.pathname;
</script>

<svelte:window on:keydown={handleKeydown} on:keydown={handleTabKey} />

<!-- Overlay -->
{#if menuOpen}
  <div class="overlay" on:click={closeMenu} role="button" tabindex="0"></div>
{/if}

<!-- Unified Slide Menu -->
<aside class="unified-menu" class:open={menuOpen} role="dialog" aria-modal="true" aria-labelledby="menu-title" id="unified-menu" bind:this={menuElement}>
  <div class="menu-header">
    <span class="menu-title" id="menu-title">Navigation</span>
    <button class="close-btn" on:click={closeMenu} aria-label="Close menu">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M18 6L6 18M6 6l12 12"></path>
      </svg>
    </button>
  </div>

  <nav class="menu-nav" role="navigation" aria-label="Site navigation">
    <!-- Main Navigation -->
    <div class="nav-section main-nav">
      {#each mainNavItems as item}
        <a href={item.href} on:click={closeMenu} class:active={currentPath === item.href} target={item.external ? '_blank' : null} rel={item.external ? 'noopener noreferrer' : null} aria-current={currentPath === item.href ? 'page' : null}>
          {item.label}
          {#if item.external}
            <span class="sr-only">(opens in new tab)</span>
          {/if}
        </a>
      {/each}
    </div>

    <!-- More Section -->
    <div class="nav-section more-nav">
      {#each moreNavItems as item}
        <a href={item.href} on:click={closeMenu} class:active={currentPath === item.href} aria-current={currentPath === item.href ? 'page' : null}>{item.label}</a>
      {/each}
    </div>
  </nav>

  <div class="menu-footer">
    <ThemeSelector />
  </div>
</aside>

<style>
  /* Menu Button */
  .menu-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    background: transparent;
    border: none;
    border-radius: var(--radius-sm);
    color: var(--text);
    cursor: pointer;
    transition: background 0.15s ease, color 0.15s ease;
  }

  .menu-btn:hover {
    background: var(--surface0);
    color: var(--accent);
  }

  .menu-btn svg {
    transition: transform 0.2s ease;
  }

  /* Overlay */
  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    z-index: 110;
    animation: fadeIn 0.2s ease;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      backdrop-filter: blur(0px);
      -webkit-backdrop-filter: blur(0px);
    }
    to {
      opacity: 1;
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
    }
  }

  /* Unified Menu */
  .unified-menu {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 90vw;
    max-width: 320px;
    background: var(--mantle);
    border-left: 1px solid var(--surface0);
    z-index: 120;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }

  /* Responsive widths */
  @media (min-width: 640px) {
    .unified-menu {
      width: 50vw;
      max-width: 400px;
    }
  }

  @media (min-width: 1024px) {
    .unified-menu {
      width: 20%;
      max-width: 360px;
      min-width: 280px;
      height: auto;
      max-height: 100vh;
      bottom: auto;
      overflow-y: visible;
      border-left: 1px solid var(--surface0);
    }
  }

  .unified-menu.open {
    transform: translateX(0);
  }

  /* Menu Header */
  .menu-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 4rem;
    padding: 0 var(--gutter);
    border-bottom: 1px solid var(--surface0);
    flex-shrink: 0;
  }

  .menu-title {
    color: var(--accent);
    font-size: 1.125rem;
    font-weight: 600;
  }

  .close-btn {
    background: transparent;
    border: none;
    color: var(--subtext1);
    cursor: pointer;
    padding: 4px;
    border-radius: var(--radius-sm);
    transition: color 0.15s ease;
  }

  .close-btn:hover {
    color: var(--red);
  }

  /* Menu Navigation */
  .menu-nav {
    flex: 1;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow-y: auto;
  }

  /* Custom scrollbar */
  .menu-nav::-webkit-scrollbar {
    width: 8px;
  }

  .menu-nav::-webkit-scrollbar-track {
    background: var(--mantle);
    border-radius: 4px;
  }

  .menu-nav::-webkit-scrollbar-thumb {
    background: var(--surface0);
    border-radius: 4px;
  }

  .menu-nav::-webkit-scrollbar-thumb:hover {
    background: var(--surface1);
  }

  .nav-section {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .nav-section a {
    display: block;
    padding: 0.75rem 1rem;
    border-radius: var(--radius-sm);
    color: var(--text);
    text-decoration: none;
    transition: background 0.15s ease, color 0.15s ease;
  }

  .nav-section a:hover,
  .nav-section a.active {
    background: var(--surface0);
    color: var(--accent);
  }

  /* Smaller buttons on desktop */
  @media (min-width: 1024px) {
    .nav-section a {
      padding: 0.5rem 0.75rem;
      font-size: 0.9rem;
    }
  }

  .section-title {
    color: var(--subtext1);
    font-size: 0.875rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.5rem;
    padding: 0 1rem;
  }

  /* Menu Footer */
  .menu-footer {
    padding: 1rem;
    border-top: 1px solid var(--surface0);
    flex-shrink: 0;
    background: var(--mantle);
  }

  /* Ensure smooth scrolling on mobile */
  @media (max-width: 639px) {
    .unified-menu {
      -webkit-overflow-scrolling: touch;
    }
  }

  /* Handle rapid clicks */
  .menu-btn:active {
    transform: scale(0.95);
  }

  /* Screen reader only text */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
</style>