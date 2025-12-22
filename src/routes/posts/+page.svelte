<script>
  import SEO from '$lib/components/SEO.svelte';
</script>

<SEO 
  title="Posts | Daljeet Singh Lotey"
  description="Posts by Daljeet Singh Lotey | software engineering, design, and technical experiments (under development)."
  canonical="https://djtsingh.github.io/posts"
  type="website"
/>

<div class="posts-page">
  <div class="posts-inner">
    <div class="posts-emoji">🚧</div>
    <h1 class="posts-title">Under Development</h1>
    <p class="posts-lead">
      I'm currently building something great here. Check back soon for insightful posts on software engineering, design, and technology.
    </p>
    <a href="/" class="chip">← Back to Home</a>
  </div>
</div>

<style>
  /* eslint-disable css-unused-selector */
  
  .posts-page {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
  }
  
  .posts-inner {
    text-align: center;
    max-width: 480px;
  }
  
  .posts-emoji {
    font-size: 4rem;
    margin-bottom: 1.5rem;
  }
  
  .posts-title {
    margin: 0 0 1rem;
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--text);
  }
  
  .posts-lead {
    margin: 0 0 2rem;
    font-size: 1rem;
    line-height: 1.7;
    color: var(--subtext1);
  }
  
  .chip {
    display: inline-flex;
    align-items: center;
    padding: 0.65rem 1.25rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text);
    background: transparent;
    border: 1px solid var(--surface1);
    border-radius: var(--radius-full);
    text-decoration: none;
    position: relative;
    overflow: hidden;
    transition: all 0.2s ease;
  }
  
  .chip::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--accent);
    opacity: 0;
    transition: opacity 0.2s ease;
    z-index: 0;
  }
  
  /* svelte-ignore css_unused_selector - Used in template for chip text spans */
  .chip span {
    position: relative;
    z-index: 1;
  }
  
  .chip:hover {
    border-color: var(--accent);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  .chip:hover::before {
    opacity: 0.1;
  }
  
  .chip:active {
    transform: translateY(0);
  }
  
  /* eslint-enable css-unused-selector */
</style>
