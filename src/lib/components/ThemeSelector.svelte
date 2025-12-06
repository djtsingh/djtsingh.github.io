<script>
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  
  const themes = ['latte', 'frappe', 'macchiato', 'mocha'];
  const accents = [
    'rosewater', 'flamingo', 'pink', 'mauve', 'red', 'maroon', 'peach',
    'yellow', 'green', 'teal', 'sky', 'sapphire', 'blue', 'lavender'
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
    document.documentElement.style.setProperty('--accent', `var(--${accent})`);
    localStorage.setItem('accent', accent);
    currentAccent = accent;
  }
</script>

<div class="theme-selector">
  <h4 class="section-title">Theme</h4>
  <div class="theme-buttons">
    {#each themes as theme}
      <button
        class="theme-btn"
        class:active={currentTheme === theme}
        on:click={() => applyTheme(theme)}
      >
        {theme.charAt(0).toUpperCase() + theme.slice(1)}
      </button>
    {/each}
  </div>
  
  <h4 class="section-title">Accent</h4>
  <div class="accent-grid">
    {#each accents as accent}
      <button
        class="accent-btn"
        class:active={currentAccent === accent}
        style="background-color: var(--{accent});"
        on:click={() => applyAccent(accent)}
        title={accent.charAt(0).toUpperCase() + accent.slice(1)}
        aria-label="Select {accent} accent color"
      ></button>
    {/each}
  </div>
</div>

<style>
  .theme-selector {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .section-title {
    margin: 0;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--subtext1);
  }
  
  .theme-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  
  .theme-btn {
    flex: 1;
    min-width: 70px;
    padding: 6px 8px;
    font-size: 0.75rem;
    font-weight: 500;
    background: transparent;
    color: var(--subtext1);
    border: 1px solid transparent;
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: all 0.15s ease;
  }
  
  .theme-btn:hover {
    color: var(--subtext0);
  }
  
  .theme-btn.active {
    background: var(--base);
    color: var(--text);
    border-color: var(--accent);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }
  
  .accent-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 8px;
  }
  
  .accent-btn {
    aspect-ratio: 1;
    min-width: 24px;
    border: none;
    border-radius: var(--radius-sm);
    cursor: pointer;
    opacity: 0.8;
    transition: transform 0.15s ease, opacity 0.15s ease;
  }
  
  .accent-btn:hover {
    transform: scale(1.1);
    opacity: 1;
  }
  
  .accent-btn.active {
    transform: scale(1.05);
    opacity: 1;
    box-shadow: 0 0 0 2px var(--base), 0 0 0 4px currentColor;
  }
</style>
