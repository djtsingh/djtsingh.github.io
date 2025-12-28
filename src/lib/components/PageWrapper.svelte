<script>
  // PageWrapper.svelte - Consistent page container with responsive margins
  export let maxWidth = 'var(--container-max)';
  export let gutter = 'var(--gutter)';
  export let padding = '1rem';
  export let center = true;
</script>

<div class="page-wrapper" style="--pw-max: {maxWidth}; --pw-gutter: {gutter}; --pw-padding: {padding};">
  {#if center}
    <div class="page-inner">
      <slot />
    </div>
  {:else}
    <slot />
  {/if}
</div>

<style>
  .page-wrapper {
    width: 100%;
  }

  .page-inner {
    max-width: var(--pw-max);
    margin: 0 auto;
    padding: var(--pw-padding) var(--pw-gutter);
  }

  @media (min-width: 768px) {
    .page-inner {
      padding: calc(var(--pw-padding) * 1.5) var(--pw-gutter);
    }
  }
</style>