import type { Reroute } from '@sveltejs/kit/hooks'
import { deLocalizeUrl } from '#lib/paraglide/runtime.js'

// /cs/experience renders the same route as /experience — the locale lives only in the URL.
export const reroute: Reroute = (request) => deLocalizeUrl(request.url).pathname
