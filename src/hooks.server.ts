import type { Handle } from '@sveltejs/kit/hooks'
import { paraglideMiddleware } from '#lib/paraglide/server.js'
import { getTextDirection } from '#lib/paraglide/runtime.js'

// Runs during prerendering: sets the locale for the page being rendered and fills
// the `%lang%` / `%dir%` placeholders in app.html.
// SvelteKit 3 makes `event.request` readonly, so the localized request goes on a copy of the event.
export const handle: Handle = ({ event, resolve }) =>
  paraglideMiddleware(event.request, ({ request, locale }) =>
    resolve(
      { ...event, request },
      {
        transformPageChunk: ({ html }) =>
          html.replace('%lang%', locale).replace('%dir%', getTextDirection(locale)),
      }
    )
  )
