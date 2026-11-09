import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { EASE } from '../../lib/motion'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  amount?: number
}

/** Fades, lifts and de-blurs its children once they enter the viewport. */
export function Reveal({ children, className, delay = 0, y = 24, amount = 0.2 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount }}
      transition={{ duration: 1.05, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}
