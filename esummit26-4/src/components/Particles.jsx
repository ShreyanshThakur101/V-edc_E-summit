import { useEffect, useRef } from 'react'

/** Floating ember particles that drift upward */
export function Embers({ count = 28, colors = ['#c9a84c'] }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    el.innerHTML = ''

    for (let i = 0; i < count; i++) {
      const p = document.createElement('div')
      p.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        width: ${Math.random() > 0.6 ? 3 : 2}px;
        height: ${Math.random() > 0.6 ? 3 : 2}px;
        left: ${Math.random() * 100}%;
        animation: emberRise ${7 + Math.random() * 10}s linear ${Math.random() * 12}s infinite;
        opacity: 0;
      `
      el.appendChild(p)
    }
    return () => { el.innerHTML = '' }
  }, [count])

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden" />
  )
}

/** Falling confetti dots */
export function Confetti({ count = 40 }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    el.innerHTML = ''
    const palette = ['#c9a84c', '#d4690a', '#c0392b', '#f0d080', '#ffffff']

    for (let i = 0; i < count; i++) {
      const d = document.createElement('div')
      const isCircle = Math.random() > 0.5
      d.style.cssText = `
        position: absolute;
        left: ${Math.random() * 100}%;
        top: -10px;
        width:  ${2 + Math.random() * 4}px;
        height: ${isCircle ? 2 + Math.random() * 3 : 1}px;
        background: ${palette[Math.floor(Math.random() * palette.length)]};
        border-radius: ${isCircle ? '50%' : '1px'};
        animation: confFall ${8 + Math.random() * 12}s linear ${Math.random() * 15}s infinite;
        opacity: 0;
      `
      el.appendChild(d)
    }
    return () => { el.innerHTML = '' }
  }, [count])

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden" />
  )
}
