import { features, projects, site } from '#content'
import type { RequestHandler } from './$types'

export const prerender = true

const projectPaths = features.projects ? ['/projects', ...projects.map(({ slug }) => `/projects/${ slug }`)] : []
const paths = ['/', '/experience', ...projectPaths, '/contact']

export const GET: RequestHandler = () => {
  const urls = paths.map((path) => `  <url><loc>${ new URL(path, site.url).href }</loc></url>`).join('\n')

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${ urls }\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml' } }
  )
}
