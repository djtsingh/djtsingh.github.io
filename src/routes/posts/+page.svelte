<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import SEO from '$lib/components/SEO.svelte';
  import { BlogCard, BlogSearch, BlogStats, TagCloud } from '$lib/components/blog/index.js';
  import { allPosts, filteredPosts, selectedTag, searchQuery, viewMode, resetFilters } from '$lib/stores/blog.js';
  import { getFeaturedPosts } from '$lib/utils/blog.js';
  
  export let data;
  
  // Initialize store with posts data
  $: allPosts.set(data.posts);
  $: posts = $filteredPosts;
  $: featuredPosts = getFeaturedPosts(data.posts, 2);
  $: hasFilters = $selectedTag || $searchQuery;
  
  // Handle URL query params
  onMount(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tagParam = urlParams.get('tag');
    if (tagParam) {
      selectedTag.set(tagParam);
    }
    
    return () => resetFilters();
  });
</script>

<SEO 
  title="Blog - Daljeet Singh Lotey"
  description="Articles on software engineering, web development, data science, and technical experiments. Deep dives, tutorials, and insights from my journey."
  canonical="https://djtsingh.github.io/posts"
  type="website"
/>

<div class="posts-page">
  <!-- Page Header -->
  <header class="page-header">
    <p class="kicker">Thoughts & tutorials</p>
    <h1>
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 20h9"/>
        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>
      </svg>
      <span>Blog</span>
    </h1>
    <p class="lead">
      Writing about software engineering, web development, and the technologies I explore. 
      Deep dives, tutorials, and occasional musings.
    </p>
  </header>
  
  <!-- Stats Section -->
  <BlogStats />
  
  <!-- Search & Filters -->
  <section class="filters-section">
    <div class="search-wrapper">
      <BlogSearch placeholder="Search articles..." />
    </div>
    
    <div class="tags-wrapper">
      <h3 class="filter-title">Browse by topic</h3>
      <TagCloud maxTags={15} />
    </div>
  </section>
  
  <!-- Featured Posts (only show when no filters) -->
  {#if !hasFilters && featuredPosts.length > 0}
    <section class="featured-section">
      <h2 class="section-title">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
        Featured
      </h2>
      <div class="featured-grid">
        {#each featuredPosts as post, index}
          <BlogCard {post} {index} variant="featured" />
        {/each}
      </div>
    </section>
  {/if}
  
  <!-- All Posts -->
  <section class="posts-section">
    <div class="section-header">
      <h2 class="section-title">
        {#if hasFilters}
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
          </svg>
          Results
          <span class="result-count">({posts.length})</span>
        {:else}
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
          </svg>
          All Articles
        {/if}
      </h2>
      
      <!-- View mode toggle -->
      <div class="view-toggle">
        <button 
          class="toggle-btn" 
          class:active={$viewMode === 'grid'}
          on:click={() => viewMode.set('grid')}
          aria-label="Grid view"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect width="7" height="7" x="3" y="3" rx="1"/>
            <rect width="7" height="7" x="14" y="3" rx="1"/>
            <rect width="7" height="7" x="14" y="14" rx="1"/>
            <rect width="7" height="7" x="3" y="14" rx="1"/>
          </svg>
        </button>
        <button 
          class="toggle-btn" 
          class:active={$viewMode === 'list'}
          on:click={() => viewMode.set('list')}
          aria-label="List view"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="8" x2="21" y1="6" y2="6"/>
            <line x1="8" x2="21" y1="12" y2="12"/>
            <line x1="8" x2="21" y1="18" y2="18"/>
            <line x1="3" x2="3.01" y1="6" y2="6"/>
            <line x1="3" x2="3.01" y1="12" y2="12"/>
            <line x1="3" x2="3.01" y1="18" y2="18"/>
          </svg>
        </button>
      </div>
    </div>
    
    {#if posts.length === 0}
      <div class="no-results">
        <div class="no-results-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
            <path d="M8 8h6"/>
          </svg>
        </div>
        <h3>No posts found</h3>
        <p>Try adjusting your search or filter criteria</p>
        <button class="reset-btn" on:click={resetFilters}>Clear filters</button>
      </div>
    {:else}
      <div class="posts-grid" class:list-view={$viewMode === 'list'}>
        {#each posts as post, index}
          <BlogCard 
            {post} 
            {index} 
            variant={$viewMode === 'list' ? 'compact' : 'default'} 
          />
        {/each}
      </div>
    {/if}
  </section>
</div>

<style>
  .posts-page {
    max-width: 1100px;
    margin: 0 auto;
  }
  
  /* Page Header */
  .page-header {
    margin-bottom: 2rem;
    text-align: center;
  }
  
  .kicker {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0 0 0.5rem;
    padding: 0.3rem 0.75rem;
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--accent);
    background: rgba(var(--accent-rgb), 0.1);
    border-radius: var(--radius-full);
  }
  
  h1 {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin: 0 0 0.75rem;
    font-size: clamp(1.5rem, 4vw, 2.25rem);
    font-weight: 700;
    color: var(--text);
  }
  
  h1 svg {
    width: 1em;
    height: 1em;
    color: var(--accent);
  }
  
  .lead {
    max-width: 550px;
    margin: 0 auto;
    font-size: clamp(0.9rem, 2.5vw, 1rem);
    line-height: 1.6;
    color: var(--subtext0);
  }
  
  /* Filters Section */
  .filters-section {
    margin: 1.5rem 0;
    padding: 1rem;
    background: var(--surface0);
    border: 1px solid var(--surface1);
    border-radius: var(--radius-md);
  }
  
  .search-wrapper {
    max-width: 400px;
    margin: 0 auto 1rem;
  }
  
  .tags-wrapper {
    text-align: center;
  }
  
  .filter-title {
    margin: 0 0 0.5rem;
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--subtext1);
  }
  
  /* Section headers */
  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  
  .section-title {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
    color: var(--text);
  }
  
  .section-title svg {
    width: 18px;
    height: 18px;
    color: var(--accent);
  }
  
  .result-count {
    font-size: 0.85em;
    font-weight: 400;
    color: var(--subtext1);
  }
  
  /* View toggle */
  .view-toggle {
    display: flex;
    gap: 0.2rem;
    padding: 0.2rem;
    background: var(--surface0);
    border-radius: var(--radius-sm);
  }
  
  .toggle-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.4rem;
    background: transparent;
    border: none;
    border-radius: var(--radius-sm);
    color: var(--subtext1);
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .toggle-btn:hover {
    color: var(--text);
  }
  
  .toggle-btn.active {
    background: var(--surface1);
    color: var(--accent);
  }
  
  /* Featured Section */
  .featured-section {
    margin-bottom: 2rem;
  }
  
  .featured-section .section-title {
    margin-bottom: 1rem;
  }
  
  .featured-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
  
  @media (max-width: 900px) {
    .featured-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (max-width: 600px) {
    .featured-grid {
      grid-template-columns: 1fr;
    }
  }
  
  /* Posts Section */
  .posts-section {
    margin-top: 1.5rem;
  }
  
  .posts-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
  
  @media (max-width: 900px) {
    .posts-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (max-width: 600px) {
    .posts-grid {
      grid-template-columns: 1fr;
    }
  }
  
  .posts-grid.list-view {
    grid-template-columns: 1fr;
  }
  
  /* No results */
  .no-results {
    text-align: center;
    padding: 3rem 1.5rem;
    background: var(--surface0);
    border: 1px dashed var(--surface1);
    border-radius: var(--radius-md);
  }
  
  .no-results-icon {
    margin-bottom: 1rem;
    color: var(--subtext1);
  }
  
  .no-results-icon svg {
    width: 40px;
    height: 40px;
  }
  
  .no-results h3 {
    margin: 0 0 0.4rem;
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text);
  }
  
  .no-results p {
    margin: 0 0 1rem;
    font-size: 0.9rem;
    color: var(--subtext1);
  }
  
  .reset-btn {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--text);
    background: var(--surface1);
    border: 1px solid var(--surface2);
    border-radius: var(--radius-full);
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .reset-btn:hover {
    background: var(--accent);
    border-color: var(--accent);
    color: var(--crust);
  }
</style>
