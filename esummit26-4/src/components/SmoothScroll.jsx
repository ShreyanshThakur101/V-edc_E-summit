import { useEffect, useRef } from 'react'

// Lenis smooth scroll wrapper - wraps children with buttery smooth scrolling
export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null)

  useEffect(() => {
    let lenis
    let raf

    const init = async () => {
      try {
        const { default: Lenis } = await import('@studio-freight/lenis')
        lenis = new Lenis({
          duration: 1.4,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          direction: 'vertical',
          smooth: true,
          smoothTouch: false,
          touchMultiplier: 2,
        })
        lenisRef.current = lenis

        function loop(time) {
          lenis.raf(time)
          raf = requestAnimationFrame(loop)
        }
        raf = requestAnimationFrame(loop)
      } catch (e) {
        // Lenis not available, skip
      }
    }

    init()
    return () => {
      cancelAnimationFrame(raf)
      lenis?.destroy()
    }
  }, [])

  return <>{children}</>
}
