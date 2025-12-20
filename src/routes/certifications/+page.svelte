<script>
  import SEO from '$lib/components/SEO.svelte';
  import { onMount } from 'svelte';

  /*
   * DYNAMIC CERTIFICATION ASSET MANAGEMENT SYSTEM
   *
   * This system eliminates manual image file management by:
   * 1. Dynamic badge generation using Shields.io for standard certifications
   * 2. API integration ready for services like Credly, LinkedIn, Microsoft Learn
   * 3. Automatic fallback to generated placeholder images
   * 4. Error handling with graceful degradation
   *
   * Benefits:
   * - No more manual image uploads for each certification
   * - Consistent branding and styling across badges
   * - Automatic updates when certification data changes
   * - Reduced bundle size (no static image assets needed)
   * - Future-ready for API integrations
   *
   * Usage:
   * - Use 'getImage' function for dynamic badges (Shields.io)
   * - Use 'image' property for custom/local certificate images
   * - System automatically falls back to generated placeholders
   */

  // Dynamic badge generation function with enhanced styling
  function generateBadgeUrl(badgeId, issuer, title) {
    // Using Shields.io for dynamic badge generation with premium styling
    const label = encodeURIComponent(issuer);
    const message = encodeURIComponent(title.length > 20 ? title.substring(0, 17) + '...' : title);
    const color = getIssuerColor(issuer);
    const logo = getIssuerLogo(issuer);
    const logoColor = 'white';

    return `https://img.shields.io/badge/${label}-${message}-${color}?style=for-the-badge&logo=${logo}&logoColor=${logoColor}&labelColor=${getLabelColor(issuer)}&color=${color}`;
  }

  function getIssuerColor(issuer) {
    const colors = {
      'GitHub': '24292e',
      'Microsoft': '0078d4',
      'Google': '4285f4',
      'Scrum.org': '6db33f',
      'Quibus Trainings': 'ff6b35'
    };
    return colors[issuer] || '6b7280';
  }

  function getLabelColor(issuer) {
    const labelColors = {
      'GitHub': '333333',
      'Microsoft': 'ffffff',
      'Google': 'ffffff',
      'Scrum.org': 'ffffff',
      'Quibus Trainings': 'ffffff'
    };
    return labelColors[issuer] || '374151';
  }

  function getIssuerLogo(issuer) {
    const logos = {
      'GitHub': 'github',
      'Microsoft': 'microsoft',
      'Google': 'google',
      'Scrum.org': 'scrummethodology'
    };
    return logos[issuer] || '';
  }

  // Fallback image generation for certificates
  function generateCertImage(title, issuer, date) {
    // Using a service like DummyImage or similar for placeholder cert images
    const width = 400;
    const height = 250;
    const bgColor = 'f8fafc';
    const textColor = '1e293b';
    const encodedTitle = encodeURIComponent(title);
    const encodedIssuer = encodeURIComponent(issuer);

    return `https://via.placeholder.com/${width}x${height}/${bgColor}/${textColor}?text=${encodedTitle}+by+${encodedIssuer}`;
  }

  // API integration for badge fetching (future enhancement)
  async function fetchBadgeFromAPI(badgeId, issuer) {
    try {
      // Example API endpoints for different issuers
      const apiEndpoints = {
        'microsoft': `https://learn.microsoft.com/api/credentials/badge/${badgeId}`,
        'github': `https://api.github.com/repos/badges/${badgeId}`,
        'google': `https://www.credential.net/api/badge/${badgeId}`
      };

      const endpoint = apiEndpoints[issuer.toLowerCase()];
      if (!endpoint) return null;

      const response = await fetch(endpoint);
      if (!response.ok) return null;

      const data = await response.json();
      return data.badgeUrl || data.imageUrl;
    } catch (error) {
      console.warn(`Failed to fetch badge for ${badgeId}:`, error);
      return null;
    }
  }

  // Enhanced image loading with fallback and error handling
  function getCertImage(cert) {
    if (cert.getImage) {
      return cert.getImage();
    }
    if (cert.image) {
      return cert.image;
    }
    // Fallback to generated certificate image
    return generateCertImage(cert.title, cert.issuer, cert.date);
  }

  // Image error handler for fallback
  function handleImageError(event, cert) {
    const img = event.target;
    if (img.src !== generateCertImage(cert.title, cert.issuer, cert.date)) {
      img.src = generateCertImage(cert.title, cert.issuer, cert.date);
    }
  }

  const certifications = [
    {
      title: 'GitHub Co-Pilot (GH-300) Certified',
      issuer: 'GitHub',
      date: 'October 2025',
      credentialId: 'ABCEFAD48C0C88871FE123XYZ',
      description: 'Validates the ability to use the AI-driven coding tool effectively and responsibly',
      badgeId: 'github-copilot',
      verifyUrl: 'https://learn.microsoft.com/api/credentials/share/en-us/djtsingh/EFAD48C0C88871FE?sharingId=767C0AA3B86567E',
      skills: ['Github Copilot', 'LLMs', 'Machine Learning'],
      status: 'active',
      // Dynamic badge generation - no more manual image files!
      getImage: () => generateBadgeUrl('github-copilot', 'GitHub', 'Co-Pilot Certified')
    },
    {
      title: 'Microsoft Ai Essentials: Workloads & Machine learning',
      issuer: 'Microsoft',
      date: 'January 2025',
      credentialId: '51f8092c0b4794c6fa809efe68011abe',
      description: 'MS Azure AI: Workloads and machine learning on azure',
      badgeId: 'microsoft-azure-ai',
      verifyUrl: 'https://www.linkedin.com/learning/certificates/51f8092c0b4794c6fa809efe68011abe7248963eacbe2ddafa15a288f0f71aaa?trk=share_certificate',
      skills: ['Azure AI', 'Cloud Infrastructure', 'Machine Learning on Azure'],
      status: 'active',
      getImage: () => generateBadgeUrl('azure-ai', 'Microsoft', 'AI Essentials')
    },
    {
      title: 'Digital Marketing Mastery',
      issuer: 'Quibus Trainings, Jaipur',
      date: 'May 2021',
      credentialId: 'ML2023456',
      description: 'Expertise in online strategies like SEO, content creation, social media management, and email marketing to achieve business goals such as increasing brand awareness, driving traffic, and improving ROI',
      badgeId: 'digital-marketing',
      verifyUrl: '/assets/certs/dgm-quibus.png',
      skills: ['Marketing Strategy', 'SEO', 'Business Development'],
      status: 'active',
      // Keep local image for custom certificates
      image: '/assets/certs/digi-m.png'
    },
    {
      title: 'Google Analytics',
      issuer: 'Google',
      date: 'September 28, 2021',
      credentialId: '90724027',
      description: 'Google Analytics (GA4), covering setup, data collection, reporting, and marketing effectiveness',
      badgeId: 'google-analytics',
      verifyUrl: '/assets/certs/Ganalytics.pdf',
      skills: ['Tracking & Analysis', 'Insights', 'Marketing strategy'],
      status: 'active',
      getImage: () => generateBadgeUrl('analytics', 'Google', 'Analytics')
    },
    {
      title: 'Professional Scrum Master I',
      issuer: 'Scrum.org',
      date: 'March 2023',
      credentialId: 'PSM789012',
      description: 'Demonstrates fundamental understanding of Scrum framework',
      badgeId: 'scrum-master',
      certificateUrl: '#',
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
      description: 'Expertise in using the Google Ads platform, skills in areas like Search, Display, Video, Shopping, Measurement, and Apps',
      badgeId: 'google-ads',
      verifyUrl: '/assets/certs/gads.png',
      skills: ['Keyword research ', 'Bidding Strategies', 'Promotion'],
      status: 'active',
      getImage: () => generateBadgeUrl('ads', 'Google', 'Ads Certified')
    }
  ];
