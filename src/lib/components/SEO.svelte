<script>
  // Site-wide SEO defaults - Your Personal Brand Configuration
  export const siteConfig = {
    // Core Identity
    name: 'Daljeet Singh Lotey',
    givenName: 'Daljeet Singh',
    familyName: 'Lotey',
    jobTitle: 'Software Engineering & Data Science',
    
    // URLs
    url: 'https://djtsingh.github.io',
    alternateUrl: 'https://www.daljeetsingh.me',
    
    // Descriptions (various lengths for different platforms)
    description: 'Daljeet Singh Lotey — Software Engineering and Data Science. Portfolio showcasing projects in AI, data visualization, and experiments.',
    shortBio: 'CS grad building software that matters. Data, algorithms, and full-stack engineering.',
    
    // Media
    image: '/assets/dj-web.jpg',
    
    // Social Handles (consistent across platforms)
    twitterHandle: '@djt5ingh',
    githubHandle: 'djtsingh',
    linkedinHandle: 'djtsingh',
    
    // Social URLs
    socials: {
      github: 'https://github.com/djtsingh',
      linkedin: 'https://www.linkedin.com/in/djtsingh/',
      twitter: 'https://x.com/djt5ingh'
    },
    
    // Professional Info
    alumniOf: 'Computer Science Graduate',
    knowsAbout: ['Software Engineering', 'Data Science', 'Machine Learning', 'Full-Stack Development', 'Python', 'JavaScript']
  };

  // Meta props interface (for documentation)
  // title?: string, description?: string, image?: string, type?: string, noindex?: boolean, canonical?: string
  export let title = undefined;
  export let description = undefined;
  export let image = undefined;
  export let type = undefined;
  export let noindex = undefined;
  export let canonical = undefined;

  // For backward compatibility with meta object
  export let meta = {};

  // Merge individual props with meta object (individual props take precedence)
  $: mergedMeta = {
    title: title ?? meta.title,
    description: description ?? meta.description,
    image: image ?? meta.image,
    type: type ?? meta.type,
    noindex: noindex ?? meta.noindex,
    canonical: canonical ?? meta.canonical
  };

  $: pageTitle = mergedMeta.title ? `${mergedMeta.title} — ${siteConfig.name}` : siteConfig.name;
  $: pageDescription = mergedMeta.description || siteConfig.description;
  $: pageImage = mergedMeta.image || siteConfig.image;
  $: fullImageUrl = pageImage.startsWith('http') || pageImage.startsWith('//') ? pageImage : `${siteConfig.url}${pageImage}`;
  $: pageType = mergedMeta.type || 'website';
  $: canonicalUrl = mergedMeta.canonical ? (mergedMeta.canonical.startsWith('http') ? mergedMeta.canonical : `${siteConfig.url}${mergedMeta.canonical}`) : siteConfig.url;
  
  // Generate JSON-LD Person schema
  $: personSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteConfig.url}/#person`,
    name: siteConfig.name,
    givenName: siteConfig.givenName,
    familyName: siteConfig.familyName,
    jobTitle: siteConfig.jobTitle,
    description: siteConfig.shortBio,
    url: siteConfig.url,
    image: fullImageUrl,
    sameAs: [
      siteConfig.socials.github,
      siteConfig.socials.linkedin,
      siteConfig.socials.twitter
    ],
    knowsAbout: siteConfig.knowsAbout,
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: siteConfig.alumniOf
    }
  });
  
  // Generate WebSite schema
  $: websiteSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: `${siteConfig.name} - Portfolio`,
    description: siteConfig.description,
    author: { '@id': `${siteConfig.url}/#person` }
  });
</script>

<svelte:head>
  <title>{pageTitle}</title>
  <meta name="description" content={pageDescription} />
  <link rel="canonical" href={canonicalUrl} />
  
  <!-- Apple Touch Icon -->
  <link rel="apple-touch-icon" href="/assets/apple-touch-icon.png" />
  
  <!-- Author & Creator -->
  <meta name="author" content={siteConfig.name} />
  <link rel="me" href={siteConfig.socials.github} />
  <link rel="me" href={siteConfig.socials.linkedin} />
  <link rel="me" href={siteConfig.socials.twitter} />
  
  <!-- Open Graph -->
  <meta property="og:site_name" content={siteConfig.name} />
  <meta property="og:title" content={pageTitle} />
  <meta property="og:description" content={pageDescription} />
  <meta property="og:type" content={pageType} />
  <meta property="og:image" content={fullImageUrl} />
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:locale" content="en_US" />
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content={siteConfig.twitterHandle} />
  <meta name="twitter:creator" content={siteConfig.twitterHandle} />
  <meta name="twitter:title" content={pageTitle} />
  <meta name="twitter:description" content={pageDescription} />
  <meta name="twitter:image" content={fullImageUrl} />
  
  <!-- JSON-LD Structured Data -->
  {@html `<script type="application/ld+json">${personSchema}</script>`}
  {@html `<script type="application/ld+json">${websiteSchema}</script>`}
  
  <!-- Robots -->
  {#if mergedMeta.noindex}
    <meta name="robots" content="noindex,follow" />
  {:else}
    <meta name="robots" content="index,follow" />
  {/if}
</svelte:head>
