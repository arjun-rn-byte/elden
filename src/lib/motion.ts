import type { Variants } from 'framer-motion'

/** Long, expensive-feeling curve used for every reveal. */
export const EASE = [0.16, 1, 0.3, 1] as const

/** Stagger container for hero lines and lists. */
export const staggerLine = (stagger = 0.09, delay = 0.1): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
})

export const lineRise: Variants = {
  hidden: { opacity: 0, y: 32, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.2, ease: EASE } },
}
