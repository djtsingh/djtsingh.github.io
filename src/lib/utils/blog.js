/**
 * Blog utilities and helpers
 * Handles post loading, filtering, sorting, and search functionality
 */

/**
 * Calculate reading time for a given text content
 * @param {string} content - The text content to analyze
 * @returns {number} - Estimated reading time in minutes
 */
export function calculateReadingTime(content) {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

/**
 * Format date to readable string
 * @param {string} dateString - ISO date string
 * @param {object} options - Intl.DateTimeFormat options
 * @returns {string} - Formatted date string
 */
export function formatDate(dateString, options = {}) {
  const defaultOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString('en-US', { ...defaultOptions, ...options });
}

/**
 * Format date to relative time (e.g., "2 days ago")
 * @param {string} dateString - ISO date string
 * @returns {string} - Relative time string
 */
export function getRelativeTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now - date;
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) return 'Today';
  if (diffInDays === 1) return 'Yesterday';
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
  return `${Math.floor(diffInDays / 365)} years ago`;
}

/**
 * Generate a slug from a string
 * @param {string} str - String to slugify
 * @returns {string} - URL-safe slug
 */
export function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Find related posts based on tags
 * @param {object} currentPost - Current post object
 * @param {array} allPosts - Array of all posts
 * @param {number} limit - Maximum number of related posts to return
 * @returns {array} - Array of related posts
 */
export function findRelatedPosts(currentPost, allPosts, limit = 3) {
  if (!currentPost?.tags || !allPosts) return [];
  
  return allPosts
    .filter(post => 
      post.slug !== currentPost.slug && 
      post.published !== false &&
      post.tags?.some(tag => currentPost.tags?.includes(tag))
    )
    .map(post => ({
      ...post,
      matchScore: post.tags.filter(tag => currentPost.tags.includes(tag)).length
    }))
    .sort((a, b) => {
      // Sort by match score first, then by date
      if (b.matchScore !== a.matchScore) return b.matchScore - a.matchScore;
      return new Date(b.date) - new Date(a.date);
    })
    .slice(0, limit);
}

/**
 * Group posts by year
 * @param {array} posts - Array of posts
 * @returns {object} - Posts grouped by year
 */
export function groupPostsByYear(posts) {
  return posts.reduce((groups, post) => {
    const year = new Date(post.date).getFullYear();
    if (!groups[year]) groups[year] = [];
    groups[year].push(post);
    return groups;
  }, {});
}

/**
 * Get all unique tags from posts
 * @param {array} posts - Array of posts
 * @returns {array} - Array of unique tags with counts
 */
export function getAllTags(posts) {
  const tagCounts = {};
  posts.forEach(post => {
    post.tags?.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  return Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Filter posts by tag
 * @param {array} posts - Array of posts
 * @param {string} tag - Tag to filter by
 * @returns {array} - Filtered posts
 */
export function filterPostsByTag(posts, tag) {
  if (!tag) return posts;
  return posts.filter(post => post.tags?.includes(tag));
}

/**
 * Search posts by query
 * @param {array} posts - Array of posts
 * @param {string} query - Search query
 * @returns {array} - Filtered posts matching query
 */
export function searchPosts(posts, query) {
  if (!query?.trim()) return posts;
  
  const searchTerms = query.toLowerCase().trim().split(/\s+/);
  
  return posts
    .map(post => {
      let score = 0;
      const titleLower = post.title?.toLowerCase() || '';
      const descLower = post.description?.toLowerCase() || '';
      const tagsLower = post.tags?.map(t => t.toLowerCase()) || [];
      
      searchTerms.forEach(term => {
        // Title matches are weighted highest
        if (titleLower.includes(term)) score += 10;
        // Description matches
        if (descLower.includes(term)) score += 5;
        // Tag matches
        if (tagsLower.some(t => t.includes(term))) score += 7;
      });
      
      return { ...post, searchScore: score };
    })
    .filter(post => post.searchScore > 0)
    .sort((a, b) => b.searchScore - a.searchScore);
}

/**
 * Create a search index for client-side search
 * @param {array} posts - Array of posts
 * @returns {array} - Search index entries
 */
export function createSearchIndex(posts) {
  return posts.map(post => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    tags: post.tags,
    date: post.date
  }));
}

/**
 * Sort posts by various criteria
 * @param {array} posts - Array of posts
 * @param {string} sortBy - Sort criteria ('date', 'title', 'readingTime')
 * @param {string} order - Sort order ('asc' or 'desc')
 * @returns {array} - Sorted posts
 */
export function sortPosts(posts, sortBy = 'date', order = 'desc') {
  const sorted = [...posts].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'readingTime':
        return (a.readingTime || 0) - (b.readingTime || 0);
      case 'date':
      default:
        return new Date(b.date) - new Date(a.date);
    }
  });
  
  return order === 'asc' ? sorted.reverse() : sorted;
}

/**
 * Get featured posts
 * @param {array} posts - Array of posts
 * @param {number} limit - Maximum number of featured posts
 * @returns {array} - Featured posts
 */
export function getFeaturedPosts(posts, limit = 3) {
  return posts
    .filter(post => post.featured && post.published !== false)
    .slice(0, limit);
}

/**
 * Generate Table of Contents from markdown content
 * @param {string} content - Markdown/HTML content
 * @returns {array} - Array of heading objects
 */
export function generateTableOfContents(content) {
  const headingRegex = /<h([2-4])[^>]*id="([^"]*)"[^>]*>([^<]*)<\/h[2-4]>/gi;
  const toc = [];
  let match;
  
  while ((match = headingRegex.exec(content)) !== null) {
    toc.push({
      level: parseInt(match[1]),
      id: match[2],
      text: match[3].trim()
    });
  }
  
  return toc;
}

/**
 * Estimate content type distribution (code, text, images)
 * @param {string} content - Post content
 * @returns {object} - Content type percentages
 */
export function analyzeContentType(content) {
  const codeBlocks = (content.match(/```[\s\S]*?```/g) || []).join('').length;
  const totalLength = content.length;
  
  return {
    codePercentage: Math.round((codeBlocks / totalLength) * 100) || 0,
    textPercentage: Math.round(((totalLength - codeBlocks) / totalLength) * 100) || 100
  };
}
