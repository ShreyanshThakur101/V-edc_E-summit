import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

// Lenis smooth scroll wrapper - wraps children with buttery smooth scrolling
export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null)

  const { pathname } = useLocation()

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

  // Scroll to top on route change
  useEffect(() => {
    const scrollToTop = () => {
      // 1. Reset Window scroll (fallback/native)
      window.scrollTo(0, 0)
      
      // 2. Reset Lenis scroll (smooth scroll instance)
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true })
      }
    }

    // Try immediately on effect run
    scrollToTop()

    // Second attempt after a very short delay to ensure DOM has updated its height
    const timeout = setTimeout(scrollToTop, 10)
    
    return () => clearTimeout(timeout)
  }, [pathname])

  return <>{children}</>
}
