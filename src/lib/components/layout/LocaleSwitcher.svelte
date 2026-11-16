<script lang="ts">
import { page } from '$app/state'
import { getLocale, localeInfo, locales, localize, m, type AppPath } from '#i18n'

const current = getLocale()
</script>

<!--
  Plain links (not buttons), so the prerender crawler finds and builds every /cs page.
  data-sveltekit-reload: switching locale loads a fresh document, keeping the URL,
  the prerendered HTML and Paraglide's locale in sync.
-->
<nav aria-label={m.nav_language()} class="flex items-center gap-1.5 font-mono text-[13px]">
  {#each locales as locale, i (locale)}
    {#if i > 0}<span aria-hidden="true">/</span>{/if}
    <a
      href={localize(page.url.pathname as AppPath, locale)}
      hreflang={locale}
      lang={locale}
      title={localeInfo[locale].name}
      aria-label={localeInfo[locale].name}
      aria-current={locale === current ? 'true' : undefined}
      class="inline-flex min-h-11 items-center px-0.5 uppercase aria-[current=true]:underline aria-[current=true]:underline-offset-[6px]"
      data-sveltekit-reload
    >{ locale }</a>
  {/each}
</nav>
