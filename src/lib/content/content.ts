import type { Education, Job, Project, ProjectType } from './types'

/** Site-wide switches — flip to false to temporarily hide a whole section */
export const features = {
  /** Projects: nav link, home section, /projects pages and sitemap entries */
  projects: false,
}

export const site = {
  /** Production origin, no trailing slash — used for canonical URLs, Open Graph and the sitemap */
  url: 'https://zbynekzidlicky.cz',
  name: 'Zbyněk Židlický',
  /** Default page description (search results, link previews) */
  description: 'Zbyněk Židlický — frontend developer from Prague. Building Haxagon with Vue.js and TypeScript, freelance web development with SvelteKit.',
  ogImage: 'og.png',
  firstName: 'Zbyněk',
  lastName: 'Židlický',
  role: 'Frontend developer.',
  current: 'Currently building things at Haxagon.',
  location: 'Prague, Czech Republic',
  timezone: 'Europe/Prague',
  status: 'Open to new opportunities.',
  contactStatus: 'I usually reply within a day.',
  intro: 'Frontend at Haxagon. Freelance web. Games in Unity as a passion.',
  email: 'hello@zbynekzidlicky.cz',
  github: { handle: 'github.com/Zbajnek', url: 'https://github.com/Zbajnek' },
  linkedin: { handle: 'linkedin.com/in/zbynek-zidlicky', url: 'https://www.linkedin.com/in/zbynek-zidlicky/' },
  sourceUrl: 'https://github.com/Zbajnek/portfolio',
  education: [
    { when: '2024 — Now', school: 'Prague University of Economics and Business', field: 'Applied Informatics' },
    { when: '2020 — 2024', school: 'Smíchovská střední průmyslová škola a gymnázium', field: 'Cybersecurity' }
  ] satisfies Education[],
  tools: ['Vue.js', 'TypeScript', 'WebStorm', 'Slack', 'GitLab'],
}

export const jobs: Job[] = [
  {
    id: 'haxagon',
    when: '2024 — Now',
    role: 'Frontend developer',
    where: 'Haxagon',
    current: true,
    stack: ['Vue.js', 'TypeScript', 'Docker'],
    points: [
      'Developing and maintaining the frontend of Haxagon, a learning platform used by hundreds of schools.',
      'Refactored shared frontend infrastructure into reusable composables and utilites, cutting duplicated code across multiple views.'
    ],
  },
  {
    id: 'freelance',
    when: '2023 — Now',
    role: 'Freelance Web Developer',
    where: 'Freelance',
    current: true,
    stack: ['SvelteKit', 'TypeScript', 'Shopify', 'Shoptet'],
    points: [
      'Building websites and e-shops for small businesses, from first call to launch.',
      'Maintaining sites long-term: updates, hosting and fixes.'
    ],
  },
  {
    id: 'unity-lecturer',
    when: '2023 — 2024',
    role: 'Unity Lecturer',
    where: 'Logiscool CZ',
    stack: ['Unity', 'C#'],
    points: [
      'Taught elementary school students Unity and C# through hands-on game projects.',
      'Created small 2D and 3D example games used as course material.'
    ],
  }
]

const project = (slug: string, title: string, type: ProjectType): Project => ({
  slug,
  title,
  type,
  stack: '[STACK]',
  year: '[YEAR]',
  role: '[WHAT YOU DID]',
  live: '#',
  source: '#',
})

export const projects: Project[] = [
  project('project-one', '[PROJECT ONE]', 'Work'),
  project('project-two', '[PROJECT TWO]', 'Side project'),
  project('project-three', '[PROJECT THREE]', 'Work'),
  project('project-four', '[PROJECT FOUR]', 'Side project'),
  project('project-five', '[PROJECT FIVE]', 'School'),
  project('project-six', '[PROJECT SIX]', 'Side project')
]

export const featuredProjects = projects.slice(0, 4)
