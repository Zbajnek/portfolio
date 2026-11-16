import { error } from '@sveltejs/kit'
import { features, projects } from '#content'
import { m } from '#i18n'
import type { EntryGenerator, PageLoad } from './$types'

// While projects are hidden, no detail pages are built (so they 404 on the static host)
export const prerender = features.projects

export const entries: EntryGenerator = () => projects.map(({ slug }) => ({ slug }))

export const load: PageLoad = ({ params }) => {
  const index = projects.findIndex((p) => p.slug === params.slug)
  if (index === -1) error(404, m.project_not_found())

  return {
    project: projects[index],
    next: projects[(index + 1) % projects.length],
    nextNumber: ((index + 1) % projects.length) + 1,
  }
}
