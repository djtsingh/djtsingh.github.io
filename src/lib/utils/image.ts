/**
 * Image optimization utilities and types
 * Handles responsive image generation and srcset management
 */

export interface ImageVariant {
  width: number;
  size: 'sm' | 'md' | 'lg';
  suffix: string;
}

export interface OptimizedImageOptions {
  basePath: string;
  filename: string;
  variants: ImageVariant[];
}

export interface ImageSource {
  src: string;
  srcset: string | null;
  alt: string;
  width?: number;
  height?: number;
  loading: 'lazy' | 'eager';
}

/**
 * Image variants supported by build pipeline
 */
export const IMAGE_VARIANTS: ImageVariant[] = [
  { width: 480, size: 'sm', suffix: '-sm.webp' },
  { width: 800, size: 'md', suffix: '-md.webp' },
  { width: 1200, size: 'lg', suffix: '-lg.webp' }
];

/**
 * Generate srcset string from image path
 * @param originalSrc - Original image source path
 * @param variants - Image variants to generate
 * @returns srcset string or null if not optimizable
 */
export function generateSrcset(
  originalSrc: string,
  variants: ImageVariant[] = IMAGE_VARIANTS
): string | null {
  if (!shouldOptimizeImage(originalSrc)) {
    return null;
  }

  const pathParts = originalSrc.split('/');
  const filename = pathParts.pop()?.replace(/\.[^/.]+$/, '') || '';
  const basePath = pathParts.join('/');

  return variants
    .map(variant => `${basePath}/optimized/${filename}${variant.suffix} ${variant.width}w`)
    .join(', ');
}

/**
 * Check if image should be optimized
 * Only optimizes raster images in specific paths, skips SVG
 */
export function shouldOptimizeImage(src: string): boolean {
  if (!src) return false;

  const isInOptimizablePath =
    src.startsWith('/projects/') || src.startsWith('/assets/blog/');

  const isRasterImage = /\.(png|jpg|jpeg|webp)$/i.test(src);

  return isInOptimizablePath && isRasterImage;
}

/**
 * Get optimized image source (medium variant)
 */
export function getOptimizedImageSrc(originalSrc: string): string {
  if (!shouldOptimizeImage(originalSrc)) {
    return originalSrc;
  }

  const pathParts = originalSrc.split('/');
  const filename = pathParts.pop()?.replace(/\.[^/.]+$/, '') || '';
  const basePath = pathParts.join('/');

  return `${basePath}/optimized/${filename}-md.webp`;
}

/**
 * Get fallback image for error handling
 */
export function getFallbackImage(): string {
  return 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect fill="%23e5e7eb" width="400" height="300"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui" font-size="16" fill="%236b7280">Image not found</text></svg>';
}

/**
 * Calculate aspect ratio from dimensions
 */
export function getAspectRatio(width?: number, height?: number): string | undefined {
  if (!width || !height) return undefined;
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const divisor = gcd(width, height);
  return `${width / divisor} / ${height / divisor}`;
}
