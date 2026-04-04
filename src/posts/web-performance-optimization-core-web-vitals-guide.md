---
title: "Web Performance Optimization: A Practical Guide to Core Web Vitals and Beyond"
slug: "web-performance-optimization-core-web-vitals-guide"
date: "2026-03-05"
description: "Ship faster websites with this hands-on guide to Core Web Vitals, image optimization, code splitting, caching, lazy loading, font loading, and critical rendering path optimization with measurable before/after improvements."
tags: ["Web Performance", "Core Web Vitals", "Frontend", "Optimization", "Tutorial"]
coverImage: "/assets/blog/optimized/web-performance-optimization-core-web-vitals-guide-lg.webp"
readingTime: 16
featured: false
published: true
---

## Performance Is a Feature

Every 100ms increase in load time costs Amazon 1% in revenue. Google uses Core Web Vitals as a ranking signal. Users abandon pages that take more than 3 seconds to load.

Performance isn't something you bolt on after launch—it's a design constraint from day one. This guide covers the techniques that deliver the biggest improvements with the least effort.

## Core Web Vitals: The Metrics That Matter

Google's three metrics that directly impact SEO rankings:

### LCP (Largest Contentful Paint) — Target: &lt; 2.5s

Measures when the largest visible element finishes rendering. Usually a hero image, heading, or video poster.

**Common culprits:**
- Unoptimized hero images
- Render-blocking CSS/JS
- Slow server response (TTFB)
- Client-side rendering delay

### INP (Interaction to Next Paint) — Target: &lt; 200ms

Measures responsiveness. How long from user interaction (click, tap, keypress) to the next visual update.

**Common culprits:**
- Long JavaScript tasks blocking the main thread
- Heavy event handlers
- Layout thrashing
- Third-party scripts

### CLS (Cumulative Layout Shift) — Target: &lt; 0.1

Measures visual stability. Elements shifting unexpectedly after the page loads.

**Common culprits:**
- Images without dimensions
- Ads and embeds without reserved space
- Web fonts causing FOIT/FOUT
- Dynamic content injection above the fold

## Image Optimization

Images are typically 50-70% of a page's total weight. Start here.

### Modern Formats

```html
<!-- Use <picture> for format fallbacks -->
<picture>
  <source srcset="/hero.avif" type="image/avif">
  <source srcset="/hero.webp" type="image/webp">
  <img src="/hero.jpg" alt="Hero image" width="1200" height="630">
</picture>
```

| Format | Compression | Browser Support | Best For |
|---|---|---|---|
| AVIF | 50% smaller than JPEG | 92%+ | Photos, hero images |
| WebP | 30% smaller than JPEG | 97%+ | General purpose |
| JPEG | Baseline | 100% | Fallback |
| SVG | Scalable, tiny | 100% | Icons, logos, illustrations |

### Responsive Images

```html
<!-- Serve different sizes based on viewport -->
<img 
  srcset="
    /hero-400.webp 400w,
    /hero-800.webp 800w,
    /hero-1200.webp 1200w,
    /hero-1600.webp 1600w
  "
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
  src="/hero-800.webp"
  alt="Hero"
  width="1200"
  height="630"
  loading="lazy"
  decoding="async"
>
```

### Always Set Dimensions

```html
<!-- ✅ Prevents CLS -->
<img src="photo.webp" width="800" height="600" alt="...">

<!-- ✅ Or use CSS aspect-ratio -->
<style>
  .hero-image {
    aspect-ratio: 16 / 9;
    width: 100%;
    object-fit: cover;
  }
</style>
```

### Lazy Loading

```html
<!-- Native lazy loading for below-the-fold images -->
<img src="photo.webp" loading="lazy" alt="...">

<!-- Eager load above-the-fold (LCP) images -->
<img src="hero.webp" loading="eager" fetchpriority="high" alt="...">
```

## Font Loading Optimization

Web fonts cause invisible text (FOIT) or layout shifts (FOUT) if loaded wrong.

### Preload Critical Fonts

```html
<link rel="preload" href="/fonts/Inter-Regular.woff2" as="font" type="font/woff2" crossorigin>
```

### Use `font-display: swap`

```css
@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter-Regular.woff2') format('woff2');
  font-display: swap;  /* Show fallback text immediately, swap when loaded */
  font-weight: 400;
  font-style: normal;
}
```

### Subset Fonts

Only include the characters you need:

