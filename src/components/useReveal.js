import { useRef } from 'react'
import { useInView } from 'framer-motion'

/**
 * Returns [ref, isInView] for triggering Framer Motion animations
 * once the element scrolls into the viewport.
 */
export function useReveal(options = {}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px 0px', ...options })
  return [ref, isInView]
}
