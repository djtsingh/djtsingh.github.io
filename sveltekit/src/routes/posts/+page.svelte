<script>
  import SEO from '$lib/components/SEO.svelte';
</script>

<SEO 
  title="Posts | Daljeet Singh"
  description="Posts by Daljeet Singh — software engineering, design, and technical experiments (under development)."
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
    padding: 0.5rem 1.25rem;
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--text);
    background: var(--surface0);
    border-radius: var(--radius-full);
    text-decoration: none;
    transition: background 0.15s ease, color 0.15s ease;
  }
  
  .chip:hover {
    background: var(--accent);
    color: var(--mantle);
  }
</style>
