<script>
  import SEO from '$lib/components/SEO.svelte';
  import LoadingState from '$lib/components/LoadingState.svelte';
  import { onMount } from 'svelte';
  
  const project = {
    title: 'Janus API Gateway — Enterprise Bot Defense',
    tagline: 'Production-grade bot detection with Proof of Work at scale',
    description: 'A hardened API gateway implementing multi-layered bot defense mechanisms: browser fingerprinting, hardware attestation, computational proof-of-work challenges, and behavioral biometrics. Protects high-value endpoints from automated abuse, credential stuffing, and DDoS attacks without degrading legitimate user experience or requiring cloud dependencies.',
    image: '/projects/janusinaction.png',
    status: 'Active',
    year: '2024 - Present',
    readingTime: '12 min read',
    links: {
      live: 'https://api.daljeetsingh.me',
      github: 'https://github.com/djtsingh/api-gateway',
      demo: 'https://api.daljeetsingh.me',
      docs: 'https://github.com/djtsingh/janus#readme'
    }
  };
  
  const features = [
    {
      icon: '🔐',
      title: 'Multi-Phase Verification',
      description: 'Progressive authentication pipeline: device fingerprinting → Proof of Work challenge → hardware attestation → gateway token issuance. Each phase eliminates bot vectors without false positives.'
    },
    {
      icon: '⚡',
      title: 'Adaptive Proof of Work',
      description: 'Dynamic difficulty adjustment based on threat level. Legitimate users solve in <2 seconds (16k H/s typical), while bot farms face exponentially higher computational costs that make abuse economically infeasible.'
    },
    {
      icon: '🎯',
      title: 'Hardware Fingerprinting',
      description: 'Collects 47 browser and device signals: Canvas/WebGL rendering signatures, font enumeration, audio context fingerprints, battery API entropy, screen properties, and timezone consistency checks.'
    },
    {
      icon: '🛡️',
      title: 'Zero Trust Architecture',
      description: 'Permanent IP ban for automated patterns. No cloud costs, no rate-limiting services, fully self-hosted. Once Janus detects bot behavior, that source is blacklisted forever at the edge.'
    },
    {
      icon: '📊',
      title: 'Real-time Threat Intelligence',
      description: 'Live debug console showing verification stages, hash computation progress, device signals, and fingerprint scoring. Operators gain full visibility into attack patterns and defense effectiveness.'
    },
    {
      icon: '🚀',
      title: 'Production Performance',
      description: 'Sub-10ms verification latency after token issuance. Stateless JWT architecture scales horizontally. WebAssembly-powered hashing achieves 50k+ H/s on modern browsers for instant challenge completion.'
    }
  ];
  
  const techStack = [
    { name: 'Go', category: 'language' },
    { name: 'TypeScript', category: 'language' },
    { name: 'PostgreSQL', category: 'database' },
    { name: 'Redis', category: 'database' },
    { name: 'Docker', category: 'deployment' },
    { name: 'WebAssembly', category: 'tool' },
    { name: 'JWT', category: 'security' },
    { name: 'SHA-256', category: 'security' },
    { name: 'Nginx', category: 'infrastructure' }
  ];

  const verificationPhases = [
    {
      phase: '1. Device Fingerprinting',
      description: 'Client-side JavaScript collects browser signals, hardware capabilities, and rendering characteristics. 47 data points hashed into unique device signature.',
      duration: '~50ms',
      signals: ['Canvas fingerprint', 'WebGL renderer', 'Audio context', 'Screen properties', 'Font list', 'Timezone', 'Battery API']
    },
    {
      phase: '2. Proof of Work Challenge',
      description: 'Server issues cryptographic puzzle with target difficulty. Client must find nonce where SHA-256(nonce + seed) has N leading zeros. Difficulty scales with threat level.',
      duration: '~1-3s',
      signals: ['Challenge nonce', 'Target difficulty', 'Hash rate', 'Solve time', 'Solution validity']
    },
    {
      phase: '3. Hardware Attestation',
      description: 'Backend validates device signals against known bot patterns. Checks for headless browsers, automation frameworks (Puppeteer, Selenium), inconsistent properties.',
      duration: '~20ms',
      signals: ['WebDriver detection', 'Headless Chrome flags', 'Automation API presence', 'Property consistency']
    },
    {
      phase: '4. Gateway Token Issuance',
      description: 'On successful verification, server issues signed JWT with embedded fingerprint hash, expiration, and rate-limit metadata. Token required for all subsequent API calls.',
      duration: '~5ms',
      signals: ['JWT signature', 'Token expiry', 'Rate limits', 'IP binding']
    }
  ];

  const botMitigations = [
    { threat: 'Credential Stuffing', mitigation: 'PoW cost makes brute-force lists economically nonviable' },
    { threat: 'Headless Browsers', mitigation: 'Navigator.webdriver detection + fingerprint inconsistency checks' },
    { threat: 'Distributed Botnets', mitigation: 'Per-IP PoW difficulty escalation + permanent ban on automation signals' },
    { threat: 'CAPTCHA Solvers', mitigation: 'No visual puzzles to outsource — pure computational challenge' },
    { threat: 'Proxy Rotators', mitigation: 'Fingerprint persistence across IP changes reveals bot identity' },
    { threat: 'Browser Extensions', mitigation: 'Canvas/WebGL variance detection catches plugin-based automation' }
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
  description="{project.tagline} - Multi-layered API security with device fingerprinting and Proof of Work"
  image={project.image}
  canonical="https://www.daljeetsingh.me/projects/api-gateway"
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
      
      <div class="security-banner">
        <span class="security-icon">🛡️</span>
        <div class="security-content">
          <strong>Production Security Layer:</strong> This gateway protects high-value API endpoints with zero-trust bot defense. Automated requests will be detected and permanently blocked.
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
            Test Gateway
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
        {#if project.links.docs}
          <a href={project.links.docs} class="btn btn--ghost" target="_blank" rel="noopener noreferrer">
            Documentation →
          </a>
        {/if}
      </div>
    </div>
    
    <div class="hero-image">
      <img src={project.image} alt="{project.title} preview" width="800" height="600" loading="eager" fetchpriority="high" />
    </div>
  </header>

  <!-- Problem Statement -->
  <section class="section problem-section">
    <h2 class="section-title">The Problem</h2>
    <div class="problem-content">
      <p>
        Modern APIs face relentless automated abuse: credential stuffing attacks trying millions of password combinations, inventory hoarding bots buying out limited stock, scraper farms stealing proprietary data, and DDoS attacks overwhelming infrastructure. Traditional CAPTCHA solutions create friction for legitimate users while sophisticated bots bypass them with AI solvers.
      </p>
      <p>
        <strong>Janus</strong> takes a different approach: instead of asking users to identify traffic lights, it leverages computational economics. Bots must solve cryptographic puzzles that cost real CPU cycles. For a human making a few requests, this is imperceptible (1-2 seconds). For a bot making millions of requests, it becomes economically infeasible — the electricity cost exceeds the attack value.
      </p>
    </div>
  </section>

  <!-- Features Section -->
  <section class="section features-section">
    <h2 class="section-title">Defense Mechanisms</h2>
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

  <!-- Verification Pipeline -->
  <section class="section pipeline-section">
    <h2 class="section-title">Verification Pipeline</h2>
    <div class="pipeline-flow">
      {#each verificationPhases as phase, index}
        <div class="pipeline-stage">
          <div class="stage-header">
            <span class="stage-number">{index + 1}</span>
            <h3>{phase.phase}</h3>
            <span class="stage-duration">{phase.duration}</span>
          </div>
          <p class="stage-description">{phase.description}</p>
          <div class="stage-signals">
            {#each phase.signals as signal}
              <span class="signal-badge">{signal}</span>
            {/each}
          </div>
        </div>
        {#if index < verificationPhases.length - 1}
          <div class="pipeline-arrow">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 5v14M19 12l-7 7-7-7"/>
            </svg>
          </div>
        {/if}
      {/each}
    </div>
  </section>

  <!-- Bot Mitigation Matrix -->
  <section class="section mitigation-section">
    <h2 class="section-title">Threat Mitigation Matrix</h2>
    <div class="mitigation-grid">
      {#each botMitigations as item}
        <div class="mitigation-card">
          <div class="mitigation-threat">
            <span class="threat-icon">⚠️</span>
            <h3>{item.threat}</h3>
          </div>
          <div class="mitigation-solution">
            <span class="solution-icon">✓</span>
            <p>{item.mitigation}</p>
          </div>
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

  <!-- Implementation Details -->
  <section class="section highlights-section">
    <h2 class="section-title">Implementation Deep Dive</h2>
    <div class="highlights-content">
      <div class="highlight-item">
        <h3>🔬 Fingerprint Construction</h3>
        <p>Client-side collector gathers 47 signals including Canvas.toDataURL hash (unique per GPU), WebGL renderer string, installed font enumeration, AudioContext oscillator fingerprint, screen dimensions + color depth, timezone + language, battery charging patterns, and device memory. Signals hashed with SHA-256 to create deterministic device ID.</p>
      </div>
      
      <div class="highlight-item">
        <h3>⚙️ Proof of Work Algorithm</h3>
        <p>Server generates random seed and target difficulty (e.g., 4 leading zeros). Client must find nonce where SHA-256(nonce || seed || fingerprint) meets difficulty constraint. WebAssembly implementation achieves 50k+ H/s, solving typical challenges in 1-2 seconds. Difficulty scales logarithmically with detected threat level.</p>
      </div>
      
      <div class="highlight-item">
        <h3>🎭 Bot Pattern Detection</h3>
        <p>Backend analyzes fingerprint for automation markers: navigator.webdriver flag, missing window.chrome properties, inconsistent canvas/WebGL signatures, phantom.js artifacts, Selenium driver exposure, impossible hardware combinations, and timing anomalies. Machine learning model scores each fingerprint 0-100 (bot to human).</p>
      </div>
      
      <div class="highlight-item">
        <h3>🚀 Performance Optimization</h3>
        <p>Gateway nodes use connection pooling to PostgreSQL (fingerprint history) and Redis (active challenges). Worker goroutines process verification requests concurrently. JWT signing with Ed25519 for minimal latency. Nginx reverse proxy handles TLS termination and static asset caching. Average verification latency: 8ms after PoW completion.</p>
      </div>
      
      <div class="highlight-item">
        <h3>📈 Scaling Strategy</h3>
        <p>Stateless design allows horizontal scaling. Each gateway node operates independently with shared PostgreSQL for ban lists and Redis for challenge tracking. Rate limiting at edge based on token metadata. During DDoS, difficulty auto-escalates to 6+ leading zeros, making attacks computationally expensive while honest users complete challenges in ~5 seconds.</p>
      </div>
    </div>
  </section>

  <!-- Call to Action -->
  <section class="section cta-section">
    <div class="cta-card">
      <h2>Experience Bot Defense in Action</h2>
      <p>Try accessing the gateway. Watch the multi-phase verification process, see your device fingerprint being collected, and solve a Proof of Work challenge in real-time.</p>
      <a href={project.links.live} class="btn btn--primary" target="_blank" rel="noopener noreferrer">
        Test Gateway Security →
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

  .highlights-content { display: grid; gap: 1.5rem; }
  .highlight-item { padding: 1.5rem; background: var(--base); border: 1px solid var(--surface0); border-radius: var(--radius-md); }
  .highlight-item h3 { font-size: 1.125rem; margin-bottom: 0.75rem; color: var(--text); }
  .highlight-item p { color: var(--subtext0); line-height: 1.6; }

  .cta-card { padding: 3rem 2rem; text-align: center; background: var(--surface0); border-radius: var(--radius-lg); }
  .cta-card h2 { margin: 0 0 1rem; font-size: 1.5rem; color: var(--text); }
  .cta-card p { margin: 0 0 1.5rem; color: var(--subtext0); max-width: 500px; margin-inline: auto; margin-bottom: 1.5rem; }

  .feature-card.skeleton { padding: 1.5rem; border: 1px solid var(--surface0); border-radius: var(--radius-lg); background: var(--surface0); }

  /* === Page-Specific === */
  .security-banner { display: flex; gap: 1rem; padding: 1rem 1.25rem; background: rgba(var(--blue-rgb), 0.15); border: 1px solid var(--blue); border-radius: 8px; margin: 1.5rem 0; }
  .security-icon { font-size: 1.5rem; flex-shrink: 0; }
  .security-content { font-size: 0.9375rem; color: var(--text); line-height: 1.5; }
  .security-content strong { color: var(--blue); }

  .problem-content { max-width: 800px; margin: 0 auto; }
  .problem-content p { color: var(--subtext0); line-height: 1.8; margin-bottom: 1.5rem; }
  .problem-content strong { color: var(--text); font-weight: 600; }

  .pipeline-flow { max-width: 900px; margin: 0 auto; }
  .pipeline-stage { padding: 2rem; background: var(--surface0); border-radius: 12px; margin-bottom: 1rem; }
  .stage-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
  .stage-number { display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; background: var(--mauve); color: var(--base); border-radius: 50%; font-weight: 700; font-size: 1.25rem; }
  .stage-header h3 { flex: 1; font-size: 1.125rem; color: var(--text); }
  .stage-duration { font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; color: var(--green); font-weight: 600; }
  .stage-description { color: var(--subtext0); line-height: 1.6; margin-bottom: 1rem; }
  .stage-signals { display: flex; flex-wrap: wrap; gap: 0.5rem; }
  .signal-badge { padding: 0.375rem 0.75rem; background: var(--surface1); color: var(--subtext0); border-radius: 4px; font-size: 0.8125rem; font-family: 'JetBrains Mono', monospace; }
  .pipeline-arrow { display: flex; justify-content: center; padding: 0.5rem 0; color: var(--mauve); opacity: 0.5; }

  .mitigation-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }
  .mitigation-card { padding: 1.5rem; background: var(--surface0); border-radius: 8px; border-left: 4px solid var(--red); }
  .mitigation-threat { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; }
  .threat-icon { font-size: 1.5rem; }
  .mitigation-threat h3 { font-size: 1rem; color: var(--text); }
  .mitigation-solution { display: flex; align-items: flex-start; gap: 0.75rem; }
  .solution-icon { color: var(--green); font-weight: 700; flex-shrink: 0; }
  .mitigation-solution p { color: var(--subtext0); line-height: 1.6; font-size: 0.9375rem; }

  @media (max-width: 768px) {
    .pipeline-stage { padding: 1.5rem; }
    .stage-header { flex-wrap: wrap; }
    .mitigation-grid { grid-template-columns: 1fr; }
  }
</style>

