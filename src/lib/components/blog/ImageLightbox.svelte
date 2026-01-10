<script>
  /**
   * ImageLightbox - Fullscreen image viewer for blog post images
   * Features: Click to open, escape to close, smooth animations
   */
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  
  let isOpen = false;
  let currentSrc = '';
  let currentAlt = '';
  
  function openLightbox(event) {
    const img = event.target;
    if (img.tagName !== 'IMG') return;
    if (img.closest('.no-lightbox')) return;
    
    currentSrc = img.src;
    currentAlt = img.alt || 'Image';
    isOpen = true;
    document.body.style.overflow = 'hidden';
  }
  
  function closeLightbox() {
    isOpen = false;
    document.body.style.overflow = '';
  }
  
  function handleKeydown(event) {
    if (event.key === 'Escape' && isOpen) {
      closeLightbox();
    }
  }
  
  onMount(() => {
    if (!browser) return;
    
    // Attach click handler to prose images
    const proseContainer = document.querySelector('.prose');
    if (proseContainer) {
      proseContainer.addEventListener('click', openLightbox);
    }
    
    window.addEventListener('keydown', handleKeydown);
    
    return () => {
      if (proseContainer) {
        proseContainer.removeEventListener('click', openLightbox);
      }
      window.removeEventListener('keydown', handleKeydown);
      document.body.style.overflow = '';
    };
  });
</script>

{#if isOpen}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div 
    class="lightbox-overlay" 
    on:click={closeLightbox}
    tabindex="-1"
  >
    <button class="close-btn" on:click={closeLightbox} aria-label="Close image">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 6 6 18"/>
        <path d="m6 6 12 12"/>
      </svg>
    </button>
    
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div class="lightbox-content" on:click|stopPropagation>
      <img src={currentSrc} alt={currentAlt} class="lightbox-image" />
    </div>
    
    <p class="lightbox-caption">{currentAlt}</p>
    <p class="lightbox-hint">Press ESC or click outside to close</p>
  </div>
{/if}

<style>
  .lightbox-overlay {
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    background: rgba(0, 0, 0, 0.95);
    animation: fadeIn 0.2s ease;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .close-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: 50%;
    color: white;
    cursor: pointer;
    transition: background 0.2s ease;
  }
  
  .close-btn:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  
  .lightbox-content {
    max-width: 90vw;
    max-height: 80vh;
    animation: zoomIn 0.3s ease;
  }
  
  @keyframes zoomIn {
    from { 
      opacity: 0;
      transform: scale(0.9);
    }
    to { 
      opacity: 1;
      transform: scale(1);
    }
  }
  
  .lightbox-image {
    max-width: 100%;
    max-height: 80vh;
    object-fit: contain;
    border-radius: 4px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  }
  
  .lightbox-caption {
    margin-top: 1rem;
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.8);
    text-align: center;
  }
  
  .lightbox-hint {
    position: absolute;
    bottom: 1rem;
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.4);
  }
</style>
