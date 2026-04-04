<script>
  import SEO from '$lib/components/SEO.svelte';
  import LoadingState from '$lib/components/LoadingState.svelte';
  import { onMount } from 'svelte';
  
  const project = {
    title: 'Terminal — Interactive Web Shell',
    tagline: 'A creative terminal emulator showcasing frontend craftsmanship',
    description: 'An immersive browser-based terminal experience that transforms traditional portfolio navigation into an interactive command-line journey. Built with vanilla JavaScript and modern CSS, it demonstrates advanced DOM manipulation, real-time command parsing, and stateful session management — all within the constraints of pure frontend engineering.',
    image: '/projects/terminal.daljeetsingh.me.png',
    status: 'Active',
    year: '2024 - Present',
    readingTime: '6 min read',
    links: {
      live: 'https://terminal.daljeetsingh.me',
      github: 'https://github.com/djtsingh/terminal',
      demo: 'https://terminal.daljeetsingh.me'
    }
  };
  
  const features = [
    {
      icon: '⌨️',
      title: 'Real Command Parsing',
      description: 'Implements authentic terminal command syntax with argument parsing, flags, and piping — exec, cat, cd, clear, banner, and custom commands for portfolio navigation.'
    },
    {
      icon: '🎨',
      title: 'Catppuccin Aesthetics',
      description: 'Dark-mode optimized color palette with syntax highlighting, smooth animations, and pixel-perfect typography using JetBrains Mono for that authentic terminal feel.'
    },
    {
      icon: '📂',
      title: 'Virtual File System',
      description: 'Simulates directory structure with persistent state, allowing users to navigate, list files, and read content as if interacting with a real unix-like system.'
    },
    {
      icon: '⚡',
      title: 'Zero-Dependency Core',
      description: 'Built with vanilla JavaScript — no frameworks, no build tools for the core. Pure DOM manipulation showcasing fundamental web platform capabilities at their finest.'
    },
    {
      icon: '🔄',
      title: 'Session Persistence',
      description: 'Command history and directory state preserved across sessions using localStorage, creating a continuous experience across visits.'
    },
    {
      icon: '📱',
      title: 'Responsive Design',
      description: 'Fully functional on mobile with virtual keyboard support, touch gestures for history navigation, and adaptive layout for all screen sizes.'
    }
  ];
  
  const techStack = [
    { name: 'JavaScript', category: 'language' },
    { name: 'HTML5', category: 'frontend' },
    { name: 'CSS3', category: 'frontend' },
    { name: 'localStorage API', category: 'tool' },
    { name: 'DOM APIs', category: 'tool' },
    { name: 'Regex', category: 'tool' }
  ];
  
  const commands = [
    { cmd: 'help', desc: 'Display available commands and usage' },
    { cmd: 'banner', desc: 'Show ASCII art banner with project info' },
    { cmd: 'cat <file>', desc: 'Display contents of a file' },
    { cmd: 'cd <dir>', desc: 'Change current directory' },
    { cmd: 'ls', desc: 'List files in current directory' },
    { cmd: 'clear', desc: 'Clear terminal screen' },
    { cmd: 'portfolio', desc: 'Navigate to main portfolio site' },
    { cmd: 'sys·report', desc: 'Display system information and stats' }
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
  description="{project.tagline} - A creative terminal emulator for portfolio navigation"
  image={project.image}
  canonical="https://www.daljeetsingh.me/projects/terminal"
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
        {#if project.links.live}
          <a href={project.links.live} class="btn btn--primary" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" x2="21" y1="14" y2="3"/>
            </svg>
            Try Terminal
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

  <!-- Features Section -->
  <section class="section features-section">
    <h2 class="section-title">Core Features</h2>
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

  <!-- Commands Reference -->
  <section class="section commands-section">
    <h2 class="section-title">Available Commands</h2>
    <div class="commands-table">
      <div class="terminal-preview">
        <div class="terminal-header">
          <div class="terminal-dots">
            <span class="dot dot-red"></span>
            <span class="dot dot-yellow"></span>
            <span class="dot dot-green"></span>
          </div>
          <div class="terminal-title">daljeet@terminal.daljeetsingh.me</div>
        </div>
        <div class="terminal-content">
          {#each commands as { cmd, desc }}
            <div class="command-row">
              <code class="command-name">{cmd}</code>
              <span class="command-desc">{desc}</span>
            </div>
          {/each}
        </div>
      </div>
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

  <!-- Implementation Highlights -->
  <section class="section highlights-section">
    <h2 class="section-title">Technical Highlights</h2>
    <div class="highlights-content">
      <div class="highlight-item">
        <h3>🏗️ Architecture</h3>
        <p>Modular command system with plugin-style extensibility. Each command is encapsulated with its own parsing logic, execution context, and error handling — making it trivial to add new functionality without touching core terminal logic.</p>
      </div>
      
      <div class="highlight-item">
        <h3>🎯 Command Parser</h3>
        <p>Custom lexer and parser that handles quoted arguments, escape sequences, flags, and command chaining. Supports tab completion, history navigation (↑/↓), and intelligent error messages for invalid syntax.</p>
      </div>
      
      <div class="highlight-item">
        <h3>💾 State Management</h3>
        <p>Implements a virtual file system with hierarchical directory structure stored in memory. Session state persists across page reloads using localStorage, including command history, current directory, and user preferences.</p>
      </div>
      
      <div class="highlight-item">
        <h3>🎨 Visual Polish</h3>
        <p>60fps smooth scrolling, cursor blinking animation, command output streaming simulation, and subtle hover effects. Catppuccin color palette provides excellent readability in low-light conditions.</p>
      </div>
    </div>
  </section>

  <!-- Call to Action -->
  <section class="section cta-section">
    <div class="cta-card">
      <h2>Ready to Explore?</h2>
      <p>Experience the interactive terminal firsthand. Try commands, navigate the file system, and discover hidden easter eggs.</p>
      <a href={project.links.live} class="btn btn--primary" target="_blank" rel="noopener noreferrer">
        Launch Terminal →
      </a>
    </div>
  </section>
</article>

<style>
  /* === Base Layout === */
  .project-page { max-width: 900px; margin: 0 auto; padding: 2rem 1.5rem 4rem; }
  .breadcrumb { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 2rem; font-size: 0.875rem; }
  .breadcrumb a { color: var(--subtext0); transition: color 0.15s ease; }
  .breadcrumb a:hover { color: var(--accent); }

  .hero { margin-bottom: 3rem; }
  .hero-meta { display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem; margin-bottom: 1rem; }
  .status { display: inline-flex; align-items: center; gap: 0.375rem; padding: 0.25rem 0.75rem; font-size: 0.75rem; font-weight: 600; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.05em; }
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
  .commands-section {
    background: var(--surface0);
    border-radius: 12px;
    padding: 2rem;
  }

  .terminal-preview {
    background: var(--base);
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }

  .terminal-header {
    background: var(--surface1);
    padding: 0.75rem 1rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .terminal-dots {
    display: flex;
    gap: 0.5rem;
  }

  .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }

  .dot-red { background: var(--red); }
  .dot-yellow { background: var(--yellow); }
  .dot-green { background: var(--green); }

  .terminal-title {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.875rem;
    color: var(--subtext0);
  }

  .terminal-content {
    padding: 1.5rem;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.875rem;
  }

  .command-row {
    display: flex;
    gap: 1.5rem;
    padding: 0.5rem 0;
    border-bottom: 1px solid var(--surface0);
  }

  .command-row:last-child {
    border-bottom: none;
  }

  .command-name {
    color: var(--mauve);
    font-weight: 600;
    min-width: 150px;
    flex-shrink: 0;
  }

  .command-desc {
    color: var(--subtext0);
  }

  @media (max-width: 768px) {
    .command-row {
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .command-name {
      min-width: auto;
    }
  }
</style>
