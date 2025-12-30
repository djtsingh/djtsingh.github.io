<script>
  export const siteConfig = {
    name: 'Daljeet Singh Lotey',
    givenName: 'Daljeet Singh',
    familyName: 'Lotey',
    jobTitle: 'Software Engineering & Data Science',
    
    url: 'https://djtsingh.github.io',
    alternateUrl: 'https://www.daljeetsingh.me',
    
    description: 'Daljeet Singh Lotey | Software Engineering and Data Science. Portfolio showcasing projects in AI, data visualization, and experiments.',
    shortBio: 'CS grad building software that matters. Data, algorithms, and full-stack engineering.',
    
    image: '/assets/optimized/dj-web.jpg',
    
    twitterHandle: '@djt5ingh',
    githubHandle: 'djtsingh',
    linkedinHandle: 'djtsingh',
    
    socials: {
      github: 'https://github.com/djtsingh',
      linkedin: 'https://www.linkedin.com/in/djtsingh/',
      twitter: 'https://x.com/djt5ingh'
    },
    
    alumniOf: 'Amity University Computer Science Graduate',
    knowsAbout: ['Software Engineering', 'Data Science', 'Machine Learning', 'Full-Stack Development', 'Python', 'JavaScript']
  };

  export let title = undefined;
  export let description = undefined;
  export let image = undefined;
  export let type = undefined;
  export let noindex = undefined;
  export let canonical = undefined;

  export let meta = {};

  $: mergedMeta = {
    title: title ?? meta.title,
    description: description ?? meta.description,
    image: image ?? meta.image,
    type: type ?? meta.type,
    noindex: noindex ?? meta.noindex,
    canonical: canonical ?? meta.canonical
  };

  $: pageTitle = mergedMeta.title || siteConfig.name;
  $: pageDescription = mergedMeta.description || siteConfig.description;
  $: pageImage = mergedMeta.image || siteConfig.image;
  $: fullImageUrl = pageImage.startsWith('http') || pageImage.startsWith('//') ? pageImage : `${siteConfig.url}${pageImage}`;
  $: pageType = mergedMeta.type || 'website';
  $: canonicalUrl = mergedMeta.canonical ? (mergedMeta.canonical.startsWith('http') ? mergedMeta.canonical : `${siteConfig.url}${mergedMeta.canonical}`) : siteConfig.url;
  
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
  
  $: organizationSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteConfig.url}/#organization`,
    name: `${siteConfig.name} - Portfolio`,
    url: siteConfig.url,
    logo: `${siteConfig.url}/assets/optimized/dj-web.jpg`,
    description: siteConfig.description,
    founder: { '@id': `${siteConfig.url}/#person` },
    sameAs: [
      siteConfig.socials.github,
      siteConfig.socials.linkedin,
      siteConfig.socials.twitter
    ]
  });

  $: websiteSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: { '@id': `${siteConfig.url}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteConfig.url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  });

  $: breadcrumbSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteConfig.url
      }
    ]
  });
</script>

<svelte:head>
  <title>{pageTitle}</title>
  <meta name="description" content={pageDescription} />
  <link rel="canonical" href={canonicalUrl} />
  
  <!-- Apple Touch Icon -->
  <link rel="apple-touch-icon" href="/assets/optimized/apple-touch-icon.png" />
  
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
  
  <!-- Enhanced Meta Tags -->
  <meta name="keywords" content="Daljeet Singh Lotey, software engineer, data science, portfolio, AI, machine learning, full-stack development, Python, JavaScript" />
  <meta name="theme-color" content="#1e1e2e" />
  <meta name="msapplication-TileColor" content="#1e1e2e" />
  <meta name="application-name" content={siteConfig.name} />
  
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:image:alt" content={`${siteConfig.name} - ${siteConfig.jobTitle}`} />
  
  <meta name="twitter:image:alt" content={`${siteConfig.name} - ${siteConfig.jobTitle}`} />
  
  {#if pageType === 'article'}
    <meta property="article:author" content={siteConfig.name} />
    <meta property="article:publisher" content={siteConfig.socials.linkedin} />
  {/if}
  
  <!-- JSON-LD Structured Data -->
  {@html `<script type="application/ld+json">${personSchema}</script>`}
  {@html `<script type="application/ld+json">${websiteSchema}</script>`}
  {@html `<script type="application/ld+json">${organizationSchema}</script>`}
  {@html `<script type="application/ld+json">${breadcrumbSchema}</script>`}
  
  <!-- Robots -->
  {#if mergedMeta.noindex}
    <meta name="robots" content="noindex,follow" />
  {:else}
    <meta name="robots" content="index,follow" />
  {/if}
</svelte:head>
