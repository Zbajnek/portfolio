import { features, projects, site } from '#content'
import { baseLocale, locales, localizeUrl } from '#i18n'
import type { RequestHandler } from './$types'

export const prerender = true

const projectPaths = features.projects ? ['/projects', ...projects.map(({ slug }) => `/projects/${ slug }`)] : []
const paths = ['/', '/experience', ...projectPaths, '/contact']

// Each page is listed once per language, and every entry names all its language versions
// (https://developers.google.com/search/docs/specialty/international/localized-versions#sitemap)
function entry(path: string): string {
  const url = new URL(path, site.url)
  const alternates = [
    ...locales.map((locale) => [locale, localizeUrl(url, { locale }).href]),
    ['x-default', localizeUrl(url, { locale: baseLocale }).href]
  ].map(([hreflang, href]) => `    <xhtml:link rel="alternate" hreflang="${ hreflang }" href="${ href }"/>`).join('\n')

  return locales
    .map((locale) => `  <url>\n    <loc>${ localizeUrl(url, { locale }).href }</loc>\n${ alternates }\n  </url>`)
    .join('\n')
}

export const GET: RequestHandler = () => {
  const urls = paths.map(entry).join('\n')

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${ urls }\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml' } }
  )
}
