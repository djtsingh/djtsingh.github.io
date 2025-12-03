<script>
  // Site-wide SEO defaults
  export const siteConfig = {
    name: 'Daljeet Singh Lotey',
    url: 'https://djtsingh.github.io',
    description: 'Daljeet Singh Lotey — Software Engineering and Data Science. Portfolio showcasing projects in AI, data visualization, and experiments.',
    image: '/assets/dj-web.jpg',
    twitterHandle: '@djt5ingh',
    socials: {
      github: 'https://github.com/djtsingh',
      linkedin: 'https://www.linkedin.com/in/djtsingh/',
      twitter: 'https://x.com/djt5ingh'
    }
  };

  /** @type {{ title?: string, description?: string, image?: string, type?: string, noindex?: boolean }} */
  export let meta = {};

  $: pageTitle = meta.title ? `${meta.title} — ${siteConfig.name}` : siteConfig.name;
  $: pageDescription = meta.description || siteConfig.description;
  $: pageImage = meta.image || siteConfig.image;
  $: fullImageUrl = pageImage.startsWith('http') ? pageImage : `${siteConfig.url}${pageImage}`;
  $: pageType = meta.type || 'website';
</script>

<svelte:head>
  <title>{pageTitle}</title>
  <meta name="description" content={pageDescription} />
  <link rel="canonical" href={siteConfig.url} />
  
  <!-- Open Graph -->
  <meta property="og:site_name" content={siteConfig.name} />
  <meta property="og:title" content={pageTitle} />
  <meta property="og:description" content={pageDescription} />
  <meta property="og:type" content={pageType} />
  <meta property="og:image" content={fullImageUrl} />
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={pageTitle} />
  <meta name="twitter:description" content={pageDescription} />
  <meta name="twitter:image" content={fullImageUrl} />
  
  <!-- Robots -->
  {#if meta.noindex}
    <meta name="robots" content="noindex,follow" />
  {:else}
    <meta name="robots" content="index,follow" />
  {/if}
</svelte:head>
