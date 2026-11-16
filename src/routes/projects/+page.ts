import { features } from '#content'

// While projects are hidden, /projects isn't built at all (so it 404s on the static host)
export const prerender = features.projects
