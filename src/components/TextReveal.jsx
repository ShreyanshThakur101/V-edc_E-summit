import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useReveal } from './useReveal'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&'

/**
 * ScrambleText — cycles random chars before landing on the real letter.
 * Ideal for headings.
 */
export function ScrambleText({ text, className = '', style = {}, trigger = true, delay = 0 }) {
  const [display, setDisplay] = useState(text)
  const iteration             = useRef(0)
  const interval              = useRef(null)
  const started               = useRef(false)

  useEffect(() => {
    if (!trigger || started.current) return
    started.current = true

    const startAfter = setTimeout(() => {
      iteration.current = 0
      clearInterval(interval.current)
      interval.current = setInterval(() => {
        setDisplay(
          text
            .split('')
            .map((char, i) => {
              if (char === ' ') return ' '
              if (i < iteration.current) return text[i]
              return CHARS[Math.floor(Math.random() * CHARS.length)]
            })
            .join('')
        )
        if (iteration.current >= text.length) clearInterval(interval.current)
        iteration.current += 0.35
      }, 40)
    }, delay)

    return () => {
      clearTimeout(startAfter)
      clearInterval(interval.current)
    }
  }, [trigger, text, delay])

  return (
    <span className={className} style={{ ...style, fontVariantNumeric: 'tabular-nums' }}>
      {display}
    </span>
  )
}

/**
 * WordReveal — staggers each word sliding up from below.
 * Great for subtitles and body text.
 */
export function WordReveal({ text, className = '', style = {}, delay = 0 }) {
  const [ref, inView] = useReveal()
  const words = text.split(' ')

  return (
    <p ref={ref} className={className} style={{ ...style, overflow: 'hidden' }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block', marginRight: '0.3em' }}
          initial={{ y: '110%', opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{
            duration: 0.55,
            delay: delay + i * 0.055,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </p>
  )
}

/**
 * LetterReveal — staggers individual characters.
 * For dramatic hero titles.
 */
export function LetterReveal({ text, className = '', style = {}, delay = 0, trigger = true }) {
  const letters = text.split('')

  return (
    <span className={className} style={style} aria-label={text}>
      {letters.map((char, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
          initial={{ y: '80%', opacity: 0, rotateX: -90 }}
          animate={trigger ? { y: 0, opacity: 1, rotateX: 0 } : {}}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.04,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  )
}
