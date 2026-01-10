<script>
  /**
   * BlogCard - Animated card component for displaying blog post previews
   * Features: Hover animations, image lazy loading, tag display, reading time
   */
  import { onMount } from 'svelte';
  import { formatDate, getRelativeTime } from '$lib/utils/blog.js';
  
  export let post;
  export let index = 0;
  export let variant = 'default'; // 'default', 'featured', 'compact'
  
  let card;
  let isVisible = false;
  let imageLoaded = false;
  
  // Stagger animation delay based on index
  $: animationDelay = index * 80;
  
  onMount(() => {
    // Intersection Observer for scroll reveal
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            isVisible = true;
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );
    
    if (card) observer.observe(card);
    
    return () => observer.disconnect();
  });
  
  function handleImageLoad() {
    imageLoaded = true;
  }
</script>

<article 
  bind:this={card}
  class="blog-card {variant}"
  class:visible={isVisible}
  class:featured={post.featured}
  style="--animation-delay: {animationDelay}ms"
>
  <a href="/posts/{post.slug}" class="card-link">
    <!-- Image Container -->
    <div class="card-image-wrapper">
      {#if post.coverImage}
        {@const basePath = post.coverImage.replace(/-lg\.webp$/, '')}
        <img 
          src={post.coverImage}
          srcset="{basePath}-sm.webp 480w, {basePath}-md.webp 800w, {basePath}-lg.webp 1200w"
          sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw"
          alt={post.title}
          class="card-image"
          class:loaded={imageLoaded}
          loading="lazy"
          decoding="async"
          on:load={handleImageLoad}
        />
        <div class="image-skeleton" class:hidden={imageLoaded}></div>
      {:else}
        <div class="image-placeholder">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
            <circle cx="12" cy="13" r="3"/>
          </svg>
        </div>
      {/if}
      
      <!-- Floating date badge -->
      <div class="date-badge">
        <span class="date-day">{new Date(post.date).getDate()}</span>
        <span class="date-month">{new Date(post.date).toLocaleString('en', { month: 'short' })}</span>
      </div>
      
      <!-- Hover overlay -->
      <div class="card-overlay">
        <span class="read-more">
          Read Article
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14"/>
            <path d="m12 5 7 7-7 7"/>
          </svg>
        </span>
      </div>
    </div>
    
    <!-- Content -->
    <div class="card-content">
      <!-- Tags -->
      {#if post.tags?.length}
        <div class="card-tags">
          {#each post.tags.slice(0, 3) as tag}
            <span class="tag">{tag}</span>
          {/each}
        </div>
      {/if}
      
      <!-- Title -->
      <h3 class="card-title">
        {post.title}
        {#if post.featured}
          <span class="featured-star" title="Featured">★</span>
        {/if}
      </h3>
      
      <!-- Description -->
      <p class="card-description">{post.description}</p>
      
      <!-- Meta info -->
      <div class="card-meta">
        <span class="meta-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
          {post.readingTime || 5} min read
        </span>
        <span class="meta-separator">•</span>
        <span class="meta-item relative-date" title={formatDate(post.date)}>
          {getRelativeTime(post.date)}
        </span>
      </div>
    </div>
    
    <!-- Animated border -->
    <div class="card-border"></div>
  </a>
</article>

<style>
  .blog-card {
    position: relative;
    border-radius: var(--radius-lg);
    background: var(--surface0);
    border: 1px solid var(--surface1);
    overflow: hidden;
    opacity: 0;
    transform: translateY(30px);
    transition: 
      opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1),
      transform 0.6s cubic-bezier(0.4, 0, 0.2, 1),
      box-shadow 0.3s ease,
      border-color 0.3s ease;
    transition-delay: var(--animation-delay);
  }
  
  .blog-card.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .blog-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg), 0 0 0 1px rgba(var(--accent-rgb), 0.15);
    border-color: rgba(var(--accent-rgb), 0.3);
  }
  
  .card-link {
    display: block;
    text-decoration: none;
    color: inherit;
  }
  
  /* Image styles */
  .card-image-wrapper {
    position: relative;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    background: var(--surface1);
  }
  
  .card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transform: scale(1.1);
    transition: 
      opacity 0.5s ease,
      transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .card-image.loaded {
    opacity: 1;
    transform: scale(1);
  }
  
  .blog-card:hover .card-image {
    transform: scale(1.05);
  }
  
  .image-skeleton {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      var(--surface1) 0%,
      var(--surface2) 50%,
      var(--surface1) 100%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }
  
  .image-skeleton.hidden {
    opacity: 0;
  }
  
  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
  
  .image-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, var(--surface1), var(--surface0));
    color: var(--subtext1);
  }
  
  /* Date badge */
  .date-badge {
    position: absolute;
    top: 1rem;
    left: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.5rem 0.75rem;
    background: rgba(var(--base-rgb), 0.9);
    backdrop-filter: blur(8px);
    border-radius: var(--radius-sm);
    border: 1px solid var(--surface1);
    z-index: 2;
    transition: transform 0.3s ease;
  }
  
  .blog-card:hover .date-badge {
    transform: scale(1.05);
  }
  
  .date-day {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--accent);
    line-height: 1;
  }
  
  .date-month {
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--subtext1);
  }
  
  /* Hover overlay */
  .card-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(var(--base-rgb), 0.7);
    backdrop-filter: blur(4px);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .blog-card:hover .card-overlay {
    opacity: 1;
  }
  
  .read-more {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    background: var(--accent);
    color: var(--crust);
    font-size: 0.85rem;
    font-weight: 600;
    border-radius: var(--radius-full);
    transform: translateY(10px);
    opacity: 0;
    transition: 
      transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
      opacity 0.3s ease,
      background 0.2s ease;
  }
  
  .blog-card:hover .read-more {
    transform: translateY(0);
    opacity: 1;
  }
  
  .read-more:hover {
    background: var(--accent-bright);
  }
  
  /* Content styles */
  .card-content {
    padding: 1rem;
  }
  
  .card-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
    margin-bottom: 0.5rem;
  }
  
  .tag {
    padding: 0.2rem 0.5rem;
    font-size: 0.65rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--accent);
    background: rgba(var(--accent-rgb), 0.1);
    border-radius: var(--radius-full);
    transition: 
      background 0.2s ease,
      transform 0.2s ease;
  }
  
  .blog-card:hover .tag {
    background: rgba(var(--accent-rgb), 0.15);
  }
  
  .card-title {
    margin: 0 0 0.5rem;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.35;
    color: var(--text);
    transition: color 0.2s ease;
  }
  
  .blog-card:hover .card-title {
    color: var(--accent);
  }
  
  .featured-star {
    color: var(--yellow);
    margin-left: 0.2rem;
    font-size: 0.85em;
  }
  
  .card-description {
    margin: 0 0 0.75rem;
    font-size: 0.8rem;
    line-height: 1.55;
    color: var(--subtext0);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .card-meta {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.7rem;
    color: var(--subtext1);
  }
  
  .meta-item {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
  
  .meta-item svg {
    width: 12px;
    height: 12px;
  }
  
  .meta-separator {
    opacity: 0.5;
  }
  
  /* Animated border */
  .card-border {
    position: absolute;
    inset: 0;
    border-radius: var(--radius-lg);
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .card-border::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    background: linear-gradient(
      135deg,
      var(--accent) 0%,
      var(--mauve) 50%,
      var(--sapphire) 100%
    );
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
    -webkit-mask-composite: xor;
    padding: 2px;
  }
  
  .blog-card:hover .card-border {
    opacity: 1;
  }
  
  /* Featured variant */
  .blog-card.featured {
    grid-column: span 1;
  }
  
  .blog-card.featured .card-image-wrapper {
    aspect-ratio: 16 / 9;
  }
  
  .blog-card.featured .card-title {
    font-size: 1.1rem;
  }
  
  .blog-card.featured .card-description {
    -webkit-line-clamp: 2;
    line-clamp: 2;
  }
  
  /* Compact variant */
  .blog-card.compact {
    display: flex;
    flex-direction: row;
  }
  
  .blog-card.compact .card-image-wrapper {
    width: 140px;
    flex-shrink: 0;
    aspect-ratio: 1;
  }
  
  .blog-card.compact .card-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  /* Responsive */
  @media (max-width: 640px) {
    .card-content {
      padding: 0.85rem;
    }
    
    .card-title {
      font-size: 0.95rem;
    }
    
    .card-description {
      font-size: 0.75rem;
      margin-bottom: 0.5rem;
    }
    
    .card-meta {
      font-size: 0.65rem;
    }
    
    .date-badge {
      top: 0.5rem;
      left: 0.5rem;
      padding: 0.35rem 0.5rem;
    }
    
    .date-day {
      font-size: 1rem;
    }
    
    .date-month {
      font-size: 0.55rem;
    }
    
    .blog-card.compact {
      flex-direction: column;
    }
    
    .blog-card.compact .card-image-wrapper {
      width: 100%;
      aspect-ratio: 16 / 9;
    }
  }
</style>
