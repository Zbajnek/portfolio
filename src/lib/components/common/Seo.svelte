<script lang="ts">
import { page } from '$app/state'
import { site } from '#content'

let {
  title,
  description = site.description,
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

const fullTitle = $derived(title ? `${ title } — ${ site.name }` : `${ site.name } — Frontend developer`)
const canonical = $derived(new URL(page.url.pathname, site.url).href)
const imageUrl = $derived(image ? new URL(image, site.url).href : undefined)
// Escape `<` so content can never close the script tag early.
const jsonLdHtml = $derived(
  jsonLd ? `<script type="application/ld+json">${ JSON.stringify(jsonLd).replace(/</g, '\u003c') }</` + 'script>' : ''
)
</script>

<svelte:head>
  <title>{ fullTitle }</title>
  <meta name="description" content={description} />
  {#if noindex}
    <meta name="robots" content="noindex" />
  {:else}
    <link rel="canonical" href={canonical} />
  {/if}

  <meta property="og:type" content={type} />
  <meta property="og:site_name" content={site.name} />
  <meta property="og:locale" content="en_US" />
  <meta property="og:title" content={fullTitle} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={canonical} />
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
