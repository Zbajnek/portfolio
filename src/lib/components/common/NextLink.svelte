<script lang="ts">
import type { ResolvedPathname } from '$app/types'

let { href, label, title }: { href: ResolvedPathname, label: string, title: string } = $props()
</script>

<!-- `href` is typed as ResolvedPathname, so callers must pass a resolve() or localize() result. -->
<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
<a
  {href}
  class="flex flex-wrap items-baseline justify-between gap-4 border-t border-ink px-gutter py-12"
>
  <span class="font-mono text-[13px]">{ label }</span>
  <span class="text-next font-medium">{ title } →</span>
</a>
