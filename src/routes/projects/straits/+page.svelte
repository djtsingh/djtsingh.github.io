<script>
  import SEO from '$lib/components/SEO.svelte';
  import LoadingState from '$lib/components/LoadingState.svelte';
  import { onMount } from 'svelte';
  
  const project = {
    title: 'Iron Dome — Strait of Hormuz Crisis Monitor',
    tagline: 'Real-time geopolitical intelligence dashboard for maritime chokepoint analysis',
    description: 'A sophisticated crisis monitoring system tracking the Strait of Hormuz — the world\'s most critical oil transit route. Aggregates live commodity prices, maritime incident reports, ship tracking data, and diplomatic passage status to provide actionable intelligence during geopolitical escalations. Five operational modules processing petabytes of data into digestible threat assessments.',
    image: '/projects/straits.daljeetsingh.me.png',
    status: 'Active',
    year: '2026',
    readingTime: '10 min read',
    links: {
      live: 'https://straits.daljeetsingh.me',
      github: 'https://github.com/djtsingh/straits',
      demo: 'https://straits.daljeetsingh.me'
    }
  };
  
  const features = [
    {
      icon: '📈',
      title: 'Live Commodity Pricing',
      description: 'Real-time Brent Crude oil prices via Alpha Vantage API with historical comparison, percentage change tracking, and anomaly detection for sudden price spikes indicating market panic.'
    },
    {
      icon: '🚢',
      title: 'Maritime Incident Feed',
      description: 'Aggregates UKMTO (United Kingdom Maritime Trade Operations) advisories, ship attack logs, crew casualties, and AIS transponder data to map conflict escalation patterns.'
    },
    {
      icon: '🌍',
      title: 'Geopolitical Analysis',
      description: 'Tracks nation-by-nation passage clearance status, diplomatic negotiations, and selective targeting patterns — revealing which countries can safely transit and who faces interdiction.'
    },
    {
      icon: '💰',
      title: 'Economic Impact Calculator',
      description: 'Real-time running tally of economic losses using World Bank methodology. Estimates cumulative cost of strait closure at ~$3.2B per day based on disrupted trade flows and war risk premiums.'
    },
    {
      icon: '📊',
      title: 'Data Dependency Mapping',
      description: 'Interactive visualizations showing LNG import dependencies — South Korea (58%), Japan (52%), China (45%) — highlighting which economies are most vulnerable to prolonged closures.'
    },
    {
      icon: '⚠️',
      title: 'Threat Level Assessment',
      description: 'Synthesizes multiple data streams into actionable threat indicators: traffic drop percentage, ships stranded, war risk premium evolution, and days since first attack.'
    }
  ];
  
  const techStack = [
    { name: 'Next.js', category: 'framework' },
    { name: 'TypeScript', category: 'language' },
    { name: 'React', category: 'frontend' },
    { name: 'Tailwind CSS', category: 'frontend' },
    { name: 'Alpha Vantage API', category: 'integration' },
    { name: 'UKMTO Feed', category: 'integration' },
    { name: 'MarineTraffic', category: 'integration' },
    { name: 'Vercel', category: 'deployment' },
    { name: 'Recharts', category: 'tool' },
    { name: 'date-fns', category: 'tool' }
  ];

  const dataSources = [
    { source: 'Alpha Vantage', type: 'Commodity Prices', update: 'Real-time' },
    { source: 'UKMTO', type: 'Maritime Incidents', update: 'Live advisories' },
    { source: 'MarineTraffic', type: 'Ship Tracking', update: 'AIS transponder' },
    { source: 'Kpler', type: 'Trade Flows', update: 'Daily estimates' },
    { source: 'Xeneta', type: 'Freight Rates', update: 'Market data' },
    { source: 'EIA', type: 'Energy Statistics', update: '2025 baseline' }
  ];

  const modules = [
    {
      name: 'Threat Dashboard',
      description: 'Primary interface showing critical metrics: oil price, ships attacked, traffic drop, war risk premium, and cumulative economic cost with live tickers for real-time updates.'
    },
    {
      name: 'Incident Log',
      description: 'Chronological feed of maritime attacks, warnings, clearances, and escalations. Each entry timestamped with vessel details, flag state, and outcome.'
    },
    {
      name: 'Nation Status Matrix',
      description: 'Clearance status table showing which countries have diplomatic agreements for safe passage (China, India) vs. those facing active interdiction (USA, UK, Israel).'
    },
    {
      name: 'Dependency Analyzer',
      description: 'Bar charts and heatmaps visualizing LNG import dependencies by country, revealing economic vulnerability exposure for extended crisis scenarios.'
    },
    {
      name: 'Economic Impact Tracker',
      description: 'Running calculation of closure costs using trade volume data, war risk premiums, and alternative routing distances (Cape of Good Hope adds 3,000+ nautical miles).'
    }
  ];

  let loading = true;
  
  onMount(() => {
    setTimeout(() => {
      loading = false;
    }, 100);
  });
