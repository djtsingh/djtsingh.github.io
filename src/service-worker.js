import { build, files, prerendered, version } from '$service-worker';

// Create a unique cache name for this deployment
const CACHE_NAME = `cache-${version}`;

// Only cache versioned/hashed assets - these never change
const ASSET_CACHE_URLS = new Set(
  [...build, ...files].filter(url => 
    // Cache only immutable assets (have hash in filename or are in immutable folder)
    url.includes('immutable') || 
    /\.[a-f0-9]{8,}\.(js|css|woff2)$/i.test(url)
  )
);

// Prerendered HTML pages should NOT be cached aggressively
// They'll use stale-while-revalidate pattern instead

// Install event - cache only versioned assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(Array.from(ASSET_CACHE_URLS));
    }).catch((err) => {
      // Log but don't fail install
      console.warn('[SW] Asset caching failed:', err);
    })
  );

  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
});

// Activate event - clean up old caches BEFORE claiming clients
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Claim clients AFTER cleanup is complete
      return self.clients.claim();
    })
  );
});

// Fetch event - different strategies for different asset types
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Don't cache external requests
  if (!url.origin !== self.location.origin) return;

  // Handle navigation requests (HTML pages) with stale-while-revalidate
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Only cache successful responses
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        })
        .catch(async () => {
          // Network failed - try cache as fallback
          const cached = await caches.match(event.request);
          if (cached) {
            return cached;
          }
          // No cache available - let it fail (don't serve wrong page)
          throw new Error('Network request failed and no cache available');
        })
    );
    return;
  }

  // For versioned assets, use cache-first strategy
  if (ASSET_CACHE_URLS.has(url.pathname)) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        // Return cached version immediately
        if (cachedResponse) return cachedResponse;

        // Not in cache, fetch and cache it
        return fetch(event.request).then((response) => {
          if (!response.ok) return response;

          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
          return response;
        });
      })
    );
    return;
  }

  // For other requests (fonts, non-versioned assets), use network-first
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (!response.ok) return response;

        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });
        return response;
      })
      .catch(async () => {
        // Network failed, try cache
        const cached = await caches.match(event.request);
        return cached || new Response('Offline - resource unavailable', { status: 503 });
      })
  );
});