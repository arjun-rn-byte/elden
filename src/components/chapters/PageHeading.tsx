import type { ReactNode } from 'react'
import type { Accent, GlyphId } from '../../lib/data'
import { ArcaneSigilField } from '../ui/ArcaneSigilField'
import { Reveal } from '../ui/Reveal'

interface PageHeadingProps {
  numeral: string
  eyebrow: string
  title: ReactNode
  lede: ReactNode
  glyph: GlyphId
  accent: Accent
  count: number
}

/** The masthead every chapter page opens with. */
export function PageHeading({
  numeral,
  eyebrow,
  title,
  lede,
  glyph,
  accent,
  count,
}: PageHeadingProps) {
  return (
    <header className="relative overflow-hidden border-b border-gold/10 pb-14 pt-8 sm:pt-10 lg:pb-20 lg:pt-14">
      <ArcaneSigilField
        glyph={glyph}
        accent={accent}
        glyphOpacity={0.05}
        glyphSize={150}
        className="pointer-events-none absolute -right-24 -top-16 h-[30rem] w-[30rem] opacity-40 lg:-right-10 lg:h-[38rem] lg:w-[38rem] lg:opacity-60"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(ellipse_at_70%_40%,rgba(198,164,90,0.07),transparent_68%)]"
      />

      <div className="relative mx-auto w-full max-w-[94rem] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="font-inscribed text-[11px] tracking-[0.2em] text-gold/70">{numeral}</span>
            <span className="h-px w-7 bg-gold/35" />
            <span className="eyebrow">{eyebrow}</span>
          </div>

          <h1 className="mt-6 max-w-[20ch] font-display text-[clamp(2.5rem,5.4vw,4.6rem)] font-light leading-[0.98] tracking-[-0.02em] text-bone">
            {title}
          </h1>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-8 flex max-w-[46rem] flex-col gap-6 border-l border-gold/20 pl-5 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
            <div className="text-[13.5px] leading-[1.9] text-ash/80">{lede}</div>
            <p className="shrink-0 font-inscribed text-[8.5px] uppercase tracking-[0.26em] text-mute">
              {String(count).padStart(2, '0')} leaves
            </p>
          </div>
        </Reveal>
      </div>
    </header>
  )
}
