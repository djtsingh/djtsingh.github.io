<script>
  import SEO from '$lib/components/SEO.svelte';
  import { projects } from '$lib/data/projects.js';
  
  let searchQuery = '';
  
  $: filteredProjects = searchQuery.trim() 
    ? projects.filter(p => {
        const query = searchQuery.toLowerCase();
        return p.title.toLowerCase().includes(query) ||
               p.description.toLowerCase().includes(query) ||
               p.tags.some(tag => tag.toLowerCase().includes(query));
      })
    : projects;
</script>

<SEO 
  title="Projects | Daljeet Singh Lotey"
  description="Projects by Daljeet Singh Lotey | tools, experiments and open-source work in AI, visualization and systems engineering."
  canonical="https://djtsingh.github.io/projects"
  type="website"
/>

<div class="projects-page">
  <header class="page-header">
    <p class="kicker">Work & experiments</p>
    <h1>
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
      <span>Projects</span>
    </h1>
    <p class="lead">A selection of projects I build — tools, experiments, and open-source work. Click through for live demos or source.</p>
    
    <!-- Search -->
    <div class="search-box">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.35-4.35"></path>
      </svg>
      <input 
        type="text" 
        bind:value={searchQuery}
        placeholder="Search projects..."
        class="search-input"
      />
      {#if searchQuery}
        <button class="clear-btn" on:click={() => searchQuery = ''}>×</button>
      {/if}
    </div>
  </header>

  {#if filteredProjects.length === 0}
    <div class="no-results">
      <p>No projects found for "{searchQuery}"</p>
    </div>
  {:else}
    <div class="projects-grid">
      {#each filteredProjects as project}
      <article class="project-card" class:featured={project.featured}>
        {#if project.slug}
          <a href="/projects/{project.slug}" class="project-link">
            <img src={project.image} alt="{project.title} screenshot" class="project-img" />
            <div class="project-content">
              <h3 class="project-title">
                {project.title}
                {#if project.featured}
                  <span class="featured-badge">Featured</span>
                {/if}
              </h3>
              <p class="project-desc">{project.description}</p>
              <div class="project-tags">
                {#each project.tags as tag}
                  <span class="project-tag">{tag}</span>
                {/each}
              </div>
              <span class="view-project">View Project →</span>
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
            {#if project.links}
              <div class="project-actions">
                {#if project.links.live}
                  <a href={project.links.live} class="chip">Live</a>
                {/if}
                {#if project.links.demo}
                  <a href={project.links.demo} class="chip">Demo</a>
                {/if}
                {#if project.links.source}
                  <a href={project.links.source} target="_blank" rel="noopener noreferrer" class="chip">Source</a>
                {/if}
              </div>
            {/if}
          </div>
        {/if}
      </article>
      {/each}
    </div>
  {/if}
</div><style>
  .projects-page {
    max-width: 1100px;
    margin: 0 auto;
  }
  
  .page-header {
    margin-bottom: 3rem;
    text-align: center;
  }
  
  .search-box {
    position: relative;
    max-width: 500px;
    margin: 2rem auto 0;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    background: var(--surface0);
    border: 1px solid var(--surface1);
    border-radius: var(--radius-lg);
    transition: border-color 0.2s ease;
  }
  
  .search-box:focus-within {
    border-color: var(--accent);
  }
  
  .search-box svg {
    color: var(--subtext1);
    flex-shrink: 0;
  }
  
  .search-input {
    flex: 1;
    background: transparent;
    border: none;
    color: var(--text);
    font-size: 0.95rem;
    outline: none;
  }
  
  .search-input::placeholder {
    color: var(--subtext0);
  }
  
  .clear-btn {
    background: transparent;
    border: none;
    color: var(--subtext1);
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s ease;
  }
  
  .clear-btn:hover {
    color: var(--text);
  }
  
  .no-results {
    text-align: center;
    padding: 3rem 1rem;
    color: var(--subtext1);
  }
  
  .kicker {
    margin: 0 0 0.5rem;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--accent);
  }
  
  .page-header h1 {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    margin: 0 0 0.75rem;
    font-size: clamp(2rem, 5vw, 2.5rem);
    font-weight: 700;
    color: var(--text);
  }
  
  .page-header h1 svg {
    color: var(--accent);
    flex-shrink: 0;
  }
  
  .lead {
    margin: 0;
    max-width: 55ch;
    margin-inline: auto;
    font-size: 1rem;
    line-height: 1.6;
    color: var(--subtext1);
  }
  
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
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
  }
  
  .project-tag {
    padding: 0.25rem 0.6rem;
    font-size: 0.7rem;
    font-weight: 500;
    color: var(--accent);
    background: rgba(var(--accent-rgb), 0.15);
    border-radius: var(--radius-sm);
  }
  
  .project-actions {
    display: flex;
    gap: 0.5rem;
    margin-top: auto;
    padding-top: 0.5rem;
  }
  
  .chip {
    display: inline-flex;
    align-items: center;
    padding: 0.5rem 0.9rem;
    font-size: 0.8rem;
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
  
  /* Featured & Linked Projects */
  .project-card.featured {
    border-color: var(--accent);
    border-width: 2px;
  }
  
  .project-link {
    display: flex;
    flex-direction: column;
    height: 100%;
    color: inherit;
    text-decoration: none;
  }
  
  .featured-badge {
    margin-left: 0.5rem;
    padding: 0.2rem 0.5rem;
    font-size: 0.65rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    background: var(--accent);
    color: var(--mantle);
    border-radius: var(--radius-sm);
    vertical-align: middle;
  }
  
  .view-project {
    margin-top: auto;
    padding-top: 0.5rem;
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--accent);
    transition: transform 0.15s ease;
  }
  
  .project-link:hover .view-project {
    transform: translateX(4px);
  }
</style>
