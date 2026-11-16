import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from './gsap.ts'

let lenis: Lenis | null = null

/**
 * Starts Lenis smooth scrolling, driven by the GSAP ticker so ScrollTrigger
 * stays in sync. Returns a cleanup function. Does nothing for reduced motion.
 */
export function initSmoothScroll(): () => void {
  if (prefersReducedMotion()) return () => {}

  const instance = new Lenis({
    autoRaf: false,
    // Leave same-page hash links to the browser/SvelteKit — use scrollToTarget() for smooth ones.
    anchors: false,
    // Kill leftover inertia when a link navigates to another page.
    stopInertiaOnNavigate: true,
  })
  const tick = (time: number) => instance.raf(time * 1000)

  instance.on('scroll', ScrollTrigger.update)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)
  lenis = instance

  return () => {
    gsap.ticker.remove(tick)
    instance.destroy()
    lenis = null
  }
}

/** Call after a client-side navigation so Lenis and ScrollTrigger re-measure the new page. */
export function refreshScroll(): void {
  lenis?.resize()
  ScrollTrigger.refresh()
}

/** Smoothly scrolls to an element or selector, falling back to native scrolling. */
export function scrollToTarget(target: string | HTMLElement): void {
  if (lenis) {
    lenis.scrollTo(target)
    return
  }
  const element = typeof target === 'string' ? document.querySelector(target) : target
  element?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
}
