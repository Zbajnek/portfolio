<script lang="ts" generics="T">
import type { Snippet } from 'svelte'
import type { CursorPreviewState } from './cursor-preview.svelte.ts'

let {
  preview,
  class: className = '',
  offsetX = 24,
  offsetY = -60,
  children,
}: {
  preview: CursorPreviewState<T>
  class?: string
  /** Distance from the pointer, in px */
  offsetX?: number
  offsetY?: number
  /** Renders the last hovered item */
  children: Snippet<[T]>
} = $props()
</script>

<div
  aria-hidden="true"
  class="pointer-events-none absolute top-0 left-0 z-10 hidden transition-opacity duration-200 pointer-fine:block {className}"
  class:opacity-0={!preview.active}
  style:transform="translate3d({preview.x + offsetX}px, {preview.y + offsetY}px, 0)"
>
  {#if preview.last}
    {@render children(preview.last)}
  {/if}
</div>
