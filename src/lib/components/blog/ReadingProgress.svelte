<script>
  /**
   * ReadingProgress - Animated reading progress indicator
   * Shows a gradient progress bar at the top of the viewport
   */
  import { readingProgress } from '$lib/stores/blog.js';
  
  $: progress = $readingProgress;
  $: isVisible = progress > 0 && progress < 100;
</script>

<div class="progress-container" class:visible={isVisible}>
  <div 
    class="progress-bar" 
    style="--progress: {progress}%"
    role="progressbar"
    aria-valuenow={Math.round(progress)}
    aria-valuemin="0"
    aria-valuemax="100"
    aria-label="Reading progress"
  >
    <div class="progress-glow"></div>
  </div>
</div>

<style>
  .progress-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: rgba(var(--surface0-rgb), 0.5);
    z-index: 1000;
    opacity: 0;
    transform: translateY(-100%);
    transition: 
      opacity 0.3s ease,
      transform 0.3s ease;
  }
  
  .progress-container.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .progress-bar {
    position: relative;
    height: 100%;
    width: var(--progress);
    background: linear-gradient(
      90deg,
      var(--sapphire) 0%,
      var(--mauve) 50%,
      var(--pink) 100%
    );
    background-size: 200% 100%;
    animation: gradientShift 3s ease infinite;
    transition: width 0.1s linear;
    border-radius: 0 2px 2px 0;
  }
  
  @keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  
  .progress-glow {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 60px;
    height: 20px;
    background: radial-gradient(
      ellipse at right,
      rgba(var(--accent-rgb), 0.6) 0%,
      transparent 70%
    );
    filter: blur(4px);
    pointer-events: none;
  }
</style>
