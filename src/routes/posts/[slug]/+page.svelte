<script>
  /**
   * Individual blog post page
   * Renders markdown content with full layout
   */
  import BlogLayout from '$lib/components/blog/BlogLayout.svelte';
  
  export let data;
  
  $: ({ content, metadata, relatedPosts, prevPost, nextPost } = data);
</script>

<BlogLayout 
  {metadata} 
  {relatedPosts}
  {prevPost}
  {nextPost}
>
  <svelte:component this={content} />
</BlogLayout>
