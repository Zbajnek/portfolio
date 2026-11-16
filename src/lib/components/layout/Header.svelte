<script lang="ts">
import { page } from '$app/state'
import { features, site } from '#content'
import { localize, m } from '#i18n'
import LocaleSwitcher from './LocaleSwitcher.svelte'
import ThemeToggle from './ThemeToggle.svelte'

const nav = [
  { route: '/experience', href: localize('/experience'), label: m.nav_experience() },
  { route: '/projects', href: localize('/projects'), label: m.nav_projects(), hidden: !features.projects },
  { route: '/contact', href: localize('/contact'), label: m.nav_contact() }
].filter((item) => !item.hidden)

function isCurrent(route: string): boolean {
  return page.route.id === route || !!page.route.id?.startsWith(`${ route }/`)
}
</script>

<header class="flex flex-wrap items-center justify-between gap-4 px-gutter py-5 text-[15px] font-medium">
  <a href={localize('/')}>{ site.name }</a>
  <nav aria-label={m.nav_label()} class="flex flex-wrap gap-7">
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
    <LocaleSwitcher />
    <ThemeToggle />
  </div>
</header>
