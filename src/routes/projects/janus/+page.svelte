<script>
  import SEO from '$lib/components/SEO.svelte';
  import { onMount } from 'svelte';
  
  const project = {
    title: 'Janus',
    tagline: 'The open-source bouncer that only real humans can sweet-talk.',
    description: 'It feels your shaky hands on a phone, watches your lazy mouse wiggles on a laptop, and listens for the tiny sighs of a real battery dying. One robotic twitch, one perfect straight-line scroll, one impossible leap to a hidden page — and Janus slams the door forever. Small sites, zero cost, bots obliterated.',
    image: '/projects/janus.webp',
    status: 'Active', // Active, Completed, Experimental, Archived
    year: '2024',
    readingTime: '8 min read', // Estimated reading time
    links: {
      github: 'https://github.com/djtsingh/janus',
      demo: '#',
      docs: '#'
    }
  };
  
  const features = [
    {
      icon: '⚡',
      title: 'ZeroTrust Block',
      description: 'Permanently blocks IPs exhibiting automated patterns, no cloud, no cost, fully self-hosted.'
    },
    {
      icon: '🎯',
      title: 'MotionAuth',
      description: 'Verifies real human grip through accelerometer variance and touch entropy.'
    },
    {
      icon: '🔒',
      title: 'HardwareProof',
      description: 'Confirms physical device via battery discharge patterns and unique GPU rendering signatures.'
    },
    {
      icon: '🚀',
      title: 'BehaviorGuard',
      description: 'Continuously analyzes navigation sequence, scrolling dynamics, and interaction timing.'
    }
  ];
  
  const techStack = [
    { name: 'GoLang', category: 'language' },
    { name: 'IPBlocking', category: 'framework' },
    { name: 'TypeScript', category: 'framework' },
    { name: 'Docker', category: 'tool' },
    { name: 'HTML', category: 'frontend' },
    { name: 'PostgreSQL', category: 'database' }
  ];
  
  const screenshots = [
    { src: '/projects/janus.webp', alt: 'Janus main interface', caption: 'Main dashboard view' },
    // Add more screenshots as needed
  ];

  import { tick } from 'svelte';

  // Ensure libraries are available before any code runs
  if (typeof window !== 'undefined') {
    // Window is ready
  }
  let showSimulator = false;
  let simulatorInitialized = false;
  let simulatorCleanup = null;
  let previousActiveElement = null;
  let scrollPosition = 0;
  let openButtonRef;
  let isNarrowScreen = false;

  // Traffic visualization state
  let stats = {
    totalRequests: 0,
    botsBlocked: 0,
    usersVerified: 0,
    activeChecks: 0,
    avgScore: 0
  };
  let isRunning = true;
  let speed = 1;
  let selectedParticle = null;
  let particles = [];
  let animationId = null;
  let canvasRef;
  let lastTime = 0;

  // Particle types for the visualization
  const PARTICLE_TYPES = {
    LEGITIMATE: { color: '#10b981', label: 'Legitimate User', score: 85 },
    SUSPICIOUS: { color: '#f59e0b', label: 'Suspicious', score: 45 },
    BOT: { color: '#ef4444', label: 'Bot', score: 15 }
  };

  // Verification stages
  const STAGES = {
    INCOMING: { x: 0.1, label: 'Incoming Traffic', icon: '→' },
    FINGERPRINT: { x: 0.25, label: 'Fingerprinting', icon: '🔍' },
    CHALLENGE: { x: 0.4, label: 'Challenge Issued', icon: '🎯' },
    PROOF: { x: 0.55, label: 'Proof Verification', icon: '⚡' },
    SCORING: { x: 0.7, label: 'Score Analysis', icon: '📊' },
    DECISION: { x: 0.85, label: 'Decision', icon: '⚖️' }
  };

  // Particle class
  class Particle {
    constructor(canvas) {
      this.canvas = canvas;
      const types = Object.values(PARTICLE_TYPES);
      this.type = types[Math.floor(Math.random() * types.length)];
      this.x = 50;
      this.y = 150 + Math.random() * 200;
      this.size = 8;
      this.stage = 'INCOMING';
      this.progress = 0;
      this.score = this.type.score + (Math.random() * 20 - 10);
      this.id = Math.random().toString(36).substr(2, 9);
      this.trail = [];
      this.glowIntensity = 0;
      
      // Verification data
      this.fingerprint = {
        canvas: Math.random().toString(36).substr(2, 8),
        userAgent: ['Chrome', 'Firefox', 'Safari'][Math.floor(Math.random() * 3)],
        screen: `${[1920, 1366, 1440][Math.floor(Math.random() * 3)]}x${[1080, 768, 900][Math.floor(Math.random() * 3)]}`,
        timezone: [-5, 0, 5.5][Math.floor(Math.random() * 3)]
      };
      
      this.challenge = {
        nonce: Math.random().toString(36).substr(2, 16),
        difficulty: this.type === PARTICLE_TYPES.BOT ? 0 : 2,
        seed: Math.random().toString(36).substr(2, 8)
      };
    }

    update(deltaTime, canvasWidth, canvasHeight) {
      const stageKeys = Object.keys(STAGES);
      const currentStageIndex = stageKeys.indexOf(this.stage);
      
      if (currentStageIndex < stageKeys.length - 1) {
        const currentStage = STAGES[this.stage];
        const nextStage = STAGES[stageKeys[currentStageIndex + 1]];
        
        const targetX = nextStage.x * canvasWidth;
        this.x += (targetX - this.x) * 0.02 * deltaTime * speed;
        
        // Add wave motion
        this.y += Math.sin(this.x * 0.01) * 0.5;
        
        // Progress through stage
        this.progress += 0.01 * deltaTime * speed;
        
        if (this.progress >= 1) {
          this.progress = 0;
          this.stage = stageKeys[currentStageIndex + 1];
          this.glowIntensity = 1;
        }
      }
      
      // Fade glow
      this.glowIntensity *= 0.95;
      
      // Trail effect
      this.trail.push({ x: this.x, y: this.y });
      if (this.trail.length > 15) this.trail.shift();
      
      return this.stage !== 'DECISION' || this.x < canvasWidth;
    }

    draw(ctx) {
      // Draw trail
      this.trail.forEach((pos, i) => {
        const alpha = (i / this.trail.length) * 0.3;
        ctx.fillStyle = `${this.type.color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, this.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Glow effect
      if (this.glowIntensity > 0) {
        ctx.shadowBlur = 20 * this.glowIntensity;
        ctx.shadowColor = this.type.color;
      }

      // Main particle
      ctx.fillStyle = this.type.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowBlur = 0;

      // Score indicator
      ctx.fillStyle = 'white';
      ctx.font = 'bold 10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(Math.round(this.score), this.x, this.y + 3);
    }

    isClicked(mouseX, mouseY) {
      const dist = Math.sqrt((mouseX - this.x) ** 2 + (mouseY - this.y) ** 2);
      return dist < this.size + 5;
    }
  }

  // Preload libs on mount but don't init simulator until user opens modal
  onMount(() => {
    // Initialize narrow screen detection
    isNarrowScreen = window.innerWidth < 768;
    
    // Handle window resize to update narrow screen detection
    const handleResize = () => {
      isNarrowScreen = window.innerWidth < 768;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  async function openSimulator() {
    previousActiveElement = document.activeElement;
    scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    showSimulator = true;
    document.body.classList.add('has-modal');
    document.documentElement.classList.add('has-modal');
    await tick();
    // focus management: move focus to the start/pause button when opened
    const startButton = document.querySelector('.janus-modal button');
    if (!simulatorInitialized) initSimulator();
    (startButton || document.querySelector('#traffic-canvas'))?.focus();
  }

  function closeSimulator() {
    showSimulator = false;
    document.body.classList.remove('has-modal');
    document.documentElement.classList.remove('has-modal');
    // Restore scroll position
    window.scrollTo(0, scrollPosition);
    if (simulatorCleanup) {
      try { simulatorCleanup(); } catch (e) { /* ignore cleanup errors */ }
      simulatorCleanup = null;
      simulatorInitialized = false;
    }
    // restore focus to previous element
    try { if (previousActiveElement && typeof previousActiveElement.focus === 'function') previousActiveElement.focus(); } catch(e){}
  }

  function initSimulator() {
    simulatorInitialized = true;
    canvasRef = document.getElementById('traffic-canvas');
    if (!canvasRef) return;

    const ctx = canvasRef.getContext('2d');
    const resizeCanvas = () => {
      if (!canvasRef || !canvasRef.offsetWidth || !canvasRef.offsetHeight) return;
      canvasRef.width = canvasRef.offsetWidth;
      canvasRef.height = canvasRef.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let spawnTimer = 0;

    const animate = (currentTime) => {
      // Safety check: ensure canvas and context still exist
      if (!canvasRef || !ctx) return;
      
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      ctx.fillStyle = '#0a0f1e';
      ctx.fillRect(0, 0, canvasRef.width, canvasRef.height);

      // Draw grid
      ctx.strokeStyle = '#1a2332';
      ctx.lineWidth = 1;
      for (let i = 0; i < canvasRef.width; i += 50) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvasRef.height);
        ctx.stroke();
      }
      for (let i = 0; i < canvasRef.height; i += 50) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvasRef.width, i);
        ctx.stroke();
      }

      // Draw stage markers
      const stageEntries = Object.entries(STAGES);
      const labelWidth = 120; // Width of each label box
      const minSpacing = labelWidth + 20; // Minimum space between labels
      
      stageEntries.forEach(([key, stage], index) => {
        const x = stage.x * canvasRef.width;
        
        // Stage line
        ctx.strokeStyle = '#2d3748';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvasRef.height);
        ctx.stroke();
        ctx.setLineDash([]);

        // Check if this label would overlap with adjacent labels
        let showText = true;
        if (canvasRef.width < 768) { // Mobile breakpoint
          // Check overlap with previous label
          if (index > 0) {
            const prevStage = stageEntries[index - 1][1];
            const prevX = prevStage.x * canvasRef.width;
            if (Math.abs(x - prevX) < minSpacing) {
              showText = false;
            }
          }
          // Check overlap with next label
          if (index < stageEntries.length - 1) {
            const nextStage = stageEntries[index + 1][1];
            const nextX = nextStage.x * canvasRef.width;
            if (Math.abs(x - nextX) < minSpacing) {
              showText = false;
            }
          }
        }

        if (showText) {
          // Stage label background
          ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
          ctx.fillRect(x - 60, 15, 120, 40);
          
          // Stage label border
          ctx.strokeStyle = '#4f46e5';
          ctx.lineWidth = 1;
          ctx.strokeRect(x - 60, 15, 120, 40);

          // Stage icon
          ctx.fillStyle = '#60a5fa';
          ctx.font = 'bold 18px system-ui';
          ctx.textAlign = 'center';
          ctx.fillText(stage.icon, x, 35);

          // Stage label
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 12px system-ui';
          ctx.fillText(stage.label, x, 50);
        } else {
          // Just show the icon without background when overlapping
          ctx.fillStyle = '#60a5fa';
          ctx.font = 'bold 16px system-ui';
          ctx.textAlign = 'center';
          ctx.fillText(stage.icon, x, 35);
        }
      });

      // Spawn new particles
      if (isRunning) {
        spawnTimer += deltaTime * 0.06 * speed;
        if (spawnTimer > 60) {
          particles = [...particles, new Particle(canvasRef)];
          spawnTimer = 0;
        }
      }

      // Update and draw particles
      let activeChecks = 0;
      particles = particles.filter(particle => {
        const alive = particle.update(deltaTime * 0.06, canvasRef.width, canvasRef.height);
        if (alive) {
          particle.draw(ctx);
          if (particle.stage !== 'INCOMING' && particle.stage !== 'DECISION') {
            activeChecks++;
          }
          return true;
        } else {
          // Update stats when particle reaches end
          stats = {
            ...stats,
            totalRequests: stats.totalRequests + 1,
            botsBlocked: stats.botsBlocked + (particle.type === PARTICLE_TYPES.BOT ? 1 : 0),
            usersVerified: stats.usersVerified + (particle.type === PARTICLE_TYPES.LEGITIMATE ? 1 : 0),
            activeChecks: activeChecks,
            avgScore: ((stats.avgScore * stats.totalRequests) + particle.score) / (stats.totalRequests + 1)
          };
          return false;
        }
      });

      stats = { ...stats, activeChecks };

      // Draw selected particle info highlight
      if (selectedParticle) {
        const particle = particles.find(p => p.id === selectedParticle.id);
        if (particle) {
          ctx.strokeStyle = '#60a5fa';
          ctx.lineWidth = 2;
          ctx.setLineDash([5, 5]);
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size + 10, 0, Math.PI * 2);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate(0);

    const handleClick = (e) => {
      const rect = canvasRef.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const clicked = particles.find(p => p.isClicked(x, y));
      selectedParticle = clicked || null;
    };

    canvasRef.addEventListener('click', handleClick);

    // Modal-level keyboard handlers: ESC to quit
    const modalEl = document.querySelector('.janus-modal');
    const modalKeyHandler = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); closeSimulator(); }
    };
    if (modalEl) modalEl.addEventListener('keydown', modalKeyHandler);

    // cleanup closure
    simulatorCleanup = () => {
      try { if (animationId) cancelAnimationFrame(animationId); } catch(e){}
      try { window.removeEventListener('resize', resizeCanvas); } catch(e){}
      try { canvasRef?.removeEventListener('click', handleClick); } catch(e){}
      try { if (modalEl) modalEl.removeEventListener('keydown', modalKeyHandler); } catch(e){}
      particles = [];
      stats = { totalRequests: 0, botsBlocked: 0, usersVerified: 0, activeChecks: 0, avgScore: 0 };
      selectedParticle = null;
    };
  }
</script>

<SEO 
  title="Janus | Projects | Daljeet Singh Lotey"
  description="{project.tagline} - A project by Daljeet Singh Lotey"
  image={project.image}
  canonical="https://djtsingh.github.io/projects/janus"
  type="article"
/>

<svelte:head>
  <!-- No external libraries needed for Janus simulator -->
</svelte:head>

<article class="project-page">
  <!-- Back Navigation -->
  <nav class="breadcrumb">
    <a href="/projects" class="back-link">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m15 18-6-6 6-6"/>
      </svg>
      All Projects
    </a>
  </nav>

  <!-- Hero Section -->
  <header class="project-hero">
    <div class="hero-content">
      <div class="hero-meta">
        <span class="status status--{project.status.toLowerCase()}">{project.status}</span>
        <span class="year">{project.year}</span>
        <span class="reading-time">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
          {project.readingTime}
        </span>
      </div>
      <h1>{project.title}</h1>
      <p class="tagline">{project.tagline}</p>
      <p class="description">{project.description}</p>
      
      <div class="hero-actions">
          {#if project.links.demo && project.links.demo !== '#'}
            <a href={project.links.demo} class="btn btn--primary" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" x2="21" y1="14" y2="3"/>
              </svg>
              Live Demo
            </a>
          {/if}
          {#if project.links.github}
            <a href={project.links.github} class="btn btn--secondary" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              View Source
            </a>
            <button class="btn btn--primary open-sim-btn" on:click={openSimulator} aria-label="Open Janus simulator" bind:this={openButtonRef}>
              <span class="open-emoji" aria-hidden="true">👁️‍🗨️</span>
              <span>Open Simulator</span>
              <span class="spark">✨</span>
            </button>
          {/if}
          {#if project.links.docs && project.links.docs !== '#'}
            <a href={project.links.docs} class="btn btn--ghost" target="_blank" rel="noopener noreferrer">
              Documentation
            </a>
          {/if}
      </div>
    </div>
    
    <div class="hero-image">
      <img src={project.image} alt="{project.title} preview" />
    </div>
  </header>

  <!-- Features Section -->
  <section class="section features-section">
    <h2 class="section-title">Features</h2>
    <div class="features-grid">
      {#each features as feature}
        <div class="feature-card">
          <span class="feature-icon">{feature.icon}</span>
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
        </div>
      {/each}
    </div>
  </section>
  {#if showSimulator}
    <div class="janus-modal fixed inset-0 z-50 bg-black/90 flex items-center justify-center {isNarrowScreen ? 'narrow-screen' : ''}" role="dialog" aria-modal="true" aria-labelledby="janus-modal-title" on:touchstart={(e) => { if (!isNarrowScreen) { e.preventDefault(); e.stopPropagation(); } }} on:touchmove={(e) => { if (!isNarrowScreen) { e.preventDefault(); e.stopPropagation(); } }} on:touchend={(e) => { if (!isNarrowScreen) { e.preventDefault(); e.stopPropagation(); } }} on:wheel={(e) => { if (!isNarrowScreen) { e.preventDefault(); e.stopPropagation(); } }}>
      <div class="modal-inner relative w-full h-full flex flex-col bg-slate-950 text-white {isNarrowScreen ? 'overflow-y-auto' : 'overflow-hidden'}">
        <!-- Header -->
        <div class="bg-black border-b border-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 p-4 md:p-6 shadow-2xl flex-shrink-0 relative">
          <div class="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 rounded-t-lg"></div>
          <div class="relative max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div class="flex items-center gap-3 md:gap-4 flex-shrink-0">
              <div class="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <span class="text-xl md:text-2xl">🛡️</span>
              </div>
              <div class="min-w-0">
                <h1 id="janus-modal-title" class="text-xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent truncate">
                  Janus Bot Mitigation Engine
                </h1>
                <p class="text-slate-300 text-xs md:text-sm">Real-time Traffic Analysis & Threat Detection</p>
              </div>
            </div>
            <div class="flex flex-wrap gap-2 md:gap-3 justify-center md:justify-end flex-shrink-0">
              <button
                on:click={() => isRunning = !isRunning}
                class="px-4 py-2 md:px-6 md:py-2 rounded-lg font-semibold text-sm md:text-base transition-all {isRunning ? 'bg-amber-600 hover:bg-amber-700' : 'bg-green-600 hover:bg-green-700'} shadow-lg"
              >
                {isRunning ? 'Pause' : 'Start'}
              </button>
              <button
                on:click={() => {
                  particles = [];
                  stats = { totalRequests: 0, botsBlocked: 0, usersVerified: 0, activeChecks: 0, avgScore: 0 };
                  selectedParticle = null;
                }}
                class="px-4 py-2 md:px-6 md:py-2 bg-slate-700 hover:bg-slate-600 rounded-lg font-semibold text-sm md:text-base transition-all shadow-lg"
              >
                Reset
              </button>
              <button
                on:click={closeSimulator}
                class="px-4 py-2 md:px-6 md:py-2 bg-slate-600 hover:bg-slate-500 rounded-lg font-semibold text-sm md:text-base transition-all shadow-lg"
                aria-label="Quit simulator"
              >
                Quit
              </button>
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <div class="flex-1 flex flex-col lg:flex-row gap-4 p-4 {isNarrowScreen ? 'overflow-visible' : 'overflow-hidden'}">
          <!-- Stats Panel -->
          <div class="w-full lg:w-80 space-y-4 overflow-y-auto flex-shrink-0 order-2 lg:order-1 max-h-[40vh] lg:max-h-none scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
            <!-- Real-time Stats -->
            <!-- Real-time Stats -->
            <div class="bg-slate-900 rounded-xl p-4 border border-slate-800 shadow-lg">
              <h3 class="text-lg font-bold mb-4 flex items-center gap-2">
                <span class="text-cyan-400">📊</span>
                Live Statistics
              </h3>
              <div class="space-y-3">
                <div class="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                  <div class="flex items-center gap-3">
                    <span class="text-blue-400">👥</span>
                    <span class="text-sm text-slate-300">Total Requests</span>
                  </div>
                  <span class="text-xl font-bold text-blue-400">{stats.totalRequests}</span>
                </div>
                <div class="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                  <div class="flex items-center gap-3">
                    <span class="text-green-400">✅</span>
                    <span class="text-sm text-slate-300">Users Verified</span>
                  </div>
                  <span class="text-xl font-bold text-green-400">{stats.usersVerified}</span>
                </div>
                <div class="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                  <div class="flex items-center gap-3">
                    <span class="text-red-400">🚫</span>
                    <span class="text-sm text-slate-300">Bots Blocked</span>
                  </div>
                  <span class="text-xl font-bold text-red-400">{stats.botsBlocked}</span>
                </div>
                <div class="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                  <div class="flex items-center gap-3">
                    <span class="text-yellow-400">⚡</span>
                    <span class="text-sm text-slate-300">Active Checks</span>
                  </div>
                  <span class="text-xl font-bold text-yellow-400">{stats.activeChecks}</span>
                </div>
                <div class="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                  <div class="flex items-center gap-3">
                    <span class="text-purple-400">📈</span>
                    <span class="text-sm text-slate-300">Avg Score</span>
                  </div>
                  <span class="text-xl font-bold text-purple-400">{Math.round(stats.avgScore)}</span>
                </div>
              </div>
            </div>

            <!-- Speed Control -->
            <div class="bg-slate-900 rounded-xl p-4 border border-slate-800 shadow-lg">
              <h3 class="text-lg font-bold mb-3">Simulation Speed</h3>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.5"
                bind:value={speed}
                class="w-full"
              />
              <div class="text-center mt-2 text-cyan-400 font-mono">{speed}x</div>
            </div>

            <!-- Legend -->
            <div class="bg-slate-900 rounded-xl p-4 border border-slate-800 shadow-lg">
              <h3 class="text-lg font-bold mb-3">Traffic Types</h3>
              <div class="space-y-2">
                {#each Object.entries(PARTICLE_TYPES) as [key, type]}
                  <div class="flex items-center gap-3">
                    <div class="w-4 h-4 rounded-full" style="background-color: {type.color}"></div>
                    <span class="text-sm">{type.label}</span>
                    <span class="ml-auto text-xs text-slate-400">~{type.score}</span>
                  </div>
                {/each}
              </div>
            </div>

            <!-- Selected Particle Info -->
            {#if selectedParticle}
              <div class="bg-slate-900 rounded-xl p-4 border border-cyan-500 shadow-lg">
                <h3 class="text-lg font-bold mb-3 flex items-center gap-2">
                  <span class="text-cyan-400">🔍</span>
                  Request Details
                </h3>
                <div class="space-y-2 text-sm font-mono">
                  <div><span class="text-slate-400">ID:</span> {selectedParticle.id}</div>
                  <div><span class="text-slate-400">Type:</span> <span style="color: {selectedParticle.type.color}">{selectedParticle.type.label}</span></div>
                  <div><span class="text-slate-400">Score:</span> {Math.round(selectedParticle.score)}/100</div>
                  <div><span class="text-slate-400">Stage:</span> {STAGES[selectedParticle.stage]?.label}</div>
                  
                  <div class="pt-2 border-t border-slate-700">
                    <div class="text-slate-400 mb-1 flex items-center gap-1">
                      <span>🔗</span>
                      Fingerprint
                    </div>
                    <div class="pl-4 text-xs space-y-1">
                      <div>Canvas: {selectedParticle.fingerprint.canvas}</div>
                      <div>UA: {selectedParticle.fingerprint.userAgent}</div>
                      <div>Screen: {selectedParticle.fingerprint.screen}</div>
                      <div>TZ: GMT{selectedParticle.fingerprint.timezone > 0 ? '+' : ''}{selectedParticle.fingerprint.timezone}</div>
                    </div>
                  </div>

                  <div class="pt-2 border-t border-slate-700">
                    <div class="text-slate-400 mb-1 flex items-center gap-1">
                      <span>🌐</span>
                      Challenge
                    </div>
                    <div class="pl-4 text-xs space-y-1">
                      <div>Nonce: {selectedParticle.challenge.nonce}</div>
                      <div>Difficulty: {selectedParticle.challenge.difficulty}</div>
                      <div>Seed: {selectedParticle.challenge.seed}</div>
                    </div>
                  </div>
                </div>
              </div>
            {/if}
          </div>

          <!-- Canvas -->
          <div class="flex-1 relative order-1 lg:order-2 min-h-[40vh] lg:min-h-0">
            <canvas
              id="traffic-canvas"
              bind:this={canvasRef}
              class="w-full h-full rounded-xl border-2 border-slate-800 shadow-2xl cursor-pointer"
            />
            <div class="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg p-2 md:p-3 text-xs font-mono shadow-lg max-w-xs">
              <div class="text-cyan-400 mb-1">Click any particle for details</div>
              <div class="text-slate-400 hidden md:block">← Traffic flows left to right →</div>
              <div class="text-slate-400 md:hidden">Tap particles for details</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}

  <!-- Tech Stack Section -->
  <section class="section stack-section">
    <h2 class="section-title">Tech Stack</h2>
    <div class="stack-grid">
      {#each techStack as tech}
        <span class="stack-badge" data-category={tech.category}>{tech.name}</span>
      {/each}
    </div>
  </section>

  <!-- Screenshots Section -->
  {#if screenshots.length > 0}
    <section class="section screenshots-section">
      <h2 class="section-title">Screenshots</h2>
      <div class="screenshots-grid">
        {#each screenshots as screenshot}
          <figure class="screenshot">
            <img src={screenshot.src} alt={screenshot.alt} />
            {#if screenshot.caption}
              <figcaption>{screenshot.caption}</figcaption>
            {/if}
          </figure>
        {/each}
      </div>
    </section>
  {/if}

  <!-- CTA Section -->
    <!-- Simulator will open in a fullscreen modal when the user clicks 'Open Simulator' -->
  <section class="section cta-section">
    <div class="cta-content">
      <h2>Interested in this project?</h2>
      <p>Check out the source code, try the demo, or get in touch to collaborate.</p>
      <div class="cta-actions">
        {#if project.links.github}
          <a href={project.links.github} class="btn btn--primary" target="_blank" rel="noopener noreferrer">
            View on GitHub
          </a>
        {/if}
        <a href="/about" class="btn btn--ghost">Contact Me</a>
      </div>
    </div>
  </section>
</article>

<style>
  .project-page {
    max-width: 1100px;
    margin: 0 auto;
  }

  /* Breadcrumb */
  .breadcrumb {
    margin-bottom: 2rem;
  }

  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: var(--subtext0);
    transition: color 0.15s ease;
  }

  .back-link:hover {
    color: var(--accent);
  }

  /* Hero Section */
  .project-hero {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-bottom: 4rem;
  }

  @media (min-width: 768px) {
    .project-hero {
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
      align-items: center;
    }
  }

  .hero-meta {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;
  }
  
  .reading-time {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.8rem;
    color: var(--subtext1);
  }
  
  .reading-time svg {
    color: var(--accent);
  }

  .status {
    padding: 0.25rem 0.75rem;
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-radius: var(--radius-sm);
  }

  .status--active {
    background: rgba(166, 227, 161, 0.2);
    color: var(--green);
  }

  .status--completed {
    background: rgba(137, 180, 250, 0.2);
    color: var(--blue);
  }

  .status--experimental {
    background: rgba(250, 179, 135, 0.2);
    color: var(--peach);
  }

  .status--archived {
    background: rgba(147, 153, 178, 0.2);
    color: var(--subtext0);
  }

  .year {
    font-size: 0.8rem;
    color: var(--subtext0);
  }

  .hero-content h1 {
    margin: 0 0 0.75rem;
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 700;
    color: var(--text);
  }

  .tagline {
    margin: 0 0 1rem;
    font-size: 1.125rem;
    color: var(--accent);
    font-weight: 500;
  }

  .description {
    margin: 0 0 1.5rem;
    font-size: 1rem;
    line-height: 1.7;
    color: var(--subtext1);
  }

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .hero-image {
    border-radius: var(--radius-lg);
    overflow: hidden;
    border: 1px solid var(--surface0);
  }

  .hero-image img {
    width: 100%;
    height: auto;
    display: block;
  }

  /* Buttons */
  .btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    font-size: 0.875rem;
    font-weight: 500;
    border-radius: var(--radius-md);
    transition: all 0.15s ease;
    cursor: pointer;
    border: none;
  }

  .btn--primary {
    background: var(--accent);
    color: var(--mantle);
  }

  .btn--primary:hover {
    filter: brightness(1.1);
    transform: translateY(-1px);
  }

  .btn--secondary {
    background: var(--surface0);
    color: var(--text);
  }

  .btn--secondary:hover {
    background: var(--surface1);
  }

  .btn--ghost {
    background: transparent;
    color: var(--text);
    border: 1px solid var(--surface1);
  }

  .btn--ghost:hover {
    background: var(--surface0);
    border-color: var(--surface1);
  }

  /* Sections */
  .section {
    margin-bottom: 4rem;
  }

  .section-title {
    margin: 0 0 1.5rem;
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text);
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .section-title::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--surface0);
  }

  /* Features */
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1.25rem;
  }

  .feature-card {
    padding: 1.5rem;
    background: var(--base);
    border: 1px solid var(--surface0);
    border-radius: var(--radius-md);
    transition: border-color 0.15s ease;
  }

  .feature-card:hover {
    border-color: var(--surface1);
  }

  .feature-icon {
    display: block;
    font-size: 1.75rem;
    margin-bottom: 0.75rem;
  }

  .feature-card h3 {
    margin: 0 0 0.5rem;
    font-size: 1rem;
    font-weight: 600;
    color: var(--text);
  }

  .feature-card p {
    margin: 0;
    font-size: 0.875rem;
    line-height: 1.6;
    color: var(--subtext0);
  }

  /* Tech Stack */
  .stack-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .stack-badge {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
    font-weight: 500;
    background: var(--surface0);
    color: var(--text);
    border-radius: var(--radius-sm);
    border: 1px solid transparent;
    transition: border-color 0.15s ease;
  }

  .stack-badge:hover {
    border-color: var(--accent);
  }

  .stack-badge[data-category="language"] {
    border-left: 3px solid var(--blue);
  }

  .stack-badge[data-category="framework"] {
    border-left: 3px solid var(--green);
  }

  .stack-badge[data-category="tool"] {
    border-left: 3px solid var(--peach);
  }

  .stack-badge[data-category="frontend"] {
    border-left: 3px solid var(--mauve);
  }

  .stack-badge[data-category="database"] {
    border-left: 3px solid var(--yellow);
  }

  /* Screenshots */
  .screenshots-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .screenshot {
    margin: 0;
  }

  .screenshot img {
    width: 100%;
    border-radius: var(--radius-md);
    border: 1px solid var(--surface0);
  }

  .screenshot figcaption {
    margin-top: 0.75rem;
    font-size: 0.8rem;
    color: var(--subtext0);
    text-align: center;
  }

  /* CTA Section */
  .cta-section {
    text-align: center;
    padding: 3rem 2rem;
    background: var(--base);
    border: 1px solid var(--surface0);
    border-radius: var(--radius-lg);
  }

  .cta-content h2 {
    margin: 0 0 0.75rem;
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--text);
  }

  .cta-content p {
    margin: 0 0 1.5rem;
    color: var(--subtext1);
  }

  .cta-actions {
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
  }
  /* Simulator styles */
  :global(#portal::before) {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.03) 50%, transparent 70%);
    animation: fog 20s linear infinite;
    pointer-events: none;
  }
  @keyframes fog { 0% { transform: translateX(-100%) translateY(-100%); } 100% { transform: translateX(100vw) translateY(100vh); } }

  :global(#launch:hover) { box-shadow: 0 0 20px rgba(99, 102, 241, 0.5); transform: scale(1.05); }
  :global(#flow-canvas) { background: radial-gradient(circle at center, #1e3a8a 0%, #0f172a 100%); }
  :global(.glow) { filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.5)); }
  :global(.particle) { position: absolute; width: 4px; height: 4px; background: #3b82f6; border-radius: 50%; }
  /* Modal styles */
  .janus-modal { 
    backdrop-filter: blur(6px); 
    z-index: 999999 !important; 
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    pointer-events: auto !important;
  }
  .janus-modal .modal-inner { 
    z-index: 100000; 
    position: relative;
    max-height: 100vh;
  }
  
  /* Prevent body scroll when modal is open */
  :global(body.has-modal) { 
    overflow: hidden !important; 
    touch-action: none !important;
    position: fixed !important;
    width: 100% !important;
    height: 100% !important;
    top: 0 !important;
    left: 0 !important;
    /* Hide scrollbar */
    scrollbar-width: none !important;
    -ms-overflow-style: none !important;
  }
  :global(body.has-modal::-webkit-scrollbar) {
    display: none !important;
  }
  :global(html.has-modal) {
    overflow: hidden !important;
  }
  .modal-close { z-index: 100001; }
  /* Open simulator button styling */
  :global(.open-sim-btn) { display:inline-flex; align-items:center; gap:0.5rem; padding:0.65rem 1rem; font-weight:600; box-shadow:0 6px 18px rgba(59,130,246,0.12); transform:translateZ(0); }
  :global(.open-sim-btn .open-emoji) { font-size:1.05rem; }
  :global(.open-sim-btn .spark) { margin-left:0.25rem; opacity:0.95; }
  @keyframes pulse-sim { 0% { box-shadow: 0 0 0 0 rgba(59,130,246,0.35); } 70% { box-shadow: 0 0 0 12px rgba(59,130,246,0); } 100% { box-shadow: 0 0 0 0 rgba(59,130,246,0); } }
  :global(.open-sim-btn) { animation: pulse-sim 2.5s infinite; }

  /* Modal close (left-top) */
  :global(.modal-close) { left: 1rem; right: auto; }
  
  /* Custom scrollbar for stats panel */
  :global(.scrollbar-thin) { scrollbar-width: thin; }
  :global(.scrollbar-thumb-slate-600) { scrollbar-color: #475569 #1e293b; }
  :global(.scrollbar-thumb-slate-600::-webkit-scrollbar) { width: 6px; }
  :global(.scrollbar-thumb-slate-600::-webkit-scrollbar-track) { background: #1e293b; }
  :global(.scrollbar-thumb-slate-600::-webkit-scrollbar-thumb) { background: #475569; border-radius: 3px; }
  :global(.scrollbar-thumb-slate-600::-webkit-scrollbar-thumb:hover) { background: #64748b; }
</style>
