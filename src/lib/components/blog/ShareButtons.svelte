<script>
  /**
   * ShareButtons - Social sharing buttons with animations
   * Features: Native Web Share API, copy to clipboard, animated feedback
   */
  import { browser } from '$app/environment';
  import { siteConfig } from '$lib/config/site.js';
  
  export let title = '';
  export let url = '';
  export let compact = false;
  
  let copied = false;
  let canShare = browser && navigator.share;
  
  $: fullUrl = url.startsWith('http') ? url : `${siteConfig.url}${url}`;
  
  async function shareNative() {
    if (!canShare) return;
    
    try {
      await navigator.share({
        title,
        url: fullUrl
      });
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Share failed:', err);
      }
    }
  }
  
  async function copyToClipboard() {
    if (!browser) return;
    
    try {
      await navigator.clipboard.writeText(fullUrl);
      copied = true;
      setTimeout(() => copied = false, 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  }
  
  function shareTwitter() {
    const text = encodeURIComponent(title);
    const shareUrl = encodeURIComponent(fullUrl);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${shareUrl}`, '_blank', 'width=550,height=420');
  }
  
  function shareLinkedIn() {
    const shareUrl = encodeURIComponent(fullUrl);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`, '_blank', 'width=550,height=420');
  }
  
  function shareReddit() {
    const text = encodeURIComponent(title);
    const shareUrl = encodeURIComponent(fullUrl);
    window.open(`https://reddit.com/submit?url=${shareUrl}&title=${text}`, '_blank', 'width=550,height=420');
  }
  
  function shareHackerNews() {
    const text = encodeURIComponent(title);
    const shareUrl = encodeURIComponent(fullUrl);
    window.open(`https://news.ycombinator.com/submitlink?u=${shareUrl}&t=${text}`, '_blank', 'width=550,height=420');
  }
</script>

<div class="share-buttons" class:compact>
  <!-- Native share (mobile) -->
  {#if canShare}
    <button 
      class="share-btn native"
      on:click={shareNative}
      title="Share"
      aria-label="Share this article"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="18" cy="5" r="3"/>
        <circle cx="6" cy="12" r="3"/>
        <circle cx="18" cy="19" r="3"/>
        <line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/>
        <line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/>
      </svg>
      {#if !compact}<span>Share</span>{/if}
    </button>
  {/if}
  
  <!-- Twitter/X -->
  <button 
    class="share-btn twitter"
    on:click={shareTwitter}
    title="Share on X (Twitter)"
    aria-label="Share on X"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
    {#if !compact}<span>Twitter</span>{/if}
  </button>
  
  <!-- LinkedIn -->
  <button 
    class="share-btn linkedin"
    on:click={shareLinkedIn}
    title="Share on LinkedIn"
    aria-label="Share on LinkedIn"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
    {#if !compact}<span>LinkedIn</span>{/if}
  </button>
  
  <!-- Reddit -->
  {#if !compact}
    <button 
      class="share-btn reddit"
      on:click={shareReddit}
      title="Share on Reddit"
      aria-label="Share on Reddit"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
      </svg>
      <span>Reddit</span>
    </button>
    
    <!-- Hacker News -->
    <button 
      class="share-btn hn"
      on:click={shareHackerNews}
      title="Share on Hacker News"
      aria-label="Share on Hacker News"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M0 0v24h24V0H0zm12.8 13.4v5.7h-1.6v-5.7L7.4 6h1.8l3 5.4 3-5.4h1.8l-4.2 7.4z"/>
      </svg>
      <span>HN</span>
    </button>
  {/if}
  
  <!-- Copy link -->
  <button 
    class="share-btn copy"
    class:copied
    on:click={copyToClipboard}
    title={copied ? 'Copied!' : 'Copy link'}
    aria-label="Copy link to clipboard"
  >
    {#if copied}
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    {:else}
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
      </svg>
    {/if}
    {#if !compact}<span>{copied ? 'Copied!' : 'Copy'}</span>{/if}
  </button>
</div>

<style>
  .share-buttons {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
  }
  
  .share-buttons.compact {
    gap: 0.5rem;
  }
  
  .share-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.6rem 1rem;
    background: var(--surface0);
    border: 1px solid var(--surface1);
    border-radius: var(--radius-full);
    color: var(--text);
    font-size: 0.85rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .compact .share-btn {
    padding: 0.5rem;
    border-radius: 50%;
  }
  
  .compact .share-btn span {
    display: none;
  }
  
  .share-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  .share-btn:active {
    transform: translateY(0);
  }
  
  /* Platform-specific colors on hover */
  .share-btn.twitter:hover {
    background: #1da1f2;
    border-color: #1da1f2;
    color: white;
  }
  
  .share-btn.linkedin:hover {
    background: #0a66c2;
    border-color: #0a66c2;
    color: white;
  }
  
  .share-btn.reddit:hover {
    background: #ff4500;
    border-color: #ff4500;
    color: white;
  }
  
  .share-btn.hn:hover {
    background: #ff6600;
    border-color: #ff6600;
    color: white;
  }
  
  .share-btn.native:hover {
    background: var(--accent);
    border-color: var(--accent);
    color: var(--crust);
  }
  
  .share-btn.copy:hover {
    background: var(--surface1);
    border-color: var(--accent);
  }
  
  .share-btn.copy.copied {
    background: var(--green);
    border-color: var(--green);
    color: var(--crust);
  }
  
  .share-btn svg {
    flex-shrink: 0;
  }
</style>
