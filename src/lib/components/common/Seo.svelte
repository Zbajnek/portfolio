<script lang="ts">
import { page } from '$app/state'
import { site } from '#content'
import { baseLocale, getLocale, localeInfo, locales, localizeUrl, m, t } from '#i18n'

let {
  title,
  description = t(site.description),
  image = site.ogImage,
  type = 'website',
  noindex = false,
  jsonLd,
}: {
  /** Page title — the site name is appended unless it's already the full title */
  title?: string
  description?: string
  /** Absolute URL or path inside /static */
  image?: string
  type?: 'website' | 'article' | 'profile'
  /** Keep the page out of search results (error pages etc.) */
  noindex?: boolean
  /** Structured data (schema.org) rendered as JSON-LD */
  jsonLd?: Record<string, unknown>
} = $props()

const locale = getLocale()
const fullTitle = $derived(title ? `${ title } — ${ site.name }` : `${ site.name } — ${ m.common_job_title() }`)
// page.url keeps the locale prefix (/cs/…), so the canonical URL points at this language version.
const canonical = $derived(new URL(page.url.pathname, site.url))
// Every language version of this page, as fully qualified URLs (required by Google).
const alternates = $derived(locales.map((l) => ({ locale: l, href: localizeUrl(canonical, { locale: l }).href })))
const imageUrl = $derived(image ? new URL(image, site.url).href : undefined)
// Escape `<` so content can never close the script tag early.
const jsonLdHtml = $derived(
  jsonLd ? `<script type="application/ld+json">${ JSON.stringify(jsonLd).replace(/</g, '<') }</` + 'script>' : ''
)
</script>

<svelte:head>
  <title>{ fullTitle }</title>
  <meta name="description" content={description} />
  {#if noindex}
    <meta name="robots" content="noindex" />
  {:else}
    <link rel="canonical" href={canonical.href} />
    {#each alternates as alt (alt.locale)}
      <link rel="alternate" hreflang={alt.locale} href={alt.href} />
    {/each}
    <link rel="alternate" hreflang="x-default" href={localizeUrl(canonical, { locale: baseLocale }).href} />
  {/if}

  <meta property="og:type" content={type} />
  <meta property="og:site_name" content={site.name} />
  <meta property="og:locale" content={localeInfo[locale].ogLocale} />
  {#each locales.filter((l) => l !== locale) as l (l)}
    <meta property="og:locale:alternate" content={localeInfo[l].ogLocale} />
  {/each}
  <meta property="og:title" content={fullTitle} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={canonical.href} />
  {#if imageUrl}
    <meta property="og:image" content={imageUrl} />
    <meta property="og:image:alt" content={fullTitle} />
  {/if}

  <meta name="twitter:card" content={imageUrl ? 'summary_large_image' : 'summary'} />
  <meta name="twitter:title" content={fullTitle} />
  <meta name="twitter:description" content={description} />
  {#if imageUrl}<meta name="twitter:image" content={imageUrl} />{/if}

  <!-- eslint-disable-next-line svelte/no-at-html-tags -- static, escaped JSON built at prerender time -->
  {#if jsonLdHtml}{@html jsonLdHtml}{/if}
</svelte:head>
