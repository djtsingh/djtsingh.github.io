<script>
  import SEO from '$lib/components/SEO.svelte';
</script>

<SEO 
  title="Djx | Projects | Daljeet Singh Lotey"
  description="A modern, performant portfolio website built with SvelteKit, featuring custom theming, responsive design, and optimized user experience."
  image="/assets/djx-cover.jpg"
  canonical="https://djtsingh.github.io/projects/portfolio"
  type="article"
/>

<article class="project-page">
  <!-- Breadcrumb -->
  <nav class="breadcrumb">
    <a href="/projects" class="back-link">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m15 18-6-6 6-6"/>
      </svg>
      Projects
    </a>
  </nav>

  <!-- Hero Section -->
  <header class="hero">
    <div class="status-bar">
      <span class="status status--active">Active</span>
      <span class="year">2025 - Present</span>
    </div>

    <div class="hero-content">
      <h1>Djx</h1>
      <p class="tagline">A modern personal portfolio built from the ground up</p>
      <p class="description">
        A meticulously crafted portfolio website showcasing the intersection of design and engineering. Built with SvelteKit for optimal performance, featuring custom theming system, responsive layouts, and attention to detail in every interaction.
      </p>

      <div class="action-bar">
        <a href="https://djtsingh.github.io" target="_blank" rel="noopener noreferrer" class="btn btn--primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
          View Live Site
        </a>
        <a href="https://github.com/djtsingh/djx" target="_blank" rel="noopener noreferrer" class="btn btn--secondary">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
          </svg>
          Source Code
        </a>
      </div>
    </div>
  </header>

  <!-- Overview -->
  <section class="section">
    <h2 class="section-title">Overview</h2>
    <div class="content-grid">
      <div class="content-block">
        <h3>The Challenge</h3>
        <p>
          Creating a portfolio that balances aesthetic appeal with technical excellence while maintaining fast load times, accessibility, and a seamless user experience across all devices. The site needed to reflect professional identity while showcasing technical capabilities.
        </p>
      </div>
      <div class="content-block">
        <h3>The Solution</h3>
        <p>
          Built a static-first website using SvelteKit with custom design system, implementing advanced features like dynamic theming (4 color schemes with 14 accent colors), optimized page transitions, and performance-first architecture achieving exceptional Lighthouse scores.
        </p>
      </div>
    </div>
  </section>

  <!-- Key Features -->
  <section class="section">
    <h2 class="section-title">Key Features</h2>
    <div class="features-grid">
      <div class="feature-card">
        <div class="feature-icon">🎨</div>
        <h3>Custom Theming System</h3>
        <p>Dynamic theme switcher with 4 base themes (Mocha, Latte, Frappe, Macchiato) and 14 accent colors using Catppuccin palette. CSS custom properties enable instant theme switching with local storage persistence.</p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">⚡</div>
        <h3>Performance Optimized</h3>
        <p>Static site generation with SvelteKit adapter, prerendering for instant page loads, optimized assets, and minimal JavaScript. Achieves 100/100 Lighthouse performance score with sub-second load times.</p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">📱</div>
        <h3>Responsive Design</h3>
        <p>Mobile-first approach with fluid typography, adaptive layouts, and touch-optimized interactions. Seamless experience from mobile devices to ultra-wide displays with consistent design language.</p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">♿</div>
        <h3>Accessibility First</h3>
        <p>WCAG 2.1 AA compliant with semantic HTML, ARIA labels, keyboard navigation support, and screen reader optimization. High contrast ratios and focus indicators throughout.</p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">🔍</div>
        <h3>SEO Optimized</h3>
        <p>Comprehensive meta tags, Open Graph, Twitter Cards, structured data (JSON-LD), canonical URLs, and sitemap generation. Optimized for search engine discovery and social sharing.</p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">🌐</div>
        <h3>Modern UX Patterns</h3>
        <p>Smooth page transitions, skeleton loading states, custom animations with easing functions, interactive hover states, and terminal-style navigation breadcrumbs for technical aesthetic.</p>
      </div>
    </div>
  </section>

  <!-- Tech Stack -->
  <section class="section">
    <h2 class="section-title">Technology Stack</h2>
    <div class="stack-grid">
      <span class="stack-badge" data-category="framework">SvelteKit</span>
      <span class="stack-badge" data-category="language">JavaScript</span>
      <span class="stack-badge" data-category="styling">CSS Custom Properties</span>
      <span class="stack-badge" data-category="styling">Tailwind CSS</span>
      <span class="stack-badge" data-category="build">Vite</span>
      <span class="stack-badge" data-category="deployment">GitHub Pages</span>
      <span class="stack-badge" data-category="design">Catppuccin Palette</span>
      <span class="stack-badge" data-category="font">JetBrains Mono</span>
      <span class="stack-badge" data-category="icons">Lucide Icons</span>
      <span class="stack-badge" data-category="analytics">Custom Visitor Tracking</span>
      <span class="stack-badge" data-category="api">GitHub API</span>
    </div>
  </section>

  <!-- Design System -->
  <section class="section">
    <h2 class="section-title">Design Philosophy</h2>
    <div class="philosophy-grid">
      <div class="philosophy-card">
        <h3>Minimal & Intentional</h3>
        <p>Clean layouts with generous whitespace and focused typography.</p>
      </div>
      
      <div class="philosophy-card">
        <h3>Terminal Aesthetics</h3>
        <p>Monospace fonts and command-line visual language for a technical identity.</p>
      </div>
      
      <div class="philosophy-card">
        <h3>Micro-interactions</h3>
        <p>Thoughtful animations that enhance usability without overwhelming.</p>
      </div>
      
      <div class="philosophy-card">
        <h3>Performance as Feature</h3>
        <p>Static generation and optimized assets ensure instant interactions.</p>
      </div>
    </div>
  </section>

  <!-- Technical Highlights -->
  <section class="section">
    <h2 class="section-title">Technical Highlights</h2>
    <div class="highlights">
      <div class="highlight-item">
        <h3>🎯 Design Token System</h3>
        <p>Comprehensive CSS custom properties for colors (with RGB variants for transparency), spacing scales, animation easing curves, breakpoints, and typography. Enables consistent theming and easy maintenance.</p>
      </div>

      <div class="highlight-item">
        <h3>🚀 Static Site Generation</h3>
        <p>Pre-renders all pages at build time, deploys to GitHub Pages via docs folder. Zero server dependencies, instant page loads, and CDN distribution for global performance.</p>
      </div>

      <div class="highlight-item">
        <h3>💾 State Persistence</h3>
        <p>Theme preferences saved to localStorage, visitor analytics integration, latest commit hash fetching from GitHub API, and carbon footprint badge from Website Carbon.</p>
      </div>

      <div class="highlight-item">
        <h3>🎨 Component Architecture</h3>
        <p>Reusable Svelte components (Header, Footer, SEO, ThemeSelector) with prop-driven configuration and slot-based composition for maximum flexibility.</p>
      </div>

      <div class="highlight-item">
        <h3>📊 SEO & Metadata</h3>
        <p>Centralized SEO component with per-page overrides, structured data for person and website schemas, Apple Touch Icon support, and comprehensive social media meta tags.</p>
      </div>

      <div class="highlight-item">
        <h3>🎭 Advanced CSS</h3>
        <p>CSS Grid and Flexbox layouts, clamp() for fluid typography, backdrop filters for glassmorphism effects, custom selection colors, and optimized animations with transform and opacity.</p>
      </div>
    </div>
  </section>

  <!-- Metrics -->
  <section class="section">
    <h2 class="section-title">Performance Metrics</h2>
    <div class="metrics-grid">
      <div class="metric-card">
        <div class="metric-value">100</div>
        <div class="metric-label">Lighthouse Performance</div>
      </div>
      <div class="metric-card">
        <div class="metric-value">100</div>
        <div class="metric-label">Accessibility Score</div>
      </div>
      <div class="metric-card">
        <div class="metric-value">A+</div>
        <div class="metric-label">Carbon Rating</div>
      </div>
      <div class="metric-card">
        <div class="metric-value">&lt;1s</div>
        <div class="metric-label">First Contentful Paint</div>
      </div>
      <div class="metric-card">
        <div class="metric-value">56</div>
        <div class="metric-label">Theme Combinations</div>
      </div>
      <div class="metric-card">
        <div class="metric-value">0.05g</div>
        <div class="metric-label">CO₂ per Visit</div>
      </div>
    </div>
  </section>

  <!-- Learnings -->
  <section class="section">
    <h2 class="section-title">Key Learnings</h2>
    <div class="learnings">
      <p>Building this portfolio was an exercise in balancing design ambition with technical constraints. Key insights included:</p>
      <ul>
        <li><strong>Theme System Architecture:</strong> Using CSS custom properties with RGB variants enables transparency effects while maintaining theme consistency. Storing theme state in localStorage with fallback handling prevents flash of unstyled content.</li>
        <li><strong>Performance Optimization:</strong> Static generation eliminates server latency, but requires careful attention to build-time data fetching and dynamic client-side features. Lazy loading and code splitting aren't always necessary for small sites.</li>
        <li><strong>Responsive Design:</strong> Mobile-first approach with fluid typography (clamp) and flexible layouts reduces media query complexity. Using CSS custom properties for breakpoint-dependent values enables cleaner component styles.</li>
        <li><strong>Accessibility Patterns:</strong> Semantic HTML is foundational, but proper ARIA labels, focus management, and keyboard navigation require deliberate implementation at every interaction point.</li>
        <li><strong>Developer Experience:</strong> SvelteKit's file-based routing, automatic code splitting, and minimal boilerplate accelerate development without sacrificing control over the build output.</li>
      </ul>
    </div>
  </section>

  <!-- Future Plans -->
  <section class="section">
    <h2 class="section-title">Future Enhancements</h2>
    <div class="roadmap">
      <div class="roadmap-item">
        <span class="roadmap-status">Planned</span>
        <h3>Blog Integration</h3>
        <p>MDX-powered blog with syntax highlighting, reading time estimates, and tag-based filtering.</p>
      </div>
      <div class="roadmap-item">
        <span class="roadmap-status">Planned</span>
        <h3>Advanced Analytics</h3>
        <p>Privacy-respecting analytics dashboard with page views, visitor paths, and engagement metrics.</p>
      </div>
      <div class="roadmap-item">
        <span class="roadmap-status">Considering</span>
        <h3>Interactive Playground</h3>
        <p>Live code editor for demonstrating technical concepts and experiments directly on the site.</p>
      </div>
      <div class="roadmap-item">
        <span class="roadmap-status">Considering</span>
        <h3>Dark/Light Mode Toggle</h3>
        <p>Simplified theme switcher with automatic system preference detection alongside full theme palette.</p>
      </div>
    </div>
  </section>

  <!-- Call to Action -->
  <section class="cta-section">
    <h2>Explore the Live Site</h2>
    <p>Experience the design system, interact with the theme switcher, and explore the codebase to see the implementation details.</p>
    <div class="cta-actions">
      <a href="https://djtsingh.github.io" target="_blank" rel="noopener noreferrer" class="btn btn--primary">
        Visit Portfolio
      </a>
      <a href="https://github.com/djtsingh/djx" target="_blank" rel="noopener noreferrer" class="btn btn--secondary">
        View on GitHub
      </a>
    </div>
  </section>
