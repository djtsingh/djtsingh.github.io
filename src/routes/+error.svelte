<script>
  import { page } from '$app/stores';
  import SEO from '$lib/components/SEO.svelte';
  
  const suggestions = [
    { label: 'Home', path: '/', icon: '🏠' },
    { label: 'Projects', path: '/projects', icon: '💼' },
    { label: 'About', path: '/about', icon: '👤' },
    { label: 'Posts', path: '/posts', icon: '📝' }
  ];
</script>

<SEO 
  title="404 - Page Not Found | Daljeet Singh Lotey"
  description="The page you're looking for doesn't exist."
/>

<div class="error-page">
  <div class="error-container">
    <!-- Animated 404 -->
    <div class="error-code">
      <span class="digit">4</span>
      <span class="digit spin">0</span>
      <span class="digit">4</span>
    </div>
    
    <h1 class="error-title">Page Not Found</h1>
    <p class="error-message">
      Looks like this page took a wrong turn in the matrix. The URL you're looking for doesn't exist in this timeline.
    </p>
    
    <!-- Fun ASCII art -->
    <pre class="ascii-art">
      ¯\_(ツ)_/¯
    </pre>
    
    <!-- Navigation suggestions -->
    <div class="suggestions">
      <p class="suggestions-label">Try one of these instead:</p>
      <div class="suggestion-links">
        {#each suggestions as suggestion}
          <a href={suggestion.path} class="suggestion-link">
            <span class="suggestion-icon">{suggestion.icon}</span>
            <span>{suggestion.label}</span>
          </a>
        {/each}
      </div>
    </div>
    
    <!-- Search hint -->
    <div class="search-hint">
      <p>Or try searching for what you need</p>
      <a href="/" class="btn-home">Take Me Home</a>
    </div>
  </div>
</div>

<style>
  .error-page {
    min-height: 70vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;
  }
  
  .error-container {
    max-width: 600px;
    text-align: center;
  }
  
  .error-code {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }
  
  .digit {
    font-size: clamp(4rem, 15vw, 8rem);
    font-weight: 700;
    color: var(--accent);
    line-height: 1;
    animation: fadeIn 0.5s ease-out;
  }
  
  .digit.spin {
    animation: spin 2s ease-in-out infinite, fadeIn 0.5s ease-out;
  }
  
  @keyframes spin {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(10deg); }
    75% { transform: rotate(-10deg); }
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .error-title {
    font-size: 2rem;
    font-weight: 600;
    color: var(--text);
    margin: 0 0 1rem;
  }
  
  .error-message {
    font-size: 1.1rem;
    color: var(--subtext1);
    line-height: 1.6;
    margin: 0 0 2rem;
  }
  
  .ascii-art {
    font-size: 1.5rem;
    color: var(--subtext0);
    margin: 2rem 0;
    font-family: monospace;
  }
  
  .suggestions {
    margin: 3rem 0;
  }
  
  .suggestions-label {
    font-size: 0.9rem;
    color: var(--subtext1);
    margin-bottom: 1rem;
  }
  
  .suggestion-links {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 1rem;
  }
  
  .suggestion-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
    background: var(--surface0);
    border-radius: var(--radius-md);
    color: var(--text);
    text-decoration: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .suggestion-link:hover {
    background: var(--accent);
    color: var(--crust);
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
  
  .suggestion-icon {
    font-size: 2rem;
  }
  
  .search-hint {
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid var(--surface0);
  }
  
  .search-hint p {
    font-size: 0.9rem;
    color: var(--subtext1);
    margin-bottom: 1rem;
  }
  
  .btn-home {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: var(--accent);
    color: var(--crust);
    border-radius: var(--radius-md);
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .btn-home:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
  
  .btn-home:active {
    transform: translateY(0);
  }
</style>
