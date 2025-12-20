<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  // Network status store
  export const networkStatus = writable({
    online: true,
    lastOnline: null,
    connection: null
  });

  let isOnline = true;
  let showNotification = false;
  let notificationMessage = '';
  let notificationType = 'info';

  // Network status detection
  function updateNetworkStatus() {
    const online = navigator.onLine;
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

    networkStatus.set({
      online,
      lastOnline: online ? new Date() : null,
      connection: connection ? {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
        saveData: connection.saveData
      } : null
    });

    isOnline = online;

    if (!online) {
      showOfflineNotification();
    } else if (showNotification && notificationType === 'offline') {
      showReconnectedNotification();
    }
  }

  function showOfflineNotification() {
    notificationMessage = 'You are currently offline. Some features may not work.';
    notificationType = 'offline';
    showNotification = true;

    // Auto-hide after 5 seconds
    setTimeout(() => {
      if (notificationType === 'offline') {
        showNotification = false;
      }
    }, 5000);
  }

  function showReconnectedNotification() {
    notificationMessage = 'Connection restored!';
    notificationType = 'success';
    showNotification = true;

    // Auto-hide after 3 seconds
    setTimeout(() => {
      showNotification = false;
    }, 3000);
  }

  // Enhanced fetch with retry logic
  export async function resilientFetch(url, options = {}, retries = 3) {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url, {
          ...options,
          signal: options.signal || AbortSignal.timeout(10000) // 10s timeout
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        return response;
      } catch (error) {
        const isLastAttempt = i === retries - 1;

        if (error.name === 'AbortError') {
          if (isLastAttempt) throw new Error('Request timed out');
          continue; // Retry on timeout
        }

        if (!navigator.onLine) {
          throw new Error('No internet connection');
        }

        if (isLastAttempt) throw error;

        // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
      }
    }
  }

  onMount(() => {
    // Initial status
    updateNetworkStatus();

    // Listen for online/offline events
    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);

    // Listen for connection changes (if supported)
    if ('connection' in navigator) {
      navigator.connection.addEventListener('change', updateNetworkStatus);
    }

    return () => {
      window.removeEventListener('online', updateNetworkStatus);
      window.removeEventListener('offline', updateNetworkStatus);

      if ('connection' in navigator) {
        navigator.connection.removeEventListener('change', updateNetworkStatus);
      }
    };
  });
</script>

{#if showNotification}
  <div class="network-notification {notificationType}" role="alert">
    <div class="notification-content">
      <span class="notification-icon">
        {#if notificationType === 'offline'}
          📶
        {:else if notificationType === 'success'}
          ✅
        {:else}
          ℹ️
        {/if}
      </span>
      <span class="notification-message">{notificationMessage}</span>
      <button
        class="notification-close"
        on:click={() => showNotification = false}
        aria-label="Close notification"
      >
        ✕
      </button>
    </div>
  </div>
{/if}

<style>
  .network-notification {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
    min-width: 300px;
    max-width: 500px;
  }

  .notification-content {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 1.25rem;
    border-radius: var(--radius-lg);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(10px);
  }

  .offline {
    background: rgba(239, 68, 68, 0.95);
    border: 1px solid rgba(239, 68, 68, 0.3);
    color: white;
  }

  .success {
    background: rgba(34, 197, 94, 0.95);
    border: 1px solid rgba(34, 197, 94, 0.3);
    color: white;
  }

  .info {
    background: rgba(59, 130, 246, 0.95);
    border: 1px solid rgba(59, 130, 246, 0.3);
    color: white;
  }

  .notification-icon {
    font-size: 1.25rem;
    flex-shrink: 0;
  }

  .notification-message {
    flex: 1;
    font-size: 0.9rem;
    line-height: 1.4;
  }

  .notification-close {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 50%;
    opacity: 0.8;
    transition: opacity 0.2s;
  }

  .notification-close:hover {
    opacity: 1;
  }

  /* Mobile responsive */
  @media (max-width: 640px) {
    .network-notification {
      left: 10px;
      right: 10px;
      min-width: auto;
    }
  }
</style>