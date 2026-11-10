import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { entries } from '../../lib/data'
import { Reveal } from '../ui/Reveal'
import { Diamond } from '../ui/Ornament'

const regions = entries.filter((entry) => entry.category === 'world')

const facts = [
  { term: 'Released', detail: 'February 2022' },
  { term: 'Developed by', detail: 'FromSoftware' },
  { term: 'Form', detail: 'Action RPG' },
]

export function WorldSection() {
  return (
    <section id="world" className="relative py-20 lg:py-28">
      <div className="mx-auto w-full max-w-[94rem] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="font-inscribed text-[11px] tracking-[0.2em] text-gold/70">I</span>
                <span className="h-px w-7 bg-gold/35" />
                <span className="eyebrow">The World</span>
              </div>

              <h2 className="mt-7 max-w-[18ch] font-display text-[clamp(2.3rem,4.8vw,4rem)] font-light leading-[1.02] tracking-[-0.015em] text-bone">
                The Lands
                <br />
                <span className="italic text-gold/90">Between</span>
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-8 max-w-[34rem] text-[13.5px] leading-[1.95] text-ash/80">
                The Elden Ring was the law that held this country in one shape. It was broken, and the
                pieces were claimed by demigods who called the claiming a right. What is left is a
                world of aftermath: a golden capital gone quiet, an academy drowned with its lake, a
                frontier where a star fell and the ground has not forgiven it.
              </p>
              <p className="mt-5 max-w-[34rem] text-[13.5px] leading-[1.95] text-ash/70">
                This encyclopaedia walks it in six chapters — the ground, the people, the things that
                guard it, the things you carry, and the law underneath all of it. No rankings. Only
                the record, kept with some care.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-5 border-t border-gold/12 pt-7">
                {facts.map((fact) => (
                  <div key={fact.term}>
                    <dt className="text-[8px] uppercase tracking-[0.26em] text-mute">{fact.term}</dt>
                    <dd className="mt-2 font-display text-[15px] tracking-[0.01em] text-bone/85">
                      {fact.detail}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal delay={0.1}>
              <div className="flex items-baseline justify-between border-b border-gold/12 pb-4">
                <span className="eyebrow text-mute">Regions in the survey</span>
                <span className="font-display text-[12px] italic text-gold/50">
                  {String(regions.length).padStart(2, '0')} charted
                </span>
              </div>

              <ul className="mt-2">
                {regions.map((region) => (
                  <li key={region.id}>
                    <Link
                      to={`/world?region=${region.id}`}
                      className="group relative flex items-baseline gap-5 border-b border-gold/10 py-5 transition-colors duration-300 hover:bg-gold/[0.03]"
                    >
                      <span className="font-inscribed text-[9px] tracking-[0.2em] text-gold/35 transition-colors duration-500 group-hover:text-gold/70">
                        {region.numeral}
                      </span>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-display text-[1.35rem] leading-tight text-bone/90 transition-colors duration-500 group-hover:text-bone">
                          {region.name}
                        </h3>
                        <p className="mt-0.5 font-display text-[12px] italic text-gold/55">
                          {region.epithet}
                        </p>
                      </div>
                      <ArrowRight
                        size={14}
                        className="text-gold/30 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:text-gold group-hover:opacity-100"
                      />
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-4 border-t border-gold/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <Diamond className="h-[4px] w-[4px]" />
                  <p className="text-[10.5px] leading-relaxed text-mute/80">
                    Twenty regions surveyed across three plates.
                  </p>
                </div>
                <Link
                  to="/world"
                  className="group inline-flex shrink-0 items-center gap-2 border border-gold/25 px-3 py-1.5 font-inscribed text-[8px] uppercase tracking-[0.22em] text-gold transition-colors duration-300 hover:border-gold/60 hover:bg-gold/[0.06]"
                >
                  Enter the Atlas
                  <ArrowRight size={11} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
