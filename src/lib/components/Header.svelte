<script>
  import { page } from '$app/stores';
  import ThemeSelector from './ThemeSelector.svelte';
  
  let sidebarOpen = false;
  let morePanelOpen = false;
  let breadcrumb = [];
  
  function toggleSidebar() {
    sidebarOpen = !sidebarOpen;
  }
  
  function toggleMorePanel() {
    morePanelOpen = !morePanelOpen;
  }
  
  function closePanels() {
    sidebarOpen = false;
    morePanelOpen = false;
  }
  
  // Get current page name and breadcrumb parts for terminal nav
  $: currentPath = $page.url.pathname;
  $: pathParts = currentPath.split('/').filter(Boolean);
  $: isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  // Breadcrumb logic: show truncated previous folder if path is too long on mobile
  $: {
    if (pathParts.length > 1 && isMobile) {
      // Truncate previous folder if combined length is too long
      const prev = pathParts[pathParts.length - 2];
      const curr = pathParts[pathParts.length - 1];
      const maxPrev = 8;
      const maxTotal = 18;
      let prevDisplay = prev;
      if ((prev.length + curr.length + 1) > maxTotal) {
        prevDisplay = prev.slice(0, maxPrev) + '…';
      }
      breadcrumb = [prevDisplay, curr];
    } else {
      breadcrumb = pathParts;
    }
  }
  $: pageName = pathParts.length ? pathParts[pathParts.length - 1] : '';
</script>

