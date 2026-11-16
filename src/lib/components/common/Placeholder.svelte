<script lang="ts">
import { asset } from '$app/paths'
import type { AssetPath } from '$app/types'

let {
  label,
  src,
  alt = '',
  class: className = '',
}: {
  /** Text shown while there's no image */
  label: string
  /** Image path inside /static */
  src?: AssetPath
  alt?: string
  class?: string
} = $props()
</script>

{#if src}
  <img
    src={asset(src)}
    {alt}
    loading="lazy"
    decoding="async"
    class="h-full w-full object-cover {className}"
  />
{:else}
  <div
    aria-hidden="true"
    class="flex items-center justify-center bg-surface p-4 text-center font-mono text-xs text-surface-ink {className}"
  >
    { label }
  </div>
{/if}
