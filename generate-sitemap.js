import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Site configuration
const siteUrl = 'https://djtsingh.github.io';
const staticDir = path.join(__dirname, 'static');

// Static pages that exist
const pages = [
  '', // home page
  '/about',
  '/certifications',
  '/journey',
  '/posts',
  '/projects',
  '/socials'
];

// Project pages (these would need to be dynamically generated in a real app)
const projectPages = [
  '/projects/portfolio',
  '/projects/janus',
  '/projects/market-prediction'
];

// Generate sitemap XML
function generateSitemap() {
  const currentDate = new Date().toISOString();

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

`;

  // Add all pages
  [...pages, ...projectPages].forEach(page => {
    const priority = page === '' ? '1.0' : page.startsWith('/projects') ? '0.8' : '0.9';
    const changefreq = page === '' ? 'weekly' : 'monthly';

    sitemap += `  <url>
    <loc>${siteUrl}${page}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>

`;
  });

  sitemap += '</urlset>';

  // Write sitemap to static folder
  const sitemapPath = path.join(staticDir, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemap, 'utf8');

  console.log(`✅ Sitemap generated: ${sitemapPath}`);
  console.log(`📊 Total URLs: ${pages.length + projectPages.length}`);
}

generateSitemap();