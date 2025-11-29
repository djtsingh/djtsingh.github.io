// js/navigation.js
// Handles terminal-style breadcrumb navigation in header

(function() {
  'use strict';

  function updateNavigationPath() {
    const path = window.location.pathname;
    const pathSeparator = document.getElementById('path-separator');
    const currentPath = document.getElementById('current-path');
    
    if (!pathSeparator || !currentPath) {
      console.warn('Navigation elements not found');
      return;
    }

    // Determine current page from URL
    let pageName = '';
    
    if (path.includes('about')) {
      pageName = 'about';
    } else if (path.includes('projects')) {
      pageName = 'projects';
    } else if (path.includes('posts')) {
      pageName = 'posts';
    }

    // Update display
    if (pageName) {
      pathSeparator.style.display = 'inline';
      currentPath.style.display = 'inline';
      currentPath.textContent = pageName;
    } else {
      pathSeparator.style.display = 'none';
      currentPath.style.display = 'none';
      currentPath.textContent = '';
    }
  }

  // Run on load
  updateNavigationPath();

  // Also update on popstate (browser back/forward)
  window.addEventListener('popstate', updateNavigationPath);

})();
