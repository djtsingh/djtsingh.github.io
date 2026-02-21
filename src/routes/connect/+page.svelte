<script>
  import SEO from '$lib/components/SEO.svelte';
  import { onMount } from 'svelte';

  let mounted = $state(false);
  let activeTab = $state('all');

  // Social platforms
  const socials = [
    {
      id: 'github',
      name: 'GitHub',
      handle: '@djtsingh',
      url: 'https://github.com/djtsingh',
      category: 'social',
      description: 'Open source contributions and project repositories',
      icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
      color: '#f5c2e7',
      colorRgb: '245, 194, 231'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      handle: '@djtsingh',
      url: 'https://www.linkedin.com/in/djtsingh/',
      category: 'social',
      description: 'Professional network and career updates',
      icon: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z',
      color: '#89b4fa',
      colorRgb: '137, 180, 250'
    },
    {
      id: 'twitter',
      name: 'X / Twitter',
      handle: '@djt5ingh',
      url: 'https://x.com/djt5ingh',
      category: 'social',
      description: 'Tech thoughts and industry discussions',
      icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
      color: '#cdd6f4',
      colorRgb: '205, 214, 244'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      handle: '@dj5ingh',
      url: 'https://instagram.com/dj5ingh',
      category: 'social',
      description: 'Personal moments and creative side',
      icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
      color: '#f5c2e7',
      colorRgb: '245, 194, 231'
    },
    {
      id: 'wakatime',
      name: 'WakaTime',
      handle: '@djtsingh',
      url: 'https://wakatime.com/@djtsingh',
      category: 'social',
      description: 'Coding activity and productivity metrics',
      icon: 'M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10zm-1-6h2v-2h-2v2zm0-4h2V7h-2v5z',
      color: '#a6e3a1',
      colorRgb: '166, 227, 161'
    }
  ];

  // Coding platforms
  const codingPlatforms = [
    {
      id: 'leetcode',
      name: 'LeetCode',
      handle: '@djtsingh',
      url: 'https://leetcode.com/djtsingh',
      category: 'coding',
      description: 'Algorithm & data structure problem solving',
      iconUrl: 'https://img.icons8.com/external-tal-revivo-color-tal-revivo/96/external-level-up-your-coding-skills-and-quickly-land-a-job-logo-color-tal-revivo.png',
      color: '#FFA116',
      colorRgb: '255, 161, 22',
      stats: { label: 'Problems', value: '500+' }
    },
    {
      id: 'codeforces',
      name: 'Codeforces',
      handle: '@daljeets',
      url: 'https://codeforces.com/profile/daljeets',
      category: 'coding',
      description: 'Competitive programming contests',
      iconUrl: 'https://img.icons8.com/external-tal-revivo-color-tal-revivo/96/external-codeforces-programming-competitions-and-contests-programming-community-logo-color-tal-revivo.png',
      color: '#1F8ACB',
      colorRgb: '31, 138, 203',
      stats: { label: 'Status', value: 'Active' }
    },
    {
      id: 'hackerrank',
      name: 'HackerRank',
      handle: '@djtsingh',
      url: 'https://hackerrank.com/djtsingh',
      category: 'coding',
      description: 'Skill certifications and challenges',
      iconUrl: 'https://img.icons8.com/external-tal-revivo-color-tal-revivo/96/external-hackerrank-is-a-technology-company-that-focuses-on-competitive-programming-logo-color-tal-revivo.png',
      color: '#00EA64',
      colorRgb: '0, 234, 100',
      stats: { label: 'Badges', value: 'Gold' }
    },
    {
      id: 'codechef',
      name: 'CodeChef',
      handle: '@djtsingh',
      url: 'https://codechef.com/users/djtsingh',
      category: 'coding',
      description: 'Long challenges and practice',
      iconUrl: 'https://img.icons8.com/external-tal-revivo-color-tal-revivo/96/external-codechef-an-indian-based-competitive-programming-website-logo-color-tal-revivo.png',
      color: '#5B4638',
      colorRgb: '91, 70, 56',
      stats: { label: 'Stars', value: 'Rated' }
    },
    {
      id: 'gfg',
      name: 'GeeksforGeeks',
      handle: '@djtsingh',
      url: 'https://auth.geeksforgeeks.org/user/djtsingh',
      category: 'coding',
      description: 'DSA practice and learning',
      iconUrl: 'https://img.icons8.com/color/96/GeeksforGeeks.png',
      color: '#2F8D46',
      colorRgb: '47, 141, 70',
      stats: { label: 'Problems', value: '200+' }
    }
  ];

  const tabs = [
    { id: 'all', label: 'All', icon: '🌐' },
    { id: 'social', label: 'Social', icon: '👥' },
    { id: 'coding', label: 'Coding', icon: '💻' }
  ];

  // Combine all platforms for filtering
  const allPlatforms = [...socials, ...codingPlatforms];

  let filteredPlatforms = $derived(
    activeTab === 'all' 
      ? allPlatforms 
      : allPlatforms.filter(p => p.category === activeTab)
  );

  onMount(() => {
    mounted = true;
  });

  function setTab(tab) {
    activeTab = tab;
  }
