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
    gap: 1.5rem;
  }
  
  .selector-section {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .section-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0;
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--subtext0);
    letter-spacing: 0.025em;
  }

  .section-title svg {
    opacity: 0.7;
  }
  
  /* Theme Grid */
  .theme-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
  }
  
  .theme-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 0.875rem 0.5rem;
    font-size: 0.8125rem;
    font-weight: 500;
    background: var(--base);
    color: var(--subtext1);
    border: 2px solid transparent;
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  }

  .theme-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--accent);
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  .theme-btn > * {
    position: relative;
    z-index: 1;
  }
  
  .theme-btn:hover {
    color: var(--text);
    border-color: var(--surface1);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .theme-btn:hover::before {
    opacity: 0.05;
  }
  
  .theme-btn.active {
    background: var(--surface0);
    color: var(--accent);
    border-color: var(--accent);
    font-weight: 600;
    box-shadow: 0 2px 8px rgba(var(--accent-rgb), 0.2);
  }

  .theme-btn.active::before {
    opacity: 0.1;
  }
  
  .theme-btn:active {
    transform: scale(0.97);
  }

  .theme-emoji {
    font-size: 1.25rem;
    line-height: 1;
  }

  .theme-name {
    font-size: 0.75rem;
  }
  
  /* Accent Grid */
  .accent-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 0.5rem;
  }
  
  .accent-btn {
    position: relative;
    aspect-ratio: 1;
    min-width: 32px;
    background: var(--accent-color);
    border: none;
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    padding: 0;
    overflow: hidden;
  }

  .accent-inner {
    position: absolute;
    inset: 3px;
    background: var(--accent-color);
    border-radius: calc(var(--radius-sm) - 2px);
    transition: all 0.2s ease;
  }
  
  .accent-btn:hover {
    transform: scale(1.15);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2),
                0 0 0 2px var(--base),
                0 0 0 4px var(--accent-color);
  }

  .accent-btn:hover .accent-inner {
    inset: 2px;
  }
  
  .accent-btn.active {
    transform: scale(1.05);
    box-shadow: 0 0 0 2px var(--base),
                0 0 0 4px var(--accent-color),
                0 4px 16px rgba(0, 0, 0, 0.3);
  }

  .accent-btn.active .accent-inner {
    inset: 4px;
  }

  .accent-btn:active {
    transform: scale(1);
  }

  /* Responsive adjustments */
  @media (min-width: 375px) {
    .accent-grid {
      gap: 0.625rem;
    }

    .accent-btn {
      min-width: 36px;
    }
  }

  @media (min-width: 640px) {
    .theme-grid {
      grid-template-columns: repeat(4, 1fr);
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