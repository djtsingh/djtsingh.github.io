<script>
  import { onMount } from 'svelte';
  import { dev } from '$app/environment';

  // Simple error display component - can be triggered manually
  let hasError = false;
  let error = null;
  let errorMessage = 'Something went wrong. Please try again.';

  // Public method to trigger error display
  export function showError(err, message = null) {
    hasError = true;
    error = err;
    errorMessage = message || 'Something went wrong. Please try again.';

    if (dev && error) {
      console.error('Error displayed:', error);
    }
  }

  function resetError() {
    hasError = false;
    error = null;
    errorMessage = 'Something went wrong. Please try again.';
  }

  // Optional: Listen for custom error events
  onMount(() => {
    const handleCustomError = (event) => {
      if (event.detail && !hasError) {
        showError(event.detail.error, event.detail.message);
      }
    };

    window.addEventListener('display-error', handleCustomError);

    return () => {
      window.removeEventListener('display-error', handleCustomError);
    };
  });
</script>

{#if hasError}
  <div class="error-boundary" role="alert">
    <div class="error-content">
      <h2>🚨 Oops!</h2>
      <p>{errorMessage}</p>

      {#if dev && error}
        <details class="error-details">
          <summary>Error Details (Development)</summary>
          <pre>{error.message || error}</pre>
          {#if error.stack}
            <pre>{error.stack}</pre>
          {/if}
        </details>
      {/if}

      <button on:click={resetError} class="retry-btn">
        Try Again
      </button>
    </div>
  </div>
{:else}
  <slot />
{/if}

<style>
  .error-boundary {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    padding: 2rem;
  }

  .error-content {
    background: var(--base);
    border: 1px solid var(--red);
    border-radius: var(--radius-lg);
    padding: 2rem;
    max-width: 500px;
    text-align: center;
  }

  .error-details {
    margin: 1rem 0;
    text-align: left;
  }

  .error-details pre {
    background: var(--surface0);
    padding: 1rem;
    border-radius: var(--radius-md);
    font-size: 0.8rem;
    overflow-x: auto;
    margin: 0.5rem 0;
  }

  .retry-btn {
    background: var(--accent);
    color: var(--mantle);
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: var(--radius-md);
    font-weight: var(--font-weight-medium);
    cursor: pointer;
    margin-top: 1rem;
  }

  .retry-btn:hover {
    filter: brightness(1.1);
  }
</style>