</script>

<SEO 
  title="Connect | Daljeet Singh"
  description="Connect with Daljeet Singh across social media and coding platforms. Find me on GitHub, LinkedIn, LeetCode, Codeforces, and more."
  canonical="https://djtsingh.github.io/connect"
  type="website"
/>

<div class="connect-page" class:mounted>
  <!-- Page Header -->
  <header class="page-header">
    <p class="kicker">Get in touch</p>
    <h1>
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
      <span>Connect</span>
    </h1>
    <p class="lead">Find me across the web. Social profiles, coding platforms, and ways to reach out.</p>
  </header>

  <!-- Tab Navigation -->
  <nav class="tab-nav">
    {#each tabs as tab}
      <button 
        class="tab-btn" 
        class:active={activeTab === tab.id}
        onclick={() => setTab(tab.id)}
      >
        <span class="tab-icon">{tab.icon}</span>
        <span class="tab-label">{tab.label}</span>
      </button>
    {/each}
  </nav>

  <!-- Platforms Grid -->
  <section class="platforms-section">
    <div class="platforms-grid">
      {#each filteredPlatforms as platform, i}
        <a 
          href={platform.url} 
          class="platform-card"
          class:is-coding={platform.category === 'coding'}
          target="_blank"
          rel="noopener noreferrer"
          style="--platform-color: {platform.color}; --platform-rgb: {platform.colorRgb}; --delay: {i * 0.05}s"
        >
          <div class="card-glow"></div>
          
          <div class="card-header">
            <div class="platform-icon">
              {#if platform.iconUrl}
                <img src={platform.iconUrl} alt="{platform.name}" loading="lazy" />
              {:else}
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                  <path d={platform.icon}/>
                </svg>
              {/if}
            </div>
            <span class="platform-type">{platform.category === 'coding' ? 'Coding' : 'Social'}</span>
          </div>
          
          <div class="card-body">
            <h3 class="platform-name">{platform.name}</h3>
            <p class="platform-handle">{platform.handle}</p>
            <p class="platform-desc">{platform.description}</p>
          </div>

          {#if platform.stats}
            <div class="card-stat">
              <span class="stat-value">{platform.stats.value}</span>
              <span class="stat-label">{platform.stats.label}</span>
            </div>
          {/if}
          
          <div class="card-footer">
            <span class="visit-text">Visit Profile</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M7 17L17 7"/>
              <path d="M7 7h10v10"/>
            </svg>
          </div>
        </a>
      {/each}
    </div>
  </section>

  <!-- Contact Section -->
  <section class="contact-section">
    <div class="contact-card">
      <div class="contact-content">
        <h2>Direct Contact</h2>
        <p>Prefer email? Reach out directly for collaborations, opportunities, or just to say hi.</p>
        <a href="mailto:hi@daljeetsingh.me" class="email-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect width="20" height="16" x="2" y="4" rx="2"/>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
          </svg>
          hi@daljeetsingh.me
        </a>
      </div>
      <div class="qr-section">
        <img src="/assets/My_QR_Code.svg" alt="QR Code - Daljeet Singh Contact" class="qr-code" />
        <p class="qr-label">Scan to connect</p>
      </div>
    </div>
  </section>
</div>

<style>
  .connect-page {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 1rem;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }

  .connect-page.mounted {
    opacity: 1;
    transform: translateY(0);
  }

  /* ===== PAGE HEADER ===== */
  .page-header {
    margin-bottom: 2rem;
    text-align: center;
  }

  .kicker {
    margin: 0 0 0.5rem;
    font-size: 0.75rem;
    font-weight: var(--font-weight-semibold);
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
    font-weight: var(--font-weight-bold);
    color: var(--text);
  }

  .page-header h1 svg {
    color: var(--accent);
    flex-shrink: 0;
  }

  .lead {
    margin: 0;
    max-width: 50ch;
    margin-inline: auto;
    font-size: 1rem;
    line-height: 1.6;
    color: var(--subtext1);
  }

  /* ===== TAB NAVIGATION ===== */
  .tab-nav {
    display: flex;
    justify-content: center;
    gap: 0.75rem;
    padding: 1rem 0;
    margin-bottom: 2rem;
    border-bottom: 1px solid var(--surface0);
  }

  .tab-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 1.25rem;
    background: transparent;
    border: 1px solid var(--surface1);
    border-radius: var(--radius-full);
    color: var(--subtext1);
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .tab-btn:hover {
    border-color: var(--accent);
    color: var(--text);
  }

  .tab-btn.active {
    background: rgba(var(--accent-rgb), 0.15);
    border-color: var(--accent);
    color: var(--accent);
  }

  .tab-icon {
    font-size: 1rem;
  }

  /* ===== PLATFORMS GRID ===== */
  .platforms-section {
    padding: 0 0 2rem;
  }

  .platforms-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.25rem;
  }

  .platform-card {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 1.25rem;
    background: var(--mantle);
    border: 1px solid var(--surface0);
    border-radius: var(--radius-lg);
    text-decoration: none;
    color: var(--text);
    overflow: hidden;
    transition: all 0.3s ease;
    opacity: 0;
    transform: translateY(15px);
    animation: fadeInUp 0.4s ease forwards;
    animation-delay: var(--delay);
  }

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .platform-card:hover {
    border-color: var(--platform-color);
    transform: translateY(-3px);
    box-shadow: 0 8px 32px rgba(var(--platform-rgb), 0.12);
  }

  .card-glow {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--platform-color), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .platform-card:hover .card-glow {
    opacity: 1;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
  }

  .platform-icon {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--surface0);
    border-radius: var(--radius-md);
    color: var(--platform-color);
    transition: all 0.3s ease;
  }

  .platform-icon img {
    width: 32px;
    height: 32px;
    object-fit: contain;
  }

  .platform-card:hover .platform-icon {
    background: var(--platform-color);
    color: var(--crust);
    transform: rotate(-5deg) scale(1.05);
  }

  .platform-card:hover .platform-icon img {
    filter: brightness(0) invert(1);
  }

  .platform-card.is-coding:hover .platform-icon img {
    filter: none;
  }

  .platform-card.is-coding:hover .platform-icon {
    background: var(--surface1);
  }

  .platform-type {
    font-size: 0.65rem;
    padding: 0.2rem 0.5rem;
    background: var(--surface0);
    border-radius: var(--radius-full);
    color: var(--subtext0);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .card-body {
    flex: 1;
    margin-bottom: 0.75rem;
  }

  .platform-name {
    font-size: 1.1rem;
    font-weight: var(--font-weight-semibold);
    margin: 0 0 0.25rem;
    color: var(--text);
    transition: color 0.2s ease;
  }

  .platform-card:hover .platform-name {
    color: var(--platform-color);
  }

  .platform-handle {
    font-size: 0.8rem;
    color: var(--platform-color);
    margin: 0 0 0.5rem;
    font-family: 'JetBrains Mono', monospace;
  }

  .platform-desc {
    font-size: 0.8rem;
    line-height: 1.5;
    color: var(--subtext1);
    margin: 0;
  }

  .card-stat {
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
    padding: 0.75rem 0;
    border-top: 1px solid var(--surface0);
    margin-bottom: 0.5rem;
  }

  .stat-value {
    font-size: 1rem;
    font-weight: var(--font-weight-semibold);
    color: var(--text);
  }

  .stat-label {
    font-size: 0.7rem;
    color: var(--subtext1);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--subtext1);
    font-size: 0.8rem;
    padding-top: 0.5rem;
    border-top: 1px solid var(--surface0);
    transition: color 0.2s ease;
  }

  .platform-card:hover .card-footer {
    color: var(--platform-color);
  }

  .card-footer svg {
    transition: transform 0.2s ease;
  }

  .platform-card:hover .card-footer svg {
    transform: translate(2px, -2px);
  }

  /* ===== CONTACT SECTION ===== */
  .contact-section {
    padding: 2rem 0 3rem;
  }

  .contact-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    padding: 2rem;
    background: var(--base);
    border: 1px solid var(--surface0);
    border-radius: var(--radius-lg);
  }

  .contact-content {
    flex: 1;
  }

  .contact-content h2 {
    margin: 0 0 0.5rem;
    font-size: 1.25rem;
    font-weight: var(--font-weight-semibold);
    color: var(--text);
  }

  .contact-content p {
    margin: 0 0 1.25rem;
    font-size: 0.9rem;
    color: var(--subtext1);
    line-height: 1.5;
  }

  .email-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    background: var(--accent);
    color: var(--crust);
    border-radius: var(--radius-md);
    font-size: 0.9rem;
    font-weight: var(--font-weight-medium);
    text-decoration: none;
    transition: all 0.2s ease;
  }

  .email-btn:hover {
    filter: brightness(1.1);
    transform: translateY(-2px);
  }

  .qr-section {
    text-align: center;
    flex-shrink: 0;
  }

  .qr-code {
    width: 120px;
    height: 120px;
    padding: 0.75rem;
    background: var(--surface0);
    border-radius: var(--radius-md);
  }

  .qr-label {
    margin: 0.5rem 0 0;
    font-size: 0.75rem;
    color: var(--subtext0);
  }

  /* ===== RESPONSIVE ===== */
  @media (max-width: 768px) {
    .tab-nav {
      gap: 0.5rem;
    }

    .tab-btn {
      padding: 0.5rem 1rem;
      font-size: 0.8rem;
    }

    .platforms-grid {
      grid-template-columns: 1fr;
    }

    .contact-card {
      flex-direction: column;
      text-align: center;
    }

    .contact-content {
      order: 1;
    }

    .qr-section {
      order: 2;
    }
  }

  @media (max-width: 480px) {
    .tab-label {
      display: none;
    }

    .tab-btn.active .tab-label {
      display: inline;
    }

    .platform-card {
      padding: 1rem;
    }

    .contact-card {
      padding: 1.5rem;
    }
  }
</style>
