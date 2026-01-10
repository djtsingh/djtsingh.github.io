/**
 * Blog posts page loader
 * Loads all markdown posts at build time
 */
import { calculateReadingTime } from '$lib/utils/blog.js';

export async function load() {
  // Import all markdown files from the posts directory
  const postModules = import.meta.glob('/src/posts/*.md', { eager: true });
  
  const posts = [];
  
  for (const path in postModules) {
    const post = postModules[path];
    const slug = path.split('/').pop()?.replace('.md', '');
    
    if (post.metadata) {
      posts.push({
        slug,
        ...post.metadata,
        // Add reading time if not provided
        readingTime: post.metadata.readingTime || 5
      });
    }
  }
  
  // Sort by date (newest first) and filter published
  const sortedPosts = posts
    .filter(post => post.published !== false)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  
  return {
    posts: sortedPosts
  };
}
