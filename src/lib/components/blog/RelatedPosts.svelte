<script>
  /**
   * RelatedPosts - Animated carousel of related blog posts
   * Features: Auto-scroll, hover pause, animated transitions
   */
  import { onMount } from 'svelte';
  import { formatDate } from '$lib/utils/blog.js';
  
  export let posts = [];
  export let title = 'Related Articles';
  
  let container;
  let currentIndex = 0;
  let isHovered = false;
  let autoplayInterval;
  
  $: visiblePosts = posts.slice(0, 6); // Limit to 6
  $: canNavigate = visiblePosts.length > 3;
  
  function next() {
    if (!canNavigate) return;
    currentIndex = (currentIndex + 1) % visiblePosts.length;
  }
  
  function prev() {
    if (!canNavigate) return;
    currentIndex = (currentIndex - 1 + visiblePosts.length) % visiblePosts.length;
  }
  
  function startAutoplay() {
    if (autoplayInterval) clearInterval(autoplayInterval);
    autoplayInterval = setInterval(() => {
      if (!isHovered && canNavigate) next();
    }, 5000);
  }
  
  onMount(() => {
    startAutoplay();
    return () => {
      if (autoplayInterval) clearInterval(autoplayInterval);
    };
  });
</script>

{#if posts.length > 0}
  <section class="related-posts">
    <div class="section-header">
      <h3 class="section-title">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
        </svg>
        {title}
      </h3>
      
      {#if canNavigate}
        <div class="nav-buttons">
          <button class="nav-btn" on:click={prev} aria-label="Previous post">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </button>
          <button class="nav-btn" on:click={next} aria-label="Next post">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </button>
        </div>
      {/if}
    </div>
    
    <div 
      class="posts-container"
      bind:this={container}
      on:mouseenter={() => isHovered = true}
      on:mouseleave={() => isHovered = false}
      role="region"
      aria-label="Related posts carousel"
    >
      <div 
        class="posts-track" 
        style="--offset: {currentIndex}"
      >
        {#each visiblePosts as post, index}
          <article 
            class="related-card"
            class:active={index === currentIndex}
            style="--index: {index}"
          >
            <a href="/posts/{post.slug}" class="card-link">
              {#if post.coverImage}
                <div class="card-image">
                  <img src={post.coverImage} alt={post.title} loading="lazy" />
                </div>
              {:else}
                <div class="card-image placeholder">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
                    <circle cx="12" cy="13" r="3"/>
                  </svg>
                </div>
              {/if}
              
              <div class="card-content">
                {#if post.tags?.length}
                  <span class="card-tag">{post.tags[0]}</span>
                {/if}
                <h4 class="card-title">{post.title}</h4>
                <p class="card-meta">
                  {formatDate(post.date, { month: 'short', day: 'numeric' })}
                  {#if post.readingTime}
                    <span class="separator">•</span>
                    {post.readingTime} min
                  {/if}
                </p>
              </div>
              
              <div class="card-arrow">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14"/>
                  <path d="m12 5 7 7-7 7"/>
                </svg>
              </div>
            </a>
          </article>
        {/each}
      </div>
    </div>
    
    <!-- Dots indicator -->
    {#if canNavigate}
      <div class="dots-indicator">
        {#each visiblePosts as _, index}
          <button 
            class="dot"
            class:active={index === currentIndex}
            on:click={() => currentIndex = index}
            aria-label="Go to slide {index + 1}"
          ></button>
        {/each}
      </div>
    {/if}
  </section>
{/if}

<style>
  .related-posts {
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid var(--surface1);
  }
  
  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
  }
  
  .section-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0;
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text);
  }
  
  .section-title svg {
    color: var(--accent);
  }
  
  .nav-buttons {
    display: flex;
    gap: 0.5rem;
  }
  
  .nav-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    background: var(--surface0);
    border: 1px solid var(--surface1);
    border-radius: 50%;
    color: var(--subtext1);
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .nav-btn:hover {
    background: var(--surface1);
    color: var(--accent);
    border-color: var(--accent);
  }
  
  .posts-container {
    overflow: hidden;
    border-radius: var(--radius-md);
  }
  
  .posts-track {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  @media (max-width: 768px) {
    .posts-track {
      grid-template-columns: 1fr;
      transform: translateX(calc(var(--offset) * -100% - var(--offset) * 1rem));
    }
  }
  
  .related-card {
    background: var(--surface0);
    border: 1px solid var(--surface1);
    border-radius: var(--radius-md);
    overflow: hidden;
    transition: all 0.3s ease;
  }
  
  .related-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
    border-color: var(--accent);
  }
  
  .card-link {
    display: flex;
    flex-direction: column;
    height: 100%;
    text-decoration: none;
    color: inherit;
  }
  
  .card-image {
    aspect-ratio: 16 / 9;
    overflow: hidden;
    background: var(--surface1);
  }
  
  .card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  .related-card:hover .card-image img {
    transform: scale(1.05);
  }
  
  .card-image.placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--subtext1);
  }
  
  .card-content {
    flex: 1;
    padding: 1rem;
  }
  
  .card-tag {
    display: inline-block;
    padding: 0.2rem 0.5rem;
    margin-bottom: 0.5rem;
    font-size: 0.65rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--accent);
    background: rgba(var(--accent-rgb), 0.1);
    border-radius: var(--radius-full);
  }
  
  .card-title {
    margin: 0 0 0.5rem;
    font-size: 0.95rem;
    font-weight: 600;
    line-height: 1.4;
    color: var(--text);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    transition: color 0.2s ease;
  }
  
  .related-card:hover .card-title {
    color: var(--accent);
  }
  
  .card-meta {
    margin: 0;
    font-size: 0.75rem;
    color: var(--subtext1);
  }
  
  .separator {
    margin: 0 0.25rem;
    opacity: 0.5;
  }
  
  .card-arrow {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0.75rem 1rem;
    border-top: 1px solid var(--surface1);
    color: var(--subtext1);
    transition: all 0.2s ease;
  }
  
  .related-card:hover .card-arrow {
    color: var(--accent);
    padding-right: 0.5rem;
  }
  
  .dots-indicator {
    display: none;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 1rem;
  }
  
  @media (max-width: 768px) {
    .dots-indicator {
      display: flex;
    }
  }
  
  .dot {
    width: 8px;
    height: 8px;
    padding: 0;
    background: var(--surface1);
    border: none;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .dot:hover {
    background: var(--surface2);
  }
  
  .dot.active {
    width: 24px;
    border-radius: var(--radius-full);
    background: var(--accent);
  }
</style>
