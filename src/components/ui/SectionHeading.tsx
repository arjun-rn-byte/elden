import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { Reveal } from './Reveal'

interface SectionHeadingProps {
  numeral: string
  eyebrow: string
  title: ReactNode
  lede?: ReactNode
  className?: string
}

export function SectionHeading({ numeral, eyebrow, title, lede, className }: SectionHeadingProps) {
  return (
    <header className={cn('border-t border-gold/12 pt-7', className)}>
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-6">
        <Reveal className="lg:col-span-7">
          <div className="flex items-center gap-3">
            <span className="font-inscribed text-[11px] tracking-[0.2em] text-gold/70">
              {numeral}
            </span>
            <span className="h-px w-7 bg-gold/35" />
            <span className="eyebrow">{eyebrow}</span>
          </div>
          <h2 className="mt-7 max-w-[22ch] font-display text-[clamp(2.15rem,4.6vw,4rem)] font-light leading-[1.02] tracking-[-0.015em] text-bone">
            {title}
          </h2>
        </Reveal>

        {lede ? (
          <Reveal
            delay={0.14}
            className="lg:col-span-4 lg:col-start-9 lg:self-end lg:pb-2"
          >
            <div className="border-l border-gold/20 pl-5 text-[13.5px] leading-[1.9] text-ash/85">
              {lede}
            </div>
          </Reveal>
        ) : null}
      </div>
    </header>
  )
}