```bash
# Using pyftsubset (fonttools)
pyftsubset Inter-Regular.ttf \
  --output-file=Inter-Regular-subset.woff2 \
  --flavor=woff2 \
  --layout-features="kern,liga" \
  --unicodes="U+0000-00FF,U+2010-2027"
```

Original: 90KB → Subset: 18KB (80% reduction).

### Size-Adjusted Fallbacks (Reduce CLS)

```css
@font-face {
  font-family: 'Inter Fallback';
  src: local('Arial');
  ascent-override: 90%;
  descent-override: 22%;
  line-gap-override: 0%;
  size-adjust: 107%;
}

body {
  font-family: 'Inter', 'Inter Fallback', sans-serif;
}
```

## JavaScript Optimization

### Code Splitting

Don't load everything upfront. Split by route and load on demand:

```javascript
// SvelteKit/Vite: automatic route-based splitting
// Each +page.svelte becomes its own chunk

// Dynamic imports for heavy libraries
const { Chart } = await import('chart.js');

// Svelte: component-level splitting
{#await import('./HeavyComponent.svelte') then { default: Component }}
  <Component />
{/await}
```

### Tree Shaking

Import only what you use:

```javascript
// ❌ Imports the entire library (400KB+)
import _ from 'lodash';
_.debounce(fn, 300);

// ✅ Import only the function (4KB)
import debounce from 'lodash/debounce';
debounce(fn, 300);

// ✅ Even better: Write it yourself for simple utils
function debounce(fn, ms) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}
```

### Defer Third-Party Scripts

```html
<!-- ❌ Render-blocking -->
<script src="https://analytics.example.com/tracker.js"></script>

<!-- ✅ Deferred: downloads in parallel, executes after HTML parsing -->
<script defer src="https://analytics.example.com/tracker.js"></script>

<!-- ✅ Async: downloads in parallel, executes immediately when ready -->
<script async src="https://analytics.example.com/tracker.js"></script>
```

**Rule of thumb:**
- `defer` for scripts that need DOM access
- `async` for independent scripts (analytics, ads)
- Neither for critical inline scripts

### Break Up Long Tasks

Tasks > 50ms block the main thread and hurt INP:

```javascript
// ❌ Long task: processes everything in one frame
function processLargeArray(items) {
  items.forEach(item => heavyComputation(item));
}

// ✅ Yield to the main thread between chunks
async function processLargeArray(items) {
  const CHUNK_SIZE = 100;
  for (let i = 0; i < items.length; i += CHUNK_SIZE) {
    const chunk = items.slice(i, i + CHUNK_SIZE);
    chunk.forEach(item => heavyComputation(item));
    
    // Yield control back to the browser
    await new Promise(resolve => setTimeout(resolve, 0));
  }
}

// ✅ Or use scheduler.yield() (modern browsers)
async function processLargeArray(items) {
  for (const item of items) {
    heavyComputation(item);
    if (navigator.scheduling?.isInputPending()) {
      await scheduler.yield();
    }
  }
}
```

## CSS Optimization

### Critical CSS

Inline the CSS needed for above-the-fold content, defer the rest:

```html
<head>
  <!-- Critical CSS inlined -->
  <style>
    body { margin: 0; font-family: system-ui; }
    .header { height: 64px; background: #1a1a2e; }
    .hero { min-height: 60vh; display: grid; place-items: center; }
  </style>
  
  <!-- Non-critical CSS loaded async -->
  <link rel="preload" href="/styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="/styles.css"></noscript>
</head>
```

### Reduce CSS Complexity

```css
/* ❌ Expensive: universal selectors, deep nesting */
body * { box-sizing: border-box; }
.nav > ul > li > a > span { color: red; }

/* ✅ Cheap: class selectors, flat structure */
*, *::before, *::after { box-sizing: border-box; }
.nav-link-text { color: red; }
```

### Avoid Layout Thrashing

```javascript
// ❌ Forces layout recalculation on every iteration
elements.forEach(el => {
  const height = el.offsetHeight;  // Read (forces layout)
  el.style.height = height + 10 + 'px';  // Write (invalidates layout)
});

// ✅ Batch reads, then batch writes
const heights = elements.map(el => el.offsetHeight);  // All reads
elements.forEach((el, i) => {
  el.style.height = heights[i] + 10 + 'px';  // All writes
});
```

## Caching Strategy

### HTTP Cache Headers

```
# Immutable assets (hashed filenames): cache forever
Cache-Control: public, max-age=31536000, immutable

# HTML pages: always revalidate
Cache-Control: no-cache
# (no-cache means "revalidate every time", not "don't cache")

# API responses: short cache
Cache-Control: public, max-age=60, s-maxage=300

# Private data (user-specific): browser only
Cache-Control: private, max-age=600
```

