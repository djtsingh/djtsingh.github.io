/**
 * Type definitions for UI components
 * Provides shared types and interfaces for Svelte components
 */

/** Widget component props */
export interface WidgetProps {
  title: string;
  loading?: boolean;
  error?: string | null;
}

/** Image optimization props */
export interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number | null;
  height?: number | null;
  sizes?: string;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync';
  class?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'scale-down';
  onload?: () => void;
}

/** SEO component props */
export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  type?: 'website' | 'article' | 'profile';
  image?: string;
  author?: string;
  keywords?: string[];
}

/** Blog post metadata */
export interface BlogPost {
  title: string;
  slug: string;
  date: string;
  description: string;
  tags: string[];
  coverImage?: string;
  readingTime?: number;
  featured?: boolean;
  published?: boolean;
  updated?: string;
}

/** Search/filter state */
export interface SearchState {
  query: string;
  selectedTag: string | null;
  sortBy?: 'date' | 'title' | 'relevance';
  limit?: number;
}

/** Performance metrics */
export interface PerformanceMetrics {
  lcp?: number;
  fid?: number;
  cls?: number;
  fcp?: number;
  ttfb?: number;
  memoryUsage?: {
    used: number;
    total: number;
    limit: number;
    percentage: number;
  };
  loadTime?: number;
}

/** Project data */
export interface Project {
  id: string;
  slug?: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  featured?: boolean;
  link?: string;
  github?: string;
}

/** Navigation item */
export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

/** Theme color */
export type ThemeColor = 
  | 'text' 
  | 'subtext' 
  | 'accent' 
  | 'base' 
  | 'mantle' 
  | 'surface0' 
  | 'surface1';

/** Responsive breakpoints */
export const BREAKPOINTS = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
  wide: 1440
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;
