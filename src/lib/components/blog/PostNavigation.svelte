<script>
  /**
   * PostNavigation - Previous/Next post navigation
   * Features: Hover animations, keyboard navigation hints
   */
  export let prevPost = null;
  export let nextPost = null;
</script>

{#if prevPost || nextPost}
  <nav class="post-navigation" aria-label="Post navigation">
    {#if prevPost}
      <a href="/posts/{prevPost.slug}" class="nav-link prev">
        <span class="nav-direction">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
          Previous
        </span>
        <span class="nav-title">{prevPost.title}</span>
      </a>
    {:else}
      <div class="nav-placeholder"></div>
    {/if}
    
    {#if nextPost}
      <a href="/posts/{nextPost.slug}" class="nav-link next">
        <span class="nav-direction">
          Next
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </span>
        <span class="nav-title">{nextPost.title}</span>
      </a>
    {:else}
      <div class="nav-placeholder"></div>
    {/if}
  </nav>
{/if}

<style>
  .post-navigation {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid var(--surface1);
  }
  
  @media (max-width: 640px) {
    .post-navigation {
      grid-template-columns: 1fr;
    }
  }
  
  .nav-link {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1.25rem;
    background: var(--surface0);
    border: 1px solid var(--surface1);
    border-radius: var(--radius-md);
    text-decoration: none;
    transition: all 0.3s ease;
  }
  
  .nav-link:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    border-color: var(--accent);
  }
  
  .nav-link.prev {
    text-align: left;
  }
  
  .nav-link.next {
    text-align: right;
  }
  
  .nav-direction {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.8rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--accent);
  }
  
  .nav-link.next .nav-direction {
    justify-content: flex-end;
  }
  
  .nav-title {
    font-size: 1rem;
    font-weight: 600;
    color: var(--text);
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    transition: color 0.2s ease;
  }
  
  .nav-link:hover .nav-title {
    color: var(--accent);
  }
  
  .nav-placeholder {
    /* Empty placeholder to maintain grid layout */
    visibility: hidden;
  }
  
  /* Hover arrow animations */
  .nav-link.prev:hover svg {
    animation: arrowLeft 0.3s ease infinite alternate;
  }
  
  .nav-link.next:hover svg {
    animation: arrowRight 0.3s ease infinite alternate;
  }
  
  @keyframes arrowLeft {
    from { transform: translateX(0); }
    to { transform: translateX(-3px); }
  }
  
  @keyframes arrowRight {
    from { transform: translateX(0); }
    to { transform: translateX(3px); }
  }
</style>
