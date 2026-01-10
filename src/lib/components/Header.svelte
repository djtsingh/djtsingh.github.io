<script>
  import { page } from '$app/stores';
  import UnifiedMenu from './UnifiedMenu.svelte';
  
  let menuOpen = false;
  
  function toggleMenu() {
    menuOpen = !menuOpen;
  }
  
  function closeMenu() {
    menuOpen = false;
  }
  
  // Navigation items
  const mainNavItems = [
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/posts', label: 'Posts' },
    { href: '/assets/dj-web.pdf', label: 'Resume', external: true }
  ];
  
  const moreNavItems = [
    { href: '/journey', label: 'Journey' },
    { href: '/certifications', label: 'Certifications' },
    { href: '/socials', label: 'Socials' }
  ];
  
  // Get current page name for terminal nav
  $: currentPath = $page.url.pathname;
  $: pageName = currentPath === '/' ? '' : currentPath.replace('/', '').replace('.html', '');
  $: displayName = pageName.includes('/') ? pageName.split('/').pop() : pageName;
  $: fullPath = pageName ? '/' + pageName + '/' : '';
  $: shortDisplayName = displayName ? '/' + displayName + '/' : '';
</script>

<header class="header">
  <div class="container header-inner">
    <!-- Terminal nav -->
    <nav class="terminal-nav" aria-label="Breadcrumb navigation">
      <a href="/" class="tilde" aria-label="Go to home page">$</a>
      {#if pageName}
        <!-- Full path for wide screens -->
        <span class="current-path full-path" aria-hidden="true">{fullPath}</span>
        <!-- Shortened path for narrow screens -->
        <span class="current-path short-path" aria-hidden="true">{shortDisplayName}</span>
      {/if}
      <span class="cursor" aria-hidden="true"></span>
    </nav>
    
    <!-- Desktop nav -->
    <nav class="desktop-nav" aria-label="Main navigation" id="site-navigation">
      {#each mainNavItems as item}
        <a 
          href={item.href} 
          class:active={currentPath === item.href} 
          target={item.external ? '_blank' : null} 
          rel={item.external ? 'noopener noreferrer' : null}
          aria-current={currentPath === item.href ? 'page' : null}
        >
          {item.label}
          {#if item.external}
            <span class="sr-only">(opens in new tab)</span>
          {/if}
        </a>
      {/each}
      <button 
        on:click={toggleMenu} 
        aria-expanded={menuOpen}
        aria-controls="unified-menu"
        aria-label="Open additional navigation menu"
      >
        More...
      </button>
    </nav>
    
    <!-- Mobile Menu Button (narrow screens only) -->
    <button 
      class="mobile-menu-btn" 
      on:click={toggleMenu} 
      aria-expanded={menuOpen}
      aria-controls="unified-menu"
      aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M3 6h18M3 12h18M3 18h18"></path>
      </svg>
    </button>
  </div>
</header>

<!-- Unified Menu -->
<UnifiedMenu {menuOpen} {toggleMenu} {closeMenu} {mainNavItems} {moreNavItems} />

<style>
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background: rgba(var(--mantle-rgb), 0.75);
    backdrop-filter: blur(6px) saturate(140%);
    -webkit-backdrop-filter: blur(6px) saturate(140%);
  }
  
  .header-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 4.5rem;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    gap: 1rem;
  }
  
  .terminal-nav {
    display: flex;
    align-items: center;
    gap: 2px;
    font-size: 0.9rem;
    user-select: none;
    min-width: 0;
    max-width: 50%;
    overflow: hidden;
  }
  
  .tilde {
    color: var(--accent);
    flex-shrink: 0;
  }
  
  .tilde:hover {
    opacity: 0.7;
  }
  
  .current-path {
    color: var(--text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  /* Responsive path display */
  .full-path {
    display: none;
  }
  
  .short-path {
    display: inline;
  }
  
  @media (min-width: 640px) {
    .terminal-nav {
      font-size: 1rem;
      max-width: none;
    }
    
    .full-path {
      display: inline;
    }
    
    .short-path {
      display: none;
    }
  }
  
  .cursor {
    width: 6px;
    height: 20px;
    background: var(--accent);
    margin-left: 4px;
    animation: blink 2s step-end infinite;
  }
  
  .desktop-nav {
    display: none;
    align-items: center;
    gap: 1.5rem;
  }
  
  .desktop-nav a, .desktop-nav button {
    padding: 0.5rem 0.875rem;
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--text);
    background: transparent;
    border: none;
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: color 0.15s ease;
  }
  
  .desktop-nav a:hover, .desktop-nav button:hover,
  .desktop-nav a.active {
    color: var(--accent);
  }
  
  .mobile-menu-btn {
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
  
  .mobile-menu-btn:hover {
    background: var(--surface0);
    color: var(--accent);
  }
  
  @media (min-width: 768px) {
    .desktop-nav {
      display: flex;
    }
    
    .mobile-menu-btn {
      display: none;
    }
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
