import type { AssetPath } from '$app/types'
import type { Localized } from '#i18n'

/** A span of years; leave `to` out while it's ongoing (shown as "Now") */
export type Period = {
  from: number
  to?: number
}

export type Education = Period & {
  school: Localized
  field: Localized
}

export type Job = Period & {
  id: string
  role: Localized
  where: Localized
  stack: string[]
  points: Localized<string[]>
}

/** A key, not a label — labels come from the `projects_type_*` messages */
export type ProjectType = 'work' | 'side' | 'school'

export type Project = {
  slug: string
  title: string
  type: ProjectType
  stack: string
  year: string
  role: Localized
  live?: string
  source?: string
  /** Optional image paths (inside /static) — placeholders render until set */
  images?: { hero?: AssetPath, detail?: AssetPath, mobile?: AssetPath }
}
