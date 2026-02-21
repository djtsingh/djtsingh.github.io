<script>
  /**
   * PageHeader - Consistent page header component
   * Standardized layout: kicker + title with icon + lead description
   */
  
  /** @type {string} */
  export let kicker = '';
  
  /** @type {string} */
  export let title;
  
  /** @type {string} */
  export let lead = '';
  
  /** @type {boolean} */
  export let centered = true;
</script>

<header class="page-header" class:centered>
  {#if kicker}
    <p class="kicker">{kicker}</p>
  {/if}
  
  <h1>
    {#if $$slots.icon}
      <span class="icon">
        <slot name="icon" />
      </span>
    {/if}
    <span class="title-text">{title}</span>
  </h1>
  
  {#if lead}
    <p class="lead">{lead}</p>
  {/if}
  
  <slot />
</header>

<style>
  .page-header {
    margin-bottom: 2.5rem;
  }
  
  .page-header.centered {
    text-align: center;
  }
  
  .kicker {
    font-size: 0.75rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--accent);
    margin: 0 0 0.5rem 0;
    font-weight: 600;
  }
  
  .page-header h1 {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: clamp(2rem, 5vw, 2.5rem);
    font-weight: var(--font-weight-bold, 700);
    color: var(--text);
    margin: 0 0 1rem 0;
    line-height: 1.2;
  }
  
  .page-header.centered h1 {
    justify-content: center;
  }
  
  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--accent);
    flex-shrink: 0;
  }
  
  .icon :global(svg) {
    width: 32px;
    height: 32px;
  }
  
  .lead {
    max-width: 55ch;
    font-size: 1rem;
    color: var(--subtext1);
    line-height: 1.6;
    margin: 0;
  }
  
  .page-header.centered .lead {
    margin-inline: auto;
  }
  
  /* Responsive adjustments */
  @media (max-width: 640px) {
    .page-header {
      margin-bottom: 2rem;
    }
    
    .page-header h1 {
      font-size: clamp(1.5rem, 6vw, 2rem);
      gap: 0.5rem;
    }
    
    .icon :global(svg) {
      width: 24px;
      height: 24px;
    }
    
    .lead {
      font-size: 0.9rem;
    }
  }
</style>
