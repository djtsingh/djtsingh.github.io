<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { Coffee, Code, Bug, GitBranch, Zap, Activity, CloudSun, RefreshCw, MapPin, Calendar, Mail, Terminal, Package, Github, Sun, Moon } from 'lucide-svelte';
  // Import LazyMap directly for now to test
  import LazyMap from '$lib/components/LazyMap.svelte';

  // Map variables - now for lazy loading
  let showMap = $state(false);

  let widgetElement; // For intersection observer

  // Lazy-load heavy widget
  let GitGraph = $state(null);
  let gitGraphLoaded = $state(false);

  // Stats State
  let stats = $state({
    coffee: 0,
    code: 0,
    bugs: 0,
    commits: 0,
    uptime: 0
  });

  // Weather State
  let weather = $state({
    condition: 'Clear Coding',
    temp: 'Optimal',
    forecast: 'Perfect conditions for shipping features',
    wind: 'Smooth deploys',
    packages: ['React', 'TypeScript', 'Vite'],
    color: '#a6e3a1'
  });

  const weatherConditions = [
    {
      condition: 'Clear Coding',
      temp: 'Optimal',
      forecast: 'Perfect conditions for shipping features',
      wind: 'Smooth deploys',
      packages: ['React', 'TypeScript', 'Vite'],
      color: '#a6e3a1'
    },
    {
      condition: 'Refactoring Storm',
      temp: 'Intense',
      forecast: 'Heavy refactoring expected, bring coffee',
      wind: 'Breaking changes',
      packages: ['ESLint', 'Prettier', 'Husky'],
      color: '#89b4fa'
    },
    {
      condition: 'Bug Blizzard',
      temp: 'Freezing',
      forecast: 'Debug mode activated, stay warm',
      wind: 'Stack traces',
      packages: ['Jest', 'Cypress', 'Playwright'],
      color: '#f38ba8'
    },
    {
      condition: 'Hot Fixes',
      temp: 'Scorching',
      forecast: 'Production fires detected',
      wind: 'Critical alerts',
      packages: ['Sentry', 'Rollbar', 'DataDog'],
      color: '#fab387'
    }
  ];

  // Tech Stack
  const techStack = [
    { name: 'Go', color: '#89dceb' },
    { name: 'React', color: '#89b4fa' },
    { name: 'Svelte', color: '#f38ba8' },
    { name: 'Node.js', color: '#a6e3a1' },
    { name: 'Docker', color: '#89b4fa' },
    { name: 'Python', color: '#f9e2af' },
    { name: 'TypeScript', color: '#89b4fa' },
    { name: 'Rust', color: '#fab387' },
    { name: 'PostgreSQL', color: '#89b4fa' },
    { name: 'Redis', color: '#f38ba8' },
    { name: 'Kubernetes', color: '#89b4fa' },
    { name: 'AWS', color: '#fab387' }
  ];

  // Time State
  let currentTime = $state(new Date());
  let is24Hour = $state(true); // Toggle between 12 and 24 hour format
  
  // Reactive time display values
  let displayHours = $state('00');
  let minutes = $state('00');
  let seconds = $state('00');
  let isDayTime = $state(true); // Day (6 AM - 6 PM) or Night (6 PM - 6 AM)
  
  // Update time display reactively
  $effect(() => {
    const hour = currentTime.getHours();
    displayHours = is24Hour ? hour.toString().padStart(2, '0') : (hour % 12 || 12).toString().padStart(2, '0');
    minutes = currentTime.getMinutes().toString().padStart(2, '0');
    seconds = currentTime.getSeconds().toString().padStart(2, '0');
    isDayTime = hour >= 6 && hour < 18; // Day: 6 AM - 6 PM, Night: 6 PM - 6 AM
  });

  // Git State
  let gitData = $state({
    stats: {
      totalCommits: 0,
      activeBranches: 0,
      contributors: 0,
      lastCommit: null
    }
  });
  let isLoading = $state(true);
  let hoveredCommit = $state(null);

  // Animate stats
  onMount(async () => {
    const intervals = [
      setInterval(() => stats.coffee = Math.min(stats.coffee + 23, 847), 30),
      setInterval(() => stats.code = Math.min(stats.code + 3847, 128943), 25),
      setInterval(() => stats.bugs = Math.min(stats.bugs + 67, 2341), 35),
      setInterval(() => stats.commits = Math.min(stats.commits + 142, 4892), 28),
      setInterval(() => stats.uptime = Math.min(stats.uptime + 2.8, 99.8), 40)
    ];

    if (browser) {
      const timeInterval = setInterval(() => {
        currentTime = new Date();
      }, 1000);
      intervals.push(timeInterval);

      fetchGitHubData();

      // Set up intersection observer for lazy loading the map
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
              if (entry.isIntersecting && !showMap) {
                showMap = true;
              }
            });
          },
        { rootMargin: '50px' } // Start loading 50px before it comes into view
      );

      if (widgetElement) {
        observer.observe(widgetElement);

        // Check if element is already visible
        const rect = widgetElement.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

        if (isVisible) {
          showMap = true;
        }

        // Fallback: load after 3 seconds if not loaded yet
        setTimeout(() => {
          if (!showMap) {
            showMap = true;
          }
        }, 3000);

      } else {
        // Fallback: load immediately if binding failed
        setTimeout(() => {
          showMap = true;
        }, 1000);
      }

      // Dynamically import the heavy Git graph widget to reduce initial bundle
      try {
        const mod = await import('$lib/components/GitGraphWidget.svelte');
        GitGraph = mod.default;
        gitGraphLoaded = true;
      } catch (err) {
        console.error('Failed to load GitGraphWidget dynamically', err);
      }

      return () => {
        intervals.forEach(clearInterval);
        if (widgetElement) {
          observer.unobserve(widgetElement);
        }
      };
    }
  });

  function changeWeather() {
    weather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
  }

  function toggleTimeFormat() {
    is24Hour = !is24Hour;
  }

  function handleTimeKeydown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleTimeFormat();
    }
  }

  async function fetchGitHubData() {
    if (!browser) return;

    try {
      isLoading = true;
      const response = await fetch(
        'https://api.github.com/repos/djtsingh/djtsingh.github.io/commits?per_page=100'
      );
      
      if (response.ok) {
        const commits = await response.json();
        const contributors = new Set(commits.map(c => c.commit.author.name)).size;

        // Process commits for recent-activity widget
        const processedCommits = commits.map(c => ({
          id: c.sha.substring(0,7),
          branch: 'main',
          timestamp: new Date(c.commit.author.date).getTime(),
          message: c.commit.message.split('\n')[0],
          additions: Math.floor(Math.random() * 100) + 1,
          deletions: Math.floor(Math.random() * 50),
          author: c.commit.author.name,
          type: 'feat',
          url: c.html_url
        }));

        gitData.commits = processedCommits;
        gitData.branches = [ { name: 'main', color: '#89b4fa', commits: processedCommits.length, merges: 0 } ];

        gitData.stats = {
          totalCommits: commits.length,
          activeBranches: 1,
          contributors,
          lastCommit: commits.length > 0 ? new Date(commits[0].commit.author.date) : null
        };
      }
    } catch (err) {
      console.error('GitHub fetch failed:', err);
      gitData.stats = {
        totalCommits: 143,
        activeBranches: 2,
        contributors: 1,
        lastCommit: new Date()
      };
    } finally {
      isLoading = false;
    }
  }

  function getRelativeTime(timestamp) {
    const now = Date.now();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (hours < 1) return 'just now';
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  }
</script>

