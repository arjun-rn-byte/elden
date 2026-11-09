import { ChevronDown } from 'lucide-react'
import { Breadcrumbs } from '../layout/Breadcrumbs'
import { GoldDust } from '../hero/GoldDust'
import { WorldLandscape } from './WorldLandscape'
import { Reveal } from '../ui/Reveal'
import { scrollToId } from '../../lib/scroll'
import { atlasTotals, regionsOf } from '../../lib/regions'

/** The threshold of the World chapter: a wide, quiet landscape over the chart. */
export function WorldMasthead() {
  return (
    <header id="world" className="relative isolate overflow-hidden border-b border-gold/10">
      <div aria-hidden className="absolute inset-0 -z-20">
        <WorldLandscape />
      </div>

      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(9,9,9,0.78)_0%,rgba(9,9,9,0.16)_22%,rgba(9,9,9,0.2)_46%,rgba(9,9,9,0.72)_78%,#090909_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(9,9,9,0.82)_0%,rgba(9,9,9,0.45)_42%,rgba(9,9,9,0)_72%)] lg:bg-[linear-gradient(90deg,rgba(9,9,9,0.86)_0%,rgba(9,9,9,0.3)_48%,rgba(9,9,9,0)_78%)]"
      />
      <div aria-hidden className="vignette absolute inset-0 -z-10 opacity-70" />

      {/* the surveyor's overlay: a horizon rule and its ticks */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <svg
          className="absolute inset-x-0 top-[54%] h-24 w-full text-gold/25"
          viewBox="0 0 1200 96"
          preserveAspectRatio="none"
          fill="none"
        >
          <line x1="0" y1="48" x2="1200" y2="48" stroke="currentColor" strokeOpacity="0.32" />
          {Array.from({ length: 41 }, (_, index) => {
            const x = index * 30
            const tall = index % 5 === 0
            return (
              <line
                key={x}
                x1={x}
                y1={48}
                x2={x}
                y2={tall ? 34 : 42}
                stroke="currentColor"
                strokeOpacity={tall ? 0.5 : 0.24}
              />
            )
          })}
        </svg>
      </div>

      <GoldDust />

      <div className="relative mx-auto flex min-h-[76svh] w-full max-w-[94rem] flex-col justify-end px-5 pb-10 pt-28 sm:px-8 sm:pb-12 lg:min-h-[82svh] lg:px-12 lg:pb-14">
        <Breadcrumbs items={[{ label: 'World', to: '/world' }]} />

        <Reveal>
          <div className="mt-8 flex items-center gap-3">
            <span className="font-inscribed text-[11px] tracking-[0.2em] text-gold/70">I</span>
            <span className="h-px w-7 bg-gold/35" />
            <span className="eyebrow">Volume I · The World</span>
          </div>

          <h1 className="mt-5 font-display text-[clamp(2.6rem,7vw,5.6rem)] font-light leading-[0.94] tracking-[-0.025em] text-bone letterpress">
            The Lands
            <br className="sm:hidden" /> <span className="italic text-gold-bright/90">Between</span>
          </h1>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-7 grid gap-8 border-t border-gold/15 pt-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <p className="max-w-[34rem] text-[13px] leading-[1.9] text-ash/80">
                An atlas of the surface, what lies beneath it, and the shadow that was left off the
                first chart. Choose a plate, then a region, and the archive opens its folio:
                description, notable ground, what keeps it, and who still speaks.
              </p>
            </div>

            <dl className="grid grid-cols-3 gap-4 lg:col-span-5 lg:col-start-8">
              {[
                { value: atlasTotals.regions, label: 'Regions charted' },
                { value: atlasTotals.plates, label: 'Survey plates' },
                { value: regionsOf('underworld').length, label: 'Held beneath' },
              ].map((stat) => (
                <div key={stat.label} className="border-l border-gold/20 pl-3">
                  <dd className="font-display text-[1.7rem] leading-none text-bone/90 tabular-nums">
                    {String(stat.value).padStart(2, '0')}
                  </dd>
                  <dt className="mt-2 font-inscribed text-[7.5px] uppercase leading-[1.6] tracking-[0.18em] text-mute">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <button
            type="button"
            onClick={() => scrollToId('survey')}
            className="group mt-9 flex items-center gap-3"
            aria-label="Scroll to the survey"
          >
            <span className="font-inscribed text-[8px] uppercase tracking-[0.32em] text-ash/65 transition-colors duration-500 group-hover:text-gold">
              Read the survey
            </span>
            <span className="relative block h-8 w-px overflow-hidden bg-gold/25" aria-hidden>
              <span className="animate-scroll-cue absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-transparent via-gold to-transparent" />
            </span>
            <ChevronDown
              size={12}
              strokeWidth={1.2}
              className="text-gold/45 transition-transform duration-500 ease-out-expo group-hover:translate-y-0.5"
            />
          </button>
        </Reveal>
      </div>
    </header>
  )
}
