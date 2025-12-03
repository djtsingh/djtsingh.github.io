<script>
  import SEO from '$lib/components/SEO.svelte';
  
  const projects = [
    {
      title: 'Janus',
      description: 'Adversarial Detection of Obfuscated Botnets via Browser Fingerprinting Variance',
      image: '/projects/janus.webp',
      tags: ['AI', 'Design', 'Open Source'],
      links: []
    },
    {
      title: 'SignalFlow',
      description: 'Realtime analytics dashboard that maps ML signals into human-readable stories for product teams.',
      image: 'https://via.placeholder.com/600x360',
      tags: ['Data', 'Visualization'],
      links: []
    },
    {
      title: 'Aurora Lab',
      description: 'Experimental playground exploring autonomous agents that design interactive, adaptive experiences.',
      image: 'https://via.placeholder.com/600x360',
      tags: ['Research', 'Experiments'],
      links: []
    }
  ];
</script>

<SEO 
  title="Daljeet Singh | Portfolio"
  description="Daljeet Singh — software developer and maker. Portfolio showcasing projects in AI, data visualization, and experiments."
  canonical="https://djtsingh.github.io/"
  type="website"
/>

<section class="hero">
  <div class="hero-card">
    <p class="kicker">Futurist · Maker</p>
    <h1 class="hero-title">Hey! I'm <span class="accent">Daljeet Singh</span></h1>
    <p class="hero-text">
      A Software dev and fresh CS grad driven by the art of digital craftsmanship. I bridge the gap between theoretical algorithms and practical, scalable applications. Driven by deep curiosity, I spend my downtime exploring emerging technologies to craft tools that are not only functional but truly transformative for the end user.
    </p>
    <div class="hero-chips">
      <a href="https://www.linkedin.com/in/djtsingh/" target="_blank" rel="noopener noreferrer" class="chip">LinkedIn</a>
      <a href="https://github.com/djtsingh" target="_blank" rel="noopener noreferrer" class="chip">GitHub</a>
      <a href="/about" class="chip">More...</a>
    </div>
  </div>
</section>

<section class="projects-section">
  <div class="section-header">
    <h2>Featured Projects</h2>
  </div>
  <div class="projects-grid">
    {#each projects as project}
      <article class="project-card">
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
    font-size: clamp(1.75rem, 5vw, 2.75rem);
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
    font-size: 0.95rem;
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
    padding: 0.45rem 1rem;
    font-size: 0.8rem;
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
