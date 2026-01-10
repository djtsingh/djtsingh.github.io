<script>
  /**
   * TagCloud - Interactive tag cloud with counts
   * Features: Size variation based on count, animated selection
   */
  import { createEventDispatcher } from 'svelte';
  import { selectedTag, availableTags } from '$lib/stores/blog.js';
  
  const dispatch = createEventDispatcher();
  
  export let tags = [];
  export let showCounts = true;
  export let maxTags = 20;
  
  // Use prop or store
  $: displayTags = tags.length > 0 ? tags : $availableTags;
  $: limitedTags = displayTags.slice(0, maxTags);
  $: maxCount = Math.max(...limitedTags.map(t => t.count), 1);
  
  function selectTag(tag) {
    if ($selectedTag === tag) {
      selectedTag.set(null);
    } else {
      selectedTag.set(tag);
    }
    dispatch('select', $selectedTag);
  }
  
  function getTagSize(count) {
    const minSize = 0.75;
    const maxSize = 1.15;
    const ratio = count / maxCount;
    return minSize + (maxSize - minSize) * ratio;
  }
</script>

<div class="tag-cloud">
  {#if $selectedTag}
    <button 
      class="clear-filter"
      on:click={() => selectTag($selectedTag)}
      aria-label="Clear tag filter"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 6 6 18"/>
        <path d="m6 6 12 12"/>
      </svg>
      Clear filter
    </button>
  {/if}
  
  <div class="tags-list">
    {#each limitedTags as { tag, count }, index}
      <button 
        class="tag-item"
        class:selected={$selectedTag === tag}
        style="--tag-size: {getTagSize(count)}rem; --delay: {index * 20}ms"
        on:click={() => selectTag(tag)}
        aria-pressed={$selectedTag === tag}
      >
        <span class="tag-name">{tag}</span>
        {#if showCounts}
          <span class="tag-count">{count}</span>
        {/if}
      </button>
    {/each}
  </div>
</div>

<style>
  .tag-cloud {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .clear-filter {
    display: inline-flex;
    align-items: center;
    align-self: flex-start;
    gap: 0.25rem;
    padding: 0.3rem 0.6rem;
    font-size: 0.7rem;
    font-weight: 500;
    color: var(--red);
    background: rgba(var(--red-rgb), 0.1);
    border: 1px solid var(--red);
    border-radius: var(--radius-full);
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .clear-filter svg {
    width: 12px;
    height: 12px;
  }
  
  .clear-filter:hover {
    background: rgba(var(--red-rgb), 0.2);
  }
  
  .tags-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.35rem;
  }
  
  .tag-item {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.3rem 0.6rem;
    font-size: 0.7rem;
    font-weight: 500;
    color: var(--text);
    background: var(--surface0);
    border: 1px solid var(--surface1);
    border-radius: var(--radius-full);
    cursor: pointer;
    opacity: 0;
    animation: tagFadeIn 0.3s ease forwards;
    animation-delay: var(--delay);
    transition: all 0.15s ease;
  }
  
  @keyframes tagFadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  .tag-item:hover {
    background: var(--surface1);
    border-color: var(--accent);
  }
  
  .tag-item.selected {
    background: var(--accent);
    border-color: var(--accent);
    color: var(--crust);
  }
  
  .tag-name {
    white-space: nowrap;
  }
  
  .tag-count {
    padding: 0.05rem 0.3rem;
    font-size: 0.65em;
    font-weight: 600;
    color: var(--subtext1);
    background: rgba(var(--base-rgb), 0.3);
    border-radius: var(--radius-full);
  }
  
  .tag-item.selected .tag-count {
    color: var(--crust);
    background: rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: 480px) {
    .tags-list {
      gap: 0.25rem;
    }
    
    .tag-item {
      padding: 0.25rem 0.5rem;
      font-size: 0.65rem;
    }
  }
</style>
