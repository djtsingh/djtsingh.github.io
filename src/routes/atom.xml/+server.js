/**
 * Atom Feed Generator
 * Generates Atom 1.0 feed for blog posts (RFC 4287 compliant)
 */
import { siteConfig } from '$lib/config/site.js';

// Enable prerendering for static site generation
export const prerender = true;

// Import all blog posts
const posts = import.meta.glob('/src/posts/*.md', { eager: true });

/** @type {import('./$types').RequestHandler} */
export async function GET() {
  const baseUrl = siteConfig.url;
  const now = new Date().toISOString();
  
  // Parse and sort blog posts
  const blogPosts = Object.entries(posts)
    .map(([path, module]) => {
      const metadata = module.metadata;
      if (!metadata || !metadata.published) return null;
      
      return {
        slug: metadata.slug,
        title: metadata.title,
        description: metadata.description,
        date: metadata.date,
        updated: metadata.updated || metadata.date,
        tags: metadata.tags || [],
        coverImage: metadata.coverImage
      };
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  // Get latest update date
  const latestUpdate = blogPosts.length > 0 
    ? new Date(Math.max(...blogPosts.map(p => new Date(p.updated || p.date)))).toISOString()
    : now;

  const atom = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <id>${baseUrl}/</id>
  <title>${escapeXml(siteConfig.name)} - Blog</title>
  <subtitle>${escapeXml(siteConfig.description)}</subtitle>
  <link href="${baseUrl}/posts" rel="alternate" type="text/html"/>
  <link href="${baseUrl}/atom.xml" rel="self" type="application/atom+xml"/>
  <updated>${latestUpdate}</updated>
  <generator uri="https://kit.svelte.dev/" version="2.0">SvelteKit</generator>
  <icon>${baseUrl}/assets/favicon.ico</icon>
  <logo>${baseUrl}/assets/optimized/dj-web.webp</logo>
  <rights>© ${new Date().getFullYear()} ${escapeXml(siteConfig.name)}. All rights reserved.</rights>
  <author>
    <name>${escapeXml(siteConfig.name)}</name>
    <uri>${baseUrl}</uri>
  </author>
${blogPosts.map(post => `  <entry>
    <id>${baseUrl}/posts/${post.slug}</id>
    <title type="html">${escapeXml(post.title)}</title>
    <link href="${baseUrl}/posts/${post.slug}" rel="alternate" type="text/html"/>
    <published>${new Date(post.date).toISOString()}</published>
    <updated>${new Date(post.updated).toISOString()}</updated>
    <author>
      <name>${escapeXml(siteConfig.name)}</name>
    </author>
    <summary type="html">${escapeXml(post.description)}</summary>
${post.tags.map(tag => `    <category term="${escapeXml(tag)}"/>`).join('\n')}
${post.coverImage ? `    <link href="${baseUrl}${post.coverImage}" rel="enclosure" type="image/webp"/>` : ''}
  </entry>`).join('\n')}
</feed>`;

  return new Response(atom, {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
      'Cache-Control': 'max-age=0, s-maxage=3600'
    }
  });
}

/**
 * Escape special XML characters
 */
function escapeXml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
