<script>
  import { page } from '$app/stores';
  import ThemeSelector from './ThemeSelector.svelte';

  export let menuOpen = false;
  export const toggleMenu = () => {};
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
    const focusableElements = menuElement.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    firstFocusableElement = focusableElements[0];
    lastFocusableElement = focusableElements[focusableElements.length - 1];

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
        if (document.activeElement === firstFocusableElement) {
          event.preventDefault();
          lastFocusableElement.focus();
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          event.preventDefault();
          firstFocusableElement.focus();
        }
      }
    }
  }

  $: currentPath = $page.url.pathname;
</script>

<svelte:window on:keydown={handleKeydown} on:keydown={handleTabKey} />

<!-- Overlay -->
{#if menuOpen}
  <div 
    class="overlay" 
    on:click={closeMenu} 
    on:keydown={(e) => e.key === 'Enter' && closeMenu()}
    role="button" 
    tabindex="-1"
    aria-label="Close menu"
  ></div>
{/if}

<!-- Unified Slide Menu -->
<div
  class="unified-menu"
  class:open={menuOpen}
  role="dialog"
  aria-modal="true"
  aria-labelledby="menu-title"
  id="unified-menu"
  bind:this={menuElement}
>
  <div class="menu-header">
    <span class="menu-title" id="menu-title">Navigation</span>
    <button 
      class="close-btn" 
      on:click={closeMenu} 
      aria-label="Close menu"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        aria-hidden="true"
      >
        <path d="M18 6L6 18M6 6l12 12"></path>
      </svg>
    </button>
  </div>

  <nav class="menu-nav" aria-label="Site navigation">
    <!-- Main Navigation -->
    {#if mainNavItems.length > 0}
      <div class="nav-section main-nav">
        <span class="section-label">Pages</span>
        {#each mainNavItems as item}
          <a 
            href={item.href} 
            on:click={closeMenu} 
            class:active={currentPath === item.href} 
            target={item.external ? '_blank' : null} 
            rel={item.external ? 'noopener noreferrer' : null} 
            aria-current={currentPath === item.href ? 'page' : null}
          >
            <span class="nav-text">{item.label}</span>
            {#if item.external}
              <svg class="external-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
              <span class="sr-only">(opens in new tab)</span>
            {/if}
          </a>
        {/each}
      </div>
    {/if}

    <!-- More Section -->
    {#if moreNavItems.length > 0}
      <div class="nav-section more-nav">
        <span class="section-label">More</span>
        {#each moreNavItems as item}
          <a 
            href={item.href} 
            on:click={closeMenu} 
            class:active={currentPath === item.href} 
            aria-current={currentPath === item.href ? 'page' : null}
          >
            <span class="nav-text">{item.label}</span>
          </a>
        {/each}
      </div>
    {/if}
  </nav>

  <div class="menu-footer">
    <ThemeSelector />
  </div>
</div>

<style>
  /* Overlay */
  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    z-index: 110;
    animation: fadeIn 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      backdrop-filter: blur(0px);
    }
    to {
      opacity: 1;
      backdrop-filter: blur(8px);
    }
  }

  /* Unified Menu */
  .unified-menu {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: min(90vw, 320px);
    background: var(--mantle);
    border-left: 1px solid var(--surface0);
    box-shadow: -4px 0 24px rgba(0, 0, 0, 0.3);
    z-index: 120;
    transform: translateX(100%);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .unified-menu.open {
    transform: translateX(0);
  }

  /* Menu Header */
  .menu-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
    padding: 0 1.5rem;
    border-bottom: 1px solid var(--surface0);
    flex-shrink: 0;
    background: var(--mantle);
  }

  .menu-title {
    color: var(--accent);
    font-size: 1.125rem;
    font-weight: 600;
    letter-spacing: -0.01em;
  }

  .close-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    background: transparent;
    border: none;
    color: var(--subtext1);
    cursor: pointer;
    border-radius: var(--radius-sm);
    transition: all 0.2s ease;
  }

  .close-btn:hover {
    background: var(--surface0);
    color: var(--red);
  }

  .close-btn:active {
    transform: scale(0.95);
  }

  /* Menu Navigation */
  .menu-nav {
    flex: 1;
    padding: 1.5rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    overflow-y: auto;
    overflow-x: hidden;
  }

  /* Custom scrollbar */
  .menu-nav::-webkit-scrollbar {
    width: 6px;
  }

  .menu-nav::-webkit-scrollbar-track {
    background: transparent;
  }

  .menu-nav::-webkit-scrollbar-thumb {
    background: var(--surface0);
    border-radius: 3px;
  }

  .menu-nav::-webkit-scrollbar-thumb:hover {
    background: var(--surface1);
  }

  /* Nav Sections */
  .nav-section {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .section-label {
    color: var(--subtext1);
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    padding: 0.5rem 0.75rem 0.25rem;
    margin-bottom: 0.25rem;
  }

  .nav-section a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    padding: 0.875rem 0.75rem;
    border-radius: var(--radius-sm);
    color: var(--text);
    text-decoration: none;
    font-size: 0.9375rem;
    font-weight: 500;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  }

  .nav-section a::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: var(--accent);
    transform: scaleY(0);
    transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .nav-section a:hover {
    background: var(--surface0);
    color: var(--accent);
    padding-left: 1rem;
  }

  .nav-section a:hover::before {
    transform: scaleY(1);
  }

  .nav-section a.active {
    background: var(--surface0);
    color: var(--accent);
    font-weight: 600;
  }

  .nav-section a.active::before {
    transform: scaleY(1);
  }

  .nav-section a:active {
    transform: scale(0.98);
  }

  .nav-text {
    flex: 1;
  }

  .external-icon {
    flex-shrink: 0;
    opacity: 0.5;
    transition: opacity 0.2s ease;
  }

  .nav-section a:hover .external-icon {
    opacity: 1;
  }

  /* Menu Footer */
  .menu-footer {
    padding: 1.5rem 1rem;
    border-top: 1px solid var(--surface0);
    flex-shrink: 0;
    background: var(--mantle);
  }

  /* Screen reader only */
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

  /* Responsive adjustments */
  @media (min-width: 640px) {
    .unified-menu {
      width: min(400px, 50vw);
    }

    .menu-header {
      padding: 0 2rem;
    }

    .menu-nav {
      padding: 2rem 1.5rem;
    }

    .menu-footer {
      padding: 2rem 1.5rem;
    }
  }

  @media (min-width: 1024px) {
    .unified-menu {
      width: clamp(320px, 25vw, 420px);
    }
  }

  /* Smooth scrolling on mobile */
  @media (max-width: 639px) {
    .unified-menu {
      -webkit-overflow-scrolling: touch;
    }

    .nav-section a {
      padding: 1rem 0.75rem;
      font-size: 1rem;
    }
  }

  /* Reduce motion */
  @media (prefers-reduced-motion: reduce) {
    .unified-menu,
    .overlay,
    .nav-section a {
      transition-duration: 0.01ms !important;
    }
  }
</style>