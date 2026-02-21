<script>
  import SEO from '$lib/components/SEO.svelte';

  // Issuer branding configuration
  const issuerBranding = {
    'GitHub': {
      logo: 'https://img.icons8.com/fluency/96/github.png',
      color: '#f5c2e7',
      gradient: 'linear-gradient(135deg, #24292e 0%, #1b1f23 100%)'
    },
    'Microsoft': {
      logo: 'https://img.icons8.com/fluency/96/microsoft.png',
      color: '#89b4fa',
      gradient: 'linear-gradient(135deg, #0078d4 0%, #005a9e 100%)'
    },
    'Google': {
      logo: 'https://img.icons8.com/fluency/96/google-logo.png',
      color: '#fab387',
      gradient: 'linear-gradient(135deg, #4285f4 0%, #34a853 50%, #fbbc04 100%)'
    },
    'Scrum.org': {
      logo: 'https://img.icons8.com/color/96/scrum.png',
      color: '#a6e3a1',
      gradient: 'linear-gradient(135deg, #6db33f 0%, #4a9c2d 100%)'
    },
    'Quibus Trainings': {
      logo: null,
      color: '#f9e2af',
      gradient: 'linear-gradient(135deg, #ff6b35 0%, #e55a2b 100%)'
    }
  };

  function getIssuerBranding(issuer) {
    const key = Object.keys(issuerBranding).find(k => issuer.includes(k));
    return issuerBranding[key] || { 
      logo: null, 
      color: '#cdd6f4', 
      gradient: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)' 
    };
  }

  const certifications = [
    {
      title: 'GitHub Co-Pilot (GH-300) Certified',
      issuer: 'GitHub',
      date: 'October 2025',
      credentialId: 'ABCEFAD48C0C88871FE123XYZ',
      description: 'Validates the ability to use the AI-driven coding tool effectively and responsibly',
      verifyUrl: 'https://learn.microsoft.com/api/credentials/share/en-us/djtsingh/EFAD48C0C88871FE?sharingId=767C0AA3B86567E',
      skills: ['Github Copilot', 'LLMs', 'Machine Learning'],
      status: 'active'
    },
    {
      title: 'Microsoft AI Essentials',
      issuer: 'Microsoft',
      date: 'January 2025',
      credentialId: '51f8092c0b4794c6fa809efe68011abe',
      description: 'Workloads and machine learning on Azure cloud platform',
      verifyUrl: 'https://www.linkedin.com/learning/certificates/51f8092c0b4794c6fa809efe68011abe7248963eacbe2ddafa15a288f0f71aaa?trk=share_certificate',
      skills: ['Azure AI', 'Cloud Infrastructure', 'Machine Learning'],
      status: 'active'
    },
    {
      title: 'Digital Marketing Mastery',
      issuer: 'Quibus Trainings',
      date: 'May 2021',
      credentialId: 'ML2023456',
      description: 'SEO, content creation, social media management, and email marketing expertise',
      verifyUrl: '/assets/certs/dgm-quibus.png',
      skills: ['Marketing Strategy', 'SEO', 'Business Development'],
      status: 'active',
      image: '/assets/certs/digi-m.png'
    },
    {
      title: 'Google Analytics',
      issuer: 'Google',
      date: 'September 2021',
      credentialId: '90724027',
      description: 'GA4 setup, data collection, reporting, and marketing effectiveness',
      verifyUrl: '/assets/certs/Ganalytics.pdf',
      skills: ['Tracking & Analysis', 'Insights', 'Marketing Strategy'],
      status: 'active'
    },
    {
      title: 'Professional Scrum Master I',
      issuer: 'Scrum.org',
      date: 'March 2023',
      credentialId: 'PSM789012',
      description: 'Demonstrates fundamental understanding of Scrum framework',
      verifyUrl: '#',
      skills: ['Agile', 'Scrum', 'Project Management'],
      status: 'active',
      image: '/assets/certs/djt-scrum-1.png'
    },
    {
      title: 'Google Ads',
      issuer: 'Google',
      date: 'September 2022',
      credentialId: '90518366',
      description: 'Expertise in Search, Display, Video, Shopping, and measurement strategies',
      verifyUrl: '#',
      skills: ['Keyword Research', 'Bidding Strategies', 'Promotion'],
      status: 'active'
    }
  ];
</script>

