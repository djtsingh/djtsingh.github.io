<script>
  import { onMount, onDestroy } from 'svelte';
  // Import Leaflet CSS at the top
  import 'leaflet/dist/leaflet.css';

  let mapContainer;
  let map;
  let isLoading = true;
  let loadError = false;

  onMount(async () => {
    try {
      // Dynamically import Leaflet only when component mounts
      const leafletModule = await import('leaflet');

      const L = leafletModule.default;

      // Small delay to ensure everything is ready
      await new Promise(resolve => setTimeout(resolve, 50));

      const mumbaiCoords = [19.0760, 72.8777];

      map = L.map(mapContainer, {
        center: mumbaiCoords,
        zoom: 12,
        zoomControl: false,
        scrollWheelZoom: true,
        dragging: true,
        touchZoom: true,
        doubleClickZoom: true,
        attributionControl: false,
        fadeAnimation: true,
        zoomAnimation: true
      });

      // Satellite imagery
      const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19
      });

      satelliteLayer.addTo(map);

      // Dark labels overlay
      const labelsLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png', {
        subdomains: 'abcd',
        maxZoom: 19,
        opacity: 0.7
      });

      labelsLayer.addTo(map);

      // Create glowing marker
      const customIcon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="position: relative;">
            <div style="position: absolute; top: -8px; left: -8px; width: 16px; height: 16px; background: #ff4444; border-radius: 50%; box-shadow: 0 0 20px 8px rgba(255, 68, 68, 0.6), 0 0 40px 15px rgba(255, 68, 68, 0.3); animation: pulse 2s ease-in-out infinite;"></div>
            <div style="position: absolute; top: -4px; left: -4px; width: 8px; height: 8px; background: white; border-radius: 50%;"></div>
          </div>
        `,
        iconSize: [16, 16],
        iconAnchor: [8, 8]
      });

      L.marker(mumbaiCoords, { icon: customIcon }).addTo(map);

      // Wait for tiles to load before hiding loading spinner
      satelliteLayer.on('load', () => {
        isLoading = false;
      });

      // Fallback: hide loading after 2 seconds even if tiles haven't loaded
      setTimeout(() => {
        if (isLoading) {
          isLoading = false;
        }
      }, 2000);

    } catch (error) {
      console.error('Failed to load map:', error);
      loadError = true;
      isLoading = false;
    }
  });

  onDestroy(() => {
    if (map) {
      map.remove();
      map = null;
    }
  });
</script>

<div class="map-container">
  <!-- Map Container -->
  <div
    bind:this={mapContainer}
    class="earth-image-container"
  ></div>

  <!-- Loading Overlay -->
  {#if isLoading && !loadError}
    <div class="map-loading-overlay">
      <!-- Animated Globe -->
      <div class="loading-globe">
        <div class="loading-spinner"></div>
        <div class="loading-icon">
          <svg class="globe-svg" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>
      <p class="loading-text">Loading map...</p>
    </div>
  {/if}

  <!-- Error State -->
  {#if loadError}
    <div class="map-error-overlay">
      <svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <p class="error-text">Failed to load map</p>
    </div>
  {/if}
</div>

<style>
  :global(.leaflet-control-attribution),
  :global(.leaflet-control-zoom) {
    display: none !important;
  }

  .map-container {
    position: relative;
    width: 100%;
    height: 180px; /* Fixed height for Leaflet */
  }

  .earth-image-container {
    width: 100%;
    height: 180px; /* Fixed height for Leaflet */
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
    transition: transform 0.3s ease;
    cursor: grab;
    opacity: 1;
    /* Prevent layout shifts during loading */
    min-height: 180px;
    max-height: 180px;
  }

  .earth-image-container:active {
    cursor: grabbing;
  }

  .earth-image-container:hover {
    transform: translateY(-2px);
  }

  .earth-image-container.loading {
    /* Container is always visible, loading overlay handles loading state */
  }

  .map-loading-overlay,
  .map-error-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #1e1e2e 0%, #181825 100%);
    border-radius: 12px;
  }

  .loading-globe {
    position: relative;
  }

  .loading-spinner {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    border: 4px solid rgba(137, 180, 250, 0.2);
    border-top: 4px solid #89b4fa;
    animation: spin 1s linear infinite;
  }

  .loading-icon {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .globe-svg {
    width: 2rem;
    height: 2rem;
    color: #89b4fa;
  }

  .loading-text {
    margin-top: 1rem;
    font-size: 0.875rem;
    color: #a6adc8;
    animation: pulse 2s ease-in-out infinite;
  }

  .error-icon {
    width: 3rem;
    height: 3rem;
    color: #f38ba8;
    margin-bottom: 0.75rem;
  }

  .error-text {
    font-size: 0.875rem;
    color: #a6adc8;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.1);
      opacity: 0.8;
    }
  }
</style>