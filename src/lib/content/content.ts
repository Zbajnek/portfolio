import { m } from '#i18n'
import type { Education, Job, Period, Project, ProjectType } from './types'

export { features } from './features.ts'

/*
 * Text fields are `Localized`: a plain string when it's the same in every language,
 * or `{ en, cs }` when it's translated. Read them with `t()` from #i18n while rendering.
 */

export const site = {
  /** Production origin, no trailing slash — used for canonical URLs, Open Graph and the sitemap */
  url: 'https://zbynekzidlicky.cz',
  name: 'Zbyněk Židlický',
  /** Default page description (search results, link previews) */
  description: {
    en: 'Zbyněk Židlický — frontend developer from Prague. Building Haxagon with Vue.js and TypeScript, freelance web development with SvelteKit.',
    cs: 'Zbyněk Židlický – frontend vývojář z Prahy. Vyvíjím Haxagon ve Vue.js a TypeScriptu, na volné noze tvořím weby ve SvelteKitu.',
  },
  ogImage: 'og.png',
  firstName: 'Zbyněk',
  lastName: 'Židlický',
  role: { en: 'Frontend developer.', cs: 'Frontend vývojář.' },
  current: { en: 'Currently building things at Haxagon.', cs: 'Momentálně vyvíjím Haxagon.' },
  location: { en: 'Prague, Czech Republic', cs: 'Praha, Česko' },
  /** Locality for structured data (schema.org) */
  city: { en: 'Prague', cs: 'Praha' },
  timezone: 'Europe/Prague',
  status: { en: 'Open to new opportunities.', cs: 'Otevřený novým příležitostem.' },
  contactStatus: { en: 'I usually reply within a day.', cs: 'Obvykle odpovím do jednoho dne.' },
  intro: {
    en: 'Frontend at Haxagon. Freelance web. Games in Unity as a passion.',
    cs: 'Frontend v Haxagonu. Weby na volné noze. Hry v Unity z lásky.',
  },
  email: 'hello@zbynekzidlicky.cz',
  github: { handle: 'github.com/Zbajnek', url: 'https://github.com/Zbajnek' },
  linkedin: { handle: 'linkedin.com/in/zbynek-zidlicky', url: 'https://www.linkedin.com/in/zbynek-zidlicky/' },
  sourceUrl: 'https://github.com/Zbajnek/portfolio',
  education: [
    {
      from: 2024,
      school: { en: 'Prague University of Economics and Business', cs: 'Vysoká škola ekonomická v Praze' },
      field: { en: 'Applied Informatics', cs: 'Aplikovaná informatika' },
    },
    {
      from: 2020,
      to: 2024,
      school: 'Smíchovská střední průmyslová škola a gymnázium',
      field: { en: 'Cybersecurity', cs: 'Kybernetická bezpečnost' },
    }
  ] satisfies Education[],
  tools: ['Vue.js', 'TypeScript', 'WebStorm', 'Slack', 'GitLab'],
}

export const jobs: Job[] = [
  {
    id: 'haxagon',
    from: 2024,
    role: { en: 'Frontend developer', cs: 'Frontend vývojář' },
    where: 'Haxagon',
    stack: ['Vue.js', 'TypeScript', 'Docker'],
    points: {
      en: [
        'Developing and maintaining the frontend of Haxagon, a learning platform used by hundreds of schools.',
        'Refactored shared frontend infrastructure into reusable composables and utilities, cutting duplicated code across multiple views.'
      ],
      cs: [
        'Vyvíjím a udržuji frontend Haxagonu, vzdělávací platformy, kterou používají stovky škol.',
        'Přepracoval jsem sdílenou frontendovou infrastrukturu do znovupoužitelných composables a utilit, čímž jsem omezil duplicitní kód napříč řadou obrazovek.'
      ],
    },
  },
  {
    id: 'freelance',
    from: 2023,
    role: { en: 'Freelance Web Developer', cs: 'Webový vývojář na volné noze' },
    where: { en: 'Freelance', cs: 'Na volné noze' },
    stack: ['SvelteKit', 'TypeScript', 'Shopify', 'Shoptet'],
    points: {
      en: [
        'Building websites and e-shops for small businesses, from first call to launch.',
        'Maintaining sites long-term: updates, hosting and fixes.'
      ],
      cs: [
        'Tvořím weby a e-shopy pro malé firmy, od prvního hovoru až po spuštění.',
        'Dlouhodobě se o weby starám: aktualizace, hosting a opravy.'
      ],
    },
  },
  {
    id: 'unity-lecturer',
    from: 2023,
    to: 2024,
    role: { en: 'Unity Lecturer', cs: 'Lektor Unity' },
    where: 'Logiscool CZ',
    stack: ['Unity', 'C#'],
    points: {
      en: [
        'Taught elementary school students Unity and C# through hands-on game projects.',
        'Created small 2D and 3D example games used as course material.'
      ],
      cs: [
        'Učil jsem žáky základních škol Unity a C# na praktických herních projektech.',
        'Vytvořil jsem malé ukázkové hry ve 2D i 3D, které sloužily jako výukový materiál.'
      ],
    },
  }
]

const project = (slug: string, title: string, type: ProjectType): Project => ({
  slug,
  title,
  type,
  stack: '[STACK]',
  year: '[YEAR]',
  role: { en: '[WHAT YOU DID]', cs: '[CO JSI DĚLAL]' },
  live: '#',
  source: '#',
})

export const projects: Project[] = [
  project('project-one', '[PROJECT ONE]', 'work'),
  project('project-two', '[PROJECT TWO]', 'side'),
  project('project-three', '[PROJECT THREE]', 'work'),
  project('project-four', '[PROJECT FOUR]', 'side'),
  project('project-five', '[PROJECT FIVE]', 'school'),
  project('project-six', '[PROJECT SIX]', 'side')
]

export const featuredProjects = projects.slice(0, 4)

/** "2024 — Now" / "2023 — 2024" in the current locale. Call while rendering. */
export function formatPeriod({ from, to }: Period): string {
  return `${ from } — ${ to ?? m.common_now() }`
}

/** Ongoing jobs get the live status dot */
export function isCurrent({ to }: Period): boolean {
  return to === undefined
}

/** Display label of a project type in the current locale. Call while rendering. */
export function projectTypeLabel(type: ProjectType): string {
  return { work: m.projects_type_work, side: m.projects_type_side, school: m.projects_type_school }[type]()
}
