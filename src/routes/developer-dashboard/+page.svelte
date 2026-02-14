<script>
  import SEO from '$lib/components/SEO.svelte';
  import { onMount } from 'svelte';

  let mounted = $state(false);
  let activeCategory = $state('all');

  const platforms = [
    {
      id: 'leetcode',
      name: 'LeetCode',
      handle: '@djtsingh',
      url: 'https://leetcode.com/djtsingh',
      category: 'competitive',
      tagline: 'Algorithm & Data Structure Mastery',
      description: 'Solving complex algorithmic challenges, optimizing solutions for time and space complexity.',
      color: '#FFA116',
      colorRgb: '255, 161, 22',
      icon: 'https://img.icons8.com/external-tal-revivo-color-tal-revivo/96/external-level-up-your-coding-skills-and-quickly-land-a-job-logo-color-tal-revivo.png',
      stats: [
        { label: 'Problems', value: '500+' },
        { label: 'Contests', value: 'Active' }
      ]
    },
    {
      id: 'codeforces',
      name: 'Codeforces',
      handle: '@daljeets',
      url: 'https://codeforces.com/profile/daljeets',
      category: 'competitive',
      tagline: 'Competitive Programming Arena',
      description: 'Competing in timed contests, honing speed and accuracy under pressure.',
      color: '#1F8ACB',
      colorRgb: '31, 138, 203',
      icon: 'https://img.icons8.com/external-tal-revivo-color-tal-revivo/96/external-codeforces-programming-competitions-and-contests-programming-community-logo-color-tal-revivo.png',
      stats: [
        { label: 'Rating', value: 'Active' },
        { label: 'Contests', value: 'Regular' }
      ]
    },
    {
      id: 'hackerrank',
      name: 'HackerRank',
      handle: '@djtsingh',
      url: 'https://hackerrank.com/djtsingh',
      category: 'practice',
      tagline: 'Skill Certification Hub',
      description: 'Verified skills through structured challenges and official certifications.',
      color: '#00EA64',
      colorRgb: '0, 234, 100',
      icon: 'https://img.icons8.com/external-tal-revivo-color-tal-revivo/96/external-hackerrank-is-a-technology-company-that-focuses-on-competitive-programming-logo-color-tal-revivo.png',
      stats: [
        { label: 'Badges', value: 'Gold' },
        { label: 'Certs', value: 'Multiple' }
      ]
    },
    {
      id: 'codechef',
      name: 'CodeChef',
      handle: '@djtsingh',
      url: 'https://codechef.com/users/djtsingh',
      category: 'competitive',
      tagline: 'Long Challenge Specialist',
      description: 'Tackling month-long challenges requiring deep problem analysis and creative solutions.',
      color: '#5B4638',
      colorRgb: '91, 70, 56',
      icon: 'https://img.icons8.com/external-tal-revivo-color-tal-revivo/96/external-codechef-an-indian-based-competitive-programming-website-logo-color-tal-revivo.png',
      stats: [
        { label: 'Stars', value: 'Rated' },
        { label: 'Practice', value: 'Active' }
      ]
    },
    {
      id: 'gfg',
      name: 'GeeksforGeeks',
      handle: '@djtsingh',
      url: 'https://auth.geeksforgeeks.org/user/djtsingh',
      category: 'practice',
      tagline: 'DSA Foundation Builder',
      description: 'Building strong fundamentals through curated problem sets and tutorials.',
      color: '#2F8D46',
      colorRgb: '47, 141, 70',
      icon: 'https://img.icons8.com/color/96/GeeksforGeeks.png',
      stats: [
        { label: 'Problems', value: '200+' },
        { label: 'Rank', value: 'Active' }
      ]
    }
  ];

  const categories = [
    { id: 'all', label: 'All Platforms', icon: '🌐' },
    { id: 'competitive', label: 'Competitive Programming', icon: '🏆' },
    { id: 'practice', label: 'Practice & Certification', icon: '📚' }
  ];

  let filteredPlatforms = $derived(
    activeCategory === 'all' 
      ? platforms 
      : platforms.filter(p => p.category === activeCategory)
  );

  onMount(() => {
    mounted = true;
  });

  function setCategory(cat) {
    activeCategory = cat;
  }
