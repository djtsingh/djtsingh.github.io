<script>
  import SEO from '$lib/components/SEO.svelte';
  import { projects } from '$lib/data/projects.js';
  
  // Show only featured projects on homepage
  const featuredProjects = projects.filter(p => p.featured);
</script>

<SEO 
  title="Daljeet Singh Lotey | Portfolio"
  description="Daljeet Singh Lotey — Software Engineering and Data Science. Portfolio showcasing projects in AI, data visualization, and experiments."
  canonical="https://djtsingh.github.io/"
  type="website"
/>

<section class="hero">
  <div class="hero-card">
    <p class="kicker">Explorer · Engineer · Builder</p>
    <h1 class="hero-title">Hey! I'm <span class="accent">Daljeet Singh</span></h1>
    <p class="hero-text">
      A Software dev and fresh CS grad driven by the art of digital craftsmanship. I bridge the gap between theoretical algorithms and practical, scalable applications. Driven by deep curiosity, I spend my downtime exploring emerging technologies to craft tools that are not only functional but truly transformative for the end user.
    </p>
    <div class="hero-chips">
      <a href="https://www.linkedin.com/in/djtsingh/" target="_blank" rel="noopener noreferrer" class="chip">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
        <span>LinkedIn</span>
      </a>
      <a href="https://github.com/djtsingh" target="_blank" rel="noopener noreferrer" class="chip">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        <span>GitHub</span>
      </a>
      <a href="/about" class="chip">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
        <span>More...</span>
      </a>
    </div>
  </div>
</section>

<section class="projects-section">
  <div class="section-header">
    <h2>Featured Projects</h2>
  </div>
  <div class="projects-grid">
    {#each featuredProjects as project}
      <article class="project-card">
        {#if project.slug}
          <a href="/projects/{project.slug}" class="project-link">
            <img src={project.image} alt="{project.title} screenshot" class="project-img" />
            <div class="project-content">
              <h3 class="project-title">{project.title}</h3>
              <p class="project-desc">{project.description}</p>
              <div class="project-tags">
                {#each project.tags as tag}
                  <span class="project-tag">{tag}</span>
                {/each}
              </div>
            </div>
          </a>
        {:else}
          <img src={project.image} alt="{project.title} screenshot" class="project-img" />
          <div class="project-content">
            <h3 class="project-title">{project.title}</h3>
            <p class="project-desc">{project.description}</p>
            <div class="project-tags">
              {#each project.tags as tag}
                <span class="project-tag">{tag}</span>
              {/each}
            </div>
          </div>
        {/if}
      </article>
    {/each}
  </div>
</section>

<style>
  .hero {
    padding: 2rem 0 3rem;
  }
  
  .hero-card {
    padding: 2rem;
    border-radius: var(--radius-xl);
    border: 1px solid var(--surface0);
    background: rgba(var(--base-rgb), 0.7);
    box-shadow: var(--shadow-lg);
    backdrop-filter: blur(12px);
  }
  
  .kicker {
    margin: 0 0 0.75rem;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    color: var(--subtext1);
  }
  
  .hero-title {
    margin: 0 0 1rem;
    font-size: clamp(2rem, 5vw, 3.25rem);
    font-weight: 700;
    line-height: 1.15;
    color: var(--text);
  }
  
  .hero-title .accent {
    color: var(--accent);
  }
  
  .hero-text {
    margin: 0 0 1.5rem;
    max-width: 65ch;
    font-size: 1.05rem;
    line-height: 1.7;
    color: var(--subtext1);
  }
  
  .hero-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .chip {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.5rem 0.85rem;
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--text);
    background: var(--surface0);
    border-radius: var(--radius-full);
    text-decoration: none;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .chip svg {
    flex-shrink: 0;
    opacity: 0.85;
    transition: opacity 0.2s ease;
  }
  
  .chip:hover {
    background: var(--accent);
    color: var(--mantle);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  .chip:hover svg {
    opacity: 1;
  }
  
  .chip:active {
    transform: translateY(0);
  }
  
  .projects-section {
    padding-top: 3rem;
  }
  
  .section-header h2 {
    margin: 0 0 1.5rem;
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--text);
  }
  
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }
  
  .project-card {
    display: flex;
    flex-direction: column;
    border-radius: var(--radius-lg);
    border: 1px solid var(--surface0);
    background: var(--base);
    overflow: hidden;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  
  .project-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }
  
  .project-link {
    display: flex;
    flex-direction: column;
    flex: 1;
    text-decoration: none;
    color: inherit;
  }
  
  .project-img {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
  }
  
  .project-content {
    flex: 1;
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .project-title {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--text);
  }
  
  .project-desc {
    margin: 0;
    font-size: 0.875rem;
    line-height: 1.6;
    color: var(--subtext0);
  }
  
  .project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: auto;
  }
  
  .project-tag {
    padding: 0.25rem 0.6rem;
    font-size: 0.7rem;
    font-weight: 500;
    color: var(--accent);
    background: rgba(var(--accent-rgb), 0.15);
    border-radius: var(--radius-sm);
  }
</style>
