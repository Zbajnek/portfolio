import { createAttachmentKey } from 'svelte/attachments'
import { gsap, prefersReducedMotion } from './gsap.ts'

export type RevealOptions = {
  /** Start offset in px (slides up from here) */
  y?: number
  /** Seconds */
  delay?: number
  /** Seconds */
  duration?: number
  /** Animate the element's direct children one after another, with this gap in seconds */
  stagger?: number
  /** ScrollTrigger start position */
  start?: string
}

/**
 * Fades + slides an element in when it scrolls into view (immediately if it already is).
 *
 * Spread it on an element: `<h1 {...reveal()}>`. The spread adds a `data-reveal`
 * attribute that is rendered into the prerendered HTML, so CSS can keep the element
 * hidden until GSAP takes over — no flash of content before hydration.
 */
export function reveal(options: RevealOptions = {}) {
  return {
    'data-reveal': '',
    [createAttachmentKey()]: (node: HTMLElement) => animate(node, options),
  }
}

function animate(
  node: HTMLElement,
  { y = 32, delay = 0, duration = 1, stagger, start = 'top 92%' }: RevealOptions
) {
  if (prefersReducedMotion()) return

  const ctx = gsap.context(() => {
    const targets = stagger === undefined ? node : Array.from(node.children)

    // Sets the hidden "from" state inline straight away (immediateRender)…
    gsap.fromTo(
      targets,
      { autoAlpha: 0, y },
      {
        autoAlpha: 1,
        y: 0,
        delay,
        duration,
        stagger,
        ease: 'power3.out',
        // …and removes every inline style once done, so hover/opacity classes keep working.
        clearProps: 'opacity,visibility,transform',
        scrollTrigger: { trigger: node, start, once: true },
      }
    )
  }, node)

  // GSAP now controls visibility — lift the pre-hydration CSS hide.
  node.dataset.revealed = ''

  return () => ctx.revert()
}
