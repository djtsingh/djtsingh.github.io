<script>
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  
  const themes = [
    { id: 'latte', name: 'Latte', emoji: '☕' },
    { id: 'frappe', name: 'Frappé', emoji: '🥤' },
    { id: 'macchiato', name: 'Macchiato', emoji: '🍵' },
    { id: 'mocha', name: 'Mocha', emoji: '🌙' }
  ];
  
  const accents = [
    { id: 'rosewater', name: 'Rosewater' },
    { id: 'flamingo', name: 'Flamingo' },
    { id: 'pink', name: 'Pink' },
    { id: 'mauve', name: 'Mauve' },
    { id: 'red', name: 'Red' },
    { id: 'maroon', name: 'Maroon' },
    { id: 'peach', name: 'Peach' },
    { id: 'yellow', name: 'Yellow' },
    { id: 'green', name: 'Green' },
    { id: 'teal', name: 'Teal' },
    { id: 'sky', name: 'Sky' },
    { id: 'sapphire', name: 'Sapphire' },
    { id: 'blue', name: 'Blue' },
    { id: 'lavender', name: 'Lavender' }
  ];
  
  let currentTheme = 'mocha';
  let currentAccent = 'sapphire';
  
  onMount(() => {
    if (browser) {
      currentTheme = localStorage.getItem('theme') || 'mocha';
      currentAccent = localStorage.getItem('accent') || 'sapphire';
      applyTheme(currentTheme);
      applyAccent(currentAccent);
    }
  });
  
  function applyTheme(theme) {
    if (!browser) return;
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
    currentTheme = theme;
  }
  
  function applyAccent(accent) {
    if (!browser) return;
    const accentRgb = getComputedStyle(document.documentElement)
      .getPropertyValue(`--${accent}-rgb`).trim();
    
    document.documentElement.style.setProperty('--accent', `var(--${accent})`);
    document.documentElement.style.setProperty('--accent-rgb', accentRgb || 'var(--sapphire-rgb)');
    localStorage.setItem('accent', accent);
    currentAccent = accent;
  }
</script>

<div class="theme-selector">
  <!-- Theme Selection -->
  <div class="selector-section">
    <h4 class="section-title">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
      Theme
    </h4>
    <div class="theme-grid">
      {#each themes as theme}
        <button
          class="theme-btn"
          class:active={currentTheme === theme.id}
          on:click={() => applyTheme(theme.id)}
          aria-label="Select {theme.name} theme"
          aria-pressed={currentTheme === theme.id}
        >
          <span class="theme-emoji" aria-hidden="true">{theme.emoji}</span>
          <span class="theme-name">{theme.name}</span>
        </button>
      {/each}
    </div>
  </div>
  
  <!-- Accent Selection -->
  <div class="selector-section">
    <h4 class="section-title">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
      </svg>
      Accent Color
    </h4>
    <div class="accent-grid">
      {#each accents as accent}
        <button
          class="accent-btn"
          class:active={currentAccent === accent.id}
          style="--accent-color: var(--{accent.id});"
          on:click={() => applyAccent(accent.id)}
          title={accent.name}
          aria-label="Select {accent.name} accent color"
          aria-pressed={currentAccent === accent.id}
        >
          <span class="accent-inner"></span>
        </button>
      {/each}
    </div>
  </div>
</div>

<style>
  .theme-selector {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }
  
  .selector-section {
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
  }
  
  .section-title {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    margin: 0;
    font-size: 0.7rem;
    font-weight: 600;
    color: var(--text);
    letter-spacing: 0.05em;
    text-transform: uppercase;
    opacity: 0.7;
  }

  .section-title svg {
    width: 14px;
    height: 14px;
    color: var(--accent);
  }
  
  /* Theme Grid - 3 columns with last item centered below */
  .theme-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.375rem;
  }
  
  .theme-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.35rem;
    padding: 0.5rem 0.4rem;
    font-size: 0.7rem;
    font-weight: 500;
    background: var(--surface0);
    color: var(--text);
    border: 1px solid var(--surface2);
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: all 0.15s ease;
    position: relative;
    white-space: nowrap;
  }
  
  /* Center the 4th theme button */
  .theme-btn:last-child {
    grid-column: 2;
  }
  
  .theme-btn:hover {
    color: var(--text);
    border-color: var(--accent);
    background: var(--surface1);
  }
  
  .theme-btn.active {
    background: var(--accent);
    color: var(--crust);
    border-color: var(--accent);
    font-weight: 600;
  }
  
  .theme-btn:active {
    transform: scale(0.97);
  }

  .theme-emoji {
    font-size: 0.9rem;
    line-height: 1;
  }

  .theme-name {
    font-size: 0.65rem;
    display: none;
  }
  
  /* Accent Grid */
  .accent-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: flex-start;
    padding: 0.5rem;
    background: var(--surface0);
    border-radius: var(--radius-sm);
    border: 1px solid var(--surface1);
  }
  
  .accent-btn {
    position: relative;
    width: 26px;
    height: 26px;
    flex-shrink: 0;
    background: var(--accent-color);
    border: 2px solid var(--surface2);
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.15s ease;
    padding: 0;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.15);
  }

  .accent-inner {
    display: none;
  }
  
  .accent-btn:hover {
    transform: scale(1.15);
    border-color: var(--text);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }
  
  .accent-btn.active {
    border-color: var(--text);
    box-shadow: 
      0 0 0 2px var(--surface0), 
      0 0 0 4px var(--accent-color),
      0 2px 8px rgba(0, 0, 0, 0.2);
    transform: scale(1.05);
  }

  .accent-btn:active {
    transform: scale(0.95);
  }

  /* Wider screens - show theme names */
  @media (min-width: 360px) {
    .theme-name {
      display: inline;
    }
    
    .accent-btn {
      width: 28px;
      height: 28px;
    }
  }

  @media (min-width: 400px) {
    .theme-grid {
      gap: 0.5rem;
    }
    
    .theme-btn {
      padding: 0.6rem 0.5rem;
      font-size: 0.75rem;
    }
    
    .theme-emoji {
      font-size: 1rem;
    }
    
    .theme-name {
      font-size: 0.7rem;
    }
    
    .accent-btn {
      width: 30px;
      height: 30px;
    }
    
    .accent-grid {
      gap: 0.5rem;
      padding: 0.625rem;
    }
  }

  /* Reduce motion */
  @media (prefers-reduced-motion: reduce) {
    .theme-btn,
    .accent-btn {
      transition: none;
    }
  }
</style>