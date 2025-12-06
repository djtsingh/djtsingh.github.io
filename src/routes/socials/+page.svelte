<script>
  import SEO from '$lib/components/SEO.svelte';
  
  const socials = [
    {
      platform: 'GitHub',
      handle: '@djtsingh',
      url: 'https://github.com/djtsingh',
      icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
      color: '#f5c2e7'
    },
    {
      platform: 'LinkedIn',
      handle: '@djtsingh',
      url: 'https://www.linkedin.com/in/djtsingh/',
      icon: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z',
      color: '#89b4fa'
    },
    {
      platform: 'X / Twitter',
      handle: '@djt5ingh',
      url: 'https://x.com/djt5ingh',
      icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
      color: '#cdd6f4'
    },
    {
      platform: 'Instagram',
      handle: '@dj5ingh',
      url: 'https://instagram.com/dj5ingh',
      icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
      color: '#f5c2e7'
    },
    {
      platform: 'WakaTime',
      handle: '@djtsingh',
      url: 'https://wakatime.com/@djtsingh',
      icon: 'M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10zm-1-6h2v-2h-2v2zm0-4h2V7h-2v5z',
      color: '#a6e3a1'
    }
  ];
  
  // Email obfuscation
  const emailParts = ['daljeetsingh-', 'outlook', 'com'];
  
  function handleEmailClick(e) {
    e.preventDefault();
    const email = `${emailParts[0]}@${emailParts[1]}.${emailParts[2]}`;
    window.location.href = `mailto:${email}`;
  }
</script>

<SEO 
  title="Socials | Daljeet Singh Lotey"
  description="Connect with Daljeet Singh Lotey on various platforms — GitHub, LinkedIn, Twitter, and more."
  canonical="https://djtsingh.github.io/socials"
  type="website"
/>

<div class="socials-page">
  <header class="page-header">
    <p class="kicker">Let's connect</p>
    <h1>
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
      <span>Social Links</span>
    </h1>
    <p class="lead">Find me across the web. Feel free to reach out, follow, or just say hi.</p>
  </header>

  <div class="socials-grid">
    {#each socials as social}
      <a 
        href={social.url} 
        class="social-card"
        target="_blank"
        rel="noopener noreferrer"
        style="--card-color: {social.color}"
      >
        <div class="social-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <path d={social.icon}/>
          </svg>
        </div>
        <div class="social-content">
          <h3 class="social-platform">{social.platform}</h3>
          <p class="social-handle">{social.handle}</p>
        </div>
        <div class="social-arrow">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M7 17L17 7M17 7H7M17 7v10"/>
          </svg>
        </div>
      </a>
    {/each}
  </div>

  <!-- Email Contact -->
  <div class="email-contact">
    <p>Want to reach me? Email at <a href="mailto:hi@daljeetsingh.me" class="email-link">hi@daljeetsingh.me</a></p>
  </div>

  <!-- QR Code Section (Optional) -->
  <section class="qr-section">
    <h2>Quick Connect</h2>
    <p class="qr-desc">Scan to save my contact or visit my portfolio</p>
    <div class="qr-container">
      <img src="/assets/My_QR_Code.svg" alt="QR Code - Daljeet Singh Contact" class="qr-code" />
    </div>
  </section>
</div>

<style>
  .socials-page {
    max-width: 1000px;
    margin: 0 auto;
  }

  .page-header {
    margin-bottom: 3rem;
    text-align: center;
  }

  .kicker {
    margin: 0 0 0.5rem;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--accent);
  }

  .page-header h1 {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin: 0 0 0.75rem;
    font-size: clamp(2rem, 5vw, 2.5rem);
    font-weight: 700;
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

  .socials-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    margin-bottom: 4rem;
  }

  .social-card {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.25rem;
    background: var(--base);
    border: 1px solid var(--surface0);
    border-radius: var(--radius-lg);
    transition: all var(--duration-normal) var(--ease-smooth);
    position: relative;
    overflow: hidden;
    cursor: pointer;
  }

  .social-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, var(--card-color), transparent);
    opacity: 0;
    transition: opacity var(--duration-normal) var(--ease-smooth);
  }

  .social-card:hover {
    transform: translateY(-4px);
    border-color: var(--card-color);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  }

  .social-card:hover::before {
    opacity: 0.1;
  }

  .social-icon {
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--surface0);
    border-radius: var(--radius-md);
    color: var(--card-color);
    transition: all var(--duration-normal) var(--ease-smooth);
    position: relative;
    z-index: 1;
  }

  .social-card:hover .social-icon {
    background: var(--card-color);
    color: var(--crust);
    transform: rotate(-5deg) scale(1.1);
  }

  .social-content {
    flex: 1;
    position: relative;
    z-index: 1;
  }

  .social-platform {
    margin: 0 0 0.25rem;
    font-size: 1rem;
    font-weight: 600;
    color: var(--text);
    transition: color var(--duration-fast) var(--ease-smooth);
  }

  .social-card:hover .social-platform {
    color: var(--card-color);
  }

  .social-handle {
    margin: 0;
    font-size: 0.875rem;
    font-family: 'JetBrains Mono', monospace;
    color: var(--subtext1);
    transition: color var(--duration-fast) var(--ease-smooth);
  }

  .social-card:hover .social-handle {
    color: var(--card-color);
  }

  .social-arrow {
    flex-shrink: 0;
    color: var(--subtext1);
    transition: all var(--duration-normal) var(--ease-smooth);
    position: relative;
    z-index: 1;
  }

  .social-card:hover .social-arrow {
    color: var(--card-color);
    transform: translate(2px, -2px);
  }

  /* Email Contact Section */
  .email-contact {
    margin-top: 3rem;
    margin-bottom: 2rem;
    text-align: center;
    padding: 2rem;
  }

  .email-contact p {
    font-size: 1.1rem;
    color: var(--text);
    margin: 0;
  }

  /* QR Section */
  .qr-section {
    text-align: center;
    padding: 3rem 2rem;
    background: var(--base);
    border: 1px solid var(--surface0);
    border-radius: var(--radius-lg);
  }

  .qr-section h2 {
    margin: 0 0 0.5rem;
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--text);
  }

  .qr-desc {
    margin: 0 0 2rem;
    color: var(--subtext1);
    font-size: 0.9rem;
  }

  .qr-container {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    background: var(--surface0);
    border: 1px solid var(--surface1);
    border-radius: var(--radius-md);
  }

  .qr-code {
    width: 100%;
    max-width: 200px;
    height: auto;
    display: block;
  }

  @media (max-width: 640px) {
    .social-card {
      flex-direction: column;
      text-align: center;
      padding: 1.25rem;
    }

    .social-arrow {
      display: none;
    }
  }
</style>