</article>

<style>
  .project-page {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem 0;
  }

  /* Breadcrumb */
  .breadcrumb {
    margin-bottom: 2rem;
  }

  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--subtext1);
    font-size: 0.8rem;
    transition: color 0.2s ease;
  }

  .back-link:hover {
    color: var(--accent);
  }

  /* Hero */
  .hero {
    margin-bottom: 4rem;
  }

  .status-bar {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .status {
    display: inline-block;
    padding: 0.35rem 0.75rem;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-radius: var(--radius-sm);
  }

  .status--active {
    background: rgba(166, 227, 161, 0.2);
    color: var(--green);
  }

  .year {
    font-size: 0.8rem;
    color: var(--subtext0);
  }

  .hero-content h1 {
    margin: 0 0 0.75rem;
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 700;
    color: var(--text);
  }

  .tagline {
    margin: 0 0 1rem;
    font-size: 1.125rem;
    color: var(--accent);
    font-weight: 500;
  }

  .description {
    margin: 0 0 2rem;
    font-size: 1rem;
    line-height: 1.7;
    color: var(--subtext1);
  }

  .action-bar {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  /* Buttons */
  .btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    font-size: 0.95rem;
    font-weight: 600;
    border-radius: var(--radius-md);
    text-decoration: none;
    transition: all 0.2s ease;
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
    border: 1px solid var(--surface1);
  }

  .btn--secondary:hover {
    background: var(--surface1);
    border-color: var(--surface1);
  }

  /* Sections */
  .section {
    margin-bottom: 4rem;
  }

  .section-title {
    margin: 0 0 1.5rem;
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--text);
  }

  /* Content Grid */
  .content-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
  }

  .content-block h3 {
    margin: 0 0 0.75rem;
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--accent);
  }

  .content-block p {
    margin: 0;
    line-height: 1.7;
    color: var(--subtext1);
  }

  /* Features */
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
  }

  .feature-card {
    padding: 1.5rem;
    background: var(--base);
    border: 1px solid var(--surface0);
    border-radius: var(--radius-md);
    transition: border-color 0.2s ease;
  }

  .feature-card:hover {
    border-color: var(--surface1);
  }

  .feature-icon {
    display: block;
    font-size: 2rem;
    margin-bottom: 0.75rem;
  }

  .feature-card h3 {
    margin: 0 0 0.5rem;
    font-size: 1.05rem;
    font-weight: 600;
    color: var(--text);
  }

  .feature-card p {
    margin: 0;
    font-size: 0.9rem;
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
    font-size: 0.85rem;
    font-weight: 500;
    background: var(--surface0);
    color: var(--text);
    border-radius: var(--radius-sm);
    border: 1px solid transparent;
    transition: border-color 0.2s ease;
  }

  .stack-badge:hover {
    border-color: var(--accent);
  }

  .stack-badge[data-category="framework"] {
    border-left: 3px solid var(--green);
  }

  .stack-badge[data-category="language"] {
    border-left: 3px solid var(--blue);
  }

  .stack-badge[data-category="styling"] {
    border-left: 3px solid var(--mauve);
  }

  .stack-badge[data-category="build"] {
    border-left: 3px solid var(--peach);
  }

  .stack-badge[data-category="deployment"] {
    border-left: 3px solid var(--yellow);
  }

  .stack-badge[data-category="design"] {
    border-left: 3px solid var(--pink);
  }

  .stack-badge[data-category="font"] {
    border-left: 3px solid var(--teal);
  }

  .stack-badge[data-category="icons"] {
    border-left: 3px solid var(--lavender);
  }

  .stack-badge[data-category="analytics"] {
    border-left: 3px solid var(--sapphire);
  }

  .stack-badge[data-category="api"] {
    border-left: 3px solid var(--sky);
  }

  /* Philosophy Grid */
  .philosophy-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  .philosophy-card {
    padding: 1.5rem;
    background: var(--surface0);
    border-radius: var(--radius-md);
  }

  .philosophy-card h3 {
    margin: 0 0 0.75rem;
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--accent);
  }

  .philosophy-card p {
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.6;
    color: var(--subtext1);
  }

  /* Highlights */
  .highlights {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .highlight-item h3 {
    margin: 0 0 0.5rem;
    font-size: 1.05rem;
    font-weight: 600;
    color: var(--text);
  }

  .highlight-item p {
    margin: 0;
    line-height: 1.7;
    color: var(--subtext1);
  }

  /* Metrics */
  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 1.25rem;
  }

  .metric-card {
    padding: 1.5rem;
    text-align: center;
    background: var(--surface0);
    border-radius: var(--radius-md);
    border: 1px solid var(--surface1);
  }

  .metric-value {
    font-size: 2rem;
    font-weight: 700;
    color: var(--accent);
    margin-bottom: 0.5rem;
  }

  .metric-label {
    font-size: 0.8rem;
    color: var(--subtext0);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  /* Learnings */
  .learnings p {
    margin: 0 0 1rem;
    line-height: 1.7;
    color: var(--subtext1);
  }

  .learnings ul {
    margin: 0;
    padding-left: 1.5rem;
    list-style: none;
  }

  .learnings li {
    margin-bottom: 1rem;
    padding-left: 0.5rem;
    line-height: 1.7;
    color: var(--subtext1);
    position: relative;
  }

  .learnings li::before {
    content: '→';
    position: absolute;
    left: -1.5rem;
    color: var(--accent);
  }

  .learnings strong {
    color: var(--text);
    font-weight: 600;
  }

  /* Roadmap */
  .roadmap {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .roadmap-item {
    padding: 1.25rem;
    background: var(--surface0);
    border-radius: var(--radius-md);
    border-left: 3px solid var(--accent);
  }

  .roadmap-status {
    display: inline-block;
    padding: 0.25rem 0.6rem;
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    background: rgba(var(--accent-rgb), 0.15);
    color: var(--accent);
    border-radius: var(--radius-sm);
    margin-bottom: 0.75rem;
  }

  .roadmap-item h3 {
    margin: 0 0 0.5rem;
    font-size: 1.05rem;
    font-weight: 600;
    color: var(--text);
  }

  .roadmap-item p {
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.6;
    color: var(--subtext1);
  }

  /* CTA Section */
  .cta-section {
    text-align: center;
    padding: 3rem 2rem;
    background: var(--base);
    border: 1px solid var(--surface0);
    border-radius: var(--radius-lg);
    margin-top: 4rem;
  }

  .cta-section h2 {
    margin: 0 0 0.75rem;
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--text);
  }

  .cta-section p {
    margin: 0 0 2rem;
    font-size: 1rem;
    color: var(--subtext1);
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .cta-actions {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
  }

  @media (max-width: 768px) {
    .project-page {
      padding: 1rem 0;
    }

    .hero-content h1 {
      font-size: 1.75rem;
    }

    .action-bar {
      flex-direction: column;
    }

    .btn {
      width: 100%;
      justify-content: center;
    }

    .metrics-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .cta-section {
      padding: 2rem 1.5rem;
    }

    .cta-actions {
      flex-direction: column;
    }
  }
</style>
