import { ages, ledger } from '../../lib/data'
import { Counter } from '../ui/Counter'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function LedgerSection() {
  return (
    <section id="ledger" className="relative py-20 lg:py-28">
      <div className="mx-auto w-full max-w-[94rem] px-5 sm:px-8 lg:px-12">
        <SectionHeading
          numeral="V"
          eyebrow="Lore · The Chronicle"
          title={
            <>
              Three ages, and what
              <br />
              they <span className="italic text-gold/90">cost</span>
            </>
          }
          lede={
            <>
              The archive keeps no prophecy. It keeps accounts: what was whole, where it broke, and
              who was asked to carry the pieces.
            </>
          }
        />

        <div className="mt-14 grid grid-cols-1 divide-y divide-gold/10 border-t border-gold/12 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
          {ages.map((age, index) => (
            <Reveal
              key={age.numeral}
              delay={index * 0.1}
              className="group relative py-8 lg:px-8 lg:py-10 lg:first:pl-0 lg:last:pr-0"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/25 font-display text-[13px] text-gold/80 transition-colors duration-700 group-hover:border-gold/60 group-hover:text-gold">
                  {age.numeral}
                </span>
                <span className="font-inscribed text-[8px] uppercase tracking-[0.26em] text-mute">
                  {age.span}
                </span>
              </div>

              <h3 className="mt-6 font-display text-[1.45rem] leading-tight text-bone/90">
                {age.name}
              </h3>
              <p className="mt-3 max-w-[34ch] text-[12.5px] leading-[1.85] text-ash/70">{age.note}</p>

              <span
                aria-hidden
                className="absolute bottom-0 left-0 h-px w-0 bg-gold/50 transition-[width] duration-[1200ms] ease-out-expo group-hover:w-full lg:hidden"
              />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-16">
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
            {ledger.map((stat) => (
              <div key={stat.label} className="border-t border-gold/12 pt-5">
                <div className="font-display text-[clamp(2rem,3.1vw,2.85rem)] font-light leading-none text-gold-leaf">
                  <Counter value={stat.value} />
                </div>
                <p className="mt-3 font-inscribed text-[8.5px] uppercase tracking-[0.24em] text-mute">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-8 max-w-[52ch] text-[10.5px] leading-[1.8] text-mute/70">
            Counts describe the full survey. Twenty leaves are transcribed in these six chapters; the
            remainder are held in the scriptorium until they are fit to read.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