</script>

<SEO 
  title="Developer Dashboard | Daljeet Singh"
  description="Explore my coding journey across LeetCode, Codeforces, HackerRank, CodeChef, and GeeksforGeeks. Verified profiles showcasing algorithmic problem-solving and competitive programming skills."
  canonical="https://djtsingh.github.io/developer-dashboard"
  type="website"
/>

<div class="footprints-page" class:mounted>
  <!-- Hero Header -->
  <header class="page-header">
    <h1 class="page-title">
      <span class="title-text">Developer</span>
      <span class="title-accent">Dashboard</span>
    </h1>
    
    <p class="page-subtitle">
      A verified trail of my coding journey. Each platform represents countless hours of problem-solving, 
      algorithmic thinking, and continuous improvement. Click any card to view my live profile.
    </p>

    <div class="trust-indicators">
      <div class="indicator">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
        <span>Verified Profiles</span>
      </div>
      <div class="indicator">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
        <span>Actively Updated</span>
      </div>
      <div class="indicator">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="M2 17l10 5 10-5"/>
          <path d="M2 12l10 5 10-5"/>
        </svg>
        <span>Multi-Platform Presence</span>
      </div>
    </div>
  </header>

  <!-- Category Filter -->
  <nav class="category-nav">
    {#each categories as cat}
      <button 
        class="category-btn" 
        class:active={activeCategory === cat.id}
        onclick={() => setCategory(cat.id)}
      >
        <span class="cat-icon">{cat.icon}</span>
        <span class="cat-label">{cat.label}</span>
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
          target="_blank"
          rel="noopener noreferrer"
          style="--platform-color: {platform.color}; --platform-rgb: {platform.colorRgb}; --delay: {i * 0.1}s"
        >
          <div class="card-glow"></div>
          
          <div class="card-header">
            <div class="platform-icon">
              <img src={platform.icon} alt="{platform.name} icon" loading="lazy" />
            </div>
            <div class="platform-badge">{platform.category === 'competitive' ? '⚔️ Compete' : '📖 Practice'}</div>
          </div>
          
          <div class="card-body">
            <h3 class="platform-name">{platform.name}</h3>
            <p class="platform-handle">{platform.handle}</p>
            <p class="platform-tagline">{platform.tagline}</p>
            <p class="platform-desc">{platform.description}</p>
          </div>
          
          <div class="card-stats">
            {#each platform.stats as stat}
              <div class="stat">
                <span class="stat-value">{stat.value}</span>
                <span class="stat-label">{stat.label}</span>
              </div>
            {/each}
          </div>
          
          <div class="card-footer">
            <span class="visit-text">View Profile</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M7 17L17 7"/>
              <path d="M7 7h10v10"/>
            </svg>
          </div>
        </a>
      {/each}
    </div>
  </section>

  <!-- Skills Summary -->
  <section class="skills-summary">
    <div class="summary-card">
      <div class="summary-header">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
        </svg>
        <h2>What These Profiles Demonstrate</h2>
      </div>
      <div class="skills-grid">
        <div class="skill-item">
          <span class="skill-icon">🧠</span>
          <div class="skill-content">
            <h4>Algorithmic Thinking</h4>
            <p>Problem decomposition and optimal solution design</p>
          </div>
        </div>
        <div class="skill-item">
          <span class="skill-icon">⚡</span>
          <div class="skill-content">
            <h4>Code Optimization</h4>
            <p>Time and space complexity awareness</p>
          </div>
        </div>
        <div class="skill-item">
          <span class="skill-icon">🎯</span>
          <div class="skill-content">
            <h4>Pressure Performance</h4>
            <p>Delivering solutions under time constraints</p>
          </div>
        </div>
        <div class="skill-item">
          <span class="skill-icon">📈</span>
          <div class="skill-content">
            <h4>Continuous Learning</h4>
            <p>Regular practice and skill improvement</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="cta-section">
    <p class="cta-text">Interested in my complete profile?</p>
    <div class="cta-buttons">
      <a href="/about" class="cta-btn cta-btn--primary">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 16v-4"/>
          <path d="M12 8h.01"/>
        </svg>
        About Me
      </a>
      <a href="/projects" class="cta-btn cta-btn--secondary">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
        </svg>
        View Projects
      </a>
      <a href="/assets/dj-web.pdf" class="cta-btn cta-btn--ghost" target="_blank" rel="noopener noreferrer">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
        </svg>
        Download Resume
      </a>
    </div>
  </section>
</div>

<style>
  .footprints-page {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 1rem;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }

  .footprints-page.mounted {
    opacity: 1;
    transform: translateY(0);
  }

  /* ===== HEADER ===== */
  .page-header {
    text-align: center;
    padding: 3rem 0 2rem;
    position: relative;
  }

  .page-title {
    font-size: clamp(2rem, 6vw, 3.5rem);
    font-weight: var(--font-weight-bold);
    line-height: 1.1;
    margin: 0 0 1rem;
  }

  .title-text {
    display: block;
    color: var(--text);
  }

  .title-accent {
    display: block;
    background: linear-gradient(135deg, var(--accent) 0%, var(--mauve) 50%, var(--pink) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .page-subtitle {
    max-width: 650px;
    margin: 0 auto 2rem;
    font-size: 1rem;
    line-height: 1.7;
    color: var(--subtext1);
  }

  .trust-indicators {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.5rem;
  }

  .indicator {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.85rem;
    color: var(--subtext0);
  }

  .indicator svg {
    color: var(--green);
  }

  /* ===== CATEGORY NAV ===== */
  .category-nav {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.75rem;
    padding: 1.5rem 0;
    border-bottom: 1px solid var(--surface0);
    margin-bottom: 2rem;
  }

  .category-btn {
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

  .category-btn:hover {
    border-color: var(--accent);
    color: var(--text);
  }

  .category-btn.active {
    background: rgba(var(--accent-rgb), 0.15);
    border-color: var(--accent);
    color: var(--accent);
  }

  .cat-icon {
    font-size: 1rem;
  }

  /* ===== PLATFORMS GRID ===== */
  .platforms-section {
    padding: 1rem 0 3rem;
  }

  .platforms-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.5rem;
  }

  .platform-card {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
    background: var(--mantle);
    border: 1px solid var(--surface0);
    border-radius: var(--radius-lg);
    text-decoration: none;
    color: var(--text);
    overflow: hidden;
    transition: all 0.3s ease;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.5s ease forwards;
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
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(var(--platform-rgb), 0.15);
  }

  .card-glow {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
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
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--surface0);
    border-radius: var(--radius-md);
    padding: 0.5rem;
    transition: all 0.3s ease;
  }

  .platform-icon img {
    width: 40px;
    height: 40px;
    object-fit: contain;
  }

  .platform-card:hover .platform-icon {
    transform: scale(1.1);
    background: var(--surface1);
  }

  .platform-badge {
    font-size: 0.7rem;
    padding: 0.25rem 0.6rem;
    background: var(--surface0);
    border-radius: var(--radius-full);
    color: var(--subtext1);
  }

  .card-body {
    flex: 1;
    margin-bottom: 1rem;
  }

  .platform-name {
    font-size: 1.25rem;
    font-weight: var(--font-weight-semibold);
    margin: 0 0 0.25rem;
    color: var(--text);
  }

  .platform-handle {
    font-size: 0.85rem;
    color: var(--platform-color);
    margin: 0 0 0.75rem;
    font-family: 'JetBrains Mono', monospace;
  }

  .platform-tagline {
    font-size: 0.9rem;
    font-weight: var(--font-weight-medium);
    color: var(--subtext0);
    margin: 0 0 0.5rem;
  }

  .platform-desc {
    font-size: 0.85rem;
    line-height: 1.5;
    color: var(--subtext1);
    margin: 0;
  }

  .card-stats {
    display: flex;
    gap: 1.5rem;
    padding: 1rem 0;
    border-top: 1px solid var(--surface0);
    border-bottom: 1px solid var(--surface0);
    margin-bottom: 1rem;
  }

  .stat {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
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
    font-size: 0.85rem;
    transition: color 0.2s ease;
  }

  .platform-card:hover .card-footer {
    color: var(--platform-color);
  }

  .card-footer svg {
    transition: transform 0.2s ease;
  }

  .platform-card:hover .card-footer svg {
    transform: translate(3px, -3px);
  }

  /* ===== SKILLS SUMMARY ===== */
  .skills-summary {
    padding: 2rem 0;
  }

  .summary-card {
    background: var(--mantle);
    border: 1px solid var(--surface0);
    border-radius: var(--radius-lg);
    padding: 2rem;
  }

  .summary-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
    color: var(--accent);
  }

  .summary-header h2 {
    font-size: 1.25rem;
    font-weight: var(--font-weight-semibold);
    margin: 0;
    color: var(--text);
  }

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.25rem;
  }

  .skill-item {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    background: var(--base);
    border-radius: var(--radius-md);
    transition: transform 0.2s ease;
  }

  .skill-item:hover {
    transform: translateX(4px);
  }

  .skill-icon {
    font-size: 1.5rem;
    flex-shrink: 0;
  }

  .skill-content h4 {
    font-size: 0.95rem;
    font-weight: var(--font-weight-medium);
    margin: 0 0 0.25rem;
    color: var(--text);
  }

  .skill-content p {
    font-size: 0.8rem;
    color: var(--subtext1);
    margin: 0;
    line-height: 1.4;
  }

  /* ===== CTA SECTION ===== */
  .cta-section {
    text-align: center;
    padding: 3rem 0 4rem;
    border-top: 1px solid var(--surface0);
    margin-top: 2rem;
  }

  .cta-text {
    font-size: 1.1rem;
    color: var(--subtext0);
    margin: 0 0 1.5rem;
  }

  .cta-buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }

  .cta-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    border-radius: var(--radius-md);
    font-size: 0.9rem;
    font-weight: var(--font-weight-medium);
    text-decoration: none;
    transition: all 0.2s ease;
  }

  .cta-btn--primary {
    background: var(--accent);
    color: var(--crust);
  }

  .cta-btn--primary:hover {
    filter: brightness(1.1);
    transform: translateY(-2px);
  }

  .cta-btn--secondary {
    background: var(--surface0);
    color: var(--text);
    border: 1px solid var(--surface1);
  }

  .cta-btn--secondary:hover {
    background: var(--surface1);
  }

  .cta-btn--ghost {
    background: transparent;
    color: var(--subtext0);
    border: 1px solid var(--surface1);
  }

  .cta-btn--ghost:hover {
    border-color: var(--accent);
    color: var(--accent);
  }

  /* ===== RESPONSIVE ===== */
  @media (max-width: 768px) {
    .page-header {
      padding: 2rem 0 1.5rem;
    }

    .trust-indicators {
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
    }

    .category-nav {
      gap: 0.5rem;
    }

    .category-btn {
      padding: 0.5rem 1rem;
      font-size: 0.8rem;
    }

    .cat-label {
      display: none;
    }

    .category-btn.active .cat-label {
      display: inline;
    }

    .platforms-grid {
      grid-template-columns: 1fr;
    }

    .summary-card {
      padding: 1.5rem;
    }

    .cta-buttons {
      flex-direction: column;
      align-items: stretch;
    }

    .cta-btn {
      justify-content: center;
    }
  }

  @media (max-width: 480px) {
    .page-title {
      font-size: 1.75rem;
    }

    .page-subtitle {
      font-size: 0.9rem;
    }

    .platform-card {
      padding: 1.25rem;
    }

    .skills-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
