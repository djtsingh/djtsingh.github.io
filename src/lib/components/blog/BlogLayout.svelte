<script>
  /**
   * BlogLayout - Main layout wrapper for individual blog posts
   * Features: Reading progress, ToC, Share buttons, Related posts
   */
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import SEO from '$lib/components/SEO.svelte';
  import { siteConfig } from '$lib/config/site.js';
  import { formatDate } from '$lib/utils/blog.js';
  import { readingProgress, activeHeadingId } from '$lib/stores/blog.js';
  import TableOfContents from './TableOfContents.svelte';
  import ShareButtons from './ShareButtons.svelte';
  import RelatedPosts from './RelatedPosts.svelte';
  import ReadingProgress from './ReadingProgress.svelte';
  import ImageLightbox from './ImageLightbox.svelte';
  import PostNavigation from './PostNavigation.svelte';
  
  export let metadata;
  export let relatedPosts = [];
  export let prevPost = null;
  export let nextPost = null;
  
  let articleElement;
  let headings = [];
  let scrollY = 0;
  
  // Generate article schema
  $: articleSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${siteConfig.url}/posts/${metadata.slug}`,
    headline: metadata.title,
    description: metadata.description,
    image: metadata.coverImage ? `${siteConfig.url}${metadata.coverImage}` : `${siteConfig.url}${siteConfig.image}`,
    datePublished: metadata.date,
    dateModified: metadata.updated || metadata.date,
    author: {
      '@type': 'Person',
      '@id': `${siteConfig.url}/#person`,
      name: siteConfig.name
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${siteConfig.url}/#organization`
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/posts/${metadata.slug}`
    },
    keywords: metadata.tags?.join(', ')
  });
  
  onMount(() => {
    if (!browser) return;
    
    // Extract headings from article
    const headingElements = articleElement?.querySelectorAll('h2, h3, h4');
    if (headingElements) {
      headings = Array.from(headingElements).map(el => ({
        id: el.id,
        text: el.textContent,
        level: parseInt(el.tagName.charAt(1))
      }));
    }
    
    // Setup scroll progress tracking
    const handleScroll = () => {
      if (!articleElement) return;
      
      const rect = articleElement.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const docHeight = articleElement.offsetHeight;
      const scrolled = Math.max(0, -rect.top);
      const progress = Math.min(100, (scrolled / (docHeight - windowHeight)) * 100);
      
      readingProgress.set(Math.max(0, progress));
      scrollY = window.scrollY;
      
      // Update active heading
      const headingElements = articleElement.querySelectorAll('h2, h3, h4');
      let currentHeading = null;
      
      headingElements.forEach(heading => {
        const rect = heading.getBoundingClientRect();
        if (rect.top <= 120) {
          currentHeading = heading.id;
        }
      });
      
      if (currentHeading) {
        activeHeadingId.set(currentHeading);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      readingProgress.set(0);
    };
  });
</script>

<SEO 
  title="{metadata.title} - {siteConfig.name}"
  description={metadata.description}
  image={metadata.coverImage || siteConfig.image}
  type="article"
  canonical="/posts/{metadata.slug}"
/>

<svelte:head>
  <!-- Article specific meta -->
  <meta property="article:published_time" content={metadata.date} />
  {#if metadata.updated}
    <meta property="article:modified_time" content={metadata.updated} />
  {/if}
  <meta property="article:author" content={siteConfig.name} />
  {#if metadata.tags}
    {#each metadata.tags as tag}
      <meta property="article:tag" content={tag} />
    {/each}
  {/if}
  
  <!-- Structured data -->
  {@html `<script type="application/ld+json">${articleSchema}</script>`}
</svelte:head>

<!-- Reading Progress Bar -->
<ReadingProgress />

<article class="blog-post" bind:this={articleElement}>
  <!-- Post Header -->
  <header class="post-header">
    <div class="header-content">
      <!-- Tags -->
      {#if metadata.tags?.length}
        <div class="post-tags">
          {#each metadata.tags as tag}
            <a href="/posts?tag={encodeURIComponent(tag)}" class="tag">{tag}</a>
          {/each}
        </div>
      {/if}
      
      <!-- Title -->
      <h1 class="post-title">{metadata.title}</h1>
      
      <!-- Description -->
      {#if metadata.description}
        <p class="post-description">{metadata.description}</p>
      {/if}
      
      <!-- Meta info -->
      <div class="post-meta">
        <div class="meta-left">
          <span class="meta-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
              <line x1="16" x2="16" y1="2" y2="6"/>
              <line x1="8" x2="8" y1="2" y2="6"/>
              <line x1="3" x2="21" y1="10" y2="10"/>
            </svg>
            <time datetime={metadata.date}>{formatDate(metadata.date)}</time>
          </span>
          
          {#if metadata.updated && metadata.updated !== metadata.date}
            <span class="meta-item updated">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                <path d="M3 3v5h5"/>
                <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/>
                <path d="M16 21h5v-5"/>
              </svg>
              Updated {formatDate(metadata.updated)}
            </span>
          {/if}
          
          <span class="meta-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            {metadata.readingTime || 5} min read
          </span>
        </div>
        
        <ShareButtons 
          title={metadata.title} 
          url="/posts/{metadata.slug}"
          compact={true}
        />
      </div>
    </div>
    
    <!-- Cover Image -->
    {#if metadata.coverImage}
      {@const basePath = metadata.coverImage.replace(/-lg\.webp$/, '')}
      <div class="cover-image-wrapper">
        <img 
          src={metadata.coverImage}
          srcset="{basePath}-sm.webp 480w, {basePath}-md.webp 800w, {basePath}-lg.webp 1200w"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1000px"
          alt={metadata.title}
          class="cover-image"
          loading="eager"
        />
        <div class="cover-gradient"></div>
      </div>
    {/if}
  </header>
  
  <!-- Main content area -->
  <div class="post-container">
    <!-- Sidebar ToC (desktop) -->
    {#if headings.length > 2}
      <aside class="toc-sidebar">
        <TableOfContents {headings} />
      </aside>
    {/if}
    
    <!-- Article content -->
    <div class="post-content prose">
      <slot />
    </div>
  </div>
  
  <!-- Post Footer -->
  <footer class="post-footer">
    <!-- Share buttons -->
    <div class="footer-share">
      <h2 class="footer-heading">Enjoyed this article? Share it!</h2>
      <ShareButtons 
        title={metadata.title} 
        url="/posts/{metadata.slug}"
      />
    </div>
    
    <!-- Tags -->
    {#if metadata.tags?.length}
      <div class="footer-tags">
        <h2 class="footer-heading">Topics</h2>
        <div class="tags-list">
          {#each metadata.tags as tag}
            <a href="/posts?tag={encodeURIComponent(tag)}" class="tag-link">{tag}</a>
          {/each}
        </div>
      </div>
    {/if}
    
    <!-- Navigation -->
    <PostNavigation {prevPost} {nextPost} />
    
    <!-- Related Posts -->
    {#if relatedPosts.length > 0}
      <RelatedPosts posts={relatedPosts} />
    {/if}
  </footer>
</article>

<!-- Image Lightbox for fullscreen viewing -->
<ImageLightbox />

<style>
  .blog-post {
    max-width: 100%;
    margin: 0 auto;
  }
  
  /* Header styles */
  .post-header {
    position: relative;
    margin-bottom: 3rem;
  }
  
  .header-content {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 max(1.5rem, 5vw);
    text-align: center;
  }
  
  .post-tags {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }
  
  .tag {
    padding: 0.35rem 0.85rem;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--accent);
    background: rgba(var(--accent-rgb), 0.1);
    border-radius: var(--radius-full);
    text-decoration: none;
    transition: all 0.2s ease;
  }
  
  .tag:hover {
    background: rgba(var(--accent-rgb), 0.2);
    transform: translateY(-2px);
  }
  
  .post-title {
    margin: 0 0 1rem;
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 700;
    line-height: 1.2;
    color: var(--text);
  }
  
  .post-description {
    margin: 0 0 1.5rem;
    font-size: 1.15rem;
    line-height: 1.7;
    color: var(--subtext0);
  }
  
  .post-meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 1rem 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--surface1);
  }
  
  .meta-left {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
  
  .meta-item {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.85rem;
    color: var(--subtext1);
  }
  
  .meta-item.updated {
    color: var(--green);
  }
  
  /* Cover image */
  .cover-image-wrapper {
    position: relative;
    max-width: 1000px;
    margin: 2.5rem auto 0;
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  }
  
  .cover-image {
    width: 100%;
    height: auto;
    aspect-ratio: 21 / 9;
    object-fit: cover;
    display: block;
  }
  
  .cover-gradient {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      transparent 60%,
      rgba(var(--base-rgb), 0.4) 100%
    );
    pointer-events: none;
  }
  
  /* Content container */
  .post-container {
    display: grid;
    grid-template-columns: 1fr;
    max-width: 800px;
    margin: 0 auto;
    padding: 0 max(1.5rem, 5vw);
    gap: 3rem;
  }
  
  @media (min-width: 1200px) {
    .post-container {
      grid-template-columns: 220px 1fr;
      max-width: 1100px;
    }
  }
  
  /* ToC Sidebar */
  .toc-sidebar {
    display: none;
  }
  
  @media (min-width: 1200px) {
    .toc-sidebar {
      display: block;
      position: sticky;
      top: 6rem;
      align-self: start;
      max-height: calc(100vh - 8rem);
      overflow-y: auto;
    }
  }
  
  /* Prose content styling */
  .post-content {
    min-width: 0;
  }
  
  .post-content :global(h2) {
    margin-top: 3rem;
    margin-bottom: 1rem;
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--text);
    scroll-margin-top: 100px;
  }
  
  .post-content :global(h3) {
    margin-top: 2rem;
    margin-bottom: 0.75rem;
    font-size: 1.35rem;
    font-weight: 600;
    color: var(--text);
    scroll-margin-top: 100px;
  }
  
  .post-content :global(h4) {
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text);
    scroll-margin-top: 100px;
  }
  
  .post-content :global(p) {
    margin-bottom: 1.5rem;
    line-height: 1.8;
    color: var(--subtext0);
  }
  
  .post-content :global(a) {
    color: var(--accent);
    text-decoration: underline;
    text-underline-offset: 3px;
    transition: color 0.2s ease;
  }
  
  .post-content :global(a:hover) {
    color: var(--accent-bright);
  }
  
  .post-content :global(ul),
  .post-content :global(ol) {
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;
    color: var(--subtext0);
  }
  
  .post-content :global(li) {
    margin-bottom: 0.5rem;
    line-height: 1.7;
  }
  
  .post-content :global(blockquote) {
    margin: 2rem 0;
    padding: 1rem 1.5rem;
    border-left: 4px solid var(--accent);
    background: rgba(var(--accent-rgb), 0.05);
    border-radius: 0 var(--radius-md) var(--radius-md) 0;
    font-style: italic;
    color: var(--subtext0);
  }
  
  .post-content :global(pre) {
    margin: 1.5rem 0;
    padding: 1.25rem;
    background: var(--crust);
    border: 1px solid var(--surface0);
    border-radius: var(--radius-md);
    overflow-x: auto;
    font-size: 0.9rem;
    line-height: 1.6;
  }
  
  .post-content :global(code) {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.9em;
  }
  
  .post-content :global(:not(pre) > code) {
    padding: 0.2em 0.4em;
    background: var(--surface0);
    border-radius: var(--radius-sm);
    color: var(--pink);
  }
  
  .post-content :global(img) {
    max-width: 100%;
    height: auto;
    border-radius: var(--radius-md);
    margin: 1.5rem 0;
    cursor: zoom-in;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  
  .post-content :global(img:hover) {
    transform: scale(1.01);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }
  
  /* Mobile optimizations */
  @media (max-width: 640px) {
    .post-title {
      font-size: 1.75rem;
    }
    
    .post-description {
      font-size: 1rem;
    }
    
    .post-meta {
      gap: 0.75rem 1rem;
    }
    
    .meta-item {
      font-size: 0.8rem;
    }
    
    .cover-image {
      aspect-ratio: 16 / 9;
    }
    
    .post-content :global(h2) {
      font-size: 1.4rem;
      margin-top: 2rem;
    }
    
    .post-content :global(h3) {
      font-size: 1.15rem;
    }
    
    .post-content :global(pre) {
      font-size: 0.8rem;
      padding: 1rem;
      margin: 1rem -1rem;
      border-radius: 0;
    }
    
    .footer-share,
    .footer-tags {
      padding: 1.5rem 0;
    }
  }
  
  .post-content :global(hr) {
    margin: 3rem 0;
    border: none;
    border-top: 1px solid var(--surface1);
  }
  
  .post-content :global(table) {
    width: 100%;
    margin: 1.5rem 0;
    border-collapse: collapse;
  }
  
  .post-content :global(th),
  .post-content :global(td) {
    padding: 0.75rem 1rem;
    border: 1px solid var(--surface1);
    text-align: left;
  }
  
  .post-content :global(th) {
    background: var(--surface0);
    font-weight: 600;
    color: var(--text);
  }
  
  /* Footer styles */
  .post-footer {
    max-width: 800px;
    margin: 4rem auto 0;
    padding: 0 max(1.5rem, 5vw);
  }
  
  .footer-share,
  .footer-tags {
    padding: 2rem 0;
    border-top: 1px solid var(--surface1);
    text-align: center;
  }
  
  .footer-heading {
    margin: 0 0 1rem;
    font-size: 1rem;
    font-weight: 600;
    color: var(--text);
  }
  
  .tags-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
  }
  
  .tag-link {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--text);
    background: var(--surface0);
    border: 1px solid var(--surface1);
    border-radius: var(--radius-full);
    text-decoration: none;
    transition: all 0.2s ease;
  }
  
  .tag-link:hover {
    background: var(--surface1);
    border-color: var(--accent);
    color: var(--accent);
  }
</style>
