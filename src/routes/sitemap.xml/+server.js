/**
 * Dynamic Sitemap Generator
 * Automatically generates sitemap.xml with all blog posts
 * This runs at build time with static adapter
 */
import { siteConfig } from '$lib/config/site.js';

// Enable prerendering for static site generation
export const prerender = true;

// Import all blog posts
const posts = import.meta.glob('/src/posts/*.md', { eager: true });

/** @type {import('./$types').RequestHandler} */
export async function GET() {
  const baseUrl = siteConfig.url;
  
  // Parse blog posts
  const blogPosts = Object.entries(posts)
    .map(([path, module]) => {
      const metadata = module.metadata;
      if (!metadata || !metadata.published) return null;
      
      return {
        slug: metadata.slug,
        date: metadata.date,
        title: metadata.title,
        coverImage: metadata.coverImage,
        updated: metadata.updated
      };
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  // Static pages with their priorities and change frequencies
  const staticPages = [
    { path: '', priority: 1.0, changefreq: 'weekly', lastmod: new Date().toISOString() },
    { path: '/about', priority: 0.9, changefreq: 'monthly' },
    { path: '/posts', priority: 0.9, changefreq: 'weekly', lastmod: blogPosts[0]?.date || new Date().toISOString() },
    { path: '/certifications', priority: 0.8, changefreq: 'monthly' },
    { path: '/journey', priority: 0.8, changefreq: 'monthly' },
    { path: '/developer-dashboard', priority: 0.8, changefreq: 'monthly' },
    { path: '/socials', priority: 0.7, changefreq: 'monthly' },
    { path: '/projects', priority: 0.8, changefreq: 'monthly' },
    { path: '/projects/portfolio', priority: 0.7, changefreq: 'monthly' },
    { path: '/projects/janus', priority: 0.7, changefreq: 'monthly' },
    { path: '/projects/market-prediction', priority: 0.7, changefreq: 'monthly' },
    { path: '/projects/drisht', priority: 0.8, changefreq: 'monthly' },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

  <!-- Static Pages -->
${staticPages.map(page => `  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${page.lastmod || '2025-12-22T00:00:00.000Z'}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n\n')}

  <!-- Blog Posts -->
${blogPosts.map(post => `  <url>
    <loc>${baseUrl}/posts/${post.slug}</loc>
    <lastmod>${new Date(post.updated || post.date).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>${post.coverImage ? `
    <image:image>
      <image:loc>${baseUrl}${post.coverImage}</image:loc>
      <image:title>${escapeXml(post.title)}</image:title>
    </image:image>` : ''}
  </url>`).join('\n\n')}

</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=0, s-maxage=3600'
    }
  });
}

/**
 * Escape special XML characters
 */
function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
