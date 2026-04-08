<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { fade } from 'svelte/transition';
  import ExternalLink from 'lucide-svelte/icons/external-link';
  import Github from 'lucide-svelte/icons/github';
  import Code from 'lucide-svelte/icons/code';

  const showcases = [
    {
      id: 'terminal',
      title: 'Terminal',
      subtitle: 'Interactive Web Shell',
      projectSlug: 'terminal',
      description: 'A creative browser-based terminal emulator with real command parsing, virtual file system, and session persistence—zero dependencies, pure frontend engineering.',
      url: 'https://terminal.daljeetsingh.me',
      github: 'https://github.com/djtsingh/terminal',
      skills: ['Vanilla JavaScript', 'DOM Manipulation', 'CLI Design'],
      highlights: [
        '🖥️ Interactive shell with command history',
        '📁 Virtual file system',
        '⚡ Session persistence',
        '🎨 Retro-terminal aesthetic'
      ],
      color: '#89b4fa', // blue
      icon: '⌨️'
    },
    {
      id: 'api-gateway',
      title: 'Janus',
      subtitle: 'API Gateway & Bot Defense',
      projectSlug: 'api-gateway',
      description: 'Production-grade security system with device fingerprinting, Proof of Work challenges, and hardware attestation protecting high-value API endpoints.',
      url: 'https://api.daljeetsingh.me',
      github: 'https://github.com/djtsingh/api-gateway',
      skills: ['Go Backend', 'Security', 'Infrastructure'],
      highlights: [
        '🔐 Multi-layered bot detection',
        '⚙️ Device fingerprinting',
        '🧮 Proof of Work verification',
        '📊 Real-time analytics dashboard'
      ],
      color: '#f38ba8', // red/pink
      icon: '🔐'
    },
    {
      id: 'straits',
      title: 'Iron Dome',
      subtitle: 'Geopolitical Intelligence Dashboard',
      projectSlug: 'straits',
      description: 'Real-time dashboard tracking the Strait of Hormuz crisis with live commodity prices, maritime incidents, and economic impact analysis through interactive data visualization.',
      url: 'https://straits.daljeetsingh.me',
      github: 'https://github.com/djtsingh/straits',
      skills: ['Next.js', 'Data Visualization', 'Real-time APIs'],
      highlights: [
        '📊 Live commodity prices',
        '🗺️ Maritime incident tracking',
        '💹 Economic impact metrics',
        '📈 Interactive data charts'
      ],
      color: '#a6e3a1', // green
      icon: '🌍'
    }
  ];

  let selectedShowcase = $state(0);
  let isLoading = $state(true);
  let iframeReady = $state(false);

  onMount(() => {
    isLoading = false;
  });

  function handleShowcaseChange(index) {
    selectedShowcase = index;
    iframeReady = false;
  }

  function handleIframeLoad() {
    iframeReady = true;
  }
</script>

