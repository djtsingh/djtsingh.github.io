<script>
  import SEO from '$lib/components/SEO.svelte';
  
  const projects = [
    {
      title: 'Janus',
      slug: 'janus',
      description: 'A brief tagline describing what Janus does — update this with actual project info.',
      image: '/projects/janus.webp',
      tags: ['AI', 'Python', 'Open Source'],
      featured: true
    },
    {
      title: 'ImageCraft',
      slug: null,
      description: 'Generative interface that turns abstract prompts into layered, shareable visuals for design teams.',
      image: 'https://picsum.photos/seed/image1/800/450',
      tags: ['AI', 'Design', 'Open Source'],
      links: { live: '#', source: 'https://github.com/djtsingh/imagecraft' }
    },
    {
      title: 'SignalFlow',
      slug: null,
      description: 'Realtime analytics dashboard that maps ML signals into human-readable stories for product teams.',
      image: 'https://picsum.photos/seed/image2/800/450',
      tags: ['Data', 'Visualization'],
      links: { demo: '#', source: 'https://github.com/djtsingh/signalflow' }
    },
    {
      title: 'Aurora Lab',
      slug: null,
      description: 'Experimental playground exploring autonomous agents that design interactive, adaptive experiences.',
      image: 'https://picsum.photos/seed/image3/800/450',
      tags: ['Research', 'Experiments'],
      links: { source: 'https://github.com/djtsingh/aurora-lab' }
    },
    {
      title: 'Chronicle',
      slug: null,
      description: 'A lightweight journaling app with privacy-first syncing and a minimal editor focused on writing flow.',
      image: 'https://picsum.photos/seed/image4/800/450',
      tags: ['Productivity', 'Privacy'],
      links: { demo: '#', source: 'https://github.com/djtsingh/chronicle' }
    },
    {
      title: 'Toolbox',
      slug: null,
      description: 'Collection of small CLI and web utilities that speed up common engineering tasks and debugging workflows.',
      image: 'https://picsum.photos/seed/image5/800/450',
      tags: ['CLI', 'Tools'],
      links: { source: 'https://github.com/djtsingh/toolbox' }
    }
  ];
</script>

<SEO 
  title="Projects | Daljeet Singh Lotey"
  description="Projects by Daljeet Singh Lotey — tools, experiments and open-source work in AI, visualization and systems engineering."
  canonical="https://djtsingh.github.io/projects"
  type="website"
/>

<div class="projects-page">
  <header class="page-header">
    <p class="kicker">Work & experiments</p>
    <h1>Projects</h1>
    <p class="lead">A selection of projects I build — tools, experiments, and open-source work. Click through for live demos or source.</p>
  </header>

  <div class="projects-grid">
    {#each projects as project}
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
</div>

<style>
  .projects-page {
    max-width: 1100px;
    margin: 0 auto;
  }
  
  .page-header {
    margin-bottom: 2.5rem;
    text-align: center;
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
    margin: 0 0 0.75rem;
    font-size: clamp(2rem, 5vw, 2.5rem);
    font-weight: 700;
    color: var(--text);
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
    padding: 0.4rem 0.85rem;
    font-size: 0.75rem;
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
