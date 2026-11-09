import { ArrowRight } from 'lucide-react'
import { Reveal } from '../ui/Reveal'
import { Ornament } from '../ui/Ornament'
import { ArcaneSigilField } from '../ui/ArcaneSigilField'

export function Interlude() {
  return (
    <section className="relative overflow-hidden border-y border-gold/10 py-20 lg:py-28">
      <ArcaneSigilField
        glyph="circle"
        accent="gold"
        glyphOpacity={0.06}
        className="absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 opacity-45"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[26rem] w-[52rem] -translate-x-1/2 -translate-y-1/2 blur-[110px]"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(198,164,90,0.09) 0%, rgba(124,38,34,0.06) 45%, rgba(9,9,9,0) 72%)',
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_58%_48%_at_50%_50%,rgba(9,9,9,0.82)_0%,rgba(9,9,9,0.45)_52%,rgba(9,9,9,0)_78%)]"
      />

      <div className="relative mx-auto w-full max-w-3xl px-6 text-center">
        <Reveal>
          <Ornament className="mx-auto max-w-[16rem]" />
        </Reveal>

        <Reveal delay={0.18}>
          <blockquote className="mt-12 font-display text-[clamp(1.6rem,3.3vw,2.7rem)] font-light italic leading-[1.38] tracking-[-0.01em] text-bone/90 [text-wrap:balance]">
            “Gold was never a colour here. It was a sentence the world was made to speak — and every
            ruin is a word{' '}
            <span className="not-italic text-gold-leaf">left unfinished</span>.”
          </blockquote>
        </Reveal>

        <Reveal delay={0.26}>
          <Ornament className="mx-auto mt-12 max-w-[10rem]" />
          <p className="mt-6 font-inscribed text-[9px] uppercase tracking-[0.3em] text-gold/60">
            Prologue · Folio I
          </p>
        </Reveal>

        <Reveal delay={0.32}>
          <a
            href="#ledger"
            className="group mt-12 inline-flex items-center gap-3 font-inscribed text-[9px] uppercase tracking-[0.26em] text-ash/60 transition-colors duration-500 hover:text-gold"
          >
            Continue to the chronicle
            <ArrowRight
              size={13}
              strokeWidth={1.3}
              className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1"
            />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
