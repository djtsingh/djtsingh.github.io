<script>
  /**
   * BlogStats - Animated statistics display
   * Features: Count-up animation, pulse effects
   */
  import { onMount } from 'svelte';
  import { postStats } from '$lib/stores/blog.js';
  
  let totalPosts = 0;
  let totalReadTime = 0;
  let isVisible = false;
  let container;
  
  $: stats = $postStats;
  
  // Animate count up
  function animateValue(start, end, duration, callback) {
    const range = end - start;
    const startTime = performance.now();
    
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // Ease out cubic
      const value = Math.round(start + range * eased);
      callback(value);
      
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
    
    requestAnimationFrame(update);
  }
  
  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !isVisible) {
            isVisible = true;
            
            // Animate numbers
            animateValue(0, stats.total, 800, (v) => totalPosts = v);
            animateValue(0, stats.totalReadingTime, 1000, (v) => totalReadTime = v);
            
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    
    if (container) observer.observe(container);
    
    return () => observer.disconnect();
  });
</script>

<div class="blog-stats" bind:this={container} class:visible={isVisible}>
  <div class="stat-card">
    <div class="stat-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
      </svg>
    </div>
    <div class="stat-content">
      <span class="stat-value">{totalPosts}</span>
      <span class="stat-label">Articles</span>
    </div>
    <div class="stat-pulse"></div>
  </div>
  
  <div class="stat-card">
    <div class="stat-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    </div>
    <div class="stat-content">
      <span class="stat-value">{totalReadTime}<span class="stat-unit">min</span></span>
      <span class="stat-label">Total reading</span>
    </div>
    <div class="stat-pulse"></div>
  </div>
  
  <div class="stat-card">
    <div class="stat-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 20h9"/>
        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>
      </svg>
    </div>
    <div class="stat-content">
      <span class="stat-value">{stats.averageReadingTime}<span class="stat-unit">min</span></span>
      <span class="stat-label">Avg. per post</span>
    </div>
    <div class="stat-pulse"></div>
  </div>
</div>

<style>
  .blog-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
    opacity: 0;
    transform: translateY(15px);
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .blog-stats.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  @media (max-width: 640px) {
    .blog-stats {
      grid-template-columns: repeat(3, 1fr);
      gap: 0.5rem;
    }
  }
  
  .stat-card {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.75rem;
    background: var(--surface0);
    border: 1px solid var(--surface1);
    border-radius: var(--radius-sm);
    overflow: hidden;
    transition: all 0.2s ease;
  }
  
  .stat-card:hover {
    border-color: var(--accent);
  }
  
  .stat-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: rgba(var(--accent-rgb), 0.1);
    border-radius: var(--radius-sm);
    color: var(--accent);
    flex-shrink: 0;
  }
  
  .stat-icon svg {
    width: 16px;
    height: 16px;
  }
  
  .stat-content {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }
  
  .stat-value {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--text);
    line-height: 1;
    font-variant-numeric: tabular-nums;
  }
  
  .stat-unit {
    font-size: 0.65em;
    font-weight: 500;
    color: var(--subtext1);
    margin-left: 0.15rem;
  }
  
  .stat-label {
    font-size: 0.65rem;
    color: var(--subtext1);
    margin-top: 0.15rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .stat-pulse {
    display: none;
  }
  
  @media (max-width: 480px) {
    .stat-card {
      flex-direction: column;
      text-align: center;
      padding: 0.6rem 0.4rem;
      gap: 0.4rem;
    }
    
    .stat-icon {
      width: 28px;
      height: 28px;
    }
    
    .stat-icon svg {
      width: 14px;
      height: 14px;
    }
    
    .stat-value {
      font-size: 0.95rem;
    }
    
    .stat-label {
      font-size: 0.55rem;
    }
  }
</style>
