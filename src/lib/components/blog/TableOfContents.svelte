<script>
  /**
   * TableOfContents - Animated sidebar navigation for blog posts
   * Features: Active heading highlighting, smooth scroll, collapse/expand
   */
  import { activeHeadingId } from '$lib/stores/blog.js';
  import { browser } from '$app/environment';
  
  export let headings = [];
  
  let isExpanded = true;
  
  function scrollToHeading(id) {
    if (!browser) return;
    
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
  
  $: activeId = $activeHeadingId;
</script>

<nav class="toc" aria-label="Table of contents">
  <div class="toc-header">
    <h4 class="toc-title">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="8" x2="21" y1="6" y2="6"/>
        <line x1="8" x2="21" y1="12" y2="12"/>
        <line x1="8" x2="21" y1="18" y2="18"/>
        <line x1="3" x2="3.01" y1="6" y2="6"/>
        <line x1="3" x2="3.01" y1="12" y2="12"/>
        <line x1="3" x2="3.01" y1="18" y2="18"/>
      </svg>
      On this page
    </h4>
    <button 
      class="toc-toggle"
      on:click={() => isExpanded = !isExpanded}
      aria-expanded={isExpanded}
      aria-label={isExpanded ? 'Collapse table of contents' : 'Expand table of contents'}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="14" 
        height="14" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
        class:rotated={!isExpanded}
      >
        <path d="m18 15-6-6-6 6"/>
      </svg>
    </button>
  </div>
  
  {#if isExpanded}
    <ul class="toc-list" role="list">
      {#each headings as heading, index}
        <li 
          class="toc-item level-{heading.level}"
          class:active={activeId === heading.id}
          style="--delay: {index * 30}ms"
        >
          <button
            class="toc-link"
            on:click={() => scrollToHeading(heading.id)}
            aria-current={activeId === heading.id ? 'location' : undefined}
          >
            <span class="toc-indicator"></span>
            <span class="toc-text">{heading.text}</span>
          </button>
        </li>
      {/each}
    </ul>
  {/if}
</nav>

<style>
  .toc {
    padding: 1rem;
    background: var(--surface0);
    border: 1px solid var(--surface1);
    border-radius: var(--radius-md);
  }
  
  .toc-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.75rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--surface1);
  }
  
  .toc-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--subtext1);
  }
  
  .toc-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.25rem;
    background: transparent;
    border: none;
    color: var(--subtext1);
    cursor: pointer;
    border-radius: var(--radius-sm);
    transition: all 0.2s ease;
  }
  
  .toc-toggle:hover {
    background: var(--surface1);
    color: var(--text);
  }
  
  .toc-toggle svg {
    transition: transform 0.2s ease;
  }
  
  .toc-toggle svg.rotated {
    transform: rotate(180deg);
  }
  
  .toc-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  .toc-item {
    opacity: 0;
    animation: fadeSlideIn 0.3s ease forwards;
    animation-delay: var(--delay);
  }
  
  @keyframes fadeSlideIn {
    from {
      opacity: 0;
      transform: translateX(-8px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  .toc-item.level-3 {
    padding-left: 0.75rem;
  }
  
  .toc-item.level-4 {
    padding-left: 1.5rem;
  }
  
  .toc-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    padding: 0.5rem 0.25rem;
    background: transparent;
    border: none;
    text-align: left;
    font-size: 0.8rem;
    color: var(--subtext1);
    cursor: pointer;
    border-radius: var(--radius-sm);
    transition: all 0.2s ease;
  }
  
  .toc-link:hover {
    color: var(--text);
    background: rgba(var(--accent-rgb), 0.05);
  }
  
  .toc-item.active .toc-link {
    color: var(--accent);
    font-weight: 500;
  }
  
  .toc-indicator {
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: var(--surface2);
    flex-shrink: 0;
    transition: all 0.2s ease;
  }
  
  .toc-item.active .toc-indicator {
    width: 6px;
    height: 6px;
    background: var(--accent);
    box-shadow: 0 0 8px rgba(var(--accent-rgb), 0.5);
  }
  
  .toc-text {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-height: 1.4;
  }
</style>