</script>

<SEO 
  title="{project.title} - DJ"
  description="{project.tagline} - Real-time geopolitical crisis monitoring for maritime chokepoints"
  image={project.image}
  canonical="https://www.daljeetsingh.me/projects/straits"
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
      
      <div class="alert-box">
        <span class="alert-icon">⚠️</span>
        <div class="alert-content">
          <strong>Crisis Simulation:</strong> This dashboard presents a hypothetical 2026 conflict scenario for demonstration purposes. Data sources and methodologies are production-ready, but current metrics are seeded for educational showcase.
        </div>
      </div>
      
      <div class="hero-actions">
        {#if project.links.live}
          <a href={project.links.live} class="btn btn--primary" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" x2="21" y1="14" y2="3"/>
            </svg>
            View Live Dashboard
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
      </div>
    </div>
    
    <div class="hero-image">
      <img src={project.image} alt="{project.title} preview" width="800" height="600" loading="eager" fetchpriority="high" />
    </div>
  </header>

  <!-- Context Section -->
  <section class="section context-section">
    <h2 class="section-title">Strategic Context</h2>
    <div class="context-content">
      <p>
        The Strait of Hormuz is the world's most critical oil chokepoint — a 21-mile-wide passage between Iran and Oman through which <strong>27% of global crude oil</strong> and <strong>18% of global LNG</strong> transit daily. Any disruption cascades into immediate price shocks, supply chain paralysis, and geopolitical escalation.
      </p>
      <p>
        <strong>Iron Dome</strong> provides the intelligence layer needed during crisis scenarios. While traditional Iron Dome systems intercept physical missiles, this digital counterpart intercepts information chaos — synthesizing disparate data streams into coherent situational awareness for traders, policymakers, and logistics operators making high-stakes decisions under uncertainty.
      </p>
      <div class="stat-grid">
        <div class="stat-item">
          <span class="stat-value">27%</span>
          <span class="stat-label">Global crude oil</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">18%</span>
          <span class="stat-label">Global LNG</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">21 miles</span>
          <span class="stat-label">Strait width</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">$3.2B/day</span>
          <span class="stat-label">Closure cost estimate</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Features Section -->
  <section class="section features-section">
    <h2 class="section-title">Intelligence Capabilities</h2>
    <div class="features-grid">
      {#if loading}
        {#each Array(6) as _}
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

  <!-- Operational Modules -->
  <section class="section modules-section">
    <h2 class="section-title">Five Operational Modules</h2>
    <div class="modules-list">
      {#each modules as module, index}
        <div class="module-item">
          <div class="module-header">
            <span class="module-number">{String(index + 1).padStart(2, '0')}</span>
            <h3>{module.name}</h3>
          </div>
          <p>{module.description}</p>
        </div>
      {/each}
    </div>
  </section>

  <!-- Data Sources -->
  <section class="section data-section">
    <h2 class="section-title">Data Integration</h2>
    <div class="data-table">
      <div class="data-row data-header">
        <span>Source</span>
        <span>Data Type</span>
        <span>Update Frequency</span>
      </div>
      {#each dataSources as source}
        <div class="data-row">
          <span class="data-source">{source.source}</span>
          <span class="data-type">{source.type}</span>
          <span class="data-update">{source.update}</span>
        </div>
      {/each}
    </div>
  </section>

  <!-- Tech Stack -->
  <section class="section tech-section">
    <h2 class="section-title">Technology Stack</h2>
    <div class="tech-grid">
      {#each techStack as tech}
        <span class="tech-badge tech-badge--{tech.category}">{tech.name}</span>
      {/each}
    </div>
  </section>

  <!-- Implementation Insights -->
  <section class="section highlights-section">
    <h2 class="section-title">Technical Architecture</h2>
    <div class="highlights-content">
      <div class="highlight-item">
        <h3>⚡ Real-time Data Pipeline</h3>
        <p>Server-side API routes fetch and transform data from multiple external sources. Incremental Static Regeneration (ISR) ensures dashboard freshness while maintaining sub-second page loads. Critical metrics update every 60 seconds via client-side polling.</p>
      </div>
      
      <div class="highlight-item">
        <h3>🧮 Economic Modeling</h3>
        <p>Cumulative cost calculation uses World Bank methodology: daily trade volume × commodity prices × war risk premium multiplier × closure duration. Alternative routing distances computed using Haversine formula for Cape of Good Hope reroutes.</p>
      </div>
      
      <div class="highlight-item">
        <h3>📡 Multi-source Aggregation</h3>
        <p>Fault-tolerant data fetching with exponential backoff and fallback strategies. Each data source has independent error boundaries — if UKMTO is unavailable, the dashboard continues operating with cached incident logs and degraded-state indicators.</p>
      </div>
      
      <div class="highlight-item">
        <h3>🎨 Crisis-optimized UX</h3>
        <p>High-contrast color coding for threat levels. Red-yellow-green status indicators. Prominent metric deltas (↑↓) for at-a-glance change detection. Designed for rapid information consumption under high-stress decision-making scenarios.</p>
      </div>
    </div>
  </section>

  <!-- Call to Action -->
  <section class="section cta-section">
    <div class="cta-card">
      <h2>Explore the Intelligence Dashboard</h2>
      <p>See real-time crisis monitoring in action. Navigate threat levels, incident logs, and economic impact assessments.</p>
      <a href={project.links.live} class="btn btn--primary" target="_blank" rel="noopener noreferrer">
        Launch Dashboard →
      </a>
    </div>
  </section>
</article>

<style>
  /* === Base Layout === */
  .project-page { max-width: 1100px; margin: 0 auto; }
  .breadcrumb { margin-bottom: 2rem; }
  .back-link { display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; color: var(--subtext0); transition: color 0.15s ease; }
  .back-link:hover { color: var(--accent); }

  .project-hero { display: grid; grid-template-columns: 1fr; gap: 2rem; margin-bottom: 4rem; }
  @media (min-width: 768px) { .project-hero { grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; } }

  .hero-meta { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; flex-wrap: wrap; }
  .reading-time { display: flex; align-items: center; gap: 0.35rem; font-size: 0.8rem; color: var(--subtext1); }
  .reading-time svg { color: var(--accent); }

  .status { padding: 0.25rem 0.75rem; font-size: 0.7rem; font-weight: var(--font-weight-semibold); text-transform: uppercase; letter-spacing: 0.05em; border-radius: var(--radius-sm); }
  .status--active { background: rgba(var(--green-rgb), 0.2); color: var(--green); }
  .status--completed { background: rgba(var(--blue-rgb), 0.2); color: var(--blue); }
  .status--experimental { background: rgba(250, 179, 135, 0.2); color: var(--peach); }
  .status--archived { background: rgba(var(--surface1-rgb), 0.2); color: var(--subtext0); }

  .year { font-size: 0.8rem; color: var(--subtext0); }
  .hero-content h1 { margin: 0 0 0.75rem; font-size: clamp(2rem, 5vw, 3rem); font-weight: 700; color: var(--text); }
  .tagline { margin: 0 0 1rem; font-size: 1.125rem; color: var(--accent); font-weight: 500; }
  .description { margin: 0 0 1.5rem; font-size: 1rem; line-height: 1.7; color: var(--subtext1); }
  .hero-actions { display: flex; flex-wrap: wrap; gap: 0.75rem; }
  .hero-image { border-radius: var(--radius-lg); overflow: hidden; border: 1px solid var(--surface0); }
  .hero-image img { width: 100%; height: auto; display: block; }

  .btn { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.25rem; font-size: 0.875rem; font-weight: 500; border-radius: var(--radius-md); transition: all 0.15s ease; cursor: pointer; border: none; }
  .btn--primary { background: var(--accent); color: var(--mantle); }
  .btn--primary:hover { filter: brightness(1.1); transform: translateY(-1px); }
  .btn--secondary { background: var(--surface0); color: var(--text); }
  .btn--secondary:hover { background: var(--surface1); }
  .btn--ghost { background: transparent; color: var(--text); border: 1px solid var(--surface1); }
  .btn--ghost:hover { background: var(--surface0); border-color: var(--surface1); }

  .section { margin-bottom: 4rem; }
  .section-title { margin: 0 0 1.5rem; font-size: 1.25rem; font-weight: 600; color: var(--text); display: flex; align-items: center; gap: 0.75rem; }
  .section-title::after { content: ''; flex: 1; height: 1px; background: var(--surface0); }

  .features-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 1.25rem; }
  .feature-card { padding: 1.5rem; background: var(--base); border: 1px solid var(--surface0); border-radius: var(--radius-md); transition: border-color 0.15s ease; }
  .feature-card:hover { border-color: var(--surface1); }
  .feature-icon { display: block; font-size: 1.75rem; margin-bottom: 0.75rem; }
  .feature-card h3 { margin: 0 0 0.5rem; font-size: 1rem; font-weight: 600; color: var(--text); }
  .feature-card p { margin: 0; font-size: 0.875rem; line-height: 1.6; color: var(--subtext0); }

  .tech-grid { display: flex; flex-wrap: wrap; gap: 0.75rem; }
  .tech-badge { padding: 0.5rem 1rem; font-size: 0.8rem; font-weight: 500; background: var(--surface0); color: var(--text); border-radius: var(--radius-sm); border: 1px solid transparent; transition: border-color 0.15s ease; }
  .tech-badge:hover { border-color: var(--accent); }
  .tech-badge--language { border-left: 3px solid var(--blue); }
  .tech-badge--framework { border-left: 3px solid var(--green); }
  .tech-badge--tool { border-left: 3px solid var(--peach); }
  .tech-badge--frontend { border-left: 3px solid var(--mauve); }
  .tech-badge--database { border-left: 3px solid var(--yellow); }
  .tech-badge--security { border-left: 3px solid var(--red); }
  .tech-badge--infrastructure { border-left: 3px solid var(--teal); }
  .tech-badge--deployment { border-left: 3px solid var(--green); }
  .tech-badge--data { border-left: 3px solid var(--sapphire); }
  .tech-badge--api { border-left: 3px solid var(--sky); }

  .highlights-content { display: grid; gap: 1.5rem; }
  .highlight-item { padding: 1.5rem; background: var(--base); border: 1px solid var(--surface0); border-radius: var(--radius-md); }
  .highlight-item h3 { font-size: 1.125rem; margin-bottom: 0.75rem; color: var(--text); }
  .highlight-item p { color: var(--subtext0); line-height: 1.6; }

  .cta-card { padding: 3rem 2rem; text-align: center; background: var(--surface0); border-radius: var(--radius-lg); }
  .cta-card h2 { margin: 0 0 1rem; font-size: 1.5rem; color: var(--text); }
  .cta-card p { margin: 0 0 1.5rem; color: var(--subtext0); max-width: 500px; margin-inline: auto; margin-bottom: 1.5rem; }

  .feature-card.skeleton { padding: 1.5rem; border: 1px solid var(--surface0); border-radius: var(--radius-lg); background: var(--surface0); }

  /* === Page-Specific === */
  .alert-box {
    display: flex;
    gap: 1rem;
    padding: 1rem 1.25rem;
    background: rgba(var(--yellow-rgb), 0.15);
    border: 1px solid var(--yellow);
    border-radius: 8px;
    margin: 1.5rem 0;
  }

  .alert-icon {
    font-size: 1.5rem;
    flex-shrink: 0;
  }

  .alert-content {
    font-size: 0.9375rem;
    color: var(--text);
    line-height: 1.5;
  }

  .alert-content strong {
    color: var(--yellow);
  }

  .context-content {
    max-width: 800px;
    margin: 0 auto;
  }

  .context-content p {
    color: var(--subtext0);
    line-height: 1.8;
    margin-bottom: 1.5rem;
  }

  .context-content strong {
    color: var(--text);
    font-weight: 600;
  }

  .stat-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
    padding: 2rem;
    background: var(--surface0);
    border-radius: 12px;
  }

  .stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .stat-value {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--mauve);
    margin-bottom: 0.5rem;
    font-family: 'JetBrains Mono', monospace;
  }

  .stat-label {
    font-size: 0.875rem;
    color: var(--subtext0);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .modules-list {
    display: grid;
    gap: 1.5rem;
  }

  .module-item {
    padding: 1.5rem;
    background: var(--surface0);
    border-radius: 8px;
    border-left: 4px solid var(--mauve);
  }

  .module-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.75rem;
  }

  .module-number {
    font-family: 'JetBrains Mono', monospace;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--mauve);
    opacity: 0.5;
  }

  .module-item h3 {
    font-size: 1.125rem;
    color: var(--text);
  }

  .module-item p {
    color: var(--subtext0);
    line-height: 1.6;
  }

  .data-table {
    background: var(--surface0);
    border-radius: 8px;
    overflow: hidden;
  }

  .data-row {
    display: grid;
    grid-template-columns: 1fr 1.2fr 1fr;
    gap: 1rem;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--surface1);
  }

  .data-row:last-child {
    border-bottom: none;
  }

  .data-header {
    background: var(--surface1);
    font-weight: 600;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text);
  }

  .data-source {
    font-weight: 600;
    color: var(--mauve);
  }

  .data-type {
    color: var(--subtext0);
  }

  .data-update {
    color: var(--green);
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.875rem;
  }

  @media (max-width: 768px) {
    .data-row {
      grid-template-columns: 1fr;
      gap: 0.5rem;
    }
    
    .stat-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
