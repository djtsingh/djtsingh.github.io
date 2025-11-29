// js/sidebar.js
const sidebar = document.getElementById('mobile-sidebar');
const morePanel = document.getElementById('more-panel');
const overlay  = document.getElementById('sidebar-overlay');
const openBtn  = document.getElementById('mobile-menu-btn');
const closeBtn = document.getElementById('mobile-menu-close');
const moreBtn  = document.getElementById('more-btn');
const moreClose = document.getElementById('more-close');

function openPanel(el) {
  if (!el) return;
  // ensure panel is visible by translating to 0
  el.classList.remove('-translate-x-full');
  el.style.transform = 'translateX(0)';
  if (overlay) {
    overlay.classList.remove('hidden');
    overlay.style.display = 'block';
    overlay.setAttribute('aria-hidden', 'false');
  }
  document.body.style.overflow = 'hidden';
}

function closePanel(el) {
  if (!el) return;
  el.classList.add('-translate-x-full');
  el.style.transform = 'translateX(-100%)';
  if (overlay) {
    overlay.classList.add('hidden');
    overlay.style.display = 'none';
    overlay.setAttribute('aria-hidden', 'true');
  }
  document.body.style.overflow = '';
}

if (openBtn) openBtn.addEventListener('click', () => openPanel(sidebar));
if (closeBtn) closeBtn.addEventListener('click', () => closePanel(sidebar));
if (overlay) overlay.addEventListener('click', () => { closePanel(sidebar); closePanel(morePanel); });

if (moreBtn) moreBtn.addEventListener('click', () => openPanel(morePanel));
if (moreClose) moreClose.addEventListener('click', () => closePanel(morePanel));