/**
 * Individual blog post loader
 * Loads specific post by slug with related posts
 */
import { error } from '@sveltejs/kit';
import { findRelatedPosts } from '$lib/utils/blog.js';

export async function load({ params }) {
  try {
    // Import the specific post
    const post = await import(`../../../posts/${params.slug}.md`);
    
    // Import all posts for related posts calculation
    const allPostModules = import.meta.glob('/src/posts/*.md', { eager: true });
    const allPosts = [];
    
    for (const path in allPostModules) {
      const p = allPostModules[path];
      const slug = path.split('/').pop()?.replace('.md', '');
      
      if (p.metadata && slug !== params.slug) {
        allPosts.push({
          slug,
          ...p.metadata,
          readingTime: p.metadata.readingTime || 5
        });
      }
    }
    
    // Sort all posts by date
    const sortedPosts = allPosts
      .filter(p => p.published !== false)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Find related posts
    const relatedPosts = findRelatedPosts(
      { slug: params.slug, ...post.metadata },
      sortedPosts,
      3
    );
    
    // Find prev/next posts for navigation
    const currentPostDate = new Date(post.metadata.date);
    const currentMetadata = { slug: params.slug, ...post.metadata };
    
    // Add current post to sorted list to find neighbors
    const allSorted = [...sortedPosts, currentMetadata]
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    
    const currentIndex = allSorted.findIndex(p => p.slug === params.slug);
    const prevPost = currentIndex > 0 ? allSorted[currentIndex - 1] : null;
    const nextPost = currentIndex < allSorted.length - 1 ? allSorted[currentIndex + 1] : null;
    
    return {
      content: post.default,
      metadata: {
        slug: params.slug,
        ...post.metadata,
        readingTime: post.metadata.readingTime || 5
      },
      relatedPosts,
      prevPost,
      nextPost
    };
  } catch (e) {
    console.error(`Error loading post ${params.slug}:`, e);
    throw error(404, `Post not found: ${params.slug}`);
  }
}
