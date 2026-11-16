import { browser } from '$app/env'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (browser) gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

export function prefersReducedMotion(): boolean {
  return browser && matchMedia('(prefers-reduced-motion: reduce)').matches
}