### Service Worker Caching

```javascript
// Cache-first for static assets
self.addEventListener('fetch', (event) => {
  if (event.request.destination === 'image' || 
      event.request.destination === 'font' ||
      event.request.destination === 'style') {
    event.respondWith(
      caches.match(event.request).then(cached => {
        return cached || fetch(event.request).then(response => {
          const clone = response.clone();
          caches.open('static-v1').then(cache => cache.put(event.request, clone));
          return response;
        });
      })
    );
  }
});
```

### Filename Hashing

```javascript
// Vite/Webpack output with content hashes
// When file changes, hash changes, cache busts automatically
dist/
  assets/
    index-a1b2c3d4.js    // changes hash when code changes
    style-e5f6g7h8.css   // changes hash when styles change
```

## Server-Side Optimizations

### Enable Compression

```bash
# Nginx: Brotli (preferred) + Gzip fallback
brotli on;
brotli_types text/html text/css application/javascript application/json image/svg+xml;
brotli_comp_level 6;

gzip on;
gzip_types text/html text/css application/javascript application/json image/svg+xml;
gzip_min_length 256;
```

Brotli achieves 15-25% better compression than Gzip.

### Preconnect to Third-Party Origins

```html
<!-- DNS + TCP + TLS handshake ahead of time -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://cdn.example.com" crossorigin>

<!-- DNS only (lighter, for less critical origins) -->
<link rel="dns-prefetch" href="https://analytics.example.com">
```

### HTTP/2 and HTTP/3

- **HTTP/2:** Multiplexing (parallel requests over single connection), header compression, server push
- **HTTP/3:** QUIC protocol, faster connection setup (0-RTT), better on lossy networks

Both eliminate the need for old bundling hacks like sprite sheets and domain sharding.

## Measuring Performance

### Lab Tools (Development)

```bash
# Lighthouse CLI
npx lighthouse https://your-site.com --output html --output-path report.html

# WebPageTest (detailed waterfall)
# https://www.webpagetest.org

# Chrome DevTools Performance tab
# Record a session, analyze long tasks, layout shifts
```

### Field Data (Real Users)

```javascript
// Web Vitals library
import { onLCP, onINP, onCLS } from 'web-vitals';

onLCP(metric => sendToAnalytics('LCP', metric));
onINP(metric => sendToAnalytics('INP', metric));
onCLS(metric => sendToAnalytics('CLS', metric));

function sendToAnalytics(name, metric) {
  const body = JSON.stringify({
    name,
    value: metric.value,
    rating: metric.rating,  // "good", "needs-improvement", "poor"
    navigationType: metric.navigationType,
    url: window.location.href,
  });
  
  // Use sendBeacon for reliability
  navigator.sendBeacon('/api/analytics', body);
}
```

### Performance Budget

Set limits and enforce them in CI:

```json
{
  "budgets": [
    {
      "resourceType": "script",
      "budget": 200
    },
    {
      "resourceType": "stylesheet",
      "budget": 50
    },
    {
      "resourceType": "image",
      "budget": 300
    },
    {
      "resourceType": "total",
      "budget": 600
    },
    {
      "metric": "lcp",
      "budget": 2500
    },
    {
      "metric": "cls",
      "budget": 0.1
    }
  ]
}
```

## Quick Wins Checklist

| Optimization | Impact | Effort |
|---|---|---|
| Convert images to AVIF/WebP | High | Low |
| Add `width`/`height` to images | High (CLS) | Low |
| Lazy load below-fold images | Medium | Low |
| Preload LCP image | High | Low |
| Subset web fonts | Medium | Low |
| Use `font-display: swap` | Medium (CLS) | Low |
| Enable Brotli compression | Medium | Low |
| Add `defer` to scripts | Medium | Low |
| Preconnect to third-party origins | Low-Medium | Low |
| Code split routes | High | Medium |
| Implement service worker cache | Medium | Medium |
| Replace heavy libraries | High | Medium-High |
| Inline critical CSS | Medium | Medium |
| Set up performance monitoring | — | Medium |

Start from the top and work down. The first five items alone can cut your page weight by 60% and push your Core Web Vitals into the green.

Performance optimization is iterative—measure, fix the biggest bottleneck, measure again, repeat. The tools are free, the impact is immediate, and your users will notice the difference even if they can't articulate why your site just *feels* faster.
