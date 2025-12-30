<script>
  import SEO from '$lib/components/SEO.svelte';
  import LoadingState from '$lib/components/LoadingState.svelte';
  import { onMount } from 'svelte';
  
  const project = {
    title: 'Djx',
    tagline: 'A modern personal portfolio built from the ground up',
    description: 'A meticulously crafted portfolio website showcasing the intersection of design and engineering. Built with SvelteKit for optimal performance, featuring custom theming system, responsive layouts, and attention to detail in every interaction.',
    image: '/projects/djx-cover.webp',
    status: 'Active', // Active, Completed, Experimental, Archived
    year: '2025',
    readingTime: '6 min read', // Estimated reading time
    links: {
      github: 'https://github.com/djtsingh/djx',
      demo: 'https://djtsingh.github.io',
      docs: '#'
    }
  };
  
  const features = [
    {
      icon: '🎨',
      title: 'Custom Theming System',
      description: 'Dynamic theme switcher with 4 base themes (Mocha, Latte, Frappe, Macchiato) and 14 accent colors using Catppuccin palette. CSS custom properties enable instant theme switching with local storage persistence.'
    },
    {
      icon: '⚡',
      title: 'Performance Optimized',
      description: 'Static site generation with SvelteKit adapter, prerendering for instant page loads, optimized assets, and minimal JavaScript. Achieves 100/100 Lighthouse performance score with sub-second load times.'
    },
    {
      icon: '📱',
      title: 'Responsive Design',
      description: 'Mobile-first approach with fluid typography, adaptive layouts, and touch-optimized interactions. Seamless experience from mobile devices to ultra-wide displays with consistent design language.'
    },
    {
      icon: '♿',
      title: 'Accessibility First',
      description: 'WCAG 2.1 AA compliant with proper ARIA labels, keyboard navigation, screen reader support, and focus management. Semantic HTML structure and high contrast ratios ensure inclusive user experience.'
    }
  ];
  
  const techStack = [
    { name: 'SvelteKit', category: 'framework' },
    { name: 'TypeScript', category: 'language' },
    { name: 'CSS', category: 'frontend' },
    { name: 'JavaScript', category: 'language' },
    { name: 'Vite', category: 'tool' },
    { name: 'GitHub Actions', category: 'tool' }
  ];
  
  let loading = true;
  
  onMount(() => {
    // Brief loading state for polished UX
    setTimeout(() => {
      loading = false;
    }, 100);
  });
  
  const screenshots = [
    { src: '/projects/djx-cover.webp', alt: 'Djx portfolio homepage', caption: 'Main portfolio view' }
  ];
</script>

<SEO 
  title="Djx Portfolio"
  description="{project.tagline} - A project by Daljeet Singh Lotey"
  image={project.image}
  canonical="https://djtsingh.github.io/projects/portfolio"
  type="article"
/>

