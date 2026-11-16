import { resolve } from '$app/paths'
import type { PathnameWithSearchOrHash, ResolvedPathname } from '$app/types'
import { getLocale, localizeHref, type Locale } from '../paraglide/runtime.js'

export { m } from '../paraglide/messages.js'
export { baseLocale, getLocale, locales, localizeUrl, type Locale } from '../paraglide/runtime.js'

/**
 * Content text: either one string shared by every locale (names, brands),
 * or one value per locale — then TypeScript flags a missing translation.
 */
export type Localized<T extends string | string[] = string> = T | Record<Locale, T>

/** Per-locale metadata — names are written in their own language, so they aren't translated. */
export const localeInfo: Record<Locale, { name: string, ogLocale: string }> = {
  en: { name: 'English', ogLocale: 'en_US' },
  cs: { name: 'Čeština', ogLocale: 'cs_CZ' },
}

/**
 * Pick the current locale's value of a content field.
 *
 * Call it while rendering (component script or markup), never at module level:
 * modules are shared between the English and Czech pages during prerendering,
 * so a value picked at import time would stick to whichever locale came first.
 */
export function t<T extends string | string[]>(value: Localized<T>): T {
  const locale = getLocale()
  const picked = typeof value === 'object' && !Array.isArray(value) ? value[locale] : value
  return locale === 'cs' ? czechTypography(picked) : picked
}

/**
 * `resolve()` for a path in the current (or given) locale: `/experience` → `/cs/experience` on Czech pages.
 * Takes a type-checked app path and returns a ResolvedPathname, so links pass `svelte/no-navigation-without-resolve`.
 *
 * Localizes first, then resolves: during prerendering `resolve()` returns page-relative paths,
 * which `localizeHref()` would turn into absolute URLs on the build-time origin.
 *
 * @example href={localize('/experience')}
 * @example href={localize(`/projects/${ project.slug }`)}
 */
export function localize(path: AppPath, locale: Locale = getLocale()): ResolvedPathname {
  // localizeHref keeps the leading slash; resolve() takes the base-relative form without it
  return resolve(localizeHref(path, { locale }).slice(1) as PathnameWithSearchOrHash)
}

/** An app path with a leading slash: `/`, `/experience#haxagon`, `/projects/${ slug }` */
export type AppPath = `/${ PathnameWithSearchOrHash }`

/**
 * Czech typography: a one-letter preposition or conjunction (v, k, s, z, o, u, a, i)
 * must not end a line, so glue it to the next word with a non-breaking space.
 * Messages in messages/cs.json already contain the `\u00a0` by hand.
 */
function czechTypography<T extends string | string[]>(value: T): T {
  if (Array.isArray(value)) return value.map((v) => czechTypography(v)) as T
  return value.replace(/(?<=^|[\s(])([ksvzouaiKSVZOUAI]) +/g, '$1\u00a0') as T
}