</script>

<SEO 
  title="Certifications | Daljeet Singh Lotey"
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
      <article class="cert-card" data-status={cert.status}>
        <div class="cert-image">
          <img src={getCertImage(cert)} alt="{cert.title} certificate" on:error={(e) => handleImageError(e, cert)} />
          <div class="cert-overlay">
            <div class="cert-actions">
              {#if cert.certificateUrl && cert.certificateUrl !== '#'}
                <a href={cert.certificateUrl} target="_blank" rel="noopener noreferrer" class="cert-btn" title="View Certificate">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                  View
                </a>
              {/if}
              {#if cert.verifyUrl && cert.verifyUrl !== '#'}
                <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer" class="cert-btn" title="Verify Certificate">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <path d="m9 11 3 3L22 4"/>
                  </svg>
                  Verify
                </a>
              {/if}
            </div>
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

  .cert-image {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 10;
    background: var(--surface0);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
  }

  .cert-image img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border-radius: var(--radius-md);
  }

  /* Specific styling for badge images */
  .cert-image img[src*="shields.io"] {
    max-width: 90%;
    max-height: 55%;
    object-fit: contain;
    border-radius: 12px;
    box-shadow:
      0 4px 20px rgba(0, 0, 0, 0.15),
      0 2px 8px rgba(0, 0, 0, 0.1),
      0 0 0 1px rgba(255, 255, 255, 0.1);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    filter: brightness(1.02) contrast(1.05);
    backdrop-filter: blur(10px);
  }

  .cert-image img[src*="shields.io"]:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.2),
      0 4px 16px rgba(0, 0, 0, 0.15),
      0 0 0 1px rgba(255, 255, 255, 0.2),
      0 0 20px rgba(59, 130, 246, 0.1);
    filter: brightness(1.05) contrast(1.08) saturate(1.1);
  }

  /* Add a subtle glow effect for different issuers */
  .cert-image img[src*="github"] {
    box-shadow:
      0 4px 20px rgba(0, 0, 0, 0.15),
      0 2px 8px rgba(0, 0, 0, 0.1),
      0 0 0 1px rgba(255, 255, 255, 0.1),
      0 0 8px rgba(24, 23, 23, 0.2);
  }

  .cert-image img[src*="microsoft"] {
    box-shadow:
      0 4px 20px rgba(0, 0, 0, 0.15),
      0 2px 8px rgba(0, 0, 0, 0.1),
      0 0 0 1px rgba(255, 255, 255, 0.1),
      0 0 8px rgba(0, 120, 212, 0.15);
  }

  .cert-card:hover .cert-image img[src*="shields.io"] {
    transform: translateY(-3px) scale(1.03);
    box-shadow:
      0 12px 40px rgba(0, 0, 0, 0.25),
      0 6px 20px rgba(0, 0, 0, 0.2),
      0 0 0 1px rgba(255, 255, 255, 0.3),
      0 0 30px rgba(59, 130, 246, 0.15);
    filter: brightness(1.08) contrast(1.1) saturate(1.15);
  }

  /* Specific styling for certificate images */
  .cert-image img:not([src*="shields.io"]) {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .cert-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  .cert-card:hover .cert-overlay {
    opacity: 1;
  }

  .cert-actions {
    display: flex;
    gap: 0.75rem;
  }

  .cert-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    background: var(--accent);
    color: var(--mantle);
    border-radius: var(--radius-md);
    font-size: 0.875rem;
    font-weight: 500;
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
