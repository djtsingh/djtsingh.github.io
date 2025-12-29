<script>
  import { onMount } from 'svelte';

  export let type = 'spinner'; // 'spinner', 'skeleton', 'pulse', 'dots'
  // svelte-ignore export_let_unused - Used in dynamic class bindings
  export let size = 'medium'; // 'small', 'medium', 'large'
  // svelte-ignore export_let_unused - Used in dynamic class bindings
  export let color = 'accent'; // 'accent', 'text', 'subtext'
  export let text = ''; // Optional loading text
  export let overlay = false; // Whether to show as overlay
  export let fullScreen = false; // Full screen overlay

  let mounted = false;

  onMount(() => {
    mounted = true;
  });
</script>

{#if mounted}
  <div
    class="loading-container {overlay ? 'overlay' : ''} {fullScreen ? 'fullscreen' : ''}"
    class:size-{size}
    class:color-{color}
    class:type-{type}
  >
    {#if type === 'spinner'}
      <div class="spinner">
        <div class="spinner-ring"></div>
        <div class="spinner-center"></div>
      </div>
    {:else if type === 'dots'}
      <div class="dots">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    {:else if type === 'pulse'}
      <div class="pulse">
        <div class="pulse-bar"></div>
      </div>
    {:else if type === 'skeleton'}
      <div class="skeleton">
        <div class="skeleton-line"></div>
        <div class="skeleton-line short"></div>
        <div class="skeleton-line"></div>
      </div>
    {/if}

    {#if text}
      <p class="loading-text">{text}</p>
    {/if}
  </div>
{/if}

<style>
  /* eslint-disable css-unused-selector */
  
  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  .loading-container.overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    z-index: 10;
  }

  .loading-container.fullscreen {
    position: fixed;
    inset: 0;
    background: var(--base);
    z-index: 9999;
  }

  /* Size variants */
  /* svelte-ignore css-unused-selector - Used via dynamic class bindings */
  .size-small { --size: 1.5rem; }
  /* svelte-ignore css-unused-selector - Used via dynamic class bindings */
  .size-medium { --size: 2.5rem; }
  /* svelte-ignore css-unused-selector - Used via dynamic class bindings */
  .size-large { --size: 4rem; }

  /* Color variants */
  /* svelte-ignore css-unused-selector - Used via dynamic class bindings */
  .color-accent { --loading-color: var(--accent); }
  /* svelte-ignore css-unused-selector - Used via dynamic class bindings */
  .color-text { --loading-color: var(--text); }
  /* svelte-ignore css-unused-selector - Used via dynamic class bindings */
  .color-subtext { --loading-color: var(--subtext0); }

  /* Spinner */
  .spinner {
    position: relative;
    width: var(--size);
    height: var(--size);
  }

  .spinner-ring {
    position: absolute;
    width: 100%;
    height: 100%;
    border: 2px solid transparent;
    border-top: 2px solid var(--loading-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  .spinner-center {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 30%;
    height: 30%;
    background: var(--loading-color);
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* Dots */
  .dots {
    display: flex;
    gap: 0.25rem;
  }

  .dot {
    width: calc(var(--size) / 4);
    height: calc(var(--size) / 4);
    background: var(--loading-color);
    border-radius: 50%;
    animation: dots 1.4s ease-in-out infinite both;
  }

  .dot:nth-child(1) { animation-delay: -0.32s; }
  .dot:nth-child(2) { animation-delay: -0.16s; }

  @keyframes dots {
    0%, 80%, 100% {
      transform: scale(0);
      opacity: 0.5;
    }
    40% {
      transform: scale(1);
      opacity: 1;
    }
  }

  /* Pulse */
  .pulse {
    width: 100%;
    max-width: 200px;
  }

  .pulse-bar {
    height: 4px;
    background: linear-gradient(90deg, transparent, var(--loading-color), transparent);
    border-radius: 2px;
    animation: pulse 1.5s ease-in-out infinite;
  }

  @keyframes pulse {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }

  /* Skeleton */
  .skeleton {
    width: 100%;
    max-width: 300px;
  }

  .skeleton-line {
    height: 1rem;
    background: var(--surface0);
    border-radius: 4px;
    margin-bottom: 0.5rem;
    animation: skeleton 1.5s ease-in-out infinite;
  }

  .skeleton-line.short {
    width: 60%;
  }

  .skeleton-line:last-child {
    margin-bottom: 0;
  }

  @keyframes skeleton {
    0% { opacity: 0.6; }
    50% { opacity: 1; }
    100% { opacity: 0.6; }
  }

  /* Loading text */
  .loading-text {
    color: var(--subtext0);
    font-size: 0.9rem;
    font-weight: var(--font-weight-light);
    text-align: center;
    margin: 0;
  }

  /* Responsive adjustments */
  @media (max-width: 640px) {
    /* svelte-ignore css-unused-selector - Used via dynamic class bindings */
    .size-large { --size: 3rem; }
  }
  
  /* eslint-enable css-unused-selector */
</style>