<script>
  /**
   * EmptyState - Displays when no content is available
   * Features: Customizable icon, message, and action
   */
  
  /** @type {'search' | 'content' | 'error' | 'filter'} */
  export let type = 'content';
  
  /** @type {string} */
  export let title = 'Nothing here yet';
  
  /** @type {string} */
  export let message = '';
  
  /** @type {string} */
  export let actionLabel = '';
  
  /** @type {() => void} */
  export let onAction = () => {};
  
  const illustrations = {
    search: {
      svg: `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6"/><path d="M8 11h6"/></svg>`,
      defaultTitle: 'No results found',
      defaultMessage: 'Try adjusting your search or filters'
    },
    content: {
      svg: `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>`,
      defaultTitle: 'Nothing here yet',
      defaultMessage: 'Check back later for new content'
    },
    error: {
      svg: `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>`,
      defaultTitle: 'Something went wrong',
      defaultMessage: 'Please try again later'
    },
    filter: {
      svg: `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/><line x1="6" x2="6" y1="3" y2="3.01"/></svg>`,
      defaultTitle: 'No matches',
      defaultMessage: 'Try different filters or clear them all'
    }
  };
  
  $: illustration = illustrations[type];
  $: displayTitle = title || illustration.defaultTitle;
  $: displayMessage = message || illustration.defaultMessage;
</script>

<div class="empty-state">
  <div class="illustration" aria-hidden="true">
    {@html illustration.svg}
  </div>
  
  <h3 class="empty-title">{displayTitle}</h3>
  
  {#if displayMessage}
    <p class="empty-message">{displayMessage}</p>
  {/if}
  
  {#if actionLabel}
    <button class="empty-action" on:click={onAction}>
      {actionLabel}
    </button>
  {/if}
  
  <slot />
</div>

<style>
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem 1.5rem;
    text-align: center;
    min-height: 300px;
  }
  
  .illustration {
    color: var(--surface2);
    margin-bottom: 1.5rem;
    opacity: 0.6;
  }
  
  .illustration :global(svg) {
    width: 80px;
    height: 80px;
  }
  
  .empty-title {
    font-size: 1.25rem;
    font-weight: var(--font-weight-semibold, 600);
    color: var(--text);
    margin: 0 0 0.5rem;
  }
  
  .empty-message {
    font-size: 0.9rem;
    color: var(--subtext1);
    margin: 0 0 1.5rem;
    max-width: 40ch;
  }
  
  .empty-action {
    padding: 0.75rem 1.5rem;
    font-size: 0.875rem;
    font-weight: var(--font-weight-medium, 500);
    color: var(--crust);
    background: var(--accent);
    border: none;
    border-radius: var(--radius-md, 12px);
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .empty-action:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
  
  .empty-action:active {
    transform: translateY(0);
  }
</style>
