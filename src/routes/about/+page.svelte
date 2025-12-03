<script>
  import SEO from '$lib/components/SEO.svelte';
</script>

<SEO 
  title="About | Daljeet Singh Lotey"
  description="About Daljeet Singh Lotey — Software Engineering and Data Science. Background in data, algorithms and full-stack engineering."
  canonical="https://djtsingh.github.io/about"
  type="profile"
/>

<div class="about-page">
  <div class="about-grid">
    <!-- Portrait -->
    <div class="portrait">
      <img src="/assets/dj-web.jpg" alt="Portrait of Daljeet Singh Lotey" class="portrait-img" />
    </div>

    <!-- Content -->
    <div class="about-content">
      <p class="about-lead">
        Hey! I am Daljeet Singh Lotey. I build software that matters: from scalable systems at work to creative tools and experiments in my free time. I'm a Fresh CS grad with a background in data, algorithms, and full-stack engineering. I enjoy shipping polished experiences and learning new ways to make products delightful.
      </p>

      <div class="about-sub">
        <p>I focus on building reliable systems and delightful user experiences. My interests include machine learning, product design, and open-source tooling. When not coding I like to explore computational design and Gaming.</p>
      </div>

      <div class="about-socials">
        <a href="https://github.com/djtsingh" target="_blank" rel="noopener noreferrer" title="GitHub" class="social-link">
          <i class="ti ti-brand-github"></i>
        </a>
        <a href="https://www.linkedin.com/in/djtsingh/" target="_blank" rel="noopener noreferrer" title="LinkedIn" class="social-link">
          <i class="ti ti-brand-linkedin"></i>
        </a>
        <a href="mailto:hello@example.com" title="Email" class="social-link">
          <i class="ti ti-mail"></i>
        </a>
        <a href="https://x.com/djt5ingh" target="_blank" rel="noopener noreferrer" title="Twitter" class="social-link">
          <i class="ti ti-brand-x"></i>
        </a>
      </div>
    </div>
  </div>
</div>

<style>
  .about-page {
    max-width: 900px;
    margin: 0 auto;
  }
  
  .about-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    align-items: start;
  }
  
  @media (min-width: 768px) {
    .about-grid {
      grid-template-columns: 280px 1fr;
      gap: 3rem;
    }
  }
  
  .portrait {
    position: relative;
  }
  
  .portrait-img {
    width: 100%;
    max-width: 280px;
    border-radius: var(--radius-lg);
    border: 1px solid var(--surface0);
    object-fit: cover;
    aspect-ratio: 1;
  }
  
  .about-content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .about-lead {
    margin: 0;
    font-size: 1.1rem;
    line-height: 1.7;
    color: var(--text);
    font-weight: 500;
  }
  
  .about-sub p {
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.7;
    color: var(--subtext1);
  }
  
  .about-socials {
    display: flex;
    gap: 1rem;
    padding-top: 0.5rem;
  }
  
  .social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    font-size: 1.25rem;
    color: var(--text);
    background: var(--surface0);
    border-radius: var(--radius-md);
    transition: background 0.15s ease, color 0.15s ease;
  }
  
  .social-link:hover {
    background: var(--accent);
    color: var(--mantle);
  }
</style>