<header class="header">
  <div class="container header-inner">
    <!-- Terminal nav -->

    <nav class="terminal-nav">
      <a href="/" class="tilde">$</a>
      {#if pathParts.length === 0}
        <span class="cursor"></span>
      {:else if pathParts.length === 1}
        <span class="separator">/</span>
        <span class="current-path">{pathParts[0]}</span>
        <span class="cursor"></span>
      {:else}
        <span class="separator">/</span>
        {#if isMobile}
          <span class="breadcrumb-mobile">
            <span class="breadcrumb-prev">{breadcrumb[0]}</span>
            <span class="separator">/</span>
            <span class="current-path">{breadcrumb[1]}</span>
          </span>
        {:else}
          <span class="breadcrumb-desktop">
            {#each pathParts as part, i}
              {#if i > 0}<span class="separator">/</span>{/if}
              <span class="current-path">{part}</span>
            {/each}
          </span>
        {/if}
        <span class="cursor"></span>
      {/if}
    </nav>
    
    <!-- Desktop nav -->
    <nav class="desktop-nav">
      <a href="/about" class:active={currentPath === '/about'}>About</a>
      <a href="/projects" class:active={currentPath === '/projects'}>Projects</a>
      <a href="/posts" class:active={currentPath === '/posts'}>Posts</a>
      <a href="/assets/DJ_resume.pdf" target="_blank" rel="noopener noreferrer">Resume</a>
      <button on:click={toggleMorePanel}>More...</button>
    </nav>
    
    <!-- Mobile menu button -->
    <button class="mobile-menu-btn" on:click={toggleSidebar} aria-label="Open menu">
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 6h18M3 12h18M3 18h18"></path>
      </svg>
    </button>
  </div>
</header>

<!-- Overlay -->
{#if sidebarOpen || morePanelOpen}
  <div class="overlay" on:click={closePanels} on:keydown={closePanels} role="button" tabindex="0"></div>
{/if}

<!-- Mobile Sidebar -->
<aside class="sidebar" class:open={sidebarOpen}>
  <div class="sidebar-header">
    <span class="sidebar-title">Navigation</span>
    <button class="close-btn" on:click={toggleSidebar} aria-label="Close menu">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 6L6 18M6 6l12 12"></path>
      </svg>
    </button>
  </div>
  <nav class="sidebar-nav">
    <a href="/about" on:click={closePanels}>About</a>
    <a href="/projects" on:click={closePanels}>Projects</a>
    <a href="/posts" on:click={closePanels}>Posts</a>
    <a href="/journey" on:click={closePanels}>Journey</a>
    <a href="/certifications" on:click={closePanels}>Certifications</a>
    <a href="/socials" on:click={closePanels}>Socials</a>
    <a href="/assets/DJ_resume.pdf" target="_blank" rel="noopener noreferrer">Resume</a>
  </nav>
  <div class="sidebar-footer">
    <ThemeSelector />
  </div>
</aside>

<!-- More Panel -->
<aside class="more-panel" class:open={morePanelOpen}>
  <div class="panel-header">
    <strong>More</strong>
    <button class="close-btn" on:click={toggleMorePanel} aria-label="Close">✕</button>
  </div>
  <div class="panel-content">
    <nav class="more-nav">
      <a href="/journey" on:click={closePanels}>Journey</a>
      <a href="/certifications" on:click={closePanels}>Certifications</a>
      <a href="/socials" on:click={closePanels}>Socials</a>
    </nav>
    <div class="more-divider"></div>
    <ThemeSelector />
  </div>
</aside>

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
    font-size: 1rem;
    user-select: none;
  }

  .tilde {
    color: var(--accent);
    font-size: 1.2em;
  }

  .tilde:hover {
    opacity: 0.7;
  }

  .separator {
    color: var(--subtext1);
    font-size: 1em;
  }

  .current-path {
    color: var(--text);
    font-weight: 500;
    font-size: 1em;
    max-width: 8em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
    vertical-align: bottom;
  }

  .breadcrumb-mobile {
    display: flex;
    align-items: center;
    max-width: 12em;
    overflow: hidden;
  }
  .breadcrumb-prev {
    max-width: 5em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--subtext1);
    font-size: 0.95em;
  }
  .breadcrumb-desktop {
    display: flex;
    align-items: center;
  }

  @media (max-width: 767px) {
    .terminal-nav {
      font-size: 0.92rem;
    }
    .tilde {
      font-size: 1em;
    }
    .current-path {
      font-size: 0.95em;
      max-width: 6em;
    }
    .breadcrumb-mobile {
      max-width: 8em;
    }
    .breadcrumb-prev {
      max-width: 3.5em;
      font-size: 0.9em;
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
  
  /* Sidebar */
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 80%;
    max-width: 320px;
    background: var(--mantle);
    border-right: 1px solid var(--surface0);
    z-index: 120;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    display: flex;
    flex-direction: column;
  }
  
  .sidebar.open {
    transform: translateX(0);
  }
  
  .sidebar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 4rem;
    padding: 0 var(--gutter);
    border-bottom: 1px solid var(--surface0);
  }
  
  .sidebar-title {
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
  
  .sidebar-nav {
    flex: 1;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .sidebar-nav a {
    display: block;
    padding: 0.75rem 1rem;
    border-radius: var(--radius-sm);
    color: var(--text);
    transition: background 0.15s ease, color 0.15s ease;
  }
  
  .sidebar-nav a:hover {
    background: var(--surface0);
    color: var(--accent);
  }
  
  .sidebar-footer {
    padding: 1rem;
    border-top: 1px solid var(--surface0);
  }
  
  /* More Panel */
  .more-panel {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 20%;
    max-width: 360px;
    min-width: 280px;
    background: var(--mantle);
    border-right: 1px solid var(--surface0);
    z-index: 120;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
  
  .more-panel.open {
    transform: translateX(0);
  }
  
  .panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 4rem;
    padding: 0 1rem;
    border-bottom: 1px solid var(--surface0);
  }
  
  .panel-header strong {
    color: var(--text);
  }
  
  .panel-content {
    padding: 1rem;
    overflow-y: auto;
    height: calc(100% - 4rem);
  }
  
  .more-nav {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  
  .more-nav a {
    display: block;
    padding: 0.75rem 1rem;
    border-radius: var(--radius-sm);
    color: var(--text);
    transition: background 0.15s ease, color 0.15s ease;
  }
  
  .more-nav a:hover {
    background: var(--surface0);
    color: var(--accent);
  }
  
  .more-divider {
    height: 1px;
    background: var(--surface0);
    margin: 1rem 0;
  }
  
  @media (max-width: 640px) {
    .more-panel {
      width: 80%;
      max-width: none;
    }
  }
</style>
