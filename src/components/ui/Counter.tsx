import { useEffect, useRef, useState } from 'react'
import { useInView } from '../../hooks/useArchive'

/** Roman-friendly counter: animates once, then rests. */
export function Counter({
  value,
  duration = 1500,
  className,
}: {
  value: number
  duration?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value)
      return
    }

    let frame = 0
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - progress, 4)
      setDisplay(Math.round(value * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, value, duration])

  return (
    <span ref={ref} className={className}>
      {String(display).padStart(2, '0')}
    </span>
  )
}
