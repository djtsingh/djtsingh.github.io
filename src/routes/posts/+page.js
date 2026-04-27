/**
 * Blog posts page loader
 * Loads and validates all markdown posts at build time
 */
import { calculateReadingTime } from '$lib/utils/blog.js';
import { validateBlogMetadata } from '$lib/schemas/blog.ts';

export async function load() {
  // Import all markdown files from the posts directory
  const postModules = import.meta.glob('/src/posts/*.md', { eager: true });
  
  const posts = [];
  const errors = [];
  
  for (const [path, mod] of Object.entries(postModules)) {
    const slug = path.split('/').pop()?.replace('.md', '');
    
    if (!slug) {
      errors.push({ path, error: 'Could not extract slug from path' });
      continue;
    }
    
    if (!mod.metadata) {
      errors.push({ slug, error: 'Post has no metadata/frontmatter' });
      continue;
    }
    
    try {
      // Validate metadata against schema
      const validatedMetadata = validateBlogMetadata(mod.metadata, slug);
      
      posts.push({
        slug,
        ...validatedMetadata,
        // Ensure reading time is set (fallback to calculated value)
        readingTime: validatedMetadata.readingTime || calculateReadingTime(mod.default?.raw || '')
      });
    } catch (error) {
      errors.push({
        slug,
        error: error instanceof Error ? error.message : String(error)
      });
    }
  }
  
  // Log validation errors in development
  if (errors.length > 0) {
    console.error('[Blog Validation Errors]');
    errors.forEach(({ slug, error }) => {
      console.error(`  ${slug}: ${error}`);
    });
    
    // In production, fail the build if there are validation errors
    if (process.env.NODE_ENV === 'production') {
      throw new Error(
        `Blog validation failed with ${errors.length} error(s). Check logs above.`
      );
    }
  }
  
  // Sort by date (newest first)
  const sortedPosts = posts
    .filter(post => post.published !== false)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return {
    posts: sortedPosts,
    validationWarnings: errors.length
  };
}
