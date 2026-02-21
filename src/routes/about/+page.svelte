<script>
  import SEO from '$lib/components/SEO.svelte';
  
  // Obfuscated email to prevent spam bots
  const emailParts = ['daljeetsingh-', 'outlook', 'com'];
  
  function handleEmailClick(e) {
    e.preventDefault();
    const email = `${emailParts[0]}@${emailParts[1]}.${emailParts[2]}`;
    window.location.href = `mailto:${email}`;
  }
</script>

<SEO 
  title="About Me | Daljeet Singh Lotey"
  description="About Daljeet Singh Lotey | Software Engineering and Data Science. Background in data, algorithms and full-stack engineering."
  canonical="https://djtsingh.github.io/about"
  type="profile"
/>

<div class="about-page">
  <div class="about-grid">
    <!-- Portrait -->
    <div class="portrait">
      <img 
        src="/assets/optimized/dj-web.webp" 
        alt="Animated Portrait of Daljeet Singh Lotey" 
        class="portrait-img"
        loading="lazy"
        decoding="async"
        width="400"
        height="400"
      />
    </div>

    <!-- Content -->
    <div class="about-content">
      <p class="about-lead">
        Hey! I am Daljeet Singh Lotey <a href="/connect" class="inline-link">(@djtsingh)</a>. I build software that matters: from scalable systems, to creative tools and experiments <a href="/projects" class="inline-link">(cool projects)</a> in my free time. I'm a recent CS grad with a background in data, algorithms, and full-stack engineering.
      </p>

      <p>
      I’m a total builder at heart, I love picking up new tech and seeing what I can create with it. That curiosity is what drove me to build <a href="/projects/janus" class="inline-link">Janus</a> to stop bots, dive deep into computer vision for my research paper, and why I'm currently obsessing over data patterns for my <a href="/projects/market-prediction" class="inline-link">market prediction</a> project. I just really enjoy the process of learning, breaking things, and making them work better.
      </p>

      <div class="about-sub">
        <p>I’m also big on backing up that experimentation with solid foundations. You can check out my <a href="/certifications" class="inline-link">certifications</a> to see the formal skills behind the code. My interests include machine learning, product design, and open-source tooling. When not coding, I like to explore computational design and gaming.</p>
      </div>

      <div class="about-socials">
        <a href="https://github.com/djtsingh" target="_blank" rel="noopener noreferrer" class="social-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          <span>GitHub</span>
        </a>
        <a href="https://www.linkedin.com/in/djtsingh/" target="_blank" rel="noopener noreferrer" class="social-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          <span>LinkedIn</span>
        </a>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <a href="/" on:click={handleEmailClick} class="social-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          <span>Email</span>
        </a>
      </div>
    </div>
  </div>
  
  <!-- Tools & Uses Section -->
  <section class="uses-section">
    <h2 class="section-title">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
      <span>Tools & Setup</span>
    </h2>
    <div class="uses-grid">
      <div class="use-category">
        <h3>Development</h3>
        <ul class="use-list">
          <li><span class="tool-name">VS Code</span> <span class="tool-detail">Primary editor</span></li>
          <li><span class="tool-name">Python</span> <span class="tool-detail">Backend & ML</span></li>
          <li><span class="tool-name">JavaScript/TypeScript</span> <span class="tool-detail">Frontend</span></li>
          <li><span class="tool-name">Docker</span> <span class="tool-detail">Containerization</span></li>
        </ul>
      </div>
      
      <div class="use-category">
        <h3>Design</h3>
        <ul class="use-list">
          <li><span class="tool-name">Figma</span> <span class="tool-detail">UI/UX design</span></li>
          <li><span class="tool-name">Tailwind CSS</span> <span class="tool-detail">Styling</span></li>
        </ul>
      </div>
      
      <div class="use-category">
        <h3>Hardware</h3>
        <ul class="use-list">
          <li><span class="tool-name">MacBook Air</span> <span class="tool-detail">M4, 16GB</span></li>
          <li><span class="tool-name">External Monitor</span> <span class="tool-detail">27" 4K</span></li>
        </ul>
      </div>
      
      <div class="use-category">
        <h3>Productivity</h3>
        <ul class="use-list">
          <li><span class="tool-name">Notion</span> <span class="tool-detail">Notes & planning</span></li>
          <li><span class="tool-name">Linear</span> <span class="tool-detail">Project management</span></li>
        </ul>
      </div>
    </div>
  </section>
