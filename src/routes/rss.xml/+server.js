/**
 * RSS Feed Generator
 * Generates RSS 2.0 feed for blog posts
 */
import { siteConfig } from '$lib/config/site.js';

// Enable prerendering for static site generation
export const prerender = true;

// Import all blog posts
const posts = import.meta.glob('/src/posts/*.md', { eager: true });

/** @type {import('./$types').RequestHandler} */
export async function GET() {
  const baseUrl = siteConfig.url;
  
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
        tags: metadata.tags || [],
        coverImage: metadata.coverImage
      };
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>${escapeXml(siteConfig.name)} - Blog</title>
    <description>${escapeXml(siteConfig.description)}</description>
    <link>${baseUrl}/posts</link>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <generator>SvelteKit</generator>
    <image>
      <url>${baseUrl}/assets/optimized/dj-web.webp</url>
      <title>${escapeXml(siteConfig.name)}</title>
      <link>${baseUrl}</link>
    </image>
${blogPosts.map(post => `    <item>
      <title>${escapeXml(post.title)}</title>
      <description>${escapeXml(post.description)}</description>
      <link>${baseUrl}/posts/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/posts/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
${post.tags.map(tag => `      <category>${escapeXml(tag)}</category>`).join('\n')}
${post.coverImage ? `      <media:content url="${baseUrl}${post.coverImage}" medium="image"/>` : ''}
    </item>`).join('\n')}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml',
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
