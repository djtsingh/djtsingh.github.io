<script>
  /**
   * Skeleton - Loading placeholder with shimmer animation
   * Features: Multiple variants for different content types
   */
  
  /** @type {'text' | 'title' | 'avatar' | 'image' | 'card' | 'button'} */
  export let variant = 'text';
  
  /** @type {string} */
  export let width = '100%';
  
  /** @type {string} */
  export let height = '';
  
  /** @type {number} - For text variant, number of lines */
  export let lines = 1;
  
  /** @type {boolean} */
  export let rounded = false;
  
  const variantStyles = {
    text: { h: '1rem', r: '4px' },
    title: { h: '1.5rem', r: '4px' },
    avatar: { h: '48px', w: '48px', r: '50%' },
    image: { h: '200px', r: '12px' },
    card: { h: '280px', r: '12px' },
    button: { h: '40px', w: '120px', r: '8px' }
  };
  
  $: styles = variantStyles[variant];
  $: computedHeight = height || styles.h;
  $: computedWidth = styles.w || width;
  $: radius = rounded ? '50%' : styles.r;
</script>

{#if variant === 'text' && lines > 1}
  <div class="skeleton-lines">
    {#each Array(lines) as _, i}
      <div 
        class="skeleton" 
        style="width: {i === lines - 1 ? '70%' : '100%'}; height: {computedHeight}; border-radius: {radius};"
      ></div>
    {/each}
  </div>
{:else}
  <div 
    class="skeleton" 
    style="width: {computedWidth}; height: {computedHeight}; border-radius: {radius};"
    role="presentation"
    aria-label="Loading..."
  ></div>
{/if}

<style>
  .skeleton {
    background: linear-gradient(
      90deg,
      var(--surface0) 25%,
      var(--surface1) 50%,
      var(--surface0) 75%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s ease-in-out infinite;
  }
  
  .skeleton-lines {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
  }
  
  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
  
  /* Respect reduced motion preference */
  @media (prefers-reduced-motion: reduce) {
    .skeleton {
      animation: pulse 2s ease-in-out infinite;
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
  }
</style>