<article class="project-page">
  <!-- Back Navigation -->
  <nav class="breadcrumb">
    <a href="/projects" class="back-link">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m15 18-6-6 6-6"/>
      </svg>
      All Projects
    </a>
  </nav>

  <!-- Hero Section -->
  <header class="project-hero">
    <div class="hero-content">
      <div class="hero-meta">
        <span class="status status--{project.status.toLowerCase()}">{project.status}</span>
        <span class="year">{project.year}</span>
        <span class="reading-time">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
          {project.readingTime}
        </span>
      </div>
      <h1>{project.title}</h1>
      <p class="tagline">{project.tagline}</p>
      <p class="description">{project.description}</p>
      
      <div class="hero-actions">
          {#if project.links.demo && project.links.demo !== '#'}
            <a href={project.links.demo} class="btn btn--primary" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" x2="21" y2="3"/>
              </svg>
              Live Demo
            </a>
          {/if}
          {#if project.links.github}
            <a href={project.links.github} class="btn btn--secondary" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              View Source
            </a>
          {/if}
          {#if project.links.docs && project.links.docs !== '#'}
            <a href={project.links.docs} class="btn btn--ghost" target="_blank" rel="noopener noreferrer">
              Documentation
            </a>
          {/if}
      </div>
    </div>
    
    <div class="hero-image">
      <img src={project.image} alt="{project.title} preview" width="800" height="600" loading="eager" fetchpriority="high" />
    </div>
  </header>

  <!-- Features Section -->
  <section class="section features-section">
    <h2 class="section-title">Features</h2>
    <div class="features-grid">
      {#if loading}
        {#each Array(4) as _}
          <div class="feature-card skeleton">
            <LoadingState type="skeleton" size="small" />
          </div>
        {/each}
      {:else}
        {#each features as feature}
          <div class="feature-card">
            <span class="feature-icon">{feature.icon}</span>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        {/each}
      {/if}
    </div>
  </section>

  <!-- Tech Stack Section -->
  <section class="section stack-section">
    <h2 class="section-title">Tech Stack</h2>
    <div class="stack-grid">
      {#if loading}
        {#each Array(6) as _}
          <span class="stack-badge skeleton">
            <LoadingState type="skeleton" size="small" />
          </span>
        {/each}
      {:else}
        {#each techStack as tech}
          <span class="stack-badge" data-category={tech.category}>{tech.name}</span>
        {/each}
      {/if}
    </div>
  </section>

  <!-- Screenshots Section -->
  {#if screenshots.length > 0}
    <section class="section screenshots-section">
      <h2 class="section-title">Screenshots</h2>
      <div class="screenshots-grid">
        {#each screenshots as screenshot}
          <figure class="screenshot">
            <img src={screenshot.src} alt={screenshot.alt} loading="lazy" />
            {#if screenshot.caption}
              <figcaption>{screenshot.caption}</figcaption>
            {/if}
          </figure>
        {/each}
      </div>
    </section>
  {/if}

  <!-- CTA Section -->
  <section class="section cta-section">
    <div class="cta-content">
      <h2>Interested in this project?</h2>
      <p>Check out the source code, try the demo, or get in touch to collaborate.</p>
      <div class="cta-actions">
        {#if project.links.github}
          <a href={project.links.github} class="btn btn--primary" target="_blank" rel="noopener noreferrer">
            View on GitHub
          </a>
        {/if}
        <a href="/about" class="btn btn--ghost">Contact Me</a>
      </div>
    </div>
  </section>
</article>

<style>
  .project-page {
    max-width: 1100px;
    margin: 0 auto;
  }

  /* Breadcrumb */
  .breadcrumb {
    margin-bottom: 2rem;
  }

  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: var(--subtext0);
    transition: color 0.15s ease;
  }

  .back-link:hover {
    color: var(--accent);
  }

  /* Hero Section */
  .project-hero {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-bottom: 4rem;
  }

  @media (min-width: 768px) {
    .project-hero {
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
      align-items: center;
    }
  }

  .hero-meta {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;
  }
  
  .reading-time {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.8rem;
    color: var(--subtext1);
  }
  
  .reading-time svg {
    color: var(--accent);
  }

  .status {
    padding: 0.25rem 0.75rem;
    font-size: 0.7rem;
    font-weight: var(--font-weight-semibold);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-radius: var(--radius-sm);
  }

  .status--active {
    background: rgba(166, 227, 161, 0.2);
    color: var(--green);
  }

  .status--completed {
    background: rgba(137, 180, 250, 0.2);
    color: var(--blue);
  }

  .status--experimental {
    background: rgba(250, 179, 135, 0.2);
    color: var(--peach);
  }

  .status--archived {
    background: rgba(147, 153, 178, 0.2);
    color: var(--subtext0);
  }

  .year {
    font-size: 0.8rem;
    color: var(--subtext0);
  }

  .hero-content h1 {
    margin: 0 0 0.75rem;
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: var(--font-weight-bold);
    color: var(--text);
  }

  .tagline {
    margin: 0 0 1rem;
    font-size: 1.125rem;
    color: var(--accent);
    font-weight: var(--font-weight-medium);
  }

  .description {
    margin: 0 0 1.5rem;
    font-size: 1rem;
    line-height: 1.7;
    color: var(--subtext1);
  }

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .hero-image {
    border-radius: var(--radius-lg);
    overflow: hidden;
    border: 1px solid var(--surface0);
  }

  .hero-image img {
    width: 100%;
    height: auto;
    display: block;
  }

  /* Buttons */
  .btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    font-size: 0.875rem;
    font-weight: var(--font-weight-medium);
    border-radius: var(--radius-md);
    transition: all 0.15s ease;
    cursor: pointer;
    border: none;
  }

  .btn--primary {
    background: var(--accent);
    color: var(--mantle);
  }

  .btn--primary:hover {
    filter: brightness(1.1);
    transform: translateY(-1px);
  }

  .btn--secondary {
    background: var(--surface0);
    color: var(--text);
  }

  .btn--secondary:hover {
    background: var(--surface1);
  }

  .btn--ghost {
    background: transparent;
    color: var(--text);
    border: 1px solid var(--surface1);
  }

  .btn--ghost:hover {
    background: var(--surface0);
    border-color: var(--surface1);
  }

  /* Sections */
  .section {
    margin-bottom: 4rem;
  }

  .section-title {
    margin: 0 0 1.5rem;
    font-size: 1.25rem;
    font-weight: var(--font-weight-semibold);
    color: var(--text);
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .section-title::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--surface0);
  }

  /* Features */
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1.25rem;
  }

  .feature-card {
    padding: 1.5rem;
    background: var(--base);
    border: 1px solid var(--surface0);
    border-radius: var(--radius-md);
    transition: border-color 0.15s ease;
  }

  .feature-card:hover {
    border-color: var(--surface1);
  }

  .feature-icon {
    display: block;
    font-size: 1.75rem;
    margin-bottom: 0.75rem;
  }

  .feature-card h3 {
    margin: 0 0 0.5rem;
    font-size: 1rem;
    font-weight: var(--font-weight-semibold);
    color: var(--text);
  }

  .feature-card p {
    margin: 0;
    font-size: 0.875rem;
    line-height: 1.6;
    color: var(--subtext0);
  }

  /* Tech Stack */
  .stack-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .stack-badge {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
    font-weight: var(--font-weight-medium);
    background: var(--surface0);
    color: var(--text);
    border-radius: var(--radius-sm);
    border: 1px solid transparent;
    transition: border-color 0.15s ease;
  }

  .stack-badge:hover {
    border-color: var(--accent);
  }

  .stack-badge[data-category="language"] {
    border-left: 3px solid var(--blue);
  }

  .stack-badge[data-category="framework"] {
    border-left: 3px solid var(--green);
  }

  .stack-badge[data-category="tool"] {
    border-left: 3px solid var(--peach);
  }

  .stack-badge[data-category="frontend"] {
    border-left: 3px solid var(--mauve);
  }

  .stack-badge[data-category="database"] {
    border-left: 3px solid var(--yellow);
  }

  /* Screenshots */
  .screenshots-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .screenshot {
    margin: 0;
  }

  .screenshot img {
    width: 100%;
    border-radius: var(--radius-md);
    border: 1px solid var(--surface0);
  }

  .screenshot figcaption {
    margin-top: 0.75rem;
    font-size: 0.8rem;
    color: var(--subtext0);
    text-align: center;
  }

  /* CTA Section */
  .cta-section {
    text-align: center;
    padding: 3rem 2rem;
    background: var(--base);
    border: 1px solid var(--surface0);
    border-radius: var(--radius-lg);
  }

  .cta-content h2 {
    margin: 0 0 0.75rem;
    font-size: 1.5rem;
    font-weight: var(--font-weight-semibold);
    color: var(--text);
  }

  .cta-content p {
    margin: 0 0 1.5rem;
    color: var(--subtext1);
  }

  .cta-actions {
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  /* Skeleton loading states */
  .feature-card.skeleton {
    padding: 1.5rem;
    border: 1px solid var(--surface0);
    border-radius: var(--radius-lg);
    background: var(--surface0);
  }

  .stack-badge.skeleton {
    padding: 0.5rem 1rem;
    border-radius: 9999px;
    background: var(--surface0);
    border: 1px solid var(--surface1);
  }
</style>
