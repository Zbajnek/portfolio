<script lang="ts">
import { site } from '#content'
import { localize, m } from '#i18n'

let { home = false }: { home?: boolean } = $props()

const year = new Date().getFullYear()
</script>

<footer class="flex flex-wrap justify-between gap-3 border-t border-ink px-gutter py-6 font-mono text-xs">
  <span>© { year } { site.name }</span>
  {#if home}
    <span>{ m.footer_built_with() } — <a href={site.sourceUrl} rel="external noopener">{ m.footer_source() }</a></span>
  {:else}
    <a href={localize('/')}>{ m.footer_home() }</a>
  {/if}
</footer>