<SEO 
  title="Daljeet Singh Lotey - Certifications"
  description="Professional certifications and credentials earned by Daljeet Singh Lotey in cloud computing, machine learning, and software development."
  canonical="https://djtsingh.github.io/certifications"
  type="website"
/>

<div class="certs-page">
  <header class="page-header">
    <p class="kicker">Credentials & Learning</p>
    <h1>
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="8" r="6"/>
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
      </svg>
      <span>Certifications</span>
    </h1>
    <p class="lead">Professional certifications and credentials I've earned to validate skills and continue learning.</p>
  </header>

  <div class="certs-stats">
    <div class="stat-card">
      <div class="stat-number">{certifications.filter(c => c.status === 'active').length}</div>
      <div class="stat-label">Active Certifications</div>
    </div>
    <div class="stat-card">
      <div class="stat-number">{certifications.length}</div>
      <div class="stat-label">Total Earned</div>
    </div>
    <div class="stat-card">
      <div class="stat-number">{new Set(certifications.flatMap(c => c.skills)).size}</div>
      <div class="stat-label">Skills Validated</div>
    </div>
  </div>

  <div class="certs-grid">
    {#each certifications as cert}
      {@const branding = getIssuerBranding(cert.issuer)}
      <article class="cert-card" data-status={cert.status}>
        <div class="cert-visual" style="--issuer-color: {branding.color}; --issuer-gradient: {branding.gradient}">
          {#if cert.image}
            <img src={cert.image} alt="{cert.title} certificate" class="cert-image-actual" />
          {:else}
            <div class="cert-badge-visual">
              <div class="badge-pattern"></div>
              {#if branding.logo}
                <img src={branding.logo} alt="{cert.issuer}" class="issuer-logo" loading="lazy" />
              {:else}
                <div class="issuer-initial">{cert.issuer.charAt(0)}</div>
              {/if}
              <div class="badge-ribbon">
                <svg viewBox="0 0 100 100" width="60" height="60">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" stroke-width="2" opacity="0.3"/>
                  <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.2"/>
                  <path d="M50 20 L55 35 L70 35 L58 45 L63 60 L50 52 L37 60 L42 45 L30 35 L45 35 Z" fill="currentColor" opacity="0.15"/>
                </svg>
              </div>
            </div>
          {/if}
          <div class="cert-overlay">
            {#if cert.verifyUrl && cert.verifyUrl !== '#'}
              <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer" class="cert-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <path d="m9 11 3 3L22 4"/>
                </svg>
                Verify
              </a>
            {/if}
          </div>
        </div>
        
        <div class="cert-content">
          <div class="cert-header">
            <h3 class="cert-title">{cert.title}</h3>
            {#if cert.status === 'active'}
              <span class="cert-badge cert-badge--active">Active</span>
            {:else if cert.status === 'expired'}
              <span class="cert-badge cert-badge--expired">Expired</span>
            {:else if cert.status === 'pending'}
              <span class="cert-badge cert-badge--pending">Pending</span>
            {/if}
          </div>
          
          <div class="cert-issuer">{cert.issuer}</div>
          <div class="cert-date">{cert.date}</div>
          
          <p class="cert-desc">{cert.description}</p>
          
          {#if cert.credentialId}
            <div class="cert-credential">
              <span class="credential-label">Credential ID:</span>
              <code class="credential-id">{cert.credentialId}</code>
            </div>
          {/if}
          
          {#if cert.skills && cert.skills.length > 0}
            <div class="cert-skills">
              {#each cert.skills as skill}
                <span class="skill-tag">{skill}</span>
              {/each}
            </div>
          {/if}
        </div>
      </article>
    {/each}
  </div>

  <!-- Add Cert Placeholder -->
  <div class="add-cert-placeholder">
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 5v14M5 12h14"/>
    </svg>
    <p>More certifications coming soon</p>
  </div>
</div>

<style>
  .certs-page {
    max-width: 1100px;
    margin: 0 auto;
  }

  .page-header {
    margin-bottom: 2.5rem;
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
    justify-content: center;
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
    max-width: 55ch;
    margin-inline: auto;
    font-size: 1rem;
    line-height: 1.6;
    color: var(--subtext1);
  }

  /* Stats */
  .certs-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 3rem;
  }

  .stat-card {
    padding: 1.5rem;
    text-align: center;
    background: var(--base);
    border: 1px solid var(--surface0);
    border-radius: var(--radius-lg);
  }

  .stat-number {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--accent);
    line-height: 1;
    margin-bottom: 0.5rem;
  }

  .stat-label {
    font-size: 0.875rem;
    color: var(--subtext1);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  /* Certifications Grid */
  .certs-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;
  }

  .cert-card {
    display: flex;
    flex-direction: column;
    background: var(--base);
    border: 1px solid var(--surface0);
    border-radius: var(--radius-lg);
    overflow: hidden;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .cert-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }

  .cert-card[data-status="expired"] {
    opacity: 0.7;
  }

  /* Premium Certificate Visual */
  .cert-visual {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 10;
    background: var(--surface0);
    overflow: hidden;
  }

  .cert-image-actual {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .cert-badge-visual {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--issuer-gradient);
    position: relative;
  }

  .badge-pattern {
    position: absolute;
    inset: 0;
    background: 
      radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 0%, transparent 40%),
      radial-gradient(circle at 80% 80%, rgba(255,255,255,0.05) 0%, transparent 40%);
    opacity: 0.8;
  }

  .issuer-logo {
    width: 72px;
    height: 72px;
    object-fit: contain;
    filter: drop-shadow(0 4px 12px rgba(0,0,0,0.3));
    z-index: 1;
    transition: transform 0.3s ease;
  }

  .cert-card:hover .issuer-logo {
    transform: scale(1.1);
  }

  .issuer-initial {
    width: 72px;
    height: 72px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    font-weight: 700;
    color: white;
    background: rgba(255,255,255,0.15);
    border-radius: 50%;
    border: 2px solid rgba(255,255,255,0.2);
    z-index: 1;
  }

  .badge-ribbon {
    position: absolute;
    bottom: 12px;
    right: 12px;
    color: rgba(255,255,255,0.4);
  }

  .cert-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.2s ease;
    backdrop-filter: blur(2px);
  }

  .cert-card:hover .cert-overlay {
    opacity: 1;
  }

  .cert-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.65rem 1.25rem;
    background: var(--accent);
    color: var(--crust);
    border-radius: var(--radius-md);
    font-size: 0.85rem;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.15s ease;
  }

  .cert-btn:hover {
    transform: scale(1.05);
    filter: brightness(1.1);
  }

  .cert-content {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    flex: 1;
  }

  .cert-header {
    display: flex;
    align-items: start;
    justify-content: space-between;
    gap: 1rem;
  }

  .cert-title {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--text);
    flex: 1;
  }

  .cert-badge {
    padding: 0.25rem 0.75rem;
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-radius: var(--radius-sm);
    flex-shrink: 0;
  }

  .cert-badge--active {
    background: rgba(166, 227, 161, 0.2);
    color: var(--green);
  }

  .cert-badge--expired {
    background: rgba(147, 153, 178, 0.2);
    color: var(--subtext0);
  }

  .cert-badge--pending {
    background: rgba(250, 179, 135, 0.2);
    color: var(--peach);
  }

  .cert-issuer {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--accent);
  }

  .cert-date {
    font-size: 0.8rem;
    color: var(--subtext1);
  }

  .cert-desc {
    margin: 0;
    font-size: 0.875rem;
    line-height: 1.6;
    color: var(--subtext0);
  }

  .cert-credential {
    padding: 0.75rem;
    background: var(--surface0);
    border-radius: var(--radius-sm);
    font-size: 0.75rem;
  }

  .credential-label {
    color: var(--subtext1);
    margin-right: 0.5rem;
  }

  .credential-id {
    color: var(--text);
    font-family: monospace;
    background: var(--surface1);
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
  }

  .cert-skills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: auto;
    padding-top: 0.5rem;
  }

  .skill-tag {
    padding: 0.25rem 0.65rem;
    font-size: 0.7rem;
    font-weight: 500;
    background: var(--surface0);
    color: var(--text);
    border-radius: var(--radius-sm);
    border: 1px solid var(--surface1);
  }

  /* Add Cert Placeholder */
  .add-cert-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 3rem 2rem;
    border: 2px dashed var(--surface1);
    border-radius: var(--radius-lg);
    color: var(--subtext0);
    text-align: center;
  }

  .add-cert-placeholder svg {
    opacity: 0.4;
  }

  .add-cert-placeholder p {
    margin: 0;
    font-size: 0.9rem;
  }
</style>
