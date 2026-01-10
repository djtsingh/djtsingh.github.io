/**
 * Blog Stores - Reactive state management for the blog system
 */
import { writable, derived } from 'svelte/store';
import { searchPosts, filterPostsByTag, sortPosts, getAllTags } from '$lib/utils/blog.js';

// Core stores
export const allPosts = writable([]);
export const searchQuery = writable('');
export const selectedTag = writable(null);
export const sortBy = writable('date');
export const sortOrder = writable('desc');
export const viewMode = writable('grid'); // 'grid' or 'list'

// Derived stores
export const filteredPosts = derived(
  [allPosts, searchQuery, selectedTag, sortBy, sortOrder],
  ([$allPosts, $searchQuery, $selectedTag, $sortBy, $sortOrder]) => {
    let result = $allPosts.filter(post => post.published !== false);
    
    // Apply tag filter
    if ($selectedTag) {
      result = filterPostsByTag(result, $selectedTag);
    }
    
    // Apply search
    if ($searchQuery?.trim()) {
      result = searchPosts(result, $searchQuery);
    } else {
      // Only sort if not searching (search already sorts by relevance)
      result = sortPosts(result, $sortBy, $sortOrder);
    }
    
    return result;
  }
);

// All unique tags with counts
export const availableTags = derived(allPosts, ($allPosts) => {
  return getAllTags($allPosts.filter(post => post.published !== false));
});

// Post count stats
export const postStats = derived(allPosts, ($allPosts) => {
  const published = $allPosts.filter(post => post.published !== false);
  const totalReadingTime = published.reduce((sum, post) => sum + (post.readingTime || 0), 0);
  
  return {
    total: published.length,
    totalReadingTime,
    averageReadingTime: published.length ? Math.round(totalReadingTime / published.length) : 0
  };
});

// Reading progress store (for individual post pages)
export const readingProgress = writable(0);

// Active heading for ToC highlighting
export const activeHeadingId = writable(null);

// Reset all filters
export function resetFilters() {
  searchQuery.set('');
  selectedTag.set(null);
  sortBy.set('date');
  sortOrder.set('desc');
}
