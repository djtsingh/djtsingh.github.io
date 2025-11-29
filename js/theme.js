// js/theme.js
const html = document.documentElement;

// Load saved preferences
const savedTheme  = localStorage.getItem('theme')  || 'mocha';
const savedAccent = localStorage.getItem('accent') || 'peach';

html.classList.add(savedTheme);
document.documentElement.style.setProperty('--accent', `var(--${savedAccent})`);

// Highlight active buttons
document.querySelector(`[data-theme="${savedTheme}"]`)?.classList.add('bg-base','text-text','ring-1','ring-accent/70','shadow-sm');
document.querySelector(`[data-accent="${savedAccent}"]`)?.classList.add('scale-105');

// Theme buttons
document.querySelectorAll('[data-theme]').forEach(btn => {
  btn.addEventListener('click', () => {
    const theme = btn.dataset.theme;
    html.className = theme;
    localStorage.setItem('theme', theme);

    document.querySelectorAll('[data-theme]').forEach(b => {
      b.classList.remove('bg-base','text-text','ring-1','ring-accent/70','shadow-sm');
    });
    btn.classList.add('bg-base','text-text','ring-1','ring-accent/70','shadow-sm');
  });
});

// Accent buttons + moving ring
const ring = document.querySelector('.accent-ring');
document.querySelectorAll('[data-accent]').forEach(btn => {
  btn.addEventListener('click', () => {
    const accent = btn.dataset.accent;
    document.documentElement.style.setProperty('--accent', `var(--${accent})`);
    localStorage.setItem('accent', accent);

    // Remove active state
    document.querySelectorAll('[data-accent]').forEach(b => b.classList.remove('scale-105'));
    btn.classList.add('scale-105');

    // Move ring
    const index = Array.from(btn.parentNode.children).indexOf(btn);
    if (index < 7) ring.style.transform = `translateY(0) translateX(calc(${index} * (100% + 0.625rem)))`;
    else ring.style.transform = `translateY(calc(100% + 0.625rem)) translateX(calc(${(index-7)} * (100% + 0.625rem)))`;
  });
});