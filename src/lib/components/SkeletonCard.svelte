<script>
  /**
   * SkeletonCard - Loading placeholder for blog/project cards
   */
  
  /** @type {'blog' | 'project' | 'compact'} */
  export let variant = 'blog';
</script>

<article class="skeleton-card {variant}">
  {#if variant !== 'compact'}
    <div class="skeleton-image"></div>
  {/if}
  <div class="skeleton-content">
    <div class="skeleton-meta"></div>
    <div class="skeleton-title"></div>
    <div class="skeleton-text"></div>
    <div class="skeleton-text short"></div>
    {#if variant === 'project'}
      <div class="skeleton-tags">
        <div class="skeleton-tag"></div>
        <div class="skeleton-tag"></div>
        <div class="skeleton-tag"></div>
      </div>
    {/if}
  </div>
</article>

<style>
  .skeleton-card {
    background: var(--surface0);
    border-radius: var(--radius-lg, 20px);
    overflow: hidden;
    border: 1px solid var(--surface1);
  }
  
  .skeleton-card.compact {
    padding: 1rem;
  }
  
  .skeleton-image {
    width: 100%;
    height: 180px;
    background: linear-gradient(90deg, var(--surface0) 25%, var(--surface1) 50%, var(--surface0) 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s ease-in-out infinite;
  }
  
  .skeleton-card.project .skeleton-image {
    height: 200px;
  }
  
  .skeleton-content {
    padding: 1.25rem;
  }
  
  .skeleton-meta {
    width: 80px;
    height: 12px;
    background: linear-gradient(90deg, var(--surface0) 25%, var(--surface1) 50%, var(--surface0) 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s ease-in-out infinite;
    border-radius: 4px;
    margin-bottom: 0.75rem;
  }
  
  .skeleton-title {
    width: 85%;
    height: 20px;
    background: linear-gradient(90deg, var(--surface0) 25%, var(--surface1) 50%, var(--surface0) 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s ease-in-out infinite;
    border-radius: 4px;
    margin-bottom: 0.75rem;
  }
  
  .skeleton-text {
    width: 100%;
    height: 14px;
    background: linear-gradient(90deg, var(--surface0) 25%, var(--surface1) 50%, var(--surface0) 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s ease-in-out infinite;
    border-radius: 4px;
    margin-bottom: 0.5rem;
  }
  
  .skeleton-text.short {
    width: 65%;
  }
  
  .skeleton-tags {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
  }
  
  .skeleton-tag {
    width: 60px;
    height: 24px;
    background: linear-gradient(90deg, var(--surface0) 25%, var(--surface1) 50%, var(--surface0) 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s ease-in-out infinite;
    border-radius: 12px;
  }
  
  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
  
  @media (prefers-reduced-motion: reduce) {
    .skeleton-image,
    .skeleton-meta,
    .skeleton-title,
    .skeleton-text,
    .skeleton-tag {
      animation: pulse 2s ease-in-out infinite;
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
  }
</style>
