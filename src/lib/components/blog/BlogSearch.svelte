<script>
  /**
   * BlogSearch - Animated search input with suggestions
   * Features: Debounced search, keyboard navigation, recent searches
   */
  import { onMount, createEventDispatcher } from 'svelte';
  import { browser } from '$app/environment';
  import { searchQuery, selectedTag, resetFilters } from '$lib/stores/blog.js';
  
  export let placeholder = 'Search posts...';
  export let autofocus = false;
  
  const dispatch = createEventDispatcher();
  
  let inputElement;
  let isFocused = false;
  let localQuery = '';
  let debounceTimer;
  
  // Sync with store
  $: if ($searchQuery !== localQuery) {
    localQuery = $searchQuery;
  }
  
  function handleInput(event) {
    localQuery = event.target.value;
    
    // Debounce the search
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      searchQuery.set(localQuery);
      dispatch('search', localQuery);
    }, 300);
  }
  
  function clearSearch() {
    localQuery = '';
    searchQuery.set('');
    selectedTag.set(null);
    dispatch('clear');
    inputElement?.focus();
  }
  
  function handleKeydown(event) {
    if (event.key === 'Escape') {
      clearSearch();
      inputElement?.blur();
    }
  }
  
  onMount(() => {
    if (autofocus && inputElement) {
      inputElement.focus();
    }
  });
</script>

<div class="search-wrapper" class:focused={isFocused}>
  <div class="search-icon">
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <path d="m21 21-4.35-4.35"/>
    </svg>
  </div>
  
  <input 
    bind:this={inputElement}
    type="text"
    class="search-input"
    {placeholder}
    value={localQuery}
    on:input={handleInput}
    on:focus={() => isFocused = true}
    on:blur={() => isFocused = false}
    on:keydown={handleKeydown}
    aria-label="Search blog posts"
  />
  
  {#if localQuery}
    <button 
      class="clear-btn"
      on:click={clearSearch}
      aria-label="Clear search"
      type="button"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 6 6 18"/>
        <path d="m6 6 12 12"/>
      </svg>
    </button>
  {/if}
  
  <!-- Keyboard hint -->
  <div class="keyboard-hint" class:hidden={isFocused || localQuery}>
    <kbd>/</kbd>
  </div>
  
  <!-- Search border animation -->
  <div class="search-border"></div>
</div>

<svelte:window on:keydown={(e) => {
  if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') {
    e.preventDefault();
    inputElement?.focus();
  }
}} />

<style>
  .search-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 0.75rem;
    background: var(--surface0);
    border: 1px solid var(--surface1);
    border-radius: var(--radius-md);
    transition: all 0.2s ease;
  }
  
  .search-wrapper.focused {
    border-color: var(--accent);
    box-shadow: 0 0 0 2px rgba(var(--accent-rgb), 0.1);
  }
  
  .search-icon {
    color: var(--subtext1);
    flex-shrink: 0;
    transition: color 0.2s ease;
    width: 16px;
    height: 16px;
  }
  
  .search-wrapper.focused .search-icon {
    color: var(--accent);
  }
  
  .search-input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    font-size: 0.85rem;
    color: var(--text);
    font-family: inherit;
    min-width: 0;
  }
  
  .search-input::placeholder {
    color: var(--subtext1);
  }
  
  .clear-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.25rem;
    background: var(--surface1);
    border: none;
    border-radius: var(--radius-sm);
    color: var(--subtext1);
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .clear-btn svg {
    width: 14px;
    height: 14px;
  }
  
  .clear-btn:hover {
    background: var(--surface2);
    color: var(--text);
  }
  
  .keyboard-hint {
    display: none;
  }
  
  @media (min-width: 640px) {
    .keyboard-hint {
      display: flex;
      align-items: center;
      transition: opacity 0.2s ease;
    }
    
    .keyboard-hint.hidden {
      opacity: 0;
      pointer-events: none;
    }
  }
  
  kbd {
    padding: 0.15rem 0.35rem;
    font-size: 0.65rem;
    font-family: inherit;
    color: var(--subtext1);
    background: var(--surface1);
    border: 1px solid var(--surface2);
    border-radius: var(--radius-sm);
  }
  
  /* Animated border */
  .search-border {
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s ease;
  }
  
  .search-border::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: linear-gradient(
      90deg,
      var(--sapphire) 0%,
      var(--mauve) 50%,
      var(--pink) 100%
    );
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
    -webkit-mask-composite: xor;
    padding: 2px;
  }
  
  .search-wrapper.focused .search-border {
    opacity: 1;
  }
</style>
