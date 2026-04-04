export const projects = [
  {
    title: 'DrishT: Assistive Navigation System',
    slug: 'drisht',
    description: 'Bachelor\'s thesis research developing a dual-stream AI system for visually impaired navigation combining object detection and OCR with semantic fusion.',
    image: '/projects/drisht-cover.svg',
    tags: ['AI', 'Computer Vision', 'Research'],
    featured: false,
    links: { 
      thesis: '/projects/DrishT_Thesis.pdf',
      paper: '/projects/DrishT_Paper.pdf',
      paperMd: '/projects/DrishT_Paper.md',
      doi: 'https://doi.org/10.22541/au.176843166.60388360/v1'
    }
  },
  {
    title: 'Janus API Gateway',
    slug: 'api-gateway',
    description: 'Production-grade bot defense with multi-layered verification: device fingerprinting, Proof of Work challenges, and hardware attestation protecting high-value API endpoints.',
    image: '/projects/janusinaction.png',
    tags: ['Security', 'Go', 'Infrastructure'],
    featured: true,
    links: { 
      live: 'https://api.daljeetsingh.me',
      source: 'https://github.com/djtsingh/api-gateway',
      docs: 'https://github.com/djtsingh/janus#readme'
    }
  },
  {
    title: 'Iron Dome — Hormuz Crisis Monitor',
    slug: 'straits',
    description: 'Real-time geopolitical intelligence dashboard tracking the Strait of Hormuz crisis with live commodity prices, maritime incidents, and economic impact analysis.',
    image: '/projects/straits.daljeetsingh.me.png',
    tags: ['Data Visualization', 'Next.js', 'Geopolitics'],
    featured: true,
    links: { 
      live: 'https://straits.daljeetsingh.me',
      source: 'https://github.com/djtsingh/straits'
    }
  },
  {
    title: 'Terminal — Interactive Web Shell',
    slug: 'terminal',
    description: 'Creative browser-based terminal emulator with real command parsing, virtual file system, and session persistence — showcasing frontend craftsmanship with zero dependencies.',
    image: '/projects/terminal.daljeetsingh.me.png',
    tags: ['Frontend', 'JavaScript', 'Creative'],
    featured: false,
    links: { 
      live: 'https://terminal.daljeetsingh.me',
      source: 'https://github.com/djtsingh/terminal'
    }
  },
  {
    title: 'Janus',
    slug: 'janus',
    description: 'Adversarial detection system that identifies obfuscated botnets through browser fingerprinting variance analysis and behavioral biometrics.',
    image: '/projects/janus.webp',
    tags: ['AI', 'Security', 'Open Source'],
    featured: false
  },
  {
    title: 'AI Agents Development',
    slug: null,
    description: 'Built production-ready AI agents with tool use, multi-agent orchestration, and agentic RAG pipelines using LangGraph and Google Gemini APIs.',
    image: '/projects/aiagent.png',
    tags: ['AI Agents', 'LangGraph', 'Google Gemini'],
    featured: false,
    links: { 
      course: 'https://www.kaggle.com/learn-guide/5-day-agents',
      kaggle: 'https://www.kaggle.com/djtsingh'
    }
  },
  {
    title: 'S&P 500 Market Prediction',
    slug: 'market-prediction',
    description: 'Data-driven market prediction project focused on tactical forecasting and advanced feature engineering for financial time series.',
    image: '/projects/market-prediction.webp',
    tags: ['Finance', 'Machine Learning'],
    featured: true,
    links: { source: 'https://github.com/djtsingh/Market-Prediction-2025', kaggle: 'https://www.kaggle.com/competitions/hull-tactical-market-prediction/overview' }
  },
  {
    title: 'Djx Portfolio',
    slug: 'portfolio',
    description: 'Personal portfolio built with SvelteKit featuring custom theming, optimized performance, and modern design patterns.',
    image: '/projects/djx-cover.webp',
    tags: ['SvelteKit', 'Web Design'],
    featured: false,
    links: { live: 'https://djtsingh.github.io', source: 'https://github.com/djtsingh/djtsingh.github.io' }
  }
];
