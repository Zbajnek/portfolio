<script lang="ts">
import { resolve } from '$app/paths'
import { site } from '#content'

let { home = false }: { home?: boolean } = $props()

const year = new Date().getFullYear()
</script>

<footer class="flex flex-wrap justify-between gap-3 border-t border-ink px-gutter py-6 font-mono text-xs">
  <span>© { year } { site.name }</span>
  {#if home}
    <span>Built with SvelteKit — <a href={site.sourceUrl} rel="external noopener">source on GitHub ↗</a></span>
  {:else}
    <a href={resolve('/')}>Home ↑</a>
  {/if}
</footer>
