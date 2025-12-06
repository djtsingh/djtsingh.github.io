<script>
  import SEO from '$lib/components/SEO.svelte';
  
  const socials = [
    {
      platform: 'GitHub',
      handle: '@djtsingh',
      url: 'https://github.com/djtsingh',
      description: 'Open source projects, code repositories, and contributions',
      icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
      color: '#f5c2e7'
    },
    {
      platform: 'LinkedIn',
      handle: '@djtsingh',
      url: 'https://www.linkedin.com/in/djtsingh/',
      description: 'Professional network, career updates, and industry insights',
      icon: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z',
      color: '#89b4fa'
    },
    {
      platform: 'X / Twitter',
      handle: '@djt5ingh',
      url: 'https://x.com/djt5ingh',
      description: 'Tech thoughts, quick updates, and conversations',
      icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
      color: '#cdd6f4'
    },
    {
      platform: 'Email',
      handle: 'daljeetsingh-@outlook.com',
      url: 'mailto:daljeetsingh-@outlook.com',
      description: 'Get in touch for collaborations, opportunities, or questions',
      icon: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z',
      color: '#a6e3a1'
    },
    {
      platform: 'Portfolio',
      handle: 'daljeetsingh.me',
      url: 'https://djtsingh.github.io',
      description: 'Personal website showcasing projects and experience',
      icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z',
      color: '#fab387'
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
    <h1>Social Links</h1>
    <p class="lead">Find me across the web. Feel free to reach out, follow, or just say hi.</p>
  </header>

  <div class="socials-grid">
    {#each socials as social}
      <a 
        href={social.url} 
        class="social-card"
        target={social.platform !== 'Email' ? '_blank' : undefined}
        rel={social.platform !== 'Email' ? 'noopener noreferrer' : undefined}
        on:click={social.platform === 'Email' ? handleEmailClick : undefined}
        style="--card-color: {social.color}"
      >
        <div class="social-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
            <path d={social.icon}/>
          </svg>
        </div>
        <div class="social-content">
          <h3 class="social-platform">{social.platform}</h3>
          <p class="social-handle">{social.handle}</p>
          <p class="social-desc">{social.description}</p>
        </div>
        <div class="social-arrow">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M7 17L17 7M17 7H7M17 7v10"/>
          </svg>
        </div>
      </a>
    {/each}
  </div>

  <!-- QR Code Section (Optional) -->
  <section class="qr-section">
    <h2>Quick Connect</h2>
    <p class="qr-desc">Scan to save my contact or visit my portfolio</p>
    <div class="qr-placeholder">
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect width="5" height="5" x="3" y="3" rx="1"/>
        <rect width="5" height="5" x="16" y="3" rx="1"/>
        <rect width="5" height="5" x="3" y="16" rx="1"/>
        <path d="M21 16h-3a2 2 0 0 0-2 2v3"/>
        <path d="M21 21v.01"/>
        <path d="M12 7v3a2 2 0 0 1-2 2H7"/>
        <path d="M3 12h.01"/>
        <path d="M12 3h.01"/>
        <path d="M12 16v.01"/>
        <path d="M16 12h1"/>
        <path d="M21 12v.01"/>
        <path d="M12 21v-1"/>
      </svg>
      <p>QR Code Placeholder</p>
      <small>Add your VCard/portfolio QR here</small>
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
    margin: 0 0 0.75rem;
    font-size: clamp(2rem, 5vw, 2.5rem);
    font-weight: 700;
    color: var(--text);
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
    gap: 1rem;
    margin-bottom: 4rem;
  }

  .social-card {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding: 1.5rem;
    background: var(--base);
    border: 1px solid var(--surface0);
    border-radius: var(--radius-lg);
    transition: all 0.2s ease;
    position: relative;
    overflow: hidden;
  }

  .social-card::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: var(--card-color);
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  .social-card:hover {
    transform: translateX(8px);
    border-color: var(--card-color);
  }

  .social-card:hover::before {
    opacity: 1;
  }

  .social-icon {
    flex-shrink: 0;
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--surface0);
    border-radius: var(--radius-md);
    color: var(--card-color);
    transition: all 0.2s ease;
  }

  .social-card:hover .social-icon {
    background: var(--card-color);
    color: var(--mantle);
    transform: scale(1.05);
  }

  .social-content {
    flex: 1;
  }

  .social-platform {
    margin: 0 0 0.25rem;
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--text);
  }

  .social-handle {
    margin: 0 0 0.5rem;
    font-size: 0.875rem;
    font-family: monospace;
    color: var(--card-color);
  }

  .social-desc {
    margin: 0;
    font-size: 0.85rem;
    line-height: 1.5;
    color: var(--subtext0);
  }

  .social-arrow {
    flex-shrink: 0;
    color: var(--subtext1);
    transition: all 0.2s ease;
  }

  .social-card:hover .social-arrow {
    color: var(--card-color);
    transform: translate(4px, -4px);
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

  .qr-placeholder {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    padding: 2rem;
    background: var(--surface0);
    border: 2px dashed var(--surface1);
    border-radius: var(--radius-md);
    color: var(--subtext0);
  }

  .qr-placeholder svg {
    opacity: 0.5;
  }

  .qr-placeholder p {
    margin: 0;
    font-weight: 500;
  }

  .qr-placeholder small {
    font-size: 0.75rem;
    color: var(--subtext1);
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