</div>

<div class="about-page">
  <div class="about-grid">
    <!-- Social Links (keeping existing) -->
    <div class="about-content" style="display: none;">
      <div class="about-socials">
        <a href="https://github.com/djtsingh" target="_blank" rel="noopener noreferrer" class="social-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          <span>GitHub</span>
        </a>
        <a href="https://www.linkedin.com/in/djtsingh/" target="_blank" rel="noopener noreferrer" class="social-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          <span>LinkedIn</span>
        </a>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <a href="/" on:click={handleEmailClick} class="social-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          <span>Email</span>
        </a>
      </div>
    </div>
  </div>
</div>

<style>
  .about-page {
    max-width: 1100px;
    margin: 0 auto;
    padding-top: 1.5rem;
  }
  
  .about-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    align-items: start;
  }
  
  @media (min-width: 768px) {
    .about-grid {
      grid-template-columns: minmax(250px, 320px) 1fr;
      gap: 3rem;
    }
  }
  
  .portrait {
    position: relative;
  }
  
  .portrait-img {
    width: 100%;
    max-width: 100%;
    border-radius: var(--radius-lg);
    border: 1px solid var(--surface0);
    object-fit: cover;
  }
  
  .about-content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .about-lead {
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.7;
    color: var(--subtext1);
  }
  
  .about-content p {
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.7;
    color: var(--subtext1);
  }
  
  .about-sub p {
    margin: 0;
  }
  
  .about-socials {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    padding-top: 0.5rem;
  }
  
  .social-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.65rem 1rem;
    font-size: 0.875rem;
    font-weight: var(--font-weight-medium);
    color: var(--text);
    background: transparent;
    border: 1px solid var(--surface1);
    border-radius: var(--radius-full);
    transition: all 0.2s ease;
    text-decoration: none;
    position: relative;
    overflow: hidden;
  }
  
  .social-link::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--accent);
    opacity: 0;
    transition: opacity 0.2s ease;
    z-index: 0;
  }
  
  .social-link svg,
  .social-link span {
    position: relative;
    z-index: 1;
  }
  
  .social-link svg {
    flex-shrink: 0;
    transition: transform 0.2s ease;
  }
  
  .social-link:hover {
    border-color: var(--accent);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  .social-link:hover::before {
    opacity: 0.1;
  }
  
  .social-link:hover svg {
    transform: scale(1.1);
  }
  
  .social-link:active {
    transform: translateY(0);
  }
  
  /* Uses Section */
  .section-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 2rem;
  }
  
  .section-title svg {
    color: var(--accent);
    flex-shrink: 0;
  }
  
  /* Uses Section */
  .uses-section {
    margin-top: 4rem;
    padding-top: 3rem;
    border-top: 1px solid var(--surface0);
  }
  
  .uses-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    font-size: 13px;
  }

  @media (min-width: 640px) {
    .uses-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 1.25rem;
      font-size: 14px;
    }
  }

  @media (min-width: 1024px) {
    .uses-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
      font-size: 14px;
    }
  }

  @media (min-width: 1400px) {
    .uses-grid {
      grid-template-columns: repeat(4, 1fr);
      gap: 2rem;
      font-size: 15px;
    }
  }
  
  .use-category h3 {
    font-size: 0.9rem;
    font-weight: var(--font-weight-semibold);
    color: var(--text);
    margin-bottom: 0.5rem;
    padding-bottom: 0.25rem;
    border-bottom: 2px solid var(--accent);
  }

  @media (min-width: 640px) {
    .use-category h3 {
      font-size: 1rem;
      margin-bottom: 0.75rem;
      padding-bottom: 0.5rem;
    }
  }
  
  .use-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .use-list li {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 0.3rem 0;
    border-bottom: 1px solid var(--surface0);
    gap: 0.5rem;
  }

  @media (min-width: 640px) {
    .use-list li {
      padding: 0.4rem 0;
      gap: 0.75rem;
    }
  }
  
  .use-list li:last-child {
    border-bottom: none;
  }
  
  .tool-name {
    font-weight: var(--font-weight-medium);
    color: var(--text);
    font-size: 0.9rem;
  }
  
  .tool-detail {
    font-size: 0.8rem;
    font-weight: var(--font-weight-light);
    color: var(--subtext1);
    text-align: right;
    white-space: nowrap;
  }
</style>
