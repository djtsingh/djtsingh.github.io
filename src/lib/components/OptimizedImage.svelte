<script lang="ts">
  /**
   * Optimized responsive image component with accessibility support
   * Uses the build-script generated variants with srcset
   * Supports both informative and decorative images
   */

  interface ImageProps {
    src: string;
    alt: string;
    width?: number | null;
    height?: number | null;
    sizes?: string;
    loading?: "lazy" | "eager";
    decoding?: "async" | "sync";
    class?: string;
    objectFit?: "cover" | "contain" | "fill" | "scale-down";
    onload?: () => void;
    role?: string;
    isDecorative?: boolean;
  }

  let {
    src,
    alt,
    width = null,
    height = null,
    sizes = "100vw",
    loading = "lazy" as const,
    decoding = "async" as const,
    class: className = "",
    objectFit = "cover",
    onload = () => {},
    role = undefined,
    isDecorative = false,
  }: ImageProps = $props();

  /**
   * Check if image should be optimized
   * Only optimizes raster images in specific paths, skips SVG
   */
  function shouldOptimizeImage(imageSrc: string): boolean {
    if (!imageSrc) return false;

    const isInOptimizablePath =
      imageSrc.startsWith("/projects/") || imageSrc.startsWith("/assets/blog/");

    const isRasterImage = /\.(png|jpg|jpeg|webp)$/i.test(imageSrc);

    return isInOptimizablePath && isRasterImage;
  }

  /**
   * Generate srcset string from image path
   */
  function generateSrcset(originalSrc: string): string {
    const pathParts = originalSrc.split("/");
    const filename = pathParts.pop()?.replace(/\.[^/.]+$/, "");
    const basePath = pathParts.join("/");

    return [
      `${basePath}/optimized/${filename}-sm.webp 480w`,
      `${basePath}/optimized/${filename}-md.webp 800w`,
      `${basePath}/optimized/${filename}-lg.webp 1200w`,
    ].join(", ");
  }

  /**
   * Get optimized image source (medium variant)
   */
  function getOptimizedSrc(originalSrc: string): string {
    const pathParts = originalSrc.split("/");
    const filename = pathParts.pop()?.replace(/\.[^/.]+$/, "");
    const basePath = pathParts.join("/");
    return `${basePath}/optimized/${filename}-md.webp`;
  }

  // Determine if image should be optimized (reactive to src changes)
  const shouldOptimizeImg = $derived(shouldOptimizeImage(src));

  let imgSrc = $derived(shouldOptimizeImg ? getOptimizedSrc(src) : src);
  let imgSrcset = $derived(shouldOptimizeImg ? generateSrcset(src) : null);
  let hasError = $state(false);

  function handleError(e: Event) {
    if (!hasError && shouldOptimizeImg) {
      hasError = true;
      // Fallback to original source on optimization failure
    }
  }
</script>

{#if shouldOptimizeImg && !hasError}
  <img
    src={imgSrc}
    srcset={imgSrcset}
    {sizes}
    alt={isDecorative ? "" : alt}
    {width}
    {height}
    {loading}
    {decoding}
    class={className}
    style:object-fit={objectFit}
    role={role || (isDecorative ? "presentation" : "img")}
    aria-hidden={isDecorative ? "true" : undefined}
    onerror={handleError}
    onload={onload}
  />
{:else}
  <img
    {src}
    alt={isDecorative ? "" : alt}
    {width}
    {height}
    {loading}
    {decoding}
    class={className}
    style:object-fit={objectFit}
    role={role || (isDecorative ? "presentation" : "img")}
    aria-hidden={isDecorative ? "true" : undefined}
    onload={onload}
  />
{/if}
