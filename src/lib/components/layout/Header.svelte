<script lang="ts">
import { page } from '$app/state'
import { resolve } from '$app/paths'
import { features, site } from '#content'
import ThemeToggle from './ThemeToggle.svelte'

const nav = [
  { route: '/experience', href: resolve('/experience'), label: 'Experience' },
  { route: '/projects', href: resolve('/projects'), label: 'Projects', hidden: !features.projects },
  { route: '/contact', href: resolve('/contact'), label: 'Contact' }
].filter((item) => !item.hidden)

function isCurrent(route: string): boolean {
  return page.route.id === route || !!page.route.id?.startsWith(`${ route }/`)
}
</script>

<header class="flex flex-wrap items-center justify-between gap-4 px-gutter py-5 text-[15px] font-medium">
  <a href={resolve('/')}>{ site.name }</a>
  <nav aria-label="Main" class="flex flex-wrap gap-7">
    {#each nav as item (item.route)}
      <a
        href={item.href}
        aria-current={isCurrent(item.route) ? 'page' : undefined}
        class="aria-[current=page]:underline aria-[current=page]:underline-offset-[6px]"
      >{ item.label }</a>
    {/each}
  </nav>
  <div class="flex flex-wrap items-center gap-5">
    <a href={site.github.url} rel="external noopener">GitHub ↗</a>
    <a href={site.linkedin.url} rel="external noopener">LinkedIn ↗</a>
    <ThemeToggle />
  </div>
</header>
