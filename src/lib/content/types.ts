import type { AssetPath } from '$app/types'

export type Education = {
  when: string
  school: string
  field: string
}

export type Job = {
  id: string
  when: string
  role: string
  where: string
  current?: boolean
  stack: string[]
  points: string[]
}

export type ProjectType = 'Work' | 'Side project' | 'School'

export type Project = {
  slug: string
  title: string
  type: ProjectType
  stack: string
  year: string
  role: string
  live?: string
  source?: string
  /** Optional image paths (inside /static) — placeholders render until set */
  images?: { hero?: AssetPath, detail?: AssetPath, mobile?: AssetPath }
}
