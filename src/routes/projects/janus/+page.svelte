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
  let showSimulator = false;
  let simulatorInitialized = false;
  let simulatorCleanup = null;
  let previousActiveElement = null;
  let openButtonRef;

  // Preload libs on mount but don't init simulator until user opens modal
  onMount(() => {
    const waitForLibs = () => new Promise((res) => {
      const interval = setInterval(() => {
        if (window.gsap && window.anime && window.THREE) { clearInterval(interval); res(true); }
      }, 50);
      setTimeout(() => { clearInterval(interval); res(false); }, 2000);
    });
    waitForLibs();
  });

  async function openSimulator() {
    previousActiveElement = document.activeElement;
    showSimulator = true;
    await tick();
    // focus management: move focus to modal close button when opened
    const modalClose = document.querySelector('.modal-close');
    if (!simulatorInitialized) initSimulator();
    (modalClose || document.querySelector('#launch'))?.focus();
  }

  function closeSimulator() {
    showSimulator = false;
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
    const portal = document.getElementById('portal');
    const launchBtn = document.getElementById('launch');
    const canvas = document.getElementById('flow-canvas');
    const metrics = document.getElementById('metrics');
    const particlesDiv = document.getElementById('particles');
    if (!canvas) return;

    const packet = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    packet.setAttribute('r', 12);
    packet.setAttribute('fill', 'url(#glow-blue)');
    packet.classList.add('glow');
    canvas.appendChild(packet);

    const tl = gsap.timeline({ paused: true, onComplete: () => showOutcome('Access Granted! JWT Issued. 🎉') });

    // Optional 3D realm (Three.js) - initialize if available
    const realmCanvas = document.getElementById('realm-canvas');
    let realmAnimationId = null;
    let realmRenderer = null;
    let realmScene = null;
    let realmCamera = null;
    let realmPacketGroup = null;
    let realmOnResize = null;
    function initRealm() {
      try {
        if (!realmCanvas || !window.THREE) return;
        realmScene = new window.THREE.Scene();
        realmScene.fog = new window.THREE.Fog(0x0a0a1a, 1, 1000);
        realmCamera = new window.THREE.PerspectiveCamera(60, Math.max(1, realmCanvas.clientWidth) / Math.max(1, realmCanvas.clientHeight), 0.1, 2000);
        realmCamera.position.z = 120;
        realmRenderer = new window.THREE.WebGLRenderer({ canvas: realmCanvas, alpha: true, antialias: true });
        realmRenderer.setSize(realmCanvas.clientWidth, realmCanvas.clientHeight);
        realmRenderer.setPixelRatio(window.devicePixelRatio || 1);
        realmRenderer.setClearColor(0x000000, 0);

        realmPacketGroup = new window.THREE.Group();
        const count = window.innerWidth < 768 ? 50 : 150;
        for (let i = 0; i < count; i++) {
          const geometry = new window.THREE.SphereGeometry(0.6, 8, 6);
          const material = new window.THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff, transparent: true, opacity: 0.6 });
          const p = new window.THREE.Mesh(geometry, material);
          p.position.set((Math.random() - 0.5) * 200, (Math.random() - 0.5) * 100, (Math.random() - 0.5) * 400 - 200);
          p.userData = { speed: Math.random() * 1.5 + 0.2, originalZ: p.position.z };
          realmPacketGroup.add(p);
        }
        realmScene.add(realmPacketGroup);

        realmOnResize = function () {
          if (!realmCamera || !realmRenderer) return;
          realmCamera.aspect = Math.max(1, realmCanvas.clientWidth) / Math.max(1, realmCanvas.clientHeight);
          realmCamera.updateProjectionMatrix();
          realmRenderer.setSize(realmCanvas.clientWidth, realmCanvas.clientHeight);
        };
        window.addEventListener('resize', realmOnResize);

        function animateRealm() {
          realmAnimationId = requestAnimationFrame(animateRealm);
          realmPacketGroup.children.forEach((c) => {
            c.position.z += c.userData.speed;
            if (c.position.z > 300) c.position.z = c.userData.originalZ - 400;
            c.rotation.x += 0.002 * (c.userData.speed || 1);
            c.rotation.y += 0.003 * (c.userData.speed || 1);
          });
          realmPacketGroup.rotation.y += 0.0015;
          realmRenderer.render(realmScene, realmCamera);
        }
        animateRealm();
      } catch (err) { console.warn('initRealm failed', err); }
    }
    if (realmCanvas && window.THREE) initRealm();

    tl.addLabel('start')
      .to(packet, { motionPath: { path: '#bypass', align: '#bypass', autoRotate: true }, duration: 3, ease: 'power2.inOut' }, 'start')
      .addLabel('bypass')
      .to('#middleware', { scale: 1.5, duration: 0.5, yoyo: true, repeat: 1 }, 'bypass')
      .call(() => updateMetric('cookie-status', Math.random() > 0.8 ? 'Yes (Bypass! ✅)' : 'No → Scoring'))
      .addLabel('scoring')
      .to(packet, { duration: 1 }, 'scoring')
      .to('#scoring', { scale: 1.5, duration: 0.5, yoyo: true, repeat: 1 }, 'scoring')
      .call(simScoring)
      .add(() => {}, null, 'scoring');

    function simScoring() {
      const persona = document.querySelector('input[name="persona"]:checked')?.value || 'human';
      const baseScore = persona === 'bot' ? 80 : 20;
      const score = Math.max(0, Math.min(100, Math.floor(baseScore + (Math.random() * 40 - 20))));
      updateMetric('score', score);
      updateMetric('rate', score > 90 ? 'Hit! (429 🚫)' : 'Safe');

      const existing = document.getElementById('score-meter'); if (existing) existing.remove();
      const meter = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      meter.setAttribute('x', 550); meter.setAttribute('y', 500); meter.setAttribute('width', 2);
      meter.setAttribute('height', 10); meter.setAttribute('fill', score > 50 ? '#ef4444' : '#10b981');
      meter.id = 'score-meter'; canvas.appendChild(meter);
      gsap.to(meter, { attr: { width: (score / 100) * 100 }, duration: 1, ease: 'power2.out' });

      createParticles(600, 540, score > 50 ? '#ef4444' : '#10b981', 20);

      if (score > 50) {
        tl.to(packet, { motionPath: { path: '#challenge', align: '#challenge', autoRotate: true }, duration: 2, ease: 'power1.inOut' });
        tl.addLabel('challenge');
        tl.to('#challenge-node', { scale: 1.5, duration: 0.5, yoyo: true, repeat: 1 }, 'challenge');
        tl.call(simChallenge);
        tl.to(packet, { duration: 1.5 }, 'challenge');
        tl.addLabel('verify');
        tl.to('#verify', { scale: 1.5, duration: 0.5, yoyo: true, repeat: 1 }, 'verify');
        tl.call(simVerify);
        tl.to(packet, { x: 1850, y: 540, duration: 1, scale: 0, rotation: 360 });
        tl.set(packet, { visibility: 'hidden' });
      } else {
        tl.to(packet, { motionPath: { path: '#bypass', align: '#bypass', autoRotate: true }, duration: 2 });
        tl.to(packet, { x: 1700, y: 540, duration: 2 });
        tl.to(packet, { x: 1850, y: 540, duration: 1, scale: 0, rotation: 360 });
        tl.set(packet, { visibility: 'hidden' });
      }
    }

    function simChallenge() {
      updateMetric('outcome', 'Issuing Challenge: Compute PoW/PoR...');
      const nonce = Math.random().toString(36).substring(7); let proof = nonce; let attempts = 0;
      while (attempts < 100 && !proof.startsWith('0000')) { proof = btoa(proof + Date.now()).substring(0, 10); attempts++; }
      setTimeout(() => updateMetric('outcome', `Proof Ready: ${proof.substring(0,8)}...`), 1500);
      createParticles(1200, 420, '#fbbf24', 15);

      const proofCanvas = document.createElement('canvas'); proofCanvas.width = 100; proofCanvas.height = 50;
      const ctx = proofCanvas.getContext('2d'); ctx.fillStyle = '#3b82f6'; ctx.fillRect(0, 0, 100, 50);
      proofCanvas.style.position = 'fixed'; proofCanvas.style.right = '12px'; proofCanvas.style.bottom = '12px'; proofCanvas.style.zIndex = 9999;
      document.body.appendChild(proofCanvas);
      const proofHandler = (e) => { ctx.fillStyle = `hsl(${Math.random()*360}, 70%, 50%)`; ctx.fillRect(e.offsetX, e.offsetY, 10, 10); };
      proofCanvas.addEventListener('click', proofHandler);
      setTimeout(() => { try { proofCanvas.remove(); } catch(e){} }, 2000);
    }

    function simVerify() {
      const score = parseInt(document.getElementById('score').textContent || '0');
      const success = score < 70 || Math.random() > 0.3; const color = success ? '#10b981' : '#ef4444';
      updateMetric('outcome', success ? 'Verified! Cookie Set.' : 'Failed: Retry Rift 🔄');
      createParticles(1700, 540, color, 30);
      if (!success) gsap.to(packet, { attr: { fill: color }, scale: 0.5, duration: 0.5, yoyo: true, repeat: 3 });
    }

    function showOutcome(msg) { const out = document.getElementById('outcome'); if (out) out.textContent = msg; setTimeout(() => { gsap.set(packet, { x: 100, y: 540, scale: 1, visibility: 'visible' }); const meter = document.getElementById('score-meter'); if (meter) meter.remove(); clearParticles(); }, 3000); }

    function updateMetric(id, value) { const el = document.getElementById(id); if (el) el.textContent = value; }

    function createParticles(x, y, color, count) { clearParticles(); for (let i = 0; i < count; i++) { const particle = document.createElement('div'); particle.className = 'particle'; particle.style.left = x + 'px'; particle.style.top = y + 'px'; particle.style.background = color; particlesDiv.appendChild(particle); anime({ targets: particle, translateX: () => anime.random(-100, 100), translateY: () => anime.random(-100, 100), scale: [0, 1], opacity: [1, 0], duration: 1000 + Math.random() * 500, easing: 'easeOutExpo', complete: () => particle.remove() }); } }

    function clearParticles() { const p = document.getElementById('particles'); if (p) p.innerHTML = ''; }

    const launchHandler = () => {
      portal.style.opacity = '0'; setTimeout(() => portal.style.display = 'none', 500); metrics.classList.remove('hidden'); tl.restart(); let time = 30; const expiryInt = setInterval(() => { const expiry = document.getElementById('expiry'); if (expiry) expiry.textContent = `${Math.floor(time/60)}:${(time%60).toString().padStart(2,'0')}`; time--; if (time < 0) clearInterval(expiryInt); }, 1000);
    };

    launchBtn?.addEventListener('click', launchHandler);
    const keyHandler = (e) => { if (e.code === 'Space' && portal.style.display !== 'none') launchBtn.click(); };
    document.addEventListener('keydown', keyHandler);

    // Modal-level keyboard handlers: ESC to quit, Tab focus trap
    const modalEl = document.querySelector('.janus-modal');
    const modalKeyHandler = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); closeSimulator(); }
      if (e.key === 'Tab' && modalEl) {
        const focusable = Array.from(modalEl.querySelectorAll('a, button, input, [tabindex]:not([tabindex="-1"])')).filter(el => !el.hasAttribute('disabled'));
        if (focusable.length === 0) { e.preventDefault(); return; }
        const idx = focusable.indexOf(document.activeElement);
        let next = 0;
        if (e.shiftKey) {
          next = idx > 0 ? idx - 1 : focusable.length - 1;
        } else {
          next = idx >= 0 && idx < focusable.length - 1 ? idx + 1 : 0;
        }
        e.preventDefault(); focusable[next].focus();
      }
    };
    if (modalEl) modalEl.addEventListener('keydown', modalKeyHandler);
    if (window.innerWidth < 768) { metrics.classList.remove('absolute', 'right-4', 'top-4'); metrics.classList.add('w-full', 'mt-4'); metrics.style.position = 'relative'; }

    // cleanup closure
    simulatorCleanup = () => {
      try { tl.kill(); } catch(e){}
      try { packet.remove(); } catch(e){}
      clearParticles();
      // realm cleanup
      try { if (realmAnimationId) cancelAnimationFrame(realmAnimationId); } catch(e){}
      try { if (realmRenderer) { realmRenderer.dispose(); realmRenderer.forceContextLoss && realmRenderer.forceContextLoss(); } } catch(e){}
      try { if (realmOnResize) window.removeEventListener('resize', realmOnResize); } catch(e){}
      try { launchBtn?.removeEventListener('click', launchHandler); document.removeEventListener('keydown', keyHandler); } catch(e){}
      try { if (modalEl) modalEl.removeEventListener('keydown', modalKeyHandler); } catch(e){}
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
  <!-- GSAP + MotionPath + Anime for simulator visuals -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/MotionPathPlugin.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"></script>
  <!-- three.js for the 3D realm visuals -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r152/three.min.js"></script>
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
    <div class="janus-modal fixed inset-0 z-50 bg-black/90 flex items-center justify-center" role="dialog" aria-modal="true" aria-labelledby="janus-modal-title">
      <div class="modal-inner relative w-full h-full" on:keydown={(e)=>{ /* focus trap handled in initSimulator too */ }}>
        <button class="modal-close absolute left-4 top-4 z-60 bg-black/60 text-white px-3 py-2 rounded" on:click={closeSimulator} aria-label="Close simulator">Close ✕</button>

        <div id="portal" class="absolute inset-0 flex items-center justify-center bg-black/50 z-20 transition-opacity duration-500">
          <div class="text-center px-6">
            <h2 id="janus-modal-title" class="text-2xl md:text-4xl font-bold mb-3 text-indigo-400">Enter the Janus Gateway</h2>
            <p class="text-sm mb-4 max-w-md mx-auto">Launch a simulated request and watch scoring, challenges, and verification.</p>
            <div class="flex gap-4 justify-center mb-4">
              <label class="flex items-center gap-2"><input type="radio" name="persona" value="human" checked class="mr-2" aria-label="Launch simulation as human"><span class="text-green-400">Curious Human</span></label>
              <label class="flex items-center gap-2"><input type="radio" name="persona" value="bot" class="mr-2" aria-label="Launch simulation as bot"><span class="text-red-400">Sneaky Bot</span></label>
            </div>
            <div class="sim-controls mt-3 flex gap-3 justify-center">
              <button id="start-sim" class="bg-green-600 hover:bg-green-700 px-4 py-2 rounded font-semibold" on:click={() => { document.getElementById('launch')?.click(); }} aria-label="Start simulation">Start</button>
              <button id="replay-sim" class="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded font-semibold" on:click={() => { document.getElementById('launch')?.click(); }} aria-label="Replay simulation">Replay</button>
              <button id="quit-sim" class="bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-semibold" on:click={closeSimulator} aria-label="Quit simulator">Quit</button>
            </div>
            <button id="launch" class="sr-only">Launch Request</button>
          </div>
        </div>

        <svg id="flow-canvas" class="w-full h-full flex-1" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg" role="img" aria-describedby="metrics">
          <defs>
            <linearGradient id="glow-blue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#1e40af;stop-opacity:1" />
            </linearGradient>
            <filter id="glow-filter">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <path id="bypass" d="M100,540 Q400,400 800,540 T1600,540" stroke="url(#glow-blue)" stroke-width="4" fill="none" opacity="0.6" filter="url(#glow-filter)"></path>
          <path id="challenge" d="M600,540 Q900,300 1200,540 Q1500,700 1700,540" stroke="#ef4444" stroke-width="3" fill="none" opacity="0.3" filter="url(#glow-filter)"></path>
          <circle id="middleware" cx="100" cy="540" r="20" fill="#10b981" class="glow" />
          <text x="100" y="570" text-anchor="middle" font-size="12" fill="white">Middleware</text>
          <circle id="scoring" cx="600" cy="540" r="20" fill="#f59e0b" class="glow" />
          <text x="600" y="570" text-anchor="middle" font-size="12" fill="white">Scoring</text>
          <circle id="challenge-node" cx="1200" cy="420" r="20" fill="#ef4444" class="glow" />
          <text x="1200" y="450" text-anchor="middle" font-size="12" fill="white">Challenge</text>
          <circle id="verify" cx="1700" cy="540" r="20" fill="#8b5cf6" class="glow" />
          <text x="1700" y="570" text-anchor="middle" font-size="12" fill="white">Verify</text>
        </svg>

        <!-- Optional 3D realm canvas (pointer-events:none so it doesn't block UI) -->
        <canvas id="realm-canvas" class="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true"></canvas>

        <aside id="metrics" class="absolute right-4 top-4 w-64 bg-black/70 backdrop-blur-md p-4 rounded-lg z-10 text-sm hidden md:block">
          <h3 class="font-bold mb-2 text-indigo-400">Live Metrics</h3>
          <ul id="log-list" class="space-y-1 text-xs">
            <li><span class="text-green-400">✓ Cookie Valid?</span> <span id="cookie-status">Checking...</span></li>
            <li><span class="text-yellow-400">Suspicion Score:</span> <span id="score">0</span>/100</li>
            <li><span class="text-red-400">Rate Limit:</span> <span id="rate">Safe</span></li>
            <li><span>Challenge Expiry:</span> <span id="expiry">--:--</span></li>
            <li id="outcome" class="font-semibold mt-2">Ready to Launch</li>
          </ul>
        </aside>

        <div id="particles" class="absolute inset-0 pointer-events-none"></div>
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
  .janus-modal { backdrop-filter: blur(6px); z-index: 99999 !important; }
  .janus-modal .modal-inner { z-index: 100000; position: relative; }
  .modal-close { z-index: 100001; }
  /* Open simulator button styling */
  :global(.open-sim-btn) { display:inline-flex; align-items:center; gap:0.5rem; padding:0.65rem 1rem; font-weight:600; box-shadow:0 6px 18px rgba(59,130,246,0.12); transform:translateZ(0); }
  :global(.open-sim-btn .open-emoji) { font-size:1.05rem; }
  :global(.open-sim-btn .spark) { margin-left:0.25rem; opacity:0.95; }
  @keyframes pulse-sim { 0% { box-shadow: 0 0 0 0 rgba(59,130,246,0.35); } 70% { box-shadow: 0 0 0 12px rgba(59,130,246,0); } 100% { box-shadow: 0 0 0 0 rgba(59,130,246,0); } }
  :global(.open-sim-btn) { animation: pulse-sim 2.5s infinite; }

  /* Modal close (left-top) */
  :global(.modal-close) { left: 1rem; right: auto; }
</style>