<div class="widgets-container">
  <!-- Git Graph Widget - Full width above column widgets -->
  {#if gitGraphLoaded}
    <GitGraph {stats} />
  {:else}
    <div class="graph-placeholder">
      <div class="widget-header">
        <GitBranch size={20} />
        <h3>Repository Activity</h3>
      </div>
      <div class="loading-state">
        <div class="loading-spinner"></div>
        <p>Loading repository graph...</p>
      </div>
    </div>
  {/if}

  <div class="widget-row responsive-widget-row">
    <!-- Weather Widget -->
    <div class="widget weather-widget">
      <div class="widget-header">
        <CloudSun size={20} weight="duotone" />
        <h3>Code Weather</h3>
        <button class="icon-btn weather-refresh" onclick={changeWeather}>
          <RefreshCw size={16} />
        </button>
      </div>
      <div class="weather-content">
        <div class="weather-visual">
            <div class="weather-icon-container" style="--weather-color: {weather.color}">
            <div class="weather-icon-bg"></div>
            <CloudSun size={24} weight="duotone" class="weather-main-icon" />
          </div>
          <div class="weather-main-info">
            <div class="weather-condition">{weather.condition}</div>
            <div class="weather-temp">{weather.temp}</div>
          </div>
        </div>
        <div class="weather-forecast">{weather.forecast}</div>
        <div class="weather-details">
          <div class="weather-detail">
            <span class="detail-icon">🌬️</span>
            <span class="detail-label">Wind:</span>
            <span class="detail-value">{weather.wind}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Location & Time Widget -->
    <div class="widget location-widget" bind:this={widgetElement}>
      <div class="widget-header">
        <MapPin size={20} weight="duotone" />
        <h3>Currently based in</h3>
      </div>
      <div class="location-content">
        <!-- Lazy loaded map -->
        {#if showMap}
          <LazyMap />
        {:else}
          <!-- Placeholder while waiting for intersection -->
          <div class="map-placeholder">
            <div class="placeholder-spinner"></div>
          </div>
        {/if}

        <!-- Bottom Row: Mumbai Label + Time Display -->
        <div class="location-footer">
          <div class="location-label">Mumbai, MH</div>
          <div 
            class="time-display" 
            onclick={toggleTimeFormat} 
            onkeydown={handleTimeKeydown}
            role="button" 
            tabindex="0"
            aria-label="Toggle between 12-hour and 24-hour time format"
          >
            {#if isDayTime}
              <Sun size={14} class="time-icon" />
            {:else}
              <Moon size={14} class="time-icon" />
            {/if}
            <span class="time-segment">{displayHours}</span>
            <span class="time-separator">:</span>
            <span class="time-segment">{minutes}</span>
            <span class="time-separator">:</span>
            <span class="time-segment seconds">{seconds}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Contact Widget (moved to last) -->
    <div class="widget contact-widget">
      <div class="widget-header">
        <Mail size={20} weight="duotone" />
        <h3>Let's Connect</h3>
      </div>
      <div class="contact-content">
        <p class="contact-description">Always open to opportunities and new collaborations. Let's talk</p>
        <a href="https://cal.com/djtsingh/15min" target="_blank" class="book-chat-btn">
          <span class="btn-icon">💬</span>
          <span class="btn-text">Book a Chat</span>
        </a>
      </div>
    </div>
  {#if hoveredCommit}
    <div class="commit-tooltip">
      <div class="tooltip-header">
        <strong>{hoveredCommit.type}:</strong> {hoveredCommit.message}
      </div>
      <div class="tooltip-meta">
        <span>By {hoveredCommit.author}</span>
        <span>Branch: {hoveredCommit.branch}</span>
      </div>
      <div class="tooltip-changes">
        <span class="additions">+{hoveredCommit.additions} additions</span>
        <span class="deletions">-{hoveredCommit.deletions} deletions</span>
      </div>
    </div>
  {/if}

</div>
</div>

<style>
  /* Widgets container should follow page/footer container spacing */
  .widgets-container {
    width: 100%;
    /* Removed max-width to expand fully like footer */
    margin: 0;
    padding: 34px 0 0 0; /* Consistent padding: 34px top, no bottom padding */
    display: flex;
    flex-direction: column;
    gap: 2rem; /* Increased vertical gap for more space */
  }

  /* Leaflet map styles */
  :global(.leaflet-control-attribution),
  :global(.leaflet-control-zoom) {
    display: none !important;
  }
  
  .widget-row {
    display: grid;
    width: 100%;
    gap: 48px 28px;
    margin: 0 auto 2.5rem auto;
    grid-template-columns: repeat(3, 1fr);
    align-items: stretch;
  }

  /* 2 columns for small tablets */
  @media (max-width: 900px) {
    .widget-row {
      gap: 40px 20px;
      grid-template-columns: repeat(2, 1fr);
    }
  }

  /* 1 column for mobile */
  @media (max-width: 600px) {
    .widget-row {
      gap: 32px 14px;
      grid-template-columns: 1fr;
    }
  }

  .widget-row > .widget {
    min-width: 0;
    min-height: 0;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    align-items: stretch;
  }

  /* Widget Base Styles */
  .widget {
    background: linear-gradient(135deg, var(--base) 0%, var(--mantle) 100%);
    border: 1px solid var(--surface0);
    border-radius: 20px;
    padding: clamp(1rem, 2vw, 1.5rem);
    margin: 0;
    display: flex;
    overflow: hidden;
    transition: none;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  }

  .graph-placeholder {
    background: linear-gradient(135deg, var(--base) 0%, var(--mantle) 100%);
    border: 1px solid var(--surface0);
    border-radius: 20px;
    padding: clamp(1rem, 2vw, 1.5rem);
    margin: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  }



  .widget-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: clamp(1rem, 2vw, 1.25rem);
    color: var(--accent);
    position: relative;
    z-index: 2;
  }
  .widget-header h3 {
    font-size: clamp(1.125rem, 2.5vw, 1.5rem);
    font-weight: 700;
    color: var(--text);
    margin: 0;
    flex: 1;
    line-height: 1.2;
    transition: color 0.2s;
  }

  .icon-btn {
    background: rgba(137, 180, 250, 0.1);
    border: 1px solid rgba(137, 180, 250, 0.2);
    border-radius: 6px;
    padding: 0.375rem;
    color: var(--accent);
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon-btn:hover {
    background: rgba(137, 180, 250, 0.2);
    transform: rotate(180deg);
  }

  /* Weather Widget */
  .weather-widget {
    position: relative;
    overflow: hidden;
  }

  .weather-refresh {
    transition: all 0.3s ease;
  }

  .weather-refresh:hover {
    transform: rotate(180deg) scale(1.1);
    box-shadow: 0 4px 12px rgba(137, 180, 250, 0.3);
  }

  .weather-content {
    display: flex;
    flex-direction: column;
    gap: clamp(1rem, 2vw, 1.25rem);
    position: relative;
    z-index: 1;
  }

  .weather-visual {
    display: flex;
    align-items: center;
    gap: clamp(0.75rem, 1.5vw, 1rem);
    padding: clamp(0.5rem, 1vw, 0.75rem);
    background: linear-gradient(135deg, rgba(var(--mantle-rgb), 0.8) 0%, rgba(var(--base-rgb), 0.8) 100%);
    border-radius: 12px;
    border: 1px solid rgba(var(--surface0-rgb), 0.5);
    backdrop-filter: blur(10px);
    position: relative;
    overflow: hidden;
  }

  .weather-icon-container {
    position: relative;
    flex-shrink: 0;
  }

  .weather-icon-bg {
    position: absolute;
    inset: -8px;
    background: rgba(var(--accent-rgb), 0.2);
    border-radius: 50%;
    opacity: 0.3;
    animation: weatherPulse 3s ease-in-out infinite;
  }

  @keyframes weatherPulse {
    0%, 100% { transform: scale(1); opacity: 0.3; }
    50% { transform: scale(1.1); opacity: 0.6; }
  }

  .weather-main-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .weather-condition {
    font-size: clamp(0.8rem, 1.5vw, 0.9rem); /* Reduced size */
    font-weight: 600;
    color: var(--weather-color, var(--accent));
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    letter-spacing: 0.25px;
  }

  .weather-temp {
    font-size: clamp(1rem, 2vw, 1.2rem); /* Reduced size */
    font-weight: 700;
    color: var(--text);
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.35);
  }

  .weather-forecast {
    color: var(--text);
    font-size: clamp(0.9rem, 1.8vw, 1rem);
    line-height: 1.5;
    padding: 0.75rem;
    background: rgba(var(--mantle-rgb), 0.6);
    border-radius: 8px;
    border-left: 3px solid var(--weather-color, var(--accent));
    backdrop-filter: blur(5px);
    position: relative;
  }

  .weather-forecast::before {
    content: '"';
    position: absolute;
    top: -5px;
    left: 10px;
    font-size: 2rem;
    color: var(--weather-color, var(--accent));
    opacity: 0.3;
    font-family: serif;
  }

  .weather-details {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .weather-detail {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    background: rgba(var(--mantle-rgb), 0.4);
    border-radius: 6px;
    border: 1px solid rgba(var(--surface0-rgb), 0.3);
    font-size: clamp(0.8rem, 1.6vw, 0.9rem);
    color: var(--subtext0);
    transition: all 0.2s ease;
  }

  .weather-detail:hover {
    background: rgba(var(--mantle-rgb), 0.6);
    transform: translateX(2px);
  }

  .detail-icon {
    font-size: 1rem;
    opacity: 1;
  }

  .detail-label {
    font-weight: 600;
    color: var(--text);
  }

  .detail-value {
    color: var(--text);
    font-weight: 500;
  }

  .commit-tooltip {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--base);
    border: 1px solid var(--surface1);
    border-radius: 12px;
    padding: 1rem;
    max-width: 420px;
    box-shadow: 0 12px 48px rgba(0, 0, 0, 0.5);
    z-index: 1000;
  }

  .tooltip-header { font-size: 1rem; color: var(--text); margin-bottom: 0.5rem; }
  .tooltip-meta { display:flex; gap: 1rem; font-size: 0.9rem; color: var(--subtext1); margin-bottom: 0.5rem; }
  .tooltip-changes { display:flex; gap: 1rem; font-size: 0.9rem; }

  /* Contact Widget */
  .contact-content {
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: space-between;
    gap: 1rem;
  }

  .contact-description {
    color: #a6adc8;
    font-size: clamp(0.9rem, 1.8vw, 1rem);
    line-height: 1.5;
    margin: 0;
    text-align: left;
  }

  .book-chat-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.375rem;
    padding: 0.5rem 1rem;
    width: 75%;
    margin: 0.5rem auto 0 auto; /* Center horizontally and add top margin */
    background: var(--accent);
    border: 1px solid var(--accent);
    border-radius: 8px;
    color: #1e1e2e; /* Dark text on accent background */
    text-decoration: none;
    font-size: 0.85rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    margin-top: 1rem;
  }

  .book-chat-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--accent) 30%, transparent), transparent);
    transition: left 0.5s ease;
  }

  .book-chat-btn:hover {
    background: color-mix(in srgb, var(--accent) 90%, black);
    border-color: color-mix(in srgb, var(--accent) 90%, black);
    color: #1e1e2e;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px color-mix(in srgb, var(--accent) 50%, transparent);
  }

  .book-chat-btn:hover::before {
    left: 100%;
  }

  .btn-icon {
    font-size: 1em;
  }

  .btn-text {
    font-weight: 600;
  }

  /* Responsive Design */
  @media (max-width: 1024px) {
    .widget-row {
      grid-template-columns: repeat(2, 1fr);
      gap: 44px 24px;
    }

    .contact-widget {
      grid-column: span 2;
      display: flex;
      flex-direction: column;
    }
  }

  @media (max-width: 640px) {
    .widget-row {
      grid-template-columns: 1fr;
      gap: 36px 14px;
    }

    .contact-widget {
      grid-column: 1;
    }
  }

  /* Reduce title size on desktop */
  @media (min-width: 1024px) {
    .widget-header h3 {
      font-size: 1.125rem;
    }
  }

  /* Location Widget */
  .location-widget {
    position: relative;
    overflow: hidden;
  }

  .location-content {
    display: flex;
    flex-direction: column;
    gap: clamp(1rem, 2vw, 1.25rem);
    position: relative;
    z-index: 1;
    align-items: center;
  }

  .location-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 1rem;
  }

  .map-placeholder {
    width: 100%;
    max-width: 400px;
    height: 180px;
    border-radius: 12px;
    background: linear-gradient(135deg, var(--base) 0%, var(--mantle) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  }

  .placeholder-spinner {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    border: 3px solid rgba(137, 180, 250, 0.2);
    border-top: 3px solid #89b4fa;
    animation: spin 1s linear infinite;
  }

  .time-display {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-family: 'JetBrains Mono', monospace;
    font-size: clamp(0.8rem, 1.5vw, 1rem);
    font-weight: 600;
    color: var(--accent);
    padding: 0.4rem 0.6rem;
    background: rgba(var(--mantle-rgb), 0.6);
    border-radius: 6px;
    border: 1px solid rgba(var(--surface0-rgb), 0.5);
    backdrop-filter: blur(5px);
    cursor: pointer;
    transition: all 0.3s ease;
    justify-content: flex-start;
    width: fit-content;
    margin: 0;
  }

  .time-display:hover {
    background: rgba(var(--mantle-rgb), 0.8);
    border-color: rgba(var(--accent-rgb), 0.3);
    transform: translateY(-1px);
  }

  .time-display:focus {
    outline: 2px solid rgba(var(--accent-rgb), 0.5);
    outline-offset: 2px;
  }

  /* svelte-ignore css-unused-selector - Used in time display component */
  .time-icon {
    color: var(--accent);
    flex-shrink: 0;
    margin-right: 0.5rem;
    transition: all 0.3s ease;
  }

  /* svelte-ignore css-unused-selector - Used in time display hover state */
  .time-display:hover .time-icon {
    transform: scale(1.1);
  }

  .time-segment {
    background: rgba(var(--accent-rgb), 0.1);
    padding: 0.25rem 0.4rem;
    border-radius: 4px;
    min-width: 30px;
    text-align: center;
    transition: all 0.3s ease;
    font-size: 0.8rem;
  }

  .time-segment.seconds {
    color: var(--yellow);
    animation: pulse 1s ease-in-out infinite;
    background: rgba(249, 226, 175, 0.1);
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.6; }
  }

  .time-separator {
    font-size: 1rem;
    font-weight: 600;
    color: var(--surface1);
  }

  .location-label {
    background: rgba(var(--mantle-rgb), 0.9);
    color: var(--text);
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.85rem;
    font-weight: 600;
    font-family: 'JetBrains Mono', monospace;
    border: 1px solid rgba(49, 50, 68, 0.5);
    backdrop-filter: blur(10px);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

</style>