<section class="live-showcases">
  <div class="section-header">
    <h2 class="section-title">
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
        <line x1="2" y1="20" x2="22" y2="20"></line>
      </svg>
      <span>Live Showcases</span>
    </h2>
    <p class="section-subtitle">Interactive demonstrations of frontend skills and technical expertise</p>
  </div>

  <div class="showcases-container">
    <!-- Tabs/Navigation -->
    <div class="showcase-tabs">
      {#each showcases as showcase, index}
        <button
          class="showcase-tab {selectedShowcase === index ? 'active' : ''}"
          onclick={() => handleShowcaseChange(index)}
          style="--tab-color: {showcase.color}"
        >
          <span class="tab-icon">{showcase.icon}</span>
          <span class="tab-label">
            <span class="tab-title">{showcase.title}</span>
            <span class="tab-subtitle">{showcase.subtitle}</span>
          </span>
        </button>
      {/each}
    </div>

    <!-- Active Showcase Display -->
    <div class="showcase-display">
      {#each showcases as showcase, index}
        {#if selectedShowcase === index}
          <div class="showcase-content" in:fade={{ duration: 300 }} out:fade={{ duration: 200 }}>
            <!-- Left: Information Panel -->
            <div class="showcase-info">
              <div class="info-header">
                <div class="info-icon" style="--icon-color: {showcase.color}">
                  {showcase.icon}
                </div>
                <div>
                  <h3 class="info-title">{showcase.title}</h3>
                  <p class="info-subtitle">{showcase.subtitle}</p>
                </div>
              </div>

              <p class="info-description">{showcase.description}</p>

              <div class="highlights">
                <h4 class="highlights-title">Key Features</h4>
                <ul class="highlights-list">
                  {#each showcase.highlights as highlight}
                    <li>{highlight}</li>
                  {/each}
                </ul>
              </div>

              <div class="skills">
                <h4 class="skills-title">Skills Demonstrated</h4>
                <div class="skills-tags">
                  {#each showcase.skills as skill}
                    <span class="skill-tag" style="--skill-color: {showcase.color}">
                      {skill}
                    </span>
                  {/each}
                </div>
              </div>

              <div class="showcase-actions">
                <a
                  href={showcase.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="action-btn primary"
                  style="--btn-color: {showcase.color}"
                >
                  <ExternalLink size={18} />
                  <span>Visit Live</span>
                </a>
                <a
                  href={showcase.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="action-btn secondary"
                >
                  <Github size={18} />
                  <span>View Source</span>
                </a>
                <a
                  href="/projects/{showcase.projectSlug}"
                  class="action-btn secondary"
                >
                  <Code size={18} />
                  <span>Project Details</span>
                </a>
              </div>
            </div>

            <!-- Right: Preview/Iframe -->
            <div class="showcase-preview">
              <div class="preview-header">
                <div class="preview-dots">
                  <div class="dot red"></div>
                  <div class="dot yellow"></div>
                  <div class="dot green"></div>
                </div>
                <span class="preview-url">{showcase.url.replace('https://', '')}</span>
              </div>
              <div class="preview-container">
                <iframe
                  src={showcase.url}
                  title={showcase.title}
                  class="showcase-iframe {iframeReady ? 'ready' : ''}"
                  sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                  onload={handleIframeLoad}
                ></iframe>
                {#if !iframeReady}
                  <div class="iframe-loading">
                    <div class="loader"></div>
                    <p>Loading {showcase.title}...</p>
                  </div>
                {/if}
              </div>
            </div>
          </div>
        {/if}
      {/each}
    </div>
  </div>
</section>

<style>
  .live-showcases {
    margin-top: 3rem;
    margin-bottom: 4rem;
  }

  .section-header {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-bottom: 2rem;
  }

  .section-title {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text);
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .section-subtitle {
    margin: 0;
    font-size: 0.9375rem;
    color: var(--subtext0);
    line-height: 1.6;
  }

  .showcases-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background: var(--base);
    border: 1px solid var(--surface0);
    border-radius: var(--radius-lg);
    padding: 0;
    overflow: hidden;
  }

  /* === TABS/NAVIGATION === */
  .showcase-tabs {
    display: flex;
    gap: 0;
    border-bottom: 1px solid var(--surface0);
    background: var(--surface0);
    padding: 0.5rem;
    flex-wrap: wrap;
  }

  .showcase-tab {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.875rem 1.25rem;
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 0.9375rem;
    font-weight: 500;
    color: var(--subtext0);
    transition: all 0.2s ease;
    border-radius: var(--radius-sm);
    margin: 0.25rem;
  }

  .showcase-tab:hover {
    color: var(--text);
    background: var(--base);
  }

  .showcase-tab.active {
    color: var(--text);
    background: var(--base);
    border-bottom: 3px solid var(--tab-color, var(--accent));
  }

  .tab-icon {
    font-size: 1.25rem;
  }

  .tab-label {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
    text-align: left;
  }

  .tab-title {
    display: block;
    font-weight: 600;
  }

  .tab-subtitle {
    display: block;
    font-size: 0.75rem;
    color: var(--subtext1);
    font-weight: 400;
  }

  /* === SHOWCASE DISPLAY === */
  .showcase-display {
    padding: 2rem;
  }

  .showcase-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2.5rem;
    align-items: start;
  }

  /* === INFO PANEL === */
  .showcase-info {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .info-header {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
  }

  .info-icon {
    font-size: 2rem;
    flex-shrink: 0;
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(var(--blue-rgb), 0.1);
    border-radius: var(--radius-md);
  }

  .info-title {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text);
  }

  .info-subtitle {
    margin: 0.25rem 0 0;
    font-size: 0.9375rem;
    color: var(--subtext0);
  }

  .info-description {
    margin: 0;
    font-size: 0.9375rem;
    line-height: 1.6;
    color: var(--subtext0);
  }

  .highlights {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .highlights-title {
    margin: 0;
    font-size: 0.875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text);
  }

  .highlights-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .highlights-list li {
    font-size: 0.875rem;
    color: var(--subtext0);
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .highlights-list li::before {
    content: '→';
    color: var(--accent);
    font-weight: 600;
    flex-shrink: 0;
  }

  .skills {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .skills-title {
    margin: 0;
    font-size: 0.875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text);
  }

  .skills-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .skill-tag {
    padding: 0.375rem 0.75rem;
    background: rgba(var(--blue-rgb), 0.1);
    color: var(--skill-color, var(--text));
    border-radius: var(--radius-sm);
    font-size: 0.8125rem;
    font-weight: 500;
    border: 1px solid rgba(var(--blue-rgb), 0.2);
  }

  .showcase-actions {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--surface0);
  }

  .action-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.875rem 1.5rem;
    border-radius: var(--radius-md);
    font-size: 0.875rem;
    font-weight: 600;
    transition: all 0.3s ease;
    cursor: pointer;
    border: none;
    text-decoration: none;
    background-image: none;
    position: relative;
    overflow: hidden;
  }

  .action-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.1);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .action-btn:hover::before {
    opacity: 1;
  }

  .action-btn.primary {
    background: linear-gradient(135deg, var(--btn-color, var(--accent)) 0%, rgba(var(--blue-rgb), 0.8) 100%);
    color: var(--mantle);
    box-shadow: 0 4px 12px rgba(var(--blue-rgb), 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .action-btn.primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(var(--blue-rgb), 0.5);
    filter: brightness(1.15);
  }

  .action-btn.primary:active {
    transform: translateY(0);
  }

  .action-btn.secondary {
    background: linear-gradient(135deg, var(--surface0) 0%, var(--surface1) 100%);
    color: var(--text);
    border: 1px solid var(--surface1);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .action-btn.secondary:hover {
    background: linear-gradient(135deg, var(--surface1) 0%, rgba(var(--accent-rgb), 0.1) 100%);
    border-color: var(--accent);
    box-shadow: 0 4px 16px rgba(var(--accent-rgb), 0.2);
    transform: translateY(-2px);
  }

  .action-btn.secondary:active {
    transform: translateY(0);
  }

  /* === PREVIEW IFRAME === */
  .showcase-preview {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    background: var(--surface0);
    border-radius: var(--radius-md);
    overflow: hidden;
    border: 1px solid var(--surface1);
    height: 100%;
    min-height: 500px;
  }

  .preview-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    background: var(--surface1);
    border-bottom: 1px solid var(--surface0);
  }

  .preview-dots {
    display: flex;
    gap: 0.5rem;
  }

  .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }

  .dot.red { background: #f38ba8; }
  .dot.yellow { background: #f9e2af; }
  .dot.green { background: #a6e3a1; }

  .preview-url {
    font-size: 0.8125rem;
    color: var(--subtext0);
    font-family: 'JetBrains Mono', monospace;
    flex: 1;
    text-align: right;
  }

  .preview-container {
    position: relative;
    flex: 1;
    min-height: 400px;
    background: var(--base);
  }

  .showcase-iframe {
    width: 100%;
    height: 100%;
    border: none;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .showcase-iframe.ready {
    opacity: 1;
  }

  .iframe-loading {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    background: var(--base);
    color: var(--subtext0);
  }

  .loader {
    width: 32px;
    height: 32px;
    border: 3px solid var(--surface0);
    border-top-color: var(--accent);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* === RESPONSIVE === */
  @media (max-width: 1024px) {
    .showcase-content {
      grid-template-columns: 1fr;
    }

    .showcase-preview {
      min-height: 400px;
    }

    .preview-header {
      flex-wrap: wrap;
    }

    .preview-url {
      text-align: left;
      flex: 1 1 100%;
      order: 3;
    }
  }

  @media (max-width: 768px) {
    .showcase-display {
      padding: 1.5rem;
    }

    .showcase-tabs {
      flex-direction: column;
    }

    .showcase-tab {
      width: 100%;
      justify-content: flex-start;
    }

    .tab-label {
      flex-direction: row;
      align-items: center;
      gap: 0.5rem;
    }

    .tab-subtitle {
      display: none;
    }
  }
</style>
