<!-- src/lib/components/GitGraphWidget.svelte -->
<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import GitBranch from 'lucide-svelte/icons/git-branch';

  let canvasRef;
  let containerRef;
  let hoveredCommit = null;
  let selectedBranch = 'main';
  let animationProgress = 0;
  let canvasWidth = 0;
  let canvasHeight = 0;

  // Git graph data structure
  let gitData = {
    branches: [
      { name: 'main', color: '#89b4fa', commits: 45, merges: 8 },
      { name: 'develop', color: '#a6e3a1', commits: 67, merges: 12 },
      { name: 'feature/auth', color: '#f9e2af', commits: 23, merges: 3 },
      { name: 'hotfix/security', color: '#f38ba8', commits: 8, merges: 2 }
    ],
    commits: generateCommits(),
    stats: {
      totalCommits: 143,
      activeBranches: 4,
      mergeConflicts: 3,
      codeReviews: 28
    }
  };

  function generateCommits() {
    const commits = [];
    const branches = ['main', 'develop', 'feature/auth', 'hotfix/security'];
    const now = Date.now();
    
    for (let i = 0; i < 100; i++) {
      const daysAgo = Math.floor(Math.random() * 90);
      const timestamp = now - (daysAgo * 24 * 60 * 60 * 1000);
      
      commits.push({
        id: `commit-${i}`,
        branch: branches[Math.floor(Math.random() * branches.length)],
        timestamp,
        message: getCommitMessage(),
        additions: Math.floor(Math.random() * 500),
        deletions: Math.floor(Math.random() * 200),
        author: ['Alice', 'Bob', 'Charlie', 'Diana'][Math.floor(Math.random() * 4)],
        type: ['feat', 'fix', 'docs', 'refactor'][Math.floor(Math.random() * 4)]
      });
    }
    
    return commits.sort((a, b) => b.timestamp - a.timestamp);
  }

  function getCommitMessage() {
    const messages = [
      'Add user authentication',
      'Fix memory leak in cache',
      'Update dependencies',
      'Refactor API endpoints',
      'Implement dark mode',
      'Optimize database queries',
      'Add error handling',
      'Update documentation',
      'Fix security vulnerability',
      'Improve performance'
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  }

  // Animate on mount
  onMount(() => {
    let frame = 0;
    const animate = () => {
      frame++;
      animationProgress = Math.min(frame / 60, 1);
      if (frame < 60) {
        requestAnimationFrame(animate);
      }
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      if (containerRef) {
        canvasWidth = containerRef.offsetWidth;
        canvasHeight = containerRef.offsetHeight;
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  // Responsive canvas drawing
  $: if (browser && canvasRef && animationProgress > 0 && canvasWidth > 0) {
    const canvas = canvasRef;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    
    // Set canvas size with device pixel ratio for sharp rendering
    canvas.width = canvasWidth * dpr;
    canvas.height = canvasHeight * dpr;
    canvas.style.width = canvasWidth + 'px';
    canvas.style.height = canvasHeight + 'px';
    ctx.scale(dpr, dpr);

    // Responsive values based on canvas width
    const isMobile = canvasWidth < 640;
    const isTablet = canvasWidth >= 640 && canvasWidth < 1024;
    
    const padding = isMobile ? 30 : isTablet ? 40 : 50;
    const branchSpacing = isMobile ? 50 : isTablet ? 60 : 80;
    const startY = isMobile ? 60 : 80;
    const lineWidth = isMobile ? 4 : 6;
    const nodeSize = isMobile ? 6 : 8;

    // Clear canvas
    ctx.fillStyle = '#11111b';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Draw subtle grid
    ctx.strokeStyle = '#1e1e2e';
    ctx.lineWidth = 1;
    const gridSize = isMobile ? 30 : 40;
    for (let i = 0; i < canvasHeight / gridSize; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * gridSize);
      ctx.lineTo(canvasWidth, i * gridSize);
      ctx.stroke();
    }
    for (let i = 0; i < canvasWidth / gridSize; i++) {
      ctx.beginPath();
      ctx.moveTo(i * gridSize, 0);
      ctx.lineTo(i * gridSize, canvasHeight);
      ctx.stroke();
    }

    // Draw branches
    const branchY = (index) => startY + index * branchSpacing;
    const maxLineLength = canvasWidth - padding * 2;

    gitData.branches.forEach((branch, index) => {
      const y = branchY(index);
      const depth = isMobile ? index * 3 : index * 5;
      
      // Shadow for depth
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.lineWidth = lineWidth + 2;
      ctx.beginPath();
      ctx.moveTo(padding + depth, y + depth);
      ctx.lineTo(padding + maxLineLength * animationProgress + depth, y + depth);
      ctx.stroke();

      // Main branch line with gradient
      const gradient = ctx.createLinearGradient(padding, y, padding + maxLineLength, y);
      gradient.addColorStop(0, branch.color);
      gradient.addColorStop(1, branch.color + '40');
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = lineWidth;
      ctx.shadowColor = branch.color;
      ctx.shadowBlur = isMobile ? 10 : 15;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(padding + maxLineLength * animationProgress, y);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Branch commits as nodes
      const commitCount = Math.floor(branch.commits * animationProgress);
      const visibleCommits = isMobile ? Math.min(commitCount, 15) : commitCount;
      
      for (let i = 0; i < visibleCommits; i++) {
        const x = padding + (i / branch.commits) * maxLineLength;
        const size = nodeSize + Math.sin(Date.now() * 0.002 + i) * 2;
        
        // Glow
        ctx.fillStyle = branch.color + '40';
        ctx.beginPath();
        ctx.arc(x, y, size + (isMobile ? 5 : 8), 0, Math.PI * 2);
        ctx.fill();
        
        // Core
        ctx.fillStyle = branch.color;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
        
        // Highlight
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(x - 2, y - 2, size / 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Merge points (fewer on mobile)
      const visibleMerges = isMobile ? Math.min(branch.merges, 2) : branch.merges;
      for (let i = 0; i < visibleMerges; i++) {
        const x = padding + ((i + 1) / (branch.merges + 1)) * maxLineLength;
        
        if (index > 0) {
          // Draw merge arrow
          ctx.strokeStyle = branch.color;
          ctx.lineWidth = 2;
          ctx.setLineDash([5, 5]);
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x, branchY(index - 1));
          ctx.stroke();
          ctx.setLineDash([]);
          
          // Merge node
          const mergeSize = isMobile ? 8 : 10;
          ctx.fillStyle = branch.color;
          ctx.strokeStyle = '#1e1e2e';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(x, branchY(index - 1), mergeSize, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        }
      }
    });
  }

  function getTimeAgo(timestamp) {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInUnit);
      if (interval >= 1) {
        return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
      }
    }
    return 'just now';
  }
</script>

<div class="git-graph-widget">
  <!-- Header -->
  <div class="widget-header">
    <div class="title-row">
      <GitBranch size={20} class="title-icon" />
      <h2 class="title">Repository Activity</h2>
    </div>
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-value">{gitData.stats.totalCommits}</div>
        <div class="stat-label">Commits</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{gitData.stats.activeBranches}</div>
        <div class="stat-label">Branches</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{gitData.stats.codeReviews}</div>
        <div class="stat-label">Reviews</div>
      </div>
    </div>
  </div>

  <!-- Canvas Graph Container -->
  <div class="canvas-container" bind:this={containerRef}>
    <canvas bind:this={canvasRef} class="graph-canvas"></canvas>
    
    <!-- Responsive Legend -->
    <div class="legend-container">
      {#each gitData.branches as branch}
        <button
          class="legend-item"
          class:active={selectedBranch === branch.name}
          on:click={() => selectedBranch = branch.name}
          style="--branch-color: {branch.color}"
        >
          <div class="legend-dot"></div>
          <div class="legend-text">
            <div class="legend-name">{branch.name}</div>
            <div class="legend-count">{branch.commits}</div>
          </div>
        </button>
      {/each}
    </div>
  </div>

  <!-- Recent Commits Timeline -->
  <div class="timeline-section">
    <h3 class="section-title">Recent Activity</h3>
    <div class="commits-scroll">
      {#each gitData.commits.slice(0, 8) as commit}
        {@const branch = gitData.branches.find(b => b.name === commit.branch)}
        {@const timeAgo = getTimeAgo(commit.timestamp)}
        
        <div 
          class="commit-item"
          on:mouseenter={() => hoveredCommit = commit}
          on:mouseleave={() => hoveredCommit = null}
        >
          <div 
            class="commit-dot" 
            style="background: {branch?.color}; box-shadow: 0 0 8px {branch?.color}"
          ></div>
          <div class="commit-content">
            <div class="commit-header">
              <span 
                class="commit-type" 
                style="background: {branch?.color}20; color: {branch?.color}"
              >
                {commit.type}
              </span>
              <span class="commit-time">{timeAgo}</span>
            </div>
            <div class="commit-message">{commit.message}</div>
            <div class="commit-footer">
              <span class="commit-branch">{commit.branch}</span>
              <span class="commit-stats">
                <span style="color: var(--green)">+{commit.additions}</span>
                <span style="color: var(--red)">-{commit.deletions}</span>
              </span>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .git-graph-widget {
    background: linear-gradient(135deg, var(--base) 0%, var(--mantle) 100%);
    border: 1px solid var(--surface0);
    border-radius: 16px;
    padding: 1.5rem;
    width: 100%;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  }

  /* Header */
  .widget-header {
    margin-bottom: 1.5rem;
  }

  .title-row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }

  .title-icon {
    color: var(--accent);
    flex-shrink: 0;
  }

  .title {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text);
    margin: 0;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
  }

  .stat-card {
    background: var(--mantle);
    border: 1px solid var(--surface0);
    border-radius: 8px;
    padding: 0.75rem 0.5rem;
    text-align: center;
  }

  .stat-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--accent);
    line-height: 1;
    margin-bottom: 0.25rem;
  }

  .stat-label {
    font-size: 0.7rem;
    color: var(--subtext1);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  /* Canvas Container */
  .canvas-container {
    position: relative;
    width: 100%;
    height: 350px;
    background: var(--crust);
    border-radius: 12px;
    margin-bottom: 1.5rem;
    border: 1px solid var(--base);
    overflow: hidden;
  }

  .graph-canvas {
    width: 100%;
    height: 100%;
    display: block;
  }

  /* Legend */
  .legend-container {
    position: absolute;
    top: 1rem;
    right: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    z-index: 10;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    background: rgba(var(--crust-rgb), 0.95);
    backdrop-filter: blur(10px);
    border: 1px solid var(--surface0);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .legend-item:hover,
  .legend-item.active {
    border-color: var(--branch-color);
    box-shadow: 0 4px 12px var(--branch-color)40;
    transform: translateX(-4px);
  }

  .legend-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--branch-color);
    box-shadow: 0 0 8px var(--branch-color);
    flex-shrink: 0;
  }

  .legend-text {
    display: flex;
    flex-direction: column;
  }

  .legend-name {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--text);
    line-height: 1.2;
  }

  .legend-count {
    font-size: 0.7rem;
    color: var(--subtext1);
  }

  /* Timeline */
  .timeline-section {
    background: var(--mantle);
    border-radius: 12px;
    padding: 1.25rem;
    border: 1px solid var(--surface0);
  }

  .section-title {
    font-size: 1rem;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 1rem;
  }

  .commits-scroll {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    max-height: 400px;
    overflow-y: auto;
    padding-right: 0.5rem;
  }

  .commits-scroll::-webkit-scrollbar {
    width: 5px;
  }

  .commits-scroll::-webkit-scrollbar-track {
    background: var(--base);
    border-radius: 3px;
  }

  .commits-scroll::-webkit-scrollbar-thumb {
    background: var(--surface0);
    border-radius: 3px;
  }

  .commit-item {
    display: flex;
    gap: 0.75rem;
    padding: 0.875rem;
    background: var(--base);
    border-radius: 8px;
    transition: all 0.3s ease;
    cursor: pointer;
  }

  .commit-item:hover {
    transform: translateX(4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  .commit-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-top: 0.25rem;
    flex-shrink: 0;
  }

  .commit-content {
    flex: 1;
    min-width: 0;
  }

  .commit-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    flex-wrap: wrap;
  }

  .commit-type {
    padding: 0.125rem 0.5rem;
    border-radius: 4px;
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
  }

  .commit-time {
    font-size: 0.75rem;
    color: var(--subtext1);
  }

  .commit-message {
    font-size: 0.875rem;
    color: var(--text);
    margin-bottom: 0.5rem;
    line-height: 1.4;
  }

  .commit-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .commit-branch {
    font-size: 0.75rem;
    color: var(--subtext0);
  }

  .commit-stats {
    display: flex;
    gap: 0.75rem;
    font-size: 0.75rem;
    font-weight: 600;
  }

  /* Mobile Responsive */
  @media (max-width: 640px) {
    .git-graph-widget {
      padding: 1rem;
      border-radius: 12px;
    }

    .title {
      font-size: 1.125rem;
    }

    .stat-value {
      font-size: 1.25rem;
    }

    .stat-label {
      font-size: 0.625rem;
    }

    .canvas-container {
      height: 300px;
    }

    .legend-container {
      top: 0.5rem;
      right: 0.5rem;
      gap: 0.375rem;
    }

    .legend-item {
      padding: 0.375rem 0.5rem;
    }

    .legend-name {
      font-size: 0.7rem;
    }

    .legend-count {
      font-size: 0.625rem;
    }

    .timeline-section {
      padding: 1rem;
    }

    .commits-scroll {
      max-height: 300px;
    }

    .commit-item {
      padding: 0.75rem;
    }

    .commit-message {
      font-size: 0.8125rem;
    }
  }

  /* Tablet */
  @media (min-width: 641px) and (max-width: 1024px) {
    .canvas-container {
      height: 320px;
    }
  }

  /* Desktop */
  @media (min-width: 1025px) {
    .git-graph-widget {
      padding: 2rem;
    }

    .canvas-container {
      height: 380px;
    }
  }
</style>