<script>
  import SEO from '$lib/components/SEO.svelte';
  import Widgets from '$lib/components/Widgets.svelte';
  import { projects } from '$lib/data/projects.js';
  
  const featuredProjects = projects.filter(p => p.featured);
</script>

<section class="hero">
  <div class="hero-card">
    <h1 class="hero-title">Hey! I'm <span class="accent">Daljeet Singh</span></h1>
    <p class="hero-text">
      I am a Software Developer and recent CS graduate dedicated to the craft of building scalable, high-performance systems. I bridge the gap between theoretical algorithms and practical application, engineering robust tools that deliver real impact and elevate the user experience.
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
    <h2 class="section-title">
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
      <span>Featured Projects</span>
    </h2>
  </div>
  <div class="projects-grid">
    {#each featuredProjects as project}
      <article class="project-card">
        {#if project.slug}
          <a href="/projects/{project.slug}" class="project-link">
            <img 
              src={project.image} 
              alt="{project.title} screenshot" 
              class="project-img"
              width="400"
              height="225"
              loading="lazy"
              decoding="async"
            />
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
          <img 
            src={project.image} 
            alt="{project.title} screenshot" 
            class="project-img"
            width="400"
            height="225"
            loading="lazy"
            decoding="async"
          />
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
  <div class="view-all-container">
    <a href="/projects" class="view-all-btn">
      <span>View All Projects</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M5 12h14"/>
        <path d="m12 5 7 7-7 7"/>
      </svg>
    </a>
  </div>
</section>

<!-- Interactive Widgets Section -->
<div class="widgets-fullwidth-container">
  <Widgets />
</div>

<style>
  .hero {
    padding: 2rem 0 3rem;
  }
  
  @media (max-width: 768px) {
    .hero {
      padding-left: 5px;
      padding-right: 5px;
    }
  }
  
  .hero-card {
    padding: 2rem 2.5rem 2rem 2rem;
  }
  
  @media (max-width: 768px) {
    .hero-card {
      padding: 1rem 1.5rem 1rem 1rem;
    }
  }
  
  .hero-title {
    margin: 0 0 1rem;
    font-size: clamp(1.75rem, 5vw, 2.75rem);
    font-weight: var(--font-weight-bold);
    line-height: 1.15;
    color: var(--text);
  }
  
  .hero-title .accent {
    color: var(--accent);
  }
  
  .hero-text {
    margin: 0 0 1.5rem;
    max-width: 75ch;
    font-size: 1rem;
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
    gap: 0.5rem;
    padding: 0.65rem 1rem;
    font-size: 0.875rem;
    font-weight: var(--font-weight-medium);
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
  
  .chip svg,
  .chip span {
    position: relative;
    z-index: 1;
  }
  
  .chip svg {
    flex-shrink: 0;
    transition: transform 0.2s ease;
  }
  
  .chip:hover {
    border-color: var(--accent);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  .chip:hover::before {
    opacity: 0.1;
  }
  
  .chip:hover svg {
    transform: scale(1.1);
  }
  
  .chip:active {
    transform: translateY(0);
  }
  
  .projects-section {
    padding-top: 3rem;
  }
  
  .section-title {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin: 0 0 2rem;
    font-size: clamp(1.75rem, 4vw, 2.25rem);
    font-weight: 700;
    color: var(--text);
  }
  
  .section-title svg {
    color: var(--accent);
    flex-shrink: 0;
  }
  
  .view-all-container {
    display: flex;
    justify-content: center;
    margin-top: 3rem;
  }
  
  .view-all-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.875rem 1.5rem;
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--text);
    background: transparent;
    border: 1px solid var(--surface1);
    border-radius: var(--radius-full);
    text-decoration: none;
    position: relative;
    overflow: hidden;
    transition: all var(--duration-normal) var(--ease-smooth);
  }
  
  @media (max-width: 768px) {
    .view-all-btn {
      padding: 0.75rem 1.25rem;
      font-size: 0.875rem;
      gap: 0.5rem;
    }
  }
  
  .view-all-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--accent);
    opacity: 0;
    transition: opacity var(--duration-normal) var(--ease-smooth);
    z-index: 0;
  }
  
  .view-all-btn span,
  .view-all-btn svg {
    position: relative;
    z-index: 1;
  }
  
  .view-all-btn svg {
    transition: transform var(--duration-normal) var(--ease-smooth);
  }
  
  .view-all-btn:hover {
    border-color: var(--accent);
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  }
  
  .view-all-btn:hover::before {
    opacity: 0.1;
  }
  
  .view-all-btn:hover svg {
    transform: translateX(4px);
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

  .widgets-fullwidth-container {
    width: 100%;
    /* No max-width to span full width like footer */
    margin: 0;
    padding: 0; /* Set padding to 0 */
  }
</style>
