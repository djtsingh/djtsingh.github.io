<script>
  import SEO from '$lib/components/SEO.svelte';
</script>

<SEO 
  title="Journey | Daljeet Singh Lotey"
  description="Career timeline and educational journey of Daljeet Singh Lotey"
  canonical="https://djtsingh.github.io/journey"
/>

<div class="journey-page">
  <div class="journey-header">
    <h1>My Journey</h1>
    <p class="journey-lead">
      A timeline of my career, education, and key milestones in software engineering and computer science.
    </p>
  </div>
  
  <!-- Timeline Section -->
  <section class="timeline-section">
    <div class="timeline">
      <div class="timeline-item current">
        <div class="timeline-marker pulse"></div>
        <div class="timeline-content">
          <span class="timeline-date">2024 - Present</span>
          <h3>Software Engineer</h3>
          <p class="timeline-company">Your Company</p>
          <p>Working on scalable systems and full-stack applications. Focus on data engineering and ML integration.</p>
        </div>
      </div>
      
      <div class="timeline-item">
        <div class="timeline-marker"></div>
        <div class="timeline-content">
          <span class="timeline-date">2024</span>
          <h3>Bachelor of Science</h3>
          <p class="timeline-company">Amity University, Mumbai</p>
          <p>Graduated with focus on algorithms, data structures, and machine learning. Developed Janus project for thesis.</p>
        </div>
      </div>
      
      <div class="timeline-item">
        <div class="timeline-marker"></div>
        <div class="timeline-content">
          <span class="timeline-date">2023</span>
          <h3>Research Intern</h3>
          <p class="timeline-company">Amity Institute of Information technology</p>
          <p>Computer vision research on adversarial detection systems and browser fingerprinting techniques.</p>
        </div>
      </div>
    </div>
  </section>
</div>

<style>
  .journey-page {
    max-width: 900px;
    margin: 0 auto;
    padding: 3rem 1rem 5rem;
  }
  
  .journey-header {
    margin-bottom: 5rem;
    text-align: center;
  }
  
  .journey-header h1 {
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 700;
    background: linear-gradient(135deg, var(--text), var(--accent));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 0 0 1rem;
  }
  
  .journey-lead {
    font-size: 1.15rem;
    color: var(--subtext1);
    line-height: 1.7;
    max-width: 650px;
    margin: 0 auto;
  }
  
  .timeline-section {
    position: relative;
  }
  
  .timeline {
    position: relative;
    padding-left: 2.5rem;
  }
  
  .timeline::before {
    content: '';
    position: absolute;
    left: 0.5rem;
    top: 1rem;
    bottom: 1rem;
    width: 2px;
    background: linear-gradient(
      to bottom,
      var(--accent) 0%,
      var(--mauve) 50%,
      transparent 100%
    );
    opacity: 0.5;
  }
  
  .timeline-item {
    position: relative;
    margin-bottom: 3.5rem;
    padding-left: 2rem;
    opacity: 0;
    animation: fadeInUp 0.6s ease-out forwards;
  }
  
  .timeline-item:nth-child(1) { animation-delay: 0.1s; }
  .timeline-item:nth-child(2) { animation-delay: 0.2s; }
  .timeline-item:nth-child(3) { animation-delay: 0.3s; }
  
  .timeline-item:last-child {
    margin-bottom: 0;
  }
  
  .timeline-marker {
    position: absolute;
    left: -1.5rem;
    top: 0.4rem;
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 50%;
    background: var(--accent);
    border: 3px solid var(--base);
    box-shadow: 
      0 0 0 1px var(--surface0),
      0 2px 8px rgba(0, 0, 0, 0.2);
    z-index: 2;
    transition: all 0.3s ease;
  }
  
  .timeline-item:hover .timeline-marker {
    transform: scale(1.2);
    box-shadow: 
      0 0 0 1px var(--surface0),
      0 0 20px var(--accent),
      0 2px 12px rgba(0, 0, 0, 0.3);
  }
  
  /* Blinking animation for current position */
  .timeline-marker.pulse {
    animation: pulse 2s ease-in-out infinite;
  }
  
  @keyframes pulse {
    0%, 100% {
      box-shadow: 
        0 0 0 3px var(--base),
        0 0 0 4px var(--surface0),
        0 0 0 0 var(--accent);
    }
    50% {
      box-shadow: 
        0 0 0 3px var(--base),
        0 0 0 4px var(--surface0),
        0 0 0 8px transparent,
        0 0 20px var(--accent);
    }
  }
  
  .timeline-item.current .timeline-marker {
    background: linear-gradient(135deg, var(--accent), var(--mauve));
    box-shadow: 
      0 0 0 3px var(--base),
      0 0 0 4px var(--surface0),
      0 0 16px var(--accent);
  }
  
  .timeline-content {
    background: var(--surface0);
    padding: 1.75rem;
    border-radius: var(--radius-lg);
    border: 1px solid var(--surface1);
    position: relative;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
  }
  
  .timeline-content::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--accent), var(--mauve));
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s ease;
  }
  
  .timeline-item:hover .timeline-content::before {
    transform: scaleX(1);
  }
  
  .timeline-item:hover .timeline-content {
    border-color: var(--accent);
    transform: translateX(8px) translateY(-2px);
    box-shadow: 
      0 8px 24px rgba(0, 0, 0, 0.12),
      0 0 0 1px var(--surface1);
  }
  
  .timeline-item.current .timeline-content {
    border-color: var(--accent);
    background: linear-gradient(
      135deg,
      var(--surface0) 0%,
      color-mix(in srgb, var(--surface0) 95%, var(--accent) 5%) 100%
    );
  }
  
  .timeline-date {
    display: inline-block;
    font-size: 0.8rem;
    font-weight: 700;
    color: var(--accent);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 0.75rem;
    padding: 0.25rem 0.75rem;
    background: color-mix(in srgb, var(--accent) 15%, transparent);
    border-radius: var(--radius-sm);
  }
  
  .timeline-content h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--text);
    margin: 0.5rem 0 0.25rem;
    line-height: 1.3;
  }
  
  .timeline-company {
    font-size: 1.1rem;
    color: var(--subtext0);
    font-weight: 500;
    margin: 0 0 1rem;
  }
  
  .timeline-content p:last-child {
    margin: 0;
    color: var(--subtext1);
    line-height: 1.7;
    font-size: 1.05rem;
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @media (max-width: 640px) {
    .journey-page {
      padding: 2rem 1rem 3rem;
    }
    
    .journey-header {
      margin-bottom: 3rem;
    }
    
    .timeline {
      padding-left: 2rem;
    }
    
    .timeline-item {
      padding-left: 1.5rem;
    }
    
    .timeline-marker {
      left: -1.25rem;
      width: 1rem;
      height: 1rem;
    }
    
    .timeline-content {
      padding: 1.25rem;
    }
    
    .timeline-content h3 {
      font-size: 1.15rem;
    }
  }
</style>
