<script>
  import { onMount, onDestroy } from 'svelte';
  import { writable } from 'svelte/store';

  // Accessibility preferences store
  export const accessibilityPrefs = writable({
    reducedMotion: false,
    highContrast: false,
    screenReader: false,
    focusVisible: true
  });

  let prefs = {
    reducedMotion: false,
    highContrast: false,
    screenReader: false,
    focusVisible: true
  };

  // Update preferences based on user settings
  function updatePreferences() {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const contrastQuery = window.matchMedia('(prefers-contrast: high)');
    const screenReaderQuery = window.matchMedia('(prefers-reduced-transparency: reduce)');

    prefs.reducedMotion = mediaQuery.matches;
    prefs.highContrast = contrastQuery.matches;
    prefs.screenReader = screenReaderQuery.matches;

    // Apply to document
    document.documentElement.classList.toggle('reduced-motion', prefs.reducedMotion);
    document.documentElement.classList.toggle('high-contrast', prefs.highContrast);
    document.documentElement.classList.toggle('screen-reader', prefs.screenReader);

    accessibilityPrefs.set(prefs);
  }

  // Focus management utilities
  export function trapFocus(container) {
    const focusableElements = container.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    function handleTabKey(e) {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    }

    container.addEventListener('keydown', handleTabKey);

    // Return cleanup function
    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  }

  // Skip link functionality
  export function initSkipLinks() {
    const skipLinks = document.querySelectorAll('[data-skip-link]');

    skipLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          target.focus();
          target.scrollIntoView({ behavior: prefs.reducedMotion ? 'auto' : 'smooth' });
        }
      });
    });
  }

  // Announce content changes to screen readers
  export function announceToScreenReader(message, priority = 'polite') {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.overflow = 'hidden';

    document.body.appendChild(announcement);
    announcement.textContent = message;

    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }

  onMount(() => {
    updatePreferences();

    // Listen for preference changes
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const contrastQuery = window.matchMedia('(prefers-contrast: high)');
    const screenReaderQuery = window.matchMedia('(prefers-reduced-transparency: reduce)');

    mediaQuery.addEventListener('change', updatePreferences);
    contrastQuery.addEventListener('change', updatePreferences);
    screenReaderQuery.addEventListener('change', updatePreferences);

    // Initialize skip links
    initSkipLinks();

    return () => {
      mediaQuery.removeEventListener('change', updatePreferences);
      contrastQuery.removeEventListener('change', updatePreferences);
      screenReaderQuery.removeEventListener('change', updatePreferences);
    };
  });
</script>

<!-- Skip to main content link -->
<a
  href="#main-content"
  class="skip-link"
  data-skip-link
  on:click={(e) => {
    e.preventDefault();
    const target = document.getElementById('main-content');
    if (target) {
      target.focus();
      target.scrollIntoView({ behavior: prefs.reducedMotion ? 'auto' : 'smooth' });
    }
  }}
>
  Skip to main content
</a>

<!-- Skip to navigation link -->
<a
  href="#site-navigation"
  class="skip-link"
  data-skip-link
  on:click={(e) => {
    e.preventDefault();
    const target = document.getElementById('site-navigation');
    if (target) {
      target.focus();
      target.scrollIntoView({ behavior: prefs.reducedMotion ? 'auto' : 'smooth' });
    }
  }}
>
  Skip to navigation
</a>

<!-- Screen reader status announcements -->
<div aria-live="polite" aria-atomic="true" class="sr-status" style="position: absolute; left: -10000px;"></div>

<style>
  /* Skip link */
  .skip-link {
    position: absolute;
    top: -100px;  /* Move further up to ensure it's hidden */
    left: 6px;
    background: var(--accent);
    color: var(--mantle);
    padding: 8px 16px;
    border-radius: var(--radius-md);
    text-decoration: none;
    font-weight: var(--font-weight-medium);
    z-index: 1000;
    transition: top 0.2s ease;
    opacity: 0;  /* Make completely invisible */
    transform: translateY(-20px);  /* Additional hiding */
    pointer-events: none;  /* Prevent accidental clicks */
  }

  .skip-link:focus {
    top: 6px;
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }

  /* Accessibility preference styles */
  :global(.reduced-motion *) {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  :global(.high-contrast) {
    --text: #000000;
    --subtext0: #000000;
    --subtext1: #000000;
    --base: #ffffff;
    --mantle: #ffffff;
    --surface0: #e0e0e0;
    --surface1: #d0d0d0;
    --accent: #0000ff;
  }

  :global(.screen-reader) {
    /* Reduce visual noise for screen reader users */
    background: #ffffff !important;
    color: #000000 !important;
  }

  /* Focus indicators */
  :global(:focus-visible) {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  /* Ensure sufficient color contrast */
  :global(.high-contrast a) {
    text-decoration: underline;
  }

  :global(.high-contrast button) {
    border: 2px solid currentColor;
  }
</style>